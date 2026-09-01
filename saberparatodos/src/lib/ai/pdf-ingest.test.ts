import { describe, it, expect, vi } from 'vitest';
import { ingestPdfToV52Draft } from './pdf-ingest';

// Mock extractor module
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

describe('pdf-ingest service', () => {
  it('extracts v5.2 draft from local PDF file', async () => {
    const fakeFile = new File(['dummy pdf content'], 'evaluacion-matematicas.pdf', {
      type: 'application/pdf',
    });

    const progressLogs: string[] = [];
    const result = await ingestPdfToV52Draft(fakeFile, {
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
});
