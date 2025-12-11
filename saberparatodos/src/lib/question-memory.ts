/**
 * Question Memory Service
 * Persists answered questions in localStorage to avoid repetition
 * Auto-clears when user has answered >70% of available questions
 */

const STORAGE_KEY = 'openicfes_answered_questions';
const STATS_KEY = 'openicfes_question_stats';
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
  streakHistory: number[];
  lastSessionDate: string;
}

/**
 * Load answered question IDs from localStorage
 */
export function loadAnsweredQuestions(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return new Set();

    const data = JSON.parse(stored);
    return new Set(data.answeredIds || []);
  } catch (e) {
    console.error('Error loading question memory:', e);
    return new Set();
  }
}

/**
 * Save answered question IDs to localStorage
 */
export function saveAnsweredQuestions(
  answeredIds: Set<string>,
  totalAvailable: number
): void {
  try {
    const data = {
      answeredIds: Array.from(answeredIds),
      lastUpdated: Date.now(),
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
 */
export function markQuestionAnswered(
  questionId: string,
  totalAvailable: number,
  isCorrect: boolean,
  metadata?: { subject?: string; grade?: number; difficulty?: number }
): { cacheCleared: boolean; percentAnswered: number } {
  const answered = loadAnsweredQuestions();
  answered.add(questionId);

  // Update stats
  updateStats(questionId, isCorrect, metadata);

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
  totalAvailable: number
): { cacheCleared: boolean; percentAnswered: number } {
  const answered = loadAnsweredQuestions();

  for (const q of questions) {
    answered.add(q.id);
    updateStats(q.id, q.isCorrect, {
      subject: q.subject,
      grade: q.grade,
      difficulty: q.difficulty
    });
  }

  const percentAnswered = answered.size / totalAvailable;

  if (percentAnswered > CLEAR_THRESHOLD) {
    clearQuestionMemory();
    return { cacheCleared: true, percentAnswered: 0 };
  }

  saveAnsweredQuestions(answered, totalAvailable);
  return { cacheCleared: false, percentAnswered };
}

/**
 * Filter out already answered questions, prioritizing unanswered ones
 */
export function filterUnansweredQuestions<T extends { id: string }>(
  questions: T[],
  maxQuestions?: number
): { filtered: T[]; hadToRepeat: boolean } {
  const answered = loadAnsweredQuestions();

  // Separate into answered and unanswered
  const unanswered = questions.filter(q => !answered.has(q.id));
  const previouslyAnswered = questions.filter(q => answered.has(q.id));

  // If we have enough unanswered questions, use only those
  if (!maxQuestions || unanswered.length >= maxQuestions) {
    return {
      filtered: shuffleArray(unanswered).slice(0, maxQuestions),
      hadToRepeat: false
    };
  }

  // Otherwise, fill with already answered questions
  const needed = maxQuestions - unanswered.length;
  const fillers = shuffleArray(previouslyAnswered).slice(0, needed);

  return {
    filtered: shuffleArray([...unanswered, ...fillers]),
    hadToRepeat: fillers.length > 0
  };
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
 * Clear all question memory (cache reset)
 */
export function clearQuestionMemory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🔄 Question memory cleared - Fresh start!');
  } catch (e) {
    console.error('Error clearing question memory:', e);
  }
}

/**
 * Update question stats
 */
function updateStats(
  _questionId: string,
  isCorrect: boolean,
  metadata?: { subject?: string; grade?: number; difficulty?: number }
): void {
  try {
    const stats = loadStats();

    stats.totalAnswered++;
    if (isCorrect) stats.correctCount++;

    // Update by subject
    if (metadata?.subject) {
      if (!stats.bySubject[metadata.subject]) {
        stats.bySubject[metadata.subject] = { answered: 0, correct: 0 };
      }
      stats.bySubject[metadata.subject].answered++;
      if (isCorrect) stats.bySubject[metadata.subject].correct++;
    }

    // Update by grade
    if (metadata?.grade) {
      if (!stats.byGrade[metadata.grade]) {
        stats.byGrade[metadata.grade] = { answered: 0, correct: 0 };
      }
      stats.byGrade[metadata.grade].answered++;
      if (isCorrect) stats.byGrade[metadata.grade].correct++;
    }

    // Update by difficulty
    if (metadata?.difficulty) {
      if (!stats.byDifficulty[metadata.difficulty]) {
        stats.byDifficulty[metadata.difficulty] = { answered: 0, correct: 0 };
      }
      stats.byDifficulty[metadata.difficulty].answered++;
      if (isCorrect) stats.byDifficulty[metadata.difficulty].correct++;
    }

    stats.lastSessionDate = new Date().toISOString().split('T')[0];

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Error updating stats:', e);
  }
}

/**
 * Load stats from localStorage
 */
export function loadStats(): QuestionStats {
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
    streakHistory: [],
    lastSessionDate: new Date().toISOString().split('T')[0]
  };
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
    exportedAt: new Date().toISOString()
  }, null, 2);
}
