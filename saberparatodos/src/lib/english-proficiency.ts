/**
 * 🎯 Enhanced English Proficiency Assessment
 *
 * Implements adaptive CEFR level calculation based on:
 * - Question-level CEFR metadata (not just grade mapping)
 * - Statistical confidence scoring
 * - Ceiling method for accurate level detection
 * - Sub-level differentiation (A2- vs A2+)
 *
 * Inspired by best practices from EF SET, Duolingo, and Cambridge Assessment
 */

// CEFR Levels ordered from lowest to highest
export const CEFR_LEVELS = ['A1', 'A1+', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'B2+', 'C1'] as const;
export type CEFRLevel = typeof CEFR_LEVELS[number];

// Numeric mapping for calculations
export const CEFR_LEVEL_NUM: Record<CEFRLevel, number> = {
  'A1': 1, 'A1+': 2, 'A2': 3, 'A2+': 4,
  'B1': 5, 'B1+': 6, 'B2': 7, 'B2+': 8, 'C1': 9
};

// Reverse mapping
export const NUM_TO_CEFR: Record<number, CEFRLevel> = {
  1: 'A1', 2: 'A1+', 3: 'A2', 4: 'A2+',
  5: 'B1', 6: 'B1+', 7: 'B2', 8: 'B2+', 9: 'C1'
};

// Grade to CEFR fallback (when question doesn't have cefr_level)
export const GRADE_TO_CEFR: Record<number, CEFRLevel> = {
  3: 'A1',
  5: 'A1+',
  6: 'A2',
  7: 'A2+',
  8: 'B1',
  9: 'B1+',
  10: 'B2',
  11: 'B2+'
};

/**
 * Result for a single answered question
 */
export interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  cefrLevel: CEFRLevel;    // From question metadata
  sourceGrade?: number;    // Original grade
  difficulty?: number;     // 1-5 difficulty rating if available
  topics?: string[];       // 🆕 Granular topics for NotebookLM
}

/**
 * Per-level breakdown stats
 */
export interface LevelStats {
  level: CEFRLevel;
  levelNum: number;
  correct: number;
  total: number;
  accuracy: number;
}

/**
 * Complete proficiency assessment result
 */
export interface EnglishProficiencyResult {
  // Primary result
  estimatedLevel: CEFRLevel;
  estimatedLevelNum: number;

  // Confidence metrics
  confidence: number;           // 0-100%
  confidenceLabel: 'Low' | 'Medium' | 'High' | 'Very High';

  // Detailed breakdown
  breakdown: LevelStats[];

  // Assessment metadata
  totalQuestions: number;
  correctAnswers: number;
  overallAccuracy: number;

  // Personalized feedback
  recommendation: string;
  strengthLevels: CEFRLevel[];
  weaknessLevels: CEFRLevel[];

  // Cognitive stats
  cognitiveStats?: {
    highDifficultyCorrect: number; // Questions with diff 4-5 correct
    highDifficultyTotal: number;   // Questions with diff 4-5 total
    cognitiveAccuracy: number;     // %
    label: string;                 // "Logical Thinker", "Critical Analyst", etc.
  };
  failedTopics: string[]; // 🆕
}

/**
 * Parse CEFR level from question metadata
 * Handles various formats: "A2", "A2+", "B2/C1", etc.
 */
export function parseCEFRLevel(cefrString: string | undefined, fallbackGrade?: number): CEFRLevel {
  if (!cefrString && fallbackGrade) {
    return GRADE_TO_CEFR[fallbackGrade] || 'A2';
  }

  if (!cefrString) return 'A2';

  const normalized = cefrString.trim().toUpperCase();

  // Handle compound levels like "B2/C1" - take the lower one
  if (normalized.includes('/')) {
    const levels = normalized.split('/');
    const firstLevel = levels[0].trim() as CEFRLevel;
    if (CEFR_LEVELS.includes(firstLevel)) {
      return firstLevel;
    }
  }

  // Direct match
  if (CEFR_LEVELS.includes(normalized as CEFRLevel)) {
    return normalized as CEFRLevel;
  }

  // Match base level (A1, A2, B1, B2, C1)
  const baseMatch = normalized.match(/^([ABC][12])/);
  if (baseMatch) {
    const base = baseMatch[1];
    const hasPlus = normalized.includes('+');
    const level = (hasPlus ? `${base}+` : base) as CEFRLevel;
    if (CEFR_LEVELS.includes(level)) {
      return level;
    }
    // Fallback to base
    if (CEFR_LEVELS.includes(base as CEFRLevel)) {
      return base as CEFRLevel;
    }
  }

  return 'A2'; // Default fallback
}

/**
 * Calculate confidence based on sample size and answer consistency
 */
function calculateConfidence(
  breakdown: LevelStats[],
  totalQuestions: number
): { confidence: number; label: 'Low' | 'Medium' | 'High' | 'Very High' } {
  // Base confidence from sample size
  // 30 questions = 50%, 60+ questions = 100%
  const sampleConfidence = Math.min(100, Math.round((totalQuestions / 60) * 100));

  // Consistency bonus: higher if results follow expected pattern
  // (higher accuracy at lower levels, lower accuracy at higher levels)
  let consistencyScore = 0;
  const sortedBreakdown = [...breakdown].sort((a, b) => a.levelNum - b.levelNum);

  for (let i = 0; i < sortedBreakdown.length - 1; i++) {
    const current = sortedBreakdown[i];
    const next = sortedBreakdown[i + 1];

    // Expected: current level accuracy >= next level accuracy
    if (current.accuracy >= next.accuracy) {
      consistencyScore += 10;
    } else {
      // Slight penalty for inconsistent pattern
      consistencyScore -= 5;
    }
  }

  // Normalize consistency to 0-30 range
  const maxConsistency = Math.max(0, breakdown.length - 1) * 10;
  const normalizedConsistency = maxConsistency > 0
    ? Math.max(0, Math.min(30, (consistencyScore / maxConsistency) * 30))
    : 15;

  // Final confidence: 70% sample size, 30% consistency
  const confidence = Math.round(sampleConfidence * 0.7 + normalizedConsistency);

  // Determine label
  let label: 'Low' | 'Medium' | 'High' | 'Very High';
  if (confidence < 30) label = 'Low';
  else if (confidence < 60) label = 'Medium';
  else if (confidence < 85) label = 'High';
  else label = 'Very High';

  return { confidence: Math.min(100, Math.max(0, confidence)), label };
}

/**
 * Find the "ceiling" level - highest level where student performs well
 * Uses adaptive thresholds based on industry best practices
 */
function findCeilingLevel(breakdown: LevelStats[]): {
  level: CEFRLevel;
  levelNum: number;
} {
  if (breakdown.length === 0) {
    return { level: 'A1', levelNum: 1 };
  }

  // Sort by level number
  const sorted = [...breakdown]
    .filter(b => b.total >= 1) // Only consider levels with at least 1 question
    .sort((a, b) => a.levelNum - b.levelNum);

  if (sorted.length === 0) {
    return { level: 'A1', levelNum: 1 };
  }

  // Thresholds (based on EF SET methodology)
  const MASTERY_THRESHOLD = 80;   // >= 80% = solid at this level
  const COMPETENT_THRESHOLD = 60; // >= 60% = working at this level


  let masteredLevel = 0;
  let competentLevel = 0;

  for (const stats of sorted) {
    if (stats.accuracy >= MASTERY_THRESHOLD) {
      masteredLevel = stats.levelNum;
    }
    if (stats.accuracy >= COMPETENT_THRESHOLD) {
      competentLevel = Math.max(competentLevel, stats.levelNum);
    }
  }

  // Use mastered level if available, otherwise competent level
  let estimatedNum = masteredLevel > 0 ? masteredLevel : competentLevel;

  // 🐛 FIX: If no levels reached competency threshold, assign based on overall accuracy
  // This prevents high levels (B2+) from being assigned with low accuracy
  if (estimatedNum === 0) {
    // Calculate overall accuracy across all levels
    const totalCorrect = breakdown.reduce((sum, b) => sum + b.correct, 0);
    const totalQuestions = breakdown.reduce((sum, b) => sum + b.total, 0);
    const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    // Assign conservative level based on overall accuracy
    // Never assign B1+ without reaching competency threshold
    if (overallAccuracy < 20) {
      estimatedNum = 1; // A1
    } else if (overallAccuracy < 40) {
      estimatedNum = 2; // A1+
    } else if (overallAccuracy < 60) {
      estimatedNum = 3; // A2
    } else {
      estimatedNum = 4; // A2+ (safety fallback, should not normally reach here)
    }
  }

  // Cap at C1
  estimatedNum = Math.min(estimatedNum, 9);
  estimatedNum = Math.max(estimatedNum, 1);

  return {
    level: NUM_TO_CEFR[estimatedNum] || 'A1',
    levelNum: estimatedNum
  };
}

/**
 * Generate personalized recommendation based on results
 */
function generateRecommendation(
  estimatedLevel: CEFRLevel,
  breakdown: LevelStats[]
): { recommendation: string; strengths: CEFRLevel[]; weaknesses: CEFRLevel[] } {
  const strengths: CEFRLevel[] = [];
  const weaknesses: CEFRLevel[] = [];

  for (const stats of breakdown) {
    if (stats.accuracy >= 70) {
      strengths.push(stats.level);
    } else if (stats.accuracy < 50 && stats.total >= 2) {
      weaknesses.push(stats.level);
    }
  }

  const levelNum = CEFR_LEVEL_NUM[estimatedLevel];
  let recommendation: string;

  if (levelNum <= 2) {
    recommendation = '🌱 Enfócate en vocabulario básico y frases cotidianas. Practica con contenido de grados 3-5 para construir una base sólida.';
  } else if (levelNum <= 4) {
    recommendation = '📚 ¡Buen progreso! Trabaja en gramática intermedia (tiempos verbales) y comprensión lectora. Contenido recomendado: grados 6-7.';
  } else if (levelNum <= 6) {
    recommendation = '💪 Nivel intermedio sólido. Practica textos más complejos, vocabulario académico y expresión oral. Contenido: grados 8-9.';
  } else if (levelNum <= 8) {
    recommendation = '🎯 ¡Excelente nivel! Prepárate para el ICFES con simulacros completos de grado 10-11. Enfócate en lectura crítica e inferencial.';
  } else {
    recommendation = '🏆 ¡Nivel avanzado! Mantén tu nivel con práctica constante y considera prepararte para exámenes internacionales (TOEFL/IELTS).';
  }

  // Add weakness-specific advice
  if (weaknesses.length > 0) {
    const weakLevels = weaknesses.slice(0, 2).join(' y ');
    recommendation += ` ⚠️ Refuerza especialmente el nivel ${weakLevels}.`;
  }

  return { recommendation, strengths, weaknesses };
}

/**
 * 🎯 MAIN FUNCTION: Calculate English proficiency from exam results
 *
 * @param results - Array of question results with CEFR levels
 * @returns Complete proficiency assessment
 */
export function calculateEnglishProficiencyV2(
  results: QuestionResult[]
): EnglishProficiencyResult {
  // Handle empty input
  if (!results || results.length === 0) {
    return {
      estimatedLevel: 'A1',
      estimatedLevelNum: 1,
      confidence: 0,
      confidenceLabel: 'Low',
      breakdown: [],
      totalQuestions: 0,
      correctAnswers: 0,
      overallAccuracy: 0,
      recommendation: 'Completa al menos un examen diagnóstico para ver tu nivel de inglés.',
      strengthLevels: [],
      weaknessLevels: [],
      failedTopics: []
    };
  }

  // 1. Group results by CEFR level and track topics
  const levelMap = new Map<CEFRLevel, { correct: number; total: number }>();
  const failedTopicsTracker = new Map<string, number>();

  for (const result of results) {
    const level = result.cefrLevel;
    const current = levelMap.get(level) || { correct: 0, total: 0 };
    current.total++;
    if (result.isCorrect) {
      current.correct++;
    } else if (result.topics) {
      // Track failed topics 🆕
      for (const t of result.topics) {
        if (t && t.trim()) {
           const norm = t.trim().toLowerCase();
           failedTopicsTracker.set(norm, (failedTopicsTracker.get(norm) || 0) + 1);
        }
      }
    }
    levelMap.set(level, current);
  }

  // Get Top failed topics 🆕
  const failedTopics = Array.from(failedTopicsTracker.entries())
    .sort((a, b) => b[1] - a[1]) // Sort by frequency descending
    .slice(0, 5) // Top 5
    .map(entry => entry[0]);

  // 2. Build breakdown with stats
  const breakdown: LevelStats[] = [];
  for (const level of CEFR_LEVELS) {
    const stats = levelMap.get(level);
    if (stats && stats.total > 0) {
      breakdown.push({
        level,
        levelNum: CEFR_LEVEL_NUM[level],
        correct: stats.correct,
        total: stats.total,
        accuracy: Math.round((stats.correct / stats.total) * 100)
      });
    }
  }

  // 3. Calculate overall stats
  const totalQuestions = results.length;
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const overallAccuracy = Math.round((correctAnswers / totalQuestions) * 100);

  // 4. Find ceiling level
  const ceiling = findCeilingLevel(breakdown);

  // 5. Calculate confidence
  const { confidence, label: confidenceLabel } = calculateConfidence(breakdown, totalQuestions);

  // 6. Generate recommendation
  const { recommendation, strengths, weaknesses } = generateRecommendation(
    ceiling.level,
    breakdown
  );

  // 7. Calculate Cognitive Stats (Logic/Critical Thinking)
  let cognitiveStats: EnglishProficiencyResult['cognitiveStats'] = undefined;
  const highDiffQuestions = results.filter(r => (r.difficulty || 0) >= 4);

  if (highDiffQuestions.length > 0) {
    const highDiffCorrect = highDiffQuestions.filter(r => r.isCorrect).length;
    const cognitiveAccuracy = (highDiffCorrect / highDiffQuestions.length) * 100;

    let label = 'Developing Logic';
    if (cognitiveAccuracy >= 80) label = 'Critical Master 🧠';
    else if (cognitiveAccuracy >= 60) label = 'Analytical Thinker 💡';
    else if (cognitiveAccuracy >= 40) label = 'Developing Logic';

    cognitiveStats = {
      highDifficultyCorrect: highDiffCorrect,
      highDifficultyTotal: highDiffQuestions.length,
      cognitiveAccuracy,
      label
    };
  }

  return {
    estimatedLevel: ceiling.level,
    estimatedLevelNum: ceiling.levelNum,
    confidence,
    confidenceLabel,
    breakdown,
    totalQuestions,
    correctAnswers,
    overallAccuracy,
    recommendation,
    strengthLevels: strengths,
    weaknessLevels: weaknesses,
    cognitiveStats,
    failedTopics
  };
}

/**
 * Convert exam questions with answers to QuestionResult format
 */
export function examResultsToQuestionResults(
  examQuestions: Array<{
    id: string;
    userAnswer?: string;
    correctOptionId?: string;
    cefrLevel?: string;
    cefr_level?: string;
    englishLevel?: string;
    grade?: number;
    sourceGrade?: number;
    difficulty?: number;
    meta?: { difficulty?: number; };
    topics?: string[];
  }>
): QuestionResult[] {
  return examQuestions.map(q => ({
    questionId: q.id,
    isCorrect: q.userAnswer === q.correctOptionId,
    cefrLevel: parseCEFRLevel(
      q.cefrLevel || q.cefr_level || q.englishLevel,
      q.grade || q.sourceGrade
    ),
    sourceGrade: q.grade || q.sourceGrade,
    difficulty: q.difficulty || q.meta?.difficulty, // Try top-level or meta
    topics: q.topics // 🆕
  }));
}
