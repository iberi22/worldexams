// Four options must be labelled A, B, C and D, once each. A model that drifts
// mid-option emits two rows with the same letter -- "C A B C" -- and nothing else
// notices: the shape rules count four rows and four feedbacks, the duplicate
// rules hash the option texts, and the correct marker still sits on exactly one
// of them. The question becomes unanswerable, because two rows answer to the
// same letter and the answer key names only one of them.
//
// The rows are counted per question section, not per line: an option can wrap,
// and grouping by line would report a four-line question as four single-option
// questions instead of one bad question.
// A bundle whose declared tema is not about vocabulary must not be filled with
// "What is the English word for: ..." questions. Those twenty questions are
// genuinely distinct from each other, so duplicate-question and
// duplicate-ignoring-context stay silent; within one file everything is
// coherent. The incoherence only appears when the tema is compared against the
// body, which no rule did: 187 bundles named past-continuous or
// reported-speech carried a full travel-vocabulary set.
const VOCAB_QUESTION = /What is the English word for/i;
const VOCAB_TEMA = /vocab|lexic|word/i;

function detectTemaCoherence(content, tema) {
  const matches = content.match(new RegExp(VOCAB_QUESTION.source, 'gi'));
  const count = matches ? matches.length : 0;
  if (count < 10) return [];
  if (tema && VOCAB_TEMA.test(tema)) return [];
  return [{ count, tema: tema || '(sin tema en el frontmatter)' }];
}

function detectOptionLetters(content) {
  const results = [];
  const sections = content.split(/^##\s+Question\s+\d+/m).slice(1);
  sections.forEach((section, i) => {
    const letters = [...section.matchAll(/^\s*-\s*\[[ xX]\]\s*([A-Z])\)/gm)].map((m) => m[1]);
    if (letters.length < 2) return;
    const repeated = letters.filter((l, j) => letters.indexOf(l) !== j);
    // Only a repeated letter is the defect. A permutation such as BACD or DABC
    // still addresses each option uniquely, so the question is answerable; the
    // reading order is a separate concern that answer-letter-bias reports.
    // Testing for "not ABCD" instead of "has a duplicate" flags every
    // reordered question in the corpus: 4160 hits across 334 files, all of them
    // permutations that were never broken.
    if (repeated.length) {
      results.push({ question: i + 1, letters: letters.join(""), repeated: [...new Set(repeated)].join("") });
    }
  });
  return results;
}

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
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

// Scripts outside the Latin and Latin-Extended blocks never belong in a bundle.
// This corpus is Spanish and English, so the only legitimate non-ASCII is
// accented Latin, the inverted marks used in Spanish, and the curly quotes an
// English bundle may carry. Everything else is a generator that leaked its own
// alphabet into the prose.
function detectForeignScript(content) {
  const FOREIGN_BLOCKS = /[\u0400-\u04FF\u0500-\u052F\u4E00-\u9FFF\u3400-\u4DBF\u3040-\u30FF\uAC00-\uD7AF\u1100-\u11FF]/g;
  const NAMES = {
    '\u0400': 'cirilico', '\u0500': 'cirilico',
    '\u4E00': 'CJK', '\u3400': 'CJK',
    '\u3040': 'kana',
    '\uAC00': 'hangul', '\u1100': 'hangul',
  };
  const name = (ch) => NAMES[ch[0]] ?? 'cirilico';

  const results = [];
  content.split(/\r?\n/).forEach((line, i) => {
    // Copy the per-line list, not the regex: the same regex object carries
    // lastIndex between calls, and a shared one silently skips characters.
    for (const m of line.matchAll(new RegExp(FOREIGN_BLOCKS))) {
      // Trim to the offending token so the message names the word, not the line.
      const start = Math.max(0, m.index - 12);
      results.push({
        line: i + 1,
        block: name(m[0]),
        sample: line.slice(start, m.index + m[0].length + 8).trim(),
      });
    }
  });
  return results;
}

// A model that has drifted mid-generation splices a fragment of another word
// into the prose: "puedepril defender", "un relato depliedas voces", "msTZ",
// "generarAIR", "bigER", "voseoGg", "weakhens", "tighta". The sentence keeps
// its options, its feedbacks and its length, so every shape rule passes.
//
// The detectable shape is a lowercase run of letters immediately followed by an
// uppercase run of two or more, with no space between them. Spanish and English
// orthography never produces that inside a word, because a capital in the
// middle of a token is either an acronym or a typo. Matching only inside a word
// keeps "deployed" and "Study Two" out of it.
const GLUED_TOKEN = /\b[a-z\u00C0-\u024F]{3,}[A-Z\u00C0-\u00DE]{2,}\b/g;

function detectGluedTokens(content) {
  const results = [];
  content.split(/\r?\n/).forEach((line, i) => {
    // Same reason as detectForeignScript: a /g regex carries lastIndex.
    for (const m of line.matchAll(new RegExp(GLUED_TOKEN))) {
      results.push({ line: i + 1, token: m[0] });
    }
  });
  return results;
}

export function detectPlaceholder(content, fm, base) {
  if (/Pregunta de prueba \d+|Explicaci[oó]n detallada de la pregunta|Pregunta sobre\s+[\w\s-]+- Grado/i.test(content)) return true;
  // Option-text placeholders only when the WHOLE option text is the placeholder
  // (real feedback often says "la opción correcta es..." or "la opción B...").
  if (/^- \[[ xX]\]\s*[A-D]\)\s*(Opci[oó]n correcta|Opci[oó]n [A-D]|Distractor \d|Word \d|Different error|Wrong error|The error is here|The correct word|Your answer|Answer \d)\s*$/im.test(content)) return true;
  // A bundle whose options are labels pointing at a key ("Word 1", "The error is
  // here") is not a question. 54 such questions survived the gate for the whole
  // campaign because every feedback string explained the placeholder perfectly and
  // nothing looked at the option TEXT.  Two or more label-shaped options in one
  // question is enough: a real option can be one word ("Past participle").
  // Cut the feedback comment off FIRST: (.*?)$ is lazy but $ does not know where
  // the option text ends, so without this the whole feedback lands in the label.
  const optionLines = [...content.matchAll(/^- \[[ xX]\]\s*[A-D]\)\s*(.*?)(?:<!--|$)/gim)]
    .map((m) => m[1].trim())
    .filter(Boolean);
  // Self-referential labels come in many shapes: "Option A", "Word 2",
  // "Structure 3", "Sample text", "My version". They name a slot, never an
  // answer. Strip a trailing "(Correct)" and test what is left.
  const strip = (o) => o.replace(/\s*\((correct|correcta|right)\)\s*$/i, '').trim();
  // A bare number is a legitimate option ("2", "4", "6", "8" is a real maths
  // question), so the numeric branch REQUIRES the noun: "Word 2" is a slot,
  // "2" is a value. The empty-word branch is dropped for the same reason.
  const LABEL = /^(Word|Option|Structure|Sample|Answer|Version|Text|Sentence|Item|Response|Paragraph|Line|Question)\s*\d+$|^(Different error|Wrong error|The error is here|The correct word|Your answer|Your version|My version|Sample text|Correct answer|Placeholder|Answer here)$/i;
  const selfRef = optionLines.filter((o) => {
    const t = strip(o);
    if (LABEL.test(t)) return true;
    // "Option A", "Opción B" — names a letter, not a value.
    return /^(Opci[oó]n|Option)\s+[A-D]$/i.test(t);
  });
  if (selfRef.length >= 2) return true;
  // Exact "test" topic only — real topics like "textos-testimoniales" must not match.
  if (fm && typeof fm.tema === 'string' && /^(test|prueba)$/i.test(fm.tema.trim())) return true;
  if (base && base.toLowerCase().includes('-test-')) return true;
  return false;
}

export function detectAllNoneOfAbove(optionText) {
  return /\b(todas|ninguna) (de )?las (opciones )?anteriores\b|\b(all|none) of the above\b|^[A-D] y [A-D]\b/i.test(optionText);
}

// A calculation is the explanation. "F = ma = 2×3 = 6 N" is sixteen characters and
// it is the entire reason, so the character floor cannot apply to it — the same
// reasoning that feedbackProblem already follows, and that v5.3 applied to
// feedback while leaving this function behind. 164 El Salvador questions were
// rejected for a complete derivation.
// The numeric clause mirrors feedbackProblem's: a value carrying its own unit or
// relation ("pOH es 11", "son 2 moles") is the reasoning, not a bare number.
const IS_COMPLETE_EXPLANATION =
  /[=+\-*/×÷<>^²³√≈±≠≤≥]|\$[^$]+\$|\d+\s*(m|km|g|kg|cm|mm|mol|mols|L|ml|°C|°F|K|Pa|Hz|N|J|W|V|A|%|x)\b/;
// A value plus its relation: "pOH es 11", "son 2 moles", "equivale a 35 m".
const hasNumber = (s) => /\d/.test(s);
const hasRelation = (s) => /\b(es|son|valen|equivale|significa|da)\b/i.test(s);

export function checkExplanation(explanationBody) {
  const trimmed = (explanationBody || '').trim();
  if (!trimmed) return { error: 'explanation-empty' };
  // Long enough, or a complete calculation: either way the student is told why.
  if (trimmed.length < 40) {
    const complete = IS_COMPLETE_EXPLANATION.test(trimmed) || (hasNumber(trimmed) && hasRelation(trimmed));
    return complete ? null : { error: 'explanation-empty' };
  }
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
// English and Portuguese imperatives that tell the student to look again. The
// Spanish list above left "Incorrect. Review the concept." and "Incorrect.
// Please review the topic." passing, which is 3600 occurrences of feedback that
// says nothing. Same instruction, same emptiness, in the other language.
const VAGUE_EN =
  /^\s*(please\s+|por favor\s+)?(review|revise|revisit|read again|go back|check|look again|practise|practice|try again|see again|consult|estudie|leia|releia|consulte)\b[\s\wáéíóúñ]{0,40}$/i;
const UNFILLED_TOKEN = /\{[a-z_]+\}/i;
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
// Praise with no reason attached. The only thing the length floor was ever
// catching in practice: "Well done" appeared 400 times in the merged corpus
// and nothing else short was junk. So the rule is now this list, not a length.
const SHORT_PRAISE =
  /^\s*(well done|nice work|great job|good job|very good|excellent|perfect|great|nice|good|bravo|excelente|muy bien|perfecto|bien hecho|felicidades|correct|right|wrong|ok|okay|yes|no|si|así es|eso es|justo eso)\b[\s.!¡!]*$/i;

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
  if (VAGUE_EN.test(reason)) return 'feedback only tells the student to look again, it does not explain why';
  if (SHORT_PRAISE.test(reason)) {
    return `feedback is praise without a reason, it does not explain why: "${reason}"`;
  }
  if (UNFILLED_TOKEN.test(raw)) {
    return `feedback contains an unfilled template token: "${reason}"`;
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

export function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function normalizeForHash(text) {
  return String(text).toLowerCase().replace(/\s+/g, ' ').trim();
}

export function extractStem(qText) {
  const matchEnunciado = qText.match(/###\s+Enunciado\s*([\s\S]*?)(?=###\s+Opciones|###\s+Explicaci[oó]n|$)/i);
  const stemRaw = matchEnunciado ? matchEnunciado[1].trim() : '';
  return normalizeForHash(stemRaw);
}

// The contexto can carry the data the question asks about, so two questions
// with the same stem and options may still be different questions. It is part
// of the identity.
export function extractContexto(qText) {
  const m = qText.match(/\*\*Contexto:\*\*\s*([\s\S]*?)(?=\n\s*\n|\n\*\*|\n###|$)/i);
  return normalizeForHash(m ? m[1] : '');
}

export function calculateQuestionHash(qText, opts = {}) {
  // `ignoreContexto` exists for one caller: duplicate-ignoring-context, which
  // wants to know whether two questions differ in anything a student would see
  // as the question itself. The default keeps the contexto in, because two
  // questions about different scenarios are genuinely different items.
  const contexto = opts.ignoreContexto ? '' : extractContexto(qText);
  const components = [contexto, extractStem(qText), ...optionRows(qText).map((o) => o.text)];
  // JSON.stringify keeps the component boundaries, so a literal pipe inside a
  // stem or an option cannot be confused with the separator.
  const key = JSON.stringify(components);
  return crypto.createHash('sha256').update(key).digest('hex').slice(0, 16);
}

export function buildCorpusHashMap(files) {
  const hashMap = new Map();
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    const relative = rel(file);
    const questions = questionBlocks(content);
    questions.forEach((q, index) => {
      const qNum = q.number || (index + 1);
      const hash = calculateQuestionHash(q.text);
      if (!hashMap.has(hash)) {
        hashMap.set(hash, []);
      }
      hashMap.get(hash).push({
        file: relative,
        qNum,
        qId: q.text.match(/\*\*ID:\*\*\s*`?([^\n`\r]+)`?/)?.[1]?.trim() || `Q${qNum}`,
      });
    });
  }
  return hashMap;
}

export function validateFile(file, opts = { strictQuality: false, corpusHashMap: null }) {
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

  // control-chars covers ASCII control codes only. It cannot see a generator
  // that injected Cyrillic or CJK into a Spanish stem, which is what actually
  // happened: "El autor многочисленный ha rechazado todas las alternativas",
  // "qué ожидает", "se различа", "la tensión que двига la trama". The sentence
  // still has the right number of options, the right feedback, the right
  // length, so every shape rule passes and the bundle ships.
  //
  // A word like that is never legitimate in this corpus. Spanish bundles carry
  // accented Latin and nothing else; English bundles carry ASCII plus the
  // occasional curly quote. Anything in the Cyrillic, CJK, Kana or Hangul
  // blocks is corruption, and a Spanish letter glued onto a Cyrillic one
  // ("voseoGg", "weakhens") is the same defect in a harder-to-see form.
  for (const o of detectOptionLetters(content)) {
    errors.push(`ERROR [option-letters] ${relative}: Question ${o.question}: option letter(s) ${o.repeated} appear more than once (letters: ${o.letters})`);
  }

  for (const t of detectGluedTokens(content)) {
    errors.push(`ERROR [glued-token] ${relative}:${t.line} token pegado: "${t.token}"`);
  }

  for (const f of detectForeignScript(content)) {
    errors.push(
      `ERROR [foreign-script] ${relative}:${f.line} ${f.block}: "${f.sample}"`
    );
  }

  // A row that looks like an option but does not close the marker is not an
  // option -- and it must not be invisible. Every parser here matches
  // `- [ ] B)`, so a row written `- [ ] B]` was skipped in silence: the bundle
  // reported "expected 4 options, found 2" for a question whose four rows were
  // all present and correct. Two bundles in the last-26 batch were diagnosed as
  // "missing options" when the options were all there. Fail loudly instead.
  const malformedOptions = [...content.matchAll(/^- \[[ xX]\]\s*[A-D][^)\s][^\n]*/gm)];
  for (const m of malformedOptions.slice(0, 3)) {
    const line = content.slice(0, m.index).split('\n').length;
    errors.push(
      `ERROR [malformed-option-row] ${relative}:${line} fila de opcion mal formada ` +
        `(falta ")"): ${m[0].trim().slice(0, 60)}`
    );
  }

  const mojibakeLines = detectMojibakeLines(content);
  for (const m of mojibakeLines) {
    errors.push(`ERROR [encoding] ${relative}:${m.line} contiene mojibake ("${m.sequence}"); repara a UTF-8 antes de publicar.`);
  }

  const fm = parseFrontmatter(content);

  for (const t of detectTemaCoherence(content, fm && fm.tema)) {
    errors.push(`ERROR [tema-coherente] ${relative}: ${t.count} questions ask "What is the English word for", but the declared tema is "${t.tema}"`);
  }

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

  // Two questions can share a stem and all four options and still be counted as
  // distinct by calculateQuestionHash, because that hash includes the Contexto
  // line. In practice the only difference is a school, a city and a student's
  // first name: "Colegio Nacional Potosi de Oruro, el estudiante Ramiro" versus
  // "Colegio Nacional Trinidad de Cobija, el estudiante Jaime", with the same
  // equation, the same four answers and the same four feedbacks.
  //
  // A student cannot tell those two questions apart, so the difference is not a
  // real one. The context-carrying case is excluded on purpose: when the data
  // the question needs lives in the Contexto ("3 vacas y 2 ovejas" versus "3
  // vacas y 3 ovejas"), the same stem and the same options are two genuinely
  // different questions, and rejecting them would be wrong.
  //
  // So this rule fires only when the contexto changes in a way that carries no
  // data: two different people and two different places, same numbers. That is
  // what a scenario-only rewrite looks like, and it is the shape the corpus
  // actually contains.
  const sameDataDifferentScene = (a, b) => {
    const numbers = (t) => (t.match(/\d+/g) || []).sort();
    return JSON.stringify(numbers(a)) === JSON.stringify(numbers(b));
  };
  const seenIgnoringContext = new Map();
  questions.forEach((q, index) => {
    const key = calculateQuestionHash(q.text, { ignoreContexto: true });
    const selfNum = q.number || (index + 1);
    const prev = seenIgnoringContext.get(key);
    if (prev !== undefined) {
      if (sameDataDifferentScene(prev.contexto, extractContexto(q.text))) {
        errors.push(
          `ERROR [duplicate-ignoring-context] Question ${selfNum}: identical to Question ${prev.num} except for the Contexto line, and neither contexto carries data (stem and all four options match)`
        );
      }
    } else {
      seenIgnoringContext.set(key, { num: selfNum, contexto: extractContexto(q.text) });
    }
  });

  const correctAnswers = [];
  const allExplanations = [];
  const seenIds = new Set();

  if (opts.corpusHashMap) {
    questions.forEach((q, index) => {
      const prefix = `Question ${index + 1}`;
      const hash = calculateQuestionHash(q.text);
      const locations = opts.corpusHashMap.get(hash) || [];
      const selfRel = rel(file);
      const selfNum = q.number || (index + 1);
      const others = locations.filter((loc) => !(loc.file === selfRel && loc.qNum === selfNum));

      if (others.length > 0) {
        const otherDescs = others.map((loc) =>
          loc.file === selfRel ? `Question ${loc.qNum}` : `${loc.file}:Question ${loc.qNum}`
        );
        errors.push(`ERROR [duplicate-question] ${prefix}: byte-for-byte duplicate of ${otherDescs.join(', ')}`);
      }
    });
  } else {
    const seenHashes = new Map();
    questions.forEach((q, index) => {
      const prefix = `Question ${index + 1}`;
      const hash = calculateQuestionHash(q.text);
      if (seenHashes.has(hash)) {
        const prevNum = seenHashes.get(hash);
        errors.push(`ERROR [duplicate-question] ${prefix}: byte-for-byte duplicate of Question ${prevNum} in the same bundle`);
      } else {
        seenHashes.set(hash, q.number || (index + 1));
      }
    });
  }

  questions.forEach((q, index) => {
    const prefix = `Question ${index + 1}`;
    if (q.label !== 'Question') errors.push(`${prefix}: heading must use "Question"`);
    if (q.number !== index + 1) errors.push(`${prefix}: question numbering is not sequential`);
    if (!/^D\d+(?:-D?\d+)?$/.test(q.difficulty)) errors.push(`${prefix}: invalid difficulty label`);

    const idMatch = q.text.match(/\*\*ID:\*\*\s*`?([^\n`\r]+)`?/);
    if (!idMatch || !idMatch[1].trim()) {
      errors.push(`${prefix}: missing ID`);
    } else {
      const qId = idMatch[1].trim();
      if (seenIds.has(qId)) {
        errors.push(`${prefix}: duplicate ID "${qId}"`);
      } else {
        seenIds.add(qId);
      }
    }
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

        // Two wrong options sharing a feedback teach one thing about two options, and
    // leave one of them with no reason at all: CO-ING-4 W04 told the option Purple
    // that "Blue is not a color of apples", so the letter was explained and the
    // content was not. feedbackProblem cannot see it, because each string alone is a
    // sound explanation. It takes two options to see the defect.
    // The correct option is excluded: a distractor may legitimately be told it
    // matches the right answer, which is why the student picked it.
    // Compared case-insensitively, since a capitalisation difference explains nothing.
    const correctLetter = correct === 1 ? correctMatches[0][1] : null;
    const wrongFeedback = correctLetter
      ? options.filter((o) => o.letter !== correctLetter).map((o) => o.feedback.trim().toLowerCase()).filter(Boolean)
      : [];
    const distinctWrong = new Set(wrongFeedback);
    if (wrongFeedback.length > distinctWrong.size) {
      const dup = wrongFeedback.find((fb, i) => wrongFeedback.indexOf(fb) !== i);
      errors.push(`${prefix}: ${wrongFeedback.length - distinctWrong.size} wrong option(s) share the same feedback: "${dup.slice(0, 60)}"`);
    }

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
      'all-duplicates': { type: 'boolean', default: false },
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

  let corpusHashMap = null;
  if (positionals.length > 0 || values['all-duplicates']) {
    const allBundles = walk(path.join(ROOT, 'questions_data'));
    const allScanned = Array.from(new Set([...allBundles, ...targetFiles]));
    corpusHashMap = buildCorpusHashMap(allScanned);
  }

  const results = targetFiles.map(f => validateFile(f, {
    strictQuality: values['strict-quality'],
    corpusHashMap,
  }));

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
