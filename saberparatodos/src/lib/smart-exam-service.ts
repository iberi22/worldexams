import { fetchQuestions, type AppQuestion } from './api-service';
import { loadAnsweredQuestions, filterUnansweredQuestions } from './question-memory';

const LOWER_GRADES_MAP: Record<number, number[]> = {
  11: [9, 5, 3],
  9: [7, 5, 3],
  7: [5, 3],
  5: [3],
  3: []
};

// Available subjects map for fallback checking
// Mapping subjects because sometimes names vary slightly or to ensure coverage
const SUBJECT_MAPPING: Record<string, string> = {
  'matematicas': 'matematicas',
  'lenguaje': 'lenguaje',
  'lectura-critica': 'lenguaje', // 11 uses lectura-critica, lower use lenguaje
  'ciencias-naturales': 'ciencias-naturales',
  'sociales-ciudadanas': 'sociales-ciudadanas',
  'ingles': 'ingles',
  'informatica': 'informatica'
};

/**
 * Generate a smart exam with diagnostic questions and history filtering
 */
export async function generateSmartExam(
  targetGrade: number,
  subject: string,
  count: number = 10
): Promise<AppQuestion[]> {
  console.log(`🧠 Generating Smart Exam: Grade ${targetGrade}, Subject ${subject}`);

  // 1. Calculate distribution
  const diagnosticCount = Math.floor(count * 0.2); // 20% diagnostic
  const targetCount = count - diagnosticCount;

  // 2. Resolve grades
  const lowerGrades = LOWER_GRADES_MAP[targetGrade] || [];
  const hasDiagnostic = lowerGrades.length > 0 && diagnosticCount > 0;

  // 3. Fetch primary questions
  let primaryQuestions: AppQuestion[] = [];
  try {
    // Fetch a bit more to allow for filtering
    const primaryPool = await fetchQuestions(targetGrade, subject, 1); // Page 1
    // Maybe Page 2 if needed? For now page 1 is usually enough (7 questions per bundle * 5 bundles = 35)

    // Filter answered
    const filteredPrimary = filterUnansweredQuestions(primaryPool, targetCount);
    primaryQuestions = filteredPrimary.filtered;

    // If we ran out of new questions and had to repeat, that's handled by filterUnansweredQuestions
    if (filteredPrimary.hadToRepeat) {
      console.log('⚠️ Repeating primary questions due to history exhaustion');
    }
  } catch (e) {
    console.error('Error fetching primary questions:', e);
  }

  // 4. Fetch diagnostic questions (lower grades)
  let diagnosticQuestions: AppQuestion[] = [];
  if (hasDiagnostic) {
    try {
      // Pick a random lower grade
      const lowerGrade = lowerGrades[Math.floor(Math.random() * lowerGrades.length)];

      // Map subject if needed (e.g., Critical Reading 11 -> Language 9)
      const mappedSubject = mapSubjectForGrade(subject, lowerGrade);

      console.log(`🕵️ Fetching diagnostic questions from Grade ${lowerGrade} (${mappedSubject})`);
      const diagnosticPool = await fetchQuestions(lowerGrade, mappedSubject, 1);

      const filteredDiagnostic = filterUnansweredQuestions(diagnosticPool, diagnosticCount);
      diagnosticQuestions = filteredDiagnostic.filtered;

    } catch (e) {
      console.error('Error fetching diagnostic questions:', e);
    }
  }

  // 5. Combine and Fill
  let finalQuestions = [...primaryQuestions, ...diagnosticQuestions];

  // If we don't have enough (e.g., fetch errors), try to fill with more primary
  if (finalQuestions.length < count) {
    const needed = count - finalQuestions.length;
    console.log(`⚠️ Not enough questions (${finalQuestions.length}/${count}). Filling with more primary...`);

    try {
      // Try page 2 of primary
      const extraPool = await fetchQuestions(targetGrade, subject, 2);
      const extraFiltered = filterUnansweredQuestions(extraPool, needed);
      finalQuestions = [...finalQuestions, ...extraFiltered.filtered];
    } catch (e) {
      // If still fails, nothing to do, return what we have
    }
  }

  // Shuffle final result
  return shuffleArray(finalQuestions).slice(0, count);
}


function mapSubjectForGrade(subject: string, grade: number): string {
  const normSubject = subject.toLowerCase().replace(/-/g, '_'); // Normalize to API format (underscores)

  if (grade <= 9) {
    if (normSubject === 'lectura_critica' || normSubject === 'lectura-critica') return 'lenguaje';
    if (normSubject === 'fisica' || normSubject === 'quimica' || normSubject === 'biologia') return 'ciencias_naturales';
    // Socials might be 'sociales' vs 'sociales_ciudadanas'
  }

  // Ensure compatibility with API folder names
  if (normSubject === 'ciencias-naturales') return 'ciencias_naturales';
  if (normSubject === 'sociales-ciudadanas' || normSubject === 'sociales_ciudadanas') return 'sociales_y_ciudadanas'; // Grade 11 uses 'y'
  if (normSubject === 'lectura-critica') return 'lectura_critica';

  return normSubject;
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
