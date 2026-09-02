/**
 * arithmetic-bank.ts
 * Banco de estímulos aritméticos para el dominio CHC Gq (Razonamiento Cuantitativo)
 * del NeuroGym de WorldExams.
 *
 * 50 problemas graduados en 5 niveles de dificultad, en español neutro para
 * Latinoamérica. Los distractores modelan errores comunes de cálculo
 * (olvidar el llevado, invertir factores, ignorar la precedencia operatoria,
 * proporcionalidad directa/inversa mal aplicada).
 */

export type ArithmeticOperation =
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division'
  | 'word_problem';

export interface ArithmeticItem {
  /** Texto del problema (los word problems lo llevan todo; los numéricos son la consigna corta). */
  problem: string;
  /** Expresión matemática opcional de apoyo (ej: "12 + 8 × 3"). */
  expression?: string;
  /** 4 opciones numéricas (una sola es la respuesta correcta). */
  options: [number, number, number, number];
  /** Índice de la opción correcta. */
  correctIndex: 0 | 1 | 2 | 3;
  /** Respuesta correcta (invariante: options[correctIndex] === answer). */
  answer: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  operation: ArithmeticOperation;
  /** Límite de tiempo para resolver. Default 30000 ms. */
  timePressureMs?: number;
}

/**
 * PRNG determinístico Mulberry32 — misma semilla, mismo item.
 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const ARITHMETIC_BANK: ArithmeticItem[] = [
  // ────────── Nivel 1 (8-10 años): sumas y restas con números < 100 ──────────
  {
    problem: 'Resuelve: 23 + 45 = ?',
    expression: '23 + 45',
    options: [68, 65, 78, 58],
    correctIndex: 0,
    answer: 68,
    difficulty: 1,
    operation: 'addition',
    timePressureMs: 15000
  },
  {
    problem: 'Resuelve: 36 + 27 = ?',
    expression: '36 + 27',
    options: [53, 63, 62, 52],
    correctIndex: 1,
    answer: 63,
    difficulty: 1,
    operation: 'addition',
    timePressureMs: 15000
  },
  {
    problem: 'Resuelve: 58 − 29 = ?',
    expression: '58 - 29',
    options: [39, 21, 29, 31],
    correctIndex: 2,
    answer: 29,
    difficulty: 1,
    operation: 'subtraction',
    timePressureMs: 15000
  },
  {
    problem: 'Resuelve: 72 − 45 = ?',
    expression: '72 - 45',
    options: [37, 25, 35, 27],
    correctIndex: 3,
    answer: 27,
    difficulty: 1,
    operation: 'subtraction',
    timePressureMs: 15000
  },
  {
    problem: 'Resuelve: 49 + 26 = ?',
    expression: '49 + 26',
    options: [65, 75, 74, 66],
    correctIndex: 1,
    answer: 75,
    difficulty: 1,
    operation: 'addition',
    timePressureMs: 15000
  },
  {
    problem: 'Resuelve: 83 − 37 = ?',
    expression: '83 - 37',
    options: [46, 56, 44, 54],
    correctIndex: 0,
    answer: 46,
    difficulty: 1,
    operation: 'subtraction',
    timePressureMs: 15000
  },
  {
    problem: 'Resuelve: 57 + 38 = ?',
    expression: '57 + 38',
    options: [85, 94, 95, 86],
    correctIndex: 2,
    answer: 95,
    difficulty: 1,
    operation: 'addition',
    timePressureMs: 15000
  },
  {
    problem: 'Resuelve: 91 − 46 = ?',
    expression: '91 - 46',
    options: [55, 35, 54, 45],
    correctIndex: 3,
    answer: 45,
    difficulty: 1,
    operation: 'subtraction',
    timePressureMs: 15000
  },
  {
    problem: 'Resuelve: 64 + 28 = ?',
    expression: '64 + 28',
    options: [82, 91, 92, 83],
    correctIndex: 2,
    answer: 92,
    difficulty: 1,
    operation: 'addition',
    timePressureMs: 15000
  },
  {
    problem: 'Resuelve: 70 − 24 = ?',
    expression: '70 - 24',
    options: [54, 46, 36, 56],
    correctIndex: 1,
    answer: 46,
    difficulty: 1,
    operation: 'subtraction',
    timePressureMs: 15000
  },

  // ────────── Nivel 2 (11-13 años): multiplicación y división simple ──────────
  {
    problem: 'Resuelve: 7 × 8 = ?',
    expression: '7 × 8',
    options: [56, 48, 63, 54],
    correctIndex: 0,
    answer: 56,
    difficulty: 2,
    operation: 'multiplication',
    timePressureMs: 20000
  },
  {
    problem: 'Resuelve: 9 × 6 = ?',
    expression: '9 × 6',
    options: [56, 54, 45, 64],
    correctIndex: 1,
    answer: 54,
    difficulty: 2,
    operation: 'multiplication',
    timePressureMs: 20000
  },
  {
    problem: 'Resuelve: 48 ÷ 6 = ?',
    expression: '48 ÷ 6',
    options: [7, 6, 8, 9],
    correctIndex: 2,
    answer: 8,
    difficulty: 2,
    operation: 'division',
    timePressureMs: 20000
  },
  {
    problem: 'Resuelve: 63 ÷ 9 = ?',
    expression: '63 ÷ 9',
    options: [8, 9, 6, 7],
    correctIndex: 3,
    answer: 7,
    difficulty: 2,
    operation: 'division',
    timePressureMs: 20000
  },
  {
    problem: 'Resuelve: 6 × 7 = ?',
    expression: '6 × 7',
    options: [48, 36, 49, 42],
    correctIndex: 3,
    answer: 42,
    difficulty: 2,
    operation: 'multiplication',
    timePressureMs: 20000
  },
  {
    problem: 'Resuelve: 72 ÷ 8 = ?',
    expression: '72 ÷ 8',
    options: [9, 6, 8, 7],
    correctIndex: 0,
    answer: 9,
    difficulty: 2,
    operation: 'division',
    timePressureMs: 20000
  },
  {
    problem: 'Resuelve: 12 × 5 = ?',
    expression: '12 × 5',
    options: [55, 65, 50, 60],
    correctIndex: 3,
    answer: 60,
    difficulty: 2,
    operation: 'multiplication',
    timePressureMs: 20000
  },
  {
    problem: 'Resuelve: 45 ÷ 5 = ?',
    expression: '45 ÷ 5',
    options: [8, 7, 5, 9],
    correctIndex: 3,
    answer: 9,
    difficulty: 2,
    operation: 'division',
    timePressureMs: 20000
  },
  {
    problem: 'Resuelve: 9 × 8 = ?',
    expression: '9 × 8',
    options: [71, 72, 64, 81],
    correctIndex: 1,
    answer: 72,
    difficulty: 2,
    operation: 'multiplication',
    timePressureMs: 20000
  },
  {
    problem: 'Resuelve: 84 ÷ 7 = ?',
    expression: '84 ÷ 7',
    options: [11, 14, 13, 12],
    correctIndex: 3,
    answer: 12,
    difficulty: 2,
    operation: 'division',
    timePressureMs: 20000
  },

  // ────────── Nivel 3 (14-16 años): operaciones combinadas sin paréntesis ──────────
  {
    problem: 'Resuelve: 12 + 8 × 3 = ?',
    expression: '12 + 8 × 3',
    options: [36, 60, 44, 32],
    correctIndex: 0,
    answer: 36,
    difficulty: 3,
    operation: 'addition',
    timePressureMs: 30000
  },
  {
    problem: 'Resuelve: 20 − 3 × 4 = ?',
    expression: '20 - 3 × 4',
    options: [68, 8, 32, 12],
    correctIndex: 1,
    answer: 8,
    difficulty: 3,
    operation: 'subtraction',
    timePressureMs: 30000
  },
  {
    problem: 'Resuelve: 5 × 6 + 14 = ?',
    expression: '5 × 6 + 14',
    options: [100, 40, 34, 44],
    correctIndex: 3,
    answer: 44,
    difficulty: 3,
    operation: 'multiplication',
    timePressureMs: 30000
  },
  {
    problem: 'Resuelve: 10 + 30 ÷ 5 = ?',
    expression: '10 + 30 ÷ 5',
    options: [8, 16, 14, 12],
    correctIndex: 1,
    answer: 16,
    difficulty: 3,
    operation: 'division',
    timePressureMs: 30000
  },
  {
    problem: 'Resuelve: 4 × 9 − 7 = ?',
    expression: '4 × 9 - 7',
    options: [8, 28, 29, 36],
    correctIndex: 2,
    answer: 29,
    difficulty: 3,
    operation: 'multiplication',
    timePressureMs: 30000
  },
  {
    problem: 'Resuelve: 15 + 27 ÷ 9 = ?',
    expression: '15 + 27 ÷ 9',
    options: [42, 4, 12, 18],
    correctIndex: 3,
    answer: 18,
    difficulty: 3,
    operation: 'division',
    timePressureMs: 30000
  },
  {
    problem: 'Resuelve: 8 × 8 ÷ 4 = ?',
    expression: '8 × 8 ÷ 4',
    options: [60, 32, 4, 16],
    correctIndex: 3,
    answer: 16,
    difficulty: 3,
    operation: 'division',
    timePressureMs: 30000
  },
  {
    problem: 'Resuelve: 100 − 5 × 12 = ?',
    expression: '100 - 5 × 12',
    options: [40, 45, 55, 60],
    correctIndex: 0,
    answer: 40,
    difficulty: 3,
    operation: 'subtraction',
    timePressureMs: 30000
  },
  {
    problem: 'Resuelve: 6 + 4 × 7 = ?',
    expression: '6 + 4 × 7',
    options: [70, 28, 38, 34],
    correctIndex: 3,
    answer: 34,
    difficulty: 3,
    operation: 'multiplication',
    timePressureMs: 30000
  },
  {
    problem: 'Resuelve: 72 ÷ 8 + 15 = ?',
    expression: '72 ÷ 8 + 15',
    options: [23, 30, 24, 13],
    correctIndex: 2,
    answer: 24,
    difficulty: 3,
    operation: 'division',
    timePressureMs: 30000
  },

  // ────────── Nivel 4 (17-18 años): problemas verbales de 1 paso ──────────
  {
    problem: 'Si 3 libros cuestan 45 dólares, ¿cuánto cuestan 7 libros al mismo precio?',
    options: [315, 90, 84, 105],
    correctIndex: 3,
    answer: 105,
    difficulty: 4,
    operation: 'word_problem',
    timePressureMs: 30000
  },
  {
    problem: 'Un autobús recorre 60 km cada hora. ¿Cuántos kilómetros recorre en 4 horas?',
    options: [240, 180, 120, 300],
    correctIndex: 0,
    answer: 240,
    difficulty: 4,
    operation: 'word_problem',
    timePressureMs: 30000
  },
  {
    problem: 'María reparte 24 caramelos en partes iguales entre 6 niños. ¿Cuántos caramelos recibe cada niño?',
    options: [3, 4, 5, 8],
    correctIndex: 1,
    answer: 4,
    difficulty: 4,
    operation: 'word_problem',
    timePressureMs: 30000
  },
  {
    problem: 'Una camisa cuesta 120 dólares y tiene un descuento de 35 dólares. ¿Cuánto se paga por la camisa?',
    options: [155, 95, 85, 75],
    correctIndex: 2,
    answer: 85,
    difficulty: 4,
    operation: 'word_problem',
    timePressureMs: 30000
  },
  {
    problem: '5 máquinas producen 250 piezas en una hora. ¿Cuántas piezas produce 1 máquina en una hora al mismo ritmo?',
    options: [25, 125, 40, 50],
    correctIndex: 3,
    answer: 50,
    difficulty: 4,
    operation: 'word_problem',
    timePressureMs: 30000
  },
  {
    problem: 'De una cinta de 4 metros se cortan trozos de 25 centímetros. ¿Cuántos trozos se obtienen?',
    options: [40, 16, 4, 25],
    correctIndex: 1,
    answer: 16,
    difficulty: 4,
    operation: 'word_problem',
    timePressureMs: 30000
  },
  {
    problem: 'Un lector avanza 12 páginas cada día. ¿Cuántas páginas lee en una semana de 7 días?',
    options: [72, 96, 88, 84],
    correctIndex: 3,
    answer: 84,
    difficulty: 4,
    operation: 'word_problem',
    timePressureMs: 30000
  },
  {
    problem: 'En una escuela hay 28 salones con 30 estudiantes cada uno. ¿Cuántos estudiantes hay en total?',
    options: [820, 880, 840, 580],
    correctIndex: 2,
    answer: 840,
    difficulty: 4,
    operation: 'word_problem',
    timePressureMs: 30000
  },
  {
    problem: 'Si 4 kilogramos de manzanas cuestan 6000 pesos, ¿cuánto cuesta 1 kilogramo?',
    options: [1200, 1500, 1800, 2400],
    correctIndex: 1,
    answer: 1500,
    difficulty: 4,
    operation: 'word_problem',
    timePressureMs: 30000
  },
  {
    problem: 'Una piscina tiene 90 litros de agua y una bomba la vacía a razón de 6 litros por minuto. ¿Cuánto tarda en vaciarse?',
    options: [15, 12, 18, 540],
    correctIndex: 0,
    answer: 15,
    difficulty: 4,
    operation: 'word_problem',
    timePressureMs: 30000
  },

  // ────────── Nivel 5 (adulto): problemas verbales de 2 pasos con razonamiento proporcional ──────────
  {
    problem: 'Si 4 obreros construyen un muro en 12 días, ¿cuánto tardan 6 obreros al mismo ritmo?',
    options: [18, 16, 8, 6],
    correctIndex: 2,
    answer: 8,
    difficulty: 5,
    operation: 'word_problem',
    timePressureMs: 45000
  },
  {
    problem: 'Una receta para 6 personas usa 250 g de harina. ¿Cuántos gramos se necesitan para 9 personas?',
    options: [375, 300, 450, 350],
    correctIndex: 0,
    answer: 375,
    difficulty: 5,
    operation: 'word_problem',
    timePressureMs: 45000
  },
  {
    problem: 'Ana tiene 50 dólares y compra 3 cuadernos de 8 dólares cada uno. ¿Cuánto le devuelven?',
    options: [24, 34, 26, 22],
    correctIndex: 2,
    answer: 26,
    difficulty: 5,
    operation: 'word_problem',
    timePressureMs: 45000
  },
  {
    problem: 'Un automóvil recorre 120 km en 2 horas. A esa velocidad, ¿cuántas horas necesita para recorrer 300 km?',
    options: [4, 6, 3, 5],
    correctIndex: 3,
    answer: 5,
    difficulty: 5,
    operation: 'word_problem',
    timePressureMs: 45000
  },
  {
    problem: 'Una papelería vende 12 bolígrafos por 36 dólares. ¿Cuánto cuesta 7 bolígrafos?',
    options: [18, 24, 28, 21],
    correctIndex: 3,
    answer: 21,
    difficulty: 5,
    operation: 'word_problem',
    timePressureMs: 45000
  },
  {
    problem: 'Si 3 impresoras imprimen 90 páginas en 5 minutos, ¿cuántas páginas imprime 1 impresora en esos 5 minutos?',
    options: [90, 30, 45, 27],
    correctIndex: 1,
    answer: 30,
    difficulty: 5,
    operation: 'word_problem',
    timePressureMs: 45000
  },
  {
    problem: 'Luis reparte 48 canicas en partes iguales entre 5 amigos y se queda con el resto. ¿Cuántas canicas recibe cada amigo?',
    options: [3, 9, 8, 10],
    correctIndex: 1,
    answer: 9,
    difficulty: 5,
    operation: 'word_problem',
    timePressureMs: 45000
  },
  {
    problem: 'Un envase de jugo de 250 mL cuesta 4 dólares. ¿Cuánto cuesta comprar 2 litros al mismo precio?',
    options: [32, 20, 40, 8],
    correctIndex: 0,
    answer: 32,
    difficulty: 5,
    operation: 'word_problem',
    timePressureMs: 45000
  },
  {
    problem: 'Un viaje estaba planeado para 5 días con un gasto de 60 dólares por día. Si el viaje se acorta a 4 días con el mismo presupuesto total, ¿cuánto puede gastar por día?',
    options: [60, 80, 70, 75],
    correctIndex: 3,
    answer: 75,
    difficulty: 5,
    operation: 'word_problem',
    timePressureMs: 45000
  },
  {
    problem: 'Para preparar 20 sándwiches se necesitan 4 panes de molde. ¿Cuántos panes se necesitan para 35 sándwiches?',
    options: [6, 8, 7, 5],
    correctIndex: 2,
    answer: 7,
    difficulty: 5,
    operation: 'word_problem',
    timePressureMs: 45000
  }
];

/**
 * Devuelve un item determinístico para la semilla y dificultad dadas.
 * Misma (seed, difficulty) => siempre el mismo item.
 */
export function getArithmeticItem(seed: number, difficulty: 1 | 2 | 3 | 4 | 5): ArithmeticItem {
  const pool = ARITHMETIC_BANK.filter(item => item.difficulty === difficulty);
  if (pool.length === 0) {
    throw new Error(`No hay items de dificultad ${difficulty} en ARITHMETIC_BANK`);
  }
  const rng = mulberry32(seed * 2654435761 + difficulty * 40503);
  const idx = Math.floor(rng() * pool.length) % pool.length;
  return pool[idx];
}

/**
 * Sesión cronometrada determinística: `count` items con progresión de
 * dificultad 1 → 5 (bandas equitativas), sin repetición.
 */
export function getArithmeticSession(seed: number, count: number = 10): ArithmeticItem[] {
  if (count < 1) return [];
  const rng = mulberry32(seed * 668265263 + count);
  const session: ArithmeticItem[] = [];
  const used = new Set<ArithmeticItem>();
  const total = Math.min(count, ARITHMETIC_BANK.length);

  for (let band = 1; band <= 5; band++) {
    const share = Math.floor((total * band) / 5) - Math.floor((total * (band - 1)) / 5);
    const pool = ARITHMETIC_BANK.filter(item => item.difficulty === band && !used.has(item));
    for (let i = 0; i < share && pool.length > 0; i++) {
      const pick = pool.splice(Math.floor(rng() * pool.length) % pool.length, 1)[0];
      used.add(pick);
      session.push(pick);
    }
  }

  return session;
}
