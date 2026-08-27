import { defineMiddleware } from 'astro:middleware';
import {
  type CountryCode,
  countriesWithContent,
  ALL_CONFIGURED_CODES,
  DEFAULT_COUNTRY,
  getConfiguredProductCountryCode,
  COUNTRY_NAMES,
  COUNTRY_FLAGS,
} from './config/countries.config';
import { getCountryConfig } from '../../config/countries.config';

/**
 * Fallback country detection via ip-api.com for local dev (when CF-IPCountry is absent).
 */
async function detectCountryFromApi(clientIP: string): Promise<CountryCode | null> {
  if (clientIP === '127.0.0.1' || clientIP === '::1') {
    return null;
  }

  try {
    const res = await fetch(`https://ip-api.com/${clientIP}/country/`, {
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
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://giscus.app https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com font:",
  "connect-src 'self' ws://localhost:* http://localhost:* https://*.supabase.co wss://*.supabase.co https://api.saberparatodos.space https://giscus.app https://fonts.googleapis.com https://fonts.gstatic.com https://peerjs.com https://*.peerjs.com wss://peerjs.com wss://*.peerjs.com https://0.peerjs.com wss://0.peerjs.com https://static.cloudflareinsights.com",
  "frame-src 'self' https://www.google.com https://giscus.app",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
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
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};

const CONTENT_COUNTRIES: CountryCode[] = countriesWithContent.map((country) => country.code);

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  const isInternalPath =
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_astro/') ||
    url.pathname.startsWith('/dist/') ||
    url.pathname.startsWith('/node_modules/') ||
    url.pathname.startsWith('/sw.js') ||
    url.pathname === '/favicon.png' ||
    url.pathname === '/robots.txt' ||
    url.pathname === '/manifest.json';

  // Do not force site default (CO) before geo/language resolution — avoids serving Colombia to FR/XX visitors.
  let activeCountryCode: CountryCode | undefined;
  let countryDetected = false;

  const urlCountry = url.searchParams.get('country') as CountryCode | null;
  if (urlCountry && ALL_CONFIGURED_CODES.includes(urlCountry.toUpperCase() as CountryCode)) {
    activeCountryCode = urlCountry.toUpperCase() as CountryCode;
  } else {
    const cookieCountry = context.cookies.get('spt_country')?.value as CountryCode | undefined;
    if (cookieCountry && ALL_CONFIGURED_CODES.includes(cookieCountry.toUpperCase() as CountryCode)) {
      activeCountryCode = cookieCountry.toUpperCase() as CountryCode;
    } else {
      const cfCountry = context.request.headers.get('cf-ipcountry') as CountryCode | undefined;
      if (cfCountry && ALL_CONFIGURED_CODES.includes(cfCountry.toUpperCase() as CountryCode)) {
        activeCountryCode = cfCountry.toUpperCase() as CountryCode;
        countryDetected = true;
      } else if (!isInternalPath) {
        const clientIP =
          context.request.headers.get('cf-connecting-ip') ||
          '127.0.0.1';
        const apiCountry = await detectCountryFromApi(clientIP);
        if (apiCountry) {
          activeCountryCode = apiCountry;
          countryDetected = true;
        }
      }
    }
  }

  // System-language fallback when IP/country is unknown or unsupported (not site DEFAULT).
  if (!activeCountryCode) {
    const acceptLanguage = (context.request.headers.get('accept-language') || '').toLowerCase();
    if (/\bpt\b/.test(acceptLanguage) && ALL_CONFIGURED_CODES.includes('BR')) {
      activeCountryCode = 'BR';
    } else if (/\bes\b/.test(acceptLanguage) && ALL_CONFIGURED_CODES.includes('ES')) {
      // Generic Spanish UI carrier — CountrySwitcher selects a real content country.
      activeCountryCode = 'ES';
    } else {
      activeCountryCode = getConfiguredProductCountryCode() || DEFAULT_COUNTRY || 'CO';
    }
  }

  const hasContent = activeCountryCode ? CONTENT_COUNTRIES.includes(activeCountryCode) : false;
  const activeCountryConfig = activeCountryCode ? getCountryConfig(activeCountryCode) : undefined;

  if (activeCountryConfig) {
    context.locals.country = activeCountryConfig;
  }
  context.locals.countryCode = activeCountryCode;
  context.locals.countryDetected = countryDetected;
  context.locals.countryHasContent = hasContent;
  context.locals.countryName = activeCountryConfig?.name || (activeCountryCode ? COUNTRY_NAMES[activeCountryCode] || activeCountryCode : 'World Exams');
  context.locals.countryFlag = activeCountryConfig?.flag || (activeCountryCode ? COUNTRY_FLAGS[activeCountryCode] : undefined) || '🌍';

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
    headers,
  });
});
