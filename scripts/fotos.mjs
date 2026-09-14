/**
 * Genera public/img/fotos/*.webp antes de construir el sitio.
 *
 * Las fotos originales son del hotel y pesan 7,2 MB en JPEG. En vez de
 * versionar las convertidas, este script las resuelve en tiempo de build:
 *   1. Si existe fotos-src/fXX.jpg en disco, la usa.
 *   2. Si no, la descarga de la lista de URLs.
 * En ambos casos la convierte a WebP al ancho en que realmente se muestra.
 *
 * También escribe src/data/dimensiones.json con el tamaño real de cada archivo
 * generado, para que cada <img> reserve el hueco correcto.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const LISTA = 'research/imagenes-booking.txt';
const ORIGINALES = 'fotos-src';
const SALIDA = 'public/img/fotos';
const DIMENSIONES = 'src/data/dimensiones.json';

// Las que se ven grandes conservan su resolución completa. Ninguna foto del
// hotel pasa de 1024 px de ancho: por eso el diseño no las estira a pantalla
// completa. f07 y f53 son las dos fotos de la portada.
const GRANDES = new Set(['f52', 'f20', 'f17', 'f31', 'f30', 'f03', 'f44', 'f13', 'f54', 'f08', 'f07', 'f53']);

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

for (const id of USADAS) {
  const dest = path.join(SALIDA, id + '.webp');

  // Una foto que no se pueda resolver no debe tumbar el build entero: se
  // registra y se sigue. Al final se listan las que faltaron.
  try {
    if (!fs.existsSync(dest)) {
      if (!fs.existsSync(path.join(ORIGINALES, id + '.jpg'))) descargadas++;
      const grande = GRANDES.has(id);
      await sharp(await origen(id))
        .resize({ width: grande ? 1024 : 540, withoutEnlargement: true })
        // Las grandes se ven cerca de su tamaño real: calidad alta para que
        // la compresión no las ablande.
        .webp({ quality: grande ? 76 : 50, effort: 6 })
        .toFile(dest);
    }
    const { width, height } = await sharp(dest).metadata();
    dimensiones[id] = [width, height];
    bytes += fs.statSync(dest).size;
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
