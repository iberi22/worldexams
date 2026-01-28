
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
  // Grade 11 - Math - Period 4 - BUNDLE 1 (Estadística Descriptiva)
  {
    meta: {
      id: "CO-MAT-11-estadistica-desc-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "estadistica",
      periodo: 4,
      dba_id: "DBA-MAT-11-9",
      title: "Estadística Descriptiva y Datos Agrupados"
    },
    base: { question: "La estadística descriptiva resume datos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "La media aritmética es:", options: [{text:"Promedio",correct:true},{text:"Dato central",correct:false},{text:"Dato más frecuente",correct:false},{text:"Dispersión",correct:false}], explanation: "Suma dividida entre cantidad." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "La moda es:", options: [{text:"Dato que más se repite",correct:true},{text:"Promedio",correct:false},{text:"Centro ordenado",correct:false},{text:"Diferencia max-min",correct:false}], explanation: "Frecuencia máxima." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "La mediana de 2, 5, 8, 11, 14 es:", options: [{text:"8",correct:true},{text:"5",correct:false},{text:"2",correct:false},{text:"11",correct:false}], explanation: "El de la mitad." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Rango de datos {2, 5, 20}:", options: [{text:"18",correct:true},{text:"20",correct:false},{text:"5",correct:false},{text:"22",correct:false}], explanation: "20 - 2 = 18." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Si varianza es 25, desviación estándar es:", options: [{text:"5",correct:true},{text:"25",correct:false},{text:"625",correct:false},{text:"50",correct:false}], explanation: "Raíz cuadrada de varianza." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Percentil 50 equivale a:", options: [{text:"Mediana",correct:true},{text:"Media",correct:false},{text:"Moda",correct:false},{text:"Cuartil 3",correct:false}], explanation: "Mitad de datos." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Marca de clase en intervalo [10, 20):", options: [{text:"15",correct:true},{text:"10",correct:false},{text:"20",correct:false},{text:"30",correct:false}], explanation: "(10+20)/2." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Coeficiente de variación mide:", options: [{text:"Dispersión relativa",correct:true},{text:"Promedio",correct:false},{text:"Simetría",correct:false},{text:"Curtosis",correct:false}], explanation: "Desviación/Media." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Histograma vs Gráfico Barras:", options: [{text:"Histograma es para continuas",correct:true},{text:"Son iguales",correct:false},{text:"Histograma tiene espacios",correct:false},{text:"Barras es para áreas",correct:false}], explanation: "Histograma agrupa intervalos." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Sesgo a la derecha implica:", options: [{text:"Cola larga a derecha",correct:true},{text:"Simetría",correct:false},{text:"Media < Mediana",correct:false},{text:"Moda al centro",correct:false}], explanation: "Asimetría positiva." }
    ]
  },

  // Grade 11 - Math - Period 4 - BUNDLE 2 (Probabilidad Básica)
  {
    meta: {
      id: "CO-MAT-11-probabilidad-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "estadistica",
      periodo: 4,
      dba_id: "DBA-MAT-11-10",
      title: "Teoría de Probabilidad"
    },
    base: { question: "Probabilidad está entre 0 y 1.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Probabilidad de cara en moneda:", options: [{text:"0.5",correct:true},{text:"1",correct:false},{text:"0",correct:false},{text:"0.2",correct:false}], explanation: "1 de 2." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Probabilidad de sacar 7 en dado de 6 caras:", options: [{text:"0",correct:true},{text:"1/6",correct:false},{text:"1",correct:false},{text:"0.5",correct:false}], explanation: "Imposible." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Probabilidad evento seguro:", options: [{text:"1",correct:true},{text:"0.5",correct:false},{text:"100",correct:false},{text:"0",correct:false}], explanation: "100%." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Probabilidad sacar As (baraja 52):", options: [{text:"4/52",correct:true},{text:"1/52",correct:false},{text:"1/4",correct:false},{text:"1/13",correct:false}], explanation: "Hay 4 ases." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Eventos A y B excluyentes. P(A u B):", options: [{text:"P(A) + P(B)",correct:true},{text:"P(A) * P(B)",correct:false},{text:"P(A) - P(B)",correct:false},{text:"1",correct:false}], explanation: "No hay intersección." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Eventos A y B independientes. P(A n B):", options: [{text:"P(A) * P(B)",correct:true},{text:"P(A) + P(B)",correct:false},{text:"0",correct:false},{text:"1",correct:false}], explanation: "Multiplicación." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Probabilidad al menos una cara en 2 monedas:", options: [{text:"3/4",correct:true},{text:"1/2",correct:false},{text:"1/4",correct:false},{text:"1",correct:false}], explanation: "CC, CS, SC. (Solos SS falla)." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "P(A) = 0.4, P(B) = 0.5. Si excluyentes, P(A u B):", options: [{text:"0.9",correct:true},{text:"0.2",correct:false},{text:"0.1",correct:false},{text:"0.4",correct:false}], explanation: "Suma simple." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Paradoja del cumpleaños (23 personas):", options: [{text:"Prob > 50% coincidencia",correct:true},{text:"Prob baja",correct:false},{text:"Imposible",correct:false},{text:"Prob 100%",correct:false}], explanation: "Es contraintuitivo pero cierto." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Teorema Bayes relaciona:", options: [{text:"P(A|B) con P(B|A)",correct:true},{text:"P(A) con P(B)",correct:false},{text:"A y B",correct:false},{text:"Causas",correct:false}], explanation: "Probabilidad inversa." }
    ]
  },

  // Bundle 3: Probabilidad Condicional
  {
    meta: {
      id: "CO-MAT-11-probabilidad-condicional-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "estadistica",
      periodo: 4,
      dba_id: "DBA-MAT-11-10",
      title: "Probabilidad Condicional"
    },
    base: { question: "P(A|B) es la prob de A dado que ocurrió B.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Fórmula de P(A|B):", options: [{text:"P(A n B) / P(B)",correct:true},{text:"P(A)/P(B)",correct:false},{text:"P(A)*P(B)",correct:false},{text:"P(A)+P(B)",correct:false}], explanation: "Definición estándar." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si A y B independientes, P(A|B) es:", options: [{text:"P(A)",correct:true},{text:"P(B)",correct:false},{text:"1",correct:false},{text:"0",correct:false}], explanation: "B no afecta a A." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Sacas rey, no devuelves, sacas otro rey:", options: [{text:"Dependiente",correct:true},{text:"Independiente",correct:false},{text:"Imposible",correct:false},{text:"Seguro",correct:false}], explanation: "Cambia el total." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Urna: 3 Rojas, 2 Azules. P(Azul|Roja sacada):", options: [{text:"2/4",correct:true},{text:"2/5",correct:false},{text:"1/5",correct:false},{text:"3/5",correct:false}], explanation: "Quedan 4 bolas." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Probabilidad de lluvia dado nubes 80%. P(Lluvia)=:", options: [{text:"Falta info",correct:true},{text:"80%",correct:false},{text:"20%",correct:false},{text:"100%",correct:false}], explanation: "Probabilidad condicional no es absoluta." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "En árbol, ramas secundarias son:", options: [{text:"Condicionales",correct:true},{text:"Absolutas",correct:false},{text:"Uniones",correct:false},{text:"Sumas",correct:false}], explanation: "Dependen del nodo previo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Test médico 99% fiable. Tienes positivo. Prob real enfermedad:", options: [{text:"Depende prevalencia",correct:true},{text:"99%",correct:false},{text:"1%",correct:false},{text:"100%",correct:false}], explanation: "Falacia del fiscal/falsos positivos." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "P(A)=0.5, P(B)=0.6, P(AnB)=0.3. P(A|B):", options: [{text:"0.5",correct:true},{text:"0.6",correct:false},{text:"0.3",correct:false},{text:"0.8",correct:false}], explanation: "0.3/0.6 = 0.5. (Independientes)." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Monty Hall (3 puertas). Cambiar puerta:", options: [{text:"Duplica probabilidad (2/3)",correct:true},{text:"Da igual (1/2)",correct:false},{text:"Disminuye",correct:false},{text:"Asegura ganar",correct:false}], explanation: "El presentador aporta información." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Falsos Negativos afectan:", options: [{text:"Sensibilidad",correct:true},{text:"Especificidad",correct:false},{text:"Prevalencia",correct:false},{text:"Nada",correct:false}], explanation: "No detectar enfermos." }
    ]
  },

  // Bundle 4: Conteo y Combinatoria
  {
    meta: {
      id: "CO-MAT-11-combinatoria-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "estadistica",
      periodo: 4,
      dba_id: "DBA-MAT-11-10",
      title: "Técnicas de Conteo"
    },
    base: { question: "Permutación importa orden, combinación no.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Formas de ordenar ABC:", options: [{text:"6",correct:true},{text:"3",correct:false},{text:"9",correct:false},{text:"1",correct:false}], explanation: "3! = 3x2x1." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Factorial de 4 (4!):", options: [{text:"24",correct:true},{text:"12",correct:false},{text:"4",correct:false},{text:"16",correct:false}], explanation: "4x3x2x1." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Escoger presidente y vice de 10 personas:", options: [{text:"Permutación (90)",correct:true},{text:"Combinación",correct:false},{text:"Suma",correct:false},{text:"Resta",correct:false}], explanation: "Importa quién es presi (orden). 10*9." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Escoger comité de 2 de 10 personas:", options: [{text:"Combinación (45)",correct:true},{text:"Permutación",correct:false},{text:"90",correct:false},{text:"20",correct:false}], explanation: "No importa orden. 90/2." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Combinación C(5, 2):", options: [{text:"10",correct:true},{text:"20",correct:false},{text:"5",correct:false},{text:"2",correct:false}], explanation: "5! / (2!3!) = 120/12 = 10." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Principio multiplicativo: 3 camisas, 2 pantalones:", options: [{text:"6 pintas",correct:true},{text:"5 pintas",correct:false},{text:"3 pintas",correct:false},{text:"2 pintas",correct:false}], explanation: "3 * 2." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Anagramas de 'ANA':", options: [{text:"3",correct:true},{text:"6",correct:false},{text:"1",correct:false},{text:"2",correct:false}], explanation: "3! / 2! (A repetida)." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Placas carro (3 letras, 3 números). Letras 27, Num 10:", options: [{text:"27^3 * 10^3",correct:true},{text:"27*3 + 10*3",correct:false},{text:"Infinitas",correct:false},{text:"27! * 10!",correct:false}], explanation: "Casillas independientes." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Combinación con repetición (helados):", options: [{text:"Fórmula CR(n,k)",correct:true},{text:"n^k",correct:false},{text:"n!",correct:false},{text:"k^n",correct:false}], explanation: "Separadores." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Principio del Palomar (13 personas):", options: [{text:"Al menos 2 mismo mes cumple",correct:true},{text:"Todos diferente",correct:false},{text:"Nada seguro",correct:false},{text:"Probabilidad baja",correct:false}], explanation: "12 meses, 13 personas." }
    ]
  },

  // Bundle 5: Distribución Binomial
  {
    meta: {
      id: "CO-MAT-11-distribucion-binomial-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "estadistica",
      periodo: 4,
      dba_id: "DBA-MAT-11-10",
      title: "Distribución Binomial"
    },
    base: { question: "Binomial modela n ensayos Bernoulli independientes.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Parámetros de binomial:", options: [{text:"n y p",correct:true},{text:"Media y Varianza",correct:false},{text:"Solo n",correct:false},{text:"Solo p",correct:false}], explanation: "Intentos y probabilidad éxito." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Ensayo Bernoulli tiene:", options: [{text:"2 resultados (éxito/fracaso)",correct:true},{text:"3 resultados",correct:false},{text:"Infinitos",correct:false},{text:"Ninguno",correct:false}], explanation: "Binario." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Media de Binomial B(n,p):", options: [{text:"np",correct:true},{text:"npq",correct:false},{text:"n/p",correct:false},{text:"p",correct:false}], explanation: "Esperanza." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Lanzar moneda 10 veces (p=0.5). Media caras:", options: [{text:"5",correct:true},{text:"10",correct:false},{text:"2.5",correct:false},{text:"0",correct:false}], explanation: "10 * 0.5." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Probabilidad 0 éxitos en B(3, 0.5):", options: [{text:"1/8",correct:true},{text:"1/2",correct:false},{text:"0",correct:false},{text:"3/8",correct:false}], explanation: "FFF -> 0.5^3 = 0.125." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Varianza de Binomial:", options: [{text:"np(1-p)",correct:true},{text:"np",correct:false},{text:"n^2",correct:false},{text:"p(1-p)",correct:false}], explanation: "npq." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Forma histograma B(n, 0.5):", options: [{text:"Simétrica",correct:true},{text:"Sesgo derecha",correct:false},{text:"Sesgo izquierda",correct:false},{text:"Plana",correct:false}], explanation: "Campana centrada." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Probabilidad 1 éxito en 5 intentos (p pequeña):", options: [{text:"Fórmula binomial",correct:true},{text:"1",correct:false},{text:"0",correct:false},{text:"5",correct:false}], explanation: "C(5,1) * p^1 * q^4." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Aproximación Normal a Binomial válida si:", options: [{text:"np > 5 y nq > 5",correct:true},{text:"siempre",correct:false},{text:"n es pequeño",correct:false},{text:"p es 0",correct:false}], explanation: "Teorema De Moivre-Laplace." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Distribución Poisson se usa cuando:", options: [{text:"n grande, p muy pequeña",correct:true},{text:"n pequeño",correct:false},{text:"p = 0.5",correct:false},{text:"Eventos continuos",correct:false}], explanation: "Eventos raros." }
    ]
  },

  // Bundle 6: Distribución Normal
  {
    meta: {
      id: "CO-MAT-11-distribucion-normal-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "estadistica",
      periodo: 4,
      dba_id: "DBA-MAT-11-10",
      title: "Distribución Normal"
    },
    base: { question: "La campana de Gauss representa la distribución normal.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Área total bajo campana Gauss:", options: [{text:"1 (100%)",correct:true},{text:"0.5",correct:false},{text:"Infinito",correct:false},{text:"100",correct:false}], explanation: "Probabilidad total." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Simetría normal respecto a:", options: [{text:"Media",correct:true},{text:"Eje Y",correct:false},{text:"Cero siempre",correct:false},{text:"1",correct:false}], explanation: "Centrada en µ." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Porcentaje datos a ±1 desviación (aprox):", options: [{text:"68%",correct:true},{text:"95%",correct:false},{text:"50%",correct:false},{text:"99%",correct:false}], explanation: "Regla empírica." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Porcentaje datos a ±2 desviaciones:", options: [{text:"95%",correct:true},{text:"68%",correct:false},{text:"100%",correct:false},{text:"90%",correct:false}], explanation: "Regla empírica." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Variable Z estándar Z=(x-µ)/σ tiene:", options: [{text:"Media 0, Desviación 1",correct:true},{text:"Media 1, Desviación 0",correct:false},{text:"Media µ",correct:false},{text:"Cualquiera",correct:false}], explanation: "Normal estándar." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Si X=Media, entonces Z es:", options: [{text:"0",correct:true},{text:"1",correct:false},{text:"-1",correct:false},{text:"Indefinido",correct:false}], explanation: "(µ-µ)/σ = 0." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Probabilidad Z < 0:", options: [{text:"0.5",correct:true},{text:"0",correct:false},{text:"1",correct:false},{text:"0.25",correct:false}], explanation: "Mitad izquierda." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Valor crítico Z para 95% confianza (2 colas):", options: [{text:"1.96",correct:true},{text:"1",correct:false},{text:"1.64",correct:false},{text:"2.58",correct:false}], explanation: "Estándar estadística." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Teorema Límite Central dice:", options: [{text:"Promedios tienden a Normal",correct:true},{text:"Datos tienden a Normal",correct:false},{text:"Todo es aleatorio",correct:false},{text:"Media es 0",correct:false}], explanation: "Fundamental en inferencia." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Curtosis normal estándar:", options: [{text:"3 (o exceso 0)",correct:true},{text:"0",correct:false},{text:"1",correct:false},{text:"-3",correct:false}], explanation: "Mesocúrtica." }
    ]
  },

  // Bundle 7: Correlación
  {
    meta: {
      id: "CO-MAT-11-correlacion-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "estadistica",
      periodo: 4,
      dba_id: "DBA-MAT-11-9",
      title: "Correlación Lineal"
    },
    base: { question: "Correlación mide relación lineal entre dos variables.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Coeficiente de Pearson (r) va de:", options: [{text:"-1 a 1",correct:true},{text:"0 a 1",correct:false},{text:"-inf a inf",correct:false},{text:"0 a 100",correct:false}], explanation: "Rango." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "r = 1 significa:", options: [{text:"Correlación positiva perfecta",correct:true},{text:"Sin correlación",correct:false},{text:"Negativa perfecta",correct:false},{text:"Error",correct:false}], explanation: "Línea recta subiendo." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "r = 0 significa:", options: [{text:"No hay correlación lineal",correct:true},{text:"Datos erróneos",correct:false},{text:"Relación fuerte",correct:false},{text:"Variables iguales",correct:false}], explanation: "Nube dispersa." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Nube de puntos bajando izquierda a derecha:", options: [{text:"Correlación negativa",correct:true},{text:"Positiva",correct:false},{text:"Nula",correct:false},{text:"Curvilínea",correct:false}], explanation: "Pendiente negativa." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "¿Correlación implica causalidad?", options: [{text:"No necesariamente",correct:true},{text:"Sí, siempre",correct:false},{text:"Solo si r=1",correct:false},{text:"Nunca",correct:false}], explanation: "Falacia post hoc." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Coeficiente determinación R^2:", options: [{text:"% varianza explicada",correct:true},{text:"Raíz de r",correct:false},{text:"Error",correct:false},{text:"Suma cuadrados",correct:false}], explanation: "Ajuste del modelo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Si y = 2x + 1, r es:", options: [{text:"1",correct:true},{text:"2",correct:false},{text:"0.5",correct:false},{text:"0",correct:false}], explanation: "Relación lineal exacta positiva." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Valores atípicos (outliers) afectan r:", options: [{text:"Mucho",correct:true},{text:"Poco",correct:false},{text:"Nada",correct:false},{text:"Mejoran ajuste",correct:false}], explanation: "Sensible a extremos." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Correlación de Spearman usa:", options: [{text:"Rangos (orden)",correct:true},{text:"Valores brutos",correct:false},{text:"Promedios",correct:false},{text:"Normalidad",correct:false}], explanation: "No paramétrica." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Regresión a la media:", options: [{text:"Extremos tienden a volver al promedio",correct:true},{text:"Error de cálculo",correct:false},{text:"Sesgo",correct:false},{text:"Paradoja",correct:false}], explanation: "Fenómeno estadístico." }
    ]
  },

  // Bundle 8: Inferencia Básica
  {
    meta: {
      id: "CO-MAT-11-inferencia-basica-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "estadistica",
      periodo: 4,
      dba_id: "DBA-MAT-11-9",
      title: "Introducción a la Inferencia"
    },
    base: { question: "Inferencia concluye sobre población usando muestra.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Muestra debe ser:", options: [{text:"Representativa",correct:true},{text:"Grande siempre",correct:false},{text:"Pequeña",correct:false},{text:"Sesgada",correct:false}], explanation: "Para generalizar." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Censo estudia:", options: [{text:"Toda la población",correct:true},{text:"Una muestra",correct:false},{text:"La mitad",correct:false},{text:"Al azar",correct:false}], explanation: "Totalidad." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Error muestral:", options: [{text:"Inevitable al usar muestras",correct:true},{text:"Error humano",correct:false},{text:"Evitable siempre",correct:false},{text:"Cero",correct:false}], explanation: "Diferencia estadístico vs parámetro." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Variable cualitativa:", options: [{text:"Color de ojos",correct:true},{text:"Estatura",correct:false},{text:"Peso",correct:false},{text:"Edad",correct:false}], explanation: "No numérica." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Muestreo aleatorio simple:", options: [{text:"Todos igual probabilidad",correct:true},{text:"A dedo",correct:false},{text:"Por conveniencia",correct:false},{text:"Grupos",correct:false}], explanation: "Sorteo justo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Intervalo de confianza:", options: [{text:"Rango donde estaría el parámetro",correct:true},{text:"Valor exacto",correct:false},{text:"Error",correct:false},{text:"Probabilidad 100",correct:false}], explanation: "Estimación con margen." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Hipótesis Nula (H0):", options: [{text:"No hay efecto / Status quo",correct:true},{text:"Lo que quiero probar",correct:false},{text:"Falsa",correct:false},{text:"Verdadera",correct:false}], explanation: "Se rechaza o no." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "P-valor < 0.05 implica:", options: [{text:"Rechazar H0 (Significativo)",correct:true},{text:"Aceptar H0",correct:false},{text:"Error",correct:false},{text:"Prob 5%",correct:false}], explanation: "Evidencia fuerte contra H0." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Error Tipo I:", options: [{text:"Falso Positivo (Rechazar H0 cierta)",correct:true},{text:"Falso Negativo",correct:false},{text:"Aceptar H0 falsa",correct:false},{text:"Ninguno",correct:false}], explanation: "Alarma falsa." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Potencia de la prueba:", options: [{text:"Prob rechazar H0 falsa (1-beta)",correct:true},{text:"Prob aceptar H0",correct:false},{text:"Nivel significancia",correct:false},{text:"Tamaño muestra",correct:false}], explanation: "Capacidad de detectar efecto." }
    ]
  },

  // Bundle 9: Matemáticas Financieras (Contexto)
  {
    meta: {
      id: "CO-MAT-11-financiera-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "estadistica",
      periodo: 4,
      dba_id: "DBA-MAT-11-2",
      title: "Matemáticas Financieras Básicas"
    },
    base: { question: "Interés compuesto capitaliza intereses.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Interés simple formula:", options: [{text:"I = Cit",correct:true},{text:"I = C(1+i)^t",correct:false},{text:"I = C+i",correct:false},{text:"I = Ci/t",correct:false}], explanation: "Lineal." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Tasa 10% decimal:", options: [{text:"0.1",correct:true},{text:"10",correct:false},{text:"0.01",correct:false},{text:"1",correct:false}], explanation: "Dividir por 100." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Préstamo con interés compuesto crece:", options: [{text:"Exponencialmente",correct:true},{text:"Linealmente",correct:false},{text:"Constante",correct:false},{text:"Baja",correct:false}], explanation: "Interés sobre interés." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Inflación afecta:", options: [{text:"Poder adquisitivo",correct:true},{text:"Tasa interés",correct:false},{text:"Nada",correct:false},{text:"Solo bancos",correct:false}], explanation: "Dinero vale menos." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Valor futuro (VF) compuesto:", options: [{text:"VP(1+i)^n",correct:true},{text:"VP(1+in)",correct:false},{text:"VP+i",correct:false},{text:"VP/i",correct:false}], explanation: "Fórmula base." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Tasa Efectiva Anual (E.A.) vs Nominal:", options: [{text:"Efectiva incluye capitalización",correct:true},{text:"Son iguales",correct:false},{text:"Nominal es mayor",correct:false},{text:"Ninguna",correct:false}], explanation: "Real vs facial." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "VPN (Valor Presente Neto) > 0 implica:", options: [{text:"Proyecto rentable",correct:true},{text:"Pérdida",correct:false},{text:"Indiferente",correct:false},{text:"Deuda",correct:false}], explanation: "Gana valor." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Anualidad es:", options: [{text:"Pagos iguales periódicos",correct:true},{text:"Pago único anual",correct:false},{text:"Interés variable",correct:false},{text:"Impuesto",correct:false}], explanation: "Cuotas fijas." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "TIR (Tasa Interna Retorno):", options: [{text:"Tasa que hace VPN=0",correct:true},{text:"Ganancia total",correct:false},{text:"Interés banco",correct:false},{text:"Riesgo",correct:false}], explanation: "Rentabilidad intrínseca." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Amortización francesa:", options: [{text:"Cuota fija",correct:true},{text:"Capital fijo",correct:false},{text:"Interés fijo",correct:false},{text:"Cuota creciente",correct:false}], explanation: "Común en hipotecas." }
    ]
  },

  // Bundle 10: Repaso General (Saber 11 Mix)
  {
    meta: {
      id: "CO-MAT-11-saber-mix-001",
      country: "co",
      grade: 11,
      subject: "matematicas",
      topic: "general",
      periodo: 4,
      dba_id: "DBA-MAT-11-MIX",
      title: "Simulacro General Saber 11"
    },
    base: { question: "Preguntas tipo ICFES integradas.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 3, type: "Media A", question: "Interpretación gráfica (Barras):", options: [{text:"Comparar alturas",correct:true},{text:"Sumar todo",correct:false},{text:"Ver colores",correct:false},{text:"Nada",correct:false}], explanation: "Lectura literal." },
      { id_suffix: "v2", difficulty: 3, type: "Media B", question: "Geometría: Área sombreada cuadrado-círculo:", options: [{text:"L^2 - πr^2",correct:true},{text:"L^2 + πr^2",correct:false},{text:"πr^2",correct:false},{text:"L^2",correct:false}], explanation: "Resta de áreas." },
      { id_suffix: "v3", difficulty: 3, type: "Media A", question: "Probabilidad simple dados:", options: [{text:"Favorables/Posibles",correct:true},{text:"Posibles/Favorables",correct:false},{text:"Suma",correct:false},{text:"Resta",correct:false}], explanation: "Laplace." },
      { id_suffix: "v4", difficulty: 4, type: "Difícil B", question: "Función lineal costo taxi:", options: [{text:"C(x) = fijo + var*km",correct:true},{text:"C(x) = fijo",correct:false},{text:"C(x) = var*km",correct:false},{text:"Cuadrática",correct:false}], explanation: "Modelo afín." },
      { id_suffix: "v5", difficulty: 4, type: "Difícil A", question: "Porcentajes descuentos sucesivos 10% y 10%:", options: [{text:"19% total",correct:true},{text:"20% total",correct:false},{text:"10%",correct:false},{text:"100%",correct:false}], explanation: "0.9 * 0.9 = 0.81." },
      { id_suffix: "v6", difficulty: 4, type: "Difícil B", question: "Ecuación cuadrática visual (cortes X):", options: [{text:"Raíces",correct:true},{text:"Vértice",correct:false},{text:"Ordenada",correct:false},{text:"Pendiente",correct:false}], explanation: "Soluciones reales." },
      { id_suffix: "v7", difficulty: 5, type: "Muy Difícil A", question: "Optimización sin derivada (lógica):", options: [{text:"Buscar punto equilibrio",correct:true},{text:"Adivinar",correct:false},{text:"Siempre el mayor",correct:false},{text:"Siempre el menor",correct:false}], explanation: "Pensamiento variacional." },
      { id_suffix: "v8", difficulty: 5, type: "Muy Difícil B", question: "Lógica proposicional:", options: [{text:"p -> q eq ~q -> ~p",correct:true},{text:"p -> q eq q -> p",correct:false},{text:"Siempre v",correct:false},{text:"Falso",correct:false}], explanation: "Contrarrecíproca." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Análisis de tendencias tabla:", options: [{text:"Crecimiento porcentual",correct:true},{text:"Valor absoluto",correct:false},{text:"Solo el último",correct:false},{text:"Promedio simple",correct:false}], explanation: "Razonamiento cuantitativo." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Problema mezcla (razones):", options: [{text:"Proporciones",correct:true},{text:"Sumas",correct:false},{text:"Restas",correct:false},{text:"Azar",correct:false}], explanation: "Regla de tres compuesta." }
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
    console.log(`✅ Created Period 4 Bundle v3.0: ${fullPath}`);
});
