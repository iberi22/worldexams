import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const QUESTIONS_ROOT = path.join(PROJECT_ROOT, 'src', 'content', 'questions', 'colombia', 'matematicas', 'grado-11', 'periodo-1');
const MANIFEST_FILE = path.join(PROJECT_ROOT, 'src', 'content', 'video', 'video-manifest-v41.json');

function parseArgs(argv) {
  const args = {};
  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [k, ...rest] = arg.slice(2).split('=');
    args[k] = rest.length ? rest.join('=') : true;
  }
  return args;
}

function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function findAssetsDirs(rootDir) {
  const out = [];
  if (!fs.existsSync(rootDir)) return out;
  const stack = [rootDir];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.endsWith('.md.assets')) out.push(fullPath);
        else stack.push(fullPath);
      }
    }
  }
  return out;
}

function loadPublishMap(filePath, field) {
  const content = readJson(filePath, { links: [] });
  const map = new Map();
  for (const item of content.links || []) {
    const qid = String(item.question_id || '').trim().toLowerCase();
    if (!qid) continue;
    const url = item[field] || null;
    const status = item.status || null;
    map.set(qid, { url, status });
  }
  return map;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const rootDir = args.root ? path.resolve(PROJECT_ROOT, String(args.root)) : QUESTIONS_ROOT;
  const manifest = readJson(MANIFEST_FILE, {
    version: '4.1',
    generated_at: new Date().toISOString(),
    defaults: {
      youtube_channel_url: 'https://www.youtube.com/@worldexams',
      instagram_url: '',
      tiktok_url: ''
    },
    entries: []
  });

  const entries = manifest.entries || [];
  const byId = new Map(entries.map((e) => [String(e.question_id || '').trim().toLowerCase(), e]));
  let touched = 0;

  for (const assetsDir of findAssetsDirs(rootDir)) {
    const yMap = loadPublishMap(path.join(assetsDir, 'publish', 'youtube-links.json'), 'youtube_url');
    const iMap = loadPublishMap(path.join(assetsDir, 'publish', 'instagram-links.json'), 'instagram_url');
    const tMap = loadPublishMap(path.join(assetsDir, 'publish', 'tiktok-links.json'), 'tiktok_url');

    const qids = new Set([...yMap.keys(), ...iMap.keys(), ...tMap.keys()]);
    for (const qid of qids) {
      const current = byId.get(qid);
      if (!current) continue;

      const y = yMap.get(qid)?.url || current.youtube_url;
      const i = iMap.get(qid)?.url || current.instagram_url;
      const t = tMap.get(qid)?.url || current.tiktok_url;
      const nextStatus = y || i || t ? 'published' : current.status;
      const hasChanges = y !== current.youtube_url || i !== current.instagram_url || t !== current.tiktok_url || nextStatus !== current.status;
      if (!hasChanges) continue;

      byId.set(qid, {
        ...current,
        youtube_url: y || undefined,
        instagram_url: i || undefined,
        tiktok_url: t || undefined,
        status: nextStatus,
        updated_at: new Date().toISOString()
      });
      touched += 1;
    }
  }

  manifest.entries = Array.from(byId.values()).sort((a, b) => String(a.question_id).localeCompare(String(b.question_id)));
  manifest.generated_at = new Date().toISOString();
  writeJson(MANIFEST_FILE, manifest);

  console.log(`Synced publish links to manifest. updated_entries=${touched}`);
  console.log(`Manifest: ${MANIFEST_FILE}`);
}

main();
