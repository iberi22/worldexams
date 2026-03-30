import {
  allCountries,
  colombiaConfig,
  getCountryConfig,
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

const DEFAULT_COUNTRY_CODE: CountryCode = 'CO';

function getCountryCode(): CountryCode {
  // PUBLIC_* variables are replaced at build time by Astro/Vite.
  const envCode = import.meta.env.PUBLIC_COUNTRY?.toUpperCase();
  const resolved = getCountryConfig((envCode || DEFAULT_COUNTRY_CODE) as CountryCode);
  return resolved?.code || DEFAULT_COUNTRY_CODE;
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

function toRuntimeCountryConfig(config: SharedCountryConfig): RuntimeCountryConfig {
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

const currentCountryCode = getCountryCode();
const sharedCountryConfig = getCountryConfig(currentCountryCode) || colombiaConfig;

export const countryConfig = toRuntimeCountryConfig(sharedCountryConfig);
export const supportedCountries = allCountries.map(toRuntimeCountryConfig);
export type CountryConfig = RuntimeCountryConfig;
