import { describe, it, expect } from 'vitest';
import {
  calculateNewMMR,
  getExpectedScore,
  difficultyToRating,
  getGradeMultiplier,
  getSimulatedIcfesScore,
  getRankTitle,
} from './mmr-system';

describe('MMR System', () => {
  describe('difficultyToRating', () => {
    it('should convert difficulty 1-5 to rating 600-1400', () => {
      expect(difficultyToRating(1)).toBe(600);
      expect(difficultyToRating(3)).toBe(1000);
      expect(difficultyToRating(5)).toBe(1400);
    });
  });

  describe('getExpectedScore', () => {
    it('should return 0.5 for equal ratings', () => {
      expect(getExpectedScore(1000, 1000)).toBe(0.5);
    });

    it('should return > 0.5 if player is stronger', () => {
      expect(getExpectedScore(1200, 1000)).toBeGreaterThan(0.5);
    });

    it('should return < 0.5 if player is weaker', () => {
      expect(getExpectedScore(800, 1000)).toBeLessThan(0.5);
    });
  });

  describe('getGradeMultiplier', () => {
    it('should return 1.0+ for same grade or higher', () => {
      expect(getGradeMultiplier(11, 11)).toBe(1.0);
      // User 11 answering Grade 9 (easier) -> 0.85
      expect(getGradeMultiplier(11, 9)).toBe(0.85);
    });

    // Logic check from source:
    // gradeDiff = userGrade - questionGrade
    // if gradeDiff <= 0 (User 9 answering 11): bonus
    // if gradeDiff <= 2 (User 11 answering 9): 0.85

    it('should return bonus for answering higher grade questions', () => {
      // User grade 9, Question grade 11. Diff = -2.
      expect(getGradeMultiplier(9, 11)).toBeGreaterThan(1.0);
      // Cap check: User 9, Question 12. Diff = -3. Should be capped at 1.2
      expect(getGradeMultiplier(9, 12)).toBe(1.2);
    });

    it('should return penalty for answering lower grade questions', () => {
      // User grade 11, Question grade 9. Diff = 2.
      expect(getGradeMultiplier(11, 9)).toBe(0.85);
    });
  });

  describe('calculateNewMMR', () => {
    it('should increase MMR on win against equal opponent', () => {
      const result = calculateNewMMR(1000, 3, true); // Diff 3 is 1000 rating
      expect(result.newRating).toBeGreaterThan(1000);
      expect(result.delta).toBeGreaterThan(0);
    });

    it('should decrease MMR on loss against equal opponent', () => {
      const result = calculateNewMMR(1000, 3, false);
      expect(result.newRating).toBeLessThan(1000);
      expect(result.delta).toBeLessThan(0);
    });

    it('should increase more for winning against harder question', () => {
      const winEasy = calculateNewMMR(1000, 1, true).delta;
      const winHard = calculateNewMMR(1000, 5, true).delta;
      expect(winHard).toBeGreaterThan(winEasy);
    });
  });

  describe('getSimulatedIcfesScore', () => {
    it('should map 1000 MMR to 250 ICFES', () => {
      expect(getSimulatedIcfesScore(1000)).toBe(250);
    });

    it('should cap at 500', () => {
      expect(getSimulatedIcfesScore(3000)).toBe(500);
    });
  });

  describe('getRankTitle', () => {
    it('should return correct titles', () => {
      expect(getRankTitle(500)).toBe('Iniciado');
      expect(getRankTitle(1000)).toBe('Avanzado');
      expect(getRankTitle(900)).toBe('Estudiante');
      expect(getRankTitle(700)).toBe('Aprendiz');
      expect(getRankTitle(1500)).toBe('Maestro');
      expect(getRankTitle(2000)).toBe('Gran Maestro');
    });
  });
});
