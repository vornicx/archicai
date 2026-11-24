import StudioPricing from '../components/StudioPricing'
import { Helmet } from 'react-helmet-async'
import '@fontsource-variable/geist/wght.css'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, CONTACT_WHATSAPP_URL, CONTACT_MESSAGE_URL } from '../config/contact'
import '../styles/archic-light.css'

type Lang = 'es' | 'en'
type WorkItem = {
  name: string; sector: string; scope: string; href: string; domain: string; status: string
}

const COPY = {
  es: {
    hero: {
      label: 'Archic · Diseño y tecnología',
      title: 'Diseñamos lo que viene.',
      lead: 'Creamos tecnología para empresas y productos digitales propios.',
      statement: 'Dos divisiones. Desde España, para todo el mundo.',
      primary: 'Empezar proyecto',
      secondary: 'Ver nuestras divisiones',
    },
    divisions: [
      ['01', 'Archic Studio', 'Webs por 349 € + IVA y software a medida. Para empresas de cualquier país.', 'Explorar Studio', 'studio'],
      ['02', 'Archic Lab', 'Investigación, experimentación y productos digitales propios.', 'Explorar Lab', 'lab'],
    ],
    work: { label: 'Archic Studio · Trabajo seleccionado', title: 'Trabajo realizado.', body: 'Nuestro primer proyecto publicado: una tienda online de accesorios para perros.', open: 'Abrir proyecto' },
    system: {
      label: 'Archic Studio · Servicios',
      title: 'Lo que construimos.',
      body: 'La web que te presenta y el software que ordena cómo trabajas, diseñados para evolucionar juntos.',
      more: 'Ver servicio',
      items: [
        ['Presence', 'Webs · 349 € + IVA', 'Webs sencillas que solucionan problemas reales del negocio.', 'ZIP y guía de publicación incluidos.'],
        ['Control', 'Software a medida', 'Web apps y paneles que ordenan cómo trabaja tu negocio.', 'Reservas, clientes y operación · Bajo presupuesto.'],
        ['Business', 'Sistemas para empresas', 'Software web y automatización cuando lo genérico deja de servir.', 'Integraciones y automatización · Bajo presupuesto.'],
      ],
    },
    statementLabel: 'Archic Studio',
    statementText: ['Diseñamos y construimos la web que te presenta y el software que ordena cómo trabajas.', 'Dirección humana, ejecución rápida y control de calidad antes de publicar.'],
    lab: { label: 'Archic Lab', title: 'Productos propios.', body: 'Investigamos y construimos herramientas digitales para resolver problemas reales. Weather es nuestro primer producto publicado.', cta: 'Explorar Archic Lab', product: 'Abrir Weather', productBody: 'Predicción meteorológica con fuentes transparentes.', productStatus: 'Producto publicado' },
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
      label: 'Archic · Design and technology',
      title: 'We design what comes next.',
      lead: 'We build technology for businesses and our own digital products.',
      statement: 'Two divisions. Based in Spain, building worldwide.',
      primary: 'Start a project',
      secondary: 'Explore our divisions',
    },
    divisions: [
      ['01', 'Archic Studio', 'Fixed-price websites (€349 before tax) and custom software. For businesses worldwide.', 'Explore Studio', 'studio'],
      ['02', 'Archic Lab', 'Research, experimentation and independent digital products.', 'Explore Lab', 'lab'],
    ],
    work: { label: 'Archic Studio · Selected work', title: 'Published work.', body: 'Our first published project: an online shop for dog accessories.', open: 'Open project' },
    system: {
      label: 'Archic Studio · Services',
      title: 'What we build.',
      body: 'The website that presents you and the software that organises how you work, designed to evolve together.',
      more: 'View service',
      items: [
        ['Presence', 'Websites · €349 + VAT', 'Simple websites that solve real business problems.', 'ZIP and publishing guide included.'],
        ['Control', 'Custom software', 'Web apps and dashboards that organise how the business works.', 'Bookings, customers and operations · On request.'],
        ['Business', 'Business systems', 'Web software and automation when generic tools stop fitting.', 'Integrations and automation · On request.'],
      ],
    },
    statementLabel: 'Archic Studio',
    statementText: ['We design and build the website that presents you and the software that organises how you work.', 'Human direction, fast execution and quality control before anything ships.'],
    lab: { label: 'Archic Lab', title: 'Our own products.', body: 'We research and build digital tools to solve real problems. Weather is our first published product.', cta: 'Explore Archic Lab', product: 'Open Weather', productBody: 'Weather forecasts with transparent sources.', productStatus: 'Published product' },
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
    { name: 'Pupit & Co', sector: 'Comercio electrónico', scope: 'Tienda online de accesorios para perros · Shopify', href: 'https://pupitandcompany.com/', domain: 'pupitandcompany.com', status: 'Publicado' },
  ],
  en: [
    { name: 'Pupit & Co', sector: 'E-commerce', scope: 'Online dog accessories shop · Shopify', href: 'https://pupitandcompany.com/', domain: 'pupitandcompany.com', status: 'Live' },
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
                  <a className="al-btn al-btn-primary" href={auditHref} data-archic-intent="hero:project">{c.hero.primary}</a>
                  <a className="al-link" href="#divisions" data-archic-intent="hero:divisions">{c.hero.secondary} <span aria-hidden="true">→</span></a>
                </div>
              </div>
            </div>
            <nav className="al-divisions" id="divisions" aria-label={L === 'es' ? 'Divisiones de Archic' : 'Archic divisions'}>
              {c.divisions.map(([no, name, description, action, slug]) => (
                <a className="al-division" key={slug} href={p(L, slug)} data-archic-intent={`division:${slug}`}>
                  <span className="al-division-no">{no} / {slug === 'studio' ? 'STUDIO' : 'LAB'}</span>
                  <h2>{name}</h2>
                  <p>{description}</p>
                  <span className="al-division-action">{action} <span aria-hidden="true">→</span></span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="al-statement" aria-labelledby="al-statement-label">
          <div className="al-shell al-statement-grid">
            <p className="al-label" id="al-statement-label">{c.statementLabel}</p>
            <p className="al-statement-text">{c.statementText[0]} <b>{c.statementText[1]}</b></p>
          </div>
        </section>

        <StudioPricing />

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
                    <figure className="al-work-media al-work-pupit">
                      <img src="/media/work/pupit-paseo.jpg" width={1536} height={1024} alt={L === 'es' ? 'Fotografía de portada de Pupit & Co' : 'Pupit & Co homepage photograph'} loading="lazy" decoding="async" />
                    </figure>
                    <div className="al-work-meta">
                      <span className="al-work-no">0{i + 1}</span>
                      <h3>{item.name} <b aria-hidden="true">↗</b><span className="al-sr"> ({c.work.open})</span></h3>
                      <p>{item.sector} · {item.scope}</p>
                      <p className="al-work-status"><span data-state={item.status === 'Publicado' || item.status === 'Live' ? 'live' : 'wip'}>{item.status}</span>{item.domain}</p>
                    </div>
                  </a>
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
                <a className="al-btn al-btn-primary" href={p(L, 'lab')} data-archic-intent="lab:division">{c.lab.cta}</a>
              </div>
            </div>
            <a className="al-lab-product" href={weatherHref} data-archic-intent="lab:weather">
              <span>{c.lab.productStatus}</span><h3>Weather</h3><p>{c.lab.productBody}</p>
              <span className="al-link">{c.lab.product} <span aria-hidden="true">→</span></span>
            </a>
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
              <div className="al-message-links al-message-links--close"><span>Vadim Vornic</span><a href={CONTACT_WHATSAPP_URL} data-archic-intent="audit:whatsapp">WhatsApp</a><a href={CONTACT_MESSAGE_URL} data-archic-intent="audit:message">iMessage / SMS</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  )
}
