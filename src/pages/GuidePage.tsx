import { Helmet } from 'react-helmet-async'
import { CONTACT_MAIL } from '../i18n/content'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { GUIDES_INDEX_PATH, type Guide, type GuideBlock } from '../content/guides'
import { buildGuideGraph } from '../seo/guideSchema'
import { ArchRule } from '../art/primitives'

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
      return (
        <ul key={key} className="ar-guide-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'steps':
      return (
        <ol key={key} className="ar-guide-steps">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )
    case 'table':
      /* La tabla se desborda en móvil por diseño: el contenedor hace scroll
         horizontal en lugar de comprimir las columnas hasta que no se lean. */
      return (
        <div key={key} className="ar-table-scroll" tabIndex={0} role="region" aria-label="Tabla comparativa">
          <table className="ar-guide-table">
            <thead>
              <tr>
                {block.head.map((cell, i) => (
                  <th key={cell || `col-${i}`} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={cell} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={`${row[0]}-${i}`}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'callout':
      return (
        <aside key={key} className="ar-callout">
          <p className="ar-callout-title">{block.title}</p>
          <p>{block.text}</p>
        </aside>
      )
  }
}

export default function GuidePage({ guide }: { guide: Guide }) {
  const canonical = `${ORIGIN}${guide.path}`

  return (
    <>
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
        <meta property="og:image" content={`${ORIGIN}/og-image.png`} />
        <meta property="article:published_time" content={guide.published} />
        <meta property="article:modified_time" content={guide.updated} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={guide.metaTitle} />
        <meta name="twitter:description" content={guide.description} />
        <meta name="twitter:image" content={`${ORIGIN}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(buildGuideGraph(guide))}</script>
      </Helmet>

      <div id="top">
        <SiteHeader />

        <nav className="ar-breadcrumb" aria-label="Ruta de navegación">
          <div className="ar-container">
            <a href="/">Inicio</a>
            <span aria-hidden="true">/</span>
            <a href={GUIDES_INDEX_PATH}>Guías</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{guide.title}</span>
          </div>
        </nav>

        <article className="ar-guide">
          <header className="ar-container ar-guide-head">
            <p className="ar-eyebrow">Guía · {guide.readingMinutes} min de lectura</p>
            <h1 className="ar-guide-title">{guide.title}</h1>
            {/* Respuesta completa antes de cualquier desarrollo: quien llega
                desde una búsqueda resuelve su duda sin bajar, y es el bloque
                que citan tanto el fragmento destacado como los asistentes. */}
            <p className="ar-guide-answer">{guide.answer}</p>
            <p className="ar-guide-meta">
              Publicada el <time dateTime={guide.published}>{formatDate(guide.published)}</time>
              {guide.updated !== guide.published && (
                <>
                  {' · '}revisada el <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
                </>
              )}
            </p>
          </header>

          <div className="ar-container ar-guide-body">
            <nav className="ar-guide-toc" aria-label="Contenido de la guía">
              <p className="ar-footer-col-title">En esta guía</p>
              <ol>
                {guide.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.heading}</a>
                  </li>
                ))}
                <li>
                  <a href="#faq">Preguntas frecuentes</a>
                </li>
              </ol>
            </nav>

            <div className="ar-guide-content">
              {guide.sections.map((section) => (
                <section key={section.id} id={section.id} className="ar-guide-section">
                  <h2>{section.heading}</h2>
                  {section.blocks.map((block, i) => renderBlock(block, `${section.id}-${i}`))}
                </section>
              ))}

              <section id="faq" className="ar-guide-section">
                <h2>Preguntas frecuentes</h2>
                <div className="ar-faq">
                  {guide.faq.map((item) => (
                    <details key={item.q} className="ar-faq-item">
                      <summary>
                        <h3>{item.q}</h3>
                      </summary>
                      <p>{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>

              <aside className="ar-guide-cta">
                <ArchRule className="ar-answer-rule" />
                <h2>¿Tienes un proyecto entre manos?</h2>
                <p>
                  Cuéntanos en dos líneas qué necesitas y te respondemos con un enfoque concreto y un
                  rango de precio, sin compromiso.
                </p>
                <div className="ar-hero-ctas" style={{ marginBottom: 0 }}>
                  <a href="/#contacto" className="ar-btn ar-btn-primary">
                    Cuéntanos tu proyecto
                  </a>
                  <a href={`mailto:${CONTACT_MAIL}`} className="ar-btn ar-btn-ghost">
                    {CONTACT_MAIL}
                  </a>
                </div>
              </aside>

              <section className="ar-guide-section">
                <h2>Seguir leyendo</h2>
                <div className="ar-chips">
                  {guide.related.map((link) => (
                    <a key={link.href} href={link.href} className="ar-chip ar-chip-link">
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </article>

        <SiteFooter />
      </div>
    </>
  )
}
