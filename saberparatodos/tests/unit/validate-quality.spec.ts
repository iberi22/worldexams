import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  detectControlChars,
  detectPlaceholder,
  detectAllNoneOfAbove,
  checkExplanation,
  checkFeedbackTrivial,
  checkExplanationTemplate,
  checkAnswerLetterBias,
  validateFile
} from '../../../scripts/validate-bundles-v52.mjs';

const tempDir = path.join(process.cwd(), 'temp_quality_tests');

describe('Quality Gates Detector Functions', () => {
  it('detectControlChars detects ASCII control chars', () => {
    const text = 'Normal line\nLine with \x0B form feed\nLine with \x1E separator';
    const result = detectControlChars(text);
    expect(result.length).toBe(2);
    expect(result[0].line).toBe(2);
  });

  it('detectControlChars ignores valid text', () => {
    const text = 'Normal line\nLine with no issues';
    expect(detectControlChars(text).length).toBe(0);
  });

  it('detectPlaceholder detects placeholder text', () => {
    expect(detectPlaceholder('Pregunta de prueba 1', null, '')).toBe(true);
    expect(detectPlaceholder('Explicación detallada de la pregunta', null, '')).toBe(true);
    expect(detectPlaceholder('- [ ] B) Distractor 2', null, '')).toBe(true);
    expect(detectPlaceholder('- [x] A) Opción correcta', null, '')).toBe(true);
    expect(detectPlaceholder('Normal text', { tema: 'test' }, '')).toBe(true);
    expect(detectPlaceholder('Normal text', { tema: 'math' }, 'bundle-test-01')).toBe(true);
  });

  it('detectPlaceholder ignores valid content', () => {
    expect(detectPlaceholder('Pregunta normal sobre biología', { tema: 'Biología' }, 'bundle-01')).toBe(false);
    // Real feedback mentioning "la opción correcta" / "la opción B" is not a placeholder
    expect(detectPlaceholder('  <!-- feedback: Esta es la opción correcta porque... -->\nLa opción B confunde masa y peso.', null, '')).toBe(false);
    // Topics that merely contain "test" are valid
    expect(detectPlaceholder('Normal text', { tema: 'textos-testimoniales' }, 'bundle-01')).toBe(false);
  });

  it('detectAllNoneOfAbove detects forbidden options', () => {
    expect(detectAllNoneOfAbove('Todas las anteriores')).toBe(true);
    expect(detectAllNoneOfAbove('Ninguna de las opciones anteriores')).toBe(true);
    expect(detectAllNoneOfAbove('All of the above')).toBe(true);
    expect(detectAllNoneOfAbove('A y B')).toBe(true);
    expect(detectAllNoneOfAbove('a y c')).toBe(true);
  });

  it('detectAllNoneOfAbove ignores valid options', () => {
    expect(detectAllNoneOfAbove('El perro ladra')).toBe(false);
    expect(detectAllNoneOfAbove('Las montañas son altas')).toBe(false);
  });

  it('checkExplanation detects empty and short explanations', () => {
    expect(checkExplanation('Too short')).toEqual({ error: 'explanation-empty' });
    expect(checkExplanation('A'.repeat(50))).toEqual({ warning: 'explanation-short' });
  });

  it('checkExplanation ignores valid explanations', () => {
    expect(checkExplanation('A'.repeat(100))).toBeNull();
  });

  it('checkFeedbackTrivial detects trivial feedback', () => {
    expect(checkFeedbackTrivial('incorrect.')).toBe(true);
    expect(checkFeedbackTrivial('No.')).toBe(true);
    expect(checkFeedbackTrivial('correct! well done.')).toBe(true);
    expect(checkFeedbackTrivial('123456789012345678901234')).toBe(true);
  });

  it('checkFeedbackTrivial ignores valid feedback', () => {
    expect(checkFeedbackTrivial('Esta es una retroalimentación detallada que explica por qué la opción es correcta o incorrecta en más de veinticinco caracteres.')).toBe(false);
  });

  it('checkExplanationTemplate detects repeated templates', () => {
    const exps = [
      'This is a long valid explanation about biology that is more than 80 chars long easily yes sir indeed very very long.',
      'This is a long valid explanation about biology that is more than 80 chars long easily yes sir indeed very very long.',
      'This is a long valid explanation about biology that is more than 80 chars long easily yes sir indeed very very long.'
    ];
    expect(checkExplanationTemplate(exps)).toBe(true);
  });

  it('checkExplanationTemplate ignores unique templates', () => {
    const exps = ['Exp 1 is long enough', 'Exp 2 is long enough', 'Exp 3 is long enough'];
    expect(checkExplanationTemplate(exps)).toBe(false);
  });

  it('checkAnswerLetterBias detects bias', () => {
    expect(checkAnswerLetterBias(['A', 'A', 'A', 'A', 'A', 'B', 'C', 'D'], 8)).toBe('bias-over-50');
    expect(checkAnswerLetterBias(['A', 'B', 'B', 'C', 'A', 'B', 'B', 'C', 'A', 'B', 'B', 'C'], 12)).toBe('bias-zero'); // D is 0
  });

  it('checkAnswerLetterBias ignores balanced answers', () => {
    expect(checkAnswerLetterBias(['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'], 8)).toBeNull();
    expect(checkAnswerLetterBias(['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'], 12)).toBeNull();
  });
});

describe('validateFile Integration (Quality Gates)', () => {
  beforeEach(() => {
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
  });

  const validFrontmatter = `---
id: CO-MAT-7-2026-W01-regla-tres-001-MASTERY-bundle
country: Colombia
grado: 7
asignatura: Matematicas
tema: Regla de tres
periodo: weekly
week: W01
year: 2026
bundle_type: weekly
protocol_version: 5.2
total_questions: 10
bundle_size: 10
alignment: ICFES
license: FREE
tier: legacy
creador: Jules-Agent
---`;

  const buildQuestion = (num, letter = 'A') => `## Question ${num} [D3-D4]
**ID:** Q${num}
**Bloom:** Remember
**ICFES:** Pensamiento Espacial
**Expected_Success:** 0.70
**Contexto:** Un granjero tiene 3 vacas y 2 ovejas.

### Enunciado
¿Cuántos animales tiene en total?

### Opciones
- [${letter === 'A' ? 'X' : ' '}] A) 5
  <!-- feedback: Es correcto porque 3 + 2 = 5 y esta es la suma total. -->
- [${letter === 'B' ? 'X' : ' '}] B) 4
  <!-- feedback: Es incorrecto porque 3 + 2 no es igual a 4. Necesitas sumar bien. -->
- [${letter === 'C' ? 'X' : ' '}] C) 6
  <!-- feedback: Es incorrecto porque agregaste uno de mas a la suma. -->
- [${letter === 'D' ? 'X' : ' '}] D) 1
  <!-- feedback: Es incorrecto porque restaste en lugar de sumar los animales. -->

### Explicacion Pedagogica
Esta es una explicacion detallada y pedagogica sobre como sumar numeros enteros positivos de un digito.
`;

  it('reports missing yaml frontmatter', () => {
    const file = path.join(tempDir, 'CO-MAT-7-2026-W01-regla-tres-001-MASTERY-bundle.md');
    fs.writeFileSync(file, 'No frontmatter here.');
    const result = validateFile(file);
    expect(result.errors).toContain('ERROR [frontmatter] Missing YAML frontmatter');
  });

  it('runs cleanly on perfect file', () => {
    const file = path.join(tempDir, 'CO-MAT-7-2026-W01-regla-tres-001-MASTERY-bundle.md');
    let qText = '';
    for(let i=1; i<=10; i++) {
        // Balance A, B, C, D to avoid bias
        const letter = i % 4 === 1 ? 'A' : (i % 4 === 2 ? 'B' : (i % 4 === 3 ? 'C' : 'D'));
        qText += buildQuestion(i, letter) + '\n';
    }
    // Modify one explanation to avoid explanation-template
    qText = qText.replace('explicacion detallada y pedagogica sobre como sumar', 'explicacion distinta para la pregunta');
    fs.writeFileSync(file, `${validFrontmatter}\n\n${qText}`);

    const result = validateFile(file);
    // Ignore out of tree warning for this unit test if present
    const relevantErrors = result.errors.filter(e => !e.includes('outside questions_data'));
    // Depending on repeated texts, it might trigger template warning, but shouldn't error.
    expect(relevantErrors).toEqual([]);
  });
});
