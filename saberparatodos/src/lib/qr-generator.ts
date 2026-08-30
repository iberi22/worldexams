/**
 * Pure TypeScript QR Code SVG Generator (Zero-Dependency)
 * Genera un SVG de código QR autónomo y ligero para URLs de unirse a salones de examen.
 */

// QR Code spec helper constants & polynomials
const GF256_EXP: number[] = new Array(256);
const GF256_LOG: number[] = new Array(256);

(function initGF256() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF256_EXP[i] = x;
    GF256_LOG[x] = i;
    x <<= 1;
    if (x & 256) x ^= 0x11d;
  }
  GF256_EXP[255] = GF256_EXP[0];
})();

function gfMul(x: number, y: number): number {
  if (x === 0 || y === 0) return 0;
  return GF256_EXP[(GF256_LOG[x] + GF256_LOG[y]) % 255];
}

function rsPolyMul(p1: number[], p2: number[]): number[] {
  const result = new Array(p1.length + p2.length - 1).fill(0);
  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      result[i + j] ^= gfMul(p1[i], p2[j]);
    }
  }
  return result;
}

function rsGeneratorPoly(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    poly = rsPolyMul(poly, [1, GF256_EXP[i]]);
  }
  return poly;
}

function rsEncode(data: number[], ecLen: number): number[] {
  const gen = rsGeneratorPoly(ecLen);
  const res = new Array(data.length + ecLen).fill(0);
  for (let i = 0; i < data.length; i++) res[i] = data[i];

  for (let i = 0; i < data.length; i++) {
    const coef = res[i];
    if (coef !== 0) {
      for (let j = 0; j < gen.length; j++) {
        res[i + j] ^= gfMul(gen[j], coef);
      }
    }
  }
  return res.slice(data.length);
}

// Fixed QR specs for Versión 1-5 (Suitable for Room join URLs)
interface QRVersionSpec {
  version: number;
  size: number;
  dataCapacity: number; // Low EC data bytes
  ecBytes: number;
}

const QR_SPECS: QRVersionSpec[] = [
  { version: 1, size: 21, dataCapacity: 19, ecBytes: 7 },
  { version: 2, size: 25, dataCapacity: 34, ecBytes: 10 },
  { version: 3, size: 29, dataCapacity: 55, ecBytes: 15 },
  { version: 4, size: 33, dataCapacity: 80, ecBytes: 20 },
  { version: 5, size: 37, dataCapacity: 108, ecBytes: 26 },
];

export function generateQRCodeSVG(text: string, options?: { size?: number; quietZone?: boolean; darkColor?: string; lightColor?: string }): string {
  const textBytes = new TextEncoder().encode(text);

  // Selecciona la versión mínima necesaria
  const headerBits = 4 + 8; // Byte mode (0100) + 8-bit length
  const totalNeededBytes = Math.ceil((headerBits + textBytes.length * 8) / 8);

  const spec = QR_SPECS.find((s) => s.dataCapacity >= totalNeededBytes) || QR_SPECS[QR_SPECS.length - 1];
  const size = spec.size;

  // Constructor de flujo de bits
  const bits: number[] = [];
  function pushBits(val: number, len: number) {
    for (let i = len - 1; i >= 0; i--) {
      bits.push((val >> i) & 1);
    }
  }

  // Modo Byte (0100)
  pushBits(0b0100, 4);
  pushBits(Math.min(textBytes.length, 255), 8);

  for (const b of textBytes) {
    pushBits(b, 8);
  }

  // Relleno de fin de bits (Terminator + Padding bytes)
  const maxBits = spec.dataCapacity * 8;
  const termLen = Math.min(4, maxBits - bits.length);
  pushBits(0, termLen);

  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < maxBits) {
    pushBits(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  // Convertir bits a bytes de datos
  const dataBytes: number[] = [];
  for (let i = 0; i < spec.dataCapacity; i++) {
    let byteVal = 0;
    for (let b = 0; b < 8; b++) {
      byteVal = (byteVal << 1) | bits[i * 8 + b];
    }
    dataBytes.push(byteVal);
  }

  // Reed-Solomon Error Correction
  const ecBytes = rsEncode(dataBytes, spec.ecBytes);
  const finalCodewords = [...dataBytes, ...ecBytes];

  // Matriz de QR
  const matrix: (boolean | null)[][] = Array.from({ length: size }, () => Array(size).fill(null));

  // 1. Patrones de Posición (Finder Patterns)
  function placeFinder(r: number, c: number) {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
        if (dr >= 0 && dr <= 6 && (dc === 0 || dc === 6 || dr === 0 || dr === 6)) {
          matrix[nr][nc] = true;
        } else if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) {
          matrix[nr][nc] = true;
        } else {
          matrix[nr][nc] = false;
        }
      }
    }
  }

  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  // 2. Líneas de Sincronización (Timing Patterns)
  for (let i = 8; i < size - 8; i++) {
    if (matrix[6][i] === null) matrix[6][i] = i % 2 === 0;
    if (matrix[i][6] === null) matrix[i][6] = i % 2 === 0;
  }

  // Módulo Oscuro Fijo
  matrix[size - 8][8] = true;

  // Reserva Formato (Format Information)
  for (let i = 0; i < 9; i++) {
    if (matrix[8][i] === null) matrix[8][i] = false;
    if (matrix[i][8] === null) matrix[i][8] = false;
  }
  for (let i = size - 8; i < size; i++) {
    if (matrix[8][i] === null) matrix[8][i] = false;
    if (matrix[i][8] === null) matrix[i][8] = false;
  }

  // 3. Alineación (si versión > 1)
  if (spec.version >= 2) {
    const alignPos = size - 7;
    for (let dr = -2; dr <= 2; dr++) {
      for (let dc = -2; dc <= 2; dc++) {
        const nr = alignPos + dr;
        const nc = alignPos + dc;
        if (matrix[nr][nc] === null) {
          matrix[nr][nc] = Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0);
        }
      }
    }
  }

  // 4. Inserción de Codewords en la Matriz en Zig-Zag
  const allBits: number[] = [];
  for (const cw of finalCodewords) {
    for (let i = 7; i >= 0; i--) {
      allBits.push((cw >> i) & 1);
    }
  }

  let bitIdx = 0;
  let dirUp = true;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--; // Saltar columna de tiempo 6

    const rowStart = dirUp ? size - 1 : 0;
    const rowEnd = dirUp ? -1 : size;
    const step = dirUp ? -1 : 1;

    for (let row = rowStart; row !== rowEnd; row += step) {
      for (let c = col; c > col - 2; c--) {
        if (matrix[row][c] === null) {
          let b = bitIdx < allBits.length ? allBits[bitIdx++] === 1 : false;
          // Máscara 0 simple: (row + col) % 2 === 0
          if ((row + c) % 2 === 0) b = !b;
          matrix[row][c] = b;
        }
      }
    }
    dirUp = !dirUp;
  }

  // 5. Aplicar Formato Información Mask 0 + Low EC (00 000) = 0x1105 XOR
  const formatInfo = [
    true, true, false, true, true, false, true, false, true, false, false, false, true, false, true
  ]; // Format sequence pre-computed mask 0, Low EC

  // Formato superior izquierdo
  for (let i = 0; i < 6; i++) matrix[8][i] = formatInfo[i];
  matrix[8][7] = formatInfo[6];
  matrix[8][8] = formatInfo[7];
  matrix[7][8] = formatInfo[8];
  for (let i = 0; i < 6; i++) matrix[5 - i][8] = formatInfo[9 + i];

  // Formato esquinas secundarias
  for (let i = 0; i < 7; i++) matrix[size - 1 - i][8] = formatInfo[i];
  for (let i = 0; i < 8; i++) matrix[8][size - 8 + i] = formatInfo[7 + i];

  // Renderizar SVG
  const quietZone = options?.quietZone !== false ? 4 : 0;
  const viewSize = size + quietZone * 2;
  const dark = options?.darkColor || '#000000';
  const light = options?.lightColor || '#ffffff';

  let rects = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c]) {
        rects += `<rect x="${c + quietZone}" y="${r + quietZone}" width="1.05" height="1.05" fill="${dark}" />`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewSize} ${viewSize}" shape-rendering="crispEdges" class="w-full h-full">
    <rect width="${viewSize}" height="${viewSize}" fill="${light}" />
    ${rects}
  </svg>`;
}
