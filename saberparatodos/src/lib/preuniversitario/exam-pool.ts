import type { AppQuestion } from '../api-service';
import { passesGrade11PreicfesPolicy } from '../questions/policy';

const rawPreuBundles = import.meta.glob('../../../../questions_data/colombia/preuniversitario/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const UNIVERSITY_CODE_BY_SLUG: Record<string, string> = {
  unal: 'UNAL',
  udea: 'UDEA',
  uis: 'UIS',
  utp: 'UTP',
  univalle: 'UNIVALLE',
  uptc: 'UPTC',
  unicauca: 'UNICAUCA',
  unicartagena: 'UNICARTAGENA',
  ucaldas: 'UCALDAS',
  uniatlantico: 'UNIATLANTICO',
};

type BundleFrontmatter = {
  id: string;
  grado: number;
  asignatura: string;
  tema: string;
  protocol_version?: string;
};

function shuffle<T>(items: T[]): T[] {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
  }
  return clone;
}

export function parsePreuFrontmatter(source: string): { frontmatter: BundleFrontmatter; body: string } | null {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;

  const rawFrontmatter = match[1];
  const body = match[2];
  const values: Record<string, string> = {};

  rawFrontmatter.split(/\r?\n/).forEach((line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    values[key] = rawValue.replace(/^['"]|['"]$/g, '');
  });

  const grade = Number(values.grado || 11);
  if (!values.id || !values.asignatura || !values.tema || !Number.isFinite(grade)) {
    return null;
  }

  return {
    frontmatter: {
      id: values.id,
      grado: grade,
      asignatura: values.asignatura,
      tema: values.tema,
      protocol_version: values.protocol_version,
    },
    body,
  };
}

function parseOptions(optionsBlock: string) {
  const options: AppQuestion['options'] = [];
  let correctOptionId = '';

  optionsBlock.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*-\s*\[([xX\s])\]\s*([A-Z])\)\s*(.+)\s*$/);
    if (!match) return;

    const optionId = match[2];
    const isCorrect = match[1].toLowerCase() === 'x';

    options.push({ id: optionId, text: match[3].trim() });
    if (isCorrect) correctOptionId = optionId;
  });

  return { options, correctOptionId };
}

export function parsePreuBundleQuestions(frontmatter: BundleFrontmatter, body: string): AppQuestion[] {
  const questions: AppQuestion[] = [];
  const sectionRegex = /##\s+Pregunta\s+(\d+(?:-\d+)?)\s*\(([^)]+)\)\s*([\s\S]*?)(?=\r?\n---|\r?\n##\s+Pregunta|\s*$)/gi;

  let match: RegExpExecArray | null;
  while ((match = sectionRegex.exec(body)) !== null) {
    const sectionHeader = match[2];
    const sectionBody = match[3];
    const difficultyMatch = sectionHeader.match(/Nivel:\s*(\d+)/i);
    const difficulty = difficultyMatch ? Math.max(1, Number(difficultyMatch[1])) : 5;

    const idMatch = sectionBody.match(/\*\*ID:\*\*\s*["`]?([^"`\r\n]+)["`]?/i);
    const questionId = idMatch?.[1]?.trim();
    const textMatch = sectionBody.match(/###\s+Enunciado\s+([\s\S]*?)(?=\r?\n###\s+Opciones|\r?\n###\s+Explicación|\r?\n---|$)/i);
    const optionsMatch = sectionBody.match(/###\s+Opciones\s+([\s\S]*?)(?=\r?\n###\s+Explicación|\r?\n---|$)/i);
    const explanationMatch = sectionBody.match(/###\s+Explicación(?:\s+Pedagógica)?\s+([\s\S]*?)(?=\r?\n---|$)/i);

    if (!questionId || !textMatch || !optionsMatch) continue;

    const { options, correctOptionId } = parseOptions(optionsMatch[1].trim());
    if (options.length < 2 || !correctOptionId) continue;

    questions.push({
      id: questionId,
      text: textMatch[1].trim(),
      options,
      correctOptionId,
      category: `${frontmatter.asignatura.toUpperCase()} :: ${frontmatter.tema.toUpperCase()}`,
      explanation: explanationMatch?.[1]?.trim(),
      grade: frontmatter.grado,
      difficulty,
      bundleId: frontmatter.id,
      topics: [frontmatter.tema],
      protocol_version: frontmatter.protocol_version,
    });
  }

  return questions;
}

export function isPreuQuestion(question: Pick<AppQuestion, 'id' | 'category'>): boolean {
  return String(question.id || '').toUpperCase().includes('CO-PREU-')
    || String(question.category || '').toUpperCase().includes('PREUNIVERSITARIO');
}

function matchesUniversity(questionId: string, preuUniversity?: string): boolean {
  if (!preuUniversity) return true;
  const code = UNIVERSITY_CODE_BY_SLUG[preuUniversity] || preuUniversity.toUpperCase();
  return questionId.toUpperCase().includes(`-${code}-`);
}

export function parseRawPreuBundles(rawBundles: Record<string, string>, preuUniversity?: string): AppQuestion[] {
  const allQuestions = Object.values(rawBundles).flatMap((rawBundle) => {
    const parsed = parsePreuFrontmatter(rawBundle);
    if (!parsed) return [];
    return parsePreuBundleQuestions(parsed.frontmatter, parsed.body);
  });

  return allQuestions.filter((question) => matchesUniversity(question.id, preuUniversity));
}

export function getPreuQuestionBank(preuUniversity?: string): AppQuestion[] {
  return parseRawPreuBundles(rawPreuBundles, preuUniversity);
}

export function buildPreuExamPool(
  questions: AppQuestion[],
  count: number,
  preuUniversity?: string
): AppQuestion[] {
  const requestedCount = Math.max(1, count);
  const preuPool = shuffle(
    questions.filter((question) =>
      isPreuQuestion(question) &&
      matchesUniversity(question.id, preuUniversity) &&
      (question.difficulty || 0) >= 5
    )
  );
  const hardGrade11Pool = shuffle(
    questions.filter((question) =>
      !isPreuQuestion(question) &&
      passesGrade11PreicfesPolicy(question, 5)
    )
  );

  const targetPreuCount = Math.max(1, Math.ceil(requestedCount * 0.6));
  const targetHardCount = Math.max(1, requestedCount - targetPreuCount);

  const prioritized = [
    ...preuPool.slice(0, targetPreuCount * 3),
    ...hardGrade11Pool.slice(0, targetHardCount * 3),
    ...preuPool.slice(targetPreuCount * 3),
    ...hardGrade11Pool.slice(targetHardCount * 3),
  ];

  const deduped = new Map<string, AppQuestion>();
  prioritized.forEach((question) => {
    if (question?.id && !deduped.has(question.id)) deduped.set(question.id, question);
  });

  return Array.from(deduped.values());
}
