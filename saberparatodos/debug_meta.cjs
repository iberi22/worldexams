const matter = require('gray-matter');
const fs = require('fs');

const filePath = 'e:/scripts-python/worldexams/saberparatodos/src/content/questions/colombia/matematicas/grado-3/sumas/CO-MAT-3-sumas-001-v3-bundle.md';
const content = fs.readFileSync(filePath, 'utf8');
const { data } = matter(content);

console.log('Metadata:', JSON.stringify(data, null, 2));
console.log('Type of periodo:', typeof data.periodo);
