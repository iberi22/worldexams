import { describe, it, expect } from 'vitest';
import type { AppQuestion } from '../api-service';
import { prepareStopModeQuestions } from './stop-mode';

const q = (id: string, category: string, difficulty: number): AppQuestion => ({
  id,
  text: 'Pregunta',
  options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }],
  correctOptionId: 'A',
  category,
  grade: 11,
  difficulty
});

describe('stop mode selector', () => {
  it('filters english and difficulty', async () => {
    const repository = {
      fetchBulkQuestions: async () => [
        q('q1', 'MATEMATICAS :: bundle', 1),
        q('q2', 'INGLÉS :: bundle', 1),
        q('q3', 'MATEMATICAS :: bundle', 4)
      ]
    } as any;

    const selected = await prepareStopModeQuestions({
      repository,
      totalQuestions: 10,
      includeEnglish: false,
      difficulty: 'easy'
    });

    expect(selected.map((x) => x.id)).toEqual(['q1']);
  });
});
