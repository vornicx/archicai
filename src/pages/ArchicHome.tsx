import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'
import workRealEstate from '../assets/work-realestate.jpg'
import workBocana from '../assets/work-bocana.jpg'
import workAutomotive from '../assets/work-automotive.jpg'
import '../styles/archic-home-2026.css'

type Lang = 'es' | 'en'
type DemoId = 'hospitality' | 'mobility' | 'property'

type WorkItem = {
  name: string
  kind: string
  image: string
  href: string
  code: string
  publicLayer: string
  privateLayer: string
}

type DemoItem = {
  id: DemoId
  tab: string
  label: string
  title: string
  metric: string
  metricLabel: string
  preview: string
  href: string
}

const COPY = {
  es: {
    hero: {
      title: ['Diseñamos lo que ve tu cliente.', 'Construimos lo que mueve tu negocio.'],
      lead: 'Presencia digital, sistemas internos y software a medida diseñados como una sola capa. Dirección humana, IA supervisada y código que se entrega.',
      primary: 'Cuéntanos qué debe cambiar',
      secondary: 'Ver trabajo',
      rail: ['Dirección humana', 'IA supervisada', 'Código propio', 'QA real'],
      systemLabel: 'UN SISTEMA / TRES CAPAS',
      system: [
        ['Presence', 'Percepción + conversión'],
        ['Control', 'Operación privada'],
        ['Business', 'Software + automatización'],
      ],
    },
    work: {
      index: '01 / TRABAJO',
      title: 'No enseñamos una estética. Enseñamos lo que construiríamos.',
      body: 'Estos concept builds convierten una oportunidad de negocio en una experiencia navegable: lo público que ve el cliente y el sistema privado que utiliza el equipo.',
      concept: 'CONCEPT BUILD',
      publicLabel: 'PRESENCE',
      privateLabel: 'CONTROL / BUSINESS',
      open: 'Explorar proyecto',
    },
    system: {
      index: '02 / SISTEMA ARCHIC',
      title: 'Una web puede ser la puerta. No tiene por qué ser el sistema entero.',
      body: 'Separamos el problema en tres capas para construir solo lo necesario ahora y dejar una arquitectura que pueda crecer después.',
      lanes: [
        ['01', 'Presence', 'Lo que el mercado percibe', 'Dirección digital, web, contenido, catálogo, captación, reservas o solicitudes. Desde el primer impacto hasta la conversión.'],
        ['02', 'Control', 'Lo que el equipo necesita operar', 'Clientes, reservas, recursos, disponibilidad, estados, propietarios, contenido o cualquier flujo privado que hoy dependa de fricción manual.'],
        ['03', 'Business', 'Lo que crea ventaja operativa', 'Software a medida, automatización, integraciones y datos cuando una herramienta estándar obliga al negocio a trabajar peor.'],
      ],
      demoTitle: 'Control no es una promesa. Puedes abrirlo.',
      demoBody: 'Tres demostraciones con datos ficticios y flujos reales para mostrar el tipo de producto que construimos detrás de la presencia pública.',
      demoFlag: 'DATOS FICTICIOS / DEMO',
      demoOpen: 'Abrir demostración',
    },
    method: {
      index: '03 / MÉTODO + QUALITY STANDARD',
      title: 'El proyecto avanza por decisiones verificables.',
      body: 'No multiplicamos páginas y componentes hasta que el problema está entendido. Cada fase deja una salida revisable y el Quality Standard actúa como condición de entrega.',
      steps: [
        ['01', 'Entender', 'Negocio, cliente, operación, competencia, restricciones y señal que demostraría valor.'],
        ['02', 'Definir', 'Arquitectura, recorridos, datos, alcance y dirección visual antes de construir.'],
        ['03', 'Construir', 'Diseño y desarrollo avanzan juntos sobre producto real y navegable.'],
        ['04', 'Forzar', 'Buscamos dónde falla: mobile, flujos críticos, visual, rendimiento, accesibilidad y búsqueda.'],
        ['05', 'Mejorar', 'Publicar no cierra el sistema. Lo que ocurra en uso real decide el siguiente movimiento.'],
      ],
      qualityTitle: 'ARCHIC QUALITY STANDARD / REQUIRED',
      quality: [
        ['Mobile específico', 'La experiencia se compone para móvil; no se limita a encoger desktop.'],
        ['Recorridos críticos', 'Contacto, reserva, búsqueda, acceso o flujo principal probado de extremo a extremo.'],
        ['QA visual final', 'Se revisa el render real en desktop y móvil, no solo el código.'],
        ['Rendimiento + accesibilidad', 'Assets, fuentes, foco, teclado, contraste y reduced motion forman parte del acabado.'],
        ['Search & AI readiness', 'Metadatos, estructura, schema, sitemap, canonicals y contenido semántico cuando aportan.'],
        ['Integridad', 'Sin clientes, premios, testimonios ni métricas inventadas para hacer parecer mayor a Archic.'],
        ['Propiedad', 'Código y activos entregables, portables y sin dependencia forzada de un constructor cerrado.'],
      ],
      qualityFoot: 'Si una entrega no supera el estándar, no cuenta como terminada.',
    },
    investment: {
      index: '04 / INVERSIÓN',
      title: 'Precios de entrada claros. Alcance decidido después de entender el problema.',
      body: 'No convertimos negocios distintos en cuatro paquetes idénticos. Estos mínimos sirven para saber desde dónde empieza cada tipo de proyecto.',
      from: 'desde',
      items: [
        ['Presence', '1.200 €', 'Presencia digital premium', 'Dirección, web a medida, mobile específico, base técnica y conversión.'],
        ['Control', '2.500 €', 'Sistema privado de operación', 'Un flujo operativo concreto convertido en herramienta usable por el equipo.'],
        ['Business', '4.000 €', 'Software a medida', 'Arquitectura y desarrollo para procesos que necesitan lógica, datos o integraciones propias.'],
        ['Evolution', '150 €/mes', 'Mejora continua', 'Monitorización, correcciones y mejoras priorizadas después de lanzar.'],
      ],
      note: 'Mínimos orientativos · IVA no incluido · presupuesto final tras diagnóstico',
      cta: 'Hablar del alcance',
    },
    audit: {
      index: '05 / DIAGNÓSTICO',
      title: 'Primero encontramos qué merece cambiar.',
      body: 'No empezamos preguntando “qué web quieres”. Miramos qué ve hoy el cliente, dónde se pierde intención y qué parte de la operación está generando fricción.',
      outputs: [
        ['Señal comercial', 'Qué está fallando en percepción, claridad, confianza o conversión.'],
        ['Fricción operativa', 'Qué tareas o pasos manuales podrían resolverse mejor con producto.'],
        ['Prioridad', 'Qué construiríamos primero y qué dejaríamos fuera.'],
        ['Rango', 'Alcance, dependencias e inversión razonable antes de entrar en diseño.'],
      ],
      cta: 'Solicitar diagnóstico',
      note: 'Sin coste para proyectos con encaje. Si no somos la solución correcta, te lo diremos.',
    },
    contact: {
      index: '06 / CONTACTO',
      title: ['Cuéntanos qué debe cambiar.', 'La solución viene después.'],
      body: 'Explícanos cómo funciona el negocio, qué está frenando ventas u operación y qué resultado tendría valor. Respondemos normalmente en 24–48 h laborables.',
      primary: 'Abrir conversación',
      phone: 'Llamar',
      availability: 'Écija · Sevilla · Marbella · España / Proyectos seleccionados',
    },
  },
  en: {
    hero: {
      title: ['We design what your customer sees.', 'We build what moves your business.'],
      lead: 'Digital presence, internal systems and custom software designed as one layer. Human direction, supervised AI and code you own.',
      primary: 'Tell us what must change',
      secondary: 'View work',
      rail: ['Human direction', 'Supervised AI', 'Owned code', 'Real QA'],
      systemLabel: 'ONE SYSTEM / THREE LAYERS',
      system: [
        ['Presence', 'Perception + conversion'],
        ['Control', 'Private operations'],
        ['Business', 'Software + automation'],
      ],
    },
    work: {
      index: '01 / WORK',
      title: 'We do not show an aesthetic. We show what we would build.',
      body: 'These concept builds turn a business opportunity into a navigable experience: the public layer the customer sees and the private system the team uses.',
      concept: 'CONCEPT BUILD',
      publicLabel: 'PRESENCE',
      privateLabel: 'CONTROL / BUSINESS',
      open: 'Explore project',
    },
    system: {
      index: '02 / ARCHIC SYSTEM',
      title: 'A website can be the door. It does not have to be the whole system.',
      body: 'We separate the problem into three layers so we build only what is needed now while leaving an architecture that can grow later.',
      lanes: [
        ['01', 'Presence', 'What the market perceives', 'Digital direction, website, content, catalogue, acquisition, bookings or enquiries. From first impression to conversion.'],
        ['02', 'Control', 'What the team needs to operate', 'Customers, bookings, resources, availability, states, owners, content or any private flow still dependent on manual friction.'],
        ['03', 'Business', 'What creates operational advantage', 'Custom software, automation, integrations and data when standard tools force the business to work worse.'],
      ],
      demoTitle: 'Control is not a promise. You can open it.',
      demoBody: 'Three demonstrations with fictional data and real flows showing the kind of product we build behind the public presence.',
      demoFlag: 'FICTIONAL DATA / DEMO',
      demoOpen: 'Open demonstration',
    },
    method: {
      index: '03 / METHOD + QUALITY STANDARD',
      title: 'The project advances through verifiable decisions.',
      body: 'We do not multiply pages and components until the problem is understood. Every phase leaves a reviewable output and the Quality Standard acts as a delivery condition.',
      steps: [
        ['01', 'Understand', 'Business, customer, operation, competition, constraints and the signal that would demonstrate value.'],
        ['02', 'Define', 'Architecture, journeys, data, scope and visual direction before we build.'],
        ['03', 'Build', 'Design and development move together on the real navigable product.'],
        ['04', 'Stress', 'We look for failure: mobile, critical flows, visual quality, performance, accessibility and search.'],
        ['05', 'Improve', 'Launch does not close the system. Real usage decides the next move.'],
      ],
      qualityTitle: 'ARCHIC QUALITY STANDARD / REQUIRED',
      quality: [
        ['Mobile-specific', 'The experience is composed for mobile; desktop is not simply shrunk.'],
        ['Critical journeys', 'Contact, booking, search, access or the main flow is tested end to end.'],
        ['Final visual QA', 'The real render is reviewed on desktop and mobile, not only the code.'],
        ['Performance + accessibility', 'Assets, fonts, focus, keyboard, contrast and reduced motion are part of the finish.'],
        ['Search & AI readiness', 'Metadata, structure, schema, sitemap, canonicals and semantic content where useful.'],
        ['Integrity', 'No invented clients, awards, testimonials or metrics to make Archic look bigger.'],
        ['Ownership', 'Deliverable, portable code and assets without forced lock-in to a closed builder.'],
      ],
      qualityFoot: 'If a delivery does not pass the standard, it is not finished.',
    },
    investment: {
      index: '04 / INVESTMENT',
      title: 'Clear entry prices. Scope decided after understanding the problem.',
      body: 'We do not turn different businesses into four identical packages. These minimums show where each type of project starts.',
      from: 'from',
      items: [
        ['Presence', '€1,200', 'Premium digital presence', 'Direction, custom website, mobile-specific composition, technical base and conversion.'],
        ['Control', '€2,500', 'Private operations system', 'One concrete operational flow turned into a tool the team can actually use.'],
        ['Business', '€4,000', 'Custom software', 'Architecture and development for processes needing their own logic, data or integrations.'],
        ['Evolution', '€150/mo', 'Continuous improvement', 'Monitoring, fixes and prioritised improvements after launch.'],
      ],
      note: 'Indicative minimums · VAT not included · final quote after diagnosis',
      cta: 'Discuss scope',
    },
    audit: {
      index: '05 / DIAGNOSIS',
      title: 'First we find what is worth changing.',
      body: 'We do not start by asking “what website do you want?”. We look at what customers see today, where intent is lost and which part of the operation creates friction.',
      outputs: [
        ['Commercial signal', 'What is failing in perception, clarity, trust or conversion.'],
        ['Operational friction', 'Which tasks or manual steps could be solved better with product.'],
        ['Priority', 'What we would build first and what we would leave out.'],
        ['Range', 'Scope, dependencies and a reasonable investment before design starts.'],
      ],
      cta: 'Request a diagnosis',
      note: 'No cost for projects with fit. If we are not the right solution, we will say so.',
    },
    contact: {
      index: '06 / CONTACT',
      title: ['Tell us what must change.', 'The solution comes after.'],
      body: 'Tell us how the business works, what is slowing sales or operations and what outcome would create value. We normally reply within 24–48 business hours.',
      primary: 'Start the conversation',
      phone: 'Call',
      availability: 'Écija · Seville · Marbella · Spain / Selected projects',
    },
  },
} as const

const WORK: Record<Lang, WorkItem[]> = {
  es: [
    {
      name: 'Marbella For Sale',
      kind: 'Real estate de alta gama',
      image: workRealEstate,
      href: '/explorations/real-estate/',
      code: '01 / REAL ESTATE',
      publicLayer: 'Portfolio editorial, búsqueda, comparación y captación de enquiry.',
      privateLayer: 'Owner Studio, propiedades, leads y seguimiento en un mismo sistema.',
    },
    {
      name: 'La Bocana',
      kind: 'Hospitality / Puerto Banús',
      image: workBocana,
      href: '/explorations/hospitality/',
      code: '02 / HOSPITALITY',
      publicLayer: 'Presencia, carta, reserva y experiencia de marca conectadas.',
      privateLayer: 'Reservas, sala, clientes, disponibilidad y operación diaria.',
    },
    {
      name: 'Five Star Rentals',
      kind: 'Luxury mobility',
      image: workAutomotive,
      href: '/explorations/mobility/',
      code: '03 / MOBILITY',
      publicLayer: 'Flota, fichas, galerías y solicitud con lenguaje de producto premium.',
      privateLayer: 'Owner access, disponibilidad, ofertas y gestión de solicitudes.',
    },
  ],
  en: [
    {
      name: 'Marbella For Sale',
      kind: 'High-end real estate',
      image: workRealEstate,
      href: '/en/explorations/real-estate/',
      code: '01 / REAL ESTATE',
      publicLayer: 'Editorial portfolio, search, comparison and enquiry capture.',
      privateLayer: 'Owner Studio, properties, leads and follow-up in one system.',
    },
    {
      name: 'La Bocana',
      kind: 'Hospitality / Puerto Banús',
      image: workBocana,
      href: '/en/explorations/hospitality/',
      code: '02 / HOSPITALITY',
      publicLayer: 'Presence, menu, booking and brand experience connected.',
      privateLayer: 'Bookings, floor, customers, availability and daily operations.',
    },
    {
      name: 'Five Star Rentals',
      kind: 'Luxury mobility',
      image: workAutomotive,
      href: '/en/explorations/mobility/',
      code: '03 / MOBILITY',
      publicLayer: 'Fleet, detail pages, galleries and enquiries with premium product language.',
      privateLayer: 'Owner access, availability, offers and enquiry management.',
    },
  ],
}

const DEMOS: Record<Lang, DemoItem[]> = {
  es: [
    { id: 'hospitality', tab: 'Hospitality', label: 'RESERVAS / SALA', title: 'Servicio y ocupación en contexto.', metric: '82%', metricLabel: 'ocupación demo', preview: '/software/hospitality-preview.svg', href: '/explorations/hospitality/' },
    { id: 'mobility', tab: 'Movilidad', label: 'FLOTA / SOLICITUDES', title: 'Disponibilidad que se puede operar.', metric: '16', metricLabel: 'unidades demo', preview: '/software/mobility-preview.svg', href: '/explorations/mobility/' },
    { id: 'property', tab: 'Real estate', label: 'PORTFOLIO / CRM', title: 'Propiedades, leads y visitas conectados.', metric: '12', metricLabel: 'activos demo', preview: '/software/real-estate-preview.svg', href: '/explorations/real-estate/' },
  ],
  en: [
    { id: 'hospitality', tab: 'Hospitality', label: 'BOOKINGS / FLOOR', title: 'Service and occupancy in context.', metric: '82%', metricLabel: 'demo occupancy', preview: '/software/hospitality-preview.svg', href: '/en/explorations/hospitality/' },
    { id: 'mobility', tab: 'Mobility', label: 'FLEET / ENQUIRIES', title: 'Availability teams can operate.', metric: '16', metricLabel: 'demo units', preview: '/software/mobility-preview.svg', href: '/en/explorations/mobility/' },
    { id: 'property', tab: 'Real estate', label: 'PORTFOLIO / CRM', title: 'Properties, leads and viewings connected.', metric: '12', metricLabel: 'demo assets', preview: '/software/real-estate-preview.svg', href: '/en/explorations/real-estate/' },
  ],
}

function pagePath(lang: Lang, slug: string) {
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

function Arrow() {
  return <i className="as-arrow" aria-hidden="true" />
}

function SectionHead({ index, title, body, dark = false }: { index: string; title: string; body: string; dark?: boolean }) {
  return (
    <header className={`ah-head${dark ? ' ah-head-dark' : ''}`} data-reveal>
      <p>{index}</p>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </header>
  )
}

function ControlDemo({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0)
  const c = COPY[lang].system
  const demos = DEMOS[lang]
  const demo = demos[active]

  return (
    <div className="ah-demo" data-reveal>
      <div className="ah-demo-intro">
        <div>
          <span>ARCHIC / CONTROL</span>
          <b>{c.demoFlag}</b>
        </div>
        <h3>{c.demoTitle}</h3>
        <p>{c.demoBody}</p>
      </div>
      <div className="ah-demo-product">
        <div className="ah-demo-tabs" role="tablist" aria-label={lang === 'es' ? 'Demos de Archic Control' : 'Archic Control demos'}>
          {demos.map((item, index) => (
            <button key={item.id} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>{item.tab}</button>
          ))}
        </div>
        <a className="ah-demo-screen" href={demo.href} data-archic-intent={`control-demo:${demo.id}`}>
          <div className="ah-demo-media"><img key={demo.id} src={demo.preview} alt="" /></div>
          <div className="ah-demo-copy">
            <small>{demo.label}</small>
            <strong>{demo.title}</strong>
            <div><b>{demo.metric}</b><span>{demo.metricLabel}</span></div>
            <em>{c.demoOpen}<Arrow /></em>
          </div>
        </a>
      </div>
    </div>
  )
}

function WorkFeature({ item, lang, index }: { item: WorkItem; lang: Lang; index: number }) {
  const c = COPY[lang].work
  return (
    <article className="ah-work-item" data-side={index % 2 === 0 ? 'left' : 'right'} data-reveal>
      <a className="ah-work-media" href={item.href} data-archic-intent={`work:${item.name}`}>
        <img src={item.image} alt="" loading="lazy" />
        <span>{item.code}</span>
      </a>
      <div className="ah-work-copy">
        <div className="ah-work-meta"><span>{item.kind}</span><span>{c.concept}</span></div>
        <h3>{item.name}</h3>
        <dl>
          <div><dt>{c.publicLabel}</dt><dd>{item.publicLayer}</dd></div>
          <div><dt>{c.privateLabel}</dt><dd>{item.privateLayer}</dd></div>
        </dl>
        <a href={item.href} data-archic-intent={`work-open:${item.name}`}>{c.open}<Arrow /></a>
      </div>
    </article>
  )
}

export default function ArchicHome() {
  const { lang } = useLang()
  const currentLang = lang as Lang
  const c = COPY[currentLang]
  const seo = HOME_SEO[currentLang]
  const canonicalUrl = homeCanonical(currentLang)
  const structuredData = buildHomeGraph(currentLang)
  const ogImage = siteOgImage(currentLang)
  const auditHref = currentLang === 'en' ? '/en/contact/?intent=audit' : '/contact/?intent=audit'
  const contactHref = currentLang === 'en' ? '/en/contact/' : '/contact/'

  return (
    <div className="as-site ah-site" data-quality-standard="archic-public-2026.2">
      <Helmet htmlAttributes={{ lang: currentLang }}>
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

      <main className="ah-main">
        <section className="ah-hero" id="home" data-archic-view="hero">
          <div className="ah-shell ah-hero-inner">
            <div className="ah-hero-top" data-reveal="hero">
              <p>ARCHIC / DIGITAL SYSTEMS</p>
              <h1><span>{c.hero.title[0]}</span><span>{c.hero.title[1]}</span></h1>
              <div className="ah-hero-lower">
                <p>{c.hero.lead}</p>
                <div className="ah-actions">
                  <a className="ah-button ah-button-gold" href={auditHref} data-archic-intent="hero:audit">{c.hero.primary}</a>
                  <a className="ah-text-link ah-text-link-light" href="#selected-work" data-archic-intent="hero:work">{c.hero.secondary}<Arrow /></a>
                </div>
              </div>
            </div>

            <div className="ah-hero-system" data-reveal>
              <div className="ah-hero-system-label"><span>{c.hero.systemLabel}</span><span>2026.2</span></div>
              <div className="ah-hero-system-grid">
                {c.hero.system.map(([name, role], index) => (
                  <a key={name} href={pagePath(currentLang, name.toLowerCase())} data-archic-intent={`hero-system:${name.toLowerCase()}`}>
                    <span>0{index + 1}</span><strong>{name}</strong><small>{role}</small><Arrow />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="ah-hero-rail" aria-label={currentLang === 'es' ? 'Principios de Archic' : 'Archic principles'}>
            <div className="ah-shell">
              {c.hero.rail.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}
            </div>
          </div>
        </section>

        <section className="ah-work ah-section" id="selected-work" data-archic-view="selected-work">
          <div className="ah-shell">
            <SectionHead index={c.work.index} title={c.work.title} body={c.work.body} />
            <div className="ah-work-list">
              {WORK[currentLang].map((item, index) => <WorkFeature key={item.name} item={item} lang={currentLang} index={index} />)}
            </div>
          </div>
        </section>

        <section className="ah-system ah-section" id="system" data-archic-view="system">
          <div className="ah-shell">
            <SectionHead index={c.system.index} title={c.system.title} body={c.system.body} />
            <div className="ah-system-lanes">
              {c.system.lanes.map(([no, name, meta, body]) => (
                <a className="ah-system-lane" href={pagePath(currentLang, name.toLowerCase())} key={name} data-active={name === 'Control'} data-reveal data-archic-intent={`system:${name.toLowerCase()}`}>
                  <span>{no}</span>
                  <div><small>{meta}</small><h3>{name}</h3></div>
                  <p>{body}</p>
                  <Arrow />
                </a>
              ))}
            </div>
            <ControlDemo lang={currentLang} />
          </div>
        </section>

        <section className="ah-method ah-section" id="method" data-archic-view="method-quality">
          <div className="ah-shell">
            <SectionHead index={c.method.index} title={c.method.title} body={c.method.body} dark />
            <div className="ah-method-layout">
              <div className="ah-method-list">
                {c.method.steps.map(([no, phase, body]) => (
                  <article key={no} data-reveal><span>{no}</span><h3>{phase}</h3><p>{body}</p></article>
                ))}
              </div>
              <aside className="ah-quality" data-reveal>
                <div className="ah-quality-head"><span>{c.method.qualityTitle}</span><b>PASS / REQUIRED</b></div>
                <div className="ah-quality-list">
                  {c.method.quality.map(([title, body], index) => (
                    <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{body}</p></div><b>✓</b></article>
                  ))}
                </div>
                <p className="ah-quality-foot">{c.method.qualityFoot}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="ah-investment ah-section" id="investment" data-archic-view="investment">
          <div className="ah-shell">
            <SectionHead index={c.investment.index} title={c.investment.title} body={c.investment.body} />
            <div className="ah-price-list">
              {c.investment.items.map(([name, price, subtitle, body], index) => (
                <article key={name} data-reveal>
                  <span>0{index + 1}</span>
                  <div className="ah-price-name"><h3>{name}</h3><small>{subtitle}</small></div>
                  <p>{body}</p>
                  <div className="ah-price-value"><small>{c.investment.from}</small><strong>{price}</strong></div>
                  <a href={auditHref} aria-label={`${c.investment.cta}: ${name}`} data-archic-intent={`investment:${name}`}><Arrow /></a>
                </article>
              ))}
            </div>
            <div className="ah-price-foot"><p>{c.investment.note}</p><a className="ah-text-link" href={auditHref} data-archic-intent="investment:cta">{c.investment.cta}<Arrow /></a></div>
          </div>
        </section>

        <section className="ah-audit ah-section" id="audit" data-archic-view="audit">
          <div className="ah-shell">
            <SectionHead index={c.audit.index} title={c.audit.title} body={c.audit.body} dark />
            <div className="ah-audit-grid">
              {c.audit.outputs.map(([title, body], index) => (
                <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>
              ))}
            </div>
            <div className="ah-audit-action" data-reveal>
              <a className="ah-button ah-button-gold" href={auditHref} data-archic-intent="audit:request">{c.audit.cta}</a>
              <p>{c.audit.note}</p>
            </div>
          </div>
        </section>

        <section className="ah-contact" id="contact" data-archic-view="contact">
          <div className="ah-shell">
            <p className="ah-contact-index">{c.contact.index}</p>
            <div className="ah-contact-title" data-reveal><h2>{c.contact.title[0]}<span>{c.contact.title[1]}</span></h2></div>
            <div className="ah-contact-grid" data-reveal>
              <p>{c.contact.body}</p>
              <div className="ah-contact-actions">
                <a className="ah-button ah-button-ink" href={contactHref} data-archic-intent="contact:open">{c.contact.primary}</a>
                <a className="ah-text-link" href={`tel:${CONTACT_PHONE}`} data-archic-intent="contact:call">{c.contact.phone} · {CONTACT_PHONE_DISPLAY}<Arrow /></a>
              </div>
              <small>{c.contact.availability}</small>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  )
}
