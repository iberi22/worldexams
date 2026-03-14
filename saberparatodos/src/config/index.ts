/**
 * Global Configuration Loader
 * Selects the appropriate tenant config based on environment variable PUBLIC_COUNTRY
 */

import { coConfig } from './tenants/co';
import { mxConfig } from './tenants/mx';
import type { CountryConfig } from './types';

// Default to Colombia if not specified
const DEFAULT_COUNTRY_CODE = 'CO';

const configs: Record<string, CountryConfig> = {
  CO: coConfig,
  MX: mxConfig,
};

const getCountryCode = (): string => {
  // In Vite/Astro, import.meta.env.PUBLIC_* variables are replaced at build time
  // @ts-ignore
  return import.meta.env.PUBLIC_COUNTRY || DEFAULT_COUNTRY_CODE;
};

const currentCode = getCountryCode().toUpperCase();
export const countryConfig = configs[currentCode] || configs[DEFAULT_COUNTRY_CODE];

console.log(`[Config] Loaded configuration for: ${countryConfig.name} (${countryConfig.code})`);

// Re-export type for consumers
export type { CountryConfig };
