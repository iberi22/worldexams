import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

interface ReportBody {
  reportType: string;
  questionId: string | null;
  message: string;
  userContext?: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json() as ReportBody;
    const { questionId, reportType, message, userContext } = body;

    // 1. Validation
    if (!reportType || !message) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Save to Database (Primary)
    // This ensures we never lose a report even if Telegram fails
    const { data: dbData, error: dbError } = await (supabase
      .from('user_reports') as any)
      .insert([
        {
          report_type: reportType,
          question_id: questionId,
          message: message,
          user_context: userContext
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('❌ [REPORT] Database Error:', dbError);
      // We continue to try Telegram even if DB fails, but we should log it
    }

    // 3. Telegram Notification (Secondary)
    const env = (locals as any).runtime?.env || (import.meta as any).env || {};

    const cleanEnvVar = (val: any) => {
      if (!val || typeof val !== 'string') return '';
      let cleaned = val.trim();
      if (cleaned.startsWith('=')) cleaned = cleaned.substring(1).trim();
      if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
        cleaned = cleaned.substring(1, cleaned.length - 1).trim();
      }
      return cleaned;
    };

    const botToken = cleanEnvVar(env.TELEGRAM_BOT_TOKEN);
    const chatId = cleanEnvVar(env.TELEGRAM_CHAT_ID);

    const isPlaceholder = (val: string) => !val || val.includes('tu_token_aqui') || val === '';

    let telegramSuccess = false;
    let telegramError = '';

    if (!isPlaceholder(botToken) && !isPlaceholder(chatId)) {
      try {
        const headerEmoji = reportType.toLowerCase().includes('feedback') ? '💡 FEEDBACK' : '🚨 ERROR';
        const text = `
*${headerEmoji}*
📌 *Tipo:* ${reportType}
🆔 *ID Pregunta:* \`${questionId || 'N/A'}\`
👤 *Contexto:* ${userContext || 'Anónimo'}
📝 *Mensaje:*
${message}
        `.trim();

        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'Markdown'
          })
        });

        const result = await response.json() as { ok: boolean, description?: string };
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
      db: !!dbData,
      telegram: telegramSuccess,
      telegramError: telegramError || undefined
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({
      error: 'Error interno al procesar el reporte.',
      details: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

