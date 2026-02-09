/**
 * add_period_metadata.js - Infers and adds period metadata based on curriculum
 *
 * Usage: node scripts/add_period_metadata.js [--fix]
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// We need to import the curriculum. Since it's TS, we might need to rely on a simplified version or
// read the TS file and regex it. For robustness in this script, I'll inline the mapping logic
// based on the `curriculum.ts` content I've read, or I can try to import it if I transpile.
// Simpler approach: manual mapping extraction or regex parsing of curriculum.ts.
// Actually, let's just define the mapping here for the script to be standalone and robust.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');

// Simplified Curriculum Mapping (copied/adapted from curriculum.ts)
// Key: Grade -> Subject (normalized) -> Topic keyword -> Period
const CURRICULUM_RULES = {
  3: {
    'matematicas': [
        { p: 1, keywords: ['suma', 'resta', 'numero', 'conteo', 'dinero'] },
        { p: 2, keywords: ['multiplicacion', 'patron', 'secuencia', 'doble'] },
        { p: 3, keywords: ['tiempo', 'medida', 'longitud', 'figura', 'cuerpo'] },
        { p: 4, keywords: ['datos', 'grafica', 'azar', 'problema'] }
    ],
    'ciencias-naturales': [
        { p: 1, keywords: ['seres vivos', 'animal', 'planta'] },
        { p: 2, keywords: ['cuerpo', 'sentido'] },
        { p: 3, keywords: ['agua', 'aire', 'suelo', 'materia', 'estado'] },
        { p: 4, keywords: ['clima', 'sol', 'luna', 'universo', 'entorno'] }
    ]
  },
  5: {
     'ciencias-naturales': [
         { p: 1, keywords: ['celula', 'digestivo', 'respiratorio', 'circulatorio', 'sistema'] },
         { p: 2, keywords: ['ecosistema', 'cadena', 'adaptacion'] },
         { p: 3, keywords: ['materia', 'mezcla', 'solucion', 'atomo'] },
         { p: 4, keywords: ['energia', 'fuerza', 'electricidad', 'magnetismo', 'movimiento'] }
     ]
  },
  6: {
      'ciencias-naturales': [
          { p: 1, keywords: ['celula', 'microscopio'] },
          { p: 2, keywords: ['cuerpo', 'sistema'] },
          { p: 3, keywords: ['materia', 'propiedad'] },
          { p: 4, keywords: ['ecologia', 'ecosistema', 'agro', 'bioetica', 'clima', 'cuantica', 'energia', 'espacio', 'nano', 'neuro'] } // Advanced topics in P4? Or spread? Based on file list, many special topics.
      ]
  },
  9: {
      'matematicas': [
          { p: 1, keywords: ['ecuacion', 'sistema', 'algebra'] },
          { p: 2, keywords: ['funcion', 'lineal', 'cuadratica'] },
          { p: 3, keywords: ['geometria', 'volumen', 'pitagoras'] },
          { p: 4, keywords: ['estadistica', 'probabilidad'] }
      ],
      'ciencias-naturales': [
          { p: 1, keywords: ['genetica', 'evolucion', 'taxonomia', 'herencia'] },
          { p: 2, keywords: ['nervioso', 'endocrino', 'inmune'] },
          { p: 3, keywords: ['quimica', 'tabla', 'enlace', 'ph', 'acidez'] },
          { p: 4, keywords: ['fisica', 'movimiento', 'fuerza', 'onda', 'ecologia'] }
      ]
  },
  10: {
      'ciencias-naturales': [
          { p: 1, keywords: ['quimica', 'nomenclatura', 'reaccion', 'estequiometria', 'gas', 'solucion'] },
          { p: 2, keywords: ['fisica', 'cinematica', 'dinamica', 'newton'] },
          { p: 3, keywords: ['biologia', 'celula', 'metabolismo'] },
          { p: 4, keywords: ['ecologia', 'ecosistema'] }
      ]
  },
  11: {
      'ciencias-naturales': [
          { p: 1, keywords: ['quimica', 'organica', 'carbono'] },
          { p: 2, keywords: ['fisica', 'mecanica', 'fluido', 'termodinamica', 'onda', 'energia'] },
          { p: 3, keywords: ['biologia', 'genetica', 'evolucion', 'ecologia'] },
          { p: 4, keywords: ['ciencia', 'tecnologia', 'sociedad'] }
          // Specialized Overrides based on file analysis:
          // CO-FIS-11-energia -> P2
          // CO-NAT-11-biologia -> P3
      ],
      'matematicas': [
          { p: 1, keywords: ['funcion', 'limite', 'derivada', 'calculo'] },
          { p: 2, keywords: ['trigonometria', 'angulo', 'triangulo'] },
          { p: 3, keywords: ['geometria', 'analitica'] },
          { p: 4, keywords: ['estadistica', 'probabilidad'] }
      ]
  }
};

function normalizeText(text) {
    if (!text) return "";
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}

function inferPeriod(grade, subject, topic) {
    if (!CURRICULUM_RULES[grade]) return null;

    // Normalize subject
    let normSubj = normalizeText(subject);
    if (normSubj.includes('matematica')) normSubj = 'matematicas';
    if (normSubj.includes('ciencianatural')) normSubj = 'ciencias-naturales';
    if (normSubj.includes('biologia') || normSubj.includes('fisica') || normSubj.includes('quimica')) normSubj = 'ciencias-naturales'; // Merge

    if (!CURRICULUM_RULES[grade][normSubj]) return null;

    const normTopic = normalizeText(topic);

    for (const rule of CURRICULUM_RULES[grade][normSubj]) {
        for (const kw of rule.keywords) {
            if (normTopic.includes(kw)) return rule.p;
        }
    }

    return null;
}

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

function main() {
  const fixMode = process.argv.includes('--fix');
  console.log(fixMode ? "🔧 RUNNING IN FIX MODE" : "🔍 DRY RUN (Use --fix to apply changes)");

  const files = getAllFiles(QUESTIONS_DIR);
  let changed = 0;
  let inferred = 0;
  let skipped = 0;

  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const doc = matter(content);

      // Skip if already has period
      if (doc.data.periodo) return;

      const grade = doc.data.grado;
      const subject = doc.data.asignatura || doc.data.subject;
      const topic = doc.data.tema || '';

      if (!grade || !subject) return;

      const period = inferPeriod(grade, subject, topic);

      if (period) {
          console.log(`[${grade} | ${subject} | ${topic}] -> Period ${period}`);
          inferred++;

          if (fixMode) {
              doc.data.periodo = period;
              const newContent = matter.stringify(doc.content, doc.data);
              fs.writeFileSync(filePath, newContent);
              changed++;
          }
      } else {
          // console.log(`[SKIPPED] Could not infer for: ${grade} ${subject} - ${topic}`);
          skipped++;
      }

    } catch (e) {
      console.error(`Error processing ${filePath}:`, e.message);
    }
  });

  console.log(`\nInferred: ${inferred}`);
  console.log(`Skipped: ${skipped}`);
  if (fixMode) console.log(`Files Updated: ${changed}`);
}

main();
