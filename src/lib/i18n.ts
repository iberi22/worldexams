/**
 * i18n minimo para governance de salones (Wave-Gov #1162-#1174).
 * Soporte exigido: es-CO y es-MX (fallback es-CO).
 */

export type SalonLocale = 'es-CO' | 'es-MX';

export const SUPPORTED_LOCALES: readonly SalonLocale[] = ['es-CO', 'es-MX'];

type Dict = Record<string, string>;

const ES_CO: Dict = {
  'salon.pin.title': 'Clave de acceso del salon',
  'salon.pin.placeholder': '6 digitos',
  'salon.pin.join': 'Entrar al salon',
  'salon.pin.cancel': 'Cancelar',
  'salon.pin.invalid': 'Clave incorrecta. Intentos restantes: {n}',
  'salon.pin.locked': 'Demasiados intentos. Vuelve a intentar en {s} segundos.',
  'salon.kick.button': 'Expulsar',
  'salon.kick.confirm': 'Expulsar a este participante del salon',
  'salon.timeout.remaining': 'Bloqueo temporal: {s} segundos restantes',
  'salon.privacy.label': 'Privacidad de resultados',
  'salon.privacy.public': 'Publico',
  'salon.privacy.anon': 'Anonimo',
  'salon.privacy.private': 'Privado',
  'salon.student.title': 'Mis resultados',
  'salon.student.hidden': 'Oculto por privacidad',
  'salon.student.rank': 'Posicion {rank} de {total}',
  'salon.audit.title': 'Bitacora anti-fraude',
  'salon.audit.light.green': 'Verde',
  'salon.audit.light.yellow': 'Amarillo',
  'salon.audit.light.red': 'Rojo',
  'salon.export.button': 'Exportar calificaciones (CSV)',
  'salon.export.empty': 'Aun no hay resultados para exportar',
  'salon.report.button': 'Generar informe (Markdown)',
  'salon.report.title': 'Informe pedagogico del salon',
  'salon.report.section.summary': 'Resumen general',
  'salon.report.section.questions': 'Desempeno por pregunta',
  'salon.report.section.alerts': 'Alertas de integridad',
  'salon.report.date': 'Fecha de emision',
};

const ES_MX: Dict = {
  'salon.pin.title': 'Clave de acceso del salon',
  'salon.pin.join': 'Ingresar al salon',
  'salon.pin.invalid': 'Clave incorrecta. Intentos restantes: {n}',
  'salon.student.title': 'Mis resultados',
  'salon.export.button': 'Exportar calificaciones (CSV)',
  'salon.report.title': 'Informe pedagogico del salon',
};

export function isSalonLocale(value: unknown): value is SalonLocale {
  return value === 'es-CO' || value === 'es-MX';
}

/** Traduce una clave con interpolacion simple {token}. */
export function t(key: string, locale: SalonLocale = 'es-CO', vars?: Record<string, string | number>): string {
  const raw = (locale === 'es-MX' ? ES_MX[key] : undefined) ?? ES_CO[key] ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`));
}

/** Fecha local formateada para el locale del salon (no ISO UTC). */
export function formatLocalDate(date: Date, locale: SalonLocale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);
}
