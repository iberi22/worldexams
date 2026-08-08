import { describe, it, expect } from 'vitest';
import { getCountryConfig, mapSubject, findClosestGrade, generateThemeCSS } from '../../../config/countries.config';

describe('Country Configuration and Isolation Integration Tests', () => {
  it('should retrieve correct configuration for supported countries', () => {
    const co = getCountryConfig('CO');
    expect(co).toBeDefined();
    expect(co?.name).toBe('Colombia');
    expect(co?.examName).toBe('ICFES Saber');
    expect(co?.locale).toBe('es-CO');

    const mx = getCountryConfig('MX');
    expect(mx).toBeDefined();
    expect(mx?.name).toBe('México');
    expect(mx?.examName).toBe('EXANI-II');
    expect(mx?.locale).toBe('es-MX');

    const ar = getCountryConfig('AR');
    expect(ar).toBeDefined();
    expect(ar?.name).toBe('Argentina');
    expect(ar?.culture.languageVariant).toBe('voseo');
  });

  it('should handle undefined or unsupported country codes gracefully', () => {
    const invalid = getCountryConfig('XX' as any);
    expect(invalid).toBeUndefined();
  });

  it('should correctly map global subject IDs across countries', () => {
    // Math globalId mapping
    const coMath = mapSubject('math', 'CO');
    expect(coMath?.id).toBe('matematicas');
    expect(coMath?.name).toBe('Matemáticas');

    const brMath = mapSubject('math', 'BR');
    expect(brMath?.id).toBe('matematica');
    expect(brMath?.name).toBe('Matemática');

    const usMath = mapSubject('math', 'US');
    expect(usMath?.id).toBe('math');
    expect(usMath?.name).toBe('Mathematics');
  });

  it('should find exact or closest grade for any country educational system', () => {
    // Exact match in Colombia (G5)
    const coG5 = findClosestGrade(5, 'CO');
    expect(coG5?.id).toBe(5);

    // Closest match in Argentina for G11 (should resolve to 12 since G12 is the highest)
    const arG11 = findClosestGrade(11, 'AR');
    expect(arG11?.id).toBe(12);

    // Closest match in Brazil for G6 (should resolve to 5 or 7, 7 is typical closest/exact depending on reduction)
    const brG6 = findClosestGrade(6, 'BR');
    expect([5, 7]).toContain(brG6?.id);
  });

  it('should isolate currencies and cultural context correctly per tenant', () => {
    const co = getCountryConfig('CO');
    expect(co?.culture.currency.code).toBe('COP');
    expect(co?.culture.currency.symbol).toBe('$');

    const mx = getCountryConfig('MX');
    expect(mx?.culture.currency.code).toBe('MXN');
    expect(mx?.culture.currency.symbol).toBe('$');

    const br = getCountryConfig('BR');
    expect(br?.culture.currency.code).toBe('BRL');
    expect(br?.culture.currency.symbol).toBe('R$');

    const uy = getCountryConfig('UY');
    expect(uy?.culture.currency.code).toBe('UYU');
    expect(uy?.culture.currency.symbol).toBe('$U');

    const bo = getCountryConfig('BO');
    expect(bo?.culture.currency.code).toBe('BOB');
    expect(bo?.culture.currency.symbol).toBe('Bs');
  });

  it('should generate correct CSS custom properties from visual identity config', () => {
    const co = getCountryConfig('CO')!;
    const css = generateThemeCSS(co.theme);

    expect(css).toContain('--color-primary: #FCD116');
    expect(css).toContain('--color-secondary: #003893');
    expect(css).toContain('--color-accent: #CE1126');
    expect(css).toContain('--bg-dark: #1a1a2e');
    expect(css).toContain('--bg-card: #16213e');
  });
});
