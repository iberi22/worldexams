/**
 * fetch-bulk-cache.spec.ts
 * Regresión D1: fetchBulkQuestions cacheaba por grados SIN incluir el límite,
 * así que mismos grados + distinto límite (Revisar 200/300 vs lookup 500)
 * devolvían el pool truncado del primer caller.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AppQuestion } from '../../src/lib/api-service';

vi.mock('../../src/lib/pack-fetcher', () => ({
  fetchQuestionsFromPacks: vi.fn(async (grade: number) =>
    Array.from({ length: 500 }, (_, i) => ({
      id: `bulk-g${grade}-q${i}`,
      text: `Q${i}`,
      options: [
        { id: 'A', text: 'a' },
        { id: 'B', text: 'b' },
      ],
      correctOptionId: 'A',
      category: 'Matematicas :: pack',
      grade,
      difficulty: 3,
    }))
  ),
}));

import { fetchBulkQuestions } from '../../src/lib/api-service';
import { clearCache } from '../../src/lib/question-cache';

function ids(qs: AppQuestion[]): Set<string> {
  return new Set(qs.map((q) => q.id));
}

describe('fetchBulkQuestions — la caché distingue por límite', () => {
  beforeEach(() => {
    clearCache();
    vi.clearAllMocks();
  });

  it('mismos grados con límite 200 y luego 500 devuelven 200 y 500', async () => {
    const grades = [3, 5, 6, 7, 8, 9, 10, 11];
    const first = await fetchBulkQuestions(grades, 200);
    expect(first.length).toBe(200);

    const second = await fetchBulkQuestions(grades, 500);
    // Sin el fix fallaba: devolvía el pool cacheado de 200.
    expect(second.length).toBe(500);
    expect(ids(second).size).toBe(500);
  });

  it('pedido grande primero no contamina al pedido chico', async () => {
    const grades = [11];
    const big = await fetchBulkQuestions(grades, 500);
    expect(big.length).toBe(500);

    const small = await fetchBulkQuestions(grades, 200);
    expect(small.length).toBe(200);
  });
});
