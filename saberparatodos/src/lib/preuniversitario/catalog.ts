import type { CountryCode } from '../../../../config/countries.config';
import { DEFAULT_COUNTRY } from '../../config/countries.config';
import { coPreuCatalogEntries, coPreuMethodologySources } from './catalog/co';
import type { PreuCatalogDataset, PreuCatalogEntry, PreuSourceRef } from './types';

const EMPTY_PREU_DATASET: PreuCatalogDataset = {
  entries: [],
  methodologySources: [],
};

export function isPreuCountrySupported(countryCode: CountryCode | string = DEFAULT_COUNTRY || ''): boolean {
  return String(countryCode || '').toUpperCase() === 'CO';
}

export function isPreuRuntimeEnabled(countryCode: CountryCode | string = DEFAULT_COUNTRY || ''): boolean {
  return isPreuCountrySupported(countryCode);
}

export function getPreuCatalog(countryCode: CountryCode | string = DEFAULT_COUNTRY || ''): PreuCatalogDataset {
  if (!isPreuCountrySupported(countryCode)) {
    return EMPTY_PREU_DATASET;
  }

  return {
    entries: coPreuCatalogEntries,
    methodologySources: coPreuMethodologySources,
  };
}

export function getPreuCatalogEntries(countryCode: CountryCode | string = DEFAULT_COUNTRY || ''): PreuCatalogEntry[] {
  return getPreuCatalog(countryCode).entries;
}

export function getPreuMethodologySources(countryCode: CountryCode | string = DEFAULT_COUNTRY || ''): PreuSourceRef[] {
  return getPreuCatalog(countryCode).methodologySources;
}

export const preuStatusLabels = {
  verified: 'Verificada',
  in_research: 'En levantamiento',
  queued: 'En cola'
} as const;
