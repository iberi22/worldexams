import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const KEYS_LOCAL = path.join(PROJECT_ROOT, 'video-pipeline', 'config', 'social-keys.local.json');
const KEYS_EXAMPLE = path.join(PROJECT_ROOT, 'video-pipeline', 'config', 'social-keys.example.json');

function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function mask(value) {
  const text = String(value || '');
  if (!text) return '';
  if (text.length <= 8) return '********';
  return `${text.slice(0, 4)}...${text.slice(-4)}`;
}

function validatePlatform(config, name, requiredFields) {
  const enabled = Boolean(config?.enabled);
  if (!enabled) return { platform: name, enabled, ok: true, missing: [] };
  const missing = requiredFields.filter((key) => !config?.[key]);
  return { platform: name, enabled, ok: missing.length === 0, missing };
}

function main() {
  const keys = readJson(KEYS_LOCAL, readJson(KEYS_EXAMPLE, null));
  if (!keys) {
    console.error('No social keys config found.');
    process.exit(1);
  }

  const checks = [
    validatePlatform(keys.youtube, 'youtube', ['client_id', 'client_secret', 'refresh_token', 'channel_id']),
    validatePlatform(keys.instagram, 'instagram', ['access_token', 'ig_user_id']),
    validatePlatform(keys.tiktok, 'tiktok', ['client_key', 'client_secret', 'access_token'])
  ];

  console.log('Social key validation');
  for (const check of checks) {
    const status = check.ok ? 'ok' : 'missing_fields';
    console.log(`- ${check.platform}: enabled=${check.enabled} status=${status}`);
    if (!check.ok) {
      console.log(`  missing: ${check.missing.join(', ')}`);
    }
  }

  const source = fs.existsSync(KEYS_LOCAL) ? KEYS_LOCAL : KEYS_EXAMPLE;
  console.log(`Config file: ${source}`);
  if (keys.youtube?.enabled) console.log(`youtube.channel_id=${mask(keys.youtube.channel_id)}`);
  if (keys.instagram?.enabled) console.log(`instagram.ig_user_id=${mask(keys.instagram.ig_user_id)}`);
  if (keys.tiktok?.enabled) console.log(`tiktok.mode=${keys.tiktok?.mode || 'manual_queue'}`);

  const hasFailure = checks.some((c) => !c.ok);
  if (hasFailure) process.exit(1);
}

main();
