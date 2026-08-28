import type { APIRoute } from 'astro';
import { z } from 'zod';
import {
  createAdminSupabaseClient,
  createServerSupabaseClient,
  getServerRuntimeEnv,
  type RuntimeLocals,
} from '../../lib/server-runtime';

// WX-203 Backend social capa 2: community_explanations + votos firmados (D3)
// BR-03: sin karma/tokens, reputación pura de la red via votos +1/-1 firmados (ML-DSA-65 placeholder)

// ---------------------------------------------------------------------------
// Sanitización básica con regex (sin libs externas nuevas)
// Elimina HTML peligroso: script/iframe/object/embed, event handlers, javascript:
// ---------------------------------------------------------------------------
export function sanitizeContent(input: string): string {
  if (!input || typeof input !== 'string') return '';
  let out = input;
  // Eliminar bloques script/iframe/object/embed completos
  out = out.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '');
  out = out.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe\s*>/gi, '');
  out = out.replace(/<object\b[^>]*>[\s\S]*?<\/object\s*>/gi, '');
  out = out.replace(/<embed\b[^>]*\/?>/gi, '');
  out = out.replace(/<link\b[^>]*\/?>/gi, '');
  out = out.replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, '');
  // Eliminar event handlers on*=  (onclick, onerror, etc.)
  out = out.replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s"'`>]+)/gi, '');
  // Eliminar javascript: y data:text/html
  out = out.replace(/javascript\s*:/gi, '');
  out = out.replace(/data\s*:\s*text\/html/gi, '');
  // Eliminar tags potencialmente peligrosos pero conservar texto interno
  // Permitimos b,i,u,strong,em,p,br,ul,ol,li,code,pre,blockquote, a(href seguro)
  // Para capa 2, estrategia simple: escapar < y > de tags no permitidos
  // Aquí solo removemos <form>, <input>, <button>, <meta>, <base>, <svg con onload>
  out = out.replace(/<\/?(form|input|button|meta|base|svg|math|template|slot)[^>]*>/gi, '');
  return out.trim();
}

// ---------------------------------------------------------------------------
// Rate limit: 1 POST /60s por node_hash (creación de explicación)
// In-memory por instancia (suficiente para SSR Workers single-instance, capa 2)
// Exportado para tests
// ---------------------------------------------------------------------------
export const rateLimitMap = new Map<string, { lastAt: number }>();
export const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const CLEANUP_PROBABILITY = 0.05;

export function cleanupRateLimitMap(now: number) {
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.lastAt + RATE_LIMIT_WINDOW_MS < now) {
      rateLimitMap.delete(key);
    }
  }
}

export function checkRateLimit(nodeHash: string): boolean {
  const now = Date.now();
  if (Math.random() < CLEANUP_PROBABILITY) {
    cleanupRateLimitMap(now);
  }
  const entry = rateLimitMap.get(nodeHash);
  if (!entry) {
    rateLimitMap.set(nodeHash, { lastAt: now });
    return true;
  }
  if (now - entry.lastAt < RATE_LIMIT_WINDOW_MS) {
    return false;
  }
  rateLimitMap.set(nodeHash, { lastAt: now });
  return true;
}

// Helper para tests: limpiar rate limit
export function clearRateLimit() {
  rateLimitMap.clear();
}

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------
const GetQuerySchema = z.object({
  question_id: z.string().min(1).max(200).regex(/^[a-zA-Z0-9_\-]+$/),
});

const CreateBodySchema = z.object({
  question_id: z.string().min(1).max(200).regex(/^[a-zA-Z0-9_\-]+$/),
  content: z.string().min(1).max(5000),
  node_hash: z.string().min(1).max(256),
});

const VoteBodySchema = z.object({
  explanation_id: z.string().uuid(),
  voter_node_hash: z.string().min(1).max(256),
  vote: z.union([z.literal(1), z.literal(-1)]),
  signature: z.string().min(1).max(4096),
});

// Detectar si el body es voto (contiene explanation_id) vs creación
function isVoteBody(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false;
  return 'explanation_id' in (body as Record<string, unknown>);
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ---------------------------------------------------------------------------
// GET ?question_id=... → lista publicada orden vote_count desc limit 10
// ---------------------------------------------------------------------------
export const GET: APIRoute = async ({ url, locals }) => {
  const questionId = url.searchParams.get('question_id')?.trim() ?? '';

  const parsed = GetQuerySchema.safeParse({ question_id: questionId });
  if (!parsed.success) {
    return jsonResponse(
      { error: 'question_id requerido y válido (alfanumérico, _,-)', details: parsed.error.format() },
      400
    );
  }

  try {
    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    // Si no hay credenciales, devolver lista vacía (útil para tests sin supabase)
    if (!env.supabaseUrl || !env.anonKey) {
      return jsonResponse({ success: true, explanations: [] });
    }
    const supabase = createServerSupabaseClient(env);

    const { data, error } = await supabase
      .from('community_explanations')
      .select('id, question_id, node_hash, content, vote_count, status, created_at')
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
// POST → creación (question_id,content,node_hash)  o  voto (explanation_id,...)
// Rate limit solo para creación: 1/60s por node_hash
// Voto: único por voter_node_hash+explanation_id (409 si duplicado)
// ---------------------------------------------------------------------------
export const POST: APIRoute = async ({ request, locals, url }) => {
  // Permitir POST /vote via query ?action=vote o body explanation_id
  const action = url.searchParams.get('action');

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Cuerpo JSON inválido' }, 400);
  }

  const wantsVote = action === 'vote' || isVoteBody(body);

  // -------------------- VOTO --------------------
  if (wantsVote) {
    const parsed = VoteBodySchema.safeParse(body);
    if (!parsed.success) {
      return jsonResponse(
        { error: 'Datos de voto inválidos', details: parsed.error.format() },
        400
      );
    }
    const { explanation_id, voter_node_hash, vote, signature } = parsed.data;

    // Sanitizar signature no aplica, pero validar no vacío ya por zod

    try {
      const env = getServerRuntimeEnv(locals as RuntimeLocals);
      if (!env.supabaseUrl || !env.serviceRoleKey) {
        return jsonResponse({ error: 'Supabase no configurado' }, 500);
      }
      const supabase = createAdminSupabaseClient(env);

      // Verificar que la explicación existe y está publicada o draft
      const { data: explanation, error: fetchErr } = await supabase
        .from('community_explanations')
        .select('id, vote_count')
        .eq('id', explanation_id)
        .single();

      if (fetchErr || !explanation) {
        return jsonResponse({ error: 'Explicación no encontrada' }, 404);
      }

      // Intentar insertar voto (unique constraint protege duplicados)
      const { error: insertErr } = await (supabase.from('community_votes') as unknown as {
        insert: (v: unknown) => { select: () => { single: () => Promise<{ error: unknown }> } };
      })
        .insert([
          {
            explanation_id,
            voter_node_hash,
            signature,
            vote,
          },
        ])
        .select()
        .single();

      // Supabase unique violation → 409
      if (insertErr) {
        const msg = String((insertErr as { message?: string }).message ?? insertErr);
        if (msg.includes('duplicate') || msg.includes('unique') || msg.includes('already exists') || msg.includes('23505')) {
          return jsonResponse({ error: 'Voto duplicado: ya votaste esta explicación' }, 409);
        }
        throw insertErr;
      }

      // vote_count se actualiza por trigger DB; devolver nuevo conteo estimado
      // Refetch para devolver vote_count actualizado
      const { data: updated } = await supabase
        .from('community_explanations')
        .select('vote_count')
        .eq('id', explanation_id)
        .single();

      return jsonResponse(
        {
          success: true,
          vote: { explanation_id, voter_node_hash, vote },
          vote_count: (updated as { vote_count?: number } | null)?.vote_count ?? (explanation as { vote_count: number }).vote_count + vote,
        },
        201
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      // Mapear duplicate que burbujea como excepción
      if (msg.includes('duplicate') || msg.includes('unique') || msg.includes('23505')) {
        return jsonResponse({ error: 'Voto duplicado: ya votaste esta explicación' }, 409);
      }
      return jsonResponse({ error: msg }, 500);
    }
  }

  // -------------------- CREACIÓN --------------------
  const parsed = CreateBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse({ error: 'Datos de explicación inválidos', details: parsed.error.format() }, 400);
  }

  const { question_id, content: rawContent, node_hash } = parsed.data;

  // Rate limit por node_hash
  if (!checkRateLimit(node_hash)) {
    return jsonResponse({ error: 'Rate limit: espera 60s antes de crear otra explicación' }, 429);
  }

  const content = sanitizeContent(rawContent);
  if (!content || content.length === 0) {
    return jsonResponse({ error: 'Contenido vacío tras sanitización' }, 400);
  }
  if (content.length > 5000) {
    return jsonResponse({ error: 'Contenido excede 5000 caracteres' }, 400);
  }

  try {
    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    if (!env.supabaseUrl || !env.serviceRoleKey) {
      return jsonResponse({ error: 'Supabase no configurado' }, 500);
    }
    const supabase = createAdminSupabaseClient(env);

    const { data, error } = await (supabase.from('community_explanations') as unknown as {
      insert: (v: unknown) => { select: () => { single: () => Promise<{ data: unknown; error: unknown }> } };
    })
      .insert([
        {
          question_id,
          node_hash,
          content,
          status: 'draft',
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

// CORS/OPTIONS helper
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
