import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCRIPTS_DIR = __dirname;
const SABER_ROOT = path.join(SCRIPTS_DIR, '..');
const REPO_ROOT = path.join(SABER_ROOT, '..');

const VALIDATOR_SCRIPT = path.join(SCRIPTS_DIR, 'validate_cuentos.js');
const SEED_FILE = path.join(REPO_ROOT, 'questions_data', 'cuentos', 'tana-tucan-comparte', 'cuento.md');
const FIXTURE_NO_HEADER = path.join(SCRIPTS_DIR, 'fixtures', 'cuentos', 'no-header', 'cuento.md');
const FIXTURE_BAD_QUIZ = path.join(SCRIPTS_DIR, 'fixtures', 'cuentos', 'bad-quiz-count', 'cuento.md');

let failures = 0;

function runTest(name, filePath, expectedExitCode, expectedRule) {
  console.log(`Running test: ${name}`);
  let output = '';
  let exitCode = 0;

  try {
    output = execSync(`node "${VALIDATOR_SCRIPT}" "${filePath}"`, { encoding: 'utf8', stdio: 'pipe' });
  } catch (err) {
    exitCode = err.status || 1;
    output = err.stdout + '\n' + err.stderr;
  }

  const codeMatch = exitCode === expectedExitCode;
  const ruleMatch = expectedRule ? output.includes(expectedRule) : true;

  if (codeMatch && ruleMatch) {
    console.log(`  ✅ PASS (exitCode=${exitCode})`);
  } else {
    console.error(`  ❌ FAIL (exitCode=${exitCode}, expectedExitCode=${expectedExitCode})`);
    if (expectedRule && !ruleMatch) {
      console.error(`  Expected rule string "${expectedRule}" not found in output.`);
    }
    console.error(`Output:\n${output}`);
    failures++;
  }
}

console.log('🧪 Running validate_cuentos integration tests...\n');

// Case 1: Gold seed passes with 0 ERRORs (exit 0)
runTest('Gold Seed cuento.md (tana-tucan-comparte)', SEED_FILE, 0, null);

// Case 2: Negative fixture missing copyright header fails with CUENTO-E-HEADER (exit 1)
runTest('Negative fixture: Missing Header', FIXTURE_NO_HEADER, 1, 'CUENTO-E-HEADER');

// Case 3: Negative fixture with 2 quiz questions fails with CUENTO-E-QUIZ-COUNT (exit 1)
runTest('Negative fixture: Bad Quiz Count', FIXTURE_BAD_QUIZ, 1, 'CUENTO-E-QUIZ-COUNT');

// Case 4: Negative fixture missing v2 hint fails with CUENTO-E-PAGE-V2-HINT-MISSING (exit 1)
runTest('Negative fixture: Missing v2 Hint', FIXTURE_NO_HEADER, 1, 'CUENTO-E-PAGE-V2-HINT-MISSING');

console.log('\n----------------------------------------');
if (failures === 0) {
  console.log('🎉 All validate_cuentos tests passed!');
  process.exit(0);
} else {
  console.error(`💥 ${failures} test(s) failed.`);
  process.exit(1);
}
