/**
 * The single hook the app calls after a practice exam or a NeuroGym session.
 *
 * Privacy rules:
 * - Nothing leaves the device unless the student joined a group AND has the
 *   "Compartir mis resultados con mi colegio" switch on.
 * - Ranked exams are never reported (ranked is a separate, public competition).
 */

import {
  ensureAutoFlush,
  getStudentSession,
  submitResult,
  type PerArea,
  type ResultSource,
  type StudentResultInput,
  type SubmitOutcome
} from './student-client';

export const PENDING_ASSIGNMENT_KEY = 'inst.student.pendingAssignment';
/** An assignment opened with "Empezar" counts for the next practice within this window. */
const PENDING_ASSIGNMENT_TTL_MS = 6 * 60 * 60 * 1000;

export interface PendingAssignment {
  assignmentId: string;
  grade: number;
  subject: string | null;
  startedAt: number;
}

export interface SchoolResultReport {
  source: Exclude<ResultSource, 'assignment'>;
  subject?: string | null;
  grade?: number | null;
  total: number;
  correct: number;
  durationS: number;
  perArea?: PerArea | null;
  /** Ranked exams must pass `true`; they are never reported. */
  ranked?: boolean;
}

function normalizeSubject(value: string | null | undefined): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

export function markAssignmentStarted(assignment: { id: string; grade: number; subject: string | null }): void {
  try {
    const pending: PendingAssignment = {
      assignmentId: assignment.id,
      grade: assignment.grade,
      subject: assignment.subject,
      startedAt: Date.now()
    };
    localStorage.setItem(PENDING_ASSIGNMENT_KEY, JSON.stringify(pending));
  } catch {
    // Without storage the result is still reported as practice.
  }
}

/** Returns (and consumes) the assignment the student opened, if this result matches it. */
function takePendingAssignment(grade: number, subject: string | null | undefined): string | undefined {
  try {
    const raw = localStorage.getItem(PENDING_ASSIGNMENT_KEY);
    if (!raw) return undefined;
    const pending = JSON.parse(raw) as PendingAssignment;
    if (!pending?.assignmentId || Date.now() - Number(pending.startedAt) > PENDING_ASSIGNMENT_TTL_MS) {
      localStorage.removeItem(PENDING_ASSIGNMENT_KEY);
      return undefined;
    }
    if (Number(pending.grade) !== grade) return undefined;
    if (pending.subject && normalizeSubject(pending.subject) !== normalizeSubject(subject)) return undefined;
    localStorage.removeItem(PENDING_ASSIGNMENT_KEY);
    return pending.assignmentId;
  } catch {
    return undefined;
  }
}

function clampInt(value: unknown, min: number, max: number): number {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

/** Builds `{area: {total, correct}}` from practice questions and the student's answers. */
export function perAreaFromAnswers(
  questions: Array<{ id: string | number; correctOptionId?: string; competency?: string; topic?: string }>,
  userAnswers: Record<string | number, string>
): PerArea | undefined {
  const perArea: PerArea = {};
  for (const q of questions || []) {
    const area = String(q?.competency || q?.topic || '').trim();
    if (!area) continue;
    const answer = String(userAnswers?.[q.id] ?? '').trim().toLowerCase();
    const correct = answer !== '' && answer === String(q.correctOptionId ?? '').trim().toLowerCase();
    const bucket = (perArea[area] ||= { total: 0, correct: 0 });
    bucket.total++;
    if (correct) bucket.correct++;
  }
  return Object.keys(perArea).length > 0 ? perArea : undefined;
}

/**
 * Reports a finished practice exam or NeuroGym session to the student's school.
 * Never throws; resolves to what happened with the result.
 */
export async function reportResultToSchool(report: SchoolResultReport): Promise<SubmitOutcome> {
  try {
    if (report.ranked) return 'skipped';
    const session = getStudentSession();
    if (!session || !session.shareWithSchool) return 'skipped';

    const total = clampInt(report.total, 0, 200);
    if (total === 0) return 'skipped';
    const grade = clampInt(report.grade || session.group.grade, 0, 13);
    const subject = report.subject ? String(report.subject) : undefined;

    const body: StudentResultInput = {
      source: report.source,
      grade,
      total,
      correct: clampInt(report.correct, 0, total),
      durationS: clampInt(report.durationS, 0, 14400)
    };
    if (subject) body.subject = subject;
    if (report.perArea && Object.keys(report.perArea).length > 0) body.perArea = report.perArea;

    if (report.source === 'practice') {
      const assignmentId = takePendingAssignment(grade, subject);
      if (assignmentId) {
        body.source = 'assignment';
        body.assignmentId = assignmentId;
      }
    }

    ensureAutoFlush();
    return await submitResult(body);
  } catch (error) {
    console.warn('[reportResultToSchool] Could not report result', error);
    return 'dropped';
  }
}

// App start: flush whatever was queued offline in a previous visit.
if (typeof window !== 'undefined') ensureAutoFlush();
