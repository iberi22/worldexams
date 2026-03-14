/**
 * 📚 CEFR Curriculum Data
 *
 * Maps CEFR levels to specific study topics, grammar points, and vocabulary themes.
 * Used to generate personalized study plans for NotebookLM.
 */

import type { CEFRLevel } from '../english-proficiency';

export interface StudyTopic {
  id: string;
  title: string;
  description: string;
  category: 'Grammar' | 'Vocabulary' | 'Skills' | 'Functions';
  prompt: string; // Prompt for NotebookLM to teach this
}

export interface CefrLevelData {
  level: CEFRLevel;
  description: string;
  canDo: string[];
  topics: StudyTopic[];
}

export const CEFR_CURRICULUM: Record<CEFRLevel, CefrLevelData> = {
  'A1': {
    level: 'A1',
    description: 'Básico - Acceso',
    canDo: [
      'Entender y usar expresiones cotidianas muy frecuentes.',
      'Presentarse a sí mismo y a otros.',
      'Pedir y dar información personal básica (domicilio, pertenencias).'
    ],
    topics: [
      {
        id: 'A1-GRAM-TOBE',
        title: 'Verbo To Be',
        description: 'Ser o estar en presente simple.',
        category: 'Grammar',
        prompt: 'Actúa como un profesor de inglés para principiantes. Explícame el verbo "To Be" con ejemplos simples de la vida diaria (presentaciones, profesiones).'
      },
      {
        id: 'A1-VOCAB-FAMILY',
        title: 'Familia y Personas',
        description: 'Vocabulario básico de miembros de la familia.',
        category: 'Vocabulary',
        prompt: 'Crea una lista de vocabulario de la familia en inglés (Padre, madre, hermano, etc.) y úsala en 5 oraciones simples.'
      },
      {
        id: 'A1-FUNC-GREET',
        title: 'Saludos y Despedidas',
        description: 'Cómo iniciar y terminar conversaciones.',
        category: 'Functions',
        prompt: 'Enséñame 5 formas de saludar y 5 formas de despedirse en inglés, desde lo formal a lo informal.'
      }
    ]
  },
  'A1+': {
    level: 'A1+',
    description: 'Básico - Plataforma',
    canDo: [
      'Comunicarse en tareas sencillas y habituales.',
      'Describir su entorno inmediato de manera simple.',
      'Usar conectores básicos (and, but).'
    ],
    topics: [
      {
        id: 'A1P-GRAM-PRES-SIMPLE',
        title: 'Presente Simple',
        description: 'Hárbitos y rutinas diarias.',
        category: 'Grammar',
        prompt: 'Explícame el Presente Simple en inglés para hablar de rutinas. Incluye la regla de la tercera persona (he/she/it).'
      },
      {
        id: 'A1P-VOCAB-ROUTINE',
        title: 'Rutina Diaria',
        description: 'Verbos de acción comunes.',
        category: 'Vocabulary',
        prompt: 'Lista 10 verbos comunes para la rutina diaria (wake up, eat, work) y crea un texto corto describiendo un día típico.'
      }
    ]
  },
  'A2': {
    level: 'A2',
    description: 'Básico - Plataforma (Consolidación)',
    canDo: [
      'Comprender frases y expresiones de uso frecuente (compras, lugares, empleo).',
      'Comunicarse sobre tareas simples y cotidianas.',
      'Describir en términos sencillos aspectos de su pasado.'
    ],
    topics: [
      {
        id: 'A2-GRAM-PAST',
        title: 'Pasado Simple (Regulares e Irregulares)',
        description: 'Narrar eventos terminados en el pasado.',
        category: 'Grammar',
        prompt: 'Explícame el Pasado Simple. Diferencia entre verbos regulares (-ed) e irregulares con una tabla de los 20 más comunes.'
      },
      {
        id: 'A2-GRAM-FUT',
        title: 'Futuro con Going To',
        description: 'Planes e intenciones futuras.',
        category: 'Grammar',
        prompt: '¿Cómo uso "Going to" para hablar de mis planes futuros? Dame ejemplos de planes para el fin de semana.'
      },
      {
        id: 'A2-SKILLS-SHOP',
        title: 'De Compras',
        description: 'Interactuar en tiendas y restaurantes.',
        category: 'Functions',
        prompt: 'Crea un diálogo entre un cliente y un vendedor en una tienda de ropa. Incluye preguntas sobre precio, talla y color.'
      }
    ]
  },
  'A2+': {
    level: 'A2+',
    description: 'Básico - Umbral Básico',
    canDo: [
      'Participar en conversaciones breves sobre temas de interés.',
      'Escribir notas y mensajes breves y sencillos.',
      'Entender las ideas principales de textos claros.'
    ],
    topics: [
      {
        id: 'A2P-GRAM-PRES-CONT',
        title: 'Presente Continuo vs Simple',
        description: 'Diferenciar acciones en curso de rutinas.',
        category: 'Grammar',
        prompt: 'Ayúdame a diferenciar cuándo usar Presente Simple y cuándo Presente Continuo. Dame ejercicios de contraste.'
      },
      {
        id: 'A2P-VOCAB-TRAVEL',
        title: 'Viajes y Transporte',
        description: 'Vocabulario para moverse en el extranjero.',
        category: 'Vocabulary',
        prompt: 'Genera una guía de vocabulario esencial para viajar en aeropuerto, tren y hotel.'
      }
    ]
  },
  'B1': {
    level: 'B1',
    description: 'Intermedio - Umbral',
    canDo: [
      'Comprender los puntos principales de textos claros en lengua estándar.',
      'Describir experiencias, acontecimientos, deseos y aspiraciones.',
      'Justificar brevemente sus opiniones o explicar sus planes.'
    ],
    topics: [
      {
        id: 'B1-GRAM-PRES-PERF',
        title: 'Presente Perfecto',
        description: 'Experiencias de vida y acciones recientes.',
        category: 'Grammar',
        prompt: 'Explícame el Presente Perfecto (Have/Has + Participio). ¿En qué se diferencia del Pasado Simple? Usa ejemplos de experiencias de vida.'
      },
      {
        id: 'B1-GRAM-MODALS',
        title: 'Verbos Modales (Consejo y Obligación)',
        description: 'Should, Must, Have to.',
        category: 'Grammar',
        prompt: '¿Cuál es la diferencia entre Should, Must y Have to? Explica los matices de obligación y consejo.'
      },
      {
        id: 'B1-SKILLS-OPINION',
        title: 'Dar Opiniones',
        description: 'Expresar acuerdo, desacuerdo y preferencias.',
        category: 'Functions',
        prompt: 'Dame frases útiles para expresar mi opinión (I think, In my view) y para estar de acuerdo o en desacuerdo educadamente.'
      }
    ]
  },
  'B1+': {
    level: 'B1+',
    description: 'Intermedio - Umbral Fuerte',
    canDo: [
      'Desenvolverse en la mayoría de situaciones que pueden surgir durante un viaje.',
      'Producir textos sencillos y coherentes sobre temas conocidos.',
      'Describir experiencias con detalle.'
    ],
    topics: [
      {
        id: 'B1P-GRAM-COND-1-2',
        title: 'Condicionales 1 y 2',
        description: 'Situaciones reales e hipotéticas.',
        category: 'Grammar',
        prompt: 'Enséñame el Primer y Segundo Condicional. ¿Cuándo es una posibilidad real y cuándo es imaginaria?'
      },
      {
        id: 'B1P-VOCAB-WORK',
        title: 'Inglés para el Trabajo',
        description: 'Vocabulario básico de negocios y oficina.',
        category: 'Vocabulary',
        prompt: 'Crea una lista de vocabulario para un entorno de oficina y frases para escribir emails formales básicos.'
      }
    ]
  },
  'B2': {
    level: 'B2',
    description: 'Intermedio Alto - Avanzado',
    canDo: [
      'Entender las ideas principales de textos complejos abstractos o técnicos.',
      'Relacionarse con hablantes nativos con fluidez y naturalidad suficiente.',
      'Producir textos claros y detallados sobre temas diversos.'
    ],
    topics: [
      {
        id: 'B2-GRAM-PASSIVE',
        title: 'Voz Pasiva',
        description: 'Enfocar la acción en el objeto.',
        category: 'Grammar',
        prompt: 'Explica la Voz Pasiva en inglés. ¿Cómo transformo oraciones activas a pasivas en diferentes tiempos verbales?'
      },
      {
        id: 'B2-GRAM-COND-3',
        title: 'Tercer Condicional',
        description: 'Situaciones hipotéticas en el pasado (arrepentimientos).',
        category: 'Grammar',
        prompt: 'Explícame el Tercer Condicional para hablar de cosas que no sucedieron en el pasado. Dame 5 ejemplos.'
      },
      {
        id: 'B2-SKILLS-DEBATE',
        title: 'Argumentación y Debate',
        description: 'Conectar ideas y persuadir.',
        category: 'Functions',
        prompt: 'Dame conectores avanzados (However, Furthermore, Consequently) para estructurar argumentos en un ensayo o debate.'
      }
    ]
  },
  'B2+': {
    level: 'B2+',
    description: 'Intermedio Alto Fuerte (Pre-Avanzado)',
    canDo: [
      'Comunicarse con gran fluidez y precisión.',
      'Adaptar el registro (formal/informal) según la situación.',
      'Comprender textos literarios y técnicos extensos.'
    ],
    topics: [
      {
        id: 'B2P-GRAM-ADV',
        title: 'Gramática Avanzada (Inversión, Cleft Sentences)',
        description: 'Estructuras para énfasis y estilo formal.',
        category: 'Grammar',
        prompt: 'Enséñame estructuras avanzadas como la Inversión ("Never have I...") y Cleft Sentences para dar énfasis.'
      },
      {
        id: 'B2P-VOCAB-IDIOMS',
        title: 'Idioms y Phrasal Verbs Avanzados',
        description: 'Expresiones nativas complejas.',
        category: 'Vocabulary',
        prompt: 'Dame una lista de 10 Phrasal Verbs avanzados y 5 Idioms comunes en contextos de negocios o académicos.'
      }
    ]
  },
  'C1': {
    level: 'C1',
    description: 'Avanzado - Competencia Eficaz',
    canDo: [
      'Comprender una amplia variedad de textos extensos y exigentes.',
      'Expresarse de forma fluida y espontánea sin esfuerzo aparente.',
      'Usar el idioma de manera flexible y efectiva para fines sociales, académicos y profesionales.'
    ],
    topics: [
      {
        id: 'C1-STYLE',
        title: 'Estilo y Matices',
        description: 'Refinar el tono y la precisión.',
        category: 'Skills',
        prompt: 'Actúa como un editor experto. Dame consejos para mejorar mi estilo de escritura académica en inglés y evitar repeticiones.'
      }
    ]
  }
};
