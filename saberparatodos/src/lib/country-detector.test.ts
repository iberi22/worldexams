import { describe, expect, it } from 'vitest';
import { getCountryConfig } from '../../../config/countries.config';
import { supportedCountries } from '../config';
import { supportedRuntimeCountryConfigs } from '../config/countries.config';
import { getSupportedCountriesForUI } from './country-detector';

// The shared config also holds English-market countries (US/GB/AU) that this portal does not serve.
const ENGLISH_MARKET_CODES = ['US', 'GB', 'AU'] as const;

describe('portal country lists', () => {
  it('shared config still defines the English-market countries', () => {
    for (const code of ENGLISH_MARKET_CODES) {
      expect(getCountryConfig(code)?.locale.startsWith('en-')).toBe(true);
    }
  });

  it('UI lists only expose the runtime countries', () => {
    const runtimeCodes = supportedRuntimeCountryConfigs.map((c) => c.code);

    expect(supportedCountries.map((c) => c.code)).toEqual(runtimeCodes);
    expect(getSupportedCountriesForUI().map((c) => c.code)).toEqual(runtimeCodes);
    for (const code of ENGLISH_MARKET_CODES) {
      expect(runtimeCodes).not.toContain(code);
    }
  });
});
