import type { CSSProperties } from 'react'
import { Helmet } from 'react-helmet-async'
import '@fontsource-variable/geist/wght.css'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'
import { SkyCredit, SKY_WIDE } from '../lab/skyAsset'
import '../styles/archic-light.css'

type Lang = 'es' | 'en'
type WorkItem = {
  name: string; sector: string; scope: string; href: string; domain: string; status: string
  // Image provenance is always shown: client material vs representative photography.
  image: { base: string; widths: [number, number]; ratio: string; credit: string }
}

// Portfolio photography, archived locally (no hotlinks). Provenance in docs/asset-provenance.md.
const IMG = {
  mafesur: { base: '/media/work/mafesur', widths: [720, 1024] as [number, number], ratio: '1024 / 498' },
  yacht: { base: '/media/work/yacht', widths: [720, 1200] as [number, number], ratio: '4 / 5' },
  cosmo: { base: '/media/work/cosmo', widths: [720, 1200] as [number, number], ratio: '4 / 5' },
}

const COPY = {
  es: {
    hero: {
      label: 'Estudio digital · Écija, Sevilla',
      title: 'Diseñamos lo que viene.',
      lead: 'Webs, software y herramientas digitales creadas con criterio.',
      primary: 'Explorar Weather',
      secondary: 'Ver proyectos',
      statement: 'Estudio en Écija para negocios que necesitan una web seria y software que ordene su trabajo.',
      productKicker: 'Producto propio · Archic Lab',
      productTitle: 'Weather',
      productBody: 'Predicción horaria y lluvia en l/m², con la fuente siempre visible.',
      productCta: 'Abrir Weather',
    },
    offer: [
      ['Webs premium', 'Presence', 'presence', 'Presencia y captación'],
      ['Software a medida', 'Control', 'control', 'Reservas, clientes y operación'],
      ['Sistemas para empresas', 'Business', 'business', 'Integraciones y automatización'],
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
    statementLabel: 'Estudio',
    statementText: ['Diseñamos y construimos la web que te presenta y el software que ordena cómo trabajas.', 'Dirección humana, ejecución rápida y control de calidad antes de publicar.'],
    lab: { label: 'Archic Lab', title: 'El tiempo, con contexto.', body: 'Weather es nuestro primer producto propio. Lo construimos con el mismo método que el software de clientes.', cta: 'Explorar Weather', more: 'Qué es Lab', facts: [['Fuente', 'MET Norway, CC BY 4.0'], ['Lluvia', '6 y 24 h en l/m²'], ['Límite', 'Predicción de modelo, sin avisos oficiales']] },
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
      statement: 'A studio in Écija for businesses that need a serious website and software that organises their work.',
      productKicker: 'In-house product · Archic Lab',
      productTitle: 'Weather',
      productBody: 'Hourly forecasts and rainfall in mm, with the source always in view.',
      productCta: 'Open Weather',
    },
    offer: [
      ['Premium websites', 'Presence', 'presence', 'Presence and acquisition'],
      ['Custom software', 'Control', 'control', 'Bookings, customers and operations'],
      ['Business systems', 'Business', 'business', 'Integrations and automation'],
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
    statementLabel: 'Studio',
    statementText: ['We design and build the website that presents you and the software that organises how you work.', 'Human direction, fast execution and quality control before anything ships.'],
    lab: { label: 'Archic Lab', title: 'Weather, in context.', body: 'Weather is our first in-house product, built with the same method as our client software.', cta: 'Explore Weather', more: 'About Lab', facts: [['Source', 'MET Norway, CC BY 4.0'], ['Rainfall', '6 and 24 h totals in mm'], ['Limits', 'Model forecast, no official warnings']] },
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
    { name: 'Mafesur', sector: 'Automoción', scope: 'Concesionario y taller · web Presence', href: 'https://mafesur.vercel.app/', domain: 'mafesur.vercel.app', status: 'Publicado', image: { ...IMG.mafesur, credit: 'Imagen: instalaciones del cliente, de su web pública' } },
    { name: 'Marbella Boat Charter', sector: 'Charter náutico', scope: 'Web y plataforma de reservas', href: 'https://github.com/vornicx/marbellaboatcharter', domain: 'github.com/vornicx', status: 'En construcción', image: { ...IMG.yacht, credit: 'Fotografía representativa · ionut dobre / Unsplash' } },
    { name: 'Cosmo School', sector: 'Educación', scope: 'Web y experiencia digital', href: 'https://cosmoschool-weld.vercel.app/', domain: 'cosmoschool-weld.vercel.app', status: 'Publicado', image: { ...IMG.cosmo, credit: 'Fotografía representativa · Jonas Gerlach / Unsplash' } },
  ],
  en: [
    { name: 'Mafesur', sector: 'Automotive', scope: 'Dealership and workshop · Presence website', href: 'https://mafesur.vercel.app/', domain: 'mafesur.vercel.app', status: 'Live', image: { ...IMG.mafesur, credit: 'Image: client premises, from their public website' } },
    { name: 'Marbella Boat Charter', sector: 'Yacht charter', scope: 'Website and booking platform', href: 'https://github.com/vornicx/marbellaboatcharter', domain: 'github.com/vornicx', status: 'In progress', image: { ...IMG.yacht, credit: 'Representative photography · ionut dobre / Unsplash' } },
    { name: 'Cosmo School', sector: 'Education', scope: 'Website and digital experience', href: 'https://cosmoschool-weld.vercel.app/', domain: 'cosmoschool-weld.vercel.app', status: 'Live', image: { ...IMG.cosmo, credit: 'Representative photography · Jonas Gerlach / Unsplash' } },
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
              </div>
              <div className="al-hero-rail">
                <p className="al-lead">{c.hero.lead}</p>
                <p className="al-hero-statement">{c.hero.statement}</p>
                <div className="al-actions">
                  <a className="al-btn al-btn-primary" href={weatherHref} data-archic-intent="hero:weather">{c.hero.primary}</a>
                  <a className="al-link" href="#selected-work" data-archic-intent="hero:work">{c.hero.secondary} <span aria-hidden="true">→</span></a>
                </div>
              </div>
              <nav className="al-pillars" aria-label={c.system.label}>
                {c.offer.map(([label, name, slug, scope], i) => (
                  <a key={slug} href={p(L, slug)}><span>0{i + 1}</span><strong>{label}</strong><small>Archic {name} · {scope}</small></a>
                ))}
              </nav>
            </div>
            <figure className="al-sky" style={{ margin: 0 }}>
              <img src={SKY_WIDE.src} srcSet={SKY_WIDE.srcSet} sizes="(max-width: 1320px) 100vw, 1280px" width={1600} height={1000} alt="" fetchPriority="high" decoding="async" />
              <figcaption className="al-sky-product">
                <div>
                  <p>{c.hero.productKicker}</p>
                  <h2>{c.hero.productTitle}</h2>
                  <span>{c.hero.productBody}</span>
                </div>
                <a href={weatherHref} data-archic-intent="hero:weather-product">{c.hero.productCta} <span aria-hidden="true">→</span></a>
              </figcaption>
            </figure>
            <SkyCredit lang={L} />
          </div>
        </section>

        <section className="al-statement" aria-labelledby="al-statement-label">
          <div className="al-shell al-statement-grid">
            <p className="al-label" id="al-statement-label">{c.statementLabel}</p>
            <p className="al-statement-text">{c.statementText[0]} <b>{c.statementText[1]}</b></p>
          </div>
        </section>

        <section className="al-section al-section-white" id="selected-work" data-archic-view="selected-work">
          <div className="al-shell">
            <header className="al-section-head">
              <div><p className="al-label">{c.work.label}</p><h2 className="al-h2">{c.work.title}</h2></div>
              <p className="al-body">{c.work.body}</p>
            </header>
            <ol className="al-work-grid">
              {WORK[L].map((item, i) => (
                <li className="al-work" key={item.name}>
                  <a href={item.href} target="_blank" rel="noreferrer" data-archic-intent={`work:${item.name}`}>
                    <figure className="al-work-media" style={{ '--al-ratio': item.image.ratio } as CSSProperties}>
                      <img
                        src={`${item.image.base}-${item.image.widths[0]}.webp`}
                        srcSet={`${item.image.base}-${item.image.widths[0]}.webp ${item.image.widths[0]}w, ${item.image.base}-${item.image.widths[1]}.webp ${item.image.widths[1]}w`}
                        sizes={i === 0 ? '(max-width: 960px) 100vw, 66vw' : '(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw'}
                        alt={`${item.name} · ${item.sector}`} loading="lazy" decoding="async"
                      />
                    </figure>
                    <div className="al-work-meta">
                      <span className="al-work-no">0{i + 1}</span>
                      <h3>{item.name} <b aria-hidden="true">↗</b><span className="al-sr"> ({c.work.open})</span></h3>
                      <p>{item.sector} · {item.scope}</p>
                      <p className="al-work-status"><span data-state={item.status === 'Publicado' || item.status === 'Live' ? 'live' : 'wip'}>{item.status}</span>{item.domain}</p>
                    </div>
                  </a>
                  <p className="al-work-credit">{item.image.credit}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="al-section" id="system" data-archic-view="system">
          <div className="al-shell">
            <header className="al-section-head">
              <div><p className="al-label">{c.system.label}</p><h2 className="al-h2">{c.system.title}</h2></div>
              <p className="al-body">{c.system.body}</p>
            </header>
            <div className="al-services">
              {c.system.items.map(([name, label, headline, scope], i) => (
                <article className="al-service" key={name}>
                  <span>0{i + 1}</span>
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
            <dl>{c.lab.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
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
