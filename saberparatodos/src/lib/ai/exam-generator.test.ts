import { describe, expect, it } from 'vitest';
import {
  COUNTRY_RULE_HINTS,
  getCountryRuleHint,
  validateLocalQuestion,
  type LocalGeneratedQuestion,
} from './exam-generator';

function q(n: number): LocalGeneratedQuestion {
  return {
    id: `t-${n}`,
    number: n,
    statement: `Pregunta de prueba número ${n} con suficiente texto`,
    options: [
      { letter: 'A', text: 'Correcta', is_correct: true, feedback: 'ok' },
      { letter: 'B', text: 'Mal 1', is_correct: false, feedback: 'no' },
      { letter: 'C', text: 'Mal 2', is_correct: false, feedback: 'no' },
      { letter: 'D', text: 'Mal 3', is_correct: false, feedback: 'no' },
    ],
    correct_answer: 'A',
    explanation: 'Explicación pedagógica de prueba válida.',
    difficulty: 'D5',
    source: 'llm',
  };
}

describe('validateLocalQuestion', () => {
  it('acepta 3 preguntas v5.2-shaped', () => {
    const qs = [1, 2, 3].map(q);
    expect(qs.every(validateLocalQuestion)).toBe(true);
  });

  it('rechaza todas las anteriores', () => {
    const bad = q(1);
    bad.options[3].text = 'Todas las anteriores';
    expect(validateLocalQuestion(bad)).toBe(false);
  });

  it('rechaza dos correctas', () => {
    const bad = q(1);
    bad.options[1].is_correct = true;
    expect(validateLocalQuestion(bad)).toBe(false);
  });
});

describe('COUNTRY_RULE_HINTS', () => {
  it('cubre los países clave con hints de marco curricular y moneda', () => {
    for (const code of ['CO', 'MX', 'AR', 'BR', 'CL', 'PE']) {
      expect(COUNTRY_RULE_HINTS[code]).toBeTruthy();
    }
    expect(getCountryRuleHint('CO')).toContain('DBA');
    expect(getCountryRuleHint('CO')).toContain('COP');
    expect(getCountryRuleHint('MX')).toContain('SEP');
    expect(getCountryRuleHint('MX')).toContain('MXN');
    expect(getCountryRuleHint('AR')).toContain('NAP');
    expect(getCountryRuleHint('AR')).toContain('voseo');
    expect(getCountryRuleHint('BR')).toContain('BNCC');
    expect(getCountryRuleHint('BR')).toContain('ENEM');
    expect(getCountryRuleHint('CL')).toContain('PAES');
    expect(getCountryRuleHint('PE')).toContain('MINEDU');
  });

  it('normaliza mayúsculas y devuelve vacío para países sin hint', () => {
    expect(getCountryRuleHint('mx')).toBe(COUNTRY_RULE_HINTS.MX);
    expect(getCountryRuleHint('ZZ')).toBe('');
    expect(getCountryRuleHint(undefined)).toBe('');
  });
});
