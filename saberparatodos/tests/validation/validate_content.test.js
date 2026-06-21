import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..', '..');
const QUESTIONS_DIR = path.join(ROOT, '..', 'questions_data');
const TEST_DIR = path.join(QUESTIONS_DIR, 'test_weekly_validation');

function setup() {
  if (!fs.existsSync(TEST_DIR)) {
    fs.mkdirSync(TEST_DIR, { recursive: true });
  }
}

function cleanup() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

function createBundle(filename, frontmatter, questionCount = 20) {
  let content = '---\n';
  for (const [key, value] of Object.entries(frontmatter)) {
    content += `${key}: ${JSON.stringify(value)}\n`;
  }
  content += '---\n\n';

  for (let i = 1; i <= questionCount; i++) {
    content += `## Pregunta ${i} [D3-D4]\n`;
    content += `**ID:** \`test-q-${filename.replace(/\.md$/, '')}-${i}\`\n`;
    content += `### Enunciado\nTest question ${i}\n`;
    content += `### Opciones\n- [x] A\n- [ ] B\n\n`;
  }

  fs.writeFileSync(path.join(TEST_DIR, filename), content);
}

function runValidator(scope) {
  try {
    const output = execSync(`node scripts/validate_content.js --scope=${scope} --fail-on-error`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, output: error.stdout + error.stderr };
  }
}

async function test() {
  console.log('Running tests for validate_content.js...');
  setup();
  let failures = 0;

  try {
    // Case 1: Weekly bundle with 'week' (Should Pass)
    createBundle('weekly-week-bundle.md', {
      id: 'weekly-week-bundle',
      grado: 11,
      asignatura: 'ING',
      tema: 'Test',
      week: 'W01',
      bundle_index: 1,
      protocol_version: '5.2',
      country: 'colombia',
      alignment: 'Test',
      calibration: { difficulty: 0.5 }
    });

    const res1 = runValidator('test_weekly_validation');
    // We ignore the error about the other file CO-LEN-6-2026-W28
    if (!res1.success && res1.output.includes('weekly-week-bundle.md -> Bundle v5 sin frontmatter obligatorio: "periodo"')) {
      console.error('❌ Test Case 1 Failed: Weekly bundle with "week" should not fail for missing periodo.');
      console.error(res1.output);
      failures++;
    } else if (!res1.success && !res1.output.includes('weekly-week-bundle.md')) {
       console.log('✅ Test Case 1 Passed (Other files failed but ours was fine)');
    } else if (res1.success) {
      console.log('✅ Test Case 1 Passed');
    } else {
      console.log('✅ Test Case 1 Passed (No "periodo" error for our file)');
    }

    // Case 2: Weekly bundle with 'semana' (Should Pass)
    cleanup(); setup();
    createBundle('weekly-semana-bundle.md', {
      id: 'weekly-semana-bundle',
      grado: 11,
      asignatura: 'ING',
      tema: 'Test',
      semana: 'W01',
      bundle_index: 1,
      protocol_version: '5.2',
      country: 'colombia',
      alignment: 'Test',
      calibration: { difficulty: 0.5 }
    });

    const res2 = runValidator('test_weekly_validation');
    if (!res2.success && res2.output.includes('weekly-semana-bundle.md -> Bundle v5 sin frontmatter obligatorio: "periodo"')) {
      console.error('❌ Test Case 2 Failed: Weekly bundle with "semana" should not fail for missing periodo.');
      console.error(res2.output);
      failures++;
    } else {
      console.log('✅ Test Case 2 Passed');
    }

    // Case 3: V5 bundle without week or periodo (Should Fail)
    cleanup(); setup();
    createBundle('v5-no-period-bundle.md', {
      id: 'v5-no-period-bundle',
      grado: 11,
      asignatura: 'ING',
      tema: 'Test',
      bundle_index: 1,
      protocol_version: '5.0',
      country: 'colombia',
      alignment: 'Test',
      calibration: { difficulty: 0.5 }
    });

    const res3 = runValidator('test_weekly_validation');
    if (res3.output.includes('v5-no-period-bundle.md -> Bundle v5 sin frontmatter obligatorio: "periodo"')) {
      console.log('✅ Test Case 3 Passed (Failed as expected)');
    } else {
      console.error('❌ Test Case 3 Failed: V5 bundle without week or periodo should have failed for missing "periodo".');
      failures++;
    }

  } finally {
    cleanup();
  }

  if (failures > 0) {
    console.error(`\nTests failed with ${failures} failures.`);
    process.exit(1);
  } else {
    console.log('\nAll tests passed!');
  }
}

test();
