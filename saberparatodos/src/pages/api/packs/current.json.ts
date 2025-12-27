import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getPackId, getNextRotationDate, seededShuffle, ROTATION_DAYS, QUESTIONS_PER_SUBJECT } from '../../../utils/rotation-logic';
import { getAllQuestionsFromBundle, type QuestionEntry } from '../../../utils/questionParser';

export const GET: APIRoute = async ({ request }) => {
  // 1. Calculate Time-Based Seed
  const packId = getPackId();
  const nextRotation = getNextRotationDate();

  console.log(`📦 Generating Pack: ${packId} (Next Rotation: ${nextRotation})`);

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
    grades: [] as number[],
    // We return questions grouped by grade for the frontend to consume easily
    // or we could return a flattened list.
    // The previous system used separate files per grade.
    // For this "Infinite Rotation" endpoint, let's return a comprehensive structure
    // that the frontend can parse.
    packs: {} as Record<number, any>
  };

  for (const grade of grades) {
    // Filter bundles for this grade
    const gradeBundles = allBundles.filter(b => b.data.grado === grade);

    if (gradeBundles.length === 0) continue;

    // Group by subject
    const questionsBySubject: Record<string, any[]> = {};

    for (const bundle of gradeBundles) {
      const subject = bundle.data.asignatura.toLowerCase();
      if (!questionsBySubject[subject]) {
        questionsBySubject[subject] = [];
      }

      // Parse questions from bundle
      // We cast bundle to QuestionEntry because getCollection returns a compatible structure
      // but types might mismatch slightly on 'render' function which we don't use here.
      const questions = getAllQuestionsFromBundle(bundle as unknown as QuestionEntry);
      questionsBySubject[subject].push(...questions);
    }

    // Select questions for this grade using the Seed
    const selectedQuestionsForGrade: any[] = [];
    const subjects = Object.keys(questionsBySubject);
    const subjectCounts: Record<string, number> = {};

    for (const subject of subjects) {
      const pool = questionsBySubject[subject];
      if (pool.length === 0) continue;

      // Deterministic Shuffle
      const seed = `${packId}-${grade}-${subject}`;
      const shuffled = seededShuffle(pool, seed);

      // Take limited amount
      const selected = shuffled.slice(0, QUESTIONS_PER_SUBJECT);

      // Add to final list
      // Flatten structure: Add subject/grade to question object for easier frontend consumption
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
        questions: selectedQuestionsForGrade
      };
    }
  }

  // 4. Return JSON with Cache Logic
  // Cache at CDN (public) for 1 hour.
  // The content changes weekly, but we want short caching to propagate rotation updates reasonably fast.
  // or we could cache for longer if we rely on packId changes.
  // Let's cache for 1 hour to balance performance and "live" feel.
  return new Response(JSON.stringify(packData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Generated-By': 'Cloudflare Worker (Infinite Rotation)'
    }
  });
};
