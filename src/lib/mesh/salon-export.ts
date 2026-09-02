/**
 * Wave-Gov #1172 — CSV/Excel Exporter.
 *
 * Genera la planilla completa de calificaciones del salon en CSV con
 * UTF-8 BOM (prefijo \uFEFF) para que Excel lo detecte correctamente.
 */

import { tenantKey, type SalonResult, type SalonTenant } from './salon-shared';
import { mean, median, round2 } from './salon-metrics';

export const CSV_BOM = '\uFEFF';

export interface ExportRow {
  alias: string;
  score: number;
  answered: number;
  answeredAt: string;
}

/** Escapa un campo CSV: comillas dobles, campos con , " o saltos de linea. */
export function escapeCsvField(value: string | number): string {
  const s = String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function buildExportRows(results: SalonResult[]): ExportRow[] {
  return [...results]
    .sort((a, b) => b.score - a.score)
    .map((r) => ({
      alias: r.peerId,
      score: round2(r.score),
      answered: Object.keys(r.answers).length,
      answeredAt: r.answeredAt,
    }));
}

/** Cabeceras en espanol (neutro), validas para es-CO y es-MX. */
export const CSV_HEADERS = ['Posicion', 'Identificador', 'Puntaje', 'Preguntas', 'Fecha'] as const;

export function toCsvLine(fields: (string | number)[]): string {
  return fields.map(escapeCsvField).join(',');
}

/**
 * CSV completo: metadatos del tenant, filas ordenadas por puntaje y
 * resumen (media/mediana). Siempre comienza con BOM UTF-8.
 */
export function exportGradesCsv(tenant: SalonTenant, results: SalonResult[]): string {
  const lines: string[] = [];
  lines.push(toCsvLine([`Salon ${tenantKey(tenant)}`]));
  lines.push(toCsvLine([...CSV_HEADERS]));
  buildExportRows(results).forEach((row, i) => {
    lines.push(toCsvLine([i + 1, row.alias, row.score, row.answered, row.answeredAt]));
  });
  const scores = results.map((r) => r.score);
  if (scores.length > 0) {
    lines.push('');
    lines.push(toCsvLine(['Media', round2(mean(scores))]));
    lines.push(toCsvLine(['Mediana', round2(median(scores))]));
  }
  return CSV_BOM + lines.join('\r\n') + '\r\n';
}

/** Dispara la descarga en navegador (no-op en SSR/tests sin document). */
export function downloadCsv(filename: string, csv: string): boolean {
  if (typeof document === 'undefined' || typeof URL === 'undefined') return false;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return true;
}
