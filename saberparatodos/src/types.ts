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
  context?: string; // Shared context/text for the question (e.g. reading passage)
  part?: string; // 🆕 Exam Part/Section (e.g., "Part 1 - Vocabulary")
  cefrLevel?: string; // 🆕 CEFR Level (A1-C2) for English questions
  bundleId?: string; // Bundle ID for question versioning (e.g., "CO-LEC-11-comprension-001")
  competency?: string; // 🆕 Competency evaluated (e.g., "Indagación", "Interpretation")
  topic?: string;      // 🆕 Specific topic (e.g., "Algebra", "Renacimiento")
  period?: number;     // 🆕 Period (1-4) from bundle frontmatter
  video?: {
    youtubeUrl?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
    status?: string;
  };
  difficulty_discriminator?: number; // 🆕 IRT-like discriminator (optional future use)
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
  REGISTER = 'REGISTER',
  LOCAL_REPORTS = 'LOCAL_REPORTS',
  ROOM_LOBBY = 'ROOM_LOBBY',
  ROOM_JOIN = 'ROOM_JOIN',
  LOBBY_BROWSER = 'LOBBY_BROWSER'
}

// ============================================
// Scoring System Types
// ============================================

/**
 * Extended question result with timing for scoring
 */
export interface QuestionResultData {
  questionId: string | number;
  question?: Question; // 🆕 Full question data for offline history persistence
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
  // 🆕 Exam Room Mode extras
  roomCode?: string;
  sessionId?: string;
  isHost?: boolean; // 🆕 Track if user was host
  focusEvents?: { timestamp: number; type: string; duration?: number }[];
  focusViolations?: number;
}

