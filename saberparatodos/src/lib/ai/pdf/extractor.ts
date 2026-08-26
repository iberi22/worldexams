/**
 * WX-201 — PDF Extractor 100% local via pdf.js (pdfjs-dist)
 * Nunca envía bytes fuera del dispositivo. Extrae texto por página.
 * Usa import dinámico para no romper bundling SSR / tests sin pdfjs instalado.
 */

export interface ExtractedPage {
  pageNumber: number;
  text: string;
}

export interface PDFMetadata {
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  producer?: string;
  creationDate?: string;
  modDate?: string;
  numPages: number;
  info?: Record<string, unknown>;
}

export interface ExtractionResult {
  text: string;
  pages: ExtractedPage[];
  numPages: number;
  metadata: PDFMetadata;
}

/**
 * Extrae texto de un ArrayBuffer PDF usando pdfjs-dist.
 * En entorno browser desactiva worker si no hay workerSrc configurado,
 * en tests (jsdom) usa disableWorker.
 */
export async function extractTextFromArrayBuffer(buffer: ArrayBuffer): Promise<ExtractionResult> {
  let pdfjsLib: any;
  try {
    // Intento 1: pdfjs-dist legacy (compat Node/browser) — dynamic para no romper vite si no instalado
    const pdfName = 'pdfjs-dist';
    pdfjsLib = await import(/* @vite-ignore */ pdfName as string);
  } catch {
    try {
      const pdfLegacy = 'pdfjs-dist/legacy/build/pdf.mjs';
      pdfjsLib = await import(/* @vite-ignore */ pdfLegacy as string);
    } catch (e) {
      throw new Error(
        'pdfjs-dist no está instalado. Instala con: pnpm add pdfjs-dist — ' + String(e)
      );
    }
  }

  // Normalizar export (algunas versiones usan default) — evitar acceso a .default si el mock no lo define (vitest)
  let lib: any = pdfjsLib;
  try {
    if (pdfjsLib && typeof pdfjsLib === 'object' && 'default' in pdfjsLib) {
      const maybeDefault = (pdfjsLib as any).default;
      if (maybeDefault && (maybeDefault.getDocument || maybeDefault.GlobalWorkerOptions)) {
        lib = maybeDefault;
      }
    }
  } catch {
    lib = pdfjsLib;
  }
  // Fallback si lib no tiene getDocument pero default sí
  if (!lib.getDocument && (pdfjsLib as any)?.default?.getDocument) {
    lib = (pdfjsLib as any).default;
  }
  // Asegurar worker deshabilitado en entornos sin workerSrc (tests jsdom)
  if (lib.GlobalWorkerOptions && !lib.GlobalWorkerOptions.workerSrc) {
    // Dejar vacío; usamos disableWorker en getDocument
  }

  const uint8 = new Uint8Array(buffer);
  const loadingTask = lib.getDocument({
    data: uint8,
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: true,
    disableWorker: true,
    verbosity: 0,
  } as any);

  const pdf = await loadingTask.promise;
  const numPages: number = pdf.numPages;
  const pages: ExtractedPage[] = [];
  let fullText = '';

  let metaInfo: Record<string, unknown> = {};
  try {
    const meta = await pdf.getMetadata().catch(() => null);
    if (meta?.info) metaInfo = meta.info as Record<string, unknown>;
  } catch {
    // ignore
  }

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    // content.items: Array<{ str: string }>
    const text = (content.items as Array<{ str?: string; hasEOL?: boolean }>)
      .map((item) => {
        const s = item.str ?? '';
        // pdf.js marca hasEOL para saltos de línea
        return item.hasEOL ? s + '\n' : s + ' ';
      })
      .join('')
      .replace(/\s+/g, ' ')
      .trim();
    pages.push({ pageNumber: i, text });
    fullText += (i > 1 ? '\n\n' : '') + text;
  }

  // Limpieza: destruir doc para liberar memoria
  try {
    await pdf.destroy();
  } catch {}

  const metadata: PDFMetadata = {
    title: (metaInfo.Title as string) || undefined,
    author: (metaInfo.Author as string) || undefined,
    subject: (metaInfo.Subject as string) || undefined,
    creator: (metaInfo.Creator as string) || undefined,
    producer: (metaInfo.Producer as string) || undefined,
    creationDate: (metaInfo.CreationDate as string) || undefined,
    modDate: (metaInfo.ModDate as string) || undefined,
    numPages,
    info: metaInfo,
  };

  return { text: fullText, pages, numPages, metadata };
}

export async function extractTextFromFile(file: File): Promise<ExtractionResult> {
  const buffer = await file.arrayBuffer();
  return extractTextFromArrayBuffer(buffer);
}

/**
 * Helper para extraer desde Uint8Array (útil en tests con pdf-lib bytes)
 */
export async function extractTextFromUint8Array(data: Uint8Array): Promise<ExtractionResult> {
  // Copiar a ArrayBuffer independiente para evitar SharedArrayBuffer issues
  const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
  return extractTextFromArrayBuffer(ab);
}
