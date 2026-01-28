
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: Ionic Bonding
  {
    meta: {
      id: "CO-CN-10-chem-bond-ionic-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "enlace-ionico",
      periodo: 2,
      dba_id: "DBA-CN-10-2",
      title: "Enlace Iónico"
    },
    base: { question: "Propiedades del enlace iónico.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "El enlace iónico se forma por:", options: [{text: "Transferencia de electrones",correct:true},{text: "Compartición de electrones",correct:false},{text: "Nube de electrones",correct:false},{text: "Fuerzas débiles",correct:false}], explanation: "Catión + Anión." },
      { id_suffix: "v2", difficulty: 1, question: "Ocurre generalmente entre:", options: [{text: "Metal y No Metal",correct:true},{text: "Dos No Metales",correct:false},{text: "Dos Metales",correct:false},{text: "Gases Nobles",correct:false}], explanation: "Gran diferencia electronegatividad." },
      { id_suffix: "v3", difficulty: 2, question: "Propiedad de compuestos iónicos:", options: [{text: "Solubles en agua y conductor en solución",correct:true},{text: "Bajo punto de fusión",correct:false},{text: "Gases a temperatura ambiente",correct:false},{text: "No conducen electricidad nunca",correct:false}], explanation: "Electrolitos." },
      { id_suffix: "v4", difficulty: 2, question: "El NaCl (sal) es un ejemplo de:", options: [{text: "Compuesto iónico",correct:true},{text: "Compuesto covalente",correct:false},{text: "Metal puro",correct:false},{text: "Mezcla",correct:false}], explanation: "Na+ Cl-." },
      { id_suffix: "v5", difficulty: 3, question: "Diferencia de electronegatividad para ser iónico:", options: [{text: "Mayor a 1.7",correct:true},{text: "Menor a 1.7",correct:false},{text: "Igual a 0",correct:false},{text: "Entre 0 y 0.4",correct:false}], explanation: "Regla general." },
      { id_suffix: "v6", difficulty: 3, question: "En un enlace iónico, el metal se convierte en:", options: [{text: "Catión (Carga positiva)",correct:true},{text: "Anión (Carga negativa)",correct:false},{text: "Neutro",correct:false},{text: "Isótopo",correct:false}], explanation: "Pierde electrones." },
      { id_suffix: "v7", difficulty: 4, question: "¿Por qué los sólidos iónicos son frágiles?", options: [{text: "Desplazamiento provoca repulsión ion-ion",correct:true},{text: "Son muy blandos",correct:false},{text: "Por el agua",correct:false},{text: "Son elásticos",correct:false}], explanation: "Estructura cristalina rígida." },
      { id_suffix: "v8", difficulty: 4, question: "Energía reticular (Lattice Energy):", options: [{text: "Energía para separar iones del cristal",correct:true},{text: "Energía para fundir",correct:false},{text: "Energía solar",correct:false},{text: "Energía cinética",correct:false}], explanation: "Estabilidad del cristal." },
      { id_suffix: "v9", difficulty: 5, question: "¿Cuál tiene mayor punto de fusión: NaCl o MgO?", options: [{text: "MgO (Iones +2/-2)",correct:true},{text: "NaCl (Iones +1/-1)",correct:false},{text: "Iguales",correct:false},{text: "No se puede saber",correct:false}], explanation: "Atracción culómbica mayor." },
      { id_suffix: "v10", difficulty: 5, question: "Estructura de Lewis del KBr:", options: [{text: "[K]+ [Br]- (con 8 puntos)",correct:true},{text: "K:Br",correct:false},{text: "K-Br (línea)",correct:false},{text: "K+ Br",correct:false}], explanation: "Iones separados." }
    ]
  },

  // Bundle 2: Covalent Bonding
  {
    meta: {
      id: "CO-CN-10-chem-bond-cov-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "enlace-covalente",
      periodo: 2,
      dba_id: "DBA-CN-10-2",
      title: "Enlace Covalente"
    },
    base: { question: "Propiedades enlace covalente.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "El enlace covalente se forma por:", options: [{text: "Compartición de electrones",correct:true},{text: "Transferencia de electrones",correct:false},{text: "Mar de electrones",correct:false},{text: "Fuerzas magnéticas",correct:false}], explanation: "No metales." },
      { id_suffix: "v2", difficulty: 1, question: "Ocurre generalmente entre:", options: [{text: "Dos No Metales",correct:true},{text: "Metal y No Metal",correct:false},{text: "Dos Metales",correct:false},{text: "Gases Nobles",correct:false}], explanation: "Similar electronegatividad." },
      { id_suffix: "v3", difficulty: 2, question: "Covalente Polar significa:", options: [{text: "Compartición desigual de electrones",correct:true},{text: "Compartición igual",correct:false},{text: "Transferencia total",correct:false},{text: "Enlace roto",correct:false}], explanation: "Polos + y -." },
      { id_suffix: "v4", difficulty: 2, question: "El agua (H2O) tiene enlaces:", options: [{text: "Covalentes polares",correct:true},{text: "Iónicos",correct:false},{text: "Metálicos",correct:false},{text: "Covalentes apolares",correct:false}], explanation: "O es más electronegativo." },
      { id_suffix: "v5", difficulty: 3, question: "Diferencia electronegatividad entre 0.4 y 1.7:", options: [{text: "Covalente Polar",correct:true},{text: "Iónico",correct:false},{text: "Covalente Apolar",correct:false},{text: "Metálico",correct:false}], explanation: "Rango intermedio." },
      { id_suffix: "v6", difficulty: 3, question: "Enlace coordinado (dativo):", options: [{text: "Un átomo aporta el par de electrones",correct:true},{text: "Cada uno aporta uno",correct:false},{text: "Se transfieren",correct:false},{text: "No existe",correct:false}], explanation: "Ej: Amonio NH4+." },
      { id_suffix: "v7", difficulty: 4, question: "Molécula apolar con enlaces polares:", options: [{text: "CO2 (Lineal simétrica)",correct:true},{text: "H2O (Angular)",correct:false},{text: "HCl",correct:false},{text: "NH3",correct:false}], explanation: "Momentos dipolares se anulan." },
      { id_suffix: "v8", difficulty: 4, question: "Excepción al octeto (Boro):", options: [{text: "Se estabiliza con 6 electrones (BF3)",correct:true},{text: "Necesita 8",correct:false},{text: "Murió",correct:false},{text: "Usa 10",correct:false}], explanation: "Octeto incompleto." },
      { id_suffix: "v9", difficulty: 5, question: "Resonancia en estructura de Lewis:", options: [{text: "Deslocalización de electrones pi (Benz, Ozono)",correct:true},{text: "Vibración del núcleo",correct:false},{text: "Sonido",correct:false},{text: "Ruptura",correct:false}], explanation: "Híbrido de resonancia." },
      { id_suffix: "v10", difficulty: 5, question: "Longitud de enlace: Simple vs Doble vs Triple:", options: [{text: "Triple < Doble < Simple",correct:true},{text: "Simple < Doble < Triple",correct:false},{text: "Iguales",correct:false},{text: "Triple es más largo",correct:false}], explanation: "Más fuerte = más corto." }
    ]
  },

  // Bundle 3: Metallic Bonding
  {
    meta: {
      id: "CO-CN-10-chem-bond-metal-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "enlace-metalico",
      periodo: 2,
      dba_id: "DBA-CN-10-2",
      title: "Enlace Metálico"
    },
    base: { question: "Propiedades enlace metálico.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Descripción del enlace metálico:", options: [{text: "Mar de electrones deslocalizados",correct:true},{text: "Compartición de pares",correct:false},{text: "Iones fijos",correct:false},{text: "Fuerzas de Van der Waals",correct:false}], explanation: "Cationes en nube e-." },
      { id_suffix: "v2", difficulty: 1, question: "Propiedad explicada por enlace metálico:", options: [{text: "Conductividad eléctrica y térmica",correct:true},{text: "Fragilidad",correct:false},{text: "Bajo punto fusión",correct:false},{text: "Solubilidad en agua",correct:false}], explanation: "Electrones libres." },
      { id_suffix: "v3", difficulty: 2, question: "Maleabilidad es:", options: [{text: "Capacidad de formar láminas",correct:true},{text: "Hilos (Ductilidad)",correct:false},{text: "Romperse",correct:false},{text: "Brillar",correct:false}], explanation: "Deformación plástica." },
      { id_suffix: "v4", difficulty: 2, question: "Ductilidad es:", options: [{text: "Capacidad de formar hilos/alambres",correct:true},{text: "Láminas",correct:false},{text: "Fundirse",correct:false},{text: "Oxidarse",correct:false}], explanation: "Alambre de cobre." },
      { id_suffix: "v5", difficulty: 3, question: "¿Por qué los metales brillan (Lustre)?", options: [{text: "Electrones libres absorben y reemiten luz",correct:true},{text: "Son lisos",correct:false},{text: "Tienen barniz",correct:false},{text: "Son radiactivos",correct:false}], explanation: "Interacción luz-electrones." },
      { id_suffix: "v6", difficulty: 3, question: "Aleación:", options: [{text: "Mezcla homogénea de metales (Solución sólida)",correct:true},{text: "Compuesto químico",correct:false},{text: "Mezcla heterogénea",correct:false},{text: "Elemento nuevo",correct:false}], explanation: "Bronce, Acero." },
      { id_suffix: "v7", difficulty: 4, question: "Modelo de bandas: Conductor tiene:", options: [{text: "Banda de valencia y conducción superpuestas",correct:true},{text: "Gran brecha (Gap)",correct:false},{text: "Banda vacía",correct:false},{text: "Banda llena aislada",correct:false}], explanation: "Física estado sólido." },
      { id_suffix: "v8", difficulty: 4, question: "Mercurio es líquido porque:", options: [{text: "Efectos relativistas debilitan enlace",correct:true},{text: "Es un no metal",correct:false},{text: "Está muy caliente",correct:false},{text: "Tiene pocos electrones",correct:false}], explanation: "Excepción." },
      { id_suffix: "v9", difficulty: 5, question: "¿Qué pasa con la conductividad de un metal al calentar?", options: [{text: "Disminuye (mayor vibración núcleos)",correct:true},{text: "Aumenta",correct:false},{text: "Sigue igual",correct:false},{text: "Se vuelve superconductor",correct:false}], explanation: "Resistencia aumenta." },
      { id_suffix: "v10", difficulty: 5, question: "Superconductor:", options: [{text: "Resistencia cero a baja temperatura",correct:true},{text: "Muy caliente",correct:false},{text: "Aislante perfecto",correct:false},{text: "Semi-metal",correct:false}], explanation: "Efecto cuántico." }
    ]
  },

  // Bundle 4: Oxidation States
  {
    meta: {
      id: "CO-CN-10-chem-ox-state-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "estados-oxidacion",
      periodo: 2,
      dba_id: "DBA-CN-10-2",
      title: "Estados de Oxidación"
    },
    base: { question: "Determina estado oxidación.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Estado de oxidación del Oxígeno en óxidos:", options: [{text: "-2",correct:true},{text: "-1",correct:false},{text: "+2",correct:false},{text: "0",correct:false}], explanation: "Regla general." },
      { id_suffix: "v2", difficulty: 1, question: "Estado de oxidación del Hidrógeno generalmente:", options: [{text: "+1",correct:true},{text: "-1",correct:false},{text: "+2",correct:false},{text: "0",correct:false}], explanation: "Excepto hidruros." },
      { id_suffix: "v3", difficulty: 2, question: "Suma de estados de oxidación en molécula neutra:", options: [{text: "0",correct:true},{text: "1",correct:false},{text: "-1",correct:false},{text: "Carga del ión",correct:false}], explanation: "Neutralidad." },
      { id_suffix: "v4", difficulty: 2, question: "Estado de oxidación de elementos libres (O2, Fe):", options: [{text: "0",correct:true},{text: "1",correct:false},{text: "Su grupo",correct:false},{text: "-2",correct:false}], explanation: "No combinado." },
      { id_suffix: "v5", difficulty: 3, question: "Estado del Azufre en H2SO4:", options: [{text: "+6",correct:true},{text: "+4",correct:false},{text: "-2",correct:false},{text: "+2",correct:false}], explanation: "2(+1) + S + 4(-2) = 0 -> S-6=0." },
      { id_suffix: "v6", difficulty: 3, question: "Estado del Carbono en CO2:", options: [{text: "+4",correct:true},{text: "+2",correct:false},{text: "-4",correct:false},{text: "0",correct:false}], explanation: "C + 2(-2) = 0." },
      { id_suffix: "v7", difficulty: 4, question: "Estado del Manganeso en KMnO4:", options: [{text: "+7",correct:true},{text: "+5",correct:false},{text: "+2",correct:false},{text: "+4",correct:false}], explanation: "1 + Mn + 4(-2) = 0 -> Mn-7=0." },
      { id_suffix: "v8", difficulty: 4, question: "Estado del Oxígeno en H2O2 (Peróxido):", options: [{text: "-1",correct:true},{text: "-2",correct:false},{text: "0",correct:false},{text: "+2",correct:false}], explanation: "Excepción peróxidos." },
      { id_suffix: "v9", difficulty: 5, question: "Estado de oxidación fraccionario (ej: Fe3O4 - Magnetita):", options: [{text: "Posible (mezcla de +2 y +3)",correct:true},{text: "Imposible",correct:false},{text: "Error",correct:false},{text: "Siempre entero",correct:false}], explanation: "FeO + Fe2O3." },
      { id_suffix: "v10", difficulty: 5, question: "Estado oxidación en ion poliatómico SO4^(-2):", options: [{text: "Suma da -2",correct:true},{text: "Suma da 0",correct:false},{text: "Suma da +2",correct:false},{text: "No aplica",correct:false}], explanation: "Igual a la carga." }
    ]
  },

  // Bundle 5: Nomenclature - Oxides
  {
    meta: {
      id: "CO-CN-10-chem-nom-oxides-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "nomenclatura-oxidos",
      periodo: 2,
      dba_id: "DBA-CN-10-2",
      title: "Óxidos Básicos y Ácidos"
    },
    base: { question: "Nombra el óxido.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Óxido Básico se forma por:", options: [{text: "Metal + Oxígeno",correct:true},{text: "No Metal + Oxígeno",correct:false},{text: "Agua + Sal",correct:false},{text: "Ácido + Base",correct:false}], explanation: "Ej: CaO." },
      { id_suffix: "v2", difficulty: 1, question: "Óxido Ácido se forma por:", options: [{text: "No Metal + Oxígeno",correct:true},{text: "Metal + Oxígeno",correct:false},{text: "Metal + Agua",correct:false},{text: "Sal + Agua",correct:false}], explanation: "Ej: CO2." },
      { id_suffix: "v3", difficulty: 2, question: "Nombre stock de Fe2O3 (Hierro +3):", options: [{text: "Óxido de Hierro (III)",correct:true},{text: "Óxido de Hierro (II)",correct:false},{text: "Trióxido de Hierro",correct:false},{text: "Óxido ferroso",correct:false}], explanation: "Valencia en romanos." },
      { id_suffix: "v4", difficulty: 2, question: "Nombre sistemático (IUPAC) de CO2:", options: [{text: "Dióxido de carbono",correct:true},{text: "Óxido de carbono (IV)",correct:false},{text: "Anhídrido carbónico",correct:false},{text: "Monóxido de carbono",correct:false}], explanation: "Prefijos griegos." },
      { id_suffix: "v5", difficulty: 3, question: "Nombre tradicional de SO3 (S=+6, mayor de 3):", options: [{text: "Anhídrido sulfúrico",correct:true},{text: "Anhídrido sulfuroso",correct:false},{text: "Óxido de azufre",correct:false},{text: "Sulfato",correct:false}], explanation: "Ico para mayor." },
      { id_suffix: "v6", difficulty: 3, question: "Nombre tradicional de FeO (Fe=+2, menor de 2):", options: [{text: "Óxido ferroso",correct:true},{text: "Óxido férrico",correct:false},{text: "Óxido de hierro",correct:false},{text: "Monóxido",correct:false}], explanation: "Oso para menor." },
      { id_suffix: "v7", difficulty: 4, question: "Cl2O7 (Cl=+7 máx):", options: [{text: "Anhídrido perclórico",correct:true},{text: "Anhídrido clórico",correct:false},{text: "Dióxido de cloro",correct:false},{text: "Anhídrido hipocloroso",correct:false}], explanation: "Per-ico." },
      { id_suffix: "v8", difficulty: 4, question: "CaO + H2O produce:", options: [{text: "Hidróxido de Calcio (Base)",correct:true},{text: "Ácido",correct:false},{text: "Sal",correct:false},{text: "Gas",correct:false}], explanation: "Óxido básico + agua = Hidróxido." },
      { id_suffix: "v9", difficulty: 5, question: "SO3 + H2O produce:", options: [{text: "Ácido Sulfúrico (H2SO4)",correct:true},{text: "Base",correct:false},{text: "Sal",correct:false},{text: "Oxígeno",correct:false}], explanation: "Óxido ácido + agua = Ácido Oxácido." },
      { id_suffix: "v10", difficulty: 5, question: "Óxidos anfóteros (Al2O3):", options: [{text: "Reaccionan como ácido o base según el medio",correct:true},{text: "No reaccionan",correct:false},{text: "Son neutros",correct:false},{text: "Solo ácidos",correct:false}], explanation: "Dualidad." }
    ]
  },

  // Bundle 6: Nomenclature - Hydroxides and Acids
  {
    meta: {
      id: "CO-CN-10-chem-nom-acids-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "nomenclatura-acidos-bases",
      periodo: 2,
      dba_id: "DBA-CN-10-2",
      title: "Ácidos e Hidróxidos"
    },
    base: { question: "Nombra ácido/base.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Grupo funcional de Hidróxidos (Bases):", options: [{text: "OH- (Hidroxilo)",correct:true},{text: "H+ (Hidronio)",correct:false},{text: "O-2",correct:false},{text: "Cl-",correct:false}], explanation: "Identifica bases." },
      { id_suffix: "v2", difficulty: 1, question: "Ácidos liberan en solución:", options: [{text: "Iones H+",correct:true},{text: "Iones OH-",correct:false},{text: "Sal",correct:false},{text: "Oxígeno",correct:false}], explanation: "Arrhenius." },
      { id_suffix: "v3", difficulty: 2, question: "NaOH se llama:", options: [{text: "Hidróxido de Sodio",correct:true},{text: "Óxido de Sodio",correct:false},{text: "Ácido de Sodio",correct:false},{text: "Sal de Sodio",correct:false}], explanation: "Soda cáustica." },
      { id_suffix: "v4", difficulty: 2, question: "HCl (en agua) se llama:", options: [{text: "Ácido Clorhídrico",correct:true},{text: "Cloruro de Hidrógeno",correct:false},{text: "Ácido clórico",correct:false},{text: "Cloroso",correct:false}], explanation: "Hidrácido." },
      { id_suffix: "v5", difficulty: 3, question: "H2SO4 (S=+6):", options: [{text: "Ácido Sulfúrico",correct:true},{text: "Ácido Sulfuroso",correct:false},{text: "Ácido Hípico",correct:false},{text: "Sulfuro de hidrógeno",correct:false}], explanation: "Oxácido mayor valencia." },
      { id_suffix: "v6", difficulty: 3, question: "HNO3 (N=+5):", options: [{text: "Ácido Nítrico",correct:true},{text: "Ácido Nitroso",correct:false},{text: "Hidróxido nitroso",correct:false},{text: "Nitrato",correct:false}], explanation: "Oxácido." },
      { id_suffix: "v7", difficulty: 4, question: "Diferencia Hidrácido vs Oxácido:", options: [{text: "Hidrácido no tiene O, Oxácido sí tiene O",correct:true},{text: "Hidrácido tiene metal",correct:false},{text: "Son iguales",correct:false},{text: "Oxácido es binario",correct:false}], explanation: "Composición." },
      { id_suffix: "v8", difficulty: 4, question: "Nombre tradicional de Cu(OH)2 (Cu=+2):", options: [{text: "Hidróxido Cúprico",correct:true},{text: "Hidróxido Cuproso",correct:false},{text: "Hidróxido de Cobre (II)",correct:false},{text: "Óxido cúprico",correct:false}], explanation: "Mayor valencia." },
      { id_suffix: "v9", difficulty: 5, question: "H3PO4:", options: [{text: "Ácido Fosfórico (Ortofosfórico)",correct:true},{text: "Ácido Fosforoso",correct:false},{text: "Fosfuro de hidrógeno",correct:false},{text: "Fosfato",correct:false}], explanation: "P=+5." },
      { id_suffix: "v10", difficulty: 5, question: "Lluvia ácida contiene principalmente:", options: [{text: "H2SO4 y HNO3",correct:true},{text: "HCl",correct:false},{text: "Vinagre",correct:false},{text: "NaOH",correct:false}], explanation: "Contaminación SOx NOx." }
    ]
  },

  // Bundle 7: Nomenclature - Salts
  {
    meta: {
      id: "CO-CN-10-chem-nom-salts-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "nomenclatura-sales",
      periodo: 2,
      dba_id: "DBA-CN-10-2",
      title: "Las Sales"
    },
    base: { question: "Nombra la sal.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Una sal neutra se forma por:", options: [{text: "Ácido + Base -> Sal + Agua",correct:true},{text: "Metal + Gas",correct:false},{text: "Dos ácidos",correct:false},{text: "Oxígeno + Agua",correct:false}], explanation: "Neutralización." },
      { id_suffix: "v2", difficulty: 1, question: "NaCl se llama:", options: [{text: "Cloruro de Sodio",correct:true},{text: "Clorato de Sodio",correct:false},{text: "Clorito de Sodio",correct:false},{text: "Hipoclorito",correct:false}], explanation: "Sal haloidea." },
      { id_suffix: "v3", difficulty: 2, question: "Terminación del anión si el ácido termina en 'ICO':", options: [{text: "ATO (Pato)",correct:true},{text: "ITO (Oso)",correct:false},{text: "URO",correct:false},{text: "IDO",correct:false}], explanation: "Regla mnemotécnica." },
      { id_suffix: "v4", difficulty: 2, question: "Terminación del anión si el ácido termina en 'OSO':", options: [{text: "ITO (Oso chiquito)",correct:true},{text: "ATO",correct:false},{text: "URO",correct:false},{text: "ICO",correct:false}], explanation: "Regla." },
      { id_suffix: "v5", difficulty: 3, question: "FeSO4 (Viene de H2SO4, Fe+2):", options: [{text: "Sulfato Ferroso o Sulfato de Hierro (II)",correct:true},{text: "Sulfuro de hierro",correct:false},{text: "Sulfito férrico",correct:false},{text: "Sulfato férrico",correct:false}], explanation: "Ico->Ato, menor valencia." },
      { id_suffix: "v6", difficulty: 3, question: "KNO3 (Viene de HNO3):", options: [{text: "Nitrato de Potasio",correct:true},{text: "Nitrito de Potasio",correct:false},{text: "Nitruro de Potasio",correct:false},{text: "Nitro de Potasio",correct:false}], explanation: "Nítrico -> Nitrato." },
      { id_suffix: "v7", difficulty: 4, question: "Sales haloideas terminan en:", options: [{text: "URO (Cloruro, Sulfuro)",correct:true},{text: "ATO",correct:false},{text: "ITO",correct:false},{text: "ICO",correct:false}], explanation: "Sin oxígeno." },
      { id_suffix: "v8", difficulty: 4, question: "NaClO (Viene de HClO hipocloroso):", options: [{text: "Hipoclorito de Sodio",correct:true},{text: "Cloruro de Sodio",correct:false},{text: "Perclorato de Sodio",correct:false},{text: "Clorato",correct:false}], explanation: "Oso -> Ito." },
      { id_suffix: "v9", difficulty: 5, question: "Sal ácida NaHCO3 (Bicarbonato):", options: [{text: "Carbonato ácido de sodio",correct:true},{text: "Carbonato neutro",correct:false},{text: "Carbono de sodio",correct:false},{text: "Óxido",correct:false}], explanation: "Conserva H." },
      { id_suffix: "v10", difficulty: 5, question: "Alúmina (Alum) sales dobles:", options: [{text: "Tienen dos cationes diferentes",correct:true},{text: "Dos aniones",correct:false},{text: "Son mezclas",correct:false},{text: "No existen",correct:false}], explanation: "KAl(SO4)2." }
    ]
  },

  // Bundle 8: Lewis Structures VSEPR
  {
    meta: {
      id: "CO-CN-10-chem-lewis-vsepr-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "estructuras-lewis",
      periodo: 2,
      dba_id: "DBA-CN-10-2",
      title: "Lewis y Geometría Molecular"
    },
    base: { question: "Determina estructura.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Regla del Octeto:", options: [{text: "Átomos buscan tener 8 e- de valencia",correct:true},{text: "Buscan tener 2",correct:false},{text: "Buscan tener 10",correct:false},{text: "Buscan perder todo",correct:false}], explanation: "Estabilidad gas noble." },
      { id_suffix: "v2", difficulty: 1, question: "Pares libres (no enlazantes):", options: [{text: "Electrones que no forman enlace",correct:true},{text: "Electrones compartidos",correct:false},{text: "Protones",correct:false},{text: "Huecos",correct:false}], explanation: "Definición." },
      { id_suffix: "v3", difficulty: 2, question: "Geometría de CH4 (Metano):", options: [{text: "Tetraédrica (109.5°)",correct:true},{text: "Plana",correct:false},{text: "Lineal",correct:false},{text: "Angular",correct:false}], explanation: "4 pares enlazantes." },
      { id_suffix: "v4", difficulty: 2, question: "Geometría de H2O:", options: [{text: "Angular (debido a 2 pares libres)",correct:true},{text: "Lineal",correct:false},{text: "Tetraédrica perfecta",correct:false},{text: "Plana trigonal",correct:false}], explanation: "Repulsión pares libres." },
      { id_suffix: "v5", difficulty: 3, question: "Geometría de CO2:", options: [{text: "Lineal (180°)",correct:true},{text: "Angular",correct:false},{text: "Tetraédrica",correct:false},{text: "Plana",correct:false}], explanation: "Dobles enlaces, sin pares libres en C." },
      { id_suffix: "v6", difficulty: 3, question: "Teoría RPECV (VSEPR) predice:", options: [{text: "Forma molecular basada en repulsión de electrones",correct:true},{text: "Fuerza enlace",correct:false},{text: "Color",correct:false},{text: "Masa",correct:false}], explanation: "Repulsión Pares Electrónicos Capa Valencia." },
      { id_suffix: "v7", difficulty: 4, question: "Geometría de NH3 (Amoníaco):", options: [{text: "Piramidal trigonal (1 par libre)",correct:true},{text: "Plana trigonal",correct:false},{text: "Tetraédrica",correct:false},{text: "Lineal",correct:false}], explanation: "3 enlaces, 1 par libre." },
      { id_suffix: "v8", difficulty: 4, question: "Ángulo en BF3 (Plana trigonal):", options: [{text: "120°",correct:true},{text: "90°",correct:false},{text: "109.5°",correct:false},{text: "180°",correct:false}], explanation: "Círculo/3." },
      { id_suffix: "v9", difficulty: 5, question: "Hibridación del Carbono en CH4:", options: [{text: "sp3",correct:true},{text: "sp2",correct:false},{text: "sp",correct:false},{text: "d2sp3",correct:false}], explanation: "4 enlaces simples." },
      { id_suffix: "v10", difficulty: 5, question: "Hibridación del Carbono en eteno (C=C):", options: [{text: "sp2 (trigonal)",correct:true},{text: "sp3",correct:false},{text: "sp",correct:false},{text: "puro p",correct:false}], explanation: "Doble enlace." }
    ]
  },

  // Bundle 9: Intermolecular Forces
  {
    meta: {
      id: "CO-CN-10-chem-imf-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "fuerzas-intermoleculares",
      periodo: 2,
      dba_id: "DBA-CN-10-2",
      title: "Fuerzas Intermoleculares"
    },
    base: { question: "Identifica la fuerza.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Fuerza intermolecular más fuerte:", options: [{text: "Puente de Hidrógeno",correct:true},{text: "Dipolo-Dipolo",correct:false},{text: "London (Dispersión)",correct:false},{text: "Covalente (es intra)",correct:false}], explanation: "Entre moléculas." },
      { id_suffix: "v2", difficulty: 1, question: "Puente de Hidrógeno ocurre con H unido a:", options: [{text: "F, O, N (FON)",correct:true},{text: "C, S, P",correct:false},{text: "Cualquier átomo",correct:false},{text: "Metales",correct:false}], explanation: "Muy electronegativos." },
      { id_suffix: "v3", difficulty: 2, question: "Por qué el agua hierve a 100°C (alto para su peso):", options: [{text: "Muchos puentes de hidrógeno",correct:true},{text: "Es covalente",correct:false},{text: "Es iónica",correct:false},{text: "Es pesada",correct:false}], explanation: "Cohesión." },
      { id_suffix: "v4", difficulty: 2, question: "Fuerzas presentes en todas las moléculas (incluso apolares):", options: [{text: "Dispersión de London",correct:true},{text: "Dipolo-Dipolo",correct:false},{text: "Iónicas",correct:false},{text: "Magnéticas",correct:false}], explanation: "Dipolos inducidos temporales." },
      { id_suffix: "v5", difficulty: 3, question: "Fuerza Dipolo-Dipolo ocurre en:", options: [{text: "Moléculas polares",correct:true},{text: "Moléculas apolares",correct:false},{text: "Iones",correct:false},{text: "Metales",correct:false}], explanation: "Polos permanentes." },
      { id_suffix: "v6", difficulty: 3, question: "Orden de fuerza general:", options: [{text: "P. Hidrógeno > Dipolo > London",correct:true},{text: "London > Dipolo > P.H.",correct:false},{text: "Iguales",correct:false},{text: "Ninguna",correct:false}], explanation: "Intensidad." },
      { id_suffix: "v7", difficulty: 4, question: "Viscosidad y tensión superficial dependen de:", options: [{text: "Fuerzas intermoleculares fuertes",correct:true},{text: "Peso atómico",correct:false},{text: "Color",correct:false},{text: "Reactividad",correct:false}], explanation: "Resistencia a separarse." },
      { id_suffix: "v8", difficulty: 4, question: "El hielo flota porque:", options: [{text: "Puentes de H crean estructura abierta (menos densa)",correct:true},{text: "Es más pesado",correct:false},{text: "Tiene aire",correct:false},{text: "Es mágico",correct:false}], explanation: "Expansión al congelar." },
      { id_suffix: "v9", difficulty: 5, question: "Solubilidad 'lo semejante disuelve lo semejante':", options: [{text: "Polar disuelve polar, Apolar disuelve apolar",correct:true},{text: "Todo disuelve todo",correct:false},{text: "Polar disuelve apolar",correct:false},{text: "Nada se disuelve",correct:false}], explanation: "Interacciones compatibles." },
      { id_suffix: "v10", difficulty: 5, question: "¿Por qué el aceite no se mezcla con agua?", options: [{text: "Agua es polar, Aceite apolar (hidrofóbico)",correct:true},{text: "Tienen densidades diferentes",correct:false},{text: "Tienen colores diferentes",correct:false},{text: "El aceite es ácido",correct:false}], explanation: "Fuerzas distintas." }
    ]
  },

  // Bundle 10: Taller Review P2
    {
    meta: {
      id: "CO-CN-10-taller-p2-001",
      country: "co",
      grade: 10,
      subject: "ciencias-naturales",
      topic: "review",
      periodo: 2,
      dba_id: "DBA-CN-10-2",
      title: "Taller Repaso P2"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Enlace NaCl:", options: [{text: "Iónico",correct:true},{text: "Covalente",correct:false},{text: "Metálico",correct:false},{text: "Puente H",correct:false}], explanation: "Metal-No metal." },
      { id_suffix: "v2", difficulty: 1, question: "Enlace O2:", options: [{text: "Covalente Apolar Doble",correct:true},{text: "Iónico",correct:false},{text: "Polar",correct:false},{text: "Metálico",correct:false}], explanation: "Iguales." },
      { id_suffix: "v3", difficulty: 2, question: "Nombre de CO:", options: [{text: "Monóxido de Carbono",correct:true},{text: "Dióxido",correct:false},{text: "Carburo",correct:false},{text: "Carbonato",correct:false}], explanation: "Un oxígeno." },
      { id_suffix: "v4", difficulty: 2, question: "H2SO3 se llama:", options: [{text: "Ácido Sulfuroso",correct:true},{text: "Sulfúrico",correct:false},{text: "Sulfhídrico",correct:false},{text: "Sulfato",correct:false}], explanation: "Menor valencia (+4)." },
      { id_suffix: "v5", difficulty: 3, question: "Estado oxidación Cr en K2Cr2O7 (+6):", options: [{text: "+6",correct:true},{text: "+3",correct:false},{text: "+7",correct:false},{text: "+2",correct:false}], explanation: "2 + 2Cr - 14 = 0." },
      { id_suffix: "v6", difficulty: 3, question: "Geometría agua:", options: [{text: "Angular",correct:true},{text: "Lineal",correct:false},{text: "Plana",correct:false},{text: "Cúbica",correct:false}], explanation: "104.5°." },
      { id_suffix: "v7", difficulty: 4, question: "Fuerza más débil:", options: [{text: "London",correct:true},{text: "Puente H",correct:false},{text: "Iónico",correct:false},{text: "Covalente",correct:false}], explanation: "Dispersión." },
      { id_suffix: "v8", difficulty: 4, question: "Aleación de Cobre y Estaño:", options: [{text: "Bronce",correct:true},{text: "Acero",correct:false},{text: "Latón",correct:false},{text: "Amalgama",correct:false}], explanation: "Metalurgia." },
      { id_suffix: "v9", difficulty: 5, question: "NaOH + HCl -> NaCl + H2O:", options: [{text: "Neutralización",correct:true},{text: "Combustión",correct:false},{text: "Síntesis",correct:false},{text: "Descomposición",correct:false}], explanation: "Sal y agua." },
      { id_suffix: "v10", difficulty: 5, question: "¿Por qué el agua disuelve la sal?", options: [{text: "Hidratación de iones (Solvatación)",correct:true},{text: "Reacción química",correct:false},{text: "Calor",correct:false},{text: "Oxidación",correct:false}], explanation: "Dipolos rodean iones." }
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
search_query: "chemistry questions grade ${meta.grade} ${meta.periodo} ${meta.topic}"
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
    console.log(`✅ Created Period 2 Bundle v3.0: ${fullPath}`);
});
