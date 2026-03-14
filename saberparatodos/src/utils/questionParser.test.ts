import { describe, it, expect } from 'vitest';
import { cleanExplanation, normalizeDifficulty, parseBundleQuestions, type QuestionEntry } from './questionParser';

describe('Question Parser', () => {
  describe('normalizeDifficulty', () => {
    it('should return 3 for undefined/null', () => {
      expect(normalizeDifficulty(undefined)).toBe(3);
      expect(normalizeDifficulty(null as any)).toBe(3); // Cast to bypass strict type check
    });

    it('should clamp numbers to 1-5', () => {
      expect(normalizeDifficulty(0)).toBe(1);
      expect(normalizeDifficulty(6)).toBe(5);
      expect(normalizeDifficulty(3)).toBe(3);
    });

    it('should handle text descriptions', () => {
      expect(normalizeDifficulty('muy fácil')).toBe(1);
      expect(normalizeDifficulty('easy')).toBe(2);
      expect(normalizeDifficulty('media')).toBe(3);
      expect(normalizeDifficulty('difícil')).toBe(4);
      expect(normalizeDifficulty('muy difícil')).toBe(5);
    });

    it('should default to 3 for unknown text', () => {
      expect(normalizeDifficulty('unknown')).toBe(3);
    });
  });

  describe('cleanExplanation', () => {
    it('should return undefined for empty input', () => {
      expect(cleanExplanation(undefined)).toBeUndefined();
      expect(cleanExplanation('')).toBeUndefined();
    });

    it('should remove metadata tables', () => {
      const input = `
This is the explanation.

## 📊 Metadata de Validación
| Key | Value |
|---|---|
| ID | 123 |
      `;
      const output = cleanExplanation(input);
      expect(output).toBe('This is the explanation.');
    });

    it('should remove Source ID lines', () => {
      const input = `Explanation text.\nSource ID: 12345`;
      const output = cleanExplanation(input);
      expect(output).toBe('Explanation text.');
    });

    it('should clean excessive whitespace', () => {
      const input = `Line 1\n\n\nLine 2`;
      const output = cleanExplanation(input);
      expect(output).toBe('Line 1\n\nLine 2');
    });
  });

  describe('parseBundleQuestions', () => {
    it('should merge global context with question-specific context', () => {
      const mockEntry: QuestionEntry = {
        id: 'BUN-001',
        body: `
# Topic: Global Context

---

## Question 1 (Original - Dificultad 3)

### Contexto
Specific context for Q1.

### Enunciado
What is the answer?

### Opciones
- [x] A) Correct
- [ ] B) Incorrect

### Explicación Pedagógica
Just because.
`,
        data: {
          id: 'BUN-001',
          grado: 7,
          asignatura: 'english',
          tema: 'test'
        }
      };

      const questions = parseBundleQuestions(mockEntry);
      expect(questions.length).toBe(1);
      expect(questions[0].context).toBe('# Topic: Global Context\n\nSpecific context for Q1.');
    });

    it('should work with only global context', () => {
      const mockEntry: QuestionEntry = {
        id: 'BUN-002',
        body: `
# Topic: Global Context

---

## Question 1 (Original - Dificultad 3)

### Enunciado
What is the answer?

### Opciones
- [x] A) Correct
- [ ] B) Incorrect
`,
        data: {
          id: 'BUN-002',
          grado: 7,
          asignatura: 'english',
          tema: 'test'
        }
      };

      const questions = parseBundleQuestions(mockEntry);
      expect(questions[0].context).toBe('# Topic: Global Context');
    });

    it('should work with only question-specific context', () => {
      const mockEntry: QuestionEntry = {
        id: 'BUN-003',
        body: `
## Question 1 (Original - Dificultad 3)

### Contexto
Only specific context.

### Enunciado
What is the answer?

### Opciones
- [x] A) Correct
- [ ] B) Incorrect
`,
        data: {
          id: 'BUN-003',
          grado: 7,
          asignatura: 'english',
          tema: 'test'
        }
      };

      const questions = parseBundleQuestions(mockEntry);
      expect(questions[0].context).toBe('Only specific context.');
    });
  });
});
