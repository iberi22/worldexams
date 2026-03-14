export interface Env {
  SUPABASE_URL: string
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, x-api-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
}

function json(body: Record<string, unknown>, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...headers,
    },
  })
}

function withCors(response: Response) {
  const headers = new Headers(response.headers)
  Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value))
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

function buildUpstreamUrl(env: Env, requestUrl: URL, upstreamPath: string) {
  const upstream = new URL(`${env.SUPABASE_URL}/functions/v1/${upstreamPath}`)
  requestUrl.searchParams.forEach((value, key) => upstream.searchParams.set(key, value))
  return upstream
}

function getProxyHeaders(request: Request, includeApiKey = false) {
  const headers = new Headers()
  const auth = request.headers.get("authorization")
  const apiKey = request.headers.get("x-api-key")
  const userAgent = request.headers.get("user-agent")
  const ipAddress =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()

  if (auth) headers.set("authorization", auth)
  if (includeApiKey && apiKey) headers.set("x-api-key", apiKey)
  if (userAgent) headers.set("user-agent", userAgent)
  if (ipAddress) headers.set("x-forwarded-for", ipAddress)
  return headers
}

async function proxyJson(request: Request, env: Env, upstreamPath: string, includeApiKey = false) {
  const upstreamUrl = buildUpstreamUrl(env, new URL(request.url), upstreamPath)
  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: "GET",
    headers: getProxyHeaders(request, includeApiKey),
  })
  return withCors(upstreamResponse)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (url.pathname === "/" || url.pathname === "/v1") {
      return json({
        name: "SaberParaTodos API",
        version: "2026-03-10",
        docs_url: "https://saberparatodos.space/developers/docs",
        endpoints: {
          health: "/health",
          free_questions: "/v1/questions",
          premium_questions: "/v1/premium/questions",
        },
      })
    }

    if (url.pathname === "/health") {
      return json({
        ok: true,
        service: "worldexams-api",
        version: "2026-03-10",
      })
    }

    if (url.pathname === "/v1/questions" || url.pathname === "/v1/questions/free") {
      return proxyJson(request, env, "get-questions")
    }

    if (url.pathname === "/v1/premium/questions") {
      return proxyJson(request, env, "api-gateway", true)
    }

    return json({
      error: "NOT_FOUND",
      message: "Use /v1/questions, /v1/premium/questions or /health",
    }, 404)
  },
}
