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
    periodo?: number;    // 🆕 Period (1-4) from bundle frontmatter
    source_url?: string;
    universal_question?: boolean;
    applicable_exams?: string[];
    source_lang?: string;
    dificultad?: number;
    cefr_level?: string;
    cefrLevel?: string;
  };
};

/**
 * Clean metadata from explanation text
 * Removes validation metadata tables and other internal annotations
 */
export function cleanExplanation(explanation: string | undefined): string | undefined {
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
  context?: string;
  part?: string;
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
 * Normalize difficulty value to a number 1-5
 * Handles both numeric and text-based difficulty values
 */
export function normalizeDifficulty(difficulty: number | string | undefined): number {
  if (difficulty === undefined || difficulty === null) return 3;

  // If already a number, ensure it's in range 1-5
  if (typeof difficulty === 'number') {
    return Math.max(1, Math.min(5, Math.round(difficulty)));
  }

  // Handle text-based difficulty values (legacy format)
  const text = String(difficulty).toLowerCase().trim();

  // Map common text patterns to difficulty levels
  if (text.includes('very easy') || text.includes('muy fácil') || text.includes('muy facil')) return 1;
  if (text.includes('easy') || text.includes('low') || text.includes('fácil') || text.includes('facil') || text.includes('bajo')) return 2;
  if (text.includes('medium') || text.includes('media') || text.includes('medio')) return 3;
  if (text.includes('very hard') || text.includes('muy difícil') || text.includes('muy dificil')) return 5;
  if (text.includes('hard') || text.includes('high') || text.includes('difícil') || text.includes('dificil') || text.includes('alto')) return 4;
  if (text.includes('very hard') || text.includes('very difficult') || text.includes('muy difícil') || text.includes('muy dificil')) return 5;

  // Try to extract a number from the text
  const numMatch = text.match(/\d+/);
  if (numMatch) {
    const num = parseInt(numMatch[0]);
    return Math.max(1, Math.min(5, num));
  }

  // Default to medium difficulty
  return 3;
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
    const match = line.match(/^\s*-\s*\[([xX\s])\]\s*([A-Z])\)\s*(.*)/);
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
    difficulty: normalizeDifficulty(frontmatter.dificultad),
  };
}

/**
 * Parse all questions from a V2.1 bundle format
 */
export function parseBundleQuestions(entry: QuestionEntry): ParsedBundleQuestion[] {
  const body = entry.body;
  const questions: ParsedBundleQuestion[] = [];

  // Extract shared context (everything before the first question)
  // This captures "Texto A", "Texto B", etc.
  const firstQuestionMatch = body.match(/## (?:Pregunta|Question)\s+\d+/i);
  const contextEndIndex = firstQuestionMatch ? firstQuestionMatch.index : 0;
  let context = contextEndIndex ? body.substring(0, contextEndIndex).trim() : '';

  // Clean context: Remove metadata sections
  if (context) {
    // Remove === METADATA GLOBAL === and any content until next # header or end
    context = context.replace(/===\s*METADATA\s*GLOBAL\s*===[\s\S]*?(?=#|$)/gi, '');
    // Remove markdown tables (| ... |)
    context = context.replace(/^\|.*\|$/gm, '');
    // Remove table separators |---|---|
    context = context.replace(/^\|[-:\s|]+\|$/gm, '');
    // Remove horizontal rules
    context = context.replace(/^---+$/gm, '');
    // Remove # Bundle: headers
    context = context.replace(/^#\s*Bundle:.*$/gm, '');
    // Remove > **Fuente:** lines
    context = context.replace(/^>\s*\*\*Fuente:\*\*.*$/gm, '');
    // Remove > **Componente:** lines
    context = context.replace(/^>\s*\*\*Componente:\*\*.*$/gm, '');
    // Remove > **Competencias:** lines
    context = context.replace(/^>\s*\*\*Competencias:\*\*.*$/gm, '');
    // Remove # Topic: lines (e.g., "# Topic: Social Media Awareness (Grade 8)")
    // context = context.replace(/^#\s*Topic:.*$/gm, '');
    // Remove standalone (Grade N) patterns from remaining text
    context = context.replace(/\s*\(Grade\s*\d+\)/gi, '');
    // Clean excessive whitespace
    context = context.replace(/\n{3,}/g, '\n\n').trim();
  }

  // Match ## Pregunta N or ## Question N sections
  // We use ^|\n to ensure we match start of lines, preventing matches on inline text
  // We specifically look for "## " to avoid matching "### "
  const sectionRegex = /(?:^|\n)## (?:Pregunta|Question)\s+(\d+)\s*\(([^)]+)\)[\s\S]*?(?=(?:^|\n)## (?:Pregunta|Question)\s+\d+|(?:^|\n)## 📊 Metadata|---\s*$|$)/gi;

  let match;
  while ((match = sectionRegex.exec(body)) !== null) {
    const sectionNumber = parseInt(match[1]);
    const sectionType = match[2].trim();
    const sectionContent = match[0];

    const question = parseQuestionSection(sectionContent, sectionNumber, sectionType, entry.data.id);
    if (question) {
      // Merge global context with question-specific context if both exist
      if (context) {
        question.context = question.context
          ? `${context}\n\n${question.context}`
          : context;
      }
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

  // Extract question-specific context (optional)
  const contextMatch = content.match(/### (?:Contexto|Context)\s+([\s\S]*?)(?=### (?:Enunciado|Question|Opciones|Options))/i);
  const specificContext = contextMatch ? contextMatch[1].trim() : undefined;

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
    const match = line.match(/^\s*-\s*\[([xX\s])\]\s*([A-Z])\)\s*(.*)/i);
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
  // Look for header, then capture everything until:
  // 1. Horizontal rule (---) at end of line indicating section end
  // 2. Start of ANOTHER question section (## Pregunta/Question)
  // 3. End of string ($)
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
    competency,
    context: specificContext,
    part: sectionType.trim() // 🆕 Store the section type (e.g. "Part 1 - Vocabulary")
  };
}

/**
 * Parse variant type from section header
 * Supports both v2.1 (7 questions) and v3.0 (10 questions) formats
 */
function parseVariantType(sectionType: string): { type: ParsedBundleQuestion['variantType'], difficulty: number } {
  // Normalize: lowercase + remove accents for reliable matching
  const normalized = sectionType
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // v3.0 format: Muy Fácil A/B (difficulty 1)
  if (normalized.includes('muy fácil a') || normalized.includes('very easy a')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Fácil A', difficulty: diffMatch ? parseInt(diffMatch[1]) : 1 };
  }
  if (normalized.includes('muy fácil b') || normalized.includes('very easy b')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Fácil B', difficulty: diffMatch ? parseInt(diffMatch[1]) : 1 };
  }

  // v3.0 format: Muy Difícil A/B (difficulty 5)
  if (normalized.includes('muy difícil a') || normalized.includes('very hard a') || normalized.includes('very difficult a')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Difícil A', difficulty: diffMatch ? parseInt(diffMatch[1]) : 5 };
  }
  if (normalized.includes('muy difícil b') || normalized.includes('very hard b') || normalized.includes('very difficult b')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Difícil B', difficulty: diffMatch ? parseInt(diffMatch[1]) : 5 };
  }

  // v2.1 format: Original
  if (normalized.includes('original')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Original', difficulty: diffMatch ? parseInt(diffMatch[1]) : 3 };
  }

  // Both formats: Fácil A/B (difficulty 1-2)
  if (normalized.includes('fácil a') || normalized.includes('easy a')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Fácil A', difficulty: diffMatch ? parseInt(diffMatch[1]) : 1 };
  }
  if (normalized.includes('fácil b') || normalized.includes('easy b')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Fácil B', difficulty: diffMatch ? parseInt(diffMatch[1]) : 2 };
  }

  // Both formats: Media A/B (difficulty 3)
  if (normalized.includes('media a') || normalized.includes('medium a')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Media A', difficulty: diffMatch ? parseInt(diffMatch[1]) : 3 };
  }
  if (normalized.includes('media b') || normalized.includes('medium b')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Media B', difficulty: diffMatch ? parseInt(diffMatch[1]) : 3 };
  }

  // Both formats: Difícil A/B (difficulty 4-5)
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
    difficulty: normalizeDifficulty(bundleQuestion.difficulty),
    context: bundleQuestion.context,
    part: bundleQuestion.part, // 🆕 Pass through part
    cefrLevel: frontmatter.cefr_level || frontmatter.cefrLevel, // 🆕 Pass through CEFR
    competency: bundleQuestion.competency, // 🆕 Pass through Competency
    topic: frontmatter.tema, // 🆕 Pass through Topic
    period: frontmatter.periodo, // 🆕 Pass through Period
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

/**
 * Filtra preguntas según el plan de suscripción del usuario
 *
 * @param questions - Array de preguntas a filtrar
 * @param userPlan - Plan del usuario ('free' o 'institutional')
 * @returns Array de preguntas filtradas según el plan
 *
 * Reglas de licenciamiento (Protocol v2.1):
 * - Plan FREE: Solo v1 (CC BY-SA 4.0) - Pregunta de referencia
 * - Plan INSTITUTIONAL: Todas las variantes (v1-v7)
 *
 * Lógica:
 * - v1: CC BY-SA 4.0 (uso comercial permitido - marketing/SEO)
 * - v2-v7: CC BY-NC-SA 4.0 (solo no-comercial - premium)
 *
 * Según FAQ Creative Commons, vender servicios/software basados en contenido
 * BY-NC es legal (vendemos Party Mode, no las preguntas directamente).
 *
 * Casos análogos: GitHub, WordPress.com, Red Hat
 */
export function filterByPlan(
  questions: Question[],
  userPlan: 'free' | 'institutional'
): Question[] {
  if (userPlan === 'free') {
    // Plan gratuito: Solo preguntas v1 (referencia, uso comercial permitido)
    return questions.filter(q => {
      const id = String(q.id);
      return id.endsWith('-v1');
    });
  }

  // Plan institucional: Acceso a todas las variantes (v1-v7)
  return questions;
}
