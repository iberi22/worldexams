
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

allFiles.forEach(f => {
    if (f.toLowerCase().includes('literature-010')) {
        console.log(`Found file by name: ${f}`);
        const content = fs.readFileSync(f, 'utf-8');
        try {
            const { data: frontmatter } = matter(content);
            console.log(`Frontmatter ID: ${frontmatter.id}`);
            console.log(`Frontmatter Grado: ${frontmatter.grado}`);
            console.log(`Frontmatter Asignatura: ${frontmatter.asignatura}`);
        } catch (e) {
            console.error(`Error parsing ${f}: ${e.message}`);
        }
    }
});
