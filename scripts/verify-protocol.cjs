const fs = require('fs');
const path = require('path');

const QUESTIONS_DIR = path.join(__dirname, '../saberparatodos/src/content/questions');

function validateBundle(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const errors = [];
    const fileName = path.basename(filePath);

    // 1. Check Filename
    if (!fileName.endsWith('-bundle.md')) {
        errors.push("Filename must end with '-bundle.md'");
    }

    // 2. Check Frontmatter & Version
    if (!content.includes('# === METADATA GLOBAL ===')) errors.push("Missing '# === METADATA GLOBAL ==='");

    // Detect Protocol Version
    const isV3 = content.includes('protocol_version: "3.0"');
    const expectedQuestions = isV3 ? 10 : 7;
    const versionLabel = isV3 ? "3.0" : "2.1";

    // Check required frontmatter fields
    const requiredFields = ['id:', 'country:', 'grado:', 'asignatura:', 'tema:', 'total_questions:', 'estado:'];
    requiredFields.forEach(field => {
        if (!content.includes(field)) errors.push(`Missing frontmatter field: '${field}'`);
    });

    if (isV3 && !content.includes('total_questions: 10')) errors.push("Metadata 'total_questions' must be 10 for v3.0");

    // 3. Check Structure & Question Count
    const questionRegex = /## Pregunta \d+ \(/g;
    const matchCount = (content.match(questionRegex) || []).length;
    if (matchCount !== expectedQuestions) {
        errors.push(`Expected ${expectedQuestions} questions (v${versionLabel}), found ${matchCount}`);
    }

    // 4. Check Difficulty Distribution
    const difficultyRegex = /## Pregunta \d+ \(.*Dificultad (\d)\)/g;
    let diffMatch;
    const difficulties = [];
    while ((diffMatch = difficultyRegex.exec(content)) !== null) {
        difficulties.push(parseInt(diffMatch[1]));
    }

    if (difficulties.length === expectedQuestions) {
        const easy = difficulties.filter(d => d <= 2).length;
        const medium = difficulties.filter(d => d === 3).length;
        const hard = difficulties.filter(d => d >= 4).length;

        if (isV3) {
            // v3.0 requires 2 of each difficulty (1,2,3,4,5)
            // Ideally: 2xD1, 2xD2, 2xD3, 2xD4, 2xD5
            const d1 = difficulties.filter(d => d === 1).length;
            const d2 = difficulties.filter(d => d === 2).length;
            const d3 = difficulties.filter(d => d === 3).length;
            const d4 = difficulties.filter(d => d === 4).length;
            const d5 = difficulties.filter(d => d === 5).length;

            if (d1 < 2 || d2 < 2 || d3 < 2 || d4 < 2 || d5 < 2) {
                errors.push(`Invalid v3.0 difficulty distribution (Expected 2 of each). Found: D1=${d1}, D2=${d2}, D3=${d3}, D4=${d4}, D5=${d5}`);
            }
        } else {
            // v2.1
            if (easy < 2) errors.push(`Insufficient Easy questions (found ${easy}, expected 2)`);
            if (medium < 3) errors.push(`Insufficient Medium questions (found ${medium}, expected 3)`);
            if (hard < 2) errors.push(`Insufficient Hard questions (found ${hard}, expected 2)`);
        }
    } else {
        errors.push(`Could not parse difficulty levels from headers.`);
    }

    // 5. Check Content Integrity
    if (!content.includes('### Enunciado')) errors.push("Missing '### Enunciado' sections");
    if (!content.includes('### Opciones')) errors.push("Missing '### Opciones' sections");
    if (!content.includes('### Explicación Pedagógica')) errors.push("Missing '### Explicación Pedagógica' sections");

    if (!content.includes('## 📊 Metadata de Validación')) {
        errors.push("Missing 'Metadata de Validación' table");
    }

    return errors;
}

function scanDir(dir) {
    if (!fs.existsSync(dir)) return { hasErrors: false, totalFiles: 0, passedFiles: 0 };
    const files = fs.readdirSync(dir);
    let hasErrors = false;
    let totalFiles = 0;
    let passedFiles = 0;

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const result = scanDir(fullPath);
            if (result.hasErrors) hasErrors = true;
            totalFiles += result.totalFiles;
            passedFiles += result.passedFiles;
        } else if (file.endsWith('.md')) {
            totalFiles++;
            if (!file.endsWith('-bundle.md')) {
                 console.error(`❌ FAILS: ${fullPath}`);
                 console.error(`  - Not a bundle file (must end in -bundle.md)`);
                 hasErrors = true;
                 return;
            }

            const errors = validateBundle(fullPath);
            if (errors.length > 0) {
                console.error(`❌ FAILS: ${fullPath}`);
                errors.forEach(e => console.error(`  - ${e}`));
                hasErrors = true;
            } else {
                passedFiles++;
            }
        }
    });

    return { hasErrors, totalFiles, passedFiles };
}

console.log("🔍 Starting Protocol V2.1 Verification (Enhanced)...");
const result = scanDir(QUESTIONS_DIR);

console.log("---------------------------------------------------");
console.log(`📊 Summary:`);
console.log(`   Total Files Scanned: ${result.totalFiles}`);
console.log(`   Passed: ${result.passedFiles}`);
console.log(`   Failed: ${result.totalFiles - result.passedFiles}`);
console.log("---------------------------------------------------");

if (result.hasErrors) {
    console.error("❌ Verification Failed. Please fix the errors above.");
    process.exit(1);
} else {
    console.log("✨ All checks passed!");
}
