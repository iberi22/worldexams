import matter from 'gray-matter';

/**
 * Absolute path reference:
 * saberparatodos/src/lib/cuentos/cuento-schema.ts
 */

export interface CuentoFrontmatter {
  readonly slug: string;
  readonly titulo: string;
  readonly edad: string;
  readonly idioma: string;
  readonly eje: string;
  readonly habitat: string;
  readonly valor: string;
  readonly personajes: readonly string[];
  readonly paginas: number;
  readonly license: string;
  readonly version: number;
  readonly copyrightHeader?: string;
}

export interface CuentoPagina {
  readonly n: number;
  readonly alt: string;
  readonly imagen: string;
  readonly texto: string;
  readonly wordCount: number;
  readonly hint?: string;
  readonly words?: readonly string[];
  /** C7.07: URL del MP3 de narración (`/audio/cuentos/<slug>/p<n>.mp3`) o ausente = fallback Web Speech. */
  readonly audio?: string | null;
  /** C7.07: offsets de inicio por palabra (segundos), 1:1 con las palabras de `texto`. */
  readonly timings?: readonly number[];
}

export interface QuizOpcion {
  readonly letra: string;
  readonly texto: string;
  readonly correcta: boolean;
  readonly feedback: string;
}

export interface QuizPregunta {
  readonly n: number;
  readonly texto: string;
  readonly opciones: readonly [QuizOpcion, QuizOpcion, QuizOpcion] | readonly QuizOpcion[];
}

export interface CuentoHotspot {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly etiqueta: string;
  readonly accion: string;
}

export interface Cuento {
  readonly frontmatter: CuentoFrontmatter;
  readonly paginas: readonly CuentoPagina[];
  readonly quiz: readonly QuizPregunta[];
  readonly explicacion: string;
  readonly hotspots: readonly CuentoHotspot[];
}

export class CuentoParseError extends Error {
  readonly file?: string;
  readonly line?: number;

  constructor(message: string, file?: string, line?: number) {
    super(message);
    this.name = 'CuentoParseError';
    this.file = file;
    this.line = line;
  }
}

export function parseCuentoMd(md: string, filePath?: string): Cuento {
  if (typeof md !== 'string') {
    throw new CuentoParseError('El contenido del cuento debe ser una cadena de texto.', filePath);
  }

  let rawMd = md;
  let copyrightHeader: string | undefined = undefined;

  // Extract HTML copyright header comment on line 1 if present
  const commentMatch = rawMd.match(/^\s*(<!--[\s\S]*?-->)\s*/);
  if (commentMatch) {
    copyrightHeader = commentMatch[1].trim();
    rawMd = rawMd.slice(commentMatch[0].length);
  }

  let parsed: ReturnType<typeof matter>;
  try {
    parsed = matter(rawMd);
  } catch (err: any) {
    throw new CuentoParseError(`Error parsing YAML frontmatter: ${err?.message || err}`, filePath);
  }

  const data = (parsed.data || {}) as Record<string, any>;
  const requiredFields = [
    'slug',
    'titulo',
    'edad',
    'idioma',
    'eje',
    'habitat',
    'valor',
    'personajes',
    'paginas',
    'license',
    'version'
  ];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      throw new CuentoParseError(`Falta el campo obligatorio en frontmatter: "${field}"`, filePath);
    }
  }

  const frontmatter: CuentoFrontmatter = {
    slug: String(data.slug),
    titulo: String(data.titulo),
    edad: String(data.edad),
    idioma: String(data.idioma),
    eje: String(data.eje),
    habitat: String(data.habitat),
    valor: String(data.valor),
    personajes: Array.isArray(data.personajes) ? data.personajes.map(String) : [],
    paginas: Number(data.paginas),
    license: String(data.license),
    version: Number(data.version),
    ...(copyrightHeader ? { copyrightHeader } : {})
  };

  const body = parsed.content || '';
  const paginas: CuentoPagina[] = [];
  const quiz: QuizPregunta[] = [];
  let explicacion = '';

  // Split body by level 2 headings: ## Pagina N, ## Quiz, etc.
  const h2Sections = body.split(/^##\s+/m).filter((s: string) => s.trim().length > 0);

  for (const section of h2Sections) {
    const lines = section.split('\n');
    const titleLine = lines[0].trim();
    const sectionContent = lines.slice(1).join('\n').trim();

    const paginaMatch = titleLine.match(/^P[aá]gina\s+(\d+)/i);
    if (paginaMatch) {
      const n = parseInt(paginaMatch[1], 10);
      const imgMatch = sectionContent.match(/!\[alt:\s*(.*?)\]\((.*?)\)/s);
      if (!imgMatch) {
        throw new CuentoParseError(`Página ${n} no contiene una imagen válida en formato ![alt: ...](...)`, filePath);
      }

      const alt = imgMatch[1].trim();
      const imagen = imgMatch[2].trim();
      const bodyWithoutImg = sectionContent.replace(/!\[alt:.*?\]\(.*?\)/s, '').trim();

      let hint = '';
      let words: string[] = [];

      // Parse v2 caregiver hint line: > Para conversar en familia: ...
      const hintMatch = bodyWithoutImg.match(/^>\s*Para conversar en familia:\s*(.+)$/m);
      if (hintMatch) {
        hint = hintMatch[1].trim();
      }

      // Parse v2 vocabulary line: **Palabras nuevas:** word1, word2, ...
      const wordsMatch = bodyWithoutImg.match(/^\*\*Palabras nuevas:\*\*\s*(.+)$/m);
      if (wordsMatch) {
        words = wordsMatch[1]
          .split(',')
          .map((w) => w.trim().toLowerCase())
          .filter(Boolean);
      }

      // Clean prose text by stripping v2 hint and words lines
      const textLines = bodyWithoutImg
        .split(/\r?\n/)
        .filter(
          (line) =>
            !line.trim().startsWith('> Para conversar en familia:') &&
            !line.trim().startsWith('**Palabras nuevas:**')
        );
      const texto = textLines.join('\n').trim();
      const wordCount = texto ? texto.split(/\s+/).filter(Boolean).length : 0;

      paginas.push({
        n,
        alt,
        imagen,
        texto,
        wordCount,
        ...(hint ? { hint } : { hint: '' }),
        words: words.length > 0 ? words : []
      });
    } else if (titleLine.toLowerCase() === 'quiz') {
      const h3Sections = sectionContent.split(/^###\s+/m).filter((s: string) => s.trim().length > 0);
      for (const h3Section of h3Sections) {
        const h3Lines = h3Section.split('\n');
        const h3Title = h3Lines[0].trim();
        const h3Content = h3Lines.slice(1).join('\n').trim();

        const pregMatch = h3Title.match(/^Pregunta\s+(\d+)/i);
        if (pregMatch) {
          const n = parseInt(pregMatch[1], 10);
          const pregLines = h3Content.split('\n');
          let pregTexto = '';
          const opciones: QuizOpcion[] = [];

          let currentOptLetra = '';
          let currentOptCorrecta = false;
          let currentOptTexto = '';
          let currentOptFeedback = '';

          const pushCurrentOpt = () => {
            if (currentOptLetra) {
              opciones.push({
                letra: currentOptLetra,
                texto: currentOptTexto.trim(),
                correcta: currentOptCorrecta,
                feedback: currentOptFeedback.trim()
              });
              currentOptLetra = '';
              currentOptCorrecta = false;
              currentOptTexto = '';
              currentOptFeedback = '';
            }
          };

          for (const line of pregLines) {
            const optMatch = line.match(/^\s*-\s*\[([ xX])\]\s*([A-Z])\)\s*(.*)/);
            const feedbackMatch = line.match(/<!--\s*feedback:\s*(.*?)\s*-->/);

            if (optMatch) {
              pushCurrentOpt();
              currentOptCorrecta = optMatch[1].toLowerCase() === 'x';
              currentOptLetra = optMatch[2];
              currentOptTexto = optMatch[3].replace(/<!--[\s\S]*?-->/, '').trim();
              if (feedbackMatch) {
                currentOptFeedback = feedbackMatch[1].trim();
              }
            } else if (feedbackMatch && currentOptLetra) {
              currentOptFeedback = feedbackMatch[1].trim();
            } else if (!currentOptLetra) {
              pregTexto += (pregTexto ? '\n' : '') + line;
            }
          }
          pushCurrentOpt();

          quiz.push({
            n,
            texto: pregTexto.trim(),
            opciones: opciones as unknown as readonly [QuizOpcion, QuizOpcion, QuizOpcion]
          });
        } else if (h3Title.toLowerCase().includes('explicacion') || h3Title.toLowerCase().includes('explicación')) {
          explicacion = h3Content.trim();
        }
      }
    } else if (titleLine.toLowerCase().includes('explicacion') || titleLine.toLowerCase().includes('explicación')) {
      explicacion = sectionContent.trim();
    }
  }

  // Sort pages by page number n
  paginas.sort((a, b) => a.n - b.n);

  return {
    frontmatter,
    paginas,
    quiz,
    explicacion,
    hotspots: [] // Default empty hotspots array for v1 interactive extensions
  };
}
