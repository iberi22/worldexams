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

export type PromptType = 'exam_result' | 'improvement_plan' | 'subject_focus' | 'quick_review' | 'notebooklm' | 'notebooklm_update';

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

  // Para NotebookLM
  notebooklm: (profile: UserProfileData) => {
    // Calcular Perfil de Velocidad
    let speedProfile = "Ritmo balanceado.";
    if (profile.advancedMetrics) {
      const diff = profile.advancedMetrics.avgTimeIncorrect - profile.advancedMetrics.avgTimeCorrect;
      if (diff < -5000) speedProfile = "Pensador Impulsivo (Responde preguntas incorrectas muy rápido). Necesita estrategias de pausa.";
      if (diff > 5000) speedProfile = "Sobre-analítico en errores (Se bloquea en preguntas que no sabe). Necesita gestión de tiempo.";
    }

    return `
INSTRUCCIONES PARA CREAR MI CUADERNO DE ESTUDIO INTELIGENTE:

Soy un estudiante colombiano preparándome para las Pruebas de Estado Saber 11.
Este es mi perfil cognitivo detallado:

📊 **MÉTRICAS DE RENDIMIENTO:**
- Nivel Actual: ${profile.rankTitle} (MMR: ${profile.globalMMR})
- Precisión Global: ${Math.round(profile.globalAccuracy * 100)}%
- Total Preguntas Respondidas: ${profile.totalQuestions}
${profile.advancedMetrics ? `- Consistencia: ${profile.advancedMetrics.consistencyScore}/100` : ''}
${profile.advancedMetrics ? `- Perfil de Velocidad: ${speedProfile}` : ''}

🔴 **ÁREAS CRÍTICAS (DEBILIDADES):**
${profile.weakAreas.map(a => `- ${a.name} (Precisión: ${Math.round(a.accuracy * 100)}%)`).join('\n')}

${profile.strongAreas.length > 0 ? `🟢 **FORTALEZAS:**\n${profile.strongAreas.map(a => `- ${a.name} (Precisión: ${Math.round(a.accuracy * 100)}%)`).join('\n')}` : ''}

---

📚 **FUENTES RECOMENDADAS PARA AGREGAR:**
1. Esta URL como fuente principal: https://saberparatodos.space/notebooklm
2. API con datos estructurados: https://saberparatodos.space/api/notebooklm-source.json

---

Por favor, actúa como un **Tutor Experto en Pruebas de Estado** y utiliza las fuentes de este cuaderno para generar:

1. **DIAGNÓSTICO ESTRATÉGICO**
   - Analiza por qué estoy fallando en mis áreas críticas basándote en mi perfil.
   - Si soy "Impulsivo", dame estrategias para leer despacio.
   - Si soy "Sobre-analítico", tips de descarte rápido y gestión de tiempo.

2. **PLAN DE CHOQUE SEMANAL**
   - Diseña una rutina de estudio de 5 días enfocada SOLO en mis debilidades.
   - Prioriza los temas donde mi precisión es menor al 40%.
   - Incluye tiempos específicos (ej: "Lunes 30min: Algebra lineal").

3. **EJERCICIOS DE ENTRENAMIENTO**
   - Genera 3 preguntas tipo Pruebas de Estado para CADA área crítica.
   - **IMPORTANTE:** Incluye la explicación detallada de por qué la respuesta correcta es la correcta.
   - Indica el nivel de dificultad (1-5).

4. **MATERIAL DE REPASO**
   - Crea 5 Flashcards conceptuales para mis temas débiles.
   - Un resumen de "Trampas Comunes" que debo evitar en estos temas.

🎯 **META:** Subir mi precisión global del ${Math.round(profile.globalAccuracy * 100)}% al ${Math.min(95, Math.round(profile.globalAccuracy * 100) + 15)}% en las próximas 2 semanas.`.trim();
  },

  // Actualización NotebookLM
  notebooklm_update: (profile: UserProfileData) => `
🚨 ACTUALIZACIÓN DE MI PLAN DE ESTUDIO [${new Date().toLocaleDateString()}]

NotebookLM, he realizado nuevos exámenes de práctica y estos son mis resultados recientes.
Por favor, **actualiza mi plan de estudio** integrando esta nueva información.

❌ **Nuevas Áreas Críticas Detectadas:**
${profile.weakAreas.map(a => `- ${a.name} (Precisión: ${Math.round(a.accuracy * 100)}%)`).join('\n')}

INSTRUCCIONES DE ACTUALIZACIÓN:
1. **Re-prioriza el plan de estudio**: Dale máxima prioridad a estos temas críticos nuevos.
2. **Genera nuevos ejercicios**: Crea 3 preguntas nuevas tipo Pruebas de Estado específicamente para estos temas.
3. **Identifica patrones**: ¿Ves alguna relación entre estos errores y mis fallos anteriores?
4. **Resumen Express**: Explícame brevemente el concepto clave que probablemente estoy fallando en estos temas.

Mantén el contexto de mis sesiones anteriores, pero enfoca la próxima semana en estos puntos.`.trim(),
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
