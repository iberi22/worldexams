import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const REPO_ROOT = path.join(ROOT, '..');
const QUESTIONS_DIR = path.join(REPO_ROOT, 'questions_data');

const args = process.argv.slice(2);
const strictV3 = args.includes('--strict-v3');
const failOnError = args.includes('--fail-on-error') || strictV3;
const onlyGradeArg = args.find((a) => a.startsWith('--grade='));
const onlyCountryArg = args.find((a) => a.startsWith('--country='));
const onlyScopeArg = args.find((a) => a.startsWith('--scope='));
const onlyGrade = onlyGradeArg ? Number(onlyGradeArg.split('=')[1]) : null;
const onlyCountry = onlyCountryArg ? onlyCountryArg.split('=')[1].toLowerCase() : null;
const onlyScopes = onlyScopeArg
  ? new Set(
      onlyScopeArg
        .split('=')[1]
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean)
    )
  : null;

// Collect target patterns from --only flags and positional arguments
const onlyPatternsRaw = [];
const positionalArgs = [];

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--help' || a === '-h' || a === '--strict-v3' || a === '--fail-on-error') {
    continue;
  }
  if (a.startsWith('--grade=') || a.startsWith('--country=') || a.startsWith('--scope=')) {
    continue;
  }
  if (a === '--only' && args[i + 1] && !args[i + 1].startsWith('--')) {
    onlyPatternsRaw.push(args[i + 1]);
    i++;
  } else if (a.startsWith('--only=')) {
    onlyPatternsRaw.push(a.slice('--only='.length));
  } else if (a.startsWith('--only:')) {
    onlyPatternsRaw.push(a.slice('--only:'.length));
  } else if (!a.startsWith('--')) {
    positionalArgs.push(a);
  }
}

const onlyPatterns = [];
for (const raw of onlyPatternsRaw) {
  for (const part of raw.split(',')) {
    const p = part.trim();
    if (p) onlyPatterns.push(p);
  }
}

const allTargetPatterns = [...onlyPatterns, ...positionalArgs];

function globToRegExp(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        // ** => .*
        re += '.*';
        i++;
        // consume optional slash following **
        if (glob[i + 1] === '/') {
          i++;
        }
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

function matchesPattern(filePath) {
  if (allTargetPatterns.length === 0) return true;

  const normalizedFilePath = filePath.replace(/\\/g, '/');
  const resolvedFilePath = path.resolve(filePath).replace(/\\/g, '/');
  const relCwd = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  const relRepo = path.relative(REPO_ROOT, filePath).replace(/\\/g, '/');
  const relQuestions = path.relative(QUESTIONS_DIR, filePath).replace(/\\/g, '/');
  const relRoot = relative(filePath);
  const fileName = path.basename(filePath);

  const candidates = [
    normalizedFilePath,
    resolvedFilePath,
    relCwd,
    relRepo,
    relQuestions,
    relRoot,
    relRoot.replace(/^\.\.\//, ''),
    fileName
  ];

  for (const patRaw of allTargetPatterns) {
    const pat = patRaw.replace(/\\/g, '/').trim();
    if (!pat) continue;

    // Check 1: Resolve pat relative to process.cwd() on disk
    const resolvedPat = path.resolve(process.cwd(), pat).replace(/\\/g, '/');
    if (resolvedFilePath === resolvedPat) return true;
    if (resolvedFilePath.startsWith(resolvedPat.endsWith('/') ? resolvedPat : resolvedPat + '/')) return true;

    // Check 2: Glob matching if pat contains * or ?
    const isGlob = pat.includes('*') || pat.includes('?');
    if (isGlob) {
      const re = globToRegExp(pat);
      const re2 = globToRegExp('**/' + pat);
      for (const cand of candidates) {
        if (re.test(cand) || re2.test(cand)) return true;
        const candNoPrefix = cand.replace(/^\.\.\//, '');
        if (re.test(candNoPrefix) || re2.test(candNoPrefix)) return true;
      }
    } else {
      // Check 3: Relative path or substring matching
      const patNorm = pat.toLowerCase();
      const patNormClean = patNorm.replace(/^\.\//, '').replace(/^\.\.\//, '');
      for (const cand of candidates) {
        const candLower = cand.toLowerCase();
        if (candLower === patNorm) return true;
        if (candLower.startsWith(patNorm.endsWith('/') ? patNorm : patNorm + '/')) return true;
        if (candLower.includes('/' + patNorm) || candLower.endsWith('/' + patNorm)) return true;
        if (candLower === patNormClean) return true;
        if (candLower.startsWith(patNormClean.endsWith('/') ? patNormClean : patNormClean + '/')) return true;
        if (candLower.includes('/' + patNormClean) || candLower.endsWith('/' + patNormClean)) return true;
      }
    }
  }

  return false;
}

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
      if (fullPath.includes('questions_data_quarantine')) continue;
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
  const headerRegex = /^##\s+(?:Pregunta|Question|Questão)\s+\d+.*$/gim;
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
  return /(^|\n)#\s+(?:Pregunta|Questão)\b/i.test(body);
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

  // Detect ungenerated placeholder text in options block only
  const opcionesMatch = section.match(/###\s+Opciones([\s\S]*?)(?:###\s+Explicaci[oó]n|$)/i);
  if (opcionesMatch) {
    const opcionesBlock = opcionesMatch[1];
    if (/\bOpcion [B-D]\b/i.test(opcionesBlock)) return true;
    if (/\bDistractor [1-3]\b/i.test(opcionesBlock)) return true;
    if (/\bOpcion correcta\b/i.test(opcionesBlock)) return true;
  }
  if (/Pregunta sobre\s+[\w\s-]+- Grado/i.test(section)) return true;

  return false;
}

function shouldSkipByScope(filePath, frontmatter) {
  if (onlyGrade !== null && Number(frontmatter.grado) !== onlyGrade) return true;

  if (onlyScopes) {
    const rel = relative(filePath).toLowerCase();
    const scope = rel.split('/')[2] || '';
    if (!onlyScopes.has(scope)) return true;
  }

  if (onlyCountry) {
    const rel = relative(filePath).toLowerCase();
    const parts = rel.split('/');
    const scope = parts.length >= 3 ? parts[2] : '';
    if (scope !== onlyCountry) return true;
  }

  return false;
}

function normalizeBundlePathForDuplicate(relPath) {
  return relPath
    .toLowerCase()
    .replace(/-v3-bundle\.md$/, '-bundle.md')
    .replace(/\\/g, '/');
}

function isQuarantinedBundle(frontmatter) {
  const quarantine = String(frontmatter.quarantine || '').trim().toLowerCase();
  const bundleStatus = String(frontmatter.bundle_status || '').trim().toLowerCase();
  return quarantine === 'true' || bundleStatus === 'quarantined';
}

function expectedCountForGrade(gradoRaw, filePath) {
  const gradoStr = String(gradoRaw ?? '').trim().toUpperCase();
  if (gradoStr === '3EM') return 20;
  if (String(filePath || '').toLowerCase().includes('/3o-ano/')) return 20;
  const numMatch = String(gradoRaw ?? '').match(/\d+/);
  const numeric = numMatch ? Number(numMatch[0]) : NaN;
  if (Number.isNaN(numeric)) return null;
  if (numeric >= 3 && numeric <= 5) return 8;
  if (numeric >= 6 && numeric <= 7) return 10;
  if (numeric >= 8 && numeric <= 10) return 12;
  if (numeric === 11) return 20;
  return null;
}

const ALLOWED_DIFFICULTY_RANGES = new Set(['D3-D4', 'D5-D6', 'D7-D8', 'D9-D10']);

function getDifficultyFromHeader(section) {
  const firstLine = section.split('\n')[0] || '';
  const m = firstLine.match(/\[([^\]]+)\]/);
  return m ? m[1].trim().replace(/–/g, '-') : null;
}

function validateFile(filePath) {
  if (!matchesPattern(filePath)) return;
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
  if (isQuarantinedBundle(data)) return;

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
  const protocolVersion = String(data.protocol_version || data.bundle_version || '').trim();
  const v5 = protocolVersion.startsWith('5') || path.basename(filePath).toLowerCase().includes('mastery-bundle');

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

  if (v5) {
    const isWeekly = data.week || data.semana;
    const requiredV5 = ['country', 'grado', 'asignatura', 'tema', 'bundle_index'];
    if (isWeekly) {
      requiredV5.push(data.week ? 'week' : 'semana');
    } else {
      requiredV5.push('periodo');
    }

    for (const key of requiredV5) {
      if (data[key] === undefined || data[key] === null || String(data[key]).trim() === '') {
        addFinding('error', relFile, `Bundle v5 sin frontmatter obligatorio: "${key}"`);
      }
    }

    if (!isWeekly && ![1, 2, 3, 4].includes(Number(data.periodo))) {
      addFinding('error', relFile, 'Bundle v5 sin "periodo" válido (1-4).');
    }

    if (!String(data.alignment || '').trim()) {
      addFinding('warning', relFile, 'Bundle v5 sin campo recomendado "alignment".');
    }

    if (data.calibration === undefined) {
      addFinding('warning', relFile, 'Bundle v5 sin bloque recomendado "calibration".');
    }
  }

  // D1: conteos válidos G3-G5=8, G6-G7=10, G8-G10=12, G11/3EM=20 — alineado a AGENTS.md
  const isMastery = v5 || path.basename(filePath).toLowerCase().includes('mastery-bundle');
  if (isMastery || v5) {
    const expectedD1 = expectedCountForGrade(data.grado, filePath);
    if (expectedD1 !== null && inferredQuestionCount !== expectedD1) {
      const msg = `Bundle debe tener ${expectedD1} preguntas para grado ${String(data.grado || '').trim()} (detectadas=${inferredQuestionCount}) — D1: G3-G5=8, G6-G7=10, G8-G10=12, G11/3EM=20`;
      addFinding('error', relFile, msg);
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

      if (/^##\s+Question\b/.test(section.split('\n')[0]?.trim() || '')) {
        if (!/\*\*Expected_Success:\*\*\s*0\.\d+/.test(section)) {
          addFinding('error', relFile, 'missing Expected_Success');
        }
      }

      // D1: dificultad SIEMPRE en rango [D3-D4]|[D5-D6]|[D7-D8]|[D9-D10]; warning si [D#] suelto
      if (isMastery || v5) {
        const difficulty = getDifficultyFromHeader(section);
        if (!difficulty) {
          addFinding('warning', relFile, `Pregunta #${sectionNum} sin marcador de dificultad [D3-D4]|[D5-D6]|[D7-D8]|[D9-D10] en encabezado.`);
        } else if (!ALLOWED_DIFFICULTY_RANGES.has(difficulty)) {
          if (/^D\d+$/.test(difficulty)) {
            addFinding('warning', relFile, `Pregunta #${sectionNum} con dificultad individual [${difficulty}] — debe ser rango [D3-D4]|[D5-D6]|[D7-D8]|[D9-D10].`);
          } else {
            addFinding('warning', relFile, `Pregunta #${sectionNum} con dificultad [${difficulty}] no válida — debe ser [D3-D4]|[D5-D6]|[D7-D8]|[D9-D10].`);
          }
        }
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
  const preFilteredCount = files.length;
  // Mensaje de ayuda si se solicita
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Uso: node scripts/validate_content.js [opciones]

Opciones:
  --strict-v3            Activa modo estricto v3
  --fail-on-error        Falla si hay errores
  --grade=<n>            Filtra por grado
  --country=<code>       Filtra por país (scope folder)
  --scope=<a,b>          Filtra por scope(s)
  --only <ruta|prefijo>  Filtra por ruta/prefijo/glob (repetible, coma-separado)
                         Ej: --only questions_data/colombia
                             --only questions_data/colombia --only questions_data/mexico
                             --only "questions_data/colombia/**"
                             --only questions_data/brasil/matematica/3o-ano/2026/weekly/*.md
`);
  }

  const filesToValidate = files.filter((f) => matchesPattern(f));

  for (const file of filesToValidate) {
    validateFile(file);
  }

  const errors = findings.filter((f) => f.level === 'error');
  const warnings = findings.filter((f) => f.level === 'warning');

  console.log('\n🧪 Content Validation Report');
  console.log(`- Archivos descubiertos: ${preFilteredCount}`);
  console.log(`- Archivos analizados: ${filesToValidate.length}`);
  if (onlyPatterns.length > 0) console.log(`- Filtro --only: ${onlyPatterns.join(', ')}`);
  if (positionalArgs.length > 0) console.log(`- Filtro posicional: ${positionalArgs.join(', ')}`);
  if (onlyGrade !== null) console.log(`- Filtro grado: ${onlyGrade}`);
  if (onlyCountry) console.log(`- Filtro país: ${onlyCountry}`);
  if (onlyScopes) console.log(`- Filtro scope: ${[...onlyScopes].join(', ')}`);
  console.log(`- Modo estricto v3: ${strictV3 ? 'ON' : 'OFF'}`);
  console.log(`- Fail on error: ${failOnError ? 'ON' : 'OFF'}`);
  console.log(`- Errores: ${errors.length}`);
  console.log(`- Warnings: ${warnings.length}`);

  if (filesToValidate.length === 0) {
    if (preFilteredCount === 0) {
      console.error('\n❌ Error: No se encontraron archivos bundle en questions_data/.');
    } else {
      const activeFilters = [
        ...onlyPatterns.map((p) => `--only ${p}`),
        ...positionalArgs.map((p) => `posicional: ${p}`),
        onlyGrade !== null ? `--grade=${onlyGrade}` : null,
        onlyCountry ? `--country=${onlyCountry}` : null,
        onlyScopes ? `--scope=${[...onlyScopes].join(',')}` : null
      ].filter(Boolean);

      console.error('\n❌ Error: Se especificaron filtros o rutas de archivo pero no se analizó ningún bundle (0 archivos analizados).');
      if (activeFilters.length > 0) {
        console.error(`  Filtros activos: ${activeFilters.join('; ')}`);
      }
      console.error(`  Causa probable: Verifique la ruta relativa o el patrón especificado. Directorio de trabajo actual: ${process.cwd()}`);
    }
    process.exit(1);
  }

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
