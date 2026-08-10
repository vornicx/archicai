import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioContact from '../components/StudioContact'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'

const PRESENCE_IMAGE = 'https://images.pexels.com/photos/31080809/pexels-photo-31080809/free-photo-of-elegant-luxury-hotel-lobby-with-warm-ambiance.jpeg?auto=compress&dpr=1&h=750&w=1260'

const COPY = {
  es: {
    meta: {
      title: 'Archic — Sistemas digitales para negocios excepcionales',
      description: 'Dirección digital, webs premium, operaciones y software a medida para negocios con un estándar alto.',
    },
    hero: {
      eyebrow: 'ARCHIC — DIGITAL SYSTEMS',
      title: 'Sistemas digitales para',
      accent: 'negocios excepcionales.',
      body: 'Diseñamos experiencias, sistemas y software para negocios que entienden que la calidad también se percibe en una pantalla.',
      primary: 'Empezar proyecto',
      secondary: 'Descubrir Archic',
      chapters: ['Presence', 'Control', 'Business'],
    },
    pulse: ['PRESENCE', 'CRAFT', 'CONTROL', 'TASTE', 'SOFTWARE', 'PRECISION'],
    intro: {
      eyebrow: 'THE ARCHIC STANDARD',
      title: 'Una marca de nivel',
      accent: 'debe sentirse viva.',
      body: 'No queremos una web correcta. Queremos que cada contacto digital tenga intención, carácter y una sensación reconocible. Que la tecnología desaparezca detrás de una experiencia que simplemente se siente bien.',
    },
    emotion: {
      eyebrow: 'DESIGNED TO BE FELT',
      title: 'La calidad se entiende.',
      accent: 'El carácter se recuerda.',
      body: 'Una buena experiencia digital no solo informa. Marca el ritmo, genera confianza y hace que el negocio se sienta más valioso antes incluso de hablar con alguien.',
      notes: [
        ['01', 'Presencia', 'Una identidad digital que no podría pertenecer a otro negocio.'],
        ['02', 'Ritmo', 'Movimiento y jerarquía para guiar sin distraer.'],
        ['03', 'Detalle', 'Microdecisiones que convierten una interfaz en una experiencia.'],
      ],
    },
    presence: {
      label: 'ARCHIC PRESENCE',
      title: 'La primera impresión',
      accent: 'debe tener carácter.',
      body: 'Dirección visual, web, contenido, rendimiento y conversión tratados como una sola experiencia. No diseñamos páginas: diseñamos cómo se siente descubrir el negocio.',
      chips: ['Web premium', 'Dirección digital', 'Contenido', 'SEO técnico'],
      concept: 'CONCEPTO ARCHIC · NO ES TRABAJO DE CLIENTE',
      visualTitle: 'Presencia que cambia la percepción.',
      visualBody: 'Fotografía, dirección, ritmo y conversión trabajando como una sola pieza.',
    },
    control: {
      label: 'ARCHIC CONTROL',
      title: 'La calidad también vive',
      accent: 'detrás de la experiencia.',
      body: 'Reservas, clientes, recursos y operaciones reunidos en un entorno preciso y rápido. El cliente ve simplicidad porque el sistema hace el trabajo difícil por detrás.',
      items: [
        ['01', 'Clientes', 'Historial, contexto y seguimiento'],
        ['02', 'Operaciones', 'Estados, reservas y flujos de trabajo'],
        ['03', 'Visibilidad', 'Lo importante, claro y en tiempo real'],
      ],
    },
    business: {
      label: 'ARCHIC BUSINESS',
      title: 'Tecnología propia cuando',
      accent: 'la diferencia lo justifica.',
      body: 'Software, automatización e integraciones para convertir procesos dispersos en una ventaja operativa que se pueda sentir todos los días.',
      layers: [
        ['01', 'Integraciones', 'Conectamos lo que ya funciona.'],
        ['02', 'Automatización', 'Eliminamos trabajo repetitivo.'],
        ['03', 'Datos', 'Convertimos actividad en visibilidad.'],
        ['04', 'Software a medida', 'Construimos cuando comprar ya no basta.'],
      ],
    },
    standard: {
      eyebrow: 'QUIET LUXURY / DIGITAL CRAFT',
      title: 'Menos ruido.',
      accent: 'Más intención.',
      body: 'El lujo digital no consiste en llenar la pantalla. Consiste en saber qué merece estar ahí, cómo debe moverse y cuándo tiene que desaparecer.',
    },
    capabilities: {
      eyebrow: 'CAPACIDADES',
      title: 'Una disciplina. Distintas capas.',
      body: 'Entramos por la necesidad que más valor pueda crear hoy y dejamos una base capaz de evolucionar mañana sin perder coherencia.',
      items: [
        ['01', 'Web & Brand', 'Presencia, experiencia, rendimiento y conversión.'],
        ['02', 'Bookings', 'Reservas, solicitudes, disponibilidad y confirmaciones.'],
        ['03', 'Control & CRM', 'Clientes, recursos, operaciones y reporting.'],
        ['04', 'Software', 'Integraciones, automatización y herramientas a medida.'],
      ],
    },
    fit: {
      eyebrow: 'A GOOD FIT',
      title: 'Archic tiene sentido cuando',
      accent: 'lo digital importa de verdad.',
      body: 'Cuando percepción, operación o software influyen directamente en cómo se vende, se trabaja o se escala.',
      note: 'Encajamos mejor cuando la calidad y el resultado pesan más que encontrar la opción más barata.',
      items: [
        ['01', 'Percepción', 'Tu marca necesita transmitir el mismo nivel online que fuera de la pantalla.'],
        ['02', 'Operación', 'Reservas, leads, clientes o procesos ya no deberían vivir en herramientas desconectadas.'],
        ['03', 'Ambición', 'Buscas una base digital que pueda crecer contigo, no una solución para salir del paso.'],
      ],
      processEyebrow: 'HOW IT STARTS',
      processTitle: 'Una buena colaboración empieza',
      processAccent: 'con una buena conversación.',
      processBody: 'No empezamos enseñándote un paquete cerrado. Primero entendemos el negocio y decidimos dónde una intervención digital puede cambiar realmente el resultado.',
      steps: [
        ['01', 'Contexto', 'Nos cuentas dónde estás, qué te frena y qué debería cambiar.'],
        ['02', 'Dirección', 'Definimos qué merece construirse y qué sería simplemente ruido.'],
        ['03', 'Ejecución', 'Diseño y desarrollo avanzan bajo una única dirección.'],
        ['04', 'Evolución', 'Mantenemos y ampliamos cuando seguir construyendo aporta valor.'],
      ],
    },
    sectors: ['Hospitality', 'Automotive', 'Yachting', 'Real Estate', 'Premium Services'],
    closing: {
      eyebrow: 'PRIVATE PROJECT ENQUIRY',
      title: 'Cuéntanos qué',
      accent: 'merece ser mejor.',
      body: 'No necesitas preparar un briefing perfecto. Con contexto suficiente podemos saber si Archic puede aportar valor real y cuál debería ser el siguiente paso.',
      prompts: ['Qué negocio es', 'Qué quieres mejorar', 'Qué resultado esperas'],
      note: 'Sin llamada comercial preparada. Primero entendemos el proyecto.',
    },
  },
  en: {
    meta: {
      title: 'Archic — Digital systems for exceptional businesses',
      description: 'Digital direction, premium websites, operations and custom software for businesses with a high standard.',
    },
    hero: {
      eyebrow: 'ARCHIC — DIGITAL SYSTEMS',
      title: 'Digital systems for',
      accent: 'exceptional businesses.',
      body: 'We design experiences, systems and software for businesses that understand quality is felt on a screen too.',
      primary: 'Start a project',
      secondary: 'Discover Archic',
      chapters: ['Presence', 'Control', 'Business'],
    },
    pulse: ['PRESENCE', 'CRAFT', 'CONTROL', 'TASTE', 'SOFTWARE', 'PRECISION'],
    intro: {
      eyebrow: 'THE ARCHIC STANDARD',
      title: 'A high-level brand',
      accent: 'should feel alive.',
      body: 'We are not looking for a merely correct website. Every digital touchpoint should have intent, character and a recognisable feeling. Technology should disappear behind an experience that simply feels right.',
    },
    emotion: {
      eyebrow: 'DESIGNED TO BE FELT',
      title: 'Quality is understood.',
      accent: 'Character is remembered.',
      body: 'A strong digital experience does more than inform. It sets the rhythm, creates trust and makes the business feel more valuable before a conversation even begins.',
      notes: [
        ['01', 'Presence', 'A digital identity that could not belong to another business.'],
        ['02', 'Rhythm', 'Motion and hierarchy that guide without distracting.'],
        ['03', 'Detail', 'Micro-decisions that turn an interface into an experience.'],
      ],
    },
    presence: {
      label: 'ARCHIC PRESENCE',
      title: 'The first impression',
      accent: 'should have character.',
      body: 'Visual direction, web, content, performance and conversion treated as one experience. We do not design pages; we design what discovering the business feels like.',
      chips: ['Premium web', 'Digital direction', 'Content', 'Technical SEO'],
      concept: 'ARCHIC CONCEPT · NOT CLIENT WORK',
      visualTitle: 'Presence that changes perception.',
      visualBody: 'Photography, direction, rhythm and conversion working as one piece.',
    },
    control: {
      label: 'ARCHIC CONTROL',
      title: 'Quality also lives',
      accent: 'behind the experience.',
      body: 'Bookings, customers, resources and operations in one precise, fast environment. The customer sees simplicity because the system handles complexity behind it.',
      items: [
        ['01', 'Customers', 'History, context and follow-up'],
        ['02', 'Operations', 'States, bookings and workflows'],
        ['03', 'Visibility', 'What matters, clear and real-time'],
      ],
    },
    business: {
      label: 'ARCHIC BUSINESS',
      title: 'Proprietary technology when',
      accent: 'the difference justifies it.',
      body: 'Software, automation and integrations that turn scattered processes into an operating advantage you can feel every day.',
      layers: [
        ['01', 'Integrations', 'Connect what already works.'],
        ['02', 'Automation', 'Remove repetitive work.'],
        ['03', 'Data', 'Turn activity into visibility.'],
        ['04', 'Custom software', 'Build when buying is no longer enough.'],
      ],
    },
    standard: {
      eyebrow: 'QUIET LUXURY / DIGITAL CRAFT',
      title: 'Less noise.',
      accent: 'More intent.',
      body: 'Digital luxury is not about filling the screen. It is knowing what deserves to be there, how it should move and when it should disappear.',
    },
    capabilities: {
      eyebrow: 'CAPABILITIES',
      title: 'One discipline. Different layers.',
      body: 'We begin with the need that can create the most value today and leave a foundation that can evolve tomorrow without losing coherence.',
      items: [
        ['01', 'Web & Brand', 'Presence, experience, performance and conversion.'],
        ['02', 'Bookings', 'Reservations, enquiries, availability and confirmations.'],
        ['03', 'Control & CRM', 'Customers, resources, operations and reporting.'],
        ['04', 'Software', 'Integrations, automation and custom tools.'],
      ],
    },
    fit: {
      eyebrow: 'A GOOD FIT',
      title: 'Archic makes sense when',
      accent: 'digital genuinely matters.',
      body: 'When perception, operations or software directly influence how the business sells, works or scales.',
      note: 'We are a better fit when quality and outcome matter more than simply finding the cheapest option.',
      items: [
        ['01', 'Perception', 'Your brand needs to communicate the same standard online that it does off-screen.'],
        ['02', 'Operations', 'Bookings, leads, customers or processes should no longer live across disconnected tools.'],
        ['03', 'Ambition', 'You want a digital foundation that can grow with the business, not a temporary fix.'],
      ],
      processEyebrow: 'HOW IT STARTS',
      processTitle: 'A strong collaboration starts',
      processAccent: 'with a strong conversation.',
      processBody: 'We do not begin by showing you a fixed package. First we understand the business and decide where a digital intervention can genuinely change the outcome.',
      steps: [
        ['01', 'Context', 'Tell us where you are, what is holding you back and what should change.'],
        ['02', 'Direction', 'We define what deserves to be built and what would simply be noise.'],
        ['03', 'Execution', 'Design and development move under one direction.'],
        ['04', 'Evolution', 'We maintain and expand when continuing to build creates value.'],
      ],
    },
    sectors: ['Hospitality', 'Automotive', 'Yachting', 'Real Estate', 'Premium Services'],
    closing: {
      eyebrow: 'PRIVATE PROJECT ENQUIRY',
      title: 'Tell us what',
      accent: 'deserves to be better.',
      body: 'You do not need a perfect brief. With enough context we can tell whether Archic can create real value and what the next step should be.',
      prompts: ['What the business is', 'What you want to improve', 'What outcome you expect'],
      note: 'No prepared sales call. We understand the project first.',
    },
  },
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-v6-reveal]'))
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
    }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' })
    nodes.forEach((node) => observer.observe(node))
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

      <div className="v5 v6" id="top">
        <StudioHeader />

        <section className="v5-hero v6-hero">
          <div className="v6-hero-light v6-light-a" aria-hidden="true" />
          <div className="v6-hero-light v6-light-b" aria-hidden="true" />
          <div className="v5-hero-copy">
            <p className="v5-eyebrow">{c.hero.eyebrow}</p>
            <h1>{c.hero.title}<br /><span>{c.hero.accent}</span></h1>
            <p className="v5-hero-body">{c.hero.body}</p>
            <div className="v5-actions">
              <a className="v5-btn v5-btn-gold" href="#contact">{c.hero.primary}</a>
              <a className="v5-link" href="#studio">{c.hero.secondary}<span>↓</span></a>
            </div>
          </div>

          <div className="v5-hero-chapters" aria-label="Archic system">
            {c.hero.chapters.map((chapter, index) => (
              <div key={chapter}>
                <span>0{index + 1}</span>
                <strong>ARCHIC {chapter.toUpperCase()}</strong>
                <i aria-hidden="true">↗</i>
              </div>
            ))}
          </div>
        </section>

        <section className="v6-pulse" aria-hidden="true">
          <div>{[...c.pulse, ...c.pulse].map((word, index) => <span key={`${word}-${index}`}>{word}<i>◆</i></span>)}</div>
        </section>

        <section className="v5-intro" id="studio">
          <p className="v5-eyebrow v5-eyebrow-dark">{c.intro.eyebrow}</p>
          <h2 data-v6-reveal>{c.intro.title}<br /><span>{c.intro.accent}</span></h2>
          <p className="v5-intro-body" data-v6-reveal>{c.intro.body}</p>
        </section>

        <section className="v6-emotion">
          <div className="v6-emotion-copy" data-v6-reveal>
            <p className="v5-eyebrow">{c.emotion.eyebrow}</p>
            <h2>{c.emotion.title}<br /><span>{c.emotion.accent}</span></h2>
            <p>{c.emotion.body}</p>
          </div>
          <div className="v6-emotion-notes">
            {c.emotion.notes.map(([no, name, desc]) => (
              <article key={no} data-v6-reveal>
                <span>{no}</span><h3>{name}</h3><p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="v5-product-section v5-presence" id="capabilities">
          <div className="v5-product-copy" data-v6-reveal>
            <p className="v5-product-label">{c.presence.label}</p>
            <h2>{c.presence.title}<br /><span>{c.presence.accent}</span></h2>
            <p>{c.presence.body}</p>
            <div className="v5-chips">{c.presence.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
          </div>

          <div className="v5-presence-visual" data-v6-reveal>
            <div className="v5-concept-head">
              <span>ARCHIC CONCEPT 01</span>
              <span>HOSPITALITY / PRESENCE</span>
            </div>
            <div className="v6-presence-image-wrap">
              <img
                className="v6-presence-image"
                src={PRESENCE_IMAGE}
                alt={lang === 'es' ? 'Interior de hospitality de lujo usado en el concepto Archic Presence' : 'Luxury hospitality interior used in the Archic Presence concept'}
                loading="lazy"
                decoding="async"
              />
              <div className="v6-presence-meta"><span>ARCHIC / PRESENCE</span><span>01 / CONCEPT</span></div>
              <div className="v6-presence-copy">
                <span>HOSPITALITY · DIGITAL DIRECTION</span>
                <h3>{c.presence.visualTitle}</h3>
                <p>{c.presence.visualBody}</p>
              </div>
            </div>
            <div className="v5-concept-foot"><span>{c.presence.concept}</span><span>PHOTO / PEXELS · DESIGN / EXPERIENCE / CONVERSION</span></div>
          </div>
        </section>

        <section className="v5-product-section v5-control">
          <div className="v5-product-copy" data-v6-reveal>
            <p className="v5-product-label">{c.control.label}</p>
            <h2>{c.control.title}<br /><span>{c.control.accent}</span></h2>
            <p>{c.control.body}</p>
          </div>
          <div className="v5-control-visual" data-v6-reveal>
            <div className="v5-control-top"><span>ARCHIC CONTROL</span><span className="v6-live"><i /> LIVE SYSTEM</span></div>
            <div className="v6-control-signal"><span /><span /><span /><span /><span /></div>
            {c.control.items.map(([no, name, desc]) => (
              <div className="v5-control-row" key={no}>
                <span>{no}</span><strong>{name}</strong><p>{desc}</p><i>↗</i>
              </div>
            ))}
            <div className="v5-control-bottom"><span>OPERATIONS / CUSTOMERS / RESOURCES</span><span>02 / CONTROL</span></div>
          </div>
        </section>

        <section className="v5-product-section v5-business">
          <div className="v5-product-copy" data-v6-reveal>
            <p className="v5-product-label">{c.business.label}</p>
            <h2>{c.business.title}<br /><span>{c.business.accent}</span></h2>
            <p>{c.business.body}</p>
          </div>
          <div className="v5-business-visual" data-v6-reveal>
            <div className="v5-business-head"><span>ARCHIC BUSINESS</span><span>03 / SYSTEM</span></div>
            <div className="v5-business-stack">
              {c.business.layers.map(([no, name, desc]) => (
                <div className="v5-business-layer" key={no}>
                  <span>{no}</span>
                  <strong>{name}</strong>
                  <p>{desc}</p>
                  <i aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="v5-standard v6-standard">
          <p className="v5-eyebrow">{c.standard.eyebrow}</p>
          <h2 data-v6-reveal>{c.standard.title}<br /><span>{c.standard.accent}</span></h2>
          <p data-v6-reveal>{c.standard.body}</p>
          <div className="v6-standard-line" aria-hidden="true"><span /></div>
        </section>

        <section className="v5-capabilities">
          <div className="v5-cap-head">
            <div>
              <p className="v5-eyebrow v5-eyebrow-dark">{c.capabilities.eyebrow}</p>
              <h2>{c.capabilities.title}</h2>
            </div>
            <p>{c.capabilities.body}</p>
          </div>
          <div className="v5-cap-list">
            {c.capabilities.items.map(([no, name, desc]) => (
              <article key={no} data-v6-reveal>
                <span>{no}</span>
                <h3>{name}</h3>
                <p>{desc}</p>
                <i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </section>

        <section className="v7-fit" id="fit">
          <div className="v7-fit-head" data-v6-reveal>
            <p className="v5-eyebrow">{c.fit.eyebrow}</p>
            <h2>{c.fit.title}<br /><span>{c.fit.accent}</span></h2>
            <p>{c.fit.body}</p>
            <strong>{c.fit.note}</strong>
          </div>
          <div className="v7-fit-list">
            {c.fit.items.map(([no, name, desc]) => (
              <article key={no} data-v6-reveal>
                <span>{no}</span>
                <h3>{name}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>

          <div className="v7-process">
            <div className="v7-process-copy" data-v6-reveal>
              <p className="v5-eyebrow">{c.fit.processEyebrow}</p>
              <h2>{c.fit.processTitle}<br /><span>{c.fit.processAccent}</span></h2>
              <p>{c.fit.processBody}</p>
            </div>
            <div className="v7-process-steps">
              {c.fit.steps.map(([no, name, desc]) => (
                <article key={no} data-v6-reveal>
                  <span>{no}</span>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="v5-sectors v6-sectors" aria-label="Sectors">
          <div>{[...c.sectors, ...c.sectors].map((sector, index) => <span key={`${sector}-${index}`}>{sector}<i>·</i></span>)}</div>
        </section>

        <section className="v7-contact" id="contact">
          <div className="v7-contact-copy" data-v6-reveal>
            <p className="v5-eyebrow">{c.closing.eyebrow}</p>
            <h2>{c.closing.title}<br /><span>{c.closing.accent}</span></h2>
            <p className="v7-contact-body">{c.closing.body}</p>
            <div className="v7-contact-prompts">
              {c.closing.prompts.map((prompt, index) => <span key={prompt}><i>0{index + 1}</i>{prompt}</span>)}
            </div>
            <small>{c.closing.note}</small>
          </div>
          <div className="v7-project-form" data-v6-reveal>
            <div className="v7-form-head"><span>PROJECT / 01</span><span>ARCHIC · PRIVATE ENQUIRY</span></div>
            <StudioContact />
          </div>
        </section>

        <StudioFooter />
      </div>
    </>
  )
}
