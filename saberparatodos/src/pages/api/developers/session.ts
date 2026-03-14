import type { APIRoute } from 'astro';
import { resolveDeveloperSession } from '../../../lib/developers-auth';

export const GET: APIRoute = async ({ cookies, locals }) => {
  const session = await resolveDeveloperSession(cookies, locals);

  if (!session) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
      },
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
