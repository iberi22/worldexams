import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const MANIFEST_FILE = path.join(PROJECT_ROOT, 'src', 'content', 'video', 'video-manifest-v41.json');
const QUEUE_FILE = path.join(PROJECT_ROOT, 'video-pipeline', 'queue', 'social-publish-v41.json');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readManifest() {
  if (!fs.existsSync(MANIFEST_FILE)) {
    return { version: '4.1', generated_at: new Date().toISOString(), entries: [] };
  }
  return JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'));
}

function main() {
  const manifest = readManifest();
  const actions = [];

  for (const entry of manifest.entries || []) {
    const status = String(entry.status || '').toLowerCase();
    const hasVideo = Boolean(entry.youtube_id || entry.youtube_url || entry.shorts_youtube_id);
    if (!hasVideo && !(status.includes('generated') || status.includes('pending_publish'))) continue;

    actions.push({
      question_id: entry.question_id,
      protocol_version: entry.protocol_version || '4.1',
      policy: {
        youtube: 'auto',
        instagram: 'auto',
        tiktok: 'manual_queue'
      },
      targets: [
        { platform: 'youtube', mode: 'auto', status: 'pending' },
        { platform: 'instagram', mode: 'auto', status: 'pending' },
        { platform: 'tiktok', mode: 'manual_queue', status: 'pending' }
      ],
      created_at: new Date().toISOString()
    });
  }

  ensureDir(path.dirname(QUEUE_FILE));
  fs.writeFileSync(QUEUE_FILE, JSON.stringify({
    generated_at: new Date().toISOString(),
    count: actions.length,
    actions
  }, null, 2));

  console.log(`✅ Social publish queue generated: ${actions.length}`);
  console.log(`📄 ${QUEUE_FILE}`);
}

main();
