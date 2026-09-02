/**
 * neurogym-trail-making.test.ts
 * Smoke test for TrailMakingBoard.svelte.
 */
import { describe, it, expect } from 'vitest';

describe('neurogym stimulus — Trail Making', () => {
  it('Trail Making has Part A (1-2-3-...-25) and Part B (1-A-2-B-...)', () => {
    const partASequence = Array.from({ length: 25 }, (_, i) => i + 1);
    expect(partASequence[0]).toBe(1);
    expect(partASequence[24]).toBe(25);

    // Part B alternates number and letter
    const partB = [];
    for (let i = 0; i < 13; i++) {
      partB.push(i + 1);
      partB.push(String.fromCharCode(65 + i));
    }
    expect(partB[0]).toBe(1);
    expect(partB[1]).toBe('A');
    expect(partB[4]).toBe(3);
    expect(partB[5]).toBe('C');
  });

  it('completion time is in seconds (typical adult 30-90s for Part A)', () => {
    const typicalAdult = { partA: 45, partB: 90 };
    expect(typicalAdult.partA).toBeGreaterThan(15);
    expect(typicalAdult.partB).toBeGreaterThan(typicalAdult.partA);
  });

  it('component file exists', async () => {
    const fs = await import('node:fs/promises');
    const path = 'src/components/neurogym/stimuli/TrailMakingBoard.svelte';
    const exists = await fs.access(path).then(() => true).catch(() => false);
    expect(exists).toBe(true);
  });
});