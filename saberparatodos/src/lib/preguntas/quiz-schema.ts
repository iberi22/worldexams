/**
 * JSON-LD schema.org para las páginas de bundle /preguntas/: `Quiz` con
 * `hasPart` Question / acceptedAnswer / suggestedAnswer, y `BreadcrumbList`.
 */
import { plainText } from './rich-text';

export interface QuizSchemaQuestion {
  id: string;
  statement: string;
  context?: string;
  options: { letter: string; text: string; correct: boolean; feedback: string }[];
  explanation: string;
}

export interface QuizSchemaInput {
  url: string;
  name: string;
  description: string;
  /** BCP 47, p. ej. `es-AR`, `pt-BR`. */
  inLanguage: string;
  /** Nivel educativo visible, p. ej. `Grado 6`. */
  educationalLevel: string;
  subject: string;
  alignment?: string;
  publisherName: string;
  publisherUrl: string;
  questions: QuizSchemaQuestion[];
}

type JsonLd = Record<string, unknown>;

function answer(url: string, questionId: string, opt: QuizSchemaQuestion['options'][number], explanation: string): JsonLd {
  const node: JsonLd = {
    '@type': 'Answer',
    url: `${url}#q-${questionId}`,
    text: `${opt.letter}) ${plainText(opt.text)}`,
  };
  const comment = plainText(opt.feedback);
  if (comment) node.comment = { '@type': 'Comment', text: comment };
  if (opt.correct && explanation) node.answerExplanation = { '@type': 'Comment', text: plainText(explanation) };
  return node;
}

export function buildQuizSchema(input: QuizSchemaInput): JsonLd {
  const about: JsonLd = { '@type': 'Thing', name: input.subject };
  const quiz: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    '@id': `${input.url}#quiz`,
    url: input.url,
    name: input.name,
    description: input.description,
    inLanguage: input.inLanguage,
    educationalLevel: input.educationalLevel,
    learningResourceType: 'Practice problem',
    isAccessibleForFree: true,
    about,
    publisher: { '@type': 'Organization', name: input.publisherName, url: input.publisherUrl },
    hasPart: input.questions
      .filter((q) => q.options.some((o) => o.correct))
      .map((q, i) => {
        const statement = plainText(q.statement);
        const context = plainText(q.context);
        return {
          '@type': 'Question',
          '@id': `${input.url}#q-${q.id}`,
          position: i + 1,
          name: statement,
          text: context ? `${context} ${statement}` : statement,
          eduQuestionType: 'Multiple choice',
          inLanguage: input.inLanguage,
          about,
          acceptedAnswer: q.options.filter((o) => o.correct).map((o) => answer(input.url, q.id, o, q.explanation)),
          suggestedAnswer: q.options.filter((o) => !o.correct).map((o) => answer(input.url, q.id, o, '')),
        };
      }),
  };
  if (input.alignment) {
    quiz.educationalAlignment = {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      targetName: input.alignment,
    };
  }
  return quiz;
}

/** Serializa JSON-LD para `<script type="application/ld+json">` sin permitir `</script>`. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}
