/**
 * API Service for consuming questions from WorldExams API
 * This service fetches questions from the external API when running as a standalone app
 */

// API Configuration
// In development: use local files (/api)
// In production: use Cloudflare API (https://worldexams-api.pages.dev/v1)
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
  ? '/api'  // Local files served from public/api/
  : import.meta.env.PUBLIC_API_BASE_URL || 'https://worldexams-api.pages.dev/v1';
const API_KEY = import.meta.env.PUBLIC_API_KEY || ''; // Only needed for production
const COUNTRY_CODE = 'co'; // Lowercase to match API structure (co, not CO)
const EXAM_TYPE = 'icfes'; // Correct exam type

console.log(`🔧 API Configuration: ${isDevelopment ? 'LOCAL' : 'PRODUCTION'} mode`);
console.log(`📡 API Base URL: ${API_BASE_URL}`);

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
    category: `${subject.toUpperCase()} :: ${apiQuestion.bundle_id}`,
    explanation: cleanExplanation(apiQuestion.explanation),
    grade: grade,
    difficulty: mapDifficulty(apiQuestion.difficulty)
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
 */
export async function getAvailableSubjects(grade: number): Promise<string[]> {
  // Return hardcoded subjects that match the generated API structure
  // Note: API folders use underscores (e.g., lectura_critica), so we map them here
  const subjectMap: Record<number, string[]> = {
    3: ['matematicas', 'lenguaje', 'ingles', 'ciencias_naturales', 'sociales_ciudadanas'],
    5: ['matematicas', 'lenguaje', 'ciencias_naturales', 'sociales_ciudadanas'],
    7: ['matematicas', 'lenguaje', 'ingles', 'ciencias_naturales', 'sociales_ciudadanas'],
    9: ['matematicas', 'lenguaje', 'ciencias_naturales', 'sociales_ciudadanas', 'ingles'],
    11: ['matematicas', 'lectura_critica', 'ciencias_naturales', 'sociales_y_ciudadanas', 'ingles', 'informatica']
  };

  return subjectMap[grade] || subjectMap[11];
}

/**
 * Fetch questions for a specific grade and subject
 */
export async function fetchQuestions(
  grade: number,
  subject: string,
  page: number = 1
): Promise<AppQuestion[]> {
  const cacheKey = `${grade}-${subject}-${page}`;

  if (questionCache.has(cacheKey)) {
    console.log(`📦 Using cached questions for ${cacheKey}`);
    return questionCache.get(cacheKey)!; (only for production API)
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    if (API_KEY && !isDevelopment) {
      headers['x-api-key'] = API_KEY;
      console.log('🔑 Using API key for authentication')
    console.log(`🌐 Fetching questions from: ${url}`);
    
    // Add API key to headers if available
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    if (API_KEY) {
      headers['x-api-key'] = API_KEY;
    }
    
    const response = await fetch(url, { 
      cache: 'no-cache',
      headers
    });

    if (!response.ok) {
      console.warn(`⚠️ Failed to fetch questions: ${response.status} for ${url}`);
      return [];
    }

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
 * Fetch all questions for a grade (all subjects, all pages)
 * 🔒 GUEST LIMIT: Max 100 questions for unauthenticated users
 * 🔓 AUTHENTICATED: Max 200 questions
 * 📱 PWA + AUTH: Max 420 questions (7 days of exams)
 */
export async function fetchAllQuestionsForGrade(
  grade: number,
  isGuest: boolean = true,
  maxQuestions: number = 100
): Promise<AppQuestion[]> {
  const subjects = await getAvailableSubjects(grade);
  const allQuestions: AppQuestion[] = [];

  // 🔒 Security: Limit guest users to prevent scraping
  const GUEST_LIMIT = isGuest ? maxQuestions : Infinity;

  for (const subject of subjects) {
    // Stop if we've reached the guest limit
    if (allQuestions.length >= GUEST_LIMIT) {
      console.log(`🔒 Guest limit reached: ${GUEST_LIMIT} questions`);
      break;
    }
 && !isDevelopment
    try {
      // First get the index to know how many pages
      const indexUrl = `${API_BASE_URL}/${COUNTRY_CODE}/${EXAM_TYPE}/${grade}/${subject}/index.json?t=${Date.now()}`;
      console.log(`🔍 Fetching index from: ${indexUrl}`);
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      if (API_KEY) {
        headers['x-api-key'] = API_KEY;
      }
      
      const indexResponse = await fetch(indexUrl, { 
        cache: 'no-cache',
        headers
      });

      if (!indexResponse.ok) {
        console.warn(`No index found for ${subject}, trying page 1 only`);
        const questions = await fetchQuestions(grade, subject, 1);
        const remainingSlots = GUEST_LIMIT - allQuestions.length;
        allQuestions.push(...questions.slice(0, remainingSlots));
        continue;
      }

      const index: APISubjectIndex = await indexResponse.json();

      // Fetch pages until we hit the limit
      for (let page = 1; page <= (index?.total_pages || 1); page++) {
        if (allQuestions.length >= GUEST_LIMIT) break;

        const questions = await fetchQuestions(grade, subject, page);
        const remainingSlots = GUEST_LIMIT - allQuestions.length;
        allQuestions.push(...questions.slice(0, remainingSlots));
      }
    } catch (error) {
      console.error(`Error fetching ${subject}:`, error);
    }
  }

  // Shuffle to randomize which 100 questions guests get
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  const finalSet = shuffled.slice(0, GUEST_LIMIT);

  console.log(`📚 Total questions loaded for grade ${grade}: ${finalSet.length} (Guest: ${isGuest}, Limit: ${GUEST_LIMIT})`);
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
