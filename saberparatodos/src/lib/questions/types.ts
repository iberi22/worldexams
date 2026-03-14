import type { AppQuestion } from '../api-service';

export interface QuestionSelectionRequest {
  grade: number;
  subject: string | null;
  count: number;
  useDiagnostic?: boolean;
  diagnosticMixPercent?: number;
  examMode?: 'simulacro' | 'period';
  period?: number;
  englishDiagnostic?: boolean;
  strictPeriod?: boolean;
  minCefrLevel?: string;
  preuUniversity?: string;
}

export interface QuestionSelectionResult {
  pool: AppQuestion[];
  selectedQuestions: AppQuestion[];
  hadToRepeat: boolean;
  warnings: string[];
}

export interface QuestionValidationResult {
  validQuestions: AppQuestion[];
  invalidCount: number;
}

export interface QuestionRepository {
  fetchAllQuestionsForGrade(grade: number, isGuest?: boolean, maxQuestions?: number): Promise<AppQuestion[]>;
  fetchQuestions(grade: number, subject: string, page?: number): Promise<AppQuestion[]>;
  fetchBulkQuestions(grades: number[], limit?: number): Promise<AppQuestion[]>;
  fetchEnglishQuestionsAllGrades(limit?: number, balanced?: boolean, cefrLevelNum?: number): Promise<AppQuestion[]>;
}

export interface QuestionSelectionDeps {
  repository: QuestionRepository;
  filterUnansweredQuestions: <T extends { id: string }>(
    questions: T[],
    maxQuestions?: number
  ) => { filtered: T[]; hadToRepeat: boolean };
}
