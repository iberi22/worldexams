import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const ROOT = process.cwd();
const QUESTION_COUNTS = new Map([
  [3, 8],
  [4, 8],
  [5, 8],
  [6, 10],
  [7, 10],
  [8, 12],
  [9, 12],
  [10, 12],
  [11, 20],
]);

const MOJIBAKE_REGEX = /Â[¿°]|Ã[¡©ó±­ÚÍÁÑ]|â€/;

export function hasMojibake(text) {
  const match = text.match(MOJIBAKE_REGEX);
  return match ? match[0] : null;
}

export function detectMojibakeLines(content) {
  const lines = content.split(/\r?\n/);
  const results = [];
  for (let i = 0; i < lines.length; i++) {
    const seq = hasMojibake(lines[i]);
    if (seq) {
      results.push({ line: i + 1, sequence: seq, text: lines[i] });
    }
  }
  return results;
}

export function detectControlChars(content) {
  const lines = content.split(/\r?\n/);
  const results = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/[\x00-\x08\x0B\x0C\x0E-\x1F]/);
    if (match) results.push({ line: i + 1, char: match[0] });
  }
  return results;
}

export function detectPlaceholder(content, fm, base) {
  if (/Pregunta de prueba \d+|Explicaci[oó]n detallada de la pregunta|Distractor \d|Opci[oó]n correcta\b/i.test(content)) return true;
  if (fm && typeof fm.tema === 'string' && fm.tema.toLowerCase().includes('test')) return true;
  if (base && base.toLowerCase().includes('-test-')) return true;
  return false;
}

export function detectAllNoneOfAbove(optionText) {
  return /\b(todas|ninguna) (de )?las (opciones )?anteriores\b|\b(all|none) of the above\b|^[A-D] y [A-D]\b/i.test(optionText);
}

export function checkExplanation(explanationBody) {
  const trimmed = (explanationBody || '').trim();
  if (trimmed.length < 40) return { error: 'explanation-empty' };
  if (trimmed.length < 80) return { warning: 'explanation-short' };
  return null;
}

export function checkFeedbackTrivial(feedbackText) {
  const trivialList = [
    "incorrect", "incorrect.", "no", "no.", "correct!",
    "correcto.", "incorrecto.", "es correcta.", "es incorrecta.",
    "correct! well done."
  ];
  const f = (feedbackText || '').trim();
  if (f.length < 25 || trivialList.includes(f.toLowerCase())) return true;
  return false;
}

export function checkExplanationTemplate(explanations) {
  const counts = new Map();
  for (const exp of explanations) {
    const norm = exp.trim().toLowerCase().replace(/\s+/g, ' ');
    counts.set(norm, (counts.get(norm) || 0) + 1);
  }
  for (const count of counts.values()) {
    if (count >= 3) return true;
  }
  return false;
}

export function checkAnswerLetterBias(correctLetters, totalQuestions) {
  if (totalQuestions < 8) return null;

  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const l of correctLetters) if (counts[l] !== undefined) counts[l]++;

  for (const c of Object.values(counts)) {
    if (c > totalQuestions * 0.5) return 'bias-over-50';
  }

  if (totalQuestions >= 12) {
    for (const c of Object.values(counts)) {
      if (c === 0) return 'bias-zero';
    }
  }
  return null;
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim().replace(/^['"]|['"]$/g, '');
    if (/^\d+$/.test(value)) value = Number(value);
    data[m[1]] = value;
  }
  return data;
}

function questionBlocks(content) {
  const re = /^##\s+(Question|Pregunta)\s+(\d+)\s*\[([^\]]+)\]/gim;
  const matches = [...content.matchAll(re)];
  return matches.map((m, i) => ({
    label: m[1],
    number: Number(m[2]),
    difficulty: m[3],
    text: content.slice(m.index, i + 1 < matches.length ? matches[i + 1].index : content.length),
  }));
}

function optionRows(block) {
  const re = /^- \[[ xX]\]\s*([A-D])\)\s*([\s\S]*?)(?=^- \[[ xX]\]\s*[A-D]\)|^###\s+|^##\s+|(?![\s\S]))/gm;
  return [...block.matchAll(re)].map((m) => {
    const raw = m[2].trim();
    return {
      letter: m[1],
      text: raw.replace(/<!-- feedback:[\s\S]*?-->/i, '').trim().toLowerCase().replace(/\s+/g, ' '),
      feedback: (raw.match(/<!-- feedback:\s*([\s\S]*?)\s*-->/i)?.[1] || '').trim(),
    };
  });
}

function expectedCount(file, fm) {
  const base = path.basename(file);
  if (base.includes('-3EM-') || String(fm.grado).toUpperCase() === '3EM') return 20;
  const grade = Number(String(fm.grado ?? '').match(/\d+/)?.[0]);
  return QUESTION_COUNTS.get(grade);
}

function countryCodeOf(file, fm) {
  const m = path.basename(file).match(/^([A-Z]{2})-/);
  if (m) return m[1];
  const c = String(fm?.country || '').trim().toLowerCase();
  if (c === 'colombia') return 'CO';
  return null;
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

export function validateFile(file, opts = { strictQuality: false }) {
  const warnings = [];
  const errors = [];
  if (!fs.existsSync(file)) {
    return { file: rel(file), errors: ['File does not exist'], warnings: [] };
  }
  const content = fs.readFileSync(file, 'utf8');
  const relative = rel(file);
  const base = path.basename(file);

  const controlCharLines = detectControlChars(content);
  for (const c of controlCharLines) {
    errors.push(`ERROR [control-chars] ${relative}:${c.line} contiene caracter de control ASCII`);
  }

  const mojibakeLines = detectMojibakeLines(content);
  for (const m of mojibakeLines) {
    errors.push(`ERROR [encoding] ${relative}:${m.line} contiene mojibake ("${m.sequence}"); repara a UTF-8 antes de publicar.`);
  }

  const fm = parseFrontmatter(content);

  if (!relative.startsWith('questions_data/')) errors.push('File is outside questions_data/');
  if (!/-001-MASTERY-bundle\.md$/.test(base)) errors.push('Filename must end with -001-MASTERY-bundle.md');
  if (!fm) {
    errors.push('ERROR [frontmatter] Missing YAML frontmatter');
    return { file: relative, errors, warnings };
  }

  const required = [
    'id',
    'country',
    'grado',
    'asignatura',
    'tema',
    'periodo',
    'week',
    'year',
    'bundle_type',
    'protocol_version',
    'total_questions',
    'bundle_size',
    'alignment',
    'license',
    'tier',
    'creador',
  ];
  for (const key of required) {
    if (fm[key] === undefined || fm[key] === '') errors.push(`Missing frontmatter field: ${key}`);
  }

  if (fm.id && `${fm.id}.md` !== base) errors.push('frontmatter id must match filename without .md');
  if (fm.periodo !== 'weekly') errors.push('periodo must be "weekly"');
  if (fm.bundle_type !== 'weekly') errors.push('bundle_type must be "weekly"');
  if (fm.protocol_version !== '5.2') errors.push('protocol_version must be "5.2"');
  if (fm.year !== 2026) errors.push('year must be 2026');
  if (!/^W\d{2}$/.test(String(fm.week || ''))) errors.push('week must use WNN format');
  if (fm.license !== 'FREE') errors.push('license must be FREE');
  if (fm.tier !== 'legacy') errors.push('tier must be legacy');
  if (fm.creador !== 'Jules-Agent') errors.push('creador must be Jules-Agent');

  if (detectPlaceholder(content, fm, base)) errors.push('ERROR [placeholder] Placeholder content or test topic detected');

  const expected = expectedCount(file, fm);
  if (!expected) errors.push(`Unsupported grade for question count: ${fm.grado}`);
  if (expected && fm.total_questions !== expected) errors.push(`total_questions must be ${expected}`);
  if (expected && fm.bundle_size !== expected) errors.push(`bundle_size must be ${expected}`);

  if (/<think>|<process>|```yaml|```markdown/i.test(content)) errors.push('AI leakage or markdown fence detected');


  const cc = countryCodeOf(file, fm);
  const isCO = cc === 'CO';
  if (!isCO && /icfes|saber\s?11|dba men/i.test(String(fm.alignment || ''))) {
    errors.push('alignment must reference the country exam entity, not ICFES/Saber/DBA (Colombia-only brands)');
  }

  const questions = questionBlocks(content);
  if (expected && questions.length !== expected) errors.push(`Expected ${expected} questions, found ${questions.length}`);


  const correctAnswers = [];
  const allExplanations = [];

  questions.forEach((q, index) => {
    const prefix = `Question ${index + 1}`;
    if (q.label !== 'Question') errors.push(`${prefix}: heading must use "Question"`);
    if (q.number !== index + 1) errors.push(`${prefix}: question numbering is not sequential`);
    if (!/^D\d+(?:-D?\d+)?$/.test(q.difficulty)) errors.push(`${prefix}: invalid difficulty label`);
    if (!/\*\*ID:\*\*\s*\S/.test(q.text)) errors.push(`${prefix}: missing ID`);
    if (!/\*\*Bloom:\*\*\s*(Remember|Understand|Apply|Analyze|Evaluate)/.test(q.text)) errors.push(`${prefix}: invalid Bloom`);
    if (isCO) {
      if (!/\*\*ICFES:\*\*\s*\S/.test(q.text)) errors.push(`${prefix}: missing ICFES field (Colombia exam axis)`);
      if (/\*\*EJE:\*\*/.test(q.text)) errors.push(`${prefix}: use ICFES, not EJE, for Colombia`);
    } else {
      if (/\*\*ICFES:\*\*/.test(q.text)) errors.push(`${prefix}: ICFES is a Colombia-only brand; use **EJE:**`);
      if (!/\*\*EJE:\*\*\s*\S/.test(q.text)) errors.push(`${prefix}: missing EJE field (exam axis)`);
    }
    if (!/\*\*Expected_Success:\*\*\s*0\.\d+/.test(q.text)) errors.push(`${prefix}: missing Expected_Success`);
    if (!/\*\*Contexto:\*\*\s*\S/.test(q.text)) errors.push(`${prefix}: missing Contexto`);
    if (/\*\*Context:\*\*/.test(q.text)) errors.push(`${prefix}: use Contexto, not Context`);
    if (!/###\s+Enunciado/.test(q.text)) errors.push(`${prefix}: missing ### Enunciado`);
    if (!/###\s+Opciones/.test(q.text)) errors.push(`${prefix}: missing ### Opciones`);
    if (!/###\s+Explicaci[oó]n Pedag[oó]gica/.test(q.text)) errors.push(`${prefix}: missing ### Explicacion Pedagogica`);

    const explMatch = q.text.match(/###\s+Explicaci[oó]n Pedag[oó]gica\s*([\s\S]*?)$/i);
    const explBody = explMatch ? explMatch[1] : '';
    allExplanations.push(explBody);

    const explCheck = checkExplanation(explBody);
    if (explCheck) {
      if (explCheck.error) errors.push(`ERROR [${explCheck.error}] ${prefix}: ${explCheck.error}`);
      if (explCheck.warning) {
        if (opts.strictQuality) errors.push(`ERROR [${explCheck.warning}] ${prefix}: ${explCheck.warning}`);
        else warnings.push(`WARNING [${explCheck.warning}] ${prefix}: ${explCheck.warning}`);
      }
    }

    const options = optionRows(q.text);
    if (options.length !== 4) errors.push(`${prefix}: expected 4 options, found ${options.length}`);
    const correctMatches = [...q.text.matchAll(/^- \[[xX]\]\s*([A-D])\)/gm)];
    const correct = correctMatches.length;
    if (correct !== 1) errors.push(`${prefix}: expected exactly one correct option, found ${correct}`);
    else correctAnswers.push(correctMatches[0][1]);

    if (options.some((option) => !option.feedback)) errors.push(`${prefix}: every option needs feedback`);
    if (new Set(options.map((option) => option.text)).size !== options.length) errors.push(`${prefix}: duplicate option text`);

    options.forEach(opt => {
      if (detectAllNoneOfAbove(opt.text)) errors.push(`ERROR [all-none-of-above] ${prefix}: Forbidden all/none option`);
      if (checkFeedbackTrivial(opt.feedback)) {
        if (opts.strictQuality) errors.push(`ERROR [feedback-trivial] ${prefix}: Trivial feedback detected`);
        else warnings.push(`WARNING [feedback-trivial] ${prefix}: Trivial feedback detected`);
      }
    });
  });

  if (checkExplanationTemplate(allExplanations)) {
    if (opts.strictQuality) errors.push(`ERROR [explanation-template] Explanation template reused 3+ times`);
    else warnings.push(`WARNING [explanation-template] Explanation template reused 3+ times`);
  }

  const biasCheck = checkAnswerLetterBias(correctAnswers, expected || questions.length);
  if (biasCheck) {
    if (opts.strictQuality) errors.push(`ERROR [answer-letter-bias] ${biasCheck}`);
    else warnings.push(`WARNING [answer-letter-bias] ${biasCheck}`);
  }

  return { file: relative, errors, warnings };
}

const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);



if (isMainModule) {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      'strict-quality': { type: 'boolean', default: false },
      'json': { type: 'boolean', default: false },
    },
    allowPositionals: true
  });

  const files = positionals.length
    ? positionals.map((arg) => path.resolve(ROOT, arg))
    : walk(path.join(ROOT, 'questions_data'));

  const targetFiles = positionals.length ? files : files.filter((file) => file.endsWith('-MASTERY-bundle.md'));

  const results = targetFiles.map(f => validateFile(f, { strictQuality: values['strict-quality'] }));

  if (values.json) {
    console.log(JSON.stringify(results, null, 2));
    const hasAnyError = results.some(r => r.errors && r.errors.length > 0);
    process.exit(hasAnyError ? 1 : 0);
  } else {
    const failed = results.filter((result) => result.errors && result.errors.length > 0);
    const warned = results.filter((result) => result.warnings && result.warnings.length > 0);

    let totalErrors = 0;
    let totalWarnings = 0;
    const ruleCounts = new Map();

    for (const result of failed) {
      console.error(`\n${result.file}`);
      for (const error of result.errors) {
        console.error(`  - ${error}`);
        totalErrors++;
        const match = error.match(/\b([a-z-]+(?:-[a-z]+)*)\b/);
        if (match && error.includes('ERROR [')) {
            const rule = error.match(/ERROR \[(.*?)\]/);
            if (rule) {
               ruleCounts.set(rule[1], (ruleCounts.get(rule[1]) || 0) + 1);
            }
        }
      }
    }

    for (const result of warned) {
      if (!failed.includes(result)) {
         console.error(`\n${result.file}`);
      }
      for (const warning of result.warnings) {
        console.error(`  - ${warning}`);
        totalWarnings++;
        const match = warning.match(/WARNING \[(.*?)\]/);
        if (match) {
           ruleCounts.set(match[1], (ruleCounts.get(match[1]) || 0) + 1);
        }
      }
    }

    const ruleStrs = [];
    for (const [r, c] of ruleCounts.entries()) {
      ruleStrs.push(`${r}: ${c}`);
    }

    console.log(`\nquality: ${totalErrors} errors, ${totalWarnings} warnings (rule counts: ${ruleStrs.join(', ')})`);
    console.log(`Validated ${results.length} bundle file(s). Failures: ${failed.length}.`);
    process.exit(failed.length ? 1 : 0);
  }
}
