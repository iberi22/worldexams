import { createClient } from '@supabase/supabase-js';

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const request = context.request;
  const env = context.env;

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

  // 2. Whitelist Check (Origin)
  // Allow our own apps to access without API Key
  const origin = request.headers.get("Origin");
  const allowedOrigins = [
    "http://localhost:4321",
    "http://localhost:3000",
    "https://saberparatodos.pages.dev",
    "https://worldexams.org"
  ];

  const isWhitelisted = origin && allowedOrigins.some(o => origin.startsWith(o));

  if (isWhitelisted) {
    const response = await context.next();
    response.headers.set("Access-Control-Allow-Origin", origin);
    return response;
  }

  // 3. API Key Check
  const apiKey = request.headers.get("x-api-key");

  if (apiKey) {
    // Initialize Supabase Client
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

    // Validate Key
    // Note: In production, apiKey should be hashed before comparison if stored hashed.
    // For this implementation, we compare directly against 'key_hash' column.
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
       // We use context.waitUntil to not block the response
       context.waitUntil(
         supabase.rpc('increment_api_usage', { key_id: keyData.id })
       );

       const response = await context.next();
       response.headers.set("Access-Control-Allow-Origin", "*");
       return response;
    }
  }

  // 4. Unauthorized
  return new Response(JSON.stringify({
    error: "Unauthorized",
    message: "Access denied. Please provide a valid 'x-api-key' header or use an authorized origin."
  }), {
    status: 403,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
};
