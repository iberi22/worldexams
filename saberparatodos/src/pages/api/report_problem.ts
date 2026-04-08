import type { APIRoute } from 'astro';
import { getServerRuntimeEnv, type RuntimeLocals } from '../../lib/server-runtime';

interface ReportBody {
  reportType: string;
  questionId: string | null;
  message: string;
  userContext?: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = (await request.json()) as ReportBody;
    const { reportType, message } = body;

    if (!reportType || !message) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const env = getServerRuntimeEnv(locals as RuntimeLocals);
    if (!env.supabaseUrl) {
      return new Response(JSON.stringify({ error: 'Supabase runtime no configurado' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
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
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return new Response(
      JSON.stringify({
        error: 'Error interno al procesar el reporte.',
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
