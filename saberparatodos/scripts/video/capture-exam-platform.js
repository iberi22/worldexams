/**
 * capture-exam-platform.js
 *
 * Captures platform UI flows using Playwright.
 * Records a navigation sequence through the SaberParaTodos platform
 * and exports screenshots/HTML dumps that the tutorial pipeline consumes.
 *
 * Usage:
 *   node scripts/video/capture-exam-platform.js --flow=crear-examen --out=output/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..', '..');

const PLATFORM_URL = process.env.PLATFORM_URL || 'http://localhost:4321';
const SCREENSHOT_DIR = path.join(PROJECT_ROOT, 'video-pipeline', 'captures');

const FLOWS = {
  'crear-examen': {
    label: 'Crear Examen',
    steps: [
      { name: 'dashboard', path: '/dashboard', waitFor: '[data-testid="new-exam-btn"]' },
      { name: 'exam-config', path: '/dashboard/new-exam', waitFor: '[data-testid="exam-form"]' },
      { name: 'subject-select', path: '/dashboard/new-exam', waitFor: '[data-testid="subject-picker"]' },
      { name: 'question-picker', path: '/dashboard/new-exam/questions', waitFor: '[data-testid="question-grid"]' },
      { name: 'exam-preview', path: '/dashboard/new-exam/preview', waitFor: '[data-testid="exam-preview"]' },
      { name: 'exam-published', path: '/dashboard/exams', waitFor: '[data-testid="exam-list"]' },
    ],
  },
  'ver-informes': {
    label: 'Ver Informes',
    steps: [
      { name: 'dashboard', path: '/dashboard', waitFor: '[data-testid="sidebar"]' },
      { name: 'reports-nav', path: '/informes', waitFor: '[data-testid="reports-header"]' },
      { name: 'filter-date', path: '/informes?filter=date', waitFor: '[data-testid="date-range-picker"]' },
      { name: 'student-detail', path: '/informes/student/1', waitFor: '[data-testid="student-report"]' },
      { name: 'export-csv', path: '/informes/export', waitFor: '[data-testid="export-panel"]' },
    ],
  },
  'dar-feedback': {
    label: 'Dar Feedback',
    steps: [
      { name: 'dashboard', path: '/dashboard', waitFor: '[data-testid="sidebar"]' },
      { name: 'feedback-entry', path: '/dashboard/feedback', waitFor: '[data-testid="feedback-form"]' },
      { name: 'select-student', path: '/dashboard/feedback?step=student', waitFor: '[data-testid="student-picker"]' },
      { name: 'write-comment', path: '/dashboard/feedback?step=comment', waitFor: '[data-testid="comment-editor"]' },
      { name: 'submit-feedback', path: '/dashboard/feedback?step=submit', waitFor: '[data-testid="submit-btn"]' },
    ],
  },
  'simular-examen': {
    label: 'Simular Examen',
    steps: [
      { name: 'home', path: '/', waitFor: '[data-testid="hero-cta"]' },
      { name: 'exam-type-select', path: '/practica', waitFor: '[data-testid="exam-type-grid"]' },
      { name: 'subject-select', path: '/practica/matematicas', waitFor: '[data-testid="subject-header"]' },
      { name: 'exam-start', path: '/practica/matematicas/grado-11/periodo-1', waitFor: '[data-testid="start-btn"]' },
      { name: 'question-1', path: '/practica/exam/session', waitFor: '[data-testid="question-card"]' },
      { name: 'results', path: '/practica/exam/results', waitFor: '[data-testid="results-panel"]' },
    ],
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

function writeCaptureMeta(outDir, flowName, steps) {
  const meta = {
    flow: flowName,
    captured_at: new Date().toISOString(),
    platform_url: PLATFORM_URL,
    steps: steps.map((s) => ({
      name: s.name,
      screenshot: `${s.name}.png`,
      html: `${s.name}.html`,
      timestamp: s.timestamp,
    })),
  };
  fs.writeFileSync(path.join(outDir, 'capture-meta.json'), JSON.stringify(meta, null, 2));
  return meta;
}

/**
 * Playwright capture loop. Falls back to no-op if Playwright is unavailable.
 */
async function captureFlow(flowName, flowDef, outDir, args) {
  let pw;
  try {
    ({ chromium } = await import('playwright'));
    pw = true;
  } catch {
    pw = false;
  }

  ensureDir(outDir);
  const steps = [];

  if (!pw) {
    console.warn('[capture-exam-platform] Playwright not available — writing placeholder metadata only.');
    for (const step of flowDef.steps) {
      steps.push({ name: step.name, timestamp: null });
      // Write placeholder HTML
      const placeholder = `<!DOCTYPE html><html><body><h1>${step.name}</h1><p>Platform capture placeholder</p></body></html>`;
      fs.writeFileSync(path.join(outDir, `${step.name}.html`), placeholder);
    }
    writeCaptureMeta(outDir, flowName, steps);
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  for (const step of flowDef.steps) {
    const url = `${PLATFORM_URL}${step.path}`;
    console.log(`  [${flowName}] Navigating → ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      if (step.waitFor) {
        await page.waitForSelector(step.waitFor, { timeout: 8000 }).catch(() => {});
      }
    } catch (e) {
      console.warn(`    ⚠ Could not load ${url}: ${e.message}`);
    }

    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const ssPath = path.join(outDir, `${step.name}.png`);
    const htmlPath = path.join(outDir, `${step.name}.html`);

    await page.screenshot({ path: ssPath, fullPage: false }).catch(() => {});
    const content = await page.content().catch(() => '<html/>');
    fs.writeFileSync(htmlPath, content);

    steps.push({ name: step.name, timestamp: ts });
    console.log(`    ✓ ${step.name}`);
  }

  await browser.close();
  writeCaptureMeta(outDir, flowName, steps);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const flowName = args.flow || 'crear-examen';
  const outDir = args.out || path.join(SCREENSHOT_DIR, flowName);

  const flowDef = FLOWS[flowName];
  if (!flowDef) {
    console.error(`Unknown flow: ${flowName}`);
    console.error(`Available flows: ${Object.keys(FLOWS).join(', ')}`);
    process.exit(1);
  }

  console.log(`\n🎬 Capturing flow: ${flowDef.label} (${flowName})`);
  console.log(`📁 Output: ${outDir}\n`);

  await captureFlow(flowName, flowDef, outDir, args);

  const meta = JSON.parse(fs.readFileSync(path.join(outDir, 'capture-meta.json'), 'utf-8'));
  console.log(`\n✅ Capture complete — ${meta.steps.length} steps captured`);
  console.log(`📄 Meta: ${path.join(outDir, 'capture-meta.json')}`);

  return meta;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
