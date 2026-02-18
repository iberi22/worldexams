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

    const privateBotToken = env.TELEGRAM_BOT_TOKEN;
    const privateChatId = env.TELEGRAM_CHAT_ID;
    const communityBotToken = env.COMMUNITY_BOT_TOKEN;
    const communityChatId = env.COMMUNITY_CHAT_ID;

    // Determine destination
    const isSuggestion = reportType.toLowerCase().includes('feedback') || reportType.toLowerCase().includes('sugerencia');
    const botToken = isSuggestion ? (communityBotToken || privateBotToken) : privateBotToken;
    const chatId = isSuggestion ? (communityChatId || privateChatId) : privateChatId;

    if (!botToken || !chatId) {
      // Log to console in development/logs
      const logMsg = `📩 [REPORT] Received (${isSuggestion ? 'Community' : 'Private'}): Type=${reportType}, Msg=${message.substring(0, 50)}...`;
      console.log(logMsg);

      // If we are in production and tokens are missing, it's a configuration error
      const isProd = import.meta.env.PROD;
      if (isProd) {
        return new Response(JSON.stringify({
          error: 'Configuración de Telegram incompleta en el servidor.',
          details: `Missing ${isSuggestion ? 'Community or Private' : 'Private'} tokens.`
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        dev: true,
        message: 'Reporte simulado (token no configurado)'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if token is still placeholder
    if (botToken === 'tu_token_aqui' || chatId === 'tu_chat_id_aqui') {
       throw new Error('Telegram credentials are still set to placeholders in .env/dashboard.');
    }

    // Send to Telegram
    const headerEmoji = isSuggestion ? '💡 SUGERENCIA' : '🚨 REPORTE DE ERROR';
    const text = `
*${headerEmoji}*

📌 *Tipo:* ${reportType}
🆔 *ID Pregunta:* \`${questionId || 'N/A'}\`
👤 *Usuario:* ${userContext || 'Anónimo'}

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

    // Add voting buttons if it's a community suggestion
    if (isSuggestion) {
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
      console.error('Telegram API Error:', result);
      throw new Error(`Telegram API: ${result.description || 'Unknown error'}`);
    }

    return new Response(JSON.stringify({ success: true }), {
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
```
