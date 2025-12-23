
const fs = require('fs');
const path = require('path');

// Mock content of the problematic file
const filePath = path.join(__dirname, '../src/content/questions/colombia/ingles/grado-11/CO-ING-11-part6-inference-001-bundle.md');
const rawFile = fs.readFileSync(filePath, 'utf8');

// Simulate Astro content collection "body" (remove frontmatter)
const parts = rawFile.split('---\n');
// parts[0] is empty (before first ---)
// parts[1] is frontmatter
// parts[2...] is body. If there are more --- separators, we need to be careful.
// Usually Astro provides 'body' as everything after the second ---.
// Let's reconstruct body manually assuming standard frontmatter.

let body = '';
if (rawFile.startsWith('---')) {
    const endFrontmatter = rawFile.indexOf('\n---', 3);
    if (endFrontmatter > -1) {
        body = rawFile.substring(endFrontmatter + 4).trim();
    }
} else {
    body = rawFile;
}

console.log("--- BODY START ---");
console.log(body.substring(0, 500)); // Show beginning of body
console.log("--- BODY END ---");

// --- Parser Logic from questionParser.ts (simplified for Node) ---

function parseBundleQuestions(body) {
  const questions = [];

  // 1. Extract Global Context (Preamble)
  const firstSectionIndex = body.search(/## (?:Pregunta|Question)\s+\d+/i);
  let globalContext = '';

  if (firstSectionIndex > -1) {
    let preamble = body.substring(0, firstSectionIndex).trim();
    console.log("--- EXTRACTED PREAMBLE RAW ---");
    console.log(`[${preamble}]`);
    console.log("------------------------------");

    preamble = preamble.replace(/# === METADATA GLOBAL ===/i, '');
    preamble = preamble.replace(/^---+$/gm, '');
    preamble = preamble.trim();

    if (preamble.length > 0) {
      globalContext = preamble;
    }
  } else {
      console.log("!!! No '## Pregunta' section found matching regex !!!");
  }

  console.log("--- FINAL GLOBAL CONTEXT ---");
  console.log(`[${globalContext}]`);
  console.log("----------------------------");

  const sectionRegex = /## (?:Pregunta|Question)\s+(\d+)\s*\(([^)]+)\)[\s\S]*?(?=## (?:Pregunta|Question)\s+\d+|## 📊|---\s*$|$)/gi;

  let match;
  while ((match = sectionRegex.exec(body)) !== null) {
      const qTextBase = match[0];
      // simplistic extraction just to verify context appending
      let qText = "QUESTION_TEXT_FOUND"; // Placeholder

      if (globalContext) {
          qText = `${globalContext}\n\n---\n\n${qText}`;
      }

      console.log(`Question ${match[1]} Text Preview:`);
      console.log(qText.substring(0, 100).replace(/\n/g, '\\n'));
      break; // Just check the first one
  }
}

parseBundleQuestions(body);
