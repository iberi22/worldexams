import type { Env } from "./index";
import {
  json,
  getCountryPackPrefixes,
  getSubjectPackAliases,
  normalizePackQuestion,
} from "./index";

const MIN_ANSWERED = 31;
const MIN_SECONDS_PER_ANSWER = 4;
// Per-isolate cache of validated area pools (packs are static between deploys).
const POOL_CACHE_TTL_MS = 10 * 60 * 1000;
const poolCache = new Map<string, { at: number; questions: any[] }>();

const PLACEHOLDER_RE = /Pregunta de prueba \d+|Explicaci[oó]n detallada de la pregunta/i;
const RANKED_SESSION_TTL_S = 90 * 60; // 90 min

// Mulberry32 PRNG
export function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(array: T[], prng: () => number) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Test helper: clears the per-isolate pool cache. */
export function __clearRankedPoolCache() {
  poolCache.clear();
}

export async function routeRanked(
  request: Request,
  env: Env
): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/v1/ranked/") && url.pathname !== "/v1/leaderboard") {
    return null;
  }

  if (!env.RANKED_DB) {
    return json({ error: "RANKED_UNAVAILABLE" }, 503, {}, request);
  }
  const db = env.RANKED_DB;

  if (url.pathname === "/v1/ranked/submit" && request.method === "POST") {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return json({ error: "INVALID_JSON" }, 400, {}, request);
    }

    const { sessionId, answers, integrity } = body;
    if (!sessionId || !Array.isArray(answers) || !integrity) {
      return json({ error: "INVALID_BODY" }, 400, {}, request);
    }

    const sessionRes = await db
      .prepare(
        "SELECT * FROM ranked_sessions WHERE id = ?"
      )
      .bind(sessionId)
      .first();

    if (!sessionRes) {
      return json({ error: "NOT_FOUND" }, 404, {}, request);
    }

    if (sessionRes.submitted_at) {
      return json({ error: "ALREADY_SUBMITTED" }, 409, {}, request);
    }

    const now = Math.floor(Date.now() / 1000);
    if (now > (sessionRes.expires_at as number)) {
      return json({ error: "EXPIRED" }, 400, {}, request);
    }

    const answerKey = JSON.parse(sessionRes.answer_key as string);
    const questionIds = JSON.parse(sessionRes.question_ids as string);

    let correct = 0;
    let answered = 0;
    let msTotal = 0;
    const msArray: number[] = [];
    const review: any[] = [];
    const processedQuestionIds = new Set<string>();

    const sessionQuestionIds = new Set<string>(questionIds);
    for (const answer of answers) {
      // Only answers to THIS session's questions count (prevents padding with fake ids).
      if (!answer || typeof answer.letter !== "string" || !answer.letter) continue;
      if (!sessionQuestionIds.has(answer.questionId) || processedQuestionIds.has(answer.questionId)) continue;
      processedQuestionIds.add(answer.questionId);

      answered++;
      const ms = typeof answer.ms === "number" ? answer.ms : 0;
      msArray.push(ms);

      const keyEntry = answerKey.find((k: any) => k.questionId === answer.questionId);
      if (keyEntry) {
        if (keyEntry.correctLetter === answer.letter) {
          correct++;
        }
      }
    }

    // Build review for all questions in this session
    for (const keyEntry of answerKey) {
      review.push({
        questionId: keyEntry.questionId,
        correctLetter: keyEntry.correctLetter,
        feedback: keyEntry.feedback,
        explanation: keyEntry.explanation,
      });
    }

    let status = "valid";
    if (answered < MIN_ANSWERED) {
      status = "not_eligible_min_questions";
    } else {
      const { tabSwitches = 0, focusLoss = 0, fullscreenExits = 0, copyPaste = 0, devtools = 0 } = integrity;
      if (tabSwitches > 2 || fullscreenExits > 2 || copyPaste > 0 || devtools > 0) {
        status = "flagged";
      } else {
        msArray.sort((a, b) => a - b);
        const medianMs = msArray.length > 0 ? (msArray.length % 2 !== 0 ? msArray[Math.floor(msArray.length / 2)] : (msArray[msArray.length / 2 - 1] + msArray[msArray.length / 2]) / 2) : 0;
        // Server-side wall clock: client-reported ms can be forged.
        const elapsedS = now - Number(sessionRes.created_at);
        if (medianMs < 4000 || elapsedS < answered * MIN_SECONDS_PER_ANSWER) {
          status = "flagged";
        }
      }
    }

    const score = Math.round(1000 * correct / 40);
    const season = new Date().toISOString().substring(0, 7); // YYYY-MM

    await db
      .prepare("UPDATE ranked_sessions SET submitted_at = ? WHERE id = ?")
      .bind(now, sessionId)
      .run();

    await db
      .prepare(
        `INSERT INTO ranked_results (session_id, device_id, nickname, season, score, correct, answered, status, integrity, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        sessionId,
        sessionRes.device_id,
        sessionRes.nickname,
        season,
        score,
        correct,
        answered,
        status,
        JSON.stringify(integrity),
        now
      )
      .run();

    return json(
      {
        status,
        score,
        correct,
        answered,
        total: 40,
        review,
      },
      200,
      {},
      request
    );
  }

  if (url.pathname === "/v1/ranked/start" && request.method === "POST") {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return json({ error: "INVALID_JSON" }, 400, {}, request);
    }

    const { deviceId, nickname, country = "co", grade = 11 } = body;
    if (
      typeof deviceId !== "string" ||
      !/^[A-Za-z0-9_-]{8,64}$/.test(deviceId)
    ) {
      return json({ error: "INVALID_DEVICE_ID" }, 400, {}, request);
    }
    if (
      typeof nickname !== "string" ||
      !/^[\p{L}\p{N} _-]{3,20}$/u.test(nickname.trim())
    ) {
      return json({ error: "INVALID_NICKNAME" }, 400, {}, request);
    }

    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const ipHash = await sha256(ip);

    // Rate limits
    const now = Math.floor(Date.now() / 1000);
    const todayStart = Math.floor(
      new Date(new Date().toISOString().split("T")[0] + "T00:00:00Z").getTime() /
        1000
    );

    const deviceCountRes = await db
      .prepare(
        "SELECT COUNT(*) as c FROM ranked_sessions WHERE device_id = ? AND created_at >= ?"
      )
      .bind(deviceId, todayStart)
      .first("c");
    const deviceCount = Number(deviceCountRes) || 0;
    if (deviceCount >= 5) {
      return json({ error: "RATE_LIMITED", message: "Max starts per device exceeded." }, 429, {}, request);
    }

    const ipCountRes = await db
      .prepare(
        "SELECT COUNT(*) as c FROM ranked_sessions WHERE ip_hash = ? AND created_at >= ?"
      )
      .bind(ipHash, todayStart)
      .first("c");
    const ipCount = Number(ipCountRes) || 0;
    if (ipCount >= 30) {
      return json({ error: "RATE_LIMITED", message: "Max starts per IP exceeded." }, 429, {}, request);
    }

    // Sample questions
    const seed = Math.floor(Math.random() * 2147483647);
    const prng = mulberry32(seed);

    const areas = [
      "matematicas",
      "lectura_critica",
      "sociales_ciudadanas",
      "ciencias_naturales",
      "ingles",
    ];
    let allCandidates: any[] = [];
    const areaPools: Record<string, any[]> = {};

    const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

    for (const area of areas) {
      areaPools[area] = [];
      const aliases = getSubjectPackAliases(area);
      const prefixes = getCountryPackPrefixes(country);

      const cacheKey = `${country}|${grade}|${area}`;
      const cached = poolCache.get(cacheKey);
      if (cached && Date.now() - cached.at < POOL_CACHE_TTL_MS) {
        areaPools[area] = [...cached.questions];
        shuffle(areaPools[area], prng);
        continue;
      }
      const seenIds = new Set<string>();
      for (const week of weeks) {
        // Alias packs (ing/english/ingles, ...) are byte-identical copies: take the
        // FIRST existing pack per week (canonical alias + ISO prefix first).
        const weekCandidates: string[] = [];
        for (const subjectAlias of aliases) {
          for (const prefix of prefixes) {
            weekCandidates.push(`/v1/packs/${prefix}-week-${week}-grade-${grade}-subject-${subjectAlias}.json`);
          }
        }
        for (const path of weekCandidates) {
          try {
            const res = await env.ASSETS.fetch(new Request(new URL(path, request.url).toString(), { method: "GET" }));
            if (!res.ok) continue;
            const pack = await res.json<any>();
            if (!Array.isArray(pack?.questions) || pack.questions.length === 0) continue;
            for (const q of pack.questions) {
              const id = String(q?.id || "");
              if (!id || seenIds.has(id)) continue;
              const correctCount = (q.options || []).filter((o: any) => o?.is_correct).length;
              const text = `${q.statement || ""} ${q.explanation || ""}`;
              if ((q.options || []).length !== 4 || correctCount !== 1 || PLACEHOLDER_RE.test(text)) continue;
              seenIds.add(id);
              areaPools[area].push({ ...q, subject: area });
            }
            break;
          } catch {
            continue;
          }
        }
      }

      poolCache.set(cacheKey, { at: Date.now(), questions: [...areaPools[area]] });
      shuffle(areaPools[area], prng);
    }

    const selectedQuestions: any[] = [];
    const areaCounts: Record<string, number> = {};

    for (const area of areas) {
      areaCounts[area] = 0;
      const target = 8;
      const pool = areaPools[area];
      while (pool.length > 0 && areaCounts[area] < target) {
        selectedQuestions.push(pool.pop());
        areaCounts[area]++;
      }
    }

    let deficit = 40 - selectedQuestions.length;
    if (deficit > 0) {
      const remainder = Object.values(areaPools).flat();
      shuffle(remainder, prng);
      for (let i = 0; i < deficit && i < remainder.length; i++) {
        const q = remainder[i];
        selectedQuestions.push(q);
        areaCounts[q.subject] = (areaCounts[q.subject] || 0) + 1;
      }
    }

    shuffle(selectedQuestions, prng);
    const finalQuestions = selectedQuestions.slice(0, 40);

    const answerKey: any[] = [];
    const clientQuestions = finalQuestions.map((q) => {
      const norm = normalizePackQuestion(q);
      const options = norm.options || [];
      const shuffledOptions = [...options];
      shuffle(shuffledOptions, prng);

      const letteredOptions = shuffledOptions.map((opt, i) => {
        const letter = String.fromCharCode(65 + i); // A, B, C, D
        if (opt.is_correct) {
          answerKey.push({
            questionId: norm.id,
            correctLetter: letter,
            feedback: opt.feedback || "",
            explanation: norm.explanation || "",
          });
        }
        return { letter, text: opt.text };
      });


      return {
        id: norm.id,
        subject: norm.subject,
        statement: norm.statement,
        context: norm.context,
        options: letteredOptions,
      };
    });

    const sessionId = await sha256(`${deviceId}:${now}:${seed}`);
    const expiresAt = now + RANKED_SESSION_TTL_S;

    await db
      .prepare(
        `INSERT INTO ranked_sessions (id, device_id, nickname, ip_hash, seed, question_ids, answer_key, created_at, expires_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        sessionId,
        deviceId,
        nickname,
        ipHash,
        seed,
        JSON.stringify(clientQuestions.map((q) => q.id)),
        JSON.stringify(answerKey),
        now,
        expiresAt
      )
      .run();

    return json(
      {
        sessionId,
        seed,
        expiresAt,
        questions: clientQuestions,
        meta: { area_counts: areaCounts },
      },
      200,
      {},
      request
    );
  }

  if (url.pathname === "/v1/leaderboard" && request.method === "GET") {
    let season = url.searchParams.get("season");
    if (!season || !/^\d{4}-\d{2}$/.test(season)) {
      const now = new Date();
      season = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
    }

    let limit = parseInt(url.searchParams.get("limit") || "50", 10);
    if (isNaN(limit) || limit < 1) limit = 50;
    if (limit > 100) limit = 100;

    const avgRes = await db
      .prepare("SELECT AVG(score) as avgScore FROM ranked_results WHERE season = ? AND status = 'valid'")
      .bind(season)
      .first("avgScore");
    const average = avgRes !== null ? Number(avgRes) : 0;

    const query = `
      SELECT device_id, nickname, MAX(score) as score, correct, answered, created_at
      FROM ranked_results
      WHERE season = ? AND status = 'valid' AND score >= ?
      GROUP BY device_id
      ORDER BY score DESC, created_at ASC
      LIMIT ?
    `;

    const { results } = await db.prepare(query).bind(season, average, limit).all();

    const entries = (results || []).map((row: any, index: number) => ({
      rank: index + 1,
      nickname: row.nickname,
      score: row.score,
      correct: row.correct,
      answered: row.answered,
      createdAt: row.created_at,
    }));

    return json(
      {
        season,
        average,
        entries,
      },
      200,
      {
        "Cache-Control": "public, max-age=60",
      },
      request
    );
  }

  return null;
}
