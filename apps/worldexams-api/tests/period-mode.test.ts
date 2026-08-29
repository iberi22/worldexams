import { describe, it, expect, vi } from "vitest"
import worker from "../src/index"
import type { Env } from "../src/index"

describe("GET /v1/questions with period parameter", () => {
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

  it("fetches and merges questions across multiple weeks for period=4", async () => {
    const packW31 = {
      subject: "matematicas",
      questions: [
        { id: "Q31-1", statement: "Pregunta W31", options: [{ letter: "A", text: "Op 1", is_correct: true }, { letter: "B", text: "Op 2", is_correct: false }] },
      ],
    }
    const packW35 = {
      subject: "matematicas",
      questions: [
        { id: "Q35-1", statement: "Pregunta W35 A", options: [{ letter: "A", text: "Op 1", is_correct: true }, { letter: "B", text: "Op 2", is_correct: false }] },
        { id: "Q35-2", statement: "Pregunta W35 B", options: [{ letter: "A", text: "Op 1", is_correct: true }, { letter: "B", text: "Op 2", is_correct: false }] },
      ],
    }

    const env = mockEnv({
      "/v1/packs/co-week-31-grade-11-subject-matematicas.json": new Response(JSON.stringify(packW31), { status: 200 }),
      "/v1/packs/co-week-35-grade-11-subject-matematicas.json": new Response(JSON.stringify(packW35), { status: 200 }),
    })

    const req = new Request("http://localhost/v1/questions?country=co&grade=11&subject=matematicas&period=4", {
      method: "GET",
    })

    const res = await worker.fetch(req, env)
    expect(res.status).toBe(200)

    const data = (await res.json()) as any
    expect(data.success).toBe(true)
    expect(data.questions.length).toBe(3)
    expect(data.meta.available_questions).toBe(3)
    expect(data.meta.pack_path).toContain("co-week-31-grade-11-subject-matematicas.json")
    expect(data.meta.pack_path).toContain("co-week-35-grade-11-subject-matematicas.json")
  })
})
