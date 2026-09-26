import type { AppQuestion } from '../api-service';
import { GRADE_TO_CEFR } from '../english-proficiency';

export function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rng: () => number = Math.random): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function shuffleQuestionOptions(q: AppQuestion, rng: () => number = Math.random): AppQuestion {
  if (!q.options || q.options.length === 0) return q;

  const shuffledOptions = shuffle(q.options, rng);
  const remappedOptions = shuffledOptions.map((opt, index) => {
    return {
      ...opt,
      id: String.fromCharCode(65 + index), // A, B, C, D...
      originalId: opt.id
    };
  });

  const originalToNewId = new Map<string, string>();
  remappedOptions.forEach(opt => {
    originalToNewId.set(opt.originalId, opt.id);
  });

  let newCorrectOptionId = q.correctOptionId;
  if (originalToNewId.has(q.correctOptionId)) {
    newCorrectOptionId = originalToNewId.get(q.correctOptionId)!;
  }

  let newCorrectOptionIds = q.correctOptionIds;
  if (q.correctOptionIds) {
    newCorrectOptionIds = q.correctOptionIds.map(id => originalToNewId.get(id) || id);
  }

  const finalOptions = remappedOptions.map(({ originalId, ...rest }) => rest);

  return {
    ...q,
    options: finalOptions,
    correctOptionId: newCorrectOptionId,
    correctOptionIds: newCorrectOptionIds
  };
}

const CEFR_ORDER = ['A1', 'A1+', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'B2+', 'C1', 'C2'];

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
        const qLevel = q.cefr_level || (q.grade ? GRADE_TO_CEFR[q.grade as keyof typeof GRADE_TO_CEFR] : undefined);
        if (!qLevel) return true;
        const qIndex = CEFR_ORDER.indexOf(qLevel);
        return qIndex === -1 || qIndex >= minIndex;
      });

      const lowerPool = pool.filter((q) => {
        const qLevel = q.cefr_level || (q.grade ? GRADE_TO_CEFR[q.grade as keyof typeof GRADE_TO_CEFR] : undefined);
        return qLevel === lowerLevel;
      });

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
  const selectedQuestions = (filtered as AppQuestion[]).map(q => shuffleQuestionOptions(q));
  return { selectedQuestions, hadToRepeat };
}
