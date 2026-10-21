// @vitest-environment node
/**
 * The app shell must not ship the baked SEO index (preguntas-index.json,
 * hundreds of KB). Public /preguntas/ links are derived from the bundle id by
 * lib/banco/permalink.ts instead.
 *
 * Walks every relative/aliased import (static, dynamic and re-exports)
 * reachable from App.svelte and fails if the index is in the graph, so a lazy
 * `import('...preguntas-index.json')` is caught too.
 */
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC_DIR = fileURLToPath(new URL('..', import.meta.url));
const ENTRY = join(SRC_DIR, 'components', 'App.svelte');
const FORBIDDEN = join(SRC_DIR, 'lib', 'preguntas', 'preguntas-index.json');

const SPECIFIER_RE = /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)['"]([^'"]+)['"]/g;
const EXTENSIONS = ['', '.ts', '.js', '.svelte', '.svelte.ts', '.json', '/index.ts', '/index.js'];

function resolveSpecifier(fromFile: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith('.')) base = resolve(dirname(fromFile), spec);
  else if (spec.startsWith('@/')) base = join(SRC_DIR, spec.slice(2));
  else if (spec.startsWith('$lib/')) base = join(SRC_DIR, 'lib', spec.slice(5));
  else return null; // package import
  const clean = base.replace(/\?.*$/, '');
  for (const ext of EXTENSIONS) {
    const candidate = clean + ext;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

function importGraph(entry: string): Set<string> {
  const seen = new Set<string>();
  const queue = [entry];
  while (queue.length) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    if (file.endsWith('.json')) continue;
    const code = readFileSync(file, 'utf8');
    for (const m of code.matchAll(SPECIFIER_RE)) {
      const target = resolveSpecifier(file, m[1]);
      if (target && !seen.has(target)) queue.push(target);
    }
  }
  return seen;
}

describe('App.svelte bundle', () => {
  const graph = importGraph(ENTRY);
  const rel = [...graph].map((f) => relative(SRC_DIR, f).split(sep).join('/'));

  it('resolves the import graph (sanity)', () => {
    expect(rel).toContain('lib/banco/permalink.ts');
    expect(rel.length).toBeGreaterThan(20);
  });

  it('does not reach preguntas-index.json', () => {
    expect(graph.has(FORBIDDEN)).toBe(false);
  });
});
