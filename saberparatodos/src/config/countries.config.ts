export type CountryCode = 'CO' | 'MX' | 'AR' | 'CL' | 'PE' | 'BR' | 'US' | 'EG' | 'FR' | 'IN' | 'ID' | 'JP' | 'KR' | 'NG' | 'RU' | 'OTHER';

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  bundleCount: number;
  hasContent: boolean; // true if bundles exist for this country
}

export const allCountries: Country[] = [
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', bundleCount: 589, hasContent: true },
  { code: 'MX', name: 'México', flag: '🇲🇽', bundleCount: 13, hasContent: true },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', bundleCount: 2, hasContent: true },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', bundleCount: 2, hasContent: true },
  { code: 'PE', name: 'Perú', flag: '🇵🇪', bundleCount: 2, hasContent: true },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷', bundleCount: 15, hasContent: true },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸', bundleCount: 0, hasContent: false },
  { code: 'EG', name: 'Egipto', flag: '🇪🇬', bundleCount: 0, hasContent: false },
  { code: 'FR', name: 'Francia', flag: '🇫🇷', bundleCount: 0, hasContent: false },
  { code: 'IN', name: 'India', flag: '🇮🇳', bundleCount: 0, hasContent: false },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', bundleCount: 0, hasContent: false },
  { code: 'JP', name: 'Japón', flag: '🇯🇵', bundleCount: 0, hasContent: false },
  { code: 'KR', name: 'Corea', flag: '🇰🇷', bundleCount: 0, hasContent: false },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', bundleCount: 0, hasContent: false },
  { code: 'RU', name: 'Rusia', flag: '🇷🇺', bundleCount: 0, hasContent: false },
  { code: 'OTHER', name: 'Otro país', flag: '🌍', bundleCount: 0, hasContent: false },
];

// Countries with available content (bundles > 0)
export const countriesWithContent = allCountries.filter(c => c.hasContent);

// All configured country codes for detection
export const ALL_CONFIGURED_CODES: CountryCode[] = allCountries
  .filter(c => c.code !== 'OTHER')
  .map(c => c.code);

// Default country when detection fails or user has unsupported country
export const DEFAULT_COUNTRY: CountryCode = 'CO';

// Country display names
export const COUNTRY_NAMES: Record<CountryCode, string> = {
  CO: 'Colombia',
  MX: 'México',
  AR: 'Argentina',
  CL: 'Chile',
  PE: 'Perú',
  BR: 'Brasil',
  US: 'Estados Unidos',
  EG: 'Egipto',
  FR: 'Francia',
  IN: 'India',
  ID: 'Indonesia',
  JP: 'Japón',
  KR: 'Corea',
  NG: 'Nigeria',
  RU: 'Rusia',
  OTHER: 'Otro país',
};

// Country flags
export const COUNTRY_FLAGS: Record<CountryCode, string> = {
  CO: '🇨🇴',
  MX: '🇲🇽',
  AR: '🇦🇷',
  CL: '🇨🇱',
  PE: '🇵🇪',
  BR: '🇧🇷',
  US: '🇺🇸',
  EG: '🇪🇬',
  FR: '🇫🇷',
  IN: '🇮🇳',
  ID: '🇮🇩',
  JP: '🇯🇵',
  KR: '🇰🇷',
  NG: '🇳🇬',
  RU: '🇷🇺',
  OTHER: '🌍',
};