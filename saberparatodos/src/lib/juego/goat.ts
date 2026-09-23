import type { HallEntry } from './olimpiada';

const HALL_KEY = 'wx-juego-hall-v1';

export function leerHall(): HallEntry[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HALL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function coronar(entry: HallEntry): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const current = leerHall();
    current.unshift(entry);
    localStorage.setItem(HALL_KEY, JSON.stringify(current.slice(0, 50)));
  } catch {
    // Ignore storage errors
  }
}
