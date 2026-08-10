import { Helmet } from 'react-helmet-async'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { GUIDES, GUIDES_INDEX_PATH } from '../content/guides'
import { buildGuidesIndexGraph, GUIDES_INDEX_META } from '../seo/guideSchema'
import { useRevealOnScroll } from '../useReveal'

const ORIGIN = 'https://archic.es'

export default function GuidesIndex() {
  useRevealOnScroll()
  const canonical = `${ORIGIN}${GUIDES_INDEX_PATH}`

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'es' }}>
        <title>{GUIDES_INDEX_META.title}</title>
        <meta name="description" content={GUIDES_INDEX_META.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={GUIDES_INDEX_META.title} />
        <meta property="og:description" content={GUIDES_INDEX_META.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:image" content={`${ORIGIN}/og-image.png?v=3`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(buildGuidesIndexGraph())}</script>
      </Helmet>

      <div id="top">
        <SiteHeader />

        <nav className="ar-breadcrumb" aria-label="Ruta de navegación">
          <div className="ar-container">
            <a href="/">Inicio</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Guías</span>
          </div>
        </nav>

        <section className="ar-hero ar-hero-compact">
          <div className="ar-container">
            <p className="ar-eyebrow">Guías</p>
            <h1 className="ar-hero-title">{GUIDES_INDEX_META.heading}</h1>
            <p className="ar-hero-sub">{GUIDES_INDEX_META.description}</p>
            <p className="ar-hero-note">
              Sin listas de «10 trucos». Documentos que se revisan cuando cambia lo que cuentan.
            </p>
          </div>
        </section>

        <section className="ar-section ar-section-alt">
          <div className="ar-container">
            <div className="ar-guide-cards">
              {GUIDES.map((guide) => (
                <article key={guide.path} className="ar-guide-card" data-reveal="out">
                  <p className="ar-note">{guide.readingMinutes} min de lectura</p>
                  <h2>
                    <a href={guide.path}>{guide.title}</a>
                  </h2>
                  <p>{guide.description}</p>
                  <span className="ar-service-link">Leer la guía →</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  )
}
