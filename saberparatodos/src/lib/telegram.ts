import type { ServerRuntimeEnv } from './server-runtime';

type ModerationComment = {
  id: string | number;
  content: string;
  user_name: string;
  question_id: string;
};

function hasTelegramModerationConfig(
  env: Pick<ServerRuntimeEnv, 'supabaseUrl' | 'telegramModerationSecret'>
) {
  return !!(env.supabaseUrl && env.telegramModerationSecret);
}

export async function notifyModeratorOfNewComment(
  comment: ModerationComment,
  env: Pick<ServerRuntimeEnv, 'supabaseUrl' | 'telegramModerationSecret'>
) {
  if (!hasTelegramModerationConfig(env)) {
    console.warn('Telegram edge moderation config missing (PUBLIC_SUPABASE_URL or TELEGRAM_MODERATION_SECRET)');
    return { ok: false, skipped: true as const };
  }

  try {
    const response = await fetch(
      `${env.supabaseUrl}/functions/v1/telegram-bot?secret=${encodeURIComponent(env.telegramModerationSecret)}`,
      {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          type: 'comment_moderation',
          comment,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('Telegram Edge API error:', err);
      return { ok: false, skipped: false as const };
    }

    return { ok: true, skipped: false as const };
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return { ok: false, skipped: false as const };
  }
}

export async function answerTelegramCallback(
  callbackId: string,
  text: string,
  env: Pick<ServerRuntimeEnv, 'telegramBotToken'>
) {
  if (!env.telegramBotToken) {
    console.warn('Telegram bot token missing while answering callback');
    return;
  }

  await fetch(`https://api.telegram.org/bot${env.telegramBotToken}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackId, text }),
  });
}

export async function updateTelegramModerationMessage(
  chatId: number,
  messageId: number,
  newText: string,
  env: Pick<ServerRuntimeEnv, 'telegramBotToken'>
) {
  if (!env.telegramBotToken) {
    console.warn('Telegram bot token missing while updating moderation message');
    return;
  }

  await fetch(`https://api.telegram.org/bot${env.telegramBotToken}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: newText,
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: [] },
    }),
  });
}
