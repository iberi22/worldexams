import { describe, it, expect } from 'vitest';
import { getAgeAdjustedNorms, AGE_NORMATIVE_TABLES } from './normative-tables';

describe('NeuroGym Age & Grade Normative Tables', () => {
  it('maps primary school grades (3°-5°) to child norms with lower base expectations', () => {
    const childNorm = getAgeAdjustedNorms(4);
    expect(childNorm.ageGroup).toBe('child_8_10');
    expect(childNorm.norms.reactionMsMean).toBeGreaterThan(300); // Tiempos de reacción normales más lentos en niños
  });

  it('maps early secondary grades (6°-8°) to adolescent norms', () => {
    const adolNorm = getAgeAdjustedNorms(7);
    expect(adolNorm.ageGroup).toBe('adolescent_11_13');
    expect(adolNorm.norms.fluidAccuracyMean).toBe(0.58);
  });

  it('maps middle vocational grades (9°-10°) to youth norms', () => {
    const youthNorm = getAgeAdjustedNorms(9);
    expect(youthNorm.ageGroup).toBe('youth_14_16');
    expect(youthNorm.norms.fluidAccuracyMean).toBe(0.65);
  });

  it('maps grade 11 to pre-university norms', () => {
    const grade11 = getAgeAdjustedNorms(11);
    expect(grade11.ageGroup).toBe('preuni_17_18');
    expect(grade11.norms.fluidAccuracyMean).toBe(0.68);
  });

  it('maps adult cohort directly', () => {
    const adult = getAgeAdjustedNorms('adult_19_plus');
    expect(adult.ageGroup).toBe('adult_19_plus');
    expect(adult.norms.tapping10sMean).toBe(60);
  });

  it('supports numeric string representations of school grades', () => {
    expect(getAgeAdjustedNorms('5').ageGroup).toBe('child_8_10');
    expect(getAgeAdjustedNorms('8').ageGroup).toBe('adolescent_11_13');
    expect(getAgeAdjustedNorms('10').ageGroup).toBe('youth_14_16');
    expect(getAgeAdjustedNorms('11').ageGroup).toBe('preuni_17_18');
  });

  it('falls back gracefully to preuni_17_18 for unknown cohort keys', () => {
    const fallback = getAgeAdjustedNorms('unknown_key_xyz');
    expect(fallback.ageGroup).toBe('preuni_17_18');
  });

  it('contains complete psychometric norm profiles with positive SDs across all groups', () => {
    const keys = Object.keys(AGE_NORMATIVE_TABLES);
    expect(keys.length).toBe(5);

    for (const key of keys) {
      const profile = AGE_NORMATIVE_TABLES[key];
      expect(profile.ageGroup).toBe(key);
      expect(profile.label).toBeTruthy();
      expect(profile.gradeEquivalent).toBeTruthy();

      const norms = profile.norms;
      expect(norms.fluidAccuracyMean).toBeGreaterThan(0);
      expect(norms.fluidAccuracySD).toBeGreaterThan(0);
      expect(norms.wmSpanMean).toBeGreaterThan(0);
      expect(norms.wmSpanSD).toBeGreaterThan(0);
      expect(norms.reactionMsMean).toBeGreaterThan(0);
      expect(norms.reactionMsSD).toBeGreaterThan(0);
      expect(norms.stroopInterferenceMean).toBeGreaterThan(0);
      expect(norms.stroopInterferenceSD).toBeGreaterThan(0);
      expect(norms.tapping10sMean).toBeGreaterThan(0);
      expect(norms.tapping10sSD).toBeGreaterThan(0);
    }
  });
});
