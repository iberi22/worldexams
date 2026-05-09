import type { CountryConfig as RuntimeCountryConfig } from '../config';
import { resolveRuntimeCountryConfig } from '../config';
import { getTenantExperience } from '../config/tenant-experience';
import type { IcfesEstimate } from './mmr-system';

type EstimateCountry =
  | RuntimeCountryConfig
  | Pick<RuntimeCountryConfig, 'code' | 'name' | 'examName' | 'examAuthority' | 'product' | 'theme' | 'subjects' | 'grades' | 'locale' | 'language' | 'culture' | 'currencyCode' | 'institutionName' | 'gradeNames' | 'subjectAliases' | 'features'>
  | null
  | undefined;

export function normalizeEstimateCountry(country?: EstimateCountry): RuntimeCountryConfig {
  return resolveRuntimeCountryConfig(country as RuntimeCountryConfig | null | undefined);
}

export function getPracticeEstimateSemantics(country?: EstimateCountry) {
  return getTenantExperience(normalizeEstimateCountry(country)).scoreSemantics;
}

export function applyPracticeEstimateSemantics(
  estimate: IcfesEstimate,
  country?: EstimateCountry
): IcfesEstimate {
  const semantics = getPracticeEstimateSemantics(country);

  return {
    ...estimate,
    methodologyVersion: semantics.methodologyVersion,
    disclaimer: semantics.disclaimer,
  };
}
