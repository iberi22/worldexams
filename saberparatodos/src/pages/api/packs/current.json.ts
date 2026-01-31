import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPackId, getNextRotationDate, seededShuffle, ROTATION_DAYS, QUESTIONS_PER_SUBJECT } from '../../../utils/rotation-logic';
import { getAllQuestionsFromBundle, type QuestionEntry } from '../../../utils/questionParser';

/**
 * Normalize subject names to prevent duplicates
 */
function normalizeSubject(subject: string): string {
  const s = subject.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[-_\/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const mapping: Record<string, string> = {
    'matematicas': 'matematicas',
    'ingles': 'ingles',
    'ciencias naturales': 'ciencias_naturales',
    'ciencias naturales fisica': 'ciencias_naturales',
    'ciencias naturales quimica': 'ciencias_naturales',
    'ciencias naturales biologia': 'ciencias_naturales',
    'fisica': 'ciencias_naturales',
    'quimica': 'ciencias_naturales',
    'biologia': 'ciencias_naturales',
    'lectura critica': 'lectura_critica',
    'lectura critica filosofia': 'lectura_critica',
    'filosofia': 'lectura_critica',
    'sociales y ciudadanas': 'sociales_ciudadanas',
    'sociales ciudadanas': 'sociales_ciudadanas',
    'sociales': 'sociales_ciudadanas',
    'lenguaje': 'lenguaje',
    'tecnologia e informatica': 'tecnologia',
    'tecnologia informatica': 'tecnologia',
    'tecnologia': 'tecnologia',
  };

  return mapping[s] || s.replace(/ /g, '_');
}

export const GET: APIRoute = async ({ request }) => {
  // 1. Calculate Time-Based Seed
  const packId = getPackId();
  const nextRotation = getNextRotationDate();

  // Extract period from query params
  const url = new URL(request.url);
  const periodParam = url.searchParams.get('period');
  const targetPeriod = periodParam ? parseInt(periodParam, 10) : null;

  console.log(`📦 Generating Pack: ${packId} (Next Rotation: ${nextRotation}). Period Filter: ${targetPeriod || 'None'}`);

  // 2. Load ALL Bundles (Source of Truth)
  const allBundles = await getCollection('questions');

  // 3. Process each grade
  const grades = [3, 5, 6, 7, 8, 9, 10, 11]; // Supported grades
  const packData = {
    pack_id: packId,
    generated_at: new Date().toISOString(),
    next_rotation: nextRotation,
    rotation_days: ROTATION_DAYS,
    country: 'co', // Hardcoded for now, could be dynamic
    exam: 'icfes',
    target_period: targetPeriod,
    grades: [] as number[],
    packs: {} as Record<number, any>,
    warnings: [] as string[]
  };

  for (const grade of grades) {
    // Filter bundles for this grade AND period (if specified)
    const gradeBundles = allBundles.filter(b => {
        if (b.data.grado !== grade) return false;
        if (targetPeriod !== null) {
            // Check for 'periodo' or 'period' in metadata
            const p = b.data.periodo || b.data.period;
            return p === targetPeriod;
        }
        return true;
    });

    if (gradeBundles.length === 0) continue;

    // Group by subject
    const questionsBySubject: Record<string, any[]> = {};

    for (const bundle of gradeBundles) {
      // 🆕 Normalize subject name to prevent duplicates
      const subject = normalizeSubject(bundle.data.asignatura);
      if (!questionsBySubject[subject]) {
        questionsBySubject[subject] = [];
      }

      // Parse questions from bundle
      const questions = getAllQuestionsFromBundle(bundle as unknown as QuestionEntry);
      questionsBySubject[subject].push(...questions);
    }

    // Select questions for this grade using the Seed
    const selectedQuestionsForGrade: any[] = [];
    const subjects = Object.keys(questionsBySubject);
    const subjectCounts: Record<string, number> = {};
    const gradeWarnings: string[] = [];

    for (const subject of subjects) {
      let pool = questionsBySubject[subject];
      if (pool.length === 0) continue;

      // Deterministic Shuffle
      const seed = `${packId}-${grade}-${subject}-${targetPeriod || 'all'}`;
      let shuffled = seededShuffle(pool, seed);

      // Handle Low Content for Period Exams: Repeat questions if necessary
      if (targetPeriod !== null && shuffled.length < QUESTIONS_PER_SUBJECT) {
          const originalCount = shuffled.length;
          const needed = QUESTIONS_PER_SUBJECT;

          // Add warning
          const warningMsg = `Grade ${grade} ${subject}: Only ${originalCount} unique questions found for period ${targetPeriod}. Repeating content to reach ${needed}.`;
          console.warn(warningMsg);
          gradeWarnings.push(warningMsg);
          packData.warnings.push(warningMsg);

          // Fill pool by repeating
          while (shuffled.length < needed) {
              shuffled = [...shuffled, ...shuffled];
          }
      }

      // Take limited amount
      const selected = shuffled.slice(0, QUESTIONS_PER_SUBJECT);

      // Add to final list
      selected.forEach(q => {
        selectedQuestionsForGrade.push({
          ...q,
          subject, // Ensure subject is present
          grade,
          pack_id: packId
        });
      });

      subjectCounts[subject] = selected.length;
    }

    if (selectedQuestionsForGrade.length > 0) {
      packData.grades.push(grade);
      packData.packs[grade] = {
        grade,
        questionCount: selectedQuestionsForGrade.length,
        subjectCounts,
        questions: selectedQuestionsForGrade,
        warnings: gradeWarnings.length > 0 ? gradeWarnings : undefined
      };
    }
  }

  // 4. Return JSON
  return new Response(JSON.stringify(packData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Generated-By': 'Cloudflare Worker (Infinite Rotation)'
    }
  });
};
