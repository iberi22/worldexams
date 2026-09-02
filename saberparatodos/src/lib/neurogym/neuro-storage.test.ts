import { describe, it, expect, beforeEach } from 'vitest';
import { saveNeuroSession, getNeuroSessionsHistory, getStreakInfo, clearNeuroHistory } from './neuro-storage';
import { computeCognitiveProfile, type RawCognitiveScores } from './scoring-cognitive';

describe('NeuroGym Sovereign Local Storage Engine', () => {
  beforeEach(async () => {
    await clearNeuroHistory();
  });

  it('saves and retrieves neuro sessions locally', async () => {
    const rawData: RawCognitiveScores = {
      fluidReasoningRaw: { correct: 15, total: 20, avgTimeMs: 10000 },
      workingMemorySpan: { maxNLevel: 3, corsiSpan: 6, accuracy: 0.88 },
      processingSpeed: { avgReactionMs: 240, stroopInterferenceMs: 40, errorRate: 0.04 },
      motorCoordination: { tapsPer10s: 60, goNoGoAccuracy: 0.94, motorJitterMs: 14 },
      analyticalFlexibility: { ruleSwitchesSuccess: 11, totalRuleTrials: 14 },
      quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
    };

    const profile = computeCognitiveProfile(rawData);
    const sessionId = await saveNeuroSession(profile);
    expect(sessionId).toMatch(/^session_\d+_[a-z0-9]+$/);

    const history = await getNeuroSessionsHistory();
    expect(history.length).toBe(1);
    expect(history[0].id).toBe(sessionId);
    expect(history[0].profile.overallIQProxy.standardScore).toBe(profile.overallIQProxy.standardScore);
  });

  it('manages daily streak calculations without server leaks', () => {
    const streak = getStreakInfo();
    expect(streak.currentStreak).toBeDefined();
    expect(streak.totalWorkouts).toBeDefined();
  });
});
