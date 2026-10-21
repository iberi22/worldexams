/**
 * In-memory implementation of `TeacherApi` that follows docs/institutions/CONTRACT.md.
 * Used by the component tests and by the panel when `PUBLIC_INST_MOCK=1` (local only),
 * so the teacher side works before the API (W2.04) is deployed.
 */
import { InstApiError, PLAN_LIMITS, isInstitutionCountry } from './teacher-client';
import type {
  Assignment,
  Group,
  Institution,
  InstitutionPlan,
  ResultRow,
  Student,
  Teacher,
  TeacherApi,
} from './types';

const JOIN_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export interface MockState {
  teacher: Teacher | null;
  institution: Institution | null;
  sessionToken: string | null;
  groups: Group[];
  students: Record<string, Student[]>;
  assignments: Record<string, Assignment[]>;
  results: Record<string, ResultRow[]>;
}

export interface MockOptions {
  plan?: InstitutionPlan;
  /** Make `/auth/request` answer `503 EMAIL_UNAVAILABLE`. */
  emailUnavailable?: boolean;
  /** Start already signed in with an institution and one group with data. */
  seeded?: boolean;
}

/** ISO-8601 UTC string `offsetS` seconds from now, like the API returns. */
function isoAt(offsetS = 0): string {
  return new Date(Date.now() + offsetS * 1000).toISOString();
}

let counter = 0;
function id(prefix: string): string {
  counter += 1;
  return `${prefix}_${counter.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function joinCode(): string {
  let code = '';
  for (let i = 0; i < 6; i++) code += JOIN_ALPHABET[Math.floor(Math.random() * JOIN_ALPHABET.length)];
  return code;
}

function pct(correct: number, total: number): number {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

export function createMockTeacherApi(options: MockOptions = {}): TeacherApi & { state: MockState } {
  const state: MockState = {
    teacher: null,
    institution: null,
    sessionToken: null,
    groups: [],
    students: {},
    assignments: {},
    results: {},
  };

  if (options.seeded) {
    state.teacher = { id: 't_demo', email: 'docente@colegio.edu', name: 'Docente Demo', role: 'owner' };
    state.institution = {
      id: 'i_demo',
      name: 'Colegio Demo',
      country: 'co',
      city: 'Bogotá',
      plan: options.plan ?? 'free',
    };
    state.sessionToken = 'mock-session';
    const group: Group = { id: 'g_demo', name: '11-A', grade: 11, joinCode: 'K7M2QX', createdAt: isoAt() };
    state.groups.push(group);
    state.students[group.id] = [
      { id: 's_1', nickname: 'Luna', studentCode: '1101', joinedAt: isoAt(-86400 * 5), lastResultAt: isoAt(-3600), avgPct: 0 },
      { id: 's_2', nickname: 'Tito', studentCode: null, joinedAt: isoAt(-86400 * 4), lastResultAt: isoAt(-7200), avgPct: 0 },
    ];
    state.assignments[group.id] = [
      {
        id: 'a_1',
        groupId: group.id,
        title: 'Repaso de funciones',
        country: 'co',
        grade: 11,
        subject: 'matematicas',
        questionCount: 20,
        dueAt: isoAt(86400 * 3),
        createdAt: isoAt(-86400),
      },
    ];
    state.results[group.id] = [
      row('s_1', 'Luna', '1101', 'assignment', 'matematicas', 20, 16, 900, isoAt(-3600)),
      row('s_2', 'Tito', null, 'assignment', 'matematicas', 20, 11, 1200, isoAt(-7200)),
      row('s_1', 'Luna', '1101', 'practice', 'lectura-critica', 10, 9, 400, isoAt(-9000)),
    ];
  }

  function row(
    studentId: string,
    nickname: string,
    studentCode: string | null,
    source: ResultRow['source'],
    subject: string | null,
    total: number,
    correct: number,
    durationS: number,
    createdAt: string
  ): ResultRow {
    return { studentId, nickname, studentCode, source, subject, total, correct, pct: pct(correct, total), durationS, createdAt };
  }

  function requireTeacher(): Teacher {
    if (!state.teacher || !state.sessionToken) throw new InstApiError(401, 'UNAUTHORIZED');
    return state.teacher;
  }

  function requireInstitution(): Institution {
    requireTeacher();
    if (!state.institution) throw new InstApiError(403, 'FORBIDDEN');
    return state.institution;
  }

  function requireGroup(groupId: string): Group {
    requireInstitution();
    const group = state.groups.find((g) => g.id === groupId);
    if (!group) throw new InstApiError(403, 'FORBIDDEN');
    return group;
  }

  const pendingTokens = new Map<string, string>();

  return {
    state,

    async requestLogin(email) {
      if (options.emailUnavailable) throw new InstApiError(503, 'EMAIL_UNAVAILABLE');
      const token = id('login');
      pendingTokens.set(token, email.trim().toLowerCase());
      return { ok: true, devToken: token };
    },

    async verify(token) {
      const email = pendingTokens.get(token) ?? (token === 'demo' ? 'docente@colegio.edu' : null);
      if (!email) throw new InstApiError(401, 'INVALID_TOKEN');
      pendingTokens.delete(token);
      if (!state.teacher || state.teacher.email !== email) {
        state.teacher = { id: id('t'), email, name: '', role: 'teacher' };
      }
      state.sessionToken = id('session');
      return { sessionToken: state.sessionToken, teacher: state.teacher, institution: state.institution };
    },

    async me() {
      return { teacher: requireTeacher(), institution: state.institution };
    },

    async logout() {
      state.sessionToken = null;
    },

    async updateMe({ name }) {
      const teacher = requireTeacher();
      teacher.name = name;
      return { teacher };
    },

    async createInstitution({ name, country, city }) {
      const teacher = requireTeacher();
      if (state.institution) throw new InstApiError(409, 'INSTITUTION_EXISTS');
      if (!isInstitutionCountry(country)) throw new InstApiError(400, 'INVALID_INPUT');
      state.institution = { id: id('i'), name, country: country.toLowerCase(), city, plan: options.plan ?? 'free', createdAt: isoAt() };
      teacher.role = 'owner';
      return state.institution;
    },

    async createGroup({ name, grade }) {
      requireTeacher();
      if (!state.institution) throw new InstApiError(409, 'NO_INSTITUTION');
      const institution = state.institution;
      if (state.groups.length >= PLAN_LIMITS[institution.plan].groups) {
        throw new InstApiError(409, 'PLAN_LIMIT', undefined, 'groups');
      }
      const group: Group = { id: id('g'), name, grade, joinCode: joinCode(), createdAt: isoAt() };
      state.groups.push(group);
      state.students[group.id] = [];
      state.assignments[group.id] = [];
      state.results[group.id] = [];
      return { ...group, studentCount: 0, assignmentCount: 0 };
    },

    async listGroups() {
      requireTeacher();
      if (!state.institution) return [];
      return state.groups.map((g) => ({
        ...g,
        studentCount: state.students[g.id]?.length ?? 0,
        assignmentCount: state.assignments[g.id]?.length ?? 0,
      }));
    },

    async listStudents(groupId) {
      requireGroup(groupId);
      const results = state.results[groupId] ?? [];
      return (state.students[groupId] ?? []).map((s) => {
        const mine = results.filter((r) => r.studentId === s.id);
        const total = mine.reduce((acc, r) => acc + r.total, 0);
        const correct = mine.reduce((acc, r) => acc + r.correct, 0);
        return {
          ...s,
          avgPct: mine.length ? pct(correct, total) : null,
          lastResultAt: mine.length ? mine.map((r) => r.createdAt).sort().at(-1) ?? null : null,
        };
      });
    },

    async updateStudentCode(groupId, studentId, studentCode) {
      requireGroup(groupId);
      const student = state.students[groupId]?.find((s) => s.id === studentId);
      if (!student) throw new InstApiError(404, 'NOT_FOUND');
      student.studentCode = studentCode;
      for (const r of state.results[groupId] ?? []) if (r.studentId === studentId) r.studentCode = studentCode;
    },

    async removeStudent(groupId, studentId) {
      requireGroup(groupId);
      state.students[groupId] = (state.students[groupId] ?? []).filter((s) => s.id !== studentId);
      state.results[groupId] = (state.results[groupId] ?? []).filter((r) => r.studentId !== studentId);
    },

    async createAssignment(groupId, input) {
      const group = requireGroup(groupId);
      const institution = requireInstitution();
      if (input.dueAt !== null && (typeof input.dueAt !== 'string' || Number.isNaN(Date.parse(input.dueAt)))) {
        throw new InstApiError(400, 'INVALID_INPUT');
      }
      const now = Date.now();
      const active = Object.values(state.assignments)
        .flat()
        .filter((a) => a.dueAt === null || Date.parse(a.dueAt) > now).length;
      if (active >= PLAN_LIMITS[institution.plan].activeAssignments) {
        throw new InstApiError(409, 'PLAN_LIMIT', undefined, 'activeAssignments');
      }
      if (input.questionCount < 10 || input.questionCount > 60) throw new InstApiError(400, 'INVALID_INPUT');
      const assignment: Assignment = { ...input, id: id('a'), groupId: group.id, createdAt: isoAt(), completedCount: 0 };
      state.assignments[groupId] = [...(state.assignments[groupId] ?? []), assignment];
      return assignment;
    },

    async listAssignments(groupId) {
      requireGroup(groupId);
      const results = state.results[groupId] ?? [];
      return (state.assignments[groupId] ?? []).map((a) => ({
        ...a,
        completedCount: new Set(results.filter((r) => r.source === 'assignment' && r.subject === a.subject).map((r) => r.studentId)).size,
      }));
    },

    async getResults(groupId, assignmentId) {
      requireGroup(groupId);
      const assignment = assignmentId ? state.assignments[groupId]?.find((a) => a.id === assignmentId) : undefined;
      const rows = (state.results[groupId] ?? []).filter(
        (r) => !assignmentId || (r.source === 'assignment' && r.subject === assignment?.subject)
      );
      const bySubject: Record<string, { avgPct: number; n: number }> = {};
      for (const r of rows) {
        const key = r.subject ?? 'general';
        const entry = bySubject[key] ?? { avgPct: 0, n: 0 };
        entry.avgPct = Math.round((entry.avgPct * entry.n + r.pct) / (entry.n + 1));
        entry.n += 1;
        bySubject[key] = entry;
      }
      const avgPct = rows.length ? Math.round(rows.reduce((acc, r) => acc + r.pct, 0) / rows.length) : null;
      rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return { rows, summary: { students: new Set(rows.map((r) => r.studentId)).size, avgPct, bySubject }, truncated: false };
    },

    async downloadResultsCsv(groupId) {
      requireGroup(groupId);
      const header = 'nickname,student_code,source,subject,total,correct,pct,duration_s,created_at_iso';
      const lines = (state.results[groupId] ?? []).map((r) =>
        [r.nickname, r.studentCode ?? '', r.source, r.subject ?? '', r.total, r.correct, r.pct, r.durationS, r.createdAt].join(',')
      );
      return new Blob(['﻿' + [header, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
    },
  };
}
