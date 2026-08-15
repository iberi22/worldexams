import fs from 'fs';
import { transformQuestion } from './saberparatodos/src/lib/question-transformer.js';

const packsPath = './apps/worldexams-api/public/v1/packs';
const f = fs.readFileSync(packsPath + '/co-week-33-grade-11-subject-ingles.json', 'utf8');
const data = JSON.parse(f);

const q = data.questions[0];
const transformed = transformQuestion(q, 11, 'ingles');

console.log('Original keys:', Object.keys(q));
console.log('Transformed:', transformed.id, transformed.correctOptionId, transformed.options.length, transformed.category);
