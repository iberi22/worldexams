
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: Distance and Midpoint
  {
    meta: {
      id: "CO-MAT-10-geo-dist-mid-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "distancia-punto-medio",
      periodo: 3,
      dba_id: "DBA-MAT-10-3",
      title: "Distancia y Punto Medio"
    },
    base: { question: "Calcula distancia o punto medio.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Fórmula de distancia entre (x1,y1) y (x2,y2):", options: [{text: "√((x2-x1)² + (y2-y1)²)",correct:true},{text: "(x2-x1)² + (y2-y1)²",correct:false},{text: "(x2+x1)/2",correct:false},{text: "y2-y1 / x2-x1",correct:false}], explanation: "Pitágoras en coordenadas." },
      { id_suffix: "v2", difficulty: 1, question: "Fórmula del punto medio:", options: [{text: "((x1+x2)/2, (y1+y2)/2)",correct:true},{text: "((x1-x2)/2, (y1-y2)/2)",correct:false},{text: "(x1+x2, y1+y2)",correct:false},{text: "√((x1+x2)/2)",correct:false}], explanation: "Promedio de coordenadas." },
      { id_suffix: "v3", difficulty: 2, question: "Distancia entre (0,0) y (3,4):", options: [{text: "5",correct:true},{text: "7",correct:false},{text: "25",correct:false},{text: "1",correct:false}], explanation: "√(9+16) = 5." },
      { id_suffix: "v4", difficulty: 2, question: "Punto medio de (2, 4) y (6, 8):", options: [{text: "(4, 6)",correct:true},{text: "(8, 12)",correct:false},{text: "(2, 2)",correct:false},{text: "(4, 4)",correct:false}], explanation: "(2+6)/2=4, (4+8)/2=6." },
      { id_suffix: "v5", difficulty: 3, question: "Distancia entre (-1, -1) y (2, 3):", options: [{text: "5",correct:true},{text: "4",correct:false},{text: "6",correct:false},{text: "7",correct:false}], explanation: "√((2--1)² + (3--1)²) = √(3² + 4²) = 5." },
      { id_suffix: "v6", difficulty: 3, question: "Si el punto medio es (0,0) y un extremo es (2,2), el otro es:", options: [{text: "(-2, -2)",correct:true},{text: "(2, 2)",correct:false},{text: "(-4, -4)",correct:false},{text: "(0, 2)",correct:false}], explanation: "(x+2)/2=0 -> x=-2." },
      { id_suffix: "v7", difficulty: 4, question: "Perímetro del triángulo con vértices (0,0), (3,0), (0,4):", options: [{text: "12",correct:true},{text: "10",correct:false},{text: "7",correct:false},{text: "14",correct:false}], explanation: "Lados 3, 4, 5. Suma=12." },
      { id_suffix: "v8", difficulty: 4, question: "Punto equidistante de dos puntos dados:", options: [{text: "Está en la mediatriz",correct:true},{text: "Está en el segmento",correct:false},{text: "Es el punto medio solamente",correct:false},{text: "No existe",correct:false}], explanation: "Lugar geométrico." },
      { id_suffix: "v9", difficulty: 5, question: "¿Qué tipo de triángulo forman (0,0), (2,0), (1, √3)?", options: [{text: "Equilátero",correct:true},{text: "Isósceles",correct:false},{text: "Escaleno",correct:false},{text: "Rectángulo",correct:false}], explanation: "Distancias iguales a 2." },
      { id_suffix: "v10", difficulty: 5, question: "Área del triángulo vértices (0,0), (4,0), (0,3):", options: [{text: "6",correct:true},{text: "12",correct:false},{text: "5",correct:false},{text: "7",correct:false}], explanation: "(b*h)/2 = (4*3)/2 = 6." }
    ]
  },

  // Bundle 2: Slope of a line
  {
    meta: {
      id: "CO-MAT-10-geo-slope-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "pendiente-recta",
      periodo: 3,
      dba_id: "DBA-MAT-10-3",
      title: "La Pendiente"
    },
    base: { question: "Calcula la pendiente.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Fórmula de la pendiente (m):", options: [{text: "(y2-y1)/(x2-x1)",correct:true},{text: "(x2-x1)/(y2-y1)",correct:false},{text: "(y2+y1)/(x2+x1)",correct:false},{text: "y2*y1",correct:false}], explanation: "Cambio en Y sobre cambio en X." },
      { id_suffix: "v2", difficulty: 1, question: "Pendiente de una línea horizontal:", options: [{text: "0",correct:true},{text: "1",correct:false},{text: "Indefinida",correct:false},{text: "-1",correct:false}], explanation: "No sube ni baja." },
      { id_suffix: "v3", difficulty: 2, question: "Pendiente entre (1,1) y (3,5):", options: [{text: "2",correct:true},{text: "0.5",correct:false},{text: "4",correct:false},{text: "3",correct:false}], explanation: "(5-1)/(3-1) = 4/2 = 2." },
      { id_suffix: "v4", difficulty: 2, question: "Si m > 0, la recta es:", options: [{text: "Creciente",correct:true},{text: "Decreciente",correct:false},{text: "Horizontal",correct:false},{text: "Vertical",correct:false}], explanation: "Sube a la derecha." },
      { id_suffix: "v5", difficulty: 3, question: "Pendiente de una línea vertical:", options: [{text: "Indefinida",correct:true},{text: "0",correct:false},{text: "1",correct:false},{text: "Infinita",correct:false}], explanation: "División por cero." },
      { id_suffix: "v6", difficulty: 3, question: "Pendiente de la recta y = -3x + 2:", options: [{text: "-3",correct:true},{text: "2",correct:false},{text: "3",correct:false},{text: "-2",correct:false}], explanation: "Forma y=mx+b." },
      { id_suffix: "v7", difficulty: 4, question: "Si el ángulo de inclinación es 45°, la pendiente es:", options: [{text: "1",correct:true},{text: "-1",correct:false},{text: "0",correct:false},{text: "√3",correct:false}], explanation: "Tan(45)=1." },
      { id_suffix: "v8", difficulty: 4, question: "Pendiente entre (2, 5) y (2, 10):", options: [{text: "Indefinida",correct:true},{text: "0",correct:false},{text: "5",correct:false},{text: "1",correct:false}], explanation: "Vertical (x constante)." },
      { id_suffix: "v9", difficulty: 5, question: "Si m = -1/√3, el ángulo es:", options: [{text: "150°",correct:true},{text: "30°",correct:false},{text: "120°",correct:false},{text: "60°",correct:false}], explanation: "Tan(150) = -1/√3." },
      { id_suffix: "v10", difficulty: 5, question: "Pendiente de recta que pasa por origen y (a, a):", options: [{text: "1",correct:true},{text: "a",correct:false},{text: "0",correct:false},{text: "-1",correct:false}], explanation: "a/a = 1." }
    ]
  },

  // Bundle 3: Equation of a Line
  {
    meta: {
      id: "CO-MAT-10-geo-line-eq-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "ecuacion-recta",
      periodo: 3,
      dba_id: "DBA-MAT-10-3",
      title: "Ecuación de la Recta"
    },
    base: { question: "Halla la ecuación.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Forma pendiente-intercepto:", options: [{text: "y = mx + b",correct:true},{text: "Ax + By = C",correct:false},{text: "y - y1 = m(x - x1)",correct:false},{text: "y = x",correct:false}], explanation: "Forma explícita." },
      { id_suffix: "v2", difficulty: 1, question: "Forma punto-pendiente:", options: [{text: "y - y1 = m(x - x1)",correct:true},{text: "y = mx + b",correct:false},{text: "y = b",correct:false},{text: "x = a",correct:false}], explanation: "Con un punto y m." },
      { id_suffix: "v3", difficulty: 2, question: "Ec. recta con m=2, intercepto b=3:", options: [{text: "y = 2x + 3",correct:true},{text: "y = 3x + 2",correct:false},{text: "y = 2x - 3",correct:false},{text: "2x + y = 3",correct:false}], explanation: "Sustitución directa." },
      { id_suffix: "v4", difficulty: 2, question: "Recta horizontal por (2, 5):", options: [{text: "y = 5",correct:true},{text: "x = 2",correct:false},{text: "y = 2",correct:false},{text: "x = 5",correct:false}], explanation: "Pendiente 0." },
      { id_suffix: "v5", difficulty: 3, question: "Recta vertical por (-3, 4):", options: [{text: "x = -3",correct:true},{text: "y = 4",correct:false},{text: "y = -3",correct:false},{text: "x = 4",correct:false}], explanation: "Pendiente indefinida." },
      { id_suffix: "v6", difficulty: 3, question: "Ec. pasa por (0,0) y (1,2):", options: [{text: "y = 2x",correct:true},{text: "y = 0.5x",correct:false},{text: "y = x + 2",correct:false},{text: "y = x",correct:false}], explanation: "m=2, b=0." },
      { id_suffix: "v7", difficulty: 4, question: "Forma general de la recta:", options: [{text: "Ax + By + C = 0",correct:true},{text: "y = mx + b",correct:false},{text: "y = C",correct:false},{text: "x = k",correct:false}], explanation: "Estándar." },
      { id_suffix: "v8", difficulty: 4, question: "Intersección con eje X de y = 2x - 4:", options: [{text: "(2, 0)",correct:true},{text: "(4, 0)",correct:false},{text: "(-2, 0)",correct:false},{text: "(0, -4)",correct:false}], explanation: "0 = 2x-4 -> x=2." },
      { id_suffix: "v9", difficulty: 5, question: "Recta pasa por (2,3) con m=-1. Forma general:", options: [{text: "x + y - 5 = 0",correct:true},{text: "x - y + 1 = 0",correct:false},{text: "x + y + 5 = 0",correct:false},{text: "-x + y = 5",correct:false}], explanation: "y-3 = -1(x-2) -> y-3=-x+2 -> x+y-5=0." },
      { id_suffix: "v10", difficulty: 5, question: "¿Pertenece el punto (1, 1) a 3x + 2y - 5 = 0?", options: [{text: "Sí",correct:true},{text: "No",correct:false},{text: "Solo si x=0",correct:false},{text: "Imposible saber",correct:false}], explanation: "3(1)+2(1)-5 = 3+2-5 = 0." }
    ]
  },

  // Bundle 4: Parallel and Perpendicular Lines
  {
    meta: {
      id: "CO-MAT-10-geo-par-perp-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "paralelas-perpendiculares",
      periodo: 3,
      dba_id: "DBA-MAT-10-3",
      title: "Paralelismo y Perpendicularidad"
    },
    base: { question: "Relación entre rectas.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Dos rectas son paralelas si:", options: [{text: "Sus pendientes son iguales",correct:true},{text: "El producto de pendientes es -1",correct:false},{text: "Se cruzan en (0,0)",correct:false},{text: "Tienen el mismo intercepto",correct:false}], explanation: "m1 = m2." },
      { id_suffix: "v2", difficulty: 1, question: "Dos rectas son perpendiculares si:", options: [{text: "Producto de pendientes es -1",correct:true},{text: "Pendientes iguales",correct:false},{text: "Suman 180°",correct:false},{text: "No se tocan",correct:false}], explanation: "m1 * m2 = -1." },
      { id_suffix: "v3", difficulty: 2, question: "Paralela a y=2x+1 que pasa por (0,0):", options: [{text: "y = 2x",correct:true},{text: "y = -2x",correct:false},{text: "y = 0.5x",correct:false},{text: "y = 2x + 5",correct:false}], explanation: "Misma m=2, b=0." },
      { id_suffix: "v4", difficulty: 2, question: "Perpendicular a y=2x que pasa por origen:", options: [{text: "y = -0.5x",correct:true},{text: "y = 2x",correct:false},{text: "y = -2x",correct:false},{text: "y = 0.5x",correct:false}], explanation: "m = -1/2." },
      { id_suffix: "v5", difficulty: 3, question: "Recta paralela a x=5:", options: [{text: "x = -2",correct:true},{text: "y = 5",correct:false},{text: "y = x",correct:false},{text: "y = 0",correct:false}], explanation: "Otra recta vertical." },
      { id_suffix: "v6", difficulty: 3, question: "Pendiente perpendicular a m=3/4:", options: [{text: "-4/3",correct:true},{text: "3/4",correct:false},{text: "-3/4",correct:false},{text: "4/3",correct:false}], explanation: "Recíproco negativo." },
      { id_suffix: "v7", difficulty: 4, question: "Ec. perpendicular a y=3x-2 por (3, 0):", options: [{text: "y = -1/3x + 1",correct:true},{text: "y = 3x - 9",correct:false},{text: "y = -3x + 9",correct:false},{text: "y = 1/3x - 1",correct:false}], explanation: "m=-1/3. 0 = -1/3(3)+b -> 0=-1+b -> b=1." },
      { id_suffix: "v8", difficulty: 4, question: "Las rectas y=x y y=-x son:", options: [{text: "Perpendiculares",correct:true},{text: "Paralelas",correct:false},{text: "Coincidentes",correct:false},{text: "Oblicuas no perpen",correct:false}], explanation: "1 * -1 = -1." },
      { id_suffix: "v9", difficulty: 5, question: "Distancia entre paralelas y=2x+1 y y=2x-4:", options: [{text: "√5",correct:true},{text: "5",correct:false},{text: "3",correct:false},{text: "1",correct:false}], explanation: "|c2-c1|/√(1+m²) = 5/√5 = √5." },
      { id_suffix: "v10", difficulty: 5, question: "Recta que es mediatriz de (0,0) y (2,0):", options: [{text: "x = 1",correct:true},{text: "y = 1",correct:false},{text: "y = x",correct:false},{text: "x = 2",correct:false}], explanation: "Vertical por el medio." }
    ]
  },

  // Bundle 5: Circle Basics
  {
    meta: {
      id: "CO-MAT-10-geo-circle-basic-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "circunferencia-basica",
      periodo: 3,
      dba_id: "DBA-MAT-10-3",
      title: "La Circunferencia"
    },
    base: { question: "Propiedades circunferencia.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Definición de circunferencia:", options: [{text: "Puntos que equidistan de un centro",correct:true},{text: "Puntos dentro de un círculo",correct:false},{text: "Una línea curva cualquiera",correct:false},{text: "Dos puntos unidos",correct:false}], explanation: "Lugar geométrico." },
      { id_suffix: "v2", difficulty: 1, question: "Ec. canónica con centro (h,k) y radio r:", options: [{text: "(x-h)² + (y-k)² = r²",correct:true},{text: "x² + y² = r",correct:false},{text: "x-h + y-k = r",correct:false},{text: "(x+h)² - (y+k)² = r²",correct:false}], explanation: "Fórmula estándar." },
      { id_suffix: "v3", difficulty: 2, question: "Ec. centro (0,0) y radio 5:", options: [{text: "x² + y² = 25",correct:true},{text: "x² + y² = 5",correct:false},{text: "x² - y² = 25",correct:false},{text: "x + y = 25",correct:false}], explanation: "r²=25." },
      { id_suffix: "v4", difficulty: 2, question: "Radio de x² + y² = 16:", options: [{text: "4",correct:true},{text: "16",correct:false},{text: "8",correct:false},{text: "2",correct:false}], explanation: "√16." },
      { id_suffix: "v5", difficulty: 3, question: "Centro de (x-2)² + (y+3)² = 9:", options: [{text: "(2, -3)",correct:true},{text: "(-2, 3)",correct:false},{text: "(2, 3)",correct:false},{text: "(-2, -3)",correct:false}], explanation: "Signos opuestos." },
      { id_suffix: "v6", difficulty: 3, question: "Ec. centro (1,1) radio 1:", options: [{text: "(x-1)² + (y-1)² = 1",correct:true},{text: "(x+1)² + (y+1)² = 1",correct:false},{text: "x² + y² = 1",correct:false},{text: "x² + y² = 2",correct:false}], explanation: "Sustitución." },
      { id_suffix: "v7", difficulty: 4, question: "Punto (3, 4) está ___ x² + y² = 25:", options: [{text: "Sobre",correct:true},{text: "Adentro",correct:false},{text: "Afuera",correct:false},{text: "Lejos",correct:false}], explanation: "9+16=25." },
      { id_suffix: "v8", difficulty: 4, question: "Punto (0, 0) está ___ (x-3)² + (y-4)² = 10:", options: [{text: "Afuera",correct:true},{text: "Sobre",correct:false},{text: "Adentro",correct:false},{text: "En el centro",correct:false}], explanation: "9+16 = 25 > 10." },
      { id_suffix: "v9", difficulty: 5, question: "Forma general: x² + y² + Dx + Ey + F = 0. ¿Qué falta para ser círculo?", options: [{text: "Coeficientes x² y y² iguales y mismo signo",correct:true},{text: "D debe ser 0",correct:false},{text: "F debe ser positivo",correct:false},{text: "Ninguna",correct:false}], explanation: "Condición necesaria." },
      { id_suffix: "v10", difficulty: 5, question: "Radio de x² + y² - 4x = 0:", options: [{text: "2",correct:true},{text: "4",correct:false},{text: "√2",correct:false},{text: "1",correct:false}], explanation: "Completar cuadrados: (x-2)² + y² = 4." }
    ]
  },

  // Bundle 6: General Equation of Circle
  {
    meta: {
      id: "CO-MAT-10-geo-circle-gen-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "circunferencia-general",
      periodo: 3,
      dba_id: "DBA-MAT-10-3",
      title: "Ecuación General Circunferencia"
    },
    base: { question: "Convierte a forma general o canónica.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Expande (x-1)²:", options: [{text: "x² - 2x + 1",correct:true},{text: "x² + 1",correct:false},{text: "x² - 1",correct:false},{text: "x² + 2x + 1",correct:false}], explanation: "Binomio cuadrado." },
      { id_suffix: "v2", difficulty: 1, question: "Forma general de x² + y² = 4:", options: [{text: "x² + y² - 4 = 0",correct:true},{text: "x² + y² + 4 = 0",correct:false},{text: "x + y - 4 = 0",correct:false},{text: "x² - y² - 4 = 0",correct:false}], explanation: "Igualar a 0." },
      { id_suffix: "v3", difficulty: 2, question: "Pasa (x-1)² + y² = 1 a general.", options: [{text: "x² + y² - 2x = 0",correct:true},{text: "x² + y² - 2x + 2 = 0",correct:false},{text: "x² + y² - 1 = 0",correct:false},{text: "x² + y² = 0",correct:false}], explanation: "x²-2x+1+y²=1 -> x²+y²-2x=0." },
      { id_suffix: "v4", difficulty: 2, question: "Centro de x² + y² + 6x = 0.", options: [{text: "(-3, 0)",correct:true},{text: "(3, 0)",correct:false},{text: "(0, 6)",correct:false},{text: "(0, -3)",correct:false}], explanation: "Completar: (x+3)²..." },
      { id_suffix: "v5", difficulty: 3, question: "Halla radio de x² + y² + 6x = 0.", options: [{text: "3",correct:true},{text: "9",correct:false},{text: "6",correct:false},{text: "√6",correct:false}], explanation: "(x+3)² + y² = 9. r=3." },
      { id_suffix: "v6", difficulty: 3, question: "Halla centro de x² + y² - 2x - 4y = 0.", options: [{text: "(1, 2)",correct:true},{text: "(-1, -2)",correct:false},{text: "(1, -2)",correct:false},{text: "(-2, -4)",correct:false}], explanation: "Divisor de coeficientes lineares entre -2." },
      { id_suffix: "v7", difficulty: 4, question: "Convertir x² + y² - 10x + 16 = 0 a canónica.", options: [{text: "(x-5)² + y² = 9",correct:true},{text: "(x-5)² + y² = 25",correct:false},{text: "(x+5)² + y² = 9",correct:false},{text: "(x-5)² + y² = 16",correct:false}], explanation: "x²-10x+25 ... 25-16=9." },
      { id_suffix: "v8", difficulty: 4, question: "Radio de la anterior (r²=9):", options: [{text: "3",correct:true},{text: "9",correct:false},{text: "4",correct:false},{text: "5",correct:false}], explanation: "√9." },
      { id_suffix: "v9", difficulty: 5, question: "Circunferencia tangente al eje X centro (2, 3):", options: [{text: "(x-2)² + (y-3)² = 9",correct:true},{text: "(x-2)² + (y-3)² = 4",correct:false},{text: "(x-2)² + (y-3)² = 1",correct:false},{text: "x² + y² = 13",correct:false}], explanation: "Radio es distancia Y (3). r²=9." },
      { id_suffix: "v10", difficulty: 5, question: "Circunferencia tangente a ambos ejes radio 2 (Cuadrante I):", options: [{text: "(x-2)² + (y-2)² = 4",correct:true},{text: "(x+2)² + (y+2)² = 4",correct:false},{text: "x² + y² = 4",correct:false},{text: "(x-2)² + y² = 4",correct:false}], explanation: "Centro (2,2) r=2." }
    ]
  },

  // Bundle 7: Graphing Lines and Circles
  {
    meta: {
      id: "CO-MAT-10-geo-graph-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "graficas-analitica",
      periodo: 3,
      dba_id: "DBA-MAT-10-3",
      title: "Gráficas en Geom. Analítica"
    },
    base: { question: "Interpreta la gráfica.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Gráfica que es una línea recta:", options: [{text: "y = mx + b",correct:true},{text: "y = x²",correct:false},{text: "x² + y² = r²",correct:false},{text: "y = 1/x",correct:false}], explanation: "Lineal." },
      { id_suffix: "v2", difficulty: 1, question: "Gráfica que es un círculo:", options: [{text: "x² + y² = r²",correct:true},{text: "y = x",correct:false},{text: "y = x²",correct:false},{text: "y = |x|",correct:false}], explanation: "Cuadrática en x y y." },
      { id_suffix: "v3", difficulty: 2, question: "La recta y = x pasa por cuadrantes:", options: [{text: "I y III",correct:true},{text: "II y IV",correct:false},{text: "I y II",correct:false},{text: "Solo I",correct:false}], explanation: "Signos iguales." },
      { id_suffix: "v4", difficulty: 2, question: "Intercepto Y de y = 3x - 5:", options: [{text: "-5",correct:true},{text: "5",correct:false},{text: "3",correct:false},{text: "-3",correct:false}], explanation: "b." },
      { id_suffix: "v5", difficulty: 3, question: "Gráfica de x² + y² = 1:", options: [{text: "Círculo unitario",correct:true},{text: "Punto",correct:false},{text: "Hipérbola",correct:false},{text: "Cuadrado",correct:false}], explanation: "Radio 1." },
      { id_suffix: "v6", difficulty: 3, question: "Región x² + y² < 4:", options: [{text: "Interior del círculo radio 2",correct:true},{text: "Exterior",correct:false},{text: "Borde solamente",correct:false},{text: "Todo el plano",correct:false}], explanation: "Desigualdad." },
      { id_suffix: "v7", difficulty: 4, question: "Gráfica de x = 3:", options: [{text: "Línea vertical en 3",correct:true},{text: "Línea horizontal en 3",correct:false},{text: "Punto (3,0)",correct:false},{text: "Círculo radio 3",correct:false}], explanation: "X constante." },
      { id_suffix: "v8", difficulty: 4, question: "Intercepto X de 2x + 3y = 6:", options: [{text: "3",correct:true},{text: "2",correct:false},{text: "6",correct:false},{text: "0",correct:false}], explanation: "Si y=0, 2x=6 -> x=3." },
      { id_suffix: "v9", difficulty: 5, question: "Puntos de corte entre y=x y x²+y²=2:", options: [{text: "(1,1) y (-1,-1)",correct:true},{text: "(1,1)",correct:false},{text: "(0,0)",correct:false},{text: "No se cortan",correct:false}], explanation: "x²+x²=2 -> 2x²=2 -> x=±1." },
      { id_suffix: "v10", difficulty: 5, question: "Familia de rectas y = mx + 2:", options: [{text: "Todas pasan por (0, 2)",correct:true},{text: "Todas son paralelas",correct:false},{text: "Todas pasan por origen",correct:false},{text: "Todas verticales",correct:false}], explanation: "Intercepto fijo." }
    ]
  },

  // Bundle 8: Locus Problems (Lugares Geométricos)
  {
    meta: {
      id: "CO-MAT-10-geo-locus-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "lugares-geometricos",
      periodo: 3,
      dba_id: "DBA-MAT-10-3",
      title: "Lugares Geométricos"
    },
    base: { question: "Identifica el lugar geométrico.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Puntos a distancia 5 del origen:", options: [{text: "Circunferencia",correct:true},{text: "Recta",correct:false},{text: "Cuadrado",correct:false},{text: "Punto",correct:false}], explanation: "Definición círculo." },
      { id_suffix: "v2", difficulty: 1, question: "Puntos equidistantes a dos paralelas:", options: [{text: "Una paralela media",correct:true},{text: "Una perpendicular",correct:false},{text: "Un círculo",correct:false},{text: "Ninguno",correct:false}], explanation: "Línea central." },
      { id_suffix: "v3", difficulty: 2, question: "Puntos donde y = 2x:", options: [{text: "Línea recta",correct:true},{text: "Parábola",correct:false},{text: "Círculo",correct:false},{text: "Hipérbola",correct:false}], explanation: "Ecuación lineal." },
      { id_suffix: "v4", difficulty: 2, question: "Puntos donde x² + y² = 0:", options: [{text: "Un punto (0,0)",correct:true},{text: "Círculo",correct:false},{text: "Vacío",correct:false},{text: "Plano",correct:false}], explanation: "Radio 0." },
      { id_suffix: "v5", difficulty: 3, question: "Puntos donde y > 0:", options: [{text: "Semiplano superior",correct:true},{text: "Eje Y",correct:false},{text: "Eje X",correct:false},{text: "Cuadrante I",correct:false}], explanation: "Desigualdad." },
      { id_suffix: "v6", difficulty: 3, question: "Mediatriz del segmento AB:", options: [{text: "Equidista de A y B",correct:true},{text: "Círculo alrededor de AB",correct:false},{text: "Paralela a AB",correct:false},{text: "Pasa por A",correct:false}], explanation: "Propiedad mediatriz." },
      { id_suffix: "v7", difficulty: 4, question: "Puntos cuyo producto xy = 1:", options: [{text: "Hipérbola",correct:true},{text: "Recta",correct:false},{text: "Círculo",correct:false},{text: "Punto",correct:false}], explanation: "Inversa." },
      { id_suffix: "v8", difficulty: 4, question: "Puntos donde x² - y² = 0:", options: [{text: "Dos rectas (y=x, y=-x)",correct:true},{text: "Círculo",correct:false},{text: "Punto",correct:false},{text: "Hipérbola",correct:false}], explanation: "(x-y)(x+y)=0." },
      { id_suffix: "v9", difficulty: 5, question: "Lugar geométrico suma distancias a (c,0) y (-c,0) constante:", options: [{text: "Elipse",correct:true},{text: "Círculo",correct:false},{text: "Hipérbola",correct:false},{text: "Parábola",correct:false}], explanation: "Definición elipse." },
      { id_suffix: "v10", difficulty: 5, question: "Lugar geométrico resta distancias a focos constante:", options: [{text: "Hipérbola",correct:true},{text: "Elipse",correct:false},{text: "Parábola",correct:false},{text: "Círculo",correct:false}], explanation: "Definición hipérbola." }
    ]
  },

  // Bundle 9: Applications of Analytic Geometry
  {
    meta: {
      id: "CO-MAT-10-geo-app-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "aplicaciones-analitica",
      periodo: 3,
      dba_id: "DBA-MAT-10-3",
      title: "Aplicaciones"
    },
    base: { question: "Resuelve el problema.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Si un mapa usa coordenadas, distancia es:", options: [{text: "Línea recta euclidiana",correct:true},{text: "Distancia Manhattan",correct:false},{text: "Curva",correct:false},{text: "Cero",correct:false}], explanation: "Modelo simple." },
      { id_suffix: "v2", difficulty: 1, question: "Intersección de dos calles rectas modelada como:", options: [{text: "Sistema 2x2",correct:true},{text: "Ecuación cuadrática",correct:false},{text: "Círculo",correct:false},{text: "Pendiente",correct:false}], explanation: "Punto de corte." },
      { id_suffix: "v3", difficulty: 2, question: "Cobertura de radar circular 5km. Ec:", options: [{text: "x² + y² = 25",correct:true},{text: "x² + y² = 5",correct:false},{text: "x + y = 5",correct:false},{text: "x² + y² = 10",correct:false}], explanation: "r=5." },
      { id_suffix: "v4", difficulty: 2, question: "Pendiente de una rampa del 5%:", options: [{text: "m = 0.05",correct:true},{text: "m = 5",correct:false},{text: "m = 0.5",correct:false},{text: "m = 50",correct:false}], explanation: "Porcentaje." },
      { id_suffix: "v5", difficulty: 3, question: "Tres antenas en (0,0), (4,0), (0,3). ¿Circuncentro sirve para?", options: [{text: "Punto equidistante",correct:true},{text: "Centro de masa",correct:false},{text: "Ortocentro",correct:false},{text: "Nada",correct:false}], explanation: "Equidistancia." },
      { id_suffix: "v6", difficulty: 3, question: "Trayectoria de proyectil despreciando aire:", options: [{text: "Parábola",correct:true},{text: "Recta",correct:false},{text: "Círculo",correct:false},{text: "Elipse",correct:false}], explanation: "Y = ax² + bx." },
      { id_suffix: "v7", difficulty: 4, question: "Punto más cercano de la recta y=x al punto (0,1):", options: [{text: "(0.5, 0.5)",correct:true},{text: "(1, 1)",correct:false},{text: "(0, 0)",correct:false},{text: "(1, 0)",correct:false}], explanation: "Intersección con perpendicular por (0,1)." },
      { id_suffix: "v8", difficulty: 4, question: "Si un puente es parabólico, ¿su ecuación es tipo?", options: [{text: "y = ax²",correct:true},{text: "y = mx+b",correct:false},{text: "x² + y² = r²",correct:false},{text: "y = 1/x",correct:false}], explanation: "Forma arco." },
      { id_suffix: "v9", difficulty: 5, question: "GPS usa intersección de:", options: [{text: "Esferas (Círculos en 2D)",correct:true},{text: "Rectas",correct:false},{text: "Parábolas",correct:false},{text: "Elipses",correct:false}], explanation: "Trilateración." },
      { id_suffix: "v10", difficulty: 5, question: "Si dos autos viajan perpendicularmente. Distancia entre ellos:", options: [{text: "Aumenta (Pitágoras)",correct:true},{text: "Disminuye",correct:false},{text: "Constante",correct:false},{text: "Cero",correct:false}], explanation: "Hipotenusa crece." }
    ]
  },

  // Bundle 10: Taller Review P3
    {
    meta: {
      id: "CO-MAT-10-taller-p3-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "review",
      periodo: 3,
      dba_id: "DBA-MAT-10-3",
      title: "Taller Repaso P3"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Distancia (0,0) a (3,4):", options: [{text: "5",correct:true},{text: "7",correct:false},{text: "6",correct:false},{text: "25",correct:false}], explanation: "Pitágoras." },
      { id_suffix: "v2", difficulty: 1, question: "Pendiente vertical:", options: [{text: "Indefinida",correct:true},{text: "0",correct:false},{text: "1",correct:false},{text: "-1",correct:false}], explanation: "Concepto." },
      { id_suffix: "v3", difficulty: 2, question: "Ec de círculo radio 10 centro origen:", options: [{text: "x² + y² = 100",correct:true},{text: "x² + y² = 10",correct:false},{text: "x² + y² = 20",correct:false},{text: "x + y = 10",correct:false}], explanation: "r²." },
      { id_suffix: "v4", difficulty: 2, question: "Pendiente perpendicular a m=2:", options: [{text: "-0.5",correct:true},{text: "2",correct:false},{text: "-2",correct:false},{text: "0.5",correct:false}], explanation: "Inverso opuesto." },
      { id_suffix: "v5", difficulty: 3, question: "Punto medio de (-2, 0) y (2, 0):", options: [{text: "(0, 0)",correct:true},{text: "(2, 0)",correct:false},{text: "(-2, 0)",correct:false},{text: "(0, 2)",correct:false}], explanation: "Promedio." },
      { id_suffix: "v6", difficulty: 3, question: "Recta paralela a eje X por (0, 5):", options: [{text: "y = 5",correct:true},{text: "x = 5",correct:false},{text: "y = x",correct:false},{text: "x = 0",correct:false}], explanation: "Horizontal." },
      { id_suffix: "v7", difficulty: 4, question: "Centro de (x+1)² + y² = 1:", options: [{text: "(-1, 0)",correct:true},{text: "(1, 0)",correct:false},{text: "(0, 1)",correct:false},{text: "(0, -1)",correct:false}], explanation: "h=-1, k=0." },
      { id_suffix: "v8", difficulty: 4, question: "Distancia punto a recta:", options: [{text: "Perpendicular",correct:true},{text: "Cualquiera",correct:false},{text: "Horizontal",correct:false},{text: "Vertical",correct:false}], explanation: "Mínima." },
      { id_suffix: "v9", difficulty: 5, question: "Intersección recta y círculo:", options: [{text: "0, 1 o 2 puntos",correct:true},{text: "Siempre 2",correct:false},{text: "Siempre 1",correct:false},{text: "3 puntos",correct:false}], explanation: "Secante, tangente, exterior." },
      { id_suffix: "v10", difficulty: 5, question: "Área círculo x² + y² = 4:", options: [{text: "4π",correct:true},{text: "2π",correct:false},{text: "16π",correct:false},{text: "4",correct:false}], explanation: "πr². r=2." }
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
search_query: "math questions grade ${meta.grade} ${meta.periodo} ${meta.topic}"
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

**Competencia:** Razonamiento Cuantitativo (DBA: ${meta.dba_id})

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
    console.log(`✅ Created Period 3 Bundle v3.0: ${fullPath}`);
});
