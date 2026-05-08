/**
 * render-ssr.mjs — Renderiza un video Remotion usando SSR APIs (@remotion/renderer)
 *
 * Uso:
 *   node render-ssr.mjs --props <props.json> [--output <output.mp4>]
 *
 * Args:
 *   --props       Ruta al archivo JSON con inputProps para el template
 *   --output      Ruta de salida para el MP4 (default: out/<id>.mp4)
 *   --publicDir   Ruta al directorio public/ (default: ../remotion/public)
 *   --entryPoint  Ruta al entry point (default: ../remotion/index.tsx)
 *   --composition Nombre de la composition (default: VerticalMathTemplate)
 *
 * Estrategia:
 *   - bundle() se llama UNA SOLA VEZ (se reusa entre renders)
 *   - selectComposition() obtiene metadata exacta con inputProps
 *   - renderMedia() con CRF, codec, audio bitrate controlados
 *   - browserExecutable apunta a Chrome instalado (más rápido que headless shell)
 */

import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition, ensureBrowser } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ── Config ─────────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REMOTION_DIR = path.resolve(__dirname, '..', 'remotion');
const DEFAULT_ENTRY = path.join(REMOTION_DIR, 'index.tsx');
const DEFAULT_PUBLIC = path.join(REMOTION_DIR, 'public');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// Cache del bundle (se crea una vez, se reusa)
let _bundleLocation = null;

// ── Helpers ────────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      parsed[key] = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
      if (parsed[key] !== true) i++;
    }
  }
  return parsed;
}

function readJson(path) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function ensurePublicDir(publicDir) {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  return publicDir;
}

// ── Pipeline ───────────────────────────────────────────────────────────────────

async function getBundle(entryPoint) {
  if (_bundleLocation) return _bundleLocation;
  
  console.log(`  📦 Bundling Remotion project...`);
  const start = Date.now();
  
  _bundleLocation = await bundle({
    entryPoint: entryPoint,
    webpackOverride: (config) => config,
  });
  
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`  ✅ Bundle created in ${elapsed}s`);
  
  return _bundleLocation;
}

async function renderVideo({
  inputProps,
  outputLocation,
  entryPoint,
  compositionId,
  publicDir,
  browserExecutable,
}) {
  // 1. Ensure browser
  await ensureBrowser({ browserExecutable });
  
  // 2. Bundle (reusado)
  const serveUrl = await getBundle(entryPoint);
  
  // 3. Select composition con inputProps
  console.log(`  ⚙️  Selecting composition...`);
  const composition = await selectComposition({
    serveUrl,
    id: compositionId,
    inputProps,
  });
  
  // Log composition info
  const fps = composition.fps;
  const totalSeconds = composition.durationInFrames / fps;
  console.log(`  📐 ${composition.width}x${composition.height} @ ${fps}fps, ${composition.durationInFrames} frames (${totalSeconds.toFixed(1)}s)`);
  
  // 4. Render
  console.log(`  🎬 Rendering...`);
  const start = Date.now();
  
  await renderMedia({
    composition,
    serveUrl,
    codec: 'h264',
    outputLocation,
    inputProps,
    chromiumOptions: {},
    logLevel: 'error',
    
    // ── Calidad ──
    crf: 14,           // H264: 1-51, lower=better. Default 18. 14 = muy buena calidad
    videoBitrate: null, // null = CRF controls quality
    
    // ── Audio ──
    muted: false,
    audioCodec: 'aac',
    audioBitrate: '128k',
    
    // ── Performance ──
    concurrency: null, // Remotion decide (half CPU)
    
    // ── Chrome ──
    browserExecutable,
  });
  
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const fileSize = fs.existsSync(outputLocation) 
    ? (fs.statSync(outputLocation).size / 1024).toFixed(0) 
    : '?';
  
  console.log(`  ✅ Rendered in ${elapsed}s — ${fileSize} KB`);
  
  return outputLocation;
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  const args = parseArgs();
  
  if (!args.props) {
    console.error('ERROR: --props <json_file> is required');
    process.exit(1);
  }
  
  const propsFile = path.resolve(args.props);
  const inputProps = readJson(propsFile);
  const compositionId = args.composition || 'VerticalMathTemplate';
  const entryPoint = args.entryPoint ? path.resolve(args.entryPoint) : DEFAULT_ENTRY;
  const publicDir = args.publicDir ? path.resolve(args.publicDir) : DEFAULT_PUBLIC;
  const outputLocation = args.output 
    ? path.resolve(args.output) 
    : path.join(REMOTION_DIR, 'out', `${inputProps.id || 'output'}.mp4`);
  
  // Ensure public dir exists
  ensurePublicDir(publicDir);
  
  // Ensure output dir exists
  const outDir = path.dirname(outputLocation);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  try {
    await renderVideo({
      inputProps,
      outputLocation,
      entryPoint,
      compositionId,
      publicDir,
      browserExecutable: CHROME_PATH,
    });
  } catch (err) {
    console.error(`  ❌ Render failed:`, err.message);
    process.exit(1);
  }
}

main();
