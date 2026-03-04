import type { AppQuestion } from '../api-service';
import { CURRICULUM_CO, normalizeTopic } from '../../config/curriculum';
import { subjectsMatch } from './subject';
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
  return questions.filter((q) => q.grade === grade || (q.grade < grade && lowerGrades.includes(q.grade)));
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
