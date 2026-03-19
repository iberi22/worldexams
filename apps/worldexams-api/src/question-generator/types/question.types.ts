export type QuestionDifficulty = "easy" | "medium" | "hard"

export interface QuestionOption {
  id: string
  text: string
  isCorrect?: boolean
}

export interface QuestionMetrics {
  clarity: number
  difficulty: number
  accuracy: number
  uniqueness: number
  overall: number
  flags: string[]
  evaluatedAt: string
}

export interface UserFeedback {
  questionId: string
  rating?: number
  comment?: string
  isHelpful?: boolean
  reportedIssues?: string[]
  submittedAt?: string
}

export interface Question {
  id: string
  text: string
  options: QuestionOption[]
  correctAnswer: string
  explanation: string
  difficulty: QuestionDifficulty
  topic: string
  category: string
  sourceMaterial?: string
  language?: string
  metrics?: QuestionMetrics
  metadata?: {
    generatedBy?: string
    generatedAt?: string
    promptVersion?: string
    attempt?: number
    [key: string]: string | number | boolean | undefined
  }
}

export interface GenerateQuestionsInput {
  topic: string
  count: number
  category?: string
  difficulty?: QuestionDifficulty
  language?: string
  sourceMaterial?: string
  targetAudience?: string
}

export interface EvaluateQuestionsInput {
  questions: Question[]
  existingQuestions?: Question[]
}

export interface GeminiGenerationConfig {
  model?: string
  temperature?: number
  topP?: number
  topK?: number
  maxOutputTokens?: number
}

export interface GeminiEnv {
  GEMINI_API_KEY: string
  GEMINI_MODEL?: string
}
