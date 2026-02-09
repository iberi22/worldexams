/**
 * tag_wave_1.js - Mass tag Grade 11 bundles based on directory/file patterns
 *
 * Wave 1 Priority:
 * - Matemáticas 11
 * - Lectura Crítica 11
 * - Ciencias Naturales 11
 * - Sociales y Ciudadanas 11
 * - Inglés 11
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');

// Manual mapping based on folder structure analysis
const WAVE_1_RULES = [
  // MATH 11
  { pattern: /matematicas.*grado-11.*calculo/i, period: 1 },
  { pattern: /matematicas.*grado-11.*limites/i, period: 1 },
  { pattern: /matematicas.*grado-11.*funciones/i, period: 1 },
  { pattern: /matematicas.*grado-11.*derivada/i, period: 2 },
  { pattern: /matematicas.*grado-11.*integral/i, period: 3 },
  { pattern: /matematicas.*grado-11.*estadistica/i, period: 4 },
  { pattern: /matematicas.*grado-11.*probabilidad/i, period: 4 },

  // READING 11
  { pattern: /lectura-critica.*grado-11.*narrativo/i, period: 1 },
  { pattern: /lectura-critica.*grado-11.*argumentativo/i, period: 1 },
  { pattern: /lectura-critica.*grado-11.*filosofia/i, period: 3 },
  { pattern: /lectura-critica.*grado-11.*ensayo/i, period: 3 },
  { pattern: /lectura-critica.*grado-11.*medios/i, period: 2 },
  { pattern: /lectura-critica.*grado-11.*infografia/i, period: 2 },

  // SCIENCE 11
  { pattern: /ciencias-naturales.*grado-11.*quimica.*organic/i, period: 1 },
  { pattern: /ciencias-naturales.*grado-11.*carbono/i, period: 1 },
  { pattern: /ciencias-naturales.*grado-11.*fisica.*mecanica/i, period: 2 },
  { pattern: /ciencias-naturales.*grado-11.*termodinamica/i, period: 3 },
  { pattern: /ciencias-naturales.*grado-11.*genetica/i, period: 3 },
  { pattern: /ciencias-naturales.*grado-11.*evolucion/i, period: 3 },
  { pattern: /ciencias-naturales.*grado-11.*ecologia/i, period: 3 },

  // SOCIALS 11
  { pattern: /sociales.*grado-11.*violencia/i, period: 1 },
  { pattern: /sociales.*grado-11.*conflicto/i, period: 1 },
  { pattern: /sociales.*grado-11.*historia/i, period: 1 },
  { pattern: /sociales.*grado-11.*economia/i, period: 2 },
  { pattern: /sociales.*grado-11.*globalizacion/i, period: 2 },
  { pattern: /sociales.*grado-11.*constitucion/i, period: 3 },
  { pattern: /sociales.*grado-11.*derechos/i, period: 3 },
  { pattern: /sociales.*grado-11.*politica/i, period: 3 },

  // ENGLISH 11 (Simplified: Parts 1-2 -> P1, Parts 3-4 -> P2, Parts 5-6 -> P3, Part 7 -> P4)
  // This is a heuristic for Saber 11 English parts
  { pattern: /ingles.*grado-11.*part[12]/i, period: 1 },
  { pattern: /ingles.*grado-11.*part[34]/i, period: 2 },
  { pattern: /ingles.*grado-11.*part[56]/i, period: 3 },
  { pattern: /ingles.*grado-11.*part7/i, period: 4 },
];

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function main() {
  const fixMode = process.argv.includes('--fix');
  console.log(fixMode ? "🔧 RUNNING WAVE 1 FIX" : "🔍 WAVE 1 DRY RUN");

  const files = getAllFiles(QUESTIONS_DIR);
  let changed = 0;

  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const doc = matter(content);

      // Skip if already tagged
      if (doc.data.periodo) return;

      // Handle Grade 11 check (flexible for '11' number or string)
      if (doc.data.grado != 11) return;

      const relativePath = path.relative(QUESTIONS_DIR, filePath);
      const normalizedPath = normalize(relativePath);

      // Check rules
      for (const rule of WAVE_1_RULES) {
          if (rule.pattern.test(normalizedPath)) {
              console.log(`[MATCH] ${relativePath} -> Period ${rule.period}`);

              if (fixMode) {
                  doc.data.periodo = rule.period;
                  const newContent = matter.stringify(doc.content, doc.data);
                  fs.writeFileSync(filePath, newContent);
                  changed++;
              }
              break; // Stop after first match
          }
      }

    } catch (e) {
      console.error(`Error processing ${filePath}:`, e.message);
    }
  });

  if (fixMode) console.log(`Files Updated: ${changed}`);
}

main();
