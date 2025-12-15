/**
 * API Endpoint: Paginated Questions
 * Returns a specific page of questions for a subject
 * 🔒 Security: Maximum 20 questions per page to prevent bulk scraping
 */

import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const QUESTIONS_PER_PAGE = 20; // 🔒 Hard limit to prevent API abuse

export const GET: APIRoute = async ({ params }) => {
  const { country, exam, grade, subject, page } = params;

  if (!country || !grade || !subject || !page) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const pageNum = parseInt(page);
  if (isNaN(pageNum) || pageNum < 1) {
    return new Response(JSON.stringify({ error: 'Invalid page number' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Fetch all matching questions from content collection
    const allQuestions = await getCollection('questions', (entry) => {
      return (
        entry.data.country?.toLowerCase() === country.toLowerCase() &&
        entry.data.grado === parseInt(grade) &&
        entry.data.asignatura?.toLowerCase().replace(/\s/g, '_') === subject.toLowerCase().replace(/\s/g, '_') &&
        entry.data.estado === 'published' // Only published questions
      );
    });

    // Calculate pagination
    const totalPages = Math.ceil(allQuestions.length / QUESTIONS_PER_PAGE);

    if (pageNum > totalPages) {
      return new Response(JSON.stringify({ error: 'Page not found', total_pages: totalPages }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const startIndex = (pageNum - 1) * QUESTIONS_PER_PAGE;
    const endIndex = startIndex + QUESTIONS_PER_PAGE;
    const paginatedQuestions = allQuestions.slice(startIndex, endIndex);

    // Transform to API format
    const questions = paginatedQuestions.map((entry, index) => {
      const body = entry.body || '';

      // Extract question variants from markdown (v1-v7 format)
      const questionMatches = body.matchAll(/## Pregunta \d+ \((.*?)\)/g);
      const variants = Array.from(questionMatches);

      // Use first variant (v1) as default
      const questionText = extractSection(body, '### Enunciado', '### Opciones') || entry.data.id;
      const optionsText = extractSection(body, '### Opciones', '### Explicación') || '';
      const explanation = extractSection(body, '### Explicación Pedagógica', '---') || '';

      // Parse options
      const options = parseOptions(optionsText);
      const correctOption = options.find(opt => opt.is_correct);

      return {
        id: `${entry.data.id}-v1`,
        number: startIndex + index + 1,
        statement: questionText.trim(),
        options: options,
        correct_answer: correctOption?.letter || 'A',
        explanation: explanation.trim(),
        difficulty: mapDifficulty(entry.data.dificultad),
        bundle_id: entry.data.id,
        source_url: entry.data.source_url || '',
        tags: [entry.data.tema, entry.data.asignatura],
        images: []
      };
    });

    const response = {
      page: pageNum,
      total_pages: totalPages,
      questions_per_page: QUESTIONS_PER_PAGE,
      total_questions: allQuestions.length,
      questions: questions,
      generated_at: new Date().toISOString()
    };

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'X-Total-Questions': allQuestions.length.toString(),
        'X-Page': pageNum.toString(),
        'X-Total-Pages': totalPages.toString()
      }
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Helper functions
function extractSection(markdown: string, startMarker: string, endMarker: string): string {
  const startIndex = markdown.indexOf(startMarker);
  if (startIndex === -1) return '';

  const contentStart = startIndex + startMarker.length;
  const endIndex = markdown.indexOf(endMarker, contentStart);

  return endIndex === -1
    ? markdown.substring(contentStart).trim()
    : markdown.substring(contentStart, endIndex).trim();
}

function parseOptions(optionsText: string): Array<{ letter: string; text: string; is_correct: boolean }> {
  const lines = optionsText.split('\n').filter(line => line.trim());
  const options: Array<{ letter: string; text: string; is_correct: boolean }> = [];

  for (const line of lines) {
    const match = line.match(/^-\s*\[(x| )\]\s*([A-D])\)\s*(.+)$/i);
    if (match) {
      options.push({
        letter: match[2].toUpperCase(),
        text: match[3].trim(),
        is_correct: match[1].toLowerCase() === 'x'
      });
    }
  }

  return options;
}

function mapDifficulty(level?: number): string {
  if (!level) return 'Medium';
  if (level <= 2) return 'Low';
  if (level <= 3) return 'Medium';
  return 'High';
}
