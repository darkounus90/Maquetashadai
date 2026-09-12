// Datos del hotel. Todo el contenido editable vive aquí.
// Fuentes: ficha de Booking.com + web actual del hotel (ver /research).

export type Lang = 'es' | 'en';
export type T = Record<Lang, string>;

export const hotel = {
  nombre: 'El Shaddai',
  nombreCompleto: 'El Shaddai Punta del Este',
  descriptor: {
    es: 'Hotel y restaurante en el Desierto de la Tatacoa',
    en: 'Hotel and restaurant in the Tatacoa Desert',
  } as T,
  estrellas: 4,
  rnt: '232614',
  tel: '+573125550814',
  telVisible: '+57 312 555 0814',
  whatsapp: '573125550814',
  email: 'reservas@elshaddaipuntadeleste.com',
  direccion: 'Km 1 Vía Desierto de la Tatacoa, Villavieja, Huila, Colombia',
  codigoPostal: '411027',
  coords: { lat: 3.2205, lng: -75.2156 },
  checkIn: '15:00',
  checkOut: '12:00',
  rating: 9.5,
  totalResenas: 57,
  distancias: {
    es: [
      ['Parque principal de Villavieja', '10 min a pie'],
      ['Desierto de la Tatacoa (mirador)', '5,5 km'],
      ['Observatorio Astronómico', '6 km'],
      ['Neiva', '37 km'],
      ['Aeropuerto Benito Salas', '35 km'],
    ],
    en: [
      ['Villavieja main square', '10 min walk'],
      ['Tatacoa Desert (viewpoint)', '5.5 km'],
      ['Astronomical Observatory', '6 km'],
      ['Neiva', '37 km'],
      ['Benito Salas Airport', '35 km'],
    ],
  },
};

// ---------------------------------------------------------------------------
// Temporadas: tomadas literalmente de los términos y condiciones del hotel.
// ---------------------------------------------------------------------------

export type Temporada = 'baja' | 'media' | 'alta';

export const temporadas: Record<Temporada, { nombre: T; desc: T }> = {
  baja: {
    nombre: { es: 'Temporada baja', en: 'Low season' },
    desc: {
      es: 'Fechas no incluidas en temporada media o alta.',
      en: 'Dates not included in mid or high season.',
    },
  },
  media: {
    nombre: { es: 'Temporada media', en: 'Mid season' },
    desc: {
      es: 'Días festivos que no coincidan con temporada alta.',
      en: 'Public holidays outside high season.',
    },
  },
  alta: {
    nombre: { es: 'Temporada alta', en: 'High season' },
    desc: {
      es: 'Semana Santa, puentes festivos, semana de receso, del 20 de junio al 20 de julio y del 20 de diciembre al 20 de enero.',
      en: 'Easter week, long weekends, October school break, June 20 to July 20, and December 20 to January 20.',
    },
  },
};

// Rangos fijos de temporada alta (mes 1-12, día).
export const rangosAlta: [number, number, number, number][] = [
  [6, 20, 7, 20],
  [12, 20, 12, 31],
  [1, 1, 1, 20],
  [10, 5, 10, 12], // semana de receso (aproximada)
];

// Festivos colombianos 2026 (temporada media si no caen en alta).
export const festivos2026 = [
  '2026-01-01', '2026-01-12', '2026-03-23', '2026-03-29', '2026-04-02',
  '2026-04-03', '2026-05-01', '2026-05-18', '2026-06-08', '2026-06-15',
  '2026-06-29', '2026-07-20', '2026-08-07', '2026-08-17', '2026-10-12',
  '2026-11-02', '2026-11-16', '2026-12-08', '2026-12-25',
];

// Semana Santa 2026: 29 marzo a 5 abril.
export const semanaSanta = ['2026-03-29', '2026-04-05'];

// ---------------------------------------------------------------------------
// Habitaciones
// ---------------------------------------------------------------------------

export type Habitacion = {
  slug: string;
  nombre: T;
  resumen: T;
  descripcion: T;
  m2: number;
  capacidad: number;
  camas: T;
  precios: Record<Temporada, number>;
  fotos: string[];
  destacados: { es: string[]; en: string[] };
};

export const habitaciones: Habitacion[] = [
  {
    slug: 'doble',
    nombre: { es: 'Habitación Doble', en: 'Double Room' },
    resumen: {
      es: 'Cama king, balcón privado y vista directa a la piscina.',
      en: 'King bed, private balcony and direct pool view.',
    },
    descripcion: {
      es: 'Veinticinco metros cuadrados pensados para dos. La cama es doble extragrande, el balcón da sobre la piscina y el aire acondicionado hace el resto en las tardes del Huila. Es la habitación que eligen las parejas: nuestros huéspedes le ponen 9,9 a la estadía en pareja.',
      en: 'Twenty-five square metres designed for two. An extra-large double bed, a balcony over the pool, and air conditioning that handles the Huila afternoons. It is the room couples choose: guests rate two-person stays 9.9.',
    },
    m2: 25,
    capacidad: 2,
    camas: { es: '1 cama doble extragrande (king)', en: '1 extra-large double bed (king)' },
    precios: { baja: 252000, media: 289000, alta: 339000 },
    fotos: ['f30', 'f28', 'f42', 'f46', 'f47', 'f35'],
    destacados: {
      es: ['Balcón con vista a la piscina', 'Jacuzzi', 'Aire acondicionado', 'Desayuno incluido'],
      en: ['Balcony with pool view', 'Jacuzzi', 'Air conditioning', 'Breakfast included'],
    },
  },
  {
    slug: 'cuadruple',
    nombre: { es: 'Habitación Cuádruple', en: 'Quadruple Room' },
    resumen: {
      es: 'Para cuatro, con la misma terraza y la misma piscina.',
      en: 'For four, with the same terrace and the same pool.',
    },
    descripcion: {
      es: 'Una cama doble y una individual, espacio para cuatro personas y acceso completo a la piscina, la azotea y el restaurante. Es la opción de los grupos de amigos que llegan a ver el cielo de la Tatacoa y se quedan un día más de lo que tenían planeado.',
      en: 'One double and one single bed, room for four, and full access to the pool, the rooftop and the restaurant. The choice of friends who come for the Tatacoa sky and stay a day longer than planned.',
    },
    m2: 32,
    capacidad: 4,
    camas: { es: '1 cama doble y 1 cama individual', en: '1 double bed and 1 single bed' },
    precios: { baja: 395000, media: 449000, alta: 529000 },
    fotos: ['f44', 'f45', 'f50', 'f51', 'f59', 'f38'],
    destacados: {
      es: ['Hasta 4 personas', 'Jacuzzi', 'Nevera y TV', 'Desayuno incluido'],
      en: ['Up to 4 guests', 'Jacuzzi', 'Fridge and TV', 'Breakfast included'],
    },
  },
  {
    slug: 'familiar',
    nombre: { es: 'Habitación Familiar con Balcón', en: 'Family Room with Balcony' },
    resumen: {
      es: 'Hasta siete personas. La habitación de las celebraciones.',
      en: 'Up to seven guests. The room for celebrations.',
    },
    descripcion: {
      es: 'Tres camas individuales y dos dobles, balcón propio y sitio para que una familia entera duerma bajo el mismo techo. Es también la que se reserva para cumpleaños, grados y aniversarios, porque la azotea queda a un piso de distancia y allí se ve el cielo entero.',
      en: 'Three single beds and two doubles, its own balcony, and space for a whole family under one roof. It is also the room booked for birthdays, graduations and anniversaries. The rooftop is one floor away, and from there you see the entire sky.',
    },
    m2: 48,
    capacidad: 7,
    camas: { es: '3 camas individuales y 2 camas dobles', en: '3 single beds and 2 double beds' },
    precios: { baja: 610000, media: 695000, alta: 820000 },
    fotos: ['f03', 'f57', 'f32', 'f33', 'f16', 'f49'],
    destacados: {
      es: ['Hasta 7 personas', 'Balcón privado', 'Ideal para celebraciones', 'Desayuno incluido'],
      en: ['Up to 7 guests', 'Private balcony', 'Ideal for celebrations', 'Breakfast included'],
    },
  },
];

// ---------------------------------------------------------------------------
// Servicios
// ---------------------------------------------------------------------------

export const servicios = {
  es: [
    ['Desayuno incluido', 'Americano, servido en la terraza.'],
    ['Piscina y azotea privada', 'Para dormir al aire libre bajo las estrellas.'],
    ['Jacuzzi', 'Bañera de hidromasaje en las habitaciones.'],
    ['Recepción 24 horas', 'Siempre hay alguien esperándolo.'],
    ['Parqueadero privado gratis', 'Dentro del hotel, sin costo.'],
    ['WiFi gratis', 'En todo el hotel.'],
    ['Aire acondicionado', 'En todas las habitaciones.'],
    ['Restaurante y bar', 'Desayuno, almuerzo, cena y cocteles.'],
    ['Servicio a la habitación', 'Sin salir de su cuarto.'],
    ['Mini gimnasio', 'Al aire libre, con vista al desierto.'],
    ['Mascotas bienvenidas', 'Sin costo adicional, bajo petición.'],
    ['Acceso para movilidad reducida', 'Instalaciones adaptadas.'],
  ],
  en: [
    ['Breakfast included', 'American breakfast, served on the terrace.'],
    ['Pool and private rooftop', 'Sleep outdoors under the stars.'],
    ['Jacuzzi', 'Hot tub in the rooms.'],
    ['24-hour reception', 'Someone is always waiting for you.'],
    ['Free private parking', 'On site, at no cost.'],
    ['Free WiFi', 'Throughout the hotel.'],
    ['Air conditioning', 'In every room.'],
    ['Restaurant and bar', 'Breakfast, lunch, dinner and cocktails.'],
    ['Room service', 'Without leaving your room.'],
    ['Outdoor gym', 'Open air, facing the desert.'],
    ['Pets welcome', 'Free of charge, on request.'],
    ['Accessible facilities', 'Adapted for reduced mobility.'],
  ],
};

// ---------------------------------------------------------------------------
// Restaurante
// ---------------------------------------------------------------------------

export const restaurante = {
  intro: {
    es: 'Una cocina que cruza Colombia con Uruguay, una terraza con parasoles y BBQ para cincuenta personas, y un comedor cubierto para treinta y cinco.',
    en: 'A kitchen that crosses Colombia with Uruguay, a shaded terrace with a BBQ seating fifty, and a covered dining room for thirty-five.',
  },
  menu: {
    es: [
      {
        seccion: 'La especialidad',
        platos: [
          ['Conejo al gratín', 'Nuestra receta de hace cincuenta años. Gratinado, con papa criolla y verduras del día.', 62000],
          ['Beef a la parrilla', 'Corte uruguayo a las brasas, chimichurri de la casa.', 58000],
        ],
      },
      {
        seccion: 'Para empezar',
        platos: [
          ['Picada del desierto', 'Chorizo, morcilla, carne de cerdo, arepa y papa criolla.', 45000],
          ['Sopa del día', 'Según lo que traiga el mercado de Villavieja.', 18000],
          ['Ensalada de la huerta', 'Verduras frescas, queso costeño, vinagreta de maracuyá.', 24000],
        ],
      },
      {
        seccion: 'Carnes y pescados',
        platos: [
          ['Punta de anca', 'Con papa asada y ensalada.', 54000],
          ['Pechuga a la plancha', 'Con arroz de coco y patacón.', 38000],
          ['Mojarra frita', 'Entera, con patacón y ensalada.', 42000],
          ['Cerdo a la BBQ', 'Salsa de la casa, cocción lenta.', 46000],
        ],
      },
      {
        seccion: 'Cocina vegetariana',
        platos: [
          ['Cazuela de verduras', 'Verduras de la región al horno, queso gratinado.', 32000],
          ['Pasta al pesto', 'Con tomate confitado y albahaca fresca.', 30000],
        ],
      },
      {
        seccion: 'Desayunos',
        platos: [
          ['Desayuno El Shaddai', 'Huevos al gusto, caldo, arepa, fruta, jugo natural y café. Incluido para huéspedes.', 0],
          ['Calentado huilense', 'Con chicharrón, huevo y arepa.', 22000],
        ],
      },
      {
        seccion: 'Bar',
        platos: [
          ['Cocteles de autor', 'Preparados en la terraza, al atardecer.', 28000],
          ['Cerveza nacional', 'Bien fría.', 8000],
          ['Jugos naturales', 'Mango, maracuyá, lulo, guanábana.', 9000],
        ],
      },
    ],
    en: [
      {
        seccion: 'The specialty',
        platos: [
          ['Rabbit au gratin', 'Our recipe for fifty years. Gratinéed, with creole potato and vegetables of the day.', 62000],
          ['Grilled beef', 'Uruguayan cut over coals, house chimichurri.', 58000],
        ],
      },
      {
        seccion: 'To start',
        platos: [
          ['Desert platter', 'Chorizo, blood sausage, pork, arepa and creole potato.', 45000],
          ['Soup of the day', 'Whatever the Villavieja market brings.', 18000],
          ['Garden salad', 'Fresh vegetables, costeño cheese, passionfruit vinaigrette.', 24000],
        ],
      },
      {
        seccion: 'Meat and fish',
        platos: [
          ['Punta de anca steak', 'With roast potato and salad.', 54000],
          ['Grilled chicken breast', 'With coconut rice and patacón.', 38000],
          ['Fried mojarra', 'Whole, with patacón and salad.', 42000],
          ['BBQ pork', 'House sauce, slow cooked.', 46000],
        ],
      },
      {
        seccion: 'Vegetarian',
        platos: [
          ['Vegetable casserole', 'Regional vegetables baked with gratinéed cheese.', 32000],
          ['Pesto pasta', 'With confit tomato and fresh basil.', 30000],
        ],
      },
      {
        seccion: 'Breakfast',
        platos: [
          ['El Shaddai breakfast', 'Eggs your way, broth, arepa, fruit, fresh juice and coffee. Included for guests.', 0],
          ['Huilense calentado', 'With chicharrón, egg and arepa.', 22000],
        ],
      },
      {
        seccion: 'Bar',
        platos: [
          ['Signature cocktails', 'Made on the terrace, at sunset.', 28000],
          ['Local beer', 'Ice cold.', 8000],
          ['Fresh juices', 'Mango, passionfruit, lulo, soursop.', 9000],
        ],
      },
    ],
  },
  fotos: ['f20', 'f23', 'f55', 'f21', 'f22', 'f09', 'f26', 'f08'],
};

// ---------------------------------------------------------------------------
// Eventos
// ---------------------------------------------------------------------------

export const eventos = {
  es: [
    ['Matrimonios', 'El desierto entero como salón. Capacidad para 50 personas en terraza.', 'f25'],
    ['Cenas románticas', 'Mesa montada con decoración, menú de tres tiempos.', 'f21'],
    ['Aniversarios', 'Decoración de la habitación, desayuno en la cama y azotea privada.', 'f49'],
    ['Grados', 'Comedor privado para 35, brindis y menú a elegir.', 'f22'],
    ['Cumpleaños', 'Torta, decoración y piscina para todo el día.', 'f15'],
    ['Reuniones empresariales', 'Salón privado, WiFi y servicio de café durante toda la jornada.', 'f06'],
    ['Cine en pantalla gigante', 'Al aire libre, en la terraza, con el desierto de fondo.', 'f26'],
    ['Astroturismo', 'Salidas al observatorio y noches de cielo abierto desde la azotea.', 'f52'],
  ],
  en: [
    ['Weddings', 'The whole desert as your venue. Terrace seating for 50.', 'f25'],
    ['Romantic dinners', 'A table set with special decoration, three-course menu.', 'f21'],
    ['Anniversaries', 'Room decoration, breakfast in bed and a private rooftop.', 'f49'],
    ['Graduations', 'Private dining room for 35, toast and set menu.', 'f22'],
    ['Birthdays', 'Cake, decoration and the pool for the whole day.', 'f15'],
    ['Corporate meetings', 'Private room, WiFi and coffee service all day.', 'f06'],
    ['Big-screen cinema', 'Open air, on the terrace, with the desert behind.', 'f26'],
    ['Astrotourism', 'Observatory trips and open-sky nights from the rooftop.', 'f52'],
  ],
};

// ---------------------------------------------------------------------------
// Reseñas reales (Booking.com, 9,5/10 sobre 57 comentarios)
// ---------------------------------------------------------------------------

export const resenas = [
  { nombre: 'Brayan', pais: { es: 'Colombia', en: 'Colombia' }, texto: { es: 'La atención y las instalaciones son excelentes. La comida es un 10/10.', en: 'The service and the facilities are excellent. The food is a 10/10.' } },
  { nombre: 'José', pais: { es: 'Estados Unidos', en: 'United States' }, texto: { es: 'Excelente diseño, cada habitación con jacuzzi, buena decoración, un ambiente de mucha tranquilidad.', en: 'Excellent design, every room with a jacuzzi, lovely decoration, a deeply peaceful atmosphere.' } },
  { nombre: 'Valeria', pais: { es: 'Colombia', en: 'Colombia' }, texto: { es: 'Fui sola y desde que llegué me sentí tranquila, cómoda y bien recibida. El personal es demasiado atento.', en: 'I travelled alone and from the moment I arrived I felt calm, comfortable and welcome. The staff are incredibly attentive.' } },
  { nombre: 'Massimo', pais: { es: 'Colombia', en: 'Colombia' }, texto: { es: 'Las noches muy tranquilas, se escucha toda clase de insectos y ranas. Por la mañana uno se despierta con el canto de los pájaros.', en: 'Very quiet nights, you hear all kinds of insects and frogs. In the morning you wake to birdsong.' } },
  { nombre: 'Beatriz', pais: { es: 'Colombia', en: 'Colombia' }, texto: { es: 'La comida es muy deliciosa, felicitaciones al chef. Don Rafael es muy atento y cordial.', en: 'The food is delicious, congratulations to the chef. Don Rafael is attentive and warm.' } },
  { nombre: 'Kelly', pais: { es: 'Colombia', en: 'Colombia' }, texto: { es: 'Las instalaciones y los muebles están en excelentes condiciones, el ambiente y la decoración resaltan mucho.', en: 'The facilities and furniture are in excellent condition; the atmosphere and decoration really stand out.' } },
];

export const puntajes = [
  { cat: { es: 'Personal', en: 'Staff' }, n: 9.7 },
  { cat: { es: 'Ubicación', en: 'Location' }, n: 9.6 },
  { cat: { es: 'Calidad-precio', en: 'Value' }, n: 9.5 },
  { cat: { es: 'Instalaciones', en: 'Facilities' }, n: 9.3 },
  { cat: { es: 'Limpieza', en: 'Cleanliness' }, n: 9.3 },
  { cat: { es: 'Confort', en: 'Comfort' }, n: 9.2 },
];

// ---------------------------------------------------------------------------
// Galería
// ---------------------------------------------------------------------------

export const galeria: { foto: string; cat: string; alt: T }[] = [
  { foto: 'f52', cat: 'desierto', alt: { es: 'Vía Láctea sobre el Desierto de la Tatacoa', en: 'Milky Way over the Tatacoa Desert' } },
  { foto: 'f17', cat: 'desierto', alt: { es: 'Pareja al atardecer entre los cactus del desierto', en: 'Couple at sunset among the desert cacti' } },
  { foto: 'f14', cat: 'desierto', alt: { es: 'Atardecer en el Desierto de la Tatacoa', en: 'Sunset in the Tatacoa Desert' } },
  { foto: 'f53', cat: 'desierto', alt: { es: 'Paisaje del desierto al anochecer', en: 'Desert landscape at dusk' } },
  { foto: 'f54', cat: 'desierto', alt: { es: 'Arcillas rojas del Desierto de la Tatacoa', en: 'Red clay formations of the Tatacoa Desert' } },
  { foto: 'f19', cat: 'desierto', alt: { es: 'Salida nocturna al desierto', en: 'Night excursion into the desert' } },
  { foto: 'f31', cat: 'piscina', alt: { es: 'Jacuzzi al aire libre junto a las habitaciones', en: 'Outdoor jacuzzi beside the rooms' } },
  { foto: 'f05', cat: 'piscina', alt: { es: 'Piscina del hotel con palapa', en: 'Hotel pool with palapa' } },
  { foto: 'f13', cat: 'piscina', alt: { es: 'Piscina y jardines del hotel', en: 'Hotel pool and gardens' } },
  { foto: 'f24', cat: 'piscina', alt: { es: 'Piscina rodeada de palmeras', en: 'Pool surrounded by palm trees' } },
  { foto: 'f12', cat: 'piscina', alt: { es: 'Zona de piscina al mediodía', en: 'Pool area at midday' } },
  { foto: 'f56', cat: 'piscina', alt: { es: 'Huéspedes disfrutando de la piscina', en: 'Guests enjoying the pool' } },
  { foto: 'f61', cat: 'piscina', alt: { es: 'Baño en la piscina del hotel', en: 'Swimming in the hotel pool' } },
  { foto: 'f18', cat: 'piscina', alt: { es: 'Bañera de hidromasaje', en: 'Hot tub' } },
  { foto: 'f30', cat: 'habitaciones', alt: { es: 'Habitación doble con cama king', en: 'Double room with king bed' } },
  { foto: 'f28', cat: 'habitaciones', alt: { es: 'Habitación con detalles en azul', en: 'Room with blue detailing' } },
  { foto: 'f03', cat: 'habitaciones', alt: { es: 'Cama con dosel en habitación familiar', en: 'Canopy bed in the family room' } },
  { foto: 'f57', cat: 'habitaciones', alt: { es: 'Habitación familiar con balcón', en: 'Family room with balcony' } },
  { foto: 'f46', cat: 'habitaciones', alt: { es: 'Habitación doble en tonos claros', en: 'Double room in light tones' } },
  { foto: 'f44', cat: 'habitaciones', alt: { es: 'Habitación cuádruple', en: 'Quadruple room' } },
  { foto: 'f49', cat: 'habitaciones', alt: { es: 'Habitación decorada para aniversario', en: 'Room decorated for an anniversary' } },
  { foto: 'f35', cat: 'habitaciones', alt: { es: 'Baño privado de la habitación', en: 'Private bathroom' } },
  { foto: 'f20', cat: 'restaurante', alt: { es: 'Plato de carne del restaurante', en: 'Meat dish from the restaurant' } },
  { foto: 'f23', cat: 'restaurante', alt: { es: 'Cena servida con vino', en: 'Dinner served with wine' } },
  { foto: 'f55', cat: 'restaurante', alt: { es: 'Desayuno americano servido en la terraza', en: 'American breakfast served on the terrace' } },
  { foto: 'f21', cat: 'restaurante', alt: { es: 'Mesa montada para cena romántica', en: 'Table set for a romantic dinner' } },
  { foto: 'f09', cat: 'restaurante', alt: { es: 'Comedor bajo techo de palma', en: 'Dining area under a palm roof' } },
  { foto: 'f26', cat: 'restaurante', alt: { es: 'Fogata y parrilla en la terraza', en: 'Fire pit and grill on the terrace' } },
  { foto: 'f08', cat: 'hotel', alt: { es: 'Terraza cubierta con vista al desierto', en: 'Covered terrace overlooking the desert' } },
  { foto: 'f07', cat: 'hotel', alt: { es: 'Cama al aire libre en la azotea', en: 'Outdoor bed on the rooftop' } },
  { foto: 'f25', cat: 'hotel', alt: { es: 'Zona de descanso del hotel', en: 'Hotel lounge area' } },
  { foto: 'f11', cat: 'hotel', alt: { es: 'Gimnasio al aire libre', en: 'Outdoor gym' } },
  { foto: 'f40', cat: 'hotel', alt: { es: 'Entrada del hotel El Shaddai', en: 'Entrance to El Shaddai hotel' } },
  { foto: 'f58', cat: 'hotel', alt: { es: 'Balcón de las habitaciones', en: 'Room balcony' } },
  { foto: 'f60', cat: 'hotel', alt: { es: 'Sala común del hotel', en: 'Hotel common room' } },
  { foto: 'f01', cat: 'hotel', alt: { es: 'Solárium junto a la piscina', en: 'Sun deck by the pool' } },
];

export const categoriasGaleria: { id: string; nombre: T }[] = [
  { id: 'todo', nombre: { es: 'Todo', en: 'All' } },
  { id: 'desierto', nombre: { es: 'El desierto', en: 'The desert' } },
  { id: 'habitaciones', nombre: { es: 'Habitaciones', en: 'Rooms' } },
  { id: 'piscina', nombre: { es: 'Piscina y jacuzzi', en: 'Pool & jacuzzi' } },
  { id: 'restaurante', nombre: { es: 'Restaurante', en: 'Restaurant' } },
  { id: 'hotel', nombre: { es: 'El hotel', en: 'The hotel' } },
];
