import { describe, it, expect, beforeEach } from 'vitest';
import {
  isWebCryptoAvailable,
  generateBackupPhrase,
  deriveKeyFromPhrase,
  getOrCreateMasterKey,
  exportBackupPhrase,
  importBackupPhrase,
  isEncryptedPayload,
  encryptData,
  decryptData
} from './encryption';

describe('Encryption Module (E2E Encrypted Storage)', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('should detect Web Crypto API availability', () => {
    const available = isWebCryptoAvailable();
    expect(available).toBe(true);
  });

  it('should generate a 12-word recovery backup phrase', () => {
    const phrase = generateBackupPhrase();
    expect(typeof phrase).toBe('string');
    const words = phrase.split(' ');
    expect(words.length).toBe(12);
  });

  it('should derive a CryptoKey from a backup phrase', async () => {
    const phrase = generateBackupPhrase();
    const key = await deriveKeyFromPhrase(phrase);
    expect(key).toBeDefined();
    expect(key.algorithm.name).toBe('AES-GCM');
  });

  it('should generate, store, and export a master backup phrase', async () => {
    const key = await getOrCreateMasterKey();
    expect(key).toBeDefined();

    const exported = exportBackupPhrase();
    expect(exported).not.toBeNull();
    expect(typeof exported).toBe('string');
    expect(exported?.split(' ').length).toBe(12);
  });

  it('should import a valid backup phrase and set master key', async () => {
    const customPhrase = 'aguila jaguar condor oriente selva andes sol luna estrella fuego viento mar';
    const success = await importBackupPhrase(customPhrase);
    expect(success).toBe(true);

    const exported = exportBackupPhrase();
    expect(exported).toBe(customPhrase);
  });

  it('should reject invalid or too short backup phrases', async () => {
    const shortPhrase = 'aguila jaguar';
    const success = await importBackupPhrase(shortPhrase);
    expect(success).toBe(false);
  });

  it('should correctly identify encrypted payload objects', () => {
    const validPayload = {
      __encrypted: true,
      version: 1,
      ciphertext: 'SGVsbG8=',
      iv: 'MTIzNDU2Nzg5MDEy',
      salt: 'c2FsdHNhbHRzYWx0'
    };
    expect(isEncryptedPayload(validPayload)).toBe(true);

    const plainObject = { score: 100, subject: 'matematicas' };
    expect(isEncryptedPayload(plainObject)).toBe(false);
    expect(isEncryptedPayload(null)).toBe(false);
    expect(isEncryptedPayload('string')).toBe(false);
  });

  it('should encrypt and decrypt data transparently using AES-256-GCM', async () => {
    const testData = {
      score: 85,
      totalQuestions: 10,
      correctCount: 8,
      answers: { 'q-1': 'A', 'q-2': 'C' },
      details: [{ questionId: 'q-1', isCorrect: true }]
    };

    const encrypted = await encryptData(testData);
    expect(isEncryptedPayload(encrypted)).toBe(true);
    expect(encrypted.ciphertext).toBeDefined();
    expect(encrypted.iv).toBeDefined();
    expect(encrypted.salt).toBeDefined();

    const decrypted = await decryptData(encrypted);
    expect(decrypted).toEqual(testData);
  });

  it('should pass through unencrypted plain data transparently during decryption', async () => {
    const plainData = { score: 90, subject: 'ciencias' };
    const result = await decryptData(plainData);
    expect(result).toEqual(plainData);
  });
});
