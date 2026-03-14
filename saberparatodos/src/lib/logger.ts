/**
 * Production Logger Silencer
 * Disables all console output in production to keep the console clean.
 * Import this file early in the app lifecycle.
 */

const IS_PRODUCTION = import.meta.env.PROD;
const IS_DEV = import.meta.env.DEV;

// Store original console methods for debugging escape hatch
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  info: console.info,
  debug: console.debug,
};

/**
 * Initialize production logger
 * Call this once at app startup
 */
export function initProductionLogger(): void {
  if (IS_PRODUCTION) {
    // Silence all console methods in production
    console.log = () => {};
    console.info = () => {};
    console.debug = () => {};

    // Keep warn and error for critical issues (optional - uncomment to silence)
    // console.warn = () => {};
    // console.error = () => {};

    // Log once that we're in production mode (will show briefly before silencing)
    originalConsole.log('🔇 Production mode: Console logs disabled');
  }
}

/**
 * Force log something even in production (escape hatch)
 * Only use for critical debugging
 */
export function forceLog(...args: any[]): void {
  originalConsole.log(...args);
}

/**
 * Force warn something even in production
 */
export function forceWarn(...args: any[]): void {
  originalConsole.warn(...args);
}

/**
 * Force error something even in production
 */
export function forceError(...args: any[]): void {
  originalConsole.error(...args);
}

/**
 * Check if we're in development mode
 */
export function isDev(): boolean {
  return IS_DEV;
}

/**
 * Check if we're in production mode
 */
export function isProd(): boolean {
  return IS_PRODUCTION;
}

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  initProductionLogger();
}
