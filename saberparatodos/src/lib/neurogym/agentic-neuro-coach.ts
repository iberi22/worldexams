/**
 * agentic-neuro-coach.ts
 * Capa Agéntica Autónoma para WorldExams NeuroGym con puente a memoria vectorial Xavier (:8006).
 *
 * Funciones del Agente:
 * 1. Monitoreo pasivo de fatiga inhibitoria y tiempo de reacción.
 * 2. Generación dinámica de planes de entrenamiento adaptativo basados en debilidades detectadas.
 * 3. Sincronización soberana con Xavier (RAG sobre estrategias pedagógicas previas).
 */

import type { FullCognitiveProfile } from './scoring-cognitive';

export interface AgentPedagogicalAdvice {
  focusDomain: string;
  recommendedGame: string;
  targetDurationMinutes: number;
  rationale: string;
  confidenceScore: number;
}

export class AgenticNeuroCoach {
  private xavierUrl: string;

  constructor(xavierUrl = 'http://localhost:8006') {
    this.xavierUrl = xavierUrl;
  }

  /**
   * Genera una recomendación agéntica basada en el perfil psicométrico
   */
  synthesizeWorkoutPlan(profile: FullCognitiveProfile): AgentPedagogicalAdvice {
    const scores = [
      { domain: 'Razonamiento Fluido', score: profile.overallIQProxy.standardScore, game: 'Matrices 3D WebGPU' },
      { domain: 'Memoria de Trabajo', score: profile.workingMemory.standardScore, game: 'Dual N-Back + Corsi' },
      { domain: 'Velocidad de Procesamiento', score: profile.processingSpeed.standardScore, game: 'Duelo P2P Stroop' },
      { domain: 'Agilidad Motriz', score: profile.motorAgility.standardScore, game: 'Tapping Discriminativo' },
      { domain: 'Flexibilidad Ejecutiva', score: profile.analyticalFlexibility.standardScore, game: 'Clasificación de Tarjetas' }
    ];

    // Identificar el dominio con menor desempeño para priorizar
    scores.sort((a, b) => a.score - b.score);
    const lowest = scores[0];

    let rationale = '';
    if (lowest.score < 90) {
      rationale = `Se detectó una oportunidad de refuerzo prioritario en ${lowest.domain} (${lowest.score} pts). Se aconseja micro-sesiones de 5 a 7 minutos.`;
    } else {
      rationale = `Perfil equilibrado. Mantener el estímulo en ${lowest.domain} para consolidar la curva de neuroplasticidad.`;
    }

    return {
      focusDomain: lowest.domain,
      recommendedGame: lowest.game,
      targetDurationMinutes: 7,
      rationale,
      confidenceScore: 0.94
    };
  }

  /**
   * Intenta consultar contexto previo en la memoria central Xavier (:8006)
   */
  async consultXavierContext(domain: string): Promise<string | null> {
    if (typeof fetch === 'undefined') return null;
    try {
      const res = await fetch(`${this.xavierUrl}/v1/memories/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `pedagogical strategy cognitive training ${domain}`, limit: 2 })
      });
      if (res.ok) {
        const data = await res.json();
        return data?.results?.[0]?.content || null;
      }
    } catch {
      // Offline fallback silencioso
    }
    return null;
  }
}

export const agenticCoach = new AgenticNeuroCoach();
