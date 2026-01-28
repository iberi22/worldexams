
const fs = require('fs');
const path = require('path');

const contentDir = 'e:/scripts-python/worldexams/saberparatodos/src/content/questions/colombia';

function getThemes(dir) {
    let themes = new Set();

    function walk(directory) {
        const files = fs.readdirSync(directory);
        for (const file of files) {
            const fullPath = path.join(directory, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                walk(fullPath);
            } else if (file.endsWith('.md')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                const match = content.match(/^tema:\s*["']?([^"'\n]+)["']?/m);
                if (match) {
                    themes.add(match[1].trim());
                }
            }
        }
    }

    walk(dir);
    return Array.from(themes).sort();
}

console.log(JSON.stringify(getThemes(contentDir), null, 2));
