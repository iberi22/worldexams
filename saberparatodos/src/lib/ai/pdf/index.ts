/**
 * WX-201 ally stub — PDF ingestion layer for estudio RAG flow.
 * This module is the external ally announced in WX-201.
 * estudio.astro imports from here via `src/lib/ai/pdf`.
 *
 * Real WX-201 will replace the body with pdf.js + worker.
 * This stub keeps the contract stable so WX-202 builds green.
 */

export interface ParsedPDF {
  text: string;
  numPages: number;
  info: { title?: string; author?: string };
  rawBytes: number;
}

export interface TextChunk {
  id: string;
  text: string;
  index: number;
  length: number;
}

/**
 * Parse a PDF File into plain text.
 * Tries pdf.js when available; falls back to naive decoding so
 * tests and offline flows don't break.
 */
export async function parsePDF(file: File): Promise<ParsedPDF> {
  const buffer = await file.arrayBuffer();

  // Try to lazy-load pdfjs-dist if present (optional dep)
  try {
    // @ts-ignore dynamic optional
    const pdfjs: any = await import('pdfjs-dist').catch(() => null);
    if (pdfjs?.getDocument) {
      const loadingTask = pdfjs.getDocument({ data: buffer, useSystemFonts: true });
      const pdf = await loadingTask.promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((it: any) => (typeof it.str === 'string' ? it.str : ''))
          .join(' ');
        fullText += pageText + '\n\n';
      }
      return {
        text: fullText.trim() || (await fallbackDecode(buffer)),
        numPages: pdf.numPages,
        info: { title: file.name },
        rawBytes: buffer.byteLength,
      };
    }
  } catch {
    // ignore, fallback below
  }

  const text = await fallbackDecode(buffer);
  // heuristic page count from text length
  const numPages = Math.max(1, Math.round(text.length / 2500) || 1);
  return { text, numPages, info: { title: file.name }, rawBytes: buffer.byteLength };
}

async function fallbackDecode(buffer: ArrayBuffer): Promise<string> {
  // naive: extract printable strings
  const bytes = new Uint8Array(buffer);
  let decoded = '';
  try {
    decoded = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
  } catch {
    decoded = '';
  }
  // Strip binary noise, keep readable segments > 20 chars
  const cleaned = decoded
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length > 100) return cleaned.slice(0, 200_000);
  // last resort: placeholder so RAG still demos
  return cleaned || `Contenido extraído de ${bytes.length} bytes (sin texto decodificable — usa un PDF con texto seleccionable).`;
}

/**
 * Chunk plain text into overlapping windows for RAG.
 */
export function chunkText(text: string, chunkSize = 800, overlap = 120): TextChunk[] {
  const clean = String(text || '').trim();
  if (!clean) return [];
  const chunks: TextChunk[] = [];
  let idx = 0;
  let start = 0;
  while (start < clean.length) {
    const end = Math.min(clean.length, start + chunkSize);
    const slice = clean.slice(start, end).trim();
    if (slice.length > 40) {
      chunks.push({ id: `chunk-${idx}`, text: slice, index: idx, length: slice.length });
      idx++;
    }
    if (end >= clean.length) break;
    start = end - overlap;
    if (start < 0) start = 0;
  }
  return chunks;
}

/**
 * Select top K chunks by simple term-frequency relevance.
 * Query = topic + subject keywords; no embedding needed offline.
 */
export function selectTopChunks(
  chunks: TextChunk[],
  query: string,
  k = 5,
): TextChunk[] {
  if (chunks.length === 0) return [];
  if (chunks.length <= k) return chunks;
  const terms = String(query || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3);
  const termSet = new Set(terms);
  if (termSet.size === 0) return chunks.slice(0, k);
  const scored = chunks.map((c) => {
    const lower = c.text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
    let score = 0;
    for (const t of termSet) {
      const occ = (lower.match(new RegExp(`\\b${escapeRegExp(t)}\\b`, 'g')) || []).length;
      score += occ * (t.length > 5 ? 2 : 1);
    }
    // slight boost for mid-doc chunks (often body)
    score += Math.max(0, 1 - Math.abs(c.index - chunks.length / 2) * 0.05);
    // penalize very short chunks
    if (c.length < 200) score *= 0.8;
    return { c, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, k).sort((a, b) => a.c.index - b.c.index);
  return top.map((s) => s.c);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Convenience: parse + chunk + select in one go */
export async function ingestPDFForRAG(
  file: File,
  opts?: { query?: string; chunkSize?: number; topK?: number },
): Promise<{ parsed: ParsedPDF; chunks: TextChunk[]; selected: TextChunk[] }> {
  const parsed = await parsePDF(file);
  const chunks = chunkText(parsed.text, opts?.chunkSize ?? 800);
  const selected = selectTopChunks(chunks, opts?.query ?? file.name.replace(/\.pdf$/i, ''), opts?.topK ?? 5);
  return { parsed, chunks, selected };
}
