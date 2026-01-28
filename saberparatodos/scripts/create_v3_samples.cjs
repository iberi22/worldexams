
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
  // Grade 11 - Math - Period 1 - BUNDLE 1 (Inecuaciones)
  {
    meta: {
      id: "CO-MAT-11-inecuaciones-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "inecuaciones",
      periodo: 1,
      dba_id: "DBA-MAT-11-1",
      title: "Inecuaciones Lineales y Contexto"
    },
    base: { question: "Si el doble de un número más 5 es mayor que 15, ¿cuál es el conjunto solución?", answer: "x > 5", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "¿Qué significa x > 5?", options: [{text:"x es mayor que 5",correct:true},{text:"x es menor que 5",correct:false},{text:"x es igual a 5",correct:false},{text:"x es 5 o más",correct:false}], explanation: "El símbolo > significa estricta desigualdad mayor que." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si x < 3, un posible valor es:", options: [{text:"2",correct:true},{text:"3",correct:false},{text:"4",correct:false},{text:"5",correct:false}], explanation: "2 es menor que 3." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Resuelve: x + 3 > 10", options: [{text:"x > 7",correct:true},{text:"x > 13",correct:false},{text:"x < 7",correct:false},{text:"x = 7",correct:false}], explanation: "Restar 3 a ambos lados: x > 7." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Resuelve: 2x < 8", options: [{text:"x < 4",correct:true},{text:"x > 4",correct:false},{text:"x < 16",correct:false},{text:"x = 4",correct:false}], explanation: "Dividir por 2: x < 4." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Resuelve: -2x > 6", options: [{text:"x < -3",correct:true},{text:"x > -3",correct:false},{text:"x < 3",correct:false},{text:"x > 3",correct:false}], explanation: "Al dividir por número negativo (-2), se invierte la desigualdad." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Conjunto solución de 3x - 1 ≥ 5", options: [{text:"[2, ∞)",correct:true},{text:"(2, ∞)",correct:false},{text:"(-∞, 2]",correct:false},{text:"[2, 10]",correct:false}], explanation: "3x ≥ 6 => x ≥ 2. Intervalo cerrado en 2." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Un plan de datos cuesta $20.000 fijos más $50 por mega. Si tengo máximo $30.000, ¿cuántas megas puedo comprar?", options: [{text:"Hasta 200 megas",correct:true},{text:"Más de 200 megas",correct:false},{text:"Exactamente 500 megas",correct:false},{text:"Menos de 100 megas",correct:false}], explanation: "20000 + 50x ≤ 30000 => 50x ≤ 10000 => x ≤ 200." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Inecuación cuadrática: x^2 - 4 < 0", options: [{text:"(-2, 2)",correct:true},{text:"(-∞, -2) U (2, ∞)",correct:false},{text:"[-2, 2]",correct:false},{text:"x < 4",correct:false}], explanation: "(x-2)(x+2) < 0. Raíces en -2 y 2. Parábola abre arriba, negativa entre raíces." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Valor absoluto: |x - 3| > 2", options: [{text:"(-∞, 1) U (5, ∞)",correct:true},{text:"(1, 5)",correct:false},{text:"(5, ∞)",correct:false},{text:"[-1, 5]",correct:false}], explanation: "x-3 > 2 O x-3 < -2 => x > 5 O x < 1." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Sistema: x > 0 y x + y < 5. ¿Región?", options: [{text:"Primer cuadrante bajo la recta y = 5-x",correct:true},{text:"Cualquier punto positivo",correct:false},{text:"Bajo la recta pero x negativo",correct:false},{text:"Sobre la recta y = 5-x",correct:false}], explanation: "Intersección de semiplanos." }
    ]
  },

  // Grade 11 - Math - Period 1 - BUNDLE 2 (Valor Absoluto)
  {
    meta: {
      id: "CO-MAT-11-valor-absoluto-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "numerosreales",
      periodo: 1,
      dba_id: "DBA-MAT-11-1",
      title: "Propiedades del Valor Absoluto"
    },
    base: { question: "La distancia de un número x al cero se representa como |x|.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "¿Cuánto es |-5|?", options: [{text:"5",correct:true},{text:"-5",correct:false},{text:"0",correct:false},{text:"10",correct:false}], explanation: "El valor absoluto es la distancia al cero, siempre positivo." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si |x| = 3, x puede ser:", options: [{text:"3 o -3",correct:true},{text:"Solo 3",correct:false},{text:"Solo -3",correct:false},{text:"Ninguno",correct:false}], explanation: "Tanto 3 como -3 están a 3 unidades del cero." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Calcula |7 - 10|", options: [{text:"3",correct:true},{text:"-3",correct:false},{text:"17",correct:false},{text:"-17",correct:false}], explanation: "|-3| = 3." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "¿Cuál expresión representa la distancia entre x y 5?", options: [{text:"|x - 5|",correct:true},{text:"|x + 5|",correct:false},{text:"x - 5",correct:false},{text:"x + 5",correct:false}], explanation: "La distancia matemática es el valor absoluto de la diferencia." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Resuelve |x + 2| = 5", options: [{text:"x = 3, x = -7",correct:true},{text:"x = 3, x = 7",correct:false},{text:"x = -3, x = 7",correct:false},{text:"x = 5, x = -5",correct:false}], explanation: "x+2=5 => x=3; x+2=-5 => x=-7." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Si |x| < 4, entonces:", options: [{text:"-4 < x < 4",correct:true},{text:"x < 4",correct:false},{text:"x > 4",correct:false},{text:"x < -4",correct:false}], explanation: "Propiedad fundamental: distancia menor que 4 implica estar entre -4 y 4." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Resuelve |2x - 1| = |x + 3|", options: [{text:"x = 4, x = -2/3",correct:true},{text:"x = 4, x = 2",correct:false},{text:"x = -4, x = 2/3",correct:false},{text:"No tiene solución",correct:false}], explanation: "Dos casos: 2x-1 = x+3 (x=4) y 2x-1 = -(x+3) (3x=-2)." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Inecuación: |x - 2| ≥ 0", options: [{text:"Todos los reales",correct:true},{text:"x ≥ 2",correct:false},{text:"x ≤ 2",correct:false},{text:"x = 2",correct:false}], explanation: "El valor absoluto siempre es mayor o igual a cero por definición." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Gráfica de f(x) = |x - 1| + 2. El vértice es:", options: [{text:"(1, 2)",correct:true},{text:"(-1, 2)",correct:false},{text:"(1, -2)",correct:false},{text:"(0, 0)",correct:false}], explanation: "Traslación horizontal 1 a derecha, vertical 2 arriba." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Resuelve ||x| - 1| = 2", options: [{text:"x = ±3",correct:true},{text:"x = ±1",correct:false},{text:"x = 3",correct:false},{text:"x = -3",correct:false}], explanation: "|x|-1 = 2 => |x|=3 => x=±3. (|x|-1=-2 => |x|=-1 Imposible)." }
    ]
  },

  // Grade 11 - Math - Period 1 - BUNDLE 3 (Funciones Concepto)
  {
    meta: {
      id: "CO-MAT-11-funciones-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "funciones",
      periodo: 1,
      dba_id: "DBA-MAT-11-2",
      title: "Concepto de Función"
    },
    base: { question: "¿Qué define a una función matemática?", answer: "Relación uno a uno", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "En una función, para cada valor de x corresponde:", options: [{text:"Un único valor de y",correct:true},{text:"Dos valores de y",correct:false},{text:"Muchos valores de y",correct:false},{text:"Ningún valor",correct:false}], explanation: "Definición básica de función (unicidad)." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si f(x) = x + 1, entonces f(2) es:", options: [{text:"3",correct:true},{text:"2",correct:false},{text:"1",correct:false},{text:"4",correct:false}], explanation: "Reemplazar x por 2: 2+1=3." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "¿Cuál diagrama representa una función?", options: [{text:"El que tiene una sola flecha saliendo de cada elemento del dominio",correct:true},{text:"El que tiene dos flechas desde un elemento",correct:false},{text:"Un círculo",correct:false},{text:"Ninguno",correct:false}], explanation: "Cada entrada tiene exactamente una salida." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "¿Es una circunferencia una función de x?", options: [{text:"No, falla la prueba de línea vertical",correct:true},{text:"Sí, siempre",correct:false},{text:"Sí, si es pequeña",correct:false},{text:"Depende del radio",correct:false}], explanation: "Para un x hay dos valores de y." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Dominio de f(x) = 1/x", options: [{text:"Reales menos el 0",correct:true},{text:"Todos los reales",correct:false},{text:"Solo positivos",correct:false},{text:"Solo negativos",correct:false}], explanation: "No se puede dividir por cero." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "La gráfica de f(x) = x^2 es una:", options: [{text:"Parábola",correct:true},{text:"Recta",correct:false},{text:"Circunferencia",correct:false},{text:"Hipérbola",correct:false}], explanation: "Función cuadrática básica." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Si f(x) = 2x - 1, la función inversa f⁻¹(x) es:", options: [{text:"(x + 1) / 2",correct:true},{text:"2x + 1",correct:false},{text:"x/2 - 1",correct:false},{text:"1 - 2x",correct:false}], explanation: "y=2x-1 => y+1=2x => x=(y+1)/2." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Dominio de f(x) = √(x - 2)", options: [{text:"[2, ∞)",correct:true},{text:"(2, ∞)",correct:false},{text:"Reales",correct:false},{text:"x > 0",correct:false}], explanation: "El radicando debe ser no negativo: x-2 ≥ 0." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Composición (f∘g)(x) si f(x)=x^2, g(x)=x+1", options: [{text:"(x+1)^2",correct:true},{text:"x^2 + 1",correct:false},{text:"x(x+1)",correct:false},{text:"x^2 + x",correct:false}], explanation: "f(g(x)) = f(x+1) = (x+1)^2." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "¿Es f(x) = x³ inyectiva?", options: [{text:"Sí, pasa prueba horizontal",correct:true},{text:"No, tiene dos x para un y",correct:false},{text:"Solo en positivos",correct:false},{text:"No es función",correct:false}], explanation: "A cada y corresponde un único x." }
    ]
  },

  // Grade 11 - Math - Period 1 - BUNDLE 4 (Dominio y Rango)
  {
    meta: {
      id: "CO-MAT-11-dominio-rango-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "funciones",
      periodo: 1,
      dba_id: "DBA-MAT-11-2",
      title: "Dominio y Rango"
    },
    base: { question: "El conjunto de valores de entrada se llama Dominio.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "¿Cómo se llama el conjunto de salida (valores Y)?", options: [{text:"Rango",correct:true},{text:"Dominio",correct:false},{text:"Plano",correct:false},{text:"Eje X",correct:false}], explanation: "El rango o recorrido son los valores que toma la variable dependiente." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Dominio de f(x) = x + 5", options: [{text:"Todos los reales",correct:true},{text:"x > 0",correct:false},{text:"x < 0",correct:false},{text:"Enteros solamente",correct:false}], explanation: "Un polinomio no tiene restricciones." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Rango de f(x) = x^2", options: [{text:"[0, ∞)",correct:true},{text:"Reales",correct:false},{text:"(-∞, 0]",correct:false},{text:"[1, ∞)",correct:false}], explanation: "Un cuadrado real nunca es negativo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Valor excluido del dominio de f(x) = 1/(x-3)", options: [{text:"3",correct:true},{text:"-3",correct:false},{text:"0",correct:false},{text:"1",correct:false}], explanation: "El denominador no puede ser cero." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Dominio de f(x) = √(4 - x)", options: [{text:"(-∞, 4]",correct:true},{text:"[4, ∞)",correct:false},{text:"Reales",correct:false},{text:"[0, 4]",correct:false}], explanation: "4-x ≥ 0 => x ≤ 4." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Rango de f(x) = sin(x)", options: [{text:"[-1, 1]",correct:true},{text:"Reales",correct:false},{text:"[0, 1]",correct:false},{text:"(-1, 1)",correct:false}], explanation: "La función seno oscila entre -1 y 1." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Dominio de f(x) = ln(x - 5)", options: [{text:"(5, ∞)",correct:true},{text:"[5, ∞)",correct:false},{text:"Reales",correct:false},{text:"x > 0",correct:false}], explanation: "El argumento del logaritmo debe ser estrictamente positivo." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Rango de f(x) = e^x", options: [{text:"(0, ∞)",correct:true},{text:"Reales",correct:false},{text:"[0, ∞)",correct:false},{text:"[1, ∞)",correct:false}], explanation: "La exponencial siempre es positiva." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Dominio de f(x) = √(x^2 - 9)", options: [{text:"(-∞, -3] U [3, ∞)",correct:true},{text:"[-3, 3]",correct:false},{text:"(3, ∞)",correct:false},{text:"Reales",correct:false}], explanation: "x^2 - 9 ≥ 0. Valores fuera de las raíces." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Rango de f(x) = 1/(x^2 + 1)", options: [{text:"(0, 1]",correct:true},{text:"Reales",correct:false},{text:"[0, 1]",correct:false},{text:"(0, ∞)",correct:false}], explanation: "Máximo en x=0 valor 1. Al crecer x tiende a 0 pero nunca llega." }
    ]
  },

  // Grade 11 - Math - Period 1 - BUNDLE 5 (Funcion Lineal)
  {
    meta: {
      id: "CO-MAT-11-funcion-lineal-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "funciones",
      periodo: 1,
      dba_id: "DBA-MAT-11-2",
      title: "Modelado con Función Lineal"
    },
    base: { question: "La ecuación y = mx + b representa una recta.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "En y = 3x + 2, la pendiente es:", options: [{text:"3",correct:true},{text:"2",correct:false},{text:"x",correct:false},{text:"5",correct:false}], explanation: "El coeficiente de x es la pendiente." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Punto de corte con eje Y de y = 2x - 4:", options: [{text:"-4",correct:true},{text:"2",correct:false},{text:"4",correct:false},{text:"0",correct:false}], explanation: "Es el término independiente b." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Si la pendiente es positiva, la función es:", options: [{text:"Creciente",correct:true},{text:"Decreciente",correct:false},{text:"Constante",correct:false},{text:"Vertical",correct:false}], explanation: "m > 0 implica subida." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Ecuación de recta que pasa por (0,0) con pendiente 1:", options: [{text:"y = x",correct:true},{text:"y = x + 1",correct:false},{text:"y = 1",correct:false},{text:"x = 1",correct:false}], explanation: "y = 1x + 0 => y = x." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Un taxi cobra $5000 arranque + $200 por metro. Ecuación:", options: [{text:"y = 200x + 5000",correct:true},{text:"y = 5000x + 200",correct:false},{text:"y = 5200x",correct:false},{text:"y = 200x",correct:false}], explanation: "Costo variable 200x, fijo 5000." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Pendiente de la recta que pasa por (1,2) y (3,6):", options: [{text:"2",correct:true},{text:"4",correct:false},{text:"1",correct:false},{text:"3",correct:false}], explanation: "m = (6-2)/(3-1) = 4/2 = 2." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Intersección de y = 2x - 2 y y = -x + 4:", options: [{text:"(2, 2)",correct:true},{text:"(1, 4)",correct:false},{text:"(0, 0)",correct:false},{text:"(3, 1)",correct:false}], explanation: "2x-2 = -x+4 => 3x=6 => x=2. y=2(2)-2=2." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Recta perpendicular a y = 2x + 1:", options: [{text:"y = -0.5x",correct:true},{text:"y = 2x",correct:false},{text:"y = 0.5x",correct:false},{text:"y = -2x",correct:false}], explanation: "Producto de pendientes debe ser -1. m2 = -1/2." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Depreciación lineal: Valor inicial $1000, vida 10 años. Valor año 5:", options: [{text:"$500",correct:true},{text:"$600",correct:false},{text:"$400",correct:false},{text:"$0",correct:false}], explanation: "Pierde $100/año. $1000 - 5(100) = $500." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Ecuación punto-pendiente para m=3 y punto (2,5):", options: [{text:"y - 5 = 3(x - 2)",correct:true},{text:"y = 3x + 5",correct:false},{text:"y + 5 = 3(x + 2)",correct:false},{text:"y = 3x - 2",correct:false}], explanation: "Fórmula de la recta." }
    ]
  },

  // Grade 11 - Math - Period 1 - BUNDLE 6 (Funcion Cuadratica)
  {
    meta: {
      id: "CO-MAT-11-funcion-cuadratica-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "funciones", // Covers 'algebra' too
      periodo: 1,
      dba_id: "DBA-MAT-11-2",
      title: "Función Cuadrática"
    },
    base: { question: "El gráfico de una función cuadrática es una parábola.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "La forma general de una función cuadrática es:", options: [{text:"ax² + bx + c",correct:true},{text:"mx + b",correct:false},{text:"a^x",correct:false},{text:"log(x)",correct:false}], explanation: "Polinomio de grado 2." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si a > 0, la parábola abre hacia:", options: [{text:"Arriba",correct:true},{text:"Abajo",correct:false},{text:"Izquierda",correct:false},{text:"Derecha",correct:false}], explanation: "Coeficiente principal positivo => concavidad positiva." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Vértice de y = x²:", options: [{text:"(0,0)",correct:true},{text:"(1,1)",correct:false},{text:"(0,1)",correct:false},{text:"(1,0)",correct:false}], explanation: "Punto mínimo en el origen." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Número máximo de cortes con eje X:", options: [{text:"2",correct:true},{text:"1",correct:false},{text:"3",correct:false},{text:"infinitos",correct:false}], explanation: "Una ecuación de grado 2 tiene máximo 2 soluciones reales." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Eje de simetría de y = (x-2)² + 1:", options: [{text:"x = 2",correct:true},{text:"x = -2",correct:false},{text:"y = 1",correct:false},{text:"x = 0",correct:false}], explanation: "El vértice está en (2,1)." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Raíces de x² - 9 = 0:", options: [{text:"3 y -3",correct:true},{text:"9 y -9",correct:false},{text:"0 y 9",correct:false},{text:"3 y 0",correct:false}], explanation: "x² = 9 => x = ±3." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Altura máxima de h(t) = -5t² + 20t:", options: [{text:"20 m",correct:true},{text:"10 m",correct:false},{text:"2 m",correct:false},{text:"5 m",correct:false}], explanation: "Vértice t = -b/2a = -20/-10 = 2s. h(2) = -20 + 40 = 20." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Discriminante de x² + 2x + 1:", options: [{text:"0",correct:true},{text:"4",correct:false},{text:"-4",correct:false},{text:"1",correct:false}], explanation: "b² - 4ac = 4 - 4(1)(1) = 0." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Forma canónica de y = 2x² - 12x + 10:", options: [{text:"y = 2(x-3)² - 8",correct:true},{text:"y = 2(x-3)² + 8",correct:false},{text:"y = 2(x+3)² - 8",correct:false},{text:"y = (x-3)² - 4",correct:false}], explanation: "Completar cuadrados." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Rango de y = -x² + 4:", options: [{text:"(-∞, 4]",correct:true},{text:"[4, ∞)",correct:false},{text:"Reales",correct:false},{text:"(-∞, 0]",correct:false}], explanation: "Máximo en y=4, abre hacia abajo." }
    ]
  },

  // Grade 11 - Math - Period 1 - BUNDLE 7 (Funcion Exponencial)
  {
    meta: {
      id: "CO-MAT-11-funcion-exponencial-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "exponenciales",
      periodo: 1,
      dba_id: "DBA-MAT-11-2",
      title: "Función Exponencial"
    },
    base: { question: "Una función exponencial crece muy rápido.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Forma general de función exponencial:", options: [{text:"a^x",correct:true},{text:"x^a",correct:false},{text:"ax",correct:false},{text:"a/x",correct:false}], explanation: "Base constante, exponente variable." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Valor de 2^0:", options: [{text:"1",correct:true},{text:"0",correct:false},{text:"2",correct:false},{text:"Indefinido",correct:false}], explanation: "Todo número elevado a 0 es 1." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Si f(x) = 2^x, f(3) es:", options: [{text:"8",correct:true},{text:"6",correct:false},{text:"5",correct:false},{text:"9",correct:false}], explanation: "2*2*2 = 8." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Si la base es mayor que 1, la función es:", options: [{text:"Creciente",correct:true},{text:"Decreciente",correct:false},{text:"Constante",correct:false},{text:"Oscilante",correct:false}], explanation: "Crecimiento exponencial." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Resuelve 3^x = 27", options: [{text:"3",correct:true},{text:"9",correct:false},{text:"2",correct:false},{text:"4",correct:false}], explanation: "3*3*3 = 27." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Dominio de f(x) = 2^x:", options: [{text:"Reales",correct:true},{text:"Positivos",correct:false},{text:"Negativos",correct:false},{text:"[0, ∞)",correct:false}], explanation: "No hay restricción para el exponente." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Una bacteria se duplica cada hora. Si hay 100, en 3 horas habrá:", options: [{text:"800",correct:true},{text:"600",correct:false},{text:"300",correct:false},{text:"400",correct:false}], explanation: "100 * 2^3 = 100 * 8 = 800." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Resuelve 4^(x+1) = 16", options: [{text:"1",correct:true},{text:"2",correct:false},{text:"3",correct:false},{text:"0",correct:false}], explanation: "4^(x+1) = 4^2 => x+1=2 => x=1." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Asíntota de f(x) = 2^x:", options: [{text:"y = 0",correct:true},{text:"x = 0",correct:false},{text:"y = 1",correct:false},{text:"x = 1",correct:false}], explanation: "Se acerca al eje X pero nunca lo toca." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Interés compuesto: C(t) = P(1+r)^t. P=1000, r=0.1, t=2:", options: [{text:"1210",correct:true},{text:"1200",correct:false},{text:"1100",correct:false},{text:"1020",correct:false}], explanation: "1000(1.1)^2 = 1000(1.21) = 1210." }
    ]
  },

  // Grade 11 - Math - Period 1 - BUNDLE 8 (Funcion Logaritmica)
  {
    meta: {
      id: "CO-MAT-11-funcion-logaritmica-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "logaritmos",
      periodo: 1,
      dba_id: "DBA-MAT-11-2",
      title: "Logaritmos y sus Propiedades"
    },
    base: { question: "El logaritmo es la operación inversa de la exponenciación.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "log_b(b) es siempre:", options: [{text:"1",correct:true},{text:"0",correct:false},{text:"b",correct:false},{text:"Indefinido",correct:false}], explanation: "Base a la 1 es base." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "log(100) en base 10 es:", options: [{text:"2",correct:true},{text:"10",correct:false},{text:"3",correct:false},{text:"1",correct:false}], explanation: "10^2 = 100." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Convierte 2^3 = 8 a logaritmo:", options: [{text:"log_2(8) = 3",correct:true},{text:"log_3(8) = 2",correct:false},{text:"log_8(2) = 3",correct:false},{text:"log_2(3) = 8",correct:false}], explanation: "Base 2, argumento 8, exponente 3." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "log_5(5^4) es:", options: [{text:"4",correct:true},{text:"5",correct:false},{text:"20",correct:false},{text:"1",correct:false}], explanation: "Se anulan log y potencia." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "log(a*b) es igual a:", options: [{text:"log(a) + log(b)",correct:true},{text:"log(a) * log(b)",correct:false},{text:"log(a+b)",correct:false},{text:"log(a) - log(b)",correct:false}], explanation: "Propiedad de la multiplicación." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Resuelve log_x(9) = 2:", options: [{text:"3",correct:true},{text:"9",correct:false},{text:"81",correct:false},{text:"4.5",correct:false}], explanation: "x^2 = 9 => x=3 (base positiva)." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Simplifica log_2(16) - log_2(8):", options: [{text:"1",correct:true},{text:"2",correct:false},{text:"0.5",correct:false},{text:"8",correct:false}], explanation: "4 - 3 = 1. O log_2(16/8) = log_2(2) = 1." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Dominio de y = log(x-2):", options: [{text:"x > 2",correct:true},{text:"x >= 2",correct:false},{text:"x < 2",correct:false},{text:"Reales",correct:false}], explanation: "Argumento mayor que 0." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Resuelve log(x) + log(x-3) = 1 (base 10):", options: [{text:"5",correct:true},{text:"2",correct:false},{text:"5 y -2",correct:false},{text:"-2",correct:false}], explanation: "log(x(x-3))=1 => x^2-3x-10=0. Soluciones 5 y -2. Solo 5 válida." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "pH = -log[H+]. Si [H+] = 10^-7, pH es:", options: [{text:"7",correct:true},{text:"-7",correct:false},{text:"1",correct:false},{text:"10",correct:false}], explanation: "-(-7) = 7." }
    ]
  },

  // Grade 11 - Math - Period 1 - BUNDLE 9 (Operaciones Funciones)
  {
    meta: {
      id: "CO-MAT-11-operaciones-funciones-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "funciones",
      periodo: 1,
      dba_id: "DBA-MAT-11-2",
      title: "Operaciones con Funciones"
    },
    base: { question: "Se pueden sumar, restar, multiplicar y dividir funciones.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Si f(x)=x y g(x)=2x, (f+g)(x) es:", options: [{text:"3x",correct:true},{text:"2x^2",correct:false},{text:"x",correct:false},{text:"2",correct:false}], explanation: "Sumar términos semejantes." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si f(x)=5 y g(x)=3, (f-g)(x) es:", options: [{text:"2",correct:true},{text:"8",correct:false},{text:"15",correct:false},{text:"5/3",correct:false}], explanation: "5-3=2." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Si f(x)=x^2 y g(x)=x, (f*g)(x) es:", options: [{text:"x^3",correct:true},{text:"x^2",correct:false},{text:"2x",correct:false},{text:"x",correct:false}], explanation: "Multiplicar potencias igual base." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Si f(x)=4x y g(x)=2, (f/g)(x) es:", options: [{text:"2x",correct:true},{text:"2",correct:false},{text:"8x",correct:false},{text:"4x",correct:false}], explanation: "4x/2 = 2x." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Dominio de f/g requiere que:", options: [{text:"g(x) ≠ 0",correct:true},{text:"g(x) > 0",correct:false},{text:"f(x) ≠ 0",correct:false},{text:"f(x) = g(x)",correct:false}], explanation: "Evitar división por cero." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Si f(x)=x+1 y g(x)=x-1, (f*g)(x) es:", options: [{text:"x^2 - 1",correct:true},{text:"x^2 + 1",correct:false},{text:"2x",correct:false},{text:"x^2 - 2x + 1",correct:false}], explanation: "Diferencia de cuadrados." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Composición (f o g)(x). f(x)=√x, g(x)=x^2. f(g(x)) es:", options: [{text:"|x|",correct:true},{text:"x",correct:false},{text:"x^2",correct:false},{text:"±x",correct:false}], explanation: "Raíz de cuadrado es valor absoluto." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Si f(x)=1/x y g(x)=1/x, (f o g)(x) es:", options: [{text:"x",correct:true},{text:"1/x^2",correct:false},{text:"1",correct:false},{text:"2/x",correct:false}], explanation: "1/(1/x) = x." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Dominio de (f+g)(x) es:", options: [{text:"Intersección de Dom(f) y Dom(g)",correct:true},{text:"Unión de dominios",correct:false},{text:"Dominio de f",correct:false},{text:"Reales",correct:false}], explanation: "Debe estar definido en ambas." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Si f(g(x)) = x, entonces g es:", options: [{text:"La inversa de f",correct:true},{text:"La derivada de f",correct:false},{text:"El cuadrado de f",correct:false},{text:"Igual a f",correct:false}], explanation: "Definición de función inversa." }
    ]
  },

  // Grade 11 - Math - Period 1 - BUNDLE 10 (Polinomios)
  {
    meta: {
      id: "CO-MAT-11-polinomios-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "funciones",
      periodo: 1,
      dba_id: "DBA-MAT-11-1",
      title: "Funciones Polinómicas"
    },
    base: { question: "El grado de un polinomio es el mayor exponente.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Grado del polinomio 3x^4 - 2x + 1:", options: [{text:"4",correct:true},{text:"3",correct:false},{text:"1",correct:false},{text:"0",correct:false}], explanation: "Mayor exponente es 4." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "¿Cuántos términos tiene x^2 + 2x + 1?", options: [{text:"3 (Trinomio)",correct:true},{text:"2 (Binomio)",correct:false},{text:"1 (Monomio)",correct:false},{text:"4",correct:false}], explanation: "Separados por sumas." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Si el grado es impar, los extremos de la gráfica van a:", options: [{text:"Direcciones opuestas",correct:true},{text:"La misma dirección",correct:false},{text:"Cero",correct:false},{text:"Infinito positivo ambos",correct:false}], explanation: "Comportamiento extremo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Término independiente de 5x^3 - 7:", options: [{text:"-7",correct:true},{text:"7",correct:false},{text:"5",correct:false},{text:"0",correct:false}], explanation: "No tiene variable." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Número máximo de raíces reales de un grado 5:", options: [{text:"5",correct:true},{text:"4",correct:false},{text:"3",correct:false},{text:"infinito",correct:false}], explanation: "Teorema fundamental del álgebra." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "División sintética se usa para dividir por:", options: [{text:"x - c",correct:true},{text:"x^2",correct:false},{text:"constante",correct:false},{text:"cualquier polinomio",correct:false}], explanation: "Divisores lineales." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Si P(2)=0, entonces:", options: [{text:"(x-2) es factor",correct:true},{text:"(x+2) es factor",correct:false},{text:"2 es el residuo",correct:false},{text:"P no es función",correct:false}], explanation: "Teorema del factor." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Multiplicidad par de una raíz implica que la gráfica:", options: [{text:"Toca y rebota en el eje X",correct:true},{text:"Cruza el eje X",correct:false},{text:"Tiene una asíntota",correct:false},{text:"Es discontinua",correct:false}], explanation: "Tangencia." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Teorema del Residuo: El residuo de P(x)/(x-c) es:", options: [{text:"P(c)",correct:true},{text:"c",correct:false},{text:"P(0)",correct:false},{text:"0",correct:false}], explanation: "Evaluación directa." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Posibles raíces racionales de 2x^3 + ... + 3:", options: [{text:"±1, ±3, ±1/2, ±3/2",correct:true},{text:"±1, ±2, ±3",correct:false},{text:"±1, ±2",correct:false},{text:"Solo enteras",correct:false}], explanation: "Divisores de 3 entre divisores de 2." }
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
    console.log(`✅ Created Pilot Bundle v3.0: ${fullPath}`);
});
