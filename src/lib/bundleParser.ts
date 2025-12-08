import type { CollectionEntry } from 'astro:content';

// Aligned with src/lib/types.ts Question interface
export interface ParsedQuestion {
  id: string;
  content: string; // Was: statement
  options: { id: string; letter: string; text: string; isCorrect: boolean }[];
  explanation: string;
  subject: string;
  topic: string;
  difficulty?: string;
  context?: string;
}

export function parseQuestionsFromBundle(entry: CollectionEntry<'questions'>): ParsedQuestion[] {
  const rawContent = entry.body;

  // Detect if it's a Bundle or Legacy File
  // Legacy files usually don't have '## Pregunta' multiple times or at all
  const isBundle = entry.data.total_questions !== undefined || rawContent.includes('## Pregunta');

  if (!isBundle) {
    // Legacy Parser
    return parseLegacyQuestion(entry);
  }

  // Bundle Parser
  const chunks = rawContent.split(/^## Pregunta/m);
  const contextChunk = chunks[0]; // Everything before first question
  const questionChunks = chunks.slice(1); // The questions

  // Extract Context (Texto Base)
  // Usually starts with # Texto Base
  let context = '';
  if (contextChunk.includes('# Texto Base')) {
      const contextParts = contextChunk.split('# Texto Base');
      if (contextParts[1]) {
          context = contextParts[1].split('---')[0].trim();
          // Remove quotes if present? Keep them for now.
      }
  }

  const parsedQuestions: ParsedQuestion[] = [];

  for (const chunk of questionChunks) {
    const q = parseSingleQuestionChunk(chunk);
    if (q) {
      q.subject = entry.data.asignatura;
      q.topic = entry.data.tema;
      q.context = context;

      // Override ID if present in chunk, else generate or use bundle ID + index
      // The chunk parser should find **ID:** "..."
      parsedQuestions.push(q);
    }
  }

  return parsedQuestions;
}

function parseLegacyQuestion(entry: CollectionEntry<'questions'>): ParsedQuestion[] {
   const rawContent = entry.body;
   const q = parseSingleQuestionChunk(rawContent);
   if (!q) return [];

   q.id = entry.data.id;
   q.subject = entry.data.asignatura;
   q.topic = entry.data.tema;
   // Legacy might not have explicit ID in body
   return [q];
}

function parseSingleQuestionChunk(text: string): ParsedQuestion | null {
    const lines = text.split('\n');
    let id = '';
    let content = '';
    let options: { id: string; letter: string; text: string; isCorrect: boolean }[] = [];
    let explanation = '';
    let difficulty = 'Medium'; // Default

    // Extract ID
    const idMatch = text.match(/\*\*ID:\*\*\s*"([^"]+)"/);
    if (idMatch) id = idMatch[1];

    // Extract Difficulty from header line (passed in text usually starts with " 1 (Original - Dificultad Medium)")
    // But since we split by "## Pregunta", the first line is " 1 (Original - Dificultad Medium)"
    const firstLine = lines[0];
    if (firstLine.includes('Low')) difficulty = 'Low';
    else if (firstLine.includes('High')) difficulty = 'High';
    else if (firstLine.includes('Medium')) difficulty = 'Medium';

    // Split by sections
    // ### Enunciado
    // ### Opciones
    // ### Explicación

    // Simple state machine or regex splitting
    const sections = text.split(/^###\s+/m);

    for (const section of sections) {
        const sLines = section.trim().split('\n');
        const title = sLines[0].toLowerCase();
        const sectionContent = sLines.slice(1).join('\n').trim();

        if (title.startsWith('enunciado') || title.startsWith('statement')) {
            content = sectionContent;
        } else if (title.startsWith('opciones') || title.startsWith('options')) {
            const optionMatches = sectionContent.matchAll(/- \[([ x])\] ([A-D])\) (.+)/g);
            for (const match of optionMatches) {
                options.push({
                    id: match[2], // Use letter as ID
                    letter: match[2],
                    text: match[3],
                    isCorrect: match[1] === 'x' || match[1] === 'X',
                });
            }
        } else if (title.startsWith('explicación') || title.startsWith('explanation')) {
            explanation = sectionContent;
        }
    }

    if (!content && !options.length) return null;

    return {
        id,
        content,
        options,
        explanation,
        subject: '', // Filled by parent
        topic: '',   // Filled by parent
        difficulty,
        context: ''  // Filled by parent
    };
}
