import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

async function mustExist(filePath, name) {
  try {
    await fs.access(filePath);
    console.log(`OK ${name}`);
    return true;
  } catch {
    console.error(`FAIL missing ${name}: ${filePath}`);
    return false;
  }
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

function ensure(condition, message, failures) {
  if (!condition) {
    console.error(`FAIL ${message}`);
    failures.count += 1;
  } else {
    console.log(`OK ${message}`);
  }
}

async function getExpectedPacks() {
  const questionsDataRoot = path.join(repoRoot, '..', 'questions_data');
  const expectedPacks = new Set();
  const subjectsByGrade = new Map(); // grade -> Set of subjects

  const countryMap = {
    colombia: 'co',
    mexico: 'mx',
    peru: 'pe',
    chile: 'cl',
    ecuador: 'ec',
    argentina: 'ar',
    guatemala: 'gt',
    brasil: 'br',
    brazil: 'br',
    spain: 'es',
    espana: 'es',
    panama: 'pa',
    'guinea-ecuatorial': 'gq',
    nicaragua: 'ni',
    dominican_republic: 'do',
    'costa-rica': 'cr',
    costa_rica: 'cr',
    costarica: 'cr',
    honduras: 'hn',
    uruguay: 'uy',
    paraguay: 'py',
    'puerto-rico': 'pr',
    puerto_rico: 'pr',
    'el-salvador': 'sv',
    el_salvador: 'sv',
    elsalvador: 'sv',
    bolivia: 'bo',
    global: '',
  };

  async function walk(dir) {
    let entries = [];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'legacy' && !fullPath.includes('/periodo-')) {
          await walk(fullPath);
        }
      } else if (entry.name.endsWith('.md')) {
        const content = await fs.readFile(fullPath, 'utf8');
        const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
        if (!match) continue;

        const data = {};
        for (const line of match[1].split(/\r?\n/)) {
          const separator = line.indexOf(':');
          if (separator === -1) continue;
          const key = line.slice(0, separator).trim();
          let value = line.slice(separator + 1).trim();
          value = value.replace(/^["']|["']$/g, '');
          data[key] = value;
        }

        const protocol = parseInt(data.protocol_version || data.bundle_version || '0');
        if (protocol < 3) continue;

        const rawGrade = String(data.grado || '11');
        const grade = rawGrade.toUpperCase() === '3EM' ? 11 : parseInt(rawGrade, 10);
        const subject = data.asignatura || data.subject;
        const weekField = data.week || data.semana || '';
        const isWeeklyBundle = data.periodo === 'weekly' || data.bundle_type === 'weekly' || weekField !== '';
        const weekMatch = String(weekField).match(/^W(\d{2})$/i);
        const period = isWeeklyBundle ? (weekMatch ? Number(weekMatch[1]) : NaN) : parseInt(data.periodo || '1');

        if (!Number.isFinite(period) || !isWeeklyBundle) continue;

        let countryCode = (data.country || '').toLowerCase();
        if (!countryCode) {
          const relPath = path.relative(questionsDataRoot, fullPath);
          countryCode = relPath.split(path.sep)[0].toLowerCase();
        }
        if (countryMap[countryCode] !== undefined) {
          countryCode = countryMap[countryCode];
        }

        const cleanSubject = String(subject || '')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]/g, '');

        const isEnglish = cleanSubject === 'ingles' || cleanSubject === 'english';
        const safeSubject = isEnglish
          ? 'ingles'
          : subject
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[\/\s-]/g, '_')
              .replace(/[^a-z0-9_]/g, '');

        if (isEnglish) {
          countryCode = '';
        }

        const prefix = countryCode ? `${countryCode}-` : '';
        const packKey = `${prefix}week-${period}-grade-${grade}-subject-${safeSubject}`;
        expectedPacks.add(packKey);

        if (!subjectsByGrade.has(grade)) {
          subjectsByGrade.set(grade, new Set());
        }
        subjectsByGrade.get(grade).add(safeSubject);
      }
    }
  }

  await walk(questionsDataRoot);
  return { expectedPacks, subjectsByGrade };
}

async function main() {
  const failures = { count: 0 };

  const buildInfoPath = path.join(repoRoot, 'public', 'build-info.json');
  if (await mustExist(buildInfoPath, 'build-info.json')) {
    const buildInfo = await readJson(buildInfoPath);
    ensure(Boolean(buildInfo.version), 'build-info has version', failures);
    ensure(Boolean(buildInfo.iso), 'build-info has iso timestamp', failures);
    ensure(Boolean(buildInfo.commit), 'build-info has commit fingerprint', failures);
  } else {
    failures.count += 1;
  }

  const wranglerTomlPath = path.join(repoRoot, 'wrangler.toml');
  if (await mustExist(wranglerTomlPath, 'wrangler.toml')) {
    const wranglerToml = await fs.readFile(wranglerTomlPath, 'utf8');
    ensure(wranglerToml.includes('api.saberparatodos.space'), 'wrangler.toml points to api.saberparatodos.space', failures);
  } else {
    failures.count += 1;
  }

  const normalizedWranglerPath = path.join(repoRoot, 'dist', 'server', 'wrangler.json');
  if (await mustExist(normalizedWranglerPath, 'dist/server/wrangler.json')) {
    const wranglerJson = await readJson(normalizedWranglerPath);
    ensure(wranglerJson.workers_dev === false, 'wrangler.json is normalized for production routes', failures);
    ensure(Array.isArray(wranglerJson.routes) && wranglerJson.routes.some((route) => String(route.pattern).includes('saberparatodos.space/*')), 'wrangler.json contains production route for saberparatodos.space', failures);
    ensure(Array.isArray(wranglerJson.routes) && wranglerJson.routes.some((route) => String(route.pattern).includes('www.saberparatodos.space/*')), 'wrangler.json contains production route for www.saberparatodos.space', failures);
  } else {
    failures.count += 1;
  }

  const guideTestPath = path.join(repoRoot, '..', 'tests', 'guide-country-isolation.prod.test.ts');
  const apiTestPath = path.join(repoRoot, '..', 'tests', 'api-gateway-public-regression.test.ts');
  ensure(await mustExist(guideTestPath, 'guide-country-isolation.prod.test.ts'), 'multi-country guide smoke exists', failures);
  ensure(await mustExist(apiTestPath, 'api-gateway-public-regression.test.ts'), 'API regression smoke exists', failures);

  console.log('Verifying static packs...');
  const { expectedPacks, subjectsByGrade } = await getExpectedPacks();
  const packsDir = path.join(repoRoot, 'dist', 'client', 'api', 'packs');
  let missingPacksCount = 0;

  for (const packKey of expectedPacks) {
    const packPath = path.join(packsDir, `${packKey}.json`);
    try {
      await fs.access(packPath);
    } catch {
      console.error(`FAIL missing static pack: ${packKey}.json`);
      missingPacksCount += 1;
    }
  }

  ensure(missingPacksCount === 0, `All ${expectedPacks.size} expected static packs exist`, failures);

  if (missingPacksCount > 0) {
    console.error(`\nTIP: Some static packs are missing. Run the following command to generate them:`);
    console.error(`npm run generate:packs:weekly\n`);
  }

  // Minimum metrics: at least one pack for each grade/subject combination found in source
  for (const [grade, subjects] of subjectsByGrade) {
    for (const subject of subjects) {
      const subjectPacks = Array.from(expectedPacks).filter(p => p.includes(`-grade-${grade}-subject-${subject}`));
      ensure(subjectPacks.length > 0, `At least one pack exists for grade ${grade} subject ${subject}`, failures);
    }
  }

  if (failures.count > 0) {
    console.error(`Pre-deploy check failed with ${failures.count} issue(s).`);
    process.exit(1);
  }

  console.log('Pre-deploy checks passed.');
}

main().catch((error) => {
  console.error('Fatal pre-deploy error:', error);
  process.exit(1);
});
