import { describe, it, expect } from 'vitest';
import {
  calculateNewMMR,
  getExpectedScore,
  difficultyToRating,
  getGradeMultiplier,
  estimateIcfesScore,
  getSimulatedIcfesScore,
  getRankTitle,
} from './mmr-system';

describe('MMR System', () => {
  describe('difficultyToRating', () => {
    it('should convert difficulty 1-5 to rating 150-350', () => {
      expect(difficultyToRating(1)).toBe(150);
      expect(difficultyToRating(3)).toBe(250);
      expect(difficultyToRating(5)).toBe(350);
    });
  });

  describe('getExpectedScore', () => {
    it('should return 0.5 for equal ratings', () => {
      expect(getExpectedScore(250, 250)).toBe(0.5);
    });

    it('should return > 0.5 if player is stronger', () => {
      expect(getExpectedScore(300, 250)).toBeGreaterThan(0.5);
    });

    it('should return < 0.5 if player is weaker', () => {
      expect(getExpectedScore(200, 250)).toBeLessThan(0.5);
    });
  });

  describe('getGradeMultiplier', () => {
    it('should return 1.0+ for same grade or higher', () => {
      expect(getGradeMultiplier(11, 11)).toBe(1.0);
      expect(getGradeMultiplier(11, 9)).toBe(0.85);
    });

    it('should return bonus for answering higher grade questions', () => {
      expect(getGradeMultiplier(9, 11)).toBeGreaterThan(1.0);
      expect(getGradeMultiplier(9, 12)).toBe(1.2);
    });
  });

  describe('calculateNewMMR', () => {
    it('should increase MMR on win against equal opponent', () => {
      const result = calculateNewMMR(250, 3, true); // Diff 3 is 250 rating
      expect(result.newRating).toBeGreaterThan(250);
      expect(result.delta).toBeGreaterThan(0);
    });

    it('should decrease MMR on loss against equal opponent', () => {
      const result = calculateNewMMR(250, 3, false);
      expect(result.newRating).toBeLessThan(250);
      expect(result.delta).toBeLessThan(0);
    });

    it('should increase more for winning against harder question', () => {
      const winEasy = calculateNewMMR(250, 1, true).delta;
      const winHard = calculateNewMMR(250, 5, true).delta;
      expect(winHard).toBeGreaterThan(winEasy);
    });
  });

  describe('estimateIcfesScore', () => {
    it('should stay conservative with low evidence', () => {
      const estimate = estimateIcfesScore({
        mmr: 300,
        accuracy: 0.9,
        evidenceCount: 10,
        averageDifficulty: 4.5,
        consistencyScore: 85,
        subjectCoverage: 1
      });

      // evidence factor for 10 q is low (~0.62)
      // 300 * 0.62 * 0.9 (coverage) = ~167
      expect(estimate.score).toBeLessThan(300);
      expect(estimate.confidence).toBe('low');
    });

    it('should scale up with broad evidence', () => {
      const estimate = estimateIcfesScore({
        mmr: 450,
        accuracy: 0.82,
        evidenceCount: 120,
        averageDifficulty: 3.8,
        consistencyScore: 82,
        subjectCoverage: 4
      });

      expect(estimate.score).toBeGreaterThan(400);
      expect(estimate.confidence).toBe('high');
    });
  });

  describe('getRankTitle', () => {
    it('should return correct titles', () => {
      expect(getRankTitle(100)).toBe('Iniciado');
      expect(getRankTitle(250)).toBe('Estudiante');
      expect(getRankTitle(200)).toBe('Aprendiz');
      expect(getRankTitle(350)).toBe('Experto');
      expect(getRankTitle(420)).toBe('Maestro');
      expect(getRankTitle(480)).toBe('Gran Maestro');
    });
  });
});
