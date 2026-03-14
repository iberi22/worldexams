/**
 * API Service for consuming questions from WorldExams API
 * This service fetches questions from the API with JWT authentication
 *
 * 🆕 Now supports Rotating Packs system for anti-scraping protection
 */

import {
  getQuestionPool,
  savePack
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
  options: { id: string; text: string }[];
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
}

const questionCache: Map<string, AppQuestion[]> = new Map();

function getConfiguredApiBaseUrl(): string {
  if (typeof document !== 'undefined') {
    const config = document.getElementById('api-config');
    if (config?.textContent) {
      try {
        const parsed = JSON.parse(config.textContent);
        if (parsed?.apiBaseUrl) return String(parsed.apiBaseUrl);
      } catch {
        // Fall through to defaults.
      }
    }
  }

  return '/api';
}

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

export function transformQuestion(apiQuestion: any, grade: number, subject: string): AppQuestion {
  const rawOptions = apiQuestion.options || apiQuestion.opciones || [];
  const options = rawOptions.map((opt: any, index: number) => {
    let id = opt.letter || opt.label || opt.letra || String.fromCharCode(65 + index);
    if (typeof id === 'string') id = id.replace(/\)\s*$/, '').trim();
    return { id, text: opt.text || opt.texto || '' };
  });

  const correctOptionIds = Array.isArray(apiQuestion.correctOptionIds)
    ? apiQuestion.correctOptionIds.map((id: any) => String(id).trim())
    : [];

  let correctOptionId = apiQuestion.correctOptionId || apiQuestion.correct_answer || apiQuestion.correctAnswer || apiQuestion.respuesta_correcta;
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
    correctOptionIds: correctOptionIds.length ? correctOptionIds : undefined,
    optionWeights: apiQuestion.optionWeights || apiQuestion.option_weights || undefined,
    scoringMode: apiQuestion.scoringMode || apiQuestion.scoring_mode || undefined,
    topics: (apiQuestion.tema ? [apiQuestion.tema] : []).concat(apiQuestion.topics || apiQuestion.tags || []).filter(Boolean),
    period: apiQuestion.period || apiQuestion.periodo || undefined,
    periodo: apiQuestion.periodo || apiQuestion.period || undefined,
    cefr_level: apiQuestion.cefr_level || undefined,
    protocol_version: apiQuestion.protocol_version || undefined
  };
}

export async function fetchQuestionsFromPacks(grade: number, subject?: string, page: number = 1): Promise<AppQuestion[]> {
  const ANCHOR_DATE = new Date('2025-01-01T00:00:00Z').getTime();
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const currentWeek = Math.max(1, Math.ceil((Date.now() - ANCHOR_DATE) / ONE_WEEK_MS) % 52 || 52);
  const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '');
  const baseOrigin =
    !isJsdom
    && typeof window !== 'undefined'
    && typeof window.location !== 'undefined'
    && /^https?:/i.test(window.location.origin)
      ? window.location.origin
      : '';
  const canUseRelativeFetch = Boolean(baseOrigin);
  const resolvePackUrl = (path: string) => baseOrigin ? new URL(path, baseOrigin).toString() : path;

  try {
    const normalizedSubject = normalizeSubjectKey(subject || '');
    const apiBaseUrl = getConfiguredApiBaseUrl().replace(/\/+$/, '');

    try {
      const query = new URLSearchParams({
        country: 'co',
        exam: 'icfes',
        grade: String(grade),
        page: String(Math.max(1, page))
      });

      if (normalizedSubject) query.set('subject', normalizedSubject);

      const apiResponse = await fetch(`${apiBaseUrl}/questions?${query.toString()}`);
      if (apiResponse.ok) {
        const payload = await apiResponse.json();
        const rawQuestions = Array.isArray(payload?.questions) ? payload.questions : [];
        if (rawQuestions.length > 0) {
          if (normalizedSubject) {
            savePack({
              packId: String(payload?.meta?.pack_id || payload?.meta?.packId || `api-week-${currentWeek}`),
              grade,
              subject: normalizedSubject,
              questions: rawQuestions,
              downloadedAt: Date.now(),
              questionCount: rawQuestions.length
            });
          }

          const appQuestions: AppQuestion[] = rawQuestions.map((q: any) => {
            const qSubject = normalizeSubjectKey(q.subject || payload?.meta?.subject || subject || 'unknown');
            if (q.options?.length && !q.options[0].id) {
              q.options = q.options.map((o: any, i: number) => ({ ...o, id: ['A', 'B', 'C', 'D', 'E'][i] || String(i) }));
            }
            return transformQuestion(q, grade, qSubject);
          });

          return normalizedSubject
            ? appQuestions.filter(q => normalizeSubjectKey(q.category.split(' :: ')[0]) === normalizedSubject)
            : appQuestions;
        }
      }
    } catch (apiError) {
      console.warn('Falling back to local packs:', apiError);
    }

    // List of candidate URLs to try for subject-specific packs
    const subjectCandidatePaths: string[] = [];
    if (normalizedSubject) {
      subjectCandidatePaths.push(`/api/packs/week-${currentWeek}-grade-${grade}-subject-${normalizedSubject}.json`);
    }

    // List of candidate URLs for legacy grade packs
    const legacyCandidatePaths = [
      `/api/packs/week-${currentWeek}-grade-${grade}.json`,
      `/api/packs/week-1-grade-${grade}.json`
    ];

    if (!canUseRelativeFetch) {
      const fallback = getQuestionPool(grade).map((q: any) => transformQuestion(q, grade, normalizeSubjectKey(q.subject || subject || 'unknown')));
      return normalizedSubject ? fallback.filter(q => normalizeSubjectKey(q.category.split(' :: ')[0]) === normalizedSubject) : fallback;
    }

    let response: Response | null = null;

    // Try subject-specific candidates first
    for (const path of subjectCandidatePaths) {
      try {
        const url = resolvePackUrl(path);
        // Silent check with HEAD if possible, though not all servers support it for static files.
        // We use a regular fetch but the goal is to stop the console from being flooded.
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) {
           const actualRes = await fetch(url);
           if (actualRes.ok) {
             response = actualRes;
             break;
           }
        }
      } catch (e) { /* continue */ }
    }

    // Try legacy candidates if no subject-specific pack was found
    if (!response) {
      for (const path of legacyCandidatePaths) {
        try {
          const url = resolvePackUrl(path);
          const res = await fetch(url, { method: 'HEAD' });
          if (res.ok) {
            const actualRes = await fetch(url);
            if (actualRes.ok) {
              response = actualRes;
              break;
            }
          }
        } catch (e) { /* continue */ }
      }
    }

    if (!response) {
      const fallback = getQuestionPool(grade).map((q: any) => transformQuestion(q, grade, normalizeSubjectKey(q.subject || subject || 'unknown')));
      const questions = normalizedSubject ? fallback.filter(q => normalizeSubjectKey(q.category.split(' :: ')[0]) === normalizedSubject) : fallback;
      if (questions.length === 0) {
        console.warn(`[API] No remote or local questions for Grade ${grade}${subject ? ` -> ${subject}` : ''}`);
      }
      return questions;
    }

    const packData = await response.json();
    if (!packData?.questions) return [];

    const appQuestions: AppQuestion[] = packData.questions.map((q: any) => {
        const qSubject = normalizeSubjectKey(q.subject || packData.subject || subject || 'unknown');
        if (q.options?.length && !q.options[0].id) {
            q.options = q.options.map((o: any, i: number) => ({ ...o, id: ['A','B','C','D','E'][i] || String(i) }));
        }
        return transformQuestion(q, grade, qSubject);
    });

    return normalizedSubject
      ? appQuestions.filter(q => normalizeSubjectKey(q.category.split(' :: ')[0]) === normalizedSubject)
      : appQuestions;
  } catch (err) {
    console.error(`❌ Fatal error in pack service:`, err);
    return [];
  }
}

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
  const final = Array.from(dedup.values());
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

/**
 * 🆕 Get saved English proficiency level from previous results
 */
export async function getSavedEnglishProficiencyLevel(): Promise<{ level: string, levelNum: number } | null> {
    try {
        const results = await getAllLocalResults();
        const englishResults = results.filter(r => r.subject?.toLowerCase().includes('inglés') || r.subject?.toLowerCase().includes('ingles'));

        if (englishResults.length === 0) return null;

        // Take the latest result and calculate proficiency
        const latest = englishResults[0];
        const resultsFormatted = examResultsToQuestionResults(latest.details.map(d => ({
            id: d.questionId,
            userAnswer: d.isCorrect ? 'A' : 'B', // Mocked as details might not have the raw answer
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
