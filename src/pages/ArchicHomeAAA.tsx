import { Helmet } from 'react-helmet-async'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
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
  note: string
}

const ARCHITECTURE_HERO = 'https://images.unsplash.com/photo-1763238273638-3264cf27298a?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000'
const ARCHITECTURE_ONE = 'https://images.unsplash.com/photo-1776514222617-cd3d0139c926?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000'
const ARCHITECTURE_TWO = 'https://images.unsplash.com/photo-1778880983920-734f2958475e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000'
const YACHT_IMAGE = 'https://images.unsplash.com/photo-1770929356223-639d10f7feee?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000'
const MAFESUR_IMAGE = 'https://www.mafesur.es/wp-content/uploads/2025/09/20200923_132714-1024x498.jpg'

const COPY = {
  es: {
    hero: {
      eyebrow: 'IA supervisada. Dirección humana.',
      titleStart: 'Construimos sistemas digitales que',
      titleAccent: 'transforman',
      titleEnd: 'negocios.',
      lead: 'Estrategia, diseño y desarrollo para negocios que quieren verse a otro nivel y trabajar con menos fricción.',
      primary: 'Ver nuestro trabajo',
      secondary: 'Nuestro proceso',
      stageEyebrow: 'Marbella · concept build',
      stageTitle: 'Experiencias que se sienten a otro nivel.',
      stageLink: 'Explorar el sistema',
    },
    projectsLabel: 'Proyectos y builds',
    projects: ['Mafesur', 'Cosmo School', 'Marbella Boat Charter', 'Five Star Rentals', 'Sillas Juan y Lola'],
    system: {
      kicker: 'Servicios',
      titleStart: 'Tres pilares.',
      titleEnd: 'Un solo motor digital.',
      body: 'Estrategia, diseño, desarrollo e IA alineados para que la capa pública y la operación del negocio evolucionen juntas.',
      link: 'Explorar servicios',
      items: [
        ['Presence', 'Webs y presencia digital que te posicionan como la opción evidente.', 'Webs, branding digital, contenido y captación.'],
        ['Control', 'Web apps y paneles que ordenan cómo trabaja tu negocio.', 'Reservas, clientes, recursos, estados y operación.'],
        ['Business', 'Software web y automatización cuando lo genérico deja de servir.', 'Integraciones, flujos y herramientas a medida.'],
      ],
    },
    work: {
      kicker: 'Trabajo seleccionado',
      titleStart: 'Proyectos reales.',
      titleEnd: 'Producto que se puede abrir.',
      body: 'Diseño y desarrollo aplicados a negocios distintos, sin convertirlos en la misma plantilla.',
      link: 'Ver todos los proyectos',
      open: 'Abrir proyecto',
    },
    method: {
      kicker: 'Nuestro proceso',
      titleStart: 'De estrategia',
      titleEnd: 'a escala.',
      body: 'Dirección humana, ejecución acelerada por IA y control de calidad antes de publicar.',
      link: 'Ver el proceso completo',
      steps: [
        ['01', 'Descubrir', 'Negocio, cliente, contexto y oportunidad.'],
        ['02', 'Diseñar', 'Dirección, UX/UI y mundo visual.'],
        ['03', 'Construir', 'Frontend, producto y lógica web.'],
        ['04', 'Calidad', 'QA, mobile, accesibilidad y rendimiento.'],
        ['05', 'Escalar', 'Medición, automatización y mejora continua.'],
      ],
    },
    close: {
      kicker: 'Siguiente proyecto',
      titleStart: '¿Listo para construir',
      titleAccent: 'diferente?',
      body: 'Cuéntanos qué quieres vender, ordenar o construir. Diseñaremos la forma correcta de hacerlo.',
      primary: 'Empezar proyecto',
      phone: 'Llamar',
    },
  },
  en: {
    hero: {
      eyebrow: 'Supervised AI. Human direction.',
      titleStart: 'We build digital systems that',
      titleAccent: 'transform',
      titleEnd: 'businesses.',
      lead: 'Strategy, design and development for businesses that need to look better and operate with less friction.',
      primary: 'See our work',
      secondary: 'Our process',
      stageEyebrow: 'Marbella · concept build',
      stageTitle: 'Experiences designed to feel on another level.',
      stageLink: 'Explore the system',
    },
    projectsLabel: 'Projects and builds',
    projects: ['Mafesur', 'Cosmo School', 'Marbella Boat Charter', 'Five Star Rentals', 'Sillas Juan y Lola'],
    system: {
      kicker: 'Services',
      titleStart: 'Three pillars.',
      titleEnd: 'One digital engine.',
      body: 'Strategy, design, development and AI aligned so the public experience and the operation evolve together.',
      link: 'Explore services',
      items: [
        ['Presence', 'Websites and digital presence that position you as the obvious choice.', 'Websites, digital branding, content and acquisition.'],
        ['Control', 'Web apps and dashboards that organise how the business works.', 'Bookings, customers, resources, states and operations.'],
        ['Business', 'Web software and automation when generic tools stop fitting.', 'Integrations, workflows and custom tools.'],
      ],
    },
    work: {
      kicker: 'Selected work',
      titleStart: 'Real projects.',
      titleEnd: 'Products you can open.',
      body: 'Design and development for different businesses without turning them into the same template.',
      link: 'View all projects',
      open: 'Open project',
    },
    method: {
      kicker: 'Our process',
      titleStart: 'From strategy',
      titleEnd: 'to scale.',
      body: 'Human direction, AI-accelerated execution and quality control before anything ships.',
      link: 'See the full process',
      steps: [
        ['01', 'Discover', 'Business, customer, context and opportunity.'],
        ['02', 'Design', 'Direction, UX/UI and visual world.'],
        ['03', 'Build', 'Frontend, product and web logic.'],
        ['04', 'Quality', 'QA, mobile, accessibility and performance.'],
        ['05', 'Scale', 'Measurement, automation and continuous improvement.'],
      ],
    },
    close: {
      kicker: 'Next project',
      titleStart: 'Ready to build',
      titleAccent: 'different?',
      body: 'Tell us what you need to sell, organise or build. We will design the right way to make it happen.',
      primary: 'Start a project',
      phone: 'Call',
    },
  },
} as const

const WORK: Record<Lang, WorkItem[]> = {
  es: [
    { name: 'Mafesur', sector: 'Automoción', scope: 'Concesionario + taller · Presence', image: MAFESUR_IMAGE, href: 'https://mafesur.vercel.app/', note: 'Proyecto Archic' },
    { name: 'Marbella Boat Charter', sector: 'Charter', scope: 'Presence + plataforma', image: YACHT_IMAGE, href: 'https://github.com/vornicx/marbellaboatcharter', note: 'Fotografía representativa · build en curso' },
    { name: 'Cosmo School', sector: 'Educación', scope: 'Presence + experiencia digital', image: ARCHITECTURE_ONE, href: 'https://cosmoschool-weld.vercel.app/', note: 'Proyecto Archic · visual editorial' },
  ],
  en: [
    { name: 'Mafesur', sector: 'Automotive', scope: 'Dealership + workshop · Presence', image: MAFESUR_IMAGE, href: 'https://mafesur.vercel.app/', note: 'Archic project' },
    { name: 'Marbella Boat Charter', sector: 'Charter', scope: 'Presence + platform', image: YACHT_IMAGE, href: 'https://github.com/vornicx/marbellaboatcharter', note: 'Representative photography · build in progress' },
    { name: 'Cosmo School', sector: 'Education', scope: 'Presence + digital experience', image: ARCHITECTURE_ONE, href: 'https://cosmoschool-weld.vercel.app/', note: 'Archic project · editorial visual' },
  ],
}

const PILLAR_IMAGES = [ARCHITECTURE_ONE, ARCHITECTURE_TWO, ARCHITECTURE_HERO]

function Arrow() {
  return <i className="as-arrow" aria-hidden="true" />
}

function HeroShowcase({ lang }: { lang: Lang }) {
  const c = COPY[lang].hero
  return (
    <div className="aaa-showcase" aria-hidden="true">
      <div className="aaa-showcase-shadow" />
      <div className="aaa-showcase-frame">
        <img src={YACHT_IMAGE} alt="" />
        <div className="aaa-showcase-shade" />
        <div className="aaa-showcase-copy">
          <span>{c.stageEyebrow}</span>
          <strong>{c.stageTitle}</strong>
          <small>{c.stageLink} <b>↗</b></small>
        </div>
        <div className="aaa-showcase-index"><span>01 / 03</span><i>←</i><i>→</i></div>
      </div>
    </div>
  )
}

function ProjectStrip({ lang }: { lang: Lang }) {
  const c = COPY[lang]
  return (
    <section className="aaa-project-strip" aria-label={c.projectsLabel}>
      <div className="aaa-shell aaa-project-strip-inner">
        <span>{c.projectsLabel}</span>
        {c.projects.map((project) => <strong key={project}>{project}</strong>)}
      </div>
    </section>
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
          </div>
          <div className="aaa-pillar-media"><img src={PILLAR_IMAGES[index]} alt="" loading="lazy" /></div>
        </a>
      ))}
    </div>
  )
}

function WorkCard({ item, lang }: { item: WorkItem; lang: Lang }) {
  const c = COPY[lang].work
  return (
    <article className="aaa-work-card">
      <a className="aaa-work-image" href={item.href} target="_blank" rel="noreferrer" data-archic-intent={`work:${item.name}`}>
        <img src={item.image} alt={`${item.name} · ${item.sector}`} loading="lazy" />
        <span>{item.note}</span>
        <div className="aaa-work-overlay" />
        <div className="aaa-work-card-copy">
          <small>{item.sector}</small>
          <h3>{item.name}</h3>
          <p>{item.scope}</p>
          <b aria-label={c.open}>↗</b>
        </div>
      </a>
    </article>
  )
}

function StepIcon({ index }: { index: number }) {
  if (index === 0) return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="m9 15 2-6 4-2-2 6-4 2Z" /></svg>
  if (index === 1) return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 18 2.5-6.5L16 3l5 5-8.5 8.5L5 18Z" /><path d="m14 5 5 5" /></svg>
  if (index === 2) return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>
  if (index === 3) return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4c3 1 5 3 6 6-3 0-5 1-7 3-2 2-3 4-3 7-3-1-5-3-6-6 3 0 5-1 7-3 2-2 3-4 3-7Z" /><path d="m8 16-3 3M16 8l3-3" /></svg>
}

function ProcessRail({ lang }: { lang: Lang }) {
  const c = COPY[lang].method
  return (
    <div className="aaa-process-rail">
      {c.steps.map(([no, title, body], index) => (
        <article key={no}>
          <div className="aaa-step-icon"><StepIcon index={index} /></div>
          <span>{no}</span>
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
    <div className="as-site aaa-site" data-quality-standard="aaa-design-art-direction-v3">
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
          <img className="aaa-hero-background" src={ARCHITECTURE_HERO} alt="" aria-hidden="true" />
          <div className="aaa-hero-overlay" aria-hidden="true" />
          <div className="aaa-shell aaa-hero-shell">
            <div className="aaa-hero-copy">
              <p className="aaa-kicker">{c.hero.eyebrow}</p>
              <h1><span>{c.hero.titleStart}</span><em>{c.hero.titleAccent}</em><span>{c.hero.titleEnd}</span></h1>
              <p className="aaa-hero-lead">{c.hero.lead}</p>
              <div className="aaa-hero-actions">
                <a className="aaa-button aaa-button-light" href="#selected-work" data-archic-intent="hero:work">{c.hero.primary}<Arrow /></a>
                <a className="aaa-text-link" href="#method" data-archic-intent="hero:process">{c.hero.secondary}<Arrow /></a>
              </div>
            </div>
            <HeroShowcase lang={currentLang} />
          </div>
        </section>

        <ProjectStrip lang={currentLang} />

        <section className="aaa-system aaa-section" id="system" data-archic-view="system">
          <div className="aaa-shell">
            <div className="aaa-system-layout">
              <header className="aaa-section-story">
                <p className="aaa-kicker is-ink">{c.system.kicker}</p>
                <h2><span>{c.system.titleStart}</span><span>{c.system.titleEnd}</span></h2>
                <p>{c.system.body}</p>
                <a className="aaa-inline-link" href={currentLang === 'en' ? '/en/presence/' : '/presence/'}>{c.system.link}<Arrow /></a>
              </header>
              <PillarGrid lang={currentLang} />
            </div>
          </div>
        </section>

        <section className="aaa-work aaa-section" id="selected-work" data-archic-view="selected-work">
          <div className="aaa-shell aaa-work-layout">
            <header className="aaa-work-story">
              <p className="aaa-kicker">{c.work.kicker}</p>
              <h2><span>{c.work.titleStart}</span><span>{c.work.titleEnd}</span></h2>
              <p>{c.work.body}</p>
              <a className="aaa-text-link" href="#system">{c.work.link}<Arrow /></a>
            </header>
            <div className="aaa-work-grid">
              {WORK[currentLang].map((item) => <WorkCard item={item} lang={currentLang} key={item.name} />)}
            </div>
          </div>
        </section>

        <section className="aaa-method aaa-section" id="method" data-archic-view="method-quality">
          <div className="aaa-shell aaa-method-layout">
            <header className="aaa-method-story">
              <p className="aaa-kicker is-ink">{c.method.kicker}</p>
              <h2><span>{c.method.titleStart}</span><span>{c.method.titleEnd}</span></h2>
              <p>{c.method.body}</p>
              <a className="aaa-inline-link" href={currentLang === 'en' ? '/en/guides/' : '/guides/'}>{c.method.link}<Arrow /></a>
            </header>
            <ProcessRail lang={currentLang} />
          </div>
        </section>

        <section className="aaa-close" id="audit" data-archic-view="audit">
          <div className="aaa-shell aaa-close-grid">
            <div>
              <p className="aaa-kicker">{c.close.kicker}</p>
              <h2>{c.close.titleStart} <em>{c.close.titleAccent}</em></h2>
            </div>
            <p>{c.close.body}</p>
            <div className="aaa-close-actions">
              <a className="aaa-button aaa-button-light" href={auditHref} data-archic-intent="audit:request">{c.close.primary}<Arrow /></a>
              <a className="aaa-text-link" href={`tel:${CONTACT_PHONE}`} data-archic-intent="audit:call">{c.close.phone} · {CONTACT_PHONE_DISPLAY}</a>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  )
}
