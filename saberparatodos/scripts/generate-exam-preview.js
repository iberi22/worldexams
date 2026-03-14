import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const QUESTIONS_DATA = path.join(ROOT, '..', 'questions_data', 'colombia');

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.endsWith('.assets')) continue;
      walk(fullPath, acc);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.md')) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function parseProtocol(frontmatter, filePath) {
  const explicit = String(frontmatter.protocol_version || frontmatter.bundle_version || '').match(/(\d+(?:\.\d+)?)/);
  if (explicit) return Number(explicit[1]);

  const lower = path.basename(filePath).toLowerCase();
  if (lower.includes('-pro-v5') || lower.includes('-v5-bundle')) return 5;
  if (lower.includes('-pro-v4') || lower.includes('-v4-bundle')) return 4;
  if (lower.includes('-v3-bundle')) return 3;
  return null;
}

function parseQuestions(body) {
  const questions = [];
  const headerRegex = /^##\s+(?:Pregunta|Question)\s+\d+.*$/gim;
  let match;
  const matches = [];

  while ((match = headerRegex.exec(body)) !== null) {
    matches.push({ index: match.index, header: match[0] });
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : body.length;
    const section = body.slice(start, end);
    
    const idMatch = section.match(/(?:\*\*ID:\*\*|ID:)\s*(?:`([^`]+)`|"([^"]+)"|([A-Za-z0-9._:-]+))/);
    const id = idMatch ? (idMatch[1] || idMatch[2] || idMatch[3]) : `q-${i}`;

    const diffMatch = matches[i].header.match(/\((?:Nivel|Dificultad):?\s*(\d+)\)/i) || section.match(/(?:Nivel|Dificultad):?\s*(\d+)\)/i) || section.match(/(?:Nivel|Dificultad):?\s*(\d+)/i);
    const difficulty = diffMatch ? Number(diffMatch[1]) : 3;

    const afterHeader = section.slice(matches[i].header.length).trim();
    const optionsStart = afterHeader.search(/^\s*-\s*\[[x ]\]/m);
    const statement = optionsStart !== -1 ? afterHeader.slice(0, optionsStart).trim() : afterHeader;

    const options = [];
    const optionRegex = /^\s*-\s*\[([x ])\]\s*(?:\*\*)?([A-Z])(?:\*\*)?(?:\s*[\)\.\-:]\s*)?(.*)$/gm;
    let optMatch;
    
    while ((optMatch = optionRegex.exec(section)) !== null) {
      const isCorrect = optMatch[1].toLowerCase() === 'x';
      const letter = optMatch[2];
      const text = optMatch[3].trim();
      options.push({ letter, text, isCorrect });
    }

    questions.push({ id, statement, options, difficulty });
  }
  return questions;
}

const allFiles = walk(QUESTIONS_DATA);
const grade11Files = allFiles.filter(f => f.includes('grado-11') && !f.includes('legacy'));

let report = `REPORTE DE EXAMEN GRADO 11 - PREVIEW (PROTOCOL 4+)\n`;
report += `Generado el: ${new Date().toLocaleString()}\n`;
report += `================================================================\n\n`;

const bySubjectAndPeriod = {};

for (const file of grade11Files) {
  try {
    const { data, content } = matter.read(file);
    const protocol = parseProtocol(data, file);
    
    // Filter by Protocol 4+
    if (!protocol || protocol < 4) continue;

    const subject = path.basename(path.dirname(path.dirname(file)));
    const period = data.periodo || 1;
    const questions = parseQuestions(content);

    if (!bySubjectAndPeriod[subject]) bySubjectAndPeriod[subject] = {};
    if (!bySubjectAndPeriod[subject][period]) bySubjectAndPeriod[subject][period] = [];

    questions.forEach(q => {
      bySubjectAndPeriod[subject][period].push({
        ...q,
        protocol,
        file: path.relative(ROOT, file)
      });
    });
  } catch (e) {
    // console.error(`Error processing ${file}: ${e.message}`);
  }
}

for (const [subject, periods] of Object.entries(bySubjectAndPeriod)) {
  report += `ASIGNATURA: ${subject.toUpperCase()}\n`;
  report += `----------------------------------------------------------------\n`;
  
  for (const [period, questions] of Object.entries(periods).sort((a, b) => a[0] - b[0])) {
    report += `### PERIODO ${period} (${questions.length} preguntas)\n\n`;
    
    questions.forEach((q, idx) => {
      report += `${idx + 1}. [ID: ${q.id}] [Diff: ${q.difficulty}] [Protocol: ${q.protocol}]\n`;
      report += `   Enunciado: ${q.statement.slice(0, 150)}${q.statement.length > 150 ? '...' : ''}\n`;
      q.options.forEach(opt => {
        report += `   - [${opt.isCorrect ? 'x' : ' '}] ${opt.letter}: ${opt.text}\n`;
      });
      report += `\n`;
    });
    report += `\n`;
  }
  report += `\n`;
}

const outputPath = path.join(ROOT, 'PREVIEW_EXAMEN_11.txt');
fs.writeFileSync(outputPath, report);
console.log(`Reporte generado en: ${outputPath}`);
