import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const wranglerConfigPath = path.join(repoRoot, 'dist', 'server', 'wrangler.json');

function extractHostname(value) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return null;
  }

  try {
    const url = value.includes('://') ? new URL(value) : new URL(`https://${value}`);
    return url.hostname.replace(/\.$/, '').toLowerCase();
  } catch {
    return value
      .replace(/^[a-z]+:\/\//i, '')
      .split('/')[0]
      .replace(/\.$/, '')
      .toLowerCase();
  }
}

function normalizeRoutes(config) {
  const candidates = new Set();

  for (const route of config.routes ?? []) {
    const hostname = extractHostname(route?.pattern);
    if (hostname) {
      candidates.add(hostname);
    }
  }

  const publicSiteUrl = extractHostname(config?.vars?.PUBLIC_SITE_URL);
  if (publicSiteUrl) {
    candidates.add(publicSiteUrl);
    if (publicSiteUrl.split('.').length === 2 && !publicSiteUrl.startsWith('www.')) {
      candidates.add(`www.${publicSiteUrl}`);
    }
  }

  const zoneName = publicSiteUrl?.replace(/^www\./, '') ?? null;

  return [...candidates]
    .sort()
    .map((hostname) => ({
      pattern: `${hostname}/*`,
      ...(zoneName ? { zone_name: zoneName } : {}),
    }));
}

async function main() {
  const rawConfig = await fs.readFile(wranglerConfigPath, 'utf8');
  const config = JSON.parse(rawConfig);

  config.routes = normalizeRoutes(config);

  await fs.writeFile(wranglerConfigPath, `${JSON.stringify(config, null, 2)}\n`);

  process.stdout.write(
    `[normalize-wrangler-config] Normalized worker routes: ${config.routes
      .map((route) => route.pattern)
      .join(', ')}\n`,
  );
}

main().catch((error) => {
  console.error('[normalize-wrangler-config] Failed to normalize wrangler config.');
  console.error(error);
  process.exitCode = 1;
});
