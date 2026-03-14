import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export type RuntimeLocals = {
  runtime?: {
    env?: Record<string, string | undefined>;
  };
};

export type ServerRuntimeEnv = {
  siteUrl: string;
  supabaseUrl: string;
  anonKey: string;
  serviceRoleKey: string;
  telegramBotToken: string;
  telegramChatId: string;
  telegramModerationSecret: string;
};

export function cleanEnvVar(val: unknown) {
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

export function getServerRuntimeEnv(locals?: RuntimeLocals): ServerRuntimeEnv {
  const runtimeEnv = locals?.runtime?.env ?? {};

  return {
    siteUrl: cleanEnvVar(runtimeEnv.PUBLIC_SITE_URL || import.meta.env.PUBLIC_SITE_URL || '') || 'https://saberparatodos.space',
    supabaseUrl: cleanEnvVar(
      runtimeEnv.PUBLIC_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL || ''
    ),
    anonKey: cleanEnvVar(
      runtimeEnv.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY || ''
    ),
    serviceRoleKey: cleanEnvVar(
      runtimeEnv.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY || ''
    ),
    telegramBotToken: cleanEnvVar(
      runtimeEnv.TELEGRAM_BOT_TOKEN || import.meta.env.TELEGRAM_BOT_TOKEN || ''
    ),
    telegramChatId: cleanEnvVar(
      runtimeEnv.TELEGRAM_CHAT_ID ||
        runtimeEnv.TELEGRAM_MODERATOR_CHAT_ID ||
        import.meta.env.TELEGRAM_CHAT_ID ||
        import.meta.env.TELEGRAM_MODERATOR_CHAT_ID ||
        ''
    ),
    telegramModerationSecret: cleanEnvVar(
      runtimeEnv.TELEGRAM_MODERATION_SECRET ||
        runtimeEnv.MODERATION_TOKEN ||
        import.meta.env.TELEGRAM_MODERATION_SECRET ||
        import.meta.env.MODERATION_TOKEN ||
        ''
    ),
  };
}

export function createServerSupabaseClient(
  env: Pick<ServerRuntimeEnv, 'supabaseUrl' | 'anonKey'>,
  accessToken?: string
) {
  if (!env.supabaseUrl || !env.anonKey) {
    throw new Error('Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY in runtime');
  }

  const options = accessToken
    ? {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    : undefined;

  return createClient<Database>(env.supabaseUrl, env.anonKey, options);
}

export function createAdminSupabaseClient(env: Pick<ServerRuntimeEnv, 'supabaseUrl' | 'serviceRoleKey'>) {
  if (!env.supabaseUrl || !env.serviceRoleKey) {
    throw new Error('Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in runtime');
  }

  return createClient<Database>(env.supabaseUrl, env.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
