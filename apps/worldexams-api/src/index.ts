export interface Env {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  ASSETS: Fetcher
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, x-api-key",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
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

const ANCHOR_DATE_MS = Date.parse("2025-01-01T00:00:00Z")
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

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

function normalizePackQuestion(question: any) {
  if (Array.isArray(question?.options) && question.options.length >= 2) {
    return question
  }

  const rawStatement = String(question?.statement || "")
  const optionRegex = /(?:^|\n)\s*([A-Da-d])\)\s*([\s\S]*?)(?=(?:\n\s*[A-Da-d]\))|(?:\n\s*---)|$)/g
  const options: Array<{ letter: string; text: string; is_correct: boolean }> = []
  let match: RegExpExecArray | null
  let markedCorrectOption = ""

  while ((match = optionRegex.exec(rawStatement)) !== null) {
    const letter = match[1].toUpperCase()
    const rawText = match[2].trim()
    const hasMarker = /\[x\]\s*$/i.test(rawText)
    if (hasMarker) markedCorrectOption = letter
    const isCorrect = hasMarker || (!markedCorrectOption && String(question?.correct_answer || "").toUpperCase() === letter)
    const text = rawText.replace(/\s*\[x\]\s*$/i, "").replace(/\n+/g, " ").trim()
    options.push({ letter, text, is_correct: isCorrect })
  }

  const cleanedStatement = rawStatement
    .replace(optionRegex, "")
    .replace(/\n\s*---[\s\S]*$/, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  const correctOption = markedCorrectOption || options.find((option) => option.is_correct)?.letter || String(question?.correct_answer || "A").toUpperCase()

  return {
    ...question,
    statement: cleanedStatement || rawStatement,
    options,
    correct_answer: correctOption,
  }
}

async function fetchPublicQuestions(request: Request, env: Env) {
  const url = new URL(request.url)
  const grade = url.searchParams.get("grade") || "11"
  const country = (url.searchParams.get("country") || "co").toLowerCase()
  const exam = (url.searchParams.get("exam") || "icfes").toLowerCase()
  const subject = normalizeSubjectKey(url.searchParams.get("subject") || "matematicas")
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10) || 1)
  const pageSize = 10
  const candidates = [
    `/v1/packs/week-${getCurrentWeek()}-grade-${grade}-subject-${subject}.json`,
    `/v1/packs/week-1-grade-${grade}-subject-${subject}.json`,
  ]

  for (const path of candidates) {
    const assetResponse = await env.ASSETS.fetch(new Request(new URL(path, url.origin).toString(), {
      method: "GET",
      headers: request.headers,
    }))
    if (!assetResponse.ok) continue

    const pack = await assetResponse.json<any>()
    const allQuestions = Array.isArray(pack?.questions) ? pack.questions : []
    const startIndex = (page - 1) * pageSize
    const questions = allQuestions.slice(startIndex, startIndex + pageSize).map(normalizePackQuestion)

    return json({
      success: true,
      questions,
      total_questions: questions.length,
      is_guest: true,
      country,
      exam_type: exam,
      grade: parseInt(grade, 10),
      subject,
      page,
      meta: {
        available_questions: allQuestions.length,
        filtered_out: 0,
        source: "worker-assets",
        pack_path: path,
      },
    }, 200, {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Guest-Mode": "true",
    })
  }

  return json({
    error: "QUESTIONS_NOT_FOUND",
    message: "No questions found for the requested parameters.",
    country,
    exam,
    grade: parseInt(grade, 10),
    subject,
  }, 404)
}

function getProxyHeaders(request: Request, env: Env, includeApiKey = false, useAnonAuth = false) {
  const headers = new Headers()
  const auth = request.headers.get("authorization")
  const apiKey = request.headers.get("x-api-key")
  const userAgent = request.headers.get("user-agent")
  const ipAddress =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()

  if (auth) {
    headers.set("authorization", auth)
  } else if (useAnonAuth && env.SUPABASE_ANON_KEY) {
    // Public Supabase functions still need a valid gateway key/JWT header.
    headers.set("authorization", `Bearer ${env.SUPABASE_ANON_KEY}`)
    headers.set("apikey", env.SUPABASE_ANON_KEY)
  }
  if (includeApiKey && apiKey) headers.set("x-api-key", apiKey)
  if (userAgent) headers.set("user-agent", userAgent)
  if (ipAddress) headers.set("x-forwarded-for", ipAddress)
  return headers
}

async function proxyJson(
  request: Request,
  env: Env,
  upstreamPath: string,
  includeApiKey = false,
  useAnonAuth = false,
) {
  const upstreamUrl = buildUpstreamUrl(env, new URL(request.url), upstreamPath)
  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: "GET",
    headers: getProxyHeaders(request, env, includeApiKey, useAnonAuth),
  })
  return withCors(upstreamResponse)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (url.pathname.startsWith("/v1/packs/")) {
      const assetResponse = await env.ASSETS.fetch(request)
      return withCors(assetResponse)
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
      return fetchPublicQuestions(request, env)
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
