
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: Law of Sines
  {
    meta: {
      id: "CO-MAT-10-trig-sinelaw-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "teorema-seno",
      periodo: 2,
      dba_id: "DBA-MAT-10-2",
      title: "Teorema del Seno"
    },
    base: { question: "Aplica el Teorema del Seno.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "¿Cuál es la fórmula del Teorema del Seno?", options: [{text: "a/SenA = b/SenB = c/SenC",correct:true},{text: "a² = b² + c²",correct:false},{text: "SenA + SenB = SenC",correct:false},{text: "a*b = SenC",correct:false}], explanation: "Relación proporcional entre lados y senos de ángulos opuestos." },
      { id_suffix: "v2", difficulty: 1, question: "¿Cuándo se usa el Teorema del Seno?", options: [{text: "Conociendo 2 ángulos y 1 lado (AAL) o 2 lados y un ángulo opuesto (LLA)",correct:true},{text: "Solo en triángulos rectángulos",correct:false},{text: "Conociendo 3 lados (LLL)",correct:false},{text: "Nunca",correct:false}], explanation: "Casos de aplicación." },
      { id_suffix: "v3", difficulty: 2, question: "Si a=10, SenA=0.5, SenB=0.5. ¿Cuánto vale b?", options: [{text: "10",correct:true},{text: "5",correct:false},{text: "20",correct:false},{text: "1",correct:false}], explanation: "10/0.5 = b/0.5 -> b=10." },
      { id_suffix: "v4", difficulty: 2, question: "Si a=10, A=30°, B=30°. ¿Cuánto vale b?", options: [{text: "10",correct:true},{text: "5",correct:false},{text: "20",correct:false},{text: "15",correct:false}], explanation: "Ángulos iguales -> lados iguales." },
      { id_suffix: "v5", difficulty: 3, question: "En triángulo ABC, A=45°, B=45°, c=10. Halla a.", options: [{text: "5√2",correct:true},{text: "10",correct:false},{text: "5",correct:false},{text: "10√2",correct:false}], explanation: "C=90. Sen(45)/a = Sen(90)/10 -> a = 10*Sen(45) = 5√2." },
      { id_suffix: "v6", difficulty: 3, question: "Si a/SenA = 10 y SenB = 0.2, halla b.", options: [{text: "2",correct:true},{text: "5",correct:false},{text: "20",correct:false},{text: "0.2",correct:false}], explanation: "b = 10 * 0.2 = 2." },
      { id_suffix: "v7", difficulty: 4, question: "Caso ambiguo (LLA): Si calculas SenB > 1, ¿qué significa?", options: [{text: "No existe tal triángulo",correct:true},{text: "Hay 2 soluciones",correct:false},{text: "Es rectángulo",correct:false},{text: "Es equilátero",correct:false}], explanation: "Seno no puede ser mayor a 1." },
      { id_suffix: "v8", difficulty: 4, question: "Caso ambiguo (LLA): Si SenB < 1, ¿cuántas soluciones pueden existir?", options: [{text: "Una o Dos",correct:true},{text: "Ninguna",correct:false},{text: "Tres",correct:false},{text: "Siempre una",correct:false}], explanation: "Depende de la longitud del lado." },
      { id_suffix: "v9", difficulty: 5, question: "Radio de la circunferencia circunscrita (R) y Teorema del Seno:", options: [{text: "a/SenA = 2R",correct:true},{text: "a/SenA = R",correct:false},{text: "a/SenA = R²",correct:false},{text: "a*SenA = R",correct:false}], explanation: "Propiedad avanzada." },
      { id_suffix: "v10", difficulty: 5, question: "Resuelve: a=5, SenA=1/3, SenB=2/3. Halla b.", options: [{text: "10",correct:true},{text: "5",correct:false},{text: "15",correct:false},{text: "2.5",correct:false}], explanation: "5/(1/3) = b/(2/3) -> 15 = 3b/2 -> 30=3b -> b=10." }
    ]
  },

  // Bundle 2: Law of Cosines
  {
    meta: {
      id: "CO-MAT-10-trig-coslaw-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "teorema-coseno",
      periodo: 2,
      dba_id: "DBA-MAT-10-2",
      title: "Teorema del Coseno"
    },
    base: { question: "Aplica el Teorema del Coseno.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "¿Fórmula para hallar el lado 'c'?", options: [{text: "c² = a² + b² - 2ab*CosC",correct:true},{text: "c² = a² + b² + 2ab*CosC",correct:false},{text: "c = a + b",correct:false},{text: "c² = a² - b²",correct:false}], explanation: "Generalización de Pitágoras." },
      { id_suffix: "v2", difficulty: 1, question: "¿Cuándo se usa el Teorema del Coseno?", options: [{text: "Conociendo 3 lados (LLL) o 2 lados y ángulo comprendido (LAL)",correct:true},{text: "Solo en rectángulos",correct:false},{text: "Conociendo 2 ángulos",correct:false},{text: "Nunca",correct:false}], explanation: "Casos de aplicación." },
      { id_suffix: "v3", difficulty: 2, question: "Si C=90°, ¿en qué se convierte el Teorema del Coseno?", options: [{text: "Teorema de Pitágoras",correct:true},{text: "Teorema de Tales",correct:false},{text: "Ley de Ohm",correct:false},{text: "Nada",correct:false}], explanation: "Cos(90)=0, queda c² = a² + b²." },
      { id_suffix: "v4", difficulty: 2, question: "Halla c si a=3, b=4, C=90°.", options: [{text: "5",correct:true},{text: "7",correct:false},{text: "6",correct:false},{text: "√7",correct:false}], explanation: "Pitagoras: 3-4-5." },
      { id_suffix: "v5", difficulty: 3, question: "Halla c si a=2, b=2, C=60°.", options: [{text: "2",correct:true},{text: "√3",correct:false},{text: "4",correct:false},{text: "1",correct:false}], explanation: "c² = 4+4 - 2(2)(2)(0.5) = 8 - 4 = 4 -> c=2 (Equilátero)." },
      { id_suffix: "v6", difficulty: 3, question: "Hallar CosA si a² = b² + c² - bc.", options: [{text: "0.5 (60°)",correct:true},{text: "0 (90°)",correct:false},{text: "1 (0°)",correct:false},{text: "-0.5 (120°)",correct:false}], explanation: "2bc*CosA = bc -> CosA = 0.5." },
      { id_suffix: "v7", difficulty: 4, question: "Lados 3, 5, 7. ¿Es acutángulo, rectángulo u obtusángulo?", options: [{text: "Obtusángulo",correct:true},{text: "Rectángulo",correct:false},{text: "Acutángulo",correct:false},{text: "Imposible",correct:false}], explanation: "7² vs 3²+5² -> 49 > 9+25 (34). Obtusángulo." },
      { id_suffix: "v8", difficulty: 4, question: "Halla el ángulo opuesto al lado 7 en triángulo 3-5-7.", options: [{text: "CosC = -0.5 (120°)",correct:true},{text: "60°",correct:false},{text: "90°",correct:false},{text: "30°",correct:false}], explanation: "49 = 9+25 - 2(3)(5)CosC -> 15 = -30CosC -> CosC = -0.5." },
      { id_suffix: "v9", difficulty: 5, question: "Aplicación: Dos fuerzas de 10N forman 60°. Resultante:", options: [{text: "10√3 N",correct:true},{text: "20 N",correct:false},{text: "10 N",correct:false},{text: "0 N",correct:false}], explanation: "R² = 10² + 10² + 2(10)(10)Cos(60) (Suma vectorial, regla paralelogramo usa suma, ley coseno usa resta PERO en vector resultante suma es ángulo sup). Asumiendo magnitud lado opuesto del triangulo de fuerzas (ángulo 120): R² = 100+100 - 200(-0.5) = 300 -> 10√3." },
      { id_suffix: "v10", difficulty: 5, question: "Distancia entre dos barcos que salen del mismo punto con rumbo distinto.", options: [{text: "Usar Teorema Coseno",correct:true},{text: "Usar Pitágoras",correct:false},{text: "Sumar distancias",correct:false},{text: "Restar distancias",correct:false}], explanation: "LAL clásico." }
    ]
  },

  // Bundle 3: Graph of Sine
  {
    meta: {
      id: "CO-MAT-10-trig-graph-sin-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "grafica-seno",
      periodo: 2,
      dba_id: "DBA-MAT-10-2",
      title: "Función Seno"
    },
    base: { question: "Propiedades de f(x) = Sen(x).", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "¿Cuál es el periodo de Sen(x)?", options: [{text: "2π (360°)",correct:true},{text: "π (180°)",correct:false},{text: "π/2 (90°)",correct:false},{text: "4π",correct:false}], explanation: "Se repite cada 2π." },
      { id_suffix: "v2", difficulty: 1, question: "¿Cuál es el dominio de Sen(x)?", options: [{text: "Todos los reales",correct:true},{text: "[-1, 1]",correct:false},{text: "[0, ∞)",correct:false},{text: "[-π, π]",correct:false}], explanation: "Definida para todo x." },
      { id_suffix: "v3", difficulty: 2, question: "¿Cuál es el rango de Sen(x)?", options: [{text: "[-1, 1]",correct:true},{text: "Todos los reales",correct:false},{text: "[0, 1]",correct:false},{text: "[-2, 2]",correct:false}], explanation: "Oscila entre -1 y 1." },
      { id_suffix: "v4", difficulty: 2, question: "Valor máximo de y = 3Sen(x):", options: [{text: "3",correct:true},{text: "1",correct:false},{text: "-3",correct:false},{text: "0",correct:false}], explanation: "Amplitud es 3." },
      { id_suffix: "v5", difficulty: 3, question: "Intersecciones con eje X en [0, 2π]:", options: [{text: "0, π, 2π",correct:true},{text: "π/2, 3π/2",correct:false},{text: "Solo 0",correct:false},{text: "Ninguna",correct:false}], explanation: "Sen(x)=0 en nπ." },
      { id_suffix: "v6", difficulty: 3, question: "¿Dónde alcanza su máximo Sen(x) en [0, 2π]?", options: [{text: "π/2",correct:true},{text: "π",correct:false},{text: "3π/2",correct:false},{text: "0",correct:false}], explanation: "Sen(90°) = 1." },
      { id_suffix: "v7", difficulty: 4, question: "Fase de desplazamiento: y = Sen(x - π/2).", options: [{text: "Desplazada a la derecha",correct:true},{text: "Desplazada a la izquierda",correct:false},{text: "Desplazada arriba",correct:false},{text: "No se desplaza",correct:false}], explanation: "Restar en argumento = derecha." },
      { id_suffix: "v8", difficulty: 4, question: "y = Sen(x - π/2) es equivalente a:", options: [{text: "-Cos(x)",correct:true},{text: "Cos(x)",correct:false},{text: "Sen(x)",correct:false},{text: "-Sen(x)",correct:false}], explanation: "Identidad de desfase." },
      { id_suffix: "v9", difficulty: 5, question: "Frecuencia de y = Sen(2x):", options: [{text: "1/π Hz (aprox)",correct:false},{text: "Doble oscilación en 2π",correct:true},{text: "Mitad de oscilación",correct:false},{text: "Ninguna",correct:false}], explanation: "Periodo es 2π/2 = π. 2 ciclos en 2π." },
      { id_suffix: "v10", difficulty: 5, question: "Amplitud de y = -5Sen(x):", options: [{text: "5",correct:true},{text: "-5",correct:false},{text: "1",correct:false},{text: "0",correct:false}], explanation: "Amplitud siempre positiva." }
    ]
  },

  // Bundle 4: Graph of Cosine
  {
    meta: {
      id: "CO-MAT-10-trig-graph-cos-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "grafica-coseno",
      periodo: 2,
      dba_id: "DBA-MAT-10-2",
      title: "Función Coseno"
    },
    base: { question: "Propiedades de f(x) = Cos(x).", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Cos(0) es:", options: [{text: "1",correct:true},{text: "0",correct:false},{text: "-1",correct:false},{text: "Indefinido",correct:false}], explanation: "Empieza en su máximo." },
      { id_suffix: "v2", difficulty: 1, question: "Periodo de Cos(x):", options: [{text: "2π",correct:true},{text: "π",correct:false},{text: "4π",correct:false},{text: "π/2",correct:false}], explanation: "Igual que Seno." },
      { id_suffix: "v3", difficulty: 2, question: "Cos(π/2) es:", options: [{text: "0",correct:true},{text: "1",correct:false},{text: "-1",correct:false},{text: "0.5",correct:false}], explanation: "Cruza el eje X en 90°." },
      { id_suffix: "v4", difficulty: 2, question: "Función par o impar:", options: [{text: "Par (simétrica eje Y)",correct:true},{text: "Impar (simétrica origen)",correct:false},{text: "Ninguna",correct:false},{text: "Ambas",correct:false}], explanation: "Cos(-x) = Cos(x)." },
      { id_suffix: "v5", difficulty: 3, question: "Rango de y = 2Cos(x) + 1:", options: [{text: "[-1, 3]",correct:true},{text: "[-2, 2]",correct:false},{text: "[-3, 3]",correct:false},{text: "[0, 4]",correct:false}], explanation: "2(-1)+1=-1, 2(1)+1=3." },
      { id_suffix: "v6", difficulty: 3, question: "Periodo de y = Cos(4x):", options: [{text: "π/2",correct:true},{text: "4π",correct:false},{text: "2π",correct:false},{text: "π",correct:false}], explanation: "2π/4 = π/2." },
      { id_suffix: "v7", difficulty: 4, question: "Desplazamiento horizontal de y = Cos(x + π):", options: [{text: "Izquierda π",correct:true},{text: "Derecha π",correct:false},{text: "Arriba π",correct:false},{text: "Abajo π",correct:false}], explanation: "Suma en argumento = izquierda." },
      { id_suffix: "v8", difficulty: 4, question: "Cos(x + π) es igual a:", options: [{text: "-Cos(x)",correct:true},{text: "Cos(x)",correct:false},{text: "Sen(x)",correct:false},{text: "-Sen(x)",correct:false}], explanation: "Identidad." },
      { id_suffix: "v9", difficulty: 5, question: "Gráfica que empieza en (0, 0) y sube:", options: [{text: "Seno",correct:true},{text: "Coseno",correct:false},{text: "-Seno",correct:false},{text: "-Coseno",correct:false}], explanation: "Coseno empieza en (0,1)." },
      { id_suffix: "v10", difficulty: 5, question: "Ecuación de onda y = A*Cos(wt). 'w' representa:", options: [{text: "Frecuencia angular",correct:true},{text: "Periodo",correct:false},{text: "Amplitud",correct:false},{text: "Fase",correct:false}], explanation: "Concepto físico." }
    ]
  },

  // Bundle 5: Graph of Tangent
  {
    meta: {
      id: "CO-MAT-10-trig-graph-tan-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "grafica-tangente",
      periodo: 2,
      dba_id: "DBA-MAT-10-2",
      title: "Función Tangente"
    },
    base: { question: "Propiedades de Tan(x).", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Periodo de Tan(x):", options: [{text: "π (180°)",correct:true},{text: "2π (360°)",correct:false},{text: "π/2 (90°)",correct:false},{text: "4π",correct:false}], explanation: "Se repite cada π." },
      { id_suffix: "v2", difficulty: 1, question: "Dominio de Tan(x):", options: [{text: "Todos los reales excepto (2n+1)π/2",correct:true},{text: "Todos los reales",correct:false},{text: "[-1, 1]",correct:false},{text: "Reales positivos",correct:false}], explanation: "Asíntotas en 90°, 270°, etc." },
      { id_suffix: "v3", difficulty: 2, question: "Rango de Tan(x):", options: [{text: "Todos los reales",correct:true},{text: "[-1, 1]",correct:false},{text: "[0, ∞)",correct:false},{text: "Z",correct:false}], explanation: "Va de -inf a +inf." },
      { id_suffix: "v4", difficulty: 2, question: "Tan(45°) es:", options: [{text: "1",correct:true},{text: "0",correct:false},{text: "-1",correct:false},{text: "Infinito",correct:false}], explanation: "CO=CA." },
      { id_suffix: "v5", difficulty: 3, question: "Las asíntotas verticales ocurren donde:", options: [{text: "Cos(x) = 0",correct:true},{text: "Sen(x) = 0",correct:false},{text: "Tan(x) = 0",correct:false},{text: "Nunca",correct:false}], explanation: "Tan = Sen/Cos. Indefinido si Cos=0." },
      { id_suffix: "v6", difficulty: 3, question: "Tan(x) es función:", options: [{text: "Creciente en su periodo",correct:true},{text: "Decreciente",correct:false},{text: "Constante",correct:false},{text: "Parabolica",correct:false}], explanation: "Siempre sube entre asíntotas." },
      { id_suffix: "v7", difficulty: 4, question: "Tan(-x) es igual a:", options: [{text: "-Tan(x) (Impar)",correct:true},{text: "Tan(x) (Par)",correct:false},{text: "Cot(x)",correct:false},{text: "1",correct:false}], explanation: "Simetría impar." },
      { id_suffix: "v8", difficulty: 4, question: "Periodo de y = Tan(2x):", options: [{text: "π/2",correct:true},{text: "π",correct:false},{text: "2π",correct:false},{text: "π/4",correct:false}], explanation: "π/2." },
      { id_suffix: "v9", difficulty: 5, question: "Desplazar Tan(x) π/2 unidades resulta en gráfica similar a:", options: [{text: "-Cot(x)",correct:true},{text: "Cot(x)",correct:false},{text: "Sen(x)",correct:false},{text: "Sec(x)",correct:false}], explanation: "Tan(x - 90) = -Cot(x)." },
      { id_suffix: "v10", difficulty: 5, question: "¿Tan(x) tiene amplitud?", options: [{text: "No definida",correct:true},{text: "Sí, es 1",correct:false},{text: "Sí, es infinito",correct:false},{text: "Sí, es 0",correct:false}], explanation: "No se acota." }
    ]
  },

  // Bundle 6: Basic Identities
  {
    meta: {
      id: "CO-MAT-10-trig-ident-pyth-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "identidades-pitagoricas",
      periodo: 2,
      dba_id: "DBA-MAT-10-2",
      title: "Identidades Pitagóricas"
    },
    base: { question: "Simplifica la expresión.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Simplifica: 1 - Cos²(x)", options: [{text: "Sen²(x)",correct:true},{text: "Cos²(x)",correct:false},{text: "Tan²(x)",correct:false},{text: "1",correct:false}], explanation: "Identidad fundamental." },
      { id_suffix: "v2", difficulty: 1, question: "Simplifica: Sen²(x) + Cos²(x)", options: [{text: "1",correct:true},{text: "0",correct:false},{text: "2",correct:false},{text: "-1",correct:false}], explanation: "Identidad." },
      { id_suffix: "v3", difficulty: 2, question: "Simplifica: Tan(x) * Cos(x)", options: [{text: "Sen(x)",correct:true},{text: "Cos(x)",correct:false},{text: "1",correct:false},{text: "Sec(x)",correct:false}], explanation: "(Sen/Cos)*Cos = Sen." },
      { id_suffix: "v4", difficulty: 2, question: "(Sen(x)/Cos(x))² + 1", options: [{text: "Sec²(x)",correct:true},{text: "Csc²(x)",correct:false},{text: "Tan²(x)",correct:false},{text: "Cot²(x)",correct:false}], explanation: "Tan² + 1 = Sec²." },
      { id_suffix: "v5", difficulty: 3, question: "Simplifica: (1 - Sen(x))(1 + Sen(x))", options: [{text: "Cos²(x)",correct:true},{text: "Sen²(x)",correct:false},{text: "1",correct:false},{text: "0",correct:false}], explanation: "1 - Sen² = Cos²." },
      { id_suffix: "v6", difficulty: 3, question: "Simplifica: Cot(x) * Sen(x)", options: [{text: "Cos(x)",correct:true},{text: "Sen(x)",correct:false},{text: "1",correct:false},{text: "Tan(x)",correct:false}], explanation: "(Cos/Sen)*Sen = Cos." },
      { id_suffix: "v7", difficulty: 4, question: "1 + Cot²(x) es igual a:", options: [{text: "Csc²(x)",correct:true},{text: "Sec²(x)",correct:false},{text: "Tan²(x)",correct:false},{text: "1",correct:false}], explanation: "Identidad." },
      { id_suffix: "v8", difficulty: 4, question: "Simplifica: Cos(x) + Tan(x)Sen(x)", options: [{text: "Sec(x)",correct:true},{text: "Csc(x)",correct:false},{text: "Cos(x)",correct:false},{text: "1",correct:false}], explanation: "Cos + Sen²/Cos = (Cos²+Sen²)/Cos = 1/Cos = Sec." },
      { id_suffix: "v9", difficulty: 5, question: "Simplifica: (Sec(x)-1)(Sec(x)+1)", options: [{text: "Tan²(x)",correct:true},{text: "Cot²(x)",correct:false},{text: "1",correct:false},{text: "Sen²(x)",correct:false}], explanation: "Sec² - 1 = Tan²." },
      { id_suffix: "v10", difficulty: 5, question: "Simplifica: Sen⁴(x) - Cos⁴(x)", options: [{text: "Sen²(x) - Cos²(x)",correct:true},{text: "1",correct:false},{text: "0",correct:false},{text: "2Sen²(x)",correct:false}], explanation: "Diferencia cuadrados: (Sen²-Cos²)(Sen²+Cos²) = (Sen²-Cos²)(1)." }
    ]
  },

  // Bundle 7: Sum and Difference Formulas
  {
    meta: {
      id: "CO-MAT-10-trig-sumdiff-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "suma-diferencia",
      periodo: 2,
      dba_id: "DBA-MAT-10-2",
      title: "Fórmulas de Suma y Resta"
    },
    base: { question: "Aplica fórmulas de suma.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Sen(A+B) es:", options: [{text: "SenACosB + CosASenB",correct:true},{text: "SenA + SenB",correct:false},{text: "SenACosB - CosASenB",correct:false},{text: "CosACosB - SenASenB",correct:false}], explanation: "Fórmula suma Seno." },
      { id_suffix: "v2", difficulty: 1, question: "Cos(A-B) es:", options: [{text: "CosACosB + SenASenB",correct:true},{text: "CosACosB - SenASenB",correct:false},{text: "CosA - CosB",correct:false},{text: "SenASenB - CosACosB",correct:false}], explanation: "Fórmula resta Coseno (signo opuesto)." },
      { id_suffix: "v3", difficulty: 2, question: "Calcula Sen(75°) usando 45°+30°.", options: [{text: "(√6 + √2)/4",correct:true},{text: "(√6 - √2)/4",correct:false},{text: "1",correct:false},{text: "0.96",correct:false}], explanation: "Sen45Cos30 + Cos45Sen30." },
      { id_suffix: "v4", difficulty: 2, question: "Calcula Cos(15°) usando 45°-30°.", options: [{text: "(√6 + √2)/4",correct:true},{text: "(√6 - √2)/4",correct:false},{text: "0.25",correct:false},{text: "0.5",correct:false}], explanation: "Cos45Cos30 + Sen45Sen30." },
      { id_suffix: "v5", difficulty: 3, question: "Simplifica: Sen(x + 90°).", options: [{text: "Cos(x)",correct:true},{text: "-Cos(x)",correct:false},{text: "Sen(x)",correct:false},{text: "-Sen(x)",correct:false}], explanation: "Senx(0) + Cosx(1) = Cosx." },
      { id_suffix: "v6", difficulty: 3, question: "Simplifica: Cos(x - 180°).", options: [{text: "-Cos(x)",correct:true},{text: "Cos(x)",correct:false},{text: "Sen(x)",correct:false},{text: "-Sen(x)",correct:false}], explanation: "Cosx(-1) + Senx(0) = -Cosx." },
      { id_suffix: "v7", difficulty: 4, question: "Tan(A+B) es:", options: [{text: "(TanA + TanB)/(1 - TanATanB)",correct:true},{text: "TanA + TanB",correct:false},{text: "(TanA - TanB)/(1 + TanATanB)",correct:false},{text: "1",correct:false}], explanation: "Fórmula tangente." },
      { id_suffix: "v8", difficulty: 4, question: "Si TanA=1 y TanB=1, Tan(A+B) es:", options: [{text: "Indefinido",correct:true},{text: "2",correct:false},{text: "0",correct:false},{text: "1",correct:false}], explanation: "(1+1)/(1-1) = 2/0 Error (Tan90)." },
      { id_suffix: "v9", difficulty: 5, question: "Demuestra que Sen(2x) = 2Sen(x)Cos(x) usando suma.", options: [{text: "Usando Sen(x+x)",correct:true},{text: "Usando Cos(x+x)",correct:false},{text: "No se puede",correct:false},{text: "Es axioma",correct:false}], explanation: "SenxCosx + CosxSenx = 2SenxCosx." },
      { id_suffix: "v10", difficulty: 5, question: "Cos(2x) equivale a:", options: [{text: "Cos²x - Sen²x",correct:true},{text: "2Cosx",correct:false},{text: "1",correct:false},{text: "Sen²x - Cos²x",correct:false}], explanation: "Usando Cos(x+x)." }
    ]
  },

  // Bundle 8: Double Angle Formulas
  {
    meta: {
      id: "CO-MAT-10-trig-double-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "angulo-doble",
      periodo: 2,
      dba_id: "DBA-MAT-10-2",
      title: "Ángulo Doble"
    },
    base: { question: "Fórmulas de ángulo doble.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Sen(2x) = ?", options: [{text: "2Sen(x)Cos(x)",correct:true},{text: "2Sen(x)",correct:false},{text: "Sen²(x)",correct:false},{text: "Cos(2x)",correct:false}], explanation: "Identidad." },
      { id_suffix: "v2", difficulty: 1, question: "Cos(2x) = ?", options: [{text: "Cos²(x) - Sen²(x)",correct:true},{text: "2Cos(x)",correct:false},{text: "1",correct:false},{text: "Sen²(x) + Cos²(x)",correct:false}], explanation: "Identidad." },
      { id_suffix: "v3", difficulty: 2, question: "Otra forma de Cos(2x) usando solo Seno:", options: [{text: "1 - 2Sen²(x)",correct:true},{text: "2Sen²(x) - 1",correct:false},{text: "1 - Sen(x)",correct:false},{text: "Sen²(x)",correct:false}], explanation: "Sustituyendo Cos²=1-Sen²." },
      { id_suffix: "v4", difficulty: 2, question: "Otra forma de Cos(2x) usando solo Coseno:", options: [{text: "2Cos²(x) - 1",correct:true},{text: "1 - 2Cos²(x)",correct:false},{text: "Cos²(x)",correct:false},{text: "2Cos(x)",correct:false}], explanation: "Sustituyendo Sen²=1-Cos²." },
      { id_suffix: "v5", difficulty: 3, question: "Si Sen(x) = 3/5 (agudo), halla Sen(2x).", options: [{text: "24/25",correct:true},{text: "6/5",correct:false},{text: "12/25",correct:false},{text: "7/25",correct:false}], explanation: "Cos=4/5. 2(3/5)(4/5) = 24/25." },
      { id_suffix: "v6", difficulty: 3, question: "Si Cos(x) = 1/2, halla Cos(2x).", options: [{text: "-1/2",correct:true},{text: "1",correct:false},{text: "1/2",correct:false},{text: "0",correct:false}], explanation: "2(1/4)-1 = 0.5-1 = -0.5." },
      { id_suffix: "v7", difficulty: 4, question: "Tan(2x) = ?", options: [{text: "2Tan(x) / (1 - Tan²(x))",correct:true},{text: "2Tan(x)",correct:false},{text: "Tan²(x)",correct:false},{text: "1",correct:false}], explanation: "Fórmula." },
      { id_suffix: "v8", difficulty: 4, question: "Simplifica: (Sen(2x)) / (2Sen(x))", options: [{text: "Cos(x)",correct:true},{text: "Sen(x)",correct:false},{text: "1",correct:false},{text: "Tan(x)",correct:false}], explanation: "2SenCos / 2Sen = Cos." },
      { id_suffix: "v9", difficulty: 5, question: "Cos(2x) en términos de Tan(x):", options: [{text: "(1-Tan²x)/(1+Tan²x)",correct:true},{text: "2Tanx",correct:false},{text: "1",correct:false},{text: "Tanx",correct:false}], explanation: "Sustitución universal." },
      { id_suffix: "v10", difficulty: 5, question: "Sen(2x) en términos de Tan(x):", options: [{text: "2Tanx/(1+Tan²x)",correct:true},{text: "Tanx",correct:false},{text: "1-Tanx",correct:false},{text: "2Tanx",correct:false}], explanation: "Sustitución universal." }
    ]
  },

  // Bundle 9: Solving Basic Trig Equations
  {
    meta: {
      id: "CO-MAT-10-trig-eq-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "ecuaciones-trig",
      periodo: 2,
      dba_id: "DBA-MAT-10-2",
      title: "Ecuaciones Trigonométricas"
    },
    base: { question: "Halla x en [0, 2π].", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Sen(x) = 0. ¿Soluciones?", options: [{text: "0, π, 2π",correct:true},{text: "π/2, 3π/2",correct:false},{text: "π/4",correct:false},{text: "Ninguna",correct:false}], explanation: "Ejes X." },
      { id_suffix: "v2", difficulty: 1, question: "Cos(x) = 1. ¿Soluciones?", options: [{text: "0, 2π",correct:true},{text: "π",correct:false},{text: "π/2",correct:false},{text: "3π/2",correct:false}], explanation: "Inicio ciclo." },
      { id_suffix: "v3", difficulty: 2, question: "2Sen(x) = 1. Encontrar x.", options: [{text: "π/6, 5π/6",correct:true},{text: "π/3, 2π/3",correct:false},{text: "π/4",correct:false},{text: "π/2",correct:false}], explanation: "Sen(x)=0.5 -> 30° y 150°." },
      { id_suffix: "v4", difficulty: 2, question: "2Cos(x) - √3 = 0. Encontrar x.", options: [{text: "π/6, 11π/6",correct:true},{text: "π/3, 5π/3",correct:false},{text: "π/4",correct:false},{text: "π/2",correct:false}], explanation: "Cos(x)=√3/2 -> 30° y 330°." },
      { id_suffix: "v5", difficulty: 3, question: "Tan(x) = 1. Soluciones.", options: [{text: "π/4, 5π/4",correct:true},{text: "π/4, 3π/4",correct:false},{text: "π/4, 7π/4",correct:false},{text: "π/2",correct:false}], explanation: "Cuadrante 1 y 3." },
      { id_suffix: "v6", difficulty: 3, question: "Sen²(x) = 1. Soluciones.", options: [{text: "π/2, 3π/2",correct:true},{text: "0, π",correct:false},{text: "π/4",correct:false},{text: "2π",correct:false}], explanation: "Sen(x) = ±1." },
      { id_suffix: "v7", difficulty: 4, question: "2Cos²(x) - 1 = 0.", options: [{text: "π/4, 3π/4, 5π/4, 7π/4",correct:true},{text: "0, π",correct:false},{text: "π/2",correct:false},{text: "π/6",correct:false}], explanation: "Cos²=1/2 -> Cos=±√2/2." },
      { id_suffix: "v8", difficulty: 4, question: "Sen(2x) = 0. Soluciones en [0, π].", options: [{text: "0, π/2, π",correct:true},{text: "0, π",correct:false},{text: "π/4",correct:false},{text: "Ninguna",correct:false}], explanation: "2x = 0, π, 2π -> x = 0, π/2, π." },
      { id_suffix: "v9", difficulty: 5, question: "Sen(x) = Cos(x). Soluciones.", options: [{text: "π/4, 5π/4",correct:true},{text: "π/4, 3π/4",correct:false},{text: "0, π",correct:false},{text: "π/2",correct:false}], explanation: "Tan(x)=1." },
      { id_suffix: "v10", difficulty: 5, question: "Sen(x) + 2 = 0. Soluciones.", options: [{text: "Ninguna",correct:true},{text: "0",correct:false},{text: "π",correct:false},{text: "2π",correct:false}], explanation: "Sen(x) no puede ser -2." }
    ]
  },

  // Bundle 10: Taller Review P2
    {
    meta: {
      id: "CO-MAT-10-taller-p2-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "review",
      periodo: 2,
      dba_id: "DBA-MAT-10-2",
      title: "Taller Repaso P2"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Ley de Senos relaciona:", options: [{text: "Lados y ángulos opuestos",correct:true},{text: "Solo hipotenusas",correct:false},{text: "Área",correct:false},{text: "Perímetro",correct:false}], explanation: "Concepto." },
      { id_suffix: "v2", difficulty: 1, question: "Ley de Cosenos generaliza:", options: [{text: "Pitagoras",correct:true},{text: "Tales",correct:false},{text: "Newton",correct:false},{text: "Euclides",correct:false}], explanation: "Concepto." },
      { id_suffix: "v3", difficulty: 2, question: "Periodo de y = Sen(x):", options: [{text: "2π",correct:true},{text: "π",correct:false},{text: "4π",correct:false},{text: "1",correct:false}], explanation: "Ciclo." },
      { id_suffix: "v4", difficulty: 2, question: "Amplitud de y = -3Cos(x):", options: [{text: "3",correct:true},{text: "-3",correct:false},{text: "0",correct:false},{text: "6",correct:false}], explanation: "Valor absoluto." },
      { id_suffix: "v5", difficulty: 3, question: "Identidad: 1 + Tan²x =", options: [{text: "Sec²x",correct:true},{text: "Csc²x",correct:false},{text: "Cot²x",correct:false},{text: "1",correct:false}], explanation: "Pitagórica." },
      { id_suffix: "v6", difficulty: 3, question: "Sen(2x) =", options: [{text: "2SenxCosx",correct:true},{text: "Cos2x",correct:false},{text: "Tan2x",correct:false},{text: "Sen²x",correct:false}], explanation: "Doble ángulo." },
      { id_suffix: "v7", difficulty: 4, question: "Solución de Tan(x)=0:", options: [{text: "nπ",correct:true},{text: "nπ/2",correct:false},{text: "0",correct:false},{text: "1",correct:false}], explanation: "Cortes en X." },
      { id_suffix: "v8", difficulty: 4, question: "Rango de y = 2Sen(x):", options: [{text: "[-2, 2]",correct:true},{text: "[-1, 1]",correct:false},{text: "[0, 2]",correct:false},{text: "R",correct:false}], explanation: "Escalado." },
      { id_suffix: "v9", difficulty: 5, question: "Fase de y = Cos(x - π):", options: [{text: "Desplazamiento a la derecha π",correct:true},{text: "Izquierda π",correct:false},{text: "Arriba",correct:false},{text: "Abajo",correct:false}], explanation: "Shift." },
      { id_suffix: "v10", difficulty: 5, question: "¿La función Seno es inyectiva en R?", options: [{text: "No",correct:true},{text: "Sí",correct:false},{text: "A veces",correct:false},{text: "Siempre",correct:false}], explanation: "Es periódica, repite valores." }
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
    console.log(`✅ Created Period 2 Bundle v3.0: ${fullPath}`);
});
