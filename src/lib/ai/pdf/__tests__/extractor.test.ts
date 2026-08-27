import { describe, it, expect, vi } from 'vitest';
import { extractTextFromArrayBuffer, extractTextFromUint8Array } from '../extractor';
import { chunkPages } from '../chunker';

// Mock pdfjs-dist para tests unitarios puros sin necesidad de worker / binario real
// El fixture PDF se genera con pdf-lib bytes, pero aquí simulamos getDocument para no depender de pdfjs instalado
vi.mock('pdfjs-dist', async () => {
  const mock = {
    getDocument: vi.fn((opts: any) => {
      // Detectar si el buffer es vacío o inválido
      const data: Uint8Array = opts.data;
      if (!data || data.length < 20) {
        return {
          promise: Promise.reject(new Error('Invalid PDF')),
        };
      }
      // Simular PDF de 2 páginas con texto fijo
      const pages = [
        { text: 'Hola desde Bogotá. Esta es la página uno del PDF de prueba.' },
        { text: 'Página dos: matemáticas y ciencias. E=mc2. Fin del documento.' },
      ];
      // Si el PDF contiene marcador especial "EMPTY", simular 0 páginas útiles
      const asString = new TextDecoder().decode(data.slice(0, 200));
      if (asString.includes('EMPTY_MARKER')) {
        return {
          promise: Promise.resolve({
            numPages: 1,
            getMetadata: () => Promise.resolve({ info: { Title: 'Empty PDF' } }),
            getPage: (_n: number) =>
              Promise.resolve({
                getTextContent: () => Promise.resolve({ items: [{ str: '', hasEOL: false }] }),
              }),
            destroy: () => Promise.resolve(),
          }),
        };
      }
      return {
        promise: Promise.resolve({
          numPages: pages.length,
          getMetadata: () =>
            Promise.resolve({
              info: {
                Title: 'Fixture PDF',
                Author: 'WorldExams Test',
                CreationDate: 'D:20260101000000Z',
                Producer: 'pdf-lib mock',
              },
            }),
          getPage: (n: number) =>
            Promise.resolve({
              getTextContent: () =>
                Promise.resolve({
                  items: pages[n - 1].text.split(' ').map((w, i) => ({
                    str: w + (i < pages[n - 1].text.split(' ').length - 1 ? ' ' : ''),
                    hasEOL: false,
                  })),
                }),
            }),
          destroy: () => Promise.resolve(),
        }),
      };
    }),
      GlobalWorkerOptions: { workerSrc: '' },
  };
  return {
    ...mock,
    default: mock,
  };
});

// Helper: genera un PDF mínimo en memoria sin pdf-lib (bytes PDF válidos sintéticos)
// Reutiliza la técnica de PDF minimal con catálogo, pero para el mock basta con bytes dummy
function createMinimalPdfBytes(opts: { empty?: boolean } = {}): Uint8Array {
  // PDF header mínimo + marcador para el mock
  const marker = opts.empty ? 'EMPTY_MARKER' : 'WorldExams Fixture';
  const pdfString = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >> endobj
% ${marker}
xref
0 4
0000000000 65535 f
trailer << /Size 4 /Root 1 0 R >>
startxref
0
%%EOF`;
  return new TextEncoder().encode(pdfString);
}

// Si pdf-lib está disponible, también probamos generar con él (opcional)
// Usa import dinámico con string concatenado para evitar que vite intente resolver pdf-lib en tiempo de build
async function tryGenerateWithPdfLib(): Promise<Uint8Array | null> {
  try {
    const modName = 'pdf' + '-lib';
    const pdfLib: any = await import(/* @vite-ignore */ modName as string);
    const { PDFDocument, StandardFonts, rgb } = pdfLib;
    const doc = await PDFDocument.create();
    const page1 = doc.addPage([612, 792]);
    const font = await doc.embedFont(StandardFonts.Helvetica);
    page1.drawText('Hola desde Bogotá. Esta es la página uno.', {
      x: 50,
      y: 700,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });
    const page2 = doc.addPage([612, 792]);
    page2.drawText('Página dos: matemáticas y ciencias.', {
      x: 50,
      y: 700,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });
    const bytes = await doc.save();
    return bytes as Uint8Array;
  } catch {
    return null;
  }
}

describe('extractor — pdf.js 100% local', () => {
  it('extrae texto de ArrayBuffer con 2 páginas', async () => {
    const bytes = createMinimalPdfBytes();
    const result = await extractTextFromArrayBuffer(bytes.buffer as ArrayBuffer);
    expect(result.numPages).toBe(2);
    expect(result.pages).toHaveLength(2);
    expect(result.pages[0].pageNumber).toBe(1);
    expect(result.pages[1].pageNumber).toBe(2);
    expect(result.text).toContain('Bogotá');
    expect(result.text).toContain('matemáticas');
    expect(result.metadata.title).toBe('Fixture PDF');
    expect(result.metadata.numPages).toBe(2);
  });

  it('extractTextFromUint8Array es alias funcional', async () => {
    const bytes = createMinimalPdfBytes();
    const result = await extractTextFromUint8Array(bytes);
    expect(result.numPages).toBe(2);
    expect(result.pages[0].text).toContain('Bogotá');
  });

  it('maneja PDF de página vacía (texto vacío pero numPages correcto)', async () => {
    const bytes = createMinimalPdfBytes({ empty: true });
    const result = await extractTextFromArrayBuffer(bytes.buffer as ArrayBuffer);
    expect(result.numPages).toBe(1);
    // Texto puede ser vacío en mock empty
    expect(result.pages[0].text).toBe('');
  });

  it('lanza error con buffer inválido / PDF corrupto', async () => {
    const bad = new Uint8Array([0, 1, 2, 3]);
    await expect(extractTextFromArrayBuffer(bad.buffer as ArrayBuffer)).rejects.toThrow();
  });

  it('integración extractor + chunker preserva texto completo', async () => {
    const bytes = createMinimalPdfBytes();
    const extraction = await extractTextFromArrayBuffer(bytes.buffer as ArrayBuffer);
    const chunks = chunkPages(extraction.pages, { chunkSize: 50, overlap: 5, docId: 'fixture' });
    expect(chunks.length).toBeGreaterThan(0);
    const reconstructed = chunks.map((c) => c.text).join(' ');
    expect(reconstructed).toContain('Bogotá');
    expect(reconstructed).toContain('matemáticas');
  });

  it('usa pdf-lib para generar fixture real si está disponible (opcional)', async () => {
    const bytes = await tryGenerateWithPdfLib();
    if (!bytes) {
      // pdf-lib no instalado — test se omite sin fallar
      expect(true).toBe(true);
      return;
    }
    const result = await extractTextFromUint8Array(bytes);
    // Con mock, seguirá retornando fixture simulado, pero el flujo no debe fallar
    expect(result.numPages).toBeGreaterThan(0);
  });
});
