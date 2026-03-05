import { calculateEnglishProficiencyV2, type QuestionResult, type CEFRLevel, CEFR_LEVEL_NUM, NUM_TO_CEFR, parseCEFRLevel } from './english-proficiency';
import type { AppQuestion } from './api-service';

/**
 * Configuration for the Adaptive Engine
 */
export interface AdaptiveConfig {
  calibrationQuestions: number; // Number of questions before adapting (e.g., 3)
  targetAccuracyUpper: number;  // Threshold to increase difficulty (e.g., 75%)
  targetAccuracyLower: number;  // Threshold to decrease difficulty (e.g., 40%)
  baseDifficulty: number;       // Starting difficulty (1-10 scale usually mapped to CEFR)
  baseCEFR: CEFRLevel;          // Starting CEFR level for calibration
}

const DEFAULT_CONFIG: AdaptiveConfig = {
  calibrationQuestions: 3,
  targetAccuracyUpper: 75,
  targetAccuracyLower: 40,
  baseDifficulty: 5,
  baseCEFR: 'B1'
};

/**
 * Gets the next adaptive question from the pool based on the user's current performance.
 *
 * @param pool The full pool of available questions (the adaptive pool)
 * @param answeredResults Array of QuestionResult for questions already answered
 * @param usedQuestionIds Set of question IDs to avoid repeating
 * @param config Optional configuration tweaks
 * @returns The selected AppQuestion, or null if pool is exhausted
 */
export function getNextAdaptiveQuestion(
  pool: AppQuestion[],
  answeredResults: QuestionResult[],
  usedQuestionIds: Set<string>,
  config: Partial<AdaptiveConfig> = {}
): AppQuestion | null {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Filter out already used questions
  let availablePool = pool.filter(q => !usedQuestionIds.has(q.id));

  if (availablePool.length === 0) {
    return null; // No more questions available
  }

  // --- 🆕 3-Strike Protocol Logic ---
  // If the user fails the first 3 questions (calibration-like phase),
  // we shift them away from the "New Protocol" (v4+) to traditional content.
  const isProtocolV4 = (q: AppQuestion) => q.protocol_version?.startsWith('4') || false;

  const firstThreeResults = answeredResults.slice(0, 3);
  const hasThreeStrikes = firstThreeResults.length >= 3 && firstThreeResults.every(r => !r.isCorrect);

  if (hasThreeStrikes) {
    // 🛑 Strike Out: Exclude New Protocol questions
    const traditionalOnly = availablePool.filter(q => !isProtocolV4(q));
    if (traditionalOnly.length > 0) {
      availablePool = traditionalOnly;
    }
  } else {
    // 🌟 Normal/Initial: Prioritize New Protocol questions if available
    const protocolOnly = availablePool.filter(q => isProtocolV4(q));
    if (protocolOnly.length > 0) {
      availablePool = protocolOnly;
    }
  }
  // ----------------------------------

  // Phase 1: Calibration (Not enough data to adapt accurately yet)
  if (answeredResults.length < finalConfig.calibrationQuestions) {
    return getClosestQuestion(availablePool, finalConfig.baseCEFR, finalConfig.baseDifficulty);
  }

  // Phase 2: Adaptive Selection
  // 1. Evaluate current proficiency
  const proficiency = calculateEnglishProficiencyV2(answeredResults);

  let targetCEFRNum = proficiency.estimatedLevelNum;

  // 2. Adjust target based on current accuracy
  // If they are getting too many right, push them harder
  if (proficiency.overallAccuracy >= finalConfig.targetAccuracyUpper) {
    targetCEFRNum = Math.min(9, targetCEFRNum + 1); // Max C1
  }
  // If they are failing too much, ease off
  else if (proficiency.overallAccuracy <= finalConfig.targetAccuracyLower && proficiency.overallAccuracy > 0) {
    targetCEFRNum = Math.max(1, targetCEFRNum - 1); // Min A1
  }

  const targetCEFR = NUM_TO_CEFR[targetCEFRNum] || 'A2';

  // 3. Compute best difficulty for the NEW target CEFR
  let targetDifficulty = mapCEFRToAverageDifficulty(targetCEFR);

  // 4. Find the best matching question in the pool
  return getClosestQuestion(availablePool, targetCEFR, targetDifficulty);
}

/**
 * Helper: Finds the question in the pool that best matches the target CEFR and difficulty.
 */
function getClosestQuestion(pool: AppQuestion[], targetCEFR: CEFRLevel, targetDifficulty: number): AppQuestion | null {
  if (!pool || pool.length === 0) return null;

  const targetCEFRNum = CEFR_LEVEL_NUM[targetCEFR] || 1;

  // Map to calculate a "distance" score for each question
    const scoredQuestions = pool.map(q => {
      // Attempt to extract CEFR from various possible fields
      const cefrRaw = (q as any).cefr_level || (q as any).cefrLevel || ((q as any).meta && ((q as any).meta.cefr_level || (q as any).meta.cefrLevel));
      const qCEFR = parseCEFRLevel((cefrRaw as string) || undefined, q.grade);
      const qCEFRNum = CEFR_LEVEL_NUM[qCEFR] || 1;

      // Extract difficulty
      let qDiff = 3;
      if (typeof q.difficulty === 'number') {
        qDiff = q.difficulty;
      } else if ((q as any).meta && typeof (q as any).meta.difficulty === 'number') {
        qDiff = (q as any).meta.difficulty;
      }

      // Weight difference in CEFR more heavily than difference in relative difficulty
      const cefrDistance = Math.abs(qCEFRNum - targetCEFRNum) * 10;
      const diffDistance = Math.abs(qDiff - targetDifficulty);

    // Total distance score (lower is better)
    const distanceScore = cefrDistance + diffDistance;

    return { question: q, distanceScore };
  });

  // Sort by closest match (lowest score)
  scoredQuestions.sort((a, b) => a.distanceScore - b.distanceScore);

  // Group the best matches (e.g., all with the exact same minimum distance score)
  const bestScore = scoredQuestions[0].distanceScore;
  const bestMatches = scoredQuestions.filter(sq => sq.distanceScore === bestScore);

  // Return a random question from the exact best matches to add variety
  const randomIndex = Math.floor(Math.random() * bestMatches.length);
  return bestMatches[randomIndex].question;
}

/**
 * Helper: Rough mapping from CEFR level to expected 1-10 difficulty range
 */
function mapCEFRToAverageDifficulty(cefr: CEFRLevel): number {
  switch (cefr) {
    case 'A1': return 2;
    case 'A1+': return 3;
    case 'A2': return 4;
    case 'A2+': return 5;
    case 'B1': return 6;
    case 'B1+': return 7;
    case 'B2': return 8;
    case 'B2+': return 9;
    case 'C1': return 10;
    default: return 5;
  }
}
