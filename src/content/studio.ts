import type { Lang } from '../i18n/content'

export type SystemImage = 'hospitality' | 'automotive' | 'yachting'

export type StudioContent = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string }
  nav: { capabilities: string; systems: string; sectors: string; about: string; cta: string }
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    lead: string
    ctaPrimary: string
    ctaSecondary: string
    metaLeft: string
    metaRight: string
    nodes: { code: string; name: string; line: string }[]
  }
  statement: { kicker: string; titleA: string; titleB: string; body: string; points: string[] }
  system: {
    kicker: string
    title: string
    titleB: string
    lead: string
    steps: { code: string; name: string; label: string; desc: string }[]
    care: string
  }
  concepts: {
    kicker: string
    title: string
    note: string
    items: {
      index: string
      sector: string
      title: string
      desc: string
      features: string[]
      image: SystemImage
      imageAlt: string
    }[]
  }
  showcase: {
    kicker: string
    title: string
    titleB: string
    lead: string
    bullets: string[]
    browserLabel: string
    dashboard: string
    bookings: string
    guests: string
    occupancy: string
    direct: string
    activity: string
    nextService: string
    returning: string
    notes: string
    mobileTitle: string
    mobileRows: { time: string; name: string; meta: string }[]
  }
  sectors: {
    kicker: string
    title: string
    note: string
    items: { name: string; line: string }[]
  }
  process: {
    kicker: string
    title: string
    lead: string
    steps: { code: string; name: string; desc: string }[]
  }
  cta: {
    label: string
    title: string
    titleAccent: string
    lead: string
    mailLabel: string
    formTitle: string
  }
  footer: { tagline: string; base: string; rights: string; legal: string; systems: string }
}

const es: StudioContent = {
  meta: {
    title: 'Archic — La parte digital de negocios excepcionales',
    description: 'Archic diseña y desarrolla webs premium, reservas, operaciones y software a medida para negocios ambiciosos. Estrategia, diseño y tecnología en un sistema conectado.',
    ogTitle: 'Archic — Construimos la parte digital de negocios excepcionales',
    ogDescription: 'Presence, Bookings, Control y Business: experiencia digital, reservas, operaciones y software a medida.',
  },
  nav: {
    capabilities: 'Capacidades',
    systems: 'Sistema',
    sectors: 'Sectores',
    about: 'Estudio',
    cta: 'Empezar proyecto',
  },
  hero: {
    eyebrow: 'ARCHIC — DIGITAL SYSTEMS STUDIO',
    title: 'Construimos la parte digital de negocios',
    titleAccent: 'excepcionales.',
    lead: 'Estrategia, diseño y tecnología trabajando como un solo sistema: desde la presencia pública hasta las herramientas que hacen funcionar el negocio.',
    ctaPrimary: 'Empezar proyecto',
    ctaSecondary: 'Ver capacidades',
    metaLeft: 'España · Remoto y presencial',
    metaRight: 'Web · Reservas · Operaciones · Software',
    nodes: [
      { code: '01', name: 'Presence', line: 'Marca, web y conversión' },
      { code: '02', name: 'Bookings', line: 'Reservas y solicitudes' },
      { code: '03', name: 'Control', line: 'Clientes y operaciones' },
      { code: '04', name: 'Business', line: 'Datos y software a medida' },
    ],
  },
  statement: {
    kicker: 'MÁS ALLÁ DE UNA WEB',
    titleA: 'La web es la puerta de entrada.',
    titleB: 'El sistema detrás es lo que multiplica su valor.',
    body: 'No separamos diseño, producto y operaciones. Diseñamos la experiencia que ve el cliente y, cuando tiene sentido, la conectamos con reservas, clientes, recursos, automatización y software propio.',
    points: ['Una experiencia coherente', 'Menos dependencia de terceros', 'Más control operativo', 'Una base preparada para crecer'],
  },
  system: {
    kicker: 'QUÉ CONSTRUIMOS',
    title: 'Cuatro capas.',
    titleB: 'Un sistema conectado.',
    lead: 'Se puede empezar por una sola necesidad. Cada capa está pensada para convivir con las demás sin rehacer el negocio digital cada vez que crece.',
    steps: [
      { code: '01', name: 'Presence', label: 'Experiencia pública', desc: 'Web premium, dirección visual, contenido, conversión, SEO técnico y experiencia móvil.' },
      { code: '02', name: 'Bookings', label: 'Captación y reservas', desc: 'Reservas, solicitudes, disponibilidad, confirmaciones, formularios y canales de contacto.' },
      { code: '03', name: 'Control', label: 'Operación', desc: 'Paneles, clientes, recursos, estados, permisos, flujos de trabajo y visibilidad diaria.' },
      { code: '04', name: 'Business', label: 'Crecimiento', desc: 'Integraciones, automatización, analítica, herramientas internas y software totalmente a medida.' },
    ],
    care: 'Care — mantenimiento, seguridad, soporte y evolución continua del sistema.',
  },
  concepts: {
    kicker: 'CAPACIDADES EN ACCIÓN',
    title: 'Demostraciones conceptuales, no trabajo de cliente.',
    note: 'Antes de tener un portfolio real preferimos enseñar con transparencia el nivel de producto que sabemos diseñar y construir.',
    items: [
      {
        index: '01', sector: 'HOSTELERÍA', title: 'Hospitality system',
        desc: 'Una experiencia conectada desde la reserva hasta la operación del servicio y el histórico del cliente.',
        features: ['Web + reserva directa', 'Clientes y preferencias', 'Operación y servicio'], image: 'hospitality',
        imageAlt: 'Concepto de sistema digital para hostelería premium',
      },
      {
        index: '02', sector: 'AUTOMOCIÓN', title: 'Automotive system',
        desc: 'Presentación de flota, disponibilidad, solicitudes y seguimiento comercial sin romper la experiencia premium.',
        features: ['Catálogo y disponibilidad', 'Solicitudes cualificadas', 'Seguimiento comercial'], image: 'automotive',
        imageAlt: 'Concepto de sistema digital para automoción premium',
      },
      {
        index: '03', sector: 'NÁUTICA', title: 'Yachting system',
        desc: 'Charter, leads, disponibilidad y operativa conectados en una experiencia sobria y de alto valor percibido.',
        features: ['Charter y enquiries', 'Disponibilidad', 'Operaciones'], image: 'yachting',
        imageAlt: 'Concepto de sistema digital para náutica premium',
      },
    ],
  },
  showcase: {
    kicker: 'ARCHIC CONTROL — CONCEPTO',
    title: 'No solo diseñamos lo que se ve.',
    titleB: 'Diseñamos lo que hace funcionar el negocio.',
    lead: 'Este prototipo de Control muestra el tipo de software operativo que podemos construir sobre la misma base que la web y las reservas.',
    bullets: ['Visión en tiempo real', 'Menos trabajo manual', 'Datos útiles para decidir', 'Experiencia consistente en escritorio y móvil'],
    browserLabel: 'Archic Control / Hospitality concept',
    dashboard: 'Resumen',
    bookings: 'Reservas hoy',
    guests: 'Clientes activos',
    occupancy: 'Ocupación',
    direct: 'Reserva directa',
    activity: 'Actividad reciente',
    nextService: 'Próximo servicio',
    returning: 'Clientes recurrentes',
    notes: 'Notas de servicio',
    mobileTitle: 'Reservas',
    mobileRows: [
      { time: '20:00', name: 'Mesa 12', meta: '4 personas · Confirmada' },
      { time: '20:30', name: 'Mesa 07', meta: '2 personas · Preferencia terraza' },
      { time: '21:00', name: 'Mesa 03', meta: '6 personas · Alergia registrada' },
    ],
  },
  sectors: {
    kicker: 'SECTORES',
    title: 'Construido alrededor del negocio, no de una plantilla.',
    note: 'Nos enfocamos donde experiencia, operación y valor percibido importan especialmente.',
    items: [
      { name: 'Hostelería', line: 'Reservas · Clientes · Servicio' },
      { name: 'Automoción', line: 'Flota · Leads · Operación' },
      { name: 'Náutica', line: 'Charter · Disponibilidad · Leads' },
      { name: 'Real Estate', line: 'Inventario · Captación · CRM' },
      { name: 'Premium Services', line: 'Experiencia · Procesos · Datos' },
    ],
  },
  process: {
    kicker: 'CÓMO TRABAJAMOS',
    title: 'Menos capas. Más responsabilidad.',
    lead: 'Entendemos el negocio, construimos lo necesario y seguimos mejorándolo cuando aporta valor.',
    steps: [
      { code: '01', name: 'Discover', desc: 'Entendemos el negocio, la operación, el cliente y el objetivo comercial.' },
      { code: '02', name: 'Build', desc: 'Diseñamos y desarrollamos una solución clara, útil y técnicamente sólida.' },
      { code: '03', name: 'Evolve', desc: 'Medimos, mantenemos y ampliamos el sistema cuando el negocio lo necesita.' },
    ],
  },
  cta: {
    label: 'EMPEZAR PROYECTO',
    title: 'Construyamos la parte digital',
    titleAccent: 'que tu negocio realmente necesita.',
    lead: 'Cuéntanos qué quieres mejorar. Te respondemos con una primera valoración de alcance y la forma más sensata de abordarlo.',
    mailLabel: 'O escríbenos directamente',
    formTitle: 'Empezar proyecto',
  },
  footer: {
    tagline: 'Construimos la parte digital de negocios excepcionales.',
    base: 'España · Proyectos remotos y presenciales',
    rights: 'Todos los derechos reservados.',
    legal: 'Legal',
    systems: 'Sistema',
  },
}

const en: StudioContent = {
  meta: {
    title: 'Archic — The digital side of exceptional businesses',
    description: 'Archic designs and builds premium websites, booking systems, operations software and custom digital products for ambitious businesses.',
    ogTitle: 'Archic — We build the digital side of exceptional businesses',
    ogDescription: 'Presence, Bookings, Control and Business: digital experience, operations and custom software.',
  },
  nav: {
    capabilities: 'Capabilities',
    systems: 'System',
    sectors: 'Sectors',
    about: 'Studio',
    cta: 'Start a project',
  },
  hero: {
    eyebrow: 'ARCHIC — DIGITAL SYSTEMS STUDIO',
    title: 'We build the digital side of exceptional',
    titleAccent: 'businesses.',
    lead: 'Strategy, design and technology working as one system — from the public experience to the tools that make the business run.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'Explore capabilities',
    metaLeft: 'Spain · Remote & on-site',
    metaRight: 'Web · Bookings · Operations · Software',
    nodes: [
      { code: '01', name: 'Presence', line: 'Brand, web and conversion' },
      { code: '02', name: 'Bookings', line: 'Reservations and enquiries' },
      { code: '03', name: 'Control', line: 'Customers and operations' },
      { code: '04', name: 'Business', line: 'Data and custom software' },
    ],
  },
  statement: {
    kicker: 'BEYOND A WEBSITE',
    titleA: 'The website is the front door.',
    titleB: 'The system behind it multiplies its value.',
    body: 'We do not separate design, product and operations. We design the experience customers see and, when it makes sense, connect it with bookings, customers, resources, automation and custom software.',
    points: ['One coherent experience', 'Less third-party dependency', 'More operational control', 'A foundation built to grow'],
  },
  system: {
    kicker: 'WHAT WE BUILD',
    title: 'Four layers.',
    titleB: 'One connected system.',
    lead: 'Start with one need. Each layer is designed to live with the others so your digital business does not need to be rebuilt every time it grows.',
    steps: [
      { code: '01', name: 'Presence', label: 'Public experience', desc: 'Premium website, visual direction, content, conversion, technical SEO and mobile experience.' },
      { code: '02', name: 'Bookings', label: 'Demand capture', desc: 'Bookings, enquiries, availability, confirmations, forms and contact channels.' },
      { code: '03', name: 'Control', label: 'Operations', desc: 'Dashboards, customers, resources, statuses, permissions, workflows and daily visibility.' },
      { code: '04', name: 'Business', label: 'Growth', desc: 'Integrations, automation, analytics, internal tools and fully custom software.' },
    ],
    care: 'Care — ongoing maintenance, security, support and evolution of the whole system.',
  },
  concepts: {
    kicker: 'CAPABILITIES IN ACTION',
    title: 'Concept demonstrations, not client work.',
    note: 'Until we have a real client portfolio, we would rather transparently show the level of product we can design and build.',
    items: [
      {
        index: '01', sector: 'HOSPITALITY', title: 'Hospitality system',
        desc: 'A connected guest experience from booking to service operations and customer history.',
        features: ['Website + direct booking', 'Guests and preferences', 'Operations and service'], image: 'hospitality',
        imageAlt: 'Concept digital system for premium hospitality',
      },
      {
        index: '02', sector: 'AUTOMOTIVE', title: 'Automotive system',
        desc: 'Fleet presentation, availability, enquiries and commercial follow-up without breaking the premium experience.',
        features: ['Fleet and availability', 'Qualified enquiries', 'Commercial follow-up'], image: 'automotive',
        imageAlt: 'Concept digital system for premium automotive',
      },
      {
        index: '03', sector: 'YACHTING', title: 'Yachting system',
        desc: 'Charter, leads, availability and operations connected through a restrained high-value experience.',
        features: ['Charter and enquiries', 'Availability', 'Operations'], image: 'yachting',
        imageAlt: 'Concept digital system for premium yachting',
      },
    ],
  },
  showcase: {
    kicker: 'ARCHIC CONTROL — CONCEPT',
    title: 'We do not only design what people see.',
    titleB: 'We design what makes the business run.',
    lead: 'This Control prototype shows the kind of operational software we can build on the same foundation as the website and booking layer.',
    bullets: ['Real-time visibility', 'Less manual work', 'Useful data for decisions', 'Consistent desktop and mobile experience'],
    browserLabel: 'Archic Control / Hospitality concept',
    dashboard: 'Overview',
    bookings: 'Bookings today',
    guests: 'Active guests',
    occupancy: 'Occupancy',
    direct: 'Direct booking',
    activity: 'Recent activity',
    nextService: 'Next service',
    returning: 'Returning guests',
    notes: 'Service notes',
    mobileTitle: 'Bookings',
    mobileRows: [
      { time: '20:00', name: 'Table 12', meta: '4 guests · Confirmed' },
      { time: '20:30', name: 'Table 07', meta: '2 guests · Terrace preference' },
      { time: '21:00', name: 'Table 03', meta: '6 guests · Allergy recorded' },
    ],
  },
  sectors: {
    kicker: 'SECTORS',
    title: 'Built around the business, never around a template.',
    note: 'We focus where experience, operations and perceived value matter especially.',
    items: [
      { name: 'Hospitality', line: 'Bookings · Guests · Service' },
      { name: 'Automotive', line: 'Fleet · Leads · Operations' },
      { name: 'Yachting', line: 'Charter · Availability · Leads' },
      { name: 'Real Estate', line: 'Inventory · Acquisition · CRM' },
      { name: 'Premium Services', line: 'Experience · Processes · Data' },
    ],
  },
  process: {
    kicker: 'HOW WE WORK',
    title: 'Fewer layers. More ownership.',
    lead: 'We understand the business, build what is needed and keep improving it when doing so creates value.',
    steps: [
      { code: '01', name: 'Discover', desc: 'We understand the business, operations, customer and commercial objective.' },
      { code: '02', name: 'Build', desc: 'We design and develop a clear, useful and technically solid solution.' },
      { code: '03', name: 'Evolve', desc: 'We measure, maintain and extend the system as the business needs it.' },
    ],
  },
  cta: {
    label: 'START A PROJECT',
    title: 'Let’s build the digital side',
    titleAccent: 'your business actually needs.',
    lead: 'Tell us what you want to improve. We will reply with an initial scope assessment and the most sensible way to approach it.',
    mailLabel: 'Or email us directly',
    formTitle: 'Start a project',
  },
  footer: {
    tagline: 'We build the digital side of exceptional businesses.',
    base: 'Spain · Remote & on-site projects',
    rights: 'All rights reserved.',
    legal: 'Legal',
    systems: 'System',
  },
}

export const STUDIO: Record<Lang, StudioContent> = { es, en }
