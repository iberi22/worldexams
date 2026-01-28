
const fs = require('fs');
const path = require('path');

const QUESTIONS_DIR = "src/content/questions";
const OUTPUT_FILE = "REVIEW_ALL_QUESTIONS.md";

// Function to recursively get all files
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith("-bundle.md")) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

function parseBundle(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const questions = [];

    // Split by level 2 headers (## Pregunta X)
    const sections = content.split(/^## Pregunta /gm);

    // Helper to extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const meta = {};
    if (frontmatterMatch) {
         frontmatterMatch[1].split('\n').forEach(line => {
             const [key, val] = line.split(':');
             if (key && val) meta[key.trim()] = val.trim().replace(/"/g, '');
         });
    }

    // Process questions (skip first section which is preamble/Base Question)
    for (let i = 1; i < sections.length; i++) {
        const section = sections[i];

        // Extract Enunciado
        const enunciadoMatch = section.match(/### Enunciado\s*\n\s*([\s\S]*?)\s*\n\s*###/);
        // Extract Options
        const optionsMatch = section.match(/### Opciones\s*\n\s*([\s\S]*?)\s*\n\s*###/);
        // Extract Explanation
        const explanationMatch = section.match(/### Explicación\s*\n\s*([\s\S]*?)\s*\n\s*(\*\*Competencia|\*\*ID)/);

        if (enunciadoMatch && optionsMatch) {
            questions.push({
                file: path.basename(filePath),
                subject: meta.subject || 'Unknown',
                grade: meta.grade || 'Unknown',
                period: meta.periodo || 'Unknown',
                title: meta.title || 'Untitled',
                enunciado: enunciadoMatch[1].trim(),
                options: optionsMatch[1].trim(),
                explanation: explanationMatch ? explanationMatch[1].trim() : "Sin explicación"
            });
        }
    }
    return questions;
}

// MAIN
const allFiles = getAllFiles(QUESTIONS_DIR);
// Sort files by modification time (newest first) to see recent work
allFiles.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);

// Limit to last 100 bundles to avoid massive file overkill if folder grows too big
// User asked for "1000 lines", a bundle is ~10 lines of summary in our output.
const RECENT_FILES = allFiles.slice(0, 50);

let outputMd = `# 📝 REVIEW: Generated Questions Report\n`;
outputMd += `> **Generated:** ${new Date().toLocaleString()}\n`;
outputMd += `> **Files Scanned:** ${RECENT_FILES.length}\n\n`;

console.log(`🔍 Scanning ${RECENT_FILES.length} most recent bundles...`);

RECENT_FILES.forEach(file => {
   try {
       const qs = parseBundle(file);
       outputMd += `## 📦 Bundle: ${path.basename(file)}\n`;
       outputMd += `**Subject:** ${qs[0]?.subject} | **Grade:** ${qs[0]?.grade} | **Period:** ${qs[0]?.period}\n\n`;

       qs.forEach((q, idx) => {
           outputMd += `### Q${idx+1}: ${q.enunciado.substring(0, 100)}...\n`;
           outputMd += `> **Enunciado Complete:**\n${q.enunciado}\n\n`;
           outputMd += `**Opciones:**\n${q.options}\n\n`;
           outputMd += `> 💡 **Explicación:** ${q.explanation}\n\n`;
           outputMd += `---\n`;
       });
   } catch (e) {
       console.error(`Error parsing ${file}: ${e.message}`);
   }
});

fs.writeFileSync(OUTPUT_FILE, outputMd);
console.log(`✅ Review file generated: ${OUTPUT_FILE}`);
console.log(`Total lines: ${outputMd.split('\n').length}`);
