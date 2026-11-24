import { VADIM_CONTACT } from '../config/contact'
import { type Lang } from '../i18n/content'

export const SITE_ORIGIN = 'https://archic.es'
export const BRAND_VERSION = '20260827'
export const ARCHIC_SYMBOL_URL = `${SITE_ORIGIN}/brand/archic-symbol-2026.svg`
export const ARCHIC_LOCKUP_URL = `${SITE_ORIGIN}/brand/archic-lockup-dark.svg`
export const ARCHIC_COMMERCIAL_SUMMARY_ES =
  'Archic reúne Archic Studio, diseño web y software a medida para empresas de España y todo el mundo, y Archic Lab, investigación y productos digitales propios.'
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
  { '@type': 'Country', name: 'Spain' },
  'Worldwide',
] as const

export const ARCHIC_KNOWS_ABOUT = [
  'Affordable business web design',
  'Remote website development',
  'International web design',
  'Small business websites',
  'Web application development',
  'Custom web software',
  'Digital presence',
  'Digital opportunity audits',
  'Conversion measurement',
  'Search and AI readiness',
  'Technical SEO',
  'Structured data',
  'Supervised AI workflows',
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
  'Education platforms',
  'Industrial operations software',
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
    title: 'Archic | Diseño web, software y productos digitales',
    description: 'Archic reúne Archic Studio, diseño web y software a medida para empresas de España y todo el mundo, y Archic Lab, investigación y productos digitales propios.',
    ogAlt: 'Archic — Studio y Lab',
    schemaName: 'Archic',
  },
  en: {
    title: 'Archic | Web design, software and digital products',
    description: 'Archic brings together Archic Studio, web design and custom software for businesses worldwide, and Archic Lab, research and independent digital products.',
    ogAlt: 'Archic — Studio and Lab',
    schemaName: 'Archic',
  },
}

export const SITE_PAGE_SEO: Record<Lang, Record<SitePageKey, SeoEntry>> = {
  es: {
    presence: {
      title: 'Diseño web para empresas desde España | 349 € + IVA | Archic Studio',
      description: 'Diseño web para empresas y autónomos de España y cualquier país: 349 € + IVA, ZIP y guía. Publicación remota opcional por 49 € + IVA.',
      ogAlt: 'Archic Presence — diseño web premium y presencia digital',
      schemaName: 'Archic Presence',
      serviceType: 'Diseño web premium y presencia digital',
    },
    control: {
      title: 'Software de gestión a medida para empresas | Archic Studio',
      description: 'Sistemas privados para gestionar clientes, reservas, recursos y operaciones, diseñados alrededor de cómo funciona realmente cada empresa.',
      ogAlt: 'Archic Control — software de gestión a medida para empresas',
      schemaName: 'Archic Control',
      serviceType: 'Software de gestión a medida',
    },
    business: {
      title: 'Software a medida y automatización empresarial | Archic Studio',
      description: 'Desarrollamos software a medida, automatizaciones, integraciones y sistemas de datos para empresas que necesitan una ventaja operativa propia.',
      ogAlt: 'Archic Business — software a medida y automatización empresarial',
      schemaName: 'Archic Business',
      serviceType: 'Software a medida y automatización empresarial',
    },
    studio: {
      title: 'Diseño web y software a medida internacional | Archic Studio',
      description: 'Webs sencillas por 349 € + IVA con ZIP y guía de publicación; despliegue opcional por 49 € + IVA. Software a medida bajo presupuesto. Servicio en España y todo el mundo.',
      ogAlt: 'Archic Studio — diseño, tecnología y criterio de negocio',
      schemaName: 'Archic Studio',
    },
    contact: {
      title: 'Contacto y diagnóstico de proyectos digitales | Archic',
      description: 'Cuéntanos cómo funciona tu negocio, qué no está funcionando y qué resultado buscas. Solicita un diagnóstico o habla directamente con Archic Studio.',
      ogAlt: 'Contacto y Digital Opportunity Audit con Archic Studio',
      schemaName: 'Contacto — Archic Studio',
    },
  },
  en: {
    presence: {
      title: 'Affordable business web design | €349 + VAT | Archic Studio',
      description: 'Remote web design for businesses worldwide. Fixed €349 price before applicable taxes, ZIP delivery and guide. Optional publishing for €49.',
      ogAlt: 'Archic Presence — premium web design and digital presence',
      schemaName: 'Archic Presence',
      serviceType: 'Premium web design and digital presence',
    },
    control: {
      title: 'Custom business management software | Archic Studio',
      description: 'Private systems for customers, bookings, resources and operations, designed around the way each business actually works.',
      ogAlt: 'Archic Control — custom business management software',
      schemaName: 'Archic Control',
      serviceType: 'Custom business management software',
    },
    business: {
      title: 'Custom software and business automation | Archic Studio',
      description: 'Custom software, automation, integrations and data systems for businesses that need their own operational advantage.',
      ogAlt: 'Archic Business — custom software and business automation',
      schemaName: 'Archic Business',
      serviceType: 'Custom software and business automation',
    },
    studio: {
      title: 'Remote web design and custom software studio | Archic Studio',
      description: 'Simple websites for €349 + VAT with ZIP and publishing guide; optional deployment for €49 + VAT. Custom software on request. Serving businesses worldwide in English and Spanish.',
      ogAlt: 'Archic Studio — design, technology and business judgement',
      schemaName: 'Archic Studio',
    },
    contact: {
      title: 'Contact and digital opportunity audit | Archic',
      description: 'Tell us how the business works, what is not working and what outcome you need. Request an audit or talk directly with Archic Studio.',
      ogAlt: 'Contact Archic Studio or request a Digital Opportunity Audit',
      schemaName: 'Contact — Archic Studio',
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
    areaServed: ARCHIC_SERVICE_AREAS,
    availableLanguage: ['Spanish', 'English'],
  }

  return {
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'Archic',
    department: [
      { '@type': 'Organization', '@id': `${SITE_ORIGIN}/#studio`, name: 'Archic Studio', url: `${SITE_ORIGIN}/studio/` },
      { '@type': 'Organization', '@id': `${SITE_ORIGIN}/#lab`, name: 'Archic Lab', url: `${SITE_ORIGIN}/lab/` },
    ],
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
        telephone: VADIM_CONTACT.phone,
        url: VADIM_CONTACT.whatsappUrl,
        contactType: 'WhatsApp project enquiries',
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
        areaServed: ARCHIC_SERVICE_AREAS,
        availableLanguage: ['es', 'en'],
      }
    : null

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, breadcrumb, pageNode, ...(serviceNode ? [serviceNode] : [])],
  }
}
