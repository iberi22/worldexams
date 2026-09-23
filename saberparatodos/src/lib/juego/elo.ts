/**
 * juego/elo.ts — Motor Elo para el área /juego (F1).
 *
 * Fórmula estándar: E = 1 / (1 + 10^((Rival - Jugador)/400)), K=32.
 * El "rival" es la pregunta (Elo vivo local). La pregunta se mueve inverso
 * con K=8 (las preguntas calibran lento, el jugador rápido).
 * Escala y topes según docs/DECISION-ELO-MMR.md (tope 2200).
 */

import type { DifficultyBand, EloResult } from './types';

export const ELO_K_PLAYER = 32;
export const ELO_K_QUESTION = 8;
export const ELO_MIN = 100;
export const ELO_MAX = 2200;

/**
 * K por incertidumbre (hallazgo test 60q 2026-09-24: K=32 fijo + preguntas
 * que se encarecen al fallar = espiral de muerte para novatos).
 * Calibración rápida al inicio, estabilidad después.
 */
export function kForPlayer(attemptsPlayed: number): number {
  if (attemptsPlayed < 10) return 40;
  if (attemptsPlayed < 30) return ELO_K_PLAYER;
  return 16;
}

/** Base Elo por banda (DECISION-ELO-MMR tabla base). */
export const BAND_BASE_ELO: Record<DifficultyBand, number> = {
  'D1-D2': 500,
  'D3-D4': 800,
  'D5-D6': 1200,
  'D7-D8': 1600,
  'D9-D10': 2000,
};

/** Offset por grado (DECISION-ELO-MMR: G3-5 +0, G6-7 +100, G8-9 +200, G10 +300, G11 +400). */
export function gradeOffset(grade: number): number {
  if (grade <= 5) return 0;
  if (grade <= 7) return 100;
  if (grade <= 9) return 200;
  if (grade === 10) return 300;
  return 400;
}

/** Elo inicial del jugador por grado (DECISION-ELO-MMR tabla inicial). */
export function initialElo(grade: number): number {
  if (grade <= 5) return 500;
  if (grade <= 8) return 1000;
  if (grade === 9) return 1300;
  if (grade === 10) return 1600;
  return 1800;
}

/** Elo de una pregunta = base de banda + offset de grado, topado. */
export function questionEloFor(band: DifficultyBand, grade: number): number {
  return Math.min(ELO_MAX, BAND_BASE_ELO[band] + gradeOffset(grade));
}

/** Probabilidad esperada de acertar. */
export function expectedScore(playerElo: number, questionElo: number): number {
  return 1 / (1 + Math.pow(10, (questionElo - playerElo) / 400));
}

function clampElo(v: number): number {
  return Math.min(ELO_MAX, Math.max(ELO_MIN, Math.round(v)));
}

/** Aplica un intento. Nunca mezcla XP (ver xp.ts).
 *
 * @param attemptsPlayed intentos previos del jugador (K por incertidumbre;
 *   default 15 = comportamiento clásico K=32, preserva tests existentes).
 * @param questionAnchor Elo base de la banda para reversión a la media
 *   (10%): las preguntas no se encarecen sin límite por fallos en racha.
 */
export function applyAttempt(
  playerElo: number,
  questionElo: number,
  correct: boolean,
  opts: { attemptsPlayed?: number; questionAnchor?: number } = {},
): EloResult {
  const expected = expectedScore(playerElo, questionElo);
  const actual = correct ? 1 : 0;
  const k = kForPlayer(opts.attemptsPlayed ?? 15);
  const playerDelta = Math.round(k * (actual - expected));
  // La pregunta se mueve inverso: si el jugador acierta, la pregunta "pierde".
  const questionDelta = Math.round(ELO_K_QUESTION * ((1 - actual) - (1 - expected)));
  let newQuestionElo = questionElo + questionDelta;
  if (opts.questionAnchor !== undefined) {
    newQuestionElo = newQuestionElo + (opts.questionAnchor - newQuestionElo) * 0.1;
  }
  return {
    newPlayerElo: clampElo(playerElo + playerDelta),
    newQuestionElo: clampElo(newQuestionElo),
    playerDelta,
    questionDelta,
    expected,
  };
}

export interface MatchCandidate {
  id: string;
  elo: number;
}

/**
 * Matchmaking: `count` preguntas con Elo en [playerElo-window, playerElo+window].
 * Si no hay suficientes, rellena con las más cercanas. Sin repetición.
 */
export function selectMatchmaking(
  pool: MatchCandidate[],
  playerElo: number,
  count = 5,
  window = 200,
  exclude: Set<string> = new Set(),
): MatchCandidate[] {
  const avail = pool.filter((q) => !exclude.has(q.id));
  const inWindow = avail
    .filter((q) => Math.abs(q.elo - playerElo) <= window)
    .sort((a, b) => Math.abs(a.elo - playerElo) - Math.abs(b.elo - playerElo));
  const picked = inWindow.slice(0, count);
  if (picked.length < count) {
    const pickedIds = new Set(picked.map((q) => q.id));
    const rest = avail
      .filter((q) => !pickedIds.has(q.id))
      .sort((a, b) => Math.abs(a.elo - playerElo) - Math.abs(b.elo - playerElo));
    picked.push(...rest.slice(0, count - picked.length));
  }
  return picked;
}
