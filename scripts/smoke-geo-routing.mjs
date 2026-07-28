#!/usr/bin/env node
/**
 * Smoke checks for geo / country pack routing (no live CF required).
 * Run: node scripts/smoke-geo-routing.mjs
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function read(p) {
  return fs.readFileSync(path.join(root, p), 'utf8');
}

const mw = read('saberparatodos/src/middleware.ts');
assert.match(mw, /accept-language/i, 'middleware should read Accept-Language');
assert.match(mw, /Do not force site default/, 'middleware should not force CO before geo');
assert.match(mw, /countryHasContent/, 'middleware sets countryHasContent');

const pack = read('saberparatodos/src/lib/pack-fetcher.ts');
assert.match(pack, /runtimeApiConfig\.countryCode/, 'pack-fetcher must prefer runtime country');

const layout = read('saberparatodos/src/layouts/Layout.astro');
assert.match(layout, /ContentComingSoon/, 'layout shows coming-soon when no content');

const chile = read('config/countries.config.ts');
assert.match(chile, /examName: 'PAES'/, 'Chile exam should be PAES');

const packsDir = path.join(root, 'apps/worldexams-api/public/v1/packs');
const pe = fs.readdirSync(packsDir).filter((f) => f.startsWith('pe-')).length;
const cl = fs.readdirSync(packsDir).filter((f) => f.startsWith('cl-')).length;
assert.ok(pe > 0, 'expected pe- packs');
assert.ok(cl > 0, 'expected cl- packs');

console.log(`[OK] geo smoke: pe packs=${pe}, cl packs=${cl}`);
console.log('[OK] Manual: open /?country=PE and /?country=CL and verify #api-config.countryCode');
