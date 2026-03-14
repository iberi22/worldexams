/**
 * Local Prompt Service
 * Sistema simple de generación de prompts basado en resultados
 */

// =============================================================================
// TIPOS
// =============================================================================

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
  advancedMetrics?: {
    avgTimeCorrect: number;
    avgTimeIncorrect: number;
    consistencyScore: number;
  };
}

export type PromptType = 'exam_result' | 'improvement_plan' | 'subject_focus' | 'quick_review' | 'notebooklm' | 'notebooklm_update' | 'chatgpt_study_mode' | 'study_tips' | 'preu_generation';

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
Genera un bundle de 5 preguntas de alta complejidad (Nivel 5-10) sobre "${specific_topic}" para el área de ${subject}.

REQUISITOS TÉCNICOS:
1. **Dificultad Progresiva**: 2 preguntas Nivel 5-6 (Análisis), 2 preguntas Nivel 7-8 (Síntesis), 1 pregunta Nivel 9-10 (Evaluación crítica).
2. **Contexto Robusto**: Cada pregunta debe partir de un contexto denso (un párrafo, un fragmento de texto, o una descripción de un fenómeno/problema complejo).
3. **Taxonomía de Bloom**: Enfócate en procesos cognitivos superiores: analizar relaciones, sintetizar información de múltiples fuentes y evaluar validez de argumentos.
4. **Format LaTeX**: Usa KaTeX ($...$ para inline, $$...$$ para bloques) para toda expresión matemática o científica.
5. **Protocolo v4.1+**: Sigue la estructura de bundle con metadatos completos (ID, Bloom, Competencia).
6. **Distractores de Élite**: Las opciones incorrectas deben basarse en sesgos cognitivos comunes o errores de razonamiento lógico avanzados.

Si es de Matemáticas o Física, incluye al menos una pregunta que requiera **razonamiento espacial** o proyecciones mentales complejas.

Responde en formato Markdown compatible con el sistema local.
`.trim(),
};

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
 * Genera un prompt genérico por tipo
 */
export function generatePrompt(
  type: PromptType,
  data: ExamResultData | UserProfileData | { subject: string; accuracy: number; topics?: string[] }
): string {
  switch (type) {
    case 'exam_result':
      return PROMPT_TEMPLATES.exam_result(data as ExamResultData);
    case 'improvement_plan':
      return PROMPT_TEMPLATES.improvement_plan(data as UserProfileData);
    case 'notebooklm':
      return PROMPT_TEMPLATES.notebooklm(data as UserProfileData);
    case 'notebooklm_update':
      return PROMPT_TEMPLATES.notebooklm_update(data as UserProfileData);
    case 'chatgpt_study_mode':
      return PROMPT_TEMPLATES.chatgpt_study_mode(data as UserProfileData);
    case 'study_tips':
      return PROMPT_TEMPLATES.study_tips(data as UserProfileData);
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
    await navigator.clipboard.writeText(prompt);
    return true;
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
