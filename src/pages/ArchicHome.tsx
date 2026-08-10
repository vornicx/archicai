import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_MAIL } from '../i18n/content'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioContact from '../components/StudioContact'
import { STUDIO, type SystemImage } from '../content/studio'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'

const CONCEPT_IMAGES: Record<SystemImage, string> = {
  hospitality: '/img/archic-hospitality-system.webp',
  automotive: '/img/archic-automotive-system.webp',
  yachting: '/img/archic-yachting-system.webp',
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-sx-reveal]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    nodes.forEach((node) => io.observe(node))
    return () => io.disconnect()
  }, [])
}

function ArchicMark() {
  return <img className="sx-mark" src="/brand/archic-mark-light.svg" alt="" width={160} height={160} />
}

export default function ArchicHome() {
  const { lang } = useLang()
  const s = STUDIO[lang]
  const canonicalUrl = homeCanonical(lang)
  const structuredData = buildHomeGraph(lang)
  useReveal()

  return (
    <>
      <Helmet htmlAttributes={{ lang }}>
        <title>{s.meta.title}</title>
        <meta name="description" content={s.meta.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/" />
        <meta property="og:title" content={s.meta.ogTitle} />
        <meta property="og:description" content={s.meta.ogDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
        <meta property="og:locale:alternate" content={lang === 'es' ? 'en_US' : 'es_ES'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={s.meta.ogTitle} />
        <meta name="twitter:description" content={s.meta.ogDescription} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="sx" id="top">
        <StudioHeader />

        <section className="sx-hero">
          <div className="sx-hero-copy">
            <p className="sx-eyebrow">{s.hero.eyebrow}</p>
            <h1 className="sx-display">
              {s.hero.title} <span>{s.hero.titleAccent}</span>
            </h1>
            <p className="sx-lede sx-hero-lede">{s.hero.lead}</p>
            <div className="sx-actions">
              <a className="sx-btn sx-btn-primary" href="#contact">
                {s.hero.ctaPrimary}<span aria-hidden="true">↗</span>
              </a>
              <a className="sx-textlink" href="#capabilities">
                {s.hero.ctaSecondary}<span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="sx-system-canvas" aria-label={s.system.title + ' ' + s.system.titleB}>
            <div className="sx-canvas-grid" aria-hidden="true" />
            <div className="sx-canvas-orbit sx-canvas-orbit-a" aria-hidden="true" />
            <div className="sx-canvas-orbit sx-canvas-orbit-b" aria-hidden="true" />
            <div className="sx-canvas-core" aria-hidden="true">
              <ArchicMark />
              <span>ARCHIC</span>
            </div>
            {s.hero.nodes.map((node, index) => (
              <div key={node.name} className={`sx-node sx-node-${index + 1}`} data-sx-reveal>
                <div className="sx-node-topline">
                  <span>{node.code}</span>
                  <i aria-hidden="true" />
                </div>
                <strong>{node.name}</strong>
                <small>{node.line}</small>
              </div>
            ))}
            <span className="sx-signal sx-signal-1" aria-hidden="true" />
            <span className="sx-signal sx-signal-2" aria-hidden="true" />
            <span className="sx-signal sx-signal-3" aria-hidden="true" />
          </div>

          <div className="sx-hero-meta" aria-hidden="true">
            <span>{s.hero.metaLeft}</span>
            <span>{s.hero.metaRight}</span>
          </div>
        </section>

        <section id="studio" className="sx-statement">
          <div className="sx-statement-grid">
            <p className="sx-kicker">{s.statement.kicker}</p>
            <h2 className="sx-title sx-title-dark">
              {s.statement.titleA}<br /><span>{s.statement.titleB}</span>
            </h2>
            <div className="sx-statement-side">
              <p>{s.statement.body}</p>
              <ul>
                {s.statement.points.map((point) => (
                  <li key={point}><span aria-hidden="true">↗</span>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="capabilities" className="sx-capabilities">
          <div className="sx-section-intro">
            <p className="sx-kicker">{s.system.kicker}</p>
            <div>
              <h2 className="sx-title">{s.system.title}<br /><span>{s.system.titleB}</span></h2>
              <p className="sx-lede">{s.system.lead}</p>
            </div>
          </div>

          <div className="sx-layer-list">
            {s.system.steps.map((step) => (
              <article key={step.name} className="sx-layer" data-sx-reveal>
                <div className="sx-layer-index">{step.code}</div>
                <div className="sx-layer-name">
                  <h3>{step.name}</h3>
                  <span>{step.label}</span>
                </div>
                <p>{step.desc}</p>
                <span className="sx-layer-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
          <p className="sx-care">{s.system.care}</p>
        </section>

        <section id="systems" className="sx-concepts">
          <div className="sx-concepts-head">
            <div>
              <p className="sx-kicker">{s.concepts.kicker}</p>
              <h2 className="sx-title sx-title-dark">{s.concepts.title}</h2>
            </div>
            <p className="sx-concepts-note">{s.concepts.note}</p>
          </div>

          <div className="sx-concept-grid">
            {s.concepts.items.map((item) => (
              <article key={item.title} className="sx-concept-card" data-sx-reveal>
                <div className="sx-concept-media">
                  <img src={CONCEPT_IMAGES[item.image]} alt={item.imageAlt} width={1664} height={936} loading="lazy" decoding="async" />
                  <span className="sx-concept-badge">CONCEPT / NOT CLIENT WORK</span>
                  <div className="sx-concept-ui" aria-hidden="true">
                    <span>{item.index}</span>
                    <div><b>LIVE</b><i /></div>
                  </div>
                </div>
                <div className="sx-concept-copy">
                  <div className="sx-concept-meta"><span>{item.sector}</span><span>{item.index}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <ul>
                    {item.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sx-showcase">
          <div className="sx-showcase-copy">
            <p className="sx-kicker">{s.showcase.kicker}</p>
            <h2 className="sx-title sx-title-dark">{s.showcase.title}<br /><span>{s.showcase.titleB}</span></h2>
            <p>{s.showcase.lead}</p>
            <ul>
              {s.showcase.bullets.map((bullet) => <li key={bullet}><span aria-hidden="true">✓</span>{bullet}</li>)}
            </ul>
          </div>

          <div className="sx-product-stage" data-sx-reveal>
            <div className="sx-browser">
              <div className="sx-browser-bar">
                <div><i /><i /><i /></div>
                <span>{s.showcase.browserLabel}</span>
                <b>ARCHIC</b>
              </div>
              <div className="sx-dashboard">
                <aside className="sx-dash-nav">
                  <img src="/brand/archic-mark-light.svg" alt="" width={30} height={30} />
                  <strong>Control</strong>
                  <nav aria-hidden="true">
                    <span className="is-active">{s.showcase.dashboard}</span>
                    <span>{s.showcase.mobileTitle}</span>
                    <span>{s.showcase.guests}</span>
                    <span>{s.showcase.notes}</span>
                  </nav>
                  <em>ARCHIC / 01</em>
                </aside>
                <div className="sx-dash-main">
                  <div className="sx-dash-heading">
                    <div><span>CONTROL</span><h3>{s.showcase.dashboard}</h3></div>
                    <button type="button" aria-label="Demo control">•••</button>
                  </div>
                  <div className="sx-metric-grid">
                    <div><span>{s.showcase.bookings}</span><strong>28</strong><small>+12%</small></div>
                    <div><span>{s.showcase.occupancy}</span><strong>84%</strong><small>+6%</small></div>
                    <div><span>{s.showcase.direct}</span><strong>67%</strong><small>+18%</small></div>
                  </div>
                  <div className="sx-dash-panels">
                    <div className="sx-dash-panel sx-activity">
                      <div className="sx-panel-head"><span>{s.showcase.activity}</span><b>LIVE</b></div>
                      <div className="sx-activity-row"><i>20:00</i><strong>{s.showcase.nextService}</strong><span>12</span></div>
                      <div className="sx-activity-row"><i>19:42</i><strong>{s.showcase.returning}</strong><span>42%</span></div>
                      <div className="sx-activity-row"><i>19:31</i><strong>{s.showcase.notes}</strong><span>08</span></div>
                    </div>
                    <div className="sx-dash-panel sx-chart">
                      <div className="sx-panel-head"><span>{s.showcase.bookings}</span><b>7D</b></div>
                      <div className="sx-chart-bars" aria-hidden="true">
                        {[38, 52, 44, 68, 61, 78, 92].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sx-phone">
              <div className="sx-phone-notch" />
              <div className="sx-phone-head"><span>ARCHIC</span><b>{s.showcase.mobileTitle}</b></div>
              <div className="sx-phone-date">TODAY / 03</div>
              <div className="sx-phone-list">
                {s.showcase.mobileRows.map((row) => (
                  <div key={row.time + row.name}>
                    <span>{row.time}</span>
                    <strong>{row.name}</strong>
                    <small>{row.meta}</small>
                  </div>
                ))}
              </div>
              <button type="button" aria-label="Add booking">+</button>
            </div>
          </div>
        </section>

        <section id="sectors" className="sx-sectors">
          <div className="sx-sectors-head">
            <p className="sx-kicker">{s.sectors.kicker}</p>
            <h2 className="sx-title">{s.sectors.title}</h2>
            <p>{s.sectors.note}</p>
          </div>
          <div className="sx-sector-list">
            {s.sectors.items.map((item, index) => (
              <div key={item.name} className="sx-sector-row" data-sx-reveal>
                <span>0{index + 1}</span><h3>{item.name}</h3><p>{item.line}</p><i aria-hidden="true">↗</i>
              </div>
            ))}
          </div>
        </section>

        <section className="sx-process">
          <div className="sx-process-copy">
            <p className="sx-kicker">{s.process.kicker}</p>
            <h2 className="sx-title sx-title-dark">{s.process.title}</h2>
            <p>{s.process.lead}</p>
          </div>
          <div className="sx-process-steps">
            {s.process.steps.map((step) => (
              <article key={step.name} data-sx-reveal>
                <span>{step.code}</span><h3>{step.name}</h3><p>{step.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="sx-closing">
          <div className="sx-closing-copy">
            <p className="sx-kicker">{s.cta.label}</p>
            <h2 className="sx-title">{s.cta.title}<br /><span>{s.cta.titleAccent}</span></h2>
            <p className="sx-lede">{s.cta.lead}</p>
            <p className="sx-mail-label">{s.cta.mailLabel}</p>
            <a className="sx-mail" href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
          </div>
          <StudioContact />
        </section>

        <StudioFooter />
      </div>
    </>
  )
}
