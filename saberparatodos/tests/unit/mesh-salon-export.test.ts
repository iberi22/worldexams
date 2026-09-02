import { describe, it, expect } from 'vitest';
import {
  CSV_BOM,
  escapeCsvField,
  exportGradesCsv,
  toCsvLine,
  buildExportRows,
} from '../../src/lib/mesh/salon-export';
import type { SalonResult } from '../../src/lib/mesh/salon-shared';

const tenant = { country: 'mx', grade: 11, subject: 'matematicas', examId: 'ex7' };

const results: SalonResult[] = [
  { peerId: 's1', score: 90.5, answers: { q1: 'A' }, answeredAt: '2026-08-01T10:00:00Z' },
  { peerId: 's2', score: 50, answers: { q1: 'B', q2: 'C' }, answeredAt: '2026-08-01T10:05:00Z' },
];

describe('#1172 CSV/Excel Exporter', () => {
  it('escapa campos con comas, comillas y saltos de linea', () => {
    expect(escapeCsvField('simple')).toBe('simple');
    expect(escapeCsvField('a,b')).toBe('"a,b"');
    expect(escapeCsvField('decir "hola"')).toBe('"decir ""hola"""');
    expect(toCsvLine([1, 'x,y'])).toBe('1,"x,y"');
  });

  it('SIEMPRE comienza con BOM UTF-8 (Excel-friendly)', () => {
    const csv = exportGradesCsv(tenant, results);
    expect(csv.startsWith(CSV_BOM)).toBe(true);
    expect(csv.charCodeAt(0)).toBe(0xfeff);
  });

  it('ordena por puntaje e incluye resumen media/mediana', () => {
    const csv = exportGradesCsv(tenant, results);
    const lines = csv.slice(1).split('\r\n');
    expect(lines[0]).toContain('mx:11:matematicas:ex7');
    expect(lines[2]).toContain('1,s1,90.5,1');
    expect(lines[3]).toContain('2,s2,50,2');
    expect(lines.some((l) => l.startsWith('Media,70.25'))).toBe(true);
    expect(lines.some((l) => l.startsWith('Mediana,70.25'))).toBe(true);
  });

  it('buildExportRows orden descendente y conteo de respuestas', () => {
    const rows = buildExportRows(results);
    expect(rows[0].alias).toBe('s1');
    expect(rows[1].answered).toBe(2);
    expect(buildExportRows([])).toEqual([]);
  });
});
