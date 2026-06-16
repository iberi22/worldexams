#!/usr/bin/env node
/**
 * validate-bundles-v7.mjs
 * Validador de bundles WorldExams Protocol v7.
 * Uso: node scripts/validate-bundles-v7.mjs [archivos...]
 *      node scripts/validate-bundles-v7.mjs --all
 *      node scripts/validate-bundles-v7.mjs --bad
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUESTIONS_ROOT = path.resolve(__dirname, '..', 'questions_data');

const EXIT = { PASS: 0, FAIL: 1 };

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Uso: node validate-bundles-v7.mjs <archivos...>');
    console.error('      node validate-bundles-v7.mjs --all');
    console.error('      node validate-bundles-v7.mjs --bad');
    process.exit(EXIT.FAIL);
  }
  if (args[0] === '--all') return getBundlesRecursive(QUESTIONS_ROOT);
  if (args[0] === '--bad') return getBadBundles(QUESTIONS_ROOT);
  return args;
}

function getBundlesRecursive(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...getBundlesRecursive(full));
    else if (e.isFile() && e.name.endsWith('MASTERY-bundle.md')) files.push(full);
  }
  return files;
}

function getBadBundles(root) {
  const all = getBundlesRecursive(root);
  return all.filter(f => {
    const result = validateFile(f);
    return result.length > 0;
  });
}

// Rules
const RULES = {
  GRADE_QUESTION_LIMITS: {
    3:  8, 4:  8, 5:  8,
    6: 10, 7: 10,
    8: 12, 9: 12, 10: 12,
    11: 20,
  },
  PROTOCOL_VERSION: '7.0',
  MIN_PROTOCOL: '5.2',
  FORBIDDEN_TIER: 'legacy',
  PLACEHOLDER_PATTERNS: [
    /Opci[oó]n [A-D]/,
    /Option [A-D]/,
  ],
  ENGLISH_FEEDBACK_PATTERNS: [
    /This is correct/,
    /Common mistake/,
    /Try applying the formula/,
    /Well done/,
  ],
  ALL_NONE_PATTERNS: [
    /todas las anteriores/i,
    /ninguna de las anteriores/i,
    /all of the above/i,
    /none of the above/i,
    /todos los anteriores/i,
    /ninguno de los anteriores/i,
  ],
};

function validateFile(filePath) {
  const errors = [];
  const rel = path.relative(QUESTIONS_ROOT, filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Frontmatter YAML
  if (!content.startsWith('---')) {
    errors.push('SIN FRONTMATTER YAML');
    return errors; // Stop early, can't parse further
  }

  // Parse YAML frontmatter (basic)
  const fmEnd = content.indexOf('---', 3);
  if (fmEnd === -1) {
    errors.push('FRONTMATTER SIN CIERRE');
    return errors;
  }
  const fm = parseFrontmatter(content.slice(3, fmEnd));

  // 2. protocol_version
  const pv = fm.protocol_version || '';
  if (!pv || (pv !== RULES.PROTOCOL_VERSION && parseFloat(pv) < parseFloat(RULES.MIN_PROTOCOL))) {
    errors.push(`PROTOCOL VERSION ANTIGUO: ${pv} (mínimo ${RULES.MIN_PROTOCOL})`);
  }

  // 3. tier no legacy
  if (fm.tier === 'legacy') {
    errors.push(`TIER LEGACY: debe ser "mastery"`);
  }

  // 4. Campos obligatorios
  const required = ['id', 'country', 'grado', 'asignatura', 'tema', 'bundle_type', 'total_questions', 'license'];
  for (const field of required) {
    if (fm[field] === undefined || fm[field] === null || fm[field] === '') {
      errors.push(`CAMPO FALTANTE: "${field}"`);
    }
  }

  // 5. Country/grado/asignatura en path
  const pathParts = rel.split(/[\\\/]/);
  if (fm.country && !rel.startsWith(fm.country)) {
    errors.push(`COUNTRY MISMATCH: frontmatter="${fm.country}" path="${pathParts[0]}"`);
  }

  // 6. bundle_type debe ser weekly
  if (fm.bundle_type && fm.bundle_type !== 'weekly') {
    errors.push(`BUNDLE_TYPE NO SEMANAL: "${fm.bundle_type}" (debe ser "weekly")`);
  }

  // 7. Grado vs cantidad de preguntas
  const grade = parseInt(fm.grado, 10);
  const expectedQty = RULES.GRADE_QUESTION_LIMITS[grade] || 
    (rel.includes('3o-ano') || rel.includes('3o-EM') || rel.includes('3em') ? 20 : null);
  const questions = parseQuestions(content);

  if (expectedQty && questions.length !== expectedQty) {
    errors.push(`CANTIDAD PREGUNTAS INCORRECTA: ${questions.length} esperadas ${expectedQty} (grado ${grade})`);
  }

  // 8. Preguntas con opciones
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    
    // Check placeholders
    for (const pat of RULES.PLACEHOLDER_PATTERNS) {
      if (q.options.some(o => pat.test(o.text))) {
        errors.push(`PLACEHOLDER en Q${i+1}: opciones genéricas`);
        break;
      }
    }

    // Check english feedback in non-english subjects
    const isEnglishSubject = rel.includes('ingles') && !rel.includes('/lengua') && !rel.includes('/lectura');
    if (!isEnglishSubject) {
      for (const pat of RULES.ENGLISH_FEEDBACK_PATTERNS) {
        if (q.options.some(o => pat.test(o.feedback))) {
          errors.push(`FEEDBACK INGLES en Q${i+1}: feedback en inglés`);
          break;
        }
      }
    }

    // Check "all/none of the above"
    const allText = q.options.map(o => o.text).join(' ');
    for (const pat of RULES.ALL_NONE_PATTERNS) {
      if (pat.test(allText)) {
        errors.push(`ALL/NONE en Q${i+1}: patrón prohibido`);
        break;
      }
    }

    // Check exactly 4 options
    if (q.options.length !== 4) {
      errors.push(`OPCIONES INCORRECTAS en Q${i+1}: ${q.options.length} (deben ser 4)`);
    }

    // Check exactly 1 correct
    const correct = q.options.filter(o => o.isCorrect).length;
    if (correct !== 1) {
      errors.push(`CORRECTAS INCORRECTAS en Q${i+1}: ${correct} (debe ser 1)`);
    }

    // Check each option has feedback
    const noFeedback = q.options.filter(o => !o.feedback || !o.feedback.trim());
    if (noFeedback.length > 0) {
      errors.push(`FEEDBACK FALTANTE en Q${i+1}: ${noFeedback.length} opciones sin feedback`);
    }

    // Check Contexto exists
    if (!q.context || q.context.trim() === '') {
      errors.push(`SIN CONTEXTO en Q${i+1}: falta **Contexto:**`);
    }

    // Check Bloom
    if (!q.bloom || !['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'].includes(q.bloom)) {
      errors.push(`BLOOM FALTANTE/INVALIDO en Q${i+1}: "${q.bloom || 'vacio'}"`);
    }

    // Check ID
    if (!q.id) {
      errors.push(`ID FALTANTE en Q${i+1}`);
    }
  }

  // 9. Total questions match frontmatter
  if (fm.total_questions && parseInt(fm.total_questions, 10) !== questions.length) {
    errors.push(`TOTAL QUESTIONS MISMATCH: frontmatter=${fm.total_questions} real=${questions.length}`);
  }

  return errors;
}

function parseFrontmatter(yamlText) {
  const fm = {};
  for (const line of yamlText.split('\n')) {
    const trimmed = line.trim();
    const match = trimmed.match(/^([\w-]+):\s*(.+)$/);
    if (match) {
      let value = match[2].trim().replace(/^["']|["']$/g, '');
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (!isNaN(value) && value !== '') value = Number(value);
      fm[match[1]] = value;
    }
  }
  return fm;
}

function parseQuestions(content) {
  const questions = [];
  const qBlocks = content.split(/^##\s+(?:Question|Pregunta)\s+\d+/m);
  
  // Remove first block (before any question)
  qBlocks.shift();

  for (const block of qBlocks) {
    const q = { options: [], context: '', bloom: '', id: '' };

    // ID
    const idMatch = block.match(/\*\*ID:\*\*\s*`?([^`\n]+)`?/);
    if (idMatch) q.id = idMatch[1].trim();

    // Bloom
    const bloomMatch = block.match(/\*\*Bloom:\*\*\s*(\w+)/);
    if (bloomMatch) q.bloom = bloomMatch[1];

    // Context
    const ctxMatch = block.match(/\*\*Contexto:\*\*\s*([^\n]+)/);
    if (ctxMatch) q.context = ctxMatch[1].trim();

    // Options
    const optionRegex = /^- \[([ xXaeio])\]\s*([^\n]*?)(?:<!--\s*feedback:\s*([^>]*?)\s*-->)?$/gmi;
    let oMatch;
    while ((oMatch = optionRegex.exec(block)) !== null) {
      q.options.push({
        isCorrect: ['x', 'X'].includes(oMatch[1]),
        text: oMatch[2].trim().replace(/^[A-D]\)\s*/, ''),
        feedback: (oMatch[3] || '').trim(),
      });
    }

    questions.push(q);
  }

  return questions;
}

function main() {
  const files = parseArgs();
  
  let total = 0, passed = 0, failed = 0;
  const allErrors = {};

  for (const file of files) {
    total++;
    const errors = validateFile(file);
    if (errors.length === 0) {
      passed++;
    } else {
      failed++;
      allErrors[file] = errors;
    }
  }

  // Summary
  console.log('='.repeat(60));
  console.log('VALIDATION RESULTS - Protocol v7');
  console.log('='.repeat(60));
  console.log(`Total: ${total} | Passed: ${passed} | Failed: ${failed}`);
  console.log('');

  if (failed > 0) {
    console.log('FAILURES:');
    console.log('-'.repeat(60));
    
    // Show grouped by error type
    const errorCounts = {};
    for (const [file, errors] of Object.entries(allErrors)) {
      // Show top 5 files
    }

    let shown = 0;
    for (const [file, errors] of Object.entries(allErrors)) {
      if (shown >= 20) {
        console.log(`... and ${failed - shown} more files failed`);
        break;
      }
      shown++;
      const rel = path.relative(QUESTIONS_ROOT, file);
      console.log(`\n❌ ${rel}`);
      for (const err of errors.slice(0, 5)) {
        console.log(`   • ${err}`);
      }
      if (errors.length > 5) {
        console.log(`   ... y ${errors.length - 5} errores más`);
      }
    }

    // Error type summary
    console.log('\nERROR TYPE SUMMARY:');
    const typeCounts = {};
    for (const errors of Object.values(allErrors)) {
      for (const err of errors) {
        const cat = err.split(':')[0];
        typeCounts[cat] = (typeCounts[cat] || 0) + 1;
      }
    }
    for (const [type, count] of Object.entries(typeCounts).sort((a,b) => b[1]-a[1])) {
      console.log(`   ${type}: ${count}`);
    }

    process.exit(EXIT.FAIL);
  }

  process.exit(EXIT.PASS);
}

main();
