import { countryConfig } from '../../config';
import { isBundleQuarantined } from './quarantine-registry';

type LocalBankQuestion = {
  id: string;
  statement: string;
  subject: string;
  grade: number;
  difficulty: number;
  options: { id: string; text: string; isCorrect: boolean }[];
  correctOptionId?: string;
  explanation?: string;
  bundle_id: string;
  tema?: string;
  periodo?: number;
  protocol_version?: string;
  quarantine?: boolean;
  bundleStatus?: string;
};

const rawGrade11Bundles = import.meta.glob('../../../../questions_data/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    if (key) data[key] = value;
  }
  return data;
}

function parseQuestionSections(body: string): string[] {
  const headerRegex = /^##\s+(?:Question|Pregunta)\s+\d+.*$/gim;
  const matches = [...body.matchAll(headerRegex)];
  return matches.map((match, index) => {
    const start = match.index || 0;
    const end = index + 1 < matches.length ? (matches[index + 1].index || body.length) : body.length;
    return body.slice(start, end);
  });
}

function parseDifficulty(section: string): number {
  const match = section.match(/(?:Difficulty|Dificultad)\s+(\d+)/i) ||
                section.match(/\[D(\d+)-D(\d+)\]/);
  if (!match) return 0;
  return match[2] ? Number(match[2]) : Number(match[1]);
}

function parseQuestionId(section: string): string | null {
  const match = section.match(/(?:\*\*ID:\*\*|ID:)\s*(?:`([^`]+)`|"([^"]+)"|([A-Za-z0-9._:-]+))/i);
  return match ? (match[1] || match[2] || match[3]).trim() : null;
}

function parseOptions(section: string) {
  const options: { id: string; text: string; isCorrect: boolean }[] = [];
  const optionRegex = /^\s*-\s*\[(x|X| )\]\s*(?:\*\*)?([A-Z])(?:\*\*)?(?:\)|\.|:)?\s*(.*)$/gm;
  let match: RegExpExecArray | null;

  while ((match = optionRegex.exec(section)) !== null) {
    options.push({
      id: match[2].trim(),
      text: match[3].trim(),
      isCorrect: /x/i.test(match[1]),
    });
  }

  return options;
}

function parseExplanation(section: string): string | undefined {
  const match = section.match(/###\s+Explicaci[oó]n\s+Pedag[oó]gica\r?\n([\s\S]*?)(?=\r?\n---|\r?\n##\s+(?:Question|Pregunta)|$)/i);
  return match ? match[1].trim() : undefined;
}

function normalizeSubjectFromPath(filePath: string): string {
  const parts = filePath.split('/questions_data/')[1]?.split('/');
  if (!parts || parts.length < 2) return 'unknown';

  const country = parts[0];
  const subject = parts[1];

  // Specific aliases for Colombia mapping to global IDs or legacy internal IDs
  if (country === 'colombia') {
    if (subject === 'lectura-critica') return 'lectura_critica';
    if (subject === 'ciencias-naturales') return 'ciencias_naturales';
    if (subject === 'sociales-ciudadanas') return 'sociales_y_ciudadanas';
  }

  return subject.replace(/-/g, '_');
}

function parseProtocol(frontmatter: Record<string, string>, filePath: string): number | null {
  const explicit = String(frontmatter.protocol_version || '').match(/(\d+(?:\.\d+)?)/);
  if (explicit) return Number(explicit[1]);

  const lower = filePath.toLowerCase();
  if (lower.includes('-pro-v5') || lower.includes('-v5-bundle')) return 5;
  if (lower.includes('-pro-v4') || lower.includes('-v4-bundle')) return 4;
  if (lower.includes('-v3-bundle')) return 3;
  if (lower.includes('-bundle')) return 2;
  return null;
}

function parseLocalBundle(filePath: string, raw: string): LocalBankQuestion[] {
  if (filePath.includes('/legacy/')) return [];

  // Filter by country
  const countryInPath = filePath.split('/questions_data/')[1]?.split('/')[0];
  const activeCountry = countryConfig.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (!countryInPath || countryInPath !== activeCountry) return [];

  // Filter by grade (only Grade 11 for this local bank)
  if (!filePath.includes('/grado-11/')) return [];

  const frontmatter = parseFrontmatter(raw);
  const protocol = parseProtocol(frontmatter, filePath);
  if (protocol === null || protocol < 4) return [];

  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  const subject = normalizeSubjectFromPath(filePath);
  const grade = Number(frontmatter.grado || 11);
  const period = Number(frontmatter.periodo || 0) || undefined;
  const bundleId = String(frontmatter.id || '').trim() || filePath.split('/').pop()?.replace(/\.md$/i, '') || '';
  const topic = String(frontmatter.tema || '').trim() || undefined;
  const quarantine = String(frontmatter.quarantine || '').trim().toLowerCase() === 'true';
  const bundleStatus = String(frontmatter.bundle_status || '').trim() || undefined;
  const relativeBundlePath = filePath.split('/questions_data/')[1]
    ? `questions_data/${filePath.split('/questions_data/')[1]}`
    : filePath;

  if (isBundleQuarantined({
    bundleId,
    filePath: relativeBundlePath,
    quarantine,
    bundleStatus,
  })) {
    return [];
  }

  return parseQuestionSections(body)
    .map((section) => {
      const id = parseQuestionId(section);
      const options = parseOptions(section);
      const difficulty = parseDifficulty(section);
      if (!id || options.length < 2 || difficulty <= 0) return null;

      const statementMatch = section.match(/###\s+Enunciado\r?\n([\s\S]*?)(?=\r?\n###\s+(?:Options|Opciones)|\r?\n###\s+Contexto|\r?\n###\s+Explicaci[oó]n|$)/i);
      const statement = statementMatch ? statementMatch[1].trim() : '';
      if (!statement) return null;

      const correctOption = options.find((option) => option.isCorrect);
      if (!correctOption) return null;

      return {
        id,
        statement,
        subject,
        grade,
        difficulty,
        options,
        correctOptionId: correctOption.id,
        explanation: parseExplanation(section),
        bundle_id: bundleId,
        tema: topic,
        periodo: period,
        protocol_version: frontmatter.protocol_version || undefined,
        quarantine,
        bundleStatus,
      } satisfies LocalBankQuestion;
    })
    .filter((question): question is NonNullable<typeof question> => question !== null);
}

const parsedGrade11LocalBank = Object.entries(rawGrade11Bundles)
  .flatMap(([filePath, raw]) => parseLocalBundle(filePath.replace(/\\/g, '/'), raw))
  .reduce((dedupe, question) => {
    if (!dedupe.has(question.id)) dedupe.set(question.id, question);
    return dedupe;
  }, new Map<string, LocalBankQuestion>());

export function getLocalGrade11Questions(subject?: string | null): LocalBankQuestion[] {
  const normalizedSubject = String(subject || '').trim().toLowerCase();
  const questions = Array.from(parsedGrade11LocalBank.values());
  if (!normalizedSubject) return questions;
  return questions.filter((question) => question.subject === normalizedSubject);
}
