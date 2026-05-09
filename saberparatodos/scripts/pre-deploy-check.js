import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

async function mustExist(filePath, name) {
  try {
    await fs.access(filePath);
    console.log(`OK ${name}`);
    return true;
  } catch {
    console.error(`FAIL missing ${name}: ${filePath}`);
    return false;
  }
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

function ensure(condition, message, failures) {
  if (!condition) {
    console.error(`FAIL ${message}`);
    failures.count += 1;
  } else {
    console.log(`OK ${message}`);
  }
}

async function main() {
  const failures = { count: 0 };

  const buildInfoPath = path.join(repoRoot, 'public', 'build-info.json');
  if (await mustExist(buildInfoPath, 'build-info.json')) {
    const buildInfo = await readJson(buildInfoPath);
    ensure(Boolean(buildInfo.version), 'build-info has version', failures);
    ensure(Boolean(buildInfo.iso), 'build-info has iso timestamp', failures);
    ensure(Boolean(buildInfo.commit), 'build-info has commit fingerprint', failures);
  } else {
    failures.count += 1;
  }

  const wranglerTomlPath = path.join(repoRoot, 'wrangler.toml');
  if (await mustExist(wranglerTomlPath, 'wrangler.toml')) {
    const wranglerToml = await fs.readFile(wranglerTomlPath, 'utf8');
    ensure(wranglerToml.includes('api.saberparatodos.space'), 'wrangler.toml points to api.saberparatodos.space', failures);
  } else {
    failures.count += 1;
  }

  const normalizedWranglerPath = path.join(repoRoot, 'dist', 'server', 'wrangler.json');
  if (await mustExist(normalizedWranglerPath, 'dist/server/wrangler.json')) {
    const wranglerJson = await readJson(normalizedWranglerPath);
    ensure(wranglerJson.workers_dev === false, 'wrangler.json is normalized for production routes', failures);
    ensure(Array.isArray(wranglerJson.routes) && wranglerJson.routes.some((route) => String(route.pattern).includes('saberparatodos.space/*')), 'wrangler.json contains production route for saberparatodos.space', failures);
    ensure(Array.isArray(wranglerJson.routes) && wranglerJson.routes.some((route) => String(route.pattern).includes('www.saberparatodos.space/*')), 'wrangler.json contains production route for www.saberparatodos.space', failures);
  } else {
    failures.count += 1;
  }

  const guideTestPath = path.join(repoRoot, '..', 'tests', 'guide-country-isolation.prod.test.ts');
  const apiTestPath = path.join(repoRoot, '..', 'tests', 'api-gateway-public-regression.test.ts');
  ensure(await mustExist(guideTestPath, 'guide-country-isolation.prod.test.ts'), 'multi-country guide smoke exists', failures);
  ensure(await mustExist(apiTestPath, 'api-gateway-public-regression.test.ts'), 'API regression smoke exists', failures);

  if (failures.count > 0) {
    console.error(`Pre-deploy check failed with ${failures.count} issue(s).`);
    process.exit(1);
  }

  console.log('Pre-deploy checks passed.');
}

main().catch((error) => {
  console.error('Fatal pre-deploy error:', error);
  process.exit(1);
});
