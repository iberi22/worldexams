import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveChunks,
  loadChunks,
  getChunksKey,
  savePDFDoc,
  getPDFDoc,
  listPDFDocs,
  deletePDFDoc,
  clearAllPDFDocs,
  hashBuffer,
  type PDFDoc,
} from '../storage';
import type { Chunk } from '../chunker';

describe('storage — IndexedDB / idb 100% local PDF storage', () => {
  beforeEach(async () => {
    await clearAllPDFDocs();
  });

  it('getChunksKey genera la clave con prefijo pdf-chunks-', () => {
    const hash = 'abc12345';
    expect(getChunksKey(hash)).toBe('pdf-chunks-abc12345');
  });

  it('saveChunks y loadChunks guardan y recuperan chunks por hash', async () => {
    const hash = 'hash-test-chunks-1';
    const chunks: Chunk[] = [
      {
        id: 'chunk-1',
        text: 'Contenido del chunk 1',
        page: 1,
        offset: 0,
        tokenCount: 5,
        embedding: new Float32Array(384),
      },
      {
        id: 'chunk-2',
        text: 'Contenido del chunk 2',
        page: 2,
        offset: 25,
        tokenCount: 5,
      },
    ];

    await saveChunks(hash, chunks);
    const loaded = await loadChunks(hash);

    expect(loaded).toHaveLength(2);
    expect(loaded[0].id).toBe('chunk-1');
    expect(loaded[0].text).toBe('Contenido del chunk 1');
    expect(loaded[1].id).toBe('chunk-2');
  });

  it('loadChunks con hash inexistente retorna []', async () => {
    const loaded = await loadChunks('hash-inexistente');
    expect(loaded).toEqual([]);
  });

  it('hashBuffer genera un hash consistente', async () => {
    const encoder = new TextEncoder();
    const buffer = encoder.encode('Hola mundo PDF').buffer;
    const h1 = await hashBuffer(buffer);
    const h2 = await hashBuffer(buffer);
    expect(typeof h1).toBe('string');
    expect(h1.length).toBeGreaterThan(0);
    expect(h1).toBe(h2);
  });

  it('savePDFDoc y getPDFDoc guardan y obtienen un PDFDoc completo', async () => {
    const hash = 'pdf-doc-hash-100';
    const doc: PDFDoc = {
      id: hash,
      hash,
      fileName: 'ejemplo.pdf',
      fileSize: 1024,
      numPages: 3,
      chunks: [
        {
          id: 'chunk-1',
          text: 'Texto página 1',
          page: 1,
          offset: 0,
          tokenCount: 3,
        },
      ],
      metadata: {
        numPages: 3,
        info: { Title: 'Documento Ejemplo' },
      },
      createdAt: Date.now(),
    };

    await savePDFDoc(doc);
    const loaded = await getPDFDoc(hash);

    expect(loaded).not.toBeNull();
    expect(loaded?.hash).toBe(hash);
    expect(loaded?.fileName).toBe('ejemplo.pdf');
    expect(loaded?.chunks).toHaveLength(1);
  });

  it('listPDFDocs no incluye las entradas internas de chunks (pdf-chunks-)', async () => {
    const docHash = 'pdf-doc-hash-200';
    const doc: PDFDoc = {
      id: docHash,
      hash: docHash,
      fileName: 'documento2.pdf',
      fileSize: 2048,
      numPages: 5,
      chunks: [],
      metadata: { numPages: 5, info: {} },
      createdAt: Date.now(),
    };

    await savePDFDoc(doc);
    await saveChunks(docHash, [{ id: 'c1', text: 'Chunk t', page: 1, offset: 0, tokenCount: 2 }]);

    const docs = await listPDFDocs();
    expect(docs.some((d) => d.hash === docHash)).toBe(true);
    expect(docs.some((d) => d.hash.startsWith('pdf-chunks-'))).toBe(false);
  });

  it('deletePDFDoc elimina el documento', async () => {
    const docHash = 'pdf-doc-to-delete';
    const doc: PDFDoc = {
      id: docHash,
      hash: docHash,
      fileName: 'borrar.pdf',
      fileSize: 500,
      numPages: 1,
      chunks: [],
      metadata: { numPages: 1, info: {} },
      createdAt: Date.now(),
    };

    await savePDFDoc(doc);
    await deletePDFDoc(docHash);

    const loaded = await getPDFDoc(docHash);
    expect(loaded).toBeNull();
  });
});
