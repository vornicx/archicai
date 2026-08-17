import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE } from '../config/contact'
import heroMarbella from '../assets/hero-marbella.jpg'
import workRealEstate from '../assets/work-realestate.jpg'
import workBocana from '../assets/work-bocana.jpg'
import workAutomotive from '../assets/work-automotive.jpg'

type Lang = 'es' | 'en'
type DemoId = 'hospitality' | 'mobility' | 'property'
type WorkItem = { name: string; kind: string; scope: string; image: string; href: string; code: string }
type PrototypeItem = { title: string; sector: string; image: string; href: string; code: string }
type DemoItem = { id: DemoId; tab: string; eyebrow: string; title: string; metric: string; metricLabel: string; preview: string; href: string }

const COPY = {
  es: {
    hero: {
      kicker: 'ARCHIC / DIGITAL PRODUCT STUDIO',
      title: ['Tu negocio ya tiene', 'un nivel.', 'Lo digital tiene que', 'estar a la altura.'],
      lead: 'Diseñamos webs, producto digital y software a medida para negocios que cuidan su presencia, su operación y cómo se perciben.',
      work: 'Ver trabajo', prototypes: 'Ver prototipos', note: 'Écija · Sevilla · Marbella · España',
    },
    selected: {
      kicker: 'TRABAJO SELECCIONADO',
      title: 'El nivel no se explica. Se ve.',
      body: 'Prototipos y sistemas diseñados alrededor del negocio: la experiencia pública, la conversión y lo que ocurre detrás.',
      open: 'Ver proyecto', concept: 'ARCHIC / CONCEPT BUILD',
    },
    prototypes: {
      kicker: 'PROTOTIPOS / CONCEPT BUILDS',
      title: 'Prototipos que elevan la conversación.',
      body: 'Antes de vender una idea, la hacemos visible. Diseñamos concept builds para enseñar nivel, dirección y oportunidad en negocios donde la presencia digital importa.',
      cta: 'Explorar prototipos', label: 'CONCEPT BUILD',
    },
    system: {
      kicker: 'UN SISTEMA, NO SOLO UNA WEB',
      title: 'Construimos sistemas digitales que trabajan para tu negocio.',
      body: 'La presencia atrae. El control ordena. El software conecta. Diseñamos las tres capas como una sola experiencia.',
      lanes: [
        ['01', 'Presencia', 'Branding, web y producto digital que proyectan tu nivel y convierten atención en deseo.', 'presence'],
        ['02', 'Control', 'Paneles y herramientas que dan visibilidad, orden y control real de la operación.', 'control'],
        ['03', 'Negocio', 'Automatización, datos e integraciones que reducen fricción y abren oportunidades.', 'business'],
      ],
      link: 'Ver el sistema Archic',
    },
    direction: {
      kicker: 'NICHO Y DIRECCIÓN',
      title: ['Construimos cerca.', 'Subimos el listón hacia sectores donde lo digital pesa más.'],
      body: 'Seguimos creciendo desde Écija y Sevilla mientras profundizamos en Marbella y Costa del Sol, especialmente donde marca, experiencia y operación tienen un valor alto.',
      local: 'Écija / Sevilla', target: 'Marbella / Costa del Sol',
      sectors: ['Luxury mobility', 'Hospitality', 'Real estate', 'Yachting / charter'],
    },
    quality: {
      kicker: 'ARCHIC QUALITY STANDARD / 2026.1',
      title: 'El acabado forma parte del build.',
      checks: ['Responsive real', 'Recorridos críticos', 'Contraste y legibilidad', 'Performance', 'Visual audit'],
      status: 'QUALITY GATE / PASS',
    },
    close: {
      kicker: 'ARCHIC / START A PROJECT',
      title: ['Si vamos a hacer algo,', 'que merezca existir.'],
      body: 'Cuéntanos el negocio, el nivel que buscas y el sistema que necesitas detrás.',
      cta: 'Hablar con Archic', call: 'Llamar',
    },
  },
  en: {
    hero: {
      kicker: 'ARCHIC / DIGITAL PRODUCT STUDIO',
      title: ['Your business already', 'has a level.', 'Digital should', 'live up to it.'],
      lead: 'We design websites, digital products and custom software for businesses that care about their presence, operations and perception.',
      work: 'View work', prototypes: 'View prototypes', note: 'Écija · Seville · Marbella · Spain',
    },
    selected: {
      kicker: 'SELECTED WORK',
      title: 'Level is not explained. It is seen.',
      body: 'Concept builds and systems designed around the business: public experience, conversion and everything happening behind it.',
      open: 'View project', concept: 'ARCHIC / CONCEPT BUILD',
    },
    prototypes: {
      kicker: 'PROTOTYPES / CONCEPT BUILDS',
      title: 'Prototypes that raise the conversation.',
      body: 'Before selling an idea, we make it visible. We design concept builds to show level, direction and opportunity where digital presence carries real weight.',
      cta: 'Explore prototypes', label: 'CONCEPT BUILD',
    },
    system: {
      kicker: 'A SYSTEM, NOT JUST A WEBSITE',
      title: 'We build digital systems that work for the business.',
      body: 'Presence attracts. Control creates order. Software connects. We design all three as one experience.',
      lanes: [
        ['01', 'Presence', 'Brand, web and digital product that project your level and turn attention into desire.', 'presence'],
        ['02', 'Control', 'Dashboards and tools that give teams visibility, order and operational control.', 'control'],
        ['03', 'Business', 'Automation, data and integrations that reduce friction and create new opportunities.', 'business'],
      ],
      link: 'See the Archic system',
    },
    direction: {
      kicker: 'NICHE & DIRECTION',
      title: ['We build close to home.', 'We raise the bar where digital matters more.'],
      body: 'We keep growing from Écija and Seville while building depth in Marbella and the Costa del Sol, especially where brand, experience and operations carry high value.',
      local: 'Écija / Seville', target: 'Marbella / Costa del Sol',
      sectors: ['Luxury mobility', 'Hospitality', 'Real estate', 'Yachting / charter'],
    },
    quality: {
      kicker: 'ARCHIC QUALITY STANDARD / 2026.1',
      title: 'Finish is part of the build.',
      checks: ['Real responsive', 'Critical journeys', 'Contrast & legibility', 'Performance', 'Visual audit'],
      status: 'QUALITY GATE / PASS',
    },
    close: {
      kicker: 'ARCHIC / START A PROJECT',
      title: ['If we are going to build it,', 'it should deserve to exist.'],
      body: 'Tell us the business, the level you are aiming for and the system you need behind it.',
      cta: 'Talk to Archic', call: 'Call',
    },
  },
} as const

const WORK: Record<Lang, WorkItem[]> = {
  es: [
    { name: 'Marbella For Sale', kind: 'Real estate de alta gama', scope: 'Dirección digital · Portfolio · CRM · Owner Studio', image: workRealEstate, href: '/explorations/real-estate/', code: '01 / REAL ESTATE' },
    { name: 'La Bocana', kind: 'Hospitality / Puerto Banús', scope: 'Web · Reservas · Sala · Clientes · Carta', image: workBocana, href: '/explorations/hospitality/', code: '02 / HOSPITALITY' },
    { name: 'Five Star Rentals', kind: 'Luxury mobility', scope: 'Brand presence · Fleet · Enquiries · Owner access', image: workAutomotive, href: '/explorations/mobility/', code: '03 / MOBILITY' },
  ],
  en: [
    { name: 'Marbella For Sale', kind: 'High-end real estate', scope: 'Digital direction · Portfolio · CRM · Owner Studio', image: workRealEstate, href: '/en/explorations/real-estate/', code: '01 / REAL ESTATE' },
    { name: 'La Bocana', kind: 'Hospitality / Puerto Banús', scope: 'Website · Bookings · Floor · Customers · Menu', image: workBocana, href: '/en/explorations/hospitality/', code: '02 / HOSPITALITY' },
    { name: 'Five Star Rentals', kind: 'Luxury mobility', scope: 'Brand presence · Fleet · Enquiries · Owner access', image: workAutomotive, href: '/en/explorations/mobility/', code: '03 / MOBILITY' },
  ],
}

const PROTOTYPES: Record<Lang, PrototypeItem[]> = {
  es: [
    { title: 'Boutique hospitality', sector: 'Hotel / experience', image: workBocana, href: '/explorations/hospitality/', code: 'P01' },
    { title: 'Private real estate', sector: 'Property / advisory', image: workRealEstate, href: '/explorations/real-estate/', code: 'P02' },
    { title: 'Luxury automotive', sector: 'Mobility / showroom', image: workAutomotive, href: '/explorations/mobility/', code: 'P03' },
  ],
  en: [
    { title: 'Boutique hospitality', sector: 'Hotel / experience', image: workBocana, href: '/en/explorations/hospitality/', code: 'P01' },
    { title: 'Private real estate', sector: 'Property / advisory', image: workRealEstate, href: '/en/explorations/real-estate/', code: 'P02' },
    { title: 'Luxury automotive', sector: 'Mobility / showroom', image: workAutomotive, href: '/en/explorations/mobility/', code: 'P03' },
  ],
}

const HERO_DEMOS: Record<Lang, DemoItem[]> = {
  es: [
    { id: 'hospitality', tab: 'Hospitality', eyebrow: 'RESERVAS / SALA', title: 'Servicio y ocupación en contexto.', metric: '82%', metricLabel: 'ocupación', preview: '/software/hospitality-preview.svg', href: '/explorations/hospitality/' },
    { id: 'mobility', tab: 'Movilidad', eyebrow: 'FLOTA / SOLICITUDES', title: 'Disponibilidad que se puede operar.', metric: '16', metricLabel: 'unidades', preview: '/software/mobility-preview.svg', href: '/explorations/mobility/' },
    { id: 'property', tab: 'Real estate', eyebrow: 'PORTFOLIO / CRM', title: 'Propiedades, leads y visitas conectados.', metric: '12', metricLabel: 'activos', preview: '/software/real-estate-preview.svg', href: '/explorations/real-estate/' },
  ],
  en: [
    { id: 'hospitality', tab: 'Hospitality', eyebrow: 'BOOKINGS / FLOOR', title: 'Service and occupancy in context.', metric: '82%', metricLabel: 'occupancy', preview: '/software/hospitality-preview.svg', href: '/en/explorations/hospitality/' },
    { id: 'mobility', tab: 'Mobility', eyebrow: 'FLEET / ENQUIRIES', title: 'Availability teams can operate.', metric: '16', metricLabel: 'units', preview: '/software/mobility-preview.svg', href: '/en/explorations/mobility/' },
    { id: 'property', tab: 'Real estate', eyebrow: 'PORTFOLIO / CRM', title: 'Properties, leads and viewings connected.', metric: '12', metricLabel: 'active', preview: '/software/real-estate-preview.svg', href: '/en/explorations/real-estate/' },
  ],
}

function path(lang: Lang, slug: string) { return lang === 'en' ? `/en/${slug}/` : `/${slug}/` }
function Arrow() { return <i className="as-arrow" aria-hidden="true" /> }

function HeroSystemConsole({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0)
  const demos = HERO_DEMOS[lang]
  const demo = demos[active]
  const dataLabel = lang === 'es' ? 'DATOS FICTICIOS' : 'FICTIONAL DATA'

  return (
    <aside className="af4-console" aria-label={lang === 'es' ? 'Demo interactiva de Archic Control' : 'Interactive Archic Control demo'}>
      <div className="af4-console-top"><span>ARCHIC / CONTROL CENTER</span><span><i />{dataLabel}</span></div>
      <div className="af4-console-tabs" role="tablist" aria-label={lang === 'es' ? 'Demos interactivas' : 'Interactive demos'}>
        {demos.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>{item.tab}</button>)}
      </div>
      <a className="af4-console-body" href={demo.href}>
        <div className="af4-console-preview"><img key={demo.id} src={demo.preview} alt="" /></div>
        <div className="af4-console-copy">
          <small>{demo.eyebrow}</small>
          <strong>{demo.title}</strong>
          <div><b>{demo.metric}</b><span>{demo.metricLabel}</span></div>
          <em>{lang === 'es' ? 'Abrir sistema' : 'Open system'}<Arrow /></em>
        </div>
      </a>
    </aside>
  )
}

function WorkFeature({ item, index, lang }: { item: WorkItem; index: number; lang: Lang }) {
  return (
    <article className={`af4-case af4-case-${index + 1}`}>
      <a href={item.href} className="af4-case-media">
        <img src={item.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
        <span className="af4-case-code">{item.code}</span>
        {index === 1 && <div className="af4-case-reservation" aria-hidden="true"><span>RESERVAS / LIVE</span><b>08</b><small>today</small><i /><i /><i /></div>}
        {index === 2 && <div className="af4-case-fleet" aria-hidden="true"><span>FLEET</span><b>16</b><small>{lang === 'es' ? 'unidades' : 'units'}</small><em>92%</em></div>}
      </a>
      <div className="af4-case-copy">
        <div><span>{item.kind}</span><span>{COPY[lang].selected.concept}</span></div>
        <h3>{item.name}</h3>
        <p>{item.scope}</p>
        <a href={item.href}>{COPY[lang].selected.open}<Arrow /></a>
      </div>
    </article>
  )
}

function DirectionMap({ lang }: { lang: Lang }) {
  const c = COPY[lang].direction
  return (
    <div className="af4-route" aria-hidden="true">
      <svg viewBox="0 0 720 250" role="img">
        <path className="af4-route-coast" d="M30 62C84 78 111 105 154 113c52 10 73-27 119-16 52 13 52 64 106 75 58 12 96-25 142-15 49 10 64 45 120 40 23-2 39-8 49-12" />
        <path className="af4-route-line" d="M160 58C218 86 241 112 294 126c60 16 101 19 164 58" />
        <circle cx="160" cy="58" r="7" /><circle cx="458" cy="184" r="9" />
        <circle className="af4-route-ring" cx="160" cy="58" r="19" /><circle className="af4-route-ring" cx="458" cy="184" r="25" />
      </svg>
      <span className="af4-route-local">{c.local}</span><span className="af4-route-target">{c.target}</span>
    </div>
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
    <div className="as-site af4-site" data-quality-standard="archic-2026.1">
      <Helmet htmlAttributes={{ lang }}>
        <title>{seo.title}</title><meta name="description" content={seo.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/" /><link rel="alternate" hrefLang="en" href="https://archic.es/en/" /><link rel="alternate" hrefLang="x-default" href="https://archic.es/" />
        <meta property="og:type" content="website" /><meta property="og:site_name" content="Archic" /><meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seo.title} /><meta property="og:description" content={seo.description} /><meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta property="og:image:alt" content={seo.ogAlt} />
        <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={seo.title} /><meta name="twitter:description" content={seo.description} /><meta name="twitter:image" content={ogImage} /><meta name="twitter:image:alt" content={seo.ogAlt} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <StudioExperience /><StudioHeader />
      <main className="af4-main">
        <section className="af4-hero" id="home">
          <img className="af4-hero-image" src={heroMarbella} alt="" />
          <div className="af4-hero-wash" aria-hidden="true" />
          <div className="af4-hero-copy">
            <p className="af4-kicker">{c.hero.kicker}</p>
            <h1><span>{c.hero.title[0]}</span><em>{c.hero.title[1]}</em><span>{c.hero.title[2]}</span><em>{c.hero.title[3]}</em></h1>
            <p className="af4-hero-lead">{c.hero.lead}</p>
            <div className="af4-actions"><a className="af4-btn af4-btn-gold" href="#selected-work">{c.hero.work}</a><a className="af4-btn af4-btn-ghost" href="#prototypes">{c.hero.prototypes}</a></div>
          </div>
          <HeroSystemConsole lang={lang as Lang} />
          <div className="af4-hero-foot"><span>{c.hero.note}</span><span>SCROLL / 01</span></div>
        </section>

        <section className="af4-selected" id="selected-work">
          <header className="af4-section-head"><p className="af4-kicker af4-kicker-dark">{c.selected.kicker}</p><h2>{c.selected.title}</h2><p>{c.selected.body}</p></header>
          <div className="af4-case-grid">{WORK[lang].map((item, index) => <WorkFeature key={item.name} item={item} index={index} lang={lang as Lang} />)}</div>
        </section>

        <section className="af4-prototypes" id="prototypes">
          <div className="af4-prototype-intro"><p className="af4-kicker">{c.prototypes.kicker}</p><h2>{c.prototypes.title}</h2><p>{c.prototypes.body}</p><a href="#prototype-grid">{c.prototypes.cta}<Arrow /></a></div>
          <div className="af4-prototype-grid" id="prototype-grid">
            {PROTOTYPES[lang].map((item) => (
              <a className="af4-prototype" href={item.href} key={item.code}>
                <img src={item.image} alt="" loading="lazy" /><div className="af4-prototype-shade" />
                <span className="af4-prototype-badge">{c.prototypes.label}</span><span className="af4-prototype-code">{item.code}</span>
                <div><small>{item.sector}</small><strong>{item.title}</strong><em><Arrow /></em></div>
              </a>
            ))}
          </div>
        </section>

        <section className="af4-system" id="system">
          <div className="af4-system-intro"><p className="af4-kicker af4-kicker-dark">{c.system.kicker}</p><h2>{c.system.title}</h2><p>{c.system.body}</p></div>
          <div className="af4-lanes">
            {c.system.lanes.map(([no, title, body, slug], index) => (
              <a href={path(lang, slug)} key={slug} className="af4-lane"><span>{no}</span><i className={`af4-lane-icon af4-lane-icon-${index + 1}`} aria-hidden="true" /><strong>{title}</strong><p>{body}</p><Arrow /></a>
            ))}
          </div>
          <a className="af4-system-link" href={path(lang, 'business')}>{c.system.link}<Arrow /></a>
        </section>

        <section className="af4-direction" id="niche">
          <div className="af4-direction-copy"><p className="af4-kicker">{c.direction.kicker}</p><h2><span>{c.direction.title[0]}</span><em>{c.direction.title[1]}</em></h2><p>{c.direction.body}</p></div>
          <DirectionMap lang={lang as Lang} />
          <div className="af4-sector-list">{c.direction.sectors.map((sector, index) => <div key={sector}><span>0{index + 1}</span><strong>{sector}</strong></div>)}</div>
        </section>

        <section className="af4-quality">
          <div><p className="af4-kicker af4-kicker-dark">{c.quality.kicker}</p><h2>{c.quality.title}</h2></div>
          <div className="af4-quality-checks">{c.quality.checks.map((check, index) => <span key={check}><b>0{index + 1}</b>{check}<i>PASS</i></span>)}</div>
          <strong className="af4-quality-status">{c.quality.status}</strong>
        </section>

        <section className="af4-close">
          <img src={heroMarbella} alt="" className="af4-close-image" /><div className="af4-close-wash" aria-hidden="true" />
          <div className="af4-close-copy"><p className="af4-kicker">{c.close.kicker}</p><h2>{c.close.title[0]}<br /><em>{c.close.title[1]}</em></h2><p>{c.close.body}</p><div className="af4-actions"><a className="af4-btn af4-btn-gold" href={path(lang, 'contact')}>{c.close.cta}</a><a className="af4-btn af4-btn-ghost" href={`tel:${CONTACT_PHONE}`}>{c.close.call}</a></div></div>
        </section>
      </main>
      <StudioFooter />
    </div>
  )
}
