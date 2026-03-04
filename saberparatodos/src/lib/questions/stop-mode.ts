import type { AppQuestion } from '../api-service';
import { filterValidQuestions } from './filters';
import type { QuestionRepository } from './types';

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function prepareStopModeQuestions(params: {
  repository: QuestionRepository;
  totalQuestions: number;
  includeEnglish: boolean;
  difficulty: 'easy' | 'medium' | 'hard' | string;
}): Promise<AppQuestion[]> {
  const { repository, totalQuestions, includeEnglish, difficulty } = params;

  let pool = await repository.fetchBulkQuestions([11], 300);

  if (!includeEnglish) {
    pool = pool.filter(
      (q) =>
        !String(q.category || '').toLowerCase().includes('inglés') &&
        !String(q.category || '').toLowerCase().includes('ingles')
    );
  }

  const diffMap: Record<string, number[]> = {
    easy: [1, 2],
    medium: [3],
    hard: [4, 5]
  };
  const allowedDifficulty = diffMap[difficulty] || [1, 2, 3, 4, 5];
  pool = pool.filter((q) => allowedDifficulty.includes(q.difficulty));

  const { validQuestions } = filterValidQuestions(pool, 2);
  return shuffle(validQuestions).slice(0, totalQuestions);
}

