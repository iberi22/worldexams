/**
 * API Endpoint: /api/universal-questions
 *
 * Returns universal questions filtered by criteria.
 * This endpoint is used to fetch questions that can be shared
 * across different exam types in the same language.
 *
 * Query Parameters:
 * - lang: Language family (default: 'es')
 * - exam: Target exam type (optional, e.g., 'MX-ENLACE')
 * - subject: Subject filter (optional)
 * - grade: Grade level filter (optional)
 * - difficulty: Difficulty filter 1-5 (optional)
 * - count: Number of questions to return (default: 10)
 *
 * Example:
 * /api/universal-questions?lang=es&exam=MX-ENLACE&subject=matematicas&count=5
 */

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  buildUniversalQuestionPool,
  getRandomUniversalQuestions,
  analyzeUniversalQuestions
} from '../../utils/universalQuestions';
import { isBundle } from '../../utils/questionParser';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);

  // Parse query parameters
  const lang = url.searchParams.get('lang') || 'es';
  const exam = url.searchParams.get('exam') || undefined;
  const subject = url.searchParams.get('subject') || undefined;
  const gradeParam = url.searchParams.get('grade');
  const difficultyParam = url.searchParams.get('difficulty');
  const countParam = url.searchParams.get('count');
  const statsOnly = url.searchParams.get('stats') === 'true';

  const grade = gradeParam ? parseInt(gradeParam) : undefined;
  const difficulty = difficultyParam ? parseInt(difficultyParam) : undefined;
  const count = countParam ? parseInt(countParam) : 10;

  try {
    // Get all question entries
    const entries = await getCollection('questions');

    // If stats only, return analytics
    if (statsOnly) {
      const stats = analyzeUniversalQuestions(entries);
      return new Response(JSON.stringify({
        success: true,
        stats: {
          totalBundles: stats.totalBundles,
          universalBundles: stats.universalBundles,
          byLanguage: Object.fromEntries(stats.byLanguage),
          bySubject: Object.fromEntries(stats.bySubject),
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Build universal pool with criteria
    const pool = buildUniversalQuestionPool(entries, {
      languageFamily: lang,
      targetExam: exam,
      gradeRange: grade ? { min: grade, max: grade } : undefined,
      subject,
      difficulty
    });

    // Get random questions from pool
    const questions = getRandomUniversalQuestions(pool, count, {
      subject,
      grade,
      difficulty
    });

    return new Response(JSON.stringify({
      success: true,
      meta: {
        language: lang,
        poolSize: pool.totalQuestions,
        returned: questions.length,
        filters: { exam, subject, grade, difficulty }
      },
      questions
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching universal questions:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error fetching questions',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
