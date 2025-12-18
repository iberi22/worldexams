import { createClient } from '@supabase/supabase-js';

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const request = context.request;
  const env = context.env;
  const url = new URL(request.url);

  // 1. Handle CORS Preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, x-api-key",
      },
    });
  }

  // 2. Allow public content routes without authentication
  // Static JSON files in /api/ are public and don't require API key for saberparatodos.space users
  if (url.pathname.startsWith('/api/') && url.pathname.endsWith('.json')) {
    const response = await context.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Content-Type", "application/json");

    // For same-origin requests (saberparatodos.space), allow without API key
    const origin = request.headers.get("Origin");
    if (!origin || origin.includes('saberparatodos.space') || origin.includes('localhost')) {
      return response;
    }

    // For external origins, continue to API key check below
  }

  // 3. Whitelist Check (Origin) - for other resources
  const origin = request.headers.get("Origin");
  const allowedOrigins = [
    "http://localhost:4321",
    "http://localhost:3000",
    "http://localhost:5173",
    "https://saberparatodos.pages.dev",
    "https://saberparatodos.space",
    "https://www.saberparatodos.space"
  ];

  const isWhitelisted = origin && allowedOrigins.some(o => origin.startsWith(o));

  if (isWhitelisted) {
    const response = await context.next();
    response.headers.set("Access-Control-Allow-Origin", origin);
    
    // Only set Content-Type to JSON if it's an API call
    if (url.pathname.startsWith('/api/')) {
      response.headers.set("Content-Type", "application/json");
    }
    
    return response;
  }

  // 4. API Key Check for external third-party access
  const apiKey = request.headers.get("x-api-key");

  if (apiKey) {
    // Initialize Supabase Client
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

    // Validate Key
    const { data: keyData, error } = await supabase
      .from('api_keys')
      .select('id, status, quota_limit, quota_used')
      .eq('key_hash', apiKey)
      .single();

    if (keyData && keyData.status === 'active') {
       // Check Quota
       if (keyData.quota_used >= keyData.quota_limit) {
         return new Response(JSON.stringify({
           error: "Quota Exceeded",
           message: "You have exceeded your API quota."
         }), {
           status: 429,
           headers: {
             "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*"
           }
         });
       }

       // Async Update Usage (Fire and Forget)
       context.waitUntil(
         supabase.rpc('increment_api_usage', { key_id: keyData.id })
       );

       const response = await context.next();
       response.headers.set("Access-Control-Allow-Origin", "*");
       return response;
    }
  }

  // 5. For API endpoints accessed without valid auth from external origins, deny
  if (url.pathname.startsWith('/api/')) {
    return new Response(JSON.stringify({
      error: "Unauthorized",
      message: "Access from external origins requires a valid 'x-api-key' header. Visit https://saberparatodos.space/api/register to get your API key."
    }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  // 6. Allow all other requests (HTML pages, assets, etc.)
  return context.next();
};
