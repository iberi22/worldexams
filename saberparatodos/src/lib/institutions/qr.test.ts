import { describe, expect, it } from 'vitest';
import { encodeQr, qrSvg } from './qr';

// Reference matrix from an independent encoder (python-qrcode 8, byte mode, level M, mask 3).
const REFERENCE_V4_M_MASK3 = [
  '111111101111011001011011001111111',
  '100000101001110010100111001000001',
  '101110100001100101001111001011101',
  '101110101010101010011110101011101',
  '101110100011011001001001001011101',
  '100000100100001001011010001000001',
  '111111101010101010101010101111111',
  '000000001110000001101001000000000',
  '101101110111001011010101101001011',
  '010100011110100000111101001101101',
  '010000110001101011001001100111011',
  '010010010011011000111000101101010',
  '000111100101100100100100000101011',
  '011101001010110010100011110100010',
  '101111111001011111100010101111000',
  '001010000111100010111110111011100',
  '100110101010011100111111011011100',
  '011100000010011101101101101011011',
  '101000110100001111001010110110110',
  '100110011111101100010100010010010',
  '010111100001110000101000100101101',
  '110100011001010100100100000101101',
  '000010111101100010000101001110111',
  '011001000101110010110011001101010',
  '100100110101111101000010111110011',
  '000000001001001111110001100011000',
  '111111101001001000010011101010000',
  '100000101001010100001111100011111',
  '101110100100011001001001111110101',
  '101110101111110000111001000100111',
  '101110101100110000110100101101100',
  '100000100000001111010010110110001',
  '111111101100110111101100000010100',
];

const toRows = (m: boolean[][]) => m.map((row) => row.map((d) => (d ? '1' : '0')).join(''));

describe('encodeQr', () => {
  it('matches a reference encoder bit for bit', () => {
    expect(toRows(encodeQr('https://saberparatodos.space/?colegio=K7M2QX', { mask: 3 }))).toEqual(REFERENCE_V4_M_MASK3);
  });

  it('picks the smallest version that fits', () => {
    expect(encodeQr('K7M2QX')).toHaveLength(21);
    expect(encodeQr('x'.repeat(100))).toHaveLength(41);
  });

  it('draws the three finder patterns', () => {
    const m = encodeQr('ABC234');
    const size = m.length;
    for (const [x, y] of [[0, 0], [size - 7, 0], [0, size - 7]]) {
      expect(m[y][x] && m[y + 6][x + 6] && m[y + 3][x + 3]).toBe(true);
      expect(m[y + 1][x + 1]).toBe(false);
    }
  });

  it('rejects text above version 10', () => {
    expect(() => encodeQr('x'.repeat(300))).toThrow();
  });
});

describe('qrSvg', () => {
  it('returns an accessible svg with a quiet zone', () => {
    const svg = qrSvg('K7M2QX', { label: 'Unirse <al> grupo' });
    expect(svg).toContain('viewBox="0 0 29 29"');
    expect(svg).toContain('aria-label="Unirse al grupo"');
  });
});
