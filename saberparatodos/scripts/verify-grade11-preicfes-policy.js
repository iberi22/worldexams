import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, '..', '..');
const colombiaRoot = path.join(repoRoot, 'questions_data', 'colombia');

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.endsWith('.assets')) continue;
      walk(fullPath, acc);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.md')) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function parseProtocol(frontmatter, filePath) {
  const explicit = String(frontmatter.protocol_version || frontmatter.bundle_version || '').match(/(\d+(?:\.\d+)?)/);
  if (explicit) return Number(explicit[1]);

  const lower = path.basename(filePath).toLowerCase();
  if (lower.includes('-pro-v5') || lower.includes('-v5-bundle')) return 5;
  if (lower.includes('-pro-v4') || lower.includes('-v4-bundle')) return 4;
  if (lower.includes('-v3-bundle')) return 3;
  if (lower.includes('-bundle')) return 2;
  return null;
}

function parseDifficulties(body) {
  const matches = body.matchAll(/##\s+Pregunta\s+\d+(?:-\d+)?\s*\(([^)]*)\)/gi);
  const difficulties = [];
  for (const match of matches) {
    const level = match[1].match(/(?:Nivel|Dificultad):?\s*(\d+)/i);
    if (level) difficulties.push(Number(level[1]));
  }
  return difficulties;
}

const files = walk(colombiaRoot);
const activeGrade11 = files.filter((file) =>
  file.includes(`${path.sep}grado-11${path.sep}`) &&
  !file.includes(`${path.sep}legacy${path.sep}`) &&
  !file.includes(`${path.sep}preuniversitario${path.sep}`)
);
const preuFiles = files.filter((file) => file.includes(`${path.sep}preuniversitario${path.sep}`));

const oldProtocolOutsideLegacy = [];
let selectedGrade11Questions = 0;
let selectedPreuQuestions = 0;

for (const file of activeGrade11) {
  const parsed = matter.read(file);
  const protocol = parseProtocol(parsed.data, file);
  if (protocol === null || protocol < 3) {
    oldProtocolOutsideLegacy.push(path.relative(repoRoot, file));
    continue;
  }

  selectedGrade11Questions += parseDifficulties(parsed.content).filter((difficulty) => difficulty > 4).length;
}

for (const file of preuFiles) {
  const parsed = matter.read(file);
  selectedPreuQuestions += parseDifficulties(parsed.content).filter((difficulty) => difficulty > 4).length;
}

console.log('Grade 11 PREICFES policy audit');
console.log(`- Active grade 11 markdown files: ${activeGrade11.length}`);
console.log(`- Old protocol files outside legacy: ${oldProtocolOutsideLegacy.length}`);
console.log(`- Selectable active grade 11 questions (difficulty > 4): ${selectedGrade11Questions}`);
console.log(`- Selectable PREU questions (difficulty > 4): ${selectedPreuQuestions}`);

if (oldProtocolOutsideLegacy.length > 0) {
  console.log('\nViolations:');
  oldProtocolOutsideLegacy.slice(0, 50).forEach((item) => console.log(`- ${item}`));
  process.exit(1);
}

if (selectedGrade11Questions === 0) {
  console.error('\nNo selectable active grade 11 questions were found.');
  process.exit(1);
}

if (selectedPreuQuestions === 0) {
  console.error('\nNo selectable PREU questions with difficulty > 4 were found.');
  process.exit(1);
}

console.log('\nOK: no old protocols remain active in grade 11 and the current PREICFES gate keeps only difficulty > 4.');
