/**
 * i18n mínimo para rutas /preguntas/ y dashboard de analítica (#1023, #1035).
 * Catálogo en español (idioma por defecto de la plataforma) con fallback a
 * claves y soporte para portugués (Brasil).
 *
 * NOTA: Los componentes de Wave-Gov (salon-*) re-exportan desde
 * '../../../src/lib/i18n' (raíz de apps/worldexams) — ambos coexisten sin colisión.
 */
export type I18nLang = 'es' | 'pt';

type Catalog = Record<string, string>;

const es: Catalog = {
  'preguntas.title': 'Bancos de Preguntas por País, Grado y Materia',
  'preguntas.description': 'Explora bundles de preguntas alineados a los exámenes nacionales.',
  'preguntas.search.placeholder': 'Buscar por tema (ej: numeros-enteros)',
  'preguntas.search.country': 'País',
  'preguntas.search.grade': 'Grado',
  'preguntas.search.subject': 'Materia',
  'preguntas.search.topic': 'Tema',
  'preguntas.search.submit': 'Buscar',
  'preguntas.search.all': 'Todos',
  'preguntas.bundles': 'bundles',
  'preguntas.questions': 'preguntas',
  'preguntas.week': 'Semana',
  'preguntas.grade': 'Grado',
  'preguntas.subject': 'Materia',
  'preguntas.country': 'País',
  'preguntas.breadcrumb.home': 'Inicio',
  'preguntas.breadcrumb.preguntas': 'Preguntas',
  'preguntas.empty': 'No hay bundles disponibles para esta selección todavía.',
  'preguntas.page': 'Página',
  'preguntas.prev': 'Anterior',
  'preguntas.next': 'Siguiente',
  'preguntas.of': 'de',
  'preguntas.viewBundle': 'Ver bundle',
  'preguntas.practice': 'Practicar este bundle',
  'preguntas.results': 'resultados',
  'preguntas.noResults': 'Sin resultados para la búsqueda.',
  'analytics.title': 'Analítica de Uso de Preguntas',
  'analytics.description': 'Uso, tasa de acierto y tiempo promedio por pregunta y bundle.',
  'analytics.topUsed': 'Top 10 preguntas más usadas (últimos 30 días)',
  'analytics.topMissed': 'Top 10 con peor tasa de acierto (candidatas a revisión)',
  'analytics.heatmap': 'Mapa de calor: país × grado',
  'analytics.bundleTable': 'Rendimiento por bundle',
  'analytics.noData': 'No hay datos suficientes',
  'analytics.uses': 'Usos',
  'analytics.accuracy': 'Tasa de acierto',
  'analytics.avgTime': 'Tiempo promedio',
  'analytics.country': 'País',
  'analytics.grade': 'Grado',
  'analytics.bundle': 'Bundle',
  'analytics.drilldown': 'Ver bundles de este país y grado',
  'analytics.syntheticNote': 'Datos sintéticos de demostración — no miden uso real de estudiantes.',
  'analytics.aria.topUsedChart': 'Gráfico de barras con las diez preguntas más usadas en los últimos 30 días.',
  'analytics.aria.heatmap': 'Tabla de mapa de calor con usos por país y grado.',
  'analytics.questionsUsed': 'preguntas con uso registrado',
  'analytics.bundlesTracked': 'bundles analizados',
  'onboarding.title': 'Bienvenida a SaberParaTodos',
  'onboarding.skip': 'Saltar',
  'onboarding.prev': 'Anterior',
  'onboarding.next': 'Siguiente',
  'onboarding.start': 'Empezar',
  'onboarding.step1.title': 'Modo invitado sin cuenta',
  'onboarding.step1.body': 'La plataforma funciona sin registro ni cuentas en la nube. Puedes practicar directamente como invitado sin ceder datos personales.',
  'onboarding.step2.title': 'Progreso local en tu navegador',
  'onboarding.step2.body': 'Tus resultados y simulacros se guardan exclusivamente en el almacenamiento local de este dispositivo. No hay servidores de sincronización en la nube.',
  'onboarding.step3.title': 'Resultados de simulacros cifrados',
  'onboarding.step3.body': 'Los resultados de tus simulacros se guardan cifrados en este navegador.',
  'onboarding.step4.title': 'IA y práctica offline',
  'onboarding.step4.body': 'Algunas funciones de IA pueden correr en tu dispositivo si es compatible; las preguntas ya abiertas quedan disponibles sin conexión.',
  'onboarding.step5.title': 'Control total en tu dispositivo',
  'onboarding.step5.body': 'Tus datos pertenecen a este navegador. Si borras los datos del sitio, tu historial se elimina; no se transfiere a otro dispositivo.',
};

const pt: Catalog = {
  'preguntas.title': 'Bancos de Questões por País, Série e Matéria',
  'preguntas.search.placeholder': 'Buscar por tema (ex: numeros-enteros)',
  'preguntas.bundles': 'packs',
  'preguntas.questions': 'questões',
  'preguntas.empty': 'Ainda não há packs disponíveis para esta seleção.',
  'analytics.title': 'Analítica de Uso das Questões',
  'analytics.noData': 'Não há dados suficientes',
  'onboarding.title': 'Bem-vindo ao SaberParaTodos',
  'onboarding.skip': 'Pular',
  'onboarding.prev': 'Anterior',
  'onboarding.next': 'Próximo',
  'onboarding.start': 'Começar',
  'onboarding.step1.title': 'Modo convidado sem conta',
  'onboarding.step1.body': 'A plataforma funciona sem cadastro e sem contas na nuvem. Você pode praticar diretamente como convidado sem fornecer dados pessoais.',
  'onboarding.step2.title': 'Progresso local no seu navegador',
  'onboarding.step2.body': 'Seus resultados e simulados são salvos exclusivamente no armazenamento local deste dispositivo. Não há sincronização na nuvem.',
  'onboarding.step3.title': 'Resultados de simulados criptografados',
  'onboarding.step3.body': 'Os resultados dos seus simulados são salvos criptografados neste navegador.',
  'onboarding.step4.title': 'IA e prática offline',
  'onboarding.step4.body': 'Algumas funções de IA podem rodar no seu dispositivo, se for compatível; as questões já abertas ficam disponíveis sem conexão.',
  'onboarding.step5.title': 'Controle total no seu dispositivo',
  'onboarding.step5.body': 'Seus dados pertencem a este navegador. Se apagar os dados do site, seu histórico é excluído; não é transferido para outro dispositivo.',
};

const catalogs: Record<I18nLang, Catalog> = { es, pt };

export function normalizeLang(value?: string): I18nLang {
  if (value && value.toLowerCase().startsWith('pt')) return 'pt';
  return 'es';
}

export function t(key: string, lang: I18nLang = 'es', vars?: Record<string, string | number>): string {
  let text = catalogs[lang]?.[key] ?? catalogs.es[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return text;
}