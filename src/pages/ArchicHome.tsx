import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_MAIL } from '../i18n/content'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'

const COPY = {
  es: {
    meta: {
      title: 'Archic — Sistemas digitales para negocios excepcionales',
      description: 'Webs premium, operaciones y software a medida con una dirección digital de alto nivel.',
    },
    hero: {
      eyebrow: 'ARCHIC — DIGITAL SYSTEMS',
      title: 'Sistemas digitales para',
      accent: 'negocios excepcionales.',
      body: 'Diseñamos la presencia, las operaciones y el software de negocios que no pueden permitirse una experiencia digital mediocre.',
      primary: 'Empezar proyecto',
      secondary: 'Descubrir Archic',
    },
    intro: {
      eyebrow: 'UNA SOLA EXIGENCIA',
      title: 'Todo lo digital.',
      accent: 'Al mismo nivel que tu negocio.',
      body: 'No empezamos por una lista de servicios. Empezamos por el estándar que debe cumplir la experiencia completa: lo que ve el cliente, lo que usa el equipo y lo que hace posible crecer sin fricción.',
    },
    presence: {
      label: 'ARCHIC PRESENCE',
      title: 'La primera impresión',
      accent: 'tiene que estar a la altura.',
      body: 'Web, dirección visual, contenido, rendimiento y conversión tratados como una sola experiencia. Cada decisión tiene una intención clara.',
      chips: ['Web premium', 'Dirección digital', 'Contenido', 'SEO técnico'],
    },
    control: {
      label: 'ARCHIC CONTROL',
      title: 'La elegancia también está',
      accent: 'en cómo funciona.',
      body: 'Reservas, clientes, recursos y operaciones reunidos en un entorno construido alrededor de la realidad del negocio, no alrededor de una plantilla genérica.',
      items: [
        ['01', 'Clientes', 'Historial, contexto y seguimiento'],
        ['02', 'Operaciones', 'Estados, reservas y flujos de trabajo'],
        ['03', 'Visibilidad', 'Lo importante, claro y en tiempo real'],
      ],
    },
    business: {
      label: 'ARCHIC BUSINESS',
      title: 'Cuando una herramienta genérica',
      accent: 'ya no es suficiente.',
      body: 'Software a medida, automatización e integraciones cuando existe una ventaja real en construir una solución propia.',
      layers: ['Integraciones', 'Automatización', 'Datos', 'Software a medida'],
    },
    standard: {
      eyebrow: 'THE ARCHIC STANDARD',
      title: 'Claridad. Precisión.',
      accent: 'Intención.',
      body: 'El lujo digital no está en añadir más. Está en eliminar lo débil hasta que solo quede lo que merece estar ahí.',
    },
    capabilities: {
      eyebrow: 'CAPACIDADES',
      title: 'Empieza por lo que necesitas hoy.',
      body: 'El resto puede evolucionar sobre la misma base cuando aporte valor real.',
      items: [
        ['01', 'Web & Brand', 'Presencia, experiencia, rendimiento y conversión.'],
        ['02', 'Bookings', 'Reservas, solicitudes, disponibilidad y confirmaciones.'],
        ['03', 'Control & CRM', 'Clientes, recursos, operaciones y reporting.'],
        ['04', 'Software', 'Integraciones, automatización y herramientas a medida.'],
      ],
    },
    sectors: ['Hospitality', 'Automotive', 'Yachting', 'Real Estate', 'Premium Services'],
    closing: {
      eyebrow: 'START A PROJECT',
      title: 'Haz que la parte digital',
      accent: 'esté a la altura del negocio.',
      body: 'Cuéntanos qué tienes hoy, qué no funciona y qué debería ser mejor. Nosotros empezamos por entender el problema.',
      cta: 'Hablar con Archic',
    },
  },
  en: {
    meta: {
      title: 'Archic — Digital systems for exceptional businesses',
      description: 'Premium websites, operations and custom software with a high-end digital direction.',
    },
    hero: {
      eyebrow: 'ARCHIC — DIGITAL SYSTEMS',
      title: 'Digital systems for',
      accent: 'exceptional businesses.',
      body: 'We design the presence, operations and software of businesses that cannot afford a mediocre digital experience.',
      primary: 'Start a project',
      secondary: 'Discover Archic',
    },
    intro: {
      eyebrow: 'ONE STANDARD',
      title: 'Everything digital.',
      accent: 'At the level of your business.',
      body: 'We do not begin with a service list. We begin with the standard the whole experience must meet: what customers see, what the team uses and what allows the business to grow without friction.',
    },
    presence: {
      label: 'ARCHIC PRESENCE',
      title: 'The first impression',
      accent: 'has to match the business.',
      body: 'Web, visual direction, content, performance and conversion treated as one experience. Every decision has a clear purpose.',
      chips: ['Premium web', 'Digital direction', 'Content', 'Technical SEO'],
    },
    control: {
      label: 'ARCHIC CONTROL',
      title: 'Elegance also lives',
      accent: 'in how it works.',
      body: 'Bookings, customers, resources and operations brought together in an environment built around the reality of the business, not a generic template.',
      items: [
        ['01', 'Customers', 'History, context and follow-up'],
        ['02', 'Operations', 'States, bookings and workflows'],
        ['03', 'Visibility', 'What matters, clear and real-time'],
      ],
    },
    business: {
      label: 'ARCHIC BUSINESS',
      title: 'When a generic tool',
      accent: 'is no longer enough.',
      body: 'Custom software, automation and integrations when there is a real advantage in owning the solution.',
      layers: ['Integrations', 'Automation', 'Data', 'Custom software'],
    },
    standard: {
      eyebrow: 'THE ARCHIC STANDARD',
      title: 'Clarity. Precision.',
      accent: 'Intent.',
      body: 'Digital luxury is not about adding more. It is about removing weak decisions until only what deserves to be there remains.',
    },
    capabilities: {
      eyebrow: 'CAPABILITIES',
      title: 'Start with what you need today.',
      body: 'The rest can evolve on the same foundation when it creates real value.',
      items: [
        ['01', 'Web & Brand', 'Presence, experience, performance and conversion.'],
        ['02', 'Bookings', 'Reservations, enquiries, availability and confirmations.'],
        ['03', 'Control & CRM', 'Customers, resources, operations and reporting.'],
        ['04', 'Software', 'Integrations, automation and custom tools.'],
      ],
    },
    sectors: ['Hospitality', 'Automotive', 'Yachting', 'Real Estate', 'Premium Services'],
    closing: {
      eyebrow: 'START A PROJECT',
      title: 'Make the digital side',
      accent: 'match the business.',
      body: 'Tell us what you have today, what is not working and what should be better. We begin by understanding the problem.',
      cta: 'Talk to Archic',
    },
  },
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-v5-reveal]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

export default function ArchicHome() {
  const { lang } = useLang()
  const c = COPY[lang]
  const canonicalUrl = homeCanonical(lang)
  const structuredData = buildHomeGraph(lang)
  useReveal()

  return (
    <>
      <Helmet htmlAttributes={{ lang }}>
        <title>{c.meta.title}</title>
        <meta name="description" content={c.meta.description} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/" />
        <meta property="og:title" content={c.meta.title} />
        <meta property="og:description" content={c.meta.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="v5" id="top">
        <StudioHeader />

        <section className="v5-hero">
          <div className="v5-hero-copy">
            <p className="v5-eyebrow">{c.hero.eyebrow}</p>
            <h1>{c.hero.title}<br /><span>{c.hero.accent}</span></h1>
            <p className="v5-hero-body">{c.hero.body}</p>
            <div className="v5-actions">
              <a className="v5-btn v5-btn-gold" href="#contact">{c.hero.primary}</a>
              <a className="v5-link" href="#studio">{c.hero.secondary}<span>↓</span></a>
            </div>
          </div>

          <div className="v5-hero-product" aria-hidden="true">
            <div className="v5-aura" />
            <div className="v5-orbit" />
            <img src="/brand/archic-mark-light.svg" alt="" width={459} height={412} />
            <div className="v5-product-shadow" />
          </div>

          <div className="v5-hero-foot"><span>ARCHIC © 2026</span><span>SPAIN · REMOTE & ON-SITE</span></div>
        </section>

        <section className="v5-intro" id="studio">
          <p className="v5-eyebrow v5-eyebrow-dark">{c.intro.eyebrow}</p>
          <h2 data-v5-reveal>{c.intro.title}<br /><span>{c.intro.accent}</span></h2>
          <p className="v5-intro-body" data-v5-reveal>{c.intro.body}</p>
        </section>

        <section className="v5-product-section v5-presence" id="capabilities">
          <div className="v5-product-copy" data-v5-reveal>
            <p className="v5-product-label">{c.presence.label}</p>
            <h2>{c.presence.title}<br /><span>{c.presence.accent}</span></h2>
            <p>{c.presence.body}</p>
            <div className="v5-chips">{c.presence.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
          </div>
          <div className="v5-presence-visual" data-v5-reveal aria-hidden="true">
            <div className="v5-browser-bar"><span /><span /><span /><b>archic / presence</b></div>
            <div className="v5-browser-canvas">
              <div className="v5-browser-brand">ARCHIC</div>
              <div className="v5-browser-kicker">EXCEPTIONAL DIGITAL PRESENCE</div>
              <div className="v5-browser-title">First impressions<br /><em>designed to last.</em></div>
              <div className="v5-browser-line" />
            </div>
          </div>
        </section>

        <section className="v5-product-section v5-control">
          <div className="v5-product-copy" data-v5-reveal>
            <p className="v5-product-label">{c.control.label}</p>
            <h2>{c.control.title}<br /><span>{c.control.accent}</span></h2>
            <p>{c.control.body}</p>
          </div>
          <div className="v5-control-visual" data-v5-reveal>
            <div className="v5-control-top"><span>ARCHIC CONTROL</span><span>LIVE</span></div>
            {c.control.items.map(([no, name, desc]) => (
              <div className="v5-control-row" key={no}>
                <span>{no}</span><strong>{name}</strong><p>{desc}</p><i>↗</i>
              </div>
            ))}
            <div className="v5-control-bottom"><span>OPERATIONS / CUSTOMERS / RESOURCES</span><span>01</span></div>
          </div>
        </section>

        <section className="v5-product-section v5-business">
          <div className="v5-product-copy" data-v5-reveal>
            <p className="v5-product-label">{c.business.label}</p>
            <h2>{c.business.title}<br /><span>{c.business.accent}</span></h2>
            <p>{c.business.body}</p>
          </div>
          <div className="v5-business-visual" data-v5-reveal aria-hidden="true">
            <div className="v5-business-core"><img src="/brand/archic-mark-dark.svg" alt="" /></div>
            {c.business.layers.map((layer, index) => <div className={`v5-business-layer v5-business-layer-${index + 1}`} key={layer}><span>{`0${index + 1}`}</span>{layer}</div>)}
          </div>
        </section>

        <section className="v5-standard">
          <p className="v5-eyebrow">{c.standard.eyebrow}</p>
          <h2 data-v5-reveal>{c.standard.title}<br /><span>{c.standard.accent}</span></h2>
          <p data-v5-reveal>{c.standard.body}</p>
        </section>

        <section className="v5-capabilities">
          <div className="v5-cap-head">
            <div>
              <p className="v5-eyebrow v5-eyebrow-dark">{c.capabilities.eyebrow}</p>
              <h2>{c.capabilities.title}</h2>
            </div>
            <p>{c.capabilities.body}</p>
          </div>
          <div className="v5-cap-grid">
            {c.capabilities.items.map(([no, name, desc]) => (
              <article key={no} data-v5-reveal>
                <span>{no}</span>
                <h3>{name}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="v5-sectors" aria-label="Sectors">
          {c.sectors.map((sector) => <span key={sector}>{sector}</span>)}
        </section>

        <section className="v5-closing" id="contact">
          <p className="v5-eyebrow v5-eyebrow-dark">{c.closing.eyebrow}</p>
          <h2 data-v5-reveal>{c.closing.title}<br /><span>{c.closing.accent}</span></h2>
          <p data-v5-reveal>{c.closing.body}</p>
          <a className="v5-btn v5-btn-dark" href={`mailto:${CONTACT_MAIL}`}>{c.closing.cta}<span>↗</span></a>
        </section>

        <StudioFooter />
      </div>
    </>
  )
}
