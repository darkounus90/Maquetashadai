import type { Lang } from '../data/hotel';

export const languages: Record<Lang, string> = { es: 'Español', en: 'English' };

export const ui = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.habitaciones': 'Habitaciones',
    'nav.restaurante': 'Restaurante',
    'nav.eventos': 'Eventos',
    'nav.galeria': 'Galería',
    'nav.contacto': 'Contacto',
    'nav.reservar': 'Reservar',

    'hero.titulo': 'Duerma bajo el cielo más limpio de Colombia',
    'hero.bajada':
      'Piscina privada, azotea propia y un desierto entero de silencio. A cinco kilómetros del observatorio de la Tatacoa.',
    'hero.cta': 'Reservar',
    'hero.cta2': 'Conocer el hotel',

    'buscador.titulo': 'Reserve directo con el hotel',
    'buscador.entrada': 'Entrada',
    'buscador.salida': 'Salida',
    'buscador.huespedes': 'Huéspedes',
    'buscador.buscar': 'Buscar habitaciones',
    'buscador.nota': 'Sin comisiones de intermediarios. Mejor precio garantizado.',

    'prueba.titulo': 'Lo que dicen quienes ya durmieron aquí',
    'prueba.de': 'de',
    'prueba.resenas': 'comentarios verificados',
    'prueba.excepcional': 'Excepcional',

    'hab.titulo': 'Tres habitaciones, un mismo cielo',
    'hab.bajada':
      'Todas con jacuzzi, aire acondicionado, desayuno incluido y acceso a la piscina y a la azotea.',
    'hab.desde': 'Desde',
    'hab.noche': 'por noche',
    'hab.ver': 'Ver habitación',
    'hab.reservar': 'Reservar esta habitación',
    'hab.personas': 'personas',
    'hab.persona': 'persona',
    'hab.incluye': 'Lo que incluye',
    'hab.otras': 'Otras habitaciones',
    'hab.precios': 'Precios por temporada',

    'rest.titulo': 'El restaurante',
    'rest.bajada': 'Cincuenta años de conejo al gratín.',
    'rest.ver': 'Ver la carta',
    'rest.carta': 'La carta',
    'rest.incluido': 'Incluido',
    'rest.nota': 'Precios en pesos colombianos. La carta cambia según el mercado de Villavieja.',
    'rest.reservarMesa': 'Reservar mesa',

    'ev.titulo': 'Celebre en el desierto',
    'ev.bajada':
      'Terraza para cincuenta personas, comedor privado para treinta y cinco y una azotea donde se ve la Vía Láctea a simple vista.',
    'ev.cta': 'Cotizar mi evento',
    'ev.ver': 'Ver eventos',

    'gal.titulo': 'Galería',
    'gal.bajada': 'El hotel, el restaurante y el desierto que lo rodea.',

    'ubi.titulo': 'Cómo llegar',
    'ubi.bajada':
      'Estamos sobre la vía al desierto, a diez minutos a pie del parque principal de Villavieja.',
    'ubi.mapa': 'Abrir en Google Maps',

    'cta.titulo': '¿Listo para ver las estrellas?',
    'cta.bajada': 'Reserve directo y hable con nosotros, no con un intermediario.',
    'cta.whatsapp': 'Escribir por WhatsApp',
    'cta.llamar': 'Llamar ahora',

    'res.titulo': 'Reservar',
    'res.paso': 'Paso',
    'res.de': 'de',
    'res.paso1': 'Fechas y huéspedes',
    'res.paso2': 'Elija su habitación',
    'res.paso3': 'Sus datos',
    'res.paso4': 'Confirmación',
    'res.noches': 'noches',
    'res.noche': 'noche',
    'res.continuar': 'Continuar',
    'res.volver': 'Volver',
    'res.disponible': 'Disponible',
    'res.agotada': 'Sin disponibilidad en estas fechas',
    'res.seleccionar': 'Seleccionar',
    'res.seleccionada': 'Seleccionada',
    'res.total': 'Total',
    'res.impuestos': 'Impuestos y cargos (10%)',
    'res.subtotal': 'Subtotal',
    'res.temporada': 'Temporada',
    'res.nombre': 'Nombre completo',
    'res.correo': 'Correo electrónico',
    'res.telefono': 'Teléfono',
    'res.notas': 'Peticiones especiales',
    'res.notasPh': 'Hora de llegada, celebración, alergias, mascota…',
    'res.confirmar': 'Confirmar reserva',
    'res.listo': 'Su reserva está confirmada',
    'res.listoTexto':
      'Le enviaremos la confirmación a su correo. Puede pagar al llegar al hotel: no le pedimos tarjeta.',
    'res.enviarWa': 'Enviar por WhatsApp',
    'res.otra': 'Hacer otra reserva',
    'res.resumen': 'Resumen',
    'res.faltanFechas': 'Elija las fechas de su estadía.',
    'res.errorFechas': 'La salida debe ser posterior a la entrada.',
    'res.errorDatos': 'Complete nombre, correo y teléfono.',
    'res.sinResultados': 'Ninguna habitación admite ese número de huéspedes.',
    'res.desayuno': 'Desayuno incluido',
    'res.pagoHotel': 'Se paga en el hotel',
    'res.sinTarjeta': 'Sin tarjeta de crédito',
    'res.codigo': 'Código de reserva',

    'con.titulo': 'Contacto',
    'con.bajada': 'Reservas, cotizaciones de eventos y cualquier pregunta.',
    'con.datos': 'Datos de contacto',
    'con.horarios': 'Horarios',
    'con.checkin': 'Entrada',
    'con.checkout': 'Salida',
    'con.enviar': 'Enviar mensaje',
    'con.asunto': 'Asunto',
    'con.mensaje': 'Mensaje',

    'foot.legal': 'Información legal',
    'foot.terminos': 'Términos y condiciones',
    'foot.privacidad': 'Política de privacidad',
    'foot.rnt': 'RNT',
    'foot.derechos': 'Todos los derechos reservados.',
    'foot.explorar': 'Explorar',
    'foot.contacto': 'Contacto',
    'foot.sigue': 'Síganos',

    'aviso.demo': 'Maqueta de demostración',
  },
  en: {
    'nav.inicio': 'Home',
    'nav.habitaciones': 'Rooms',
    'nav.restaurante': 'Restaurant',
    'nav.eventos': 'Events',
    'nav.galeria': 'Gallery',
    'nav.contacto': 'Contact',
    'nav.reservar': 'Book',

    'hero.titulo': 'Sleep under the clearest sky in Colombia',
    'hero.bajada':
      'A private pool, your own rooftop, and an entire desert of silence. Five kilometres from the Tatacoa observatory.',
    'hero.cta': 'Book',
    'hero.cta2': 'Explore the hotel',

    'buscador.titulo': 'Book direct with the hotel',
    'buscador.entrada': 'Check-in',
    'buscador.salida': 'Check-out',
    'buscador.huespedes': 'Guests',
    'buscador.buscar': 'Search rooms',
    'buscador.nota': 'No agency commissions. Best rate guaranteed.',

    'prueba.titulo': 'What people who slept here say',
    'prueba.de': 'of',
    'prueba.resenas': 'verified reviews',
    'prueba.excepcional': 'Exceptional',

    'hab.titulo': 'Three rooms, one sky',
    'hab.bajada':
      'All with a jacuzzi, air conditioning, breakfast included and access to the pool and the rooftop.',
    'hab.desde': 'From',
    'hab.noche': 'per night',
    'hab.ver': 'View room',
    'hab.reservar': 'Book this room',
    'hab.personas': 'guests',
    'hab.persona': 'guest',
    'hab.incluye': 'What it includes',
    'hab.otras': 'Other rooms',
    'hab.precios': 'Rates by season',

    'rest.titulo': 'The restaurant',
    'rest.bajada': 'Fifty years of rabbit au gratin.',
    'rest.ver': 'See the menu',
    'rest.carta': 'The menu',
    'rest.incluido': 'Included',
    'rest.nota': 'Prices in Colombian pesos. The menu changes with the Villavieja market.',
    'rest.reservarMesa': 'Book a table',

    'ev.titulo': 'Celebrate in the desert',
    'ev.bajada':
      'A terrace for fifty, a private dining room for thirty-five, and a rooftop where the Milky Way is visible to the naked eye.',
    'ev.cta': 'Request a quote',
    'ev.ver': 'See events',

    'gal.titulo': 'Gallery',
    'gal.bajada': 'The hotel, the restaurant and the desert around them.',

    'ubi.titulo': 'Getting here',
    'ubi.bajada':
      'We are on the road to the desert, a ten-minute walk from the main square of Villavieja.',
    'ubi.mapa': 'Open in Google Maps',

    'cta.titulo': 'Ready to see the stars?',
    'cta.bajada': 'Book direct and talk to us, not to a middleman.',
    'cta.whatsapp': 'Message us on WhatsApp',
    'cta.llamar': 'Call now',

    'res.titulo': 'Book',
    'res.paso': 'Step',
    'res.de': 'of',
    'res.paso1': 'Dates and guests',
    'res.paso2': 'Choose your room',
    'res.paso3': 'Your details',
    'res.paso4': 'Confirmation',
    'res.noches': 'nights',
    'res.noche': 'night',
    'res.continuar': 'Continue',
    'res.volver': 'Back',
    'res.disponible': 'Available',
    'res.agotada': 'Not available on these dates',
    'res.seleccionar': 'Select',
    'res.seleccionada': 'Selected',
    'res.total': 'Total',
    'res.impuestos': 'Taxes and fees (10%)',
    'res.subtotal': 'Subtotal',
    'res.temporada': 'Season',
    'res.nombre': 'Full name',
    'res.correo': 'Email',
    'res.telefono': 'Phone',
    'res.notas': 'Special requests',
    'res.notasPh': 'Arrival time, celebration, allergies, pet…',
    'res.confirmar': 'Confirm booking',
    'res.listo': 'Your booking is confirmed',
    'res.listoTexto':
      'We will send the confirmation to your email. You can pay on arrival: no card required.',
    'res.enviarWa': 'Send via WhatsApp',
    'res.otra': 'Make another booking',
    'res.resumen': 'Summary',
    'res.faltanFechas': 'Choose the dates of your stay.',
    'res.errorFechas': 'Check-out must be after check-in.',
    'res.errorDatos': 'Please fill in name, email and phone.',
    'res.sinResultados': 'No room takes that number of guests.',
    'res.desayuno': 'Breakfast included',
    'res.pagoHotel': 'Pay at the hotel',
    'res.sinTarjeta': 'No credit card needed',
    'res.codigo': 'Booking code',

    'con.titulo': 'Contact',
    'con.bajada': 'Bookings, event quotes and any question at all.',
    'con.datos': 'Contact details',
    'con.horarios': 'Hours',
    'con.checkin': 'Check-in',
    'con.checkout': 'Check-out',
    'con.enviar': 'Send message',
    'con.asunto': 'Subject',
    'con.mensaje': 'Message',

    'foot.legal': 'Legal',
    'foot.terminos': 'Terms and conditions',
    'foot.privacidad': 'Privacy policy',
    'foot.rnt': 'Tourism registry',
    'foot.derechos': 'All rights reserved.',
    'foot.explorar': 'Explore',
    'foot.contacto': 'Contact',
    'foot.sigue': 'Follow us',

    'aviso.demo': 'Demonstration mockup',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['es']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui.es as Record<string, string>)[key];
  };
}

/** Prefija una ruta con el idioma. `/habitaciones` -> `/en/habitaciones` */
export function ruta(lang: Lang, path: string): string {
  const p = path === '/' ? '' : path;
  return lang === 'es' ? p || '/' : `/en${p}`;
}
