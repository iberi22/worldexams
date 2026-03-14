/**
 * Cache Service - IndexedDB storage for questions
 * Limits guest users to 100 cached questions to prevent scraping
 */

export interface CachedQuestionPool {
  questions: any[];
  timestamp: number;
  grade: number;
  isGuest: boolean;
  questionCount: number;
  isPWA: boolean;
  cacheSize: number;
  expiryHours: number;
}

const DB_NAME = 'saberparatodos_cache';
const DB_VERSION = 1;
const STORE_NAME = 'question_pools';
const DEFAULT_CACHE_EXPIRY_HOURS = 24;

class CacheService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (this.db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'grade' });
        }
      };
    });
  }

  /**
   * Save question pool to cache
   * For guests: Limits to first 100 questions
   * For PWA + Auth: Up to 420 questions (7 days of exams)
   */
  async saveQuestionPool(
    grade: number,
    questions: any[],
    isGuest: boolean = true,
    isPWA: boolean = false,
    cacheSize: number = 100,
    expiryHours: number = DEFAULT_CACHE_EXPIRY_HOURS
  ): Promise<void> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    // 🔒 SECURITY: Respect cache size limit
    const limitedQuestions = questions.slice(0, cacheSize);

    const pool: CachedQuestionPool = {
      questions: limitedQuestions,
      timestamp: Date.now(),
      grade,
      isGuest,
      questionCount: limitedQuestions.length,
      isPWA,
      cacheSize,
      expiryHours
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(pool);

      request.onsuccess = () => {
        const cacheType = isPWA ? '📱 PWA' : (isGuest ? '🔒 Guest' : '🔓 Auth');
        console.log(`✅ Cached ${limitedQuestions.length} questions for grade ${grade} (${cacheType}, expires in ${expiryHours}h)`);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get cached question pool
   * Returns null if cache is expired or doesn't exist
   */
  async getQuestionPool(grade: number): Promise<CachedQuestionPool | null> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(grade);

      request.onsuccess = () => {
        const pool = request.result as CachedQuestionPool | undefined;

        if (!pool) {
          resolve(null);
          return;
        }

        // Check if cache is expired (variable based on context)
        const expiryHours = pool.expiryHours || DEFAULT_CACHE_EXPIRY_HOURS;
        const expiryTime = expiryHours * 60 * 60 * 1000;
        const isExpired = Date.now() - pool.timestamp > expiryTime;

        if (isExpired) {
          console.log(`⏰ Cache expired for grade ${grade}`);
          resolve(null);
          return;
        }

        console.log(`📦 Found ${pool.questionCount} cached questions for grade ${grade}`);
        resolve(pool);
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Clear all cached questions (for logout or refresh)
   */
  async clearCache(): Promise<void> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        console.log('🗑️ Cache cleared');
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get cache statistics
   */
  async getCacheStats(): Promise<{ grade: number; count: number; isGuest: boolean; age: number }[]> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const pools = request.result as CachedQuestionPool[];
        const stats = pools.map(pool => ({
          grade: pool.grade,
          count: pool.questionCount,
          isGuest: pool.isGuest,
          age: Math.floor((Date.now() - pool.timestamp) / 1000 / 60) // minutes
        }));
        resolve(stats);
      };

      request.onerror = () => reject(request.error);
    });
  }
}

// Singleton instance
export const cacheService = new CacheService();

/**
 * Generate random exam from cached question pool
 * No API calls needed - all client-side
 */
export function generateRandomExam(
  cachedQuestions: any[],
  examSize: number = 20,
  subjects?: string[]
): any[] {
  let availableQuestions = [...cachedQuestions];

  // Filter by subjects if specified
  if (subjects && subjects.length > 0) {
    availableQuestions = availableQuestions.filter(q =>
      subjects.some(subject => q.category?.toLowerCase().includes(subject.toLowerCase()))
    );
  }

  // Shuffle array using Fisher-Yates
  for (let i = availableQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableQuestions[i], availableQuestions[j]] = [availableQuestions[j], availableQuestions[i]];
  }

  // Take first N questions
  return availableQuestions.slice(0, Math.min(examSize, availableQuestions.length));
}

/**
 * Get recommended exam size based on available questions
 */
export function getRecommendedExamSize(totalQuestions: number): number {
  if (totalQuestions >= 100) return 40; // Full exam
  if (totalQuestions >= 50) return 30;
  if (totalQuestions >= 30) return 20;
  return Math.min(15, totalQuestions);
}
