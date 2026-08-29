import { useState, type KeyboardEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'

type Lang = 'es' | 'en'
type DemoId = 'hospitality' | 'mobility' | 'property'
type SystemLayer = 'presence' | 'control' | 'business'

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

type HeroProofItem = {
  id: SystemLayer
  eyebrow: string
  title: string
  body: string
  metric: string
  metricLabel: string
  href: string
}

const COPY = {
  es: {
    hero: {
      kicker: 'ARCHIC / WEB · APPS · SOFTWARE',
      title: ['Más que una web.', 'Un sistema para crecer.'],
      lead: 'Diseñamos y desarrollamos webs, web apps y software web a medida para negocios que necesitan vender mejor, operar con menos fricción y crecer sin depender de herramientas que no encajan.',
      primary: 'Solicitar diagnóstico',
      secondary: 'Ver proyectos',
      note: 'Diagnóstico inicial sin coste · Respuesta en 24–48 h laborables.',
      rail: ['Webs que convierten', 'Web apps a medida', 'Software web', 'Automatización'],
      system: [
        ['Presence', 'Percepción + conversión'],
        ['Control', 'Operación privada'],
        ['Business', 'Software + automatización'],
      ],
    },
    work: {
      index: '01 / TRABAJO',
      title: 'Diseñamos la parte visible. Construimos lo que la hace funcionar.',
      body: 'Estos concept builds muestran cómo convertimos una oportunidad de negocio en un producto navegable: la experiencia que vende y el sistema privado que utiliza el equipo.',
      concept: 'CONCEPT BUILD',
      publicLabel: 'PRESENCE',
      privateLabel: 'CONTROL / BUSINESS',
      open: 'Explorar proyecto',
    },
    system: {
      index: '02 / SISTEMA ARCHIC',
      title: 'Web, operación y software no deberían vivir separados.',
      body: 'Unimos presencia, herramientas internas y lógica de negocio para construir lo necesario ahora sin cerrar el camino a lo que vendrá después.',
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
      title: 'Primero detectamos dónde se pierden ventas y tiempo.',
      body: 'No empezamos preguntando “qué web quieres”. Revisamos qué ve el cliente, dónde se pierde intención y qué parte de la operación obliga al equipo a trabajar peor.',
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
      kicker: 'ARCHIC / WEB · APPS · SOFTWARE',
      title: ['More than a website.', 'A system built to grow.'],
      lead: 'We design and build websites, web apps and custom web software for businesses that need to sell better, operate with less friction and grow beyond tools that no longer fit.',
      primary: 'Request a diagnosis',
      secondary: 'View projects',
      note: 'No-cost initial diagnosis · Reply within 1–2 business days.',
      rail: ['Websites that convert', 'Custom web apps', 'Web software', 'Automation'],
      system: [
        ['Presence', 'Perception + conversion'],
        ['Control', 'Private operations'],
        ['Business', 'Software + automation'],
      ],
    },
    work: {
      index: '01 / WORK',
      title: 'We design the visible layer. We build what makes it work.',
      body: 'These concept builds show how we turn a business opportunity into a navigable product: the experience that sells and the private system the team uses.',
      concept: 'CONCEPT BUILD',
      publicLabel: 'PRESENCE',
      privateLabel: 'CONTROL / BUSINESS',
      open: 'Explore project',
    },
    system: {
      index: '02 / ARCHIC SYSTEM',
      title: 'Web, operations and software should not live apart.',
      body: 'We connect presence, internal tools and business logic to build what is needed now without closing the path to what comes next.',
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
      title: 'First we find where sales and time are being lost.',
      body: 'We do not start by asking “what website do you want?”. We review what customers see, where intent is lost and which part of the operation forces the team to work worse.',
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
      image: '/software/real-estate-preview.svg',
      href: '/explorations/real-estate/',
      code: '01 / REAL ESTATE',
      publicLayer: 'Portfolio editorial, búsqueda, comparación y captación de enquiry.',
      privateLayer: 'Owner Studio, propiedades, leads y seguimiento en un mismo sistema.',
    },
    {
      name: 'La Bocana',
      kind: 'Hospitality / Puerto Banús',
      image: '/software/hospitality-preview.svg',
      href: '/explorations/hospitality/',
      code: '02 / HOSPITALITY',
      publicLayer: 'Presencia, carta, reserva y experiencia de marca conectadas.',
      privateLayer: 'Reservas, sala, clientes, disponibilidad y operación diaria.',
    },
    {
      name: 'Five Star Rentals',
      kind: 'Luxury mobility',
      image: '/software/mobility-preview.svg',
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
      image: '/software/real-estate-preview.svg',
      href: '/en/explorations/real-estate/',
      code: '01 / REAL ESTATE',
      publicLayer: 'Editorial portfolio, search, comparison and enquiry capture.',
      privateLayer: 'Owner Studio, properties, leads and follow-up in one system.',
    },
    {
      name: 'La Bocana',
      kind: 'Hospitality / Puerto Banús',
      image: '/software/hospitality-preview.svg',
      href: '/en/explorations/hospitality/',
      code: '02 / HOSPITALITY',
      publicLayer: 'Presence, menu, booking and brand experience connected.',
      privateLayer: 'Bookings, floor, customers, availability and daily operations.',
    },
    {
      name: 'Five Star Rentals',
      kind: 'Luxury mobility',
      image: '/software/mobility-preview.svg',
      href: '/en/explorations/mobility/',
      code: '03 / MOBILITY',
      publicLayer: 'Fleet, detail pages, galleries and enquiries with premium product language.',
      privateLayer: 'Owner access, availability, offers and enquiry management.',
    },
  ],
}

const HERO_PROOFS: Record<Lang, HeroProofItem[]> = {
  es: [
    {
      id: 'presence',
      eyebrow: 'PRESENCE / EXPERIENCIA PÚBLICA',
      title: 'Una presencia que explica, orienta y convierte.',
      body: 'Narrativa, contenido y recorridos conectados con la operación real del negocio.',
      metric: '03',
      metricLabel: 'recorridos clave',
      href: '/presence/',
    },
    {
      id: 'control',
      eyebrow: 'CONTROL / OPERACIÓN PRIVADA',
      title: 'Reservas, clientes y capacidad en contexto.',
      body: 'Una demostración white-label de la capa privada que utiliza el equipo.',
      metric: '82%',
      metricLabel: 'ocupación demo',
      href: '/explorations/hospitality/',
    },
    {
      id: 'business',
      eyebrow: 'BUSINESS / LÓGICA PROPIA',
      title: 'Los procesos dejan de depender de trabajo repetido.',
      body: 'Automatizaciones e integraciones hechas alrededor de cómo funciona el negocio.',
      metric: '11',
      metricLabel: 'eventos conectados',
      href: '/business/',
    },
  ],
  en: [
    {
      id: 'presence',
      eyebrow: 'PRESENCE / PUBLIC EXPERIENCE',
      title: 'A presence that explains, guides and converts.',
      body: 'Narrative, content and journeys connected to how the business actually operates.',
      metric: '03',
      metricLabel: 'key journeys',
      href: '/en/presence/',
    },
    {
      id: 'control',
      eyebrow: 'CONTROL / PRIVATE OPERATIONS',
      title: 'Bookings, customers and capacity in context.',
      body: 'A white-label demonstration of the private layer used by the team.',
      metric: '82%',
      metricLabel: 'demo occupancy',
      href: '/en/explorations/hospitality/',
    },
    {
      id: 'business',
      eyebrow: 'BUSINESS / OWN LOGIC',
      title: 'Processes stop depending on repeated manual work.',
      body: 'Automations and integrations built around the way the business operates.',
      metric: '11',
      metricLabel: 'connected events',
      href: '/en/business/',
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

function PresenceProof({ lang }: { lang: Lang }) {
  return (
    <div className="ah-proof-presence" aria-hidden="true">
      <div className="ah-presence-nav"><b>ARCHIC / FIELD NOTES</b><span>{lang === 'es' ? 'PROYECTO' : 'PROJECT'}</span></div>
      <div className="ah-presence-title">
        <small>{lang === 'es' ? 'CLARIDAD ANTES QUE RUIDO' : 'CLARITY BEFORE NOISE'}</small>
        <strong>{lang === 'es' ? 'Una decisión clara en cada pantalla.' : 'One clear decision on every screen.'}</strong>
      </div>
      <div className="ah-presence-flow">
        <span>01 / {lang === 'es' ? 'ENTENDER' : 'UNDERSTAND'}</span>
        <span>02 / {lang === 'es' ? 'CONFIAR' : 'TRUST'}</span>
        <span>03 / {lang === 'es' ? 'ACTUAR' : 'ACT'}</span>
      </div>
    </div>
  )
}

function BusinessProof({ lang }: { lang: Lang }) {
  const events = lang === 'es'
    ? ['Solicitud recibida', 'Datos validados', 'Equipo asignado', 'Seguimiento creado']
    : ['Request received', 'Data validated', 'Team assigned', 'Follow-up created']

  return (
    <div className="ah-proof-business" aria-hidden="true">
      <div className="ah-business-flow">
        {events.map((event, index) => (
          <div key={event}><span>{String(index + 1).padStart(2, '0')}</span><strong>{event}</strong><i /></div>
        ))}
      </div>
      <div className="ah-business-log">
        <small>AUTOMATION / LIVE LOG</small>
        <p><b>09:42:16</b> lead.qualified</p>
        <p><b>09:42:17</b> crm.record.created</p>
        <p><b>09:42:18</b> owner.notified</p>
      </div>
    </div>
  )
}

function HeroSystemProof({ lang, active, onChange }: { lang: Lang; active: number; onChange: (index: number) => void }) {
  const items = HERO_PROOFS[lang]
  const proof = items[active]

  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const last = items.length - 1
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? last
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? index === 0 ? last : index - 1
          : index === last ? 0 : index + 1
    onChange(next)
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus()
  }

  return (
    <aside className="ah-proof" data-layer={proof.id} data-reveal aria-label={lang === 'es' ? 'Demostración del sistema Archic' : 'Archic system demonstration'}>
      <div className="ah-proof-bar">
        <span>ARCHIC / SYSTEM 1.0</span>
        <b>{lang === 'es' ? 'DEMO / DATOS FICTICIOS' : 'DEMO / FICTIONAL DATA'}</b>
      </div>
      <div className="ah-proof-grid">
        <div className="ah-proof-tabs" role="tablist" aria-label={lang === 'es' ? 'Capas del sistema' : 'System layers'}>
          {items.map((item, index) => (
            <button
              key={item.id}
              id={`ah-proof-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="ah-proof-panel"
              tabIndex={active === index ? 0 : -1}
              onClick={() => onChange(index)}
              onKeyDown={(event) => moveTab(event, index)}
            >
              <span>0{index + 1}</span>
              <strong>{item.id}</strong>
              <small>{COPY[lang].hero.system[index][1]}</small>
            </button>
          ))}
        </div>
        <div id="ah-proof-panel" role="tabpanel" className="ah-proof-panel" aria-labelledby={`ah-proof-tab-${proof.id}`}>
          <div className="ah-proof-screen">
            {proof.id === 'presence' && <PresenceProof lang={lang} />}
            {proof.id === 'control' && <img src="/software/hospitality-preview.svg" alt="" />}
            {proof.id === 'business' && <BusinessProof lang={lang} />}
          </div>
          <div className="ah-proof-summary">
            <div><small>{proof.eyebrow}</small><strong>{proof.title}</strong><p>{proof.body}</p></div>
            <div className="ah-proof-metric"><b>{proof.metric}</b><span>{proof.metricLabel}</span></div>
            <a className="ah-proof-open" href={proof.href} data-archic-intent={`hero-proof:${proof.id}`} aria-label={proof.title}><Arrow /></a>
          </div>
        </div>
      </div>
    </aside>
  )
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

  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const last = demos.length - 1
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? last
        : event.key === 'ArrowLeft'
          ? index === 0 ? last : index - 1
          : index === last ? 0 : index + 1
    setActive(next)
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus()
  }

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
            <button
              key={item.id}
              id={`ah-demo-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="ah-demo-panel"
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => moveTab(event, index)}
            >
              {item.tab}
            </button>
          ))}
        </div>
        <div id="ah-demo-panel" role="tabpanel" aria-labelledby={`ah-demo-tab-${demo.id}`}>
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
  const [heroSystem, setHeroSystem] = useState(1)
  const currentLang = lang as Lang
  const c = COPY[currentLang]
  const seo = HOME_SEO[currentLang]
  const canonicalUrl = homeCanonical(currentLang)
  const structuredData = buildHomeGraph(currentLang)
  const ogImage = siteOgImage(currentLang)
  const auditHref = currentLang === 'en' ? '/en/contact/?intent=audit' : '/contact/?intent=audit'
  const contactHref = currentLang === 'en' ? '/en/contact/' : '/contact/'

  return (
    <div className="as-site ah-site" data-quality-standard="archic-design-system-1.0.0">
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

      <main id="main-content" className="ah-main" tabIndex={-1}>
        <section className="ah-hero" id="home" data-archic-view="hero">
          <div className="ah-shell ah-hero-inner">
            <div className="ah-hero-top" data-reveal="hero">
              <p>{c.hero.kicker}</p>
              <h1><span>{c.hero.title[0]}</span><span>{c.hero.title[1]}</span></h1>
              <div className="ah-hero-lower">
                <p>{c.hero.lead}</p>
                <div className="ah-actions">
                  <div className="ah-hero-cta-row">
                    <a className="ah-button ah-button-gold" href={auditHref} data-archic-intent="hero:audit">{c.hero.primary}</a>
                    <a className="ah-text-link ah-text-link-light" href="#selected-work" data-archic-intent="hero:work">{c.hero.secondary}<Arrow /></a>
                  </div>
                  <small className="ah-hero-note">{c.hero.note}</small>
                </div>
              </div>
            </div>
            <HeroSystemProof lang={currentLang} active={heroSystem} onChange={setHeroSystem} />
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
