import { describe, it, expect } from 'vitest';
import { classifyLearnerArchetype, computeAdaptiveContext, generatePrompt, type UserProfileData } from './prompt-service';

describe('Prompt Service - Adaptive Logic', () => {
  const baseProfile: UserProfileData = {
    globalMMR: 1000,
    rankTitle: 'Estudiante',
    globalAccuracy: 0.5,
    totalQuestions: 50,
    weakAreas: [{ name: 'Matemáticas', accuracy: 0.3 }],
    strongAreas: [{ name: 'Lectura Crítica', accuracy: 0.8 }],
    advancedMetrics: {
      avgTimeCorrect: 30000,
      avgTimeIncorrect: 35000,
      consistencyScore: 60
    },
    recentHistory: []
  };

  it('should classify as novice if questions < 20', () => {
    const profile = { ...baseProfile, totalQuestions: 15 };
    expect(classifyLearnerArchetype(profile)).toBe('novice_consolidating');
  });

  it('should classify as regressing if MMR dropped significantly', () => {
    const profile = { 
      ...baseProfile, 
      totalQuestions: 40,
      recentHistory: [
        { mmr: 1100, timestamp: 1 }, { mmr: 1100, timestamp: 2 }, { mmr: 1100, timestamp: 3 }, { mmr: 1100, timestamp: 4 }, { mmr: 1100, timestamp: 5 },
        { mmr: 1000, timestamp: 6 }, { mmr: 1000, timestamp: 7 }, { mmr: 1000, timestamp: 8 }, { mmr: 1000, timestamp: 9 }, { mmr: 1000, timestamp: 10 },
      ]
    };
    expect(classifyLearnerArchetype(profile)).toBe('regressing');
  });

  it('should classify as advanced_consistent for high MMR and high consistency', () => {
    const profile = { 
      ...baseProfile, 
      globalMMR: 1500, 
      advancedMetrics: { ...baseProfile.advancedMetrics!, consistencyScore: 85 } 
    };
    expect(classifyLearnerArchetype(profile)).toBe('advanced_consistent');
  });

  it('should classify as impulsive if speed diff is high', () => {
    const profile = { 
      ...baseProfile, 
      advancedMetrics: { ...baseProfile.advancedMetrics!, avgTimeCorrect: 30000, avgTimeIncorrect: 20000 } 
    };
    const context = computeAdaptiveContext(profile);
    expect(context.speedProfile).toBe('impulsive');
  });

  it('should route to the correct prompt template in adaptive_auto', () => {
    const profile = { 
      ...baseProfile, 
      globalMMR: 1500, 
      advancedMetrics: { ...baseProfile.advancedMetrics!, consistencyScore: 85 } 
    };
    const prompt = generatePrompt('adaptive_auto', profile);
    expect(prompt).toContain('Mentor Olímpico');
    expect(prompt).toContain('Objetivo 450+');
  });

  it('should handle rescue plan for regressing users', () => {
    const profile = { 
        ...baseProfile, 
        totalQuestions: 40,
        recentHistory: Array(10).fill(0).map((_, i) => ({ mmr: i < 5 ? 1200 : 1000, timestamp: i }))
      };
      const prompt = generatePrompt('adaptive_auto', profile);
      expect(prompt).toContain('Tutor de Rescate Académico');
      expect(prompt).toContain('rendimiento ha bajado');
  });
});
