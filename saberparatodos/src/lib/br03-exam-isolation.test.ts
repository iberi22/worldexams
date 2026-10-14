import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('BR-03 Exam Isolation', () => {
  it('exam flows must not import telemetry or credits', () => {
    const srcDir = path.join(__dirname, '..');

    // Explicit list of exam files based on the instruction
    const targetPaths = [
      path.join(srcDir, 'components', 'ExamView.svelte'),
      path.join(srcDir, 'components', 'ranked', 'RankedExamView.svelte'),
      path.join(srcDir, 'pages', 'practica.astro'),
      path.join(srcDir, 'pages', 'sala-examenes.astro'),
      path.join(srcDir, 'pages', 'guia-examen.astro'),
      path.join(srcDir, 'pages', 'preguntas-icfes.astro')
    ];

    // Filter to ensure paths exist
    const examFiles = targetPaths.filter(p => fs.existsSync(p));

    // Assert the list is not empty
    expect(examFiles.length).toBeGreaterThan(0);

    const violations: string[] = [];

    for (const file of examFiles) {
      const content = fs.readFileSync(file, 'utf8');

      const hasTelemetry = content.includes('telemetry') || content.includes('mejora-interna-telemetry');
      const hasCredits = content.includes('swal-credits') || content.includes('CreditBalance');

      if (hasTelemetry || hasCredits) {
        violations.push(file);
      }
    }

    expect(violations, `Found telemetry or credits in exam files: ${violations.join(', ')}`).toEqual([]);
  });
});
