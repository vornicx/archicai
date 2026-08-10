/**
 * Grafo JSON-LD compartido por la página React y el generador de HTML estático.
 * Solo se publican datos que puedan verificarse en la propia web.
 */
import type { ServicePage } from './servicePages'
import type { LocalLandingPage } from './localPages'
import { organizationNode, SITE_ORIGIN } from './siteSeo'

export function isLocalLanding(page: ServicePage): page is LocalLandingPage {
  return 'local' in page && Boolean((page as LocalLandingPage).local)
}

export function buildLandingGraph(page: ServicePage, lang: 'es' | 'en' = 'es') {
  const canonical = `${SITE_ORIGIN}${page.path}`
  const local = isLocalLanding(page) ? page.local : null

  const areaServed = local
    ? [
        { '@type': 'City', name: local.city },
        ...local.alsoServes.map((name) => ({ '@type': 'City', name })),
        { '@type': 'AdministrativeArea', name: `Provincia de ${local.province}` },
      ]
    : [{ '@type': 'Country', name: 'España' }]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      {
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: page.serviceName,
        description: page.meta.description,
        serviceType: page.keyword,
        provider: { '@id': `${SITE_ORIGIN}/#organization` },
        areaServed,
        availableLanguage: ['es', 'en'],
        ...(local
          ? {
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: `${page.serviceName} — alcance`,
                itemListElement: page.blocks.items.map((item) => ({
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: item.title,
                    description: item.desc,
                  },
                })),
              },
            }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_ORIGIN}/` },
          ...(local
            ? [{ '@type': 'ListItem', position: 2, name: local.province, item: `${SITE_ORIGIN}/diseno-web-sevilla/` }]
            : []),
          {
            '@type': 'ListItem',
            position: local ? 3 : 2,
            name: page.breadcrumb,
            item: canonical,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.meta.title,
        description: page.meta.description,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        about: { '@id': `${canonical}#service` },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
      },
    ],
  }
}
