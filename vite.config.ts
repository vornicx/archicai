import { resolve } from 'node:path'
import { readdirSync, existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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

const ARCHIC_SLUGS = ['presence', 'control', 'business', 'studio', 'contact']
const ARCHIC_DIRS = [
  ...ARCHIC_SLUGS,
  ...ARCHIC_SLUGS.map((slug) => `en/${slug}`),
]

const pageInputs = Object.fromEntries(
  [...LANDING_DIRS, ...GUIDE_DIRS, 'guias', ...ARCHIC_DIRS]
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
