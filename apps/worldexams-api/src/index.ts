import { routeMesh, createMeshStores, type MeshStores } from "./mesh";
import { routeRanked } from "./ranked";

const meshStores: MeshStores = createMeshStores();

import type { RateLimit } from "@cloudflare/workers-types";
import { mulberry32, shuffle } from "./ranked";

export interface Env {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  ASSETS: Fetcher
  /** KV efímero de rendezvous (opcional en dev: sin binding → solo memoria). */
  MESH_STATE?: KVNamespace
  RANKED_DB?: D1Database
  PACKS_RATE_LIMITER?: RateLimit
  BULK_API_KEY?: string
}

const ALLOWED_ORIGINS = [
  "https://saberparatodos.space",
  "https://www.saberparatodos.space",
  "https://api.saberparatodos.space",
  "https://worldexams.com",
  "https://www.worldexams.com",
  "https://worldexam.swal.network",
  "https://www.worldexam.swal.network",
  "http://localhost:4321",
  "http://127.0.0.1:4321",
]

function corsHeadersFor(request?: Request): Record<string, string> {
  const base = {
    "Access-Control-Allow-Headers": "authorization, content-type, x-api-key",
    "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
    Vary: "Origin",
  }
  const origin = request?.headers.get("Origin")
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return { ...base, "Access-Control-Allow-Origin": origin }
  }
  // Same-origin or non-browser callers: no cross-origin grant.
  return base
}

export function json(body: Record<string, unknown>, status = 200, headers: HeadersInit = {}, request?: Request) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeadersFor(request),
      ...headers,
    },
  })
}

export function withCors(response: Response, request?: Request) {
  const headers = new Headers(response.headers)
  Object.entries(corsHeadersFor(request)).forEach(([key, value]) => headers.set(key, value))
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

const SUBJECT_PACK_ALIASES: Record<string, string[]> = {
  matematicas: ["matematicas", "matematica"],
  lectura_critica: ["lectura_critica", "lengua", "lenguaje", "espanol"],
  sociales_ciudadanas: ["sociales_ciudadanas", "sociales_y_ciudadanas", "sociales"],
  ciencias_naturales: ["ciencias_naturales", "ciencias"],
  ingles: ["ingles", "english", "ing"],
}

function normalizeSubjectKey(subject: string) {
  let normalized = String(subject || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/^_+|_+$/g, "")

  if (normalized === "tecnologiaeinformatica" || normalized === "tecnologiainformatica") {
    return "tecnologia_informatica"
  }

  // Handle some common missing underscores from legacy code
  if (normalized === "socialesyciudadanas") normalized = "sociales_y_ciudadanas"
  if (normalized === "cienciasnaturales") normalized = "ciencias_naturales"
  if (normalized === "lecturacritica") normalized = "lectura_critica"

  for (const [canonical, aliases] of Object.entries(SUBJECT_PACK_ALIASES)) {
    if (aliases.includes(normalized) || canonical === normalized) {
      return canonical
    }
  }

  return normalized
}

export function getCountryPackPrefixes(country: string) {
  const normalized = String(country || "").trim().toLowerCase()
  const aliases: Record<string, string[]> = {
    co: ["co", "colombia"],
    colombia: ["co", "colombia"],
    mx: ["mx", "mexico"],
    mexico: ["mx", "mexico"],
    ar: ["ar", "argentina"],
    argentina: ["ar", "argentina"],
    br: ["br", "brasil", "brazil"],
    brasil: ["br", "brasil", "brazil"],
    brazil: ["br", "brasil", "brazil"],
    cl: ["cl", "chile"],
    chile: ["cl", "chile"],
    pe: ["pe", "peru"],
    peru: ["pe", "peru"],
    ec: ["ec", "ecuador"],
    ecuador: ["ec", "ecuador"],
    pa: ["pa", "panama"],
    panama: ["pa", "panama"],
    cr: ["cr", "costa-rica"],
    "costa-rica": ["cr", "costa-rica"],
    gt: ["gt", "guatemala"],
    guatemala: ["gt", "guatemala"],
    do: ["do", "dominican_republic", "dominican-republic"],
    "dominican-republic": ["do", "dominican_republic", "dominican-republic"],
    dominican_republic: ["do", "dominican_republic", "dominican-republic"],
    sv: ["sv", "el-salvador"],
    "el-salvador": ["sv", "el-salvador"],
    hn: ["hn", "honduras"],
    honduras: ["hn", "honduras"],
    ni: ["ni", "nicaragua"],
    nicaragua: ["ni", "nicaragua"],
    es: ["es", "spain"],
    spain: ["es", "spain"],
    pr: ["pr", "puerto-rico"],
    "puerto-rico": ["pr", "puerto-rico"],
    gq: ["gq", "guinea-ecuatorial"],
    "guinea-ecuatorial": ["gq", "guinea-ecuatorial"],
    uy: ["uy", "uruguay"],
    uruguay: ["uy", "uruguay"],
    py: ["py", "paraguay"],
    paraguay: ["py", "paraguay"],
    bo: ["bo", "bolivia"],
    bolivia: ["bo", "bolivia"],
  }

  return aliases[normalized] || (normalized ? [normalized] : [])
}

export function getSubjectPackAliases(subject: string) {
  const normalized = normalizeSubjectKey(subject)

  if (SUBJECT_PACK_ALIASES[normalized]) {
    // Return canonical first, then unique aliases
    return Array.from(new Set([normalized, ...SUBJECT_PACK_ALIASES[normalized]]))
  }

  return [normalized]
}

// ---------------------------------------------------------------------------
// Pack resolution via manifest.
// Every env.ASSETS.fetch counts as a subrequest; probing alias × prefix × week
// combinations hit the Workers subrequest limit and silently truncated period
// pools in production (2026-09-26). The manifest (public/v1/packs/_manifest.json,
// built by scripts/build-pack-manifest.mjs) lists existing packs, so the worker
// reads it once per isolate and only fetches packs that exist.
// ---------------------------------------------------------------------------
const PACK_CACHE_TTL_MS = 10 * 60 * 1000
const PACK_CACHE_MAX = 300
let packManifestCache: { at: number; files: Set<string> } | null = null
const packCache = new Map<string, { at: number; questions: any[] }>()

export async function getPackManifest(env: Env, origin: string): Promise<Set<string> | null> {
  if (packManifestCache && Date.now() - packManifestCache.at < PACK_CACHE_TTL_MS) return packManifestCache.files
  try {
    const res = await env.ASSETS.fetch(new Request(new URL("/v1/packs/_manifest.json", origin).toString(), { method: "GET" }))
    if (!res.ok) return null
    const data = await res.json<any>()
    if (!Array.isArray(data?.files)) return null
    packManifestCache = { at: Date.now(), files: new Set<string>(data.files) }
    return packManifestCache.files
  } catch {
    return null
  }
}

/** Loads a pack's questions (per-isolate cache). Returns [] when missing. */
export async function loadPackQuestions(env: Env, origin: string, name: string): Promise<any[]> {
  const cached = packCache.get(name)
  if (cached && Date.now() - cached.at < PACK_CACHE_TTL_MS) return cached.questions
  try {
    const res = await env.ASSETS.fetch(new Request(new URL(`/v1/packs/${name}.json`, origin).toString(), { method: "GET" }))
    if (!res.ok) return []
    const pack = await res.json<any>()
    const questions = Array.isArray(pack?.questions) ? pack.questions : []
    if (packCache.size >= PACK_CACHE_MAX) packCache.delete(packCache.keys().next().value as string)
    packCache.set(name, { at: Date.now(), questions })
    return questions
  } catch {
    return []
  }
}

/**
 * First existing pack name for (country, grade, subject, week), by priority:
 * canonical subject alias first, ISO prefix first, then the unprefixed legacy name.
 * Without a manifest, returns every candidate (legacy probing behaviour).
 */
export function resolveWeekPackNames(
  manifest: Set<string> | null,
  countryPrefixes: string[],
  subjectAliases: string[],
  grade: string | number,
  week: number,
): string[] {
  const names: string[] = []
  for (const alias of subjectAliases) {
    for (const prefix of countryPrefixes) names.push(`${prefix}-week-${week}-grade-${grade}-subject-${alias}`)
    names.push(`week-${week}-grade-${grade}-subject-${alias}`)
  }
  if (!manifest) return names
  const hit = names.find((n) => manifest.has(n))
  return hit ? [hit] : []
}

/** Test helper. */
export function __resetPackCaches() {
  packManifestCache = null
  packCache.clear()
}

function getCurrentWeek() {
  const elapsed = Math.max(0, Date.now() - ANCHOR_DATE_MS)
  const week = Math.ceil(elapsed / ONE_WEEK_MS)
  return ((week - 1) % 52) + 1
}

function normalizePackOption(option: any) {
  const rawText = String(option?.text || "")
  const feedbackMatch = rawText.match(/<!--\s*feedback:\s*([\s\S]*?)\s*-->/)
  return {
    ...option,
    text: rawText.replace(/<!--\s*feedback:[\s\S]*?-->/, "").trim(),
    feedback: String(option?.feedback || feedbackMatch?.[1] || "").trim(),
  }
}

export function normalizePackQuestion(question: any) {
  if (Array.isArray(question?.options) && question.options.length >= 2) {
    return {
      ...question,
      options: question.options.map(normalizePackOption),
    }
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
    options.push(normalizePackOption({ letter, text, is_correct: isCorrect }))
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

function normalizeQuestionText(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function questionIdentityKey(question: any) {
  const id = normalizeQuestionText(question?.id ?? question?.question_id)
  if (id) return `id:${id}`

  const bundleId = normalizeQuestionText(question?.bundle_id ?? question?.bundleId)
  const localId = normalizeQuestionText(question?.local_id ?? question?.questionId)
  if (bundleId && localId) return `bundle:${bundleId}:${localId}`

  return ""
}

function questionSemanticKey(question: any) {
  const statement = normalizeQuestionText(
    question?.statement ||
      question?.enunciado ||
      question?.question ||
      question?.text ||
      question?.prompt,
  )
  if (!statement) return ""

  const options = Array.isArray(question?.options)
    ? question.options
        .map((option: any) => normalizeQuestionText(option?.text ?? option?.label ?? option))
        .filter(Boolean)
        .sort()
        .join("|")
    : ""

  return `semantic:${statement.slice(0, 240)}::${options.slice(0, 240)}`
}

function dedupeQuestions<T>(questions: T[]) {
  const seenIdentity = new Set<string>()
  const seenSemantic = new Set<string>()
  const deduped: T[] = []
  let duplicateCount = 0

  for (const question of questions as any[]) {
    const identityKey = questionIdentityKey(question)
    const semanticKey = questionSemanticKey(question)
    const isDuplicate =
      (identityKey && seenIdentity.has(identityKey)) ||
      (semanticKey && seenSemantic.has(semanticKey))

    if (isDuplicate) {
      duplicateCount += 1
      continue
    }

    if (identityKey) seenIdentity.add(identityKey)
    if (semanticKey) seenSemantic.add(semanticKey)
    deduped.push(question as T)
  }

  return { questions: deduped, duplicateCount }
}

async function fetchPublicQuestions(request: Request, env: Env) {
  const url = new URL(request.url)
  const grade = url.searchParams.get("grade") || "11"
  const country = (url.searchParams.get("country") || "co").toLowerCase()
  const exam = (url.searchParams.get("exam") || "icfes").toLowerCase()
  const subject = normalizeSubjectKey(url.searchParams.get("subject") || "matematicas")
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10) || 1)
  const limitParam = parseInt(url.searchParams.get("limit") || "20", 10)
  const pageSize = isNaN(limitParam) ? 20 : Math.max(1, Math.min(20, limitParam))
  const periodRaw = url.searchParams.get("period")
  const period = periodRaw ? parseInt(periodRaw, 10) : undefined

  // Legacy pagination stays the default until the client migrates (WAVE-16.17);
  // sampling is opt-in with mode=sample.
  const defaultMode = "page"
  const mode = url.searchParams.get("mode") || defaultMode

  const seedParam = url.searchParams.get("seed")
  const seed = seedParam ? parseInt(seedParam, 10) : Math.floor(Math.random() * 2147483647)

  const sampleLimitParam = parseInt(url.searchParams.get("limit") || "10", 10)
  const sampleLimit = isNaN(sampleLimitParam) ? 10 : Math.max(1, Math.min(25, sampleLimitParam))

  const subjectAliases = getSubjectPackAliases(subject)
  const countryPrefixes = getCountryPackPrefixes(country)

  let weekCandidates: number[] = [getCurrentWeek(), 1]
  if (period && period >= 1 && period <= 4) {
    const periodWeeks: number[] = []
    const startWeek = (period - 1) * 10 + 1
    const endWeek = Math.min(40, period * 10)
    for (let w = startWeek; w <= endWeek; w++) {
      periodWeeks.push(w)
    }
    weekCandidates = Array.from(new Set([...periodWeeks, getCurrentWeek(), 1]))
  }

  const manifest = await getPackManifest(env, url.origin)
  const fetchedQuestions: any[] = []
  const loadedPaths: string[] = []

  weekLoop: for (const week of weekCandidates) {
    // One pack per week: alias packs are identical copies of the canonical one.
    for (const name of resolveWeekPackNames(manifest, countryPrefixes, subjectAliases, grade, week)) {
      const packQuestions = await loadPackQuestions(env, url.origin, name)
      if (packQuestions.length === 0) continue
      fetchedQuestions.push(...packQuestions)
      loadedPaths.push(`/v1/packs/${name}.json`)
      if (!period) break weekLoop
      break
    }
  }

  if (fetchedQuestions.length > 0) {
    const normalizedQuestions = fetchedQuestions.map(normalizePackQuestion)
    const deduped = dedupeQuestions(normalizedQuestions)

    const total_available = deduped.questions.length

    if (mode === "sample") {
      let pool = deduped.questions.slice()
      pool.sort((a: any, b: any) => (a.id || "").localeCompare(b.id || ""))

      const capSeed = period ? period * 1000 : 999
      shuffle(pool, mulberry32(capSeed))

      pool = pool.slice(0, 100)

      shuffle(pool, mulberry32(seed))

      const questions = pool.slice(0, sampleLimit)

      return json({
        success: true,
        questions,
        total_questions: questions.length,
        is_guest: true,
        country,
        exam_type: exam,
        grade: parseInt(grade, 10),
        subject,
        meta: {
          available_questions: fetchedQuestions.length,
          deduplicated_questions: total_available,
          duplicate_filtered: deduped.duplicateCount,
          filtered_out: deduped.duplicateCount,
          source: "worker-assets",
          pack_path: loadedPaths.join(", "),
          mode: "sample",
          period_pool_size: total_available,
          period_cap: 100,
          seed,
          returned: questions.length,
        },
      }, 200, {
        "Cache-Control": seedParam ? "public, max-age=3600, s-maxage=3600" : "no-store",
        "X-Guest-Mode": "true",
      }, request)
    } else {
      const total_pages = Math.ceil(total_available / pageSize)
      const out_of_range = page > total_pages && total_pages > 0
      const has_more = page < total_pages

      const startIndex = (page - 1) * pageSize
      const questions = out_of_range ? [] : deduped.questions.slice(startIndex, startIndex + pageSize)

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
          available_questions: fetchedQuestions.length,
          deduplicated_questions: total_available,
          duplicate_filtered: deduped.duplicateCount,
          filtered_out: deduped.duplicateCount,
          source: "worker-assets",
          pack_path: loadedPaths.join(", "),
          total_available,
          page_size: pageSize,
          total_pages,
          has_more,
          ...(out_of_range ? { out_of_range: true } : {}),
        },
      }, 200, {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "X-Guest-Mode": "true",
      }, request)
    }
  }

  return json({
    error: "QUESTIONS_NOT_FOUND",
    message: "No questions found for the requested parameters.",
    country,
    exam,
    grade: parseInt(grade, 10),
    subject,
    meta: {
      total_available: 0,
      page_size: pageSize,
      total_pages: 0,
      has_more: false,
      out_of_range: true,
    }
  }, 404, {}, request)
}

function getProxyHeaders(request: Request, env: Env, includeApiKey = false, useAnonAuth = false) {
  const headers = new Headers()
  const auth = request.headers.get("authorization")
  const apiKey = request.headers.get("x-api-key")
  const userAgent = request.headers.get("user-agent")
  const ipAddress = request.headers.get("cf-connecting-ip")

  if (auth) {
    headers.set("authorization", auth)
  } else if (useAnonAuth && env.SUPABASE_ANON_KEY) {
    // Public Supabase functions still need a valid gateway key/JWT header.
    headers.set("authorization", `Bearer ${env.SUPABASE_ANON_KEY}`)
    headers.set("apikey", env.SUPABASE_ANON_KEY)
  }
  if (includeApiKey && apiKey) headers.set("x-api-key", apiKey)
  if (userAgent) headers.set("user-agent", userAgent)
  if (ipAddress) headers.set("cf-connecting-ip", ipAddress)
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
  return withCors(upstreamResponse, request)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeadersFor(request) })
    }

    // Mesh-first: señalización efímera (cero datos de usuario, sin persistencia).
    // Si el backend cae, los nodos siguen vía capas P2P locales.
    if (url.pathname.startsWith("/v1/mesh/")) {
      const meshRes = await routeMesh(request, meshStores, env.MESH_STATE ?? null)
      if (meshRes) {
        return json(meshRes.body, meshRes.status, { "Cache-Control": "no-store" }, request)
      }
    }

    if (url.pathname.startsWith("/v1/packs/")) {
      // Internal indexes are not public (the worker reads _manifest.json via env.ASSETS directly).
      if (url.pathname === "/v1/packs/metadata.json" || url.pathname === "/v1/packs/_manifest.json") {
        return json({ error: "NOT_FOUND" }, 404, {}, request)
      }

      if (env.PACKS_RATE_LIMITER) {
        const ipAddress = request.headers.get("cf-connecting-ip") || "unknown"
        const limitRes = await env.PACKS_RATE_LIMITER.limit({ key: ipAddress })
        if (!limitRes.success) {
          return json({ error: "RATE_LIMITED", message: "Too many requests" }, 429, {}, request)
        }
      }

      const assetResponse = await env.ASSETS.fetch(request)
      if (assetResponse.ok) {
        const headers = new Headers(assetResponse.headers)
        headers.set("Cache-Control", "public, max-age=3600")
        const respWithHeaders = new Response(assetResponse.body, {
          status: assetResponse.status,
          headers
        })
        return withCors(respWithHeaders, request)
      }

      return withCors(assetResponse, request)
    }

    if (url.pathname === "/" || url.pathname === "/v1") {
      return json({
        name: "SaberParaTodos API",
        version: "2026-03-10",
        docs_url: "https://saberparatodos.space/developers/docs",
        endpoints: {
          health: "/health",
          mesh_health: "/v1/mesh/health",
          mesh_announce: "/v1/mesh/announce",
          mesh_discover: "/v1/mesh/discover",
          mesh_relay: "/v1/mesh/relay",
          free_questions: "/v1/questions",
          premium_questions: "/v1/premium/questions",
          grade_bundle: "/v1/grades/:country/:grade/bundle",
        },
      }, 200, {}, request)
    }

    const gradeBundleMatch = url.pathname.match(/^\/v1\/grades\/([^\/]+)\/([^\/]+)\/bundle$/i)
    if (gradeBundleMatch) {
      const apiKey = request.headers.get("x-api-key")
      if (!env.BULK_API_KEY || apiKey !== env.BULK_API_KEY) {
        return json({ error: "BULK_DISABLED" }, 403, {}, request)
      }

      const country = gradeBundleMatch[1].toLowerCase()
      const grade = gradeBundleMatch[2].toLowerCase()
      const assetPath = `/v1/grades/${country}-grado-${grade}-full.json`
      const assetUrl = new URL(assetPath, url.origin)
      const assetResponse = await env.ASSETS.fetch(
        new Request(assetUrl.toString(), {
          method: "GET",
          headers: request.headers,
        })
      )

      if (assetResponse.ok) {
        const headers = new Headers(assetResponse.headers)
        headers.set("Content-Type", "application/json")
        headers.set("Cache-Control", "public, max-age=86400, s-maxage=604800")
        Object.entries(corsHeadersFor(request)).forEach(([key, value]) =>
          headers.set(key, value)
        )
        return new Response(assetResponse.body, {
          status: 200,
          headers,
        })
      }

      return json(
        {
          error: "GRADE_BUNDLE_NOT_FOUND",
          message: `Grade bundle for country '${country}' and grade '${grade}' was not found.`,
          country,
          grade,
        },
        404,
        {},
        request
      )
    }

    const r = await routeRanked(request, env);
    if (r) return withCors(r, request);

    if (url.pathname === "/health") {
      return json({
        ok: true,
        service: "worldexams-api",
        version: "2026-03-10",
      }, 200, {}, request)
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
    }, 404, {}, request)
  },
}
