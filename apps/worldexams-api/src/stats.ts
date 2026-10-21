// ---------------------------------------------------------------------------
// GET /v1/stats/traffic?days=7|30|90 — public, aggregate-only traffic stats.
// Source: Cloudflare Web Analytics (RUM: real browsers, sampled, cookieless) via
// the account GraphQL API. Zone httpRequests are NOT used for the headline: they
// include bots (~4k/month vs ~80 real page loads).
// The account also carries unrelated *.swal.network hosts, so every query is
// filtered by requestHost. Responses are cached 1 h with the Workers Cache API
// (never KV: account-wide 1,000 writes/day).
// ---------------------------------------------------------------------------

export interface StatsEnv {
  /** Secret: Account Analytics:Read API token. */
  CF_ANALYTICS_TOKEN?: string
  /** Var: Cloudflare account id (accountTag). */
  CF_ACCOUNT_ID?: string
  /** Var: comma-separated hosts of this product. */
  STATS_HOSTS?: string
}

export interface StatsDeps {
  fetch?: typeof fetch
  /** Cache to use; `null` disables caching. Defaults to `caches.default` when available. */
  cache?: Cache | null
  now?: () => number
}

export interface TrafficStats {
  generatedAt: string
  days: number
  hosts: string[]
  /** `countries` counts every country seen, before small ones are folded into OTROS. */
  totals: { pageLoads: number; visits: number; countries: number }
  byCountry: Array<{ country: string; iso2?: string; pageLoads: number; visits: number; pct: number }>
  byDay: Array<{ date: string; pageLoads: number }>
  topPaths: Array<{ path: string; pageLoads: number }>
  byDevice: Array<{ device: string; pageLoads: number; pct: number }>
  topReferrers: Array<{ host: string; pageLoads: number }>
}

export const STATS_ALLOWED_DAYS = [7, 30, 90] as const
export const DEFAULT_STATS_HOSTS = ["saberparatodos.space", "www.saberparatodos.space", "worldexam.swal.network"]
export const CF_GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql"
const CACHE_TTL_SECONDS = 3600
const DAY_MS = 24 * 60 * 60 * 1000
const HOUR_MS = 60 * 60 * 1000
/** RUM adaptive groups cap the queried range; 90 days is split into windows of at most this size. */
const MAX_WINDOW_DAYS = 30
const TOP_PATHS = 15
const TOP_REFERRERS = 10
/** Paths, referrers and countries below this many page loads are not published on their own (k-anonymity floor). */
export const MIN_PUBLISHED_LOADS = 3
/** Bucket for countries under MIN_PUBLISHED_LOADS. */
export const OTHER_COUNTRIES = "OTROS"
/** Routes whose dynamic segment is a secret (e.g. per-student report links). */
const SECRET_ROUTES = ["/informes/bot/"]
/** A segment that looks like a token: 16+ alphanumeric chars, or a UUID. */
const TOKEN_SEGMENT_RE = /^(?:[A-Za-z0-9]{16,}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i
const HOST_RE = /^[a-z0-9.-]+$/i
const ACCOUNT_RE = /^[a-z0-9]+$/i

type Group = { count?: number; sum?: { visits?: number }; dimensions?: Record<string, string | null | undefined> }

export function parseStatsHosts(raw: string | undefined): string[] {
  const hosts = String(raw ?? "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter((h) => h && HOST_RE.test(h))
  return hosts.length > 0 ? Array.from(new Set(hosts)) : [...DEFAULT_STATS_HOSTS]
}

/** Splits [start, end) into consecutive windows of at most MAX_WINDOW_DAYS. */
export function splitWindows(startMs: number, endMs: number): Array<{ start: string; end: string }> {
  const windows: Array<{ start: string; end: string }> = []
  for (let s = startMs; s < endMs; s += MAX_WINDOW_DAYS * DAY_MS) {
    const e = Math.min(endMs, s + MAX_WINDOW_DAYS * DAY_MS)
    windows.push({ start: new Date(s).toISOString(), end: new Date(e).toISOString() })
  }
  return windows
}

/**
 * Builds a single GraphQL document with one aliased block per window. All values
 * are inlined as JSON string literals (validated hosts/account id, generated dates),
 * which avoids depending on the schema's input type names.
 */
export function buildTrafficQuery(accountId: string, hosts: string[], windows: Array<{ start: string; end: string }>): string {
  const blocks = windows.map((w, i) => {
    const filter = `{datetime_geq: ${JSON.stringify(w.start)}, datetime_lt: ${JSON.stringify(w.end)}, requestHost_in: [${hosts.map((h) => JSON.stringify(h)).join(", ")}]}`
    const group = (alias: string, limit: number, dims: string) =>
      `w${i}_${alias}: rumPageloadEventsAdaptiveGroups(limit: ${limit}, filter: ${filter}, orderBy: [count_DESC]) { count sum { visits }${dims ? ` dimensions { ${dims} }` : ""} }`
    return [
      group("totals", 1, ""),
      group("countries", 250, "countryName"),
      group("days", 100, "date"),
      group("paths", 100, "requestPath"),
      group("devices", 20, "deviceType"),
      group("referrers", 50, "refererHost"),
    ].join("\n      ")
  })
  return `query TrafficStats {
  viewer {
    accounts(filter: {accountTag: ${JSON.stringify(accountId)}}) {
      ${blocks.join("\n      ")}
    }
  }
}`
}

/**
 * Only the path: no query string, no fragment, bounded length. Secret dynamic
 * segments collapse to `:token`, so a private link (/informes/bot/<token>) never
 * becomes public.
 */
export function sanitizePath(raw: string | null | undefined): string {
  let path = String(raw ?? "").split(/[?#]/)[0].trim()
  if (!path.startsWith("/")) path = `/${path}`
  for (const route of SECRET_ROUTES) {
    if (path.toLowerCase().startsWith(route) && path.length > route.length) return `${route}:token`
  }
  path = path
    .split("/")
    .map((seg) => (TOKEN_SEGMENT_RE.test(seg) ? ":token" : seg))
    .join("/")
  return path.length > 200 ? path.slice(0, 200) : path
}

function addTo(map: Map<string, { pageLoads: number; visits: number }>, key: string, g: Group) {
  const cur = map.get(key) ?? { pageLoads: 0, visits: 0 }
  cur.pageLoads += Number(g.count ?? 0)
  cur.visits += Number(g.sum?.visits ?? 0)
  map.set(key, cur)
}

function pct(part: number, total: number) {
  return total > 0 ? Math.round((part / total) * 1000) / 10 : 0
}

function sorted(map: Map<string, { pageLoads: number; visits: number }>) {
  return Array.from(map.entries()).sort((a, b) => b[1].pageLoads - a[1].pageLoads || a[0].localeCompare(b[0]))
}

/** Merges the per-window groups returned by GraphQL into the public response shape. */
export function aggregateTraffic(
  account: Record<string, Group[] | undefined>,
  windowCount: number,
  opts: { days: number; startMs: number; generatedAt: string; hosts: string[] },
): TrafficStats {
  const countries = new Map<string, { pageLoads: number; visits: number }>()
  const daysMap = new Map<string, { pageLoads: number; visits: number }>()
  const paths = new Map<string, { pageLoads: number; visits: number }>()
  const devices = new Map<string, { pageLoads: number; visits: number }>()
  const referrers = new Map<string, { pageLoads: number; visits: number }>()
  const totals = { pageLoads: 0, visits: 0 }

  for (let i = 0; i < windowCount; i++) {
    for (const g of account[`w${i}_totals`] ?? []) {
      totals.pageLoads += Number(g.count ?? 0)
      totals.visits += Number(g.sum?.visits ?? 0)
    }
    for (const g of account[`w${i}_countries`] ?? []) addTo(countries, String(g.dimensions?.countryName || "XX").toUpperCase(), g)
    for (const g of account[`w${i}_days`] ?? []) if (g.dimensions?.date) addTo(daysMap, String(g.dimensions.date).slice(0, 10), g)
    for (const g of account[`w${i}_paths`] ?? []) addTo(paths, sanitizePath(g.dimensions?.requestPath), g)
    for (const g of account[`w${i}_devices`] ?? []) addTo(devices, String(g.dimensions?.deviceType || "unknown").toLowerCase(), g)
    for (const g of account[`w${i}_referrers`] ?? []) {
      const host = String(g.dimensions?.refererHost || "").trim().toLowerCase()
      // Direct traffic and same-site navigation are not referrers.
      if (!host || opts.hosts.includes(host)) continue
      addTo(referrers, host, g)
    }
  }

  // Every day of the period appears, zero-filled, so the trend has no gaps.
  const byDay: TrafficStats["byDay"] = []
  for (let d = 0; d < opts.days; d++) {
    const date = new Date(opts.startMs + d * DAY_MS).toISOString().slice(0, 10)
    byDay.push({ date, pageLoads: daysMap.get(date)?.pageLoads ?? 0 })
  }
  // The window ends at the current hour, so the last partial day may fall outside the loop.
  const lastDate = byDay.length ? byDay[byDay.length - 1].date : ""
  for (const [date, v] of Array.from(daysMap.entries()).sort()) {
    if (date > lastDate) byDay.push({ date, pageLoads: v.pageLoads })
  }

  // Small countries are folded into one OTROS row so a single visit cannot single out a country.
  const byCountry: TrafficStats["byCountry"] = []
  const other = { pageLoads: 0, visits: 0 }
  for (const [code, v] of sorted(countries)) {
    if (v.pageLoads < MIN_PUBLISHED_LOADS) {
      other.pageLoads += v.pageLoads
      other.visits += v.visits
      continue
    }
    byCountry.push({
      country: code,
      ...(/^[A-Z]{2}$/.test(code) && code !== "XX" ? { iso2: code } : {}),
      pageLoads: v.pageLoads,
      visits: v.visits,
      pct: pct(v.pageLoads, totals.pageLoads),
    })
  }
  if (other.pageLoads > 0) {
    byCountry.push({ country: OTHER_COUNTRIES, ...other, pct: pct(other.pageLoads, totals.pageLoads) })
  }

  return {
    generatedAt: opts.generatedAt,
    days: opts.days,
    hosts: opts.hosts,
    totals: { ...totals, countries: Array.from(countries.keys()).filter((c) => /^[A-Z]{2}$/.test(c) && c !== "XX").length },
    byCountry,
    byDay,
    topPaths: sorted(paths).filter(([, v]) => v.pageLoads >= MIN_PUBLISHED_LOADS).slice(0, TOP_PATHS).map(([path, v]) => ({ path, pageLoads: v.pageLoads })),
    byDevice: sorted(devices).map(([device, v]) => ({ device, pageLoads: v.pageLoads, pct: pct(v.pageLoads, totals.pageLoads) })),
    topReferrers: sorted(referrers).filter(([, v]) => v.pageLoads >= MIN_PUBLISHED_LOADS).slice(0, TOP_REFERRERS).map(([host, v]) => ({ host, pageLoads: v.pageLoads })),
  }
}

function jsonResponse(body: unknown, status: number, cacheControl: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": cacheControl },
  })
}

function defaultCache(): Cache | null {
  const c = (globalThis as { caches?: { default?: Cache } }).caches
  return c?.default ?? null
}

export async function handleTrafficStats(request: Request, env: StatsEnv, deps: StatsDeps = {}): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return jsonResponse({ error: "METHOD_NOT_ALLOWED" }, 405, "no-store")
  }

  const url = new URL(request.url)
  const daysRaw = url.searchParams.get("days")
  const days = daysRaw === null ? 30 : Number(daysRaw)
  if (!(STATS_ALLOWED_DAYS as readonly number[]).includes(days)) {
    return jsonResponse({ error: "INVALID_DAYS", allowed: STATS_ALLOWED_DAYS }, 400, "no-store")
  }

  const token = env.CF_ANALYTICS_TOKEN?.trim()
  const accountId = env.CF_ACCOUNT_ID?.trim()
  if (!token || !accountId || !ACCOUNT_RE.test(accountId)) {
    return jsonResponse({ error: "STATS_NOT_CONFIGURED" }, 503, "no-store")
  }
  const hosts = parseStatsHosts(env.STATS_HOSTS)

  const cache = deps.cache === undefined ? defaultCache() : deps.cache
  const cacheKey = new Request(`${url.origin}/v1/stats/traffic?days=${days}&hosts=${encodeURIComponent(hosts.join(","))}`, { method: "GET" })
  if (cache) {
    try {
      const hit = await cache.match(cacheKey)
      if (hit) {
        const headers = new Headers(hit.headers)
        headers.set("X-Stats-Cache", "HIT")
        return new Response(hit.body, { status: hit.status, headers })
      }
    } catch {
      // Cache failures must never break the endpoint.
    }
  }

  const nowMs = (deps.now ?? Date.now)()
  // Hour-aligned end keeps the window stable within one cache period.
  const endMs = Math.floor(nowMs / HOUR_MS) * HOUR_MS
  const startMs = endMs - days * DAY_MS
  const windows = splitWindows(startMs, endMs)
  const query = buildTrafficQuery(accountId, hosts, windows)

  const doFetch = deps.fetch ?? fetch
  let account: Record<string, Group[] | undefined>
  try {
    const upstream = await doFetch(CF_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
    if (!upstream.ok) {
      console.error(`stats: upstream HTTP ${upstream.status}`)
      return jsonResponse({ error: "STATS_UPSTREAM_ERROR" }, 502, "no-store")
    }
    const payload = (await upstream.json()) as {
      data?: { viewer?: { accounts?: Array<Record<string, Group[] | undefined>> } }
      errors?: unknown[] | null
    }
    if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
      console.error(`stats: upstream GraphQL errors (${payload.errors.length})`)
      return jsonResponse({ error: "STATS_UPSTREAM_ERROR" }, 502, "no-store")
    }
    const acc = payload?.data?.viewer?.accounts?.[0]
    if (!acc) {
      console.error("stats: upstream returned no account")
      return jsonResponse({ error: "STATS_UPSTREAM_ERROR" }, 502, "no-store")
    }
    account = acc
  } catch {
    console.error("stats: upstream request failed")
    return jsonResponse({ error: "STATS_UPSTREAM_ERROR" }, 502, "no-store")
  }

  const stats = aggregateTraffic(account, windows.length, {
    days,
    startMs,
    generatedAt: new Date(nowMs).toISOString(),
    hosts,
  })
  const response = jsonResponse(stats, 200, `public, max-age=${CACHE_TTL_SECONDS}`)
  if (cache) {
    try {
      await cache.put(cacheKey, response.clone())
    } catch {
      // Ignore: serving fresh data is still correct.
    }
  }
  const headers = new Headers(response.headers)
  headers.set("X-Stats-Cache", "MISS")
  return new Response(response.body, { status: 200, headers })
}
