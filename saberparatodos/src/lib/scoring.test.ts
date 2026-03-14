import { describe, it, expect } from 'vitest';
import {
  calculateQuestionScore,
  calculateExamScore,
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
      // At 60s (half of 120s), bonus should be halfway between 1.5 and 1.0 = 1.25
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

      // Base 100 * 1.2 * 1.25 * 1.0 = 150
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

      // Penalty -20 * 1.2 = -24
      const score = calculateQuestionScore(result);
      expect(score.totalScore).toBe(-24);
    });
  });

  describe('calculateExamScore', () => {
    it('should calculate total exam score correctly', () => {
      const questions: QuestionResult[] = [
        { questionId: 'q1', difficulty: 3, isCorrect: true, timeSeconds: 60, currentStreak: 0 }, // 150 pts
        { questionId: 'q2', difficulty: 3, isCorrect: true, timeSeconds: 60, currentStreak: 1 }  // 150 * 1.1 (streak) = 165 pts
      ];

      const exam: ExamResult = {
        questions,
        totalTimeSeconds: 120,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      };

      const score = calculateExamScore(exam);

      // Subtotal: 150 + 165 = 315
      expect(score.subtotal).toBe(315);

      // Accuracy: 100% -> Bonus: (1.0 - 0.8) * 200 = 40
      // Perfect Bonus: 100
      // Completion Bonus: 0 (less than 7 questions)

      // Total: 315 + 40 + 100 = 455
      expect(score.totalScore).toBe(455);
      expect(score.stats.accuracy).toBe(1.0);
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
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect impossible speed (cheating)', () => {
      const questions: QuestionResult[] = [
        { questionId: 'q1', difficulty: 3, isCorrect: true, timeSeconds: 1, currentStreak: 0 }
      ];
      const exam: ExamResult = {
        questions,
        totalTimeSeconds: 1, // Too fast
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      };
      const score = calculateExamScore(exam);
      const validation = validateExamResult(exam, score);

      expect(validation.isValid).toBe(false);
      expect(validation.errors[0]).toContain('menor al mínimo posible');
    });
  });

  describe('Formatting Utilities', () => {
    it('should format score with thousands separator', () => {
      expect(formatScore(1000)).toBe('1.000');
      expect(formatScore(12345)).toBe('12.345');
    });

    it('should format accuracy as percentage', () => {
      expect(formatAccuracy(0.5)).toBe('50.0%');
      expect(formatAccuracy(0.123)).toBe('12.3%');
    });

    it('should format time as mm:ss', () => {
      expect(formatTime(65)).toBe('1:05');
      expect(formatTime(120)).toBe('2:00');
      expect(formatTime(5)).toBe('0:05');
    });

    it('should return correct difficulty name', () => {
      expect(getDifficultyName(1)).toBe('Muy fácil');
      expect(getDifficultyName(5)).toBe('Muy difícil');
    });

    it('should return correct difficulty color', () => {
      expect(getDifficultyColor(1)).toBe('text-green-400');
      expect(getDifficultyColor(5)).toBe('text-red-400');
    });
  });
});
