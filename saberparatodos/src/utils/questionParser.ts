import type { Question, Option } from '../types';

/**
 * Legacy type for compatibility with old question parser code
 * TODO: Refactor to remove dependency on Astro content collections
 */
export type QuestionEntry = {
  id: string;
  body: string;
  data: {
    id: string;
    total_questions?: number;
    grado: number;
    asignatura: string;
    tema: string;
    source_url?: string;
    universal_question?: boolean;
    applicable_exams?: string[];
  };
};

/**
 * Clean metadata from explanation text
 * Removes validation metadata tables and other internal annotations
 */
function cleanExplanation(explanation: string | undefined): string | undefined {
  if (!explanation) return undefined;

  // Remove ## 📊 Metadata de Validación section and everything after
  let cleaned = explanation.replace(/##\s*📊\s*Metadata\s*de\s*Validación[\s\S]*/gi, '');

  // Remove markdown table lines starting with |
  cleaned = cleaned.replace(/^\|.*\|$/gm, '');

  // Remove lines that look like table separators |---|---|
  cleaned = cleaned.replace(/^\|[-:\s|]+\|$/gm, '');

  // Remove Source ID, Fecha de creación, Contexto cultural metadata lines
  cleaned = cleaned.replace(/^Source ID:.*$/gm, '');
  cleaned = cleaned.replace(/^Fecha de creación:.*$/gm, '');
  cleaned = cleaned.replace(/^Contexto cultural:.*$/gm, '');

  // Clean up excessive whitespace
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();

  return cleaned || undefined;
}

/**
 * Interface for a parsed question from a bundle
 */
export interface ParsedBundleQuestion {
  id: string;
  variantNumber: number;
  variantType: 'Original' | 'Fácil A' | 'Fácil B' | 'Media A' | 'Media B' | 'Difícil A' | 'Difícil B';
  difficulty: number;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation: string;
  competency?: string;
}

/**
 * Interface for bundle metadata
 */
export interface BundleMetadata {
  bundleId: string;
  totalQuestions: number;
  subject: string;
  topic: string;
  grade: number;
  sourceUrl?: string;
  universalQuestion?: boolean;
  applicableExams?: string[];
}

/**
 * Parse a legacy single-question format (# Pregunta, # Opciones, # Explicación)
 */
export function parseQuestion(entry: QuestionEntry): Question {
  const body = entry.body;
  const frontmatter = entry.data;

  // Check if it's a bundle format (has ## Pregunta sections)
  if (body.includes('## Pregunta') || body.includes('## Question')) {
    // Parse bundle and return first question for backwards compatibility
    const questions = parseBundleQuestions(entry);
    if (questions.length > 0) {
      return convertBundleQuestionToQuestion(questions[0], frontmatter);
    }
  }

  // Legacy format: # Pregunta, # Opciones, # Explicación
  const questionMatch = body.match(/# Pregunta\s+([\s\S]*?)(?=\n# Opciones)/);
  const questionText = questionMatch ? questionMatch[1].trim() : '';

  const optionsMatch = body.match(/# Opciones\s+([\s\S]*?)(?=\n# Explicación|$)/);
  const optionsBlock = optionsMatch ? optionsMatch[1].trim() : '';

  const options: Option[] = [];
  let correctOptionId = '';

  const optionLines = optionsBlock.split('\n');
  optionLines.forEach(line => {
    const match = line.match(/- \[(x| )\] ([A-Z])\) (.*)/);
    if (match) {
      const isCorrect = match[1] === 'x';
      const id = match[2];
      const text = match[3].trim();

      options.push({ id, text });
      if (isCorrect) {
        correctOptionId = id;
      }
    }
  });

  const explanationMatch = body.match(/# Explicación\s+([\s\S]*?)$/);
  const explanation = cleanExplanation(explanationMatch ? explanationMatch[1].trim() : undefined);

  return {
    id: entry.id,
    category: `${frontmatter.asignatura.toUpperCase()} :: ${frontmatter.tema.toUpperCase()}`,
    text: questionText,
    options,
    correctOptionId,
    explanation,
    grade: frontmatter.grado,
    difficulty: frontmatter.dificultad,
  };
}

/**
 * Parse all questions from a V2.1 bundle format
 */
export function parseBundleQuestions(entry: QuestionEntry): ParsedBundleQuestion[] {
  const body = entry.body;
  const questions: ParsedBundleQuestion[] = [];

  // Match ## Pregunta N or ## Question N sections
  const sectionRegex = /## (?:Pregunta|Question)\s+(\d+)\s*\(([^)]+)\)[\s\S]*?(?=## (?:Pregunta|Question)\s+\d+|## 📊|---\s*$|$)/gi;

  let match;
  while ((match = sectionRegex.exec(body)) !== null) {
    const sectionNumber = parseInt(match[1]);
    const sectionType = match[2].trim();
    const sectionContent = match[0];

    const question = parseQuestionSection(sectionContent, sectionNumber, sectionType, entry.data.id);
    if (question) {
      questions.push(question);
    }
  }

  return questions;
}

/**
 * Parse a single question section from the bundle
 */
function parseQuestionSection(
  content: string,
  sectionNumber: number,
  sectionType: string,
  bundleId: string
): ParsedBundleQuestion | null {
  // Extract ID
  const idMatch = content.match(/\*\*ID:\*\*\s*`([^`]+)`/);
  const questionId = idMatch ? idMatch[1] : `${bundleId}-v${sectionNumber}`;

  // Determine variant type and difficulty
  const variantInfo = parseVariantType(sectionType);

  // Extract enunciado/question text
  const enunciadoMatch = content.match(/### (?:Enunciado|Question)\s+([\s\S]*?)(?=### (?:Opciones|Options))/i);
  const questionText = enunciadoMatch ? enunciadoMatch[1].trim() : '';

  if (!questionText) {
    return null;
  }

  // Extract options
  const optionsMatch = content.match(/### (?:Opciones|Options)\s+([\s\S]*?)(?=### (?:Explicación|Explanation)|$)/i);
  const optionsBlock = optionsMatch ? optionsMatch[1].trim() : '';

  const options: Option[] = [];
  let correctOptionId = '';

  const optionLines = optionsBlock.split('\n');
  optionLines.forEach(line => {
    const match = line.match(/- \[(x| )\] ([A-Z])\)\s*(.*)/);
    if (match) {
      const isCorrect = match[1].toLowerCase() === 'x';
      const id = match[2];
      const text = match[3].trim();

      options.push({ id, text });
      if (isCorrect) {
        correctOptionId = id;
      }
    }
  });

  // Extract explanation
  const explanationMatch = content.match(/### (?:Explicación Pedagógica|Explanation)\s+([\s\S]*?)(?=---\s*$|## (?:Pregunta|Question)|$)/i);
  const explanation = cleanExplanation(explanationMatch ? explanationMatch[1].trim() : undefined) || '';

  // Extract competency
  const competencyMatch = content.match(/\*\*Competencia evaluada:\*\*\s*(.+)/i)
    || content.match(/\*\*Competency evaluated:\*\*\s*(.+)/i);
  const competency = competencyMatch ? competencyMatch[1].trim() : undefined;

  return {
    id: questionId,
    variantNumber: sectionNumber,
    variantType: variantInfo.type,
    difficulty: variantInfo.difficulty,
    text: questionText,
    options,
    correctOptionId,
    explanation,
    competency
  };
}

/**
 * Parse variant type from section header
 */
function parseVariantType(sectionType: string): { type: ParsedBundleQuestion['variantType'], difficulty: number } {
  const normalized = sectionType.toLowerCase();

  if (normalized.includes('original')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Original', difficulty: diffMatch ? parseInt(diffMatch[1]) : 3 };
  }
  if (normalized.includes('fácil a') || normalized.includes('easy a')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Fácil A', difficulty: diffMatch ? parseInt(diffMatch[1]) : 1 };
  }
  if (normalized.includes('fácil b') || normalized.includes('easy b')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Fácil B', difficulty: diffMatch ? parseInt(diffMatch[1]) : 2 };
  }
  if (normalized.includes('media a') || normalized.includes('medium a')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Media A', difficulty: diffMatch ? parseInt(diffMatch[1]) : 3 };
  }
  if (normalized.includes('media b') || normalized.includes('medium b')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Media B', difficulty: diffMatch ? parseInt(diffMatch[1]) : 3 };
  }
  if (normalized.includes('difícil a') || normalized.includes('difficult a') || normalized.includes('hard a')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Difícil A', difficulty: diffMatch ? parseInt(diffMatch[1]) : 4 };
  }
  if (normalized.includes('difícil b') || normalized.includes('difficult b') || normalized.includes('hard b')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Difícil B', difficulty: diffMatch ? parseInt(diffMatch[1]) : 5 };
  }

  // Default fallback
  return { type: 'Original', difficulty: 3 };
}

/**
 * Convert a ParsedBundleQuestion to the Question format used by ExamView
 */
function convertBundleQuestionToQuestion(
  bundleQuestion: ParsedBundleQuestion,
  frontmatter: QuestionEntry['data']
): Question {
  return {
    id: bundleQuestion.id,
    category: `${frontmatter.asignatura.toUpperCase()} :: ${frontmatter.tema.toUpperCase()}`,
    text: bundleQuestion.text,
    options: bundleQuestion.options,
    correctOptionId: bundleQuestion.correctOptionId,
    explanation: bundleQuestion.explanation,
    grade: frontmatter.grado,
    difficulty: bundleQuestion.difficulty,
  };
}

/**
 * Get a random question from a bundle
 */
export function getRandomQuestionFromBundle(entry: QuestionEntry): Question | null {
  const questions = parseBundleQuestions(entry);

  if (questions.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * questions.length);
  return convertBundleQuestionToQuestion(questions[randomIndex], entry.data);
}

/**
 * Get a question by difficulty from a bundle
 * @param targetDifficulty 1-5
 */
export function getQuestionByDifficulty(
  entry: QuestionEntry,
  targetDifficulty: number
): Question | null {
  const questions = parseBundleQuestions(entry);

  const matching = questions.filter(q => q.difficulty === targetDifficulty);

  if (matching.length === 0) {
    // Fallback: get closest difficulty
    const sorted = [...questions].sort(
      (a, b) => Math.abs(a.difficulty - targetDifficulty) - Math.abs(b.difficulty - targetDifficulty)
    );
    return sorted.length > 0
      ? convertBundleQuestionToQuestion(sorted[0], entry.data)
      : null;
  }

  const randomIndex = Math.floor(Math.random() * matching.length);
  return convertBundleQuestionToQuestion(matching[randomIndex], entry.data);
}

/**
 * Get all questions from a bundle as Question[] for ExamView
 */
export function getAllQuestionsFromBundle(entry: QuestionEntry): Question[] {
  const bundleQuestions = parseBundleQuestions(entry);
  return bundleQuestions.map(bq => convertBundleQuestionToQuestion(bq, entry.data));
}

/**
 * Check if an entry is a bundle (V2.1 format)
 */
export function isBundle(entry: QuestionEntry): boolean {
  return (
    (entry.data.total_questions !== undefined && entry.data.total_questions > 1) ||
    entry.body.includes('## Pregunta') ||
    entry.body.includes('## Question')
  );
}

/**
 * Get bundle metadata
 */
export function getBundleMetadata(entry: QuestionEntry): BundleMetadata {
  return {
    bundleId: entry.data.id,
    totalQuestions: entry.data.total_questions || 1,
    subject: entry.data.asignatura,
    topic: entry.data.tema,
    grade: entry.data.grado,
    sourceUrl: entry.data.source_url,
    universalQuestion: entry.data.universal_question,
    applicableExams: entry.data.applicable_exams,
  };
}

/**
 * Find all universal questions that match a language and exam type
 */
export function filterUniversalQuestions(
  entries: QuestionEntry[],
  sourceLang: string,
  examType?: string
): QuestionEntry[] {
  return entries.filter(entry => {
    const data = entry.data;

    // Must be marked as universal
    if (!data.universal_question) return false;

    // Must match source language
    if (data.source_lang !== sourceLang) return false;

    // If examType is provided, check if it's in applicable_exams
    if (examType && data.applicable_exams) {
      return data.applicable_exams.includes(examType);
    }

    return true;
  });
}
