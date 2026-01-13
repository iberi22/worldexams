/**
 * API Service for consuming questions from WorldExams API
 * This service fetches questions from the API with JWT authentication
 *
 * 🆕 Now supports Rotating Packs system for anti-scraping protection
 */

import { supabase } from './supabase';
import {

  hasPackStored,
  getTotalQuestionsAvailable,
  type StoredPack,
  savePack,
  getQuestionPool
} from './pack-storage';

import {
  saveKnownQuestions,
  getCachedEnglishQuestions,
  getAnsweredQuestionIds,
  getAllLocalResults // 🆕 Import results reader
} from './idb-storage';

import {
  calculateEnglishProficiencyV2,
  examResultsToQuestionResults
} from './english-proficiency';

// API Configuration
const API_BASE_URL = '/api'; // Static files (legacy)
const PACKS_API_URL = '/api/packs'; // 🆕 Rotating packs
const CURRENT_PACK_URL = '/api/packs/current.json'; // ⚡ Static/Worker Endpoint


// const EDGE_FUNCTION_URL = 'https://tzmrgvtptdtsjcugwqyq.supabase.co/functions/v1/get-questions'; // Single fetch endpoint
const COUNTRY_CODE = 'co';
const EXAM_TYPE = 'icfes';

// 🆕 Dev mode detection - skip pack system on localhost to avoid 404s
const IS_DEV_MODE = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Feature flags
const USE_ROTATING_PACKS = !IS_DEV_MODE; // 🆕 Skip in dev mode to avoid 404s
// const USE_EDGE_FUNCTIONS = false; // Disabled: Edge Functions require auth


/**
 * Get JWT token from Supabase session
 */
async function getAuthToken(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
}

/**
 * Get headers with authentication if user is logged in
 */
async function getAuthHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  const token = await getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

console.log(`📍 API Base URL: ${API_BASE_URL}`);
console.log(`🌍 Country: ${COUNTRY_CODE}, Exam: ${EXAM_TYPE}`);

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
  tags: string[];
  images: string[];
  context?: string; // Shared context (reading passage)
  // Modern questions metadata
  modern_context?: boolean;
  context_type?: string;
  context_tags?: string[];
}

export interface APISubjectIndex {
  subject: string;
  total_questions: number;
  total_pages: number;
  time_limit_minutes: number;
  topics: string[];
  pages: { url: string; page: number }[];
  generated_at: string;
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
  bundleId?: string; // Bundle ID for question versioning
  context?: string; // Shared context
  // Modern questions metadata
  modernContext?: boolean;
  contextType?: string;
  contextTags?: string[];
}

// Cache for loaded questions
const questionCache: Map<string, AppQuestion[]> = new Map();

/**
 * Map difficulty string to numeric value
 * 🆕 Now supports both string names and numeric values 1-5
 */
function mapDifficulty(difficulty: string | number): number {
  if (typeof difficulty === 'number') {
    return Math.max(1, Math.min(5, Math.round(difficulty)));
  }

  const map: Record<string, number> = {
    'Low': 2,
    'Medium': 3,
    'High': 4,
    'Very High': 5,
    'Very Hard': 5,
    'Muy Difícil': 5
  };

  // If it's a numeric string, convert to number
  if (/^\d+$/.test(difficulty)) {
    return Math.max(1, Math.min(5, parseInt(difficulty)));
  }

  return map[difficulty] || 3;
}

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
 * Format subject name for display
 * Converts folder names (lectura_critica, ciencias-naturales) to display format
 */
function formatSubjectName(subject: string): string {
  const subjectDisplayMap: Record<string, string> = {
    'matematicas': 'MATEMÁTICAS',
    'lectura_critica': 'LECTURA CRÍTICA',
    'lectura-critica': 'LECTURA CRÍTICA',
    'ciencias_naturales': 'CIENCIAS NATURALES',
    'ciencias-naturales': 'CIENCIAS NATURALES',
    'sociales_y_ciudadanas': 'SOCIALES Y CIUDADANAS',
    'sociales-ciudadanas': 'SOCIALES Y CIUDADANAS',
    'sociales_ciudadanas': 'SOCIALES Y CIUDADANAS',
    'ingles': 'INGLÉS',
    'informatica': 'INFORMÁTICA',
    'tecnologia_informatica': 'TECNOLOGÍA E INFORMÁTICA',
    'tecnologia-informatica': 'TECNOLOGÍA E INFORMÁTICA',
    'filosofia': 'FILOSOFÍA',
    'lenguaje': 'LENGUAJE',
  };

  const normalized = subject.toLowerCase();
  return subjectDisplayMap[normalized] || subject.toUpperCase().replace(/[-_]/g, ' ');
}

/**
 * Transform API question format to App question format
 * 🆕 Now handles both API formats:
 *    - Standard API: options[].letter, options[].is_correct
 *    - Pack format: options[].label, options[].isCorrect
 */
function transformQuestion(apiQuestion: APIQuestion | any, grade: number, subject: string): AppQuestion {
  // 🆕 Safely extract options, handling both formats (English/Spanish keys)
  const rawOptions = apiQuestion.options || apiQuestion.opciones || [];
  const options = rawOptions.map((opt: any, index: number) => {
    let id = opt.letter || opt.label || opt.letra || String.fromCharCode(65 + index);
    // 🆕 Normalize ID: "A) " -> "A"
    if (typeof id === 'string') {
      id = id.replace(/\)\s*$/, '').trim();
    }
    return {
      id: id,
      text: opt.text || opt.texto || ''
    };
  });

  // 🆕 Find correct answer - handle both formats
  // 🐛 FIX: Added correctOptionId check (used by questionParser/API) to prevent defaulting to 'A'
  let correctOptionId = apiQuestion.correctOptionId || apiQuestion.correct_answer || apiQuestion.correctAnswer || apiQuestion.respuesta_correcta;

  if (!correctOptionId) {
    // Try to find from options with isCorrect or is_correct
    const correctOpt = rawOptions.find((opt: any) => opt.isCorrect || opt.is_correct || opt.es_correcta);
    let id = correctOpt?.letter || correctOpt?.label || correctOpt?.letra || 'A';
    // If we're defaulting to A but have valid option IDs, try to use the first option's ID instead of hardcoded 'A'
    if (!correctOpt && options.length > 0 && options[0].id) {
       id = options[0].id;
    }

    if (typeof id === 'string') {
      id = id.replace(/\)\s*$/, '').trim();
    }
    correctOptionId = id;
  }

  // 🆕 Extract bundle_id with fallback
  const bundleId = apiQuestion.bundle_id || apiQuestion.bundleId || apiQuestion.id?.replace(/-v\d+$/, '') || '';

  return {
    id: apiQuestion.id || '',
    text: apiQuestion.statement || apiQuestion.text || apiQuestion.question || apiQuestion.enunciado || '',
    options: options,
    correctOptionId: correctOptionId,
    category: `${formatSubjectName(subject)} :: ${bundleId}`,
    explanation: cleanExplanation(apiQuestion.explanation || apiQuestion.explicacion),
    grade: apiQuestion.grade || apiQuestion.grado || grade,
    difficulty: mapDifficulty(apiQuestion.difficulty || apiQuestion.dificultad || 'Medium'),
    bundleId: bundleId,
    context: apiQuestion.context || apiQuestion.contexto,
    // Modern questions metadata
    modernContext: apiQuestion.modern_context || apiQuestion.modernContext || false,
    contextType: apiQuestion.context_type || apiQuestion.contextType || undefined,
    contextTags: apiQuestion.context_tags || apiQuestion.contextTags || []
  };
}

/**
 * Get available grades from the API
 */
export async function getAvailableGrades(): Promise<number[]> {
  try {
    // All grades with bundles available (3-11)
    return [3, 5, 6, 7, 8, 9, 10, 11];
  } catch (error) {
    console.error('Error fetching grades:', error);
    return [11]; // Default to grade 11
  }
}

/**
 * Get available subjects for a grade
 * Maps to actual API folder names that contain questions
 * IMPORTANT: These names MUST match EXACTLY with folders in public/api/co/icfes/{grade}/
 */
export async function getAvailableSubjects(grade: number): Promise<string[]> {
  // Return subjects that match the ACTUAL API folder structure
  // Verified against: public/api/co/icfes/{grade}/ directories
  // 🔄 Updated 2025-12-17: Estandarizado a snake_case (guiones bajos)
  // ✅ Post-standardization: Solo nombres snake_case
  const subjectMap: Record<number, string[]> = {
    // Grade 3: ciencias_naturales, ingles, matematicas, sociales_y_ciudadanas
    3: ['matematicas', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
    // Grade 5: ciencias_naturales, lectura_critica, matematicas, sociales_y_ciudadanas, lenguaje
    5: ['matematicas', 'lectura_critica', 'ciencias_naturales', 'sociales_y_ciudadanas', 'lenguaje'],
    // Grade 6: Based on bundles found
    6: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas', 'lenguaje'],
    // Grade 7: ciencias_naturales, ingles, lectura_critica, matematicas, sociales_y_ciudadanas, tecnologia_informatica
    7: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
    // Grade 8: Based on bundles found
    8: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas', 'lenguaje'],
    // Grade 9: ciencias_naturales, ingles, lectura_critica, matematicas, sociales_y_ciudadanas
    9: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
    // Grade 10: Based on bundles found
    10: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
    // Grade 11: ciencias_naturales, ingles, lectura_critica, matematicas, sociales_y_ciudadanas
    11: ['matematicas', 'lectura_critica', 'ciencias_naturales', 'sociales_y_ciudadanas', 'ingles']
  };

  return subjectMap[grade] || subjectMap[11];
}

/**
 * Fetch questions for a specific grade and subject
 * 🔄 NEW: Tries multiple folder name variants (guiones, guiones bajos)
 */
export async function fetchQuestions(
  grade: number,
  subject: string,
  page: number = 1
): Promise<AppQuestion[]> {
  const cacheKey = `${grade}-${subject}-${page}`;

  if (questionCache.has(cacheKey)) {
    console.log(`📦 Using cached questions for ${cacheKey}`);
    return questionCache.get(cacheKey)!;
  }

  // 🔄 Try multiple folder name variants (due to API inconsistency)
  const subjectVariants = [
    subject.toLowerCase(),                           // Original: "lectura_critica"
    subject.toLowerCase().replace(/_/g, '-'),        // Variant 1: "lectura-critica"
    subject.toLowerCase().replace(/-/g, '_'),        // Variant 2: "lectura_critica"
  ];

  // Remove duplicates
  const uniqueVariants = [...new Set(subjectVariants)];

  let response: Response | null = null;
  let successfulUrl = '';
  const headers = await getAuthHeaders();

  // Try each variant until one works
  for (const variant of uniqueVariants) {
    const url = `${API_BASE_URL}/${COUNTRY_CODE}/${EXAM_TYPE}/${grade}/${variant}/${page}.json?t=${Date.now()}`;

    try {
      const attemptResponse = await fetch(url, {
        cache: 'no-cache',
        headers
      });

      if (attemptResponse.ok) {
        response = attemptResponse;
        successfulUrl = url;
        console.log(`✅ Found questions at: ${url}`);
        break; // Success, stop trying variants
      }
    } catch (err) {
      // Try next variant
      continue;
    }
  }

  if (!response || !response.ok) {
    console.warn(`⚠️ Failed to fetch questions for ${subject} (tried ${uniqueVariants.length} variants)`);
    return [];
  }

  try {

    // 🔍 Validar que la respuesta es JSON y no HTML
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      console.error(`❌ API Error - Expected JSON, got ${contentType || 'unknown'}`);
      console.error(`First 200 chars of response: ${text.substring(0, 200)}`);

      // Si es HTML, probablemente es un 404 de Cloudflare
      if (text.includes('<!DOCTYPE') || text.includes('<html')) {
        console.error(`🚨 Received HTML instead of JSON. The API endpoint might not exist in production.`);
        console.error(`Troubleshooting:`);
        console.error(`  1. Verify that dist/api/ folder is deployed to Cloudflare Pages`);
        console.error(`  2. Check Cloudflare Pages build settings`);
        console.error(`  3. Try accessing ${successfulUrl} directly in browser`);
      }
      return [];
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error(`⚠️ Invalid JSON response from ${successfulUrl}:`, parseError);
      return [];
    }

    // Null-safe check for questions array
    if (!data || !data.questions || !Array.isArray(data.questions)) {
      console.warn(`⚠️ Invalid response structure for ${subject} grade ${grade}:`, data);
      return [];
    }

    const questions: AppQuestion[] = data.questions
      .filter((q: APIQuestion) => q && q.statement && q.options) // Filter invalid questions
      .map((q: APIQuestion) => transformQuestion(q, grade, subject));

    questionCache.set(cacheKey, questions);

    // 🆕 Persist (fire and forget)
    saveKnownQuestions(questions).catch(e => console.warn('Failed to persist cache:', e));

    console.log(`✅ Loaded ${questions.length} questions for ${subject} grade ${grade}`);

    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}



/**
 * Fetch all questions for a grade (all subjects, all pages)
 * 🔒 GUEST LIMIT: Max 100 questions for unauthenticated users
 * 🔓 AUTHENTICATED: Max 200 questions
 * 📱 PWA + AUTH: Max 420 questions (7 days of exams)
 *
 * Now loads questions BALANCED across all subjects to ensure diversity
 */
export async function fetchAllQuestionsForGrade(
  grade: number,
  isGuest: boolean = true,
  maxQuestions: number = 100
): Promise<AppQuestion[]> {

  // 🆕 Cloudflare Automation: Redirect to Pack System
  if (USE_ROTATING_PACKS) {
    console.log('🔄 Routing request to Cloudflare Rotating Packs system...');
    const packQuestions = await fetchQuestionsFromPacks(grade);

    if (packQuestions.length > 0) {
      return packQuestions;
    }
    console.warn('⚠️ Pack system returned empty, falling back to legacy fetch...');
  }

  const subjects = await getAvailableSubjects(grade);

  // De-duplicate subjects that map to same display name
  const uniqueSubjects = [...new Set(subjects.map(s => s.toLowerCase().replace(/-/g, '_')))];
  const subjectList = uniqueSubjects.map(s => {
    // Find original subject name that matches
    return subjects.find(orig => orig.toLowerCase().replace(/-/g, '_') === s) || s;
  });

  console.log(`📚 Loading questions for ${subjectList.length} unique subjects: ${subjectList.join(', ')}`);

  // 🔒 Security: Limit guest users to prevent scraping
  const GUEST_LIMIT = isGuest ? maxQuestions : Infinity;

  // Calculate balanced distribution: divide limit by number of subjects
  const questionsPerSubject = Math.floor(GUEST_LIMIT / subjectList.length);
  console.log(`📊 Balanced loading: ~${questionsPerSubject} questions per subject (total limit: ${GUEST_LIMIT})`);

  // Collect questions from each subject (balanced)
  const questionsBySubject: Map<string, AppQuestion[]> = new Map();

  for (const subject of subjectList) {
    if (!subject) continue;
    try {
      // 🔄 Try multiple folder name variants for index.json
      const subjectVariants = [
        subject.toLowerCase(),
        subject.toLowerCase().replace(/_/g, '-'),
        subject.toLowerCase().replace(/-/g, '_'),
      ];
      const uniqueVariants = [...new Set(subjectVariants)];

      let indexResponse: Response | null = null;
      const headers = await getAuthHeaders();

      // Try each variant
      for (const variant of uniqueVariants) {
        const indexUrl = `${API_BASE_URL}/${COUNTRY_CODE}/${EXAM_TYPE}/${grade}/${variant}/index.json?t=${Date.now()}`;

        try {
          const attemptResponse = await fetch(indexUrl, {
            cache: 'no-cache',
            headers
          });

          if (attemptResponse.ok) {
            indexResponse = attemptResponse;
            console.log(`✅ Found index at: ${indexUrl}`);
            break;
          }
        } catch (err) {
          continue;
        }
      }

      let subjectQuestions: AppQuestion[] = [];

      if (!indexResponse || !indexResponse.ok) {
        console.warn(`No index found for ${subject} (tried ${uniqueVariants.length} variants), trying page 1 only`);
        // Fallback to page 1 via standard fetch (works for static too)
        try {
          // Use fetchQuestions (Static preferred) instead of forced Edge
          subjectQuestions = await fetchQuestions(grade, subject, 1);
        } catch (error) {
          console.error(`Failed to fetch ${subject} from static API:`, error);
          continue;
        }
      } else {
        const index: APISubjectIndex = await indexResponse.json();

        // Fetch pages using static API instead of Edge Function
        // Used to default to Edge, but switched to Static to avoid 401 auth errors for guests
        for (let page = 1; page <= (index?.total_pages || 1); page++) {
          try {
            const pageQuestions = await fetchQuestions(grade, subject, page);
            subjectQuestions.push(...pageQuestions);
          } catch (error) {
            console.error(`Failed to fetch ${subject} page ${page}:`, error);
          }
        }
      }

      if (subjectQuestions.length > 0) {
        // Shuffle this subject's questions
        const shuffled = subjectQuestions.sort(() => Math.random() - 0.5);
        // Take balanced amount (with some overflow allowed)
        const toTake = Math.min(shuffled.length, questionsPerSubject + 10);
        questionsBySubject.set(subject, shuffled.slice(0, toTake));
        console.log(`✅ ${subject}: loaded ${questionsBySubject.get(subject)?.length} questions (from ${subjectQuestions.length} total)`);
      }
    } catch (error) {
      console.error(`Error fetching ${subject}:`, error);
    }
  }

  // Combine all subjects with balanced distribution
  const allQuestions: AppQuestion[] = [];
  let added = true;
  let round = 0;

  // Round-robin: take questions from each subject one batch at a time
  while (added && allQuestions.length < GUEST_LIMIT) {
    added = false;
    const batchSize = 5; // Take 5 questions per subject per round

    for (const [_subject, questions] of questionsBySubject) {
      const startIdx = round * batchSize;
      const endIdx = startIdx + batchSize;
      const batch = questions.slice(startIdx, endIdx);

      if (batch.length > 0) {
        allQuestions.push(...batch);
        added = true;
      }
    }
    round++;
  }

  // Final shuffle and limit
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  const finalSet = shuffled.slice(0, GUEST_LIMIT);

  // Log distribution
  const distribution = new Map<string, number>();
  for (const q of finalSet) {
    const subj = q.category.split(' :: ')[0];
    distribution.set(subj, (distribution.get(subj) || 0) + 1);
  }
  console.log(`📚 Final distribution for grade ${grade}:`, Object.fromEntries(distribution));
  console.log(`📚 Total questions: ${finalSet.length} (Guest: ${isGuest}, Limit: ${GUEST_LIMIT})`);

  return finalSet;
}

/**
 * ⚡ NEW: Fetch questions in bulk for multiple grades (Blog View optimization)
 * Reduces 50+ requests to 1 single request
 */
/**
 * ⚡ NEW: Fetch questions in bulk for multiple grades (Blog View optimization)
 * Uses the static initial-pack.json generated at build time
 */
/**
 * ⚡ NEW: Fetch questions in bulk for multiple grades (Blog View & Diagnostic optimization)
 * Uses the Cloudflare Worker Rotating Packs (all grades in one request)
 */
export async function fetchBulkQuestions(
  grades: number[],
  limit: number = 300
): Promise<AppQuestion[]> {
  const cacheKey = `bulk_questions_pack_${grades.join('_')}`;
  if (questionCache.has(cacheKey)) {
    return questionCache.get(cacheKey)!;
  }

  console.log(`⚡ Fetching bulk questions for grades [${grades.join(',')}] from Rotating Worker...`);

  try {
    // Reuse the fetchCurrentPack logic (we call the endpoint directly)
    // Note: fetchCurrentPack is internal, but we can call the endpoint
    // Check if we have a locally cached pack first
    const url = CURRENT_PACK_URL;
    // Use stale-while-revalidate pattern or at least simple caching
    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch pack');

    const packData = await response.json();
    let allQuestions: AppQuestion[] = [];

    // Extract questions for requested grades
    for (const grade of grades) {
      if (packData.packs && packData.packs[grade] && packData.packs[grade].questions) {
         const rawQuestions = packData.packs[grade].questions;
         const processed = rawQuestions.map((q: any) => {
            const subject = q.subject || 'general';
            return transformQuestion(q, grade, subject);
         });
         allQuestions = [...allQuestions, ...processed];
      }
    }

    // 🆕 Deduplicate by ID to prevent UI crashes (each_key_duplicate)
    const uniqueMap = new Map();
    allQuestions.forEach(q => {
      if (!uniqueMap.has(q.id)) {
        uniqueMap.set(q.id, q);
      }
    });
    let uniqueQuestions = Array.from(uniqueMap.values());

    // Shuffle and limit if needed
    if (limit && uniqueQuestions.length > limit) {
       uniqueQuestions = uniqueQuestions.sort(() => Math.random() - 0.5).slice(0, limit);
    }

    questionCache.set(cacheKey, uniqueQuestions);

    // 🆕 Persist (fire and forget)
    saveKnownQuestions(uniqueQuestions).catch(e => console.warn('Failed to persist cache:', e));

    console.log(`✅ Loaded ${uniqueQuestions.length} unique bulk questions from Worker`);
    return uniqueQuestions;

  } catch (error) {
    console.error('❌ Bulk fetch error:', error);
    return [];
  }
}

/**
 * ⚡ NEW: Fetch questions for a specific grade only
 * Uses the new grade-specific endpoint to reduce payload size
 * This is the primary method for BlogView
 */
export async function fetchQuestionsForGrade(
  grade: number,
  limit: number = 100
): Promise<AppQuestion[]> {
  const cacheKey = `grade_questions_${grade}`;
  if (questionCache.has(cacheKey)) {
    console.log(`📦 Using cached questions for grade ${grade}`);
    return questionCache.get(cacheKey)!;
  }

  console.log(`⚡ Fetching questions for grade ${grade} from Grade-Specific endpoint...`);

  try {
    // Fallback URL for grade-specific packs if they were generated differently
    const url = `/api/packs/grade/${grade}.json`;
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`⚠️ Grade endpoint failed, falling back to bulk fetch`);
      return fetchBulkQuestions([grade], limit);
    }

    const packData = await response.json();

    if (!packData.questions || packData.questions.length === 0) {
      console.warn(`⚠️ No questions for grade ${grade}`);
      return [];
    }

    // Transform to AppQuestion format
    const questions: AppQuestion[] = packData.questions.map((q: any) => {
      const subject = q.subject || 'general';
      return transformQuestion(q, grade, subject);
    });

    // Deduplicate by ID
    const uniqueMap = new Map();
    questions.forEach(q => {
      if (!uniqueMap.has(q.id)) {
        uniqueMap.set(q.id, q);
      }
    });
    let uniqueQuestions = Array.from(uniqueMap.values());

    // Limit if needed
    if (limit && uniqueQuestions.length > limit) {
      uniqueQuestions = uniqueQuestions.sort(() => Math.random() - 0.5).slice(0, limit);
    }

    questionCache.set(cacheKey, uniqueQuestions);
    console.log(`✅ Loaded ${uniqueQuestions.length} questions for grade ${grade}`);
    return uniqueQuestions;

  } catch (error) {
    console.error(`❌ Grade fetch error for grade ${grade}:`, error);
    // Fallback to bulk fetch
    return fetchBulkQuestions([grade], limit);
  }
}

/**
 * 🆕 Check if a grade is already cached (no network request needed)
 */
export function isGradeCached(grade: number): boolean {
  const cacheKey = `grade_questions_${grade}`;
  return questionCache.has(cacheKey);
}

/**
 * 🆕 Check if all grades are already cached
 */
export function areAllGradesCached(): boolean {
  const ALL_GRADES = [3, 5, 6, 7, 8, 9, 10, 11];
  return ALL_GRADES.every(grade => isGradeCached(grade));
}

/**
 * 🆕 Prefetch all grades in background for instant switching
 * Call this after the initial grade loads to preload remaining grades
 */
export async function prefetchAllGrades(limit: number = 150): Promise<void> {
  const ALL_GRADES = [3, 5, 6, 7, 8, 9, 10, 11];

  console.log('🔄 Starting background prefetch of all grades...');

  // Fetch remaining grades in parallel (excluding already cached ones)
  const gradesToFetch = ALL_GRADES.filter(g => !isGradeCached(g));

  if (gradesToFetch.length === 0) {
    console.log('✅ All grades already cached!');
    return;
  }

  console.log(`📥 Prefetching ${gradesToFetch.length} grades: [${gradesToFetch.join(', ')}]`);

  // Fetch in parallel but with a small delay between each to avoid overwhelming the server
  const promises = gradesToFetch.map((grade, index) =>
    new Promise<void>(resolve => {
      setTimeout(async () => {
        try {
          await fetchQuestionsForGrade(grade, limit);
        } catch (e) {
          console.warn(`⚠️ Prefetch failed for grade ${grade}:`, e);
        }
        resolve();
      }, index * 100); // 100ms delay between each request
    })
  );

  await Promise.all(promises);
  console.log('✅ Background prefetch complete! All grades cached.');
}

/**
 * Fetch questions for exam (limited, random selection)
 */
export async function fetchExamQuestions(
  grade: number,
  subject: string,
  count: number = 10
): Promise<AppQuestion[]> {
  const allQuestions = await fetchQuestions(grade, subject, 1);

  // Shuffle and take `count` questions
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get subject index (metadata about the subject)
 */
export async function getSubjectIndex(
  grade: number,
  subject: string
): Promise<APISubjectIndex | null> {
  const url = `${API_BASE_URL}/${COUNTRY_CODE}/${EXAM_TYPE}/${grade}/${subject}/index.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('Error parsing subject index JSON:', parseError);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching subject index:', error);
    return null;
  }
}

/**
 * Clear the question cache
 */
export function clearCache(): void {
  questionCache.clear();
  console.log('🧹 Question cache cleared');
}

// ═══════════════════════════════════════════════════════════════════════════
// 🆕 ROTATING PACKS SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

interface PackMetadata {
  pack_id: string;
  generated_at: string;
  next_rotation: string;
  rotation_days: number;
  grades: number[];
  country: string;
  exam: string;
}

interface PackData {
  packId: string;
  grade: number;
  generatedAt: string;
  totalQuestions: number;
  subjectCounts: Record<string, number>;
  questions: APIQuestion[];
}

/**
 * Fetch current pack metadata from API
 */
async function fetchPackMetadata(): Promise<PackMetadata | null> {
  try {
    const response = await fetch(`${CURRENT_PACK_URL}?t=${Date.now()}`, {
      cache: 'no-cache'
    });

    if (!response.ok) {
      console.warn('⚠️ Could not fetch current pack metadata');
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pack metadata:', error);
    return null;
  }
}

/**
 * Download a specific pack for a grade
 */
async function downloadPackForGrade(packId: string, grade: number): Promise<PackData | null> {
  try {
    const url = `${PACKS_API_URL}/${packId}-grade-${grade}.json`;
    console.log(`📦 Downloading pack: ${url}`);

    const response = await fetch(url, {
      cache: 'force-cache' // Use browser cache
    });

    if (!response.ok) {
      console.warn(`⚠️ Pack not found: ${packId}-grade-${grade}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error downloading pack ${packId}:`, error);
    return null;
  }
}

/**
 * 🆕 PRIMARY METHOD: Fetch questions using Rotating Packs system
 *
 * Strategy:
 * 1. Check if new pack is available
 * 2. Download and store new pack if needed
 * 3. Return combined pool from ALL stored packs
 */
export async function fetchQuestionsFromPacks(
  grade: number
): Promise<AppQuestion[]> {
  // 1. Get current pack metadata
  const metadata = await fetchPackMetadata();

  if (!metadata) {
    console.warn('⚠️ No pack metadata available, falling back to static API');
    return [];
  }

  const currentPackId = metadata.pack_id;
  console.log(`📦 Current pack: ${currentPackId}`);

  // 2. Get subjects for this grade
  const subjects = await getAvailableSubjects(grade);

  // 3. Check if we need to download new pack
  let needsDownload = false;
  for (const subject of subjects) {
    if (!hasPackStored(currentPackId, grade, subject)) {
      needsDownload = true;
      break;
    }
  }

  // 4. Download new pack if needed
  if (needsDownload) {
    const packData = await downloadPackForGrade(currentPackId, grade);

    if (packData && packData.questions.length > 0) {
      // Group questions by subject and save
      const questionsBySubject = new Map<string, APIQuestion[]>();

      for (const q of packData.questions) {
        const subject = (q as any).subject || 'unknown';
        if (!questionsBySubject.has(subject)) {
          questionsBySubject.set(subject, []);
        }
        questionsBySubject.get(subject)!.push(q);
      }

      // Save each subject's questions as a separate pack entry
      for (const [subject, questions] of questionsBySubject) {
        const storedPack: StoredPack = {
          packId: currentPackId,
          grade,
          subject,
          questions,
          downloadedAt: Date.now(),
          questionCount: questions.length
        };
        savePack(storedPack);
      }

      console.log(`✅ Downloaded and stored pack ${currentPackId} for grade ${grade}`);
    }
  } else {
    console.log(`📦 Pack ${currentPackId} already stored for grade ${grade}`);
  }

  // 5. Get combined question pool from ALL stored packs
  const poolQuestions = getQuestionPool(grade);

  if (poolQuestions.length === 0) {
    console.warn(`⚠️ No questions in pool for grade ${grade}`);
    return [];
  }

  // 6. Transform to AppQuestion format
  const appQuestions: AppQuestion[] = poolQuestions.map(q => {
    const subject = (q as any).subject || 'unknown';
    return transformQuestion(q, grade, subject);
  });

  console.log(`📚 Loaded ${appQuestions.length} questions from pack pool for grade ${grade}`);

  return appQuestions;
}

/**
 * 🆕 Get total questions available in accumulated packs for a grade
 */
export function getPackPoolSize(grade: number): number {
  return getTotalQuestionsAvailable(grade);
}

/**
 * 🆕 Updated fetchAllQuestionsForGrade to use Rotating Packs
 */
export async function fetchAllQuestionsForGradeWithPacks(
  grade: number,
  isGuest: boolean = true,
  maxQuestions: number = 100
): Promise<AppQuestion[]> {
  if (!USE_ROTATING_PACKS) {
    // Fallback to original method
    return fetchAllQuestionsForGrade(grade, isGuest, maxQuestions);
  }

  // Use rotating packs
  const poolQuestions = await fetchQuestionsFromPacks(grade);

  if (poolQuestions.length === 0) {
    console.warn('⚠️ No questions from packs, falling back to static API');
    return fetchAllQuestionsForGrade(grade, isGuest, maxQuestions);
  }

  // Apply guest limit
  const limit = isGuest ? maxQuestions : Infinity;
  const shuffled = [...poolQuestions].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, limit);
}

// ═══════════════════════════════════════════════════════════════════════════
// 🆕 ENGLISH DIAGNOSTIC MODE - Cross-grade English Assessment
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Map grade to English proficiency level (A1-C1 CEFR approximation)
 */
function gradeToEnglishLevel(grade: number): { level: string; levelNum: number; description: string } {
  const levelMap: Record<number, { level: string; levelNum: number; description: string }> = {
    3: { level: 'A1', levelNum: 1, description: 'Básico - Principiante' },
    5: { level: 'A1+', levelNum: 2, description: 'Básico - Elemental' },
    6: { level: 'A2', levelNum: 3, description: 'Pre-Intermedio' },
    7: { level: 'A2+', levelNum: 4, description: 'Pre-Intermedio Alto' },
    8: { level: 'B1', levelNum: 5, description: 'Intermedio' },
    9: { level: 'B1+', levelNum: 6, description: 'Intermedio Alto' },
    10: { level: 'B2', levelNum: 7, description: 'Intermedio Superior' },
    11: { level: 'B2+', levelNum: 8, description: 'Pre-Avanzado (ICFES)' }
  };
  return levelMap[grade] || levelMap[11];
}

/**
 * 🆕 Fetch English questions from ALL grades for diagnostic/assessment mode
 *
 * Features:
 * - Fetches English questions from grades 3, 5, 6, 7, 8, 9, 10, 11
 * - Tags each question with its source grade and English level
 * - Balances distribution across levels for accurate assessment
 * - Supports party mode by returning consistent question sets
 *
 * @param limit Maximum total questions to return
 * @param balanced If true, ensures equal distribution across levels
 * @returns Array of AppQuestion with English level metadata
 */
export async function fetchEnglishQuestionsAllGrades(
  limit: number = 30, // 🆕 Increased default to 30 for better CEFR coverage
  balanced: boolean = true
): Promise<AppQuestion[]> {
  const ALL_GRADES = [3, 5, 6, 7, 8, 9, 10, 11];

  // 🆕 Include user's level in cache key for proper invalidation when level changes
  const savedLevel = getSavedEnglishProficiencyLevel();
  const levelSuffix = savedLevel ? `_L${savedLevel.levelNum}` : '_Lnone';
  const cacheKey = `english_all_grades_${limit}_${balanced}${levelSuffix}`;

  // 1. Check memory cache first
  if (questionCache.has(cacheKey)) {
    console.log('📦 Using memory cached English questions');
    return questionCache.get(cacheKey)!;
  }

  // 2. 🆕 Check persistent cache (IndexedDB)
  // ⚠️ DISABLE CACHE READ TEMPORARILY: Force refresh to fix corrupted 'correctOptionId' data in user caches.
  /*
  try {
    const cachedQuestions = await getCachedEnglishQuestions();
    if (cachedQuestions && cachedQuestions.length >= 50) {
      // 🆕 NEW: Filter cached questions too (in case bad data persists)
      const validCached = cachedQuestions.filter((q: any) =>
        q &&
        Array.isArray(q.options) &&
        q.options.length >= 2 &&
        q.id &&
        q.text &&
        q.correctOptionId
      );

      console.log(`💾 Using ${validCached.length} valid persisted English questions (from ${cachedQuestions.length} raw)`);

      // Refresh memory cache
      questionCache.set(cacheKey, validCached);

      // Shuffle and return
      const shuffled = validCached.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, limit > 0 ? limit : undefined);
    }
  } catch (err) {
    console.warn('Error reading persistent cache:', err);
  }
  */


  console.log('🇬🇧 Fetching English questions from ALL grades for assessment...');

  const questionsPerGrade = balanced ? Math.ceil(limit / ALL_GRADES.length) : limit;
  const allEnglishQuestions: AppQuestion[] = [];

  // 🆕 Get answered IDs (14-day window for spaced repetition)
  // v4.1 FIX: Exclude ALL answered questions (not just correct) to prevent repetition
  const answeredIds = await getAnsweredQuestionIds(14, false);

  // 🚀 OPTIMIZED: Fetch all grades in parallel instead of sequentially
  const gradePromises = ALL_GRADES.map(async (grade) => {
    try {
      // Try grade-specific endpoint first
      const url = `/api/packs/grade/${grade}.json`;
      const response = await fetch(url);

      if (!response.ok) {
        // Silent fallback - don't log to reduce noise
        return { grade, questions: [] };
      }

      const packData = await response.json();

      if (!packData.questions || packData.questions.length === 0) {
        return { grade, questions: [] };
      }

      // Filter only English questions AND exclude answered ones
      const englishQuestions = packData.questions.filter((q: any) => {
        const subject = (q.subject || '').toLowerCase();
        const isEnglish = subject === 'ingles' || subject === 'inglés' || subject === 'english';

        // 🛑 Filter dups
        // Normalized ID check (remove -vX suffix if needed, but answeredIds are usually exact)
        // If question ID is "CO-ING-11-foo-v1", check if in set.
        // Also check if base ID matches?
        // For now, exact match on ID or ID without version if stored.
        // Our storage uses exact ID.
        const isDuplicate = answeredIds.has(q.id);

        return isEnglish && !isDuplicate;
      });

      if (englishQuestions.length === 0) {
        return { grade, questions: [] };
      }

      // Transform and tag with level
      const levelInfo = gradeToEnglishLevel(grade);
      const transformed = englishQuestions.map((q: any) => {
        const appQ = transformQuestion(q, grade, 'ingles');
        return {
          ...appQ,
          // 🆕 Add English level metadata
          englishLevel: levelInfo.level,
          englishLevelNum: levelInfo.levelNum,
          englishLevelDesc: levelInfo.description,
          sourceGrade: grade,
          // Override category to include level
          category: `INGLÉS ${levelInfo.level} :: ${appQ.bundleId || 'general'}`
        };
      // 🔥 OPTIMIZATION: Pre-filter invalid questions (< 2 options) during fetch
      }).filter((q: any) =>
        q &&
        Array.isArray(q.options) &&
        q.options.length >= 2 &&
        q.id &&
        q.text &&
        q.correctOptionId
      );

      // Shuffle and take balanced amount
      const shuffled = transformed.sort(() => Math.random() - 0.5);
      const toTake = balanced ? Math.min(shuffled.length, questionsPerGrade) : shuffled.length;

      console.log(`✅ Grade ${grade} (${levelInfo.level}): ${shuffled.slice(0, toTake).length} English questions`);

      return { grade, questions: shuffled.slice(0, toTake) };
    } catch (error) {
      console.error(`Error fetching English for grade ${grade}:`, error);
      return { grade, questions: [] };
    }
  });

  // ⚡ Execute all fetches in parallel
  const results = await Promise.all(gradePromises);

  // Collect all questions from parallel results
  results.forEach(({ questions }) => {
    allEnglishQuestions.push(...questions);
  });

  // Deduplicate by ID
  const uniqueMap = new Map();
  allEnglishQuestions.forEach(q => {
    if (!uniqueMap.has(q.id)) {
      uniqueMap.set(q.id, q);
    }
  });
  let uniqueQuestions = Array.from(uniqueMap.values());

  // 🆕 LEVEL-BASED WEIGHTED DISTRIBUTION
  // If user has a diagnosed level with good confidence, prioritize matching questions
  // Note: `savedLevel` was already fetched at the top of this function for cache key
  if (savedLevel && savedLevel.confidence >= 60 && limit > 0) {
    console.log(`🎯 Level-based filtering active: ${savedLevel.level} (${savedLevel.confidence}% confidence)`);

    // Get grades matching user's level
    const matchingGrades = getGradesForCEFRLevel(savedLevel.levelNum, 1);
    console.log(`📊 Matching grades for ${savedLevel.level}: [${matchingGrades.join(', ')}]`);

    // Split questions into matching level and others
    const matchingQuestions = uniqueQuestions.filter((q: any) =>
      matchingGrades.includes(q.sourceGrade || q.grade)
    );
    const otherQuestions = uniqueQuestions.filter((q: any) =>
      !matchingGrades.includes(q.sourceGrade || q.grade)
    );

    // Weighted selection: 60% from matching, 40% from others
    const matchingCount = Math.min(Math.ceil(limit * 0.6), matchingQuestions.length);
    const otherCount = Math.min(limit - matchingCount, otherQuestions.length);

    // Shuffle each pool
    const shuffledMatching = matchingQuestions.sort(() => Math.random() - 0.5);
    const shuffledOthers = otherQuestions.sort(() => Math.random() - 0.5);

    // Combine and shuffle final selection
    uniqueQuestions = [
      ...shuffledMatching.slice(0, matchingCount),
      ...shuffledOthers.slice(0, otherCount)
    ].sort(() => Math.random() - 0.5);

    console.log(`✅ Weighted selection: ${matchingCount} matching + ${otherCount} challenge = ${uniqueQuestions.length} total`);
  } else {
    // Standard shuffle and limit (no diagnosed level or low confidence)
    uniqueQuestions = uniqueQuestions.sort(() => Math.random() - 0.5);
    if (limit && uniqueQuestions.length > limit) {
      uniqueQuestions = uniqueQuestions.slice(0, limit);
    }
  }

  // Cache results
  questionCache.set(cacheKey, uniqueQuestions);

  // Log level distribution
  const distribution: Record<string, number> = {};
  uniqueQuestions.forEach(q => {
    const level = (q as any).englishLevel || 'Unknown';
    distribution[level] = (distribution[level] || 0) + 1;
  });

  console.log('🇬🇧 English Level Distribution:', distribution);
  console.log(`📚 Total English questions loaded: ${uniqueQuestions.length}`);

  // 🆕 FORCE UPDATE CACHE: Overwrite potentially bad data in IDB with fresh, valid questions
  await saveKnownQuestions(uniqueQuestions);
  console.log(`💾 Persisted ${uniqueQuestions.length} fresh English questions to repair cache`);

  return uniqueQuestions;
}

/**
 * 🆕 Prefetch a large pool of English questions (Target: 400+)
 * Run this in background to enable offline diagnostic series.
 */
export async function prefetchEnglishPool(): Promise<number> {
  console.log('🏊 Starting English Pool Prefetch (Target: 400+)...');
  try {
    // Reuse the fetch logic but with a high limit
    const pool = await fetchEnglishQuestionsAllGrades(400, true);
    console.log(`🏊 English Pool Prefetch Complete. Loaded ${pool.length} questions.`);
    return pool.length;
  } catch (e) {
    console.error('English pool prefetch failed:', e);
    return 0;
  }
}

/**
 * 🆕 Get English proficiency assessment based on exam results
 *
 * @param results Array of { questionId, isCorrect, englishLevelNum }
 * @returns Assessment with estimated English level
 */
export function calculateEnglishProficiency(
  results: Array<{ questionId: string; isCorrect: boolean; englishLevelNum: number }>
): {
  estimatedLevel: string;
  estimatedLevelNum: number;
  confidence: number;
  breakdown: Record<string, { correct: number; total: number; percentage: number }>;
  recommendation: string;
} {
  if (!results || results.length === 0) {
    return {
      estimatedLevel: 'N/A',
      estimatedLevelNum: 0,
      confidence: 0,
      breakdown: {},
      recommendation: 'Completa al menos un examen para ver tu nivel.'
    };
  }

  // Group by level
  const levelMap = {
    1: 'A1', 2: 'A1+', 3: 'A2', 4: 'A2+',
    5: 'B1', 6: 'B1+', 7: 'B2', 8: 'B2+'
  };

  const breakdown: Record<string, { correct: number; total: number; percentage: number }> = {};

  results.forEach(r => {
    const level = levelMap[r.englishLevelNum as keyof typeof levelMap] || 'Unknown';
    if (!breakdown[level]) {
      breakdown[level] = { correct: 0, total: 0, percentage: 0 };
    }
    breakdown[level].total++;
    if (r.isCorrect) {
      breakdown[level].correct++;
    }
  });

  // Calculate percentages
  Object.keys(breakdown).forEach(level => {
    breakdown[level].percentage = Math.round(
      (breakdown[level].correct / breakdown[level].total) * 100
    );
  });

  // Find highest level with >= 70% correct
  let estimatedLevelNum = 1;
  const orderedLevels = ['A1', 'A1+', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'B2+'];

  for (let i = 0; i < orderedLevels.length; i++) {
    const level = orderedLevels[i];
    if (breakdown[level] && breakdown[level].percentage >= 70) {
      estimatedLevelNum = i + 1;
    } else if (breakdown[level] && breakdown[level].percentage < 50) {
      // Stop if we fail a level badly
      break;
    }
  }

  const estimatedLevel = levelMap[estimatedLevelNum as keyof typeof levelMap] || 'A1';

  // Calculate confidence based on sample size
  const totalAnswered = results.length;
  const confidence = Math.min(100, Math.round((totalAnswered / 30) * 100));

  // Generate recommendation
  let recommendation = '';
  if (estimatedLevelNum <= 2) {
    recommendation = 'Enfócate en vocabulario básico y estructuras simples. Practica con contenido de grados 3-5.';
  } else if (estimatedLevelNum <= 4) {
    recommendation = 'Buen progreso! Trabaja en gramática intermedia y comprensión lectora. Contenido de grados 6-7.';
  } else if (estimatedLevelNum <= 6) {
    recommendation = 'Nivel intermedio sólido. Practica textos más complejos y vocabulario académico. Grados 8-9.';
  } else {
    recommendation = '¡Excelente nivel! Prepárate para el ICFES con simulacros completos de grado 11.';
  }

  return {
    estimatedLevel,
    estimatedLevelNum,
    confidence,
    breakdown,
    recommendation
  };
}

/**
 * 🆕 Generate a comprehensive English proficiency result using ALL local history.
 * Used for the NotebookLM study plan to ensure it's based on long-term data.
 */
export async function generateHistoricalEnglishProficiency(): Promise<any> {
  try {
    const results = await getAllLocalResults();
    const allQuestions = await getCachedEnglishQuestions();

    // Index cached questions for fast lookup
    const qMap = new Map();
    allQuestions.forEach(q => qMap.set(String(q.id), q));

    let accumulatedInputs: any[] = [];

    // Process all past exams
    for (const exam of results) {
      if (!exam.details || !Array.isArray(exam.details)) continue;

      for (const d of exam.details) {
        const qId = String(d.questionId);

        // Find metadata (either in detail or in cache)
        const cachedQ = qMap.get(qId);
        const cefrStr = d.cefrLevel || d.cefr_level || d.englishLevel ||
                        cachedQ?.cefrLevel || cachedQ?.cefr_level || cachedQ?.englishLevel;

        // Only include if we have CEFR info (English question)
        if (cefrStr || (exam.subject && exam.subject.toLowerCase().includes('ingl'))) {
          accumulatedInputs.push({
            id: qId,
            userAnswer: d.isCorrect ? 'MATCH' : 'MISMATCH', // Mock for correctness
            correctOptionId: 'MATCH',
            cefrLevel: cefrStr,
            grade: d.grade || exam.grade
          });
        }
      }
    }

    if (accumulatedInputs.length === 0) return null;

    const questionResults = examResultsToQuestionResults(accumulatedInputs);
    return calculateEnglishProficiencyV2(questionResults);
  } catch (err) {
    console.warn('Error generating historical proficiency:', err);
    return null;
  }
}

/**
 * 🆕 Get the user's current effective English level based on CUMULATIVE local history.
 * Compatibility wrapper for ExamConfigModal.
 */
export async function getEffectiveEnglishLevel(): Promise<{ level: string; confidence: number; count: number } | null> {
  const result = await generateHistoricalEnglishProficiency();
  if (!result) return null;
  return {
    level: result.estimatedLevel,
    confidence: result.confidence,
    count: result.totalQuestions
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 🆕 LEVEL-BASED FILTERING: LocalStorage for diagnosed level
// ═══════════════════════════════════════════════════════════════════════════

const PROFICIENCY_STORAGE_KEY = 'english_proficiency_level';

export interface SavedProficiencyLevel {
  level: string;       // e.g., "B1", "A2+"
  levelNum: number;    // 1-9
  confidence: number;  // 0-100
  diagnosedAt: string; // ISO date
}

/**
 * 🆕 Save the user's diagnosed CEFR level to localStorage
 * Called after completing an English diagnostic exam with sufficient confidence
 */
export function saveEnglishProficiencyLevel(level: string, levelNum: number, confidence: number): void {
  try {
    const data: SavedProficiencyLevel = {
      level,
      levelNum,
      confidence,
      diagnosedAt: new Date().toISOString()
    };
    localStorage.setItem(PROFICIENCY_STORAGE_KEY, JSON.stringify(data));
    console.log(`💾 Saved English proficiency level: ${level} (confidence: ${confidence}%)`);
  } catch (err) {
    console.warn('Failed to save proficiency level:', err);
  }
}

/**
 * 🆕 Get the user's saved CEFR level from localStorage
 * Returns null if not diagnosed, data is invalid, or level is expired (>30 days)
 */
export function getSavedEnglishProficiencyLevel(): SavedProficiencyLevel | null {
  try {
    const stored = localStorage.getItem(PROFICIENCY_STORAGE_KEY);
    if (!stored) return null;
    const data = JSON.parse(stored) as SavedProficiencyLevel;
    // Validate structure
    if (!data.level || typeof data.levelNum !== 'number' || typeof data.confidence !== 'number') {
      return null;
    }

    // 🆕 Check for expiration (30 days)
    if (data.diagnosedAt) {
      const daysSinceDiagnosis = (Date.now() - new Date(data.diagnosedAt).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDiagnosis > 30) {
        console.log(`⚠️ Saved level expired (${Math.round(daysSinceDiagnosis)} days old), will re-diagnose`);
        return null;
      }
    }

    return data;
  } catch (err) {
    return null;
  }
}

/**
 * 🆕 Clear the saved proficiency level (for testing or reset)
 */
export function clearSavedEnglishProficiencyLevel(): void {
  try {
    localStorage.removeItem(PROFICIENCY_STORAGE_KEY);
    console.log('🗑️ Cleared saved English proficiency level');
  } catch (err) {
    // Ignore
  }
}

/**
 * 🆕 Get the grades that match a given CEFR level ± tolerance
 * Used for weighted question distribution
 */
export function getGradesForCEFRLevel(levelNum: number, tolerance: number = 1): number[] {
  // CEFR Level to Grade mapping (approximate)
  // levelNum 1-2 (A1/A1+) -> Grades 3, 5
  // levelNum 3-4 (A2/A2+) -> Grades 6, 7
  // levelNum 5-6 (B1/B1+) -> Grades 8, 9
  // levelNum 7-9 (B2/B2+/C1) -> Grades 10, 11
  const levelToGrades: Record<number, number[]> = {
    1: [3, 5],      // A1
    2: [3, 5],      // A1+
    3: [5, 6],      // A2
    4: [6, 7],      // A2+
    5: [7, 8],      // B1
    6: [8, 9],      // B1+
    7: [9, 10],     // B2
    8: [10, 11],    // B2+
    9: [11]         // C1+
  };

  const matchingGrades = new Set<number>();

  // Add grades for user's level
  for (let l = Math.max(1, levelNum - tolerance); l <= Math.min(9, levelNum + tolerance); l++) {
    (levelToGrades[l] || []).forEach(g => matchingGrades.add(g));
  }

  return Array.from(matchingGrades).sort((a, b) => a - b);
}


// ═══════════════════════════════════════════════════════════════════════════
// 🆕 RE-EXPORT: Enhanced English Proficiency Assessment (v2)
// ═══════════════════════════════════════════════════════════════════════════

// Export the enhanced proficiency calculation from the dedicated module
export {
  calculateEnglishProficiencyV2,
  parseCEFRLevel,
  examResultsToQuestionResults,
  CEFR_LEVELS,
  CEFR_LEVEL_NUM,
  GRADE_TO_CEFR,
  type QuestionResult,
  type EnglishProficiencyResult,
  type LevelStats,
  type CEFRLevel
} from './english-proficiency';

// Export adaptive exam services
export {
  generateAdaptiveEnglishExam,
  selectInitialQuestions,
  initializeAdaptiveExam,
  type AdaptiveExamState,
  type AdaptiveConfig
} from './adaptive-exam-service';

// Export NotebookLM curriculum services
export {
  generateStudyPlan,
  type NotebookStudyPlan,
  type StudyModule
} from './notebooklm/curriculum-service';


