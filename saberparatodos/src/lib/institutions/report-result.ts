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
import { normalizeSubjectKey } from '../question-transformer';

export const PENDING_ASSIGNMENT_KEY = 'inst.student.pendingAssignment';
/** Attempt keys already reported, so a remounted results view never reports twice. */
export const REPORTED_ATTEMPTS_KEY = 'inst.student.reportedAttempts';
const REPORTED_ATTEMPTS_MAX = 100;
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
  /** Stable id of this attempt (see `examAttemptKey`); a key is reported at most once. */
  attemptKey?: string;
}

function hashString(value: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0;
  for (let i = 0; i < value.length; i++) {
    const c = value.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = (Math.imul(h2, 31) + c) >>> 0;
  }
  return `${h1.toString(36)}${h2.toString(36)}`;
}

/**
 * Stable key for one practice attempt: the same exam data and answers always
 * give the same key, so remounting the results view does not report again.
 */
export function examAttemptKey(
  examData: { subject?: string | null; grade?: number | null; totalTimeMs?: number; questions?: Array<{ questionId: string | number }> } | null | undefined,
  userAnswers: Record<string | number, string> | null | undefined
): string {
  const ids = (examData?.questions || []).map((q) => String(q?.questionId));
  const answers = Object.entries(userAnswers || {})
    .map(([id, letter]) => `${id}=${letter}`)
    .sort();
  const raw = [examData?.subject ?? '', examData?.grade ?? '', examData?.totalTimeMs ?? '', ids.join(','), answers.join(',')].join('|');
  return `exam_${hashString(raw)}`;
}

function readReportedAttempts(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(REPORTED_ATTEMPTS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((k) => typeof k === 'string') : [];
  } catch {
    return [];
  }
}

/** Records the key; returns false when it was already recorded. */
function claimAttempt(key: string): boolean {
  const keys = readReportedAttempts();
  if (keys.includes(key)) return false;
  keys.push(key);
  try {
    localStorage.setItem(REPORTED_ATTEMPTS_KEY, JSON.stringify(keys.slice(-REPORTED_ATTEMPTS_MAX)));
  } catch {
    // Without storage the in-memory check below still covers same-page remounts.
  }
  return true;
}

const claimedThisPage = new Set<string>();

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
    // Both sides go through the same canonical id: 'ciencias' and 'Ciencias Naturales'
    // are both 'ciencias_naturales'.
    if (pending.subject && toSubjectId(pending.subject) !== subject) return undefined;
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

export const MAX_AREA_KEY_LENGTH = 40;
export const MAX_AREAS = 20;
/** Same rules as the API (apps/worldexams-api/src/institutions.ts SUBJECT_RE / AREA_KEY_RE). */
const SUBJECT_ID_PATTERN = /^[a-z0-9_-]{2,40}$/;

/**
 * The API only accepts subject ids (`[a-z0-9_-]`). Exams carry display names
 * ('Matemáticas', 'Inglés Diagnóstico'), so map them to the app's canonical
 * subject key; anything that still does not fit is omitted.
 */
export function toSubjectId(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const id = normalizeSubjectKey(String(value));
  return SUBJECT_ID_PATTERN.test(id) ? id : undefined;
}

/**
 * Keeps only what the API accepts in an area key (letters, digits, space, `_`
 * and `-`) and caps the length: 'Competencia Lectora (Inferencial)' becomes
 * 'Competencia Lectora Inferencial'.
 */
export function sanitizeAreaKey(value: string): string {
  return String(value || '')
    .normalize('NFC')
    .replace(/[^\p{L}\p{N} _-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_AREA_KEY_LENGTH)
    .trim();
}

/** Sanitized keys, merged on collision, keeping the MAX_AREAS areas with most questions. */
export function sanitizePerArea(perArea: PerArea | null | undefined): PerArea | undefined {
  if (!perArea) return undefined;
  const merged: PerArea = {};
  for (const [rawKey, value] of Object.entries(perArea)) {
    const key = sanitizeAreaKey(rawKey);
    const total = clampInt(value?.total, 0, 200);
    if (!key || total === 0) continue;
    const bucket = (merged[key] ||= { total: 0, correct: 0 });
    bucket.total = Math.min(200, bucket.total + total);
    bucket.correct = Math.min(bucket.total, bucket.correct + clampInt(value?.correct, 0, total));
  }
  const kept = Object.entries(merged)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, MAX_AREAS);
  return kept.length > 0 ? Object.fromEntries(kept) : undefined;
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
  return sanitizePerArea(perArea);
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
    if (report.attemptKey) {
      if (claimedThisPage.has(report.attemptKey) || !claimAttempt(report.attemptKey)) return 'skipped';
      claimedThisPage.add(report.attemptKey);
    }
    const grade = clampInt(report.grade || session.group.grade || 1, 1, 12);
    const subject = toSubjectId(report.subject);

    const body: StudentResultInput = {
      source: report.source,
      grade,
      total,
      correct: clampInt(report.correct, 0, total),
      durationS: clampInt(report.durationS, 0, 14400)
    };
    if (subject) body.subject = subject;
    const perArea = sanitizePerArea(report.perArea);
    if (perArea) body.perArea = perArea;

    if (report.source === 'practice') {
      const assignmentId = takePendingAssignment(grade, subject);
      if (assignmentId) {
        body.source = 'assignment';
        body.assignmentId = assignmentId;
      }
    }

    ensureAutoFlush();
    return await submitResult(body, report.attemptKey);
  } catch (error) {
    console.warn('[reportResultToSchool] Could not report result', error);
    return 'dropped';
  }
}

// App start: flush whatever was queued offline in a previous visit.
if (typeof window !== 'undefined') ensureAutoFlush();
