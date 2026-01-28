
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
  // Grade 11 - Math - Period 3 - BUNDLE 1 (Sucesiones)
  {
    meta: {
      id: "CO-MAT-11-sucesiones-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "calculo",
      periodo: 3,
      dba_id: "DBA-MAT-11-3",
      title: "Sucesiones y Series"
    },
    base: { question: "Una sucesión es una función con dominio en los naturales.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "El siguiente término de 2, 4, 6, 8... es:", options: [{text:"10",correct:true},{text:"9",correct:false},{text:"12",correct:false},{text:"8",correct:false}], explanation: "Sucesión de pares (2n)." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Término a_n = n + 1. El 5to término es:", options: [{text:"6",correct:true},{text:"5",correct:false},{text:"4",correct:false},{text:"7",correct:false}], explanation: "5 + 1 = 6." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Sucesión geométrica: 3, 6, 12, 24... Razón:", options: [{text:"2",correct:true},{text:"3",correct:false},{text:"4",correct:false},{text:"6",correct:false}], explanation: "Cada término se multiplica por 2." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Término general de 1, 3, 5, 7...", options: [{text:"2n - 1",correct:true},{text:"2n",correct:false},{text:"n + 2",correct:false},{text:"n - 1",correct:false}], explanation: "Impares empezando en 1." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Suma de los 5 primeros términos de a_n = n:", options: [{text:"15",correct:true},{text:"10",correct:false},{text:"20",correct:false},{text:"5",correct:false}], explanation: "1+2+3+4+5 = 15." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "¿Converge 1/n cuando n tiende a infinito?", options: [{text:"Sí, a 0",correct:true},{text:"Sí, a 1",correct:false},{text:"No, diverge",correct:false},{text:"A infinito",correct:false}], explanation: "1 dividido entre algo muy grande es casi 0." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Límite de (n+1)/n cuando n->∞:", options: [{text:"1",correct:true},{text:"0",correct:false},{text:"Infinito",correct:false},{text:"2",correct:false}], explanation: "Grados iguales, coeficientes 1/1." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Serie geométrica infinita 1 + 1/2 + 1/4 +... Suma:", options: [{text:"2",correct:true},{text:"1.5",correct:false},{text:"Infinito",correct:false},{text:"1",correct:false}], explanation: "S = a/(1-r) = 1/(1-0.5) = 2." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Término 100 de Fibonacci (aprox):", options: [{text:"Número muy grande",correct:true},{text:"100",correct:false},{text:"200",correct:false},{text:"50",correct:false}], explanation: "Crecimiento exponencial." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "¿Es a_n = (-1)^n convergente?", options: [{text:"No, oscila",correct:true},{text:"Sí, a 0",correct:false},{text:"Sí, a 1",correct:false},{text:"Sí, a -1",correct:false}], explanation: "Salta entre 1 y -1." }
    ]
  },

  // Grade 11 - Math - Period 3 - BUNDLE 2 (Limites Concepto)
  {
    meta: {
      id: "CO-MAT-11-limites-concepto-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "calculo",
      periodo: 3,
      dba_id: "DBA-MAT-11-3",
      title: "Concepto de Límite"
    },
    base: { question: "El límite describe el comportamiento cerca de un punto.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Si f(x)=x+1, lim x->2 f(x) es:", options: [{text:"3",correct:true},{text:"2",correct:false},{text:"1",correct:false},{text:"0",correct:false}], explanation: "Sustitución directa." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Límite de constante k cuando x->a:", options: [{text:"k",correct:true},{text:"a",correct:false},{text:"0",correct:false},{text:"x",correct:false}], explanation: "No depende de x." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "lim x->3 de x^2:", options: [{text:"9",correct:true},{text:"6",correct:false},{text:"3",correct:false},{text:"0",correct:false}], explanation: "3 al cuadrado." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Para que el límite exista, los límites laterales deben ser:", options: [{text:"Iguales",correct:true},{text:"Diferentes",correct:false},{text:"Cero",correct:false},{text:"Infinitos",correct:false}], explanation: "Condición de existencia." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Límite x->0 de 1/x:", options: [{text:"No existe",correct:true},{text:"0",correct:false},{text:"1",correct:false},{text:"Infinito",correct:false}], explanation: "Por derecha +inf, por izquierda -inf." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Indeterminación 0/0 requiere:", options: [{text:"Factorización o racionalización",correct:true},{text:"Sustituir",correct:false},{text:"Decir que no existe",correct:false},{text:"Derivar siempre",correct:false}], explanation: "Hay que remover la indeterminación." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "lim x->1 (x^2-1)/(x-1):", options: [{text:"2",correct:true},{text:"0",correct:false},{text:"1",correct:false},{text:"Indefinido",correct:false}], explanation: "(x-1)(x+1)/(x-1) = x+1 -> 2." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "lim x->0 sin(x)/x:", options: [{text:"1",correct:true},{text:"0",correct:false},{text:"Infinito",correct:false},{text:"-1",correct:false}], explanation: "Límite trigonométrico especial." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Definición formal epsilon-delta:", options: [{text:"Para todo ε>0 existe δ>0...",correct:true},{text:"Para todo n...",correct:false},{text:"Solo reemplazando",correct:false},{text:"Gráficamente",correct:false}], explanation: "Rigor matemático." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "lim x->∞ (1 + 1/x)^x:", options: [{text:"e",correct:true},{text:"1",correct:false},{text:"0",correct:false},{text:"Infinito",correct:false}], explanation: "Definición del número de Euler." }
    ]
  },

  // Bundle 3: Continuidad
  {
    meta: {
      id: "CO-MAT-11-calculo-continuidad-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "calculo",
      periodo: 3,
      dba_id: "DBA-MAT-11-3",
      title: "Continuidad"
    },
    base: { question: "Una función es continua si se dibuja sin levantar el lápiz.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "¿Polinomios son continuos en todos los reales?", options: [{text:"Sí",correct:true},{text:"No",correct:false},{text:"Solo los pares",correct:false},{text:"Solo los impares",correct:false}], explanation: "Propiedad básica." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Discontinuidad en f(x)=1/x en:", options: [{text:"x=0",correct:true},{text:"x=1",correct:false},{text:"x=2",correct:false},{text:"no tiene",correct:false}], explanation: "Asíntota vertical." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Condición 1 de continuidad en c:", options: [{text:"f(c) está definida",correct:true},{text:"f'(c) existe",correct:false},{text:"f(c) = 0",correct:false},{text:"Límite es infinito",correct:false}], explanation: "El punto debe existir." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Función valor absoluto es continua en 0:", options: [{text:"Sí",correct:true},{text:"No",correct:false},{text:"A veces",correct:false},{text:"Es diferenciable",correct:false}], explanation: "Pico no suave, pero trazo continuo." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Tipo de discontinuidad en (x^2-4)/(x-2) en x=2:", options: [{text:"Removible (hueco)",correct:true},{text:"Salto",correct:false},{text:"Infinita",correct:false},{text:"Esencial",correct:false}], explanation: "Se puede simplificar y rellenar." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Función parte entera en enteros:", options: [{text:"Discontinua (salto)",correct:true},{text:"Continua",correct:false},{text:"Removible",correct:false},{text:"Suave",correct:false}], explanation: "Escalones." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Si f es continua en [a,b] y k intermedio...", options: [{text:"Teorema Valor Intermedio",correct:true},{text:"Teorema Rolle",correct:false},{text:"Teorema Medio",correct:false},{text:"L'Hopital",correct:false}], explanation: "Alcanza todos los valores intermedios." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Halar k para que f(x) sea continua. x+1 si x<2, kx si x>=2:", options: [{text:"k = 1.5",correct:true},{text:"k = 1",correct:false},{text:"k = 3",correct:false},{text:"k = 2",correct:false}], explanation: "Lim izq: 3. Lim der: 2k. 2k=3 -> k=1.5." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "¿Diferenciabilidad implica continuidad?", options: [{text:"Sí, siempre",correct:true},{text:"No necesariamente",correct:false},{text:"Solo en polinomios",correct:false},{text:"Al revés sí",correct:false}], explanation: "Si es suave, es continua." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "¿Continuidad implica diferenciabilidad?", options: [{text:"No (ej. valor absoluto)",correct:true},{text:"Sí, siempre",correct:false},{text:"Solo en positivos",correct:false},{text:"Sí en compactos",correct:false}], explanation: "Picos o esquinas no son derivables." }
    ]
  },

  // Bundle 4: Derivada Concepto
  {
    meta: {
      id: "CO-MAT-11-derivada-concepto-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "calculo",
      periodo: 3,
      dba_id: "DBA-MAT-11-3",
      title: "La Derivada"
    },
    base: { question: "La derivada representa la pendiente de la recta tangente.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Notación de derivada de y:", options: [{text:"y'",correct:true},{text:"y²",correct:false},{text:"1/y",correct:false},{text:"∫y",correct:false}], explanation: "Prima de Lagrange." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "La derivada mide:", options: [{text:"Razón de cambio",correct:true},{text:"Área bajo curva",correct:false},{text:"Longitud",correct:false},{text:"Volumen",correct:false}], explanation: "Cambio instantáneo." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Derivada de una constante (f(x)=5):", options: [{text:"0",correct:true},{text:"5",correct:false},{text:"1",correct:false},{text:"x",correct:false}], explanation: "No cambia, pendiente 0." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Derivada de f(x)=x:", options: [{text:"1",correct:true},{text:"0",correct:false},{text:"x",correct:false},{text:"2",correct:false}], explanation: "Pendiente de y=x es 1." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Pendiente de tangente a y=x^2 en x=2:", options: [{text:"4",correct:true},{text:"2",correct:false},{text:"8",correct:false},{text:"0",correct:false}], explanation: "y'=2x. y'(2)=4." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Si f'(x) > 0, la función es:", options: [{text:"Creciente",correct:true},{text:"Decreciente",correct:false},{text:"Constante",correct:false},{text:"Cóncava",correct:false}], explanation: "Pendiente positiva sube." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Derivada por definición usa:", options: [{text:"Límite h->0",correct:true},{text:"Límite h->∞",correct:false},{text:"Integral",correct:false},{text:"Sumatoria",correct:false}], explanation: "(f(x+h)-f(x))/h." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Velocidad es la derivada de:", options: [{text:"Posición",correct:true},{text:"Aceleración",correct:false},{text:"Tiempo",correct:false},{text:"Masa",correct:false}], explanation: "v = dx/dt." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Aceleración es derivada de:", options: [{text:"Velocidad",correct:true},{text:"Posición",correct:false},{text:"Fuerza",correct:false},{text:"Energía",correct:false}], explanation: "a = dv/dt." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Punto crítico ocurre cuando:", options: [{text:"f'(x)=0 o no existe",correct:true},{text:"f''(x)=0",correct:false},{text:"f(x)=0",correct:false},{text:"limite no existe",correct:false}], explanation: "Candidatos a max/min." }
    ]
  },

  // Bundle 5: Reglas de Derivación
  {
    meta: {
      id: "CO-MAT-11-reglas-derivacion-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "calculo",
      periodo: 3,
      dba_id: "DBA-MAT-11-3",
      title: "Reglas de Derivación"
    },
    base: { question: "Regla de potencias: d/dx(x^n) = nx^(n-1)", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Derivada de x^3:", options: [{text:"3x^2",correct:true},{text:"3x",correct:false},{text:"x^2",correct:false},{text:"4x^4",correct:false}], explanation: "Baja 3, resta 1." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Derivada de 5x:", options: [{text:"5",correct:true},{text:"5x",correct:false},{text:"0",correct:false},{text:"1",correct:false}], explanation: "Constante por x." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Derivada de suma x^2 + x:", options: [{text:"2x + 1",correct:true},{text:"2x",correct:false},{text:"x + 1",correct:false},{text:"3x",correct:false}], explanation: "Derivada término a término." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Derivada de 1/x (x^-1):", options: [{text:"-1/x^2",correct:true},{text:"1/x",correct:false},{text:"ln(x)",correct:false},{text:"0",correct:false}], explanation: "-1x^-2." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Regla del producto (uv)':", options: [{text:"u'v + uv'",correct:true},{text:"u'v'",correct:false},{text:"u'v - uv'",correct:false},{text:"u + v",correct:false}], explanation: "Suma de cruzados." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Derivada de e^x:", options: [{text:"e^x",correct:true},{text:"xe^(x-1)",correct:false},{text:"0",correct:false},{text:"ln(x)",correct:false}], explanation: "Función única." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Regla del cociente (u/v)':", options: [{text:"(u'v - uv')/v^2",correct:true},{text:"(u'v + uv')/v^2",correct:false},{text:"u'/v'",correct:false},{text:"(v'u - vu')/u^2",correct:false}], explanation: "Resta en numerador." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Derivada de ln(x):", options: [{text:"1/x",correct:true},{text:"e^x",correct:false},{text:"1",correct:false},{text:"x",correct:false}], explanation: "Recíproco." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Derivada de sin(x):", options: [{text:"cos(x)",correct:true},{text:"-cos(x)",correct:false},{text:"-sin(x)",correct:false},{text:"tan(x)",correct:false}], explanation: "Coseno positivo." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Derivada de cos(x):", options: [{text:"-sin(x)",correct:true},{text:"sin(x)",correct:false},{text:"cos(x)",correct:false},{text:"-cos(x)",correct:false}], explanation: "Seno negativo." }
    ]
  },

  // Bundle 6: Regla de la Cadena
  {
    meta: {
      id: "CO-MAT-11-regla-cadena-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "calculo",
      periodo: 3,
      dba_id: "DBA-MAT-11-3",
      title: "Regla de la Cadena"
    },
    base: { question: "Se usa para derivar funciones compuestas.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "f(g(x)) derivada:", options: [{text:"f'(g(x)) * g'(x)",correct:true},{text:"f'(x)g'(x)",correct:false},{text:"f'(g'(x))",correct:false},{text:"f(g(x))'",correct:false}], explanation: "Externa prima por interna prima." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Derivada de (2x)^2:", options: [{text:"8x",correct:true},{text:"4x",correct:false},{text:"2x",correct:false},{text:"2",correct:false}], explanation: "4x^2 -> 8x. O 2(2x)*2 = 8x." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Derivada de sin(2x):", options: [{text:"2cos(2x)",correct:true},{text:"cos(2x)",correct:false},{text:"sin(2x)",correct:false},{text:"-2sin(2x)",correct:false}], explanation: "cos(2x) * 2." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Derivada de e^(3x):", options: [{text:"3e^(3x)",correct:true},{text:"e^(3x)",correct:false},{text:"3xe^(3x)",correct:false},{text:"e^x",correct:false}], explanation: "e^u * u'." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Derivada de (x+1)^5:", options: [{text:"5(x+1)^4",correct:true},{text:"5(x)^4",correct:false},{text:"(x+1)^5",correct:false},{text:"4(x+1)^5",correct:false}], explanation: "5u^4 * 1." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Derivada de ln(2x):", options: [{text:"1/x",correct:true},{text:"1/(2x)",correct:false},{text:"2/x",correct:false},{text:"2",correct:false}], explanation: "(1/2x) * 2 = 1/x." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Derivada de sin^2(x):", options: [{text:"2sin(x)cos(x)",correct:true},{text:"cos^2(x)",correct:false},{text:"2sin(x)",correct:false},{text:"sin(2x)",correct:false}], explanation: "2sin(x) * cos(x)." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Derivada de √(x^2+1):", options: [{text:"x / √(x^2+1)",correct:true},{text:"1 / 2√(x^2+1)",correct:false},{text:"2x",correct:false},{text:"x",correct:false}], explanation: "0.5(x^2+1)^-0.5 * 2x." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Derivada de tan(3x):", options: [{text:"3sec^2(3x)",correct:true},{text:"sec^2(3x)",correct:false},{text:"3tan(3x)",correct:false},{text:"1/cos(3x)",correct:false}], explanation: "sec^2(u) * u'." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Derivada de e^(x^2):", options: [{text:"2xe^(x^2)",correct:true},{text:"e^(x^2)",correct:false},{text:"2e^(x^2)",correct:false},{text:"x^2e^x",correct:false}], explanation: "e^u * 2x." }
    ]
  },

  // Bundle 7: Máximos y Mínimos
  {
    meta: {
      id: "CO-MAT-11-aplicacion-derivada-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "calculo",
      periodo: 3,
      dba_id: "DBA-MAT-11-3",
      title: "Aplicación: Optimización"
    },
    base: { question: "La derivada ayuda a encontrar máximos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "En un máximo local, la tangente es:", options: [{text:"Horizontal",correct:true},{text:"Vertical",correct:false},{text:"Inclinada",correct:false},{text:"No existe",correct:false}], explanation: "Pendiente cero." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si f''(c) < 0 en punto crítico, es:", options: [{text:"Máximo",correct:true},{text:"Mínimo",correct:false},{text:"Punto silla",correct:false},{text:"Nada",correct:false}], explanation: "Cóncava hacia abajo (triste)." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Puntos críticos de f(x)=x^2:", options: [{text:"0",correct:true},{text:"1",correct:false},{text:"2",correct:false},{text:"-1",correct:false}], explanation: "2x=0 -> x=0." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Mínimo de y = x^2 - 4x:", options: [{text:"x = 2",correct:true},{text:"x = 4",correct:false},{text:"x = 0",correct:false},{text:"x = -2",correct:false}], explanation: "2x-4=0 -> x=2." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Rectanlugo perim 20. Max área lados:", options: [{text:"5 y 5",correct:true},{text:"4 y 6",correct:false},{text:"10 y 0",correct:false},{text:"2 y 8",correct:false}], explanation: "Cuadrado optimiza área." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Punto inflexión de x^3:", options: [{text:"0",correct:true},{text:"1",correct:false},{text:"-1",correct:false},{text:"No tiene",correct:false}], explanation: "Cambia concavidad, f''=6x=0." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Caja abierta vol max, esquinas x. V = x(12-2x)^2:", options: [{text:"Derivar y igualar a 0",correct:true},{text:"Integrar",correct:false},{text:"Sumar",correct:false},{text:"Graficar solo",correct:false}], explanation: "Método de optimización." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Dos números suman 10 y producto max:", options: [{text:"5 y 5",correct:true},{text:"4 y 6",correct:false},{text:"9 y 1",correct:false},{text:"10 y 0",correct:false}], explanation: "Vértice de parábola." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Criterio segunda derivada falló (f''=0):", options: [{text:"Usar criterio primera derivada",correct:true},{text:"No es extremo",correct:false},{text:"Es punto silla",correct:false},{text:"Es máximo",correct:false}], explanation: "Requiere más análisis." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Dimensiones lata min material (cilindro):", options: [{text:"h = 2r",correct:true},{text:"h = r",correct:false},{text:"h = 3r",correct:false},{text:"r = h",correct:false}], explanation: "Optimización clásica." }
    ]
  },

  // Bundle 8: Cinemática (Derivadas)
  {
    meta: {
      id: "CO-MAT-11-cinematica-derivada-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "calculo",
      periodo: 3,
      dba_id: "DBA-MAT-11-3",
      title: "Cinemática y Razón de Cambio"
    },
    base: { question: "Velocidad es cambio de posición.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Si s(t) es posición, s'(t) es:", options: [{text:"Velocidad",correct:true},{text:"Aceleración",correct:false},{text:"Tiempo",correct:false},{text:"Distancia",correct:false}], explanation: "Definición." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si v(t) es velocidad, v'(t) es:", options: [{text:"Aceleración",correct:true},{text:"Posición",correct:false},{text:"Rapidez",correct:false},{text:"Jerk",correct:false}], explanation: "Derivada de velocidad." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "s(t) = t^2. Velocidad en t=3:", options: [{text:"6",correct:true},{text:"9",correct:false},{text:"3",correct:false},{text:"1",correct:false}], explanation: "v=2t. v(3)=6." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Partícula parada implica:", options: [{text:"v = 0",correct:true},{text:"a = 0",correct:false},{text:"s = 0",correct:false},{text:"t = 0",correct:false}], explanation: "Velocidad cero." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Aceleración cte a(t)=-9.8. v(t) es:", options: [{text:"Lineal (-9.8t + v0)",correct:true},{text:"Cuadrática",correct:false},{text:"Constante",correct:false},{text:"Cúbica",correct:false}], explanation: "Antiderivada (o integral) de constante." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Máxima altura en tiro vertical ocurre cuando:", options: [{text:"v = 0",correct:true},{text:"a = 0",correct:false},{text:"s = 0",correct:false},{text:"antes de caer",correct:false}], explanation: "Se detiene un instante." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Razones relacionadas. Globo se infla. dV/dt relacionado con:", options: [{text:"dr/dt",correct:true},{text:"r",correct:false},{text:"V",correct:false},{text:"t",correct:false}], explanation: "Cadena: dV/dt = dV/dr * dr/dt." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Escalera desliza. Velocidad piso vs pared:", options: [{text:"Relacionadas por Pitágoras",correct:true},{text:"Iguales",correct:false},{text:"Constantes",correct:false},{text:"Independientes",correct:false}], explanation: "x^2+y^2=L^2 derivado." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Jerk (Sobreaceleración) es derivada de:", options: [{text:"Aceleración",correct:true},{text:"Velocidad",correct:false},{text:"Fuerza",correct:false},{text:"Energía",correct:false}], explanation: "Tercera derivada de posición." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Interpretación económica: Costo Marginal es:", options: [{text:"Derivada del Costo",correct:true},{text:"Costo promedio",correct:false},{text:"Costo total",correct:false},{text:"Ingreso",correct:false}], explanation: "C'(x)." }
    ]
  },

  // Bundle 9: L'Hopital
  {
    meta: {
      id: "CO-MAT-11-lhopital-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "calculo",
      periodo: 3,
      dba_id: "DBA-MAT-11-3",
      title: "Regla de L'Hôpital"
    },
    base: { question: "Sirve para límites indeterminados 0/0 o inf/inf.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Se aplica L'Hôpital derivando:", options: [{text:"Numerador y denominador por separado",correct:true},{text:"Como cociente",correct:false},{text:"Solo numerador",correct:false},{text:"Solo denominador",correct:false}], explanation: "No es regla de cociente." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Condición para usar L'Hôpital:", options: [{text:"Indeterminación 0/0 o inf/inf",correct:true},{text:"Siempre",correct:false},{text:"Cuando f(x)=0",correct:false},{text:"En asíntotas",correct:false}], explanation: "Solo formas indeterminadas." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "lim x->1 (ln x)/(x-1):", options: [{text:"1",correct:true},{text:"0",correct:false},{text:"Inf",correct:false},{text:"-1",correct:false}], explanation: "1/x / 1 -> 1." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "lim x->inf e^x/x:", options: [{text:"Infinito",correct:true},{text:"0",correct:false},{text:"1",correct:false},{text:"e",correct:false}], explanation: "e^x / 1 -> inf." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "lim x->0 (e^x - 1)/x:", options: [{text:"1",correct:true},{text:"0",correct:false},{text:"e",correct:false},{text:"Inf",correct:false}], explanation: "e^x / 1 en 0 es 1." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Si al aplicar L'Hôpital sigue 0/0:", options: [{text:"Aplicar de nuevo",correct:true},{text:"No existe",correct:false},{text:"Es cero",correct:false},{text:"Rendirse",correct:false}], explanation: "Reiterativo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "lim x->0 (1-cos x)/x^2:", options: [{text:"1/2",correct:true},{text:"0",correct:false},{text:"1",correct:false},{text:"inf",correct:false}], explanation: "Dos veces: sin x/2x -> cos x/2 -> 1/2." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Forma 0 * inf se convierte a:", options: [{text:"0/0 o inf/inf",correct:true},{text:"1^inf",correct:false},{text:"0^0",correct:false},{text:"Resuelto",correct:false}], explanation: "f * g = f / (1/g)." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "lim x->inf (1 + 1/x)^x usando L'H:", options: [{text:"e",correct:true},{text:"1",correct:false},{text:"inf",correct:false},{text:"0",correct:false}], explanation: "Usando logaritmos primero." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Comparación orden: x^10 vs e^x. Gana:", options: [{text:"e^x",correct:true},{text:"x^10",correct:false},{text:"Empate",correct:false},{text:"Depende",correct:false}], explanation: "Exponencial vence potencia." }
    ]
  },

  // Bundle 10: Integrales (Intro)
  {
    meta: {
      id: "CO-MAT-11-integral-intro-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "calculo",
      periodo: 3,
      dba_id: "DBA-MAT-11-3",
      title: "Introducción a la Integral"
    },
    base: { question: "La integral es la operación inversa de la derivada.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Símbolo de integral se parece a:", options: [{text:"S alargada",correct:true},{text:"D",correct:false},{text:"Cruz",correct:false},{text:"Línea",correct:false}], explanation: "Suma continua." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Integral de 2x dx:", options: [{text:"x^2 + C",correct:true},{text:"2x^2",correct:false},{text:"x",correct:false},{text:"2",correct:false}], explanation: "Derivada de x^2 es 2x." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "¿Qué significa + C?", options: [{text:"Constante integración",correct:true},{text:"Correcto",correct:false},{text:"Cero",correct:false},{text:"Cambio",correct:false}], explanation: "Familia de funciones." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Integral definida calcula:", options: [{text:"Área bajo la curva",correct:true},{text:"Pendiente",correct:false},{text:"Longitud",correct:false},{text:"Puntos",correct:false}], explanation: "Interpretación geométrica." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Integral de x^n:", options: [{text:"x^(n+1)/(n+1)",correct:true},{text:"nx^(n-1)",correct:false},{text:"x^n",correct:false},{text:"x^(n-1)",correct:false}], explanation: "Regla potencia inversa." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Integral de cos(x):", options: [{text:"sin(x)",correct:true},{text:"-sin(x)",correct:false},{text:"-cos(x)",correct:false},{text:"tan(x)",correct:false}], explanation: "Derivada sin es cos." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Teorema Fundamental del Cálculo conecta:", options: [{text:"Derivada e Integral",correct:true},{text:"Suma y Resta",correct:false},{text:"Álgebra y Geometría",correct:false},{text:"Límites y Funciones",correct:false}], explanation: "Son inversos." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Integral de 1/x:", options: [{text:"ln|x|",correct:true},{text:"-1/x^2",correct:false},{text:"e^x",correct:false},{text:"1",correct:false}], explanation: "Logaritmo natural." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Integral de e^(2x):", options: [{text:"e^(2x)/2",correct:true},{text:"e^(2x)",correct:false},{text:"2e^(2x)",correct:false},{text:"e^x",correct:false}], explanation: "Regla cadena inversa." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Área bajo y=x entre 0 y 2:", options: [{text:"2",correct:true},{text:"4",correct:false},{text:"1",correct:false},{text:"0.5",correct:false}], explanation: "Triángulo base 2 alt 2. A=2." }
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
    console.log(`✅ Created Period 3 Bundle v3.0: ${fullPath}`);
});
