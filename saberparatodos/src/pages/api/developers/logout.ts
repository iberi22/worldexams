import type { APIRoute } from 'astro';
import { clearDeveloperSession } from '../../../lib/developers-auth';

export const POST: APIRoute = async ({ cookies }) => {
  clearDeveloperSession(cookies);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
