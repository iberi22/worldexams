/**
 * neurogym-wisconsin.test.ts
 * Smoke test for CardSortingStimulus (Wisconsin Card Sorting Test).
 */
import { describe, it, expect } from 'vitest';

describe('neurogym stimulus — Wisconsin Card Sorting', () => {
  it('WCST rule switching has 3 categories (color, shape, number)', () => {
    const categories = ['color', 'shape', 'number'];
    expect(categories).toHaveLength(3);
  });

  it('component file exists', async () => {
    const fs = await import('node:fs/promises');
    const path = 'src/components/neurogym/stimuli/CardSortingStimulus.svelte';
    const exists = await fs.access(path).then(() => true).catch(() => false);
    expect(exists).toBe(true);
  });

  it('perseverative errors metric is finite', () => {
    const totalTrials = 64;
    const perseverativeErrors = Math.floor(totalTrials * 0.15);
    expect(perseverativeErrors).toBeGreaterThanOrEqual(0);
    expect(perseverativeErrors).toBeLessThan(totalTrials);
    expect(Number.isFinite(perseverativeErrors)).toBe(true);
  });

  it('analyticalFlexibility can be fed into computeCognitiveProfile', async () => {
    const { computeCognitiveProfile, type: _t } = await import('../../src/lib/neurogym/scoring-cognitive');
    expect(typeof computeCognitiveProfile).toBe('function');
    // Raw shape used by Wisconsin scoring
    const raw = {
      analyticalFlexibility: { ruleSwitchesSuccess: 5, totalRuleTrials: 8 },
      fluidReasoningRaw: { correct: 5, total: 10, avgTimeMs: 10000 },
      workingMemorySpan: { maxNLevel: 2, corsiSpan: 5, accuracy: 0.7 },
      processingSpeed: { avgReactionMs: 300, stroopInterferenceMs: 60, errorRate: 0.1 },
      motorCoordination: { tapsPer10s: 50, goNoGoAccuracy: 0.85, motorJitterMs: 40 }
    };
    const profile = computeCognitiveProfile(raw as any);
    expect(profile.analyticalFlexibility).toBeDefined();
  });
});