import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'

const PRESENCE_IMAGE = 'https://images.pexels.com/photos/31080809/pexels-photo-31080809/free-photo-of-elegant-luxury-hotel-lobby-with-warm-ambiance.jpeg?auto=compress&dpr=1&h=900&w=1440'

const COPY = {
  es: {
    hero: {
      eyebrow: 'ARCHIC — DIGITAL SYSTEMS',
      title: 'La parte digital de',
      accent: 'negocios excepcionales.',
      body: 'Diseñamos lo que ve el cliente y construimos lo que hace funcionar el negocio por detrás. Presencia, operaciones y software con una misma dirección.',
      primary: 'Hablar de un proyecto',
      call: 'Llamar directamente',
    },
    chapters: {
      eyebrow: 'THREE LAYERS / ONE STANDARD',
      title: 'Una empresa. Tres capas digitales.',
      body: 'Empieza por la necesidad que más valor pueda crear hoy. La arquitectura está pensada para que el resto pueda crecer después sin perder coherencia.',
      presence: ['ARCHIC PRESENCE', 'Lo que el mundo ve.', 'Dirección digital, web, contenido y conversión.', 'DIRECTION / EXPERIENCE / CONVERSION'],
      control: ['ARCHIC CONTROL', 'Lo que hace funcionar el día a día.', 'Clientes, reservas, recursos y operaciones en un entorno privado.', 'CLIENTS / BOOKINGS / OPERATIONS'],
      business: ['ARCHIC BUSINESS', 'Lo que te permite hacer más.', 'Software a medida, automatización, integraciones y datos.', 'SOFTWARE / AUTOMATION / DATA'],
      explore: 'Explorar',
    },
    standard: {
      eyebrow: 'THE ARCHIC STANDARD',
      title: 'Menos ruido.',
      accent: 'Más intención.',
      body: 'La calidad no viene de añadir más. Viene de elegir mejor: jerarquía, ritmo, detalle, rendimiento y una dirección clara desde el principio.',
    },
    fit: {
      eyebrow: 'WHO WE WORK BEST WITH',
      title: 'Cuando lo digital',
      accent: 'sí importa al negocio.',
      body: 'Encajamos mejor con negocios para los que percepción, experiencia u operación tienen impacto real. Si solo buscas la opción más barata, probablemente no somos la mejor elección.',
      studio: 'Cómo trabaja Archic',
    },
    close: {
      eyebrow: 'START A PROJECT',
      title: 'Cuéntanos qué quieres',
      accent: 'elevar.',
      body: 'No necesitas llegar con una solución. El negocio, el problema y el resultado esperado son un buen punto de partida.',
      cta: 'Abrir una conversación',
      call: 'O llámanos directamente',
    },
  },
  en: {
    hero: {
      eyebrow: 'ARCHIC — DIGITAL SYSTEMS',
      title: 'The digital side of',
      accent: 'exceptional businesses.',
      body: 'We design what the customer sees and build what makes the business work behind it. Presence, operations and software under one direction.',
      primary: 'Talk about a project',
      call: 'Call directly',
    },
    chapters: {
      eyebrow: 'THREE LAYERS / ONE STANDARD',
      title: 'One company. Three digital layers.',
      body: 'Start with the need that can create the most value today. The architecture is designed so the rest can grow later without losing coherence.',
      presence: ['ARCHIC PRESENCE', 'What the world sees.', 'Digital direction, web, content and conversion.', 'DIRECTION / EXPERIENCE / CONVERSION'],
      control: ['ARCHIC CONTROL', 'What makes daily work run.', 'Customers, bookings, resources and operations in a private environment.', 'CLIENTS / BOOKINGS / OPERATIONS'],
      business: ['ARCHIC BUSINESS', 'What lets you do more.', 'Custom software, automation, integrations and data.', 'SOFTWARE / AUTOMATION / DATA'],
      explore: 'Explore',
    },
    standard: {
      eyebrow: 'THE ARCHIC STANDARD',
      title: 'Less noise.',
      accent: 'More intent.',
      body: 'Quality does not come from adding more. It comes from choosing better: hierarchy, rhythm, detail, performance and a clear direction from the beginning.',
    },
    fit: {
      eyebrow: 'WHO WE WORK BEST WITH',
      title: 'When digital',
      accent: 'actually matters to the business.',
      body: 'We work best with businesses where perception, experience or operations have real impact. If the only goal is finding the cheapest option, we are probably not the right choice.',
      studio: 'How Archic works',
    },
    close: {
      eyebrow: 'START A PROJECT',
      title: 'Tell us what you want',
      accent: 'to elevate.',
      body: 'You do not need to arrive with a solution. The business, the problem and the expected outcome are enough to start.',
      cta: 'Open a conversation',
      call: 'Or call us directly',
    },
  },
}

function path(lang: 'es' | 'en', slug: string) {
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

export default function ArchicHome() {
  const { lang } = useLang()
  const c = COPY[lang]
  const seo = HOME_SEO[lang]
  const canonicalUrl = homeCanonical(lang)
  const structuredData = buildHomeGraph(lang)
  const ogImage = siteOgImage(lang)

  const products = [
    { key: 'presence', copy: c.chapters.presence, className: 'as-product-presence' },
    { key: 'control', copy: c.chapters.control, className: 'as-product-control' },
    { key: 'business', copy: c.chapters.business, className: 'as-product-business' },
  ]

  return (
    <div className="as-site as-home">
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

      <main>
        <section className="as-home-hero" id="home">
          <div className="as-home-hero-copy" data-reveal="hero">
            <p className="as-kicker">{c.hero.eyebrow}</p>
            <h1>{c.hero.title}<br /><em>{c.hero.accent}</em></h1>
            <p>{c.hero.body}</p>
            <div className="as-actions as-hero-actions">
              <a className="as-btn as-btn-metal" href={path(lang, 'contact')}>{c.hero.primary}<i className="as-arrow" aria-hidden="true" /></a>
              <a className="as-call-cta" href={`tel:${CONTACT_PHONE}`}>
                <span>{c.hero.call}</span>
                <strong>{CONTACT_PHONE_DISPLAY}</strong>
              </a>
            </div>
          </div>
          <div className="as-home-hero-index" aria-hidden="true">
            <span>01 — 03</span><i /><strong>PRESENCE<br />CONTROL<br />BUSINESS</strong>
          </div>
        </section>

        <section className="as-products" aria-labelledby="archic-layers-title">
          <div className="as-products-head" data-reveal>
            <div>
              <p className="as-kicker">{c.chapters.eyebrow}</p>
              <h2 id="archic-layers-title">{c.chapters.title}</h2>
            </div>
            <p>{c.chapters.body}</p>
          </div>

          <div className="as-products-grid">
            {products.map((product, index) => (
              <a className={`as-product ${product.className}`} href={path(lang, product.key)} key={product.key} data-reveal>
                {product.key === 'presence' && <img src={PRESENCE_IMAGE} alt="" loading="lazy" decoding="async" />}
                <div className="as-product-shade" />
                <div className="as-product-no">0{index + 1}</div>
                <div className="as-product-detail" aria-hidden="true">{product.copy[3]}</div>
                <div className="as-product-copy">
                  <span>{product.copy[0]}</span>
                  <h3>{product.copy[1]}</h3>
                  <p>{product.copy[2]}</p>
                  <strong>{c.chapters.explore}<i className="as-arrow" aria-hidden="true" /></strong>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="as-home-standard">
          <div className="as-standard-inner" data-reveal>
            <p className="as-kicker">{c.standard.eyebrow}</p>
            <h2>{c.standard.title}<br /><em>{c.standard.accent}</em></h2>
            <p>{c.standard.body}</p>
          </div>
        </section>

        <section className="as-home-fit">
          <div data-reveal>
            <p className="as-kicker">{c.fit.eyebrow}</p>
            <h2>{c.fit.title}<br /><em>{c.fit.accent}</em></h2>
          </div>
          <div data-reveal>
            <p>{c.fit.body}</p>
            <a className="as-text-link as-text-link-dark" href={path(lang, 'studio')}>{c.fit.studio}<i className="as-arrow" aria-hidden="true" /></a>
          </div>
        </section>

        <section className="as-home-close">
          <div className="as-close-inner" data-reveal>
            <p className="as-kicker">{c.close.eyebrow}</p>
            <h2>{c.close.title}<br /><em>{c.close.accent}</em></h2>
            <p>{c.close.body}</p>
            <div className="as-close-actions">
              <a className="as-btn as-btn-metal" href={path(lang, 'contact')}>{c.close.cta}<i className="as-arrow" aria-hidden="true" /></a>
              <a className="as-call-cta as-call-cta-centered" href={`tel:${CONTACT_PHONE}`}>
                <span>{c.close.call}</span>
                <strong>{CONTACT_PHONE_DISPLAY}</strong>
              </a>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  )
}
