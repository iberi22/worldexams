/**
 * WX-206 — Hash placeholder para gobernanza
 * - Firma placeholder ML-DSA-65: sha256(content+privateKey).verifiable
 * - Hash de reglas y entradas OpLog encadenadas
 *
 * Usa Node crypto si disponible (sync), fallback a SHA-256 puro JS,
 * o WebCrypto async cuando se requiera.
 */

// Pure JS SHA-256 (sync) — minimal implementation for browser/jsdom fallback
// Based on public domain SHA-256 (https://github.com/emn178/js-sha256 simplified)
function rightRotate(value: number, amount: number): number {
  return (value >>> amount) | (value << (32 - amount));
}

function sha256PureJs(ascii: string): string {
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let result = '';
  const words: number[] = [];
  const asciiBitLength = ascii.length * 8;

  // caching results improves performance
  let hash: number[] = [];
  const k: number[] = [];
  let primeCounter = 0;
  const isComposite: Record<number, boolean> = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) isComposite[i] = true;
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += '\x80';
  while ((ascii.length % 64) - 56) ascii += '\x00';
  for (let i = 0; i < ascii.length; i++) {
    const j = ascii.charCodeAt(i);
    if (j >> 8) return ''; // ASCII only
    words[i >> 2] |= j << ((3 - (i % 4)) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;

  for (let j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0);
    // hash = hash.slice(0) already
    for (let i = 0; i < 64; i++) {
      const i2 = i + j;
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = hash[0], e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]!
            : (w[i - 16]! +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7]! +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (let i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]!) | 0;
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

/**
 * Sync SHA-256 hex — tries Node crypto first, fallback pure JS.
 */
export function sha256Sync(input: string): string {
  // Try Node crypto if available (sync, reliable)
  try {
    // Use eval to avoid bundler static analysis
    const req = (globalThis as any).require ?? (typeof require !== 'undefined' ? require : null);
    if (req) {
      const crypto = req('crypto');
      if (crypto?.createHash) {
        return crypto.createHash('sha256').update(input, 'utf8').digest('hex');
      }
    }
  } catch (_) {
    // ignore
  }
  // Try dynamic import via createRequire not available → fallback
  try {
    // In ESM Node, process is available
    const proc = (globalThis as any).process;
    if (proc?.versions?.node) {
      // Attempt to use node:crypto via Function
      const fn = new Function('input', `
        try {
          const c = require('crypto');
          return c.createHash('sha256').update(input, 'utf8').digest('hex');
        } catch(e) { return null; }
      `);
      const r = fn(input);
      if (r) return r;
    }
  } catch (_) {}
  return sha256PureJs(input);
}

/**
 * Async SHA-256 hex — uses WebCrypto subtle if available, else sync fallback.
 */
export async function sha256Hex(input: string): Promise<string> {
  try {
    const subtle = (globalThis as any).crypto?.subtle;
    if (subtle?.digest) {
      const enc = new TextEncoder().encode(input);
      const buf = await subtle.digest('SHA-256', enc);
      const arr = new Uint8Array(buf);
      return Array.from(arr)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }
  } catch (_) {}
  return sha256Sync(input);
}

/**
 * Placeholder signature: sha256(content + privateKey) with verifiable prefix.
 * Formato: `sig:sha256:<hex>:by:<signer>`
 */
export function signPlaceholder(content: string, privateKey: string, signerNode?: string): string {
  const hex = sha256Sync(content + privateKey);
  const by = signerNode ?? 'unknown';
  return `sig:sha256:${hex}:by:${by}`;
}

export async function signPlaceholderAsync(
  content: string,
  privateKey: string,
  signerNode?: string
): Promise<string> {
  const hex = await sha256Hex(content + privateKey);
  const by = signerNode ?? 'unknown';
  return `sig:sha256:${hex}:by:${by}`;
}

/**
 * Verifica firma placeholder. Requiere privateKey (placeholder ML-DSA-65 verifiable).
 * En producción real sería clave pública; aquí placeholder verifica con misma clave.
 */
export function verifyPlaceholder(
  content: string,
  signature: string,
  privateKey: string,
  signerNode?: string
): boolean {
  const expected = signPlaceholder(content, privateKey, signerNode);
  // Compare hex part strictly; allow signer mismatch as info only if expected format same but hex equal
  const hexOfSig = signature.split(':')[2];
  const hexOfExpected = expected.split(':')[2];
  return hexOfSig === hexOfExpected;
}

export async function verifyPlaceholderAsync(
  content: string,
  signature: string,
  privateKey: string,
  signerNode?: string
): Promise<boolean> {
  const expected = await signPlaceholderAsync(content, privateKey, signerNode);
  const hexOfSig = signature.split(':')[2];
  const hexOfExpected = expected.split(':')[2];
  return hexOfSig === hexOfExpected;
}

/**
 * Canonical JSON stringify (sorted keys) para hash determinístico.
 */
export function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(canonicalJson).join(',') + ']';
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  return '{' + keys.map((k) => JSON.stringify(k) + ':' + canonicalJson(obj[k])).join(',') + '}';
}
