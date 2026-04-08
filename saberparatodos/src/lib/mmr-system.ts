
/**
 * MMR (Matchmaking Rating) System
 * Uses a modified ELO rating system to track student skill levels.
 *
 * Base MMR: 1000 (Average Student)
 * Min MMR: 0
 * Max MMR: 3000
 */

export const BASE_MMR = 1000;
const K_FACTOR = 40; // Volatility factor (higher = faster changes)

export const ICFES_PROXY_METHODOLOGY_VERSION = 'icfes-proxy-v1';
export const ICFES_PROXY_DISCLAIMER =
  'Estimacion de practica; no reemplaza el reporte oficial del ICFES.';

export type IcfesEstimateConfidence = 'low' | 'medium' | 'high';

export interface IcfesModuleScores {
  lectura?: number;
  matematicas?: number;
  sociales?: number;
  ciencias?: number;
  ingles?: number;
}

export interface IcfesEstimate {
  score: number;
  confidence: IcfesEstimateConfidence;
  label: string;
  evidenceCount: number;
  methodologyVersion: string;
  minimumEvidenceMet: boolean;
  disclaimer: string;
  estimatedModuleScores?: IcfesModuleScores;
}

export interface IcfesProxySignals {
  mmr: number;
  accuracy?: number;
  evidenceCount?: number;
  averageDifficulty?: number;
  consistencyScore?: number;
  subjectCoverage?: number;
  estimatedModuleScores?: IcfesModuleScores;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function confidenceFromEvidence(
  evidenceCount: number,
  subjectCoverage: number
): IcfesEstimateConfidence {
  if (evidenceCount >= 80 && subjectCoverage >= 3) return 'high';
  if (evidenceCount >= 20) return 'medium';
  return 'low';
}

function confidenceLabel(confidence: IcfesEstimateConfidence): string {
  if (confidence === 'high') return 'Alta confianza';
  if (confidence === 'medium') return 'Confianza media';
  return 'Resultado provisional';
}

function evidenceFactor(evidenceCount: number): number {
  if (evidenceCount <= 0) return 0.55;
  if (evidenceCount < 20) return 0.55 + (evidenceCount / 20) * 0.15;
  if (evidenceCount < 80) return 0.7 + ((evidenceCount - 20) / 60) * 0.22;
  return Math.min(1, 0.92 + ((evidenceCount - 80) / 120) * 0.08);
}

function subjectCoverageFactor(subjectCoverage: number): number {
  if (subjectCoverage >= 4) return 1.0;
  if (subjectCoverage === 3) return 0.97;
  if (subjectCoverage === 2) return 0.94;
  return 0.9;
}

export function estimateIcfesScore(signals: IcfesProxySignals): IcfesEstimate {
  const accuracy = clamp(signals.accuracy ?? 0.5, 0, 1);
  const evidenceCount = Math.max(0, Math.round(signals.evidenceCount ?? 0));
  const averageDifficulty = clamp(signals.averageDifficulty ?? 3, 1, 5);
  const consistencyScore = clamp(signals.consistencyScore ?? 50, 0, 100);
  const subjectCoverage = Math.max(1, Math.round(signals.subjectCoverage ?? 1));

  const normalizedMMR = clamp((signals.mmr - 700) / 900, 0, 1);
  const mmrBaseScore = 130 + normalizedMMR * 250;
  const accuracyAdjustment = (accuracy - 0.5) * 140;
  const difficultyAdjustment = (averageDifficulty - 3) * 18;
  const consistencyAdjustment = ((consistencyScore - 50) / 50) * 30;

  const rawScore = mmrBaseScore + accuracyAdjustment + difficultyAdjustment + consistencyAdjustment;
  const scaledScore = rawScore * evidenceFactor(evidenceCount) * subjectCoverageFactor(subjectCoverage);
  const score = clamp(Math.round(scaledScore), 0, 500);
  const confidence = confidenceFromEvidence(evidenceCount, subjectCoverage);

  return {
    score,
    confidence,
    label: confidenceLabel(confidence),
    evidenceCount,
    methodologyVersion: ICFES_PROXY_METHODOLOGY_VERSION,
    minimumEvidenceMet: evidenceCount >= 20,
    disclaimer: ICFES_PROXY_DISCLAIMER,
    estimatedModuleScores: signals.estimatedModuleScores
  };
}

/**
 * Convert internal MMR to simulated ICFES Score (0-500)
 * @deprecated Use `estimateIcfesScore` instead to get a full `IcfesEstimate` object.
 * Public-facing features should consume `estimateIcfesScore`.
 */
export function getSimulatedIcfesScore(mmr: number, signals: Partial<IcfesProxySignals> = {}): number {
  return estimateIcfesScore({
    mmr,
    accuracy: signals.accuracy,
    evidenceCount: signals.evidenceCount,
    averageDifficulty: signals.averageDifficulty,
    consistencyScore: signals.consistencyScore,
    subjectCoverage: signals.subjectCoverage,
    estimatedModuleScores: signals.estimatedModuleScores
  }).score;
}

/**
 * Calculate expected score (probability of winning)
 * Formula: 1 / (1 + 10^((RatingB - RatingA) / 400))
 */
export function getExpectedScore(playerRating: number, difficultyRating: number): number {
  return 1 / (1 + Math.pow(10, (difficultyRating - playerRating) / 400));
}

/**
 * Convert difficulty (1-5) to Rating (600-1400)
 */
export function difficultyToRating(difficulty: number): number {
  // Diff 1: 600 (Easy)
  // Diff 3: 1000 (Medium)
  // Diff 5: 1400 (Hard)
  return 400 + (difficulty * 200);
}

/**
 * Calculate grade multiplier for scoring
 * Questions below user's grade give fewer points
 * @param userGrade The grade the user is studying for (e.g., 11)
 * @param questionGrade The grade of the question (e.g., 5)
 * @returns Multiplier (0.7 to 1.2)
 */
export function getGradeMultiplier(userGrade: number, questionGrade: number): number {
  const gradeDiff = userGrade - questionGrade;

  if (gradeDiff <= 0) {
    // Same grade or higher: bonus for harder questions (max 1.2x for +2 grades)
    return Math.min(1.2, 1.0 + (Math.abs(gradeDiff) * 0.1));
  }

  if (gradeDiff <= 2) {
    return 0.85; // 1-2 grades lower
  }

  return 0.7; // 3+ grades lower (e.g., G11 user answering G3 question)
}

/**
 * Calculate new MMR after a question attempt
 * @param currentMMR Current player rating (default 1000)
 * @param questionDifficulty Difficulty 1-5
 * @param isCorrect Whether the answer was correct
 * @param userGrade Optional: The grade the user is studying for
 * @param questionGrade Optional: The grade of the question
 * @returns Object with newRating, delta, expected, and gradeMultiplier
 */
export function calculateNewMMR(
  currentMMR: number,
  questionDifficulty: number,
  isCorrect: boolean,
  userGrade?: number,
  questionGrade?: number
): { newRating: number, delta: number, expected: number, gradeMultiplier: number } {

  // Apply grade multiplier to K-Factor
  const gradeMultiplier = (userGrade && questionGrade)
    ? getGradeMultiplier(userGrade, questionGrade)
    : 1.0;
  const effectiveK = K_FACTOR * gradeMultiplier;

  const questionRating = difficultyToRating(questionDifficulty);
  const expected = getExpectedScore(currentMMR, questionRating);
  const actual = isCorrect ? 1 : 0;

  // Calculate delta with grade-adjusted K-Factor
  const delta = Math.round(effectiveK * (actual - expected));
  let newRating = currentMMR + delta;

  // Prevent negative MMR
  if (newRating < 0) newRating = 0;

  return { newRating, delta, expected, gradeMultiplier };
}

/**
 * Get rank title based on MMR
 */
export function getRankTitle(mmr: number): string {
  if (mmr < 600) return 'Iniciado';
  if (mmr < 800) return 'Aprendiz';
  if (mmr < 1000) return 'Estudiante';
  if (mmr < 1200) return 'Avanzado';
  if (mmr < 1400) return 'Experto';
  if (mmr < 1600) return 'Maestro';
  return 'Gran Maestro';
}
