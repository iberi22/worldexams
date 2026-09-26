import { describe, it, expect } from 'vitest';
import path from 'node:path';
import fs from 'node:fs/promises';
import os from 'node:os';
import { countJsChunks, checkAssetGuard } from '../../scripts/lib/asset-guard.js';

describe('predeploy-asset-guard', () => {
  it('fails when dist/_astro is empty or contains 0 chunks', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'asset-guard-test-empty-'));
    try {
      const count = await countJsChunks(tmpDir);
      expect(count).toBe(0);

      const result = checkAssetGuard(count);
      expect(result.ok).toBe(false);
      expect(result.message).toContain('0 chunks JS');
      expect(result.message).toContain("reconstruye con 'npm run build'");
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });

  it('passes when dist/_astro contains .js chunk files', async () => {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'asset-guard-test-valid-'));
    try {
      await fs.writeFile(path.join(tmpDir, 'chunk-1.js'), '// chunk 1');
      await fs.writeFile(path.join(tmpDir, 'chunk-2.js'), '// chunk 2');
      await fs.writeFile(path.join(tmpDir, 'styles.css'), '/* styles */');

      const count = await countJsChunks(tmpDir);
      expect(count).toBe(2);

      const result = checkAssetGuard(count);
      expect(result.ok).toBe(true);
      expect(result.message).toContain('2 chunks JS');
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });

  it('handles missing directory gracefully by returning 0 chunks', async () => {
    const nonexistentDir = path.join(os.tmpdir(), 'nonexistent-astro-assets-dir-' + Date.now());
    const count = await countJsChunks(nonexistentDir);
    expect(count).toBe(0);

    const result = checkAssetGuard(count);
    expect(result.ok).toBe(false);
  });
});
