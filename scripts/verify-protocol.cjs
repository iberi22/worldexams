const fs = require('fs');
const path = require('path');

const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');

function validateBundle(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const errors = [];
    const fileName = path.basename(filePath);

    // 1. Check Filename
    if (!fileName.endsWith('-bundle.md')) {
        errors.push("Filename must end with '-bundle.md'");
    }

    // 2. Check Frontmatter Headers
    if (!content.includes('# === METADATA GLOBAL ===')) errors.push("Missing '# === METADATA GLOBAL ==='");
    // Note: Some legacy files might vary, but for NEW generation we enforce 2.1
    if (!content.includes('bundle_version: "2.1"')) errors.push("Missing or wrong 'bundle_version' (must be 2.1)");

    // Check required frontmatter fields
    const requiredFields = ['id:', 'country:', 'grado:', 'asignatura:', 'tema:', 'total_questions:', 'estado:'];
    requiredFields.forEach(field => {
        if (!content.includes(field)) errors.push(`Missing frontmatter field: '${field}'`);
    });

    // 3. Check Structure & Question Count
    const questionRegex = /## Pregunta \d+ \(/g;
    const matchCount = (content.match(questionRegex) || []).length;
    if (matchCount !== 7) {
        errors.push(`Expected 7 questions, found ${matchCount}`);
    }

    // 4. Check Difficulty Distribution
    // Expected: 1 Original (diff 3), 2 Easy (diff 1-2), 2 Medium (diff 3), 2 Hard (diff 4-5)
    const difficultyRegex = /## Pregunta \d+ \(.*Dificultad (\d)\)/g;
    let diffMatch;
    const difficulties = [];
    while ((diffMatch = difficultyRegex.exec(content)) !== null) {
        difficulties.push(parseInt(diffMatch[1]));
    }

    if (difficulties.length === 7) {
        const easy = difficulties.filter(d => d <= 2).length;
        const medium = difficulties.filter(d => d === 3).length;
        const hard = difficulties.filter(d => d >= 4).length;

        if (easy < 2) errors.push(`Insufficient Easy questions (found ${easy}, expected 2)`);
        if (medium < 3) errors.push(`Insufficient Medium questions (found ${medium}, expected 3 [1 orig + 2 med])`);
        if (hard < 2) errors.push(`Insufficient Hard questions (found ${hard}, expected 2)`);
    } else {
        errors.push(`Could not parse difficulty levels from headers. Ensure format: '## Pregunta X (... Dificultad N)'`);
    }

    // 5. Check Content Integrity
    if (!content.includes('### Enunciado')) errors.push("Missing '### Enunciado' sections");
    if (!content.includes('### Opciones')) errors.push("Missing '### Opciones' sections");
    if (!content.includes('### Explicación Pedagógica')) errors.push("Missing '### Explicación Pedagógica' sections");

    if (!content.includes('## 📊 Metadata de Validación')) {
        errors.push("Missing 'Metadata de Validación' table");
    } else {
        // Check for required rows in the table
        const requiredRows = [
            '| Total Preguntas | 7 |',
            '| Original (Dificultad 3) | 1 |',
            '| Fácil (Dificultad 1-2) | 2 |',
            '| Media (Dificultad 3) | 2 |',
            '| Difícil (Dificultad 4-5) | 2 |'
        ];
        requiredRows.forEach(row => {
            if (!content.includes(row)) {
                errors.push(`Missing or incorrect metadata row: '${row}'`);
            }
        });
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
