/**
 * Debug Script: Export ResultsView Component Data to TXT
 *
 * This script parses question bundles and outputs all fields that
 * ResultsView.svelte receives, writing to a readable TXT file.
 *
 * Run: node scripts/debug-results-output.cjs
 * Output: debug_results_output.txt
 */

const fs = require('fs');
const path = require('path');

// ===== PARSER FUNCTIONS (from questionParser.ts) =====

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

function parseVariantType(sectionType) {
  const normalized = sectionType.toLowerCase();

  if (normalized.includes('original')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Original', difficulty: diffMatch ? parseInt(diffMatch[1]) : 3 };
  }
  if (normalized.includes('fácil a') || normalized.includes('easy a')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Fácil A', difficulty: diffMatch ? parseInt(diffMatch[1]) : 1 };
  }
  if (normalized.includes('fácil b') || normalized.includes('easy b')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Fácil B', difficulty: diffMatch ? parseInt(diffMatch[1]) : 2 };
  }
  if (normalized.includes('media a') || normalized.includes('medium a')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Media A', difficulty: diffMatch ? parseInt(diffMatch[1]) : 3 };
  }
  if (normalized.includes('media b') || normalized.includes('medium b')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Media B', difficulty: diffMatch ? parseInt(diffMatch[1]) : 3 };
  }
  if (normalized.includes('difícil a') || normalized.includes('hard a')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Difícil A', difficulty: diffMatch ? parseInt(diffMatch[1]) : 4 };
  }
  if (normalized.includes('difícil b') || normalized.includes('hard b')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Difícil B', difficulty: diffMatch ? parseInt(diffMatch[1]) : 5 };
  }
  if (normalized.includes('extra')) {
    const diffMatch = normalized.match(/dificultad\s*(\d)/i);
    return { type: 'Original', difficulty: diffMatch ? parseInt(diffMatch[1]) : 3 };
  }

  return { type: 'Original', difficulty: 3 };
}

function parseQuestionSection(content, sectionNumber, sectionType, bundleId) {
  // Extract ID
  const idMatch = content.match(/\*\*ID:\*\*\s*[`"]([^`"]+)[`"]/);
  const questionId = idMatch ? idMatch[1] : `${bundleId}-v${sectionNumber}`;

  // Determine variant type and difficulty
  const variantInfo = parseVariantType(sectionType);

  // Extract enunciado/question text
  const enunciadoMatch = content.match(/### (?:Enunciado|Question)\s+([\s\S]*?)(?=### (?:Opciones|Options))/i);
  const questionText = enunciadoMatch ? enunciadoMatch[1].trim() : '';

  if (!questionText) {
    return null;
  }

  // Extract options
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
      if (isCorrect) {
        correctOptionId = id;
      }
    }
  });

  // Extract explanation - FIXED: stops only at ## (H2 header) not ### (H3)
  const explanationMatch = content.match(/### (?:Explicación Pedagógica|Explanation)\s+([\s\S]*?)(?=\n## (?:Pregunta|Question)|$)/i);
  const explanation = cleanExplanation(explanationMatch ? explanationMatch[1].trim() : undefined) || '';

  return {
    id: questionId,
    variantNumber: sectionNumber,
    variantType: variantInfo.type,
    difficulty: variantInfo.difficulty,
    text: questionText,
    options,
    correctOptionId,
    explanation
  };
}

function parseBundleQuestions(body, bundleId) {
  const questions = [];

  // Extract shared context (everything before the first question)
  const firstQuestionMatch = body.match(/## (?:Pregunta|Question)\s+\d+/i);
  const contextEndIndex = firstQuestionMatch ? firstQuestionMatch.index : 0;
  const context = contextEndIndex ? body.substring(0, contextEndIndex).trim() : '';

  // Match ## Pregunta N or ## Question N sections
  const sectionRegex = /(?:^|\n)## (?:Pregunta|Question)\s+(\d+)\s*\(([^)]+)\)[\s\S]*?(?=(?:^|\n)## (?:Pregunta|Question)\s+\d+|(?:^|\n)## 📊 Metadata|$)/gi;

  let match;
  while ((match = sectionRegex.exec(body)) !== null) {
    const sectionNumber = parseInt(match[1]);
    const sectionType = match[2].trim();
    const sectionContent = match[0];

    const question = parseQuestionSection(sectionContent, sectionNumber, sectionType, bundleId);
    if (question) {
      if (context) {
        question.context = context;
      }
      questions.push(question);
    }
  }

  return questions;
}

// ===== OUTPUT FORMATTING =====

function formatQuestion(q, index) {
  let output = '';
  output += `\n${'─'.repeat(70)}\n`;
  output += `PREGUNTA ${index + 1}\n`;
  output += `${'─'.repeat(70)}\n\n`;

  output += `ID: ${q.id}\n`;
  output += `Variante: ${q.variantType} | Dificultad: ${q.difficulty}\n\n`;

  output += `ENUNCIADO:\n${q.text}\n\n`;

  if (q.context) {
    output += `CONTEXTO / LECTURA:\n${q.context.substring(0, 500)}${q.context.length > 500 ? '\n[... truncado para brevedad ...]' : ''}\n\n`;
  }

  output += `OPCIONES:\n`;
  q.options.forEach(opt => {
    const marker = opt.id === q.correctOptionId ? '✓' : ' ';
    output += `  [${marker}] ${opt.id}) ${opt.text}\n`;
  });
  output += `\nRespuesta Correcta: ${q.correctOptionId}\n\n`;

  output += `EXPLICACIÓN:\n`;
  if (q.explanation && q.explanation.length > 10) {
    output += `${q.explanation}\n`;
  } else {
    output += `❌ [SIN EXPLICACIÓN O MUY CORTA - ${q.explanation?.length || 0} caracteres]\n`;
  }

  return output;
}

function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};

  const fm = frontmatterMatch[1];
  const result = {};

  const idMatch = fm.match(/id:\s*["']?([^"'\n]+)["']?/);
  const gradeMatch = fm.match(/grado:\s*(\d+)/);
  const subjectMatch = fm.match(/asignatura:\s*["']?([^"'\n]+)["']?/);
  const protocolMatch = fm.match(/protocol_version:\s*["']?([^"'\n]+)["']?/);

  if (idMatch) result.id = idMatch[1].trim();
  if (gradeMatch) result.grado = parseInt(gradeMatch[1]);
  if (subjectMatch) result.asignatura = subjectMatch[1].trim();
  if (protocolMatch) result.protocol_version = protocolMatch[1].trim();

  return result;
}

// ===== HELPER: Recursively find all bundle files =====

function findBundleFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findBundleFiles(fullPath, files);
    } else if (entry.name.endsWith('-bundle.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

// ===== MAIN =====

const questionsDir = path.join(process.cwd(), 'src/content/questions');
const testFiles = findBundleFiles(questionsDir);

let output = '';
output += '═'.repeat(70) + '\n';
output += '  DEBUG RESULTS OUTPUT - ResultsView Component Data\n';
output += '  Generated: ' + new Date().toISOString() + '\n';
output += '═'.repeat(70) + '\n\n';

let stats = {
  totalBundles: 0,
  totalQuestions: 0,
  withExplanation: 0,
  withContext: 0,
  missingExplanation: 0
};

for (const file of testFiles) {
  if (!fs.existsSync(file)) {
    output += `\n⚠️  Archivo no encontrado: ${file}\n`;
    continue;
  }

  stats.totalBundles++;

  const content = fs.readFileSync(file, 'utf-8');
  const frontmatter = parseFrontmatter(content);
  const body = content.replace(/^---[\s\S]*?---\n?/, '');

  output += '\n' + '█'.repeat(70) + '\n';
  output += `BUNDLE: ${path.basename(file)}\n`;
  output += '█'.repeat(70) + '\n\n';

  output += `ID: ${frontmatter.id || 'N/A'}\n`;
  output += `Grado: ${frontmatter.grado || 'N/A'}\n`;
  output += `Asignatura: ${frontmatter.asignatura || 'N/A'}\n`;
  output += `Protocol Version: ${frontmatter.protocol_version || 'N/A'}\n`;

  const bundleId = frontmatter.id || 'unknown';
  const questions = parseBundleQuestions(body, bundleId);

  output += `Preguntas parseadas: ${questions.length}\n`;

  questions.forEach((q, idx) => {
    stats.totalQuestions++;
    if (q.explanation && q.explanation.length > 10) stats.withExplanation++;
    else stats.missingExplanation++;
    if (q.context) stats.withContext++;

    output += formatQuestion(q, idx);
  });
}

// Summary
output += '\n\n' + '═'.repeat(70) + '\n';
output += '  RESUMEN ESTADÍSTICO\n';
output += '═'.repeat(70) + '\n\n';

output += `Bundles procesados: ${stats.totalBundles}\n`;
output += `Total preguntas: ${stats.totalQuestions}\n`;
output += `✅ Con explicación (>10 chars): ${stats.withExplanation}\n`;
output += `❌ Sin/corta explicación: ${stats.missingExplanation}\n`;
output += `📖 Con contexto/lectura: ${stats.withContext}\n`;

if (stats.missingExplanation > 0) {
  output += '\n⚠️  Hay explicaciones faltantes o muy cortas - revisar bundles.\n';
} else {
  output += '\n✅ Todas las explicaciones parseadas correctamente.\n';
}

// Write to file
const outputPath = path.join(process.cwd(), 'debug_results_output.txt');
fs.writeFileSync(outputPath, output, 'utf-8');

console.log('\n📄 Debug output written to: debug_results_output.txt');
console.log(`\n📊 Summary:`);
console.log(`   Bundles: ${stats.totalBundles}`);
console.log(`   Questions: ${stats.totalQuestions}`);
console.log(`   With Explanation: ${stats.withExplanation}`);
console.log(`   Missing Explanation: ${stats.missingExplanation}`);
