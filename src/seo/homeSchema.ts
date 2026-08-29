import type { Lang } from '../i18n/content'
import { HOME_SEO, SITE_ORIGIN, organizationNode, siteOgImage } from './siteSeo'

export function homeCanonical(lang: Lang) {
  return lang === 'es' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}/en/`
}

export function buildHomeGraph(lang: Lang) {
  const canonical = homeCanonical(lang)
  const seo = HOME_SEO[lang]
  const country = lang === 'es' ? 'España' : 'Spain'

  const services = lang === 'es'
    ? [
        ['Archic Presence', 'Diseño y desarrollo de webs premium orientadas a claridad, confianza y conversión', `${SITE_ORIGIN}/presence/`],
        ['Archic Control', 'Web apps y software de gestión a medida para clientes, reservas, recursos y operaciones', `${SITE_ORIGIN}/control/`],
        ['Archic Business', 'Software web a medida, automatización, integraciones y datos', `${SITE_ORIGIN}/business/`],
        ['Digital Opportunity Audit', 'Diagnóstico de presencia, conversión, búsqueda y operación para priorizar qué merece construirse primero', `${SITE_ORIGIN}/#audit`],
        ['Archic Evolution', 'Monitorización, mejoras de experiencia, búsqueda, contenido, pequeñas automatizaciones y roadmap después del lanzamiento', `${SITE_ORIGIN}/#evolution`],
        ['Movilidad premium', 'Web, solicitudes, flota y CRM para rent a car, renting y negocios de automoción premium', `${SITE_ORIGIN}/diseno-web-alquiler-coches/`],
        ['Hospitality', 'Web, reservas, sala, carta y gestión de clientes para restaurantes y hospitality', `${SITE_ORIGIN}/diseno-web-restaurantes/`],
        ['Real estate premium', 'Web, portfolio, captación, leads y CRM para inmobiliarias y real estate premium', `${SITE_ORIGIN}/diseno-web-inmobiliarias/`],
      ]
    : [
        ['Archic Presence', 'Premium website design and development focused on clarity, trust and conversion', `${SITE_ORIGIN}/en/presence/`],
        ['Archic Control', 'Custom web apps and management software for customers, bookings, resources and operations', `${SITE_ORIGIN}/en/control/`],
        ['Archic Business', 'Custom web software, automation, integrations and data', `${SITE_ORIGIN}/en/business/`],
        ['Digital Opportunity Audit', 'A review of presence, conversion, search and operations to prioritise what should be built first', `${SITE_ORIGIN}/en/#audit`],
        ['Archic Evolution', 'Monitoring, experience improvements, search, content, small automations and product roadmap after launch', `${SITE_ORIGIN}/en/#evolution`],
        ['Luxury mobility', 'Web, fleet, enquiries and CRM for premium rental, leasing and automotive businesses', `${SITE_ORIGIN}/en/explorations/mobility/`],
        ['Hospitality', 'Web, bookings, floor operations, menus and customer management for hospitality businesses', `${SITE_ORIGIN}/en/explorations/hospitality/`],
        ['Premium real estate', 'Web, listings, acquisition, leads and CRM for premium real estate businesses', `${SITE_ORIGIN}/en/explorations/real-estate/`],
      ]

  const organization = {
    ...organizationNode(),
    description: seo.description,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'es' ? 'Sistemas digitales para empresas' : 'Digital systems for businesses',
      itemListElement: services.map(([name, description, url]) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
          description,
          url,
          provider: { '@id': `${SITE_ORIGIN}/#organization` },
          areaServed: { '@type': 'Country', name: country },
        },
      })),
    },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: 'Archic',
        alternateName: 'Archic Digital Systems',
        inLanguage: ['es', 'en'],
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        about: { '@id': `${SITE_ORIGIN}/#organization` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: siteOgImage(lang),
          width: 1200,
          height: 630,
        },
      },
    ],
  }
}
