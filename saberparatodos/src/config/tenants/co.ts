/**
 * 🇨🇴 Configuración de Colombia - Saber Pro/11/9/5/3
 */

import type { CountryConfig } from '../types';

export const coConfig: CountryConfig = {
  code: 'CO',
  name: 'Colombia',
  domain: 'saberparatodos.space',
  language: 'es-CO',
  currency: 'COP',

  // Exámenes oficiales
  exams: {
    'Saber 3°': { grado: 3, asignaturas: ['Lenguaje', 'Matemáticas'] },
    'Saber 5°': { grado: 5, asignaturas: ['Lenguaje', 'Matemáticas', 'Ciencias', 'Competencias Ciudadanas'] },
    'Saber 9°': { grado: 9, asignaturas: ['Lenguaje', 'Matemáticas', 'Ciencias', 'Competencias Ciudadanas'] },
    'Saber 11°': { grado: 11, asignaturas: ['Lectura Crítica', 'Matemáticas', 'Sociales y Ciudadanas', 'Ciencias Naturales', 'Inglés'] },
    'Saber Pro': { grado: 'universitario', asignaturas: ['Lectura Crítica', 'Razonamiento Cuantitativo', 'Competencias Ciudadanas', 'Comunicación Escrita', 'Inglés'] }
  },

  // Tema visual
  theme: {
    primary: '#FCD116',    // Amarillo bandera
    secondary: '#003893',  // Azul bandera
    accent: '#CE1126',     // Rojo bandera
    bgDark: '#1a1a2e',
    bgCard: '#16213e'
  },

  // Contexto cultural para generación de preguntas
  cultural: {
    ciudades: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga'],
    moneda: 'pesos colombianos',
    simboloMoneda: '$',
    personajes: ['Gabriel García Márquez', 'Shakira', 'James Rodríguez', 'Mariana Pajón'],
    comidas: ['bandeja paisa', 'ajiaco', 'arepa', 'empanadas'],
    fiestas: ['Carnaval de Barranquilla', 'Feria de Cali', 'Feria de las Flores']
  },

  // Institución oficial
  institucion: 'ICFES - Instituto Colombiano para la Evaluación de la Educación',

  // Características activas
  features: {
    blog: false
  },

  // Configuración de Giscus para comentarios
  giscus: {
    repo: 'worldexams/worldexams',
    repoId: 'R_kgDONXw98Q',
    category: 'Announcements',
    categoryId: 'DIC_kwDONXw98c4Ckz9-'
  }
};
