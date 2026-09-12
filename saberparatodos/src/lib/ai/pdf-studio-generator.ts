/**
 * saberparatodos/src/lib/ai/pdf-studio-generator.ts
 * Generador v5.2 desde fragmentos (chunks) PDF utilizando LLM on-device real (Chrome Built-in AI / Gemini Nano).
 * Cero llaves cloud, cero telemetría (BR-03/BR-07). NUNCA autopublica a questions_data/.
 */

import type { Chunk } from './pdf/chunker';
import {
  type ExamGenerateResult,
  type LocalGeneratedQuestion,
  getCountryRuleHint,
  validateLocalQuestion,
  parseLlmQuestions,
  assembleFromPool,
} from './exam-generator';
import {
  isChromeNanoAvailable,
  createChromeNanoSession,
  ChromeNanoProvider,
} from './chrome-nano-provider';

export interface PdfStudioGenerateOptions {
  subject?: string;
  grade?: number;
  count?: number;
  topic?: string;
  countryCode?: string;
  bundleIndex?: number;
}

/**
 * Returns expected protocol v5.2 question count per grade:
 * - Grades 3–5: 8 questions
 * - Grades 6–7: 10 questions
 * - Grades 8–10: 12 questions
 * - Grade 11: 20 questions
 */
export function getExpectedQuestionCount(grade: number): number {
  if (grade >= 3 && grade <= 5) return 8;
  if (grade >= 6 && grade <= 7) return 10;
  if (grade >= 8 && grade <= 10) return 12;
  if (grade === 11) return 20;
  return 10;
}

export function buildPdfStudioPrompt(
  chunksText: string,
  req: { subject: string; grade: number; count: number; topic?: string; countryCode?: string }
): string {
  const regionHint = getCountryRuleHint(req.countryCode);

  return `Genera exactamente ${req.count} preguntas de opción múltiple formato v5.2 para la asignatura "${req.subject}", grado ${req.grade}°${
    req.topic ? ` sobre el tema "${req.topic}"` : ''
  }.
${regionHint ? `Lineamiento curricular regional: ${regionHint}\n` : ''}

Basándote en el siguiente contenido extraído del PDF:
"""
${chunksText.slice(0, 3500)}
"""

Formato estricto: responde ÚNICAMENTE un JSON array válido. Cada objeto del array debe tener exactamente la siguiente estructura:
{
  "statement": "Enunciado claro de la pregunta...",
  "context": "Texto de contexto o fragmento de lectura (opcional)",
  "options": [
    {"letter": "A", "text": "Opción A", "is_correct": false, "feedback": "Explicación de por qué A es incorrecta"},
    {"letter": "B", "text": "Opción B", "is_correct": true, "feedback": "Explicación de por qué B es correcta"},
    {"letter": "C", "text": "Opción C", "is_correct": false, "feedback": "Explicación de por qué C es incorrecta"},
    {"letter": "D", "text": "Opción D", "is_correct": false, "feedback": "Explicación de por qué D es incorrecta"}
  ],
  "correct_answer": "B",
  "explanation": "Explicación pedagógica detallada de la respuesta correcta",
  "difficulty": "D5",
  "bloom": "Comprender"
}

Reglas v5.2 obligatorias:
1. Exactamente 4 opciones A, B, C, D.
2. Exactamente una opción con is_correct: true.
3. Prohibido usar "todas las anteriores", "ninguna de las anteriores", "a y b".
4. Dificultades válidas: D3, D5, D7, D9.
5. Incluir feedback en las 4 opciones y una explicación pedagógica completa.`;
}

/**
 * Genera preguntas v5.2 a partir de fragmentos PDF usando Gemini Nano on-device.
 * Si Nano no está disponible o falla la generación, aplica degradación honesta a plantilla editable.
 */
export async function generateQuestionsFromChunks(
  chunks: Chunk[],
  opts: PdfStudioGenerateOptions = {},
  provider?: ChromeNanoProvider
): Promise<ExamGenerateResult> {
  const grade = opts.grade ?? 11;
  const count = opts.count ?? getExpectedQuestionCount(grade);
  const subject = opts.subject ?? 'Matemáticas';
  const countryCode = opts.countryCode ?? 'CO';
  const topic = opts.topic;

  const metadata = {
    creador: 'local-llm' as const,
    protocol_hint: '5.2' as const,
    generatedAt: Date.now(),
    subject,
    grade,
  };

  const chunksText = chunks.map((c) => c.text).join('\n\n');

  const available = provider
    ? await provider.isAvailable()
    : await isChromeNanoAvailable();

  if (available) {
    try {
      const prompt = buildPdfStudioPrompt(chunksText, {
        subject,
        grade,
        count,
        topic,
        countryCode,
      });

      let rawResponse = '';
      if (provider) {
        rawResponse = await provider.generateResponse(prompt);
      } else {
        const session = await createChromeNanoSession({
          systemPrompt:
            'Eres un experto diseñador de evaluaciones educativas v5.2. Generas respuestas en formato JSON estricto.',
          temperature: 0.3,
        });
        try {
          rawResponse = await session.prompt(prompt);
        } finally {
          if (typeof session.destroy === 'function') {
            session.destroy();
          } else if (typeof session.close === 'function') {
            session.close();
          }
        }
      }

      const parsed = parseLlmQuestions(rawResponse, count);
      if (parsed.length > 0 && parsed.every(validateLocalQuestion)) {
        return {
          questions: parsed.slice(0, count),
          mode: 'llm-validated',
          metadata,
        };
      }
    } catch (err) {
      console.warn('[PdfStudioGenerator] Failed to generate questions via Chrome Nano:', err);
    }
  }

  // Fallback honesto cuando Nano no está disponible o la generación falla
  let poolQuestions = assembleFromPool({
    subject,
    grade,
    count,
    topic,
    countryCode,
  });

  if (poolQuestions.length < count) {
    const missing = count - poolQuestions.length;
    const synthetic = generateTemplateFallback({ subject, grade, count: missing, topic }, chunksText, poolQuestions.length);
    poolQuestions = [...poolQuestions, ...synthetic];
  }

  return {
    questions: poolQuestions,
    mode: 'pool-assembled',
    warning:
      'Tu navegador no tiene IA local disponible (Gemini Nano); el borrador fue generado mediante la plantilla editable.',
    metadata,
  };
}

function generateTemplateFallback(
  req: { subject: string; grade: number; count: number; topic?: string },
  chunksText: string,
  startIndex = 0
): LocalGeneratedQuestion[] {
  const list: LocalGeneratedQuestion[] = [];
  for (let i = 0; i < req.count; i++) {
    const num = startIndex + i + 1;
    list.push({
      id: `local-template-${num}-${Date.now().toString(36)}`,
      number: num,
      statement: `[Plantilla Editable ${num}] Enunciado sobre ${req.topic || req.subject} (Grado ${req.grade}°)...`,
      context: chunksText ? chunksText.slice(0, 250) : undefined,
      options: [
        { letter: 'A', text: 'Opción A (Respuesta correcta)', is_correct: true, feedback: 'Respuesta clave editable.' },
        { letter: 'B', text: 'Opción B (Distractor 1)', is_correct: false, feedback: 'Distractor 1 editable.' },
        { letter: 'C', text: 'Opción C (Distractor 2)', is_correct: false, feedback: 'Distractor 2 editable.' },
        { letter: 'D', text: 'Opción D (Distractor 3)', is_correct: false, feedback: 'Distractor 3 editable.' },
      ],
      correct_answer: 'A',
      explanation: 'Explicación pedagógica de plantilla editable. Personaliza esta sección en el Studio.',
      difficulty: i < req.count / 2 ? 'D5' : 'D7',
      source: 'pool',
    });
  }
  return list;
}
