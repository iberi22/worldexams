import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');

// Recursive function to get all markdown files
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });
  return arrayOfFiles;
}

function migrateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(content);
  let changed = false;

  if (!parsed.data.llm_model) {
    parsed.data.llm_model = "unknown";
    changed = true;
  }
  if (!parsed.data.agent) {
    parsed.data.agent = "legacy";
    changed = true;
  }
  if (!parsed.data.ide) {
    parsed.data.ide = "unknown";
    changed = true;
  }
  if (!parsed.data.source) {
    parsed.data.source = "human-curated";
    changed = true;
  }

  if (changed) {
    // Reconstruct the file content
    // matter.stringify adds quotes around strings often, let's try to keep it clean
    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated: ${path.basename(filePath)}`);
  }
}

function main() {
  console.log("Starting Metadata Migration...");
  if (!fs.existsSync(QUESTIONS_DIR)) {
    console.error(`Directory not found: ${QUESTIONS_DIR}`);
    process.exit(1);
  }

  const files = getAllFiles(QUESTIONS_DIR);
  files.forEach(file => migrateFile(file));
  console.log("Migration Complete.");
}

main();
