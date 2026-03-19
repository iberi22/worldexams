import { QuestionGeneratorAgent } from "../agents/generator.agent"
import { QuestionEvaluatorAgent } from "../agents/evaluator.agent"
import type {
  GenerateQuestionsInput,
  GeminiEnv,
  GeminiGenerationConfig,
  Question,
} from "../types/question.types"

export interface GenerationResult {
  accepted: Question[]
  rejected: Question[]
}

export class QuestionGenerationService {
  private readonly generator: QuestionGeneratorAgent
  private readonly evaluator: QuestionEvaluatorAgent

  constructor(
    env: GeminiEnv,
    config: GeminiGenerationConfig = {},
    evaluator = new QuestionEvaluatorAgent(),
  ) {
    this.generator = new QuestionGeneratorAgent(env, config)
    this.evaluator = evaluator
  }

  async generateQuestions(
    input: GenerateQuestionsInput,
    existingQuestions: Question[] = [],
    minimumScore = 70,
  ): Promise<GenerationResult> {
    const generatedQuestions = await this.generator.generateFromTopic(input)

    const evaluatedQuestions = generatedQuestions.map((question, index, allQuestions) => {
      const comparisons = [...existingQuestions, ...allQuestions.slice(0, index)]
      return {
        ...question,
        metrics: this.evaluator.evaluate(question, comparisons),
      }
    })

    return {
      accepted: evaluatedQuestions.filter((question) => (question.metrics?.overall ?? 0) >= minimumScore),
      rejected: evaluatedQuestions.filter((question) => (question.metrics?.overall ?? 0) < minimumScore),
    }
  }
}
