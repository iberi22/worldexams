import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseBundleQuestions } from '../saberparatodos/src/utils/questionParser.ts';

const questionsDataPath = './questions_data';

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.md')) {
      results.push(file);
    }
  });
  return results;
}

const bundles = walk(questionsDataPath);
console.log(`Found ${bundles.length} bundles.`);

let bundlesWithParts = 0;
let errors = 0;

bundles.forEach(bundlePath => {
  const content = fs.readFileSync(bundlePath, 'utf8');
  if (content.includes('## PART') || content.includes('### Shared Context')) {
    bundlesWithParts++;
    try {
      const { data, content: body } = matter(content);
      const entry = {
        id: data.id || path.basename(bundlePath),
        body,
        data: {
            ...data,
            grado: data.grado || 11,
            asignatura: data.asignatura || 'unknown',
            tema: data.tema || 'unknown',
            id: data.id || 'unknown'
        }
      };
      const questions = parseBundleQuestions(entry);

      const partHeaders = body.split('\n').filter(l => l.trim().startsWith('## PART') || l.trim().startsWith('### Shared Context'));

      if (questions.length > 0) {
          questions.forEach(q => {
              if (partHeaders.length > 0 && !q.context) {
                  console.error(`Error in ${bundlePath}: Question ${q.id} has no context but bundle has PARTS.`);
                  errors++;
              }
          });
      }

    } catch (e) {
      console.error(`Error parsing ${bundlePath}: ${e.message}`);
      errors++;
    }
  }
});

console.log(`Audited ${bundlesWithParts} bundles with PARTS.`);
console.log(`Found ${errors} potential issues.`);

if (errors > 0) {
  process.exit(1);
}
