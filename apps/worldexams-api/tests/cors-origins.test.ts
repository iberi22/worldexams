import { describe, it, expect } from "vitest"
import worker, { isAllowedOrigin } from "../src/index"
import type { Env } from "../src/index"

// Branch previews of the app call the API cross-origin from *.workers.dev. Without a
// CORS grant the browser drops the response and the ranked leaderboard shows
// "No se pudo cargar el ranking" (e2e student-exam-journey, test 2).
describe("CORS allowed origins", () => {
  it("allows production origins and the app's branch previews", () => {
    expect(isAllowedOrigin("https://saberparatodos.space")).toBe(true)
    expect(isAllowedOrigin("https://saberparatodos-preview-develop.iberi22.workers.dev")).toBe(true)
    expect(isAllowedOrigin("https://saberparatodos-preview-claude-seo-question-page-d3c846.iberi22.workers.dev")).toBe(true)
  })

  it("rejects other workers.dev scripts and look-alike hosts", () => {
    expect(isAllowedOrigin(null)).toBe(false)
    expect(isAllowedOrigin("https://evil.iberi22.workers.dev")).toBe(false)
    expect(isAllowedOrigin("https://saberparatodos-preview-x.attacker.workers.dev")).toBe(false)
    expect(isAllowedOrigin("https://saberparatodos-preview-x.iberi22.workers.dev.attacker.com")).toBe(false)
    expect(isAllowedOrigin("http://saberparatodos-preview-x.iberi22.workers.dev")).toBe(false)
  })

  it("grants the preview origin on /v1/leaderboard", async () => {
    const db = {
      prepare: () => ({
        bind() {
          return this
        },
        first: async () => null,
        all: async () => ({ results: [] }),
      }),
    }
    const env = { RANKED_DB: db } as unknown as Env
    const origin = "https://saberparatodos-preview-develop.iberi22.workers.dev"
    const res = await worker.fetch(
      new Request("https://api.saberparatodos.space/v1/leaderboard?limit=50&season=2026-10", { headers: { Origin: origin } }),
      env
    )
    expect(res.status).toBe(200)
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(origin)
    expect(await res.json()).toEqual({ season: "2026-10", average: 0, entries: [] })
  })
})
