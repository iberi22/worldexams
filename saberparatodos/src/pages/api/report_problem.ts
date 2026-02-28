import type { APIRoute } from 'astro';

interface ReportBody {
  reportType: string;
  questionId: string | null;
  message: string;
  userContext?: string;
}

export const POST: APIRoute = async (context) => {
  const { request, locals } = context;
  try {
    const body = await request.json() as ReportBody;
    const { questionId, reportType, message, userContext } = body;

    // Validation
    if (!reportType || !message) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Access environment (Cloudflare runtime env takes precedence over build-time env)
    const env = (locals as any).runtime?.env || import.meta.env;

    // Helper to clean environment variables (removing leading =, quotes, etc.)
    const cleanEnvVar = (val: any) => {
      if (!val || typeof val !== 'string') return '';
      let cleaned = val.trim();
      if (cleaned.startsWith('=')) cleaned = cleaned.substring(1).trim();
      if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
        cleaned = cleaned.substring(1, cleaned.length - 1).trim();
      }
      return cleaned;
    };

    const privateBotToken = cleanEnvVar(env.TELEGRAM_BOT_TOKEN);
    const privateChatId = cleanEnvVar(env.TELEGRAM_CHAT_ID);
    const communityBotToken = cleanEnvVar(env.COMMUNITY_BOT_TOKEN);
    const communityChatId = cleanEnvVar(env.COMMUNITY_CHAT_ID);

    const isPlaceholder = (val: string) => !val || val.includes('tu_token_aqui') || val.includes('tu_id_de_grupo_aqui') || val === '';

    // Determine destination
    const isSuggestion = (reportType || '').toLowerCase().includes('feedback') ||
                        (reportType || '').toLowerCase().includes('sugerencia') ||
                        (reportType || '').toLowerCase().includes('mejora') ||
                        (reportType || '').toLowerCase().includes('propuesta');

    let botToken = privateBotToken;
    let chatId = privateChatId;
    let destinationLabel = 'Private';

    if (isSuggestion) {
      if (!isPlaceholder(communityBotToken) && !isPlaceholder(communityChatId)) {
        botToken = communityBotToken;
        chatId = communityChatId;
        destinationLabel = 'Community';
      } else {
        console.log('⚠️ [REPORT] Community tokens are missing or placeholders. Falling back to Private Telegram bot.');
        destinationLabel = 'Private (Fallback)';
      }
    }

    // Final check for the selected tokens
    if (isPlaceholder(botToken) || isPlaceholder(chatId)) {
      const logMsg = `📩 [REPORT] Received (${destinationLabel}): Type=${reportType}, Msg=${message.substring(0, 50)}...`;
      console.log(logMsg);
      console.error(`❌ [REPORT] Selected tokens for ${destinationLabel} are invalid or placeholders.`);

      // If we are in production and tokens are missing, it's a configuration error
      const isProd = import.meta.env.PROD;
      if (isProd) {
        return new Response(JSON.stringify({
          error: 'Configuración de Telegram incompleta en el servidor.',
          details: `Missing valid tokens for destination: ${destinationLabel}. Please check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.`
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        dev: true,
        message: 'Reporte simulado (tokens no configurados o placeholders)'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send to Telegram
    const headerEmoji = isSuggestion ? '💡 SUGERENCIA / FEEDBACK' : '🚨 REPORTE DE ERROR';
    const text = `
*${headerEmoji}*

📌 *Tipo:* ${reportType}
🆔 *ID Pregunta:* \`${questionId || 'N/A'}\`
👤 *Contexto:* ${userContext || 'Anónimo'}

📝 *Mensaje:*
${message}
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Prepare message payload
    const payload: any = {
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown'
    };

    // Add voting buttons if it's a community suggestion (specifically for COMMUNITY destination)
    if (destinationLabel === 'Community') {
      payload.reply_markup = {
        inline_keyboard: [
          [
            { text: '⭐ Útil', callback_data: 'vote_up' },
            { text: '❌ No prioritario', callback_data: 'vote_down' }
          ],
          [
            { text: '💬 Abrir Debate', url: `https://t.me/WorldExams` }
          ]
        ]
      };
    }

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json() as { ok: boolean, description?: string };

    if (!result.ok) {
      console.error(`Telegram API Error (${destinationLabel}):`, result);
      throw new Error(`Telegram API (${destinationLabel}): ${result.description || 'Unknown error'}`);
    }

    console.log(`✅ [REPORT] Successfully sent to ${destinationLabel} Telegram.`);
    return new Response(JSON.stringify({ success: true, destination: destinationLabel }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Report API 500:', errorMessage);
    return new Response(JSON.stringify({
      error: 'Error interno al procesar el reporte.',
      message: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

