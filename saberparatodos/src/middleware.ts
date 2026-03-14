import { defineMiddleware } from 'astro:middleware';

const defaultContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tzmrgvtptdtsjcugwqyq.supabase.co https://giscus.app https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com font:",
  "connect-src 'self' ws://localhost:* http://localhost:* https://tzmrgvtptdtsjcugwqyq.supabase.co wss://tzmrgvtptdtsjcugwqyq.supabase.co https://api.saberparatodos.space https://giscus.app https://fonts.googleapis.com https://fonts.gstatic.com https://peerjs.com https://*.peerjs.com wss://peerjs.com wss://*.peerjs.com https://0.peerjs.com wss://0.peerjs.com https://static.cloudflareinsights.com",
  "frame-src 'self' https://www.google.com https://giscus.app",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests'
].join('; ');

const developersContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://unpkg.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://unpkg.com https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com font:",
  "connect-src 'self' https://api.saberparatodos.space https://static.cloudflareinsights.com",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests'
].join('; ');

const securityHeaders: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
};

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const headers = new Headers(response.headers);
  const pathname = new URL(context.request.url).pathname;
  const contentSecurityPolicy = pathname.startsWith('/developers')
    ? developersContentSecurityPolicy
    : defaultContentSecurityPolicy;

  for (const [key, value] of Object.entries(securityHeaders)) {
    headers.set(key, value);
  }
  headers.set('Content-Security-Policy', contentSecurityPolicy);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
});
