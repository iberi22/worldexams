import type { CountryConfig as RuntimeCountryConfig } from './index';

export type TenantEditorialState = 'full' | 'localized' | 'neutral' | 'disabled';

export type TenantRouteKey =
  | 'home'
  | 'guide'
  | 'preparacion'
  | 'manual'
  | 'terminos'
  | 'privacy'
  | 'notebooklm'
  | 'novedades'
  | 'changelog'
  | 'resultados2025'
  | 'ranking'
  | 'normasMen';

export interface TenantRouteAvailability {
  state: TenantEditorialState;
  badge: string;
  title: string;
  description: string;
}

export interface TenantScoreSemantics {
  estimateHeading: string;
  rangeSuffix: string;
  statusHeading: string;
  methodologySummary: string;
  sessionImpactSummary: string;
  officialNotice: string;
  scaleReferenceLabel: string;
  transparencySummary: string;
  benchmarkSummary: string;
  shareSummary: string;
  emptyHistorySummary: string;
  practiceEstimateLabel: string;
  methodologyVersion: string;
  disclaimer: string;
}

export interface TenantExperience {
  editorialState: TenantEditorialState;
  contentTier: 'co' | 'mx' | 'generic';
  landingBadge: string;
  landingTitle: string;
  landingSubtitle: string;
  landingDescription: string;
  questionBankLabel: string;
  subjectLabel: string;
  freeAccessLabel: string;
  gradeSectionTitle: string;
  guideShortcutLabel: string;
  guideShortcutDescription: string;
  loadingLabel: string;
  dontShowHeroLabel: string;
  jsRequiredNotice: string;
  indexSeoTitle: string;
  indexSeoDescription: string;
  indexSeoKeywords: string;
  landingHeroTitle: string;
  rankingTitle: string;
  rankingDescription: string;
  resultsTitle: string;
  resultsDescription: string;
  resultsInterpretHeading: string;
  resultsInterpretDescription: string;
  resultsFacts: { value: string; label: string; note: string }[];
  officialGuideLinks: { label: string; href: string }[];
  routeAvailability: Record<TenantRouteKey, TenantRouteAvailability>;
  scoreSemantics: TenantScoreSemantics;
}

function isColombia(code: string): boolean {
  return code.toUpperCase() === 'CO';
}

function isMexico(code: string): boolean {
  return code.toUpperCase() === 'MX';
}

function makeRouteAvailability(
  state: TenantEditorialState,
  badge: string,
  title: string,
  description: string
): TenantRouteAvailability {
  return { state, badge, title, description };
}

function buildDefaultRouteAvailability(country: RuntimeCountryConfig): Record<TenantRouteKey, TenantRouteAvailability> {
  const countryName = country.name;
  const examName = country.examName;

  const coOnlyRoute = (
    title: string,
    description: string
  ): TenantRouteAvailability =>
    makeRouteAvailability(
      isColombia(country.code) ? 'full' : 'disabled',
      isColombia(country.code) ? 'Disponible' : 'Solo Colombia',
      title,
      description
    );

  const localizedLegal = (title: string, description: string): TenantRouteAvailability =>
    makeRouteAvailability(
      isColombia(country.code) ? 'full' : isMexico(country.code) ? 'localized' : 'neutral',
      isColombia(country.code) ? 'Operativo' : isMexico(country.code) ? 'Localizado' : 'Neutral',
      title,
      description
    );

  return {
    home: makeRouteAvailability('full', 'Activa', `Inicio ${countryName}`, `Portada principal y acceso a practica para ${examName}.`),
    guide: makeRouteAvailability(
      isColombia(country.code) ? 'full' : isMexico(country.code) ? 'localized' : 'neutral',
      isColombia(country.code) ? 'Completa' : isMexico(country.code) ? 'Localizada' : 'Neutral',
      `Guia ${examName}`,
      `Estructura, autoridad y ruta de preparacion visible para ${countryName}.`
    ),
    preparacion: makeRouteAvailability(
      isColombia(country.code) ? 'full' : isMexico(country.code) ? 'localized' : 'neutral',
      isColombia(country.code) ? 'Completa' : isMexico(country.code) ? 'Localizada' : 'Neutral',
      `Preparacion ${examName}`,
      isColombia(country.code)
        ? 'Incluye flujo detallado de inscripcion y recomendacion de uso del producto.'
        : isMexico(country.code)
          ? 'Resume la ruta de postulacion y practica para EXANI-II sin mezclar contenido colombiano.'
          : `Mantiene una orientacion general para ${countryName} sin prometer una convocatoria oficial no validada.`
    ),
    manual: localizedLegal(
      `Manual de ${country.product.siteName}`,
      `Manual operativo visible para ${countryName} con copy del tenant activo.`
    ),
    terminos: localizedLegal(
      `Terminos de ${country.product.siteName}`,
      `Terminos y exencion educativa alineados a ${countryName} y ${country.examAuthority}.`
    ),
    privacy: localizedLegal(
      `Privacidad de ${country.product.siteName}`,
      `Politica de privacidad y tratamiento de datos con branding del tenant activo.`
    ),
    notebooklm: makeRouteAvailability(
      isColombia(country.code) ? 'full' : isMexico(country.code) ? 'localized' : 'neutral',
      isColombia(country.code) ? 'Operativa' : isMexico(country.code) ? 'Adaptada' : 'Neutral',
      `Base NotebookLM ${examName}`,
      isColombia(country.code)
        ? 'Fuente detallada para cuadernos de estudio de Saber.'
        : isMexico(country.code)
          ? 'Fuente editorial adaptada para EXANI-II y CENEVAL.'
          : `Fuente neutra de estudio para ${countryName} mientras se completa la localizacion documental.`
    ),
    novedades: makeRouteAvailability(
      isColombia(country.code) ? 'full' : 'neutral',
      isColombia(country.code) ? 'Visible' : 'Neutral',
      'Novedades del producto',
      isColombia(country.code)
        ? 'Publicaciones completas del producto activo.'
        : `Centro neutral de novedades para ${countryName}; no replica changelogs Colombia-first.`
    ),
    changelog: makeRouteAvailability(
      isColombia(country.code) ? 'full' : 'neutral',
      isColombia(country.code) ? 'Visible' : 'Neutral',
      'Historial de versiones',
      isColombia(country.code)
        ? 'Timeline completo de releases.'
        : `Timeline resumido sin exponer hitos editoriales exclusivos de Colombia a ${countryName}.`
    ),
    resultados2025: coOnlyRoute(
      'Resultados 2025',
      'Interpretacion de resultados y estadisticas editoriales reservadas al tenant Colombia.'
    ),
    ranking: coOnlyRoute(
      'Ranking nacional',
      'Ranking y hall of fame disponibles solo para el flujo Colombia mientras no existan datasets locales equivalentes.'
    ),
    normasMen: coOnlyRoute(
      'Normas MEN',
      'Base normativa del MEN e ICFES reservada a Colombia.'
    ),
  };
}

function buildScoreSemantics(country: RuntimeCountryConfig): TenantScoreSemantics {
  if (isColombia(country.code)) {
    return {
      estimateHeading: 'Puntaje estimado ICFES',
      rangeSuffix: '/500',
      statusHeading: 'Estado de esta estimacion',
      methodologySummary:
        'Esta lectura usa una metodologia proxy en escala ICFES 0-500. Combina rendimiento, dificultad, consistencia y volumen de evidencia. El puntaje de practica se conserva aparte para ranking interno.',
      sessionImpactSummary: 'Estas metricas ayudan a calcular tu estimado ICFES.',
      officialNotice: 'Esta estimacion no es un puntaje ICFES oficial.',
      scaleReferenceLabel: 'ICFES proxy',
      transparencySummary:
        'Hemos alineado el sistema de nivel (MMR) a la escala ICFES 0-500. El puntaje de sesion es solo una metrica de apoyo para el calculo del progreso.',
      benchmarkSummary: 'benchmark editorial',
      shareSummary: 'metodo proxy, no oficial ICFES',
      emptyHistorySummary: 'tu ultimo puntaje, tu estimado proxy y la distancia hacia la meta',
      practiceEstimateLabel: 'estimado ICFES',
      methodologyVersion: 'co-practice-icfes-v1',
      disclaimer: 'Estimacion de practica; no reemplaza el reporte oficial del ICFES.',
    };
  }

  if (isMexico(country.code)) {
    return {
      estimateHeading: 'Estimacion de practica EXANI-II',
      rangeSuffix: '/500 interna',
      statusHeading: 'Estado de la estimacion local',
      methodologySummary:
        'Esta lectura usa una escala interna de practica para resumir rendimiento, dificultad, consistencia y volumen de evidencia. No replica la metodologia oficial de CENEVAL y el puntaje de sesion se conserva aparte.',
      sessionImpactSummary: 'Estas metricas alimentan tu estimacion de practica para EXANI-II.',
      officialNotice: 'Esta estimacion no reemplaza el resultado oficial de CENEVAL.',
      scaleReferenceLabel: 'escala interna de practica',
      transparencySummary:
        'El sistema de nivel (MMR) se proyecta sobre una escala interna 0-500 para seguir tu progreso sin prometer equivalencia directa con el resultado oficial.',
      benchmarkSummary: 'referencia editorial local',
      shareSummary: 'escala interna de practica, no oficial CENEVAL',
      emptyHistorySummary: 'tu ultimo puntaje, tu estimacion local y la distancia hacia tu meta editorial',
      practiceEstimateLabel: 'estimacion de practica',
      methodologyVersion: 'mx-practice-exani-v1',
      disclaimer: 'Estimacion de practica; no reemplaza el resultado oficial de CENEVAL.',
    };
  }

  return {
    estimateHeading: `Estimacion de practica ${country.examName}`,
    rangeSuffix: '/500 interna',
    statusHeading: 'Estado de la estimacion local',
    methodologySummary:
      `Esta lectura usa una escala interna de practica para ${country.name}. Resume rendimiento, dificultad, consistencia y evidencia acumulada sin replicar la metodologia oficial de ${country.examAuthority}.`,
    sessionImpactSummary: `Estas metricas alimentan tu estimacion de practica para ${country.examName}.`,
    officialNotice: `Esta estimacion no reemplaza un resultado oficial de ${country.examAuthority}.`,
    scaleReferenceLabel: 'escala interna de practica',
    transparencySummary:
      `El sistema de nivel (MMR) usa una escala interna 0-500 para seguir progreso local en ${country.name}.`,
    benchmarkSummary: 'referencia editorial local',
    shareSummary: `escala interna de practica, no oficial ${country.examAuthority}`,
    emptyHistorySummary: 'tu ultimo puntaje, tu estimacion local y la distancia hacia la meta editorial',
    practiceEstimateLabel: 'estimacion de practica',
    methodologyVersion: `${country.code.toLowerCase()}-practice-local-v1`,
    disclaimer: `Estimacion de practica; no reemplaza un resultado oficial de ${country.examAuthority}.`,
  };
}

export function getTenantExperience(country: RuntimeCountryConfig): TenantExperience {
  const contentTier = isColombia(country.code) ? 'co' : isMexico(country.code) ? 'mx' : 'generic';
  const editorialState: TenantEditorialState =
    contentTier === 'co' ? 'full' : contentTier === 'mx' ? 'localized' : 'neutral';

  return {
    editorialState,
    contentTier,
    landingBadge: contentTier === 'co' ? 'Beta abierta' : contentTier === 'mx' ? 'Edicion Mexico' : `Edicion ${country.name}`,
    landingTitle: contentTier === 'co' ? 'Saber Para Todos' : country.product.siteName,
    landingSubtitle:
      contentTier === 'co'
        ? 'Interfaz preparatoria avanzada para pruebas estandarizadas.'
        : contentTier === 'mx'
          ? 'Practica modular para admision universitaria y diagnostico por areas.'
          : `Plataforma de practica multi-pais con localizacion editorial para ${country.name}.`,
    landingDescription:
      contentTier === 'co'
        ? 'Entorno minimalista optimizado para enfoque y eficiencia.'
        : contentTier === 'mx'
          ? 'Entrena por areas, crea simulacros y sigue una ruta de practica sin mezclar contenido de otros paises.'
          : `Practica por areas, sigue tu progreso y usa una experiencia neutral mientras completamos la localizacion oficial de ${country.name}.`,
    questionBankLabel:
      contentTier === 'co' ? '4000+ preguntas' : contentTier === 'mx' ? 'Banco EXANI en expansion' : 'Banco local en expansion',
    subjectLabel: `${country.subjects.length} areas`,
    freeAccessLabel: '100% gratis',
    gradeSectionTitle:
      contentTier === 'co'
        ? 'Examenes tipo saber'
        : contentTier === 'mx'
          ? 'Rutas por nivel y area'
          : `Rutas de practica para ${country.name}`,
    guideShortcutLabel:
      contentTier === 'co'
        ? 'Volver a la Guia Principal'
        : `Volver a la guia de ${country.examName}`,
    guideShortcutDescription:
      contentTier === 'co'
        ? 'Conoce la estructura del examen y tips de estudio'
        : `Conoce la estructura visible de ${country.examName} y la ruta editorial activa para ${country.name}.`,
    loadingLabel: 'Iniciando plataforma',
    dontShowHeroLabel: 'No volver a mostrar',
    jsRequiredNotice:
      'Esta aplicacion requiere JavaScript para funcionar. Por favor, activalo en tu navegador para realizar tus simulacros.',
    indexSeoTitle:
      contentTier === 'co'
        ? `Zona de Practica ICFES | ${country.product.siteName}`
        : `Zona de Practica ${country.examName} | ${country.product.siteName}`,
    indexSeoDescription:
      contentTier === 'co'
        ? `Accede a la app de practica de ${country.product.siteName} para crear simulacros, entrenar por areas y revisar resultados para Saber 11.`
        : `Accede a la app de practica de ${country.product.siteName} para crear simulacros, entrenar por areas y revisar resultados para ${country.examFullName}.`,
    indexSeoKeywords:
      contentTier === 'co'
        ? `simulacro saber 11, preguntas icfes, ${country.examAuthority.toLowerCase()}, ${country.name.toLowerCase()}`
        : `practicar examenes, simulacros gratis, preguntas ${country.examName.toLowerCase()}, ${country.examAuthority.toLowerCase()}, ${country.name.toLowerCase()}`,
    landingHeroTitle:
      contentTier === 'co'
        ? `Domina el ICFES`
        : `Domina ${country.examName}`,
    rankingTitle:
      contentTier === 'co' ? 'Ranking Colombia' : `Ranking ${country.name}`,
    rankingDescription:
      contentTier === 'co'
        ? 'Los mejores estudiantes practicando para Saber 3°, 5°, 9° y 11°.'
        : `Los mejores estudiantes practicando para rutas activas de ${country.examName}.`,
    resultsTitle: `Resultados ${country.product.guideYear - 1} | ${country.product.siteName}`,
    resultsDescription: `Lectura editorial de resultados para ${country.examName}.`,
    resultsInterpretHeading:
      contentTier === 'co'
        ? 'Como interpretar tus resultados'
        : `Como interpretar tus resultados de ${country.examName}`,
    resultsInterpretDescription:
      contentTier === 'co'
        ? 'Comprende como se distribuyen los puntajes a nivel nacional y que significa cada percentil con base en estadisticas oficiales de referencia.'
        : `Comprende como se distribuyen los puntajes y que significa cada percentil para ${country.examName}.`,
    resultsFacts:
      contentTier === 'co'
        ? [
            {
              value: '5',
              label: 'Pruebas calificables',
              note: 'Lectura Critica, Matematicas, Sociales y Ciudadanas, Ciencias Naturales e Ingles.',
            },
            {
              value: '230',
              label: 'Preguntas calificables',
              note: `Cuadernillo estandar de ${country.examName} 11.`,
            },
            {
              value: '278',
              label: 'Total con cuestionario',
              note: 'Incluye 48 preguntas del cuestionario socioeconomico.',
            },
            {
              value: '2 x 4h30',
              label: 'Duracion oficial',
              note: 'Dos sesiones de 4 horas y 30 minutos.',
            },
          ]
        : [
            {
              value: String(country.subjects.length),
              label: 'Areas evaluadas',
              note: country.subjects.map((s) => s.name).join(', '),
            },
            {
              value: 'Variable',
              label: 'Preguntas',
              note: `Estructura oficial de ${country.examName}.`,
            },
            {
              value: 'Oficial',
              label: 'Duracion',
              note: `Segun convocatoria de ${country.examAuthority}.`,
            },
          ],
    officialGuideLinks:
      contentTier === 'co'
        ? [
            {
              label: 'Analisis de datos Saber 11',
              href: 'https://www.icfes.gov.co/analisis-de-datos/',
            },
            {
              label: 'Marco metodologico',
              href: 'https://www.icfes.gov.co/wp-content/uploads/2025/05/marco-metodologico-de-la-operacion-estadistica.pdf',
            },
            {
              label: 'Ficha metodologica',
              href: 'https://www.icfes.gov.co/wp-content/uploads/2024/11/FICHA_METODOLOGICA_OE.pdf',
            },
            {
              label: 'Guia de interpretacion',
              href: 'https://www.icfes.gov.co/wp-content/uploads/2024/11/Guia-de-interpretacion-de-resultados-02052022.pdf',
            },
          ]
        : [
            {
              label: `Sitio oficial ${country.examAuthority}`,
              href: '#',
            },
          ],
    routeAvailability: buildDefaultRouteAvailability(country),
    scoreSemantics: buildScoreSemantics(country),
  };
}

export function getTenantRouteAvailability(
  country: RuntimeCountryConfig,
  route: TenantRouteKey
): TenantRouteAvailability {
  return getTenantExperience(country).routeAvailability[route];
}

export function isTenantRouteEnabled(
  country: RuntimeCountryConfig,
  route: TenantRouteKey
): boolean {
  return getTenantRouteAvailability(country, route).state !== 'disabled';
}
