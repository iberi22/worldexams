import { describe, it, expect } from 'vitest';
import {
  calculateQuestionScore,
  calculateExamScore,
  calculateExamScoreRange,
  validateExamResult,
  formatScore,
  formatAccuracy,
  formatTime,
  getDifficultyName,
  getDifficultyColor,
  getDifficultyMultiplier,
  getTimeBonus,
  getStreakMultiplier,
  type QuestionResult,
  type ExamResult
} from './scoring';

describe('Scoring System', () => {
  describe('getDifficultyMultiplier', () => {
    it('should return correct multipliers for each difficulty', () => {
      expect(getDifficultyMultiplier(1)).toBe(0.8);
      expect(getDifficultyMultiplier(2)).toBe(1.0);
      expect(getDifficultyMultiplier(3)).toBe(1.2);
      expect(getDifficultyMultiplier(4)).toBe(1.4);
      expect(getDifficultyMultiplier(5)).toBe(1.6);
    });

    it('should clamp difficulty between 1 and 5', () => {
      expect(getDifficultyMultiplier(0)).toBe(0.8);
      expect(getDifficultyMultiplier(6)).toBe(1.6);
    });
  });

  describe('getTimeBonus', () => {
    it('should return max bonus for 0 seconds', () => {
      expect(getTimeBonus(0)).toBe(1.5);
    });

    it('should return 1.0 for time >= decaySeconds', () => {
      expect(getTimeBonus(120)).toBe(1.0);
      expect(getTimeBonus(150)).toBe(1.0);
    });

    it('should decay linearly', () => {
      expect(getTimeBonus(60)).toBeCloseTo(1.25);
    });
  });

  describe('getStreakMultiplier', () => {
    it('should start at 1.0 for 0 streak', () => {
      expect(getStreakMultiplier(0)).toBe(1.0);
    });

    it('should increment by 0.1 per streak', () => {
      expect(getStreakMultiplier(1)).toBe(1.1);
      expect(getStreakMultiplier(5)).toBe(1.5);
    });

    it('should cap at maxMultiplier (2.0)', () => {
      expect(getStreakMultiplier(10)).toBe(2.0);
      expect(getStreakMultiplier(20)).toBe(2.0);
    });
  });

  describe('calculateQuestionScore', () => {
    it('should calculate correct score for a standard correct answer', () => {
      const result: QuestionResult = {
        questionId: 'q1',
        difficulty: 3, // 1.2x
        isCorrect: true,
        timeSeconds: 60, // 1.25x bonus
        currentStreak: 0 // 1.0x
      };

      const score = calculateQuestionScore(result);
      expect(score.totalScore).toBe(150);
      expect(score.baseScore).toBe(100);
    });

    it('should apply penalty for incorrect answer', () => {
      const result: QuestionResult = {
        questionId: 'q1',
        difficulty: 3, // 1.2x
        isCorrect: false,
        timeSeconds: 10,
        currentStreak: 0
      };

      const score = calculateQuestionScore(result);
      expect(score.totalScore).toBe(-24);
    });
  });

  describe('calculateExamScore', () => {
    it('should calculate total exam score correctly', () => {
      const questions: QuestionResult[] = [
        { questionId: 'q1', difficulty: 3, isCorrect: true, timeSeconds: 60, currentStreak: 0 }, // 150 pts
        { questionId: 'q2', difficulty: 3, isCorrect: true, timeSeconds: 60, currentStreak: 1 }  // 150 * 1.1 = 165 pts
      ];

      const exam: ExamResult = {
        questions,
        totalTimeSeconds: 120,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      };

      const score = calculateExamScore(exam);

      expect(score.subtotal).toBe(315);
      expect(score.totalScore).toBe(455);
      expect(score.practiceScore).toBe(455);
      expect(score.stats.accuracy).toBe(1.0);

      // Icfes estimate with 2 questions should be very low due to lack of evidence
      expect(score.icfesEstimate.score).toBeLessThan(250);
    });

    it('should keep ICFES proxy conservative for short sessions', () => {
      const questions: QuestionResult[] = Array.from({ length: 10 }, (_, index) => ({
        questionId: `q${index + 1}`,
        difficulty: 5,
        isCorrect: index < 9,
        timeSeconds: 5,
        currentStreak: index
      }));

      const exam: ExamResult = {
        questions,
        totalTimeSeconds: 50,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      };

      const score = calculateExamScore(exam);

      // Even with 9/10 correct on Hard, evidence factor for 10 questions is ~0.62
      // Estimate should be around 400 * 0.62 = ~250
      expect(score.icfesEstimate.score).toBeLessThan(350);
      expect(score.icfesEstimate.minimumEvidenceMet).toBe(false);
    });
  });

  describe('validateExamResult', () => {
    it('should validate a normal exam result', () => {
      const questions: QuestionResult[] = [
        { questionId: 'q1', difficulty: 3, isCorrect: true, timeSeconds: 10, currentStreak: 0 }
      ];
      const exam: ExamResult = {
        questions,
        totalTimeSeconds: 20,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      };
      const score = calculateExamScore(exam);
      const validation = validateExamResult(exam, score);

      expect(validation.isValid).toBe(true);
    });
  });

  describe('Formatting Utilities', () => {
    it('should format score with thousands separator', () => {
      expect(formatScore(1000)).toBe('1.000');
    });

    it('should format accuracy as percentage', () => {
      expect(formatAccuracy(0.5)).toBe('50.0%');
    });

    it('should format time as mm:ss', () => {
      expect(formatTime(65)).toBe('1:05');
    });
  });
});
