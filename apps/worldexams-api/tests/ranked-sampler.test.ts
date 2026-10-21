// Ranked sampler: exclusions, per-pack diversity and statement dedup.
//
// Before this suite /v1/ranked/start loaded 3 packs per area and cut the pool
// at 24 questions, so a session drew from ~2 weeks, repeated statements were
// possible and excluded weeks/ids could leak into the exam.
//
// The sampler now:
//   * skips weeks in RANKED_EXCLUDED_WEEKS and ids flagged by isRankedExcluded,
//   * loads exactly RANKED_PACKS_PER_AREA (4) distinct weeks per area,
//   * selects at most 2 questions per pack for the area's 8,
//   * never selects two questions whose normalized statement matches.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import worker from "../src/index";
import type { Env } from "../src/index";
import {
  __clearRankedPoolCache,
  normalizeStatementForDedup,
} from "../src/ranked";
import { RANKED_EXCLUDED_WEEKS } from "../src/ranked-exclusions";

const AREAS = [
  "matematicas",
  "lectura_critica",
  "sociales_ciudadanas",
  "ciencias_naturales",
  "ingles",
] as const;

const CANONICAL: Record<string, string> = {
  matematicas: "matematicas",
  lectura_critica: "lectura_critica",
  sociales_ciudadanas: "sociales_ciudadanas",
  ciencias_naturales: "ciencias_naturales",
  ingles: "ingles",
};

// Weeks that exist in the fake manifest. Matematicas starts at 22 so the
// excluded 1-21 window is never touched by the "normal" fixtures.
const AREA_WEEKS: Record<string, number[]> = {
  matematicas: [22, 23, 24, 25],
  lectura_critica: [1, 2, 3, 4],
  sociales_ciudadanas: [1, 2, 3, 4],
  ciencias_naturales: [1, 2, 3, 4],
  ingles: [1, 2, 3, 4],
};

const EXCLUDED_INGLES_ID =
  "CO-ING-11-2026-W01-global-issues-001-MASTERY-bundle-v10";

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
        return { success: true, meta: { changes: 1 } };
      },
      first: async (col?: string) => {
        if (query.includes("SELECT COUNT(*) as c FROM ranked_sessions")) {
          const count = this.tables.ranked_sessions.filter(
            (s) =>
              (query.includes("device_id") ? s.device_id === boundParams[0] : s.ip_hash === boundParams[0]) &&
              s.created_at >= boundParams[1]
          ).length;
          return col ? count : { c: count };
        }
        return null;
      },
      all: async () => ({ results: [] }),
    };
  }
}

function defaultQuestions(slug: string, week: number, subject: string) {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${slug}-q${i}`,
    // Letters only and the subject in the text: the dedup normalizer maps every
    // digit to `#` and dedups globally, so a statement that only encodes the
    // week/index would collide across areas.
    statement: `Statement ${subject} ${String.fromCharCode(97 + ((week - 1) % 26))} ${String.fromCharCode(97 + i)}`,
    options: [
      { text: "Right", is_correct: true, feedback: "Because right." },
      { text: "W1", feedback: "no" },
      { text: "W2", feedback: "no" },
      { text: "W3", feedback: "no" },
    ],
    explanation: "Explanation text.",
  }));
}

function manifestFilesFor(weeks: Record<string, number[]>): string[] {
  const files: string[] = [];
  for (const area of AREAS) {
    for (const week of weeks[area]) {
      // The manifest lists pack names without the `.json` extension (the
      // worker compares resolveWeekPackNames output against this set).
      files.push(`co-week-${week}-grade-11-subject-${CANONICAL[area]}`);
    }
  }
  return files;
}

function recordingFetcher(opts: {
  manifestFiles?: string[];
  makeQuestions?: (slug: string, week: number, subject: string) => any[];
} = {}) {
  const calls: string[] = [];
  const fetch = vi.fn(async (request: Request | string) => {
    const url = typeof request === "string" ? request : request.url;
    const path = new URL(url).pathname;
    if (path.endsWith("_manifest.json")) {
      if (opts.manifestFiles) {
        return new Response(JSON.stringify({ files: opts.manifestFiles }), {
          status: 200,
        });
      }
      // Same stub as ranked-hardening.test.ts: no `files` array means the
      // manifest lookup returns null and every week resolves to its first
      // candidate pack name.
      return new Response(JSON.stringify({ questions: [] }), { status: 200 });
    }
    const slug = path.split("/").pop()!;
    calls.push(slug);
    const week = Number(slug.match(/week-(\d+)-/)![1]);
    const subject = slug.match(/subject-([a-z_]+)\.json/)![1];
    const questions = opts.makeQuestions
      ? opts.makeQuestions(slug, week, subject)
      : defaultQuestions(slug, week, subject);
    return new Response(JSON.stringify({ questions }), { status: 200 });
  });
  return { fetch, calls };
}

function makeEnv(fetcher: ReturnType<typeof recordingFetcher>): Env {
  return {
    SUPABASE_URL: "https://mock.supabase.co",
    SUPABASE_ANON_KEY: "mock-key",
    ASSETS: { fetch: fetcher.fetch } as unknown as Fetcher,
    RANKED_DB: new FakeD1() as any,
  };
}

async function start(env: Env) {
  const res = await worker.fetch(
    new Request("http://localhost/v1/ranked/start", {
      method: "POST",
      body: JSON.stringify({ deviceId: "dev123456", nickname: "tester" }),
    }),
    env
  );
  return { res, data: (await res.json()) as any };
}

function weekOf(id: string) {
  return Number(id.match(/week-(\d+)-/)![1]);
}

function subjectOfSlug(slug: string) {
  return slug.match(/subject-([a-z_]+)\.json/)![1];
}

describe("ranked sampler · exclusions, diversity, dedup", () => {
  beforeEach(() => __clearRankedPoolCache());
  afterEach(() => vi.restoreAllMocks());

  it("normalizeStatementForDedup collapses case, whitespace, digits and math", () => {
    expect(normalizeStatementForDedup("Capital  of   France")).toBe(
      normalizeStatementForDedup("capital of France")
    );
    expect(normalizeStatementForDedup("What is 2+2?")).toBe(
      normalizeStatementForDedup("what is 99+0?")
    );
    expect(normalizeStatementForDedup("Compute $2+3$")).toBe(
      normalizeStatementForDedup("compute $100$")
    );
    expect(normalizeStatementForDedup("Alpha")).not.toBe(
      normalizeStatementForDedup("Beta")
    );
  });

  it("returns 40 questions, 8 per area, when the pool is large", async () => {
    const { res, data } = await start(
      makeEnv(recordingFetcher({ manifestFiles: manifestFilesFor(AREA_WEEKS) }))
    );
    expect(res.status).toBe(200);
    expect(data.questions).toHaveLength(40);
    const counts: Record<string, number> = {};
    for (const q of data.questions) counts[q.subject] = (counts[q.subject] || 0) + 1;
    for (const area of AREAS) expect(counts[area]).toBe(8);
  });

  it("loads exactly 4 distinct weeks per area (20 packs total)", async () => {
    const fetcher = recordingFetcher({
      manifestFiles: manifestFilesFor(AREA_WEEKS),
    });
    await start(makeEnv(fetcher));
    const bySubject: Record<string, number[]> = {};
    for (const slug of fetcher.calls) {
      const s = subjectOfSlug(slug);
      (bySubject[s] ||= []).push(Number(slug.match(/week-(\d+)-/)![1]));
    }
    for (const area of AREAS) {
      expect(bySubject[area]).toHaveLength(4);
      expect(new Set(bySubject[area]).size).toBe(4);
    }
    expect(fetcher.calls).toHaveLength(20);
  });

  it("never requests an excluded week for an area", async () => {
    const fetcher = recordingFetcher({
      manifestFiles: manifestFilesFor({
        matematicas: [1, 2, 3, 4], // all excluded for matematicas
        lectura_critica: [1, 2, 3, 4],
        sociales_ciudadanas: [1, 2, 3, 4],
        ciencias_naturales: [1, 2, 3, 4],
        ingles: [1, 2, 3, 4],
      }),
    });
    await start(makeEnv(fetcher));
    for (const slug of fetcher.calls) {
      const s = subjectOfSlug(slug);
      const week = Number(slug.match(/week-(\d+)-/)![1]);
      expect(RANKED_EXCLUDED_WEEKS[s] || []).not.toContain(week);
    }
  });

  it("selects at most 2 questions per pack per area", async () => {
    const { data } = await start(
      makeEnv(recordingFetcher({ manifestFiles: manifestFilesFor(AREA_WEEKS) }))
    );
    const perPack: Record<string, number> = {};
    for (const q of data.questions) {
      const key = `${q.subject}:${weekOf(q.id)}`;
      perPack[key] = (perPack[key] || 0) + 1;
    }
    for (const [key, count] of Object.entries(perPack)) {
      expect(count, `${key} selected ${count} times`).toBeLessThanOrEqual(2);
    }
  });

  it("drops question ids flagged by isRankedExcluded", async () => {
    const fetcher = recordingFetcher({
      manifestFiles: manifestFilesFor(AREA_WEEKS),
      makeQuestions: (slug, week, subject) => {
        const qs = defaultQuestions(slug, week, subject);
        if (subject === "ingles") qs[0] = { ...qs[0], id: EXCLUDED_INGLES_ID };
        return qs;
      },
    });
    const { data } = await start(makeEnv(fetcher));
    expect(data.questions.map((q: any) => q.id)).not.toContain(EXCLUDED_INGLES_ID);
  });

  it("never selects two questions with the same normalized statement", async () => {
    const fetcher = recordingFetcher({
      manifestFiles: manifestFilesFor(AREA_WEEKS),
      makeQuestions: (slug, week, subject) => {
        if (week === AREA_WEEKS[subject][0]) {
          // The first week of every area has exactly two valid questions and
          // they are the same statement up to case/whitespace. Both would be
          // selected if dedup were missing.
          return [0, 1].map((i) => ({
            id: `${slug}-dup${i}`,
            statement: i === 0 ? "Shared statement 42" : "shared   STATEMENT 42",
            options: [
              { text: "Right", is_correct: true, feedback: "Because right." },
              { text: "W1", feedback: "no" },
              { text: "W2", feedback: "no" },
              { text: "W3", feedback: "no" },
            ],
            explanation: "Explanation text.",
          }));
        }
        return defaultQuestions(slug, week, subject);
      },
    });
    const { res, data } = await start(makeEnv(fetcher));
    expect(res.status).toBe(200);
    const norms = data.questions.map((q: any) =>
      normalizeStatementForDedup(q.statement)
    );
    expect(new Set(norms).size).toBe(norms.length);
  });
});
