import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  buildUniversalQuestionPool,
  analyzeUniversalQuestions
} from '../../utils/universalQuestions';

// This will be pre-rendered at build time for static hosting
export const prerender = true;

export const GET: APIRoute = async () => {
  const entries = await getCollection('questions');
  const pool = buildUniversalQuestionPool(entries, { languageFamily: 'es' });
  const stats = analyzeUniversalQuestions(entries);

  const poolData = {
    meta: {
      language: 'es',
      generatedAt: new Date().toISOString(),
      totalQuestions: pool.totalQuestions,
      stats: {
        totalBundles: stats.totalBundles,
        universalBundles: stats.universalBundles,
        bySubject: Object.fromEntries(stats.bySubject),
      }
    },
    bySubject: Object.fromEntries(pool.bySubject),
    byGrade: Object.fromEntries(pool.byGrade),
    byDifficulty: Object.fromEntries(pool.byDifficulty),
    questions: pool.all
  };

  return new Response(JSON.stringify(poolData, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};
