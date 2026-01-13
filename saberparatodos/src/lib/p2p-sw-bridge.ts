/**
 * P2P Service Worker Bridge
 *
 * Handles communication between P2P service and Service Worker
 * for connection persistence and background sync.
 *
 * @module p2p-sw-bridge
 */

export interface P2PState {
  partyCode: string;
  peerId: string;
  isHost: boolean;
  hostPeerId?: string;
  playerName?: string;
  timestamp: number;
}

const SW_P2P_CHANNEL = 'p2p-sync';
const SYNC_TAG = 'p2p-reconnect';

/**
 * Check if Service Worker and Background Sync are supported
 */
export function isBackgroundSyncSupported(): boolean {
  return 'serviceWorker' in navigator && 'SyncManager' in window;
}

/**
 * Get the active Service Worker registration
 */
async function getSwRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) return null;

  try {
    return await navigator.serviceWorker.ready;
  } catch (e) {
    console.warn('[P2P-SW] Failed to get SW registration:', e);
    return null;
  }
}

/**
 * Save P2P connection state to IndexedDB via Service Worker
 * Called before disconnection or page unload
 */
export async function saveP2PState(state: P2PState): Promise<boolean> {
  const registration = await getSwRegistration();
  if (!registration?.active) {
    // Fallback: Save to localStorage
    localStorage.setItem('p2p-state', JSON.stringify(state));
    console.log('[P2P-SW] State saved to localStorage (no SW)');
    return true;
  }

  // Send to Service Worker
  registration.active.postMessage({
    type: 'P2P_SAVE_STATE',
    payload: state
  });

  // Also save to localStorage as backup
  localStorage.setItem('p2p-state', JSON.stringify(state));
  console.log('[P2P-SW] State saved to SW + localStorage');
  return true;
}

/**
 * Load P2P state from storage
 */
export async function loadP2PState(): Promise<P2PState | null> {
  // Try localStorage first (faster)
  const stored = localStorage.getItem('p2p-state');
  if (stored) {
    try {
      const state = JSON.parse(stored) as P2PState;
      // Check if state is recent (within 30 minutes)
      const age = Date.now() - state.timestamp;
      if (age < 30 * 60 * 1000) {
        console.log('[P2P-SW] Loaded state from localStorage');
        return state;
      } else {
        console.log('[P2P-SW] State too old, clearing');
        clearP2PState();
        return null;
      }
    } catch (e) {
      console.warn('[P2P-SW] Failed to parse stored state:', e);
      return null;
    }
  }
  return null;
}

/**
 * Clear saved P2P state
 */
export function clearP2PState(): void {
  localStorage.removeItem('p2p-state');

  // Notify SW to clear as well
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'P2P_CLEAR_STATE'
    });
  }
  console.log('[P2P-SW] State cleared');
}

/**
 * Register background sync for P2P reconnection
 * This will trigger a sync event when network is available
 */
export async function registerReconnectSync(): Promise<boolean> {
  if (!isBackgroundSyncSupported()) {
    console.warn('[P2P-SW] Background Sync not supported');
    return false;
  }

  try {
    const registration = await getSwRegistration();
    if (!registration) return false;

    // @ts-ignore - SyncManager types may not be available
    await registration.sync.register(SYNC_TAG);
    console.log('[P2P-SW] Background sync registered:', SYNC_TAG);
    return true;
  } catch (e) {
    console.warn('[P2P-SW] Failed to register sync:', e);
    return false;
  }
}

/**
 * Request reconnection to saved party
 * Used when coming back online or app foregrounded
 */
export async function requestReconnection(): Promise<P2PState | null> {
  const state = await loadP2PState();
  if (!state) {
    console.log('[P2P-SW] No saved state for reconnection');
    return null;
  }

  console.log('[P2P-SW] Requesting reconnection to party:', state.partyCode);
  return state;
}

/**
 * Listen for Service Worker messages
 */
export function onSwMessage(callback: (data: any) => void): () => void {
  if (!('serviceWorker' in navigator)) {
    return () => {};
  }

  const handler = (event: MessageEvent) => {
    if (event.data?.channel === SW_P2P_CHANNEL) {
      callback(event.data);
    }
  };

  navigator.serviceWorker.addEventListener('message', handler);
  return () => navigator.serviceWorker.removeEventListener('message', handler);
}

/**
 * Setup page lifecycle handlers for P2P state persistence
 */
export function setupLifecycleHandlers(
  getState: () => P2PState | null
): () => void {
  // Save state before page unload
  const handleBeforeUnload = () => {
    const state = getState();
    if (state) {
      // Use sync API for immediate save (localStorage)
      localStorage.setItem('p2p-state', JSON.stringify({
        ...state,
        timestamp: Date.now()
      }));
    }
  };

  // Handle visibility change (app backgrounded on mobile)
  const handleVisibilityChange = async () => {
    if (document.visibilityState === 'hidden') {
      const state = getState();
      if (state) {
        await saveP2PState({ ...state, timestamp: Date.now() });
        await registerReconnectSync();
      }
    }
  };

  // Handle online event (network restored)
  const handleOnline = async () => {
    console.log('[P2P-SW] Network restored, checking for reconnection...');
    const state = await requestReconnection();
    if (state) {
      // Dispatch custom event for P2P service to handle
      window.dispatchEvent(new CustomEvent('p2p-reconnect-request', {
        detail: state
      }));
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('online', handleOnline);

  // Return cleanup function
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('online', handleOnline);
  };
}
