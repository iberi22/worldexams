/**
 * scoring-cognitive.ts
 * Motor Psicométrico y Baremación Cognitiva para WorldExams NeuroGym.
 *
 * Estandarización basada en curvas normales (media=100, desv=15 para CI y compuestos;
 * percentiles 1-99; Stanines 1-9 y Z-Scores).
 */

export interface RawCognitiveScores {
  // Razonamiento / Matrices Raven (aciertos / total)
  fluidReasoningRaw: { correct: number; total: number; avgTimeMs: number };
  // Memoria de trabajo (Dual N-Back / Corsi span)
  workingMemorySpan: { maxNLevel: number; corsiSpan: number; accuracy: number };
  // Velocidad de procesamiento & Stroop
  processingSpeed: { avgReactionMs: number; stroopInterferenceMs: number; errorRate: number };
  // Coordinación motriz (tapping / Go-No-Go)
  motorCoordination: { tapsPer10s: number; goNoGoAccuracy: number; motorJitterMs: number };
  // Análisis lógico y flexibilidad
  analyticalFlexibility: { ruleSwitchesSuccess: number; totalRuleTrials: number };
  // Comprensión Verbal (Gc) — asociación palabra-definición (P4)
  verbalComprehension?: { correct: number; total: number; avgTimeMs: number };
  // Razonamiento Cuantitativo (Gq) — aritmética cronometrada (P5)
  quantitativeReasoning?: { correct: number; total: number; avgTimeMs: number };
}

export interface CognitiveDomainResult {
  rawScore: number;
  standardScore: number; // Media 100, SD 15 (Escala Wechsler / Stanford-Binet)
  percentile: number;    // 1 - 99.9
  stanine: number;       // 1 - 9
  levelDescription: 'Superior' | 'Alto' | 'Promedio Alto' | 'Promedio' | 'Promedio Bajo' | 'En Desarrollo';
  clinicalSummary: string;
}

export interface FullCognitiveProfile {
  timestamp: number;
  overallIQProxy: CognitiveDomainResult;
  workingMemory: CognitiveDomainResult;
  processingSpeed: CognitiveDomainResult;
  motorAgility: CognitiveDomainResult;
  analyticalFlexibility: CognitiveDomainResult;
  verbalComprehension: CognitiveDomainResult;
  quantitativeReasoning: CognitiveDomainResult;
  strengths: string[];
  growthAreas: string[];
  recommendedDailyWorkout: {
    domain: string;
    focusExercise: string;
    targetDurationMinutes: number;
  }[];
}

/**
 * Convierte un Z-Score a Percentil normalizado (Aproximación erf de Gauss)
 */
export function zScoreToPercentile(z: number): number {
  if (z < -3.5) return 0.1;
  if (z > 3.5) return 99.9;
  
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const p = 0.2316419;
  const c = 0.39894228;

  if (z >= 0) {
    const t = 1.0 / (1.0 + p * z);
    const poly = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
    const cdf = 1.0 - c * Math.exp(-z * z / 2.0) * poly;
    return Math.min(99.9, Math.max(0.1, Number((cdf * 100).toFixed(1))));
  } else {
    const t = 1.0 / (1.0 - p * z);
    const poly = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
    const cdf = c * Math.exp(-z * z / 2.0) * poly;
    return Math.min(99.9, Math.max(0.1, Number((cdf * 100).toFixed(1))));
  }
}

/**
 * Convierte un Z-Score a puntaje estándar CI (Mean=100, SD=15)
 */
export function zScoreToStandard(z: number): number {
  const std = Math.round(100 + z * 15);
  return Math.min(160, Math.max(40, std));
}

/**
 * Obtiene el stanine (1-9) a partir del percentil
 */
export function percentileToStanine(percentile: number): number {
  if (percentile < 4) return 1;
  if (percentile < 11) return 2;
  if (percentile < 23) return 3;
  if (percentile < 40) return 4;
  if (percentile < 60) return 5;
  if (percentile < 77) return 6;
  if (percentile < 89) return 7;
  if (percentile < 96) return 8;
  return 9;
}

/**
 * Obtiene la categoría descriptiva clínica/psicométrica
 */
export function getLevelDescription(standardScore: number): CognitiveDomainResult['levelDescription'] {
  if (standardScore >= 130) return 'Superior';
  if (standardScore >= 120) return 'Alto';
  if (standardScore >= 110) return 'Promedio Alto';
  if (standardScore >= 90) return 'Promedio';
  if (standardScore >= 80) return 'Promedio Bajo';
  return 'En Desarrollo';
}

/**
 * Evalúa y barema la Batería Completa de NeuroGym
 */
export function computeCognitiveProfile(raw: RawCognitiveScores): FullCognitiveProfile {
  // 1. Razonamiento Fluido / Matrices Abstractas (Proxy IQ)
  const fluidAccuracy = raw.fluidReasoningRaw.total > 0 ? (raw.fluidReasoningRaw.correct / raw.fluidReasoningRaw.total) : 0;
  const zFluid = (fluidAccuracy - 0.65) / 0.18;
  const stdFluid = zScoreToStandard(zFluid);
  const pFluid = zScoreToPercentile(zFluid);

  const fluidResult: CognitiveDomainResult = {
    rawScore: Math.round(fluidAccuracy * 100),
    standardScore: stdFluid,
    percentile: pFluid,
    stanine: percentileToStanine(pFluid),
    levelDescription: getLevelDescription(stdFluid),
    clinicalSummary: 'Capacidad de deducción de reglas abstractas, extrapolación de patrones no verbales y resolución de problemas lógicos novedosos.'
  };

  // 2. Memoria de Trabajo (Dual N-Back & Corsi)
  const nScore = raw.workingMemorySpan.maxNLevel * 20;
  const corsiScore = raw.workingMemorySpan.corsiSpan * 10;
  const wmCombined = (nScore * 0.5) + (corsiScore * 0.5);
  const zWM = (wmCombined - 55) / 14;
  const stdWM = zScoreToStandard(zWM);
  const pWM = zScoreToPercentile(zWM);

  const wmResult: CognitiveDomainResult = {
    rawScore: Math.round(wmCombined),
    standardScore: stdWM,
    percentile: pWM,
    stanine: percentileToStanine(pWM),
    levelDescription: getLevelDescription(stdWM),
    clinicalSummary: 'Habilidad para retener, manipular y actualizar simultáneamente información visual y auditiva en el buffer de corto plazo.'
  };

  // 3. Velocidad de Procesamiento y Agilidad Mental
  const reactionMs = Math.max(150, raw.processingSpeed.avgReactionMs);
  const zReaction = (280 - reactionMs) / 50;
  const zStroop = (80 - Math.max(0, raw.processingSpeed.stroopInterferenceMs)) / 30;
  const zPSI = (zReaction * 0.6) + (zStroop * 0.4);
  const stdPSI = zScoreToStandard(zPSI);
  const pPSI = zScoreToPercentile(zPSI);

  const psiResult: CognitiveDomainResult = {
    rawScore: Math.round(reactionMs),
    standardScore: stdPSI,
    percentile: pPSI,
    stanine: percentileToStanine(pPSI),
    levelDescription: getLevelDescription(stdPSI),
    clinicalSummary: 'Eficiencia en la discriminación perceptual visual y rapidez para inhibir respuestas automáticas ante estímulos en conflicto.'
  };

  // 4. Coordinación Motora y Control Inhibitorio
  const zTaps = (raw.motorCoordination.tapsPer10s - 55) / 10;
  const zGoNoGo = (raw.motorCoordination.goNoGoAccuracy - 0.88) / 0.08;
  const zMotor = (zTaps * 0.5) + (zGoNoGo * 0.5);
  const stdMotor = zScoreToStandard(zMotor);
  const pMotor = zScoreToPercentile(zMotor);

  const motorResult: CognitiveDomainResult = {
    rawScore: Math.round(raw.motorCoordination.tapsPer10s),
    standardScore: stdMotor,
    percentile: pMotor,
    stanine: percentileToStanine(pMotor),
    levelDescription: getLevelDescription(stdMotor),
    clinicalSummary: 'Velocidad de ejecución neuromuscular, ritmo motor sustained y freno voluntario ante estímulos de parada (Stop-Signal).'
  };

  // 5. Análisis Lógico y Flexibilidad Cognitiva
  const flexRatio = raw.analyticalFlexibility.totalRuleTrials > 0
    ? (raw.analyticalFlexibility.ruleSwitchesSuccess / raw.analyticalFlexibility.totalRuleTrials)
    : 0;
  const zFlex = (flexRatio - 0.70) / 0.15;
  const stdFlex = zScoreToStandard(zFlex);
  const pFlex = zScoreToPercentile(zFlex);

  const flexResult: CognitiveDomainResult = {
    rawScore: Math.round(flexRatio * 100),
    standardScore: stdFlex,
    percentile: pFlex,
    stanine: percentileToStanine(pFlex),
    levelDescription: getLevelDescription(stdFlex),
    clinicalSummary: 'Capacidad para cambiar de estrategia cognitiva ante cambios de reglas dinámicas y resistencia a la perseveración.'
  };

  // 6. Comprensión Verbal (Gc) — Vocabulario palabra-definición (P4)
  const verbalRaw = raw.verbalComprehension ?? { correct: 0, total: 0, avgTimeMs: 0 };
  const verbalAccuracy = verbalRaw.total > 0
    ? (verbalRaw.correct / verbalRaw.total)
    : 0;
  const verbalZ = (verbalAccuracy - 0.70) / 0.15;
  const verbalScore = zScoreToStandard(verbalZ);
  const pVerbal = zScoreToPercentile(verbalZ);

  const verbalResult: CognitiveDomainResult = {
    rawScore: verbalRaw.correct,
    standardScore: verbalScore,
    percentile: pVerbal,
    stanine: percentileToStanine(pVerbal),
    levelDescription: getLevelDescription(verbalScore),
    clinicalSummary: 'Capital léxico adquirido y habilidad para recuperar significados precisos de palabras escritas (cristalización verbal Gc).'
  };

  // 7. Razonamiento Cuantitativo (Gq) — aritmética cronometrada (P5)
  const quantRaw = raw.quantitativeReasoning ?? { correct: 0, total: 0, avgTimeMs: 0 };
  const quantAccuracy = quantRaw.total > 0
    ? (quantRaw.correct / quantRaw.total)
    : 0;
  const zQuant = (quantAccuracy - 0.75) / 0.15;
  const stdQuant = zScoreToStandard(zQuant);
  const pQuant = zScoreToPercentile(zQuant);

  const quantResult: CognitiveDomainResult = {
    rawScore: quantRaw.correct,
    standardScore: stdQuant,
    percentile: pQuant,
    stanine: percentileToStanine(pQuant),
    levelDescription: getLevelDescription(stdQuant),
    clinicalSummary: `Resolución de ${quantRaw.correct}/${quantRaw.total} problemas aritméticos con fluidez numérica bajo presión de tiempo.`
  };

  const domains = [
    { name: 'Razonamiento Fluido', score: stdFluid, obj: fluidResult },
    { name: 'Memoria de Trabajo', score: stdWM, obj: wmResult },
    { name: 'Velocidad de Procesamiento', score: stdPSI, obj: psiResult },
    { name: 'Agilidad Motora', score: stdMotor, obj: motorResult },
    { name: 'Flexibilidad Analítica', score: stdFlex, obj: flexResult },
    { name: 'Comprensión Verbal', score: verbalScore, obj: verbalResult },
    { name: 'Razonamiento Cuantitativo', score: stdQuant, obj: quantResult }
  ];

  const sortedDomains = [...domains].sort((a, b) => b.score - a.score);
  const strengths = sortedDomains.filter(d => d.score >= 105).map(d => `${d.name} (${d.obj.levelDescription} - Score ${d.score})`);
  const growthAreas = sortedDomains.filter(d => d.score < 105).map(d => `${d.name} (Score ${d.score})`);

  const workout = sortedDomains.slice(-2).map(d => {
    let exercise = 'Entrenamiento Progresivo';
    if (d.name.includes('Memoria')) exercise = 'Dual N-Back + Secuencias Corsi 3D';
    else if (d.name.includes('Razonamiento')) exercise = 'Matrices Raven Adaptativas v5';
    else if (d.name.includes('Velocidad')) exercise = 'Desafío Stroop Dinámico + Reacción Simple';
    else if (d.name.includes('Agilidad')) exercise = 'Circuito Go/No-Go Tapping Rápido';
    else if (d.name.includes('Flexibilidad')) exercise = 'Cambio de Reglas Lógicas Clasificatorias';
    else if (d.name.includes('Verbal')) exercise = 'Asociación Palabra-Definición Gc Adaptativa';
    else if (d.name.includes('Cuantitativo')) exercise = 'Aritmética Cronometrada Progresiva (Gq)';

    return {
      domain: d.name,
      focusExercise: exercise,
      targetDurationMinutes: 7
    };
  });

  return {
    timestamp: Date.now(),
    overallIQProxy: fluidResult,
    workingMemory: wmResult,
    processingSpeed: psiResult,
    motorAgility: motorResult,
    analyticalFlexibility: flexResult,
    verbalComprehension: verbalResult,
    quantitativeReasoning: quantResult,
    strengths: strengths.length > 0 ? strengths : ['Desarrollo armónico en todas las áreas evaluadas'],
    growthAreas: growthAreas.length > 0 ? growthAreas : ['Mantener nivel óptimo con desafíos de alta complejidad'],
    recommendedDailyWorkout: workout
  };
}
