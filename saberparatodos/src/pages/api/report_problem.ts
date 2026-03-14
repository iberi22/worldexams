import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

interface ReportBody {
  reportType: string;
  questionId: string | null;
  message: string;
  userContext?: string;
}

type RuntimeLocals = {
  runtime?: {
    env?: Record<string, string | undefined>;
  };
};

function cleanEnvVar(val: unknown) {
  if (!val || typeof val !== 'string') return '';

  let cleaned = val.trim();

  if (cleaned.startsWith('=')) cleaned = cleaned.substring(1).trim();

  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.substring(1, cleaned.length - 1).trim();
  }

  return cleaned;
}

function getRuntimeEnv(locals: RuntimeLocals) {
  const runtimeEnv = locals.runtime?.env ?? {};

  return {
    supabaseUrl: cleanEnvVar(
      runtimeEnv.PUBLIC_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL || ''
    ),
    serviceRoleKey: cleanEnvVar(
      runtimeEnv.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY || ''
    ),
    anonKey: cleanEnvVar(
      runtimeEnv.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY || ''
    ),
    telegramBotToken: cleanEnvVar(
      runtimeEnv.TELEGRAM_BOT_TOKEN || import.meta.env.TELEGRAM_BOT_TOKEN || ''
    ),
    telegramChatId: cleanEnvVar(
      runtimeEnv.TELEGRAM_CHAT_ID || import.meta.env.TELEGRAM_CHAT_ID || ''
    ),
  };
}

function isPlaceholder(val: string) {
  return !val || val.includes('tu_token_aqui');
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = (await request.json()) as ReportBody;
    const { questionId, reportType, message, userContext } = body;
    const env = getRuntimeEnv(locals as RuntimeLocals);

    if (!reportType || !message) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let dbSuccess = false;

    // Use service role key if available, fall back to anon key for user_reports inserts
    const supabaseKey = env.serviceRoleKey || env.anonKey;

    if (env.supabaseUrl && supabaseKey) {
      const adminSupabase = createClient(env.supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });

      const { error: dbError } = await adminSupabase.from('user_reports').insert([
        {
          report_type: reportType,
          question_id: questionId,
          message,
          user_context: userContext,
        },
      ]);

      if (dbError) {
        console.error('❌ [REPORT] Database Error:', dbError);
      } else {
        dbSuccess = true;
      }
    } else {
      console.error('❌ [REPORT] Missing PUBLIC_SUPABASE_URL or API key in runtime');
    }

    let telegramSuccess = false;
    let telegramError = '';

    if (!isPlaceholder(env.telegramBotToken) && !isPlaceholder(env.telegramChatId)) {
      try {
        const headerEmoji = reportType.toLowerCase().includes('feedback') ? '💡 FEEDBACK' : '🚨 ERROR';
        const text = [
          headerEmoji,
          `Tipo: ${reportType}`,
          `Pregunta: ${questionId || 'N/A'}`,
          `Contexto: ${userContext || 'Anonimo'}`,
          'Mensaje:',
          message,
        ].join('\n');

        const response = await fetch(`https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: env.telegramChatId,
            text,
          }),
        });

        const result = (await response.json()) as { ok: boolean; description?: string };
        telegramSuccess = !!result.ok;
        if (!result.ok) telegramError = result.description || 'Unknown error';
      } catch (e: any) {
        telegramError = e.message;
      }
    } else {
      telegramError = 'Telegram tokens not configured';
    }

    return new Response(JSON.stringify({
      success: true,
      db: dbSuccess,
      telegram: telegramSuccess,
      telegramError: telegramError || undefined,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({
      error: 'Error interno al procesar el reporte.',
      details: errorMessage,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

