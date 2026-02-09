import type { APIRoute } from 'astro';

interface ReportBody {
  reportType: string;
  questionId: string | null;
  message: string;
  userContext?: string;
}

export const POST: APIRoute = async ({ request }) => {
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

    // In development, we log the report and return success
    // In production, the Cloudflare Function handles Telegram integration
    const telegramBotToken = import.meta.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = import.meta.env.TELEGRAM_CHAT_ID;

    if (!telegramBotToken || !telegramChatId) {
      // Log to console in development
      console.log('📩 [DEV] Report received:');
      console.log('   Type:', reportType);
      console.log('   Question ID:', questionId || 'N/A');
      console.log('   Message:', message);
      console.log('   Context:', userContext || 'N/A');

      return new Response(JSON.stringify({
        success: true,
        dev: true,
        message: 'Reporte guardado localmente (modo desarrollo)'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send to Telegram if credentials are available
    const text = `
🚨 *NUEVO REPORTE* 🚨

📌 *Tipo:* ${reportType}
🆔 *ID Pregunta:* \`${questionId || 'N/A'}\`
👤 *Usuario:* ${userContext || 'Anónimo'}

📝 *Mensaje:*
${message}
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json() as { ok: boolean };

    if (!result.ok) {
      console.error('Telegram API Error:', result);
      throw new Error('Error sending to Telegram');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
