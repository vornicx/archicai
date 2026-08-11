import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { GUIDES, GUIDES_INDEX_PATH } from '../content/guides'
import { buildGuidesIndexGraph, GUIDES_INDEX_META } from '../seo/guideSchema'

const ORIGIN = 'https://archic.es'

export default function GuidesIndex() {
  const canonical = `${ORIGIN}${GUIDES_INDEX_PATH}`

  return (
    <div className="as-site as-editorial-page">
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

      <StudioExperience />
      <StudioHeader />

      <section className="as-editorial-hero">
        <div data-reveal="hero">
          <div className="as-seo-breadcrumb"><a href="/">Archic</a><span>/</span><span>Guías</span></div>
          <div className="as-seo-layer">ARCHIC / NOTAS Y GUÍAS</div>
          <h1>Decisiones digitales<br /><em>con más criterio.</em></h1>
          <p>{GUIDES_INDEX_META.description} Documentos prácticos sobre presencia, operaciones y software para decidir mejor antes de construir.</p>
        </div>
      </section>

      <section className="as-seo-section as-seo-light">
        <div className="as-seo-section-head" data-reveal>
          <div className="as-seo-index">BIBLIOTECA / {String(GUIDES.length).padStart(2, '0')}</div>
          <div>
            <h2>Menos contenido por publicar.<br /><em>Más utilidad real.</em></h2>
            <div className="as-seo-section-copy" style={{ marginTop: 28 }}><p>No escribimos para llenar un blog. Publicamos cuando una pregunta merece una respuesta suficientemente clara como para ayudar a una empresa a tomar una decisión.</p></div>
          </div>
        </div>

        <div className="as-guide-grid">
          {GUIDES.map((guide, index) => (
            <article className="as-guide-card" key={guide.path} data-reveal>
              <span>0{index + 1} · {guide.readingMinutes} MIN</span>
              <h2><a href={guide.path}>{guide.title}</a></h2>
              <p>{guide.description}</p>
              <a href={guide.path}>Leer la guía <i className="as-arrow" aria-hidden="true" /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="as-seo-close">
        <div data-reveal>
          <div className="as-seo-layer">EMPEZAR UN PROYECTO</div>
          <h2>La guía puede orientar.<br /><em>El proyecto necesita contexto.</em></h2>
          <p>Si ya sabes qué quieres mejorar en tu presencia, operación o software, cuéntanos el negocio y el resultado esperado.</p>
        </div>
        <a className="as-btn as-btn-metal" href="/contact/">Hablar con Archic<i className="as-arrow" aria-hidden="true" /></a>
      </section>

      <StudioFooter />
    </div>
  )
}
