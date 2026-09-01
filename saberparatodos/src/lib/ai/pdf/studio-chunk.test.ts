import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { chunkText, type Chunk } from './chunker';
import { createEmbedder, EMBEDDING_DIMS } from './embedder';
import { savePDFDoc, getPDFDoc, clearAllPDFDocs, type PDFDoc } from './storage';

/**
 * Helper to embed a list of chunks using local embedder.
 * Attaches a 384-dimensional embedding Float32Array to each chunk.
 */
export async function embedChunks(chunks: Chunk[]): Promise<Chunk[]> {
  const embedder = await createEmbedder({ forceMock: true });
  const texts = chunks.map((c) => c.text);
  const embeddings = await embedder.embedBatch(texts);
  return chunks.map((c, i) => ({
    ...c,
    embedding: embeddings[i],
  }));
}

/**
 * Helper to persist chunks as a PDFDoc record in IndexedDB.
 */
export async function saveChunks(
  hash: string,
  chunks: Chunk[],
  fileName = 'test.pdf'
): Promise<PDFDoc> {
  const doc: PDFDoc = {
    id: hash,
    hash,
    fileName,
    fileSize: 1024,
    numPages: 1,
    chunks,
    metadata: { title: 'Test PDF', numPages: 1 },
    createdAt: Date.now(),
    modelId: 'Xenova/all-MiniLM-L6-v2',
  };
  await savePDFDoc(doc);
  return doc;
}

/**
 * Helper to load chunks and document metadata from IndexedDB for a given hash.
 */
export async function loadChunks(hash: string): Promise<PDFDoc | null> {
  return getPDFDoc(hash);
}

describe('studio-chunk — PDF Studio chunk embedding & storage persistence', () => {
  beforeEach(async () => {
    await clearAllPDFDocs();
  });

  it('embedChunks returns 384 dim vectors for each chunk', async () => {
    const text = 'Saber Para Todos es una plataforma educativa offline-first para estudiantes.';
    const rawChunks = chunkText(text, { docId: 'doc-embed-test' });
    expect(rawChunks.length).toBeGreaterThan(0);

    const embedded = await embedChunks(rawChunks);
    expect(embedded).toHaveLength(rawChunks.length);

    for (const chunk of embedded) {
      expect(chunk.embedding).toBeDefined();
      expect(chunk.embedding).toBeInstanceOf(Float32Array);
      expect(chunk.embedding?.length).toBe(EMBEDDING_DIMS); // 384 dims
    }
  });

  it('saveChunks and loadChunks round-trip correctly with IndexedDB', async () => {
    const text = 'Texto de prueba para verificar persistencia en IndexedDB con fake-indexeddb.';
    const rawChunks = chunkText(text, { docId: 'doc-store-test' });
    const chunksWithEmbeddings = await embedChunks(rawChunks);
    const testHash = 'a1b2c3d4e5f6';

    const savedDoc = await saveChunks(testHash, chunksWithEmbeddings, 'manual-studio.pdf');
    expect(savedDoc.hash).toBe(testHash);
    expect(savedDoc.chunks).toHaveLength(chunksWithEmbeddings.length);

    const loadedDoc = await loadChunks(testHash);
    expect(loadedDoc).not.toBeNull();
    expect(loadedDoc?.hash).toBe(testHash);
    expect(loadedDoc?.fileName).toBe('manual-studio.pdf');
    expect(loadedDoc?.chunks).toHaveLength(chunksWithEmbeddings.length);
    expect(loadedDoc?.chunks[0].text).toBe(rawChunks[0].text);
    expect(loadedDoc?.chunks[0].embedding).toBeDefined();
    expect(loadedDoc?.chunks[0].embedding?.length).toBe(384);
  });
});
