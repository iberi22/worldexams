import { fetchQuestions, type AppQuestion } from './api-service';
import { filterUnansweredQuestions } from './question-memory';
import { CURRICULUM_CO, normalizeTopic } from '../config/curriculum';

const LOWER_GRADES_MAP: Record<number, number[]> = {
  11: [9, 5, 3],
  9: [7, 5, 3],
  7: [5, 3],
  5: [3],
  3: []
};

/**
 * Generate a smart exam with diagnostic questions and history filtering
 */
export async function generateSmartExam(
  targetGrade: number,
  subject: string,
  count: number = 10,
  period?: number // 🆕 Period filter (1-4)
): Promise<AppQuestion[]> {
  console.log(`🧠 Generating Smart Exam: Grade ${targetGrade}, Subject ${subject}, Period: ${period || 'All'}`);

  // 1. Calculate distribution
  const diagnosticCount = Math.floor(count * 0.2); // 20% diagnostic
  const targetCount = count - diagnosticCount;

  // 2. Resolve grades
  const lowerGrades = LOWER_GRADES_MAP[targetGrade] || [];
  const hasDiagnostic = lowerGrades.length > 0 && diagnosticCount > 0;

  // 🆕 Determine allowed topics if period is set
  let allowedTopics: Set<string> | null = null;
  if (period) {
    const gradeCurriculum = CURRICULUM_CO[targetGrade];
    if (gradeCurriculum) {
      // Normalize subject to match curriculum keys (remove underscores/hyphens/spaces)
      const normSubj = subject.toLowerCase().replace(/[-_\s]/g, '');
      const subjectConfig = gradeCurriculum[normSubj] || gradeCurriculum[subject] || gradeCurriculum[subject.toLowerCase()];

      if (subjectConfig) {
        const periodConfig = subjectConfig.periods.find(p => p.id === period);
        if (periodConfig) {
          allowedTopics = new Set(periodConfig.topics.map(t => normalizeTopic(t)));
          console.log(`📅 Period ${period} filter active. Allowed topics:`, Array.from(allowedTopics));
        }
      }
    }
    if (!allowedTopics) {
      console.warn(`⚠️ Could not find curriculum for G${targetGrade} ${subject} P${period}`);
    }
  }

  // 3. Fetch primary questions
  let primaryQuestions: AppQuestion[] = [];
  try {
    // 🆕 If filtering by period, we need a larger pool to hit matches
    // Fetch pages 1, 2, and 3 concurrently if period is active
    const pagesToFetch = period ? [1, 2, 3] : [1];

    const pools = await Promise.all(pagesToFetch.map(p => fetchQuestions(targetGrade, subject, p)));
    let primaryPool = pools.flat();

    // 🆕 Apply Period Filter
    if (allowedTopics) {
      const originalCount = primaryPool.length;
      primaryPool = primaryPool.filter(q => {
        if (!q.topics || q.topics.length === 0) return true; // Keep uncategorized to be safe? Or Strict?
        // Check if ANY of the question topics match ANY of the allowed topics
        return q.topics.some(t => allowedTopics!.has(normalizeTopic(t)));
      });
      console.log(`📉 Filtered by Period ${period}: ${originalCount} -> ${primaryPool.length} questions`);
    }

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
  // (Only if NOT strictly filtering by period - if filtering, we might just be out of matching questions)
  if (finalQuestions.length < count && !period) {
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
