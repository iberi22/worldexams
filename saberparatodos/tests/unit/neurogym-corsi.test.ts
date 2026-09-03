/**
 * neurogym-corsi.test.ts
 * Smoke test for Corsi Block-Tapping stimulus (CorsiBlockBoard.svelte).
 * Tests the underlying generator + the item shape consumed by the component.
 */
import { describe, it, expect } from 'vitest';
import { generateCorsiSequence } from '../../src/lib/neurogym/secure-items-vault';

describe('neurogym stimulus — Corsi Block-Tapping', () => {
  it('generator returns a sequence with the requested span length and delayMs', () => {
    for (const span of [3, 4, 5, 6, 7]) {
      const seq = generateCorsiSequence(span, 42);
      expect(seq.blockSequence).toHaveLength(span);
      expect(seq.delayMs).toBe(800);
    }
  });

  it('block indices are in 0..8 (9-block spatial grid)', () => {
    for (let i = 0; i < 50; i++) {
      const seq = generateCorsiSequence(5, i);
      for (const idx of seq.blockSequence) {
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThan(9);
      }
    }
  });

  it('deterministic: same seed produces same sequence', () => {
    const a = generateCorsiSequence(5, 12345);
    const b = generateCorsiSequence(5, 12345);
    expect(a.blockSequence).toEqual(b.blockSequence);
  });

  it('different seeds produce different sequences (mostly)', () => {
    const a = generateCorsiSequence(6, 1);
    const b = generateCorsiSequence(6, 999);
    // Highly unlikely to be identical for span=6
    expect(a.blockSequence).not.toEqual(b.blockSequence);
  });

  it('CorsiBlockBoard component exists and contains required features', async () => {
    const fs = await import('node:fs/promises');
    const path = 'src/components/neurogym/stimuli/CorsiBlockBoard.svelte';
    const content = await fs.readFile(path, 'utf-8');

    expect(content).toContain('CorsiBlockBoard');
    expect(content).toContain('$props()');
    expect(content).toContain('$state');
    expect(content).toContain('$derived');
    expect(content).toContain('$effect');
    expect(content).toContain('delayMs');
    expect(content).toContain('neuroAudio');
    expect(content).toContain('is3D');
  });
});
