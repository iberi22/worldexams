import { describe, it, expect } from 'vitest';
import {
  generateRavenMatrix,
  generateStroopTrial,
  generateCorsiSequence
} from './secure-items-vault';

describe('NeuroGym Secure Items Vault & Procedural Stimuli', () => {
  it('generates a valid 3x3 Raven matrix with 1 question mark and 4 options', () => {
    const matrix = generateRavenMatrix(10, 3);
    expect(matrix.gridSize).toBe(3);
    expect(matrix.cells.length).toBe(3);
    expect(matrix.cells[0].length).toBe(3);
    expect(matrix.cells[2][2]).toBe('?');
    expect(matrix.options.length).toBe(4);
    
    // Exactamente 1 opción debe ser la correcta
    const correctOpts = matrix.options.filter(o => o.isCorrect);
    expect(correctOpts.length).toBe(1);
    expect(correctOpts[0].svgContent).toContain('<g transform=');
  });

  it('generates congruent and incongruent Stroop color items', () => {
    const trial1 = generateStroopTrial(3); // (3 % 3 === 0) => congruent
    expect(trial1.isCongruent).toBe(true);

    const trial2 = generateStroopTrial(4); // incongruent
    expect(trial2.isCongruent).toBe(false);
    expect(trial2.wordText).toBeDefined();
    expect(trial2.displayColor).toBeDefined();
    expect(trial2.correctColorKey).toBeDefined();
  });

  it('generates Corsi spatial block sequences with no immediate repeated indices', () => {
    const corsi = generateCorsiSequence(6, 42);
    expect(corsi.spanLength).toBe(6);
    expect(corsi.blockSequence.length).toBe(6);

    for (let i = 0; i < corsi.blockSequence.length; i++) {
      const idx = corsi.blockSequence[i];
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(9);
      if (i > 0) {
        expect(idx).not.toBe(corsi.blockSequence[i - 1]);
      }
    }
  });
});
