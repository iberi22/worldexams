import { describe, it, expect } from 'vitest';
import type { AppQuestion } from '../api-service';
import { filterByPeriod, filterValidQuestions } from './filters';

const baseQuestion: AppQuestion = {
  id: 'CO-MAT-11-algebra-001-v1',
  text: 'x + 1 = 2',
  options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }],
  correctOptionId: 'A',
  category: 'MATEMATICAS :: CO-MAT-11-algebra-001',
  grade: 11,
  difficulty: 3,
  topics: ['algebra'],
  periodo: 1
};

describe('question filters', () => {
  it('filters by explicit periodo in period mode', () => {
    const q1 = { ...baseQuestion, id: 'q1', periodo: 1 };
    const q2 = { ...baseQuestion, id: 'q2', periodo: 2 };

    const filtered = filterByPeriod([q1, q2], {
      examMode: 'period',
      period: 1,
      subject: 'Matemáticas',
      grade: 11
    });

    expect(filtered.map((q) => q.id)).toEqual(['q1']);
  });

  it('validates minimum required question shape', () => {
    const invalid = { ...baseQuestion, id: 'bad', options: [] as any[] };
    const result = filterValidQuestions([baseQuestion, invalid], 2);
    expect(result.validQuestions).toHaveLength(1);
    expect(result.invalidCount).toBe(1);
  });

  // REGRESIÓN 2026-08-29: los packs v5.2 transportan la SEMANA curricular (W01–W40)
  // en `periodo`. Antes se comparaba 1:1 contra el periodo académico (1–4) y el
  // modo "Periodo 4" del UI nunca encontraba preguntas → "No hay preguntas
  // disponibles para esta configuración." con poolSize 50.
  it('maps weekly pack periodo (W01-W40) to academic periods via ceil(week/10)', () => {
    const w5 = { ...baseQuestion, id: 'w5', periodo: 5 };   // P1 (W01-W10)
    const w10 = { ...baseQuestion, id: 'w10', periodo: 10 }; // P1
    const w35 = { ...baseQuestion, id: 'w35', periodo: 35 }; // P4 (W31-W40)
    const w31 = { ...baseQuestion, id: 'w31', periodo: 31 }; // P4

    const p4 = filterByPeriod([w5, w10, w35, w31], {
      examMode: 'period',
      period: 4,
      subject: 'Matemáticas',
      grade: 11
    });
    expect(p4.map((q) => q.id).sort()).toEqual(['w31', 'w35']);

    const p1 = filterByPeriod([w5, w10, w35, w31], {
      examMode: 'period',
      period: 1,
      subject: 'Matemáticas',
      grade: 11
    });
    expect(p1.map((q) => q.id).sort()).toEqual(['w10', 'w5']);
  });

  it('keeps explicit period values 1-4 working unchanged', () => {
    const q1 = { ...baseQuestion, id: 'p1', periodo: 1 };
    const q4 = { ...baseQuestion, id: 'p4', periodo: 4 };
    const filtered = filterByPeriod([q1, q4], {
      examMode: 'period',
      period: 4,
      subject: 'Matemáticas',
      grade: 11
    });
    expect(filtered.map((q) => q.id)).toEqual(['p4']);
  });

  // REGRESIÓN 2026-08-29: "Simulacro Completo" con examMode=period fallaba porque
  // subjectsMatch() sí acepta cualquier materia, pero getPeriodTopics solo devolvía
  // temas si existían en el currículo; preguntas sin `periodo` y sin topic común a
  // TODAS las materias quedaban fuera. El mapeo semana→periodo (ramas explícitas)
  // ahora cubre el caso de los packs, que SIEMPRE traen `periodo` (semana).
  it('supports Simulacro Completo as cross-subject aggregate in period mode', () => {
    const matW32 = { ...baseQuestion, id: 'mat', category: 'MATEMATICAS :: x', periodo: 32 };
    const ingW33 = { ...baseQuestion, id: 'ing', category: 'INGLES :: y', periodo: 33 };
    const lecW35 = { ...baseQuestion, id: 'lec', category: 'LECTURA CRITICA :: z', periodo: 35 };
    const matW3 = { ...baseQuestion, id: 'old', category: 'MATEMATICAS :: x', periodo: 3 };

    const filtered = filterByPeriod([matW32, ingW33, lecW35, matW3], {
      examMode: 'period',
      period: 4,
      subject: 'Simulacro Completo',
      grade: 11
    });
    expect(filtered.map((q) => q.id).sort()).toEqual(['ing', 'lec', 'mat']);
  });
});
