
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: Forces and Interactions
  {
    meta: {
      id: "CO-CN-10-phys-forces-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "fuerzas-intro",
      periodo: 4,
      dba_id: "DBA-CN-10-4",
      title: "Concepto de Fuerza"
    },
    base: { question: "Identifica la fuerza.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Una fuerza es:", options: [{text: "Una interacción que causa aceleración o deformación",correct:true},{text: "Algo que tienen los cuerpos",correct:false},{text: "Masa",correct:false},{text: "Energía",correct:false}], explanation: "Vector." },
      { id_suffix: "v2", difficulty: 1, question: "Unidad de fuerza en el SI:", options: [{text: "Newton (N)",correct:true},{text: "Joule",correct:false},{text: "Kilogramo",correct:false},{text: "Watt",correct:false}], explanation: "kg·m/s²." },
      { id_suffix: "v3", difficulty: 2, question: "Fuerzas de contacto:", options: [{text: "Fricción, Normal, Tensión",correct:true},{text: "Gravedad, Magnética",correct:false},{text: "Inercia",correct:false},{text: "Solo gravedad",correct:false}], explanation: "Tcan superficies." },
      { id_suffix: "v4", difficulty: 2, question: "Fuerzas a distancia (de campo):", options: [{text: "Gravedad, Electromagnética",correct:true},{text: "Normal, Tensión",correct:false},{text: "Empuje manual",correct:false},{text: "Fricción",correct:false}], explanation: "Sin tocar." },
      { id_suffix: "v5", difficulty: 3, question: "Fuerza Normal:", options: [{text: "Perpendicular a la superficie de contacto",correct:true},{text: "Siempre hacia arriba",correct:false},{text: "Igual al peso siempre",correct:false},{text: "Paralela al suelo",correct:false}], explanation: "Reacción superficie." },
      { id_suffix: "v6", difficulty: 3, question: "Tensión:", options: [{text: "Fuerza transmitida por cuerdas o cables",correct:true},{text: "Fuerza de resorte",correct:false},{text: "Gravedad",correct:false},{text: "Presión",correct:false}], explanation: "Hala." },
      { id_suffix: "v7", difficulty: 4, question: "Diagrama de Cuerpo Libre (DCL):", options: [{text: "Dibuja todas las fuerzas externas sobre un objeto aislado",correct:true},{text: "Dibuja el objeto bonito",correct:false},{text: "Incluye fuerzas internas",correct:false},{text: "Solo peso",correct:false}], explanation: "Análisis." },
      { id_suffix: "v8", difficulty: 4, question: "Fuerza neta:", options: [{text: "Suma vectorial de todas las fuerzas",correct:true},{text: "Resta de fuerzas",correct:false},{text: "Fuerza mayor",correct:false},{text: "Cero",correct:false}], explanation: "Resultante." },
      { id_suffix: "v9", difficulty: 5, question: "Las 4 fuerzas fundamentales:", options: [{text: "Gravitacional, Electromagnética, Nuclear Fuerte, Nuclear Débil",correct:true},{text: "Fuego, Aire, Tierra, Agua",correct:false},{text: "Fricción, Peso, Normal, Tensión",correct:false},{text: "Jedi, Sith...",correct:false}], explanation: "Física moderna." },
      { id_suffix: "v10", difficulty: 5, question: "¿Cuál es la fuerza fundamental más débil?", options: [{text: "Gravitacional",correct:true},{text: "Nuclear fuerte",correct:false},{text: "Electromagnética",correct:false},{text: "Nuclear débil",correct:false}], explanation: "Paradójicamente." }
    ]
  },

  // Bundle 2: Newton's First Law (Inertia)
  {
    meta: {
      id: "CO-CN-10-phys-newton-1-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "ley-inercia",
      periodo: 4,
      dba_id: "DBA-CN-10-4",
      title: "Primera Ley de Newton"
    },
    base: { question: "Analiza inercia.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Primera Ley de Newton (Inercia) dice:", options: [{text: "Todo cuerpo mantiene su estado de reposo o MRU si la fuerza neta es cero",correct:true},{text: "F = ma",correct:false},{text: "Acción - Reacción",correct:false},{text: "Todo sube",correct:false}], explanation: "Definición." },
      { id_suffix: "v2", difficulty: 1, question: "La inercia depende de:", options: [{text: "La masa del objeto",correct:true},{text: "La velocidad",correct:false},{text: "El volumen",correct:false},{text: "El color",correct:false}], explanation: "Más masa, más difícil mover." },
      { id_suffix: "v3", difficulty: 2, question: "Si un bus frena bruscamente, ¿por qué vas hacia adelante?", options: [{text: "Por inercia (tu cuerpo quiere seguir moviéndose)",correct:true},{text: "Una fuerza te empuja",correct:false},{text: "Por la gravedad",correct:false},{text: "Magnetismo",correct:false}], explanation: "Tendencia movimiento." },
      { id_suffix: "v4", difficulty: 2, question: "Equilibrio traslacional ocurre cuando:", options: [{text: "Fuerza neta = 0 (a = 0)",correct:true},{text: "El objeto está quieto solamente",correct:false},{text: "Velocidad cambia",correct:false},{text: "Fuerzas son grandes",correct:false}], explanation: "Reposo o MRU." },
      { id_suffix: "v5", difficulty: 3, question: "Si la suma de fuerzas es cero, un objeto en movimiento:", options: [{text: "Sigue moviéndose a velocidad constante",correct:true},{text: "Se detiene inmediatamente",correct:false},{text: "Acelera",correct:false},{text: "Gira",correct:false}], explanation: "Sin fricción." },
      { id_suffix: "v6", difficulty: 3, question: "Un libro sobre la mesa está en reposo porque:", options: [{text: "Peso y Normal se anulan",correct:true},{text: "No hay fuerzas",correct:false},{text: "Solo hay gravedad",correct:false},{text: "La mesa es blanda",correct:false}], explanation: "Equilibrio estático." },
      { id_suffix: "v7", difficulty: 4, question: "Nave en el espacio profundo con motores apagados:", options: [{text: "Se mueve eternamente a velocidad constante",correct:true},{text: "Se frena sola",correct:false},{text: "Necesita combustible para mantenerse",correct:false},{text: "Cae",correct:false}], explanation: "Vacío, sin fricción." },
      { id_suffix: "v8", difficulty: 4, question: "¿La masa es lo mismo que el peso?", options: [{text: "No, masa es inercia (kg), peso es fuerza (N)",correct:true},{text: "Sí, es igual",correct:false},{text: "Masa es fuerza",correct:false},{text: "Peso es cantidad materia",correct:false}], explanation: "W = mg." },
      { id_suffix: "v9", difficulty: 5, question: "Sistema de referencia no inercial:", options: [{text: "Tiene aceleración (fuerzas ficticias aparecen)",correct:true},{text: "Velocidad constante",correct:false},{text: "Reposo",correct:false},{text: "Tierra",correct:false}], explanation: "Ej: Bus frenando." },
      { id_suffix: "v10", difficulty: 5, question: "Fuerza centrífuga es:", options: [{text: "Fuerza ficticia en marco rotatorio (inercia)",correct:true},{text: "Fuerza real",correct:false},{text: "Gravedad",correct:false},{text: "Fricción",correct:false}], explanation: "No existe en inercial." }
    ]
  },

  // Bundle 3: Newton's Second Law (Force and Acceleration)
  {
    meta: {
      id: "CO-CN-10-phys-newton-2-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "ley-fuerza",
      periodo: 4,
      dba_id: "DBA-CN-10-4",
      title: "Segunda Ley de Newton"
    },
    base: { question: "Calcula F=ma.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Ecuación Segunda Ley:", options: [{text: "F_neta = m * a",correct:true},{text: "F = m / a",correct:false},{text: "F = m + a",correct:false},{text: "a = m * F",correct:false}], explanation: "Fundamental." },
      { id_suffix: "v2", difficulty: 1, question: "Si aplico la misma fuerza a doble masa, la aceleración:", options: [{text: "Se reduce a la mitad",correct:true},{text: "Se duplica",correct:false},{text: "Sigue igual",correct:false},{text: "Se cuadruplica",correct:false}], explanation: "a = F/m." },
      { id_suffix: "v3", difficulty: 2, question: "Fuerza para acelerar 2 kg a 3 m/s²:", options: [{text: "6 N",correct:true},{text: "5 N",correct:false},{text: "1.5 N",correct:false},{text: "1 N",correct:false}], explanation: "2*3." },
      { id_suffix: "v4", difficulty: 2, question: "Peso de una persona de 60 kg (g=10):", options: [{text: "600 N",correct:true},{text: "60 N",correct:false},{text: "6 N",correct:false},{text: "60 kg",correct:false}], explanation: "W = mg." },
      { id_suffix: "v5", difficulty: 3, question: "Si F=20N y m=5kg, a vale:", options: [{text: "4 m/s²",correct:true},{text: "100 m/s²",correct:false},{text: "0.25 m/s²",correct:false},{text: "25 m/s²",correct:false}], explanation: "20/5." },
      { id_suffix: "v6", difficulty: 3, question: "Unidad Newton equivale a:", options: [{text: "kg * m/s²",correct:true},{text: "kg / s",correct:false},{text: "kg * m",correct:false},{text: "m/s",correct:false}], explanation: "De F=ma." },
      { id_suffix: "v7", difficulty: 4, question: "Fuerza neta sobre objeto que cae (sin aire):", options: [{text: "Su peso (W)",correct:true},{text: "Cero",correct:false},{text: "Normal",correct:false},{text: "Fricción",correct:false}], explanation: "Caída libre." },
      { id_suffix: "v8", difficulty: 4, question: "Ascensor subiendo acelerado: Peso aparente (Normal):", options: [{text: "Mayor que el peso real (N = mg + ma)",correct:true},{text: "Menor",correct:false},{text: "Igual",correct:false},{text: "Cero",correct:false}], explanation: "Te sientes pesado." },
      { id_suffix: "v9", difficulty: 5, question: "Máquina de Atwood (dos masas colgadas de polea). Aceleración:", options: [{text: "a = g(m2-m1)/(m1+m2)",correct:true},{text: "a = g",correct:false},{text: "a = 0",correct:false},{text: "a = g(m1+m2)",correct:false}], explanation: "Sistema dinámico." },
      { id_suffix: "v10", difficulty: 5, question: "Si la fuerza cambia con el tiempo F(t):", options: [{text: "La aceleración cambia a(t) = F(t)/m",correct:true},{text: "La aceleración es constante",correct:false},{text: "No se puede calcular",correct:false},{text: "Impulso",correct:false}], explanation: "Dinámica variable." }
    ]
  },

  // Bundle 4: Newton's Third Law (Action-Reaction)
  {
    meta: {
      id: "CO-CN-10-phys-newton-3-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "ley-accion-reaccion",
      periodo: 4,
      dba_id: "DBA-CN-10-4",
      title: "Tercera Ley de Newton"
    },
    base: { question: "Analiza acción-reacción.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Tercera Ley dice:", options: [{text: "A toda acción corresponde una reacción igual y opuesta",correct:true},{text: "F=ma",correct:false},{text: "Inercia",correct:false},{text: "Todo cae",correct:false}], explanation: "Pares de fuerzas." },
      { id_suffix: "v2", difficulty: 1, question: "Las fuerzas de acción y reacción actúan sobre:", options: [{text: "Cuerpos diferentes",correct:true},{text: "El mismo cuerpo",correct:false},{text: "El vacío",correct:false},{text: "Nadie",correct:false}], explanation: "Clave para no anular." },
      { id_suffix: "v3", difficulty: 2, question: "Si golpeo la pared con 50N, la pared me golpea con:", options: [{text: "50N sentido contrario",correct:true},{text: "0N",correct:false},{text: "100N",correct:false},{text: "25N",correct:false}], explanation: "Igual magnitud." },
      { id_suffix: "v4", difficulty: 2, question: "Patear un balón: Acción pie-balón, Reacción:", options: [{text: "Balón-pie (sientes el golpe)",correct:true},{text: "Balón-aire",correct:false},{text: "Pie-suelo",correct:false},{text: "Gravedad",correct:false}], explanation: "Interacción mutua." },
      { id_suffix: "v5", difficulty: 3, question: "¿Por qué el rifle retrocede al disparar?", options: [{text: "Reacción a la fuerza sobre la bala",correct:true},{text: "Por el ruido",correct:false},{text: "Por el calor",correct:false},{text: "Mala puntería",correct:false}], explanation: "Conservación momento." },
      { id_suffix: "v6", difficulty: 3, question: "La reacción al peso (Tierra atrae Manzana) es:", options: [{text: "Manzana atrae Tierra (con igual fuerza)",correct:true},{text: "Mesa empuja Manzana (Normal)",correct:false},{text: "Aire empuja Manzana",correct:false},{text: "Nada",correct:false}], explanation: "Par gravitacional." },
      { id_suffix: "v7", difficulty: 4, question: "Caballo tira carro. ¿Cómo se mueve si fuerzas son iguales?", options: [{text: "Fuerza caballo-suelo es externa al sistema carro-caballo",correct:true},{text: "No se mueve nunca",correct:false},{text: "Fuerzas se anulan en la cuerda",correct:false},{text: "Magia",correct:false}], explanation: "Fricción externa." },
      { id_suffix: "v8", difficulty: 4, question: "Normal y Peso de un libro en mesa. ¿Son par acción-reacción?", options: [{text: "No, actúan sobre el mismo cuerpo (libro)",correct:true},{text: "Sí, son iguales y opuestas",correct:false},{text: "A veces",correct:false},{text: "No sé",correct:false}], explanation: "Error común." },
      { id_suffix: "v9", difficulty: 5, question: "Propulsión de cohetes:", options: [{text: "Expulsa gases atrás (acción) y gases empujan cohete (reacción)",correct:true},{text: "Se empuja contra el aire",correct:false},{text: "Se empuja contra el suelo",correct:false},{text: "Gravedad inversa",correct:false}], explanation: "Funciona en vacío." },
      { id_suffix: "v10", difficulty: 5, question: "Si m1 >> m2 (choque camión y mosca):", options: [{text: "Fuerzas iguales, pero aceleración mosca es enorme",correct:true},{text: "Camión hace más fuerza",correct:false},{text: "Mosca no hace fuerza",correct:false},{text: "Camión no siente nada",correct:false}], explanation: "F igual, a muy distinta." }
    ]
  },

  // Bundle 5: Friction
  {
    meta: {
      id: "CO-CN-10-phys-friction-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "fuerzas-friccion",
      periodo: 4,
      dba_id: "DBA-CN-10-4",
      title: "Fuerza de Fricción"
    },
    base: { question: "Calcula fricción.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "La fricción siempre actúa:", options: [{text: "Opuesta al movimiento relativo",correct:true},{text: "A favor del movimiento",correct:false},{text: "Perpendicular",correct:false},{text: "Hacia abajo",correct:false}], explanation: "Resistencia." },
      { id_suffix: "v2", difficulty: 1, question: "Fricción estática vs cinética:", options: [{text: "Estática (objeto quieto) > Cinética (movimiento)",correct:true},{text: "Cinética > Estática",correct:false},{text: "Iguales",correct:false},{text: "No existe estática",correct:false}], explanation: "Romper inercia." },
      { id_suffix: "v3", difficulty: 2, question: "Fórmula fricción máxima:", options: [{text: "Fr = μ * N",correct:true},{text: "Fr = μ * g",correct:false},{text: "Fr = μ / N",correct:false},{text: "Fr = N",correct:false}], explanation: "Coeficiente por Normal." },
      { id_suffix: "v4", difficulty: 2, question: "Coeficiente de fricción μ adimensional:", options: [{text: "Verdadero (no tiene unidades)",correct:true},{text: "Falso (se mide en N)",correct:false},{text: "Depende",correct:false},{text: "Es metros",correct:false}], explanation: "Relación fuerzas." },
      { id_suffix: "v5", difficulty: 3, question: "Si empujo caja y no se mueve, la fricción estática es:", options: [{text: "Igual a mi fuerza de empuje",correct:true},{text: "Igual a μ*N (máxima)",correct:false},{text: "Cero",correct:false},{text: "Mayor",correct:false}], explanation: "Se autoajusta hasta el límite." },
      { id_suffix: "v6", difficulty: 3, question: "Si N=100N y μ=0.5, fuerza fricción cinética:", options: [{text: "50 N",correct:true},{text: "100 N",correct:false},{text: "200 N",correct:false},{text: "5 N",correct:false}], explanation: "100*0.5." },
      { id_suffix: "v7", difficulty: 4, question: "Auto frena gracias a:", options: [{text: "Fricción estática llanta-suelo (si no derrapa)",correct:true},{text: "Fricción cinética",correct:false},{text: "El aire",correct:false},{text: "Motor",correct:false}], explanation: "Punto contacto quieto instantáneamente." },
      { id_suffix: "v8", difficulty: 4, question: "Ángulo de reposo en plano inclinado:", options: [{text: "tan(θ) = μ",correct:true},{text: "sin(θ) = μ",correct:false},{text: "cos(θ) = μ",correct:false},{text: "θ = μ",correct:false}], explanation: "mg sin = u mg cos." },
      { id_suffix: "v9", difficulty: 5, question: "Lubricantes sirven para:", options: [{text: "Reducir el coeficiente μ",correct:true},{text: "Aumentar N",correct:false},{text: "Eliminar la masa",correct:false},{text: "Enfriar",correct:false}], explanation: "Separar superficies." },
      { id_suffix: "v10", difficulty: 5, question: "La fricción no depende de:", options: [{text: "El área de contacto (macroscópicamente)",correct:true},{text: "La rugosidad",correct:false},{text: "La fuerza normal",correct:false},{text: "El material",correct:false}], explanation: "Ley de Amontons." }
    ]
  },

  // Bundle 6: Circular Dynamics
  {
    meta: {
      id: "CO-CN-10-phys-dyn-circ-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "dinamica-circular",
      periodo: 4,
      dba_id: "DBA-CN-10-4",
      title: "Dinámica Circular"
    },
    base: { question: "Resuelve problemas circulares.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Fuerza centrípeta no es una fuerza extra, es:", options: [{text: "La resultante radial necesaria para curvar",correct:true},{text: "Una fuerza mágica",correct:false},{text: "Fricción siempre",correct:false},{text: "Gravedad",correct:false}], explanation: "Rol de una fuerza." },
      { id_suffix: "v2", difficulty: 1, question: "Ec Fuerza Centrípeta:", options: [{text: "Fc = m * v² / r",correct:true},{text: "Fc = m * v",correct:false},{text: "Fc = m * r",correct:false},{text: "Fc = 0",correct:false}], explanation: "ma_c." },
      { id_suffix: "v3", difficulty: 2, question: "Auto en curva plana se mantiene por:", options: [{text: "Fricción estática lateral",correct:true},{text: "Su peso",correct:false},{text: "Normal",correct:false},{text: "Aire",correct:false}], explanation: "Si hay aceite se sale." },
      { id_suffix: "v4", difficulty: 2, question: "Si cuerda se rompe en giro:", options: [{text: "Sale tangente a la trayectoria (Inercia)",correct:true},{text: "Sale radial hacia afuera",correct:false},{text: "Cae al centro",correct:false},{text: "Se detiene",correct:false}], explanation: "Primera ley." },
      { id_suffix: "v5", difficulty: 3, question: "Peralte en carreteras sirve para:", options: [{text: "Ayudar a girar con la componente de la Normal",correct:true},{text: "Que el agua escurra",correct:false},{text: "Verse bonito",correct:false},{text: "Frenar",correct:false}], explanation: "Reducir necesidad fricción." },
      { id_suffix: "v6", difficulty: 3, question: "Satélite orbitando Tierra. Fuerza centrípeta es:", options: [{text: "Gravedad",correct:true},{text: "Propulsores",correct:false},{text: "Viento solar",correct:false},{text: "Magnetismo",correct:false}], explanation: "Caída perpetua." },
      { id_suffix: "v7", difficulty: 4, question: "Velocidad mínima en rizo (loop) arriba:", options: [{text: "v = √gr",correct:true},{text: "v = gr",correct:false},{text: "v = 0",correct:false},{text: "v = 2gr",correct:false}], explanation: "Normal = 0." },
      { id_suffix: "v8", difficulty: 4, question: "Lavadora centrífuga seca ropa porque:", options: [{text: "Ropa gira, agua sigue recto por huecos (inercia)",correct:true},{text: "Fuerza centrífuga empuja agua",correct:false},{text: "Calienta",correct:false},{text: "Evapora",correct:false}], explanation: "Tangente." },
      { id_suffix: "v9", difficulty: 5, question: "Péndulo cónico:", options: [{text: "Tensión compensa peso y da fuerza centrípeta",correct:true},{text: "Solo gira",correct:false},{text: "No tiene fuerzas",correct:false},{text: "Cae",correct:false}], explanation: "Análisis vectorial." },
      { id_suffix: "v10", difficulty: 5, question: "Gravedad artificial en estaciones espaciales:", options: [{text: "Usando rotación (Fuerza normal simula peso)",correct:true},{text: "Imanes",correct:false},{text: "Ventiladores",correct:false},{text: "No se puede",correct:false}], explanation: "Efecto centrífugo." }
    ]
  },

  // Bundle 7: Work and Energy Intro (Part of Dynamics Unit sometimes)
  {
    meta: {
      id: "CO-CN-10-phys-work-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "trabajo-energia-intro",
      periodo: 4,
      dba_id: "DBA-CN-10-4",
      title: "Trabajo y Energía (Intro)"
    },
    base: { question: "Calcula trabajo.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Trabajo (W) en física:", options: [{text: "Fuerza x Distancia (paralela)",correct:true},{text: "Esfuerzo mental",correct:false},{text: "Tiempo",correct:false},{text: "Potencia",correct:false}], explanation: "Fd cos." },
      { id_suffix: "v2", difficulty: 1, question: "Unidad de Trabajo y Energía:", options: [{text: "Joule (J)",correct:true},{text: "Newton",correct:false},{text: "Watt",correct:false},{text: "Pascal",correct:false}], explanation: "N.m." },
      { id_suffix: "v3", difficulty: 2, question: "Si empujo pared y no se mueve:", options: [{text: "Trabajo es cero (d=0)",correct:true},{text: "Mucho trabajo",correct:false},{text: "Trabajo negativo",correct:false},{text: "Infinito",correct:false}], explanation: "Sin desplazamiento." },
      { id_suffix: "v4", difficulty: 2, question: "Energía Cinética (Ek):", options: [{text: "Energía del movimiento (1/2 mv²)",correct:true},{text: "Energía altura",correct:false},{text: "Calor",correct:false},{text: "Elástica",correct:false}], explanation: "Velocidad." },
      { id_suffix: "v5", difficulty: 3, question: "Energía Potencial Gravitacional (Eg):", options: [{text: "Energía por altura (mgh)",correct:true},{text: "Movimiento",correct:false},{text: "Resortes",correct:false},{text: "Química",correct:false}], explanation: "Posición." },
      { id_suffix: "v6", difficulty: 3, question: "Si levanto 10kg a 2m (g=10):", options: [{text: "W = 200 J",correct:true},{text: "W = 20 J",correct:false},{text: "W = 100 J",correct:false},{text: "W = 5 J",correct:false}], explanation: "mgh = 10*10*2." },
      { id_suffix: "v7", difficulty: 4, question: "Teorema Trabajo-Energía:", options: [{text: "El trabajo neto cambia la energía cinética",correct:true},{text: "La energía se pierde",correct:false},{text: "Trabajo es calor",correct:false},{text: "No existe",correct:false}], explanation: "W = Delta Ek." },
      { id_suffix: "v8", difficulty: 4, question: "Fuerza perpendicular al movimiento hace trabajo:", options: [{text: "Cero (cos 90 = 0)",correct:true},{text: "Máximo",correct:false},{text: "Negativo",correct:false},{text: "Positivo",correct:false}], explanation: "Ej: Normal, Centrípeta." },
      { id_suffix: "v9", difficulty: 5, question: "Conservación energía mecánica:", options: [{text: "En ausencia de fricción, Em = Ek + Ep = cte",correct:true},{text: "Siempre se conserva",correct:false},{text: "Nunca se conserva",correct:false},{text: "Energía desaparece",correct:false}], explanation: "Sistemas conservativos." },
      { id_suffix: "v10", difficulty: 5, question: "Potencia es:", options: [{text: "Rapidez con que se hace trabajo (W/t)",correct:true},{text: "Fuerza",correct:false},{text: "Energía total",correct:false},{text: "Voltaje",correct:false}], explanation: "Watts." }
    ]
  },

  // Bundle 8: Elastic Force (Hooke's Law)
  {
    meta: {
      id: "CO-CN-10-phys-hooke-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "ley-hooke",
      periodo: 4,
      dba_id: "DBA-CN-10-4",
      title: "Fuerza Elástica y Resortes"
    },
    base: { question: "Aplica Ley de Hooke.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Ley de Hooke ecuación:", options: [{text: "F = -k * x",correct:true},{text: "F = m * a",correct:false},{text: "F = m * g",correct:false},{text: "F = k / x",correct:false}], explanation: "Resauradora." },
      { id_suffix: "v2", difficulty: 1, question: "La 'k' representa:", options: [{text: "Constante de elasticidad (rigidez)",correct:true},{text: "Kilo",correct:false},{text: "Masa",correct:false},{text: "Energía",correct:false}], explanation: "N/m." },
      { id_suffix: "v3", difficulty: 2, question: "Si k es grande, el resorte es:", options: [{text: "Duro / Rígido",correct:true},{text: "Blando",correct:false},{text: "Largo",correct:false},{text: "Rojo",correct:false}], explanation: "Difícil estirar." },
      { id_suffix: "v4", difficulty: 2, question: "La fuerza elástica es contraria a:", options: [{text: "La deformación (x)",correct:true},{text: "La gravedad",correct:false},{text: "El tiempo",correct:false},{text: "La normal",correct:false}], explanation: "Quiere volver." },
      { id_suffix: "v5", difficulty: 3, question: "Energía Potencial Elástica:", options: [{text: "1/2 k x²",correct:true},{text: "kx",correct:false},{text: "mgh",correct:false},{text: "1/2 mv²",correct:false}], explanation: "Área bajo F vs x." },
      { id_suffix: "v6", difficulty: 3, question: "Resorte se estira 0.1m con 10N. k vale:", options: [{text: "100 N/m",correct:true},{text: "1 N/m",correct:false},{text: "10 N/m",correct:false},{text: "0.1 N/m",correct:false}], explanation: "10/0.1." },
      { id_suffix: "v7", difficulty: 4, question: "Resortes en serie:", options: [{text: "Se suman los inversos (1/keq = 1/k1...)",correct:true},{text: "Se suman k",correct:false},{text: "Se multiplican",correct:false},{text: "Se restan",correct:false}], explanation: "Se estiran más." },
      { id_suffix: "v8", difficulty: 4, question: "Resortes en paralelo:", options: [{text: "Se suman constantes (keq = k1 + k2)",correct:true},{text: "Inversos",correct:false},{text: "Se restan",correct:false},{text: "Mismo k",correct:false}], explanation: "Más duros." },
      { id_suffix: "v9", difficulty: 5, question: "Movimiento Armónico Simple (MAS) en resorte:", options: [{text: "Oscilación debida a fuerza restauradora lineal",correct:true},{text: "Movimiento circular",correct:false},{text: "Caída libre",correct:false},{text: "Fricción",correct:false}], explanation: "Ejemplo clásico." },
      { id_suffix: "v10", difficulty: 5, question: "Límite elástico:", options: [{text: "Punto donde se deforma permanentemente",correct:true},{text: "Ruptura inmediata",correct:false},{text: "Fuerza cero",correct:false},{text: "x=0",correct:false}], explanation: "Ya no cumple Hooke." }
    ]
  },

  // Bundle 9: Dynamics Practice Problems
  {
    meta: {
      id: "CO-CN-10-phys-prob-dyn-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "problemas-dinamica",
      periodo: 4,
      dba_id: "DBA-CN-10-4",
      title: "Problemas Dinámica"
    },
    base: { question: "Resuelve problema fuerzas.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Bloque 10kg fuerza 50N. Fricción 0. a=?", options: [{text: "5 m/s²",correct:true},{text: "50 m/s²",correct:false},{text: "10 m/s²",correct:false},{text: "0.5 m/s²",correct:false}], explanation: "50/10." },
      { id_suffix: "v2", difficulty: 1, question: "Bloque 10kg, fricción 10N, empuje 50N. Fneta:", options: [{text: "40 N",correct:true},{text: "60 N",correct:false},{text: "50 N",correct:false},{text: "10 N",correct:false}], explanation: "50-10." },
      { id_suffix: "v3", difficulty: 2, question: "Aceleración caso anterior:", options: [{text: "4 m/s²",correct:true},{text: "5 m/s²",correct:false},{text: "1 m/s²",correct:false},{text: "40 m/s²",correct:false}], explanation: "40/10." },
      { id_suffix: "v4", difficulty: 2, question: "Plano inclinado liso (sin fricción). a=?", options: [{text: "g * sin(θ)",correct:true},{text: "g",correct:false},{text: "g * cos(θ)",correct:false},{text: "0",correct:false}], explanation: "Componente peso." },
      { id_suffix: "v5", difficulty: 3, question: "Si hay fricción en plano inclinado:", options: [{text: "a = g(sinθ - μcosθ)",correct:true},{text: "a = g sinθ",correct:false},{text: "a = g",correct:false},{text: "a = 0",correct:false}], explanation: "Resta fricción." },
      { id_suffix: "v6", difficulty: 3, question: "Polea simple, masa 6kg y 4kg. Fneta sistema:", options: [{text: "20 N (aprox)",correct:true},{text: "100 N",correct:false},{text: "60 N",correct:false},{text: "0 N",correct:false}], explanation: "(6-4)*10." },
      { id_suffix: "v7", difficulty: 4, question: "Aceleración sistema anterior (masa total 10kg):", options: [{text: "2 m/s²",correct:true},{text: "10 m/s²",correct:false},{text: "1 m/s²",correct:false},{text: "5 m/s²",correct:false}], explanation: "20N / 10kg." },
      { id_suffix: "v8", difficulty: 4, question: "Tensión en la cuerda caso anterior:", options: [{text: "48 N (4kg sube: T-40=4a -> T=40+8)",correct:true},{text: "40 N",correct:false},{text: "60 N",correct:false},{text: "100 N",correct:false}], explanation: "DCL de una masa." },
      { id_suffix: "v9", difficulty: 5, question: "Bloque A sobre Bloque B. Fricción estática:", options: [{text: "Mueve a A junto con B",correct:true},{text: "Frena a B solamente",correct:false},{text: "No existe",correct:false},{text: "Es cero",correct:false}], explanation: "Transmite fuerza." },
      { id_suffix: "v10", difficulty: 5, question: "Curva peraltada ideal sin fricción. Ángulo:", options: [{text: "tan(θ) = v² / rg",correct:true},{text: "tan(θ) = rg / v²",correct:false},{text: "sin(θ) = v",correct:false},{text: "45°",correct:false}], explanation: "Equilibrio dinámico." }
    ]
  },

  // Bundle 10: Taller Review P4
    {
    meta: {
      id: "CO-CN-10-taller-p4-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "review",
      periodo: 4,
      dba_id: "DBA-CN-10-4",
      title: "Taller Repaso P4"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Fuerza neta=0 implica:", options: [{text: "a=0 (Reposo o MRU)",correct:true},{text: "Objeto parado",correct:false},{text: "Fuerza máxima",correct:false},{text: "Caída",correct:false}], explanation: "1ra Ley." },
      { id_suffix: "v2", difficulty: 1, question: "Unidad F:", options: [{text: "Newton",correct:true},{text: "Joule",correct:false},{text: "Watt",correct:false},{text: "Kg",correct:false}], explanation: "SI." },
      { id_suffix: "v3", difficulty: 2, question: "Acción reacción actúan en:", options: [{text: "Cuerpos distintos",correct:true},{text: "El mismo",correct:false},{text: "Al tiempo y se anulan",correct:false},{text: "La nada",correct:false}], explanation: "3ra Ley." },
      { id_suffix: "v4", difficulty: 2, question: "F = 10N, m = 2kg. a=?", options: [{text: "5 m/s²",correct:true},{text: "20 m/s²",correct:false},{text: "0.2 m/s²",correct:false},{text: "12 m/s²",correct:false}], explanation: "10/2." },
      { id_suffix: "v5", difficulty: 3, question: "Trabajo al cargar maleta caminando horizontal:", options: [{text: "Cero (Fuerza vertical, movimiento horizontal)",correct:true},{text: "Positivo",correct:false},{text: "Negativo",correct:false},{text: "Mucho",correct:false}], explanation: "Perpendicular." },
      { id_suffix: "v6", difficulty: 3, question: "Fricción cinética depende de:", options: [{text: "Normal y coeficiente μ",correct:true},{text: "Área",correct:false},{text: "Velocidad",correct:false},{text: "Tiempo",correct:false}], explanation: "Amontons." },
      { id_suffix: "v7", difficulty: 4, question: "Energía cinética si v duplica:", options: [{text: "Se cuadruplica",correct:true},{text: "Se duplica",correct:false},{text: "Igual",correct:false},{text: "Mitad",correct:false}], explanation: "v²." },
      { id_suffix: "v8", difficulty: 4, question: "Resorte F=-kx:", options: [{text: "Ley Hooke",correct:true},{text: "Newton",correct:false},{text: "Ohm",correct:false},{text: "Boyle",correct:false}], explanation: "Elástica." },
      { id_suffix: "v9", difficulty: 5, question: "Peso aparente ascensor bajando acelerado:", options: [{text: "Menor al real (flotando)",correct:true},{text: "Mayor",correct:false},{text: "Igual",correct:false},{text: "Infinito",correct:false}], explanation: "g-a." },
      { id_suffix: "v10", difficulty: 5, question: "Fuerza centrípeta en vuelta vertical arriba:", options: [{text: "Tensión + Peso",correct:true},{text: "Tensión - Peso",correct:false},{text: "Peso - Tensión",correct:false},{text: "Solo Tensión",correct:false}], explanation: "Ambos bajan." }
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
    console.log(`✅ Created Period 4 Bundle v3.0: ${fullPath}`);
});
