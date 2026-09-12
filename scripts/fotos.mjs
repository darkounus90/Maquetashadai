/**
 * Genera public/img/fotos/*.webp antes de construir el sitio.
 *
 * Las fotos originales son del hotel y pesan 7,2 MB en JPEG. En vez de
 * versionarlas, este script las resuelve en tiempo de build:
 *   1. Si existe fotos-src/fXX.jpg en disco (desarrollo local), la usa.
 *   2. Si no (build en Vercel), la descarga de la lista de URLs.
 * En ambos casos la convierte a WebP al ancho en que realmente se muestra.
 *
 * También escribe src/data/dimensiones.json con el tamaño real de cada
 * archivo generado. Antes las plantillas declaraban 1024x683 para todas, y
 * eso es falso: los originales van de 432x768 a 1024x768.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const LISTA = 'research/imagenes-booking.txt';
const ORIGINALES = 'fotos-src';
const SALIDA = 'public/img/fotos';
const DIMENSIONES = 'src/data/dimensiones.json';

// Las que se ven a sangre o a ancho completo conservan resolución.
const GRANDES = new Set(['f52', 'f20', 'f17', 'f31', 'f30', 'f03', 'f44', 'f13', 'f54', 'f08']);

// La foto del hero ocupa la pantalla entera. El original mide 1024x576, así
// que a pantalla completa el navegador la estiraba al doble con un filtro
// barato y encima sobre un WebP de calidad 58: quedaba blanda y con bloques.
// Se genera aparte, al doble de ancho y con calidad alta. Ampliar no inventa
// detalle, pero evita que se sumen las dos degradaciones.
const HERO = 'f52';
const HERO_ANCHO = 2048;
const HERO_CALIDAD = 74;

// Las que el sitio referencia. El resto de la lista no se procesa.
const USADAS = [
  'f01', 'f03', 'f05', 'f06', 'f07', 'f08', 'f09', 'f11', 'f12', 'f13', 'f14',
  'f15', 'f16', 'f17', 'f18', 'f19', 'f20', 'f21', 'f22', 'f23', 'f24', 'f25',
  'f26', 'f28', 'f30', 'f31', 'f32', 'f33', 'f35', 'f38', 'f40', 'f42', 'f44',
  'f45', 'f46', 'f47', 'f49', 'f50', 'f51', 'f52', 'f53', 'f54', 'f55', 'f56',
  'f57', 'f58', 'f59', 'f60', 'f61',
];

const urls = fs
  .readFileSync(LISTA, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter(Boolean);

fs.mkdirSync(SALIDA, { recursive: true });

async function origen(id) {
  const local = path.join(ORIGINALES, id + '.jpg');
  if (fs.existsSync(local)) return fs.readFileSync(local);

  const url = urls[Number(id.slice(1)) - 1];
  if (!url) throw new Error(`sin URL para ${id}`);

  for (let intento = 1; intento <= 3; intento++) {
    try {
      const r = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*' },
        signal: AbortSignal.timeout(20000),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return Buffer.from(await r.arrayBuffer());
    } catch (e) {
      if (intento === 3) throw new Error(`${id}: ${e.message}`);
      await new Promise((r) => setTimeout(r, 800 * intento));
    }
  }
}

let bytes = 0;
let descargadas = 0;
const fallidas = [];
const dimensiones = {};

async function anotar(clave, archivo) {
  const { width, height } = await sharp(archivo).metadata();
  dimensiones[clave] = [width, height];
  bytes += fs.statSync(archivo).size;
}

for (const id of USADAS) {
  const dest = path.join(SALIDA, id + '.webp');
  const destHero = id === HERO ? path.join(SALIDA, id + '-hero.webp') : null;

  const local = fs.existsSync(path.join(ORIGINALES, id + '.jpg'));
  const faltan = !fs.existsSync(dest) || (destHero && !fs.existsSync(destHero));
  if (faltan && !local) descargadas++;

  // Una foto que no se pueda resolver no debe tumbar el build entero: se
  // registra y se sigue. Al final se listan las que faltaron.
  try {
    if (faltan) {
      const bruto = await origen(id);

      if (!fs.existsSync(dest)) {
        const grande = GRANDES.has(id);
        await sharp(bruto)
          .resize({ width: grande ? 1024 : 540, withoutEnlargement: true })
          .webp({ quality: grande ? 58 : 50, effort: 6 })
          .toFile(dest);
      }

      if (destHero && !fs.existsSync(destHero)) {
        await sharp(bruto)
          .resize({ width: HERO_ANCHO, kernel: 'lanczos3', withoutEnlargement: false })
          // Un enfoque suave después de ampliar: devuelve el borde a las
          // estrellas, que es lo primero que se pierde al interpolar.
          .sharpen({ sigma: 0.7, m1: 0.5, m2: 0.9 })
          .webp({ quality: HERO_CALIDAD, effort: 6 })
          .toFile(destHero);
      }
    }

    await anotar(id, dest);
    if (destHero) await anotar(id + '-hero', destHero);
  } catch (e) {
    fallidas.push(`${id} (${e.message})`);
  }
}

fs.writeFileSync(DIMENSIONES, JSON.stringify(dimensiones, null, 2) + '\n');

console.log(
  `[fotos] ${USADAS.length - fallidas.length}/${USADAS.length} imágenes listas ` +
    `(${descargadas} descargadas, ${(bytes / 1048576).toFixed(2)} MB en WebP)`
);
if (fallidas.length) {
  console.warn(`[fotos] no se pudieron resolver ${fallidas.length}: ${fallidas.join(', ')}`);
}
