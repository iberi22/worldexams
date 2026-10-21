/**
 * adaptive-staircase.ts
 * Escalera adaptativa simple "2-up / 1-down" para la dificultad de NeuroGym.
 *
 * - 2 respuestas correctas consecutivas  -> sube un nivel (más difícil).
 * - 1 respuesta incorrecta               -> baja un nivel (más fácil).
 *
 * Esta regla converge alrededor del ~70,7 % de aciertos (Levitt, 1971), lo que
 * mantiene el ejercicio exigente sin volverse frustrante. Es determinista: el
 * mismo historial de respuestas produce siempre el mismo nivel.
 */

export interface StaircaseState {
  level: number;
  /** Aciertos consecutivos acumulados desde el último cambio de nivel. */
  correctStreak: number;
}

export interface StaircaseBounds {
  minLevel: number;
  maxLevel: number;
}

export const STAIRCASE_UP_AFTER = 2;

export function createStaircase(level: number, bounds: StaircaseBounds): StaircaseState {
  return { level: clampLevel(level, bounds), correctStreak: 0 };
}

export function clampLevel(level: number, bounds: StaircaseBounds): number {
  if (!Number.isFinite(level)) return bounds.minLevel;
  return Math.min(bounds.maxLevel, Math.max(bounds.minLevel, Math.round(level)));
}

/**
 * Aplica una respuesta a la escalera y devuelve el nuevo estado (no muta).
 */
export function stepStaircase(
  state: StaircaseState,
  correct: boolean,
  bounds: StaircaseBounds
): StaircaseState {
  const level = clampLevel(state.level, bounds);
  if (!correct) {
    return { level: clampLevel(level - 1, bounds), correctStreak: 0 };
  }
  const streak = state.correctStreak + 1;
  if (streak >= STAIRCASE_UP_AFTER) {
    return { level: clampLevel(level + 1, bounds), correctStreak: 0 };
  }
  return { level, correctStreak: streak };
}

/**
 * Recorre una secuencia completa de respuestas.
 */
export function runStaircase(
  start: StaircaseState,
  outcomes: boolean[],
  bounds: StaircaseBounds
): StaircaseState {
  return outcomes.reduce((s, ok) => stepStaircase(s, ok, bounds), start);
}
