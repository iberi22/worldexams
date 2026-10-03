// Which bundle files does --changed-only have to regenerate?
//
// Extracted from generate-static-packs.js so the selection can be tested
// directly instead of being re-implemented (and drifting) inside a test.
//
// THE DEFECT THIS EXISTS TO PREVENT
//
// The original selection was a single probe:
//
//   git diff --name-only origin/main...HEAD
//
// The three-dot form diffs the MERGE BASE against HEAD. Publishing happens in a
// worktree created from origin/main, where HEAD IS origin/main: the merge base
// is origin/main itself, so the diff is empty BY CONSTRUCTION. Bundles that had
// just been merged sat in the working tree and --changed-only selected zero of
// them. The command regenerated no packs, printed no warning, and exited 0.
//
// It was hit for real on PR #1652 (CO Sociales G3 W06-W15): zero changed files
// reported, and the packs had to be rebuilt with --all-weekly. Because
// AGENTS.md documents --changed-only as the canonical post-merge command,
// every agent publishing from main would have shipped stale packs silently.
//
// The fix is the union of four probes, so a bundle is found whether it arrived
// as a commit, as a squash merge already on main, as a staged change, or as an
// untracked file.

import { execSync } from "node:child_process";
import path from "node:path";

const PROBES = [
  // Committed relative to origin/main, including squash-merged commits.
  "git diff --name-only origin/main..HEAD",
  // Modified in the working tree but not committed.
  "git diff --name-only HEAD",
  // Staged for the next batch.
  "git diff --name-only --cached HEAD",
  // In the tree but never committed.
  "git ls-files --others --exclude-standard",
];

function gitLines(cwd, args) {
  try {
    return execSync(args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    // A missing origin/main, an unborn HEAD or a detached oddity must not take
    // pack generation down: that is how a tooling bug becomes a broken deploy.
    return [];
  }
}

/**
 * @param {string} repoRoot repository root (the parent of saberparatodos)
 * @returns {Set<string>} absolute paths of changed bundle markdown files
 */
export function selectChangedBundleFiles(repoRoot) {
  const names = new Set();
  for (const probe of PROBES) {
    for (const line of gitLines(repoRoot, probe)) {
      if (line.startsWith("questions_data/") && line.endsWith(".md")) names.add(line);
    }
  }
  return new Set([...names].map((file) => path.resolve(repoRoot, file)));
}
