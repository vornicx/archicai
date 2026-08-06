import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
/* Self-hosted webfonts. Serving them from our own origin instead of the Google
   Fonts CDN avoids sending visitor IP addresses to a third party without
   consent (art. 6 GDPR), which also keeps the site free of consent banners.

   Instrument Serif carries the display voice; its italic is the accent used on
   the key phrase of each headline. DM Sans is the reading face and IBM Plex
   Mono the technical one (eyebrows, labels, data). Only the weights the design
   system actually uses are loaded. */
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
