import { describe, it, expect } from 'vitest';
import { transformQuestion, getPackSubjectAliases } from './question-transformer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function makeAPIQuestion(overrides: any = {}) {
  return {
    id: 'test-q-1',
    statement: 'Question statement?',
    options: [
      { letter: 'A', text: 'Option A', is_correct: true },
      { letter: 'B', text: 'Option B', is_correct: false },
    ],
    correct_answer: 'A',
    ...overrides,
  };
}

describe('question-transformer feedback preservation', () => {
  it('preserves API-shaped option with feedback field', () => {
    const api = makeAPIQuestion({
      options: [
        { letter: 'A', text: 'Option A', is_correct: true, feedback: 'Correct!' },
        { letter: 'B', text: 'Option B', is_correct: false, retroalimentacion: 'Wrong!' },
        { letter: 'C', text: 'Option C', is_correct: false, rationale: 'Also wrong' }
      ]
    });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.options[0].feedback).toBe('Correct!');
    expect(result.options[1].feedback).toBe('Wrong!');
    expect(result.options[2].feedback).toBe('Also wrong');
  });

  it('extracts feedback from embedded comment only (backward compat)', () => {
    const api = makeAPIQuestion({
      options: [
        { letter: 'A', text: 'Option A <!-- feedback: Embedded correct -->', is_correct: true },
        { letter: 'B', text: 'Option B', is_correct: false }
      ]
    });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.options[0].feedback).toBe('Embedded correct');
    expect(result.options[1].feedback).toBeUndefined();
  });

  it('explicit field wins over embedded comment', () => {
    const api = makeAPIQuestion({
      options: [
        { letter: 'A', text: 'Option A <!-- feedback: Embedded -->', is_correct: true, feedback: 'Explicit wins' }
      ]
    });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.options[0].feedback).toBe('Explicit wins');
  });

  it('normalizes subject key frances not to ingles', () => {
    const aliases = getPackSubjectAliases('ingles');
    expect(aliases).not.toContain('frances');
  });

  it('transforms real pack fixture preserving feedback', () => {
    const packPath = path.resolve(process.cwd(), 'apps/worldexams-api/public/v1/packs/co-week-31-grade-11-subject-matematicas.json');
    const pack = JSON.parse(fs.readFileSync(packPath, 'utf8'));
    const firstQuestion = pack.questions[0];

    const result = transformQuestion(firstQuestion, 11, 'matematicas');

    expect(result.options).toHaveLength(4);
    result.options.forEach(opt => {
      expect(opt.feedback).toBeTruthy();
      expect(opt.feedback?.length).toBeGreaterThan(0);
    });
    expect(result.options[0].feedback).toContain('Correcto.');
    expect(result.options[1].feedback).toContain('Incorrecto.');
  });
});
