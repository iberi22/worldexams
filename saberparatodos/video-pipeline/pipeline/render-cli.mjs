/**
 * render-cli.mjs — Renderiza un video Remotion usando la CLI npx remotion render
 * pero con props desde archivo (no inline) para evitar quoting problems.
 *
 * Uso:
 *   node render-cli.mjs --props <props.json> [--output <output.mp4>] --remotionDir <dir>
 *
 * Esta es una alternativa estable cuando SSR (bundle/selectComposition/renderMedia)
 * falla por problemas de resolución de módulos con Rspack.
 *
 * Estrategia:
 *   - Usa npx remotion render (CLI estable, probada)
 *   - Props desde archivo JSON (no inline quoting)
 *   - Se ejecuta con cwd = remotionDir
 *   - Soporta upscaling de resolución con --scale (Remotion 4.0)
 */

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

function main() {
  const args = parseArgs();

  if (!args.props) {
    console.error('ERROR: --props <json_file> is required');
    process.exit(1);
  }

  const propsFile = path.resolve(args.props);
  const remotionDir = args.remotionDir ? path.resolve(args.remotionDir) : path.resolve(__dirname, '..', 'remotion');
  const outputLocation = args.output ? path.resolve(args.output) : '';
  const compositionId = args.composition || 'VerticalMathTemplate';
  const scale = args.scale || '1';  // 1 = normal, 2 = 2x upscale

  // Read props to validate
  const inputProps = JSON.parse(fs.readFileSync(propsFile, 'utf-8'));

  // Ensure output dir exists
  if (outputLocation) {
    const outDir = path.dirname(outputLocation);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
  }

  // Build command
  const entryPoint = path.join(remotionDir, 'index.tsx');
  const parts = [
    'npx.cmd', 'remotion', 'render',
    entryPoint,
    compositionId,
  ];

  if (outputLocation) {
    parts.push(outputLocation);
  }

  parts.push('--props', propsFile);  // Remotion reads file path from this arg
  parts.push('--log', 'error');
  parts.push('--scale', scale);

  const cmd = parts.join(' ');
  const start = Date.now();

  console.log(`  ⚙️  npx remotion render`);

  try {
    execSync(cmd, {
      cwd: remotionDir,
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 600000, // 10 min
      maxBuffer: 50 * 1024 * 1024,
      shell: 'powershell.exe',
    });
  } catch (err) {
    const stderr = err.stderr ? err.stderr.toString() : err.message;
    console.error(`  ❌ Render failed`);
    // Show last meaningful lines
    const lines = stderr.split('\n').filter(l => l.trim());
    const tail = lines.slice(-5).join('\n').trim();
    if (tail) process.stderr.write(tail + '\n');
    process.exit(1);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  const finalFile = outputLocation || path.join(remotionDir, 'out', `${inputProps.id || 'output'}.mp4`);
  const fileSize = fs.existsSync(finalFile) ? (fs.statSync(finalFile).size / 1024).toFixed(0) : '?';

  console.log(`  ✅ Rendered in ${elapsed}s — ${fileSize} KB`);
}

main();
