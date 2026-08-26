/**
 * WX-201 — Storage 100% local via IndexedDB (idb)
 * Namespace: wx-pdf-{hash}  (DB name por documento)
 * También ofrece DB agregada `wx-pdf-store` para listar todos los docs.
 * Usa `idb` (https://github.com/jakearchibald/idb) con fallback in-memory para tests jsdom sin IndexedDB.
 */

import type { Chunk } from './chunker';
import type { PDFMetadata } from './extractor';

export interface PDFDoc {
  /** hash hex del contenido PDF (sha-256) */
  id: string;
  hash: string;
  fileName: string;
  fileSize: number;
  numPages: number;
  chunks: Chunk[];
  metadata: PDFMetadata;
  createdAt: number;
  modelId?: string;
}

const AGGREGATE_DB = 'wx-pdf-store';
const AGGREGATE_STORE = 'documents';
const AGGREGATE_VERSION = 1;

function dbNameForHash(hash: string): string {
  return `wx-pdf-${hash}`;
}

/** Fallback in-memory cuando IndexedDB no está disponible (tests node/jsdom) */
const memoryFallback = new Map<string, Map<string, unknown>>();

function isIndexedDBAvailable(): boolean {
  try {
    return typeof indexedDB !== 'undefined' && indexedDB !== null && typeof (indexedDB as any).open === 'function';
  } catch {
    return false;
  }
}

async function getIdb(): Promise<any> {
  try {
    const idbName = 'idb';
    return await import(/* @vite-ignore */ idbName as string);
  } catch {
    return null;
  }
}

// ---------- Helpers hash ----------

export async function hashBuffer(buffer: ArrayBuffer): Promise<string> {
  const bytes = new Uint8Array(buffer);
  // Preferir Web Crypto si está disponible
  if (typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.digest === 'function') {
    try {
      const digest = await crypto.subtle.digest('SHA-256', bytes as any);
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    } catch {}
  }
  // Fallback hash rápido (no criptográfico) para tests sin crypto.subtle
  let h = 0;
  for (let i = 0; i < bytes.length; i++) h = Math.imul(31, h) + bytes[i] | 0;
  return Math.abs(h).toString(16).padStart(8, '0') + '-' + bytes.length.toString(16);
}

export async function hashFile(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  return hashBuffer(buf);
}

// ---------- Persistencia por hash (wx-pdf-{hash}) ----------

async function saveToNamespacedDB(doc: PDFDoc): Promise<void> {
  if (!isIndexedDBAvailable()) {
    const m = memoryFallback.get(dbNameForHash(doc.hash)) ?? new Map<string, unknown>();
    m.set('doc', doc);
    m.set('chunks', doc.chunks);
    memoryFallback.set(dbNameForHash(doc.hash), m);
    return;
  }
  const idb = await getIdb();
  if (!idb) {
    const m = memoryFallback.get(dbNameForHash(doc.hash)) ?? new Map<string, unknown>();
    m.set('doc', doc);
    memoryFallback.set(dbNameForHash(doc.hash), m);
    return;
  }
  const db = await idb.openDB(dbNameForHash(doc.hash), 1, {
    upgrade(db: any) {
      if (!db.objectStoreNames.contains('chunks')) db.createObjectStore('chunks', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'id' });
    },
  });
  const tx = db.transaction(['chunks', 'meta'], 'readwrite');
  const chunksStore = tx.objectStore('chunks');
  const metaStore = tx.objectStore('meta');
  // Guardar chunks
  for (const c of doc.chunks) {
    // idb requiere clonable: Float32Array es clonable en IndexedDB moderno, pero por compatibilidad
    // serializamos embedding como Array si es necesario. Dejamos Float32Array directo (structuredClone lo soporta).
    await chunksStore.put(c as any);
  }
  await metaStore.put({
    id: doc.hash,
    fileName: doc.fileName,
    fileSize: doc.fileSize,
    numPages: doc.numPages,
    metadata: doc.metadata,
    createdAt: doc.createdAt,
    modelId: doc.modelId,
    chunkCount: doc.chunks.length,
  });
  await tx.done;
  db.close();
}

async function loadFromNamespacedDB(hash: string): Promise<PDFDoc | null> {
  if (!isIndexedDBAvailable()) {
    const m = memoryFallback.get(dbNameForHash(hash));
    if (!m) return null;
    return (m.get('doc') as PDFDoc) ?? null;
  }
  const idb = await getIdb();
  if (!idb) {
    const m = memoryFallback.get(dbNameForHash(hash));
    return (m?.get('doc') as PDFDoc) ?? null;
  }
  try {
    const db = await idb.openDB(dbNameForHash(hash), 1);
    const tx = db.transaction(['chunks', 'meta'], 'readonly');
    const chunks: Chunk[] = await tx.objectStore('chunks').getAll();
    const meta: any = await tx.objectStore('meta').get(hash);
    await tx.done;
    db.close();
    if (!meta) return null;
    return {
      id: hash,
      hash,
      fileName: meta.fileName,
      fileSize: meta.fileSize,
      numPages: meta.numPages,
      chunks,
      metadata: meta.metadata,
      createdAt: meta.createdAt,
      modelId: meta.modelId,
    };
  } catch {
    return null;
  }
}

// ---------- Aggregate store wx-pdf-store ----------

async function saveToAggregate(doc: PDFDoc): Promise<void> {
  if (!isIndexedDBAvailable()) {
    const agg = memoryFallback.get(AGGREGATE_DB) ?? new Map<string, unknown>();
    agg.set(doc.hash, doc);
    memoryFallback.set(AGGREGATE_DB, agg);
    return;
  }
  const idb = await getIdb();
  if (!idb) {
    const agg = memoryFallback.get(AGGREGATE_DB) ?? new Map<string, unknown>();
    agg.set(doc.hash, doc);
    memoryFallback.set(AGGREGATE_DB, agg);
    return;
  }
  try {
    const db = await idb.openDB(AGGREGATE_DB, AGGREGATE_VERSION, {
      upgrade(db: any) {
        if (!db.objectStoreNames.contains(AGGREGATE_STORE)) db.createObjectStore(AGGREGATE_STORE, { keyPath: 'hash' });
      },
    });
    await db.put(AGGREGATE_STORE, doc as any);
    db.close();
  } catch {
    const agg = memoryFallback.get(AGGREGATE_DB) ?? new Map<string, unknown>();
    agg.set(doc.hash, doc);
    memoryFallback.set(AGGREGATE_DB, agg);
  }
}

// ---------- API pública ----------

export async function savePDFDoc(doc: PDFDoc): Promise<void> {
  await Promise.all([saveToNamespacedDB(doc), saveToAggregate(doc)]);
}

export async function getPDFDoc(hash: string): Promise<PDFDoc | null> {
  // Intentar aggregate primero (más rápido y contiene todo)
  if (!isIndexedDBAvailable()) {
    const agg = memoryFallback.get(AGGREGATE_DB);
    if (agg?.has(hash)) return agg.get(hash) as PDFDoc;
    return loadFromNamespacedDB(hash);
  }
  const idb = await getIdb();
  if (!idb) {
    const agg = memoryFallback.get(AGGREGATE_DB);
    if (agg?.has(hash)) return agg.get(hash) as PDFDoc;
    return null;
  }
  try {
    const db = await idb.openDB(AGGREGATE_DB, AGGREGATE_VERSION);
    const doc = (await db.get(AGGREGATE_STORE, hash)) as PDFDoc | undefined;
    db.close();
    if (doc) return doc;
  } catch {}
  return loadFromNamespacedDB(hash);
}

export async function listPDFDocs(): Promise<PDFDoc[]> {
  if (!isIndexedDBAvailable()) {
    const agg = memoryFallback.get(AGGREGATE_DB);
    if (!agg) return [];
    return Array.from(agg.values()) as PDFDoc[];
  }
  const idb = await getIdb();
  if (!idb) {
    const agg = memoryFallback.get(AGGREGATE_DB);
    return agg ? (Array.from(agg.values()) as PDFDoc[]) : [];
  }
  try {
    const db = await idb.openDB(AGGREGATE_DB, AGGREGATE_VERSION);
    const docs = (await db.getAll(AGGREGATE_STORE)) as PDFDoc[];
    db.close();
    return docs;
  } catch {
    const agg = memoryFallback.get(AGGREGATE_DB);
    return agg ? (Array.from(agg.values()) as PDFDoc[]) : [];
  }
}

export async function deletePDFDoc(hash: string): Promise<void> {
  // Borrar aggregate
  if (!isIndexedDBAvailable()) {
    memoryFallback.get(AGGREGATE_DB)?.delete(hash);
    memoryFallback.delete(dbNameForHash(hash));
    return;
  }
  const idb = await getIdb();
  if (idb) {
    try {
      const aggDb = await idb.openDB(AGGREGATE_DB, AGGREGATE_VERSION);
      await aggDb.delete(AGGREGATE_STORE, hash);
      aggDb.close();
    } catch {}
    try {
      // Borrar DB namespaced completa
      // idb no tiene deleteDatabase helper directo, usar indexedDB.deleteDatabase
      await new Promise<void>((res, rej) => {
        const req = indexedDB.deleteDatabase(dbNameForHash(hash));
        req.onsuccess = () => res();
        req.onerror = () => rej(req.error);
        req.onblocked = () => res();
      });
    } catch {}
  }
  memoryFallback.get(AGGREGATE_DB)?.delete(hash);
  memoryFallback.delete(dbNameForHash(hash));
}

export async function clearAllPDFDocs(): Promise<void> {
  const docs = await listPDFDocs();
  for (const d of docs) await deletePDFDoc(d.hash);
  memoryFallback.clear();
}

export function getNamespace(hash: string): string {
  return dbNameForHash(hash);
}
