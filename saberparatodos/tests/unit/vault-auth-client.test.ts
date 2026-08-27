import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  deriveNodeHash,
  generateAuthChallenge,
  authenticateWithSeed,
  authenticateWithPasskey,
  isNativeMessagingAvailable,
  authenticateWithNativeHost,
  NATIVE_HOST_NAME
} from '../../src/lib/vault/vault-auth-client';
import { assertNoPII } from '../../src/lib/vault/types';

describe('SWAL Vault Auth Client Bridge (Zero-PII)', () => {
  const samplePhrase = 'aguila jaguar condor oriente selva andes sol luna estrella fuego viento mar';
  const sampleSalt = 'salt1234567890ab';

  it('assertNoPII passes on valid auth payload', () => {
    const validPayload = {
      node_hash: 'a1b2c3d4e5f67890',
      auth_type: 'passkey',
      timestamp: 1700000000000,
      signature: 'sig_test_12345'
    };

    expect(() => assertNoPII(validPayload)).not.toThrow();
  });

  it('assertNoPII throws when forbidden PII keys are present', () => {
    const payloadWithEmail = {
      node_hash: 'a1b2c3d4e5f67890',
      email: 'student@example.com'
    };

    const payloadWithName = {
      node_hash: 'a1b2c3d4e5f67890',
      student_name: 'Juan Perez'
    };

    const payloadWithNationalId = {
      node_hash: 'a1b2c3d4e5f67890',
      dni: '123456789'
    };

    expect(() => assertNoPII(payloadWithEmail)).toThrow(/PII detected/);
    expect(() => assertNoPII(payloadWithName)).toThrow(/PII detected/);
    expect(() => assertNoPII(payloadWithNationalId)).toThrow(/PII detected/);
  });

  it('assertNoPII throws when email format is present in any field value', () => {
    const payloadWithEmbeddedEmail = {
      node_hash: 'a1b2c3d4e5f67890',
      custom_data: 'user student@domain.org info'
    };

    expect(() => assertNoPII(payloadWithEmbeddedEmail)).toThrow(/PII detected/);
  });

  it('derives stable node_hash for identical input public key and salt', async () => {
    const pubKey = 'pubkey_test_sample_123';

    const hash1 = await deriveNodeHash(pubKey, sampleSalt);
    const hash2 = await deriveNodeHash(pubKey, sampleSalt);
    const hash3 = await deriveNodeHash(pubKey, sampleSalt);

    expect(hash1).toBe(hash2);
    expect(hash2).toBe(hash3);
    expect(hash1.length).toBeGreaterThanOrEqual(32);
  });

  it('derives different node_hash for different salt or pubkey', async () => {
    const hash1 = await deriveNodeHash('pubkey_A', sampleSalt);
    const hash2 = await deriveNodeHash('pubkey_B', sampleSalt);
    const hash3 = await deriveNodeHash('pubkey_A', 'differentsalt123456');

    expect(hash1).not.toBe(hash2);
    expect(hash1).not.toBe(hash3);
  });

  it('generates cryptographic auth challenge', () => {
    const challengeObj = generateAuthChallenge(sampleSalt);

    expect(challengeObj.challenge).toContain('swal_auth_v1_');
    expect(challengeObj.salt).toBe(sampleSalt);
    expect(typeof challengeObj.timestamp).toBe('number');
  });

  it('authenticates with seed phrase and returns Zero-PII payload', async () => {
    const response = await authenticateWithSeed(samplePhrase);

    expect(response.auth_type).toBe('seed');
    expect(response.node_hash).toBeDefined();
    expect(response.node_hash.length).toBeGreaterThan(0);
    expect(response.signature).toContain('sig_seed_');
    expect(() => assertNoPII(response as unknown as Record<string, unknown>)).not.toThrow();
  });

  it('throws error for invalid seed phrase', async () => {
    await expect(authenticateWithSeed('too short')).rejects.toThrow(/Invalid seed phrase format/);
  });

  it('authenticates with passkey WebAuthn flow', async () => {
    const challenge = generateAuthChallenge(sampleSalt);
    const response = await authenticateWithPasskey(challenge);

    expect(response.auth_type).toBe('passkey');
    expect(response.node_hash).toBeDefined();
    expect(response.credential_id).toBeDefined();
    expect(response.signature).toContain('sig_passkey_');
    expect(() => assertNoPII(response as unknown as Record<string, unknown>)).not.toThrow();
  });

  it('detects native messaging host support and handles native host auth', async () => {
    expect(isNativeMessagingAvailable()).toBe(false);

    const challenge = generateAuthChallenge(sampleSalt);
    const response = await authenticateWithNativeHost(challenge);

    expect(response.auth_type).toBe('native');
    expect(response.node_hash).toBeDefined();
    expect(response.signature).toContain('sig_native');
    expect(() => assertNoPII(response as unknown as Record<string, unknown>)).not.toThrow();
  });

  it('interacts with chrome.runtime.sendNativeMessage when available', async () => {
    const sendNativeMessageMock = vi.fn((host: string, msg: unknown, cb: (res: unknown) => void) => {
      expect(host).toBe(NATIVE_HOST_NAME);
      cb({
        node_hash: 'native_derived_hash_12345',
        publicKey: 'native_pubkey_67890',
        signature: 'sig_native_mocked'
      });
    });

    vi.stubGlobal('chrome', {
      runtime: {
        sendNativeMessage: sendNativeMessageMock
      }
    });

    expect(isNativeMessagingAvailable()).toBe(true);

    const challenge = generateAuthChallenge(sampleSalt);
    const response = await authenticateWithNativeHost(challenge);

    expect(sendNativeMessageMock).toHaveBeenCalled();
    expect(response.auth_type).toBe('native');
    expect(response.node_hash).toBe('native_derived_hash_12345');
    expect(response.signature).toBe('sig_native_mocked');

    vi.unstubAllGlobals();
  });
});
