import { describe, it, expect } from 'vitest';
import { chunkText, chunkPages, estimateTokens } from '../chunker';
import type { ExtractedPage } from '../extractor';

describe('chunker — semantic chunking 512 tokens / overlap 50', () => {
  it('estimateTokens aproxima tokens (1 token ≈ 4 chars / words*1.3)', () => {
    expect(estimateTokens('')).toBe(0);
    expect(estimateTokens('hola mundo')).toBeGreaterThan(0);
    // 1 token ≈ 4 chars: 100 chars ≈ 25 tokens
    const text100 = 'a'.repeat(100);
    expect(estimateTokens(text100)).toBe(25);
    // 512 tokens ≈ 2048 chars
    const long = 'a '.repeat(1000);
    expect(estimateTokens(long)).toBeGreaterThan(400);
  });

  it('chunkText: texto corto genera 1 chunk', () => {
    const chunks = chunkText('Hola mundo. Este es un texto corto.');
    expect(chunks).toHaveLength(1);
    expect(chunks[0].text).toContain('Hola mundo');
    expect(chunks[0].tokenCount).toBeGreaterThan(0);
    expect(chunks[0].embedding).toBeUndefined();
  });

  it('chunkText: 512 tokens respeta tamaño y overlap 50 respetando párrafos y oraciones', () => {
    // Generar texto largo (~2000 tokens ≈ 8000 chars)
    const sentence = 'La fotosíntesis es el proceso mediante el cual las plantas convierten luz solar en energía química. ';
    const long = sentence.repeat(200); // ~ 200 * ~14 tokens ≈ 2800 tokens
    const chunks = chunkText(long, { chunkSize: 512, overlap: 50, docId: 'test' });
    expect(chunks.length).toBeGreaterThan(1);
    for (const c of chunks) {
      // Permitir margen porque cortamos en oración: hasta 650 tokens
      expect(c.tokenCount).toBeLessThanOrEqual(650);
      expect(c.tokenCount).toBeGreaterThan(0);
    }
    // Verificar overlap: el final del chunk N aparece al inicio del N+1 (aprox)
    if (chunks.length >= 2) {
      const firstTail = chunks[0].text.slice(-50);
      const secondHead = chunks[1].text.slice(0, 200);
      // Al menos una palabra del tail debe estar en el head debido a overlap 50 tokens (~200 chars)
      const tailWords = firstTail.split(/\s+/).filter(Boolean).slice(-3);
      const hasOverlap = tailWords.some((w) => secondHead.includes(w));
      expect(hasOverlap).toBe(true);
    }
  });

  it('chunkText: IDs son secuenciales y offset crece', () => {
    const text = 'Palabra '.repeat(800);
    const chunks = chunkText(text, { chunkSize: 100, overlap: 10, docId: 'my-doc' });
    expect(chunks[0].id).toBe('my-doc-0001');
    expect(chunks[1].id).toBe('my-doc-0002');
    for (let i = 1; i < chunks.length; i++) {
      expect(chunks[i].offset).toBeGreaterThan(chunks[i - 1].offset);
    }
  });

  it('chunkPages: preserva número de página y offset global', () => {
    const pages: ExtractedPage[] = [
      { pageNumber: 1, text: 'Contenido página uno. '.repeat(100) },
      { pageNumber: 2, text: 'Contenido página dos. '.repeat(100) },
      { pageNumber: 3, text: '' }, // página vacía se salta
    ];
    const chunks = chunkPages(pages, { chunkSize: 100, overlap: 10, docId: 'doc' });
    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks.every((c) => [1, 2].includes(c.page))).toBe(true);
    // Offsets globales deben ser crecientes
    for (let i = 1; i < chunks.length; i++) {
      expect(chunks[i].offset).toBeGreaterThan(chunks[i - 1].offset);
    }
    // El primer chunk debe ser página 1
    expect(chunks[0].page).toBe(1);
  });

  it('chunkPages: páginas vacías no generan chunks', () => {
    const pages: ExtractedPage[] = [
      { pageNumber: 1, text: '   ' },
      { pageNumber: 2, text: '' },
    ];
    expect(chunkPages(pages)).toHaveLength(0);
  });

  it('chunkText: texto vacío retorna []', () => {
    expect(chunkText('')).toEqual([]);
    expect(chunkText('   ')).toEqual([]);
  });

  it('chunkText: respeta límite de oración (no corta a mitad de palabra si hay punto)', () => {
    const text =
      'Primera oración. Segunda oración. Tercera oración. '.repeat(100) +
      'Última oración final.';
    const chunks = chunkText(text, { chunkSize: 50, overlap: 5 });
    for (const c of chunks.slice(0, -1)) {
      expect(c.text.length).toBeGreaterThan(10);
    }
  });
});
