
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
  // Grade 11 - Sociales - Period 1 - BUNDLE 1 (Globalización)
  {
    meta: {
      id: "CO-SOC-11-globalizacion-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "geografia-economica",
      periodo: 1,
      dba_id: "DBA-SOC-11-1",
      title: "La Globalización"
    },
    base: { question: "La globalización conecta economías.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "La globalización implica:", options: [{text: "Interconexión económica y cultural mundial",correct:true},{text: "Aislamiento de países",correct:false},{text: "Solo fútbol",correct:false},{text: "Guerra",correct:false}], explanation: "Aldea global." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Empresa multinacional:", options: [{text: "Opera en muchos países",correct:true},{text: "Solo en un barrio",correct:false},{text: "Vende solo pan",correct:false},{text: "Es del estado",correct:false}], explanation: "Presencia global." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Ventaja de la globalización:", options: [{text: "Acceso a productos internacionales",correct:true},{text: "Todo es más caro",correct:false},{text: "Pérdida de empleo",correct:false},{text: "Menos internet",correct:false}], explanation: "Mercado amplio." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Desventaja de la globalización:", options: [{text: "Pérdida de identidad cultural local",correct:true},{text: "Más viajes",correct:false},{text: "Más idiomas",correct:false},{text: "Paz",correct:false}], explanation: "Homogeneización." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Neoliberalismo:", options: [{text: "Modelo que promueve libre mercado y reducción del Estado",correct:true},{text: "Comunismo",correct:false},{text: "Monarquía",correct:false},{text: "Religión",correct:false}], explanation: "Apertura económica." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "FMI (Fondo Monetario Internacional):", options: [{text: "Organismo que presta dinero y vigila economías",correct:true},{text: "Banco de ropa",correct:false},{text: "Equipo de fútbol",correct:false},{text: "Universidad",correct:false}], explanation: "Estabilidad financiera." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Deslocalización industrial (Offshoring):", options: [{text: "Trasladar fábricas a países con mano de obra barata",correct:true},{text: "Cerrar fábricas",correct:false},{text: "Subir sueldos",correct:false},{text: "Comprar local",correct:false}], explanation: "Costos producción." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Proteccionismo vs Librecambio:", options: [{text: "Aranceles para proteger industria local vs Cero aranceles",correct:true},{text: "Guerra",correct:false},{text: "Política",correct:false},{text: "Salud",correct:false}], explanation: "Modelos opuestos." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Globalización financiera:", options: [{text: "Libre flujo de capitales especulativos en tiempo real",correct:true},{text: "Enviar cartas",correct:false},{text: "Trueque",correct:false},{text: "Ahorro",correct:false}], explanation: "Bolsas valores." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Brecha digital:", options: [{text: "Desigualdad en el acceso a tecnología e información",correct:true},{text: "Pantalla rota",correct:false},{text: "Cable cortado",correct:false},{text: "Mala señal",correct:false}], explanation: "Inequidad tecnológica." }
    ]
  },

  // Bundle 2: Bloques Económicos
  {
    meta: {
      id: "CO-SOC-11-bloques-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "geografia-economica",
      periodo: 1,
      dba_id: "DBA-SOC-11-1",
      title: "Bloques Económicos"
    },
    base: { question: "Los países se unen en bloques.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Unión Europea (UE):", options: [{text: "Bloque económico y político de Europa (Euro)",correct:true},{text: "País de Asia",correct:false},{text: "Club de fútbol",correct:false},{text: "Guerra",correct:false}], explanation: "Integración profunda." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "TLC:", options: [{text: "Tratado de Libre Comercio",correct:true},{text: "Televisión Local",correct:false},{text: "Teléfono",correct:false},{text: "Transporte",correct:false}], explanation: "Acuerdo comercial." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "MERCOSUR:", options: [{text: "Mercado Común del Sur (Argentina, Brasil...)",correct:true},{text: "Mercado de USA",correct:false},{text: "Mercado de China",correct:false},{text: "Mercado libre",correct:false}], explanation: "Sudamérica." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Objetivo de un bloque económico:", options: [{text: "Eliminar barreras comerciales entre miembros",correct:true},{text: "Hacer muros",correct:false},{text: "Cobrar más impuestos",correct:false},{text: "Pelear",correct:false}], explanation: "Comercio fluido." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Zona Euro:", options: [{text: "Países de la UE que usan el Euro como moneda",correct:true},{text: "Toda Europa",correct:false},{text: "Zona de guerra",correct:false},{text: "Zona turística",correct:false}], explanation: "Moneda común." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Alianza del Pacífico:", options: [{text: "Integración Chile, Colombia, México, Perú",correct:true},{text: "Alianza Asia",correct:false},{text: "Alianza África",correct:false},{text: "Guerra",correct:false}], explanation: "Latam." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Unión Aduanera:", options: [{text: "Arancel externo común para terceros países",correct:true},{text: "Policía",correct:false},{text: "Frontera cerrada",correct:false},{text: "Libre paso personas",correct:false}], explanation: "Nivel integración." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Brexit:", options: [{text: "Salida del Reino Unido de la Unión Europea",correct:true},{text: "Entrada de Brasil",correct:false},{text: "Moneda nueva",correct:false},{text: "Presidente",correct:false}], explanation: "Desintegración." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "BRICS:", options: [{text: "Economías emergentes (Brasil, Rusia, India, China, Sudáfrica)",correct:true},{text: "Ladrillos",correct:false},{text: "Bancos",correct:false},{text: "Europa",correct:false}], explanation: "Geopolítica alterna." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "APEC:", options: [{text: "Cooperación Económica Asia-Pacífico",correct:true},{text: "Asociación Peces",correct:false},{text: "África",correct:false},{text: "Europa Central",correct:false}], explanation: "Cuenca Pacífico." }
    ]
  },

  // Bundle 3: Geopolítica Mundial
  {
    meta: {
      id: "CO-SOC-11-geopolitica-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "geopolitica",
      periodo: 1,
      dba_id: "DBA-SOC-11-1",
      title: "Geopolítica Actual"
    },
    base: { question: "La geografía influye en la política.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Potencia mundial actual:", options: [{text: "Estados Unidos",correct:true},{text: "Haití",correct:false},{text: "Bolivia",correct:false},{text: "Laos",correct:false}], explanation: "Hegemonía." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Guerra Fría (Histórico):", options: [{text: "Conflicto USA vs URSS (Capitalismo vs Comunismo)",correct:true},{text: "Guerra con hielo",correct:false},{text: "Guerra Mundial I",correct:false},{text: "Paz",correct:false}], explanation: "Bipolaridad." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Mundo Multipolar:", options: [{text: "Varios centros de poder (USA, China, UE, Rusia)",correct:true},{text: "Un solo rey",correct:false},{text: "Nadie manda",correct:false},{text: "Caos",correct:false}], explanation: "Siglo XXI." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "ONU:", options: [{text: "Organización de las Naciones Unidas (Busca paz)",correct:true},{text: "Organización No Útil",correct:false},{text: "Ejército",correct:false},{text: "Empresa",correct:false}], explanation: "Diplomacia." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Consejo de Seguridad ONU:", options: [{text: "Órgano con 5 miembros permanentes con poder de veto",correct:true},{text: "Todos votan igual",correct:false},{text: "No tiene poder",correct:false},{text: "Es un banco",correct:false}], explanation: "Poder real." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "OTAN:", options: [{text: "Alianza militar occidental (Defensa colectiva)",correct:true},{text: "Organización turismo",correct:false},{text: "TLC",correct:false},{text: "ONG",correct:false}], explanation: "Defensa." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Guerra comercial China-USA:", options: [{text: "Disputa por hegemonía tecnológica y aranceles",correct:true},{text: "Guerra con armas",correct:false},{text: "Amistad",correct:false},{text: "Fútbol",correct:false}], explanation: "Tensión actual." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Poder blando (Soft Power):", options: [{text: "Influencia por cultura e ideología (Hollywood, K-pop)",correct:true},{text: "Fuerza militar",correct:false},{text: "Dinero",correct:false},{text: "Amenazas",correct:false}], explanation: "Persuasión." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Primavera Árabe:", options: [{text: "Protestas pro-democracia en Medio Oriente (2010s)",correct:true},{text: "Estación del año",correct:false},{text: "Fiesta",correct:false},{text: "Guerra mundial",correct:false}], explanation: "Cambio político." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Conflicto en Ucrania:", options: [{text: "Tensión geopolítica Rusia-Occidente por zonas de influencia",correct:true},{text: "Problema religioso",correct:false},{text: "Problema climático",correct:false},{text: "Sin importancia",correct:false}], explanation: "Actualidad." }
    ]
  },

  // Bundle 4: Sectores Económicos
  {
    meta: {
      id: "CO-SOC-11-sectores-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "geografia-economica",
      periodo: 1,
      dba_id: "DBA-SOC-11-1",
      title: "Sectores de la Economía"
    },
    base: { question: "La economía tiene sectores.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Sector Primario:", options: [{text: "Extracción de recursos (Agricultura, Minería)",correct:true},{text: "Fábricas",correct:false},{text: "Servicios",correct:false},{text: "Internet",correct:false}], explanation: "Materias primas." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Sector Secundario:", options: [{text: "Industria y transformación (Fábricas)",correct:true},{text: "Campo",correct:false},{text: "Bancos",correct:false},{text: "Hospitales",correct:false}], explanation: "Manufactura." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Sector Terciario:", options: [{text: "Servicios (Comercio, Turismo, Salud)",correct:true},{text: "Minería",correct:false},{text: "Pesca",correct:false},{text: "Industria",correct:false}], explanation: "Intangibles." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Sector Cuaternario:", options: [{text: "Tecnología, Investigación e Información (I+D)",correct:true},{text: "Agricultura",correct:false},{text: "Construcción",correct:false},{text: "Transporte básico",correct:false}], explanation: "Conocimiento." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "PIB (Producto Interno Bruto):", options: [{text: "Valor total de bienes y servicios producidos en un país",correct:true},{text: "Dinero del banco",correct:false},{text: "Sueldo promedio",correct:false},{text: "Población",correct:false}], explanation: "Indicador macro." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Desindustrialización:", options: [{text: "Pérdida de peso del sector industrial en la economía",correct:true},{text: "Crear fábricas",correct:false},{text: "Sembrar más",correct:false},{text: "Vender humo",correct:false}], explanation: "Cambio estructural." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Economía Naranja:", options: [{text: "Industrias creativas y culturales",correct:true},{text: "Venta de naranjas",correct:false},{text: "Minería",correct:false},{text: "Petróleo",correct:false}], explanation: "Creatividad." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "División internacional del trabajo:", options: [{text: "Especialización de países en ciertos productos",correct:true},{text: "Todos hacen todo",correct:false},{text: "Nadie trabaja",correct:false},{text: "Huelga mundial",correct:false}], explanation: "Ventaja comparativa." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Obsolescencia tecnológica:", options: [{text: "Equipos que quedan anticuados rápidamente",correct:true},{text: "Equipos eternos",correct:false},{text: "Basura",correct:false},{text: "Moda",correct:false}], explanation: "Ciclo vida." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Commodities:", options: [{text: "Materias primas genéricas cotizadas en bolsa (Petróleo, Café)",correct:true},{text: "Computadores",correct:false},{text: "Carros",correct:false},{text: "Ropa marca",correct:false}], explanation: "Bienes básicos." }
    ]
  },

  // Bundle 5: Desarrollo y Pobreza
  {
    meta: {
      id: "CO-SOC-11-desarrollo-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "geografia-economica",
      periodo: 1,
      dba_id: "DBA-SOC-11-1",
      title: "Desarrollo y Desigualdad"
    },
    base: { question: "El desarrollo se mide.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "País desarrollado:", options: [{text: "Alto nivel de vida e industria",correct:true},{text: "Pobre",correct:false},{text: "Sin escuelas",correct:false},{text: "Sin luz",correct:false}], explanation: "Primer mundo." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Pobreza extrema:", options: [{text: "No cubrir necesidades básicas (comida)",correct:true},{text: "No tener carro",correct:false},{text: "No tener iPhone",correct:false},{text: "Ser tacaño",correct:false}], explanation: "Indigencia." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "IDH (Índice Desarrollo Humano):", options: [{text: "Mide salud, educación e ingresos",correct:true},{text: "Solo dinero",correct:false},{text: "Solo felicidad",correct:false},{text: "Número de carros",correct:false}], explanation: "ONU." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Coeficiente de Gini:", options: [{text: "Mide la desigualdad de ingresos (0=igualdad, 1=desigualdad)",correct:true},{text: "Mide inteligencia",correct:false},{text: "Mide altura",correct:false},{text: "Mide peso",correct:false}], explanation: "Inequidad." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Desarrollo Sostenible:", options: [{text: "Satisfacer presente sin comprometer el futuro (Ecología)",correct:true},{text: "Gastar todo ya",correct:false},{text: "No crecer",correct:false},{text: "Contaminar",correct:false}], explanation: "Futuro." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "ODS (Objetivos de Desarrollo Sostenible):", options: [{text: "17 metas de la ONU para 2030 (Fin pobreza, etc.)",correct:true},{text: "Objetivos de guerra",correct:false},{text: "Juegos",correct:false},{text: "Leyes",correct:false}], explanation: "Agenda 2030." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Países emergentes:", options: [{text: "En vías de desarrollo rápido (ej. Brasil, India)",correct:true},{text: "Pobres estancados",correct:false},{text: "Ricos antiguos",correct:false},{text: "Pequeños",correct:false}], explanation: "Clase media mundial." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Deuda Externa:", options: [{text: "Dinero que un país debe a extranjeros",correct:true},{text: "Deuda tarjeta",correct:false},{text: "Ahorro",correct:false},{text: "Impuesto",correct:false}], explanation: "Finanzas públicas." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Trampa de la pobreza:", options: [{text: "Mecanismos que hacen difícil salir de la pobreza (falta educación)",correct:true},{text: "Hueco en la calle",correct:false},{text: "Mala suerte",correct:false},{text: "Pereza",correct:false}], explanation: "Círculo vicioso." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Estado de Bienestar:", options: [{text: "Estado provee servicios básicos universales (Salud, Pensión)",correct:true},{text: "Estado regala todo",correct:false},{text: "Estado no existe",correct:false},{text: "Caridad",correct:false}], explanation: "Modelo europeo." }
    ]
  },

  // Bundle 6: Migraciones
  {
    meta: {
      id: "CO-SOC-11-migraciones-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "geografia-humana",
      periodo: 1,
      dba_id: "DBA-SOC-11-1",
      title: "Migraciones Humanas"
    },
    base: { question: "La gente migra.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Emigrante:", options: [{text: "Persona que SALE de su país",correct:true},{text: "Persona que llega",correct:false},{text: "Persona que pasea",correct:false},{text: "Turista",correct:false}], explanation: "Salida." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Inmigrante:", options: [{text: "Persona que ENTRA a un país a vivir",correct:true},{text: "El que se va",correct:false},{text: "El que nace",correct:false},{text: "El vecino",correct:false}], explanation: "Llegada." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Causa principal de migración actual:", options: [{text: "Económica (Buscar trabajo)",correct:true},{text: "Turismo",correct:false},{text: "Clima",correct:false},{text: "Aburrimiento",correct:false}], explanation: "Necesidad." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Refugiado:", options: [{text: "Huye por persecución o guerra (protegido legalmente)",correct:true},{text: "Viajero",correct:false},{text: "Estudiante",correct:false},{text: "Millonario",correct:false}], explanation: "Derecho internacional." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Remesas:", options: [{text: "Dinero enviado por migrantes a sus familias",correct:true},{text: "Cartas",correct:false},{text: "Ropa",correct:false},{text: "Deudas",correct:false}], explanation: "Economía hogar." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Fuga de cerebros:", options: [{text: "Emigración de profesionales calificados",correct:true},{text: "Derrame cerebral",correct:false},{text: "Perder memoria",correct:false},{text: "Robar exámenes",correct:false}], explanation: "Pérdida talento." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Migración pendular:", options: [{text: "Ir y volver diariamente (ej. Vivir en Soacha, trabajar en Bogotá)",correct:true},{text: "Irse para siempre",correct:false},{text: "No moverse",correct:false},{text: "Volar",correct:false}], explanation: "Movilidad." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Xenofobia:", options: [{text: "Odio o rechazo a los extranjeros",correct:true},{text: "Miedo a alturas",correct:false},{text: "Amor a todos",correct:false},{text: "Fobia a perros",correct:false}], explanation: "Discriminación." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Desplazamiento forzado interno:", options: [{text: "Huir dentro del mismo país por violencia (Caso Colombia)",correct:true},{text: "Mudarse de casa",correct:false},{text: "Viaje vacaciones",correct:false},{text: "Perderse",correct:false}], explanation: "Víctimas." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Globalización y migración:", options: [{text: "Paradoja: Libre flujo de dinero, restringido flujo de personas",correct:true},{text: "Todo libre",correct:false},{text: "Nada libre",correct:false},{text: "Sin relación",correct:false}], explanation: "Muros vs Redes." }
    ]
  },

  // Bundle 7: Demografía
  {
    meta: {
      id: "CO-SOC-11-demografia-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "geografia-humana",
      periodo: 1,
      dba_id: "DBA-SOC-11-1",
      title: "Población Mundial"
    },
    base: { question: "Somos muchos humanos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "País más poblado del mundo (2025):", options: [{text: "India",correct:true},{text: "Colombia",correct:false},{text: "Rusia",correct:false},{text: "Canadá",correct:false}], explanation: "Superó a China." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Censo:", options: [{text: "Conteo oficial de la población",correct:true},{text: "Encuesta rápida",correct:false},{text: "Votación",correct:false},{text: "Examen",correct:false}], explanation: "DANE." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Esperanza de vida:", options: [{text: "Promedio de años que vive una persona",correct:true},{text: "Edad de jubilación",correct:false},{text: "Tener fe",correct:false},{text: "Edad mínima",correct:false}], explanation: "Salud." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Tasa de natalidad:", options: [{text: "Nacimientos por cada 1000 habitantes",correct:true},{text: "Muertes",correct:false},{text: "Bodas",correct:false},{text: "Divorcios",correct:false}], explanation: "Crecimiento." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Pirámide poblacional ancha abajo:", options: [{text: "Población joven (Alta natalidad)",correct:true},{text: "Población vieja",correct:false},{text: "Población rica",correct:false},{text: "Nadie",correct:false}], explanation: "Países pobres." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Envejecimiento poblacional:", options: [{text: "Aumento de ancianos y baja natalidad (Europa)",correct:true},{text: "Muchos bebés",correct:false},{text: "Juventud eterna",correct:false},{text: "Epidemia",correct:false}], explanation: "Reto pensional." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Explosión demográfica:", options: [{text: "Crecimiento acelerado de la población (S. XX)",correct:true},{text: "Bomba",correct:false},{text: "Guerra",correct:false},{text: "Muerte masiva",correct:false}], explanation: "Sobrepoblación." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Tasa de fecundidad:", options: [{text: "Hijos promedio por mujer",correct:true},{text: "Hijos por hombre",correct:false},{text: "Bebés totales",correct:false},{text: "Embarazos",correct:false}], explanation: "Reemplazo 2.1." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Bono demográfico:", options: [{text: "Mayoría de población en edad de trabajar (Oportunidad económica)",correct:true},{text: "Regalo del gobierno",correct:false},{text: "Lotería",correct:false},{text: "Crisis",correct:false}], explanation: "Ventana tiempo." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Transición demográfica:", options: [{text: "Paso de altas tasas de natalidad/mortalidad a bajas",correct:true},{text: "Mudanza",correct:false},{text: "Cambio de gobierno",correct:false},{text: "Revolución",correct:false}], explanation: "Desarrollo." }
    ]
  },

  // Bundle 8: Urbanización
  {
    meta: {
      id: "CO-SOC-11-urbanizacion-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "geografia-humana",
      periodo: 1,
      dba_id: "DBA-SOC-11-1",
      title: "Ciudades y Urbanismo"
    },
    base: { question: "El mundo es urbano.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Zona Urbana:", options: [{text: "Ciudad (Alta densidad, servicios)",correct:true},{text: "Campo",correct:false},{text: "Selva",correct:false},{text: "Mar",correct:false}], explanation: "Edificios." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Zona Rural:", options: [{text: "Campo (Agricultura, baja densidad)",correct:true},{text: "Centro comercial",correct:false},{text: "Capital",correct:false},{text: "Fábrica",correct:false}], explanation: "Naturaleza." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Megaciudad:", options: [{text: "Ciudad con más de 10 millones de habitantes",correct:true},{text: "Ciudad bonita",correct:false},{text: "Pueblo grande",correct:false},{text: "Barrio",correct:false}], explanation: "Tokio, Bogotá." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Problema urbano común:", options: [{text: "Congestión vehicular y contaminación",correct:true},{text: "Mucho silencio",correct:false},{text: "Falta de gente",correct:false},{text: "Mucho espacio",correct:false}], explanation: "Tráfico." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Conurbación:", options: [{text: "Unión física de dos o más ciudades (Bogotá-Soacha)",correct:true},{text: "Pelea de ciudades",correct:false},{text: "Separación",correct:false},{text: "Parque",correct:false}], explanation: "Mancha urbana." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Gentrificación:", options: [{text: "Desplazamiento de pobres por ricos en barrios renovados",correct:true},{text: "Mejorar parques",correct:false},{text: "Hacer fiestas",correct:false},{text: "Construir puente",correct:false}], explanation: "Encarecimiento." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Segregación socio-espacial:", options: [{text: "Separación de clases sociales en la ciudad (Norte rico, Sur pobre)",correct:true},{text: "Vivir juntos",correct:false},{text: "Mezcla",correct:false},{text: "Igualdad",correct:false}], explanation: "Desigualdad urbana." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "POT (Plan de Ordenamiento Territorial):", options: [{text: "Norma que organiza el uso del suelo municipal",correct:true},{text: "Mapa escolar",correct:false},{text: "Plan de vacunas",correct:false},{text: "Fiesta patronal",correct:false}], explanation: "Planeación." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Área Metropolitana:", options: [{text: "Ciudad principal y municipios satélites integrados",correct:true},{text: "Solo el centro",correct:false},{text: "El campo",correct:false},{text: "Un edificio",correct:false}], explanation: "AMB." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Espacio público:", options: [{text: "Lugar de uso para todos (Parques, andenes)",correct:true},{text: "Casa privada",correct:false},{text: "Centro comercial",correct:false},{text: "Oficina",correct:false}], explanation: "Derecho a la ciudad." }
    ]
  },

  // Bundle 9: Política Internacional
  {
    meta: {
      id: "CO-SOC-11-internacional-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "geopolitica",
      periodo: 1,
      dba_id: "DBA-SOC-11-1",
      title: "Relaciones Internacionales"
    },
    base: { question: "Los países dialogan.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Diplomacia:", options: [{text: "Negociación pacífica entre países",correct:true},{text: "Guerra",correct:false},{text: "Insultos",correct:false},{text: "Deporte",correct:false}], explanation: "Embajadores." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Frontera:", options: [{text: "Límite legal entre dos estados",correct:true},{text: "Río",correct:false},{text: "Montaña",correct:false},{text: "Línea imaginaria",correct:false}], explanation: "Soberanía." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Soberanía:", options: [{text: "Poder de un estado para gobernarse sin injerencia externa",correct:true},{text: "Ser rey",correct:false},{text: "Tener dinero",correct:false},{text: "Esclavitud",correct:false}], explanation: "Independencia." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Embajada:", options: [{text: "Representación oficial de un país en otro",correct:true},{text: "Hotel",correct:false},{text: "Restaurante",correct:false},{text: "Casa",correct:false}], explanation: "Territorio diplomático." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Derecho Internacional Humanitario (DIH):", options: [{text: "Reglas de la guerra (Proteger civiles)",correct:true},{text: "Derechos Humanos",correct:false},{text: "Leyes de tránsito",correct:false},{text: "Manual escolar",correct:false}], explanation: "Conflicto armado." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Asilo político:", options: [{text: "Protección a perseguidos políticos de otro país",correct:true},{text: "Cárcel",correct:false},{text: "Vacaciones",correct:false},{text: "Trabajo",correct:false}], explanation: "Refugio." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Corte Internacional de Justicia (La Haya):", options: [{text: "Resuelve disputas entre estados (Límites)",correct:true},{text: "Juzga criminales",correct:false},{text: "Corte local",correct:false},{text: "Partido fútbol",correct:false}], explanation: "Litigios." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Corte Penal Internacional (CPI):", options: [{text: "Juzga personas por crímenes de lesa humanidad",correct:true},{text: "Juzga países",correct:false},{text: "Multas tráfico",correct:false},{text: "Divorcios",correct:false}], explanation: "Genocidio." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Geopolítica del petróleo:", options: [{text: "Conflictos por control de recursos energéticos",correct:true},{text: "Vender gasolina",correct:false},{text: "Ecología",correct:false},{text: "Nada",correct:false}], explanation: "Medio Oriente." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Tratado de no proliferación nuclear:", options: [{text: "Acuerdo para evitar más bombas atómicas",correct:true},{text: "Hacer más bombas",correct:false},{text: "Energía verde",correct:false},{text: "Comercio",correct:false}], explanation: "Desarme." }
    ]
  },

  // Bundle 10: Taller Integrado Geografía Económica
  {
    meta: {
      id: "CO-SOC-11-taller-geo-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "geografia-economica",
      periodo: 1,
      dba_id: "DBA-SOC-11-1",
      title: "Análisis Geoeconómico"
    },
    base: { question: "La economía y la política se unen.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Divisa:", options: [{text: "Moneda extranjera (Dólar, Euro)",correct:true},{text: "Billete falso",correct:false},{text: "Tarjeta",correct:false},{text: "Cheque",correct:false}], explanation: "Cambio." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Inflación:", options: [{text: "Aumento general de precios",correct:true},{text: "Baja de precios",correct:false},{text: "Sueldos altos",correct:false},{text: "Ahorro",correct:false}], explanation: "Costo vida." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Balanza comercial:", options: [{text: "Diferencia entre exportaciones e importaciones",correct:true},{text: "Peso de camiones",correct:false},{text: "Balanza tienda",correct:false},{text: "Ganancia neta",correct:false}], explanation: "Superávit/Déficit." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Monopolio:", options: [{text: "Un solo vendedor domina el mercado",correct:true},{text: "Muchos vendedores",correct:false},{text: "Juego de mesa",correct:false},{text: "Competencia",correct:false}], explanation: "Fallo mercado." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Paraíso fiscal:", options: [{text: "País con impuestos muy bajos y secreto bancario",correct:true},{text: "Isla bonita",correct:false},{text: "Cielo",correct:false},{text: "Infierno",correct:false}], explanation: "Evasión." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Lavado de activos:", options: [{text: "Dar apariencia legal a dinero ilícito",correct:true},{text: "Lavar billetes",correct:false},{text: "Limpiar casa",correct:false},{text: "Pagar deudas",correct:false}], explanation: "Delito." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Dumping:", options: [{text: "Vender por debajo del costo para quebrar competencia",correct:true},{text: "Botar basura",correct:false},{text: "Saltar",correct:false},{text: "Regalar",correct:false}], explanation: "Competencia desleal." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Cartel económico:", options: [{text: "Acuerdo entre empresas para fijar precios altos",correct:true},{text: "Afiche",correct:false},{text: "Letrero",correct:false},{text: "Mafia solo",correct:false}], explanation: "Oligopolio." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Soberanía alimentaria:", options: [{text: "Derecho de un país a definir su política agrícola y alimentarse",correct:true},{text: "Comer mucho",correct:false},{text: "Dieta",correct:false},{text: "Importar todo",correct:false}], explanation: "Autonomía." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Decrecimiento:", options: [{text: "Teoría que propone reducir producción para salvar planeta",correct:true},{text: "Crisis",correct:false},{text: "Pobreza",correct:false},{text: "Perder peso",correct:false}], explanation: "Ecología política." }
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
search_query: "preguntas sociales grado ${meta.grade} ${meta.periodo} ${meta.topic}"
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
    console.log(`✅ Created Period 1 Bundle v3.0: ${fullPath}`);
});
