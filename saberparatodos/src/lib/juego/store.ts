/**
 * juego/store.ts — Estado local del área /juego (F1).
 *
 * Persistencia on-device (localStorage, cap de questionElo a 2000 entradas).
 * Semana ISO lunes-domingo; el XP resetea al cambiar de semana.
 * Fechas inyectables (`now`) para tests deterministas.
 */

import { initialElo, applyAttempt, type MatchCandidate } from './elo';
import { awardXp } from './xp';
import type { GameState, XpAction } from './types';

export const GAME_STORAGE_KEY = 'wx-juego-v1';
const MAX_QUESTION_ELO = 2000;

function dayKey(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function weekKey(ts: number): string {
  const d = new Date(new Date(ts).setHours(0, 0, 0, 0));
  const day = (d.getDay() + 6) % 7; // lunes=0
  d.setDate(d.getDate() - day);
  const year = d.getFullYear();
  const jan4 = new Date(year, 0, 4);
  const week = 1 + Math.round((d.getTime() - jan4.getTime()) / 604800000);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

export function emptyState(grade: number, now: number = Date.now()): GameState {
  return {
    v: 1,
    elo: initialElo(grade),
    xpWeekly: 0,
    weekKey: weekKey(now),
    streakDays: 0,
    lastActiveDay: null,
    questionElo: {},
    updatedAt: now,
  };
}

export function loadState(grade: number, now: number = Date.now()): GameState {
  try {
    if (typeof localStorage === 'undefined') return emptyState(grade, now);
    const raw = localStorage.getItem(GAME_STORAGE_KEY);
    if (!raw) return emptyState(grade, now);
    const parsed = JSON.parse(raw) as GameState;
    if (parsed.v !== 1 || typeof parsed.elo !== 'number') return emptyState(grade, now);
    // Reset semanal: semana distinta → XP a cero, Elo y racha se conservan.
    if (parsed.weekKey !== weekKey(now)) {
      parsed.xpWeekly = 0;
      parsed.weekKey = weekKey(now);
    }
    return parsed;
  } catch {
    return emptyState(grade, now);
  }
}

export function saveState(state: GameState): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const keys = Object.keys(state.questionElo);
    if (keys.length > MAX_QUESTION_ELO) {
      const trimmed: Record<string, number> = {};
      for (const k of keys.slice(keys.length - MAX_QUESTION_ELO)) trimmed[k] = state.questionElo[k];
      state.questionElo = trimmed;
    }
    state.updatedAt = Date.now();
    localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota/modo privado: la mesh sigue en memoria */
  }
}

/** Registra actividad diaria: racha + bonus XP de constancia. Retorna XP ganado. */
export function recordDaily(state: GameState, now: number = Date.now()): number {
  const today = dayKey(now);
  if (state.lastActiveDay === today) return 0;
  const yesterday = dayKey(now - 86_400_000);
  state.streakDays = state.lastActiveDay === yesterday ? state.streakDays + 1 : 1;
  state.lastActiveDay = today;
  const xp = awardXp('racha_diaria');
  state.xpWeekly += xp;
  return xp;
}

/** Suma XP por acción (sin tocar Elo). */
export function addActionXp(state: GameState, kind: XpAction['kind']): number {
  const xp = awardXp(kind, state.streakDays);
  state.xpWeekly += xp;
  return xp;
}

export interface AttemptInput {
  questionId: string;
  questionElo: number;
  correct: boolean;
}

/** Aplica un intento: mueve Elo jugador + Elo vivo de la pregunta. Sin XP aquí. */
export function recordAttempt(state: GameState, input: AttemptInput): { playerDelta: number; newElo: number } {
  const r = applyAttempt(state.elo, input.questionElo, input.correct);
  state.elo = r.newPlayerElo;
  state.questionElo[input.questionId] = r.newQuestionElo;
  return { playerDelta: r.playerDelta, newElo: r.newPlayerElo };
}

export function matchPool(state: GameState): MatchCandidate[] {
  return Object.entries(state.questionElo).map(([id, elo]) => ({ id, elo }));
}
