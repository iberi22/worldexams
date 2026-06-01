import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const QUESTIONS_DATA_ROOT = path.join(ROOT, '..', 'questions_data');
const OUTPUT_DIR = path.join(ROOT, 'public', 'api', 'packs');
const PACK_ID = 'week-1'; // Default pack ID

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

function hasDuplicatedPeriodSegment(filePath) {
  const normalized = filePath.split(path.sep).join('/');
  return /\/periodo-\d+\/periodo-\d+\//i.test(normalized);
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
    const diffMatch = matches[i].header.match(/\((?:Nivel|Dificultad):?\s*(\d+)\)/i) ||
                       section.match(/(?:Nivel|Dificultad):?\s*(\d+)/i) ||
                       matches[i].header.match(/\[D(\d+)-D(\d+)\]/) ||
                       section.match(/\[D(\d+)-D(\d+)\]/);

    let difficulty = 3;
    if (diffMatch) {
      // If it's a range like [D5-D6], use the second number
      difficulty = diffMatch[2] ? Number(diffMatch[2]) : Number(diffMatch[1]);
    }

    // Extract statement (everything between header and options)
    const afterHeader = section.slice(matches[i].header.length).trim();
    const optionsStart = afterHeader.search(/^\s*-\s*\[[x ]\]/m);
    let rawStatement = optionsStart !== -1 ? afterHeader.slice(0, optionsStart).trim() : afterHeader;

    // Extract context if present
    const contextMatch = section.match(/###\s*(?:Contexto|Context)([\s\S]*?)(?:###|##|$)/i);
    const context = contextMatch ? contextMatch[1].trim() : '';

    // Extract statement
    let statement = '';
    const enunciadoMatch = section.match(/###\s*(?:Enunciado|Statement|Question)([\s\S]*?)(?:###|##|$)/i);
    if (enunciadoMatch) {
      statement = enunciadoMatch[1].trim();
    } else {
      let cleanedRaw = rawStatement;
      if (contextMatch) {
        cleanedRaw = cleanedRaw.replace(contextMatch[0], '');
      }
      statement = cleanedRaw
        .replace(/(?:\*\*ID:\*\*|ID:)\s*(?:`[^`]+`|"[^"]+"|[A-Za-z0-9._:-]+)/g, '')
        .replace(/\*\*Bloom:\*\*.*$/gm, '')
        .replace(/\*\*ICFES:\*\*.*$/gm, '')
        .replace(/\*\*Expected_Success:\*\*.*$/gm, '')
        .replace(/^\s*###\s+Contexto/gm, '')
        .replace(/^\s*###\s+Enunciado/gm, '')
        .replace(/^\s*\*\*\d+\.\*\*/gm, '') // Remove **1.** style numbering
        .trim();
    }

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
      context,
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

const walk = (dir) => {
  let results = [];
  if (!fs.existsSync(dir)) return [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
};

const allFiles = walk(QUESTIONS_DATA_ROOT);
const packs = {};

for (const file of allFiles) {
  try {
    if (hasDuplicatedPeriodSegment(file) || file.includes('/legacy/')) {
      continue;
    }

    const { data, content } = matter.read(file);
    const protocol = parseProtocol(data, file);
    if (!protocol || protocol < 3) continue;

    const questions = parseQuestions(content);
    if (questions.length === 0) continue;

    const relPath = path.relative(QUESTIONS_DATA_ROOT, file);
    const parts = relPath.split(path.sep);
    const countryFolder = parts[0];

    const grade = parseInt(data.grado || file.match(/grado-(\d+)/)?.[1] || '11');
    let subject = data.asignatura || data.subject;

    if (!subject) {
      if (parts[1] && parts[1].startsWith('grado-')) {
        subject = countryFolder;
      } else {
        subject = parts[1] || countryFolder;
      }
    }

    const period = data.periodo || 1;

    // Normalize country code
    let rawCountry = (data.country || countryFolder).toLowerCase();
    let countryCode = rawCountry;
    const countryMap = {
      'colombia': 'co',
      'mexico': 'mx',
      'peru': 'pe',
      'chile': 'cl',
      'ecuador': 'ec',
      'argentina': 'ar',
      'brasil': 'br',
      'global': ''
    };
    if (countryMap[countryCode] !== undefined) {
      countryCode = countryMap[countryCode];
    }

    const cleanSubject = String(subject || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');

    const isEnglish = cleanSubject === 'ingles' || cleanSubject === 'english';
    const safeSubject = isEnglish ? 'ingles' : subject.replace(/[\/\s-]/g, '_').replace(/[^a-zA-Z0-9_]/g, '');

    // Force English (ingles/english) to be global so all countries share the complete pool!
    if (isEnglish) {
      countryCode = '';
    }

    const prefix = countryCode ? `${countryCode}-` : '';
    const packKey = `${prefix}${PACK_ID}-grade-${grade}-subject-${safeSubject}`;

    if (!packs[packKey]) {
      packs[packKey] = {
        metadata: {
          grade,
          subject,
          country: countryCode || 'global',
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
        protocol_version: String(protocol),
        cefr_level: data.cefr_level || null
      });
    });
  } catch (e) {
    console.error(`Error processing ${file}: ${e.message}`);
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
