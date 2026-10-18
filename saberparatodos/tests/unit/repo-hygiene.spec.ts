import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const repoRoot = path.resolve(__dirname, '../../..');

function isGitAvailable() {
  try {
    execFileSync('git', ['rev-parse', '--is-inside-work-tree'], {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: 'pipe',
    });
    return true;
  } catch {
    return false;
  }
}

describe('Repo Hygiene Guards', () => {
  const hasGit = isGitAvailable();

  if (!hasGit) {
    console.warn('Git is not available or not inside a work tree. Skipping repo hygiene tests.');
  }

  it.skipIf(!hasGit)('no conflict artifacts (.orig, .rej, .bak) are tracked', () => {
    const output = execFileSync('git', ['-C', repoRoot, 'ls-files', '-z'], { encoding: 'utf8', stdio: 'pipe' });
    const trackedFiles = output.split('\0').filter(Boolean);
    const artifacts = trackedFiles.filter(file => /\.(orig|rej|bak)$/i.test(file));

    if (artifacts.length > 0) {
      throw new Error(`Found tracked conflict artifacts:\n${artifacts.join('\n')}`);
    }
  });

  it.skipIf(!hasGit)('no git conflict markers in tracked saberparatodos source', { timeout: 30000 }, () => {
    const output = execFileSync('git', ['-C', repoRoot, 'ls-files', '-z'], { encoding: 'utf8', stdio: 'pipe' });
    const trackedFiles = output.split('\0').filter(Boolean);

    const sourceFiles = trackedFiles.filter(file => {
      if (!file.startsWith('saberparatodos/src/')) return false;
      const ext = path.extname(file).toLowerCase();
      return ['.ts', '.tsx', '.js', '.mjs', '.cjs', '.svelte', '.astro', '.css', '.json', '.md'].includes(ext);
    });

    const offenders: string[] = [];
    const markerRegex = /(^|\n)(<{7}|={7}|>{7})( |$)/;

    for (const file of sourceFiles) {
      const fullPath = path.join(repoRoot, file);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (markerRegex.test(content)) {
          offenders.push(file);
        }
      }
    }

    if (offenders.length > 0) {
      throw new Error(`Found conflict markers in tracked source files:\n${offenders.join('\n')}`);
    }
  });
});
