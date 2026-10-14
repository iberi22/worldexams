import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (fullPath.endsWith('.svelte') || fullPath.endsWith('.astro') || fullPath.endsWith('.ts')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

describe('BR-03 Exam Isolation', () => {
  it('exam flows must not import telemetry or credits', () => {
    const srcDir = path.join(__dirname, '..');
    const componentsDir = path.join(srcDir, 'components');
    const pagesDir = path.join(srcDir, 'pages');

    const allFiles = [
      ...getAllFiles(componentsDir),
      ...getAllFiles(pagesDir)
    ];

    const isExamFile = (filePath: string) => {
      const lowerPath = filePath.toLowerCase();
      return lowerPath.includes('exam') ||
             lowerPath.includes('practica.astro') ||
             lowerPath.includes('sala-examenes.astro');
    };

    const examFiles = allFiles.filter(isExamFile);
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
