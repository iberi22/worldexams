/**
 * CORS helpers for Supabase Edge Functions.
 *
 * - publicCorsHeaders: for read-only public endpoints (questions API, etc.)
 * - getAuthenticatedCorsHeaders: for write/auth endpoints — restricts to allowed origins
 */

const ALLOWED_ORIGINS = [
  'https://saberparatodos.space',
  'https://www.saberparatodos.space',
  'https://saberparatodos.co',
  'https://www.saberparatodos.co',
];

/** For fully public, read-only endpoints (no auth required) */
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

/** For authenticated write endpoints — restricts origin */
export function getAuthenticatedCorsHeaders(origin: string | null): Record<string, string> {
  const allowed =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Vary': 'Origin',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}
