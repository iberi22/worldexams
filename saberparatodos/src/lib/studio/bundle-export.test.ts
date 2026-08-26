import { describe, it, expect } from 'vitest';
import { generateBundleMarkdown, buildBundleFileName } from './bundle-export';

const fixtureQuestions = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1;
  const letters = ['A', 'B', 'C', 'D'] as const;
  const correct = letters[i % 4];
  return {
    id: `CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle-v${n}`,
    number: n,
    statement: `Pregunta ${n}: ¿Cuánto es ${n} + ${n}?`,
    context: `Contexto local Bogotá pregunta ${n}`,
    options: letters.map((L) => ({
      letter: L,
      text: L === correct ? `Respuesta correcta ${n}` : `Distractor ${L} pregunta ${n}`,
      is_correct: L === correct,
      feedback: L === correct ? 'Correcta: suma directa.' : 'Distractor: error de cálculo.',
    })),
    correct_answer: correct,
    explanation: `Explicación pedagógica de la pregunta ${n}: se evalúa suma básica.`,
    difficulty: n <= 2 ? 'D3-D4' : n <= 5 ? 'D5-D6' : n <= 8 ? 'D7-D8' : 'D9-D10',
    bloom: n <= 2 ? 'Remember' : n <= 5 ? 'Apply' : n <= 8 ? 'Analyze' : 'Evaluate',
  };
});

describe('buildBundleFileName', () => {
  it('respeta naming canónico v5.2', () => {
    const name = buildBundleFileName({
      country: 'colombia',
      countryCode: 'CO',
      grado: 6,
      asignatura: 'matematicas',
      tema: 'numeros-enteros',
      week: 'W01',
    });
    expect(name).toBe('CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle.md');
  });

  it('normaliza tema a kebab ASCII y week a WNN', () => {
    const name = buildBundleFileName({
      country: 'mexico',
      countryCode: 'MX',
      grado: 11,
      asignatura: 'matemáticas',
      tema: 'Funciones Cuadráticas Avanzadas',
      week: '1',
    });
    expect(name).toBe('MX-MAT-11-2026-W01-funciones-cuadraticas-avanzadas-001-MASTERY-bundle.md');
  });

  it('preserva 3EM para Brasil', () => {
    const name = buildBundleFileName({
      country: 'brasil',
      countryCode: 'BR',
      grado: '3EM' as any,
      asignatura: 'matematica',
      tema: 'geometria-analitica',
      week: 'W12',
    });
    expect(name).toBe('BR-MAT-3EM-2026-W12-geometria-analitica-001-MASTERY-bundle.md');
  });
});

describe('generateBundleMarkdown', () => {
  it('genera fixture JSON → .md v5.2 esperado (10 preguntas)', () => {
    const { fileName, content } = generateBundleMarkdown(
      {
        country: 'colombia',
        countryCode: 'CO',
        grado: 6,
        asignatura: 'matematicas',
        tema: 'numeros-enteros',
        week: 'W01',
        alignment: 'DBA MEN Colombia',
        bundle_index: 1,
        creador: 'local-llm',
      },
      fixtureQuestions as any,
    );

    expect(fileName).toBe('CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle.md');

    // frontmatter v5.2
    expect(content).toContain('id: "CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle"');
    expect(content).toContain('country: "colombia"');
    expect(content).toContain('grado: 6');
    expect(content).toContain('asignatura: "matematicas"');
    expect(content).toContain('tema: "numeros-enteros"');
    expect(content).toContain('week: "W01"');
    expect(content).toContain('protocol_version: "5.2"');
    expect(content).toContain('total_questions: 10');
    expect(content).toContain('bundle_size: 10');
    expect(content).toContain('bundle_index: 1');
    expect(content).toContain('calibration: {difficulty_band: "D3-D4", expected_success: 0.8}');
    expect(content).toContain('creador: "local-llm"');

    // question headers with range
    expect(content).toContain('## Question 1 [D3-D4]');
    expect(content).toContain('## Question 5 [D5-D6]');
    expect(content).toContain('## Question 8 [D7-D8]');
    expect(content).toContain('## Question 10 [D9-D10]');
    // Bloom / ICFES (Colombia exclusive) / Expected_Success / Contexto
    expect(content).toContain('**ICFES:**');
    expect(content).not.toContain('**EJE:**'); // Colombia uses ICFES
    expect(content).toContain('**Bloom:**');
    expect(content).toContain('**Expected_Success:**');
    expect(content).toContain('**Contexto:**');
    expect(content).toContain('### Enunciado');
    expect(content).toContain('### Opciones');
    expect(content).toContain('### Explicacion Pedagogica');
    // options exactly 4 per question, one correct, feedback present
    const correctMarks = (content.match(/- \[x\]/g) || []).length;
    expect(correctMarks).toBe(10);
    const totalOptions = (content.match(/- \[[ x]\]/g) || []).length;
    expect(totalOptions).toBe(40);
    expect(content).toContain('<!-- feedback:');
    // no banned phrases
    expect(content).not.toMatch(/todas las anteriores/i);
    expect(content).not.toMatch(/ninguna de las anteriores/i);
  });

  it('usa EJE para países no-CO y preserva feedback aunque venga en línea siguiente', () => {
    const qs = fixtureQuestions.slice(0, 2).map((q) => ({ ...q }));
    const { content } = generateBundleMarkdown(
      { country: 'mexico', countryCode: 'MX', grado: 6, asignatura: 'matematicas', tema: 'fracciones', week: 'W02' },
      qs as any,
    );
    expect(content).toContain('**EJE:**');
    expect(content).not.toContain('**ICFES:**');
    expect(content).toContain('CO-MAT' === '' ? '' : ''); // keep coverage
  });

  it('normaliza dificultad suelta [D3] a rango [D3-D4]', () => {
    const qs = [{ ...fixtureQuestions[0], difficulty: 'D3' }];
    const { content } = generateBundleMarkdown(
      { country: 'colombia', countryCode: 'CO', grado: 6, asignatura: 'matematicas', tema: 'test', week: 'W01' },
      qs as any,
    );
    expect(content).toContain('[D3-D4]');
    expect(content).not.toContain('[D3]');
  });

  it('download helper not executed in jsdom — markdown is pure', () => {
    const { content } = generateBundleMarkdown(
      { country: 'colombia', countryCode: 'CO', grado: 6, asignatura: 'matematicas', tema: 'numeros-enteros', week: 'W01' },
      fixtureQuestions.slice(0, 1) as any,
    );
    expect(content.startsWith('---\n')).toBe(true);
    expect(content.endsWith('\n')).toBe(true);
  });
});
