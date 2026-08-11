import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE } from '../config/contact'

const COPY = {
  es: {
    hero: {
      kicker: 'ARCHIC / SISTEMAS DIGITALES',
      titleA: 'Diseñamos lo que',
      titleB: 'hace avanzar',
      titleC: 'un negocio.',
      body: 'Estrategia, diseño y tecnología bajo una misma dirección. Creamos presencia digital, sistemas de operación y software a medida con un estándar obsesivo de calidad.',
      cta: 'Empezar un proyecto',
      secondary: 'Ver cómo trabajamos',
      meta: ['ESTUDIO DIGITAL', 'ESPAÑA / REMOTO', '2026'],
    },
    manifesto: {
      kicker: 'EL ESTÁNDAR ARCHIC',
      lineA: 'No hacemos más ruido.',
      lineB: 'Hacemos que importe.',
      body: 'Una experiencia premium no nace de añadir efectos. Nace de una dirección clara, una interfaz precisa, contenido con intención y una ejecución que aguanta el detalle.',
    },
    layers: {
      kicker: 'UN SISTEMA / TRES CAPAS',
      title: 'Del primer impacto a la operación interna.',
      body: 'Archic cubre las tres capas que más afectan a cómo se percibe, funciona y escala un negocio.',
      items: [
        ['01', 'Presence', 'Lo que el cliente ve.', 'Dirección digital, web, contenido, experiencia y conversión.', 'presence'],
        ['02', 'Control', 'Lo que mueve el día a día.', 'Clientes, reservas, recursos, operaciones y gestión privada.', 'control'],
        ['03', 'Business', 'Lo que permite hacer más.', 'Software a medida, automatización, integraciones y datos.', 'business'],
      ],
      open: 'Descubrir',
    },
    work: {
      kicker: 'EXPLORACIONES SELECCIONADAS',
      title: 'Diseñamos antes de pedirte que imagines.',
      body: 'Prototipos funcionales internos que conectan la experiencia del cliente con la operación real. No son casos de éxito: puedes entrar, usarlos y ver cómo Presence, Control y Business trabajan juntos.',
      items: [
        ['01', 'Hostelería', 'Reserva · Experiencia · Operación', 'Reserva una mesa y comprueba cómo esa misma acción llega a sala y genera contexto de cliente.'],
        ['02', 'Movilidad premium', 'Descubrimiento · Reserva · Flota', 'Elige vehículo y fechas, envía una solicitud y observa cómo entra en la gestión de flota.'],
        ['03', 'Inmobiliario', 'Catálogo · Búsqueda · Gestión', 'Filtra propiedades, solicita una visita y sigue el lead desde la capa operativa.'],
      ],
      open: 'Abrir prototipo',
    },
    principles: {
      kicker: 'LA CALIDAD ES UN SISTEMA',
      title: 'El detalle no se deja para el final.',
      items: [
        ['01', 'Dirección', 'Cada proyecto necesita una idea visual propia. Nada de vestir una plantilla.'],
        ['02', 'Interacción', 'Cada clic, transición, formulario y estado forma parte de la marca.'],
        ['03', 'Responsive', 'Móvil se diseña. No se limita a encoger la versión de escritorio.'],
        ['04', 'Rendimiento', 'La percepción premium desaparece en cuanto algo tarda, salta o falla.'],
      ],
    },
    process: {
      kicker: 'CÓMO CONSTRUIMOS',
      title: 'Un proceso corto. Una exigencia alta.',
      steps: [
        ['01', 'Entender', 'Negocio, cliente, fricción y resultado esperado.'],
        ['02', 'Dirigir', 'Concepto, arquitectura, contenido y sistema visual.'],
        ['03', 'Construir', 'Producto funcional con precisión de frontend y backend.'],
        ['04', 'Refinar', 'Móvil, movimiento, rendimiento y pasada final de detalle.'],
      ],
    },
    close: {
      kicker: 'EMPEZAR UN PROYECTO',
      titleA: 'Si lo digital importa,',
      titleB: 'hagámoslo excepcional.',
      body: 'Cuéntanos qué quieres mejorar. No necesitas tener la solución definida: empezamos por el negocio y diseñamos desde ahí.',
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
      body: 'Strategy, design and technology under one direction. We create digital presence, operating systems and custom software with an obsessive standard of quality.',
      cta: 'Start a project',
      secondary: 'See how we work',
      meta: ['DIGITAL STUDIO', 'SPAIN / REMOTE', '2026'],
    },
    manifesto: {
      kicker: 'THE ARCHIC STANDARD',
      lineA: 'We do not make more noise.',
      lineB: 'We make it matter.',
      body: 'A premium experience does not come from adding effects. It comes from clear direction, precise interfaces, intentional content and execution that holds up under scrutiny.',
    },
    layers: {
      kicker: 'ONE SYSTEM / THREE LAYERS',
      title: 'From first impression to internal operations.',
      body: 'Archic covers the three layers that most influence how a business is perceived, how it runs and how it scales.',
      items: [
        ['01', 'Presence', 'What the customer sees.', 'Digital direction, web, content, experience and conversion.', 'presence'],
        ['02', 'Control', 'What moves the day to day.', 'Customers, bookings, resources, operations and private management.', 'control'],
        ['03', 'Business', 'What enables more.', 'Custom software, automation, integrations and data.', 'business'],
      ],
      open: 'Explore',
    },
    work: {
      kicker: 'SELECTED EXPLORATIONS',
      title: 'We design before asking you to imagine.',
      body: 'Functional internal prototypes that connect customer experience with real operations. They are not case studies: you can enter, use them and see Presence, Control and Business working together.',
      items: [
        ['01', 'Hospitality', 'Booking · Experience · Operations', 'Book a table and see the same action reach service operations and create customer context.'],
        ['02', 'Luxury mobility', 'Discovery · Booking · Fleet', 'Choose a vehicle and dates, send an enquiry and watch it enter fleet management.'],
        ['03', 'Real estate', 'Portfolio · Search · Management', 'Filter properties, request a viewing and follow the lead through the operating layer.'],
      ],
      open: 'Open prototype',
    },
    principles: {
      kicker: 'QUALITY IS A SYSTEM',
      title: 'Detail is not left for the end.',
      items: [
        ['01', 'Direction', 'Every project needs its own visual idea. Never a template in disguise.'],
        ['02', 'Interaction', 'Every click, transition, form and state is part of the brand.'],
        ['03', 'Responsive', 'Mobile is designed. It is not just a smaller desktop layout.'],
        ['04', 'Performance', 'Premium perception disappears the moment something is slow, jumps or fails.'],
      ],
    },
    process: {
      kicker: 'HOW WE BUILD',
      title: 'A short process. A high bar.',
      steps: [
        ['01', 'Understand', 'Business, customer, friction and expected outcome.'],
        ['02', 'Direct', 'Concept, architecture, content and visual system.'],
        ['03', 'Build', 'A functional product with frontend and backend precision.'],
        ['04', 'Refine', 'Responsive, motion, performance and the final detail pass.'],
      ],
    },
    close: {
      kicker: 'START A PROJECT',
      titleA: 'If digital matters,',
      titleB: 'make it exceptional.',
      body: 'Tell us what you want to improve. You do not need the solution defined: we start with the business and design from there.',
      cta: 'Talk to Archic',
      call: 'Call',
    },
  },
} as const

const EXPLORATION_SLUGS = ['explorations/hospitality', 'explorations/mobility', 'explorations/real-estate'] as const

function path(lang: 'es' | 'en', slug: string) {
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

function InterfaceStudy({ type, lang }: { type: number; lang: 'es' | 'en' }) {
  if (type === 0) {
    return (
      <div className="ah-study ah-study-hospitality" aria-hidden="true">
        <div className="ah-study-top"><span>{lang === 'es' ? 'MESA 08' : 'TABLE 08'}</span><span>20:30</span></div>
        <div className="ah-study-title">{lang === 'es' ? 'Cena,' : 'Dinner,'}<br /><em>{lang === 'es' ? 'bien pensada.' : 'considered.'}</em></div>
        <div className="ah-study-reserve"><span>04</span><i /><span>{lang === 'es' ? 'AGO' : 'AUG'}</span><strong>{lang === 'es' ? 'Reservar' : 'Reserve'}</strong></div>
      </div>
    )
  }
  if (type === 1) {
    return (
      <div className="ah-study ah-study-mobility" aria-hidden="true">
        <div className="ah-car-line" />
        <div className="ah-study-top"><span>{lang === 'es' ? 'FLOTA / 07' : 'FLEET / 07'}</span><span>MARBELLA</span></div>
        <div className="ah-model"><small>{lang === 'es' ? 'MODELO 03' : 'MODEL 03'}</small><strong>GT<br />SERIES</strong></div>
        <div className="ah-specs"><span>24H</span><span>530 CV</span><span>AUTO</span></div>
      </div>
    )
  }
  return (
    <div className="ah-study ah-study-property" aria-hidden="true">
      <div className="ah-property-grid">
        <div><span>01</span><strong>Villa<br />Norte</strong></div>
        <div><small>{lang === 'es' ? '4 HAB' : '4 BED'}</small><small>320 M²</small><b>€1.4M</b></div>
      </div>
      <div className="ah-property-list"><i /><i /><i /></div>
      <div className="ah-property-foot"><span>{lang === 'es' ? 'PROPIEDAD SELECCIONADA' : 'SELECTED PROPERTY'}</span><span>{lang === 'es' ? 'VER →' : 'VIEW →'}</span></div>
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
    <div className="as-site as-home-v2">
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

          <div className="ah-system-object" aria-hidden="true" data-reveal>
            <div className="ah-system-label"><span>{lang === 'es' ? 'SISTEMA ARCHIC' : 'ARCHIC SYSTEM'}</span><span>01 — 03</span></div>
            <div className="ah-layer ah-layer-one"><span>PRESENCE</span><i>01</i></div>
            <div className="ah-layer ah-layer-two"><span>CONTROL</span><i>02</i></div>
            <div className="ah-layer ah-layer-three"><span>BUSINESS</span><i>03</i></div>
            <div className="ah-system-axis"><i /><span>{lang === 'es' ? 'DISEÑO → OPERACIÓN → SOFTWARE' : 'DESIGN → OPERATIONS → SOFTWARE'}</span></div>
          </div>

          <div className="ah-hero-meta" aria-hidden="true">
            {c.hero.meta.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section className="ah-manifesto ah-paper">
          <div className="ah-section-index">01</div>
          <div className="ah-manifesto-copy" data-reveal>
            <p className="ah-kicker ah-kicker-dark">{c.manifesto.kicker}</p>
            <h2>{c.manifesto.lineA}<br /><em>{c.manifesto.lineB}</em></h2>
            <p>{c.manifesto.body}</p>
          </div>
        </section>

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

        <section className="ah-principles">
          <div className="ah-principles-title" data-reveal>
            <p className="ah-kicker">{c.principles.kicker}</p>
            <h2>{c.principles.title}</h2>
          </div>
          <div className="ah-principles-list">
            {c.principles.items.map(([no, title, body]) => (
              <article key={no} data-reveal>
                <span>{no}</span><h3>{title}</h3><p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ah-process ah-paper">
          <div className="ah-process-head" data-reveal>
            <p className="ah-kicker ah-kicker-dark">{c.process.kicker}</p>
            <h2>{c.process.title}</h2>
          </div>
          <div className="ah-process-grid">
            {c.process.steps.map(([no, title, body]) => (
              <article key={no} data-reveal>
                <span>{no}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

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
