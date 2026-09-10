import matter from 'gray-matter';

export interface CuentoPagina {
  numero: number;
  alt: string;
  escena: string;
  texto: string;
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

// Vite eager glob import for optional JSON packs
const rawCuentoJsonPacks = import.meta.glob('../../../../public/v1/cuentos/*.json', {
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
    const textLines: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const imgMatch = line.match(/^!\[\s*alt:\s*([^\]]+)\]\(([^)]+)\)/i);
      if (imgMatch) {
        alt = imgMatch[1].trim();
        escena = imgMatch[2].trim();
      } else {
        textLines.push(line);
      }
    }

    paginasList.push({
      numero,
      alt,
      escena: escena ? `/cuentos/${summary.slug}/${escena}` : '',
      texto: textLines.join(' '),
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
  */
export async function getAllCuentosCatalog(): Promise<CuentoSummary[]> {
  // 1. Check if public/v1/cuentos index.json pack is present
  const indexPackKey = Object.keys(rawCuentoJsonPacks).find((k) => k.endsWith('index.json'));
  if (indexPackKey && rawCuentoJsonPacks[indexPackKey]) {
    const data = rawCuentoJsonPacks[indexPackKey];
    if (Array.isArray(data)) {
      return data as CuentoSummary[];
    }
  }

  // 2. Parse from eagerly imported markdown files
  const results: CuentoSummary[] = [];

  for (const [filePath, rawContent] of Object.entries(rawCuentoMarkdownFiles)) {
    if (typeof rawContent === 'string' && rawContent.trim()) {
      try {
        const detail = parseCuentoMarkdown(rawContent);
        if (detail.slug) {
          const { paginasList, quiz, ...summary } = detail;
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
  * Returns full detail for a cuento by slug from public packs or markdown fallback
  */
export async function getCuentoBySlug(slug: string): Promise<CuentoDetail | null> {
  if (!slug) return null;

  // 1. Check if public/v1/cuentos/<slug>.json pack is present
  const packKey = Object.keys(rawCuentoJsonPacks).find((k) => k.endsWith(`/${slug}.json`));
  if (packKey && rawCuentoJsonPacks[packKey]) {
    return rawCuentoJsonPacks[packKey] as CuentoDetail;
  }

  // 2. Parse from eagerly imported markdown files
  for (const [filePath, rawContent] of Object.entries(rawCuentoMarkdownFiles)) {
    if (typeof rawContent === 'string' && rawContent.trim()) {
      try {
        const detail = parseCuentoMarkdown(rawContent);
        if (detail.slug === slug) {
          return detail;
        }
      } catch (e) {
        console.error(`Failed to parse cuento at ${filePath}:`, e);
      }
    }
  }

  return null;
}
