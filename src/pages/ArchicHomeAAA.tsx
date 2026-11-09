import { Helmet } from 'react-helmet-async'
import '@fontsource-variable/geist/wght.css'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'
import { SkyCredit, SKY_PORTRAIT, SKY_WIDE } from '../lab/skyAsset'
import '../styles/archic-light.css'

type Lang = 'es' | 'en'
type WorkItem = { name: string; sector: string; scope: string; image: string; href: string; note: string }

// Portfolio photography: provenance in docs/asset-provenance.md.
const ARCHITECTURE_ONE = 'https://images.unsplash.com/photo-1776514222617-cd3d0139c926?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200'
const YACHT_IMAGE = 'https://images.unsplash.com/photo-1770929356223-639d10f7feee?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200'
const MAFESUR_IMAGE = 'https://www.mafesur.es/wp-content/uploads/2025/09/20200923_132714-1024x498.jpg'

const COPY = {
  es: {
    hero: {
      label: 'Estudio digital · Écija, Sevilla',
      title: 'Diseñamos lo que viene.',
      lead: 'Webs, software y herramientas digitales creadas con criterio.',
      primary: 'Explorar Weather',
      secondary: 'Ver proyectos',
      cardTitle: 'Archic Lab Weather',
      cardMeta: 'Predicción horaria y lluvia en l/m²',
    },
    offer: [
      ['Webs premium', 'Presence', 'presence'],
      ['Software a medida', 'Control', 'control'],
      ['Sistemas para empresas', 'Business', 'business'],
    ],
    work: { label: 'Trabajo seleccionado', title: 'Proyectos reales.', body: 'Diseño y desarrollo para negocios distintos, sin convertirlos en la misma plantilla.', open: 'Abrir proyecto' },
    system: {
      label: 'Servicios',
      title: 'Lo que construimos.',
      body: 'La web que te presenta y el software que ordena cómo trabajas, diseñados para evolucionar juntos.',
      more: 'Ver servicio',
      items: [
        ['Presence', 'Webs premium', 'Webs y presencia digital que te posicionan como la opción evidente.', 'Webs, branding digital, contenido y captación.'],
        ['Control', 'Software a medida', 'Web apps y paneles que ordenan cómo trabaja tu negocio.', 'Reservas, clientes, recursos, estados y operación.'],
        ['Business', 'Sistemas para empresas', 'Software web y automatización cuando lo genérico deja de servir.', 'Integraciones, flujos y herramientas a medida.'],
      ],
    },
    lab: { label: 'Archic Lab', title: 'El tiempo, con contexto.', body: 'Weather es nuestro primer producto propio: predicción de modelo por horas, lluvia en litros por metro cuadrado y fuente siempre visible.', cta: 'Explorar Weather', more: 'Qué es Lab' },
    method: {
      label: 'Proceso',
      title: 'De la idea a producción.',
      body: 'Dirección humana, ejecución acelerada por IA y control de calidad antes de publicar.',
      link: 'Ver guías',
      steps: [
        ['01', 'Descubrir', 'Negocio, cliente, contexto y oportunidad.'],
        ['02', 'Diseñar', 'Dirección, UX/UI y mundo visual.'],
        ['03', 'Construir', 'Frontend, producto y lógica web.'],
        ['04', 'Calidad', 'QA, móvil, accesibilidad y rendimiento.'],
        ['05', 'Escalar', 'Medición, automatización y mejora continua.'],
      ],
    },
    close: { label: 'Siguiente proyecto', title: '¿Construimos lo siguiente?', body: 'Cuéntanos qué quieres vender, ordenar o construir. Diseñaremos la forma correcta de hacerlo.', primary: 'Empezar proyecto', phone: 'Llamar' },
  },
  en: {
    hero: {
      label: 'Digital studio · Écija, Seville',
      title: 'We design what comes next.',
      lead: 'Websites, software and digital tools built with judgement.',
      primary: 'Explore Weather',
      secondary: 'View projects',
      cardTitle: 'Archic Lab Weather',
      cardMeta: 'Hourly forecast and rainfall in mm',
    },
    offer: [
      ['Premium websites', 'Presence', 'presence'],
      ['Custom software', 'Control', 'control'],
      ['Business systems', 'Business', 'business'],
    ],
    work: { label: 'Selected work', title: 'Real projects.', body: 'Design and development for different businesses, without turning them into the same template.', open: 'Open project' },
    system: {
      label: 'Services',
      title: 'What we build.',
      body: 'The website that presents you and the software that organises how you work, designed to evolve together.',
      more: 'View service',
      items: [
        ['Presence', 'Premium websites', 'Websites and digital presence that position you as the obvious choice.', 'Websites, digital branding, content and acquisition.'],
        ['Control', 'Custom software', 'Web apps and dashboards that organise how the business works.', 'Bookings, customers, resources, states and operations.'],
        ['Business', 'Business systems', 'Web software and automation when generic tools stop fitting.', 'Integrations, workflows and custom tools.'],
      ],
    },
    lab: { label: 'Archic Lab', title: 'Weather, in context.', body: 'Weather is our first in-house product: hourly model forecasts, rainfall in millimetres and the source always in view.', cta: 'Explore Weather', more: 'About Lab' },
    method: {
      label: 'Process',
      title: 'From idea to production.',
      body: 'Human direction, AI-accelerated execution and quality control before anything ships.',
      link: 'Read the guides',
      steps: [
        ['01', 'Discover', 'Business, customer, context and opportunity.'],
        ['02', 'Design', 'Direction, UX/UI and visual world.'],
        ['03', 'Build', 'Frontend, product and web logic.'],
        ['04', 'Quality', 'QA, mobile, accessibility and performance.'],
        ['05', 'Scale', 'Measurement, automation and continuous improvement.'],
      ],
    },
    close: { label: 'Next project', title: 'Shall we build what comes next?', body: 'Tell us what you need to sell, organise or build. We will design the right way to make it happen.', primary: 'Start a project', phone: 'Call' },
  },
} as const

const WORK: Record<Lang, WorkItem[]> = {
  es: [
    { name: 'Mafesur', sector: 'Automoción', scope: 'Concesionario + taller · Presence', image: MAFESUR_IMAGE, href: 'https://mafesur.vercel.app/', note: 'Proyecto Archic' },
    { name: 'Marbella Boat Charter', sector: 'Charter', scope: 'Presence + plataforma', image: YACHT_IMAGE, href: 'https://github.com/vornicx/marbellaboatcharter', note: 'Fotografía representativa · build en curso' },
    { name: 'Cosmo School', sector: 'Educación', scope: 'Presence + experiencia digital', image: ARCHITECTURE_ONE, href: 'https://cosmoschool-weld.vercel.app/', note: 'Proyecto Archic Lab · visual editorial' },
  ],
  en: [
    { name: 'Mafesur', sector: 'Automotive', scope: 'Dealership + workshop · Presence', image: MAFESUR_IMAGE, href: 'https://mafesur.vercel.app/', note: 'Archic project' },
    { name: 'Marbella Boat Charter', sector: 'Charter', scope: 'Presence + platform', image: YACHT_IMAGE, href: 'https://github.com/vornicx/marbellaboatcharter', note: 'Representative photography · build in progress' },
    { name: 'Cosmo School', sector: 'Education', scope: 'Presence + digital experience', image: ARCHITECTURE_ONE, href: 'https://cosmoschool-weld.vercel.app/', note: 'Archic Lab project · editorial visual' },
  ],
}

const p = (lang: Lang, slug: string) => (lang === 'en' ? `/en/${slug}/` : `/${slug}/`)

export default function ArchicHomeAAA() {
  const { lang } = useLang()
  const L = lang as Lang
  const c = COPY[L]
  const seo = HOME_SEO[L]
  const canonicalUrl = homeCanonical(L)
  const structuredData = buildHomeGraph(L)
  const ogImage = siteOgImage(L)
  const auditHref = L === 'en' ? '/en/contact/?intent=audit' : '/contact/?intent=audit'
  const weatherHref = p(L, 'lab/weather')

  return (
    <div className="al-site" data-quality-standard="aaa-design-light-blue-v4">
      <Helmet htmlAttributes={{ lang: L }}>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="theme-color" content="#F8F9FB" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/" />
        <link rel="preload" as="image" href={SKY_PORTRAIT.src} imageSrcSet={SKY_PORTRAIT.srcSet} imageSizes={SKY_PORTRAIT.sizes} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic Lab" />
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

      <main id="main-content" className="al-main" tabIndex={-1}>
        <section className="al-hero" id="home" data-archic-view="hero">
          <div className="al-shell">
            <div className="al-hero-grid">
              <div className="al-hero-copy">
                <p className="al-label">{c.hero.label}</p>
                <h1 className="al-h1">{c.hero.title}</h1>
                <p className="al-lead">{c.hero.lead}</p>
                <div className="al-actions">
                  <a className="al-btn al-btn-primary" href={weatherHref} data-archic-intent="hero:weather">{c.hero.primary}</a>
                  <a className="al-link" href="#selected-work" data-archic-intent="hero:work">{c.hero.secondary} <span aria-hidden="true">→</span></a>
                </div>
              </div>
              <div>
                <figure className="al-sky-card" style={{ margin: 0 }}>
                  <img src={SKY_PORTRAIT.src} srcSet={SKY_PORTRAIT.srcSet} sizes={SKY_PORTRAIT.sizes} width={1200} height={1500} alt="" fetchPriority="high" decoding="async" />
                  <figcaption>
                    <div><strong>{c.hero.cardTitle}</strong><span>{c.hero.cardMeta}</span></div>
                    <a className="al-link" href={weatherHref} aria-label={c.hero.primary}><span aria-hidden="true">→</span></a>
                  </figcaption>
                </figure>
                <SkyCredit lang={L} />
              </div>
            </div>
            <nav className="al-offer" aria-label={c.system.label}>
              {c.offer.map(([label, name, slug]) => (
                <a key={slug} href={p(L, slug)}><strong>{label}</strong><span>Archic {name}</span></a>
              ))}
            </nav>
          </div>
        </section>

        <section className="al-section al-section-white" id="selected-work" data-archic-view="selected-work">
          <div className="al-shell">
            <header className="al-section-head">
              <div><p className="al-label">{c.work.label}</p><h2 className="al-h2">{c.work.title}</h2></div>
              <p className="al-body">{c.work.body}</p>
            </header>
            <div className="al-work-grid">
              {WORK[L].map((item) => (
                <article className="al-work" key={item.name}>
                  <a href={item.href} target="_blank" rel="noreferrer" data-archic-intent={`work:${item.name}`} aria-label={`${c.work.open}: ${item.name}`}>
                    <div className="al-work-media"><img src={item.image} alt={`${item.name} · ${item.sector}`} loading="lazy" decoding="async" /></div>
                    <div className="al-work-meta">
                      <div><h3>{item.name}</h3><p>{item.sector} · {item.scope}</p><small>{item.note}</small></div>
                      <b aria-hidden="true">↗</b>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="al-section" id="system" data-archic-view="system">
          <div className="al-shell">
            <header className="al-section-head">
              <div><p className="al-label">{c.system.label}</p><h2 className="al-h2">{c.system.title}</h2></div>
              <p className="al-body">{c.system.body}</p>
            </header>
            <div className="al-services">
              {c.system.items.map(([name, label, headline, scope]) => (
                <article className="al-service" key={name}>
                  <h3>{label}<small>Archic {name}</small></h3>
                  <div><p>{headline}</p><p>{scope}</p></div>
                  <a className="al-link" href={p(L, name.toLowerCase())}>{c.system.more} <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="al-section al-section-white" id="lab" data-archic-view="lab">
          <div className="al-shell al-lab-band">
            <div>
              <p className="al-label">{c.lab.label}</p>
              <h2 className="al-h2">{c.lab.title}</h2>
              <p className="al-body">{c.lab.body}</p>
              <div className="al-actions">
                <a className="al-btn al-btn-primary" href={weatherHref} data-archic-intent="lab:weather">{c.lab.cta}</a>
                <a className="al-link" href={p(L, 'lab')}>{c.lab.more} <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="al-lab-media">
              <img src={SKY_WIDE.src} srcSet={SKY_WIDE.srcSet} sizes={SKY_WIDE.sizes} width={1600} height={1000} alt="" loading="lazy" decoding="async" />
            </div>
          </div>
        </section>

        <section className="al-section" id="method" data-archic-view="method-quality">
          <div className="al-shell">
            <header className="al-section-head">
              <div><p className="al-label">{c.method.label}</p><h2 className="al-h2">{c.method.title}</h2></div>
              <div className="al-body"><p>{c.method.body}</p><a className="al-link" href={p(L, 'guides')}>{c.method.link} <span aria-hidden="true">→</span></a></div>
            </header>
            <ol className="al-steps">
              {c.method.steps.map(([no, title, body]) => (
                <li key={no}><span>{no}</span><h3>{title}</h3><p>{body}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="al-close" id="audit" data-archic-view="audit">
          <div className="al-shell al-close-grid">
            <div><p className="al-label">{c.close.label}</p><h2 className="al-h2">{c.close.title}</h2></div>
            <div>
              <p className="al-body">{c.close.body}</p>
              <div className="al-actions">
                <a className="al-btn al-btn-primary" href={auditHref} data-archic-intent="audit:request">{c.close.primary}</a>
                <a className="al-link" href={`tel:${CONTACT_PHONE}`} data-archic-intent="audit:call">{c.close.phone} · {CONTACT_PHONE_DISPLAY}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  )
}
