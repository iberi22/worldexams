
import { readFile } from 'node:fs/promises';
import { parseBundleQuestions } from './src/utils/questionParser.js';

async function verify() {
  const filePath = './src/content/questions/ingles/grado-11/reading/CO-ING-11-reading-001-bundle.md';
  const content = await readFile(filePath, 'utf-8');

  const entry = {
    id: 'CO-ING-11-reading-001',
    body: content,
    data: {
      id: 'CO-ING-11-reading-001',
      grado: 11,
      asignatura: 'ingles',
      tema: 'reading'
    }
  };

  const questions = parseBundleQuestions(entry);
  console.log(`Parsed ${questions.length} questions.`);

  questions.forEach((q, i) => {
    console.log(`Q${i+1} ID: ${q.id}`);
    console.log(`  Question: ${q.text.substring(0, 50)}...`);
    console.log(`  Correct Answer: ${q.correctOptionId}`);
    q.options.forEach(opt => console.log(`    - ${opt.id}: ${opt.text}`));
  });
}

verify().catch(console.error);
