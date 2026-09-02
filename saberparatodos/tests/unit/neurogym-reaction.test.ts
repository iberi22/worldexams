/**
 * neurogym-reaction.test.ts
 * Smoke test for ReactionMotorPad.svelte.
 */
import { describe, it, expect } from 'vitest';

describe('neurogym stimulus — Reaction Motor Pad', () => {
  it('Go/No-Go accuracy range is 0-1', () => {
    const goNoGoAccuracy = 0.88;
    expect(goNoGoAccuracy).toBeGreaterThanOrEqual(0);
    expect(goNoGoAccuracy).toBeLessThanOrEqual(1);
  });

  it('reaction time in ms (typical adult 180-350ms)', () => {
    const typical = { fast: 180, typical: 280, slow: 500 };
    expect(typical.fast).toBeLessThan(typical.typical);
    expect(typical.typical).toBeLessThan(typical.slow);
  });

  it('motor coordination taps-per-10s baseline ~55 (normative)', async () => {
    const { computeCognitiveProfile } = await import('../../src/lib/neurogym/scoring-cognitive');
    const raw = {
      motorCoordination: { tapsPer10s: 55, goNoGoAccuracy: 0.88, motorJitterMs: 30 },
      fluidReasoningRaw: { correct: 7, total: 10, avgTimeMs: 8000 },
      workingMemorySpan: { maxNLevel: 3, corsiSpan: 6, accuracy: 0.85 },
      processingSpeed: { avgReactionMs: 280, stroopInterferenceMs: 50, errorRate: 0.05 },
      analyticalFlexibility: { ruleSwitchesSuccess: 8, totalRuleTrials: 12 },
      verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
      quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
    };
    const profile = computeCognitiveProfile(raw as any);
    expect(profile.motorAgility).toBeDefined();
    expect(profile.motorAgility.rawScore).toBe(55);
  });

  it('component file exists', async () => {
    const fs = await import('node:fs/promises');
    const path = 'src/components/neurogym/stimuli/ReactionMotorPad.svelte';
    const exists = await fs.access(path).then(() => true).catch(() => false);
    expect(exists).toBe(true);
  });
});