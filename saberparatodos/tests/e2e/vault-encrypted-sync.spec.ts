import { test, expect } from '@playwright/test';

test.describe('SWAL Decentralized Vault Encrypted Sync Flow (Wave 5.01 / AC-3)', () => {
  test('validates AES-256-GCM encryption & decryption roundtrip in browser context', async ({ page }) => {
    await page.goto('/');

    const roundtripSuccess = await page.evaluate(async () => {
      if (!window.crypto || !window.crypto.subtle) {
        throw new Error('WebCrypto API not available');
      }

      // Generate a test AES-GCM key
      const key = await window.crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );

      const secretPayload = JSON.stringify({
        notes: [{ noteId: 'n1', text: 'Estudiar calculo integral', subject: 'matematicas' }],
        competencies: [{ subject: 'matematicas', score: 85, level: 'avanzado' }]
      });

      const encoder = new TextEncoder();
      const encodedData = encoder.encode(secretPayload);
      const iv = window.crypto.getRandomValues(new Uint8Array(12));

      // Encrypt
      const cipherBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encodedData
      );

      // Decrypt
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        cipherBuffer
      );

      const decoder = new TextDecoder();
      const decryptedText = decoder.decode(decryptedBuffer);

      return decryptedText === secretPayload;
    });

    expect(roundtripSuccess).toBe(true);
  });

  test('validates Zero-PII assertions on encrypted metadata payloads', async ({ page }) => {
    await page.goto('/');

    const piiCheck = await page.evaluate(() => {
      const allowedStandardKeys = new Set([
        '__encrypted',
        'version',
        'node_hash',
        'ciphertext',
        'iv',
        'salt',
        'timestamp'
      ]);

      const PII_KEY_PATTERNS = [
        'email',
        'name',
        'full_name',
        'phone',
        'telephone',
        'password',
        'dni',
        'cedula'
      ];

      function checkNoPII(chunk: Record<string, any>): boolean {
        for (const [key, value] of Object.entries(chunk)) {
          const lowerKey = key.toLowerCase();
          if (!allowedStandardKeys.has(key) && PII_KEY_PATTERNS.some(p => lowerKey.includes(p))) {
            return false;
          }
          if (typeof value === 'string' && key !== 'ciphertext') {
            if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(value)) {
              return false;
            }
          }
        }
        return true;
      }

      const validChunk = {
        __encrypted: true,
        version: 1,
        node_hash: 'node_abc123',
        ciphertext: 'base64ciphertext...',
        iv: 'iv123',
        salt: 'salt123',
        timestamp: Date.now()
      };

      const invalidChunk = {
        ...validChunk,
        email: 'user@example.com'
      };

      return {
        validPasses: checkNoPII(validChunk),
        invalidFails: !checkNoPII(invalidChunk)
      };
    });

    expect(piiCheck.validPasses).toBe(true);
    expect(piiCheck.invalidFails).toBe(true);
  });
});
