import { describe, it, expect } from 'vitest';
import { getPackId, getNextRotationDate, seededRandom, seededShuffle, ROTATION_DAYS } from './rotation-logic';

describe('Rotation Logic', () => {
  describe('getPackId', () => {
    it('should generate correct pack ID for start of year', () => {
      const date = new Date(2024, 0, 1); // Jan 1st
      expect(getPackId(date)).toBe('W0');
    });

    it('should increment period after ROTATION_DAYS', () => {
      const date = new Date(2024, 0, 1 + ROTATION_DAYS); // Jan 6th (if rotation is 5)
      expect(getPackId(date)).toBe('W1');
    });
  });

  describe('getNextRotationDate', () => {
    it('should return a future date', () => {
      const now = new Date();
      const next = new Date(getNextRotationDate(now));
      expect(next.getTime()).toBeGreaterThan(now.getTime());
    });
  });

  describe('seededRandom', () => {
    it('should be deterministic', () => {
      const seed = 'test-seed';
      expect(seededRandom(seed)).toBe(seededRandom(seed));
    });

    it('should return value between 0 and 1', () => {
      const val = seededRandom('abc');
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(1);
    });
  });

  describe('seededShuffle', () => {
    it('should shuffle deterministically', () => {
      const array = [1, 2, 3, 4, 5];
      const seed = 'shuffle-seed';
      const shuffled1 = seededShuffle(array, seed);
      const shuffled2 = seededShuffle(array, seed);

      expect(shuffled1).toEqual(shuffled2);
      expect(shuffled1).not.toEqual(array); // Likely not equal, though possible for small arrays
      expect(shuffled1).toHaveLength(array.length);
      expect(shuffled1.sort()).toEqual(array.sort()); // Contains same elements
    });
  });
});
