import { describe, it, expect, vi } from "vitest"
import worker from "../src/index"
import type { Env } from "../src/index"

describe("GET /v1/grades/:country/:grade/bundle worker handler", () => {
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

  it("returns 200 OK with grade bundle payload and cache-control headers when asset exists", async () => {
    const bundleData = {
      grade: "11",
      country: "co",
      subjects: ["matematicas", "lectura_critica"],
      questions_count: 120,
    }

    const env = mockEnv({
      "/v1/grades/co-grado-11-full.json": new Response(JSON.stringify(bundleData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    })

    const req = new Request("http://localhost/v1/grades/co/11/bundle", {
      method: "GET",
      headers: { Origin: "https://saberparatodos.space" },
    })

    const res = await worker.fetch(req, env)

    expect(res.status).toBe(200)
    expect(res.headers.get("Content-Type")).toBe("application/json")
    expect(res.headers.get("Cache-Control")).toBe("public, max-age=86400, s-maxage=604800")
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("https://saberparatodos.space")

    const data = await res.json()
    expect(data).toEqual(bundleData)
  })

  it("returns 404 with error body when requested grade pack does not exist", async () => {
    const env = mockEnv({})

    const req = new Request("http://localhost/v1/grades/co/99/bundle", {
      method: "GET",
    })

    const res = await worker.fetch(req, env)

    expect(res.status).toBe(404)
    expect(res.headers.get("Content-Type")).toBe("application/json")

    const data = (await res.json()) as any
    expect(data.error).toBe("GRADE_BUNDLE_NOT_FOUND")
    expect(data.country).toBe("co")
    expect(data.grade).toBe("99")
  })

  it("does not grant cross-origin access for untrusted Origin headers", async () => {
    const bundleData = { grade: "11", country: "co" }
    const env = mockEnv({
      "/v1/grades/co-grado-11-full.json": new Response(JSON.stringify(bundleData), {
        status: 200,
      }),
    })

    const req = new Request("http://localhost/v1/grades/co/11/bundle", {
      method: "GET",
      headers: { Origin: "https://untrusted-site.com" },
    })

    const res = await worker.fetch(req, env)

    expect(res.status).toBe(200)
    expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull()
  })
})
