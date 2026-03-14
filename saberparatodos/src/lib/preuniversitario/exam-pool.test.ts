import { describe, expect, it } from 'vitest';
import type { AppQuestion } from '../api-service';
import { buildPreuExamPool, isPreuQuestion, parseRawPreuBundles } from './exam-pool';

const question = (id: string, grade: number, difficulty: number, category: string): AppQuestion => ({
  id,
  text: id,
  options: [
    { id: 'A', text: 'A' },
    { id: 'B', text: 'B' },
  ],
  correctOptionId: 'A',
  category,
  grade,
  difficulty,
});

describe('preuniversitario exam pool', () => {
  it('detects preu questions from ids and category', () => {
    expect(isPreuQuestion(question('CO-PREU-UNAL-001-v1', 11, 5, 'PREUNIVERSITARIO :: UNAL'))).toBe(true);
    expect(isPreuQuestion(question('CO-MAT-11-001-v1', 11, 5, 'MATEMATICAS :: ALGEBRA'))).toBe(false);
  });

  it('loads local preu questions from markdown bundles', () => {
    const unalQuestions = parseRawPreuBundles({
      'CO-PREU-UNAL-001-bundle.md': `---
id: "CO-PREU-UNAL-001"
grado: 11
asignatura: "Preuniversitario"
tema: "Analisis de Imagen y Espacialidad - Admision UNAL"
protocol_version: "2.0"
---

## Pregunta 1 (Nivel: 5 - Sintesis)
**ID:** "CO-PREU-UNAL-001-v1"
### Enunciado
Texto de prueba
### Opciones
- [x] A) Correcta
- [ ] B) Incorrecta
### Explicación Pedagógica
Explicacion
`
    }, 'unal');
    expect(unalQuestions.length).toBeGreaterThan(0);
    expect(unalQuestions.every((item) => item.id.includes('-UNAL-'))).toBe(true);
    expect(unalQuestions.every((item) => item.grade === 11)).toBe(true);
  });

  it('mixes preu questions with hard grade 11 questions', () => {
    const mixedPool = buildPreuExamPool([
      question('CO-PREU-UNAL-001-v1', 11, 5, 'PREUNIVERSITARIO :: UNAL'),
      question('CO-PREU-UNAL-001-v2', 11, 6, 'PREUNIVERSITARIO :: UNAL'),
      { ...question('CO-MAT-11-hard-1', 11, 5, 'MATEMATICAS :: PROBABILIDAD'), protocol_version: '4.1', bundleId: 'CO-MAT-11-prob-001-PRO-v4' },
      question('CO-SOC-11-hard-1', 11, 7, 'SOCIALES :: GLOBALIZACION'),
      { ...question('CO-MAT-11-mid-1', 11, 4, 'MATEMATICAS :: ALGEBRA'), protocol_version: '4.1', bundleId: 'CO-MAT-11-algebra-001-PRO-v4' },
      { ...question('CO-MAT-11-old-1', 11, 5, 'MATEMATICAS :: ALGEBRA'), protocol_version: '2.1', bundleId: 'CO-MAT-11-old-001-bundle' },
    ], 10, 'unal');

    expect(mixedPool.some((item) => item.id.startsWith('CO-PREU-UNAL-'))).toBe(true);
    expect(mixedPool.some((item) => item.id === 'CO-MAT-11-hard-1')).toBe(true);
    expect(mixedPool.some((item) => item.id === 'CO-SOC-11-hard-1')).toBe(false);
    expect(mixedPool.some((item) => item.id === 'CO-MAT-11-mid-1')).toBe(false);
    expect(mixedPool.some((item) => item.id === 'CO-MAT-11-old-1')).toBe(false);
  });
});
