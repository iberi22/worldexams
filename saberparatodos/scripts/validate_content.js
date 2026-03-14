import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const QUESTIONS_DIR = path.join(ROOT, '..', 'questions_data');

const args = process.argv.slice(2);
const strictV3 = args.includes('--strict-v3');
const failOnError = args.includes('--fail-on-error') || strictV3;
const onlyGradeArg = args.find((a) => a.startsWith('--grade='));
const onlyCountryArg = args.find((a) => a.startsWith('--country='));
const onlyGrade = onlyGradeArg ? Number(onlyGradeArg.split('=')[1]) : null;
const onlyCountry = onlyCountryArg ? onlyCountryArg.split('=')[1].toLowerCase() : null;

const findings = [];
const questionIdSeen = new Map();

function addFinding(level, file, message) {
  findings.push({ level, file, message });
}

function walkMarkdownFiles(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.endsWith('.assets')) continue;
      walkMarkdownFiles(fullPath, acc);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      if (entry.name.toLowerCase() === 'readme.md') continue;
      acc.push(fullPath);
    }
  }
  return acc;
}

function relative(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function isV3Bundle(frontmatter, filePath) {
  const bundleVersion = String(frontmatter.bundle_version || '').trim();
  const protocolVersion = String(frontmatter.protocol_version || '').trim();
  const filename = path.basename(filePath).toLowerCase();

  return (
    bundleVersion.startsWith('3') ||
    protocolVersion.startsWith('3') ||
    filename.includes('-v3-bundle')
  );
}

function isV4Bundle(frontmatter, filePath) {
  const bundleVersion = String(frontmatter.bundle_version || '').trim();
  const protocolVersion = String(frontmatter.protocol_version || '').trim();
  const filename = path.basename(filePath).toLowerCase();

  return (
    bundleVersion.startsWith('4') ||
    protocolVersion.startsWith('4') ||
    filename.includes('-v4-bundle') ||
    filename.includes('-pro-v4')
  );
}

function getQuestionSections(body) {
  const sections = [];
  const headerRegex = /^##\s+(?:Pregunta|Question)\s+\d+.*$/gim;
  const matches = [];
  let m;

  while ((m = headerRegex.exec(body)) !== null) {
    matches.push({ index: m.index });
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : body.length;
    sections.push(body.slice(start, end));
  }

  return sections;
}

function hasLegacySingleQuestion(body) {
  return /(^|\n)#\s+Pregunta\b/i.test(body);
}

function parseQuestionIdsFromSection(section) {
  const ids = [];
  const idRegex = /(?:\*\*ID:\*\*|ID:)\s*(?:`([^`]+)`|"([^"]+)"|([A-Za-z0-9._:-]+))/g;
  let match;
  while ((match = idRegex.exec(section)) !== null) {
    const id = match[1] || match[2] || match[3];
    if (id) ids.push(id);
  }
  return ids;
}

function countOptionsAndCorrect(section) {
  // Accepts:
  // - [x] A
  // - [x] A) text
  // - [x] A. text
  // - [x] **A**: text
  const options = section.match(/^\s*-\s*\[(x|X| )\]\s*(?:\*\*)?[A-Z](?:\*\*)?(?:\s*[\)\.\-:]\s*.*)?$/gm) || [];
  const correct = section.match(/^\s*-\s*\[(x|X)\]\s*(?:\*\*)?[A-Z](?:\*\*)?(?:\s*[\)\.\-:]\s*.*)?$/gm) || [];
  return { options: options.length, correct: correct.length };
}

function isPlaceholderSection(section) {
  const firstLine = section.split('\n')[0]?.trim() || '';
  if (/^(?:Question|Pregunta)\s+\d+\s*-\s*\d+/i.test(firstLine)) return true;
  if (/continued with same format/i.test(section)) return true;
  if (/full bilingual explanations/i.test(section)) return true;
  if (/\[each question has/i.test(section)) return true;
  return false;
}

function shouldSkipByScope(filePath, frontmatter) {
  if (onlyGrade !== null && Number(frontmatter.grado) !== onlyGrade) return true;

  if (onlyCountry) {
    const rel = relative(filePath).toLowerCase();
    // src/content/questions/{country}/...
    const parts = rel.split('/');
    const country = parts.length >= 4 ? parts[3] : '';
    if (country !== onlyCountry) return true;
  }

  return false;
}

function normalizeBundlePathForDuplicate(relPath) {
  return relPath
    .toLowerCase()
    .replace(/-v3-bundle\.md$/, '-bundle.md')
    .replace(/\\/g, '/');
}

function validateFile(filePath) {
  const relFile = relative(filePath);
  const relFileLower = relFile.toLowerCase();
  const strictScopeV3 = strictV3 && relFileLower.includes('src/content/questions/colombia/');
  const strictOutsideScope = strictV3 && !strictScopeV3;
  let parsed;

  try {
    parsed = matter.read(filePath);
  } catch (err) {
    addFinding('error', relFile, `Frontmatter inválido: ${err.message}`);
    return;
  }

  const { data, content } = parsed;

  if (shouldSkipByScope(filePath, data)) return;

  const requiredFrontmatter = ['id', 'grado', 'asignatura', 'tema'];
  for (const key of requiredFrontmatter) {
    if (data[key] === undefined || data[key] === null || String(data[key]).trim() === '') {
      addFinding('error', relFile, `Falta frontmatter obligatorio: "${key}"`);
    }
  }

  const bundleSections = getQuestionSections(content);
  const isLegacy = hasLegacySingleQuestion(content);

  let inferredQuestionCount = 0;
  if (bundleSections.length > 0) {
    inferredQuestionCount = bundleSections.filter((s) => !isPlaceholderSection(s)).length;
  } else if (isLegacy) {
    inferredQuestionCount = 1;
  } else {
    addFinding('error', relFile, 'No se detectaron preguntas (ni formato bundle ni legacy).');
    return;
  }

  const v3 = isV3Bundle(data, filePath);
  const v4 = isV4Bundle(data, filePath);

  if (data.total_questions !== undefined && Number(data.total_questions) !== inferredQuestionCount) {
    const msg = `total_questions=${data.total_questions} no coincide con preguntas detectadas=${inferredQuestionCount}`;
    addFinding(v3 && strictScopeV3 ? 'error' : 'warning', relFile, msg);
  }

  if (v3) {
    const periodo = Number(data.periodo);
    if (![1, 2, 3, 4].includes(periodo)) {
      const msg = 'Bundle v3 sin "periodo" válido (1-4).';
      addFinding(strictScopeV3 ? 'error' : 'warning', relFile, msg);
    }

    if (Number(data.total_questions) !== 10) {
      const msg = `Bundle v3 debe tener total_questions=10 (actual=${data.total_questions ?? 'undefined'})`;
      addFinding(strictScopeV3 ? 'error' : 'warning', relFile, msg);
    }

    if (inferredQuestionCount !== 10) {
      const msg = `Bundle v3 debe contener 10 preguntas (detectadas=${inferredQuestionCount})`;
      addFinding(strictScopeV3 ? 'error' : 'warning', relFile, msg);
    }
  }

  if (bundleSections.length > 0) {
    for (let i = 0; i < bundleSections.length; i++) {
      const section = bundleSections[i];
      const sectionNum = i + 1;
      const isPlaceholder = isPlaceholderSection(section);

      if (isPlaceholder) {
        addFinding('warning', relFile, `Pregunta #${sectionNum} marcada como placeholder; se omite validación estructural.`);
        continue;
      }

      const ids = parseQuestionIdsFromSection(section);
      const currentBundleId = String(data.id || '');
      if (ids.length === 0) {
        addFinding('warning', relFile, `Pregunta #${sectionNum} sin bloque "**ID:** \`...\`".`);
      } else {
        for (const qid of ids) {
          if (!questionIdSeen.has(qid)) {
            questionIdSeen.set(qid, { file: relFile, bundleId: currentBundleId });
          } else if (questionIdSeen.get(qid).file !== relFile) {
            const firstSeen = questionIdSeen.get(qid);
            const first = firstSeen.file;
            const normalizedFirst = normalizeBundlePathForDuplicate(first);
            const normalizedCurrent = normalizeBundlePathForDuplicate(relFile);
            // Ignore transitional duplicates between legacy "-bundle" and "-v3-bundle"
            // or duplicates where bundle_id is the same (same logical bundle migrated).
            if (normalizedFirst !== normalizedCurrent && firstSeen.bundleId !== currentBundleId) {
              addFinding('warning', relFile, `ID de pregunta duplicado en otro archivo: ${qid}`);
            }
          }
        }
      }

      const { options, correct } = countOptionsAndCorrect(section);
      if (options < 2) {
        addFinding(strictOutsideScope ? 'warning' : 'error', relFile, `Pregunta #${sectionNum} tiene menos de 2 opciones.`);
      }
      if (v4) {
        if (correct < 1) {
          addFinding(strictOutsideScope ? 'warning' : 'error', relFile, `Pregunta #${sectionNum} (v4) debe tener al menos 1 opción correcta (actual=${correct}).`);
        }
      } else if (correct !== 1) {
        addFinding(strictOutsideScope ? 'warning' : 'error', relFile, `Pregunta #${sectionNum} debe tener exactamente 1 opción correcta (actual=${correct}).`);
      }
    }
  } else if (isLegacy) {
    const { options, correct } = countOptionsAndCorrect(content);
    if (options < 2) {
      addFinding(strictOutsideScope ? 'warning' : 'error', relFile, 'Formato legacy con menos de 2 opciones.');
    }
    if (!v4 && correct !== 1) {
      addFinding(strictOutsideScope ? 'warning' : 'error', relFile, `Formato legacy debe tener exactamente 1 opción correcta (actual=${correct}).`);
    } else if (v4 && correct < 1) {
      addFinding(strictOutsideScope ? 'warning' : 'error', relFile, `Formato legacy v4 debe tener al menos 1 opción correcta (actual=${correct}).`);
    }
  }
}

function main() {
  if (!fs.existsSync(QUESTIONS_DIR)) {
    console.error(`❌ No existe directorio de preguntas: ${QUESTIONS_DIR}`);
    process.exit(1);
  }

  const files = walkMarkdownFiles(QUESTIONS_DIR);
  for (const file of files) {
    validateFile(file);
  }

  const errors = findings.filter((f) => f.level === 'error');
  const warnings = findings.filter((f) => f.level === 'warning');

  console.log('\n🧪 Content Validation Report');
  console.log(`- Archivos analizados: ${files.length}`);
  if (onlyGrade !== null) console.log(`- Filtro grado: ${onlyGrade}`);
  if (onlyCountry) console.log(`- Filtro país: ${onlyCountry}`);
  console.log(`- Modo estricto v3: ${strictV3 ? 'ON' : 'OFF'}`);
  console.log(`- Fail on error: ${failOnError ? 'ON' : 'OFF'}`);
  console.log(`- Errores: ${errors.length}`);
  console.log(`- Warnings: ${warnings.length}`);

  const orderedFindings = [...errors, ...warnings];
  const top = orderedFindings.slice(0, 80);
  if (top.length > 0) {
    console.log('\nDetalles (máx 80):');
    for (const f of top) {
      const tag = f.level.toUpperCase().padEnd(7);
      console.log(`${tag} ${f.file} -> ${f.message}`);
    }
  } else {
    console.log('\n✅ Sin hallazgos.');
  }

  if (errors.length > 0 && failOnError) {
    process.exit(1);
  }
}

main();
