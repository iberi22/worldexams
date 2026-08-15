import type { APIRoute } from 'astro';
import { z } from 'zod';
import {
  createAdminSupabaseClient,
  createServerSupabaseClient,
  getServerRuntimeEnv,
  type RuntimeLocals,
} from '../../lib/server-runtime';
import { notifyModeratorOfNewComment } from '../../lib/telegram';

// Rate limiting: max 5 POST requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const CLEANUP_PROBABILITY = 0.05; // 5% chance to run cleanup on request to prevent memory leaks

function cleanupRateLimitMap(now: number) {
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetAt < now) {
      rateLimitMap.delete(key);
    }
  }
}

function getClientIp(request: Request | globalThis.Request): string {
  // Trust Cloudflare's connecting IP first to prevent spoofing
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp.trim();
  }

  // PR #977 specifically dictates NOT trusting x-forwarded-for as the primary source,
  // or at all, because it can be spoofed, unless we can validate the proxy. Since we
  // deploy on CF, if CF is bypassed, x-forwarded-for should not be trusted.
  // We remove x-forwarded-for and x-real-ip extraction entirely, returning unknown
  // if no trusted cf-connecting-ip is provided.

  return 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Sweep expired entries occasionally to prevent memory leaks
  if (Math.random() < CLEANUP_PROBABILITY) {
    cleanupRateLimitMap(now);
  }

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count++;
  return true;
}

// Zod validation schemas
const CommentsGetSchema = z.object({
  questionId: z.string().regex(/^[a-zA-Z0-9_-]+$/).optional().nullable(),
  counts: z.string().regex(/^[a-zA-Z0-9_,-]+$/).optional().nullable(),
});

const CommentsPostSchema = z.object({
  questionId: z.string().regex(/^[a-zA-Z0-9_-]+$/),
  content: z.string().min(1).max(1000),
  userName: z.string().min(1).max(100).optional().nullable(),
  userId: z.string().uuid().optional().nullable(),
});

/**
 * Handle fetching and posting question comments
 * - ?questionId=ID → full approved comments for one question
 * - ?counts=id1,id2 → aggregated approved comment counts (no new tables)
 */
export const GET: APIRoute = async ({ url, locals }) => {
  const questionIdParam = url.searchParams.get('questionId');
  const countsParam = url.searchParams.get('counts');

  // Input Validation via Zod
  const validationResult = CommentsGetSchema.safeParse({
    questionId: questionIdParam,
    counts: countsParam,
  });

  if (!validationResult.success) {
    return new Response(JSON.stringify({ error: 'Parámetros de consulta inválidos.', details: validationResult.error.format() }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { questionId, counts: validatedCounts } = validationResult.data;

  if (!questionId && !validatedCounts) {
    return new Response(JSON.stringify({ error: 'questionId or counts is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    const supabase = createServerSupabaseClient(env);

    if (validatedCounts) {
      const ids = validatedCounts
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)
        .slice(0, 80);

      const counts: Record<string, number> = {};
      for (const id of ids) counts[id] = 0;

      if (ids.length === 0) {
        return new Response(JSON.stringify({ success: true, counts }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const { data, error } = await supabase
        .from('question_comments')
        .select('question_id')
        .in('question_id', ids)
        .eq('is_approved', true);

      if (error) throw error;

      for (const row of data || []) {
        const key = String((row as { question_id?: string }).question_id || '');
        if (!key) continue;
        counts[key] = (counts[key] || 0) + 1;
      }

      return new Response(JSON.stringify({ success: true, counts }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!questionId) {
      return new Response(JSON.stringify({ error: 'questionId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Only show approved comments to public
    const { data, error } = await supabase
      .from('question_comments')
      .select('*')
      .eq('question_id', questionId)
      .eq('is_approved', true)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, comments: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  // Rate limit check
  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded. Try again in 1 minute.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Cuerpo de solicitud inválido.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Input Validation via Zod
    const validationResult = CommentsPostSchema.safeParse(body);
    if (!validationResult.success) {
      return new Response(JSON.stringify({ error: 'Datos de comentario inválidos.', details: validationResult.error.format() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { questionId, content: commentContent } = validationResult.data;

    const env = getServerRuntimeEnv(locals as RuntimeLocals);

    // Auth Check
    const authHeader = request.headers.get('Authorization');
    let authenticatedUserId: string | null = null;
    let authenticatedUserName: string = 'Anónimo';

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const userSupabase = createServerSupabaseClient(env, token);
      const { data: { user }, error: authError } = await userSupabase.auth.getUser();
      if (!authError && user) {
        authenticatedUserId = user.id;
        authenticatedUserName = user.user_metadata?.user_name || user.email?.split('@')[0] || 'Usuario';
      }
    }

    const adminSupabase = createAdminSupabaseClient(env);

    // Default is_approved = false (moderation active)
    const { data, error } = await (adminSupabase
      .from('question_comments') as any)
      .insert([
        {
          question_id: questionId,
          content: commentContent,
          user_name: authenticatedUserName,
          user_id: authenticatedUserId,
          is_approved: false
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Notify moderator via Telegram
    if (data) {
      await notifyModeratorOfNewComment(
        {
          id: data.id,
          content: data.content,
          user_name: data.user_name,
          question_id: String(data.question_id),
        },
        env
      );
    }

    return new Response(JSON.stringify({ success: true, comment: data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
