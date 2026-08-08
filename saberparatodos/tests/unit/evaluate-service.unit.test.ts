import { describe, it, expect } from 'vitest';
import { QuestionEvaluationService } from '../../../src/question-generator/services/evaluate.service';
import { Question } from '../../../src/question-generator/types/question.types';

describe('QuestionEvaluationService Unit Tests', () => {
  const evaluator = new QuestionEvaluationService();

  const createValidQuestion = (overrides?: Partial<Question>): Question => ({
    id: 'q_1',
    text: 'What is the sum of two plus two in decimal arithmetic?',
    options: [
      { id: 'A', text: 'Three', isCorrect: false },
      { id: 'B', text: 'Four', isCorrect: true },
      { id: 'C', text: 'Five', isCorrect: false },
      { id: 'D', text: 'Six', isCorrect: false },
    ],
    correctAnswerId: 'B',
    explanation: 'The sum of two and two equals four, which is represented by option B.',
    difficulty: 'easy',
    topic: 'addition',
    category: 'math',
    timesShown: 0,
    timesCorrect: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });

  it('should evaluate a perfectly valid question with a high quality score', () => {
    const question = createValidQuestion();
    const metrics = evaluator.evaluate(question);

    expect(metrics.overall).toBeGreaterThanOrEqual(80);
    expect(metrics.clarity).toBe(100);
    expect(metrics.accuracy).toBe(100);
  });

  it('should penalize clarity score for extremely short or ambiguous questions', () => {
    const questionShort = createValidQuestion({
      text: 'Add?',
    });
    const metricsShort = evaluator.evaluate(questionShort);
    expect(metricsShort.clarity).toBeLessThan(100);

    const questionAmbiguous = createValidQuestion({
      text: 'Perhaps the answer might possibly be four?',
    });
    const metricsAmbiguous = evaluator.evaluate(questionAmbiguous);
    expect(metricsAmbiguous.clarity).toBeLessThan(100);
  });

  it('should penalize clarity score for missing or short explanations', () => {
    const questionNoExplanation = createValidQuestion({
      explanation: 'Short.',
    });
    const metrics = evaluator.evaluate(questionNoExplanation);
    expect(metrics.clarity).toBeLessThan(100);
  });

  it('should heavily penalize accuracy score for incorrect correct option mapping', () => {
    // 0 correct options
    const questionNoCorrect = createValidQuestion({
      options: [
        { id: 'A', text: 'Three', isCorrect: false },
        { id: 'B', text: 'Four', isCorrect: false },
        { id: 'C', text: 'Five', isCorrect: false },
        { id: 'D', text: 'Six', isCorrect: false },
      ],
    });
    const metricsNoCorrect = evaluator.evaluate(questionNoCorrect);
    expect(metricsNoCorrect.accuracy).toBeLessThan(100);

    // Multiple correct options
    const questionMultiCorrect = createValidQuestion({
      options: [
        { id: 'A', text: 'Three', isCorrect: false },
        { id: 'B', text: 'Four', isCorrect: true },
        { id: 'C', text: 'Four again', isCorrect: true },
        { id: 'D', text: 'Six', isCorrect: false },
      ],
    });
    const metricsMulti = evaluator.evaluate(questionMultiCorrect);
    expect(metricsMulti.accuracy).toBeLessThan(100);
  });

  it('should identify mismatch between difficulty level and word count complexity', () => {
    // Easy difficulty but way too wordy (needs > 30 words)
    const questionEasyWordy = createValidQuestion({
      difficulty: 'easy',
      text: 'In the grand scheme of arithmetic operations and foundational mathematics of the universe, if we take two discrete units of value and add another two discrete units of value together, what is the resulting sum?',
    });
    const metricsEasy = evaluator.evaluate(questionEasyWordy);
    expect(metricsEasy.difficulty).toBeLessThan(80);

    // Hard difficulty but too short
    const questionHardSimple = createValidQuestion({
      difficulty: 'hard',
      text: 'Calculate 2+2.',
    });
    const metricsHard = evaluator.evaluate(questionHardSimple);
    expect(metricsHard.difficulty).toBeLessThan(80);
  });

  it('should evaluate uniqueness and identify template-like phrasing', () => {
    const templateQuestion = createValidQuestion({
      text: 'Which of the following is correct?',
    });
    const metrics = evaluator.evaluate(templateQuestion);
    expect(metrics.uniqueness).toBeLessThan(90);
  });

  it('should support strict, normal, and lenient evaluation weighting', () => {
    const question = createValidQuestion({
      options: [
        { id: 'A', text: 'Three', isCorrect: false },
        { id: 'B', text: 'Four', isCorrect: false }, // 0 correct options, accuracy is heavily affected
        { id: 'C', text: 'Five', isCorrect: false },
        { id: 'D', text: 'Six', isCorrect: false },
      ],
    });

    const metricsNormal = evaluator.evaluate(question, 'normal');
    const metricsStrict = evaluator.evaluate(question, 'strict');

    // Strict should penalize accuracy issues even more because of higher weight
    expect(metricsStrict.overall).toBeLessThan(metricsNormal.overall);
  });

  it('should determine threshold passing correctly', () => {
    const question = createValidQuestion();
    const metrics = evaluator.evaluate(question);

    expect(evaluator.passesThreshold(metrics, 70)).toBe(true);
    expect(evaluator.passesThreshold(metrics, 95)).not.toBe(true);
  });

  it('should provide helpful improvement suggestions based on metric failures', () => {
    const badQuestion = createValidQuestion({
      text: 'Perhaps maybe short?',
      options: [
        { id: 'A', text: 'Three', isCorrect: false },
        { id: 'B', text: 'Four', isCorrect: false }, // accuracy failure
        { id: 'C', text: 'Five', isCorrect: false },
        { id: 'D', text: 'Six', isCorrect: false },
      ],
      explanation: 'Too short.',
    });

    const metrics = evaluator.evaluate(badQuestion);
    const suggestions = evaluator.getSuggestions(badQuestion, metrics);

    expect(suggestions.length).toBeGreaterThan(0);
    const combined = suggestions.join(' | ');
    expect(combined).toContain('clarity');
    expect(combined).toContain('accuracy');
  });
});
