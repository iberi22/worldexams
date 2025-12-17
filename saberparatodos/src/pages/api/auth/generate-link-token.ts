import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  // 1. Auth Check (Must be logged in)
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return new Response('Unauthorized', { status: 401 });

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 2. Generate Code
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code

  // 3. Store in DB
  const { error: dbError } = await supabase
    .from('bot_linking_codes')
    .insert({
      code: code,
      user_id: user.id
    } as any);

  if (dbError) {
    console.error(dbError);
    return new Response('Error generating code', { status: 500 });
  }

  // 4. Return Code
  return new Response(JSON.stringify({
    code: code,
    bot_link: `https://t.me/SaberParaTodosBot?start=${code}`
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
