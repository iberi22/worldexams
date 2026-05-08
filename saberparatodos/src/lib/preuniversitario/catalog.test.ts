import { describe, expect, it } from 'vitest';
import { getPreuCatalog, getPreuCatalogEntries, isPreuCountrySupported } from './catalog';

describe('preuniversitario catalog routing', () => {
  it('returns Colombia data only for the CO tenant', () => {
    expect(getPreuCatalogEntries('CO').length).toBeGreaterThan(0);
    expect(getPreuCatalogEntries('MX')).toHaveLength(0);
  });

  it('returns empty datasets for unsupported tenants', () => {
    const mexicoCatalog = getPreuCatalog('MX');
    expect(mexicoCatalog.entries).toHaveLength(0);
    expect(mexicoCatalog.methodologySources).toHaveLength(0);
  });

  it('marks CO as supported and MX as unsupported', () => {
    expect(isPreuCountrySupported('CO')).toBe(true);
    expect(isPreuCountrySupported('MX')).toBe(false);
  });
});
