import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  reportResultToSchool,
  markAssignmentStarted,
  perAreaFromAnswers,
  sanitizePerArea,
  sanitizeAreaKey,
  toSubjectId,
  examAttemptKey,
  PENDING_ASSIGNMENT_KEY,
  MAX_AREAS,
  MAX_AREA_KEY_LENGTH
} from './report-result';
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

describe('API-safe payloads', () => {
  it('maps display subject names to [a-z0-9_-] ids or omits them', async () => {
    expect(toSubjectId('Matemáticas')).toBe('matematicas');
    expect(toSubjectId('Inglés Diagnóstico')).toMatch(/^[a-z0-9_-]+$/);
    expect(toSubjectId('Speed Challenge')).toBe('speed_challenge');
    expect(toSubjectId('¿?!')).toBeUndefined();
    expect(toSubjectId('x'.repeat(41))).toBeUndefined();

    joined();
    await reportResultToSchool({ source: 'practice', subject: 'Inglés Diagnóstico', grade: 7, total: 10, correct: 5, durationS: 60 });
    await reportResultToSchool({ source: 'practice', subject: '¿?!', grade: 7, total: 10, correct: 5, durationS: 60 });
    const [first, second] = sentBodies();
    expect(first.subject).toMatch(/^[a-z0-9_-]{1,40}$/);
    expect(second).not.toHaveProperty('subject');
  });

  it('sanitizes area keys (no ":" or ",", max 40 chars) and keeps at most 20 areas', async () => {
    const raw: Record<string, { total: number; correct: number }> = {
      'Numérico: variacional, espacial': { total: 3, correct: 2 },
      ['L'.repeat(80)]: { total: 1, correct: 1 }
    };
    for (let i = 0; i < 30; i++) raw[`Area ${i}`] = { total: 1, correct: 0 };

    const clean = sanitizePerArea(raw)!;
    const keys = Object.keys(clean);
    expect(keys.length).toBe(MAX_AREAS);
    for (const key of keys) {
      expect(key).not.toMatch(/[:,]/);
      expect(key.length).toBeLessThanOrEqual(MAX_AREA_KEY_LENGTH);
    }
    expect(clean['Numérico variacional espacial']).toEqual({ total: 3, correct: 2 });

    joined();
    await reportResultToSchool({ source: 'practice', grade: 7, total: 33, correct: 3, durationS: 60, perArea: raw });
    const sent = sentBodies()[0].perArea;
    expect(Object.keys(sent)).toHaveLength(MAX_AREAS);
    expect(Object.keys(sent).every((k) => !/[:,]/.test(k) && k.length <= MAX_AREA_KEY_LENGTH)).toBe(true);
  });

  it('clamps grade to 1..12', async () => {
    joined();
    await reportResultToSchool({ source: 'practice', grade: 0, total: 10, correct: 5, durationS: 60 });
    await reportResultToSchool({ source: 'practice', grade: 15, total: 10, correct: 5, durationS: 60 });
    await reportResultToSchool({ source: 'practice', grade: -3, total: 10, correct: 5, durationS: 60 });
    expect(sentBodies().map((b) => b.grade)).toEqual([7, 12, 1]);
  });
});

describe('judge review round 2', () => {
  // Real (assignment.subject, exam display subject) pairs seen in the app.
  const REAL_PAIRS: Array<[string, string]> = [
    ['matematica', 'Matemáticas'],
    ['ciencias', 'Ciencias Naturales'],
    ['sociales', 'Sociales y Ciudadanas'],
    ['lengua', 'Lectura Crítica']
  ];

  it.each(REAL_PAIRS)('links assignment subject %s to an exam in %s', async (assignmentSubject, examSubject) => {
    joined();
    markAssignmentStarted({ id: `asg_${assignmentSubject}`, grade: 7, subject: assignmentSubject });
    await reportResultToSchool({ source: 'practice', subject: examSubject, grade: 7, total: 10, correct: 6, durationS: 300 });
    expect(sentBodies()[0]).toMatchObject({ source: 'assignment', assignmentId: `asg_${assignmentSubject}` });
    expect(localStorage.getItem(PENDING_ASSIGNMENT_KEY)).toBeNull();
  });

  it('keeps the pending assignment when the subject really differs', async () => {
    joined();
    markAssignmentStarted({ id: 'asg_mat', grade: 7, subject: 'matematica' });
    await reportResultToSchool({ source: 'practice', subject: 'Ciencias Naturales', grade: 7, total: 10, correct: 6, durationS: 300 });
    expect(sentBodies()[0].source).toBe('practice');
    expect(sentBodies()[0]).not.toHaveProperty('assignmentId');
    expect(localStorage.getItem(PENDING_ASSIGNMENT_KEY)).not.toBeNull();
  });

  it('a remounted results view does not report the same attempt again', async () => {
    joined();
    const examData = {
      subject: 'Matemáticas',
      grade: 7,
      totalTimeMs: 312_456,
      questions: [{ questionId: 'q1' }, { questionId: 'q2' }]
    };
    const userAnswers = { q1: 'a', q2: 'c' };
    const report = () =>
      reportResultToSchool({
        source: 'practice',
        subject: examData.subject,
        grade: examData.grade,
        total: 2,
        correct: 1,
        durationS: 312,
        attemptKey: examAttemptKey(examData, userAnswers)
      });

    expect(await report()).toBe('sent');
    // Same exam data after "discuss question" -> back to results.
    expect(await report()).toBe('skipped');
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // A different attempt is still reported.
    const other = examAttemptKey({ ...examData, totalTimeMs: 200_000 }, userAnswers);
    expect(other).not.toBe(examAttemptKey(examData, userAnswers));
    await reportResultToSchool({ source: 'practice', grade: 7, total: 2, correct: 2, durationS: 200, attemptKey: other });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('the attempt key is stable and ignores answer order', () => {
    const exam = { subject: 'Matemáticas', grade: 7, totalTimeMs: 1, questions: [{ questionId: 'q1' }] };
    expect(examAttemptKey(exam, { q1: 'a', q2: 'b' })).toBe(examAttemptKey(exam, { q2: 'b', q1: 'a' }));
    expect(examAttemptKey(exam, { q1: 'a' })).not.toBe(examAttemptKey(exam, { q1: 'b' }));
  });

  it('area keys only keep what the API accepts', async () => {
    const API_AREA_KEY_RE = /^[\p{L}\p{N} _-]{1,40}$/u; // apps/worldexams-api/src/institutions.ts
    expect(sanitizeAreaKey('Competencia Lectora (Inferencial)')).toBe('Competencia Lectora Inferencial');
    for (const label of ['Competencia Lectora (Inferencial)', 'Números/Álgebra: «variación»', 'Física & Química', 'Ñandú? 1.2']) {
      expect(sanitizeAreaKey(label)).toMatch(API_AREA_KEY_RE);
    }

    joined();
    const perArea = perAreaFromAnswers(
      [
        { id: 'q1', correctOptionId: 'a', competency: 'Competencia Lectora (Inferencial)' },
        { id: 'q2', correctOptionId: 'b', competency: 'Competencia Lectora (Literal)' }
      ],
      { q1: 'a', q2: 'a' }
    );
    await reportResultToSchool({ source: 'practice', grade: 7, total: 2, correct: 1, durationS: 60, perArea });
    const sent = sentBodies()[0].perArea;
    expect(sent).toEqual({
      'Competencia Lectora Inferencial': { total: 1, correct: 1 },
      'Competencia Lectora Literal': { total: 1, correct: 0 }
    });
    expect(Object.keys(sent).every((k) => API_AREA_KEY_RE.test(k))).toBe(true);
  });
});
