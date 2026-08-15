const { transformQuestion } = require('./saberparatodos/src/lib/question-transformer.js');
const fs = require('fs');
const packsPath = './apps/worldexams-api/public/v1/packs';
const f = fs.readFileSync(packsPath + '/co-week-1-grade-11-subject-ingles.json', 'utf8');
const data = JSON.parse(f);
const q = data.questions[0];
const transformed = transformQuestion(q, 11, 'ingles');
console.log('category:', transformed.category);
