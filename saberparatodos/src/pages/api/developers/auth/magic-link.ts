import type { APIRoute } from 'astro';
import { createPublicSupabaseClient } from '../../../../lib/developers-auth';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = (await request.json()) as { email?: string };
    const email = String(body.email || '').trim();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Debes ingresar un correo válido.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const origin = new URL(request.url).origin;
    const client = createPublicSupabaseClient(locals);
    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${origin}/api/developers/auth/callback`,
      },
    });

    if (error) {
      return new Response(JSON.stringify({ error: 'No fue posible enviar el enlace de acceso.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Enlace enviado. Revisa tu correo y la carpeta de spam.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'No fue posible procesar la solicitud.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
