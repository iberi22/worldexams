// Hardening suite for the ranked submit path:
//   A1  atomic double submit (UPDATE ... WHERE submitted_at IS NULL + meta.changes)
//   A2  exam TTL = 60 min + 120 s grace, EXPIRED when now > created_at + TTL
//   A6  season computed in Colombia time (UTC-5 fixed, no DST)
//   R5  server-side integrity rule with a stored `reason` and `flagReason`
//   A7  IP start rate limit raised to 200/day (device stays at 5/day)

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import worker from "../src/index";
import type { Env } from "../src/index";
import {
  __clearRankedPoolCache,
  seasonFor,
  RANKED_EXAM_DURATION_S,
  RANKED_SUBMIT_GRACE_S,
  RANKED_MAX_STARTS_PER_IP_DAY,
} from "../src/ranked";

class FakeD1 {
  tables: Record<string, any[]> = {
    ranked_sessions: [],
    ranked_results: [],
  };
  /** When true, the SELECT snapshot hides a concurrent submit so the atomic
   *  UPDATE (not the pre-read) has to catch the race. */
  raceMode = false;
  updateCalls: string[] = [];
  resultInserts = 0;

  prepare(query: string) {
    let boundParams: any[] = [];
    const db = this;
    return {
      bind(...params: any[]) {
        boundParams = params;
        return this;
      },
      run: async () => {
        if (query.includes("INSERT INTO ranked_sessions")) {
          db.tables.ranked_sessions.push({
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
          return { success: true, meta: { changes: 1 } };
        }
        if (query.includes("UPDATE ranked_sessions SET submitted_at")) {
          db.updateCalls.push(boundParams[1]);
          const session = db.tables.ranked_sessions.find((s) => s.id === boundParams[1]);
          // Faithful D1 semantics: only a row still NULL is matched.
          if (session && session.submitted_at == null) {
            session.submitted_at = boundParams[0];
            return { success: true, meta: { changes: 1 } };
          }
          return { success: true, meta: { changes: 0 } };
        }
        if (query.includes("INSERT INTO ranked_results")) {
          db.resultInserts++;
          db.tables.ranked_results.push({
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
          return { success: true, meta: { changes: 1 } };
        }
        return { success: true, meta: { changes: 1 } };
      },
      first: async (col?: string) => {
        if (query.includes("SELECT COUNT(*) as c FROM ranked_sessions WHERE device_id")) {
          const count = db.tables.ranked_sessions.filter(
            (s) => s.device_id === boundParams[0] && s.created_at >= boundParams[1]
          ).length;
          return col ? count : { c: count };
        }
        if (query.includes("SELECT COUNT(*) as c FROM ranked_sessions WHERE ip_hash")) {
          const count = db.tables.ranked_sessions.filter(
            (s) => s.ip_hash === boundParams[0] && s.created_at >= boundParams[1]
          ).length;
          return col ? count : { c: count };
        }
        if (query.includes("SELECT * FROM ranked_sessions WHERE id")) {
          const session = db.tables.ranked_sessions.find((s) => s.id === boundParams[0]);
          if (!session) return null;
          if (db.raceMode && session.submitted_at != null) {
            return { ...session, submitted_at: null };
          }
          return session;
        }
        if (query.includes("SELECT AVG(score) as avgScore FROM ranked_results WHERE season")) {
          const validResults = db.tables.ranked_results.filter(
            (r) => r.season === boundParams[0] && r.status === "valid"
          );
          if (validResults.length === 0) return col ? 0 : { avgScore: 0 };
          const avg = validResults.reduce((acc, r) => acc + r.score, 0) / validResults.length;
          return col ? avg : { avgScore: avg };
        }
        return null;
      },
      all: async () => {
        if (query.includes("SELECT device_id, nickname, MAX(score) as score")) {
          const season = boundParams[0];
          const avg = boundParams[1];
          const limit = boundParams[2];
          const validResults = db.tables.ranked_results.filter(
            (r) => r.season === season && r.status === "valid" && r.score >= avg
          );
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
      },
    };
  }
}

function packFetcher(count: number) {
  return vi.fn(async (request: Request | string) => {
    const url = typeof request === "string" ? request : request.url;
    const slug = new URL(url).pathname.split("/").pop();
    const questions = Array.from({ length: count }, (_, i) => ({
      id: `${slug}-q${i}`,
      statement: `Q ${[...`${slug} ${i}`].map((c) => "abcdefghij"[Number(c)] ?? c).join("")}`,
      options: [
        { text: "Right", is_correct: true, feedback: "Because right." },
        { text: "W1", feedback: "no" },
        { text: "W2", feedback: "no" },
        { text: "W3", feedback: "no" },
      ],
      explanation: "Explanation text.",
    }));
    return new Response(JSON.stringify({ questions }), { status: 200 });
  });
}

function seedSession(
  db: FakeD1,
  opts: {
    created_at: number;
    n?: number;
    submitted_at?: number | null;
    ip_hash?: string;
    device_id?: string;
  }
) {
  const n = opts.n ?? 40;
  const ids = Array.from({ length: n }, (_, i) => `q${i}`);
  const key = ids.map((id) => ({
    questionId: id,
    correctLetter: "A",
    feedback: "f",
    explanation: "e",
    optionFeedback: [],
  }));
  const session = {
    id: `sess-${Math.random().toString(36).slice(2)}`,
    device_id: opts.device_id ?? "dev123456",
    nickname: "tester",
    ip_hash: opts.ip_hash ?? "iphash",
    seed: 1,
    question_ids: JSON.stringify(ids),
    answer_key: JSON.stringify(key),
    created_at: opts.created_at,
    expires_at: opts.created_at + RANKED_EXAM_DURATION_S + RANKED_SUBMIT_GRACE_S,
    submitted_at: opts.submitted_at ?? null,
  };
  db.tables.ranked_sessions.push(session);
  return session;
}

function submit(env: Env, body: any) {
  return worker.fetch(
    new Request("http://localhost/v1/ranked/submit", {
      method: "POST",
      body: JSON.stringify(body),
    }),
    env
  );
}

function answersFor(n: number, ms = 5000) {
  return Array.from({ length: n }, (_, i) => ({ questionId: `q${i}`, letter: "A", ms }));
}

async function sha256Hex(value: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value)
  );
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

describe("A1 · atomic double submit", () => {
  let db: FakeD1;
  let env: Env;

  beforeEach(() => {
    __clearRankedPoolCache();
    db = new FakeD1();
    env = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: { fetch: packFetcher(20) } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
  });

  afterEach(() => vi.restoreAllMocks());

  it("returns 409 and inserts only one result on a double submit", async () => {
    const session = seedSession(db, { created_at: Math.floor(Date.now() / 1000) - 600, n: 40 });
    const body = { sessionId: session.id, answers: answersFor(40), integrity: {} };

    const first = await submit(env, body);
    expect(first.status).toBe(200);
    expect(db.resultInserts).toBe(1);

    const second = await submit(env, body);
    expect(second.status).toBe(409);
    expect(((await second.json()) as any).error).toBe("ALREADY_SUBMITTED");
    expect(db.resultInserts).toBe(1);
  });

  it("rejects a submit that raced a concurrent commit (snapshot read, atomic write)", async () => {
    const now = Math.floor(Date.now() / 1000);
    const session = seedSession(db, { created_at: now - 600, n: 40 });
    // A concurrent request commits before ours runs.
    session.submitted_at = now - 1;
    // Our SELECT still sees the pre-commit snapshot.
    db.raceMode = true;

    const before = db.updateCalls.length;
    const res = await submit(env, {
      sessionId: session.id,
      answers: answersFor(40),
      integrity: {},
    });

    expect(res.status).toBe(409);
    expect(((await res.json()) as any).error).toBe("ALREADY_SUBMITTED");
    // The atomic UPDATE ran and matched zero rows.
    expect(db.updateCalls.length).toBe(before + 1);
    expect(db.resultInserts).toBe(0);
  });
});

describe("A2 · exam TTL and grace", () => {
  let db: FakeD1;
  let env: Env;

  beforeEach(() => {
    __clearRankedPoolCache();
    db = new FakeD1();
    env = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: { fetch: packFetcher(20) } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
  });

  afterEach(() => vi.restoreAllMocks());

  it("exports the 60 min duration and 120 s grace", () => {
    expect(RANKED_EXAM_DURATION_S).toBe(3600);
    expect(RANKED_SUBMIT_GRACE_S).toBe(120);
  });

  it("stores expires_at = created_at + duration + grace", async () => {
    const before = Math.floor(Date.now() / 1000);
    const res = await worker.fetch(
      new Request("http://localhost/v1/ranked/start", {
        method: "POST",
        body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
      }),
      env
    );
    expect(res.status).toBe(200);
    const session = db.tables.ranked_sessions[0];
    expect(session.expires_at - session.created_at).toBe(
      RANKED_EXAM_DURATION_S + RANKED_SUBMIT_GRACE_S
    );
    expect(session.created_at).toBeGreaterThanOrEqual(before);
  });

  it("rejects a submit after duration + grace with EXPIRED", async () => {
    const now = Math.floor(Date.now() / 1000);
    const session = seedSession(db, { created_at: now - (RANKED_EXAM_DURATION_S + RANKED_SUBMIT_GRACE_S + 1), n: 40 });
    const res = await submit(env, { sessionId: session.id, answers: answersFor(40), integrity: {} });
    expect(res.status).toBe(400);
    expect(((await res.json()) as any).error).toBe("EXPIRED");
    expect(db.resultInserts).toBe(0);
  });

  it("accepts a submit inside the grace window", async () => {
    const now = Math.floor(Date.now() / 1000);
    const session = seedSession(db, { created_at: now - RANKED_EXAM_DURATION_S, n: 40 });
    const res = await submit(env, { sessionId: session.id, answers: answersFor(40), integrity: {} });
    expect(res.status).toBe(200);
    expect(((await res.json()) as any).status).toBe("valid");
  });
});

describe("A6 · season in Colombia time (UTC-5 fixed)", () => {
  it("computes the month in UTC-5", () => {
    expect(seasonFor(Date.parse("2026-10-31T23:30:00-05:00") / 1000)).toBe("2026-10");
    expect(seasonFor(Date.parse("2026-11-01T04:00:00Z") / 1000)).toBe("2026-10");
    expect(seasonFor(Date.parse("2026-11-01T05:00:00Z") / 1000)).toBe("2026-11");
  });

  it("stores the Colombia season on submit", async () => {
    const db = new FakeD1();
    const env = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: { fetch: packFetcher(20) } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
    const mockedNow = Date.parse("2026-11-01T04:00:00Z");
    vi.spyOn(Date, "now").mockReturnValue(mockedNow);
    const session = seedSession(db, {
      created_at: Math.floor(mockedNow / 1000) - 600,
      n: 40,
    });
    const res = await submit(env, {
      sessionId: session.id,
      answers: answersFor(40),
      integrity: {},
    });
    expect(res.status).toBe(200);
    expect(db.tables.ranked_results[0].season).toBe("2026-10");
  });

  it("defaults the leaderboard season to Colombia time", async () => {
    const db = new FakeD1();
    const env = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: { fetch: packFetcher(20) } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
    vi.spyOn(Date, "now").mockReturnValue(Date.parse("2026-11-01T04:00:00Z"));
    const res = await worker.fetch(new Request("http://localhost/v1/leaderboard"), env);
    const data = (await res.json()) as any;
    expect(data.season).toBe("2026-10");
  });
});

describe("R5 · server-side integrity rule", () => {
  let db: FakeD1;
  let env: Env;

  beforeEach(() => {
    __clearRankedPoolCache();
    db = new FakeD1();
    env = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: { fetch: packFetcher(20) } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
  });

  afterEach(() => vi.restoreAllMocks());

  function sessionAt(secondsAgo: number, n = 40) {
    return seedSession(db, { created_at: Math.floor(Date.now() / 1000) - secondsAgo, n });
  }

  async function submitWith(session: any, integrity: any, ms = 5000, n = 40) {
    return submit(env, {
      sessionId: session.id,
      answers: answersFor(n, ms),
      integrity,
    });
  }

  it("flags tab_switches > 2 and stores the reason", async () => {
    const res = await submitWith(sessionAt(600), { tabSwitches: 3 });
    const out = (await res.json()) as any;
    expect(out.status).toBe("flagged");
    expect(out.flagReason).toBe("tab_switches");
    const stored = JSON.parse(db.tables.ranked_results[0].integrity);
    expect(stored.reason).toBe("tab_switches");
  });

  it("flags fullscreen_exits > 2", async () => {
    const res = await submitWith(sessionAt(600), { fullscreenExits: 3 });
    expect(((await res.json()) as any).flagReason).toBe("fullscreen_exits");
  });

  it("flags copy_paste > 0", async () => {
    const res = await submitWith(sessionAt(600), { copyPaste: 1 });
    expect(((await res.json()) as any).flagReason).toBe("copy_paste");
  });

  it("flags devtools > 0", async () => {
    const res = await submitWith(sessionAt(600), { devtools: 1 });
    expect(((await res.json()) as any).flagReason).toBe("devtools");
  });

  it("flags server_too_fast when the server clock is under answered*4", async () => {
    const res = await submitWith(sessionAt(30), {}, 5000, 31);
    const out = (await res.json()) as any;
    expect(out.status).toBe("flagged");
    expect(out.flagReason).toBe("server_too_fast");
  });

  it("flags client_median_too_fast when the client median is under 1500 ms", async () => {
    const res = await submitWith(sessionAt(600), {}, 1000, 31);
    const out = (await res.json()) as any;
    expect(out.status).toBe("flagged");
    expect(out.flagReason).toBe("client_median_too_fast");
  });

  it("accepts a legitimate submission and omits flagReason", async () => {
    // 518 s elapsed, 40 answers, 2500 ms client median.
    const res = await submitWith(sessionAt(518), {}, 2500, 40);
    const out = (await res.json()) as any;
    expect(out.status).toBe("valid");
    expect(out).not.toHaveProperty("flagReason");
    const stored = JSON.parse(db.tables.ranked_results[0].integrity);
    expect(stored.reason).toBeNull();
  });
});

describe("A7 · per-IP start rate limit", () => {
  let db: FakeD1;
  let env: Env;

  beforeEach(() => {
    __clearRankedPoolCache();
    db = new FakeD1();
    env = {
      SUPABASE_URL: "https://mock.supabase.co",
      SUPABASE_ANON_KEY: "mock-key",
      ASSETS: { fetch: packFetcher(20) } as unknown as Fetcher,
      RANKED_DB: db as any,
    };
  });

  afterEach(() => vi.restoreAllMocks());

  it("exports a 200/day IP limit", () => {
    expect(RANKED_MAX_STARTS_PER_IP_DAY).toBe(200);
  });

  it("blocks the 201st start from the same IP", async () => {
    const now = Math.floor(Date.now() / 1000);
    const ip = "203.0.113.7";
    const ipHash = await sha256Hex(ip);
    for (let i = 0; i < RANKED_MAX_STARTS_PER_IP_DAY; i++) {
      db.tables.ranked_sessions.push({
        id: `ip-${i}`,
        device_id: `device-${i}`,
        nickname: "tester",
        ip_hash: ipHash,
        seed: 1,
        question_ids: "[]",
        answer_key: "[]",
        created_at: now,
        expires_at: now + 3720,
      });
    }
    const res = await worker.fetch(
      new Request("http://localhost/v1/ranked/start", {
        method: "POST",
        headers: { "cf-connecting-ip": ip },
        body: JSON.stringify({ deviceId: "device-201", nickname: "tester" }),
      }),
      env
    );
    expect(res.status).toBe(429);
    expect(((await res.json()) as any).error).toBe("RATE_LIMITED");
  });

  it("still blocks the 6th start from the same device", async () => {
    const now = Math.floor(Date.now() / 1000);
    for (let i = 0; i < 5; i++) {
      db.tables.ranked_sessions.push({
        id: `dev-${i}`,
        device_id: "dev123456",
        nickname: "tester",
        ip_hash: `ip-${i}`,
        seed: 1,
        question_ids: "[]",
        answer_key: "[]",
        created_at: now,
        expires_at: now + 3720,
      });
    }
    const res = await worker.fetch(
      new Request("http://localhost/v1/ranked/start", {
        method: "POST",
        body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
      }),
      env
    );
    expect(res.status).toBe(429);
  });
});
