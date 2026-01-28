
const fs = require('fs');
const path = require('path');

const baseDir = 'e:/scripts-python/worldexams/saberparatodos/src/content/questions/colombia';
const result = {};

function normalizeTopic(topic) {
  if (!topic) return "";
  return topic
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (item.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const subjectMatch = content.match(/^asignatura:\s*["']?([^"'\n]+)["']?/m);
            const gradeMatch = content.match(/^grado:\s*(\d+)/m);
            const topicMatch = content.match(/^tema:\s*["']?([^"'\n]+)["']?/m);

            if (subjectMatch && gradeMatch && topicMatch) {
                const subj = normalizeTopic(subjectMatch[1]);
                const grade = parseInt(gradeMatch[1]);
                const topic = topicMatch[1].trim();

                if (!result[grade]) result[grade] = {};
                if (!result[grade][subj]) result[grade][subj] = new Set();
                result[grade][subj].add(topic);
            }
        }
    }
}

walk(baseDir);

console.log('--- DETECTED TOPICS ---');
for (const grade in result) {
    console.log(`\n### GRADE ${grade}`);
    for (const subj in result[grade]) {
        console.log(`  - ${subj}: ${Array.from(result[grade][subj]).join(', ')}`);
    }
}
