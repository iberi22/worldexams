// Test for the --changed-only bundle selection.
//
// It imports selectChangedBundleFiles from the module the generator actually
// uses. A test that re-implemented the selection inside itself kept passing
// while the generator stayed broken, which is exactly what happened with the
// first version of this file: it passed green against an unfixed generator
// because it was testing its own copy of the logic.
//
// THE DEFECT (hit while publishing PR #1652)
//
//   git diff --name-only origin/main...HEAD
//
// The three-dot form diffs the MERGE BASE against HEAD. Publishing happens in a
// worktree created from origin/main, so HEAD IS origin/main, the merge base is
// origin/main itself, and the diff is empty BY CONSTRUCTION. Bundles that had
// just been merged sat in the working tree and --changed-only selected zero of
// them: the command documented as canonical in AGENTS.md regenerated no packs,
// printed nothing, and exited 0.
//
// This test pins the fixed behaviour for every shape a bundle can arrive in,
// and asserts the guards: at parity with origin/main nothing is selected, and
// a repo with no origin/main must not throw.

import { execSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { selectChangedBundleFiles } from './lib/changed-bundle-files.mjs';

let failures = 0;
function check(name, ok, detail = '') {
  if (ok) console.log(`  ok   ${name}`);
  else {
    failures += 1;
    console.log(`  FAIL ${name}${detail ? ` -> ${detail}` : ''}`);
  }
}
const git = (cmd, cwd) => execSync(cmd, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

const repo = mkdtempSync(path.join(tmpdir(), 'packs-changed-only-'));
const B1 = 'questions_data/co/x/grado-1/2026/weekly/CO-X-1-2026-W01-t-001-MASTERY-bundle.md';
const B2 = 'questions_data/co/x/grado-1/2026/weekly/CO-X-1-2026-W02-t2-001-MASTERY-bundle.md';
const B3 = 'questions_data/co/x/grado-1/2026/weekly/CO-X-1-2026-W03-t3-001-MASTERY-bundle.md';

try {
  git('git init -q', repo);
  git('git config user.email t@t.t', repo);
  git('git config user.name t', repo);
  git(`mkdir -p ${path.dirname(B1)}`, repo);
  writeFileSync(path.join(repo, 'README.md'), 'base\n');
  git('git add -A', repo);
  git('git commit -q -m base', repo);
  // origin/main == HEAD: the exact shape of the publishing worktree.
  git('git update-ref refs/remotes/origin/main HEAD', repo);

  const sel = () => new Set([...selectChangedBundleFiles(repo)].map((p) => path.relative(repo, p)));
  const show = (s) => JSON.stringify([...s]);

  console.log('\nCase 1: bundle merged into main, present as an unstaged working-tree change');
  writeFileSync(path.join(repo, B1), 'merged\n');
  check('selected', sel().has(B1), `selected: ${show(sel())}`);

  console.log('\nCase 2: same bundle committed on top of origin/main');
  git('git add -A', repo);
  git('git commit -q -m "feat(content): W01"', repo);
  check('selected', sel().has(B1), `selected: ${show(sel())}`);

  console.log('\nCase 3: origin/main advanced to match HEAD (nothing pending)');
  git('git update-ref refs/remotes/origin/main HEAD', repo);
  check('nothing selected', sel().size === 0, `selected: ${show(sel())}`);

  console.log('\nCase 4: next batch staged but not committed');
  writeFileSync(path.join(repo, B2), 'staged\n');
  git('git add -A', repo);
  check('selected', sel().has(B2), `selected: ${show(sel())}`);

  console.log('\nCase 5: bundle written but never added');
  writeFileSync(path.join(repo, B3), 'untracked\n');
  check('selected', sel().has(B3), `selected: ${show(sel())}`);

  console.log('\nCase 6: only bundle markdown is selected');
  check(
    'no non-bundle or out-of-tree paths leak in',
    ![...sel()].some((f) => !f.endsWith('.md') || !f.startsWith('questions_data/')),
    `selected: ${show(sel())}`,
  );

  console.log('\nCase 7: no origin/main must not throw');
  const bare = mkdtempSync(path.join(tmpdir(), 'packs-no-origin-'));
  try {
    execSync('git init -q', { cwd: bare, stdio: 'pipe' });
    execSync('git config user.email t@t.t', { cwd: bare, stdio: 'pipe' });
    execSync('git config user.name t', { cwd: bare, stdio: 'pipe' });
    let threw = null;
    try {
      selectChangedBundleFiles(bare);
    } catch (e) {
      threw = e;
    }
    check('returns without throwing', threw === null, threw ? String(threw.message) : '');
  } finally {
    rmSync(bare, { recursive: true, force: true });
  }

  console.log(
    failures === 0
      ? '\nAll changed-only selection checks passed.\n'
      : `\n${failures} check(s) failed.\n`,
  );
} finally {
  rmSync(repo, { recursive: true, force: true });
}

process.exit(failures === 0 ? 0 : 1);
