
const { readFileSync } = require('fs');
const { resolve } = require('path');

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
  console.log(`Debug: Parsing ${lines.length} lines`);
  for (const line of lines) {
    console.log(`Debug: Line: [${line}]`);
    const match = line.match(/^-\s*\[(x| )\]\s*([A-D])\)\s*(.+)$/i);
    if (match) {
      console.log(`Debug: Matched ${match[2]}`);
      options.push({
        letter: match[2].toUpperCase(),
        text: match[3].trim(),
        is_correct: match[1].toLowerCase() === 'x'
      });
    } else {
        console.log(`Debug: NO MATCH`);
    }
  }
  return options;
}

const path = 'saberparatodos/src/content/questions/ingles/grado-03/numbers-20/CO-ENG-03-numbers-20-106-bundle.md';
try {
    const content = readFileSync(path, 'utf-8');
    const sections = content.split(/(?=## Question \d+)/);

    for (const section of sections) {
        if (!section.startsWith('## Question')) continue;

        if (section.includes('Question 1')) {
            console.log('--- Question 1 ---');
            const optionsText = extractSection(section, '### Opciones', '### Explicación');
            console.log('--- RAW OPTIONS TEXT ---');
            console.log(optionsText);
            console.log('------------------------');
            parseOptions(optionsText);
        }
    }
} catch (e) {
    console.error(e);
}
