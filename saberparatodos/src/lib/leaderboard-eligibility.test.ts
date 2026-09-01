import { describe, it, expect } from 'vitest';
import { isLeaderboardEligible, LEADERBOARD_MIN_QUESTIONS } from './leaderboard';
import { submitScoreInput, type ScoreSubmissionInput } from './leaderboard-service';

describe('Leaderboard Psychometric Eligibility (>60 Questions)', () => {
  it('defines minimum questions threshold as 60', () => {
    expect(LEADERBOARD_MIN_QUESTIONS).toBe(60);
  });

  it('rejects short practice exams (<60 questions)', () => {
    expect(isLeaderboardEligible(5)).toBe(false);
    expect(isLeaderboardEligible(15)).toBe(false);
    expect(isLeaderboardEligible(30)).toBe(false);
    expect(isLeaderboardEligible(59)).toBe(false);
  });

  it('accepts calibrated simulations and official ICFES presets (>=60 questions)', () => {
    expect(isLeaderboardEligible(60)).toBe(true);
    expect(isLeaderboardEligible(115)).toBe(true); // Media jornada ICFES
    expect(isLeaderboardEligible(230)).toBe(true); // Jornada completa ICFES
  });

  it('submitScoreInput skips edge transmission for short tests (<60)', async () => {
    const shortInput: ScoreSubmissionInput = {
      anonymousId: 'anon-123',
      displayName: 'Estudiante',
      grade: 11,
      region: 'BOG',
      totalPoints: 250,
      questionsAnswered: 15,
      correctAnswers: 12,
      averageDifficulty: 3,
      examDurationMs: 120000,
      timestamp: Date.now()
    };

    const submitted = await submitScoreInput(shortInput);
    expect(submitted).toBe(false);
  });
});
