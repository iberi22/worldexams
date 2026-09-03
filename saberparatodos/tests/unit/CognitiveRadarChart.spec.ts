import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

describe('CognitiveRadarChart Svelte Component', () => {
  const code = fs.readFileSync('src/components/neurogym/CognitiveRadarChart.svelte', 'utf8');

  it('renders a pure SVG pentagon radar chart without external charting libraries', () => {
    expect(code).toContain('<svg');
    expect(code).toContain('</svg>');
    expect(code).not.toContain("from 'chart.js'");
    expect(code).not.toContain("from 'd3'");
    expect(code).not.toContain("from 'recharts'");
  });

  it('maps the 5 required cognitive axes from the profile', () => {
    expect(code).toContain("label: 'Razonamiento (IQ)'");
    expect(code).toContain('profile.overallIQProxy.standardScore');

    expect(code).toContain("label: 'Memoria Trabajo'");
    expect(code).toContain('profile.workingMemory.standardScore');

    expect(code).toContain("label: 'Velocidad (PSI)'");
    expect(code).toContain('profile.processingSpeed.standardScore');

    expect(code).toContain("label: 'Agilidad Motora'");
    expect(code).toContain('profile.motorAgility.standardScore');

    expect(code).toContain("label: 'Flexibilidad'");
    expect(code).toContain('profile.analyticalFlexibility.standardScore');
  });

  it('implements standard score clamping and polar radius mapping [40, 160]', () => {
    expect(code).toContain('Math.max(40, Math.min(160, score))');
    expect(code).toContain('(clamped - 40) / 120');
  });

  it('calculates polar coordinates using trigonometric functions', () => {
    expect(code).toContain('Math.sin(angleRad)');
    expect(code).toContain('Math.cos(angleRad)');
    expect(code).toContain('scoreToRadius');
  });

  it('renders standard score 100 benchmark baseline polygon overlay', () => {
    expect(code).toContain('scoreToRadius(100');
    expect(code).toContain('stroke-dasharray="3,3"');
    expect(code).toContain('baselinePoints');
  });

  it('includes proper ARIA accessibility attributes and title tags', () => {
    expect(code).toContain('role="img"');
    expect(code).toContain('aria-label=');
    expect(code).toContain('<title>');
    expect(code).toContain('<desc>');
  });
});
