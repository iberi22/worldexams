/**
 * i18n mínimo para rutas /preguntas/ y dashboard de analítica (#1023, #1035).
 * Catálogo en español (idioma por defecto de la plataforma) con fallback a
 * claves y soporte para portugués (Brasil).
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
};

const pt: Catalog = {
  'preguntas.title': 'Bancos de Questões por País, Série e Matéria',
  'preguntas.search.placeholder': 'Buscar por tema (ex: numeros-enteros)',
  'preguntas.bundles': 'packs',
  'preguntas.questions': 'questões',
  'preguntas.empty': 'Ainda não há packs disponíveis para esta seleção.',
  'analytics.title': 'Analítica de Uso das Questões',
  'analytics.noData': 'Não há dados suficientes',
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
