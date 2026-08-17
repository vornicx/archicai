import { ANTERO_CONTACT, VADIM_CONTACT } from '../config/contact'
import { type Lang } from '../i18n/content'

export const SITE_ORIGIN = 'https://archic.es'
export const BRAND_VERSION = '20260812'
export const ARCHIC_SYMBOL_URL = `${SITE_ORIGIN}/brand/archic-symbol-2026.svg`
export const ARCHIC_LOCKUP_URL = `${SITE_ORIGIN}/brand/archic-lockup-dark.svg`
const OG_VERSION = `v=${BRAND_VERSION}`

export const ARCHIC_BASE = {
  city: 'Écija',
  province: 'Sevilla',
  region: 'Andalucía',
  postalCode: '41400',
  countryCode: 'ES',
  countryName: 'España',
} as const

export const ARCHIC_SERVICE_AREAS = [
  { '@type': 'City', name: 'Écija' },
  { '@type': 'City', name: 'Sevilla' },
  { '@type': 'City', name: 'Marbella' },
  { '@type': 'AdministrativeArea', name: 'Costa del Sol' },
  { '@type': 'Country', name: 'Spain' },
] as const

export const ARCHIC_KNOWS_ABOUT = [
  'Premium web design',
  'Digital presence',
  'Business management software',
  'Booking systems',
  'Customer management systems',
  'Custom software',
  'Business automation',
  'System integrations',
  'Business data systems',
  'Luxury mobility websites',
  'Luxury car rental systems',
  'Hospitality booking systems',
  'Restaurant reservation systems',
  'Premium real estate websites',
  'Property CRM systems',
  'Yacht charter websites',
  'Premium service businesses',
] as const

export type SitePageKey = 'presence' | 'control' | 'business' | 'studio' | 'contact'

type SeoEntry = {
  title: string
  description: string
  ogAlt: string
  schemaName: string
  serviceType?: string
}

export const HOME_SEO: Record<Lang, SeoEntry> = {
  es: {
    title: 'Diseño web premium y software a medida para empresas | Archic',
    description: 'Diseño web premium y software a medida para empresas, con especialización en movilidad premium, hospitality e inmobiliario. Marbella, Sevilla y España.',
    ogAlt: 'Archic — diseño web premium y sistemas para negocios de alto valor',
    schemaName: 'Archic',
  },
  en: {
    title: 'Premium web design and custom software for businesses | Archic',
    description: 'Premium web design and custom software, with growing depth in luxury mobility, hospitality and real estate. Marbella, Seville and projects across Spain.',
    ogAlt: 'Archic — premium web design and systems for high-value businesses',
    schemaName: 'Archic',
  },
}

export const SITE_PAGE_SEO: Record<Lang, Record<SitePageKey, SeoEntry>> = {
  es: {
    presence: {
      title: 'Diseño web premium y presencia digital | Archic',
      description: 'Diseño web premium, dirección digital, contenido y conversión para empresas que necesitan una presencia online al nivel real de su negocio.',
      ogAlt: 'Archic Presence — diseño web premium y presencia digital',
      schemaName: 'Archic Presence',
      serviceType: 'Diseño web premium y presencia digital',
    },
    control: {
      title: 'Software de gestión a medida para empresas | Archic',
      description: 'Sistemas privados para gestionar clientes, reservas, recursos y operaciones, diseñados alrededor de cómo funciona realmente cada empresa.',
      ogAlt: 'Archic Control — software de gestión a medida para empresas',
      schemaName: 'Archic Control',
      serviceType: 'Software de gestión a medida',
    },
    business: {
      title: 'Software a medida y automatización empresarial | Archic',
      description: 'Desarrollamos software a medida, automatizaciones, integraciones y sistemas de datos para empresas que necesitan una ventaja operativa propia.',
      ogAlt: 'Archic Business — software a medida y automatización empresarial',
      schemaName: 'Archic Business',
      serviceType: 'Software a medida y automatización empresarial',
    },
    studio: {
      title: 'Estudio de diseño web y software a medida | Archic',
      description: 'Conoce cómo trabaja Archic: diseño, desarrollo y criterio de negocio para construir webs premium, sistemas operativos y software a medida.',
      ogAlt: 'Archic Studio — diseño, tecnología y criterio de negocio',
      schemaName: 'Archic Studio',
    },
    contact: {
      title: 'Contacto y proyectos digitales | Archic',
      description: 'Cuéntanos qué negocio tienes, qué quieres mejorar y qué resultado buscas. Habla con Archic por teléfono o envía una consulta de proyecto.',
      ogAlt: 'Contacto con Archic para nuevos proyectos digitales',
      schemaName: 'Contacto — Archic',
    },
  },
  en: {
    presence: {
      title: 'Premium web design and digital presence | Archic',
      description: 'Premium web design, digital direction, content and conversion for businesses that need an online presence matching their real standard.',
      ogAlt: 'Archic Presence — premium web design and digital presence',
      schemaName: 'Archic Presence',
      serviceType: 'Premium web design and digital presence',
    },
    control: {
      title: 'Custom business management software | Archic',
      description: 'Private systems for customers, bookings, resources and operations, designed around the way each business actually works.',
      ogAlt: 'Archic Control — custom business management software',
      schemaName: 'Archic Control',
      serviceType: 'Custom business management software',
    },
    business: {
      title: 'Custom software and business automation | Archic',
      description: 'Custom software, automation, integrations and data systems for businesses that need their own operational advantage.',
      ogAlt: 'Archic Business — custom software and business automation',
      schemaName: 'Archic Business',
      serviceType: 'Custom software and business automation',
    },
    studio: {
      title: 'Web design and custom software studio | Archic',
      description: 'How Archic works: design, development and business judgement for premium websites, operating systems and custom software.',
      ogAlt: 'Archic Studio — design, technology and business judgement',
      schemaName: 'Archic Studio',
    },
    contact: {
      title: 'Contact and digital projects | Archic',
      description: 'Tell us about the business, what you want to improve and the outcome you need. Call Archic or send a private project enquiry.',
      ogAlt: 'Contact Archic about a new digital project',
      schemaName: 'Contact — Archic',
    },
  },
}

export function sitePageCanonical(lang: Lang, page: SitePageKey) {
  return `${SITE_ORIGIN}${lang === 'en' ? '/en' : ''}/${page}/`
}

export function sitePageAlternates(page: SitePageKey) {
  return {
    es: `${SITE_ORIGIN}/${page}/`,
    en: `${SITE_ORIGIN}/en/${page}/`,
    xDefault: `${SITE_ORIGIN}/${page}/`,
  }
}

export function siteOgImage(lang: Lang) {
  return `${SITE_ORIGIN}/${lang === 'en' ? 'og-image-en.png' : 'og-image.png'}?${OG_VERSION}`
}

export function organizationNode() {
  const contactBase = {
    '@type': 'ContactPoint',
    areaServed: { '@type': 'Country', name: 'Spain' },
    availableLanguage: ['Spanish', 'English'],
  }

  return {
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'Archic',
    alternateName: 'Archic Digital Systems',
    url: `${SITE_ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_ORIGIN}/#logo`,
      url: ARCHIC_SYMBOL_URL,
      contentUrl: ARCHIC_SYMBOL_URL,
      width: 512,
      height: 512,
      caption: 'Archic',
    },
    image: siteOgImage('es'),
    email: VADIM_CONTACT.email,
    telephone: VADIM_CONTACT.phone,
    founder: [
      {
        '@type': 'Person',
        name: VADIM_CONTACT.name,
        jobTitle: `${VADIM_CONTACT.role} · ${VADIM_CONTACT.focus}`,
      },
      {
        '@type': 'Person',
        name: ANTERO_CONTACT.name,
        jobTitle: `${ANTERO_CONTACT.role} · ${ANTERO_CONTACT.focus}`,
      },
    ],
    location: {
      '@type': 'Place',
      name: `${ARCHIC_BASE.city}, ${ARCHIC_BASE.province}, ${ARCHIC_BASE.countryName}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: ARCHIC_BASE.city,
        addressRegion: ARCHIC_BASE.province,
        postalCode: ARCHIC_BASE.postalCode,
        addressCountry: ARCHIC_BASE.countryCode,
      },
    },
    areaServed: ARCHIC_SERVICE_AREAS,
    knowsAbout: ARCHIC_KNOWS_ABOUT,
    knowsLanguage: ['es', 'en'],
    contactPoint: [
      {
        ...contactBase,
        telephone: VADIM_CONTACT.phone,
        email: VADIM_CONTACT.email,
        contactType: 'project enquiries',
      },
      {
        ...contactBase,
        telephone: ANTERO_CONTACT.phone,
        email: ANTERO_CONTACT.email,
        contactType: 'sales and client partnerships',
      },
    ],
  }
}

export function buildSitePageGraph(page: SitePageKey, lang: Lang) {
  const seo = SITE_PAGE_SEO[lang][page]
  const canonical = sitePageCanonical(lang, page)
  const home = lang === 'en' ? `${SITE_ORIGIN}/en/` : `${SITE_ORIGIN}/`
  const organization = organizationNode()

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'es' ? 'Inicio' : 'Home', item: home },
      { '@type': 'ListItem', position: 2, name: seo.schemaName, item: canonical },
    ],
  }

  const pageNode = {
    '@type': page === 'contact' ? 'ContactPage' : page === 'studio' ? 'AboutPage' : 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: seo.title,
    description: seo.description,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    about: { '@id': `${SITE_ORIGIN}/#organization` },
    breadcrumb: { '@id': `${canonical}#breadcrumb` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: siteOgImage(lang),
      width: 1200,
      height: 630,
    },
  }

  const serviceNode = seo.serviceType
    ? {
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: seo.schemaName,
        serviceType: seo.serviceType,
        description: seo.description,
        url: canonical,
        provider: { '@id': `${SITE_ORIGIN}/#organization` },
        areaServed: { '@type': 'Country', name: lang === 'es' ? 'España' : 'Spain' },
        availableLanguage: ['es', 'en'],
      }
    : null

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, breadcrumb, pageNode, ...(serviceNode ? [serviceNode] : [])],
  }
}
