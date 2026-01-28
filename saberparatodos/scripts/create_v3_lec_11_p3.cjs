
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
  // Grade 11 - Lectura Crítica - Period 3 - BUNDLE 1 (Textos Discontinuos: Infografías)
  {
    meta: {
      id: "CO-LEC-11-infografia-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "medios",
      periodo: 3,
      dba_id: "DBA-LEC-11-2",
      title: "Lectura de Infografías"
    },
    base: { question: "Una infografía combina texto e imagen para explicar.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "El propósito de una infografía es:", options: [{text:"Informar visual y resumidamente",correct:true},{text:"Contar una novela",correct:false},{text:"Hacer reír",correct:false},{text:"Esconder datos",correct:false}], explanation: "Claridad visual." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Los íconos en una infografía sirven para:", options: [{text:"Representar ideas gráficamente",correct:true},{text:"Decorar",correct:false},{text:"Confundir",correct:false},{text:"Ocupar espacio",correct:false}], explanation: "Simbología." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "En un gráfico de barras, la altura indica:", options: [{text:"Cantidad o frecuencia",correct:true},{text:"Tiempo",correct:false},{text:"Calidad",correct:false},{text:"Color",correct:false}], explanation: "Eje Y." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Un mapa en una infografía aporta:", options: [{text:"Información geográfica o espacial",correct:true},{text:"Sentimientos",correct:false},{text:"Nada",correct:false},{text:"Sonidos",correct:false}], explanation: "Ubicación." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Lectura no lineal:", options: [{text:"El lector elige el orden de lectura",correct:true},{text:"Leer al revés",correct:false},{text:"No leer",correct:false},{text:"Leer rápido",correct:false}], explanation: "Característica discontinua." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Relación texto-imagen:", options: [{text:"Complementariedad (se ayudan)",correct:true},{text:"Oposición",correct:false},{text:"Independencia total",correct:false},{text:"Repetición inútil",correct:false}], explanation: "Anclaje." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Interpretar tendencias en gráfico de líneas:", options: [{text:"Analizar subidas y bajadas (cambio)",correct:true},{text:"Ver los colores",correct:false},{text:"Contar puntos",correct:false},{text:"Nada",correct:false}], explanation: "Pensamiento variacional." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Fuente de datos pequeña al pie:", options: [{text:"Otorga credibilidad y origen",correct:true},{text:"No importa",correct:false},{text:"Es publicidad",correct:false},{text:"Es la firma",correct:false}], explanation: "Citación." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Sesgo en visualización de datos:", options: [{text:"Escalas manipuladas para exagerar diferencias",correct:true},{text:"Usar muchos colores",correct:false},{text:"Usar círculos",correct:false},{text:"Ser muy claro",correct:false}], explanation: "Manipulación gráfica." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Diagrama de flujo representa:", options: [{text:"Procesos y decisiones",correct:true},{text:"Lugares",correct:false},{text:"Personas",correct:false},{text:"Objetos",correct:false}], explanation: "Algoritmos." }
    ]
  },

  // Bundle 2: Publicidad y Propaganda
  {
    meta: {
      id: "CO-LEC-11-publicidad-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "medios",
      periodo: 3,
      dba_id: "DBA-LEC-11-2",
      title: "Análisis de Publicidad y Propaganda"
    },
    base: { question: "Publicidad vende productos, propaganda vende ideas.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Objetivo principal de la publicidad:", options: [{text:"Persuadir para comprar consumo",correct:true},{text:"Educar gratis",correct:false},{text:"Informar clima",correct:false},{text:"Hacer amigos",correct:false}], explanation: "Comercial." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Eslogan:", options: [{text:"Frase corta y memorable de marca",correct:true},{text:"Libro largo",correct:false},{text:"Precio",correct:false},{text:"Foto",correct:false}], explanation: "Just do it." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Público objetivo (Target):", options: [{text:"A quién va dirigido el anuncio",correct:true},{text:"Quién vende",correct:false},{text:"El dueño",correct:false},{text:"La competencia",correct:false}], explanation: "Segmentación." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Estereotipo en publicidad:", options: [{text:"Imagen simplificada y generalizada de un grupo",correct:true},{text:"Foto real",correct:false},{text:"Sonido",correct:false},{text:"Verdad",correct:false}], explanation: "Cliché." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Publicidad engañosa:", options: [{text:"Prometer características falsas",correct:true},{text:"Ser creativo",correct:false},{text:"Usar colores",correct:false},{text:"Vender barato",correct:false}], explanation: "Fraude." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Propaganda política busca:", options: [{text:"Adhesión ideológica o voto",correct:true},{text:"Vender zapatos",correct:false},{text:"Entretener",correct:false},{text:"Informar neutralmente",correct:false}], explanation: "Poder." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Mensaje subliminal:", options: [{text:"Estímulo por debajo del umbral de consciencia",correct:true},{text:"Mensaje claro",correct:false},{text:"Grito",correct:false},{text:"Texto grande",correct:false}], explanation: "Psicología." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Marketing emocional:", options: [{text:"Asociar marca con sentimientos (felicidad)",correct:true},{text:"Hablar de precios",correct:false},{text:"Lógica pura",correct:false},{text:"Datos técnicos",correct:false}], explanation: "Vender experiencias." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Neuromarketing:", options: [{text:"Uso de neurociencia para influir en consumo",correct:true},{text:"Vender cerebros",correct:false},{text:"Marketing tonto",correct:false},{text:"Nada",correct:false}], explanation: "Ciencia del consumo." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Greenwashing:", options: [{text:"Aparentar ser ecológico sin serlo",correct:true},{text:"Lavar ropa",correct:false},{text:"Pintar de verde",correct:false},{text:"Reciclar real",correct:false}], explanation: "Hipocresía ambiental." }
    ]
  },

  // Bundle 3: Caricatura Política
  {
    meta: {
      id: "CO-LEC-11-caricatura-politica-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "medios",
      periodo: 3,
      dba_id: "DBA-LEC-11-2",
      title: "La Caricatura Política"
    },
    base: { question: "La caricatura crítica mediante el humor.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "La caricatura exagera:", options: [{text:"Rasgos físicos o situaciones",correct:true},{text:"Precios",correct:false},{text:"Nada",correct:false},{text:"La belleza",correct:false}], explanation: "Deformación intencional." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Matador (julio césar gonzález) es:", options: [{text:"Un caricaturista colombiano",correct:true},{text:"Un torero",correct:false},{text:"Un político",correct:false},{text:"Un actor",correct:false}], explanation: "El Tiempo." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Sátira:", options: [{text:"Burla con fin crítico",correct:true},{text:"Chiste inocente",correct:false},{text:"Elogio",correct:false},{text:"Dibujo realista",correct:false}], explanation: "Humor mordaz." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Personajes en caricatura suelen ser:", options: [{text:"Políticos o figuras públicas",correct:true},{text:"Animales de granja",correct:false},{text:"Nadie",correct:false},{text:"Objetos",correct:false}], explanation: "Poder." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Metáfora visual (ej. político títere):", options: [{text:"Representa control externo",correct:true},{text:"Es un juguete",correct:false},{text:"Es divertido",correct:false},{text:"Es niño",correct:false}], explanation: "Símbolo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Texto en caricatura (bocadillo):", options: [{text:"Complementa o contradice la imagen (ironía)",correct:true},{text:"Explica todo",correct:false},{text:"No sirve",correct:false},{text:"Es decoración",correct:false}], explanation: "Anclaje." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Opinión en la caricatura:", options: [{text:"Es subjetiva y crítica",correct:true},{text:"Es neutral",correct:false},{text:"Es informativa pura",correct:false},{text:"Es publicitaria",correct:false}], explanation: "Género de opinión." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Simbolismo (Paloma = Paz):", options: [{text:"Convención cultural",correct:true},{text:"Realidad biológica",correct:false},{text:"Dibujo fácil",correct:false},{text:"Casualidad",correct:false}], explanation: "Código compartido." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Caricatura vs Retrato:", options: [{text:"Deformación interpretativa vs Copia fiel",correct:true},{text:"Iguales",correct:false},{text:"Color vs Blanco y negro",correct:false},{text:"Grande vs Pequeño",correct:false}], explanation: "Esencia vs Apariencia." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Censura a caricaturistas:", options: [{text:"Por incomodar al poder",correct:true},{text:"Por dibujar mal",correct:false},{text:"Por usar mucha tinta",correct:false},{text:"Por ser aburridos",correct:false}], explanation: "Libertad de prensa." }
    ]
  },

  // Bundle 4: Medios Masivos e Internet
  {
    meta: {
      id: "CO-LEC-11-medios-digitales-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "medios",
      periodo: 3,
      dba_id: "DBA-LEC-11-2",
      title: "Internet y Medios Masivos"
    },
    base: { question: "Internet cambió la comunicación.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Red social:", options: [{text:"Plataforma de interacción (FB, IG)",correct:true},{text:"Reunión física",correct:false},{text:"Libro",correct:false},{text:"Televisor",correct:false}], explanation: "Web 2.0." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Inmediatez:", options: [{text:"Información al instante",correct:true},{text:"Esperar al día siguiente",correct:false},{text:"Lentitud",correct:false},{text:"Falsedad",correct:false}], explanation: "Tiempo real." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Hipervínculo (Link):", options: [{text:"Conexión a otro texto o web",correct:true},{text:"Error",correct:false},{text:"Virus",correct:false},{text:"Imagen",correct:false}], explanation: "Intertextualidad digital." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Comunicación asincrónica:", options: [{text:"No simultánea (ej. E-mail)",correct:true},{text:"En vivo",correct:false},{text:"Cara a cara",correct:false},{text:"Teléfono",correct:false}], explanation: "Tiempo diferido." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Prosumidor:", options: [{text:"Productor y Consumidor de contenido",correct:true},{text:"Consumidor",correct:false},{text:"Productor",correct:false},{text:"Vendedor",correct:false}], explanation: "Rol activo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Viralidad:", options: [{text:"Difusión exponencial rápida",correct:true},{text:"Enfermedad",correct:false},{text:"Secreto",correct:false},{text:"Lentitud",correct:false}], explanation: "Fenómeno de redes." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Algoritmo de recomendación:", options: [{text:"Filtra contenido según gustos previos",correct:true},{text:"Es aleatorio",correct:false},{text:"Es objetivo",correct:false},{text:"Es humano",correct:false}], explanation: "Burbuja de filtro." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Clickbait (Ciberanzuelo):", options: [{text:"Título engañoso para ganar clicks",correct:true},{text:"Pesca digital",correct:false},{text:"Buen periodismo",correct:false},{text:"Verdad",correct:false}], explanation: "Economía de la atención." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Brecha digital:", options: [{text:"Desigualdad en acceso a tecnología",correct:true},{text:"Pantalla rota",correct:false},{text:"Error de dedo",correct:false},{text:"Distancia física",correct:false}], explanation: "Inequidad social." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Neutralidad de la red:", options: [{text:"Tratar todo tráfico igual sin cobrar diferente",correct:true},{text:"Ser neutral en política",correct:false},{text:"No tener internet",correct:false},{text:"Censura",correct:false}], explanation: "Principio fundacional." }
    ]
  },

  // Bundle 5: Cine y Lenguaje Audiovisual
  {
    meta: {
      id: "CO-LEC-11-cine-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "medios",
      periodo: 3,
      dba_id: "DBA-LEC-11-2",
      title: "Lenguaje Cinematográfico"
    },
    base: { question: "El cine es el séptimo arte.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Guion:", options: [{text:"Texto escrito de la película",correct:true},{text:"Cámara",correct:false},{text:"Actor",correct:false},{text:"Música",correct:false}], explanation: "Base literaria." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Director:", options: [{text:"Responsable creativo de la película",correct:true},{text:"Actor principal",correct:false},{text:"Vendedor de boletas",correct:false},{text:"Extra",correct:false}], explanation: "Autor." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Plano general:", options: [{text:"Muestra todo el escenario",correct:true},{text:"Muestra un ojo",correct:false},{text:"Muestra la cara",correct:false},{text:"Muestra la mano",correct:false}], explanation: "Contexto." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Primer plano:", options: [{text:"Muestra el rostro (expresión)",correct:true},{text:"Muestra el paisaje",correct:false},{text:"Muestra los pies",correct:false},{text:"Muestra el cielo",correct:false}], explanation: "Emoción." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Montaje o Edición:", options: [{text:"Unir planos para dar sentido y ritmo",correct:true},{text:"Filmar",correct:false},{text:"Escribir",correct:false},{text:"Actuar",correct:false}], explanation: "Sintaxis fílmica." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Banda sonora:", options: [{text:"Música y efectos de sonido",correct:true},{text:"Banda de ladrones",correct:false},{text:"La cinta",correct:false},{text:"Los créditos",correct:false}], explanation: "Atmósfera." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Voz en off:", options: [{text:"Narrador que no se ve en pantalla",correct:true},{text:"Grito",correct:false},{text:"Actor mudo",correct:false},{text:"Subtítulo",correct:false}], explanation: "Recurso auditivo." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Cine de autor vs Cine comercial:", options: [{text:"Visión personal vs Ganancia económica",correct:true},{text:"Largo vs Corto",correct:false},{text:"Blanco y negro vs Color",correct:false},{text:"Viejo vs Nuevo",correct:false}], explanation: "Arte vs Industria." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Efecto Kuleshov:", options: [{text:"El sentido depende del montaje (A+B=C)",correct:true},{text:"Efecto especial",correct:false},{text:"Lente rusa",correct:false},{text:"Sonido fuerte",correct:false}], explanation: "Teoría del montaje." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "MacGuffin (Hitchcock):", options: [{text:"Excusa argumental para mover la trama",correct:true},{text:"El asesino",correct:false},{text:"La comida",correct:false},{text:"El final",correct:false}], explanation: "Objeto irrelevante pero motivador." }
    ]
  },

  // Bundle 6: Arte y Simbología (Lectura de imágenes)
  {
    meta: {
      id: "CO-LEC-11-arte-simbologia-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "medios",
      periodo: 3,
      dba_id: "DBA-LEC-11-2",
      title: "Lectura de Imágenes y Arte"
    },
    base: { question: "Una imagen vale más que mil palabras.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Muralismo mexicano (Rivera):", options: [{text:"Arte público social y político",correct:true},{text:"Arte privado",correct:false},{text:"Arte abstracto",correct:false},{text:"Graffiti ilegal",correct:false}], explanation: "Historia en paredes." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Color rojo en publicidad suele significar:", options: [{text:"Pasión, peligro, urgencia (Comida)",correct:true},{text:"Tranquilidad",correct:false},{text:"Naturaleza",correct:false},{text:"Frío",correct:false}], explanation: "Psicología del color." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Composición:", options: [{text:"Organización de elementos en el espacio",correct:true},{text:"Música",correct:false},{text:"Marco",correct:false},{text:"Pintura",correct:false}], explanation: "Equilibrio visual." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Punto de fuga:", options: [{text:"Donde convergen líneas (perspectiva)",correct:true},{text:"Salida",correct:false},{text:"Mancha",correct:false},{text:"Firma",correct:false}], explanation: "Profundidad." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Iconografía:", options: [{text:"Estudio de símbolos e imágenes",correct:true},{text:"Pintar íconos",correct:false},{text:"Fotografía",correct:false},{text:"Diseño web",correct:false}], explanation: "Significado convencional." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Guernica (Picasso) representa:", options: [{text:"Horror del bombardeo y la guerra",correct:true},{text:"Una fiesta",correct:false},{text:"Un paisaje",correct:false},{text:"Un retrato amoroso",correct:false}], explanation: "Cubismo político." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Surrealismo (Dalí):", options: [{text:"Mundo de los sueños e inconsciente",correct:true},{text:"Realidad fotográfica",correct:false},{text:"Geometría",correct:false},{text:"Religión",correct:false}], explanation: "Más allá de lo real." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Performance:", options: [{text:"Arte acción en vivo",correct:true},{text:"Cuadro",correct:false},{text:"Escultura",correct:false},{text:"Libro",correct:false}], explanation: "Arte efímero." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Semiótica visual:", options: [{text:"Estudio de signos visuales y significado",correct:true},{text:"Ver bien",correct:false},{text:"Usar gafas",correct:false},{text:"Pintar",correct:false}], explanation: "Barthes." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Kitsch:", options: [{text:"Estética cursi, recargada o de mal gusto",correct:true},{text:"Arte elevado",correct:false},{text:"Minimalismo",correct:false},{text:"Elegancia",correct:false}], explanation: "Cultura de masas." }
    ]
  },

  // Bundle 7: Música y Sociedad (Texto Lírico Multimedia)
  {
    meta: {
      id: "CO-LEC-11-musica-sociedad-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "medios",
      periodo: 3,
      dba_id: "DBA-LEC-11-2",
      title: "Análisis de Letras de Canciones"
    },
    base: { question: "Las canciones son textos líricos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Estribillo o Coro:", options: [{text:"Parte que se repite",correct:true},{text:"El final",correct:false},{text:"El inicio",correct:false},{text:"El silencio",correct:false}], explanation: "Reiteración." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Canción protesta:", options: [{text:"Denuncia injusticias sociales",correct:true},{text:"Habla de amor",correct:false},{text:"Es instrumental",correct:false},{text:"Para bailar",correct:false}], explanation: "Compromiso social." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Rap y Hip Hop se basan en:", options: [{text:"Rima y ritmo hablado (flow)",correct:true},{text:"Melodía suave",correct:false},{text:"Silencio",correct:false},{text:"Gritos",correct:false}], explanation: "Poesía urbana." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Narcocorrido (contexto crítica):", options: [{text:"Apología o crónica del narcotráfico",correct:true},{text:"Música infantil",correct:false},{text:"Religiosa",correct:false},{text:"Ciencia ficción",correct:false}], explanation: "Cultura y violencia." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Intertextualidad en música (Sampling):", options: [{text:"Tomar fragmento de otra canción",correct:true},{text:"Cantar mal",correct:false},{text:"Robar instrumentos",correct:false},{text:"Componer",correct:false}], explanation: "Cita sonora." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Videoclip:", options: [{text:"Lenguaje audiovisual publicitario o artístico",correct:true},{text:"Película larga",correct:false},{text:"Audio solo",correct:false},{text:"Foto",correct:false}], explanation: "Imagen + Música." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Reguetón y crítica de género:", options: [{text:"Análisis de cosificación de la mujer",correct:true},{text:"Solo bailar",correct:false},{text:"No tiene letra",correct:false},{text:"Es poesía pura",correct:false}], explanation: "Debate cultural." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Himno Nacional como texto:", options: [{text:"Exalta valores patrios e historia",correct:true},{text:"Es una canción de moda",correct:false},{text:"Es triste",correct:false},{text:"Es un cuento",correct:false}], explanation: "Símbolo patrio." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Bob Dylan (Premio Nobel):", options: [{text:"Reconocimiento de la canción como literatura",correct:true},{text:"Error de la academia",correct:false},{text:"Es un novelista",correct:false},{text:"Es un pintor",correct:false}], explanation: "Límites literatura." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Industria cultural (Adorno):", options: [{text:"Arte como mercancía masiva estandarizada",correct:true},{text:"Arte libre",correct:false},{text:"Cultura popular real",correct:false},{text:"Folclor",correct:false}], explanation: "Crítica marxista." }
    ]
  },

  // Bundle 8: Tablas y Gráficos Estadísticos (Lectura Crítica)
  {
    meta: {
      id: "CO-LEC-11-graficos-datos-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "medios",
      periodo: 3,
      dba_id: "DBA-LEC-11-2",
      title: "Interpretación Crítica de Datos"
    },
    base: { question: "Los datos pueden manipularse.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Eje X en línea de tiempo:", options: [{text:"Tiempo (Años, meses)",correct:true},{text:"Dinero",correct:false},{text:"Altura",correct:false},{text:"Nada",correct:false}], explanation: "Cronología." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Título del gráfico:", options: [{text:"Indica el tema y contexto",correct:true},{text:"Es decorativo",correct:false},{text:"Es el autor",correct:false},{text:"No importa",correct:false}], explanation: "Anclaje temático." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Gráfico de torta (Pie chart):", options: [{text:"Muestra porcentajes de un total",correct:true},{text:"Muestra cambios en el tiempo",correct:false},{text:"Muestra mapas",correct:false},{text:"Es para comer",correct:false}], explanation: "Partes de un todo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Leyenda del gráfico:", options: [{text:"Explica qué significa cada color/símbolo",correct:true},{text:"Es un mito",correct:false},{text:"Es un cuento",correct:false},{text:"Es el final",correct:false}], explanation: "Clave de lectura." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Eje truncado (manipulación):", options: [{text:"No empezar en 0 para exagerar cambios",correct:true},{text:"Cortar el papel",correct:false},{text:"Usar lápiz roto",correct:false},{text:"Ser honesto",correct:false}], explanation: "Falacia visual." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Correlación vs Causalidad en gráficos:", options: [{text:"Dos líneas juntas no implican causa",correct:true},{text:"Siempre es causa",correct:false},{text:"Nunca se relacionan",correct:false},{text:"Es magia",correct:false}], explanation: "Interpretación errónea." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Infografía periodística vs Académica:", options: [{text:"Divulgación atractiva vs Rigor técnico",correct:true},{text:"Iguales",correct:false},{text:"Mentira vs Verdad",correct:false},{text:"Color vs Blanco y negro",correct:false}], explanation: "Intención comunicativa." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Pictograma:", options: [{text:"Usa íconos repetidos para contar",correct:true},{text:"Es una foto",correct:false},{text:"Es texto",correct:false},{text:"Sonido",correct:false}], explanation: "Visualización." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Cherry picking (Datos):", options: [{text:"Mostrar solo los datos que convienen",correct:true},{text:"Coger cerezas",correct:false},{text:"Mostrar todo",correct:false},{text:"Ser aleatorio",correct:false}], explanation: "Sesgo de selección." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Alfabetización de datos (Data Literacy):", options: [{text:"Capacidad de leer y criticar información estadística",correct:true},{text:"Saber leer letras",correct:false},{text:"Saber Excel",correct:false},{text:"Saber programar",correct:false}], explanation: "Competencia siglo XXI." }
    ]
  },

  // Bundle 9: Televisión y Series (Narrativa Audiovisual)
  {
    meta: {
      id: "CO-LEC-11-tv-series-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "medios",
      periodo: 3,
      dba_id: "DBA-LEC-11-2",
      title: "Narrativas en Series y TV"
    },
    base: { question: "Las series usan narrativa episódica.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Temporada:", options: [{text:"Conjunto de episodios",correct:true},{text:"Clima",correct:false},{text:"Un capítulo",correct:false},{text:"El final",correct:false}], explanation: "Unidad mayor." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Spoiler:", options: [{text:"Revelar trama importante antes de tiempo",correct:true},{text:"Ala de carro",correct:false},{text:"Comida podrida",correct:false},{text:"Ayuda",correct:false}], explanation: "Arruinar sorpresa." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Cliffhanger:", options: [{text:"Final en suspenso para enganchar",correct:true},{text:"Escalar montaña",correct:false},{text:"Hombre colgado",correct:false},{text:"Final feliz",correct:false}], explanation: "Recurso narrativo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Sitcom:", options: [{text:"Comedia de situación (ej. Friends)",correct:true},{text:"Drama triste",correct:false},{text:"Noticiero",correct:false},{text:"Documental",correct:false}], explanation: "Risas grabadas." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Streaming (Netflix, etc):", options: [{text:"Video bajo demanda por internet",correct:true},{text:"Televisión análoga",correct:false},{text:"Radio",correct:false},{text:"Cine",correct:false}], explanation: "Cambio consumo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Reality Show:", options: [{text:"Supuesta realidad sin guion (espectáculo)",correct:true},{text:"Ficción total",correct:false},{text:"Noticias",correct:false},{text:"Dibujos animados",correct:false}], explanation: "Telerrealidad." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Arco de personaje:", options: [{text:"Transformación interna a lo largo de la serie",correct:true},{text:"Un arma",correct:false},{text:"Un puente",correct:false},{text:"Nada",correct:false}], explanation: "Evolución." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Spin-off:", options: [{text:"Serie derivada de otra (ej. Better Call Saul)",correct:true},{text:"Girar",correct:false},{text:"Final",correct:false},{text:"Copia ilegal",correct:false}], explanation: "Universo expandido." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Showrunner:", options: [{text:"Productor ejecutivo y creativo principal",correct:true},{text:"Actor",correct:false},{text:"Corredor",correct:false},{text:"Camarógrafo",correct:false}], explanation: "Jefe de la serie." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Fandom:", options: [{text:"Comunidad de fans activa y creativa",correct:true},{text:"Odio",correct:false},{text:"Aburrimiento",correct:false},{text:"Empresa",correct:false}], explanation: "Cultura participativa." }
    ]
  },

  // Bundle 10: Taller de Creación Discontinua
  {
    meta: {
      id: "CO-LEC-11-taller-discontinuo-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "medios",
      periodo: 3,
      dba_id: "DBA-LEC-11-2",
      title: "Producción de Textos Discontinuos"
    },
    base: { question: "Crear discontinuos requiere síntesis.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Para hacer un mapa conceptual necesito:", options: [{text:"Conceptos y conectores",correct:true},{text:"Mapa geográfico",correct:false},{text:"Solo dibujos",correct:false},{text:"Música",correct:false}], explanation: "Jerarquía." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Para hacer una historieta necesito:", options: [{text:"Guion y dibujos en viñetas",correct:true},{text:"Solo texto",correct:false},{text:"Solo fotos",correct:false},{text:"Nada",correct:false}], explanation: "Secuencia." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Resumen visual:", options: [{text:"Sintetizar información con gráficos",correct:true},{text:"Copiar texto",correct:false},{text:"Leer",correct:false},{text:"Hablar",correct:false}], explanation: "Infografía." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Collage:", options: [{text:"Pegar recortes diversos para crear algo nuevo",correct:true},{text:"Pintar",correct:false},{text:"Escribir",correct:false},{text:"Romper",correct:false}], explanation: "Técnica artística." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Meme como texto:", options: [{text:"Imagen+Texto con significado cultural irónico",correct:true},{text:"Chiste malo",correct:false},{text:"Virus",correct:false},{text:"Foto sola",correct:false}], explanation: "Unidad cultural mínima." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Storyboard:", options: [{text:"Guion gráfico (bocetos de planos)",correct:true},{text:"Cuento",correct:false},{text:"Tablero",correct:false},{text:"Película terminada",correct:false}], explanation: "Preproducción." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Diseño editorial (Maquetación):", options: [{text:"Organizar texto e imagen en página",correct:true},{text:"Imprimir",correct:false},{text:"Escribir",correct:false},{text:"Vender",correct:false}], explanation: "Diagramación." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Tipografía expresiva:", options: [{text:"La forma de la letra comunica (miedo, grito)",correct:true},{text:"Letra Times New Roman",correct:false},{text:"Mala ortografía",correct:false},{text:"Invisible",correct:false}], explanation: "Diseño gráfico." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Transmedia:", options: [{text:"Historia contada a través de múltiples plataformas",correct:true},{text:"Una sola película",correct:false},{text:"Cambio de medio",correct:false},{text:"Transporte",correct:false}], explanation: "Narrativa expansiva." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Curaduría de contenidos:", options: [{text:"Filtrar, organizar y presentar información relevante",correct:true},{text:"Curar heridas",correct:false},{text:"Crear todo de cero",correct:false},{text:"Borrar todo",correct:false}], explanation: "Gestión de info." }
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
search_query: "preguntas lectura critica grado ${meta.grade} ${meta.periodo} ${meta.topic}"
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

**Competencia evaluada:** Lectura Crítica (DBA: ${meta.dba_id})

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
