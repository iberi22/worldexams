import { describe, it, expect } from 'vitest';
import {
  validateApiKey,
  isPasswordStrong,
  calculateEntropy,
  containsPotentialSecrets,
} from '../../src/lib/security';

describe('Security Validation Utilities', () => {
  describe('validateApiKey', () => {
    it('should validate API keys starting with correct prefixes and valid lengths', () => {
      expect(validateApiKey('wx_pk_abc123XYZ7890def45678901234')).toBe(true);
      expect(validateApiKey('wx_sk_abc123XYZ7890def45678901234')).toBe(true);
      expect(validateApiKey('pk_live_abc123XYZ7890def456789012')).toBe(true);
      expect(validateApiKey('sk_live_abc123XYZ7890def456789012')).toBe(true);
    });

    it('should reject invalid or too short API keys', () => {
      expect(validateApiKey('invalid-prefix-key')).toBe(false);
      expect(validateApiKey('wx_pk_short')).toBe(false);
      expect(validateApiKey('')).toBe(false);
      expect(validateApiKey(null as any)).toBe(false);
    });
  });

  describe('isPasswordStrong', () => {
    it('should return true for passwords meeting all secure requirements', () => {
      expect(isPasswordStrong('S3cure!P@ssword12')).toBe(true);
      expect(isPasswordStrong('Complex#Str0ng99')).toBe(true);
    });

    it('should return false for passwords that are too short or simple', () => {
      expect('Weak1!'.length < 12).toBe(true); // check length
      expect(isPasswordStrong('Weak1!')).toBe(false); // too short
      expect(isPasswordStrong('alllowercase1!')).toBe(false); // no uppercase
      expect(isPasswordStrong('ALLUPPERCASE1!')).toBe(false); // no lowercase
      expect(isPasswordStrong('NoNumbersOrSpecial')).toBe(false); // lacks numbers & special
    });
  });

  describe('calculateEntropy', () => {
    it('should compute higher Shannon Entropy for random strings', () => {
      const repetitive = 'aaaaaaaabbbbbbbb';
      const highlyRandom = 'a8f9G2p1q9zLx4mP';
      const lowEntropy = calculateEntropy(repetitive);
      const highEntropy = calculateEntropy(highlyRandom);

      expect(highEntropy).toBeGreaterThan(lowEntropy);
      expect(calculateEntropy('')).toBe(0);
    });
  });

  describe('containsPotentialSecrets', () => {
    it('should detect standard private key blocks', () => {
      const pem = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD\n-----END PRIVATE KEY-----';
      expect(containsPotentialSecrets(pem)).toBe(true);
    });

    it('should detect actual high-entropy secrets matching assignment patterns', () => {
      const codeWithSecret = 'const api_token = "4f8g9h2j1k5l9m7n8p2q1w3e4r5t6y7u";';
      expect(containsPotentialSecrets(codeWithSecret)).toBe(true);
    });

    it('should ignore dummy or placeholder assignments', () => {
      const codeWithDummy = 'const api_token = "your_token_here";';
      expect(containsPotentialSecrets(codeWithDummy)).toBe(false);
    });
  });
});
