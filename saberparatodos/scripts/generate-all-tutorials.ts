/**
 * generate-all-tutorials.ts
 *
 * Generates all 4 tutorial type videos sequentially or in parallel.
 * Orchestrates the full video-generation-v2 pipeline for each flow,
 * then produces a summary report.
 *
 * Usage:
 *   npx tsx scripts/generate-all-tutorials.ts
 *   npx tsx scripts/generate-all-tutorials.ts --parallel
 *   npx tsx scripts/generate-all-tutorials.ts --flow=crear-examen --flow=ver-informes
 *   npx tsx scripts/generate-all-tutorials.ts --dry-run
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const OUTPUT_ROOT = path.join(PROJECT_ROOT, 'video-pipeline', 'tutorials-v2');
const SUMMARY_FILE = path.join(OUTPUT_ROOT, '_all-tutorials-report.json');

// ─── Types ────────────────────────────────────────────────────────────────────
interface TutorialResult {
  flow: string;
  title: string;
  ok: boolean;
  outputDir: string;
  videoPath?: string;
  audioPath?: string;
  qaReport?: QAReport;
  error?: string;
  duration_s?: number;
  generatedAt: string;
}

interface QAReport {
  all_passed: boolean;
  passed_count: number;
  total_checks: number;
  checks: Array<{ check: string; passed: boolean; detail: string }>;
}

interface PipelineSummary {
  generated_at: string;
  total_flows: number;
  succeeded: number;
  failed: number;
  elapsed_s: number;
  mode: 'sequential' | 'parallel';
  tutorials: TutorialResult[];
}

// ─── Flow definitions ────────────────────────────────────────────────────────
const TUTORIAL_FLOWS: Array<{ id: string; title: string; subject: string; priority: 'high' | 'medium' }> = [
  {
    id: 'crear-examen',
    title: 'Cómo Crear un Examen en SaberParaTodos',
    subject: 'platform-guide',
    priority: 'high',
  },
  {
    id: 'ver-informes',
    title: 'Cómo Ver los Informes de tus Estudiantes',
    subject: 'platform-guide',
    priority: 'high',
  },
  {
    id: 'dar-feedback',
    title: 'Cómo Dar Feedback Personalizado a tus Estudiantes',
    subject: 'platform-guide',
    priority: 'medium',
  },
  {
    id: 'simular-examen',
    title: 'Cómo Simular un Examen SABER',
    subject: 'platform-guide',
    priority: 'high',
  },
];

// ─── Argument parsing ─────────────────────────────────────────────────────────
function parseArgs(): {
  flows: string[];
  parallel: boolean;
  dryRun: boolean;
  voice: 'xtts' | 'elevenlabs' | 'piper';
  reRun: boolean;
  skipCapture: boolean;
  skipTts: boolean;
  skipRender: boolean;
  skipQa: boolean;
} {
  const argv = process.argv.slice(2);
  const args = {
    flows: [...TUTORIAL_FLOWS.map((f) => f.id)],
    parallel: false,
    dryRun: false,
    voice: 'xtts' as 'xtts' | 'elevenlabs' | 'piper',
    reRun: false,
    skipCapture: false,
    skipTts: false,
    skipRender: false,
    skipQa: false,
  };

  for (const arg of argv) {
    if (arg === '--parallel') args.parallel = true;
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg.startsWith('--flow=')) args.flows = [arg.split('=')[1]];
    else if (arg === '--voice=elevenlabs') args.voice = 'elevenlabs';
    else if (arg === '--voice=xtts') args.voice = 'xtts';
    else if (arg === '--re-run') args.reRun = true;
    else if (arg === '--skip-capture') args.skipCapture = true;
    else if (arg === '--skip-tts') args.skipTts = true;
    else if (arg === '--skip-render') args.skipRender = true;
    else if (arg === '--skip-qa') args.skipQa = true;
  }
  return args;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath: string, data: unknown) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function fileExists(p: string): boolean {
  try { return fs.statSync(p).isFile(); } catch { return false; }
}

function getVideoFile(flowDir: string): string | null {
  const candidates = ['tutorial.mp4', 'tutorial-final.mp4', 'output.mp4'];
  for (const c of candidates) {
    const p = path.join(flowDir, c);
    if (fileExists(p)) return p;
  }
  return null;
}

function runCmd(command: string, cwd: string = PROJECT_ROOT): { ok: boolean; stdout: string; stderr: string; code: number } {
  try {
    const out = execSync(command, { cwd, encoding: 'utf-8', stdio: 'pipe' });
    return { ok: true, stdout: String(out), stderr: '', code: 0 };
  } catch (e: any) {
    return { ok: false, stdout: '', stderr: String(e.message), code: e.status ?? 1 };
  }
}

// ─── Run a single tutorial generation ─────────────────────────────────────────
function runTutorialGeneration(
  flowId: string,
  opts: {
    dryRun: boolean;
    voice: 'xtts' | 'elevenlabs' | 'piper';
    reRun: boolean;
    skipCapture: boolean;
    skipTts: boolean;
    skipRender: boolean;
    skipQa: boolean;
  }
): TutorialResult {
  const startMs = Date.now();
  const flowDef = TUTORIAL_FLOWS.find((f) => f.id === flowId)!;
  const outputDir = path.join(OUTPUT_ROOT, flowId);
  ensureDir(outputDir);

  const result: TutorialResult = {
    flow: flowId,
    title: flowDef.title,
    ok: false,
    outputDir,
    generatedAt: new Date().toISOString(),
  };

  if (opts.dryRun) {
    console.log(`  [DRY RUN] Would generate tutorial: ${flowId}`);
    result.ok = true;
    return result;
  }

  console.log(`\n  Processing: ${flowId}`);
  const flowOutDir = path.join(outputDir);
  ensureDir(flowOutDir);

  // Step flags
  const steps = {
    capture: !opts.skipCapture,
    tts: !opts.skipTts,
    render: !opts.skipRender,
    qa: !opts.skipQa,
  };
  const stepArg = steps.capture && !steps.tts ? 'capture'
    : !steps.capture && steps.tts && !steps.render ? 'tts'
    : !steps.capture && !steps.tts && steps.render && !steps.qa ? 'render'
    : !steps.capture && !steps.tts && !steps.render && steps.qa ? 'qa'
    : 'all';

  // Run the video-generation-v2 pipeline
  const voiceArg = `--voice=${opts.voice}`;
  const reRunArg = opts.reRun ? '--re-run' : '';
  const cmd = `npx tsx "${path.join(PROJECT_ROOT, 'scripts', 'video-generation-v2.ts')}" --flow=${flowId} ${voiceArg} ${reRunArg} --step=${stepArg}`;

  const cmdResult = runCmd(cmd, PROJECT_ROOT);

  if (!cmdResult.ok) {
    result.ok = false;
    result.error = `Pipeline failed: ${cmdResult.stderr}`;
    result.duration_s = (Date.now() - startMs) / 1000;
    writeJson(path.join(outputDir, 'pipeline-result.json'), result);
    return result;
  }

  // Read the result from the v2 pipeline output
  const pipelineResultPath = path.join(outputDir, 'pipeline-result.json');
  if (fileExists(pipelineResultPath)) {
    try {
      const pipelineResult = JSON.parse(fs.readFileSync(pipelineResultPath, 'utf-8'));
      result.ok = pipelineResult.ok ?? false;
      result.error = pipelineResult.error;
      result.videoPath = pipelineResult.assets?.videoPath;
      result.audioPath = pipelineResult.assets?.audioPath;
      result.qaReport = pipelineResult.qa;
    } catch {
      result.ok = true; // partial success
    }
  } else {
    // Fallback: try to discover output files
    const videoPath = getVideoFile(outputDir);
    if (videoPath) {
      result.ok = true;
      result.videoPath = videoPath;
    }
  }

  result.duration_s = (Date.now() - startMs) / 1000;

  if (result.ok) {
    console.log(`  ✅ ${flowId} done (${result.duration_s.toFixed(1)}s)`);
    if (result.videoPath) console.log(`     Video: ${path.basename(result.videoPath)}`);
    if (result.qaReport) console.log(`     QA: ${result.qaReport.passed_count}/${result.qaReport.total_checks} checks passed`);
  } else {
    console.log(`  ❌ ${flowId} failed: ${result.error}`);
  }

  writeJson(path.join(outputDir, 'pipeline-result.json'), result);
  return result;
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs();
  const flowsToRun = TUTORIAL_FLOWS.filter((f) => args.flows.includes(f.id));

  if (flowsToRun.length === 0) {
    console.error('No valid flows specified.');
    console.error(`Available: ${TUTORIAL_FLOWS.map((f) => f.id).join(', ')}`);
    process.exit(1);
  }

  console.log(`\n🎬 Generate All Tutorials`);
  console.log(`   Flows:    ${flowsToRun.map((f) => f.id).join(', ')}`);
  console.log(`   Voice:    ${args.voice}`);
  console.log(`   Mode:     ${args.parallel ? 'parallel' : 'sequential'}`);
  console.log(`   Dry run:  ${args.dryRun}`);
  console.log(`   Re-run:   ${args.reRun}`);
  console.log(`   Steps:    ${Object.entries({ capture: !args.skipCapture, tts: !args.skipTts, render: !args.skipRender, qa: !args.skipQa }).filter(([, v]) => v).map(([k]) => k).join(', ') || 'all'}`);

  if (args.dryRun) {
    console.log('\n[DRY RUN MODE — no actual generation will occur]');
  }

  console.log('\n' + '─'.repeat(60));

  const startTime = Date.now();
  const results: TutorialResult[] = [];

  if (args.parallel) {
    console.log('\n🚀 Running all flows in parallel...');
    const { default: pLimit } = await import('p-limit').catch(() => ({ default: (n: number) => (fn: () => unknown) => fn() }));
    const limit = pLimit(2); // max 2 concurrent

    const tasks = flowsToRun.map((flow) =>
      limit(() => runTutorialGeneration(flow.id, args))
    );
    const settled = await Promise.allSettled(tasks);
    for (let i = 0; i < flowsToRun.length; i++) {
      const r = settled[i];
      results.push(r.status === 'fulfilled' ? (r.value as TutorialResult) : {
        flow: flowsToRun[i].id, title: flowsToRun[i].title, ok: false,
        outputDir: '', error: String(r.reason), generatedAt: new Date().toISOString(),
      });
    }
  } else {
    console.log('\n🔄 Running flows sequentially...');
    for (const flow of flowsToRun) {
      const r = runTutorialGeneration(flow.id, args);
      results.push(r);
    }
  }

  const elapsed_s = (Date.now() - startTime) / 1000;
  const succeeded = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;

  // ── Build Summary Report ─────────────────────────────────────────────────
  const summary: PipelineSummary = {
    generated_at: new Date().toISOString(),
    total_flows: flowsToRun.length,
    succeeded,
    failed,
    elapsed_s,
    mode: args.parallel ? 'parallel' : 'sequential',
    tutorials: results,
  };

  writeJson(SUMMARY_FILE, summary);

  // ── Print Report ────────────────────────────────────────────────────────
  console.log('\n' + '='.repeat(60));
  console.log('📊 TUTORIAL GENERATION REPORT');
  console.log('='.repeat(60));

  for (const r of results) {
    const icon = r.ok ? '✅' : '❌';
    const dur = r.duration_s ? `(${r.duration_s.toFixed(1)}s)` : '';
    console.log(`\n  ${icon} ${r.flow} ${dur}`);
    console.log(`     Title:  ${r.title}`);
    if (r.videoPath) console.log(`     Video:  ${path.basename(r.videoPath)}`);
    if (r.qaReport) {
      const icon2 = r.qaReport.all_passed ? '✅' : '⚠';
      console.log(`     QA:     ${icon2} ${r.qaReport.passed_count}/${r.qaReport.total_checks} checks`);
    }
    if (!r.ok && r.error) console.log(`     Error:  ${r.error}`);
  }

  console.log('\n' + '-'.repeat(60));
  console.log(`  Total:    ${flowsToRun.length} tutorials`);
  console.log(`  Succeeded: ${succeeded}`);
  console.log(`  Failed:    ${failed}`);
  console.log(`  Duration: ${elapsed_s.toFixed(1)}s`);
  console.log(`\n📄 Full report: ${SUMMARY_FILE}`);
  console.log(`📁 All outputs: ${OUTPUT_ROOT}`);

  if (failed > 0) {
    console.log('\n⚠  Some tutorials failed. Run with --re-run to retry failed ones.');
    process.exit(1);
  }

  process.exit(0);
}

main().catch((e: any) => {
  console.error(e);
  process.exit(1);
});
