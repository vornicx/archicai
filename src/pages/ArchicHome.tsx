import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_MAIL } from '../i18n/content'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioContact from '../components/StudioContact'
import { STUDIO } from '../content/studio'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'

import heroImage from '../assets/hero-marbella.jpg'
import workBocana from '../assets/work-bocana.jpg'
import workAutomotive from '../assets/work-automotive.jpg'
import workRealestate from '../assets/work-realestate.jpg'

const PROJECT_IMAGES = {
  bocana: workBocana,
  automotive: workAutomotive,
  realestate: workRealestate,
} as const

/** Revelado al hacer scroll: una sola observación por elemento, sin librerías. */
function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-sx-reveal]'))
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'))
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
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
}

export default function ArchicHome() {
  const { lang } = useLang()
  const s = STUDIO[lang]
  const canonicalUrl = homeCanonical(lang)
  const structuredData = buildHomeGraph(lang)
  const [openLayer, setOpenLayer] = useState(0)
  const mainRef = useRef<HTMLDivElement>(null)
  useReveal()

  return (
    <>
      <Helmet htmlAttributes={{ lang }}>
        <title>{s.meta.title}</title>
        <meta name="description" content={s.meta.description} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
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

      <div className="sx" ref={mainRef} id="top">
        <StudioHeader />

        {/* 01 — HERO */}
        <section className="sx-hero">
          <div className="sx-hero-media">
            <img
              src={heroImage}
              alt={s.hero.imageAlt}
              width={1920}
              height={1200}
              {...{ fetchpriority: 'high' }}
              decoding="async"
            />
          </div>
          <div className="sx-hero-veil" aria-hidden="true" />
          <div className="sx-wrap sx-hero-inner">
            <p className="sx-label" style={{ color: 'rgba(244,241,236,0.62)' }}>
              {s.hero.label}
            </p>
            <h1 className="sx-display sx-h1 sx-hero-title">
              {s.hero.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <div className="sx-hero-grid">
              <p className="sx-hero-lead">{s.hero.lead}</p>
              <div className="sx-hero-ctas">
                <a className="sx-btn sx-btn-solid" href="#contact">
                  {s.hero.ctaPrimary}
                  <span className="sx-btn-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <a className="sx-btn sx-btn-line" href="#work">
                  {s.hero.ctaSecondary}
                </a>
              </div>
            </div>
            <div className="sx-hero-foot">
              <p className="sx-label">{s.hero.scrollHint}</p>
              <p className="sx-label">{s.footer.base}</p>
            </div>
          </div>
        </section>

        {/* 02 — SELECTED WORK */}
        <section id="work" className="sx-section" style={{ scrollMarginTop: 72 }}>
          <div className="sx-wrap">
            <div className="sx-head">
              <div className="sx-head-rule">
                <p className="sx-label sx-label-accent">{s.work.label}</p>
                <h2 className="sx-display sx-h2" style={{ marginTop: 14 }}>
                  {s.work.title}
                </h2>
              </div>
              <p className="sx-lead">{s.work.lead}</p>
            </div>

            <div className="sx-projects">
              {s.projects.map((project) => (
                <article key={project.name} className="sx-project" data-sx-reveal>
                  <div className="sx-project-media">
                    <img
                      src={PROJECT_IMAGES[project.image]}
                      alt={project.imageAlt}
                      width={1600}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <span className="sx-project-index">{project.index}</span>
                    <h3 className="sx-display sx-h3 sx-project-name">{project.name}</h3>
                    <p className="sx-project-sector">{project.sector}</p>
                    <p className="sx-project-headline">{project.headline}</p>
                    <div className="sx-scope">
                      <span aria-hidden="true">{s.work.scopeLabel}</span>
                      {project.scope.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — WHAT WE BUILD */}
        <section id="build" className="sx-section sx-dark" style={{ scrollMarginTop: 72 }}>
          <div className="sx-wrap">
            <div className="sx-head">
              <div className="sx-head-rule">
                <p className="sx-label sx-label-accent">{s.build.label}</p>
                <h2 className="sx-display sx-h2" style={{ marginTop: 14 }}>
                  {s.build.title}
                </h2>
              </div>
              <p className="sx-lead">{s.build.lead}</p>
            </div>

            <div className="sx-layers">
              {s.build.layers.map((layer, i) => {
                const open = openLayer === i
                return (
                  <div key={layer.name} className="sx-layer" data-open={open}>
                    <h3 style={{ margin: 0 }}>
                      <button
                        type="button"
                        className="sx-layer-btn"
                        aria-expanded={open}
                        aria-controls={`sx-layer-${i}`}
                        onClick={() => setOpenLayer(open ? -1 : i)}
                      >
                        <span className="sx-layer-code">{layer.code}</span>
                        <span>
                          <span className="sx-layer-name">Archic {layer.name}</span>
                          <span className="sx-layer-claim">{layer.claim}</span>
                        </span>
                        <span className="sx-layer-plus" aria-hidden="true" />
                      </button>
                    </h3>
                    <div className="sx-layer-panel" id={`sx-layer-${i}`} role="region">
                      <div>
                        <div className="sx-layer-body">
                          <p>{layer.desc}</p>
                          <ul className="sx-layer-items">
                            {layer.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 04 — CASE STUDY */}
        <section className="sx-section sx-case">
          <div className="sx-wrap">
            <div className="sx-head">
              <div className="sx-head-rule">
                <p className="sx-label sx-label-accent">{s.caseStudy.label}</p>
                <h2 className="sx-display sx-h2" style={{ marginTop: 14 }}>
                  {s.caseStudy.title}
                </h2>
              </div>
              <p className="sx-lead">{s.caseStudy.lead}</p>
            </div>

            <div className="sx-stages" data-sx-reveal>
              {s.caseStudy.stages.map((stage) => (
                <div key={stage.step} className="sx-stage">
                  <span className="sx-stage-step">{stage.step}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.desc}</p>
                </div>
              ))}
            </div>
            <p className="sx-case-note">{s.caseStudy.note}</p>
          </div>
        </section>

        {/* 05 — SECTORS */}
        <section id="sectors" className="sx-section" style={{ scrollMarginTop: 72 }}>
          <div className="sx-wrap">
            <div className="sx-head">
              <div className="sx-head-rule">
                <p className="sx-label sx-label-accent">{s.sectors.label}</p>
                <h2 className="sx-display sx-h2" style={{ marginTop: 14 }}>
                  {s.sectors.title}
                </h2>
              </div>
              <p className="sx-lead">{s.sectors.lead}</p>
            </div>

            <div className="sx-sectors">
              {s.sectors.items.map((item) => (
                <div key={item.name} className="sx-sector" data-sx-reveal>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 — METHOD */}
        <section id="method" className="sx-section sx-dark" style={{ scrollMarginTop: 72 }}>
          <div className="sx-wrap">
            <div className="sx-head">
              <div className="sx-head-rule">
                <p className="sx-label sx-label-accent">{s.method.label}</p>
                <h2 className="sx-display sx-h2" style={{ marginTop: 14 }}>
                  {s.method.title}
                </h2>
              </div>
              <p className="sx-lead">{s.method.lead}</p>
            </div>

            <div className="sx-method">
              {s.method.steps.map((step) => (
                <div key={step.step} className="sx-step" data-sx-reveal>
                  <span className="sx-step-num">{step.step}</span>
                  <h3>{step.name}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 — CONTACT */}
        <section
          id="contact"
          className="sx-section sx-dark"
          style={{ scrollMarginTop: 72, paddingTop: 0 }}
        >
          <div className="sx-wrap">
            <div className="sx-contact-grid">
              <div>
                <p className="sx-label sx-label-accent">{s.cta.label}</p>
                <h2 className="sx-display sx-h2" style={{ marginTop: 14 }}>
                  {s.cta.title}
                </h2>
                <p className="sx-lead" style={{ marginTop: 18 }}>
                  {s.cta.lead}
                </p>
                <p className="sx-label" style={{ marginTop: 34 }}>
                  {s.cta.mailLabel}
                </p>
                <a className="sx-mail" href={`mailto:${CONTACT_MAIL}`}>
                  {CONTACT_MAIL}
                </a>
              </div>
              <StudioContact />
            </div>
          </div>
        </section>

        <StudioFooter />
      </div>
    </>
  )
}
