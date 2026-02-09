const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '../src/content/questions');
const DRAFTS_DIR = path.join(__dirname, '../src/content/_drafts');

// Helper to ensure directory exists
function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

// Helper to check for placeholders
const PLACEHOLDER_PATTERNS = [
  /\[Placeholder para pregunta/i,
  /\[Opción Correcta\]/i,
  /\[Distractor \d+\]/i,
  /\[Explicación para el nivel/i,
  /source:\s*Placeholder/i,
  /TODO:\s*Pregunta de nivel/i,
  /TODO:\s*Describir contexto/i,
  /^\[?\s*Pregunta de nivel \d+/im,
];

function hasPlaceholder(content) {
    return PLACEHOLDER_PATTERNS.some(p => p.test(content));
}

// Generators for specific topics
const GENERATORS = {
    'matematicas': {
        'sumas': (id) => generateMathQuestion(id, 'sumas', '+'),
        'restas': (id) => generateMathQuestion(id, 'restas', '-'),
        'multiplicacion': (id) => generateMathQuestion(id, 'multiplicacion', '*'),
        'tablas': (id) => generateMathQuestion(id, 'tablas', '*'),
        'default': (id) => generateMathQuestion(id, 'general', '+')
    },
    'ingles': {
        'alphabet': (id) => generateEnglishQuestion(id, 'alphabet', ['A', 'B', 'C', 'D'], 'What letter comes after C?', 'D'),
        'colors': (id) => generateEnglishQuestion(id, 'colors', ['Red', 'Blue', 'Green', 'Yellow'], 'What color is the sky?', 'Blue'),
        'numbers': (id) => generateEnglishQuestion(id, 'numbers', ['One', 'Two', 'Three', 'Four'], 'How many legs does a dog have?', 'Four'),
        'animals': (id) => generateEnglishQuestion(id, 'animals', ['Dog', 'Cat', 'Bird', 'Fish'], 'Which animal barks?', 'Dog'),
        'family': (id) => generateEnglishQuestion(id, 'family', ['Mother', 'Father', 'Sister', 'Brother'], 'Who is your female sibling?', 'Sister'),
        'default': (id) => generateEnglishQuestion(id, 'general', ['Yes', 'No', 'Maybe', 'Unknown'], 'Is this a question?', 'Yes')
    }
};

function generateMathQuestion(id, topic, op) {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    let question, answer;

    if (op === '+') {
        answer = num1 + num2;
        question = `¿Cuánto es ${num1} + ${num2}?`;
    } else if (op === '-') {
        answer = Math.abs(num1 - num2); // Ensure positive
        const upper = Math.max(num1, num2);
        const lower = Math.min(num1, num2);
        question = `¿Cuánto es ${upper} - ${lower}?`;
        answer = upper - lower;
    } else if (op === '*') {
       const n1 = Math.floor(Math.random() * 9) + 1;
       const n2 = Math.floor(Math.random() * 9) + 1;
       answer = n1 * n2;
       question = `¿Cuánto es ${n1} x ${n2}?`;
    }

    const distractors = [answer + 1, answer - 1, answer + 2].map(String);
    return createBundleContent(id, 'matematicas', topic, question, String(answer), distractors);
}

function generateEnglishQuestion(id, topic, options, question, correct) {
    const distractors = options.filter(o => o !== correct);
    return createBundleContent(id, 'ingles', topic, question, correct, distractors);
}

function createBundleContent(bundleId, subject, topic, question, correct, distractors) {
    const date = new Date().toISOString().split('T')[0];
    const grade = 3;

    // Adjust distractors if needed
    while (distractors.length < 3) distractors.push("None");

    let content = `---
id: "${bundleId.replace('.md', '').replace('-bundle', '')}"
country: "co"
grado: ${grade}
asignatura: "${subject}"
tema: "${topic}"
periodo: 1
protocol_version: "3.0"
bundle_version: "3.0"
total_questions: 1
estado: "published"
creador: "RegenScript"
creation_date: "${date}"
licenses:
  v1: "CC BY-SA 4.0"
source: "Generated"
source_url: "https://generated.local"
source_license: "CC BY-SA 4.0"
---

# Pregunta Base: ${topic}

> **Fuente:** Generated
> **Tema:** ${topic}

---

## Pregunta 1 (Original - Dificultad 2)

**ID:** \`${bundleId.replace('.md', '').replace('-bundle', '')}-v1\`

### Enunciado

${question}

### Opciones

- [x] A) ${correct}
- [ ] B) ${distractors[0]}
- [ ] C) ${distractors[1]}
- [ ] D) ${distractors[2]}

### Explicación Pedagógica

La respuesta correcta es **${correct}**.

---
`;
    return content;
}

function processFiles(dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processFiles(fullPath);
        } else if (file.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (hasPlaceholder(content)) {
                // Check if Grade 3 Math or English
                const isGrade3 = fullPath.includes('grado-3');
                const isMath = fullPath.includes('matematicas');
                const isEnglish = fullPath.includes('ingles');

                if (isGrade3 && (isMath || isEnglish)) {
                    // Regenerate
                    console.log(`♻️ Regenerating: ${file}`);
                    const topic = isMath ? 'matematicas' : 'ingles';
                    // Extract specific topic from path if possible, or assume 'default'
                    // Path: .../topics/file.md
                    const parentDir = path.basename(path.dirname(fullPath));

                    const generator = (GENERATORS[topic][parentDir] || GENERATORS[topic]['default']);
                    const newContent = generator(file);
                    fs.writeFileSync(fullPath, newContent);
                } else {
                    // Archive
                    console.log(`📦 Archiving: ${file}`);
                    const relPath = path.relative(BASE_DIR, fullPath);
                    const destPath = path.join(DRAFTS_DIR, relPath);
                    ensureDir(destPath);
                    fs.renameSync(fullPath, destPath);
                }
            }
        }
    });
}

console.log("Starting regeneration/archival process...");
processFiles(BASE_DIR);
console.log("Done.");
