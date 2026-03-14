import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const QUESTIONS_DIR = path.join(PROJECT_ROOT, 'src', 'content', 'questions', 'colombia', 'matematicas');
const MANIFEST_FILE = path.join(PROJECT_ROOT, 'src', 'content', 'video', 'video-manifest-v41.json');
const QUEUE_DIR = path.join(PROJECT_ROOT, 'video-pipeline', 'queue');
const JOBS_DIR = path.join(PROJECT_ROOT, 'video-pipeline', 'jobs');

const args = process.argv.slice(2);
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : null;
const emitJobs = args.includes('--emit-jobs');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function walkMarkdownFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.endsWith('.assets')) continue;
      walkMarkdownFiles(fullPath, acc);
    }
    else if (entry.isFile() && entry.name.endsWith('.md')) acc.push(fullPath);
  }
  return acc;
}

function isV41Bundle(filePath, frontmatter) {
  const protocolVersion = String(frontmatter.protocol_version || '').trim();
  const bundleVersion = String(frontmatter.bundle_version || '').trim();
  const filename = path.basename(filePath).toLowerCase();
  return (
    protocolVersion.startsWith('4') ||
    bundleVersion.startsWith('4') ||
    filename.includes('-pro-v4') ||
    filename.includes('-v4-bundle')
  );
}

function parseQuestionSections(body) {
  return body.split(/^## /m).slice(1);
}

function parseQuestionFromSection(section) {
  const idMatch = section.match(/\*\*ID:\*\*\s*`([^`]+)`/);
  const statementMatch = section.match(/###\s*Enunciado\s*\n([\s\S]*?)(?=###\s*(?:Opciones|Options))/i);
  const explanationMatch = section.match(/###\s*Explicaci[oó]n(?:\s*Pedag[oó]gica)?[^\n]*\n([\s\S]*?)(?=---|$)/i);
  if (!idMatch || !statementMatch) return null;

  const questionId = idMatch[1].trim();
  const statement = statementMatch[1].trim();
  const explanation = explanationMatch ? explanationMatch[1].trim() : '';

  return {
    question_id: questionId,
    statement,
    explanation
  };
}

function loadManifest() {
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

function manifestLookup(manifest) {
  const map = new Map();
  for (const entry of manifest.entries || []) {
    const key = String(entry.question_id || '').trim().toLowerCase();
    if (key) map.set(key, entry);
  }
  return map;
}

function buildJobPayload(question) {
  const script = [
    `Resolvamos en 3 pasos esta pregunta.`,
    `Paso 1: identifica los datos clave del enunciado.`,
    `Paso 2: plantea la ecuación y simplifica.`,
    `Paso 3: verifica el resultado y descarta opciones.`,
    `Respuesta final: ${question.explanation || 'revisa la opción correcta en pantalla'}.`
  ].join(' ');

  return {
    protocol_version: '4.1',
    question_id: question.question_id,
    locale: 'es-CO',
    format: {
      width: 1080,
      height: 1920,
      fps: 30,
      total_seconds: 15,
      segments: {
        intro_seconds: 3,
        explanation_seconds: 9,
        outro_seconds: 3
      }
    },
    branding: {
      intro: ['worldexams', 'saberparatodos'],
      outro: ['worldexams', 'saberparatodos']
    },
    content: {
      statement: question.statement,
      explanation: question.explanation,
      narration_script: script
    },
    audio: {
      tts_engine: 'xtts-v2-local',
      align_engine: 'whisperx',
      fallback_engine: 'piper'
    },
    output_targets: ['youtube_shorts', 'instagram_reels', 'tiktok_manual_queue']
  };
}

function main() {
  const files = walkMarkdownFiles(QUESTIONS_DIR);
  const manifest = loadManifest();
  const lookup = manifestLookup(manifest);
  const pending = [];

  for (const file of files) {
    const parsed = matter.read(file);
    if (!isV41Bundle(file, parsed.data)) continue;
    const sections = parseQuestionSections(parsed.content);
    for (const section of sections) {
      const q = parseQuestionFromSection(section);
      if (!q) continue;

      const existing = lookup.get(String(q.question_id).toLowerCase());
      const hasPublishedVideo = !!(existing?.youtube_id || existing?.youtube_url || existing?.shorts_youtube_id);
      if (hasPublishedVideo) continue;

      pending.push({
        question_id: q.question_id,
        status: existing?.status || 'pending_generation',
        subject: 'matematicas',
        protocol_version: '4.1',
        priority: 'high',
        created_at: new Date().toISOString(),
        payload: buildJobPayload(q)
      });
    }
  }

  const finalQueue = Number.isFinite(limit) && limit > 0 ? pending.slice(0, limit) : pending;
  ensureDir(QUEUE_DIR);
  const queueFile = path.join(QUEUE_DIR, 'pending-v41-math.json');
  fs.writeFileSync(queueFile, JSON.stringify({
    generated_at: new Date().toISOString(),
    count: finalQueue.length,
    items: finalQueue
  }, null, 2));

  if (emitJobs) {
    ensureDir(JOBS_DIR);
    for (const item of finalQueue) {
      const jobPath = path.join(JOBS_DIR, `${item.question_id}.json`);
      fs.writeFileSync(jobPath, JSON.stringify(item.payload, null, 2));
    }
  }

  console.log(`✅ Queue generated: ${finalQueue.length} pending videos`);
  console.log(`📄 ${queueFile}`);
  if (emitJobs) {
    console.log(`📁 Job files emitted in: ${JOBS_DIR}`);
  }
}

main();
