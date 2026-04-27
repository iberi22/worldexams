import { defineMiddleware } from 'astro:middleware';
import {
  type CountryCode,
  allCountries,
  countriesWithContent,
  ALL_CONFIGURED_CODES,
  DEFAULT_COUNTRY,
  COUNTRY_NAMES,
  COUNTRY_FLAGS,
} from './config/countries.config';

/**
 * Fallback country detection via ipapi.co for local dev (when CF-IPCountry is absent).
 */
async function detectCountryFromApi(clientIP: string): Promise<CountryCode | null> {
  // Skip for localhost
  if (clientIP === '127.0.0.1' || clientIP === '::1') {
    return null;
  }

  try {
    const res = await fetch(`https://ipapi.co/${clientIP}/country/`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const country = await res.text();
      const code = country.trim().toUpperCase() as CountryCode;
      if (ALL_CONFIGURED_CODES.includes(code)) {
        return code;
      }
    }
  } catch {
    // fail silently
  }
  return null;
}

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

// Country codes that have content available
const CONTENT_COUNTRIES: CountryCode[] = countriesWithContent.map(c => c.code);

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // Skip geo logic for API routes, static assets
  const isInternalPath =
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_astro/') ||
    url.pathname.startsWith('/dist/') ||
    url.pathname.startsWith('/node_modules/') ||
    url.pathname.startsWith('/sw.js') ||
    url.pathname === '/favicon.png' ||
    url.pathname === '/robots.txt' ||
    url.pathname === '/manifest.json';

  // === Country Detection ===
  let activeCountryCode: CountryCode = DEFAULT_COUNTRY;
  let countryDetected = false; // track if this was from IP detection

  // 1. Check URL param ?country=XX (for explicit selection)
  const urlCountry = url.searchParams.get('country') as CountryCode | null;
  if (urlCountry && ALL_CONFIGURED_CODES.includes(urlCountry.toUpperCase() as CountryCode)) {
    activeCountryCode = urlCountry.toUpperCase() as CountryCode;
  }
  // 2. Check cookie
  else {
    const cookieCountry = context.cookies.get('spt_country')?.value as CountryCode | undefined;
    if (cookieCountry && ALL_CONFIGURED_CODES.includes(cookieCountry.toUpperCase() as CountryCode)) {
      activeCountryCode = cookieCountry.toUpperCase() as CountryCode;
    }
    // 3. Detect from IP (Cloudflare or API fallback)
    else {
      const cfCountry = context.request.headers.get('cf-ipcountry') as CountryCode | undefined;
      if (cfCountry && ALL_CONFIGURED_CODES.includes(cfCountry.toUpperCase() as CountryCode)) {
        activeCountryCode = cfCountry.toUpperCase() as CountryCode;
        countryDetected = true;
      } else if (!isInternalPath) {
        const clientIP = context.request.headers.get('cf-connecting-ip') ||
          context.request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
          '127.0.0.1';
        const apiCountry = await detectCountryFromApi(clientIP);
        if (apiCountry) {
          activeCountryCode = apiCountry;
          countryDetected = true;
        }
      }
    }
  }

  // Check if this country has content
  const hasContent = CONTENT_COUNTRIES.includes(activeCountryCode);

  // Set country info in locals for use in pages/components
  // This uses a simple format that Layout.astro can use for display decisions
  context.locals.countryCode = activeCountryCode;
  context.locals.countryDetected = countryDetected;
  context.locals.countryHasContent = hasContent;
  context.locals.countryName = COUNTRY_NAMES[activeCountryCode] || activeCountryCode;
  context.locals.countryFlag = COUNTRY_FLAGS[activeCountryCode] || '🌍';

  // Continue to the page
  const response = await next();

  const headers = new Headers(response.headers);
  const pathname = url.pathname;
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
