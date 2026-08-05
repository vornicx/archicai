import { resolve } from 'node:path'
import { readdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* Las landings de servicio viven en carpetas propias en la raíz y se generan
   con `npm run gen:pages`. Se recogen automáticamente para no tener que
   registrar cada nueva página a mano. */
const SERVICE_DIRS = readdirSync(__dirname, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => /^(diseno-web-|mantenimiento-web|desarrollo-web-)/.test(name))

const serviceInputs = Object.fromEntries(
  SERVICE_DIRS.map((name) => [name, resolve(__dirname, `${name}/index.html`)]),
)

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'en/index.html'),
        // Legal pages need real HTML files: GitHub Pages serves static paths
        // and has no SPA fallback, so a client-side-only route would 404.
        avisoLegal: resolve(__dirname, 'aviso-legal/index.html'),
        privacidad: resolve(__dirname, 'privacidad/index.html'),
        cookies: resolve(__dirname, 'cookies/index.html'),
        enLegalNotice: resolve(__dirname, 'en/legal-notice/index.html'),
        enPrivacy: resolve(__dirname, 'en/privacy/index.html'),
        enCookies: resolve(__dirname, 'en/cookies/index.html'),
        ...serviceInputs,
      },
    },
  },
})
