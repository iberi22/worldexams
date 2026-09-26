import fs from 'node:fs/promises';

/**
 * Counts the number of .js files directly under the specified Astro assets directory.
 * @param {string} astroDir - Path to dist/client/_astro
 * @returns {Promise<number>} Number of .js chunk files found, or 0 if unreadable/missing.
 */
export async function countJsChunks(astroDir) {
  try {
    const entries = await fs.readdir(astroDir);
    return entries.filter((file) => file.endsWith('.js')).length;
  } catch {
    return 0;
  }
}

/**
 * Evaluates whether the count of .js chunks meets release requirements.
 * @param {number} jsCount - Number of .js chunks
 * @returns {{ ok: boolean, message: string, warning: boolean }} Validation result
 */
export function checkAssetGuard(jsCount) {
  if (jsCount === 0) {
    return {
      ok: false,
      message: "[assets] dist/client/_astro tiene 0 chunks JS — reconstruye con 'npm run build' antes de desplegar.",
      warning: false,
    };
  }
  if (jsCount < 50) {
    return {
      ok: true,
      message: `[assets] dist/client/_astro tiene ${jsCount} chunks JS (aviso: < 50 chunks)`,
      warning: true,
    };
  }
  return {
    ok: true,
    message: `[assets] dist/client/_astro tiene ${jsCount} chunks JS`,
    warning: false,
  };
}
