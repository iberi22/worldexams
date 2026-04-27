export type CountryCode = 'CO' | 'MX' | 'AR' | 'CL' | 'PE' | 'BR' | 'US' | 'EG' | 'FR' | 'IN' | 'ID' | 'JP' | 'KR' | 'NG' | 'RU' | 'OTHER';

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  bundleCount: number;
  hasContent: boolean;
}

export const allCountries: Country[] = [
  { code: 'CO', name: 'Colombia', flag: 'CO', bundleCount: 589, hasContent: true },
  { code: 'MX', name: 'Mexico', flag: 'MX', bundleCount: 13, hasContent: true },
  { code: 'AR', name: 'Argentina', flag: 'AR', bundleCount: 2, hasContent: true },
  { code: 'CL', name: 'Chile', flag: 'CL', bundleCount: 2, hasContent: true },
  { code: 'PE', name: 'Peru', flag: 'PE', bundleCount: 2, hasContent: true },
  { code: 'BR', name: 'Brasil', flag: 'BR', bundleCount: 15, hasContent: true },
  { code: 'US', name: 'Estados Unidos', flag: 'US', bundleCount: 0, hasContent: false },
  { code: 'EG', name: 'Egipto', flag: 'EG', bundleCount: 0, hasContent: false },
  { code: 'FR', name: 'Francia', flag: 'FR', bundleCount: 0, hasContent: false },
  { code: 'IN', name: 'India', flag: 'IN', bundleCount: 0, hasContent: false },
  { code: 'ID', name: 'Indonesia', flag: 'ID', bundleCount: 0, hasContent: false },
  { code: 'JP', name: 'Japon', flag: 'JP', bundleCount: 0, hasContent: false },
  { code: 'KR', name: 'Corea', flag: 'KR', bundleCount: 0, hasContent: false },
  { code: 'NG', name: 'Nigeria', flag: 'NG', bundleCount: 0, hasContent: false },
  { code: 'RU', name: 'Rusia', flag: 'RU', bundleCount: 0, hasContent: false },
  { code: 'OTHER', name: 'Otro pais', flag: 'XX', bundleCount: 0, hasContent: false },
];

export const countriesWithContent = allCountries.filter(c => c.hasContent);

export const ALL_CONFIGURED_CODES: CountryCode[] = allCountries
  .filter(c => c.code !== 'OTHER')
  .map(c => c.code);

export const DEFAULT_COUNTRY: CountryCode = 'CO';

export const COUNTRY_NAMES: Record<CountryCode, string> = {
  CO: 'Colombia',
  MX: 'Mexico',
  AR: 'Argentina',
  CL: 'Chile',
  PE: 'Peru',
  BR: 'Brasil',
  US: 'Estados Unidos',
  EG: 'Egipto',
  FR: 'Francia',
  IN: 'India',
  ID: 'Indonesia',
  JP: 'Japon',
  KR: 'Corea',
  NG: 'Nigeria',
  RU: 'Rusia',
  OTHER: 'Otro pais',
};

export const COUNTRY_FLAGS: Record<CountryCode, string> = {
  CO: 'CO',
  MX: 'MX',
  AR: 'AR',
  CL: 'CL',
  PE: 'PE',
  BR: 'BR',
  US: 'US',
  EG: 'EG',
  FR: 'FR',
  IN: 'IN',
  ID: 'ID',
  JP: 'JP',
  KR: 'KR',
  NG: 'NG',
  RU: 'RU',
  OTHER: 'XX',
};
