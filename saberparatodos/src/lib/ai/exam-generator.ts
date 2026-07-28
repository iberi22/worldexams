/**
 * Local exam generator — RAG-lite over IndexedDB/local packs + v5.2-shaped output.
 * Never auto-publishes to questions_data/. Marks session metadata creador: local-llm.
 */

import type { APIQuestion } from '../api-service';
import { getQuestionPoolBySubject, getQuestionPool } from '../pack-storage';
import { getAiCore } from './ai-core-client';
import { recordMejoraInterna } from '../mejora-interna-telemetry';

export interface LocalGeneratedQuestion {
  id: string;
  number: number;
  statement: string;
  context?: string;
  options: { letter: string; text: string; is_correct: boolean; feedback?: string }[];
  correct_answer: string;
  explanation: string;
  difficulty: string;
  bloom?: string;
  source: 'llm' | 'pool';
}

export interface ExamGenerateRequest {
  subject: string;
  grade: number;
  count: number;
  topic?: string;
  countryCode?: string;
}

export interface ExamGenerateResult {
  questions: LocalGeneratedQuestion[];
  mode: 'llm-validated' | 'pool-assembled';
  warning?: string;
  metadata: {
    creador: 'local-llm';
    protocol_hint: '5.2';
    generatedAt: number;
    subject: string;
    grade: number;
  };
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

/**
 * Static regional hints distilled from skills/bundle-creator/rules/{CODE}.md
 * (those rule files are not shipped to the client). Keep to 2-3 lines each:
 * curriculum/exam framework + locale (currency, cities, register).
 */
export const COUNTRY_RULE_HINTS: Record<string, string> = {
  CO: 'Colombia: alinea con DBA/EBC del MEN y estilo Saber (ICFES solo en metadata, nunca en el enunciado). Usa español colombiano con seseo, pesos colombianos (COP), ciudades como Bogotá, Medellín o Cartagena y nombres locales (Juan, Valentina).',
  MX: 'México: alinea con SEP/NEM y prepa estilo EXANI-II (CENEVAL solo en metadata). Español mexicano (tú/ustedes), pesos mexicanos (MXN $), ciudades como CDMX, Guadalajara, Monterrey o Puebla.',
  AR: 'Argentina: alinea con NAP y evaluaciones Aprender. Español rioplatense con voseo moderado, pesos argentinos (ARS), ciudades como Buenos Aires, Córdoba o Rosario.',
  BR: 'Brasil: alinha com a BNCC e o estilo ENEM (INEP/MEC apenas em metadados). Português brasileiro padrão, reais (BRL R$), cidades como São Paulo, Rio de Janeiro ou Salvador.',
  CL: 'Chile: alinea con el currículum MINEDUC y estilo PAES. Español chileno estándar, pesos chilenos (CLP), ciudades como Santiago, Valparaíso o Concepción.',
  PE: 'Perú: alinea con el Currículo Nacional MINEDU. Español peruano estándar, soles (PEN S/), ciudades como Lima, Arequipa o Cusco.',
};

export function getCountryRuleHint(countryCode?: string): string {
  if (!countryCode) return '';
  return COUNTRY_RULE_HINTS[countryCode.toUpperCase()] ?? '';
}

function difficultyForIndex(i: number, total: number): string {
  const ratio = (i + 1) / total;
  if (ratio <= 0.2) return 'D3';
  if (ratio <= 0.5) return 'D5';
  if (ratio <= 0.8) return 'D7';
  return 'D9';
}

export function validateLocalQuestion(q: unknown): q is LocalGeneratedQuestion {
  if (!q || typeof q !== 'object') return false;
  const x = q as Record<string, unknown>;
  if (typeof x.statement !== 'string' || x.statement.trim().length < 8) return false;
  if (typeof x.explanation !== 'string' || x.explanation.trim().length < 8) return false;
  if (!Array.isArray(x.options) || x.options.length !== 4) return false;
  const opts = x.options as { letter?: string; text?: string; is_correct?: boolean }[];
  const letters = opts.map((o) => o.letter);
  if (LETTERS.some((L, i) => letters[i] !== L)) return false;
  if (opts.some((o) => typeof o.text !== 'string' || !o.text.trim())) return false;
  const correct = opts.filter((o) => o.is_correct === true);
  if (correct.length !== 1) return false;
  const banned = /todas las anteriores|ninguna de las anteriores|a y b/i;
  if (opts.some((o) => banned.test(o.text || ''))) return false;
  return true;
}

function poolToLocal(q: APIQuestion, number: number): LocalGeneratedQuestion {
  const options = (q.options || []).slice(0, 4).map((o, i) => ({
    letter: LETTERS[i] ?? String.fromCharCode(65 + i),
    text: o.text,
    is_correct: Boolean(o.is_correct),
    feedback: o.is_correct ? 'Opción correcta según el pack validado.' : 'Distractor del pack validado.',
  }));
  while (options.length < 4) {
    const i = options.length;
    options.push({
      letter: LETTERS[i],
      text: `Opción ${LETTERS[i]}`,
      is_correct: false,
      feedback: 'Completado localmente.',
    });
  }
  if (!options.some((o) => o.is_correct)) options[0].is_correct = true;
  const correct = options.find((o) => o.is_correct)!;
  return {
    id: `local-pool-${q.id || number}`,
    number,
    statement: q.statement,
    context: q.context,
    options,
    correct_answer: correct.letter,
    explanation: q.explanation || 'Explicación del pack validado local.',
    difficulty: q.difficulty || difficultyForIndex(number - 1, 10),
    source: 'pool',
  };
}

function assembleFromPool(req: ExamGenerateRequest): LocalGeneratedQuestion[] {
  const subjectKey = req.subject.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  let pool =
    getQuestionPoolBySubject(req.grade, subjectKey) ||
    getQuestionPoolBySubject(req.grade, req.subject) ||
    [];
  if (pool.length === 0) pool = getQuestionPool(req.grade);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const take = shuffled.slice(0, Math.max(1, req.count));
  return take.map((q, i) => poolToLocal(q, i + 1));
}

function parseLlmQuestions(raw: string, count: number): LocalGeneratedQuestion[] {
  // Prefer JSON array if present
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (jsonMatch) {
    try {
      const arr = JSON.parse(jsonMatch[0]) as unknown[];
      return arr
        .map((item, i) => normalizeParsed(item, i + 1))
        .filter((q): q is LocalGeneratedQuestion => q !== null)
        .slice(0, count);
    } catch {
      // fall through
    }
  }
  return [];
}

function normalizeParsed(item: unknown, number: number): LocalGeneratedQuestion | null {
  if (!item || typeof item !== 'object') return null;
  const x = item as Record<string, unknown>;
  const statement = String(x.statement || x.enunciado || '');
  const explanation = String(x.explanation || x.explicacion || '');
  let optionsRaw = x.options || x.opciones;
  let options: LocalGeneratedQuestion['options'] = [];
  if (Array.isArray(optionsRaw)) {
    options = optionsRaw.slice(0, 4).map((o, i) => {
      const row = o as Record<string, unknown>;
      return {
        letter: LETTERS[i],
        text: String(row.text || row.texto || ''),
        is_correct: Boolean(row.is_correct || row.correcta || row.correct),
        feedback: String(row.feedback || 'Feedback local.'),
      };
    });
  }
  while (options.length < 4) {
    const i = options.length;
    options.push({
      letter: LETTERS[i],
      text: `Opción ${LETTERS[i]}`,
      is_correct: false,
      feedback: 'Distractor.',
    });
  }
  if (!options.some((o) => o.is_correct)) {
    const correctLetter = String(x.correct_answer || x.respuesta || 'A').toUpperCase().slice(0, 1);
    options = options.map((o) => ({ ...o, is_correct: o.letter === correctLetter }));
    if (!options.some((o) => o.is_correct)) options[0].is_correct = true;
  }
  const correct = options.find((o) => o.is_correct)!;
  const q: LocalGeneratedQuestion = {
    id: `local-llm-${number}-${Date.now().toString(36)}`,
    number,
    statement,
    context: typeof x.context === 'string' ? x.context : undefined,
    options,
    correct_answer: correct.letter,
    explanation,
    difficulty: String(x.difficulty || difficultyForIndex(number - 1, 10)),
    bloom: typeof x.bloom === 'string' ? x.bloom : undefined,
    source: 'llm',
  };
  return validateLocalQuestion(q) ? q : null;
}

function buildPrompt(req: ExamGenerateRequest, samples: APIQuestion[]): string {
  const sampleText = samples
    .slice(0, 3)
    .map(
      (s, i) =>
        `Ejemplo ${i + 1}: ${s.statement}\nOpciones: ${(s.options || []).map((o) => o.text).join(' | ')}`,
    )
    .join('\n\n');
  const regionHint = getCountryRuleHint(req.countryCode);
  return `Genera exactamente ${req.count} preguntas de ${req.subject} grado ${req.grade}${
    req.topic ? ` sobre ${req.topic}` : ''
  } para Latinoamérica (país ${req.countryCode || 'CO'}).
${regionHint ? `Contexto regional: ${regionHint}\n` : ''}
Formato: responde SOLO un JSON array. Cada item:
{"statement":"...","context":"...","options":[{"letter":"A","text":"...","is_correct":false,"feedback":"..."},...4 opciones],"correct_answer":"A","explanation":"...","difficulty":"D5","bloom":"Apply"}
Reglas v5.2: 4 opciones A-D, una sola correcta, sin "todas/ninguna de las anteriores", feedback en cada opción, explicación pedagógica.
Contexto de packs locales:
${sampleText || '(sin packs locales; usa plantillas curriculares genéricas)'}
`;
}

/**
 * Generate a local exam. Validates LLM output; on failure assembles from validated pack pool.
 */
export async function generateLocalExam(req: ExamGenerateRequest): Promise<ExamGenerateResult> {
  const count = Math.min(Math.max(req.count || 3, 1), 20);
  const subjectKey = req.subject.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  const samplesRaw = getQuestionPoolBySubject(req.grade, subjectKey);
  const samples =
    (samplesRaw.length > 0 ? samplesRaw : getQuestionPool(req.grade)).slice(0, 8);

  const metadata = {
    creador: 'local-llm' as const,
    protocol_hint: '5.2' as const,
    generatedAt: Date.now(),
    subject: req.subject,
    grade: req.grade,
  };

  try {
    const ai = getAiCore();
    const prompt = buildPrompt({ ...req, count }, samples);
    let raw = await ai.llm.generate(prompt, { maxNewTokens: 2048, temperature: 0.4 });
    let parsed = parseLlmQuestions(raw, count);

    if (parsed.length < Math.min(3, count)) {
      raw = await ai.llm.generate(prompt + '\nReintento: JSON válido únicamente.', {
        maxNewTokens: 2048,
        temperature: 0.2,
      });
      parsed = parseLlmQuestions(raw, count);
    }

    if (parsed.length >= Math.min(3, count) && parsed.every(validateLocalQuestion)) {
      recordMejoraInterna('ai.exam_generator.ok', {
        count: parsed.length,
        grade: req.grade,
        subject: req.subject,
        mode: 'llm-validated',
      });
      return { questions: parsed.slice(0, count), mode: 'llm-validated', metadata };
    }
  } catch {
    // fall through to pool
  }

  const fromPool = assembleFromPool({ ...req, count });
  recordMejoraInterna('ai.exam_generator.pool_fallback', {
    count: fromPool.length,
    grade: req.grade,
    subject: req.subject,
  });

  return {
    questions: fromPool,
    mode: 'pool-assembled',
    warning:
      fromPool.length > 0
        ? 'Generado localmente desde packs validados (sin revisar por LLM). No se publica a questions_data/.'
        : 'No hay packs locales ni LLM usable. Descarga packs o un modelo en /ajustes/ia.',
    metadata,
  };
}

/** Convert local questions to edge-mesh ExamenCompartido shape. */
export function toMeshPreguntas(
  questions: LocalGeneratedQuestion[],
): {
  id: string;
  tipo: 'opcion_multiple';
  enunciado: string;
  opciones: string[];
  respuestaCorrecta: string;
  puntaje: number;
}[] {
  return questions.map((q) => ({
    id: q.id,
    tipo: 'opcion_multiple' as const,
    enunciado: q.context ? `${q.context}\n\n${q.statement}` : q.statement,
    opciones: q.options.map((o) => `${o.letter}) ${o.text}`),
    respuestaCorrecta: q.correct_answer,
    puntaje: 1,
  }));
}
