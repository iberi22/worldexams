import type { APIRoute } from 'astro';
import { createAdminSupabaseClient, getServerRuntimeEnv, type RuntimeLocals } from '../../lib/server-runtime';
import { answerTelegramCallback, updateTelegramModerationMessage } from '../../lib/telegram';

function htmlResponse(title: string, detail: string, status = 200) {
  const body = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 0; background: #0b1117; color: #f4f7fb; }
      main { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      section { max-width: 520px; background: #111a22; border: 1px solid #223140; border-radius: 16px; padding: 24px; }
      h1 { margin: 0 0 12px; font-size: 1.3rem; }
      p { margin: 0; line-height: 1.6; color: #c8d3de; }
    </style>
  </head>
  <body>
    <main>
      <section>
        <h1>${title}</h1>
        <p>${detail}</p>
      </section>
    </main>
  </body>
</html>`;

  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

async function applyModerationAction(action: string, commentId: string, locals: RuntimeLocals) {
  const env = getServerRuntimeEnv(locals);
  const supabase = createAdminSupabaseClient(env);

  if (action === 'app') {
    const { error } = await (supabase
      .from('question_comments') as any)
      .update({ is_approved: true })
      .eq('id', commentId);

    if (error) throw error;
    return { env, label: 'aprobado' as const };
  }

  if (action === 'rej') {
    const { error } = await supabase
      .from('question_comments')
      .delete()
      .eq('id', commentId);

    if (error) throw error;
    return { env, label: 'rechazado' as const };
  }

  throw new Error('Invalid moderation action');
}

function isAuthorized(secret: string | null, locals: RuntimeLocals) {
  const env = getServerRuntimeEnv(locals);
  return !!env.telegramModerationSecret && secret === env.telegramModerationSecret;
}

function getCsrfToken(request: Request): string | null {
  const authHeader = request.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return null;
}

function isValidOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  // Require valid origin/referer for CSRF protection
  if (!origin && !referer) return false;
  const allowedOrigins = [
    'http://localhost:4321',
    'https://saberparatodos.com',
    'https://www.saberparatodos.com',
  ];
  return allowedOrigins.some(
    (o) => (origin && origin === o) || (referer && referer.startsWith(o))
  );
}

export const POST: APIRoute = async ({ request, locals }) => {
  // CSRF protection: require Bearer token OR valid origin/referer
  const csrfToken = getCsrfToken(request);
  if (!csrfToken && !isValidOrigin(request)) {
    return htmlResponse('No autorizado', 'Solicitud no permitida.', 403);
  }

  let body: { secret?: string; action?: string; commentId?: string };
  try {
    body = await request.json();
  } catch {
    return htmlResponse('Solicitud inválida', 'El cuerpo debe ser JSON válido.', 400);
  }

  const { secret, action, commentId } = body;
  if (!isAuthorized(secret ?? null, locals as RuntimeLocals)) {
    return htmlResponse('No autorizado', 'El enlace de moderación no es válido.', 401);
  }

  if (!action || !commentId) {
    return htmlResponse('Solicitud inválida', 'Faltan parámetros de moderación.', 400);
  }

  try {
    const { env: _env, label } = await applyModerationAction(action, commentId ?? '', locals as RuntimeLocals);
    const message =
      label === 'aprobado'
        ? 'El comentario ya fue aprobado y quedó visible públicamente.'
        : 'El comentario fue rechazado y eliminado.';
    return htmlResponse(`Comentario ${label}`, message);
  } catch (err: any) {
    console.error('Moderation POST Error:', err);
    return htmlResponse('Error de moderación', 'No fue posible completar la acción.', 500);
  }
};

/**
 * Handle Telegram Webhook callbacks for comment moderation
 */
export const POSTTelegram: APIRoute = async ({ request, url, locals }) => {
  const secret = url.searchParams.get('secret');
  if (!isAuthorized(secret, locals as RuntimeLocals)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const update = await request.json();

    if (!update.callback_query) {
      return new Response('OK');
    }

    const { id: callbackId, data, message } = update.callback_query;
    if (!data || !data.startsWith('mod:')) {
      return new Response('OK');
    }

    const [_prefix, action, commentId = ''] = data.split(':');
    const { env, label } = await applyModerationAction(action, commentId, locals as RuntimeLocals);

    if (label === 'aprobado') {
      await answerTelegramCallback(callbackId, '✅ Comentario Aprobado', env);
      if (message?.chat?.id && message?.message_id) {
        await updateTelegramModerationMessage(
          message.chat.id,
          message.message_id,
          `✅ <b>Comentario Aprobado</b>\n\n${message.text || ''}`,
          env
        );
      }
    } else {
      await answerTelegramCallback(callbackId, '❌ Comentario Rechazado', env);
      if (message?.chat?.id && message?.message_id) {
        await updateTelegramModerationMessage(
          message.chat.id,
          message.message_id,
          `❌ <b>Comentario Rechazado/Eliminado</b>\n\n${message.text || ''}`,
          env
        );
      }
    }

    return new Response('OK');
  } catch (err: any) {
    console.error('Moderation API Error:', err);
    return new Response('Error', { status: 500 });
  }
};
