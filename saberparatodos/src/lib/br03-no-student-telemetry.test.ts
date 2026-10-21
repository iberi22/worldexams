// @vitest-environment node
/**
 * BR-03 guard: no telemetry of student activity.
 *
 * README.md promises that SaberParaTodos does not record what students do
 * (exam start/finish, answers, scores, grade/subject usage, tutor sessions).
 * This test scans EVERY source file under src/ (ts, svelte, astro; tests
 * excluded) for the telemetry module and known analytics sinks, so a new
 * call site anywhere in the app fails CI instead of slipping through a
 * hand-picked file list.
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC_DIR = fileURLToPath(new URL('..', import.meta.url));

const SCANNED_EXT = /\.(ts|svelte|astro)$/;
const TEST_FILE = /\.(test|spec)\.ts$/;

/** Sinks that would ship student activity off the page or into a telemetry buffer. */
const SINKS: { name: string; pattern: RegExp }[] = [
  { name: 'mejora-interna-telemetry module', pattern: /mejora-interna-telemetry/ },
  { name: 'recordMejoraInterna()', pattern: /\brecordMejoraInterna\b/ },
  { name: 'gtag()', pattern: /\bgtag\s*\(/ },
  { name: 'Google Analytics / Tag Manager', pattern: /googletagmanager|google-analytics\.com|\bdataLayer\b/ },
  { name: 'PostHog', pattern: /posthog/i },
  // "plausible" is also a common Spanish/English word in comments and prompts,
  // so only the analytics usages are matched.
  { name: 'Plausible Analytics', pattern: /\bplausible\s*\(|window\.plausible|plausible\.io/ },
  { name: 'Workers Analytics Engine writeDataPoint()', pattern: /\bwriteDataPoint\b/ },
];

/**
 * Explicit allowlist: `relative/path/from/src` -> reason.
 * Keep it EMPTY unless a use is justified and carries no user/student data.
 */
const ALLOWLIST: Record<string, string> = {};

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SCANNED_EXT.test(entry) && !TEST_FILE.test(entry)) out.push(full);
  }
  return out;
}

describe('BR-03: no telemetry of student activity', () => {
  const files = walk(SRC_DIR);

  it('scans the whole app source tree, including App.svelte', () => {
    const rel = files.map((f) => relative(SRC_DIR, f).split(sep).join('/'));
    expect(files.length).toBeGreaterThan(100);
    expect(rel).toContain('components/App.svelte');
  });

  it('has no telemetry module imports or analytics sink calls', () => {
    const violations: string[] = [];
    for (const file of files) {
      const rel = relative(SRC_DIR, file).split(sep).join('/');
      if (ALLOWLIST[rel]) continue;
      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, i) => {
        for (const sink of SINKS) {
          if (sink.pattern.test(line)) violations.push(`src/${rel}:${i + 1} ${sink.name}`);
        }
      });
    }
    expect(violations).toEqual([]);
  });
});
