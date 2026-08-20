import { calculateEnglishProficiencyV2, type QuestionResult, type CEFRLevel, CEFR_LEVEL_NUM, NUM_TO_CEFR, parseCEFRLevel } from './english-proficiency';
import type { AppQuestion } from './api-service';

/**
 * Bloom Taxonomy Levels ordered from lowest to highest
 */
export const BLOOM_LEVELS = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'] as const;
export type BloomLevel = typeof BLOOM_LEVELS[number];

export const BLOOM_LEVEL_NUM: Record<string, number> = {
  'REMEMBER': 1, 'RECORDAR': 1,
  'UNDERSTAND': 2, 'COMPRENDER': 2,
  'APPLY': 3, 'APLICAR': 3,
  'ANALYZE': 4, 'ANALIZAR': 4,
  'EVALUATE': 5, 'EVALUAR': 5,
  'CREATE': 6, 'CREAR': 6
};

export const NUM_TO_BLOOM: Record<number, BloomLevel> = {
  1: 'Remember',
  2: 'Understand',
  3: 'Apply',
  4: 'Analyze',
  5: 'Evaluate',
  6: 'Create'
};

/**
 * Difficulty Bands from bundle formats (D1-D2, D3-D4, D5-D6, D7-D8, D9-D10)
 */
export const DIFFICULTY_BANDS = ['D1-D2', 'D3-D4', 'D5-D6', 'D7-D8', 'D9-D10'] as const;
export type DifficultyBand = typeof DIFFICULTY_BANDS[number];

export const DIFFICULTY_BAND_NUM: Record<string, number> = {
  'D1-D2': 1, 'D1': 1, 'D2': 1,
  'D3-D4': 2, 'D3': 2, 'D4': 2,
  'D5-D6': 3, 'D5': 3, 'D6': 3,
  'D7-D8': 4, 'D7': 4, 'D8': 4,
  'D9-D10': 5, 'D9': 5, 'D10': 5
};

export const NUM_TO_DIFFICULTY_BAND: Record<number, DifficultyBand> = {
  1: 'D1-D2',
  2: 'D3-D4',
  3: 'D5-D6',
  4: 'D7-D8',
  5: 'D9-D10'
};

/**
 * Parse Bloom Level from metadata
 */
export function parseBloomLevel(bloomRaw?: any): BloomLevel | null {
  if (!bloomRaw) return null;
  const normalized = String(bloomRaw).trim().toUpperCase();
  const num = BLOOM_LEVEL_NUM[normalized];
  return num ? NUM_TO_BLOOM[num] || null : null;
}

/**
 * Parse Difficulty Band from metadata
 */
export function parseDifficultyBand(bandRaw?: any): DifficultyBand | null {
  if (!bandRaw) return null;
  const normalized = String(bandRaw).trim().toUpperCase();
  const num = DIFFICULTY_BAND_NUM[normalized];
  if (num) return NUM_TO_DIFFICULTY_BAND[num];
  if (normalized.includes('D1') || normalized.includes('D2')) return 'D1-D2';
  if (normalized.includes('D3') || normalized.includes('D4')) return 'D3-D4';
  if (normalized.includes('D5') || normalized.includes('D6')) return 'D5-D6';
  if (normalized.includes('D7') || normalized.includes('D8')) return 'D7-D8';
  if (normalized.includes('D9') || normalized.includes('D10')) return 'D9-D10';
  return null;
}

/**
 * Configuration for the Adaptive Engine
 */
export interface AdaptiveConfig {
  calibrationQuestions: number;     // Number of questions before adapting (e.g., 3)
  targetAccuracyUpper: number;      // Threshold to increase difficulty (e.g., 75%)
  targetAccuracyLower: number;      // Threshold to decrease difficulty (e.g., 40%)
  baseDifficulty: number;           // Starting difficulty (1-10 scale)
  baseCEFR: CEFRLevel;              // Starting CEFR level for calibration (English)
  baseBloom: BloomLevel;            // Starting Bloom level for STEM / Humanities
  baseDifficultyBand: DifficultyBand; // Starting difficulty band
}

const DEFAULT_CONFIG: AdaptiveConfig = {
  calibrationQuestions: 3,
  targetAccuracyUpper: 75,
  targetAccuracyLower: 40,
  baseDifficulty: 5,
  baseCEFR: 'B1',
  baseBloom: 'Apply',
  baseDifficultyBand: 'D5-D6'
};

/**
 * Interface extending question metadata for adaptive scoring
 */
export interface ExtendedQuestionMetadata {
  bloom?: string;
  bloom_level?: string;
  difficulty_band?: string;
  calibration?: {
    difficulty_band?: string;
    expected_success?: number;
  };
  cefr_level?: string;
  difficulty?: number | string;
}

/**
 * Gets the next adaptive question from the pool based on the user's current performance.
 * Works across all subjects (matemáticas, lengua, ciencias, sociales, inglés).
 *
 * @param pool The full pool of available questions
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
  const isProtocolV4 = (q: AppQuestion) => {
    const protocolVal = parseFloat(q.protocol_version || '3.1');
    return !isNaN(protocolVal) && protocolVal >= 4.0;
  };

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
    return getClosestQuestion(availablePool, {
      targetCEFR: finalConfig.baseCEFR,
      targetBloom: finalConfig.baseBloom,
      targetDifficultyBand: finalConfig.baseDifficultyBand,
      targetDifficulty: finalConfig.baseDifficulty
    });
  }

  // Phase 2: Subject-Agnostic Adaptive Selection
  // Detect if current questions or pool heavily utilize CEFR metadata
  const isCEFRMode = isPoolOrResultsCEFR(availablePool, answeredResults);

  if (isCEFRMode) {
    // English / CEFR Path
    const proficiency = calculateEnglishProficiencyV2(answeredResults);
    let targetCEFRNum = proficiency.estimatedLevelNum;

    if (proficiency.overallAccuracy >= finalConfig.targetAccuracyUpper) {
      targetCEFRNum = Math.min(9, targetCEFRNum + 1); // Max C1
    } else if (proficiency.overallAccuracy <= finalConfig.targetAccuracyLower && proficiency.overallAccuracy > 0) {
      targetCEFRNum = Math.max(1, targetCEFRNum - 1); // Min A1
    }

    const targetCEFR = NUM_TO_CEFR[targetCEFRNum] || 'A2';
    const targetDifficulty = mapCEFRToAverageDifficulty(targetCEFR);

    return getClosestQuestion(availablePool, {
      targetCEFR,
      targetDifficulty
    });
  }

  // STEM / Humanities / General Subject Path (Bloom taxonomy & Difficulty Bands)
  const totalAnswered = answeredResults.length;
  const correctCount = answeredResults.filter(r => r.isCorrect).length;
  const overallAccuracy = totalAnswered > 0 ? (correctCount / totalAnswered) * 100 : 50;

  // Calculate current baseline difficulty from answered questions
  let currentAvgDiff = finalConfig.baseDifficulty;
  const diffs = answeredResults.map(r => r.difficulty).filter((d): d is number => typeof d === 'number' && d > 0);
  if (diffs.length > 0) {
    currentAvgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  }

  // Adapt target difficulty based on performance thresholds
  let targetDifficulty = currentAvgDiff;
  if (overallAccuracy >= finalConfig.targetAccuracyUpper) {
    targetDifficulty = Math.min(10, currentAvgDiff + 2);
  } else if (overallAccuracy <= finalConfig.targetAccuracyLower && overallAccuracy > 0) {
    targetDifficulty = Math.max(1, currentAvgDiff - 2);
  }

  // Infer target Bloom level (1-6) and Difficulty Band (D1-D2 to D9-D10)
  const targetBloomNum = Math.min(6, Math.max(1, Math.round((targetDifficulty / 10) * 6)));
  const targetBloom = NUM_TO_BLOOM[targetBloomNum] || 'Apply';

  const targetBandNum = Math.min(5, Math.max(1, Math.ceil(targetDifficulty / 2)));
  const targetDifficultyBand = NUM_TO_DIFFICULTY_BAND[targetBandNum] || 'D5-D6';

  return getClosestQuestion(availablePool, {
    targetBloom,
    targetDifficultyBand,
    targetDifficulty
  });
}

/**
 * Helper: Detects whether questions/results use CEFR metadata
 */
function isPoolOrResultsCEFR(pool: AppQuestion[], answeredResults: QuestionResult[]): boolean {
  const hasCEFRResult = answeredResults.some(r => Boolean(r.cefrLevel && r.cefrLevel !== 'A2'));
  if (hasCEFRResult) return true;

  const cefrInPool = pool.filter(q => {
    const raw = q.cefr_level || (q.meta && (q.meta.cefr_level || (q.meta as any).cefrLevel));
    return Boolean(raw);
  });

  return cefrInPool.length > pool.length * 0.3; // Over 30% of pool has explicit CEFR
}

/**
 * Targets interface for adaptive selection
 */
export interface AdaptiveTargets {
  targetCEFR?: CEFRLevel;
  targetBloom?: BloomLevel;
  targetDifficultyBand?: DifficultyBand;
  targetDifficulty: number;
}

/**
 * Helper: Finds the question in the pool that best matches the target CEFR, Bloom level, difficulty band, and difficulty.
 */
function getClosestQuestion(
  pool: AppQuestion[],
  targets: AdaptiveTargets
): AppQuestion | null {
  if (!pool || pool.length === 0) return null;

  const targetCEFRNum = targets.targetCEFR ? (CEFR_LEVEL_NUM[targets.targetCEFR] || 1) : null;
  const targetBloomNum = targets.targetBloom ? (BLOOM_LEVEL_NUM[targets.targetBloom.toUpperCase()] || 3) : null;
  const targetBandNum = targets.targetDifficultyBand ? (DIFFICULTY_BAND_NUM[targets.targetDifficultyBand] || 3) : null;

  const scoredQuestions = pool.map(q => {
    // 1. CEFR Level
    const cefrRaw = q.cefr_level || (q.meta && ((q.meta as any).cefr_level || (q.meta as any).cefrLevel));
    const qCEFR = parseCEFRLevel((cefrRaw as string) || undefined, q.grade);
    const qCEFRNum = CEFR_LEVEL_NUM[qCEFR] || 1;
    const cefrDistance = targetCEFRNum !== null ? Math.abs(qCEFRNum - targetCEFRNum) * 10 : 0;

    // 2. Bloom Taxonomy Level
    const bloomRaw = (q as any).bloom || (q as any).bloom_level || (q.meta && ((q.meta as any).bloom || (q.meta as any).bloom_level));
    const qBloom = parseBloomLevel(bloomRaw);
    const qBloomNum = qBloom ? (BLOOM_LEVEL_NUM[qBloom.toUpperCase()] || 3) : null;
    const bloomDistance = (targetBloomNum !== null && qBloomNum !== null)
      ? Math.abs(qBloomNum - targetBloomNum) * 5
      : 0;

    // 3. Difficulty Band (D3-D4, D5-D6, etc.)
    const bandRaw = (q as any).difficulty_band ||
      (q as any).calibration?.difficulty_band ||
      (q.meta && ((q.meta as any).difficulty_band || (q.meta as any).calibration?.difficulty_band));
    const qBand = parseDifficultyBand(bandRaw);
    const qBandNum = qBand ? (DIFFICULTY_BAND_NUM[qBand] || 3) : null;
    const bandDistance = (targetBandNum !== null && qBandNum !== null)
      ? Math.abs(qBandNum - targetBandNum) * 5
      : 0;

    // 4. Numeric Difficulty (1-10 scale)
    let qDiff = 5;
    if (typeof q.difficulty === 'number') {
      qDiff = q.difficulty;
    } else if (typeof (q as any).difficulty === 'string') {
      const parsedBand = parseDifficultyBand((q as any).difficulty);
      if (parsedBand) {
        qDiff = (DIFFICULTY_BAND_NUM[parsedBand] || 3) * 2;
      }
    } else if (q.meta && typeof q.meta.difficulty === 'number') {
      qDiff = q.meta.difficulty;
    }
    const diffDistance = Math.abs(qDiff - targets.targetDifficulty);

    // Total distance score (lower is better)
    const distanceScore = cefrDistance + bloomDistance + bandDistance + diffDistance;

    return { question: q, distanceScore };
  });

  // Sort by closest match (lowest score)
  scoredQuestions.sort((a, b) => a.distanceScore - b.distanceScore);

  // Group the best matches
  const bestScore = scoredQuestions[0].distanceScore;
  const bestMatches = scoredQuestions.filter(sq => sq.distanceScore === bestScore);

  // Return a random question from the exact best matches for variety
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
