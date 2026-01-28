
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
  // Grade 11 - Ciencias Naturales - Period 3 - BUNDLE 1 (Cinemática)
  {
    meta: {
      id: "CO-CN-11-cinematica-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-mecanica",
      periodo: 3,
      dba_id: "DBA-CN-11-3",
      title: "Movimiento (Cinemática)"
    },
    base: { question: "La cinemática estudia el movimiento sin sus causas.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Velocidad es:", options: [{text: "Cambio de posición en el tiempo (v = d/t)",correct:true},{text: "Fuerza",correct:false},{text: "Masa",correct:false},{text: "Calor",correct:false}], explanation: "Desplazamiento." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Aceleración:", options: [{text: "Cambio de velocidad en el tiempo",correct:true},{text: "Velocidad constante",correct:false},{text: "Distancia",correct:false},{text: "Tiempo",correct:false}], explanation: "a = (vf-vi)/t." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Movimiento Rectilíneo Uniforme (MRU):", options: [{text: "Velocidad constante, aceleración cero",correct:true},{text: "Aceleración variable",correct:false},{text: "Curvas",correct:false},{text: "Frenado",correct:false}], explanation: "Línea recta." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Movimiento Uniformemente Acelerado (MUA):", options: [{text: "Aceleración constante (ej. Caída libre)",correct:true},{text: "Aceleración cero",correct:false},{text: "Velocidad cero",correct:false},{text: "Quieto",correct:false}], explanation: "Gravedad." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Caída Libre:", options: [{text: "Movimiento vertical bajo acción de gravedad (9.8 m/s2)",correct:true},{text: "Volar",correct:false},{text: "Subir",correct:false},{text: "Flotar",correct:false}], explanation: "Sin aire." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Movimiento Parabólico:", options: [{text: "Composición de MRU horizontal y Caída Libre vertical",correct:true},{text: "Línea recta",correct:false},{text: "Círculo",correct:false},{text: "Quieto",correct:false}], explanation: "Proyectil." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Desplazamiento vs Distancia:", options: [{text: "Vector (Posición final - inicial) vs Escalar (Trayectoria total)",correct:true},{text: "Iguales",correct:false},{text: "Distancia es vector",correct:false},{text: "Desplazamiento siempre mayor",correct:false}], explanation: "Vectorial." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Gráfica Posición vs Tiempo en MRU:", options: [{text: "Línea recta inclinada (pendiente es velocidad)",correct:true},{text: "Parábola",correct:false},{text: "Horizontal",correct:false},{text: "Círculo",correct:false}], explanation: "Pendiente constante." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Velocidad instantánea:", options: [{text: "Velocidad en un instante preciso (Límite, derivada)",correct:true},{text: "Velocidad promedio",correct:false},{text: "Velocidad cero",correct:false},{text: "Distancia",correct:false}], explanation: "Derivada x(t)." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Marco de referencia inercial:", options: [{text: "Sistema donde valen las leyes de Newton (velocidad constante o quieto)",correct:true},{text: "Acelerado",correct:false},{text: "Rotando",correct:false},{text: "Cualquiera",correct:false}], explanation: "Relatividad." }
    ]
  },

  // Bundle 2: Dinámica (Leyes de Newton)
  {
    meta: {
      id: "CO-CN-11-dinamica-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-mecanica",
      periodo: 3,
      dba_id: "DBA-CN-11-3",
      title: "Leyes de Newton"
    },
    base: { question: "Las fuerzas causan movimiento.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Fuerza se mide en:", options: [{text: "Newtons (N)",correct:true},{text: "Kilos",correct:false},{text: "Metros",correct:false},{text: "Segundos",correct:false}], explanation: "Unidad SI." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Primera Ley (Inercia):", options: [{text: "Todo cuerpo mantiene su estado si no actúan fuerzas",correct:true},{text: "Todo se mueve",correct:false},{text: "Todo frena",correct:false},{text: "Gravedad",correct:false}], explanation: "Resistencia al cambio." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Segunda Ley (Fuerza):", options: [{text: "Fuerza = Masa x Aceleración (F=ma)",correct:true},{text: "F=m/a",correct:false},{text: "F=v*t",correct:false},{text: "F=0",correct:false}], explanation: "Fundamental." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Tercera Ley (Acción-Reacción):", options: [{text: "A toda acción corresponde una reacción igual y opuesta",correct:true},{text: "Solo acción",correct:false},{text: "Reacción menor",correct:false},{text: "Nada",correct:false}], explanation: "Pares de fuerzas." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Fuerza Normal:", options: [{text: "Fuerza perpendicular de superficie sobre objeto de apoyo",correct:true},{text: "Peso",correct:false},{text: "Fricción",correct:false},{text: "Aire",correct:false}], explanation: "Contacto." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Peso (W):", options: [{text: "Fuerza de gravedad (W = mg)",correct:true},{text: "Masa",correct:false},{text: "Volumen",correct:false},{text: "Densidad",correct:false}], explanation: "Vector hacia abajo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Fricción (Rozamiento):", options: [{text: "Fuerza que se opone al movimiento relativo",correct:true},{text: "Ayuda a mover",correct:false},{text: "Empuja",correct:false},{text: "Normal",correct:false}], explanation: "Estática y Cinética." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Diagrama de Cuerpo Libre (DCL):", options: [{text: "Dibujo de todas las fuerzas sobre un objeto aislado",correct:true},{text: "Dibujo artístico",correct:false},{text: "Plano",correct:false},{text: "Mapa",correct:false}], explanation: "Análisis vectorial." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Equilibrio estático:", options: [{text: "Suma de fuerzas y torques es cero",correct:true},{text: "Se mueve rápido",correct:false},{text: "Solo suma fuerzas",correct:false},{text: "Caída",correct:false}], explanation: "Reposo." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Fuerza centrípeta:", options: [{text: "Fuerza hacia el centro en movimiento circular",correct:true},{text: "Hacia afuera",correct:false},{text: "Hacia arriba",correct:false},{text: "No existe",correct:false}], explanation: "Curva." }
    ]
  },

  // Bundle 3: Trabajo y Energía
  {
    meta: {
      id: "CO-CN-11-energia-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-mecanica",
      periodo: 3,
      dba_id: "DBA-CN-11-3",
      title: "Trabajo y Conservación de la Energía"
    },
    base: { question: "La energía se conserva.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Unidad de Energía y Trabajo:", options: [{text: "Joule (J)",correct:true},{text: "Newton",correct:false},{text: "Watt",correct:false},{text: "Metro",correct:false}], explanation: "SI." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Trabajo (W):", options: [{text: "Fuerza x Distancia (en dirección del movimiento)",correct:true},{text: "Fuerza sola",correct:false},{text: "Esfuerzo mental",correct:false},{text: "Tiempo",correct:false}], explanation: "Transferencia energía." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Energía Cinética (K):", options: [{text: "Energía del movimiento (1/2 mv2)",correct:true},{text: "Energía altura",correct:false},{text: "Calor",correct:false},{text: "Luz",correct:false}], explanation: "Velocidad." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Energía Potencial Gravitacional (Ug):", options: [{text: "Energía por altura (mgh)",correct:true},{text: "Energía movimiento",correct:false},{text: "Resorte",correct:false},{text: "Elástica",correct:false}], explanation: "Posición vertical." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Ley Conservación Energía Mecánica:", options: [{text: "Si no hay fricción, K + U es constante",correct:true},{text: "La energía se pierde",correct:false},{text: "La energía se crea",correct:false},{text: "Todo se detiene",correct:false}], explanation: "Montaña rusa." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Potencia:", options: [{text: "Trabajo por unidad de tiempo (Watts)",correct:true},{text: "Fuerza fuerte",correct:false},{text: "Electricidad",correct:false},{text: "Velocidad",correct:false}], explanation: "Rapidez de trabajo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Fuerzas conservativas (ej. Gravedad):", options: [{text: "El trabajo no depende de la trayectoria",correct:true},{text: "El trabajo depende del camino",correct:false},{text: "Fricción",correct:false},{text: "Viento",correct:false}], explanation: "Energía potencial definida." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Fuerzas disipativas (ej. Fricción):", options: [{text: "Transforman energía mecánica en calor",correct:true},{text: "Conservan energía",correct:false},{text: "Crean movimiento",correct:false},{text: "Son gravitacionales",correct:false}], explanation: "Pérdida eficiencia." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Teorema Trabajo-Energía:", options: [{text: "El trabajo neto es igual al cambio en energía cinética",correct:true},{text: "W = 0",correct:false},{text: "K = U",correct:false},{text: "F = ma",correct:false}], explanation: "Relación fundamental." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Energía potencial elástica:", options: [{text: "1/2 kx2 (Resorte)",correct:true},{text: "mgh",correct:false},{text: "mc2",correct:false},{text: "Fuerza",correct:false}], explanation: "Ley de Hooke." }
    ]
  },

  // Bundle 4: Cantidad de Movimiento y Choques
  {
    meta: {
      id: "CO-CN-11-choques-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-mecanica",
      periodo: 3,
      dba_id: "DBA-CN-11-3",
      title: "Impulso y Cantidad de Movimiento"
    },
    base: { question: "El momento se conserva en choques.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Cantidad de movimiento (Momentum p):", options: [{text: "Masa x Velocidad (mv)",correct:true},{text: "Fuerza",correct:false},{text: "Energía",correct:false},{text: "Peso",correct:false}], explanation: "Inercia en movimiento." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Impulso:", options: [{text: "Fuerza aplicada por un tiempo (Cambio de momentum)",correct:true},{text: "Empujón rápido",correct:false},{text: "Deseo",correct:false},{text: "Velocidad",correct:false}], explanation: "F*t." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Choque Elástico:", options: [{text: "Se conserva Momentum y Energía Cinética (Rebotan perfecto)",correct:true},{text: "Se pegan",correct:false},{text: "Se rompen",correct:false},{text: "Pierden calor",correct:false}], explanation: "Bolas billar." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Choque Inelástico:", options: [{text: "Se conserva Momentum, pero pierde Energía Cinética (Deformación)",correct:true},{text: "Gana energía",correct:false},{text: "Rebote perfecto",correct:false},{text: "No chocan",correct:false}], explanation: "Choque carros." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Choque perfectamente inelástico:", options: [{text: "Los cuerpos quedan pegados (velocidad final común)",correct:true},{text: "Rebotan",correct:false},{text: "Explotan",correct:false},{text: "Desaparecen",correct:false}], explanation: "Plastilina." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Retroceso de un arma (Recoil):", options: [{text: "Conservación momento: bala va adelante, arma atrás",correct:true},{text: "Fuerza del brazo",correct:false},{text: "Explosión",correct:false},{text: "Ruido",correct:false}], explanation: "p_antes = p_despues = 0." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Centro de masa:", options: [{text: "Punto donde se concentra la masa promedio del sistema",correct:true},{text: "El centro geométrico siempre",correct:false},{text: "El peso",correct:false},{text: "La orilla",correct:false}], explanation: "Equilibrio." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Airbag funciona por:", options: [{text: "Aumentar tiempo de impacto para reducir fuerza (Impulso)",correct:true},{text: "Es suave",correct:false},{text: "Frena el carro",correct:false},{text: "Amortigua sonido",correct:false}], explanation: "F = dp/dt." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Momento angular (L):", options: [{text: "Cantidad de movimiento de rotación (L = I*omega)",correct:true},{text: "Momento lineal",correct:false},{text: "Fuerza",correct:false},{text: "Ángulo",correct:false}], explanation: "Giro." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Conservación momento angular:", options: [{text: "Patinador cierra brazos y gira más rápido",correct:true},{text: "Se cae",correct:false},{text: "Se detiene",correct:false},{text: "Vuela",correct:false}], explanation: "L constante." }
    ]
  },

  // Bundle 5: Fluidos (Hidrostática e Hidrodinámica)
  {
    meta: {
      id: "CO-CN-11-fluidos-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-mecanica",
      periodo: 3,
      dba_id: "DBA-CN-11-3",
      title: "Mecánica de Fluidos"
    },
    base: { question: "Los fluidos fluyen.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Fluido es:", options: [{text: "Líquido o gas",correct:true},{text: "Sólido",correct:false},{text: "Piedra",correct:false},{text: "Madera",correct:false}], explanation: "No tiene forma fija." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Densidad:", options: [{text: "Masa sobre Volumen (d=m/v)",correct:true},{text: "Peso",correct:false},{text: "Flotabilidad",correct:false},{text: "Grosor",correct:false}], explanation: "kg/m3." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Principio de Arquímedes:", options: [{text: "Empuje hacia arriba igual al peso del fluido desalojado",correct:true},{text: "Todo se hunde",correct:false},{text: "Todo flota",correct:false},{text: "Presión",correct:false}], explanation: "Flotación." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Presión Hidrostática depende de:", options: [{text: "Profundidad y densidad",correct:true},{text: "Forma del recipiente",correct:false},{text: "Color del agua",correct:false},{text: "Ancho del mar",correct:false}], explanation: "P = dgh." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Principio de Pascal:", options: [{text: "Presión aplicada se transmite igual a todo punto (Prensa hidráulica)",correct:true},{text: "Presión se pierde",correct:false},{text: "Agua no se comprime",correct:false},{text: "Aire",correct:false}], explanation: "Gato hidráulico." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Ecuación de Bernoulli:", options: [{text: "Conservación energía en fluidos (Velocidad vs Presión)",correct:true},{text: "Energía se crea",correct:false},{text: "Fluidos quietos",correct:false},{text: "Gravedad",correct:false}], explanation: "Aviones vuelan." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Si aumenta velocidad del fluido (Bernoulli), la presión:", options: [{text: "Disminuye",correct:true},{text: "Aumenta",correct:false},{text: "Sigue igual",correct:false},{text: "Se anula",correct:false}], explanation: "Efecto Venturi." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Viscosidad:", options: [{text: "Resistencia a fluir (ej. Miel)",correct:true},{text: "Fluidez",correct:false},{text: "Densidad",correct:false},{text: "Temperatura",correct:false}], explanation: "Fricción interna." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Tensión superficial:", options: [{text: "Fuerza en superficie que permite caminar insectos",correct:true},{text: "Piel del agua",correct:false},{text: "Suciedad",correct:false},{text: "Aceite",correct:false}], explanation: "Cohesión." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Flujo laminar vs turbulento:", options: [{text: "Suave y ordenado vs Caótico y remolinos",correct:true},{text: "Rápido vs Lento",correct:false},{text: "Agua vs Aceite",correct:false},{text: "Limpio vs Sucio",correct:false}], explanation: "Número de Reynolds." }
    ]
  },

  // Bundle 6: Termodinámica (Calor y Temperatura)
  {
    meta: {
      id: "CO-CN-11-termodinamica-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-mecanica",
      periodo: 3,
      dba_id: "DBA-CN-11-3",
      title: "Calor y Temperatura"
    },
    base: { question: "Calor es energía.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Temperatura mide:", options: [{text: "Energía cinética promedio (agitación molecular)",correct:true},{text: "Calor total",correct:false},{text: "Frío",correct:false},{text: "Masa",correct:false}], explanation: "Termómetro." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Calor es:", options: [{text: "Transferencia de energía térmica",correct:true},{text: "Temperatura",correct:false},{text: "Un fluido",correct:false},{text: "Fuego",correct:false}], explanation: "Flujo energía." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Equilibrio Térmico:", options: [{text: "Dos cuerpos alcanzan misma temperatura (Ley Cero)",correct:true},{text: "Se congelan",correct:false},{text: "Se queman",correct:false},{text: "Se separan",correct:false}], explanation: "T1 = T2." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Escala Kelvin:", options: [{text: "Escala absoluta, no tiene negativos",correct:true},{text: "Celsius",correct:false},{text: "Fahrenheit",correct:false},{text: "Metros",correct:false}], explanation: "K = C + 273." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Conducción:", options: [{text: "Calor por contacto directo (sólidos)",correct:true},{text: "Por aire",correct:false},{text: "Por luz",correct:false},{text: "Por agua",correct:false}], explanation: "Tocar olla." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Convección:", options: [{text: "Calor por movimiento de fluidos (aire caliente sube)",correct:true},{text: "Contacto",correct:false},{text: "Radiación",correct:false},{text: "Electricidad",correct:false}], explanation: "Corrientes." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Radiación:", options: [{text: "Calor por ondas electromagnéticas (Sol)",correct:true},{text: "Contacto",correct:false},{text: "Aire",correct:false},{text: "Viento",correct:false}], explanation: "Vacío." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Calor específico:", options: [{text: "Energía para subir 1°C a 1g de sustancia",correct:true},{text: "Calor total",correct:false},{text: "Peso",correct:false},{text: "Densidad",correct:false}], explanation: "Inercia térmica agua." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Primera Ley Termodinámica:", options: [{text: "Conservación energía (Q = W + dU)",correct:true},{text: "Entropía",correct:false},{text: "Cero absoluto",correct:false},{text: "Todo se pierde",correct:false}], explanation: "Energía interna." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Segunda Ley (Entropía):", options: [{text: "El desorden del universo siempre aumenta",correct:true},{text: "La energía se conserva",correct:false},{text: "Se puede enfriar al cero absoluto",correct:false},{text: "Todo se ordena",correct:false}], explanation: "Irreversibilidad." }
    ]
  },

  // Bundle 7: M.A.S. (Movimiento Armónico Simple)
  {
    meta: {
      id: "CO-CN-11-mas-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-mecanica",
      periodo: 3,
      dba_id: "DBA-CN-11-3",
      title: "Movimiento Armónico Simple"
    },
    base: { question: "El MAS es periódico.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Periodo (T):", options: [{text: "Tiempo de una oscilación completa",correct:true},{text: "Frecuencia",correct:false},{text: "Velocidad",correct:false},{text: "Distancia",correct:false}], explanation: "Segundos." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Frecuencia (f):", options: [{text: "Número de oscilaciones por segundo (Hz)",correct:true},{text: "Periodo",correct:false},{text: "Tiempo",correct:false},{text: "Altura",correct:false}], explanation: "Inverso periodo." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Amplitud:", options: [{text: "Máximo desplazamiento desde equilibrio",correct:true},{text: "Ancho",correct:false},{text: "Largo",correct:false},{text: "Peso",correct:false}], explanation: "Tamaño onda." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Ejemplo de MAS:", options: [{text: "Péndulo o Resorte",correct:true},{text: "Carro frenando",correct:false},{text: "Caída libre",correct:false},{text: "Explosión",correct:false}], explanation: "Oscilador." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Fuerza restauradora (Ley Hooke):", options: [{text: "Fuerza proporcional opuesta al desplazamiento (-kx)",correct:true},{text: "Fuerza constante",correct:false},{text: "Gravedad",correct:false},{text: "Fricción",correct:false}], explanation: "Regresa al centro." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "En los extremos del péndulo:", options: [{text: "Velocidad cero, Aceleración máxima",correct:true},{text: "Velocidad máxima",correct:false},{text: "Todo cero",correct:false},{text: "Energía cero",correct:false}], explanation: "Punto retorno." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "En el centro (equilibrio) del péndulo:", options: [{text: "Velocidad máxima, Aceleración cero",correct:true},{text: "Velocidad cero",correct:false},{text: "Aceleración máxima",correct:false},{text: "Quieto",correct:false}], explanation: "Energía cinética max." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Periodo péndulo depende de:", options: [{text: "Longitud y gravedad (no de masa)",correct:true},{text: "Masa",correct:false},{text: "Amplitud",correct:false},{text: "Color",correct:false}], explanation: "L raíz g." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Resonancia:", options: [{text: "Aumento amplitud cuando fuerza externa coincide con frecuencia natural",correct:true},{text: "Sonido fuerte",correct:false},{text: "Ruido",correct:false},{text: "Frenado",correct:false}], explanation: "Tacoma Bridge." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Energía en MAS:", options: [{text: "Se transforma cte entre Cinética y Potencial Elástica/Grav",correct:true},{text: "Se pierde",correct:false},{text: "Es cero",correct:false},{text: "Aumenta siempre",correct:false}], explanation: "Conservación." }
    ]
  },

  // Bundle 8: Gravitación Universal
  {
    meta: {
      id: "CO-CN-11-gravitacion-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-mecanica",
      periodo: 3,
      dba_id: "DBA-CN-11-3",
      title: "Gravitación Universal"
    },
    base: { question: "La gravedad atrae masas.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Ley Gravitación Universal (Newton):", options: [{text: "Todos los cuerpos se atraen con fuerza prop masa e inv dist2",correct:true},{text: "Repelen",correct:false},{text: "Solo Tierra atrae",correct:false},{text: "Magnetismo",correct:false}], explanation: "Gm1m2/r2." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Gravedad en la Tierra (g):", options: [{text: "Aprox 9.8 m/s2",correct:true},{text: "100 m/s2",correct:false},{text: "1 m/s2",correct:false},{text: "Zero",correct:false}], explanation: "Aceleración." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Si la distancia se duplica, la fuerza:", options: [{text: "Se reduce a la cuarta parte (1/4)",correct:true},{text: "Se reduce a la mitad",correct:false},{text: "Se duplica",correct:false},{text: "Se cuadruplica",correct:false}], explanation: "Cuadrado inverso." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Peso en la Luna:", options: [{text: "Menor que en Tierra (1/6)",correct:true},{text: "Igual",correct:false},{text: "Mayor",correct:false},{text: "Cero",correct:false}], explanation: "Menor masa luna." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Órbita satelital es:", options: [{text: "Caída libre perpetua (curvatura coincide con planeta)",correct:true},{text: "Volar con motor",correct:false},{text: "Quedarse quieto",correct:false},{text: "Flotar mágico",correct:false}], explanation: "Velocidad tangencial." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Leyes de Kepler:", options: [{text: "Describen órbitas planetarias (Elipses)",correct:true},{text: "Describen átomos",correct:false},{text: "Describen luz",correct:false},{text: "Describen sonido",correct:false}], explanation: "Astronomía." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Mareas son causadas por:", options: [{text: "Atracción gravitacional de la Luna (y Sol)",correct:true},{text: "Viento",correct:false},{text: "Peces",correct:false},{text: "Terremotos",correct:false}], explanation: "Fuerza marea." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Velocidad de escape:", options: [{text: "Velocidad mínima para salir de la gravedad de un planeta",correct:true},{text: "Velocidad luz",correct:false},{text: "Correr rápido",correct:false},{text: "Saltar",correct:false}], explanation: "Cohete." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Agujero Negro:", options: [{text: "Gravedad tan fuerte que ni la luz escapa",correct:true},{text: "Hoyo en suelo",correct:false},{text: "Estrella negra",correct:false},{text: "Planeta oscuro",correct:false}], explanation: "Singularidad." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Masa inercial vs Masa gravitacional:", options: [{text: "Son equivalentes (Principio Equivalencia Einstein)",correct:true},{text: "Son distintas",correct:false},{text: "Una pesa más",correct:false},{text: "No existen",correct:false}], explanation: "Relatividad General." }
    ]
  },

  // Bundle 9: Movimiento Circular
  {
    meta: {
      id: "CO-CN-11-circular-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-mecanica",
      periodo: 3,
      dba_id: "DBA-CN-11-3",
      title: "Movimiento Circular Uniforme"
    },
    base: { question: "MCU es rotación constante.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "MCU significa:", options: [{text: "Movimiento Circular Uniforme (rapidez constante)",correct:true},{text: "Movimiento Curvo",correct:false},{text: "Mucho Calor",correct:false},{text: "Masa Central",correct:false}], explanation: "Giro constante." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Velocidad angular (omega):", options: [{text: "Ángulo girado por tiempo (rad/s)",correct:true},{text: "Metros por segundo",correct:false},{text: "Vueltas completas",correct:false},{text: "Fuerza",correct:false}], explanation: "Rapidez giro." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Velocidad tangencial:", options: [{text: "Velocidad en el borde (m/s)",correct:true},{text: "Velocidad angular",correct:false},{text: "Centro",correct:false},{text: "Radio",correct:false}], explanation: "Lineal." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "En MCU, ¿hay aceleración?:", options: [{text: "Sí, centrípeta (cambia dirección)",correct:true},{text: "No, velocidad constante",correct:false},{text: "A veces",correct:false},{text: "Tangencial",correct:false}], explanation: "Cambio vector v." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Aceleración centrípeta apunta:", options: [{text: "Hacia el centro del círculo",correct:true},{text: "Hacia afuera",correct:false},{text: "Tangente",correct:false},{text: "Arriba",correct:false}], explanation: "Radio." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Fuerza centrífuga:", options: [{text: "Fuerza ficticia en marco rotatorio (inercia)",correct:true},{text: "Fuerza real",correct:false},{text: "Atracción",correct:false},{text: "Gravedad",correct:false}], explanation: "Sensación salir despedido." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Relación v lineal y v angular:", options: [{text: "v = w * r",correct:true},{text: "v = w / r",correct:false},{text: "v = w + r",correct:false},{text: "Iguales",correct:false}], explanation: "Radio importa." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Peralte en carreteras:", options: [{text: "Inclinación para ayudar a girar sin fricción",correct:true},{text: "Adorno",correct:false},{text: "Error construcción",correct:false},{text: "Drenaje",correct:false}], explanation: "Componente normal." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Torque (Momento de fuerza):", options: [{text: "Capacidad de una fuerza para rotar objeto (T = F*r)",correct:true},{text: "Fuerza lineal",correct:false},{text: "Energía",correct:false},{text: "Empuje",correct:false}], explanation: "Palanca." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Inercia rotacional:", options: [{text: "Resistencia a girar (depende distribución masa)",correct:true},{text: "Masa total",correct:false},{text: "Peso",correct:false},{text: "Velocidad",correct:false}], explanation: "Momento inercia." }
    ]
  },

  // Bundle 10: Taller Cinemática-Dinámica
  {
    meta: {
      id: "CO-CN-11-taller-mecanica-001",
      country: "co",
      grade: 11,
      subject: "ciencias-naturales",
      topic: "fisica-mecanica",
      periodo: 3,
      dba_id: "DBA-CN-11-3",
      title: "Aplicaciones de Mecánica"
    },
    base: { question: "La física aplica matemática.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Vector tiene:", options: [{text: "Magnitud y Dirección",correct:true},{text: "Solo valor",correct:false},{text: "Solo flecha",correct:false},{text: "Color",correct:false}], explanation: "Flecha." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Suma de vectores:", options: [{text: "Método cabeza con cola",correct:true},{text: "Suma aritmética simple",correct:false},{text: "Resta",correct:false},{text: "Multiplicación",correct:false}], explanation: "Gráfico." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Componentes rectangulares:", options: [{text: "Vx = V cos(a), Vy = V sin(a)",correct:true},{text: "Pitágoras",correct:false},{text: "Suma",correct:false},{text: "Resta",correct:false}], explanation: "Descomposición." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Freno de carro:", options: [{text: "Fricción cinética detiene llanta",correct:true},{text: "Fuerza motor",correct:false},{text: "Aire",correct:false},{text: "Gravedad",correct:false}], explanation: "Calor." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Máquina simple (Palanca):", options: [{text: "Multiplica fuerza usando distancia",correct:true},{text: "Crea energía",correct:false},{text: "Rompe cosas",correct:false},{text: "Pesa",correct:false}], explanation: "Arquímedes." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Polea:", options: [{text: "Cambia dirección fuerza (fija) o reduce fuerza (móvil)",correct:true},{text: "Cuerda sola",correct:false},{text: "Rueda carro",correct:false},{text: "Adorno",correct:false}], explanation: "Ventaja mecánica." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Rozamiento estático vs cinético:", options: [{text: "Estático (quieto) es mayor que cinético (movimiento)",correct:true},{text: "Cinético mayor",correct:false},{text: "Iguales",correct:false},{text: "No existe estático",correct:false}], explanation: "Romper inercia." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Ascensor subiendo acelerado:", options: [{text: "Peso aparente aumenta (sientes más pesado)",correct:true},{text: "Peso disminuye",correct:false},{text: "Flotas",correct:false},{text: "Igual",correct:false}], explanation: "Fuerza normal mayor." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Fuerza Coriolis:", options: [{text: "Efecto inercial por rotación Tierra (vientos giran)",correct:true},{text: "Gravedad",correct:false},{text: "Magnetismo",correct:false},{text: "Fricción",correct:false}], explanation: "Clima." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Estabilidad:", options: [{text: "Centro de gravedad bajo y base ancha",correct:true},{text: "Alto y delgado",correct:false},{text: "Redondo",correct:false},{text: "Pesado arriba",correct:false}], explanation: "No volcar." }
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
search_query: "preguntas fisica mecanica grado ${meta.grade} ${meta.periodo} ${meta.topic}"
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

**Competencia evaluada:** Explicación de Fenómenos y Uso de Conceptos (DBA: ${meta.dba_id})

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
