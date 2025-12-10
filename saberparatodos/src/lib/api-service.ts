/**
 * API Service for consuming questions from WorldExams API
 * This service fetches questions from the external API when running as a standalone app
 */

// API Configuration - Can be overridden via environment variables
const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL || 'https://worldexams.pages.dev/api/v1';
const COUNTRY_CODE = 'CO';
const EXAM_TYPE = 'icfes';

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
  id: string | number;
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
  const url = `${API_BASE_URL}/${COUNTRY_CODE}/${EXAM_TYPE}/${grade}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch subjects: ${response.status}`);
    }

    // Since the API structure has folders per subject, we need to list them
    // For now, return the known subjects for ICFES
    const subjectMap: Record<number, string[]> = {
      3: ['matematicas', 'lenguaje'],
      5: ['matematicas', 'lenguaje', 'ciencias_naturales'],
      7: ['matematicas', 'lenguaje', 'ciencias_naturales', 'ciencias_sociales'],
      9: ['matematicas', 'lenguaje', 'ciencias_naturales', 'ciencias_sociales'],
      11: ['matematicas', 'lectura_critica', 'ciencias_naturales', 'sociales_y_ciudadanas', 'ingles']
    };

    return subjectMap[grade] || subjectMap[11];
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return ['matematicas'];
  }
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
    return questionCache.get(cacheKey)!;
  }

  const url = `${API_BASE_URL}/${COUNTRY_CODE}/${EXAM_TYPE}/${grade}/${subject}/${page}.json`;

  try {
    console.log(`🌐 Fetching questions from: ${url}`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status}`);
    }

    const data = await response.json();

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
 */
export async function fetchAllQuestionsForGrade(grade: number): Promise<AppQuestion[]> {
  const subjects = await getAvailableSubjects(grade);
  const allQuestions: AppQuestion[] = [];

  for (const subject of subjects) {
    try {
      // First get the index to know how many pages
      const indexUrl = `${API_BASE_URL}/${COUNTRY_CODE}/${EXAM_TYPE}/${grade}/${subject}/index.json`;
      const indexResponse = await fetch(indexUrl);

      if (!indexResponse.ok) {
        console.warn(`No index found for ${subject}, trying page 1 only`);
        const questions = await fetchQuestions(grade, subject, 1);
        allQuestions.push(...questions);
        continue;
      }

      const index: APISubjectIndex = await indexResponse.json();

      // Fetch all pages
      for (let page = 1; page <= index.total_pages; page++) {
        const questions = await fetchQuestions(grade, subject, page);
        allQuestions.push(...questions);
      }
    } catch (error) {
      console.error(`Error fetching ${subject}:`, error);
    }
  }

  console.log(`📚 Total questions loaded for grade ${grade}: ${allQuestions.length}`);
  return allQuestions;
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
    return await response.json();
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
