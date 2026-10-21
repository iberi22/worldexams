import type { Env } from "./index";
import {
  json,
  getCountryPackPrefixes,
  getSubjectPackAliases,
  normalizePackQuestion,
  getPackManifest,
  loadPackQuestions,
  resolveWeekPackNames,
  __resetPackCaches,
} from "./index";
import {
  RANKED_EXCLUDED_WEEKS,
  isRankedExcluded,
} from "./ranked-exclusions";

const MIN_ANSWERED = 31;
const MIN_SECONDS_PER_ANSWER = 4;
// Ranked sampling budget: packs loaded per area (each is one subrequest).
// 4 packs x 5 areas = 20 subrequests, inside the Workers limit.
const RANKED_PACKS_PER_AREA = 4;
// Diversity: at most this many questions per pack for the area's quota, so a
// session spans 4 distinct weeks instead of ~2.
const RANKED_QUESTIONS_PER_PACK = 2;
const RANKED_AREA_TARGET = 8;

const PLACEHOLDER_RE = /Pregunta de prueba \d+|Explicaci[oó]n detallada de la pregunta/i;

// The exam clock is 60 minutes on the client; the server keeps a short grace
// window so a submit that arrives at the buzzer still lands. The stored
// `expires_at` is duration + grace.
export const RANKED_EXAM_DURATION_S = 60 * 60;
export const RANKED_SUBMIT_GRACE_S = 120;
const RANKED_SESSION_TTL_S = RANKED_EXAM_DURATION_S + RANKED_SUBMIT_GRACE_S;

// A classroom behind NAT can share one public IP, so the per-IP daily cap must
// stay high enough not to block real students; the per-device cap (5/day) is
// what actually limits one student.
export const RANKED_MAX_STARTS_PER_IP_DAY = 200;
const RANKED_MAX_STARTS_PER_DEVICE_DAY = 5;

// Unresolved template placeholder: `{city}`, `{student_name}`. LaTeX groups
// such as `\frac{a}{b}`, `\text{cal}`, `x^{2}`, `\sqrt{x-3}` and `_{i}`
// are NOT placeholders, so the detector must not fire on them.
const UNRESOLVED_PLACEHOLDER_RE = /\{[a-z_]{3,}\}/g;
const LATEX_COMMAND_TAIL_RE = /\\[a-zA-Z]+$/;

/**
 * True when `text` contains an unresolved `{word}` template placeholder.
 *
 * LaTeX groups are excluded: a group preceded by a LaTeX command (`\frac{`,
 * `\text{`, `\mathrm{`), by `^`/`_` (superscripts/subscripts) or by `}` is
 * math, not a template. Only lowercase groups of 3+ chars count, which keeps
 * `{a}` and `{b}` (common in formulas) out of the detector.
 */
export function hasUnresolvedPlaceholder(text: unknown): boolean {
  if (typeof text !== "string" || text.length === 0) return false;
  UNRESOLVED_PLACEHOLDER_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = UNRESOLVED_PLACEHOLDER_RE.exec(text)) !== null) {
    const start = match.index;
    if (LATEX_COMMAND_TAIL_RE.test(text.slice(0, start))) continue;
    const prev = start > 0 ? text[start - 1] : "";
    if (prev === "^" || prev === "_" || prev === "}") continue;
    return true;
  }
  return false;
}

/**
 * Normalizes a statement for dedup: lowercase, collapse whitespace, digits to
 * `#` and `$...$` math groups to a single token. Two questions that only differ
 * in casing, spacing, numbers or math content are treated as the same question.
 */
export function normalizeStatementForDedup(text: unknown): string {
  return String(text || "")
    .toLowerCase()
    .replace(/\$[^$]*\$/g, " $MATH$ ")
    .replace(/\d+/g, "#")
    .replace(/\s+/g, " ")
    .trim();
}

/** True when any user-visible field of a pack question has an unresolved placeholder. */
export function questionHasUnresolvedPlaceholder(question: any): boolean {
  if (!question) return false;
  if (hasUnresolvedPlaceholder(question.statement)) return true;
  if (hasUnresolvedPlaceholder(question.context)) return true;
  if (hasUnresolvedPlaceholder(question.explanation)) return true;
  for (const option of question.options || []) {
    if (hasUnresolvedPlaceholder(option?.text)) return true;
    if (hasUnresolvedPlaceholder(option?.feedback)) return true;
  }
  return false;
}

// Colombia runs on a fixed UTC-5 with no DST. Deriving the season from a UTC
// clock would file the 23:00-04:59 local window into the wrong month.
const COLOMBIA_UTC_OFFSET_S = -5 * 60 * 60;

/** Season (`YYYY-MM`) for an epoch-second timestamp, in Colombia local time. */
export function seasonFor(epochSeconds: number): string {
  const shifted = new Date((epochSeconds + COLOMBIA_UTC_OFFSET_S) * 1000);
  return `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, "0")}`;
}

// Mulberry32 PRNG
export function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Random hex string of `bytes` bytes (crypto.getRandomValues, Workers-safe). */
function randomHex(bytes: number): string {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (b) => b.toString(16).padStart(2, "0")).join("");
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
  __resetPackCaches();
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
    // A ranked exam is 40 questions; a larger payload is a forged request.
    if (answers.length > 80) {
      return json({ error: "TOO_MANY_ANSWERS" }, 400, {}, request);
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
    // Deadline = creation + exam duration + grace. Using created_at (not the
    // stored expires_at) keeps the rule independent of the column's value.
    if (
      now >
      Number(sessionRes.created_at) + RANKED_EXAM_DURATION_S + RANKED_SUBMIT_GRACE_S
    ) {
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
        // Sessions created before optionFeedback existed have no such field;
        // the client must still receive a well-formed array.
        optionFeedback: Array.isArray(keyEntry.optionFeedback)
          ? keyEntry.optionFeedback
          : [],
      });
    }

    // Integrity: the client counters are the primary signal, the server clock
    // is the only signal that cannot be forged, and the client median is a
    // secondary bot signal (hence the stricter 1500 ms threshold).
    const { tabSwitches = 0, focusLoss = 0, fullscreenExits = 0, copyPaste = 0, devtools = 0 } = integrity;
    msArray.sort((a, b) => a - b);
    const medianMs =
      msArray.length > 0
        ? msArray.length % 2 !== 0
          ? msArray[Math.floor(msArray.length / 2)]
          : (msArray[msArray.length / 2 - 1] + msArray[msArray.length / 2]) / 2
        : 0;
    // Server-side wall clock: client-reported ms can be forged.
    const elapsedS = now - Number(sessionRes.created_at);

    let status = "valid";
    let reason: string | null = null;
    if (answered < MIN_ANSWERED) {
      status = "not_eligible_min_questions";
    } else if (tabSwitches > 2) {
      status = "flagged";
      reason = "tab_switches";
    } else if (fullscreenExits > 2) {
      status = "flagged";
      reason = "fullscreen_exits";
    } else if (copyPaste > 0) {
      status = "flagged";
      reason = "copy_paste";
    } else if (devtools > 0) {
      status = "flagged";
      reason = "devtools";
    } else if (elapsedS < answered * MIN_SECONDS_PER_ANSWER) {
      status = "flagged";
      reason = "server_too_fast";
    } else if (medianMs < 1500) {
      status = "flagged";
      reason = "client_median_too_fast";
    }

    const score = Math.round(1000 * correct / 40);
    const season = seasonFor(now);

    // Atomic claim: only one submit can win the `submitted_at IS NULL` race.
    // A check-then-write here let two concurrent submits both insert a result.
    const updateResult = await db
      .prepare(
        "UPDATE ranked_sessions SET submitted_at = ? WHERE id = ? AND submitted_at IS NULL"
      )
      .bind(now, sessionId)
      .run();
    const changes = Number((updateResult as any)?.meta?.changes ?? 0);
    if (changes !== 1) {
      return json({ error: "ALREADY_SUBMITTED" }, 409, {}, request);
    }

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
        JSON.stringify({ ...integrity, reason }),
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
        ...(status === "flagged" && reason ? { flagReason: reason } : {}),
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
    if (deviceCount >= RANKED_MAX_STARTS_PER_DEVICE_DAY) {
      return json({ error: "RATE_LIMITED", message: "Max starts per device exceeded." }, 429, {}, request);
    }

    const ipCountRes = await db
      .prepare(
        "SELECT COUNT(*) as c FROM ranked_sessions WHERE ip_hash = ? AND created_at >= ?"
      )
      .bind(ipHash, todayStart)
      .first("c");
    const ipCount = Number(ipCountRes) || 0;
    if (ipCount >= RANKED_MAX_STARTS_PER_IP_DAY) {
      return json({ error: "RATE_LIMITED", message: "Max starts per IP exceeded." }, 429, {}, request);
    }

    // Sample questions. The seed drives question selection, so it must come
    // from crypto rather than Math.random (predictable from the client).
    const seedBuffer = new Uint32Array(1);
    crypto.getRandomValues(seedBuffer);
    const seed = seedBuffer[0];
    const prng = mulberry32(seed);

    const areas = [
      "matematicas",
      "lectura_critica",
      "sociales_ciudadanas",
      "ciencias_naturales",
      "ingles",
    ];
    const areaPools: Record<string, any[]> = {};
    const selectedQuestions: any[] = [];
    const areaCounts: Record<string, number> = {};
    const selectedIds = new Set<string>();

    // Manifest-based sampling: pick a few random weeks per area and load only those
    // packs (every asset read is a subrequest; loading all 40 weeks × 5 areas
    // exceeded the Workers subrequest limit and left areas empty in production).
    const manifest = await getPackManifest(env, url.origin);
    const allWeeks = Array.from({ length: 40 }, (_, i) => i + 1);
    // Global statement dedup: a question already kept for one area is never
    // offered again, even if another area's pack repeats it.
    const seenStatements = new Set<string>();

    for (const area of areas) {
      areaPools[area] = [];
      areaCounts[area] = 0;
      const aliases = getSubjectPackAliases(area);
      const prefixes = getCountryPackPrefixes(country);
      // Weeks the exclusion list marks as not exam-ready are dropped before any
      // asset read, so they never cost a subrequest either.
      const excludedWeeks = RANKED_EXCLUDED_WEEKS[area] || [];
      const allowedWeeks = allWeeks.filter((week) => !excludedWeeks.includes(week));
      const weekPacks = allowedWeeks
        .map((week) => ({
          week,
          name: resolveWeekPackNames(manifest, prefixes, aliases, grade, week)[0],
        }))
        .filter(
          (entry): entry is { week: number; name: string } =>
            Boolean(entry.name) && (!manifest || manifest.has(entry.name))
        );
      shuffle(weekPacks, prng);

      const seenIds = new Set<string>();
      const perPack: Array<{ week: number; questions: any[] }> = [];
      for (const { week, name } of weekPacks.slice(0, RANKED_PACKS_PER_AREA)) {
        const packQuestions: any[] = [];
        for (const q of await loadPackQuestions(env, url.origin, name)) {
          const id = String(q?.id || "");
          if (!id || seenIds.has(id)) continue;
          if (isRankedExcluded(area, week, id)) continue;
          const correctCount = (q.options || []).filter((o: any) => o?.is_correct).length;
          const text = `${q.statement || ""} ${q.explanation || ""}`;
          if (
            (q.options || []).length !== 4 ||
            correctCount !== 1 ||
            PLACEHOLDER_RE.test(text) ||
            questionHasUnresolvedPlaceholder(q)
          ) continue;
          const statementKey = normalizeStatementForDedup(q.statement);
          if (seenStatements.has(statementKey)) continue;
          seenIds.add(id);
          seenStatements.add(statementKey);
          packQuestions.push({ ...q, subject: area, __packWeek: week });
        }
        perPack.push({ week, questions: packQuestions });
      }

      // First pass: at most RANKED_QUESTIONS_PER_PACK per pack, so the area's 8
      // questions come from 4 distinct weeks. If a pack yielded fewer valid
      // questions, top up from the same packs (diversity is a cap, not a floor).
      const chosen: any[] = [];
      const chosenIds = new Set<string>();
      for (const pack of perPack) {
        let taken = 0;
        for (const q of pack.questions) {
          if (chosen.length >= RANKED_AREA_TARGET || taken >= RANKED_QUESTIONS_PER_PACK) break;
          chosen.push(q);
          chosenIds.add(String(q.id));
          taken++;
        }
      }
      if (chosen.length < RANKED_AREA_TARGET) {
        for (const pack of perPack) {
          for (const q of pack.questions) {
            if (chosen.length >= RANKED_AREA_TARGET) break;
            const id = String(q.id);
            if (chosenIds.has(id)) continue;
            chosen.push(q);
            chosenIds.add(id);
          }
        }
      }

      for (const q of chosen) {
        selectedQuestions.push(q);
        selectedIds.add(String(q.id));
        areaCounts[area]++;
      }
      // Whatever was not chosen stays available for the global deficit filler.
      areaPools[area] = perPack
        .flatMap((pack) => pack.questions)
        .filter((q) => !chosenIds.has(String(q.id)));
    }

    let deficit = 40 - selectedQuestions.length;
    if (deficit > 0) {
      const remainder = Object.values(areaPools).flat();
      shuffle(remainder, prng);
      for (const q of remainder) {
        if (deficit <= 0) break;
        const id = String(q.id);
        if (selectedIds.has(id)) continue;
        selectedQuestions.push(q);
        selectedIds.add(id);
        areaCounts[q.subject] = (areaCounts[q.subject] || 0) + 1;
        deficit--;
      }
    }

    shuffle(selectedQuestions, prng);
    const finalQuestions = selectedQuestions.slice(0, 40);

    // Do not create a session the student cannot finish: a pool below the
    // minimum answered threshold would force a not_eligible result.
    if (finalQuestions.length < MIN_ANSWERED) {
      return json({ error: "POOL_INSUFFICIENT" }, 503, {}, request);
    }

    const answerKey: any[] = [];
    const clientQuestions = finalQuestions.map((q) => {
      const norm = normalizePackQuestion(q);
      const options = norm.options || [];
      const shuffledOptions = [...options];
      shuffle(shuffledOptions, prng);

      // The client only gets `{ letter, text }`. Shipping feedback here leaked
      // the correct option's explanation before the exam was submitted. The
      // four-option feedback travels in the answer key (stored in D1) and is
      // returned only by /submit, once the answers are locked in.
      const optionFeedback = shuffledOptions.map((opt, i) => ({
        letter: String.fromCharCode(65 + i), // A, B, C, D
        feedback: opt.feedback || "",
      }));

      const letteredOptions = shuffledOptions.map((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        if (opt.is_correct) {
          answerKey.push({
            questionId: norm.id,
            correctLetter: letter,
            feedback: opt.feedback || "",
            explanation: norm.explanation || "",
            optionFeedback,
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

    // 32 random bytes = 256 bits of hex. Deriving the id from raw randomness
    // keeps the seed out of the hash input entirely.
    const sessionId = randomHex(32);
    const expiresAt = now + RANKED_SESSION_TTL_S;

    await db
      .prepare(
        `INSERT INTO ranked_sessions (id, device_id, nickname, ip_hash, seed, question_ids, answer_key, created_at, expires_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        sessionId,
        deviceId,
        nickname.trim(),
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
        // ISO-8601 string (the client contract); DB keeps unix seconds.
        expiresAt: new Date(expiresAt * 1000).toISOString(),
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
      season = seasonFor(Math.floor(Date.now() / 1000));
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
      createdAt: Number.isFinite(Number(row.created_at)) ? new Date(Number(row.created_at) * 1000).toISOString() : null,
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
