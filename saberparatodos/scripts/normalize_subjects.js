/**
 * normalize_subjects.js - Script to normalize subject names in frontmatter
 *
 * Usage: node scripts/normalize_subjects.js [--fix]
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');

// Mapping of wrong/varied names to standard names
const SUBJECT_MAPPING = {
  // Math
  'matemática': 'matematicas',
  'matemáticas': 'matematicas',
  'matemàticas': 'matematicas',

  // Natural Sciences
  'ciencias naturales': 'ciencias-naturales',
  'ciencias_naturales': 'ciencias-naturales',
  'ciencias naturales - física': 'ciencias-naturales', // specialized, but standardizing for now
  'ciencias naturales - química': 'ciencias-naturales',
  'física': 'ciencias-naturales', // merge into core subject
  'química': 'ciencias-naturales',
  'biología': 'ciencias-naturales',

  // Social Sciences
  'sociales': 'sociales', // ok
  'sociales y ciudadanas': 'sociales-ciudadanas',
  'sociales_ciudadanas': 'sociales-ciudadanas',

  // English
  'inglés': 'ingles',
  'ingles': 'ingles', // ok

  // Critical Reading
  'lectura crítica': 'lectura-critica',
  'lectura_critica': 'lectura-critica',
  'lectura critica': 'lectura-critica',
  'competencia lectora': 'lectura-critica', // close enough for now

  // Tech
  'tecnología e informática': 'tecnologia-informatica'
};

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

  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const doc = matter(content);

      const originalSubj = (doc.data.asignatura || doc.data.subject || '').toLowerCase().trim();

      if (!originalSubj) return;

      const standardized = SUBJECT_MAPPING[originalSubj];

      if (standardized && standardized !== originalSubj) {
        console.log(`[${path.relative(QUESTIONS_DIR, filePath)}] ${originalSubj} -> ${standardized}`);

        if (fixMode) {
          doc.data.asignatura = standardized;
          // specific overrides if needed
          if (['física', 'química', 'biología'].includes(originalSubj)) {
             // Maybe keep specialized tag? For now simple normalization.
          }

          const newContent = matter.stringify(doc.content, doc.data);
          fs.writeFileSync(filePath, newContent);
          changed++;
        } else {
            changed++;
        }
      }
    } catch (e) {
      console.error(`Error processing ${filePath}:`, e.message);
    }
  });

  console.log(`\nFound ${changed} files to update.`);
}

main();
