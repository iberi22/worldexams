import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');
const REPO_ROOT = path.join(PROJECT_ROOT, '..');
const QUESTIONS_ROOT = path.join(REPO_ROOT, 'questions_data');

const args = process.argv.slice(2);

function getArg(name, fallback = null) {
  const prefix = `--${name}=`;
  const direct = args.find((arg) => arg.startsWith(prefix));
  return direct ? direct.slice(prefix.length) : fallback;
}

const gradeMin = Number(getArg('grade-min', '3'));
const gradeMax = Number(getArg('grade-max', '11'));
const targetPerPeriod = Number(getArg('target-per-period', '100'));
const scopes = new Set(
  String(getArg('scope', 'colombia,ingles'))
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
);

function walkMarkdownFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.endsWith('.assets')) continue;
      if (entry.name === 'questions_data_quarantine') continue;
      walkMarkdownFiles(fullPath, acc);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md') {
      acc.push(fullPath);
    }
  }

  return acc;
}

function normalizeSubject(subject, filePath) {
  const raw = String(subject || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (raw.includes('matematicas')) return 'matematicas';
  if (raw.includes('ingles') || raw.includes('english')) return 'ingles';
  if (raw.includes('lectura') || raw.includes('lenguaje')) return 'lectura_critica';
  if (raw.includes('sociales') || raw.includes('ciudadanas')) return 'sociales_ciudadanas';
  if (raw.includes('naturales') || raw.includes('fisica') || raw.includes('quimica') || raw.includes('biologia')) {
    return 'ciencias_naturales';
  }
  if (raw.includes('filosofia')) return 'filosofia';
  if (raw.includes('tecnologia')) return 'tecnologia';

  const rel = filePath
    .replace(/\\/g, '/')
    .split('/questions_data/')[1]
    ?.split('/') || [];

  if (rel[0] === 'colombia') return rel[1] || 'unknown';
  return rel[0] || 'unknown';
}

function inferProtocol(frontmatter, filePath) {
  const explicit = String(frontmatter.protocol_version || frontmatter.bundle_version || '').match(/(\d+(?:\.\d+)?)/);
  if (explicit) return explicit[1];

  const lower = path.basename(filePath).toLowerCase();
  if (lower.includes('-pro-v5') || lower.includes('-v5-bundle') || lower.includes('-mastery-bundle')) return '5';
  if (lower.includes('-pro-v4') || lower.includes('-v4-bundle')) return '4';
  if (lower.includes('-v3-bundle')) return '3';
  if (lower.includes('-bundle')) return '2';
  return 'legacy';
}

function countQuestions(frontmatter, content, protocol) {
  if (Number(frontmatter.total_questions) > 0) {
    return Number(frontmatter.total_questions);
  }

  const sectionCount = [...content.matchAll(/^##\s+(?:Pregunta|Question)\s+\d+.*$/gim)].length;
  if (sectionCount > 0) return sectionCount;

  if (String(protocol).startsWith('5') || String(protocol).startsWith('4')) return 20;
  if (String(protocol).startsWith('3')) return 10;
  return 1;
}

const stats = {};
const files = [];

if (scopes.has('colombia')) {
  files.push(...walkMarkdownFiles(path.join(QUESTIONS_ROOT, 'colombia')).map((file) => ({ file, scope: 'colombia' })));
}
if (scopes.has('ingles')) {
  files.push(...walkMarkdownFiles(path.join(QUESTIONS_ROOT, 'ingles')).map((file) => ({ file, scope: 'ingles' })));
}

for (const { file, scope } of files) {
  try {
    const parsed = matter.read(file);
    const grade = Number(parsed.data.grado);
    if (!Number.isFinite(grade) || grade < gradeMin || grade > gradeMax) continue;

    const subject = normalizeSubject(parsed.data.asignatura, file);
    const period = String(parsed.data.periodo || parsed.data.period || 'Unknown');
    const protocol = inferProtocol(parsed.data, file);
    const questionCount = countQuestions(parsed.data, parsed.content, protocol);

    stats[grade] ||= {};
    stats[grade][subject] ||= {};
    stats[grade][subject][period] ||= {
      question_count: 0,
      bundle_count: 0,
      protocols: {},
      scope,
    };

    stats[grade][subject][period].question_count += questionCount;
    stats[grade][subject][period].bundle_count += 1;
    stats[grade][subject][period].protocols[protocol] =
      (stats[grade][subject][period].protocols[protocol] || 0) + 1;
  } catch (error) {
    console.error(`Error processing ${file}: ${error.message}`);
  }
}

console.log(`\n📊 Question Coverage Analysis (${gradeMin}-${gradeMax})`);
console.log(`Target per period: ${targetPerPeriod}`);
console.log(`Scope: ${[...scopes].join(', ')}\n`);

const grades = Object.keys(stats).sort((a, b) => Number(a) - Number(b));
for (const grade of grades) {
  console.log(`\n🎓 GRADE ${grade}`);
  console.log('-'.repeat(112));
  console.log(
    `${'Subject'.padEnd(25)} | ${'P1'.padEnd(8)} | ${'P2'.padEnd(8)} | ${'P3'.padEnd(8)} | ${'P4'.padEnd(8)} | ${'Unk'.padEnd(8)} | ${'Gap'.padEnd(8)} | Protocols`
  );
  console.log('-'.repeat(112));

  for (const subject of Object.keys(stats[grade]).sort()) {
    const subjectStats = stats[grade][subject];
    const p1 = subjectStats['1']?.question_count || 0;
    const p2 = subjectStats['2']?.question_count || 0;
    const p3 = subjectStats['3']?.question_count || 0;
    const p4 = subjectStats['4']?.question_count || 0;
    const unk = subjectStats['Unknown']?.question_count || 0;

    const gap =
      Math.max(0, targetPerPeriod - p1) +
      Math.max(0, targetPerPeriod - p2) +
      Math.max(0, targetPerPeriod - p3) +
      Math.max(0, targetPerPeriod - p4);

    const protocolSummary = Object.values(subjectStats)
      .reduce((acc, entry) => {
        for (const [protocol, count] of Object.entries(entry.protocols)) {
          acc[protocol] = (acc[protocol] || 0) + count;
        }
        return acc;
      }, {})
    ;

    const protocolText = Object.entries(protocolSummary)
      .sort((a, b) => String(a[0]).localeCompare(String(b[0])))
      .map(([protocol, count]) => `${protocol}:${count}`)
      .join(' ');

    console.log(
      `${subject.padEnd(25)} | ${String(p1).padEnd(8)} | ${String(p2).padEnd(8)} | ${String(p3).padEnd(8)} | ${String(p4).padEnd(8)} | ${String(unk).padEnd(8)} | ${String(gap).padEnd(8)} | ${protocolText}`
    );
  }
}
