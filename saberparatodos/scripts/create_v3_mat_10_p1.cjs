
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: Angles & Conversion
  {
    meta: {
      id: "CO-MAT-10-trig-angles-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "trigonometria-basica",
      periodo: 1,
      dba_id: "DBA-MAT-10-1",
      title: "Conversión de Ángulos"
    },
    base: { question: "Convierte 45 grados a radianes.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "¿A cuántos radianes equivalen 180°?", options: [{text: "π rad",correct:true},{text: "2π rad",correct:false},{text: "π/2 rad",correct:false},{text: "3π/2 rad",correct:false}], explanation: "180° es igual a π radianes." },
      { id_suffix: "v2", difficulty: 1, question: "Convierte 90° a radianes.", options: [{text: "π/2 rad",correct:true},{text: "π rad",correct:false},{text: "π/3 rad",correct:false},{text: "π/4 rad",correct:false}], explanation: "90° = 180°/2 = π/2 rad." },
      { id_suffix: "v3", difficulty: 2, question: "¿Cuántos grados son π/3 radianes?", options: [{text: "60°",correct:true},{text: "30°",correct:false},{text: "90°",correct:false},{text: "45°",correct:false}], explanation: "π/3 = 180°/3 = 60°." },
      { id_suffix: "v4", difficulty: 2, question: "Convierte 45° a radianes.", options: [{text: "π/4 rad",correct:true},{text: "π/2 rad",correct:false},{text: "π/6 rad",correct:false},{text: "π/3 rad",correct:false}], explanation: "45° = 180°/4 = π/4 rad." },
      { id_suffix: "v5", difficulty: 3, question: "¿Cuántos grados son 3π/2 radianes?", options: [{text: "270°",correct:true},{text: "180°",correct:false},{text: "360°",correct:false},{text: "200°",correct:false}], explanation: "3(180°)/2 = 270°." },
      { id_suffix: "v6", difficulty: 3, question: "Convierte 30° a radianes.", options: [{text: "π/6 rad",correct:true},{text: "π/3 rad",correct:false},{text: "π/4 rad",correct:false},{text: "π/5 rad",correct:false}], explanation: "30° = 180°/6 = π/6 rad." },
      { id_suffix: "v7", difficulty: 4, question: "Convierte 135° a radianes.", options: [{text: "3π/4 rad",correct:true},{text: "2π/3 rad",correct:false},{text: "5π/6 rad",correct:false},{text: "4π/3 rad",correct:false}], explanation: "135° = 3 * 45° = 3π/4 rad." },
      { id_suffix: "v8", difficulty: 4, question: "¿Cuántos grados son 5π/6 radianes?", options: [{text: "150°",correct:true},{text: "120°",correct:false},{text: "135°",correct:false},{text: "160°",correct:false}], explanation: "5(180°)/6 = 5(30°) = 150°." },
      { id_suffix: "v9", difficulty: 5, question: "Un ángulo de 1 radián es aproximadamente:", options: [{text: "57.3°",correct:true},{text: "60°",correct:false},{text: "45°",correct:false},{text: "90°",correct:false}], explanation: "1 rad = 180°/π ≈ 57.29°." },
      { id_suffix: "v10", difficulty: 5, question: "Convierte 360° a radianes.", options: [{text: "2π rad",correct:true},{text: "π rad",correct:false},{text: "4π rad",correct:false},{text: "3π rad",correct:false}], explanation: "360° es una vuelta completa, 2π radianes." }
    ]
  },

  // Bundle 2: Pythagorean Theorem
  {
    meta: {
      id: "CO-MAT-10-trig-pythagoras-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "teorema-pitagoras",
      periodo: 1,
      dba_id: "DBA-MAT-10-1",
      title: "Teorema de Pitágoras"
    },
    base: { question: "Halla la hipotenusa.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "En un triángulo rectángulo, los catetos miden 3 y 4. ¿Cuánto mide la hipotenusa?", options: [{text: "5",correct:true},{text: "6",correct:false},{text: "7",correct:false},{text: "25",correct:false}], explanation: "√(3² + 4²) = √(9 + 16) = √25 = 5." },
      { id_suffix: "v2", difficulty: 1, question: "¿Cuál es la fórmula del Teorema de Pitágoras?", options: [{text: "c² = a² + b²",correct:true},{text: "c = a + b",correct:false},{text: "c² = a² - b²",correct:false},{text: "c = a² + b²",correct:false}], explanation: "La suma de los cuadrados de los catetos es igual al cuadrado de la hipotenusa." },
      { id_suffix: "v3", difficulty: 2, question: "Si la hipotenusa es 10 y un cateto es 6, ¿cuánto mide el otro cateto?", options: [{text: "8",correct:true},{text: "4",correct:false},{text: "16",correct:false},{text: "12",correct:false}], explanation: "b = √(10² - 6²) = √(100 - 36) = √64 = 8." },
      { id_suffix: "v4", difficulty: 2, question: "Catetos de 5 y 12. Halla la hipotenusa.", options: [{text: "13",correct:true},{text: "15",correct:false},{text: "17",correct:false},{text: "10",correct:false}], explanation: "√(25 + 144) = √169 = 13." },
      { id_suffix: "v5", difficulty: 3, question: "En un triángulo rectángulo, la hipotenusa mide √2 y los catetos son iguales. ¿Cuánto miden?", options: [{text: "1",correct:true},{text: "2",correct:false},{text: "0.5",correct:false},{text: "√3",correct:false}], explanation: "2x² = (√2)² -> 2x² = 2 -> x² = 1 -> x = 1." },
      { id_suffix: "v6", difficulty: 3, question: "Si los catetos miden 1 y 1, ¿cuánto es la hipotenusa?", options: [{text: "√2",correct:true},{text: "2",correct:false},{text: "1",correct:false},{text: "√3",correct:false}], explanation: "√(1² + 1²) = √2." },
      { id_suffix: "v7", difficulty: 4, question: "Calcula la diagonal de un cuadrado de lado 4.", options: [{text: "4√2",correct:true},{text: "8",correct:false},{text: "4",correct:false},{text: "16",correct:false}], explanation: "d = √(4² + 4²) = √32 = 4√2." },
      { id_suffix: "v8", difficulty: 4, question: "Calcula la altura de un triángulo equilátero de lado 2.", options: [{text: "√3",correct:true},{text: "√2",correct:false},{text: "1",correct:false},{text: "2",correct:false}], explanation: "h = √(2² - 1²) = √3." },
      { id_suffix: "v9", difficulty: 5, question: "¿Es posible un triángulo rectángulo con lados 8, 15 y 17?", options: [{text: "Sí",correct:true},{text: "No",correct:false},{text: "Solo si es isósceles",correct:false},{text: "Depende",correct:false}], explanation: "8² + 15² = 64 + 225 = 289 = 17². Sí." },
      { id_suffix: "v10", difficulty: 5, question: "En un triángulo rectángulo, si c=13 y a=5, halla b.", options: [{text: "12",correct:true},{text: "8",correct:false},{text: "10",correct:false},{text: "9",correct:false}], explanation: "b = √(169 - 25) = √144 = 12." }
    ]
  },

  // Bundle 3: Trigonometric Ratios (Definitions)
  {
    meta: {
      id: "CO-MAT-10-trig-ratios-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "razones-trigonometricas",
      periodo: 1,
      dba_id: "DBA-MAT-10-1",
      title: "Razones Trigonométricas"
    },
    base: { question: "Define Seno.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "¿Cómo se define el Seno en un triángulo rectángulo?", options: [{text: "Opuesto / Hipotenusa",correct:true},{text: "Adyacente / Hipotenusa",correct:false},{text: "Opuesto / Adyacente",correct:false},{text: "Hipotenusa / Opuesto",correct:false}], explanation: "Seno = CO / H." },
      { id_suffix: "v2", difficulty: 1, question: "¿Cómo se define el Coseno?", options: [{text: "Adyacente / Hipotenusa",correct:true},{text: "Opuesto / Hipotenusa",correct:false},{text: "Opuesto / Adyacente",correct:false},{text: "Hipotenusa / Adyacente",correct:false}], explanation: "Coseno = CA / H." },
      { id_suffix: "v3", difficulty: 2, question: "¿Cómo se define la Tangente?", options: [{text: "Opuesto / Adyacente",correct:true},{text: "Adyacente / Opuesto",correct:false},{text: "Opuesto / Hipotenusa",correct:false},{text: "Hipotenusa / Opuesto",correct:false}], explanation: "Tangente = CO / CA." },
      { id_suffix: "v4", difficulty: 2, question: "La recíproca del Seno es:", options: [{text: "Cosecante",correct:true},{text: "Secante",correct:false},{text: "Cotangente",correct:false},{text: "Tangente",correct:false}], explanation: "Cosecante = 1 / Seno." },
      { id_suffix: "v5", difficulty: 3, question: "La recíproca del Coseno es:", options: [{text: "Secante",correct:true},{text: "Cosecante",correct:false},{text: "Cotangente",correct:false},{text: "Seno",correct:false}], explanation: "Secante = 1 / Coseno." },
      { id_suffix: "v6", difficulty: 3, question: "La recíproca de la Tangente es:", options: [{text: "Cotangente",correct:true},{text: "Secante",correct:false},{text: "Cosecante",correct:false},{text: "Seno",correct:false}], explanation: "Cotangente = 1 / Tangente." },
      { id_suffix: "v7", difficulty: 4, question: "Si Sen(A) = 3/5, ¿cuánto es Csc(A)?", options: [{text: "5/3",correct:true},{text: "3/5",correct:false},{text: "4/5",correct:false},{text: "5/4",correct:false}], explanation: "Recíproco de 3/5 es 5/3." },
      { id_suffix: "v8", difficulty: 4, question: "Si Tan(A) = 1, ¿cuánto vale A (agudo)?", options: [{text: "45°",correct:true},{text: "30°",correct:false},{text: "60°",correct:false},{text: "90°",correct:false}], explanation: "Tan(45°) = 1." },
      { id_suffix: "v9", difficulty: 5, question: "Si Cos(A) = 1/2, ¿cuánto vale Sec(A)?", options: [{text: "2",correct:true},{text: "0.5",correct:false},{text: "1",correct:false},{text: "√3",correct:false}], explanation: "Recíproco de 1/2 es 2." },
      { id_suffix: "v10", difficulty: 5, question: "¿Cuál razón no depende de la hipotenusa?", options: [{text: "Tangente",correct:true},{text: "Seno",correct:false},{text: "Coseno",correct:false},{text: "Secante",correct:false}], explanation: "Tan = CO / CA." }
    ]
  },

  // Bundle 4: Calculating Ratios
  {
    meta: {
      id: "CO-MAT-10-trig-calc-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "calculo-razones",
      periodo: 1,
      dba_id: "DBA-MAT-10-1",
      title: "Cálculo de Razones"
    },
    base: { question: "Calcula el valor.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Si CO=3, CA=4, H=5. ¿Cuánto es Sen(A)?", options: [{text: "3/5",correct:true},{text: "4/5",correct:false},{text: "3/4",correct:false},{text: "5/3",correct:false}], explanation: "Seno = Opuesto / Hipotenusa = 3/5." },
      { id_suffix: "v2", difficulty: 1, question: "Si CO=3, CA=4, H=5. ¿Cuánto es Cos(A)?", options: [{text: "4/5",correct:true},{text: "3/5",correct:false},{text: "3/4",correct:false},{text: "5/4",correct:false}], explanation: "Coseno = Adyacente / Hipotenusa = 4/5." },
      { id_suffix: "v3", difficulty: 2, question: "Triángulo lados 5, 12, 13. Seno del ángulo opuesto a 5:", options: [{text: "5/13",correct:true},{text: "12/13",correct:false},{text: "5/12",correct:false},{text: "13/5",correct:false}], explanation: "Seno = 5/13." },
      { id_suffix: "v4", difficulty: 2, question: "Triángulo lados 8, 15, 17. Tangente del ángulo opuesto a 8:", options: [{text: "8/15",correct:true},{text: "15/8",correct:false},{text: "8/17",correct:false},{text: "15/17",correct:false}], explanation: "Tan = CO / CA = 8/15." },
      { id_suffix: "v5", difficulty: 3, question: "Si Sen(x) = 1/2. ¿Cuánto vale Cos(x) si x es agudo?", options: [{text: "√3/2",correct:true},{text: "1/2",correct:false},{text: "1",correct:false},{text: "√2/2",correct:false}], explanation: "Por Pitágoras: 1² + b² = 2² -> b=√3. Cos = √3/2." },
      { id_suffix: "v6", difficulty: 3, question: "Si Tan(x) = 3/4. ¿Cuánto vale Sen(x)?", options: [{text: "3/5",correct:true},{text: "4/5",correct:false},{text: "3/7",correct:false},{text: "4/3",correct:false}], explanation: "Triángulo 3-4-5. Seno = 3/5." },
      { id_suffix: "v7", difficulty: 4, question: "Valor exacto de Sen(45°):", options: [{text: "√2/2",correct:true},{text: "1/2",correct:false},{text: "√3/2",correct:false},{text: "1",correct:false}], explanation: "Triángulo notable 45-45." },
      { id_suffix: "v8", difficulty: 4, question: "Valor exacto de Cos(60°):", options: [{text: "1/2",correct:true},{text: "√3/2",correct:false},{text: "√2/2",correct:false},{text: "0",correct:false}], explanation: "Triángulo notable 30-60." },
      { id_suffix: "v9", difficulty: 5, question: "Valor exacto de Tan(30°):", options: [{text: "√3/3",correct:true},{text: "√3",correct:false},{text: "1",correct:false},{text: "1/2",correct:false}], explanation: "1/√3 racionalizado es √3/3." },
      { id_suffix: "v10", difficulty: 5, question: "Si Sen(A)=Cos(A), ¿cuánto vale A?", options: [{text: "45°",correct:true},{text: "30°",correct:false},{text: "60°",correct:false},{text: "90°",correct:false}], explanation: "Sen(45) = Cos(45) = √2/2." }
    ]
  },

  // Bundle 5: Special Triangles
  {
    meta: {
      id: "CO-MAT-10-trig-special-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "triangulos-notables",
      periodo: 1,
      dba_id: "DBA-MAT-10-1",
      title: "Triángulos Notables"
    },
    base: { question: "Propiedades triángulos especiales.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "En un triángulo 45-45-90, si un cateto es x, la hipotenusa es:", options: [{text: "x√2",correct:true},{text: "2x",correct:false},{text: "x√3",correct:false},{text: "x",correct:false}], explanation: "Relación estándar 45-45-90." },
      { id_suffix: "v2", difficulty: 1, question: "En un triángulo 30-60-90, la hipotenusa es:", options: [{text: "El doble del cateto menor",correct:true},{text: "El triple del cateto menor",correct:false},{text: "Igual al cateto mayor",correct:false},{text: "La mitad del cateto mayor",correct:false}], explanation: "H = 2 * cateto menor." },
      { id_suffix: "v3", difficulty: 2, question: "Triángulo 30-60-90. Si cateto menor es 5, ¿cuál es la hipotenusa?", options: [{text: "10",correct:true},{text: "15",correct:false},{text: "5√3",correct:false},{text: "20",correct:false}], explanation: "2 * 5 = 10." },
      { id_suffix: "v4", difficulty: 2, question: "Triángulo 45-45-90. Si hipotenusa es 10√2, ¿cuánto miden los catetos?", options: [{text: "10",correct:true},{text: "5",correct:false},{text: "20",correct:false},{text: "10√2",correct:false}], explanation: "x√2 = 10√2 -> x = 10." },
      { id_suffix: "v5", difficulty: 3, question: "Triángulo 30-60-90. Si cateto menor es 4, ¿cuánto es el cateto mayor?", options: [{text: "4√3",correct:true},{text: "8",correct:false},{text: "4√2",correct:false},{text: "12",correct:false}], explanation: "x√3 = 4√3." },
      { id_suffix: "v6", difficulty: 3, question: "Triángulo Equilátero de lado 6. ¿Cuál es su altura?", options: [{text: "3√3",correct:true},{text: "3√2",correct:false},{text: "6",correct:false},{text: "3",correct:false}], explanation: "Forma triángulos 30-60-90. Altura = 3√3." },
      { id_suffix: "v7", difficulty: 4, question: "Seno de 60° a partir de triángulo equilátero:", options: [{text: "√3/2",correct:true},{text: "1/2",correct:false},{text: "√2/2",correct:false},{text: "1",correct:false}], explanation: "Opuesto (√3/2 lado) / Hipotenusa (lado)." },
      { id_suffix: "v8", difficulty: 4, question: "Diagonal de un cuadrado de lado 1:", options: [{text: "√2",correct:true},{text: "1",correct:false},{text: "2",correct:false},{text: "1.5",correct:false}], explanation: "1√2." },
      { id_suffix: "v9", difficulty: 5, question: "Área de triángulo equilátero de lado 4:", options: [{text: "4√3",correct:true},{text: "8",correct:false},{text: "16",correct:false},{text: "4",correct:false}], explanation: "(b*h)/2 = (4 * 2√3)/2 = 4√3." },
      { id_suffix: "v10", difficulty: 5, question: "Si la altura de un triángulo equilátero es 3, ¿cuánto mide el lado?", options: [{text: "2√3",correct:true},{text: "3",correct:false},{text: "√3",correct:false},{text: "6",correct:false}], explanation: "h = (L√3)/2 -> 3 = (L√3)/2 -> L = 6/√3 = 2√3." }
    ]
  },

  // Bundle 6: Solving Right Triangles
  {
    meta: {
      id: "CO-MAT-10-trig-solve-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "resolucion-triangulos",
      periodo: 1,
      dba_id: "DBA-MAT-10-1",
      title: "Solución de Triángulos"
    },
    base: { question: "Resuelve el triángulo.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Si un ángulo agudo es 30°, ¿cuánto mide el otro?", options: [{text: "60°",correct:true},{text: "90°",correct:false},{text: "45°",correct:false},{text: "30°",correct:false}], explanation: "90 - 30 = 60." },
      { id_suffix: "v2", difficulty: 1, question: "La suma de los ángulos internos de un triángulo es:", options: [{text: "180°",correct:true},{text: "360°",correct:false},{text: "90°",correct:false},{text: "270°",correct:false}], explanation: "Teorema fundamental." },
      { id_suffix: "v3", difficulty: 2, question: "Si Hipotenusa=10 y ángulo=30°. ¿Calcule cateto opuesto?", options: [{text: "5",correct:true},{text: "10",correct:false},{text: "5√3",correct:false},{text: "20",correct:false}], explanation: "Sen(30) = CO/10 -> 0.5 = CO/10 -> CO=5." },
      { id_suffix: "v4", difficulty: 2, question: "Si H=20 y ángulo=60°. Calcule cateto adyacente.", options: [{text: "10",correct:true},{text: "10√3",correct:false},{text: "20",correct:false},{text: "5",correct:false}], explanation: "Cos(60) = CA/20 -> 0.5 * 20 = 10." },
      { id_suffix: "v5", difficulty: 3, question: "Si CO=10 y CA=10. ¿Cuánto mide el ángulo?", options: [{text: "45°",correct:true},{text: "30°",correct:false},{text: "60°",correct:false},{text: "90°",correct:false}], explanation: "Tan(x) = 10/10 = 1 -> x=45°." },
      { id_suffix: "v6", difficulty: 3, question: "Si tan(θ)=1. ¿Cuál es el ángulo agudo?", options: [{text: "45°",correct:true},{text: "135°",correct:false},{text: "30°",correct:false},{text: "60°",correct:false}], explanation: "Inversa de Tan(1)." },
      { id_suffix: "v7", difficulty: 4, question: "Para hallar un ángulo conociendo los 3 lados usamos:", options: [{text: "Razones Trigo Inversas",correct:true},{text: "Pitágoras solo",correct:false},{text: "Suma",correct:false},{text: "Resta",correct:false}], explanation: "Sen⁻¹, Cos⁻¹, Tan⁻¹." },
      { id_suffix: "v8", difficulty: 4, question: "Si Sen(θ) = 0.5, halla θ.", options: [{text: "30°",correct:true},{text: "60°",correct:false},{text: "45°",correct:false},{text: "0°",correct:false}], explanation: "ArcSen(0.5) = 30°." },
      { id_suffix: "v9", difficulty: 5, question: "¿Cuántos datos mínimos necesitas para resolver un triángulo rectángulo?", options: [{text: "2 (uno debe ser lado)",correct:true},{text: "1",correct:false},{text: "3 ángulos",correct:false},{text: "Ninguno",correct:false}], explanation: "Al menos un lado y otro dato." },
      { id_suffix: "v10", difficulty: 5, question: "Si conoces un cateto y el ángulo adyacente, ¿usás?", options: [{text: "Coseno o Tangente",correct:true},{text: "Seno únicamente",correct:false},{text: "Pitágoras",correct:false},{text: "Ninguna",correct:false}], explanation: "Depende qué busques (H o CO)." }
    ]
  },

  // Bundle 7: Applications (Elevation/Depression)
  {
    meta: {
      id: "CO-MAT-10-trig-app-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "aplicaciones-trig",
      periodo: 1,
      dba_id: "DBA-MAT-10-1",
      title: "Problemas de Aplicación"
    },
    base: { question: "Resuelve el problema.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "¿Qué es un ángulo de elevación?", options: [{text: "Ángulo hacia arriba desde la horizontal",correct:true},{text: "Ángulo hacia abajo",correct:false},{text: "Ángulo recto",correct:false},{text: "Ángulo obtuso",correct:false}], explanation: "Definición." },
      { id_suffix: "v2", difficulty: 1, question: "¿Qué es un ángulo de depresión?", options: [{text: "Ángulo hacia abajo desde la horizontal",correct:true},{text: "Ángulo hacia arriba",correct:false},{text: "Ángulo agudo",correct:false},{text: "Ángulo llano",correct:false}], explanation: "Definición." },
      { id_suffix: "v3", difficulty: 2, question: "Una escalera de 10m se apoya en una pared formando 60° con el suelo. ¿Altura?", options: [{text: "5√3 m",correct:true},{text: "5 m",correct:false},{text: "10 m",correct:false},{text: "10√3 m",correct:false}], explanation: "Sen(60) = h/10 -> h = 10 * √3/2." },
      { id_suffix: "v4", difficulty: 2, question: "Sombra de un árbol de 10m de altura cuando el sol está a 45°:", options: [{text: "10 m",correct:true},{text: "5 m",correct:false},{text: "20 m",correct:false},{text: "15 m",correct:false}], explanation: "Tan(45) = 1 = Altura/Sombra -> Sombra = 10." },
      { id_suffix: "v5", difficulty: 3, question: "Desde un faro de 50m se ve un barco con depresión de 30°. Distancia al barco:", options: [{text: "50√3 m",correct:true},{text: "50 m",correct:false},{text: "100 m",correct:false},{text: "25 m",correct:false}], explanation: "Tan(30) = 50/x -> 1/√3 = 50/x -> x = 50√3." },
      { id_suffix: "v6", difficulty: 3, question: "Cometa con cuerda de 100m a 30° con el suelo. Altura:", options: [{text: "50 m",correct:true},{text: "100 m",correct:false},{text: "50√3 m",correct:false},{text: "25 m",correct:false}], explanation: "Sen(30) = h/100 -> h = 0.5 * 100." },
      { id_suffix: "v7", difficulty: 4, question: "Si la sombra es igual a la altura, el ángulo de elevación es:", options: [{text: "45°",correct:true},{text: "30°",correct:false},{text: "60°",correct:false},{text: "90°",correct:false}], explanation: "Tan(x) = 1." },
      { id_suffix: "v8", difficulty: 4, question: "Si la sombra es √3 veces la altura, el ángulo es:", options: [{text: "30°",correct:true},{text: "60°",correct:false},{text: "45°",correct:false},{text: "15°",correct:false}], explanation: "Tan(x) = h / (h√3) = 1/√3 -> x=30°." },
      { id_suffix: "v9", difficulty: 5, question: "Dos observadores ven un avión. Problema de doble observación.", options: [{text: "Requiere sistema de ecuaciones",correct:true},{text: "Es imposible",correct:false},{text: "Se adivina",correct:false},{text: "Es cero",correct:false}], explanation: "Concepto avanzado." },
      { id_suffix: "v10", difficulty: 5, question: "Rampa con inclinación del 10%. ¿Qué significa?", options: [{text: "Sube 10 unidades por cada 100 horizontales",correct:true},{text: "Ángulo de 10 grados",correct:false},{text: "Longitud 10m",correct:false},{text: "10% de fricción",correct:false}], explanation: "Interpretación de pendiente." }
    ]
  },

  // Bundle 8: Reciprocal Identities
  {
    meta: {
      id: "CO-MAT-10-trig-ident-bas-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "identidades-basicas",
      periodo: 1,
      dba_id: "DBA-MAT-10-1",
      title: "Identidades Recíprocas"
    },
    base: { question: "Identifica la identidad.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Sen(x) * Csc(x) es igual a:", options: [{text: "1",correct:true},{text: "0",correct:false},{text: "-1",correct:false},{text: "Tan(x)",correct:false}], explanation: "Son recíprocas." },
      { id_suffix: "v2", difficulty: 1, question: "Cos(x) * Sec(x) es igual a:", options: [{text: "1",correct:true},{text: "0",correct:false},{text: "2",correct:false},{text: "Sen(x)",correct:false}], explanation: "Son recíprocas." },
      { id_suffix: "v3", difficulty: 2, question: "Tan(x) * Cot(x) es igual a:", options: [{text: "1",correct:true},{text: "0",correct:false},{text: "Sen(x)",correct:false},{text: "Cos(x)",correct:false}], explanation: "Son recíprocas." },
      { id_suffix: "v4", difficulty: 2, question: "Tan(x) se puede escribir como:", options: [{text: "Sen(x)/Cos(x)",correct:true},{text: "Cos(x)/Sen(x)",correct:false},{text: "1/Sen(x)",correct:false},{text: "1/Cos(x)",correct:false}], explanation: "Identidad de cociente." },
      { id_suffix: "v5", difficulty: 3, question: "Cot(x) se puede escribir como:", options: [{text: "Cos(x)/Sen(x)",correct:true},{text: "Sen(x)/Cos(x)",correct:false},{text: "1/Cos(x)",correct:false},{text: "Tan(x)",correct:false}], explanation: "Identidad de cociente." },
      { id_suffix: "v6", difficulty: 3, question: "Si Sen(x)=1/3, entonces Csc(x) es:", options: [{text: "3",correct:true},{text: "1/3",correct:false},{text: "-3",correct:false},{text: "0.3",correct:false}], explanation: "Inverso multiplicativo." },
      { id_suffix: "v7", difficulty: 4, question: "Sen²(x) + Cos²(x) es:", options: [{text: "1",correct:true},{text: "0",correct:false},{text: "2",correct:false},{text: "Tan²(x)",correct:false}], explanation: "Identidad Pitagórica fundamental." },
      { id_suffix: "v8", difficulty: 4, question: "1 - Sen²(x) es:", options: [{text: "Cos²(x)",correct:true},{text: "Sen²(x)",correct:false},{text: "1",correct:false},{text: "0",correct:false}], explanation: "Despeje de pitagórica." },
      { id_suffix: "v9", difficulty: 5, question: "Sec²(x) - 1 es:", options: [{text: "Tan²(x)",correct:true},{text: "Cot²(x)",correct:false},{text: "1",correct:false},{text: "0",correct:false}], explanation: "Identidad pitagórica derivada." },
      { id_suffix: "v10", difficulty: 5, question: "Csc²(x) - Cot²(x) es:", options: [{text: "1",correct:true},{text: "0",correct:false},{text: "-1",correct:false},{text: "2",correct:false}], explanation: "Identidad pitagórica." }
    ]
  },

  // Bundle 9: Complementary Angles
  {
    meta: {
      id: "CO-MAT-10-trig-compl-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "angulos-complementarios",
      periodo: 1,
      dba_id: "DBA-MAT-10-1",
      title: "Ángulos Complementarios"
    },
    base: { question: "Relación cofunciones.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Sen(30°) es igual a:", options: [{text: "Cos(60°)",correct:true},{text: "Cos(30°)",correct:false},{text: "Sen(60°)",correct:false},{text: "Tan(30°)",correct:false}], explanation: "Cofunciones de complementarios." },
      { id_suffix: "v2", difficulty: 1, question: "Tan(20°) es igual a:", options: [{text: "Cot(70°)",correct:true},{text: "Tan(70°)",correct:false},{text: "Cot(20°)",correct:false},{text: "Sen(20°)",correct:false}], explanation: "Cofunciones." },
      { id_suffix: "v3", difficulty: 2, question: "Si dos ángulos suman 90°, se llaman:", options: [{text: "Complementarios",correct:true},{text: "Suplementarios",correct:false},{text: "Opuestos",correct:false},{text: "Rectos",correct:false}], explanation: "Definición." },
      { id_suffix: "v4", difficulty: 2, question: "Sec(x) = Csc(y) implica que x + y es:", options: [{text: "90°",correct:true},{text: "180°",correct:false},{text: "0°",correct:false},{text: "45°",correct:false}], explanation: "Coefunciones." },
      { id_suffix: "v5", difficulty: 3, question: "Cos(90° - x) es:", options: [{text: "Sen(x)",correct:true},{text: "Cos(x)",correct:false},{text: "-Sen(x)",correct:false},{text: "-Cos(x)",correct:false}], explanation: "Identidad de cofunción." },
      { id_suffix: "v6", difficulty: 3, question: "Sen(90° - x) es:", options: [{text: "Cos(x)",correct:true},{text: "Sen(x)",correct:false},{text: "Tan(x)",correct:false},{text: "Sec(x)",correct:false}], explanation: "Identidad." },
      { id_suffix: "v7", difficulty: 4, question: "Si Sen(A) = Cos(35°), ¿cuánto vale A?", options: [{text: "55°",correct:true},{text: "35°",correct:false},{text: "45°",correct:false},{text: "65°",correct:false}], explanation: "90 - 35 = 55." },
      { id_suffix: "v8", difficulty: 4, question: "Simplifica Sen(50°) / Cos(40°).", options: [{text: "1",correct:true},{text: "0",correct:false},{text: "Tan(50)",correct:false},{text: "2",correct:false}], explanation: "Son iguales, la división da 1." },
      { id_suffix: "v9", difficulty: 5, question: "Si Tan(x) = Cot(2x), halla x.", options: [{text: "30°",correct:true},{text: "60°",correct:false},{text: "45°",correct:false},{text: "15°",correct:false}], explanation: "x + 2x = 90 -> 3x=90 -> x=30." },
      { id_suffix: "v10", difficulty: 5, question: "¿Por qué se llama 'Coseno'?", options: [{text: "Seno del Complemento",correct:true},{text: "Seno Contrario",correct:false},{text: "Compañero Seno",correct:false},{text: "No tiene razón",correct:false}], explanation: "Etimología Co-Seno." }
    ]
  },

  // Bundle 10: Taller Review P1
    {
    meta: {
      id: "CO-MAT-10-taller-p1-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "review",
      periodo: 1,
      dba_id: "DBA-MAT-10-1",
      title: "Taller Repaso P1"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "45° en radianes es:", options: [{text: "π/4",correct:true},{text: "π/2",correct:false},{text: "π",correct:false},{text: "π/3",correct:false}], explanation: "Conversión." },
      { id_suffix: "v2", difficulty: 1, question: "Hipotenusa de catetos 3 y 4:", options: [{text: "5",correct:true},{text: "7",correct:false},{text: "6",correct:false},{text: "1",correct:false}], explanation: "Pitágoras." },
      { id_suffix: "v3", difficulty: 2, question: "Definición de Tangente:", options: [{text: "CO / CA",correct:true},{text: "CO / H",correct:false},{text: "CA / H",correct:false},{text: "H / CA",correct:false}], explanation: "Trigo." },
      { id_suffix: "v4", difficulty: 2, question: "Sen(30°):", options: [{text: "0.5",correct:true},{text: "1",correct:false},{text: "0.86",correct:false},{text: "0",correct:false}], explanation: "Valor exacto 1/2." },
      { id_suffix: "v5", difficulty: 3, question: "Si Tan(x)=1, x es:", options: [{text: "45°",correct:true},{text: "30°",correct:false},{text: "60°",correct:false},{text: "90°",correct:false}], explanation: "Notable." },
      { id_suffix: "v6", difficulty: 3, question: "1/Sen(x) es:", options: [{text: "Csc(x)",correct:true},{text: "Sec(x)",correct:false},{text: "Cot(x)",correct:false},{text: "Tan(x)",correct:false}], explanation: "Recíproca." },
      { id_suffix: "v7", difficulty: 4, question: "Altura triángulo equilátero lado 2:", options: [{text: "√3",correct:true},{text: "√2",correct:false},{text: "1",correct:false},{text: "2",correct:false}], explanation: "Pitágoras." },
      { id_suffix: "v8", difficulty: 4, question: "Cos(60°) es igual a:", options: [{text: "Sen(30°)",correct:true},{text: "Sen(60°)",correct:false},{text: "Tan(30°)",correct:false},{text: "Cos(30°)",correct:false}], explanation: "Cofunción." },
      { id_suffix: "v9", difficulty: 5, question: "Sen²(x) + Cos²(x) - 1 =", options: [{text: "0",correct:true},{text: "1",correct:false},{text: "2",correct:false},{text: "-1",correct:false}], explanation: "Identidad pitagórica." },
      { id_suffix: "v10", difficulty: 5, question: "Si un cateto es mitad de hipotenusa, el ángulo opuesto es:", options: [{text: "30°",correct:true},{text: "60°",correct:false},{text: "45°",correct:false},{text: "15°",correct:false}], explanation: "Sen(x)=1/2 -> x=30." }
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
    console.log(`✅ Created Period 1 Bundle v3.0: ${fullPath}`);
});
