
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
  // Grade 11 - Math - Period 2 - BUNDLE 1 (Ángulos)
  {
    meta: {
      id: "CO-MAT-11-angulos-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "trigonometria",
      periodo: 2,
      dba_id: "DBA-MAT-11-4",
      title: "Medición de Ángulos"
    },
    base: { question: "¿Cuántos grados hay en un círculo?", answer: "360°", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Una vuelta completa equivale a:", options: [{text:"360°",correct:true},{text:"180°",correct:false},{text:"90°",correct:false},{text:"100°",correct:false}], explanation: "Definición estándar de grados sexagesimales." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "¿Cuántos grados tiene un ángulo recto?", options: [{text:"90°",correct:true},{text:"45°",correct:false},{text:"180°",correct:false},{text:"60°",correct:false}], explanation: "Un cuarto de vuelta." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Convierte 180° a radianes:", options: [{text:"π rad",correct:true},{text:"2π rad",correct:false},{text:"π/2 rad",correct:false},{text:"π/4 rad",correct:false}], explanation: "360° = 2π, entonces 180° = π." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Un radián es aproximadamente:", options: [{text:"57.3°",correct:true},{text:"90°",correct:false},{text:"180°",correct:false},{text:"30°",correct:false}], explanation: "180/π ≈ 57.29." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Ángulo coterminal de 400°:", options: [{text:"40°",correct:true},{text:"400°",correct:false},{text:"140°",correct:false},{text:"-40°",correct:false}], explanation: "400 - 360 = 40." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Ángulo suplementario de 60°:", options: [{text:"120°",correct:true},{text:"30°",correct:false},{text:"90°",correct:false},{text:"300°",correct:false}], explanation: "Suman 180°. 180 - 60 = 120." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Convierte 5π/6 a grados:", options: [{text:"150°",correct:true},{text:"120°",correct:false},{text:"210°",correct:false},{text:"135°",correct:false}], explanation: "5 * 180 / 6 = 5 * 30 = 150." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Longitud de arco en círculo r=10cm y ángulo 2 rad:", options: [{text:"20 cm",correct:true},{text:"10 cm",correct:false},{text:"5 cm",correct:false},{text:"10π cm",correct:false}], explanation: "S = r * θ (en rad). S = 10 * 2 = 20." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Área de sector circular r=4, ángulo=π/4:", options: [{text:"2π",correct:true},{text:"4π",correct:false},{text:"π",correct:false},{text:"8π",correct:false}], explanation: "A = (1/2)r²θ = 0.5 * 16 * π/4 = 2π." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Velocidad angular de segundero reloj:", options: [{text:"π/30 rad/s",correct:true},{text:"2π rad/s",correct:false},{text:"π/60 rad/s",correct:false},{text:"60 rad/s",correct:false}], explanation: "2π / 60s = π/30." }
    ]
  },

  // Grade 11 - Math - Period 2 - BUNDLE 2 (Razones Trigonométricas)
  {
    meta: {
      id: "CO-MAT-11-razones-trigo-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "trigonometria",
      periodo: 2,
      dba_id: "DBA-MAT-11-4",
      title: "Triángulos Rectángulos y Razones"
    },
    base: { question: "Seno es Opuesto sobre Hipotenusa.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "En un triángulo rectángulo, el lado más largo es:", options: [{text:"Hipotenusa",correct:true},{text:"Cateto opuesto",correct:false},{text:"Cateto adyacente",correct:false},{text:"Altura",correct:false}], explanation: "Siempre opuesto al ángulo recto." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Razón Co/H corresponde a:", options: [{text:"Seno",correct:true},{text:"Coseno",correct:false},{text:"Tangente",correct:false},{text:"Secante",correct:false}], explanation: "Definición básica." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Tan(45°) es:", options: [{text:"1",correct:true},{text:"0",correct:false},{text:"0.5",correct:false},{text:"infinito",correct:false}], explanation: "Catetos iguales." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Si sen(x) = 3/5, cosec(x) es:", options: [{text:"5/3",correct:true},{text:"3/5",correct:false},{text:"4/5",correct:false},{text:"5/4",correct:false}], explanation: "Cosecante es recíproca del seno." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Si cos(x) = 1/2, x puede ser (agudo):", options: [{text:"60°",correct:true},{text:"30°",correct:false},{text:"45°",correct:false},{text:"90°",correct:false}], explanation: "Ángulo notable." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Triángulo 3-4-5. Seno del ángulo opuesto a 3:", options: [{text:"3/5",correct:true},{text:"4/5",correct:false},{text:"3/4",correct:false},{text:"5/3",correct:false}], explanation: "Opuesto/Hipotenusa." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Si tan(x) = 1, valor de sin(x) (1er cuad):", options: [{text:"√2/2",correct:true},{text:"1/2",correct:false},{text:"1",correct:false},{text:"√3/2",correct:false}], explanation: "Catetos 1,1 -> Hipotenusa √2. 1/√2 al racionalizar." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Altura torre, sombra 10m, ángulo elevación 60°:", options: [{text:"10√3",correct:true},{text:"10",correct:false},{text:"20",correct:false},{text:"5√3",correct:false}], explanation: "h/10 = tan(60) = √3." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Identidad: 1 + tan²x equivale a:", options: [{text:"sec²x",correct:true},{text:"csc²x",correct:false},{text:"sin²x",correct:false},{text:"cot²x",correct:false}], explanation: "Identidad pitagórica." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Simplifica sin(x)/cos(x) * csc(x):", options: [{text:"sec(x)",correct:true},{text:"tan(x)",correct:false},{text:"1",correct:false},{text:"sin(x)",correct:false}], explanation: "(sin/cos)*(1/sin) = 1/cos = sec." }
    ]
  },

  // Bundle 3: Ley de Senos y Cosenos
  {
    meta: {
      id: "CO-MAT-11-leyes-trigo-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "trigonometria",
      periodo: 2,
      dba_id: "DBA-MAT-11-4",
      title: "Ley de Senos y Cosenos"
    },
    base: { question: "La ley del coseno generaliza el teorema de Pitágoras.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "¿Para qué triángulos sirven estas leyes?", options: [{text:"Cualquier triángulo (oblicuángulos)",correct:true},{text:"Solo rectángulos",correct:false},{text:"Solo equiláteros",correct:false},{text:"Solo isósceles",correct:false}], explanation: "Su poder es resolver triángulos no rectángulos." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Fórmula a/sinA = b/sinB es la ley de:", options: [{text:"Senos",correct:true},{text:"Cosenos",correct:false},{text:"Tangentes",correct:false},{text:"Newton",correct:false}], explanation: "Relación lado-seno opuesto." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Si en Ley Cosenos C=90°, el término -2ab cosC se vuelve:", options: [{text:"0",correct:true},{text:"1",correct:false},{text:"-2ab",correct:false},{text:"ab",correct:false}], explanation: "Cos(90) = 0." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Triángulo equilátero, lados 10. Ángulos:", options: [{text:"60° todos",correct:true},{text:"90°",correct:false},{text:"45°",correct:false},{text:"30°",correct:false}], explanation: "Propiedad básica." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Resolver triángulo caso ALA (Ángulo-Lado-Ángulo) usa:", options: [{text:"Ley de Senos",correct:true},{text:"Ley de Cosenos",correct:false},{text:"Pitágoras",correct:false},{text:"No se puede",correct:false}], explanation: "Conoces parejas completas." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Caso LLL (Lado-Lado-Lado) usa primero:", options: [{text:"Ley de Cosenos",correct:true},{text:"Ley de Senos",correct:false},{text:"Tangente",correct:false},{text:"Suma 180",correct:false}], explanation: "Para hallar un ángulo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Lados 3, 4 y ángulo entre ellos 60°. Lado opuesto:", options: [{text:"√13",correct:true},{text:"5",correct:false},{text:"√12",correct:false},{text:"3.5",correct:false}], explanation: "c² = 9+16 - 2(3)(4)(0.5) = 25 - 12 = 13." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "En triángulo, sinA=0.5, a=10, sinB=1. b es:", options: [{text:"20",correct:true},{text:"5",correct:false},{text:"10",correct:false},{text:"15",correct:false}], explanation: "10/0.5 = b/1 => 20 = b." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Caso ambiguo Ley Senos. a < h (altura):", options: [{text:"0 triángulos posibles",correct:true},{text:"1 triángulo",correct:false},{text:"2 triángulos",correct:false},{text:"infinitos",correct:false}], explanation: "El lado no alcanza a tocar la base." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Herón para área lados 3,4,5:", options: [{text:"6",correct:true},{text:"12",correct:false},{text:"10",correct:false},{text:"5",correct:false}], explanation: "s=6. √(6*3*2*1) = √36 = 6." }
    ]
  },

  // Bundle 4: Gráficas Trigonométricas
  {
    meta: {
      id: "CO-MAT-11-graficas-trigo-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "trigonometria",
      periodo: 2,
      dba_id: "DBA-MAT-11-4",
      title: "Gráficas de Funciones Trigonométricas"
    },
    base: { question: "La función seno es periódica.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Periodo estándar de sin(x):", options: [{text:"2π",correct:true},{text:"π",correct:false},{text:"4π",correct:false},{text:"90°",correct:false}], explanation: "Repite cada vuelta completa." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Amplitud máxima de y = sin(x):", options: [{text:"1",correct:true},{text:"2",correct:false},{text:"0",correct:false},{text:"infinito",correct:false}], explanation: "Oscila entre -1 y 1." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Gráfica que pasa por (0,1):", options: [{text:"y = cos(x)",correct:true},{text:"y = sin(x)",correct:false},{text:"y = tan(x)",correct:false},{text:"y = x",correct:false}], explanation: "Cos(0)=1." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Función con asíntotas verticales:", options: [{text:"Tangente",correct:true},{text:"Seno",correct:false},{text:"Coseno",correct:false},{text:"Lineal",correct:false}], explanation: "En π/2, 3π/2..." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Amplitud de y = 3cos(x):", options: [{text:"3",correct:true},{text:"1",correct:false},{text:"6",correct:false},{text:"2",correct:false}], explanation: "El coeficiente multiplica la salida." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Periodo de y = sin(2x):", options: [{text:"π",correct:true},{text:"2π",correct:false},{text:"4π",correct:false},{text:"π/2",correct:false}], explanation: "2π/B = 2π/2 = π." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Desfase de y = sin(x - π/2):", options: [{text:"π/2 a la derecha",correct:true},{text:"π/2 a la izquierda",correct:false},{text:"Arriba",correct:false},{text:"Abajo",correct:false}], explanation: "Signo menos dentro del paréntesis mueve a derecha." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Rango de y = -2sin(x) + 1:", options: [{text:"[-1, 3]",correct:true},{text:"[-2, 2]",correct:false},{text:"[-3, 1]",correct:false},{text:"Reales",correct:false}], explanation: "Amplitud 2 (rango ancho 4), sube 1. De -2+1 a 2+1." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Función par:", options: [{text:"Coseno",correct:true},{text:"Seno",correct:false},{text:"Tangente",correct:false},{text:"Cosecante",correct:false}], explanation: "Simétrica respecto eje Y. cos(-x)=cos(x)." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Ecuación de la gráfica: amplitud 2, periodo π, pasa origen:", options: [{text:"y = 2sin(2x)",correct:true},{text:"y = 2sin(x)",correct:false},{text:"y = sin(2x)",correct:false},{text:"y = 2cos(2x)",correct:false}], explanation: "Seno pasa por origen." }
    ]
  },

  // Bundle 5: Identidades Trigonométricas
  {
    meta: {
      id: "CO-MAT-11-identidades-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "trigonometria",
      periodo: 2,
      dba_id: "DBA-MAT-11-4",
      title: "Identidades y Ecuaciones"
    },
    base: { question: "sin²x + cos²x = 1 es fundamental.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "tan(x) equivale a:", options: [{text:"sin(x)/cos(x)",correct:true},{text:"cos(x)/sin(x)",correct:false},{text:"1/sin(x)",correct:false},{text:"1/cos(x)",correct:false}], explanation: "Definición cociente." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "1/cos(x) es:", options: [{text:"sec(x)",correct:true},{text:"csc(x)",correct:false},{text:"cot(x)",correct:false},{text:"tan(x)",correct:false}], explanation: "Secante." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "sin(2x) identidad:", options: [{text:"2sin(x)cos(x)",correct:true},{text:"sin(x)+cos(x)",correct:false},{text:"2sin(x)",correct:false},{text:"cos²x-sin²x",correct:false}], explanation: "Ángulo doble." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "cos(2x) identidad:", options: [{text:"cos²x - sin²x",correct:true},{text:"2sin(x)",correct:false},{text:"1",correct:false},{text:"2cos(x)",correct:false}], explanation: "Ángulo doble coseno." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Simplifica (1-sin²x)/cos x:", options: [{text:"cos x",correct:true},{text:"sin x",correct:false},{text:"sec x",correct:false},{text:"1",correct:false}], explanation: "cos²x / cos x = cos x." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Solución de sin(x) = 1 en [0, 2π):", options: [{text:"π/2",correct:true},{text:"π",correct:false},{text:"0",correct:false},{text:"3π/2",correct:false}], explanation: "Solo en 90 grados." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Calcula sin(15°) usando resta:", options: [{text:"(√6 - √2)/4",correct:true},{text:"(√6 + √2)/4",correct:false},{text:"1/4",correct:false},{text:"√2/2",correct:false}], explanation: "sin(45-30)." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Resuelve 2cos(x) - 1 = 0 en [0, 2π):", options: [{text:"π/3, 5π/3",correct:true},{text:"π/6, 11π/6",correct:false},{text:"π/3",correct:false},{text:"2π/3, 4π/3",correct:false}], explanation: "cos(x)=1/2. Cuadrantes I y IV." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Soluciones de tan²x - 1 = 0:", options: [{text:"π/4, 3π/4, 5π/4, 7π/4",correct:true},{text:"π/4",correct:false},{text:"π/2",correct:false},{text:"0, π",correct:false}], explanation: "tan x = ±1." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Valor exacto cos(75°):", options: [{text:"(√6 - √2)/4",correct:false},{text:"(√6 + √2)/4",correct:true},{text:"√3/2",correct:false},{text:"1/2",correct:false}], explanation: "cos(45+30) = cos45cos30 - sin45sin30." }
    ]
  },

  // Bundle 6: Círculo Unitario
  {
    meta: {
      id: "CO-MAT-11-circulo-unitario-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "trigonometria",
      periodo: 2,
      dba_id: "DBA-MAT-11-4",
      title: "El Círculo Unitario"
    },
    base: { question: "Radio del círculo unitario es 1.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Ecuación círculo unitario:", options: [{text:"x² + y² = 1",correct:true},{text:"x + y = 1",correct:false},{text:"x² + y² = 2",correct:false},{text:"y = x²",correct:false}], explanation: "Centro (0,0) radio 1." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Coordenada x en el círculo corresponde a:", options: [{text:"cos(θ)",correct:true},{text:"sin(θ)",correct:false},{text:"tan(θ)",correct:false},{text:"1",correct:false}], explanation: "Definición." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Punto terminal de π/2:", options: [{text:"(0, 1)",correct:true},{text:"(1, 0)",correct:false},{text:"(-1, 0)",correct:false},{text:"(0, -1)",correct:false}], explanation: "90 grados, arriba." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Signo de sen(x) en III cuadrante:", options: [{text:"Negativo",correct:true},{text:"Positivo",correct:false},{text:"Cero",correct:false},{text:"Indefinido",correct:false}], explanation: "Y es negativo abajo." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Punto para π/4:", options: [{text:"(√2/2, √2/2)",correct:true},{text:"(1/2, 1/2)",correct:false},{text:"(1, 1)",correct:false},{text:"(√3/2, 1/2)",correct:false}], explanation: "45 grados." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Si tan(x) < 0 y cos(x) > 0, cuadrante:", options: [{text:"IV",correct:true},{text:"II",correct:false},{text:"III",correct:false},{text:"I",correct:false}], explanation: "Coseno positivo (derecha), tangente negativa (uno negativo) -> Y negativo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Valor de sec(π):", options: [{text:"-1",correct:true},{text:"1",correct:false},{text:"0",correct:false},{text:"Indefinido",correct:false}], explanation: "1/cos(π) = 1/-1 = -1." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Terminal (x, -0.6) en IV cuad. Hallar x:", options: [{text:"0.8",correct:true},{text:"0.4",correct:false},{text:"-0.8",correct:false},{text:"0.6",correct:false}], explanation: "x² + (-0.6)² = 1. x² = 0.64. Positivo en IV." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Periodo de tan(x):", options: [{text:"π",correct:true},{text:"2π",correct:false},{text:"π/2",correct:false},{text:"4π",correct:false}], explanation: "Tangente repite cada 180." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Coordenadas para 11π/6:", options: [{text:"(√3/2, -1/2)",correct:true},{text:"(-√3/2, -1/2)",correct:false},{text:"(1/2, -√3/2)",correct:false},{text:"(√3/2, 1/2)",correct:false}], explanation: "330 grados. Ref 30 en IV." }
    ]
  },

  // Bundle 7: Geometría Analítica - La Recta
  {
    meta: {
      id: "CO-MAT-11-ga-recta-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "conicas",
      periodo: 2,
      dba_id: "DBA-MAT-11-5",
      title: "La Recta en el Plano"
    },
    base: { question: "Pendiente es la inclinación.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Pendiente de recta horizontal:", options: [{text:"0",correct:true},{text:"1",correct:false},{text:"-1",correct:false},{text:"indefinida",correct:false}], explanation: "No sube ni baja." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Pendiente vertical:", options: [{text:"Indefinida",correct:true},{text:"0",correct:false},{text:"infinito",correct:false},{text:"1",correct:false}], explanation: "División por cero." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Distancia entre (0,0) y (3,4):", options: [{text:"5",correct:true},{text:"7",correct:false},{text:"25",correct:false},{text:"1",correct:false}], explanation: "Pitágoras 3-4-5." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Punto medio de (2,2) y (4,4):", options: [{text:"(3,3)",correct:true},{text:"(2,2)",correct:false},{text:"(6,6)",correct:false},{text:"(1,1)",correct:false}], explanation: "Promedio de coords." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Pendiente de 2x - y + 3 = 0:", options: [{text:"2",correct:true},{text:"-2",correct:false},{text:"1/2",correct:false},{text:"3",correct:false}], explanation: "y = 2x + 3." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Rectas paralelas tienen:", options: [{text:"Misma pendiente",correct:true},{text:"Producto -1",correct:false},{text:"Mismo intercepto",correct:false},{text:"Nada igual",correct:false}], explanation: "Nunca se tocan." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Ángulo de inclinación m=1:", options: [{text:"45°",correct:true},{text:"30°",correct:false},{text:"60°",correct:false},{text:"90°",correct:false}], explanation: "tan(θ)=1." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Distancia de punto (1,1) a recta x+y-4=0:", options: [{text:"√2",correct:true},{text:"2",correct:false},{text:"1",correct:false},{text:"0",correct:false}], explanation: "|1+1-4|/√2 = 2/√2 = √2." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Recta mediatriz de segmento (0,0) a (4,0):", options: [{text:"x = 2",correct:true},{text:"x = 4",correct:false},{text:"y = 2",correct:false},{text:"y = x",correct:false}], explanation: "Vertical que pasa por el medio." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Área triángulo vértices (0,0), (4,0), (0,3):", options: [{text:"6",correct:true},{text:"12",correct:false},{text:"7",correct:false},{text:"5",correct:false}], explanation: "Base 4, altura 3. (4*3)/2." }
    ]
  },

  // Bundle 8: La Circunferencia
  {
    meta: {
      id: "CO-MAT-11-conicas-circulo-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "conicas",
      periodo: 2,
      dba_id: "DBA-MAT-11-5",
      title: "Secciones Cónicas: Circunferencia"
    },
    base: { question: "Lugar geométrico equidistante de un centro.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Ecuación canónica radio r centro (h,k):", options: [{text:"(x-h)²+(y-k)²=r²",correct:true},{text:"x²+y²=r",correct:false},{text:"y=mx+b",correct:false},{text:"y=x²",correct:false}], explanation: "Fórmula estándar." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Centro de (x-2)²+(y+1)²=9:", options: [{text:"(2, -1)",correct:true},{text:"(-2, 1)",correct:false},{text:"(2, 1)",correct:false},{text:"(0, 0)",correct:false}], explanation: "Signos opuestos." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Radio de x²+y²=25:", options: [{text:"5",correct:true},{text:"25",correct:false},{text:"10",correct:false},{text:"2.5",correct:false}], explanation: "Raíz de 25." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Punto (3,4) está en x²+y²=25:", options: [{text:"Sí",correct:true},{text:"No, dentro",correct:false},{text:"No, fuera",correct:false},{text:"No se sabe",correct:false}], explanation: "9+16=25." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Convertir x²+y²-4x=0 a canónica:", options: [{text:"(x-2)²+y²=4",correct:true},{text:"(x-2)²+y²=0",correct:false},{text:"x²+y²=4",correct:false},{text:"x²=4",correct:false}], explanation: "Completar cuadrados." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Longitud circunferencia r=3:", options: [{text:"6π",correct:true},{text:"9π",correct:false},{text:"3π",correct:false},{text:"12",correct:false}], explanation: "2πr." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Tangente a x²+y²=1 en (1,0):", options: [{text:"x = 1",correct:true},{text:"y = 1",correct:false},{text:"y = 0",correct:false},{text:"x = -1",correct:false}], explanation: "Vertical por el extremo derecho." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Posición relativa de (5,5) y x²+y²=1:", options: [{text:"Exterior",correct:true},{text:"Interior",correct:false},{text:"Borde",correct:false},{text:"Centro",correct:false}], explanation: "25+25 > 1." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Ecuación circunferencia pasa por tres puntos (0,0), (2,0), (0,2):", options: [{text:"(x-1)²+(y-1)²=2",correct:true},{text:"x²+y²=2",correct:false},{text:"x²+y²=4",correct:false},{text:"(x-1)²+(y-1)²=1",correct:false}], explanation: "Centro (1,1) radio √2." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Intersección línea y=x con x²+y²=2:", options: [{text:"(1,1) y (-1,-1)",correct:true},{text:"(1,1)",correct:false},{text:"(0,0)",correct:false},{text:"(√2,√2)",correct:false}], explanation: "2x²=2 -> x²=1." }
    ]
  },

  // Bundle 9: La Parábola
  {
    meta: {
      id: "CO-MAT-11-conicas-parabola-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "conicas",
      periodo: 2,
      dba_id: "DBA-MAT-11-5",
      title: "Secciones Cónicas: Parábola"
    },
    base: { question: "Puntos equidistantes de foco y directriz.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Una antena parabólica usa la propiedad de:", options: [{text:"Reflexión al foco",correct:true},{text:"Refracción",correct:false},{text:"Dispersión",correct:false},{text:"Linealidad",correct:false}], explanation: "Concentra señales." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Ecuación y=x² abre hacia:", options: [{text:"Arriba",correct:true},{text:"Abajo",correct:false},{text:"Derecha",correct:false},{text:"Izquierda",correct:false}], explanation: "Positiva estándar." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Foco de y²=4px está en eje:", options: [{text:"X",correct:true},{text:"Y",correct:false},{text:"Z",correct:false},{text:"Ninguno",correct:false}], explanation: "Horizontal." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Si p (distancia focal) es negativa en x²=4py, abre:", options: [{text:"Abajo",correct:true},{text:"Arriba",correct:false},{text:"Derecha",correct:false},{text:"Izquierda",correct:false}], explanation: "Cuadrática negativa." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Vértice de (y-2)² = 8(x+1):", options: [{text:"(-1, 2)",correct:true},{text:"(1, -2)",correct:false},{text:"(2, -1)",correct:false},{text:"(-2, 1)",correct:false}], explanation: "(h,k) invertidos." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Valor de p en x²=12y:", options: [{text:"3",correct:true},{text:"12",correct:false},{text:"4",correct:false},{text:"6",correct:false}], explanation: "4p=12 -> p=3." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Directriz de x²=8y:", options: [{text:"y = -2",correct:true},{text:"y = 2",correct:false},{text:"x = -2",correct:false},{text:"y = -8",correct:false}], explanation: "p=2. Directriz opuesta al foco." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Lado recto mide:", options: [{text:"4p",correct:true},{text:"2p",correct:false},{text:"p",correct:false},{text:"p/2",correct:false}], explanation: "Ancho focal total." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Ecuación foco (0,3) directriz y=-3:", options: [{text:"x² = 12y",correct:true},{text:"y² = 12x",correct:false},{text:"x² = 6y",correct:false},{text:"x² = -12y",correct:false}], explanation: "p=3. Vertical." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Puente colgante cable parabólico. Pilares altura y distancia...", options: [{text:"Modelo x²=4py",correct:true},{text:"Modelo circular",correct:false},{text:"Modelo elíptico",correct:false},{text:"Modelo lineal",correct:false}], explanation: "Cables bajo peso uniforme forman parábola." }
    ]
  },

  // Bundle 10: Elipse e Hipérbola
  {
    meta: {
      id: "CO-MAT-11-conicas-elipse-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "conicas",
      periodo: 2,
      dba_id: "DBA-MAT-11-5",
      title: "Elipse e Hipérbola"
    },
    base: { question: "La elipse suma distancias constante, hipérbola resta.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Órbita de planetas es:", options: [{text:"Elíptica",correct:true},{text:"Circular perfecta",correct:false},{text:"Parabólica",correct:false},{text:"Hiperbólica",correct:false}], explanation: "Kepler." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "En elipse a y b son:", options: [{text:"Semiejes mayor y menor",correct:true},{text:"Focos",correct:false},{text:"Radios",correct:false},{text:"Ángulos",correct:false}], explanation: "Parámetros principales." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Ecuación x²/a² + y²/b² = 1 es:", options: [{text:"Elipse",correct:true},{text:"Hipérbola",correct:false},{text:"Círculo",correct:false},{text:"Parábola",correct:false}], explanation: "Signo suma." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Ecuación x²/a² - y²/b² = 1 es:", options: [{text:"Hipérbola",correct:true},{text:"Elipse",correct:false},{text:"Círculo",correct:false},{text:"Parábola",correct:false}], explanation: "Signo resta." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Relación en elipse:", options: [{text:"a² = b² + c²",correct:true},{text:"c² = a² + b²",correct:false},{text:"b² = a² + c²",correct:false},{text:"a = b + c",correct:false}], explanation: "a es la hipotenusa del triángulo focal." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Excentricidad e=c/a en elipse está entre:", options: [{text:"0 y 1",correct:true},{text:"1 y 2",correct:false},{text:"Mayor que 1",correct:false},{text:"Menor que 0",correct:false}], explanation: "0 es círculo, 1 es parábola." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Asíntotas de x²/a² - y²/b² = 1:", options: [{text:"y = ±(b/a)x",correct:true},{text:"y = ±(a/b)x",correct:false},{text:"y = x",correct:false},{text:"No tiene",correct:false}], explanation: "Pendientes del rectángulo central." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Longitud eje mayor elipse 2a si a=5:", options: [{text:"10",correct:true},{text:"5",correct:false},{text:"25",correct:false},{text:"2.5",correct:false}], explanation: "Doble del semieje." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Hipérbola equilátera:", options: [{text:"a = b",correct:true},{text:"a > b",correct:false},{text:"a < b",correct:false},{text:"c = a",correct:false}], explanation: "Asíntotas perpendiculares." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Focos de x²/16 + y²/25 = 1:", options: [{text:"(0, ±3)",correct:true},{text:"(±3, 0)",correct:false},{text:"(0, ±4)",correct:false},{text:"(±5, 0)",correct:false}], explanation: "Vertical (25>16). c²=25-16=9. c=3." }
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
search_query: "preguntas matematicas grado ${meta.grade} ${meta.periodo} ${meta.topic}"
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

**Competencia evaluada:** Razonamiento Cuantitativo (DBA: ${meta.dba_id})

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
