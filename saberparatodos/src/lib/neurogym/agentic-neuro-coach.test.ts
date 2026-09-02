import { describe, it, expect } from 'vitest';
import { AgenticNeuroCoach } from './agentic-neuro-coach';
import { computeCognitiveProfile, type RawCognitiveScores } from './scoring-cognitive';

describe('NeuroGym Agentic Coach & Xavier Bridge', () => {
  it('identifies weakest cognitive domain and generates targeted agentic advice', () => {
    const coach = new AgenticNeuroCoach();
    const raw: RawCognitiveScores = {
      fluidReasoningRaw: { correct: 18, total: 20, avgTimeMs: 8000 }, // Alto
      workingMemorySpan: { maxNLevel: 1, corsiSpan: 4, accuracy: 0.60 }, // Bajo (Memoria de trabajo)
      processingSpeed: { avgReactionMs: 240, stroopInterferenceMs: 40, errorRate: 0.03 },
      motorCoordination: { tapsPer10s: 60, goNoGoAccuracy: 0.95, motorJitterMs: 12 },
      analyticalFlexibility: { ruleSwitchesSuccess: 12, totalRuleTrials: 14 },
      verbalComprehension: { correct: 7, total: 10, avgTimeMs: 6000 },
      quantitativeReasoning: { correct: 7, total: 10, avgTimeMs: 9000 }
    };

    const profile = computeCognitiveProfile(raw);
    const advice = coach.synthesizeWorkoutPlan(profile);

    expect(advice.focusDomain).toBe('Memoria de Trabajo');
    expect(advice.recommendedGame).toContain('Dual N-Back');
    expect(advice.confidenceScore).toBeGreaterThan(0.9);
  });
});
