/**
 * lib-cognitive-scoring.test.ts (F15 ADICIONAL — NO duplica scoring-cognitive.test.ts)
 *
 * Tests complementarios que cubren edge cases DIFERENTES:
 * - z-scores fuera de rango (Infinity, -Infinity, valores extremos)
 * - computeCognitiveProfile con rawScores vacíos o con ceros
 * - percentileToStanine con percentiles en los bordes
 * - getLevelDescription con valores exactos en los thresholds
 */
import { describe, it, expect } from 'vitest';
import {
  zScoreToPercentile,
  zScoreToStandard,
  percentileToStanine,
  getLevelDescription,
  computeCognitiveProfile,
  type RawCognitiveScores
} from '../../../src/lib/neurogym/scoring-cognitive';

describe('cognitive scoring — edge cases (T3 F15)', () => {
  describe('zScoreToPercentile — clamping', () => {
    it('z=Infinity → clamped to 99.9', () => {
      expect(zScoreToPercentile(Infinity)).toBe(99.9);
    });
    it('z=-Infinity → clamped to 0.1', () => {
      expect(zScoreToPercentile(-Infinity)).toBe(0.1);
    });
    it('z=100 → clamped to 99.9 (no overflow)', () => {
      expect(zScoreToPercentile(100)).toBe(99.9);
    });
    it('z=-100 → clamped to 0.1', () => {
      expect(zScoreToPercentile(-100)).toBe(0.1);
    });
  });

  describe('zScoreToStandard — clamping a rango [40, 160]', () => {
    it('z=10 → clamped to 160', () => {
      expect(zScoreToStandard(10)).toBe(160);
    });
    it('z=-10 → clamped to 40', () => {
      expect(zScoreToStandard(-10)).toBe(40);
    });
  });

  describe('percentileToStanine — bordes exactos', () => {
    it('percentile=4 → stanine 2', () => {
      expect(percentileToStanine(4)).toBe(2);
    });
    it('percentile=11 → stanine 3', () => {
      expect(percentileToStanine(11)).toBe(3);
    });
    it('percentile=23 → stanine 4', () => {
      expect(percentileToStanine(23)).toBe(4);
    });
    it('percentile=40 → stanine 5', () => {
      expect(percentileToStanine(40)).toBe(5);
    });
    it('percentile=60 → stanine 6', () => {
      expect(percentileToStanine(60)).toBe(6);
    });
    it('percentile=77 → stanine 7', () => {
      expect(percentileToStanine(77)).toBe(7);
    });
    it('percentile=89 → stanine 8', () => {
      expect(percentileToStanine(89)).toBe(8);
    });
    it('percentile=96 → stanine 9', () => {
      expect(percentileToStanine(96)).toBe(9);
    });
  });

  describe('computeCognitiveProfile — rawScores vacíos o cero', () => {
    it('rawScores con total=0 en todos los campos NO crashea', () => {
      const emptyRaw = {
        fluidReasoningRaw: { correct: 0, total: 0, avgTimeMs: 0 },
        workingMemorySpan: { maxNLevel: 0, corsiSpan: 0, accuracy: 0 },
        processingSpeed: { avgReactionMs: 0, stroopInterferenceMs: 0, errorRate: 0 },
        motorCoordination: { tapsPer10s: 0, goNoGoAccuracy: 0, motorJitterMs: 0 },
        analyticalFlexibility: { ruleSwitchesSuccess: 0, totalRuleTrials: 0 },
        verbalComprehension: { correct: 0, total: 0, avgTimeMs: 0 },
        quantitativeReasoning: { correct: 0, total: 0, avgTimeMs: 0 }
      } as RawCognitiveScores;
      const profile = computeCognitiveProfile(emptyRaw);
      expect(profile).toBeDefined();
      expect(profile.overallIQProxy.standardScore).toBeGreaterThanOrEqual(40);
      expect(profile.overallIQProxy.standardScore).toBeLessThanOrEqual(160);
    });

    it('produce un timestamp válido', () => {
      const raw = {
        fluidReasoningRaw: { correct: 0, total: 0, avgTimeMs: 0 },
        workingMemorySpan: { maxNLevel: 0, corsiSpan: 0, accuracy: 0 },
        processingSpeed: { avgReactionMs: 0, stroopInterferenceMs: 0, errorRate: 0 },
        motorCoordination: { tapsPer10s: 0, goNoGoAccuracy: 0, motorJitterMs: 0 },
        analyticalFlexibility: { ruleSwitchesSuccess: 0, totalRuleTrials: 0 },
        verbalComprehension: { correct: 0, total: 0, avgTimeMs: 0 },
        quantitativeReasoning: { correct: 0, total: 0, avgTimeMs: 0 }
      } as RawCognitiveScores;
      const before = Date.now();
      const profile = computeCognitiveProfile(raw);
      const after = Date.now();
      expect(profile.timestamp).toBeGreaterThanOrEqual(before);
      expect(profile.timestamp).toBeLessThanOrEqual(after);
    });

    it('produce strengths y growthAreas no vacíos', () => {
      const raw = {
        fluidReasoningRaw: { correct: 5, total: 10, avgTimeMs: 8000 },
        workingMemorySpan: { maxNLevel: 3, corsiSpan: 6, accuracy: 0.85 },
        processingSpeed: { avgReactionMs: 280, stroopInterferenceMs: 50, errorRate: 0.05 },
        motorCoordination: { tapsPer10s: 55, goNoGoAccuracy: 0.88, motorJitterMs: 30 },
        analyticalFlexibility: { ruleSwitchesSuccess: 8, totalRuleTrials: 12 },
        verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
        quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
      } as RawCognitiveScores;
      const profile = computeCognitiveProfile(raw);
      // strengths + growthAreas juntos cubren los 7 dominios
      const total = profile.strengths.length + profile.growthAreas.length;
      expect(total).toBeGreaterThanOrEqual(7);
    });
  });
});