/**
 * WX-201 — Ingesta PDF 100% local (web-llm / WebGPU)
 * PDF nunca sale del dispositivo. Flujo: extracción → chunking → embeddings → IndexedDB.
 *
 * Uso:
 *   import { parsePDF, getPDFDoc, listPDFDocs } from '$lib/ai/pdf';
 *   const doc = await parsePDF(file);
 */

export type { ExtractedPage, ExtractionResult, PDFMetadata } from './extractor';
export { extractTextFromArrayBuffer, extractTextFromFile, extractTextFromUint8Array } from './extractor';

export type { Chunk, ChunkerOptions } from './chunker';
export { chunkText, chunkPages, estimateTokens, tokensToChars } from './chunker';

export { DEFAULT_EMBEDDING_MODEL, EMBEDDING_DIMS, mockEmbedding, createEmbedder, generateEmbedding } from './embedder';
export type { Embedder, EmbedderOptions } from './embedder';

export type { PDFDoc } from './storage';
export { savePDFDoc, getPDFDoc, listPDFDocs, deletePDFDoc, clearAllPDFDocs, hashBuffer, hashFile, getNamespace } from './storage';

import { extractTextFromArrayBuffer } from './extractor';
import { chunkPages } from './chunker';
import { createEmbedder, DEFAULT_EMBEDDING_MODEL } from './embedder';
import { savePDFDoc, hashBuffer } from './storage';
import type { PDFDoc } from './storage';

export interface ParsePDFOptions {
  /** Modelo de embeddings (default Xenova/all-MiniLM-L6-v2). Si es undefined usa mock en tests. */
  modelId?: string;
  /** Si true, fuerza mock embeddings (útil tests / sin WebGPU) */
  forceMockEmbeddings?: boolean;
  chunkSize?: number;
  overlap?: number;
  onProgress?: (stage: 'extract' | 'chunk' | 'embed' | 'persist', progress: number, info?: string) => void;
}

/**
 * Parsea un PDF 100% local.
 * @param file - File del input <input type="file">
 * @param options - opciones de chunking/embeddings
 * @returns PDFDoc con chunks + embeddings y metadatos, ya persistido en IndexedDB (wx-pdf-{hash})
 */
export async function parsePDF(file: File, options: ParsePDFOptions = {}): Promise<PDFDoc> {
  const { modelId = DEFAULT_EMBEDDING_MODEL, forceMockEmbeddings, chunkSize, overlap, onProgress } = options;

  onProgress?.('extract', 0, 'Extrayendo texto…');
  const buffer = await file.arrayBuffer();
  const hash = await hashBuffer(buffer);
  const extraction = await extractTextFromArrayBuffer(buffer);
  onProgress?.('extract', 1, `Extraídas ${extraction.numPages} páginas`);

  onProgress?.('chunk', 0, 'Segmentando…');
  const docId = `wx-pdf-${hash.slice(0, 8)}`;
  const chunks = chunkPages(extraction.pages, {
    chunkSize: chunkSize ?? 512,
    overlap: overlap ?? 50,
    docId,
  });
  onProgress?.('chunk', 1, `${chunks.length} chunks`);

  onProgress?.('embed', 0, 'Generando embeddings (100% local)…');
  // En entorno test forzamos mock para no descargar modelo
  const isTest = typeof process !== 'undefined' && (process.env?.VITEST === 'true' || process.env?.NODE_ENV === 'test');
  const embedder = await createEmbedder({
    modelId,
    forceMock: forceMockEmbeddings ?? isTest,
    onProgress: (p, s) => onProgress?.('embed', p, s),
  });

  const texts = chunks.map((c) => c.text);
  const embeddings = await embedder.embedBatch(texts);
  for (let i = 0; i < chunks.length; i++) {
    chunks[i].embedding = embeddings[i];
  }
  await embedder.dispose();
  onProgress?.('embed', 1, 'Embeddings listos');

  const doc: PDFDoc = {
    id: hash,
    hash,
    fileName: file.name,
    fileSize: file.size,
    numPages: extraction.numPages,
    chunks,
    metadata: extraction.metadata,
    createdAt: Date.now(),
    modelId,
  };

  onProgress?.('persist', 0, 'Guardando en IndexedDB…');
  await savePDFDoc(doc);
  onProgress?.('persist', 1, `Persistido en ${`wx-pdf-${hash}`}`);

  return doc;
}

/**
 * Parsea desde ArrayBuffer / Uint8Array (útil en tests o cuando ya se tiene el buffer).
 */
export async function parsePDFFromBuffer(
  buffer: ArrayBuffer,
  fileName = 'document.pdf',
  options: ParsePDFOptions = {}
): Promise<PDFDoc> {
  const file = new File([buffer], fileName, { type: 'application/pdf' });
  return parsePDF(file, options);
}

/**
 * Helper de alto nivel para estudio.astro:
 * Ingesta un archivo PDF para RAG y retorna el texto consolidado y los chunks más relevantes.
 */
export async function ingestPDFForRAG(
  file: File,
  options: { query?: string; topK?: number; chunkSize?: number; overlap?: number } = {}
): Promise<{
  parsed: { text: string; numPages: number; metadata?: unknown };
  selected: import('./chunker').Chunk[];
  doc: PDFDoc;
}> {
  const doc = await parsePDF(file, {
    chunkSize: options.chunkSize ?? 900,
    overlap: options.overlap ?? 50,
  });
  const text = doc.chunks.map((c) => c.text).join('\n\n');
  const topK = options.topK ?? 5;
  const selected = doc.chunks.slice(0, topK);
  return {
    parsed: {
      text,
      numPages: doc.numPages,
      metadata: doc.metadata,
    },
    selected,
    doc,
  };
}

