/**
 * juego/olimpiada.ts — Olimpiadas trimestrales + camino a GOAT (F7).
 *
 * - Temporadas Q1–Q4 (`YYYY-QN`). Ventana del torneo: últimas 72h del trimestre.
 * - Elegibilidad on-device: tier Oro+ en ≥2 semanas de la season + ≥1 simulacro
 *   oficial (≥60 preguntas, accuracy ≥70%). Umbral 60 = `isLeaderboardEligible`
 *   (saberparatodos/src/lib/leaderboard.ts) para coherencia anti-smurf.
 * - Torneo async: 1 intento, set común de 20 (matchmaking ±200 excluyendo el
 *   set ya visto). Sin PII, sin red en este módulo (BR-03/BR-04).
 */

import { selectMatchmaking, type MatchCandidate } from './elo';
import type { LigaTier } from './types';

export const SEASON_MOCK_MIN_QUESTIONS = 60;
export const SEASON_MOCK_MIN_ACCURACY = 0.7;
export const SEASON_ORO_WEEKS = 2;
export const TORNEO_SET_SIZE = 20;
export const TORNEO_WINDOW_MS = 72 * 3600 * 1000;

/** `2026-Q3`. Trimestres calendario: Q1=Ene-Mar … Q4=Oct-Dic. */
export function seasonKey(ts: number): string {
  const d = new Date(ts);
  const q = Math.floor(d.getMonth() / 3) + 1;
  return `${d.getFullYear()}-Q${q}`;
}

/** Inicio/fin del trimestre (local, 00:00 → 23:59:59.999). */
export function seasonBounds(season: string): { start: number; end: number } {
  const m = /^(\d{4})-Q([1-4])$/.exec(season);
  if (!m) throw new Error('[olimpiada] season inválida (YYYY-QN)');
  const year = Number(m[1]);
  const q = Number(m[2]);
  const startMonth = (q - 1) * 3;
  return {
    start: new Date(year, startMonth, 1).getTime(),
    end: new Date(year, startMonth + 3, 0, 23, 59, 59, 999).getTime(),
  };
}

/** Ventana del torneo: últimas 72h del trimestre. */
export function torneoWindow(season: string): { opensAt: number; closesAt: number } {
  const { end } = seasonBounds(season);
  return { opensAt: end - TORNEO_WINDOW_MS + 1, closesAt: end };
}

export type VentanaEstado = 'futura' | 'abierta' | 'cerrada';

export function ventanaEstado(season: string, now: number = Date.now()): VentanaEstado {
  const { opensAt, closesAt } = torneoWindow(season);
  if (now < opensAt) return 'futura';
  if (now <= closesAt) return 'abierta';
  return 'cerrada';
}

export interface MockResult {
  questions: number;
  accuracy: number;
}

export interface Elegibilidad {
  elegible: boolean;
  semanasOro: number;
  mejorSimulacro: MockResult | null;
  motivos: string[];
}

/**
 * ¿Clasifica a la Olimpiada? Oro+ en ≥2 semanas + simulacro oficial válido.
 * `weeklyTiers`: tiers alcanzados cada semana de la season (cualquiera con Oro+ cuenta).
 */
export function esElegible(weeklyTiers: LigaTier[], mocks: MockResult[]): Elegibilidad {
  const motivos: string[] = [];
  const semanasOro = weeklyTiers.filter((t) => t === 'Oro' || t === 'Platino' || t === 'Diamante').length;
  if (semanasOro < SEASON_ORO_WEEKS) {
    motivos.push(`Necesitas Oro+ en ${SEASON_ORO_WEEKS} semanas (llevas ${semanasOro}).`);
  }
  const validos = mocks.filter(
    (m) => m.questions >= SEASON_MOCK_MIN_QUESTIONS && m.accuracy >= SEASON_MOCK_MIN_ACCURACY,
  );
  const mejorSimulacro = validos.length > 0 ? [...validos].sort((a, b) => b.accuracy - a.accuracy)[0] : null;
  if (!mejorSimulacro) {
    motivos.push(`Necesitas 1 simulacro oficial (≥${SEASON_MOCK_MIN_QUESTIONS} preguntas, ≥70%).`);
  }
  return { elegible: motivos.length === 0, semanasOro, mejorSimulacro, motivos };
}

/**
 * Set común del torneo: 20 preguntas en ventana Elo, excluyendo las ya vistas
 * (el llamante pasa el pool con Elo vivo + ids vistos en `exclude`).
 */
export function buildTorneoSet(
  pool: MatchCandidate[],
  playerElo: number,
  exclude: Set<string> = new Set(),
): MatchCandidate[] {
  return selectMatchmaking(pool, playerElo, TORNEO_SET_SIZE, 200, exclude);
}
