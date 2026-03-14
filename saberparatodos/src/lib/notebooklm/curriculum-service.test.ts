/**
 * Unit Tests for NotebookLM Curriculum Service
 */
import { describe, it, expect } from 'vitest';
import { generateStudyPlan } from './curriculum-service';
import type { EnglishProficiencyResult } from '../english-proficiency';

describe('generateStudyPlan', () => {
  it('should generate a plan based on weaknesses', () => {
    const mockResult: EnglishProficiencyResult = {
      estimatedLevel: 'A2',
      estimatedLevelNum: 3,
      confidence: 80,
      confidenceLabel: 'High',
      breakdown: [],
      totalQuestions: 10,
      correctAnswers: 5,
      overallAccuracy: 50,
      recommendation: 'Study harder',
      strengthLevels: ['A1'],
      weaknessLevels: ['A2', 'B1'],
      failedTopics: []
    };

    const plan = generateStudyPlan(mockResult);

    expect(plan).toBeDefined();
    expect(plan.currentLevel).toBe('A2');
    expect(plan.modules.length).toBeGreaterThan(0);

    // Should have a recovery module for A2/B1
    const recoveryModule = plan.modules.find(m => m.title.includes('Recuperación'));
    expect(recoveryModule).toBeDefined();
    expect(recoveryModule?.focus).toContain('A2');
  });

  it('should generate a plan for consolidation if no weaknesses', () => {
    const mockResult: EnglishProficiencyResult = {
      estimatedLevel: 'B1',
      estimatedLevelNum: 5,
      confidence: 90,
      confidenceLabel: 'Very High',
      breakdown: [],
      totalQuestions: 10,
      correctAnswers: 8,
      overallAccuracy: 80,
      recommendation: 'Good job',
      strengthLevels: ['A1', 'A2', 'B1'],
      weaknessLevels: [],
      failedTopics: []
    };

    const plan = generateStudyPlan(mockResult);

    // Should have specific modules
    expect(plan.modules.some(m => m.title.includes('Consolidación del Nivel B1'))).toBe(true);
    expect(plan.modules.some(m => m.title.includes('Desafío'))).toBe(true);

    // Should have source content
    expect(plan.sourceContent).toContain('# 🎓 Plan de Estudio Personalizado');
    expect(plan.sourceContent).toContain('**Nivel Diagnóstico**: B1');
  });

  it('should include target level', () => {
    const mockResult: EnglishProficiencyResult = {
      estimatedLevel: 'A2',
      estimatedLevelNum: 3,
      confidence: 80,
      confidenceLabel: 'High',
      breakdown: [],
      totalQuestions: 10,
      correctAnswers: 5,
      overallAccuracy: 50,
      recommendation: 'Study',
      strengthLevels: [],
      weaknessLevels: [],
      failedTopics: []
    };

    const plan = generateStudyPlan(mockResult);
    // Target should be +2 levels (B1)
    expect(plan.targetLevel).toBe('B1');
  });
});
