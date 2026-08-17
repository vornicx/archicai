import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE } from '../config/contact'

type Lang = 'es' | 'en'

type WorkItem = {
  name: string
  kind: string
  scope: string
  image: string
  href: string
  tone: 'light' | 'dark'
  feature: 'property' | 'hospitality' | 'mobility' | 'yachting'
}

const COPY = {
  es: {
    hero: {
      kicker: 'ARCHIC / DIGITAL PRODUCT STUDIO',
      line1: 'Tu negocio ya tiene',
      line2: 'un nivel.',
      line3: 'Lo digital tiene que',
      line4: 'estar a la altura.',
      lead: 'Diseñamos y construimos webs, producto digital y software a medida para empresas que cuidan cómo se perciben y cómo funcionan.',
      cta: 'Empezar un proyecto',
      work: 'Ver trabajo seleccionado',
      note: 'Écija · Sevilla · Marbella · España',
    },
    reel: ['WEB', 'PRODUCT', 'SOFTWARE', 'SYSTEMS', 'MOTION', 'OPERATIONS'],
    selected: {
      kicker: 'SELECTED WORK / 2026',
      title: 'El estándar se demuestra trabajando.',
      lead: 'No queremos que confíes en una lista de promesas. Queremos que veas cómo resolvemos negocios distintos cuando marca, producto y operación tienen que sentirse como una sola cosa.',
      open: 'Abrir sistema',
    },
    transition: {
      overline: 'ARCHIC / HOW WE THINK',
      titleA: 'No empezamos por',
      titleB: '“qué páginas necesitas”.',
      body: 'Empezamos por lo que el cliente debe sentir, lo que el negocio necesita conseguir y lo que el equipo tiene que poder gestionar después.',
    },
    system: {
      kicker: 'ONE DIGITAL SYSTEM',
      title: 'Presencia delante. Control detrás. Negocio conectado.',
      lead: 'Una web premium pierde valor si la operación que hay detrás sigue dependiendo de hojas sueltas, WhatsApp, herramientas desconectadas o tareas manuales.',
      labels: ['Cliente', 'Presencia', 'Conversión', 'Control', 'Datos', 'Negocio'],
      lanes: [
        ['01', 'Presence', 'Marca, contenido, web y experiencia pública.', 'presence'],
        ['02', 'Control', 'Clientes, reservas, inventario, flota, propiedades y operaciones.', 'control'],
        ['03', 'Business', 'Automatización, integraciones, datos y software a medida.', 'business'],
      ],
      cta: 'Ver cómo se conecta',
    },
    direction: {
      kicker: 'WHERE WE ARE GOING',
      titleA: 'Construimos cerca.',
      titleB: 'Subimos el listón hacia sectores donde lo digital pesa más.',
      body: 'Seguimos trabajando con buenos negocios de Écija y Sevilla mientras acumulamos profundidad en Marbella y Costa del Sol, especialmente en movilidad premium, hospitality, real estate y servicios de alto valor.',
      sectors: ['Luxury mobility', 'Hospitality', 'Real estate', 'Yachting / charter'],
      local: 'Base / Écija · Sevilla',
      target: 'Foco creciente / Marbella · Costa del Sol',
      cta: 'Ver enfoque en Marbella',
    },
    quality: {
      kicker: 'ARCHIC QUALITY STANDARD / 2026.1',
      titleA: 'Antes de publicar,',
      titleB: 'intentamos romperlo.',
      body: 'Responsive real, estados, formularios, overflow, contraste, rendimiento y recorridos críticos. El acabado no se revisa al final: forma parte del build.',
      checks: [
        ['01', 'Architecture', 'routes / hierarchy / content', 'PASS'],
        ['02', 'Responsive', 'desktop / mobile / touch', 'PASS'],
        ['03', 'Product', 'forms / states / journeys', 'PASS'],
        ['04', 'Performance', 'load / stability / motion', 'PASS'],
        ['05', 'Visual audit', 'crop / contrast / overflow', 'PASS'],
      ],
      terminal: '$ npm run quality:gate',
      output: 'ARCHIC QUALITY GATE — PASS',
    },
    close: {
      kicker: 'ARCHIC / START A PROJECT',
      titleA: 'Si vamos a hacer algo,',
      titleB: 'que merezca existir.',
      body: 'Cuéntanos qué negocio tienes, qué no está funcionando como debería y hasta dónde quieres llevarlo. Nosotros planteamos la experiencia y el sistema alrededor.',
      cta: 'Hablar con Archic',
      call: 'Llamar',
    },
  },
  en: {
    hero: {
      kicker: 'ARCHIC / DIGITAL PRODUCT STUDIO',
      line1: 'Your business already',
      line2: 'has a level.',
      line3: 'Digital should',
      line4: 'live up to it.',
      lead: 'We design and build websites, digital products and custom software for businesses that care about how they are perceived and how they operate.',
      cta: 'Start a project',
      work: 'View selected work',
      note: 'Écija · Seville · Marbella · Spain',
    },
    reel: ['WEB', 'PRODUCT', 'SOFTWARE', 'SYSTEMS', 'MOTION', 'OPERATIONS'],
    selected: {
      kicker: 'SELECTED WORK / 2026',
      title: 'The standard is proven in the work.',
      lead: 'We do not want you to trust a list of promises. We want you to see how we approach different businesses when brand, product and operations have to feel like one system.',
      open: 'Open system',
    },
    transition: {
      overline: 'ARCHIC / HOW WE THINK',
      titleA: 'We do not start with',
      titleB: '“which pages do you need”.',
      body: 'We start with what the customer should feel, what the business needs to achieve and what the team must be able to manage afterwards.',
    },
    system: {
      kicker: 'ONE DIGITAL SYSTEM',
      title: 'Presence in front. Control behind. Business connected.',
      lead: 'A premium website loses value if the operation behind it still depends on loose spreadsheets, WhatsApp, disconnected tools or manual tasks.',
      labels: ['Customer', 'Presence', 'Conversion', 'Control', 'Data', 'Business'],
      lanes: [
        ['01', 'Presence', 'Brand, content, website and public experience.', 'presence'],
        ['02', 'Control', 'Customers, bookings, inventory, fleet, properties and operations.', 'control'],
        ['03', 'Business', 'Automation, integrations, data and custom software.', 'business'],
      ],
      cta: 'See how it connects',
    },
    direction: {
      kicker: 'WHERE WE ARE GOING',
      titleA: 'We build close to home.',
      titleB: 'We raise the bar toward sectors where digital matters more.',
      body: 'We continue working with strong businesses in Écija and Seville while building depth in Marbella and the Costa del Sol, especially across luxury mobility, hospitality, real estate and high-value services.',
      sectors: ['Luxury mobility', 'Hospitality', 'Real estate', 'Yachting / charter'],
      local: 'Base / Écija · Seville',
      target: 'Growing focus / Marbella · Costa del Sol',
      cta: 'See our Marbella focus',
    },
    quality: {
      kicker: 'ARCHIC QUALITY STANDARD / 2026.1',
      titleA: 'Before we publish,',
      titleB: 'we try to break it.',
      body: 'Real responsive behaviour, states, forms, overflow, contrast, performance and critical journeys. Finish is not reviewed at the end: it is part of the build.',
      checks: [
        ['01', 'Architecture', 'routes / hierarchy / content', 'PASS'],
        ['02', 'Responsive', 'desktop / mobile / touch', 'PASS'],
        ['03', 'Product', 'forms / states / journeys', 'PASS'],
        ['04', 'Performance', 'load / stability / motion', 'PASS'],
        ['05', 'Visual audit', 'crop / contrast / overflow', 'PASS'],
      ],
      terminal: '$ npm run quality:gate',
      output: 'ARCHIC QUALITY GATE — PASS',
    },
    close: {
      kicker: 'ARCHIC / START A PROJECT',
      titleA: 'If we are going to build it,',
      titleB: 'it should deserve to exist.',
      body: 'Tell us what business you run, what is not working as it should and how far you want to take it. We shape the experience and system around that.',
      cta: 'Talk to Archic',
      call: 'Call',
    },
  },
} as const

const WORK: Record<Lang, WorkItem[]> = {
  es: [
    {
      name: 'Marbella For Sale',
      kind: 'Luxury real estate',
      scope: 'Dirección digital · Portfolio · CRM · Owner Studio',
      image: '/img/archic-digital-system.webp',
      href: '/explorations/real-estate/',
      tone: 'light',
      feature: 'property',
    },
    {
      name: 'La Bocana',
      kind: 'Hospitality / Puerto Banús',
      scope: 'Web · Reservas · Sala · Clientes · Carta',
      image: '/img/archic-hospitality-system.webp',
      href: '/explorations/hospitality/',
      tone: 'dark',
      feature: 'hospitality',
    },
    {
      name: 'Five Star Rentals',
      kind: 'Luxury mobility',
      scope: 'Brand presence · Fleet · Enquiries · Owner access',
      image: '/img/archic-automotive-system.webp',
      href: '/explorations/mobility/',
      tone: 'dark',
      feature: 'mobility',
    },
    {
      name: 'Marbella Boat Charter',
      kind: 'Yachting / charter',
      scope: 'Experience · Fleet · WhatsApp conversion',
      image: '/img/archic-yachting-system.webp',
      href: '/diseno-web-marbella/',
      tone: 'light',
      feature: 'yachting',
    },
  ],
  en: [
    {
      name: 'Marbella For Sale',
      kind: 'Luxury real estate',
      scope: 'Digital direction · Portfolio · CRM · Owner Studio',
      image: '/img/archic-digital-system.webp',
      href: '/en/explorations/real-estate/',
      tone: 'light',
      feature: 'property',
    },
    {
      name: 'La Bocana',
      kind: 'Hospitality / Puerto Banús',
      scope: 'Website · Bookings · Floor · Customers · Menu',
      image: '/img/archic-hospitality-system.webp',
      href: '/en/explorations/hospitality/',
      tone: 'dark',
      feature: 'hospitality',
    },
    {
      name: 'Five Star Rentals',
      kind: 'Luxury mobility',
      scope: 'Brand presence · Fleet · Enquiries · Owner access',
      image: '/img/archic-automotive-system.webp',
      href: '/en/explorations/mobility/',
      tone: 'dark',
      feature: 'mobility',
    },
    {
      name: 'Marbella Boat Charter',
      kind: 'Yachting / charter',
      scope: 'Experience · Fleet · WhatsApp conversion',
      image: '/img/archic-yachting-system.webp',
      href: '/en/diseno-web-marbella/',
      tone: 'light',
      feature: 'yachting',
    },
  ],
}

function path(lang: Lang, slug: string) {
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

function Arrow() {
  return <i className="as-arrow" aria-hidden="true" />
}

function ProjectInstrument({ feature, lang }: { feature: WorkItem['feature']; lang: Lang }) {
  if (feature === 'property') {
    return (
      <div className="af3-instrument af3-property" aria-hidden="true">
        <div className="af3-browser-bar"><span /><span /><span /><b>marbella / owner studio</b></div>
        <div className="af3-property-grid">
          <div className="af3-property-main"><small>PORTFOLIO</small><strong>12</strong><span>{lang === 'es' ? 'propiedades activas' : 'active properties'}</span></div>
          <div><small>CRM</small><strong>06</strong><span>{lang === 'es' ? 'leads abiertos' : 'open leads'}</span></div>
          <div><small>CONTENT</small><strong>92%</strong><span>{lang === 'es' ? 'completitud' : 'completion'}</span></div>
        </div>
      </div>
    )
  }

  if (feature === 'hospitality') {
    return (
      <div className="af3-instrument af3-hospitality" aria-hidden="true">
        <div className="af3-table-map">
          <span className="is-live">T01</span><span>T02</span><span className="is-live">T03</span><span>T04</span><span>T05</span><span className="is-live">T06</span>
        </div>
        <div className="af3-hospitality-stats"><small>{lang === 'es' ? 'HOY / SALA' : 'TODAY / FLOOR'}</small><strong>08</strong><span>{lang === 'es' ? 'reservas' : 'bookings'}</span><b>82%</b></div>
      </div>
    )
  }

  if (feature === 'mobility') {
    return (
      <div className="af3-instrument af3-mobility" aria-hidden="true">
        <div className="af3-fleet-head"><small>FLEET / LIVE</small><span>16 {lang === 'es' ? 'UNIDADES' : 'UNITS'}</span></div>
        <div className="af3-fleet-model"><span>AVAILABLE / 01</span><strong>APEX<br />GT</strong></div>
        <div className="af3-fleet-spec"><span>€690 / D</span><span>530 CV</span><span>78%</span></div>
      </div>
    )
  }

  return (
    <div className="af3-instrument af3-yachting" aria-hidden="true">
      <div className="af3-yacht-route"><i /><i /><i /></div>
      <small>MARBELLA / 36.51°N</small>
      <strong>{lang === 'es' ? 'CONSULTA' : 'ENQUIRY'}</strong>
      <span>WhatsApp / direct</span>
    </div>
  )
}

function WorkCard({ item, index, lang, open }: { item: WorkItem; index: number; lang: Lang; open: string }) {
  return (
    <article className={`af3-work af3-work-${index + 1}`} data-tone={item.tone} data-reveal>
      <div className="af3-work-media">
        <img src={item.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
        <div className="af3-work-shade" />
        <ProjectInstrument feature={item.feature} lang={lang} />
        <span className="af3-work-index">0{index + 1}</span>
      </div>
      <div className="af3-work-copy">
        <div className="af3-work-meta"><span>{item.kind}</span><span>ARCHIC / 2026</span></div>
        <h3>{item.name}</h3>
        <p>{item.scope}</p>
        <a href={item.href}>{open}<Arrow /></a>
      </div>
    </article>
  )
}

export default function ArchicHome() {
  const { lang } = useLang()
  const c = COPY[lang]
  const seo = HOME_SEO[lang]
  const canonicalUrl = homeCanonical(lang)
  const structuredData = buildHomeGraph(lang)
  const ogImage = siteOgImage(lang)
  const work = WORK[lang]

  return (
    <div className="as-site af3-site" data-quality-standard="archic-2026.1">
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

      <main className="af3-main">
        <section className="af3-hero" id="home">
          <div className="af3-hero-grid" aria-hidden="true" />
          <div className="af3-hero-copy" data-reveal="hero">
            <p className="af3-kicker">{c.hero.kicker}</p>
            <h1>
              <span>{c.hero.line1}</span>
              <em>{c.hero.line2}</em>
              <span>{c.hero.line3}</span>
              <em>{c.hero.line4}</em>
            </h1>
            <div className="af3-hero-bottom">
              <p>{c.hero.lead}</p>
              <div className="af3-actions">
                <a className="af3-button" href={path(lang, 'contact')}>{c.hero.cta}<Arrow /></a>
                <a className="af3-text-link" href="#selected-work">{c.hero.work}</a>
              </div>
            </div>
          </div>

          <div className="af3-hero-stage" data-reveal aria-label={lang === 'es' ? 'Muestra visual de trabajo Archic' : 'Archic work showcase'}>
            <div className="af3-stage-card af3-stage-card-a"><img src="/img/archic-digital-system.webp" alt="" /><span>MARBELLA FOR SALE</span></div>
            <div className="af3-stage-card af3-stage-card-b"><img src="/img/archic-hospitality-system.webp" alt="" /><span>LA BOCANA</span></div>
            <div className="af3-stage-card af3-stage-card-c"><img src="/img/archic-automotive-system.webp" alt="" /><span>FIVE STAR RENTALS</span></div>
            <div className="af3-stage-core">
              <img src="/brand/archic-symbol-2026.svg" alt="" />
              <span>DESIGN / BUILD / OPERATE</span>
            </div>
          </div>

          <div className="af3-hero-foot">
            <span>{c.hero.note}</span>
            <span>SCROLL / 01</span>
          </div>
        </section>

        <div className="af3-reel" aria-hidden="true">
          <div>{[...c.reel, ...c.reel].map((item, i) => <span key={`${item}-${i}`}>{item}<i /></span>)}</div>
        </div>

        <section className="af3-selected" id="selected-work">
          <header className="af3-selected-head" data-reveal>
            <p className="af3-kicker af3-kicker-dark">{c.selected.kicker}</p>
            <h2>{c.selected.title}</h2>
            <p>{c.selected.lead}</p>
          </header>

          <div className="af3-work-list">
            {work.map((item, index) => <WorkCard key={item.name} item={item} index={index} lang={lang as Lang} open={c.selected.open} />)}
          </div>
        </section>

        <section className="af3-transition">
          <div className="af3-transition-word" aria-hidden="true">SYSTEM</div>
          <div className="af3-transition-copy" data-reveal>
            <p className="af3-kicker">{c.transition.overline}</p>
            <h2>{c.transition.titleA}<br /><em>{c.transition.titleB}</em></h2>
            <p>{c.transition.body}</p>
          </div>
        </section>

        <section className="af3-system">
          <div className="af3-system-head" data-reveal>
            <div><p className="af3-kicker af3-kicker-dark">{c.system.kicker}</p><h2>{c.system.title}</h2></div>
            <p>{c.system.lead}</p>
          </div>

          <div className="af3-system-map" data-reveal>
            <div className="af3-map-track" aria-hidden="true">
              {c.system.labels.map((label, index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong>{index < c.system.labels.length - 1 && <i />}</div>)}
            </div>
            <div className="af3-map-lanes">
              {c.system.lanes.map(([no, title, body, slug]) => (
                <a href={path(lang, slug)} key={slug}>
                  <span>{no}</span>
                  <strong>{title}</strong>
                  <p>{body}</p>
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
          <a className="af3-system-link" href={path(lang, 'business')}>{c.system.cta}<Arrow /></a>
        </section>

        <section className="af3-direction">
          <div className="af3-direction-media" aria-hidden="true"><img src="/img/archic-yachting-system.webp" alt="" /><div /></div>
          <div className="af3-direction-copy" data-reveal>
            <p className="af3-kicker">{c.direction.kicker}</p>
            <h2><span>{c.direction.titleA}</span><em>{c.direction.titleB}</em></h2>
            <p>{c.direction.body}</p>
            <div className="af3-direction-sectors">{c.direction.sectors.map((sector) => <span key={sector}>{sector}</span>)}</div>
            <div className="af3-direction-geo"><span>{c.direction.local}</span><span>{c.direction.target}</span></div>
            <a className="af3-button af3-button-light" href={lang === 'en' ? '/en/diseno-web-marbella/' : '/diseno-web-marbella/'}>{c.direction.cta}<Arrow /></a>
          </div>
        </section>

        <section className="af3-quality">
          <div className="af3-quality-copy" data-reveal>
            <p className="af3-kicker">{c.quality.kicker}</p>
            <h2>{c.quality.titleA}<br /><em>{c.quality.titleB}</em></h2>
            <p>{c.quality.body}</p>
          </div>
          <div className="af3-quality-console" data-reveal>
            <div className="af3-console-head"><span>ARCHIC / QA</span><span className="is-live"><i />LIVE STANDARD</span></div>
            <div className="af3-console-command"><span>terminal</span><code>{c.quality.terminal}</code></div>
            <div className="af3-console-checks">
              {c.quality.checks.map(([no, name, detail, status]) => (
                <div key={no}><span>{no}</span><strong>{name}</strong><small>{detail}</small><b>{status}</b></div>
              ))}
            </div>
            <div className="af3-console-output"><span>✓</span><strong>{c.quality.output}</strong><small>2026.1 / READY TO SHIP</small></div>
          </div>
        </section>

        <section className="af3-close">
          <div className="af3-close-grid" aria-hidden="true" />
          <div className="af3-close-copy" data-reveal>
            <p className="af3-kicker">{c.close.kicker}</p>
            <h2>{c.close.titleA}<br /><em>{c.close.titleB}</em></h2>
            <p>{c.close.body}</p>
            <div className="af3-actions af3-actions-center">
              <a className="af3-button" href={path(lang, 'contact')}>{c.close.cta}<Arrow /></a>
              <a className="af3-text-link" href={`tel:${CONTACT_PHONE}`}>{c.close.call}</a>
            </div>
          </div>
          <div className="af3-close-mark" aria-hidden="true"><img src="/brand/archic-symbol-2026.svg" alt="" /></div>
        </section>
      </main>

      <StudioFooter />
    </div>
  )
}
