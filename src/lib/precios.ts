import { habitaciones, festivos2026, rangosAlta, semanaSanta } from '../data/hotel';
import type { Temporada } from '../data/hotel';

/**
 * Formatea un valor en pesos colombianos sin decimales.
 * En inglés antepone "COP" para que no se lea como dólares.
 */
export function cop(n: number, lang: 'es' | 'en' = 'es'): string {
  if (lang === 'en') return 'COP ' + n.toLocaleString('en-GB', { maximumFractionDigits: 0 });
  return '$' + n.toLocaleString('es-CO', { maximumFractionDigits: 0 });
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Clasifica una fecha según las temporadas declaradas por el hotel. */
export function temporadaDe(fecha: Date): Temporada {
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  const dentro = (m1: number, d1: number, m2: number, d2: number) => {
    const v = mes * 100 + dia;
    return v >= m1 * 100 + d1 && v <= m2 * 100 + d2;
  };

  for (const [m1, d1, m2, d2] of rangosAlta) {
    if (dentro(m1, d1, m2, d2)) return 'alta';
  }

  const s = iso(fecha);
  if (s >= semanaSanta[0] && s <= semanaSanta[1]) return 'alta';

  // Puente festivo: si el festivo cae lunes o viernes, todo el fin de semana es alta.
  const idx = festivos2026.indexOf(s);
  if (idx !== -1) {
    const dow = fecha.getDay();
    return dow === 1 || dow === 5 ? 'alta' : 'media';
  }

  // Un sábado o domingo pegado a un festivo lunes/viernes también es puente.
  const dow = fecha.getDay();
  if (dow === 0 || dow === 6) {
    for (const off of [-2, -1, 1, 2]) {
      const d = new Date(fecha);
      d.setDate(d.getDate() + off);
      if (festivos2026.includes(iso(d))) {
        const fd = d.getDay();
        if (fd === 1 || fd === 5) return 'alta';
      }
    }
  }

  return 'baja';
}

export type NocheCalculada = { fecha: string; temporada: Temporada; precio: number };

/** Devuelve el desglose noche a noche de una habitación entre dos fechas. */
export function desglose(slug: string, entrada: string, salida: string): NocheCalculada[] {
  const hab = habitaciones.find((h) => h.slug === slug);
  if (!hab) return [];
  const noches: NocheCalculada[] = [];
  const d = new Date(entrada + 'T12:00:00');
  const fin = new Date(salida + 'T12:00:00');
  let guarda = 0;
  while (d < fin && guarda++ < 400) {
    const temp = temporadaDe(d);
    noches.push({ fecha: iso(d), temporada: temp, precio: hab.precios[temp] });
    d.setDate(d.getDate() + 1);
  }
  return noches;
}

export function totalNoches(entrada: string, salida: string): number {
  const a = new Date(entrada + 'T12:00:00').getTime();
  const b = new Date(salida + 'T12:00:00').getTime();
  return Math.max(0, Math.round((b - a) / 86400000));
}

export const IMPUESTO = 0.1;

export function cotizar(slug: string, entrada: string, salida: string) {
  const noches = desglose(slug, entrada, salida);
  const subtotal = noches.reduce((s, n) => s + n.precio, 0);
  const impuestos = Math.round(subtotal * IMPUESTO);
  const temporadas = [...new Set(noches.map((n) => n.temporada))];
  return { noches, subtotal, impuestos, total: subtotal + impuestos, temporadas };
}

/**
 * Disponibilidad simulada y determinista: la misma fecha siempre da el mismo
 * resultado, de modo que la demo se comporta de forma creíble y repetible.
 */
export function disponibles(slug: string, entrada: string, huespedes: number): number {
  const hab = habitaciones.find((h) => h.slug === slug);
  if (!hab) return 0;
  if (huespedes > hab.capacidad) return 0;

  let h = 0;
  const semilla = slug + entrada;
  for (let i = 0; i < semilla.length; i++) h = (h * 31 + semilla.charCodeAt(i)) >>> 0;

  const temp = temporadaDe(new Date(entrada + 'T12:00:00'));
  const techo = temp === 'alta' ? 2 : temp === 'media' ? 3 : 4;

  // El hotel rara vez está lleno: una de cada diez fechas se agota, y el resto
  // reparte entre 1 y `techo` habitaciones para que la escasez se vea real.
  if (h % 10 === 0) return 0;
  return 1 + (h % techo);
}

export function codigoReserva(): string {
  const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let s = 'ES-';
  for (let i = 0; i < 3; i++) s += letras[Math.floor(Math.random() * letras.length)];
  s += '-' + String(Math.floor(1000 + Math.random() * 9000));
  return s;
}

export function hoyISO(off = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + off);
  return iso(d);
}

export function fechaLarga(s: string, lang: 'es' | 'en'): string {
  return new Date(s + 'T12:00:00').toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Formatea un decimal con el separador del idioma (9,5 en español; 9.5 en inglés). */
export function dec(n: number, lang: 'es' | 'en'): string {
  return n.toLocaleString(lang === 'es' ? 'es-CO' : 'en-GB', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}
