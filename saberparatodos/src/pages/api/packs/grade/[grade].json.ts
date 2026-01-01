import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPackId, getNextRotationDate, seededShuffle, ROTATION_DAYS, QUESTIONS_PER_SUBJECT, MAX_WEEKLY_QUESTIONS } from '../../../../utils/rotation-logic';
import { getAllQuestionsFromBundle, type QuestionEntry } from '../../../../utils/questionParser';

/**
 * Normalize subject names to prevent duplicates
 * Maps all variants to a canonical form
 */
function normalizeSubject(subject: string): string {
  const s = subject.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[-_\/]/g, ' ') // Replace separators with space
    .replace(/\s+/g, ' ') // Compress multiple spaces
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

/**
 * Dynamic Grade-Specific Pack Endpoint
 * Serves questions only for the requested grade
 * Route: /api/packs/grade/[grade].json
 */
export const GET: APIRoute = async ({ params }) => {
  const gradeParam = params.grade;
  const grade = parseInt(gradeParam || '11', 10);

  // Validate grade
  const validGrades = [3, 5, 6, 7, 8, 9, 10, 11];
  if (!validGrades.includes(grade)) {
    return new Response(JSON.stringify({
      error: 'Invalid grade',
      valid_grades: validGrades
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Calculate Time-Based Seed
  const packId = getPackId();
  const nextRotation = getNextRotationDate();

  console.log(`📦 Generating Pack for Grade ${grade}: ${packId}`);

  // Load ALL Bundles (Source of Truth)
  const allBundles = await getCollection('questions');

  // Filter bundles for this specific grade only
  const gradeBundles = allBundles.filter(b => b.data.grado === grade);

  if (gradeBundles.length === 0) {
    return new Response(JSON.stringify({
      pack_id: packId,
      grade,
      questions: [],
      message: `No questions found for grade ${grade}`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

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

  // Select questions using the Seed
  const selectedQuestions: any[] = [];
  const subjects = Object.keys(questionsBySubject);
  const subjectCounts: Record<string, number> = {};

  for (const subject of subjects) {
    const pool = questionsBySubject[subject];
    if (pool.length === 0) continue;

    // Deterministic Shuffle
    const seed = `${packId}-${grade}-${subject}`;
    const shuffled = seededShuffle(pool, seed);

    // 🆕 Use global limit: 20 per subject for ~100 total questions per grade
    const selected = shuffled.slice(0, QUESTIONS_PER_SUBJECT);

    // Add to final list with metadata
    selected.forEach(q => {
      selectedQuestions.push({
        ...q,
        subject,
        grade,
        pack_id: packId
      });
    });

    subjectCounts[subject] = selected.length;
  }

  const packData = {
    pack_id: packId,
    generated_at: new Date().toISOString(),
    next_rotation: nextRotation,
    rotation_days: ROTATION_DAYS,
    country: 'co',
    exam: 'icfes',
    grade,
    questionCount: selectedQuestions.length,
    subjectCounts,
    questions: selectedQuestions
  };

  // Cache at CDN for 1 hour
  return new Response(JSON.stringify(packData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Generated-By': 'Cloudflare Worker (Grade-Specific Pack)',
      'X-Grade': grade.toString()
    }
  });
};

// Pre-render for all valid grades at build time
export function getStaticPaths() {
  return [
    { params: { grade: '3' } },
    { params: { grade: '5' } },
    { params: { grade: '6' } },
    { params: { grade: '7' } },
    { params: { grade: '8' } },
    { params: { grade: '9' } },
    { params: { grade: '10' } },
    { params: { grade: '11' } },
  ];
}
