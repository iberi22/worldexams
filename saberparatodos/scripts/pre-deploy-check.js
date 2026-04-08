/**
 * Pre-deploy Check for SaberParaTodos
 * Validates build metadata and critical configurations to avoid UI regressions.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

async function checkFileExists(filePath, name) {
  try {
    await fs.access(filePath);
    console.log(`✅ ${name} found.`);
    return true;
  } catch {
    console.error(`❌ ${name} NOT found at ${filePath}`);
    return false;
  }
}

async function main() {
  console.log('--- 🛡️ Starting Pre-deploy Check ---');
  let failures = 0;

  // 1. Check build-info.json integrity
  const buildInfoPath = path.join(repoRoot, 'public', 'build-info.json');
  if (await checkFileExists(buildInfoPath, 'build-info.json')) {
    const buildInfo = JSON.parse(await fs.readFile(buildInfoPath, 'utf8'));
    if (!buildInfo.timestamp || !buildInfo.buildTime || !buildInfo.version) {
      console.error('❌ build-info.json is missing critical fields (timestamp, buildTime, or version)');
      failures++;
    } else if (new Date(buildInfo.timestamp).toString() === 'Invalid Date') {
      console.error('❌ build-info.json has an Invalid Date in timestamp');
      failures++;
    } else {
      console.log(`✅ Build version: ${buildInfo.version} (${new Date(buildInfo.timestamp).toLocaleDateString()})`);
    }
  } else {
    failures++;
  }

  // 2. Check wrangler.toml API URL
  const wranglerPath = path.join(repoRoot, 'wrangler.toml');
  if (await checkFileExists(wranglerPath, 'wrangler.toml')) {
    const config = await fs.readFile(wranglerPath, 'utf8');
    if (!config.includes('api.saberparatodos.space')) {
      console.error('❌ wrangler.toml does NOT point to the API subdomain (api.saberparatodos.space)');
      failures++;
    } else {
      console.log('✅ API subdomain configuration detected.');
    }
  } else {
    failures++;
  }

  // 3. Warning for local packs (they should be gone from public/ if moved)
  const packsPath = path.join(repoRoot, 'public', 'api', 'packs');
  try {
    const files = await fs.readdir(packsPath);
    if (files.length > 0) {
      console.warn(`⚠️ Warning: ${files.length} packs still exist in public/api/packs/. They should be moved to the API worker repository.`);
    }
  } catch {
    // Pack directory missing is fine if moved
    console.log('✅ Local packs directory is clean/removed.');
  }

  if (failures > 0) {
    console.error(`\n🛑 Pre-deploy check FAILED with ${failures} error(s). Build aborted.`);
    process.exit(1);
  }

  console.log('\n✨ All critical pre-deploy checks passed!');
}

main().catch(err => {
  console.error('Fatal error during pre-deploy check:', err);
  process.exit(1);
});
