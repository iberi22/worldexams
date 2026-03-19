/**
 * Question Evaluation Service
 * Evaluates question quality using algorithms and AI
 */

import { Question, QuestionMetrics, QuestionEvaluationRequest } from '../types/question.types';

export class QuestionEvaluationService {
  /**
   * Evaluate a question's quality
   */
  evaluate(question: Question, strictness: 'lenient' | 'normal' | 'strict' = 'normal'): QuestionMetrics {
    const clarity = this.evaluateClarity(question);
    const difficulty = this.evaluateDifficulty(question);
    const accuracy = this.evaluateAccuracy(question);
    const uniqueness = this.evaluateUniqueness(question);

    const weights = this.getWeights(strictness);
    const overall = Math.round(
      clarity * weights.clarity +
      difficulty * weights.difficulty +
      accuracy * weights.accuracy +
      uniqueness * weights.uniqueness
    );

    return {
      clarity,
      difficulty,
      accuracy,
      uniqueness,
      overall,
    };
  }

  /**
   * Evaluate question clarity
   */
  private evaluateClarity(question: Question): number {
    let score = 100;

    // Check question length
    const wordCount = question.text.split(/\s+/).length;
    if (wordCount < 5) score -= 20;
    if (wordCount > 50) score -= 15;

    // Check for ambiguous words
    const ambiguousWords = ['maybe', 'perhaps', 'possibly', 'might', 'could be'];
    const hasAmbiguous = ambiguousWords.some(w => question.text.toLowerCase().includes(w));
    if (hasAmbiguous) score -= 25;

    // Check options are distinct
    const optionTexts = question.options.map(o => o.text.toLowerCase());
    const duplicates = optionTexts.filter((t, i) => optionTexts.indexOf(t) !== i);
    if (duplicates.length > 0) score -= 30;

    // Check explanation exists
    if (!question.explanation || question.explanation.length < 20) {
      score -= 20;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Evaluate difficulty appropriateness
   */
  private evaluateDifficulty(question: Question): number {
    let score = 80; // Default good score

    // Check if difficulty matches content complexity
    const wordCount = question.text.split(/\s+/).length;

    if (question.difficulty === 'easy' && wordCount > 30) {
      score -= 20; // Too complex for easy
    }
    if (question.difficulty === 'hard' && wordCount < 10) {
      score -= 20; // Too simple for hard
    }

    // Check explanation depth matches difficulty
    const explanationLength = question.explanation?.split(/\s+/).length || 0;
    if (question.difficulty === 'easy' && explanationLength > 50) {
      score -= 15;
    }
    if (question.difficulty === 'hard' && explanationLength < 20) {
      score -= 15;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Evaluate answer accuracy
   */
  private evaluateAccuracy(question: Question): number {
    let score = 100;

    // Check exactly one correct answer
    const correctOptions = question.options.filter(o => o.isCorrect);
    if (correctOptions.length !== 1) {
      score -= 50; // Must have exactly one correct answer
    }

    // Check correct answer is marked correctly
    const markedCorrect = question.options.find(o => o.id === question.correctAnswerId);
    if (markedCorrect && !markedCorrect.isCorrect) {
      score -= 40; // Inconsistency between isCorrect and correctAnswerId
    }

    // Check options are plausible (not obviously wrong)
    const correctText = correctOptions[0]?.text?.toLowerCase() || '';
    question.options.forEach(opt => {
      if (opt.isCorrect) return;
      const text = opt.text.toLowerCase();
      // Very short wrong answers might be too obvious
      if (text.length < 3 && correctText.length > 10) {
        score -= 10;
      }
    });

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Evaluate uniqueness compared to similar questions
   */
  private evaluateUniqueness(question: Question): number {
    let score = 90;

    // Check for repetitive wording in question
    const words = question.text.toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words);
    const repetitionRatio = uniqueWords.size / words.length;

    if (repetitionRatio < 0.5) {
      score -= 20; // Too repetitive
    }

    // Check for template-like questions
    const templates = [
      /what is the .* of/,
      /which of the following is/,
      /the best answer is/,
    ];

    const isTemplate = templates.some(t => t.test(question.text.toLowerCase()));
    if (isTemplate) {
      score -= 15;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Get evaluation weights based on strictness
   */
  private getWeights(strictness: 'lenient' | 'normal' | 'strict') {
    switch (strictness) {
      case 'lenient':
        return { clarity: 0.2, difficulty: 0.2, accuracy: 0.3, uniqueness: 0.3 };
      case 'strict':
        return { clarity: 0.3, difficulty: 0.2, accuracy: 0.4, uniqueness: 0.1 };
      default: // normal
        return { clarity: 0.25, difficulty: 0.2, accuracy: 0.35, uniqueness: 0.2 };
    }
  }

  /**
   * Check if a question passes quality threshold
   */
  passesThreshold(metrics: QuestionMetrics, threshold: number = 70): boolean {
    return metrics.overall >= threshold;
  }

  /**
   * Get improvement suggestions based on metrics
   */
  getSuggestions(question: Question, metrics: QuestionMetrics): string[] {
    const suggestions: string[] = [];

    if (metrics.clarity < 70) {
      suggestions.push('Improve question clarity: shorten, remove ambiguous words, ensure options are distinct');
    }
    if (metrics.difficulty < 70) {
      suggestions.push('Adjust difficulty: content complexity should match difficulty level');
    }
    if (metrics.accuracy < 70) {
      suggestions.push('Fix accuracy: ensure exactly one correct answer and consistent marking');
    }
    if (metrics.uniqueness < 70) {
      suggestions.push('Make question more unique: avoid template-like wording, reduce repetition');
    }

    return suggestions;
  }
}

export const questionEvaluator = new QuestionEvaluationService();
