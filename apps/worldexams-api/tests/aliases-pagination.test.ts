import { describe, it, expect, vi } from "vitest"
import worker from "../src/index"
import type { Env } from "../src/index"

describe("GET /v1/questions with aliases and pagination", () => {
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

  it("finds sociales_ciudadanas pack when subject is sociales", async () => {
    const pack = {
      subject: "sociales_ciudadanas",
      questions: [
        { id: "S1", statement: "Pregunta", options: [{ letter: "A", text: "Op 1", is_correct: true }, { letter: "B", text: "Op 2", is_correct: false }] },
      ],
    }
    const env = mockEnv({
      "/v1/packs/co-week-1-grade-11-subject-sociales_ciudadanas.json": new Response(JSON.stringify(pack), { status: 200 }),
    })

    const req = new Request("http://localhost/v1/questions?country=co&grade=11&subject=sociales&period=1", { method: "GET" })
    const res = await worker.fetch(req, env)
    expect(res.status).toBe(200)

    const data = (await res.json()) as any
    expect(data.success).toBe(true)
    expect(data.questions.length).toBe(1)
    expect(data.meta.pack_path).toContain("sociales_ciudadanas.json")
  })

  it("finds ingles pack when subject is english", async () => {
    const pack = {
      subject: "ingles",
      questions: [
        { id: "E1", statement: "Question", options: [{ letter: "A", text: "Op 1", is_correct: true }] },
      ],
    }
    const env = mockEnv({
      "/v1/packs/co-week-1-grade-11-subject-ingles.json": new Response(JSON.stringify(pack), { status: 200 }),
    })

    const req = new Request("http://localhost/v1/questions?country=co&grade=11&subject=english&period=1", { method: "GET" })
    const res = await worker.fetch(req, env)
    expect(res.status).toBe(200)

    const data = (await res.json()) as any
    expect(data.success).toBe(true)
    expect(data.questions.length).toBe(1)
    expect(data.meta.pack_path).toContain("ingles.json")
  })

  it("finds cr pack when country is cr", async () => {
    const pack = {
      subject: "matematicas",
      questions: [
        { id: "M1", statement: "Question", options: [{ letter: "A", text: "Op 1", is_correct: true }] },
      ],
    }
    const env = mockEnv({
      "/v1/packs/cr-week-1-grade-11-subject-matematicas.json": new Response(JSON.stringify(pack), { status: 200 }),
    })

    const req = new Request("http://localhost/v1/questions?country=cr&grade=11&subject=matematicas&period=1", { method: "GET" })
    const res = await worker.fetch(req, env)
    expect(res.status).toBe(200)

    const data = (await res.json()) as any
    expect(data.success).toBe(true)
    expect(data.questions.length).toBe(1)
    expect(data.meta.pack_path).toContain("cr-week-1")
  })

  it("returns correct pagination info: total_pages, has_more, out_of_range", async () => {
    const questions = Array.from({ length: 45 }, (_, i) => ({
      id: `Q${i + 1}`,
      statement: `Statement ${i + 1}`,
      options: [{ letter: "A", text: "Op 1", is_correct: true }]
    }))

    const pack = { subject: "matematicas", questions }

    const env = mockEnv({
      "/v1/packs/co-week-1-grade-11-subject-matematicas.json": new Response(JSON.stringify(pack), { status: 200 }),
    })

    // Page 1
    let req = new Request("http://localhost/v1/questions?country=co&grade=11&subject=matematicas&period=1&limit=20&page=1", { method: "GET" })
    let res = await worker.fetch(req, env)
    expect(res.status).toBe(200)
    let data = (await res.json()) as any
    expect(data.questions.length).toBe(20)
    expect(data.meta.total_pages).toBe(3) // 45 / 20 -> ceil -> 3
    expect(data.meta.has_more).toBe(true)
    expect(data.meta.out_of_range).toBeUndefined()

    // Page 3
    req = new Request("http://localhost/v1/questions?country=co&grade=11&subject=matematicas&period=1&limit=20&page=3", { method: "GET" })
    res = await worker.fetch(req, env)
    expect(res.status).toBe(200)
    data = (await res.json()) as any
    expect(data.questions.length).toBe(5)
    expect(data.meta.has_more).toBe(false)
    expect(data.meta.out_of_range).toBeUndefined()

    // Page 4 (out of range)
    req = new Request("http://localhost/v1/questions?country=co&grade=11&subject=matematicas&period=1&limit=20&page=4", { method: "GET" })
    res = await worker.fetch(req, env)
    expect(res.status).toBe(200)
    data = (await res.json()) as any
    expect(data.questions.length).toBe(0)
    expect(data.meta.has_more).toBe(false)
    expect(data.meta.out_of_range).toBe(true)
  })

  it("includes CORS header for https://worldexam.swal.network", async () => {
    const req = new Request("http://localhost/v1/questions?country=co&grade=11&subject=matematicas", {
      method: "OPTIONS",
      headers: {
        "Origin": "https://worldexam.swal.network"
      }
    })

    const env = mockEnv({})
    const res = await worker.fetch(req, env)
    expect(res.status).toBe(204)
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("https://worldexam.swal.network")
  })
})
