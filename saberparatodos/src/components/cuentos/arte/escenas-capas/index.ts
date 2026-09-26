/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

/**
 * Registro genérico de escenas por capas — descubre el arte por convención:
 *
 *   escenas-capas/{slug}/p{N}.svg   →   getEscenasCapas(slug)[N]
 *
 * Para dar parallax + interactividad a un cuento nuevo basta con crear la
 * carpeta con su slug y dibujar los SVG de 3 planos (ver la documentación
 * de atributos data-* en src/lib/cuentos/escenas-capas.ts). Sin tocar código.
 *
 * IMPORTANTE (tamaño del bundle): este módulo se importa SOLO desde el
 * frontmatter de la página Astro (build/SSR). El lector recibe únicamente las
 * capas del cuento abierto como prop serializada — ningún cliente descarga el
 * arte de los demás cuentos y no hay requests de red adicionales.
 */

import { indexarEscenas, type EscenaCapas } from '../../../../lib/cuentos/escenas-capas';

export type { EscenaCapas } from '../../../../lib/cuentos/escenas-capas';

const modulos = import.meta.glob('./*/p*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const REGISTRO = indexarEscenas(modulos);

/** Capas por número de página para un cuento (objeto vacío si no tiene arte por capas). */
export function getEscenasCapas(slug: string): Record<number, EscenaCapas> {
  return REGISTRO[slug] ?? {};
}

export function hasEscenasCapas(slug: string, pagina?: number): boolean {
  const capas = REGISTRO[slug];
  if (!capas) return false;
  return pagina === undefined ? Object.keys(capas).length > 0 : Boolean(capas[pagina]);
}

/** Slugs con arte por capas (útil para auditorías de cobertura). */
export function slugsConEscenasCapas(): string[] {
  return Object.keys(REGISTRO).sort();
}
