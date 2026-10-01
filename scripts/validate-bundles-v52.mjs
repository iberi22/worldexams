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
  if (/Pregunta de prueba \d+|Explicaci[oó]n detallada de la pregunta|Pregunta sobre\s+[\w\s-]+- Grado/i.test(content)) return true;
  // Option-text placeholders only when the WHOLE option text is the placeholder
  // (real feedback often says "la opción correcta es..." or "la opción B...").
  if (/^- \[[ xX]\]\s*[A-D]\)\s*(Opci[oó]n correcta|Opci[oó]n [A-D]|Distractor \d)\s*$/im.test(content)) return true;
  // Exact "test" topic only — real topics like "textos-testimoniales" must not match.
  if (fm && typeof fm.tema === 'string' && /^(test|prueba)$/i.test(fm.tema.trim())) return true;
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

/**
 * Feedback quality gate (protocol v5.3).
 *
 * v5.2 decided with a length threshold: feedback under 25 characters was
 * "trivial". That is not the same question, and it produced both kinds of error.
 * "Incorrecto." was flagged correctly, but so was
 * "Correcto. vf = v0 + a*t = 6 + 2*5 = 16 m/s" - 38 characters of real pedagogy.
 *
 * The rule asks one question: after removing the verdict, is anything left that
 * tells the student why? Anything concrete passes. An earlier attempt also
 * demanded vocabulary from a fixed list (olvido, confunde, porque, ...) and that
 * was wrong too: it rejected sound feedback such as "Es el peso normal en
 * reposo", "El logaritmo de cero no existe en los reales" or "El zorro no se
 * menciona en la historia", which explain perfectly well in their own words.
 *
 * So the test is deliberately minimal and cannot over-reject:
 *   1. feedback must exist;
 *   2. something must remain once the verdict is stripped;
 *   3. what remains must not be only an instruction to look again.
 */
const VERDICT_PREFIX =
  /^\s*[¡!¿]?\s*(incorrecto|correcto|incorrecta|correcta|wrong|right|correct|incorrect)\s*[¡!¿.!?]*\s*[:\-–—]?\s*/i;
const VAGUE_ONLY =
  /^\s*(revisa|revisar|consulta|observa|lee|vuelve a leer|intenta de nuevo|try again|practica|repasa|estudia)\b[\s\wáéíóúñ]{0,32}$/i;
// A category label: the name of the tense, voice, mood, part of speech, semantic
// relation or vocabulary register that an option belongs to. In language
// courses this is the pedagogically correct answer to "why is this wrong?",
// and it is routinely shorter than a generic explanatory sentence.
const GRAMMAR_LABEL = new RegExp(
  '^\\s*(?:' +
    // tenses, aspects, moods, voices
    '(?:present|past|future|simple|continuous|perfect|infinitive|gerund|participle|imperative|indicative|subjunctive|conditional|progressive|pluperfect|preterite|anterior|future perfect|passive|active)\\b' +
    '|' +
    // grammar / usage labels
    '(?:relative pronoun|relative clause|possessive pronoun|personal pronoun|demonstrative|interrogative|indefinite|definite article|indefinite article|uncountable|countable|transitive|intransitive|ditransitive|gerund|phrasal verb|phrasal|idiom|idiomatic|collocation|conjugation|declension|adjective|adverb|preposition|conjunction|determiner)' +
    '|' +
    // semantic relations
    '(?:synonym|antonym|hypernym|hyponym|broader|narrower|opposite|contrast|connotation|formal|informal|colloquial|slang|idiomatic|register|rhetorical)' +
  ')\\s*(?:[a-z]+\\s*)?$' +
  // a compound of up to three label words, e.g. "Past perfect continuous"
  '|^(?:\\s*[a-z]+\\s*){1,3}(?:tense|aspect|mood|voice|pronoun|clause|phrase|form)\\s*$',
  'i',
);
const MIN_REASON_CHARS = 15;

function feedbackReason(feedback) {
  return (feedback || '')
    .replace(VERDICT_PREFIX, '')
    .trim()
    .replace(/[.¡!¿:;\-–—\s]+$/, '');
}

export function feedbackProblem(feedback) {
  const raw = (feedback || '').trim();
  if (!raw) return 'missing feedback';
  const reason = feedbackReason(raw);
  if (!reason) return 'feedback is only a verdict ("Correcto."/"Incorrecto."), it does not explain why';
  // A category label is a valid explanation whatever its length, so it is checked
  // before the two structural rules below. "Gerund." is one word and short, and it
  // is still the correct answer to "which part of speech is it?".
  if (GRAMMAR_LABEL.test(reason)) return null;
  // A run of characters with no spaces carries no explanation, however long:
  // "123456789012345678901234" is not a reason, it is noise.
  if (!/\s/.test(reason)) return 'feedback is an unbroken string, it does not explain why';
  // A calculation or a formula IS the explanation. AGENTS.md says so, and the
  // corpus is full of correct feedback like "2 + 1 = 3", "pOH es 11" or
  // "$Q_c\neq K_c$". The character floor does not apply to them.
  if (/[=+\-*/×÷<>^]|\$[^$]+\$/.test(reason)) return null;
  // A short statement that answers the question is an explanation, even without
  // an operator: "pOH es 11", "son 2 moles", "es 35 m". Scientific and numerical
  // answers carry the reasoning in the value itself.
  if (/\b\d/.test(reason) && /\b(es|son|valen|equivale|significa|da|son)\b/i.test(reason)) return null;
  if (/\b\d+\s*(m|km|g|kg|cm|mm|mol|mols|L|l|ml|°C|°F|K|Pa|Hz|N|J|W|V|A|%|x)\b/.test(reason)) return null;
  if (VAGUE_ONLY.test(reason)) return 'feedback only tells the student to look again, it does not explain why';
  if (reason.length < MIN_REASON_CHARS) {
    return `feedback gives no usable reason (${reason.length} chars): "${reason}"`;
  }
  return null;
}

export function checkFeedbackTrivial(feedbackText) {
  return feedbackProblem(feedbackText) !== null;
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
      const fbProblem = feedbackProblem(opt.feedback);
      if (fbProblem) {
        // v5.3: an option that does not explain WHY is an error, not a warning.
        // This is the rule that was missing and let 109 bundles ship content
        // that taught nothing. The message states the reason so the author
        // knows what to write, not just that something is wrong.
        errors.push(`ERROR [feedback-no-reason] ${prefix} option ${opt.letter}: ${fbProblem}`);
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

  // Positional args may be files or directories (directories are walked for bundles).
  const files = positionals.length
    ? positionals.flatMap((arg) => {
        const abs = path.resolve(ROOT, arg);
        return fs.existsSync(abs) && fs.statSync(abs).isDirectory()
          ? walk(abs).filter((file) => file.endsWith('-MASTERY-bundle.md'))
          : [abs];
      })
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
