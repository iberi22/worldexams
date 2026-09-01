/**
 * saberparatodos/src/lib/ai/pdf-ingest.ts
 *
 * Local PDF ingest service for Studio v5.2 exam draft generation.
 * Uses dynamic imports to load PDF parsing tools on demand.
 */

export interface V52DraftPage {
  pageNumber: number;
  text: string;
}

export interface V52DraftMetadata {
  creador: 'local-llm';
  protocol_version: '5.2';
  fileName: string;
  fileSize: number;
  ingestedAt: number;
}

export interface V52DraftResult {
  text: string;
  numPages: number;
  pages: V52DraftPage[];
  excerpt: string;
  metadata: V52DraftMetadata;
}

export type IngestProgressStage = 'extract' | 'chunk' | 'embed' | 'persist';

export interface IngestPdfOptions {
  onProgress?: (stage: IngestProgressStage, progress: number, info?: string) => void;
  maxExcerptLength?: number;
}

/**
 * Ingests a local PDF file and extracts a structured v5.2 draft excerpt.
 * 100% local — bytes never leave the client device.
 */
export async function ingestPdfToV52Draft(
  file: File,
  options: IngestPdfOptions = {}
): Promise<V52DraftResult> {
  const { onProgress, maxExcerptLength = 1000 } = options;

  onProgress?.('extract', 0.1, 'Iniciando lectura de archivo PDF local…');

  // Dynamic import of PDF extractor module
  const extractorModule = await import(/* @vite-ignore */ './pdf/extractor.js' as string)
    .catch(() => import('./pdf/extractor'));
  const extractTextFromFile = extractorModule.extractTextFromFile || extractorModule.default?.extractTextFromFile;

  if (typeof extractTextFromFile !== 'function') {
    throw new Error('No se pudo cargar el módulo de extracción PDF.');
  }

  onProgress?.('extract', 0.4, 'Extrayendo texto por página…');
  const extraction = await extractTextFromFile(file);

  onProgress?.('chunk', 0.7, 'Sintetizando extracto v5.2…');
  const pages: V52DraftPage[] = extraction.pages.map((p: { pageNumber: number; text: string }) => ({
    pageNumber: p.pageNumber,
    text: p.text,
  }));

  const fullText = extraction.text || '';
  const excerpt =
    fullText.length > maxExcerptLength
      ? fullText.slice(0, maxExcerptLength) + '…'
      : fullText;

  onProgress?.('persist', 1.0, 'Ingesta local completada.');

  return {
    text: fullText,
    numPages: extraction.numPages || pages.length,
    pages,
    excerpt,
    metadata: {
      creador: 'local-llm',
      protocol_version: '5.2',
      fileName: file.name,
      fileSize: file.size,
      ingestedAt: Date.now(),
    },
  };
}
