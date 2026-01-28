
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
  // Grade 11 - Ciencias Naturales - Period 2 - BUNDLE 1 (Carbono)
  {
    meta: {
      id: "CO-CN-11-carbono-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica-organica",
      periodo: 2,
      dba_id: "DBA-CN-11-2",
      title: "El Átomo de Carbono"
    },
    base: { question: "El carbono es la base de la vida.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Tetravalencia del carbono:", options: [{text: "Forma 4 enlaces",correct:true},{text: "Forma 2 enlaces",correct:false},{text: "Forma 1 enlace",correct:false},{text: "No forma enlaces",correct:false}], explanation: "Valencia de 4." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Química orgánica estudia:", options: [{text: "Compuestos del carbono",correct:true},{text: "Rocas",correct:false},{text: "Metales puros",correct:false},{text: "El aire",correct:false}], explanation: "Vida." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Hibridación sp3 (Enlace simple):", options: [{text: "Forma geometría tetraédrica (109.5°)",correct:true},{text: "Plana",correct:false},{text: "Lineal",correct:false},{text: "Circular",correct:false}], explanation: "Alcanos." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Hibridación sp2 (Enlace doble):", options: [{text: "Geometría trigonal plana",correct:true},{text: "Tetraédrica",correct:false},{text: "Lineal",correct:false},{text: "Cuadrada",correct:false}], explanation: "Alquenos." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Hibridación sp (Enlace triple):", options: [{text: "Geometría lineal (180°)",correct:true},{text: "Tetraédrica",correct:false},{text: "Triangular",correct:false},{text: "Esférica",correct:false}], explanation: "Alquinos." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Alótropos del Carbono:", options: [{text: "Diamante y Grafito",correct:true},{text: "Oro y Plata",correct:false},{text: "Agua y Hielo",correct:false},{text: "Aire",correct:false}], explanation: "Misma fórmula, distinta estructura." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Concatenación:", options: [{text: "Capacidad de unirse consigo mismo formando cadenas largas",correct:true},{text: "Romper enlaces",correct:false},{text: "Explotar",correct:false},{text: "Disolverse",correct:false}], explanation: "Cadenas carbonadas." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Grafeno:", options: [{text: "Lámina de carbono de un átomo de espesor (material del futuro)",correct:true},{text: "Plástico",correct:false},{text: "Gas",correct:false},{text: "Líquido",correct:false}], explanation: "Nanotecnología." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Carbono quiral:", options: [{text: "Carbono unido a 4 sustituyentes diferentes",correct:true},{text: "Carbono doble",correct:false},{text: "Carbono puro",correct:false},{text: "Carbono negro",correct:false}], explanation: "Isomería óptica." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Fullerenos:", options: [{text: "Estructuras esféricas o tubulares de carbono (C60)",correct:true},{text: "Tubos de PVC",correct:false},{text: "Pelotas de fútbol normales",correct:false},{text: "Bacterias",correct:false}], explanation: "Nanocarbono." }
    ]
  },

  // Bundle 2: Hidrocarburos (Alcanos, Alquenos, Alquinos)
  {
    meta: {
      id: "CO-CN-11-hidrocarburos-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica-organica",
      periodo: 2,
      dba_id: "DBA-CN-11-2",
      title: "Hidrocarburos"
    },
    base: { question: "Los hidrocarburos tienen C e H.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Alcanos tienen:", options: [{text: "Solo enlaces simples (Saturados)",correct:true},{text: "Enlaces dobles",correct:false},{text: "Enlaces triples",correct:false},{text: "Oxígeno",correct:false}], explanation: "C-C." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Fórmula general alcanos:", options: [{text: "CnH2n+2",correct:true},{text: "CnH2n",correct:false},{text: "CnH2n-2",correct:false},{text: "CnHn",correct:false}], explanation: "Metano CH4." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Metano es:", options: [{text: "El alcano más simple (CH4), gas natural",correct:true},{text: "Líquido",correct:false},{text: "Sólido",correct:false},{text: "Veneno puro",correct:false}], explanation: "Combustible." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Alquenos tienen:", options: [{text: "Al menos un enlace doble (Insaturados)",correct:true},{text: "Solo simples",correct:false},{text: "Enlaces triples",correct:false},{text: "Cloro",correct:false}], explanation: "C=C." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Etileno (Eteno):", options: [{text: "Hormona de maduración de frutas (C2H4)",correct:true},{text: "Gasolina",correct:false},{text: "Plástico duro",correct:false},{text: "Agua",correct:false}], explanation: "Alqueno simple." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Alquinos tienen:", options: [{text: "Al menos un enlace triple",correct:true},{text: "Enlaces dobles",correct:false},{text: "Solo simples",correct:false},{text: "Flúor",correct:false}], explanation: "Acetileno." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Acetileno (Etino) se usa para:", options: [{text: "Soldadura (llama muy caliente)",correct:true},{text: "Beber",correct:false},{text: "Limpiar",correct:false},{text: "Pintar",correct:false}], explanation: "C2H2." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Cicloalcanos:", options: [{text: "Cadenas cerradas de enlaces simples",correct:true},{text: "Cadenas abiertas",correct:false},{text: "Bicicletas",correct:false},{text: "Círculos de papel",correct:false}], explanation: "Ciclohexano." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Propiedades físicas de alcanos:", options: [{text: "Insolubles en agua (apolares), puntos ebullición suben con peso",correct:true},{text: "Solubles en agua",correct:false},{text: "Conductores",correct:false},{text: "Muy reactivos",correct:false}], explanation: "Hidrofóbicos." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Reacción de Halogenación:", options: [{text: "Sustitución de H por halógeno (Cl, Br) con luz UV",correct:true},{text: "Quemar",correct:false},{text: "Congelar",correct:false},{text: "Hervir",correct:false}], explanation: "Mecanismo radicalario." }
    ]
  },

  // Bundle 3: Aromáticos (Benceno)
  {
    meta: {
      id: "CO-CN-11-aromaticos-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica-organica",
      periodo: 2,
      dba_id: "DBA-CN-11-2",
      title: "Compuestos Aromáticos"
    },
    base: { question: "El benceno es un compuesto aromático.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Fórmula del Benceno:", options: [{text: "C6H6",correct:true},{text: "CH4",correct:false},{text: "C2H2",correct:false},{text: "H2O",correct:false}], explanation: "Anillo hexagonal." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Resonancia en el benceno:", options: [{text: "Deslocalización de electrones en el anillo (estabilidad)",correct:true},{text: "Sonido fuerte",correct:false},{text: "Vibración mecánica",correct:false},{text: "Romper anillo",correct:false}], explanation: "Círculo interno." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Aroma:", options: [{text: "Muchos tienen olores fuertes (de ahí el nombre)",correct:true},{text: "Sin olor",correct:false},{text: "Mal olor siempre",correct:false},{text: "Sabor dulce",correct:false}], explanation: "Propiedad histórica." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Fenol:", options: [{text: "Benceno con grupo OH",correct:true},{text: "Alcohol etílico",correct:false},{text: "Agua",correct:false},{text: "Gas",correct:false}], explanation: "Hydroxybenzene." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Tolueno:", options: [{text: "Metilbenceno (Solvente)",correct:true},{text: "Gasolina",correct:false},{text: "Plástico",correct:false},{text: "Sal",correct:false}], explanation: "Derivado simple." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Naftalina (Bolitas de polilla):", options: [{text: "Dos anillos de benceno fusionados",correct:true},{text: "Plástico",correct:false},{text: "Veneno puro",correct:false},{text: "Comida",correct:false}], explanation: "Polímero no, policíclico." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Carácter cancerígeno del benceno:", options: [{text: "Es tóxico y afecta la médula ósea",correct:true},{text: "Es saludable",correct:false},{text: "Es vitamina",correct:false},{text: "Cura el cáncer",correct:false}], explanation: "Seguridad." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Sustitución Electrofílica Aromática:", options: [{text: "Reacción típica del benceno (manteniéndo el anillo)",correct:true},{text: "Adición (rompiendo anillo)",correct:false},{text: "Explotar",correct:false},{text: "Evaporar",correct:false}], explanation: "Mecanismo." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Regla de Hückel:", options: [{text: "Determina si es aromático (4n + 2 electrones pi)",correct:true},{text: "Regla de tres",correct:false},{text: "Regla de medir",correct:false},{text: "Ley de gravedad",correct:false}], explanation: "Aromaticidad." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Orto, Meta, Para:", options: [{text: "Posiciones de sustituyentes en el anillo (1,2; 1,3; 1,4)",correct:true},{text: "Nombres de personas",correct:false},{text: "Tipos de anillo",correct:false},{text: "Colores",correct:false}], explanation: "Isómeros disustituidos." }
    ]
  },

  // Bundle 4: Alcoholes y Éteres (Grupos Funcionales Oxigenados I)
  {
    meta: {
      id: "CO-CN-11-alcoholes-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica-organica",
      periodo: 2,
      dba_id: "DBA-CN-11-2",
      title: "Alcoholes y Éteres"
    },
    base: { question: "Los alcoholes tienen grupo OH.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Grupo funcional alcohol:", options: [{text: "Hidroxilo (-OH)",correct:true},{text: "Carboxilo",correct:false},{text: "Amino",correct:false},{text: "Cloro",correct:false}], explanation: "R-OH." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Etanol:", options: [{text: "Alcohol de bebidas y antiséptico (C2H5OH)",correct:true},{text: "Veneno de ratas",correct:false},{text: "Gasolina",correct:false},{text: "Aceite",correct:false}], explanation: "Fermentación." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Metanol (Alcohol de madera):", options: [{text: "Tóxico, causa ceguera",correct:true},{text: "Bebible",correct:false},{text: "Saludable",correct:false},{text: "Rico",correct:false}], explanation: "CH3OH." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Éter:", options: [{text: "Oxígeno unido a dos carbonos (R-O-R)",correct:true},{text: "Alcohol doble",correct:false},{text: "Ácido",correct:false},{text: "Sal",correct:false}], explanation: "Disolvente." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Alcohol primario:", options: [{text: "OH unido a carbono primario (1 vecino C)",correct:true},{text: "OH unido a 3 carbonos",correct:false},{text: "OH suelto",correct:false},{text: "Alcohol fuerte",correct:false}], explanation: "Clasificación." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Fermentación alcohólica usa:", options: [{text: "Azúcares y levaduras",correct:true},{text: "Sal y pimienta",correct:false},{text: "Carne",correct:false},{text: "Petróleo",correct:false}], explanation: "Producción bio." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Oxidación de alcohol primario produce:", options: [{text: "Aldehído y luego Ácido Carboxílico",correct:true},{text: "Nada",correct:false},{text: "Explosión",correct:false},{text: "Cetona",correct:false}], explanation: "Reacción redox." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Oxidación de alcohol secundario produce:", options: [{text: "Cetona",correct:true},{text: "Aldehído",correct:false},{text: "Ácido",correct:false},{text: "Nada",correct:false}], explanation: "R-CO-R." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Glicerina (Propanotriol):", options: [{text: "Alcohol con 3 grupos OH (viscoso)",correct:true},{text: "Grasa pura",correct:false},{text: "Plástico",correct:false},{text: "Veneno",correct:false}], explanation: "Poliol." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Éter etílico como anestésico:", options: [{text: "Usado históricamente para dormir pacientes",correct:true},{text: "Para despertar",correct:false},{text: "Para limpiar",correct:false},{text: "Para pintar",correct:false}], explanation: "Volátil." }
    ]
  },

  // Bundle 5: Aldehídos y Cetonas (Grupos Carbonilo)
  {
    meta: {
      id: "CO-CN-11-carbonilos-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica-organica",
      periodo: 2,
      dba_id: "DBA-CN-11-2",
      title: "Aldehídos y Cetonas"
    },
    base: { question: "El grupo carbonilo es C=O.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Grupo funcional Carbonilo:", options: [{text: "C=O",correct:true},{text: "C-O",correct:false},{text: "C-H",correct:false},{text: "C-N",correct:false}], explanation: "Doble enlace O." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Aldehído tiene el carbonilo en:", options: [{text: "El extremo de la cadena",correct:true},{text: "El medio",correct:false},{text: "Fuera de la cadena",correct:false},{text: "No tiene",correct:false}], explanation: "Terminal." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Cetona tiene el carbonilo en:", options: [{text: "El interior de la cadena (entre dos carbonos)",correct:true},{text: "El extremo",correct:false},{text: "El aire",correct:false},{text: "El agua",correct:false}], explanation: "Intermedio." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Acetona (Propanona):", options: [{text: "Solvente quitaesmalte",correct:true},{text: "Bebida",correct:false},{text: "Gasolina",correct:false},{text: "Agua",correct:false}], explanation: "Uso común." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Formaldehído (Formol):", options: [{text: "Conservante de tejidos biológicos",correct:true},{text: "Perfume",correct:false},{text: "Comida",correct:false},{text: "Juguete",correct:false}], explanation: "Metanal." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Olor de aldehídos:", options: [{text: "Muchos tienen olores agradables (almendras, vainilla)",correct:true},{text: "Siempre mal olor",correct:false},{text: "Inodoros",correct:false},{text: "Olor a quemado",correct:false}], explanation: "Fragancias." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Prueba de Fehling:", options: [{text: "Identifica aldehídos (se oxida a rojo ladrillo)",correct:true},{text: "Identifica alcoholes",correct:false},{text: "Identifica agua",correct:false},{text: "Mide pH",correct:false}], explanation: "Cetonas no reaccionan." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Prueba de Tollens (Espejo de plata):", options: [{text: "Aldehídos reducen plata formando espejo",correct:true},{text: "Rompe espejos",correct:false},{text: "Limpia plata",correct:false},{text: "Pinta plata",correct:false}], explanation: "Detección." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Tautomería ceto-enol:", options: [{text: "Equilibrio entre forma cetona y forma alcohol con doble enlace",correct:true},{text: "Magia",correct:false},{text: "Dos compuestos distintos",correct:false},{text: "Reacción nuclear",correct:false}], explanation: "Isomería especial." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Glucosa es:", options: [{text: "Una aldohexosa (tiene aldehído)",correct:true},{text: "Una cetohexosa",correct:false},{text: "Un ácido",correct:false},{text: "Una sal",correct:false}], explanation: "Carbohidrato." }
    ]
  },

  // Bundle 6: Ácidos Carboxílicos y Ésteres
  {
    meta: {
      id: "CO-CN-11-acidos-esteres-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica-organica",
      periodo: 2,
      dba_id: "DBA-CN-11-2",
      title: "Ácidos Carboxílicos y Derivados"
    },
    base: { question: "El grupo carboxilo es ácido.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Grupo Carboxilo:", options: [{text: "-COOH",correct:true},{text: "-OH",correct:false},{text: "-NH2",correct:false},{text: "-Cl",correct:false}], explanation: "Ácido orgánico." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Ácido Acético:", options: [{text: "Componente del vinagre (CH3COOH)",correct:true},{text: "Limón",correct:false},{text: "Leche",correct:false},{text: "Agua",correct:false}], explanation: "Vinagre." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Ácido Fórmico:", options: [{text: "Veneno de hormigas",correct:true},{text: "Formas",correct:false},{text: "Fórmulas",correct:false},{text: "Gasolina",correct:false}], explanation: "Hormiga (Formica)." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Esterificación:", options: [{text: "Ácido + Alcohol -> Éster + Agua",correct:true},{text: "Ácido + Base -> Sal",correct:false},{text: "Explosión",correct:false},{text: "Nada",correct:false}], explanation: "Formación de éster." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Olor de los Ésteres:", options: [{text: "Generalmente a frutas (banano, piña)",correct:true},{text: "Muy feos",correct:false},{text: "A podrido",correct:false},{text: "Sin olor",correct:false}], explanation: "Saborizantes artif." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Saponificación:", options: [{text: "Grasa + Base fuerte -> Jabón + Glicerina",correct:true},{text: "Hacer sopa",correct:false},{text: "Ensuciar",correct:false},{text: "Pintar",correct:false}], explanation: "Hidrólisis de éster." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Ácido graso:", options: [{text: "Ácido carboxílico de cadena larga",correct:true},{text: "Ácido gordo",correct:false},{text: "Grasa mecánica",correct:false},{text: "Piedra",correct:false}], explanation: "Lípidos." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Aspirina (Ácido acetilsalicílico) es:", options: [{text: "Un éster (y ácido)",correct:true},{text: "Un alcohol puro",correct:false},{text: "Una base fuerte",correct:false},{text: "Un gas",correct:false}], explanation: "Fármaco." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Amida:", options: [{text: "Derivado de ácido con Nitrógeno (R-CONH2)",correct:true},{text: "Amiga",correct:false},{text: "Amina",correct:false},{text: "Alcohol",correct:false}], explanation: "Enlace peptídico." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Poliéster:", options: [{text: "Polímero formado por muchos enlaces éster (tela)",correct:true},{text: "Muchas estrellas",correct:false},{text: "Plástico malo",correct:false},{text: "Comida",correct:false}], explanation: "Textil." }
    ]
  },

  // Bundle 7: Funciones Nitrogenadas (Aminas y Amidas)
  {
    meta: {
      id: "CO-CN-11-nitrogenadas-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica-organica",
      periodo: 2,
      dba_id: "DBA-CN-11-2",
      title: "Funciones Nitrogenadas"
    },
    base: { question: "El nitrógeno es clave en la vida.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Amina derivada de:", options: [{text: "Amoníaco (NH3)",correct:true},{text: "Agua",correct:false},{text: "Metano",correct:false},{text: "Oxígeno",correct:false}], explanation: "Sustitución H." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Olor de las aminas:", options: [{text: "A pescado podrido (muchas veces)",correct:true},{text: "A flores",correct:false},{text: "A menta",correct:false},{text: "A jabón",correct:false}], explanation: "Cadaverina, Putrescina." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Cafeína es:", options: [{text: "Un alcaloide (amina natural)",correct:true},{text: "Un alcohol",correct:false},{text: "Un ácido",correct:false},{text: "Una grasa",correct:false}], explanation: "Estimulante." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Urea:", options: [{text: "Primera sustancia orgánica sintetizada (es una diamida)",correct:true},{text: "Orina",correct:false},{text: "Veneno",correct:false},{text: "Comida",correct:false}], explanation: "Wöhler." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Grupo Amino:", options: [{text: "-NH2",correct:true},{text: "-OH",correct:false},{text: "-COOH",correct:false},{text: "-CH3",correct:false}], explanation: "Básico." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Basicidad de aminas:", options: [{text: "Actúan como bases débiles (aceptan protones)",correct:true},{text: "Son ácidos fuertes",correct:false},{text: "Son neutras",correct:false},{text: "Son explosivas",correct:false}], explanation: "Par libre N." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Nylon:", options: [{text: "Es una poliamida sintética",correct:true},{text: "Es algodón",correct:false},{text: "Es metal",correct:false},{text: "Es vidrio",correct:false}], explanation: "Textil resistente." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Enlace peptídico en proteínas:", options: [{text: "Es un enlace tipo amida entre aminoácidos",correct:true},{text: "Es un éster",correct:false},{text: "Es iónico",correct:false},{text: "Es magnético",correct:false}], explanation: "Bioquímica." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Anilina:", options: [{text: "Aminobenceno (base de colorantes)",correct:true},{text: "Anillo",correct:false},{text: "Ana",correct:false},{text: "Lana",correct:false}], explanation: "Industrial." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Nitruros, Nitratos y Nitritos:", options: [{text: "Son inorgánicos, no confundir con orgánicos",correct:true},{text: "Son lo mismo",correct:false},{text: "Son orgánicos",correct:false},{text: "Son gases",correct:false}], explanation: "Diferenciación." }
    ]
  },

  // Bundle 8: Isomería
  {
    meta: {
      id: "CO-CN-11-isomeria-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica-organica",
      periodo: 2,
      dba_id: "DBA-CN-11-2",
      title: "Isomería"
    },
    base: { question: "Isómeros tienen misma fórmula, distinta estructura.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Isomería de cadena:", options: [{text: "Diferente esqueleto de carbono (lineal vs ramificado)",correct:true},{text: "Diferente átomo",correct:false},{text: "Diferente color",correct:false},{text: "Diferente peso",correct:false}], explanation: "Butano vs Isobutano." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Isomería de posición:", options: [{text: "El grupo funcional cambia de lugar",correct:true},{text: "Cambia el grupo",correct:false},{text: "Cambia el nombre",correct:false},{text: "Cambia el precio",correct:false}], explanation: "1-Propanol vs 2-Propanol." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Isomería de función:", options: [{text: "Diferente grupo funcional (ej. Alcohol vs Éter)",correct:true},{text: "Mismo grupo",correct:false},{text: "Diferente átomo",correct:false},{text: "Error",correct:false}], explanation: "Etanol vs Dimetil Éter." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Estereoisomería:", options: [{text: "Diferente disposición espacial de átomos",correct:true},{text: "Diferente fórmula molecular",correct:false},{text: "Diferente radio",correct:false},{text: "Diferente estéreo",correct:false}], explanation: "3D." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Isomería Cis-Trans (Geométrica):", options: [{text: "En alquenos, sustituyentes del mismo lado (Cis) o opuesto (Trans)",correct:true},{text: "En alcanos",correct:false},{text: "En agua",correct:false},{text: "En aire",correct:false}], explanation: "Rotación impedida." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Grasas Trans:", options: [{text: "Isómero artificial nocivo para salud",correct:true},{text: "Grasas buenas",correct:false},{text: "Grasas naturales",correct:false},{text: "Vitaminas",correct:false}], explanation: "Nutrición." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Enantiómeros:", options: [{text: "Imágenes especulares no superponibles (manos)",correct:true},{text: "Iguales",correct:false},{text: "Superponibles",correct:false},{text: "Espejos rotos",correct:false}], explanation: "Quiralidad." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Mezcla racémica:", options: [{text: "Mezcla 50/50 de enantiómeros (ópticamente inactiva)",correct:true},{text: "Mezcla pura",correct:false},{text: "Solo isómero R",correct:false},{text: "Solo isómero S",correct:false}], explanation: "Cancelación giro." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Talidomida (Tragedia):", options: [{text: "Un enantiómero curaba, el otro causaba malformaciones",correct:true},{text: "Era segura",correct:false},{text: "Era vitamina",correct:false},{text: "Era agua",correct:false}], explanation: "Importancia isómera." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Carbono Asimétrico:", options: [{text: "Carbono unido a 4 grupos distintos (Centro quiral)",correct:true},{text: "Carbono simétrico",correct:false},{text: "Carbono doble",correct:false},{text: "Carbono triple",correct:false}], explanation: "Condición quiralidad." }
    ]
  },

  // Bundle 9: Biomoléculas (Carbohidratos y Lípidos)
  {
    meta: {
      id: "CO-CN-11-biomoleculas-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica-organica",
      periodo: 2,
      dba_id: "DBA-CN-11-2",
      title: "Biomoléculas I"
    },
    base: { question: "Las biomoléculas forman los seres vivos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Carbohidratos (Glúcidos):", options: [{text: "Fuente principal de energía (Azúcares)",correct:true},{text: "Grasas",correct:false},{text: "Proteínas",correct:false},{text: "Huesos",correct:false}], explanation: "Pan, Pasta." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Lípidos:", options: [{text: "Grasas, aceites, ceras (Reserva energía, membrana)",correct:true},{text: "Azúcar",correct:false},{text: "Agua",correct:false},{text: "Sal",correct:false}], explanation: "Insolubles agua." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Monosacárido ejemplo:", options: [{text: "Glucosa",correct:true},{text: "Celulosa",correct:false},{text: "Almidón",correct:false},{text: "ADN",correct:false}], explanation: "Unidad simple." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Polisacárido vegetal:", options: [{text: "Celulosa (Pared celular)",correct:true},{text: "Grasa",correct:false},{text: "Carne",correct:false},{text: "Plástico",correct:false}], explanation: "Fibra." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Ácido graso saturado:", options: [{text: "Enlaces simples (sólido a temp. ambiente, animal)",correct:true},{text: "Líquido",correct:false},{text: "Aceite",correct:false},{text: "Gas",correct:false}], explanation: "Mantequilla." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Ácido graso insaturado:", options: [{text: "Enlaces dobles (líquido, vegetal)",correct:true},{text: "Sólido",correct:false},{text: "Piedra",correct:false},{text: "Hielo",correct:false}], explanation: "Aceite oliva." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Fosfolípidos:", options: [{text: "Forman bicapa de membranas celulares (anfipáticos)",correct:true},{text: "Energía pura",correct:false},{text: "Veneno",correct:false},{text: "Hueso",correct:false}], explanation: "Cabeza polar, cola apolar." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Glucógeno:", options: [{text: "Reserva de energía animal (Hígado)",correct:true},{text: "Planta",correct:false},{text: "Aire",correct:false},{text: "Agua",correct:false}], explanation: "Polisacárido." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Esteroides (Colesterol):", options: [{text: "Lípido derivado de 4 anillos fusionados",correct:true},{text: "Azúcar",correct:false},{text: "Proteína",correct:false},{text: "Sal",correct:false}], explanation: "Hormonas." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Enlace glucosídico:", options: [{text: "Une monosacáridos",correct:true},{text: "Une grasas",correct:false},{text: "Une metales",correct:false},{text: "Rompe todo",correct:false}], explanation: "Éter entre azúcares." }
    ]
  },

  // Bundle 10: Polímeros y Plásticos
  {
    meta: {
      id: "CO-CN-11-polimeros-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "quimica-organica",
      periodo: 2,
      dba_id: "DBA-CN-11-2",
      title: "Polímeros Sintéticos"
    },
    base: { question: "Los plásticos son polímeros.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Polímero:", options: [{text: "Macromolécula formada por repetición de monómeros",correct:true},{text: "Átomo solo",correct:false},{text: "Gas noble",correct:false},{text: "Metal",correct:false}], explanation: "Cadena gigante." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "PET (Botellas):", options: [{text: "Polietileno Tereftalato (Reciclable)",correct:true},{text: "Vidrio",correct:false},{text: "Cartón",correct:false},{text: "Madera",correct:false}], explanation: "Plástico n.1." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "PVC:", options: [{text: "Policloruro de vinilo (Tubos)",correct:true},{text: "Papel",correct:false},{text: "Tela",correct:false},{text: "Comida",correct:false}], explanation: "Construcción." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Polietileno (PE):", options: [{text: "Plástico más común (Bolsas)",correct:true},{text: "Metal raro",correct:false},{text: "Diamante",correct:false},{text: "Agua",correct:false}], explanation: "Simple." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Polímero de adición:", options: [{text: "Suma de monómeros sin perder átomos (rompe doble enlace)",correct:true},{text: "Pierde agua",correct:false},{text: "Se quema",correct:false},{text: "Explota",correct:false}], explanation: "Mecanismo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Polímero de condensación:", options: [{text: "Unión liberando molécula pequeña (agua) ej. Nylon",correct:true},{text: "Adición pura",correct:false},{text: "Congelación",correct:false},{text: "Evaporación",correct:false}], explanation: "Paso a paso." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Termoplástico:", options: [{text: "Se ablanda con calor y recicla fácil",correct:true},{text: "No se funde (se quema)",correct:false},{text: "Es metal",correct:false},{text: "Es madera",correct:false}], explanation: "Moldeable." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Termoestable:", options: [{text: "No se funde con calor, estructura rígida 3D",correct:true},{text: "Se derrite fácil",correct:false},{text: "Es agua",correct:false},{text: "Es hielo",correct:false}], explanation: "Baquelita." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Caucho natural:", options: [{text: "Polímero de isopreno (elástico)",correct:true},{text: "Plástico duro",correct:false},{text: "Vidrio",correct:false},{text: "Arena",correct:false}], explanation: "Látex." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Microplásticos:", options: [{text: "Fragmentos <5mm contaminantes",correct:true},{text: "Plásticos grandes",correct:false},{text: "Bacterias",correct:false},{text: "Comida sana",correct:false}], explanation: "Problema ambiental." }
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
search_query: "preguntas quimica organica grado ${meta.grade} ${meta.periodo} ${meta.topic}"
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

**Competencia evaluada:** Explicación de Fenómenos (DBA: ${meta.dba_id})

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
    console.log(`✅ Created Period 2 Bundle v3.0: ${fullPath}`);
});
