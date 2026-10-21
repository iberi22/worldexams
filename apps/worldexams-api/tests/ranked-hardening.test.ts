// Hardening suite for the ranked exam contract (R2 security, R4 placeholders,
// A3 pool guard, crypto randomness, submit limits).
//
// R2: /v1/ranked/start used to ship every option's feedback inside
// clientQuestions, which leaked the correct answer's explanation to the client
// before the exam was submitted. The feedback now travels only after /submit,
// attached to the answer key and echoed back in the review.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import worker from "../src/index";
import type { Env } from "../src/index";
import {
  __clearRankedPoolCache,
  hasUnresolvedPlaceholder,
} from "../src/ranked";

class FakeD1 {
  tables: Record<string, any[]> = {
    ranked_sessions: [],
    ranked_results: [],
  };

  prepare(query: string) {
    let boundParams: any[] = [];
    return {
      bind(...params: any[]) {
        boundParams = params;
        return this;
      },
      run: async () => {
        if (query.includes("INSERT INTO ranked_sessions")) {
          this.tables.ranked_sessions.push({
            id: boundParams[0],
            device_id: boundParams[1],
            nickname: boundParams[2],
            ip_hash: boundParams[3],
            seed: boundParams[4],
            question_ids: boundParams[5],
            answer_key: boundParams[6],
            created_at: boundParams[7],
            expires_at: boundParams[8],
          });
        } else if (query.includes("UPDATE ranked_sessions SET submitted_at")) {
          const session = this.tables.ranked_sessions.find(s => s.id === boundParams[1]);
          if (session && session.submitted_at == null) {
            session.submitted_at = boundParams[0];
            return { success: true, meta: { changes: 1 } };
          }
          return { success: true, meta: { changes: 0 } };
        } else if (query.includes("INSERT INTO ranked_results")) {
          this.tables.ranked_results.push({
            session_id: boundParams[0],
            device_id: boundParams[1],
            nickname: boundParams[2],
            season: boundParams[3],
            score: boundParams[4],
            correct: boundParams[5],
            answered: boundParams[6],
            status: boundParams[7],
            integrity: boundParams[8],
            created_at: boundParams[9],
          });
        }
        return { success: true };
      },
      first: async (col?: string) => {
        if (query.includes("SELECT COUNT(*) as c FROM ranked_sessions WHERE device_id")) {
          const count = this.tables.ranked_sessions.filter(s => s.device_id === boundParams[0] && s.created_at >= boundParams[1]).length;
          return col ? count : { c: count };
        }
        if (query.includes("SELECT COUNT(*) as c FROM ranked_sessions WHERE ip_hash")) {
          const count = this.tables.ranked_sessions.filter(s => s.ip_hash === boundParams[0] && s.created_at >= boundParams[1]).length;
          return col ? count : { c: count };
        }
        if (query.includes("SELECT * FROM ranked_sessions WHERE id")) {
          return this.tables.ranked_sessions.find(s => s.id === boundParams[0]) || null;
        }
        return null;
      },
      all: async () => ({ results: [] }),
    };
  }
}

/** Builds a fetcher whose packs return `count` well-formed questions each. */
function packFetcher(count: number, mutate?: (q: any, i: number) => any) {
  return vi.fn(async (request: Request | string) => {
    const url = typeof request === "string" ? request : request.url;
    const slug = new URL(url).pathname.split("/").pop();
    const questions = Array.from({ length: count }, (_, i) => {
      const q = {
        id: `${slug}-q${i}`,
        statement: `Q ${[...`${slug} ${i}`].map((c) => "abcdefghij"[Number(c)] ?? c).join("")}`,
        options: [
          { text: "Right", is_correct: true, feedback: "Because right." },
          { text: "W1", feedback: "no" },
          { text: "W2", feedback: "no" },
          { text: "W3", feedback: "no" },
        ],
        explanation: "Explanation text.",
      };
      return mutate ? mutate(q, i) : q;
    });
    return new Response(JSON.stringify({ questions }), { status: 200 });
  });
}

describe("R2 · /start no longer leaks feedback", () => {
  let db: FakeD1;
  let mockEnv: Env;

  beforeEach(() => {
    __clearRankedPoolCache();
    db = new FakeD1();
    mockEnv = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: { fetch: packFetcher(20) } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
  });

  afterEach(() => vi.restoreAllMocks());

  async function start() {
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    }), mockEnv);
    return { res, data: (await res.json()) as any };
  }

  it("client options carry only { letter, text }", async () => {
    const { res, data } = await start();
    expect(res.status).toBe(200);
    expect(data.questions.length).toBe(40);
    for (const q of data.questions) {
      for (const opt of q.options) {
        expect(Object.keys(opt).sort()).toEqual(["letter", "text"]);
        expect(opt).not.toHaveProperty("feedback");
        expect(opt).not.toHaveProperty("is_correct");
      }
    }
  });

  it("answer_key stores optionFeedback for all four re-lettered options", async () => {
    const { data } = await start();
    expect(db.tables.ranked_sessions).toHaveLength(1);
    const key = JSON.parse(db.tables.ranked_sessions[0].answer_key);
    expect(key).toHaveLength(40);
    for (const entry of key) {
      expect(Array.isArray(entry.optionFeedback)).toBe(true);
      expect(entry.optionFeedback).toHaveLength(4);
      expect(entry.optionFeedback.map((o: any) => o.letter)).toEqual(["A", "B", "C", "D"]);
      for (const o of entry.optionFeedback) {
        expect(typeof o.feedback).toBe("string");
      }
    }
  });

  it("submit review echoes optionFeedback attached to each question", async () => {
    const { data } = await start();
    const answers = data.questions.slice(0, 31).map((q: any) => ({
      questionId: q.id,
      letter: "A",
      ms: 5000,
    }));
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/submit", {
      method: "POST",
      body: JSON.stringify({ sessionId: data.sessionId, answers, integrity: {} }),
    }), mockEnv);
    const out = (await res.json()) as any;
    expect(res.status).toBe(200);
    expect(out.review).toHaveLength(40);
    for (const item of out.review) {
      expect(item.optionFeedback).toHaveLength(4);
      expect(item.optionFeedback.map((o: any) => o.letter)).toEqual(["A", "B", "C", "D"]);
      expect(item).toHaveProperty("correctLetter");
      expect(item).toHaveProperty("feedback");
      expect(item).toHaveProperty("explanation");
    }
  });

  it("legacy sessions without optionFeedback degrade to []", async () => {
    const now = Math.floor(Date.now() / 1000);
    db.tables.ranked_sessions.push({
      id: "legacy-session",
      device_id: "dev123456",
      nickname: "legacy",
      ip_hash: "x",
      seed: 1,
      question_ids: JSON.stringify(["q1"]),
      answer_key: JSON.stringify([{ questionId: "q1", correctLetter: "A", feedback: "f", explanation: "e" }]),
      created_at: now,
      expires_at: now + 5400,
    });
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/submit", {
      method: "POST",
      body: JSON.stringify({
        sessionId: "legacy-session",
        answers: [{ questionId: "q1", letter: "A", ms: 5000 }],
        integrity: {},
      }),
    }), mockEnv);
    const out = (await res.json()) as any;
    expect(out.review[0].optionFeedback).toEqual([]);
  });
});

describe("R4 · unresolved placeholders", () => {
  it("detects template placeholders", () => {
    expect(hasUnresolvedPlaceholder("It is only used by academic elites in {city}.")).toBe(true);
    expect(hasUnresolvedPlaceholder("Capital of {country}")).toBe(true);
    expect(hasUnresolvedPlaceholder("{student_name} must answer")).toBe(true);
  });

  it("ignores LaTeX braces and short groups", () => {
    expect(hasUnresolvedPlaceholder("Compute \\frac{a}{b}")).toBe(false);
    expect(hasUnresolvedPlaceholder("\\text{cal} is a unit")).toBe(false);
    expect(hasUnresolvedPlaceholder("x^{2}")).toBe(false);
    expect(hasUnresolvedPlaceholder("\\sqrt{x-3}")).toBe(false);
    expect(hasUnresolvedPlaceholder("_{i}")).toBe(false);
    expect(hasUnresolvedPlaceholder("\\mathrm{kg}")).toBe(false);
    expect(hasUnresolvedPlaceholder("{a}")).toBe(false);
    expect(hasUnresolvedPlaceholder("no braces here")).toBe(false);
    expect(hasUnresolvedPlaceholder("")).toBe(false);
  });

  it("excludes placeholder questions from the pool", async () => {
    __clearRankedPoolCache();
    const db = new FakeD1();
    const env = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: {
        fetch: packFetcher(20, (q) => ({ ...q, statement: `${q.statement} in {city}` })),
      } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    }), env);
    expect(res.status).toBe(503);
    expect(((await res.json()) as any).error).toBe("POOL_INSUFFICIENT");
    expect(db.tables.ranked_sessions).toHaveLength(0);
  });

  it("keeps LaTeX questions in the pool", async () => {
    __clearRankedPoolCache();
    const db = new FakeD1();
    const env = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: {
        fetch: packFetcher(20, (q) => ({
          ...q,
          statement: `Simplify \\frac{a}{b} and \\text{cal} ${q.statement}`,
        })),
      } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    }), env);
    expect(res.status).toBe(200);
    const data = (await res.json()) as any;
    expect(data.questions.length).toBe(40);
  });
});

describe("A3 · minimum pool guard", () => {
  it("returns 503 POOL_INSUFFICIENT without inserting a session", async () => {
    __clearRankedPoolCache();
    const db = new FakeD1();
    const env = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: { fetch: packFetcher(1) } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    }), env);
    expect(res.status).toBe(503);
    const data = (await res.json()) as any;
    expect(data.error).toBe("POOL_INSUFFICIENT");
    expect(db.tables.ranked_sessions).toHaveLength(0);
  });
});

describe("crypto randomness and submit limits", () => {
  let db: FakeD1;
  let mockEnv: Env;

  beforeEach(() => {
    __clearRankedPoolCache();
    db = new FakeD1();
    mockEnv = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: { fetch: packFetcher(20) } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
  });

  afterEach(() => vi.restoreAllMocks());

  it("sessionId is >=128 bits of hex and seed is an integer", async () => {
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    }), mockEnv);
    const data = (await res.json()) as any;
    expect(data.sessionId).toMatch(/^[0-9a-f]{32,}$/);
    expect(data.sessionId).toHaveLength(64);
    expect(Number.isInteger(data.seed)).toBe(true);
    expect(data.seed).toBeGreaterThanOrEqual(0);
    expect(data.seed).toBeLessThanOrEqual(0xffffffff);
  });

  it("two sessions get different sessionIds", async () => {
    const a = (await (await worker.fetch(new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    }), mockEnv)).json()) as any;
    const b = (await (await worker.fetch(new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    }), mockEnv)).json()) as any;
    expect(a.sessionId).not.toBe(b.sessionId);
  });

  it("rejects more than 80 answers with TOO_MANY_ANSWERS", async () => {
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/submit", {
      method: "POST",
      body: JSON.stringify({
        sessionId: "whatever",
        answers: Array.from({ length: 81 }, (_, i) => ({ questionId: `q${i}`, letter: "A" })),
        integrity: {},
      }),
    }), mockEnv);
    expect(res.status).toBe(400);
    expect(((await res.json()) as any).error).toBe("TOO_MANY_ANSWERS");
  });

  it("stores the trimmed nickname", async () => {
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "  tester  " }),
    }), mockEnv);
    expect(res.status).toBe(200);
    expect(db.tables.ranked_sessions[0].nickname).toBe("tester");
  });
});
