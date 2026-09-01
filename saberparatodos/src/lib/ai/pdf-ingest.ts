/**
 * saberparatodos/src/lib/ai/pdf-ingest.ts — MERGED F9 MVP + Jules Studio (Wave 11.05)
 * Soporta File (Studio UI con onProgress + extractor) y ArrayBuffer (ingesta MVP fallback)
 * 100% local — bytes nunca salen del dispositivo. KISS: dynamic import, fallback UTF-8, skeleton v5.2
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
  // Backward-compat para F9 MVP tests (skeleton + truncated)
  skeleton?: PdfIngestSkeleton;
  truncated?: boolean;
  // Alias legacy: pages count number y skeleton
  pagesCount?: number;
}

export type IngestProgressStage = 'extract' | 'chunk' | 'embed' | 'persist';

export interface IngestPdfOptions {
  onProgress?: (stage: IngestProgressStage, progress: number, info?: string) => void;
  maxExcerptLength?: number;
  // F9 MVP opts (cuando input es ArrayBuffer)
  country?: string;
  grade?: number;
  subject?: string;
  tema?: string;
  week?: string;
}

export interface PdfIngestSkeleton {
  id: string;
  country: string;
  grado: number;
  asignatura: string;
  tema: string;
  periodo: 'weekly';
  week: string;
  year: number;
  bundle_type: 'weekly-draft';
  protocol_version: '5.2';
  total_questions: number;
  bundle_size: number;
  alignment: string;
  creador: 'local-llm';
  source: 'pdf-ingest';
  excerpt: string;
}

export interface PdfIngestResult {
  text: string;
  pages: number;
  truncated: boolean;
  skeleton: PdfIngestSkeleton;
}

const MAX_CHARS = 12000;

/**
 * Ingesta local PDF → borrador v5.2. Acepta File (Studio) o ArrayBuffer (F9 MVP).
 */
export async function ingestPdfToV52Draft(
  input: File | ArrayBuffer,
  options: IngestPdfOptions = {}
): Promise<V52DraftResult & PdfIngestResult> {
  const { onProgress, maxExcerptLength = 1000, country, grade, subject, tema, week } = options;

  // --- Caso ArrayBuffer (F9 MVP) — legacy skeleton API ---
  if (input instanceof ArrayBuffer || (typeof ArrayBuffer !== 'undefined' && input && (input as any).byteLength !== undefined && !(input as any).name)) {
    const pdfBytes = input as ArrayBuffer;
    let text = '';
    let pagesCount = 0;
    try {
      const pdfjs: any = await import('pdfjs-dist').catch(() => null);
      if (pdfjs) {
        const task = pdfjs.getDocument({ data: pdfBytes, verbosity: 0 });
        const pdf = await task.promise;
        pagesCount = pdf.numPages;
        const maxPages = Math.min(pagesCount, 5);
        const parts: string[] = [];
        for (let i = 1; i <= maxPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = (content.items as any[]).map((it: any) => it.str).join(' ');
          parts.push(pageText);
        }
        text = parts.join('\n\n');
      } else throw new Error('pdfjs no disponible');
    } catch {
      try {
        text = new TextDecoder('utf-8').decode(new Uint8Array(pdfBytes)).slice(0, MAX_CHARS);
        pagesCount = 1;
      } catch { text = ''; pagesCount = 0; }
    }
    const truncated = text.length >= MAX_CHARS || pagesCount > 5;
    const excerpt = text.slice(0, 800).replace(/\s+/g, ' ').trim();
    const c = (country || 'colombia').toLowerCase();
    const g = grade ?? 6;
    const asig = (subject || 'matematicas').toLowerCase();
    const t = (tema || 'pdf-ingest-mvp').toLowerCase();
    const w = week || 'W01';
    const skeleton: PdfIngestSkeleton = {
      id: `${c.slice(0, 2).toUpperCase()}-${asig.slice(0, 3).toUpperCase()}-${g}-2026-${w}-${t}-001-draft-bundle`,
      country: c, grado: g, asignatura: asig, tema: t, periodo: 'weekly', week: w, year: 2026,
      bundle_type: 'weekly-draft', protocol_version: '5.2', total_questions: 0, bundle_size: 0,
      alignment: 'DBA MEN Colombia (draft local-llm, requiere curaduría)', creador: 'local-llm', source: 'pdf-ingest', excerpt,
    };
    const result: any = {
      text: text.slice(0, MAX_CHARS), numPages: pagesCount, pages: [{ pageNumber: 1, text }], excerpt,
      metadata: { creador: 'local-llm', protocol_version: '5.2', fileName: 'arraybuffer.pdf', fileSize: pdfBytes.byteLength, ingestedAt: Date.now() },
      skeleton, truncated, pagesCount,
    };
    return result as any;
  }

  // --- Caso File (Jules Studio) ---
  const file = input as File;
  onProgress?.('extract', 0.1, 'Iniciando lectura de archivo PDF local…');
  let extraction: any = null;
  try {
    const extractorModule: any = await import('./pdf/extractor.js' as string).catch(() => import('./pdf/extractor'));
    const fn = extractorModule.extractTextFromFile || extractorModule.default?.extractTextFromFile || extractorModule.extractTextFromArrayBuffer;
    if (typeof fn === 'function') {
      // Si el extractor acepta File, úsalo; si no, lee como ArrayBuffer
      if (fn.length === 1) {
        const buf = await file.arrayBuffer();
        try { extraction = await fn(buf); } catch { extraction = await extractorModule.extractTextFromFile?.(file); }
      } else extraction = await fn(file);
    }
  } catch {}
  // Fallback si extractor no disponible o falló: lee como texto
  if (!extraction) {
    try {
      const buf = await file.arrayBuffer();
      const txt = new TextDecoder('utf-8').decode(new Uint8Array(buf)).slice(0, MAX_CHARS);
      extraction = { text: txt, pages: [{ pageNumber: 1, text: txt }], numPages: 1, metadata: { title: file.name } };
    } catch { extraction = { text: '', pages: [], numPages: 0, metadata: {} }; }
  }
  onProgress?.('chunk', 0.7, 'Sintetizando extracto v5.2…');
  const pages: V52DraftPage[] = (extraction.pages || []).map((p: any) => ({ pageNumber: p.pageNumber, text: p.text }));
  const fullText = extraction.text || '';
  const excerpt = fullText.length > maxExcerptLength ? fullText.slice(0, maxExcerptLength) + '…' : fullText;
  onProgress?.('persist', 1.0, 'Ingesta local completada.');
  // Skeleton para compatibilidad con tests F9 que esperan skeleton cuando se pasa ArrayBuffer opts (aunque aquí es File, lo generamos también)
  const c = (country || 'colombia').toLowerCase();
  const g = grade ?? 6;
  const asig = (subject || 'matematicas').toLowerCase();
  const t = (tema || 'pdf-ingest-mvp').toLowerCase();
  const w = week || 'W01';
  const skeleton: PdfIngestSkeleton = {
    id: `${c.slice(0, 2).toUpperCase()}-${asig.slice(0, 3).toUpperCase()}-${g}-2026-${w}-${t}-001-draft-bundle`,
    country: c, grado: g, asignatura: asig, tema: t, periodo: 'weekly', week: w, year: 2026,
    bundle_type: 'weekly-draft', protocol_version: '5.2', total_questions: 0, bundle_size: 0,
    alignment: 'DBA MEN Colombia (draft local-llm, requiere curaduría)', creador: 'local-llm', source: 'pdf-ingest', excerpt: excerpt.slice(0, 800),
  };
  return {
    text: fullText, numPages: extraction.numPages || pages.length, pages, excerpt,
    metadata: { creador: 'local-llm', protocol_version: '5.2', fileName: file.name, fileSize: file.size, ingestedAt: Date.now() },
    skeleton, truncated: fullText.length >= MAX_CHARS, pagesCount: pages.length,
  } as any;
}
