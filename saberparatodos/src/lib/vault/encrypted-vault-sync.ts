/**
 * Encrypted Vault Sync Module — Student Progress & Notes Storage via Vault Bridge
 * Handles Zero-PII serialization, AES-256-GCM encryption, decryption, and chunk preparation for mesh sync / vault export.
 */

import {
  deriveKeyFromPhrase,
  encryptData,
  decryptData,
  isEncryptedPayload,
  isWebCryptoAvailable,
  type EncryptedPayload
} from '../encryption';

export interface StudentNote {
  noteId: string;
  questionId?: string;
  subject: string;
  topic?: string;
  noteText: string;
  tags?: string[];
  updatedAt: number;
}

export interface SubjectCompetency {
  subject: string;
  score: number;
  level: string;
  masteredTopics: string[];
  weakTopics: string[];
  updatedAt: number;
}

export interface ErrorLogEntry {
  errorId: string;
  questionId: string;
  subject: string;
  errorCategory: string;
  userAns: string;
  correctAns: string;
  timestamp: number;
}

export interface PedagogicalProgress {
  overallProgressPct: number;
  studyTimeMinutes: number;
  streakDays: number;
  lastActiveTimestamp: number;
}

export interface StudentVaultData {
  metadata: {
    schemaVersion: number;
    exportTimestamp: number;
    country?: string;
  };
  notes: StudentNote[];
  competencies: SubjectCompetency[];
  errorLogs: ErrorLogEntry[];
  pedagogicalProgress: PedagogicalProgress;
}

export interface EncryptedSyncChunk {
  __encrypted: true;
  version: number;
  node_hash: string;
  ciphertext: string;
  iv: string;
  salt: string;
  timestamp: number;
  [key: string]: any;
}

const PII_KEY_PATTERNS = [
  'email',
  'name',
  'full_name',
  'first_name',
  'last_name',
  'user_name',
  'username',
  'phone',
  'telephone',
  'address',
  'password',
  'token',
  'secret',
  'ssn',
  'dni',
  'cedula',
  'pii'
];

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

/**
 * Validates that no unencrypted PII (Personally Identifiable Information) field or pattern
 * exists outside ciphertext in an EncryptedSyncChunk metadata payload.
 * Throws a [BR-04] error if PII is detected.
 */
export function assertNoPIIOutsideCiphertext(chunk: Record<string, any>): void {
  const allowedStandardKeys = new Set([
    '__encrypted',
    'version',
    'node_hash',
    'ciphertext',
    'iv',
    'salt',
    'timestamp'
  ]);

  for (const [key, value] of Object.entries(chunk)) {
    const lowerKey = key.toLowerCase();

    // Check key names for PII terms (ignore allowed encrypted keys)
    if (!allowedStandardKeys.has(key) && PII_KEY_PATTERNS.some(p => lowerKey.includes(p))) {
      throw new Error(`[BR-04] Unencrypted PII field '${key}' attached outside ciphertext`);
    }

    // Check string values for email patterns outside ciphertext
    if (typeof value === 'string' && key !== 'ciphertext') {
      if (EMAIL_REGEX.test(value)) {
        throw new Error(`[BR-04] Unencrypted PII email pattern detected in key '${key}' outside ciphertext`);
      }
    }

    // Recursively check nested objects outside ciphertext
    if (typeof value === 'object' && value !== null && key !== 'ciphertext') {
      assertNoPIIOutsideCiphertext(value);
    }
  }
}

/**
 * Serializes StudentVaultData into a clean JSON string
 */
export function serializeVaultData(data: StudentVaultData): string {
  return JSON.stringify(data);
}

/**
 * Deserializes a JSON string back into StudentVaultData
 */
export function deserializeVaultData(jsonStr: string): StudentVaultData {
  const parsed = JSON.parse(jsonStr);
  if (!parsed || typeof parsed !== 'object' || !parsed.metadata) {
    throw new Error('Invalid vault data format');
  }
  return parsed as StudentVaultData;
}

/**
 * Prepares and encrypts student vault data into a sync chunk for mesh broadcast or local vault export.
 * Strictly guarantees zero PII outside ciphertext.
 */
export async function createEncryptedSyncChunk(
  data: StudentVaultData,
  vaultKeyOrPhrase: CryptoKey | string,
  nodeHash: string,
  extraUnencryptedMetadata?: Record<string, any>
): Promise<EncryptedSyncChunk> {
  let key: CryptoKey;
  if (typeof vaultKeyOrPhrase === 'string') {
    key = await deriveKeyFromPhrase(vaultKeyOrPhrase);
  } else {
    key = vaultKeyOrPhrase;
  }

  const jsonPayload = serializeVaultData(data);
  const encryptedPayload: EncryptedPayload = await encryptData(JSON.parse(jsonPayload), key);

  if (!encryptedPayload || !encryptedPayload.__encrypted) {
    throw new Error('Failed to encrypt student vault data');
  }

  const chunk: EncryptedSyncChunk = {
    __encrypted: true,
    version: 1,
    node_hash: nodeHash,
    ciphertext: encryptedPayload.ciphertext,
    iv: encryptedPayload.iv,
    salt: encryptedPayload.salt,
    timestamp: Date.now(),
    ...extraUnencryptedMetadata
  };

  // Perform strict [BR-04] Zero-PII check
  assertNoPIIOutsideCiphertext(chunk);

  return chunk;
}

/**
 * Decrypts and deserializes an EncryptedSyncChunk back into StudentVaultData
 * when authorized by the student's Vault key.
 */
export async function decryptSyncChunk(
  chunk: EncryptedSyncChunk,
  vaultKeyOrPhrase: CryptoKey | string
): Promise<StudentVaultData> {
  if (!chunk || !chunk.__encrypted || !chunk.ciphertext) {
    throw new Error('Invalid encrypted sync chunk');
  }

  // Ensure chunk has no unencrypted PII attached outside ciphertext
  assertNoPIIOutsideCiphertext(chunk);

  const payload: EncryptedPayload = {
    __encrypted: true,
    version: chunk.version || 1,
    ciphertext: chunk.ciphertext,
    iv: chunk.iv,
    salt: chunk.salt
  };

  let key: CryptoKey | null = null;
  if (typeof vaultKeyOrPhrase === 'string') {
    const saltBytes = chunk.salt ? new Uint8Array(Buffer.from(chunk.salt, 'base64')) : undefined;
    key = await deriveKeyFromPhrase(vaultKeyOrPhrase, saltBytes);
  } else {
    key = vaultKeyOrPhrase;
  }

  const decryptedResult = await decryptData(payload, key);

  if (isEncryptedPayload(decryptedResult)) {
    throw new Error('Failed to decrypt vault sync chunk: Invalid key or corrupted payload');
  }

  if (typeof decryptedResult === 'string') {
    return deserializeVaultData(decryptedResult);
  } else if (typeof decryptedResult === 'object' && decryptedResult !== null && 'metadata' in decryptedResult) {
    return decryptedResult as StudentVaultData;
  }

  throw new Error('Decryption resulted in invalid data payload');
}
