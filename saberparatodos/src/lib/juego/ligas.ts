export const LIGA_SIZE = 30;
export const ASCIENDEN = 5;
export const DESCIENDEN = 5;

export interface LigaEntry {
  alias: string;
  xp: number;
  esJugador: boolean;
  puesto: number;
}

export interface Liga {
  id: string;
  tier: string;
  weekKey: string;
  entries: LigaEntry[];
  puestoJugador: number;
  movimiento: 'ascenso' | 'descenso' | 'permanencia';
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

export function getTier(xpWeekly: number): string {
  if (xpWeekly >= 10000) return 'Maestro';
  if (xpWeekly >= 5000) return 'Diamante';
  if (xpWeekly >= 2500) return 'Platino';
  if (xpWeekly >= 1200) return 'Oro';
  if (xpWeekly >= 500) return 'Plata';
  return 'Bronce';
}

export function getWeekKey(d = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

export function ligaIdFor(weekKey: string, tier: string, nodeHash: string): string {
  return `liga-${weekKey}-${tier.toLowerCase()}-${nodeHash.slice(0, 8)}`;
}

export function buildLiga(
  xpWeekly: number,
  weekKey = getWeekKey(),
  nodeHash = 'swal-node-local'
): Liga {
  const tier = getTier(xpWeekly);
  const seed = stringHash(`${weekKey}:${tier}:${nodeHash}`);
  const rng = mulberry32(seed);

  let baseMin = 100;
  let baseMax = 1000;
  if (tier === 'Plata') {
    baseMin = 500;
    baseMax = 1500;
  } else if (tier === 'Oro') {
    baseMin = 1200;
    baseMax = 2800;
  } else if (tier === 'Platino') {
    baseMin = 2500;
    baseMax = 6000;
  } else if (tier === 'Diamante') {
    baseMin = 5000;
    baseMax = 12000;
  } else if (tier === 'Maestro') {
    baseMin = 10000;
    baseMax = 25000;
  }

  const entriesRaw: Omit<LigaEntry, 'puesto'>[] = [];

  for (let i = 1; i <= 29; i++) {
    const numStr = String(i).padStart(3, '0');
    const alias = `Estudiante_${numStr}`;
    const botXp = Math.floor(baseMin + rng() * (baseMax - baseMin));
    entriesRaw.push({
      alias,
      xp: botXp,
      esJugador: false
    });
  }

  entriesRaw.push({
    alias: 'TÚ',
    xp: xpWeekly,
    esJugador: true
  });

  entriesRaw.sort((a, b) => {
    if (b.xp !== a.xp) return b.xp - a.xp;
    return a.alias.localeCompare(b.alias);
  });

  let puestoJugador = 1;
  const entries: LigaEntry[] = entriesRaw.map((item, index) => {
    const puesto = index + 1;
    if (item.esJugador) {
      puestoJugador = puesto;
    }
    return {
      ...item,
      puesto
    };
  });

  let movimiento: 'ascenso' | 'descenso' | 'permanencia' = 'permanencia';
  if (puestoJugador <= ASCIENDEN) {
    movimiento = 'ascenso';
  } else if (puestoJugador > LIGA_SIZE - DESCIENDEN) {
    movimiento = 'descenso';
  }

  const id = ligaIdFor(weekKey, tier, nodeHash);

  return {
    id,
    tier,
    weekKey,
    entries,
    puestoJugador,
    movimiento
  };
}

export function ventanaLiga(liga: Liga, radio = 2): LigaEntry[] {
  const total = liga.entries.length;
  if (total === 0) return [];

  const targetIdx = liga.puestoJugador - 1;
  const windowSize = radio * 2 + 1;

  let startIdx = targetIdx - radio;
  let endIdx = targetIdx + radio;

  if (startIdx < 0) {
    startIdx = 0;
    endIdx = Math.min(total - 1, windowSize - 1);
  } else if (endIdx >= total) {
    endIdx = total - 1;
    startIdx = Math.max(0, total - windowSize);
  }

  return liga.entries.slice(startIdx, endIdx + 1);
}
