import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const QUESTIONS_ROOT = path.join(ROOT, 'questions_data');
const PACKS_ROOT = path.join(ROOT, 'apps', 'worldexams-api', 'public', 'v1', 'packs');
const TARGET_QUESTIONS = 2000;

const COUNTRIES = [
  { code: 'CO', folder: 'colombia', name: 'Colombia' },
  { code: 'MX', folder: 'mexico', name: 'Mexico' },
  { code: 'AR', folder: 'argentina', name: 'Argentina' },
  { code: 'BR', folder: 'brasil', name: 'Brasil' },
  { code: 'CL', folder: 'chile', name: 'Chile' },
  { code: 'PE', folder: 'peru', name: 'Peru' },
  { code: 'EC', folder: 'ecuador', name: 'Ecuador' },
  { code: 'PA', folder: 'panama', name: 'Panama' },
  { code: 'CR', folder: 'costa-rica', name: 'Costa Rica' },
  { code: 'GT', folder: 'guatemala', name: 'Guatemala' },
  { code: 'DO', folder: 'dominican_republic', name: 'Republica Dominicana' },
  { code: 'SV', folder: 'el-salvador', name: 'El Salvador' },
  { code: 'HN', folder: 'honduras', name: 'Honduras' },
  { code: 'NI', folder: 'nicaragua', name: 'Nicaragua' },
  { code: 'ES', folder: 'spain', name: 'Espana' },
  { code: 'PR', folder: 'puerto-rico', name: 'Puerto Rico' },
  { code: 'GQ', folder: 'guinea-ecuatorial', name: 'Guinea Ecuatorial' },
  { code: 'UY', folder: 'uruguay', name: 'Uruguay' },
  { code: 'PY', folder: 'paraguay', name: 'Paraguay' },
  { code: 'BO', folder: 'bolivia', name: 'Bolivia' },
];

const COUNTRY_BY_CODE = new Map(COUNTRIES.map((country) => [country.code, country]));
const COUNTRY_BY_FOLDER = new Map(COUNTRIES.map((country) => [country.folder, country]));
const COUNTRY_BY_FRONTMATTER = new Map([
  ...COUNTRIES.map((country) => [country.folder, country]),
  ['colombia', COUNTRY_BY_CODE.get('CO')],
  ['mexico', COUNTRY_BY_CODE.get('MX')],
  ['argentina', COUNTRY_BY_CODE.get('AR')],
  ['brasil', COUNTRY_BY_CODE.get('BR')],
  ['brazil', COUNTRY_BY_CODE.get('BR')],
  ['chile', COUNTRY_BY_CODE.get('CL')],
  ['peru', COUNTRY_BY_CODE.get('PE')],
  ['ecuador', COUNTRY_BY_CODE.get('EC')],
  ['panama', COUNTRY_BY_CODE.get('PA')],
  ['costa_rica', COUNTRY_BY_CODE.get('CR')],
  ['costa-rica', COUNTRY_BY_CODE.get('CR')],
  ['guatemala', COUNTRY_BY_CODE.get('GT')],
  ['dominican_republic', COUNTRY_BY_CODE.get('DO')],
  ['republica_dominicana', COUNTRY_BY_CODE.get('DO')],
  ['el_salvador', COUNTRY_BY_CODE.get('SV')],
  ['el-salvador', COUNTRY_BY_CODE.get('SV')],
  ['honduras', COUNTRY_BY_CODE.get('HN')],
  ['nicaragua', COUNTRY_BY_CODE.get('NI')],
  ['spain', COUNTRY_BY_CODE.get('ES')],
  ['espana', COUNTRY_BY_CODE.get('ES')],
  ['puerto_rico', COUNTRY_BY_CODE.get('PR')],
  ['puerto-rico', COUNTRY_BY_CODE.get('PR')],
  ['guinea_ecuatorial', COUNTRY_BY_CODE.get('GQ')],
  ['guinea-ecuatorial', COUNTRY_BY_CODE.get('GQ')],
  ['uruguay', COUNTRY_BY_CODE.get('UY')],
  ['paraguay', COUNTRY_BY_CODE.get('PY')],
  ['bolivia', COUNTRY_BY_CODE.get('BO')],
]);

const QUESTION_COUNTS = new Map([
  [3, 8],
  [4, 8],
  [5, 8],
  [6, 10],
  [7, 10],
  [8, 12],
  [9, 12],
  [10, 12],
  [11, 20],
]);

const args = new Set(process.argv.slice(2));
const outputJson = args.has('--json');
const smokePublic = args.has('--smoke-public');

function walk(dir, predicate, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, predicate, out);
    else if (!predicate || predicate(full)) out.push(full);
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function normalize(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/_+/g, '-');
}

function normalizeSubject(value) {
  return normalize(value).replace(/[^a-z0-9-]/g, '');
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    if (/^\d+$/.test(value)) value = Number(value);
    data[key] = value;
  }
  return data;
}

function questionBlocks(content) {
  const re = /^##\s+(Question|Pregunta)\s+(\d+)\s*\[([^\]]+)\]/gim;
  const matches = [...content.matchAll(re)];
  return matches.map((match, index) => ({
    label: match[1],
    number: Number(match[2]),
    difficulty: match[3],
    text: content.slice(match.index, index + 1 < matches.length ? matches[index + 1].index : content.length),
  }));
}

function optionRows(block) {
  const re = /^- \[[ xX]\]\s*([A-D])\)\s*([\s\S]*?)(?=^- \[[ xX]\]\s*[A-D]\)|^###\s+|^##\s+|(?![\s\S]))/gm;
  return [...block.matchAll(re)].map((match) => {
    const raw = match[2].trim();
    return {
      letter: match[1],
      text: raw
        .replace(/<!-- feedback:[\s\S]*?-->/i, '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' '),
      feedback: (raw.match(/<!-- feedback:\s*([\s\S]*?)\s*-->/i)?.[1] || '').trim(),
    };
  });
}

function expectedQuestionCount(fm) {
  if (String(fm.grado || '').toUpperCase() === '3EM') return 20;
  const grade = Number(String(fm.grado ?? '').match(/\d+/)?.[0]);
  return QUESTION_COUNTS.get(grade);
}

function detectCountry(file, fm) {
  const relativeParts = rel(file).split('/');
  const pathCountry = COUNTRY_BY_FOLDER.get(relativeParts[1]);
  if (pathCountry) return pathCountry;
  return COUNTRY_BY_FRONTMATTER.get(normalize(String(fm?.country || '')).replace(/-/g, '_'));
}

function canonicalPathError(file, fm, country) {
  if (!country) return 'Cannot detect supported country';
  const relative = rel(file);
  const parts = relative.split('/');
  const base = path.basename(file);
  const filenameMatch = base.match(/^([A-Z]{2})-([A-Z]+)-([A-Z0-9]+)-2026-(W\d{2})-[a-z0-9-]+-001-MASTERY-bundle\.md$/);
  if (!filenameMatch) return 'Filename does not match weekly v5.2 canonical pattern';
  const [, fileCountry, , fileGrade] = filenameMatch;
  if (fileCountry !== country.code) return `Filename country ${fileCountry} does not match ${country.code}`;
  if (country.code === 'BR' && fileGrade === '3EM') {
    const expected = ['questions_data', 'brasil', 'matematica', '3o-ano', '2026', 'weekly'];
    if (expected.some((segment, index) => parts[index] !== segment)) {
      return 'BR 3EM bundle is outside canonical brasil/matematica/3o-ano/2026/weekly path';
    }
    return null;
  }

  const grade = Number(String(fm.grado ?? '').match(/\d+/)?.[0]);
  if (!grade) return 'Cannot detect numeric grade for canonical path';
  const expectedPrefix = ['questions_data', country.folder];
  if (parts[0] !== expectedPrefix[0] || parts[1] !== expectedPrefix[1]) {
    return `Bundle is outside questions_data/${country.folder}`;
  }
  if (parts[3] !== `grado-${grade}` || parts[4] !== '2026' || parts[5] !== 'weekly') {
    return `Bundle is outside canonical grado-${grade}/2026/weekly path`;
  }
  const subjectInPath = normalizeSubject(parts[2]);
  const subjectInFrontmatter = normalizeSubject(fm.asignatura || '');
  if (subjectInFrontmatter && subjectInPath !== subjectInFrontmatter) {
    return `Subject path ${parts[2]} does not match frontmatter asignatura ${fm.asignatura}`;
  }
  return null;
}

function validateStrictBundle(file) {
  const errors = [];
  const content = fs.readFileSync(file, 'utf8');
  const base = path.basename(file);
  const fm = parseFrontmatter(content);
  if (!fm) return { valid: false, errors: ['Missing YAML frontmatter'], fm: null, questionCount: 0, country: null };

  const country = detectCountry(file, fm);
  const canonicalError = canonicalPathError(file, fm, country);
  if (canonicalError) errors.push(canonicalError);

  const required = [
    'id',
    'country',
    'grado',
    'asignatura',
    'tema',
    'periodo',
    'week',
    'year',
    'bundle_type',
    'protocol_version',
    'total_questions',
    'bundle_size',
    'alignment',
    'license',
    'tier',
    'creador',
  ];
  for (const key of required) {
    if (fm[key] === undefined || fm[key] === '') errors.push(`Missing frontmatter field: ${key}`);
  }

  if (fm.id && `${fm.id}.md` !== base) errors.push('frontmatter id must match filename without .md');
  if (fm.periodo !== 'weekly') errors.push('periodo must be "weekly"');
  if (fm.bundle_type !== 'weekly') errors.push('bundle_type must be "weekly"');
  if (fm.protocol_version !== '5.2') errors.push('protocol_version must be "5.2"');
  if (fm.year !== 2026) errors.push('year must be 2026');
  if (!/^W\d{2}$/.test(String(fm.week || ''))) errors.push('week must use WNN format');
  if (fm.license !== 'FREE') errors.push('license must be FREE');
  if (fm.tier !== 'legacy') errors.push('tier must be legacy');
  if (fm.creador !== 'Jules-Agent') errors.push('creador must be Jules-Agent');

  const expected = expectedQuestionCount(fm);
  if (!expected) errors.push(`Unsupported grade for question count: ${fm.grado}`);
  if (expected && fm.total_questions !== expected) errors.push(`total_questions must be ${expected}`);
  if (expected && fm.bundle_size !== expected) errors.push(`bundle_size must be ${expected}`);

  if (/<think>|<process>|```yaml|```markdown/i.test(content)) errors.push('AI leakage or markdown fence detected');
  if (/todas las anteriores|ninguna de las anteriores|all of the above|none of the above|a y b son correctas/i.test(content)) {
    errors.push('Forbidden all/none/multiple-combination option detected');
  }

  const questions = questionBlocks(content);
  if (expected && questions.length !== expected) errors.push(`Expected ${expected} questions, found ${questions.length}`);

  questions.forEach((question, index) => {
    const prefix = `Question ${index + 1}`;
    if (question.label !== 'Question') errors.push(`${prefix}: heading must use "Question"`);
    if (question.number !== index + 1) errors.push(`${prefix}: question numbering is not sequential`);
    if (!/^D\d+(?:-D?\d+)?$/.test(question.difficulty)) errors.push(`${prefix}: invalid difficulty label`);
    if (!/\*\*ID:\*\*\s*\S/.test(question.text)) errors.push(`${prefix}: missing ID`);
    if (!/\*\*Bloom:\*\*\s*(Remember|Understand|Apply|Analyze|Evaluate)/.test(question.text)) errors.push(`${prefix}: invalid Bloom`);
    if (!/\*\*(?:ICFES|EJE):\*\*\s*\S/.test(question.text)) errors.push(`${prefix}: missing ICFES/eje field`);
    if (!/\*\*Expected_Success:\*\*\s*0\.\d+/.test(question.text)) errors.push(`${prefix}: missing Expected_Success`);
    if (!/\*\*Contexto:\*\*\s*\S/.test(question.text)) errors.push(`${prefix}: missing Contexto`);
    if (/\*\*Context:\*\*/.test(question.text)) errors.push(`${prefix}: use Contexto, not Context`);
    if (!/###\s+Enunciado/.test(question.text)) errors.push(`${prefix}: missing ### Enunciado`);
    if (!/###\s+Opciones/.test(question.text)) errors.push(`${prefix}: missing ### Opciones`);
    if (!/###\s+Explicaci[oó]n Pedag[oó]gica/.test(question.text)) errors.push(`${prefix}: missing ### Explicacion Pedagogica`);

    const options = optionRows(question.text);
    if (options.length !== 4) errors.push(`${prefix}: expected 4 options, found ${options.length}`);
    const correct = (question.text.match(/^- \[[xX]\]\s*[A-D]\)/gm) || []).length;
    if (correct !== 1) errors.push(`${prefix}: expected exactly one correct option, found ${correct}`);
    if (options.some((option) => !option.feedback)) errors.push(`${prefix}: every option needs feedback`);
    if (new Set(options.map((option) => option.text)).size !== options.length) errors.push(`${prefix}: duplicate option text`);
  });

  return {
    valid: errors.length === 0,
    errors,
    fm,
    questionCount: expected || questions.length,
    country,
  };
}

function rawQuestionCount(content, fm) {
  const declared = Number(fm?.total_questions || fm?.bundle_size || 0);
  if (declared) return declared;
  return questionBlocks(content).length;
}

function createEmptyCountryStats(country) {
  return {
    code: country.code,
    name: country.name,
    raw_files: 0,
    raw_questions: 0,
    validated_bundles: 0,
    validated_questions: 0,
    published_validated_bundles: 0,
    published_validated_questions: 0,
    validated_not_published_questions: 0,
    legacy_or_invalid_files: 0,
    legacy_or_invalid_questions: 0,
    pack_files: 0,
    pack_questions: 0,
    api_smoke_status: 'not-run',
    api_smoke_pack_path: '',
    status: 'missing',
    pct_2000: 0,
    gap_2000: TARGET_QUESTIONS,
  };
}

function classifyStatus(stats) {
  if (stats.published_validated_questions > 0) return 'published_validated';
  if (stats.validated_questions > 0) return 'validated_not_published';
  if (stats.raw_questions > 0 || stats.pack_questions > 0) return 'legacy_or_invalid';
  return 'missing';
}

function readPacks(validBundlesById, statsByCode) {
  const packFiles = walk(PACKS_ROOT, (file) => file.endsWith('.json') && !['current.json', 'metadata.json'].includes(path.basename(file)));
  for (const file of packFiles) {
    const base = path.basename(file, '.json');
    const codeMatch = base.match(/^([a-z]{2})-/);
    const code = codeMatch?.[1]?.toUpperCase();
    const stats = code ? statsByCode.get(code) : null;
    if (!stats) continue;

    let pack;
    try {
      pack = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
      continue;
    }
    const questions = Array.isArray(pack.questions) ? pack.questions : [];
    stats.pack_files += 1;
    stats.pack_questions += questions.length;

    const publishedBundleIds = new Set();
    for (const question of questions) {
      const bundleId = String(question?.bundle_id || '');
      if (!bundleId) continue;
      const bundle = validBundlesById.get(bundleId);
      if (!bundle || bundle.country.code !== code) continue;
      stats.published_validated_questions += 1;
      publishedBundleIds.add(bundleId);
    }
    stats.published_validated_bundles += publishedBundleIds.size;
  }
}

async function smokePublicApi(statsByCode) {
  const subjects = ['matematicas', 'matematica', 'lengua', 'lectura_critica'];
  const grades = [11, 8, 7, 6];

  for (const country of COUNTRIES) {
    const stats = statsByCode.get(country.code);
    for (const grade of grades) {
      let done = false;
      for (const subject of subjects) {
        const url = `https://api.saberparatodos.space/v1/questions?country=${country.code.toLowerCase()}&grade=${grade}&subject=${subject}`;
        try {
          const response = await fetch(url);
          if (!response.ok) continue;
          const body = await response.json();
          const packPath = String(body?.meta?.pack_path || '');
          const usesCountryPack = packPath.startsWith(`/v1/packs/${country.code.toLowerCase()}-`);
          stats.api_smoke_status = usesCountryPack ? 'country-pack' : `fallback:${packPath || 'unknown'}`;
          stats.api_smoke_pack_path = packPath;
          done = true;
          break;
        } catch {
          stats.api_smoke_status = 'error';
        }
      }
      if (done) break;
    }
    if (stats.api_smoke_status === 'not-run') stats.api_smoke_status = 'not-found';
  }
}

function renderTable(rows) {
  const headers = [
    'Pais',
    'Estado',
    'Validas',
    'Publicadas',
    '% 2000',
    'Faltan',
    'Legacy/invalid',
    'Packs',
    'API',
  ];
  const data = rows.map((row) => [
    row.code,
    row.status,
    String(row.validated_questions),
    String(row.published_validated_questions),
    `${row.pct_2000.toFixed(1)}%`,
    String(row.gap_2000),
    String(row.legacy_or_invalid_questions),
    String(row.pack_questions),
    row.api_smoke_status,
  ]);
  const widths = headers.map((header, index) =>
    Math.max(header.length, ...data.map((line) => line[index].length)),
  );
  const format = (line) => line.map((value, index) => value.padEnd(widths[index])).join('  ');
  return [format(headers), format(widths.map((width) => '-'.repeat(width))), ...data.map(format)].join('\n');
}

async function main() {
  const statsByCode = new Map(COUNTRIES.map((country) => [country.code, createEmptyCountryStats(country)]));
  const validBundlesById = new Map();
  const invalidSamples = new Map();

  const bundleFiles = walk(QUESTIONS_ROOT, (file) => file.endsWith('.md'));
  for (const file of bundleFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const fm = parseFrontmatter(content);
    const country = detectCountry(file, fm);
    if (!country) continue;
    const stats = statsByCode.get(country.code);
    stats.raw_files += 1;
    stats.raw_questions += rawQuestionCount(content, fm);

    const result = validateStrictBundle(file);
    if (result.valid) {
      const bundleId = path.basename(file, '.md');
      stats.validated_bundles += 1;
      stats.validated_questions += result.questionCount;
      validBundlesById.set(bundleId, {
        id: bundleId,
        file: rel(file),
        country,
        questionCount: result.questionCount,
      });
    } else {
      stats.legacy_or_invalid_files += 1;
      stats.legacy_or_invalid_questions += rawQuestionCount(content, fm);
      if (!invalidSamples.has(country.code)) {
        invalidSamples.set(country.code, {
          file: rel(file),
          first_errors: result.errors.slice(0, 5),
        });
      }
    }
  }

  readPacks(validBundlesById, statsByCode);

  for (const stats of statsByCode.values()) {
    stats.validated_not_published_questions = Math.max(
      0,
      stats.validated_questions - stats.published_validated_questions,
    );
    stats.status = classifyStatus(stats);
    stats.pct_2000 = (stats.published_validated_questions / TARGET_QUESTIONS) * 100;
    stats.gap_2000 = Math.max(0, TARGET_QUESTIONS - stats.published_validated_questions);
  }

  if (smokePublic) {
    await smokePublicApi(statsByCode);
  }

  const countries = Array.from(statsByCode.values());
  const summary = {
    metric: 'v5.2 canonical validated bundles that are published in country-prefixed API packs',
    target_questions_per_country: TARGET_QUESTIONS,
    countries_ready: countries.filter((country) => country.published_validated_questions >= TARGET_QUESTIONS).length,
    total_published_validated_questions: countries.reduce((sum, country) => sum + country.published_validated_questions, 0),
    total_gap_questions: countries.reduce((sum, country) => sum + country.gap_2000, 0),
  };
  const report = {
    generated_at: new Date().toISOString(),
    summary,
    countries,
    invalid_samples: Object.fromEntries(invalidSamples),
  };

  if (outputJson) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(`Metric: ${summary.metric}`);
  console.log(`Target: ${TARGET_QUESTIONS} published validated questions per country`);
  console.log(`Ready countries: ${summary.countries_ready}/${COUNTRIES.length}`);
  console.log(`Published validated questions: ${summary.total_published_validated_questions}`);
  console.log(`Remaining gap: ${summary.total_gap_questions}`);
  console.log('');
  console.log(renderTable(countries));
  console.log('');
  console.log('Status legend: published_validated counts toward the KPI; validated_not_published needs pack generation; legacy_or_invalid needs repair/regeneration; missing has no usable source content.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
