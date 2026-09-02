import { describe, it, expect } from 'vitest';
import {
  ARITHMETIC_BANK,
  getArithmeticItem,
  getArithmeticSession,
  type ArithmeticItem
} from './arithmetic-bank';
import { computeCognitiveProfile, type RawCognitiveScores } from './scoring-cognitive';

function evalExpression(expr: string): number {
  // Expresiones del banco: solo enteros y + - × ÷ con precedencia estándar.
  const normalized = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  if (!/^[\d\s+\-*/().]+$/.test(normalized)) {
    throw new Error(`Expresión no evaluable de forma segura: ${expr}`);
  }
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${normalized});`)() as number;
}

describe('arithmetic-bank (Gq stimulus)', () => {
  it('has ≥50 items covering the 5 difficulty levels', () => {
    expect(ARITHMETIC_BANK.length).toBeGreaterThanOrEqual(50);
    for (const level of [1, 2, 3, 4, 5] as const) {
      const count = ARITHMETIC_BANK.filter(i => i.difficulty === level).length;
      expect(count, `nivel ${level}`).toBeGreaterThanOrEqual(8);
    }
  });

  it('every item has exactly 4 unique numeric options and correctIndex in [0,3] pointing to the answer', () => {
    for (const item of ARITHMETIC_BANK) {
      expect(item.options).toHaveLength(4);
      for (const opt of item.options) {
        expect(typeof opt).toBe('number');
        expect(Number.isFinite(opt)).toBe(true);
        expect(Number.isInteger(opt)).toBe(true);
      }
      expect(new Set(item.options).size).toBe(4);
      expect(item.correctIndex).toBeGreaterThanOrEqual(0);
      expect(item.correctIndex).toBeLessThanOrEqual(3);
      expect(item.options[item.correctIndex]).toBe(item.answer);
      expect(item.problem).toBeTruthy();
      // Español: ninguna consigna en inglés.
      expect(item.problem.toLowerCase()).not.toMatch(/\b(solve|calculate|how much is)\b/);
    }
  });

  it('arithmetic correctness: expression items evaluate to their answer and distractors model common errors', () => {
    const expressionItems = ARITHMETIC_BANK.filter(i => i.expression);
    expect(expressionItems.length).toBeGreaterThanOrEqual(30);
    for (const item of expressionItems) {
      expect(evalExpression(item.expression!)).toBe(item.answer);
    }
    // Ejemplo canónico del protocolo: 23 + 45 = 68 con distractor "sin llevado" 58→68-10 y errores vecinos.
    const sum = ARITHMETIC_BANK.find(i => i.expression === '23 + 45') as ArithmeticItem;
    expect(sum.answer).toBe(68);
    expect(sum.options).toContain(68);
    // Precedencia operatoria: 12 + 8 × 3 = 36 (no 60, error de izquierda a derecha).
    const mixed = ARITHMETIC_BANK.find(i => i.expression === '12 + 8 × 3') as ArithmeticItem;
    expect(mixed.answer).toBe(36);
    expect(mixed.options).toContain(60);
  });

  it('word problems never have negative correct answers and are all in Spanish', () => {
    const words = ARITHMETIC_BANK.filter(i => i.operation === 'word_problem');
    expect(words.length).toBeGreaterThanOrEqual(20);
    for (const item of words) {
      expect(item.answer).toBeGreaterThan(0);
      expect(item.problem).toMatch(/[áéíóúñ¿¡]|cuánto|cuántos|¿/i);
    }
  });

  it('getArithmeticItem is deterministic and respects the difficulty filter', () => {
    const a = getArithmeticItem(42, 3);
    const b = getArithmeticItem(42, 3);
    expect(a).toBe(b);
    expect(a.difficulty).toBe(3);
    expect(getArithmeticItem(7, 1).difficulty).toBe(1);
    expect(getArithmeticItem(999, 5).difficulty).toBe(5);
  });

  it('getArithmeticSession returns the requested count, deterministic and without repeats', () => {
    const session = getArithmeticSession(1234, 10);
    expect(session).toHaveLength(10);
    expect(new Set(session).size).toBe(10);
    expect(getArithmeticSession(1234, 10).map(i => i.problem)).toEqual(session.map(i => i.problem));
    expect(getArithmeticSession(5, 5)).toHaveLength(5);
    expect(getArithmeticSession(5, 0)).toHaveLength(0);
  });
});

describe('scoring-cognitive — quantitativeReasoning (Gq) wiring', () => {
  const baseRaw: RawCognitiveScores = {
    fluidReasoningRaw: { correct: 7, total: 10, avgTimeMs: 8000 },
    workingMemorySpan: { maxNLevel: 3, corsiSpan: 6, accuracy: 0.85 },
    processingSpeed: { avgReactionMs: 280, stroopInterferenceMs: 50, errorRate: 0.05 },
    motorCoordination: { tapsPer10s: 55, goNoGoAccuracy: 0.88, motorJitterMs: 30 },
    analyticalFlexibility: { ruleSwitchesSuccess: 8, totalRuleTrials: 12 },
    quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
  };

  it('computes a complete CognitiveDomainResult for quantitativeReasoning', () => {
    const profile = computeCognitiveProfile(baseRaw);
    const gq = profile.quantitativeReasoning;
    expect(gq).toBeDefined();
    expect(gq.rawScore).toBe(7);
    expect(typeof gq.standardScore).toBe('number');
    expect(gq.percentile).toBeGreaterThan(0);
    expect(gq.stanine).toBeGreaterThanOrEqual(1);
    expect(gq.stanine).toBeLessThanOrEqual(9);
    expect(gq.clinicalSummary).toContain('7/10');
  });

  it('Gq accuracy maps through the (acc - 0.75) / 0.15 norm: 75% → 100, 90% → 115', () => {
    const avg = computeCognitiveProfile({
      ...baseRaw,
      quantitativeReasoning: { correct: 75, total: 100, avgTimeMs: 9000 }
    });
    expect(avg.quantitativeReasoning.standardScore).toBe(100);
    const high = computeCognitiveProfile({
      ...baseRaw,
      quantitativeReasoning: { correct: 9, total: 10, avgTimeMs: 4000 }
    });
    expect(high.quantitativeReasoning.standardScore).toBe(115);
  });

  it('total=0 produces accuracy 0 without NaN', () => {
    const profile = computeCognitiveProfile({
      ...baseRaw,
      quantitativeReasoning: { correct: 0, total: 0, avgTimeMs: 0 }
    });
    expect(Number.isNaN(profile.quantitativeReasoning.standardScore)).toBe(false);
    expect(profile.quantitativeReasoning.rawScore).toBe(0);
  });
});
