
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsDir = path.join(__dirname, '../src/content/questions');

// Config
const TARGET_PER_SUBJECT_PERIOD = 100;

function normalizeSubject(subject) {
  if (!subject) return 'unknown';
  const s = subject.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .trim();

  // Mapping based on current.json.ts logic + common variations
  if (s.includes('matematicas')) return 'matematicas';
  if (s.includes('ingles') || s.includes('english')) return 'ingles';
  if (s.includes('naturales') || s.includes('fisica') || s.includes('quimica') || s.includes('biologia')) return 'ciencias_naturales';
  if (s.includes('sociales') || s.includes('ciudadanas')) return 'sociales_ciudadanas';
  if (s.includes('lectura') || s.includes('filosofia')) return 'lectura_critica';
  if (s.includes('lenguaje')) return 'lenguaje'; // Often synonym for lectura critica in lower grades? keeping separate if distinct folders
  if (s.includes('tecnologia')) return 'tecnologia';

  return s.replace(/\s+/g, '_');
}

function getQuestions(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getQuestions(file));
    } else {
      if (file.endsWith('.md')) {
        results.push(file);
      }
    }
  });
  return results;
}

const allFiles = getQuestions(questionsDir);
const stats = {};

// Structure: stats[grade][subject][period] = count

allFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const { data } = matter(content);

    // Skip if no grade
    if (!data.grado) return;

    const grade = data.grado;
    const subject = normalizeSubject(data.asignatura);
    const period = data.periodo || data.period || 'Unknown';

    // Initialize structure
    if (!stats[grade]) stats[grade] = {};
    if (!stats[grade][subject]) stats[grade][subject] = {};
    if (!stats[grade][subject][period]) stats[grade][subject][period] = 0;

    // Count
    let count = 0;
    if (data.total_questions) {
        count = data.total_questions;
    } else {
        // Fallback based on version
        const version = String(data.protocol_version || '2.1');
        count = version.startsWith('3') ? 10 : 7;
    }

    stats[grade][subject][period] += count;
  } catch (e) {
    console.error(`Error processing ${file}: ${e.message}`);
  }
});

console.log(`\n📊 Question Analysis (Target: ${TARGET_PER_SUBJECT_PERIOD}/period)\n`);

const grades = Object.keys(stats).sort((a,b) => Number(a)-Number(b));

grades.forEach(grade => {
  console.log(`\n🎓 GRADE ${grade}`);
  console.log('--------------------------------------------------');
  const subjects = Object.keys(stats[grade]).sort();

  // Header
  console.log(`${'Subject'.padEnd(25)} | ${'P1'.padEnd(5)} | ${'P2'.padEnd(5)} | ${'P3'.padEnd(5)} | ${'P4'.padEnd(5)} | ${'Unk'.padEnd(5)} | ${'GAP (Total)'}`);
  console.log('-'.repeat(80));

  subjects.forEach(subj => {
    const p1 = stats[grade][subj]['1'] || 0;
    const p2 = stats[grade][subj]['2'] || 0;
    const p3 = stats[grade][subj]['3'] || 0;
    const p4 = stats[grade][subj]['4'] || 0;
    const unk = stats[grade][subj]['Unknown'] || 0;

    const target = TARGET_PER_SUBJECT_PERIOD;
    const gap1 = Math.max(0, target - p1);
    const gap2 = Math.max(0, target - p2);
    const gap3 = Math.max(0, target - p3);
    const gap4 = Math.max(0, target - p4);
    const totalGap = gap1 + gap2 + gap3 + gap4;

    console.log(
      `${subj.padEnd(25)} | ` +
      `${String(p1).padEnd(5)} | ` +
      `${String(p2).padEnd(5)} | ` +
      `${String(p3).padEnd(5)} | ` +
      `${String(p4).padEnd(5)} | ` +
      `${String(unk).padEnd(5)} | ` +
      `${String(totalGap)} needed`
    );
  });
});
