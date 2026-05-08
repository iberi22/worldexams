/**
 * Country Detection Service for WorldExams
 * Client-side IP detection with localStorage caching
 * Uses the existing countries.config.ts data
 */

import {
  allCountries,
  getCountryConfig,
  type CountryConfig as SharedCountryConfig,
  type CountryCode
} from '../../../config/countries.config';
import { getExplicitProductCountryCode } from '../config';

const IP_API_BASE = 'http://ip-api.com/json';
const CACHE_KEY = 'worldexams_country';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Quick IP range detection for common LATAM ranges (no API needed)
const IP_RANGES: Array<{ range: [string, string]; country: CountryCode }> = [
  // Colombia
  { range: ['181.0.0.0', '181.255.255.255'], country: 'CO' },
  { range: ['186.0.0.0', '186.63.255.255'], country: 'CO' },
  { range: ['187.0.0.0', '187.255.255.255'], country: 'CO' },
  { range: ['190.0.0.0', '190.127.255.255'], country: 'CO' },
  { range: ['200.0.0.0', '200.63.255.255'], country: 'CO' },
  // Mexico
  { range: ['189.0.0.0', '189.255.255.255'], country: 'MX' },
  { range: ['201.0.0.0', '201.255.255.255'], country: 'MX' },
  // Chile
  { range: ['186.64.0.0', '186.127.255.255'], country: 'CL' },
  { range: ['200.64.0.0', '200.127.255.255'], country: 'CL' },
  // Peru
  { range: ['190.128.0.0', '190.255.255.255'], country: 'PE' },
  // Ecuador
  { range: ['200.128.0.0', '200.191.255.255'], country: 'EC' },
  // Brazil
  { range: ['138.0.0.0', '138.255.255.255'], country: 'BR' },
  { range: ['177.0.0.0', '177.255.255.255'], country: 'BR' },
  { range: ['179.0.0.0', '179.255.255.255'], country: 'BR' },
  { range: ['186.192.0.0', '186.255.255.255'], country: 'BR' },
];

function ipToNumber(ip: string): number {
  const parts = ip.split('.');
  return (parseInt(parts[0]) << 24) | (parseInt(parts[1]) << 16) | (parseInt(parts[2]) << 8) | parseInt(parts[3]);
}

function isIPInRange(ip: string, range: [string, string]): boolean {
  const ipNum = ipToNumber(ip);
  const start = ipToNumber(range[0]);
  const end = ipToNumber(range[1]);
  return ipNum >= start && ipNum <= end;
}

function quickDetectByIP(ip: string): CountryCode | null {
  if (!ip) return null;
  for (const { range, country } of IP_RANGES) {
    if (isIPInRange(ip, range)) {
      return country;
    }
  }
  return null;
}

interface CachedCountry {
  code: CountryCode;
  timestamp: number;
}

// Client-side country detection with caching
export async function detectCountryClient(): Promise<SharedCountryConfig> {
  const explicitDefaultCountry = getExplicitProductCountryCode();
  const fallbackCountry = explicitDefaultCountry || ('US' as CountryCode);
  
  if (typeof window === 'undefined') {
    return getCountryConfig(fallbackCountry)!;
  }

  // Check localStorage cache first
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { code, timestamp }: CachedCountry = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        const config = getCountryConfig(code as CountryCode);
        if (config) return config;
      }
    }
  } catch {
    // Invalid cache
  }

  // Check URL override for testing
  const urlParams = new URLSearchParams(window.location.search);
  const override = urlParams.get('country');
  if (override) {
    const code = override.toUpperCase() as CountryCode;
    const config = getCountryConfig(code);
    if (config) {
      cacheCountry(code);
      return config;
    }
  }

  // Get user's IP via ipify
  let userIP = '';
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();
    userIP = ip;
  } catch {
    // Continue without a synthetic country-biased IP.
  }

  // Quick IP range detection (no API call)
  const quickResult = quickDetectByIP(userIP);
  if (quickResult) {
    const config = getCountryConfig(quickResult);
    if (config) {
      cacheCountry(quickResult);
      return config;
    }
  }

  // Full API detection via ip-api.com
  try {
    const response = await fetch(`${IP_API_BASE}/${userIP}`);
    const data = await response.json();
    const countryCode = data.countryCode as CountryCode | undefined;
    const config =
      (countryCode ? getCountryConfig(countryCode) : undefined) ||
      (explicitDefaultCountry ? getCountryConfig(explicitDefaultCountry) : undefined) ||
      getCountryConfig(fallbackCountry)!;
    cacheCountry(config.code);
    return config;
  } catch {
    // Fall back to the explicitly configured product country when available.
    return getCountryConfig(fallbackCountry)!;
  }
}

function cacheCountry(code: CountryCode): void {
  if (typeof window !== 'undefined') {
    const data: CachedCountry = { code, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  }
}

// For getting the cached country without making an API call
export function getCachedCountry(): SharedCountryConfig | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { code, timestamp }: CachedCountry = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        const config = getCountryConfig(code as CountryCode);
        if (config) return config;
      }
    }
  } catch {
    // Invalid cache
  }
  return null;
}

// Get user's public IP (for debugging)
export async function getUserIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const { ip } = await response.json();
    return ip;
  } catch {
    return 'unknown';
  }
}

// Set country override (for UI buttons)
export function setCountryOverride(code: string): void {
  const countryCode = code.toUpperCase() as CountryCode;
  const config = getCountryConfig(countryCode);
  if (!config) return;
  
  cacheCountry(countryCode);
  
  if (typeof window !== 'undefined') {
    // Navigate to country-specific path
    const path = window.location.pathname;
    const countryPath = `/${countryCode.toLowerCase()}`;
    
    // If already on a country path, replace it
    if (path.match(/^\/(mx|ar|cl|pe|ec|br)\//)) {
      window.location.href = path.replace(/^\/(mx|ar|cl|pe|ec|br)/, countryCode.toLowerCase());
    } else if (path === '/') {
      window.location.href = `${countryPath}/`;
    } else {
      window.location.href = `${countryPath}${path}`;
    }
  }
}

// Get supported countries as array (for UI)
export function getSupportedCountriesForUI(): Array<{
  code: string;
  name: string;
  flag: string;
  examName: string;
  examFullName: string;
  locale: string;
}> {
  return allCountries.map(c => ({
    code: c.code,
    name: c.name,
    flag: c.flag,
    examName: c.examName,
    examFullName: c.examFullName,
    locale: c.locale,
  }));
}

// Build hreflang links for SEO
export function buildHreflangLinks(path: string): Array<{ lang: string; href: string }> {
  return allCountries.map(country => ({
    lang: country.locale,
    href: `/${country.code.toLowerCase()}${path}`
  }));
}
