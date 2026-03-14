import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-api-key, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
}

const QUESTIONS_BASE_URL =
  Deno.env.get("QUESTIONS_API_BASE_URL") ||
  Deno.env.get("STATIC_API_BASE_URL") ||
  "https://saberparatodos.pages.dev/api"
const ANCHOR_DATE_MS = Date.parse("2025-01-01T00:00:00Z")
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

function json(body: Record<string, unknown>, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      ...headers,
    },
  })
}

function getRateLimitForTier(tier: string) {
  if (tier === "enterprise") return 300
  if (tier === "pro") return 60
  return 10
}

function normalizeSubject(subject: string) {
  return String(subject || "matematicas")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

function normalizeSubjectKey(subject: string) {
  const normalized = String(subject || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/^_+|_+$/g, "")

  const aliasMap: Record<string, string> = {
    socialesyciudadanas: "sociales_y_ciudadanas",
    sociales_ciudadanas: "sociales_y_ciudadanas",
    sociales_y_ciudadanas: "sociales_y_ciudadanas",
    sociales: "sociales",
    cienciasnaturales: "ciencias_naturales",
    ciencias_naturales: "ciencias_naturales",
    ciencias: "ciencias_naturales",
    lectura_critica: "lectura_critica",
    lecturacritica: "lectura_critica",
    lenguaje: "lectura_critica",
    tecnologiaeinformatica: "tecnologia_informatica",
    tecnologiainformatica: "tecnologia_informatica",
    english: "ingles",
    matematica: "matematicas",
  }

  return aliasMap[normalized] || normalized
}

function getCurrentWeek() {
  const elapsed = Math.max(0, Date.now() - ANCHOR_DATE_MS)
  const week = Math.ceil(elapsed / ONE_WEEK_MS)
  return ((week - 1) % 52) + 1
}

async function fetchPack(grade: string, subject: string) {
  const subjectKey = normalizeSubjectKey(subject)
  const currentWeek = getCurrentWeek()
  const candidates = [
    `week-${currentWeek}-grade-${grade}-subject-${subjectKey}.json`,
    `week-1-grade-${grade}-subject-${subjectKey}.json`,
  ]

  for (const candidate of candidates) {
    const response = await fetch(`${QUESTIONS_BASE_URL}/packs/${candidate}`)
    if (response.ok) {
      return response.json()
    }
  }

  return null
}

async function sha256(value: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(value)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

async function logRequest(
  supabase: ReturnType<typeof createClient>,
  apiKeyId: string,
  endpoint: string,
  statusCode: number,
  request: Request,
  responseTimeMs: number,
) {
  await supabase.from("usage_logs").insert({
    api_key_id: apiKeyId,
    endpoint,
    status_code: statusCode,
    ip_address:
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown",
    user_agent: request.headers.get("user-agent") || "unknown",
    response_time_ms: responseTimeMs,
  })
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const startedAt = Date.now()

  try {
    const rawToken = req.headers.get("x-api-key") ||
      req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "").trim() ||
      ""

    if (!rawToken) {
      return json({
        error: "Unauthorized",
        message: "API key required",
        code: "MISSING_API_KEY",
      }, 401)
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    )

    const tokenHash = await sha256(rawToken)
    const { data: apiKey, error: keyError } = await supabase
      .from("api_keys")
      .select(`
        id,
        organization_id,
        owner_id,
        key_prefix,
        tier,
        monthly_limit,
        current_usage,
        quota_used,
        quota_limit,
        is_active,
        status,
        last_used_at,
        expires_at,
        organizations(name, is_active, plan_tier)
      `)
      .eq("key_hash", tokenHash)
      .maybeSingle()

    if (keyError || !apiKey) {
      console.log(`[api-gateway] Invalid API key from ${req.headers.get("cf-connecting-ip") || "unknown"}`)
      return json({
        error: "Unauthorized",
        message: "Invalid API key",
        code: "INVALID_KEY",
      }, 401)
    }

    const isActive = apiKey.is_active ?? apiKey.status === "active"
    if (!isActive) {
      return json({
        error: "Payment Required",
        message: "API key is inactive.",
        code: "INACTIVE_KEY",
      }, 402)
    }

    if (apiKey.expires_at && new Date(apiKey.expires_at).getTime() <= Date.now()) {
      return json({
        error: "Payment Required",
        message: "API key has expired.",
        code: "KEY_EXPIRED",
      }, 402)
    }

    if (apiKey.organization_id && apiKey.organizations && apiKey.organizations.is_active === false) {
      return json({
        error: "Payment Required",
        message: "Organization subscription is inactive.",
        code: "ORG_INACTIVE",
      }, 402)
    }

    const effectiveTier = apiKey.tier || apiKey.organizations?.plan_tier || "free"
    const rateLimit = getRateLimitForTier(effectiveTier)

    const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString()
    const monthStart = new Date()
    monthStart.setUTCDate(1)
    monthStart.setUTCHours(0, 0, 0, 0)

    const [{ count: recentRequests }, { count: monthRequests }] = await Promise.all([
      supabase
        .from("usage_logs")
        .select("*", { count: "exact", head: true })
        .eq("api_key_id", apiKey.id)
        .gte("created_at", oneMinuteAgo),
      supabase
        .from("usage_logs")
        .select("*", { count: "exact", head: true })
        .eq("api_key_id", apiKey.id)
        .gte("created_at", monthStart.toISOString()),
    ])

    if ((recentRequests || 0) >= rateLimit) {
      return json({
        error: "Rate Limit Exceeded",
        message: `Too many requests. Limit: ${rateLimit}/minute.`,
        code: "RATE_LIMIT",
        retry_after: 60,
      }, 429, {
        "Retry-After": "60",
        "X-RateLimit-Limit": String(rateLimit),
        "X-RateLimit-Remaining": "0",
      })
    }

    const monthlyLimit = Number(apiKey.monthly_limit || apiKey.quota_limit || 100)
    if ((monthRequests || 0) >= monthlyLimit) {
      return json({
        error: "Quota Exceeded",
        message: `Monthly quota exceeded (${monthlyLimit} requests).`,
        code: "QUOTA_EXCEEDED",
      }, 402)
    }

    const url = new URL(req.url)
    const country = (url.searchParams.get("country") || "co").toLowerCase()
    const exam = (url.searchParams.get("exam") || "icfes").toLowerCase()
    const grade = url.searchParams.get("grade") || "11"
    const subject = normalizeSubject(url.searchParams.get("subject") || "matematicas")
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10) || 1)
    const requestedLimit = Math.max(1, parseInt(url.searchParams.get("limit") || "10", 10) || 10)
    const maxLimit = effectiveTier === "enterprise" ? 100 : effectiveTier === "pro" ? 50 : 10
    const limit = Math.min(requestedLimit, maxLimit)

    const pack = await fetchPack(grade, subject)
    if (!pack || !Array.isArray(pack.questions)) {
      await logRequest(supabase, apiKey.id, `/api/questions`, 404, req, Date.now() - startedAt)
      return json({
        error: "Questions not found",
        message: "No questions found for the requested parameters.",
        code: "QUESTIONS_NOT_FOUND",
        path: `packs/week-${getCurrentWeek()}-grade-${grade}-subject-${normalizeSubjectKey(subject)}.json`,
      }, 404)
    }

    let questions = pack.questions

    if (effectiveTier === "free") {
      questions = questions.filter((question: { id?: string }) => question.id?.endsWith("-v1"))
    }

    const startIndex = (page - 1) * limit
    questions = questions.slice(startIndex, startIndex + limit)

    const nextUsage = (monthRequests || 0) + 1
    await Promise.all([
      logRequest(supabase, apiKey.id, `/api/questions`, 200, req, Date.now() - startedAt),
      supabase
        .from("api_keys")
        .update({
          current_usage: nextUsage,
          quota_used: nextUsage,
          last_used_at: new Date().toISOString(),
        })
        .eq("id", apiKey.id),
    ])

    return json({
      success: true,
      questions,
      data: questions,
      meta: {
        total: questions.length,
        tier: effectiveTier,
        country,
        exam,
        grade: parseInt(grade, 10),
        subject: normalizeSubjectKey(subject),
        page,
        rate_limit: rateLimit,
        quota_remaining: Math.max(0, monthlyLimit - nextUsage),
        max_limit_per_request: maxLimit,
        powered_by: "WorldExams API",
      },
    }, 200, {
      "Cache-Control": "private, no-cache",
      "X-RateLimit-Limit": String(rateLimit),
      "X-RateLimit-Remaining": String(Math.max(0, rateLimit - (recentRequests || 0) - 1)),
    })
  } catch (error: any) {
    console.error("API Gateway Error:", error)
    return json({
      error: "Internal Server Error",
      message: error?.message || "Unexpected error",
      code: "SERVER_ERROR",
    }, 500)
  }
})
