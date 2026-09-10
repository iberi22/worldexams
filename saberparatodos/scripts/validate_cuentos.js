import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// Root and directory anchoring
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const REPO_ROOT = path.join(ROOT, '..');
const DEFAULT_CUENTOS_DIR = path.join(REPO_ROOT, 'questions_data', 'cuentos');

const EXPECTED_HEADER =
  '<!-- © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. Lectura gratuita, prohibida su reproducción. -->';

// Minimum 21 veto tokens from §2
const VETO_TOKENS = [
  'pesos',
  'dólares',
  'dolares',
  'euros',
  'soles',
  'quetzal',
  'guaraní',
  'guarani',
  'lempira',
  'córdoba',
  'cordoba',
  'balboa',
  'colón',
  'colon',
  'vos',
  'tenés',
  'tenes',
  'hacé',
  'hace',
  'mirá',
  'mira',
  'che',
  'parce',
  'tío',
  'tio',
  'compa',
  'chido',
  'chévere',
  'chevere',
  'bacán',
  'bacan'
];

// Hard constraints forbidden strings (BR-03/BR-07, zero karma, zero telemetry, no Three.js, no paid TTS)
const FORBIDDEN_STRINGS = [
  '$SWAL',
  'karma',
  'telemetry',
  'analytics',
  'three.js',
  'three',
  'elevenlabs',
  'google-cloud-tts',
  'azure-speech',
  'polly'
];

const args = process.argv.slice(2);
const strictMode = args.includes('--strict');
const failOnError = args.includes('--fail-on-error') || strictMode;

// Parse --only <glob>
const onlyPatternsRaw = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--only' && args[i + 1] && !args[i + 1].startsWith('--')) {
    onlyPatternsRaw.push(args[i + 1]);
    i++;
  } else if (a.startsWith('--only=')) {
    onlyPatternsRaw.push(a.slice('--only='.length));
  } else if (a.startsWith('--only:')) {
    onlyPatternsRaw.push(a.slice('--only:'.length));
  }
}
const onlyPatterns = [];
for (const raw of onlyPatternsRaw) {
  for (const part of raw.split(',')) {
    const p = part.trim();
    if (p) onlyPatterns.push(p);
  }
}

// Positional file/dir arguments
const consumedOnlyValues = new Set(
  onlyPatternsRaw.flatMap((raw) => raw.split(',').map((s) => s.trim()).filter(Boolean))
);
const positionalPaths = args.filter(
  (a) => !a.startsWith('--') && !consumedOnlyValues.has(a)
);

function globToRegExp(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        re += '.*';
        i++;
        if (glob[i + 1] === '/') i++;
      } else {
        re += '[^/]*';
      }
    } else if (c === '?') {
      re += '[^/]';
    } else if ('.+^${}()|[]\\'.includes(c)) {
      re += '\\' + c;
    } else {
      re += c;
    }
  }
  return new RegExp('^' + re + '$', 'i');
}

function matchesOnlyFilter(filePath) {
  if (onlyPatterns.length === 0) return true;
  const relRepo = path.relative(REPO_ROOT, filePath).replace(/\\/g, '/');
  const filename = path.basename(filePath);

  for (const patRaw of onlyPatterns) {
    const pat = patRaw.replace(/\\/g, '/').replace(/^\.\//, '').trim();
    const isGlob = pat.includes('*') || pat.includes('?');
    if (isGlob) {
      const re = globToRegExp(pat);
      const re2 = globToRegExp('**/' + pat);
      if (re.test(relRepo) || re2.test(relRepo)) return true;
    } else {
      const patNorm = pat.toLowerCase();
      const relLower = relRepo.toLowerCase();
      if (relLower === patNorm || relLower.includes(patNorm) || filename.toLowerCase().includes(patNorm)) {
        return true;
      }
    }
  }
  return false;
}

const findings = [];

function addFinding(level, file, rule, message) {
  findings.push({ level, file, rule, message });
}

function relativeToRepo(filePath) {
  return path.relative(REPO_ROOT, filePath).replace(/\\/g, '/');
}

function findCuentoFiles() {
  const fileList = [];

  if (positionalPaths.length > 0) {
    for (const p of positionalPaths) {
      const full = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
      if (fs.existsSync(full)) {
        const stat = fs.statSync(full);
        if (stat.isFile() && full.endsWith('.md')) {
          fileList.push(full);
        } else if (stat.isDirectory()) {
          walkCuentoDir(full, fileList);
        }
      }
    }
    return fileList;
  }

  if (fs.existsSync(DEFAULT_CUENTOS_DIR)) {
    walkCuentoDir(DEFAULT_CUENTOS_DIR, fileList);
  }
  return fileList;
}

function walkCuentoDir(dir, acc) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkCuentoDir(full, acc);
    } else if (entry.isFile() && entry.name.toLowerCase() === 'cuento.md') {
      acc.push(full);
    }
  }
}

function countWords(text) {
  const cleaned = text
    .replace(/!\[alt:[^\]]*\]\([^\)]*\)/g, '') // strip images
    .replace(/<!--[\s\S]*?-->/g, '') // strip HTML comments
    .replace(/^#+.*$/gm, '') // strip markdown headings
    .trim();

  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

function checkVetoWords(text, relFile, sectionName) {
  for (const token of VETO_TOKENS) {
    // Whole-word case-insensitive matching with unicode word boundary support
    const regex = new RegExp(`(?:^|[^a-záéíóúñA-ZÁÉÍÓÚÑ])${token}(?:$|[^a-záéíóúñA-ZÁÉÍÓÚÑ])`, 'i');
    if (regex.test(text)) {
      addFinding(
        'ERROR',
        relFile,
        'CUENTO-E-VETO-WORD',
        `Palabra no neutra / vetada "${token}" detectada en ${sectionName} (§2).`
      );
    }
  }
}

function checkForbiddenRefs(rawContent, relFile) {
  const lower = rawContent.toLowerCase();
  for (const forbidden of FORBIDDEN_STRINGS) {
    if (lower.includes(forbidden.toLowerCase())) {
      addFinding(
        'ERROR',
        relFile,
        'CUENTO-E-FORBIDDEN-REF',
        `Referencia prohibida "${forbidden}" detectada en el contenido (Hard constraint / BR-03 / BR-07).`
      );
    }
  }
}

export function validateCuentoFile(filePath) {
  if (!matchesOnlyFilter(filePath)) return;
  const relFile = relativeToRepo(filePath);
  const cuentoDir = path.dirname(filePath);

  let rawContent;
  try {
    rawContent = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    addFinding('ERROR', relFile, 'CUENTO-E-READ', `No se pudo leer el archivo: ${err.message}`);
    return;
  }

  // Hard constraints check
  checkForbiddenRefs(rawContent, relFile);

  // 1. Line 1 HTML Copyright Header (§1, §3)
  const lines = rawContent.split(/\r?\n/);
  const line1 = (lines[0] || '').trim();
  if (line1 !== EXPECTED_HEADER) {
    addFinding(
      'ERROR',
      relFile,
      'CUENTO-E-HEADER',
      `Primera línea debe contener el header legal exacto (§1, §3): "${EXPECTED_HEADER}"`
    );
  }

  // 2. YAML Frontmatter (§1, §3)
  // Strip leading HTML header comment if present so gray-matter can parse starting at '---'
  const contentForMatter = rawContent.replace(/^\s*<!--[\s\S]*?-->\s*/, '');
  let parsed;
  try {
    parsed = matter(contentForMatter);
  } catch (err) {
    addFinding('ERROR', relFile, 'CUENTO-E-FRONTMATTER', `Frontmatter YAML inválido (§3): ${err.message}`);
    return;
  }

  const { data, content } = parsed;

  // Check required frontmatter fields (§3)
  const requiredFields = [
    'slug',
    'titulo',
    'edad',
    'idioma',
    'eje',
    'habitat',
    'valor',
    'personajes',
    'paginas',
    'license',
    'version'
  ];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || String(data[field]).trim() === '') {
      addFinding('ERROR', relFile, 'CUENTO-E-FIELDS', `Falta campo obligatorio en frontmatter: "${field}" (§3)`);
    }
  }

  if (data.license !== 'PROPRIETARY-FREE-READ') {
    addFinding(
      'ERROR',
      relFile,
      'CUENTO-E-LICENSE',
      `Frontmatter license debe ser "PROPRIETARY-FREE-READ" (actual="${data.license}") (§1, §3)`
    );
  }

  if (Number(data.version) !== 1) {
    addFinding(
      'ERROR',
      relFile,
      'CUENTO-E-VERSION',
      `Frontmatter version debe ser 1 (actual="${data.version}") (§3)`
    );
  }

  // 3. Split content into Pages and Quiz (§3)
  const quizSplit = content.split(/^##\s+Quiz\b/m);
  const storyBody = quizSplit[0] || '';
  const quizBody = quizSplit[1] || null;

  // Extract pages
  const pageRegex = /^##\s+Pagina\s+(\d+)\s*$/gm;
  const pageMatches = [];
  let pm;
  while ((pm = pageRegex.exec(storyBody)) !== null) {
    pageMatches.push({ pageNum: Number(pm[1]), index: pm.index });
  }

  const realPageCount = pageMatches.length;

  // Verify page count matching frontmatter (§3)
  if (data.paginas !== undefined && Number(data.paginas) !== realPageCount) {
    addFinding(
      'ERROR',
      relFile,
      'CUENTO-E-PAGINAS-MISMATCH',
      `Campo paginas (${data.paginas}) no coincide con el total de "## Pagina" encontradas (${realPageCount}) (§3)`
    );
  }

  // Verify page count range 8-10 (§3)
  if (realPageCount < 8 || realPageCount > 10) {
    addFinding(
      'ERROR',
      relFile,
      'CUENTO-E-PAGE-COUNT',
      `El cuento debe tener entre 8 y 10 páginas (detectadas=${realPageCount}) (§3)`
    );
  }

  // Inspect each page content (§3)
  for (let i = 0; i < pageMatches.length; i++) {
    const pageNum = pageMatches[i].pageNum;
    const start = pageMatches[i].index;
    const end = i + 1 < pageMatches.length ? pageMatches[i + 1].index : storyBody.length;
    const pageContent = storyBody.slice(start, end);

    // Check image ![alt: ...](path) (§3)
    const imgMatches = [...pageContent.matchAll(/!\[alt:\s*([^\]]+)\]\(([^\)]+)\)/g)];
    if (imgMatches.length !== 1) {
      addFinding(
        'ERROR',
        relFile,
        'CUENTO-E-PAGE-IMAGE',
        `Página ${pageNum} debe contener exactamente una imagen con sintaxis "![alt: ...](path)" (§3)`
      );
    } else {
      const altText = imgMatches[0][1].trim();
      const imgPath = imgMatches[0][2].trim();

      if (!altText) {
        addFinding('ERROR', relFile, 'CUENTO-E-PAGE-IMAGE', `Página ${pageNum} tiene texto alt vacío (§3)`);
      }

      // Missing scene file -> WARN only (§3, C3/C4 own scene creation)
      const fullImgPath = path.resolve(cuentoDir, imgPath);
      if (!fs.existsSync(fullImgPath)) {
        addFinding(
          'WARN',
          relFile,
          'CUENTO-W-MISSING-SCENE',
          `Página ${pageNum}: archivo de escena no encontrado en disco ("${imgPath}") (§3).`
        );
      }
    }

    // Check word count 30-80 (§3)
    const wc = countWords(pageContent);
    if (wc < 30 || wc > 80) {
      addFinding(
        'ERROR',
        relFile,
        'CUENTO-E-PAGE-WORDCOUNT',
        `Página ${pageNum} tiene ${wc} palabras (debe tener entre 30 y 80 palabras) (§3)`
      );
    }

    // Neutral Spanish veto scan in page text (§2)
    checkVetoWords(pageContent, relFile, `Página ${pageNum}`);
  }

  // 4. Quiz Validation (§3)
  if (!quizBody) {
    addFinding('ERROR', relFile, 'CUENTO-E-QUIZ-COUNT', `Sección "## Quiz" ausente o vacía (§3)`);
    return;
  }

  checkVetoWords(quizBody, relFile, 'Quiz');

  const questionRegex = /^###\s+Pregunta\s+(\d+)\s*$/gm;
  const qMatches = [];
  let qm;
  while ((qm = questionRegex.exec(quizBody)) !== null) {
    qMatches.push({ qNum: Number(qm[1]), index: qm.index });
  }

  if (qMatches.length !== 3) {
    addFinding(
      'ERROR',
      relFile,
      'CUENTO-E-QUIZ-COUNT',
      `El quiz debe contener exactamente 3 preguntas (detectadas=${qMatches.length}) (§3)`
    );
  }

  // Check Explicacion header (§3)
  const explicacionMatch = quizBody.match(/^###\s+Explicacion\b/m);
  if (!explicacionMatch) {
    addFinding('ERROR', relFile, 'CUENTO-E-QUIZ-EXPLICACION', `Falta encabezado "### Explicacion" en el Quiz (§3)`);
  } else {
    const expText = quizBody.slice(explicacionMatch.index).replace(/^###\s+Explicacion\b/m, '').trim();
    if (!expText) {
      addFinding('ERROR', relFile, 'CUENTO-E-QUIZ-EXPLICACION', `Sección "### Explicacion" está vacía (§3)`);
    }
  }

  // Inspect each question (§3)
  for (let i = 0; i < qMatches.length; i++) {
    const qNum = qMatches[i].qNum;
    const start = qMatches[i].index;

    // Find end of question section (either next Pregunta or Explicacion)
    let end = quizBody.length;
    if (i + 1 < qMatches.length) {
      end = qMatches[i + 1].index;
    } else if (explicacionMatch && explicacionMatch.index > start) {
      end = explicacionMatch.index;
    }

    const qContent = quizBody.slice(start, end);

    // Option lines: - [x] A) or - [ ] B)
    const optionLines = [...qContent.matchAll(/^\s*-\s*\[([ xX])\]\s*([A-C])\)\s*(.+)$/gm)];
    if (optionLines.length !== 3) {
      addFinding(
        'ERROR',
        relFile,
        'CUENTO-E-QUIZ-OPTIONS',
        `Pregunta ${qNum} debe tener exactamente 3 opciones A-C (detectadas=${optionLines.length}) (§3)`
      );
    }

    const correctMatches = optionLines.filter((opt) => opt[1].toLowerCase() === 'x');
    if (correctMatches.length !== 1) {
      addFinding(
        'ERROR',
        relFile,
        'CUENTO-E-QUIZ-CORRECT',
        `Pregunta ${qNum} debe tener exactamente 1 opción marcada con [x] (detectadas=${correctMatches.length}) (§3)`
      );
    }

    // Feedback comment adjacent to options
    const feedbackComments = [...qContent.matchAll(/<!--\s*feedback:\s*([\s\S]*?)\s*-->/g)];
    if (feedbackComments.length !== optionLines.length) {
      addFinding(
        'ERROR',
        relFile,
        'CUENTO-E-QUIZ-FEEDBACK',
        `Pregunta ${qNum}: cada opción debe tener su correspondiente <!-- feedback: ... --> (${feedbackComments.length}/${optionLines.length}) (§3)`
      );
    }
  }
}

function main() {
  const cuentoFiles = findCuentoFiles();

  if (cuentoFiles.length === 0) {
    console.log('ℹ️ No se encontraron archivos cuento.md para validar.');
    process.exit(0);
  }

  for (const file of cuentoFiles) {
    validateCuentoFile(file);
  }

  const errors = findings.filter((f) => f.level === 'ERROR');
  const warnings = findings.filter((f) => f.level === 'WARN');

  console.log('\n📖 Reporte de Validación de Cuentos v1');
  console.log(`- Archivos analizados: ${cuentoFiles.length}`);
  if (onlyPatterns.length > 0) console.log(`- Filtro --only: ${onlyPatterns.join(', ')}`);
  console.log(`- Modo estricto: ${strictMode ? 'ON' : 'OFF'}`);
  console.log(`- Fail on error: ${failOnError ? 'ON' : 'OFF'}`);
  console.log(`- Errores: ${errors.length}`);
  console.log(`- Warnings: ${warnings.length}`);

  if (findings.length > 0) {
    console.log('\nDetalles de hallazgos:');
    for (const f of findings) {
      const tag = f.level.padEnd(5);
      console.log(`[${tag}] ${f.file} -> [${f.rule}] ${f.message}`);
    }
  } else {
    console.log('\n✅ Todos los cuentos validados exitosamente sin hallazgos.');
  }

  const shouldExitFail = errors.length > 0 || (failOnError && warnings.length > 0);
  if (shouldExitFail) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
