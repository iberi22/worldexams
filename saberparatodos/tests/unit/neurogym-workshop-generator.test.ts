/**
 * neurogym-workshop-generator.test.ts
 * Verification and unit tests for NeuroWorkshopGenerator.svelte component structure,
 * cognitive domain options (Memory, Analysis, Agility), target grade settings,
 * and UTF-8 BOM download functionality.
 */
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('NeuroWorkshopGenerator Svelte Component Verification', () => {
  const componentPath = path.join(__dirname, '../../src/components/neurogym/NeuroWorkshopGenerator.svelte');

  it('component file exists in src/components/neurogym/', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('contains Svelte 5 state and derived declarations', () => {
    const code = fs.readFileSync(componentPath, 'utf8');
    expect(code).toContain('$state');
    expect(code).toContain('$derived');
  });

  it('supports selecting target grade, duration, and cognitive domains (Memory, Analysis, Agility)', () => {
    const code = fs.readFileSync(componentPath, 'utf8');
    expect(code).toContain("id: 'memory'");
    expect(code).toContain("id: 'analysis'");
    expect(code).toContain("id: 'agility'");
    expect(code).toContain("id: 'inhibition'");
    expect(code).toContain("id: 'all'");
    expect(code).toContain('gradeTarget');
    expect(code).toContain('durationMinutes');
  });

  it('includes client-side download utility with UTF-8 BOM encoding', () => {
    const code = fs.readFileSync(componentPath, 'utf8');
    expect(code).toContain('\\uFEFF');
    expect(code).toContain('downloadFile');
    expect(code).toContain('downloadMarkdown');
    expect(code).toContain('downloadHTML');
    expect(code).toContain('text/markdown');
    expect(code).toContain('text/html');
  });

  it('includes clipboard copy utility and HTML printable layout options', () => {
    const code = fs.readFileSync(componentPath, 'utf8');
    expect(code).toContain('copyToClipboard');
    expect(code).toContain('generatedHTML');
    expect(code).toContain('generatedMarkdown');
    expect(code).toContain('@media print');
  });

  it('includes explicit type="button" attributes on all interactive buttons', () => {
    const code = fs.readFileSync(componentPath, 'utf8');
    const buttonMatches = code.match(/<button[^>]*>/g) || [];
    expect(buttonMatches.length).toBeGreaterThan(0);
    for (const btnTag of buttonMatches) {
      expect(btnTag).toContain('type="button"');
    }
  });

  it('is referenced inside NeuroGymApp.svelte', () => {
    const appPath = path.join(__dirname, '../../src/components/neurogym/NeuroGymApp.svelte');
    const appCode = fs.readFileSync(appPath, 'utf8');
    expect(appCode).toContain("import NeuroWorkshopGenerator from './NeuroWorkshopGenerator.svelte'");
    expect(appCode).toContain('<NeuroWorkshopGenerator />');
  });
});
