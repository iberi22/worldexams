
const fs = require('fs');
const packPath = 'e:/scripts-python/worldexams/saberparatodos/public/api/packs/week-5-grade-11-subject-ciencias_naturales.json';
const data = JSON.parse(fs.readFileSync(packPath, 'utf8'));
const q = data.questions.find(x => x.id === 'CO-CN-11-quimica-gases-ideales-001-v10');
console.log(JSON.stringify(q, null, 2));
