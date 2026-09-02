/**
 * neurogym-raven.test.ts
 * Smoke test for RavenMatrixCanvas.svelte — uses generateRavenMatrix.
 */
import { describe, it, expect } from 'vitest';
import { generateRavenMatrix } from '../../src/lib/neurogym/secure-items-vault';

describe('neurogym stimulus — Raven Progressive Matrices', () => {
  it('returns a valid Raven matrix with 3x3 grid', () => {
    for (const diff of [1, 2, 3, 4, 5] as const) {
      const item = generateRavenMatrix(42, diff);
      expect(item.cells).toHaveLength(3);
      for (const row of item.cells) {
        expect(row).toHaveLength(3);
      }
    }
  });

  it('contains exactly one "?" cell (the missing piece)', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const item = generateRavenMatrix(seed, 3);
      const questionMarks = item.cells.flat().filter(c => c === '?').length;
      expect(questionMarks).toBe(1);
    }
  });

  it('provides 2-8 options for the answer', () => {
    for (let seed = 1; seed <= 10; seed++) {
      const item = generateRavenMatrix(seed, 3);
      expect(item.options.length).toBeGreaterThanOrEqual(2);
      expect(item.options.length).toBeLessThanOrEqual(8);
    }
  });

  it('component file exists', async () => {
    const fs = await import('node:fs/promises');
    const path = 'src/components/neurogym/stimuli/RavenMatrixCanvas.svelte';
    const exists = await fs.access(path).then(() => true).catch(() => false);
    expect(exists).toBe(true);
  });
});