export type VentanaEstado = 'abierta' | 'futura' | 'cerrada';

export interface ElegibilidadResultado {
  esElegible: boolean;
  motivosIneligibilidad: string[];
}

export interface HallEntry {
  alias: string;
  pais: string;
  season: string;
}

export function seasonKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return `${year}-Q${quarter}`;
}

export function ventanaEstado(date: Date = new Date()): VentanaEstado {
  const month = date.getMonth(); // 0-based
  const day = date.getDate();
  // Simple deterministic window rule: month % 3 === 2 (last month of quarter) is 'abierta', else 'futura'
  const isLastMonthOfQuarter = (month + 1) % 3 === 0;
  if (isLastMonthOfQuarter && day >= 20) {
    return 'abierta';
  }
  return 'futura';
}

export function esElegible(weeksTier: string[], mockExams: unknown[] = []): ElegibilidadResultado {
  const motivos: string[] = [];
  const oroWeeks = weeksTier.filter((t) => t === 'Oro' || t === 'Diamante').length;

  if (oroWeeks < 2) {
    motivos.push(`Requiere al menos 2 semanas en rango Oro+ (tienes ${oroWeeks})`);
  }
  if (!mockExams || mockExams.length === 0) {
    motivos.push('Requiere haber completado al menos 1 simulacro oficial');
  }

  return {
    esElegible: motivos.length === 0,
    motivosIneligibilidad: motivos,
  };
}

export function buildTorneoSet(): string[] {
  return ['matematicas', 'lectura-critica', 'ciencias-naturales'];
}
