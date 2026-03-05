import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const VIDEO_ROOT = path.join(
  ROOT,
  'src',
  'content',
  'questions',
  'colombia',
  'matematicas',
  'grado-11',
  'periodo-1'
);
const OUTPUT_DIR = path.join(ROOT, 'test-results', 'video-frame-review');
const RUN_NAME = 'e2e-latest';
const PUBLIC_FRAMES_DIR = path.join(ROOT, 'public', 'video-frame-analysis', RUN_NAME);
const TARGET_VIDEO_NAMES = [
  'CO-MAT-11-continuity-001-PRO-v1.mp4',
  'CO-MAT-11-continuity-001-PRO-v2.mp4',
  'CO-MAT-11-continuity-001-PRO-v3.mp4'
];

function findMp4Files(dir: string): string[] {
  const out: string[] = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop()!;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.mp4')) {
        out.push(full);
      }
    }
  }
  return out.sort();
}

test('E2E frame review: extrae capturas y genera reporte para LLM', async ({ page }) => {
  test.setTimeout(300000);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_FRAMES_DIR, { recursive: true });

  const videos = findMp4Files(VIDEO_ROOT).filter((v) => TARGET_VIDEO_NAMES.includes(path.basename(v))).slice(0, 3);
  expect(videos.length).toBeGreaterThan(0);

  execSync(
    `python scripts/video/extract-frames-opencv.py --video-root "${VIDEO_ROOT}" --out "${PUBLIC_FRAMES_DIR}" --limit 3 --include "${TARGET_VIDEO_NAMES.join(',')}"`,
    { cwd: ROOT, stdio: 'inherit' }
  );

  await page.goto(`/developers/video-review?run=${RUN_NAME}`);
  await expect(page.getByRole('heading', { name: 'Video Frame Review', exact: true })).toBeVisible();
  await expect(page.locator('#summary')).toContainText('Listo', { timeout: 120000 });

  const cards = page.locator('[data-testid="frame-thumb"]');
  const cardCount = await cards.count();
  expect(cardCount).toBe(videos.length * 5);

  const captures: Array<{
    video_name: string;
    frame_index: number;
    timestamp_seconds: number;
    image_path: string;
  }> = [];

  for (let i = 0; i < cardCount; i++) {
    const card = cards.nth(i);
    const videoName = await card.getAttribute('data-video-name');
    const frameIndex = await card.getAttribute('data-frame-index');
    const timestamp = await card.getAttribute('data-timestamp');
    const safeVideo = String(videoName || 'video').replace(/[^a-zA-Z0-9._-]/g, '_');
    const frameName = `${safeVideo}__f${frameIndex || i + 1}.png`;
    const framePath = path.join(OUTPUT_DIR, frameName);
    await card.screenshot({ path: framePath });
    captures.push({
      video_name: String(videoName || ''),
      frame_index: Number(frameIndex || 0),
      timestamp_seconds: Number(timestamp || 0),
      image_path: framePath
    });
  }

  const browserMeta = await page.evaluate(() => (window as any).__videoFrameReview || null);
  const report = {
    generated_at: new Date().toISOString(),
    objective: 'Evaluar legibilidad, continuidad visual, branding y claridad pedagogica por frame.',
    source_videos: videos,
    browser_meta: browserMeta,
    captures,
    llm_review_prompt: [
      'Analiza cada frame y devuelve JSON con score 1-5 para:',
      '1) legibilidad de texto',
      '2) jerarquia visual',
      '3) consistencia de marca',
      '4) claridad del paso matematico',
      '5) riesgo de abandono del espectador',
      'Incluye acciones concretas para mejorar el video.'
    ].join(' ')
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'report.json'), JSON.stringify(report, null, 2), 'utf-8');
});
