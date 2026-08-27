import { describe, it, expect, beforeEach } from 'vitest';
import {
  serializeVaultData,
  deserializeVaultData,
  createEncryptedSyncChunk,
  decryptSyncChunk,
  assertNoPIIOutsideCiphertext,
  type StudentVaultData,
  type EncryptedSyncChunk
} from '../../src/lib/vault/encrypted-vault-sync';
import { deriveKeyFromPhrase } from '../../src/lib/encryption';

describe('Encrypted Vault Sync Module (feat-encrypted-vault-sync)', () => {
  const sampleVaultData: StudentVaultData = {
    metadata: {
      schemaVersion: 1,
      exportTimestamp: 1700000000000,
      country: 'CO'
    },
    notes: [
      {
        noteId: 'note-001',
        questionId: 'q-math-101',
        subject: 'matematicas',
        topic: 'algebra',
        noteText: 'Revisar la regla de la cadena para funciones compuestas.',
        tags: ['importante', 'repaso'],
        updatedAt: 1700000010000
      }
    ],
    competencies: [
      {
        subject: 'matematicas',
        score: 85,
        level: 'Avanzado',
        masteredTopics: ['algebra', 'geometria'],
        weakTopics: ['trigonometria'],
        updatedAt: 1700000020000
      }
    ],
    errorLogs: [
      {
        errorId: 'err-55',
        questionId: 'q-math-102',
        subject: 'matematicas',
        errorCategory: 'calculo_erroneo',
        userAns: 'B',
        correctAns: 'D',
        timestamp: 1700000030000
      }
    ],
    pedagogicalProgress: {
      overallProgressPct: 78.5,
      studyTimeMinutes: 340,
      streakDays: 5,
      lastActiveTimestamp: 1700000040000
    }
  };

  const passPhrase = 'aguila jaguar condor oriente selva andes sol luna estrella fuego viento mar';
  const nodeHash = 'a1b2c3d4e5f678901234567890abcdef12345678';

  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('should serialize and deserialize StudentVaultData with 100% data integrity', () => {
    const jsonStr = serializeVaultData(sampleVaultData);
    expect(typeof jsonStr).toBe('string');
    const deserialized = deserializeVaultData(jsonStr);
    expect(deserialized).toEqual(sampleVaultData);
  });

  it('should encrypt -> serialize -> deserialize -> decrypt roundtrip preserving 100% data integrity', async () => {
    const chunk: EncryptedSyncChunk = await createEncryptedSyncChunk(
      sampleVaultData,
      passPhrase,
      nodeHash
    );

    expect(chunk.__encrypted).toBe(true);
    expect(chunk.version).toBe(1);
    expect(chunk.node_hash).toBe(nodeHash);
    expect(typeof chunk.ciphertext).toBe('string');
    expect(typeof chunk.iv).toBe('string');
    expect(typeof chunk.salt).toBe('string');

    // Transmit chunk as JSON string over network / mesh relay
    const chunkString = JSON.stringify(chunk);
    const parsedChunk: EncryptedSyncChunk = JSON.parse(chunkString);

    const decryptedData = await decryptSyncChunk(parsedChunk, passPhrase);
    expect(decryptedData).toEqual(sampleVaultData);
  });

  it('should support decrypting with pre-derived SubtleCrypto CryptoKey', async () => {
    const key = await deriveKeyFromPhrase(passPhrase);
    const chunk = await createEncryptedSyncChunk(sampleVaultData, key, nodeHash);
    const decryptedData = await decryptSyncChunk(chunk, key);
    expect(decryptedData).toEqual(sampleVaultData);
  });

  it('should throw [BR-04] error if unencrypted PII field is attached outside ciphertext', async () => {
    // Test key name containing PII (e.g., user_email)
    await expect(
      createEncryptedSyncChunk(sampleVaultData, passPhrase, nodeHash, {
        user_email: 'estudiante@ejemplo.com'
      })
    ).rejects.toThrow('[BR-04]');

    // Test name field attached outside ciphertext
    await expect(
      createEncryptedSyncChunk(sampleVaultData, passPhrase, nodeHash, {
        full_name: 'Juan Perez'
      })
    ).rejects.toThrow('[BR-04]');

    // Test token field attached outside ciphertext
    await expect(
      createEncryptedSyncChunk(sampleVaultData, passPhrase, nodeHash, {
        auth_token: 'secret-token-123'
      })
    ).rejects.toThrow('[BR-04]');

    // Direct check using assertNoPIIOutsideCiphertext
    const invalidChunk = {
      __encrypted: true,
      version: 1,
      node_hash: nodeHash,
      ciphertext: 'valid_ciphertext_string',
      iv: 'iv_string',
      salt: 'salt_string',
      timestamp: Date.now(),
      student_email: 'user@domain.com'
    };

    expect(() => assertNoPIIOutsideCiphertext(invalidChunk)).toThrow('[BR-04]');
  });

  it('should throw [BR-04] error if email pattern string value is attached outside ciphertext', () => {
    const invalidChunkWithEmailValue = {
      __encrypted: true,
      version: 1,
      node_hash: nodeHash,
      ciphertext: 'valid_ciphertext_string',
      iv: 'iv_string',
      salt: 'salt_string',
      timestamp: Date.now(),
      custom_meta: 'contact me at test@school.edu'
    };

    expect(() => assertNoPIIOutsideCiphertext(invalidChunkWithEmailValue)).toThrow('[BR-04]');
  });

  it('should allow clean unencrypted metadata like subject or grade outside ciphertext', async () => {
    const chunk = await createEncryptedSyncChunk(sampleVaultData, passPhrase, nodeHash, {
      subject: 'matematicas',
      grade_level: 11
    });

    expect(chunk.subject).toBe('matematicas');
    expect(chunk.grade_level).toBe(11);
    expect(() => assertNoPIIOutsideCiphertext(chunk)).not.toThrow();
  });

  it('should throw when decrypting with wrong key or tampered passphrase', async () => {
    const chunk = await createEncryptedSyncChunk(sampleVaultData, passPhrase, nodeHash);
    const wrongPhrase = 'diferente frase secreta para desencriptacion fallida prueba1234';

    await expect(decryptSyncChunk(chunk, wrongPhrase)).rejects.toThrow();
  });
});
