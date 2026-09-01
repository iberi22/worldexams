import { describe, it, expect, beforeEach } from 'vitest';
import {
  mockEmbedding,
  createEmbedder,
  generateEmbedding,
  embedChunks,
  EMBEDDING_DIMS,
  DEFAULT_EMBEDDING_MODEL,
  __resetPipelineForTests,
} from '../embedder';
import type { Chunk } from '../chunker';

describe('embedder — MiniLM 384 dim local embedder stub', () => {
  beforeEach(() => {
    __resetPipelineForTests();
  });

  it('mockEmbedding genera un Float32Array de 384 dimensiones normalizado L2', () => {
    const text = 'Texto de prueba para embedding';
    const vec = mockEmbedding(text);
    expect(vec).toBeInstanceOf(Float32Array);
    expect(vec.length).toBe(384);
    expect(vec.length).toBe(EMBEDDING_DIMS);

    // L2 norm sum(vec[i]^2) ≈ 1
    let sumSq = 0;
    for (let i = 0; i < vec.length; i++) {
      sumSq += vec[i] * vec[i];
    }
    expect(sumSq).toBeCloseTo(1, 2);
  });

  it('mockEmbedding es determinístico para el mismo texto', () => {
    const text = 'El mismo texto da el mismo vector';
    const vec1 = mockEmbedding(text);
    const vec2 = mockEmbedding(text);
    expect(Array.from(vec1)).toEqual(Array.from(vec2));
  });

  it('createEmbedder con forceMock devuelve un Embedder local de 384 dims', async () => {
    const embedder = await createEmbedder({ forceMock: true });
    expect(embedder.modelId).toBe(DEFAULT_EMBEDDING_MODEL);
    expect(embedder.dims).toBe(384);

    const vec = await embedder.embed('Prueba embed');
    expect(vec).toBeInstanceOf(Float32Array);
    expect(vec.length).toBe(384);

    const batch = await embedder.embedBatch(['Texto A', 'Texto B']);
    expect(batch).toHaveLength(2);
    expect(batch[0].length).toBe(384);
    expect(batch[1].length).toBe(384);
  });

  it('generateEmbedding genera un vector de 384 dimensiones', async () => {
    const vec = await generateEmbedding('Un solo texto', { forceMock: true });
    expect(vec).toBeInstanceOf(Float32Array);
    expect(vec.length).toBe(384);
  });

  it('embedChunks asigna embeddings Float32Array(384) a una lista de chunks', async () => {
    const chunks: Chunk[] = [
      {
        id: 'chunk-0001',
        text: 'Primer chunk de información sobre ciencias.',
        page: 1,
        offset: 0,
        tokenCount: 8,
      },
      {
        id: 'chunk-0002',
        text: 'Segundo chunk sobre matemáticas y álgebra.',
        page: 1,
        offset: 50,
        tokenCount: 7,
      },
    ];

    const embedded = await embedChunks(chunks, { forceMock: true });
    expect(embedded).toHaveLength(2);
    for (const c of embedded) {
      expect(c.embedding).toBeDefined();
      expect(c.embedding).toBeInstanceOf(Float32Array);
      expect(c.embedding!.length).toBe(384);
    }
  });

  it('embedChunks con arreglo vacío devuelve []', async () => {
    const embedded = await embedChunks([]);
    expect(embedded).toEqual([]);
  });
});
