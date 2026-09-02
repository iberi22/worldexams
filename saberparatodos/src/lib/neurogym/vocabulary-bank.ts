/**
 * vocabulary-bank.ts
 * Banco de estímulos de Comprensión Verbal (Gc) para WorldExams NeuroGym.
 *
 * 50 palabras en español neutro distribuidas en 5 niveles de dificultad
 * (edades 8-18+). Cada ítem ofrece 4 definiciones plausibles del mismo
 * dominio semántico; exactamente una es correcta (RAE / uso común).
 *
 * Selección determinística con PRNG Mulberry32: los tests y sesiones
 * generadas son reproducibles por semilla.
 */

export type VocabDifficulty = 1 | 2 | 3 | 4 | 5;
export type VocabPartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb';

export interface VocabItem {
  word: string;
  /** 4 definiciones: la correcta en options[correctIndex], 3 distractores plausibles. */
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  difficulty: VocabDifficulty;
  partOfSpeech: VocabPartOfSpeech;
}

/** PRNG determinístico Mulberry32 (reproducible por semilla). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Nivel 1 (8-10 años): palabras cotidianas y concretas
// Nivel 2 (11-13): acciones y objetos familiares
// Nivel 3 (14-16): conceptos abstractos básicos
// Nivel 4 (17-18): vocabulario académico
// Nivel 5 (adulto): cultos y precisos
export const VOCABULARY_BANK: VocabItem[] = [
  // ── Nivel 1 ──
  {
    word: 'manzana',
    options: [
      'Hortaliza de forma alargada y color verde oscuro',
      'Fruta de piel roja o verde y pulpa dulce',
      'Insecto volador con alas rayadas',
      'Calzado impermeable para días de lluvia'
    ],
    correctIndex: 1,
    difficulty: 1,
    partOfSpeech: 'noun'
  },
  {
    word: 'perro',
    options: [
      'Animal doméstico conocido por su lealtad y buen olfato',
      'Ave de corral que pone huevos cada mañana',
      'Felino grande que vive en sabanas y bosques',
      'Insecto de granja que produce lana'
    ],
    correctIndex: 0,
    difficulty: 1,
    partOfSpeech: 'noun'
  },
  {
    word: 'casa',
    options: [
      'Local donde se vende pan y dulces',
      'Edificio donde los estudiantes toman clases',
      'Construcción donde viven las personas',
      'Lugar donde se reparan vehículos'
    ],
    correctIndex: 2,
    difficulty: 1,
    partOfSpeech: 'noun'
  },
  {
    word: 'libro',
    options: [
      'Aparato que sirve para tomar fotografías',
      'Conjunto de páginas escritas que se leen para informarse o entretenerte',
      'Instrumento musical con teclas blancas y negras',
      'Herramienta que se usa para cortar papel'
    ],
    correctIndex: 1,
    difficulty: 1,
    partOfSpeech: 'noun'
  },
  {
    word: 'lluvia',
    options: [
      'Luz intensa que produce el sol al mediodía',
      'Viento que sopla con mucha fuerza y levanta polvo',
      'Hielo que se forma en el suelo durante la noche',
      'Agua que cae de las nubes en forma de gotas'
    ],
    correctIndex: 3,
    difficulty: 1,
    partOfSpeech: 'noun'
  },
  {
    word: 'ventana',
    options: [
      'Abertura en una pared que deja entrar luz y aire',
      'Mueble blando donde las personas se sientan a descansar',
      'Pieza giratoria que se usa para abrir un garaje',
      'Escalera que conecta un piso con otro'
    ],
    correctIndex: 0,
    difficulty: 1,
    partOfSpeech: 'noun'
  },
  {
    word: 'zapato',
    options: [
      'Prenda que cubre la cabeza del sol',
      'Cubierta de tela que se usa sobre la cama',
      'Calzado que protege y cubre el pie',
      'Bolso pequeño donde se guardan las monedas'
    ],
    correctIndex: 2,
    difficulty: 1,
    partOfSpeech: 'noun'
  },
  {
    word: 'hermano',
    options: [
      'Hijo de una persona',
      'Hijo de los mismos padres que otra persona',
      'Padre del padre o de la madre',
      'Hermano de la madre o del padre'
    ],
    correctIndex: 1,
    difficulty: 1,
    partOfSpeech: 'noun'
  },
  {
    word: 'pan',
    options: [
      'Alimento básico hecho de harina, agua y sal que se hornea',
      'Postre dulce que se sirve al final de la comida',
      'Bebida fría preparada con leche y frutas',
      'Untuoso alimenticio que se obtiene de la leche'
    ],
    correctIndex: 0,
    difficulty: 1,
    partOfSpeech: 'noun'
  },
  {
    word: 'escuela',
    options: [
      'Parque con juegos donde los niños corren y saltan',
      'Hospital donde los médicos atienden a los enfermos',
      'Mercado abierto donde se venden frutas y verduras',
      'Lugar donde los niños acuden a aprender y estudiar'
    ],
    correctIndex: 3,
    difficulty: 1,
    partOfSpeech: 'noun'
  },

  // ── Nivel 2 ──
  {
    word: 'cocinar',
    options: [
      'Preparar alimentos aplicando calor para que sean comestibles',
      'Lavar la vajilla y los utensilios después de comer',
      'Cultivar verduras y frutas en una huerta',
      'Servir la mesa y repartir los platos en el comedor'
    ],
    correctIndex: 0,
    difficulty: 2,
    partOfSpeech: 'verb'
  },
  {
    word: 'vecino',
    options: [
      'Persona que vende productos en una tienda',
      'Persona que vive en una casa cercana a la de otro',
      'Empleado que recoge la basura cada semana',
      'Dueño de un terreno o de una vivienda'
    ],
    correctIndex: 1,
    difficulty: 2,
    partOfSpeech: 'noun'
  },
  {
    word: 'sembrar',
    options: [
      'Recolectar los frutos maduros del campo',
      'Regar agua a las plantas durante la sequía',
      'Plantar semillas en la tierra para que crezcan',
      'Cortar la maleza que crece entre los cultivos'
    ],
    correctIndex: 2,
    difficulty: 2,
    partOfSpeech: 'verb'
  },
  {
    word: 'puente',
    options: [
      'Camino subterráneo por donde pasan los trenes',
      'Torre alta desde la que se vigila una ciudad',
      'Muro que se construye para detener el agua de un río',
      'Estructura que se construye para cruzar un río o un valle'
    ],
    correctIndex: 3,
    difficulty: 2,
    partOfSpeech: 'noun'
  },
  {
    word: 'herramienta',
    options: [
      'Instrumento como el martillo o el alicate con el que se realiza un trabajo',
      'Máquina grande que se usa para arar la tierra',
      'Aparato eléctrico que ilumina una habitación',
      'Vehículo que transporta materiales de construcción'
    ],
    correctIndex: 0,
    difficulty: 2,
    partOfSpeech: 'noun'
  },
  {
    word: 'cosecha',
    options: [
      'Tienda donde se venden granos y semillas',
      'Recolección de los frutos y productos del campo',
      'Máquina que trilla el trigo en los silos',
      'Terreno preparado para sembrar en primavera'
    ],
    correctIndex: 1,
    difficulty: 2,
    partOfSpeech: 'noun'
  },
  {
    word: 'anochecer',
    options: [
      'Momento del día en que el sol sale por el horizonte',
      'Hora de la tarde en que se toma la segunda comida',
      'Momento en que termina el día y comienza la noche',
      'Tiempo de la madrugada en que aún no amanece'
    ],
    correctIndex: 2,
    difficulty: 2,
    partOfSpeech: 'noun'
  },
  {
    word: 'nadar',
    options: [
      'Desplazarse en el agua moviendo brazos y piernas',
      'Sumergir un objeto en un líquido por un rato',
      'Cruzar un río caminando sobre piedras',
      'Bucear con tanque de oxígeno en el mar'
    ],
    correctIndex: 0,
    difficulty: 2,
    partOfSpeech: 'verb'
  },
  {
    word: 'equipaje',
    options: [
      'Documento que autoriza un viaje en avión',
      'Billete que se compra antes de abordar un tren',
      'Mapa o guía con información para los viajeros',
      'Conjunto de maletas y bultos que se llevan en un viaje'
    ],
    correctIndex: 3,
    difficulty: 2,
    partOfSpeech: 'noun'
  },
  {
    word: 'sendero',
    options: [
      'Carretera ancha pavimentada para automóviles',
      'Camino estrecho por el que se anda en el campo o el bosque',
      'Vía elevada por la que circulan los trenes',
      'Calle peatonal céntrica con tiendas y cafés'
    ],
    correctIndex: 1,
    difficulty: 2,
    partOfSpeech: 'noun'
  },

  // ── Nivel 3 ──
  {
    word: 'libertad',
    options: [
      'Situación de quien paga una deuda pendiente',
      'Obediencia a las normas dictadas por una autoridad',
      'Facultad de actuar y decidir según la propia voluntad, sin vulnerar los derechos ajenos',
      'Igualdad de todas las personas ante la ley'
    ],
    correctIndex: 2,
    difficulty: 3,
    partOfSpeech: 'noun'
  },
  {
    word: 'justicia',
    options: [
      'Voluntad de dar a cada uno lo que le corresponde',
      'Castigo severo que impone un juez al culpable',
      'Sentimiento de compasión hacia quien sufre',
      'Acción de repartir bienes por igual entre todos'
    ],
    correctIndex: 0,
    difficulty: 3,
    partOfSpeech: 'noun'
  },
  {
    word: 'honestidad',
    options: [
      'Capacidad de convencer a otros con palabras',
      'Modo de actuar con verdad y rectitud',
      'Generosidad al compartir con quien menos tiene',
      'Valentía para enfrentar una situación difícil'
    ],
    correctIndex: 1,
    difficulty: 3,
    partOfSpeech: 'noun'
  },
  {
    word: 'respeto',
    options: [
      'Temor que se siente ante una persona con poder',
      'Admiración intensa hacia un artista o un héroe',
      'Consideración y valoración de los demás',
      'Cumplimiento estricto de las reglas de un juego'
    ],
    correctIndex: 2,
    difficulty: 3,
    partOfSpeech: 'noun'
  },
  {
    word: 'esperanza',
    options: [
      'Expectativa de obtener o conseguir algo que se desea',
      'Certidumbre sobre un hecho ya ocurrido en el pasado',
      'Deseo intenso de poseer lo que otros tienen',
      'Recuerdo de momentos felices vividos antes'
    ],
    correctIndex: 0,
    difficulty: 3,
    partOfSpeech: 'noun'
  },
  {
    word: 'ciudadanía',
    options: [
      'Conjunto de habitantes que viven en una ciudad grande',
      'Condición y derechos que tiene una persona en su país',
      'Deber de votar en todas las elecciones nacionales',
      'Identidad cultural compartida por un pueblo'
    ],
    correctIndex: 1,
    difficulty: 3,
    partOfSpeech: 'noun'
  },
  {
    word: 'cultura',
    options: [
      'Buena educación y cortesía en el trato social',
      'Estudio de las obras de arte de un museo',
      'Conocimiento amplio de música, literatura y cine',
      'Conjunto de conocimientos, costumbres y artes de un pueblo'
    ],
    correctIndex: 3,
    difficulty: 3,
    partOfSpeech: 'noun'
  },
  {
    word: 'tolerancia',
    options: [
      'Soportar una molestia física sin quejarse',
      'Respeto hacia ideas o formas de pensar distintas a las propias',
      'Perdonar una ofensa cometida por un amigo',
      'Capacidad de esperar con paciencia un resultado'
    ],
    correctIndex: 1,
    difficulty: 3,
    partOfSpeech: 'noun'
  },
  {
    word: 'responsabilidad',
    options: [
      'Obligación de responder por los propios actos',
      'Calidad de una persona trabajadora y constante',
      'Deber de obedecer las órdenes de un superior',
      'Capacidad de tomar decisiones rápidas y firmes'
    ],
    correctIndex: 0,
    difficulty: 3,
    partOfSpeech: 'noun'
  },
  {
    word: 'economía',
    options: [
      'Ahorro de dinero o de recursos en el gasto diario',
      'Ciencia que estudia la producción, distribución y consumo de la riqueza',
      'Administración de los bienes de una familia',
      'Conjunto de empresas y comercios de un país'
    ],
    correctIndex: 1,
    difficulty: 3,
    partOfSpeech: 'noun'
  },

  // ── Nivel 4 ──
  {
    word: 'metáfora',
    options: [
      'Figura retórica que identifica dos términos mediante una relación de semejanza',
      'Figura que exagera las cualidades de algo para realzarlo',
      'Comparación explícita entre dos elementos usando «como»',
      'Figura que da cualidades humanas a objetos inanimados'
    ],
    correctIndex: 0,
    difficulty: 4,
    partOfSpeech: 'noun'
  },
  {
    word: 'hipótesis',
    options: [
      'Conclusión definitiva demostrada por la experiencia',
      'Ley universal aceptada por toda la comunidad científica',
      'Explicación provisional de un fenómeno que debe ser puesta a prueba',
      'Duda razonable que imposibilita una investigación'
    ],
    correctIndex: 2,
    difficulty: 4,
    partOfSpeech: 'noun'
  },
  {
    word: 'paradoja',
    options: [
      'Razonamiento lógico que conduce a una conclusión válida',
      'Enunciado que parece contrario a la razón o a la opinión común',
      'Juego de palabras con doble sentido humorístico',
      'Argumento falso que parece verdadero'
    ],
    correctIndex: 1,
    difficulty: 4,
    partOfSpeech: 'noun'
  },
  {
    word: 'crónica',
    options: [
      'Relato de hechos ordenados según el tiempo en que ocurrieron',
      'Texto breve que resume las ideas de una obra extensa',
      'Composición poética de versos ocho sílabas',
      'Biografía novelada de un personaje histórico'
    ],
    correctIndex: 0,
    difficulty: 4,
    partOfSpeech: 'noun'
  },
  {
    word: 'simetría',
    options: [
      'Repetición regular de colores en una composición visual',
      'Igualdad de dos cantidades o magnitudes',
      'Correspondencia de partes respecto de un eje o centro',
      'Proporción armónica entre las partes de un todo'
    ],
    correctIndex: 2,
    difficulty: 4,
    partOfSpeech: 'noun'
  },
  {
    word: 'ironía',
    options: [
      'Burla directa y ofensiva contra una persona',
      'Modo de decir lo contrario de lo que se quiere dar a entender',
      'Comparación ingeniosa entre dos situaciones distintas',
      'Exageración intencional con fines cómicos'
    ],
    correctIndex: 1,
    difficulty: 4,
    partOfSpeech: 'noun'
  },
  {
    word: 'hipotenusa',
    options: [
      'Lado de un triángulo rectángulo que forma el ángulo recto',
      'Recta que une un vértice con el punto medio del lado opuesto',
      'Segmento que va del centro de un círculo a cualquier punto de su borde',
      'Lado opuesto al ángulo recto en un triángulo rectángulo'
    ],
    correctIndex: 3,
    difficulty: 4,
    partOfSpeech: 'noun'
  },
  {
    word: 'ecosistema',
    options: [
      'Comunidad de seres vivos que interactúan con su medio físico',
      'Estudio de las relaciones de los animales con su entorno',
      'Región terrestre con un clima y una vegetación característicos',
      'Conjunto de cadenas alimentarias de un bosque'
    ],
    correctIndex: 0,
    difficulty: 4,
    partOfSpeech: 'noun'
  },
  {
    word: 'democracia',
    options: [
      'Sistema de gobierno en el que manda una élite educada',
      'Gobierno en el que el poder se hereda dentro de una familia',
      'Sistema de gobierno en el que la soberanía reside en el pueblo',
      'Organización del Estado con poderes absolutamente independientes'
    ],
    correctIndex: 2,
    difficulty: 4,
    partOfSpeech: 'noun'
  },
  {
    word: 'inferir',
    options: [
      'Afirmar algo sin pruebas ni fundamento alguno',
      'Deducir una consecuencia a partir de principios o de evidencias',
      'Suponer de manera arbitraria un hecho futuro',
      'Explicar con palabras propias una idea ajena'
    ],
    correctIndex: 1,
    difficulty: 4,
    partOfSpeech: 'verb'
  },

  // ── Nivel 5 ──
  {
    word: 'efímero',
    options: [
      'Que dura o tiene vida muy breve',
      'Que se repite con regularidad en el tiempo',
      'Que causa cansancio o agotamiento',
      'Que no cambia ni se altera con los años'
    ],
    correctIndex: 0,
    difficulty: 5,
    partOfSpeech: 'adjective'
  },
  {
    word: 'inefable',
    options: [
      'Que no puede leerse por estar mal escrito',
      'Que no puede explicarse con palabras por ser excesivamente sublime',
      'Que resulta imposible de alcanzar o conseguir',
      'Que merece ser olvidado por vergonzoso'
    ],
    correctIndex: 1,
    difficulty: 5,
    partOfSpeech: 'adjective'
  },
  {
    word: 'lacónico',
    options: [
      'Que habla demasiado y sin orden',
      'Que resulta oscuro o difícil de entender',
      'Que se expresa con pocas y breves palabras',
      'Que muestra tristeza o melancolía al hablar'
    ],
    correctIndex: 2,
    difficulty: 5,
    partOfSpeech: 'adjective'
  },
  {
    word: 'perspicaz',
    options: [
      'Que penetra y comprende las cosas con rapidez',
      'Que observa los detalles con lentitud y cuidado',
      'Que insiste en una idea sin abandonarla nunca',
      'Que actúa con cautela para evitar riesgos'
    ],
    correctIndex: 0,
    difficulty: 5,
    partOfSpeech: 'adjective'
  },
  {
    word: 'perenne',
    options: [
      'Que ocurre una sola vez en la vida',
      'Que se mantiene constante y tiene larga duración',
      'Que aparece de forma inesperada y súbita',
      'Que cambia de aspecto con las estaciones'
    ],
    correctIndex: 1,
    difficulty: 5,
    partOfSpeech: 'adjective'
  },
  {
    word: 'sigilosamente',
    options: [
      'Con prisa y falta de paciencia',
      'De manera perezosa y sin ganas',
      'Con timidez y vergüenza ante los demás',
      'De manera cautelosa, en silencio y sin ser notado'
    ],
    correctIndex: 3,
    difficulty: 5,
    partOfSpeech: 'adverb'
  },
  {
    word: 'recóndito',
    options: [
      'Que está muy oculto, alejado o secreto',
      'Que resulta difícil de recordar',
      'Que carece de interés o de importancia',
      'Que se encuentra a gran altura'
    ],
    correctIndex: 0,
    difficulty: 5,
    partOfSpeech: 'adjective'
  },
  {
    word: 'elocuente',
    options: [
      'Que habla pocas veces en público',
      'Que persuade por su fluidez y eficacia al hablar o escribir',
      'Que se expresa con dudas e imprecisiones',
      'Que provoca emoción intensa al ser escuchado'
    ],
    correctIndex: 1,
    difficulty: 5,
    partOfSpeech: 'adjective'
  },
  {
    word: 'atisbar',
    options: [
      'Adivinar el futuro mediante rituales',
      'Escuchar a escondidas una conversación',
      'Ver confusamente de lejos o a medias, o sospechar algo',
      'Examinar un objeto con gran atención'
    ],
    correctIndex: 2,
    difficulty: 5,
    partOfSpeech: 'verb'
  },
  {
    word: 'acuciante',
    options: [
      'Que agudiza el dolor o la molestia de forma punzante',
      'Que es urgente e impostergable',
      'Que provoca incomodidad por su insistencia',
      'Que resulta intenso y difícil de soportar'
    ],
    correctIndex: 1,
    difficulty: 5,
    partOfSpeech: 'adjective'
  }
];

/**
 * Devuelve un ítem del banco para una dificultad dada, de forma
 * determinística: la misma (seed, difficulty) siempre produce el mismo ítem.
 */
export function getVocabItem(seed: number, difficulty: VocabDifficulty): VocabItem {
  const pool = VOCABULARY_BANK.filter((item) => item.difficulty === difficulty);
  if (pool.length === 0) {
    throw new Error(`No vocabulary items for difficulty ${difficulty}`);
  }
  const rand = mulberry32(seed + difficulty * 0x9e3779b1);
  const index = Math.floor(rand() * pool.length) % pool.length;
  return pool[index];
}

/**
 * Genera una sesión de práctica determinista (progresión 1→5).
 * Misma seed y count producen exactamente la misma secuencia.
 */
export function getVocabSession(seed: number, count: number = 10): VocabItem[] {
  const session: VocabItem[] = [];
  const safeCount = Math.max(1, Math.floor(count));
  for (let i = 0; i < safeCount; i++) {
    const difficulty = (Math.min(5, 1 + Math.floor((i * 5) / safeCount)) as VocabDifficulty);
    session.push(getVocabItem(seed * 31 + i, difficulty));
  }
  return session;
}
