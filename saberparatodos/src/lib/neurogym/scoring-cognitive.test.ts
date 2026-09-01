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
      analyticalFlexibility: { ruleSwitchesSuccess: 14, totalRuleTrials: 15 }
    };

    const profile = computeCognitiveProfile(rawData);
    expect(profile.overallIQProxy.standardScore).toBeGreaterThan(115);
    expect(profile.workingMemory.percentile).toBeGreaterThan(70);
    expect(profile.processingSpeed.stanine).toBeGreaterThanOrEqual(6);
    expect(profile.recommendedDailyWorkout.length).toBeGreaterThan(0);
    expect(profile.strengths.length).toBeGreaterThan(0);
  });
});
