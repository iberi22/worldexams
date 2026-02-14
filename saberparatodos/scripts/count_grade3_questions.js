
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsDir = path.join(__dirname, '../src/content/questions');

function getQuestions(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getQuestions(file));
    } else {
      if (file.endsWith('.md')) {
        results.push(file);
      }
    }
  });
  return results;
}

const allFiles = getQuestions(questionsDir);
const periodCounts = {};

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const { data } = matter(content);

  if (data.grado === 3) {
    const period = data.periodo || data.period || 'Unknown';
    if (!periodCounts[period]) {
        periodCounts[period] = 0;
    }
    // Count questions in bundle (default 7 for v2, 10 for v3, or use total_questions)
    const count = data.total_questions || (data.protocol_version === '3.0' ? 10 : 7);
    periodCounts[period] += count;
  }
});

console.log('--- Grade 3 Question Counts per Period ---');
console.table(periodCounts);
