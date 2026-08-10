import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_MAIL } from '../i18n/content'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioContact from '../components/StudioContact'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'

const COPY = {
  es: {
    meta: {
      title: 'Archic — La parte digital de negocios excepcionales',
      description: 'Diseño, desarrollo y software a medida para negocios que necesitan una presencia y unos sistemas digitales a la altura.',
    },
    hero: {
      eyebrow: 'ARCHIC / DIGITAL SYSTEMS STUDIO',
      titleA: 'La parte digital de',
      titleB: 'negocios excepcionales.',
      lead: 'Diseñamos y desarrollamos webs, sistemas y software a medida para negocios donde la experiencia, la imagen y la operación importan de verdad.',
      primary: 'Hablar con Archic',
      secondary: 'Ver qué hacemos',
      meta: ['Strategy', 'Design', 'Development', 'Software'],
      location: 'España · Trabajamos en remoto y presencial',
    },
    premise: {
      index: '01 / IDEA',
      title: 'Lo que ve el cliente.',
      title2: 'Lo que hace funcionar el negocio.',
      body: 'No tratamos la web, las reservas, la gestión o el software como piezas aisladas. Diseñamos la capa digital que necesita el negocio y hacemos que cada pieza tenga un propósito claro.',
      note: 'Una buena solución digital no añade complejidad. La elimina.',
    },
    pillars: [
      { no: '01', name: 'Experience', title: 'Presencia que está a la altura del negocio.', text: 'Web, dirección digital, interacción, contenido y conversión. Nada de plantillas maquilladas.' },
      { no: '02', name: 'Operations', title: 'Herramientas que simplifican el día a día.', text: 'Reservas, clientes, recursos, flujos de trabajo y paneles diseñados alrededor de cómo opera el negocio.' },
      { no: '03', name: 'Software', title: 'Tecnología cuando una herramienta genérica ya no basta.', text: 'Software a medida, integraciones, automatizaciones y sistemas propios cuando existe una razón real para construirlos.' },
    ],
    work: {
      index: '02 / QUÉ CONSTRUIMOS',
      title: 'No vendemos un paquete.',
      title2: 'Construimos lo que aporta valor.',
      items: [
        ['01', 'Premium websites', 'Marca digital, experiencia, rendimiento y conversión.'],
        ['02', 'Bookings & enquiries', 'Reservas, solicitudes, disponibilidad y captación sin fricción.'],
        ['03', 'Control systems', 'Clientes, recursos, operaciones y visibilidad en un mismo entorno.'],
        ['04', 'Custom software', 'Herramientas internas y productos digitales construidos a medida.'],
        ['05', 'Integrations & automation', 'Conectamos sistemas y eliminamos trabajo repetitivo cuando tiene sentido.'],
      ],
    },
    statement: {
      small: 'OUR STANDARD',
      title: 'La calidad no es un efecto visual.',
      title2: 'Es no aceptar decisiones mediocres.',
      side: 'Claridad · Precisión · Intención · Durabilidad',
    },
    approach: {
      index: '03 / ENFOQUE',
      title: 'Entender antes de diseñar.',
      title2: 'Diseñar antes de construir.',
      lead: 'La tecnología viene después del problema. Empezamos por entender qué necesita mejorar el negocio y elegimos la solución más simple que pueda hacerlo bien.',
      steps: [
        ['01', 'Discover', 'Negocio, cliente, operación y objetivos. Definimos el problema real.'],
        ['02', 'Design & Build', 'Dirección, experiencia y desarrollo tratados como una sola disciplina.'],
        ['03', 'Evolve', 'Medimos, corregimos y ampliamos solo cuando la siguiente capa aporta valor.'],
      ],
    },
    sectors: {
      index: '04 / SECTORES',
      title: 'Negocios donde la experiencia',
      title2: 'forma parte del producto.',
      items: [
        ['Hospitality', 'Reservas · Experiencia · Operación'],
        ['Automotive', 'Presentación · Demanda · Gestión'],
        ['Real Estate', 'Inventario · Leads · Áreas privadas'],
        ['Yachting', 'Charter · Leads · Operación'],
        ['Premium Services', 'Marca · Conversión · Sistemas'],
      ],
      note: 'No estamos limitados a un sector. Nos interesan los negocios donde una mejor capa digital puede cambiar de forma visible la experiencia o la operación.',
    },
    contact: {
      index: '05 / START',
      title: 'Construyamos algo',
      title2: 'que merezca existir.',
      body: 'Cuéntanos qué negocio tienes, qué está fallando o qué quieres construir. La primera conversación sirve para decidir si Archic puede aportar valor y por dónde empezar.',
      mail: 'O escríbenos directamente',
    },
  },
  en: {
    meta: {
      title: 'Archic — The digital side of exceptional businesses',
      description: 'Design, development and custom software for businesses that need a digital presence and systems to match their standard.',
    },
    hero: {
      eyebrow: 'ARCHIC / DIGITAL SYSTEMS STUDIO',
      titleA: 'The digital side of',
      titleB: 'exceptional businesses.',
      lead: 'We design and build websites, systems and custom software for businesses where experience, image and operations genuinely matter.',
      primary: 'Talk to Archic',
      secondary: 'See what we do',
      meta: ['Strategy', 'Design', 'Development', 'Software'],
      location: 'Spain · Remote and on-site',
    },
    premise: {
      index: '01 / IDEA',
      title: 'What the customer sees.',
      title2: 'What makes the business run.',
      body: 'We do not treat the website, bookings, management or software as isolated pieces. We design the digital layer the business actually needs and give every part a clear purpose.',
      note: 'A good digital solution does not add complexity. It removes it.',
    },
    pillars: [
      { no: '01', name: 'Experience', title: 'A presence that matches the business.', text: 'Web, digital direction, interaction, content and conversion. No dressed-up templates.' },
      { no: '02', name: 'Operations', title: 'Tools that simplify daily work.', text: 'Bookings, customers, resources, workflows and control designed around how the business operates.' },
      { no: '03', name: 'Software', title: 'Technology when generic tools are no longer enough.', text: 'Custom software, integrations, automation and proprietary systems when there is a real reason to build them.' },
    ],
    work: {
      index: '02 / WHAT WE BUILD',
      title: 'We do not sell a package.',
      title2: 'We build what creates value.',
      items: [
        ['01', 'Premium websites', 'Digital brand, experience, performance and conversion.'],
        ['02', 'Bookings & enquiries', 'Reservations, requests, availability and frictionless capture.'],
        ['03', 'Control systems', 'Customers, resources, operations and visibility in one environment.'],
        ['04', 'Custom software', 'Internal tools and digital products built around the business.'],
        ['05', 'Integrations & automation', 'We connect systems and remove repetitive work where it makes sense.'],
      ],
    },
    statement: {
      small: 'OUR STANDARD',
      title: 'Quality is not a visual effect.',
      title2: 'It is refusing weak decisions.',
      side: 'Clarity · Precision · Intent · Endurance',
    },
    approach: {
      index: '03 / APPROACH',
      title: 'Understand before designing.',
      title2: 'Design before building.',
      lead: 'Technology comes after the problem. We begin by understanding what the business needs to improve and choose the simplest solution capable of doing it well.',
      steps: [
        ['01', 'Discover', 'Business, customer, operation and goals. We define the real problem.'],
        ['02', 'Design & Build', 'Direction, experience and development treated as one discipline.'],
        ['03', 'Evolve', 'We measure, correct and expand only when the next layer creates value.'],
      ],
    },
    sectors: {
      index: '04 / SECTORS',
      title: 'Businesses where experience',
      title2: 'is part of the product.',
      items: [
        ['Hospitality', 'Bookings · Experience · Operations'],
        ['Automotive', 'Presentation · Demand · Management'],
        ['Real Estate', 'Inventory · Leads · Private areas'],
        ['Yachting', 'Charter · Leads · Operations'],
        ['Premium Services', 'Brand · Conversion · Systems'],
      ],
      note: 'We are not limited to one industry. We care about businesses where a better digital layer can visibly improve the experience or the operation.',
    },
    contact: {
      index: '05 / START',
      title: 'Let’s build something',
      title2: 'worth existing.',
      body: 'Tell us what business you run, what is not working or what you want to build. The first conversation is simply to decide whether Archic can create value and where to begin.',
      mail: 'Or write to us directly',
    },
  },
}

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-ax-reveal]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function ArchicHome() {
  const { lang } = useLang()
  const c = COPY[lang]
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

      <div className="ax" id="top">
        <StudioHeader />

        <section className="ax-hero">
          <div className="ax-hero-lines" aria-hidden="true" />
          <div className="ax-hero-copy">
            <p className="ax-eyebrow">{c.hero.eyebrow}</p>
            <h1>{c.hero.titleA}<br /><span>{c.hero.titleB}</span></h1>
            <p className="ax-lead">{c.hero.lead}</p>
            <div className="ax-actions">
              <a className="ax-primary" href="#contact">{c.hero.primary}</a>
              <a className="ax-secondary" href="#work">{c.hero.secondary}<span>↓</span></a>
            </div>
          </div>

          <div className="ax-hero-mark" aria-hidden="true">
            <div className="ax-ring ax-ring-a" />
            <div className="ax-ring ax-ring-b" />
            <div className="ax-mark-glow" />
            <img src="/brand/archic-mark-light.svg" alt="" width={459} height={412} />
            <div className="ax-mark-caption"><span>ARCHIC</span><span>EST. 2026</span></div>
          </div>

          <div className="ax-hero-meta">
            <span>{c.hero.location}</span>
            <span>{c.hero.meta.join(' · ')}</span>
          </div>
        </section>

        <section className="ax-premise ax-light" id="studio">
          <div className="ax-section-index">{c.premise.index}</div>
          <div className="ax-premise-title" data-ax-reveal>
            <h2>{c.premise.title}<br /><span>{c.premise.title2}</span></h2>
          </div>
          <div className="ax-premise-copy" data-ax-reveal>
            <p>{c.premise.body}</p>
            <p className="ax-rule-note">{c.premise.note}</p>
          </div>
        </section>

        <section className="ax-pillars ax-light">
          {c.pillars.map((pillar) => (
            <article key={pillar.no} className="ax-pillar" data-ax-reveal>
              <div className="ax-pillar-top"><span>{pillar.no}</span><span>{pillar.name}</span></div>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </section>

        <section className="ax-work" id="work">
          <div className="ax-work-head">
            <span className="ax-section-index">{c.work.index}</span>
            <h2>{c.work.title}<br /><span>{c.work.title2}</span></h2>
          </div>
          <div className="ax-service-list">
            {c.work.items.map(([no, name, desc]) => (
              <article className="ax-service" key={no} data-ax-reveal>
                <span className="ax-service-no">{no}</span>
                <h3>{name}</h3>
                <p>{desc}</p>
                <span className="ax-service-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="ax-statement">
          <div className="ax-statement-mark"><img src="/brand/archic-mark-dark.svg" alt="" /></div>
          <div className="ax-statement-copy" data-ax-reveal>
            <p>{c.statement.small}</p>
            <h2>{c.statement.title}<br /><span>{c.statement.title2}</span></h2>
          </div>
          <p className="ax-statement-side">{c.statement.side}</p>
        </section>

        <section className="ax-approach ax-light" id="approach">
          <div className="ax-approach-head">
            <span className="ax-section-index">{c.approach.index}</span>
            <h2>{c.approach.title}<br /><span>{c.approach.title2}</span></h2>
            <p>{c.approach.lead}</p>
          </div>
          <div className="ax-steps">
            {c.approach.steps.map(([no, name, desc]) => (
              <article key={no} className="ax-step" data-ax-reveal>
                <span>{no}</span>
                <h3>{name}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ax-sectors" id="sectors">
          <div className="ax-sectors-head">
            <span className="ax-section-index">{c.sectors.index}</span>
            <h2>{c.sectors.title}<br /><span>{c.sectors.title2}</span></h2>
          </div>
          <div className="ax-sector-list">
            {c.sectors.items.map(([name, line], index) => (
              <div className="ax-sector" key={name} data-ax-reveal>
                <span>0{index + 1}</span><strong>{name}</strong><small>{line}</small>
              </div>
            ))}
          </div>
          <p className="ax-sector-note">{c.sectors.note}</p>
        </section>

        <section className="ax-contact ax-light" id="contact">
          <div className="ax-contact-head">
            <span className="ax-section-index">{c.contact.index}</span>
            <h2>{c.contact.title}<br /><span>{c.contact.title2}</span></h2>
          </div>
          <div className="ax-contact-grid">
            <div className="ax-contact-intro">
              <p>{c.contact.body}</p>
              <span>{c.contact.mail}</span>
              <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}<b>↗</b></a>
            </div>
            <StudioContact />
          </div>
        </section>

        <StudioFooter />
      </div>
    </>
  )
}
