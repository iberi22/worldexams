import type { APIRoute } from 'astro';
import { createServerSupabaseClient, getServerRuntimeEnv, type RuntimeLocals } from '../../../lib/server-runtime';

export const POST: APIRoute = async ({ request, locals }) => {
  // 1. Auth Check (Must be logged in)
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return new Response('Unauthorized', { status: 401 });

  const token = authHeader.replace('Bearer ', '');
  const env = getServerRuntimeEnv(locals as RuntimeLocals);
  const supabase = createServerSupabaseClient(env, token);

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 2. Generate Code securely
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const code = (100000 + (array[0] % 900000)).toString(); // 6 digit code

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
