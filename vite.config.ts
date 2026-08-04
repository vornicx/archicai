import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
      },
    },
  },
})
