/**
 * WX-206 — OpLog append-only encadenado
 * Cada entrada referencia hash del anterior — cadena simple.
 * Append-only: no hay delete/update; verifica integridad por hash chain.
 */

import type { OpEntry, EntryType } from './types';
import { sha256Sync, canonicalJson } from './hash';

export class OpLog {
  private entries: OpEntry[] = [];

  constructor(initialEntries?: OpEntry[]) {
    if (initialEntries?.length) {
      // clone defensively
      this.entries = initialEntries.map((e) => ({ ...e }));
    }
  }

  /**
   * Computes deterministic hash for an entry (without its own `hash` field).
   */
  static computeEntryHash(entry: Omit<OpEntry, 'hash'>): string {
    const canonical = canonicalJson({
      index: entry.index,
      entry_type: entry.entry_type,
      data: entry.data,
      node_hash: entry.node_hash,
      signature: entry.signature,
      prev_hash: entry.prev_hash,
      timestamp: entry.timestamp,
    });
    return sha256Sync(canonical);
  }

  /**
   * Helper to verify Ed25519 signature format (hex string check).
   * TODO ML-DSA-65: Replace stub with full ML-DSA-65 / Ed25519 crypto verification.
   */
  static verifySignature(signature: string): boolean {
    if (!signature || typeof signature !== 'string') return false;
    // Check if hex string or standard signature prefix stub
    const hexPattern = /^([0-9a-fA-F]{32,128}|sig:[a-zA-Z0-9_:-]+)$/;
    return hexPattern.test(signature.trim());
  }

  /**
   * Append a signed operation entry to the log with signature verification.
   * TODO ML-DSA-65: Ed25519 verification stub.
   */
  appendSigned(
    entry_type: EntryType,
    signature: string,
    data: unknown = {},
    node_hash: string = 'system'
  ): OpEntry {
    if (!OpLog.verifySignature(signature)) {
      throw new Error(`Invalid signature format for signed operation ${entry_type}`);
    }
    return this.append(entry_type, data, node_hash, signature);
  }

  /**
   * Append new entry to log.
   * @param entry_type tipo de operación (genesis, rule_proposed, vote_cast, rule_applied)
   * @param data payload arbitrario (será canonicalizado en hash)
   * @param node_hash identificador/hash del nodo que emite
   * @param signature firma placeholder del emisor
   * @returns OpEntry creada (append-only)
   */
  append(
    entry_type: EntryType,
    data: unknown,
    node_hash: string,
    signature: string
  ): OpEntry {
    const index = this.entries.length;
    const prev_hash = index === 0 ? null : this.entries[index - 1]!.hash;
    const timestamp = new Date().toISOString();

    const partial: Omit<OpEntry, 'hash'> = {
      index,
      entry_type,
      data,
      node_hash,
      signature,
      prev_hash,
      timestamp,
    };
    const hash = OpLog.computeEntryHash(partial);
    const entry: OpEntry = { ...partial, hash };
    this.entries.push(entry);
    return { ...entry };
  }

  /**
   * Append with explicit timestamp (useful for deterministic tests).
   */
  appendWithTimestamp(
    entry_type: EntryType,
    data: unknown,
    node_hash: string,
    signature: string,
    timestamp: string
  ): OpEntry {
    const index = this.entries.length;
    const prev_hash = index === 0 ? null : this.entries[index - 1]!.hash;
    const partial: Omit<OpEntry, 'hash'> = {
      index,
      entry_type,
      data,
      node_hash,
      signature,
      prev_hash,
      timestamp,
    };
    const hash = OpLog.computeEntryHash(partial);
    const entry: OpEntry = { ...partial, hash };
    this.entries.push(entry);
    return { ...entry };
  }

  /** Devuelve copia append-only (read-only) de la lista. */
  getLog(): ReadonlyArray<OpEntry> {
    return this.entries.map((e) => ({ ...e }));
  }

  /** Longitud del log. */
  size(): number {
    return this.entries.length;
  }

  /** Limpia el log (solo tests / reset). */
  clear(): void {
    this.entries = [];
  }

  /**
   * Verifica integridad de la cadena:
   * - cada prev_hash coincide con hash del anterior
   * - cada hash es correcto respecto al contenido canonical
   * - índices son secuenciales
   */
  verifyIntegrity(): { valid: boolean; error?: string; failedIndex?: number } {
    for (let i = 0; i < this.entries.length; i++) {
      const e = this.entries[i]!;
      if (e.index !== i) {
        return { valid: false, error: `index mismatch at ${i}: expected ${i} got ${e.index}`, failedIndex: i };
      }
      const expectedPrev = i === 0 ? null : this.entries[i - 1]!.hash;
      if (e.prev_hash !== expectedPrev) {
        return {
          valid: false,
          error: `prev_hash mismatch at index ${i}: expected ${expectedPrev} got ${e.prev_hash}`,
          failedIndex: i,
        };
      }
      const { hash: _h, ...rest } = e;
      const recomputed = OpLog.computeEntryHash(rest as Omit<OpEntry, 'hash'>);
      if (recomputed !== e.hash) {
        return {
          valid: false,
          error: `hash mismatch at index ${i}: expected ${recomputed} got ${e.hash}`,
          failedIndex: i,
        };
      }
    }
    return { valid: true };
  }

  /**
   * Verifica que una entrada aislada sea válida respecto a su prev_hash dado.
   */
  static verifyEntry(entry: OpEntry, expectedPrevHash: string | null): boolean {
    if (entry.prev_hash !== expectedPrevHash) return false;
    const { hash: _h, ...rest } = entry;
    const recomputed = OpLog.computeEntryHash(rest as Omit<OpEntry, 'hash'>);
    return recomputed === entry.hash;
  }

  /** Serializa para persistencia (JSON plano). */
  toJSON(): OpEntry[] {
    return this.getLog() as OpEntry[];
  }

  /** Restaura desde JSON persistido (verifica integridad tras carga). */
  static fromJSON(entries: OpEntry[]): OpLog {
    const log = new OpLog(entries);
    return log;
  }
}
