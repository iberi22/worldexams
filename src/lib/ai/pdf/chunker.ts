/**
 * WX-201 — Semantic Chunker 100% local
 * Chunking 512 tokens con overlap 50 tokens.
 * Estimación de tokens sin dependencias externas (aprox 1 token ≈ 4 chars ≈ 0.75 palabras).
 * No requiere red ni modelos externos.
 */

import type { ExtractedPage } from './extractor';

export interface Chunk {
  id: string;
  text: string;
  /** Embedding opcional — se rellena en embedder.ts */
  embedding?: Float32Array;
  page: number;
  /** Offset en caracteres dentro del documento completo */
  offset: number;
  /** Token count estimado del chunk */
  tokenCount: number;
}

export interface ChunkerOptions {
  /** Tamaño máximo por chunk en tokens (default 512) */
  chunkSize?: number;
  /** Overlap entre chunks consecutivos en tokens (default 50) */
  overlap?: number;
  /** Separador para split inicial — intenta respetar párrafos/oraciones */
  separator?: string;
}

const DEFAULT_CHUNK_SIZE = 512;
const DEFAULT_OVERLAP = 50;

/**
 * Estimación rápida de tokens: heurística usada por transformers/MiniLM
 *  - 1 token ≈ 4 caracteres para español/inglés
 *  - Ajustamos con conteo de palabras para textos cortos
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  // Método híbrido: max(chars/4, words*1.3) para no subestimar
  const chars = text.length;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(Math.max(chars / 4, words * 1.3));
}

export function tokensToChars(tokens: number): number {
  return Math.ceil(tokens * 4);
}

/**
 * Divide un texto largo en chunks de ~chunkSize tokens con overlap.
 * Respeta límites de oración cuando es posible (busca punto final cercano).
 */
export function chunkText(
  text: string,
  options: ChunkerOptions & { docId?: string; startPage?: number } = {}
): Chunk[] {
  const chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
  const overlap = options.overlap ?? DEFAULT_OVERLAP;
  const docId = options.docId ?? 'chunk';
  const startPage = options.startPage ?? 1;

  if (!text || !text.trim()) return [];

  const approxChunkChars = tokensToChars(chunkSize);
  const approxOverlapChars = tokensToChars(overlap);

  const chunks: Chunk[] = [];
  let offset = 0;
  let chunkIndex = 0;

  // Normalizar espacios pero preservar párrafos
  const normalized = text.replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ').trim();

  while (offset < normalized.length) {
    let end = Math.min(offset + approxChunkChars, normalized.length);

    // Si no es el último chunk, intentar cortar en límite de oración/párrafo
    if (end < normalized.length) {
      const window = normalized.slice(offset, end);
      // Buscar último separador de oración dentro del último 20% del chunk
      const searchStart = Math.floor(window.length * 0.8);
      const tail = window.slice(searchStart);
      const sentenceBreak = tail.lastIndexOf('. ');
      const paragraphBreak = tail.lastIndexOf('\n\n');
      const breakPos =
        paragraphBreak !== -1
          ? searchStart + paragraphBreak + 2
          : sentenceBreak !== -1
            ? searchStart + sentenceBreak + 2
            : -1;

      if (breakPos !== -1 && breakPos > window.length * 0.5) {
        end = offset + breakPos;
      }
    }

    const slice = normalized.slice(offset, end).trim();
    if (slice) {
      chunks.push({
        id: `${docId}-${String(chunkIndex + 1).padStart(4, '0')}`,
        text: slice,
        page: startPage, // se corrige en chunkPages si hay paginado
        offset,
        tokenCount: estimateTokens(slice),
      });
      chunkIndex++;
    }

    if (end >= normalized.length) break;
    // Avanzar con overlap
    offset = end - approxOverlapChars;
    if (offset < 0) offset = 0;
    // Evitar bucle infinito si overlap >= chunkSize
    if (offset >= end) offset = end;
  }

  return chunks;
}

/**
 * Chunking por páginas — preserva número de página por chunk.
 * Cada página se chunkea independientemente, manteniendo offset global y page.
 */
export function chunkPages(
  pages: ExtractedPage[],
  options: ChunkerOptions & { docId?: string } = {}
): Chunk[] {
  const chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
  const overlap = options.overlap ?? DEFAULT_OVERLAP;
  const docId = options.docId ?? 'doc';

  if (!pages || pages.length === 0) return [];

  const allChunks: Chunk[] = [];
  let globalOffset = 0;
  let globalIndex = 0;

  for (const page of pages) {
    if (!page.text || !page.text.trim()) {
      globalOffset += page.text.length + 2; // separador entre páginas
      continue;
    }

    const pageChunks = chunkText(page.text, {
      chunkSize,
      overlap,
      docId: `${docId}-p${page.pageNumber}`,
      startPage: page.pageNumber,
    });

    for (const c of pageChunks) {
      // Re-mapear id y offset global
      allChunks.push({
        ...c,
        id: `${docId}-${String(globalIndex + 1).padStart(4, '0')}`,
        offset: globalOffset + c.offset,
        page: page.pageNumber,
      });
      globalIndex++;
    }

    globalOffset += page.text.length + 2; // \n\n separador
  }

  return allChunks;
}

/**
 * Utilidad: reconstruye texto desde chunks (útil para verificar overlap no pierde contenido)
 */
export function reconstructText(chunks: Chunk[]): string {
  return chunks.map((c) => c.text).join('\n\n');
}
