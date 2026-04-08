import type { IcfesEstimate } from './mmr-system';

export interface ExamResultData {
  grade: number;
  subject: string;
  correctCount: number;
  totalQuestions: number;
  accuracy: number; // 0-1
  timeSpentSeconds: number;
  weakTopics?: string[];
  strongTopics?: string[];
}

export interface UserProfileData {
  globalMMR: number;
  rankTitle: string;
  globalAccuracy: number; // 0-1
  totalQuestions: number;
  weakAreas: { name: string; accuracy: number }[];
  strongAreas: { name: string; accuracy: number }[];
  icfesEstimate?: IcfesEstimate;
  recentHistory?: { mmr: number, timestamp: number }[];
  advancedMetrics?: {
    avgTimeCorrect: number;
    avgTimeIncorrect: number;
    consistencyScore: number;
  };
}

export type LearnerArchetype =
  | 'novice_consolidating'    // MMR < 800 o < 20 preguntas
  | 'intermediate_rising'     // MMR 800-1200, tendencia positiva
  | 'advanced_with_gaps'      // MMR 1200-1600, brechas temáticas claras
  | 'advanced_consistent'     // MMR 1400+, alta consistencia
  | 'regressing'              // Caída de > 30 MMR en historia reciente
  | 'sprint_final'            // < 30 días para la prueba (opcional)
  | 'slow_starter';           // > 100 preguntas, acc < 40%

export interface AdaptiveContext {
  archetype: LearnerArchetype;
  momentum: 'rising' | 'stable' | 'falling';
  speedProfile: 'impulsive' | 'overthinker' | 'balanced';
  examDaysLeft?: number;
  consistencyScore: number;
  icfesEstimate: IcfesEstimate;
  totalQuestionsAnswered: number;
  topWeakArea?: string;
  topStrongSubject?: string;
}

export type PromptType =
  | 'exam_result'
  | 'improvement_plan'
  | 'subject_focus'
  | 'quick_review'
  | 'notebooklm'
  | 'notebooklm_update'
  | 'chatgpt_study_mode'
  | 'study_tips'
  | 'preu_generation'
  | 'rescue_plan'
  | 'momentum_boost'
  | 'elite_refinement'
  | 'gap_attack'
  | 'sprint_protocol'
  | 'adaptive_auto';

// =============================================================================
// TEMPLATES
// =============================================================================

const PROMPT_TEMPLATES = {
  // Prompt después de un examen
  exam_result: (data: ExamResultData) => `
Acabo de terminar un examen de práctica para las Pruebas de Estado Saber 11.

📊 **Resultados del examen:**
- Materia: ${data.subject}
- Grado: ${data.grade}°
- Correctas: ${data.correctCount}/${data.totalQuestions} (${Math.round(data.accuracy * 100)}%)
- Tiempo: ${Math.floor(data.timeSpentSeconds / 60)} minutos

${data.weakTopics?.length ? `❌ **Temas donde fallé:** ${data.weakTopics.join(', ')}` : ''}
${data.strongTopics?.length ? `✅ **Temas que dominé:** ${data.strongTopics.join(', ')}` : ''}

Por favor ayúdame a:
1. Entender los conceptos que fallé
2. Dame 3 ejercicios similares con explicación paso a paso
3. Tips para evitar estos errores en el futuro

Nivel: Preparación Pruebas de Estado Saber 11, Colombia.
Responde en español.`.trim(),

  // Plan de mejora general
  improvement_plan: (profile: UserProfileData) => `
Soy un estudiante colombiano preparándome para las Pruebas de Estado Saber 11.

📊 **Mi perfil de rendimiento:**
- Rating Global (MMR): ${profile.globalMMR} (${profile.rankTitle})
- Precisión Global: ${Math.round(profile.globalAccuracy * 100)}%
- Total Preguntas: ${profile.totalQuestions}

📉 **Mis áreas débiles:**
${profile.weakAreas.map(a => `- ${a.name}: ${Math.round(a.accuracy * 100)}%`).join('\n')}

${profile.strongAreas ? `📈 **Mis fortalezas:**\n${profile.strongAreas.map(a => `- ${a.name}: ${Math.round(a.accuracy * 100)}%`).join('\n')}` : ''}

📚 **Necesito:**
1. Plan de estudio semanal enfocado en mis debilidades
2. Explicación de conceptos fundamentales que debo reforzar
3. 5 ejercicios de práctica con solución
4. Tips para mejorar mi puntaje

🎯 **Meta:** Subir mi accuracy al menos 20 puntos en áreas débiles.

Por favor responde en español con explicaciones claras.`.trim(),

  // Enfoque en materia específica
  subject_focus: (subject: string, accuracy: number, topics?: string[]) => `
Necesito ayuda con ${subject} para las Pruebas de Estado Saber 11.

📊 **Mi nivel actual:** ${Math.round(accuracy * 100)}% de precisión

${topics?.length ? `📌 **Temas específicos a reforzar:** ${topics.join(', ')}` : ''}

Por favor:
1. Explícame los conceptos clave de ${subject} para las Pruebas de Estado Saber 11
2. Dame un resumen de fórmulas/reglas importantes
3. 5 ejercicios tipo Pruebas de Estado con solución paso a paso
4. Estrategias para responder rápido y bien

Nivel: Grado 11, Colombia.
Responde en español.`.trim(),

  // Repaso rápido
  quick_review: (subject: string, topics: string[]) => `
Necesito un repaso rápido de ${subject} antes de mi examen de Pruebas de Estado.

📌 **Temas a repasar:** ${topics.join(', ')}

Dame:
1. Resumen en 5 puntos clave
2. Las 3 fórmulas/conceptos más importantes
3. 2 ejercicios rápidos de práctica

Sé conciso. Nivel: Pruebas de Estado Saber 11, Colombia.`.trim(),

  // Para NotebookLM (Destacado como la mejor herramienta actual)
  notebooklm: (profile: UserProfileData) => {
    let speedProfile = "Ritmo balanceado.";
    if (profile.advancedMetrics) {
      const diff = profile.advancedMetrics.avgTimeIncorrect - profile.advancedMetrics.avgTimeCorrect;
      if (diff < -5000) speedProfile = "Pensador Impulsivo (Responde muy rápido en errores). Necesita pausas estratégicas.";
      if (diff > 5000) speedProfile = "Sobre-analítico (Se bloquea en lo que no sabe). Necesita gestión de tiempo.";
    }

    return `
[ROL: Tutor Maestro IA para Saber 11]
NotebookLM, actúa como un experto pedagógico utilizando el material proporcionado para este estudiante colombiano.

MÉTRICAS DEL ESTUDIANTE:
- Rango: ${profile.rankTitle} (MMR: ${profile.globalMMR})
- Precisión: ${Math.round(profile.globalAccuracy * 100)}%
- Velocidad: ${speedProfile}
${profile.advancedMetrics ? `- Consistencia: ${profile.advancedMetrics.consistencyScore}/100` : ''}

FUENTES CLAVE:
1. https://saberparatodos.space/notebooklm (Estructura curricular)
2. https://saberparatodos.space/api/notebooklm-source.json (Datos técnicos)

INSTRUCCIONES:
1. Genera un plan de choque semanal intensivo enfocado en: ${profile.weakAreas.map(a => a.name).join(', ')}.
2. Si el perfil es "Impulsivo", incluye ejercicios de "Lectura Lenta". Si es "Sobre-analítico", incluye técnicas de "Descarte Rápido".
3. Crea simulacros de 5 preguntas tipo Saber 11 para cada área crítica.
4. Explica no solo la respuesta correcta, sino por qué los distractores son trampas comunes.
`.trim();
  },

  // Para ChatGPT Study Mode (Configuraciones de modo estudio - Tutor de Élite)
  chatgpt_study_mode: (profile: UserProfileData) => `
[SYSTEM CONFIG: SABER 11 TUTOR MODE]
Eres un tutor de élite para las Pruebas Saber 11 en Colombia. Tu misión es guiar a este estudiante basándote en su perfil:

PERFIL:
- Áreas a mejorar: ${profile.weakAreas.map(a => `${a.name} (${Math.round(a.accuracy * 100)}%)`).join(', ')}
${profile.strongAreas ? `- Fortalezas: ${profile.strongAreas.map(a => a.name).join(', ')}` : ''}

METODOLOGÍA:
1. No des respuestas; haz preguntas que obliguen al estudiante a razonar (Método Socrático).
2. Usa contextos colombianos reales (economía local, literatura nacional, etc.).
3. Si el estudiante se equivoca, analiza su error y propón un ejercicio más simple del mismo concepto.
4. Mantén un tono motivador: "¡Vamos, futuro becario! Tú puedes con este análisis".

PRESENTACIÓN: Saluda al estudiante, reconoce su rango (${profile.rankTitle}) y pregúntale con cuál de sus temas críticos quiere empezar el entrenamiento hoy.
`.trim(),

  // Meta-cognitive Study Tips (🆕)
  study_tips: (profile: UserProfileData) => {
    let speedProfile = "Ritmo equilibrado";
    if (profile.advancedMetrics) {
      const diff = profile.advancedMetrics.avgTimeIncorrect - profile.advancedMetrics.avgTimeCorrect;
      if (diff < -5000) speedProfile = "Tendencia a la impulsividad";
      if (diff > 5000) speedProfile = "Bloqueo por sobre-análisis";
    }

    return `
[ROL: Mentor Meta-cognitivo Saber 11]
NotebookLM/ChatGPT, analiza mi perfil de rendimiento y dame estrategias de ALTO NIVEL para mejorar mi puntaje.

DATOS TÉCNICOS:
- MMR: ${profile.globalMMR}
- Precisión: ${Math.round(profile.globalAccuracy * 100)}%
- Perfil de Velocidad: ${speedProfile}
${profile.advancedMetrics ? `- Consistencia: ${profile.advancedMetrics.consistencyScore}/100` : ''}

POR FAVOR DAME:
1. Un análisis de mi "Mentalidad de Examen" basada en mi perfil de velocidad.
2. 3 técnicas psicológicas para controlar la ansiedad o el aburrimiento durante la prueba de 4.5 horas.
3. Una estrategia de "Gestión de Tiempo por Pregunta" personalizada para mí.
4. ¿Cómo puedo aprovechar mis fortalezas (${profile.strongAreas.map(a => a.name).join(', ')}) para compensar mis debilidades?
`.trim();
  },

  // Actualización NotebookLM
  notebooklm_update: (profile: UserProfileData) => `
🚨 ACTUALIZACIÓN CRÍTICA [${new Date().toLocaleDateString()}]
Nuevos datos de rendimiento detectados:
${profile.weakAreas.map(a => `- ${a.name} (${Math.round(a.accuracy * 100)}%)`).join('\n')}

Actualiza mi ruta de aprendizaje priorizando estos nuevos hallazgos.
`.trim(),

  // 🆕 High Complexity Generation Prompt (PREU Focus)
  preu_generation: (subject: string, specific_topic: string) => `
[ROL: Especialista en Psicometría y Evaluación Educativa - Admisión Universitaria]
Genera un bundle de 20 preguntas tipo Saber 11 sobre "${specific_topic}" para el área de ${subject}, alineado con el Protocol v5.1 del repositorio y con la malla curricular colombiana vigente para grado 11.

REQUISITOS TÉCNICOS:
1. **Dificultad Progresiva**: 4 preguntas D3-D4, 6 preguntas D5-D6, 6 preguntas D7-D8, 4 preguntas D9-D10.
2. **Alineación oficial**: Usa competencias y estilos de pregunta coherentes con ICFES Saber 11 y contenidos compatibles con MEN.
3. **Formato**: Entrega Markdown compatible con bundles \`MASTERY\` en \`questions_data/\`.
4. **Frontmatter obligatorio**: \`id\`, \`country\`, \`grado\`, \`asignatura\`, \`tema\`, \`periodo\`, \`protocol_version\`, \`bundle_index\`, \`bundle_size\`, \`alignment\`, \`distractor_profile\`, \`calibration\`, \`rubric_baseline\`.
5. **Distractores**: Las opciones incorrectas deben ser plausibles, de la misma categoría semántica, con longitud y detalle parecidos. Prohibido usar opciones absurdas o fácilmente descartables.
6. **Feedback**: Incluye comentario \`<!-- feedback: ... -->\` para cada opción.
7. **Formato matemático/científico**: Usa KaTeX ($...$ para inline, $$...$$ para bloques) cuando aplique.

REGLAS POR ÁREA:
- Matemáticas: prioriza modelación, interpretación funcional y errores algebraicos plausibles.
- Lectura crítica: prioriza tesis, inferencia, estructura, propósito y evaluación de argumentos.
- Sociales: prioriza ciudadanía, instituciones, conflicto, multiperspectivismo y análisis de consecuencias.
- Ciencias: prioriza fenómenos, variables, evidencia y conclusiones.
- Inglés: mantén CEFR B1-B2; todas las opciones deben tener misma función gramatical y registro.

No uses placeholders, no dejes preguntas incompletas y no reutilices la misma estructura verbal más de dos veces seguidas.

Responde en formato Markdown compatible con el sistema local.
`.trim(),

  // 🆕 Sprint Final Protocol
  sprint_protocol: (profile: UserProfileData, context: AdaptiveContext) => `
[ROL: Comando de Preparación Final Saber 11]
🚨 SPRINT FINAL: Quedan pocos días para la prueba.

MI ESTADO:
- Estimado de practica (Proxy): ${context.icfesEstimate.score}/500
- MMR: ${profile.globalMMR} (${profile.rankTitle})
- Debilidades Críticas: ${profile.weakAreas.slice(0, 3).map(a => a.name).join(', ')}
- Áreas Sólidas: ${profile.strongAreas.slice(0, 3).map(a => a.name).join(', ')}

PROTOCOLO DE CIERRE:
1. Basado en mi perfil, ¿qué tema debería priorizar hoy para maximizar puntos?
2. Dame un plan intensivo de repaso para los días restantes.
3. ¿Qué técnicas de gestión de tiempo me recomiendas para evitar el agotamiento?
4. Dame 5 tips psicológicos para el día del examen.
`.trim(),

  // 🆕 Rescue Plan (Para usuarios en regresión o bajo rendimiento)
  rescue_plan: (profile: UserProfileData, context: AdaptiveContext) => `
[ROL: Tutor de Rescate Académico Saber 11]
He detectado que mi rendimiento ha bajado o es inconsistente. Necesito un "reseteo" estratégico.

SITUACIÓN:
- MMR Actual: ${profile.globalMMR} (Tendencia: ${context.momentum})
- Precisión Global: ${Math.round(profile.globalAccuracy * 100)}%
- Perfil de Velocidad: ${context.speedProfile === 'impulsive' ? 'Impulsivo (necesita calma)' : 'Bloqueado (necesita descarte rápido)'}

NECESITO:
1. Un diagnóstico de por qué mi rendimiento está siendo ${context.momentum === 'falling' ? 'descendente' : 'bajo'}.
2. Plan de 48h para recuperar la confianza.
3. 3 ejercicios de nivel básico-medio sobre ${context.topWeakArea || 'mis debilidades'} con explicación detallada.
4. ¿Cómo puedo usar mi fortaleza en ${context.topStrongSubject || 'temas conocidos'} para subir el ánimo?
`.trim(),

  // 🆕 Momentum Boost (Para usuarios en ascenso)
  momentum_boost: (profile: UserProfileData, context: AdaptiveContext) => `
[ROL: Coach de Alto Rendimiento Saber 11]
¡Estoy en racha! Mi rendimiento ha mejorado significativamente.

MÉTRICAS:
- MMR: ${profile.globalMMR}
- Consistencia: ${context.consistencyScore}/100
- Estimado de practica (Proxy): ${context.icfesEstimate.score}/500

ESTRATEGIA DE ASCENSO:
1. ¿Cómo paso de un nivel ${profile.rankTitle} al siguiente rango de élite?
2. Identifica el "eslabón débil" que todavía tengo en ${context.topWeakArea || 'mis temas'}.
3. Dame 5 ejercicios de ALTA DIFICULTAD (D8-D10) para retarme.
4. ¿Cómo mantengo este ritmo sin perder la precisión por exceso de confianza?
`.trim(),

  // 🆕 Gap Attack (Para avanzados con brechas específicas)
  gap_attack: (profile: UserProfileData, context: AdaptiveContext) => `
[ROL: Especialista en Análisis de Errores Psicopedagógicos]
Soy un estudiante avanzado, pero tengo brechas (gaps) que me impiden llegar al puntaje máximo.

PERFIL:
- MMR: ${profile.globalMMR} | Estimado de practica: ${context.icfesEstimate.score}/500
- Fortalezas: ${profile.strongAreas.map(a => a.name).join(', ')}
- Brecha Crítica: ${context.topWeakArea || 'Temas específicos'}

TAREA DE PRECISIÓN:
1. Analiza por qué un estudiante de mi nivel suele fallar en ${context.topWeakArea || 'mis temas débiles'}.
2. Dame el "mapa conceptual" de las trampas más comunes en este tema.
3. Genera 5 preguntas tipo Saber 11 diseñadas para detectar si ya superé ese gap.
4. Dame una técnica avanzada de estudio para cerrar esta brecha en menos de 3 horas.
`.trim(),

  // 🆕 Elite Refinement (Para los mejores)
  elite_refinement: (profile: UserProfileData, context: AdaptiveContext) => `
[ROL: Mentor Olímpico Saber 11 - Objetivo 450+]
Mi meta es la excelencia total y un puntaje superior a 450/500.

MÉTRICAS DE ÉLITE:
- MMR: ${profile.globalMMR}
- Consistencia: ${context.consistencyScore}/100
- Velocidad: ${context.speedProfile}

REFINAMIENTO:
1. ¿Qué separa a un puntaje 420 de un 480? Dame los detalles técnicos.
2. Analiza mi consistencia actual y dime cómo evitar errores tontos por falta de atención.
3. Técnicas avanzadas de descarte en Lectura Crítica y Sociales.
4. ¿Cómo optimizar mi energía en la segunda sesión del examen real?
`.trim(),
};

// =============================================================================
// LÓGICA DE ADAPTACIÓN
// =============================================================================

/**
 * Clasifica al usuario en un arquetipo basado en su historial y métricas
 */
export function classifyLearnerArchetype(profile: UserProfileData): LearnerArchetype {
  const { totalQuestions, globalMMR, globalAccuracy, advancedMetrics, recentHistory } = profile;
  const consistency = advancedMetrics?.consistencyScore || 50;

  // 1. Sprint Final (Mockeado por ahora)
  // if (context.daysLeft < 30) return 'sprint_final';

  // 2. Novatos
  if (totalQuestions < 20) return 'novice_consolidating';

  // 3. Regresión (Caída de MMR importante)
  if (recentHistory && recentHistory.length >= 10) {
    const recent = recentHistory.slice(-5);
    const older = recentHistory.slice(-10, -5);
    if (recent.length > 0 && older.length > 0) {
      const avgRecent = recent.reduce((sum, h) => sum + h.mmr, 0) / recent.length;
      const avgOlder = older.reduce((sum, h) => sum + h.mmr, 0) / older.length;
      if (avgRecent - avgOlder < -30) return 'regressing';
    }
  }

  // 4. Élite / Avanzado Consistente
  if (globalMMR >= 1400 && consistency >= 75) return 'advanced_consistent';

  // 5. Avanzado con brechas
  if (globalMMR >= 1200 && profile.weakAreas.length > 0) return 'advanced_with_gaps';

  // 6. En ascenso (Momentum positivo)
  if (recentHistory && recentHistory.length >= 5) {
     const last = recentHistory[recentHistory.length - 1].mmr;
     const first = recentHistory[recentHistory.length - 5].mmr;
     if (last - first > 20) return 'intermediate_rising';
  }

  // 7. Slow Starter (Mucho volumen, baja precisión)
  if (totalQuestions > 100 && globalAccuracy < 0.45) return 'slow_starter';

  return 'intermediate_rising'; // Default
}

/**
 * Calcula el contexto adaptativo completo para la generación de prompts
 */
export function computeAdaptiveContext(profile: UserProfileData): AdaptiveContext {
  const archetype = classifyLearnerArchetype(profile);

  // Calcular Momentum
  let momentum: 'rising' | 'stable' | 'falling' = 'stable';
  if (profile.recentHistory && profile.recentHistory.length >= 6) {
    const last3 = profile.recentHistory.slice(-3).reduce((s, h) => s + h.mmr, 0) / 3;
    const prev3 = profile.recentHistory.slice(-6, -3).reduce((s, h) => s + h.mmr, 0) / 3;
    const diff = last3 - prev3;
    if (diff > 15) momentum = 'rising';
    else if (diff < -15) momentum = 'falling';
  }

  // Calcular Perfil de Velocidad
  let speedProfile: 'balanced' | 'impulsive' | 'overthinker' = 'balanced';
  if (profile.advancedMetrics) {
    const diff = profile.advancedMetrics.avgTimeIncorrect - profile.advancedMetrics.avgTimeCorrect;
    if (diff < -5000) speedProfile = 'impulsive';
    if (diff > 10000) speedProfile = 'overthinker';
  }

  return {
    archetype,
    momentum,
    speedProfile,
    consistencyScore: profile.advancedMetrics?.consistencyScore || 0,
    icfesEstimate: profile.icfesEstimate || ({ score: Math.round(170 + (profile.globalAccuracy * 180)), label: 'Resultado provisional', confidence: 'low', evidenceCount: profile.totalQuestions, methodologyVersion: 'fallback', minimumEvidenceMet: false, disclaimer: '' } as IcfesEstimate),
    totalQuestionsAnswered: profile.totalQuestions,
    topWeakArea: profile.weakAreas[0]?.name,
    topStrongSubject: profile.strongAreas[0]?.name
  };
}

// =============================================================================
// FUNCIONES PRINCIPALES
// =============================================================================

/**
 * Genera un prompt basado en el resultado de un examen
 */
export function generateExamPrompt(data: ExamResultData): string {
  return PROMPT_TEMPLATES.exam_result(data);
}

/**
 * Genera un prompt de plan de mejora basado en el perfil del usuario
 */
export function generateImprovementPrompt(profile: UserProfileData): string {
  return PROMPT_TEMPLATES.improvement_plan(profile);
}

/**
 * Genera un prompt enfocado en una materia específica
 */
export function generateSubjectPrompt(subject: string, accuracy: number, topics?: string[]): string {
  return PROMPT_TEMPLATES.subject_focus(subject, accuracy, topics);
}

/**
 * Genera un prompt de repaso rápido
 */
export function generateQuickReviewPrompt(subject: string, topics: string[]): string {
  return PROMPT_TEMPLATES.quick_review(subject, topics);
}

/**
 * Genera un prompt específico para NotebookLM (Setup inicial)
 */
export function generateNotebookLMPrompt(profile: UserProfileData): string {
  return PROMPT_TEMPLATES.notebooklm(profile);
}

/**
 * Genera un prompt de actualización para NotebookLM
 */
export function generateNotebookLMUpdatePrompt(profile: UserProfileData): string {
  return PROMPT_TEMPLATES.notebooklm_update(profile);
}

/**
 * Genera un prompt para el Modo Estudio de ChatGPT
 */
export function generateChatGPTStudyPrompt(profile: UserProfileData): string {
  return PROMPT_TEMPLATES.chatgpt_study_mode(profile);
}

/**
 * Genera un prompt para consejos meta-cognitivos
 */
export function generateStudyTipsPrompt(profile: UserProfileData): string {
  return PROMPT_TEMPLATES.study_tips(profile);
}

/**
 * Genera el prompt más adecuado según el contexto adaptativo del usuario
 */
export function generateAdaptiveAutoPrompt(profile: UserProfileData): string {
  const context = computeAdaptiveContext(profile);
  
  switch (context.archetype) {
    case 'regressing':
    case 'slow_starter':
      return PROMPT_TEMPLATES.rescue_plan(profile, context);
    case 'intermediate_rising':
      return PROMPT_TEMPLATES.momentum_boost(profile, context);
    case 'advanced_with_gaps':
      return PROMPT_TEMPLATES.gap_attack(profile, context);
    case 'advanced_consistent':
      return PROMPT_TEMPLATES.elite_refinement(profile, context);
    case 'sprint_final':
      return PROMPT_TEMPLATES.sprint_protocol(profile, context);
    case 'novice_consolidating':
    default:
      return PROMPT_TEMPLATES.improvement_plan(profile);
  }
}

/**
 * Genera un prompt genérico por tipo
 */
export function generatePrompt(
  type: PromptType,
  data: ExamResultData | UserProfileData | { subject: string; accuracy: number; topics?: string[] }
): string {
  const profile = data as UserProfileData;
  const context = (type !== 'exam_result' && type !== 'subject_focus' && type !== 'quick_review' && type !== 'preu_generation') 
    ? computeAdaptiveContext(profile) 
    : null;

  switch (type) {
    case 'exam_result':
      return PROMPT_TEMPLATES.exam_result(data as ExamResultData);
    case 'improvement_plan':
      return PROMPT_TEMPLATES.improvement_plan(profile);
    case 'notebooklm':
      return PROMPT_TEMPLATES.notebooklm(profile);
    case 'notebooklm_update':
      return PROMPT_TEMPLATES.notebooklm_update(profile);
    case 'chatgpt_study_mode':
      return PROMPT_TEMPLATES.chatgpt_study_mode(profile);
    case 'study_tips':
      return PROMPT_TEMPLATES.study_tips(profile);
    case 'adaptive_auto':
      return generateAdaptiveAutoPrompt(profile);
    case 'rescue_plan':
      return context ? PROMPT_TEMPLATES.rescue_plan(profile, context) : '';
    case 'momentum_boost':
      return context ? PROMPT_TEMPLATES.momentum_boost(profile, context) : '';
    case 'gap_attack':
      return context ? PROMPT_TEMPLATES.gap_attack(profile, context) : '';
    case 'elite_refinement':
      return context ? PROMPT_TEMPLATES.elite_refinement(profile, context) : '';
    case 'sprint_protocol':
      return context ? PROMPT_TEMPLATES.sprint_protocol(profile, context) : '';
    case 'preu_generation': {
      const d = data as unknown as { subject: string; specific_topic: string };
      return PROMPT_TEMPLATES.preu_generation(d.subject, d.specific_topic);
    }
    case 'subject_focus': {
      const d = data as { subject: string; accuracy: number; topics?: string[] };
      return PROMPT_TEMPLATES.subject_focus(d.subject, d.accuracy, d.topics);
    }
    case 'quick_review': {
      const d = data as { subject: string; topics: string[] };
      return PROMPT_TEMPLATES.quick_review(d.subject, d.topics || []);
    }
    default:
      return '';
  }
}

// =============================================================================
// UTILIDADES
// =============================================================================

/**
 * Copia un prompt al portapapeles
 */
export async function copyPromptToClipboard(prompt: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(prompt);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed to copy prompt:', err);
    return false;
  }
}

/**
 * Extrae temas de un array de preguntas basado en correctas/incorrectas
 */
export function extractTopicsFromQuestions(
  questions: { category: string; isCorrect: boolean }[]
): { weakTopics: string[]; strongTopics: string[] } {
  const topicStats: Record<string, { correct: number; total: number }> = {};

  questions.forEach(q => {
    const topic = q.category.split('::')[1]?.trim() || q.category;
    if (!topicStats[topic]) {
      topicStats[topic] = { correct: 0, total: 0 };
    }
    topicStats[topic].total++;
    if (q.isCorrect) topicStats[topic].correct++;
  });

  const weakTopics: string[] = [];
  const strongTopics: string[] = [];

  Object.entries(topicStats).forEach(([topic, stats]) => {
    const accuracy = stats.correct / stats.total;
    if (accuracy < 0.5) {
      weakTopics.push(topic);
    } else if (accuracy >= 0.8) {
      strongTopics.push(topic);
    }
  });

  return { weakTopics, strongTopics };
}
