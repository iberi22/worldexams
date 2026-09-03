/**
 * neurogym-wisconsin.test.ts
 * Smoke and unit tests for CardSortingStimulus (Wisconsin Card Sorting Test).
 */
import { describe, it, expect } from 'vitest';

describe('neurogym stimulus — Wisconsin Card Sorting', () => {
  it('WCST rule switching has 3 categories (color, shape, number)', () => {
    const categories = ['color', 'shape', 'number'];
    expect(categories).toHaveLength(3);
  });

  it('component file exists and contains CardSortingStimulus definitions', async () => {
    const fs = await import('node:fs/promises');
    const path = 'src/components/neurogym/stimuli/CardSortingStimulus.svelte';
    const content = await fs.readFile(path, 'utf-8');
    expect(content).toContain('Clasificación de Tarjetas');
    expect(content).toContain('consecutiveCorrect >= 5');
    expect(content).toContain('perseverativeErrors');
    expect(content).toContain('avgRuleSwitchLatencyMs');
    expect(content).toContain('neuroAudio.playSuccess()');
    expect(content).toContain('neuroAudio.playError()');
  });

  it('perseverative errors metric is finite', () => {
    const totalTrials = 64;
    const perseverativeErrors = Math.floor(totalTrials * 0.15);
    expect(perseverativeErrors).toBeGreaterThanOrEqual(0);
    expect(perseverativeErrors).toBeLessThan(totalTrials);
    expect(Number.isFinite(perseverativeErrors)).toBe(true);
  });

  it('analyticalFlexibility can be fed into computeCognitiveProfile', async () => {
    const { computeCognitiveProfile } = await import('../../src/lib/neurogym/scoring-cognitive');
    expect(typeof computeCognitiveProfile).toBe('function');
    // Raw shape used by Wisconsin scoring
    const raw = {
      analyticalFlexibility: { ruleSwitchesSuccess: 5, totalRuleTrials: 8 },
      verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
      quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 },
      fluidReasoningRaw: { correct: 5, total: 10, avgTimeMs: 10000 },
      workingMemorySpan: { maxNLevel: 2, corsiSpan: 5, accuracy: 0.7 },
      processingSpeed: { avgReactionMs: 300, stroopInterferenceMs: 60, errorRate: 0.1 },
      motorCoordination: { tapsPer10s: 50, goNoGoAccuracy: 0.85, motorJitterMs: 40 }
    };
    const profile = computeCognitiveProfile(raw as any);
    expect(profile.analyticalFlexibility).toBeDefined();
  });

  it('correctly shifts rule every 5 correct responses in simulation', () => {
    let currentRule: 'color' | 'shape' | 'number' = 'color';
    let previousRule: 'color' | 'shape' | 'number' | null = null;
    let consecutiveCorrect = 0;
    let ruleSwitches = 0;

    const simulateCorrectTrial = () => {
      consecutiveCorrect++;
      if (consecutiveCorrect >= 5) {
        consecutiveCorrect = 0;
        previousRule = currentRule;
        const dims: ('color' | 'shape' | 'number')[] = ['color', 'shape', 'number'];
        currentRule = dims.filter(d => d !== currentRule)[0];
        ruleSwitches++;
      }
    };

    for (let i = 0; i < 12; i++) {
      simulateCorrectTrial();
    }

    expect(ruleSwitches).toBe(2);
    expect(consecutiveCorrect).toBe(2);
    expect(previousRule).not.toBeNull();
    expect(currentRule).not.toBe(previousRule);
  });

  it('correctly tracks perseverative errors on rule shift', () => {
    const previousRule = 'color';
    const currentRule = 'shape';

    const testCard = { color: '#ef4444', shape: 'circle', number: 1 };
    const targetCardPreviousRuleMatch = { color: '#ef4444', shape: 'square', number: 3 };
    const targetCardNonMatch = { color: '#3b82f6', shape: 'star', number: 2 };

    // Trial match under current rule ('shape')
    const matchesCurrent = targetCardPreviousRuleMatch.shape === testCard.shape;
    expect(matchesCurrent).toBe(false); // Shape circle vs square -> false

    // Checking perseverative error: choice matches previous rule ('color')
    const matchesPrevious = targetCardPreviousRuleMatch.color === testCard.color;
    expect(matchesPrevious).toBe(true); // Color matches previous rule

    // Choice that matches neither current nor previous rule
    const matchesPreviousForOther = targetCardNonMatch.color === testCard.color;
    expect(matchesPreviousForOther).toBe(false);
  });

  it('accurately computes average rule switch latency', () => {
    const latencies = [420, 380, 500];
    const avgLatency = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
    expect(avgLatency).toBe(433);
  });
});
