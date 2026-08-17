import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import MarketFocus from '../components/MarketFocus'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE } from '../config/contact'

type Lang = 'es' | 'en'
type SystemTone = 'positive' | 'accent' | 'neutral'
type HeroSystem = {
  id: string
  tab: string
  label: string
  title: string
  preview: string
  href: string
  metric: string
  metricLabel: string
  stats: [string, string, SystemTone][]
}

const COPY = {
  es: {
    hero: {
      kicker: 'ARCHIC / DIGITAL SYSTEMS',
      titleA: 'Diseñamos lo que',
      titleB: 'hace avanzar',
      titleC: 'un negocio.',
      body: 'Diseñamos webs, experiencias digitales y software a medida para negocios que necesitan algo más que presencia: captar mejor, operar mejor y crecer sin perder nivel.',
      cta: 'Empezar un proyecto',
      secondary: 'Ver cómo trabajamos',
      meta: ['ÉCIJA · SEVILLA', 'MARBELLA · COSTA DEL SOL', 'MOBILITY · HOSPITALITY · REAL ESTATE', 'ES / EN'],
    },
    layers: {
      kicker: 'PRESENCIA / CONTROL / NEGOCIO',
      title: 'Lo que ve el cliente. Lo que usa el equipo. Lo que hace crecer el negocio.',
      body: 'Cada proyecto entra por una necesidad distinta. Podemos resolver solo la capa pública o conectar marca, operaciones y software en un mismo sistema.',
      items: [
        ['01', 'Presence', 'Una presencia que sostiene el valor.', 'Dirección digital, web, contenido, experiencia y conversión.', 'presence'],
        ['02', 'Control', 'Una operación que no depende de parches.', 'Clientes, reservas, recursos, operaciones y gestión privada.', 'control'],
        ['03', 'Business', 'Software para lo que ya no cabe en una web.', 'Automatización, integraciones, datos y producto a medida.', 'business'],
      ],
      open: 'Descubrir',
    },
    work: {
      kicker: 'VERTICALES / SOFTWARE QUE SE PUEDE PROBAR',
      title: 'No solo lo contamos. Puedes entrar.',
      body: 'Estamos construyendo profundidad en hospitality, movilidad premium e inmobiliario. Los entornos son white-label y usan datos ficticios, pero la lógica de producto es real.',
      items: [
        ['01', 'Hostelería', 'Reservas · Sala · Clientes · Carta', 'Opera reservas, ocupación, clientes y servicio desde una versión neutral basada en un sistema de hostelería desarrollado por Archic.'],
        ['02', 'Movilidad premium', 'Flota · Solicitudes · Calendario · Clientes', 'Gestiona disponibilidad, tarifas, solicitudes y movimientos de flota en un entorno white-label con datos ficticios.'],
        ['03', 'Inmobiliario', 'Propiedades · CRM · Visitas · Contenido', 'Recorre portfolio, enquiries, prioridades, visitas y calidad de contenido con la lógica de una plataforma inmobiliaria completa.'],
      ],
      open: 'Abrir sistema',
    },
    standard: {
      kicker: 'ARCHIC QUALITY GATE / 2026.1',
      titleA: '“Se ve bien”',
      titleB: 'no es el final.',
      body: 'La entrega pasa por una capa de verificación propia: estructura, responsive, interacción, estados, rendimiento y revisión visual. El detalle se comprueba antes de publicar.',
      command: 'npm run quality:gate',
      status: 'PASS',
      checks: [
        ['01', 'Arquitectura', 'Rutas, jerarquía, contenido y enlaces'],
        ['02', 'Responsive', 'Desktop y móvil tratados como experiencias'],
        ['03', 'Producto', 'Formularios, estados y recorridos críticos'],
        ['04', 'Rendimiento', 'Carga, estabilidad y percepción de velocidad'],
        ['05', 'Visual audit', 'Encuadre, contraste, overflow y detalle final'],
      ],
      footerA: 'BUILD',
      footerB: 'VERIFY',
      footerC: 'SHIP',
    },
    close: {
      kicker: 'ÉCIJA · SEVILLA · MARBELLA · ESPAÑA',
      titleA: 'Una web puede abrir la puerta.',
      titleB: 'El sistema decide hasta dónde llegas.',
      body: 'Cuéntanos cómo vendes, reservas, gestionas o atiendes hoy. Empezamos por la fricción que de verdad existe y construimos desde ahí.',
      cta: 'Hablar con Archic',
      call: 'Llamar',
    },
  },
  en: {
    hero: {
      kicker: 'ARCHIC / DIGITAL SYSTEMS',
      titleA: 'We design what',
      titleB: 'moves a business',
      titleC: 'forward.',
      body: 'We design websites, digital experiences and custom software for businesses that need more than presence: stronger acquisition, better operations and room to grow without losing quality.',
      cta: 'Start a project',
      secondary: 'See how we work',
      meta: ['ÉCIJA · SEVILLE', 'MARBELLA · COSTA DEL SOL', 'MOBILITY · HOSPITALITY · REAL ESTATE', 'ES / EN'],
    },
    layers: {
      kicker: 'PRESENCE / CONTROL / BUSINESS',
      title: 'What customers see. What teams use. What lets the business grow.',
      body: 'Every project starts from a different need. We can solve the public-facing layer only, or connect brand, operations and software into one system.',
      items: [
        ['01', 'Presence', 'A presence that sustains value.', 'Digital direction, web, content, experience and conversion.', 'presence'],
        ['02', 'Control', 'Operations without patchwork.', 'Customers, bookings, resources, operations and private management.', 'control'],
        ['03', 'Business', 'Software for what no longer fits inside a website.', 'Automation, integrations, data and custom product.', 'business'],
      ],
      open: 'Explore',
    },
    work: {
      kicker: 'VERTICALS / SOFTWARE YOU CAN TEST',
      title: 'We do not just describe it. You can enter it.',
      body: 'We are building depth in hospitality, luxury mobility and real estate. The environments are white-label and use fictional data, but the product logic is real.',
      items: [
        ['01', 'Hospitality', 'Bookings · Floor · Customers · Menu', 'Operate bookings, occupancy, customers and service in a neutral version based on a hospitality system built by Archic.'],
        ['02', 'Luxury mobility', 'Fleet · Enquiries · Calendar · Clients', 'Manage availability, rates, enquiries and fleet movements inside a white-label environment with fictional data.'],
        ['03', 'Real estate', 'Properties · CRM · Viewings · Content', 'Explore portfolio, enquiries, priorities, viewings and content quality with the logic of a complete property platform.'],
      ],
      open: 'Open system',
    },
    standard: {
      kicker: 'ARCHIC QUALITY GATE / 2026.1',
      titleA: '“Looks good”',
      titleB: 'is not the finish line.',
      body: 'Delivery runs through our own verification layer: structure, responsive behaviour, interaction, states, performance and visual review. Detail is checked before release.',
      command: 'npm run quality:gate',
      status: 'PASS',
      checks: [
        ['01', 'Architecture', 'Routes, hierarchy, content and links'],
        ['02', 'Responsive', 'Desktop and mobile treated as experiences'],
        ['03', 'Product', 'Forms, states and critical journeys'],
        ['04', 'Performance', 'Loading, stability and perceived speed'],
        ['05', 'Visual audit', 'Framing, contrast, overflow and final detail'],
      ],
      footerA: 'BUILD',
      footerB: 'VERIFY',
      footerC: 'SHIP',
    },
    close: {
      kicker: 'ÉCIJA · SEVILLE · MARBELLA · SPAIN',
      titleA: 'A website can open the door.',
      titleB: 'The system decides how far you go.',
      body: 'Tell us how you sell, book, manage or serve customers today. We start with the friction that actually exists and build from there.',
      cta: 'Talk to Archic',
      call: 'Call',
    },
  },
} as const

const HERO_SYSTEMS: Record<Lang, HeroSystem[]> = {
  es: [
    {
      id: 'hospitality', tab: 'Hostelería', label: 'CONTROL / SERVICIO', title: 'Reservas y sala en un mismo sistema.',
      preview: '/software/hospitality-preview.svg', href: 'explorations/hospitality', metric: '82%', metricLabel: 'ocupación',
      stats: [['08', 'reservas hoy', 'positive'], ['06', 'clientes activos', 'neutral'], ['01', 'acción pendiente', 'accent']],
    },
    {
      id: 'mobility', tab: 'Movilidad', label: 'CONTROL / FLOTA', title: 'Disponibilidad, solicitudes y movimientos.',
      preview: '/software/mobility-preview.svg', href: 'explorations/mobility', metric: '78%', metricLabel: 'utilización',
      stats: [['16', 'vehículos', 'positive'], ['05', 'alquilados', 'neutral'], ['03', 'solicitudes', 'accent']],
    },
    {
      id: 'property', tab: 'Inmobiliario', label: 'CONTROL / CRM', title: 'Portfolio, leads y visitas con contexto.',
      preview: '/software/real-estate-preview.svg', href: 'explorations/real-estate', metric: '92%', metricLabel: 'contenido',
      stats: [['12', 'propiedades', 'positive'], ['06', 'leads abiertos', 'neutral'], ['02', 'visitas', 'accent']],
    },
  ],
  en: [
    {
      id: 'hospitality', tab: 'Hospitality', label: 'CONTROL / SERVICE', title: 'Bookings and floor operations in one system.',
      preview: '/software/hospitality-preview.svg', href: 'explorations/hospitality', metric: '82%', metricLabel: 'occupancy',
      stats: [['08', 'bookings today', 'positive'], ['06', 'active customers', 'neutral'], ['01', 'action pending', 'accent']],
    },
    {
      id: 'mobility', tab: 'Mobility', label: 'CONTROL / FLEET', title: 'Availability, enquiries and fleet movements.',
      preview: '/software/mobility-preview.svg', href: 'explorations/mobility', metric: '78%', metricLabel: 'utilisation',
      stats: [['16', 'vehicles', 'positive'], ['05', 'on hire', 'neutral'], ['03', 'enquiries', 'accent']],
    },
    {
      id: 'property', tab: 'Real estate', label: 'CONTROL / CRM', title: 'Portfolio, leads and viewings with context.',
      preview: '/software/real-estate-preview.svg', href: 'explorations/real-estate', metric: '92%', metricLabel: 'content score',
      stats: [['12', 'properties', 'positive'], ['06', 'open leads', 'neutral'], ['02', 'viewings', 'accent']],
    },
  ],
}

const EXPLORATION_SLUGS = ['explorations/hospitality', 'explorations/mobility', 'explorations/real-estate'] as const

function path(lang: Lang, slug: string) {
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

function HeroSystemConsole({ lang }: { lang: Lang }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const systems = HERO_SYSTEMS[lang]
  const active = systems[activeIndex]

  return (
    <div className="ahs-system" data-reveal>
      <div className="ahs-topbar">
        <div className="ahs-brand"><img src="/brand/archic-symbol-2026.svg" alt="" /><span>ARCHIC CONTROL</span></div>
        <div className="ahs-live"><i />WHITE-LABEL / DEMO</div>
      </div>
      <div className="ahs-tabs" role="tablist" aria-label={lang === 'es' ? 'Sistemas de demostración' : 'Demo systems'}>
        {systems.map((system, index) => (
          <button
            key={system.id}
            id={`ahs-tab-${system.id}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls="ahs-panel"
            onClick={() => setActiveIndex(index)}
          >
            <span>0{index + 1}</span><strong>{system.tab}</strong>
          </button>
        ))}
      </div>
      <div id="ahs-panel" className="ahs-panel" role="tabpanel" aria-labelledby={`ahs-tab-${active.id}`}>
        <div className="ahs-preview">
          <img key={active.id} src={active.preview} alt="" />
          <div className="ahs-preview-status"><i /><span>{lang === 'es' ? 'DATOS FICTICIOS' : 'FICTIONAL DATA'}</span></div>
        </div>
        <div className="ahs-summary">
          <div><small>{active.label}</small><h2>{active.title}</h2></div>
          <strong>{active.metric}<small>{active.metricLabel}</small></strong>
        </div>
        <div className="ahs-stats">
          {active.stats.map(([value, label, tone]) => (
            <div data-tone={tone} key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
        <a className="ahs-open" href={path(lang, active.href)}>
          <span>{lang === 'es' ? 'Abrir entorno interactivo' : 'Open interactive environment'}</span>
          <i className="as-arrow" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

function InterfaceStudy({ type, lang }: { type: number; lang: Lang }) {
  if (type === 0) {
    return (
      <div className="ah-study ah-study-hospitality" aria-hidden="true">
        <div className="ah-study-top"><span>CONTROL / {lang === 'es' ? 'HOY' : 'TODAY'}</span><span>82%</span></div>
        <div className="ah-study-title">08<br /><em>{lang === 'es' ? 'reservas.' : 'bookings.'}</em></div>
        <div className="ah-study-reserve"><span>{lang === 'es' ? 'SALA' : 'FLOOR'}</span><i /><span>06</span><strong>{lang === 'es' ? 'Clientes' : 'Customers'}</strong></div>
      </div>
    )
  }

  if (type === 1) {
    return (
      <div className="ah-study ah-study-mobility" aria-hidden="true">
        <div className="ah-car-line" />
        <div className="ah-study-top"><span>CONTROL / FLEET</span><span>16 {lang === 'es' ? 'UNIDADES' : 'UNITS'}</span></div>
        <div className="ah-model"><small>AVAILABLE / 01</small><strong>APEX<br />GT</strong></div>
        <div className="ah-specs"><span>€690/D</span><span>530 CV</span><span>78%</span></div>
      </div>
    )
  }

  return (
    <div className="ah-study ah-study-property" aria-hidden="true">
      <div className="ah-property-grid">
        <div><span>CONTROL</span><strong>Portfolio<br />12</strong></div>
        <div><small>CRM</small><small>{lang === 'es' ? '06 ABIERTOS' : '06 OPEN'}</small><b>92%</b></div>
      </div>
      <div className="ah-property-list"><i /><i /><i /></div>
      <div className="ah-property-foot"><span>{lang === 'es' ? 'ENQUIRIES · VISITAS · CONTENIDO' : 'ENQUIRIES · VIEWINGS · CONTENT'}</span><span>{lang === 'es' ? 'ABRIR →' : 'OPEN →'}</span></div>
    </div>
  )
}

function QualityGate({ lang }: { lang: Lang }) {
  const c = COPY[lang].standard

  return (
    <section className="ah-quality" aria-labelledby="archic-quality-title">
      <div className="ah-quality-copy" data-reveal>
        <p className="ah-kicker">{c.kicker}</p>
        <h2 id="archic-quality-title"><span>{c.titleA}</span><em>{c.titleB}</em></h2>
        <p>{c.body}</p>
        <div className="ah-quality-flow" aria-label={lang === 'es' ? 'Flujo de entrega' : 'Delivery flow'}>
          <span>{c.footerA}</span><i /><span>{c.footerB}</span><i /><span>{c.footerC}</span>
        </div>
      </div>

      <div className="ah-quality-console" data-reveal>
        <div className="ahq-topbar">
          <div><img src="/brand/archic-symbol-2026.svg" alt="" /><span>QUALITY / GATE</span></div>
          <span className="ahq-status"><i />{c.status}</span>
        </div>
        <div className="ahq-command"><span>$</span><code>{c.command}</code></div>
        <div className="ahq-log">
          {c.checks.map(([no, label, detail]) => (
            <div className="ahq-row" key={no}>
              <span>{no}</span>
              <strong>{label}</strong>
              <p>{detail}</p>
              <b>PASS</b>
            </div>
          ))}
        </div>
        <div className="ahq-foot">
          <span>ARCHIC_2026.1</span>
          <span>5 / 5</span>
        </div>
      </div>
    </section>
  )
}

export default function ArchicHome() {
  const { lang } = useLang()
  const c = COPY[lang]
  const seo = HOME_SEO[lang]
  const canonicalUrl = homeCanonical(lang)
  const structuredData = buildHomeGraph(lang)
  const ogImage = siteOgImage(lang)

  return (
    <div className="as-site as-home-v2" data-quality-standard="archic-2026.1">
      <Helmet htmlAttributes={{ lang }}>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={seo.ogAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={seo.ogAlt} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <StudioExperience />
      <StudioHeader />

      <div className="ah-page">
        <section className="ah-hero" id="home">
          <div className="ah-hero-grid" aria-hidden="true" />
          <div className="ah-hero-copy" data-reveal="hero">
            <p className="ah-kicker">{c.hero.kicker}</p>
            <h1>
              <span>{c.hero.titleA}</span>
              <em>{c.hero.titleB}</em>
              <span>{c.hero.titleC}</span>
            </h1>
            <div className="ah-hero-bottom">
              <p>{c.hero.body}</p>
              <div className="ah-actions">
                <a className="ah-btn ah-btn-light" href={path(lang, 'contact')}>{c.hero.cta}<i className="as-arrow" aria-hidden="true" /></a>
                <a className="ah-link" href={path(lang, 'studio')}>{c.hero.secondary}</a>
              </div>
            </div>
          </div>

          <HeroSystemConsole lang={lang} />

          <div className="ah-hero-meta">
            {c.hero.meta.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <MarketFocus />

        <section className="ah-layers">
          <div className="ah-section-head" data-reveal>
            <div>
              <p className="ah-kicker">{c.layers.kicker}</p>
              <h2>{c.layers.title}</h2>
            </div>
            <p>{c.layers.body}</p>
          </div>
          <div className="ah-layer-list">
            {c.layers.items.map(([no, name, title, body, slug]) => (
              <a href={path(lang, slug)} className="ah-layer-row" key={slug} data-reveal>
                <span className="ah-row-no">{no}</span>
                <strong>{name}</strong>
                <div><h3>{title}</h3><p>{body}</p></div>
                <span className="ah-row-open">{c.layers.open}<i className="as-arrow" aria-hidden="true" /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="ah-work ah-paper">
          <div className="ah-work-head" data-reveal>
            <div>
              <p className="ah-kicker ah-kicker-dark">{c.work.kicker}</p>
              <h2>{c.work.title}</h2>
            </div>
            <p>{c.work.body}</p>
          </div>
          <div className="ah-work-grid">
            {c.work.items.map(([no, title, meta, body], index) => {
              const href = path(lang, EXPLORATION_SLUGS[index])
              return (
                <article className="ah-work-card" key={title} data-reveal>
                  <a className="ah-study-link" href={href} aria-label={`${c.work.open}: ${title}`}>
                    <InterfaceStudy type={index} lang={lang} />
                  </a>
                  <div className="ah-work-card-copy">
                    <span>{no}</span>
                    <div><strong>{title}</strong><small>{meta}</small></div>
                    <p>{body}</p>
                    <a className="ah-work-open" href={href}>{c.work.open}<i className="as-arrow" aria-hidden="true" /></a>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <QualityGate lang={lang} />

        <section className="ah-close">
          <div className="ah-close-line" aria-hidden="true" />
          <div className="ah-close-copy" data-reveal>
            <p className="ah-kicker">{c.close.kicker}</p>
            <h2>{c.close.titleA}<br /><em>{c.close.titleB}</em></h2>
            <p>{c.close.body}</p>
            <div className="ah-actions ah-actions-center">
              <a className="ah-btn ah-btn-light" href={path(lang, 'contact')}>{c.close.cta}<i className="as-arrow" aria-hidden="true" /></a>
              <a className="ah-link" href={`tel:${CONTACT_PHONE}`}>{c.close.call}</a>
            </div>
          </div>
        </section>
      </div>

      <StudioFooter />
    </div>
  )
}
