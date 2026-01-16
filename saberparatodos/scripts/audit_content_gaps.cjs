// scripts/audit_content_gaps.js
const fs = require('fs');
const path = require('path');

const CONTENT_ROOT = path.join(__dirname, '../src/content/questions/colombia');

function countQuestionsInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Count occurrences of "### Opciones"
    const optionsMatches = (content.match(/### Opciones/g) || []).length;
    
    // Fallback: If 0, count "## Pregunta" blocks (avoiding false positives if possible)
    if (optionsMatches === 0) {
        return (content.match(/^## Pregunta/gm) || []).length;
    }
    return optionsMatches;
}

function audit() {
    if (!fs.existsSync(CONTENT_ROOT)) {
        console.log("Content root not found");
        return;
    }

    const subjects = fs.readdirSync(CONTENT_ROOT);
    const report = {};

    subjects.forEach(subject => {
        const subjectPath = path.join(CONTENT_ROOT, subject);
        if (!fs.statSync(subjectPath).isDirectory() || subject.startsWith('_') || subject === 'PROTOCOL.md') return;

        const grades = fs.readdirSync(subjectPath);
        grades.forEach(gradeDir => {
            if (!gradeDir.startsWith('grado-')) return;
            const grade = parseInt(gradeDir.replace('grado-', ''));
            // Debug Log
            if (grade === 3) console.log(`Found Grade 3 in ${subject}`);
            
            const gradePath = path.join(subjectPath, gradeDir);
            
            let questionCount = 0;
            const files = fs.readdirSync(gradePath).filter(f => f.endsWith('.md'));
            
            files.forEach(file => {
                questionCount += countQuestionsInFile(path.join(gradePath, file));
            });

            if (!report[grade]) report[grade] = {};
            report[grade][subject] = questionCount;
        });
    });

    // Ensure we print all grades 3-11 even if empty objects
    const allGrades = [3]; // Just check 3 for now to debug
    const finalReport = {};
    allGrades.forEach(g => {
        if (report[g]) finalReport[g] = report[g];
        else finalReport[g] = {};
    });
    
    // Merge existing report keys that might be outside standard range
    Object.keys(report).forEach(g => {
        if (!finalReport[g]) finalReport[g] = report[g];
    });

    console.log(JSON.stringify(finalReport, null, 2));
}

audit();
