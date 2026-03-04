import type { AppQuestion } from '../api-service';

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildDiagnosticMixPool(
  questions: AppQuestion[],
  config: { grade: number; useDiagnostic: boolean; diagnosticMixPercent?: number; count: number }
): AppQuestion[] {
  if (!config.useDiagnostic || config.grade <= 3) {
    return questions;
  }

  const mixPercentRaw = Number(config.diagnosticMixPercent ?? 20);
  const mixPercent = Math.max(0, Math.min(100, Number.isNaN(mixPercentRaw) ? 20 : mixPercentRaw));
  const lowerGrades = [3, 5, 7, 9].filter((g) => g < config.grade);

  const currentGradePool = questions.filter((q) => q.grade === config.grade);
  const lowerGradePool = questions.filter((q) => q.grade < config.grade && lowerGrades.includes(q.grade));

  if (currentGradePool.length === 0 || lowerGradePool.length === 0) {
    return questions;
  }

  const oversample = 4;
  const targetLower = Math.max(1, Math.round((config.count * mixPercent) / 100));
  const targetCurrent = Math.max(1, config.count - targetLower);

  return [
    ...shuffle(currentGradePool).slice(0, targetCurrent * oversample),
    ...shuffle(lowerGradePool).slice(0, targetLower * oversample)
  ];
}

export function selectExamQuestions(
  questions: AppQuestion[],
  count: number,
  filterUnansweredQuestions: <T extends { id: string }>(
    items: T[],
    maxQuestions?: number
  ) => { filtered: T[]; hadToRepeat: boolean }
): { selectedQuestions: AppQuestion[]; hadToRepeat: boolean } {
  const { filtered, hadToRepeat } = filterUnansweredQuestions(questions, count);
  return { selectedQuestions: filtered, hadToRepeat };
}
