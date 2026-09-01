import { describe, it, expect } from 'vitest';
import { getAgeAdjustedNorms, AGE_NORMATIVE_TABLES } from './normative-tables';

describe('NeuroGym Age & Grade Normative Tables', () => {
  it('maps primary school grades (3°-5°) to child norms with lower base expectations', () => {
    const childNorm = getAgeAdjustedNorms(4);
    expect(childNorm.ageGroup).toBe('child_8_10');
    expect(childNorm.norms.reactionMsMean).toBeGreaterThan(300); // Tiempos de reacción normales más lentos en niños
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
});
