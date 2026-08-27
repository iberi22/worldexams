/**
 * SWAL Vault Decentralized Auth & Passkey Bridge Types
 * Zero-PII compliance definitions and guards (BR-04)
 */

export interface AuthChallenge {
  challenge: string;
  timestamp: number;
  salt: string;
}

export interface VaultAuthCredential {
  type: 'passkey' | 'seed' | 'native';
  rawPublicKey: string;
  credentialId?: string;
  signature?: string;
}

export interface VaultAuthResponse {
  node_hash: string;
  auth_type: 'passkey' | 'seed' | 'native';
  timestamp: number;
  signature?: string;
  credential_id?: string;
}

export interface NativeMessagingMessage {
  action: 'auth' | 'challenge' | 'status' | 'ping';
  challenge?: string;
  response?: unknown;
  payload?: Record<string, unknown>;
}

export const FORBIDDEN_PII_KEYS = new Set([
  'email',
  'mail',
  'name',
  'first_name',
  'last_name',
  'student_name',
  'student_id',
  'national_id',
  'dni',
  'cedula',
  'rut',
  'curp',
  'phone',
  'telephone',
  'address',
  'username',
  'user_id'
]);

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

/**
 * Validates that an auth payload contains zero PII (BR-04 compliance).
 * Throws an Error if forbidden keys or email patterns are detected.
 */
export function assertNoPII(payload: Record<string, unknown>): void {
  if (!payload || typeof payload !== 'object') {
    return;
  }

  const stack: Record<string, unknown>[] = [payload];

  while (stack.length > 0) {
    const current = stack.pop()!;
    for (const [key, value] of Object.entries(current)) {
      const lowerKey = key.toLowerCase();
      if (FORBIDDEN_PII_KEYS.has(lowerKey)) {
        throw new Error(`PII detected in payload: forbidden key "${key}"`);
      }

      if (typeof value === 'string' && EMAIL_REGEX.test(value)) {
        throw new Error(`PII detected in payload value for key "${key}"`);
      }

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        stack.push(value as Record<string, unknown>);
      } else if (Array.isArray(value)) {
        for (const item of value) {
          if (item && typeof item === 'object') {
            stack.push(item as Record<string, unknown>);
          } else if (typeof item === 'string' && EMAIL_REGEX.test(item)) {
            throw new Error(`PII detected in array item under key "${key}"`);
          }
        }
      }
    }
  }
}
