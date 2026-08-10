import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_MAIL } from '../i18n/content'
import StudioHeader from '../components/StudioHeader'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'

const IMAGES = {
  digital: '/img/archic-digital-system.webp',
  hospitality: '/img/archic-hospitality-system.webp',
  automotive: '/img/archic-automotive-system.webp',
  yachting: '/img/archic-yachting-system.webp',
}

const COPY = {
  es: {
    meta: {
      title: 'Archic — La parte digital de negocios excepcionales',
      description: 'Estrategia, diseño, webs premium y software a medida para construir la parte digital de negocios ambiciosos.',
    },
    hero: {
      eyebrow: 'DIGITAL SYSTEMS FOR EXCEPTIONAL BUSINESSES',
      title: 'Construimos la parte digital de negocios',
      accent: 'excepcionales.',
      lead: 'Estrategia, diseño y tecnología unidos para crear experiencias de alto nivel y sistemas que hacen el negocio más simple, más claro y más capaz.',
      cta: 'Empezar proyecto',
      secondary: 'Ver qué construimos',
      location: 'Écija · Marbella · España',
      stack: 'Presence / Bookings / Control / Business',
    },
    intro: {
      index: '01 / STUDIO',
      title: 'No vendemos páginas.',
      accent: 'Construimos la parte digital que el negocio necesita.',
      body: 'Una presencia excelente es el inicio. Cuando aporta valor, la conectamos con reservas, clientes, operaciones, automatización y software a medida.',
      note: 'Sin plantillas. Sin funciones de relleno. Sin capas que el negocio no necesita.',
    },
    capabilities: {
      index: '02 / CAPABILITIES',
      title: 'De la primera impresión',
      accent: 'al sistema que hay detrás.',
      note: 'Cuatro capacidades. Se contratan por necesidad, no por paquete.',
      items: [
        { no: '01', name: 'Presence', desc: 'Webs premium, marca digital, contenido, conversión y experiencia.', image: IMAGES.hospitality },
        { no: '02', name: 'Bookings', desc: 'Reservas, solicitudes, disponibilidad, confirmaciones y captación.', image: IMAGES.yachting },
        { no: '03', name: 'Control', desc: 'Clientes, recursos, operaciones, flujos de trabajo y visibilidad.', image: IMAGES.automotive },
        { no: '04', name: 'Business', desc: 'Software a medida, integraciones, automatización, datos y analítica.', image: IMAGES.digital },
      ],
    },
    concepts: {
      index: '03 / CONCEPT LAB',
      title: 'Capacidad demostrada.',
      accent: 'No portfolio inventado.',
      body: 'Mientras construimos nuestros primeros casos reales, enseñamos lo que sabemos hacer mediante sistemas conceptuales creados por Archic.',
      items: [
        { no: '01', sector: 'HOSPITALITY SYSTEM', title: 'Una experiencia impecable fuera. Una operación clara dentro.', stack: 'Web · Reservas · Clientes · Operaciones', image: IMAGES.hospitality, alt: 'Concepto digital de Archic para hostelería' },
        { no: '02', sector: 'AUTOMOTIVE SYSTEM', title: 'Presentación, flota y demanda en una sola capa digital.', stack: 'Presence · Fleet · Enquiries', image: IMAGES.automotive, alt: 'Concepto digital de Archic para automoción premium' },
        { no: '03', sector: 'YACHTING SYSTEM', title: 'Un servicio premium necesita una experiencia digital a la altura.', stack: 'Charter · Leads · Operations', image: IMAGES.yachting, alt: 'Concepto digital de Archic para yachting' },
      ],
    },
    system: {
      index: '04 / ONE SYSTEM',
      title: 'Empezar pequeño.',
      accent: 'Crecer sin rehacerlo todo.',
      body: 'Archic puede entrar por una web, una reserva o una necesidad operativa concreta. Si el negocio necesita más, la misma base puede evolucionar.',
      steps: [['01', 'Presence', 'Atraer'], ['02', 'Bookings', 'Convertir'], ['03', 'Control', 'Operar'], ['04', 'Business', 'Escalar']],
      care: 'CARE / mantenimiento, seguridad y evolución continua.',
    },
    industries: {
      index: '05 / INDUSTRIES',
      title: 'Diseñado para negocios donde',
      accent: 'la experiencia importa.',
      items: [
        ['01', 'Hospitality', 'Reservations · Guest experience · Operations'],
        ['02', 'Automotive', 'Fleet · Enquiries · Customer journey'],
        ['03', 'Yachting', 'Charter · Leads · Operations'],
        ['04', 'Real Estate', 'Inventory · Leads · Private areas'],
        ['05', 'Premium Services', 'Experience · Conversion · Systems'],
      ],
    },
    standard: {
      label: 'OUR STANDARD',
      title: 'Quality is not an effect. It is the absence of weak decisions.',
      side: 'Clarity / Detail / Purpose / Endurance',
    },
    contact: {
      index: '06 / START A PROJECT',
      title: '¿Qué debería hacer mejor',
      accent: 'la parte digital de tu negocio?',
      body: 'Cuéntanos qué tienes, qué no funciona y qué quieres conseguir. Empezamos por entender el problema, no por venderte una lista de funciones.',
    },
    footer: 'Digital systems for exceptional businesses.',
  },
  en: {
    meta: {
      title: 'Archic — The digital side of exceptional businesses',
      description: 'Strategy, design, premium websites and custom software for ambitious businesses.',
    },
    hero: {
      eyebrow: 'DIGITAL SYSTEMS FOR EXCEPTIONAL BUSINESSES',
      title: 'We build the digital side of',
      accent: 'exceptional businesses.',
      lead: 'Strategy, design and technology working as one to create premium experiences and systems that make the business simpler, clearer and more capable.',
      cta: 'Start a project',
      secondary: 'See what we build',
      location: 'Écija · Marbella · Spain',
      stack: 'Presence / Bookings / Control / Business',
    },
    intro: {
      index: '01 / STUDIO',
      title: 'We do not sell pages.',
      accent: 'We build the digital side the business actually needs.',
      body: 'An excellent public presence is the beginning. When it creates value, we connect it to bookings, customers, operations, automation and custom software.',
      note: 'No templates. No filler features. No layers the business does not need.',
    },
    capabilities: {
      index: '02 / CAPABILITIES',
      title: 'From the first impression',
      accent: 'to the system behind it.',
      note: 'Four capabilities. Bought by need, not by package.',
      items: [
        { no: '01', name: 'Presence', desc: 'Premium websites, digital brand, content, conversion and experience.', image: IMAGES.hospitality },
        { no: '02', name: 'Bookings', desc: 'Reservations, enquiries, availability, confirmations and capture.', image: IMAGES.yachting },
        { no: '03', name: 'Control', desc: 'Customers, resources, operations, workflows and visibility.', image: IMAGES.automotive },
        { no: '04', name: 'Business', desc: 'Custom software, integrations, automation, data and analytics.', image: IMAGES.digital },
      ],
    },
    concepts: {
      index: '03 / CONCEPT LAB',
      title: 'Capability, demonstrated.',
      accent: 'No invented portfolio.',
      body: 'Until our first real case studies exist, we show what we can build through concept systems created by Archic.',
      items: [
        { no: '01', sector: 'HOSPITALITY SYSTEM', title: 'An impeccable guest experience outside. A clear operation inside.', stack: 'Web · Bookings · Guests · Operations', image: IMAGES.hospitality, alt: 'Archic concept for hospitality' },
        { no: '02', sector: 'AUTOMOTIVE SYSTEM', title: 'Presentation, fleet and demand in one digital layer.', stack: 'Presence · Fleet · Enquiries', image: IMAGES.automotive, alt: 'Archic concept for premium automotive' },
        { no: '03', sector: 'YACHTING SYSTEM', title: 'A premium service needs a digital experience to match.', stack: 'Charter · Leads · Operations', image: IMAGES.yachting, alt: 'Archic concept for yachting' },
      ],
    },
    system: {
      index: '04 / ONE SYSTEM',
      title: 'Start small.',
      accent: 'Grow without rebuilding everything.',
      body: 'Archic can enter through a website, a booking flow or one operational need. If the business needs more, the same foundation can evolve.',
      steps: [['01', 'Presence', 'Attract'], ['02', 'Bookings', 'Convert'], ['03', 'Control', 'Operate'], ['04', 'Business', 'Scale']],
      care: 'CARE / maintenance, security and continuous evolution.',
    },
    industries: {
      index: '05 / INDUSTRIES',
      title: 'Built for businesses where',
      accent: 'the experience matters.',
      items: [
        ['01', 'Hospitality', 'Reservations · Guest experience · Operations'],
        ['02', 'Automotive', 'Fleet · Enquiries · Customer journey'],
        ['03', 'Yachting', 'Charter · Leads · Operations'],
        ['04', 'Real Estate', 'Inventory · Leads · Private areas'],
        ['05', 'Premium Services', 'Experience · Conversion · Systems'],
      ],
    },
    standard: {
      label: 'OUR STANDARD',
      title: 'Quality is not an effect. It is the absence of weak decisions.',
      side: 'Clarity / Detail / Purpose / Endurance',
    },
    contact: {
      index: '06 / START A PROJECT',
      title: 'What should the digital side',
      accent: 'of your business do better?',
      body: 'Tell us what you have, what is not working and what you want to achieve. We start by understanding the problem, not by selling a feature list.',
    },
    footer: 'Digital systems for exceptional businesses.',
  },
}

export default function ArchicHome() {
  const { lang } = useLang()
  const c = COPY[lang]
  const canonicalUrl = homeCanonical(lang)
  const structuredData = buildHomeGraph(lang)
  const [activeCapability, setActiveCapability] = useState(0)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-sx-reveal]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        observer.unobserve(entry.target)
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

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

      <div className="sx" id="top">
        <StudioHeader />

        <section className="sx-hero sx-dark">
          <div className="sx-gridlines" aria-hidden="true" />
          <div className="sx-hero-copy">
            <p className="sx-eyebrow">{c.hero.eyebrow}</p>
            <h1>{c.hero.title} <em>{c.hero.accent}</em></h1>
            <p className="sx-hero-lead">{c.hero.lead}</p>
            <div className="sx-hero-actions">
              <a href="#contact" className="sx-button">{c.hero.cta}</a>
              <a href="#capabilities" className="sx-text-link">{c.hero.secondary}<span>↓</span></a>
            </div>
          </div>

          <div className="sx-hero-stage" data-sx-reveal>
            <div className="sx-hero-frame">
              <img src={IMAGES.digital} alt="Archic digital system" width={1664} height={936} decoding="async" fetchPriority="high" />
              <div className="sx-hero-shade" />
              <div className="sx-frame-top"><span>ARCHIC / SYSTEM 01</span><span>CONNECTED</span></div>
              <div className="sx-frame-bottom"><span>Strategy</span><span>Design</span><span>Technology</span></div>
            </div>
            <div className="sx-orbit sx-orbit-a" />
            <div className="sx-orbit sx-orbit-b" />
          </div>

          <div className="sx-hero-footer"><span>{c.hero.location}</span><span>{c.hero.stack}</span><span>01 — 2026</span></div>
          <div className="sx-hero-wordmark" aria-hidden="true">ARCHIC</div>
        </section>

        <section className="sx-intro sx-light" id="studio">
          <div className="sx-index">{c.intro.index}</div>
          <h2>{c.intro.title}<br /><span>{c.intro.accent}</span></h2>
          <div className="sx-intro-side"><p>{c.intro.body}</p><p className="sx-note">{c.intro.note}</p></div>
        </section>

        <section className="sx-capabilities sx-light" id="capabilities">
          <div className="sx-section-head">
            <div className="sx-index">{c.capabilities.index}</div>
            <h2>{c.capabilities.title}<br /><span>{c.capabilities.accent}</span></h2>
            <p>{c.capabilities.note}</p>
          </div>

          <div className="sx-cap-list">
            {c.capabilities.items.map((item, index) => (
              <article
                key={item.name}
                className={`sx-cap-row ${activeCapability === index ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveCapability(index)}
                onFocus={() => setActiveCapability(index)}
                tabIndex={0}
              >
                <div className="sx-cap-no">{item.no}</div>
                <div className="sx-cap-name">{item.name}</div>
                <div className="sx-cap-desc">{item.desc}</div>
                <div className="sx-cap-arrow">↗</div>
              </article>
            ))}
          </div>

          <div className="sx-cap-preview" data-sx-reveal>
            <img src={c.capabilities.items[activeCapability].image} alt="" width={1664} height={936} />
            <div><span>ARCHIC</span><span>{c.capabilities.items[activeCapability].name.toUpperCase()}</span></div>
          </div>
        </section>

        <section className="sx-concepts sx-dark" id="concepts">
          <div className="sx-concepts-intro">
            <div className="sx-index">{c.concepts.index}</div>
            <h2>{c.concepts.title}<br /><span>{c.concepts.accent}</span></h2>
            <p>{c.concepts.body}</p>
          </div>

          <div className="sx-concept-grid">
            {c.concepts.items.map((item, index) => (
              <article key={item.sector} className={`sx-concept ${index === 0 ? 'sx-concept-large' : ''}`} data-sx-reveal>
                <img src={item.image} alt={item.alt} width={1664} height={936} loading="lazy" decoding="async" />
                <div className="sx-concept-overlay" />
                <div className="sx-concept-top"><span>CONCEPT / NOT CLIENT WORK</span><span>{item.no}</span></div>
                <div className="sx-concept-copy"><p>{item.sector}</p><h3>{item.title}</h3><span>{item.stack}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="sx-system sx-light" id="system">
          <div>
            <div className="sx-index">{c.system.index}</div>
            <h2>{c.system.title}<br /><span>{c.system.accent}</span></h2>
          </div>
          <div className="sx-system-right">
            <p className="sx-system-lead">{c.system.body}</p>
            <div className="sx-system-line">
              {c.system.steps.map((step, index) => (
                <div className="sx-system-pair" key={step[1]}>
                  <div className="sx-system-step"><span>{step[0]}</span><strong>{step[1]}</strong><small>{step[2]}</small></div>
                  {index < c.system.steps.length - 1 && <div className="sx-system-connector" />}
                </div>
              ))}
            </div>
            <div className="sx-care"><span>+</span>{c.system.care}</div>
          </div>
        </section>

        <section className="sx-industries sx-dark">
          <div className="sx-industries-head">
            <div className="sx-index">{c.industries.index}</div>
            <h2>{c.industries.title}<br /><span>{c.industries.accent}</span></h2>
          </div>
          <div className="sx-industry-list">
            {c.industries.items.map((item) => <div key={item[1]}><span>{item[0]}</span><strong>{item[1]}</strong><small>{item[2]}</small></div>)}
          </div>
        </section>

        <section className="sx-standard">
          <img src="/brand/archic-mark-dark.svg" alt="" width={459} height={412} />
          <div><p>{c.standard.label}</p><h2>{c.standard.title}</h2></div>
          <span>{c.standard.side}</span>
        </section>

        <section className="sx-contact sx-light" id="contact">
          <div className="sx-contact-top">
            <div className="sx-index">{c.contact.index}</div>
            <h2>{c.contact.title}<br /><span>{c.contact.accent}</span></h2>
          </div>
          <div className="sx-contact-bottom">
            <p>{c.contact.body}</p>
            <a href={`mailto:${CONTACT_MAIL}`} className="sx-contact-mail">{CONTACT_MAIL}<span>↗</span></a>
          </div>
        </section>

        <footer className="sx-footer">
          <img src="/brand/archic-lockup-light.svg" alt="Archic" width={981} height={174} />
          <span>{c.footer}</span>
          <span>© {new Date().getFullYear()} ARCHIC</span>
        </footer>
      </div>
    </>
  )
}
