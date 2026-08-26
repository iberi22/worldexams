/**
 * WX-206 — RuleEngine
 * - loadRules() lee de Supabase o IndexedDB (fallback in-memory para tests)
 * - applyRule(rule_hash) activa regla si existe
 * - sign(rule, privateKey) placeholder ML-DSA-65: sha256(rule+key).verifiable
 * - getCurrentRules() retorna reglas activas ordenadas por semver
 */

import type { Rule, GovernanceState } from './types';
import { sha256Sync, signPlaceholder, verifyPlaceholder, sha256Hex, signPlaceholderAsync, verifyPlaceholderAsync } from './hash';
import { OpLog } from './OpLog';

// Storage abstraction — permite inyección para tests
export interface RuleStorage {
  getRules(): Promise<Rule[]>;
  saveRule(rule: Rule): Promise<void>;
}

// In-memory storage (default for tests / fallback)
export class InMemoryRuleStorage implements RuleStorage {
  private rules: Map<string, Rule> = new Map(); // hash -> Rule
  async getRules(): Promise<Rule[]> {
    return Array.from(this.rules.values());
  }
  async saveRule(rule: Rule): Promise<void> {
    this.rules.set(rule.hash, rule);
  }
  clear() {
    this.rules.clear();
  }
  setRules(rules: Rule[]) {
    this.rules.clear();
    for (const r of rules) this.rules.set(r.hash, r);
  }
}

// IndexedDB storage (browser)
class IndexedDBRuleStorage implements RuleStorage {
  private dbName = 'worldexams_governance';
  private storeName = 'rules';
  private version = 1;

  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !(window as any).indexedDB) {
        reject(new Error('IndexedDB not available'));
        return;
      }
      const req = (window as any).indexedDB.open(this.dbName, this.version);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'hash' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async getRules(): Promise<Rule[]> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([this.storeName], 'readonly');
      const store = tx.objectStore(this.storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve((req.result as Rule[]) ?? []);
      req.onerror = () => reject(req.error);
    });
  }

  async saveRule(rule: Rule): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([this.storeName], 'readwrite');
      const store = tx.objectStore(this.storeName);
      const req = store.put(rule);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
}

// Supabase storage wrapper
class SupabaseRuleStorage implements RuleStorage {
  constructor(private supabase: any, private table = 'governance_rules') {}
  async getRules(): Promise<Rule[]> {
    const { data, error } = await this.supabase.from(this.table).select('*');
    if (error) throw error;
    return (data as Rule[]) ?? [];
  }
  async saveRule(rule: Rule): Promise<void> {
    const { error } = await this.supabase.from(this.table).upsert(rule, { onConflict: 'hash' });
    if (error) throw error;
  }
}

function createDefaultStorage(supabaseClient?: any): RuleStorage {
  // Priority: if supabase provided → Supabase; else if IndexedDB available → IDB; else in-memory
  if (supabaseClient) return new SupabaseRuleStorage(supabaseClient);
  if (typeof window !== 'undefined' && (window as any).indexedDB) {
    try {
      return new IndexedDBRuleStorage();
    } catch {
      // fallback
    }
  }
  return new InMemoryRuleStorage();
}

function compareSemver(a: string, b: string): number {
  const pa = a.split('.').map((n) => parseInt(n, 10));
  const pb = b.split('.').map((n) => parseInt(n, 10));
  for (let i = 0; i < 3; i++) {
    const da = pa[i] ?? 0;
    const db = pb[i] ?? 0;
    if (da !== db) return da - db;
  }
  return 0;
}

export class RuleEngine {
  private storage: RuleStorage;
  private rulesMap: Map<string, Rule> = new Map(); // hash -> Rule
  private versionMap: Map<string, Rule> = new Map(); // version -> Rule
  private activeHashes: Set<string> = new Set();
  private oplog?: OpLog;

  constructor(opts?: { storage?: RuleStorage; supabase?: any; oplog?: OpLog }) {
    this.oplog = opts?.oplog;
    this.storage = opts?.storage ?? createDefaultStorage(opts?.supabase);
  }

  /**
   * Load rules from Supabase or IndexedDB (via storage abstraction).
   * Popula memoria interna. Retorna lista ordenada por semver.
   */
  async loadRules(): Promise<Rule[]> {
    let loaded: Rule[] = [];
    try {
      loaded = await this.storage.getRules();
    } catch (e) {
      // fallback to memory if storage fails (e.g., no IDB in node)
      // if storage is IDB but fails, fallback in-memory empty
      console.warn('[RuleEngine] loadRules fallback (storage error):', e);
      loaded = [];
    }
    this.rulesMap.clear();
    this.versionMap.clear();
    for (const r of loaded) {
      this.rulesMap.set(r.hash, r);
      this.versionMap.set(r.version, r);
    }
    // all loaded rules are considered current after load; active set = all
    if (loaded.length > 0) {
      this.activeHashes.clear();
      for (const r of loaded) this.activeHashes.add(r.hash);
    }
    return this.getAllRules();
  }

  private getLatestVersionFromLoaded(rules: Rule[]): string | null {
    if (rules.length === 0) return null;
    let latest = rules[0]!.version;
    for (const r of rules.slice(1)) {
      if (compareSemver(r.version, latest) > 0) latest = r.version;
    }
    return latest;
  }

  /** Crea hash determinístico para content_json (sha256). */
  static hashContent(content_json: string): string {
    return sha256Sync(content_json);
  }
  static async hashContentAsync(content_json: string): Promise<string> {
    return await sha256Hex(content_json);
  }

  /**
   * Crea una nueva Rule firmada (sin persistir aún). Útil para proposeChange.
   * @param content_json TEXT JSON plano
   * @param version semver
   * @param signer_node id del nodo firmante
   * @param privateKey clave privada placeholder
   */
  createRule(
    content_json: string,
    version: string,
    signer_node: string,
    privateKey: string
  ): Rule {
    const hash = RuleEngine.hashContent(content_json);
    const id = `rule-${version}-${hash.slice(0, 8)}`;
    const signature = signPlaceholder(content_json, privateKey, signer_node);
    const created_at = new Date().toISOString();
    const rule: Rule = { id, version, content_json, hash, signer_node, signature, created_at };
    return rule;
  }

  /** Persist a rule (storage + memory). */
  async persistRule(rule: Rule): Promise<void> {
    await this.storage.saveRule(rule);
    this.rulesMap.set(rule.hash, rule);
    this.versionMap.set(rule.version, rule);
    // register in oplog if available
    this.oplog?.append('rule_proposed', { rule_hash: rule.hash, version: rule.version }, rule.signer_node, rule.signature);
  }

  /**
   * Aplica regla por hash — la marca como activa (latest).
   * Retorna true si encontrada y activada.
   */
  applyRule(rule_hash: string): boolean {
    const rule = this.rulesMap.get(rule_hash);
    if (!rule) return false;
    this.activeHashes.add(rule_hash);
    this.oplog?.append('rule_applied', { rule_hash, version: rule.version }, rule.signer_node, rule.signature);
    return true;
  }

  /** Aplica por versión (convenience). */
  applyRuleByVersion(version: string): boolean {
    const rule = this.versionMap.get(version);
    if (!rule) return false;
    return this.applyRule(rule.hash);
  }

  /** Firma placeholder: sha256(rule+key).verifiable */
  sign(rule: Rule | string, privateKey: string): string {
    const content = typeof rule === 'string' ? rule : rule.content_json;
    const signer = typeof rule === 'string' ? undefined : rule.signer_node;
    return signPlaceholder(content, privateKey, signer);
  }

  async signAsync(rule: Rule | string, privateKey: string): Promise<string> {
    const content = typeof rule === 'string' ? rule : rule.content_json;
    const signer = typeof rule === 'string' ? undefined : rule.signer_node;
    return await signPlaceholderAsync(content, privateKey, signer);
  }

  /** Verifica firma placeholder. */
  verify(rule: Rule | string, signature: string, privateKey: string): boolean {
    const content = typeof rule === 'string' ? rule : rule.content_json;
    const signer = typeof rule === 'string' ? undefined : rule.signer_node;
    return verifyPlaceholder(content, signature, privateKey, signer);
  }
  async verifyAsync(rule: Rule | string, signature: string, privateKey: string): Promise<boolean> {
    const content = typeof rule === 'string' ? rule : rule.content_json;
    const signer = typeof rule === 'string' ? undefined : rule.signer_node;
    return await verifyPlaceholderAsync(content, signature, privateKey, signer);
  }

  /** Retorna reglas activas; si no hay activas, retorna todas ordenadas por semver. */
  getCurrentRules(): Rule[] {
    let list: Rule[];
    if (this.activeHashes.size > 0) {
      list = Array.from(this.activeHashes)
        .map((h) => this.rulesMap.get(h)!)
        .filter(Boolean);
    } else {
      list = Array.from(this.rulesMap.values());
    }
    return list.sort((a, b) => compareSemver(a.version, b.version));
  }

  /** Retorna todas las reglas conocidas ordenadas. */
  getAllRules(): Rule[] {
    return Array.from(this.rulesMap.values()).sort((a, b) => compareSemver(a.version, b.version));
  }

  getRuleByHash(hash: string): Rule | undefined {
    return this.rulesMap.get(hash);
  }
  getRuleByVersion(version: string): Rule | undefined {
    return this.versionMap.get(version);
  }

  getLatestVersion(): string | null {
    const all = this.getAllRules();
    if (all.length === 0) return null;
    return all[all.length - 1]!.version;
  }

  getState(): GovernanceState {
    return {
      rules: this.getAllRules(),
      latest_version: this.getLatestVersion(),
      oplog: this.oplog ? ([...this.oplog.getLog()] as any) : [],
    };
  }

  /** Expone storage para tests (in-memory). */
  getStorage(): RuleStorage {
    return this.storage;
  }

  /** Para tests: inyecta reglas directo sin storage. */
  seedRules(rules: Rule[]): void {
    for (const r of rules) {
      this.rulesMap.set(r.hash, r);
      this.versionMap.set(r.version, r);
    }
  }
  clear(): void {
    this.rulesMap.clear();
    this.versionMap.clear();
    this.activeHashes.clear();
  }
}
