import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

/**
 * Handle fetching and posting question comments
 */
export const GET: APIRoute = async ({ url }) => {
  const questionId = url.searchParams.get('questionId');

  if (!questionId) {
    return new Response(JSON.stringify({ error: 'questionId is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { data, error } = await supabase
      .from('question_comments')
      .select('*')
      .eq('question_id', questionId)
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { questionId, content, userName, userId } = body;

    if (!questionId || !content) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await (supabase
      .from('question_comments') as any)
      .insert([
        {
          question_id: questionId,
          content,
          user_name: userName || 'Anónimo',
          user_id: userId || null
        }
      ])
      .select()
      .single();

    if (error) throw error;

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
