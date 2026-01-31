
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');
const MIN_QUESTIONS_PER_PERIOD = 60;

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m"
};

function slugifySubject(input) {
  if (!input) return 'unknown';
  const s = input.toLowerCase().trim();
  if (s.includes('matem')) return 'matematicas';
  if (s.includes('lectura') || s.includes('lengu')) return 'lenguaje_lectura';
  if (s.includes('ciencias') || s.includes('biolog') || s.includes('quim') || s.includes('fisic') || s.includes('nat')) return 'ciencias_naturales';
  if (s.includes('social')) return 'sociales_y_ciudadanas';
  if (s.includes('ingl')) return 'ingles';
  if (s.includes('tecnol')) return 'tecnologia_informatica';
  return s.replace(/[^a-z0-9]+/g, '_');
}

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md') && !['README.md', 'PROTOCOL.md', 'LICENSE.md', '_index.md'].includes(file)) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
}

function countQuestionsInBody(body) {
  // Count ## Pregunta X or ## Question X blocks
  const matches = body.match(/^\s*## (?:Pregunta|Question) \d+/gm);
  return matches ? matches.length : 0;
}

function main() {
  console.log(`${colors.blue}${colors.bold}Starting Content Coverage Validation (Target: ${MIN_QUESTIONS_PER_PERIOD} questions/period)...${colors.reset}\n`);

  if (!fs.existsSync(QUESTIONS_DIR)) {
    console.error(`${colors.red}Error: Questions directory not found at ${QUESTIONS_DIR}${colors.reset}`);
    process.exit(1);
  }

  const files = getAllFiles(QUESTIONS_DIR);
  const stats = {}; // { grade: { subject: { period: count } } }

  let totalFiles = 0;
  let totalQuestions = 0;

  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: body } = matter(content);

      if (!data.grado || !data.asignatura) return;

      const grade = data.grado;
      const subject = slugifySubject(data.asignatura);
      const period = data.periodo || data.period || 'No Period';

      // Determine question count
      // Trust metadata if available and > 0, otherwise count blocks
      let count = data.total_questions || 0;
      const blockCount = countQuestionsInBody(body);

      // If metadata is missing or clearly wrong (1 vs 10 blocks), trust blocks
      if (count === 0 || (count === 1 && blockCount > 1)) {
        count = blockCount;
      }

      // Fallback for single question files without headers
      if (count === 0 && body.trim().length > 0) {
          count = 1;
      }

      // Initialize structure
      if (!stats[grade]) stats[grade] = {};
      if (!stats[grade][subject]) stats[grade][subject] = {};
      if (!stats[grade][subject][period]) stats[grade][subject][period] = 0;

      stats[grade][subject][period] += count;
      totalFiles++;
      totalQuestions += count;

    } catch (err) {
      console.error(`${colors.red}Error parsing ${filePath}:${colors.reset}`, err.message);
    }
  });

  // Report
  console.log(`${colors.bold}Coverage Report:${colors.reset}\n`);

  let hasFailures = false;
  const sortedGrades = Object.keys(stats).sort((a, b) => parseInt(a) - parseInt(b));

  sortedGrades.forEach(grade => {
    console.log(`${colors.cyan}Grade ${grade}:${colors.reset}`);
    const subjects = stats[grade];

    Object.keys(subjects).sort().forEach(subject => {
      const periods = subjects[subject];
      console.log(`  ${colors.bold}${subject}${colors.reset}`);

      // Check periods 1-4 explicitly
      for (let p = 1; p <= 4; p++) {
        const count = periods[p] || 0;
        const statusIcon = count >= MIN_QUESTIONS_PER_PERIOD ? '✅' : '❌';
        const color = count >= MIN_QUESTIONS_PER_PERIOD ? colors.green : colors.red;

        console.log(`    Period ${p}: ${color}${String(count).padEnd(4)}${colors.reset} ${statusIcon}`);

        if (count < MIN_QUESTIONS_PER_PERIOD) {
          hasFailures = true;
        }
      }

      // Show "No Period" if any exists
      if (periods['No Period']) {
         console.log(`    ${colors.yellow}No Period: ${periods['No Period']}${colors.reset} (Untagged)`);
      }
    });
    console.log('');
  });

  console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}`);
  console.log(`Total Files:      ${totalFiles}`);
  console.log(`Total Questions:  ${totalQuestions}`);
  console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}`);

  if (hasFailures) {
    console.log(`\n${colors.red}❌ Validation Failed: Some periods have fewer than ${MIN_QUESTIONS_PER_PERIOD} questions.${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✅ All Checks Passed! All periods have sufficient content. 🚀${colors.reset}`);
    process.exit(0);
  }
}

main();
