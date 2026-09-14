# El Shaddai Punta del Este — maqueta funcional

Maqueta de demostración para el Hotel & Restaurante El Shaddai Punta del Este
(Km 1 vía Desierto de la Tatacoa, Villavieja, Huila).

Sitio estático en **Astro 5 + Tailwind 4**, bilingüe (ES/EN), con motor de
reservas funcional del lado del cliente.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Qué incluye

- **Home** con buscador de disponibilidad, bento de habitaciones, carril de
  eventos y prueba social real.
- **3 habitaciones** con ficha propia, galería, precios por temporada y reserva.
- **Restaurante** con carta completa por secciones.
- **Eventos** con formulario de cotización.
- **Galería** filtrable con visor a pantalla completa.
- **Motor de reservas** en `/reservar`: cuatro pasos, cálculo de precio noche a
  noche según temporada, disponibilidad simulada determinista, código de reserva
  y envío del resumen por WhatsApp.
- **SEO local**: schema `Hotel` con `aggregateRating`, `geo`, `starRating` y
  ofertas; sitemap; hreflang ES/EN; títulos y descripciones por página.

## Sistema visual

"Noche y oro", tomado de la identidad del propio hotel: su logo es un óvalo
dorado con letras granate, y su Instagram lo pone sobre fotos del cielo nocturno
de la Tatacoa. La paleta es eso: azul noche de base, oro como acento único, y el
granate del logo solo como texto sobre oro. Los valores se muestrearon de las
portadas de destacadas, la foto de perfil y el logo de su web.

- Modo oscuro **bloqueado** a propósito: lo que vende este hotel es el cielo de
  noche, y una interfaz clara lo contradice.
- Radio de esquina **0** en todo el sistema, sin excepciones.
- Display: Bricolage Grotesque. Texto: Archivo. Iconos: Phosphor.
- Oro (`--color-oro`, `#d69948`) para rellenos, **siempre con texto granate**
  (`--color-granate`, `#582832`, 4,8:1), como en el logo. Blanco sobre oro da
  2,5:1 y no pasa.
- Oro claro (`--color-oro-luz`) para texto de acento sobre fondo oscuro.
- Todo el texto pasa AA sobre todas las superficies, y los bordes de campo
  (`--color-line-3`) pasan 3:1.
- Ojo con los nombres: un color llamado `base` choca con la clase de tamaño
  `text-base` de Tailwind 4 y pinta el texto del color del fondo. Por eso el
  fondo se llama `fondo`.

Los tokens viven en `src/styles/global.css`. Cambiar la paleta es cambiar ese
bloque `@theme`.

## Dónde está el contenido

Todo el texto editable está en dos archivos:

- `src/data/hotel.ts` — datos del hotel, habitaciones, precios, temporadas,
  carta, eventos, reseñas y galería.
- `src/i18n/ui.ts` — etiquetas de interfaz en ES y EN.

Las páginas de `src/pages/` son envoltorios de una línea; el contenido real está
en `src/paginas/`.

## Antes de publicarlo en vivo

1. **Fotos.** Las 61 imágenes de `public/img/fotos/` se tomaron de la ficha
   pública del hotel en Booking.com. Son suyas, pero varias llevan marca de agua
   y todas están limitadas a 1024 px. Pedirle los originales antes de lanzar.
   Falta además una foto real de matrimonio: hoy se usa una de montaje de evento.
2. **Precios.** Solo el de la habitación doble es real (COP 252.000, tomado de
   Booking). Los de la cuádruple y la familiar, y todos los de temporada media y
   alta, son estimaciones. Confirmarlos con el hotel.
3. **Carta del restaurante.** Los platos y precios son verosímiles pero
   inventados, salvo el conejo al gratín y el beef, que sí son su especialidad.
4. **Motor de reservas.** Hoy la disponibilidad es simulada y no hay pasarela de
   pago. Para producción hay dos caminos: conectar un channel manager (evita
   sobreventa contra Booking) o dejarlo como solicitud de reserva que llega por
   correo y WhatsApp, que es como opera el hotel hoy.
5. **Correo.** Se usa `reservas@elshaddaipuntadeleste.com` en toda la maqueta.
   El correo real hoy es un Gmail personal. Hay que crear el buzón corporativo.
6. **Formularios.** Los de contacto y eventos apuntan a `mailto:`. Reemplazar por
   un endpoint real (Formspree, Resend, una función de Vercel).
7. **Fuentes.** Se cargan desde Google Fonts. Para producción conviene
   autoalojarlas con `@font-face` y `font-display: swap`.
8. **Imágenes.** Sin optimizar (7,2 MB en total). Pasarlas a WebP/AVIF con
   varios anchos antes de lanzar.
9. **Redes.** El hotel no enlaza ninguna red social. Pedir Instagram y Facebook
   para el pie de página.

## Investigación

`research/booking-data.md` tiene los datos extraídos de la ficha de Booking:
puntajes, reseñas, tipos de habitación, precio real, servicios que el hotel no
publica en su propia web, y las contradicciones entre canales que sirven como
argumento de venta.
