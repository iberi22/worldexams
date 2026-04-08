import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const wranglerConfigPath = path.join(repoRoot, 'dist', 'server', 'wrangler.json');

function readArg(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) {
    return null;
  }

  return process.argv[index + 1] ?? null;
}

const target = readArg('--target') || 'production';
const publicSiteUrlOverride = readArg('--public-site-url');
const workerNameOverride = readArg('--name');

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

function normalizeProductionRoutes(config) {
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

function normalizeForPreview(config) {
  delete config.route;
  delete config.routes;
  config.workers_dev = true;

  if (publicSiteUrlOverride) {
    config.vars = {
      ...(config.vars ?? {}),
      PUBLIC_SITE_URL: publicSiteUrlOverride,
    };
  }

  return config;
}

function normalizeForProduction(config) {
  config.workers_dev = false;
  config.routes = normalizeProductionRoutes(config);
  return config;
}

async function main() {
  if (!['production', 'preview'].includes(target)) {
    throw new Error(`Unsupported target "${target}". Use production or preview.`);
  }

  const rawConfig = await fs.readFile(wranglerConfigPath, 'utf8');
  const config = JSON.parse(rawConfig);

  if (workerNameOverride) {
    config.name = workerNameOverride;
  }

  if (target === 'preview') {
    normalizeForPreview(config);
  } else {
    normalizeForProduction(config);
  }

  // Ensure assets directory uses forward slashes for Cloudflare compatibility
  if (config.assets && config.assets.directory) {
    config.assets.directory = config.assets.directory.replace(/\\/g, '/');
  }

  if (
    Array.isArray(config.compatibility_flags) &&
    config.compatibility_flags.includes('nodejs_compat_v2')
  ) {
    delete config.no_bundle;
  }

  await fs.writeFile(wranglerConfigPath, `${JSON.stringify(config, null, 2)}\n`);

  const routeSummary = Array.isArray(config.routes) && config.routes.length > 0
    ? config.routes.map((route) => route.pattern).join(', ')
    : 'none';

  process.stdout.write(
    `[normalize-wrangler-config] target=${target} name=${config.name} publicSite=${config?.vars?.PUBLIC_SITE_URL ?? 'unset'} routes=${routeSummary}\n`,
  );
}

main().catch((error) => {
  console.error('[normalize-wrangler-config] Failed to normalize wrangler config.');
  console.error(error);
  process.exitCode = 1;
});
