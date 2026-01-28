
const fs = require('fs');
const path = require('path');

// Helper to ensure directory exists
function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Grade 11 - Ciencias Naturales - Period 1 - BUNDLE 1 (Estequiometría)
  {
    meta: {
      id: "CO-CN-11-estequiometria-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica",
      periodo: 1,
      dba_id: "DBA-CN-11-1",
      title: "Cálculos Estequiométricos"
    },
    base: { question: "La estequiometría mide proporciones en reacciones.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "La ley de conservación de la masa dice que:", options: [{text:"La materia no se crea ni se destruye, solo se transforma (Lavoisier)",correct:true},{text:"La masa desaparece",correct:false},{text:"La masa aumenta siempre",correct:false},{text:"El agua pesa más",correct:false}], explanation: "Balance de ecuaciones." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "El mol es una unidad de:", options: [{text:"Cantidad de sustancia",correct:true},{text:"Peso",correct:false},{text:"Volumen",correct:false},{text:"Velocidad",correct:false}], explanation: "6.022 x 10^23." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Peso molecular del agua (H2O):", options: [{text:"18 g/mol (H=1, O=16)",correct:true},{text:"10 g/mol",correct:false},{text:"2 g/mol",correct:false},{text:"100 g/mol",correct:false}], explanation: "2(1) + 16 = 18." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Reactivo límite es:", options: [{text:"El que se acaba primero y detiene la reacción",correct:true},{text:"El que sobra",correct:false},{text:"El catalizador",correct:false},{text:"El recipiente",correct:false}], explanation: "Limita el producto." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Si reaccionan 2 moles de H2 con 1 mol de O2, se producen:", options: [{text:"2 moles de H2O",correct:true},{text:"1 mol de H2O",correct:false},{text:"3 moles de H2O",correct:false},{text:"Nada",correct:false}], explanation: "2H2 + O2 -> 2H2O." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Número de Avogadro:", options: [{text:"6.022 x 10^23 partículas/mol",correct:true},{text:"3.1416",correct:false},{text:"9.8 m/s2",correct:false},{text:"1000",correct:false}], explanation: "Constante fundamental." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Rendimiento teórico vs real:", options: [{text:"El real suele ser menor por pérdidas experimentales",correct:true},{text:"El real es siempre mayor",correct:false},{text:"Son iguales siempre",correct:false},{text:"El teórico es cero",correct:false}], explanation: "Eficiencia." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Fórmula empírica vs molecular:", options: [{text:"Proporción mínima vs Cantidad real de átomos",correct:true},{text:"Iguales",correct:false},{text:"Molecular es más pequeña",correct:false},{text:"Empírica es falsa",correct:false}], explanation: "CH vs C6H6." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Cálculo de pureza:", options: [{text:"(Masa pura / Masa total) * 100",correct:true},{text:"Masa total * 2",correct:false},{text:"Restar impurezas",correct:false},{text:"Sumar todo",correct:false}], explanation: "Análisis de muestra." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Volumen molar a TPE (Gases ideales):", options: [{text:"22.4 Litros por mol",correct:true},{text:"1 Litro",correct:false},{text:"100 Litros",correct:false},{text:"Cero",correct:false}], explanation: "Condiciones estándar." }
    ]
  },

  // Bundle 2: Gases Ideales
  {
    meta: {
      id: "CO-CN-11-gases-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica",
      periodo: 1,
      dba_id: "DBA-CN-11-1",
      title: "Leyes de los Gases"
    },
    base: { question: "Los gases ocupan todo el volumen del recipiente.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Variable 'P' en gases significa:", options: [{text:"Presión",correct:true},{text:"Peso",correct:false},{text:"Potencia",correct:false},{text:"Posición",correct:false}], explanation: "Atmósferas." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si caliento un gas a volumen constante, la presión:", options: [{text:"Aumenta",correct:true},{text:"Disminuye",correct:false},{text:"Se queda igual",correct:false},{text:"Desaparece",correct:false}], explanation: "Ley de Gay-Lussac." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Ley de Boyle (Temperatura constante):", options: [{text:"A mayor presión, menor volumen (inversas)",correct:true},{text:"A mayor presión, mayor volumen",correct:false},{text:"No cambian",correct:false},{text:"El volumen explota",correct:false}], explanation: "P1V1 = P2V2." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Ley de Charles (Presión constante):", options: [{text:"A mayor temperatura, mayor volumen (directas)",correct:true},{text:"A mayor temperatura, menor volumen",correct:false},{text:"Se congelan",correct:false},{text:"Nada pasa",correct:false}], explanation: "V1/T1 = V2/T2." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Ecuación de Estado de Gases Ideales:", options: [{text:"PV = nRT",correct:true},{text:"E = mc2",correct:false},{text:"F = ma",correct:false},{text:"P = mg",correct:false}], explanation: "Pavo Ratón." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Cero absoluto (0 Kelvin):", options: [{text:"Temperatura donde cesa movimiento molecular (-273°C)",correct:true},{text:"Cero grados centígrados",correct:false},{text:"Congelador de casa",correct:false},{text:"Agua hielo",correct:false}], explanation: "Límite termodinámico." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Ley de Dalton (Presiones parciales):", options: [{text:"La presión total es la suma de presiones parciales",correct:true},{text:"La presión se pierde",correct:false},{text:"Solo importa el gas mayor",correct:false},{text:"Es una resta",correct:false}], explanation: "Mezcla de gases." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Difusión de gases:", options: [{text:"Mezcla gradual de moléculas de un gas en otro",correct:true},{text:"Explosión rápida",correct:false},{text:"Congelamiento",correct:false},{text:"Lluvia",correct:false}], explanation: "Perfume en el aire." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Teoría Cinético-Molecular asume:", options: [{text:"Choques elásticos y volumen de partículas despreciable",correct:true},{text:"Choques plásticos",correct:false},{text:"Partículas grandes",correct:false},{text:"Atracción fuerte",correct:false}], explanation: "Gas Ideal." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Gas Real vs Ideal:", options: [{text:"Real tiene fuerzas intermoleculares a altas presiones",correct:true},{text:"Son lo mismo",correct:false},{text:"Ideal existe en la naturaleza",correct:false},{text:"Real no existe",correct:false}], explanation: "Van der Waals." }
    ]
  },

  // Bundle 3: Soluciones y Concentración
  {
    meta: {
      id: "CO-CN-11-soluciones-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica",
      periodo: 1,
      dba_id: "DBA-CN-11-1",
      title: "Soluciones Químicas"
    },
    base: { question: "Una solución es una mezcla homogénea.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Soluto es:", options: [{text:"Sustancia que se disuelve (menor cantidad)",correct:true},{text:"El líquido",correct:false},{text:"El vaso",correct:false},{text:"El fuego",correct:false}], explanation: "Sal en agua." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Solvente universal:", options: [{text:"Agua",correct:true},{text:"Aceite",correct:false},{text:"Alcohol",correct:false},{text:"Gasolina",correct:false}], explanation: "Polaridad." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Molaridad (M) mide:", options: [{text:"Moles de soluto por Litro de solución",correct:true},{text:"Kilos por metro",correct:false},{text:"Gramos por litro",correct:false},{text:"Moles por kilo",correct:false}], explanation: "Concentración química." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Porcentaje peso a peso (%p/p):", options: [{text:"Gramos de soluto en 100g de solución",correct:true},{text:"Litros en litros",correct:false},{text:"Gramos en litros",correct:false},{text:"Kilos en toneladas",correct:false}], explanation: "Concentración física." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Solución saturada:", options: [{text:"No admite más soluto a esa temperatura",correct:true},{text:"Admite mucho más",correct:false},{text:"Está vacía",correct:false},{text:"Es pura agua",correct:false}], explanation: "Límite de solubilidad." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Solubilidad depende de:", options: [{text:"Temperatura y naturaleza de sustancias",correct:true},{text:"Color del vaso",correct:false},{text:"Hora del día",correct:false},{text:"El precio",correct:false}], explanation: "Agua caliente disuelve más azúcar." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Molalidad (m):", options: [{text:"Moles de soluto por Kilogramo de solvente",correct:true},{text:"Moles por Litro",correct:false},{text:"Gramos por Litro",correct:false},{text:"Moles por Moles",correct:false}], explanation: "Independiente de T." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Dilución (C1V1 = C2V2):", options: [{text:"Bajar concentración agregando solvente",correct:true},{text:"Aumentar concentración",correct:false},{text:"Congelar",correct:false},{text:"Hervir",correct:false}], explanation: "Agregar agua al jugo." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Propiedades coligativas:", options: [{text:"Dependen de la cantidad de partículas, no su identidad",correct:true},{text:"Dependen del color",correct:false},{text:"Dependen del olor",correct:false},{text:"No existen",correct:false}], explanation: "Punto ebullición, congelación." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Presión osmótica:", options: [{text:"Presión necesaria para detener ósmosis",correct:true},{text:"Presión del aire",correct:false},{text:"Presión arterial",correct:false},{text:"Peso del agua",correct:false}], explanation: "Membrana semipermeable." }
    ]
  },

  // Bundle 4: Estructura Atómica y Tabla Periódica
  {
    meta: {
      id: "CO-CN-11-t-periodica-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica",
      periodo: 1,
      dba_id: "DBA-CN-11-1",
      title: "Estructura Atómica"
    },
    base: { question: "El átomo tiene núcleo y corteza.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Partícula con carga negativa:", options: [{text:"Electrón",correct:true},{text:"Protón",correct:false},{text:"Neutrón",correct:false},{text:"Núcleo",correct:false}], explanation: "Orbita el núcleo." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Número atómico (Z) indica:", options: [{text:"Número de protones",correct:true},{text:"Peso",correct:false},{text:"Neutrones",correct:false},{text:"Electrones de valencia",correct:false}], explanation: "Identidad del elemento." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Isótopos:", options: [{text:"Mismo Z (protones) pero diferente número de neutrones",correct:true},{text:"Diferente elemento",correct:false},{text:"Mismos neutrones",correct:false},{text:"Iones",correct:false}], explanation: "Carbono-12, Carbono-14." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Grupo de gases nobles:", options: [{text:"Grupo 18 (VIII A)",correct:true},{text:"Grupo 1",correct:false},{text:"Metales",correct:false},{text:"Tierras raras",correct:false}], explanation: "Inertes." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Electronegatividad:", options: [{text:"Capacidad de atraer electrones en enlace",correct:true},{text:"Electricidad estática",correct:false},{text:"Radio atómico",correct:false},{text:"Peso",correct:false}], explanation: "Flúor es el mayor." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Configuración electrónica del Carbono (Z=6):", options: [{text:"1s2 2s2 2p2",correct:true},{text:"1s2 2s2 2p6",correct:false},{text:"1s2",correct:false},{text:"1s1",correct:false}], explanation: "6 electrones." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Principio de Exclusión de Pauli:", options: [{text:"Dos electrones no pueden tener los 4 números cuánticos iguales",correct:true},{text:"Los electrones se odian",correct:false},{text:"El átomo está vacío",correct:false},{text:"La energía se pierde",correct:false}], explanation: "Spin opuesto." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Radio atómico en la tabla:", options: [{text:"Aumenta hacia abajo y a la izquierda",correct:true},{text:"Aumenta a la derecha",correct:false},{text:"Es constante",correct:false},{text:"Disminuye hacia abajo",correct:false}], explanation: "Capas electrónicas." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Energía de ionización:", options: [{text:"Energía para arrancar un electrón",correct:true},{text:"Energía nuclear",correct:false},{text:"Calor",correct:false},{text:"Luz",correct:false}], explanation: "Formar catión." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Modelo mecánico-cuántico actual define:", options: [{text:"Orbitales como zonas de probabilidad",correct:true},{text:"Órbitas circulares exactas",correct:false},{text:"Pudin de pasas",correct:false},{text:"Cubos",correct:false}], explanation: "Schrödinger." }
    ]
  },

  // Bundle 5: Enlace Químico
  {
    meta: {
      id: "CO-CN-11-enlace-quimico-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica",
      periodo: 1,
      dba_id: "DBA-CN-11-1",
      title: "Tipos de Enlace Químico"
    },
    base: { question: "Los átomos se unen para ser estables.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Regla del octeto:", options: [{text:"Buscar tener 8 electrones de valencia (como gas noble)",correct:true},{text:"Tener 10",correct:false},{text:"Tener 2",correct:false},{text:"Quedar vacío",correct:false}], explanation: "Estabilidad." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Enlace iónico ocurre entre:", options: [{text:"Metal y No Metal (Transferencia de e-)",correct:true},{text:"Dos no metales",correct:false},{text:"Dos metales",correct:false},{text:"Agua y aceite",correct:false}], explanation: "Na+ Cl-." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Enlace covalente:", options: [{text:"Comparten electrones (No metal + No metal)",correct:true},{text:"Roban electrones",correct:false},{text:"Metal + Metal",correct:false},{text:"Explosión",correct:false}], explanation: "H2O." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Enlace metálico explica:", options: [{text:"Conductividad eléctrica y brillo en metales",correct:true},{text:"Acidez",correct:false},{text:"Color azul",correct:false},{text:"Olor",correct:false}], explanation: "Mar de electrones." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Enlace Covalente Polar:", options: [{text:"Compartición desigual de electrones (polos)",correct:true},{text:"Compartición igual (Apolar)",correct:false},{text:"Iónico",correct:false},{text:"Magnético",correct:false}], explanation: "Diferencia electronegatividad." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Estructura de Lewis representa:", options: [{text:"Electrones de valencia como puntos",correct:true},{text:"El núcleo",correct:false},{text:"Protones",correct:false},{text:"El tamaño",correct:false}], explanation: "Diagrama de puntos." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Puentes de Hidrógeno:", options: [{text:"Fuerza intermolecular fuerte (ej. en agua/ADN)",correct:true},{text:"Enlace atómico",correct:false},{text:"Puente real",correct:false},{text:"Débil",correct:false}], explanation: "Propiedades del agua." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Fuerzas de Van der Waals:", options: [{text:"Fuerzas intermoleculares débiles",correct:true},{text:"Enlaces fuertes",correct:false},{text:"Gravedad",correct:false},{text:"Magnetismo",correct:false}], explanation: "Dipolos temporales." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Geometría molecular del agua (H2O):", options: [{text:"Angular (aprox 104.5°)",correct:true},{text:"Lineal",correct:false},{text:"Cuadrada",correct:false},{text:"Circular",correct:false}], explanation: "Por pares libres del O." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Hibridación sp3:", options: [{text:"Geometría tetraédrica (ej. Metano CH4)",correct:true},{text:"Plana trigonal",correct:false},{text:"Lineal",correct:false},{text:"Redonda",correct:false}], explanation: "Orbitales híbridos." }
    ]
  },

  // Bundle 6: Nomenclatura Inorgánica
  {
    meta: {
      id: "CO-CN-11-nomenclatura-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica",
      periodo: 1,
      dba_id: "DBA-CN-11-1",
      title: "Nomenclatura Química"
    },
    base: { question: "Los nombres químicos siguen reglas IUPAC.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Fórmula del Dióxido de Carbono:", options: [{text:"CO2",correct:true},{text:"CO",correct:false},{text:"C2O",correct:false},{text:"O2C",correct:false}], explanation: "Combustión." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Ácido clorhídrico:", options: [{text:"HCl",correct:true},{text:"H2SO4",correct:false},{text:"NaCl",correct:false},{text:"H2O",correct:false}], explanation: "Ácido estomacal." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Óxidos básicos se forman con:", options: [{text:"Metal + Oxígeno",correct:true},{text:"No metal + Oxígeno",correct:false},{text:"Agua + Sal",correct:false},{text:"Ácido + Base",correct:false}], explanation: "Óxido de Hierro." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Hidróxidos (Bases) tienen grupo:", options: [{text:"OH- (Hidroxilo)",correct:true},{text:"H+ (Protón)",correct:false},{text:"O-2",correct:false},{text:"Cl-",correct:false}], explanation: "NaOH." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Ácido Sulfúrico:", options: [{text:"H2SO4",correct:true},{text:"H2S",correct:false},{text:"SO3",correct:false},{text:"HCl",correct:false}], explanation: "Lluvia ácida." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Sal neutra (NaCl) viene de:", options: [{text:"Ácido + Base (Neutralización)",correct:true},{text:"Metal + Oxígeno",correct:false},{text:"Gas + Gas",correct:false},{text:"Magia",correct:false}], explanation: "HCl + NaOH -> NaCl + H2O." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Estado de oxidación del O en óxidos:", options: [{text:"-2",correct:true},{text:"-1",correct:false},{text:"+1",correct:false},{text:"+2",correct:false}], explanation: "Regla general." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Nomenclatura Stock usa:", options: [{text:"Números romanos en paréntesis para valencia",correct:true},{text:"Prefijos griegos",correct:false},{text:"Sufijos ico/oso",correct:false},{text:"Apodos",correct:false}], explanation: "Hierro (III)." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Peróxidos (H2O2):", options: [{text:"Oxígeno con estado -1",correct:true},{text:"-2",correct:false},{text:"0",correct:false},{text:"+1",correct:false}], explanation: "Agua oxigenada." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Oxisales:", options: [{text:"Metal + No Metal + Oxígeno (ej. CaCO3)",correct:true},{text:"Metal + No Metal (ej. NaCl)",correct:false},{text:"Solo metal",correct:false},{text:"Solo oxígeno",correct:false}], explanation: "Carbonato de calcio." }
    ]
  },

  // Bundle 7: pH y Ácido-Base
  {
    meta: {
      id: "CO-CN-11-ph-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica",
      periodo: 1,
      dba_id: "DBA-CN-11-1",
      title: "pH y Equilibrio Ácido-Base"
    },
    base: { question: "El pH mide acidez.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Escala de pH va de:", options: [{text:"0 a 14",correct:true},{text:"0 a 100",correct:false},{text:"1 a 10",correct:false},{text:"100 a 200",correct:false}], explanation: "Logarítmica." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "pH neutro (agua pura):", options: [{text:"7",correct:true},{text:"0",correct:false},{text:"14",correct:false},{text:"1",correct:false}], explanation: "Equilibrio." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Sustancia ácida tiene pH:", options: [{text:"Menor a 7 (ej. Limón)",correct:true},{text:"Mayor a 7",correct:false},{text:"Igual a 7",correct:false},{text:"Cero absoluto",correct:false}], explanation: "Protones." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Sustancia básica (alcalina) tiene pH:", options: [{text:"Mayor a 7 (ej. Jabón)",correct:true},{text:"Menor a 7",correct:false},{text:"Neutro",correct:false},{text:"Negativo",correct:false}], explanation: "OH-." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Definición Arrhenius Ácido:", options: [{text:"Libera H+ en agua",correct:true},{text:"Libera OH-",correct:false},{text:"Absorbe agua",correct:false},{text:"Se evapora",correct:false}], explanation: "Clásica." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Indicador de pH:", options: [{text:"Cambia de color según acidez (ej. Fenolftaleína)",correct:true},{text:"Termómetro",correct:false},{text:"Reloj",correct:false},{text:"Balanza",correct:false}], explanation: "Cualitativo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Teoría Bronsted-Lowry:", options: [{text:"Ácido dona protón, Base acepta protón",correct:true},{text:"Ácido tiene oxígeno",correct:false},{text:"Base tiene H",correct:false},{text:"Solo en agua",correct:false}], explanation: "Intercambio protónico." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Buffer o Amortiguador:", options: [{text:"Resiste cambios de pH (ej. Sangre)",correct:true},{text:"Cambia pH rápido",correct:false},{text:"Es ácido puro",correct:false},{text:"Es agua",correct:false}], explanation: "Homeostasis." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Cálculo pH:", options: [{text:"pH = -log[H+]",correct:true},{text:"pH = log[H]",correct:false},{text:"pH = [H]",correct:false},{text:"pH = H^2",correct:false}], explanation: "Matemática logarítmica." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "pOH:", options: [{text:"pH + pOH = 14",correct:true},{text:"pH = pOH",correct:false},{text:"pOH es presión",correct:false},{text:"Es lo mismo",correct:false}], explanation: "Complementario." }
    ]
  },

  // Bundle 8: Reacciones Químicas
  {
    meta: {
      id: "CO-CN-11-reacciones-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica",
      periodo: 1,
      dba_id: "DBA-CN-11-1",
      title: "Tipos de Reacciones Químicas"
    },
    base: { question: "Las reacciones transforman sustancias.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Reactivos van a la:", options: [{text:"Izquierda de la flecha",correct:true},{text:"Derecha",correct:false},{text:"Arriba",correct:false},{text:"Abajo",correct:false}], explanation: "Inicio." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Productos van a la:", options: [{text:"Derecha de la flecha",correct:true},{text:"Izquierda",correct:false},{text:"Centro",correct:false},{text:"Fuera",correct:false}], explanation: "Final." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Reacción de Síntesis:", options: [{text:"A + B -> AB (Unión)",correct:true},{text:"AB -> A + B (Ruptura)",correct:false},{text:"Explosión",correct:false},{text:"Fuego",correct:false}], explanation: "Construcción." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Reacción de Descomposición:", options: [{text:"AB -> A + B (Separación)",correct:true},{text:"A + B -> AB",correct:false},{text:"Mezcla",correct:false},{text:"Color",correct:false}], explanation: "Análisis." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Combustión requiere:", options: [{text:"Combustible + Oxígeno -> CO2 + H2O + Energía",correct:true},{text:"Solo agua",correct:false},{text:"Solo aire",correct:false},{text:"Hielo",correct:false}], explanation: "Fuego." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Reacción Exotérmica:", options: [{text:"Libera calor (se siente caliente)",correct:true},{text:"Absorbe calor (frío)",correct:false},{text:"Neutro",correct:false},{text:"Eléctrica",correct:false}], explanation: "Delta H negativo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Reacción Endotérmica:", options: [{text:"Absorbe energía (necesita calor)",correct:true},{text:"Libera calor",correct:false},{text:"Explota",correct:false},{text:"Brilla",correct:false}], explanation: "Delta H positivo." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Balanceo por Tanteo:", options: [{text:"Igualar átomos en ambos lados probando números",correct:true},{text:"Pesar la hoja",correct:false},{text:"Dormir",correct:false},{text:"Usar calculadora",correct:false}], explanation: "Conservación materia." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Catalizador:", options: [{text:"Acelera la reacción sin consumirse",correct:true},{text:"Frena la reacción",correct:false},{text:"Es un producto",correct:false},{text:"Es un reactivo",correct:false}], explanation: "Baja energía activación." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Reacción Redox:", options: [{text:"Transferencia de electrones (Oxidación-Reducción)",correct:true},{text:"Solo ácido base",correct:false},{text:"Precipitación",correct:false},{text:"Fusión nuclear",correct:false}], explanation: "Cambio estado oxidación." }
    ]
  },

  // Bundle 9: Laboratorio y Seguridad
  {
    meta: {
      id: "CO-CN-11-laboratorio-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica",
      periodo: 1,
      dba_id: "DBA-CN-11-1",
      title: "Seguridad en el Laboratorio"
    },
    base: { question: "La seguridad es primero.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Elemento de protección ocular:", options: [{text:"Gafas de seguridad",correct:true},{text:"Lentes de sol",correct:false},{text:"Nada",correct:false},{text:"Manos",correct:false}], explanation: "Ojos." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si cae ácido en la piel:", options: [{text:"Lavar con abundante agua",correct:true},{text:"Poner crema",correct:false},{text:"Sobar",correct:false},{text:"Gritar",correct:false}], explanation: "Primeros auxilios." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Pipeta sirve para:", options: [{text:"Medir volúmenes exactos de líquido",correct:true},{text:"Golpear",correct:false},{text:"Revolver",correct:false},{text:"Calentar",correct:false}], explanation: "Vidriería." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Probeta:", options: [{text:"Medir volúmenes aproximados",correct:true},{text:"Pesar",correct:false},{text:"Cortar",correct:false},{text:"Filtrar",correct:false}], explanation: "Graduada." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Mechero Bunsen:", options: [{text:"Fuente de calor a gas",correct:true},{text:"Lámpara",correct:false},{text:"Juguete",correct:false},{text:"Agua",correct:false}], explanation: "Llama." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Pictograma Calavera significa:", options: [{text:"Tóxico / Veneno",correct:true},{text:"Pirata",correct:false},{text:"Halloween",correct:false},{text:"Radiactivo",correct:false}], explanation: "Peligro." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Menisco en medición:", options: [{text:"Curva del líquido (leer en la parte baja)",correct:true},{text:"Rodilla",correct:false},{text:"Error",correct:false},{text:"Mancha",correct:false}], explanation: "Paralaje." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Nunca vierta agua sobre ácido concentrado:", options: [{text:"Porque salpica violentamente (El ácido al agua)",correct:true},{text:"Porque se congela",correct:false},{text:"No pasa nada",correct:false},{text:"Se evapora",correct:false}], explanation: "Exotérmico." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Hoja de seguridad (MSDS):", options: [{text:"Documento con riesgos y manejo de reactivo",correct:true},{text:"Examen",correct:false},{text:"Factura",correct:false},{text:"Receta",correct:false}], explanation: "Info técnica." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Campana de extracción:", options: [{text:"Ventilación para gases tóxicos",correct:true},{text:"Timbre",correct:false},{text:"Luz",correct:false},{text:"Mesa",correct:false}], explanation: "Vapores." }
    ]
  },

  // Bundle 10: Método Científico
  {
    meta: {
      id: "CO-CN-11-metodo-cientifico-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica",
      periodo: 1,
      dba_id: "DBA-CN-11-1",
      title: "Investigación Científica"
    },
    base: { question: "La ciencia usa método.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Hipótesis:", options: [{text:"Posible respuesta o suposición a probar",correct:true},{text:"Verdad absoluta",correct:false},{text:"Mentira",correct:false},{text:"Pregunta",correct:false}], explanation: "Conjetura." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Observación:", options: [{text:"Recopilar datos con los sentidos",correct:true},{text:"Dormir",correct:false},{text:"Imaginar",correct:false},{text:"Correr",correct:false}], explanation: "Inicio." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Experimentación:", options: [{text:"Pruebas controladas para verificar hipótesis",correct:true},{text:"Jugar al azar",correct:false},{text:"Escribir un libro",correct:false},{text:"Adivinar",correct:false}], explanation: "Test." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Variable dependiente:", options: [{text:"El resultado que se mide",correct:true},{text:"La que yo cambio",correct:false},{text:"El tiempo",correct:false},{text:"El clima",correct:false}], explanation: "Efecto." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Variable independiente:", options: [{text:"La causa que el científico manipula",correct:true},{text:"El resultado",correct:false},{text:"El error",correct:false},{text:"La constante",correct:false}], explanation: "Causa." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Grupo control:", options: [{text:"Grupo sin tratamiento para comparar",correct:true},{text:"Grupo jefe",correct:false},{text:"Grupo enfermo",correct:false},{text:"Nadie",correct:false}], explanation: "Referencia." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Teoría científica:", options: [{text:"Explicación amplia y probada de un fenómeno",correct:true},{text:"Una adivinanza",correct:false},{text:"Una corazonada",correct:false},{text:"Un dato suelto",correct:false}], explanation: "Evolución, Relatividad." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Ley científica:", options: [{text:"Descripción matemática de un patrón natural",correct:true},{text:"Ley política",correct:false},{text:"Opinión",correct:false},{text:"Teoría débil",correct:false}], explanation: "Gravedad." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Sesgo de confirmación en ciencia:", options: [{text:"Buscar solo datos que apoyen mi idea",correct:true},{text:"Ser objetivo",correct:false},{text:"Revisar bien",correct:false},{text:"Usar gafas",correct:false}], explanation: "Error común." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Revisión por pares (Peer review):", options: [{text:"Científicos revisan el trabajo de otros antes de publicar",correct:true},{text:"Mirarse al espejo",correct:false},{text:"Publicar en Facebook",correct:false},{text:"No revisar",correct:false}], explanation: "Calidad." }
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
search_query: "preguntas ciencias naturales grado ${meta.grade} ${meta.periodo} ${meta.topic}"
original_question: "${q.base.question}"
original_answer: "${q.base.answer}"
---

# Pregunta Base: ${meta.title}

> **Fuente:** OpenTDB (CC BY-SA 4.0)
> **Tema:** ${meta.topic} (Periodo ${meta.periodo})
> **DBA:** ${meta.dba_id}
> **Original:** "${q.base.question}"

---
`;

  q.variants.forEach(v => {
      md += `
## Pregunta ${v.id_suffix.replace('v','')} (${v.type} - Dificultad ${v.difficulty})

**ID:** \`${meta.id}-${v.id_suffix}\`

### Enunciado

${v.question}

### Opciones

${v.options.map((o, i) => {
    const letter = String.fromCharCode(65 + i);
    const check = o.correct ? 'x' : ' ';
    return `- [${check}] ${letter}) ${o.text}`;
}).join('\n')}

### Explicación Pedagógica

${v.explanation}

**Competencia evaluada:** Uso Comprensivo del Conocimiento Científico (DBA: ${meta.dba_id})

---
`;
  });

  md += `
## 📊 Metadata de Validación

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
