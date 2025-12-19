/**
 * API Endpoint: Subject Index
 * Returns metadata about a subject including total questions and pagination info
 * Limits data exposure to 20 questions per page to prevent scraping
 */

import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

function slugifySubject(input: string): string {
  const s = (input || '').toLowerCase().trim();
  // Minimal, stable slugs for known Saber 11 subjects.
  if (s.includes('matem')) return 'matematicas';
  if (s.includes('lectura')) return 'lectura_critica';
  if (s.includes('ciencias') || s.includes('biolog') || s.includes('quim') || s.includes('fisic')) return 'ciencias_naturales';
  if (s.includes('social')) return 'sociales_y_ciudadanas';
  if (s.includes('ingl')) return 'ingles';
  if (s.includes('inform')) return 'informatica';

  // Generic fallback
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export async function getStaticPaths() {
  const entries = await getCollection('questions');

  const unique = new Set<string>();
  const paths: Array<{ params: { country: string; exam: string; grade: string; subject: string } }> = [];

  for (const entry of entries) {
    const country = String(entry.data.country || '').toLowerCase();
    const grade = String(entry.data.grado ?? '');
    const subject = slugifySubject(String(entry.data.asignatura || ''));

    if (!country || !grade || !subject) continue;

    // This repo targets ICFES.
    const exam = 'icfes';
    const key = `${country}|${exam}|${grade}|${subject}`;
    if (unique.has(key)) continue;

    unique.add(key);
    paths.push({
      params: { country, exam, grade, subject },
    });
  }

  return paths;
}

export const GET: APIRoute = async ({ params }) => {
  const { country, exam, grade, subject } = params;

  if (!country || !grade || !subject) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Normalize subject names for comparison (handle spaces, hyphens, underscores, AND accents)
    const normalizeSubject = (str: string) =>
      str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics/accents
        .replace(/[\s_-]/g, '')
        .trim();

    // Fetch all questions from content collection
    const allQuestions = await getCollection('questions', (entry) => {
      const isMatch =
        entry.data.country?.toLowerCase() === country.toLowerCase() &&
        entry.data.grado === parseInt(grade) &&
        normalizeSubject(entry.data.asignatura || '') === normalizeSubject(subject);

      return isMatch;
    });

    const QUESTIONS_PER_PAGE = 20; // 🔒 Security: Limit to 20 questions per page
    const totalPages = Math.ceil(allQuestions.length / QUESTIONS_PER_PAGE);

    const index = {
      subject: subject,
      total_questions: allQuestions.length,
      total_pages: totalPages,
      questions_per_page: QUESTIONS_PER_PAGE,
      time_limit_minutes: 60,
      topics: [...new Set(allQuestions.map(q => q.data.tema))],
      pages: Array.from({ length: totalPages }, (_, i) => ({
        url: `/api/${country}/${exam}/${grade}/${subject}/${i + 1}.json`,
        page: i + 1
      })),
      generated_at: new Date().toISOString()
    };

    return new Response(JSON.stringify(index, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache 1 hour
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error generating subject index:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
