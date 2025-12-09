/**
 * web-vitals.ts
 *
 * Utilidad para medir y reportar Core Web Vitals
 * Compatible con Google Analytics y consola de desarrollo
 *
 * Métricas medidas:
 * - LCP (Largest Contentful Paint): < 2.5s bueno, < 4s mejorable
 * - FID (First Input Delay): < 100ms bueno, < 300ms mejorable
 * - CLS (Cumulative Layout Shift): < 0.1 bueno, < 0.25 mejorable
 * - INP (Interaction to Next Paint): < 200ms bueno, < 500ms mejorable
 * - TTFB (Time to First Byte): < 800ms bueno
 * - FCP (First Contentful Paint): < 1.8s bueno
 */

interface WebVitalMetric {
  name: 'LCP' | 'FID' | 'CLS' | 'INP' | 'TTFB' | 'FCP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
  id: string;
}

type ReportHandler = (metric: WebVitalMetric) => void;

// Thresholds según Google
const thresholds = {
  LCP: [2500, 4000],
  FID: [100, 300],
  CLS: [0.1, 0.25],
  INP: [200, 500],
  TTFB: [800, 1800],
  FCP: [1800, 3000],
};

function getRating(name: WebVitalMetric['name'], value: number): WebVitalMetric['rating'] {
  const [good, poor] = thresholds[name];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

function generateId(): string {
  return `v1-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Mide Largest Contentful Paint (LCP)
 */
export function measureLCP(onReport: ReportHandler): void {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as PerformanceLCPEntry;

    const value = lastEntry.startTime;

    onReport({
      name: 'LCP',
      value,
      rating: getRating('LCP', value),
      delta: value,
      entries,
      id: generateId(),
    });
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });
}

interface PerformanceLCPEntry extends PerformanceEntry {
  startTime: number;
}

/**
 * Mide First Input Delay (FID)
 */
export function measureFID(onReport: ReportHandler): void {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const firstEntry = entries[0] as PerformanceEventTiming;

    const value = firstEntry.processingStart - firstEntry.startTime;

    onReport({
      name: 'FID',
      value,
      rating: getRating('FID', value),
      delta: value,
      entries,
      id: generateId(),
    });
  });

  observer.observe({ type: 'first-input', buffered: true });
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  interactionId?: number;
}

/**
 * Mide Cumulative Layout Shift (CLS)
 */
export function measureCLS(onReport: ReportHandler): void {
  if (!('PerformanceObserver' in window)) return;

  let clsValue = 0;
  let clsEntries: PerformanceEntry[] = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as LayoutShiftEntry[]) {
      // Solo contar shifts sin input reciente del usuario
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);
      }
    }

    onReport({
      name: 'CLS',
      value: clsValue,
      rating: getRating('CLS', clsValue),
      delta: clsValue,
      entries: clsEntries,
      id: generateId(),
    });
  });

  observer.observe({ type: 'layout-shift', buffered: true });
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

/**
 * Mide Interaction to Next Paint (INP)
 */
export function measureINP(onReport: ReportHandler): void {
  if (!('PerformanceObserver' in window)) return;

  const interactions: number[] = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries() as PerformanceEventTiming[]) {
      if (entry.interactionId) {
        const duration = entry.processingEnd - entry.startTime;
        interactions.push(duration);
      }
    }

    if (interactions.length > 0) {
      // INP es aproximadamente el P98 de todas las interacciones
      interactions.sort((a, b) => b - a);
      const idx = Math.min(interactions.length - 1, Math.floor(interactions.length * 0.98));
      const value = interactions[idx];

      onReport({
        name: 'INP',
        value,
        rating: getRating('INP', value),
        delta: value,
        entries: list.getEntries(),
        id: generateId(),
      });
    }
  });

  observer.observe({ type: 'event', buffered: true });
}

/**
 * Mide Time to First Byte (TTFB)
 */
export function measureTTFB(onReport: ReportHandler): void {
  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  if (navEntry) {
    const value = navEntry.responseStart - navEntry.requestStart;

    onReport({
      name: 'TTFB',
      value,
      rating: getRating('TTFB', value),
      delta: value,
      entries: [navEntry],
      id: generateId(),
    });
  }
}

/**
 * Mide First Contentful Paint (FCP)
 */
export function measureFCP(onReport: ReportHandler): void {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const fcpEntry = entries.find(e => e.name === 'first-contentful-paint');

    if (fcpEntry) {
      const value = fcpEntry.startTime;

      onReport({
        name: 'FCP',
        value,
        rating: getRating('FCP', value),
        delta: value,
        entries: [fcpEntry],
        id: generateId(),
      });

      observer.disconnect();
    }
  });

  observer.observe({ type: 'paint', buffered: true });
}

/**
 * Inicializa todas las mediciones de Web Vitals
 */
export function initWebVitals(onReport?: ReportHandler): void {
  const defaultHandler: ReportHandler = (metric) => {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    const color = metric.rating === 'good' ? '#22c55e' : metric.rating === 'needs-improvement' ? '#eab308' : '#ef4444';

    console.log(
      `%c${emoji} ${metric.name}: ${metric.value.toFixed(metric.name === 'CLS' ? 3 : 0)}${metric.name === 'CLS' ? '' : 'ms'}`,
      `color: ${color}; font-weight: bold;`
    );
  };

  const handler = onReport || defaultHandler;

  measureLCP(handler);
  measureFID(handler);
  measureCLS(handler);
  measureINP(handler);
  measureTTFB(handler);
  measureFCP(handler);
}

/**
 * Reporta a Google Analytics 4
 */
export function sendToGA4(metric: WebVitalMetric): void {
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.rating,
      non_interaction: true,
    });
  }
}

declare function gtag(...args: unknown[]): void;
