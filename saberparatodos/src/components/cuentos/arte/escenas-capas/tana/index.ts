/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

import p1 from './p1.svg?raw';
import p2 from './p2.svg?raw';
import p3 from './p3.svg?raw';
import p4 from './p4.svg?raw';
import p5 from './p5.svg?raw';
import p6 from './p6.svg?raw';
import p7 from './p7.svg?raw';
import p8 from './p8.svg?raw';

export interface LayeredScenePlanes {
  fondo: string;
  medio: string;
  frente: string;
}

const tanaRawScenes: Record<number, string> = {
  1: p1,
  2: p2,
  3: p3,
  4: p4,
  5: p5,
  6: p6,
  7: p7,
  8: p8,
};

/**
 * Extracts inner markup for a given group ID from raw SVG string.
 */
function extractGroupContent(svgString: string, groupId: string): string {
  if (!svgString) return '';
  const regex = new RegExp(`<g[^>]*id=["']${groupId}["'][^>]*>([\\s\\S]*?)</g>`, 'i');
  const match = svgString.match(regex);
  return match ? match[1].trim() : '';
}

/**
 * Returns extracted 3 plane contents for a given Tana page number (1-8).
 */
export function getTanaLayeredPlanes(pageN: number): LayeredScenePlanes | null {
  const rawSvg = tanaRawScenes[pageN];
  if (!rawSvg) return null;

  const fondo = extractGroupContent(rawSvg, 'plano-fondo');
  const medio = extractGroupContent(rawSvg, 'plano-medio');
  const frente = extractGroupContent(rawSvg, 'plano-frente');

  if (!fondo && !medio && !frente) return null;

  return { fondo, medio, frente };
}

/**
 * Checks if layered scene assets exist for a given cuento slug and page number.
 */
export function hasLayeredScene(slug: string, pageN: number): boolean {
  if (slug === 'tana-tucan-comparte' || slug === 'tana') {
    return pageN >= 1 && pageN <= 8;
  }
  return false;
}
