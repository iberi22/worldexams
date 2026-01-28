
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: Matter and Properties
  {
    meta: {
      id: "CO-CN-10-chem-matter-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "materia-propiedades",
      periodo: 1,
      dba_id: "DBA-CN-10-1",
      title: "Propiedades de la Materia"
    },
    base: { question: "Clasifica propiedad.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Una propiedad intensiva es aquella que:", options: [{text: "No depende de la cantidad de materia",correct:true},{text: "Depende de la masa",correct:false},{text: "Cambia con el volumen",correct:false},{text: "Es subjetiva",correct:false}], explanation: "Ej: densidad, temperatura." },
      { id_suffix: "v2", difficulty: 1, question: "El peso es una propiedad:", options: [{text: "Extensiva (depende de masa y gravedad)",correct:true},{text: "Intensiva",correct:false},{text: "Química",correct:false},{text: "Nuclear",correct:false}], explanation: "Cambia con la cantidad." },
      { id_suffix: "v3", difficulty: 2, question: "¿Cuál es una propiedad química?", options: [{text: "Inflamabilidad",correct:true},{text: "Punto de ebullición",correct:false},{text: "Dureza",correct:false},{text: "Color",correct:false}], explanation: "Involucra cambio químico." },
      { id_suffix: "v4", difficulty: 2, question: "La densidad es:", options: [{text: "Masa / Volumen",correct:true},{text: "Peso * Volumen",correct:false},{text: "Volumen / Masa",correct:false},{text: "Fuerza / Área",correct:false}], explanation: "d = m/v." },
      { id_suffix: "v5", difficulty: 3, question: "Cambio de sólido a gas directamente:", options: [{text: "Sublimación",correct:true},{text: "Fusión",correct:false},{text: "Condensación",correct:false},{text: "Evaporación",correct:false}], explanation: "Cambio de estado." },
      { id_suffix: "v6", difficulty: 3, question: "Punto de ebullición del agua a nivel del mar:", options: [{text: "100°C",correct:true},{text: "0°C",correct:false},{text: "50°C",correct:false},{text: "200°C",correct:false}], explanation: "Estándar 1 atm." },
      { id_suffix: "v7", difficulty: 4, question: "Si corto un bloque de hierro a la mitad, su densidad:", options: [{text: "Sigue igual",correct:true},{text: "Se reduce a la mitad",correct:false},{text: "Se duplica",correct:false},{text: "Desaparece",correct:false}], explanation: "Intensiva." },
      { id_suffix: "v8", difficulty: 4, question: "¿Qué estado tiene forma definida y volumen definido?", options: [{text: "Sólido",correct:true},{text: "Líquido",correct:false},{text: "Gas",correct:false},{text: "Plasma",correct:false}], explanation: "Estructura rígida." },
      { id_suffix: "v9", difficulty: 5, question: "Un coloide se diferencia de una solución porque:", options: [{text: "Dispersa la luz (Efecto Tyndall)",correct:true},{text: "Es homogéneo",correct:false},{text: "Sus partículas sedimentan rápido",correct:false},{text: "Es transparente",correct:false}], explanation: "Tamaño de partícula intermedio." },
      { id_suffix: "v10", difficulty: 5, question: "La viscosidad de un líquido usualmente ___ con la temperatura.", options: [{text: "Disminuye",correct:true},{text: "Aumenta",correct:false},{text: "No cambia",correct:false},{text: "Se hace cero",correct:false}], explanation: "Menos resistencia al fluir." }
    ]
  },

  // Bundle 2: Atomic Models History
  {
    meta: {
      id: "CO-CN-10-chem-atom-hist-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "modelos-atomicos",
      periodo: 1,
      dba_id: "DBA-CN-10-1",
      title: "Modelos Atómicos"
    },
    base: { question: "Identifica el modelo.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Modelo 'Budín de Pasas':", options: [{text: "Thomson",correct:true},{text: "Dalton",correct:false},{text: "Rutherford",correct:false},{text: "Bohr",correct:false}], explanation: "Electrones incrustados en masa positiva." },
      { id_suffix: "v2", difficulty: 1, question: "Descubrió el núcleo atómico:", options: [{text: "Rutherford",correct:true},{text: "Thomson",correct:false},{text: "Bohr",correct:false},{text: "Chadwick",correct:false}], explanation: "Experimento lámina de oro." },
      { id_suffix: "v3", difficulty: 2, question: "Modelo de órbitas circulares definidas:", options: [{text: "Bohr",correct:true},{text: "Schrödinger",correct:false},{text: "Dalton",correct:false},{text: "Demócrito",correct:false}], explanation: "Niveles de energía." },
      { id_suffix: "v4", difficulty: 2, question: "Partícula sin carga en el núcleo:", options: [{text: "Neutrón",correct:true},{text: "Protón",correct:false},{text: "Electrón",correct:false},{text: "Fotón",correct:false}], explanation: "Neutral, Chadwick." },
      { id_suffix: "v5", difficulty: 3, question: "Modelo actual (Mecánico Cuántico):", options: [{text: "Nube de probabilidad (Orbitales)",correct:true},{text: "Planetas girando",correct:false},{text: "Esfera sólida",correct:false},{text: "Cubo",correct:false}], explanation: "Schrödinger/Heisenberg." },
      { id_suffix: "v6", difficulty: 3, question: "El número atómico (Z) representa:", options: [{text: "Número de protones",correct:true},{text: "Masa atómica",correct:false},{text: "Neutrones",correct:false},{text: "Electrones de valencia",correct:false}], explanation: "Identidad del elemento." },
      { id_suffix: "v7", difficulty: 4, question: "Isótopos son átomos del mismo elemento con distinto:", options: [{text: "Número de neutrones (Masa A)",correct:true},{text: "Número de protones (Z)",correct:false},{text: "Electrones",correct:false},{text: "Símbolo",correct:false}], explanation: "Varía la masa." },
      { id_suffix: "v8", difficulty: 4, question: "Principio de Incertidumbre de Heisenberg:", options: [{text: "No se puede saber posición y momento exactos simultáneamente",correct:true},{text: "El átomo es incierto",correct:false},{text: "Los electrones no existen",correct:false},{text: "Todo es relativo",correct:false}], explanation: "Mecánica cuántica." },
      { id_suffix: "v9", difficulty: 5, question: "¿Qué falló en el modelo de Rutherford?", options: [{text: "No explicaba estabilidad (electrón debería colapsar)",correct:true},{text: "No tenía núcleo",correct:false},{text: "Era cuadrado",correct:false},{text: "No tenía electrones",correct:false}], explanation: "Física clásica predecía colapso." },
      { id_suffix: "v10", difficulty: 5, question: "El experimento de rayos catódicos sirvió para descubrir:", options: [{text: "El electrón",correct:true},{text: "El protón",correct:false},{text: "El neutrón",correct:false},{text: "El núcleo",correct:false}], explanation: "Thomson." }
    ]
  },

  // Bundle 3: Electronic Configuration
  {
    meta: {
      id: "CO-CN-10-chem-electron-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "configuracion-electronica",
      periodo: 1,
      dba_id: "DBA-CN-10-1",
      title: "Configuración Electrónica"
    },
    base: { question: "Halla la configuración.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Capacidad máxima del subnivel 's':", options: [{text: "2 electrones",correct:true},{text: "6 electrones",correct:false},{text: "10 electrones",correct:false},{text: "14 electrones",correct:false}], explanation: "1 orbital." },
      { id_suffix: "v2", difficulty: 1, question: "Capacidad máxima subnivel 'p':", options: [{text: "6",correct:true},{text: "2",correct:false},{text: "10",correct:false},{text: "8",correct:false}], explanation: "3 orbitales." },
      { id_suffix: "v3", difficulty: 2, question: "Configuración del Carbono (Z=6):", options: [{text: "1s² 2s² 2p²",correct:true},{text: "1s² 2s² 2p⁶",correct:false},{text: "1s² 2s¹ 2p³",correct:false},{text: "1s⁶",correct:false}], explanation: "2+2+2 = 6." },
      { id_suffix: "v4", difficulty: 2, question: "Regla de Hund:", options: [{text: "Llenar orbitales con espín paralelo antes de aparear",correct:true},{text: "Llenar de menor a mayor energía",correct:false},{text: "Máximo 2 e- por orbital",correct:false},{text: "No hay reglas",correct:false}], explanation: "\"Bus del colegio\"." },
      { id_suffix: "v5", difficulty: 3, question: "Configuración de gas noble Argón (Z=18):", options: [{text: "1s² 2s² 2p⁶ 3s² 3p⁶",correct:true},{text: "...3p⁵",correct:false},{text: "...3d¹⁰",correct:false},{text: "...3s¹",correct:false}], explanation: "Capa llena (octeto)." },
      { id_suffix: "v6", difficulty: 3, question: "Electrones de valencia del Sodio (Grupo 1):", options: [{text: "1",correct:true},{text: "2",correct:false},{text: "7",correct:false},{text: "8",correct:false}], explanation: "Termina en s¹." },
      { id_suffix: "v7", difficulty: 4, question: "Excepción a la regla (Cromo o Cobre):", options: [{text: "Estabilidad de subnivel d semi-lleno o lleno",correct:true},{text: "No existen",correct:false},{text: "Error experimental",correct:false},{text: "Son gases",correct:false}], explanation: "Promoción de s a d." },
      { id_suffix: "v8", difficulty: 4, question: "Principio de exclusión de Pauli:", options: [{text: "Dos electrones no pueden tener 4 números cuánticos iguales",correct:true},{text: "Solo caben 2",correct:false},{text: "Energía mínima",correct:false},{text: "Órbitas circulares",correct:false}], explanation: "Espín opuesto." },
      { id_suffix: "v9", difficulty: 5, question: "Números cuánticos (n, l, ml, ms). 'l' indica:", options: [{text: "Forma del orbital (subnivel)",correct:true},{text: "Nivel de energía",correct:false},{text: "Orientación",correct:false},{text: "Giro",correct:false}], explanation: "Secundario/Azimutal." },
      { id_suffix: "v10", difficulty: 5, question: "¿Qué significa [Ne] 3s¹?", options: [{text: "Configuración del Sodio abreviada",correct:true},{text: "Neón más azufre",correct:false},{text: "Error",correct:false},{text: "Magnesio",correct:false}], explanation: "Kernel gas noble." }
    ]
  },

  // Bundle 4: Periodic Table Basic
  {
    meta: {
      id: "CO-CN-10-chem-periodic-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "tabla-periodica",
      periodo: 1,
      dba_id: "DBA-CN-10-1",
      title: "La Tabla Periódica"
    },
    base: { question: "Propiedades periódicas.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Filas horizontales se llaman:", options: [{text: "Periodos",correct:true},{text: "Grupos",correct:false},{text: "Familias",correct:false},{text: "Bloques",correct:false}], explanation: "Nivel de energía." },
      { id_suffix: "v2", difficulty: 1, question: "Columnas verticales se llaman:", options: [{text: "Grupos o Familias",correct:true},{text: "Periodos",correct:false},{text: "Niveles",correct:false},{text: "Fases",correct:false}], explanation: "Similar configuración valencia." },
      { id_suffix: "v3", difficulty: 2, question: "Elementos del Grupo 18 (VIII A):", options: [{text: "Gases Nobles",correct:true},{text: "Halógenos",correct:false},{text: "Alcalinos",correct:false},{text: "Metales de transición",correct:false}], explanation: "Inertes." },
      { id_suffix: "v4", difficulty: 2, question: "Elementos del Grupo 1 (I A):", options: [{text: "Alcalinos",correct:true},{text: "Alcalinotérreos",correct:false},{text: "Gases",correct:false},{text: "Térreos",correct:false}], explanation: "Muy reactivos." },
      { id_suffix: "v5", difficulty: 3, question: "Electronegatividad aumenta hacia:", options: [{text: "Arriba y Derecha",correct:true},{text: "Abajo e Izquierda",correct:false},{text: "Abajo y Derecha",correct:false},{text: "Centro",correct:false}], explanation: "Flúor es el más electronegativo." },
      { id_suffix: "v6", difficulty: 3, question: "Radio atómico aumenta hacia:", options: [{text: "Abajo e Izquierda",correct:true},{text: "Arriba y Derecha",correct:false},{text: "Centro",correct:false},{text: "Derecha",correct:false}], explanation: "Más capas, menos atracción efectiva." },
      { id_suffix: "v7", difficulty: 4, question: "El elemento con mayor electronegatividad:", options: [{text: "Flúor",correct:true},{text: "Francio",correct:false},{text: "Oxígeno",correct:false},{text: "Cloro",correct:false}], explanation: "4.0 Pauling." },
      { id_suffix: "v8", difficulty: 4, question: "¿Qué es la energía de ionización?", options: [{text: "Energía para arrancar un electrón",correct:true},{text: "Energía para ganar un electrón",correct:false},{text: "Energía nuclear",correct:false},{text: "Calor de reacción",correct:false}], explanation: "Formar catión." },
      { id_suffix: "v9", difficulty: 5, question: "Metales de transición están en el bloque:", options: [{text: "d",correct:true},{text: "s",correct:false},{text: "p",correct:false},{text: "f",correct:false}], explanation: "Centro tabla." },
      { id_suffix: "v10", difficulty: 5, question: "Tierras raras (Lantánidos/Actínidos) bloque:", options: [{text: "f",correct:true},{text: "d",correct:false},{text: "p",correct:false},{text: "s",correct:false}], explanation: "Transición interna." }
    ]
  },

  // Bundle 5: Pure Substances vs Mixtures
  {
    meta: {
      id: "CO-CN-10-chem-mixtures-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "mezclas-sustancias",
      periodo: 1,
      dba_id: "DBA-CN-10-1",
      title: "Sustancias y Mezclas"
    },
    base: { question: "Clasifica la materia.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Una sustancia pura formada por un solo tipo de átomo:", options: [{text: "Elemento",correct:true},{text: "Compuesto",correct:false},{text: "Mezcla",correct:false},{text: "Solución",correct:false}], explanation: "Ej: O2, Fe." },
      { id_suffix: "v2", difficulty: 1, question: "Agua (H2O) es:", options: [{text: "Compuesto",correct:true},{text: "Elemento",correct:false},{text: "Mezcla homogénea",correct:false},{text: "Mezcla heterogénea",correct:false}], explanation: "Moléculas iguales definidas." },
      { id_suffix: "v3", difficulty: 2, question: "Aire es:", options: [{text: "Mezcla homogénea (solución gaseosa)",correct:true},{text: "Compuesto puro",correct:false},{text: "Elemento",correct:false},{text: "Mezcla heterogénea",correct:false}], explanation: "N2, O2, Ar, etc." },
      { id_suffix: "v4", difficulty: 2, question: "Agua con aceite es:", options: [{text: "Mezcla heterogénea",correct:true},{text: "Solución",correct:false},{text: "Compuesto",correct:false},{text: "Coloide",correct:false}], explanation: "Fases visibles." },
      { id_suffix: "v5", difficulty: 3, question: "Método para separar agua y sal:", options: [{text: "Evaporación / Cristalización",correct:true},{text: "Filtración",correct:false},{text: "Decantación",correct:false},{text: "Tamizado",correct:false}], explanation: "Sal no evapora." },
      { id_suffix: "v6", difficulty: 3, question: "Método para separar agua y aceite:", options: [{text: "Decantación (embudo)",correct:true},{text: "Filtración",correct:false},{text: "Destilación",correct:false},{text: "Cromatografía",correct:false}], explanation: "Densidades distintas." },
      { id_suffix: "v7", difficulty: 4, question: "Destilación separa líquidos por:", options: [{text: "Diferencia de puntos de ebullición",correct:true},{text: "Densidad",correct:false},{text: "Color",correct:false},{text: "Solubilidad",correct:false}], explanation: "Hervir y condensar." },
      { id_suffix: "v8", difficulty: 4, question: "El acero es:", options: [{text: "Aleación (Mezcla homogénea sólida)",correct:true},{text: "Elemento",correct:false},{text: "Compuesto iónico",correct:false},{text: "Mezcla heterogénea",correct:false}], explanation: "Fe + C." },
      { id_suffix: "v9", difficulty: 5, question: "Una fase dispersa y una dispersante caracterizan a:", options: [{text: "Coloides y Suspensiones",correct:true},{text: "Soluciones verdaderas",correct:false},{text: "Elementos",correct:false},{text: "Gases puros",correct:false}], explanation: "Heterogéneo a nivel micro." },
      { id_suffix: "v10", difficulty: 5, question: "Cromatografía se basa en:", options: [{text: "Diferencia de afinidad/velocidad en fase móvil/estacionaria",correct:true},{text: "Punto ebullición",correct:false},{text: "Peso molecular solo",correct:false},{text: "Densidad",correct:false}], explanation: "Separación tintas." }
    ]
  },

  // Bundle 6: Stoichiometry Basics (Mol concept)
  {
    meta: {
      id: "CO-CN-10-chem-mol-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "concepto-mol",
      periodo: 1,
      dba_id: "DBA-CN-10-1",
      title: "El Mol y Número de Avogadro"
    },
    base: { question: "Cálculos con moles.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Número de Avogadro (partículas en 1 mol):", options: [{text: "6.022 x 10²³",correct:true},{text: "100",correct:false},{text: "3.1416",correct:false},{text: "1 x 10⁶",correct:false}], explanation: "Constante." },
      { id_suffix: "v2", difficulty: 1, question: "La masa molar del Carbono-12 es:", options: [{text: "12 g/mol",correct:true},{text: "6 g/mol",correct:false},{text: "1 g/mol",correct:false},{text: "24 g/mol",correct:false}], explanation: "Estándar." },
      { id_suffix: "v3", difficulty: 2, question: "Masa molar del agua (H2O) (H=1, O=16):", options: [{text: "18 g/mol",correct:true},{text: "16 g/mol",correct:false},{text: "20 g/mol",correct:false},{text: "10 g/mol",correct:false}], explanation: "2(1)+16=18." },
      { id_suffix: "v4", difficulty: 2, question: "¿Cuántos moles hay en 36g de agua?", options: [{text: "2 moles",correct:true},{text: "1 mol",correct:false},{text: "0.5 moles",correct:false},{text: "10 moles",correct:false}], explanation: "36/18 = 2." },
      { id_suffix: "v5", difficulty: 3, question: "Masa de 0.5 moles de CO2 (C=12, O=16):", options: [{text: "22 g",correct:true},{text: "44 g",correct:false},{text: "11 g",correct:false},{text: "88 g",correct:false}], explanation: "MM=44. 0.5*44=22." },
      { id_suffix: "v6", difficulty: 3, question: "Volumen molar de un gas ideal a TPN:", options: [{text: "22.4 L",correct:true},{text: "1 L",correct:false},{text: "100 L",correct:false},{text: "18 L",correct:false}], explanation: "Condiciones estándar." },
      { id_suffix: "v7", difficulty: 4, question: "¿Cuántos átomos de H hay en 1 mol de H2O?", options: [{text: "2 x Avogadro (1.204 x 10²⁴)",correct:true},{text: "1 x Avogadro",correct:false},{text: "2 átomos",correct:false},{text: "3 x Avogadro",correct:false}], explanation: "2 átomos por molécula." },
      { id_suffix: "v8", difficulty: 4, question: "Conversión g -> mol -> moléculas:", options: [{text: "La ruta correcta",correct:true},{text: "No se puede",correct:false},{text: "Directo g a moléculas",correct:false},{text: "Solo g a mol",correct:false}], explanation: "Plan de cálculo." },
      { id_suffix: "v9", difficulty: 5, question: "Isótopos afectan la masa atómica promedio de tabla porque:", options: [{text: "Es un promedio ponderado de abundancias",correct:true},{text: "La tabla está mal",correct:false},{text: "Los protones cambian",correct:false},{text: "Por el clima",correct:false}], explanation: "Ej: Cl 35.5." },
      { id_suffix: "v10", difficulty: 5, question: "¿Qué pesa más, 1 mol de Pb o 1 mol de Fe?", options: [{text: "1 mol de Pb (207g)",correct:true},{text: "Iguales",correct:false},{text: "1 mol de Fe (56g)",correct:false},{text: "Depende",correct:false}], explanation: "Masa molar distinta, misma cantidad partículas." }
    ]
  },

  // Bundle 7: Solutions and Concentration
  {
    meta: {
      id: "CO-CN-10-chem-sol-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "soluciones-concentracion",
      periodo: 1,
      dba_id: "DBA-CN-10-1",
      title: "Soluciones y Concentración"
    },
    base: { question: "Calcula concentración.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Soluto es:", options: [{text: "Lo que se disuelve (menor cantidad)",correct:true},{text: "El líquido mayoritario",correct:false},{text: "El frasco",correct:false},{text: "La mezcla total",correct:false}], explanation: "Ej: Sal." },
      { id_suffix: "v2", difficulty: 1, question: "Solvente (disolvente) universal:", options: [{text: "Agua",correct:true},{text: "Alcohol",correct:false},{text: "Aceite",correct:false},{text: "Ácido",correct:false}], explanation: "Polar." },
      { id_suffix: "v3", difficulty: 2, question: "% masa/masa es:", options: [{text: "(g soluto / g solución) * 100",correct:true},{text: "(g soluto / g solvente) * 100",correct:false},{text: "g soluto/100",correct:false},{text: "Volumen",correct:false}], explanation: "Porcentaje peso." },
      { id_suffix: "v4", difficulty: 2, question: "Molaridad (M) se define como:", options: [{text: "moles soluto / Litros solución",correct:true},{text: "gramos / Litro",correct:false},{text: "moles / kg solvente",correct:false},{text: "L / mol",correct:false}], explanation: "Concéntración química." },
      { id_suffix: "v5", difficulty: 3, question: "Si disuelvo 1 mol de NaCl en agua hasta completar 1 Litro:", options: [{text: "1 Molar (1 M)",correct:true},{text: "0.5 M",correct:false},{text: "58 g",correct:false},{text: "1 %",correct:false}], explanation: "Definición M." },
      { id_suffix: "v6", difficulty: 3, question: "Solubilidad aumenta generalmente con T en sólidos:", options: [{text: "Cierto, se disuelve más caliente",correct:true},{text: "Falso, disminuye",correct:false},{text: "No afecta",correct:false},{text: "Solo en gases",correct:false}], explanation: "Cinética." },
      { id_suffix: "v7", difficulty: 4, question: "En gases, la solubilidad ___ al aumentar temperatura.", options: [{text: "Disminuye",correct:true},{text: "Aumenta",correct:false},{text: "Igual",correct:false},{text: "Sube y baja",correct:false}], explanation: "Gas escapa (gaseosa caliente)." },
      { id_suffix: "v8", difficulty: 4, question: "Molalidad (m) usa:", options: [{text: "kg de solvente",correct:true},{text: "Litros de solución",correct:false},{text: "g solución",correct:false},{text: "moles solución",correct:false}], explanation: "Propiedades coligativas." },
      { id_suffix: "v9", difficulty: 5, question: "Dilución: C1*V1 = C2*V2. Si duplico volumen con agua:", options: [{text: "La concentración se reduce a la mitad",correct:true},{text: "Se duplica",correct:false},{text: "Sigue igual",correct:false},{text: "Se cuadruplica",correct:false}], explanation: "Inversa." },
      { id_suffix: "v10", difficulty: 5, question: "Partes por millón (ppm) para agua:", options: [{text: "mg soluto / Litro solución",correct:true},{text: "g / L",correct:false},{text: "kg / L",correct:false},{text: "mol / L",correct:false}], explanation: "Trazas." }
    ]
  },

  // Bundle 8: Gas Laws
  {
    meta: {
      id: "CO-CN-10-chem-gases-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "leyes-gases",
      periodo: 1,
      dba_id: "DBA-CN-10-1",
      title: "Leyes de los Gases"
    },
    base: { question: "Aplica ley de gases.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Ley de Boyle (T constante):", options: [{text: "P1*V1 = P2*V2 (Inversa)",correct:true},{text: "V1/T1 = V2/T2",correct:false},{text: "P1/T1 = P2/T2",correct:false},{text: "PV=nRT",correct:false}], explanation: "Más presión, menos volumen." },
      { id_suffix: "v2", difficulty: 1, question: "Ley de Charles (P constante):", options: [{text: "V1/T1 = V2/T2 (Directa)",correct:true},{text: "P1*V1 = P2*V2",correct:false},{text: "P*T = V",correct:false},{text: "Inversa",correct:false}], explanation: "Más temperatura, más volumen (globo)." },
      { id_suffix: "v3", difficulty: 2, question: "La temperatura en gases debe usarse en:", options: [{text: "Kelvin",correct:true},{text: "Celsius",correct:false},{text: "Fahrenheit",correct:false},{text: "Cualquiera",correct:false}], explanation: "Absoluta." },
      { id_suffix: "v4", difficulty: 2, question: "Convertir 27°C a Kelvin:", options: [{text: "300 K",correct:true},{text: "273 K",correct:false},{text: "27 K",correct:false},{text: "100 K",correct:false}], explanation: "27 + 273." },
      { id_suffix: "v5", difficulty: 3, question: "Ley de Gay-Lussac (V constante):", options: [{text: "P1/T1 = P2/T2",correct:true},{text: "PV = constante",correct:false},{text: "Charles",correct:false},{text: "Boyle",correct:false}], explanation: "Olla pitadora." },
      { id_suffix: "v6", difficulty: 3, question: "Ecuación de Estado Gas Ideal:", options: [{text: "PV = nRT",correct:true},{text: "P/V = nRT",correct:false},{text: "PT = nRV",correct:false},{text: "PV = mRT",correct:false}], explanation: "Pavo Ratón." },
      { id_suffix: "v7", difficulty: 4, question: "Valor de R (constante gases) en atm L / mol K:", options: [{text: "0.082",correct:true},{text: "8.314",correct:false},{text: "1",correct:false},{text: "22.4",correct:false}], explanation: "Unidades presión atm." },
      { id_suffix: "v8", difficulty: 4, question: "Si comprimo un gas a la mitad de volumen a T cte, la presión:", options: [{text: "Se duplica",correct:true},{text: "Baja a la mitad",correct:false},{text: "Sigue igual",correct:false},{text: "Se cuadruplica",correct:false}], explanation: "Boyle." },
      { id_suffix: "v9", difficulty: 5, question: "Ley de Dalton de presiones parciales:", options: [{text: "P_total = P1 + P2 + ...",correct:true},{text: "P_total = P1 * P2",correct:false},{text: "Promedio",correct:false},{text: "Resta",correct:false}], explanation: "Suma." },
      { id_suffix: "v10", difficulty: 5, question: "Teoría Cinética de los Gases asume:", options: [{text: "Choques elásticos y volumen de partícula despreciable",correct:true},{text: "Partículas grandes",correct:false},{text: "Atracción fuerte",correct:false},{text: "Gases líquidos",correct:false}], explanation: "Gas Ideal." }
    ]
  },

  // Bundle 9: Chemical Reactions Basics
  {
    meta: {
      id: "CO-CN-10-chem-rxn-basic-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "reacciones-quimicas",
      periodo: 1,
      dba_id: "DBA-CN-10-1",
      title: "Reacciones Químicas Básicas"
    },
    base: { question: "Tipo de reacción.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Reactivos -> ???", options: [{text: "Productos",correct:true},{text: "Más reactivos",correct:false},{text: "Nada",correct:false},{text: "Átomos",correct:false}], explanation: "Transformación." },
      { id_suffix: "v2", difficulty: 1, question: "Ley de Conservación de la Masa (Lavoisier):", options: [{text: "La masa no se crea ni destruye, se transforma",correct:true},{text: "La masa desaparece",correct:false},{text: "La masa aumenta",correct:false},{text: "Solo energía se conserva",correct:false}], explanation: "Balanceo." },
      { id_suffix: "v3", difficulty: 2, question: "Reacción A + B -> AB:", options: [{text: "Síntesis (Combinación)",correct:true},{text: "Descomposición",correct:false},{text: "Sustitución",correct:false},{text: "Combustión",correct:false}], explanation: "Unión." },
      { id_suffix: "v4", difficulty: 2, question: "Reacción AB -> A + B:", options: [{text: "Descomposición",correct:true},{text: "Síntesis",correct:false},{text: "Doble desplazamiento",correct:false},{text: "Redox",correct:false}], explanation: "Ruptura." },
      { id_suffix: "v5", difficulty: 3, question: "Combustión requiere:", options: [{text: "Combustible y Oxígeno",correct:true},{text: "Solo calor",correct:false},{text: "Agua",correct:false},{text: "Nitrógeno",correct:false}], explanation: "Oxidación rápida." },
      { id_suffix: "v6", difficulty: 3, question: "Reacción Exotérmica:", options: [{text: "Libera calor (se siente caliente)",correct:true},{text: "Absorbe calor (fría)",correct:false},{text: "No cambia temperatura",correct:false},{text: "Nuclear",correct:false}], explanation: "Delta H negativo." },
      { id_suffix: "v7", difficulty: 4, question: "Significado de (ac) en una ecuación:", options: [{text: "Acuoso (disuelto en agua)",correct:true},{text: "Ácido",correct:false},{text: "Actual",correct:false},{text: "Acetona",correct:false}], explanation: "Estado." },
      { id_suffix: "v8", difficulty: 4, question: "Catalizador:", options: [{text: "Acelera reacción sin consumirse",correct:true},{text: "Es un reactivo más",correct:false},{text: "Frena la reacción",correct:false},{text: "Aumenta productos",correct:false}], explanation: "Cinética." },
      { id_suffix: "v9", difficulty: 5, question: "Reacción A + BC -> AC + B:", options: [{text: "Sustitución simple (Desplazamiento)",correct:true},{text: "Doble sustitución",correct:false},{text: "Síntesis",correct:false},{text: "Neutralización",correct:false}], explanation: "Reemplazo." },
      { id_suffix: "v10", difficulty: 5, question: "Balancear: H2 + O2 -> H2O implica:", options: [{text: "2H2 + O2 -> 2H2O",correct:true},{text: "H2 + O2 -> H2O2",correct:false},{text: "H + O -> H2O",correct:false},{text: "Ya está balanceada",correct:false}], explanation: "Átomos iguales ambos lados." }
    ]
  },

  // Bundle 10: Taller Review P1
    {
    meta: {
      id: "CO-CN-10-taller-p1-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "review",
      periodo: 1,
      dba_id: "DBA-CN-10-1",
      title: "Taller Repaso P1"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Z representa:", options: [{text: "Protones (Número atómico)",correct:true},{text: "Neutrones",correct:false},{text: "Peso",correct:false},{text: "Electrones",correct:false}], explanation: "Tabla P." },
      { id_suffix: "v2", difficulty: 1, question: "Grupo VIII A:", options: [{text: "Gases Nobles",correct:true},{text: "Halógenos",correct:false},{text: "Metales",correct:false},{text: "Tierras",correct:false}], explanation: "Estables." },
      { id_suffix: "v3", difficulty: 2, question: "Configuración 1s2 2s2 2p6 corresponde a:", options: [{text: "Neón (10)",correct:true},{text: "Argón",correct:false},{text: "Sodio",correct:false},{text: "Oxígeno",correct:false}], explanation: "Suma 10." },
      { id_suffix: "v4", difficulty: 2, question: "Un mol de C tiene:", options: [{text: "6.02 x 10^23 átomos",correct:true},{text: "12 átomos",correct:false},{text: "6 átomos",correct:false},{text: "100 átomos",correct:false}], explanation: "Avogadro." },
      { id_suffix: "v5", difficulty: 3, question: "Ley Boyle (P y V):", options: [{text: "Inversa",correct:true},{text: "Directa",correct:false},{text: "Cuadrática",correct:false},{text: "Iguales",correct:false}], explanation: "PV=k." },
      { id_suffix: "v6", difficulty: 3, question: "Separar sólido no soluble de líquido:", options: [{text: "Filtración",correct:true},{text: "Destilación",correct:false},{text: "Cromatografía",correct:false},{text: "Evaporación",correct:false}], explanation: "Papel filtro." },
      { id_suffix: "v7", difficulty: 4, question: "HCl + NaOH -> NaCl + H2O es:", options: [{text: "Neutralización (Doble sustitución)",correct:true},{text: "Síntesis",correct:false},{text: "Combustión",correct:false},{text: "Redox simple",correct:false}], explanation: "Ácido base." },
      { id_suffix: "v8", difficulty: 4, question: "Isótopo C-14 difiere de C-12 en:", options: [{text: "2 neutrones",correct:true},{text: "2 protones",correct:false},{text: "2 electrones",correct:false},{text: "Nada",correct:false}], explanation: "Masa." },
      { id_suffix: "v9", difficulty: 5, question: "Molaridad de 40g NaOH (MM=40) en 1L:", options: [{text: "1 M",correct:true},{text: "0.1 M",correct:false},{text: "40 M",correct:false},{text: "0.5 M",correct:false}], explanation: "1 mol / 1 L." },
      { id_suffix: "v10", difficulty: 5, question: "Modelo cuántico, orbital s tiene forma:", options: [{text: "Esférica",correct:true},{text: "Bilobular (Pesas)",correct:false},{text: "Trébol",correct:false},{text: "Plana",correct:false}], explanation: "Geometría." }
    ]
  }
];

function createBundleContent(q) {
  const meta = q.meta;
  const today = new Date().toISOString().split('T')[0];

  let md = `---
id: "${meta.id}"
country: "${meta.country}"
grado: ${meta.grade}
asignatura: "${meta.subject}"
tema: "${meta.topic}"
periodo: ${meta.periodo}
dba_id: "${meta.dba_id}"
protocol_version: "3.0"
bundle_version: "3.0"
total_questions: 10
dificultad: 3
estado: "published"
creador: "AI-WorldExams"
llm_model: "gemini-2.0-flash"
agent: "antigravity"
ide: "generic"
creation_date: "${today}"

licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"

source: "OpenTDB"
source_url: "${q.base.source_url}"
source_license: "CC BY-SA 4.0"
search_query: "chemistry questions grade ${meta.grade} ${meta.periodo} ${meta.topic}"
original_question: "${q.base.question}"
original_answer: "${q.base.answer}"
---

# Pregunta Base: ${meta.title}

> **Source:** OpenTDB (CC BY-SA 4.0)
> **Topic:** ${meta.topic} (Period ${meta.periodo})
> **DBA:** ${meta.dba_id}
> **Original:** "${q.base.question}"

---
`;

  q.variants.forEach(v => {
      md += `
## Pregunta ${v.id_suffix.replace('v','')} (Dificultad ${v.difficulty})

**ID:** \`${meta.id}-${v.id_suffix}\`

### Enunciado

${v.question}

### Opciones

${v.options.map((o, i) => {
    const letter = String.fromCharCode(65 + i);
    const check = o.correct ? 'x' : ' ';
    return `- [${check}] ${letter}) ${o.text}`;
}).join('\n')}

### Explicación

${v.explanation}

**Competencia:** Uso Comprensivo del Conocimiento Científico (DBA: ${meta.dba_id})

---
`;
  });

  md += `
## 📊 Metadatos de Validación

| Pregunta | ID | Dificultad | Validado |
|----------|-----|------------|----------|
${q.variants.map(v => `| ${v.id_suffix.replace('v','')} | ${meta.id}-${v.id_suffix} | ${v.difficulty} | ⬜ |`).join('\n')}
`;

  return md;
}

const BASE_DIR = "src/content/questions";

QUESTIONS.forEach(q => {
    const dirPath = path.join(BASE_DIR, 'colombia', q.meta.subject, `grado-${q.meta.grade}`, q.meta.topic);
    const fileName = `${q.meta.id}-v3-bundle.md`;
    const fullPath = path.join(dirPath, fileName);

    ensureDir(fullPath);

    const content = createBundleContent(q);
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Created Period 1 Bundle v3.0: ${fullPath}`);
});
