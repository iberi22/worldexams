/**
 * API Endpoint: Paginated Questions
 * Returns a specific page of questions for a subject
 * 🔒 Security: Maximum 20 questions per page to prevent bulk scraping
 */

import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const QUESTIONS_PER_PAGE = 20; // 🔒 Hard limit to prevent API abuse

function slugifySubject(input: string): string {
  const s = (input || '').toLowerCase().trim();
  if (s.includes('matem')) return 'matematicas';
  if (s.includes('lectura')) return 'lectura_critica';
  if (s.includes('ciencias') || s.includes('biolog') || s.includes('quim') || s.includes('fisic')) return 'ciencias_naturales';
  if (s.includes('social')) return 'sociales_y_ciudadanas';
  if (s.includes('ingl')) return 'ingles';
  if (s.includes('tecnolog') || s.includes('informatic')) return 'tecnologia_informatica';
  if (s.includes('filosof')) return 'filosofia';
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export async function getStaticPaths() {
  const entries = await getCollection('questions');

  // Group by (country, grade, subjectSlug)
  const groups = new Map<string, { country: string; grade: string; subject: string; count: number }>();

  for (const entry of entries) {
    const country = String(entry.data.country || '').toUpperCase();
    const grade = String(entry.data.grado ?? '');
    const subject = slugifySubject(String(entry.data.asignatura || ''));
    if (!country || !grade || !subject) continue;

    const key = `${country}|${grade}|${subject}`;
    const existing = groups.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      groups.set(key, { country, grade, subject, count: 1 });
    }
  }

  const exam = 'icfes';
  const paths: Array<{ params: { country: string; exam: string; grade: string; subject: string; page: string } }> = [];

  for (const g of groups.values()) {
    const totalPages = Math.max(1, Math.ceil(g.count / QUESTIONS_PER_PAGE));
    for (let page = 1; page <= totalPages; page++) {
      paths.push({
        params: {
          country: g.country,
          exam,
          grade: g.grade,
          subject: g.subject,
          page: String(page),
        },
      });
    }
  }

  return paths;
}

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
    // Normalize subject names for comparison (handle spaces, hyphens, underscores, AND accents)
    const normalizeSubject = (str: string) =>
      str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics/accents
        .replace(/[\s_-]/g, '')
        .trim();

    // Fetch all matching questions from content collection
    const allQuestions = await getCollection('questions', (entry) => {
      return (
        entry.data.country?.toLowerCase() === country.toLowerCase() &&
        entry.data.grado === parseInt(grade) &&
        normalizeSubject(entry.data.asignatura || '') === normalizeSubject(subject)
        // Note: Removed estado === 'published' filter to include draft questions too
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

      // Debug: Log body length for first math question
      if (entry.data.asignatura?.toLowerCase().includes('mat') && index === 0) {
        console.log(`🔍 First matemáticas question:`);
        console.log(`   ID: ${entry.data.id}`);
        console.log(`   Body length: ${body.length} chars`);
        console.log(`   Has "### Opciones": ${body.includes('### Opciones')}`);
        console.log(`   Has "### Explicación": ${body.includes('### Explicación')}`);
      }

      // Extract question variants from markdown (v1-v7 format)
      const questionMatches = body.matchAll(/## Pregunta \d+ \((.*?)\)/g);
      const variants = Array.from(questionMatches);

      // Use first variant (v1) as default
      const questionText = extractSection(body, '### Enunciado', '### Opciones') || entry.data.id;
      const optionsText = extractSection(body, '### Opciones', '### Explicación') || '';
      const explanation = extractSection(body, '### Explicación Pedagógica', '---') || '';

      // Debug: Log extracted sections for first math question
      if (entry.data.asignatura?.toLowerCase().includes('mat') && index === 0) {
        console.log(`   Extracted optionsText length: ${optionsText.length} chars`);
        console.log(`   First 200 chars: "${optionsText.substring(0, 200)}"`);
      }

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
        difficulty: mapDifficulty((entry.data as any).dificultad),
        bundle_id: entry.data.id,
        source_url: entry.data.source_url || '',
        tags: [entry.data.tema, entry.data.asignatura],
        images: [],
        // Modern questions metadata
        modern_context: (entry.data as any).modern_context || false,
        context_type: (entry.data as any).context_type || null,
        context_tags: (entry.data as any).context_tags || []
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
  if (startIndex === -1) {
    console.warn(`⚠️ extractSection: Start marker "${startMarker}" not found`);
    return '';
  }

  const contentStart = startIndex + startMarker.length;

  // Find the next occurrence of the end marker OR any "### " pattern (next H3 header)
  let endIndex = -1;

  // First try exact match for end marker
  const exactEndIndex = markdown.indexOf(endMarker, contentStart);

  // Also find any next H3 header starting from content
  const lines = markdown.substring(contentStart).split('\n');
  let charCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check if this line starts a new section (H2 or H3)
    if ((line.startsWith('### ') || line.startsWith('## ')) && i > 0) {
      endIndex = contentStart + charCount;
      break;
    }
    charCount += line.length + 1; // +1 for newline
  }

  // Use the earlier of the two end points
  if (exactEndIndex !== -1 && (endIndex === -1 || exactEndIndex < endIndex)) {
    endIndex = exactEndIndex;
  }

  const result = endIndex === -1
    ? markdown.substring(contentStart).trim()
    : markdown.substring(contentStart, endIndex).trim();

  return result;
}

function parseOptions(optionsText: string): Array<{ letter: string; text: string; is_correct: boolean }> {
  const lines = optionsText.split('\n').filter(line => line.trim());
  const options: Array<{ letter: string; text: string; is_correct: boolean }> = [];

  // Debug logging (will appear in build output)
  if (lines.length > 0 && lines.length < 4) {
    console.warn(`⚠️ parseOptions: Only ${lines.length} lines found. Expected 4.`);
    console.warn(`Lines:`, lines);
  }

  for (const line of lines) {
    // Regex matches: - [x] A) text or - [ ] B) text
    const match = line.match(/^-\s*\[(x| )\]\s*([A-D])\)\s*(.+)$/i);
    if (match) {
      options.push({
        letter: match[2].toUpperCase(),
        text: match[3].trim(),
        is_correct: match[1].toLowerCase() === 'x'
      });
    } else {
      // Log lines that don't match (for debugging)
      if (line.includes('A)') || line.includes('B)') || line.includes('C)') || line.includes('D)')) {
        console.warn(`⚠️ parseOptions: Line didn't match regex: "${line}"`);
      }
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
