
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: Cold War Basics
  {
    meta: {
      id: "CO-CS-10-hist-coldwar-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "guerra-fria",
      periodo: 1,
      dba_id: "DBA-CS-10-1",
      title: "La Guerra Fría"
    },
    base: { question: "Contexto Guerra Fría.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "¿Qué fue la Guerra Fría?", options: [{text: "Enfrentamiento ideológico entre EE.UU. y la URSS sin guerra directa",correct:true},{text: "Guerra mundial con armas nucleares",correct:false},{text: "Invasión a Colombia",correct:false},{text: "Guerra en el Polo Norte",correct:false}], explanation: "Tensión geopolítica." },
      { id_suffix: "v2", difficulty: 1, question: "Dos bloques enfrentados:", options: [{text: "Capitalista (EE.UU.) y Comunista (URSS)",correct:true},{text: "Alemania y Francia",correct:false},{text: "China y Japón",correct:false},{text: "Norte y Sur",correct:false}], explanation: "Bipolaridad." },
      { id_suffix: "v3", difficulty: 2, question: "El Muro de Berlín simbolizaba:", options: [{text: "La división del mundo en dos bloques",correct:true},{text: "La paz mundial",correct:false},{text: "La unión europea",correct:false},{text: "El fin de la guerra",correct:false}], explanation: "Telón de Acero." },
      { id_suffix: "v4", difficulty: 2, question: "Plan Marshall:", options: [{text: "Ayuda económica de EE.UU. para reconstruir Europa Occidental",correct:true},{text: "Plan de la URSS",correct:false},{text: "Plan militar",correct:false},{text: "Plan de colonización",correct:false}], explanation: "Contención comunismo." },
      { id_suffix: "v5", difficulty: 3, question: "Crisis de los Misiles (1962):", options: [{text: "Conflicto por misiles soviéticos en Cuba",correct:true},{text: "Guerra de Corea",correct:false},{text: "Guerra de Vietnam",correct:false},{text: "Invasión a Panamá",correct:false}], explanation: "Punto más tenso." },
      { id_suffix: "v6", difficulty: 3, question: "¿Qué es la OTAN?", options: [{text: "Alianza militar occidental liderada por EE.UU.",correct:true},{text: "Alianza comunista",correct:false},{text: "Organización de comercio",correct:false},{text: "ONG",correct:false}], explanation: "Defensa mutua." },
      { id_suffix: "v7", difficulty: 4, question: "Pacto de Varsovia:", options: [{text: "Respuesta militar soviética a la OTAN",correct:true},{text: "Tratado de paz",correct:false},{text: "Acuerdo económico",correct:false},{text: "Alianza con China",correct:false}], explanation: "Bloque Este." },
      { id_suffix: "v8", difficulty: 4, question: "Carrera Espacial:", options: [{text: "Competencia tecnológica por el dominio del espacio",correct:true},{text: "Carrera de autos",correct:false},{text: "Guerra de las Galaxias",correct:false},{text: "Colonización de Marte",correct:false}], explanation: "Sputnik vs Apollo." },
      { id_suffix: "v9", difficulty: 5, question: "Perestroika y Glasnost:", options: [{text: "Reformas de Gorbachov que llevaron al fin de la URSS",correct:true},{text: "Planes de Stalin",correct:false},{text: "Comidas típicas",correct:false},{text: "Armas nucleares",correct:false}], explanation: "Apertura y Reestructuración." },
      { id_suffix: "v10", difficulty: 5, question: "Fin de la Guerra Fría:", options: [{text: "Caída del Muro de Berlín (1989) y disolución de la URSS (1991)",correct:true},{text: "1945",correct:false},{text: "2001",correct:false},{text: "No ha terminado",correct:false}], explanation: "Nuevo orden mundial." }
    ]
  },

  // Bundle 2: Economic Sectors
  {
    meta: {
      id: "CO-CS-10-econ-sectors-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "sectores-economicos",
      periodo: 1,
      dba_id: "DBA-CS-10-1",
      title: "Sectores Económicos"
    },
    base: { question: "Clasifica sectores.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Sector Primario:", options: [{text: "Extracción de recursos naturales (Agricultura, Minería)",correct:true},{text: "Industria",correct:false},{text: "Servicios",correct:false},{text: "Tecnología",correct:false}], explanation: "Materias primas." },
      { id_suffix: "v2", difficulty: 1, question: "Sector Secundario:", options: [{text: "Transformación de materia prima (Industria, Construcción)",correct:true},{text: "Comercio",correct:false},{text: "Pesca",correct:false},{text: "Transporte",correct:false}], explanation: "Manufactura." },
      { id_suffix: "v3", difficulty: 2, question: "Sector Terciario:", options: [{text: "Prestación de servicios (Comercio, Turismo, Salud)",correct:true},{text: "Minería",correct:false},{text: "Fabricas",correct:false},{text: "Ganadería",correct:false}], explanation: "Intangibles." },
      { id_suffix: "v4", difficulty: 2, question: "La economía colombiana depende principalmente de:", options: [{text: "Sector primario (Petróleo, Carbón, Café) y Servicios",correct:true},{text: "Alta tecnología",correct:false},{text: "Industria automotriz",correct:false},{text: "Pesca",correct:false}], explanation: "Extractivismo." },
      { id_suffix: "v5", difficulty: 3, question: "Sector Cuaternario:", options: [{text: "Conocimiento, I+D, Tecnología de información",correct:true},{text: "Restaurantes",correct:false},{text: "Agricultura",correct:false},{text: "Artesanías",correct:false}], explanation: "Innovación." },
      { id_suffix: "v6", difficulty: 3, question: "PIB (Producto Interno Bruto):", options: [{text: "Valor total de bienes y servicios producidos en un año",correct:true},{text: "Dinero del gobierno",correct:false},{text: "Sueldo promedio",correct:false},{text: "Exportaciones",correct:false}], explanation: "Indicador macro." },
      { id_suffix: "v7", difficulty: 4, question: "Desindustrialización:", options: [{text: "Reducción del peso de la industria en el PIB",correct:true},{text: "Cierre de minas",correct:false},{text: "Aumento de fábricas",correct:false},{text: "Falta de luz",correct:false}], explanation: "Fenómeno moderno." },
      { id_suffix: "v8", difficulty: 4, question: "Economía Naranja (Colombia):", options: [{text: "Industrias creativas y culturales",correct:true},{text: "Agricultura de cítricos",correct:false},{text: "Minería de cobre",correct:false},{text: "Transporte",correct:false}], explanation: "Propiedad intelectual." },
      { id_suffix: "v9", difficulty: 5, question: "Commodities:", options: [{text: "Materias primas con precio internacional (Petróleo, Oro)",correct:true},{text: "Computadores",correct:false},{text: "Autos de lujo",correct:false},{text: "Ropa",correct:false}], explanation: "Bienes básicos." },
      { id_suffix: "v10", difficulty: 5, question: "Enfermedad Holandesa:", options: [{text: "Auge de exportación (ej: petróleo) daña otros sectores por revaluación moneda",correct:true},{text: "Una gripa",correct:false},{text: "Crisis bancaria",correct:false},{text: "Falta de queso",correct:false}], explanation: "Efecto macroeconómico." }
    ]
  },

  // Bundle 3: Neoliberalism & Globalization
  {
    meta: {
      id: "CO-CS-10-econ-neolib-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "neoliberalismo",
      periodo: 1,
      dba_id: "DBA-CS-10-1",
      title: "Neoliberalismo y Apertura"
    },
    base: { question: "Analiza modelo económico.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Neoliberalismo propone:", options: [{text: "Libre mercado, privatización y reducción del Estado",correct:true},{text: "Control total del Estado",correct:false},{text: "Comunismo",correct:false},{text: "Monarquía",correct:false}], explanation: "Apertura económica." },
      { id_suffix: "v2", difficulty: 1, question: "Apertura Económica en Colombia (1990):", options: [{text: "Reducción de aranceles y entrada de productos extranjeros",correct:true},{text: "Cierre de fronteras",correct:false},{text: "Prohibición de importar",correct:false},{text: "Nacionalización de empresas",correct:false}], explanation: "Gaviria." },
      { id_suffix: "v3", difficulty: 2, question: "Globalización:", options: [{text: "Interconexión mundial económica, cultural y política",correct:true},{text: "Aislamiento de países",correct:false},{text: "Guerra mundial",correct:false},{text: "Un solo idioma",correct:false}], explanation: "Aldea global." },
      { id_suffix: "v4", difficulty: 2, question: "FMI (Fondo Monetario Internacional):", options: [{text: "Organismo financiero que presta dinero a países en crisis",correct:true},{text: "Banco de Colombia",correct:false},{text: "ONG de ayuda",correct:false},{text: "Empresa privada",correct:false}], explanation: "Deuda externa." },
      { id_suffix: "v5", difficulty: 3, question: "Tratado de Libre Comercio (TLC):", options: [{text: "Acuerdo para eliminar impuestos al comercio entre países",correct:true},{text: "Tratado de paz",correct:false},{text: "Ley de fronteras",correct:false},{text: "Impuesto nuevo",correct:false}], explanation: "Intercambio." },
      { id_suffix: "v6", difficulty: 3, question: "Crítica al neoliberalismo:", options: [{text: "Aumenta la desigualdad social y debilita lo público",correct:true},{text: "Genera mucha riqueza para todos",correct:false},{text: "Es muy lento",correct:false},{text: "Es comunista",correct:false}], explanation: "Brecha social." },
      { id_suffix: "v7", difficulty: 4, question: "Consenso de Washington:", options: [{text: "Paquete de medidas neoliberales recomendadas a Latam en los 90",correct:true},{text: "Acuerdo de paz",correct:false},{text: "Reunión de presidentes",correct:false},{text: "Ley de EE.UU.",correct:false}], explanation: "Ajuste estructural." },
      { id_suffix: "v8", difficulty: 4, question: "Privatización:", options: [{text: "Venta de empresas estatales a privados",correct:true},{text: "Compra de empresas por el Estado",correct:false},{text: "Cierre de empresas",correct:false},{text: "Regalar empresas",correct:false}], explanation: "Menos Estado." },
      { id_suffix: "v9", difficulty: 5, question: "Deslocalización industrial (Offshoring):", options: [{text: "Trasladar fábricas a países con mano de obra barata",correct:true},{text: "Cerrar fábricas",correct:false},{text: "Vender fábricas",correct:false},{text: "Automatizar",correct:false}], explanation: "Efecto globalización." },
      { id_suffix: "v10", difficulty: 5, question: "Estado de Bienestar vs Neoliberalismo:", options: [{text: "Bienestar garantiza derechos sociales; Neoliberalismo prioriza mercado",correct:true},{text: "Son lo mismo",correct:false},{text: "Neoliberalismo da más subsidios",correct:false},{text: "Bienestar es dictadura",correct:false}], explanation: "Modelos opuestos." }
    ]
  },

  // Bundle 4: Political Systems
  {
    meta: {
      id: "CO-CS-10-pol-systems-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "sistemas-politicos",
      periodo: 1,
      dba_id: "DBA-CS-10-1",
      title: "Sistemas Políticos"
    },
    base: { question: "Identifica sistema político.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Democracia:", options: [{text: "Gobierno del pueblo (elecciones libres)",correct:true},{text: "Gobierno de uno solo",correct:false},{text: "Gobierno militar",correct:false},{text: "Gobierno religioso",correct:false}], explanation: "Soberanía popular." },
      { id_suffix: "v2", difficulty: 1, question: "Dictadura:", options: [{text: "Poder concentrado en una persona/grupo sin control democrático",correct:true},{text: "Elecciones libres",correct:false},{text: "Poder del pueblo",correct:false},{text: "Monarquía",correct:false}], explanation: "Autoritarismo." },
      { id_suffix: "v3", difficulty: 2, question: "Monarquía Constitucional:", options: [{text: "Rey es jefe de estado pero hay parlamento y constitución",correct:true},{text: "Rey manda todo (Absoluta)",correct:false},{text: "No hay rey",correct:false},{text: "Es una república",correct:false}], explanation: "Ej: España, UK." },
      { id_suffix: "v4", difficulty: 2, question: "República:", options: [{text: "Jefe de estado elegido, división de poderes",correct:true},{text: "Jefe es un rey hereditario",correct:false},{text: "Sin gobierno",correct:false},{text: "Dictadura",correct:false}], explanation: "Cosa pública." },
      { id_suffix: "v5", difficulty: 3, question: "Totalitarismo:", options: [{text: "Control total del Estado sobre la vida privada y pública",correct:true},{text: "Libertad total",correct:false},{text: "Democracia plena",correct:false},{text: "Anarquía",correct:false}], explanation: "Ej: Nazismo, Estalinismo." },
      { id_suffix: "v6", difficulty: 3, question: "Teocracia:", options: [{text: "Gobierno basado en leyes religiosas",correct:true},{text: "Gobierno de técnicos",correct:false},{text: "Gobierno del pueblo",correct:false},{text: "Gobierno militar",correct:false}], explanation: "Dios gobierna." },
      { id_suffix: "v7", difficulty: 4, question: "Parlamentarismo vs Presidencialismo:", options: [{text: "Parlamentarismo: Jefe gobierno sale del parlamento. Presidencialismo: Voto directo",correct:true},{text: "Son iguales",correct:false},{text: "Presidencialismo no tiene congreso",correct:false},{text: "Parlamentarismo no tiene presidente",correct:false}], explanation: "Sistema gobierno." },
      { id_suffix: "v8", difficulty: 4, question: "Federalismo:", options: [{text: "Estados/Departamentos tienen autonomía y leyes propias",correct:true},{text: "Todo se decide en la capital (Centralismo)",correct:false},{text: "Sin gobierno central",correct:false},{text: "Monarquía",correct:false}], explanation: "Ej: EE.UU." },
      { id_suffix: "v9", difficulty: 5, question: "Centralismo (Colombia):", options: [{text: "Decisiones políticas y administrativas concentradas en el centro",correct:true},{text: "Autonomía total de regiones",correct:false},{text: "Federalismo",correct:false},{text: "Anarquía",correct:false}], explanation: "Constitución 1886 vs 1991." },
      { id_suffix: "v10", difficulty: 5, question: "Populismo:", options: [{text: "Estrategia política que apela al 'pueblo' contra una 'élite'",correct:true},{text: "Ayudar a los pobres",correct:false},{text: "Ser popular",correct:false},{text: "Democracia pura",correct:false}], explanation: "Fenómeno político." }
    ]
  },

  // Bundle 5: Imperialism & Colonialism (Background)
  {
    meta: {
      id: "CO-CS-10-hist-imp-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "imperialismo",
      periodo: 1,
      dba_id: "DBA-CS-10-1",
      title: "Imperialismo y Colonialismo"
    },
    base: { question: "Contexto histórico.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Imperialismo (S. XIX):", options: [{text: "Potencias europeas dominan África y Asia",correct:true},{text: "Paz mundial",correct:false},{text: "Independencia de América",correct:false},{text: "Descubrimiento de América",correct:false}], explanation: "Expansión." },
      { id_suffix: "v2", difficulty: 1, question: "Causa económica del imperialismo:", options: [{text: "Búsqueda de materias primas y mercados",correct:true},{text: "Turismo",correct:false},{text: "Ayudar a los pobres",correct:false},{text: "Intercambio cultural",correct:false}], explanation: "Revolución Industrial." },
      { id_suffix: "v3", difficulty: 2, question: "Colonialismo:", options: [{text: "Ocupación y control directo de un territorio",correct:true},{text: "Comercio libre",correct:false},{text: "Alianza",correct:false},{text: "Turismo",correct:false}], explanation: "Sometimiento." },
      { id_suffix: "v4", difficulty: 2, question: "Conferencia de Berlín (1884):", options: [{text: "Reparto de África entre potencias europeas",correct:true},{text: "Paz en Europa",correct:false},{text: "Independencia de África",correct:false},{text: "Creación de la ONU",correct:false}], explanation: "División arbitraria." },
      { id_suffix: "v5", difficulty: 3, question: "Neocolonialismo:", options: [{text: "Dominio económico y cultural sin ocupación militar directa",correct:true},{text: "Nuevo colonialismo militar",correct:false},{text: "Independencia total",correct:false},{text: "Igualdad",correct:false}], explanation: "Siglo XX-XXI." },
      { id_suffix: "v6", difficulty: 3, question: "Consecuencia del imperialismo en África:", options: [{text: "Fronteras artificiales y conflictos étnicos",correct:true},{text: "Desarrollo industrial pleno",correct:false},{text: "Democracias estables",correct:false},{text: "Riqueza para todos",correct:false}], explanation: "Herencia colonial." },
      { id_suffix: "v7", difficulty: 4, question: "Doctrina Monroe:", options: [{text: "'América para los americanos' (rechazo a intervención europea)",correct:true},{text: "América para España",correct:false},{text: "Conquista de Europa",correct:false},{text: "Libre comercio",correct:false}], explanation: "Hegemonía USA." },
      { id_suffix: "v8", difficulty: 4, question: "Destino Manifiesto:", options: [{text: "Creencia de EE.UU. de estar destinado a expandirse",correct:true},{text: "Destino turístico",correct:false},{text: "Profecía maya",correct:false},{text: "Ley británica",correct:false}], explanation: "Expansión al oeste." },
      { id_suffix: "v9", difficulty: 5, question: "Descolonización (mitad S. XX):", options: [{text: "Proceso de independencia de colonias en Asia y África",correct:true},{text: "Nueva colonización",correct:false},{text: "Fin de la ONU",correct:false},{text: "Guerra Fría",correct:false}], explanation: "Post SGM." },
      { id_suffix: "v10", difficulty: 5, question: "Apartheid en Sudáfrica:", options: [{text: "Sistema de segregación racial legalizado",correct:true},{text: "Democracia racial",correct:false},{text: "Fiesta nacional",correct:false},{text: "Monarquía",correct:false}], explanation: "Nelson Mandela." }
    ]
  },

  // Bundle 6: Population & Demography
  {
    meta: {
      id: "CO-CS-10-geog-pop-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "demografia",
      periodo: 1,
      dba_id: "DBA-CS-10-1",
      title: "Población y Demografía"
    },
    base: { question: "Análisis demográfico.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Demografía estudia:", options: [{text: "Estadísticas de la población humana (natalidad, mortalidad)",correct:true},{text: "Mapas físicos",correct:false},{text: "Ríos",correct:false},{text: "Economía",correct:false}], explanation: "Población." },
      { id_suffix: "v2", difficulty: 1, question: "Explosión demográfica:", options: [{text: "Crecimiento acelerado de la población",correct:true},{text: "Disminución población",correct:false},{text: "Guerra",correct:false},{text: "Bomba",correct:false}], explanation: "Siglo XX." },
      { id_suffix: "v3", difficulty: 2, question: "Esperanza de vida:", options: [{text: "Promedio de años que vive una persona",correct:true},{text: "Años de estudio",correct:false},{text: "Años de trabajo",correct:false},{text: "Edad de jubilación",correct:false}], explanation: "Indicador salud." },
      { id_suffix: "v4", difficulty: 2, question: "Tasa de natalidad:", options: [{text: "Nacimientos por cada 1000 habitantes",correct:true},{text: "Número de hijos por mujer",correct:false},{text: "Nacimientos totales",correct:false},{text: "Embarazos",correct:false}], explanation: "Frecuencia." },
      { id_suffix: "v5", difficulty: 3, question: "Pirámide poblacional ancha en la base indica:", options: [{text: "Población joven y alta natalidad",correct:true},{text: "Población vieja",correct:false},{text: "Baja natalidad",correct:false},{text: "Guerra",correct:false}], explanation: "Países en desarrollo." },
      { id_suffix: "v6", difficulty: 3, question: "Migración (Emigración vs Inmigración):", options: [{text: "Emigrar es salir, Inmigrar es llegar",correct:true},{text: "Son lo mismo",correct:false},{text: "Emigrar es llegar",correct:false},{text: "Inmigrar es salir",correct:false}], explanation: "Movimiento." },
      { id_suffix: "v7", difficulty: 4, question: "Transición demográfica:", options: [{text: "Paso de altas tasas de naci/mort a bajas tasas",correct:true},{text: "Aumento de población infinito",correct:false},{text: "Extinción",correct:false},{text: "Cambio de país",correct:false}], explanation: "Modernización." },
      { id_suffix: "v8", difficulty: 4, question: "Desplazamiento forzado en Colombia:", options: [{text: "Migración interna por violencia/conflicto",correct:true},{text: "Turismo",correct:false},{text: "Migración económica",correct:false},{text: "Viaje de estudios",correct:false}], explanation: "Víctimas." },
      { id_suffix: "v9", difficulty: 5, question: "Bono demográfico:", options: [{text: "Mayoría de población en edad de trabajar",correct:true},{text: "Dinero por tener hijos",correct:false},{text: "Población vieja",correct:false},{text: "Exceso de niños",correct:false}], explanation: "Oportunidad económica." },
      { id_suffix: "v10", difficulty: 5, question: "Xenofobia:", options: [{text: "Rechazo u odio a los extranjeros",correct:true},{text: "Miedo a las alturas",correct:false},{text: "Amor a lo extranjero",correct:false},{text: "Miedo a salir",correct:false}], explanation: "Discriminación." }
    ]
  },

  // Bundle 7: Environment & Sustainable Development
  {
    meta: {
      id: "CO-CS-10-env-sustain-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "medio-ambiente",
      periodo: 1,
      dba_id: "DBA-CS-10-1",
      title: "Medio Ambiente y Desarrollo"
    },
    base: { question: "Problemática ambiental.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Desarrollo Sostenible:", options: [{text: "Satisfacer necesidades actuales sin comprometer las futuras",correct:true},{text: "No usar recursos",correct:false},{text: "Usar todo ya",correct:false},{text: "Desarrollo industrial máximo",correct:false}], explanation: "Informe Brundtland." },
      { id_suffix: "v2", difficulty: 1, question: "Calentamiento Global causado por:", options: [{text: "Efecto invernadero (CO2, Metano)",correct:true},{text: "El sol más caliente",correct:false},{text: "Volcanes",correct:false},{text: "El mar",correct:false}], explanation: "Gases GEI." },
      { id_suffix: "v3", difficulty: 2, question: "Recurso no renovable:", options: [{text: "Petróleo",correct:true},{text: "Sol",correct:false},{text: "Viento",correct:false},{text: "Madera (si se planta)",correct:false}], explanation: "Se agota." },
      { id_suffix: "v4", difficulty: 2, question: "Biodiversidad en Colombia:", options: [{text: "Uno de los países más megadiversos del mundo",correct:true},{text: "Poca biodiversidad",correct:false},{text: "Solo desierto",correct:false},{text: "No tiene selva",correct:false}], explanation: "Riqueza natural." },
      { id_suffix: "v5", difficulty: 3, question: "Huella de carbono:", options: [{text: "Cantidad de GEI emitidos por una actividad/persona",correct:true},{text: "Pisada en el suelo",correct:false},{text: "Carbón usado",correct:false},{text: "Basura",correct:false}], explanation: "Impacto." },
      { id_suffix: "v6", difficulty: 3, question: "Obsolescencia programada:", options: [{text: "Diseño de productos para que duren poco y se compren más",correct:true},{text: "Productos eternos",correct:false},{text: "Falla accidental",correct:false},{text: "Reciclaje",correct:false}], explanation: "Consumismo." },
      { id_suffix: "v7", difficulty: 4, question: "Acuerdo de París:", options: [{text: "Tratado global para reducir emisiones y frenar cambio climático",correct:true},{text: "Tratado de paz",correct:false},{text: "Acuerdo comercial",correct:false},{text: "Fiesta en París",correct:false}], explanation: "Clima." },
      { id_suffix: "v8", difficulty: 4, question: "Extractivismo:", options: [{text: "Modelo basado en exportar recursos naturales sin procesar",correct:true},{text: "Industria tecnológica",correct:false},{text: "Agricultura orgánica",correct:false},{text: "Turismo",correct:false}], explanation: "Impacto ambiental." },
      { id_suffix: "v9", difficulty: 5, question: "Justicia ambiental:", options: [{text: "Distribución equitativa de cargas y beneficios ambientales",correct:true},{text: "Cárcel para contaminadores",correct:false},{text: "Leyes verdes",correct:false},{text: "Jueces en el bosque",correct:false}], explanation: "Social + Ambiental." },
      { id_suffix: "v10", difficulty: 5, question: "Greenwashing:", options: [{text: "Marketing engañoso para parecer ecológico sin serlo",correct:true},{text: "Limpiar con jabón verde",correct:false},{text: "Reciclar de verdad",correct:false},{text: "Plantar árboles",correct:false}], explanation: "Falsa ecología." }
    ]
  },

  // Bundle 8: International Organizations
  {
    meta: {
      id: "CO-CS-10-intl-orgs-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "organismos-internacionales",
      periodo: 1,
      dba_id: "DBA-CS-10-1",
      title: "Organismos Internacionales"
    },
    base: { question: "Función organismo.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "ONU (Organización de las Naciones Unidas):", options: [{text: "Mantiene la paz y seguridad internacional",correct:true},{text: "Presta dinero",correct:false},{text: "Organiza el mundial de fútbol",correct:false},{text: "Gobierna el mundo",correct:false}], explanation: "Post SGM." },
      { id_suffix: "v2", difficulty: 1, question: "OEA (Organización de Estados Americanos):", options: [{text: "Organismo regional de América",correct:true},{text: "Mundial",correct:false},{text: "Europeo",correct:false},{text: "De África",correct:false}], explanation: "Hemisférico." },
      { id_suffix: "v3", difficulty: 2, question: "Consejo de Seguridad ONU:", options: [{text: "Órgano con 5 miembros permanentes con derecho a veto",correct:true},{text: "Asamblea general",correct:false},{text: "Corte internacional",correct:false},{text: "ONG",correct:false}], explanation: "Poder real." },
      { id_suffix: "v4", difficulty: 2, question: "Banco Mundial:", options: [{text: "Financia proyectos de desarrollo en países pobres",correct:true},{text: "Banco privado",correct:false},{text: "Guarda el oro del mundo",correct:false},{text: "Imprime dólares",correct:false}], explanation: "Desarrollo." },
      { id_suffix: "v5", difficulty: 3, question: "Corte Penal Internacional (CPI):", options: [{text: "Juzga crímenes de guerra y lesa humanidad",correct:true},{text: "Juzga robos simples",correct:false},{text: "Juzga divorcios",correct:false},{text: "Corte de la Haya (fronteras)",correct:false}], explanation: "Estatuto Roma." },
      { id_suffix: "v6", difficulty: 3, question: "Derecho a Veto en la ONU lo tienen:", options: [{text: "EE.UU., Rusia, China, Francia, Reino Unido",correct:true},{text: "Alemania y Japón",correct:false},{text: "Todos los países",correct:false},{text: "Nadie",correct:false}], explanation: "Ganadores SGM." },
      { id_suffix: "v7", difficulty: 4, question: "OCDE (Club de países ricos):", options: [{text: "Organización para la Cooperación y el Desarrollo Económico",correct:true},{text: "Organización de Comercio",correct:false},{text: "Alianza Militar",correct:false},{text: "Club de amigos",correct:false}], explanation: "Buenas prácticas." },
      { id_suffix: "v8", difficulty: 4, question: "ONG (Organización No Gubernamental):", options: [{text: "Entidad privada sin ánimo de lucro (ej: Cruz Roja)",correct:true},{text: "Empresa del gobierno",correct:false},{text: "Ministerio",correct:false},{text: "Ejército",correct:false}], explanation: "Sociedad civil." },
      { id_suffix: "v9", difficulty: 5, question: "Bloqueo económico:", options: [{text: "Sanción que impide comercio con un país (ej: Cuba)",correct:true},{text: "Muro físico",correct:false},{text: "Arancel",correct:false},{text: "Huelga",correct:false}], explanation: "Presión política." },
      { id_suffix: "v10", difficulty: 5, question: "Diplomacia:", options: [{text: "Manejo de relaciones internacionales y negociación",correct:true},{text: "Guerra",correct:false},{text: "Espionaje",correct:false},{text: "Turismo",correct:false}], explanation: "Soft power." }
    ]
  },

  // Bundle 9: Communication & Media (Social Impact)
  {
    meta: {
      id: "CO-CS-10-society-media-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "medios-sociedad",
      periodo: 1,
      dba_id: "DBA-CS-10-1",
      title: "Medios y Sociedad"
    },
    base: { question: "Impacto social.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Cuarto Poder:", options: [{text: "Los medios de comunicación",correct:true},{text: "El ejército",correct:false},{text: "La iglesia",correct:false},{text: "Internet",correct:false}], explanation: "Influencia opinión." },
      { id_suffix: "v2", difficulty: 1, question: "Fake News:", options: [{text: "Noticias falsas para manipular",correct:true},{text: "Noticias viejas",correct:false},{text: "Noticias en inglés",correct:false},{text: "Periódico",correct:false}], explanation: "Desinformación." },
      { id_suffix: "v3", difficulty: 2, question: "Libertad de prensa:", options: [{text: "Derecho a informar sin censura previa",correct:true},{text: "Derecho a mentir",correct:false},{text: "Derecho a insultar",correct:false},{text: "Ser dueño de un periódico",correct:false}], explanation: "Democracia." },
      { id_suffix: "v4", difficulty: 2, question: "Redes sociales impacto político:", options: [{text: "Movilización rápida y polarización",correct:true},{text: "Ninguno",correct:false},{text: "Solo entretenimiento",correct:false},{text: "Paz mundial",correct:false}], explanation: "Primavera Árabe, etc." },
      { id_suffix: "v5", difficulty: 3, question: "Opinión Pública:", options: [{text: "Tendencia o preferencia de la sociedad sobre un tema",correct:true},{text: "Opinión del presidente",correct:false},{text: "Voto",correct:false},{text: "Verdad absoluta",correct:false}], explanation: "Legitimidad." },
      { id_suffix: "v6", difficulty: 3, question: "Censura:", options: [{text: "Control y prohibición de información",correct:true},{text: "Crítica",correct:false},{text: "Edición",correct:false},{text: "Publicación",correct:false}], explanation: "Autoritarismo." },
      { id_suffix: "v7", difficulty: 4, question: "Algoritmos y burbujas de filtro:", options: [{text: "Solo te muestran lo que te gusta, aislandote de opiniones contrarias",correct:true},{text: "Te enseñan matemáticas",correct:false},{text: "Son imparciales",correct:false},{text: "Ayudan a debatir",correct:false}], explanation: "Sesgo confirmación." },
      { id_suffix: "v8", difficulty: 4, question: "Propaganda:", options: [{text: "Información para influir y persuadir (política/ideológica)",correct:true},{text: "Publicidad comercial",correct:false},{text: "Noticias neutras",correct:false},{text: "Educación",correct:false}], explanation: "Manipulación." },
      { id_suffix: "v9", difficulty: 5, question: "Brecha digital:", options: [{text: "Desigualdad en el acceso a tecnología e internet",correct:true},{text: "Rompimiento de un cable",correct:false},{text: "Diferencia de edad",correct:false},{text: "Hackeo",correct:false}], explanation: "Inequidad." },
      { id_suffix: "v10", difficulty: 5, question: "Posverdad:", options: [{text: "Emociones y creencias importan más que los hechos objetivos",correct:true},{text: "La verdad absoluta",correct:false},{text: "Mentira simple",correct:false},{text: "Filosofía",correct:false}], explanation: "Era actual." }
    ]
  },

  // Bundle 10: Taller Review P1
    {
    meta: {
      id: "CO-CS-10-taller-p1-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "review",
      periodo: 1,
      dba_id: "DBA-CS-10-1",
      title: "Taller Repaso P1"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Guerra Fría fue entre:", options: [{text: "EE.UU. y URSS",correct:true},{text: "China y Japón",correct:false},{text: "Alemania y Francia",correct:false},{text: "Norte y Sur",correct:false}], explanation: "Bipolar." },
      { id_suffix: "v2", difficulty: 1, question: "Sector primario:", options: [{text: "Agricultura y Minería",correct:true},{text: "Industria",correct:false},{text: "Comercio",correct:false},{text: "Bancos",correct:false}], explanation: "Recursos." },
      { id_suffix: "v3", difficulty: 2, question: "Neoliberalismo apoya:", options: [{text: "Privatización y libre mercado",correct:true},{text: "Empresas estatales",correct:false},{text: "Subsidios totales",correct:false},{text: "Cierre fronteras",correct:false}], explanation: "Mercado." },
      { id_suffix: "v4", difficulty: 2, question: "Democracia:", options: [{text: "Poder del pueblo",correct:true},{text: "Poder militar",correct:false},{text: "Poder religioso",correct:false},{text: "Poder real",correct:false}], explanation: "Voto." },
      { id_suffix: "v5", difficulty: 3, question: "Globalización:", options: [{text: "Interconexión mundial",correct:true},{text: "Aislamiento",correct:false},{text: "Guerra",correct:false},{text: "Paz local",correct:false}], explanation: "Mundo plano." },
      { id_suffix: "v6", difficulty: 3, question: "Imperialismo busca:", options: [{text: "Dominio y materias primas",correct:true},{text: "Amistad",correct:false},{text: "Cultura",correct:false},{text: "Religión",correct:false}], explanation: "S XIX." },
      { id_suffix: "v7", difficulty: 4, question: "Desarrollo sostenible:", options: [{text: "Futuro asegurado",correct:true},{text: "Gastar todo",correct:false},{text: "No gastar nada",correct:false},{text: "Solo dinero",correct:false}], explanation: "Equilibrio." },
      { id_suffix: "v8", difficulty: 4, question: "ONU sirve para:", options: [{text: "Paz y cooperación",correct:true},{text: "Guerra",correct:false},{text: "Vender armas",correct:false},{text: "Apoyar un solo país",correct:false}], explanation: "Naciones Unidas." },
      { id_suffix: "v9", difficulty: 5, question: "Fake News afectan:", options: [{text: "La democracia y la verdad",correct:true},{text: "Nada",correct:false},{text: "Mejoran el debate",correct:false},{text: "Divierten",correct:false}], explanation: "Polarización." },
      { id_suffix: "v10", difficulty: 5, question: "PIB mide:", options: [{text: "Producción económica total",correct:true},{text: "Felicidad",correct:false},{text: "Población",correct:false},{text: "Territorio",correct:false}], explanation: "Riqueza." }
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
search_query: "social studies questions grade ${meta.grade} ${meta.periodo} ${meta.topic}"
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

**Competencia:** Pensamiento Social y Sistémico (DBA: ${meta.dba_id})

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
    console.log(`✅ Created Period 1 Bundle v3.0: ${fullPath}`);
});
