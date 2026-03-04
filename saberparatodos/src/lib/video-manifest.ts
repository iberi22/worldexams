import manifestData from '../content/video/video-manifest-v41.json';

export type VideoAvailability = 'available' | 'pending' | 'missing';

export interface VideoManifestEntry {
  question_id: string;
  protocol_version?: string;
  subject?: string;
  grade?: number;
  topic?: string;
  bundle_md_path?: string;
  bundle_assets_path?: string;
  youtube_id?: string;
  youtube_url?: string;
  shorts_youtube_id?: string;
  instagram_url?: string;
  tiktok_url?: string;
  status?: string;
  updated_at?: string;
}

export interface VideoManifestFile {
  version: string;
  generated_at: string;
  defaults?: {
    youtube_channel_url?: string;
    instagram_url?: string;
    tiktok_url?: string;
  };
  entries: VideoManifestEntry[];
}

let cache: Map<string, VideoManifestEntry> | null = null;
let defaultsCache: VideoManifestFile['defaults'] | null = null;

function normalizeQuestionId(questionId: string): string {
  return String(questionId || '').trim().toLowerCase();
}

function buildLookup(entries: VideoManifestEntry[]): Map<string, VideoManifestEntry> {
  const map = new Map<string, VideoManifestEntry>();
  for (const entry of entries) {
    const key = normalizeQuestionId(entry.question_id);
    if (!key) continue;
    map.set(key, entry);
  }
  return map;
}

function inferAvailability(entry?: VideoManifestEntry): VideoAvailability {
  if (!entry) return 'missing';
  if (entry.youtube_id || entry.youtube_url || entry.shorts_youtube_id) return 'available';
  if ((entry.status || '').toLowerCase().includes('pending')) return 'pending';
  if ((entry.status || '').toLowerCase().includes('generat')) return 'pending';
  return 'missing';
}

export async function loadVideoManifest(): Promise<Map<string, VideoManifestEntry>> {
  if (cache) return cache;
  const parsed = manifestData as VideoManifestFile;
  defaultsCache = parsed.defaults || null;
  cache = buildLookup(parsed.entries || []);
  return cache;
}

export async function getVideoManifestDefaults(): Promise<{
  youtube_channel_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
}> {
  await loadVideoManifest();
  return defaultsCache || {};
}

export async function getVideoMeta(questionId: string): Promise<{
  availability: VideoAvailability;
  entry?: VideoManifestEntry;
}> {
  const manifest = await loadVideoManifest();
  const entry = manifest.get(normalizeQuestionId(questionId));
  return {
    availability: inferAvailability(entry),
    entry
  };
}
