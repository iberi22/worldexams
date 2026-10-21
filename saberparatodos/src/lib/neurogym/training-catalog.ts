/**
 * training-catalog.ts
 * Catálogo de juegos de entrenamiento de NeuroGym y su puntuación.
 *
 * Cada juego declara: habilidad entrenada, instrucciones en español, tamaño de
 * la ronda de práctica y de la ronda puntuada, rango de niveles y cómo un nivel
 * se traduce en parámetros concretos del estímulo. La puntuación es pura y
 * determinista para poder probarla sin DOM.
 *
 * Alcance honesto: son ejercicios de entrenamiento de atención, memoria de
 * trabajo y velocidad de procesamiento. No miden ni prometen cambios de CI.
 */

import type { StaircaseBounds } from './adaptive-staircase';

export type NeuroSkill =
  | 'atencion'
  | 'memoria_trabajo'
  | 'velocidad_procesamiento'
  | 'flexibilidad'
  | 'razonamiento';

export const SKILL_ORDER: NeuroSkill[] = [
  'atencion',
  'memoria_trabajo',
  'velocidad_procesamiento',
  'flexibilidad',
  'razonamiento'
];

export const SKILL_LABELS: Record<NeuroSkill, string> = {
  atencion: 'Atención',
  memoria_trabajo: 'Memoria de trabajo',
  velocidad_procesamiento: 'Velocidad de procesamiento',
  flexibilidad: 'Flexibilidad cognitiva',
  razonamiento: 'Razonamiento'
};

export type TrainingGameId =
  | 'stroop'
  | 'reaction'
  | 'corsi'
  | 'nback'
  | 'cardsort'
  | 'trail'
  | 'arithmetic'
  | 'vocabulary'
  | 'rotation';

/** Juegos por ensayos (el contenedor controla cada ensayo) o por bloque (el estímulo corre la tarea entera). */
export type TrainingGameMode = 'trials' | 'block';

export interface TrainingGameDef {
  id: TrainingGameId;
  name: string;
  icon: string;
  skill: NeuroSkill;
  mode: TrainingGameMode;
  /** Instrucciones paso a paso, en español. */
  instructions: string[];
  /** Controles de teclado y táctiles. */
  controls: string;
  /** Ensayos de práctica (modo trials) o 1 bloque corto (modo block). No puntúan. */
  practiceTrials: number;
  /** Ensayos puntuados (modo trials) o 1 bloque (modo block). */
  scoredTrials: number;
  bounds: StaircaseBounds;
  /** Ventana máxima de respuesta por ensayo en ms (null = sin límite). */
  deadlineMs: (level: number) => number | null;
  /** Texto corto que explica qué cambia al subir de nivel. */
  levelHint: (level: number) => string;
}

export const TRAINING_GAMES: TrainingGameDef[] = [
  {
    id: 'stroop',
    name: 'Colores en conflicto (Stroop)',
    icon: '🎨',
    skill: 'atencion',
    mode: 'trials',
    instructions: [
      'Aparecerá el nombre de un color escrito con tinta de otro color.',
      'Elige el COLOR DE LA TINTA e ignora lo que dice la palabra.',
      'Responde lo más rápido que puedas sin equivocarte.'
    ],
    controls: 'Toca un botón o usa las teclas 1 (Rojo), 2 (Azul), 3 (Verde) y 4 (Amarillo).',
    practiceTrials: 3,
    scoredTrials: 10,
    bounds: { minLevel: 1, maxLevel: 6 },
    deadlineMs: (level) => Math.max(1200, 4000 - (level - 1) * 500),
    levelHint: (level) =>
      `Tienes ${(Math.max(1200, 4000 - (level - 1) * 500) / 1000).toFixed(1)} s por palabra${level >= 3 ? ' y casi todas son incongruentes' : ''}.`
  },
  {
    id: 'reaction',
    name: 'Reacción rápida',
    icon: '⚡',
    skill: 'velocidad_procesamiento',
    mode: 'trials',
    instructions: [
      'El panel empieza en rojo: espera sin tocar.',
      'Cuando cambie a VERDE, tócalo de inmediato.',
      'Si tocas antes de tiempo o tardas demasiado, el intento no cuenta.'
    ],
    controls: 'Toca el panel o pulsa Espacio / Enter.',
    practiceTrials: 2,
    scoredTrials: 8,
    bounds: { minLevel: 1, maxLevel: 6 },
    deadlineMs: (level) => Math.max(400, 1000 - (level - 1) * 100),
    levelHint: (level) => `Ventana de respuesta: ${Math.max(400, 1000 - (level - 1) * 100)} ms.`
  },
  {
    id: 'corsi',
    name: 'Bloques de Corsi',
    icon: '🧊',
    skill: 'memoria_trabajo',
    mode: 'trials',
    instructions: [
      'Mira con atención: varios bloques se iluminarán uno tras otro.',
      'Cuando termine la secuencia, toca los bloques en el MISMO orden.',
      'Cada vez que aciertes dos seguidas, la secuencia se alarga un bloque.'
    ],
    controls: 'Toca los bloques o recórrelos con Tab y confirma con Enter / Espacio.',
    practiceTrials: 1,
    scoredTrials: 6,
    bounds: { minLevel: 1, maxLevel: 7 },
    deadlineMs: () => null,
    levelHint: (level) => `Secuencias de ${level + 2} bloques.`
  },
  {
    id: 'nback',
    name: 'Dual N-Back',
    icon: '🎵',
    skill: 'memoria_trabajo',
    mode: 'block',
    instructions: [
      'En cada paso se ilumina una casilla y suena una letra.',
      'Pulsa "Posición" si la casilla es la misma que hace N pasos.',
      'Pulsa "Sonido" si la letra es la misma que hace N pasos.'
    ],
    controls: 'Toca los botones o usa las teclas A / ← (posición) y L / → (sonido).',
    practiceTrials: 1,
    scoredTrials: 1,
    bounds: { minLevel: 1, maxLevel: 4 },
    deadlineMs: () => null,
    levelHint: (level) => `Nivel ${level}-Back.`
  },
  {
    id: 'cardsort',
    name: 'Clasificación de tarjetas',
    icon: '🎴',
    skill: 'flexibilidad',
    mode: 'block',
    instructions: [
      'Empareja la carta de abajo con una de las 4 pilas de arriba.',
      'La regla (color, forma o cantidad) está oculta: descúbrela con la retroalimentación.',
      'Sin aviso, la regla cambia. Adáptate lo antes posible.'
    ],
    controls: 'Toca una pila o usa las teclas 1, 2, 3 y 4.',
    practiceTrials: 1,
    scoredTrials: 1,
    bounds: { minLevel: 1, maxLevel: 4 },
    deadlineMs: () => null,
    levelHint: (level) => `La regla cambia tras ${cardSortSwitchAfter(level)} aciertos seguidos.`
  },
  {
    id: 'trail',
    name: 'Rastreo de caminos',
    icon: '🧭',
    skill: 'velocidad_procesamiento',
    mode: 'block',
    instructions: [
      'Toca los círculos en orden, lo más rápido que puedas.',
      'Nivel 1: solo números (1 → 2 → 3...).',
      'Nivel 2: alterna número y letra (1 → A → 2 → B...).'
    ],
    controls: 'Toca los círculos o recórrelos con Tab y confirma con Enter.',
    practiceTrials: 1,
    scoredTrials: 1,
    bounds: { minLevel: 1, maxLevel: 2 },
    deadlineMs: () => null,
    levelHint: (level) => (level >= 2 ? 'Parte B: alterna números y letras.' : 'Parte A: solo números.')
  },
  {
    id: 'arithmetic',
    name: 'Cálculo ágil',
    icon: '➗',
    skill: 'razonamiento',
    mode: 'trials',
    instructions: [
      'Lee el problema y elige el resultado correcto entre 4 opciones.',
      'Hay un tiempo límite por problema; la barra muestra cuánto queda.',
      'Si se acaba el tiempo, el problema cuenta como no respondido.'
    ],
    controls: 'Toca una opción o usa las teclas 1 a 4.',
    practiceTrials: 2,
    scoredTrials: 8,
    bounds: { minLevel: 1, maxLevel: 5 },
    deadlineMs: () => 30000,
    levelHint: (level) => `Problemas de dificultad ${level} de 5.`
  },
  {
    id: 'vocabulary',
    name: 'Vocabulario',
    icon: '📖',
    skill: 'razonamiento',
    mode: 'trials',
    instructions: [
      'Verás una palabra y cuatro definiciones.',
      'Elige la definición que mejor corresponde a la palabra.',
      'Tienes 20 segundos por palabra.'
    ],
    controls: 'Toca una opción o usa las teclas 1 a 4.',
    practiceTrials: 2,
    scoredTrials: 8,
    bounds: { minLevel: 1, maxLevel: 5 },
    deadlineMs: () => 20000,
    levelHint: (level) => `Palabras de dificultad ${level} de 5.`
  },
  {
    id: 'rotation',
    name: 'Rotación mental 3D',
    icon: '🎮',
    skill: 'razonamiento',
    mode: 'trials',
    instructions: [
      'Gira la figura hasta que coincida con la orientación objetivo indicada.',
      'Cada botón gira la figura 15° en una dirección.',
      'Si se acaba el tiempo antes de alinearla, el intento no cuenta.'
    ],
    controls: 'Toca las flechas o usa las teclas de flecha del teclado.',
    practiceTrials: 1,
    scoredTrials: 4,
    bounds: { minLevel: 1, maxLevel: 5 },
    deadlineMs: (level) => Math.max(15000, 45000 - (level - 1) * 7500),
    levelHint: (level) =>
      `Objetivo más alejado y ${Math.round(Math.max(15000, 45000 - (level - 1) * 7500) / 1000)} s por figura.`
  }
];

export function getTrainingGame(id: TrainingGameId): TrainingGameDef {
  const def = TRAINING_GAMES.find((g) => g.id === id);
  if (!def) throw new Error(`Juego NeuroGym desconocido: ${id}`);
  return def;
}

export function gamesForSkill(skill: NeuroSkill): TrainingGameDef[] {
  return TRAINING_GAMES.filter((g) => g.skill === skill);
}

// ---------------------------------------------------------------------------
// Parámetros de estímulo por nivel
// ---------------------------------------------------------------------------

export function corsiSpanForLevel(level: number): number {
  return level + 2;
}

export function cardSortSwitchAfter(level: number): number {
  return Math.max(3, 7 - level);
}

/**
 * Semilla Stroop para un ensayo. En niveles >= 3 se eligen semillas cuyo
 * estímulo es incongruente (generateStroopTrial marca congruente si seed % 3 === 0).
 */
export function stroopSeedFor(trialIndex: number, level: number, sessionSeed: number): number {
  let seed = sessionSeed * 7 + trialIndex * 5 + level;
  if (level >= 3 && seed % 3 === 0) seed += 1;
  return seed;
}

/** Ángulo objetivo de rotación: crece con el nivel (múltiplos de 15°). */
export function rotationTargetFor(trialIndex: number, level: number): { x: number; y: number } {
  const steps = level + 1;
  const x = ((trialIndex % 2 === 0 ? steps : steps - 1) * 15) % 360;
  const y = ((steps + (trialIndex % 3)) * 15) % 360;
  return { x, y };
}

// ---------------------------------------------------------------------------
// Puntuación
// ---------------------------------------------------------------------------

export interface TrialOutcome {
  correct: boolean;
  /** Tiempo de respuesta en ms (null si no hubo respuesta). */
  rtMs: number | null;
  /** Nivel en el que se presentó el ensayo. */
  level: number;
  /** Ventana máxima del ensayo en ms (para el bono de rapidez). */
  deadlineMs?: number | null;
}

export interface SessionScore {
  correct: number;
  total: number;
  /** 0..1 */
  accuracy: number;
  /** Media de tiempos de respuesta de los aciertos (null si no hay). */
  meanRtMs: number | null;
  points: number;
  /** Nivel más alto en el que se acertó. */
  peakLevel: number;
}

const BASE_POINTS = 100;
const MAX_SPEED_BONUS = 50;

/** Puntos de un ensayo: 100 × nivel si acierta, más hasta 50 de bono por rapidez. */
export function trialPoints(t: TrialOutcome): number {
  if (!t.correct) return 0;
  let bonus = 0;
  if (t.deadlineMs && t.deadlineMs > 0 && t.rtMs !== null) {
    const ratio = 1 - Math.min(1, Math.max(0, t.rtMs / t.deadlineMs));
    bonus = Math.round(MAX_SPEED_BONUS * ratio);
  }
  return BASE_POINTS * Math.max(1, t.level) + bonus;
}

export function scoreTrials(trials: TrialOutcome[]): SessionScore {
  const total = trials.length;
  const hits = trials.filter((t) => t.correct);
  const rts = hits.map((t) => t.rtMs).filter((v): v is number => typeof v === 'number' && v > 0);
  return {
    correct: hits.length,
    total,
    accuracy: total > 0 ? round3(hits.length / total) : 0,
    meanRtMs: rts.length > 0 ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : null,
    points: trials.reduce((sum, t) => sum + trialPoints(t), 0),
    peakLevel: hits.reduce((m, t) => Math.max(m, t.level), 0)
  };
}

/** Métricas mínimas que entrega DualNBackStimulus. */
export interface NBackBlockResult {
  nLevel: number;
  accuracy: number;
  combinedF1: number;
  totalOpportunities: number;
}

/** El bloque N-Back se considera superado con F1 combinado >= 0.8. */
export const NBACK_PASS_F1 = 0.8;

export function scoreNBack(stats: NBackBlockResult): SessionScore {
  const f1 = clamp01(stats.combinedF1);
  const total = Math.max(0, stats.totalOpportunities);
  const correct = Math.round(clamp01(stats.accuracy) * total);
  return {
    correct,
    total,
    accuracy: round3(clamp01(stats.accuracy)),
    meanRtMs: null,
    points: Math.round(f1 * BASE_POINTS * 10 * Math.max(1, stats.nLevel)),
    peakLevel: f1 >= NBACK_PASS_F1 ? stats.nLevel : Math.max(0, stats.nLevel - 1)
  };
}

export interface CardSortBlockResult {
  correctTrials: number;
  totalTrials: number;
  ruleSwitches: number;
  perseverativeErrors: number;
}

export function scoreCardSort(stats: CardSortBlockResult, level: number): SessionScore {
  const total = Math.max(0, stats.totalTrials);
  const correct = Math.min(total, Math.max(0, stats.correctTrials));
  const accuracy = total > 0 ? correct / total : 0;
  const raw = correct * 20 * Math.max(1, level) + stats.ruleSwitches * 50 - stats.perseverativeErrors * 10;
  return {
    correct,
    total,
    accuracy: round3(accuracy),
    meanRtMs: null,
    points: Math.max(0, Math.round(raw)),
    peakLevel: accuracy >= 0.8 ? level : Math.max(0, level - 1)
  };
}

export interface TrailBlockResult {
  totalTimeMs: number;
  errors: number;
  nodes: number;
}

/** Tiempo de referencia generoso por nodo (ms) para el bono de rapidez. */
export const TRAIL_REFERENCE_MS_PER_NODE = 3000;

export function scoreTrail(stats: TrailBlockResult, level: number): SessionScore {
  const nodes = Math.max(1, stats.nodes);
  const errors = Math.max(0, stats.errors);
  // Precisión = toques correctos / toques totales.
  const accuracy = nodes / (nodes + errors);
  const reference = nodes * TRAIL_REFERENCE_MS_PER_NODE;
  const speed = 1 - Math.min(1, Math.max(0, stats.totalTimeMs / reference));
  const points = Math.round(nodes * 20 * Math.max(1, level) + speed * 500 - errors * 25);
  return {
    correct: nodes,
    total: nodes + errors,
    accuracy: round3(accuracy),
    meanRtMs: Math.round(stats.totalTimeMs / nodes),
    points: Math.max(0, points),
    peakLevel: accuracy >= 0.8 ? level : Math.max(0, level - 1)
  };
}

/** Un bloque cuenta como "superado" para la escalera entre sesiones. */
export function blockPassed(score: SessionScore): boolean {
  return score.accuracy >= 0.8;
}

/**
 * Índice de desempeño 0..100 para tendencias: 60 % precisión + 40 % nivel alcanzado.
 * Así subir de nivel con la misma precisión se refleja como progreso.
 */
export function performanceIndex(accuracy: number, level: number, maxLevel: number): number {
  const levelShare = maxLevel > 1 ? (Math.max(1, level) - 1) / (maxLevel - 1) : 1;
  return Math.round(clamp01(accuracy) * 60 + clamp01(levelShare) * 40);
}

function clamp01(v: number): number {
  if (!Number.isFinite(v)) return 0;
  return Math.min(1, Math.max(0, v));
}

function round3(v: number): number {
  return Math.round(v * 1000) / 1000;
}
