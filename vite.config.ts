import { resolve } from 'node:path'
import { readdirSync, existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* Las landings y las guías viven en carpetas propias, generadas por
   `npm run gen:pages`. Se recogen del sistema de ficheros en lugar de
   registrarse a mano para que añadir una página nueva no exija tocar también
   esta configuración — y que olvidarlo deje la página fuera del build. */
const dirsIn = (base: string) =>
  existsSync(base)
    ? readdirSync(base, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    : []

const LANDING_DIRS = dirsIn(__dirname).filter((name) =>
  /^(diseno-web-|mantenimiento-web|desarrollo-web-)/.test(name),
)

const GUIDE_DIRS = dirsIn(resolve(__dirname, 'guias')).map((name) => `guias/${name}`)

const pageInputs = Object.fromEntries(
  [...LANDING_DIRS, ...GUIDE_DIRS, 'guias']
    .map((name) => [name, resolve(__dirname, `${name}/index.html`)] as const)
    .filter(([, file]) => existsSync(file)),
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
        ...pageInputs,
      },
    },
  },
})
