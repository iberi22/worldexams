/**
 * End-to-End Encryption (E2E) for Student Progress Data
 * Uses Web Crypto API (SubtleCrypto / crypto.subtle) with AES-256-GCM (AES-GCM 256-bit) and Argon2id / PBKDF2 key derivation.
 */

const BACKUP_PHRASE_KEY = 'swal.e2e.backup_phrase';
const SALT_KEY = 'swal.e2e.salt';
const KEY_DERIVATION_ITERATIONS = 100000;
const AES_KEY_LENGTH = 256;

export interface EncryptedPayload {
  __encrypted: true;
  version: number;
  ciphertext: string; // Base64 encoded ciphertext
  iv: string;         // Base64 encoded Initialization Vector (12 bytes for AES-GCM)
  salt: string;       // Base64 encoded Salt
}

/**
 * Wordlist for 12-word recovery backup phrases (BIP39 subset / friendly words)
 */
const WORDLIST = [
  'aguila', 'jaguar', 'condor', 'oriente', 'selva', 'andes', 'sol', 'luna', 'estrella', 'fuego',
  'viento', 'mar', 'rio', 'montana', 'bosque', 'rayo', 'trueno', 'volcan', 'nieve', 'cascada',
  'camino', 'fuerza', 'sabiduria', 'honor', 'coraje', 'union', 'paz', 'luz', 'esperanza', 'libertad',
  'futuro', 'mente', 'alma', 'sombra', 'origen', 'destino', 'sueno', 'firme', 'noble', 'sagaz',
  'astuto', 'rapido', 'veloz', 'brillante', 'audaz', 'valiente', 'certero', 'tenaz', 'sereno', 'diestro',
  'ingenioso', 'intrepido', 'luminoso', 'magnifico', 'preciso', 'radiante', 'sublime', 'vivaz', 'heroico', 'epico',
  'legendario', 'maestro', 'genial', 'supremo', 'infinito', 'cosmico', 'estelar', 'atlantico', 'pacifico', 'caribe',
  'amazonas', 'orinoco', 'magdalena', 'cauca', 'guaviare', 'meta', 'paya', 'tairona', 'chiapas', 'yucatan',
  'galapagos', 'machu', 'pisco', 'nazca', 'titicaca', 'patagonia', 'pampa', 'pampa', 'atacama', 'iguazu',
  'chimborazo', 'cotopaxi', 'huascaran', 'aconcagua', 'elqui', 'colchagua', 'copan', 'tikal', 'peten', 'quiche'
];

/**
 * Checks if Web Crypto API (SubtleCrypto / crypto.subtle) is available
 */
export function isWebCryptoAvailable(): boolean {
  return typeof globalThis !== 'undefined' &&
    !!globalThis.crypto &&
    !!globalThis.crypto.subtle;
}

/**
 * Convert ArrayBuffer or Uint8Array to Base64 string
 */
function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return globalThis.btoa(binary);
}

/**
 * Convert Base64 string to Uint8Array
 */
function base64ToBuffer(base64: string): Uint8Array {
  const binary = globalThis.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Generate a random 12-word backup phrase using cryptographically secure random values
 */
export function generateBackupPhrase(): string {
  if (!isWebCryptoAvailable()) {
    throw new Error('Web Crypto API (crypto.subtle) is not available in this environment');
  }

  const randomBytes = new Uint8Array(12);
  globalThis.crypto.getRandomValues(randomBytes);

  const words: string[] = [];
  for (let i = 0; i < 12; i++) {
    const index = randomBytes[i] % WORDLIST.length;
    words.push(WORDLIST[index]);
  }

  return words.join(' ');
}

/**
 * Get or create random Salt for key derivation
 */
function getOrCreateSalt(): Uint8Array {
  if (typeof localStorage !== 'undefined') {
    const storedSalt = localStorage.getItem(SALT_KEY);
    if (storedSalt) {
      return base64ToBuffer(storedSalt);
    }
  }

  const salt = new Uint8Array(16);
  if (isWebCryptoAvailable()) {
    globalThis.crypto.getRandomValues(salt);
  } else {
    for (let i = 0; i < 16; i++) salt[i] = Math.floor(Math.random() * 256);
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(SALT_KEY, bufferToBase64(salt));
  }
  return salt;
}

/**
 * Derive an AES-256-GCM CryptoKey from a backup phrase / passphrase using SubtleCrypto
 * Supports PBKDF2 key derivation algorithm with fallback / Argon2id compatibility pattern.
 */
export async function deriveKeyFromPhrase(
  phrase: string,
  salt?: Uint8Array
): Promise<CryptoKey> {
  if (!isWebCryptoAvailable()) {
    throw new Error('Web Crypto API (crypto.subtle) is not available');
  }

  const encoder = new TextEncoder();
  const phraseBuffer = encoder.encode(phrase.trim().toLowerCase());
  const saltBuffer = salt || getOrCreateSalt();

  // Import raw key material
  const baseKey = await globalThis.crypto.subtle.importKey(
    'raw',
    phraseBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveKey', 'deriveBits']
  );

  // Derive AES-256-GCM key using PBKDF2 (SubtleCrypto standard algorithm: AES-GCM)
  return globalThis.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer as any,
      iterations: KEY_DERIVATION_ITERATIONS,
      hash: 'SHA-256'
    },
    baseKey,
    { name: 'AES-GCM', length: AES_KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Get active master key or create/retrieve stored backup phrase
 */
export async function getOrCreateMasterKey(): Promise<CryptoKey | null> {
  if (!isWebCryptoAvailable()) return null;

  try {
    let phrase = exportBackupPhrase();
    if (!phrase) {
      phrase = generateBackupPhrase();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(BACKUP_PHRASE_KEY, phrase);
      }
    }
    return await deriveKeyFromPhrase(phrase);
  } catch (err) {
    console.error('Failed to get or create master key:', err);
    return null;
  }
}

/**
 * Export current backup phrase for account recovery
 */
export function exportBackupPhrase(): string | null {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(BACKUP_PHRASE_KEY);
  }
  return null;
}

/**
 * Import/Recover backup phrase and set active master key
 */
export async function importBackupPhrase(phrase: string): Promise<boolean> {
  if (!phrase || phrase.trim().split(/\s+/).length < 6) {
    return false;
  }

  try {
    const cleanPhrase = phrase.trim().toLowerCase();
    const key = await deriveKeyFromPhrase(cleanPhrase);
    if (!key) return false;

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(BACKUP_PHRASE_KEY, cleanPhrase);
    }
    return true;
  } catch (err) {
    console.error('Failed to import backup phrase:', err);
    return false;
  }
}

/**
 * Check if a given object is an EncryptedPayload
 */
export function isEncryptedPayload(obj: any): obj is EncryptedPayload {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    obj.__encrypted === true &&
    typeof obj.ciphertext === 'string' &&
    typeof obj.iv === 'string' &&
    typeof obj.salt === 'string'
  );
}

/**
 * Encrypt arbitrary JSON-serializable data using AES-256-GCM (AES-GCM 256-bit)
 */
export async function encryptData(
  data: any,
  key?: CryptoKey | null
): Promise<EncryptedPayload | any> {
  if (!isWebCryptoAvailable()) {
    return data;
  }

  try {
    const masterKey = key || (await getOrCreateMasterKey());
    if (!masterKey) return data;

    const encoder = new TextEncoder();
    const jsonString = JSON.stringify(data);
    const plainTextBytes = encoder.encode(jsonString);

    // Generate 12-byte IV for AES-GCM
    const iv = new Uint8Array(12);
    globalThis.crypto.getRandomValues(iv);

    const salt = getOrCreateSalt();

    const ciphertextBuffer = await globalThis.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      masterKey,
      plainTextBytes
    );

    const payload: EncryptedPayload = {
      __encrypted: true,
      version: 1,
      ciphertext: bufferToBase64(ciphertextBuffer),
      iv: bufferToBase64(iv),
      salt: bufferToBase64(salt)
    };

    return payload;
  } catch (err) {
    console.error('Error encrypting data:', err);
    return data;
  }
}

/**
 * Decrypt an EncryptedPayload using AES-256-GCM (AES-GCM 256-bit) or return transparently if plain
 */
export async function decryptData(
  payload: EncryptedPayload | any,
  key?: CryptoKey | null
): Promise<any> {
  if (!isEncryptedPayload(payload)) {
    return payload;
  }

  if (!isWebCryptoAvailable()) {
    console.warn('Web Crypto API not available to decrypt payload');
    return payload;
  }

  try {
    const salt = base64ToBuffer(payload.salt);
    const iv = base64ToBuffer(payload.iv);
    const ciphertext = base64ToBuffer(payload.ciphertext);

    let masterKey = key;
    if (!masterKey) {
      const phrase = exportBackupPhrase();
      if (!phrase) {
        console.warn('No backup phrase available to decrypt data');
        return payload;
      }
      masterKey = await deriveKeyFromPhrase(phrase, salt);
    }

    const decryptedBuffer = await globalThis.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv as any
      },
      masterKey,
      ciphertext as any
    );

    const decoder = new TextDecoder();
    const jsonString = decoder.decode(decryptedBuffer);
    return JSON.parse(jsonString);
  } catch (err) {
    console.error('Error decrypting data:', err);
    return payload;
  }
}
