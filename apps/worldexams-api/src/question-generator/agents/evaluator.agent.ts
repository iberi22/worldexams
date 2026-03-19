import type {
  EvaluateQuestionsInput,
  Question,
  QuestionMetrics,
} from "../types/question.types"

const MAX_SCORE = 100

export class QuestionEvaluatorAgent {
  evaluate(question: Question, existingQuestions: Question[] = []): QuestionMetrics {
    const flags: string[] = []

    const clarity = this.checkClarity(question, flags)
    const difficulty = this.checkDifficulty(question, flags)
    const accuracy = this.checkAccuracy(question, flags)
    const uniqueness = this.checkUniqueness(question, existingQuestions, flags)
    const overall = Math.round((clarity + difficulty + accuracy + uniqueness) / 4)

    return {
      clarity,
      difficulty,
      accuracy,
      uniqueness,
      overall,
      flags,
      evaluatedAt: new Date().toISOString(),
    }
  }

  evaluateBatch(input: EvaluateQuestionsInput): Question[] {
    return input.questions.map((question, index, allQuestions) => {
      const comparisonSet = [...allQuestions.slice(0, index), ...input.existingQuestions ?? []]
      return {
        ...question,
        metrics: this.evaluate(question, comparisonSet),
      }
    })
  }

  private checkClarity(question: Question, flags: string[]): number {
    let score = MAX_SCORE
    const text = question.text.trim()
    const wordCount = this.getWordCount(text)

    if (wordCount < 6) {
      score -= 30
      flags.push("question-too-short")
    }

    if (wordCount > 35) {
      score -= 15
      flags.push("question-too-long")
    }

    if (!text.endsWith("?")) {
      score -= 5
      flags.push("missing-question-mark")
    }

    if (/(siempre|nunca|todas las anteriores|ninguna de las anteriores)/i.test(text)) {
      score -= 20
      flags.push("potentially-ambiguous-wording")
    }

    const emptyOptions = question.options.filter((option) => !option.text.trim()).length
    if (emptyOptions > 0) {
      score -= emptyOptions * 25
      flags.push("empty-option-text")
    }

    return this.clamp(score)
  }

  private checkDifficulty(question: Question, flags: string[]): number {
    let score = 70
    const questionWords = this.getWordCount(question.text)
    const explanationWords = this.getWordCount(question.explanation)

    if (question.difficulty === "easy") {
      score += questionWords <= 18 ? 20 : -10
    }

    if (question.difficulty === "medium") {
      score += questionWords >= 10 && questionWords <= 24 ? 20 : 0
    }

    if (question.difficulty === "hard") {
      score += questionWords >= 16 ? 20 : -10
    }

    if (explanationWords < 8) {
      score -= 10
      flags.push("thin-explanation")
    }

    return this.clamp(score)
  }

  private checkAccuracy(question: Question, flags: string[]): number {
    let score = MAX_SCORE
    const correctOption = question.options.find((option) => option.id === question.correctAnswer)

    if (!correctOption) {
      score -= 50
      flags.push("missing-correct-option")
    }

    if (question.options.length !== 4) {
      score -= 25
      flags.push("invalid-option-count")
    }

    if (!question.explanation.toLowerCase().includes(correctOption?.text.toLowerCase() ?? "")) {
      score -= 15
      flags.push("explanation-does-not-reference-answer")
    }

    const uniqueIds = new Set(question.options.map((option) => option.id))
    if (uniqueIds.size !== question.options.length) {
      score -= 20
      flags.push("duplicate-option-ids")
    }

    return this.clamp(score)
  }

  private checkUniqueness(question: Question, existingQuestions: Question[], flags: string[]): number {
    if (existingQuestions.length === 0) {
      return MAX_SCORE
    }

    const normalizedTarget = this.normalizeText(question.text)
    let score = MAX_SCORE

    for (const existingQuestion of existingQuestions) {
      const similarity = this.calculateSimilarity(
        normalizedTarget,
        this.normalizeText(existingQuestion.text),
      )

      if (similarity >= 0.9) {
        flags.push("near-duplicate-question")
        return 20
      }

      if (similarity >= 0.75) {
        score = Math.min(score, 55)
      }
    }

    return this.clamp(score)
  }

  private calculateSimilarity(a: string, b: string): number {
    const aTokens = new Set(a.split(" ").filter(Boolean))
    const bTokens = new Set(b.split(" ").filter(Boolean))

    const intersection = [...aTokens].filter((token) => bTokens.has(token)).length
    const union = new Set([...aTokens, ...bTokens]).size

    return union === 0 ? 0 : intersection / union
  }

  private normalizeText(value: string): string {
    return value.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim()
  }

  private getWordCount(value: string): number {
    return value.trim().split(/\s+/).filter(Boolean).length
  }

  private clamp(value: number): number {
    return Math.max(0, Math.min(MAX_SCORE, Math.round(value)))
  }
}
