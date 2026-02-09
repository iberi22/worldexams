const fs = require('fs');
const path = require('path');

const DRAFTS_DIR = path.join(__dirname, '../src/content/_drafts');

function getAllFiles(dirPath, arrayOfFiles) {
    if (!fs.existsSync(dirPath)) return [];

    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            if (file.endsWith('.md')) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles(DRAFTS_DIR);
const summary = {};

files.forEach(file => {
    // Expected path structure in _drafts:
    // .../_drafts/colombia/SUBJECT/grado-N/TOPIC/filename.md
    // OR just relative structure from original.

    // Let's rely on filename or path.
    // Filename format: CO-SUBJ-GRADE-topic-id-bundle.md

    const filename = path.basename(file);
    const parts = filename.split('-');

    let subject = 'Unknown';
    let grade = 'Unknown';

    // CO-MAT-03-...
    if (parts.length >= 3 && parts[0] === 'CO') {
        const subjCode = parts[1];
        const gradeNum = parts[2];

        const SUBJECT_MAP = {
            'MAT': 'Matemáticas',
            'LEN': 'Lenguaje',
            'CIE': 'Ciencias Naturales',
            'SOC': 'Sociales',
            'ING': 'Inglés',
            'LEC': 'Lectura Crítica',
            'TEC': 'Tecnología'
        };

        subject = SUBJECT_MAP[subjCode] || subjCode;
        grade = parseInt(gradeNum);
    } else {
        // Fallback: extract from path
        const relative = path.relative(DRAFTS_DIR, file);
        const pathParts = relative.split(path.sep);
        // colombia/matematicas/grado-3/...
        if (pathParts.length >= 3) {
            subject = pathParts[1]; // matematicas
            grade = pathParts[2].replace('grado-', '');
        }
    }

    const key = `Recrear contenido de **${subject}** - Grado **${grade}**`;
    summary[key] = (summary[key] || 0) + 1;
});

console.log('## Tareas de Regeneración de Contenido\n');
Object.entries(summary).sort().forEach(([task, count]) => {
    console.log(`- [ ] ${task} (${count} bundles placeholder eliminados)`);
});
