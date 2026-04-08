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
