/**
 * Copy de la portada de Archic.
 *
 * Vive aparte de `src/i18n/content.ts` porque aquella estructura sostiene las
 * landings de SEO local, que siguen publicadas y no comparten narrativa con
 * esta página. Aquí la regla es la del handoff de marca: frases cortas, sin
 * clichés de agencia y sin datos de cliente inventados.
 */
import type { Lang } from '../i18n/content'

export type SystemImage = 'digital' | 'hospitality' | 'automotive' | 'yachting'

export type StudioCase = {
  index: string
  kicker: string
  name: string
  stack: string
  desc: string
  note: string
  image: SystemImage
  imageAlt: string
}

export type StudioContent = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string }
  nav: { work: string; systems: string; sectors: string; about: string; cta: string }
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    lead: string
    ctaPrimary: string
    ctaSecondary: string
    imageAlt: string
    metaLeft: string
    metaRight: string
  }
  statement: { kicker: string; titleA: string; titleB: string; body: string }
  work: { kicker: string; note: string; caseLink: string; cases: StudioCase[] }
  system: {
    kicker: string
    title: string
    titleB: string
    lead: string
    steps: { code: string; name: string; desc: string }[]
    care: string
  }
  sectors: {
    kicker: string
    note: string
    items: { name: string; line: string; image: SystemImage; imageAlt: string }[]
    footnote: string
  }
  principles: { kicker: string; items: { index: string; title: string; desc: string }[] }
  process: {
    kicker: string
    title: string
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
    title: 'Archic — Sistemas digitales para negocios excepcionales',
    description:
      'Diseñamos y construimos la parte digital de negocios excepcionales: experiencia pública, reservas, operaciones y software a medida. Marbella, Puerto Banús y Costa del Sol.',
    ogTitle: 'Archic — Sistemas digitales para negocios excepcionales',
    ogDescription:
      'Presencia, reservas, control operativo y software a medida para hostelería, automoción, náutica e inmobiliaria de alto nivel.',
  },
  nav: {
    work: 'Proyectos',
    systems: 'Sistemas',
    sectors: 'Sectores',
    about: 'Estudio',
    cta: 'Empezar proyecto',
  },
  hero: {
    eyebrow: 'ARCHIC — SISTEMAS DIGITALES',
    title: 'Sistemas digitales para negocios',
    titleAccent: 'excepcionales.',
    lead:
      'Diseñamos experiencias digitales, software y sistemas operativos que ayudan a negocios ambiciosos a vender, operar y crecer.',
    ctaPrimary: 'Empezar proyecto',
    ctaSecondary: 'Ver trabajo',
    imageAlt:
      'Sistema digital abstracto: paneles de datos y módulos conectados alrededor del símbolo de Archic',
    metaLeft: 'Marbella · España',
    metaRight: 'Presencia · Software · Operaciones',
  },
  statement: {
    kicker: 'QUÉ HACEMOS',
    titleA: 'La web es la puerta de entrada.',
    titleB: 'El valor está en el sistema que hay detrás.',
    body:
      'Conectamos la experiencia pública del negocio con las herramientas que lo hacen funcionar: reservas, clientes, recursos, flujos de trabajo y decisiones.',
  },
  work: {
    kicker: 'DIRECCIÓN DE TRABAJO',
    note: 'Construido alrededor del negocio, nunca alrededor de una plantilla.',
    caseLink: 'Ver el sistema',
    cases: [
      {
        index: '01',
        kicker: 'HOSTELERÍA',
        name: 'La Bocana',
        stack: 'Presence + Bookings + Control',
        desc:
          'Un recorrido de cliente continuo: del descubrimiento y la reserva al servicio en sala, el histórico del cliente y la operativa diaria.',
        note: 'Proyecto de hostelería en curso.',
        image: 'hospitality',
        imageAlt: 'Mesa de restaurante premium con una capa de datos sutil sobre la escena',
      },
      {
        index: '02',
        kicker: 'MOVILIDAD PREMIUM',
        name: 'B&M',
        stack: 'Presence + Fleet + Enquiries',
        desc:
          'Una capa digital que une presentación, disponibilidad de flota, solicitudes y gestión de clientes en un solo lugar.',
        note: 'Concepto de estudio, no un proyecto entregado.',
        image: 'automotive',
        imageAlt: 'Deportivo oscuro con una retícula de datos discreta alrededor',
      },
    ],
  },
  system: {
    kicker: 'UN SOLO SISTEMA',
    title: 'Un socio.',
    titleB: 'Un sistema conectado.',
    lead:
      'Empieza por lo que el negocio necesita hoy. El resto se construye sobre la misma base cuando aporta valor.',
    steps: [
      {
        code: '01',
        name: 'Presence',
        desc: 'Experiencia web premium, conversión, contenido y expresión de marca.',
      },
      {
        code: '02',
        name: 'Bookings',
        desc: 'Reservas, solicitudes, disponibilidad, confirmaciones y captación de clientes.',
      },
      {
        code: '03',
        name: 'Control',
        desc: 'Operativa, clientes, recursos, flujos de trabajo y visibilidad en tiempo real.',
      },
      {
        code: '04',
        name: 'Business',
        desc: 'Integraciones, automatización, analítica y software a medida.',
      },
    ],
    care: 'Care — mantenimiento, seguridad y evolución continua de todo el sistema.',
  },
  sectors: {
    kicker: 'SECTORES',
    note: 'Experiencia premium fuera. Sistemas precisos dentro.',
    items: [
      {
        name: 'Hostelería',
        line: 'Reservas · Clientes · Servicio',
        image: 'hospitality',
        imageAlt: 'Sala de restaurante premium por la noche',
      },
      {
        name: 'Automoción',
        line: 'Flota · Disponibilidad · Solicitudes',
        image: 'automotive',
        imageAlt: 'Vehículo deportivo oscuro en un entorno controlado',
      },
      {
        name: 'Náutica',
        line: 'Charter · Leads · Operativa',
        image: 'yachting',
        imageAlt: 'Yate navegando al atardecer',
      },
    ],
    footnote:
      'También trabajamos con inmobiliaria y servicios premium, sin convertir a Archic en el cliché de un solo sector.',
  },
  principles: {
    kicker: 'PRINCIPIOS',
    items: [
      {
        index: '01',
        title: 'Diseñado alrededor del negocio.',
        desc: 'Entendemos la operación antes de elegir la interfaz.',
      },
      {
        index: '02',
        title: 'Hecho para operar, no solo para impresionar.',
        desc: 'La calidad de diseño y la utilidad de negocio son el mismo problema.',
      },
      {
        index: '03',
        title: 'Preparado para evolucionar.',
        desc: 'La misma base digital crece de la presencia al software.',
      },
    ],
  },
  process: {
    kicker: 'PROCESO',
    title: 'Tres fases. Sin ruido.',
    steps: [
      { code: '01', name: 'Discover', desc: 'Negocio, operación y objetivos. Definimos qué resolver.' },
      { code: '02', name: 'Build', desc: 'Diseño y desarrollo sobre contenido y procesos reales.' },
      { code: '03', name: 'Evolve', desc: 'Medimos, ajustamos y ampliamos el sistema con el tiempo.' },
    ],
  },
  cta: {
    label: 'EMPEZAR PROYECTO',
    title: 'Tu negocio merece un sistema digital',
    titleAccent: 'construido a su medida.',
    lead: 'Cuéntanos el proyecto y respondemos con una primera valoración de alcance.',
    mailLabel: 'Escríbenos directamente',
    formTitle: 'Empezar proyecto',
  },
  footer: {
    tagline: 'Sistemas digitales para negocios excepcionales.',
    base: 'Marbella · Puerto Banús · Costa del Sol · España',
    rights: 'Todos los derechos reservados.',
    legal: 'Legal',
    systems: 'Sistemas',
  },
}

const en: StudioContent = {
  meta: {
    title: 'Archic — Digital systems for exceptional businesses',
    description:
      'Archic designs and builds the digital side of exceptional businesses: premium experiences, bookings, operations and custom software. Marbella and the Costa del Sol.',
    ogTitle: 'Archic — Digital systems for exceptional businesses',
    ogDescription:
      'Presence, bookings, operational control and custom software for high-end hospitality, automotive, yachting and real estate.',
  },
  nav: {
    work: 'Work',
    systems: 'Systems',
    sectors: 'Sectors',
    about: 'Studio',
    cta: 'Start a project',
  },
  hero: {
    eyebrow: 'ARCHIC — DIGITAL SYSTEMS',
    title: 'Digital systems for exceptional',
    titleAccent: 'businesses.',
    lead:
      'We design premium digital experiences, software and operational systems that help ambitious businesses sell, operate and grow.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'See our work',
    imageAlt:
      'Abstract digital system: connected data panels and modules around the Archic symbol',
    metaLeft: 'Marbella · Spain',
    metaRight: 'Presence · Software · Operations',
  },
  statement: {
    kicker: 'WHAT WE DO',
    titleA: 'The website is the front door.',
    titleB: 'The real value is the system behind it.',
    body:
      'We connect the public experience of a business with the tools that make it run: reservations, customers, resources, workflows and decisions.',
  },
  work: {
    kicker: 'SELECTED DIRECTION',
    note: 'Built around the business, never around a template.',
    caseLink: 'Explore the system',
    cases: [
      {
        index: '01',
        kicker: 'HOSPITALITY',
        name: 'La Bocana',
        stack: 'Presence + Bookings + Control',
        desc:
          'A connected guest journey: from discovery and booking to service, customer history and daily operations.',
        note: 'Hospitality project in progress.',
        image: 'hospitality',
        imageAlt: 'Premium restaurant table with a restrained data layer over the scene',
      },
      {
        index: '02',
        kicker: 'PREMIUM MOBILITY',
        name: 'B&M',
        stack: 'Presence + Fleet + Enquiries',
        desc:
          'A premium digital layer connecting presentation, fleet availability, enquiries and customer management.',
        note: 'Studio concept, not a delivered client project.',
        image: 'automotive',
        imageAlt: 'Dark sports car with a discreet data grid around it',
      },
    ],
  },
  system: {
    kicker: 'ONE DIGITAL SIDE',
    title: 'One partner.',
    titleB: 'One connected system.',
    lead:
      'Start with what the business needs today. Build the rest on the same foundation when it creates value.',
    steps: [
      {
        code: '01',
        name: 'Presence',
        desc: 'Premium web experience, conversion, content and brand expression.',
      },
      {
        code: '02',
        name: 'Bookings',
        desc: 'Reservations, enquiries, availability, confirmations and customer capture.',
      },
      {
        code: '03',
        name: 'Control',
        desc: 'Operations, customers, resources, workflows and real-time visibility.',
      },
      {
        code: '04',
        name: 'Business',
        desc: 'Integrations, automation, analytics and custom software.',
      },
    ],
    care: 'Care — ongoing maintenance, security and evolution of the whole system.',
  },
  sectors: {
    kicker: 'SECTORS',
    note: 'Premium experience outside. Precise systems inside.',
    items: [
      {
        name: 'Hospitality',
        line: 'Reservations · Guests · Service',
        image: 'hospitality',
        imageAlt: 'Premium restaurant room at night',
      },
      {
        name: 'Automotive',
        line: 'Fleet · Availability · Enquiries',
        image: 'automotive',
        imageAlt: 'Dark sports car in a controlled environment',
      },
      {
        name: 'Yachting',
        line: 'Charter · Leads · Operations',
        image: 'yachting',
        imageAlt: 'Yacht under way at dusk',
      },
    ],
    footnote:
      'Also built for real estate and premium service businesses, without turning Archic into a single-industry cliché.',
  },
  principles: {
    kicker: 'PRINCIPLES',
    items: [
      {
        index: '01',
        title: 'Designed around the business.',
        desc: 'We understand the operation before choosing the interface.',
      },
      {
        index: '02',
        title: 'Built to operate, not just impress.',
        desc: 'Design quality and business usefulness are one problem, not two.',
      },
      {
        index: '03',
        title: 'Made to evolve.',
        desc: 'The same digital foundation grows from presence into software.',
      },
    ],
  },
  process: {
    kicker: 'PROCESS',
    title: 'Three steps. No noise.',
    steps: [
      { code: '01', name: 'Discover', desc: 'Business, operation and goals. We define what to solve.' },
      { code: '02', name: 'Build', desc: 'Design and development on real content and real processes.' },
      { code: '03', name: 'Evolve', desc: 'We measure, adjust and extend the system over time.' },
    ],
  },
  cta: {
    label: 'START A PROJECT',
    title: 'Your business deserves a digital system',
    titleAccent: 'built around it.',
    lead: 'Tell us about the project and we reply with a first view of scope.',
    mailLabel: 'Write to us directly',
    formTitle: 'Start a project',
  },
  footer: {
    tagline: 'Digital systems for exceptional businesses.',
    base: 'Marbella · Puerto Banús · Costa del Sol · Spain',
    rights: 'All rights reserved.',
    legal: 'Legal',
    systems: 'Systems',
  },
}

export const STUDIO: Record<Lang, StudioContent> = { es, en }
