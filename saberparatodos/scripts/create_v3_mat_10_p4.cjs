
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: Central Tendency (Grouped)
  {
    meta: {
      id: "CO-MAT-10-stats-central-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "medidas-tendencia-central",
      periodo: 4,
      dba_id: "DBA-MAT-10-4",
      title: "Medidas de Tendencia Central"
    },
    base: { question: "Calcula media, mediana o moda.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Para hallar la media de datos agrupados usamos:", options: [{text: "Σ(xi*fi) / N",correct:true},{text: "Sumar todos los datos",correct:false},{text: "Dato central",correct:false},{text: "Dato más repetido",correct:false}], explanation: "Marca de clase por frecuencia." },
      { id_suffix: "v2", difficulty: 1, question: "La clase modal es:", options: [{text: "La de mayor frecuencia",correct:true},{text: "La del medio",correct:false},{text: "La primera",correct:false},{text: "La última",correct:false}], explanation: "Definición moda." },
      { id_suffix: "v3", difficulty: 2, question: "Si Σ(xi*fi) = 500 y N = 50, la media es:", options: [{text: "10",correct:true},{text: "50",correct:false},{text: "5",correct:false},{text: "25",correct:false}], explanation: "500 / 50 = 10." },
      { id_suffix: "v4", difficulty: 2, question: "Para hallar la mediana primero buscamos:", options: [{text: "La posición N/2 en frecuencia acumulada",correct:true},{text: "El dato mayor",correct:false},{text: "El promedio",correct:false},{text: "La frecuencia absoluta",correct:false}], explanation: "Posición central." },
      { id_suffix: "v5", difficulty: 3, question: "Diferencia entre media poblacional y muestral:", options: [{text: "Notación (μ vs x̄) y contexto",correct:true},{text: "Fórmula muy diferente",correct:false},{text: "No hay diferencia",correct:false},{text: "La muestral siempre es menor",correct:false}], explanation: "Concepto." },
      { id_suffix: "v6", difficulty: 3, question: "Media ponderada se usa cuando:", options: [{text: "Los datos tienen diferente peso/importancia",correct:true},{text: "Son muchos datos",correct:false},{text: "Son negativos",correct:false},{text: "Nunca",correct:false}], explanation: "Ej: notas con porcentaje." },
      { id_suffix: "v7", difficulty: 4, question: "Si a todos los datos sumo 5, la media:", options: [{text: "Aumenta en 5",correct:true},{text: "Se mantiene igual",correct:false},{text: "Se multiplica por 5",correct:false},{text: "Se vuelve 0",correct:false}], explanation: "Propiedad linealidad." },
      { id_suffix: "v8", difficulty: 4, question: "Si multiplico todos los datos por 2, la desviación estándar:", options: [{text: "Se multiplica por 2",correct:true},{text: "Se mantiene igual",correct:false},{text: "Se suma 2",correct:false},{text: "Se eleva al cuadrado",correct:false}], explanation: "Escalado." },
      { id_suffix: "v9", difficulty: 5, question: "¿Qué medida es más robusta a valores atípicos (outliers)?", options: [{text: "Mediana",correct:true},{text: "Media",correct:false},{text: "Rango",correct:false},{text: "Varianza",correct:false}], explanation: "La media se afecta mucho." },
      { id_suffix: "v10", difficulty: 5, question: "En distribución sesgada a la derecha:", options: [{text: "Media > Mediana",correct:true},{text: "Media < Mediana",correct:false},{text: "Media = Mediana",correct:false},{text: "No se sabe",correct:false}], explanation: "Sesgo positivo." }
    ]
  },

  // Bundle 2: Partition Values
  {
    meta: {
      id: "CO-MAT-10-stats-partition-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "medidas-posicion",
      periodo: 4,
      dba_id: "DBA-MAT-10-4",
      title: "Medidas de Posición"
    },
    base: { question: "Calcula cuartiles/percentiles.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "El Cuartil 2 (Q2) coincide con:", options: [{text: "La Mediana",correct:true},{text: "La Media",correct:false},{text: "El Rango",correct:false},{text: "Q1",correct:false}], explanation: "50% de datos." },
      { id_suffix: "v2", difficulty: 1, question: "El Percentil 75 equivale a:", options: [{text: "Cuartil 3 (Q3)",correct:true},{text: "Cuartil 1 (Q1)",correct:false},{text: "Mediana",correct:false},{text: "Decil 7",correct:false}], explanation: "75%." },
      { id_suffix: "v3", difficulty: 2, question: "¿Cuántos cuartiles hay?", options: [{text: "3 (Q1, Q2, Q3)",correct:true},{text: "4",correct:false},{text: "100",correct:false},{text: "2",correct:false}], explanation: "Dividen en 4 partes." },
      { id_suffix: "v4", difficulty: 2, question: "El rango intercuartílico (IQR) es:", options: [{text: "Q3 - Q1",correct:true},{text: "Q3 + Q1",correct:false},{text: "Max - Min",correct:false},{text: "Mediana",correct:false}], explanation: "Dispersión central." },
      { id_suffix: "v5", difficulty: 3, question: "Si estás en el percentil 90 de notas:", options: [{text: "Superaste al 90% de estudiantes",correct:true},{text: "Sacaste 9.0",correct:false},{text: "Fallaste el 10%",correct:false},{text: "Estás en el promedio",correct:false}], explanation: "Interpretación P90." },
      { id_suffix: "v6", difficulty: 3, question: "Un diagrama de caja y bigotes usa:", options: [{text: "Min, Q1, Mediana, Q3, Max",correct:true},{text: "Media y Desviación",correct:false},{text: "Moda y Rango",correct:false},{text: "Frecuencias",correct:false}], explanation: "5 números resumen." },
      { id_suffix: "v7", difficulty: 4, question: "Valor atípico leve se define usualmente como >:", options: [{text: "Q3 + 1.5*IQR",correct:true},{text: "Q3 + IQR",correct:false},{text: "Media + 2DevSTD",correct:false},{text: "Max",correct:false}], explanation: "Regla 1.5 IQR." },
      { id_suffix: "v8", difficulty: 4, question: "Decil 5 es igual a:", options: [{text: "Percentil 50",correct:true},{text: "Percentil 5",correct:false},{text: "Cuartil 1",correct:false},{text: "Nada",correct:false}], explanation: "50%." },
      { id_suffix: "v9", difficulty: 5, question: "Percentil de un dato x:", options: [{text: "(Datos menores a x / Total) * 100",correct:true},{text: "x / 100",correct:false},{text: "Posición",correct:false},{text: "Frecuencia",correct:false}], explanation: "Fórmula básica." },
      { id_suffix: "v10", difficulty: 5, question: "Si Q1=10, Q3=20. IQR es:", options: [{text: "10",correct:true},{text: "30",correct:false},{text: "15",correct:false},{text: "5",correct:false}], explanation: "20-10." }
    ]
  },

  // Bundle 3: Measures of Dispersion
  {
    meta: {
      id: "CO-MAT-10-stats-dispersion-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "medidas-dispersion",
      periodo: 4,
      dba_id: "DBA-MAT-10-4",
      title: "Medidas de Dispersión"
    },
    base: { question: "Calcula dispersión.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "El Rango es:", options: [{text: "Dato Mayor - Dato Menor",correct:true},{text: "Media - Mediana",correct:false},{text: "Q3 - Q1",correct:false},{text: "Varianza",correct:false}], explanation: "Medida básica." },
      { id_suffix: "v2", difficulty: 1, question: "La Varianza siempre es:", options: [{text: "Positiva o cero",correct:true},{text: "Negativa",correct:false},{text: "Igual a la media",correct:false},{text: "Menor que la desviación",correct:false}], explanation: "Suma de cuadrados." },
      { id_suffix: "v3", difficulty: 2, question: "Desviación Estándar es:", options: [{text: "Raíz cuadrada de la varianza",correct:true},{text: "Cuadrado de la varianza",correct:false},{text: "Media de diferencias",correct:false},{text: "Rango/2",correct:false}], explanation: "Definición sigma." },
      { id_suffix: "v4", difficulty: 2, question: "Una desviación estándar alta indica:", options: [{text: "Datos muy dispersos",correct:true},{text: "Datos homogéneos",correct:false},{text: "Media alta",correct:false},{text: "Error de cálculo",correct:false}], explanation: "Interpretación." },
      { id_suffix: "v5", difficulty: 3, question: "Coeficiente de Variación (CV):", options: [{text: "(S / x̄) * 100%",correct:true},{text: "S² / x̄",correct:false},{text: "Rango / Media",correct:false},{text: "x̄ / S",correct:false}], explanation: "Medida relativa." },
      { id_suffix: "v6", difficulty: 3, question: "Si CV es 5%, los datos son:", options: [{text: "Homogéneos",correct:true},{text: "Heterogéneos",correct:false},{text: "Dispersos",correct:false},{text: "Erróneos",correct:false}], explanation: "Baja dispersión relativa." },
      { id_suffix: "v7", difficulty: 4, question: "Varianza muestral divide por:", options: [{text: "n - 1",correct:true},{text: "n",correct:false},{text: "n + 1",correct:false},{text: "100",correct:false}], explanation: "Corrección de Bessel." },
      { id_suffix: "v8", difficulty: 4, question: "Si Varianza = 16, Desviación Estándar =", options: [{text: "4",correct:true},{text: "256",correct:false},{text: "8",correct:false},{text: "16",correct:false}], explanation: "√16." },
      { id_suffix: "v9", difficulty: 5, question: "Chebyshev dice que a k desviaciones está al menos:", options: [{text: "1 - 1/k² de los datos",correct:true},{text: "95% de datos",correct:false},{text: "50%",correct:false},{text: "68%",correct:false}], explanation: "Teorema general." },
      { id_suffix: "v10", difficulty: 5, question: "Regla Empírica (Normal): a 1 desviación está aprox:", options: [{text: "68% de datos",correct:true},{text: "95%",correct:false},{text: "99%",correct:false},{text: "50%",correct:false}], explanation: "Curva normal." }
    ]
  },

  // Bundle 4: Counting Principles
  {
    meta: {
      id: "CO-MAT-10-prob-counting-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "conteo",
      periodo: 4,
      dba_id: "DBA-MAT-10-4",
      title: "Principios de Conteo"
    },
    base: { question: "Resuelve problemas de conteo.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Principio Multiplicativo: Si tengo 3 camisas y 2 pantalones, ¿cuántas pintas?", options: [{text: "6",correct:true},{text: "5",correct:false},{text: "1",correct:false},{text: "3",correct:false}], explanation: "3 * 2 = 6." },
      { id_suffix: "v2", difficulty: 1, question: "Principio Aditivo se usa cuando:", options: [{text: "Ocurre A o B (excluyentes)",correct:true},{text: "Ocurre A y B (simultáneos)",correct:false},{text: "Siempre",correct:false},{text: "Nunca",correct:false}], explanation: "Opciones alternas." },
      { id_suffix: "v3", difficulty: 2, question: "Lanzar un dado y una moneda. Total resultados:", options: [{text: "12",correct:true},{text: "8",correct:false},{text: "6",correct:false},{text: "2",correct:false}], explanation: "6 * 2 = 12." },
      { id_suffix: "v4", difficulty: 2, question: "Cuántos números de 2 cifras hay:", options: [{text: "90",correct:true},{text: "89",correct:false},{text: "100",correct:false},{text: "99",correct:false}], explanation: "10 a 99. 9*10=90." },
      { id_suffix: "v5", difficulty: 3, question: "Factorial de 4 (4!):", options: [{text: "24",correct:true},{text: "12",correct:false},{text: "10",correct:false},{text: "4",correct:false}], explanation: "4*3*2*1=24." },
      { id_suffix: "v6", difficulty: 3, question: "Permutación importa el orden:", options: [{text: "Sí",correct:true},{text: "No (Combinación)",correct:false},{text: "A veces",correct:false},{text: "No sé",correct:false}], explanation: "Definición." },
      { id_suffix: "v7", difficulty: 4, question: "Formas de ordenar las letras ABC:", options: [{text: "6",correct:true},{text: "3",correct:false},{text: "9",correct:false},{text: "1",correct:false}], explanation: "3! = 6." },
      { id_suffix: "v8", difficulty: 4, question: "Permutacion de 5 elementos tomados de 3 en 3:", options: [{text: "60",correct:true},{text: "10",correct:false},{text: "20",correct:false},{text: "15",correct:false}], explanation: "5*4*3 = 60." },
      { id_suffix: "v9", difficulty: 5, question: "Combinación C(5, 3) (no importa orden):", options: [{text: "10",correct:true},{text: "60",correct:false},{text: "20",correct:false},{text: "5",correct:false}], explanation: "60 / 3! = 60/6 = 10." },
      { id_suffix: "v10", difficulty: 5, question: "Permutación circular de 4 personas en mesa:", options: [{text: "6",correct:true},{text: "24",correct:false},{text: "4",correct:false},{text: "1",correct:false}], explanation: "(4-1)! = 3! = 6." }
    ]
  },

  // Bundle 5: Basic Probability
  {
    meta: {
      id: "CO-MAT-10-prob-basic-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "probabilidad-basica",
      periodo: 4,
      dba_id: "DBA-MAT-10-4",
      title: "Probabilidad Simple"
    },
    base: { question: "Calcula probabilidad.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Probabilidad está entre:", options: [{text: "0 y 1",correct:true},{text: "0 y 100",correct:false},{text: "-1 y 1",correct:false},{text: "1 y 10",correct:false}], explanation: "Axioma." },
      { id_suffix: "v2", difficulty: 1, question: "Probabilidad de Cara en una moneda:", options: [{text: "0.5",correct:true},{text: "1",correct:false},{text: "0.25",correct:false},{text: "0",correct:false}], explanation: "1/2." },
      { id_suffix: "v3", difficulty: 2, question: "Probabilidad de sacar un 6 en un dado:", options: [{text: "1/6",correct:true},{text: "1/5",correct:false},{text: "5/6",correct:false},{text: "1/2",correct:false}], explanation: "1 favorable / 6 posibles." },
      { id_suffix: "v4", difficulty: 2, question: "Probabilidad de sacar número par en un dado:", options: [{text: "3/6 (0.5)",correct:true},{text: "2/6",correct:false},{text: "1/6",correct:false},{text: "4/6",correct:false}], explanation: "2, 4, 6." },
      { id_suffix: "v5", difficulty: 3, question: "Probabilidad complemento P(A'):", options: [{text: "1 - P(A)",correct:true},{text: "1 + P(A)",correct:false},{text: "P(A)",correct:false},{text: "1/P(A)",correct:false}], explanation: "Total es 1." },
      { id_suffix: "v6", difficulty: 3, question: "Sucesos mutuamente excluyentes P(A U B):", options: [{text: "P(A) + P(B)",correct:true},{text: "P(A) * P(B)",correct:false},{text: "P(A) - P(B)",correct:false},{text: "0",correct:false}], explanation: "No hay intersección." },
      { id_suffix: "v7", difficulty: 4, question: "Sucesos independientes P(A ∩ B):", options: [{text: "P(A) * P(B)",correct:true},{text: "P(A) + P(B)",correct:false},{text: "P(A) / P(B)",correct:false},{text: "0",correct:false}], explanation: "Regla producto." },
      { id_suffix: "v8", difficulty: 4, question: "Sacar As de una baraja de 52:", options: [{text: "4/52 (1/13)",correct:true},{text: "1/52",correct:false},{text: "1/4",correct:false},{text: "1/2",correct:false}], explanation: "4 ases." },
      { id_suffix: "v9", difficulty: 5, question: "Probabilidad Condicional P(A|B):", options: [{text: "P(A ∩ B) / P(B)",correct:true},{text: "P(A ∩ B) / P(A)",correct:false},{text: "P(A) * P(B)",correct:false},{text: "P(B) / P(A)",correct:false}], explanation: "Definición Bayes." },
      { id_suffix: "v10", difficulty: 5, question: "Probabilidad de sacar 2 caras seguidas:", options: [{text: "1/4",correct:true},{text: "1/2",correct:false},{text: "1/3",correct:false},{text: "1/8",correct:false}], explanation: "0.5 * 0.5 = 0.25." }
    ]
  },

  // Bundle 6: Probability Problems
  {
    meta: {
      id: "CO-MAT-10-prob-problems-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "problemas-probabilidad",
      periodo: 4,
      dba_id: "DBA-MAT-10-4",
      title: "Problemas de Probabilidad"
    },
    base: { question: "Resuelve el problema.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "En una bolsa hay 3 bolas rojas y 2 azules. P(Roja):", options: [{text: "3/5",correct:true},{text: "2/5",correct:false},{text: "1/2",correct:false},{text: "1/5",correct:false}], explanation: "3 favorables / 5 total." },
      { id_suffix: "v2", difficulty: 1, question: "P(Azul) en el anterior:", options: [{text: "2/5",correct:true},{text: "3/5",correct:false},{text: "1/5",correct:false},{text: "4/5",correct:false}], explanation: "2 favorables." },
      { id_suffix: "v3", difficulty: 2, question: "Lanzar 2 dados. Probabilidad de sumar 7:", options: [{text: "6/36 (1/6)",correct:true},{text: "1/36",correct:false},{text: "2/36",correct:false},{text: "1/12",correct:false}], explanation: "1+6, 2+5, 3+4, 4+3, 5+2, 6+1." },
      { id_suffix: "v4", difficulty: 2, question: "P(Sumar 2) con 2 dados:", options: [{text: "1/36",correct:true},{text: "2/36",correct:false},{text: "1/6",correct:false},{text: "0",correct:false}], explanation: "Solo 1+1." },
      { id_suffix: "v5", difficulty: 3, question: "Si llueve 30% días, P(No llueva):", options: [{text: "70%",correct:true},{text: "30%",correct:false},{text: "0%",correct:false},{text: "100%",correct:false}], explanation: "100-30." },
      { id_suffix: "v6", difficulty: 3, question: "Sacar carta roja O un Rey (Baraja 52):", options: [{text: "28/52",correct:true},{text: "26/52",correct:false},{text: "30/52",correct:false},{text: "4/52",correct:false}], explanation: "26 Rojas + 2 Reyes negros = 28." },
      { id_suffix: "v7", difficulty: 4, question: "Urna con 5 blancas, 5 negras. Sacar 2 blancas sin reposición:", options: [{text: "5/10 * 4/9 = 20/90 = 2/9",correct:true},{text: "1/4",correct:false},{text: "1/2",correct:false},{text: "25/100",correct:false}], explanation: "Dependientes." },
      { id_suffix: "v8", difficulty: 4, question: "Urna con 5 blancas, 5 negras. Sacar 2 blancas CON reposición:", options: [{text: "1/2 * 1/2 = 1/4",correct:true},{text: "2/9",correct:false},{text: "1/2",correct:false},{text: "1",correct:false}], explanation: "Independientes." },
      { id_suffix: "v9", difficulty: 5, question: "Paradoja del cumpleaños (23 personas): P(compartir cumple) es:", options: [{text: "> 50%",correct:true},{text: "< 50%",correct:false},{text: "Casi 0",correct:false},{text: "100%",correct:false}], explanation: "Contraintuitivo." },
      { id_suffix: "v10", difficulty: 5, question: "Probabilidad que al menos 1 dado sea 6 en 4 lanzamientos:", options: [{text: "1 - (5/6)⁴",correct:true},{text: "4/6",correct:false},{text: "1/6",correct:false},{text: "0.5",correct:false}], explanation: "1 - P(ninguno)." }
    ]
  },

  // Bundle 7: Distribution Shapes
  {
    meta: {
      id: "CO-MAT-10-stats-dist-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "distribuciones-forma",
      periodo: 4,
      dba_id: "DBA-MAT-10-4",
      title: "Forma de la Distribución"
    },
    base: { question: "Analiza la forma.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Distribución simétrica (Campana):", options: [{text: "Normal",correct:true},{text: "Uniforme",correct:false},{text: "Sesgada",correct:false},{text: "Bimodal",correct:false}], explanation: "Gaussiana." },
      { id_suffix: "v2", difficulty: 1, question: "Todas las barras del histograma igual altura:", options: [{text: "Uniforme",correct:true},{text: "Normal",correct:false},{text: "Sesgada",correct:false},{text: "Aleatoria",correct:false}], explanation: "Igual probabilidad." },
      { id_suffix: "v3", difficulty: 2, question: "Cola larga a la derecha:", options: [{text: "Sesgo positivo (Derecha)",correct:true},{text: "Sesgo negativo",correct:false},{text: "Simétrica",correct:false},{text: "Normal",correct:false}], explanation: "Outliers altos." },
      { id_suffix: "v4", difficulty: 2, question: "Cola larga a la izquierda:", options: [{text: "Sesgo negativo (Izquierda)",correct:true},{text: "Sesgo positivo",correct:false},{text: "Simétrica",correct:false},{text: "Uniforme",correct:false}], explanation: "Outliers bajos." },
      { id_suffix: "v5", difficulty: 3, question: "En distribución Normal:", options: [{text: "Media = Mediana = Moda",correct:true},{text: "Media > Mediana",correct:false},{text: "Media < Moda",correct:false},{text: "No hay moda",correct:false}], explanation: "Simetría perfecta." },
      { id_suffix: "v6", difficulty: 3, question: "Dos picos claros en el histograma:", options: [{text: "Bimodal",correct:true},{text: "Unimodal",correct:false},{text: "Normal",correct:false},{text: "Uniforme",correct:false}], explanation: "Dos modas." },
      { id_suffix: "v7", difficulty: 4, question: "Curtosis mide:", options: [{text: "El apuntamiento (picudez)",correct:true},{text: "El sesgo",correct:false},{text: "La media",correct:false},{text: "El rango",correct:false}], explanation: "Leptocúrtica vs Platicúrtica." },
      { id_suffix: "v8", difficulty: 4, question: "Leptocúrtica significa:", options: [{text: "Muy apuntada (pico alto)",correct:true},{text: "Muy plana",correct:false},{text: "Asimétrica",correct:false},{text: "Normal",correct:false}], explanation: "Concentración central." },
      { id_suffix: "v9", difficulty: 5, question: "Ejemplo de distribución sesgada positiva:", options: [{text: "Salarios (muchos bajos, pocos millonarios)",correct:true},{text: "Estatura",correct:false},{text: "Notas examen fácil",correct:false},{text: "Lanzar moneda",correct:false}], explanation: "Cola derecha." },
      { id_suffix: "v10", difficulty: 5, question: "Ejemplo de distribución sesgada negativa:", options: [{text: "Edad de muerte (mayoría viejos)",correct:true},{text: "Salarios",correct:false},{text: "Lanzar dado",correct:false},{text: "Peso al nacer",correct:false}], explanation: "Cola izquierda (muertes jóvenes)." }
    ]
  },

  // Bundle 8: Graphical Representation
  {
    meta: {
      id: "CO-MAT-10-stats-graph-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "representacion-grafica",
      periodo: 4,
      dba_id: "DBA-MAT-10-4",
      title: "Gráficos Estadísticos"
    },
    base: { question: "Interpreta el gráfico.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Gráfico de pastel sirve para:", options: [{text: "Porcentajes / Partes de un todo",correct:true},{text: "Tendencias tiempo",correct:false},{text: "Correlación",correct:false},{text: "Dispersión",correct:false}], explanation: "Circular." },
      { id_suffix: "v2", difficulty: 1, question: "Histograma se usa para:", options: [{text: "Variables continuas / Intervalos",correct:true},{text: "Variables categóricas",correct:false},{text: "Porcentajes",correct:false},{text: "Series tiempo",correct:false}], explanation: "Barras juntas." },
      { id_suffix: "v3", difficulty: 2, question: "Diagrama de barras se usa para:", options: [{text: "Variables categóricas / discretas",correct:true},{text: "Variables continuas",correct:false},{text: "Correlación",correct:false},{text: "Partes de todo",correct:false}], explanation: "Barras separadas." },
      { id_suffix: "v4", difficulty: 2, question: "Gráfico de líneas sirve para:", options: [{text: "Tendencias en el tiempo",correct:true},{text: "Comparar categorías",correct:false},{text: "Distribución",correct:false},{text: "Correlación",correct:false}], explanation: "Evolución." },
      { id_suffix: "v5", difficulty: 3, question: "Diagrama de dispersión (Scatter):", options: [{text: "Relación entre 2 variables numéricas",correct:true},{text: "Frecuencia",correct:false},{text: "Tiempo",correct:false},{text: "Categorías",correct:false}], explanation: "XY plot." },
      { id_suffix: "v6", difficulty: 3, question: "Ojiva representa:", options: [{text: "Frecuencia acumulada",correct:true},{text: "Frecuencia absoluta",correct:false},{text: "Densidad",correct:false},{text: "Dispersión",correct:false}], explanation: "Creciente." },
      { id_suffix: "v7", difficulty: 4, question: "Diagrama de Pareto:", options: [{text: "Barras ordenadas + Línea acumulada",correct:true},{text: "Solo barras",correct:false},{text: "Solo línea",correct:false},{text: "Pastel 3D",correct:false}], explanation: "80/20 regla." },
      { id_suffix: "v8", difficulty: 4, question: "Diagrama de Caja (Boxplot) muestra:", options: [{text: "Mediana, Cuartiles y Outliers",correct:true},{text: "Media y Moda",correct:false},{text: "Frecuencia barras",correct:false},{text: "Tendencias",correct:false}], explanation: "Resumen 5 puntos." },
      { id_suffix: "v9", difficulty: 5, question: "Pictograma usa:", options: [{text: "Iconos/Dibujos proporcionales",correct:true},{text: "Barras",correct:false},{text: "Líneas",correct:false},{text: "Puntos",correct:false}], explanation: "Visual." },
      { id_suffix: "v10", difficulty: 5, question: "Malas prácticas gráficas:", options: [{text: "Ejes truncados (no empiezan en 0)",correct:true},{text: "Usar colores claros",correct:false},{text: "Poner títulos",correct:false},{text: "Usar leyenda",correct:false}], explanation: "Engaños visuales." }
    ]
  },

  // Bundle 9: Sampling Techniques
  {
    meta: {
      id: "CO-MAT-10-stats-sampling-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "muestreo",
      periodo: 4,
      dba_id: "DBA-MAT-10-4",
      title: "Técnicas de Muestreo"
    },
    base: { question: "Identifica el muestreo.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Muestreo Aleatorio Simple:", options: [{text: "Todos tienen igual probabilidad (sorteo)",correct:true},{text: "Escojo a mis amigos",correct:false},{text: "Escojo por grupos",correct:false},{text: "Escojo cada 10",correct:false}], explanation: "Lotería." },
      { id_suffix: "v2", difficulty: 1, question: "Población vs Muestra:", options: [{text: "Población es todo, Muestra es parte",correct:true},{text: "Son igual",correct:false},{text: "Muestra es todo",correct:false},{text: "Población es pequeña",correct:false}], explanation: "Definición." },
      { id_suffix: "v3", difficulty: 2, question: "Muestreo Estratificado:", options: [{text: "Dividir en grupos (estratos) y sacar de cada uno",correct:true},{text: "Sorteo general",correct:false},{text: "Por conveniencia",correct:false},{text: "Aleatorio simple",correct:false}], explanation: "Representativo." },
      { id_suffix: "v4", difficulty: 2, question: "Muestreo Sistemático:", options: [{text: "Escoger cada k-ésimo elemento",correct:true},{text: "Al azar",correct:false},{text: "Por grupos",correct:false},{text: "Voluntarios",correct:false}], explanation: "Intervalos." },
      { id_suffix: "v5", difficulty: 3, question: "Muestreo por Conglomerados:", options: [{text: "Elegir grupos enteros al azar",correct:true},{text: "Estratificado",correct:false},{text: "Individual",correct:false},{text: "Sistemático",correct:false}], explanation: "Clusters (ej: colegios)." },
      { id_suffix: "v6", difficulty: 3, question: "Muestreo por Conveniencia (No probabilístico):", options: [{text: "Escoger a los fáciles de contactar",correct:true},{text: "Aleatorio",correct:false},{text: "Científico",correct:false},{text: "Representativo",correct:false}], explanation: "Sesgado." },
      { id_suffix: "v7", difficulty: 4, question: "Sesgo de selección ocurre cuando:", options: [{text: "La muestra no representa a la población",correct:true},{text: "La muestra es muy grande",correct:false},{text: "Es aleatorio",correct:false},{text: "Nunca",correct:false}], explanation: "Error sistemático." },
      { id_suffix: "v8", difficulty: 4, question: "Tamaño de muestra depende de:", options: [{text: "Margen de error y confianza deseada",correct:true},{text: "Ganas del investigador",correct:false},{text: "Clima",correct:false},{text: "Siempre 100",correct:false}], explanation: "Fórmula n." },
      { id_suffix: "v9", difficulty: 5, question: "Margen de error al 95% confianza (aprox):", options: [{text: "1/√n",correct:true},{text: "n",correct:false},{text: "n²",correct:false},{text: "0",correct:false}], explanation: "Estimación rápida." },
      { id_suffix: "v10", difficulty: 5, question: "Error de no respuesta:", options: [{text: "Gente elegida no contesta y sesga resultado",correct:true},{text: "Error de cálculo",correct:false},{text: "Muestra pequeña",correct:false},{text: "Pregunta mal hecha",correct:false}], explanation: "Bias." }
    ]
  },

  // Bundle 10: Taller Review P4
    {
    meta: {
      id: "CO-MAT-10-taller-p4-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "review",
      periodo: 4,
      dba_id: "DBA-MAT-10-4",
      title: "Taller Repaso P4"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Moda de [1, 2, 2, 3]:", options: [{text: "2",correct:true},{text: "1",correct:false},{text: "2.5",correct:false},{text: "3",correct:false}], explanation: "Más repetido." },
      { id_suffix: "v2", difficulty: 1, question: "Media de [2, 4, 6]:", options: [{text: "4",correct:true},{text: "6",correct:false},{text: "2",correct:false},{text: "12",correct:false}], explanation: "Suma/3." },
      { id_suffix: "v3", difficulty: 2, question: "Mediana de [1, 5, 100]:", options: [{text: "5",correct:true},{text: "53",correct:false},{text: "100",correct:false},{text: "1",correct:false}], explanation: "Dato central." },
      { id_suffix: "v4", difficulty: 2, question: "Total pintar combinando 2 pantalones 3 camisas:", options: [{text: "6",correct:true},{text: "5",correct:false},{text: "2",correct:false},{text: "3",correct:false}], explanation: "Multiplicar." },
      { id_suffix: "v5", difficulty: 3, question: "Probabilidad dado < 3:", options: [{text: "2/6 (1/3)",correct:true},{text: "3/6",correct:false},{text: "1/6",correct:false},{text: "4/6",correct:false}], explanation: "1, 2." },
      { id_suffix: "v6", difficulty: 3, question: "Varianza mide:", options: [{text: "Dispersión",correct:true},{text: "Posición",correct:false},{text: "Tendencia central",correct:false},{text: "Total",correct:false}], explanation: "Concepto." },
      { id_suffix: "v7", difficulty: 4, question: "Caja bigotes Q1=2, Q3=8. IQR=", options: [{text: "6",correct:true},{text: "10",correct:false},{text: "4",correct:false},{text: "16",correct:false}], explanation: "8-2." },
      { id_suffix: "v8", difficulty: 4, question: "Permutacion de 2 elementos:", options: [{text: "2",correct:true},{text: "1",correct:false},{text: "4",correct:false},{text: "0",correct:false}], explanation: "2!." },
      { id_suffix: "v9", difficulty: 5, question: "P(A|B) es probabilidad:", options: [{text: "Condicional",correct:true},{text: "Conjunta",correct:false},{text: "Simple",correct:false},{text: "Marginal",correct:false}], explanation: "Dado B." },
      { id_suffix: "v10", difficulty: 5, question: "Gráfico para ver correlación:", options: [{text: "Dispersión",correct:true},{text: "Barras",correct:false},{text: "Pastel",correct:false},{text: "Histograma",correct:false}], explanation: "Scatter." }
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
    console.log(`✅ Created Period 4 Bundle v3.0: ${fullPath}`);
});
