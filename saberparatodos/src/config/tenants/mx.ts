/**
 * 🇲🇽 Configuración de México - EXANI / PLANEA
 */

import type { CountryConfig } from '../types';

export const mxConfig: CountryConfig = {
  code: 'MX',
  name: 'México',
  domain: 'worldexams.github.io/saber-mx',
  language: 'es-MX',
  currency: 'MXN',

  // Exámenes oficiales (Basado en PLANEA / EXANI)
  exams: {
    'Primaria': { grado: 6, asignaturas: ['Lenguaje y Comunicación', 'Matemáticas'] },
    'Secundaria': { grado: 9, asignaturas: ['Lenguaje y Comunicación', 'Matemáticas', 'Ciencias'] },
    'Media Superior (EXANI-I)': { grado: 10, asignaturas: ['Pensamiento Matemático', 'Pensamiento Analítico', 'Estructura de la Lengua', 'Comprensión Lectora'] },
    'Superior (EXANI-II)': { grado: 12, asignaturas: ['Pensamiento Matemático', 'Pensamiento Analítico', 'Estructura de la Lengua', 'Comprensión Lectora', 'Inglés'] }
  },

  gradeNames: {
    3: '3° Primaria',
    4: '4° Primaria',
    5: '5° Primaria',
    6: '6° Primaria',
    7: '1° Secundaria',
    8: '2° Secundaria',
    9: '3° Secundaria',
    10: '1° Preparatoria',
    11: '2° Preparatoria',
    12: '3° Preparatoria',
  },

  // Tema visual
  theme: {
    primary: '#006847',    // Verde bandera
    secondary: '#CE1126',  // Rojo bandera
    accent: '#C8102E',     // Rojo secundario / acento
    bgDark: '#1a1a2e',     // Mantener oscuro por ahora
    bgCard: '#16213e'
  },

  // Contexto cultural
  cultural: {
    ciudades: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Cancún', 'Tijuana'],
    moneda: 'pesos mexicanos',
    simboloMoneda: '$',
    personajes: ['Frida Kahlo', 'Guillermo del Toro', 'Benito Juárez', 'Sor Juana Inés de la Cruz'],
    comidas: ['tacos', 'mole', 'pozole', 'tamales', 'chiles en nogada'],
    fiestas: ['Día de Muertos', 'Grito de Independencia', 'Las Posadas']
  },

  // Institución oficial
  institucion: 'CENEVAL - Centro Nacional de Evaluación para la Educación Superior',

  // Características activas
  features: {
    blog: false
  }
};
