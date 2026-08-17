import type { APIRoute } from 'astro';
import { getServerRuntimeEnv, type RuntimeLocals } from '../../lib/server-runtime';

interface ReportBody {
  reportType: string;
  questionId: string | null;
  message: string;
  userContext?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Rate limiting: max 5 POST requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
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

export const ALL: APIRoute = async ({ request, locals }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return jsonResponse({ error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' }, 429);
  }

  try {
    const body = (await request.json()) as ReportBody;
    const { reportType, message } = body;

    if (!reportType || !message) {
      return jsonResponse({ error: 'Faltan campos requeridos' }, 400);
    }

    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    if (!env.supabaseUrl) {
      return jsonResponse({ error: 'Supabase runtime no configurado' }, 500);
    }

    const response = await fetch(`${env.supabaseUrl}/functions/v1/report-problem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();

    return new Response(responseText, {
      status: response.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return jsonResponse(
      {
        error: 'Error interno al procesar el reporte.',
        details: errorMessage,
      },
      500
    );
  }
};
