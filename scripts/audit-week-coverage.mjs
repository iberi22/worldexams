import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const QUESTIONS_ROOT = path.join(ROOT, 'questions_data');

const COUNTRY_FOLDERS = new Map([
  ['co', 'colombia'],
  ['colombia', 'colombia'],
  ['mx', 'mexico'],
  ['mexico', 'mexico'],
  ['ar', 'argentina'],
  ['argentina', 'argentina'],
  ['br', 'brasil'],
  ['brasil', 'brasil'],
  ['cl', 'chile'],
  ['chile', 'chile'],
  ['pe', 'peru'],
  ['peru', 'peru'],
  ['ec', 'ecuador'],
  ['ecuador', 'ecuador'],
  ['pa', 'panama'],
  ['panama', 'panama'],
  ['cr', 'costarica'],
  ['costarica', 'costarica'],
  ['gt', 'guatemala'],
  ['guatemala', 'guatemala'],
  ['do', 'dominican_republic'],
  ['sv', 'el-salvador'],
  ['hn', 'honduras'],
  ['ni', 'nicaragua'],
  ['es', 'spain'],
  ['pr', 'puerto-rico'],
  ['gq', 'guinea-ecuatorial'],
  ['uy', 'uruguay'],
  ['py', 'paraguay'],
  ['bo', 'bolivia'],
]);

const SUBJECT_MAP_PER_GRADE = {
  3: ['matematicas', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas', 'lectura_critica'],
  4: ['matematicas', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas', 'lectura_critica'],
  5: ['matematicas', 'lectura_critica', 'ciencias_naturales', 'sociales_y_ciudadanas', 'lenguaje'],
  6: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas', 'lenguaje'],
  7: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
  8: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas', 'lenguaje'],
  9: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
  10: ['matematicas', 'lectura_critica', 'ingles', 'ciencias_naturales', 'sociales_y_ciudadanas'],
  11: ['matematicas', 'lectura_critica', 'ciencias_naturales', 'sociales_y_ciudadanas', 'ingles'],
};

const SUBJECT_DIRECTORY_ALIASES = {
  matematicas: ['matematicas', 'matematica'],
  ingles: ['ingles', 'english'],
  ciencias_naturales: ['ciencias-naturales', 'ciencias_naturales'],
  sociales_y_ciudadanas: ['sociales-ciudadanas', 'sociales_ciudadanas', 'sociales'],
  lectura_critica: ['lectura-critica', 'lectura_critica', 'lengua', 'lenguaje'],
  lenguaje: ['lengua', 'lenguaje', 'lectura-critica', 'lectura_critica'],
};

function parseArgs() {
  const args = process.argv.slice(2);
  let country = 'co';
  let week = 'W39';
  let json = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--json') {
      json = true;
    } else if (arg.startsWith('--country=')) {
      country = arg.split('=')[1].toLowerCase();
    } else if (arg === '-c' && i + 1 < args.length) {
      country = args[++i].toLowerCase();
    } else if (arg.startsWith('--week=')) {
      week = arg.split('=')[1].toUpperCase();
    } else if (arg === '-w' && i + 1 < args.length) {
      week = args[++i].toUpperCase();
    }
  }

  if (/^\d+$/.test(week)) {
    week = `W${week.padStart(2, '0')}`;
  }

  return { country, week, json };
}

function findBundleForSubject(countryFolder, subjectKey, grade, week) {
  const candidateFolders = SUBJECT_DIRECTORY_ALIASES[subjectKey] || [subjectKey];
  for (const dirName of candidateFolders) {
    const weeklyPath = path.join(QUESTIONS_ROOT, countryFolder, dirName, `grado-${grade}`, '2026', 'weekly');
    if (!fs.existsSync(weeklyPath)) continue;

    try {
      const files = fs.readdirSync(weeklyPath);
      const match = files.find((f) => f.includes(`-${week}-`) && f.endsWith('-bundle.md'));
      if (match) {
        return path.join('questions_data', countryFolder, dirName, `grado-${grade}`, '2026', 'weekly', match);
      }
    } catch {
      // Continue searching
    }
  }
  return null;
}

function main() {
  const { country, week, json } = parseArgs();
  const countryFolder = COUNTRY_FOLDERS.get(country) || country;

  if (!fs.existsSync(path.join(QUESTIONS_ROOT, countryFolder))) {
    console.error(`Country directory questions_data/${countryFolder} not found.`);
    process.exit(1);
  }

  const grades = Object.keys(SUBJECT_MAP_PER_GRADE).map(Number).sort((a, b) => a - b);
  const auditResults = [];
  const missing = [];

  for (const grade of grades) {
    const subjects = SUBJECT_MAP_PER_GRADE[grade];
    for (const subjectKey of subjects) {
      const bundlePath = findBundleForSubject(countryFolder, subjectKey, grade, week);
      const entry = {
        grade,
        subjectKey,
        status: bundlePath ? 'PRESENT' : 'MISSING',
        path: bundlePath || null,
      };
      auditResults.push(entry);
      if (!bundlePath) {
        missing.push({ grade, subjectKey });
      }
    }
  }

  if (json) {
    console.log(
      JSON.stringify(
        {
          country: countryFolder,
          week,
          total_checked: auditResults.length,
          total_missing: missing.length,
          missing,
          details: auditResults,
        },
        null,
        2
      )
    );
    return;
  }

  console.log(`=== AUDITORÍA DE COBERTURA DE BUNDLES (${countryFolder.toUpperCase()} - ${week}) ===\n`);
  console.log(`Total combinaciones evaluadas: ${auditResults.length}`);
  console.log(`Total faltantes: ${missing.length}\n`);

  for (const res of auditResults) {
    const statusSymbol = res.status === 'PRESENT' ? '✓' : '✗';
    console.log(` Grade ${String(res.grade).padStart(2, ' ')} | Subject: ${res.subjectKey.padEnd(23, ' ')} [${statusSymbol} ${res.status}] ${res.path || ''}`);
  }

  if (missing.length > 0) {
    console.log('\n--- COMBINACIONES FALTANTES ---');
    for (const m of missing) {
      console.log(` - Grado ${m.grade}, Asignatura: ${m.subjectKey}`);
    }
  } else {
    console.log('\n✓ ¡Cobertura completa! Todos los bundles fuente existen.');
  }
}

main();
