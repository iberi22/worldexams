
const fs = require('fs');
const path = require('path');

const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');

// --- Parsing Logic (Ported from src/utils/questionParser.ts) ---

function cleanExplanation(explanation) {
  if (!explanation) return undefined;
  let cleaned = explanation.replace(/##\s*📊\s*Metadata\s*de\s*Validación[\s\S]*/gi, '');
  cleaned = cleaned.replace(/^\|.*\|$/gm, '');
  cleaned = cleaned.replace(/^\|[-:\s|]+\|$/gm, '');
  cleaned = cleaned.replace(/^Source ID:.*$/gm, '');
  cleaned = cleaned.replace(/^Fecha de creación:.*$/gm, '');
  cleaned = cleaned.replace(/^Contexto cultural:.*$/gm, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
  return cleaned || undefined;
}

function parseBundleQuestions(fileContent, bundleId) {
  const questions = [];

  // 1. Extract Global Context (Preamble) - Simplified for validation
  const firstSectionIndex = fileContent.search(/## (?:Pregunta|Question)\s+\d+/i);
  let globalContext = '';
  if (firstSectionIndex > -1) {
    let preamble = fileContent.substring(0, firstSectionIndex).trim();
    preamble = preamble.replace(/# === METADATA GLOBAL ===/i, '');
    preamble = preamble.replace(/^---+$/gm, '');
    preamble = preamble.trim();
    if (preamble.length > 0) globalContext = preamble;
  }

  // 2. Iterate Sections
  const sectionRegex = /## (?:Pregunta|Question)\s+(\d+)\s*\(([^)]+)\)[\s\S]*?(?=## (?:Pregunta|Question)\s+\d+|## 📊|---\s*$|$)/gi;
  let match;

  while ((match = sectionRegex.exec(fileContent)) !== null) {
      const sectionNumber = parseInt(match[1]);
      const sectionType = match[2].trim();
      const sectionContent = match[0];

      const q = parseQuestionSection(sectionContent, sectionNumber, sectionType, bundleId);
      if (q) {
          questions.push(q);
      }
  }
  return questions;
}

function parseQuestionSection(content, sectionNumber, sectionType, bundleId) {
    // Extract ID
    const idMatch = content.match(/\*\*ID:\*\*\s*["']?([^"'\n`]+)["']?/); // Modified regex to handle quotes in YAML/MD
    // Fallback ID extraction if quotes/backticks vary
    const strictIdMatch = content.match(/\*\*ID:\*\*\s*["`]?([^"`\n]+)["`]?/);

    let questionId = strictIdMatch ? strictIdMatch[1] : `${bundleId}-v${sectionNumber}`;
    // Cleanup ID if it captured quotes
    questionId = questionId.replace(/['"]/g, '').trim();

    // Extract Enunciado
    const enunciadoMatch = content.match(/### (?:Enunciado|Question)\s+([\s\S]*?)(?=### (?:Opciones|Options))/i);
    const questionText = enunciadoMatch ? enunciadoMatch[1].trim() : '';

    // Extract Options
    const optionsMatch = content.match(/### (?:Opciones|Options)\s+([\s\S]*?)(?=### (?:Explicación|Explanation)|$)/i);
    const optionsBlock = optionsMatch ? optionsMatch[1].trim() : '';

    const options = [];
    let correctOptionId = '';

    const optionLines = optionsBlock.split('\n');
    optionLines.forEach(line => {
        const match = line.match(/^\s*-\s*\[([xX\s])\]\s*([A-Z])\)\s*(.*)/i);
        if (match) {
            const isCorrect = match[1].toLowerCase() === 'x';
            const id = match[2];
            const text = match[3].trim();
            options.push({ id, text });
            if (isCorrect) correctOptionId = id;
        }
    });

    // Extract Explanation
    const explanationMatch = content.match(/### (?:Explicación Pedagógica|Explanation)\s+([\s\S]*?)(?=---\s*$|## (?:Pregunta|Question)|$)/i);
    const explanation = cleanExplanation(explanationMatch ? explanationMatch[1].trim() : undefined) || '';

    return {
        id: questionId,
        variant: sectionNumber,
        text: questionText,
        options,
        correctOptionId,
        explanation
    };
}

// --- Validation Logic ---

function validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const filename = path.basename(filePath);

    // Extract Bundle ID from filenames like CO-MAT-11-xxx-bundle.md
    // OR from metadata `id: "..."`
    let bundleId = filename.replace('-bundle.md', '');
    const idMetaMatch = content.match(/^id:\s*["']?([^"'\n]+)["']?/m);
    if (idMetaMatch) bundleId = idMetaMatch[1];

    // Check if file is a bundle
    if (!content.includes('## Pregunta') && !content.includes('## Question')) {
        return { skipping: true }; // Not a v2 bundle or empty
    }

    const questions = parseBundleQuestions(content, bundleId);
    const errors = [];

    if (questions.length === 0) {
        errors.push({ type: 'PARSING_ERROR', message: 'No questions parsed from bundle (check header format)' });
        return { errors, questions };
    }

    questions.forEach(q => {
        const qContext = `[${q.id}]`;

        // 1. Check Missing Text
        if (!q.text || q.text.length < 5) {
             errors.push({ type: 'MISSING_TEXT', message: `${qContext} Question text is empty or too short` });
        }

        // 2. Check TODO in Text
        if (q.text.includes('TODO:') || q.text.includes('[Pregunta pendiente')) {
            errors.push({ type: 'TODO_CONTENT', message: `${qContext} Question text contains TODO/Placeholder` });
        }

        // 3. Check Duplicate Headers in content (Simulating the previous fix check)
        if (q.text.includes('### Enunciado')) {
             errors.push({ type: 'RENDER_ISSUE', message: `${qContext} Question text contains markdown headers (Duplicate Header bug)` });
        }

        // 4. Check Options
        if (q.options.length < 2) {
            errors.push({ type: 'INVALID_OPTIONS', message: `${qContext} Has fewer than 2 options (${q.options.length})` });
        }

        // 5. Check TODO in Options
        q.options.forEach(opt => {
            if (opt.text.includes('Opción') && (opt.text.length < 10 || opt.text.includes('1') || opt.text.includes('A'))) {
                 // heuristic: "Opción A", "Opción 1" often means placeholder
                 if (['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción A', 'Opción B'].some(s => opt.text.includes(s))) {
                    errors.push({ type: 'TODO_OPTIONS', message: `${qContext} Option ${opt.id} appears to be a placeholder ("${opt.text}")` });
                 }
            }
        });

        // 6. Check Correct Option
        if (!q.correctOptionId) {
             errors.push({ type: 'MISSING_ANSWER', message: `${qContext} No correct option marked ( [x] )` });
        }

        // 7. Check Explanation
        if (!q.explanation || q.explanation.length < 5) {
             errors.push({ type: 'MISSING_EXPLANATION', message: `${qContext} Explanation missing` });
        } else if (q.explanation.includes('TODO:') || q.explanation.includes('[Pendiente]')) {
             errors.push({ type: 'TODO_EXPLANATION', message: `${qContext} Explanation contains TODO/Placeholder` });
        }

        // 8. Mojibake Check
        const mojibakeRegex = /(Ã¡|Ã©|Ã­|Ã³|Ãº|Ã±|Ã‘|Ã¼|Â¡|Â¿)/g;
        if (mojibakeRegex.test(q.text) || q.options.some(o => mojibakeRegex.test(o.text))) {
             errors.push({ type: 'ENCODING_ERROR', message: `${qContext} Contains malformed characters (Mojibake)` });
        }
    });

    return { errors, count: questions.length };
}


// --- Main ---

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

function main() {
    console.log('🚀 Starting Strict Validation (Simulating Rendering Logic)...');
    const files = getAllFiles(QUESTIONS_DIR);
    console.log(`📂 Scanning ${files.length} bundles...`);
    console.log('---------------------------------------------------');

    let totalErrors = 0;
    let filesWithErrors = 0;
    const errorsByType = {};

    files.forEach(file => {
        const result = validateFile(file);
        if (result.skipping) return;

        if (result.errors && result.errors.length > 0) {
            filesWithErrors++;
            const relPath = path.relative(process.cwd(), file);
            console.log(`\n❌ ${relPath}`);
            result.errors.forEach(err => {
                console.log(`    ⚠️  [${err.type}] ${err.message}`);
                totalErrors++;
                errorsByType[err.type] = (errorsByType[err.type] || 0) + 1;
            });
        }
    });

    console.log('\n===================================================');
    console.log('📊 VALIDATION SUMMARY');
    console.log('===================================================');
    console.log(`Total Files Checked: ${files.length}`);
    console.log(`Files with Issues:   ${filesWithErrors}`);
    console.log(`Total Issues Found:  ${totalErrors}`);
    console.log('\nBreakdown by Type:');
    Object.keys(errorsByType).forEach(type => {
        console.log(`- ${type}: ${errorsByType[type]}`);
    });
    console.log('===================================================');

    if (totalErrors > 0) {
        process.exit(1);
    }
}

main();
