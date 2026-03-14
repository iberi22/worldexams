import type { APIRoute } from 'astro';
import { createPublicSupabaseClient, writeDeveloperSession } from '../../../../lib/developers-auth';

function redirectToDashboard(origin: string, error?: string) {
  const target = new URL('/developers/dashboard', origin);
  if (error) target.searchParams.set('error', error);

  return new Response(null, {
    status: 303,
    headers: {
      Location: target.toString(),
    },
  });
}

export const GET: APIRoute = async ({ request, url, locals, cookies }) => {
  const origin = new URL(request.url).origin;
  const client = createPublicSupabaseClient(locals);

  const code = url.searchParams.get('code');
  if (code) {
    const exchangeResult = await (client.auth as any).exchangeCodeForSession(code);
    const session = exchangeResult?.data?.session;

    if (!session) {
      return redirectToDashboard(origin, 'github');
    }

    writeDeveloperSession(cookies, session);
    return redirectToDashboard(origin);
  }

  const tokenHash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type');
  if (tokenHash && type) {
    const verification = await client.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as any,
    });

    if (verification.error || !verification.data.session) {
      return redirectToDashboard(origin, 'magic-link');
    }

    writeDeveloperSession(cookies, verification.data.session);
    return redirectToDashboard(origin);
  }

  return redirectToDashboard(origin, 'auth');
};
