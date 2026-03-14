const TELEGRAM_API_BASE = 'https://api.telegram.org/bot';

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
}

export interface TelegramMessage {
  message_id: number;
  from: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
}

export interface TelegramCallbackQuery {
  id: string;
  from: TelegramUser;
  message?: TelegramMessage;
  data?: string;
}

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  username?: string;
  language_code?: string;
}

export interface TelegramChat {
  id: number;
  type: string;
}

export class TelegramClient {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async sendMessage(
    chatId: number,
    text: string,
    options: {
      parse_mode?: 'Markdown' | 'HTML',
      reply_markup?: any
    } = {}
  ) {
    try {
      const response = await fetch(`${TELEGRAM_API_BASE}${this.token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: options.parse_mode || 'Markdown',
          reply_markup: options.reply_markup
        })
      });

      if (!response.ok) {
          console.error('Telegram Send Error:', await response.text());
      }
    } catch (e) {
      console.error('Telegram Network Error:', e);
    }
  }

  async sendChatAction(chatId: number, action: 'typing' | 'upload_photo' = 'typing') {
    try {
      await fetch(`${TELEGRAM_API_BASE}${this.token}/sendChatAction`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              chat_id: chatId,
              action: action
          })
      });
    } catch (e) {
        console.error('Telegram Action Error:', e);
    }
  }

  async answerCallbackQuery(callbackQueryId: string, text?: string) {
    try {
        await fetch(`${TELEGRAM_API_BASE}${this.token}/answerCallbackQuery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                callback_query_id: callbackQueryId,
                text: text
            })
        });
    } catch (e) {
        console.error('Telegram Answer Callback Error:', e);
    }
  }
}
