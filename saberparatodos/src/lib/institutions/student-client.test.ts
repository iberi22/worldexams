import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  STUDENT_SESSION_KEY,
  RESULT_QUEUE_KEY,
  RESULT_QUEUE_MAX,
  getInstitutionsApiBase,
  normalizeJoinCode,
  isValidJoinCode,
  hasAmbiguousChars,
  isValidNickname,
  suggestNickname,
  joinGroup,
  getStudentSession,
  isJoined,
  setShareWithSchool,
  fetchAssignments,
  leaveGroup,
  submitResult,
  enqueueResult,
  getQueuedResults,
  flushResultQueue,
  InstitutionError,
  type StudentResultInput
} from './student-client';
import { getStoredAgreements, getActiveAgreementForInstitution, revokeAgreement } from '../institution-handshake';

const JOIN_RESPONSE = {
  studentToken: 'tok_abc',
  student: { id: 'stu_1', nickname: 'Lince' },
  group: { id: 'grp_1', name: '7A', grade: 7 },
  institution: { name: 'Colegio Andino', country: 'co' }
};

function jsonResponse(status: number, body?: unknown): Response {
  return new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

const RESULT: StudentResultInput = { source: 'practice', grade: 7, total: 10, correct: 7, durationS: 300 };

let fetchMock: ReturnType<typeof vi.fn>;

function setOnline(value: boolean) {
  Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => value });
}

async function joinWithMock() {
  fetchMock.mockResolvedValueOnce(jsonResponse(200, JOIN_RESPONSE));
  return joinGroup('abc-def', 'Lince');
}

beforeEach(() => {
  localStorage.clear();
  fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
  setOnline(true);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('student-client: helpers', () => {
  it('builds the API base from the origin, never /v1/v1', () => {
    const base = getInstitutionsApiBase();
    expect(base).toMatch(/^https?:\/\/[^/]+\/v1\/inst$/);
    expect(base).not.toContain('/v1/v1');
  });

  it('normalizes join codes (case, separators) and flags ambiguous chars', () => {
    expect(normalizeJoinCode(' abc-d ef ')).toBe('ABCDEF');
    expect(isValidJoinCode('ABCDEF')).toBe(true);
    expect(isValidJoinCode('ABCDE')).toBe(false);
    expect(isValidJoinCode('ABCDE0')).toBe(false);
    expect(hasAmbiguousChars('AB1DE0')).toBe(true);
    expect(hasAmbiguousChars('ABCDEF')).toBe(false);
  });

  it('validates nicknames like the contract (2–24 chars)', () => {
    expect(isValidNickname('Al')).toBe(true);
    expect(isValidNickname('A')).toBe(false);
    expect(isValidNickname('x'.repeat(25))).toBe(false);
    expect(isValidNickname('<script>')).toBe(false);
  });

  it('prefills the nickname from the existing ranked nickname', () => {
    localStorage.setItem('worldexams_ranked_nickname', 'Puma Veloz');
    expect(suggestNickname()).toBe('Puma Veloz');
  });
});

describe('student-client: join / leave', () => {
  it('join stores the token and turns sharing on by default', async () => {
    const session = await joinWithMock();

    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toMatch(/\/v1\/inst\/join$/);
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ joinCode: 'ABCDEF', nickname: 'Lince' });
    expect(body.anonymousId).toMatch(/^dev_/);

    expect(session.token).toBe('tok_abc');
    expect(session.shareWithSchool).toBe(true);
    expect(JSON.parse(localStorage.getItem(STUDENT_SESSION_KEY)!).token).toBe('tok_abc');
    expect(isJoined()).toBe(true);
  });

  it('rejects an invalid code without calling the API', async () => {
    await expect(joinGroup('AB0', 'Lince')).rejects.toBeInstanceOf(InstitutionError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends the bearer token on student endpoints', async () => {
    await joinWithMock();
    fetchMock.mockResolvedValueOnce(jsonResponse(200, { assignments: [{ id: 'a1', done: false }] }));
    const list = await fetchAssignments();
    expect(list).toHaveLength(1);
    expect(fetchMock.mock.calls[1][1].headers.Authorization).toBe('Bearer tok_abc');
  });

  it('a 401 drops the local session', async () => {
    await joinWithMock();
    fetchMock.mockResolvedValueOnce(jsonResponse(401, { error: 'UNAUTHORIZED' }));
    await expect(fetchAssignments()).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
    expect(isJoined()).toBe(false);
  });

  it('leave calls /student/leave and clears local state (token, switch, queue)', async () => {
    await joinWithMock();
    enqueueResult({ clientId: 'c1', body: RESULT, queuedAt: 1 });
    fetchMock.mockResolvedValueOnce(jsonResponse(204));

    await leaveGroup();

    const [url, init] = fetchMock.mock.calls[1];
    expect(String(url)).toMatch(/\/v1\/inst\/student\/leave$/);
    expect(init.method).toBe('POST');
    expect(localStorage.getItem(STUDENT_SESSION_KEY)).toBeNull();
    expect(localStorage.getItem(RESULT_QUEUE_KEY)).toBeNull();
    expect(getStudentSession()).toBeNull();
  });

  it('leave still clears local state when offline', async () => {
    await joinWithMock();
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    await leaveGroup();
    expect(isJoined()).toBe(false);
  });
});

describe('student-client: results and offline queue', () => {
  it('does not send anything when not joined', async () => {
    expect(await submitResult(RESULT)).toBe('skipped');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(getQueuedResults()).toHaveLength(0);
  });

  it('does not send anything when sharing is off', async () => {
    await joinWithMock();
    setShareWithSchool(false);
    expect(await submitResult(RESULT)).toBe('skipped');
    expect(fetchMock).toHaveBeenCalledTimes(1); // only the join
  });

  it('queues while offline and flushes when back online', async () => {
    await joinWithMock();
    setOnline(false);
    expect(await submitResult(RESULT, 'c1')).toBe('queued');
    expect(await submitResult({ ...RESULT, correct: 9 }, 'c2')).toBe('queued');
    expect(fetchMock).toHaveBeenCalledTimes(1);

    setOnline(true);
    fetchMock.mockResolvedValue(jsonResponse(201, { id: 'r' }));
    expect(await flushResultQueue()).toBe(2);
    expect(getQueuedResults()).toHaveLength(0);
    const sentBodies = fetchMock.mock.calls.slice(1).map((c) => JSON.parse(c[1].body));
    expect(sentBodies.map((b) => b.correct)).toEqual([7, 9]);
  });

  it('queues when the API is down and keeps the item for later', async () => {
    await joinWithMock();
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    expect(await submitResult(RESULT, 'c1')).toBe('queued');

    fetchMock.mockResolvedValueOnce(jsonResponse(503, { error: 'UNAVAILABLE' }));
    expect(await flushResultQueue()).toBe(0);
    expect(getQueuedResults()).toHaveLength(1);
  });

  it('dedupes by client id and caps the queue at 50', () => {
    enqueueResult({ clientId: 'same', body: RESULT, queuedAt: 1 });
    enqueueResult({ clientId: 'same', body: RESULT, queuedAt: 2 });
    expect(getQueuedResults()).toHaveLength(1);

    for (let i = 0; i < RESULT_QUEUE_MAX + 10; i++) {
      enqueueResult({ clientId: `c${i}`, body: RESULT, queuedAt: i });
    }
    const queue = getQueuedResults();
    expect(queue).toHaveLength(RESULT_QUEUE_MAX);
    expect(queue[queue.length - 1].clientId).toBe(`c${RESULT_QUEUE_MAX + 9}`);
  });

  it('flushing without a session discards the queue and sends nothing', async () => {
    enqueueResult({ clientId: 'c1', body: RESULT, queuedAt: 1 });
    expect(await flushResultQueue()).toBe(0);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(getQueuedResults()).toHaveLength(0);
  });

  it('drops an item the API rejects as invalid instead of retrying forever', async () => {
    await joinWithMock();
    enqueueResult({ clientId: 'bad', body: RESULT, queuedAt: 1 });
    enqueueResult({ clientId: 'good', body: RESULT, queuedAt: 2 });
    fetchMock
      .mockResolvedValueOnce(jsonResponse(400, { error: 'BAD_REQUEST' }))
      .mockResolvedValueOnce(jsonResponse(201, { id: 'r' }));
    expect(await flushResultQueue()).toBe(1);
    expect(getQueuedResults()).toHaveLength(0);
  });
});

describe('institution-handshake on top of the client', () => {
  it('keeps legacy local agreements readable, including malformed storage', () => {
    localStorage.setItem(
      'worldexams_institution_agreements',
      JSON.stringify([{ agreementId: 'agr_x', institutionId: 'COL-1', status: 'active', expiresAt: '2999-01-01' }, null, 42])
    );
    const stored = getStoredAgreements();
    expect(stored).toHaveLength(1);
    expect(stored[0].scope).toEqual(['all']);

    localStorage.setItem('worldexams_institution_agreements', '{not json');
    expect(() => getStoredAgreements()).not.toThrow();
  });

  it('exposes the joined group as an agreement that follows the sharing switch', async () => {
    await joinWithMock();
    const active = getActiveAgreementForInstitution('grp_1');
    expect(active?.source).toBe('joined');
    expect(active?.institutionName).toContain('Colegio Andino');

    expect(revokeAgreement(active!.agreementId)).toBe(true);
    expect(getStudentSession()?.shareWithSchool).toBe(false);
    expect(getActiveAgreementForInstitution('grp_1')).toBeNull();
  });
});
