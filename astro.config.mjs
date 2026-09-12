import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// Una sola fuente para el dominio absoluto. De aquí salen el canonical, los
// hreflang, el og:image y el sitemap: si difieren, Google recibe señales
// contradictorias sobre cuál es la versión buena del sitio.
//
//   1. PUBLIC_SITIO      — para fijarlo a mano (dominio definitivo).
//   2. Vercel            — la URL de producción del despliegue, para que la
//                          maqueta declare el dominio donde de verdad vive.
//   3. Respaldo          — el dominio definitivo, para builds locales.
//
// El .replace final quita la barra sobrante: una base con barra final produce
// `https://sitio.com//sitemap.xml`, que es un 404 silencioso.
const SITIO = (
  process.env.PUBLIC_SITIO ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://elshaddaipuntadeleste.com'
).replace(/\/+$/, '');

export default defineConfig({
  site: SITIO,
  integrations: [sitemap(), icon()],
  vite: { plugins: [tailwind()] },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
