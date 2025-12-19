
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

// Helper to normalize subjects
function slugifySubject(input: string): string {
  const s = (input || '').toLowerCase().trim();
  if (s.includes('matem')) return 'matematicas';
  if (s.includes('lectura')) return 'lectura_critica';
  if (s.includes('ciencias') || s.includes('biolog') || s.includes('quim') || s.includes('fisic')) return 'ciencias_naturales';
  if (s.includes('social')) return 'sociales_y_ciudadanas';
  if (s.includes('ingl')) return 'ingles';
  return s.normalize('NFD').replace(/\p{Diacritic}+/gu, '').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

function parseOptions(optionsText: string) {
  const lines = optionsText.split('\n').filter(line => line.trim());
  const options = [];
  for (const rawLine of lines) {
    const line = rawLine.trim();
    // Regex allows bullets (- or *) and separators () or .)
    const match = line.match(/^\s*[-\*]\s*\[([xX\s])\]\s*([A-D])[)\.]\s*(.+)$/i);
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

function extractSection(markdown: string, startMarker: string, endMarker: string): string {
  const startIndex = markdown.indexOf(startMarker);
  if (startIndex === -1) return '';
  const contentStart = startIndex + startMarker.length;
  // Try to find end marker or next header
  let endIndex = markdown.indexOf(endMarker, contentStart);

  // Also check for next header if it comes sooner
  const nextHeaderRegex = /\n###? /g;
  nextHeaderRegex.lastIndex = contentStart;
  const headerMatch = nextHeaderRegex.exec(markdown);

  if (headerMatch && (endIndex === -1 || headerMatch.index < endIndex)) {
      endIndex = headerMatch.index;
  }

  if (endIndex === -1) return markdown.substring(contentStart).trim();
  return markdown.substring(contentStart, endIndex).trim();
}

export const GET: APIRoute = async () => {
    try {
        const entries = await getCollection('questions');
        // Shuffle all questions
        const shuffled = entries.sort(() => 0.5 - Math.random());

        // Take up to 150 questions for a robust sample
        const selected = shuffled.slice(0, 150);

        const questions = selected.map(entry => {
             const body = entry.body || '';
             // Use v1 default
             const questionText = extractSection(body, '### Enunciado', '###') || entry.data.id;
             const optionsText = extractSection(body, '### Opciones', '###') || '';
             const explanation = extractSection(body, '### Explicación', '---') || '';
             const options = parseOptions(optionsText);

             return {
                id: `${entry.data.id}-v1`,
                statement: questionText,
                options: options,
                correct_answer: options.find(o => o.is_correct)?.letter || 'A',
                explanation: explanation,
                grade: entry.data.grado,
                subject: slugifySubject(entry.data.asignatura),
                difficulty: (entry.data as any).dificultad || 3,
                bundle_id: entry.data.id
             };
        }).filter(q => q.options.length >= 2); // Ensure validity

        return new Response(JSON.stringify({
            generated_at: new Date().toISOString(),
            count: questions.length,
            questions: questions
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
    }
}
