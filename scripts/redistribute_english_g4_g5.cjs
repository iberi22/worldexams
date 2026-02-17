
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '../saberparatodos/src/content/questions/colombia/ingles');

const PLAN = {
    'grado-4': {
        'greetings': 1, 'commands': 1, 'numbers': 1, 'school': 1,
        'body': 2, 'colors': 2, 'feelings': 2,
        'family': 3, 'clothes': 3,
        'animals': 4, 'food': 4
    },
    'grado-5': {
        'routine': 1, 'hobbies': 1,
        'house': 2, 'city': 2, 'transport': 2,
        'jobs': 3, 'health': 3, 'appearance': 3,
        'food': 4, 'weather': 4
    }
};

function processGrade(grade, mapping) {
    const gradeDir = path.join(BASE_DIR, grade);
    if (!fs.existsSync(gradeDir)) {
        console.error(`Directory not found: ${gradeDir}`);
        return;
    }

    console.log(`Processing ${grade}...`);
    const items = fs.readdirSync(gradeDir, { withFileTypes: true });

    for (const item of items) {
        if (!item.isDirectory() && item.name.endsWith('.md')) {
            // Parse topic from filename: CO-ENG-04-[topic]-001-bundle.md
            // OR CO-ENG-05-[topic]-001-bundle.md
            const match = item.name.match(/CO-ENG-\d\d-(.+?)-\d{3}-bundle\.md/);

            if (match) {
                const topic = match[1];
                const period = mapping[topic];

                if (period) {
                    console.log(`  File: ${item.name} -> Topic: ${topic} (P${period})`);

                    // 1. Create Topic Directory
                    const topicDir = path.join(gradeDir, topic);
                    if (!fs.existsSync(topicDir)) {
                        fs.mkdirSync(topicDir);
                        console.log(`    Created directory: ${topicDir}`);
                    }

                    // 2. Move File
                    const oldPath = path.join(gradeDir, item.name);
                    const newPath = path.join(topicDir, item.name);
                    fs.renameSync(oldPath, newPath);
                    console.log(`    Moved to ${topic}/`);

                    // 3. Update Metadata
                    updateFileMetadata(newPath, period);

                } else {
                    console.log(`  Skipping file: ${item.name} (Topic '${topic}' not in plan)`);
                }
            } else {
                console.log(`  Skipping file: ${item.name} (Format mismatch)`);
            }
        } else if (item.isDirectory()) {
            // If already in directory, just check metadata (idempotency)
            const topic = item.name;
            const period = mapping[topic];
            if (period) {
                 updateFilesInDir(path.join(gradeDir, topic), period);
            }
        }
    }
}

function updateFilesInDir(dir, newPeriod) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.md')) {
            updateFileMetadata(path.join(dir, file), newPeriod);
        }
    }
}

function updateFileMetadata(filePath, newPeriod) {
    let content = fs.readFileSync(filePath, 'utf8');
    const periodRegex = /^periodo:\s*\d+/m;

    if (periodRegex.test(content)) {
        const newContent = content.replace(periodRegex, `periodo: ${newPeriod}`);
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`    ✅ Updated metadata to Period ${newPeriod}`);
        }
    }
}

console.log('Starting redistribution (Structure + Metadata) for G4/G5...');
Object.keys(PLAN).forEach(grade => processGrade(grade, PLAN[grade]));
console.log('Done.');
