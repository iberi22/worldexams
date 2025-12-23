
const fs = require('fs');
const path = require('path');

const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');
const REPORT_FILE = path.join(__dirname, '../AUDIT_REPORT.md');

// --- Parsing Logic (Mirrors src/utils/questionParser.ts) ---

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

  // 1. Extract Global Context
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
      if (q) questions.push(q);
  }
  return questions;
}

function parseQuestionSection(content, sectionNumber, sectionType, bundleId) {
    const strictIdMatch = content.match(/\*\*ID:\*\*\s*["`]?([^"`\n]+)["`]?/);
    let questionId = strictIdMatch ? strictIdMatch[1] : `${bundleId}-v${sectionNumber}`;
    questionId = questionId.replace(/['"]/g, '').trim();

    const enunciadoMatch = content.match(/### (?:Enunciado|Question)\s+([\s\S]*?)(?=### (?:Opciones|Options))/i);
    const questionText = enunciadoMatch ? enunciadoMatch[1].trim() : '';

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

    const explanationMatch = content.match(/### (?:Explicación Pedagógica|Explanation)\s+([\s\S]*?)(?=---\s*$|## (?:Pregunta|Question)|$)/i);
    const explanation = cleanExplanation(explanationMatch ? explanationMatch[1].trim() : undefined) || '';

    return { id: questionId, variant: sectionNumber, text: questionText, options, correctOptionId, explanation };
}

// --- Validation Logic ---

function validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const filename = path.basename(filePath);
    let bundleId = filename.replace('-bundle.md', '');
    const idMetaMatch = content.match(/^id:\s*["']?([^"'\n]+)["']?/m);
    if (idMetaMatch) bundleId = idMetaMatch[1];

    if (!content.includes('## Pregunta') && !content.includes('## Question')) {
        return { skipping: true };
    }

    const questions = parseBundleQuestions(content, bundleId);
    const errors = [];

    if (questions.length === 0) {
        errors.push({ type: 'PARSING_ERROR', message: 'No se pudieron leer preguntas (formato incorrecto)' });
        return { errors, questions };
    }

    questions.forEach(q => {
        // q.id usually includes version, e.g. CO-MAT-11-001-v1

        // 1. Check Missing Text
        if (!q.text || q.text.length < 5) {
             errors.push({ type: 'MISSING_TEXT', message: `Pregunta vacía o muy corta` });
        }

        // 2. Check TODO in Text
        if (q.text.includes('TODO:') || q.text.includes('[Pregunta pendiente')) {
            errors.push({ type: 'TODO_CONTENT', message: `Contenido pendiente (TODO)` });
        }

        // 3. Check Duplicate Headers
        if (q.text.includes('### Enunciado')) {
             errors.push({ type: 'RENDER_ISSUE', message: `Bug de doble header (detectado en texto)` });
        }

        // 4. Check Options
        if (q.options.length < 2) {
            errors.push({ type: 'INVALID_OPTIONS', message: `Menos de 2 opciones (${q.options.length})` });
        }

        // 5. Check TODO in Options
        q.options.forEach(opt => {
             if (['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción A', 'Opción B'].some(s => opt.text.includes(s))) {
                errors.push({ type: 'TODO_OPTIONS', message: `Opciones placeholder detectadas` });
             }
        });

        // 6. Check Correct Option
        if (!q.correctOptionId) {
             errors.push({ type: 'MISSING_ANSWER', message: `Sin respuesta correcta marcada` });
        }

        // 7. Check Explanation
        if (!q.explanation || q.explanation.length < 5) {
             errors.push({ type: 'MISSING_EXPLANATION', message: `Falta explicación` });
        } else if (q.explanation.includes('TODO:') || q.explanation.includes('[Pendiente]')) {
             errors.push({ type: 'TODO_EXPLANATION', message: `Explicación pendiente (TODO)` });
        }

        // 8. Mojibake Check
        const mojibakeRegex = /(Ã¡|Ã©|Ã­|Ã³|Ãº|Ã±|Ã‘|Ã¼|Â¡|Â¿)/g;
        if (mojibakeRegex.test(q.text) || q.options.some(o => mojibakeRegex.test(o.text))) {
             errors.push({ type: 'ENCODING_ERROR', message: `Problemas de codificación (Mojibake)` });
        }
    });

    // Deduplicate errors per file for summary
    const uniqueErrors = [...new Set(errors.map(e => e.type))];
    return { errors: uniqueErrors, rawErrors: errors, count: questions.length };
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

function formatBadge(type) {
    const map = {
        'MISSING_TEXT': '`🔴 Vacío`',
        'TODO_CONTENT': '`🚧 Enunciado PHP`',
        'RENDER_ISSUE': '`🔥 Render`',
        'INVALID_OPTIONS': '`⚠️ Opciones`',
        'TODO_OPTIONS': '`🚧 Opciones PHP`',
        'MISSING_ANSWER': '`❓ Sin Rta`',
        'MISSING_EXPLANATION': '`ℹ️ Sin Exp`',
        'TODO_EXPLANATION': '`🚧 Exp PHP`',
        'ENCODING_ERROR': '`🔣 Encoding`',
        'PARSING_ERROR': '`☠️ Error Fatal`'
    };
    return map[type] || `\`${type}\``;
}

function main() {
    console.log('🚀 Iniciando Auditoría de Contenido (Lógica Simulada de Componente)...');
    const files = getAllFiles(QUESTIONS_DIR);
    console.log(`📂 Escaneando ${files.length} bundles...`);

    const byCourse = {};
    let totalIssues = 0;
    let filesAffected = 0;

    files.forEach(file => {
        const result = validateFile(file);
        if (result.skipping || result.errors.length === 0) return;

        filesAffected++;
        totalIssues += result.rawErrors.length;

        // Categorize by course (folder structure)
        const parts = file.split(path.sep);
        let countryIdx = -1;
        parts.forEach((p, i) => { if (['colombia', 'mexico', 'brasil'].includes(p)) countryIdx = i; });

        let courseKey = 'Otros';
        if (countryIdx > -1) {
            const subject = parts[countryIdx + 1] || 'Unknown';
            const grade = parts[countryIdx + 2] || 'Unknown';
            courseKey = `${subject.toUpperCase()} (${grade.toUpperCase()})`;
        }

        if (!byCourse[courseKey]) byCourse[courseKey] = [];
        byCourse[courseKey].push({
            file: path.basename(file),
            errors: result.errors
        });
    });

    // Generate Markdown Report
    let md = `# 🕵️ Reporte de Auditoría de Contenido\n\n`;
    md += `**Fecha:** ${new Date().toLocaleString()}\n`;
    md += `**Total Bundles:** ${files.length}\n`;
    md += `**Bundles Defectuosos:** ${filesAffected}\n`;
    md += `**Total Anomalías:** ${totalIssues}\n\n`;

    md += `Este reporte lista los archivos que contienen "Placeholders", "TODOs", texto faltante o errores de renderizado simulados.\n\n`;

    Object.keys(byCourse).sort().forEach(course => {
        md += `## 📚 ${course}\n\n`;
        md += `| Archivo Bundle | Estado / Errores |\n`;
        md += `|---|---|\n`;
        byCourse[course].sort((a,b) => a.file.localeCompare(b.file)).forEach(item => {
            const badges = item.errors.map(formatBadge).join(' ');
            md += `| ${item.file} | ${badges} |\n`;
        });
        md += `\n`;
    });

    fs.writeFileSync(REPORT_FILE, md);
    console.log(`\n✅ Reporte generado exitosamente: ${REPORT_FILE}`);
    console.log(`   Se encontraron ${filesAffected} archivos con problemas.`);
}

main();
