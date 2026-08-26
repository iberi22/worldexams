import type { APIRoute } from 'astro';
import { z } from 'zod';
import {
  createAdminSupabaseClient,
  createServerSupabaseClient,
  getServerRuntimeEnv,
  type RuntimeLocals,
} from '../../lib/server-runtime';
import { sanitizeContent, rateLimitMap, RATE_LIMIT_WINDOW_MS } from './explanations';

// WX-302 capa 3: hilos por explicación (reply / citar / ampliar)
// Usa community_replies si existe; fallback in-memory para tests sin supabase

// In-memory fallback for tests / sin supabase
const memoryReplies: Array<{
  id: string;
  explanation_id: string;
  node_hash: string;
  content: string;
  vote_count: number;
  parent_reply_id: string | null;
  created_at: string;
}> = [];

export function clearRepliesMemory() {
  memoryReplies.length = 0;
}
export function getMemoryReplies() {
  return memoryReplies;
}

const GetQuerySchema = z.object({
  explanation_id: z.string().uuid(),
});

const CreateBodySchema = z.object({
  explanation_id: z.string().uuid(),
  content: z.string().min(1).max(5000),
  node_hash: z.string().min(1).max(256),
  parent_reply_id: z.string().uuid().nullable().optional(),
});

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function checkReplyRateLimit(nodeHash: string): boolean {
  const now = Date.now();
  const key = `reply:${nodeHash}`;
  const entry = rateLimitMap.get(key);
  if (!entry) {
    rateLimitMap.set(key, { lastAt: now });
    return true;
  }
  if (now - entry.lastAt < RATE_LIMIT_WINDOW_MS) return false;
  rateLimitMap.set(key, { lastAt: now });
  return true;
}

export const GET: APIRoute = async ({ url, locals }) => {
  const explanationId = url.searchParams.get('explanation_id')?.trim() ?? '';
  const parsed = GetQuerySchema.safeParse({ explanation_id: explanationId });
  if (!parsed.success) {
    return jsonResponse({ error: 'explanation_id requerido (uuid)', details: parsed.error.format() }, 400);
  }
  try {
    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    if (!env.supabaseUrl || !env.anonKey) {
      const filtered = memoryReplies
        .filter((r) => r.explanation_id === parsed.data.explanation_id)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      return jsonResponse({ success: true, replies: filtered });
    }
    const supabase = createServerSupabaseClient(env);
    // Try table community_replies; if not exists, fallback to memory
    const { data, error } = await (supabase.from('community_replies') as unknown as {
      select: (cols: string) => {
        eq: (col: string, val: string) => {
          order: (col: string, opts: unknown) => Promise<{ data: unknown; error: unknown }>;
        };
      };
    })
      .select('id, explanation_id, node_hash, content, vote_count, parent_reply_id, created_at')
      .eq('explanation_id', parsed.data.explanation_id)
      .order('created_at', { ascending: true });

    if (error) {
      // table may not exist yet -> fallback
      const msg = String((error as { message?: string }).message ?? error);
      if (msg.includes('does not exist') || msg.includes('relation')) {
        const filtered = memoryReplies.filter((r) => r.explanation_id === parsed.data.explanation_id);
        return jsonResponse({ success: true, replies: filtered });
      }
      throw error;
    }
    return jsonResponse({ success: true, replies: data ?? [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return jsonResponse({ error: msg }, 500);
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Cuerpo JSON inválido' }, 400);
  }
  const parsed = CreateBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse({ error: 'Datos de reply inválidos', details: parsed.error.format() }, 400);
  }
  const { explanation_id, content: rawContent, node_hash, parent_reply_id } = parsed.data;

  if (!checkReplyRateLimit(node_hash)) {
    return jsonResponse({ error: 'Rate limit: espera 60s antes de otro reply' }, 429);
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
      // memory mode
      const newReply = {
        id: crypto.randomUUID(),
        explanation_id,
        node_hash,
        content,
        vote_count: 0,
        parent_reply_id: parent_reply_id ?? null,
        created_at: new Date().toISOString(),
      };
      memoryReplies.push(newReply);
      return jsonResponse({ success: true, reply: newReply }, 201);
    }
    const supabase = createAdminSupabaseClient(env);

    // verify explanation exists
    const { data: exp, error: fetchErr } = await supabase
      .from('community_explanations')
      .select('id')
      .eq('id', explanation_id)
      .single();
    if (fetchErr || !exp) {
      return jsonResponse({ error: 'Explicación no encontrada' }, 404);
    }

    const { data, error } = await (supabase.from('community_replies') as unknown as {
      insert: (v: unknown) => { select: () => { single: () => Promise<{ data: unknown; error: unknown }> } };
    })
      .insert([
        {
          explanation_id,
          node_hash,
          content,
          vote_count: 0,
          parent_reply_id: parent_reply_id ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      const msg = String((error as { message?: string }).message ?? error);
      if (msg.includes('does not exist') || msg.includes('relation')) {
        // fallback memory if table not migrated yet
        const newReply = {
          id: crypto.randomUUID(),
          explanation_id,
          node_hash,
          content,
          vote_count: 0,
          parent_reply_id: parent_reply_id ?? null,
          created_at: new Date().toISOString(),
        };
        memoryReplies.push(newReply);
        return jsonResponse({ success: true, reply: newReply }, 201);
      }
      throw error;
    }

    return jsonResponse({ success: true, reply: data }, 201);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return jsonResponse({ error: msg }, 500);
  }
};

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
