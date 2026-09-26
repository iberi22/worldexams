/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

/**
 * Motor genérico de escenas por capas (parallax 2.5D) para cualquier cuento.
 *
 * CONVENCIÓN DE ARTE (una carpeta por cuento, un SVG por página):
 *
 *   src/components/cuentos/arte/escenas-capas/{slug}/p{N}.svg
 *
 * Cada SVG (viewBox 0 0 800 450) declara tres planos:
 *   <g id="plano-fondo">  <g id="plano-medio">  <g id="plano-frente">
 * y opcionalmente <defs> (gradientes, etc.), que se conservan.
 *
 * INTERACTIVIDAD DECLARATIVA (atributos data-* dentro del propio SVG; las
 * coordenadas son las del dibujo, así que viven junto al dibujo):
 *
 *   data-hotspot="id"        Elemento tocable (el personaje/objeto real, no un marcador).
 *   data-etiqueta="…"        OBLIGATORIO con data-hotspot: nombre accesible (lector de pantalla).
 *   data-accion="salto|giro|meneo|zoom"  Reacción al toque (defecto: salto).
 *                            `zoom` = "mirar de cerca": acerca la cámara a ese elemento.
 *   data-sonido="tucan|mono|perezosa|agua|fruta|brillo"  Timbre sintetizado (WebAudio).
 *   data-dice="…"            Globo de texto corto que aparece al tocar.
 *   data-idle="respira|balanceo|flota|mece"  Micro-animación continua en reposo.
 *   data-contar="grupo"      Contenedor de un mini-juego de conteo…
 *   data-contable            …cada hijo contable (tocar = cuenta 1, 2, 3…).
 *
 * Regla: un elemento con data-hotspot / data-idle NO debe llevar atributo
 * `transform` (la animación CSS lo sobreescribiría). Envolver el grupo
 * posicionado en un <g> sin transform.
 */

export interface EscenaCapas {
  fondo: string;
  medio: string;
  frente: string;
  /** Contenido de <defs> del SVG fuente (gradientes, clipPaths…). */
  defs?: string;
}

export interface HotspotDeclarado {
  id: string;
  etiqueta: string;
  accion: string;
  sonido?: string;
  dice?: string;
}

const PLANOS = ['fondo', 'medio', 'frente'] as const;

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extrae el contenido interior de `<g id="{groupId}">…</g>` respetando
 * grupos anidados (el regex no-greedy anterior cortaba en el primer `</g>`
 * interno y perdía, p. ej., las nubes y la rama de la página 1).
 */
export function extraerGrupo(svg: string, groupId: string): string {
  if (!svg) return '';
  const open = new RegExp(`<g\\b[^>]*\\bid=["']${escapeRegex(groupId)}["'][^>]*>`, 'i').exec(svg);
  if (!open) return '';
  if (open[0].endsWith('/>')) return '';

  const start = open.index + open[0].length;
  const tokens = /<g\b[^>]*>|<\/g\s*>/gi;
  tokens.lastIndex = start;
  let depth = 1;
  let m: RegExpExecArray | null;
  while ((m = tokens.exec(svg))) {
    if (m[0].startsWith('</')) {
      depth -= 1;
      if (depth === 0) return svg.slice(start, m.index).trim();
    } else if (!m[0].endsWith('/>')) {
      depth += 1;
    }
  }
  return ''; // SVG mal balanceado: mejor plano vacío que markup roto.
}

export function extraerDefs(svg: string): string {
  const m = /<defs\b[^>]*>([\s\S]*?)<\/defs>/i.exec(svg || '');
  return m ? m[1].trim() : '';
}

/** Quita comentarios y espacios redundantes (menos bytes serializados en la isla). */
export function compactar(markup: string): string {
  return markup
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function attr(tag: string, name: string): string | undefined {
  const m = new RegExp(`\\s${escapeRegex(name)}=(["'])([\\s\\S]*?)\\1`, 'i').exec(tag);
  return m ? m[2] : undefined;
}

function escapeAttr(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/**
 * Inyecta role/tabindex/aria-label en los elementos tocables declarados
 * (data-hotspot y data-contable) para que sean operables con teclado y
 * lector de pantalla sin que el ilustrador tenga que recordarlo.
 */
export function anotarAccesibilidad(markup: string): string {
  return markup.replace(/<([a-z]+)\b([^>]*?\s(?:data-hotspot|data-contable)\b[^>]*?)(\/?)>/gi, (full, tag, attrs, selfClose) => {
    let extra = '';
    if (!/\srole=/.test(attrs)) extra += ' role="button"';
    if (!/\stabindex=/.test(attrs)) extra += ' tabindex="0"';
    const etiqueta = attr(full, 'data-etiqueta');
    if (!/\saria-label=/.test(attrs) && etiqueta) extra += ` aria-label="${escapeAttr(etiqueta)}"`;
    return `<${tag}${attrs}${extra}${selfClose}>`;
  });
}

/** Inventario de hotspots declarados en un markup (para tests/validación). */
export function listarHotspots(markup: string): HotspotDeclarado[] {
  const out: HotspotDeclarado[] = [];
  const re = /<[a-z]+\b[^>]*\sdata-hotspot=(["'])([^"']+)\1[^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(markup))) {
    const tag = m[0];
    out.push({
      id: m[2],
      etiqueta: attr(tag, 'data-etiqueta') || '',
      accion: attr(tag, 'data-accion') || 'salto',
      ...(attr(tag, 'data-sonido') ? { sonido: attr(tag, 'data-sonido') } : {}),
      ...(attr(tag, 'data-dice') ? { dice: attr(tag, 'data-dice') } : {}),
    });
  }
  return out;
}

/** Convierte un SVG fuente de 3 planos en capas listas para EscenaParallax. */
export function parseEscenaCapas(svg: string): EscenaCapas | null {
  const planos = Object.fromEntries(
    PLANOS.map((p) => [p, anotarAccesibilidad(compactar(extraerGrupo(svg, `plano-${p}`)))])
  ) as Record<(typeof PLANOS)[number], string>;

  if (!planos.fondo && !planos.medio && !planos.frente) return null;

  const defs = compactar(extraerDefs(svg));
  return { ...planos, ...(defs ? { defs } : {}) };
}

/**
 * Indexa un mapa de módulos raw (salida de import.meta.glob) con claves
 * `…/{slug}/p{N}.svg` en `{ slug: { N: EscenaCapas } }`.
 */
export function indexarEscenas(modulos: Record<string, string>): Record<string, Record<number, EscenaCapas>> {
  const out: Record<string, Record<number, EscenaCapas>> = {};
  for (const [ruta, raw] of Object.entries(modulos)) {
    const m = /\/([a-z0-9-]+)\/p(\d+)\.svg$/i.exec(ruta);
    if (!m || typeof raw !== 'string') continue;
    const capas = parseEscenaCapas(raw);
    if (!capas) continue;
    (out[m[1]] ||= {})[Number(m[2])] = capas;
  }
  return out;
}
