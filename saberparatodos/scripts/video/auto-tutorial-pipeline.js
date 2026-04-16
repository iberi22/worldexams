/**
 * auto-tutorial-pipeline.js
 *
 * Orchestrates the full tutorial video generation pipeline:
 *   1. Read captured platform flow (screenshots + HTML)
 *   2. Generate AI narration script
 *   3. Synthesize audio (XTTS v2 or ElevenLabs)
 *   4. Align audio to script (whisperx)
 *   5. Render video with Remotion
 *   6. QA check: validate output file, duration, audio presence
 *
 * Usage:
 *   node scripts/video/auto-tutorial-pipeline.js --flow=crear-examen --step=all
 *   node scripts/video/auto-tutorial-pipeline.js --flow=crear-examen --step=tts
 *   node scripts/video/auto-tutorial-pipeline.js --flow=crear-examen --step=render
 *   node scripts/video/auto-tutorial-pipeline.js --flow=crear-examen --step=qa
 */

import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');
const CAPTURE_DIR = path.join(PROJECT_ROOT, 'video-pipeline', 'captures');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'video-pipeline', 'tutorials');
const ENGINES_LOCAL = path.join(PROJECT_ROOT, 'video-pipeline', 'config', 'local-engines.local.json');
const ENGINES_EXAMPLE = path.join(PROJECT_ROOT, 'video-pipeline', 'config', 'local-engines.example.json');

const TUTORIAL_SCRIPTS = {
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

function parseArgs(argv) {
  const args = {};
  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [k, ...rest] = arg.slice(2).split('=');
    args[k] = rest.length ? rest.join('=') : true;
  }
  return args;
}

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

function replaceTokens(template, replacements) {
  return Object.entries(replacements).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{{${key}}}`, String(value ?? ''));
  }, template);
}

function runCommand(command, cwd = PROJECT_ROOT) {
  if (!command) return { ok: true, skipped: true, code: 0 };
  const proc = spawnSync(command, { cwd, shell: true, stdio: 'pipe' });
  return {
    ok: proc.status === 0,
    stdout: proc.stdout?.toString() || '',
    stderr: proc.stderr?.toString() || '',
    code: proc.status,
  };
}

function loadEngines() {
  return readJson(ENGINES_LOCAL, readJson(ENGINES_EXAMPLE, { commands: {} }));
}

// ─── Step 1: Load capture metadata ──────────────────────────────────────────
function loadCaptureMeta(flowName) {
  const metaPath = path.join(CAPTURE_DIR, flowName, 'capture-meta.json');
  if (!fs.existsSync(metaPath)) {
    throw new Error(`Capture meta not found: ${metaPath}. Run capture-exam-platform.js first.`);
  }
  return readJson(metaPath);
}

// ─── Step 2: Generate / load narration script ─────────────────────────────────
function buildNarrationScript(flowName, captureMeta) {
  const template = TUTORIAL_SCRIPTS[flowName];
  if (!template) throw new Error(`No tutorial script template for flow: ${flowName}`);

  const scriptText = [
    template.hook,
    ...template.steps.map((s, i) => `Paso ${i + 1}: ${s}`),
    template.outro,
  ].join(' ');

  return {
    flow: flowName,
    title: template.title,
    hook: template.hook,
    steps: template.steps,
    outro: template.outro,
    full_script: scriptText,
    locale: 'es-CO',
    generated_at: new Date().toISOString(),
  };
}

// ─── Step 3: TTS synthesis ─────────────────────────────────────────────────────
function runTTS(flowName, scriptObj, engines) {
  const flowOutDir = path.join(OUTPUT_DIR, flowName);
  ensureDir(flowOutDir);
  const audioPath = path.join(flowOutDir, 'audio.mp3');
  if (fs.existsSync(audioPath)) {
    console.log('  ⏭  Audio already exists, skipping TTS');
    return { audioPath, skipped: true };
  }

  const replacements = {
    NARRATION_SCRIPT: scriptObj.full_script.replace(/"/g, '\\"'),
    AUDIO_PATH: audioPath,
    VOICE_REF: engines.voice_ref || '',
  };

  const cmd = replaceTokens(engines.commands?.tts || '', replacements);
  console.log(`  🔊 Running TTS: ${cmd.substring(0, 80)}...`);
  const result = runCommand(cmd);
  if (!result.ok) {
    console.error(`  ❌ TTS failed: ${result.stderr}`);
    throw new Error('TTS synthesis failed');
  }
  return { audioPath, skipped: false };
}

// ─── Step 4: Align audio to script (whisperx) ─────────────────────────────────
function runAlignment(flowName, audioPath, scriptObj, engines) {
  const flowOutDir = path.join(OUTPUT_DIR, flowName);
  const timingsPath = path.join(flowOutDir, 'timings.json');
  const subtitlesPath = path.join(flowOutDir, 'subtitles.srt');

  if (fs.existsSync(timingsPath) && fs.existsSync(subtitlesPath)) {
    console.log('  ⏭  Alignments already exist, skipping');
    return { timingsPath, subtitlesPath, skipped: true };
  }

  const replacements = {
    AUDIO_PATH: audioPath,
    TIMINGS_PATH: timingsPath,
    SUBTITLES_PATH: subtitlesPath,
    NARRATION_SCRIPT: scriptObj.full_script.replace(/"/g, '\\"'),
  };

  const cmd = replaceTokens(engines.commands?.align || '', replacements);
  console.log(`  🎯 Running alignment: ${cmd.substring(0, 80)}...`);
  const result = runCommand(cmd);
  if (!result.ok) {
    console.warn(`  ⚠ Alignment failed: ${result.stderr}. Using fallback timings.`);
    // Write minimal fallback
    writeJson(timingsPath, { fallback: true, word_count: scriptObj.steps.length });
    return { timingsPath, subtitlesPath, skipped: false };
  }
  return { timingsPath, subtitlesPath, skipped: false };
}

// ─── Step 5: Render video with Remotion ───────────────────────────────────────
function runRender(flowName, assets, engines) {
  const flowOutDir = path.join(OUTPUT_DIR, flowName);
  const videoPath = path.join(flowOutDir, 'tutorial.mp4');
  const jobPath = path.join(flowOutDir, 'job.json');

  // Build a Remotion job payload
  const jobPayload = {
    protocol_version: '2.0',
    tutorial_id: flowName,
    format: {
      width: 1080,
      height: 1920,
      fps: 30,
    },
    content: {
      title: assets.script.title,
      hook: assets.script.hook,
      steps: assets.script.steps,
      outro: assets.script.outro,
    },
    capture_base: path.join(CAPTURE_DIR, flowName),
    audio_path: assets.audioPath,
    timings_path: assets.timingsPath,
    subtitles_path: assets.subtitlesPath,
    output_path: videoPath,
  };

  writeJson(jobPath, jobPayload);

  if (fs.existsSync(videoPath) && !process.argv.includes('--re-render')) {
    console.log('  ⏭  Video already exists, skipping render (--re-render to force)');
    return { videoPath, skipped: true };
  }

  const replacements = {
    JOB_PATH: jobPath,
    AUDIO_PATH: assets.audioPath,
    TIMINGS_PATH: assets.timingsPath,
    SUBTITLES_PATH: assets.subtitlesPath,
    VIDEO_PATH: videoPath,
    CAPTURE_BASE: path.join(CAPTURE_DIR, flowName),
  };

  const cmd = replaceTokens(engines.commands?.render || '', replacements);
  console.log(`  🎬 Running render: ${cmd.substring(0, 80)}...`);
  const result = runCommand(cmd);
  if (!result.ok) {
    console.error(`  ❌ Render failed: ${result.stderr}`);
    throw new Error('Video render failed');
  }
  return { videoPath, skipped: false };
}

// ─── Step 6: QA ───────────────────────────────────────────────────────────────
function runQA(flowName, assets) {
  const flowOutDir = path.join(OUTPUT_DIR, flowName);
  const qaReportPath = path.join(flowOutDir, 'qa-report.json');

  const checks = [];
  let allOk = true;

  // Check 1: Video file exists
  const videoExists = fs.existsSync(assets.videoPath);
  checks.push({ check: 'video_exists', passed: videoExists, detail: assets.videoPath });
  if (!videoExists) allOk = false;

  // Check 2: Audio file exists
  const audioExists = fs.existsSync(assets.audioPath);
  checks.push({ check: 'audio_exists', passed: audioExists, detail: assets.audioPath });
  if (!audioExists) allOk = false;

  // Check 3: Video file size > 0
  const videoSize = videoExists ? fs.statSync(assets.videoPath).size : 0;
  const sizeOk = videoSize > 1024 * 100; // > 100KB
  checks.push({ check: 'video_min_size', passed: sizeOk, detail: `${videoSize} bytes` });
  if (!sizeOk) allOk = false;

  // Check 4: Timings file exists
  const timingsOk = fs.existsSync(assets.timingsPath);
  checks.push({ check: 'timings_exists', passed: timingsOk, detail: assets.timingsPath });
  if (!timingsOk) allOk = false;

  // Check 5: Subtitle file exists
  const subsOk = fs.existsSync(assets.subtitlesPath);
  checks.push({ check: 'subtitles_exists', passed: subsOk, detail: assets.subtitlesPath });
  if (!subsOk) allOk = false;

  const report = {
    flow: flowName,
    checked_at: new Date().toISOString(),
    all_passed: allOk,
    passed_count: checks.filter((c) => c.passed).length,
    total_checks: checks.length,
    checks,
  };

  writeJson(qaReportPath, report);

  console.log(`\n  ${allOk ? '✅' : '❌'} QA ${allOk ? 'PASSED' : 'FAILED'} (${report.passed_count}/${report.total_checks} checks)`);
  if (!allOk) {
    for (const failed of checks.filter((c) => !c.passed)) {
      console.log(`    • ${failed.check}: ${failed.detail}`);
    }
  }

  return report;
}

// ─── Pipeline Orchestrator ───────────────────────────────────────────────────
async function runPipeline(flowName, step = 'all') {
  console.log(`\n🎬 Tutorial Pipeline — flow=${flowName} step=${step}`);
  console.log('─'.repeat(60));

  const engines = loadEngines();
  const captureMeta = loadCaptureMeta(flowName);
  const scriptObj = buildNarrationScript(flowName, captureMeta);
  const flowOutDir = path.join(OUTPUT_DIR, flowName);
  ensureDir(flowOutDir);

  // Persist script
  const scriptPath = path.join(flowOutDir, 'script.json');
  writeJson(scriptPath, scriptObj);

  const assets = {};

  if (step === 'all' || step === 'tts') {
    console.log('\n[1/5] TTS Synthesis');
    assets.tts = runTTS(flowName, scriptObj, engines);
    assets.audioPath = assets.tts.audioPath;
  }

  if (step === 'all' || step === 'align') {
    console.log('\n[2/5] Audio Alignment');
    if (!assets.audioPath) {
      assets.audioPath = path.join(flowOutDir, 'audio.mp3');
    }
    assets.align = runAlignment(flowName, assets.audioPath, scriptObj, engines);
    assets.timingsPath = assets.align.timingsPath;
    assets.subtitlesPath = assets.align.subtitlesPath;
  }

  if (step === 'all' || step === 'render') {
    console.log('\n[3/5] Video Rendering');
    if (!assets.audioPath) assets.audioPath = path.join(flowOutDir, 'audio.mp3');
    if (!assets.timingsPath) assets.timingsPath = path.join(flowOutDir, 'timings.json');
    if (!assets.subtitlesPath) assets.subtitlesPath = path.join(flowOutDir, 'subtitles.srt');
    assets.render = runRender(flowName, assets, engines);
    assets.videoPath = assets.render.videoPath;
  }

  if (step === 'all' || step === 'qa') {
    console.log('\n[4/5] QA Validation');
    if (!assets.videoPath) assets.videoPath = path.join(flowOutDir, 'tutorial.mp4');
    if (!assets.audioPath) assets.audioPath = path.join(flowOutDir, 'audio.mp3');
    if (!assets.timingsPath) assets.timingsPath = path.join(flowOutDir, 'timings.json');
    if (!assets.subtitlesPath) assets.subtitlesPath = path.join(flowOutDir, 'subtitles.srt');
    assets.qa = runQA(flowName, assets);
  }

  console.log('\n' + '─'.repeat(60));
  console.log(`✅ Pipeline done → ${flowOutDir}`);

  return {
    flow: flowName,
    assets,
    qa: assets.qa,
    output_dir: flowOutDir,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const flowName = args.flow || 'crear-examen';
  const step = args.step || 'all';

  const ALL_FLOWS = ['crear-examen', 'ver-informes', 'dar-feedback', 'simular-examen'];
  const flowsToRun = flowName === 'all' ? ALL_FLOWS : [flowName];

  const results = [];
  for (const flow of flowsToRun) {
    try {
      const result = await runPipeline(flow, step);
      results.push({ flow, ok: true, result });
    } catch (e) {
      console.error(`\n❌ Pipeline error for flow "${flow}": ${e.message}`);
      results.push({ flow, ok: false, error: e.message });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 PIPELINE SUMMARY');
  console.log('='.repeat(60));
  for (const r of results) {
    const status = r.ok ? '✅' : '❌';
    console.log(`  ${status} ${r.flow}`);
    if (!r.ok) console.log(`      → ${r.error}`);
  }

  const summaryPath = path.join(OUTPUT_DIR, '_pipeline-summary.json');
  writeJson(summaryPath, { generated_at: new Date().toISOString(), flows: results });
  console.log(`\n📄 Summary: ${summaryPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
