/**
 * training-history.ts
 * Historial local de sesiones de entrenamiento de NeuroGym.
 *
 * Todo se guarda en el dispositivo (localStorage). Cada acceso va envuelto en
 * try/catch: en modo privado, con almacenamiento lleno o bloqueado, la app sigue
 * funcionando con un historial vacío en memoria.
 */

import { createStaircase, type StaircaseState } from './adaptive-staircase';
import {
  getTrainingGame,
  performanceIndex,
  SKILL_ORDER,
  type NeuroSkill,
  type SessionScore,
  type TrainingGameId
} from './training-catalog';

export const TRAINING_HISTORY_KEY = 'neurogym_training_history_v1';
export const TRAINING_LEVELS_KEY = 'neurogym_training_levels_v1';
export const MAX_HISTORY_RECORDS = 300;

export interface TrainingSessionRecord {
  id: string;
  gameId: TrainingGameId;
  skill: NeuroSkill;
  timestamp: number;
  /** Fecha local YYYY-MM-DD. */
  dateStr: string;
  accuracy: number;
  points: number;
  meanRtMs: number | null;
  correct: number;
  total: number;
  startLevel: number;
  endLevel: number;
  maxLevel: number;
  /** Índice 0..100 (ver performanceIndex). */
  index: number;
}

/**
 * Resumen que se emite al terminar una sesión (callback `onSessionComplete`).
 * Contrato estable para otros módulos (p. ej. compartir con la institución):
 * solo contiene agregados, nunca ensayos individuales ni datos personales.
 */
export interface NeuroSessionSummary {
  gameId: TrainingGameId;
  gameName: string;
  skill: NeuroSkill;
  completedAt: number;
  accuracy: number;
  correct: number;
  total: number;
  points: number;
  meanRtMs: number | null;
  startLevel: number;
  endLevel: number;
  index: number;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function defaultStorage(): StorageLike | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

function readJson<T>(key: string, fallback: T, storage: StorageLike | null): T {
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown, storage: StorageLike | null): boolean {
  if (!storage) return false;
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function toLocalDateStr(ms: number): string {
  const d = new Date(ms);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Días enteros entre dos fechas locales YYYY-MM-DD (b - a). */
export function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  const ua = Date.UTC(ay, am - 1, ad);
  const ub = Date.UTC(by, bm - 1, bd);
  return Math.round((ub - ua) / 86400000);
}

function isRecord(v: any): v is TrainingSessionRecord {
  return (
    v &&
    typeof v === 'object' &&
    typeof v.gameId === 'string' &&
    typeof v.timestamp === 'number' &&
    typeof v.accuracy === 'number' &&
    typeof v.dateStr === 'string'
  );
}

/** Historial completo, del más reciente al más antiguo. */
export function loadTrainingHistory(storage: StorageLike | null = defaultStorage()): TrainingSessionRecord[] {
  const raw = readJson<unknown>(TRAINING_HISTORY_KEY, [], storage);
  if (!Array.isArray(raw)) return [];
  return raw.filter(isRecord).sort((a, b) => b.timestamp - a.timestamp);
}

export function buildSessionRecord(
  gameId: TrainingGameId,
  score: SessionScore,
  startLevel: number,
  endLevel: number,
  timestamp: number
): TrainingSessionRecord {
  const def = getTrainingGame(gameId);
  return {
    id: `${gameId}_${timestamp}`,
    gameId,
    skill: def.skill,
    timestamp,
    dateStr: toLocalDateStr(timestamp),
    accuracy: score.accuracy,
    points: score.points,
    meanRtMs: score.meanRtMs,
    correct: score.correct,
    total: score.total,
    startLevel,
    endLevel,
    maxLevel: def.bounds.maxLevel,
    index: performanceIndex(score.accuracy, Math.max(startLevel, score.peakLevel), def.bounds.maxLevel)
  };
}

export function toSessionSummary(record: TrainingSessionRecord): NeuroSessionSummary {
  return {
    gameId: record.gameId,
    gameName: getTrainingGame(record.gameId).name,
    skill: record.skill,
    completedAt: record.timestamp,
    accuracy: record.accuracy,
    correct: record.correct,
    total: record.total,
    points: record.points,
    meanRtMs: record.meanRtMs,
    startLevel: record.startLevel,
    endLevel: record.endLevel,
    index: record.index
  };
}

export function saveTrainingSession(
  record: TrainingSessionRecord,
  storage: StorageLike | null = defaultStorage()
): TrainingSessionRecord[] {
  const history = loadTrainingHistory(storage).filter((r) => r.id !== record.id);
  const next = [record, ...history].slice(0, MAX_HISTORY_RECORDS);
  writeJson(TRAINING_HISTORY_KEY, next, storage);
  return next;
}

export function clearTrainingHistory(storage: StorageLike | null = defaultStorage()): void {
  if (!storage) return;
  try {
    storage.removeItem(TRAINING_HISTORY_KEY);
    storage.removeItem(TRAINING_LEVELS_KEY);
  } catch {
    // almacenamiento no disponible: nada que limpiar
  }
}

// ---------------------------------------------------------------------------
// Niveles de la escalera por juego
// ---------------------------------------------------------------------------

export type LevelMap = Partial<Record<TrainingGameId, StaircaseState>>;

export function loadLevels(storage: StorageLike | null = defaultStorage()): LevelMap {
  const raw = readJson<unknown>(TRAINING_LEVELS_KEY, {}, storage);
  return raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as LevelMap) : {};
}

export function getGameLevel(gameId: TrainingGameId, levels: LevelMap): StaircaseState {
  const def = getTrainingGame(gameId);
  const stored = levels[gameId];
  if (stored && typeof stored.level === 'number') {
    const s = createStaircase(stored.level, def.bounds);
    return { ...s, correctStreak: Math.max(0, Math.round(stored.correctStreak || 0)) };
  }
  return createStaircase(def.bounds.minLevel, def.bounds);
}

export function saveGameLevel(
  gameId: TrainingGameId,
  state: StaircaseState,
  storage: StorageLike | null = defaultStorage()
): LevelMap {
  const levels = { ...loadLevels(storage), [gameId]: state };
  writeJson(TRAINING_LEVELS_KEY, levels, storage);
  return levels;
}

// ---------------------------------------------------------------------------
// Racha y tendencias
// ---------------------------------------------------------------------------

/**
 * Racha de días consecutivos con al menos una sesión. Sigue viva si la última
 * sesión fue hoy o ayer.
 */
export function computeStreak(dateStrs: string[], todayStr: string): number {
  const unique = Array.from(new Set(dateStrs)).sort().reverse();
  if (unique.length === 0) return 0;
  const gapToToday = daysBetween(unique[0], todayStr);
  if (gapToToday > 1 || gapToToday < 0) return 0;
  let streak = 1;
  for (let i = 1; i < unique.length; i++) {
    if (daysBetween(unique[i], unique[i - 1]) === 1) streak++;
    else break;
  }
  return streak;
}

export interface SkillTrend {
  skill: NeuroSkill;
  /** Índices 0..100, del más antiguo al más reciente. */
  points: number[];
  latest: number | null;
  /** Diferencia entre la media de la mitad reciente y la mitad antigua. */
  delta: number;
  sessions: number;
}

export function getSkillTrend(
  records: TrainingSessionRecord[],
  skill: NeuroSkill,
  lastN = 10
): SkillTrend {
  const ofSkill = records
    .filter((r) => r.skill === skill)
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-lastN);
  const points = ofSkill.map((r) => r.index);
  let delta = 0;
  if (points.length >= 2) {
    const half = Math.floor(points.length / 2);
    const older = points.slice(0, half);
    const newer = points.slice(points.length - half);
    delta = Math.round(avg(newer) - avg(older));
  }
  return {
    skill,
    points,
    latest: points.length > 0 ? points[points.length - 1] : null,
    delta,
    sessions: records.filter((r) => r.skill === skill).length
  };
}

export function getAllSkillTrends(records: TrainingSessionRecord[], lastN = 10): SkillTrend[] {
  return SKILL_ORDER.map((s) => getSkillTrend(records, s, lastN));
}

/**
 * Convierte una serie 0..100 en el atributo `points` de un <polyline> SVG.
 */
export function sparklinePoints(values: number[], width: number, height: number, pad = 2): string {
  if (values.length === 0) return '';
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const step = values.length > 1 ? innerW / (values.length - 1) : 0;
  return values
    .map((v, i) => {
      const x = values.length > 1 ? pad + i * step : width / 2;
      const y = pad + innerH - (Math.min(100, Math.max(0, v)) / 100) * innerH;
      return `${round1(x)},${round1(y)}`;
    })
    .join(' ');
}

function avg(xs: number[]): number {
  return xs.length > 0 ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
}

function round1(v: number): number {
  return Math.round(v * 10) / 10;
}
