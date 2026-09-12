import type { APIRoute } from 'astro';
import { hotel, habitaciones, servicios, restaurante } from '../data/hotel';
import { cop } from '../lib/precios';

/**
 * /llms.txt — resumen del sitio para modelos de lenguaje.
 *
 * Se genera desde src/data/hotel.ts en cada build: si cambian los precios o
 * las habitaciones, este archivo cambia solo. Nada aquí se escribe a mano.
 *
 * No incluye teléfono ni correo a propósito: hoy son datos de relleno de la
 * maqueta. Se enlaza la página de contacto en su lugar.
 */
export const GET: APIRoute = ({ site }) => {
  const base = (site?.origin ?? 'https://elshaddaipuntadeleste.com').replace(/\/+$/, '');

  const cuartos = habitaciones
    .map(
      (h) =>
        `- [${h.nombre.es}](${base}/habitaciones/${h.slug}/): ${h.capacidad} personas, ` +
        `${h.m2} m². Desde ${cop(h.precios.baja, 'es')} la noche. ${h.resumen.es}`
    )
    .join('\n');

  const secciones = restaurante.menu.es.map((s) => s.seccion).join(', ');

  const cuerpo = `# El Shaddai Punta del Este

> Hotel de ${hotel.estrellas} estrellas y restaurante en ${hotel.direccion}.
> A cinco kilómetros del Observatorio Astronómico del Desierto de la Tatacoa.
> Piscina, jacuzzi en las habitaciones y azotea privada para dormir al aire
> libre bajo el cielo de la Tatacoa. Desayuno incluido y reserva directa con
> el hotel, sin comisiones de intermediarios.

Registro Nacional de Turismo: ${hotel.rnt}.
Check-in ${hotel.checkIn}, check-out ${hotel.checkOut}. Recepción 24 horas.
Coordenadas: ${hotel.coords.lat}, ${hotel.coords.lng}.

## Habitaciones

${cuartos}

Los precios varían por temporada (baja, media y alta). El buscador de
${base}/reservar/ calcula el total noche a noche según las fechas.

## Restaurante

${restaurante.intro.es}
Secciones de la carta: ${secciones}.
La especialidad de la casa es el conejo al gratín, la misma receta desde hace
cincuenta años.

## Qué incluye la estadía

${servicios.map((s) => `- ${s.es[0]}: ${s.es[1]}`).join('\n')}

## Distancias

${hotel.distancias.es.map(([lugar, d]) => `- ${lugar}: ${d}`).join('\n')}

## Páginas

- [Inicio](${base}/)
- [Habitaciones](${base}/habitaciones/)
- [Restaurante](${base}/restaurante/)
- [Eventos y celebraciones](${base}/eventos/)
- [Galería](${base}/galeria/)
- [Reservar](${base}/reservar/)
- [Contacto](${base}/contacto/)
- [Términos y condiciones](${base}/terminos/)

Versión en inglés bajo ${base}/en/.

## Contacto

Los datos de contacto y el formulario están en ${base}/contacto/.
`;

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
