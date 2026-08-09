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

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  return 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
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

    const { questionId, content, userName, userId } = validationResult.data;

    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    const supabase = createAdminSupabaseClient(env);

    // Default is_approved = false (moderation active)
    const { data, error } = await (supabase
      .from('question_comments') as any)
      .insert([
        {
          question_id: questionId,
          content,
          user_name: userName || 'Anónimo',
          user_id: userId || null,
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
