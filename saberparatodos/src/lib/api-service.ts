/**
 * API Service for consuming questions from WorldExams API
 * This service fetches questions from the API with JWT authentication
 */

import { supabase } from './supabase';

// API Configuration
const API_BASE_URL = '/api'; // Static files (legacy)
const EDGE_FUNCTION_URL = 'https://tzmrgvtptdtsjcugwqyq.supabase.co/functions/v1/get-questions'; // Edge Function (NEW)
const COUNTRY_CODE = 'co';
const EXAM_TYPE = 'icfes';

// Feature flags
const USE_EDGE_FUNCTIONS = true; // Set to true to use Edge Functions instead of static API

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
  // Modern questions metadata
  modernContext?: boolean;
  contextType?: string;
  contextTags?: string[];
}

// Cache for loaded questions
const questionCache: Map<string, AppQuestion[]> = new Map();

/**
 * Map difficulty string to numeric value
 */
function mapDifficulty(difficulty: string): number {
  const map: Record<string, number> = {
    'Low': 1,
    'Medium': 3,
    'High': 5
  };
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
 */
function transformQuestion(apiQuestion: APIQuestion, grade: number, subject: string): AppQuestion {
  return {
    id: apiQuestion.id,
    text: apiQuestion.statement,
    options: apiQuestion.options.map(opt => ({
      id: opt.letter,
      text: opt.text
    })),
    correctOptionId: apiQuestion.correct_answer,
    category: `${formatSubjectName(subject)} :: ${apiQuestion.bundle_id}`,
    explanation: cleanExplanation(apiQuestion.explanation),
    grade: grade,
    difficulty: mapDifficulty(apiQuestion.difficulty),
    bundleId: apiQuestion.bundle_id, // Add bundleId for version carousel
    // Modern questions metadata
    modernContext: apiQuestion.modern_context || false,
    contextType: apiQuestion.context_type || undefined,
    contextTags: apiQuestion.context_tags || []
  };
}

/**
 * Get available grades from the API
 */
export async function getAvailableGrades(): Promise<number[]> {
  try {
    // Hardcoded for ICFES Colombia - these are the available grades
    return [3, 5, 7, 9, 11];
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
    // Grade 5: ciencias_naturales, lectura_critica, matematicas, sociales_y_ciudadanas
    5: ['matematicas', 'lectura_critica', 'ciencias_naturales', 'sociales_y_ciudadanas'],
    // Grade 7: ciencias_naturales, ingles, lectura_critica, matematicas, sociales_y_ciudadanas
    7: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
    // Grade 9: ciencias_naturales, ingles, lectura_critica, matematicas, sociales_y_ciudadanas
    9: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
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
        console.error(`  3. Try accessing ${url} directly in browser`);
      }
      return [];
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error(`⚠️ Invalid JSON response from ${url}:`, parseError);
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
    console.log(`✅ Loaded ${questions.length} questions for ${subject} grade ${grade}`);

    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

/**
 * ⚡ NEW: Fetch questions from Edge Function (JWT-protected)
 * Falls back to static API if Edge Function fails
 */
async function fetchQuestionsFromEdge(
  grade: number,
  subject: string,
  page: number = 1
): Promise<AppQuestion[]> {
  const cacheKey = `edge_${grade}_${subject}_${page}`;
  const cached = questionCache.get(cacheKey);
  if (cached) return cached;

  const headers = await getAuthHeaders();
  const token = await getAuthToken();

  if (!token) {
    console.warn('⚠️ No JWT token, falling back to static API');
    return fetchQuestions(grade, subject, page);
  }

  try {
    const url = `${EDGE_FUNCTION_URL}?grade=${grade}&subject=${subject}&page=${page}`;
    console.log(`⚡ Fetching from Edge Function: ${url.substring(0, 80)}...`);

    const response = await fetch(url, {
      headers,
      cache: 'no-cache'
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('⚠️ Unauthorized, falling back to static API');
        return fetchQuestions(grade, subject, page);
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.questions || !Array.isArray(data.questions)) {
      console.warn('⚠️ Invalid Edge Function response');
      return fetchQuestions(grade, subject, page);
    }

    const questions: AppQuestion[] = data.questions
      .filter((q: APIQuestion) => q && q.statement && q.options)
      .map((q: APIQuestion) => transformQuestion(q, grade, subject));

    questionCache.set(cacheKey, questions);
    console.log(`✅ Loaded ${questions.length} questions from Edge Function (${data.total_questions} total)`);

    return questions;
  } catch (error) {
    console.error('❌ Edge Function error, falling back to static API:', error);
    return fetchQuestions(grade, subject, page);
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
        // Use Edge Function if enabled, otherwise static API
        subjectQuestions = USE_EDGE_FUNCTIONS 
          ? await fetchQuestionsFromEdge(grade, subject, 1)
          : await fetchQuestions(grade, subject, 1);
      } else {
        const index: APISubjectIndex = await indexResponse.json();

        // Fetch all pages for this subject
        for (let page = 1; page <= (index?.total_pages || 1); page++) {
          // Use Edge Function if enabled, otherwise static API
          const pageQuestions = USE_EDGE_FUNCTIONS
            ? await fetchQuestionsFromEdge(grade, subject, page)
            : await fetchQuestions(grade, subject, page);
          subjectQuestions.push(...pageQuestions);
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

    for (const [subject, questions] of questionsBySubject) {
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
