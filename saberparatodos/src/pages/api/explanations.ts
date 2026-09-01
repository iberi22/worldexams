import type { APIRoute } from 'astro';
import {
  CreateExplanationSchema,
  GetExplanationsQuerySchema,
  VoteExplanationSchema,
  hasNoEmailPII,
} from '../../lib/community/explanations';
import {
  createAdminSupabaseClient,
  createServerSupabaseClient,
  getServerRuntimeEnv,
  type RuntimeLocals,
} from '../../lib/server-runtime';

// WX-203 Backend social capa 2: community_explanations + votos firmados
// BR-03: sin karma/tokens, reputación pura de la red via votos +1/-1

// ---------------------------------------------------------------------------
// Rate limit: 5 POST /60s por author_hash (creación de explicación)
// ---------------------------------------------------------------------------
export const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
export const RATE_LIMIT_WINDOW_MS = 60 * 1000;
export const MAX_CREATES_PER_WINDOW = 5;
const CLEANUP_PROBABILITY = 0.05;

export function cleanupRateLimitMap(now: number) {
  rateLimitMap.forEach((value, key) => {
    if (value.windowStart + RATE_LIMIT_WINDOW_MS < now) {
      rateLimitMap.delete(key);
    }
  });
}

export function checkRateLimit(authorHash: string): boolean {
  const now = Date.now();
  if (Math.random() < CLEANUP_PROBABILITY) {
    cleanupRateLimitMap(now);
  }
  const entry = rateLimitMap.get(authorHash);
  if (!entry || now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(authorHash, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= MAX_CREATES_PER_WINDOW) {
    return false;
  }
  entry.count += 1;
  return true;
}

export function clearRateLimit() {
  rateLimitMap.clear();
}

export function sanitizeContent(input: string): string {
  if (!input || typeof input !== 'string') return '';
  let out = input;
  out = out.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '');
  out = out.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe\s*>/gi, '');
  out = out.replace(/<object\b[^>]*>[\s\S]*?<\/object\s*>/gi, '');
  out = out.replace(/<embed\b[^>]*\/?>/gi, '');
  out = out.replace(/<link\b[^>]*\/?>/gi, '');
  out = out.replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, '');
  out = out.replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s"'`>]+)/gi, '');
  out = out.replace(/javascript\s*:/gi, '');
  out = out.replace(/data\s*:\s*text\/html/gi, '');
  out = out.replace(/<\/?(form|input|button|meta|base|svg|math|template|slot)[^>]*>/gi, '');
  return out.trim();
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Helper to extract author_hash or node_hash from input
function getAuthorHash(body: Record<string, unknown>): string {
  if (typeof body.author_hash === 'string' && body.author_hash.length > 0) {
    return body.author_hash;
  }
  if (typeof body.node_hash === 'string' && body.node_hash.length > 0) {
    return body.node_hash;
  }
  if (typeof body.voter_node_hash === 'string' && body.voter_node_hash.length > 0) {
    return body.voter_node_hash;
  }
  return '';
}

// ---------------------------------------------------------------------------
// GET ?question_id=... → lista aprobada (published) ordenada por vote_count desc
// ---------------------------------------------------------------------------
export const GET: APIRoute = async ({ url, locals }) => {
  const questionId = url.searchParams.get('question_id')?.trim() ?? '';

  const parsed = GetExplanationsQuerySchema.safeParse({ question_id: questionId });
  if (!parsed.success) {
    return jsonResponse(
      { error: 'question_id requerido y válido (alfanumérico, _,-)', details: parsed.error.format() },
      400
    );
  }

  try {
    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    if (!env.supabaseUrl || !env.anonKey) {
      return jsonResponse({ success: true, explanations: [] });
    }
    const supabase = createServerSupabaseClient(env);

    const { data, error } = await supabase
      .from('community_explanations')
      .select('id, question_id, author_hash, node_hash, content, vote_count, status, created_at')
      .eq('question_id', parsed.data.question_id)
      .eq('status', 'published')
      .order('vote_count', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    return jsonResponse({ success: true, explanations: data ?? [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return jsonResponse({ error: msg }, 500);
  }
};

// ---------------------------------------------------------------------------
// POST → creación de explicación (question_id, content [200-2000 chars], author_hash)
// Rate-limit: 5/min por author_hash. Recharzar PII (email).
// ---------------------------------------------------------------------------
export const POST: APIRoute = async ({ request, locals }) => {
  let rawBody: Record<string, unknown>;
  try {
    rawBody = await request.json();
  } catch {
    return jsonResponse({ error: 'Cuerpo JSON inválido' }, 400);
  }

  const authorHash = getAuthorHash(rawBody);
  const normalizedBody = {
    ...rawBody,
    author_hash: authorHash,
  };

  const parsed = CreateExplanationSchema.safeParse(normalizedBody);
  if (!parsed.success) {
    return jsonResponse(
      { error: 'Datos de explicación inválidos', details: parsed.error.format() },
      400
    );
  }

  const { question_id, content, author_hash } = parsed.data;

  // Verify PII (such as personal contact email) explicitly
  if (!hasNoEmailPII(content)) {
    return jsonResponse(
      { error: 'Contenido rechazado: contiene dirección de correo personal u otro PII' },
      400
    );
  }

  // Rate limit check: 5 creations per window per author_hash
  if (!checkRateLimit(author_hash)) {
    return jsonResponse(
      { error: 'Rate limit excedido: máximo 5 explicaciones por minuto' },
      429
    );
  }

  try {
    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    if (!env.supabaseUrl || !env.serviceRoleKey) {
      return jsonResponse({ error: 'Supabase no configurado' }, 500);
    }
    const supabase = createAdminSupabaseClient(env);

    const { data, error } = await (
      supabase.from('community_explanations') as unknown as {
        insert: (
          v: unknown
        ) => { select: () => { single: () => Promise<{ data: unknown; error: unknown }> } };
      }
    )
      .insert([
        {
          question_id,
          author_hash,
          node_hash: author_hash,
          content,
          status: 'published',
          vote_count: 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return jsonResponse({ success: true, explanation: data }, 201);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return jsonResponse({ error: msg }, 500);
  }
};

// ---------------------------------------------------------------------------
// PATCH → voto (+1 / -1) en explicación por explanation_id y author_hash
// Previene voto duplicado por author_hash (devuelve 409 Conflict si duplicado)
// ---------------------------------------------------------------------------
export const PATCH: APIRoute = async ({ request, locals }) => {
  let rawBody: Record<string, unknown>;
  try {
    rawBody = await request.json();
  } catch {
    return jsonResponse({ error: 'Cuerpo JSON inválido' }, 400);
  }

  const authorHash = getAuthorHash(rawBody);
  const normalizedBody = {
    ...rawBody,
    author_hash: authorHash,
  };

  const parsed = VoteExplanationSchema.safeParse(normalizedBody);
  if (!parsed.success) {
    return jsonResponse(
      { error: 'Datos de voto inválidos', details: parsed.error.format() },
      400
    );
  }

  const { explanation_id, author_hash, vote, signature } = parsed.data;

  try {
    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    if (!env.supabaseUrl || !env.serviceRoleKey) {
      return jsonResponse({ error: 'Supabase no configurado' }, 500);
    }
    const supabase = createAdminSupabaseClient(env);

    // Verificar existencia de la explicación
    const { data: explanation, error: fetchErr } = await supabase
      .from('community_explanations')
      .select('id, vote_count')
      .eq('id', explanation_id)
      .single();

    if (fetchErr || !explanation) {
      return jsonResponse({ error: 'Explicación no encontrada' }, 404);
    }

    // Insertar voto en community_votes (Unique constraint en explanation_id + voter_node_hash / author_hash)
    const { error: insertErr } = await (
      supabase.from('community_votes') as unknown as {
        insert: (
          v: unknown
        ) => { select: () => { single: () => Promise<{ error: unknown }> } };
      }
    )
      .insert([
        {
          explanation_id,
          voter_node_hash: author_hash,
          author_hash,
          vote,
          signature: signature ?? 'unsigned',
        },
      ])
      .select()
      .single();

    if (insertErr) {
      const msg = String((insertErr as { message?: string }).message ?? insertErr);
      if (
        msg.includes('duplicate') ||
        msg.includes('unique') ||
        msg.includes('already exists') ||
        msg.includes('23505')
      ) {
        return jsonResponse(
          { error: 'Voto duplicado: ya votaste esta explicación con author_hash' },
          409
        );
      }
      throw insertErr;
    }

    // Refetch para devolver el conteo de votos actualizado
    const { data: updated } = await supabase
      .from('community_explanations')
      .select('vote_count')
      .eq('id', explanation_id)
      .single();

    return jsonResponse(
      {
        success: true,
        vote: { explanation_id, author_hash, vote },
        vote_count:
          (updated as { vote_count?: number } | null)?.vote_count ??
          (explanation as { vote_count: number }).vote_count + vote,
      },
      200
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (
      msg.includes('duplicate') ||
      msg.includes('unique') ||
      msg.includes('23505')
    ) {
      return jsonResponse(
        { error: 'Voto duplicado: ya votaste esta explicación con author_hash' },
        409
      );
    }
    return jsonResponse({ error: msg }, 500);
  }
};

// CORS/OPTIONS helper
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
