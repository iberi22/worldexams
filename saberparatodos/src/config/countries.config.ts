import {
  allCountries as sharedCountries,
  getCountryConfig,
  type CountryCode as SharedCountryCode,
} from '../../../config/countries.config';

export type CountryCode = Extract<SharedCountryCode, 'CO' | 'MX' | 'AR' | 'CL' | 'PE' | 'EC' | 'BR' | 'PA' | 'CR' | 'GT' | 'DO' | 'SV' | 'HN' | 'NI'>;

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  bundleCount: number;
  hasContent: boolean;
}

const RUNTIME_COUNTRY_CODES: CountryCode[] = ['CO', 'MX', 'AR', 'CL', 'PE', 'EC', 'BR', 'PA', 'CR', 'GT', 'DO', 'SV', 'HN', 'NI'];

const COUNTRY_CONTENT_META: Record<CountryCode, Pick<Country, 'bundleCount' | 'hasContent'>> = {
  CO: { bundleCount: 589, hasContent: true },
  MX: { bundleCount: 13, hasContent: true },
  AR: { bundleCount: 2, hasContent: true },
  CL: { bundleCount: 2, hasContent: true },
  PE: { bundleCount: 2, hasContent: true },
  EC: { bundleCount: 0, hasContent: false },
  BR: { bundleCount: 15, hasContent: true },
  PA: { bundleCount: 0, hasContent: false },
  CR: { bundleCount: 0, hasContent: false },
  GT: { bundleCount: 0, hasContent: false },
  DO: { bundleCount: 0, hasContent: false },
  SV: { bundleCount: 0, hasContent: false },
  HN: { bundleCount: 0, hasContent: false },
  NI: { bundleCount: 0, hasContent: false },
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
