/**
 * cleanup-corrupted-bundles.cjs
 *
 * Script to clean corrupted English Grade 11 bundle files that contain
 * malformed Info-Tarjeta blocks with [Pendiente] placeholders.
 *
 * Usage: node scripts/cleanup-corrupted-bundles.cjs [--dry-run]
 */

const fs = require('fs');
const path = require('path');

// Configuration
const QUESTIONS_DIR = path.join(__dirname, '..', 'src', 'content', 'questions', 'colombia', 'ingles', 'grado-11');
const DRY_RUN = process.argv.includes('--dry-run');

// Patterns to detect and remove
const CORRUPTED_PATTERNS = [
  // Info-Tarjeta blocks with [Pendiente]
  />\s*###\s*📊\s*Info-Tarjeta\s*\n>\s*\*\*Tema:\*\*\s*\[Pendiente\]\s*\n>\s*\n>\s*\*\*Análisis:\*\*\s*\[Pendiente\]\s*\n>\s*\n>\s*\*\*Tip Clave:\*\*\s*\[Pendiente\]\s*\n/gi,

  // Broken table syntax with trailing pipes
  /\|\s*\n>\s*###\s*📊\s*Info-Tarjeta[\s\S]*?\[Pendiente\][\s\S]*?---\|/gi,

  // Standalone broken table pipes
  /^\|\s*\n---\|$/gm,

  // Multiple consecutive separators
  /^---\s*\n---/gm,
];

// Additional cleanup patterns
const CLEANUP_PATTERNS = [
  // Remove empty blockquotes
  { pattern: /^>\s*$/gm, replacement: '' },

  // Remove multiple consecutive blank lines (more than 2)
  { pattern: /\n{4,}/g, replacement: '\n\n\n' },

  // Fix broken table headers that end with just |
  { pattern: /\|\s*Campo\s*\|\s*Valor\s*\|\s*\n\|[\s\S]*?---\|/gi, replacement: '' },
];

function isCorrupted(content) {
  return content.includes('[Pendiente]') ||
         content.includes('> ### 📊 Info-Tarjeta');
}

function cleanContent(content) {
  let cleaned = content;

  // Apply main corruption patterns
  for (const pattern of CORRUPTED_PATTERNS) {
    cleaned = cleaned.replace(pattern, '');
  }

  // Apply additional cleanup patterns
  for (const { pattern, replacement } of CLEANUP_PATTERNS) {
    cleaned = cleaned.replace(pattern, replacement);
  }

  // Final cleanup: remove any remaining [Pendiente] occurrences
  cleaned = cleaned.replace(/\[Pendiente\]/g, '');

  // Remove any remaining orphaned Info-Tarjeta blocks
  cleaned = cleaned.replace(/>\s*###\s*📊\s*Info-Tarjeta[\s\S]*?(?=\n##|\n---|\n#|$)/gi, '');

  // Normalize line endings
  cleaned = cleaned.replace(/\r\n/g, '\n');

  // Remove trailing whitespace on each line
  cleaned = cleaned.split('\n').map(line => line.trimEnd()).join('\n');

  // Ensure file ends with newline
  if (!cleaned.endsWith('\n')) {
    cleaned += '\n';
  }

  return cleaned;
}

function processFile(filePath) {
  const relativePath = path.relative(QUESTIONS_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  if (!isCorrupted(content)) {
    console.log(`✅ CLEAN: ${relativePath}`);
    return { status: 'clean', file: relativePath };
  }

  const cleaned = cleanContent(content);
  const pendienteCount = (content.match(/\[Pendiente\]/g) || []).length;

  if (DRY_RUN) {
    console.log(`🔍 WOULD FIX: ${relativePath} (${pendienteCount} [Pendiente] removed)`);
    return { status: 'would-fix', file: relativePath, pendienteCount };
  }

  // Create backup
  const backupPath = filePath + '.bak';
  fs.writeFileSync(backupPath, content, 'utf-8');

  // Write cleaned content
  fs.writeFileSync(filePath, cleaned, 'utf-8');

  console.log(`🔧 FIXED: ${relativePath} (${pendienteCount} [Pendiente] removed)`);
  return { status: 'fixed', file: relativePath, pendienteCount };
}

function main() {
  console.log('🧹 Cleanup Corrupted Bundles Script');
  console.log('=====================================');
  console.log(`Directory: ${QUESTIONS_DIR}`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes)' : 'LIVE (will modify files)'}`);
  console.log('');

  if (!fs.existsSync(QUESTIONS_DIR)) {
    console.error(`❌ Directory not found: ${QUESTIONS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(QUESTIONS_DIR)
    .filter(f => f.endsWith('.md') && !f.endsWith('.bak'))
    .map(f => path.join(QUESTIONS_DIR, f));

  console.log(`Found ${files.length} markdown files\n`);

  const results = {
    clean: 0,
    fixed: 0,
    'would-fix': 0,
    errors: []
  };

  for (const file of files) {
    try {
      const result = processFile(file);
      results[result.status]++;
    } catch (err) {
      console.error(`❌ ERROR: ${path.basename(file)} - ${err.message}`);
      results.errors.push({ file: path.basename(file), error: err.message });
    }
  }

  console.log('\n=====================================');
  console.log('📊 Summary:');
  console.log(`   Clean files: ${results.clean}`);
  console.log(`   ${DRY_RUN ? 'Would fix' : 'Fixed'}: ${results.fixed || results['would-fix']}`);
  if (results.errors.length > 0) {
    console.log(`   Errors: ${results.errors.length}`);
  }

  if (DRY_RUN && (results['would-fix'] > 0)) {
    console.log('\n💡 Run without --dry-run to apply fixes');
  }

  if (!DRY_RUN && results.fixed > 0) {
    console.log('\n✅ Files fixed! Backup files created with .bak extension');
    console.log('💡 Next steps:');
    console.log('   1. Run: npm run generate:packs');
    console.log('   2. Run: npm run dev');
    console.log('   3. Verify the fixes in browser');
  }
}

main();
