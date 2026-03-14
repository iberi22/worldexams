/**
 * PWA Detection Utility
 * Detects if the app is installed as a Progressive Web App
 */

export interface PWAStatus {
  isPWA: boolean;
  displayMode: 'browser' | 'standalone' | 'minimal-ui' | 'fullscreen';
  isInstallable: boolean;
}

/**
 * Check if app is running as installed PWA
 */
export function isPWAInstalled(): boolean {
  // Guard for SSR/SSG
  if (typeof window === 'undefined') return false;

  // Method 1: Check display mode (most reliable)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }

  // Method 2: Check iOS standalone mode
  if ((window.navigator as any).standalone === true) {
    return true;
  }

  // Method 3: Check if launched from home screen (Android)
  if (document.referrer.includes('android-app://')) {
    return true;
  }

  return false;
}

/**
 * Get current display mode
 */
export function getDisplayMode(): PWAStatus['displayMode'] {
  if (typeof window === 'undefined') return 'browser';

  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return 'fullscreen';
  }
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'standalone';
  }
  if (window.matchMedia('(display-mode: minimal-ui)').matches) {
    return 'minimal-ui';
  }
  return 'browser';
}

/**
 * Check if PWA is installable (beforeinstallprompt event available)
 */
export function isPWAInstallable(): boolean {
  if (typeof window === 'undefined') return false;
  return 'BeforeInstallPromptEvent' in window;
}

/**
 * Get complete PWA status
 */
export function getPWAStatus(): PWAStatus {
  return {
    isPWA: isPWAInstalled(),
    displayMode: getDisplayMode(),
    isInstallable: isPWAInstallable()
  };
}

/**
 * Calculate recommended cache size based on user context
 * @param isAuthenticated - User is logged in
 * @param isPWA - App is installed as PWA
 * @returns Number of questions to cache
 */
export function getRecommendedCacheSize(
  isAuthenticated: boolean,
  isPWA: boolean
): number {
  // 🔒 Guest users (no auth): 100 questions (anti-scraping)
  if (!isAuthenticated) {
    return 100;
  }

  // 🔓 Authenticated but browser: 200 questions (2-3 full exams)
  if (isAuthenticated && !isPWA) {
    return 200;
  }

  // 📱 PWA + Authenticated: 420 questions (7 days of exams)
  // 7 days × 50 questions/exam + 20% buffer = 420
  if (isAuthenticated && isPWA) {
    return 420;
  }

  return 100; // Fallback
}

/**
 * Get cache expiry time based on context
 * @param isPWA - App is installed as PWA
 * @returns Expiry time in hours
 */
export function getCacheExpiryHours(isPWA: boolean): number {
  // PWA: Longer cache (7 days)
  if (isPWA) {
    return 24 * 7; // 168 hours
  }

  // Browser: Shorter cache (1 day)
  return 24;
}

/**
 * Listen for PWA install event
 */
export function onPWAInstall(callback: () => void): void {
  window.addEventListener('appinstalled', callback);
}

/**
 * Show install prompt (if available)
 */
export async function promptPWAInstall(
  deferredPrompt: any
): Promise<boolean> {
  if (!deferredPrompt) {
    console.warn('No install prompt available');
    return false;
  }

  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User response to install prompt: ${outcome}`);
    return outcome === 'accepted';
  } catch (error) {
    console.error('Error showing install prompt:', error);
    return false;
  }
}
