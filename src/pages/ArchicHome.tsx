import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_MAIL } from '../i18n/content'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioContact from '../components/StudioContact'
import { STUDIO, type SystemImage } from '../content/studio'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'

/** Imágenes del handoff de marca. Sistemas digitales, nunca arquitectura. */
const SYSTEM_IMAGES: Record<SystemImage, string> = {
  digital: '/img/archic-digital-system.webp',
  hospitality: '/img/archic-hospitality-system.webp',
  automotive: '/img/archic-automotive-system.webp',
  yachting: '/img/archic-yachting-system.webp',
}

/** Revelado corto al hacer scroll: una observación por elemento, sin librerías. */
function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-sx-reveal]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
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

      <div className="sx" id="top">
        <StudioHeader />

        {/* 01 — HERO */}
        <section className="sx-hero">
          <div className="sx-hero-copy">
            <p className="sx-eyebrow">{s.hero.eyebrow}</p>
            <h1 className="sx-h1">
              {s.hero.title} <span>{s.hero.titleAccent}</span>
            </h1>
            <p className="sx-lede">{s.hero.lead}</p>
            <div className="sx-actions">
              <a className="sx-btn" href="#contact">
                {s.hero.ctaPrimary}
              </a>
              <a className="sx-textlink" href="#work">
                {s.hero.ctaSecondary}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="sx-hero-visual">
            <img
              src={SYSTEM_IMAGES.digital}
              alt={s.hero.imageAlt}
              width={1664}
              height={936}
              {...{ fetchpriority: 'high' }}
              decoding="async"
            />
          </div>
          <div className="sx-hero-meta" aria-hidden="true">
            <span>{s.hero.metaLeft}</span>
            <span>{s.hero.metaRight}</span>
          </div>
        </section>

        {/* 02 — STATEMENT */}
        <section id="about" className="sx-statement">
          <p className="sx-kicker">{s.statement.kicker}</p>
          <h2 className="sx-h2">
            {s.statement.titleA}
            <br />
            <span>{s.statement.titleB}</span>
          </h2>
          <p className="sx-statement-body">{s.statement.body}</p>
        </section>

        {/* 03 — SELECTED WORK */}
        <section id="work" className="sx-work">
          <div className="sx-sec-head">
            <p className="sx-kicker">{s.work.kicker}</p>
            <p className="sx-sec-note">{s.work.note}</p>
          </div>

          {s.work.cases.map((item, i) => (
            <article
              key={item.name}
              className="sx-case"
              data-flip={i % 2 === 1}
              data-tone={i % 2 === 1 ? 'paper' : 'graphite'}
              data-sx-reveal
            >
              <div className="sx-case-copy">
                <p className="sx-case-index">
                  {item.index} / {item.kicker}
                </p>
                <h3 className="sx-h3">{item.name}</h3>
                <p className="sx-case-stack">{item.stack}</p>
                <p className="sx-case-desc">{item.desc}</p>
                <p className="sx-case-note">{item.note}</p>
                <a className="sx-underline" href="#systems">
                  {s.work.caseLink}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="sx-case-media">
                <img
                  src={SYSTEM_IMAGES[item.image]}
                  alt={item.imageAlt}
                  width={1664}
                  height={936}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          ))}
        </section>

        {/* 04 — ONE SYSTEM */}
        <section id="systems" className="sx-system">
          <div className="sx-system-intro">
            <p className="sx-kicker">{s.system.kicker}</p>
            <h2 className="sx-h2">
              {s.system.title}
              <br />
              <span>{s.system.titleB}</span>
            </h2>
            <p className="sx-lede">{s.system.lead}</p>
          </div>

          <ol className="sx-flow">
            {s.system.steps.map((step) => (
              <li key={step.name} className="sx-flow-item" data-sx-reveal>
                <span className="sx-flow-code">{step.code}</span>
                <h3>{step.name}</h3>
                <p>{step.desc}</p>
              </li>
            ))}
          </ol>
          <p className="sx-flow-care">{s.system.care}</p>
        </section>

        {/* 05 — SECTORS */}
        <section id="sectors" className="sx-sectors">
          <div className="sx-sec-head sx-on-dark">
            <p className="sx-kicker">{s.sectors.kicker}</p>
            <p className="sx-sec-note">{s.sectors.note}</p>
          </div>

          <div className="sx-sector-grid">
            {s.sectors.items.map((item) => (
              <article key={item.name} className="sx-sector" data-sx-reveal>
                <div className="sx-sector-media">
                  <img
                    src={SYSTEM_IMAGES[item.image]}
                    alt={item.imageAlt}
                    width={1664}
                    height={936}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3>{item.name}</h3>
                <p>{item.line}</p>
              </article>
            ))}
          </div>
          <p className="sx-sector-note">{s.sectors.footnote}</p>
        </section>

        {/* 06 — PRINCIPLES */}
        <section className="sx-principles">
          <p className="sx-kicker">{s.principles.kicker}</p>
          <div className="sx-principle-grid">
            {s.principles.items.map((item) => (
              <div key={item.index} className="sx-principle" data-sx-reveal>
                <span>{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 07 — PROCESS */}
        <section className="sx-process">
          <div className="sx-sec-head sx-on-dark">
            <p className="sx-kicker">{s.process.kicker}</p>
            <p className="sx-sec-note">{s.process.title}</p>
          </div>
          <div className="sx-process-grid">
            {s.process.steps.map((step) => (
              <div key={step.name} className="sx-process-step">
                <span>{step.code}</span>
                <h3>{step.name}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 08 — CONTACT */}
        <section id="contact" className="sx-closing">
          <div className="sx-closing-copy">
            <p className="sx-kicker">{s.cta.label}</p>
            <h2 className="sx-h2">
              {s.cta.title} <span>{s.cta.titleAccent}</span>
            </h2>
            <p className="sx-lede">{s.cta.lead}</p>
            <p className="sx-mail-label">{s.cta.mailLabel}</p>
            <a className="sx-mail" href={`mailto:${CONTACT_MAIL}`}>
              {CONTACT_MAIL}
            </a>
          </div>
          <StudioContact />
        </section>

        <StudioFooter />
      </div>
    </>
  )
}
