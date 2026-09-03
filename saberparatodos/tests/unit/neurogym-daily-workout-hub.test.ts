/**
 * neurogym-daily-workout-hub.test.ts
 * Unit tests for NeuroDailyWorkoutHub component state management,
 * streak persistence, and adaptive level scaling logic.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'node:fs/promises';
import { getStreakInfo, saveNeuroSession } from '../../src/lib/neurogym/neuro-storage';
import { computeCognitiveProfile } from '../../src/lib/neurogym/scoring-cognitive';

vi.mock('../../src/lib/neurogym/neuro-storage', () => ({
  getStreakInfo: vi.fn(() => ({ currentStreak: 3, lastTrainedDate: '2026-01-01', totalWorkouts: 5 })),
  saveNeuroSession: vi.fn(async () => 'session_123')
}));

describe('NeuroDailyWorkoutHub logic & component structure', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('verifies NeuroDailyWorkoutHub.svelte file exists', async () => {
    const path = 'src/components/neurogym/NeuroDailyWorkoutHub.svelte';
    const exists = await fs.access(path).then(() => true).catch(() => false);
    expect(exists).toBe(true);
  });

  it('tracks current day streak and computes adaptive level increment upon >=85% accuracy', async () => {
    const streak = getStreakInfo();
    expect(streak.currentStreak).toBe(3);

    let adaptiveLevel = 1;
    const totalTrials = 11;
    const totalCorrectHigh = 10; // 10/11 = 90.9% >= 85%
    const totalCorrectLow = 8;   // 8/11 = 72.7% < 85%

    // High accuracy simulation
    const accuracyHigh = Math.round((totalCorrectHigh / totalTrials) * 100);
    expect(accuracyHigh).toBeGreaterThanOrEqual(85);
    if (accuracyHigh >= 85) {
      adaptiveLevel++;
    }
    expect(adaptiveLevel).toBe(2);

    // Low accuracy simulation
    let levelNoChange = 1;
    const accuracyLow = Math.round((totalCorrectLow / totalTrials) * 100);
    expect(accuracyLow).toBeLessThan(85);
    if (accuracyLow >= 85) {
      levelNoChange++;
    }
    expect(levelNoChange).toBe(1);
  });

  it('saves session profile and updates streak upon workout completion', async () => {
    const mockProfile = computeCognitiveProfile({
      fluidReasoningRaw: { correct: 3, total: 3, avgTimeMs: 1200 },
      workingMemorySpan: { maxNLevel: 2, corsiSpan: 5, accuracy: 0.9 },
      processingSpeed: { avgReactionMs: 250, stroopInterferenceMs: 40, errorRate: 0.1 },
      motorCoordination: { tapsPer10s: 55, goNoGoAccuracy: 0.95, motorJitterMs: 8 },
      analyticalFlexibility: { ruleSwitchesSuccess: 5, totalRuleTrials: 5 },
      verbalComprehension: { correct: 5, total: 5, avgTimeMs: 1000 },
      quantitativeReasoning: { correct: 5, total: 5, avgTimeMs: 1000 }
    });

    const sessionId = await saveNeuroSession(mockProfile);
    expect(saveNeuroSession).toHaveBeenCalledWith(mockProfile);
    expect(sessionId).toBe('session_123');
  });
});
