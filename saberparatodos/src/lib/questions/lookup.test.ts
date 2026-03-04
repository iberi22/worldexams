import { describe, it, expect } from 'vitest';
import type { AppQuestion } from '../api-service';
import { findQuestionById } from './lookup';

const mkQ = (id: string, bundleId?: string): AppQuestion => ({
  id,
  text: 'Pregunta',
  options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }],
  correctOptionId: 'A',
  category: 'MATEMATICAS :: b',
  grade: 11,
  difficulty: 3,
  bundleId
});

describe('question lookup', () => {
  it('finds question in bulk pool by id variant', async () => {
    const repository = {
      fetchBulkQuestions: async () => [mkQ('CO-MAT-11-algebra-001-v1', 'CO-MAT-11-algebra-001')],
      fetchQuestions: async () => []
    } as any;

    const found = await findQuestionById({
      questionId: 'CO-MAT-11-algebra-001-v1',
      repository
    });

    expect(found?.id).toBe('CO-MAT-11-algebra-001-v1');
  });

  it('falls back to known question if not found in API', async () => {
    const repository = {
      fetchBulkQuestions: async () => [],
      fetchQuestions: async () => []
    } as any;

    const found = await findQuestionById({
      questionId: 'X-1',
      repository,
      getKnownQuestion: async () => mkQ('X-1')
    });

    expect(found?.id).toBe('X-1');
  });
});
