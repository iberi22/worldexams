// Tests for the generator interlock.
//
// The repair removes 412 cloned bundles. 23 scripts under scripts/ can write
// bundles and not one of them validates its own output, so nothing stops the
// next person from re-creating the defect with one python3 command. This script
// is that interlock, and its thresholds are the whole point, so they are
// pinned here.
//
// Plain node, like the other quality suites, because vitest does not reach
// scripts/.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.join(HERE, 'check-generators.mjs');

let pass = 0;
let fail = 0;

function test(name, fn) {
  try {
    fn();
    pass += 1;
    console.log(`PASS  ${name}`);
  } catch (e) {
    fail += 1;
    console.log(`FAIL  ${name}`);
    console.log(`      ${e.message}`);
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'we-gen-'));

/** A generator that ships the exact strings the gate rejects, as the real ones do. */
function writeHardcoded(source) {
  // Each test gets its own directory: the check scans a directory, and sharing
  // one would let a previous test's generator be picked up by the next.
  const dir = fs.mkdtempSync(path.join(tmp, 'case-'));
  fs.writeFileSync(path.join(dir, 'gen_bad.py'), source, 'utf8');
  return run([dir]);
}

function run(extraArgs = []) {
  const r = spawnSync('node', [SCRIPT, '--json', ...extraArgs], { encoding: 'utf8' });
  const out = r.stdout;
  return JSON.parse(out.slice(out.indexOf('{')));
}

try {
  test('flags a generator that ships feedback the gate rejects', () => {
    const r = writeHardcoded(
      'FB = ["Correct!", "Incorrect. Review the concept."]\n' +
        'open("x-001-MASTERY-bundle.md", "w").write(FB)\n'
    );
    assert.equal(r.findings.length, 1);
    assert.ok(r.findings[0].problems.some((p) => p.includes('rejected feedback')));
  });

  test('flags a generator that writes bundles and never validates', () => {
    const r = writeHardcoded('open("x-001-MASTERY-bundle.md", "w").write("stem")\n');
    assert.ok(r.findings[0].problems.includes('writes bundles and never runs the validator'));
  });

  test('flags a generator that grades itself 100/100', () => {
    // This is gen_ca_caribbean_generator.py, verbatim in spirit: a table of
    // scores with nothing behind the numbers.
    const r = writeHardcoded(
      'open("x-001-MASTERY-bundle.md", "w").write("stem")\n' +
        'TABLE = "| Technical | 30/30 |\\n| Curricular | 40/40 |"\n'
    );
    assert.ok(r.findings[0].problems.some((p) => p.includes('self-assigned')));
  });

  test('passes a generator that validates its own output', () => {
    const r = writeHardcoded(
      'subprocess.run(["node", "scripts/validate-bundles-v52.mjs", path])\n' +
        'open("x-001-MASTERY-bundle.md", "w").write("stem")\n'
    );
    assert.equal(r.findings.length, 0);
  });

  test('ignores a generator that writes no bundles, whatever strings it holds', () => {
    // gen_mat_g3_main.py and gen_soc_weekly_v5.2.py are 300-byte helpers that
    // never touch questions_data, so they are not a way back in.
    const r = writeHardcoded('WORDS = ["Correct!", "Review the concept"]\nprint(len(WORDS))\n');
    assert.equal(r.findings.length, 0);
  });

  test('reports the real corpus: 16 of 23 generators are unsafe', () => {
    const r = run();
    assert.equal(r.scanned, 23);
    assert.ok(r.findings.length >= 15, `expected 15+ findings, got ${r.findings.length}`);
    const caribbean = r.findings.find((f) => f.script.includes('gen_ca_caribbean_generator'));
    assert.ok(caribbean, 'the generator that produced the 278x clones must be flagged');
    assert.equal(caribbean.problems.length, 3);
  });
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
