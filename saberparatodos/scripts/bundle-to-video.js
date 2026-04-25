/**
 * bundle-to-video.js
 * Connect WorldExams math bundle to video generation pipeline
 * 
 * Usage: node scripts/bundle-to-video.js --question_id=CO-MAT-10-real-numbers-001-PRO-v1 --limit=1
 */

import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const QUEUE_FILE = path.join(PROJECT_ROOT, 'video-pipeline', 'queue', 'pending-v41-math.json');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'video-pipeline', 'output');
const PRODUCTION_QUEUE = path.join(PROJECT_ROOT, 'video-pipeline', 'production-queue.json');
const FALLBACK_SCRIPT = path.join(PROJECT_ROOT, 'scripts', 'video', 'generate-videos-fallback.py');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback;
  try { return JSON.parse(fs.readFileSync(filePath, 'utf-8')); }
  catch { return fallback; }
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function runCmd(cmd, args = [], cwd = PROJECT_ROOT) {
  const result = spawnSync(cmd, args, { cwd, encoding: 'utf-8', stdio: 'pipe' });
  return { ok: result.status === 0, stdout: result.stdout, stderr: result.stderr };
}

function initProductionQueue() {
  const queue = readJson(PRODUCTION_QUEUE, { items: [], generated_at: new Date().toISOString() });
  return queue;
}

function addToProductionQueue(questionId, status, qaScore = null, outputPath = null) {
  const queue = initProductionQueue();
  const idx = queue.items.findIndex(i => i.question_id === questionId);
  const entry = {
    question_id: questionId,
    status,
    qa_score: qaScore,
    output_path: outputPath,
    updated_at: new Date().toISOString()
  };
  if (idx >= 0) queue.items[idx] = entry;
  else queue.items.push(entry);
  writeJson(PRODUCTION_QUEUE, queue);
  return entry;
}

async function generateVideo(question) {
  const qid = question.question_id;
  const payload = question.payload || {};
  const content = payload.content || {};
  
  const statement = content.statement || '';
  const explanation = content.explanation || '';
  const narration_script = content.narration_script || '';
  
  console.log(`\n🎬 Generating video for: ${qid}`);
  console.log(`   Statement: ${statement.substring(0, 60)}...`);
  
  // Create job file for generate-videos-fallback.py
  const job = {
    question_id: qid,
    status: 'pending',
    format: payload.format || { width: 1080, height: 1920, total_seconds: 15 },
    content: { statement, explanation },
    outputs: {
      audio_path: `audio/${qid}.mp3`,
      timings_path: `timings/${qid}.json`,
      subtitles_path: `subtitles/${qid}.srt`,
      final_video_path: `renders/${qid}.mp4`
    }
  };
  
  // Create .assets directory structure
  const bundleDir = path.join(PROJECT_ROOT, 'src', 'content', 'questions', 'colombia', 'matematicas', 
    'grado-11', 'periodo-1', 'numeros-reales', `${qid}.assets`);
  ensureDir(bundleDir);
  ensureDir(path.join(bundleDir, 'audio'));
  ensureDir(path.join(bundleDir, 'timings'));
  ensureDir(path.join(bundleDir, 'subtitles'));
  ensureDir(path.join(bundleDir, 'renders'));
  
  const jobPath = path.join(bundleDir, 'job.json');
  writeJson(jobPath, job);
  
  console.log(`   Job file: ${jobPath}`);
  
  // Run generate-videos-fallback.py
  const result = runCmd('python', [FALLBACK_SCRIPT, '--job', jobPath, '--force']);
  
  if (result.ok) {
    console.log(`   ✅ Video generated`);
    addToProductionQueue(qid, 'generated');
    return { ok: true, jobPath };
  } else {
    console.log(`   ❌ Failed: ${result.stderr}`);
    addToProductionQueue(qid, 'failed');
    return { ok: false, error: result.stderr };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const limitArg = args.find(a => a.startsWith('--limit='));
  const qidArg = args.find(a => a.startsWith('--question_id='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : 1;
  
  ensureDir(OUTPUT_DIR);
  
  const queue = readJson(QUEUE_FILE);
  const items = queue.items || [];
  
  console.log(`\n📋 Bundle-to-Video Pipeline`);
  console.log(`   Total pending: ${items.length}`);
  console.log(`   Limit: ${limit}`);
  console.log('─'.repeat(50));
  
  const toProcess = qidArg 
    ? items.filter(i => i.question_id === qidArg.split('=')[1])
    : items.slice(0, limit);
  
  for (const item of toProcess) {
    await generateVideo(item);
  }
  
  console.log(`\n✅ Pipeline complete. Processed ${toProcess.length} questions.`);
}

main().catch(console.error);