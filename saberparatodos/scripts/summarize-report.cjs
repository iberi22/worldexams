
const fs = require('fs');
const path = require('path');

const report = fs.readFileSync('validation_report.txt', 'utf8');
const lines = report.split('\n');

const summary = {};

lines.forEach(line => {
  if (line.startsWith('❌')) {
    const filePath = line.replace('❌ ', '').trim();
    // Path structure: src/content/questions/colombia/subject/grade/file
    const parts = filePath.split(path.sep);

    // Adjust index based on your path structure.
    // E:\scripts-python\worldexams\saberparatodos\src\content\questions\colombia\sociales-ciudadanas\grado-11\file
    // "src" is likely relative to cwd.
    // Let's find "subject" and "grade"

    let subjectIndex = -1;
    parts.forEach((p, i) => {
        if (p === 'colombia' || p === 'mexico' || p === 'brasil') subjectIndex = i + 1;
    });

    if (subjectIndex > -1 && parts[subjectIndex] && parts[subjectIndex+1]) {
        const key = `${parts[subjectIndex]} - ${parts[subjectIndex+1]}`;
        summary[key] = (summary[key] || 0) + 1;
    } else {
        // Fallback
        summary['Unknown'] = (summary['Unknown'] || 0) + 1;
    }
  }
});

console.log('## 📑 Summary of Incomplete/Problematic Bundles by Course\n');
console.log('| Asignatura - Grado | Archivos Afectados |');
console.log('|---|---|');
Object.keys(summary).sort().forEach(key => {
    console.log(`| ${key} | ${summary[key]} |`);
});
