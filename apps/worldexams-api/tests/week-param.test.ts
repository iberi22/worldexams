import { describe, it, expect, vi } from "vitest"
import worker from "../src/index"
import type { Env } from "../src/index"

/**
 * Regression test for issue #1584.
 *
 * Before the fix, /v1/questions never read ?week=. Every caller was served
 * getCurrentWeek(), so asking for week 5, 12 or 20 all returned the same pack.
 * The param was documented and ignored, which made it worse than a missing
 * feature: a client asking for a specific week silently got different content.
 */
describe("GET /v1/questions with week parameter", () => {
  const mockEnv = (assetsMap: Record<string, Response>): Env => ({
    SUPABASE_URL: "https://mock.supabase.co",
    SUPABASE_ANON_KEY: "mock-key",
    ASSETS: {
      fetch: vi.fn(async (request: Request | string) => {
        const urlStr = typeof request === "string" ? request : request.url
        const url = new URL(urlStr)
        const response = assetsMap[url.pathname]
        if (response) {
          return response.clone()
        }
        return new Response("Not Found", { status: 404 })
      }),
    } as unknown as Fetcher,
  })

  const pack = (week: number) => ({
    subject: "matematicas",
    questions: [
      {
        id: `W${week}-1`,
        statement: `Pregunta de la semana ${week}`,
        options: [
          { letter: "A", text: "Op 1", is_correct: true },
          { letter: "B", text: "Op 2", is_correct: false },
        ],
      },
    ],
  })

  const assets = () => ({
    "/v1/packs/co-week-5-grade-11-subject-matematicas.json": new Response(JSON.stringify(pack(5)), { status: 200 }),
    "/v1/packs/co-week-20-grade-11-subject-matematicas.json": new Response(JSON.stringify(pack(20)), { status: 200 }),
  })

  it("serves the requested week instead of the current one", async () => {
    const env = mockEnv(assets())
    const req = new Request("http://localhost/v1/questions?country=co&grade=11&subject=matematicas&week=5", {
      method: "GET",
    })

    const res = await worker.fetch(req, env, {} as any)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.questions).toHaveLength(1)
    expect(body.questions[0].id).toBe("W5-1")
    expect(body.meta.requested_week).toBe(5)
  })

  it("returns a different pack for each week asked for", async () => {
    const first = await worker.fetch(
      new Request("http://localhost/v1/questions?country=co&grade=11&subject=matematicas&week=5", { method: "GET" }),
      mockEnv(assets()),
      {} as any,
    )
    const second = await worker.fetch(
      new Request("http://localhost/v1/questions?country=co&grade=11&subject=matematicas&week=20", { method: "GET" }),
      mockEnv(assets()),
      {} as any,
    )

    const a = await first.json()
    const b = await second.json()

    // The bug: both requests used to resolve to the same pack.
    expect(a.questions[0].id).not.toBe(b.questions[0].id)
    expect(a.questions[0].id).toBe("W5-1")
    expect(b.questions[0].id).toBe("W20-1")
  })

  it("falls back to the default behaviour when week is absent or out of range", async () => {
    // Only the requested-week packs exist here, so with no valid ?week= the
    // worker looks at getCurrentWeek() and week 1, finds neither, and answers
    // from the empty-result path. What matters for #1584 is that an invalid
    // week never pins the query, which meta.requested_week records.
    const env = mockEnv(assets())

    for (const query of ["", "&week=0", "&week=53", "&week=abc", "&week=-4"]) {
      const body = await (
        await worker.fetch(
          new Request(`http://localhost/v1/questions?country=co&grade=11&subject=matematicas${query}`, {
            method: "GET",
          }),
          env,
          {} as any,
        )
      ).json()
      expect(body.meta?.requested_week ?? null, `?${query} must not pin a week`).toBeNull()
    }
  })

  it("serves a valid week even when the current week has no pack", async () => {
    // The regression itself: before the fix this request resolved to
    // getCurrentWeek() and missed, so an explicit week=5 was served nothing.
    const env = mockEnv(assets())
    const body = await (
      await worker.fetch(
        new Request("http://localhost/v1/questions?country=co&grade=11&subject=matematicas&week=20", {
          method: "GET",
        }),
        env,
        {} as any,
      )
    ).json()

    expect(body.questions).toHaveLength(1)
    expect(body.questions[0].id).toBe("W20-1")
  })
})
