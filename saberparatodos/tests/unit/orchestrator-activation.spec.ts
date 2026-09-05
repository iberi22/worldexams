/**
 * orchestrator-activation.spec.ts
 * Prueba extremo a extremo del armado de examen con repositorio espiado:
 * - pool sólido (>100): ruta enriquecida ACTIVA (mezcla diagnóstica).
 * - pool en maduración (≤100): lógica conservada pero DESACTIVADA por diseño.
 * - la selección final solo trae grado+materia pedidos.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prepareSoloExamQuestions } from '../../src/lib/questions/orchestrator';
import type { AppQuestion } from '../../src/lib/api-service';
import type { QuestionRepository, QuestionSelectionDeps } from '../../src/lib/questions/types';

function q(id: string, grade: number, category: string): AppQuestion {
  return {
    id,
    text: `enunciado ${id}`,
    options: [
      { id: 'A', text: 'a' },
      { id: 'B', text: 'b' },
    ],
    correctOptionId: 'A',
    category,
    grade,
    difficulty: 3,
  };
}

function mathPool(n: number, grade: number, prefix: string): AppQuestion[] {
  return Array.from({ length: n }, (_, i) => q(`${prefix}-g${grade}-${i}`, grade, 'MATEMATICAS :: b'));
}

function makeDeps(overrides: Partial<QuestionRepository> = {}): {
  deps: QuestionSelectionDeps;
  repo: QuestionRepository & Record<string, ReturnType<typeof vi.fn>>;
} {
  const repo = {
    fetchAllQuestionsForGrade: vi.fn(async () => [] as AppQuestion[]),
    fetchQuestions: vi.fn(async () => [] as AppQuestion[]),
    fetchBulkQuestions: vi.fn(async () => [] as AppQuestion[]),
    fetchEnglishQuestionsAllGrades: vi.fn(async () => [] as AppQuestion[]),
    ...overrides,
  };
  const deps: QuestionSelectionDeps = {
    repository: repo,
    filterUnansweredQuestions: ((items: { id: string }[], max?: number) => ({
      filtered: items.slice(0, max ?? items.length),
      hadToRepeat: false,
    })) as QuestionSelectionDeps['filterUnansweredQuestions'],
  };
  return { deps, repo: repo as QuestionRepository & Record<string, ReturnType<typeof vi.fn>> };
}

describe('prepareSoloExamQuestions con condicional de activación', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('pool sólido: examen grado 11 matemáticas trae solo grado 11 + matemáticas', async () => {
    const currentPool = [
      ...mathPool(120, 11, 'm11'),
      ...mathPool(30, 9, 'm9'),
      ...Array.from({ length: 20 }, (_, i) => q(`i11-${i}`, 11, 'INGLES :: b')),
    ];
    const { deps, repo } = makeDeps();

    const result = await prepareSoloExamQuestions(
      { grade: 11, subject: 'Matemáticas', count: 10 },
      deps,
      currentPool
    );

    expect(result.selectedQuestions).toHaveLength(10);
    for (const sq of result.selectedQuestions) {
      expect(sq.grade).toBe(11);
      expect(sq.category).toContain('MATEMATICAS');
    }
    // Pool suficiente en memoria: no debió salir a red.
    expect(repo.fetchAllQuestionsForGrade).not.toHaveBeenCalled();
    expect(repo.fetchBulkQuestions).not.toHaveBeenCalled();
  });

  it('pool en maduración + diagnóstico: mezcla DESACTIVADA por diseño, examen sale del pool básico', async () => {
    const currentPool = mathPool(30, 11, 'm11');
    const { deps, repo } = makeDeps();

    const result = await prepareSoloExamQuestions(
      { grade: 11, subject: 'Matemáticas', count: 10, useDiagnostic: true },
      deps,
      currentPool
    );

    // Lógica conservada pero desactivada: sin fetch a grados inferiores.
    expect(repo.fetchBulkQuestions).not.toHaveBeenCalled();
    expect(result.warnings.join(' ')).toContain('desactivada por diseño');
    expect(result.selectedQuestions).toHaveLength(10);
    for (const sq of result.selectedQuestions) {
      expect(sq.grade).toBe(11);
    }
  });

  it('pool sólido + diagnóstico: mezcla ACTIVA y trae refuerzo inferior', async () => {
    const currentPool = mathPool(150, 11, 'm11');
    const lower = mathPool(20, 9, 'm9');
    const { deps, repo } = makeDeps({
      fetchBulkQuestions: vi.fn(async () => lower),
    });

    const result = await prepareSoloExamQuestions(
      { grade: 11, subject: 'Matemáticas', count: 10, useDiagnostic: true },
      deps,
      currentPool
    );

    expect(repo.fetchBulkQuestions).toHaveBeenCalledTimes(1);
    expect(result.warnings.join(' ')).not.toContain('desactivada por diseño');
    expect(result.selectedQuestions).toHaveLength(10);
  });
});
