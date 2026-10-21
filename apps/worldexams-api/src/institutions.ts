// Institutions panel API v1: teachers (magic link), groups, students (no
// account), assignments and results. Shared contract with the teacher panel
// and the student client: docs/institutions/CONTRACT.md. Response shapes are
// fixed by that document.

import type { Env } from "./index";
import { json } from "./index";
import { isValidNickname } from "./ranked";
import { buildMagicLinkEmail, createEmailSender } from "./email";
import {
  INST_LOGIN_TOKEN_TTL_S,
  INST_STUDENT_SESSION_TTL_S,
  INST_TEACHER_SESSION_TTL_S,
  bearerToken,
  isJoinCode,
  isTokenShape,
  newJoinCode,
  newToken,
  randomHex,
  sha256Hex,
  timingSafeEqual,
} from "./institutions-auth";

export interface InstEnv extends Env {
  /** Cloudflare Email Sending binding (`send_email` in wrangler.toml). */
  EMAIL?: SendEmail;
  /** Origin of the web app that hosts `/institucion/entrar`. */
  SITE_ORIGIN?: string;
  INST_EMAIL_FROM?: string;
  /** "1" only in local dev and tests: `/auth/request` returns `devToken`. */
  INST_DEV_LOGIN?: string;
}

export type InstPlan = "free" | "school" | "district";

/** Per-institution limits. `null` means unlimited. No billing in v1. */
export const PLAN_LIMITS: Record<
  InstPlan,
  { groups: number | null; students: number | null; activeAssignments: number | null }
> = {
  free: { groups: 2, students: 60, activeAssignments: 10 },
  school: { groups: 30, students: 1500, activeAssignments: null },
  district: { groups: null, students: null, activeAssignments: null },
};

export const INST_LOGIN_REQUESTS_PER_HOUR = 5;
export const INST_RESULTS_PER_STUDENT_DAY = 60;
/** Cap on rows returned by the results endpoints (JSON adds `truncated`). */
export const INST_RESULTS_MAX_ROWS = 10_000;

const DEFAULT_SITE_ORIGIN = "https://saberparatodos.space";
const MAX_BODY_BYTES = 16 * 1024;
const ID_RE = /^[0-9a-f]{32}$/;
const ANONYMOUS_ID_RE = /^[A-Za-z0-9_-]{8,64}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBJECT_RE = /^[a-z0-9_-]{2,40}$/;
const AREA_KEY_RE = /^[\p{L}\p{N} _-]{1,40}$/u;
// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\u0000-\u001f\u007f]/;
const SOURCES = ["assignment", "practice", "neurogym"] as const;
export const INST_COUNTRIES = [
  "co", "mx", "ar", "br", "cl", "pe", "ec", "pa", "cr", "gt",
  "do", "sv", "hn", "ni", "es", "pr", "gq", "uy", "py", "bo",
];
const MIN_GRADE = 1;
const MAX_GRADE = 12;
// Bound on the bind parameter used for "unlimited" in conditional inserts.
const UNLIMITED = Number.MAX_SAFE_INTEGER;

type Row = Record<string, any>;

interface TeacherCtx {
  sessionHash: string;
  teacher: Row;
  institution: Row | null;
}

interface StudentCtx {
  sessionHash: string;
  student: Row;
  group: Row;
  institution: Row;
}

// ---------------------------------------------------------------------------
// Small helpers

const nowS = () => Math.floor(Date.now() / 1000);
const newId = () => randomHex(16);

function iso(seconds: unknown): string | null {
  if (seconds === null || seconds === undefined) return null;
  const n = Number(seconds);
  return Number.isFinite(n) ? new Date(n * 1000).toISOString() : null;
}

function fail(
  request: Request,
  status: number,
  error: string,
  message?: string,
  extra: Record<string, unknown> = {}
): Response {
  return json({ error, ...(message ? { message } : {}), ...extra }, status, { "Cache-Control": "no-store" }, request);
}

function ok(request: Request, body: Record<string, unknown>, status = 200): Response {
  return json(body, status, { "Cache-Control": "no-store" }, request);
}

function noContent(): Response {
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}

function changesOf(result: unknown): number {
  return Number((result as any)?.meta?.changes ?? 0);
}

function isUniqueViolation(error: unknown): boolean {
  return /UNIQUE constraint failed/i.test(String((error as any)?.message ?? error));
}

async function readJson(request: Request): Promise<Row | Response> {
  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    return fail(request, 400, "BODY_TOO_LARGE");
  }
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return fail(request, 400, "INVALID_JSON");
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return fail(request, 400, "INVALID_BODY", "Body must be a JSON object.");
  }
  return body as Row;
}

/** Trimmed string within [min, max] code points without control chars, else null. */
function text(value: unknown, min: number, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  const length = Array.from(trimmed).length;
  if (length < min || length > max || CONTROL_RE.test(trimmed)) return null;
  return trimmed;
}

function integer(value: unknown, min: number, max: number): number | null {
  if (typeof value !== "number" || !Number.isInteger(value) || value < min || value > max) return null;
  return value;
}

function country(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const code = value.trim().toLowerCase();
  return INST_COUNTRIES.includes(code) ? code : null;
}

/** `undefined`/`null` -> null subject; otherwise a lowercase slug or `false` (invalid). */
function subject(value: unknown): string | null | false {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string") return false;
  const slug = value.trim().toLowerCase();
  return SUBJECT_RE.test(slug) ? slug : false;
}

function planOf(institution: Row | null): InstPlan {
  const plan = institution?.plan;
  return plan === "school" || plan === "district" ? plan : "free";
}

function limitBind(limit: number | null): number {
  return limit === null ? UNLIMITED : limit;
}

function planLimitError(request: Request, plan: InstPlan, resource: keyof (typeof PLAN_LIMITS)["free"]) {
  return fail(request, 409, "PLAN_LIMIT", `The ${plan} plan allows ${PLAN_LIMITS[plan][resource]} ${resource}.`, {
    limit: PLAN_LIMITS[plan][resource],
    plan,
    resource,
  });
}

function utcDayStart(seconds: number): number {
  return seconds - (seconds % 86_400);
}

function pctOf(correct: number, total: number): number {
  return total > 0 ? Math.round((1000 * correct) / total) / 10 : 0;
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

// ---------------------------------------------------------------------------
// Serializers (contract shapes)

function toInstitution(row: Row | null) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    city: row.city,
    plan: planOf(row),
    createdAt: iso(row.created_at),
  };
}

function toTeacher(row: Row) {
  return { id: row.id, email: row.email, name: row.name ?? "", role: row.role === "owner" ? "owner" : "teacher" };
}

function toGroup(row: Row) {
  return {
    id: row.id,
    institutionId: row.institution_id,
    teacherId: row.teacher_id,
    name: row.name,
    grade: Number(row.grade),
    joinCode: row.join_code,
    archived: Number(row.archived) === 1,
    createdAt: iso(row.created_at),
    studentCount: Number(row.student_count ?? 0),
    assignmentCount: Number(row.assignment_count ?? 0),
  };
}

function toAssignment(row: Row) {
  return {
    id: row.id,
    groupId: row.group_id,
    title: row.title,
    country: row.country,
    grade: Number(row.grade),
    subject: row.subject ?? null,
    questionCount: Number(row.question_count),
    dueAt: iso(row.due_at),
    createdAt: iso(row.created_at),
  };
}

// ---------------------------------------------------------------------------
// CSV

/**
 * One CSV cell. Cells that a spreadsheet would read as a formula (`=`, `+`,
 * `-`, `@`, and tab/CR which some apps also evaluate) get a leading `'`.
 * Cells with separators, quotes or line breaks are quoted.
 */
export function csvCell(value: unknown): string {
  let cell = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(cell)) cell = `'${cell}`;
  if (/[",\r\n]/.test(cell)) cell = `"${cell.replace(/"/g, '""')}"`;
  return cell;
}

export const RESULTS_CSV_COLUMNS = [
  "nickname",
  "student_code",
  "source",
  "subject",
  "total",
  "correct",
  "pct",
  "duration_s",
  "created_at_iso",
];

// ---------------------------------------------------------------------------
// Sessions

async function createSession(db: D1Database, subjectType: "teacher" | "student", subjectId: string) {
  const token = newToken();
  const now = nowS();
  const ttl = subjectType === "teacher" ? INST_TEACHER_SESSION_TTL_S : INST_STUDENT_SESSION_TTL_S;
  await db.batch([
    // Opportunistic cleanup keeps the table bounded per subject.
    db
      .prepare("DELETE FROM inst_sessions WHERE subject_type = ? AND subject_id = ? AND expires_at <= ?")
      .bind(subjectType, subjectId, now),
    db
      .prepare("INSERT INTO inst_sessions (token_hash, subject_type, subject_id, expires_at) VALUES (?, ?, ?, ?)")
      .bind(await sha256Hex(token), subjectType, subjectId, now + ttl),
  ]);
  return token;
}

/** Session row for the bearer token when it is live and of `subjectType`. */
async function loadSession(db: D1Database, request: Request, subjectType: "teacher" | "student") {
  const token = bearerToken(request);
  if (!token) return null;
  const hash = await sha256Hex(token);
  const row = await db
    .prepare("SELECT token_hash, subject_type, subject_id, expires_at FROM inst_sessions WHERE token_hash = ?")
    .bind(hash)
    .first<Row>();
  if (!row || !timingSafeEqual(String(row.token_hash), hash)) return null;
  // Teacher and student sessions are never interchangeable.
  if (row.subject_type !== subjectType) return null;
  if (Number(row.expires_at) <= nowS()) return null;
  return row;
}

async function loadTeacherCtx(db: D1Database, request: Request): Promise<TeacherCtx | null> {
  const session = await loadSession(db, request, "teacher");
  if (!session) return null;
  const teacher = await db.prepare("SELECT * FROM teachers WHERE id = ?").bind(session.subject_id).first<Row>();
  if (!teacher) return null;
  const institution = teacher.institution_id
    ? await db.prepare("SELECT * FROM institutions WHERE id = ?").bind(teacher.institution_id).first<Row>()
    : null;
  return { sessionHash: String(session.token_hash), teacher, institution: institution ?? null };
}

async function loadStudentCtx(db: D1Database, request: Request): Promise<StudentCtx | null> {
  const session = await loadSession(db, request, "student");
  if (!session) return null;
  const row = await db
    .prepare(
      `SELECT s.id AS s_id, s.nickname AS s_nickname, s.student_code AS s_student_code,
              g.id AS g_id, g.name AS g_name, g.grade AS g_grade, g.institution_id AS g_institution_id,
              i.name AS i_name, i.country AS i_country
         FROM students s
         JOIN groups g ON g.id = s.group_id
         JOIN institutions i ON i.id = g.institution_id
        WHERE s.id = ?`
    )
    .bind(session.subject_id)
    .first<Row>();
  if (!row) return null;
  return {
    sessionHash: String(session.token_hash),
    student: { id: row.s_id, nickname: row.s_nickname, student_code: row.s_student_code },
    group: { id: row.g_id, name: row.g_name, grade: Number(row.g_grade), institution_id: row.g_institution_id },
    institution: { name: row.i_name, country: row.i_country },
  };
}

/**
 * Group the teacher may act on, or an error response. Owners reach every
 * group of their institution; plain teachers only the groups they created.
 */
async function loadOwnedGroup(db: D1Database, request: Request, ctx: TeacherCtx, groupId: string) {
  if (!ID_RE.test(groupId)) return fail(request, 404, "NOT_FOUND");
  const group = await db.prepare("SELECT * FROM groups WHERE id = ?").bind(groupId).first<Row>();
  if (!group) return fail(request, 404, "NOT_FOUND");
  const institutionId = ctx.teacher.institution_id;
  if (!institutionId || group.institution_id !== institutionId) return fail(request, 403, "FORBIDDEN");
  if (ctx.teacher.role !== "owner" && group.teacher_id !== ctx.teacher.id) return fail(request, 403, "FORBIDDEN");
  return group;
}

// ---------------------------------------------------------------------------
// Router

export async function routeInstitutions(request: Request, env: InstEnv): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.slice("/v1/inst".length);
  const method = request.method;

  if (!env.RANKED_DB) return fail(request, 503, "INST_UNAVAILABLE");
  const db = env.RANKED_DB;

  // --- Teacher auth (no session) ---
  if (path === "/auth/request" && method === "POST") return authRequest(request, env, db);
  if (path === "/auth/verify" && method === "POST") return authVerify(request, db);

  // --- Student (no account) ---
  if (path === "/join" && method === "POST") return studentJoin(request, db);
  if (path.startsWith("/student/")) {
    const ctx = await loadStudentCtx(db, request);
    if (!ctx) return fail(request, 401, "UNAUTHORIZED");
    if (path === "/student/me" && method === "GET") {
      return ok(request, {
        student: { id: ctx.student.id, nickname: ctx.student.nickname },
        group: { id: ctx.group.id, name: ctx.group.name, grade: ctx.group.grade },
        institution: ctx.institution,
      });
    }
    if (path === "/student/assignments" && method === "GET") return studentAssignments(request, db, ctx);
    if (path === "/student/results" && method === "POST") return studentResult(request, db, ctx);
    if (path === "/student/leave" && method === "POST") {
      await deleteStudent(db, ctx.student.id);
      return noContent();
    }
    return fail(request, 404, "NOT_FOUND");
  }

  // --- Everything else needs a teacher session ---
  const known =
    path === "/me" ||
    path === "/auth/logout" ||
    path === "/institutions" ||
    path === "/groups" ||
    path.startsWith("/groups/");
  if (!known) return fail(request, 404, "NOT_FOUND");

  const ctx = await loadTeacherCtx(db, request);
  if (!ctx) return fail(request, 401, "UNAUTHORIZED");

  if (path === "/me" && method === "GET") {
    return ok(request, { teacher: toTeacher(ctx.teacher), institution: toInstitution(ctx.institution) });
  }
  if (path === "/me" && method === "PATCH") return patchMe(request, db, ctx);
  if (path === "/auth/logout" && method === "POST") {
    await db.prepare("DELETE FROM inst_sessions WHERE token_hash = ?").bind(ctx.sessionHash).run();
    return noContent();
  }
  if (path === "/institutions" && method === "POST") return createInstitution(request, db, ctx);
  if (path === "/groups" && method === "POST") return createGroup(request, db, ctx);
  if (path === "/groups" && method === "GET") return listGroups(request, db, ctx);

  const match = path.match(/^\/groups\/([^/]+)\/(students|assignments|results|results\.csv)(?:\/([^/]+))?$/);
  if (!match) return fail(request, 404, "NOT_FOUND");
  const [, groupId, resource, subId] = match;
  const group = await loadOwnedGroup(db, request, ctx, groupId);
  if (group instanceof Response) return group;

  if (resource === "students" && !subId && method === "GET") return listStudents(request, db, group);
  if (resource === "students" && subId && method === "PATCH") return patchStudent(request, db, group, subId);
  if (resource === "students" && subId && method === "DELETE") {
    const student = await findGroupStudent(db, group, subId);
    if (!student) return fail(request, 404, "NOT_FOUND");
    await deleteStudent(db, student.id);
    return noContent();
  }
  if (resource === "assignments" && !subId && method === "POST") return createAssignment(request, db, ctx, group);
  if (resource === "assignments" && !subId && method === "GET") return listAssignments(request, db, group);
  if ((resource === "results" || resource === "results.csv") && !subId && method === "GET") {
    return groupResults(request, db, group, url, resource === "results.csv");
  }
  return fail(request, 404, "NOT_FOUND");
}

// ---------------------------------------------------------------------------
// Teacher auth

async function authRequest(request: Request, env: InstEnv, db: D1Database): Promise<Response> {
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !EMAIL_RE.test(email) || CONTROL_RE.test(email)) {
    return fail(request, 400, "INVALID_EMAIL");
  }

  const devLogin = env.INST_DEV_LOGIN === "1";
  const sender = createEmailSender(env);
  if (!sender && !devLogin) return fail(request, 503, "EMAIL_UNAVAILABLE");

  const now = nowS();
  const token = newToken();
  const tokenHash = await sha256Hex(token);
  // A token created at t expires at t + TTL, so "created in the last hour" is
  // `expires_at > now - 3600 + TTL`. The count and the insert are one statement
  // so concurrent requests cannot overshoot the limit.
  const createdAfterAsExpiry = now - 3600 + INST_LOGIN_TOKEN_TTL_S;
  const [, insert] = await db.batch([
    db.prepare("DELETE FROM inst_login_tokens WHERE email = ? AND expires_at < ?").bind(email, now - 3600),
    db
      .prepare(
        `INSERT INTO inst_login_tokens (token_hash, email, expires_at, used_at)
         SELECT ?, ?, ?, NULL
          WHERE (SELECT COUNT(*) FROM inst_login_tokens WHERE email = ? AND expires_at > ?) < ?`
      )
      .bind(tokenHash, email, now + INST_LOGIN_TOKEN_TTL_S, email, createdAfterAsExpiry, INST_LOGIN_REQUESTS_PER_HOUR),
  ]);
  if (changesOf(insert) !== 1) {
    return fail(request, 429, "RATE_LIMITED", "Too many login links for this email. Try again later.");
  }

  if (sender) {
    const origin = (env.SITE_ORIGIN || DEFAULT_SITE_ORIGIN).replace(/\/+$/, "");
    const link = `${origin}/institucion/entrar?token=${token}`;
    try {
      await sender.send(buildMagicLinkEmail(email, link, INST_LOGIN_TOKEN_TTL_S / 60));
    } catch {
      await db.prepare("DELETE FROM inst_login_tokens WHERE token_hash = ?").bind(tokenHash).run();
      return fail(request, 503, "EMAIL_UNAVAILABLE", "The login email could not be sent.");
    }
  }

  return ok(request, { ok: true, ...(devLogin ? { devToken: token } : {}) }, 202);
}

async function authVerify(request: Request, db: D1Database): Promise<Response> {
  const body = await readJson(request);
  if (body instanceof Response) return body;
  if (!isTokenShape(body.token)) return fail(request, 401, "INVALID_TOKEN");

  const hash = await sha256Hex(body.token);
  const row = await db
    .prepare("SELECT token_hash, email, expires_at, used_at FROM inst_login_tokens WHERE token_hash = ?")
    .bind(hash)
    .first<Row>();
  if (!row || !timingSafeEqual(String(row.token_hash), hash)) return fail(request, 401, "INVALID_TOKEN");
  if (row.used_at !== null && row.used_at !== undefined) return fail(request, 401, "TOKEN_USED");
  const now = nowS();
  if (Number(row.expires_at) <= now) return fail(request, 401, "TOKEN_EXPIRED");

  // Atomic single use: only one verify can flip used_at.
  const claim = await db
    .prepare("UPDATE inst_login_tokens SET used_at = ? WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?")
    .bind(now, hash, now)
    .run();
  if (changesOf(claim) !== 1) return fail(request, 401, "TOKEN_USED");

  const email = String(row.email);
  await db
    .prepare(
      `INSERT INTO teachers (id, institution_id, email, name, role, created_at)
       VALUES (?, NULL, ?, '', 'teacher', ?)
       ON CONFLICT(email) DO NOTHING`
    )
    .bind(newId(), email, now)
    .run();
  const teacher = await db.prepare("SELECT * FROM teachers WHERE email = ?").bind(email).first<Row>();
  if (!teacher) return fail(request, 503, "INST_UNAVAILABLE");
  const institution = teacher.institution_id
    ? await db.prepare("SELECT * FROM institutions WHERE id = ?").bind(teacher.institution_id).first<Row>()
    : null;

  const sessionToken = await createSession(db, "teacher", String(teacher.id));
  return ok(request, {
    sessionToken,
    teacher: toTeacher(teacher),
    institution: toInstitution(institution ?? null),
  });
}

async function patchMe(request: Request, db: D1Database, ctx: TeacherCtx): Promise<Response> {
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const name = text(body.name, 1, 80);
  if (name === null) return fail(request, 400, "INVALID_BODY", "name must be 1-80 characters.");
  await db.prepare("UPDATE teachers SET name = ? WHERE id = ?").bind(name, ctx.teacher.id).run();
  return ok(request, { teacher: toTeacher({ ...ctx.teacher, name }) });
}

// ---------------------------------------------------------------------------
// Institution and groups

async function createInstitution(request: Request, db: D1Database, ctx: TeacherCtx): Promise<Response> {
  if (ctx.teacher.institution_id) return fail(request, 409, "INSTITUTION_EXISTS");
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const name = text(body.name, 2, 120);
  const code = country(body.country);
  const city = text(body.city, 1, 80);
  if (name === null) return fail(request, 400, "INVALID_BODY", "name must be 2-120 characters.");
  if (code === null) return fail(request, 400, "INVALID_BODY", "country must be a supported ISO code (co, mx, ...).");
  if (city === null) return fail(request, 400, "INVALID_BODY", "city must be 1-80 characters.");

  const now = nowS();
  const institution = { id: newId(), name, country: code, city, plan: "free", created_at: now };
  const [, claim] = await db.batch([
    db
      .prepare("INSERT INTO institutions (id, name, country, city, plan, created_at) VALUES (?, ?, ?, ?, 'free', ?)")
      .bind(institution.id, name, code, city, now),
    db
      .prepare("UPDATE teachers SET institution_id = ?, role = 'owner' WHERE id = ? AND institution_id IS NULL")
      .bind(institution.id, ctx.teacher.id),
  ]);
  if (changesOf(claim) !== 1) {
    // A concurrent request attached another institution first; drop ours.
    await db.prepare("DELETE FROM institutions WHERE id = ?").bind(institution.id).run();
    return fail(request, 409, "INSTITUTION_EXISTS");
  }
  return ok(request, toInstitution(institution) as Record<string, unknown>, 201);
}

async function createGroup(request: Request, db: D1Database, ctx: TeacherCtx): Promise<Response> {
  if (!ctx.institution) return fail(request, 409, "NO_INSTITUTION", "Create an institution first.");
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const name = text(body.name, 1, 60);
  const grade = integer(body.grade, MIN_GRADE, MAX_GRADE);
  if (name === null) return fail(request, 400, "INVALID_BODY", "name must be 1-60 characters.");
  if (grade === null) return fail(request, 400, "INVALID_BODY", `grade must be an integer ${MIN_GRADE}-${MAX_GRADE}.`);

  const plan = planOf(ctx.institution);
  const now = nowS();
  for (let attempt = 0; attempt < 5; attempt++) {
    const row = {
      id: newId(),
      institution_id: ctx.institution.id,
      teacher_id: ctx.teacher.id,
      name,
      grade,
      join_code: newJoinCode(),
      archived: 0,
      created_at: now,
    };
    try {
      const insert = await db
        .prepare(
          `INSERT INTO groups (id, institution_id, teacher_id, name, grade, join_code, archived, created_at)
           SELECT ?, ?, ?, ?, ?, ?, 0, ?
            WHERE (SELECT COUNT(*) FROM groups WHERE institution_id = ? AND archived = 0) < ?`
        )
        .bind(row.id, row.institution_id, row.teacher_id, name, grade, row.join_code, now, row.institution_id, limitBind(PLAN_LIMITS[plan].groups))
        .run();
      if (changesOf(insert) !== 1) return planLimitError(request, plan, "groups");
      return ok(request, toGroup(row), 201);
    } catch (error) {
      // Join code collision: draw another one.
      if (!isUniqueViolation(error)) throw error;
    }
  }
  return fail(request, 503, "JOIN_CODE_EXHAUSTED");
}

async function listGroups(request: Request, db: D1Database, ctx: TeacherCtx): Promise<Response> {
  if (!ctx.institution) return ok(request, { groups: [] });
  const ownOnly = ctx.teacher.role !== "owner";
  const { results } = await db
    .prepare(
      `SELECT g.*,
              (SELECT COUNT(*) FROM students s WHERE s.group_id = g.id) AS student_count,
              (SELECT COUNT(*) FROM assignments a WHERE a.group_id = g.id) AS assignment_count
         FROM groups g
        WHERE g.institution_id = ?${ownOnly ? " AND g.teacher_id = ?" : ""}
        ORDER BY g.created_at, g.id`
    )
    .bind(...(ownOnly ? [ctx.institution.id, ctx.teacher.id] : [ctx.institution.id]))
    .all<Row>();
  return ok(request, { groups: (results || []).map(toGroup) });
}

async function findGroupStudent(db: D1Database, group: Row, studentId: string) {
  if (!ID_RE.test(studentId)) return null;
  return db.prepare("SELECT * FROM students WHERE id = ? AND group_id = ?").bind(studentId, group.id).first<Row>();
}

async function listStudents(request: Request, db: D1Database, group: Row): Promise<Response> {
  const { results } = await db
    .prepare(
      `SELECT s.id, s.nickname, s.student_code, s.joined_at,
              MAX(r.created_at) AS last_result_at,
              AVG(CASE WHEN r.id IS NULL THEN NULL
                       WHEN r.total > 0 THEN 100.0 * r.correct / r.total
                       ELSE 0 END) AS avg_pct
         FROM students s
         LEFT JOIN results r ON r.student_id = s.id
        WHERE s.group_id = ?
        GROUP BY s.id
        ORDER BY s.nickname COLLATE NOCASE, s.id`
    )
    .bind(group.id)
    .all<Row>();
  return ok(request, {
    students: (results || []).map((row) => ({
      id: row.id,
      nickname: row.nickname,
      studentCode: row.student_code ?? null,
      joinedAt: iso(row.joined_at),
      lastResultAt: iso(row.last_result_at),
      avgPct: row.avg_pct === null || row.avg_pct === undefined ? null : round1(Number(row.avg_pct)),
    })),
  });
}

async function patchStudent(request: Request, db: D1Database, group: Row, studentId: string): Promise<Response> {
  const student = await findGroupStudent(db, group, studentId);
  if (!student) return fail(request, 404, "NOT_FOUND");
  const body = await readJson(request);
  if (body instanceof Response) return body;
  if (!("studentCode" in body)) return fail(request, 400, "INVALID_BODY", "studentCode is required (string or null).");
  let studentCode: string | null = null;
  if (body.studentCode !== null && body.studentCode !== "") {
    studentCode = text(body.studentCode, 1, 32);
    if (studentCode === null) return fail(request, 400, "INVALID_BODY", "studentCode must be 1-32 characters or null.");
  }
  await db.prepare("UPDATE students SET student_code = ? WHERE id = ?").bind(studentCode, student.id).run();
  return ok(request, { student: { id: student.id, nickname: student.nickname, studentCode } });
}

/** Removes a student, every result they sent and every session they hold. */
async function deleteStudent(db: D1Database, studentId: string) {
  await db.batch([
    db.prepare("DELETE FROM results WHERE student_id = ?").bind(studentId),
    db.prepare("DELETE FROM inst_sessions WHERE subject_type = 'student' AND subject_id = ?").bind(studentId),
    db.prepare("DELETE FROM students WHERE id = ?").bind(studentId),
  ]);
}

// ---------------------------------------------------------------------------
// Assignments and results (teacher)

/** ISO-8601 string or null. Returns `false` when present but unparsable. */
function dueAt(value: unknown): number | null | false {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string" || value.length > 40) return false;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? Math.floor(ms / 1000) : false;
}

async function createAssignment(request: Request, db: D1Database, ctx: TeacherCtx, group: Row): Promise<Response> {
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const title = text(body.title, 1, 120);
  const code = country(body.country);
  const grade = integer(body.grade, MIN_GRADE, MAX_GRADE);
  const subj = subject(body.subject);
  const questionCount = integer(body.questionCount, 10, 60);
  const due = dueAt(body.dueAt);
  if (title === null) return fail(request, 400, "INVALID_BODY", "title must be 1-120 characters.");
  if (code === null) return fail(request, 400, "INVALID_BODY", "country must be a supported ISO code (co, mx, ...).");
  if (grade === null) return fail(request, 400, "INVALID_BODY", `grade must be an integer ${MIN_GRADE}-${MAX_GRADE}.`);
  if (subj === false) return fail(request, 400, "INVALID_BODY", "subject must be a slug (a-z, 0-9, _ or -) or null.");
  if (questionCount === null) return fail(request, 400, "INVALID_BODY", "questionCount must be an integer 10-60.");
  if (due === false) return fail(request, 400, "INVALID_BODY", "dueAt must be an ISO-8601 date or null.");

  const institution = ctx.institution as Row;
  const plan = planOf(institution);
  const now = nowS();
  const row = {
    id: newId(),
    group_id: group.id,
    title,
    country: code,
    grade,
    subject: subj,
    question_count: questionCount,
    due_at: due,
    created_at: now,
  };
  // Active = no due date or due in the future, counted across the institution.
  const insert = await db
    .prepare(
      `INSERT INTO assignments (id, group_id, title, country, grade, subject, question_count, due_at, created_at)
       SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?
        WHERE (SELECT COUNT(*) FROM assignments a JOIN groups g ON g.id = a.group_id
                WHERE g.institution_id = ? AND (a.due_at IS NULL OR a.due_at > ?)) < ?`
    )
    .bind(row.id, group.id, title, code, grade, subj, questionCount, due, now, institution.id, now, limitBind(PLAN_LIMITS[plan].activeAssignments))
    .run();
  if (changesOf(insert) !== 1) return planLimitError(request, plan, "activeAssignments");
  return ok(request, { ...toAssignment(row), completedCount: 0 }, 201);
}

async function listAssignments(request: Request, db: D1Database, group: Row): Promise<Response> {
  const { results } = await db
    .prepare(
      `SELECT a.*, (SELECT COUNT(DISTINCT r.student_id) FROM results r WHERE r.assignment_id = a.id) AS completed_count
         FROM assignments a
        WHERE a.group_id = ?
        ORDER BY a.created_at DESC, a.id`
    )
    .bind(group.id)
    .all<Row>();
  return ok(request, {
    assignments: (results || []).map((row) => ({ ...toAssignment(row), completedCount: Number(row.completed_count ?? 0) })),
  });
}

async function groupResults(request: Request, db: D1Database, group: Row, url: URL, asCsv: boolean): Promise<Response> {
  const assignmentId = url.searchParams.get("assignmentId");
  if (assignmentId !== null) {
    const assignment = ID_RE.test(assignmentId)
      ? await db.prepare("SELECT id FROM assignments WHERE id = ? AND group_id = ?").bind(assignmentId, group.id).first()
      : null;
    if (!assignment) return fail(request, 404, "NOT_FOUND");
  }
  const { results } = await db
    .prepare(
      `SELECT r.student_id, s.nickname, s.student_code, r.source, r.subject, r.total, r.correct, r.duration_s, r.created_at
         FROM results r
         JOIN students s ON s.id = r.student_id
        WHERE r.group_id = ?${assignmentId !== null ? " AND r.assignment_id = ?" : ""}
        ORDER BY r.created_at DESC, r.id
        LIMIT ?`
    )
    .bind(...(assignmentId !== null ? [group.id, assignmentId] : [group.id]), INST_RESULTS_MAX_ROWS + 1)
    .all<Row>();
  const all = results || [];
  const truncated = all.length > INST_RESULTS_MAX_ROWS;
  const rows = all.slice(0, INST_RESULTS_MAX_ROWS).map((row) => {
    const total = Number(row.total);
    const correct = Number(row.correct);
    return {
      studentId: row.student_id,
      nickname: row.nickname,
      studentCode: row.student_code ?? null,
      source: row.source,
      subject: row.subject ?? null,
      total,
      correct,
      pct: pctOf(correct, total),
      durationS: Number(row.duration_s),
      createdAt: iso(row.created_at),
    };
  });

  if (asCsv) {
    const lines = [RESULTS_CSV_COLUMNS.join(",")];
    for (const row of rows) {
      lines.push(
        [row.nickname, row.studentCode, row.source, row.subject, row.total, row.correct, row.pct, row.durationS, row.createdAt]
          .map(csvCell)
          .join(",")
      );
    }
    return new Response("﻿" + lines.join("\r\n") + "\r\n", {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="resultados-${group.id}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }

  const bySubjectAcc: Record<string, { sum: number; n: number }> = {};
  let sum = 0;
  for (const row of rows) {
    sum += row.pct;
    const key = row.subject ?? "general";
    const acc = (bySubjectAcc[key] ||= { sum: 0, n: 0 });
    acc.sum += row.pct;
    acc.n += 1;
  }
  const bySubject: Record<string, { avgPct: number; n: number }> = {};
  for (const [key, acc] of Object.entries(bySubjectAcc)) bySubject[key] = { avgPct: round1(acc.sum / acc.n), n: acc.n };

  return ok(request, {
    rows,
    summary: {
      students: new Set(rows.map((row) => row.studentId)).size,
      avgPct: rows.length ? round1(sum / rows.length) : null,
      bySubject,
    },
    truncated,
  });
}

// ---------------------------------------------------------------------------
// Student

async function studentJoin(request: Request, db: D1Database): Promise<Response> {
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const joinCode = typeof body.joinCode === "string" ? body.joinCode.trim().toUpperCase() : "";
  if (!isJoinCode(joinCode)) return fail(request, 400, "INVALID_JOIN_CODE");
  if (!isValidNickname(body.nickname, 2, 24)) return fail(request, 400, "INVALID_NICKNAME");
  const nickname = body.nickname.trim();
  if (typeof body.anonymousId !== "string" || !ANONYMOUS_ID_RE.test(body.anonymousId)) {
    return fail(request, 400, "INVALID_ANONYMOUS_ID");
  }
  const anonymousId = body.anonymousId;

  const group = await db
    .prepare(
      `SELECT g.id, g.name, g.grade, g.institution_id, i.name AS inst_name, i.country AS inst_country, i.plan AS inst_plan
         FROM groups g JOIN institutions i ON i.id = g.institution_id
        WHERE g.join_code = ? AND g.archived = 0`
    )
    .bind(joinCode)
    .first<Row>();
  if (!group) return fail(request, 404, "JOIN_CODE_NOT_FOUND");

  const findStudent = () =>
    db.prepare("SELECT * FROM students WHERE group_id = ? AND anonymous_id = ?").bind(group.id, anonymousId).first<Row>();

  let student = await findStudent();
  if (student) {
    // Idempotent re-join: same student row, nickname follows the latest join.
    if (student.nickname !== nickname) {
      await db.prepare("UPDATE students SET nickname = ? WHERE id = ?").bind(nickname, student.id).run();
      student = { ...student, nickname };
    }
  } else {
    const plan = planOf({ plan: group.inst_plan });
    await db
      .prepare(
        `INSERT INTO students (id, group_id, nickname, anonymous_id, student_code, joined_at)
         SELECT ?, ?, ?, ?, NULL, ?
          WHERE (SELECT COUNT(*) FROM students s JOIN groups g ON g.id = s.group_id WHERE g.institution_id = ?) < ?
         ON CONFLICT (group_id, anonymous_id) DO NOTHING`
      )
      .bind(newId(), group.id, nickname, anonymousId, nowS(), group.institution_id, limitBind(PLAN_LIMITS[plan].students))
      .run();
    student = await findStudent();
    // No row after the insert: the conditional insert was refused by the limit.
    if (!student) return planLimitError(request, plan, "students");
  }

  const studentToken = await createSession(db, "student", String(student.id));
  return ok(request, {
    studentToken,
    student: { id: student.id, nickname: student.nickname },
    group: { id: group.id, name: group.name, grade: Number(group.grade) },
    institution: { name: group.inst_name, country: group.inst_country },
  });
}

async function studentAssignments(request: Request, db: D1Database, ctx: StudentCtx): Promise<Response> {
  const { results } = await db
    .prepare(
      `SELECT a.*, EXISTS (SELECT 1 FROM results r WHERE r.assignment_id = a.id AND r.student_id = ?) AS done
         FROM assignments a
        WHERE a.group_id = ?
        ORDER BY a.created_at DESC, a.id`
    )
    .bind(ctx.student.id, ctx.group.id)
    .all<Row>();
  return ok(request, {
    assignments: (results || []).map((row) => {
      const a = toAssignment(row);
      return {
        id: a.id,
        title: a.title,
        country: a.country,
        grade: a.grade,
        subject: a.subject,
        questionCount: a.questionCount,
        dueAt: a.dueAt,
        done: Number(row.done) === 1,
      };
    }),
  });
}

/** `{area: {total, correct}}` with at most 20 areas, or `false` when malformed. */
function perArea(value: unknown): string | null | false {
  if (value === undefined || value === null) return null;
  if (typeof value !== "object" || Array.isArray(value)) return false;
  const entries = Object.entries(value as Row);
  if (entries.length > 20) return false;
  const clean: Record<string, { total: number; correct: number }> = {};
  for (const [key, area] of entries) {
    if (!AREA_KEY_RE.test(key) || !area || typeof area !== "object") return false;
    const total = integer((area as Row).total, 0, 200);
    const correct = total === null ? null : integer((area as Row).correct, 0, total);
    if (total === null || correct === null) return false;
    clean[key] = { total, correct };
  }
  return JSON.stringify(clean);
}

async function studentResult(request: Request, db: D1Database, ctx: StudentCtx): Promise<Response> {
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const source = body.source;
  if (typeof source !== "string" || !(SOURCES as readonly string[]).includes(source)) {
    return fail(request, 400, "INVALID_BODY", "source must be assignment, practice or neurogym.");
  }
  const assignmentId = body.assignmentId === undefined || body.assignmentId === null ? null : body.assignmentId;
  if (assignmentId !== null && (typeof assignmentId !== "string" || !ID_RE.test(assignmentId))) {
    return fail(request, 400, "INVALID_BODY", "assignmentId must be an assignment id or null.");
  }
  if ((source === "assignment") !== (assignmentId !== null)) {
    return fail(request, 400, "INVALID_BODY", "assignmentId is required for source=assignment and only allowed there.");
  }
  const subj = subject(body.subject);
  const grade = integer(body.grade, MIN_GRADE, MAX_GRADE);
  const total = integer(body.total, 0, 200);
  const correct = total === null ? null : integer(body.correct, 0, total);
  const durationS = integer(body.durationS, 0, 14_400);
  const areas = perArea(body.perArea);
  if (subj === false) return fail(request, 400, "INVALID_BODY", "subject must be a slug or null.");
  if (grade === null) return fail(request, 400, "INVALID_BODY", `grade must be an integer ${MIN_GRADE}-${MAX_GRADE}.`);
  if (total === null || correct === null) return fail(request, 400, "INVALID_BODY", "Requires 0 <= correct <= total <= 200.");
  if (durationS === null) return fail(request, 400, "INVALID_BODY", "durationS must be an integer 0-14400.");
  if (areas === false) return fail(request, 400, "INVALID_BODY", "perArea must be {area:{total,correct}} with up to 20 areas.");

  if (assignmentId !== null) {
    const assignment = await db
      .prepare("SELECT id FROM assignments WHERE id = ? AND group_id = ?")
      .bind(assignmentId, ctx.group.id)
      .first();
    if (!assignment) return fail(request, 404, "NOT_FOUND", "Assignment not found in your group.");
  }

  const now = nowS();
  const id = newId();
  const insert = await db
    .prepare(
      `INSERT INTO results (id, student_id, group_id, assignment_id, source, subject, grade, total, correct, duration_s, per_area, created_at)
       SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        WHERE (SELECT COUNT(*) FROM results WHERE student_id = ? AND created_at >= ?) < ?`
    )
    .bind(
      id, ctx.student.id, ctx.group.id, assignmentId, source, subj, grade, total, correct, durationS, areas, now,
      ctx.student.id, utcDayStart(now), INST_RESULTS_PER_STUDENT_DAY
    )
    .run();
  if (changesOf(insert) !== 1) {
    return fail(request, 429, "RATE_LIMITED", `Max ${INST_RESULTS_PER_STUDENT_DAY} results per student per day.`);
  }
  return ok(request, { id }, 201);
}
