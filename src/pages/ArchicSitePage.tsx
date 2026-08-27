import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioContact from '../components/StudioContact'
import StudioExperience from '../components/StudioExperience'
import ArchicProductObject from '../components/ArchicProductObject'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'
import workRealEstate from '../assets/work-realestate.jpg'
import workBocana from '../assets/work-bocana.jpg'
import workAutomotive from '../assets/work-automotive.jpg'
import '../styles/archic-routes-2026.css'

export type ArchicPageKey = 'presence' | 'control' | 'business' | 'studio' | 'contact'
type ProductKey = Exclude<ArchicPageKey, 'contact'>
type Lang = 'es' | 'en'

type ProductCopy = {
  eyebrow: string
  title: string
  accent: string
  intro: string
  roleTitle: string
  roleBody: string
  outcomes: [string, string][]
  capabilitiesTitle: string
  capabilitiesBody: string
  capabilities: [string, string, string][]
  proofTitle: string
  proofBody: string
  fitTitle: string
  fitBody: string
  fit: string[]
  notFitTitle: string
  notFit: string[]
  ctaTitle: string
  ctaBody: string
}

const COPY: Record<Lang, Record<ProductKey, ProductCopy>> = {
  es: {
    presence: {
      eyebrow: '01 / ARCHIC PRESENCE',
      title: 'Lo que ve tu cliente',
      accent: 'antes de hablar contigo.',
      intro: 'Dirección digital, web, contenido y conversión construidos como una sola experiencia. El objetivo no es “tener una web mejor”: es elevar percepción, claridad y capacidad de convertir.',
      roleTitle: 'Presence convierte percepción en una decisión comercial.',
      roleBody: 'Una presencia sólida ordena qué entiende el cliente, qué recuerda, qué compara y cuál es el siguiente paso. Diseño, contenido, producto y tecnología trabajan para la misma señal.',
      outcomes: [
        ['PERCEPCIÓN', 'Que el nivel digital esté a la altura del negocio real.'],
        ['CLARIDAD', 'Que el cliente entienda rápido por qué elegirte y qué hacer después.'],
        ['CONVERSIÓN', 'Que contacto, reserva, solicitud o visita aparezcan en el momento correcto.'],
      ],
      capabilitiesTitle: 'Construimos la presencia como producto, no como escaparate.',
      capabilitiesBody: 'Cada bloque existe para mover una decisión. Si una sección solo llena espacio, sobra.',
      capabilities: [
        ['01', 'Dirección digital', 'Posicionamiento, jerarquía, lenguaje visual, fotografía, motion y criterio de marca aplicados a la experiencia.'],
        ['02', 'Web a medida', 'Arquitectura, páginas críticas, mobile específico y desarrollo sin depender de una plantilla cerrada.'],
        ['03', 'Contenido + conversión', 'Narrativa, catálogo, reservas, formularios, WhatsApp, búsquedas o recorridos según cómo vende el negocio.'],
        ['04', 'Base técnica', 'Rendimiento, accesibilidad, SEO técnico, schema, canonicals, analítica útil y QA de entrega.'],
      ],
      proofTitle: 'La misma capa cambia según el negocio.',
      proofBody: 'No existe un “estilo Archic” que se pega encima. La presencia de una inmobiliaria, un restaurante y una empresa de movilidad debe resolver decisiones distintas.',
      fitTitle: 'Presence encaja cuando la percepción está frenando al negocio.',
      fitBody: 'Puede ser el primer proyecto o la capa pública de un sistema mayor.',
      fit: ['Tu web actual transmite menos nivel que tu negocio.', 'La oferta es buena pero cuesta entenderla o compararla.', 'Hay tráfico o interés, pero el siguiente paso está mal resuelto.', 'Necesitas una presencia propia antes de invertir en software interno.'],
      notFitTitle: 'No empezaríamos por Presence si…',
      notFit: ['El problema principal es operativo y el cliente ya percibe bien la marca.', 'Solo necesitas cambiar colores, textos o una plantilla existente.', 'No hay tiempo ni acceso para definir contenido, oferta y recorridos críticos.'],
      ctaTitle: 'Si el cliente te descubre hoy, ¿ve el negocio que realmente eres?',
      ctaBody: 'Enséñanos la presencia actual y te diremos qué merece cambiar primero.',
    },
    control: {
      eyebrow: '02 / ARCHIC CONTROL',
      title: 'Lo que usa tu equipo',
      accent: 'para que todo fluya.',
      intro: 'Reservas, clientes, recursos, disponibilidad, estados y seguimiento en una capa privada construida alrededor de cómo trabaja realmente el negocio.',
      roleTitle: 'Control convierte una operación dispersa en un sistema entendible.',
      roleBody: 'No se trata de añadir otro dashboard. Se trata de que la información correcta aparezca donde se toma la decisión, con menos mensajes, hojas, duplicados y pasos manuales.',
      outcomes: [
        ['CONTEXTO', 'Clientes, recursos y actividad reunidos donde hacen falta.'],
        ['FLUJO', 'Estados y acciones diseñados alrededor del trabajo real.'],
        ['VISIBILIDAD', 'Saber qué ocurre sin convertir el día a día en reporting.'],
      ],
      capabilitiesTitle: 'La interfaz nace de la operación.',
      capabilitiesBody: 'Primero observamos el flujo. Después decidimos pantallas, datos, permisos y automatizaciones.',
      capabilities: [
        ['01', 'Clientes + historial', 'Perfiles, notas, preferencias, actividad, documentos y contexto sin buscar en cinco lugares.'],
        ['02', 'Reservas + solicitudes', 'Entrada, disponibilidad, confirmación, estados, asignación y seguimiento de extremo a extremo.'],
        ['03', 'Recursos + contenido', 'Mesas, vehículos, inmuebles, servicios, equipo, inventario o cualquier unidad que mueva la operación.'],
        ['04', 'Accesos + señales', 'Roles, permisos, alertas, búsquedas, filtros e indicadores diseñados para decidir, no para decorar.'],
      ],
      proofTitle: 'Tres operaciones. Tres interfaces distintas.',
      proofBody: 'Los datos de estas demos son ficticios. Lo importante es comprobar cómo una misma idea —Control— cambia cuando el recurso central es una mesa, un vehículo o un inmueble.',
      fitTitle: 'Control encaja cuando el trabajo funciona, pero cuesta demasiado hacerlo funcionar.',
      fitBody: 'Suele aparecer cuando el negocio ya tiene demanda y la fricción empieza a crecer con ella.',
      fit: ['El equipo salta entre WhatsApp, hojas, correo y varias herramientas.', 'Se repite información o hay que preguntar para saber el estado real.', 'La disponibilidad o asignación depende demasiado de una persona.', 'Un proceso importante necesita una interfaz propia, no otro parche.'],
      notFitTitle: 'No construiríamos Control si…',
      notFit: ['Una herramienta estándar cubre bien el flujo a un coste razonable.', 'El proceso cambia cada semana y todavía no existe una forma estable de trabajar.', 'La automatización costaría más que la fricción que elimina.'],
      ctaTitle: '¿Qué parte de tu operación sigue dependiendo de memoria, mensajes o hojas sueltas?',
      ctaBody: 'Descríbenos el flujo tal como ocurre hoy. Ahí se ve si merece convertirse en producto.',
    },
    business: {
      eyebrow: '03 / ARCHIC BUSINESS',
      title: 'Cuando tu ventaja',
      accent: 'necesita software propio.',
      intro: 'Software a medida, automatización, integraciones y datos cuando una herramienta estándar obliga al negocio a trabajar peor o impide hacer algo valioso.',
      roleTitle: 'Business convierte lógica de negocio en capacidad propia.',
      roleBody: 'El software a medida tiene sentido cuando codifica una ventaja, elimina una restricción importante o conecta procesos que hoy pierden tiempo y datos entre sistemas.',
      outcomes: [
        ['CAPACIDAD', 'Hacer algo que las herramientas actuales no permiten bien.'],
        ['AUTOMATIZACIÓN', 'Quitar pasos repetitivos sin perder control ni contexto.'],
        ['INTEGRACIÓN', 'Conectar datos y sistemas para que el proceso sea uno solo.'],
      ],
      capabilitiesTitle: 'Construimos solo la lógica que merece ser propia.',
      capabilitiesBody: 'Si comprar resuelve mejor, compramos. Si integrar basta, integramos. El desarrollo propio entra cuando crea una diferencia real.',
      capabilities: [
        ['01', 'Software a medida', 'Herramientas internas, portales, configuradores, motores de reglas y productos digitales para necesidades concretas.'],
        ['02', 'Integraciones', 'ERP, CRM, pagos, correo, calendarios, APIs, datos y sistemas existentes trabajando como un único flujo.'],
        ['03', 'Automatización', 'Procesos repetitivos, clasificación, generación, sincronización y tareas operativas con supervisión donde importa.'],
        ['04', 'Datos + observabilidad', 'Eventos, trazabilidad, métricas útiles, errores y señales para saber qué hace el sistema y dónde mejorar.'],
      ],
      proofTitle: 'El valor está en el flujo completo, no en una pantalla.',
      proofBody: 'Business conecta entradas, reglas, herramientas existentes y salidas. La interfaz es solo una parte de una arquitectura que debe seguir siendo operable y entendible.',
      fitTitle: 'Business encaja cuando una limitación tecnológica ya tiene coste de negocio.',
      fitBody: 'No hace falta empezar grande. Sí hace falta que el problema sea suficientemente claro para medir si lo resolvemos.',
      fit: ['Hay un proceso crítico que ninguna herramienta cubre bien.', 'La misma información se copia entre varios sistemas.', 'Una tarea repetitiva consume horas y sigue reglas claras.', 'Existe una oportunidad de producto o servicio que necesita lógica propia.'],
      notFitTitle: 'No desarrollaríamos a medida si…',
      notFit: ['Existe un SaaS sólido que resuelve el 90% sin bloquear el negocio.', 'La idea aún no tiene un usuario, proceso o señal de valor definida.', 'El objetivo es “tener IA” o “automatizar” sin un problema concreto detrás.'],
      ctaTitle: '¿Qué debería poder hacer tu negocio que hoy la tecnología no le permite?',
      ctaBody: 'Empieza por la restricción, no por la solución. Nosotros hacemos el mapa técnico después.',
    },
    studio: {
      eyebrow: '04 / ARCHIC STUDIO',
      title: 'Dirección humana.',
      accent: 'Capacidad aumentada.',
      intro: 'Diseño, producto, desarrollo e IA supervisada trabajando como un mismo equipo. Archic existe para construir mejor y más rápido sin delegar el criterio final en una herramienta.',
      roleTitle: 'El estándar importa más que la herramienta con la que llegamos a él.',
      roleBody: 'Usamos IA para ampliar investigación, exploración, desarrollo, QA y capacidad operativa. La dirección, el contexto, las decisiones y la responsabilidad de entrega siguen siendo humanas.',
      outcomes: [
        ['DIRECCIÓN', 'Una decisión clara antes de multiplicar opciones.'],
        ['VELOCIDAD', 'Más iteración útil sin convertir velocidad en descuido.'],
        ['CONTROL', 'Código, assets, QA y decisiones verificables en cada entrega.'],
      ],
      capabilitiesTitle: 'Un proceso pensado para reducir errores de criterio.',
      capabilitiesBody: 'La IA acelera partes del trabajo. El método evita que esa velocidad se convierta en más ruido.',
      capabilities: [
        ['01', 'Entender', 'Negocio, cliente, operación, competencia, restricciones y señal que demostraría valor.'],
        ['02', 'Definir', 'Arquitectura, recorridos, alcance, dirección visual y decisiones críticas antes de construir.'],
        ['03', 'Construir + forzar', 'Producto real, mobile, recorridos críticos, rendimiento, accesibilidad, búsqueda y QA visual.'],
        ['04', 'Entregar + mejorar', 'Código y activos portables, medición útil y siguiente movimiento basado en uso real.'],
      ],
      proofTitle: 'Quality Standard: la entrega no se aprueba por intuición.',
      proofBody: 'Mobile específico, recorridos críticos, render real, rendimiento, accesibilidad, búsqueda, integridad y propiedad forman parte de la condición de entrega.',
      fitTitle: 'Trabajamos mejor cuando el proyecto necesita criterio, no solo ejecución.',
      fitBody: 'No necesitamos que el encargo sea enorme. Necesitamos que exista una decisión importante que merezca hacerse bien.',
      fit: ['El negocio necesita elevar percepción y resolver operación a la vez.', 'Hay que unir diseño, producto y tecnología sin perder coherencia.', 'Quieres velocidad de IA con revisión y responsabilidad humana.', 'El resultado debe ser portable, verificable y preparado para crecer.'],
      notFitTitle: 'No somos el mejor encaje si…',
      notFit: ['Buscas la opción más barata para replicar una plantilla.', 'El alcance está cerrado a ejecutar sin poder cuestionar decisiones que dañan el resultado.', 'No existe disponibilidad para colaborar en información crítica del negocio.'],
      ctaTitle: 'Cuéntanos el problema. No hace falta que traigas la solución.',
      ctaBody: 'Si vemos una oportunidad clara, te diremos qué construiríamos primero y qué dejaríamos fuera.',
    },
  },
  en: {
    presence: {
      eyebrow: '01 / ARCHIC PRESENCE', title: 'What your customer sees', accent: 'before talking to you.',
      intro: 'Digital direction, web, content and conversion built as one experience. The goal is not to “have a better website”; it is to raise perception, clarity and conversion capacity.',
      roleTitle: 'Presence turns perception into a commercial decision.', roleBody: 'A strong presence orders what the customer understands, remembers, compares and does next. Design, content, product and technology work toward the same signal.',
      outcomes: [['PERCEPTION','Make the digital standard match the real business.'],['CLARITY','Help customers understand why to choose you and what to do next.'],['CONVERSION','Place contact, booking, enquiry or visit at the right moment.']],
      capabilitiesTitle: 'We build presence as a product, not a showcase.', capabilitiesBody: 'Every block exists to move a decision. If a section only fills space, it goes.',
      capabilities: [['01','Digital direction','Positioning, hierarchy, visual language, imagery, motion and brand judgement applied to the experience.'],['02','Bespoke web','Architecture, critical pages, mobile-specific composition and development without closed-template lock-in.'],['03','Content + conversion','Narrative, catalogue, bookings, forms, WhatsApp, search or journeys based on how the business sells.'],['04','Technical base','Performance, accessibility, technical SEO, schema, canonicals, useful analytics and delivery QA.']],
      proofTitle: 'The same layer changes with the business.', proofBody: 'There is no “Archic style” pasted on top. Real estate, hospitality and mobility need to resolve different customer decisions.',
      fitTitle: 'Presence fits when perception is holding the business back.', fitBody: 'It can be the first project or the public layer of a larger system.',
      fit: ['Your current website communicates less quality than the real business.','The offer is strong but difficult to understand or compare.','There is traffic or interest, but the next step is poorly resolved.','You need a strong public layer before investing in internal software.'],
      notFitTitle: 'We would not start with Presence if…', notFit: ['The main problem is operational and customers already perceive the brand well.','You only need colours, copy or a template changed.','There is no time or access to define content, offer and critical journeys.'],
      ctaTitle: 'If a customer finds you today, do they see the business you really are?', ctaBody: 'Show us the current presence and we will tell you what is worth changing first.',
    },
    control: {
      eyebrow: '02 / ARCHIC CONTROL', title: 'What your team uses', accent: 'to keep everything moving.',
      intro: 'Bookings, customers, resources, availability, states and follow-up in a private layer built around how the business actually works.',
      roleTitle: 'Control turns a scattered operation into an understandable system.', roleBody: 'This is not about adding another dashboard. It is about putting the right information where decisions happen, with fewer messages, sheets, duplicates and manual steps.',
      outcomes: [['CONTEXT','Customers, resources and activity together where needed.'],['FLOW','States and actions designed around the real work.'],['VISIBILITY','Know what is happening without turning daily work into reporting.']],
      capabilitiesTitle: 'The interface starts with the operation.', capabilitiesBody: 'We observe the flow first. Then we decide screens, data, permissions and automation.',
      capabilities: [['01','Customers + history','Profiles, notes, preferences, activity, documents and context without searching five places.'],['02','Bookings + enquiries','Intake, availability, confirmation, states, assignment and follow-up end to end.'],['03','Resources + content','Tables, vehicles, properties, services, team, inventory or any unit driving the operation.'],['04','Access + signals','Roles, permissions, alerts, search, filters and indicators designed to decide, not decorate.']],
      proofTitle: 'Three operations. Three different interfaces.', proofBody: 'The data in these demos is fictional. What matters is seeing how the same Control idea changes when the central resource is a table, a vehicle or a property.',
      fitTitle: 'Control fits when work functions, but costs too much effort to keep functioning.', fitBody: 'It often appears once demand exists and friction starts growing with it.',
      fit: ['The team jumps between WhatsApp, sheets, email and several tools.','Information is repeated or people must ask to know the real state.','Availability or assignment depends too heavily on one person.','An important process needs its own interface, not another patch.'],
      notFitTitle: 'We would not build Control if…', notFit: ['A standard tool covers the flow well at a reasonable cost.','The process changes every week and no stable way of working exists yet.','Automation would cost more than the friction it removes.'],
      ctaTitle: 'Which part of your operation still depends on memory, messages or loose sheets?', ctaBody: 'Describe the flow as it happens today. That shows whether it deserves to become product.',
    },
    business: {
      eyebrow: '03 / ARCHIC BUSINESS', title: 'When your advantage', accent: 'needs its own software.',
      intro: 'Custom software, automation, integrations and data when a standard tool forces the business to work worse or prevents something valuable.',
      roleTitle: 'Business turns business logic into owned capability.', roleBody: 'Custom software makes sense when it encodes an advantage, removes an important constraint or connects processes that lose time and data between systems.',
      outcomes: [['CAPABILITY','Do something current tools do not support well.'],['AUTOMATION','Remove repetitive steps without losing control or context.'],['INTEGRATION','Connect data and systems so the process behaves as one.']],
      capabilitiesTitle: 'We only build the logic that deserves to be owned.', capabilitiesBody: 'If buying solves it better, we buy. If integration is enough, we integrate. Custom development enters when it creates a real difference.',
      capabilities: [['01','Custom software','Internal tools, portals, configurators, rules engines and digital products for specific needs.'],['02','Integrations','ERP, CRM, payments, email, calendars, APIs, data and existing systems working as one flow.'],['03','Automation','Repetitive processes, classification, generation, synchronisation and operational tasks with supervision where it matters.'],['04','Data + observability','Events, traceability, useful metrics, errors and signals to know what the system does and where to improve.']],
      proofTitle: 'The value lives in the whole flow, not a screen.', proofBody: 'Business connects inputs, rules, existing tools and outputs. The interface is only one part of an architecture that must stay operable and understandable.',
      fitTitle: 'Business fits when a technology limitation already has a business cost.', fitBody: 'It does not need to start large. The problem does need to be clear enough to measure whether we solved it.',
      fit: ['A critical process is not covered well by any tool.','The same information is copied between several systems.','A repetitive task consumes hours and follows clear rules.','A product or service opportunity needs owned logic.'],
      notFitTitle: 'We would not build custom software if…', notFit: ['A solid SaaS solves 90% without blocking the business.','The idea has no defined user, process or value signal yet.','The goal is to “have AI” or “automate” without a concrete problem.'],
      ctaTitle: 'What should your business be able to do that technology does not let it do today?', ctaBody: 'Start with the constraint, not the solution. We map the technical answer afterwards.',
    },
    studio: {
      eyebrow: '04 / ARCHIC STUDIO', title: 'Human direction.', accent: 'Augmented capability.',
      intro: 'Design, product, development and supervised AI working as one team. Archic exists to build better and faster without delegating final judgement to a tool.',
      roleTitle: 'The standard matters more than the tool used to reach it.', roleBody: 'We use AI to expand research, exploration, development, QA and operational capacity. Direction, context, decisions and delivery responsibility remain human.',
      outcomes: [['DIRECTION','A clear decision before multiplying options.'],['SPEED','More useful iteration without turning speed into carelessness.'],['CONTROL','Code, assets, QA and verifiable decisions in every delivery.']],
      capabilitiesTitle: 'A process designed to reduce judgement errors.', capabilitiesBody: 'AI accelerates parts of the work. The method stops that speed becoming more noise.',
      capabilities: [['01','Understand','Business, customer, operation, competition, constraints and the signal that would prove value.'],['02','Define','Architecture, journeys, scope, visual direction and critical decisions before building.'],['03','Build + stress','Real product, mobile, critical journeys, performance, accessibility, search and visual QA.'],['04','Deliver + improve','Portable code and assets, useful measurement and the next move based on real usage.']],
      proofTitle: 'Quality Standard: delivery is not approved by intuition.', proofBody: 'Mobile-specific design, critical journeys, real rendering, performance, accessibility, search, integrity and ownership are delivery conditions.',
      fitTitle: 'We work best when the project needs judgement, not only execution.', fitBody: 'The project does not need to be huge. It needs an important decision worth doing well.',
      fit: ['The business needs to elevate perception and solve operations together.','Design, product and technology must stay coherent.','You want AI speed with human review and accountability.','The result must be portable, verifiable and ready to grow.'],
      notFitTitle: 'We are not the best fit if…', notFit: ['You want the cheapest way to reproduce a template.','The scope is fixed to execution and key decisions cannot be challenged.','There is no availability to collaborate on critical business information.'],
      ctaTitle: 'Tell us the problem. You do not need to bring the solution.', ctaBody: 'If we see a clear opportunity, we will tell you what we would build first and what we would leave out.',
    },
  },
}

const PAGE_INDEX: Record<ProductKey, string> = { presence: '01', control: '02', business: '03', studio: '04' }

const SEARCH_INTENTS: Partial<Record<Exclude<ProductKey, 'studio'>, [string, string, string][]>> = {
  presence: [
    ['Restaurantes', 'Web, reserva y experiencia móvil', '/diseno-web-restaurantes/'],
    ['Inmobiliarias', 'Catálogo, leads y marca', '/diseno-web-inmobiliarias/'],
    ['Alquiler de coches', 'Flota, disponibilidad y solicitud', '/diseno-web-alquiler-coches/'],
    ['Marbella', 'Diseño web para negocios premium', '/diseno-web-marbella/'],
  ],
  control: [
    ['Software de reservas', 'Disponibilidad, clientes y recursos', '/software-reservas-a-medida/'],
    ['CRM a medida', 'Leads, historial y proceso comercial', '/crm-a-medida/'],
  ],
  business: [
    ['Precio de software a medida', 'Qué determina el coste real', '/precio-software-a-medida/'],
    ['Desarrollo a medida', 'Software, integraciones y automatización', '/desarrollo-web-a-medida/'],
  ],
}

const WORK_PROOF = [
  { name: 'Marbella For Sale', kind: 'REAL ESTATE', image: workRealEstate, slug: 'real-estate' },
  { name: 'La Bocana', kind: 'HOSPITALITY', image: workBocana, slug: 'hospitality' },
  { name: 'Five Star Rentals', kind: 'MOBILITY', image: workAutomotive, slug: 'mobility' },
] as const

const CONTROL_PROOF = [
  { code: '01', name: 'Hospitality', es: 'Reservas + sala', en: 'Bookings + floor', preview: '/software/hospitality-preview.svg', slug: 'hospitality' },
  { code: '02', name: 'Mobility', es: 'Flota + solicitudes', en: 'Fleet + enquiries', preview: '/software/mobility-preview.svg', slug: 'mobility' },
  { code: '03', name: 'Real estate', es: 'Portfolio + CRM', en: 'Portfolio + CRM', preview: '/software/real-estate-preview.svg', slug: 'real-estate' },
] as const

function path(lang: Lang, slug: string) {
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

function explorationPath(lang: Lang, slug: string) {
  return lang === 'en' ? `/en/explorations/${slug}/` : `/explorations/${slug}/`
}

function Arrow() {
  return <i className="as-arrow" aria-hidden="true" />
}

function SectionHead({ index, title, body, dark = false }: { index: string; title: string; body: string; dark?: boolean }) {
  return (
    <header className={`ar-head${dark ? ' ar-head-dark' : ''}`} data-reveal>
      <span>{index}</span>
      <div><h2>{title}</h2><p>{body}</p></div>
    </header>
  )
}

function PresenceProof({ lang }: { lang: Lang }) {
  return (
    <div className="ar-presence-proof">
      {WORK_PROOF.map((item, index) => (
        <a href={explorationPath(lang, item.slug)} key={item.name} data-reveal data-archic-intent={`presence-proof:${item.slug}`}>
          <div><img src={item.image} alt="" loading="lazy" /><span>0{index + 1} / {item.kind}</span></div>
          <strong>{item.name}</strong>
          <small>{lang === 'es' ? 'CONCEPT BUILD · ABRIR' : 'CONCEPT BUILD · OPEN'}</small>
        </a>
      ))}
    </div>
  )
}

function ControlProof({ lang }: { lang: Lang }) {
  return (
    <div className="ar-control-proof">
      {CONTROL_PROOF.map((item) => (
        <a href={explorationPath(lang, item.slug)} key={item.slug} data-reveal data-archic-intent={`control-proof:${item.slug}`}>
          <div className="ar-control-preview"><img src={item.preview} alt="" loading="lazy" /></div>
          <div className="ar-control-meta"><span>{item.code}</span><div><strong>{item.name}</strong><small>{lang === 'es' ? item.es : item.en}</small></div><Arrow /></div>
          <em>{lang === 'es' ? 'DATOS FICTICIOS / DEMO' : 'FICTIONAL DATA / DEMO'}</em>
        </a>
      ))}
    </div>
  )
}

function BusinessProof({ lang }: { lang: Lang }) {
  const es = lang === 'es'
  return (
    <div className="ar-business-proof" data-reveal>
      <div className="ar-business-flow">
        <article><span>01 / INPUT</span><strong>{es ? 'Solicitud' : 'Enquiry'}</strong><small>CRM · FORM · API</small></article>
        <i />
        <article><span>02 / LOGIC</span><strong>{es ? 'Reglas + contexto' : 'Rules + context'}</strong><small>ARCHIC / OWNED LOGIC</small></article>
        <i />
        <article><span>03 / SYSTEM</span><strong>{es ? 'Acción' : 'Action'}</strong><small>ERP · EMAIL · CALENDAR</small></article>
        <i />
        <article><span>04 / SIGNAL</span><strong>{es ? 'Resultado' : 'Outcome'}</strong><small>DATA · TRACE · NEXT STEP</small></article>
      </div>
      <div className="ar-business-rules">
        <span>{es ? 'PRINCIPIOS DE ARQUITECTURA' : 'ARCHITECTURE PRINCIPLES'}</span>
        <p>{es ? 'Comprar antes que construir cuando resuelve bien.' : 'Buy before building when it solves the problem well.'}</p>
        <p>{es ? 'Una fuente de verdad para cada dato importante.' : 'One source of truth for each important piece of data.'}</p>
        <p>{es ? 'Trazabilidad en automatizaciones y decisiones críticas.' : 'Traceability across automation and critical decisions.'}</p>
        <p>{es ? 'Fallos visibles y recuperables, no magia opaca.' : 'Failures stay visible and recoverable, not opaque magic.'}</p>
      </div>
    </div>
  )
}

function StudioProof({ lang }: { lang: Lang }) {
  const es = lang === 'es'
  const items = es
    ? ['Mobile específico', 'Recorridos críticos', 'QA visual final', 'Rendimiento + accesibilidad', 'Search & AI readiness', 'Integridad', 'Propiedad']
    : ['Mobile-specific', 'Critical journeys', 'Final visual QA', 'Performance + accessibility', 'Search & AI readiness', 'Integrity', 'Ownership']
  return (
    <div className="ar-standard" data-reveal>
      <div className="ar-standard-head"><span>ARCHIC QUALITY STANDARD / REQUIRED</span><b>PASS / REQUIRED</b></div>
      <div>{items.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong><b>✓</b></article>)}</div>
      <p>{es ? 'Si una entrega no supera el estándar, no cuenta como terminada.' : 'If a delivery does not pass the standard, it is not finished.'}</p>
    </div>
  )
}

function Proof({ page, lang }: { page: ProductKey; lang: Lang }) {
  if (page === 'presence') return <PresenceProof lang={lang} />
  if (page === 'control') return <ControlProof lang={lang} />
  if (page === 'business') return <BusinessProof lang={lang} />
  return <StudioProof lang={lang} />
}

function SystemMap({ current, lang }: { current: ProductKey; lang: Lang }) {
  if (current === 'studio') return null
  const es = lang === 'es'
  const layers: [Exclude<ProductKey, 'studio'>, string, string][] = [
    ['presence', 'Presence', es ? 'Percepción + conversión' : 'Perception + conversion'],
    ['control', 'Control', es ? 'Operación privada' : 'Private operations'],
    ['business', 'Business', es ? 'Software + automatización' : 'Software + automation'],
  ]
  return (
    <section className="ar-system-map" data-archic-view="product-system-map">
      <div className="ar-shell">
        <div className="ar-system-map-head" data-reveal><span>{es ? 'UN SISTEMA / TRES CAPAS' : 'ONE SYSTEM / THREE LAYERS'}</span><p>{es ? 'Empieza por la capa donde hoy se pierde más valor. Las demás pueden entrar después.' : 'Start with the layer where the most value is being lost today. The others can follow later.'}</p></div>
        <div className="ar-system-map-grid">
          {layers.map(([slug, name, meta], index) => (
            <a href={path(lang, slug)} key={slug} data-current={current === slug} data-reveal data-archic-intent={`product-map:${slug}`}>
              <span>0{index + 1}</span><strong>{name}</strong><small>{meta}</small><Arrow />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactPage({ lang }: { lang: Lang }) {
  const es = lang === 'es'
  const outcomes = es
    ? [['01', 'Negocio', 'Qué vendes, a quién y cómo ocurre una venta, reserva o decisión.'], ['02', 'Fricción', 'Qué está fallando, costando tiempo o limitando crecimiento.'], ['03', 'Resultado', 'Qué debería ser distinto si el proyecto funciona.'], ['04', 'Rango', 'Prioridad, dependencias e inversión razonable antes de diseñar.']]
    : [['01', 'Business', 'What you sell, to whom and how a sale, booking or decision happens.'], ['02', 'Friction', 'What is failing, costing time or limiting growth.'], ['03', 'Outcome', 'What should be different if the project works.'], ['04', 'Range', 'Priority, dependencies and a reasonable investment before design.']]

  return (
    <div className="as-site ar-site ar-contact-route" data-quality-standard="archic-public-2026.2">
      <Helmet><title>{es ? 'Diagnóstico y contacto — Archic' : 'Diagnosis and contact — Archic'}</title><meta name="description" content={es ? 'Cuéntanos qué debe cambiar en tu presencia, operación o software. Archic diagnostica primero y define la solución después.' : 'Tell us what needs to change across presence, operations or software. Archic diagnoses first and defines the solution afterwards.'} /></Helmet>
      <StudioExperience />
      <StudioHeader />
      <main id="main-content">
        <section className="ar-contact-intro">
          <div className="ar-shell">
            <p className="ar-kicker" data-reveal="hero">{es ? 'ARCHIC / DIAGNÓSTICO' : 'ARCHIC / DIAGNOSIS'}</p>
            <div className="ar-contact-title" data-reveal="hero">
              <h1>{es ? 'Cuéntanos qué debe cambiar.' : 'Tell us what needs to change.'}<span>{es ? 'La solución viene después.' : 'The solution comes afterwards.'}</span></h1>
              <p>{es ? 'No hace falta preparar un briefing perfecto. Necesitamos entender el negocio, la fricción y el resultado que tendría valor. Si una herramienta estándar o una solución más simple es suficiente, también te lo diremos.' : 'You do not need a perfect brief. We need to understand the business, the friction and the outcome that would create value. If a standard tool or simpler solution is enough, we will say so.'}</p>
            </div>
            <div className="ar-contact-diagnosis">
              {outcomes.map(([no, title, body]) => <article key={no} data-reveal><span>{no}</span><strong>{title}</strong><p>{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="ar-contact-workspace">
          <div className="ar-shell ar-contact-layout">
            <aside data-reveal>
              <span>{es ? 'ANTES DE ENVIAR' : 'BEFORE SENDING'}</span>
              <h2>{es ? 'Cuanto más concreto sea el problema, mejor será la primera respuesta.' : 'The clearer the problem, the better the first response.'}</h2>
              <p>{es ? 'Puedes escribir poco. Prioriza hechos: cómo funciona hoy, dónde se atasca y qué resultado justificaría hacer el proyecto.' : 'You can write very little. Prioritise facts: how it works today, where it gets stuck and what outcome would justify the project.'}</p>
              <a href={`tel:${CONTACT_PHONE}`} data-archic-intent="contact-route:call"><small>{es ? 'LLAMAR DIRECTAMENTE' : 'CALL DIRECTLY'}</small><strong>{CONTACT_PHONE_DISPLAY}</strong><Arrow /></a>
            </aside>
            <div className="ar-contact-form" data-reveal>
              <div className="ar-form-head"><span>ARCHIC / PROJECT INPUT</span><b>{es ? 'RESPUESTA 24–48 H LABORABLES' : 'REPLY WITHIN 24–48 BUSINESS HOURS'}</b></div>
              <StudioContact />
            </div>
          </div>
        </section>
      </main>
      <StudioFooter />
    </div>
  )
}

export default function ArchicSitePage({ page }: { page: ArchicPageKey }) {
  const { lang } = useLang()
  const currentLang = lang as Lang
  if (page === 'contact') return <ContactPage lang={currentLang} />

  const c = COPY[currentLang][page]
  const pageIndex = PAGE_INDEX[page]
  const intents = currentLang === 'es' && page !== 'studio' ? SEARCH_INTENTS[page] ?? [] : []
  const es = currentLang === 'es'

  return (
    <div className={`as-site ar-site ar-route ar-${page}`} data-quality-standard="archic-public-2026.2">
      <Helmet><title>{`${c.eyebrow.split('/').pop()?.trim()} — Archic`}</title><meta name="description" content={c.intro} /></Helmet>
      <StudioExperience />
      <StudioHeader />

      <main id="main-content">
        <section className="ar-hero" data-archic-view={`${page}-hero`}>
          <div className="ar-shell ar-hero-grid">
            <div className="ar-hero-copy" data-reveal="hero">
              <p className="ar-kicker">{c.eyebrow}</p>
              <h1>{c.title}<span>{c.accent}</span></h1>
              <p>{c.intro}</p>
              <div className="ar-hero-actions">
                <a href={path(currentLang, 'contact')} data-archic-intent={`${page}:diagnosis`}>{es ? 'Cuéntanos qué debe cambiar' : 'Tell us what needs to change'}</a>
                <a href="#capabilities" data-archic-intent={`${page}:capabilities`}>{es ? 'Ver qué construimos' : 'See what we build'}<Arrow /></a>
              </div>
            </div>
            <div className="ar-hero-object"><ArchicProductObject page={page} /></div>
          </div>
          <div className="ar-layer-index"><div className="ar-shell"><span>{pageIndex}</span><strong>{page.toUpperCase()}</strong><i /><small>ARCHIC / DIGITAL SYSTEM</small></div></div>
        </section>

        <section className="ar-role ar-section" data-archic-view={`${page}-role`}>
          <div className="ar-shell">
            <SectionHead index={`01 / ${es ? 'FUNCIÓN' : 'ROLE'}`} title={c.roleTitle} body={c.roleBody} />
            <div className="ar-outcomes">
              {c.outcomes.map(([label, body], index) => <article key={label} data-reveal><span>0{index + 1}</span><strong>{label}</strong><p>{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="ar-capabilities ar-section" id="capabilities" data-archic-view={`${page}-capabilities`}>
          <div className="ar-shell">
            <SectionHead index={`02 / ${es ? 'QUÉ CONSTRUIMOS' : 'WHAT WE BUILD'}`} title={c.capabilitiesTitle} body={c.capabilitiesBody} />
            <div className="ar-capability-list">
              {c.capabilities.map(([no, title, body]) => <article key={no} data-reveal><span>{no}</span><h3>{title}</h3><p>{body}</p><b>↗</b></article>)}
            </div>
          </div>
        </section>

        <section className="ar-proof ar-section" data-archic-view={`${page}-proof`}>
          <div className="ar-shell">
            <SectionHead index={`03 / ${es ? 'PRUEBA' : 'PROOF'}`} title={c.proofTitle} body={c.proofBody} dark={page !== 'presence'} />
            <Proof page={page} lang={currentLang} />
          </div>
        </section>

        <section className="ar-fit ar-section" data-archic-view={`${page}-fit`}>
          <div className="ar-shell">
            <SectionHead index={`04 / ${es ? 'ENCAJE' : 'FIT'}`} title={c.fitTitle} body={c.fitBody} />
            <div className="ar-fit-grid">
              <div><span>{es ? 'TIENE SENTIDO CUANDO' : 'MAKES SENSE WHEN'}</span>{c.fit.map((item, index) => <p key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</p>)}</div>
              <div><span>{c.notFitTitle}</span>{c.notFit.map((item, index) => <p key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</p>)}</div>
            </div>
          </div>
        </section>

        {intents.length > 0 && (
          <section className="ar-intents" data-archic-view={`${page}-use-cases`}>
            <div className="ar-shell ar-intents-grid">
              <div data-reveal><span>{es ? 'CASOS DE USO' : 'USE CASES'}</span><h2>{es ? 'Empieza por el problema que estás intentando resolver.' : 'Start with the problem you are trying to solve.'}</h2></div>
              <div>{intents.map(([label, desc, href], index) => <a href={href} key={href} data-reveal><span>0{index + 1}</span><div><strong>{label}</strong><small>{desc}</small></div><Arrow /></a>)}</div>
            </div>
          </section>
        )}

        <SystemMap current={page} lang={currentLang} />

        <section className="ar-next" data-archic-view={`${page}-next`}>
          <div className="ar-shell ar-next-grid">
            <div data-reveal><p className="ar-kicker">{es ? 'SIGUIENTE PASO' : 'NEXT STEP'}</p><h2>{c.ctaTitle}</h2><p>{c.ctaBody}</p></div>
            <div className="ar-next-actions" data-reveal>
              <a className="ar-next-primary" href={path(currentLang, 'contact')} data-archic-intent={`${page}:next-contact`}>{es ? 'Solicitar diagnóstico' : 'Request a diagnosis'}</a>
              <a className="ar-next-call" href={`tel:${CONTACT_PHONE}`} data-archic-intent={`${page}:next-call`}><small>{es ? 'LLAMAR DIRECTAMENTE' : 'CALL DIRECTLY'}</small><strong>{CONTACT_PHONE_DISPLAY}</strong><Arrow /></a>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  )
}
