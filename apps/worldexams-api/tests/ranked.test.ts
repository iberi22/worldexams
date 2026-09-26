import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import worker from "../src/index";
import type { Env } from "../src/index";
import { __clearRankedPoolCache } from "../src/ranked";

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
          if (session) session.submitted_at = boundParams[0];
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
        if (query.includes("SELECT AVG(score) as avgScore FROM ranked_results WHERE season")) {
          const validResults = this.tables.ranked_results.filter(r => r.season === boundParams[0] && r.status === 'valid');
          if (validResults.length === 0) return col ? 0 : { avgScore: 0 };
          const sum = validResults.reduce((acc, r) => acc + r.score, 0);
          const avg = sum / validResults.length;
          return col ? avg : { avgScore: avg };
        }
        return null;
      },
      all: async () => {
        if (query.includes("SELECT device_id, nickname, MAX(score) as score")) {
          const season = boundParams[0];
          const avg = boundParams[1];
          const limit = boundParams[2];

          const validResults = this.tables.ranked_results.filter(r => r.season === season && r.status === 'valid' && r.score >= avg);
          const grouped: Record<string, any> = {};
          for (const r of validResults) {
            if (!grouped[r.device_id] || grouped[r.device_id].score < r.score) {
              grouped[r.device_id] = { ...r };
            }
          }
          const results = Object.values(grouped).sort((a, b) => b.score - a.score).slice(0, limit);
          return { results };
        }
        return { results: [] };
      }
    };
  }
}

describe("Ranked Module", () => {
  let db: FakeD1;
  let mockEnv: Env;

  beforeEach(() => {
    __clearRankedPoolCache();
    db = new FakeD1();
    mockEnv = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: {
        fetch: vi.fn(async (request: Request | string) => {
          // Unique, well-formed 4-option questions per pack path.
          const url = typeof request === "string" ? request : request.url;
          const slug = new URL(url).pathname.split("/").pop();
          const questions = Array.from({ length: 20 }, (_, i) => ({
            id: `${slug}-q${i}`,
            statement: `Q ${i}`,
            options: [
              { text: "Right", is_correct: true, feedback: "Because right." },
              { text: "W1", feedback: "no" },
              { text: "W2", feedback: "no" },
              { text: "W3", feedback: "no" },
            ],
            explanation: "Explanation text.",
          }));
          return new Response(JSON.stringify({ questions }), { status: 200 });
        }),
      } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  async function startSession(nickname = "tester") {
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname }),
    }), mockEnv);
    return { res, data: (await res.json()) as any };
  }

  function answersFor(data: any, n: number, letter = "A") {
    return data.questions.slice(0, n).map((q: any) => ({ questionId: q.id, letter, ms: 5000 }));
  }

  function advanceSeconds(sec: number) {
    const real = Date.now();
    vi.spyOn(Date, "now").mockReturnValue(real + sec * 1000);
  }

  it("returns 503 if RANKED_DB is missing", async () => {
    const envNoDb = { ...mockEnv, RANKED_DB: undefined };
    const req = new Request("http://localhost/v1/ranked/start", { method: "POST", body: JSON.stringify({}) });
    const res = await worker.fetch(req, envNoDb);
    expect(res.status).toBe(503);
    const data = await res.json() as any;
    expect(data.error).toBe("RANKED_UNAVAILABLE");
  });

  it("start exam returns 40 questions without correct_answer/is_correct", async () => {
    const req = new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    });
    const res = await worker.fetch(req, mockEnv);
    expect(res.status).toBe(200);
    const data = await res.json() as any;
    expect(data.questions.length).toBe(40);

    for (const q of data.questions) {
      expect(q).not.toHaveProperty("correct_answer");
      expect(q).not.toHaveProperty("explanation");
      expect(q).not.toHaveProperty("feedback");
      for (const opt of q.options) {
        expect(opt).not.toHaveProperty("is_correct");
      }
    }
  });

  it("submit exam < 31 answers => not_eligible_min_questions", async () => {
    // 1. Start
    const reqStart = new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    });
    const resStart = await worker.fetch(reqStart, mockEnv);
    const dataStart = await resStart.json() as any;

    // 2. Submit 30 answers
    const answers = answersFor(dataStart, 30);
    advanceSeconds(600);
    const reqSub = new Request("http://localhost/v1/ranked/submit", {
      method: "POST",
      body: JSON.stringify({
        sessionId: dataStart.sessionId,
        answers,
        integrity: {}
      }),
    });
    const resSub = await worker.fetch(reqSub, mockEnv);
    const dataSub = await resSub.json() as any;
    expect(dataSub.status).toBe("not_eligible_min_questions");
  });

  it("submit exam 31 answers valid integrity => valid status", async () => {
    const reqStart = new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    });
    const resStart = await worker.fetch(reqStart, mockEnv);
    const dataStart = await resStart.json() as any;

    const answers = answersFor(dataStart, 31);
    advanceSeconds(600);
    const reqSub = new Request("http://localhost/v1/ranked/submit", {
      method: "POST",
      body: JSON.stringify({
        sessionId: dataStart.sessionId,
        answers,
        integrity: { tabSwitches: 0, copyPaste: 0 }
      }),
    });
    const resSub = await worker.fetch(reqSub, mockEnv);
    const dataSub = await resSub.json() as any;
    expect(dataSub.status).toBe("valid");
    expect(dataSub.score).toBeGreaterThanOrEqual(0);
  });

  it("submit exam copyPaste > 0 => flagged status", async () => {
    const reqStart = new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    });
    const resStart = await worker.fetch(reqStart, mockEnv);
    const dataStart = await resStart.json() as any;

    const answers = answersFor(dataStart, 31);
    advanceSeconds(600);
    const reqSub = new Request("http://localhost/v1/ranked/submit", {
      method: "POST",
      body: JSON.stringify({
        sessionId: dataStart.sessionId,
        answers,
        integrity: { copyPaste: 1 }
      }),
    });
    const resSub = await worker.fetch(reqSub, mockEnv);
    const dataSub = await resSub.json() as any;
    expect(dataSub.status).toBe("flagged");
  });

  it("double submit returns 409", async () => {
    const reqStart = new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    });
    const resStart = await worker.fetch(reqStart, mockEnv);
    const dataStart = await resStart.json() as any;

    const reqSub = new Request("http://localhost/v1/ranked/submit", {
      method: "POST",
      body: JSON.stringify({
        sessionId: dataStart.sessionId,
        answers: answersFor(dataStart, 31),
        integrity: {}
      }),
    });
    await worker.fetch(reqSub.clone(), mockEnv);
    const resSub2 = await worker.fetch(reqSub, mockEnv);
    expect(resSub2.status).toBe(409);
  });

  it("answers with question ids outside the session are not counted", async () => {
    const { data } = await startSession();
    const fake = Array.from({ length: 40 }, (_, i) => ({ questionId: `fake-${i}`, letter: "A", ms: 5000 }));
    advanceSeconds(600);
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/submit", {
      method: "POST",
      body: JSON.stringify({ sessionId: data.sessionId, answers: fake, integrity: {} }),
    }), mockEnv);
    const out = (await res.json()) as any;
    expect(out.answered).toBe(0);
    expect(out.status).toBe("not_eligible_min_questions");
  });

  it("submitting faster than the server-side minimum time is flagged", async () => {
    const { data } = await startSession();
    advanceSeconds(30); // 31 answers need >= 124 s
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/submit", {
      method: "POST",
      body: JSON.stringify({ sessionId: data.sessionId, answers: answersFor(data, 31), integrity: {} }),
    }), mockEnv);
    expect(((await res.json()) as any).status).toBe("flagged");
  });

  it("scores against the server answer key", async () => {
    const { data } = await startSession();
    // Pick the letter of the option whose text is "Right" for each question.
    const answers = data.questions.slice(0, 35).map((q: any) => ({
      questionId: q.id,
      letter: q.options.find((o: any) => o.text === "Right").letter,
      ms: 5000,
    }));
    advanceSeconds(600);
    const res = await worker.fetch(new Request("http://localhost/v1/ranked/submit", {
      method: "POST",
      body: JSON.stringify({ sessionId: data.sessionId, answers, integrity: {} }),
    }), mockEnv);
    const out = (await res.json()) as any;
    expect(out.status).toBe("valid");
    expect(out.correct).toBe(35);
    expect(out.score).toBe(875);
  });

  it("accepts unicode nicknames and rejects invalid ones", async () => {
    expect((await startSession("José Ñoño")).res.status).toBe(200);
    expect((await startSession("<script>")).res.status).toBe(400);
  });

  it("does not sample duplicate questions from alias packs", async () => {
    const { data } = await startSession();
    const ids = data.questions.map((q: any) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("leaderboard excludes below average and best per device", async () => {
    const season = new Date().toISOString().substring(0, 7);
    db.tables.ranked_results.push(
      { session_id: "s1", device_id: "d1", nickname: "user1", season, score: 900, status: "valid" },
      { session_id: "s2", device_id: "d2", nickname: "user2", season, score: 500, status: "valid" }, // avg = 700
      { session_id: "s3", device_id: "d1", nickname: "user1", season, score: 800, status: "valid" }, // d1 best is 900
    );

    const req = new Request("http://localhost/v1/leaderboard", { method: "GET" });
    const res = await worker.fetch(req, mockEnv);
    const data = await res.json() as any;

    expect(data.average).toBe(733.3333333333334);
    expect(data.entries.length).toBe(1);
    expect(data.entries[0].nickname).toBe("user1");
    expect(data.entries[0].score).toBe(900);
  });
});
