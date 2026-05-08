/**
 * Question Cache
 * In-memory and persistent cache management for questions
 *
 * Extracted from api-service.ts for better separation of concerns
 */

import { saveKnownQuestions, getCachedEnglishQuestions, getAnsweredQuestionIds, getAllLocalResults } from './idb-storage';
import type { AppQuestion } from './question-transformer';

/**
 * In-memory cache for question arrays keyed by grade-subject-page
 */
export const questionCache: Map<string, AppQuestion[]> = new Map();

/**
 * Clear all in-memory question cache
 */
export function clearCache(): void {
  questionCache.clear();
}

/**
 * Get cached questions by key, or undefined if not cached
 */
export function getCache(key: string): AppQuestion[] | undefined {
  return questionCache.get(key);
}

/**
 * Set questions in cache
 */
export function setCache(key: string, questions: AppQuestion[]): void {
  questionCache.set(key, questions);
}

/**
 * Check if a key is in cache
 */
export function hasCache(key: string): boolean {
  return questionCache.has(key);
}

// Re-export IDB storage functions for backward compatibility
export { saveKnownQuestions, getCachedEnglishQuestions, getAnsweredQuestionIds, getAllLocalResults };
