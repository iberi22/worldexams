import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const MANIFEST_FILE = path.join(PROJECT_ROOT, 'src', 'content', 'video', 'video-manifest-v41.json');

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    const [k, ...rest] = arg.split('=');
    if (!k.startsWith('--')) continue;
    const key = k.slice(2);
    out[key] = rest.join('=');
  }
  return out;
}

function readManifest() {
  if (!fs.existsSync(MANIFEST_FILE)) {
    return {
      version: '4.1',
      generated_at: new Date().toISOString(),
      defaults: {
        youtube_channel_url: 'https://www.youtube.com/@worldexams',
        instagram_url: '',
        tiktok_url: ''
      },
      entries: []
    };
  }
  return JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'));
}

function writeManifest(data) {
  const dir = path.dirname(MANIFEST_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(data, null, 2));
}

function updatePublishFile(filePath, questionId, patch) {
  if (!fs.existsSync(filePath)) return;
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const links = Array.isArray(content.links) ? content.links : [];
  const idx = links.findIndex((l) => String(l.question_id || '').toLowerCase() === questionId.toLowerCase());
  if (idx === -1) return;
  links[idx] = { ...links[idx], ...patch, updated_at: new Date().toISOString() };
  fs.writeFileSync(filePath, JSON.stringify({ ...content, links, updated_at: new Date().toISOString() }, null, 2));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const questionId = String(args.question_id || '').trim();
  if (!questionId) {
    console.error('❌ Missing --question_id');
    process.exit(1);
  }

  const manifest = readManifest();
  const entries = manifest.entries || [];
  const idx = entries.findIndex((e) => String(e.question_id || '').toLowerCase() === questionId.toLowerCase());

  const previous = idx >= 0 ? entries[idx] : {};
  const next = {
    ...previous,
    question_id: questionId,
    protocol_version: args.protocol_version || previous.protocol_version || '4.1',
    subject: args.subject || previous.subject || 'matematicas',
    grade: args.grade ? Number(args.grade) : previous.grade,
    topic: args.topic || previous.topic,
    youtube_id: args.youtube_id || previous.youtube_id,
    youtube_url: args.youtube_url || previous.youtube_url,
    shorts_youtube_id: args.shorts_youtube_id || previous.shorts_youtube_id,
    instagram_url: args.instagram_url || previous.instagram_url,
    tiktok_url: args.tiktok_url || previous.tiktok_url,
    bundle_assets_path: args.bundle_assets_path || previous.bundle_assets_path,
    status: args.status || previous.status || 'pending_generation',
    updated_at: new Date().toISOString()
  };

  if (idx >= 0) entries[idx] = next;
  else entries.push(next);

  const updated = {
    version: manifest.version || '4.1',
    generated_at: new Date().toISOString(),
    defaults: manifest.defaults || {
      youtube_channel_url: 'https://www.youtube.com/@worldexams',
      instagram_url: '',
      tiktok_url: ''
    },
    entries
  };

  writeManifest(updated);

  const resolved = idx >= 0 ? entries[idx] : next;
  const assetsPath = resolved.bundle_assets_path ? path.join(PROJECT_ROOT, resolved.bundle_assets_path) : null;
  if (assetsPath && fs.existsSync(assetsPath)) {
    updatePublishFile(path.join(assetsPath, 'publish', 'youtube-links.json'), questionId, {
      youtube_url: next.youtube_url || null,
      status: next.status
    });
    updatePublishFile(path.join(assetsPath, 'publish', 'instagram-links.json'), questionId, {
      instagram_url: next.instagram_url || null,
      status: next.status
    });
    updatePublishFile(path.join(assetsPath, 'publish', 'tiktok-links.json'), questionId, {
      tiktok_url: next.tiktok_url || null,
      status: next.status
    });
  }

  console.log(`✅ Manifest updated for ${questionId}`);
}

main();
