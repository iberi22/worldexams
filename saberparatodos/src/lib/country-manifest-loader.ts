import {
  allCountries as sharedCountries,
  getCountryConfig,
  type CountryCode as SharedCountryCode,
  type SubjectConfig,
} from '../../../config/countries.config';

export type CountryCode = Extract<SharedCountryCode, 'CO' | 'MX' | 'AR' | 'CL' | 'PE' | 'EC' | 'BR' | 'PA' | 'CR' | 'GT' | 'DO' | 'SV' | 'HN' | 'NI' | 'ES' | 'PR' | 'GQ' | 'UY' | 'PY' | 'BO'>;

export interface CountrySubject {
  id: string;
  name: string;
  slug: string;
  icon: string;
  globalId: string;
}

export interface CountryManifest {
  code: CountryCode;
  slug: string;
  name: string;
  flag: string;
  language: string;
  examName: string;
  examEntity: string;
  subjects: CountrySubject[];
  grades: { id: number; name: string }[];
  scoring: {
    maxScore: number;
    scale: string;
  };
  hasContent: boolean;
  bundleCount: number;
  seo: {
    siteName: string;
    description: string;
  };
}

const COUNTRY_SLUG_MAP: Record<string, CountryCode> = {
  colombia: 'CO',
  co: 'CO',
  mexico: 'MX',
  mx: 'MX',
  argentina: 'AR',
  ar: 'AR',
  chile: 'CL',
  cl: 'CL',
  peru: 'PE',
  pe: 'PE',
  ecuador: 'EC',
  ec: 'EC',
  brasil: 'BR',
  br: 'BR',
  brazil: 'BR',
  panama: 'PA',
  pa: 'PA',
  costarica: 'CR',
  'costa-rica': 'CR',
  cr: 'CR',
  guatemala: 'GT',
  gt: 'GT',
  dominican_republic: 'DO',
  'dominican-republic': 'DO',
  'republica-dominicana': 'DO',
  do: 'DO',
  'el-salvador': 'SV',
  elsalvador: 'SV',
  sv: 'SV',
  honduras: 'HN',
  hn: 'HN',
  nicaragua: 'NI',
  ni: 'NI',
  spain: 'ES',
  españa: 'ES',
  es: 'ES',
  'puerto-rico': 'PR',
  pr: 'PR',
  'guinea-ecuatorial': 'GQ',
  gq: 'GQ',
  uruguay: 'UY',
  uy: 'UY',
  paraguay: 'PY',
  py: 'PY',
  bolivia: 'BO',
  bo: 'BO',
};

const BUNDLE_COUNTS: Record<CountryCode, number> = {
  CO: 224,
  MX: 35,
  AR: 28,
  CL: 50,
  PE: 60,
  EC: 50,
  BR: 11,
  PA: 10,
  CR: 44,
  GT: 10,
  DO: 10,
  SV: 95,
  HN: 44,
  NI: 10,
  ES: 60,
  PR: 40,
  GQ: 10,
  UY: 0,
  PY: 0,
  BO: 0,
};

function normalizeSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function resolveCountryCode(identifier?: string | null): CountryCode | undefined {
  if (!identifier) return undefined;
  const clean = normalizeSlug(identifier);
  if (COUNTRY_SLUG_MAP[clean]) return COUNTRY_SLUG_MAP[clean];
  const upper = identifier.toUpperCase() as CountryCode;
  if (Object.values(COUNTRY_SLUG_MAP).includes(upper)) return upper;
  return undefined;
}

export function getCountryManifest(identifier: string): CountryManifest | undefined {
  const code = resolveCountryCode(identifier);
  if (!code) return undefined;

  const rawConfig = getCountryConfig(code);
  if (!rawConfig) return undefined;

  const slug = normalizeSlug(rawConfig.name);
  const bundleCount = BUNDLE_COUNTS[code] ?? 0;

  const subjects: CountrySubject[] = (rawConfig.subjects || []).map((s: SubjectConfig) => ({
    id: s.id,
    name: s.name,
    slug: normalizeSlug(s.id),
    icon: s.icon,
    globalId: s.globalId,
  }));

  return {
    code,
    slug,
    name: rawConfig.name,
    flag: rawConfig.flag,
    language: rawConfig.locale || 'es',
    examName: rawConfig.examName,
    examEntity: rawConfig.examAuthority || 'Ministerio de Educación',
    subjects,
    grades: rawConfig.grades || [{ id: 11, name: 'Grado 11' }],
    scoring: {
      maxScore: code === 'CO' ? 500 : (code === 'CL' ? 1000 : 100),
      scale: code === 'CO' ? '0-500' : (code === 'CL' ? '100-1000' : '0-100'),
    },
    hasContent: bundleCount > 0,
    bundleCount,
    seo: {
      siteName: rawConfig.product?.siteName || `WorldExams ${rawConfig.name}`,
      description: rawConfig.product?.defaultDescription || `Preparación oficial para el examen ${rawConfig.examName} en ${rawConfig.name}.`,
    },
  };
}

export function getAllCountryManifests(): CountryManifest[] {
  return sharedCountries
    .map((c) => getCountryManifest(c.code))
    .filter((m): m is CountryManifest => m !== undefined);
}

export function getCountriesWithContent(): CountryManifest[] {
  return getAllCountryManifests().filter((m) => m.hasContent);
}
