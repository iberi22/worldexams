import {
  allCountries as sharedCountries,
  getCountryConfig,
  type CountryCode as SharedCountryCode,
} from '../../../config/countries.config';

export type CountryCode = Extract<SharedCountryCode, 'CO' | 'MX' | 'AR' | 'CL' | 'PE' | 'EC' | 'BR' | 'PA' | 'CR' | 'GT' | 'DO' | 'SV' | 'HN' | 'NI' | 'ES' | 'PR' | 'GQ' | 'UY' | 'PY' | 'BO'>;

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  bundleCount: number;
  hasContent: boolean;
}

const RUNTIME_COUNTRY_CODES: CountryCode[] = ['CO', 'MX', 'AR', 'CL', 'PE', 'EC', 'BR', 'PA', 'CR', 'GT', 'DO', 'SV', 'HN', 'NI', 'ES', 'PR', 'GQ', 'UY', 'PY', 'BO'];

const COUNTRY_CONTENT_META: Record<CountryCode, Pick<Country, 'bundleCount' | 'hasContent'>> = {
  CO: { bundleCount: 589, hasContent: true },
  MX: { bundleCount: 0, hasContent: false },
  AR: { bundleCount: 0, hasContent: false },
  CL: { bundleCount: 13, hasContent: true },
  PE: { bundleCount: 13, hasContent: true },
  EC: { bundleCount: 13, hasContent: true },
  BR: { bundleCount: 0, hasContent: false },
  PA: { bundleCount: 3, hasContent: true },
  CR: { bundleCount: 3, hasContent: true },
  GT: { bundleCount: 3, hasContent: true },
  DO: { bundleCount: 3, hasContent: true },
  SV: { bundleCount: 3, hasContent: true },
  HN: { bundleCount: 3, hasContent: true },
  NI: { bundleCount: 3, hasContent: true },
  ES: { bundleCount: 3, hasContent: true },
  PR: { bundleCount: 3, hasContent: true },
  GQ: { bundleCount: 3, hasContent: true },
  UY: { bundleCount: 4, hasContent: true },
  PY: { bundleCount: 4, hasContent: true },
  BO: { bundleCount: 3, hasContent: true },
};

export const allCountries: Country[] = RUNTIME_COUNTRY_CODES.map((code) => {
  const config = getCountryConfig(code);

  if (!config) {
    throw new Error(`Missing shared country config for runtime country code: ${code}`);
  }

  return {
    code,
    name: config.name,
    flag: config.flag,
    ...COUNTRY_CONTENT_META[code],
  };
});

export const countriesWithContent = allCountries.filter((country) => country.hasContent);

export const ALL_CONFIGURED_CODES: CountryCode[] = [...RUNTIME_COUNTRY_CODES];

function normalizeSiteUrl(value: string): string {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/+$/, '');
}

export function getConfiguredProductCountryCode(): CountryCode | undefined {
  const envCode = import.meta.env.PUBLIC_COUNTRY?.toUpperCase() as CountryCode | undefined;
  if (envCode && ALL_CONFIGURED_CODES.includes(envCode)) {
    return envCode;
  }

  const normalizedSiteUrl = normalizeSiteUrl(import.meta.env.PUBLIC_SITE_URL || '');
  if (!normalizedSiteUrl) return undefined;

  const matchedCountry = sharedCountries.find((country) => {
    if (!RUNTIME_COUNTRY_CODES.includes(country.code as CountryCode)) return false;
    const candidates = [country.product.siteUrl, country.domain].filter(Boolean) as string[];
    return candidates.some((candidate) => normalizeSiteUrl(candidate) === normalizedSiteUrl);
  });

  return matchedCountry?.code as CountryCode | undefined;
}

export const DEFAULT_COUNTRY: CountryCode | undefined = getConfiguredProductCountryCode();

export const COUNTRY_NAMES: Record<CountryCode, string> = allCountries.reduce<Record<CountryCode, string>>(
  (acc, country) => {
    acc[country.code] = country.name;
    return acc;
  },
  {} as Record<CountryCode, string>
);

export const COUNTRY_FLAGS: Record<CountryCode, string> = allCountries.reduce<Record<CountryCode, string>>(
  (acc, country) => {
    acc[country.code] = country.flag;
    return acc;
  },
  {} as Record<CountryCode, string>
);

export const supportedRuntimeCountryConfigs = sharedCountries.filter(
  (country): country is (typeof sharedCountries)[number] & { code: CountryCode } =>
    RUNTIME_COUNTRY_CODES.includes(country.code as CountryCode)
);
