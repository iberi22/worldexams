/**
 * experimental-surface — gate para features en maduración (Preuniversitario,
 * Revisar/Banco social, Comunidad, Correcciones).
 *
 * Producción (`saberparatodos.space`) oculta estas superficies; cualquier otro
 * host (previews `*.pages.dev`, `*.workers.dev`, localhost, IPs) las muestra
 * para evaluación interna en la rama develop.
 *
 * Default seguro: sin hostname conocido → producción (oculto).
 */

export const PRODUCTION_HOSTS = [
  'saberparatodos.space',
  'www.saberparatodos.space',
] as const;

export function normalizeHostname(hostname: unknown): string {
  if (typeof hostname !== 'string') return '';
  return hostname.trim().toLowerCase().split(':')[0];
}

export function isProductionHostname(hostname: unknown): boolean {
  const host = normalizeHostname(hostname);
  if (!host) return true; // desconocido → tratar como producción (ocultar)
  return (PRODUCTION_HOSTS as readonly string[]).includes(host);
}

/**
 * `true` cuando la superficie experimental debe mostrarse.
 * Acepta hostname explícito (SSR vía `Astro.url.hostname`) o, en cliente,
 * lee `window.location.hostname` si no se pasa argumento.
 */
export function isExperimentalSurface(hostname?: unknown): boolean {
  if (typeof hostname === 'undefined' || hostname === null) {
    if (typeof window !== 'undefined' && window.location?.hostname) {
      return !isProductionHostname(window.location.hostname);
    }
    return false;
  }
  return !isProductionHostname(hostname);
}
