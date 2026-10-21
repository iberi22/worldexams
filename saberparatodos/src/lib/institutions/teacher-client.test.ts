import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  InstApiError,
  TEACHER_SESSION_KEY,
  canCreateGroup,
  clearTeacherSession,
  createTeacherClient,
  INSTITUTION_COUNTRIES,
  dueDateToIso,
  formatDate,
  isInstitutionCountry,
  isUnauthorized,
  joinUrl,
  loadTeacherSession,
  planUsageLabel,
  resolveInstApiBase,
  saveTeacherSession,
  teacherErrorMessage,
  parseTimestamp,
} from './teacher-client';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('resolveInstApiBase', () => {
  it.each([
    ['https://api.saberparatodos.space/v1', 'https://api.saberparatodos.space/v1/inst'],
    ['https://api.saberparatodos.space', 'https://api.saberparatodos.space/v1/inst'],
    ['https://api.saberparatodos.space/v1/', 'https://api.saberparatodos.space/v1/inst'],
    ['http://localhost:8787/v1', 'http://localhost:8787/v1/inst'],
    ['/api', 'https://api.saberparatodos.space/v1/inst'],
    [undefined, 'https://api.saberparatodos.space/v1/inst'],
  ])('%s → %s', (raw, expected) => {
    expect(resolveInstApiBase(raw)).toBe(expected);
  });

  it('never duplicates /v1', () => {
    expect(resolveInstApiBase('https://api.saberparatodos.space/v1/v1')).not.toContain('/v1/v1');
  });
});

describe('session storage', () => {
  it('round-trips the token under inst.teacher.session', () => {
    saveTeacherSession('abc');
    expect(localStorage.getItem(TEACHER_SESSION_KEY)).toBe('abc');
    expect(loadTeacherSession()).toBe('abc');
    clearTeacherSession();
    expect(loadTeacherSession()).toBeNull();
  });

  it('survives a storage that throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => saveTeacherSession('x')).not.toThrow();
    expect(loadTeacherSession()).toBeNull();
  });
});

describe('createTeacherClient', () => {
  const base = 'https://api.test/v1/inst';

  it('sends the bearer token and JSON body', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ id: 'g1', name: '11-A', grade: 11, joinCode: 'ABC234' }, 201));
    const client = createTeacherClient({ baseUrl: base, fetch: fetchMock, getToken: () => 'tok' });
    const group = await client.createGroup({ name: '11-A', grade: 11 });

    expect(group.joinCode).toBe('ABC234');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${base}/groups`);
    expect(init.method).toBe('POST');
    expect(init.headers.Authorization).toBe('Bearer tok');
    expect(JSON.parse(init.body)).toEqual({ name: '11-A', grade: 11 });
  });

  it('omits Authorization without a session and posts the email', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }, 202));
    const client = createTeacherClient({ baseUrl: base, fetch: fetchMock, getToken: () => null });
    await client.requestLogin('profe@colegio.edu');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${base}/auth/request`);
    expect(init.headers.Authorization).toBeUndefined();
    expect(JSON.parse(init.body)).toEqual({ email: 'profe@colegio.edu' });
  });

  it('unwraps list endpoints and encodes ids and query params', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ groups: [{ id: 'g1' }] }))
      .mockResolvedValueOnce(jsonResponse({ rows: [], summary: { students: 0, avgPct: null, bySubject: {} } }));
    const client = createTeacherClient({ baseUrl: base, fetch: fetchMock, getToken: () => 't' });
    expect(await client.listGroups()).toEqual([{ id: 'g1' }]);
    await client.getResults('g/1', 'a 1');
    expect(fetchMock.mock.calls[1][0]).toBe(`${base}/groups/g%2F1/results?assignmentId=a+1`);
  });

  it('downloads the CSV as a blob with the session header', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('﻿nickname\n', { headers: { 'Content-Type': 'text/csv' } }));
    const client = createTeacherClient({ baseUrl: base, fetch: fetchMock, getToken: () => 't' });
    const blob = await client.downloadResultsCsv('g1');
    expect(fetchMock.mock.calls[0][0]).toBe(`${base}/groups/g1/results.csv`);
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe('Bearer t');
    expect(await blob.text()).toContain('nickname');
  });

  it('maps contract error codes', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ error: 'PLAN_LIMIT', resource: 'groups' }, 409));
    const client = createTeacherClient({ baseUrl: base, fetch: fetchMock, getToken: () => 't' });
    const error = await client.createGroup({ name: 'x', grade: 6 }).catch((e) => e);
    expect(error).toBeInstanceOf(InstApiError);
    expect(error.code).toBe('PLAN_LIMIT');
    expect(error.resource).toBe('groups');
    expect(teacherErrorMessage(error)).toMatch(/límite de grupos/);
  });

  it('flags 401 as unauthorized even without a body', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('', { status: 401 }));
    const client = createTeacherClient({ baseUrl: base, fetch: fetchMock, getToken: () => 't' });
    const error = await client.me().catch((e) => e);
    expect(isUnauthorized(error)).toBe(true);
    expect(teacherErrorMessage(error)).toMatch(/sesión expiró/);
  });

  it('reports network failures in Spanish', async () => {
    const client = createTeacherClient({ baseUrl: base, fetch: vi.fn().mockRejectedValue(new TypeError('x')) });
    const error = await client.listGroups().catch((e) => e);
    expect(error.code).toBe('NETWORK');
    expect(teacherErrorMessage(error)).toMatch(/conexión/);
  });
});

describe('helpers', () => {
  it('messages for EMAIL_UNAVAILABLE and FORBIDDEN', () => {
    expect(teacherErrorMessage(new InstApiError(503, 'EMAIL_UNAVAILABLE'))).toMatch(/correos no está disponible/);
    expect(teacherErrorMessage(new InstApiError(403, 'FORBIDDEN'))).toMatch(/No tienes permiso/);
    expect(teacherErrorMessage(new Error('boom'))).toMatch(/inesperado/);
  });

  it('plan usage label', () => {
    expect(planUsageLabel('free', 2)).toBe('2 de 2 grupos en plan gratuito');
    expect(canCreateGroup('free', 2)).toBe(false);
    expect(canCreateGroup('school', 2)).toBe(true);
    expect(planUsageLabel('district', 5)).toContain('sin límite');
  });

  it('parses ISO-8601 timestamps from the API', () => {
    expect(parseTimestamp('2026-10-21T05:00:00.000Z')).toBe(Date.UTC(2026, 9, 21, 5));
    expect(parseTimestamp('2026-10-21T05:00:00Z')).toBe(Date.UTC(2026, 9, 21, 5));
    expect(parseTimestamp(null)).toBeNull();
    expect(parseTimestamp('nope')).toBeNull();
    expect(formatDate('2026-10-21T12:00:00Z')).toMatch(/21/);
    expect(formatDate('2026-10-21T12:00:00Z')).not.toBe('—');
    expect(formatDate(null)).toBe('—');
  });

  it('due dates go out as ISO-8601 strings, never numbers', () => {
    expect(dueDateToIso('bad')).toBeNull();
    const due = dueDateToIso('2026-11-03') as string;
    expect(typeof due).toBe('string');
    expect(due).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    const local = new Date(due);
    expect([local.getFullYear(), local.getMonth(), local.getDate(), local.getHours()]).toEqual([2026, 10, 3, 23]);
  });

  it('join url points at the student panel in /perfil', () => {
    expect(joinUrl('ABC234', 'https://saberparatodos.space/')).toBe(
      'https://saberparatodos.space/perfil?colegio=ABC234#mi-colegio'
    );
  });

  it('only the API countries are accepted', () => {
    expect(INSTITUTION_COUNTRIES).toHaveLength(20);
    expect(isInstitutionCountry('CO')).toBe(true);
    expect(isInstitutionCountry('us')).toBe(false);
    expect(isInstitutionCountry('US')).toBe(false);
  });

  it('PLAN_LIMIT message names the exhausted resource', () => {
    expect(teacherErrorMessage(new InstApiError(409, 'PLAN_LIMIT', undefined, 'students'))).toMatch(/límite de estudiantes/);
    expect(teacherErrorMessage(new InstApiError(409, 'PLAN_LIMIT', undefined, 'activeAssignments'))).toMatch(/tareas activas/);
    expect(teacherErrorMessage(new InstApiError(409, 'PLAN_LIMIT', undefined, 'groups'))).toMatch(/límite de grupos/);
  });

  it('verify errors keep their specific message despite 401', () => {
    expect(teacherErrorMessage(new InstApiError(401, 'TOKEN_USED'))).toMatch(/ya se usó/);
    expect(teacherErrorMessage(new InstApiError(401, 'TOKEN_EXPIRED'))).toMatch(/expiró/);
  });
});
