/**
 * Shared Type Definitions - World Exams
 *
 * Consolidated interfaces used across components to avoid duplication.
 * All exam-related components should import from this file.
 */

// ============================================
// Question Types
// ============================================

/**
 * Option for a question (used in ExamView components)
 */
export interface QuestionOption {
  id: string;
  letter: string;
  text: string;
  isCorrect: boolean;
}

/**
 * Question format used by ExamView component
 */
export interface Question {
  id: string;
  content: string;
  text?: string; // Alias for content (backwards compatibility)
  options: QuestionOption[];
  correctOptionId?: string;
  explanation: string;
  subject: string;
  topic: string;
  grade?: number;
  difficulty?: number;
}

/**
 * Raw question from Astro Content Collection
 */
export interface RawQuestion {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    id: string;
    country?: string;
    grado: number;
    asignatura: string;
    tema: string;
    dificultad: number;
    estado: 'draft' | 'published' | 'archived';
    creador: string;
    source?: string;
    group_id?: string;
  };
}

// ============================================
// Exam Result Types
// ============================================

/**
 * Result of a completed exam
 */
export interface ExamResult {
  score: number;
  total: number;
  percentage: number;
  answers: Record<string, string>;
  timeSpent?: number;
  completedAt: Date;
}

/**
 * User answer tracking during exam
 */
export interface UserAnswers {
  [questionId: string]: string;
}

// ============================================
// Country Configuration Types
// ============================================

export type CountryStatus = 'live' | 'setup' | 'soon';
export type CountryRegion = 'top10' | 'latam' | 'europe' | 'asia';

export type CountryCode =
  | 'MX' | 'CO' | 'AR' | 'CL' | 'PE' | 'EC' | 'VE'  // LATAM
  | 'BR' | 'US' | 'CN' | 'IN' | 'ID' | 'NG' | 'RU'  // Top 10
  | 'JP' | 'EG' | 'KR' | 'AU'                        // Asia
  | 'ES' | 'FR' | 'GB';                              // Europe

/**
 * Country configuration for World Exams
 */
export interface CountryConfig {
  code: CountryCode | string;
  name: string;
  exam: string;
  flag: string;
  flagStripe: string;
  status: CountryStatus;
  region: CountryRegion;
  questionCount?: number;
  language?: string;
  currency?: string;
}

// ============================================
// Component Props Types
// ============================================

/**
 * Props for ExamView component
 */
export interface ExamViewProps {
  questions: Question[];
  countryName?: string;
  countryFlag?: string;
  showTimer?: boolean;
  timerMinutes?: number;
  onFinish?: (result: ExamResult) => void;
}

/**
 * Props for ResultsView component
 */
export interface ResultsViewProps {
  score: { score: number; total: number };
  questions: Question[];
  userAnswers: UserAnswers;
  onRestart?: () => void;
  onHome?: () => void;
}

/**
 * Props for FlashlightCard component
 */
export interface FlashlightCardProps {
  className?: string;
  isActive?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
}

// ============================================
// Utility Types
// ============================================

/**
 * Subject configuration
 */
export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

/**
 * Parsed question from markdown body
 */
export interface ParsedQuestion {
  content: string;
  options: QuestionOption[];
  explanation: string;
}

// ============================================
// LocalStorage Keys
// ============================================

export const STORAGE_KEYS = {
  EXAM_PROGRESS: 'worldexams_exam_progress',
  USER_PREFERENCES: 'worldexams_preferences',
  LAST_COUNTRY: 'worldexams_last_country',
} as const;
