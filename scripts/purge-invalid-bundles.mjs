#!/usr/bin/env node
/**
 * purge-invalid-bundles.mjs
 * Elimina bundles que no cumplen con calidad alta según Protocol v7.
 * 
 * Uso:
 *   node scripts/purge-invalid-bundles.mjs --dry-run      (solo muestra)
 *   node scripts/purge-invalid-bundles.mjs --execute       (elimina)
 *   node scripts/purge-invalid-bundles.mjs --execute --keep-empty-weekly  (no elimina weekly vacíos)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUESTIONS_ROOT = path.resolve(__dirname, '..', 'questions_data');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run') || !args.includes('--execute');
const KEEP_EMPTY_WEEKLY = args.includes('--keep-empty-weekly');

function getBundles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...getBundles(full));
    else if (e.isFile() && e.name.endsWith('MASTERY-bundle.md')) files.push(full);
  }
  return files;
}

function parseQuestions(content) {
  const qBlocks = content.split(/^##\s+(?:Question|Pregunta)\s+\d+/m);
  qBlocks.shift();
  return qBlocks.map(block => {
    const opts = [...block.matchAll(/^- \[([ xX])\]\s*([^\n]*?)(?:<!--\s*feedback:\s*([^>]*?)-->)?$/gmi)];
    const ctx = block.match(/\*\*Contexto:\*\*\s*([^\n]+)/);
    return {
      options: opts.map(m => ({
        correct: ['x', 'X'].includes(m[1]),
        text: m[2].trim(),
        feedback: (m[3] || '').trim(),
      })),
      context: ctx ? ctx[1].trim() : '',
    };
  });
}

function hasPlaceholderOptions(content) {
  return /Opci[oó]n [A-D]|Option [A-D]/.test(content);
}

function hasEnglishFeedback(content, relPath) {
  const isEnglishSubject = relPath.includes('ingles') && 
    !relPath.includes('/lengua') && !relPath.includes('/lectura') &&
    !relPath.includes('/sociales') && !relPath.includes('/ciencias');
  if (isEnglishSubject) return false;
  return /This is correct|Common mistake|Try applying the formula|Well done/.test(content);
}

function categorize(filePath) {
  const rel = path.relative(QUESTIONS_ROOT, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];

  // Broken frontmatter
  if (!content.startsWith('---')) {
    return { rel, action: 'ELIMINAR', reason: 'Sin frontmatter YAML', errors: ['SIN_FRONTMATTER'] };
  }

  const questions = parseQuestions(content);

  // Empty bundle
  if (questions.length === 0) {
    if (KEEP_EMPTY_WEEKLY && content.includes('bundle_type: weekly')) {
      return { rel, action: 'CONSERVAR', reason: 'Weekly vacío (mantenido por flag)', errors: [] };
    }
    return { rel, action: 'ELIMINAR', reason: 'Sin preguntas', errors: ['SIN_PREGUNTAS'] };
  }

  // Placeholder options
  if (hasPlaceholderOptions(content)) {
    return { rel, action: 'REGENERAR', reason: 'Opciones placeholder (Opción A/B/C/D)', errors: ['PLACEHOLDER'] };
  }

  // English feedback
  if (hasEnglishFeedback(content, rel)) {
    return { rel, action: 'REGENERAR', reason: 'Feedback en inglés', errors: ['ENGLISH_FEEDBACK'] };
  }

  // Legacy tier — only delete if empty or placeholder
  if (content.includes('tier: "legacy"') || content.includes("tier: 'legacy'")) {
    if (questions.length > 0 && !hasPlaceholderOptions(content) && !hasEnglishFeedback(content, rel)) {
      return { rel, action: 'CONSERVAR', reason: 'Legacy con contenido real (keep)', errors: [] };
    }
    return { rel, action: 'ELIMINAR', reason: 'Tier legacy vacío/placeholder', errors: ['TIER_LEGACY_BAD'] };
  }

  return { rel, action: 'CONSERVAR', reason: 'Válido', errors: [] };
}

function main() {
  const files = getBundles(QUESTIONS_ROOT);
  const categories = { ELIMINAR: [], REGENERAR: [], CONSERVAR: [] };
  const byCountry = {};

  for (const file of files) {
    const result = categorize(file);
    categories[result.action].push(result);
    const country = result.rel.split(/[/\\]/)[0];
    if (!byCountry[country]) byCountry[country] = { ELIMINAR: 0, REGENERAR: 0, CONSERVAR: 0 };
    byCountry[country][result.action]++;
  }

  console.log('='.repeat(60));
  console.log('PURGE ANALYSIS - Protocol v7');
  console.log('='.repeat(60));
  console.log(`Total bundles: ${files.length}`);
  console.log(`  CONSERVAR: ${categories.CONSERVAR.length}`);
  console.log(`  REGENERAR: ${categories.REGENERAR.length} (necesitan Jules)`);
  console.log(`  ELIMINAR:  ${categories.ELIMINAR.length} (basura)`);
  console.log('');

  console.log('BY COUNTRY:');
  console.log('-'.repeat(60));
  console.log('  País         Conservar  Eliminar  Regenerar');
  for (const [country, counts] of Object.entries(byCountry).sort((a,b) => b[1].CONSERVAR - a[1].CONSERVAR)) {
    console.log(`  ${country.padEnd(12)} ${String(counts.CONSERVAR).padStart(5)} ${String(counts.ELIMINAR).padStart(6)} ${String(counts.REGENERAR).padStart(8)}`);
  }

  if (categories.ELIMINAR.length > 0) {
    console.log('\nFILES TO DELETE:');
    console.log('-'.repeat(60));
    for (const f of categories.ELIMINAR) {
      console.log(`  🗑️ ${f.rel}  (${f.reason})`);
    }
  }

  if (categories.REGENERAR.length > 0) {
    console.log('\nFILES TO REGENERATE (Jules issues):');
    console.log('-'.repeat(60));
    
    // Group by country+subject for issue assignment
    const issueGroups = {};
    for (const f of categories.REGENERAR) {
      const parts = f.rel.split(/[/\\]/);
      const country = parts[0];
      // Determine subject from path
      const subject = parts.find(p => ['matematica','matematicas','lengua','lenguaje','lectura-critica','ciencias-naturales','ingles','sociales-ciudadanas','lengua-espanola','portugues','comunicacion','ciencia','espanol','estudios-sociales','lengua-literatura','lengua-castellana-literatura'].includes(p)) || 'unknown';
      const grade = parts.find(p => p.startsWith('grado-') || p.startsWith('3o-')) || 'unknown';
      const key = `${country}/${subject}/${grade}`;
      if (!issueGroups[key]) issueGroups[key] = [];
      issueGroups[key].push(f);
    }

    for (const [key, group] of Object.entries(issueGroups).sort()) {
      const [country, subject, grade] = key.split('/');
      const bundleCount = group.length;
      const totalQuestions = bundleCount * 20; // estimate
      console.log(`  📋 ${country}/${subject}/${grade}: ${bundleCount} bundles (~${totalQuestions} preguntas)`);
      // Show first 3 filenames
      group.slice(0, 3).forEach(f => console.log(`    • ${f.rel.split('/').pop()}`));
      if (group.length > 3) console.log(`    ... y ${group.length - 3} más`);
      console.log('');
    }
  }

  // If dry run, show total size
  if (DRY_RUN) {
    const deleteSize = categories.ELIMINAR.reduce((sum, f) => {
      const fp = path.join(QUESTIONS_ROOT, f.rel);
      try { return sum + fs.statSync(fp).size; } catch { return sum; }
    }, 0);
    console.log(`\n(DRY RUN — se eliminarían ${categories.ELIMINAR.length} archivos, ~${(deleteSize / 1024).toFixed(0)} KB)`);
    return;
  }

  // Execute deletions
  let deleted = 0;
  for (const f of categories.ELIMINAR) {
    const fp = path.join(QUESTIONS_ROOT, f.rel);
    try {
      fs.unlinkSync(fp);
      deleted++;
      console.log(`  🗑️ Eliminado: ${f.rel}`);
    } catch (err) {
      console.error(`  ❌ Error eliminando ${f.rel}: ${err.message}`);
    }
  }
  console.log(`\n✅ ${deleted} archivos eliminados.`);
}

main();
