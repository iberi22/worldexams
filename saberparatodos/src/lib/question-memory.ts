/**
 * Question Memory Service
 * Persists answered questions in localStorage + Database (if logged in)
 * Auto-clears when user has answered >70% of available questions
 */

import { supabase } from './supabase';

const STORAGE_KEY = 'saberparatodos_answered_questions';
const STATS_KEY = 'saberparatodos_question_stats';
const CLEAR_THRESHOLD = 0.70; // 70%

export interface QuestionMemory {
  answeredIds: Set<string>;
  lastUpdated: number;
  totalAvailable: number;
}

export interface QuestionStats {
  totalAnswered: number;
  correctCount: number;
  bySubject: Record<string, { answered: number; correct: number }>;
  byGrade: Record<number, { answered: number; correct: number }>;
  byDifficulty: Record<number, { answered: number; correct: number }>;
  byPeriod: Record<number, { answered: number; correct: number }>; // 🆕 Period Stats
  streakHistory: number[];
  lastSessionDate: string;
}

/**
 * Load stats from localStorage
 */
export function getStats(): QuestionStats {
  if (typeof localStorage === 'undefined') return {
    totalAnswered: 0,
    correctCount: 0,
    bySubject: {},
    byGrade: {},
    byDifficulty: {},
    byPeriod: {}, // 🆕
    streakHistory: [],
    lastSessionDate: new Date().toISOString()
  };

  const stored = localStorage.getItem(STATS_KEY);
  return stored ? JSON.parse(stored) : {
    totalAnswered: 0,
    correctCount: 0,
    bySubject: {},
    byGrade: {},
    byDifficulty: {},
    byPeriod: {}, // 🆕
    streakHistory: [],
    lastSessionDate: new Date().toISOString()
  };
}

/**
 * Load answered question IDs from localStorage
 */
/**
 * Load answered question IDs from localStorage
 * Returns Set of IDs that are valid (answered within last 7 days)
 */
export function loadAnsweredQuestions(): Set<string> {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return new Set();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return new Set();

    const data = JSON.parse(stored);
    const now = Date.now();
    const EXPIRY_MS = 14 * 24 * 60 * 60 * 1000;
    const validIds = new Set<string>();

    if (data.answeredTimestamps) {
      for (const [id, ts] of Object.entries(data.answeredTimestamps)) {
        if (now - (ts as number) < EXPIRY_MS) {
          validIds.add(id);
        }
      }
      return validIds;
    }

    if (data.answeredIds) {
       return new Set(data.answeredIds);
    }

    return new Set();
  } catch (e) {
    console.error('Error loading question memory:', e);
    return new Set();
  }
}

/**
 * Save answered question IDs to localStorage
 */
/**
 * Save answered question IDs to localStorage
 */
export function saveAnsweredQuestions(
  answeredIds: Set<string>,
  totalAvailable: number
): void {
  // Check if running in browser environment
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let currentTimestamps: Record<string, number> = {};
    const now = Date.now();
    const SIX_DAYS_MS = 6 * 24 * 60 * 60 * 1000;

    if (stored) {
      const data = JSON.parse(stored);
      // Clean up old format or load existing v2
      if (data.answeredTimestamps) {
        currentTimestamps = data.answeredTimestamps;
      } else if (data.answeredIds) {
        // Migration: give all old IDs current timestamp
        data.answeredIds.forEach((id: string) => {
            currentTimestamps[id] = now;
        });
      }
    }

    const newTimestamps: Record<string, number> = {};

    // For every ID in the input set (current valid IDs)
    answeredIds.forEach(id => {
      // If we have an existing valid timestamp, keep it
      if (currentTimestamps[id] && (now - currentTimestamps[id] < SIX_DAYS_MS)) {
        newTimestamps[id] = currentTimestamps[id];
      } else {
        // Otherwise it's new (or re-added), give it NOW
        newTimestamps[id] = now;
      }
    });

    const data = {
      answeredTimestamps: newTimestamps,
      lastUpdated: now,
      totalAvailable
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving question memory:', e);
  }
}

/**
 * Mark a question as answered
 * Returns true if cache was cleared due to threshold
 * 🆕 Also saves to database if user is logged in
 */
export async function markQuestionAnswered(
  questionId: string,
  totalAvailable: number,
  isCorrect: boolean,
  metadata?: { subject?: string; grade?: number; difficulty?: number; timeSeconds?: number }
): Promise<{ cacheCleared: boolean; percentAnswered: number }> {
  const answered = loadAnsweredQuestions();
  answered.add(questionId);

  // Update stats
  updateStats([{
    id: questionId,
    isCorrect,
    subject: metadata?.subject,
    grade: metadata?.grade,
    difficulty: metadata?.difficulty
  }]);

  // 🆕 Save to database if logged in
  await saveToDatabase(questionId, isCorrect, metadata);

  const percentAnswered = answered.size / totalAvailable;

  // Check if we need to clear cache
  if (percentAnswered > CLEAR_THRESHOLD) {
    clearQuestionMemory();
    return { cacheCleared: true, percentAnswered: 0 };
  }

  saveAnsweredQuestions(answered, totalAvailable);
  return { cacheCleared: false, percentAnswered };
}

/**
 * Mark multiple questions as answered (batch)
 */
export function markQuestionsAnswered(
  questions: Array<{ id: string; isCorrect: boolean; subject?: string; grade?: number; difficulty?: number }>,
  totalAvailable: number,
  period?: number // 🆕 Accept period
): { cacheCleared: boolean; percentAnswered: number } {
  const answered = loadAnsweredQuestions();

  // Update stats in batch
  updateStats(questions, period);

  for (const q of questions) {
    answered.add(q.id);
  }

  const percentAnswered = totalAvailable > 0 ? answered.size / totalAvailable : 0;

  if (percentAnswered > CLEAR_THRESHOLD) {
    clearQuestionMemory();
    return { cacheCleared: true, percentAnswered: 0 };
  }

  saveAnsweredQuestions(answered, totalAvailable);
  return { cacheCleared: false, percentAnswered };
}

/**
 * Filter out already answered questions, prioritizing unanswered ones
 * 🆕 Now with smart auto-reset when pool is exhausted
 */
export function filterUnansweredQuestions<T extends { id: string }>(
  questions: T[],
  maxQuestions?: number
): { filtered: T[]; hadToRepeat: boolean; wasReset: boolean } {
  const answered = loadAnsweredQuestions();

  // Separate into answered and unanswered
  const unanswered = questions.filter(q => !answered.has(q.id));
  const previouslyAnswered = questions.filter(q => answered.has(q.id));

  // If we have enough unanswered questions, use only those
  if (!maxQuestions || unanswered.length >= maxQuestions) {
    return {
      filtered: shuffleArray(unanswered).slice(0, maxQuestions),
      hadToRepeat: false,
      wasReset: false
    };
  }

  // 🆕 Smart Recycle: If ALL questions have been answered, DO NOT WIPE MEMORY.
  // Instead, recycle the oldest questions but keep the memory intact.
  if (unanswered.length === 0 && previouslyAnswered.length > 0) {
    console.log('🔄 All questions in pool exhausted - Recycling oldest questions (No Reset)');
    // clearAnsweredQuestionsOnly(); <--- REMOVED: Never wipe memory automatically

    // Sort logic is already handled by sortedFillers below if we let it fall through
    // But to be explicit, just let it fall through to the "fillers" logic which now handles sorting.
  }

  // Otherwise, fill with already answered questions
  const needed = maxQuestions - unanswered.length;

  // 🆕 Better Repetition Logic: Prioritize oldest answered questions
  // Instead of random shuffle, we want spaced repetition behavior
  let sortedFillers = previouslyAnswered;

  if (typeof window !== 'undefined' && localStorage) {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            const timestamps = data.answeredTimestamps || {};

            // Sort by timestamp ASC (oldest interaction first)
            sortedFillers = previouslyAnswered.sort((a, b) => {
                const tsA = timestamps[a.id] || Infinity; // If no timestamp, treat as recent to be safe
                const tsB = timestamps[b.id] || Infinity;
                return tsA - tsB;
            });
        }
    } catch (e) {
        // Fallback to shuffle if sorting fails
        sortedFillers = shuffleArray(previouslyAnswered);
    }
  } else {
    sortedFillers = shuffleArray(previouslyAnswered);
  }

  const fillers = sortedFillers.slice(0, needed);

  return {
    filtered: shuffleArray([...unanswered, ...fillers]), // Shuffle final mix
    hadToRepeat: fillers.length > 0,
    wasReset: false
  };
}

/**
 * Clear only answered question IDs (keep stats)
 * Used for smart auto-reset when pool is exhausted
 */
export function clearAnsweredQuestionsOnly(): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🧹 Answered questions cleared (stats preserved)');
  } catch (e) {
    console.error('Error clearing answered questions:', e);
  }
}

/**
 * Get memory statistics
 */
export function getMemoryStats(totalAvailable: number): {
  answeredCount: number;
  totalAvailable: number;
  percentAnswered: number;
  remainingUntilReset: number;
  willResetSoon: boolean;
} {
  const answered = loadAnsweredQuestions();
  const percentAnswered = totalAvailable > 0 ? answered.size / totalAvailable : 0;
  const resetThreshold = Math.floor(totalAvailable * CLEAR_THRESHOLD);

  return {
    answeredCount: answered.size,
    totalAvailable,
    percentAnswered,
    remainingUntilReset: Math.max(0, resetThreshold - answered.size),
    willResetSoon: percentAnswered > 0.60 // Warn at 60%
  };
}

/**
 * 🆕 Get memory statistics using accumulated pack pool size
 * Use this with pack-storage.getTotalQuestionsAvailable()
 */
export function getMemoryStatsForPool(poolSize: number): {
  answeredCount: number;
  totalAvailable: number;
  percentAnswered: number;
  remainingUntilReset: number;
  willResetSoon: boolean;
  isPoolExhausted: boolean;
} {
  const answered = loadAnsweredQuestions();
  const percentAnswered = poolSize > 0 ? answered.size / poolSize : 0;
  const resetThreshold = Math.floor(poolSize * CLEAR_THRESHOLD);
  const isPoolExhausted = poolSize > 0 && answered.size >= poolSize;

  return {
    answeredCount: answered.size,
    totalAvailable: poolSize,
    percentAnswered,
    remainingUntilReset: Math.max(0, resetThreshold - answered.size),
    willResetSoon: percentAnswered > 0.60,
    isPoolExhausted
  };
}

/**
 * Get memory statistics for a specific subject
 * Used in ExamConfigModal to show available questions
 */
export function getSubjectMemoryStats(questions: any[], subject?: string): {
  totalForSubject: number;
  answeredCount: number;
  availableCount: number;
  percentUsed: number;
} {
  const answered = loadAnsweredQuestions();

  // Filter questions by subject if provided
  const subjectQuestions = (subject && subject !== 'Simulacro Completo')
    ? questions.filter(q => {
        const category = q.category?.toUpperCase() || '';
        const subjectUpper = subject.toUpperCase();
        return category.includes(subjectUpper) || subjectUpper.includes(category.split(' :: ')[0]);
      })
    : questions;

  const answeredForSubject = subjectQuestions.filter(q => answered.has(q.id));

  return {
    totalForSubject: subjectQuestions.length,
    answeredCount: answeredForSubject.length,
    availableCount: subjectQuestions.length - answeredForSubject.length,
    percentUsed: subjectQuestions.length > 0
      ? (answeredForSubject.length / subjectQuestions.length) * 100
      : 0
  };
}

/**
 * Update question stats
 */
function updateStats(questions: any[], period?: number) {
  const stats = loadStats(); // Assuming loadStats is equivalent to getStats
  const today = new Date().toISOString().split('T')[0];

  // Reset streak if missed a day (simplified)
  if (stats.lastSessionDate.split('T')[0] !== today) {
    // Logic for streak reset could go here
  }

  questions.forEach(q => {
    stats.totalAnswered++;
    if (q.isCorrect) stats.correctCount++;

    // Subject Stats
    const subject = (q.subject || q.category?.split(' :: ')[0] || 'GENERAL').toUpperCase(); // Use q.subject if available, fallback to category
    if (!stats.bySubject[subject]) stats.bySubject[subject] = { answered: 0, correct: 0 };
    stats.bySubject[subject].answered++;
    if (q.isCorrect) stats.bySubject[subject].correct++;

    // Grade Stats
    const grade = q.grade || 0;
    if (!stats.byGrade[grade]) stats.byGrade[grade] = { answered: 0, correct: 0 };
    stats.byGrade[grade].answered++;
    if (q.isCorrect) stats.byGrade[grade].correct++;

    // Difficulty Stats
    const diff = q.difficulty || 3;
    if (!stats.byDifficulty[diff]) stats.byDifficulty[diff] = { answered: 0, correct: 0 };
    stats.byDifficulty[diff].answered++;
    if (q.isCorrect) stats.byDifficulty[diff].correct++;

    // 🆕 Period Stats
    if (period) {
        if (!stats.byPeriod) stats.byPeriod = {}; // Init if missing
        if (!stats.byPeriod[period]) stats.byPeriod[period] = { answered: 0, correct: 0 };
        stats.byPeriod[period].answered++;
        if (q.isCorrect) stats.byPeriod[period].correct++;
    }
  });

  stats.lastSessionDate = new Date().toISOString(); // Changed from split('T')[0] to full ISO string
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats)); // Assuming saveStats is equivalent to this
  }
}

/**
 * Load stats from localStorage
 */
export function loadStats(): QuestionStats {
  // Check if running in browser environment
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return getDefaultStats();
  }

  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (!stored) return getDefaultStats();
    return JSON.parse(stored);
  } catch (e) {
    return getDefaultStats();
  }
}

function getDefaultStats(): QuestionStats {
  return {
    totalAnswered: 0,
    correctCount: 0,
    bySubject: {},
    byGrade: {},
    byDifficulty: {},
    byPeriod: {}, // 🆕
    streakHistory: [],
    lastSessionDate: new Date().toISOString().split('T')[0]
  };
}

/**
 * Clear all memory (reset progress)
 */
export function clearQuestionMemory(): void {
  // Check if running in browser environment
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STATS_KEY);
  } catch (e) {
    console.error('Error clearing memory:', e);
  }
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Export memory for debugging
 */
export function exportMemory(): string {
  const answered = loadAnsweredQuestions();
  const stats = loadStats();
  return JSON.stringify({
    answeredIds: Array.from(answered),
    stats,
    timestamp: Date.now()
  }, null, 2);
}

// ═══════════════════════════════════════════════════════════════════════════
// 🆕 DATABASE TRACKING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Save answered question to database (if user is logged in)
 * 🚫 DISABLED: Per design decision, all exam history stays LOCAL only for now
 */
async function saveToDatabase(
  _questionId: string,
  _wasCorrect: boolean,
  _metadata?: { subject?: string; grade?: number; difficulty?: number; timeSeconds?: number }
): Promise<void> {
  // 🚫 DATABASE WRITES DISABLED
  // All exam history is stored locally (localStorage/IndexedDB) only
  // This prevents requiring user auth and keeps data on-device
  return;

  /* Original implementation kept for future reference:
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return; // Guest user, skip DB

    const { error } = await supabase
      .from('user_answered_questions')
      .insert({
        question_id: questionId,
        was_correct: wasCorrect,
        time_taken: metadata?.timeSeconds || null,
        metadata: {
          subject: metadata?.subject || null,
          grade: metadata?.grade || null,
          difficulty: metadata?.difficulty || null
        }
      } as any);

    if (error && error.code !== '23505') { // Ignore duplicate key errors
      console.error('Error saving to DB:', error);
    }
  } catch (err) {
    console.error('Database error:', err);
  }
  */
}

/**
 * Load answered questions from database (merges with localStorage)
 */
export async function loadAnsweredQuestionsFromDB(): Promise<Set<string>> {
  const localIds = loadAnsweredQuestions();

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return localIds; // Guest user

    const { data, error } = await supabase
      .from('user_answered_questions')
      .select('question_id')
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error loading from DB:', error);
      return localIds;
    }

    // Merge DB + localStorage
    const dbIds = new Set((data as any[]).map(row => row.question_id));
    return new Set([...localIds, ...dbIds]);
  } catch (err) {
    console.error('Database error:', err);
    return localIds;
  }
}

/**
 * Get user's question statistics from database
 */
export async function getUserStatsFromDB(): Promise<{
  totalAnswered: number;
  correctCount: number;
  accuracy: number;
  avgTimeSeconds: number;
} | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      console.error('Error loading stats:', error);
      return null;
    }

    const stats = data as any;

    return {
      totalAnswered: stats.total_answered,
      correctCount: stats.correct_count,
      accuracy: stats.total_answered > 0 ? (stats.correct_count / stats.total_answered) * 100 : 0,
      avgTimeSeconds: stats.avg_time_seconds || 0
    };
  } catch (err) {
    console.error('Database error:', err);
    return null;
  }
}
