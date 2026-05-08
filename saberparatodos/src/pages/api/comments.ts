import type { APIRoute } from 'astro';
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

/**
 * Handle fetching and posting question comments
 */
export const GET: APIRoute = async ({ url, locals }) => {
  const questionId = url.searchParams.get('questionId');

  if (!questionId) {
    return new Response(JSON.stringify({ error: 'questionId is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    const supabase = createServerSupabaseClient(env);
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
    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    const supabase = createAdminSupabaseClient(env);
    const body = await request.json();
    const { questionId, content, userName, userId } = body;

    if (!questionId || !content) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
