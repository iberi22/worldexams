/**
 * 🎯 Adaptive Question Selection for English Diagnostic
 *
 * Implements intelligent question selection based on:
 * - Current estimated proficiency level
 * - Coverage across CEFR levels
 * - Dynamic adjustment based on performance
 *
 * Strategy inspired by CAT (Computer Adaptive Testing) best practices
 */

import type { CEFRLevel } from './english-proficiency';
import {
  CEFR_LEVELS,
  CEFR_LEVEL_NUM,
  NUM_TO_CEFR,
  parseCEFRLevel
} from './english-proficiency';
import type { AppQuestion } from './api-service';

/**
 * State for adaptive exam session
 */
export interface AdaptiveExamState {
  currentEstimate: CEFRLevel;
  currentEstimateNum: number;
  answeredByLevel: Map<CEFRLevel, { correct: number; total: number }>;
  remainingQuestions: AppQuestion[];
  answeredQuestionIds: Set<string>;
  totalAnswered: number;
  totalCorrect: number;
}

/**
 * Configuration for adaptive selection
 */
export interface AdaptiveConfig {
  targetQuestions: number;        // Total questions to ask
  minQuestionsPerLevel: number;   // Minimum questions per level before moving
  accuracyThreshold: number;      // % accuracy to consider level mastered
  failureThreshold: number;       // % accuracy below which we stop testing higher
}

const DEFAULT_CONFIG: AdaptiveConfig = {
  targetQuestions: 10,
  minQuestionsPerLevel: 2,
  accuracyThreshold: 70,
  failureThreshold: 40
};

/**
 * Initialize adaptive exam state from question pool
 */
export function initializeAdaptiveExam(
  questionPool: AppQuestion[],
  startingLevel: CEFRLevel = 'A2'
): AdaptiveExamState {
  return {
    currentEstimate: startingLevel,
    currentEstimateNum: CEFR_LEVEL_NUM[startingLevel],
    answeredByLevel: new Map(),
    remainingQuestions: [...questionPool],
    answeredQuestionIds: new Set(),
    totalAnswered: 0,
    totalCorrect: 0
  };
}

/**
 * Get the CEFR level of a question
 */
function getQuestionLevel(question: AppQuestion): CEFRLevel {
  const metadata = question as any;
  return parseCEFRLevel(
    metadata.cefrLevel || metadata.cefr_level || metadata.englishLevel,
    metadata.grade || metadata.sourceGrade
  );
}

/**
 * Select initial questions for balanced coverage
 * Returns questions from each CEFR level to establish baseline
 */
export function selectInitialQuestions(
  questionPool: AppQuestion[],
  questionsPerLevel: number = 2
): AppQuestion[] {
  const byLevel = new Map<CEFRLevel, AppQuestion[]>();

  // Group questions by CEFR level
  for (const q of questionPool) {
    const level = getQuestionLevel(q);
    if (!byLevel.has(level)) {
      byLevel.set(level, []);
    }
    byLevel.get(level)!.push(q);
  }

  const selected: AppQuestion[] = [];

  // Select from each level (prioritize A2, B1, B2 for balanced assessment)
  const priorityOrder: CEFRLevel[] = ['A2', 'B1', 'A1', 'A2+', 'B1+', 'B2', 'A1+', 'B2+', 'C1'];

  for (const level of priorityOrder) {
    const questions = byLevel.get(level) || [];
    // Shuffle this level's questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    // Take requested amount
    const toTake = shuffled.slice(0, questionsPerLevel);
    selected.push(...toTake);
  }

  // Final shuffle to mix levels
  return selected.sort(() => Math.random() - 0.5);
}

/**
 * Select next question based on current performance
 * Uses adaptive logic to probe around the estimated level
 */
export function selectNextQuestion(
  state: AdaptiveExamState,
  config: AdaptiveConfig = DEFAULT_CONFIG
): AppQuestion | null {
  // Filter out already answered questions
  const available = state.remainingQuestions.filter(
    q => !state.answeredQuestionIds.has(q.id)
  );

  if (available.length === 0) {
    return null;
  }

  // Group available by level
  const byLevel = new Map<CEFRLevel, AppQuestion[]>();
  for (const q of available) {
    const level = getQuestionLevel(q);
    if (!byLevel.has(level)) {
      byLevel.set(level, []);
    }
    byLevel.get(level)!.push(q);
  }

  // Determine target level based on performance
  const targetLevelNum = state.currentEstimateNum;

  // Priority scoring: prefer questions near the estimated level
  const scoredLevels: Array<{ level: CEFRLevel; score: number; questions: AppQuestion[] }> = [];

  for (const [level, questions] of byLevel) {
    const levelNum = CEFR_LEVEL_NUM[level];
    const stats = state.answeredByLevel.get(level);

    // Base score: prefer levels near current estimate
    let score = 100 - Math.abs(levelNum - targetLevelNum) * 20;

    // Bonus for under-sampled levels
    const sampleCount = stats?.total || 0;
    if (sampleCount < config.minQuestionsPerLevel) {
      score += 30; // Boost under-sampled levels
    }

    // Slightly prefer questions 1 level above current estimate
    // (to probe if student can go higher)
    if (levelNum === targetLevelNum + 1) {
      score += 15;
    }

    // Penalize levels we've already established
    if (stats && stats.total >= 3) {
      if (stats.correct / stats.total >= 0.8) {
        // Already mastered, reduce priority
        score -= 25;
      } else if (stats.correct / stats.total < 0.4) {
        // Already failed, reduce priority
        score -= 25;
      }
    }

    if (questions.length > 0) {
      scoredLevels.push({ level, score, questions });
    }
  }

  if (scoredLevels.length === 0) {
    return null;
  }

  // Sort by score (highest first)
  scoredLevels.sort((a, b) => b.score - a.score);

  // Take from top-scoring level (with some randomization)
  const topLevel = scoredLevels[0];
  const shuffled = [...topLevel.questions].sort(() => Math.random() - 0.5);

  return shuffled[0];
}

/**
 * Update state after answering a question
 */
export function updateAdaptiveState(
  state: AdaptiveExamState,
  question: AppQuestion,
  isCorrect: boolean,
  config: AdaptiveConfig = DEFAULT_CONFIG
): AdaptiveExamState {
  const level = getQuestionLevel(question);


  // Update answered tracking
  state.answeredQuestionIds.add(question.id);
  state.totalAnswered++;
  if (isCorrect) {
    state.totalCorrect++;
  }

  // Update level stats
  const stats = state.answeredByLevel.get(level) || { correct: 0, total: 0 };
  stats.total++;
  if (isCorrect) {
    stats.correct++;
  }
  state.answeredByLevel.set(level, stats);

  // Recalculate estimated level using ceiling method
  let newEstimate = 1; // Start at A1

  for (const l of CEFR_LEVELS) {
    const lStats = state.answeredByLevel.get(l);
    if (lStats && lStats.total >= 1) {
      const accuracy = (lStats.correct / lStats.total) * 100;
      const lNum = CEFR_LEVEL_NUM[l];

      if (accuracy >= config.accuracyThreshold) {
        newEstimate = Math.max(newEstimate, lNum);
      }
    }
  }

  state.currentEstimateNum = newEstimate;
  state.currentEstimate = NUM_TO_CEFR[newEstimate] || 'A1';

  return state;
}

/**
 * Check if we have enough data to confidently estimate level
 */
export function isAssessmentComplete(
  state: AdaptiveExamState,
  config: AdaptiveConfig = DEFAULT_CONFIG
): boolean {
  // Must answer minimum questions
  if (state.totalAnswered < config.targetQuestions) {
    return false;
  }

  // Check if we have good coverage around the estimated level
  const estimate = state.currentEstimateNum;
  const levelsToCheck = [estimate - 1, estimate, estimate + 1].filter(n => n >= 1 && n <= 9);

  for (const levelNum of levelsToCheck) {
    const level = NUM_TO_CEFR[levelNum];
    const stats = state.answeredByLevel.get(level);

    // Need at least 2 questions at adjacent levels
    if (!stats || stats.total < 2) {
      return false;
    }
  }

  return true;
}

/**
 * Generate a complete adaptive English exam from a question pool
 *
 * This is the main entry point for adaptive exam generation
 */
export function generateAdaptiveEnglishExam(
  questionPool: AppQuestion[],
  targetQuestions: number = 10
): AppQuestion[] {
  if (questionPool.length === 0) {
    return [];
  }

  // Simple approach: use initial selection for balanced coverage
  // More sophisticated CAT would require real-time adaptation during exam
  const initial = selectInitialQuestions(questionPool, Math.ceil(targetQuestions / 4));

  // Fill remaining with varied difficulty
  const remaining = questionPool.filter(q => !initial.some(i => i.id === q.id));
  const shuffled = [...remaining].sort(() => Math.random() - 0.5);

  const combined = [...initial, ...shuffled];
  return combined.slice(0, targetQuestions);
}
