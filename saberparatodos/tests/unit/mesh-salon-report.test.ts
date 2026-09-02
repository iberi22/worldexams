import { describe, it, expect } from 'vitest';
import {
  generateMarkdownReport,
  lightEmoji,
  signalLabel,
  reportSignalStats,
} from '../../src/lib/mesh/salon-report';
import { createAntiCheatMonitor } from '../../src/lib/mesh/salon-anti-cheat';
import type { SalonResult } from '../../src/lib/mesh/salon-shared';

const tenant = { country: 'co', grade: 7, subject: 'lengua', examId: 'ex8' };
const answerKey = { q1: 'A' as const, q2: 'C' as const };

const results: SalonResult[] = [
  { peerId: 's1', score: 80, answers: { q1: 'A', q2: 'C' }, answeredAt: 'x' },
  { peerId: 's2', score: 40, answers: { q1: 'B', q2: 'C' }, answeredAt: 'y' },
];

describe('#1174 MD Executive Report', () => {
  it('estructura Markdown con metricas', () => {
    const md = generateMarkdownReport({
      tenant,
      results,
      answerKey,
      locale: 'es-CO',
      now: new Date('2026-08-30T14:00:00'),
    });
    expect(md.startsWith('# Informe pedagogico del salon')).toBe(true);
    expect(md).toContain('`co:7:lengua:ex8`');
    expect(md).toContain('## Resumen general');
    expect(md).toContain('| Media | 60 |');
    expect(md).toContain('| Desviacion estandar | 28.28 |');
    expect(md).toContain('## Desempeno por pregunta');
  });

  it('fecha local con Intl, no ISO UTC', () => {
    const md = generateMarkdownReport({
      tenant,
      results,
      answerKey,
      locale: 'es-MX',
      now: new Date('2026-08-30T14:00:00'),
    });
    expect(md).not.toContain('2026-08-30T14:00:00.000Z');
    expect(md).toMatch(/2026/);
  });

  it('distractores y semaforo anti-fraude incluidos', () => {
    const audit = createAntiCheatMonitor(tenant);
    audit.record('s2', 'paste', 1);
    audit.record('s2', 'paste', 2);
    audit.record('s2', 'paste', 3);
    const md = generateMarkdownReport({ tenant, results, answerKey, audit, locale: 'es-CO' });
    expect(md).toContain('## Alertas de integridad');
    expect(md).toContain('rojo');
    expect(md).toContain('Participantes en alerta roja: `s2`');
    expect(md).toContain('| q1 | 50%'); // s1 acerto q1, s2 no
    const stats = reportSignalStats(audit);
    expect(stats.paste).toBe(3);
    expect(stats.tab_switch).toBe(0);
  });

  it('helpers de etiquetas', () => {
    expect(lightEmoji('green')).toBe('verde');
    expect(lightEmoji('yellow')).toBe('amarillo');
    expect(lightEmoji('red')).toBe('rojo');
    expect(signalLabel('fullscreen_exit')).toBe('salida de pantalla completa');
  });
});
