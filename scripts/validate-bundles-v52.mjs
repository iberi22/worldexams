import fs from 'node:fs';
import path from 'node:path';

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
  const re = /^- \[[ xX]\]\s*([A-D])\)\s*([^\n<]+)(?:\s*<!-- feedback:\s*([\s\S]*?)\s*-->)?/gm;
  return [...block.matchAll(re)].map((m) => ({
    letter: m[1],
    text: m[2].trim().toLowerCase().replace(/\s+/g, ' '),
    feedback: (m[3] || '').trim(),
  }));
}

function expectedCount(file, fm) {
  const base = path.basename(file);
  if (base.includes('-3EM-') || String(fm.grado).toUpperCase() === '3EM') return 20;
  const grade = Number(String(fm.grado ?? '').match(/\d+/)?.[0]);
  return QUESTION_COUNTS.get(grade);
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function validateFile(file) {
  const errors = [];
  if (!fs.existsSync(file)) {
    return { file: rel(file), errors: ['File does not exist'] };
  }
  const content = fs.readFileSync(file, 'utf8');
  const relative = rel(file);
  const base = path.basename(file);
  const fm = parseFrontmatter(content);

  if (!relative.startsWith('questions_data/')) errors.push('File is outside questions_data/');
  if (!/-001-MASTERY-bundle\.md$/.test(base)) errors.push('Filename must end with -001-MASTERY-bundle.md');
  if (!fm) return { file: relative, errors: ['Missing YAML frontmatter'] };

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

  const expected = expectedCount(file, fm);
  if (!expected) errors.push(`Unsupported grade for question count: ${fm.grado}`);
  if (expected && fm.total_questions !== expected) errors.push(`total_questions must be ${expected}`);
  if (expected && fm.bundle_size !== expected) errors.push(`bundle_size must be ${expected}`);

  if (/<think>|<process>|```yaml|```markdown/i.test(content)) errors.push('AI leakage or markdown fence detected');
  if (/todas las anteriores|ninguna de las anteriores|all of the above|none of the above|a y b son correctas/i.test(content)) {
    errors.push('Forbidden all/none/multiple-combination option detected');
  }

  const questions = questionBlocks(content);
  if (expected && questions.length !== expected) errors.push(`Expected ${expected} questions, found ${questions.length}`);

  questions.forEach((q, index) => {
    const prefix = `Question ${index + 1}`;
    if (q.label !== 'Question') errors.push(`${prefix}: heading must use "Question"`);
    if (q.number !== index + 1) errors.push(`${prefix}: question numbering is not sequential`);
    if (!/^D\d+(?:-D?\d+)?$/.test(q.difficulty)) errors.push(`${prefix}: invalid difficulty label`);
    if (!/\*\*ID:\*\*\s*\S/.test(q.text)) errors.push(`${prefix}: missing ID`);
    if (!/\*\*Bloom:\*\*\s*(Remember|Understand|Apply|Analyze|Evaluate)/.test(q.text)) errors.push(`${prefix}: invalid Bloom`);
    if (!/\*\*ICFES:\*\*\s*\S/.test(q.text)) errors.push(`${prefix}: missing ICFES/eje field`);
    if (!/\*\*Expected_Success:\*\*\s*0\.\d+/.test(q.text)) errors.push(`${prefix}: missing Expected_Success`);
    if (!/\*\*Contexto:\*\*\s*\S/.test(q.text)) errors.push(`${prefix}: missing Contexto`);
    if (/\*\*Context:\*\*/.test(q.text)) errors.push(`${prefix}: use Contexto, not Context`);
    if (!/###\s+Enunciado/.test(q.text)) errors.push(`${prefix}: missing ### Enunciado`);
    if (!/###\s+Opciones/.test(q.text)) errors.push(`${prefix}: missing ### Opciones`);
    if (!/###\s+Explicaci[oó]n Pedag[oó]gica/.test(q.text)) errors.push(`${prefix}: missing ### Explicacion Pedagogica`);

    const options = optionRows(q.text);
    if (options.length !== 4) errors.push(`${prefix}: expected 4 options, found ${options.length}`);
    const correct = (q.text.match(/^- \[[xX]\]\s*[A-D]\)/gm) || []).length;
    if (correct !== 1) errors.push(`${prefix}: expected exactly one correct option, found ${correct}`);
    if (options.some((option) => !option.feedback)) errors.push(`${prefix}: every option needs feedback`);
    if (new Set(options.map((option) => option.text)).size !== options.length) errors.push(`${prefix}: duplicate option text`);
  });

  return { file: relative, errors };
}

const args = process.argv.slice(2);
const files = args.length
  ? args.map((arg) => path.resolve(ROOT, arg))
  : walk(path.join(ROOT, 'questions_data'));

const results = files.filter((file) => file.endsWith('.md')).map(validateFile);
const failed = results.filter((result) => result.errors.length);

for (const result of failed) {
  console.error(`\n${result.file}`);
  for (const error of result.errors) console.error(`  - ${error}`);
}

console.log(`\nValidated ${results.length} bundle file(s). Failures: ${failed.length}.`);
process.exit(failed.length ? 1 : 0);
