/**
 * Universal Questions Service
 *
 * This service handles the logic for sharing questions between different
 * exam types that share the same language.
 *
 * DESIGN PRINCIPLES:
 * 1. Questions stay in their original directories - NO file reorganization
 * 2. Universality is determined by metadata fields in frontmatter
 * 3. Only questions marked as `universal_question: true` are candidates
 * 4. Filtering happens at runtime based on language and exam compatibility
 *
 * CRITERIA FOR UNIVERSAL QUESTIONS:
 * - Mathematical concepts (arithmetic, algebra, geometry basics)
 * - Scientific laws and theories
 * - Language skills (grammar, comprehension) without local references
 * - Reading comprehension with neutral content
 *
 * NOT UNIVERSAL (require local context):
 * - References to local curriculum standards (e.g., "ICFES", "SEP México")
 * - Local geography, history, or culture
 * - Local laws or government structure
 * - Currency or measurement systems specific to a country
 */

import { isBundle, getAllQuestionsFromBundle } from './questionParser';
import type { Question } from '../types';
import type { QuestionEntry } from './questionParser';

// ============================================
// TYPES
// ============================================

export interface UniversalQuestionPool {
  /** Language code (e.g., 'es', 'en', 'pt') */
  language: string;
  /** Total questions in the pool */
  totalQuestions: number;
  /** Questions grouped by subject */
  bySubject: Map<string, Question[]>;
  /** Questions grouped by grade */
  byGrade: Map<number, Question[]>;
  /** Questions grouped by difficulty */
  byDifficulty: Map<number, Question[]>;
  /** All questions flattened */
  all: Question[];
}

export interface QuestionSharingCriteria {
  /** Source language family (first 2 chars, e.g., 'es' from 'es-CO') */
  languageFamily: string;
  /** Target exam type to share with (optional filter) */
  targetExam?: string;
  /** Grade range to include (inclusive) */
  gradeRange?: { min: number; max: number };
  /** Subject filter (optional) */
  subject?: string;
  /** Difficulty filter (optional) */
  difficulty?: number;
}

// ============================================
// LANGUAGE CONFIGURATION
// ============================================

/**
 * Map of supported language families and their associated countries/exams
 */
export const LANGUAGE_FAMILIES = {
  'es': {
    name: 'Español',
    countries: ['CO', 'MX', 'ES', 'AR', 'CL', 'PE', 'VE', 'EC'],
    exams: [
      'CO-Saber11', 'CO-Saber9', 'CO-Saber5', 'CO-Saber3',
      'MX-ENLACE', 'MX-PLANEA', 'MX-EXANI',
      'ES-Selectividad', 'ES-EVAU', 'ES-EducaPrimaria',
      'AR-Aprender',
      'CL-SIMCE', 'CL-PSU'
    ]
  },
  'en': {
    name: 'English',
    countries: ['US', 'UK', 'CA', 'AU'],
    exams: ['US-SAT', 'US-ACT', 'UK-GCSE', 'UK-ALevel']
  },
  'pt': {
    name: 'Português',
    countries: ['BR', 'PT'],
    exams: ['BR-ENEM', 'PT-ExamesNacionais']
  }
};

/**
 * Extract language family from source_lang code
 * e.g., 'es-CO' -> 'es', 'en-US' -> 'en'
 */
export function getLanguageFamily(sourceLang: string): string {
  return sourceLang?.split('-')[0]?.toLowerCase() || 'es';
}

// ============================================
// UNIVERSALITY DETECTION
// ============================================

/**
 * Patterns that indicate LOCAL context (NOT universal)
 * These questions should NOT be shared with other countries
 */
const LOCAL_CONTEXT_PATTERNS = {
  // Colombian specific
  CO: [
    /\bICFES\b/i,
    /\bSaber\s*\d+/i,
    /\bBogotá\b/i,
    /\bMedellín\b/i,
    /\bCali\b/i,
    /\bCartagena\b/i,
    /\bpeso(s)?\s+colombiano/i,
    /\$\s*[\d.,]+\s*pesos/i,
    /\bConstitución.*1991\b/i,
    /\bACORD\b/i,
    /\bDIAN\b/i,
  ],
  // Mexican specific
  MX: [
    /\bSEP\b/i,
    /\bENLACE\b/i,
    /\bPLANEA\b/i,
    /\bCDMX\b/i,
    /\bGuadalajara\b/i,
    /\bMonterrey\b/i,
    /\bpeso(s)?\s+mexicano/i,
    /\bMXN\b/,
  ],
  // Spanish specific
  ES: [
    /\bSelectividad\b/i,
    /\bEVAU\b/i,
    /\bMadrid\b/i,
    /\bBarcelona\b/i,
    /\bEuro(s)?\b/i,
    /\b€\s*[\d.,]+/,
  ]
};

/**
 * Check if question content contains local context patterns
 */
export function hasLocalContext(text: string, countryCode?: string): boolean {
  // If country code specified, check that country's patterns
  if (countryCode && LOCAL_CONTEXT_PATTERNS[countryCode as keyof typeof LOCAL_CONTEXT_PATTERNS]) {
    const patterns = LOCAL_CONTEXT_PATTERNS[countryCode as keyof typeof LOCAL_CONTEXT_PATTERNS];
    return patterns.some(pattern => pattern.test(text));
  }

  // Check ALL patterns if no country specified
  for (const patterns of Object.values(LOCAL_CONTEXT_PATTERNS)) {
    if (patterns.some(pattern => pattern.test(text))) {
      return true;
    }
  }

  return false;
}

/**
 * Subjects that are typically more universal
 */
const UNIVERSAL_FRIENDLY_SUBJECTS = [
  'matemáticas',
  'matematicas',
  'mathematics',
  'ciencias naturales',
  'biología',
  'química',
  'física',
  'science',
  'biology',
  'chemistry',
  'physics',
];

/**
 * Check if a subject is typically universal
 */
export function isUniversalFriendlySubject(subject: string): boolean {
  const normalized = subject.toLowerCase();
  return UNIVERSAL_FRIENDLY_SUBJECTS.some(s => normalized.includes(s));
}

// ============================================
// UNIVERSAL QUESTION POOL BUILDER
// ============================================

/**
 * Build a pool of universal questions from a collection of entries
 *
 * @param entries - All question entries from the collection
 * @param criteria - Filtering criteria
 * @returns Universal question pool
 */
export function buildUniversalQuestionPool(
  entries: QuestionEntry[],
  criteria: QuestionSharingCriteria
): UniversalQuestionPool {
  const { languageFamily, targetExam, gradeRange, subject, difficulty } = criteria;

  const pool: UniversalQuestionPool = {
    language: languageFamily,
    totalQuestions: 0,
    bySubject: new Map(),
    byGrade: new Map(),
    byDifficulty: new Map(),
    all: []
  };

  for (const entry of entries) {
    const data = entry.data;

    // FILTER 1: Must be marked as universal
    if (!data.universal_question) continue;

    // FILTER 2: Language family must match
    const entryLangFamily = getLanguageFamily(data.source_lang || 'es-CO');
    if (entryLangFamily !== languageFamily) continue;

    // FILTER 3: If targetExam specified, check applicable_exams
    if (targetExam && data.applicable_exams) {
      if (!data.applicable_exams.includes(targetExam)) continue;
    }

    // FILTER 4: Grade range filter
    if (gradeRange) {
      if (data.grado < gradeRange.min || data.grado > gradeRange.max) continue;
    }

    // FILTER 5: Subject filter
    if (subject) {
      if (!data.asignatura.toLowerCase().includes(subject.toLowerCase())) continue;
    }

    // Extract questions from bundle or single entry
    let questions: Question[];
    if (isBundle(entry)) {
      questions = getAllQuestionsFromBundle(entry);
    } else {
      // Legacy single question format - would need parseQuestion
      // For now, skip non-bundles in universal pool
      continue;
    }

    // FILTER 6: Difficulty filter (applied per question)
    if (difficulty !== undefined) {
      questions = questions.filter(q => q.difficulty === difficulty);
    }

    // Add to pool
    for (const question of questions) {
      pool.all.push(question);

      // Index by subject
      const subjectKey = data.asignatura.toLowerCase();
      if (!pool.bySubject.has(subjectKey)) {
        pool.bySubject.set(subjectKey, []);
      }
      pool.bySubject.get(subjectKey)!.push(question);

      // Index by grade
      if (!pool.byGrade.has(data.grado)) {
        pool.byGrade.set(data.grado, []);
      }
      pool.byGrade.get(data.grado)!.push(question);

      // Index by difficulty
      if (!pool.byDifficulty.has(question.difficulty)) {
        pool.byDifficulty.set(question.difficulty, []);
      }
      pool.byDifficulty.get(question.difficulty)!.push(question);
    }
  }

  pool.totalQuestions = pool.all.length;
  return pool;
}

/**
 * Get random questions from the universal pool
 */
export function getRandomUniversalQuestions(
  pool: UniversalQuestionPool,
  count: number,
  options?: {
    subject?: string;
    grade?: number;
    difficulty?: number;
    excludeIds?: Set<string | number>;
  }
): Question[] {
  let candidates = [...pool.all];

  // Apply filters
  if (options?.subject && pool.bySubject.has(options.subject.toLowerCase())) {
    candidates = pool.bySubject.get(options.subject.toLowerCase())!;
  }

  if (options?.grade && pool.byGrade.has(options.grade)) {
    candidates = candidates.filter(q => pool.byGrade.get(options.grade!)!.includes(q));
  }

  if (options?.difficulty && pool.byDifficulty.has(options.difficulty)) {
    candidates = candidates.filter(q => q.difficulty === options.difficulty);
  }

  if (options?.excludeIds) {
    candidates = candidates.filter(q => !options.excludeIds!.has(q.id));
  }

  // Shuffle and take count
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ============================================
// EXAM CONFIGURATION
// ============================================

/**
 * Configuration for how an exam should use universal questions
 */
export interface ExamUniversalConfig {
  /** Exam identifier (e.g., 'CO-Saber11') */
  examId: string;
  /** Language family for this exam */
  languageFamily: string;
  /** What percentage of questions can come from universal pool (0-100) */
  universalPercentage: number;
  /** Minimum local questions required */
  minLocalQuestions: number;
  /** Subjects that should NEVER use universal questions */
  excludedSubjects: string[];
  /** Grade mapping if different from source */
  gradeMapping?: Record<number, number>;
}

/**
 * Default exam configurations
 */
export const EXAM_CONFIGS: Record<string, ExamUniversalConfig> = {
  'CO-Saber11': {
    examId: 'CO-Saber11',
    languageFamily: 'es',
    universalPercentage: 30, // Max 30% universal questions
    minLocalQuestions: 5,
    excludedSubjects: ['sociales', 'ciudadanas'], // These need local content
  },
  'CO-Saber3': {
    examId: 'CO-Saber3',
    languageFamily: 'es',
    universalPercentage: 50, // More universal for primary
    minLocalQuestions: 3,
    excludedSubjects: [],
  },
  'MX-ENLACE': {
    examId: 'MX-ENLACE',
    languageFamily: 'es',
    universalPercentage: 30,
    minLocalQuestions: 5,
    excludedSubjects: ['historia', 'cívica'],
  }
};

/**
 * Get exam configuration, with fallback defaults
 */
export function getExamConfig(examId: string): ExamUniversalConfig {
  return EXAM_CONFIGS[examId] || {
    examId,
    languageFamily: 'es',
    universalPercentage: 20,
    minLocalQuestions: 3,
    excludedSubjects: ['sociales', 'ciudadanas', 'historia'],
  };
}

// ============================================
// QUESTION MIXING SERVICE
// ============================================

/**
 * Mix local and universal questions for an exam
 *
 * This is the main function to call when building an exam.
 * It intelligently mixes local questions with universal ones
 * based on the exam configuration.
 */
export function mixQuestionsForExam(
  localQuestions: Question[],
  universalPool: UniversalQuestionPool,
  examId: string,
  targetCount: number
): Question[] {
  const config = getExamConfig(examId);

  // Calculate how many universal questions to include
  const maxUniversal = Math.floor(targetCount * (config.universalPercentage / 100));
  const minLocal = Math.max(config.minLocalQuestions, targetCount - maxUniversal);

  // Filter local questions (exclude subjects not allowed for universal mixing)
  const eligibleLocal = localQuestions.filter(
    q => !config.excludedSubjects.some(s => q.category.toLowerCase().includes(s))
  );

  // Start with required local questions
  const result: Question[] = [];
  const usedIds = new Set<string | number>();

  // Add local questions first (up to minLocal)
  const shuffledLocal = [...eligibleLocal].sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(minLocal, shuffledLocal.length); i++) {
    result.push(shuffledLocal[i]);
    usedIds.add(shuffledLocal[i].id);
  }

  // Fill remaining with a mix of universal and remaining local
  const remaining = targetCount - result.length;
  const universalToAdd = Math.min(maxUniversal, Math.floor(remaining * 0.5));

  // Add universal questions
  const universalQuestions = getRandomUniversalQuestions(universalPool, universalToAdd, {
    excludeIds: usedIds
  });

  for (const q of universalQuestions) {
    result.push(q);
    usedIds.add(q.id);
  }

  // Fill rest with more local questions
  for (const q of shuffledLocal) {
    if (result.length >= targetCount) break;
    if (!usedIds.has(q.id)) {
      result.push(q);
      usedIds.add(q.id);
    }
  }

  // Shuffle final result
  return result.sort(() => Math.random() - 0.5);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Analyze a collection and report universal question statistics
 */
export function analyzeUniversalQuestions(
  entries: QuestionEntry[]
): {
  totalBundles: number;
  universalBundles: number;
  byLanguage: Map<string, number>;
  bySubject: Map<string, { universal: number; local: number }>;
} {
  const stats = {
    totalBundles: 0,
    universalBundles: 0,
    byLanguage: new Map<string, number>(),
    bySubject: new Map<string, { universal: number; local: number }>()
  };

  for (const entry of entries) {
    if (!isBundle(entry)) continue;

    stats.totalBundles++;
    const data = entry.data;
    const langFamily = getLanguageFamily(data.source_lang || 'es-CO');
    const subject = data.asignatura.toLowerCase();

    // Initialize subject stats
    if (!stats.bySubject.has(subject)) {
      stats.bySubject.set(subject, { universal: 0, local: 0 });
    }

    if (data.universal_question) {
      stats.universalBundles++;
      stats.byLanguage.set(langFamily, (stats.byLanguage.get(langFamily) || 0) + 1);
      stats.bySubject.get(subject)!.universal++;
    } else {
      stats.bySubject.get(subject)!.local++;
    }
  }

  return stats;
}

/**
 * Suggest which bundles could be marked as universal
 */
export function suggestUniversalCandidates(
  entries: QuestionEntry[]
): QuestionEntry[] {
  const candidates: QuestionEntry[] = [];

  for (const entry of entries) {
    if (!isBundle(entry)) continue;
    const data = entry.data;

    // Skip already marked as universal
    if (data.universal_question) continue;

    // Check if subject is universal-friendly
    if (!isUniversalFriendlySubject(data.asignatura)) continue;

    // Check if content has local context
    if (hasLocalContext(entry.body)) continue;

    candidates.push(entry);
  }

  return candidates;
}
