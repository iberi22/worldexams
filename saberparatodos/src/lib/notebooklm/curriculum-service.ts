/**
 * 🧠 Specialized Curriculum Service for NotebookLM
 *
 * Generates personalized study plans suitable for importing into NotebookLM
 * logic based on exam results and CEFR deficiencies.
 */

import { CEFR_CURRICULUM, type StudyTopic } from './cefr-data';
import {
  CEFR_LEVELS,

  type EnglishProficiencyResult
} from '../english-proficiency';

export interface StudyModule {
  week: number;
  title: string;
  focus: string;
  topics: StudyTopic[];
  notebookPrompt: string; // The "System Prompt" for this specific module
}

export interface NotebookStudyPlan {
  period: string; // e.g. "4 Weeks"
  currentLevel: string;
  targetLevel: string;
  modules: StudyModule[];
  generalSystemPrompt: string; // Prompt for the entire notebook
  sourceContent: string; // Markdown content to upload as source
}

/**
 * Generate a personalized study plan based on proficiency results
 */
export function generateStudyPlan(
  result: EnglishProficiencyResult
): NotebookStudyPlan {
  const currentLevel = result.estimatedLevel;
  const currentLevelNum = result.estimatedLevelNum;

  // Determine target level (usually next full level)
  const targetLevelNum = Math.min(currentLevelNum + 2, 9); // Aim 2 steps higher (e.g. A2 -> B1)
  const targetLevel = CEFR_LEVELS[targetLevelNum - 1]; // -1 because array is 0-indexed

  const modules: StudyModule[] = [];
  let weekCounter = 1;

  // 1. Module based on Weaknesses (Immediate Priorities)
  // Identify weakness levels from result
  if (result.weaknessLevels.length > 0 || (result.failedTopics && result.failedTopics.length > 0)) {
    const weaknessTopics: StudyTopic[] = [];

    // Collect topics for each weakness level
    for (const level of result.weaknessLevels) {
      const levelData = CEFR_CURRICULUM[level];
      if (levelData) {
        weaknessTopics.push(...levelData.topics);
      }
    }

    const hasSpecificFailed = result.failedTopics && result.failedTopics.length > 0;
    const specificFailedSnippet = hasSpecificFailed ? `\n\n**🎯 ATENCIÓN ESPECIAL**: El historial indica errores frecuentes en estos temas específicos: **${result.failedTopics.join(', ')}**.` : '';
    const errorFocus = hasSpecificFailed ? ` (Foco en: ${result.failedTopics.slice(0,2).join(', ')})` : '';

    if (weaknessTopics.length > 0 || hasSpecificFailed) {
      // Limit to 3 priority topics per module to avoid overwhelming
      const selectedTopics = weaknessTopics.slice(0, 3);
      const cefrTopicsText = selectedTopics.length > 0 ? `los conceptos de **${selectedTopics.map(t => t.title).join(', ')}**` : `los temas base`;

      modules.push({
        week: weekCounter++,
        title: 'Módulo de Recuperación y Refuerzo' + errorFocus,
        focus: `Fortalecer bases de nivel ${result.weaknessLevels.join(', ') || 'Actual'}.`,
        topics: selectedTopics,
        notebookPrompt: `[ROL: Experto en Remediación de Inglés]
El estudiante tiene dificultades específicas en el nivel **${result.weaknessLevels.join(', ') || currentLevel}**.${specificFailedSnippet}

Tus objetivos son:
1. Explicar ${cefrTopicsText} usando analogías simples.
2. Identificar por qué el estudiante suele fallar en estos temas (errores comunes).
3. Generar 3 ejercicios de práctica intensiva para estos temas específicos.
Sé motivador pero riguroso con la corrección de errores.`
      });
    }
  }

  // 2. Module for Current Level Consolidation
  // Use current level topics
  const currentData = CEFR_CURRICULUM[currentLevel];
  if (currentData) {
    modules.push({
      week: weekCounter++,
      title: `Consolidación del Nivel ${currentLevel}`,
      focus: 'Dominar las habilidades actuales antes de avanzar.',
      topics: currentData.topics,
      notebookPrompt: `Actúa como un profesor exigente para nivel ${currentLevel}. Practica estos temas: ${currentData.topics.map(t => t.title).join(', ')}. Dame ejercicios prácticos.`
    });
  }

  // 3. Module for Next Level (Challenge)
  // Find next level topics
  if (currentLevelNum < 9) {
    const nextLevel = CEFR_LEVELS[currentLevelNum]; // Next one in array
    const nextData = CEFR_CURRICULUM[nextLevel];

    if (nextData) {
      modules.push({
        week: weekCounter++,
        title: `Desafío de Nivel Superior (${nextLevel})`,
        focus: 'Introducción a conceptos avanzados para acelerar el aprendizaje.',
        topics: nextData.topics,
        notebookPrompt: `[ROL: Coach de Alto Rendimiento]
Vamos a llevar al estudiante al siguiente nivel: **${nextLevel}**.
Introduce estos conceptos avanzados de forma desafiante pero accesible: **${nextData.topics.map(t => t.title).join(', ')}**.
Usa contextos de negocios, viajes o académicos para mostrar la utilidad real de estos temas.
Desafía al estudiante con una pregunta de pensamiento crítico.`
      });
    }
  }

  // generate source content
  const sourceContent = formatMarkdownSource(result, modules, targetLevel);

  return {
    period: `${weekCounter - 1} Semanas`,
    currentLevel,
    targetLevel,
    modules,
    generalSystemPrompt: `Eres un Tutor Inteligente de Inglés basado en el Marco Común Europeo (CEFR). El estudiante está en nivel ${currentLevel} y quiere llegar a ${targetLevel}. Usa el Plan de Estudio proporcionado para guiar las sesiones. Sé proactivo, corrige errores amablemente y da ejemplos contextualizados en Colombia.`,
    sourceContent
  };
}

/**
 * Format the plan as a Markdown string suitable for NotebookLM source
 */
function formatMarkdownSource(
  result: EnglishProficiencyResult,
  modules: StudyModule[],
  targetLevel: string
): string {
  const date = new Date().toLocaleDateString('es-CO');

  let md = `# 🎓 Plan de Estudio Personalizado: Inglés
**Fecha**: ${date}
**Nivel Diagnóstico**: ${result.estimatedLevel} (${result.estimatedLevelNum}/9)
**Meta**: ${targetLevel}

---

## 📊 Perfil del Estudiante

Según tu reciente diagnóstico, tienes un dominio sólido en niveles **${result.strengthLevels.join(', ') || 'Iniciales'}**, pero necesitas reforzar áreas en **${result.weaknessLevels.join(', ') || 'Niveles superiores'}**.
Tu precisión general fue del **${result.overallAccuracy}%**.
${result.failedTopics && result.failedTopics.length > 0 ? `\n**Temas Críticos a Mejorar**: ${result.failedTopics.join(', ')}` : ''}

---

## 🗺️ Ruta de Aprendizaje (${modules.length} Semanas)

Este plan está diseñado para llevarte del nivel ${result.estimatedLevel} al ${targetLevel}.
Copia el contenido de cada semana en el chat de NotebookLM para iniciar tu sesión de práctica.

`;

  modules.forEach(mod => {
    md += `### 📅 Semana ${mod.week}: ${mod.title}
**Enfoque**: ${mod.focus}

#### Temas a Estudiar:
`;

    mod.topics.forEach(topic => {
      md += `- **${topic.title}** (${topic.category}): ${topic.description}\n`;
    });

    md += `
#### 🧪 Prompt para el Chat (Copia y pega esto):
> "${mod.notebookPrompt} Dame una explicación breve de los temas de esta semana y luego hazme 3 preguntas tipo quiz para verificar mi comprensión."

---
`;
  });

  md += `
## 📚 Recursos Teóricos de Apoyo

`;

  // Append detailed theory for all topics in the plan
  // This gives NotebookLM the "Knowledge Base" to answer questions
  modules.forEach(mod => {
    mod.topics.forEach(topic => {
      md += `### 📖 ${topic.title} (${topic.category})
${topic.description}

**Concepto Clave**:
Para dominar este tema, es importante entender el contexto de uso.
${topic.prompt}

**Ejemplo Práctico**:
Pide a la IA: "Dame ejemplos de ${topic.title} en un contexto de viajes/trabajo".

---
`;
    });
  });

  return md;
}
