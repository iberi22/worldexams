/**
 * Question System Types
 * Core type definitions for the question generation system
 */

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correctAnswerId: string;
  explanation: string;
  difficulty: QuestionDifficulty;
  topic: string;
  category: string;
  tags: string[];
  qualityScore?: number;
  successRate?: number;
  timesShown: number;
  timesCorrect: number;
  createdAt: Date;
  updatedAt: Date;
}

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface QuestionMetrics {
  clarity: number;
  difficulty: number;
  accuracy: number;
  uniqueness: number;
  overall: number;
}

export interface UserFeedback {
  id: string;
  questionId: string;
  userId: string;
  rating: number; // 1-5
  comment?: string;
  isHelpful: boolean;
  createdAt: Date;
}

export interface QuestionGenerationRequest {
  topic: string;
  count: number;
  difficulty?: QuestionDifficulty;
  category?: string;
  includeVideo?: boolean;
}

export interface QuestionEvaluationRequest {
  question: Question;
  strictness?: 'lenient' | 'normal' | 'strict';
}

export interface QuestionImprovementRequest {
  question: Question;
  feedback?: UserFeedback;
  targetMetrics?: Partial<QuestionMetrics>;
}

export interface VideoConfig {
  width: number;
  height: number;
  fps: number;
  duration: number;
  style: VideoStyle;
}

export type VideoStyle = 'minimal' | 'animated' | 'interactive';

export interface QuestionVideo {
  id: string;
  questionId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
  style: VideoStyle;
  createdAt: Date;
}

export interface AnalyticsData {
  totalQuestions: number;
  averageQualityScore: number;
  averageSuccessRate: number;
  questionsByDifficulty: Record<QuestionDifficulty, number>;
  topTopics: { topic: string; count: number }[];
  recentFeedback: UserFeedback[];
}
