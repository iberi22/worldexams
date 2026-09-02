import { describe, it, expect } from 'vitest';
import {
  zScoreToPercentile,
  zScoreToStandard,
  percentileToStanine,
  getLevelDescription,
  computeCognitiveProfile,
  type RawCognitiveScores
} from './scoring-cognitive';

describe('NeuroGym Psychometric Engine', () => {
  it('correctly maps Z-scores to standard normal distribution percentiles', () => {
    expect(zScoreToPercentile(0)).toBe(50.0);
    expect(zScoreToPercentile(1)).toBeGreaterThanOrEqual(84.0);
    expect(zScoreToPercentile(1)).toBeLessThanOrEqual(84.3);
    expect(zScoreToPercentile(-1)).toBeGreaterThanOrEqual(15.7);
    expect(zScoreToPercentile(-1)).toBeLessThanOrEqual(16.0);
    expect(zScoreToPercentile(2)).toBeGreaterThanOrEqual(97.5);
  });

  it('converts Z-scores to Standard IQ scale (Mean=100, SD=15)', () => {
    expect(zScoreToStandard(0)).toBe(100);
    expect(zScoreToStandard(1)).toBe(115);
    expect(zScoreToStandard(2)).toBe(130);
    expect(zScoreToStandard(-1)).toBe(85);
  });

  it('assigns correct stanine (1-9)', () => {
    expect(percentileToStanine(50)).toBe(5);
    expect(percentileToStanine(98)).toBe(9);
    expect(percentileToStanine(2)).toBe(1);
  });

  it('classifies diagnostic performance levels appropriately', () => {
    expect(getLevelDescription(135)).toBe('Superior');
    expect(getLevelDescription(122)).toBe('Alto');
    expect(getLevelDescription(112)).toBe('Promedio Alto');
    expect(getLevelDescription(100)).toBe('Promedio');
    expect(getLevelDescription(85)).toBe('Promedio Bajo');
    expect(getLevelDescription(70)).toBe('En Desarrollo');
  });

  it('computes complete cognitive profile with recommendations', () => {
    const rawData: RawCognitiveScores = {
      fluidReasoningRaw: { correct: 18, total: 20, avgTimeMs: 12000 },
      workingMemorySpan: { maxNLevel: 3, corsiSpan: 7, accuracy: 0.92 },
      processingSpeed: { avgReactionMs: 220, stroopInterferenceMs: 35, errorRate: 0.02 },
      motorCoordination: { tapsPer10s: 65, goNoGoAccuracy: 0.96, motorJitterMs: 12 },
      analyticalFlexibility: { ruleSwitchesSuccess: 14, totalRuleTrials: 15 },
      verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
      quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
    };

    const profile = computeCognitiveProfile(rawData);
    expect(profile.overallIQProxy.standardScore).toBeGreaterThan(115);
    expect(profile.workingMemory.percentile).toBeGreaterThan(70);
    expect(profile.processingSpeed.stanine).toBeGreaterThanOrEqual(6);
    expect(profile.recommendedDailyWorkout.length).toBeGreaterThan(0);
    expect(profile.strengths.length).toBeGreaterThan(0);
  });

  // ─────── P0 defensive battery (added 2026-09-02) ───────

  describe('zScoreToPercentile — boundary conditions', () => {
    it('z=0 → ~50th percentile', () => {
      const p = zScoreToPercentile(0);
      expect(p).toBeGreaterThan(49.5);
      expect(p).toBeLessThan(50.5);
    });
    it('z=1 → ~84th percentile (one SD above mean)', () => {
      const p = zScoreToPercentile(1);
      expect(p).toBeGreaterThan(84);
      expect(p).toBeLessThan(85);
    });
    it('z=2 → ~98th percentile', () => {
      const p = zScoreToPercentile(2);
      expect(p).toBeGreaterThan(97.5);
    });
    it('z=-2 → ~2nd percentile', () => {
      const p = zScoreToPercentile(-2);
      expect(p).toBeLessThan(2.5);
    });
    it('z=3 → ~99.9th percentile (gifted range)', () => {
      const p = zScoreToPercentile(3);
      expect(p).toBeGreaterThan(99.5);
    });
    it('monotonicity: z=-3 < z=-2 < z=-1 < z=0 < z=1 < z=2', () => {
      const zs = [-3, -2, -1, 0, 1, 2, 3];
      const ps = zs.map(z => zScoreToPercentile(z));
      for (let i = 1; i < ps.length; i++) {
        expect(ps[i]).toBeGreaterThan(ps[i - 1]);
      }
    });
  });

  describe('getLevelDescription — Wechsler thresholds', () => {
    const cases: Array<[number, ReturnType<typeof getLevelDescription>]> = [
      [145, 'Superior'],
      [130, 'Superior'],
      [125, 'Alto'],
      [120, 'Alto'],
      [115, 'Promedio Alto'],
      [110, 'Promedio Alto'],
      [100, 'Promedio'],
      [90, 'Promedio'],
      [85, 'Promedio Bajo'],
      [80, 'Promedio Bajo'],
      [75, 'En Desarrollo'],
      [70, 'En Desarrollo']
    ];
    it.each(cases)('standard %i → %s', (score, expected) => {
      expect(getLevelDescription(score)).toBe(expected);
    });
  });

  describe('computeCognitiveProfile — canonical golden vectors', () => {
    it('average adult produces IQ proxy in 85-115 range', () => {
      const raw: RawCognitiveScores = {
        fluidReasoningRaw: { correct: 7, total: 10, avgTimeMs: 8000 },
        workingMemorySpan: { maxNLevel: 3, corsiSpan: 6, accuracy: 0.85 },
        processingSpeed: { avgReactionMs: 280, stroopInterferenceMs: 50, errorRate: 0.05 },
        motorCoordination: { tapsPer10s: 55, goNoGoAccuracy: 0.88, motorJitterMs: 30 },
        analyticalFlexibility: { ruleSwitchesSuccess: 8, totalRuleTrials: 12 },
        verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
        quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
      };
      const profile = computeCognitiveProfile(raw);
      expect(profile.overallIQProxy.standardScore).toBeGreaterThan(85);
      expect(profile.overallIQProxy.standardScore).toBeLessThan(115);
      expect(profile.overallIQProxy.levelDescription).toBeDefined();
      expect(profile.overallIQProxy.percentile).toBeGreaterThan(0);
      expect(profile.overallIQProxy.stanine).toBeGreaterThanOrEqual(1);
      expect(profile.overallIQProxy.stanine).toBeLessThanOrEqual(9);
      expect(profile.strengths.length + profile.growthAreas.length).toBeGreaterThan(0);
    });

    it('returns strengths for top domain and growth areas for bottom', () => {
      const raw: RawCognitiveScores = {
        // top: fluid reasoning near-perfect
        fluidReasoningRaw: { correct: 10, total: 10, avgTimeMs: 4000 },
        // bottom: working memory very poor
        workingMemorySpan: { maxNLevel: 1, corsiSpan: 3, accuracy: 0.5 },
        processingSpeed: { avgReactionMs: 280, stroopInterferenceMs: 50, errorRate: 0.05 },
        motorCoordination: { tapsPer10s: 55, goNoGoAccuracy: 0.88, motorJitterMs: 30 },
        analyticalFlexibility: { ruleSwitchesSuccess: 8, totalRuleTrials: 12 },
        verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
        quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
      };
      const profile = computeCognitiveProfile(raw);
      expect(profile.strengths.length).toBeGreaterThan(0);
      expect(profile.growthAreas.length).toBeGreaterThan(0);
    });

    it('extreme low produces IQ proxy in "En Desarrollo" range', () => {
      const raw: RawCognitiveScores = {
        fluidReasoningRaw: { correct: 1, total: 10, avgTimeMs: 30000 },
        workingMemorySpan: { maxNLevel: 1, corsiSpan: 3, accuracy: 0.3 },
        processingSpeed: { avgReactionMs: 600, stroopInterferenceMs: 200, errorRate: 0.4 },
        motorCoordination: { tapsPer10s: 20, goNoGoAccuracy: 0.5, motorJitterMs: 100 },
        analyticalFlexibility: { ruleSwitchesSuccess: 2, totalRuleTrials: 15 },
        verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
        quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
      };
      const profile = computeCognitiveProfile(raw);
      expect(profile.overallIQProxy.standardScore).toBeLessThan(85);
      expect(['En Desarrollo', 'Promedio Bajo']).toContain(profile.overallIQProxy.levelDescription);
    });

    it('extreme high produces IQ proxy in "Superior" or "Alto" range', () => {
      const raw: RawCognitiveScores = {
        fluidReasoningRaw: { correct: 10, total: 10, avgTimeMs: 3000 },
        workingMemorySpan: { maxNLevel: 4, corsiSpan: 9, accuracy: 1.0 },
        processingSpeed: { avgReactionMs: 180, stroopInterferenceMs: 10, errorRate: 0.0 },
        motorCoordination: { tapsPer10s: 75, goNoGoAccuracy: 0.99, motorJitterMs: 5 },
        analyticalFlexibility: { ruleSwitchesSuccess: 15, totalRuleTrials: 15 },
        verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
        quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
      };
      const profile = computeCognitiveProfile(raw);
      expect(profile.overallIQProxy.standardScore).toBeGreaterThan(120);
      expect(['Superior', 'Alto']).toContain(profile.overallIQProxy.levelDescription);
    });

    it('recommendedDailyWorkout has 1+ items, each with domain+exercise+duration', () => {
      const raw: RawCognitiveScores = {
        fluidReasoningRaw: { correct: 7, total: 10, avgTimeMs: 8000 },
        workingMemorySpan: { maxNLevel: 3, corsiSpan: 6, accuracy: 0.85 },
        processingSpeed: { avgReactionMs: 280, stroopInterferenceMs: 50, errorRate: 0.05 },
        motorCoordination: { tapsPer10s: 55, goNoGoAccuracy: 0.88, motorJitterMs: 30 },
        analyticalFlexibility: { ruleSwitchesSuccess: 8, totalRuleTrials: 12 },
        verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
        quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
      };
      const profile = computeCognitiveProfile(raw);
      expect(profile.recommendedDailyWorkout.length).toBeGreaterThan(0);
      for (const w of profile.recommendedDailyWorkout) {
        expect(w.domain).toBeTruthy();
        expect(w.focusExercise).toBeTruthy();
        expect(w.targetDurationMinutes).toBeGreaterThan(0);
      }
    });
  });

  describe('computeCognitiveProfile — timestamp + invariants', () => {
    it('timestamp is a recent epoch ms', () => {
      const raw: RawCognitiveScores = {
        fluidReasoningRaw: { correct: 7, total: 10, avgTimeMs: 8000 },
        workingMemorySpan: { maxNLevel: 3, corsiSpan: 6, accuracy: 0.85 },
        processingSpeed: { avgReactionMs: 280, stroopInterferenceMs: 50, errorRate: 0.05 },
        motorCoordination: { tapsPer10s: 55, goNoGoAccuracy: 0.88, motorJitterMs: 30 },
        analyticalFlexibility: { ruleSwitchesSuccess: 8, totalRuleTrials: 12 },
        verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
        quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
      };
      const before = Date.now();
      const profile = computeCognitiveProfile(raw);
      const after = Date.now();
      expect(profile.timestamp).toBeGreaterThanOrEqual(before);
      expect(profile.timestamp).toBeLessThanOrEqual(after);
    });

    it('all domains produce a CognitiveDomainResult (no undefined fields)', () => {
      const raw: RawCognitiveScores = {
        fluidReasoningRaw: { correct: 7, total: 10, avgTimeMs: 8000 },
        workingMemorySpan: { maxNLevel: 3, corsiSpan: 6, accuracy: 0.85 },
        processingSpeed: { avgReactionMs: 280, stroopInterferenceMs: 50, errorRate: 0.05 },
        motorCoordination: { tapsPer10s: 55, goNoGoAccuracy: 0.88, motorJitterMs: 30 },
        analyticalFlexibility: { ruleSwitchesSuccess: 8, totalRuleTrials: 12 },
        verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
        quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
      };
      const profile = computeCognitiveProfile(raw);
      const domains = [
        profile.overallIQProxy,
        profile.workingMemory,
        profile.processingSpeed,
        profile.motorAgility,
        profile.analyticalFlexibility,
        profile.verbalComprehension
      ];
      for (const d of domains) {
        expect(d).toBeDefined();
        expect(typeof d.rawScore).toBe('number');
        expect(typeof d.standardScore).toBe('number');
        expect(typeof d.percentile).toBe('number');
        expect(typeof d.stanine).toBe('number');
        expect(d.levelDescription).toBeDefined();
        expect(d.clinicalSummary).toBeTruthy();
      }
    });
  });
});