
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

/**
 * Convert internal MMR to simulated ICFES Score (0-500)
 * Logic: MMR 1000 (Avg) -> 250 (ICFES Avg)
 * Factor: 4
 */
export function getSimulatedIcfesScore(mmr: number): number {
  return Math.min(500, Math.max(0, Math.round(mmr / 4)));
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
