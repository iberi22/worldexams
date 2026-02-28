/**
 * API Service for consuming questions from WorldExams API
 * This service fetches questions from the API with JWT authentication
 *
 * 🆕 Now supports Rotating Packs system for anti-scraping protection
 */

import { supabase } from './supabase';
import {
  getQuestionPool
} from './pack-storage';

import {
  saveKnownQuestions,
  getCachedEnglishQuestions,
  getAnsweredQuestionIds,
  getAllLocalResults
} from './idb-storage';

import {
  calculateEnglishProficiencyV2,
  examResultsToQuestionResults
} from './english-proficiency';

import {
  generateStudyPlan
} from './notebooklm/curriculum-service';

const IS_DEV_MODE = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

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
}

export interface AppQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  category: string;
  explanation?: string;
  grade: number;
  difficulty: number;
  bundleId?: string;
  context?: string;
  topics?: string[];
  periodo?: number;
  modernContext?: boolean;
  contextType?: string;
  contextTags?: string[];
}

const questionCache: Map<string, AppQuestion[]> = new Map();

function mapDifficulty(difficulty: string | number): number {
  if (typeof difficulty === 'number') return Math.max(1, Math.min(5, Math.round(difficulty)));
  const map: Record<string, number> = { 'Low': 2, 'Medium': 3, 'High': 4, 'Very High': 5, 'Very Hard': 5, 'Muy Difícil': 5 };
  if (/^\d+$/.test(difficulty)) return Math.max(1, Math.min(5, parseInt(difficulty)));
  return map[difficulty] || 3;
}

function cleanExplanation(explanation: string | undefined): string | undefined {
  if (!explanation) return undefined;
  let cleaned = explanation.replace(/##\s*📊\s*Metadata\s*de\s*Validación[\s\S]*/gi, '');
  cleaned = cleaned.replace(/^\|.*\|$/gm, '').replace(/^\|[-:\s|]+\|$/gm, '');
  cleaned = cleaned.replace(/^Source ID:.*$/gm, '').replace(/^Fecha de creación:.*$/gm, '').replace(/^Contexto cultural:.*$/gm, '');
  return cleaned.replace(/\n{3,}/g, '\n\n').trim() || undefined;
}

function formatSubjectName(subject: string): string {
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

export function normalizeSubjectKey(subject: string): string {
  const normalized = String(subject || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s-]+/g, '_').replace(/[^a-z0-9_]/g, '').trim();
  const aliasMap: Record<string, string> = { socialesyciudadanas: 'sociales_y_ciudadanas', sociales_ciudadanas: 'sociales_y_ciudadanas', cienciasnaturales: 'ciencias_naturales', lectura_critica: 'lectura_critica', lecturacritica: 'lectura_critica', tecnologiaeinformatica: 'tecnologia_informatica', tecnologiainformatica: 'tecnologia_informatica' };
  return aliasMap[normalized] || normalized;
}

export function transformQuestion(apiQuestion: any, grade: number, subject: string): AppQuestion {
  const rawOptions = apiQuestion.options || apiQuestion.opciones || [];
  const options = rawOptions.map((opt: any, index: number) => {
    let id = opt.letter || opt.label || opt.letra || String.fromCharCode(65 + index);
    if (typeof id === 'string') id = id.replace(/\)\s*$/, '').trim();
    return { id, text: opt.text || opt.texto || '' };
  });

  let correctOptionId = apiQuestion.correctOptionId || apiQuestion.correct_answer || apiQuestion.correctAnswer || apiQuestion.respuesta_correcta;
  if (!correctOptionId) {
    const correctOpt = rawOptions.find((opt: any) => opt.isCorrect || opt.is_correct || opt.es_correcta);
    let id = correctOpt?.letter || correctOpt?.label || correctOpt?.letra || options[0]?.id || 'A';
    if (typeof id === 'string') id = id.replace(/\)\s*$/, '').trim();
    correctOptionId = id;
  }

  const bundleId = apiQuestion.bundle_id || apiQuestion.bundleId || apiQuestion.id?.replace(/-v\d+$/, '') || '';

  return {
    id: apiQuestion.id || '',
    text: apiQuestion.statement || apiQuestion.text || apiQuestion.question || apiQuestion.enunciado || '',
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
    topics: (apiQuestion.tema ? [apiQuestion.tema] : []).concat(apiQuestion.topics || apiQuestion.tags || []).filter(Boolean),
    periodo: apiQuestion.periodo || undefined
  };
}

export async function fetchQuestionsFromPacks(grade: number, subject?: string): Promise<AppQuestion[]> {
  const ANCHOR_DATE = new Date('2025-01-01T00:00:00Z').getTime();
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const currentWeek = Math.max(1, Math.ceil((Date.now() - ANCHOR_DATE) / ONE_WEEK_MS) % 52 || 52);

  try {
    const normalizedSubject = normalizeSubjectKey(subject || '');
    const subjectPackUrl = normalizedSubject ? `/api/packs/week-${currentWeek}-grade-${grade}-subject-${normalizedSubject}.json` : '';
    const legacyPackUrl = `/api/packs/week-${currentWeek}-grade-${grade}.json`;

    let response: Response | null = null;
    if (subjectPackUrl) {
      const subjectResponse = await fetch(subjectPackUrl);
      if (subjectResponse.ok) response = subjectResponse;
    }
    if (!response) {
      const legacyResponse = await fetch(legacyPackUrl);
      if (!legacyResponse.ok) {
        const fallback = getQuestionPool(grade).map((q: any) => transformQuestion(q, grade, normalizeSubjectKey(q.subject || subject || 'unknown')));
        return normalizedSubject ? fallback.filter(q => normalizeSubjectKey(q.category.split(' :: ')[0]) === normalizedSubject) : fallback;
      }
      response = legacyResponse;
    }

    const packData = await response.json();
    if (!packData?.questions) return [];

    const appQuestions: AppQuestion[] = packData.questions.map((q: any) => {
        const qSubject = normalizeSubjectKey(q.subject || packData.subject || subject || 'unknown');
        if (q.options?.length && !q.options[0].id) {
            q.options = q.options.map((o: any, i: number) => ({ ...o, id: ['A','B','C','D'][i] || String(i) }));
        }
        return transformQuestion(q, grade, qSubject);
    });

    return normalizedSubject ? appQuestions.filter(q => normalizeSubjectKey(q.category.split(' :: ')[0]) === normalizedSubject) : appQuestions;
  } catch (err) {
    console.error(`❌ Error fetching pack:`, err);
    return [];
  }
}

export async function fetchQuestions(grade: number, subject: string, page: number = 1): Promise<AppQuestion[]> {
  const normalizedSubject = normalizeSubjectKey(subject);
  const cacheKey = `${grade}-${normalizedSubject}-${page}`;
  if (questionCache.has(cacheKey)) return questionCache.get(cacheKey)!;
  if (page > 1) return [];
  const questions = await fetchQuestionsFromPacks(grade, normalizedSubject);
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

export async function fetchAllQuestionsForGrade(grade: number, isGuest: boolean = true, maxQuestions: number = 100): Promise<AppQuestion[]> {
  const subjects = await getAvailableSubjects(grade);
  const results = await Promise.all(subjects.map(s => fetchQuestionsFromPacks(grade, s)));
  const dedup = new Map<string, AppQuestion>();
  results.flat().forEach(q => { if (q?.id && !dedup.has(q.id)) dedup.set(q.id, q); });
  const final = Array.from(dedup.values());
  return final.sort(() => Math.random() - 0.5).slice(0, isGuest ? maxQuestions : Infinity);
}

// English Diagnostic Functions
export function getSavedEnglishProficiencyLevel(): any {
  if (typeof localStorage === 'undefined') return null;
  const stored = localStorage.getItem('english_proficiency_level');
  return stored ? JSON.parse(stored) : null;
}

export function getGradesForCEFRLevel(levelNum: number, range: number = 1): number[] {
  const levels = [3, 5, 6, 7, 8, 9, 10, 11];
  const idx = levelNum - 1;
  return levels.slice(Math.max(0, idx - range), Math.min(levels.length, idx + range + 1));
}

export async function fetchEnglishQuestionsAllGrades(limit: number = 30, balanced: boolean = true): Promise<AppQuestion[]> {
  const ALL_GRADES = [3, 5, 6, 7, 8, 9, 10, 11];
  const answeredIds = await getAnsweredQuestionIds(14, false);
  const gradeResults = await Promise.all(ALL_GRADES.map(async (grade) => {
    const questions = await fetchQuestionsFromPacks(grade, 'ingles');
    return questions.filter(q => !answeredIds.has(q.id)).map(q => ({
      ...q,
      sourceGrade: grade,
      category: `INGLÉS :: ${q.bundleId || 'general'}`
    }));
  }));
  let unique = Array.from(new Map(gradeResults.flat().map(q => [q.id, q])).values());
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
            const cefr = d.cefrLevel || q?.periodo; // Use periodo as fallback for level if needed or just skip
            if (cefr || exam.subject?.toLowerCase().includes('ingl')) {
                accumulated.push({ id: d.questionId, userAnswer: d.isCorrect ? 'MATCH' : 'MISMATCH', correctOptionId: 'MATCH', cefrLevel: cefr });
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
  let final = Array.from(dedup.values());
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

export function clearCache(): void { questionCache.clear(); }
