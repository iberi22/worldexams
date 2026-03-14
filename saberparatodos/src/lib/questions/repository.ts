import {
  fetchAllQuestionsForGrade,
  fetchQuestions,
  fetchBulkQuestions,
  fetchEnglishQuestionsAllGrades,
  type AppQuestion
} from '../api-service';
import type { QuestionRepository } from './types';

export const defaultQuestionRepository: QuestionRepository = {
  fetchAllQuestionsForGrade,
  fetchQuestions,
  fetchBulkQuestions,
  fetchEnglishQuestionsAllGrades
};

export async function fetchQuestionsForGrade(grade: number, maxQuestions: number = 150): Promise<AppQuestion[]> {
  return fetchAllQuestionsForGrade(grade, true, maxQuestions);
}
