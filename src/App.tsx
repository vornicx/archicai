import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import ArchicHome from './pages/ArchicHome'
/* Secondary routes are split out of the main bundle: they are rarely the
   landing page, so keeping them out of the critical path helps LCP. */
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ServicePage = lazy(() => import('./pages/ServicePage'))
import { LEGAL_PATHS, type LegalDocKey } from './legal/documents'
import { LanguageProvider, useLang } from './i18n/LanguageContext'
import { SERVICE_PAGES } from './seo/servicePages'
import { LOCAL_PAGES } from './seo/localPages'

function SkipLink() {
  const { t } = useLang()
  return (
    <a href="#main-content" className="skip-link">
      {t.a11y.skip}
    </a>
  )
}

const LEGAL_KEYS = Object.keys(LEGAL_PATHS) as LegalDocKey[]

/**
 * Each legal document is reachable at its Spanish and English path. Both the
 * trailing-slash and bare forms are registered so a hand-typed URL resolves
 * client-side even before GitHub Pages issues its canonical redirect.
 */
const LEGAL_ROUTES = LEGAL_KEYS.flatMap((key) =>
  Object.values(LEGAL_PATHS[key]).flatMap((path) => [path, path.replace(/\/$/, '')]).map((path) => (
    <Route key={path} path={path} element={<LegalPage doc={key} />} />
  )),
)

/* Una URL por intención de búsqueda: cada landing de servicio o local responde
   a una keyword distinta y tiene su propio HTML estático. */
const SERVICE_ROUTES = [...SERVICE_PAGES, ...LOCAL_PAGES].flatMap((page) =>
  [page.path, page.path.replace(/\/$/, '')].map((path) => (
    <Route key={path} path={path} element={<ServicePage page={page} />} />
  )),
)

function App() {
  return (
    <LanguageProvider>
      <div className="site-shell">
        <SkipLink />
        <main id="main-content">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<ArchicHome />} />
              <Route path="/en/" element={<ArchicHome />} />
              {SERVICE_ROUTES}
              {LEGAL_ROUTES}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </LanguageProvider>
  )
}

export default App
