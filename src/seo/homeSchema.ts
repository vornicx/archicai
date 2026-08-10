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
        ['Archic Presence', 'Diseño web premium y presencia digital', `${SITE_ORIGIN}/presence/`],
        ['Archic Control', 'Software de gestión a medida para clientes, reservas, recursos y operaciones', `${SITE_ORIGIN}/control/`],
        ['Archic Business', 'Software a medida, automatización, integraciones y datos', `${SITE_ORIGIN}/business/`],
      ]
    : [
        ['Archic Presence', 'Premium web design and digital presence', `${SITE_ORIGIN}/en/presence/`],
        ['Archic Control', 'Custom management software for customers, bookings, resources and operations', `${SITE_ORIGIN}/en/control/`],
        ['Archic Business', 'Custom software, automation, integrations and data', `${SITE_ORIGIN}/en/business/`],
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
