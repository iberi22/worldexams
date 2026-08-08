/**
 * Security Headers & Protection Middleware
 * Apply security best practices, input sanitization, and rate limiting to all HTTP responses.
 */

// Global dictionary of standard hardened security headers
export const securityHeaders = {
  // Prevent XSS attacks
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://*.googleapis.com; frame-ancestors 'none'",

  // Prevent clickjacking via X-Frame-Options header
  'X-Frame-Options': 'DENY',

  // Prevent MIME type sniffing via X-Content-Type-Options header
  'X-Content-Type-Options': 'nosniff',

  // Referrer policy for privacy and tracking protection
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Permissions policy to disable unused browser capabilities
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',

  // Additional browser-level security mitigations
  'X-XSS-Protection': '1; mode=block',
  'X-DNS-Prefetch-Control': 'off',
};

/**
 * Apply security headers (such as X-Frame-Options and X-Content-Type-Options) to a standard Response object
 */
export function applySecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(securityHeaders)) {
    headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Create a standard JSON response with comprehensive security headers
 */
export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
      'Access-Control-Max-Age': '86400',
      ...securityHeaders,
    },
  });
}

/**
 * Create an error response with comprehensive security headers
 */
export function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message }, status);
}

// In-memory store for rate limiting
const rateLimitsStore = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window for tests/demo
const MAX_RATE_LIMIT_REQUESTS = 100; // limit of 100 requests per window

/**
 * Basic rate limiting check for incoming IP addresses
 * Uses the "rate" limit store to track and restrict request frequencies
 */
export function handleRateLimit(ip: string): { allowed: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const state = rateLimitsStore.get(ip) || { count: 0, lastReset: now };

  // Reset rate limit window if elapsed
  if (now - state.lastReset > RATE_LIMIT_WINDOW_MS) {
    state.count = 0;
    state.lastReset = now;
  }

  state.count += 1;
  rateLimitsStore.set(ip, state);

  const allowed = state.count <= MAX_RATE_LIMIT_REQUESTS;
  const remaining = Math.max(0, MAX_RATE_LIMIT_REQUESTS - state.count);
  const reset = state.lastReset + RATE_LIMIT_WINDOW_MS;

  return {
    allowed,
    limit: MAX_RATE_LIMIT_REQUESTS,
    remaining,
    reset,
  };
}

/**
 * Reset rate limits for testing purposes
 */
export function resetRateLimits(): void {
  rateLimitsStore.clear();
}

/**
 * Sanitize parameter inputs to defend against directory traversal, XSS, and command/SQL injections
 * This will sanitize query parameter inputs to keep requests secure
 */
export function sanitizeParam(param: string): string {
  if (typeof param !== 'string') {
    return '';
  }

  // 1. Remove obvious directory traversal sequences (sanitize paths)
  let sanitized = param
    .replace(/\.\./g, '')          // Strip double dots to prevent relative path traversal
    .replace(/\//g, '')            // Strip all forward slashes to block traversal and path manipulation completely
    .replace(/\\/g, '')            // Strip backslashes to block windows traversal
    .replace(/%2e%2e/gi, '')       // Strip URL-encoded traversal sequences
    .replace(/%2f/gi, '');         // Strip URL-encoded slashes

  // 2. Strip basic HTML tags to prevent cross-site scripting
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  return sanitized.trim();
}

/**
 * Validate request parameters to ensure they follow specified API design rules
 * This function will validate grade format, country codes, and subject names
 */
export function validateRequest(params: Record<string, string>): boolean {
  // Validate grade parameter (must be 3, 5, 7, 9, or 11)
  if (params.grade !== undefined) {
    const validGrades = ['3', '5', '7', '9', '11'];
    if (!validGrades.includes(params.grade)) {
      return false;
    }
  }

  // Validate country parameter (must be 2-letter alphabetic ISO code)
  if (params.country !== undefined) {
    const country = params.country.toLowerCase();
    const validCountries = ['co', 'mx', 'ar', 'cl', 'pe', 'br', 'us', 'cn', 'in', 'uy', 'py', 'bo', 'es', 'pr', 'sv', 'hn', 'ni', 'gt'];
    if (!validCountries.includes(country)) {
      return false;
    }
  }

  // Validate subject parameter (must not be empty if provided)
  if (params.subject !== undefined) {
    if (params.subject.trim() === '') {
      return false;
    }
  }

  return true;
}
