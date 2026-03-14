
const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, '../saberparatodos/src/content/questions/colombia/ingles/grado-3');

const DISTRIBUTION_PLAN = {
    'colors': 2,
    'family': 3,
    'animals': 4
};

function processDirectory(dir) {
    if (!fs.existsSync(dir)) {
        console.error(`Directory not found: ${dir}`);
        return;
    }

    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            if (DISTRIBUTION_PLAN[item.name]) {
                console.log(`Processing topic: ${item.name} -> Period ${DISTRIBUTION_PLAN[item.name]}`);
                updateFilesInDir(fullPath, DISTRIBUTION_PLAN[item.name]);
            } else {
                console.log(`Skipping topic: ${item.name} (No change planned)`);
            }
        }
    }
}

function updateFilesInDir(dir, newPeriod) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        if (file.endsWith('.md')) {
            const filePath = path.join(dir, file);
            updateFileMetadata(filePath, newPeriod);
        }
    }
}

function updateFileMetadata(filePath, newPeriod) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to find "periodo: X" in frontmatter
    const periodRegex = /^periodo:\s*\d+/m;

    if (periodRegex.test(content)) {
        const newContent = content.replace(periodRegex, `periodo: ${newPeriod}`);
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ Updated ${path.basename(filePath)} to period ${newPeriod}`);
        } else {
            console.log(`⏭️ Skipped ${path.basename(filePath)} (Already correct)`);
        }
    } else {
        console.warn(`⚠️ "periodo" field not found in ${path.basename(filePath)}`);
        // Optionally inject it if missing, but for now just warn
    }
}

console.log('Starting redistribution...');
console.log('Target Directory:', TARGET_DIR);
processDirectory(TARGET_DIR);
console.log('Redistribution complete.');
