#!/usr/bin/env node
/**
 * Keeps subject-alias packs identical to their canonical pack.
 *
 * Alias packs (`…-subject-ing.json`, `…-subject-english.json`,
 * `…-subject-espanol.json`, …) are copies of a canonical pack: their
 * `metadata.pack_id` names the canonical file. generate-static-packs.js only
 * rewrites the canonical key, so the copies drifted: on 2026-10-20, 10 394
 * questions served from alias packs had a different stem or correct answer
 * than the source bundle under the same question id.
 *
 * Usage:
 *   node apps/worldexams-api/scripts/sync-alias-packs.mjs          # rewrite drifted aliases
 *   node apps/worldexams-api/scripts/sync-alias-packs.mjs --check  # exit 1 if any alias drifted
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PACKS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "v1",
  "packs",
);
const check = process.argv.includes("--check");

let aliases = 0;
let drifted = 0;
let orphans = 0;
const examples = [];

for (const file of fs.readdirSync(PACKS_DIR).sort()) {
  if (!file.endsWith(".json") || file === "_manifest.json") continue;
  const aliasPath = path.join(PACKS_DIR, file);
  const raw = fs.readFileSync(aliasPath);
  let packId;
  try {
    packId = JSON.parse(raw.toString("utf8"))?.metadata?.pack_id;
  } catch {
    continue;
  }
  if (!packId || packId === file.slice(0, -".json".length)) continue;

  aliases++;
  const canonicalPath = path.join(PACKS_DIR, `${packId}.json`);
  if (!fs.existsSync(canonicalPath)) {
    // No canonical file to copy from: leave it, but report it.
    orphans++;
    continue;
  }
  const canonical = fs.readFileSync(canonicalPath);
  if (Buffer.compare(raw, canonical) === 0) continue;

  drifted++;
  if (examples.length < 5) examples.push(file);
  if (!check) fs.writeFileSync(aliasPath, canonical);
}

console.log(
  `alias packs: ${aliases}, drifted: ${drifted}${check ? "" : " (rewritten)"}, without canonical file: ${orphans}`,
);
if (examples.length) console.log(`e.g. ${examples.join(", ")}`);
if (check && drifted > 0) {
  console.error("✘ alias packs differ from their canonical pack; run sync-alias-packs.mjs");
  process.exit(1);
}
