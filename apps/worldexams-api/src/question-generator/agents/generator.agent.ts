import type {
  GenerateQuestionsInput,
  GeminiEnv,
  GeminiGenerationConfig,
  Question,
  QuestionDifficulty,
  QuestionOption,
} from "../types/question.types"

interface GeminiTextPart {
  text?: string
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiTextPart[]
  }
}

interface GeminiResponse {
  candidates?: GeminiCandidate[]
}

const DEFAULT_MODEL = "gemini-1.5-flash"

export class QuestionGeneratorAgent {
  constructor(
    private readonly env: GeminiEnv,
    private readonly config: GeminiGenerationConfig = {},
  ) {}

  async generateFromTopic(input: GenerateQuestionsInput): Promise<Question[]> {
    const response = await fetch(this.buildEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: this.buildPrompt(input) }],
          },
        ],
        generationConfig: {
          temperature: this.config.temperature ?? 0.7,
          topP: this.config.topP ?? 0.9,
          topK: this.config.topK ?? 32,
          maxOutputTokens: this.config.maxOutputTokens ?? 4096,
          responseMimeType: "application/json",
        },
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Gemini generation failed with ${response.status}: ${errorBody}`)
    }

    const payload = (await response.json()) as GeminiResponse
    return this.parseResponse(payload, input)
  }

  private buildEndpoint(): string {
    const model = this.config.model ?? this.env.GEMINI_MODEL ?? DEFAULT_MODEL
    const url = new URL(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    )
    url.searchParams.set("key", this.env.GEMINI_API_KEY)
    return url.toString()
  }

  private buildPrompt(input: GenerateQuestionsInput): string {
    const difficulty = input.difficulty ?? "medium"
    const language = input.language ?? "es"
    const category = input.category ?? input.topic
    const targetAudience = input.targetAudience ?? "secondary education students"

    return [
      `Generate ${input.count} high-quality multiple choice questions about "${input.topic}".`,
      `Category: ${category}.`,
      `Target difficulty: ${difficulty}.`,
      `Language: ${language}.`,
      `Target audience: ${targetAudience}.`,
      input.sourceMaterial ? `Source material:\n${input.sourceMaterial}` : "No source material supplied.",
      "Return only valid JSON as an array of question objects.",
      "Each question object must contain:",
      '- "text": concise and unambiguous question text',
      '- "options": array of 4 objects with "id" (A-D) and "text"',
      '- "correctAnswer": the option id of the single correct answer',
      '- "explanation": a brief explanation justifying the correct answer',
      '- "difficulty": one of "easy", "medium", or "hard"',
      '- "topic": original topic',
      '- "category": category or curriculum area',
      "Rules:",
      "- Exactly 4 options per question.",
      "- Avoid trick wording and avoid all-of-the-above or none-of-the-above.",
      "- Ensure only one option is correct.",
      "- Explanations must mention why the correct answer is correct.",
    ].join("\n")
  }

  private parseResponse(payload: GeminiResponse, input: GenerateQuestionsInput): Question[] {
    const text = payload.candidates
      ?.flatMap((candidate) => candidate.content?.parts ?? [])
      .map((part) => part.text ?? "")
      .join("")
      .trim()

    if (!text) {
      throw new Error("Gemini response did not include any text content")
    }

    const normalizedJson = this.extractJsonArray(text)
    const parsed = JSON.parse(normalizedJson) as Array<Partial<Question>>

    return parsed.map((item, index) => this.normalizeQuestion(item, input, index))
  }

  private extractJsonArray(raw: string): string {
    const fencedMatch = raw.match(/```json\s*([\s\S]*?)```/i)
    if (fencedMatch?.[1]) {
      return fencedMatch[1].trim()
    }

    const firstBracket = raw.indexOf("[")
    const lastBracket = raw.lastIndexOf("]")
    if (firstBracket === -1 || lastBracket === -1 || lastBracket <= firstBracket) {
      throw new Error("Gemini response did not contain a JSON array")
    }

    return raw.slice(firstBracket, lastBracket + 1)
  }

  private normalizeQuestion(
    item: Partial<Question>,
    input: GenerateQuestionsInput,
    index: number,
  ): Question {
    const options = this.normalizeOptions(item.options)
    const correctAnswer = this.normalizeCorrectAnswer(item.correctAnswer, options)
    const difficulty = this.normalizeDifficulty(item.difficulty, input.difficulty)

    if (!item.text?.trim()) {
      throw new Error(`Generated question at index ${index} is missing text`)
    }

    if (!item.explanation?.trim()) {
      throw new Error(`Generated question at index ${index} is missing explanation`)
    }

    return {
      id: crypto.randomUUID(),
      text: item.text.trim(),
      options,
      correctAnswer,
      explanation: item.explanation.trim(),
      difficulty,
      topic: item.topic?.trim() || input.topic,
      category: item.category?.trim() || input.category || input.topic,
      sourceMaterial: input.sourceMaterial,
      language: input.language ?? "es",
      metadata: {
        generatedBy: "gemini",
        generatedAt: new Date().toISOString(),
        promptVersion: "phase-1",
        attempt: index + 1,
      },
    }
  }

  private normalizeOptions(rawOptions: unknown): QuestionOption[] {
    if (!Array.isArray(rawOptions) || rawOptions.length !== 4) {
      throw new Error("Each generated question must include exactly 4 options")
    }

    const options = rawOptions.map((option, index) => {
      const fallbackId = String.fromCharCode(65 + index)

      if (typeof option === "string") {
        return { id: fallbackId, text: option.trim() }
      }

      if (typeof option === "object" && option !== null) {
        const candidate = option as Partial<QuestionOption>
        return {
          id: (candidate.id ?? fallbackId).toString().trim().toUpperCase(),
          text: candidate.text?.trim() ?? "",
        }
      }

      return { id: fallbackId, text: "" }
    })

    if (options.some((option) => !option.text)) {
      throw new Error("Generated options must include non-empty text")
    }

    return options
  }

  private normalizeCorrectAnswer(correctAnswer: unknown, options: QuestionOption[]): string {
    const normalized = String(correctAnswer ?? "")
      .trim()
      .toUpperCase()

    const optionIds = new Set(options.map((option) => option.id))

    if (!optionIds.has(normalized)) {
      throw new Error(`Correct answer "${normalized}" does not match the generated options`)
    }

    return normalized
  }

  private normalizeDifficulty(
    rawDifficulty: unknown,
    fallbackDifficulty?: QuestionDifficulty,
  ): QuestionDifficulty {
    const normalized = String(rawDifficulty ?? fallbackDifficulty ?? "medium").toLowerCase()
    if (normalized === "easy" || normalized === "medium" || normalized === "hard") {
      return normalized
    }
    return fallbackDifficulty ?? "medium"
  }
}
