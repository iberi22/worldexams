/**
 * juego/reintentos.ts — Modelo de vidas y reintentos (F3).
 *
 * Reglas (diseño aprobado 2026-09-23):
 * 1. Al fallar, el reintento se bloquea RETRY_COOLDOWN_MS (12 min) para evitar
 *    adivinar al azar. La UI debe mostrar micro-recurso del tema foco.
 * 2. El 2º intento usa preguntas equivalentes: el llamante pasa los ids ya
 *    vistos como `exclude` a `selectMatchmaking` (misma banda, otro enunciado).
 * 3. Nota final = max(intento1, intento2,...). Premia la persistencia.
 * Estado on-device (localStorage). Sin PII, sin red (BR-03/BR-04).
 */

export const RETRY_COOLDOWN_MS = 12 * 60 * 1000;
export const RETRY_STORAGE_KEY = 'wx-juego-reintentos-v1';
export const MAX_ATTEMPTS = 3;

export interface RetryRecord {
  attempts: number[];
  lockedUntil: number;
  focusTema: string;
  updatedAt: number;
}

export type RetryStore = Record<string, RetryRecord>;

export function emptyRecord(focusTema: string, now: number = Date.now()): RetryRecord {
  return { attempts: [], lockedUntil: now + RETRY_COOLDOWN_MS, focusTema, updatedAt: now };
}

function readStore(): RetryStore {
  try {
    /* v8 ignore next */
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(RETRY_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as RetryStore) : {};
  } catch {
    return {};
  }
}

function writeStore(store: RetryStore): void {
  try {
    /* v8 ignore next */
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(RETRY_STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* quota: la mesh sigue en memoria */
  }
}

/** Registra un intento fallido/incompleto y abre el cooldown. Retorna ms de espera. */
export function openRetry(quizId: string, score: number, focusTema: string, now: number = Date.now()): number {
  const store = readStore();
  const rec = store[quizId] ?? emptyRecord(focusTema, now);
  rec.attempts.push(score);
  rec.focusTema = focusTema;
  rec.lockedUntil = now + RETRY_COOLDOWN_MS;
  rec.updatedAt = now;
  store[quizId] = rec;
  writeStore(store);
  return RETRY_COOLDOWN_MS;
}

export interface RetryStatus {
  allowed: boolean;
  waitMs: number;
  attemptsUsed: number;
  focusTema: string | null;
  finalSoFar: number | null;
}

/** ¿Puede reintentar ahora? (cooldown vencido y intentos restantes). */
export function retryStatus(quizId: string, now: number = Date.now()): RetryStatus {
  const rec = readStore()[quizId];
  if (!rec || rec.attempts.length === 0) {
    return { allowed: true, waitMs: 0, attemptsUsed: 0, focusTema: null, finalSoFar: null };
  }
  if (rec.attempts.length >= MAX_ATTEMPTS) {
    return { allowed: false, waitMs: 0, attemptsUsed: rec.attempts.length, focusTema: rec.focusTema, finalSoFar: finalScore(rec.attempts) };
  }
  const waitMs = Math.max(0, rec.lockedUntil - now);
  return {
    allowed: waitMs === 0,
    waitMs,
    attemptsUsed: rec.attempts.length,
    focusTema: rec.focusTema,
    finalSoFar: finalScore(rec.attempts),
  };
}

/** Cierra un intento (pasa o segundo fallo): suma nota y reabre cooldown si quedan vidas. */
export function closeAttempt(quizId: string, score: number, now: number = Date.now()): RetryStatus {
  const store = readStore();
  const rec = store[quizId];
  if (!rec) return retryStatus(quizId, now);
  rec.attempts.push(score);
  rec.lockedUntil = now + RETRY_COOLDOWN_MS;
  rec.updatedAt = now;
  writeStore(store);
  return retryStatus(quizId, now);
}

/** Nota final = mejor intento (premia persistencia, nunca castiga reintentar). */
export function finalScore(attempts: number[]): number {
  return attempts.length === 0 ? 0 : Math.max(...attempts);
}

/**
 * Micro-recurso sugerido para el tema foco: deep-link de estudio por tema.
 * La app resuelve el enlace a su banco (preguntas/estudio); aquí solo el contrato.
 */
export function studyLink(focusTema: string): { tema: string; query: string; href: string } {
  const slug = focusTema
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return { tema: focusTema, query: focusTema, href: `/estudio?tema=${encodeURIComponent(slug)}` };
}
