import { describe, it, expect } from 'vitest';
import { computeSemaforo, narrar, estadoDe, nivelDeElo } from './semaforo';

const FRACCIONES = [
  { tema: 'multiplicacion', correct: true },
  { tema: 'multiplicacion', correct: true },
  { tema: 'multiplicacion', correct: true },
  { tema: 'multiplicacion', correct: true },
  { tema: 'multiplicacion', correct: true },
  { tema: 'suma-denominador', correct: true },
  { tema: 'suma-denominador', correct: true },
  { tema: 'suma-denominador', correct: false },
  { tema: 'simplificacion', correct: false },
  { tema: 'simplificacion', correct: false },
  { tema: 'simplificacion', correct: true },
];

describe('semaforo (F2)', () => {
  it('umbrales 🟢≥80 🟡50-79 🔴<50', () => {
    expect(estadoDe(0.8)).toBe('dominado');
    expect(estadoDe(0.79)).toBe('desarrollo');
    expect(estadoDe(0.5)).toBe('desarrollo');
    expect(estadoDe(0.49)).toBe('mejorar');
  });

  it('agrupa por tema con peor primero', () => {
    const nodos = computeSemaforo(FRACCIONES);
    expect(nodos.map((n) => n.tema)).toEqual(['simplificacion', 'suma-denominador', 'multiplicacion']);
    expect(nodos[0].estado).toBe('mejorar');
    expect(nodos[1].estado).toBe('desarrollo');
    expect(nodos[2].estado).toBe('dominado');
    expect(nodos[2].accuracy).toBe(1);
  });

  it('narrativa señala el peor nodo con conteo de fallos', () => {
    const nodos = computeSemaforo(FRACCIONES);
    const texto = narrar(nodos);
    expect(texto).toContain('simplificacion');
    expect(texto).toContain('2 de 3');
    expect(texto).toContain('multiplicacion'); // fortaleza citada
  });

  it('todo verde celebra sin foco de mejora', () => {
    const nodos = computeSemaforo([
      { tema: 'a', correct: true },
      { tema: 'b', correct: true },
    ]);
    expect(narrar(nodos)).toContain('verde');
  });

  it('vacío invita al primer cuestionario', () => {
    expect(narrar([])).toContain('primer cuestionario');
  });

  it('nivelDeElo por bandas de la escala 100–2200', () => {
    expect(nivelDeElo(500)).toBe('Inicial');
    expect(nivelDeElo(800)).toBe('Competente');
    expect(nivelDeElo(1500)).toBe('Avanzado');
    expect(nivelDeElo(1900)).toBe('Experto');
    expect(nivelDeElo(2200)).toBe('Maestro');
  });
});
