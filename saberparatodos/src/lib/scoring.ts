/**
 * Sistema de Puntuación para World Exams
 *
 * Calcula puntos basados en:
 * - Dificultad de la pregunta (1-5)
 * - Tiempo de respuesta
 * - Racha de aciertos (streak)
 * - Precisión general
 */

// ============================================================================
// TIPOS
// ============================================================================

export interface ScoringConfig {
  basePoints: number;
  difficultyMultipliers: [number, number, number, number, number]; // Niveles 1-5
  timeBonus: {
    maxMultiplier: number;
    decaySeconds: number;
  };
  streakBonus: {
    incrementPerStreak: number;
    maxMultiplier: number;
  };
  incorrectPenalty: number;
  completionBonus: number;
  accuracyBonusThreshold: number;
  accuracyBonusMultiplier: number;
  perfectBonus: number;
}

export interface QuestionResult {
  questionId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  isCorrect: boolean;
  timeSeconds: number;
  currentStreak: number;
}

export interface QuestionScore {
  baseScore: number;
  difficultyMultiplier: number;
  timeBonus: number;
  streakMultiplier: number;
  totalScore: number;
  breakdown: string;
}

export interface ExamResult {
  questions: QuestionResult[];
  totalTimeSeconds: number;
  startedAt: string;
  completedAt: string;
}

export interface ExamScore {
  questionScores: QuestionScore[];
  subtotal: number;
  completionBonus: number;
  accuracyBonus: number;
  perfectBonus: number;
  totalScore: number;
  stats: ExamStats;
}

export interface ExamStats {
  questionsAnswered: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  averageDifficulty: number;
  averageTimePerQuestion: number;
  longestStreak: number;
  totalTimeSeconds: number;
}

// ============================================================================
// CONFIGURACIÓN POR DEFECTO
// ============================================================================

export const DEFAULT_SCORING_CONFIG: ScoringConfig = {
  basePoints: 100,
  difficultyMultipliers: [0.8, 1.0, 1.2, 1.4, 1.6], // Índice 0 = dificultad 1
  timeBonus: {
    maxMultiplier: 1.5,
    decaySeconds: 120 // Después de 120s no hay bonus
  },
  streakBonus: {
    incrementPerStreak: 0.1,
    maxMultiplier: 2.0
  },
  incorrectPenalty: -20,
  completionBonus: 50,
  accuracyBonusThreshold: 0.8, // 80%
  accuracyBonusMultiplier: 200,
  perfectBonus: 100
};

// ============================================================================
// FUNCIONES DE CÁLCULO
// ============================================================================

/**
 * Calcula el multiplicador por dificultad
 * Dificultad 1 → 0.8x, Dificultad 5 → 1.6x
 */
export function getDifficultyMultiplier(
  difficulty: number,
  config: ScoringConfig = DEFAULT_SCORING_CONFIG
): number {
  const index = Math.max(0, Math.min(4, difficulty - 1));
  return config.difficultyMultipliers[index];
}

/**
 * Calcula el bonus por tiempo de respuesta
 * Respuesta rápida (< 30s) → hasta 1.5x
 * Respuesta lenta (> 120s) → 1.0x (sin bonus)
 */
export function getTimeBonus(
  timeSeconds: number,
  config: ScoringConfig = DEFAULT_SCORING_CONFIG
): number {
  const { maxMultiplier, decaySeconds } = config.timeBonus;

  if (timeSeconds >= decaySeconds) {
    return 1.0;
  }

  // Decay lineal: más rápido = más bonus
  const ratio = timeSeconds / decaySeconds;
  const bonus = maxMultiplier - (ratio * (maxMultiplier - 1.0));

  return Math.max(1.0, Math.min(maxMultiplier, bonus));
}

/**
 * Calcula el multiplicador por racha de aciertos
 * Cada acierto consecutivo añade +10%, máximo 2.0x
 */
export function getStreakMultiplier(
  currentStreak: number,
  config: ScoringConfig = DEFAULT_SCORING_CONFIG
): number {
  const { incrementPerStreak, maxMultiplier } = config.streakBonus;

  const multiplier = 1.0 + (currentStreak * incrementPerStreak);
  return Math.min(multiplier, maxMultiplier);
}

/**
 * Calcula los puntos de una pregunta individual
 */
export function calculateQuestionScore(
  result: QuestionResult,
  config: ScoringConfig = DEFAULT_SCORING_CONFIG
): QuestionScore {
  if (!result.isCorrect) {
    const penalty = config.incorrectPenalty * getDifficultyMultiplier(result.difficulty, config);
    return {
      baseScore: 0,
      difficultyMultiplier: getDifficultyMultiplier(result.difficulty, config),
      timeBonus: 0,
      streakMultiplier: 0,
      totalScore: Math.round(penalty),
      breakdown: `Incorrecta: ${Math.round(penalty)} pts (penalización)`
    };
  }

  const baseScore = config.basePoints;
  const difficultyMultiplier = getDifficultyMultiplier(result.difficulty, config);
  const timeBonus = getTimeBonus(result.timeSeconds, config);
  const streakMultiplier = getStreakMultiplier(result.currentStreak, config);

  const totalScore = Math.round(baseScore * difficultyMultiplier * timeBonus * streakMultiplier);

  const breakdown = [
    `Base: ${baseScore}`,
    `Dificultad: ×${difficultyMultiplier.toFixed(1)}`,
    `Tiempo: ×${timeBonus.toFixed(2)}`,
    `Racha (${result.currentStreak}): ×${streakMultiplier.toFixed(1)}`,
    `= ${totalScore} pts`
  ].join(' | ');

  return {
    baseScore,
    difficultyMultiplier,
    timeBonus,
    streakMultiplier,
    totalScore,
    breakdown
  };
}

/**
 * Calcula la racha más larga de aciertos
 */
export function calculateLongestStreak(questions: QuestionResult[]): number {
  let maxStreak = 0;
  let currentStreak = 0;

  for (const q of questions) {
    if (q.isCorrect) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
}

/**
 * Calcula las estadísticas de un examen
 */
export function calculateExamStats(exam: ExamResult): ExamStats {
  const { questions, totalTimeSeconds } = exam;

  const correctAnswers = questions.filter(q => q.isCorrect).length;
  const incorrectAnswers = questions.length - correctAnswers;
  const accuracy = questions.length > 0 ? correctAnswers / questions.length : 0;

  const totalDifficulty = questions.reduce((sum, q) => sum + q.difficulty, 0);
  const averageDifficulty = questions.length > 0 ? totalDifficulty / questions.length : 0;

  const averageTimePerQuestion = questions.length > 0 ? totalTimeSeconds / questions.length : 0;

  const longestStreak = calculateLongestStreak(questions);

  return {
    questionsAnswered: questions.length,
    correctAnswers,
    incorrectAnswers,
    accuracy,
    averageDifficulty,
    averageTimePerQuestion,
    longestStreak,
    totalTimeSeconds
  };
}

/**
 * Calcula el puntaje total de un examen completo
 */
export function calculateExamScore(
  exam: ExamResult,
  config: ScoringConfig = DEFAULT_SCORING_CONFIG
): ExamScore {
  // Calcular estadísticas
  const stats = calculateExamStats(exam);

  // Calcular puntos por pregunta
  const questionScores = exam.questions.map(q => calculateQuestionScore(q, config));

  // Subtotal de preguntas
  const subtotal = questionScores.reduce((sum, qs) => sum + qs.totalScore, 0);

  // Bonus por completar
  const completionBonus = exam.questions.length >= 7 ? config.completionBonus : 0;

  // Bonus por precisión (si >= 80%)
  let accuracyBonus = 0;
  if (stats.accuracy >= config.accuracyBonusThreshold) {
    accuracyBonus = Math.round(
      (stats.accuracy - config.accuracyBonusThreshold) * config.accuracyBonusMultiplier
    );
  }

  // Bonus perfecto (100% de aciertos)
  const perfectBonus = stats.accuracy === 1.0 ? config.perfectBonus : 0;

  // Total final
  const totalScore = Math.max(0, subtotal + completionBonus + accuracyBonus + perfectBonus);

  return {
    questionScores,
    subtotal,
    completionBonus,
    accuracyBonus,
    perfectBonus,
    totalScore,
    stats
  };
}

// ============================================================================
// VALIDACIÓN ANTI-CHEATING
// ============================================================================

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Límites para detección de trampas
 */
export const VALIDATION_LIMITS = {
  minTimePerQuestion: 3, // segundos mínimos por pregunta
  maxPointsPerQuestion: 480, // 100 × 1.6 × 1.5 × 2.0
  maxSubmissionsPerHour: 10,
  maxAccuracyForFastAnswers: 0.95 // Si responde muy rápido, no puede tener >95% accuracy
};

/**
 * Valida que los resultados del examen sean plausibles
 */
export function validateExamResult(
  exam: ExamResult,
  score: ExamScore
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Validar tiempo mínimo
  const minTotalTime = exam.questions.length * VALIDATION_LIMITS.minTimePerQuestion;
  if (exam.totalTimeSeconds < minTotalTime) {
    errors.push(`Tiempo total (${exam.totalTimeSeconds}s) menor al mínimo posible (${minTotalTime}s)`);
  }

  // 2. Validar tiempo por pregunta
  for (const q of exam.questions) {
    if (q.timeSeconds < VALIDATION_LIMITS.minTimePerQuestion) {
      warnings.push(`Pregunta ${q.questionId}: tiempo sospechosamente bajo (${q.timeSeconds}s)`);
    }
  }

  // 3. Validar puntuación máxima teórica
  const maxPossible = exam.questions.length * VALIDATION_LIMITS.maxPointsPerQuestion;
  if (score.subtotal > maxPossible) {
    errors.push(`Puntuación (${score.subtotal}) excede máximo teórico (${maxPossible})`);
  }

  // 4. Validar consistencia accuracy vs score
  if (score.stats.accuracy === 0 && score.subtotal > 0) {
    errors.push('Inconsistencia: accuracy=0 pero score>0');
  }

  // 5. Validar respuestas muy rápidas con alta precisión
  const avgTime = score.stats.averageTimePerQuestion;
  if (avgTime < 10 && score.stats.accuracy > VALIDATION_LIMITS.maxAccuracyForFastAnswers) {
    warnings.push('Patrón sospechoso: respuestas muy rápidas con alta precisión');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// ============================================================================
// UTILIDADES DE FORMATO
// ============================================================================

/**
 * Formatea puntos con separador de miles
 */
export function formatScore(score: number): string {
  return score.toLocaleString('es-CO');
}

/**
 * Formatea porcentaje
 */
export function formatAccuracy(accuracy: number): string {
  return `${(accuracy * 100).toFixed(1)}%`;
}

/**
 * Formatea tiempo en formato mm:ss
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Obtiene el nombre del nivel de dificultad
 */
export function getDifficultyName(difficulty: number): string {
  const names = ['Muy fácil', 'Fácil', 'Media', 'Difícil', 'Muy difícil'];
  return names[Math.max(0, Math.min(4, difficulty - 1))];
}

/**
 * Obtiene el color del nivel de dificultad (para UI)
 */
export function getDifficultyColor(difficulty: number): string {
  const colors = [
    'text-green-400',   // 1 - Muy fácil
    'text-lime-400',    // 2 - Fácil
    'text-yellow-400',  // 3 - Media
    'text-orange-400',  // 4 - Difícil
    'text-red-400'      // 5 - Muy difícil
  ];
  return colors[Math.max(0, Math.min(4, difficulty - 1))];
}
