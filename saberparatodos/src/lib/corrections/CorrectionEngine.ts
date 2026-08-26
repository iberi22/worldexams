/**
 * WX-303 — CorrectionEngine
 * reportCorrection -> draft (IndexedDB 'wx-corrections-{bundle_hash}')
 * approveCorrection -> tally >=2 approves => approved
 * generatePatch -> unified diff manual (+/-/space prefix, NO external lib)
 * exportPatch -> .md file content listo para PR al pipeline
 */

import type {
  CorrectionReport,
  CreateCorrectionInput,
  ApproveInput,
  Patch,
  Review,
} from './types';

// ---------------------------------------------------------------------------
// Hash & DB helpers
// ---------------------------------------------------------------------------

export function hashString(str: string): string {
  // djb2 simple hex (deterministic, fast)
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  // unsigned 32 + hex
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function getBundleHash(bundlePath: string): string {
  return hashString(bundlePath || 'default');
}

export function getDbName(bundlePath: string): string {
  return `wx-corrections-${getBundleHash(bundlePath)}`;
}

const STORE_REPORTS = 'reports';
const DB_VERSION = 1;

// In-memory fallback for SSR / Node / tests where IndexedDB unavailable
const memoryStore = new Map<string, CorrectionReport>();

function isIndexedDBAvailable(): boolean {
  try {
    return typeof indexedDB !== 'undefined' && !!indexedDB.open;
  } catch {
    return false;
  }
}

function openDB(dbName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!isIndexedDBAvailable()) {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const req = indexedDB.open(dbName, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_REPORTS)) {
        const store = db.createObjectStore(STORE_REPORTS, { keyPath: 'id' });
        store.createIndex('question_id', 'question_id', { unique: false });
        store.createIndex('status', 'status', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbPut(dbName: string, report: CorrectionReport): Promise<void> {
  if (!isIndexedDBAvailable()) {
    memoryStore.set(report.id, structuredClone(report));
    return;
  }
  try {
    const db = await openDB(dbName);
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction([STORE_REPORTS], 'readwrite');
      const store = tx.objectStore(STORE_REPORTS);
      // ensure cloneable
      const clone = JSON.parse(JSON.stringify(report));
      const req = store.put(clone);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
      tx.onerror = () => reject(tx.error);
    });
    // also keep memory for SSR fast path
    memoryStore.set(report.id, structuredClone(report));
  } catch {
    // fallback
    memoryStore.set(report.id, structuredClone(report));
  }
}

async function idbGet(dbName: string, id: string): Promise<CorrectionReport | null> {
  if (memoryStore.has(id)) return structuredClone(memoryStore.get(id)!);
  if (!isIndexedDBAvailable()) return null;
  try {
    const db = await openDB(dbName);
    const result: CorrectionReport | null = await new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_REPORTS], 'readonly');
      const store = tx.objectStore(STORE_REPORTS);
      const req = store.get(id);
      req.onsuccess = () => resolve((req.result as CorrectionReport) || null);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
    if (result) memoryStore.set(id, structuredClone(result));
    return result ? structuredClone(result) : null;
  } catch {
    return memoryStore.get(id) ? structuredClone(memoryStore.get(id)!) : null;
  }
}

async function idbGetAll(dbName?: string): Promise<CorrectionReport[]> {
  // If dbName omitted, return all from memory (server-wide)
  if (!isIndexedDBAvailable()) {
    const all = Array.from(memoryStore.values());
    if (!dbName) return all.map((r) => structuredClone(r));
    // filter by bundle hash if dbName given
    const hash = dbName.replace('wx-corrections-', '');
    return all
      .filter((r) => getBundleHash(r.question_bundle_path) === hash)
      .map((r) => structuredClone(r));
  }
  // Try IDB if available
  try {
    if (!dbName) {
      // return memory as fallback for "all" (no way to enumerate DB names without listing)
      return Array.from(memoryStore.values()).map((r) => structuredClone(r));
    }
    const db = await openDB(dbName);
    const results: CorrectionReport[] = await new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_REPORTS], 'readonly');
      const store = tx.objectStore(STORE_REPORTS);
      const req = store.getAll();
      req.onsuccess = () => resolve((req.result as CorrectionReport[]) || []);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
    // sync memory
    for (const r of results) memoryStore.set(r.id, structuredClone(r));
    return results.map((r) => structuredClone(r));
  } catch {
    const all = Array.from(memoryStore.values());
    if (!dbName) return all.map((r) => structuredClone(r));
    const hash = dbName.replace('wx-corrections-', '');
    return all
      .filter((r) => getBundleHash(r.question_bundle_path) === hash)
      .map((r) => structuredClone(r));
  }
}

async function idbGetByQuestion(
  questionId: string,
  bundlePathHint?: string
): Promise<CorrectionReport[]> {
  const all = bundlePathHint
    ? await idbGetAll(getDbName(bundlePathHint))
    : await idbGetAll();
  // If hint not provided, search memory + try all bundles memory already covers
  if (bundlePathHint) {
    return all.filter((r) => r.question_id === questionId);
  }
  // without hint, filter all memory (which idbGetAll() returns)
  const filtered = all.filter((r) => r.question_id === questionId);
  // Also ensure any missing from memory that might be in other DBs? memory already holds everything put via idbPut
  return filtered;
}

// ---------------------------------------------------------------------------
// ID generation
// ---------------------------------------------------------------------------

export function generateCorrectionId(): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `cr-${Date.now().toString(36)}-${rand}`;
}

// ---------------------------------------------------------------------------
// Core API
// ---------------------------------------------------------------------------

/**
 * reportCorrection: creates draft and persists in IndexedDB 'wx-corrections-{bundle_hash}'
 */
export async function reportCorrection(
  input: CreateCorrectionInput & { id?: string }
): Promise<CorrectionReport> {
  if (!input.question_id || !input.question_bundle_path || !input.error_type || !input.description || !input.reporter_node_hash) {
    throw new Error('Missing required fields for CorrectionReport');
  }
  const now = new Date().toISOString();
  const report: CorrectionReport = {
    id: input.id || generateCorrectionId(),
    question_id: input.question_id,
    question_bundle_path: input.question_bundle_path,
    error_type: input.error_type,
    description: input.description,
    reporter_node_hash: input.reporter_node_hash,
    created_at: now,
    status: 'draft',
    patches: [],
    reviewers: [],
  };
  // Keep optional diff helpers as hidden props for generatePatch
  if ((input as any).original_content) (report as any).original_content = (input as any).original_content;
  if ((input as any).proposed_content) (report as any).proposed_content = (input as any).proposed_content;

  const dbName = getDbName(report.question_bundle_path);
  await idbPut(dbName, report);
  return structuredClone(report);
}

/**
 * approveCorrection: add reviewer vote, tally >=2 approves => approved
 */
export async function approveCorrection(
  id: string,
  reviewer: ApproveInput & { timestamp?: string },
  bundlePathHint?: string
): Promise<CorrectionReport> {
  // Find report - try hint first, then scan memory
  let report: CorrectionReport | null = null;
  let dbName: string | undefined;

  if (bundlePathHint) {
    dbName = getDbName(bundlePathHint);
    report = await idbGet(dbName, id);
  }
  if (!report) {
    // scan memory
    if (memoryStore.has(id)) {
      report = structuredClone(memoryStore.get(id)!);
      dbName = getDbName(report.question_bundle_path);
    } else {
      // scan all memory
      const all = await idbGetAll();
      report = all.find((r) => r.id === id) || null;
      if (report) dbName = getDbName(report.question_bundle_path);
    }
  }
  if (!report || !dbName) throw new Error(`Correction ${id} not found`);

  const existingIdx = report.reviewers.findIndex(
    (r) => r.reviewer_node_hash === reviewer.reviewer_node_hash
  );
  const newReview: Review = {
    reviewer_node_hash: reviewer.reviewer_node_hash,
    vote: reviewer.vote,
    comment: reviewer.comment || '',
    timestamp: reviewer.timestamp || new Date().toISOString(),
  };
  if (existingIdx >= 0) {
    report.reviewers[existingIdx] = newReview;
  } else {
    report.reviewers.push(newReview);
  }

  // Tally
  const approves = report.reviewers.filter((r) => r.vote === 'approve').length;
  const rejects = report.reviewers.filter((r) => r.vote === 'reject').length;

  if (approves >= 2) {
    report.status = 'approved';
  } else if (rejects >= 2) {
    report.status = 'rejected';
  } else if (report.reviewers.length > 0) {
    report.status = 'reviewing';
  } else {
    report.status = 'draft';
  }

  // Auto-generate patches when approved (optional, but keep patches empty until generatePatch called)
  await idbPut(dbName, report);
  return structuredClone(report);
}

// ---------------------------------------------------------------------------
// Diff generation (NO external lib)
// ---------------------------------------------------------------------------

/**
 * Simple line diff: compares original vs proposed (or synthesizes from description)
 * Returns unified diff string with + / - / space prefix
 */
export function buildUnifiedDiff(
  filePath: string,
  original: string,
  proposed: string
): string {
  const origLines = original.split('\n');
  const propLines = proposed.split('\n');

  // Simple LCS-like diff: iterate, mark equal as context, else -/+
  // For small content we do naive: if lines equal -> context, else show - and +
  const diffLines: string[] = [];
  diffLines.push(`--- a/${filePath}`);
  diffLines.push(`+++ b/${filePath}`);

  // Header with line counts
  diffLines.push(`@@ -1,${origLines.length} +1,${propLines.length} @@`);

  const max = Math.max(origLines.length, propLines.length);
  for (let i = 0; i < max; i++) {
    const o = origLines[i];
    const p = propLines[i];
    if (o === p) {
      diffLines.push(` ${o ?? ''}`);
    } else {
      if (o !== undefined) diffLines.push(`-${o}`);
      if (p !== undefined) diffLines.push(`+${p}`);
      // If both exist and differ, we treat as replacement (~ could be used but we use - then +)
    }
  }
  return diffLines.join('\n');
}

/**
 * generatePatch: produce unified diff per each question afectada
 * Stores result in correction.patches and persists
 */
export async function generatePatch(correction: CorrectionReport): Promise<Patch[]> {
  const filePath = correction.question_bundle_path;
  const orig = (correction as any).original_content as string | undefined;
  const prop = (correction as any).proposed_content as string | undefined;

  let diff: string;
  if (orig !== undefined && prop !== undefined) {
    diff = buildUnifiedDiff(filePath, orig, prop);
  } else if (prop !== undefined) {
    // No original, treat description as original and prop as new
    const origFallback = `<!-- question_id: ${correction.question_id} -->\n${correction.description}`;
    diff = buildUnifiedDiff(filePath, origFallback, prop);
  } else {
    // Synthesize diff from description: show removal of placeholder and addition of description
    const origPlaceholder = `# Question ${correction.question_id} original`;
    const proposed = `# Question ${correction.question_id} corrected\n# error_type: ${correction.error_type}\n${correction.description}`;
    diff = buildUnifiedDiff(filePath, origPlaceholder, proposed);
  }

  const patch: Patch = {
    file_path: filePath,
    diff_unified: diff,
  };

  // Persist updated patches
  const updated: CorrectionReport = {
    ...correction,
    patches: [patch],
  };
  // keep hidden props
  if ((correction as any).original_content) (updated as any).original_content = (correction as any).original_content;
  if ((correction as any).proposed_content) (updated as any).proposed_content = (correction as any).proposed_content;

  const dbName = getDbName(updated.question_bundle_path);
  await idbPut(dbName, updated);

  return [patch];
}

/**
 * exportPatch: genera .md file content listo para commit al pipeline
 */
export function exportPatch(correction: CorrectionReport): string {
  const patches = correction.patches;
  if (!patches || patches.length === 0) {
    throw new Error('No patches to export — call generatePatch() first or ensure correction is approved');
  }
  const date = new Date().toISOString().slice(0, 10);
  const title = `Corrección ${correction.id} — ${correction.question_id}`;
  const frontmatter = [
    '---',
    `id: "${correction.id}"`,
    `question_id: "${correction.question_id}"`,
    `question_bundle_path: "${correction.question_bundle_path}"`,
    `error_type: "${correction.error_type}"`,
    `status: "${correction.status}"`,
    `reporter_node_hash: "${correction.reporter_node_hash}"`,
    `created_at: "${correction.created_at}"`,
    `exported_at: "${new Date().toISOString()}"`,
    `reviewers: ${correction.reviewers.length}`,
    `approvals: ${correction.reviewers.filter((r) => r.vote === 'approve').length}`,
    '---',
    '',
  ].join('\n');

  const header = `# ${title}\n\n> Exportado el ${date} desde nodo ${correction.reporter_node_hash}. Estado: **${correction.status}**.\n\n## Descripción\n\n${correction.description}\n\n## Revisores\n\n${
    correction.reviewers.length === 0
      ? '_Sin revisores aún._'
      : correction.reviewers
          .map((r) => `- **${r.reviewer_node_hash}** — ${r.vote} — ${r.timestamp}\n  ${r.comment ? `> ${r.comment}` : ''}`)
          .join('\n')
  }\n\n## Patch unificado\n\nGenerado automáticamente. Aplicar con \`git apply\` o revisar manualmente.\n\n`;

  const patchBlocks = patches
    .map(
      (p) =>
        `### \`${p.file_path}\`\n\n\`\`\`diff\n${p.diff_unified}\n\`\`\`\n`
    )
    .join('\n');

  const footer = `\n---\n\n*Este patch está listo para PR al pipeline de contenido. Corregir primero el \`.md\` fuente en \`${correction.question_bundle_path}\`, validar con \`npm run validate\` y regenerar packs.*\n`;

  return frontmatter + header + patchBlocks + footer;
}

// ---------------------------------------------------------------------------
// Helpers for API / tests
// ---------------------------------------------------------------------------

export async function getCorrection(id: string, bundlePathHint?: string): Promise<CorrectionReport | null> {
  if (bundlePathHint) {
    const dbName = getDbName(bundlePathHint);
    const found = await idbGet(dbName, id);
    if (found) return found;
  }
  if (memoryStore.has(id)) return structuredClone(memoryStore.get(id)!);
  const all = await idbGetAll();
  const found = all.find((r) => r.id === id);
  return found ? structuredClone(found) : null;
}

export async function listCorrectionsByQuestion(
  questionId: string,
  bundlePathHint?: string
): Promise<CorrectionReport[]> {
  return idbGetByQuestion(questionId, bundlePathHint);
}

export async function listAllCorrections(): Promise<CorrectionReport[]> {
  return idbGetAll();
}

export async function clearAllCorrections(): Promise<void> {
  memoryStore.clear();
  if (!isIndexedDBAvailable()) return;
  // Attempt to clear IDB for all known bundle hashes in memory
  // Since we don't track DB names, try to delete known pattern via indexedDB.databases() if available
  try {
    // @ts-ignore - newer API
    if (typeof indexedDB.databases === 'function') {
      const dbs = await (indexedDB as any).databases();
      for (const dbInfo of dbs) {
        const name = dbInfo.name as string;
        if (name && name.startsWith('wx-corrections-')) {
          await new Promise<void>((resolve) => {
            const del = indexedDB.deleteDatabase(name);
            del.onsuccess = () => resolve();
            del.onerror = () => resolve();
            del.onblocked = () => resolve();
          });
        }
      }
    }
  } catch {
    // ignore
  }
}

// Utility to reset for tests
export const __testUtils = {
  memoryStore,
  hashString,
  getBundleHash,
  getDbName,
  buildUnifiedDiff,
};
