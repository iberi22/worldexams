import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { hasMojibake, detectMojibakeLines, validateFile } from '../../../scripts/validate-bundles-v52.mjs';

describe('validate-encoding mojibake detection rule', () => {
  it('detects mojibake sequences in helper function', () => {
    expect(hasMojibake('¿Â¿CuÃ¡l?')).toBe('Â¿');
    expect(hasMojibake('¿Cuál es la respuesta correcta?')).toBeNull();
  });

  it('fails validation when bundle contains mojibake sequences ("Â¿")', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'encoding-test-bad-'));
    const badFile = path.join(tmpDir, 'CO-MAT-11-2026-W01-test-001-MASTERY-bundle.md');
    const badContent = [
      '---',
      'id: "CO-MAT-11-2026-W01-test-001-MASTERY-bundle"',
      'country: "colombia"',
      'grado: "11"',
      'asignatura: "matematicas"',
      'tema: "test"',
      'periodo: "weekly"',
      'week: "W01"',
      'year: 2026',
      'bundle_type: "weekly"',
      'protocol_version: "5.2"',
      'total_questions: 20',
      'bundle_size: 20',
      'alignment: "ICFES"',
      'license: "FREE"',
      'tier: "legacy"',
      'creador: "Jules-Agent"',
      '---',
      '## Question 1 [D3-D4]',
      '¿Â¿CuÃ¡l es el valor?',
    ].join('\n');

    fs.writeFileSync(badFile, badContent, 'utf8');

    const lines = detectMojibakeLines(badContent);
    expect(lines.length).toBeGreaterThan(0);
    expect(lines[0].sequence).toBe('Â¿');

    const result = validateFile(badFile);
    expect(result.errors.some((err: string) => err.includes('ERROR [encoding]') && err.includes('mojibake'))).toBe(true);

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('passes encoding rule when bundle has clean UTF-8 text', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'encoding-test-good-'));
    const goodFile = path.join(tmpDir, 'CO-MAT-11-2026-W01-good-001-MASTERY-bundle.md');
    const goodContent = [
      '---',
      'id: "CO-MAT-11-2026-W01-good-001-MASTERY-bundle"',
      'country: "colombia"',
      'grado: "11"',
      '---',
      '## Question 1 [D3-D4]',
      '¿Cuál es el área del sector circular en metros cuadrados?',
    ].join('\n');

    fs.writeFileSync(goodFile, goodContent, 'utf8');

    const lines = detectMojibakeLines(goodContent);
    expect(lines.length).toBe(0);

    const result = validateFile(goodFile);
    expect(result.errors.some((err: string) => err.includes('ERROR [encoding]'))).toBe(false);

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });
});
