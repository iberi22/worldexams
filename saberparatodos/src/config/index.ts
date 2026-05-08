import {
  allCountries,
  getCountryConfig,
  usaConfig,
  type CountryCode,
  type CountryConfig as SharedCountryConfig,
  type GiscusConfig,
  type ProductFeatures,
} from '../../../config/countries.config';

export interface RuntimeCountryConfig extends SharedCountryConfig {
  locale: SharedCountryConfig['locale'];
  language: SharedCountryConfig['locale'];
  currencyCode: string;
  institutionName: string;
  gradeNames: Record<number, string>;
  subjectAliases: Record<string, string>;
  features: ProductFeatures;
  giscus?: GiscusConfig;
}

function normalizeSiteUrl(value: string): string {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/+$/, '');
}

function findCountryCodeBySiteUrl(siteUrl?: string): CountryCode | undefined {
  const normalizedTarget = normalizeSiteUrl(siteUrl || '');
  if (!normalizedTarget) return undefined;

  const matchedCountry = allCountries.find((country) => {
    const candidates = [country.product.siteUrl, country.domain].filter(Boolean) as string[];
    return candidates.some((candidate) => normalizeSiteUrl(candidate) === normalizedTarget);
  });

  return matchedCountry?.code;
}

export function getExplicitProductCountryCode(): CountryCode | undefined {
  // PUBLIC_* variables are replaced at build time by Astro/Vite.
  const envCode = import.meta.env.PUBLIC_COUNTRY?.toUpperCase();
  if (envCode) {
    const resolved = getCountryConfig(envCode as CountryCode);
    if (resolved) return resolved.code;
  }

  const envSiteUrl = import.meta.env.PUBLIC_SITE_URL;
  return findCountryCodeBySiteUrl(envSiteUrl);
}

function buildGradeNames(config: SharedCountryConfig): Record<number, string> {
  return config.grades.reduce<Record<number, string>>((acc, grade) => {
    acc[grade.id] = grade.name;
    return acc;
  }, {});
}

function buildSubjectAliases(config: SharedCountryConfig): Record<string, string> {
  return config.subjects.reduce<Record<string, string>>((acc, subject) => {
    acc[subject.globalId] = subject.name;
    acc[subject.id] = subject.name;
    return acc;
  }, {});
}

export function toRuntimeCountryConfig(config: SharedCountryConfig): RuntimeCountryConfig {
  return {
    ...config,
    language: config.locale,
    currencyCode: config.culture.currency.code,
    institutionName: config.examAuthority,
    gradeNames: buildGradeNames(config),
    subjectAliases: buildSubjectAliases(config),
    features: config.product.features || {},
    giscus: config.product.giscus,
  };
}

export function getCountryExamSlug(
  config: Pick<SharedCountryConfig, 'examName' | 'product'>
): string {
  const examLabel = config.product?.guideLabel || config.examName;
  return String(examLabel || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const sharedRuntimeFallbackCountry = usaConfig;

export function resolveRuntimeCountryConfig(
  config?: SharedCountryConfig | null
): RuntimeCountryConfig {
  if (config) return toRuntimeCountryConfig(config);

  const explicitCountry = getExplicitProductCountryCode();
  if (explicitCountry) {
    const resolved = getCountryConfig(explicitCountry);
    if (resolved) return toRuntimeCountryConfig(resolved);
  }

  return toRuntimeCountryConfig(sharedRuntimeFallbackCountry);
}

const currentCountryCode = getExplicitProductCountryCode();
const sharedCountryConfig = currentCountryCode ? getCountryConfig(currentCountryCode) : undefined;

export const countryConfig = resolveRuntimeCountryConfig(sharedCountryConfig);
export const supportedCountries = allCountries.map(toRuntimeCountryConfig);
export type CountryConfig = RuntimeCountryConfig;
