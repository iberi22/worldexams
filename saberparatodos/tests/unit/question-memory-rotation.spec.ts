import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  markQuestionAnswered,
  loadAnsweredQuestions,
  clearQuestionMemory,
  filterUnansweredQuestions,
} from "../../src/lib/question-memory";

describe("Question Memory Rotation Logic", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should not clear memory when reaching 70% threshold", async () => {
    const totalAvailable = 10;

    // Simulate answering 7 questions (70%)
    for (let i = 1; i <= 7; i++) {
      const result = await markQuestionAnswered(`q-${i}`, totalAvailable, true);

      // Memory should NEVER be cleared automatically now
      expect(result.cacheCleared).toBe(false);
      expect(result.percentAnswered).toBe(i / totalAvailable);
    }

    // Verify localStorage still holds the 7 answers
    const answered = loadAnsweredQuestions();
    expect(answered.size).toBe(7);
  });

  it("should trigger Smart Recycle (Spaced Repetition) when 100% of questions are answered", async () => {
    const questions = Array.from({ length: 5 }, (_, i) => ({
      id: `q-${i + 1}`,
    }));
    const totalAvailable = questions.length;

    // Answer all 5 questions sequentially
    for (let i = 0; i < totalAvailable; i++) {
      await markQuestionAnswered(questions[i].id, totalAvailable, true);
      // Wait a tiny bit so timestamps are definitely different (if precision allows)
      await new Promise((r) => setTimeout(r, 10));
    }

    // Now all questions are answered. The pool is exhausted.
    const answered = loadAnsweredQuestions();
    expect(answered.size).toBe(5);

    // Ask for 2 unanswered questions
    // This should trigger the recycle logic (unanswered.length === 0)
    const { filtered, hadToRepeat } = filterUnansweredQuestions(questions, 2);

    // It should have to repeat
    expect(hadToRepeat).toBe(true);

    // It should give us 2 questions
    expect(filtered.length).toBe(2);

    // Because it's a random shuffle on the final array, we just ensure it returned 2 valid questions
    expect(questions.map((q) => q.id)).toContain(filtered[0].id);
    expect(questions.map((q) => q.id)).toContain(filtered[1].id);
  });
});
