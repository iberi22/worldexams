/**
 * Wave-Gov #1174 — MD Executive Report.
 *
 * Resumen pedagogico del salon en Markdown: metricas de grupo, desempeno
 * por pregunta con analisis de distractores y alertas de integridad.
 * Usa Intl.DateTimeFormat para fechas locales (es-CO / es-MX).
 */

import { tenantKey, type SalonResult, type SalonTenant } from './salon-shared';
import { computeRoomMetrics, type RoomMetrics } from './salon-metrics';
import {
  createAntiCheatMonitor,
  type AntiCheatMonitor,
  type CheatSignal,
  type TrafficLight,
} from './salon-anti-cheat';
import { formatLocalDate, t, type SalonLocale } from '../i18n';

export interface ReportInput {
  tenant: SalonTenant;
  results: SalonResult[];
  answerKey: Record<string, 'A' | 'B' | 'C' | 'D'>;
  audit?: AntiCheatMonitor;
  locale?: SalonLocale;
  now?: Date;
}

export function lightEmoji(light: TrafficLight): string {
  return light === 'green' ? 'verde' : light === 'yellow' ? 'amarillo' : 'rojo';
}

const SIGNAL_LABEL: Record<CheatSignal, string> = {
  tab_switch: 'cambio de pestana',
  paste: 'pegado de texto',
  fullscreen_exit: 'salida de pantalla completa',
  copy: 'copiado de texto',
};

export function signalLabel(signal: CheatSignal): string {
  return SIGNAL_LABEL[signal] ?? signal;
}

export function generateMarkdownReport(input: ReportInput): string {
  const locale: SalonLocale = input.locale ?? 'es-CO';
  const now = input.now ?? new Date();
  const metrics: RoomMetrics = computeRoomMetrics(input.results, input.answerKey);
  const audit = input.audit ?? createAntiCheatMonitor(input.tenant);

  const lines: string[] = [];
  lines.push(`# ${t('salon.report.title', locale)}`);
  lines.push('');
  lines.push(`- **Salon:** \`${tenantKey(input.tenant)}\``);
  lines.push(`- **${t('salon.report.date', locale)}:** ${formatLocalDate(now, locale)}`);
  lines.push(`- **Participantes:** ${metrics.n}`);
  lines.push('');

  lines.push(`## ${t('salon.report.section.summary', locale)}`);
  lines.push('');
  lines.push('| Metrica | Valor |');
  lines.push('| --- | ---: |');
  lines.push(`| Media | ${metrics.mean} |`);
  lines.push(`| Mediana | ${metrics.median} |`);
  lines.push(`| Desviacion estandar | ${metrics.stdev} |`);
  lines.push(`| Minimo | ${metrics.min} |`);
  lines.push(`| Maximo | ${metrics.max} |`);
  lines.push('');

  lines.push(`## ${t('salon.report.section.questions', locale)}`);
  lines.push('');
  lines.push('| Pregunta | Exito | Distractores | Mas elegida (error) |');
  lines.push('| --- | ---: | ---: | --- |');
  for (const q of metrics.questions) {
    const wrongEntries = (Object.entries(q.optionCounts) as [string, number][])
      .filter(([opt]) => opt !== input.answerKey[q.questionId])
      .sort((a, b) => b[1] - a[1]);
    const worst = wrongEntries[0] ? `${wrongEntries[0][0]} (${wrongEntries[0][1]})` : '-';
    lines.push(
      `| ${q.questionId} | ${(q.successRate * 100).toFixed(0)}% | ${(q.distractorRate * 100).toFixed(0)}% | ${worst} |`,
    );
  }
  if (metrics.hardest.length > 0) {
    lines.push('');
    lines.push(`Mas dificiles: ${metrics.hardest.join(', ')}.`);
  }
  lines.push('');

  lines.push(`## ${t('salon.report.section.alerts', locale)}`);
  lines.push('');
  const lights = audit.lights();
  const peers = Object.keys(lights);
  if (peers.length === 0) {
    lines.push('Sin alertas de integridad registradas.');
  } else {
    lines.push('| Participante | Semaforo |');
    lines.push('| --- | --- |');
    for (const p of peers) {
      lines.push(`| \`${p}\` | ${lightEmoji(lights[p])} |`);
    }
    const reds = audit.redPeers();
    if (reds.length > 0) {
      lines.push('');
      lines.push(`Participantes en alerta roja: ${reds.map((r) => `\`${r}\``).join(', ')}.`);
    }
  }
  lines.push('');
  lines.push('---');
  lines.push(`_Generado por WorldExams Wave-Gov · protocolo mesh-local (sin servidor central)._`);
  return lines.join('\n');
}

export function reportSignalStats(audit: AntiCheatMonitor): Record<CheatSignal, number> {
  const out: Record<CheatSignal, number> = {
    tab_switch: 0,
    paste: 0,
    fullscreen_exit: 0,
    copy: 0,
  };
  for (const e of audit.entries()) out[e.signal] += 1;
  return out;
}
