/**
 * SWAL Credits & Karma Management Module
 * Handles earning, spending, and persistence of SWAL credits in IndexedDB with localStorage fallback.
 *
 * Earning rules:
 * - Daily use: +10 credits per day
 * - Answering questions: +1 credit
 * - Validating content: +5 credits
 *
 * Spending rules:
 * - Cloud model access: costs credits
 */

const STORAGE_KEY = 'swal_credits_data';
const DB_NAME = 'swal_credits_db';
const DB_VERSION = 1;
const STORE_NAME = 'credits';

export interface CreditTransaction {
  id: string;
  amount: number;
  type: 'daily_reward' | 'answer_question' | 'validate_content' | 'spend' | 'manual_add';
  reason: string;
  timestamp: number;
}

export interface CreditsData {
  credits: number;
  lastDailyClaim: number;
  history: CreditTransaction[];
}

const DEFAULT_DATA: CreditsData = {
  credits: 0,
  lastDailyClaim: 0,
  history: [],
};

/**
 * Helper to open IndexedDB database for credits storage
 */
function openCreditsDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not available'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
  });
}

/**
 * Read credit data from IndexedDB or localStorage fallback
 */
async function loadCreditsData(): Promise<CreditsData> {
  // Try IndexedDB first
  try {
    const db = await openCreditsDB();
    const data = await new Promise<CreditsData | null>((resolve) => {
      const tx = db.transaction([STORE_NAME], 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('main');
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => resolve(null);
    });

    if (data) return data;
  } catch {
    // Fall back to localStorage or memory
  }

  // Fallback to localStorage
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw) as CreditsData;
      }
    } catch {
      // Ignore parse errors
    }
  }

  return { ...DEFAULT_DATA };
}

/**
 * Save credit data to IndexedDB and localStorage
 */
async function saveCreditsData(data: CreditsData): Promise<void> {
  // Always update localStorage if available
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore write errors
    }
  }

  // Persist to IndexedDB
  try {
    const db = await openCreditsDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction([STORE_NAME], 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put({ key: 'main', data, updatedAt: Date.now() });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Non-fatal if IDB fails
  }
}

/**
 * Gets current SWAL credits balance.
 */
export async function getCredits(): Promise<number> {
  const data = await loadCreditsData();
  return data.credits;
}

/**
 * Adds SWAL credits to the user balance.
 */
export async function addCredits(
  amount: number,
  reason: string = 'Credit added',
  type: CreditTransaction['type'] = 'manual_add'
): Promise<number> {
  if (amount <= 0) {
    return getCredits();
  }

  const data = await loadCreditsData();
  data.credits += amount;

  const transaction: CreditTransaction = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `tx_${Date.now()}_${Math.random()}`,
    amount,
    type,
    reason,
    timestamp: Date.now(),
  };

  data.history.unshift(transaction);
  // Keep last 100 transactions
  if (data.history.length > 100) {
    data.history = data.history.slice(0, 100);
  }

  await saveCreditsData(data);
  return data.credits;
}

/**
 * Spends SWAL credits from the user balance.
 * Returns success status and remaining credit balance.
 */
export async function spendCredits(
  amount: number,
  reason: string = 'Cloud AI request'
): Promise<{ success: boolean; credits: number }> {
  if (amount <= 0) {
    const current = await getCredits();
    return { success: true, credits: current };
  }

  const data = await loadCreditsData();
  if (data.credits < amount) {
    return { success: false, credits: data.credits };
  }

  data.credits -= amount;

  const transaction: CreditTransaction = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `tx_${Date.now()}_${Math.random()}`,
    amount: -amount,
    type: 'spend',
    reason,
    timestamp: Date.now(),
  };

  data.history.unshift(transaction);
  if (data.history.length > 100) {
    data.history = data.history.slice(0, 100);
  }

  await saveCreditsData(data);
  return { success: true, credits: data.credits };
}

/**
 * Checks and claims daily reward (+10 credits/day).
 */
export async function checkDailyReward(): Promise<{ claimed: boolean; credits: number; amountEarned: number }> {
  const data = await loadCreditsData();
  const now = Date.now();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  // Check if at least 24 hours (or new calendar day) passed
  const isSameDay = data.lastDailyClaim > 0 && (now - data.lastDailyClaim < ONE_DAY_MS);

  if (isSameDay) {
    return { claimed: false, credits: data.credits, amountEarned: 0 };
  }

  const rewardAmount = 10;
  data.credits += rewardAmount;
  data.lastDailyClaim = now;

  const transaction: CreditTransaction = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `tx_${Date.now()}_${Math.random()}`,
    amount: rewardAmount,
    type: 'daily_reward',
    reason: 'Daily use reward',
    timestamp: now,
  };

  data.history.unshift(transaction);
  await saveCreditsData(data);

  return { claimed: true, credits: data.credits, amountEarned: rewardAmount };
}

/**
 * Earn credits for answering a question (+1 credit).
 */
export async function earnForAnsweringQuestion(questionId?: string): Promise<number> {
  const reason = questionId ? `Answered question: ${questionId}` : 'Answered question';
  return addCredits(1, reason, 'answer_question');
}

/**
 * Earn credits for validating content (+5 credits).
 */
export async function earnForValidatingContent(contentId?: string): Promise<number> {
  const reason = contentId ? `Validated content: ${contentId}` : 'Validated content';
  return addCredits(5, reason, 'validate_content');
}

/**
 * Returns full credit history.
 */
export async function getCreditHistory(): Promise<CreditTransaction[]> {
  const data = await loadCreditsData();
  return data.history;
}
