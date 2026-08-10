import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_MAIL } from '../i18n/content'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import ContactForm from '../components/ContactForm'
import { SERVICE_PAGE_BY_PATH, type ServicePage as ServicePageData } from '../seo/servicePages'
import { LOCAL_PAGE_BY_PATH } from '../seo/localPages'
import { INTENT_PAGE_BY_PATH } from '../seo/intentPages'
import { buildLandingGraph, isLocalLanding } from '../seo/landingSchema'
import { useRevealOnScroll } from '../useReveal'
import { LANDING_ART } from '../art/ProjectArt'
import { archPath, STROKE } from '../art/primitives'
import ProcessArc from '../art/ProcessArc'

const ORIGIN = 'https://archic.es'

/** Las landings locales, de servicio y de intención comparten plantilla y catálogo. */
const LANDING_BY_PATH: Record<string, ServicePageData> = {
  ...SERVICE_PAGE_BY_PATH,
  ...LOCAL_PAGE_BY_PATH,
  ...INTENT_PAGE_BY_PATH,
}

export default function ServicePage({ page }: { page: ServicePageData }) {
  const { t } = useLang()
  useRevealOnScroll()
  const canonical = `${ORIGIN}${page.path}`
  const local = isLocalLanding(page) ? page.local : null
  const Art = LANDING_ART[page.path]
  const structuredData = buildLandingGraph(page, 'es')

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'es' }}>
        <title>{page.meta.title}</title>
        <meta name="description" content={page.meta.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={page.meta.title} />
        <meta property="og:description" content={page.meta.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:image" content={`${ORIGIN}/og-image.png?v=3`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.meta.title} />
        <meta name="twitter:description" content={page.meta.description} />
        <meta name="twitter:image" content={`${ORIGIN}/og-image.png?v=3`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div id="top" className="ar-service-page">
        <SiteHeader />

        <nav className="ar-breadcrumb" aria-label="Ruta de navegación">
          <div className="ar-container">
            <a href="/">Inicio</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.breadcrumb}</span>
          </div>
        </nav>

        <section className="ar-hero ar-hero-compact">
          <div className="ar-container ar-hero-grid">
            <div>
              <p className="ar-eyebrow">{page.hero.eyebrow}</p>
              <h1 className="ar-hero-title">{page.hero.h1}</h1>
              <p className="ar-hero-sub">{page.hero.lead}</p>
              <div className="ar-hero-ctas">
                <a href="#contacto" className="ar-btn ar-btn-primary">{t.hero.ctaPrimary}</a>
                <a href={`tel:${CONTACT_PHONE}`} className="ar-btn ar-btn-ghost">Llamar {CONTACT_PHONE_DISPLAY}</a>
              </div>
              <p className="ar-hero-note">{page.hero.note}</p>
            </div>

            {Art && (
              <div className="ar-hero-media">
                <svg className="ar-hero-arch" viewBox="0 0 320 400" aria-hidden="true" focusable="false" fill="none">
                  <path d={archPath(10, 10, 300, 380)} stroke="var(--gold)" strokeWidth={STROKE * 1.5} opacity="0.5" />
                  <path d={archPath(38, 38, 244, 352)} stroke="var(--gold)" strokeWidth={STROKE} opacity="0.26" />
                </svg>
                <div className="ar-landing-art"><Art /></div>
              </div>
            )}
          </div>
        </section>

        <section className="ar-section">
          <div className="ar-container">
            <div className="ar-sec-head"><p className="ar-eyebrow">Contexto</p><h2 className="ar-h2">{page.intro.title}</h2></div>
            {page.intro.body.map((paragraph) => <p key={paragraph} className="ar-lead" style={{ marginTop: 14 }}>{paragraph}</p>)}
          </div>
        </section>

        <section id="alcance" className="ar-section ar-section-alt" style={{ scrollMarginTop: '70px' }}>
          <div className="ar-container">
            <div className="ar-sec-head"><p className="ar-eyebrow">{page.blocks.eyebrow}</p><h2 className="ar-h2">{page.blocks.title}</h2><p className="ar-lead">{page.blocks.lead}</p></div>
            <div className="ar-grid-2">{page.blocks.items.map((item) => <div key={item.title} className="ar-tile" data-reveal="out"><h3>{item.title}</h3><p>{item.desc}</p></div>)}</div>
          </div>
        </section>

        <section className="ar-section">
          <div className="ar-container">
            <div className="ar-sec-head"><p className="ar-eyebrow">Encaje</p><h2 className="ar-h2">{page.includes.title}</h2></div>
            <ul className="ar-list">{page.includes.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="ar-section ar-section-alt">
          <div className="ar-container">
            <div className="ar-sec-head"><p className="ar-eyebrow">Proceso</p><h2 className="ar-h2">{page.process.title}</h2></div>
            <ProcessArc steps={page.process.steps.length} className="ar-process-figure" />
            <ol className="ar-steps">{page.process.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        </section>

        <section className="ar-section">
          <div className="ar-container">
            <div className="ar-sec-head"><p className="ar-eyebrow">FAQ</p><h2 className="ar-h2">{page.faq.title}</h2></div>
            <div className="ar-faq">{page.faq.items.map((item) => <details key={item.q} className="ar-faq-item"><summary><h3>{item.q}</h3></summary><p>{item.a}</p></details>)}</div>
          </div>
        </section>

        {local && (
          <section className="ar-section">
            <div className="ar-container">
              <div className="ar-sec-head"><p className="ar-eyebrow">Zona de actuación</p><h2 className="ar-h2">Dónde trabajamos desde Écija</h2><p className="ar-lead">Base en Écija (Sevilla). Atendemos {local.city} y su provincia de forma presencial cuando el proyecto lo pide, y el resto de España en remoto.</p></div>
              <div className="ar-chips">{[local.city, ...local.alsoServes].map((place) => <span key={place} className="ar-chip">{place}</span>)}</div>
            </div>
          </section>
        )}

        {page.related.length > 0 && (
          <section className="ar-section ar-section-alt">
            <div className="ar-container">
              <div className="ar-sec-head"><p className="ar-eyebrow">Servicios relacionados</p><h2 className="ar-h2">Otros servicios de Archic</h2></div>
              <div className="ar-chips">{page.related.map((href) => { const related = LANDING_BY_PATH[href]; if (!related) return null; return <a key={href} href={href} className="ar-chip ar-chip-link">{related.breadcrumb}</a> })}</div>
            </div>
          </section>
        )}

        <section id="contacto" className="ar-section" style={{ scrollMarginTop: '70px' }}>
          <div className="ar-container">
            <div className="ar-contact-grid">
              <div>
                <p className="ar-eyebrow">{t.contact.eyebrow}</p><h2 className="ar-h2">{page.cta.title}</h2><p className="ar-lead">{page.cta.lead}</p>
                <p className="ar-lead" style={{ marginTop: 20 }}>Teléfono: <a href={`tel:${CONTACT_PHONE}`} className="ar-inline-link">{CONTACT_PHONE_DISPLAY}</a></p>
                <p className="ar-lead" style={{ marginTop: 8 }}>{t.contact.directLabel}{' '}<a href={`mailto:${CONTACT_MAIL}`} className="ar-inline-link">{CONTACT_MAIL}</a></p>
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
