/**
 * tag_wave_2.js - Mass tag Grades 5-9 bundles
 *
 * Wave 2 Priority (0% Coverage Areas):
 * - Grades 5, 6, 7, 8, 9
 * - Subject: Ciencias Naturales (Topics: Celula, Ecosistema, Materia, etc.)
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');

// Manual mapping for Grades 5-9 based on common file patterns
const WAVE_2_RULES = [
    // GRADE 5
    { pattern: /grado-5.*celula/i, period: 1 },
    { pattern: /grado-5.*digestivo/i, period: 1 },
    { pattern: /grado-5.*respiratorio/i, period: 1 },
    { pattern: /grado-5.*circulatorio/i, period: 1 },
    { pattern: /grado-5.*ecosistema/i, period: 2 },
    { pattern: /grado-5.*cadena/i, period: 2 },
    { pattern: /grado-5.*materia/i, period: 3 },
    { pattern: /grado-5.*mezcla/i, period: 3 },
    { pattern: /grado-5.*energia/i, period: 4 },
    { pattern: /grado-5.*electricidad/i, period: 4 },
    { pattern: /grado-5.*magnetismo/i, period: 4 },
    { pattern: /grado-5.*movimiento/i, period: 4 },

    // GRADE 6
    { pattern: /grado-6.*celula/i, period: 1 },
    { pattern: /grado-6.*microscopio/i, period: 1 },
    { pattern: /grado-6.*cuerpo/i, period: 2 },
    { pattern: /grado-6.*sistema/i, period: 2 },
    { pattern: /grado-6.*materia/i, period: 3 },
    { pattern: /grado-6.*propiedad/i, period: 3 },
    { pattern: /grado-6.*ecologia/i, period: 4 }, // Broad topic for P4
    { pattern: /grado-6.*clima/i, period: 4 },
    { pattern: /grado-6.*energia/i, period: 4 },
    // Specifics found in audit
    { pattern: /grado-6.*agro/i, period: 4 },
    { pattern: /grado-6.*bioetica/i, period: 4 },
    { pattern: /grado-6.*cuantica/i, period: 4 },
    { pattern: /grado-6.*espacio/i, period: 4 },
    { pattern: /grado-6.*nano/i, period: 4 },
    { pattern: /grado-6.*neuro/i, period: 4 },

    // GRADE 7
    { pattern: /grado-7.*celula/i, period: 1 },
    { pattern: /grado-7.*organelo/i, period: 1 },
    { pattern: /grado-7.*cuerpo/i, period: 2 },
    { pattern: /grado-7.*sistema/i, period: 2 },
    { pattern: /grado-7.*oseo/i, period: 2 },
    { pattern: /grado-7.*muscular/i, period: 2 },
    { pattern: /grado-7.*materia/i, period: 3 },
    { pattern: /grado-7.*atomo/i, period: 3 },
    { pattern: /grado-7.*tabla/i, period: 3 },
    { pattern: /grado-7.*ecosistema/i, period: 4 },
    { pattern: /grado-7.*ecologia/i, period: 4 },

    // GRADE 8 (Based on generic curriculum patterns as specific mapping is light in curriculum.ts)
    // Assuming P1: Genetics/Cells, P2: Systems, P3: Chemistry/Matter, P4: Ecology/Physics
    { pattern: /grado-8.*reproduccion/i, period: 1 },
    { pattern: /grado-8.*nervioso/i, period: 2 },
    { pattern: /grado-8.*endocrino/i, period: 2 },
    { pattern: /grado-8.*quimica/i, period: 3 },
    { pattern: /grado-8.*tabla/i, period: 3 },
    { pattern: /grado-8.*atomo/i, period: 3 },
    { pattern: /grado-8.*gas/i, period: 3 }, // Often P3 or P4
    { pattern: /grado-8.*fluidos/i, period: 4 },

    // GRADE 9
    { pattern: /grado-9.*genetica/i, period: 1 },
    { pattern: /grado-9.*evolucion/i, period: 1 },
    { pattern: /grado-9.*taxonomia/i, period: 1 },
    { pattern: /grado-9.*nervioso/i, period: 2 },
    { pattern: /grado-9.*endocrino/i, period: 2 },
    { pattern: /grado-9.*quimica/i, period: 3 },
    { pattern: /grado-9.*tabla/i, period: 3 },
    { pattern: /grado-9.*ph/i, period: 3 },
    { pattern: /grado-9.*acidez/i, period: 3 },
    { pattern: /grado-9.*fisica/i, period: 4 },
    { pattern: /grado-9.*movimiento/i, period: 4 },
    { pattern: /grado-9.*fuerza/i, period: 4 },
    { pattern: /grado-9.*ecologia/i, period: 4 },
    { pattern: /grado-9.*ciclos/i, period: 4 }
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
  console.log(fixMode ? "🔧 RUNNING WAVE 2 FIX" : "🔍 WAVE 2 DRY RUN");

  const files = getAllFiles(QUESTIONS_DIR);
  let changed = 0;

  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const doc = matter(content);

      // Skip if already tagged
      if (doc.data.periodo) return;

      const grade = Number(doc.data.grado);
      if (grade < 5 || grade > 9) return;

      const relativePath = path.relative(QUESTIONS_DIR, filePath);
      const normalizedPath = normalize(relativePath);

      // Check rules
      for (const rule of WAVE_2_RULES) {
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
