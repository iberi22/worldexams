
/**
 * MMR (Matchmaking Rating) System
 * Uses a modified ELO rating system to track student skill levels.
 *
 * Base MMR: 250 (Average Student in normalized 0-500 scale)
 * Min MMR: 0
 * Max MMR: 500
 */

export const BASE_MMR = 250;
const K_FACTOR = 16; // Adjusted for 0-500 range (was 40 for 0-3000)

export const MMR_PROXY_METHODOLOGY_VERSION = 'icfes-proxy-v1';
export const MMR_PROXY_DISCLAIMER =
  'Estimacion de practica; no reemplaza el reporte oficial del ICFES.';

export const PAES_PROXY_METHODOLOGY_VERSION = 'paes-proxy-v1';
export const PAES_PROXY_DISCLAIMER =
  'Estimación de práctica; no reemplaza el reporte oficial del DEMRE.';

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
  examType?: 'ICFES' | 'PAES';
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

  const rawScore = clamp(signals.mmr, 0, 500);
  const scaledScore = rawScore * evidenceFactor(evidenceCount) * subjectCoverageFactor(subjectCoverage);
  const score = clamp(Math.round(scaledScore), 0, 500);
  const confidence = confidenceFromEvidence(evidenceCount, subjectCoverage);

  return {
    score,
    confidence,
    label: confidenceLabel(confidence),
    evidenceCount,
    methodologyVersion: MMR_PROXY_METHODOLOGY_VERSION,
    minimumEvidenceMet: evidenceCount >= 20,
    disclaimer: MMR_PROXY_DISCLAIMER,
    estimatedModuleScores: signals.estimatedModuleScores,
    examType: 'ICFES'
  };
}

/**
 * Estimate PAES score (150-850) based on signals
 */
export function estimatePaesScore(signals: IcfesProxySignals): IcfesEstimate {
  const evidenceCount = Math.max(0, Math.round(signals.evidenceCount ?? 0));
  const subjectCoverage = Math.max(1, Math.round(signals.subjectCoverage ?? 1));

  // PAES Scale: 150 to 850
  // MMR (0-500) mapped to (150-850)
  // 0 MMR -> 150
  // 500 MMR -> 850
  // Formula: 150 + (MMR * (850-150)/500) = 150 + (MMR * 1.4)
  const rawScore = clamp(signals.mmr, 0, 500);
  const earnedPaes = rawScore * 1.4;

  // Adjusted scaling to ensure 500 MMR reaches 850 when evidence is maxed
  // The current evidenceFactor and subjectCoverageFactor can be < 1.0 even with high evidence.
  // We want the estimate to be more "honest" about the scale if evidence is high.
  const factor = evidenceFactor(evidenceCount) * subjectCoverageFactor(subjectCoverage);

  // If we have high evidence, we should reach the top of the scale.
  // However, the methodology typically penalizes lack of evidence.
  // For PAES, we apply the penalty factors ONLY to the earned points above the 150 minimum base.
  const scaledScore = 150 + (earnedPaes * factor);
  const score = clamp(Math.round(scaledScore), 150, 850);
  const confidence = confidenceFromEvidence(evidenceCount, subjectCoverage);

  return {
    score,
    confidence,
    label: confidenceLabel(confidence),
    evidenceCount,
    methodologyVersion: PAES_PROXY_METHODOLOGY_VERSION,
    minimumEvidenceMet: evidenceCount >= 20,
    disclaimer: PAES_PROXY_DISCLAIMER,
    estimatedModuleScores: signals.estimatedModuleScores,
    examType: 'PAES'
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
 * Formula: 1 / (1 + 10^((RatingB - RatingA) / 100))
 */
export function getExpectedScore(playerRating: number, difficultyRating: number): number {
  return 1 / (1 + Math.pow(10, (difficultyRating - playerRating) / 100));
}

/**
 * Convert difficulty (1-5) to Rating (150-350)
 */
export function difficultyToRating(difficulty: number): number {
  // Scale (1-5) mapped to (150-350)
  // Diff 1: 150
  // Diff 3: 250
  // Diff 5: 350
  return 100 + (difficulty * 50);
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
 * @param currentMMR Current player rating (default 250)
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
  // Cap at 500
  if (newRating > 500) newRating = 500;

  return { newRating, delta, expected, gradeMultiplier };
}

/**
 * Get rank title based on MMR
 */
export function getRankTitle(mmr: number): string {
  if (mmr < 150) return 'Iniciado';
  if (mmr < 220) return 'Aprendiz';
  if (mmr < 280) return 'Estudiante';
  if (mmr < 340) return 'Avanzado';
  if (mmr < 400) return 'Experto';
  if (mmr < 460) return 'Maestro';
  return 'Gran Maestro';
}
