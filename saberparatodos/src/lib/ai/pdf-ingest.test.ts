import { describe, it, expect, vi } from 'vitest';
import { ingestPdfToV52Draft } from './pdf-ingest';

// Mock extractor module (Jules Studio)
vi.mock('./pdf/extractor', () => ({
  extractTextFromFile: vi.fn().mockResolvedValue({
    text: 'Texto de prueba del PDF para ingesta local v5.2.',
    pages: [
      { pageNumber: 1, text: 'Texto de prueba del PDF para ingesta local v5.2.' },
    ],
    numPages: 1,
    metadata: { title: 'Documento de Prueba' },
  }),
}));

describe('pdf-ingest service (Studio + MVP)', () => {
  it('extracts v5.2 draft from local PDF File (Studio)', async () => {
    const fakeFile = new File(['dummy pdf content'], 'evaluacion-matematicas.pdf', {
      type: 'application/pdf',
    });
    const progressLogs: string[] = [];
    const result: any = await ingestPdfToV52Draft(fakeFile, {
      onProgress: (stage, progress, info) => {
        progressLogs.push(`${stage}:${progress}:${info}`);
      },
    });
    expect(result).toBeDefined();
    expect(result.numPages).toBe(1);
    expect(result.pages).toHaveLength(1);
    expect(result.text).toContain('Texto de prueba del PDF');
    expect(result.excerpt).toContain('Texto de prueba');
    expect(result.metadata.creador).toBe('local-llm');
    expect(result.metadata.protocol_version).toBe('5.2');
    expect(result.metadata.fileName).toBe('evaluacion-matematicas.pdf');
    expect(progressLogs.length).toBeGreaterThan(0);
  });

  it('produces v5.2 draft skeleton from ArrayBuffer fallback (F9 MVP)', async () => {
    const fakePdf = new TextEncoder().encode('%PDF-1.4 fake content sobre fracciones y decimales para grado 6').buffer as ArrayBuffer;
    const res: any = await ingestPdfToV52Draft(fakePdf, { country: 'colombia', grade: 6, subject: 'matematicas', tema: 'fracciones', week: 'W05' });
    expect(res.skeleton.protocol_version).toBe('5.2');
    expect(res.skeleton.creador).toBe('local-llm');
    expect(res.skeleton.bundle_type).toBe('weekly-draft');
    expect(res.skeleton.tema).toBe('fracciones');
    expect(res.skeleton.grado).toBe(6);
    expect(res.skeleton.country).toBe('colombia');
    expect(res.text.length).toBeGreaterThan(0);
  });

  it('truncates long text and marks excerpt', async () => {
    const long = 'a '.repeat(7000);
    const buf = new TextEncoder().encode(long).buffer as ArrayBuffer;
    const res: any = await ingestPdfToV52Draft(buf);
    expect(res.text.length).toBeLessThanOrEqual(12000);
    expect(res.skeleton.excerpt.length).toBeGreaterThan(0);
  });
});
