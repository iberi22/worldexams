import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

async function main() {
  try {
    const pkgPath = path.join(repoRoot, 'package.json');
    const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));

    let commit = process.env.GITHUB_SHA || '';
    if (!commit) {
      try {
        commit = execSync('git rev-parse HEAD', { cwd: repoRoot, stdio: ['ignore', 'pipe', 'ignore'] })
          .toString()
          .trim();
      } catch {
        commit = 'local-build';
      }
    }

    const buildInfo = {
      version: pkg.version,
      timestamp: Date.now(),
      buildTime: Date.now(),
      iso: new Date().toISOString(),
      commit
    };

    const outputPath = path.join(repoRoot, 'public', 'build-info.json');
    await fs.writeFile(outputPath, JSON.stringify(buildInfo, null, 2));

    console.log(`[generate-build-info] Created build-info.json version ${pkg.version}`);
  } catch (error) {
    console.error('[generate-build-info] Failed to generate build info:', error);
    process.exit(1);
  }
}

main();
