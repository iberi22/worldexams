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

    // 3. Check Structure
    const questionRegex = /## Pregunta \d+ \(/g;
    const matchCount = (content.match(questionRegex) || []).length;
    if (matchCount !== 7) {
        errors.push(`Expected 7 questions, found ${matchCount}`);
    }

    if (!content.includes('## 📊 Metadata de Validación')) {
        errors.push("Missing 'Metadata de Validación' table");
    }

    return errors;
}

function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    let hasErrors = false;

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else if (file.endsWith('.md')) {
            // ONLY check bundle files (ignore stray .md if any, though protocol says all should be bundles)
            // Actually, we fail if a non-bundle .md exists in these folders
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
                console.log(`✅ PASS: ${file}`);
            }
        }
    });

    if (hasErrors) {
        process.exit(1);
    }
}

console.log("🔍 Starting Protocol V2.1 Verification...");
scanDir(QUESTIONS_DIR);
console.log("✨ Verification Complete.");
