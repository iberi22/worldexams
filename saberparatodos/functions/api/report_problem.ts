
interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json() as any;

    const { questionId, reportType, message, userContext } = body;

    // Validation
    if (!reportType || !message) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      // Return success in dev/preview if secrets missing to avoid breaking UI
      console.warn('Missing Telegram Secrets');
      return new Response(JSON.stringify({ success: true, warning: 'Secrets missing' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Format Message
    const text = `
🚨 *NUEVO REPORTE* 🚨

📌 *Tipo:* ${reportType}
🆔 *ID Pregunta:* \`${questionId || 'N/A'}\`
👤 *Usuario:* ${userContext || 'Anónimo'}

📝 *Mensaje:*
${message}
    `.trim();

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json();

    if (!result.ok) {
       console.error('Telegram API Error:', result);
       throw new Error('Error sending to Telegram');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
