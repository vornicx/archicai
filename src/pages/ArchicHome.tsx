import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_MAIL } from '../i18n/content'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import ContactForm from '../components/ContactForm'

import heroImage from '../assets/hero-archic.webp'
import { SERVICE_PAGES } from '../seo/servicePages'
import { LOCAL_PAGES } from '../seo/localPages'
import { LOCAL_BUSINESS } from '../seo/localBusiness'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { useRevealOnScroll } from '../useReveal'
import { ArchRule, archPath, STROKE } from '../art/primitives'
import { SERVICE_GLYPHS } from '../art/ServiceGlyph'
import { PROJECT_ART } from '../art/ProjectArt'
import ProcessArc from '../art/ProcessArc'

/** Cada bloque de servicio de la home apunta a su landing especializada. */
const SERVICE_LANDINGS: Record<string, string> = {
  web: '/diseno-web-para-empresas/',
  mantenimiento: '/mantenimiento-web/',
  software: '/desarrollo-web-a-medida/',
}


export default function ArchicHome() {
  const { t, lang } = useLang()
  useRevealOnScroll()
  const canonicalUrl = homeCanonical(lang)
  const structuredData = buildHomeGraph(lang)

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
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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
          <div className="ar-container ar-hero-grid">
            <div>
              <h1 className="ar-hero-title">{t.hero.title}</h1>
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

            {/* La fotografía se apoya sobre un arco dibujado que la desborda:
                es el motivo que da nombre a la marca, y evita que la imagen
                quede como un rectángulo pegado al lado del texto. */}
            <div className="ar-hero-media">
              <svg className="ar-hero-arch" viewBox="0 0 320 400" aria-hidden="true" focusable="false" fill="none">
                <path d={archPath(10, 10, 300, 380)} stroke="var(--gold)" strokeWidth={STROKE * 1.5} opacity="0.55" />
                <path d={archPath(38, 38, 244, 352)} stroke="var(--gold)" strokeWidth={STROKE} opacity="0.28" />
              </svg>
              <div className="ar-hero-photo">
                <img
                  src={heroImage}
                  alt={t.hero.imageAlt}
                  width={1200}
                  height={829}
                  {...{ fetchpriority: 'high' }}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* DATOS COMPROBABLES — credibilidad antes que catálogo */}
        <section className="ar-section ar-facts-section">
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.facts.eyebrow}</p>
              <h2 className="ar-h2">{t.facts.title}</h2>
              <p className="ar-lead">{t.facts.lead}</p>
            </div>
            <dl className="ar-facts">
              {t.facts.items.map((fact) => (
                <div key={fact.label} className="ar-fact" data-reveal="out">
                  <dt>
                    <span className="ar-fact-value">{fact.value}</span>
                    <span className="ar-fact-label">{fact.label}</span>
                  </dt>
                  <dd>{fact.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="ar-section ar-section-alt">
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.servicesIntro.eyebrow}</p>
              <h2 className="ar-h2">{t.servicesIntro.title}</h2>
              <p className="ar-lead">{t.servicesIntro.lead}</p>
            </div>

            <div className="ar-services">
              {t.services.map((service) => {
                const Glyph = SERVICE_GLYPHS[service.id]
                return (
                  <article
                    key={service.id}
                    id={service.id}
                    className="ar-service"
                    style={{ scrollMarginTop: '90px' }}
                    data-reveal="out"
                  >
                    <div className="ar-service-head">
                      {Glyph && <Glyph className="ar-service-glyph" />}
                      <span className="ar-service-num">{service.eyebrow}</span>
                    </div>
                    <h3 className="ar-service-title">{service.title}</h3>
                    <p className="ar-service-intro">{service.intro}</p>
                    <ul className="ar-list">
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {/* Enlace interno a la landing con la intención de búsqueda
                        correspondiente: reparte autoridad desde la home. */}
                    {SERVICE_LANDINGS[service.id] && (
                      <a className="ar-service-link" href={SERVICE_LANDINGS[service.id]}>
                        {lang === 'es' ? 'Ver servicio →' : 'View service →'}
                      </a>
                    )}
                  </article>
                )
              })}
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
        <section className="ar-section">
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.value.eyebrow}</p>
              <h2 className="ar-h2">{t.value.title}</h2>
              <p className="ar-lead">{t.value.lead}</p>
            </div>
            <div className="ar-grid-2">
              {t.value.principles.map((p) => (
                <div key={p.title} className="ar-tile" data-reveal="out">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section className="ar-section ar-section-alt">
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.process.eyebrow}</p>
              <h2 className="ar-h2">{t.process.title}</h2>
              <p className="ar-lead">{t.process.lead}</p>
            </div>
            <ProcessArc steps={t.process.steps.length} className="ar-process-figure" />
            <ol className="ar-steps">
              {t.process.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* CLIENTES */}
        <section className="ar-section">
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
        <section id="proyectos" className="ar-section ar-section-alt" style={{ scrollMarginTop: '70px' }}>
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.projects.eyebrow}</p>
              <h2 className="ar-h2">{t.projects.title}</h2>
              <p className="ar-lead">{t.projects.lead}</p>
            </div>
            <div className="ar-projects">
              {t.projects.items.map((p, i) => {
                const Art = PROJECT_ART[i]
                /* La primera pieza ocupa el doble de ancho: rompe la retícula y
                   da una entrada clara a la sección. */
                return (
                  <article
                    key={p.title}
                    className={`ar-project ${i === 0 ? 'ar-project-wide' : ''}`}
                    data-reveal="out"
                  >
                    <div className="ar-project-art">{Art && <Art />}</div>
                    <div className="ar-project-body">
                      <div className="ar-project-top">
                        <span className="ar-note">{t.projects.conceptLabel}</span>
                        <span className="ar-tag">{p.tag}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* SOBRE ARCHIC */}
        <section id="sobre" className="ar-section" style={{ scrollMarginTop: '70px' }}>
          <div className="ar-container">
            <div className="ar-about-grid">
              <div>
                <p className="ar-eyebrow">{t.about.eyebrow}</p>
                <h2 className="ar-h2">{t.about.title}</h2>
                {t.about.body.map((paragraph) => (
                  <p key={paragraph} className="ar-lead" style={{ marginTop: 14 }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Definición autocontenida. Está aquí por dos motivos: para quien
                  llega sin contexto, y porque es el párrafo que un asistente de
                  IA puede citar entero sin tener que resumir la página. */}
              <aside className="ar-answer" aria-labelledby="ar-answer-q">
                <ArchRule className="ar-answer-rule" />
                <h3 id="ar-answer-q" className="ar-answer-q">
                  {t.answer.question}
                </h3>
                <p className="ar-answer-body">{t.answer.body}</p>
              </aside>
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section id="faq" className="ar-section ar-section-alt" style={{ scrollMarginTop: '70px' }}>
          <div className="ar-container">
            <div className="ar-sec-head">
              <p className="ar-eyebrow">{t.homeFaq.eyebrow}</p>
              <h2 className="ar-h2">{t.homeFaq.title}</h2>
              <p className="ar-lead">{t.homeFaq.lead}</p>
            </div>
            <div className="ar-faq">
              {t.homeFaq.items.map((item) => (
                <details key={item.q} className="ar-faq-item">
                  <summary>
                    <h3>{item.q}</h3>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
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
        <section id="zonas" className="ar-section" style={{ scrollMarginTop: '70px' }}>
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
        <section id="contacto" className="ar-section ar-section-alt" style={{ scrollMarginTop: '70px' }}>
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

        <SiteFooter />
      </div>
    </>
  )
}
