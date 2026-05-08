/**
 * Question Generator Module
 * Main entry point for the question generation system
 */

export * from './types/question.types';
export * from './services/generate.service';
export * from './services/evaluate.service';

// Main service class that combines generation and evaluation
import { QuestionGeneratorService } from './services/generate.service';
import { QuestionEvaluationService } from './services/evaluate.service';
import { Question, QuestionMetrics, QuestionGenerationRequest } from './types/question.types';

export class QuestionSystem {
  private generator = new QuestionGeneratorService();
  private evaluator = new QuestionEvaluationService();

  /**
   * Generate and evaluate questions
   */
  async generateAndEvaluate(request: QuestionGenerationRequest): Promise<{
    questions: Question[];
    evaluations: Map<string, QuestionMetrics>;
  }> {
    // Generate questions
    const questions = await this.generator.generate(request);

    // Evaluate each question
    const evaluations = new Map<string, QuestionMetrics>();
    for (const question of questions) {
      const metrics = this.evaluator.evaluate(question);
      evaluations.set(question.id, metrics);
      question.qualityScore = metrics.overall;
    }

    return { questions, evaluations };
  }

  /**
   * Generate questions with automatic improvement
   */
  async generateWithImprovement(request: QuestionGenerationRequest): Promise<{
    questions: Question[];
    improved: number;
  }> {
    const { questions, evaluations } = await this.generateAndEvaluate(request);

    let improved = 0;
    const threshold = 70;

    // Retry questions that don't meet threshold
    for (const question of questions) {
      const metrics = evaluations.get(question.id)!;

      if (!this.evaluator.passesThreshold(metrics, threshold)) {
        // Try to regenerate with improvement
        const suggestions = this.evaluator.getSuggestions(question, metrics);
        const improvedQuestion = await this.generator.regenerateWithFeedback(
          question,
          suggestions.join('. ')
        );

        // Re-evaluate
        const newMetrics = this.evaluator.evaluate(improvedQuestion);
        if (newMetrics.overall > metrics.overall) {
          Object.assign(question, improvedQuestion);
          question.qualityScore = newMetrics.overall;
          improved++;
        }
      }
    }

    return { questions, improved };
  }
}

export const questionSystem = new QuestionSystem();
