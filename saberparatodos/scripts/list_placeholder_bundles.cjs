const fs = require('fs');
const path = require('path');

// Colors
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

const PLACEHOLDER_PATTERNS = [
  /\[Placeholder para pregunta/i,
  /\[Opción Correcta\]/i,
  /\[Distractor \d+\]/i,
  /\[Explicación para el nivel/i,
  /source:\s*Placeholder/i,
  /TODO:\s*Pregunta de nivel/i,
  /TODO:\s*Describir contexto/i,
  /^\[?\s*Pregunta de nivel \d+/im,
  /Colombia\s*[-–]\s*TODO:/i,
  /^\s*A\)\s*Opción correcta\s*$/im,
  /^\s*[B-D]\)\s*Distractor\s*\d*\s*$/im,
  /\[Completar\]/i,
  /^\s*\[Insert\s/i,
];

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
        if (file.endsWith('.md')) {
            arrayOfFiles.push(path.join(dirPath, file));
        }
    }
  });

  return arrayOfFiles;
}

const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');
const files = getAllFiles(QUESTIONS_DIR);

let placeholderCount = 0;
const bySubject = {};

console.log(`${colors.blue}Scanning for placeholders...${colors.reset}\n`);

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const hasPlaceholder = PLACEHOLDER_PATTERNS.some(p => p.test(content));

    if (hasPlaceholder) {
        placeholderCount++;
        const relPath = path.relative(process.cwd(), file);
        console.log(`${colors.red}Found:${colors.reset} ${relPath}`);

        // Categorize
        const parts = relPath.split(path.sep);
        // src/content/questions/colombia/subject/grade/topic/...
        // parts[3] is mexico/colombia? No, src/content/questions is base.
        // Let's assume structure: src/content/questions/COUNTRY/SUBJECT/GRADE/...
        // Check finding
        const subject = parts.find(p => ['matematicas', 'lenguaje', 'sociales', 'ciencias', 'ingles', 'lectura-critica'].includes(p.toLowerCase())) || 'unknown';
        const grade = parts.find(p => p.startsWith('grado-')) || 'unknown';

        const key = `${subject} - ${grade}`;
        bySubject[key] = (bySubject[key] || 0) + 1;
    }
});

console.log(`\n${colors.blue}Summary:${colors.reset}`);
console.log(`Total Placeholder Bundles: ${placeholderCount}`);
console.table(bySubject);
