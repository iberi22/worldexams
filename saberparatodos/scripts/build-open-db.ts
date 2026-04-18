import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter'; // npm run build might need this or we'll use regex if not available.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const QUESTIONS_DIR = path.join(PROJECT_ROOT, 'questions_data');
const OUT_DIR = path.join(PROJECT_ROOT, '.worldexams', 'open-db');

interface DBIndex {
  updatedAt: string;
  countries: {
    [country: string]: {
      [subject: string]: {
        [grade: string]: number; // count of questions
      }
    }
  }
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function parseMarkdownWalk(dir: string, fileList: string[] = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      parseMarkdownWalk(p, fileList);
    } else if (p.endsWith('.md')) {
      fileList.push(p);
    }
  }
  return fileList;
}

function main() {
  console.log(`Starting Open DB Build...`);
  ensureDir(OUT_DIR);

  const allFiles = parseMarkdownWalk(QUESTIONS_DIR);
  console.log(`Found ${allFiles.length} markdown files in questions_data.`);

  const index: DBIndex = {
    updatedAt: new Date().toISOString(),
    countries: {}
  };

  const bundles: Record<string, any[]> = {}; // [country]/[subject]/[grade] -> array of parsed files

  for (const file of allFiles) {
    if (file.toLowerCase().includes('legacy') || file.toLowerCase().includes('readme')) continue;

    try {
      const content = fs.readFileSync(file, 'utf-8');
      const parsed = matter(content);
      
      const relPath = path.relative(QUESTIONS_DIR, file).replace(/\\/g, '/');
      const parts = relPath.split('/');
      // Expected: colombia/matematicas/grado-11/...
      if (parts.length >= 3) {
        const country = parts[0];
        const subject = parts[1];
        const grade = parts[2];
        const filename = parts[parts.length - 1];

        const key = `${country}/${subject}/${grade}`;
        if (!bundles[key]) bundles[key] = [];

        bundles[key].push({
          id: parsed.data.id || filename.replace('.md', ''),
          originalPath: `questions_data/${relPath}`,
          frontmatter: parsed.data,
          content: parsed.content
        });

        if (!index.countries[country]) index.countries[country] = {};
        if (!index.countries[country][subject]) index.countries[country][subject] = {};
        index.countries[country][subject][grade] = (index.countries[country][subject][grade] || 0) + 1;
      }
    } catch (e: any) {
      console.warn(`Failed to parse ${file}: ${e.message}`);
    }
  }

  // Write bundle files
  for (const [key, data] of Object.entries(bundles)) {
    const outPath = path.join(OUT_DIR, `${key}.json`);
    ensureDir(path.dirname(outPath));
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
    console.log(`Wrote ${outPath} (${data.length} items)`);
  }

  // Write index
  const indexPath = path.join(OUT_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log(`Open DB Index written to ${indexPath}`);
}

main();
