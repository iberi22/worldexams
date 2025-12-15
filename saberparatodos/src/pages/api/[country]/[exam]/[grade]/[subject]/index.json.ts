/**
 * API Endpoint: Subject Index
 * Returns metadata about a subject including total questions and pagination info
 * Limits data exposure to 20 questions per page to prevent scraping
 */

import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const { country, exam, grade, subject } = params;

  if (!country || !grade || !subject) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Fetch all questions from content collection
    const allQuestions = await getCollection('questions', (entry) => {
      const isMatch =
        entry.data.country?.toLowerCase() === country.toLowerCase() &&
        entry.data.grado === parseInt(grade) &&
        entry.data.asignatura?.toLowerCase().replace(/\s/g, '_') === subject.toLowerCase().replace(/\s/g, '_');

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
