import type { APIRoute } from 'astro';
import { createPublicSupabaseClient } from '../../../../lib/developers-auth';

export const GET: APIRoute = async ({ request, locals }) => {
  const origin = new URL(request.url).origin;
  const callbackUrl = `${origin}/api/developers/auth/callback`;
  const client = createPublicSupabaseClient(locals);
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: callbackUrl,
    },
  });

  if (error || !data.url) {
    const target = new URL('/developers/dashboard', origin);
    target.searchParams.set('error', 'github');
    return new Response(null, {
      status: 303,
      headers: {
        Location: target.toString(),
      },
    });
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: data.url,
    },
  });
};
