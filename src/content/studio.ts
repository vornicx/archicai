/**
 * Contenido de la portada de Archic como estudio de producto digital.
 *
 * Vive aparte de `src/i18n/content.ts` porque aquella estructura sostiene las
 * landings de SEO local, que siguen publicadas y no comparten narrativa con
 * esta página. Aquí el objetivo no es keyword coverage: es que un propietario
 * de un negocio premium entienda en diez segundos qué construimos.
 */
import type { Lang } from '../i18n/content'

export type StudioProject = {
  index: string
  name: string
  sector: string
  headline: string
  scope: string[]
  image: 'bocana' | 'automotive' | 'realestate'
  imageAlt: string
}

export type StudioContent = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string }
  nav: { work: string; build: string; sectors: string; method: string; cta: string }
  hero: {
    label: string
    title: string[]
    lead: string
    ctaPrimary: string
    ctaSecondary: string
    imageAlt: string
    scrollHint: string
  }
  work: { label: string; title: string; lead: string; scopeLabel: string }
  projects: StudioProject[]
  build: {
    label: string
    title: string
    lead: string
    layers: { code: string; name: string; claim: string; desc: string; items: string[] }[]
  }
  caseStudy: {
    label: string
    title: string
    lead: string
    stages: { step: string; title: string; desc: string }[]
    note: string
  }
  sectors: { label: string; title: string; lead: string; items: { name: string; desc: string }[] }
  method: {
    label: string
    title: string
    lead: string
    steps: { step: string; name: string; desc: string }[]
  }
  cta: {
    label: string
    title: string
    lead: string
    mailLabel: string
    formTitle: string
  }
  footer: { tagline: string; base: string; rights: string; legal: string }
}

const es: StudioContent = {
  meta: {
    title: 'Archic — Estudio digital para negocios premium en Marbella',
    description:
      'Diseñamos y construimos la parte digital de negocios excepcionales: web, reservas, paneles de gestión, CRM y software a medida. Marbella, Puerto Banús y Costa del Sol.',
    ogTitle: 'Archic — Estudio digital para negocios premium',
    ogDescription:
      'Web, reservas, operaciones y software a medida para restaurantes, inmobiliarias, náutica y automoción de alto nivel.',
  },
  nav: {
    work: 'Proyectos',
    build: 'Qué construimos',
    sectors: 'Sectores',
    method: 'Método',
    cta: 'Empezar un proyecto',
  },
  hero: {
    label: 'Estudio digital · Marbella · Puerto Banús',
    title: ['Diseñamos la parte digital', 'de negocios excepcionales.'],
    lead:
      'Presencia, reservas y software operativo construidos a medida. Del primer contacto del cliente a la gestión interna del negocio.',
    ctaPrimary: 'Empezar un proyecto',
    ctaSecondary: 'Ver proyectos',
    imageAlt:
      'Terraza de restaurante frente al Mediterráneo al anochecer, con vistas al puerto deportivo',
    scrollHint: 'Proyectos seleccionados',
  },
  work: {
    label: '02 — Proyectos',
    title: 'Trabajo seleccionado',
    lead: 'Cada proyecto empieza por la imagen del negocio y termina en su operativa diaria.',
    scopeLabel: 'Alcance',
  },
  projects: [
    {
      index: '01',
      name: 'La Bocana',
      sector: 'Hospitality',
      headline:
        'Una nueva experiencia digital para un restaurante de playa: presencia, reservas y sala conectadas en un mismo sistema.',
      scope: ['Presence', 'Bookings', 'Control'],
      image: 'bocana',
      imageAlt: 'Mesa preparada en un club de playa mediterráneo a la hora dorada',
    },
    {
      index: '02',
      name: 'B&M Exclusive',
      sector: 'Luxury automotive',
      headline:
        'Catálogo, disponibilidad y solicitudes de reserva para una flota de alquiler exclusivo, con panel interno de gestión.',
      scope: ['Presence', 'Bookings', 'Control'],
      image: 'automotive',
      imageAlt: 'Deportivo oscuro aparcado junto a un puerto deportivo de noche',
    },
    {
      index: '03',
      name: 'Costa Residences',
      sector: 'Real estate',
      headline:
        'Portfolio de propiedades con fichas editoriales, captación cualificada y gestión de leads para un equipo comercial pequeño.',
      scope: ['Presence', 'Business'],
      image: 'realestate',
      imageAlt: 'Villa contemporánea con piscina reflectante al anochecer',
    },
  ],
  build: {
    label: '03 — Qué construimos',
    title: 'Cinco capas. Un único sistema.',
    lead:
      'Puedes empezar por una y seguir construyendo. No hay que rehacer nada por el camino.',
    layers: [
      {
        code: '01',
        name: 'Presence',
        claim: 'La imagen pública del negocio, ejecutada al nivel que le corresponde.',
        desc:
          'Estrategia, dirección creativa, UX/UI, desarrollo y contenido. Una web que se sostiene sola en cualquier pantalla y convierte.',
        items: ['Dirección creativa', 'UX/UI y diseño', 'Desarrollo', 'SEO técnico', 'Analítica'],
      },
      {
        code: '02',
        name: 'Bookings',
        claim: 'Reservas y solicitudes que llegan ordenadas al equipo.',
        desc:
          'Disponibilidad, confirmaciones, cancelaciones, lista de espera y avisos por email o WhatsApp, integrados con la web.',
        items: ['Reservas web', 'Disponibilidad', 'Confirmaciones', 'Waitlist', 'WhatsApp y email'],
      },
      {
        code: '03',
        name: 'Control',
        claim: 'El software con el que se dirige el negocio cada día.',
        desc:
          'Paneles internos hechos a la medida de la operación: mesas, propiedades, flota, clientes, usuarios y métricas reales.',
        items: ['Dashboard', 'CRM', 'Gestión de clientes', 'Inventario', 'Métricas'],
      },
      {
        code: '04',
        name: 'Business',
        claim: 'Integraciones y automatizaciones sobre lo que ya usas.',
        desc:
          'Conectamos TPV, facturación, ERP y herramientas internas, y eliminamos el trabajo manual que se repite cada semana.',
        items: ['Integraciones', 'TPV y ERP', 'Facturación', 'Automatizaciones', 'Analítica avanzada'],
      },
      {
        code: '05',
        name: 'Care',
        claim: 'Mantenimiento y evolución de toda la infraestructura.',
        desc:
          'Seguridad, actualizaciones, monitorización, cambios y mejoras continuas. El sistema mejora con el negocio.',
        items: ['Seguridad', 'Monitorización', 'Actualizaciones', 'Soporte', 'Evolución'],
      },
    ],
  },
  caseStudy: {
    label: '04 — Caso de estudio',
    title: 'La Bocana: de una web a un sistema completo',
    lead:
      'Empezó como una presencia digital nueva. Terminó gestionando reservas, sala y relación con clientes en el mismo sitio.',
    stages: [
      {
        step: '01',
        title: 'Presencia',
        desc: 'Web editorial con fotografía propia, carta y una narrativa que sostiene el precio.',
      },
      {
        step: '02',
        title: 'Reservas',
        desc: 'Reserva en tres pasos, confirmación automática y lista de espera en temporada alta.',
      },
      {
        step: '03',
        title: 'Operación',
        desc: 'Panel de sala con turnos, mesas y notas del cliente para el equipo de servicio.',
      },
      {
        step: '04',
        title: 'Clientes',
        desc: 'Histórico por cliente, preferencias y datos de ocupación para decidir con criterio.',
      },
    ],
    note: 'Mismo estudio, mismo sistema, sin proveedores intermedios.',
  },
  sectors: {
    label: '05 — Sectores',
    title: 'Dónde trabajamos mejor',
    lead:
      'Negocios donde la imagen, la experiencia del cliente y la operación pesan lo mismo.',
    items: [
      { name: 'Hospitality', desc: 'Restaurantes, beach clubs, hoteles boutique' },
      { name: 'Real Estate', desc: 'Inmobiliarias de lujo y promotoras' },
      { name: 'Automotive', desc: 'Alquiler exclusivo, concesionarios, colección' },
      { name: 'Yachting', desc: 'Charter, brokerage y servicios náuticos' },
      { name: 'Premium Services', desc: 'Clínicas, estudios y servicios profesionales' },
    ],
  },
  method: {
    label: '06 — Método',
    title: 'Cuatro fases. Sin ruido.',
    lead: 'Trabajo directo con quien decide. Sin capas intermedias ni informes de relleno.',
    steps: [
      { step: '01', name: 'Discover', desc: 'Negocio, operación y objetivos. Definimos qué hay que resolver.' },
      { step: '02', name: 'Design', desc: 'Dirección creativa, estructura e interfaz sobre contenido real.' },
      { step: '03', name: 'Build', desc: 'Desarrollo, integraciones y pruebas con el equipo del negocio.' },
      { step: '04', name: 'Evolve', desc: 'Medimos, ajustamos y ampliamos el sistema con el tiempo.' },
    ],
  },
  cta: {
    label: '07 — Contacto',
    title: 'Cuéntanos tu proyecto.',
    lead:
      'Respondemos en menos de 24 horas con una primera valoración de alcance y presupuesto.',
    mailLabel: 'Escríbenos directamente',
    formTitle: 'Empezar un proyecto',
  },
  footer: {
    tagline: 'Diseño, tecnología y software para negocios premium.',
    base: 'Marbella · Puerto Banús · Costa del Sol · España',
    rights: 'Todos los derechos reservados.',
    legal: 'Legal',
  },
}

const en: StudioContent = {
  meta: {
    title: 'Archic — Digital studio for premium businesses in Marbella',
    description:
      'We design and build the digital side of exceptional businesses: websites, booking systems, admin panels, CRM and custom software. Marbella, Puerto Banús and the Costa del Sol.',
    ogTitle: 'Archic — Digital studio for premium businesses',
    ogDescription:
      'Websites, bookings, operations and custom software for high-end hospitality, real estate, yachting and automotive.',
  },
  nav: {
    work: 'Work',
    build: 'What we build',
    sectors: 'Sectors',
    method: 'Method',
    cta: 'Start a project',
  },
  hero: {
    label: 'Digital studio · Marbella · Puerto Banús',
    title: ['We design the digital side', 'of exceptional businesses.'],
    lead:
      'Presence, bookings and operational software, built to measure. From the first customer touch to the way the business runs inside.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'See work',
    imageAlt: 'Seafront restaurant terrace at blue hour overlooking a Mediterranean marina',
    scrollHint: 'Selected work',
  },
  work: {
    label: '02 — Work',
    title: 'Selected work',
    lead: 'Every project starts with how the business looks and ends in how it runs.',
    scopeLabel: 'Scope',
  },
  projects: [
    {
      index: '01',
      name: 'La Bocana',
      sector: 'Hospitality',
      headline:
        'A new digital experience for a beachfront restaurant: presence, bookings and floor operations in one system.',
      scope: ['Presence', 'Bookings', 'Control'],
      image: 'bocana',
      imageAlt: 'Set table at a Mediterranean beach club during golden hour',
    },
    {
      index: '02',
      name: 'B&M Exclusive',
      sector: 'Luxury automotive',
      headline:
        'Fleet catalogue, availability and booking requests for an exclusive rental operation, with an internal management panel.',
      scope: ['Presence', 'Bookings', 'Control'],
      image: 'automotive',
      imageAlt: 'Dark sports car parked by a marina at night',
    },
    {
      index: '03',
      name: 'Costa Residences',
      sector: 'Real estate',
      headline:
        'Property portfolio with editorial listings, qualified enquiries and lead management for a small sales team.',
      scope: ['Presence', 'Business'],
      image: 'realestate',
      imageAlt: 'Contemporary villa with reflecting pool at dusk',
    },
  ],
  build: {
    label: '03 — What we build',
    title: 'Five layers. One system.',
    lead: 'Start with one and keep building. Nothing has to be rebuilt along the way.',
    layers: [
      {
        code: '01',
        name: 'Presence',
        claim: 'The public face of the business, executed at the level it deserves.',
        desc:
          'Strategy, creative direction, UX/UI, development and content. A site that holds up on any screen and converts.',
        items: ['Creative direction', 'UX/UI design', 'Development', 'Technical SEO', 'Analytics'],
      },
      {
        code: '02',
        name: 'Bookings',
        claim: 'Reservations and requests that reach the team in order.',
        desc:
          'Availability, confirmations, cancellations, waitlists and notifications over email or WhatsApp, wired into the site.',
        items: ['Web bookings', 'Availability', 'Confirmations', 'Waitlist', 'WhatsApp and email'],
      },
      {
        code: '03',
        name: 'Control',
        claim: 'The software the business is run with, day to day.',
        desc:
          'Internal panels shaped around the actual operation: tables, properties, fleet, customers, users and real metrics.',
        items: ['Dashboard', 'CRM', 'Customer management', 'Inventory', 'Metrics'],
      },
      {
        code: '04',
        name: 'Business',
        claim: 'Integrations and automation on top of what you already use.',
        desc:
          'We connect POS, invoicing, ERP and internal tools, and remove the manual work that repeats every week.',
        items: ['Integrations', 'POS and ERP', 'Invoicing', 'Automation', 'Advanced analytics'],
      },
      {
        code: '05',
        name: 'Care',
        claim: 'Maintenance and evolution of the whole infrastructure.',
        desc:
          'Security, updates, monitoring, changes and continuous improvement. The system grows with the business.',
        items: ['Security', 'Monitoring', 'Updates', 'Support', 'Evolution'],
      },
    ],
  },
  caseStudy: {
    label: '04 — Case study',
    title: 'La Bocana: from a website to a complete system',
    lead:
      'It started as a new digital presence. It ended up running bookings, the floor and customer relationships in one place.',
    stages: [
      { step: '01', title: 'Presence', desc: 'Editorial site with original photography, menu and a narrative that holds the price.' },
      { step: '02', title: 'Bookings', desc: 'Three-step reservation, automatic confirmation and a waitlist for high season.' },
      { step: '03', title: 'Operations', desc: 'Floor panel with services, tables and guest notes for the service team.' },
      { step: '04', title: 'Customers', desc: 'Guest history, preferences and occupancy data to decide with evidence.' },
    ],
    note: 'One studio, one system, no middlemen.',
  },
  sectors: {
    label: '05 — Sectors',
    title: 'Where we work best',
    lead: 'Businesses where image, customer experience and operations carry equal weight.',
    items: [
      { name: 'Hospitality', desc: 'Restaurants, beach clubs, boutique hotels' },
      { name: 'Real Estate', desc: 'Luxury agencies and developers' },
      { name: 'Automotive', desc: 'Exclusive rental, dealerships, collections' },
      { name: 'Yachting', desc: 'Charter, brokerage and marine services' },
      { name: 'Premium Services', desc: 'Clinics, studios and professional services' },
    ],
  },
  method: {
    label: '06 — Method',
    title: 'Four phases. No noise.',
    lead: 'Direct work with whoever decides. No intermediate layers, no filler reports.',
    steps: [
      { step: '01', name: 'Discover', desc: 'Business, operation and goals. We define what has to be solved.' },
      { step: '02', name: 'Design', desc: 'Creative direction, structure and interface on real content.' },
      { step: '03', name: 'Build', desc: 'Development, integrations and testing with the business team.' },
      { step: '04', name: 'Evolve', desc: 'We measure, adjust and extend the system over time.' },
    ],
  },
  cta: {
    label: '07 — Contact',
    title: 'Tell us about your project.',
    lead: 'We reply within 24 hours with a first read on scope and budget.',
    mailLabel: 'Write to us directly',
    formTitle: 'Start a project',
  },
  footer: {
    tagline: 'Design, technology and software for premium businesses.',
    base: 'Marbella · Puerto Banús · Costa del Sol · Spain',
    rights: 'All rights reserved.',
    legal: 'Legal',
  },
}

export const STUDIO: Record<Lang, StudioContent> = { es, en }
