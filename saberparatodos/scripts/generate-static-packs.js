import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const QUESTIONS_DATA = path.join(ROOT, '..', 'questions_data', 'colombia');
const OUTPUT_DIR = path.join(ROOT, 'public', 'api', 'packs');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}


function parseProtocol(frontmatter, filePath) {
  const explicit = String(frontmatter.protocol_version || frontmatter.bundle_version || '').match(/(\d+(?:\.\d+)?)/);
  if (explicit) return Number(explicit[1]);

  const lower = path.basename(filePath).toLowerCase();
  if (lower.includes('-pro-v5') || lower.includes('-v5-bundle')) return 5;
  if (lower.includes('-pro-v4') || lower.includes('-v4-bundle')) return 4;
  if (lower.includes('-v3-bundle')) return 3;
  if (lower.includes('-bundle')) return 2;
  return null;
}

function parseQuestions(body) {
  const sections = [];
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
    
    // Extract ID
    const idMatch = section.match(/(?:\*\*ID:\*\*|ID:)\s*(?:`([^`]+)`|"([^"]+)"|([A-Za-z0-9._:-]+))/);
    const id = idMatch ? (idMatch[1] || idMatch[2] || idMatch[3]) : `q-${i}`;

    // Extract Difficulty from header or body
    const diffMatch = matches[i].header.match(/\((?:Nivel|Dificultad):?\s*(\d+)\)/i) || section.match(/(?:Nivel|Dificultad):?\s*(\d+)/i);
    const difficulty = diffMatch ? Number(diffMatch[1]) : 3;

    // Extract statement (everything between header and options)
    const afterHeader = section.slice(matches[i].header.length).trim();
    const optionsStart = afterHeader.search(/^\s*-\s*\[[x ]\]/m);
    const statement = optionsStart !== -1 ? afterHeader.slice(0, optionsStart).trim() : afterHeader;

    // Extract options
    const options = [];
    const optionRegex = /^\s*-\s*\[([x ])\]\s*(?:\*\*)?([A-Z])(?:\*\*)?(?:\s*[\)\.\-:]\s*)?(.*)$/gm;
    let optMatch;
    let correctId = 'A';
    
    while ((optMatch = optionRegex.exec(section)) !== null) {
      const isCorrect = optMatch[1].toLowerCase() === 'x';
      const letter = optMatch[2];
      const text = optMatch[3].trim();
      options.push({ letter, text, is_correct: isCorrect });
      if (isCorrect) correctId = letter;
    }

    // Extract explanation
    const expMatch = section.match(/###\s*(?:Explicación|Explanation)([\s\S]*?)(?:##|$)/i);
    const explanation = expMatch ? expMatch[1].trim() : '';

    sections.push({
      id,
      statement,
      options,
      correct_answer: correctId,
      explanation,
      difficulty: String(difficulty),
      images: [],
      tags: []
    });
  }

  return sections;
}

const subjects = fs.readdirSync(QUESTIONS_DATA).filter(f => fs.statSync(path.join(QUESTIONS_DATA, f)).isDirectory());

const packs = {};

for (const subject of subjects) {
  const subjectPath = path.join(QUESTIONS_DATA, subject);
  const grades = fs.readdirSync(subjectPath).filter(f => f.startsWith('grado-'));
  
  for (const gradeFolder of grades) {
    const grade = parseInt(gradeFolder.replace('grado-', ''));
    const gradePath = path.join(subjectPath, gradeFolder);
    
    // Walk through all .md files in grade path
    const walk = (dir) => {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
          results = results.concat(walk(file));
        } else if (file.endsWith('.md')) {
          results.push(file);
        }
      });
      return results;
    };

    const files = walk(gradePath);
    
    for (const file of files) {
      try {
        const { data, content } = matter.read(file);
        const protocol = parseProtocol(data, file);
        if (!protocol || protocol < 3) continue;

        const questions = parseQuestions(content);
        if (questions.length === 0) continue;

        const period = data.periodo || 1;
        const packKey = `week-1-grade-${grade}-subject-${subject.replace(/-/g, '_')}`;
        
        if (!packs[packKey]) {
          packs[packKey] = {
            metadata: {
              grade,
              subject,
              pack_id: packKey,
              generated_at: new Date().toISOString()
            },
            questions: []
          };
        }

        questions.forEach(q => {
          packs[packKey].questions.push({
            ...q,
            bundle_id: path.basename(file, '.md'),
            periodo: period,
            protocol_version: String(protocol)
          });
        });
      } catch (e) {
        console.error(`Error processing ${file}: ${e.message}`);
      }
    }
  }
}

// Write packs to disk
for (const [key, data] of Object.entries(packs)) {
  const outputPath = path.join(OUTPUT_DIR, `${key}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`Generated ${outputPath} with ${data.questions.length} questions`);
}

// Generate current.json and metadata.json (minimal versions for compatibility)
fs.writeFileSync(path.join(OUTPUT_DIR, 'current.json'), JSON.stringify({ version: '1.0.0', last_update: new Date().toISOString() }));
fs.writeFileSync(path.join(OUTPUT_DIR, 'metadata.json'), JSON.stringify({ packs: Object.keys(packs) }));

console.log('Static packs generation completed.');
