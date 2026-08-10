import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_MAIL } from '../i18n/content'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'

const COPY = {
  es: {
    meta: {
      title: 'Archic — La capa digital de negocios excepcionales',
      description: 'Diseñamos webs premium, sistemas operativos y software a medida como una sola capa digital alrededor del negocio.',
    },
    hero: {
      kicker: 'ARCHIC / DIGITAL LAYER STUDIO',
      title: 'Tu negocio ya tiene una identidad.',
      accent: 'Hacemos que su parte digital esté a la misma altura.',
      body: 'Web, reservas, gestión y software a medida — concebidos como un solo sistema cuando el negocio realmente lo necesita.',
      cta: 'Empezar proyecto',
      secondary: 'Explorar el sistema',
      public: 'Lo que ve el cliente',
      publicItems: ['Marca digital', 'Web', 'Reservas', 'Conversión'],
      ops: 'Lo que usa el negocio',
      opsItems: ['Clientes', 'Operaciones', 'Automatización', 'Software'],
    },
    thesis: {
      label: '01 / PRINCIPIO',
      title: 'No diseñamos una web y luego añadimos herramientas.',
      accent: 'Diseñamos la capa digital completa.',
      body: 'Cada negocio necesita una combinación distinta. A veces basta una presencia excelente. Otras veces el valor aparece al conectar esa presencia con reservas, clientes, operaciones o software propio.',
    },
    capabilities: {
      label: '02 / CAPACIDADES',
      title: 'Construimos solo lo que',
      accent: 'tiene una razón clara para existir.',
      items: [
        { no: '01', name: 'Brand & Web', short: 'La parte pública.', body: 'Dirección digital, diseño, contenido, experiencia, rendimiento y conversión para que la presencia esté a la altura del negocio.', details: ['Web premium', 'Dirección visual', 'Contenido', 'SEO técnico'] },
        { no: '02', name: 'Booking & Conversion', short: 'De interés a acción.', body: 'Reservas, solicitudes, disponibilidad y procesos de conversión diseñados para eliminar fricción y trabajo manual.', details: ['Reservas', 'Solicitudes', 'Disponibilidad', 'Confirmaciones'] },
        { no: '03', name: 'Control & CRM', short: 'La parte operativa.', body: 'Clientes, recursos, reservas, estados y flujos de trabajo reunidos en un entorno diseñado alrededor de cómo funciona el negocio.', details: ['Clientes', 'Operaciones', 'Recursos', 'Reporting'] },
        { no: '04', name: 'Software & Automation', short: 'Cuando lo genérico deja de servir.', body: 'Software a medida, integraciones y automatización cuando existe una ventaja real en construir una herramienta propia.', details: ['Software a medida', 'Integraciones', 'Automatización', 'Datos'] },
      ],
    },
    lab: {
      label: '03 / CONCEPT LAB',
      title: 'Sin portfolio inventado.',
      accent: 'Demostramos capacidad con sistemas conceptuales.',
      body: 'Hasta que existan casos reales suficientes, preferimos enseñar cómo pensamos un negocio antes que fingir experiencia que todavía no tenemos.',
      concepts: [
        { sector: 'HOSPITALITY', flow: ['Descubrir', 'Reservar', 'Llegar', 'Servir', 'Volver'], line: 'Web → Reservas → Cliente → Operación' },
        { sector: 'PREMIUM MOBILITY', flow: ['Explorar', 'Consultar', 'Validar', 'Entregar', 'Retener'], line: 'Catálogo → Disponibilidad → Lead → Cliente' },
        { sector: 'PROPERTY', flow: ['Descubrir', 'Filtrar', 'Consultar', 'Visitar', 'Seguir'], line: 'Inventario → Lead → CRM → Seguimiento' },
      ],
      disclaimer: 'Concepto Archic · No trabajo de cliente',
    },
    standard: {
      label: '04 / ESTÁNDAR',
      title: 'La calidad no se añade al final.',
      accent: 'Se decide desde el principio.',
      points: ['Claridad antes que ruido', 'Sistema antes que parche', 'Detalle sin decoración vacía', 'Tecnología solo cuando aporta valor'],
    },
    contact: {
      label: '05 / START A PROJECT',
      title: '¿Qué debería hacer mejor',
      accent: 'la parte digital de tu negocio?',
      body: 'Cuéntanos qué tienes hoy, qué no funciona y qué quieres conseguir. Empezamos por el problema, no por una lista de servicios.',
      cta: 'Escribir a Archic',
    },
  },
  en: {
    meta: {
      title: 'Archic — The digital layer of exceptional businesses',
      description: 'We design premium websites, operational systems and custom software as one digital layer around the business.',
    },
    hero: {
      kicker: 'ARCHIC / DIGITAL LAYER STUDIO',
      title: 'Your business already has an identity.',
      accent: 'We make its digital side live up to it.',
      body: 'Web, bookings, operations and custom software — conceived as one system when the business actually needs it.',
      cta: 'Start a project',
      secondary: 'Explore the system',
      public: 'What customers see',
      publicItems: ['Digital brand', 'Website', 'Bookings', 'Conversion'],
      ops: 'What the business uses',
      opsItems: ['Customers', 'Operations', 'Automation', 'Software'],
    },
    thesis: {
      label: '01 / PRINCIPLE',
      title: 'We do not design a website and bolt tools onto it later.',
      accent: 'We design the whole digital layer.',
      body: 'Every business needs a different combination. Sometimes an excellent public presence is enough. Other times the value comes from connecting that presence to bookings, customers, operations or proprietary software.',
    },
    capabilities: {
      label: '02 / CAPABILITIES',
      title: 'We only build what has',
      accent: 'a clear reason to exist.',
      items: [
        { no: '01', name: 'Brand & Web', short: 'The public layer.', body: 'Digital direction, design, content, experience, performance and conversion so the public presence matches the business.', details: ['Premium web', 'Visual direction', 'Content', 'Technical SEO'] },
        { no: '02', name: 'Booking & Conversion', short: 'From interest to action.', body: 'Bookings, enquiries, availability and conversion flows designed to remove friction and manual work.', details: ['Bookings', 'Enquiries', 'Availability', 'Confirmations'] },
        { no: '03', name: 'Control & CRM', short: 'The operating layer.', body: 'Customers, resources, bookings, states and workflows in one environment designed around how the business actually runs.', details: ['Customers', 'Operations', 'Resources', 'Reporting'] },
        { no: '04', name: 'Software & Automation', short: 'When generic stops being enough.', body: 'Custom software, integrations and automation when there is a real advantage in owning the tool.', details: ['Custom software', 'Integrations', 'Automation', 'Data'] },
      ],
    },
    lab: {
      label: '03 / CONCEPT LAB',
      title: 'No invented portfolio.',
      accent: 'We demonstrate capability through concept systems.',
      body: 'Until enough real case studies exist, we would rather show how we think about a business than pretend we have experience we do not yet have.',
      concepts: [
        { sector: 'HOSPITALITY', flow: ['Discover', 'Book', 'Arrive', 'Serve', 'Return'], line: 'Web → Bookings → Customer → Operations' },
        { sector: 'PREMIUM MOBILITY', flow: ['Browse', 'Enquire', 'Validate', 'Handover', 'Retain'], line: 'Catalogue → Availability → Lead → Customer' },
        { sector: 'PROPERTY', flow: ['Discover', 'Filter', 'Enquire', 'Visit', 'Follow up'], line: 'Inventory → Lead → CRM → Follow-up' },
      ],
      disclaimer: 'Archic concept · Not client work',
    },
    standard: {
      label: '04 / STANDARD',
      title: 'Quality is not added at the end.',
      accent: 'It is decided from the beginning.',
      points: ['Clarity before noise', 'System before patchwork', 'Detail without empty decoration', 'Technology only when it creates value'],
    },
    contact: {
      label: '05 / START A PROJECT',
      title: 'What should the digital side',
      accent: 'of your business do better?',
      body: 'Tell us what you have today, what is not working and what you want to achieve. We start with the problem, not a service list.',
      cta: 'Write to Archic',
    },
  },
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-v4-reveal]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

export default function ArchicHome() {
  const { lang } = useLang()
  const c = COPY[lang]
  const [active, setActive] = useState(0)
  const canonicalUrl = homeCanonical(lang)
  const structuredData = buildHomeGraph(lang)
  useReveal()

  return (
    <>
      <Helmet htmlAttributes={{ lang }}>
        <title>{c.meta.title}</title>
        <meta name="description" content={c.meta.description} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/" />
        <meta property="og:title" content={c.meta.title} />
        <meta property="og:description" content={c.meta.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="v4" id="top">
        <StudioHeader />

        <section className="v4-hero">
          <div className="v4-hero-copy">
            <p className="v4-kicker">{c.hero.kicker}</p>
            <h1>{c.hero.title}<br /><span>{c.hero.accent}</span></h1>
            <p className="v4-hero-body">{c.hero.body}</p>
            <div className="v4-actions">
              <a className="v4-btn" href="#contact">{c.hero.cta}<span>↗</span></a>
              <a className="v4-link" href="#capabilities">{c.hero.secondary}<span>↓</span></a>
            </div>
          </div>

          <div className="v4-layer" aria-label="Archic digital layer model">
            <div className="v4-layer-head"><span>ARCHIC / DIGITAL LAYER</span><span>01 — 08.26</span></div>
            <div className="v4-layer-half v4-layer-public"><div><p>{c.hero.public}</p>{c.hero.publicItems.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div></div>
            <div className="v4-layer-axis"><span className="v4-layer-line" /><span className="v4-layer-mark"><img src="/brand/archic-mark-dark.svg" alt="" /></span><span className="v4-layer-line" /></div>
            <div className="v4-layer-half v4-layer-ops"><div><p>{c.hero.ops}</p>{c.hero.opsItems.map((item, index) => <span key={item}><b>0{index + 5}</b>{item}</span>)}</div></div>
            <div className="v4-layer-foot"><span>VISIBLE</span><span>CONNECTED</span><span>OPERATING</span></div>
          </div>
        </section>

        <section className="v4-thesis" id="studio">
          <p className="v4-label">{c.thesis.label}</p>
          <div data-v4-reveal><h2>{c.thesis.title}<br /><span>{c.thesis.accent}</span></h2></div>
          <p className="v4-thesis-body" data-v4-reveal>{c.thesis.body}</p>
        </section>

        <section className="v4-capabilities" id="capabilities">
          <header className="v4-section-head">
            <p className="v4-label">{c.capabilities.label}</p>
            <h2>{c.capabilities.title}<br /><span>{c.capabilities.accent}</span></h2>
          </header>
          <div className="v4-cap-grid">
            <div className="v4-cap-list">
              {c.capabilities.items.map((item, index) => (
                <button key={item.no} type="button" className={`v4-cap-row ${active === index ? 'is-active' : ''}`} onClick={() => setActive(index)} aria-pressed={active === index}>
                  <span>{item.no}</span><strong>{item.name}</strong><small>{item.short}</small><i>↗</i>
                </button>
              ))}
            </div>
            <article className="v4-cap-detail" data-v4-reveal>
              <div className="v4-cap-detail-top"><span>{c.capabilities.items[active].no}</span><span>CAPABILITY</span></div>
              <h3>{c.capabilities.items[active].name}</h3>
              <p>{c.capabilities.items[active].body}</p>
              <div className="v4-cap-tags">{c.capabilities.items[active].details.map((detail) => <span key={detail}>{detail}</span>)}</div>
            </article>
          </div>
        </section>

        <section className="v4-lab" id="concepts">
          <header className="v4-section-head v4-section-head-dark">
            <p className="v4-label">{c.lab.label}</p>
            <div><h2>{c.lab.title}<br /><span>{c.lab.accent}</span></h2><p>{c.lab.body}</p></div>
          </header>
          <div className="v4-concepts">
            {c.lab.concepts.map((concept, conceptIndex) => (
              <article className="v4-concept" key={concept.sector} data-v4-reveal>
                <div className="v4-concept-top"><span>0{conceptIndex + 1}</span><span>{concept.sector}</span><span>{c.lab.disclaimer}</span></div>
                <div className="v4-flow">
                  {concept.flow.map((step, index) => <div className="v4-flow-step" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < concept.flow.length - 1 && <i>→</i>}</div>)}
                </div>
                <p>{concept.line}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="v4-standard">
          <div className="v4-standard-mark"><img src="/brand/archic-mark-dark.svg" alt="" /></div>
          <div><p className="v4-label">{c.standard.label}</p><h2>{c.standard.title}<br /><span>{c.standard.accent}</span></h2></div>
          <ol>{c.standard.points.map((point, index) => <li key={point}><span>0{index + 1}</span>{point}</li>)}</ol>
        </section>

        <section className="v4-contact" id="contact">
          <p className="v4-label">{c.contact.label}</p>
          <h2>{c.contact.title}<br /><span>{c.contact.accent}</span></h2>
          <div className="v4-contact-bottom"><p>{c.contact.body}</p><a href={`mailto:${CONTACT_MAIL}`}>{c.contact.cta}<span>↗</span></a></div>
        </section>

        <StudioFooter />
      </div>
    </>
  )
}
