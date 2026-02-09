
const { readFileSync } = require('fs');
const { resolve } = require('path');

// Mock extraction functions from [page].json.ts
function extractSection(markdown, startMarker, endMarker) {
  const startIndex = markdown.indexOf(startMarker);
  if (startIndex === -1) return '';
  const contentStart = startIndex + startMarker.length;
  let endIndex = -1;
  const exactEndIndex = markdown.indexOf(endMarker, contentStart);
  if (exactEndIndex !== -1) endIndex = exactEndIndex;

  return endIndex === -1 ? markdown.substring(contentStart).trim() : markdown.substring(contentStart, endIndex).trim();
}

function parseOptions(optionsText) {
  const lines = optionsText.split('\n').filter(line => line.trim());
  const options = [];
  for (const line of lines) {
    const match = line.match(/^-\s*\[(x| )\]\s*([A-D])\)\s*(.+)$/i);
    if (match) {
      options.push({
        letter: match[2].toUpperCase(),
        text: match[3].trim(),
        is_correct: match[1].toLowerCase() === 'x'
      });
    }
  }
  return options;
}

// Read the file
const path = 'saberparatodos/src/content/questions/ingles/grado-03/numbers-20/CO-ENG-03-numbers-20-106-bundle.md';
try {
    const content = readFileSync(path, 'utf-8');

    // Parse Standard Bundle logic (simplified)
    const sections = content.split(/(?=## Question \d+)/);
    // Note: The file uses `## Question 1 (Vocabulary)` format

    console.log(`Found ${sections.length - 1} questions`);

    for (const section of sections) {
        if (!section.startsWith('## Question')) continue;

        const questionText = extractSection(section, '### Enunciado', '### Opciones');
        const optionsText = extractSection(section, '### Opciones', '### Explicación');

        // Only check Q1
        if (section.includes('Question 1')) {
            console.log('--- Question 1 ---');
            console.log('Text:', questionText);
            const options = parseOptions(optionsText);
            console.log('Options:', JSON.stringify(options, null, 2));

            const correct = options.find(o => o.is_correct);
            console.log('CORRECT OPTION:', correct ? correct.letter : 'NONE');
        }
    }
} catch (e) {
    console.error(e);
}
