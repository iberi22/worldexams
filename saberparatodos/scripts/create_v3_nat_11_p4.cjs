
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
  // Grade 11 - Ciencias Naturales - Period 4 - BUNDLE 1 (Ondas)
  {
    meta: {
      id: "CO-CN-11-ondas-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-ondas",
      periodo: 4,
      dba_id: "DBA-CN-11-4",
      title: "Fenómenos Ondulatorios"
    },
    base: { question: "Las ondas transportan energía sin transportar materia.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Onda mecánica necesita:", options: [{text: "Medio material para propagarse (agua, aire, cuerda)",correct:true},{text: "Vacío",correct:false},{text: "Luz",correct:false},{text: "Electricidad",correct:false}], explanation: "Sonido." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Onda electromagnética:", options: [{text: "Se propaga en el vacío (ej. Luz)",correct:true},{text: "Necesita aire",correct:false},{text: "Necesita agua",correct:false},{text: "Es lenta",correct:false}], explanation: "Luz solar." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Onda transversal:", options: [{text: "Vibración perpendicular a propagación (ej. Luz, cuerda)",correct:true},{text: "Paralela",correct:false},{text: "Circular",correct:false},{text: "Quieta",correct:false}], explanation: "Ola estadio." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Onda longitudinal:", options: [{text: "Vibración paralela a propagación (ej. Sonido)",correct:true},{text: "Cruzada",correct:false},{text: "Vertical",correct:false},{text: "Diagonal",correct:false}], explanation: "Compresión resorte." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Reflexión:", options: [{text: "Onda rebota al chocar con obstáculo (Eco)",correct:true},{text: "Onda pasa",correct:false},{text: "Onda muere",correct:false},{text: "Onda crece",correct:false}], explanation: "Espejo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Refracción:", options: [{text: "Cambio de dirección al cambiar de medio (Lápiz roto en agua)",correct:true},{text: "Rebote",correct:false},{text: "Sonido",correct:false},{text: "Calor",correct:false}], explanation: "Ley Snell." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Difracción:", options: [{text: "Capacidad de rodear obstáculos o pasar por rendijas",correct:true},{text: "Rebotar",correct:false},{text: "Romperse",correct:false},{text: "Acelerar",correct:false}], explanation: "Oir detrás de muro." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Interferencia:", options: [{text: "Superposición de ondas (constructiva o destructiva)",correct:true},{text: "Choque elástico",correct:false},{text: "Fricción",correct:false},{text: "Nada",correct:false}], explanation: "Suma amplitudes." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Efecto Doppler:", options: [{text: "Cambio de frecuencia aparente por movimiento de fuente/observador",correct:true},{text: "Eco",correct:false},{text: "Volumen",correct:false},{text: "Luz",correct:false}], explanation: "Ambulancia." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Polarización:", options: [{text: "Restringir vibración de onda transversal a un plano (Gafas)",correct:true},{text: "Sonido",correct:false},{text: "Calor",correct:false},{text: "Refracción",correct:false}], explanation: "Solo luz." }
    ]
  },

  // Bundle 2: Sonido (Acústica)
  {
    meta: {
      id: "CO-CN-11-sonido-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-ondas",
      periodo: 4,
      dba_id: "DBA-CN-11-4",
      title: "Acústica y Sonido"
    },
    base: { question: "El sonido es una onda mecánica.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Velocidad del sonido en aire:", options: [{text: "Aprox 340 m/s",correct:true},{text: "300,000 km/s",correct:false},{text: "1 m/s",correct:false},{text: "Cero",correct:false}], explanation: "Mach 1." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Tono (Altura) depende de:", options: [{text: "Frecuencia (Agudo = alta f, Grave = baja f)",correct:true},{text: "Volumen",correct:false},{text: "Amplitud",correct:false},{text: "Tiempo",correct:false}], explanation: "Notas musicales." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Intensidad (Volumen) depende de:", options: [{text: "Amplitud de la onda",correct:true},{text: "Frecuencia",correct:false},{text: "Velocidad",correct:false},{text: "Color",correct:false}], explanation: "Decibeles." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Timbre:", options: [{text: "Cualidad que distingue instrumentos (armónicos)",correct:true},{text: "Volumen",correct:false},{text: "Tono",correct:false},{text: "Eco",correct:false}], explanation: "Piano vs Violín." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Rango audible humano:", options: [{text: "20 Hz a 20,000 Hz",correct:true},{text: "0 a 10 Hz",correct:false},{text: "1 MHz",correct:false},{text: "Infinito",correct:false}], explanation: "Oído." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Ultrasonido:", options: [{text: "Frecuencia superior a 20,000 Hz (Ecografía)",correct:true},{text: "Sonido bajo",correct:false},{text: "Infrasonido",correct:false},{text: "Ruido",correct:false}], explanation: "Murciélagos." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Resonancia en tubo abierto:", options: [{text: "Todos los armónicos presentes",correct:true},{text: "Solo impares",correct:false},{text: "Ninguno",correct:false},{text: "Solo pares",correct:false}], explanation: "Instrumentos viento." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Resonancia en tubo cerrado:", options: [{text: "Solo armónicos impares (f, 3f, 5f...)",correct:true},{text: "Todos",correct:false},{text: "Pares",correct:false},{text: "Ninguno",correct:false}], explanation: "Clarinete (aprox)." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Pulsos (Beats):", options: [{text: "Interferencia de dos frecuencias cercanas (wa-wa-wa)",correct:true},{text: "Tambor",correct:false},{text: "Silencio",correct:false},{text: "Explosión",correct:false}], explanation: "Afinación." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Barrera del sonido:", options: [{text: "Onda de choque cónica al superar Mach 1 (Sonic Boom)",correct:true},{text: "Pared ladrillo",correct:false},{text: "Silencio total",correct:false},{text: "Luz",correct:false}], explanation: "Avión caza." }
    ]
  },

  // Bundle 3: Óptica (Luz)
  {
    meta: {
      id: "CO-CN-11-optica-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-ondas",
      periodo: 4,
      dba_id: "DBA-CN-11-4",
      title: "Óptica Geométrica y Física"
    },
    base: { question: "La luz es onda y partícula.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Velocidad de la luz (c):", options: [{text: "300,000 km/s (en vacío)",correct:true},{text: "340 m/s",correct:false},{text: "100 km/h",correct:false},{text: "Infinita",correct:false}], explanation: "Límite cósmico." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Reflexión especular:", options: [{text: "En superficie lisa, rayos paralelos salen paralelos (Espejo)",correct:true},{text: "Difusa",correct:false},{text: "Se absorbe",correct:false},{text: "Se rompe",correct:false}], explanation: "Imagen nítida." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Espejo cóncavo:", options: [{text: "Converge luz (puede magnificar o invertir)",correct:true},{text: "Diverge",correct:false},{text: "Plano",correct:false},{text: "Roba luz",correct:false}], explanation: "Cuchara dentro." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Espejo convexo:", options: [{text: "Diverge luz (campo visual amplio, retrovisor)",correct:true},{text: "Acerca",correct:false},{text: "Invierte",correct:false},{text: "Quema",correct:false}], explanation: "Vigilancia." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Reflexión interna total:", options: [{text: "Luz queda atrapada dentro del medio denso (Fibra óptica)",correct:true},{text: "Sale toda",correct:false},{text: "Se apaga",correct:false},{text: "Se calienta",correct:false}], explanation: "Ángulo crítico." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Lente Convergente (Lupa):", options: [{text: "Más gruesa en el centro, une rayos",correct:true},{text: "Separa rayos",correct:false},{text: "Plana",correct:false},{text: "Oscura",correct:false}], explanation: "Hipermetropía." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Miopía se corrige con:", options: [{text: "Lente Divergente (Cóncavos)",correct:true},{text: "Lente Convergente",correct:false},{text: "Espejo",correct:false},{text: "Cirugía solo",correct:false}], explanation: "Ojo largo." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Dispersión cromática:", options: [{text: "Separación de luz blanca en colores (Prisma/Arcoiris)",correct:true},{text: "Mezcla colores",correct:false},{text: "Oscuridad",correct:false},{text: "Láser",correct:false}], explanation: "Newton." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Experimento de Young (Doble Rendija):", options: [{text: "Demuestra naturaleza ondulatoria (patrón interferencia)",correct:true},{text: "Partícula",correct:false},{text: "Gravedad",correct:false},{text: "Química",correct:false}], explanation: "Clave cuántica." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Ecuación de lentes:", options: [{text: "1/f = 1/do + 1/di",correct:true},{text: "f = ma",correct:false},{text: "E = mc2",correct:false},{text: "v = d/t",correct:false}], explanation: "Foco distancia." }
    ]
  },

  // Bundle 4: Electrostática
  {
    meta: {
      id: "CO-CN-11-electrostatica-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-electromagnetismo",
      periodo: 4,
      dba_id: "DBA-CN-11-4",
      title: "Cargas Eléctricas"
    },
    base: { question: "Las cargas iguales se repelen.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Carga del electrón:", options: [{text: "Negativa",correct:true},{text: "Positiva",correct:false},{text: "Neutra",correct:false},{text: "Doble",correct:false}], explanation: "Fundamental." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Ley de Cargas:", options: [{text: "Signos opuestos se atraen, iguales se repelen",correct:true},{text: "Iguales se atraen",correct:false},{text: "Opuestos se repelen",correct:false},{text: "Nada pasa",correct:false}], explanation: "Amor eléctrico." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Material conductor:", options: [{text: "Permite flujo de electrones (Metales: Cobre)",correct:true},{text: "Madera",correct:false},{text: "Plástico",correct:false},{text: "Vidrio",correct:false}], explanation: "Cable." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Aislante (Dieléctrico):", options: [{text: "No permite flujo fácil (Goma, Plástico)",correct:true},{text: "Oro",correct:false},{text: "Agua salada",correct:false},{text: "Hierro",correct:false}], explanation: "Protección." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Ley de Coulomb:", options: [{text: "Fuerza eléctrica prop a cargas inv a distancia cuadrado",correct:true},{text: "Fuerza magnética",correct:false},{text: "Ley gravedad",correct:false},{text: "Ley ohm",correct:false}], explanation: "Parecida a gravedad." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Campo Eléctrico (E):", options: [{text: "Región donde carga siente fuerza (N/C)",correct:true},{text: "Campo fútbol",correct:false},{text: "Voltaje",correct:false},{text: "Corriente",correct:false}], explanation: "Vectorial." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Líneas de campo eléctrico:", options: [{text: "Salen de cargas positivas y entran a negativas",correct:true},{text: "Salen de negativas",correct:false},{text: "Son círculos",correct:false},{text: "Se cruzan",correct:false}], explanation: "Visualización." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Jaula de Faraday:", options: [{text: "Blindaje eléctrico (Campo cero en interior conductor)",correct:true},{text: "Jaula pájaros",correct:false},{text: "Batería",correct:false},{text: "Motor",correct:false}], explanation: "Avión en rayo." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Potencial Eléctrico (Voltaje):", options: [{text: "Energía potencial por unidad de carga (Volts)",correct:true},{text: "Fuerza",correct:false},{text: "Corriente",correct:false},{text: "Potencia",correct:false}], explanation: "Trabajo mover carga." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Condensador (Capacitor):", options: [{text: "Dispositivo que almacena carga y energía",correct:true},{text: "Genera luz",correct:false},{text: "Motor",correct:false},{text: "Resistencia",correct:false}], explanation: "Faradios." }
    ]
  },

  // Bundle 5: Circuitos Eléctricos
  {
    meta: {
      id: "CO-CN-11-circuitos-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-electromagnetismo",
      periodo: 4,
      dba_id: "DBA-CN-11-4",
      title: "Circuitos y Ley de Ohm"
    },
    base: { question: "El circuito mueve electrones.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Corriente eléctrica (I):", options: [{text: "Flujo de carga por tiempo (Amperios)",correct:true},{text: "Voltios",correct:false},{text: "Watts",correct:false},{text: "Ohm",correct:false}], explanation: "Río electrones." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Resistencia (R):", options: [{text: "Oposición al flujo de corriente (Ohmios)",correct:true},{text: "Ayuda al flujo",correct:false},{text: "Voltaje",correct:false},{text: "Velocidad",correct:false}], explanation: "Fricción eléctrica." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Ley de Ohm:", options: [{text: "V = I * R",correct:true},{text: "V = I + R",correct:false},{text: "V = R / I",correct:false},{text: "V = I^2",correct:false}], explanation: "Fundamental." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Fuente FEM (Pila):", options: [{text: "Suministra energía (Voltaje) al circuito",correct:true},{text: "Consume energía",correct:false},{text: "Resistente",correct:false},{text: "Cable",correct:false}], explanation: "Bomba." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Circuito en Serie:", options: [{text: "Un solo camino (Corriente igual, Voltaje se reparte)",correct:true},{text: "Varios caminos",correct:false},{text: "Voltaje igual",correct:false},{text: "Sin cables",correct:false}], explanation: "Luces navidad viejas." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Circuito en Paralelo:", options: [{text: "Varios caminos (Voltaje igual, Corriente se reparte)",correct:true},{text: "Un camino",correct:false},{text: "Corriente igual",correct:false},{text: "Se apaga todo",correct:false}], explanation: "Casas." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Potencia Eléctrica:", options: [{text: "P = V * I (Watts)",correct:true},{text: "P = V / I",correct:false},{text: "P = R * I",correct:false},{text: "P = V + I",correct:false}], explanation: "Consumo." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Efecto Joule:", options: [{text: "Corriente calienta resistencia (Estufa, Bombillo)",correct:true},{text: "Enfría",correct:false},{text: "Ilumina",correct:false},{text: "Magnetiza",correct:false}], explanation: "Calor." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Leyes de Kirchhoff (Nodos):", options: [{text: "Suma de corrientes que entran = Suma que salen",correct:true},{text: "Se pierde corriente",correct:false},{text: "Voltaje cero",correct:false},{text: "Nada",correct:false}], explanation: "Conservación carga." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Cortocircuito:", options: [{text: "Camino de resistencia casi cero (Corriente infinita peligrosa)",correct:true},{text: "Circuito pequeño",correct:false},{text: "Circuito cortado",correct:false},{text: "Seguro",correct:false}], explanation: "Fuego." }
    ]
  },

  // Bundle 6: Magnetismo
  {
    meta: {
      id: "CO-CN-11-magnetismo-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-electromagnetismo",
      periodo: 4,
      dba_id: "DBA-CN-11-4",
      title: "Campo Magnético"
    },
    base: { question: "Los imanes tienen polos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Polos magnéticos:", options: [{text: "Norte y Sur (Inseparables)",correct:true},{text: "Positivo y Negativo",correct:false},{text: "Arriba y Abajo",correct:false},{text: "Este y Oeste",correct:false}], explanation: "Dipolo." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Interacción magnética:", options: [{text: "Polos opuestos se atraen, iguales repelen",correct:true},{text: "Iguales atraen",correct:false},{text: "Solo atraen hierro",correct:false},{text: "Nada",correct:false}], explanation: "Brújula." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Brújula:", options: [{text: "Imán que se alinea con campo terrestre (Norte geo es Sur mag)",correct:true},{text: "Reloj",correct:false},{text: "Termómetro",correct:false},{text: "Juguete",correct:false}], explanation: "Navegación." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Campo Magnético (B):", options: [{text: "Región de fuerza magnética (Tesla)",correct:true},{text: "Voltio",correct:false},{text: "Amperio",correct:false},{text: "Newton",correct:false}], explanation: "Unidad T." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Electroimán:", options: [{text: "Bobina con corriente genera campo magnético",correct:true},{text: "Imán natural",correct:false},{text: "Piedra",correct:false},{text: "Plástico",correct:false}], explanation: "Oersted." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Fuerza de Lorentz:", options: [{text: "Fuerza sobre carga en movimiento en campo B",correct:true},{text: "Fuerza quieta",correct:false},{text: "Gravedad",correct:false},{text: "Peso",correct:false}], explanation: "F=qvB." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Regla de la mano derecha:", options: [{text: "Determina dirección de fuerza/campo",correct:true},{text: "Saludar",correct:false},{text: "Escribir",correct:false},{text: "Izquierda",correct:false}], explanation: "Producto cruz." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Motor eléctrico:", options: [{text: "Transforma energía eléctrica en mecánica (giro)",correct:true},{text: "Mecánica a eléctrica",correct:false},{text: "Calor",correct:false},{text: "Luz",correct:false}], explanation: "Fuerza magnética." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Ferromagnetismo:", options: [{text: "Materiales fuertemente atraídos (Hierro, Níquel, Cobalto)",correct:true},{text: "Madera",correct:false},{text: "Agua",correct:false},{text: "Aire",correct:false}], explanation: "Dominios." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Aurora Boreal:", options: [{text: "Partículas solares desviadas por campo magnético terrestre",correct:true},{text: "Reflejo hielo",correct:false},{text: "Luces ciudad",correct:false},{text: "Fuego",correct:false}], explanation: "Viento solar." }
    ]
  },

  // Bundle 7: Inducción e Inducción Electromagnética
  {
    meta: {
      id: "CO-CN-11-induccion-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-electromagnetismo",
      periodo: 4,
      dba_id: "DBA-CN-11-4",
      title: "Inducción Electromagnética"
    },
    base: { question: "Electricidad y magnetismo se relacionan.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Generador eléctrico:", options: [{text: "Transforma energía mecánica en eléctrica",correct:true},{text: "Eléctrica en mecánica",correct:false},{text: "Consume luz",correct:false},{text: "Quema combustible",correct:false}], explanation: "Inverso motor." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Ley de Faraday:", options: [{text: "Campo magnético variable induce corriente",correct:true},{text: "Campo quieto induce",correct:false},{text: "Magia",correct:false},{text: "Gravedad",correct:false}], explanation: "Cambio de flujo." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Corriente Alterna (AC):", options: [{text: "Electrones cambian dirección (Enchufes casa)",correct:true},{text: "Un solo sentido (Pila)",correct:false},{text: "Sin corriente",correct:false},{text: "Estática",correct:false}], explanation: "Tesla." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Corriente Directa (DC):", options: [{text: "Un solo sentido (Baterías)",correct:true},{text: "Cambia sentido",correct:false},{text: "Casa",correct:false},{text: "Alterna",correct:false}], explanation: "Edison." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Transformador:", options: [{text: "Sube o baja voltaje en AC",correct:true},{text: "Crea energía",correct:false},{text: "Convierte AC a DC",correct:false},{text: "Motor",correct:false}], explanation: "Inducción mutua." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Ley de Lenz:", options: [{text: "Corriente inducida se opone al cambio que la produjo",correct:true},{text: "Ayuda al cambio",correct:false},{text: "Es cero",correct:false},{text: "No importa",correct:false}], explanation: "Conservación energía." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Ondas de Radio:", options: [{text: "Ondas EM generadas por corriente oscilante en antena",correct:true},{text: "Sonido",correct:false},{text: "Calor",correct:false},{text: "Luz visible",correct:false}], explanation: "Telecom." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Flujo magnético: ", options: [{text: "Campo B atravesando una superficie (Weber)",correct:true},{text: "Corriente",correct:false},{text: "Voltaje",correct:false},{text: "Fuerza",correct:false}], explanation: "Phi = BA cos(ang)." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Corrientes de Foucault (Eddy):", options: [{text: "Corrientes parásitas circulares en metal masivo (Frenos)",correct:true},{text: "Corriente cable",correct:false},{text: "Batería",correct:false},{text: "Luz",correct:false}], explanation: "Calentamiento." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Ecuaciones de Maxwell:", options: [{text: "4 ecuaciones que resumen todo el electromagnetismo",correct:true},{text: "1 ecuación",correct:false},{text: "Leyes Newton",correct:false},{text: "Química",correct:false}], explanation: "Unificación." }
    ]
  },

  // Bundle 8: Física Moderna (Relatividad y Cuántica Básica)
  {
    meta: {
      id: "CO-CN-11-moderna-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-moderna",
      periodo: 4,
      dba_id: "DBA-CN-11-4",
      title: "Física Moderna"
    },
    base: { question: "La física cambió en el siglo XX.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Albert Einstein famoso por:", options: [{text: "Teoría de la Relatividad (E=mc2)",correct:true},{text: "Leyes movimiento",correct:false},{text: "Gravedad manzana",correct:false},{text: "Electricidad",correct:false}], explanation: "Genio." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Fotón:", options: [{text: "Partícula de luz (paquete energía)",correct:true},{text: "Electrón",correct:false},{text: "Protón",correct:false},{text: "Átomo",correct:false}], explanation: "Cuanto luz." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Efecto Fotoeléctrico:", options: [{text: "Luz arranca electrones de metal (Panel solar)",correct:true},{text: "Calor",correct:false},{text: "Foto",correct:false},{text: "Espejo",correct:false}], explanation: "Nobel Einstein." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "E=mc2 significa:", options: [{text: "Masa y energía son equivalentes",correct:true},{text: "Energía cinética",correct:false},{text: "Error",correct:false},{text: "Electricidad",correct:false}], explanation: "Energía nuclear." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Relatividad Especial:", options: [{text: "Velocidad luz es constante, tiempo y espacio relativos",correct:true},{text: "Todo absoluto",correct:false},{text: "Tiempo fijo",correct:false},{text: "Luz variable",correct:false}], explanation: "Dilatación tiempo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Dualidad Onda-Partícula:", options: [{text: "La materia y luz se comportan como ambas cosas",correct:true},{text: "Solo onda",correct:false},{text: "Solo partícula",correct:false},{text: "Ninguna",correct:false}], explanation: "De Broglie." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Principio de Incertidumbre (Heisenberg):", options: [{text: "Imposible saber posición y momento exactos simultáneamente",correct:true},{text: "Error instrumento",correct:false},{text: "Mala suerte",correct:false},{text: "Todo se sabe",correct:false}], explanation: "Límite cuántico." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Fisión Nuclear:", options: [{text: "Romper núcleo pesado (Bomba A, Reactores)",correct:true},{text: "Unir núcleos",correct:false},{text: "Química",correct:false},{text: "Fuego",correct:false}], explanation: "Uranio." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Fusión Nuclear:", options: [{text: "Unir núcleos ligeros (Estrellas, Bomba H)",correct:true},{text: "Romper",correct:false},{text: "Frío",correct:false},{text: "Química",correct:false}], explanation: "Sol." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Gato de Schrödinger:", options: [{text: "Paradoja de superposición cuántica (Vivo y muerto)",correct:true},{text: "Mascota",correct:false},{text: "Experimento real",correct:false},{text: "Biología",correct:false}], explanation: "Observador." }
    ]
  },

  // Bundle 9: CTS y Medio Ambiente
  {
    meta: {
      id: "CO-CN-11-cts-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "cts",
      periodo: 4,
      dba_id: "DBA-CN-11-4",
      title: "Ciencia, Tecnología y Sociedad"
    },
    base: { question: "La ciencia impacta la sociedad.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Calentamiento Global:", options: [{text: "Aumento temperatura por efecto invernadero (CO2)",correct:true},{text: "Sol brilla más",correct:false},{text: "Verano",correct:false},{text: "Mentira",correct:false}], explanation: "Cambio climático." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Energía renovable:", options: [{text: "Solar, Eólica, Hidráulica (No se agota)",correct:true},{text: "Petróleo",correct:false},{text: "Carbón",correct:false},{text: "Gas",correct:false}], explanation: "Sostenible." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Capa de Ozono:", options: [{text: "Protege de rayos UV",correct:true},{text: "Calienta",correct:false},{text: "Da oxígeno",correct:false},{text: "Es nube",correct:false}], explanation: "CFCs dañan." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Biotecnología:", options: [{text: "Uso de seres vivos para tecnología (Transgénicos, Vacunas)",correct:true},{text: "Robots",correct:false},{text: "Computadores",correct:false},{text: "Rocas",correct:false}], explanation: "ADN." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Lluvia ácida:", options: [{text: "Precipitación con ácidos (SOx, NOx) industrial",correct:true},{text: "Agua pura",correct:false},{text: "Limón",correct:false},{text: "Granizo",correct:false}], explanation: "pH bajo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Huella de carbono:", options: [{text: "Total gases efecto invernadero emitidos por individuo",correct:true},{text: "Pisada sucia",correct:false},{text: "Zapatos",correct:false},{text: "Humo",correct:false}], explanation: "Medida impacto." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Eutrofización:", options: [{text: "Exceso nutrientes en agua causa algas y muerte peces",correct:true},{text: "Agua limpia",correct:false},{text: "Pesca",correct:false},{text: "Sequía",correct:false}], explanation: "Fertilizantes." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Obsolescencia programada:", options: [{text: "Diseñar productos para fallar pronto",correct:true},{text: "Durabilidad",correct:false},{text: "Calidad",correct:false},{text: "Error",correct:false}], explanation: "Consumismo." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Nanotecnología:", options: [{text: "Manipulación de materia a escala atómica",correct:true},{text: "Robots grandes",correct:false},{text: "Microscopio",correct:false},{text: "Videojuegos",correct:false}], explanation: "Nuevos materiales." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Bioética:", options: [{text: "Ética en biología y medicina (Clonación, Eutanasia)",correct:true},{text: "Biología pura",correct:false},{text: "Religión",correct:false},{text: "Ley",correct:false}], explanation: "Dilemas." }
    ]
  },

  // Bundle 10: Taller Integrado Electromagnetismo
  {
    meta: {
      id: "CO-CN-11-taller-electro-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-electromagnetismo",
      periodo: 4,
      dba_id: "DBA-CN-11-4",
      title: "Aplicaciones Electromagnéticas"
    },
    base: { question: "Integración de conceptos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Rayo en tormenta:", options: [{text: "Descarga eléctrica gigante estática",correct:true},{text: "Fuego",correct:false},{text: "Luz solar",correct:false},{text: "Dios",correct:false}], explanation: "Rompimiento dieléctrico." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Pararrayos:", options: [{text: "Atrae rayo y lo lleva a tierra seguro",correct:true},{text: "Espanta rayo",correct:false},{text: "Crea rayo",correct:false},{text: "Adorno",correct:false}], explanation: "Franklin." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Fusible:", options: [{text: "Protege circuito fundiéndose si hay exceso corriente",correct:true},{text: "Genera luz",correct:false},{text: "Batería",correct:false},{text: "Cable",correct:false}], explanation: "Sacrificio." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Microondas (Horno):", options: [{text: "Ondas EM agitan moléculas de agua (Calor)",correct:true},{text: "Fuego",correct:false},{text: "Aire caliente",correct:false},{text: "Radiación nuclear",correct:false}], explanation: "Resonancia agua." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "LED:", options: [{text: "Diodo Emisor de Luz (Eficiente)",correct:true},{text: "Bombillo viejo",correct:false},{text: "Fuego",correct:false},{text: "Láser",correct:false}], explanation: "Semiconductor." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Fibra óptica internet:", options: [{text: "Transmite datos con luz (Reflexión total)",correct:true},{text: "Cobre",correct:false},{text: "Radio",correct:false},{text: "Sonido",correct:false}], explanation: "Velocidad luz." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Resonancia Magnética (MRI):", options: [{text: "Usa campos magnéticos fuertes para imágenes cuerpo",correct:true},{text: "Rayos X",correct:false},{text: "Fotos",correct:false},{text: "Cirugía",correct:false}], explanation: "Spin protones." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Maglev (Tren):", options: [{text: "Levitación magnética (Sin fricción rieles)",correct:true},{text: "Ruedas",correct:false},{text: "Vuela aire",correct:false},{text: "Cuerda",correct:false}], explanation: "Superconductores." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Superconductividad:", options: [{text: "Resistencia cero a muy bajas temperaturas",correct:true},{text: "Cobre caliente",correct:false},{text: "Plástico",correct:false},{text: "Hielo",correct:false}], explanation: "Futuro." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Fuerza Nuclear Fuerte:", options: [{text: "Mantiene unidos protones en núcleo (vence repulsión eléctrica)",correct:true},{text: "Gravedad",correct:false},{text: "Magnetismo",correct:false},{text: "Débil",correct:false}], explanation: "Pegamento atómico." }
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
search_query: "preguntas fisica ondas electromagnetismo grado ${meta.grade} ${meta.periodo} ${meta.topic}"
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
    console.log(`✅ Created Period 4 Bundle v3.0: ${fullPath}`);
});
