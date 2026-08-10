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
      description: 'Dirección digital, webs premium, operaciones y software a medida para negocios con un estándar alto.',
    },
    hero: {
      eyebrow: 'ARCHIC — PRIVATE DIGITAL SYSTEMS',
      title: 'Sistemas digitales para',
      accent: 'negocios excepcionales.',
      body: 'Diseñamos la presencia, los sistemas y el software de negocios cuyo estándar no termina cuando empieza la pantalla.',
      primary: 'Empezar proyecto',
      secondary: 'Descubrir Archic',
    },
    intro: {
      eyebrow: 'THE ARCHIC STANDARD',
      title: 'Una marca de nivel',
      accent: 'no puede sentirse genérica online.',
      body: 'La parte digital también construye percepción. Por eso tratamos estrategia, diseño y tecnología con el mismo nivel de exigencia: menos ruido, mejores decisiones y una ejecución que se siente deliberada.',
    },
    presence: {
      label: 'ARCHIC PRESENCE',
      title: 'La primera impresión',
      accent: 'debe sentirse a medida.',
      body: 'Dirección visual, web, contenido, rendimiento y conversión tratados como una única experiencia. Nada se añade solo para llenar espacio.',
      chips: ['Web premium', 'Dirección digital', 'Contenido', 'SEO técnico'],
    },
    control: {
      label: 'ARCHIC CONTROL',
      title: 'La calidad también se nota',
      accent: 'donde el cliente no mira.',
      body: 'Reservas, clientes, recursos y operaciones reunidos en un entorno preciso, silencioso y construido alrededor de cómo funciona realmente el negocio.',
      items: [
        ['01', 'Clientes', 'Historial, contexto y seguimiento'],
        ['02', 'Operaciones', 'Estados, reservas y flujos de trabajo'],
        ['03', 'Visibilidad', 'Lo importante, claro y en tiempo real'],
      ],
    },
    business: {
      label: 'ARCHIC BUSINESS',
      title: 'Tecnología propia cuando',
      accent: 'la diferencia lo justifica.',
      body: 'Software a medida, automatización e integraciones para negocios que han superado los límites de las herramientas genéricas.',
      layers: ['Integraciones', 'Automatización', 'Datos', 'Software a medida'],
    },
    standard: {
      eyebrow: 'QUIET LUXURY / DIGITAL CRAFT',
      title: 'Nada genérico.',
      accent: 'Nada por accidente.',
      body: 'La sensación de alta calidad nace de cientos de decisiones pequeñas: jerarquía, ritmo, interacción, rendimiento, copy y detalle. El lujo digital no se decora. Se construye.',
    },
    capabilities: {
      eyebrow: 'CAPACIDADES',
      title: 'Una disciplina. Distintas capas.',
      body: 'Entramos por la necesidad que más valor pueda crear hoy y hacemos que el sistema pueda evolucionar mañana sin perder coherencia.',
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
      title: 'Si tu negocio tiene nivel,',
      accent: 'su parte digital debe demostrarlo.',
      body: 'Cuéntanos qué tienes hoy, qué no funciona y dónde quieres llegar. Empezamos por entender el negocio y elevamos solo lo que merece ser mejor.',
      cta: 'Hablar con Archic',
    },
  },
  en: {
    meta: {
      title: 'Archic — Digital systems for exceptional businesses',
      description: 'Digital direction, premium websites, operations and custom software for businesses with a high standard.',
    },
    hero: {
      eyebrow: 'ARCHIC — PRIVATE DIGITAL SYSTEMS',
      title: 'Digital systems for',
      accent: 'exceptional businesses.',
      body: 'We design the presence, systems and software of businesses whose standard does not stop when the screen begins.',
      primary: 'Start a project',
      secondary: 'Discover Archic',
    },
    intro: {
      eyebrow: 'THE ARCHIC STANDARD',
      title: 'A high-level brand',
      accent: 'cannot feel generic online.',
      body: 'The digital side shapes perception too. That is why we treat strategy, design and technology with the same standard: less noise, better decisions and execution that feels deliberate.',
    },
    presence: {
      label: 'ARCHIC PRESENCE',
      title: 'The first impression',
      accent: 'should feel made to measure.',
      body: 'Visual direction, web, content, performance and conversion treated as one experience. Nothing is added simply to fill space.',
      chips: ['Premium web', 'Digital direction', 'Content', 'Technical SEO'],
    },
    control: {
      label: 'ARCHIC CONTROL',
      title: 'Quality is also felt',
      accent: 'where the customer never looks.',
      body: 'Bookings, customers, resources and operations brought together in a precise, quiet environment built around how the business actually works.',
      items: [
        ['01', 'Customers', 'History, context and follow-up'],
        ['02', 'Operations', 'States, bookings and workflows'],
        ['03', 'Visibility', 'What matters, clear and real-time'],
      ],
    },
    business: {
      label: 'ARCHIC BUSINESS',
      title: 'Proprietary technology when',
      accent: 'the difference justifies it.',
      body: 'Custom software, automation and integrations for businesses that have outgrown the limits of generic tools.',
      layers: ['Integrations', 'Automation', 'Data', 'Custom software'],
    },
    standard: {
      eyebrow: 'QUIET LUXURY / DIGITAL CRAFT',
      title: 'Nothing generic.',
      accent: 'Nothing by accident.',
      body: 'High quality is the result of hundreds of small decisions: hierarchy, rhythm, interaction, performance, copy and detail. Digital luxury is not decorated. It is built.',
    },
    capabilities: {
      eyebrow: 'CAPABILITIES',
      title: 'One discipline. Different layers.',
      body: 'We begin with the need that can create the most value today and make sure the system can evolve tomorrow without losing coherence.',
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
      title: 'If your business has a standard,',
      accent: 'its digital side should prove it.',
      body: 'Tell us what you have today, what is not working and where you want to go. We start by understanding the business and elevate only what deserves to be better.',
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
          <div className="v5-hero-ghost" aria-hidden="true">ARCHIC</div>
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
            <div className="v5-halo" />
            <div className="v5-orbit"><span className="v5-orbit-dot" /></div>
            <div className="v5-orbit v5-orbit-inner" />
            <img src="/brand/archic-mark-light.svg" alt="" width={459} height={412} />
            <div className="v5-product-shadow" />
            <div className="v5-product-caption"><span>ARCHIC / 01</span><span>PRIVATE DIGITAL SYSTEMS</span></div>
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
              <img className="v5-browser-mark" src="/brand/archic-mark-light.svg" alt="" />
              <div className="v5-browser-brand">ARCHIC</div>
              <div className="v5-browser-kicker">EXCEPTIONAL DIGITAL PRESENCE</div>
              <div className="v5-browser-title">First impressions<br /><em>designed to last.</em></div>
              <div className="v5-browser-line" />
              <div className="v5-browser-meta"><span>DESIGNED WITH INTENT</span><span>01 / PRESENCE</span></div>
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
            <div className="v5-control-top"><span>ARCHIC CONTROL / PRIVATE SYSTEM</span><span>LIVE</span></div>
            {c.control.items.map(([no, name, desc]) => (
              <div className="v5-control-row" key={no}>
                <span>{no}</span><strong>{name}</strong><p>{desc}</p><i>↗</i>
              </div>
            ))}
            <div className="v5-control-bottom"><span>OPERATIONS / CUSTOMERS / RESOURCES</span><span>ARCHIC / 02</span></div>
          </div>
        </section>

        <section className="v5-product-section v5-business">
          <div className="v5-product-copy" data-v5-reveal>
            <p className="v5-product-label">{c.business.label}</p>
            <h2>{c.business.title}<br /><span>{c.business.accent}</span></h2>
            <p>{c.business.body}</p>
          </div>
          <div className="v5-business-visual" data-v5-reveal aria-hidden="true">
            <div className="v5-business-signature">ARCHIC / BUSINESS SYSTEM</div>
            <div className="v5-business-core"><img src="/brand/archic-mark-dark.svg" alt="" /></div>
            {c.business.layers.map((layer, index) => <div className={`v5-business-layer v5-business-layer-${index + 1}`} key={layer}><span>{`0${index + 1}`}</span>{layer}</div>)}
          </div>
        </section>

        <section className="v5-standard">
          <div className="v5-standard-rule" aria-hidden="true" />
          <p className="v5-eyebrow">{c.standard.eyebrow}</p>
          <h2 data-v5-reveal>{c.standard.title}<br /><span>{c.standard.accent}</span></h2>
          <p data-v5-reveal>{c.standard.body}</p>
          <div className="v5-standard-seal" aria-hidden="true"><img src="/brand/archic-mark-light.svg" alt="" /><span>ARCHIC STANDARD</span></div>
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
                <i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </section>

        <section className="v5-sectors" aria-label="Sectors">
          {c.sectors.map((sector) => <span key={sector}>{sector}</span>)}
        </section>

        <section className="v5-closing" id="contact">
          <div className="v5-closing-mark" aria-hidden="true"><img src="/brand/archic-mark-light.svg" alt="" /></div>
          <p className="v5-eyebrow">{c.closing.eyebrow}</p>
          <h2 data-v5-reveal>{c.closing.title}<br /><span>{c.closing.accent}</span></h2>
          <p data-v5-reveal>{c.closing.body}</p>
          <a className="v5-btn v5-btn-gold" href={`mailto:${CONTACT_MAIL}`}>{c.closing.cta}<span>↗</span></a>
        </section>

        <StudioFooter />
      </div>
    </>
  )
}