import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_MAIL } from '../i18n/content'
import { LEGAL_PATHS } from '../legal/documents'
import SiteHeader from '../components/SiteHeader'
import ContactForm from '../components/ContactForm'
import Logo from '../components/Logo'
import BlueprintMark from '../components/BlueprintMark'
import { useScrollReveal } from '../useScrollReveal'

import heroImage from '../assets/hero-archic.webp'
import { SERVICE_PAGES } from '../seo/servicePages'
import { LOCAL_PAGES } from '../seo/localPages'
import { localBusinessNode, LOCAL_BUSINESS } from '../seo/localBusiness'

/* Ámbito local de la home: la base física en Écija y la provincia de Sevilla. */
const HOME_LOCAL_SCOPE = {
  city: 'Écija',
  province: 'Sevilla',
  alsoServes: ['Sevilla', 'Carmona', 'Osuna', 'Marchena', 'Utrera', 'Dos Hermanas', 'Palma del Río'],
}

/** Cada bloque de servicio de la home apunta a su landing especializada. */
const SERVICE_LANDINGS: Record<string, string> = {
  web: '/diseno-web-para-empresas/',
  mantenimiento: '/mantenimiento-web/',
  software: '/desarrollo-web-a-medida/',
}


export default function ArchicHome() {
  const { t, lang } = useLang()
  useScrollReveal([lang])
  const canonicalUrl = lang === 'es' ? 'https://archic.es/' : 'https://archic.es/en/'
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://archic.es/#organization',
        name: 'Archic',
        url: 'https://archic.es/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://archic.es/archic-mark.png',
          contentUrl: 'https://archic.es/archic-mark.png',
          width: 381,
          height: 376,
        },
        image: 'https://archic.es/og-image.jpg',
        email: CONTACT_MAIL,
        description: t.meta.description,
        areaServed: { '@type': 'Country', name: lang === 'es' ? 'España' : 'Spain' },
        knowsLanguage: ['es', 'en'],
        contactPoint: {
          '@type': 'ContactPoint',
          email: CONTACT_MAIL,
          contactType: 'sales',
          availableLanguage: ['Spanish', 'English'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: lang === 'es' ? 'Servicios digitales para empresas' : 'Digital services for businesses',
          itemListElement: t.services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.intro,
              provider: { '@id': 'https://archic.es/#organization' },
              areaServed: { '@type': 'Country', name: lang === 'es' ? 'España' : 'Spain' },
            },
          })),
        },
      },
      localBusinessNode(HOME_LOCAL_SCOPE, lang),
      {
        '@type': 'WebSite',
        '@id': 'https://archic.es/#website',
        url: 'https://archic.es/',
        name: 'Archic',
        inLanguage: ['es', 'en'],
        publisher: { '@id': 'https://archic.es/#organization' },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        isPartOf: { '@id': 'https://archic.es/#website' },
        about: { '@id': 'https://archic.es/#organization' },
      },
    ],
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang }}>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/" />
        <meta property="og:title" content={t.meta.ogTitle} />
        <meta property="og:description" content={t.meta.ogDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
        <meta property="og:locale:alternate" content={lang === 'es' ? 'en_US' : 'es_ES'} />
        <meta property="og:image" content={`https://archic.es/${t.meta.ogImage}`} />
        <meta property="og:image:secure_url" content={`https://archic.es/${t.meta.ogImage}`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="500" />
        <meta property="og:image:alt" content={t.meta.ogImageAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ArchicHQ" />
        <meta name="twitter:title" content={t.meta.ogTitle} />
        <meta name="twitter:description" content={t.meta.ogDescription} />
        <meta name="twitter:image" content={`https://archic.es/${t.meta.ogImage}`} />
        <meta name="twitter:image:alt" content={t.meta.ogImageAlt} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>


      <div id="top">
        <SiteHeader />

        {/* HERO */}
        <section className="ar-hero">
          <div className="ar-blueprint" aria-hidden="true" />
          <div className="ar-container">
            <div className="ar-hero-grid">
              <div>
                {/* El titular se compone por líneas para que entren
                    enmascaradas una tras otra. Unidas dicen exactamente lo
                    mismo que t.hero.title, que es lo que indexa el buscador. */}
                <h1 className="ar-hero-title">
                  {t.hero.titleLines.map((line, i) => (
                    <span
                      key={line.text}
                      className="ar-line"
                      style={{ '--line-delay': `${120 + i * 110}ms` } as React.CSSProperties}
                    >
                      <span className={line.accent ? 'ar-accent' : undefined}>{line.text}</span>
                      {/* Espacio entre líneas: no se ve, porque cada línea es un
                          bloque, pero un lector de pantalla leería si no
                          "softwarea medidapara empresas". */}
                      {i < t.hero.titleLines.length - 1 ? ' ' : null}
                    </span>
                  ))}
                </h1>
                <p className="ar-hero-sub">{t.hero.subtitle}</p>
                <div className="ar-hero-ctas">
                  <a href="#contacto" className="ar-btn ar-btn-primary">
                    {t.hero.ctaPrimary}
                  </a>
                  <a href="#servicios" className="ar-btn ar-btn-ghost">
                    {t.hero.ctaSecondary}
                  </a>
                </div>
                <p className="ar-hero-note">{t.hero.note}</p>
              </div>

              {/* La lámina se dibuja sola al cargar: es la demostración, no un
                  adorno. Sustituye a la foto, que baja a "Sobre Archic". */}
              <div className="ar-hero-plate">
                <BlueprintMark delay={260} />
              </div>
            </div>

            <dl className="ar-spec">
              {t.hero.spec.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="ar-section">
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.servicesIntro.eyebrow}</p>
              <h2 className="ar-h2">{t.servicesIntro.title}</h2>
              <p className="ar-lead">{t.servicesIntro.lead}</p>
            </div>

            <div className="ar-services">
              {t.services.map((service) => (
                <article
                  key={service.id}
                  id={service.id}
                  className="ar-service"
                  style={{ scrollMarginTop: '90px' }}
                >
                  <span className="ar-service-num">{service.eyebrow}</span>
                  {/* Título, texto y enlace van juntos en la columna central;
                      la lista ocupa la tercera. */}
                  <div className="ar-service-body">
                    <h3 className="ar-service-title">{service.title}</h3>
                    <p className="ar-service-intro">{service.intro}</p>
                    {/* Enlace interno a la landing con la intención de búsqueda
                        correspondiente: reparte autoridad desde la home. */}
                    {SERVICE_LANDINGS[service.id] && (
                      <a className="ar-service-link" href={SERVICE_LANDINGS[service.id]}>
                        {lang === 'es' ? 'Ver servicio →' : 'View service →'}
                      </a>
                    )}
                  </div>
                  <ul className="ar-list">
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="ar-chips" style={{ marginTop: 28 }}>
              {SERVICE_PAGES.map((page) => (
                <a key={page.path} href={page.path} className="ar-chip ar-chip-link">
                  {page.breadcrumb}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CÓMO TRABAJAMOS */}
        <section className="ar-section ar-section-alt">
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.value.eyebrow}</p>
              <h2 className="ar-h2">{t.value.title}</h2>
              <p className="ar-lead">{t.value.lead}</p>
            </div>
            <div className="ar-grid-2">
              {t.value.principles.map((p) => (
                <div key={p.title} className="ar-tile">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section className="ar-section">
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.process.eyebrow}</p>
              <h2 className="ar-h2">{t.process.title}</h2>
              <p className="ar-lead">{t.process.lead}</p>
            </div>
            <ol className="ar-steps">
              {t.process.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* CLIENTES */}
        <section className="ar-section ar-section-alt">
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.clients.eyebrow}</p>
              <h2 className="ar-h2">{t.clients.title}</h2>
              <p className="ar-lead">{t.clients.lead}</p>
            </div>
            <div className="ar-chips">
              {t.clients.items.map((item) => (
                <span key={item} className="ar-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PROYECTOS */}
        <section id="proyectos" className="ar-section" style={{ scrollMarginTop: '70px' }}>
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.projects.eyebrow}</p>
              <h2 className="ar-h2">{t.projects.title}</h2>
              <p className="ar-lead">{t.projects.lead}</p>
            </div>
            <div className="ar-projects">
              {t.projects.items.map((p) => (
                <article key={p.title} className="ar-project">
                  <div className="ar-project-top">
                    <span className="ar-note">{t.projects.conceptLabel}</span>
                    <span className="ar-tag">{p.tag}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PRUEBA — datos verificables de esta misma web */}
        <section className="ar-section ar-proof">
          <div className="ar-blueprint" aria-hidden="true" />
          <BlueprintMark delay={0} />
          <div className="ar-container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.proof.eyebrow}</p>
              <h2 className="ar-h2">
                {t.proof.title} <span className="ar-accent">{t.proof.titleAccent}</span>
              </h2>
              <p className="ar-lead">{t.proof.lead}</p>
            </div>
            <div className="ar-proof-grid">
              {t.proof.items.map((item) => (
                <div key={item.label} className="ar-proof-item">
                  <span className="ar-proof-value">{item.value}</span>
                  <p className="ar-proof-label">{item.label}</p>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE ARCHIC */}
        <section id="sobre" className="ar-section ar-section-alt" style={{ scrollMarginTop: '70px' }}>
          <div className="ar-container">
            <div className="ar-about-grid">
              <div>
                <p className="ar-eyebrow">{t.about.eyebrow}</p>
                <h2 className="ar-h2">{t.about.title}</h2>
                {t.about.body.map((paragraph) => (
                  <p key={paragraph} className="ar-lead" style={{ marginTop: 16 }}>
                    {paragraph}
                  </p>
                ))}
              </div>
              {/* La foto vive aquí y no en el hero: aporta lugar y calidez, y
                  al bajar deja el LCP en el titular, que pinta antes. */}
              <div className="ar-hero-media">
                <img
                  src={heroImage}
                  alt={t.hero.imageAlt}
                  width={1200}
                  height={829}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ARCHIC LABS */}
        <section id="labs" className="ar-section ar-labs" style={{ scrollMarginTop: '70px' }}>
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.labs.eyebrow}</p>
              <h2 className="ar-h2">{t.labs.title}</h2>
              <p className="ar-lead">{t.labs.lead}</p>
            </div>
            <div className="ar-lab-grid">
              {t.labs.items.map((item) => {
                const inner = (
                  <>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <span className="ar-lab-status">{item.status}</span>
                  </>
                )
                return item.href ? (
                  <a key={item.name} href={item.href} target="_blank" rel="noreferrer" className="ar-lab">
                    {inner}
                  </a>
                ) : (
                  <div key={item.name} className="ar-lab">
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ZONA DE ACTUACIÓN — enlaza a las landings locales desde la home */}
        <section id="zonas" className="ar-section ar-section-alt" style={{ scrollMarginTop: '70px' }}>
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{lang === 'es' ? 'Zona de actuación' : 'Where we work'}</p>
              <h2 className="ar-h2">
                {lang === 'es'
                  ? `Estudio en ${LOCAL_BUSINESS.city}, provincia de ${LOCAL_BUSINESS.province}`
                  : `Studio based in ${LOCAL_BUSINESS.city}, ${LOCAL_BUSINESS.province} (Spain)`}
              </h2>
              <p className="ar-lead">
                {lang === 'es'
                  ? 'Trabajamos de forma presencial con empresas y autónomos de Écija, la Campiña y Sevilla capital, y en remoto con el resto de España.'
                  : 'We work on-site with companies across Écija, the Campiña area and Seville, and remotely with the rest of Spain.'}
              </p>
            </div>
            <div className="ar-chips">
              {LOCAL_PAGES.map((page) => (
                <a key={page.path} href={page.path} className="ar-chip ar-chip-link">
                  {page.breadcrumb}
                </a>
              ))}
            </div>
            <p className="ar-hero-note" style={{ marginTop: 18 }}>
              {LOCAL_BUSINESS.city} · {LOCAL_BUSINESS.postalCode} · {LOCAL_BUSINESS.province} ·{' '}
              {LOCAL_BUSINESS.region}
            </p>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="ar-section" style={{ scrollMarginTop: '70px' }}>
          <div className="ar-container">
            <div className="ar-contact-grid">
              <div>
                <p className="ar-eyebrow">{t.contact.eyebrow}</p>
                <h2 className="ar-h2">{t.contact.title}</h2>
                <p className="ar-lead">{t.contact.lead}</p>
                <p className="ar-lead" style={{ marginTop: 20 }}>
                  {t.contact.directLabel}{' '}
                  <a href={`mailto:${CONTACT_MAIL}`} className="ar-inline-link">
                    {CONTACT_MAIL}
                  </a>
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="ar-footer">
          <div className="ar-container">
            <div className="ar-footer-grid">
              <div>
                <Logo size={30} className="ar-logo-footer" />
                <p className="ar-lead" style={{ fontSize: 14, marginTop: 12 }}>
                  {t.footer.tagline}
                </p>
              </div>

              <div className="ar-footer-links">
                <a href="#servicios">{t.nav.web}</a>
                <a href="#software">{t.nav.software}</a>
                <a href="#mantenimiento">{t.nav.maintenance}</a>
                <a href="#proyectos">{t.nav.projects}</a>
                <a href="#sobre">{t.nav.about}</a>
                <a href="#contacto">{t.nav.contact}</a>
                <a href="/diseno-web-sevilla/">Diseño web en Sevilla</a>
                <a href="/diseno-web-ecija/">Diseño web en Écija</a>
                <a href="https://midas.archic.es" target="_blank" rel="noreferrer">
                  Archic Labs
                </a>
                <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
              </div>
            </div>
            {/* Art. 10 LSSI-CE requires permanent, easy and direct access to
                the legal notice from every page. */}
            <nav className="ar-footer-legal" aria-label={t.footer.legalLabel}>
              <a href={LEGAL_PATHS.legal[lang]}>{t.legal.legalNotice}</a>
              <a href={LEGAL_PATHS.privacy[lang]}>{t.legal.privacy}</a>
              <a href={LEGAL_PATHS.cookies[lang]}>{t.legal.cookies}</a>
            </nav>

            <div className="ar-footer-bottom">
              <span>© {new Date().getFullYear()} ARCHIC · {t.footer.rights}</span>
              <span>ÉCIJA · SEVILLA · ESPAÑA</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
