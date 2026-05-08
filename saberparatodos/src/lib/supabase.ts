import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
export const relayUrl = import.meta.env.PUBLIC_RELAY_URL || 'ws://localhost:8765/ws';

const fallbackSupabaseUrl = 'http://127.0.0.1:54321';
const fallbackSupabaseAnonKey = 'missing-public-anon-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[Supabase] Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY. Using safe fallback client; auth/network calls may fail until env is configured.'
  );
}

export const supabase = createClient<Database>(
  supabaseUrl || fallbackSupabaseUrl,
  supabaseAnonKey || fallbackSupabaseAnonKey
);

// =============================================================================
// Edge Function Helpers
// =============================================================================

/**
 * Generate a new API Key for an organization
 */
export async function generateApiKey(
  organization_id: string,
  name?: string
): Promise<{ message: string; apiKey: string; id: string; prefix: string }> {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error('No authenticated session');
  }

  const response = await fetch(
    `${supabaseUrl}/functions/v1/generate-key`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ organization_id, name }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate API key');
  }

  return response.json();
}



/**
 * Get current user profile with credits
 */
export async function getUserProfile() {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}
