/**
 * API Service for consuming questions from WorldExams API
 * This service fetches questions from the API with JWT authentication
 *
 * 🆕 Now supports Rotating Packs system for anti-scraping protection
 *
 * This file is now a thin facade that orchestrates:
 * - pack-fetcher.ts: fetchQuestionsFromPacks()
 * - question-transformer.ts: transformQuestion() and related utilities
 * - question-cache.ts: in-memory and persistent cache management
 */

// ─── Types (re-exported for backward compatibility) ──────────────────────────

export interface APIQuestion {
  id: string;
  number: number;
  statement: string;
  options: {
    letter: string;
    text: string;
    is_correct: boolean;
  }[];
  correct_answer: string;
  explanation: string;
  difficulty: string;
  bundle_id: string;
  source_url: string;
  tema?: string;
  periodo?: number;
  tags: string[];
  images: string[];
  context?: string;
  modern_context?: boolean;
  context_type?: string;
  context_tags?: string[];
  protocol_version?: string;
  cefr_level?: string;
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
  meta?: {
    cefr_level?: string;
    cefrLevel?: string;
    difficulty?: number;
  };
}

// ─── Transformer re-exports ─────────────────────────────────────────────────

export {
  transformQuestion,
  mapDifficulty,
  cleanExplanation,
  parseOptionContent,
  deriveOptionsFromStatement,
  formatSubjectName,
  getPackSubjectAliases,
  filterSubject,
  excludeQuarantinedAppQuestions,
  normalizeSubjectKey
} from './question-transformer';

// ─── Pack fetcher re-exports ──────────────────────────────────────────────────

export { fetchQuestionsFromPacks } from './pack-fetcher';

// ─── Cache re-exports ───────────────────────────────────────────────────────

export {
  questionCache,
  clearCache,
  saveKnownQuestions,
  getCachedEnglishQuestions,
  getAnsweredQuestionIds,
  getAllLocalResults
} from './question-cache';

// ─── Additional imports (not split) ─────────────────────────────────────────

import { getQuestionPool } from './pack-storage';
import { calculateEnglishProficiencyV2, examResultsToQuestionResults } from './english-proficiency';
import { generateStudyPlan } from './notebooklm/curriculum-service';
import { isQuestionQuarantined } from './questions/quarantine-registry';
import { questionCache, clearCache, saveKnownQuestions, getCachedEnglishQuestions, getAnsweredQuestionIds, getAllLocalResults } from './question-cache';
import { fetchQuestionsFromPacks } from './pack-fetcher';
import { normalizeSubjectKey } from './question-transformer';
import { filterSubject, excludeQuarantinedAppQuestions } from './question-transformer';
import { transformQuestion } from './question-transformer';

// ─── Main API Functions ──────────────────────────────────────────────────────

export async function fetchQuestions(grade: number, subject: string, page: number = 1): Promise<AppQuestion[]> {
  const normalizedSubject = normalizeSubjectKey(subject);
  const cacheKey = `${grade}-${normalizedSubject}-${page}`;
  if (questionCache.has(cacheKey)) return questionCache.get(cacheKey)!;
  const questions = await fetchQuestionsFromPacks(grade, normalizedSubject, page);
  questionCache.set(cacheKey, questions);
  return questions;
}

export async function getAvailableSubjects(grade: number): Promise<string[]> {
  const subjectMap: Record<number, string[]> = {
    3: ['matematicas', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
    5: ['matematicas', 'lectura_critica', 'ciencias_naturales', 'sociales_y_ciudadanas', 'lenguaje'],
    6: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas', 'lenguaje'],
    7: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
    8: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas', 'lenguaje'],
    9: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
    10: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
    11: ['matematicas', 'lectura_critica', 'ciencias_naturales', 'sociales_y_ciudadanas', 'ingles']
  };
  return subjectMap[grade] || subjectMap[11];
}

export async function fetchAllQuestionsForGrade(grade: number, isGuest: boolean = true, maxQuestions: number = 300): Promise<AppQuestion[]> {
  const subjects = await getAvailableSubjects(grade);
  const maxPages = grade === 11
    ? 1
    : Math.max(1, Math.min(10, Math.ceil(maxQuestions / 10)));
  const results: AppQuestion[][] = [];

  for (const subject of subjects) {
    for (let page = 1; page <= maxPages; page++) {
      const pageQuestions = await fetchQuestionsFromPacks(grade, subject, page);
      if (pageQuestions.length === 0) break;
      results.push(pageQuestions);
      if (pageQuestions.length < 10) break;
    }
  }

  const dedup = new Map<string, AppQuestion>();
  results.flat().forEach(q => { if (q?.id && !dedup.has(q.id)) dedup.set(q.id, q); });
  const final = excludeQuarantinedAppQuestions(Array.from(dedup.values()));
  return final.sort(() => Math.random() - 0.5).slice(0, isGuest ? maxQuestions : Infinity);
}

export async function fetchQuestionsForGrade(grade: number, maxQuestions: number = 300): Promise<AppQuestion[]> {
  return fetchAllQuestionsForGrade(grade, true, maxQuestions);
}

// English Diagnostic Functions

export function getGradesForCEFRLevel(levelNum: number, range: number = 1): number[] {
  const levels = [3, 5, 6, 7, 8, 9, 10, 11];
  const idx = levelNum - 1;
  return levels.slice(Math.max(0, idx - range), Math.min(levels.length, idx + range + 1));
}

export async function getSavedEnglishProficiencyLevel(): Promise<{ level: string, levelNum: number } | null> {
  try {
    const results = await getAllLocalResults();
    const englishResults = results.filter(r => r.subject?.toLowerCase().includes('inglés') || r.subject?.toLowerCase().includes('ingles'));

    if (englishResults.length === 0) return null;

    const latest = englishResults[0];
    const resultsFormatted = examResultsToQuestionResults(latest.details.map(d => ({
      id: d.questionId,
      userAnswer: d.isCorrect ? 'A' : 'B',
      correctOptionId: 'A',
      cefrLevel: d.cefrLevel || d.cefr_level,
      grade: latest.grade,
      difficulty: d.difficulty
    })));

    const proficiency = calculateEnglishProficiencyV2(resultsFormatted);
    return {
      level: proficiency.estimatedLevel,
      levelNum: proficiency.estimatedLevelNum
    };
  } catch (e) {
    console.warn('Error fetching saved proficiency:', e);
    return null;
  }
}

export async function fetchEnglishQuestionsAllGrades(limit: number = 30, _balanced: boolean = false, cefrLevelNum?: number): Promise<AppQuestion[]> {
  const savedProficiency = await getSavedEnglishProficiencyLevel();
  const levelNum = cefrLevelNum ?? (savedProficiency?.levelNum || 1);
  const isHighLevel = levelNum >= 6;
  const ALL_GRADES = isHighLevel ? [9, 10, 11] : [3, 4, 5, 6, 7, 8, 9, 10, 11];
  const answeredIds = await getAnsweredQuestionIds(14, false);

  const { mapDifficulty } = await import('./question-transformer');

  const gradeResults = await Promise.all(ALL_GRADES.map(async (grade) => {
    const localPool = getQuestionPool(grade);
    const hasEnglishInPool = localPool.some(q => {
      const rawSubject = String((q as any).asignatura || (q as any).subject || (q as any).category?.split('::')[0] || '');
      return normalizeSubjectKey(rawSubject) === 'ingles';
    });

    const questions = hasEnglishInPool
      ? localPool
      : await fetchQuestionsFromPacks(grade, 'ingles');

    if (!Array.isArray(questions) || questions.length === 0) return [];

    return questions.filter(q => {
      if (isQuestionQuarantined({
        questionId: (q as any).id,
        bundleId: (q as any).bundleId,
        bundle_id: (q as any).bundle_id,
        quarantine: (q as any).quarantine,
        bundleStatus: (q as any).bundleStatus,
      })) return false;

      const rawSubject = String((q as any).asignatura || (q as any).subject || (q as any).category?.split('::')[0] || '');
      const normalizedSubject = normalizeSubjectKey(rawSubject);
      const tags = Array.isArray((q as any).tags) ? (q as any).tags : Array.isArray((q as any).topics) ? (q as any).topics : [];
      const isEnglish = normalizedSubject === 'ingles' || tags.some((t: string) => t.toLowerCase().includes('inglés') || t.toLowerCase().includes('ingles'));
      if (!isEnglish) return false;
      const isNotAnswered = !answeredIds.has(q.id);
      const protocol = String(q.protocol_version || '3.1');
      const isNewProtocol = protocol.startsWith('4.');

      if (isHighLevel) {
        return isNotAnswered && isNewProtocol;
      } else {
        if (grade >= 10) {
          return isNotAnswered && mapDifficulty(q.difficulty || 'Medium') <= 2;
        }
        return isNotAnswered;
      }
    }).map(q => {
      if ('correctOptionId' in (q as any) && 'text' in (q as any)) {
        return q as AppQuestion;
      }
      return transformQuestion(q, grade, 'ingles');
    });
  }));

  let unique = Array.from(new Map(gradeResults.flat().map(q => [q.id, q])).values());
  unique = excludeQuarantinedAppQuestions(unique);
  unique = unique.sort(() => Math.random() - 0.5);
  return limit > 0 ? unique.slice(0, limit) : unique;
}

export async function generateHistoricalEnglishProficiency(): Promise<any> {
  const results = await getAllLocalResults();
  const allQuestions = await getCachedEnglishQuestions();
  const qMap = new Map(allQuestions.map(q => [String(q.id), q]));
  let accumulated: any[] = [];
  results.forEach(exam => {
    exam.details?.forEach((d: any) => {
      const q = qMap.get(String(d.questionId));
      const cefr = d.cefrLevel || q?.periodo;
      if (cefr || exam.subject?.toLowerCase().includes('ingl')) {
        accumulated.push({
          id: d.questionId,
          userAnswer: d.isCorrect ? 'MATCH' : 'MISMATCH',
          correctOptionId: 'MATCH',
          cefrLevel: cefr,
          topics: q?.topics || (q?.category ? [q.category.split(' :: ')[1]] : undefined)
        });
      }
    });
  });
  if (accumulated.length === 0) return null;
  return calculateEnglishProficiencyV2(examResultsToQuestionResults(accumulated));
}

export async function getEffectiveEnglishLevel(): Promise<any> {
  const res = await generateHistoricalEnglishProficiency();
  return res ? { level: res.estimatedLevel, confidence: res.confidence, count: res.totalQuestions } : null;
}

export function saveEnglishProficiencyLevel(level: string, levelNum: number, confidence: number): void {
  localStorage.setItem('english_proficiency_level', JSON.stringify({ level, levelNum, confidence, diagnosedAt: new Date().toISOString() }));
}

export async function fetchBulkQuestions(grades: number[], limit: number = 300): Promise<AppQuestion[]> {
  const cacheKey = `bulk_${grades.join('_')}`;
  if (questionCache.has(cacheKey)) return questionCache.get(cacheKey)!;
  const results = await Promise.all(grades.map(g => fetchQuestionsFromPacks(g)));
  const dedup = new Map<string, AppQuestion>();
  results.flat().forEach(q => { if (q?.id && !dedup.has(q.id)) dedup.set(q.id, q); });
  let final = excludeQuarantinedAppQuestions(Array.from(dedup.values()));
  if (limit && final.length > limit) final = final.sort(() => Math.random() - 0.5).slice(0, limit);
  questionCache.set(cacheKey, final);
  saveKnownQuestions(final).catch(() => {});
  return final;
}

export async function prefetchEnglishPool(): Promise<void> {
  await fetchEnglishQuestionsAllGrades(400);
}

export { calculateEnglishProficiencyV2 as calculateEnglishProficiency };
export { calculateEnglishProficiencyV2 };
export { examResultsToQuestionResults };
export { generateStudyPlan };
