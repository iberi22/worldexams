export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string | number;
  text: string;
  options: Option[];
  correctOptionId: string;
  category: string;
  explanation?: string;
  grade: number;
  difficulty: number;
  licenses?: {
    v1: string;      // "CC BY-SA 4.0" - Uso comercial permitido
    'v2-v7': string; // "CC BY-NC-SA 4.0" - Solo no-comercial
  };
}

export interface LeaderboardEntry {
  rank: number;
  user: string;
  score: number;
  total: number;
  percentage: number;
  subject: string;
  time: string;
}

export interface Score {
  score: number;
  total: number;
}

export enum AppView {
  LANDING = 'LANDING',
  GRADE_SELECTION = 'GRADE_SELECTION',
  SUBJECT_SELECTION = 'SUBJECT_SELECTION',
  EXAM = 'EXAM',
  LEADERBOARD = 'LEADERBOARD',
  RESULTS = 'RESULTS',
  BLOG = 'BLOG',
  ARTICLE = 'ARTICLE',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

// ============================================
// Scoring System Types
// ============================================

/**
 * Extended question result with timing for scoring
 */
export interface QuestionResultData {
  questionId: string | number;
  isCorrect: boolean;
  difficulty: number;
  timeSpentMs: number;
  maxTimeMs: number;
  streakCount: number;
}

/**
 * Exam completion data for scoring
 */
export interface ExamCompletionData {
  questions: QuestionResultData[];
  totalTimeMs: number;
  maxTotalTimeMs: number;
  grade: number;
  subject: string;
}
