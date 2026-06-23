import type { AppQuestion } from '../api-service';
import { GRADE_TO_CEFR } from '../english-proficiency';
import { CURRICULUM_CO, normalizeTopic } from '../../config/curriculum';
import { subjectsMatch } from './subject';
import type { QuestionSelectionRequest } from './types';
import type { QuestionValidationResult } from './types';

export function filterBySubject(questions: AppQuestion[], selectedSubject: string | null): AppQuestion[] {
  return questions.filter((q) => subjectsMatch(q.category, selectedSubject));
}

export function filterByGradeAndDiagnostic(
  questions: AppQuestion[],
  grade: number,
  useDiagnostic: boolean,
  englishDiagnostic: boolean
): AppQuestion[] {
  if (englishDiagnostic) return questions;

  if (!useDiagnostic) {
    return questions.filter((q) => (grade ? q.grade === grade : true));
  }

  const lowerGrades = [3, 5, 7, 9].filter((g) => g < grade);
  let result = questions.filter((q) => q.grade === grade || (q.grade < grade && lowerGrades.includes(q.grade)));

  return result;
}

const CEFR_ORDER = ['A1', 'A1+', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'B2+', 'C1', 'C2'];

export function filterByCefrLevel(questions: AppQuestion[], minCefrLevel?: string): AppQuestion[] {
  if (!minCefrLevel) return questions;

  const minIndex = CEFR_ORDER.indexOf(minCefrLevel);
  if (minIndex === -1) return questions; // Invalid cefr level, do not filter

  return questions.filter((q) => {
    const qLevel = q.cefr_level || (q.grade ? GRADE_TO_CEFR[q.grade as keyof typeof GRADE_TO_CEFR] : undefined);
    if (!qLevel) return true; // fallback only if absolutely no grade/level is known
    const qIndex = CEFR_ORDER.indexOf(qLevel);
    if (qIndex === -1) return true;

    // Exact match or higher is always okay for non-balanced scenarios
    // But for the current logic, we maintain the +/- 1 behavior BUT fix the "below" part
    // The previous code: Math.abs(qIndex - minIndex) <= 1
    // This allows minIndex-1, minIndex, minIndex+1.
    // So if minIndex is B1 (4), it allowed A2+ (3), B1 (4), B1+ (5).
    // If qIndex was C1 (8), Math.abs(8-4) = 4, so it was filtered out!
    // That's why C1 was filtered out when B1 was min level.

    // Fixed logic: Allow if it's within +/- 1 OR if it's higher than minIndex
    return qIndex >= minIndex - 1;
  });
}

function getPeriodTopics(subject: string | null, grade: number, period: number): string[] {
  const normalizedSubject = normalizeTopic(subject || '');

  if (normalizedSubject === 'simulacrocompleto') {
    const gradeCurriculum = CURRICULUM_CO[grade];
    if (!gradeCurriculum) return [];

    const topics: string[] = [];
    Object.values(gradeCurriculum).forEach((subj) => {
      const periodConfig = subj.periods.find((p) => p.id === period);
      if (periodConfig?.topics) topics.push(...periodConfig.topics);
    });

    return topics;
  }

  const periodConfig = CURRICULUM_CO[grade]?.[normalizedSubject]?.periods?.find((p) => p.id === period);
  return periodConfig?.topics || [];
}

export function filterByPeriod(
  questions: AppQuestion[],
  config: { examMode?: 'simulacro' | 'period'; period?: number; subject: string | null; grade: number }
): AppQuestion[] {
  if (config.examMode !== 'period' || !config.period) return questions;

  const periodTopics = getPeriodTopics(config.subject, config.grade, config.period);

  return questions.filter((q) => {
    if (q.periodo !== undefined && q.periodo !== null) {
      return Number(q.periodo) === Number(config.period);
    }

    if (periodTopics.length === 0) {
      return false;
    }

    const topics = Array.isArray(q.topics) && q.topics.length > 0
      ? q.topics
      : [String(q.category || '').split(' :: ')[1]].filter(Boolean);

    return topics.some((topicRaw) => {
      const questionTopic = normalizeTopic(String(topicRaw));
      return periodTopics.some((curriculumTopic) => {
        const normalizedCurriculumTopic = normalizeTopic(curriculumTopic);
        return questionTopic.includes(normalizedCurriculumTopic) || normalizedCurriculumTopic.includes(questionTopic);
      });
    });
  });
}

export function filterValidQuestions(questions: AppQuestion[], minOptions: number = 2): QuestionValidationResult {
  const validQuestions = questions.filter((q) =>
    Boolean(
      q &&
      q.id &&
      q.text &&
      q.correctOptionId &&
      Array.isArray(q.options) &&
      q.options.length >= minOptions
    )
  );

  return {
    validQuestions,
    invalidCount: Math.max(0, questions.length - validQuestions.length)
  };
}

export function applyFilters(questions: AppQuestion[], request: QuestionSelectionRequest): AppQuestion[] {
  let result = questions;
  result = filterByCefrLevel(result, request.minCefrLevel);
  if (request.examMode === 'period' && request.period) {
    result = filterByPeriod(result, {
      examMode: request.examMode,
      period: request.period,
      subject: request.subject,
      grade: request.grade,
    });
  }
  return result;
}
