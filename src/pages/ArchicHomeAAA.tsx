import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'
import './ArchicHomeAAA.css'

type Lang = 'es' | 'en'

type WorkItem = {
  name: string
  sector: string
  scope: string
  image: string
  href: string
  index: string
}

const COPY = {
  es: {
    hero: {
      title: ['Que te vean mejor.', 'Que trabajes mejor.'],
      lead: 'Diseñamos webs, web apps y software web a medida para transformar cómo tu negocio se presenta, vende y opera.',
      primary: 'Cuéntanos tu proyecto',
      secondary: 'Ver trabajo',
      note: 'Dirección humana · IA supervisada · QA real',
      stage: 'Una experiencia pública y el sistema que la sostiene.',
    },
    rail: ['Dirección digital', 'Webs', 'Web apps', 'Software web'],
    system: {
      title: 'Tres capas. Una dirección.',
      body: 'No vendemos páginas sueltas. Diseñamos la capa que más impacto tiene ahora y dejamos preparada la siguiente.',
      items: [
        ['Presence', 'Que te entiendan y te elijan.', 'Dirección visual, contenido, captación, catálogo, reservas y experiencia pública.'],
        ['Control', 'Que el negocio esté bajo control.', 'Clientes, recursos, reservas, disponibilidad, estados y flujos internos.'],
        ['Business', 'Que el software se adapte a ti.', 'Software web, automatización e integraciones cuando lo genérico deja de encajar.'],
      ],
    },
    work: {
      title: 'Trabajo que se puede abrir.',
      body: 'Concept builds navegables. Nada de renders vacíos ni resultados inventados.',
      concept: 'Concept build',
      open: 'Abrir proyecto',
    },
    method: {
      title: 'Menos teatro. Más decisiones.',
      body: 'Entendemos el negocio, elegimos una dirección, construimos sobre producto real y lo sometemos a QA antes de darlo por terminado.',
      steps: [
        ['01', 'Entender', 'Negocio, cliente, operación y oportunidad.'],
        ['02', 'Dirigir', 'Arquitectura, contenido y mundo visual.'],
        ['03', 'Construir', 'Diseño y desarrollo sobre una experiencia real.'],
        ['04', 'Forzar', 'Mobile, rendimiento, accesibilidad y recorrido crítico.'],
        ['05', 'Lanzar', 'Producción, medición y siguiente decisión.'],
      ],
    },
    investment: {
      title: 'Empezamos donde tiene sentido.',
      body: 'Cada negocio necesita una mezcla distinta. Estos son los puntos de entrada actuales.',
      from: 'desde',
      items: [
        ['Presence', '1.200 €', 'Presencia digital'],
        ['Control', '2.500 €', 'Operación privada'],
        ['Business', '4.000 €', 'Software web'],
        ['Evolution', '150 €/mes', 'Mejora continua'],
      ],
      note: 'Mínimos orientativos · IVA no incluido · presupuesto final tras diagnóstico',
    },
    close: {
      title: ['Si tu negocio ya creció,', 'que se note.'],
      body: 'Cuéntanos qué quieres vender, ordenar o construir. Te diremos por dónde empezar.',
      primary: 'Cuéntanos tu proyecto',
      phone: 'Llamar',
      note: 'Sin coste para proyectos con encaje.',
    },
  },
  en: {
    hero: {
      title: ['Look better.', 'Work better.'],
      lead: 'We design websites, web apps and custom web software that transform how your business presents itself, sells and operates.',
      primary: 'Tell us about your project',
      secondary: 'See the work',
      note: 'Human direction · Supervised AI · Real QA',
      stage: 'A public experience and the system that supports it.',
    },
    rail: ['Digital direction', 'Websites', 'Web apps', 'Web software'],
    system: {
      title: 'Three layers. One direction.',
      body: 'We do not sell isolated pages. We design the layer with the highest impact now and leave the next one ready.',
      items: [
        ['Presence', 'Be understood. Be chosen.', 'Visual direction, content, acquisition, catalogues, bookings and public experience.'],
        ['Control', 'Keep the operation under control.', 'Customers, resources, bookings, availability, states and internal workflows.'],
        ['Business', 'Make software fit the business.', 'Web software, automation and integrations when generic tools stop fitting.'],
      ],
    },
    work: {
      title: 'Work you can actually open.',
      body: 'Navigable concept builds. No empty renders and no fabricated outcomes.',
      concept: 'Concept build',
      open: 'Open project',
    },
    method: {
      title: 'Less theatre. More decisions.',
      body: 'We understand the business, choose a direction, build on the real product and push it through QA before calling it finished.',
      steps: [
        ['01', 'Understand', 'Business, customer, operation and opportunity.'],
        ['02', 'Direct', 'Architecture, content and visual world.'],
        ['03', 'Build', 'Design and development on a real experience.'],
        ['04', 'Stress', 'Mobile, performance, accessibility and critical journey.'],
        ['05', 'Launch', 'Production, measurement and the next decision.'],
      ],
    },
    investment: {
      title: 'Start where it makes sense.',
      body: 'Every business needs a different mix. These are our current entry points.',
      from: 'from',
      items: [
        ['Presence', '€1,200', 'Digital presence'],
        ['Control', '€2,500', 'Private operations'],
        ['Business', '€4,000', 'Web software'],
        ['Evolution', '€150/mo', 'Continuous improvement'],
      ],
      note: 'Indicative minimums · VAT not included · final quote after diagnosis',
    },
    close: {
      title: ['If the business has grown,', 'it should look like it.'],
      body: 'Tell us what you need to sell, organise or build. We will tell you where to start.',
      primary: 'Tell us about your project',
      phone: 'Call',
      note: 'No cost for projects with fit.',
    },
  },
} as const

const WORK: Record<Lang, WorkItem[]> = {
  es: [
    { name: 'Marbella For Sale', sector: 'Real estate', scope: 'Presence + Owner Studio', image: '/software/real-estate-preview.svg', href: '/explorations/real-estate/', index: '01' },
    { name: 'La Bocana', sector: 'Hospitality', scope: 'Presence + Reservas', image: '/software/hospitality-preview.svg', href: '/explorations/hospitality/', index: '02' },
    { name: 'Five Star Rentals', sector: 'Mobility', scope: 'Flota + Owner access', image: '/software/mobility-preview.svg', href: '/explorations/mobility/', index: '03' },
  ],
  en: [
    { name: 'Marbella For Sale', sector: 'Real estate', scope: 'Presence + Owner Studio', image: '/software/real-estate-preview.svg', href: '/en/explorations/real-estate/', index: '01' },
    { name: 'La Bocana', sector: 'Hospitality', scope: 'Presence + Bookings', image: '/software/hospitality-preview.svg', href: '/en/explorations/hospitality/', index: '02' },
    { name: 'Five Star Rentals', sector: 'Mobility', scope: 'Fleet + Owner access', image: '/software/mobility-preview.svg', href: '/en/explorations/mobility/', index: '03' },
  ],
}

const PILLAR_ASSETS = ['/software/real-estate-preview.svg', '/software/hospitality-preview.svg', '/software/mobility-preview.svg']

function Arrow() {
  return <i className="as-arrow" aria-hidden="true" />
}

function ProjectMonolith({ lang }: { lang: Lang }) {
  const c = COPY[lang].hero
  return (
    <div className="aaa-monolith" aria-hidden="true">
      <div className="aaa-monolith-shadow" />
      <div className="aaa-monolith-object">
        <div className="aaa-monolith-bar"><span>ARCHIC / CONCEPT BUILD</span><b>01</b></div>
        <div className="aaa-monolith-media"><img src="/software/real-estate-preview.svg" alt="" /></div>
        <div className="aaa-monolith-foot"><strong>{c.stage}</strong><span>PRESENCE / CONTROL</span></div>
      </div>
      <span className="aaa-monolith-edge" />
      <span className="aaa-monolith-orbit aaa-monolith-orbit-a" />
      <span className="aaa-monolith-orbit aaa-monolith-orbit-b" />
    </div>
  )
}

function PillarGrid({ lang }: { lang: Lang }) {
  const c = COPY[lang].system
  return (
    <div className="aaa-pillars">
      {c.items.map(([name, headline, body], index) => (
        <a className="aaa-pillar" href={lang === 'en' ? `/en/${name.toLowerCase()}/` : `/${name.toLowerCase()}/`} key={name}>
          <div className="aaa-pillar-copy">
            <span>0{index + 1}</span>
            <h3>{name}</h3>
            <strong>{headline}</strong>
            <p>{body}</p>
            <Arrow />
          </div>
          <div className="aaa-pillar-media"><img src={PILLAR_ASSETS[index]} alt="" loading="lazy" /></div>
        </a>
      ))}
    </div>
  )
}

function WorkCard({ item, featured, lang }: { item: WorkItem; featured?: boolean; lang: Lang }) {
  const c = COPY[lang].work
  return (
    <article className={`aaa-work-card${featured ? ' is-featured' : ''}`}>
      <a className="aaa-work-image" href={item.href} data-archic-intent={`work:${item.name}`}>
        <img src={item.image} alt={`${item.name} · ${c.concept}`} loading={featured ? 'eager' : 'lazy'} />
        <span>{c.concept}</span>
      </a>
      <div className="aaa-work-info">
        <span>{item.index}</span>
        <div><small>{item.sector}</small><h3>{item.name}</h3><p>{item.scope}</p></div>
        <a href={item.href} aria-label={`${c.open}: ${item.name}`} data-archic-intent={`work-open:${item.name}`}><Arrow /></a>
      </div>
    </article>
  )
}

function ProcessRail({ lang }: { lang: Lang }) {
  const c = COPY[lang].method
  return (
    <div className="aaa-process-rail">
      {c.steps.map(([no, title, body]) => (
        <article key={no}>
          <span>{no}</span>
          <i aria-hidden="true" />
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  )
}

export default function ArchicHomeAAA() {
  const { lang } = useLang()
  const currentLang = lang as Lang
  const c = COPY[currentLang]
  const seo = HOME_SEO[currentLang]
  const canonicalUrl = homeCanonical(currentLang)
  const structuredData = buildHomeGraph(currentLang)
  const ogImage = siteOgImage(currentLang)
  const auditHref = currentLang === 'en' ? '/en/contact/?intent=audit' : '/contact/?intent=audit'

  return (
    <div className="as-site aaa-site" data-quality-standard="aaa-design-art-direction-v2">
      <Helmet htmlAttributes={{ lang: currentLang }}>
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

      <main id="main-content" className="aaa-main" tabIndex={-1}>
        <section className="aaa-hero" id="home" data-archic-view="hero">
          <div className="aaa-hero-rule" aria-hidden="true" />
          <div className="aaa-shell aaa-hero-shell">
            <div className="aaa-hero-copy">
              <h1><span>{c.hero.title[0]}</span><span>{c.hero.title[1]}</span></h1>
              <p>{c.hero.lead}</p>
              <div className="aaa-hero-actions">
                <a className="aaa-button aaa-button-light" href={auditHref} data-archic-intent="hero:audit">{c.hero.primary}<Arrow /></a>
                <a className="aaa-text-link" href="#selected-work" data-archic-intent="hero:work">{c.hero.secondary}<Arrow /></a>
              </div>
              <small>{c.hero.note}</small>
            </div>
            <ProjectMonolith lang={currentLang} />
          </div>
        </section>

        <div className="aaa-capability-rail" aria-label={currentLang === 'es' ? 'Capacidades' : 'Capabilities'}>
          <div className="aaa-shell">{c.rail.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div>
        </div>

        <section className="aaa-system aaa-section" id="system" data-archic-view="system">
          <div className="aaa-shell">
            <header className="aaa-intro">
              <h2>{c.system.title}</h2>
              <p>{c.system.body}</p>
            </header>
            <PillarGrid lang={currentLang} />
          </div>
        </section>

        <section className="aaa-work aaa-section" id="selected-work" data-archic-view="selected-work">
          <div className="aaa-shell">
            <header className="aaa-intro is-light">
              <h2>{c.work.title}</h2>
              <p>{c.work.body}</p>
            </header>
            <div className="aaa-work-grid">
              <WorkCard item={WORK[currentLang][0]} featured lang={currentLang} />
              <div className="aaa-work-pair">
                <WorkCard item={WORK[currentLang][1]} lang={currentLang} />
                <WorkCard item={WORK[currentLang][2]} lang={currentLang} />
              </div>
            </div>
          </div>
        </section>

        <section className="aaa-method aaa-section" id="method" data-archic-view="method-quality">
          <div className="aaa-shell">
            <header className="aaa-intro">
              <h2>{c.method.title}</h2>
              <p>{c.method.body}</p>
            </header>
            <ProcessRail lang={currentLang} />
          </div>
        </section>

        <section className="aaa-investment aaa-section" id="investment" data-archic-view="investment">
          <div className="aaa-shell aaa-investment-grid">
            <header>
              <h2>{c.investment.title}</h2>
              <p>{c.investment.body}</p>
            </header>
            <div className="aaa-price-list">
              {c.investment.items.map(([name, price, subtitle]) => (
                <a href={auditHref} key={name} data-archic-intent={`investment:${name}`}>
                  <div><h3>{name}</h3><p>{subtitle}</p></div>
                  <small>{c.investment.from}</small>
                  <strong>{price}</strong>
                  <Arrow />
                </a>
              ))}
              <p className="aaa-price-note">{c.investment.note}</p>
            </div>
          </div>
        </section>

        <section className="aaa-close" id="audit" data-archic-view="audit">
          <div className="aaa-shell aaa-close-grid">
            <h2>{c.close.title[0]}<span>{c.close.title[1]}</span></h2>
            <div>
              <p>{c.close.body}</p>
              <div className="aaa-close-actions">
                <a className="aaa-button aaa-button-ink" href={auditHref} data-archic-intent="audit:request">{c.close.primary}<Arrow /></a>
                <a className="aaa-text-link is-ink" href={`tel:${CONTACT_PHONE}`} data-archic-intent="audit:call">{c.close.phone} · {CONTACT_PHONE_DISPLAY}<Arrow /></a>
              </div>
              <small>{c.close.note}</small>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  )
}
