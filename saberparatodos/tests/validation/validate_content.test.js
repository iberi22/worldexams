import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..', '..');
const REPO_ROOT = path.join(ROOT, '..');
const QUESTIONS_DIR = path.join(REPO_ROOT, 'questions_data');
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

function runValidator(cmdArgs, cwd = ROOT) {
  try {
    const output = execSync(`node scripts/validate_content.js ${cmdArgs}`, {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, output: (error.stdout || '') + (error.stderr || '') };
  }
}

function runValidatorFromRepoRoot(cmdArgs) {
  try {
    const output = execSync(`node saberparatodos/scripts/validate_content.js ${cmdArgs}`, {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, output: (error.stdout || '') + (error.stderr || '') };
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

    const res1 = runValidator('--scope=test_weekly_validation --fail-on-error');
    if (!res1.success && res1.output.includes('weekly-week-bundle.md -> Bundle v5 sin frontmatter obligatorio: "periodo"')) {
      console.error('❌ Test Case 1 Failed: Weekly bundle with "week" should not fail for missing periodo.');
      console.error(res1.output);
      failures++;
    } else {
      console.log('✅ Test Case 1 Passed');
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

    const res2 = runValidator('--scope=test_weekly_validation --fail-on-error');
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

    const res3 = runValidator('--scope=test_weekly_validation --fail-on-error');
    if (res3.output.includes('v5-no-period-bundle.md -> Bundle v5 sin frontmatter obligatorio: "periodo"')) {
      console.log('✅ Test Case 3 Passed (Failed as expected)');
    } else {
      console.error('❌ Test Case 3 Failed: V5 bundle without week or periodo should have failed for missing "periodo".');
      failures++;
    }

    // Case 4: Invocation with relative path from saberparatodos/ (Should Pass & Analyze 1 file)
    cleanup(); setup();
    createBundle('weekly-relative-bundle.md', {
      id: 'weekly-relative-bundle',
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

    const res4 = runValidator('../questions_data/test_weekly_validation/weekly-relative-bundle.md');
    if (res4.success && res4.output.includes('- Archivos analizados: 1')) {
      console.log('✅ Test Case 4 Passed: Relative path from saberparatodos/ analyzed 1 file.');
    } else {
      console.error('❌ Test Case 4 Failed: Relative path from saberparatodos/ should resolve and analyze 1 file.');
      console.error(res4.output);
      failures++;
    }

    // Case 5: Invocation with unresolvable path (Should Fail with exit 1 and 0 analyzed error message)
    const res5 = runValidator('../questions_data/test_weekly_validation/nonexistent-bundle-xyz.md');
    if (!res5.success && res5.output.includes('0 archivos analizados')) {
      console.log('✅ Test Case 5 Passed: Unresolvable path failed explicitly with exit code 1 and 0 analyzed message.');
    } else {
      console.error('❌ Test Case 5 Failed: Unresolvable path should fail explicitly with exit 1.');
      console.error(res5.output);
      failures++;
    }

    // Case 6: Broken bundle must fail from BOTH root and saberparatodos/
    cleanup(); setup();
    createBundle('broken-bundle.md', {
      // missing 'id' and 'grado'
      asignatura: 'ING',
      tema: 'Test',
      week: 'W01',
      bundle_index: 1,
      protocol_version: '5.2'
    });

    const res6a = runValidator('--fail-on-error ../questions_data/test_weekly_validation/broken-bundle.md');
    const res6b = runValidatorFromRepoRoot('--fail-on-error questions_data/test_weekly_validation/broken-bundle.md');

    if (!res6a.success && res6a.output.includes('Falta frontmatter obligatorio') &&
        !res6b.success && res6b.output.includes('Falta frontmatter obligatorio')) {
      console.log('✅ Test Case 6 Passed: Broken bundle failed validation from both saberparatodos/ and repo root.');
    } else {
      console.error('❌ Test Case 6 Failed: Broken bundle should fail from both working directories.');
      console.error('saberparatodos/ output:', res6a.output);
      console.error('repo root output:', res6b.output);
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
