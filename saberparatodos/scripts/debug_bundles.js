
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = 'e:/scripts-python/worldexams/saberparatodos/src/content/questions';

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else if (file.endsWith('.md')) {
            results.push(file);
        }
    });
    return results;
}

const allFiles = getFiles(CONTENT_DIR);
console.log(`Found ${allFiles.length} files`);

let inglesG11Count = 0;
let targetFound = false;

allFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf-8');
    try {
        const { data: frontmatter } = matter(content);
        if (frontmatter.grado === 11 && (frontmatter.asignatura === 'Inglés' || frontmatter.asignatura === 'ingles')) {
            inglesG11Count++;
            if (frontmatter.id === 'CO-ENG-11-LITERATURE-010') {
                targetFound = true;
                console.log(`Target bundle found: ${f}`);
            }
        }
    } catch (e) {}
});

console.log(`English G11 bundles: ${inglesG11Count}`);
console.log(`Target bundle 'CO-ENG-11-LITERATURE-010' found in search: ${targetFound}`);
