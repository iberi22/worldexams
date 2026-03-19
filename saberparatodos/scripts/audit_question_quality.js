import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');
const REPO_ROOT = path.join(PROJECT_ROOT, '..');
const QUESTIONS_ROOT = path.join(REPO_ROOT, 'questions_data');
const QUARANTINE_ROOT = path.join(REPO_ROOT, 'questions_data_quarantine');
const REPORT_ROOT = path.join(REPO_ROOT, 'reports', 'question-audit');

const args = process.argv.slice(2);

function getArg(name, fallback = null) {
  const prefix = `--${name}=`;
  const direct = args.find((arg) => arg.startsWith(prefix));
  return direct ? direct.slice(prefix.length) : fallback;
}

function hasFlag(name) {
  return args.includes(`--${name}`);
}

const gradeMin = Number(getArg('grade-min', '3'));
const gradeMax = Number(getArg('grade-max', '11'));
const scopeArg = String(getArg('scope', 'colombia,ingles'));
const reportDir = path.resolve(getArg('report-dir', REPORT_ROOT));
const writeReport = hasFlag('write-report');
const writeCsv = hasFlag('write-csv') || writeReport;
const writeManifest = hasFlag('write-manifest') || writeReport;
const quarantine = hasFlag('quarantine');

const allowedScopes = new Set(
  scopeArg
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
);

if (!Number.isFinite(gradeMin) || !Number.isFinite(gradeMax) || gradeMin > gradeMax) {
  console.error('❌ Rango de grados inválido. Usa --grade-min=N --grade-max=M');
  process.exit(1);
}

const SEVERITY_WEIGHT = {
  low: 10,
  medium: 20,
  high: 35,
  critical: 55,
};

const FLAG_DEFINITIONS = {
  'invalid-option-count': { severity: 'high', reason: 'La pregunta no tiene 4 opciones.' },
  'missing-correct-option': { severity: 'critical', reason: 'La pregunta no tiene opción correcta marcada.' },
  'multiple-correct-options': { severity: 'critical', reason: 'La pregunta tiene múltiples opciones correctas.' },
  'all-or-none-option': { severity: 'medium', reason: 'Usa “todas/ninguna de las anteriores”.' },
  'absurd-distractor': { severity: 'high', reason: 'Incluye distractor absurdo o decorativo.' },
  'weak-distractor-pair': { severity: 'critical', reason: 'Tiene al menos dos distractores demasiado débiles.' },
  'technobabble-statement': { severity: 'critical', reason: 'El enunciado o contexto usa pseudo-tecnicismo o word salad.' },
  'technobabble-option': { severity: 'critical', reason: 'Una o más opciones usan pseudo-tecnicismo o texto contaminado.' },
  'inflated-feedback': { severity: 'high', reason: 'El feedback o la explicación son ornamentales y no pedagógicos.' },
  'inappropriate-context': { severity: 'critical', reason: 'El contexto es morboso, sensacionalista o impropio para el objetivo evaluado.' },
  'context-noise': { severity: 'high', reason: 'El contexto agrega ruido y no ayuda a resolver la pregunta.' },
  'lexical-contamination': { severity: 'high', reason: 'Hay repetición artificial de léxico contaminado en la pregunta.' },
  'correct-shape-outlier': { severity: 'medium', reason: 'La correcta resalta por forma, longitud o precisión.' },
  'lexical-isolation': { severity: 'medium', reason: 'La correcta comparte mucho más vocabulario con el enunciado que las demás.' },
  'option-length-imbalance': { severity: 'low', reason: 'Desbalance fuerte de longitud entre opciones.' },
  'option-category-mismatch': { severity: 'low', reason: 'Las opciones no parecen pertenecer a la misma categoría semántica.' },
  'grammatical-outlier': { severity: 'low', reason: 'Una opción difiere en estructura gramatical o formato.' },
  'english-pos-outlier': { severity: 'medium', reason: 'En inglés, una opción difiere en función gramatical o forma esperada.' },
  'english-register-outlier': { severity: 'low', reason: 'En inglés, una opción rompe el registro o forma del resto.' },
  'thin-statement': { severity: 'low', reason: 'Enunciado demasiado corto para sostener distractores finos.' },
  'missing-id': { severity: 'medium', reason: 'La pregunta no trae ID explícito.' },
};

const ABSURD_PATTERNS = [
  /\bporque si\b/i,
  /\bpor arte de magia\b/i,
  /\bse vuelve invisible\b/i,
  /\bnada[,;]?\s+.*no es necesaria?\b/i,
  /\bcome solo hielo\b/i,
  /\bquieren ser m[aá]s famosos\b/i,
  /\bdecorar las bibliotecas\b/i,
  /\bsalir corriendo\b/i,
  /\balbum de colombia\b/i,
  /\blibro de cuentos\b/i,
  /\bgaraje\b/i,
  /\blinternas\b/i,
  /\baceite\b/i,
  /\barena\b/i,
];

const CONTAMINATION_TERMS = [
  'parametr',
  'paramed',
  'andin',
  'andes',
  'puritan',
  'ludic',
  'asimetr',
  'asimil',
  'gelid',
  'gélid',
  'teta',
  'purtin',
  'genotip',
  'inorgan',
  'estocast',
  'estocást',
  'apocalipsis',
  'mega gigante milagroso',
  'mandatario en jefe regional',
  'horizonte cosmico',
  'horizonte cósmico',
  'the y',
];

const INAPPROPRIATE_CONTEXT_PATTERNS = [
  /\bsicariato\b/i,
  /\bdecapitad\w*\b/i,
  /\bapocalipsis\b/i,
  /\basesinos? a sueldo\b/i,
  /\bmonstruoso\b/i,
  /\bperro geol[oó]gico\b/i,
];

const QUESTION_WORDS = new Set([
  'que', 'qué', 'cual', 'cuál', 'porque', 'por', 'para', 'como', 'cómo', 'segun', 'según',
  'siguiente', 'correcta', 'incorrecta', 'afirmacion', 'afirmación', 'opcion', 'opción',
  'statement', 'question', 'according', 'following', 'correct', 'incorrect', 'which', 'what',
  'based', 'most', 'best', 'answer',
]);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function toPosix(value) {
  return value.replace(/\\/g, '/');
}

function relativeToRepo(filePath) {
  return toPosix(path.relative(REPO_ROOT, filePath));
}

function walkMarkdownFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.endsWith('.assets')) continue;
      walkMarkdownFiles(fullPath, acc);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md') {
      acc.push(fullPath);
    }
  }

  return acc;
}

function inferProtocol(frontmatter, filePath) {
  const explicit = String(frontmatter.protocol_version || frontmatter.bundle_version || '').match(/(\d+(?:\.\d+)?)/);
  if (explicit) return Number(explicit[1]);

  const lower = path.basename(filePath).toLowerCase();
  if (lower.includes('-pro-v5') || lower.includes('-v5-bundle') || lower.includes('-mastery-bundle')) return 5;
  if (lower.includes('-pro-v4') || lower.includes('-v4-bundle')) return 4;
  if (lower.includes('-v3-bundle')) return 3;
  if (lower.includes('-bundle')) return 2;
  return null;
}

function parseQuestionSections(body) {
  const headers = [...body.matchAll(/^##\s+(?:Pregunta|Question)\s+\d+.*$/gim)];
  if (headers.length === 0) return [];

  return headers.map((match, index) => {
    const start = match.index || 0;
    const end = index + 1 < headers.length ? (headers[index + 1].index || body.length) : body.length;
    return {
      header: match[0],
      content: body.slice(start, end),
      index: index + 1,
    };
  });
}

function extractSectionValue(section, headerNames) {
  const pattern = headerNames.join('|');
  const regex = new RegExp(`###\\s+(?:${pattern})\\s*\\r?\\n([\\s\\S]*?)(?=\\r?\\n###\\s+|\\r?\\n---|$)`, 'i');
  const match = section.match(regex);
  return match ? match[1].trim() : '';
}

function extractQuestionId(section) {
  const match = section.match(/(?:\*\*ID:\*\*|ID:)\s*(?:`([^`]+)`|"([^"]+)"|([A-Za-z0-9._:-]+))/);
  return match ? (match[1] || match[2] || match[3]).trim() : '';
}

function parseOptions(section) {
  const optionRegex = /^\s*-\s*\[([xX ])\]\s*(?:\*\*)?([A-Z])(?:\*\*)?(?:\s*[\)\.\-:]\s*)?(.*)$/gm;
  const options = [];
  let match;

  while ((match = optionRegex.exec(section)) !== null) {
    const raw = match[3].trim();
    const feedbackMatch = raw.match(/\s*<!--\s*feedback:\s*([\s\S]*?)\s*-->\s*$/i);
    const text = feedbackMatch ? raw.slice(0, feedbackMatch.index).trim() : raw;
    options.push({
      id: match[2].trim(),
      text,
      feedback: feedbackMatch ? feedbackMatch[1].trim() : '',
      isCorrect: /x/i.test(match[1]),
    });
  }

  return options;
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value) {
  return normalizeText(value)
    .split(' ')
    .filter((token) => token.length >= 3 && !QUESTION_WORDS.has(token));
}

function lexicalOverlapRatio(baseTokens, candidateTokens) {
  const base = new Set(baseTokens);
  const candidate = new Set(candidateTokens);
  if (base.size === 0 || candidate.size === 0) return 0;
  const intersection = [...candidate].filter((token) => base.has(token)).length;
  return intersection / candidate.size;
}

function getOptionShape(optionText) {
  const raw = String(optionText || '').trim();
  return {
    length: raw.length,
    wordCount: raw.split(/\s+/).filter(Boolean).length,
    hasNumber: /\d/.test(raw),
    hasDecimal: /\d[.,]\d/.test(raw),
    hasQuotes: /["“”'`]/.test(raw),
    hasParentheses: /[()]/.test(raw),
    hasConditional: /\b(si|solo|siempre|cuando|unless|only|if|except|always|never)\b/i.test(raw),
    endsWithPunctuation: /[.;:!?]$/.test(raw),
  };
}

function inferCategory(optionText) {
  const raw = String(optionText || '').trim();
  if (!raw) return 'empty';
  if (/^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?:\s+[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)*$/.test(raw)) return 'named-entity';
  if (/\d/.test(raw)) return 'numeric';
  if (/^(to\s+\w+|\w+ing)\b/i.test(raw)) return 'verb-form';
  if (/^(an?|the)\b/i.test(raw)) return 'noun-phrase-en';
  if (/^(el|la|los|las|un|una|unos|unas)\b/i.test(raw)) return 'noun-phrase-es';
  if (/\bporque\b|\bbecause\b/i.test(raw)) return 'clause-causal';
  if (/\bque\b|\bthat\b|\bwhich\b|\bwho\b/i.test(raw)) return 'clause-relative';
  if (raw.split(/\s+/).length <= 2) return 'short-phrase';
  return 'sentence';
}

function countWords(value) {
  return normalizeText(value).split(' ').filter(Boolean).length;
}

function countTermHits(value, term) {
  const normalized = normalizeText(value);
  if (!normalized) return 0;
  if (term.includes(' ')) {
    return normalized.split(term).length - 1;
  }
  const regex = new RegExp(`\\b${term}[\\p{L}\\p{N}_-]*\\b`, 'gu');
  return (normalized.match(regex) || []).length;
}

function getContaminationStats(value) {
  const normalized = normalizeText(value);
  const words = normalized.split(' ').filter(Boolean);
  const hitsByTerm = {};
  let hits = 0;
  let maxTermCount = 0;

  for (const term of CONTAMINATION_TERMS) {
    const count = countTermHits(normalized, term);
    if (count === 0) continue;
    hitsByTerm[term] = count;
    hits += count;
    if (count > maxTermCount) maxTermCount = count;
  }

  return {
    hits,
    maxTermCount,
    wordCount: words.length,
    density: words.length > 0 ? hits / words.length : 0,
    hitsByTerm,
  };
}

function isTechnobabble(value, minimumWords = 10) {
  const stats = getContaminationStats(value);
  if (stats.wordCount < minimumWords) return false;
  if (stats.maxTermCount >= 6) return true;
  return stats.hits >= 5 && stats.density >= 0.12;
}

function hasInappropriateContext(value) {
  return INAPPROPRIATE_CONTEXT_PATTERNS.some((pattern) => pattern.test(String(value || '')));
}

function getQuestionSeverity(flags) {
  let weight = 0;
  let severity = 'low';

  for (const flag of flags) {
    const meta = FLAG_DEFINITIONS[flag];
    if (!meta) continue;
    weight += SEVERITY_WEIGHT[meta.severity];

    if (meta.severity === 'critical') severity = 'critical';
    else if (meta.severity === 'high' && severity !== 'critical') severity = 'high';
    else if (meta.severity === 'medium' && !['critical', 'high'].includes(severity)) severity = 'medium';
  }

  const score = Math.max(0, 100 - weight);
  return { severity, score };
}

function analyzeQuestion(question, bundle) {
  const flags = [];
  const combinedPrompt = [question.context, question.statement].filter(Boolean).join(' ');
  const statementTokens = tokenize(combinedPrompt);
  const optionTokens = question.options.map((option) => tokenize(option.text));
  const correctOptions = question.options.filter((option) => option.isCorrect);
  const explanationWords = countWords(question.explanation);
  const contextWords = countWords(question.context);
  const promptContamination = getContaminationStats(combinedPrompt);

  if (!question.id) flags.push('missing-id');
  if (question.statement.split(/\s+/).filter(Boolean).length < 5) flags.push('thin-statement');
  if (question.options.length !== 4) flags.push('invalid-option-count');
  if (correctOptions.length === 0) flags.push('missing-correct-option');
  if (correctOptions.length > 1) flags.push('multiple-correct-options');
  if (question.options.some((option) => /todas las anteriores|ninguna de las anteriores|all of the above|none of the above/i.test(option.text))) {
    flags.push('all-or-none-option');
  }

  const absurdDistractors = question.options.filter((option) =>
    !option.isCorrect && ABSURD_PATTERNS.some((pattern) => pattern.test(option.text))
  );
  if (absurdDistractors.length > 0) flags.push('absurd-distractor');
  if (absurdDistractors.length >= 2) flags.push('weak-distractor-pair');

  if (isTechnobabble(combinedPrompt) || /(?:\bthe y\b|\bfrom\b.*\bthe\b)/i.test(combinedPrompt)) {
    flags.push('technobabble-statement');
  }

  const contaminatedOptions = question.options.filter((option) => isTechnobabble(option.text, 6));
  if (contaminatedOptions.length > 0) flags.push('technobabble-option');

  const inflatedFeedback = question.options.some((option) => countWords(option.feedback) >= 20 && isTechnobabble(option.feedback, 8));
  if (inflatedFeedback || (explanationWords >= 25 && isTechnobabble(question.explanation, 8))) {
    flags.push('inflated-feedback');
  }

  if (hasInappropriateContext(combinedPrompt)) {
    flags.push('inappropriate-context');
  }

  if (contextWords >= 35 && (isTechnobabble(question.context, 8) || hasInappropriateContext(question.context))) {
    flags.push('context-noise');
  }

  if (promptContamination.maxTermCount >= 8 || (promptContamination.hits >= 10 && promptContamination.density >= 0.1)) {
    flags.push('lexical-contamination');
  }

  const shapes = question.options.map((option) => getOptionShape(option.text));
  const lengths = shapes.map((shape) => Math.max(shape.length, 1));
  const maxLength = Math.max(...lengths);
  const minLength = Math.min(...lengths);
  if (maxLength / minLength >= 3) flags.push('option-length-imbalance');

  const categoryCounts = question.options.reduce((acc, option) => {
    const category = inferCategory(option.text);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const distinctCategories = Object.keys(categoryCounts).length;
  const dominantCategory = Math.max(...Object.values(categoryCounts));
  if (distinctCategories >= 4 || (distinctCategories >= 3 && dominantCategory <= 2)) {
    flags.push('option-category-mismatch');
  }

  const correct = correctOptions[0];
  if (correct) {
    const correctShape = getOptionShape(correct.text);
    const distractorShapes = question.options
      .filter((option) => !option.isCorrect)
      .map((option) => getOptionShape(option.text));

    const averageDistractorLength =
      distractorShapes.reduce((sum, shape) => sum + shape.length, 0) / Math.max(distractorShapes.length, 1);
    const distractorConditionalCount = distractorShapes.filter((shape) => shape.hasConditional).length;
    const distractorNumberCount = distractorShapes.filter((shape) => shape.hasNumber).length;

    if (
      correctShape.length >= averageDistractorLength * 2.2 ||
      (correctShape.hasConditional && distractorConditionalCount === 0) ||
      (correctShape.hasDecimal && distractorNumberCount === 0)
    ) {
      flags.push('correct-shape-outlier');
    }

    const overlaps = question.options.map((option, index) => ({
      option,
      ratio: lexicalOverlapRatio(statementTokens, optionTokens[index]),
    }));
    const correctOverlap = overlaps.find((item) => item.option.isCorrect)?.ratio ?? 0;
    const maxDistractorOverlap = Math.max(
      0,
      ...overlaps.filter((item) => !item.option.isCorrect).map((item) => item.ratio)
    );
    if (correctOverlap >= 0.55 && maxDistractorOverlap <= 0.15) {
      flags.push('lexical-isolation');
    }
  }

  const punctuationCount = question.options.filter((option) => /[.;:!?]$/.test(option.text)).length;
  const conditionalCount = question.options.filter((option) => /\b(si|solo|cuando|unless|only if|if)\b/i.test(option.text)).length;
  if ((punctuationCount === 1 || conditionalCount === 1) && maxLength / minLength >= 2.5) {
    flags.push('grammatical-outlier');
  }

  if (bundle.scope === 'ingles' || normalizeText(bundle.subject).includes('ingles')) {
    const categoriesEn = question.options.map((option) => inferCategory(option.text));
    if (new Set(categoriesEn).size >= 4) {
      flags.push('english-pos-outlier');
    }

    const verbForms = question.options.filter((option) => /^(to\s+\w+|\w+ing|\w+ed)\b/i.test(option.text)).length;
    const sentenceForms = question.options.filter((option) => option.text.split(/\s+/).length >= 5).length;
    if (verbForms > 0 && sentenceForms > 0) {
      flags.push('english-register-outlier');
    }
  }

  const { severity, score } = getQuestionSeverity([...new Set(flags)]);
  return {
    id: question.id || `${bundle.bundleId}-q${question.index}`,
    index: question.index,
    statement: question.statement,
    correctOptionId: correct?.id || null,
    flags: [...new Set(flags)],
    severity,
    score,
  };
}

function inferBundleSeverity(questionResults, structuralIssues) {
  if (structuralIssues.length > 0) {
    return { severity: 'critical', quarantine: true, score: 0 };
  }

  const criticalCount = questionResults.filter((item) => item.severity === 'critical').length;
  const severeCount = questionResults.filter((item) => {
    const flagSeverities = item.flags.map((flag) => FLAG_DEFINITIONS[flag]?.severity);
    return flagSeverities.includes('critical') || flagSeverities.includes('high');
  }).length;
  const flaggedCount = questionResults.filter((item) => item.flags.length > 0).length;
  const count = Math.max(questionResults.length, 1);

  const avgScore = Math.round(
    questionResults.reduce((sum, item) => sum + item.score, 0) / count
  );

  if (criticalCount >= 1) {
    return { severity: 'critical', quarantine: true, score: avgScore };
  }

  if (severeCount >= 2) {
    return { severity: 'high', quarantine: true, score: avgScore };
  }

  if (flaggedCount / count >= 0.5 && avgScore < 60) {
    return { severity: 'high', quarantine: false, score: avgScore };
  }

  if (flaggedCount > 0) {
    return { severity: 'medium', quarantine: false, score: avgScore };
  }

  return { severity: 'low', quarantine: false, score: avgScore };
}

function parseBundle(filePath, scope) {
  const parsed = matter.read(filePath);
  const frontmatter = parsed.data;
  const protocol = inferProtocol(frontmatter, filePath);
  const grade = Number(frontmatter.grado ?? NaN);

  const sections = parseQuestionSections(parsed.content);
  const structuralIssues = [];
  if (!Number.isFinite(grade)) structuralIssues.push('missing-grade');
  if (sections.length === 0) structuralIssues.push('missing-question-sections');

  const questions = sections.map((section) => ({
    index: section.index,
    id: extractQuestionId(section.content),
    context: extractSectionValue(section.content, ['Contexto', 'Context']),
    statement:
      extractSectionValue(section.content, ['Enunciado', 'Question']) ||
      section.content.replace(section.header, '').trim().split(/\r?\n###\s+/)[0].trim(),
    options: parseOptions(section.content),
    explanation: extractSectionValue(section.content, ['Explicación Pedagógica', 'Explicacion Pedagogica', 'Explicación', 'Explanation']),
  }));

  return {
    filePath,
    relativePath: relativeToRepo(filePath),
    scope,
    protocol,
    bundleId: String(frontmatter.id || '').trim() || path.basename(filePath, '.md'),
    grade,
    period: Number(frontmatter.periodo || 0) || null,
    subject: String(frontmatter.asignatura || '').trim(),
    topic: String(frontmatter.tema || '').trim(),
    frontmatter,
    structuralIssues,
    questions,
  };
}

function shouldInclude(bundle) {
  if (!Number.isFinite(bundle.grade)) return false;
  return bundle.grade >= gradeMin && bundle.grade <= gradeMax;
}

function collectFiles() {
  const files = [];
  if (allowedScopes.has('colombia')) {
    files.push(...walkMarkdownFiles(path.join(QUESTIONS_ROOT, 'colombia')).map((file) => ({ file, scope: 'colombia' })));
  }
  if (allowedScopes.has('ingles')) {
    files.push(...walkMarkdownFiles(path.join(QUESTIONS_ROOT, 'ingles')).map((file) => ({ file, scope: 'ingles' })));
  }
  return files;
}

function buildSummary(bundleReports) {
  const summary = {
    generated_at: new Date().toISOString(),
    scope: [...allowedScopes],
    grades: { min: gradeMin, max: gradeMax },
    totals: {
      bundles_scanned: bundleReports.length,
      bundles_quarantine: 0,
      questions_scanned: 0,
      questions_flagged: 0,
    },
    by_severity: { critical: 0, high: 0, medium: 0, low: 0 },
    by_scope: {},
    by_grade_subject: {},
    reason_codes: {},
  };

  for (const bundle of bundleReports) {
    summary.totals.questions_scanned += bundle.questions.length;
    summary.totals.questions_flagged += bundle.question_reports.filter((question) => question.flags.length > 0).length;
    if (bundle.quarantine) summary.totals.bundles_quarantine += 1;
    summary.by_severity[bundle.severity] += 1;

    summary.by_scope[bundle.scope] ||= { bundles: 0, quarantine: 0, questions: 0 };
    summary.by_scope[bundle.scope].bundles += 1;
    summary.by_scope[bundle.scope].questions += bundle.questions.length;
    if (bundle.quarantine) summary.by_scope[bundle.scope].quarantine += 1;

    const gradeKey = `${bundle.grade}`;
    const subjectKey = normalizeText(bundle.subject || path.basename(path.dirname(path.dirname(bundle.filePath))));
    summary.by_grade_subject[gradeKey] ||= {};
    summary.by_grade_subject[gradeKey][subjectKey] ||= { bundles: 0, quarantine: 0 };
    summary.by_grade_subject[gradeKey][subjectKey].bundles += 1;
    if (bundle.quarantine) summary.by_grade_subject[gradeKey][subjectKey].quarantine += 1;

    for (const question of bundle.question_reports) {
      for (const flag of question.flags) {
        summary.reason_codes[flag] = (summary.reason_codes[flag] || 0) + 1;
      }
    }
    for (const issue of bundle.structural_issues) {
      summary.reason_codes[issue] = (summary.reason_codes[issue] || 0) + 1;
    }
  }

  return summary;
}

function toCsv(bundleReports) {
  const rows = [
    [
      'bundle_path',
      'scope',
      'grade',
      'subject',
      'period',
      'protocol',
      'bundle_score',
      'bundle_severity',
      'quarantine',
      'structural_issues',
      'question_id',
      'question_index',
      'question_score',
      'question_severity',
      'flags',
    ].join(','),
  ];

  for (const bundle of bundleReports) {
    const base = [
      bundle.relative_path,
      bundle.scope,
      bundle.grade,
      bundle.subject,
      bundle.period ?? '',
      bundle.protocol ?? '',
      bundle.score,
      bundle.severity,
      bundle.quarantine,
      `"${bundle.structural_issues.join('|')}"`,
    ];

    if (bundle.question_reports.length === 0) {
      rows.push([...base, '', '', '', '', ''].join(','));
      continue;
    }

    for (const question of bundle.question_reports) {
      rows.push([
        ...base,
        question.id,
        question.index,
        question.score,
        question.severity,
        `"${question.flags.join('|')}"`,
      ].join(','));
    }
  }

  return rows.join('\n');
}

function writeOutputs(bundleReports, summary) {
  ensureDir(reportDir);

  if (writeManifest) {
    fs.writeFileSync(
      path.join(reportDir, 'latest-manifest.json'),
      JSON.stringify(
        {
          summary,
          bundles: bundleReports.filter((bundle) => bundle.quarantine).map((bundle) => ({
            bundle_path: bundle.relative_path,
            scope: bundle.scope,
            grade: bundle.grade,
            subject: bundle.subject,
            period: bundle.period,
            protocol: bundle.protocol,
            severity: bundle.severity,
            score: bundle.score,
            structural_issues: bundle.structural_issues,
            reason_codes: [...new Set(bundle.question_reports.flatMap((question) => question.flags))],
          })),
        },
        null,
        2
      )
    );

    fs.writeFileSync(path.join(reportDir, 'by-grade-subject.json'), JSON.stringify(summary.by_grade_subject, null, 2));
    fs.writeFileSync(path.join(reportDir, 'latest-summary.json'), JSON.stringify(summary, null, 2));
  }

  if (writeCsv) {
    fs.writeFileSync(path.join(reportDir, 'latest-summary.csv'), toCsv(bundleReports));
  }
}

function moveToQuarantine(bundleReports) {
  ensureDir(QUARANTINE_ROOT);

  for (const bundle of bundleReports) {
    if (!bundle.quarantine) continue;

    const destination = path.join(QUARANTINE_ROOT, bundle.relative_path.replace(/^questions_data[\\/]/, ''));
    ensureDir(path.dirname(destination));

    if (!fs.existsSync(bundle.filePath)) continue;
    fs.renameSync(bundle.filePath, destination);
  }
}

function main() {
  const candidateFiles = collectFiles();
  const bundleReports = [];

  for (const { file, scope } of candidateFiles) {
    const bundle = parseBundle(file, scope);
    if (!shouldInclude(bundle)) continue;

    const questionReports = bundle.questions.map((question) => analyzeQuestion(question, bundle));
    const bundleDecision = inferBundleSeverity(questionReports, bundle.structuralIssues);

    bundleReports.push({
      relative_path: bundle.relativePath,
      filePath: bundle.filePath,
      scope: bundle.scope,
      grade: bundle.grade,
      subject: bundle.subject || path.basename(path.dirname(path.dirname(bundle.filePath))),
      period: bundle.period,
      protocol: bundle.protocol,
      bundle_id: bundle.bundleId,
      score: bundleDecision.score,
      severity: bundleDecision.severity,
      quarantine: bundleDecision.quarantine,
      structural_issues: bundle.structuralIssues,
      questions: bundle.questions,
      question_reports: questionReports,
    });
  }

  bundleReports.sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityOrder[a.severity] - severityOrder[b.severity] || a.score - b.score;
  });

  const summary = buildSummary(bundleReports);

  console.log('\n🔎 Question Quality Audit');
  console.log(`- Bundles escaneados: ${summary.totals.bundles_scanned}`);
  console.log(`- Bundles a cuarentena: ${summary.totals.bundles_quarantine}`);
  console.log(`- Preguntas analizadas: ${summary.totals.questions_scanned}`);
  console.log(`- Preguntas con flags: ${summary.totals.questions_flagged}`);
  console.log(`- Scope: ${[...allowedScopes].join(', ')}`);
  console.log(`- Grados: ${gradeMin}-${gradeMax}`);

  const preview = bundleReports.slice(0, 20);
  if (preview.length > 0) {
    console.log('\nTop hallazgos:');
    for (const bundle of preview) {
      const reasons = [
        ...bundle.structural_issues,
        ...new Set(bundle.question_reports.flatMap((question) => question.flags)),
      ];
      console.log(
        `- [${bundle.severity.toUpperCase()}] ${bundle.relative_path} -> ${reasons.slice(0, 5).join(', ')}`
      );
    }
  }

  if (writeReport || writeCsv || writeManifest) {
    writeOutputs(bundleReports, summary);
    console.log(`\n📝 Reportes escritos en: ${reportDir}`);
  }

  if (quarantine) {
    moveToQuarantine(bundleReports);
    console.log(`\n📦 Bundles movidos a cuarentena: ${QUARANTINE_ROOT}`);
  }
}

main();
