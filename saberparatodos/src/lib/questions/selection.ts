import type { AppQuestion } from '../api-service';

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const CEFR_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export function buildDiagnosticMixPool(
  questions: AppQuestion[],
  config: {
    grade: number;
    useDiagnostic: boolean;
    diagnosticMixPercent?: number;
    count: number;
    minCefrLevel?: string;
  }
): AppQuestion[] {
  let pool = questions;

  // 1. Grade-based Diagnostic Mix
  if (config.useDiagnostic && config.grade > 3) {
    const mixPercentRaw = Number(config.diagnosticMixPercent ?? 20);
    const mixPercent = Math.max(0, Math.min(100, Number.isNaN(mixPercentRaw) ? 20 : mixPercentRaw));
    const lowerGrades = [3, 5, 7, 9].filter((g) => g < config.grade);

    const currentGradePool = pool.filter((q) => q.grade === config.grade);
    const lowerGradePool = pool.filter((q) => q.grade < config.grade && lowerGrades.includes(q.grade));

    if (currentGradePool.length > 0 && lowerGradePool.length > 0) {
      const oversample = 4;
      const targetLower = Math.max(1, Math.round((config.count * mixPercent) / 100));
      const targetCurrent = Math.max(1, config.count - targetLower);

      pool = [
        ...shuffle(currentGradePool).slice(0, targetCurrent * oversample),
        ...shuffle(lowerGradePool).slice(0, targetLower * oversample)
      ];
    }
  }

  // 2. CEFR-based Diagnostic Mix ("pocas del nivel inferior")
  if (config.minCefrLevel) {
    const minIndex = CEFR_ORDER.indexOf(config.minCefrLevel);
    if (minIndex > 0) {
      const lowerLevel = CEFR_ORDER[minIndex - 1];

      const mainPool = pool.filter((q) => {
        if (!q.cefr_level) return true;
        const qIndex = CEFR_ORDER.indexOf(q.cefr_level);
        return qIndex === -1 || qIndex >= minIndex;
      });

      const lowerPool = pool.filter((q) => q.cefr_level === lowerLevel);

      if (mainPool.length > 0 && lowerPool.length > 0) {
        const mixPercent = 15; // "pocas"
        const targetLower = Math.max(1, Math.round((config.count * mixPercent) / 100));
        const targetMain = Math.max(1, config.count - targetLower);
        const oversample = 4;

        pool = [
          ...shuffle(mainPool).slice(0, targetMain * oversample),
          ...shuffle(lowerPool).slice(0, targetLower * oversample)
        ];
      }
    }
  }

  return pool;
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
