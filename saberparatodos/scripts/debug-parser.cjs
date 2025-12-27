/**
 * Diagnostic Script: Test Question Parser
 *
 * This script tests the parser against sample bundles from both protocol versions
 * to verify that explanations, context, and other fields are extracted correctly.
 *
 * Run: node scripts/debug-parser.js
 */

const fs = require('fs');
const path = require('path');

// ===== PARSER FUNCTIONS (copied from questionParser.ts for standalone testing) =====

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

  // Extract explanation - FIXED REGEX
  // Only stop at newline followed by ## (H2 header) or end of string
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

// ===== TEST RUNNER =====

function testBundle(filePath) {
  console.log('\n' + '='.repeat(80));
  console.log(`📄 Testing: ${path.basename(filePath)}`);
  console.log('='.repeat(80));

  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  let bundleId = 'unknown';
  let protocolVersion = 'unknown';

  if (frontmatterMatch) {
    const idMatch = frontmatterMatch[1].match(/id:\s*(.+)/);
    const protocolMatch = frontmatterMatch[1].match(/protocol_version:\s*['"]?([^'"\n]+)['"]?/);
    if (idMatch) bundleId = idMatch[1].trim();
    if (protocolMatch) protocolVersion = protocolMatch[1].trim();
  }

  console.log(`📦 Bundle ID: ${bundleId}`);
  console.log(`📋 Protocol Version: ${protocolVersion}`);

  // Parse body (everything after frontmatter)
  const body = content.replace(/^---[\s\S]*?---\n?/, '');
  const questions = parseBundleQuestions(body, bundleId);

  console.log(`🔢 Questions Parsed: ${questions.length}`);
  console.log('-'.repeat(80));

  questions.forEach((q, idx) => {
    console.log(`\n  [Q${idx + 1}] ID: ${q.id}`);
    console.log(`       Type: ${q.variantType} | Difficulty: ${q.difficulty}`);
    console.log(`       Text: ${q.text.substring(0, 60)}...`);
    console.log(`       Options: ${q.options.length} | Correct: ${q.correctOptionId}`);
    console.log(`       Context: ${q.context ? q.context.substring(0, 50) + '...' : '(none)'}`);

    // CRITICAL: Check explanation
    const explanationPreview = q.explanation.substring(0, 100).replace(/\n/g, ' ');
    const explanationStatus = q.explanation.length > 10 ? '✅' : '❌ MISSING/SHORT';
    console.log(`       Explanation ${explanationStatus}: "${explanationPreview}..."`);
    console.log(`       Explanation Length: ${q.explanation.length} chars`);
  });

  return questions;
}

// ===== MAIN =====

const testFiles = [
  // Protocol v3.0
  'src/content/questions/colombia/lectura-critica/grado-6/CO-LEC-6-MITOS-001-bundle.md',
  // Protocol v2.1
  'src/content/questions/colombia/ciencias-naturales/grado-11/CO-BIO-11-celular-001-bundle.md'
];

console.log('\n🧪 QUESTION PARSER DIAGNOSTIC TOOL\n');
console.log('Testing both protocol versions to ensure explanations parse correctly.\n');

let totalQuestions = 0;
let questionsWithExplanations = 0;
let questionsWithShortExplanations = 0;

for (const file of testFiles) {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    const questions = testBundle(fullPath);
    totalQuestions += questions.length;

    for (const q of questions) {
      if (q.explanation && q.explanation.length > 10) {
        questionsWithExplanations++;
      } else {
        questionsWithShortExplanations++;
      }
    }
  } else {
    console.log(`\n⚠️  File not found: ${file}`);
  }
}

console.log('\n\n' + '='.repeat(80));
console.log('📊 SUMMARY');
console.log('='.repeat(80));
console.log(`Total Questions Parsed: ${totalQuestions}`);
console.log(`✅ With Explanations (>10 chars): ${questionsWithExplanations}`);
console.log(`❌ Missing/Short Explanations: ${questionsWithShortExplanations}`);

if (questionsWithShortExplanations > 0) {
  console.log('\n⚠️  Some explanations are missing or too short!');
  console.log('   Check the bundle markdown files for correct formatting.');
} else {
  console.log('\n✅ All explanations parsed successfully!');
}
