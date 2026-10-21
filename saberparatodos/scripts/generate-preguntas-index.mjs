#!/usr/bin/env node
/**
 * Regenera `src/lib/preguntas/preguntas-index.json`, el índice que las rutas
 * públicas /preguntas/ embeben en el Worker (sin filesystem en runtime).
 *
 * Corre en `prebuild`. Uso manual:
 *   node scripts/generate-preguntas-index.mjs          # escribe el índice
 *   node scripts/generate-preguntas-index.mjs --check  # exit 1 si está desactualizado
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanQuestionsData } from '../src/lib/preguntas/index-builder.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(here, '..');
const questionsRoot = path.resolve(appRoot, '..', 'questions_data');
const outFile = path.join(appRoot, 'src', 'lib', 'preguntas', 'preguntas-index.json');

try {
  await fs.stat(questionsRoot);
} catch {
  // Build sin questions_data (p. ej. checkout parcial): conservar el índice commiteado.
  console.warn(`[generate-preguntas-index] ${questionsRoot} not found; keeping committed index.`);
  process.exit(0);
}

const bundles = await scanQuestionsData(questionsRoot, fs, path);
const next =
  // Minificado: el JSON se embebe en el bundle del Worker.
  JSON.stringify({ generatedFrom: 'questions_data/**/2026/weekly/*-bundle.md', bundleCount: bundles.length, bundles }) + '\n';

let current = '';
try {
  current = await fs.readFile(outFile, 'utf8');
} catch {
  // first run
}

if (process.argv.includes('--check')) {
  if (current !== next) {
    console.error('[generate-preguntas-index] preguntas-index.json is stale; run node scripts/generate-preguntas-index.mjs');
    process.exit(1);
  }
  console.log(`[generate-preguntas-index] up to date (${bundles.length} bundles)`);
} else if (current === next) {
  console.log(`[generate-preguntas-index] unchanged (${bundles.length} bundles)`);
} else {
  await fs.writeFile(outFile, next);
  console.log(`[generate-preguntas-index] wrote ${bundles.length} bundles`);
}
