/**
 * video-generation-v2.ts
 *
 * TypeScript integration layer for WorldExams tutorial video generation.
 * Orchestrates:
 *   1. Platform flow capture (capture-exam-platform.js)
 *   2. Tutorial video pipeline (auto-tutorial-pipeline.js)
 *   3. Voice cloning: XTTS v2 (local) or ElevenLabs (cloud)
 *   4. QA validation on final output
 *   5. Output to correct folders
 *
 * Usage:
 *   npx tsx scripts/video-generation-v2.ts --flow=crear-examen
 *   npx tsx scripts/video-generation-v2.ts --flow=simular-examen --voice=elevenlabs
 *   npx tsx scripts/video-generation-v2.ts --flow=all --parallel
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const OUTPUT_ROOT = path.join(PROJECT_ROOT, 'video-pipeline', 'tutorials-v2');

// ─── Types ────────────────────────────────────────────────────────────────────
interface CaptureMeta {
  flow: string;
  captured_at: string;
  platform_url: string;
  steps: CaptureStep[];
}

interface CaptureStep {
  name: string;
  screenshot: string;
  html: string;
  timestamp: string | null;
}

interface TutorialScript {
  flow: string;
  title: string;
  hook: string;
  steps: string[];
  outro: string;
  full_script: string;
  locale: string;
  generated_at: string;
}

interface QAReport {
  flow: string;
  checked_at: string;
  all_passed: boolean;
  passed_count: number;
  total_checks: number;
  checks: QACheck[];
}

interface QACheck {
  check: string;
  passed: boolean;
  detail: string;
}

interface VideoAsset {
  audioPath: string;
  timingsPath: string;
  subtitlesPath: string;
  videoPath: string;
}

interface PipelineResult {
  flow: string;
  ok: boolean;
  captureMeta?: CaptureMeta;
  script?: TutorialScript;
  assets?: VideoAsset;
  qa?: QAReport;
  error?: string;
  outputDir: string;
}

interface VoiceConfig {
  provider: 'xtts' | 'elevenlabs' | 'piper';
  voiceRef?: string;
  elevenlabsApiKey?: string;
  elevenlabsVoiceId?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const FLOWS = ['crear-examen', 'ver-informes', 'dar-feedback', 'simular-examen'] as const;
type FlowName = (typeof FLOWS)[number];

const ENGINE_CONFIG_PATH = path.join(PROJECT_ROOT, 'video-pipeline', 'config', 'local-engines.local.json');

// ─── Argument parsing ─────────────────────────────────────────────────────────
function parseArgs(): {
  flow: FlowName | 'all';
  voice: 'xtts' | 'elevenlabs' | 'piper';
  parallel: boolean;
  reRun: boolean;
  step: 'all' | 'capture' | 'tts' | 'align' | 'render' | 'qa';
} {
  const argv = process.argv.slice(2);
  const args: ReturnType<typeof parseArgs> = {
    flow: 'crear-examen',
    voice: 'xtts',
    parallel: false,
    reRun: false,
    step: 'all',
  };
  for (const arg of argv) {
    const [k, ...rest] = arg.startsWith('--') ? [arg.slice(2), ...(arg.includes('=') ? arg.slice(2).split('=').slice(1) : [])] : ['', ''];
    if (k === 'flow') args.flow = rest[0] as FlowName | 'all';
    else if (k === 'voice') args.voice = rest[0] as 'xtts' | 'elevenlabs' | 'piper';
    else if (k === 'parallel') args.parallel = true;
    else if (k === 're-run') args.reRun = true;
    else if (k === 'step') args.step = rest[0] as 'all' | 'capture' | 'tts' | 'align' | 'render' | 'qa';
  }
  return args;
}

// ─── Shell helpers ────────────────────────────────────────────────────────────
function runCmd(command: string, cwd: string = PROJECT_ROOT, silent = false): { ok: boolean; stdout: string; stderr: string; code: number } {
  try {
    const out = execSync(command, { cwd, encoding: 'utf-8', stdio: silent ? 'pipe' : 'inherit' });
    return { ok: true, stdout: String(out), stderr: '', code: 0 };
  } catch (e: any) {
    return { ok: false, stdout: '', stderr: String(e.message), code: e.status ?? 1 };
  }
}

function spawnCmd(command: string, cwd: string = PROJECT_ROOT): Promise<{ ok: boolean; code: number }> {
  return new Promise((resolve) => {
    const child = spawn(command, [], { cwd, shell: true });
    child.on('close', (code) => resolve({ ok: code === 0, code: code ?? 1 }));
    child.on('error', () => resolve({ ok: false, code: 1 }));
  });
}

// ─── File helpers ─────────────────────────────────────────────────────────────
function readJson<T>(filePath: string, fallback?: T): T | null {
  if (!fs.existsSync(filePath)) return fallback ?? null;
  try { return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T; }
  catch { return fallback ?? null; }
}

function writeJson(filePath: string, data: unknown) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function fileExists(filePath: string): boolean {
  try { return fs.statSync(filePath).isFile(); } catch { return false; }
}

// ─── Voice Config ──────────────────────────────────────────────────────────────
function resolveVoiceConfig(preferred: 'xtts' | 'elevenlabs' | 'piper'): VoiceConfig {
  const config = readJson<{ voice_ref?: string; elevenlabs_api_key?: string; elevenlabs_voice_id?: string }>(ENGINE_CONFIG_PATH, {}) || {};
  return {
    provider: preferred,
    voiceRef: config.voice_ref,
    elevenlabsApiKey: config.elevenlabs_api_key || process.env.ELEVENLABS_API_KEY,
    elevenlabsVoiceId: config.elevenlabs_voice_id || '21m00Tcm4TlvDq8ikWAM',
  };
}

// ─── Step 1: Capture ──────────────────────────────────────────────────────────
async function captureFlow(flow: FlowName): Promise<CaptureMeta> {
  console.log(`\n📸 [capture] Flow: ${flow}`);
  const outDir = path.join(PROJECT_ROOT, 'video-pipeline', 'captures', flow);
  ensureDir(outDir);

  const scriptPath = path.join(PROJECT_ROOT, 'scripts', 'video', 'capture-exam-platform.js');
  const cmd = `node "${scriptPath}" --flow=${flow} --out="${outDir}"`;
  const result = runCmd(cmd);

  const metaPath = path.join(outDir, 'capture-meta.json');
  const meta = readJson<CaptureMeta>(metaPath);
  if (!meta) throw new Error(`Capture failed — no meta at ${metaPath}`);
  console.log(`  ✅ ${meta.steps.length} steps captured`);
  return meta;
}

// ─── Step 2: TTS with voice cloning ──────────────────────────────────────────
function buildNarrationScript(flow: FlowName): TutorialScript {
  const SCRIPTS: Record<string, { title: string; hook: string; steps: string[]; outro: string }> = {
    'crear-examen': {
      title: 'Cómo Crear un Examen en SaberParaTodos',
      hook: '¿Quieres crear tu propio examen en minutos?',
      steps: [
        'Entra a tu panel de control y haz clic en "Nuevo Examen".',
        'Selecciona la materia, el grado y el periodo que necesitas.',
        'Elige las preguntas una por una o deja que el sistema te sugiera automáticamente.',
        'Revisa la vista previa de tu examen y publica cuando estés listo.',
        '¡Listo! Comparte el enlace con tus estudiantes.',
      ],
      outro: 'Síguenos para más tutoriales como este.',
    },
    'ver-informes': {
      title: 'Cómo Ver los Informes de tus Estudiantes',
      hook: 'Mira el rendimiento de tus estudiantes en tiempo real.',
      steps: [
        'Desde el menú lateral, entra en la sección "Informes".',
        'Filtra por fecha, materia o estudiante específico.',
        'Haz clic en el nombre de un estudiante para ver su detalle.',
        'Descarga el informe en PDF o CSV para llevar registro.',
      ],
      outro: 'Los informes se actualizan cada vez que un estudiante completa una práctica.',
    },
    'dar-feedback': {
      title: 'Cómo Dar Feedback Personalizado',
      hook: 'Ayuda a tus estudiantes a mejorar con comentarios personalizados.',
      steps: [
        'Ve a la sección de Feedback desde tu panel.',
        'Selecciona al estudiante al que quieres orientar.',
        'Escribe tu comentario usando el editor de texto.',
        'Agrega recursos adicionales si lo necesitas.',
        'Envía el feedback y el estudiante recibirá una notificación.',
      ],
      outro: 'El feedback en tiempo real marca la diferencia en el aprendizaje.',
    },
    'simular-examen': {
      title: 'Cómo Simular un Examen SABER',
      hook: 'Practica con exámenes tipo ICFES exactamente como en la prueba real.',
      steps: [
        'Entra a la sección de Práctica desde el menú principal.',
        'Selecciona el tipo de examen: Matemáticas, Lectura Crítica, etc.',
        'Elige el grado y el periodo que quieras simular.',
        'Responde cada pregunta cronometrada como en el examen real.',
        'Al terminar, revisa tus resultados detallados con explicaciones.',
      ],
      outro: 'La práctica constante es la clave para mejorar tus resultados.',
    },
  };

  const t = SCRIPTS[flow];
  if (!t) throw new Error(`No script template for flow: ${flow}`);

  const full_script = [t.hook, ...t.steps.map((s, i) => `Paso ${i + 1}: ${s}`), t.outro].join(' ');

  return {
    flow,
    title: t.title,
    hook: t.hook,
    steps: t.steps,
    outro: t.outro,
    full_script,
    locale: 'es-CO',
    generated_at: new Date().toISOString(),
  };
}

function runTTS(flow: FlowName, script: TutorialScript, voiceConfig: VoiceConfig, reRun = false): string {
  const flowOutDir = path.join(OUTPUT_ROOT, flow);
  ensureDir(flowOutDir);
  const audioPath = path.join(flowOutDir, 'audio.mp3');

  if (!reRun && fileExists(audioPath)) {
    console.log(`  ⏭  Audio exists, skipping (--re-run to force)`);
    return audioPath;
  }

  console.log(`  🔊 TTS provider: ${voiceConfig.provider}`);

  if (voiceConfig.provider === 'elevenlabs') {
    runElevenLabsTTS(script.full_script, audioPath, voiceConfig);
  } else if (voiceConfig.provider === 'xtts') {
    runXTTSTTS(script.full_script, audioPath, voiceConfig);
  } else {
    runPiperTTS(script.full_script, audioPath);
  }

  if (!fileExists(audioPath)) throw new Error(`TTS failed — no audio at ${audioPath}`);
  console.log(`  ✅ Audio: ${audioPath}`);
  return audioPath;
}

function runElevenLabsTTS(text: string, outPath: string, cfg: VoiceConfig) {
  const apiKey = cfg.elevenlabsApiKey;
  if (!apiKey) throw new Error('ELEVENLABS_API_KEY not set');
  const voiceId = cfg.elevenlabsVoiceId;

  const { execSync: _exec } = require('child_process');
  // Use curl since no axios dependency
  const cmd = [
    'curl', '-s', '-X', 'POST',
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    '-H', `xi-api-key: ${apiKey}`,
    '-H', 'Content-Type: application/json',
    '-d', JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.8 },
    }),
    '--output', outPath,
  ];
  const result = runCmd(cmd.join(' '));
  if (!result.ok) throw new Error(`ElevenLabs TTS failed: ${result.stderr}`);
}

function runXTTSTTS(text: string, outPath: string, cfg: VoiceConfig) {
  const voiceRef = cfg.voiceRef || 'C:/models/voices/worldexams-speaker.wav';
  const toolsDir = path.join(PROJECT_ROOT, 'tools');
  const cmd = `python "${toolsDir}/xtts_infer.py" --text "${text.replace(/"/g, '\\"')}" --voice "${voiceRef}" --out "${outPath}" --lang es`;
  const result = runCmd(cmd);
  if (!result.ok) throw new Error(`XTTS TTS failed: ${result.stderr}`);
}

function runPiperTTS(text: string, outPath: string) {
  const cmd = `piper --model es-ES-pordee-medium.onnx --output_file "${outPath}" --espeak_data C:/models/piper`;
  // Pipe text via stdin
  const child = spawn('cmd', ['/c', `echo "${text.replace(/"/g, '')}" | piper ...`], { cwd: PROJECT_ROOT });
  if (child.pid) child.kill();
  console.warn('  ⚠ Piper fallback not fully implemented — use XTTS or ElevenLabs');
}

// ─── Step 3: Alignment ─────────────────────────────────────────────────────────
function runAlignment(flow: FlowName, audioPath: string, script: TutorialScript): { timingsPath: string; subtitlesPath: string } {
  const flowOutDir = path.join(OUTPUT_ROOT, flow);
  const timingsPath = path.join(flowOutDir, 'timings.json');
  const subtitlesPath = path.join(flowOutDir, 'subtitles.srt');

  if (fileExists(timingsPath) && fileExists(subtitlesPath)) {
    console.log(`  ⏭  Alignments exist, skipping`);
    return { timingsPath, subtitlesPath };
  }

  const toolsDir = path.join(PROJECT_ROOT, 'tools');
  const cmd = `python "${toolsDir}/whisperx_align.py" --audio "${audioPath}" --text "${script.full_script.replace(/"/g, '\\"')}" --json "${timingsPath}" --srt "${subtitlesPath}"`;
  const result = runCmd(cmd);
  if (!result.ok) {
    console.warn(`  ⚠ Alignment failed, writing fallback timings`);
    writeJson(timingsPath, { fallback: true, flow });
  }
  console.log(`  ✅ Alignment done`);
  return { timingsPath, subtitlesPath };
}

// ─── Step 4: Render ───────────────────────────────────────────────────────────
function runRender(flow: FlowName, assets: VideoAsset): string {
  const flowOutDir = path.join(OUTPUT_ROOT, flow);
  ensureDir(flowOutDir);
  const videoPath = path.join(flowOutDir, 'tutorial.mp4');

  if (!process.argv.includes('--re-render') && fileExists(videoPath)) {
    console.log(`  ⏭  Video exists, skipping (--re-render to force)`);
    return videoPath;
  }

  const jobPath = path.join(flowOutDir, 'render-job.json');
  writeJson(jobPath, {
    protocol_version: '2.0',
    tutorial_id: flow,
    format: { width: 1080, height: 1920, fps: 30 },
    capture_base: path.join(PROJECT_ROOT, 'video-pipeline', 'captures', flow),
    ...assets,
    output_path: videoPath,
  });

  // Use Remotion render via npm
  const cmd = `npm --prefix "${path.join(PROJECT_ROOT, 'video-pipeline', 'remotion')}" run render:tutorial -- --job "${jobPath}" --out "${videoPath}"`;
  console.log(`  🎬 Rendering...`);
  const result = runCmd(cmd, PROJECT_ROOT);
  if (!result.ok) throw new Error(`Render failed: ${result.stderr}`);
  console.log(`  ✅ Video: ${videoPath}`);
  return videoPath;
}

// ─── Step 5: QA ───────────────────────────────────────────────────────────────
function runQA(flow: FlowName, assets: VideoAsset): QAReport {
  const flowOutDir = path.join(OUTPUT_ROOT, flow);
  const qaPath = path.join(flowOutDir, 'qa-report.json');
  const checks: QACheck[] = [];

  // Video file
  const videoExists = fileExists(assets.videoPath);
  const videoSize = videoExists ? fs.statSync(assets.videoPath).size : 0;
  checks.push({ check: 'video_exists', passed: videoExists, detail: assets.videoPath });
  checks.push({ check: 'video_min_size', passed: videoExists && videoSize > 102400, detail: `${videoSize} bytes` });

  // Audio file
  const audioExists = fileExists(assets.audioPath);
  const audioSize = audioExists ? fs.statSync(assets.audioPath).size : 0;
  checks.push({ check: 'audio_exists', passed: audioExists, detail: assets.audioPath });
  checks.push({ check: 'audio_min_size', passed: audioExists && audioSize > 5000, detail: `${audioSize} bytes` });

  // Timings
  checks.push({ check: 'timings_exists', passed: fileExists(assets.timingsPath), detail: assets.timingsPath });

  // Subtitles
  checks.push({ check: 'subtitles_exists', passed: fileExists(assets.subtitlesPath), detail: assets.subtitlesPath });

  // FFprobe validation (video has streams)
  if (videoExists) {
    try {
      const probeOut = execSync(`ffprobe -v quiet -print_format json -show_streams "${assets.videoPath}"`, { encoding: 'utf-8' });
      const streams = JSON.parse(probeOut).streams || [];
      const hasVideo = streams.some((s: any) => s.codec_type === 'video');
      const hasAudio = streams.some((s: any) => s.codec_type === 'audio');
      checks.push({ check: 'has_video_stream', passed: hasVideo, detail: hasVideo ? 'video stream found' : 'NO video stream' });
      checks.push({ check: 'has_audio_stream', passed: hasAudio, detail: hasAudio ? 'audio stream found' : 'NO audio stream' });
    } catch {
      checks.push({ check: 'ffprobe_validation', passed: false, detail: 'ffprobe check failed' });
    }
  }

  const allPassed = checks.every((c) => c.passed);
  const report: QAReport = {
    flow,
    checked_at: new Date().toISOString(),
    all_passed: allPassed,
    passed_count: checks.filter((c) => c.passed).length,
    total_checks: checks.length,
    checks,
  };

  writeJson(qaPath, report);
  console.log(`  ${allPassed ? '✅' : '❌'} QA: ${report.passed_count}/${report.total_checks} passed`);
  if (!allPassed) {
    for (const f of checks.filter((c) => !c.passed)) {
      console.log(`     • ${f.check}: ${f.detail}`);
    }
  }

  return report;
}

// ─── Main Pipeline ────────────────────────────────────────────────────────────
async function generateTutorial(
  flow: FlowName,
  opts: { voice: VoiceConfig; step: string; reRun: boolean }
): Promise<PipelineResult> {
  const outputDir = path.join(OUTPUT_ROOT, flow);
  ensureDir(outputDir);
  const result: PipelineResult = { flow, ok: false, outputDir };

  try {
    // Step 0: Capture platform flows
    if (opts.step === 'all' || opts.step === 'capture') {
      result.captureMeta = await captureFlow(flow);
    }

    // Build script
    const script = buildNarrationScript(flow);
    const scriptPath = path.join(outputDir, 'script.json');
    writeJson(scriptPath, script);
    result.script = script;

    // Step 1: TTS
    if (opts.step === 'all' || opts.step === 'tts') {
      const audioPath = runTTS(flow, script, opts.voice, opts.reRun);
      result.assets = { ...(result.assets ?? {}), audioPath } as VideoAsset;
    }

    // Step 2: Alignment
    if (opts.step === 'all' || opts.step === 'align') {
      const { timingsPath, subtitlesPath } = runAlignment(flow, result.assets!.audioPath, script);
      result.assets = { ...result.assets!, timingsPath, subtitlesPath };
    }

    // Step 3: Render
    if (opts.step === 'all' || opts.step === 'render') {
      const videoPath = runRender(flow, result.assets!);
      result.assets = { ...result.assets!, videoPath };
    }

    // Step 4: QA
    if (opts.step === 'all' || opts.step === 'qa') {
      result.qa = runQA(flow, result.assets!);
      if (!result.qa.all_passed) {
        result.error = 'QA checks failed';
      }
    }

    result.ok = !result.error;
  } catch (e: any) {
    result.ok = false;
    result.error = e.message;
  }

  // Write flow result
  writeJson(path.join(outputDir, 'pipeline-result.json'), result);
  return result;
}

// ─── Entry Point ──────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs();
  const voiceConfig = resolveVoiceConfig(args.voice);
  const flowsToRun = args.flow === 'all' ? [...FLOWS] : [args.flow as FlowName];

  console.log(`\n🎬 Video Generation v2`);
  console.log(`   Flows: ${flowsToRun.join(', ')}`);
  console.log(`   Voice: ${voiceConfig.provider}`);
  console.log(`   Mode:  ${args.parallel ? 'parallel' : 'sequential'}`);
  console.log('─'.repeat(60));

  const results: PipelineResult[] = [];
  const startTime = Date.now();

  if (args.parallel) {
    const promises = flowsToRun.map((flow) =>
      generateTutorial(flow, { voice: voiceConfig, step: args.step, reRun: args.reRun })
    );
    const resolved = await Promise.allSettled(promises);
    for (let i = 0; i < flowsToRun.length; i++) {
      const r = resolved[i];
      results.push(r.status === 'fulfilled' ? r.value : { flow: flowsToRun[i], ok: false, error: String(r.reason), outputDir: '' });
    }
  } else {
    for (const flow of flowsToRun) {
      const r = await generateTutorial(flow, { voice: voiceConfig, step: args.step, reRun: args.reRun });
      results.push(r);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log('📊 GENERATION SUMMARY');
  console.log('='.repeat(60));
  for (const r of results) {
    const dur = r.outputDir ? '' : '';
    console.log(`  ${r.ok ? '✅' : '❌'} ${r.flow}${r.error ? ` — ${r.error}` : ''}`);
    if (r.qa) console.log(`      QA: ${r.qa.passed_count}/${r.qa.total_checks} checks passed`);
  }
  console.log(`\n⏱  Total time: ${elapsed}s`);
  console.log(`📁 Output: ${OUTPUT_ROOT}`);

  const summaryPath = path.join(OUTPUT_ROOT, '_generation-summary.json');
  writeJson(summaryPath, { generated_at: new Date().toISOString(), elapsed_s: parseFloat(elapsed), flows: results });
  console.log(`📄 Summary: ${summaryPath}`);

  const failedCount = results.filter((r) => !r.ok).length;
  process.exit(failedCount > 0 ? 1 : 0);
}

main().catch((e: any) => {
  console.error(e);
  process.exit(1);
});
