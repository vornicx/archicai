import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/space-grotesk/latin-400.css'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-600.css'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import './index.css'
import './styles/studio.css'
import './styles/archic-site.css'
import './styles/archic-phone.css'
import './styles/archic-system.css'
import './styles/archic-level5.css'
import './styles/archic-typography.css'
import './styles/archic-refinement.css'
import './styles/archic-seo-refresh.css'
import './styles/archic-2026.css'
import './styles/archic-2026-refinement.css'
import './styles/archic-product-objects.css'
import './styles/archic-seo-2026.css'
import './styles/archic-editorial-2026.css'
import './styles/archic-interactions.css'
import './styles/archic-route-transitions.css'
import './styles/archic-explorations.css'
import './styles/archic-home-explorations.css'
import './styles/archic-exploration-product-ui.css'
import './styles/archic-team-contact.css'
import './styles/archic-standard-2026.css'
import './styles/archic-flagship.css'
import './styles/archic-flagship-rebuild.css'
import './styles/archic-flagship-demo.css'
import './styles/archic-reveal-guard.css'
import './styles/archic-luxury-audit-fix.css'
/* Safety layers stay last. Readability is part of the safety contract. */
import './styles/archic-contrast.css'
import './styles/archic-readability.css'
import './styles/archic-visibility-guard.css'
import './styles/archic-surface-contract.css'
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
