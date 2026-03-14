import { createClient } from '@supabase/supabase-js';

const SESSION_COOKIE = 'we_dev_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

type RuntimeLocals = {
  runtime?: {
    env?: Record<string, string | undefined>;
  };
};

type DeveloperSessionPayload = {
  accessToken: string;
  refreshToken: string;
};

function getEnv(locals?: RuntimeLocals) {
  const runtimeEnv = locals?.runtime?.env ?? {};
  const supabaseUrl = runtimeEnv.PUBLIC_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = runtimeEnv.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Faltan las variables públicas de autenticación para el portal de developers.');
  }

  return { supabaseUrl, supabaseAnonKey };
}

export function createPublicSupabaseClient(locals?: RuntimeLocals, accessToken?: string) {
  const { supabaseUrl, supabaseAnonKey } = getEnv(locals);
  const options = accessToken
    ? {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    : undefined;

  return createClient(supabaseUrl, supabaseAnonKey, options);
}

export function getSupabaseUrl(locals?: RuntimeLocals) {
  return getEnv(locals).supabaseUrl;
}

function parseSessionCookie(value: string | undefined): DeveloperSessionPayload | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<DeveloperSessionPayload>;
    if (!parsed.accessToken || !parsed.refreshToken) return null;
    return {
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
    };
  } catch {
    return null;
  }
}

export function readDeveloperSession(cookies: { get: (name: string) => { value: string } | undefined }) {
  return parseSessionCookie(cookies.get(SESSION_COOKIE)?.value);
}

export function writeDeveloperSession(
  cookies: {
    set: (name: string, value: string, options: Record<string, unknown>) => void;
  },
  session: { access_token: string; refresh_token: string }
) {
  cookies.set(
    SESSION_COOKIE,
    encodeURIComponent(
      JSON.stringify({
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
      } satisfies DeveloperSessionPayload)
    ),
    {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: !import.meta.env.DEV,
      maxAge: SESSION_MAX_AGE,
    }
  );
}

export function clearDeveloperSession(cookies: {
  delete: (name: string, options: Record<string, unknown>) => void;
}) {
  cookies.delete(SESSION_COOKIE, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: !import.meta.env.DEV,
  });
}

export async function resolveDeveloperSession(
  cookies: {
    get: (name: string) => { value: string } | undefined;
    set: (name: string, value: string, options: Record<string, unknown>) => void;
    delete: (name: string, options: Record<string, unknown>) => void;
  },
  locals?: RuntimeLocals
) {
  const stored = readDeveloperSession(cookies);
  if (!stored) return null;

  const client = createPublicSupabaseClient(locals);

  const getUserFromToken = async (accessToken: string) => {
    const { data, error } = await client.auth.getUser(accessToken);
    if (error || !data.user) return null;
    return data.user;
  };

  let accessToken = stored.accessToken;
  let refreshToken = stored.refreshToken;
  let user = await getUserFromToken(accessToken);

  if (!user) {
    const refreshResult = await (client.auth as any).refreshSession({
      refresh_token: refreshToken,
    });

    const refreshedSession = refreshResult?.data?.session;
    if (!refreshedSession) {
      clearDeveloperSession(cookies);
      return null;
    }

    accessToken = refreshedSession.access_token;
    refreshToken = refreshedSession.refresh_token;
    writeDeveloperSession(cookies, refreshedSession);
    user = await getUserFromToken(accessToken);
  }

  if (!user) {
    clearDeveloperSession(cookies);
    return null;
  }

  return {
    user,
    accessToken,
    refreshToken,
    client: createPublicSupabaseClient(locals, accessToken),
  };
}
