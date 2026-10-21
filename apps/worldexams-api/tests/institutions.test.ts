// @vitest-environment node
// Institutions API v1 (docs/institutions/CONTRACT.md).
// Runs against a real in-memory SQLite (node:sqlite) wrapped in a minimal D1
// shim and loaded with the actual migrations, so the SQL, constraints and
// foreign keys are exercised exactly as written.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import worker from "../src/index";
import { PLAN_LIMITS, csvCell, INST_RESULTS_PER_STUDENT_DAY, INST_RATE_LIMITS } from "../src/institutions";
import { newJoinCode, isJoinCode, timingSafeEqual } from "../src/institutions-auth";
import { buildMagicLinkEmail } from "../src/email";
import { isValidNickname } from "../src/ranked";

// --- D1 shim over node:sqlite ------------------------------------------------

class ShimStatement {
  constructor(private db: DatabaseSync, readonly sql: string, readonly params: unknown[] = []) {}
  bind(...params: unknown[]) {
    return new ShimStatement(this.db, this.sql, params);
  }
  private stmt() {
    return this.db.prepare(this.sql);
  }
  async first<T = any>(col?: string): Promise<T | null> {
    const row = this.stmt().get(...(this.params as any[])) as any;
    if (!row) return null;
    return col ? row[col] : { ...row };
  }
  async all<T = any>(): Promise<{ results: T[] }> {
    return { results: (this.stmt().all(...(this.params as any[])) as any[]).map((r) => ({ ...r })) };
  }
  async run() {
    return this.runSync();
  }
  runSync() {
    const info = this.stmt().run(...(this.params as any[]));
    return { success: true, meta: { changes: Number(info.changes) } };
  }
}

class ShimD1 {
  sqlite = new DatabaseSync(":memory:");
  constructor() {
    this.sqlite.exec("PRAGMA foreign_keys = ON");
    for (const file of ["0001_ranked.sql", "0002_institutions.sql"]) {
      this.sqlite.exec(readFileSync(new URL(`../migrations/${file}`, import.meta.url), "utf8"));
    }
  }
  prepare(sql: string) {
    return new ShimStatement(this.sqlite, sql);
  }
  /** D1 batches run as one transaction. */
  async batch(statements: ShimStatement[]) {
    this.sqlite.exec("BEGIN");
    try {
      const out = statements.map((s) => s.runSync());
      this.sqlite.exec("COMMIT");
      return out;
    } catch (error) {
      this.sqlite.exec("ROLLBACK");
      throw error;
    }
  }
  rows(sql: string, ...params: any[]) {
    return this.sqlite.prepare(sql).all(...params) as any[];
  }
  exec(sql: string, ...params: any[]) {
    this.sqlite.prepare(sql).run(...params);
  }
}

// --- harness -----------------------------------------------------------------

let db: ShimD1;
let env: any;
let clock: number;
const T0 = Date.UTC(2026, 9, 21, 12, 0, 0);

beforeEach(() => {
  db = new ShimD1();
  env = { RANKED_DB: db, INST_DEV_LOGIN: "1", ASSETS: { fetch: vi.fn() } };
  clock = T0;
  vi.spyOn(Date, "now").mockImplementation(() => clock);
});

afterEach(() => {
  vi.restoreAllMocks();
});

async function call(method: string, path: string, opts: { token?: string; body?: unknown; raw?: string; ip?: string } = {}) {
  const headers: Record<string, string> = { Origin: "https://saberparatodos.space" };
  if (opts.ip) headers["cf-connecting-ip"] = opts.ip;
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  if (opts.body !== undefined || opts.raw !== undefined) headers["Content-Type"] = "application/json";
  const res = await worker.fetch(
    new Request(`https://api.saberparatodos.space/v1/inst${path}`, {
      method,
      headers,
      body: opts.raw !== undefined ? opts.raw : opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    }),
    env
  );
  // ignoreBOM keeps the CSV byte-order mark visible to the assertions.
  const text = new TextDecoder("utf-8", { ignoreBOM: true }).decode(await res.arrayBuffer());
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { status: res.status, data, text, headers: res.headers };
}

async function loginTeacher(email = "profe@colegio.edu.co") {
  const req = await call("POST", "/auth/request", { body: { email } });
  expect(req.status).toBe(202);
  const verify = await call("POST", "/auth/verify", { body: { token: req.data.devToken } });
  expect(verify.status).toBe(200);
  return verify.data.sessionToken as string;
}

async function teacherWithInstitution(email = "profe@colegio.edu.co", name = "Colegio San José") {
  const token = await loginTeacher(email);
  const inst = await call("POST", "/institutions", { token, body: { name, country: "CO", city: "Medellín" } });
  expect(inst.status).toBe(201);
  return { token, institution: inst.data };
}

async function createGroup(token: string, name = "Sexto A", grade = 6) {
  const res = await call("POST", "/groups", { token, body: { name, grade } });
  expect(res.status).toBe(201);
  return res.data;
}

let anonCounter = 0;
async function join(joinCode: string, nickname = "Lucía", anonymousId = `anon-device-${++anonCounter}`) {
  return call("POST", "/join", { body: { joinCode, nickname, anonymousId } });
}

const assignmentBody = (over: Record<string, unknown> = {}) => ({
  title: "Repaso de enteros",
  country: "co",
  grade: 6,
  subject: "matematicas",
  questionCount: 10,
  dueAt: null,
  ...over,
});

// --- tests -------------------------------------------------------------------

describe("institutions: full happy path", () => {
  it("request -> verify -> institution -> group -> join -> assignment -> result -> teacher results + CSV", async () => {
    const req = await call("POST", "/auth/request", { body: { email: "  Profe@Colegio.EDU.co " } });
    expect(req.status).toBe(202);
    expect(req.data.ok).toBe(true);
    expect(req.data.devToken).toMatch(/^[0-9a-f]{64}$/);
    // Only the hash is stored.
    const stored = db.rows("SELECT * FROM inst_login_tokens");
    expect(stored).toHaveLength(1);
    expect(stored[0].token_hash).not.toBe(req.data.devToken);
    expect(stored[0].email).toBe("profe@colegio.edu.co");
    expect(stored[0].expires_at).toBe(T0 / 1000 + 15 * 60);

    const verify = await call("POST", "/auth/verify", { body: { token: req.data.devToken } });
    expect(verify.status).toBe(200);
    expect(verify.data.sessionToken).toMatch(/^[0-9a-f]{64}$/);
    expect(verify.data.teacher).toMatchObject({ email: "profe@colegio.edu.co", name: "", role: "teacher" });
    expect(verify.data.institution).toBeNull();
    const token = verify.data.sessionToken;
    expect(db.rows("SELECT token_hash FROM inst_sessions")[0].token_hash).not.toBe(token);

    const me = await call("GET", "/me", { token });
    expect(me.status).toBe(200);
    expect(me.data).toEqual({ teacher: verify.data.teacher, institution: null });

    const patched = await call("PATCH", "/me", { token, body: { name: "  Ana Gómez " } });
    expect(patched.status).toBe(200);
    expect(patched.data.teacher.name).toBe("Ana Gómez");

    const inst = await call("POST", "/institutions", {
      token,
      body: { name: "Colegio San José", country: "CO", city: "Medellín" },
    });
    expect(inst.status).toBe(201);
    expect(inst.data).toMatchObject({ name: "Colegio San José", country: "co", city: "Medellín", plan: "free" });
    expect(inst.data.id).toMatch(/^[0-9a-f]{32}$/);
    const again = await call("POST", "/institutions", { token, body: { name: "Otro", country: "co", city: "Cali" } });
    expect(again.status).toBe(409);
    expect(again.data.error).toBe("INSTITUTION_EXISTS");

    const me2 = await call("GET", "/me", { token });
    expect(me2.data.teacher.role).toBe("owner");
    expect(me2.data.institution.id).toBe(inst.data.id);

    const group = await createGroup(token);
    expect(group).toMatchObject({ name: "Sexto A", grade: 6, archived: false, studentCount: 0, assignmentCount: 0 });
    expect(isJoinCode(group.joinCode)).toBe(true);

    // Student joins (lower-case code is accepted); joining again is idempotent.
    const j1 = await join(group.joinCode.toLowerCase(), "Lucía", "device-abc-123");
    expect(j1.status).toBe(200);
    expect(j1.data.studentToken).toMatch(/^[0-9a-f]{64}$/);
    expect(j1.data.student.nickname).toBe("Lucía");
    expect(j1.data.group).toEqual({ id: group.id, name: "Sexto A", grade: 6 });
    expect(j1.data.institution).toEqual({ name: "Colegio San José", country: "co" });
    const j2 = await join(group.joinCode, "Lucía", "device-abc-123");
    expect(j2.status).toBe(200);
    expect(j2.data.student.id).toBe(j1.data.student.id);
    expect(db.rows("SELECT * FROM students")).toHaveLength(1);
    const studentToken = j2.data.studentToken;

    const sme = await call("GET", "/student/me", { token: studentToken });
    expect(sme.status).toBe(200);
    expect(sme.data.student).toEqual({ id: j1.data.student.id, nickname: "Lucía" });

    const assignment = await call("POST", `/groups/${group.id}/assignments`, {
      token,
      body: assignmentBody({ dueAt: "2026-11-01T23:59:00.000Z" }),
    });
    expect(assignment.status).toBe(201);
    expect(assignment.data).toMatchObject({
      title: "Repaso de enteros",
      country: "co",
      grade: 6,
      subject: "matematicas",
      questionCount: 10,
      dueAt: "2026-11-01T23:59:00.000Z",
      completedCount: 0,
    });

    const before = await call("GET", "/student/assignments", { token: studentToken });
    expect(before.data.assignments).toEqual([
      {
        id: assignment.data.id,
        title: "Repaso de enteros",
        country: "co",
        grade: 6,
        subject: "matematicas",
        questionCount: 10,
        dueAt: "2026-11-01T23:59:00.000Z",
        done: false,
      },
    ]);

    const result = await call("POST", "/student/results", {
      token: studentToken,
      body: {
        assignmentId: assignment.data.id,
        source: "assignment",
        subject: "matematicas",
        grade: 6,
        total: 10,
        correct: 7,
        durationS: 600,
        perArea: { numerico: { total: 10, correct: 7 } },
      },
    });
    expect(result.status).toBe(201);
    expect(result.data.id).toMatch(/^[0-9a-f]{32}$/);
    const practice = await call("POST", "/student/results", {
      token: studentToken,
      body: { source: "neurogym", grade: 6, total: 4, correct: 1, durationS: 90 },
    });
    expect(practice.status).toBe(201);

    const after = await call("GET", "/student/assignments", { token: studentToken });
    expect(after.data.assignments[0].done).toBe(true);

    const groups = await call("GET", "/groups", { token });
    expect(groups.data.groups).toHaveLength(1);
    expect(groups.data.groups[0]).toMatchObject({ id: group.id, studentCount: 1, assignmentCount: 1 });

    const students = await call("GET", `/groups/${group.id}/students`, { token });
    expect(students.status).toBe(200);
    expect(students.data.students).toEqual([
      {
        id: j1.data.student.id,
        nickname: "Lucía",
        studentCode: null,
        joinedAt: new Date(T0).toISOString(),
        lastResultAt: new Date(T0).toISOString(),
        avgPct: 47.5, // (70 + 25) / 2
      },
    ]);

    const code = await call("PATCH", `/groups/${group.id}/students/${j1.data.student.id}`, {
      token,
      body: { studentCode: "A-07" },
    });
    expect(code.status).toBe(200);
    expect(code.data.student.studentCode).toBe("A-07");

    const assignments = await call("GET", `/groups/${group.id}/assignments`, { token });
    expect(assignments.data.assignments[0].completedCount).toBe(1);

    const results = await call("GET", `/groups/${group.id}/results`, { token });
    expect(results.status).toBe(200);
    expect(results.data.rows).toHaveLength(2);
    expect(results.data.rows[0]).toMatchObject({
      studentId: j1.data.student.id,
      nickname: "Lucía",
      studentCode: "A-07",
    });
    expect(results.data.summary).toEqual({
      students: 1,
      avgPct: 47.5,
      bySubject: { matematicas: { avgPct: 70, n: 1 }, general: { avgPct: 25, n: 1 } },
    });
    expect(results.data.truncated).toBe(false);

    const filtered = await call("GET", `/groups/${group.id}/results?assignmentId=${assignment.data.id}`, { token });
    expect(filtered.data.rows).toHaveLength(1);
    expect(filtered.data.rows[0]).toMatchObject({ source: "assignment", total: 10, correct: 7, pct: 70, durationS: 600 });

    const csv = await call("GET", `/groups/${group.id}/results.csv?assignmentId=${assignment.data.id}`, { token });
    expect(csv.status).toBe(200);
    expect(csv.headers.get("Content-Type")).toBe("text/csv; charset=utf-8");
    expect(csv.headers.get("Access-Control-Allow-Origin")).toBe("https://saberparatodos.space");
    expect(csv.text.charCodeAt(0)).toBe(0xfeff);
    expect(csv.text.slice(1).split("\r\n")).toEqual([
      "nickname,student_code,source,subject,total,correct,pct,duration_s,created_at_iso",
      `Lucía,A-07,assignment,matematicas,10,7,70,600,${new Date(T0).toISOString()}`,
      "",
    ]);

    const logout = await call("POST", "/auth/logout", { token });
    expect(logout.status).toBe(204);
    expect((await call("GET", "/me", { token })).status).toBe(401);
  });
});

describe("institutions: teacher auth", () => {
  it("503 EMAIL_UNAVAILABLE without the EMAIL binding outside dev mode", async () => {
    delete env.INST_DEV_LOGIN;
    const res = await call("POST", "/auth/request", { body: { email: "a@b.co" } });
    expect(res.status).toBe(503);
    expect(res.data.error).toBe("EMAIL_UNAVAILABLE");
    expect(db.rows("SELECT * FROM inst_login_tokens")).toHaveLength(0);
  });

  it("sends a Spanish magic link through env.EMAIL and never returns the token in production", async () => {
    delete env.INST_DEV_LOGIN;
    const send = vi.fn(async () => ({ messageId: "x" }));
    env.EMAIL = { send };
    env.SITE_ORIGIN = "https://staging.saberparatodos.space/";
    env.INST_EMAIL_FROM = "panel@saberparatodos.space";
    const res = await call("POST", "/auth/request", { body: { email: "Ana@Colegio.co" } });
    expect(res.status).toBe(202);
    expect(res.data).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
    const message = (send.mock.calls[0] as any)[0];
    expect(message.to).toBe("ana@colegio.co");
    expect(message.from).toEqual({ name: "SaberParaTodos", email: "panel@saberparatodos.space" });
    expect(message.subject).toMatch(/enlace/i);
    const link = message.text.match(/https:\/\/\S+/)[0];
    expect(link).toMatch(/^https:\/\/staging\.saberparatodos\.space\/institucion\/entrar\?token=[0-9a-f]{64}$/);
    expect(message.html).toContain(link);
    expect(message.html).toContain("Iniciar sesión");

    const token = new URL(link).searchParams.get("token");
    const verify = await call("POST", "/auth/verify", { body: { token } });
    expect(verify.status).toBe(200);
  });

  it("503 and no stored token when the email send fails", async () => {
    delete env.INST_DEV_LOGIN;
    env.EMAIL = { send: vi.fn(async () => { throw new Error("boom"); }) };
    const res = await call("POST", "/auth/request", { body: { email: "a@b.co" } });
    expect(res.status).toBe(503);
    expect(db.rows("SELECT * FROM inst_login_tokens")).toHaveLength(0);
  });

  it("rejects malformed emails and bodies", async () => {
    for (const email of ["", "nope", "a@b", 42, "a b@c.co", "x".repeat(250) + "@b.co"]) {
      const res = await call("POST", "/auth/request", { body: { email } });
      expect(res.status).toBe(400);
      expect(res.data.error).toBe("INVALID_EMAIL");
    }
    expect((await call("POST", "/auth/request", { raw: "{not json" })).data.error).toBe("INVALID_JSON");
    expect((await call("POST", "/auth/request", { raw: "[1]" })).data.error).toBe("INVALID_BODY");
    expect((await call("POST", "/auth/request", { raw: JSON.stringify({ email: "x".repeat(20000) }) })).data.error).toBe(
      "BODY_TOO_LARGE"
    );
  });

  it("magic-link token is single use", async () => {
    const req = await call("POST", "/auth/request", { body: { email: "a@b.co" } });
    expect((await call("POST", "/auth/verify", { body: { token: req.data.devToken } })).status).toBe(200);
    const second = await call("POST", "/auth/verify", { body: { token: req.data.devToken } });
    expect(second.status).toBe(401);
    expect(second.data.error).toBe("TOKEN_USED");
  });

  it("magic-link token expires after 15 minutes", async () => {
    const req = await call("POST", "/auth/request", { body: { email: "a@b.co" } });
    clock += 15 * 60 * 1000 + 1000;
    const res = await call("POST", "/auth/verify", { body: { token: req.data.devToken } });
    expect(res.status).toBe(401);
    expect(res.data.error).toBe("TOKEN_EXPIRED");
  });

  it("unknown or malformed tokens are rejected", async () => {
    expect((await call("POST", "/auth/verify", { body: { token: "a".repeat(64) } })).data.error).toBe("INVALID_TOKEN");
    expect((await call("POST", "/auth/verify", { body: { token: "short" } })).data.error).toBe("INVALID_TOKEN");
    expect((await call("POST", "/auth/verify", { body: {} })).status).toBe(401);
  });

  it("the same email logs into the same teacher", async () => {
    const t1 = await loginTeacher("x@y.co");
    const t2 = await loginTeacher("X@Y.co");
    const me1 = await call("GET", "/me", { token: t1 });
    const me2 = await call("GET", "/me", { token: t2 });
    expect(me1.data.teacher.id).toBe(me2.data.teacher.id);
    expect(db.rows("SELECT * FROM teachers")).toHaveLength(1);
  });

  it("missing, malformed and expired sessions get 401", async () => {
    expect((await call("GET", "/me")).status).toBe(401);
    expect((await call("GET", "/me", { token: "zz" })).status).toBe(401);
    expect((await call("GET", "/groups", { token: "b".repeat(64) })).status).toBe(401);
    const token = await loginTeacher();
    clock += 29 * 24 * 3600 * 1000;
    expect((await call("GET", "/me", { token })).status).toBe(200);
    clock += 2 * 24 * 3600 * 1000;
    const expired = await call("GET", "/me", { token });
    expect(expired.status).toBe(401);
    expect(expired.data.error).toBe("UNAUTHORIZED");
  });

  it("teacher and student sessions are not interchangeable", async () => {
    const { token } = await teacherWithInstitution();
    const group = await createGroup(token);
    const j = await join(group.joinCode);
    const studentToken = j.data.studentToken;
    for (const [method, path] of [
      ["GET", "/me"],
      ["GET", "/groups"],
      ["GET", `/groups/${group.id}/students`],
      ["GET", `/groups/${group.id}/results.csv`],
      ["POST", "/auth/logout"],
    ]) {
      expect((await call(method, path, { token: studentToken })).status).toBe(401);
    }
    expect((await call("GET", "/student/me", { token })).status).toBe(401);
    expect((await call("GET", "/student/assignments", { token })).status).toBe(401);
    expect(
      (await call("POST", "/student/results", { token, body: { source: "practice", grade: 6, total: 1, correct: 1, durationS: 1 } }))
        .status
    ).toBe(401);
    expect((await call("POST", "/student/leave", { token })).status).toBe(401);
    // Teacher still exists, groups untouched.
    expect(db.rows("SELECT * FROM students")).toHaveLength(1);
  });

  it("a teacher without an institution cannot create groups", async () => {
    const token = await loginTeacher();
    const res = await call("POST", "/groups", { token, body: { name: "A", grade: 6 } });
    expect(res.status).toBe(409);
    expect(res.data.error).toBe("NO_INSTITUTION");
    expect((await call("GET", "/groups", { token })).data.groups).toEqual([]);
  });
});

describe("institutions: authorization (IDOR)", () => {
  it("a teacher of another institution gets 403 on every group path", async () => {
    const a = await teacherWithInstitution("a@a.co", "Colegio A");
    const group = await createGroup(a.token);
    const j = await join(group.joinCode);
    const sid = j.data.student.id;
    const b = await teacherWithInstitution("b@b.co", "Colegio B");

    const attempts: Array<[string, string, unknown?]> = [
      ["GET", `/groups/${group.id}/students`],
      ["PATCH", `/groups/${group.id}/students/${sid}`, { studentCode: "X" }],
      ["DELETE", `/groups/${group.id}/students/${sid}`],
      ["POST", `/groups/${group.id}/assignments`, assignmentBody()],
      ["GET", `/groups/${group.id}/assignments`],
      ["GET", `/groups/${group.id}/results`],
      ["GET", `/groups/${group.id}/results.csv`],
    ];
    for (const [method, path, body] of attempts) {
      const res = await call(method, path, { token: b.token, body });
      expect(res.status, `${method} ${path}`).toBe(403);
      expect(res.data.error).toBe("FORBIDDEN");
    }
    // A teacher with no institution at all is also refused.
    const c = await loginTeacher("c@c.co");
    expect((await call("GET", `/groups/${group.id}/students`, { token: c })).status).toBe(403);

    expect((await call("GET", "/groups", { token: b.token })).data.groups).toEqual([]);
    expect(db.rows("SELECT * FROM students")).toHaveLength(1);
    expect(db.rows("SELECT * FROM assignments")).toHaveLength(0);
  });

  it("owner sees every group of the institution; a plain teacher only their own", async () => {
    const owner = await teacherWithInstitution("owner@a.co");
    const ownerGroup = await createGroup(owner.token, "Owner group");
    const teacherToken = await loginTeacher("teacher@a.co");
    db.exec(
      "UPDATE teachers SET institution_id = ?, role = 'teacher' WHERE email = ?",
      owner.institution.id,
      "teacher@a.co"
    );
    clock += 1000;
    const teacherGroup = await createGroup(teacherToken, "Teacher group");

    const ownerList = await call("GET", "/groups", { token: owner.token });
    expect(ownerList.data.groups.map((g: any) => g.name)).toEqual(["Owner group", "Teacher group"]);
    const teacherList = await call("GET", "/groups", { token: teacherToken });
    expect(teacherList.data.groups.map((g: any) => g.name)).toEqual(["Teacher group"]);

    expect((await call("GET", `/groups/${ownerGroup.id}/students`, { token: teacherToken })).status).toBe(403);
    expect((await call("GET", `/groups/${teacherGroup.id}/students`, { token: owner.token })).status).toBe(200);
  });

  it("unknown ids return 404 and a student id from another group is not reachable", async () => {
    const { token } = await teacherWithInstitution();
    const g1 = await createGroup(token, "G1");
    const g2 = await createGroup(token, "G2");
    const s2 = (await join(g2.joinCode)).data.student.id;
    expect((await call("GET", `/groups/${"f".repeat(32)}/students`, { token })).status).toBe(404);
    expect((await call("GET", `/groups/not-an-id/students`, { token })).status).toBe(404);
    expect((await call("DELETE", `/groups/${g1.id}/students/${s2}`, { token })).status).toBe(404);
    expect((await call("PATCH", `/groups/${g1.id}/students/${s2}`, { token, body: { studentCode: "Z" } })).status).toBe(404);
    expect(db.rows("SELECT * FROM students")).toHaveLength(1);
    expect((await call("GET", `/groups/${g1.id}/results?assignmentId=${"0".repeat(32)}`, { token })).status).toBe(404);
  });

  it("a student cannot submit a result against another group's assignment", async () => {
    const { token } = await teacherWithInstitution();
    const g1 = await createGroup(token, "G1");
    const g2 = await createGroup(token, "G2");
    const foreign = await call("POST", `/groups/${g2.id}/assignments`, { token, body: assignmentBody() });
    const studentToken = (await join(g1.joinCode)).data.studentToken;
    const res = await call("POST", "/student/results", {
      token: studentToken,
      body: { assignmentId: foreign.data.id, source: "assignment", grade: 6, total: 10, correct: 5, durationS: 60 },
    });
    expect(res.status).toBe(404);
    expect(db.rows("SELECT * FROM results")).toHaveLength(0);
    // And never sees it in their list.
    expect((await call("GET", "/student/assignments", { token: studentToken })).data.assignments).toEqual([]);
  });
});

describe("institutions: plan limits", () => {
  it("exports the contract limits", () => {
    expect(PLAN_LIMITS.free).toEqual({ groups: 2, students: 60, activeAssignments: 10 });
    expect(PLAN_LIMITS.school.groups).toBe(30);
    expect(PLAN_LIMITS.school.students).toBe(1500);
    expect(PLAN_LIMITS.district).toEqual({ groups: null, students: null, activeAssignments: null });
  });

  it("free plan: third group is 409 PLAN_LIMIT; school plan lifts it", async () => {
    const { token, institution } = await teacherWithInstitution();
    await createGroup(token, "A");
    await createGroup(token, "B");
    const third = await call("POST", "/groups", { token, body: { name: "C", grade: 6 } });
    expect(third.status).toBe(409);
    expect(third.data).toMatchObject({ error: "PLAN_LIMIT", limit: 2, plan: "free" });
    db.exec("UPDATE institutions SET plan = 'school' WHERE id = ?", institution.id);
    expect((await call("POST", "/groups", { token, body: { name: "C", grade: 6 } })).status).toBe(201);
  });

  it("free plan: student 61 is refused across the institution, re-joins still work", async () => {
    const { token } = await teacherWithInstitution();
    const g1 = await createGroup(token, "A");
    const g2 = await createGroup(token, "B");
    for (let i = 0; i < 30; i++) expect((await join(g1.joinCode, `Ana ${i}`, `dev-a-${i}-xxxx`)).status).toBe(200);
    for (let i = 0; i < 30; i++) expect((await join(g2.joinCode, `Beto ${i}`, `dev-b-${i}-xxxx`)).status).toBe(200);
    const over = await join(g2.joinCode, "Carla", "dev-c-0-xxxx");
    expect(over.status).toBe(409);
    expect(over.data).toMatchObject({ error: "PLAN_LIMIT", limit: 60, plan: "free" });
    expect(db.rows("SELECT COUNT(*) AS c FROM students")[0].c).toBe(60);
    // An existing student re-joining is not a new seat.
    expect((await join(g1.joinCode, "Ana 0", "dev-a-0-xxxx")).status).toBe(200);
  });

  it("free plan: 11th active assignment is refused; past-due ones do not count", async () => {
    const { token } = await teacherWithInstitution();
    const g = await createGroup(token);
    for (let i = 0; i < 10; i++) {
      expect((await call("POST", `/groups/${g.id}/assignments`, { token, body: assignmentBody() })).status).toBe(201);
    }
    const over = await call("POST", `/groups/${g.id}/assignments`, { token, body: assignmentBody() });
    expect(over.status).toBe(409);
    expect(over.data).toMatchObject({ error: "PLAN_LIMIT", limit: 10, plan: "free" });

    db.exec("UPDATE assignments SET due_at = ? WHERE rowid IN (SELECT rowid FROM assignments LIMIT 1)", T0 / 1000 - 60);
    expect((await call("POST", `/groups/${g.id}/assignments`, { token, body: assignmentBody() })).status).toBe(201);
  });
});

describe("institutions: rate limits (D1 counted)", () => {
  it("5 login links per email per hour", async () => {
    for (let i = 0; i < 5; i++) {
      expect((await call("POST", "/auth/request", { body: { email: "a@b.co" } })).status).toBe(202);
    }
    const sixth = await call("POST", "/auth/request", { body: { email: "a@b.co" } });
    expect(sixth.status).toBe(429);
    expect(sixth.data.error).toBe("RATE_LIMITED");
    // Another email is unaffected.
    expect((await call("POST", "/auth/request", { body: { email: "c@d.co" } })).status).toBe(202);
    clock += 3600 * 1000 + 1000;
    expect((await call("POST", "/auth/request", { body: { email: "a@b.co" } })).status).toBe(202);
  });

  it(`${INST_RESULTS_PER_STUDENT_DAY} results per student per day`, async () => {
    const { token } = await teacherWithInstitution();
    const g = await createGroup(token);
    const studentToken = (await join(g.joinCode)).data.studentToken;
    const body = { source: "practice", subject: "lengua", grade: 6, total: 5, correct: 3, durationS: 120 };
    for (let i = 0; i < 60; i++) {
      expect((await call("POST", "/student/results", { token: studentToken, body })).status).toBe(201);
    }
    const over = await call("POST", "/student/results", { token: studentToken, body });
    expect(over.status).toBe(429);
    expect(over.data.error).toBe("RATE_LIMITED");
    clock += 24 * 3600 * 1000;
    expect((await call("POST", "/student/results", { token: studentToken, body })).status).toBe(201);
  });
});

describe("institutions: abuse limits (per IP / per code)", () => {
  it(`${INST_RATE_LIMITS.authRequestsPerIp} login links per IP per hour, across emails`, async () => {
    for (let i = 0; i < INST_RATE_LIMITS.authRequestsPerIp; i++) {
      expect((await call("POST", "/auth/request", { ip: "1.1.1.1", body: { email: `t${i}@b.co` } })).status).toBe(202);
    }
    const over = await call("POST", "/auth/request", { ip: "1.1.1.1", body: { email: "fresh@b.co" } });
    expect(over.status).toBe(429);
    expect(over.data.error).toBe("RATE_LIMITED");
    expect((await call("POST", "/auth/request", { ip: "2.2.2.2", body: { email: "fresh@b.co" } })).status).toBe(202);
    // Raw IPs are never stored.
    expect(db.rows("SELECT bucket FROM inst_rate_events").every((r) => !r.bucket.includes("1.1.1.1"))).toBe(true);
    clock += INST_RATE_LIMITS.windowS * 1000 + 1000;
    expect((await call("POST", "/auth/request", { ip: "1.1.1.1", body: { email: "fresh@b.co" } })).status).toBe(202);
  });

  it("unknown join codes lock out the guessing IP, not the classroom", async () => {
    const { token } = await teacherWithInstitution();
    const g = await createGroup(token);
    const wrong = g.joinCode === "AAAAAA" ? "BBBBBB" : "AAAAAA";
    const guess = (ip: string, joinCode: string) =>
      call("POST", "/join", { ip, body: { joinCode, nickname: "Lucía", anonymousId: `guess-${ip.replace(/\./g, "-")}-device` } });
    for (let i = 0; i < INST_RATE_LIMITS.joinMissesPerIp; i++) expect((await guess("6.6.6.6", wrong)).status).toBe(404);
    // Locked out even with the right code once the miss budget is spent.
    expect((await guess("6.6.6.6", wrong)).status).toBe(429);
    expect((await guess("6.6.6.6", g.joinCode)).status).toBe(429);
    // Another IP (the real classroom) still joins.
    expect((await guess("7.7.7.7", g.joinCode)).status).toBe(200);
  });

  it(`${INST_RATE_LIMITS.joinsPerCode} joins per code per hour`, async () => {
    const { token } = await teacherWithInstitution();
    const g = await createGroup(token);
    // Re-joins of one device keep the plan seat count at 1 while hitting the code limit.
    for (let i = 0; i < INST_RATE_LIMITS.joinsPerCode; i++) {
      expect((await join(g.joinCode, "Lucía", "same-device-01")).status).toBe(200);
    }
    const over = await join(g.joinCode, "Lucía", "same-device-01");
    expect(over.status).toBe(429);
    clock += INST_RATE_LIMITS.windowS * 1000 + 1000;
    expect((await join(g.joinCode, "Lucía", "same-device-01")).status).toBe(200);
  });

  it(`${INST_RATE_LIMITS.joinsPerIp} join requests per IP per hour`, async () => {
    const { token, institution } = await teacherWithInstitution();
    db.exec("UPDATE institutions SET plan = 'district' WHERE id = ?", institution.id);
    const g1 = await createGroup(token, "A");
    const g2 = await createGroup(token, "B");
    for (let i = 0; i < INST_RATE_LIMITS.joinsPerIp; i++) {
      const code = i % 2 === 0 ? g1.joinCode : g2.joinCode;
      expect((await call("POST", "/join", { ip: "9.9.9.9", body: { joinCode: code, nickname: "Ana", anonymousId: `ip-dev-${i}-xx` } })).status).toBe(200);
    }
    const over = await call("POST", "/join", { ip: "9.9.9.9", body: { joinCode: g1.joinCode, nickname: "Ana", anonymousId: "ip-dev-x-xx" } });
    expect(over.status).toBe(429);
  });
});

describe("institutions: validation", () => {
  it("join validates code, nickname (ranked charset, 2-24) and anonymousId", async () => {
    const { token } = await teacherWithInstitution();
    const g = await createGroup(token);
    expect((await join("ABC", "Lucía")).data.error).toBe("INVALID_JOIN_CODE");
    expect((await join("OOOOOO", "Lucía")).data.error).toBe("INVALID_JOIN_CODE");
    const unknownCode = g.joinCode === "AAAAAA" ? "BBBBBB" : "AAAAAA";
    expect((await join(unknownCode, "Lucía")).status).toBe(404);
    for (const nickname of ["L", "x".repeat(25), "<script>", "a=b", 7]) {
      const res = await call("POST", "/join", { body: { joinCode: g.joinCode, nickname, anonymousId: "device-12345" } });
      expect(res.status).toBe(400);
      expect(res.data.error).toBe("INVALID_NICKNAME");
    }
    expect((await join(g.joinCode, "Lu")).status).toBe(200);
    expect((await join(g.joinCode, "x".repeat(24))).status).toBe(200);
    expect((await call("POST", "/join", { body: { joinCode: g.joinCode, nickname: "Lucía", anonymousId: "short" } })).data.error).toBe(
      "INVALID_ANONYMOUS_ID"
    );
  });

  it("archived groups cannot be joined", async () => {
    const { token } = await teacherWithInstitution();
    const g = await createGroup(token);
    db.exec("UPDATE groups SET archived = 1 WHERE id = ?", g.id);
    expect((await join(g.joinCode)).status).toBe(404);
  });

  it("group, institution and assignment bodies", async () => {
    const t = await loginTeacher();
    for (const body of [
      { name: "X", country: "co", city: "Cali" },
      { name: "Colegio", country: "zz", city: "Cali" },
      { name: "Colegio", country: "co", city: "" },
    ]) {
      expect((await call("POST", "/institutions", { token: t, body })).status).toBe(400);
    }
    await call("POST", "/institutions", { token: t, body: { name: "Colegio", country: "mx", city: "Puebla" } });
    for (const body of [{ name: "", grade: 6 }, { name: "A", grade: 0 }, { name: "A", grade: 13 }, { name: "A", grade: "6" }, { name: "A", grade: 6.5 }]) {
      expect((await call("POST", "/groups", { token: t, body })).status).toBe(400);
    }
    const g = await createGroup(t);
    for (const over of [
      { questionCount: 9 },
      { questionCount: 61 },
      { title: "" },
      { country: "xx" },
      { subject: "Mate máticas" },
      { dueAt: "mañana" },
      { dueAt: 12345 },
      { grade: 0 },
    ]) {
      const res = await call("POST", `/groups/${g.id}/assignments`, { token: t, body: assignmentBody(over) });
      expect(res.status, JSON.stringify(over)).toBe(400);
    }
    const okNull = await call("POST", `/groups/${g.id}/assignments`, {
      token: t,
      body: assignmentBody({ subject: null, questionCount: 60 }),
    });
    expect(okNull.status).toBe(201);
    expect(okNull.data.subject).toBeNull();
    expect((await call("PATCH", "/me", { token: t, body: { name: "" } })).status).toBe(400);
  });

  it("student result ranges from the contract", async () => {
    const { token } = await teacherWithInstitution();
    const g = await createGroup(token);
    const studentToken = (await join(g.joinCode)).data.studentToken;
    const base = { source: "practice", grade: 6, total: 10, correct: 5, durationS: 60 };
    for (const over of [
      { correct: 11 },
      { correct: -1 },
      { total: 201, correct: 0 },
      { durationS: 14401 },
      { durationS: -1 },
      { source: "exam" },
      { source: "assignment" }, // needs assignmentId
      { assignmentId: "f".repeat(32) }, // only with source=assignment
      { grade: 0 },
      { total: 1.5 },
      { perArea: [] },
      { perArea: { a: { total: 2, correct: 3 } } },
      { perArea: Object.fromEntries(Array.from({ length: 21 }, (_, i) => [`a${i}`, { total: 1, correct: 1 }])) },
    ]) {
      const res = await call("POST", "/student/results", { token: studentToken, body: { ...base, ...over } });
      expect(res.status, JSON.stringify(over)).toBe(400);
    }
    expect((await call("POST", "/student/results", { token: studentToken, body: { ...base, total: 200, correct: 200, durationS: 14400 } })).status).toBe(201);
    expect((await call("POST", "/student/results", { token: studentToken, body: { ...base, total: 0, correct: 0 } })).status).toBe(201);
  });
});

describe("institutions: CSV", () => {
  it("csvCell neutralises formulas and quotes separators", () => {
    expect(csvCell("=1+1")).toBe("'=1+1");
    expect(csvCell("+57")).toBe("'+57");
    expect(csvCell("-3")).toBe("'-3");
    expect(csvCell("@SUM(A1)")).toBe("'@SUM(A1)");
    expect(csvCell("\tx")).toBe("'\tx");
    expect(csvCell('=HYPERLINK("http://x","y")')).toBe(`"'=HYPERLINK(""http://x"",""y"")"`);
    expect(csvCell("a,b")).toBe('"a,b"');
    expect(csvCell('di "hola"')).toBe('"di ""hola"""');
    expect(csvCell("línea\nnueva")).toBe('"línea\nnueva"');
    expect(csvCell(null)).toBe("");
    expect(csvCell(42)).toBe("42");
    expect(csvCell("Lucía")).toBe("Lucía");
  });

  it("exported file escapes nicknames and student codes", async () => {
    const { token } = await teacherWithInstitution();
    const g = await createGroup(token);
    const j = await join(g.joinCode, "-Pepe", "device-csv-1");
    await call("PATCH", `/groups/${g.id}/students/${j.data.student.id}`, {
      token,
      body: { studentCode: '=HYPERLINK("http://evil","x"),1' },
    });
    await call("POST", "/student/results", {
      token: j.data.studentToken,
      body: { source: "practice", subject: "ingles", grade: 6, total: 3, correct: 2, durationS: 30 },
    });
    const csv = await call("GET", `/groups/${g.id}/results.csv`, { token });
    const line = csv.text.slice(1).split("\r\n")[1];
    expect(line).toBe(
      `'-Pepe,"'=HYPERLINK(""http://evil"",""x""),1",practice,ingles,3,2,66.7,30,${new Date(T0).toISOString()}`
    );
  });
});

describe("institutions: deleting student data", () => {
  it("student leave deletes the student, their results and their session", async () => {
    const { token } = await teacherWithInstitution();
    const g = await createGroup(token);
    const keep = await join(g.joinCode, "Otro", "device-keep-1");
    const j = await join(g.joinCode, "Lucía", "device-leave-1");
    const body = { source: "practice", grade: 6, total: 4, correct: 2, durationS: 40 };
    await call("POST", "/student/results", { token: j.data.studentToken, body });
    await call("POST", "/student/results", { token: keep.data.studentToken, body });

    const leave = await call("POST", "/student/leave", { token: j.data.studentToken });
    expect(leave.status).toBe(204);
    expect(db.rows("SELECT * FROM students WHERE id = ?", j.data.student.id)).toHaveLength(0);
    expect(db.rows("SELECT * FROM results WHERE student_id = ?", j.data.student.id)).toHaveLength(0);
    expect(db.rows("SELECT * FROM inst_sessions WHERE subject_id = ?", j.data.student.id)).toHaveLength(0);
    expect((await call("GET", "/student/me", { token: j.data.studentToken })).status).toBe(401);
    // Classmates are untouched.
    expect(db.rows("SELECT * FROM results")).toHaveLength(1);
    expect((await call("GET", "/student/me", { token: keep.data.studentToken })).status).toBe(200);
  });

  it("teacher DELETE removes the student and their results and invalidates their token", async () => {
    const { token } = await teacherWithInstitution();
    const g = await createGroup(token);
    const j = await join(g.joinCode);
    await call("POST", "/student/results", {
      token: j.data.studentToken,
      body: { source: "practice", grade: 6, total: 4, correct: 2, durationS: 40 },
    });
    const res = await call("DELETE", `/groups/${g.id}/students/${j.data.student.id}`, { token });
    expect(res.status).toBe(204);
    expect(db.rows("SELECT * FROM results")).toHaveLength(0);
    expect(db.rows("SELECT * FROM students")).toHaveLength(0);
    expect((await call("GET", "/student/me", { token: j.data.studentToken })).status).toBe(401);
  });
});

describe("institutions: plumbing", () => {
  it("CORS preflight allows PATCH and DELETE", async () => {
    const res = await worker.fetch(
      new Request("https://api.saberparatodos.space/v1/inst/groups", {
        method: "OPTIONS",
        headers: { Origin: "https://saberparatodos.space" },
      }),
      env
    );
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("PATCH");
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("DELETE");
    expect(res.headers.get("Access-Control-Allow-Headers")).toContain("authorization");
  });

  it("503 without the D1 binding and 404 for unknown paths", async () => {
    expect((await call("GET", "/nope")).status).toBe(404);
    delete env.RANKED_DB;
    expect((await call("GET", "/me")).data.error).toBe("INST_UNAVAILABLE");
  });

  it("token helpers", () => {
    const codes = new Set(Array.from({ length: 200 }, () => newJoinCode()));
    for (const code of codes) expect(code).toMatch(/^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/);
    expect(codes.size).toBeGreaterThan(190);
    expect(timingSafeEqual("abc", "abc")).toBe(true);
    expect(timingSafeEqual("abc", "abd")).toBe(false);
    expect(timingSafeEqual("abc", "abcd")).toBe(false);
  });

  it("magic-link email escapes the link in HTML", () => {
    const mail = buildMagicLinkEmail("a@b.co", 'https://x.co/?token=1&a="b"', 15);
    expect(mail.html).toContain("token=1&amp;a=&quot;b&quot;");
    expect(mail.text).toContain('https://x.co/?token=1&a="b"');
    expect(mail.text).toContain("15 minutos");
  });

  it("ranked nickname rule is unchanged by the shared helper", () => {
    expect(isValidNickname("ab")).toBe(false);
    expect(isValidNickname("abc")).toBe(true);
    expect(isValidNickname("  abc  ")).toBe(true);
    expect(isValidNickname("x".repeat(20))).toBe(true);
    expect(isValidNickname("x".repeat(21))).toBe(false);
    expect(isValidNickname("José_Ñ-1")).toBe(true);
    expect(isValidNickname("a<b>c")).toBe(false);
    expect(isValidNickname(123)).toBe(false);
    expect(isValidNickname("ab", 2, 24)).toBe(true);
  });
});
