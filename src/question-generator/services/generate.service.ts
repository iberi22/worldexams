/**
 * Question Generation Service
 * Uses AI to generate high-quality questions from topics
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question, QuestionGenerationRequest, QuestionDifficulty } from '../types/question.types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export class QuestionGeneratorService {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  /**
   * Generate questions from a topic
   */
  async generate(request: QuestionGenerationRequest): Promise<Question[]> {
    const { topic, count, difficulty = 'medium', category } = request;

    const prompt = this.buildPrompt(topic, count, difficulty, category);
    const response = await this.model.generateContent(prompt);
    const text = response.response.text();

    return this.parseQuestions(text, topic, difficulty, category);
  }

  /**
   * Build the prompt for question generation
   */
  private buildPrompt(topic: string, count: number, difficulty: string, category?: string): string {
    return `Generate ${count} high-quality multiple choice questions about "${topic}".

Difficulty level: ${difficulty}
${category ? `Category: ${category}` : ''}

For each question include:
- Clear, unambiguous text
- 4 options (A, B, C, D) with one correct answer
- Detailed explanation of why the answer is correct
- Estimated difficulty level (easy/medium/hard)
- Topic category

Format as a JSON array with this exact structure:
[{
  "text": "Question text here?",
  "options": [
    {"id": "A", "text": "Option A text", "isCorrect": false},
    {"id": "B", "text": "Option B text", "isCorrect": true},
    {"id": "C", "text": "Option C text", "isCorrect": false},
    {"id": "D", "text": "Option D text", "isCorrect": false}
  ],
  "correctAnswerId": "B",
  "explanation": "Detailed explanation of the correct answer",
  "difficulty": "${difficulty}",
  "topic": "${topic}",
  "category": "${category || topic}"
}]

IMPORTANT: Return ONLY valid JSON array, no markdown, no explanation outside JSON.`;
  }

  /**
   * Parse the AI response into Question objects
   */
  private parseQuestions(response: string, topic: string, difficulty: string, category?: string): Question[] {
    try {
      // Clean the response - remove markdown formatting if present
      let cleanResponse = response.trim();
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/^```json\n?/, '').replace(/\n?```$/, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/^```\n?/, '').replace(/\n?```$/, '');
      }

      const parsed = JSON.parse(cleanResponse);
      const questions: Question[] = Array.isArray(parsed) ? parsed : [parsed];

      return questions.map((q, index) => this.createQuestion(q, topic, difficulty, category, index));
    } catch (error) {
      console.error('Failed to parse questions:', error);
      return [];
    }
  }

  /**
   * Create a Question object with all required fields
   */
  private createQuestion(
    data: any,
    topic: string,
    difficulty: string,
    category: string | undefined,
    index: number
  ): Question {
    return {
      id: `q_${Date.now()}_${index}`,
      text: data.text || '',
      options: data.options || [],
      correctAnswerId: data.correctAnswerId || data.options?.[0]?.id || 'A',
      explanation: data.explanation || '',
      difficulty: this.normalizeDifficulty(data.difficulty || difficulty),
      topic: data.topic || topic,
      category: data.category || category || topic,
      tags: [topic, category || topic],
      timesShown: 0,
      timesCorrect: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Normalize difficulty to enum values
   */
  private normalizeDifficulty(difficulty: string): QuestionDifficulty {
    const normalized = difficulty?.toLowerCase();
    if (normalized === 'easy' || normalized === 'fácil') return 'easy';
    if (normalized === 'hard' || normalized === 'difícil') return 'hard';
    return 'medium';
  }

  /**
   * Regenerate a single question with improvements
   */
  async regenerateWithFeedback(
    originalQuestion: Question,
    feedback: string
  ): Promise<Question> {
    const prompt = `Improve this question based on feedback.

Original Question:
${JSON.stringify(originalQuestion, null, 2)}

Feedback/Improvement Notes:
${feedback}

Generate an improved version of the question with the same topic and difficulty level.
Return as JSON with the same structure as before.`;

    const response = await this.model.generateContent(prompt);
    const text = response.response.text();

    const questions = this.parseQuestions(text, originalQuestion.topic, originalQuestion.difficulty, originalQuestion.category);
    return questions[0] || originalQuestion;
  }
}

export const questionGenerator = new QuestionGeneratorService();
