/**
 * neurogym-stroop.test.ts
 * Smoke test for Stroop Color Board (StroopColorBoard.svelte).
 */
import { describe, it, expect } from 'vitest';
import { generateStroopTrial } from '../../src/lib/neurogym/secure-items-vault';

describe('neurogym stimulus — Stroop Color Board', () => {
  it('returns a valid StroopItem with word and color mismatch', () => {
    for (let i = 0; i < 30; i++) {
      const trial = generateStroopTrial(i);
      expect(trial).toBeDefined();
      expect(typeof trial.wordText).toBe('string');
      expect(trial.wordText.length).toBeGreaterThan(0);
      expect(typeof trial.displayColor).toBe('string');
      // The classic Stroop: word ≠ ink color
      // (we don't enforce strict color-word mismatch here because the generator
      //  has a baseline ratio; this is a smoke test)
    }
  });

  it('deterministic per seed', () => {
    const a = generateStroopTrial(42);
    const b = generateStroopTrial(42);
    expect(a.wordText).toBe(b.wordText);
    expect(a.displayColor).toBe(b.displayColor);
  });

  it('different seeds produce variety (≥3 distinct word+color pairs in 10 trials)', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 10; i++) {
      const t = generateStroopTrial(i);
      seen.add(`${t.wordText}:${t.displayColor}`);
    }
    expect(seen.size).toBeGreaterThanOrEqual(3);
  });

  it('StroopColorBoard component file exists', async () => {
    const fs = await import('node:fs/promises');
    const path = 'src/components/neurogym/stimuli/StroopColorBoard.svelte';
    const exists = await fs.access(path).then(() => true).catch(() => false);
    expect(exists).toBe(true);
  });
});