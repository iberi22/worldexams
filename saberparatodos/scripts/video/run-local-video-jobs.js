import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const DEFAULT_JOBS_ROOT = path.join(
  PROJECT_ROOT,
  'src',
  'content',
  'questions',
  'colombia',
  'matematicas',
  'grado-11',
  'periodo-1'
);
const MANIFEST_FILE = path.join(PROJECT_ROOT, 'src', 'content', 'video', 'video-manifest-v41.json');
const ENGINES_LOCAL = path.join(PROJECT_ROOT, 'video-pipeline', 'config', 'local-engines.local.json');
const ENGINES_EXAMPLE = path.join(PROJECT_ROOT, 'video-pipeline', 'config', 'local-engines.example.json');

function parseArgs(argv) {
  const args = {};
  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [k, ...rest] = arg.slice(2).split('=');
    args[k] = rest.length ? rest.join('=') : true;
  }
  return args;
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function findJobFiles(rootDir) {
  const out = [];
  const stack = [rootDir];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith('.json') && fullPath.includes(`${path.sep}jobs${path.sep}`)) {
        out.push(fullPath);
      }
    }
  }
  return out.sort();
}

function replaceTokens(template, replacements) {
  return Object.entries(replacements).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value ?? ''));
  }, template);
}

function runCommand(command, dryRun) {
  if (!command) return { ok: true, skipped: true, code: 0 };
  if (dryRun) {
    console.log(`[dry-run] ${command}`);
    return { ok: true, skipped: false, code: 0 };
  }
  const proc = spawnSync(command, {
    cwd: PROJECT_ROOT,
    shell: true,
    stdio: 'inherit'
  });
  return {
    ok: proc.status === 0,
    skipped: false,
    code: proc.status
  };
}

function loadManifest() {
  const fallback = {
    version: '4.1',
    generated_at: new Date().toISOString(),
    defaults: {
      youtube_channel_url: 'https://www.youtube.com/@worldexams',
      instagram_url: '',
      tiktok_url: ''
    },
    entries: []
  };
  return readJson(MANIFEST_FILE, fallback);
}

function upsertManifestStatus(manifest, questionId, patch) {
  const key = String(questionId || '').trim().toLowerCase();
  if (!key) return;
  const entries = manifest.entries || [];
  const idx = entries.findIndex((e) => String(e.question_id || '').trim().toLowerCase() === key);
  const next = {
    ...(idx >= 0 ? entries[idx] : {}),
    question_id: questionId,
    protocol_version: (idx >= 0 ? entries[idx].protocol_version : null) || '4.1',
    ...patch,
    updated_at: new Date().toISOString()
  };
  if (idx >= 0) entries[idx] = next;
  else entries.push(next);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const dryRun = Boolean(args['dry-run']);
  const limit = args.limit ? Number(args.limit) : null;
  const singleJob = args.job ? path.resolve(PROJECT_ROOT, String(args.job)) : null;
  const jobsRoot = args.root ? path.resolve(PROJECT_ROOT, String(args.root)) : DEFAULT_JOBS_ROOT;
  const engines = readJson(ENGINES_LOCAL, readJson(ENGINES_EXAMPLE, { commands: {} }));

  if (!engines?.commands) {
    console.error('Missing engine commands config. Expected video-pipeline/config/local-engines.local.json');
    process.exit(1);
  }

  if (!singleJob && !fs.existsSync(jobsRoot)) {
    console.error(`Jobs root not found: ${jobsRoot}`);
    process.exit(1);
  }

  const jobs = singleJob ? [singleJob] : findJobFiles(jobsRoot);
  const selected = Number.isFinite(limit) && limit > 0 ? jobs.slice(0, limit) : jobs;
  const manifest = loadManifest();
  let okCount = 0;
  let failCount = 0;

  for (const jobPath of selected) {
    const job = readJson(jobPath);
    if (!job?.question_id) continue;

    const assetsDir = path.dirname(path.dirname(jobPath));
    const outputs = job.outputs || {};
    const audioPath = path.join(assetsDir, outputs.audio_path || `audio/${job.question_id}.mp3`);
    const timingsPath = path.join(assetsDir, outputs.timings_path || `timings/${job.question_id}.json`);
    const subtitlesPath = path.join(assetsDir, outputs.subtitles_path || `subtitles/${job.question_id}.srt`);
    const videoPath = path.join(assetsDir, outputs.final_video_path || `renders/${job.question_id}.mp4`);

    ensureDir(path.dirname(audioPath));
    ensureDir(path.dirname(timingsPath));
    ensureDir(path.dirname(subtitlesPath));
    ensureDir(path.dirname(videoPath));

    const replacements = {
      JOB_PATH: jobPath,
      AUDIO_PATH: audioPath,
      TIMINGS_PATH: timingsPath,
      SUBTITLES_PATH: subtitlesPath,
      VIDEO_PATH: videoPath,
      VOICE_REF: engines.voice_ref || '',
      NARRATION_SCRIPT: String(job?.content?.narration_script || '').replace(/"/g, '\\"')
    };

    console.log(`\n>>> Processing ${job.question_id}`);

    const ttsResult = fs.existsSync(audioPath)
      ? { ok: true, skipped: true, code: 0 }
      : runCommand(replaceTokens(engines.commands.tts || '', replacements), dryRun);
    if (!ttsResult.ok) {
      failCount += 1;
      job.status = 'failed_tts';
      job.last_error = 'tts_failed';
      upsertManifestStatus(manifest, job.question_id, { status: 'failed_tts' });
      writeJson(jobPath, { ...job, updated_at: new Date().toISOString() });
      continue;
    }

    const alignNeeded = !fs.existsSync(timingsPath) || !fs.existsSync(subtitlesPath);
    const alignResult = alignNeeded
      ? runCommand(replaceTokens(engines.commands.align || '', replacements), dryRun)
      : { ok: true, skipped: true, code: 0 };
    if (!alignResult.ok) {
      failCount += 1;
      job.status = 'pending_alignment';
      job.last_error = 'alignment_failed';
      upsertManifestStatus(manifest, job.question_id, { status: 'pending_alignment' });
      writeJson(jobPath, { ...job, updated_at: new Date().toISOString() });
      continue;
    }

    const renderResult = fs.existsSync(videoPath)
      ? { ok: true, skipped: true, code: 0 }
      : runCommand(replaceTokens(engines.commands.render || '', replacements), dryRun);
    if (!renderResult.ok) {
      failCount += 1;
      job.status = 'failed_render';
      job.last_error = 'render_failed';
      upsertManifestStatus(manifest, job.question_id, { status: 'failed_render' });
      writeJson(jobPath, { ...job, updated_at: new Date().toISOString() });
      continue;
    }

    const isGenerated = dryRun || fs.existsSync(videoPath);
    if (isGenerated) {
      okCount += 1;
      job.status = 'generated';
      job.last_error = null;
      job.generated_at = new Date().toISOString();
      upsertManifestStatus(manifest, job.question_id, { status: 'generated' });
      writeJson(jobPath, { ...job, updated_at: new Date().toISOString() });
    } else {
      failCount += 1;
      job.status = 'failed_render';
      job.last_error = 'video_not_found';
      upsertManifestStatus(manifest, job.question_id, { status: 'failed_render' });
      writeJson(jobPath, { ...job, updated_at: new Date().toISOString() });
    }
  }

  manifest.generated_at = new Date().toISOString();
  writeJson(MANIFEST_FILE, manifest);

  console.log(`\nDone. generated=${okCount} failed=${failCount} total=${selected.length}`);
  console.log(`Manifest: ${MANIFEST_FILE}`);
}

main();
