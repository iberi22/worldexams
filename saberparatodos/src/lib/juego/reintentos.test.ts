import { describe, it, expect, beforeEach } from 'vitest';
import {
  openRetry,
  retryStatus,
  closeAttempt,
  finalScore,
  studyLink,
  RETRY_COOLDOWN_MS,
  RETRY_STORAGE_KEY,
} from './reintentos';

const T0 = new Date(2026, 8, 21, 10).getTime();
const QUIZ = 'quiz-fracciones-01';

describe('reintentos (F3)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('openRetry bloquea 12 min y guarda el tema foco', () => {
    expect(openRetry(QUIZ, 60, 'simplificacion', T0)).toBe(RETRY_COOLDOWN_MS);
    const st = retryStatus(QUIZ, T0 + 1000);
    expect(st.allowed).toBe(false);
    expect(st.waitMs).toBeGreaterThan(0);
    expect(st.focusTema).toBe('simplificacion');
    expect(st.finalSoFar).toBe(60);
  });

  it('cooldown vencido permite el 2º intento', () => {
    openRetry(QUIZ, 60, 'simplificacion', T0);
    const st = retryStatus(QUIZ, T0 + RETRY_COOLDOWN_MS + 1);
    expect(st.allowed).toBe(true);
    expect(st.waitMs).toBe(0);
    expect(st.attemptsUsed).toBe(1);
  });

  it('nota final = max (persistencia premiada)', () => {
    expect(finalScore([60, 85])).toBe(85);
    expect(finalScore([90, 70])).toBe(90);
    expect(finalScore([])).toBe(0);
    openRetry(QUIZ, 60, 'simplificacion', T0);
    const st = closeAttempt(QUIZ, 85, T0 + RETRY_COOLDOWN_MS + 1);
    expect(st.finalSoFar).toBe(85);
    expect(st.attemptsUsed).toBe(2);
  });

  it('máximo 3 intentos: al agotarlos no permite más', () => {
    openRetry(QUIZ, 40, 't', T0);
    closeAttempt(QUIZ, 50, T0 + RETRY_COOLDOWN_MS + 1);
    const st = closeAttempt(QUIZ, 55, T0 + 2 * (RETRY_COOLDOWN_MS + 1));
    expect(st.attemptsUsed).toBe(3);
    expect(st.allowed).toBe(false);
    expect(st.finalSoFar).toBe(55);
  });

  it('sin registro permite (primer intento libre)', () => {
    const st = retryStatus('quiz-nuevo', T0);
    expect(st.allowed).toBe(true);
    expect(st.focusTema).toBeNull();
  });

  it('studyLink genera deep-link por slug ASCII', () => {
    const link = studyLink('Simplificación de fracciones');
    expect(link.href).toBe('/estudio?tema=simplificacion-de-fracciones');
    expect(link.query).toBe('Simplificación de fracciones');
    expect(JSON.parse(localStorage.getItem(RETRY_STORAGE_KEY) || '{}')[QUIZ]).toBeUndefined();
  });

  it('closeAttempt sin registro previo delega en retryStatus', () => {
    localStorage.clear();
    const st = closeAttempt('unregistered', 80);
    expect(st.allowed).toBe(true);
    expect(st.attemptsUsed).toBe(0);
  });

  it('readStore y writeStore capturan errores de localStorage', () => {
    localStorage.clear();
    localStorage.setItem(RETRY_STORAGE_KEY, 'invalid json');
    expect(retryStatus('q1').allowed).toBe(true);

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => {
      throw new Error('QuotaExceededError');
    };
    expect(openRetry('q1', 50, 'mat')).toBe(12 * 60 * 1000);
    localStorage.setItem = originalSetItem;
  });
});
