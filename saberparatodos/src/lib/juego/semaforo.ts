/**
 * juego/semaforo.ts — Semáforo de habilidades post-cuestionario (F2).
 *
 * Agrupa respuestas por micro-competencia (tema) y clasifica:
 *   🟢 dominado   accuracy ≥ 80%
 *   🟡 desarrollo  50% ≤ accuracy < 80%
 *   🔴 mejorar     accuracy < 50%
 * Más narrativa adaptativa corta según el peor nodo (plantillas, sin IA
 * externa en MVP). Todo local, sin PII (BR-03/BR-04).
 */

import type { SemaforoEstado, SemaforoNodo } from './types';

export interface TemaAnswer {
  tema: string;
  correct: boolean;
}

export function estadoDe(accuracy: number): SemaforoEstado {
  if (accuracy >= 0.8) return 'dominado';
  if (accuracy >= 0.5) return 'desarrollo';
  return 'mejorar';
}

/** Agrupa por tema tal cual viene (el llamante normaliza si quiere). */
export function computeSemaforo(answers: TemaAnswer[]): SemaforoNodo[] {
  const byTema = new Map<string, { correctas: number; totales: number }>();
  for (const a of answers) {
    const tema = (a.tema || 'general').trim() || 'general';
    const slot = byTema.get(tema) ?? { correctas: 0, totales: 0 };
    slot.totales += 1;
    if (a.correct) slot.correctas += 1;
    byTema.set(tema, slot);
  }
  const nodos: SemaforoNodo[] = [];
  for (const [tema, s] of byTema) {
    const accuracy = s.totales > 0 ? s.correctas / s.totales : 0;
    nodos.push({ tema, estado: estadoDe(accuracy), accuracy, correctas: s.correctas, totales: s.totales });
  }
  // Peor primero (foco de mejora arriba), luego alfabético para estabilidad.
  return nodos.sort((a, b) => a.accuracy - b.accuracy || a.tema.localeCompare(b.tema));
}

/**
 * Nivel formativo a partir del Elo de juego (escala 100–2200).
 * Etiquetas de mapa de progreso, no notas oficiales.
 */
export function nivelDeElo(elo: number): string {
  if (elo < 800) return 'Inicial';
  if (elo < 1200) return 'Competente';
  if (elo < 1600) return 'Avanzado';
  if (elo < 2000) return 'Experto';
  return 'Maestro';
}

/**
 * Mensaje adaptativo corto. Si todo está dominado, celebra; si no,
 * señala el peor nodo con su tasa de fallo. Sin juzgar: mapa, no castigo.
 */
export function narrar(nodos: SemaforoNodo[]): string {
  if (nodos.length === 0) return 'Responde tu primer cuestionario y aquí verás tu mapa de dominio.';
  const peores = nodos.filter((n) => n.estado === 'mejorar');
  const enDesarrollo = nodos.filter((n) => n.estado === 'desarrollo');
  const dominados = nodos.filter((n) => n.estado === 'dominado');
  if (peores.length === 0 && enDesarrollo.length === 0) {
    return `¡Mapa en verde! Dominas ${dominados.length === 1 ? 'la micro-competencia evaluada' : `las ${dominados.length} micro-competencias evaluadas`}. Sube la dificultad o juega otra ronda.`;
  }
  const foco = peores[0] ?? enDesarrollo[0];
  const fallos = foco.totales - foco.correctas;
  const base =
    dominados.length > 0
      ? `Buen dominio en ${dominados[0].tema}. `
      : 'Buen esfuerzo al intentarlo. ';
  return `${base}Tu principal tropiezo está en ${foco.tema} (${fallos} de ${foco.totales} falladas). Repasa ese tema y pide el reintento.`;
}
