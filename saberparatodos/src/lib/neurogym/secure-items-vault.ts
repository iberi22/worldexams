/**
 * secure-items-vault.ts
 * Contenedor Criptográfico y Generador Procedimental de Reactivos Cognitivos.
 *
 * Mantiene la privacidad y la validez ecológica de las preguntas de WorldExams
 * generando matrices lógicas, combinaciones de colores/palabras Stroop y
 * secuencias viso-espaciales on-demand en el cliente.
 */

export interface RavenMatrixItem {
  id: string;
  gridSize: 3; // 3x3
  ruleType: 'progression' | 'rotation' | 'addition' | 'distribution_of_3';
  cells: string[][]; // SVG mini-paths o descripciones simbólicas de cada celda (8 conocidas, 1 incógnita en [2][2])
  options: { id: string; svgContent: string; isCorrect: boolean }[];
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface StroopItem {
  id: string;
  wordText: string;
  displayColor: string; // Hex color
  isCongruent: boolean;
  correctColorKey: string;
}

export interface CorsiSequenceItem {
  id: string;
  spanLength: number;
  blockSequence: number[]; // Índices de bloques (0-8 en una grilla de 9)
  delayMs: number;
}

/**
 * Genera una matriz lógica SVG paramétrica para pruebas tipo Raven
 */
export function generateRavenMatrix(seed: number, difficulty: 1 | 2 | 3 | 4 | 5): RavenMatrixItem {
  const shapes = ['circle', 'rect', 'triangle', 'diamond', 'cross'];
  const baseShape = shapes[(seed + difficulty) % shapes.length];
  
  // Generar cuadrícula 3x3 con rotación de patrones
  const cells: string[][] = [];
  for (let r = 0; r < 3; r++) {
    const row: string[] = [];
    for (let c = 0; c < 3; c++) {
      if (r === 2 && c === 2) {
        row.push('?'); // Incógnita
      } else {
        const count = ((r + c) % 3) + 1;
        const angle = (r * 45 + c * 45) % 360;
        row.push(`<g transform="rotate(${angle} 50 50)"><use href="#shape-${baseShape}"/><text x="50" y="55" font-size="12" text-anchor="middle" fill="#10b981">${count}</text></g>`);
      }
    }
    cells.push(row);
  }

  const correctAngle = (2 * 45 + 2 * 45) % 360;
  const correctCount = ((2 + 2) % 3) + 1;
  const correctSvg = `<g transform="rotate(${correctAngle} 50 50)"><use href="#shape-${baseShape}"/><text x="50" y="55" font-size="12" text-anchor="middle" fill="#10b981">${correctCount}</text></g>`;

  // Generar opciones con distractores plausibles
  const options = [
    { id: 'opt-1', svgContent: correctSvg, isCorrect: true },
    { id: 'opt-2', svgContent: `<g transform="rotate(${correctAngle + 90} 50 50)"><use href="#shape-${baseShape}"/><text x="50" y="55" font-size="12" text-anchor="middle" fill="#10b981">${correctCount}</text></g>`, isCorrect: false },
    { id: 'opt-3', svgContent: `<g transform="rotate(${correctAngle} 50 50)"><use href="#shape-${baseShape}"/><text x="50" y="55" font-size="12" text-anchor="middle" fill="#10b981">${(correctCount % 3) + 1}</text></g>`, isCorrect: false },
    { id: 'opt-4', svgContent: `<g transform="rotate(${correctAngle + 180} 50 50)"><use href="#shape-${shapes[(seed + 1) % shapes.length]}"/><text x="50" y="55" font-size="12" text-anchor="middle" fill="#10b981">${correctCount}</text></g>`, isCorrect: false }
  ].sort(() => ((seed * 9301 + 49297) % 233280) / 233280 - 0.5);

  return {
    id: `raven-${seed}-${difficulty}`,
    gridSize: 3,
    ruleType: 'rotation',
    cells,
    options,
    difficulty
  };
}

/**
 * Genera items de conflicto atencional Stroop
 */
export function generateStroopTrial(seed: number): StroopItem {
  const colors = [
    { name: 'ROJO', hex: '#ef4444', key: 'red' },
    { name: 'AZUL', hex: '#3b82f6', key: 'blue' },
    { name: 'VERDE', hex: '#10b981', key: 'green' },
    { name: 'AMARILLO', hex: '#eab308', key: 'yellow' }
  ];

  const wordIndex = seed % colors.length;
  const isCongruent = (seed % 3) === 0;
  const colorIndex = isCongruent ? wordIndex : (wordIndex + 1 + (seed % (colors.length - 1))) % colors.length;

  return {
    id: `stroop-${seed}`,
    wordText: colors[wordIndex].name,
    displayColor: colors[colorIndex].hex,
    isCongruent,
    correctColorKey: colors[colorIndex].key
  };
}

/**
 * Genera una secuencia de Corsi Block-Tapping (Memoria Viso-Espacial)
 */
export function generateCorsiSequence(spanLength: number, seed: number): CorsiSequenceItem {
  const sequence: number[] = [];
  let last = -1;
  for (let i = 0; i < spanLength; i++) {
    let next = ((seed * (i + 1) * 31) + 7) % 9;
    if (next === last) next = (next + 1) % 9;
    sequence.push(next);
    last = next;
  }

  return {
    id: `corsi-${spanLength}-${seed}`,
    spanLength,
    blockSequence: sequence,
    delayMs: 800
  };
}
