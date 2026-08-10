import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import ArchicHome from './pages/ArchicHome'
import ArchicSitePage from './pages/ArchicSitePage'
/* Secondary routes are split out of the main bundle: they are rarely the
   landing page, so keeping them out of the critical path helps LCP. */
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ServicePage = lazy(() => import('./pages/ServicePage'))
const GuidePage = lazy(() => import('./pages/GuidePage'))
const GuidesIndex = lazy(() => import('./pages/GuidesIndex'))
import { LEGAL_PATHS, type LegalDocKey } from './legal/documents'
import { LanguageProvider, useLang } from './i18n/LanguageContext'
import { SERVICE_PAGES } from './seo/servicePages'
import { LOCAL_PAGES } from './seo/localPages'
import { GUIDES, GUIDES_INDEX_PATH } from './content/guides'

function SkipLink() {
  const { t } = useLang()
  return (
    <a href="#main-content" className="skip-link">
      {t.a11y.skip}
    </a>
  )
}

const LEGAL_KEYS = Object.keys(LEGAL_PATHS) as LegalDocKey[]

const LEGAL_ROUTES = LEGAL_KEYS.flatMap((key) =>
  Object.values(LEGAL_PATHS[key]).flatMap((path) => [path, path.replace(/\/$/, '')]).map((path) => (
    <Route key={path} path={path} element={<LegalPage doc={key} />} />
  )),
)

const SERVICE_ROUTES = [...SERVICE_PAGES, ...LOCAL_PAGES].flatMap((page) =>
  [page.path, page.path.replace(/\/$/, '')].map((path) => (
    <Route key={path} path={path} element={<ServicePage page={page} />} />
  )),
)

const GUIDE_ROUTES = [
  ...[GUIDES_INDEX_PATH, GUIDES_INDEX_PATH.replace(/\/$/, '')].map((path) => (
    <Route key={path} path={path} element={<GuidesIndex />} />
  )),
  ...GUIDES.flatMap((guide) =>
    [guide.path, guide.path.replace(/\/$/, '')].map((path) => (
      <Route key={path} path={path} element={<GuidePage guide={guide} />} />
    )),
  ),
]

const ARCHIC_ROUTES = [
  ['presence', 'presence'],
  ['control', 'control'],
  ['business', 'business'],
  ['studio', 'studio'],
  ['contact', 'contact'],
] as const

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
              {ARCHIC_ROUTES.flatMap(([slug, page]) => [
                <Route key={`es-${slug}`} path={`/${slug}/`} element={<ArchicSitePage page={page} />} />,
                <Route key={`es-bare-${slug}`} path={`/${slug}`} element={<ArchicSitePage page={page} />} />,
                <Route key={`en-${slug}`} path={`/en/${slug}/`} element={<ArchicSitePage page={page} />} />,
                <Route key={`en-bare-${slug}`} path={`/en/${slug}`} element={<ArchicSitePage page={page} />} />,
              ])}
              {SERVICE_ROUTES}
              {GUIDE_ROUTES}
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
