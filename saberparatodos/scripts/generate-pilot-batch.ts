/**
 * generate-pilot-batch.ts
 *
 * WorldExams — Process first N questions from pending-v41-math.json
 * as a pilot batch through the bundle-to-video pipeline.
 *
 * Usage:
 *   npx tsx scripts/generate-pilot-batch.ts
 *   npx tsx scripts/generate-pilot-batch.ts --limit=5
 *   npx tsx scripts/generate-pilot-batch.ts --limit=5 --force
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');
const QUEUE_FILE = path.join(PROJECT_ROOT, 'video-pipeline', 'queue', 'pending-v41-math.json');
const PRODUCTION_QUEUE = path.join(PROJECT_ROOT, 'video-pipeline', 'production-queue.json');

interface QuestionPayload {
  question_id: string;
  locale: string;
  format: { width: number; height: number; fps: number; total_seconds: number };
  branding: { intro: string[]; outro: string[] };
  content: { statement: string; explanation: string; narration_script: string };
  audio: { tts_engine: string; align_engine: string; fallback_engine: string };
  output_targets: string[];
}

interface QueueItem {
  question_id: string;
  status: string;
  subject: string;
  protocol_version: string;
  priority: string;
  created_at: string;
  payload: QuestionPayload;
}

interface BatchResult {
  question_id: string;
  status: 'success' | 'failed' | 'skipped';
  output_path?: string;
  qa_score?: number;
  error?: string;
  duration_ms: number;
}

function readJson<T>(filePath: string, fallback?: T): T | null {
  if (!fs.existsSync(filePath)) return fallback ?? null;
  try { return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T; }
  catch { return fallback ?? null; }
}

function log(msg: string) {
  console.log(`[pilot-batch] ${new Date().toISOString()} ${msg}`);
}

// Run bundle-to-video.ts for a single question via child_process
function runBundleToVideo(questionId: string, force: boolean): Promise<{ ok: boolean; output?: string; qaScore?: number; error?: string }> {
  return new Promise((resolve) => {
    const args = [`npx`, `tsx`, `scripts/bundle-to-video.ts`, `--question=${questionId}`];
    if (force) args.push('--force');

    log(`Spawning: ${args.join(' ')}`);
    const child = spawn(args[0], args.slice(1), {
      cwd: PROJECT_ROOT,
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (d: Buffer) => { stdout += d.toString(); });
    child.stderr?.on('data', (d: Buffer) => { stderr += d.toString(); });

    child.on('close', (code) => {
      const ok = code === 0;
      let output: string | undefined;
      let qaScore: number | undefined;
      let error: string | undefined;

      // Parse output for QA score and output path
      const lines = stdout.split('\n');
      for (const line of lines) {
        const qaMatch = line.match(/QA Score:\s*(\d+)\/100/);
        if (qaMatch) qaScore = parseInt(qaMatch[1]);
        const doneMatch = line.match(/DONE\.\s*Output:\s*(.+)/);
        if (doneMatch) output = doneMatch[1].trim();
      }
      if (!ok) error = stderr.trim() || `exit code ${code}`;

      resolve({ ok, output, qaScore, error });
    });

    child.on('error', (e: Error) => {
      resolve({ ok: false, error: e.message });
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  let limit = 5;
  let force = false;

  for (const arg of args) {
    if (arg.startsWith('--limit=')) limit = parseInt(arg.split('=')[1]);
    else if (arg === '--force') force = true;
  }

  log(`Starting pilot batch — limit=${limit}, force=${force}`);

  // Load queue
  const queue = readJson<{ items: QueueItem[]; count: number }>(QUEUE_FILE);
  if (!queue) { log('ERROR: Cannot read queue file'); process.exit(1); }

  const pendingItems = queue.items
    .filter(item => item.status === 'pending_generation')
    .slice(0, limit);

  log(`Found ${pendingItems.length} pending questions (of ${queue.count} total)`);

  // Initialize production queue if not exists
  if (!fs.existsSync(PRODUCTION_QUEUE)) {
    fs.writeFileSync(PRODUCTION_QUEUE, JSON.stringify([], null, 2));
  }

  const results: BatchResult[] = [];
  let success = 0, failed = 0, skipped = 0;

  for (const item of pendingItems) {
    const { question_id } = item;
    const outPath = path.join(PROJECT_ROOT, 'video-pipeline', 'output', `${question_id}.mp4`);
    const startMs = Date.now();

    // Check if already done
    if (fs.existsSync(outPath) && !force) {
      log(`[SKIP] ${question_id} — already exists`);
      results.push({ question_id, status: 'skipped', output_path: outPath, duration_ms: Date.now() - startMs });
      skipped++;
      continue;
    }

    log(`[PROCESS] ${question_id}`);
    const { ok, output, qaScore, error } = await runBundleToVideo(question_id, force);

    results.push({
      question_id,
      status: ok ? 'success' : 'failed',
      output_path: output,
      qa_score: qaScore,
      error: error,
      duration_ms: Date.now() - startMs,
    });

    if (ok) {
      success++;
      log(`[OK] ${question_id} — QA: ${qaScore}/100`);
    } else {
      failed++;
      log(`[FAIL] ${question_id}: ${error}`);
    }
  }

  // ── Summary ─────────────────────────────────────────────────────────────────
  const totalMs = results.reduce((s, r) => s + r.duration_ms, 0);
  const avgMs = results.length ? Math.round(totalMs / results.length) : 0;
  const qaScores = results.filter(r => r.qa_score !== undefined).map(r => r.qa_score!);
  const avgQA = qaScores.length ? Math.round(qaScores.reduce((s, v) => s + v, 0) / qaScores.length) : 0;

  log('\n=== PILOT BATCH SUMMARY ===');
  log(`Total: ${results.length} | Success: ${success} | Failed: ${failed} | Skipped: ${skipped}`);
  log(`Avg time/question: ${avgMs}ms`);
  log(`Avg QA score: ${avgQA}/100`);
  log('');

  for (const r of results) {
    const icon = r.status === 'success' ? '✅' : r.status === 'skipped' ? '⏭️' : '❌';
    const qaStr = r.qa_score !== undefined ? ` QA=${r.qa_score}/100` : '';
    const errStr = r.error ? ` ERR=${r.error}` : '';
    log(`  ${icon} ${r.question_id}${qaStr}${errStr} (${r.duration_ms}ms)`);
  }

  // Write batch report
  const reportPath = path.join(PROJECT_ROOT, 'video-pipeline', `pilot-batch-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify({
    generated_at: new Date().toISOString(),
    limit,
    force,
    summary: { success, failed, skipped, total: results.length, avg_ms: avgMs, avg_qa: avgQA },
    results,
  }, null, 2));
  log(`\nBatch report: ${reportPath}`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  log(`FATAL: ${e.message}`);
  process.exit(1);
});
