import { describe, it, expect, vi, beforeEach } from "vitest"
import worker from "../src/index"
import type { Env } from "../src/index"
import { __clearRankedPoolCache } from "../src/ranked"

// Branch previews (deploy-preview.yml) share the production D1. With
// RANKED_READONLY = "1" they must never create sessions or results.
describe("RANKED_READONLY", () => {
  let prepare: ReturnType<typeof vi.fn>

  function env(readonly?: string): Env {
    const stmt = {
      bind() {
        return stmt
      },
      first: async () => null,
      all: async () => ({ results: [] }),
      run: async () => ({ success: true, meta: { changes: 1 } }),
    }
    prepare = vi.fn(() => stmt)
    return {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: { fetch: vi.fn(async () => new Response("Not Found", { status: 404 })) } as unknown as Fetcher,
      RANKED_DB: { prepare } as unknown as D1Database,
      ...(readonly === undefined ? {} : { RANKED_READONLY: readonly }),
    }
  }

  const post = (path: string, body: unknown) =>
    new Request(`http://localhost${path}`, { method: "POST", body: JSON.stringify(body) })

  beforeEach(() => __clearRankedPoolCache())

  it("rejects /v1/ranked/start with 403 without touching the DB", async () => {
    const e = env("1")
    const res = await worker.fetch(post("/v1/ranked/start", { deviceId: "dev123456", nickname: "tester" }), e)
    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: "RANKED_READONLY" })
    expect(prepare).not.toHaveBeenCalled()
  })

  it("rejects /v1/ranked/submit with 403 without touching the DB", async () => {
    const e = env("1")
    const res = await worker.fetch(post("/v1/ranked/submit", { sessionId: "s", answers: [], integrity: {} }), e)
    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: "RANKED_READONLY" })
    expect(prepare).not.toHaveBeenCalled()
  })

  it("still serves the leaderboard", async () => {
    const res = await worker.fetch(new Request("http://localhost/v1/leaderboard?season=2026-10"), env("1"))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ season: "2026-10", average: 0, entries: [] })
  })

  it("does not block start when the variable is unset", async () => {
    const res = await worker.fetch(post("/v1/ranked/start", { deviceId: "dev123456", nickname: "tester" }), env())
    expect(res.status).not.toBe(403)
  })
})
