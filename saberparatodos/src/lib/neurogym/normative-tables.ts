/**
 * normative-tables.ts
 * Baremos Psicométricos y Tablas Normativas por Grupos Etarios y Grados Escolares.
 *
 * Basado en estandarizaciones empíricas de desarrollo neurocognitivo
 * (Raven, Wechsler WISC/WAIS, Test de Stroop y Corsi).
 */

export interface AgeNormativeProfile {
  ageGroup: 'child_8_10' | 'adolescent_11_13' | 'youth_14_16' | 'preuni_17_18' | 'adult_19_plus';
  label: string;
  gradeEquivalent: string;
  norms: {
    fluidAccuracyMean: number;
    fluidAccuracySD: number;
    wmSpanMean: number;
    wmSpanSD: number;
    reactionMsMean: number;
    reactionMsSD: number;
    stroopInterferenceMean: number;
    stroopInterferenceSD: number;
    tapping10sMean: number;
    tapping10sSD: number;
  };
}

export const AGE_NORMATIVE_TABLES: Record<string, AgeNormativeProfile> = {
  child_8_10: {
    ageGroup: 'child_8_10',
    label: 'Infantil (8 - 10 años)',
    gradeEquivalent: 'Primaria (3° - 5°)',
    norms: {
      fluidAccuracyMean: 0.50,
      fluidAccuracySD: 0.16,
      wmSpanMean: 40,
      wmSpanSD: 12,
      reactionMsMean: 350,
      reactionMsSD: 65,
      stroopInterferenceMean: 110,
      stroopInterferenceSD: 35,
      tapping10sMean: 42,
      tapping10sSD: 8
    }
  },
  adolescent_11_13: {
    ageGroup: 'adolescent_11_13',
    label: 'Adolescencia Temprana (11 - 13 años)',
    gradeEquivalent: 'Secundaria Básica (6° - 8°)',
    norms: {
      fluidAccuracyMean: 0.58,
      fluidAccuracySD: 0.17,
      wmSpanMean: 48,
      wmSpanSD: 13,
      reactionMsMean: 310,
      reactionMsSD: 55,
      stroopInterferenceMean: 90,
      stroopInterferenceSD: 30,
      tapping10sMean: 49,
      tapping10sSD: 9
    }
  },
  youth_14_16: {
    ageGroup: 'youth_14_16',
    label: 'Media Vocacional (14 - 16 años)',
    gradeEquivalent: 'Grados 9° - 10°',
    norms: {
      fluidAccuracyMean: 0.65,
      fluidAccuracySD: 0.18,
      wmSpanMean: 55,
      wmSpanSD: 14,
      reactionMsMean: 275,
      reactionMsSD: 50,
      stroopInterferenceMean: 80,
      stroopInterferenceSD: 28,
      tapping10sMean: 55,
      tapping10sSD: 10
    }
  },
  preuni_17_18: {
    ageGroup: 'preuni_17_18',
    label: 'Preuniversitario / Grado 11 (17 - 18 años)',
    gradeEquivalent: 'Saber 11 / PAES',
    norms: {
      fluidAccuracyMean: 0.68,
      fluidAccuracySD: 0.18,
      wmSpanMean: 58,
      wmSpanSD: 14,
      reactionMsMean: 250,
      reactionMsSD: 45,
      stroopInterferenceMean: 70,
      stroopInterferenceSD: 25,
      tapping10sMean: 58,
      tapping10sSD: 10
    }
  },
  adult_19_plus: {
    ageGroup: 'adult_19_plus',
    label: 'Adulto / Educación Superior (19+ años)',
    gradeEquivalent: 'Universidad / Profesionales',
    norms: {
      fluidAccuracyMean: 0.70,
      fluidAccuracySD: 0.17,
      wmSpanMean: 60,
      wmSpanSD: 15,
      reactionMsMean: 245,
      reactionMsSD: 45,
      stroopInterferenceMean: 68,
      stroopInterferenceSD: 24,
      tapping10sMean: 60,
      tapping10sSD: 11
    }
  }
};

/**
 * Obtiene el perfil normativo por grado escolar o edad
 */
export function getAgeAdjustedNorms(gradeOrAgeGroup: number | string): AgeNormativeProfile {
  if (typeof gradeOrAgeGroup === 'string' && AGE_NORMATIVE_TABLES[gradeOrAgeGroup]) {
    return AGE_NORMATIVE_TABLES[gradeOrAgeGroup];
  }

  const numericGrade = typeof gradeOrAgeGroup === 'number'
    ? gradeOrAgeGroup
    : (typeof gradeOrAgeGroup === 'string' && !isNaN(Number(gradeOrAgeGroup)) && gradeOrAgeGroup.trim() !== '' ? Number(gradeOrAgeGroup) : NaN);

  if (!isNaN(numericGrade)) {
    if (numericGrade <= 5) return AGE_NORMATIVE_TABLES.child_8_10;
    if (numericGrade <= 8) return AGE_NORMATIVE_TABLES.adolescent_11_13;
    if (numericGrade <= 10) return AGE_NORMATIVE_TABLES.youth_14_16;
    return AGE_NORMATIVE_TABLES.preuni_17_18;
  }

  return AGE_NORMATIVE_TABLES[gradeOrAgeGroup] || AGE_NORMATIVE_TABLES.preuni_17_18;
}
