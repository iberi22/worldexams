import { QuestionEvaluatorAgent } from "../agents/evaluator.agent"
import type {
  EvaluateQuestionsInput,
  Question,
  QuestionMetrics,
} from "../types/question.types"

export class QuestionEvaluationService {
  constructor(private readonly evaluator = new QuestionEvaluatorAgent()) {}

  evaluateQuestion(question: Question, existingQuestions: Question[] = []): QuestionMetrics {
    return this.evaluator.evaluate(question, existingQuestions)
  }

  evaluateBatch(input: EvaluateQuestionsInput): Question[] {
    return this.evaluator.evaluateBatch(input)
  }

  getApprovedQuestions(input: EvaluateQuestionsInput, minimumScore = 70): Question[] {
    return this.evaluateBatch(input).filter((question) => (question.metrics?.overall ?? 0) >= minimumScore)
  }
}
