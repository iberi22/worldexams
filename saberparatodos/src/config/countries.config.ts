import {
  allCountries as sharedCountries,
  getCountryConfig,
  type CountryCode as SharedCountryCode,
} from '../../../config/countries.config';

export type CountryCode = Extract<SharedCountryCode, 'CO' | 'MX' | 'AR' | 'CL' | 'PE' | 'EC' | 'BR'>;

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  bundleCount: number;
  hasContent: boolean;
}

const RUNTIME_COUNTRY_CODES: CountryCode[] = ['CO', 'MX', 'AR', 'CL', 'PE', 'EC', 'BR'];

const COUNTRY_CONTENT_META: Record<CountryCode, Pick<Country, 'bundleCount' | 'hasContent'>> = {
  CO: { bundleCount: 589, hasContent: true },
  MX: { bundleCount: 13, hasContent: true },
  AR: { bundleCount: 2, hasContent: true },
  CL: { bundleCount: 2, hasContent: true },
  PE: { bundleCount: 2, hasContent: true },
  EC: { bundleCount: 0, hasContent: false },
  BR: { bundleCount: 15, hasContent: true },
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

export const DEFAULT_COUNTRY: CountryCode = 'CO';

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
