import type { APIRoute } from 'astro';
import { createPublicSupabaseClient } from '../../../../lib/developers-auth';

// Rate limiting: max 3 POST requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const CLEANUP_PROBABILITY = 0.05; // 5% chance to run cleanup on request to prevent memory leaks

function cleanupRateLimitMap(now: number) {
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetAt < now) {
      rateLimitMap.delete(key);
    }
  }
}

function getClientIp(request: Request | globalThis.Request): string {
  // Trust Cloudflare's connecting IP first to prevent spoofing
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp.trim();
  }

  // PR #977 specifically dictates NOT trusting x-forwarded-for as the primary source,
  // or at all, because it can be spoofed, unless we can validate the proxy. Since we
  // deploy on CF, if CF is bypassed, x-forwarded-for should not be trusted.
  // We remove x-forwarded-for and x-real-ip extraction entirely, returning unknown
  // if no trusted cf-connecting-ip is provided.

  return 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Sweep expired entries occasionally to prevent memory leaks
  if (Math.random() < CLEANUP_PROBABILITY) {
    cleanupRateLimitMap(now);
  }

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

export const POST: APIRoute = async ({ request, locals }) => {
  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({ error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

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
