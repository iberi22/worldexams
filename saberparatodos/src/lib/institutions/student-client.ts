/**
 * Student side of the institutions API (docs/institutions/CONTRACT.md).
 *
 * Students have no account: they join a group with the 6-char code the teacher
 * shares, plus a nickname and the device's anonymous id. The opaque session
 * token lives in localStorage['inst.student.session'] together with the
 * "compartir con mi colegio" switch (on by default after joining).
 *
 * Results submitted while offline (or while the API is down) are queued in
 * localStorage (max 50, deduped by a client-generated id) and flushed on the
 * `online` event or the next app start.
 */

import { simpleHash } from '../identity';
import { getOrCreateSwalInstanceId } from '../swal-instance-id';

export const STUDENT_SESSION_KEY = 'inst.student.session';
export const RESULT_QUEUE_KEY = 'inst.student.queue';
export const RESULT_QUEUE_MAX = 50;

/** Join codes use this alphabet: no 0/O/1/I/L. */
export const JOIN_CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const JOIN_CODE_LENGTH = 6;

export type ResultSource = 'assignment' | 'practice' | 'neurogym';

export interface StudentInfo {
  id: string;
  nickname: string;
}

export interface StudentGroup {
  id: string;
  name: string;
  grade: number;
}

export interface StudentInstitution {
  name: string;
  country: string;
}

export interface StudentSession {
  token: string;
  student: StudentInfo;
  group: StudentGroup;
  institution: StudentInstitution;
  joinedAt: string;
  shareWithSchool: boolean;
}

export interface StudentAssignment {
  id: string;
  title: string;
  country: string;
  grade: number;
  subject: string | null;
  questionCount: number;
  /** ISO 8601 date-time, or null when the task has no deadline. */
  dueAt: string | null;
  done: boolean;
}

export type PerArea = Record<string, { total: number; correct: number }>;

export interface StudentResultInput {
  assignmentId?: string;
  source: ResultSource;
  subject?: string;
  grade: number;
  total: number;
  correct: number;
  durationS: number;
  perArea?: PerArea;
}

export interface QueuedResult {
  clientId: string;
  body: StudentResultInput;
  queuedAt: number;
}

export type InstitutionErrorCode =
  | 'NETWORK'
  | 'NOT_JOINED'
  | 'INVALID_CODE'
  | 'INVALID_NICKNAME'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'LIMIT_REACHED'
  | 'RATE_LIMITED'
  | 'UNAVAILABLE'
  | 'BAD_REQUEST'
  | 'UNKNOWN';

export const INSTITUTION_ERROR_MESSAGES: Record<InstitutionErrorCode, string> = {
  NETWORK: 'Sin conexión. Revisa tu internet e inténtalo de nuevo.',
  NOT_JOINED: 'Todavía no te has unido a un colegio.',
  INVALID_CODE: 'El código debe tener 6 caracteres (letras y números, sin 0, O, 1, I ni L).',
  INVALID_NICKNAME: 'El apodo debe tener entre 2 y 24 caracteres (letras, números, espacios, - o _).',
  UNAUTHORIZED: 'Tu sesión con el colegio ya no es válida. Vuelve a unirte con el código.',
  NOT_FOUND: 'No encontramos un grupo con ese código. Revísalo con tu docente.',
  LIMIT_REACHED: 'El grupo alcanzó el límite de estudiantes de su plan.',
  RATE_LIMITED: 'Demasiadas solicitudes. Espera un momento e inténtalo de nuevo.',
  UNAVAILABLE: 'El servicio del colegio no está disponible ahora. Intenta más tarde.',
  BAD_REQUEST: 'Los datos enviados no son válidos.',
  UNKNOWN: 'Ocurrió un error inesperado. Intenta de nuevo.'
};

export class InstitutionError extends Error {
  code: InstitutionErrorCode;
  status: number;

  constructor(code: InstitutionErrorCode, status = 0, message?: string) {
    super(message || INSTITUTION_ERROR_MESSAGES[code]);
    this.name = 'InstitutionError';
    this.code = code;
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// API base
// ---------------------------------------------------------------------------

function readConfiguredApiBase(): string | undefined {
  if (typeof document !== 'undefined') {
    const config = document.getElementById('api-config');
    if (config?.textContent) {
      try {
        const parsed = JSON.parse(config.textContent);
        if (parsed?.apiBaseUrl) return String(parsed.apiBaseUrl);
      } catch {
        // Fall through to env.
      }
    }
  }
  return typeof import.meta !== 'undefined' ? import.meta.env?.PUBLIC_API_BASE_URL : undefined;
}

/** Same host the ranked client uses (`getRankedApiBase`), without importing its deps. */
function rankedApiBase(): string | undefined {
  return typeof import.meta !== 'undefined' ? import.meta.env?.PUBLIC_RANKED_API_BASE_URL : undefined;
}

/**
 * The app's anonymous device id. Same value as `getDeviceHash()` in
 * leaderboard-service (used by ranked); recomputed here so NeuroGym does not
 * pull Supabase and the P2P mesh just to report a result.
 */
export function getAnonymousId(): string {
  const instanceId = getOrCreateSwalInstanceId();
  const hashVal = simpleHash(`device_${instanceId}`).toString(36).toUpperCase().padStart(6, '0').slice(0, 8);
  return `dev_${hashVal}`;
}

function originOf(url: string | undefined): string | null {
  if (!url || !/^https?:\/\//i.test(url)) return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

/**
 * `${origin}/v1/inst`. Built from the origin only, so a PUBLIC_API_BASE_URL that
 * already ends in `/v1` never produces `/v1/v1`. A relative base (`/api`, the
 * site proxy) has no institutions routes, so it falls back to the ranked API host.
 */
export function getInstitutionsApiBase(): string {
  const origin = originOf(readConfiguredApiBase()) || originOf(rankedApiBase()) || 'https://api.saberparatodos.space';
  return `${origin}/v1/inst`;
}

// ---------------------------------------------------------------------------
// Local state
// ---------------------------------------------------------------------------

function hasStorage(): boolean {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function isValidSession(value: any): value is StudentSession {
  return Boolean(
    value &&
      typeof value.token === 'string' &&
      value.token.length > 0 &&
      value.student &&
      typeof value.student.id === 'string' &&
      value.group &&
      typeof value.group.id === 'string' &&
      value.institution
  );
}

export function getStudentSession(): StudentSession | null {
  if (!hasStorage()) return null;
  try {
    const raw = localStorage.getItem(STUDENT_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isValidSession(parsed)) return null;
    return { ...parsed, shareWithSchool: parsed.shareWithSchool !== false };
  } catch {
    return null;
  }
}

function saveStudentSession(session: StudentSession): void {
  if (!hasStorage()) return;
  try {
    localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.warn('[StudentClient] Could not persist session', e);
  }
}

export function isJoined(): boolean {
  return getStudentSession() !== null;
}

export function isSharingWithSchool(): boolean {
  return getStudentSession()?.shareWithSchool === true;
}

/** Turning sharing off also discards queued results: nothing pending may leave later. */
export function setShareWithSchool(enabled: boolean): StudentSession | null {
  const session = getStudentSession();
  if (!session) return null;
  const updated = { ...session, shareWithSchool: enabled };
  saveStudentSession(updated);
  if (!enabled) saveQueue([]);
  return updated;
}

/** Removes the token, the sharing switch and any queued result. */
export function clearStudentState(): void {
  if (!hasStorage()) return;
  try {
    localStorage.removeItem(STUDENT_SESSION_KEY);
    localStorage.removeItem(RESULT_QUEUE_KEY);
  } catch {
    // Nothing else to do.
  }
}

// ---------------------------------------------------------------------------
// Input normalization
// ---------------------------------------------------------------------------

/** Uppercases and drops spaces, dashes and other separators. */
export function normalizeJoinCode(input: string): string {
  return String(input || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, JOIN_CODE_LENGTH);
}

export function isValidJoinCode(code: string): boolean {
  if (code.length !== JOIN_CODE_LENGTH) return false;
  return [...code].every((ch) => JOIN_CODE_ALPHABET.includes(ch));
}

/** True when the code contains characters the alphabet never uses (0/O/1/I/L). */
export function hasAmbiguousChars(code: string): boolean {
  return /[01OIL]/.test(code);
}

export function normalizeNickname(input: string): string {
  return String(input || '').replace(/\s+/g, ' ').trim();
}

export function isValidNickname(nickname: string): boolean {
  return /^[\p{L}\p{N} _-]{2,24}$/u.test(nickname);
}

/** Best nickname the app already knows (ranked nickname, leaderboard name, anonymous identity). */
export function suggestNickname(): string {
  if (!hasStorage()) return '';
  const candidates: string[] = [];
  try {
    candidates.push(localStorage.getItem('worldexams_ranked_nickname') || '');
    const settings = JSON.parse(localStorage.getItem('worldexams_leaderboard_settings') || '{}');
    candidates.push(settings?.displayName || '');
    const identity = JSON.parse(localStorage.getItem('worldexams_identity') || '{}');
    candidates.push(identity?.identity?.displayName || '');
  } catch {
    // Ignore malformed settings.
  }
  for (const candidate of candidates) {
    const cleaned = normalizeNickname(String(candidate).replace(/[^\p{L}\p{N} _-]/gu, '')).slice(0, 24).trim();
    if (isValidNickname(cleaned)) return cleaned;
  }
  return '';
}

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

function codeFromResponse(status: number, apiCode?: string): InstitutionErrorCode {
  if (apiCode === 'INVALID_NICKNAME') return 'INVALID_NICKNAME';
  if (apiCode && /LIMIT/.test(apiCode)) return 'LIMIT_REACHED';
  if (status === 401) return 'UNAUTHORIZED';
  if (status === 404) return 'NOT_FOUND';
  if (status === 409 || status === 403) return 'LIMIT_REACHED';
  if (status === 429) return 'RATE_LIMITED';
  if (status === 503 || status >= 500) return 'UNAVAILABLE';
  if (status === 400) return 'BAD_REQUEST';
  return 'UNKNOWN';
}

async function request<T>(path: string, init: { method?: string; body?: unknown; token?: string } = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (init.body !== undefined) headers['Content-Type'] = 'application/json';
  if (init.token) headers.Authorization = `Bearer ${init.token}`;

  let response: Response;
  try {
    response = await fetch(`${getInstitutionsApiBase()}${path}`, {
      method: init.method || 'GET',
      headers,
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined
    });
  } catch {
    throw new InstitutionError('NETWORK');
  }

  if (!response.ok) {
    let apiCode: string | undefined;
    let apiMessage: string | undefined;
    try {
      const data = await response.json();
      apiCode = data?.error;
      apiMessage = data?.message;
    } catch {
      // Non-JSON error body.
    }
    const code = codeFromResponse(response.status, apiCode);
    throw new InstitutionError(code, response.status, code === 'UNKNOWN' ? apiMessage : undefined);
  }

  if (response.status === 204) return undefined as T;
  try {
    return (await response.json()) as T;
  } catch {
    return undefined as T;
  }
}

function requireSession(): StudentSession {
  const session = getStudentSession();
  if (!session) throw new InstitutionError('NOT_JOINED');
  return session;
}

/** A 401 means the teacher removed the student or the session expired. */
function dropSessionOn401(error: unknown): never {
  if (error instanceof InstitutionError && error.code === 'UNAUTHORIZED') clearStudentState();
  throw error;
}

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------

interface JoinResponse {
  studentToken: string;
  student: StudentInfo;
  group: StudentGroup;
  institution: StudentInstitution;
}

export async function joinGroup(joinCode: string, nickname: string): Promise<StudentSession> {
  const code = normalizeJoinCode(joinCode);
  if (!isValidJoinCode(code)) throw new InstitutionError('INVALID_CODE');
  const nick = normalizeNickname(nickname);
  if (!isValidNickname(nick)) throw new InstitutionError('INVALID_NICKNAME');

  const data = await request<JoinResponse>('/join', {
    method: 'POST',
    body: { joinCode: code, nickname: nick, anonymousId: getAnonymousId() }
  });
  if (!data?.studentToken) throw new InstitutionError('UNKNOWN');

  const session: StudentSession = {
    token: data.studentToken,
    student: data.student,
    group: data.group,
    institution: data.institution,
    joinedAt: new Date().toISOString(),
    shareWithSchool: true
  };
  saveStudentSession(session);
  return session;
}

/** Refreshes group/institution names from `/student/me`, keeping the token and switch. */
export async function fetchStudentMe(): Promise<StudentSession> {
  const session = requireSession();
  try {
    const data = await request<{ student: StudentInfo; group: StudentGroup; institution: StudentInstitution }>(
      '/student/me',
      { token: session.token }
    );
    const updated: StudentSession = {
      ...session,
      student: data?.student ?? session.student,
      group: data?.group ?? session.group,
      institution: data?.institution ?? session.institution
    };
    saveStudentSession(updated);
    return updated;
  } catch (error) {
    return dropSessionOn401(error);
  }
}

export async function fetchAssignments(): Promise<StudentAssignment[]> {
  const session = requireSession();
  try {
    const data = await request<{ assignments: StudentAssignment[] }>('/student/assignments', { token: session.token });
    return Array.isArray(data?.assignments) ? data.assignments : [];
  } catch (error) {
    return dropSessionOn401(error);
  }
}

/** Raw POST /student/results. Prefer `submitResult`, which queues on failure. */
export async function postResult(body: StudentResultInput): Promise<{ id: string }> {
  const session = requireSession();
  try {
    return await request<{ id: string }>('/student/results', { method: 'POST', body, token: session.token });
  } catch (error) {
    return dropSessionOn401(error);
  }
}

/**
 * Leaves the group server-side and always clears the local state, even when the
 * API is unreachable (the student explicitly asked to stop sharing).
 */
export async function leaveGroup(): Promise<void> {
  const session = getStudentSession();
  try {
    if (session) await request<void>('/student/leave', { method: 'POST', token: session.token });
  } catch (error) {
    if (!(error instanceof InstitutionError) || !['UNAUTHORIZED', 'NOT_FOUND', 'NETWORK', 'UNAVAILABLE'].includes(error.code)) {
      clearStudentState();
      throw error;
    }
  }
  clearStudentState();
}

// ---------------------------------------------------------------------------
// Offline queue
// ---------------------------------------------------------------------------

export function createClientId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch {
    // Fall through.
  }
  return `r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getQueuedResults(): QueuedResult[] {
  if (!hasStorage()) return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(RESULT_QUEUE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item.clientId === 'string' && item.body) : [];
  } catch {
    return [];
  }
}

function saveQueue(queue: QueuedResult[]): void {
  if (!hasStorage()) return;
  try {
    if (queue.length === 0) localStorage.removeItem(RESULT_QUEUE_KEY);
    else localStorage.setItem(RESULT_QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // Storage full: the oldest results are already dropped by the cap.
  }
}

/** Adds a result unless its clientId is already queued; keeps the newest 50. */
export function enqueueResult(item: QueuedResult): void {
  const queue = getQueuedResults();
  if (queue.some((q) => q.clientId === item.clientId)) return;
  queue.push(item);
  saveQueue(queue.slice(-RESULT_QUEUE_MAX));
}

function isRetryable(error: unknown): boolean {
  return error instanceof InstitutionError && ['NETWORK', 'UNAVAILABLE', 'RATE_LIMITED'].includes(error.code);
}

function isOffline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine === false;
}

export type SubmitOutcome = 'sent' | 'queued' | 'dropped' | 'skipped';

/** Sends a result now, or queues it when offline / the API is temporarily down. */
export async function submitResult(body: StudentResultInput, clientId = createClientId()): Promise<SubmitOutcome> {
  const session = getStudentSession();
  if (!session || !session.shareWithSchool) return 'skipped';

  if (isOffline()) {
    enqueueResult({ clientId, body, queuedAt: Date.now() });
    return 'queued';
  }
  try {
    await postResult(body);
    return 'sent';
  } catch (error) {
    if (isRetryable(error)) {
      enqueueResult({ clientId, body, queuedAt: Date.now() });
      return 'queued';
    }
    return 'dropped';
  }
}

let flushing: Promise<number> | null = null;

/**
 * Sends queued results in order. Stops at the first retryable failure and keeps
 * the rest; drops items the API rejects as invalid. Returns how many were sent.
 */
export function flushResultQueue(): Promise<number> {
  if (flushing) return flushing;
  flushing = (async () => {
    let sent = 0;
    const session = getStudentSession();
    if (!session) {
      saveQueue([]);
      return 0;
    }
    if (!session.shareWithSchool || isOffline()) return 0;

    let queue = getQueuedResults();
    while (queue.length > 0) {
      const [next] = queue;
      try {
        await postResult(next.body);
        sent++;
      } catch (error) {
        if (isRetryable(error)) break;
        if (error instanceof InstitutionError && error.code === 'UNAUTHORIZED') return sent;
      }
      // Re-read so results queued during the await are kept.
      queue = getQueuedResults().filter((q) => q.clientId !== next.clientId);
      saveQueue(queue);
    }
    return sent;
  })().finally(() => {
    flushing = null;
  });
  return flushing;
}

let autoFlushInstalled = false;

/** Flushes now and on every `online` event. Safe to call many times. */
export function ensureAutoFlush(): void {
  if (typeof window === 'undefined') return;
  if (!autoFlushInstalled) {
    autoFlushInstalled = true;
    window.addEventListener('online', () => {
      void flushResultQueue();
    });
  }
  if (getQueuedResults().length > 0) void flushResultQueue();
}
