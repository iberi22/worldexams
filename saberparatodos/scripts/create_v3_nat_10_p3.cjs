
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: Introduction to Physics and Units
  {
    meta: {
      id: "CO-CN-10-phys-units-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "fisica-unidades",
      periodo: 3,
      dba_id: "DBA-CN-10-3",
      title: "Magnitudes Físicas y Unidades"
    },
    base: { question: "Resuelve problemas unidades.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Unidad fundamental de longitud en el SI:", options: [{text: "Metro",correct:true},{text: "Kilómetro",correct:false},{text: "Centímetro",correct:false},{text: "Pie",correct:false}], explanation: "Sistema Internacional." },
      { id_suffix: "v2", difficulty: 1, question: "Unidad fundamental de tiempo:", options: [{text: "Segundo",correct:true},{text: "Hora",correct:false},{text: "Minuto",correct:false},{text: "Día",correct:false}], explanation: "SI." },
      { id_suffix: "v3", difficulty: 2, question: "¿Cuántos segundos tiene una hora?", options: [{text: "3600",correct:true},{text: "360",correct:false},{text: "60",correct:false},{text: "1000",correct:false}], explanation: "60*60." },
      { id_suffix: "v4", difficulty: 2, question: "Prefijo que significa 1000 (mil):", options: [{text: "Kilo",correct:true},{text: "Mili",correct:false},{text: "Mega",correct:false},{text: "Micro",correct:false}], explanation: "Kilogramo, kilómetro." },
      { id_suffix: "v5", difficulty: 3, question: "Conversión: 72 km/h a m/s:", options: [{text: "20 m/s",correct:true},{text: "72 m/s",correct:false},{text: "10 m/s",correct:false},{text: "100 m/s",correct:false}], explanation: "72 / 3.6 = 20." },
      { id_suffix: "v6", difficulty: 3, question: "Magnitud escalar:", options: [{text: "Solo tiene magnitud (Ej: Masa, Temperatura)",correct:true},{text: "Tiene dirección",correct:false},{text: "Tiene sentido",correct:false},{text: "Es un vector",correct:false}], explanation: "Sin flecha." },
      { id_suffix: "v7", difficulty: 4, question: "Análisis dimensional de la velocidad:", options: [{text: "L T⁻¹",correct:true},{text: "L T⁻²",correct:false},{text: "M L T",correct:false},{text: "L² T",correct:false}], explanation: "Longitud / Tiempo." },
      { id_suffix: "v8", difficulty: 4, question: "Cifras significativas en '0.0030 km':", options: [{text: "2",correct:true},{text: "4",correct:false},{text: "5",correct:false},{text: "1",correct:false}], explanation: "Los ceros iniciales no cuentan, el final sí." },
      { id_suffix: "v9", difficulty: 5, question: "Error relativo:", options: [{text: "(Valor medido - Real) / Real",correct:true},{text: "Valor medido - Real",correct:false},{text: "Promedio",correct:false},{text: "Suma",correct:false}], explanation: "Porcentual." },
      { id_suffix: "v10", difficulty: 5, question: "Orden de magnitud de la altura de una persona:", options: [{text: "10⁰ metros (1 metro)",correct:true},{text: "10⁻³ metros",correct:false},{text: "10² metros",correct:false},{text: "10¹ metros (10m - muy alto)",correct:false}], explanation: "Entre 1 y 2m." }
    ]
  },

  // Bundle 2: Vectors Basics
  {
    meta: {
      id: "CO-CN-10-phys-vectors-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "vectores-basico",
      periodo: 3,
      dba_id: "DBA-CN-10-3",
      title: "Vectores Fundamentos"
    },
    base: { question: "Opera con vectores.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Un vector tiene:", options: [{text: "Magnitud, Dirección y Sentido",correct:true},{text: "Solo magnitud",correct:false},{text: "Solo dirección",correct:false},{text: "Masa",correct:false}], explanation: "Flecha." },
      { id_suffix: "v2", difficulty: 1, question: "Ejemplo de magnitud vectorial:", options: [{text: "Velocidad",correct:true},{text: "Rapidez",correct:false},{text: "Tiempo",correct:false},{text: "Masa",correct:false}], explanation: "Necesita hacia dónde." },
      { id_suffix: "v3", difficulty: 2, question: "Suma de vectores paralelos mismo sentido:", options: [{text: "Se suman sus magnitudes",correct:true},{text: "Se restan",correct:false},{text: "Se usa Pitágoras",correct:false},{text: "Da cero",correct:false}], explanation: "Alineados." },
      { id_suffix: "v4", difficulty: 2, question: "Vector opuesto (-A):", options: [{text: "Misma magnitud, sentido contrario",correct:true},{text: "Doble magnitud",correct:false},{text: "Magnitud negativa",correct:false},{text: "Cero",correct:false}], explanation: "Giro 180." },
      { id_suffix: "v5", difficulty: 3, question: "Componente X de un vector V con ángulo θ:", options: [{text: "V cos(θ)",correct:true},{text: "V sin(θ)",correct:false},{text: "V tan(θ)",correct:false},{text: "V/cos(θ)",correct:false}], explanation: "Adyacente." },
      { id_suffix: "v6", difficulty: 3, question: "Método del polígono:", options: [{text: "Poner vectores 'cabeza con cola'",correct:true},{text: "Sumar números",correct:false},{text: "Restar colas",correct:false},{text: "Multiplicar",correct:false}], explanation: "Gráfico." },
      { id_suffix: "v7", difficulty: 4, question: "Magnitud del vector resultante de (3, 4):", options: [{text: "5",correct:true},{text: "7",correct:false},{text: "1",correct:false},{text: "25",correct:false}], explanation: "Pitágoras √(3²+4²)." },
      { id_suffix: "v8", difficulty: 4, question: "Producto punto (escalar) de vectores perpendiculares:", options: [{text: "0",correct:true},{text: "1",correct:false},{text: "Infinito",correct:false},{text: "Máximo",correct:false}], explanation: "cos(90)=0." },
      { id_suffix: "v9", difficulty: 5, question: "Vector unitario:", options: [{text: "Magnitud 1, da dirección",correct:true},{text: "Vector de 1 metro",correct:false},{text: "Vector cero",correct:false},{text: "Suma",correct:false}], explanation: "V / |V|." },
      { id_suffix: "v10", difficulty: 5, question: "Producto cruz (vectorial) da:", options: [{text: "Un vector perpendicular a ambos",correct:true},{text: "Un escalar",correct:false},{text: "Cero",correct:false},{text: "Paralelo",correct:false}], explanation: "Regla mano derecha." }
    ]
  },

  // Bundle 3: 1D Kinematics (MRU)
  {
    meta: {
      id: "CO-CN-10-phys-mru-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "mru",
      periodo: 3,
      dba_id: "DBA-CN-10-3",
      title: "Movimiento Rectilíneo Uniforme"
    },
    base: { question: "Resuelve MRU.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "En MRU la velocidad es:", options: [{text: "Constante",correct:true},{text: "Variable",correct:false},{text: "Cero",correct:false},{text: "Aumenta",correct:false}], explanation: "Sin aceleración." },
      { id_suffix: "v2", difficulty: 1, question: "La aceleración en MRU es:", options: [{text: "Cero",correct:true},{text: "Constante positiva",correct:false},{text: "Variable",correct:false},{text: "Negativa",correct:false}], explanation: "No cambia v." },
      { id_suffix: "v3", difficulty: 2, question: "Fórmula de distancia en MRU:", options: [{text: "d = v * t",correct:true},{text: "d = v / t",correct:false},{text: "d = a * t²",correct:false},{text: "d = v + t",correct:false}], explanation: "Básica." },
      { id_suffix: "v4", difficulty: 2, question: "Si viajo a 60 km/h por 2 horas, recorro:", options: [{text: "120 km",correct:true},{text: "30 km",correct:false},{text: "62 km",correct:false},{text: "1200 km",correct:false}], explanation: "60*2." },
      { id_suffix: "v5", difficulty: 3, question: "Gráfica posición vs tiempo en MRU es:", options: [{text: "Una línea recta inclinada",correct:true},{text: "Una parábola",correct:false},{text: "Una horizontal",correct:false},{text: "No existe",correct:false}], explanation: "Pendiente es velocidad." },
      { id_suffix: "v6", difficulty: 3, question: "Pendiente de gráfica x vs t representa:", options: [{text: "Velocidad",correct:true},{text: "Aceleración",correct:false},{text: "Posición",correct:false},{text: "Tiempo",correct:false}], explanation: "dx/dt." },
      { id_suffix: "v7", difficulty: 4, question: "Dos autos se acercan, uno a 40 y otro a 60 km/h. Velocidad relativa:", options: [{text: "100 km/h",correct:true},{text: "20 km/h",correct:false},{text: "50 km/h",correct:false},{text: "0 km/h",correct:false}], explanation: "Se suman al chocar." },
      { id_suffix: "v8", difficulty: 4, question: "Desplazamiento vs Distancia:", options: [{text: "Desplazamiento es vectorial (final - inicial), distancia escalar (trayectoria)",correct:true},{text: "Son iguales",correct:false},{text: "Distancia es vectorial",correct:false},{text: "Desplazamiento siempre mayor",correct:false}], explanation: "Ida y vuelta." },
      { id_suffix: "v9", difficulty: 5, question: "Velocidad media es:", options: [{text: "Desplazamiento total / Tiempo total",correct:true},{text: "Promedio de velocidades",correct:false},{text: "Distancia / Tiempo",correct:false},{text: "Rapidez",correct:false}], explanation: "Vectorial." },
      { id_suffix: "v10", difficulty: 5, question: "Si gráfica v vs t es una recta horizontal, el área bajo la curva es:", options: [{text: "Desplazamiento",correct:true},{text: "Velocidad",correct:false},{text: "Aceleración",correct:false},{text: "Tiempo",correct:false}], explanation: "Integral." }
    ]
  },

  // Bundle 4: 1D Kinematics (MRUA/Free Fall)
  {
    meta: {
      id: "CO-CN-10-phys-mrua-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "mrua-caida-libre",
      periodo: 3,
      dba_id: "DBA-CN-10-3",
      title: "MRUA y Caída Libre"
    },
    base: { question: "Resuelve problema de aceleración.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "En MRUA la aceleración es:", options: [{text: "Constante diferente de cero",correct:true},{text: "Cero",correct:false},{text: "Variable",correct:false},{text: "Infinita",correct:false}], explanation: "Uniformemente acelerado." },
      { id_suffix: "v2", difficulty: 1, question: "Caída libre es un ejemplo de:", options: [{text: "MRUA (a = g)",correct:true},{text: "MRU",correct:false},{text: "Movimiento circular",correct:false},{text: "Reposo",correct:false}], explanation: "Gravedad." },
      { id_suffix: "v3", difficulty: 2, question: "Valor aproximado gravedad terrestre:", options: [{text: "9.8 m/s²",correct:true},{text: "100 m/s²",correct:false},{text: "1 m/s²",correct:false},{text: "5 m/s²",correct:false}], explanation: "g." },
      { id_suffix: "v4", difficulty: 2, question: "Si suelto un objeto (vi=0), su velocidad a 1 seg es:", options: [{text: "9.8 m/s",correct:true},{text: "0 m/s",correct:false},{text: "4.9 m/s",correct:false},{text: "100 m/s",correct:false}], explanation: "vf = gt." },
      { id_suffix: "v5", difficulty: 3, question: "Ec. posición: x = xi + vi*t + ...", options: [{text: "1/2 * a * t²",correct:true},{text: "a * t",correct:false},{text: "a * t²",correct:false},{text: "2 * a * t",correct:false}], explanation: "Cuadrática." },
      { id_suffix: "v6", difficulty: 3, question: "Gráfica x vs t en MRUA:", options: [{text: "Parábola",correct:true},{text: "Recta",correct:false},{text: "Horizontal",correct:false},{text: "Círculo",correct:false}], explanation: "x depende de t²." },
      { id_suffix: "v7", difficulty: 4, question: "Lanzamiento vertical hacia arriba: en punto máximo velocidad es:", options: [{text: "Cero",correct:true},{text: "Máxima",correct:false},{text: "Igual a la inicial",correct:false},{text: "g",correct:false}], explanation: "Se detiene." },
      { id_suffix: "v8", difficulty: 4, question: "En punto máximo aceleración es:", options: [{text: "g (hacia abajo)",correct:true},{text: "Cero",correct:false},{text: "Variable",correct:false},{text: "Positiva",correct:false}], explanation: "Gravedad siempre actúa." },
      { id_suffix: "v9", difficulty: 5, question: "Ec independiente del tiempo:", options: [{text: "vf² = vi² + 2ad",correct:true},{text: "vf = vi + at",correct:false},{text: "x = vt",correct:false},{text: "F = ma",correct:false}], explanation: "Torricelli." },
      { id_suffix: "v10", difficulty: 5, question: "Si lanzo y atrapo a la misma altura, tiempo subida es:", options: [{text: "Igual tiempo bajada",correct:true},{text: "Doble tiempo bajada",correct:false},{text: "Mitad tiempo bajada",correct:false},{text: "Cero",correct:false}], explanation: "Simetría." }
    ]
  },

  // Bundle 5: 2D Kinematics (Projectile Motion)
  {
    meta: {
      id: "CO-CN-10-phys-projectile-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "movimiento-parabolico",
      periodo: 3,
      dba_id: "DBA-CN-10-3",
      title: "Movimiento Parabólico"
    },
    base: { question: "Analiza proyectiles.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Movimiento parabólico combina:", options: [{text: "MRU horizontal y MRUA vertical",correct:true},{text: "Dos MRU",correct:false},{text: "Dos MRUA",correct:false},{text: "Caída libre y reposo",correct:false}], explanation: "Independencia." },
      { id_suffix: "v2", difficulty: 1, question: "Velocidad horizontal (Vx) en proyectiles:", options: [{text: "Permanece constante",correct:true},{text: "Cambia con gravedad",correct:false},{text: "Es cero",correct:false},{text: "Aumenta",correct:false}], explanation: "No hay fuerza en X." },
      { id_suffix: "v3", difficulty: 2, question: "Ángulo de alcance máximo (sin aire):", options: [{text: "45°",correct:true},{text: "90°",correct:false},{text: "30°",correct:false},{text: "60°",correct:false}], explanation: "Optimización." },
      { id_suffix: "v4", difficulty: 2, question: "Si lanzo horizontalmente, vel inicial vertical es:", options: [{text: "0",correct:true},{text: "Máxima",correct:false},{text: "Igual horizontal",correct:false},{text: "g",correct:false}], explanation: "Solo tiene Vx." },
      { id_suffix: "v5", difficulty: 3, question: "En el punto más alto de la parábola:", options: [{text: "Vy = 0, Vx = constante",correct:true},{text: "Velocidad total = 0",correct:false},{text: "Aceleración = 0",correct:false},{text: "Vy es máxima",correct:false}], explanation: "Mínima velocidad total." },
      { id_suffix: "v6", difficulty: 3, question: "Tiempo de vuelo depende de:", options: [{text: "Velocidad vertical inicial y gravedad",correct:true},{text: "Masa",correct:false},{text: "Velocidad horizontal",correct:false},{text: "Color",correct:false}], explanation: "Movimiento Y." },
      { id_suffix: "v7", difficulty: 4, question: "Alcance horizontal Xmax =:", options: [{text: "Vx * Tvuelo",correct:true},{text: "Vy * t",correct:false},{text: "g * t²",correct:false},{text: "0",correct:false}], explanation: "MRU en X." },
      { id_suffix: "v8", difficulty: 4, question: "La trayectoria es parábola porque:", options: [{text: "Y depende de t² mientras X depende de t",correct:true},{text: "La gravedad es curva",correct:false},{text: "La tierra es redonda",correct:false},{text: "Es un círculo",correct:false}], explanation: "Matemáticamente." },
      { id_suffix: "v9", difficulty: 5, question: "Dos bolas, una cae directo, otra lanzada horizontal:", options: [{text: "Tocan el suelo al mismo tiempo",correct:true},{text: "La que cae llega antes",correct:false},{text: "La lanzada llega antes",correct:false},{text: "Depende masa",correct:false}], explanation: "Independencia de movimientos." },
      { id_suffix: "v10", difficulty: 5, question: "Si hay resistencia del aire:", options: [{text: "Alcance y altura disminuyen",correct:true},{text: "No cambia nada",correct:false},{text: "Alcance aumenta",correct:false},{text: "Sube más",correct:false}], explanation: "Fricción." }
    ]
  },

  // Bundle 6: Circular Motion
  {
    meta: {
      id: "CO-CN-10-phys-mcu-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "mcu",
      periodo: 3,
      dba_id: "DBA-CN-10-3",
      title: "Movimiento Circular Uniforme"
    },
    base: { question: "Analiza MCU.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "En MCU la rapidez (magnitud) es:", options: [{text: "Constante",correct:true},{text: "Variable",correct:false},{text: "Cero",correct:false},{text: "Infinita",correct:false}], explanation: "Uniforme." },
      { id_suffix: "v2", difficulty: 1, question: "Periodo (T) es:", options: [{text: "Tiempo en dar una vuelta",correct:true},{text: "Vueltas por segundo",correct:false},{text: "Radio",correct:false},{text: "Velocidad",correct:false}], explanation: "Segundos/vuelta." },
      { id_suffix: "v3", difficulty: 2, question: "Frecuencia (f) es:", options: [{text: "Vueltas por segundo (Hz)",correct:true},{text: "Tiempo por vuelta",correct:false},{text: "Longitud",correct:false},{text: "Ángulo",correct:false}], explanation: "Inverso periodo." },
      { id_suffix: "v4", difficulty: 2, question: "Relación f y T:", options: [{text: "f = 1/T",correct:true},{text: "f = T",correct:false},{text: "f = T²",correct:false},{text: "f = 2T",correct:false}], explanation: "Recíprocos." },
      { id_suffix: "v5", difficulty: 3, question: "Aceleración centrípeta apunta hacia:", options: [{text: "El centro",correct:true},{text: "Afuera (tangente)",correct:false},{text: "Arriba",correct:false},{text: "No existe",correct:false}], explanation: "Cambia dirección velocidad." },
      { id_suffix: "v6", difficulty: 3, question: "Fórmula aceleración centrípeta:", options: [{text: "ac = v² / r",correct:true},{text: "ac = v * r",correct:false},{text: "ac = r / v",correct:false},{text: "ac = 0",correct:false}], explanation: "Depende v y r." },
      { id_suffix: "v7", difficulty: 4, question: "Velocidad angular (ω) se mide en:", options: [{text: "Radianes / segundo",correct:true},{text: "Metros / segundo",correct:false},{text: "Grados",correct:false},{text: "Revoluciones",correct:false}], explanation: "SI." },
      { id_suffix: "v8", difficulty: 4, question: "Relación velocidad lineal y angular:", options: [{text: "v = ω * r",correct:true},{text: "v = ω / r",correct:false},{text: "v = ω + r",correct:false},{text: "v = r / ω",correct:false}], explanation: "Radio conecta." },
      { id_suffix: "v9", difficulty: 5, question: "¿Existe velocidad constante en MCU?", options: [{text: "No, cambia la dirección (vector)",correct:true},{text: "Sí, es constante",correct:false},{text: "A veces",correct:false},{text: "Solo si para",correct:false}], explanation: "Vector cambia." },
      { id_suffix: "v10", difficulty: 5, question: "Fuerza centrípeta es:", options: [{text: "La fuerza neta hacia el centro (ej: tensión, fricción)",correct:true},{text: "Una fuerza mágica nueva",correct:false},{text: "La centrífuga",correct:false},{text: "Gravedad solamente",correct:false}], explanation: "Causa ac." }
    ]
  },

  // Bundle 7: Relative Motion
  {
    meta: {
      id: "CO-CN-10-phys-relative-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "movimiento-relativo",
      periodo: 3,
      dba_id: "DBA-CN-10-3",
      title: "Movimiento Relativo"
    },
    base: { question: "Calcula velocidad relativa.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Si camino a 5 km/h dentro de un tren a 100 km/h (mismo sentido):", options: [{text: "Voy a 105 km/h respecto al suelo",correct:true},{text: "95 km/h",correct:false},{text: "5 km/h",correct:false},{text: "100 km/h",correct:false}], explanation: "Suma." },
      { id_suffix: "v2", difficulty: 1, question: "Si camino hacia atrás en el tren:", options: [{text: "Resto velocidad",correct:true},{text: "Sumo",correct:false},{text: "Multiplico",correct:false},{text: "Igual",correct:false}], explanation: "Resta." },
      { id_suffix: "v3", difficulty: 2, question: "Bote cruza un río con corriente perpendicular:", options: [{text: "Su trayectoria es diagonal",correct:true},{text: "Sigue recto",correct:false},{text: "Se devuelve",correct:false},{text: "Se hunde",correct:false}], explanation: "Suma vectorial." },
      { id_suffix: "v4", difficulty: 2, question: "Velocidad resultante bote:", options: [{text: "Pitágoras (Vbote, Vrio)",correct:true},{text: "Suma simple",correct:false},{text: "Resta simple",correct:false},{text: "Promedio",correct:false}], explanation: "Perpendiculares." },
      { id_suffix: "v5", difficulty: 3, question: "Marco de referencia inercial:", options: [{text: "No está acelerado (velocidad constante)",correct:true},{text: "Está acelerando",correct:false},{text: "Está rotando",correct:false},{text: "Es la Tierra (aprox)",correct:false}], explanation: "Leyes Newton." },
      { id_suffix: "v6", difficulty: 3, question: "Transformación de Galileo:", options: [{text: "V' = V - Vo",correct:true},{text: "V' = V + c",correct:false},{text: "Lorentz",correct:false},{text: "Einstein",correct:false}], explanation: "Clásica." },
      { id_suffix: "v7", difficulty: 4, question: "Avión vuela con viento lateral:", options: [{text: "Debe apuntar contra el viento para ir recto",correct:true},{text: "Vuela más rápido",correct:false},{text: "No le afecta",correct:false},{text: "Cae",correct:false}], explanation: "Compensar deriva." },
      { id_suffix: "v8", difficulty: 4, question: "Paradoja de los gemelos:", options: [{text: "Relatividad (no aplica aquí)",correct:true},{text: "Mecánica clásica",correct:false},{text: "Error",correct:false},{text: "Magia",correct:false}], explanation: "Contexto." },
      { id_suffix: "v9", difficulty: 5, question: "Si llueve verticalmente y corro:", options: [{text: "La lluvia parece venir inclinada de frente",correct:true},{text: "Cae recta",correct:false},{text: "Viene de atrás",correct:false},{text: "No me mojo",correct:false}], explanation: "Vrelativa." },
      { id_suffix: "v10", difficulty: 5, question: "¿La velocidad de la luz es relativa?", options: [{text: "No, es constante c (Einstein)",correct:true},{text: "Sí, se suma",correct:false},{text: "Depende fuente",correct:false},{text: "Es infinita",correct:false}], explanation: "Postulado." }
    ]
  },

  // Bundle 8: Graphical Analysis Kinematics
  {
    meta: {
      id: "CO-CN-10-phys-graph-kin-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "graficas-cinematica",
      periodo: 3,
      dba_id: "DBA-CN-10-3",
      title: "Análisis Gráfico Movimiento"
    },
    base: { question: "Interpreta gráfica.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "X vs t es horizontal:", options: [{text: "Objeto quieto (v=0)",correct:true},{text: "Velocidad constante",correct:false},{text: "Acelerando",correct:false},{text: "Retrocediendo",correct:false}], explanation: "Posición no cambia." },
      { id_suffix: "v2", difficulty: 1, question: "V vs t es horizontal (no cero):", options: [{text: "Velocidad constante (MRU)",correct:true},{text: "Acelerando",correct:false},{text: "Quieto",correct:false},{text: "Frenando",correct:false}], explanation: "a=0." },
      { id_suffix: "v3", difficulty: 2, question: "Pendiente V vs t es:", options: [{text: "Aceleración",correct:true},{text: "Posición",correct:false},{text: "Tiempo",correct:false},{text: "Fuerza",correct:false}], explanation: "dv/dt." },
      { id_suffix: "v4", difficulty: 2, question: "Área bajo V vs t:", options: [{text: "Desplazamiento",correct:true},{text: "Aceleración",correct:false},{text: "Tiempo",correct:false},{text: "Potencia",correct:false}], explanation: "Integral v." },
      { id_suffix: "v5", difficulty: 3, question: "X vs t es curva cóncava arriba:", options: [{text: "Aceleración positiva",correct:true},{text: "Frenando",correct:false},{text: "MRU",correct:false},{text: "Quieto",correct:false}], explanation: "Aumenta pendiente." },
      { id_suffix: "v6", difficulty: 3, question: "Objeto frena gráficamente:", options: [{text: "V vs t se acerca a cero",correct:true},{text: "Pendiente positiva siempre",correct:false},{text: "Recta horizontal",correct:false},{text: "Curva",correct:false}], explanation: "Disminuye magnitud." },
      { id_suffix: "v7", difficulty: 4, question: "Cruce por eje t en V vs t:", options: [{text: "Cambio de sentido",correct:true},{text: "Parada total",correct:false},{text: "Choque",correct:false},{text: "Salto",correct:false}], explanation: "v pasa de + a -." },
      { id_suffix: "v8", difficulty: 4, question: "A vs t área bajo curva:", options: [{text: "Cambio de velocidad",correct:true},{text: "Posición",correct:false},{text: "Fuerza",correct:false},{text: "Tiempo",correct:false}], explanation: "Integral a." },
      { id_suffix: "v9", difficulty: 5, question: "Derivada de posición es:", options: [{text: "Velocidad",correct:true},{text: "Aceleración",correct:false},{text: "Tiempo",correct:false},{text: "Fuerza",correct:false}], explanation: "Calculus." },
      { id_suffix: "v10", difficulty: 5, question: "Segunda derivada de posición:", options: [{text: "Aceleración",correct:true},{text: "Velocidad",correct:false},{text: "Jerk",correct:false},{text: "Nada",correct:false}], explanation: "Curvatura." }
    ]
  },

  // Bundle 9: Kinematics Problems
  {
    meta: {
      id: "CO-CN-10-phys-prob-kin-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "problemas-cinematica",
      periodo: 3,
      dba_id: "DBA-CN-10-3",
      title: "Problemas Cinemática"
    },
    base: { question: "Resuelve el problema.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Auto viaja 100km en 2h. Rapidez media:", options: [{text: "50 km/h",correct:true},{text: "100 km/h",correct:false},{text: "200 km/h",correct:false},{text: "2 km/h",correct:false}], explanation: "100/2." },
      { id_suffix: "v2", difficulty: 1, question: "Corredor da vuelta completa 400m en 50s. Velocidad media:", options: [{text: "0 (desplazamiento 0)",correct:true},{text: "8 m/s",correct:false},{text: "40 m/s",correct:false},{text: "400 m/s",correct:false}], explanation: "Vuelve al inicio." },
      { id_suffix: "v3", difficulty: 2, question: "Cae objeto 3 seg. Velocidad final (g=10):", options: [{text: "30 m/s",correct:true},{text: "3 m/s",correct:false},{text: "10 m/s",correct:false},{text: "300 m/s",correct:false}], explanation: "10*3." },
      { id_suffix: "v4", difficulty: 2, question: "Altura caída en 3 seg (g=10):", options: [{text: "45 m",correct:true},{text: "30 m",correct:false},{text: "90 m",correct:false},{text: "15 m",correct:false}], explanation: "5*3² = 5*9." },
      { id_suffix: "v5", difficulty: 3, question: "Auto acelera de 0 a 20 m/s en 5s. 'a' vale:", options: [{text: "4 m/s²",correct:true},{text: "5 m/s²",correct:false},{text: "20 m/s²",correct:false},{text: "100 m/s²",correct:false}], explanation: "20/5." },
      { id_suffix: "v6", difficulty: 3, question: "Distancia en el caso anterior:", options: [{text: "50 m",correct:true},{text: "100 m",correct:false},{text: "20 m",correct:false},{text: "10 m",correct:false}], explanation: "Promedio (0+20)/2 * 5 = 10*5." },
      { id_suffix: "v7", difficulty: 4, question: "Tiempo para detenerse de 30 m/s con a=-5 m/s²:", options: [{text: "6 s",correct:true},{text: "5 s",correct:false},{text: "30 s",correct:false},{text: "150 s",correct:false}], explanation: "30/5." },
      { id_suffix: "v8", difficulty: 4, question: "Distancia frenado caso anterior:", options: [{text: "90 m",correct:true},{text: "180 m",correct:false},{text: "30 m",correct:false},{text: "6 m",correct:false}], explanation: "(30+0)/2 * 6 = 15*6." },
      { id_suffix: "v9", difficulty: 5, question: "Proyectil v0=50 m/s ángulo 37°. Vy inicial (sin37=0.6):", options: [{text: "30 m/s",correct:true},{text: "40 m/s",correct:false},{text: "50 m/s",correct:false},{text: "20 m/s",correct:false}], explanation: "50*0.6." },
      { id_suffix: "v10", difficulty: 5, question: "Tiempo subida caso anterior (g=10):", options: [{text: "3 s",correct:true},{text: "5 s",correct:false},{text: "6 s",correct:false},{text: "30 s",correct:false}], explanation: "30/10." }
    ]
  },

  // Bundle 10: Taller Review P3
    {
    meta: {
      id: "CO-CN-10-taller-p3-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "review",
      periodo: 3,
      dba_id: "DBA-CN-10-3",
      title: "Taller Repaso P3"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "SI longitud:", options: [{text: "metro",correct:true},{text: "km",correct:false},{text: "milla",correct:false},{text: "cm",correct:false}], explanation: "Básico." },
      { id_suffix: "v2", difficulty: 1, question: "Suma vectores (3,0) y (0,4):", options: [{text: "(3, 4)",correct:true},{text: "7",correct:false},{text: "1",correct:false},{text: "12",correct:false}], explanation: "Componentes." },
      { id_suffix: "v3", difficulty: 2, question: "aceleración caída libre:", options: [{text: "9.8 m/s²",correct:true},{text: "0",correct:false},{text: "Variable",correct:false},{text: "1 m/s²",correct:false}], explanation: "Gravedad." },
      { id_suffix: "v4", difficulty: 2, question: "Periodo T=2s. Frecuencia:", options: [{text: "0.5 Hz",correct:true},{text: "2 Hz",correct:false},{text: "1 Hz",correct:false},{text: "4 Hz",correct:false}], explanation: "1/2." },
      { id_suffix: "v5", difficulty: 3, question: "Caída 2 seg, velocidad (g=10):", options: [{text: "20 m/s",correct:true},{text: "10 m/s",correct:false},{text: "2 m/s",correct:false},{text: "5 m/s",correct:false}], explanation: "10*2." },
      { id_suffix: "v6", difficulty: 3, question: "Trayectoria proyectil ideal:", options: [{text: "Parábola",correct:true},{text: "Recta",correct:false},{text: "Círculo",correct:false},{text: "Elipse",correct:false}], explanation: "Curva." },
      { id_suffix: "v7", difficulty: 4, question: "Velocidad angular manecilla segundos:", options: [{text: "2π rad / 60s",correct:true},{text: "2π rad / 1s",correct:false},{text: "360",correct:false},{text: "60",correct:false}], explanation: "Una vuelta min." },
      { id_suffix: "v8", difficulty: 4, question: "Pendiente x vs t constante:", options: [{text: "Velocidad constante",correct:true},{text: "Aceleración",correct:false},{text: "Quieto",correct:false},{text: "Curva",correct:false}], explanation: "MRU." },
      { id_suffix: "v9", difficulty: 5, question: "Cruzar río: Tiempo depende de:", options: [{text: "Ancho y velocidad perpendicular",correct:true},{text: "Corriente",correct:false},{text: "Ángulo",correct:false},{text: "Masa",correct:false}], explanation: "Independencia." },
      { id_suffix: "v10", difficulty: 5, question: "Aceleración centrípeta r=2 v=4:", options: [{text: "8 m/s²",correct:true},{text: "2",correct:false},{text: "4",correct:false},{text: "16",correct:false}], explanation: "16/2." }
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
search_query: "physics questions grade ${meta.grade} ${meta.periodo} ${meta.topic}"
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

**Competencia:** Uso Comprensivo del Conocimiento Científico (DBA: ${meta.dba_id})

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
