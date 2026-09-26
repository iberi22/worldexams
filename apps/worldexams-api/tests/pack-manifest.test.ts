import { describe, it, expect, vi, beforeEach } from "vitest"
import worker, { __resetPackCaches, resolveWeekPackNames } from "../src/index"
import type { Env } from "../src/index"
import { __clearRankedPoolCache } from "../src/ranked"

// Builds a fake ASSETS binding with a manifest + packs for CO grade 11, and counts reads.
function makeEnv(files: string[], withDb = false) {
  const calls: string[] = []
  const packFor = (name: string) => ({
    questions: Array.from({ length: 20 }, (_, i) => ({
      id: `${name}-q${i}`,
      statement: `S ${name} ${i}`,
      options: [
        { text: "Right", is_correct: true, feedback: "ok" },
        { text: "W1" }, { text: "W2" }, { text: "W3" },
      ],
      explanation: "E",
    })),
  })
  const env = {
    SUPABASE_URL: "x",
    SUPABASE_ANON_KEY: "x",
    ASSETS: {
      fetch: vi.fn(async (req: Request | string) => {
        const path = new URL(typeof req === "string" ? req : req.url).pathname
        calls.push(path)
        if (path === "/v1/packs/_manifest.json") return new Response(JSON.stringify({ version: 1, files }))
        const name = path.replace("/v1/packs/", "").replace(/\.json$/, "")
        return files.includes(name) ? new Response(JSON.stringify(packFor(name))) : new Response("nf", { status: 404 })
      }),
    } as unknown as Fetcher,
  } as Env
  if (withDb) {
    // Minimal D1 stub: counts return 0, inserts succeed.
    ;(env as any).RANKED_DB = {
      prepare: () => ({ bind() { return this }, first: async () => 0, run: async () => ({}), all: async () => ({ results: [] }) }),
    }
  }
  return { env, calls }
}

const AREAS = ["matematicas", "lectura_critica", "sociales_ciudadanas", "ciencias_naturales", "ingles"]
function coFiles() {
  const files: string[] = []
  for (let w = 1; w <= 40; w++) {
    for (const a of AREAS) files.push(`co-week-${w}-grade-11-subject-${a}`)
    // alias copies that must NOT be double-loaded
    files.push(`co-week-${w}-grade-11-subject-ing`, `co-week-${w}-grade-11-subject-english`, `co-week-${w}-grade-11-subject-sociales_y_ciudadanas`)
  }
  return files
}

describe("pack manifest resolution", () => {
  beforeEach(() => {
    __resetPackCaches()
    __clearRankedPoolCache()
  })

  it("resolveWeekPackNames picks the first existing name by priority", () => {
    const m = new Set(["co-week-3-grade-11-subject-sociales_y_ciudadanas", "co-week-3-grade-11-subject-sociales_ciudadanas"])
    expect(resolveWeekPackNames(m, ["co", "colombia"], ["sociales_ciudadanas", "sociales_y_ciudadanas"], 11, 3))
      .toEqual(["co-week-3-grade-11-subject-sociales_ciudadanas"])
    expect(resolveWeekPackNames(m, ["co"], ["matematicas"], 11, 3)).toEqual([])
  })

  it("period query reads the manifest + at most one pack per week (no probing, no alias duplicates)", async () => {
    const { env, calls } = makeEnv(coFiles())
    const res = await worker.fetch(new Request("https://api.test/v1/questions?country=co&grade=11&subject=ingles&period=4"), env)
    const data = (await res.json()) as any
    expect(res.status).toBe(200)
    expect(calls.length).toBeLessThanOrEqual(12) // manifest + 10 period weeks (+ current/1 already inside/outside)
    expect(calls.every((c) => !c.includes("-subject-ing.") && !c.includes("-subject-english."))).toBe(true)
    // weeks 31-40 (+ week 1 fallback, current week 39 already inside the period) × 20 unique
    expect(data.meta.total_available).toBe(220)
  })

  it("ranked start stays within the subrequest budget and covers all 5 areas", async () => {
    const { env, calls } = makeEnv(coFiles(), true)
    const res = await worker.fetch(new Request("https://api.test/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "device-abc-123", nickname: "tester" }),
    }), env)
    const data = (await res.json()) as any
    expect(res.status).toBe(200)
    expect(calls.length).toBeLessThanOrEqual(1 + 5 * 3)
    for (const a of AREAS) expect(data.meta.area_counts[a]).toBe(8)
    expect(new Set(data.questions.map((q: any) => q.id)).size).toBe(40)
  })
})
