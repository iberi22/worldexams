import matter from 'gray-matter';

export interface CuentoPagina {
  numero: number;
  alt: string;
  escena: string;
  texto: string;
  /** v2: hint de conversación familiar (línea '> Para conversar en familia:'). */
  hint?: string;
  /** v2: vocabulario nuevo (línea '**Palabras nuevas:**'). */
  words?: string[];
  /** C7.07: URL del MP3 de narración o ausente = fallback Web Speech. */
  audio?: string | null;
  /** C7.07: offsets de inicio por palabra (segundos), 1:1 con `texto`. */
  timings?: number[];
}

export interface CuentoQuizOpcion {
  id: string; // 'A', 'B', 'C'
  texto: string;
  esCorrecta: boolean;
  feedback: string;
}

export interface CuentoQuizPregunta {
  id: number;
  pregunta: string;
  opciones: CuentoQuizOpcion[];
}

export interface CuentoQuiz {
  preguntas: CuentoQuizPregunta[];
  explicacion: string;
}

export interface CuentoSummary {
  slug: string;
  titulo: string;
  edad: string;
  idioma: string;
  eje: string;
  habitat: string;
  valor: string;
  personajes: string[];
  paginas: number;
  license: string;
  version: number;
  coverEscena?: string;
}

export interface CuentoDetail extends CuentoSummary {
  paginasList: CuentoPagina[];
  quiz: CuentoQuiz;
}

// Vite eager glob import for markdown files (works in SSR, Workers, and build)
const rawCuentoMarkdownFiles = import.meta.glob('../../../../questions_data/cuentos/**/cuento.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Vite eager glob import for optional JSON packs (pack = dato primario en runtime)
const rawCuentoJsonPacks = import.meta.glob('../../../public/v1/cuentos/*.json', {
  import: 'default',
  eager: true,
}) as Record<string, any>;

/**
  * Normalizes file content so frontmatter is parsed even if preceded by HTML comments
  */
function normalizeMarkdownContent(content: string): string {
  // Strip leading HTML comments like <!-- © 2026 ... -->
  return content.replace(/^\s*<!--[\s\S]*?-->\s*/, '');
}

/**
  * Parses a cuento.md string content into a full CuentoDetail object
  */
export function parseCuentoMarkdown(fileContent: string): CuentoDetail {
  const cleanContent = normalizeMarkdownContent(fileContent);
  const { data, content } = matter(cleanContent);

  const summary: CuentoSummary = {
    slug: String(data.slug || ''),
    titulo: String(data.titulo || ''),
    edad: String(data.edad || '3-4'),
    idioma: String(data.idioma || 'es-neutro'),
    eje: String(data.eje || ''),
    habitat: String(data.habitat || ''),
    valor: String(data.valor || ''),
    personajes: Array.isArray(data.personajes) ? data.personajes.map(String) : [],
    paginas: Number(data.paginas || 0),
    license: String(data.license || 'PROPRIETARY-FREE-READ'),
    version: Number(data.version || 1),
  };

  // Parse pages
  const paginasList: CuentoPagina[] = [];
  const quizSectionMatch = content.split(/##\s+Quiz/i);
  const pagesPart = quizSectionMatch[0] || '';
  const quizPart = quizSectionMatch[1] || '';

  const rawPageBlocks = pagesPart.split(/##\s+Pagina\s+/i).slice(1);

  for (const block of rawPageBlocks) {
    const lines = block.trim().split('\n');
    const headerLine = lines[0] || '';
    const pageNumMatch = headerLine.match(/^(\d+)/);
    const numero = pageNumMatch ? parseInt(pageNumMatch[1], 10) : paginasList.length + 1;

    let alt = '';
    let escena = '';
    let hint = '';
    let words: string[] = [];
    const textLines: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const imgMatch = line.match(/^!\[\s*alt:\s*([^\]]+)\]\(([^)]+)\)/i);
      if (imgMatch) {
        alt = imgMatch[1].trim();
        escena = imgMatch[2].trim();
        continue;
      }

      // v2: hint familiar (slot propio, NO parte del texto narrado)
      const hintMatch = line.match(/^>\s*Para conversar en familia:\s*(.+)$/);
      if (hintMatch) {
        hint = hintMatch[1].trim();
        continue;
      }

      // v2: vocabulario (slot propio, NO parte del texto narrado)
      const wordsMatch = line.match(/^\*\*Palabras nuevas:\*\*\s*(.+)$/);
      if (wordsMatch) {
        words = wordsMatch[1]
          .split(',')
          .map((w) => w.trim().toLowerCase())
          .filter(Boolean);
        continue;
      }

      textLines.push(line);
    }

    paginasList.push({
      numero,
      alt,
      escena: escena ? `/v1/cuentos/${summary.slug}/${escena}` : '',
      texto: textLines.join(' '),
      ...(hint ? { hint } : {}),
      ...(words.length > 0 ? { words } : {}),
    });
  }

  // Set cover scene from first page if available
  if (paginasList.length > 0 && paginasList[0].escena) {
    summary.coverEscena = paginasList[0].escena;
  }

  // Parse quiz
  const preguntas: CuentoQuizPregunta[] = [];
  let explicacion = '';

  if (quizPart) {
    const quizBlocks = quizPart.split(/###\s+Pregunta\s+/i);
    const questionBlocks = quizBlocks.slice(1);

    questionBlocks.forEach((qBlock, idx) => {
      const lines = qBlock.split('\n');
      let questionTitle = '';
      const opciones: CuentoQuizOpcion[] = [];

      let currentOpt: CuentoQuizOpcion | null = null;

      for (let line of lines) {
        line = line.trim();

        // Check for ### Explicacion inside the last question block
        if (line.match(/^###\s+Explicaci[oó]n/i)) {
          break;
        }

        if (!questionTitle && line && !line.startsWith('-') && !line.startsWith('<!--')) {
          // First non-empty line after block split is question text (strip leading digit if present)
          questionTitle = line.replace(/^\d+\s*/, '').trim();
          continue;
        }

        const optMatch = line.match(/^-?\s*\[([ xX])\]\s*([A-C])\)\s*(.+)/);
        if (optMatch) {
          if (currentOpt) {
            opciones.push(currentOpt);
          }
          currentOpt = {
            id: optMatch[2],
            esCorrecta: optMatch[1].toLowerCase() === 'x',
            texto: optMatch[3].trim(),
            feedback: '',
          };
          continue;
        }

        const feedbackMatch = line.match(/^<!--\s*feedback:\s*(.+?)\s*-->/i);
        if (feedbackMatch && currentOpt) {
          currentOpt.feedback = feedbackMatch[1].trim();
        }
      }

      if (currentOpt) {
        opciones.push(currentOpt);
      }

      if (questionTitle && opciones.length > 0) {
        preguntas.push({
          id: idx + 1,
          pregunta: questionTitle,
          opciones,
        });
      }
    });

    const explicacionMatch = quizPart.match(/###\s+Explicaci[oó]n\s*\n([\s\S]+)/i);
    if (explicacionMatch) {
      explicacion = explicacionMatch[1].trim();
    }
  }

  return {
    ...summary,
    paginasList,
    quiz: {
      preguntas,
      explicacion,
    },
  };
}

/**
 * Returns all cuento summaries from public packs or markdown fallback
 * Prefixes relative scene paths with the public packs base so static pages
 * resolve the SVGs the generator publishes at /v1/cuentos/<slug>/. Packs
 * themselves keep relative paths (the reader prefixes at runtime).
 */
function withPublicEscenas<
  T extends { slug: string; coverEscena?: string; paginasList?: CuentoPagina[] },
>(detail: T): T {
  const base = `/v1/cuentos/${detail.slug}/`;
  const pub = (p: string | undefined): string =>
    !p || p.startsWith('/') || p.startsWith('http') ? (p ?? '') : base + p.replace(/^\.\//, '');
  return {
    ...detail,
    coverEscena: pub(detail.coverEscena),
    // Solo mapear paginasList cuando existe (forma detalle-markdown). Los packs
    // JSON usan `paginas` y el lector los prefiere en ese orden: inyectar []
    // aquí sombrearía las páginas reales con una lista vacía (bug C7.07).
    ...(Array.isArray(detail.paginasList)
      ? { paginasList: detail.paginasList.map((p: CuentoPagina) => ({ ...p, escena: pub(p.escena) })) }
      : {}),
  };
}

export async function getAllCuentosCatalog(): Promise<CuentoSummary[]> {
  // 1. Check if public/v1/cuentos index.json pack is present
  const indexPackKey = Object.keys(rawCuentoJsonPacks).find((k) => k.endsWith('index.json'));
  if (indexPackKey && rawCuentoJsonPacks[indexPackKey]) {
    const data = rawCuentoJsonPacks[indexPackKey];
    if (Array.isArray(data)) {
      return (data as CuentoSummary[]).map((s) =>
        withPublicEscenas({ ...s, paginasList: [] }),
      ) as CuentoSummary[];
    }
  }

  // 2. Parse from eagerly imported markdown files
  const results: CuentoSummary[] = [];

  for (const [filePath, rawContent] of Object.entries(rawCuentoMarkdownFiles)) {
    if (typeof rawContent === 'string' && rawContent.trim()) {
      try {
        const detail = parseCuentoMarkdown(rawContent);
        if (detail.slug) {
          const { paginasList, quiz, ...summary } = withPublicEscenas(detail);
          results.push(summary);
        }
      } catch (e) {
        console.error(`Failed to parse cuento at ${filePath}:`, e);
      }
    }
  }

  return results;
}

/**
 * Convierte un pack JSON (`public/v1/cuentos/<slug>.json`, forma `paginas`)
 * a CuentoDetail (forma `paginasList`) para que todos los consumidores
 * ([slug].astro, CuentoReader, LectorInmersivo) vean UNA sola forma.
 * Preserva narración C7.07 (audio/timings) + v2 (hint/words) por página.
 */
function packToDetail(pack: any): CuentoDetail {
  const slug = String(pack.slug || '');
  const base = `/v1/cuentos/${slug}/`;
  const pub = (p: string | undefined): string =>
    !p || p.startsWith('/') || p.startsWith('http') ? (p ?? '') : base + p.replace(/^\.\//, '');

  const rawPages: any[] = Array.isArray(pack.paginas) ? pack.paginas : [];
  const paginasList: CuentoPagina[] = rawPages.map((p: any, idx: number) => ({
    numero: Number(p.n ?? idx + 1),
    alt: String(p.alt || ''),
    escena: pub(p.imagen || p.escena),
    texto: String(p.texto || ''),
    ...(p.hint ? { hint: String(p.hint) } : {}),
    ...(Array.isArray(p.words) && p.words.length > 0 ? { words: p.words.map(String) } : {}),
    ...(typeof p.audio === 'string' && p.audio ? { audio: p.audio } : {}),
    ...(Array.isArray(p.timings) && p.timings.length > 0 ? { timings: p.timings.map(Number) } : {}),
  }));

  const rawQuiz: any[] = Array.isArray(pack.quiz) ? pack.quiz : [];
  const preguntas: CuentoQuizPregunta[] = rawQuiz.map((q: any, idx: number) => ({
    id: Number(q.n ?? q.id ?? idx + 1),
    pregunta: String(q.texto ?? q.pregunta ?? ''),
    opciones: (Array.isArray(q.opciones) ? q.opciones : []).map((o: any) => ({
      id: String(o.letra ?? o.id ?? ''),
      texto: String(o.texto ?? ''),
      esCorrecta: Boolean(o.correcta ?? o.esCorrecta ?? false),
      feedback: String(o.feedback ?? ''),
    })),
  }));

  const summary: CuentoSummary = {
    slug,
    titulo: String(pack.titulo || ''),
    edad: String(pack.edad || '3-4'),
    idioma: String(pack.idioma || 'es-neutro'),
    eje: String(pack.eje || ''),
    habitat: String(pack.habitat || ''),
    valor: String(pack.valor || ''),
    personajes: Array.isArray(pack.personajes) ? pack.personajes.map(String) : [],
    paginas: paginasList.length,
    license: String(pack.license || 'PROPRIETARY-FREE-READ'),
    version: Number(pack.version || 1),
    ...(paginasList.length > 0 && paginasList[0].escena ? { coverEscena: paginasList[0].escena } : {}),
  };

  return {
    ...summary,
    paginasList,
    quiz: {
      preguntas,
      explicacion: String(pack.explicacion || ''),
    },
  };
}

/**
 * Returns full detail for a cuento by slug from public packs or markdown fallback
 */
export async function getCuentoBySlug(slug: string): Promise<CuentoDetail | null> {
  if (!slug) return null;

  // 1. Check if public/v1/cuentos/<slug>.json pack is present (normalizado a CuentoDetail)
  const packKey = Object.keys(rawCuentoJsonPacks).find((k) => k.endsWith(`/${slug}.json`));
  if (packKey && rawCuentoJsonPacks[packKey]) {
    return packToDetail(rawCuentoJsonPacks[packKey]);
  }

  // 2. Parse from eagerly imported markdown files
  for (const [filePath, rawContent] of Object.entries(rawCuentoMarkdownFiles)) {
    if (typeof rawContent === 'string' && rawContent.trim()) {
      try {
        const detail = parseCuentoMarkdown(rawContent);
        if (detail.slug === slug) {
          return withPublicEscenas(detail);
        }
      } catch (e) {
        console.error(`Failed to parse cuento at ${filePath}:`, e);
      }
    }
  }

  return null;
}
