import { Helmet } from 'react-helmet-async'
import '@fontsource/instrument-serif/latin-400.css'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { GUIDES_INDEX_PATH, type Guide, type GuideBlock } from '../content/guides'
import { buildGuideGraph } from '../seo/guideSchema'

const ORIGIN = 'https://archic.es'

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function renderBlock(block: GuideBlock, key: string) {
  switch (block.kind) {
    case 'p':
      return <p key={key}>{block.text}</p>
    case 'list':
      return <ul key={key}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
    case 'steps':
      return <ol key={key}>{block.items.map((item) => <li key={item}>{item}</li>)}</ol>
    case 'table':
      return (
        <div key={key} className="as-table-scroll" tabIndex={0} role="region" aria-label="Tabla comparativa">
          <table>
            <thead><tr>{block.head.map((cell, i) => <th key={cell || `col-${i}`} scope="col">{cell}</th>)}</tr></thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={`${row[0]}-${i}`}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'callout':
      return <aside key={key} className="as-editorial-callout"><strong>{block.title}</strong><p>{block.text}</p></aside>
  }
}

export default function GuidePage({ guide }: { guide: Guide }) {
  const canonical = `${ORIGIN}${guide.path}`

  return (
    <div className="as-site as-editorial-page" data-quality-standard="archic-design-system-1.0.0">
      <Helmet htmlAttributes={{ lang: 'es' }}>
        <title>{guide.metaTitle}</title>
        <meta name="description" content={guide.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={guide.metaTitle} />
        <meta property="og:description" content={guide.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Archic" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:image" content={`${ORIGIN}/og-image.png?v=20260812`} />
        <meta property="article:published_time" content={guide.published} />
        <meta property="article:modified_time" content={guide.updated} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={guide.metaTitle} />
        <meta name="twitter:description" content={guide.description} />
        <meta name="twitter:image" content={`${ORIGIN}/og-image.png?v=20260812`} />
        <script type="application/ld+json">{JSON.stringify(buildGuideGraph(guide))}</script>
      </Helmet>

      <StudioExperience />
      <StudioHeader />

      <main id="main-content" tabIndex={-1}>
      <article>
        <header className="as-article-head">
          <div data-reveal="hero">
            <div className="as-seo-breadcrumb"><a href="/">Archic</a><span>/</span><a href={GUIDES_INDEX_PATH}>Guías</a><span>/</span><span>{guide.title}</span></div>
            <div className="as-seo-layer">ARCHIC / GUÍA · {guide.readingMinutes} MIN</div>
            <h1>{guide.title}</h1>
            <p className="as-article-answer">{guide.answer}</p>
            <p className="as-article-meta">
              Publicada el <time dateTime={guide.published}>{formatDate(guide.published)}</time>
              {guide.updated !== guide.published && <> · Revisada el <time dateTime={guide.updated}>{formatDate(guide.updated)}</time></>}
            </p>
          </div>
        </header>

        <div className="as-article-wrap">
          <nav className="as-article-toc" aria-label="Contenido de la guía">
            <span>EN ESTA GUÍA</span>
            <ol>
              {guide.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}
              <li><a href="#faq">Preguntas frecuentes</a></li>
            </ol>
          </nav>

          <div className="as-article-content">
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.heading}</h2>
                {section.blocks.map((block, i) => renderBlock(block, `${section.id}-${i}`))}
              </section>
            ))}

            <section id="faq">
              <h2>Preguntas frecuentes</h2>
              <div className="as-seo-faq">
                {guide.faq.map((item) => <details key={item.q}><summary><h3>{item.q}</h3></summary><p>{item.a}</p></details>)}
              </div>
            </section>

            <aside className="as-article-cta">
              <div className="as-seo-layer">DE LA GUÍA AL SISTEMA</div>
              <h2>¿Quieres aplicarlo a tu negocio?</h2>
              <p>Cuéntanos qué quieres mejorar. Archic trabaja sobre tres capas: Presence para lo que ve el cliente, Control para la operación privada y Business para software, automatización e integraciones.</p>
              <a className="as-btn as-btn-metal" href="/contact/">Hablar de un proyecto<i className="as-arrow" aria-hidden="true" /></a>
            </aside>

            {guide.related.length > 0 && (
              <section>
                <h2>Seguir leyendo</h2>
                <div className="as-seo-related as-editorial-related">
                  {guide.related.map((link) => <a key={link.href} href={link.href} className="as-seo-chip">{link.label}</a>)}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
      </main>

      <StudioFooter />
    </div>
  )
}
