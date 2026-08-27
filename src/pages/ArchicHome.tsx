import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE } from '../config/contact'
import heroMarbella from '../assets/hero-marbella.jpg'
import workRealEstate from '../assets/work-realestate.jpg'
import workBocana from '../assets/work-bocana.jpg'
import workAutomotive from '../assets/work-automotive.jpg'
import '../styles/archic-strategy.css'

type Lang = 'es' | 'en'
type DemoId = 'hospitality' | 'mobility' | 'property'
type WorkItem = { name: string; kind: string; scope: string; image: string; href: string; code: string }
type DemoItem = { id: DemoId; tab: string; eyebrow: string; title: string; metric: string; metricLabel: string; preview: string; href: string }

const COPY = {
  es: {
    hero: {
      title: ['Construimos la capa', 'digital de tu negocio.'],
      lead: 'Lo que ve el cliente, lo que usa tu equipo y el software que conecta ambos. Diseñamos cada capa alrededor de cómo vendes, operas y quieres ser percibido.',
      audit: 'Solicitar diagnóstico',
      work: 'Ver trabajo',
      note: 'Écija · Sevilla · Marbella · España',
    },
    proof: {
      title: 'Menos promesas. Más cosas que puedas comprobar.',
      items: [
        ['01', 'Código propio', 'Entregable, portable y sin dependencia de un constructor cerrado.'],
        ['02', 'QA antes de publicar', 'Mobile, recorridos críticos, rendimiento, accesibilidad y revisión visual.'],
        ['03', 'Datos sin inventar', 'Los concept builds se etiquetan como conceptos. Los resultados se publican solo cuando están medidos.'],
        ['04', 'Search-ready', 'SEO técnico, datos estructurados, canonicals, sitemap y base preparada para buscadores e IA.'],
      ],
    },
    selected: {
      kicker: 'SELECTED WORK / CONCEPT BUILDS',
      title: 'Antes de vender una idea, la hacemos visible.',
      body: 'Construimos demostraciones completas para enseñar dirección, experiencia y oportunidad. No son clientes ni resultados atribuidos: son concept builds creados para elevar la conversación.',
      open: 'Explorar sistema',
      label: 'ARCHIC / CONCEPT BUILD',
    },
    measurement: {
      kicker: 'CASE STUDIES / EVIDENCIA',
      title: 'Un caso de éxito empieza antes del lanzamiento.',
      body: 'Si no tenemos una línea base, después solo quedan opiniones. Por eso definimos qué debe mejorar, medimos desde el primer día y separamos trabajo visual de resultado de negocio.',
      steps: [
        ['01', 'Baseline', 'Qué ocurre hoy: leads, reservas, tiempos, ranking, conversión o carga operativa.'],
        ['02', 'Instrumentación', 'Definimos eventos y fuentes de datos sin llenar el proyecto de tracking innecesario.'],
        ['03', 'Resultado', 'Comparamos antes y después y documentamos solo lo que pueda demostrarse.'],
      ],
      promise: 'No publicamos una métrica como éxito si no podemos explicar de dónde sale.',
    },
    system: {
      kicker: 'ARCHIC / DIGITAL SYSTEM',
      title: 'No vendemos una web aislada. Construimos la parte digital que el negocio necesita.',
      body: 'A veces basta con Presence. Otras veces la oportunidad está en Control o en Business. Las tres capas comparten dirección y pueden crecer juntas.',
      lanes: [
        ['01', 'Presence', 'Percepción & conversión', 'Dirección digital, web premium, contenido, catálogo, reserva o captación.', 'presence'],
        ['02', 'Control', 'Operación privada', 'Clientes, reservas, recursos, disponibilidad, estados y herramientas de gestión.', 'control'],
        ['03', 'Business', 'Ventaja operativa', 'Software a medida, automatización, integraciones y datos cuando lo estándar ya no encaja.', 'business'],
      ],
    },
    method: {
      kicker: 'ARCHIC METHOD',
      title: 'El proyecto avanza por decisiones, no por páginas.',
      body: 'Cada fase termina con algo que se puede revisar. Eso reduce ambigüedad, evita construir por inercia y mantiene negocio, diseño y tecnología alineados.',
      steps: [
        ['01', 'Discovery', 'Entendemos el negocio', 'Objetivo, cliente, operación, competencia, restricciones y señal que demostrará que el proyecto funciona.', 'Diagnóstico'],
        ['02', 'Architecture', 'Definimos el sistema', 'Información, recorridos, datos, funcionalidades y dirección visual antes de multiplicar pantallas.', 'Arquitectura'],
        ['03', 'Build', 'Construimos lo real', 'Diseño y desarrollo avanzan juntos sobre producto navegable, no sobre una cadena de maquetas desconectadas.', 'Build funcional'],
        ['04', 'Validation', 'Forzamos los puntos débiles', 'QA funcional, mobile, visual, rendimiento, accesibilidad, búsqueda y recorridos críticos.', 'Quality gate'],
        ['05', 'Evolution', 'Medimos y mejoramos', 'Publicar no cierra el sistema. Los datos reales deciden qué merece ser la siguiente mejora.', 'Roadmap vivo'],
      ],
    },
    quality: {
      kicker: 'ARCHIC QUALITY STANDARD / PUBLIC EDITION',
      title: 'La calidad no depende de que alguien se acuerde de revisarla.',
      body: 'Nuestro estándar interno es más amplio; esta es la parte que un cliente debe poder exigir y comprobar en cualquier entrega.',
      checks: [
        ['Mobile específico', 'No solo encoger desktop: jerarquía, navegación, interacción y encuadres revisados para móvil.'],
        ['Recorridos críticos', 'Contacto, reserva, búsqueda, formulario, acceso privado o flujo principal probado de extremo a extremo.'],
        ['Rendimiento', 'Assets, fuentes, carga y JavaScript revisados antes de producción.'],
        ['Accesibilidad', 'Contraste, foco, teclado, semántica y reduced motion forman parte del acabado.'],
        ['Search & AI readiness', 'Metadatos, Schema.org, sitemap, canonical, crawlability, contenido semántico y llms cuando aporta.'],
        ['Integridad de contenido', 'Sin clientes, premios, métricas o testimonios inventados para rellenar una interfaz.'],
        ['QA visual', 'Desktop y mobile revisados sobre el render final, no solo sobre el código.'],
        ['Propiedad & portabilidad', 'Código y activos preparados para que el cliente no quede atrapado en una plataforma.'],
      ],
      status: 'STANDARD / REQUIRED',
    },
    offers: {
      kicker: 'FORMAS DE EMPEZAR',
      title: 'Un punto de entrada claro. El alcance sigue siendo a medida.',
      body: 'Publicamos mínimos orientativos para filtrar expectativas sin convertir proyectos distintos en paquetes idénticos. Después del diagnóstico, el presupuesto queda cerrado.',
      from: 'desde',
      note: 'Mínimos orientativos · IVA no incluido · presupuesto final tras diagnóstico',
      items: [
        ['Presence', '1.200 €', 'Presencia digital premium', 'Web y experiencia pública con una dirección propia, base técnica sólida y conversión clara.', ['Dirección', 'Web a medida', 'Mobile', 'SEO técnico']],
        ['Control', '2.500 €', 'Sistema privado de operación', 'Panel o herramienta interna para gestionar un flujo concreto del negocio sin adaptar el negocio a una plantilla.', ['Flujo operativo', 'Roles', 'Datos', 'QA funcional']],
        ['Business', '4.000 €', 'Software a medida', 'Producto, automatización o integración cuando el problema necesita lógica y arquitectura propias.', ['Arquitectura', 'Desarrollo', 'Integraciones', 'Documentación']],
        ['Evolution', '150 €/mes', 'Mejora continua', 'Seguimiento técnico y mejoras priorizadas con datos reales después de lanzar.', ['Monitorización', 'Mejoras', 'Search', 'Roadmap']],
      ],
      cta: 'Hablar del alcance',
    },
    audit: {
      kicker: 'DIGITAL OPPORTUNITY AUDIT',
      title: 'Antes de proponerte una solución, buscamos dónde está la oportunidad.',
      body: 'Para proyectos con encaje hacemos un diagnóstico breve de presencia, conversión, búsqueda y operación. No empieza con “qué web quieres”, sino con qué está frenando al negocio y qué sería razonable cambiar primero.',
      outputs: [
        ['01', 'Señal comercial', 'Qué encuentra hoy un cliente y dónde pierde claridad, confianza o intención.'],
        ['02', 'Fricción operativa', 'Qué tareas, herramientas o pasos manuales pueden estar consumiendo tiempo sin aportar valor.'],
        ['03', 'Prioridad', 'Qué construiríamos primero, qué dejaríamos fuera y por qué.'],
        ['04', 'Rango realista', 'Alcance inicial, dependencias y nivel de inversión antes de entrar en diseño.'],
      ],
      cta: 'Quiero un diagnóstico',
      note: 'Sin coste para proyectos con encaje. Si creemos que no somos la solución correcta, lo diremos.',
    },
    sectors: {
      kicker: 'SECTOR DEPTH',
      title: 'Cuanto mejor entendemos la operación, menos genérica es la solución.',
      body: 'Estas son áreas en las que estamos profundizando. Son focos de especialización, no una lista de clientes.',
      items: [
        ['01', 'Automotive & mobility', 'Flota, disponibilidad, solicitudes, ofertas, entrega y owner tools.', '/explorations/mobility/'],
        ['02', 'Hospitality', 'Reserva, carta, sala, cliente, eventos y operación conectada.', '/explorations/hospitality/'],
        ['03', 'Real estate', 'Portfolio, captación, comparación, leads, propietarios y CRM.', '/explorations/real-estate/'],
        ['04', 'Yachting & charter', 'Catálogo, disponibilidad, enquiry, experiencia premium y operación.'],
        ['05', 'Education & services', 'Captación local, programas, admisiones, seguimiento y relación con familias o clientes.'],
        ['06', 'Industry & operations', 'Procesos internos, producción, inventario, informes y automatización.'],
      ],
    },
    evolution: {
      kicker: 'ARCHIC EVOLUTION',
      title: 'Mantenimiento evita que algo se rompa. Evolution busca que siga mejorando.',
      body: 'Después de publicar, usamos incidencias, datos, búsquedas y feedback real para decidir las siguientes mejoras. No vendemos actividad mensual por inercia: cada intervención debe tener una razón.',
      items: ['Monitorización y fixes', 'Conversion & UX', 'Search readiness', 'Contenido y estructura', 'Pequeñas automatizaciones', 'Roadmap de producto'],
      cta: 'Ver cómo trabajamos',
    },
    close: {
      title: ['Si vamos a construir algo,', 'debe cambiar algo.'],
      body: 'Cuéntanos cómo funciona el negocio, qué está fallando y qué resultado tendría valor. La solución viene después.',
      audit: 'Empezar por el diagnóstico',
      call: 'Llamar',
    },
  },
  en: {
    hero: {
      title: ['We build the digital', 'layer of your business.'],
      lead: 'What customers see, what your team uses and the software connecting both. Every layer is designed around how you sell, operate and want to be perceived.',
      audit: 'Request an audit',
      work: 'View work',
      note: 'Écija · Seville · Marbella · Spain',
    },
    proof: {
      title: 'Fewer promises. More things you can verify.',
      items: [
        ['01', 'Owned code', 'Deliverable, portable and not locked into a closed website builder.'],
        ['02', 'QA before launch', 'Mobile, critical journeys, performance, accessibility and visual review.'],
        ['03', 'No invented data', 'Concept builds are labelled as concepts. Results are published only when measured.'],
        ['04', 'Search-ready', 'Technical SEO, structured data, canonicals, sitemap and a base prepared for search engines and AI.'],
      ],
    },
    selected: {
      kicker: 'SELECTED WORK / CONCEPT BUILDS',
      title: 'Before we sell an idea, we make it visible.',
      body: 'We build complete demonstrations to show direction, experience and opportunity. They are not clients or attributed results: they are concept builds made to raise the conversation.',
      open: 'Explore system',
      label: 'ARCHIC / CONCEPT BUILD',
    },
    measurement: {
      kicker: 'CASE STUDIES / EVIDENCE',
      title: 'A case study starts before launch.',
      body: 'Without a baseline, all that remains later is opinion. We define what should improve, measure from day one and separate visual work from business outcome.',
      steps: [
        ['01', 'Baseline', 'What happens today: leads, bookings, time, ranking, conversion or operational load.'],
        ['02', 'Instrumentation', 'We define useful events and data sources without filling the product with unnecessary tracking.'],
        ['03', 'Outcome', 'We compare before and after and document only what can be demonstrated.'],
      ],
      promise: 'We do not publish a success metric if we cannot explain where it came from.',
    },
    system: {
      kicker: 'ARCHIC / DIGITAL SYSTEM',
      title: 'We do not sell an isolated website. We build the digital layer the business needs.',
      body: 'Sometimes Presence is enough. Sometimes the opportunity lives in Control or Business. All three layers share one direction and can grow together.',
      lanes: [
        ['01', 'Presence', 'Perception & conversion', 'Digital direction, premium web, content, catalogue, booking or acquisition.', 'presence'],
        ['02', 'Control', 'Private operations', 'Customers, bookings, resources, availability, states and management tools.', 'control'],
        ['03', 'Business', 'Operational advantage', 'Custom software, automation, integrations and data when standard tools no longer fit.', 'business'],
      ],
    },
    method: {
      kicker: 'ARCHIC METHOD',
      title: 'The project moves through decisions, not pages.',
      body: 'Every phase ends with something reviewable. That reduces ambiguity, avoids building by inertia and keeps business, design and technology aligned.',
      steps: [
        ['01', 'Discovery', 'Understand the business', 'Goal, customer, operation, competition, constraints and the signal that will show the project is working.', 'Diagnosis'],
        ['02', 'Architecture', 'Define the system', 'Information, journeys, data, functionality and visual direction before multiplying screens.', 'Architecture'],
        ['03', 'Build', 'Build the real thing', 'Design and development move together on a navigable product, not a chain of disconnected mockups.', 'Functional build'],
        ['04', 'Validation', 'Stress the weak points', 'Functional, mobile, visual, performance, accessibility, search and critical-journey QA.', 'Quality gate'],
        ['05', 'Evolution', 'Measure and improve', 'Launch does not close the system. Real data decides which improvement deserves to come next.', 'Living roadmap'],
      ],
    },
    quality: {
      kicker: 'ARCHIC QUALITY STANDARD / PUBLIC EDITION',
      title: 'Quality should not depend on somebody remembering to check it.',
      body: 'Our internal standard is broader; this is the part a client should be able to require and verify in every delivery.',
      checks: [
        ['Purpose-built mobile', 'Not simply desktop made smaller: hierarchy, navigation, interaction and framing are reviewed for mobile.'],
        ['Critical journeys', 'Contact, booking, search, forms, private access or the primary flow tested end to end.'],
        ['Performance', 'Assets, fonts, loading and JavaScript reviewed before production.'],
        ['Accessibility', 'Contrast, focus, keyboard, semantics and reduced motion are part of the finish.'],
        ['Search & AI readiness', 'Metadata, Schema.org, sitemap, canonical, crawlability, semantic content and llms where useful.'],
        ['Content integrity', 'No invented clients, awards, metrics or testimonials used to fill an interface.'],
        ['Visual QA', 'Desktop and mobile reviewed on the final render, not only in code.'],
        ['Ownership & portability', 'Code and assets prepared so the client is not trapped in a platform.'],
      ],
      status: 'STANDARD / REQUIRED',
    },
    offers: {
      kicker: 'WAYS TO START',
      title: 'A clear entry point. Scope remains bespoke.',
      body: 'We publish indicative minimums to align expectations without turning different businesses into identical packages. After diagnosis, the quote is fixed.',
      from: 'from',
      note: 'Indicative minimums · VAT not included · final quote after diagnosis',
      items: [
        ['Presence', '€1,200', 'Premium digital presence', 'Public website and experience with its own direction, solid technical base and clear conversion.', ['Direction', 'Custom web', 'Mobile', 'Technical SEO']],
        ['Control', '€2,500', 'Private operating system', 'Dashboard or internal tool for one concrete business flow without forcing the business into a template.', ['Operating flow', 'Roles', 'Data', 'Functional QA']],
        ['Business', '€4,000', 'Custom software', 'Product, automation or integration when the problem needs its own logic and architecture.', ['Architecture', 'Development', 'Integrations', 'Documentation']],
        ['Evolution', '€150/mo', 'Continuous improvement', 'Technical follow-up and prioritised improvements based on real data after launch.', ['Monitoring', 'Improvements', 'Search', 'Roadmap']],
      ],
      cta: 'Discuss scope',
    },
    audit: {
      kicker: 'DIGITAL OPPORTUNITY AUDIT',
      title: 'Before proposing a solution, we look for the opportunity.',
      body: 'For projects with fit, we run a concise review of presence, conversion, search and operations. It does not start with “what website do you want?”, but with what is holding the business back and what is sensible to change first.',
      outputs: [
        ['01', 'Commercial signal', 'What customers find today and where clarity, trust or intent is lost.'],
        ['02', 'Operational friction', 'Which tasks, tools or manual steps may be consuming time without creating value.'],
        ['03', 'Priority', 'What we would build first, what we would leave out and why.'],
        ['04', 'Realistic range', 'Initial scope, dependencies and investment level before entering design.'],
      ],
      cta: 'Request my audit',
      note: 'No cost for projects with fit. If we believe we are not the right solution, we will say so.',
    },
    sectors: {
      kicker: 'SECTOR DEPTH',
      title: 'The better we understand the operation, the less generic the solution becomes.',
      body: 'These are areas where we are building depth. They are focus sectors, not a client list.',
      items: [
        ['01', 'Automotive & mobility', 'Fleet, availability, enquiries, offers, delivery and owner tools.', '/en/explorations/mobility/'],
        ['02', 'Hospitality', 'Booking, menus, floor, customers, events and connected operations.', '/en/explorations/hospitality/'],
        ['03', 'Real estate', 'Portfolio, acquisition, comparison, leads, owners and CRM.', '/en/explorations/real-estate/'],
        ['04', 'Yachting & charter', 'Catalogue, availability, enquiry, premium experience and operations.'],
        ['05', 'Education & services', 'Local acquisition, programmes, admissions, follow-up and customer relationships.'],
        ['06', 'Industry & operations', 'Internal processes, production, inventory, reporting and automation.'],
      ],
    },
    evolution: {
      kicker: 'ARCHIC EVOLUTION',
      title: 'Maintenance prevents breakage. Evolution is designed to keep improving.',
      body: 'After launch, incidents, data, search behaviour and real feedback decide what comes next. We do not sell monthly activity by inertia: every intervention needs a reason.',
      items: ['Monitoring & fixes', 'Conversion & UX', 'Search readiness', 'Content & structure', 'Small automations', 'Product roadmap'],
      cta: 'See how we work',
    },
    close: {
      title: ['If we build something,', 'it should change something.'],
      body: 'Tell us how the business works, what is failing and what outcome would create value. The solution comes after that.',
      audit: 'Start with the audit',
      call: 'Call',
    },
  },
} as const

const WORK: Record<Lang, WorkItem[]> = {
  es: [
    { name: 'Marbella For Sale', kind: 'Real estate de alta gama', scope: 'Dirección digital · Portfolio · CRM · Owner Studio', image: workRealEstate, href: '/explorations/real-estate/', code: '01 / REAL ESTATE' },
    { name: 'La Bocana', kind: 'Hospitality / Puerto Banús', scope: 'Web · Reservas · Sala · Clientes · Carta', image: workBocana, href: '/explorations/hospitality/', code: '02 / HOSPITALITY' },
    { name: 'Five Star Rentals', kind: 'Luxury mobility', scope: 'Brand presence · Fleet · Enquiries · Owner access', image: workAutomotive, href: '/explorations/mobility/', code: '03 / MOBILITY' },
  ],
  en: [
    { name: 'Marbella For Sale', kind: 'High-end real estate', scope: 'Digital direction · Portfolio · CRM · Owner Studio', image: workRealEstate, href: '/en/explorations/real-estate/', code: '01 / REAL ESTATE' },
    { name: 'La Bocana', kind: 'Hospitality / Puerto Banús', scope: 'Website · Bookings · Floor · Customers · Menu', image: workBocana, href: '/en/explorations/hospitality/', code: '02 / HOSPITALITY' },
    { name: 'Five Star Rentals', kind: 'Luxury mobility', scope: 'Brand presence · Fleet · Enquiries · Owner access', image: workAutomotive, href: '/en/explorations/mobility/', code: '03 / MOBILITY' },
  ],
}

const HERO_DEMOS: Record<Lang, DemoItem[]> = {
  es: [
    { id: 'hospitality', tab: 'Hospitality', eyebrow: 'RESERVAS / SALA', title: 'Servicio y ocupación en contexto.', metric: '82%', metricLabel: 'ocupación', preview: '/software/hospitality-preview.svg', href: '/explorations/hospitality/' },
    { id: 'mobility', tab: 'Movilidad', eyebrow: 'FLOTA / SOLICITUDES', title: 'Disponibilidad que se puede operar.', metric: '16', metricLabel: 'unidades', preview: '/software/mobility-preview.svg', href: '/explorations/mobility/' },
    { id: 'property', tab: 'Real estate', eyebrow: 'PORTFOLIO / CRM', title: 'Propiedades, leads y visitas conectados.', metric: '12', metricLabel: 'activos', preview: '/software/real-estate-preview.svg', href: '/explorations/real-estate/' },
  ],
  en: [
    { id: 'hospitality', tab: 'Hospitality', eyebrow: 'BOOKINGS / FLOOR', title: 'Service and occupancy in context.', metric: '82%', metricLabel: 'occupancy', preview: '/software/hospitality-preview.svg', href: '/en/explorations/hospitality/' },
    { id: 'mobility', tab: 'Mobility', eyebrow: 'FLEET / ENQUIRIES', title: 'Availability teams can operate.', metric: '16', metricLabel: 'units', preview: '/software/mobility-preview.svg', href: '/en/explorations/mobility/' },
    { id: 'property', tab: 'Real estate', eyebrow: 'PORTFOLIO / CRM', title: 'Properties, leads and viewings connected.', metric: '12', metricLabel: 'active', preview: '/software/real-estate-preview.svg', href: '/en/explorations/real-estate/' },
  ],
}

function pagePath(lang: Lang, slug: string) {
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

function Arrow() {
  return <i className="as-arrow" aria-hidden="true" />
}

function HeroSystemConsole({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0)
  const demos = HERO_DEMOS[lang]
  const demo = demos[active]
  const dataLabel = lang === 'es' ? 'DATOS FICTICIOS / DEMO' : 'FICTIONAL DATA / DEMO'

  return (
    <aside className="ag-console" aria-label={lang === 'es' ? 'Demostración interactiva de Archic Control' : 'Interactive Archic Control demonstration'}>
      <div className="ag-console-head"><span>ARCHIC / CONTROL</span><span><i />{dataLabel}</span></div>
      <div className="ag-console-tabs" role="tablist" aria-label={lang === 'es' ? 'Demos de sistema' : 'System demos'}>
        {demos.map((item, index) => (
          <button key={item.id} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>{item.tab}</button>
        ))}
      </div>
      <a className="ag-console-body" href={demo.href} data-archic-intent={`hero-demo:${demo.id}`}>
        <div className="ag-console-preview"><img key={demo.id} src={demo.preview} alt="" /></div>
        <div className="ag-console-copy">
          <small>{demo.eyebrow}</small><strong>{demo.title}</strong>
          <div><b>{demo.metric}</b><span>{demo.metricLabel}</span></div>
          <em>{lang === 'es' ? 'Abrir demostración' : 'Open demonstration'}<Arrow /></em>
        </div>
      </a>
    </aside>
  )
}

function WorkFeature({ item, lang }: { item: WorkItem; lang: Lang }) {
  const c = COPY[lang].selected
  return (
    <article className="ag-case" data-reveal>
      <a className="ag-case-media" href={item.href} data-archic-intent={`work:${item.name}`}>
        <img src={item.image} alt="" loading="lazy" />
        <span>{item.code}</span>
      </a>
      <div className="ag-case-copy">
        <div><span>{item.kind}</span><span>{c.label}</span></div>
        <h3>{item.name}</h3><p>{item.scope}</p>
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

  return (
    <div className="as-site ag-site" data-quality-standard="archic-public-2026.2">
      <Helmet htmlAttributes={{ lang: currentLang }}>
        <title>{seo.title}</title><meta name="description" content={seo.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/" /><link rel="alternate" hrefLang="en" href="https://archic.es/en/" /><link rel="alternate" hrefLang="x-default" href="https://archic.es/" />
        <meta property="og:type" content="website" /><meta property="og:site_name" content="Archic" /><meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seo.title} /><meta property="og:description" content={seo.description} /><meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta property="og:image:alt" content={seo.ogAlt} />
        <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={seo.title} /><meta name="twitter:description" content={seo.description} /><meta name="twitter:image" content={ogImage} /><meta name="twitter:image:alt" content={seo.ogAlt} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <StudioExperience />
      <StudioHeader />

      <main className="ag-main">
        <section className="ag-hero" id="home" data-archic-view="hero">
          <img className="ag-hero-image" src={heroMarbella} alt="" />
          <div className="ag-hero-shade" aria-hidden="true" />
          <div className="ag-hero-copy" data-reveal="hero">
            <h1><span>{c.hero.title[0]}</span><em>{c.hero.title[1]}</em></h1>
            <p>{c.hero.lead}</p>
            <div className="ag-actions">
              <a className="ag-btn ag-btn-primary" href="#audit" data-archic-intent="hero:audit">{c.hero.audit}</a>
              <a className="ag-btn ag-btn-quiet" href="#selected-work" data-archic-intent="hero:work">{c.hero.work}</a>
            </div>
          </div>
          <HeroSystemConsole lang={currentLang} />
          <div className="ag-hero-foot"><span>{c.hero.note}</span><span>ARCHIC / 2026</span></div>
        </section>

        <section className="ag-proof" data-archic-view="proof">
          <div className="ag-shell"><h2 data-reveal>{c.proof.title}</h2><div className="ag-proof-grid">{c.proof.items.map(([no, title, body]) => <article key={no} data-reveal><span>{no}</span><strong>{title}</strong><p>{body}</p></article>)}</div></div>
        </section>

        <section className="ag-work ag-section" id="selected-work" data-archic-view="selected-work">
          <div className="ag-shell">
            <header className="ag-heading" data-reveal><p className="ag-kicker">{c.selected.kicker}</p><h2>{c.selected.title}</h2><p>{c.selected.body}</p></header>
            <div className="ag-work-grid">{WORK[currentLang].map((item) => <WorkFeature key={item.name} item={item} lang={currentLang} />)}</div>
          </div>
        </section>

        <section className="ag-evidence ag-section" data-archic-view="measurement">
          <div className="ag-shell ag-evidence-layout">
            <header className="ag-heading" data-reveal><p className="ag-kicker ag-kicker-light">{c.measurement.kicker}</p><h2>{c.measurement.title}</h2><p>{c.measurement.body}</p></header>
            <div className="ag-evidence-steps">{c.measurement.steps.map(([no, title, body]) => <article key={no} data-reveal><span>{no}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
            <p className="ag-evidence-rule" data-reveal>{c.measurement.promise}</p>
          </div>
        </section>

        <section className="ag-system ag-section" id="system" data-archic-view="system">
          <div className="ag-shell">
            <header className="ag-heading ag-heading-wide" data-reveal><p className="ag-kicker">{c.system.kicker}</p><h2>{c.system.title}</h2><p>{c.system.body}</p></header>
            <div className="ag-system-grid">{c.system.lanes.map(([no, title, meta, body, slug]) => <a href={pagePath(currentLang, slug)} className="ag-system-lane" key={slug} data-reveal data-archic-intent={`system:${slug}`}><span>{no}</span><small>{meta}</small><h3>{title}</h3><p>{body}</p><Arrow /></a>)}</div>
          </div>
        </section>

        <section className="ag-method ag-section" id="method" data-archic-view="method">
          <div className="ag-shell">
            <header className="ag-heading" data-reveal><p className="ag-kicker ag-kicker-light">{c.method.kicker}</p><h2>{c.method.title}</h2><p>{c.method.body}</p></header>
            <div className="ag-method-list">{c.method.steps.map(([no, phase, title, body, output]) => <article key={no} data-reveal><span className="ag-method-no">{no}</span><div><small>{phase}</small><h3>{title}</h3></div><p>{body}</p><strong>{output}</strong></article>)}</div>
          </div>
        </section>

        <section className="ag-quality ag-section" id="quality" data-archic-view="quality">
          <div className="ag-shell">
            <header className="ag-heading ag-heading-wide" data-reveal><p className="ag-kicker">{c.quality.kicker}</p><h2>{c.quality.title}</h2><p>{c.quality.body}</p></header>
            <div className="ag-quality-grid">{c.quality.checks.map(([title, body], index) => <article key={title} data-reveal><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p><i>PASS</i></article>)}</div>
            <strong className="ag-quality-status" data-reveal>{c.quality.status}</strong>
          </div>
        </section>

        <section className="ag-offers ag-section" id="investment" data-archic-view="investment">
          <div className="ag-shell">
            <header className="ag-heading" data-reveal><p className="ag-kicker ag-kicker-light">{c.offers.kicker}</p><h2>{c.offers.title}</h2><p>{c.offers.body}</p></header>
            <div className="ag-offer-grid">{c.offers.items.map(([name, price, subtitle, body, inclusions]) => <article className="ag-offer" key={name} data-reveal><div><span>{name}</span><small>{subtitle}</small></div><p>{body}</p><ul>{inclusions.map((item) => <li key={item}>{item}</li>)}</ul><div className="ag-offer-price"><small>{c.offers.from}</small><strong>{price}</strong></div><a href={auditHref} data-archic-intent={`investment:${name}`}>{c.offers.cta}<Arrow /></a></article>)}</div>
            <p className="ag-offer-note">{c.offers.note}</p>
          </div>
        </section>

        <section className="ag-audit ag-section" id="audit" data-archic-view="audit">
          <div className="ag-shell ag-audit-layout">
            <header className="ag-heading" data-reveal><p className="ag-kicker">{c.audit.kicker}</p><h2>{c.audit.title}</h2><p>{c.audit.body}</p></header>
            <div className="ag-audit-output">{c.audit.outputs.map(([no, title, body]) => <article key={no} data-reveal><span>{no}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
            <div className="ag-audit-cta" data-reveal><a className="ag-btn ag-btn-ink" href={auditHref} data-archic-intent="audit:request">{c.audit.cta}</a><p>{c.audit.note}</p></div>
          </div>
        </section>

        <section className="ag-sectors ag-section" id="sectors" data-archic-view="sectors">
          <div className="ag-shell">
            <header className="ag-heading ag-heading-wide" data-reveal><p className="ag-kicker">{c.sectors.kicker}</p><h2>{c.sectors.title}</h2><p>{c.sectors.body}</p></header>
            <div className="ag-sector-list">{c.sectors.items.map(([no, title, body, href]) => href ? <a href={href} key={no} data-reveal data-archic-intent={`sector:${title}`}><span>{no}</span><h3>{title}</h3><p>{body}</p><Arrow /></a> : <article key={no} data-reveal><span>{no}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
          </div>
        </section>

        <section className="ag-evolution ag-section" id="evolution" data-archic-view="evolution">
          <div className="ag-evolution-image"><img src={workAutomotive} alt="" loading="lazy" /></div>
          <div className="ag-evolution-copy" data-reveal><p className="ag-kicker ag-kicker-light">{c.evolution.kicker}</p><h2>{c.evolution.title}</h2><p>{c.evolution.body}</p><ul>{c.evolution.items.map((item) => <li key={item}>{item}</li>)}</ul><a href={pagePath(currentLang, 'studio')} data-archic-intent="evolution:studio">{c.evolution.cta}<Arrow /></a></div>
        </section>

        <section className="ag-close" data-archic-view="closing-cta">
          <img src={heroMarbella} alt="" className="ag-close-image" /><div className="ag-close-shade" aria-hidden="true" />
          <div className="ag-close-copy" data-reveal><h2>{c.close.title[0]}<em>{c.close.title[1]}</em></h2><p>{c.close.body}</p><div className="ag-actions"><a className="ag-btn ag-btn-primary" href={auditHref} data-archic-intent="close:audit">{c.close.audit}</a><a className="ag-btn ag-btn-quiet" href={`tel:${CONTACT_PHONE}`} data-archic-intent="close:call">{c.close.call}</a></div></div>
        </section>
      </main>
      <StudioFooter />
    </div>
  )
}
