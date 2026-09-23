/**
 * juego/types.ts — Contratos del área /juego (F1).
 *
 * Separación estricta (diseño aprobado 2026-09-23):
 * - Elo = maestría real (matchmaking + perfil). Escala 100–2200, K=32.
 * - XP = esfuerzo/constancia (ligas semanales). Nunca se mezclan.
 * - Todo on-device (localStorage). Sin PII, sin telemetría (BR-03/BR-04).
 * - Opt-in BR-06 lo gestiona la UI; este módulo no emite red.
 */

export type DifficultyBand = 'D1-D2' | 'D3-D4' | 'D5-D6' | 'D7-D8' | 'D9-D10';

export type LigaTier = 'Bronce' | 'Plata' | 'Oro' | 'Platino' | 'Diamante';

export type SemaforoEstado = 'dominado' | 'desarrollo' | 'mejorar';

export interface EloResult {
  newPlayerElo: number;
  newQuestionElo: number;
  playerDelta: number;
  questionDelta: number;
  expected: number;
}

export interface XpAction {
  kind: 'respuesta' | 'correccion' | 'racha_diaria' | 'examen_completo';
}

export interface GameState {
  v: 1;
  /** Elo de maestría (100–2200). Inicial según grado (docs/DECISION-ELO-MMR.md). */
  elo: number;
  /** XP de la semana vigente (resetea lunes). Solo esfuerzo. */
  xpWeekly: number;
  /** Clave de semana ISO `YYYY-WNN` del xpWeekly. */
  weekKey: string;
  /** Racha de días activos consecutivos. */
  streakDays: number;
  /** `YYYY-MM-DD` de la última actividad. */
  lastActiveDay: string | null;
  /** Elo por pregunta (vivo, local): questionId -> elo. */
  questionElo: Record<string, number>;
  updatedAt: number;
}

export interface SemaforoNodo {
  tema: string;
  estado: SemaforoEstado;
  accuracy: number;
  correctas: number;
  totales: number;
}
