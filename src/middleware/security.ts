/**
 * Security Headers Middleware
 * Apply security best practices to all HTTP responses
 */

export const securityHeaders = {
  // Prevent XSS attacks
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://*.googleapis.com; frame-ancestors 'none'",

  // Prevent clickjacking
  'X-Frame-Options': 'DENY',

  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',

  // Referrer policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // HSTS (uncomment in production with HTTPS)
  // 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // Permissions policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',

  // Additional security
  'X-XSS-Protection': '1; mode=block',
  'X-DNS-Prefetch-Control': 'off',
};

/**
 * Apply security headers to response
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
 * Create a response with security headers
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
 * Create an error response with security headers
 */
export function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message }, status);
}
