/**
 * Question Transformer
 * Normalizes API questions into App questions with full validation
 *
 * Extracted from api-service.ts for better separation of concerns
 */

import { filterQuarantinedQuestions } from './questions/quarantine-registry';

/**
 * Normalize a subject string to a canonical key format
 */
export function normalizeSubjectKey(subject: string): string {
  const normalized = String(subject || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s-]+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/^_+|_+$/g, '');

  const aliasMap: Record<string, string> = {
    socialesyciudadanas: 'sociales_y_ciudadanas',
    sociales_ciudadanas: 'sociales_y_ciudadanas',
    sociales: 'sociales_y_ciudadanas',
    cienciasnaturales: 'ciencias_naturales',
    ciencias: 'ciencias_naturales',
    lectura_critica: 'lectura_critica',
    lecturacritica: 'lectura_critica',
    lenguaje: 'lectura_critica',
    tecnologiaeinformatica: 'tecnologia_informatica',
    tecnologiainformatica: 'tecnologia_informatica',
    english: 'ingles',
    matematica: 'matematicas'
  };
  return aliasMap[normalized] || normalized;
}

/**
 * Map string difficulty to numeric (1-5)
 */
export function mapDifficulty(difficulty: string | number): number {
  if (typeof difficulty === 'number') return Math.max(1, Math.min(5, Math.round(difficulty)));
  const map: Record<string, number> = { 'Low': 2, 'Medium': 3, 'High': 4, 'Very High': 5, 'Very Hard': 5, 'Muy Difícil': 5 };
  if (/^\d+$/.test(difficulty)) return Math.max(1, Math.min(5, parseInt(difficulty)));
  return map[difficulty] || 3;
}

/**
 * Clean explanation text by removing validation metadata tables and extra formatting
 */
export function cleanExplanation(explanation: string | undefined): string | undefined {
  if (!explanation) return undefined;
  let cleaned = explanation.replace(/##\s*📊\s*Metadata\s*de\s*Validación[\s\S]*/gi, '');
  cleaned = cleaned.replace(/^\|.*\|$/gm, '').replace(/^\|[-:\s|]+\|$/gm, '');
  cleaned = cleaned.replace(/^Source ID:.*$/gm, '').replace(/^Fecha de creación:.*$/gm, '').replace(/^Contexto cultural:.*$/gm, '');
  return cleaned.replace(/\n{3,}/g, '\n\n').trim() || undefined;
}

/**
 * Parse option text, extracting embedded feedback comments
 */
export function parseOptionContent(rawText: string | undefined): { text: string; feedback?: string } {
  const source = String(rawText || '');
  const feedbackMatch = source.match(/<!--\s*feedback:\s*([\s\S]*?)\s*-->/i);
  const cleanText = source.replace(/<!--[\s\S]*?-->/g, '').trim();
  const feedback = feedbackMatch?.[1]?.trim();

  return {
    text: cleanText,
    feedback: feedback || undefined
  };
}

/**
 * Derive options from statement text when options array is empty
 */
export function deriveOptionsFromStatement(
  statement: string | undefined,
  fallbackCorrectAnswer?: string
): {
  text: string;
  options: { id: string; text: string; feedback?: string }[];
  correctOptionId?: string;
} {
  const source = String(statement || '');
  const optionRegex = /(?:^|\n)\s*([A-D])\)\s*([\s\S]*?)(?=(?:\n\s*[A-D]\))|(?:\n\s*\*\*Respuesta:)|(?:\n\s*---)|$)/g;
  const options: { id: string; text: string; feedback?: string }[] = [];
  let match: RegExpExecArray | null;

  while ((match = optionRegex.exec(source)) !== null) {
    const parsedOption = parseOptionContent(match[2]);
    options.push({
      id: match[1],
      text: parsedOption.text.replace(/\n+/g, ' ').trim(),
      feedback: parsedOption.feedback
    });
  }

  const embeddedCorrectAnswer =
    source.match(/\*\*Respuesta:\s*([A-D])\*\*/i)?.[1]?.toUpperCase() ||
    source.match(/respuesta:\s*([A-D])/i)?.[1]?.toUpperCase();

  const cleanText = source
    .replace(optionRegex, '')
    .replace(/\n\s*\*\*Respuesta:[\s\S]*$/i, '')
    .replace(/\n\s*---[\s\S]*$/, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    text: cleanText || source,
    options,
    correctOptionId: embeddedCorrectAnswer || String(fallbackCorrectAnswer || '').trim().toUpperCase() || undefined
  };
}

/**
 * Format subject name for display
 */
export function formatSubjectName(subject: string): string {
  const subjectDisplayMap: Record<string, string> = {
    'matematicas': 'MATEMÁTICAS',
    'lectura_critica': 'LECTURA CRÍTICA',
    'ciencias_naturales': 'CIENCIAS NATURALES',
    'sociales_y_ciudadanas': 'SOCIALES Y CIUDADANAS',
    'ingles': 'INGLÉS',
    'informatica': 'INFORMÁTICA',
    'tecnologia_informatica': 'TECNOLOGÍA E INFORMÁTICA',
    'filosofia': 'FILOSOFÍA',
    'lenguaje': 'LENGUAJE',
  };
  const normalized = subject.toLowerCase().replace(/-/g, '_');
  return subjectDisplayMap[normalized] || subject.toUpperCase().replace(/[-_]/g, ' ');
}

/**
 * Get pack subject aliases for fallback lookups
 */
export function getPackSubjectAliases(subject: string): string[] {
  const normalized = normalizeSubjectKey(subject);
  switch (normalized) {
    case 'sociales_y_ciudadanas':
      return ['sociales', 'sociales_ciudadanas', 'ciencias_sociales', 'sociales_y_ciudadanas'];
    case 'lectura_critica':
      return ['lectura_critica', 'lectura-critica', 'lenguaje'];
    case 'lenguaje':
      return ['lenguaje', 'lectura_critica', 'lectura-critica'];
    case 'tecnologia_informatica':
      return ['tecnologia_informatica', 'tecnologia_e_informatica'];
    default:
      return [normalized];
  }
}

/**
 * Filter questions by subject from their category
 */
export function filterSubject(questions: AppQuestion[], normalizedSubject: string): AppQuestion[] {
  if (!normalizedSubject) return questions;
  return questions.filter((question) => normalizeSubjectKey(question.category.split(' :: ')[0]) === normalizedSubject);
}

/**
 * Filter out quarantined questions
 */
export function excludeQuarantinedAppQuestions(questions: AppQuestion[]): AppQuestion[] {
  return filterQuarantinedQuestions(questions);
}

export interface AppQuestion {
  id: string;
  text: string;
  options: { id: string; text: string; feedback?: string }[];
  correctOptionId: string;
  correctOptionIds?: string[];
  optionWeights?: Record<string, number>;
  scoringMode?: 'single' | 'multiple' | 'weighted';
  category: string;
  explanation?: string;
  grade: number;
  difficulty: number;
  bundleId?: string;
  context?: string;
  topics?: string[];
  period?: number;
  periodo?: number;
  modernContext?: boolean;
  contextType?: string;
  contextTags?: string[];
  video?: {
    availability: 'available' | 'pending' | 'missing';
    youtubeId?: string;
    youtubeUrl?: string;
    status?: string;
    updatedAt?: string;
  };
  protocol_version?: string;
  cefr_level?: string;
  country?: string;
}

/**
 * Transform an API question into an App question
 * This is the main normalizer function (~140 lines)
 */
export function transformQuestion(apiQuestion: any, grade: number, subject: string): AppQuestion {
  const rawOptions = apiQuestion.options || apiQuestion.opciones || [];
  const parsedFromStatement = rawOptions.length === 0
    ? deriveOptionsFromStatement(
        apiQuestion.statement || apiQuestion.text || apiQuestion.question || apiQuestion.enunciado || '',
        apiQuestion.correctOptionId || apiQuestion.correct_answer || apiQuestion.correctAnswer || apiQuestion.respuesta_correcta
      )
    : null;

  const normalizedOptionsSource = rawOptions.length > 0 ? rawOptions : parsedFromStatement?.options || [];
  const options = normalizedOptionsSource.map((opt: any, index: number) => {
    let id = opt.letter || opt.label || opt.letra || String.fromCharCode(65 + index);
    if (typeof id === 'string') id = id.replace(/\)\s*$/, '').trim();
    const parsedOption = parseOptionContent(opt.text || opt.texto || '');
    return {
      id,
      text: parsedOption.text,
      feedback: parsedOption.feedback
    };
  });

  const correctOptionIds = Array.isArray(apiQuestion.correctOptionIds)
    ? apiQuestion.correctOptionIds.map((id: any) => String(id).trim())
    : [];

  let correctOptionId = apiQuestion.correctOptionId || apiQuestion.correct_answer || apiQuestion.correctAnswer || apiQuestion.respuesta_correcta;
  if (!correctOptionId && parsedFromStatement?.correctOptionId) {
    correctOptionId = parsedFromStatement.correctOptionId;
  }
  if (!correctOptionId && correctOptionIds.length > 0) {
    correctOptionId = correctOptionIds[0];
  }
  if (!correctOptionId) {
    const correctOpt = rawOptions.find((opt: any) => opt.isCorrect || opt.is_correct || opt.es_correcta);
    let id = correctOpt?.letter || correctOpt?.label || correctOpt?.letra || options[0]?.id || 'A';
    if (typeof id === 'string') id = id.replace(/\)\s*$/, '').trim();
    correctOptionId = id;
  }

  const bundleId = apiQuestion.bundle_id || apiQuestion.bundleId || apiQuestion.id?.replace(/-v\d+$/, '') || '';

  return {
    id: apiQuestion.id || '',
    text: parsedFromStatement?.text || apiQuestion.statement || apiQuestion.text || apiQuestion.question || apiQuestion.enunciado || '',
    options,
    correctOptionId,
    category: `${formatSubjectName(subject)} :: ${bundleId}`,
    explanation: cleanExplanation(apiQuestion.explanation || apiQuestion.explicacion),
    grade: apiQuestion.grade || apiQuestion.grado || grade,
    difficulty: mapDifficulty(apiQuestion.difficulty || apiQuestion.dificultad || 'Medium'),
    bundleId,
    context: apiQuestion.context || apiQuestion.contexto,
    modernContext: apiQuestion.modern_context || apiQuestion.modernContext || false,
    contextType: apiQuestion.context_type || apiQuestion.contextType || undefined,
    contextTags: apiQuestion.context_tags || apiQuestion.contextTags || [],
    correctOptionIds: correctOptionIds.length ? correctOptionIds : undefined,
    optionWeights: apiQuestion.optionWeights || apiQuestion.option_weights || undefined,
    scoringMode: apiQuestion.scoringMode || apiQuestion.scoring_mode || undefined,
    topics: (apiQuestion.tema ? [apiQuestion.tema] : []).concat(apiQuestion.topics || apiQuestion.tags || []).filter(Boolean),
    period: apiQuestion.period || apiQuestion.periodo || undefined,
    periodo: apiQuestion.periodo || apiQuestion.period || undefined,
    cefr_level: apiQuestion.cefr_level || apiQuestion.target_cefr || undefined,
    protocol_version: apiQuestion.protocol_version || undefined,
    country: apiQuestion.country || undefined
  };
}
