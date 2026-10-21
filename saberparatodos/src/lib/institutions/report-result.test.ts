import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { reportResultToSchool, markAssignmentStarted, perAreaFromAnswers, PENDING_ASSIGNMENT_KEY } from './report-result';
import { STUDENT_SESSION_KEY, getQueuedResults, setShareWithSchool } from './student-client';

const SESSION = {
  token: 'tok_abc',
  student: { id: 'stu_1', nickname: 'Lince' },
  group: { id: 'grp_1', name: '7A', grade: 7 },
  institution: { name: 'Colegio Andino', country: 'co' },
  joinedAt: '2026-10-01T00:00:00.000Z',
  shareWithSchool: true
};

let fetchMock: ReturnType<typeof vi.fn>;

function joined() {
  localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(SESSION));
}

function sentBodies() {
  return fetchMock.mock.calls.map((c) => JSON.parse(c[1].body));
}

beforeEach(() => {
  localStorage.clear();
  fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 'r1' }), { status: 201 }));
  vi.stubGlobal('fetch', fetchMock);
  Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => true });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('reportResultToSchool', () => {
  it('never sends anything when the student has not joined', async () => {
    const outcome = await reportResultToSchool({ source: 'practice', subject: 'matematicas', grade: 7, total: 10, correct: 8, durationS: 120 });
    expect(outcome).toBe('skipped');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(getQueuedResults()).toHaveLength(0);
  });

  it('never sends anything when sharing is off', async () => {
    joined();
    setShareWithSchool(false);
    const outcome = await reportResultToSchool({ source: 'neurogym', total: 9, correct: 6, durationS: 400 });
    expect(outcome).toBe('skipped');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('never reports ranked exams, even when joined and sharing', async () => {
    joined();
    const outcome = await reportResultToSchool({ source: 'practice', grade: 7, total: 40, correct: 30, durationS: 2400, ranked: true });
    expect(outcome).toBe('skipped');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(getQueuedResults()).toHaveLength(0);
  });

  it('sends a practice result with the contract fields', async () => {
    joined();
    const outcome = await reportResultToSchool({
      source: 'practice',
      subject: 'matematicas',
      grade: 7,
      total: 10,
      correct: 8,
      durationS: 125.6,
      perArea: { Numerico: { total: 10, correct: 8 } }
    });
    expect(outcome).toBe('sent');
    expect(String(fetchMock.mock.calls[0][0])).toMatch(/\/v1\/inst\/student\/results$/);
    expect(sentBodies()[0]).toEqual({
      source: 'practice',
      subject: 'matematicas',
      grade: 7,
      total: 10,
      correct: 8,
      durationS: 126,
      perArea: { Numerico: { total: 10, correct: 8 } }
    });
  });

  it('uses the group grade when NeuroGym has none and clamps values', async () => {
    joined();
    await reportResultToSchool({ source: 'neurogym', total: 9, correct: 12, durationS: 99999 });
    expect(sentBodies()[0]).toMatchObject({ source: 'neurogym', grade: 7, total: 9, correct: 9, durationS: 14400 });
  });

  it('links the result to the assignment opened with "Empezar"', async () => {
    joined();
    markAssignmentStarted({ id: 'asg_1', grade: 7, subject: 'Matemáticas' });
    await reportResultToSchool({ source: 'practice', subject: 'matematicas', grade: 7, total: 10, correct: 5, durationS: 60 });
    expect(sentBodies()[0]).toMatchObject({ source: 'assignment', assignmentId: 'asg_1' });
    expect(localStorage.getItem(PENDING_ASSIGNMENT_KEY)).toBeNull();
  });

  it('queues when offline', async () => {
    joined();
    Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => false });
    const outcome = await reportResultToSchool({ source: 'practice', grade: 7, total: 10, correct: 5, durationS: 60 });
    expect(outcome).toBe('queued');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(getQueuedResults()).toHaveLength(1);
  });
});

describe('perAreaFromAnswers', () => {
  it('groups by competency (or topic) and counts correct answers', () => {
    const perArea = perAreaFromAnswers(
      [
        { id: 'q1', correctOptionId: 'a', competency: 'Numerico' },
        { id: 'q2', correctOptionId: 'b', competency: 'Numerico' },
        { id: 'q3', correctOptionId: 'c', topic: 'Geometria' },
        { id: 'q4', correctOptionId: 'd' }
      ],
      { q1: 'A', q2: 'c', q3: 'c' }
    );
    expect(perArea).toEqual({ Numerico: { total: 2, correct: 1 }, Geometria: { total: 1, correct: 1 } });
  });
});
