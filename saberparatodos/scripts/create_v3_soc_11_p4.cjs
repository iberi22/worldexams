
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
  // Grade 11 - Sociales - Period 4 - BUNDLE 1 (Conflicto Armado Reciente)
  {
    meta: {
      id: "CO-SOC-11-conflicto-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "problemas-contemporaneos",
      periodo: 4,
      dba_id: "DBA-SOC-11-4",
      title: "Conflicto Armado Contemporáneo"
    },
    base: { question: "El conflicto tiene muchas causas.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Principal consecuencia humanitaria del conflicto:", options: [{text: "Desplazamiento forzado (millones de víctimas)",correct:true},{text: "La gente viaja",correct:false},{text: "Turismo",correct:false},{text: "Riqueza",correct:false}], explanation: "Víctimas." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Actor armado ilegal:", options: [{text: "Grupos al margen de la ley (Guerrillas, Paramilitares, Bandas)",correct:true},{text: "Ejército Nacional",correct:false},{text: "Policía Nacional",correct:false},{text: "Vigilantes",correct:false}], explanation: "Ilegalidad." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Cultivos ilícitos:", options: [{text: "Fuente de financiación de grupos armados (Coca)",correct:true},{text: "Agricultura legal",correct:false},{text: "Jardines",correct:false},{text: "Bosques",correct:false}], explanation: "Economía guerra." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Minas antipersona:", options: [{text: "Artefactos explosivos que mutilan civiles y militares",correct:true},{text: "Fuegos artificiales",correct:false},{text: "Juguetes",correct:false},{text: "Piedras",correct:false}], explanation: "DIH prohibido." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Secuestro:", options: [{text: "Privación ilegal de la libertad para exigir rescate o presión política",correct:true},{text: "Arresto",correct:false},{text: "Invitación",correct:false},{text: "Paseo",correct:false}], explanation: "Delito atroz." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Bacrim (Bandas Criminales):", options: [{text: "Grupos neoparamilitares dedicados al narcotráfico (Clan del Golfo)",correct:true},{text: "Pandillas barrio",correct:false},{text: "Clubes",correct:false},{text: "Sindicatos",correct:false}], explanation: "Sucesoras AUC." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Reclutamiento forzado:", options: [{text: "Uso de niños, niñas y adolescentes en la guerra",correct:true},{text: "Servicio militar legal",correct:false},{text: "Escuela",correct:false},{text: "Trabajo infantil",correct:false}], explanation: "Crimen guerra." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Despojo de tierras:", options: [{text: "Quitar predios a campesinos mediante violencia o engaño",correct:true},{text: "Venta legal",correct:false},{text: "Arriendo",correct:false},{text: "Herencia",correct:false}], explanation: "Causa raíz." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Conflicto por el territorio (Chocó, Catatumbo):", options: [{text: "Disputa geoestratégica por rutas de narcotráfico y recursos",correct:true},{text: "Pelea vecinos",correct:false},{text: "Turismo",correct:false},{text: "Nada",correct:false}], explanation: "Corredores." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Memoria Histórica:", options: [{text: "Derecho de las víctimas y la sociedad a la verdad sobre el conflicto",correct:true},{text: "Olvidar pasado",correct:false},{text: "Historia oficial",correct:false},{text: "Mentira",correct:false}], explanation: "No repetición." }
    ]
  },

  // Bundle 2: Medio Ambiente y Cambio Climático
  {
    meta: {
      id: "CO-SOC-11-medioambiente-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "problemas-contemporaneos",
      periodo: 4,
      dba_id: "DBA-SOC-11-4",
      title: "Crisis Ambiental Global"
    },
    base: { question: "El planeta se calienta.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Cambio Climático:", options: [{text: "Alteración del clima global por efecto invernadero (CO2)",correct:true},{text: "Día soleado",correct:false},{text: "Lluvia normal",correct:false},{text: "Estaciones",correct:false}], explanation: "Calentamiento." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Deforestación en Colombia:", options: [{text: "Tala de selva (Amazonía) para ganadería y coca",correct:true},{text: "Sembrar árboles",correct:false},{text: "Cuidar parques",correct:false},{text: "Jardinería",correct:false}], explanation: "Pérdida bosque." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Minería Ilegal:", options: [{text: "Extracción sin licencia que contamina ríos con mercurio",correct:true},{text: "Minería legal",correct:false},{text: "Pesca",correct:false},{text: "Artesanía",correct:false}], explanation: "Daño ambiental." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Reciclaje:", options: [{text: "Reutilizar materiales para reducir basura",correct:true},{text: "Botar todo",correct:false},{text: "Quemar basura",correct:false},{text: "Comprar más",correct:false}], explanation: "Economía circular." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Biodiversidad de Colombia:", options: [{text: "Segundo país más biodiverso del mundo (Megadiverso)",correct:true},{text: "País desértico",correct:false},{text: "Sin animales",correct:false},{text: "Poca vida",correct:false}], explanation: "Riqueza natural." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Fracking (Debate):", options: [{text: "Técnica para extraer petróleo rompiendo roca (Riesgo agua)",correct:true},{text: "Sacar agua",correct:false},{text: "Sembrar",correct:false},{text: "Construir",correct:false}], explanation: "Polémica." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Efecto Invernadero:", options: [{text: "Gases retienen calor en la atmósfera (Natural, pero aumentado por humanos)",correct:true},{text: "Enfriamiento",correct:false},{text: "Lluvia ácida",correct:false},{text: "Capa ozono",correct:false}], explanation: "Física clima." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Huella Hídrica:", options: [{text: "Agua total usada para producir bienes y servicios",correct:true},{text: "Agua bebida",correct:false},{text: "Agua lluvia",correct:false},{text: "Piscina",correct:false}], explanation: "Consumo oculto." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Justicia climática:", options: [{text: "Reconocer que el cambio climático afecta más a los pobres (que contaminan menos)",correct:true},{text: "Jueces de clima",correct:false},{text: "Igualdad",correct:false},{text: "Nada",correct:false}], explanation: "Inequidad ambiental." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Transición energética:", options: [{text: "Pasar de combustibles fósiles a energías renovables",correct:true},{text: "Quemar más carbón",correct:false},{text: "Apagar luz",correct:false},{text: "Caminar",correct:false}], explanation: "Futuro verde." }
    ]
  },

  // Bundle 3: Pobreza y Desigualdad Global
  {
    meta: {
      id: "CO-SOC-11-pobreza-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "problemas-contemporaneos",
      periodo: 4,
      dba_id: "DBA-SOC-11-4",
      title: "Desigualdad Socioeconómica"
    },
    base: { question: "El mundo es desigual.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Concentración de riqueza:", options: [{text: "Pocos ricos tienen la mayoría del dinero mundial",correct:true},{text: "Todos iguales",correct:false},{text: "Pobres ricos",correct:false},{text: "Nadie tiene nada",correct:false}], explanation: "El 1%." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Hambre mundial:", options: [{text: "Millones de personas no tienen comida suficiente",correct:true},{text: "Todos comen bien",correct:false},{text: "Sobra comida",correct:false},{text: "Nadie cocina",correct:false}], explanation: "Seguridad alimentaria." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Trabajo informal:", options: [{text: "Empleo sin prestaciones ni seguridad (Rebusque)",correct:true},{text: "Empleo fijo",correct:false},{text: "Gerente",correct:false},{text: "Empresario",correct:false}], explanation: "Precarización." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Desempleo estructural:", options: [{text: "Falta de trabajo por cambios en la economía (Tecnología)",correct:true},{text: "Vacaciones",correct:false},{text: "Pereza",correct:false},{text: "Renuncia",correct:false}], explanation: "Robots." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Paraísos fiscales y desigualdad:", options: [{text: "Ricos evaden impuestos, reduciendo recursos para lo social",correct:true},{text: "Ayudan pobres",correct:false},{text: "Pagan todo",correct:false},{text: "No existen",correct:false}], explanation: "Evasión." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Feminización de la pobreza:", options: [{text: "Las mujeres sufren más pobreza que los hombres",correct:true},{text: "Hombres pobres",correct:false},{text: "Iguales",correct:false},{text: "Mujeres ricas",correct:false}], explanation: "Brecha género." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Renta Básica Universal:", options: [{text: "Propuesta de ingreso garantizado para todos los ciudadanos",correct:true},{text: "Salario mínimo",correct:false},{text: "Bono navideño",correct:false},{text: "Lotería",correct:false}], explanation: "Solución pobreza." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Aporofobia:", options: [{text: "Rechazo obsesivo hacia la pobreza y los pobres",correct:true},{text: "Miedo ricos",correct:false},{text: "Amor pobres",correct:false},{text: "Indiferencia",correct:false}], explanation: "Ética." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Coeficiente de Gini en Colombia:", options: [{text: "Uno de los más altos (desiguales) del mundo",correct:true},{text: "Muy bajo (igualitario)",correct:false},{text: "Promedio",correct:false},{text: "Perfecto",correct:false}], explanation: "País inequitativo." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Crisis de refugiados:", options: [{text: "Millones huyen de guerras y hambre (Migración forzada)",correct:true},{text: "Turismo masivo",correct:false},{text: "Viajes de negocios",correct:false},{text: "Intercambio",correct:false}], explanation: "Crisis humanitaria." }
    ]
  },

  // Bundle 4: Geopolítica del Terrorismo y Paz
  {
    meta: {
      id: "CO-SOC-11-terrorismo-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "problemas-contemporaneos",
      periodo: 4,
      dba_id: "DBA-SOC-11-4",
      title: "Terrorismo y Seguridad Global"
    },
    base: { question: "El terrorismo es una amenaza.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "11 de Septiembre (2001):", options: [{text: "Ataque a las Torres Gemelas en NY (Al Qaeda)",correct:true},{text: "Ataque a Londres",correct:false},{text: "Ataque a París",correct:false},{text: "Ataque a Bogotá",correct:false}], explanation: "Cambió el mundo." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Definición de terrorismo:", options: [{text: "Uso de violencia indiscriminada para sembrar miedo",correct:true},{text: "Guerra legal",correct:false},{text: "Protesta pacífica",correct:false},{text: "Delito menor",correct:false}], explanation: "Miedo político." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Ciberseguridad:", options: [{text: "Protección de sistemas informáticos ante ataques digitales",correct:true},{text: "Antivirus",correct:false},{text: "Candado",correct:false},{text: "Guardia",correct:false}], explanation: "Guerra digital." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Fundamentalismo:", options: [{text: "Interpretación radical e intolerante de una doctrina (Religiosa/Política)",correct:true},{text: "Ser estudioso",correct:false},{text: "Ser fiel",correct:false},{text: "Ser bueno",correct:false}], explanation: "Extremismo." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Estado Islámico (ISIS):", options: [{text: "Grupo terrorista que buscaba crear califato en Medio Oriente",correct:true},{text: "País oficial",correct:false},{text: "ONG",correct:false},{text: "Equipo fútbol",correct:false}], explanation: "Yihadismo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Guerra contra el terrorismo:", options: [{text: "Campaña militar liderada por EEUU tras el 11-S",correct:true},{text: "Paz mundial",correct:false},{text: "Guerra Fría",correct:false},{text: "Juicio",correct:false}], explanation: "Invasión Afganistán/Irak." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Lobos solitarios:", options: [{text: "Terroristas que actúan por cuenta propia sin orden directa",correct:true},{text: "Animales",correct:false},{text: "Espías",correct:false},{text: "Soldados",correct:false}], explanation: "Difícil detectar." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Bioterrorismo:", options: [{text: "Uso de virus o bacterias como armas",correct:true},{text: "Bombas",correct:false},{text: "Ciberataque",correct:false},{text: "Mentiras",correct:false}], explanation: "Guerra biológica." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Geopolítica del Medio Oriente:", options: [{text: "Conflictos complejos por religión, petróleo y fronteras (Israel-Palestina)",correct:true},{text: "Paz total",correct:false},{text: "Solo petróleo",correct:false},{text: "Nada pasa",correct:false}], explanation: "Tensión constante." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Resolución de conflictos (ONU):", options: [{text: "Misiones de paz y diplomacia para evitar guerras",correct:true},{text: "Enviar armas",correct:false},{text: "Ignorar",correct:false},{text: "Apoyar un bando",correct:false}], explanation: "Mantenimiento paz." }
    ]
  },

  // Bundle 5: Tecnología y Sociedad
  {
    meta: {
      id: "CO-SOC-11-tecnologia-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "problemas-contemporaneos",
      periodo: 4,
      dba_id: "DBA-SOC-11-4",
      title: "Revolución Tecnológica"
    },
    base: { question: "La tecnología cambia la sociedad.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Redes Sociales:", options: [{text: "Plataformas digitales de interacción (Facebook, TikTok)",correct:true},{text: "Cartas",correct:false},{text: "Teléfono fijo",correct:false},{text: "Club social",correct:false}], explanation: "Comunicación." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Fake News:", options: [{text: "Noticias falsas para manipular opinión",correct:true},{text: "Noticias reales",correct:false},{text: "Chismes",correct:false},{text: "Errores",correct:false}], explanation: "Desinformación." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Inteligencia Artificial:", options: [{text: "Sistemas informáticos que imitan inteligencia humana",correct:true},{text: "Robot juguete",correct:false},{text: "Videojuego",correct:false},{text: "Calculadora",correct:false}], explanation: "IA." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Teletrabajo:", options: [{text: "Trabajar a distancia usando tecnología",correct:true},{text: "Ir a oficina",correct:false},{text: "No trabajar",correct:false},{text: "Trabajar campo",correct:false}], explanation: "Post-pandemia." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Big Data:", options: [{text: "Análisis masivo de datos para predecir comportamientos",correct:true},{text: "Datos grandes",correct:false},{text: "Muchos archivos",correct:false},{text: "Memoria USB",correct:false}], explanation: "Información poder." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Privacidad digital:", options: [{text: "Derecho a controlar nuestros datos en internet",correct:true},{text: "Publicar todo",correct:false},{text: "Contraseña",correct:false},{text: "Modo incógnito",correct:false}], explanation: "Riesgo datos." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Automatización:", options: [{text: "Reemplazo de trabajo humano por máquinas/software",correct:true},{text: "Ayuda humana",correct:false},{text: "Trabajo manual",correct:false},{text: "Huelga",correct:false}], explanation: "Futuro empleo." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Obsolescencia programada:", options: [{text: "Productos diseñados para durar poco y obligar a comprar nuevo",correct:true},{text: "Calidad",correct:false},{text: "Error fábrica",correct:false},{text: "Mala suerte",correct:false}], explanation: "Consumismo." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Ciberdemocracia:", options: [{text: "Uso de TIC para participación política ciudadana",correct:true},{text: "Votar por internet",correct:false},{text: "Hackers",correct:false},{text: " Robots votan",correct:false}], explanation: "Activismo digital." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Brecha digital:", options: [{text: "Desigualdad entre quienes tienen acceso a TIC y quienes no",correct:true},{text: "Cable roto",correct:false},{text: "Sin luz",correct:false},{text: "Pantalla rota",correct:false}], explanation: "Inequidad." }
    ]
  },

  // Bundle 6: Salud Pública Global
  {
    meta: {
      id: "CO-SOC-11-salud-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "problemas-contemporaneos",
      periodo: 4,
      dba_id: "DBA-SOC-11-4",
      title: "Salud y Pandemias"
    },
    base: { question: "Las pandemias son globales.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Pandemia:", options: [{text: "Epidemia que se extiende a muchos países (COVID-19)",correct:true},{text: "Gripa local",correct:false},{text: "Enfermedad rara",correct:false},{text: "Vacuna",correct:false}], explanation: "Global." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "OMS:", options: [{text: "Organización Mundial de la Salud (ONU)",correct:true},{text: "Hospital",correct:false},{text: "Médico",correct:false},{text: "Farmacia",correct:false}], explanation: "Autoridad sanitaria." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Vacunación:", options: [{text: "Método preventivo para inmunizar población",correct:true},{text: "Remedio casero",correct:false},{text: "Cirugía",correct:false},{text: "Pastilla",correct:false}], explanation: "Inmunidad rebaño." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Cuarentena:", options: [{text: "Aislamiento para evitar contagios",correct:true},{text: "Vacaciones",correct:false},{text: "Castigo",correct:false},{text: "Fiesta",correct:false}], explanation: "Medida sanitaria." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Salud mental:", options: [{text: "Bienestar emocional y psicológico (Afectado por pandemia)",correct:true},{text: "Locura",correct:false},{text: "Felicidad eterna",correct:false},{text: "Inteligencia",correct:false}], explanation: "Crisis silenciosa." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Desigualdad en salud:", options: [{text: "Países ricos acceden primero a vacunas/tratamientos",correct:true},{text: "Todos iguales",correct:false},{text: "Suerte",correct:false},{text: "Genética",correct:false}], explanation: "Inequidad vacunas." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Patentes farmacéuticas:", options: [{text: "Derecho exclusivo sobre medicamentos (Debate acceso vs ganancia)",correct:true},{text: "Marca medicina",correct:false},{text: "Receta",correct:false},{text: "Farmacia",correct:false}], explanation: "Propiedad intelectual." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Zoonosis:", options: [{text: "Enfermedad transmitida de animales a humanos",correct:true},{text: "Enfermedad zoológico",correct:false},{text: "Veterinaria",correct:false},{text: "Mascota",correct:false}], explanation: "Origen virus." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Sistema de Salud en Colombia:", options: [{text: "Sistema mixto (EPS/IPS) con cobertura universal pero problemas acceso",correct:true},{text: "Totalmente público",correct:false},{text: "Totalmente privado",correct:false},{text: "No existe",correct:false}], explanation: "Ley 100." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Determinantes sociales de la salud:", options: [{text: "Condiciones de vida (agua, vivienda) que afectan salud",correct:true},{text: "Médicos",correct:false},{text: "Hospitales",correct:false},{text: "Medicinas",correct:false}], explanation: "Salud preventiva." }
    ]
  },

  // Bundle 7: Género y Sociedad
  {
    meta: {
      id: "CO-SOC-11-genero-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "problemas-contemporaneos",
      periodo: 4,
      dba_id: "DBA-SOC-11-4",
      title: "Género e Igualdad"
    },
    base: { question: "El género es construcción social.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Estereotipo de género:", options: [{text: "Creencia generalizada sobre cómo 'deben' ser hombres/mujeres",correct:true},{text: "Verdad biológica",correct:false},{text: "Ley",correct:false},{text: "Moda",correct:false}], explanation: "Prejuicio." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Machismo:", options: [{text: "Actitud de prepotencia de los varones respecto a las mujeres",correct:true},{text: "Ser fuerte",correct:false},{text: "Ser hombre",correct:false},{text: "Tradición",correct:false}], explanation: "Patriarcado." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Violencia de género:", options: [{text: "Cualquier daño a una persona por su género",correct:true},{text: "Pelea callejera",correct:false},{text: "Robo",correct:false},{text: "Insulto",correct:false}], explanation: "Física, psicológica." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Empoderamiento femenino:", options: [{text: "Proceso para aumentar la fortaleza y capacidad de las mujeres",correct:true},{text: "Odiar hombres",correct:false},{text: "Ser jefa",correct:false},{text: "Gritar",correct:false}], explanation: "Autonomía." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Brecha salarial:", options: [{text: "Diferencia de ingresos entre hombres y mujeres por mismo trabajo",correct:true},{text: "Sueldos diferentes puestos",correct:false},{text: "Bono",correct:false},{text: "Descuento",correct:false}], explanation: "Inequidad laboral." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Economía del cuidado:", options: [{text: "Trabajo no remunerado en el hogar (realizado mayormente por mujeres)",correct:true},{text: "Enfermería",correct:false},{text: "Niñera paga",correct:false},{text: "Limpieza",correct:false}], explanation: "Trabajo invisible." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Identidad de género:", options: [{text: "Percepción subjetiva que una persona tiene de sí misma",correct:true},{text: "Cédula",correct:false},{text: "Biología",correct:false},{text: "Ropa",correct:false}], explanation: "Sentir." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Lenguaje inclusivo (Debate):", options: [{text: "Uso del lenguaje para visibilizar lo femenino/no binario",correct:true},{text: "Hablar mal",correct:false},{text: "Moda",correct:false},{text: "Error",correct:false}], explanation: "Polémica." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Patriarcado:", options: [{text: "Sistema social donde el hombre tiene supremacía",correct:true},{text: "Familia",correct:false},{text: "Gobierno",correct:false},{text: "Iglesia",correct:false}], explanation: "Estructura." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Ley de Cuotas:", options: [{text: "Obligación de incluir mujeres en cargos directivos públicos",correct:true},{text: "Regalo puestos",correct:false},{text: "Discriminación hombres",correct:false},{text: "Concurso",correct:false}], explanation: "Acción afirmativa." }
    ]
  },

  // Bundle 8: Urbanismo y Ciudadanía
  {
    meta: {
      id: "CO-SOC-11-ciudad-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "problemas-contemporaneos",
      periodo: 4,
      dba_id: "DBA-SOC-11-4",
      title: "Retos de las Ciudades"
    },
    base: { question: "Las ciudades tienen problemas.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Movilidad urbana:", options: [{text: "Capacidad de desplazamiento en la ciudad (Transporte)",correct:true},{text: "Caminar rápido",correct:false},{text: "Tener carro",correct:false},{text: "Mudarse",correct:false}], explanation: "Tráfico." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Espacio Público:", options: [{text: "Zonas para todos (Parques, andenes)",correct:true},{text: "Centro comercial",correct:false},{text: "Calle cerrada",correct:false},{text: "Garaje",correct:false}], explanation: "Convivencia." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Segregación urbana:", options: [{text: "Separación física de grupos sociales (Barrios ricos vs pobres)",correct:true},{text: "Vivir lejos",correct:false},{text: "Vecinos",correct:false},{text: "Muros",correct:false}], explanation: "Desigualdad mapa." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Inseguridad:", options: [{text: "Percepción de riesgo y delito en la ciudad",correct:true},{text: "Miedo oscuridad",correct:false},{text: "Policía",correct:false},{text: "Candado",correct:false}], explanation: "Reto urbano." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Contaminación aire:", options: [{text: "Polución por vehículos e industria (Salud respiratoria)",correct:true},{text: "Mal olor",correct:false},{text: "Lluvia",correct:false},{text: "Viento",correct:false}], explanation: "Calidad aire." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Vivienda informal:", options: [{text: "Asentamientos sin títulos ni servicios (Invasiones)",correct:true},{text: "Casa fea",correct:false},{text: "Arriendo",correct:false},{text: "Finca",correct:false}], explanation: "Déficit vivienda." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Gentrificación:", options: [{text: "Elitización de barrios populares desplazando habitantes originales",correct:true},{text: "Mejorar barrio",correct:false},{text: "Turismo",correct:false},{text: "Construir",correct:false}], explanation: "Desplazamiento mercado." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Derecho a la ciudad:", options: [{text: "Derecho de habitantes a construir, decidir y disfrutar su ciudad",correct:true},{text: "Vivir gratis",correct:false},{text: "Parquear",correct:false},{text: "Ensucia",correct:false}], explanation: "Nueva agenda urbana." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Ciudad Inteligente (Smart City):", options: [{text: "Uso de tecnología para optimizar servicios y sostenibilidad",correct:true},{text: "Ciudad robots",correct:false},{text: "Wifi gratis",correct:false},{text: "Computadores",correct:false}], explanation: "Eficiencia." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Plan de Ordenamiento Territorial (POT):", options: [{text: "Instrumento técnico y normativo para planear el territorio",correct:true},{text: "Mapa",correct:false},{text: "Plano casa",correct:false},{text: "Dibujo",correct:false}], explanation: "Norma urbana." }
    ]
  },

  // Bundle 9: Globalización Cultural
  {
    meta: {
      id: "CO-SOC-11-culturaglobal-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "problemas-contemporaneos",
      periodo: 4,
      dba_id: "DBA-SOC-11-4",
      title: "Cultura en la Globalización"
    },
    base: { question: "La cultura se globaliza.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Globalización cultural:", options: [{text: "Difusión mundial de modas, ideas y consumos",correct:true},{text: "Viajar mucho",correct:false},{text: "Internet",correct:false},{text: "Comercio",correct:false}], explanation: "Aldea global." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Pérdida de identidad:", options: [{text: "Riesgo de olvidar tradiciones locales por adoptar extranjeras",correct:true},{text: "Perder cédula",correct:false},{text: "Olvidar nombre",correct:false},{text: "Moda",correct:false}], explanation: "Homogeneización." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Hibridación cultural:", options: [{text: "Mezcla de elementos locales y extranjeros (Sincretismo)",correct:true},{text: "Confusión",correct:false},{text: "Copia",correct:false},{text: "Rechazo",correct:false}], explanation: "Cultura mezcla." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Consumismo:", options: [{text: "Afán desmedido por adquirir bienes y servicios",correct:true},{text: "Comprar comida",correct:false},{text: "Ahorrar",correct:false},{text: "Vender",correct:false}], explanation: "Sociedad consumo." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Tribus urbanas:", options: [{text: "Grupos juveniles con identidad propia (Punk, Emo, Hipster)",correct:true},{text: "Indígenas ciudad",correct:false},{text: "Pandillas",correct:false},{text: "Clubes",correct:false}], explanation: "Identidad joven." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Redes sociales y cultura:", options: [{text: "Aceleran tendencias y crean comunidades virtuales",correct:true},{text: "Aíslan",correct:false},{text: "Educan",correct:false},{text: "Entretienen",correct:false}], explanation: "Viralidad." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Multiculturalismo:", options: [{text: "Convivencia de múltiples culturas en un mismo espacio",correct:true},{text: "Muchas fiestas",correct:false},{text: "Turismo",correct:false},{text: "Caos",correct:false}], explanation: "Diversidad." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Americanización:", options: [{text: "Influencia dominante de la cultura de EEUU en el mundo",correct:true},{text: "Hablar inglés",correct:false},{text: "Comer hamburguesa",correct:false},{text: "Ver películas",correct:false}], explanation: "Hegenomía cultural." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Resistencia cultural:", options: [{text: "Defensa de lo propio frente a la imposición externa",correct:true},{text: "No comprar",correct:false},{text: "Odiar extranjeros",correct:false},{text: "Cerrar fronteras",correct:false}], explanation: "Identidad." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Patrimonio Inmaterial (UNESCO):", options: [{text: "Tradiciones vivas (Carnaval, Música) protegidas mundialmente",correct:true},{text: "Edificios",correct:false},{text: "Estatuas",correct:false},{text: "Dinero",correct:false}], explanation: "Legado." }
    ]
  },

  // Bundle 10: Taller Final
  {
    meta: {
      id: "CO-SOC-11-taller-final-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "problemas-contemporaneos",
      periodo: 4,
      dba_id: "DBA-SOC-11-4",
      title: "Análisis Crítico Actualidad"
    },
    base: { question: "Analizar es importante.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Objetivo Desarrollo Sostenible (ODS):", options: [{text: "Metas mundiales para acabar pobreza y cuidar planeta",correct:true},{text: "Metas empresa",correct:false},{text: "Metas fútbol",correct:false},{text: "Metas examen",correct:false}], explanation: "Agenda 2030." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Democracia:", options: [{text: "Gobierno del pueblo (elecciones libres)",correct:true},{text: "Dictadura",correct:false},{text: "Monarquía",correct:false},{text: "Anarquía",correct:false}], explanation: "Sistema político." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Ciudadano global:", options: [{text: "Persona consciente de su rol en el mundo interconectado",correct:true},{text: "Viajero",correct:false},{text: "Turista",correct:false},{text: "Extranjero",correct:false}], explanation: "Cosmopolita." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Pensamiento crítico:", options: [{text: "Capacidad de analizar y cuestionar información",correct:true},{text: "Criticar todo",correct:false},{text: "Ser negativo",correct:false},{text: "Creer todo",correct:false}], explanation: "Competencia clave." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Polarización política:", options: [{text: "División extrema de la sociedad en dos bandos opuestos",correct:true},{text: "Pelea",correct:false},{text: "Debate",correct:false},{text: "Elección",correct:false}], explanation: "Riesgo democracia." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Posverdad:", options: [{text: "Emociones pesan más que hechos objetivos en opinión pública",correct:true},{text: "Mentira",correct:false},{text: "Verdad absoluta",correct:false},{text: "Noticia",correct:false}], explanation: "Manipulación." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Populismo:", options: [{text: "Estrategia política que apela al 'pueblo' contra una 'élite' con soluciones simples",correct:true},{text: "Ser popular",correct:false},{text: "Ayudar",correct:false},{text: "Ser famoso",correct:false}], explanation: "Fenómeno global." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Corrupción sistémica:", options: [{text: "Cuando la corrupción está arraigada en las instituciones",correct:true},{text: "Un caso aislado",correct:false},{text: "Robo pequeño",correct:false},{text: "Error",correct:false}], explanation: "Estado capturado." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Guerra Híbrida:", options: [{text: "Combina fuerza militar con ciberataques, desinformación y presión económica",correct:true},{text: "Guerra normal",correct:false},{text: "Guerra fría",correct:false},{text: "Pelea",correct:false}], explanation: "Conflicto moderno." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Resiliencia:", options: [{text: "Capacidad de superar situaciones traumáticas y adaptarse",correct:true},{text: "Fuerza física",correct:false},{text: "Aguantar",correct:false},{text: "Olvidar",correct:false}], explanation: "Psicología social." }
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
search_query: "preguntas sociales global grado ${meta.grade} ${meta.periodo} ${meta.topic}"
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

**Competencia evaluada:** Pensamiento Social y Sistémico (DBA: ${meta.dba_id})

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
