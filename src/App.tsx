import { Suspense, lazy, useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import ArchicHome from './pages/ArchicHome'
import SiteRouteSeo from './components/SiteRouteSeo'
import SiteErrorBoundary from './components/SiteErrorBoundary'
/* Secondary routes are split out of the main bundle: they are rarely the
   landing page, so keeping them out of the critical path helps LCP. */
const ArchicSitePage = lazy(() => import('./pages/ArchicSitePage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ServicePage = lazy(() => import('./pages/ServicePage'))
const GuidePage = lazy(() => import('./pages/GuidePage'))
const GuidesIndex = lazy(() => import('./pages/GuidesIndex'))
const ExplorationPage = lazy(() => import('./pages/ExplorationPage'))
import { LEGAL_PATHS, type LegalDocKey } from './legal/documents'
import { LanguageProvider, useLang } from './i18n/LanguageContext'
import { SERVICE_PAGES } from './seo/servicePages'
import { LOCAL_PAGES } from './seo/localPages'
import { INTENT_PAGES } from './seo/intentPages'
import { GUIDES, GUIDES_INDEX_PATH } from './content/guides'

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown
}

function SkipLink() {
  const { t } = useLang()
  return (
    <a href="#main-content" className="skip-link">
      {t.a11y.skip}
    </a>
  )
}

function RouteFallback() {
  const { lang } = useLang()
  return (
    <main
      id="main-content"
      className="as-route-fallback"
      role="status"
      aria-live="polite"
      aria-label={lang === 'es' ? 'Cargando Archic' : 'Loading Archic'}
      tabIndex={-1}
    >
      <div><span>ARCHIC</span><i /></div>
    </main>
  )
}

function SiteNavigationBehavior() {
  const location = useLocation()
  const navigate = useNavigate()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useEffect(() => {
    if (location.hash) {
      let id = location.hash.slice(1)
      try { id = decodeURIComponent(id) } catch { /* keep the literal hash id */ }
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    const changedRoute = previousPath.current !== location.pathname
    previousPath.current = location.pathname
    if (!changedRoute) return

    let observer: MutationObserver | null = null
    const focusMain = () => {
      const main = document.getElementById('main-content')
      if (!main || main.classList.contains('as-route-fallback')) return false
      main.focus({ preventScroll: true })
      return true
    }

    if (!focusMain()) {
      observer = new MutationObserver(() => {
        if (focusMain()) observer?.disconnect()
      })
      observer.observe(document.body, { childList: true, subtree: true })
    }

    const stopWaiting = window.setTimeout(() => observer?.disconnect(), 2500)
    return () => {
      observer?.disconnect()
      window.clearTimeout(stopWaiting)
    }
  }, [location.pathname])

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return

      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.hasAttribute('download') || anchor.getAttribute('aria-disabled') === 'true') return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.dataset.native === 'true') return

      const rawHref = anchor.getAttribute('href')
      if (!rawHref || rawHref.startsWith('#')) return

      let url: URL
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      if ((url.protocol !== 'http:' && url.protocol !== 'https:') || url.origin !== window.location.origin) return
      if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return

      const current = new URL(window.location.href)
      if (url.pathname === current.pathname && url.search === current.search && url.hash === current.hash) return

      event.preventDefault()
      const destination = `${url.pathname}${url.search}${url.hash}`
      const transitionDocument = document as TransitionDocument
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const update = () => navigate(destination)

      if (!reduceMotion && transitionDocument.startViewTransition) {
        transitionDocument.startViewTransition(update)
      } else {
        update()
      }
    }

    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [navigate])

  return null
}

const LEGAL_KEYS = Object.keys(LEGAL_PATHS) as LegalDocKey[]

const LEGAL_ROUTES = LEGAL_KEYS.flatMap((key) =>
  Object.values(LEGAL_PATHS[key]).flatMap((path) => [path, path.replace(/\/$/, '')]).map((path) => (
    <Route key={path} path={path} element={<LegalPage doc={key} />} />
  )),
)

const SERVICE_ROUTES = [...SERVICE_PAGES, ...LOCAL_PAGES, ...INTENT_PAGES].flatMap((page) =>
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

const EXPLORATION_ROUTES = [
  ['hospitality', 'hospitality'],
  ['mobility', 'mobility'],
  ['real-estate', 'real-estate'],
] as const

function App() {
  return (
    <LanguageProvider>
      <SiteNavigationBehavior />
      <SiteErrorBoundary>
        <div className="site-shell">
          <SkipLink />
          <div className="site-route-content">
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<ArchicHome />} />
                <Route path="/en/" element={<ArchicHome />} />
                {ARCHIC_ROUTES.flatMap(([slug, page]) => [
                  <Route key={`es-${slug}`} path={`/${slug}/`} element={<ArchicSitePage page={page} />} />,
                  <Route key={`es-bare-${slug}`} path={`/${slug}`} element={<ArchicSitePage page={page} />} />,
                  <Route key={`en-${slug}`} path={`/en/${slug}/`} element={<ArchicSitePage page={page} />} />,
                  <Route key={`en-bare-${slug}`} path={`/en/${slug}`} element={<ArchicSitePage page={page} />} />,
                ])}
                {EXPLORATION_ROUTES.flatMap(([slug, kind]) => [
                  <Route key={`exploration-es-${slug}`} path={`/explorations/${slug}/`} element={<ExplorationPage kind={kind} />} />,
                  <Route key={`exploration-es-bare-${slug}`} path={`/explorations/${slug}`} element={<ExplorationPage kind={kind} />} />,
                  <Route key={`exploration-en-${slug}`} path={`/en/explorations/${slug}/`} element={<ExplorationPage kind={kind} />} />,
                  <Route key={`exploration-en-bare-${slug}`} path={`/en/explorations/${slug}`} element={<ExplorationPage kind={kind} />} />,
                ])}
                {SERVICE_ROUTES}
                {GUIDE_ROUTES}
                {LEGAL_ROUTES}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <SiteRouteSeo />
            </Suspense>
          </div>
        </div>
      </SiteErrorBoundary>
    </LanguageProvider>
  )
}

export default App
