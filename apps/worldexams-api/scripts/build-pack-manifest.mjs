#!/usr/bin/env node
/**
 * build-pack-manifest.mjs — writes public/v1/packs/_manifest.json with the list of
 * pack files that actually exist, so the worker can resolve packs with ONE asset
 * read instead of probing alias/prefix combinations (each probe is a subrequest
 * and the Workers subrequest limit silently truncated period pools in production).
 *
 * Usage: node apps/worldexams-api/scripts/build-pack-manifest.mjs [--check]
 *   --check  exit 1 if the committed manifest is missing or stale (CI gate).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const packsDir = path.resolve(here, '../public/v1/packs');
const manifestPath = path.join(packsDir, '_manifest.json');
const EXCLUDED = new Set(['_manifest.json', 'metadata.json', 'current.json']);

const files = fs
  .readdirSync(packsDir)
  .filter((f) => f.endsWith('.json') && !EXCLUDED.has(f))
  .map((f) => f.slice(0, -'.json'.length))
  .sort();

const next = JSON.stringify({ version: 1, count: files.length, files }) + '\n';

if (process.argv.includes('--check')) {
  const current = fs.existsSync(manifestPath) ? fs.readFileSync(manifestPath, 'utf8') : '';
  if (current !== next) {
    console.error(`✘ ${path.relative(process.cwd(), manifestPath)} is stale. Run: node apps/worldexams-api/scripts/build-pack-manifest.mjs`);
    process.exit(1);
  }
  console.log(`✔ pack manifest up to date (${files.length} packs)`);
} else {
  fs.writeFileSync(manifestPath, next);
  console.log(`Wrote ${path.relative(process.cwd(), manifestPath)} (${files.length} packs)`);
}
