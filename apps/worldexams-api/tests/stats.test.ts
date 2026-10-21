import { describe, it, expect, vi, afterEach } from "vitest";
import worker from "../src/index";
import type { Env } from "../src/index";
import {
  handleTrafficStats,
  aggregateTraffic,
  parseStatsHosts,
  sanitizePath,
  splitWindows,
  CF_GRAPHQL_ENDPOINT,
  DEFAULT_STATS_HOSTS,
} from "../src/stats";

const NOW = Date.parse("2026-10-20T15:42:00Z");
const TOKEN = "secret-token-abc123";

class MemoryCache {
  store = new Map<string, Response>();
  async match(req: Request) {
    const hit = this.store.get(req.url);
    return hit ? hit.clone() : undefined;
  }
  async put(req: Request, res: Response) {
    this.store.set(req.url, res.clone());
  }
}

function graphqlOk(account: Record<string, unknown>) {
  return new Response(JSON.stringify({ data: { viewer: { accounts: [account] } }, errors: null }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function sampleAccount() {
  return {
    w0_totals: [{ count: 80, sum: { visits: 50 } }],
    w0_countries: [
      { count: 60, sum: { visits: 35 }, dimensions: { countryName: "CO" } },
      { count: 15, sum: { visits: 10 }, dimensions: { countryName: "MX" } },
      { count: 5, sum: { visits: 5 }, dimensions: { countryName: "XX" } },
    ],
    w0_days: [
      { count: 30, sum: { visits: 20 }, dimensions: { date: "2026-10-14" } },
      { count: 50, sum: { visits: 30 }, dimensions: { date: "2026-10-19" } },
    ],
    w0_paths: [
      { count: 40, sum: { visits: 30 }, dimensions: { requestPath: "/" } },
      { count: 25, sum: { visits: 10 }, dimensions: { requestPath: "/practica?grado=11&token=x" } },
      { count: 15, sum: { visits: 10 }, dimensions: { requestPath: "/practica" } },
    ],
    w0_devices: [
      { count: 55, sum: { visits: 35 }, dimensions: { deviceType: "mobile" } },
      { count: 25, sum: { visits: 15 }, dimensions: { deviceType: "desktop" } },
    ],
    w0_referrers: [
      { count: 40, sum: { visits: 25 }, dimensions: { refererHost: "" } },
      { count: 20, sum: { visits: 15 }, dimensions: { refererHost: "www.google.com" } },
      { count: 12, sum: { visits: 6 }, dimensions: { refererHost: "saberparatodos.space" } },
      { count: 8, sum: { visits: 4 }, dimensions: { refererHost: "t.co" } },
    ],
  };
}

const env = { CF_ANALYTICS_TOKEN: TOKEN, CF_ACCOUNT_ID: "abcdef0123456789", STATS_HOSTS: "" };
const req = (q = "?days=7") => new Request(`https://api.saberparatodos.space/v1/stats/traffic${q}`);

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("stats helpers", () => {
  it("parses hosts, defaulting to the product hosts and dropping junk", () => {
    expect(parseStatsHosts(undefined)).toEqual(DEFAULT_STATS_HOSTS);
    expect(parseStatsHosts(" A.com , b.com,,bad host\"}, a.com")).toEqual(["a.com", "b.com"]);
  });

  it("strips query strings and fragments from paths", () => {
    expect(sanitizePath("/practica?grado=11")).toBe("/practica");
    expect(sanitizePath("/a#b")).toBe("/a");
    expect(sanitizePath("")).toBe("/");
  });

  it("collapses secret and token-like segments", () => {
    expect(sanitizePath("/informes/bot/abc123")).toBe("/informes/bot/:token");
    expect(sanitizePath("/Informes/Bot/x/y?z=1")).toBe("/informes/bot/:token");
    expect(sanitizePath("/informes/bot/")).toBe("/informes/bot/");
    expect(sanitizePath("/r/a1B2c3D4e5F6g7H8/x")).toBe("/r/:token/x");
    expect(sanitizePath("/c/123e4567-e89b-12d3-a456-426614174000")).toBe("/c/:token");
    // Ordinary slugs stay readable.
    expect(sanitizePath("/pruebas-saber-gratis")).toBe("/pruebas-saber-gratis");
    expect(sanitizePath("/preguntas/colombia/matematicas")).toBe("/preguntas/colombia/matematicas");
  });

  it("splits 90 days into 30-day windows", () => {
    const end = Date.parse("2026-10-20T15:00:00Z");
    const w = splitWindows(end - 90 * 86400000, end);
    expect(w).toHaveLength(3);
    expect(w[2].end).toBe("2026-10-20T15:00:00.000Z");
    expect(splitWindows(end - 7 * 86400000, end)).toHaveLength(1);
  });

  it("sums groups across windows", () => {
    const account = {
      w0_totals: [{ count: 10, sum: { visits: 4 } }],
      w1_totals: [{ count: 5, sum: { visits: 1 } }],
      w0_countries: [{ count: 10, sum: { visits: 4 }, dimensions: { countryName: "CO" } }],
      w1_countries: [{ count: 5, sum: { visits: 1 }, dimensions: { countryName: "co" } }],
    };
    const out = aggregateTraffic(account, 2, {
      days: 7,
      startMs: Date.parse("2026-10-13T00:00:00Z"),
      generatedAt: "x",
      hosts: DEFAULT_STATS_HOSTS,
    });
    expect(out.totals).toEqual({ pageLoads: 15, visits: 5, countries: 1 });
    expect(out.byCountry).toEqual([{ country: "CO", iso2: "CO", pageLoads: 15, visits: 5, pct: 100 }]);
    expect(out.byDay).toHaveLength(7);
  });
});

describe("GET /v1/stats/traffic", () => {
  it("aggregates RUM groups into the public shape", async () => {
    const fetchMock = vi.fn(async () => graphqlOk(sampleAccount()));
    const res = await handleTrafficStats(req(), env, { fetch: fetchMock as any, cache: null, now: () => NOW });
    expect(res.status).toBe(200);
    const body: any = await res.json();

    expect(body.days).toBe(7);
    expect(body.generatedAt).toBe("2026-10-20T15:42:00.000Z");
    expect(body.totals).toEqual({ pageLoads: 80, visits: 50, countries: 2 });
    expect(body.byCountry[0]).toEqual({ country: "CO", iso2: "CO", pageLoads: 60, visits: 35, pct: 75 });
    expect(body.byCountry[1]).toMatchObject({ country: "MX", iso2: "MX", pct: 18.8 });
    expect(body.byCountry[2].iso2).toBeUndefined();

    // Query strings never leak; same path is merged.
    expect(body.topPaths).toEqual([
      { path: "/", pageLoads: 40 },
      { path: "/practica", pageLoads: 40 },
    ]);
    expect(JSON.stringify(body)).not.toContain("token=x");

    expect(body.byDevice).toEqual([
      { device: "mobile", pageLoads: 55, pct: 68.8 },
      { device: "desktop", pageLoads: 25, pct: 31.3 },
    ]);
    // Direct and self-referrals are dropped.
    expect(body.topReferrers).toEqual([
      { host: "www.google.com", pageLoads: 20 },
      { host: "t.co", pageLoads: 8 },
    ]);

    // Zero-filled trend covering the period (window ends at 15:00 UTC, mid-day).
    expect(body.byDay[0]).toEqual({ date: "2026-10-13", pageLoads: 0 });
    expect(body.byDay.find((d: any) => d.date === "2026-10-14").pageLoads).toBe(30);
    expect(body.byDay.find((d: any) => d.date === "2026-10-19").pageLoads).toBe(50);
    expect(body.byDay).toHaveLength(7);
  });

  it("sends the host filter, account and token to the GraphQL API", async () => {
    const fetchMock = vi.fn(async (_url: any, _init?: any) => graphqlOk(sampleAccount()));
    await handleTrafficStats(req("?days=90"), { ...env, STATS_HOSTS: "saberparatodos.space,worldexam.swal.network" }, {
      fetch: fetchMock as any,
      cache: null,
      now: () => NOW,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(CF_GRAPHQL_ENDPOINT);
    expect(init.method).toBe("POST");
    expect(init.headers.Authorization).toBe(`Bearer ${TOKEN}`);
    const { query } = JSON.parse(init.body);
    expect(query).toContain('accountTag: "abcdef0123456789"');
    expect(query).toContain('requestHost_in: ["saberparatodos.space", "worldexam.swal.network"]');
    expect(query).toContain("rumPageloadEventsAdaptiveGroups");
    // 90 days => 3 windows, every block filtered by host.
    expect(query.match(/requestHost_in/g)).toHaveLength(18);
    expect(query).toContain("w2_referrers");
  });

  it("never publishes a per-student report token and drops paths/referrers under 3 loads", async () => {
    const secret = "abcdef0123456789secretToken";
    const account = {
      ...sampleAccount(),
      w0_paths: [
        ...sampleAccount().w0_paths,
        { count: 9, sum: { visits: 9 }, dimensions: { requestPath: `/informes/bot/${secret}` } },
        { count: 1, sum: { visits: 1 }, dimensions: { requestPath: "/informes/bot/abc" } },
        { count: 2, sum: { visits: 2 }, dimensions: { requestPath: "/rara" } },
      ],
      w0_referrers: [
        ...sampleAccount().w0_referrers,
        { count: 2, sum: { visits: 2 }, dimensions: { refererHost: "private-intranet.example" } },
      ],
    };
    const res = await handleTrafficStats(req(), env, { fetch: vi.fn(async () => graphqlOk(account)) as any, cache: null, now: () => NOW });
    const body: any = await res.json();
    const text = JSON.stringify(body);
    expect(text).not.toContain(secret);
    expect(text).not.toContain("/informes/bot/abc");
    expect(text).not.toContain("/rara");
    expect(text).not.toContain("private-intranet.example");
    expect(body.topPaths).toContainEqual({ path: "/informes/bot/:token", pageLoads: 10 });
    expect(body.topPaths.every((p: any) => p.pageLoads >= 3)).toBe(true);
    expect(body.topReferrers.every((r: any) => r.pageLoads >= 3)).toBe(true);
  });

  it("folds countries under 3 loads into OTROS and counts them before suppression", async () => {
    const account = {
      ...sampleAccount(),
      w0_countries: [
        { count: 70, sum: { visits: 40 }, dimensions: { countryName: "CO" } },
        { count: 4, sum: { visits: 3 }, dimensions: { countryName: "MX" } },
        { count: 2, sum: { visits: 2 }, dimensions: { countryName: "UY" } },
        { count: 1, sum: { visits: 1 }, dimensions: { countryName: "IS" } },
        { count: 2, sum: { visits: 2 }, dimensions: { countryName: "XX" } },
        { count: 1, sum: { visits: 1 }, dimensions: { countryName: "PE" } },
      ],
    };
    const res = await handleTrafficStats(req(), env, { fetch: vi.fn(async () => graphqlOk(account)) as any, cache: null, now: () => NOW });
    const body: any = await res.json();
    expect(body.byCountry.map((c: any) => c.country)).toEqual(["CO", "MX", "OTROS"]);
    expect(body.byCountry[2]).toEqual({ country: "OTROS", pageLoads: 6, visits: 6, pct: 7.5 });
    expect(body.byCountry[2].iso2).toBeUndefined();
    const text = JSON.stringify(body.byCountry);
    for (const code of ["UY", "IS", "PE", "XX"]) expect(text).not.toContain(code);
    // CO, MX, UY, IS, PE: counted before folding; XX (unknown) is not a country.
    expect(body.totals.countries).toBe(5);
  });

  it("returns 503 STATS_NOT_CONFIGURED without token or account id", async () => {
    const fetchMock = vi.fn();
    for (const e of [{}, { CF_ANALYTICS_TOKEN: TOKEN }, { CF_ACCOUNT_ID: "abc" }, { CF_ANALYTICS_TOKEN: TOKEN, CF_ACCOUNT_ID: "" }]) {
      const res = await handleTrafficStats(req(), e, { fetch: fetchMock as any, cache: null });
      expect(res.status).toBe(503);
      expect(await res.json()).toEqual({ error: "STATS_NOT_CONFIGURED" });
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects days outside 7/30/90 and defaults to 30", async () => {
    const bad = await handleTrafficStats(req("?days=365"), env, { cache: null });
    expect(bad.status).toBe(400);
    const fetchMock = vi.fn(async () => graphqlOk({}));
    const ok = await handleTrafficStats(req(""), env, { fetch: fetchMock as any, cache: null, now: () => NOW });
    expect(((await ok.json()) as any).days).toBe(30);
  });

  it("returns 502 on upstream HTTP error, GraphQL errors or network failure, without leaking the token", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const cases = [
      async () => new Response(`unauthorized ${TOKEN}`, { status: 401 }),
      async () => new Response(JSON.stringify({ data: null, errors: [{ message: `bad token ${TOKEN}` }] }), { status: 200 }),
      async () => {
        throw new Error(`boom ${TOKEN}`);
      },
      async () => new Response(JSON.stringify({ data: { viewer: { accounts: [] } } }), { status: 200 }),
    ];
    for (const impl of cases) {
      const res = await handleTrafficStats(req(), env, { fetch: vi.fn(impl) as any, cache: null, now: () => NOW });
      expect(res.status).toBe(502);
      const text = await res.text();
      expect(text).not.toContain(TOKEN);
      expect(JSON.parse(text)).toEqual({ error: "STATS_UPSTREAM_ERROR" });
    }
    for (const call of (console.error as any).mock.calls) expect(String(call)).not.toContain(TOKEN);
  });

  it("serves the second request from the cache, keyed by days", async () => {
    const cache = new MemoryCache();
    const fetchMock = vi.fn(async () => graphqlOk(sampleAccount()));
    const deps = { fetch: fetchMock as any, cache: cache as any, now: () => NOW };

    const first = await handleTrafficStats(req("?days=7"), env, deps);
    expect(first.headers.get("X-Stats-Cache")).toBe("MISS");
    expect(first.headers.get("Cache-Control")).toBe("public, max-age=3600");

    const second = await handleTrafficStats(req("?days=7"), env, deps);
    expect(second.headers.get("X-Stats-Cache")).toBe("HIT");
    expect(((await second.json()) as any).totals.pageLoads).toBe(80);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await handleTrafficStats(req("?days=30"), env, deps);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(Array.from(cache.store.keys()).some((k) => k.includes("days=30"))).toBe(true);
  });

  it("does not cache errors", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const cache = new MemoryCache();
    await handleTrafficStats(req(), env, { fetch: vi.fn(async () => new Response("x", { status: 500 })) as any, cache: cache as any });
    expect(cache.store.size).toBe(0);
  });

  it("is wired into the worker router with CORS, using caches.default", async () => {
    const cache = new MemoryCache();
    vi.stubGlobal("caches", { default: cache });
    vi.stubGlobal("fetch", vi.fn(async () => graphqlOk(sampleAccount())));
    const request = new Request("https://api.saberparatodos.space/v1/stats/traffic?days=7", {
      headers: { Origin: "https://saberparatodos.space" },
    });
    const res = await worker.fetch(request, env as unknown as Env);
    expect(res.status).toBe(200);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("https://saberparatodos.space");
    expect(cache.store.size).toBe(1);

    const unconfigured = await worker.fetch(new Request("https://api.saberparatodos.space/v1/stats/traffic"), {} as Env);
    expect(unconfigured.status).toBe(503);
  });
});
