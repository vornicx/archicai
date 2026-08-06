/**
 * Grafo JSON-LD compartido por la página React y el generador de HTML estático.
 *
 * Tenerlo en un único sitio evita que el marcado que ve el rastreador (HTML
 * estático) y el que se hidrata en cliente diverjan, cosa que Search Console
 * reporta como datos estructurados inconsistentes.
 */
import type { ServicePage } from './servicePages'
import type { LocalLandingPage } from './localPages'
import { localBusinessNode } from './localBusiness'

const ORIGIN = 'https://archic.es'

export function isLocalLanding(page: ServicePage): page is LocalLandingPage {
  return 'local' in page && Boolean((page as LocalLandingPage).local)
}

export function buildLandingGraph(page: ServicePage, lang: 'es' | 'en' = 'es') {
  const canonical = `${ORIGIN}${page.path}`
  const local = isLocalLanding(page) ? page.local : null

  /* En una landing local el proveedor del servicio es el negocio local, no la
     organización genérica: es lo que enlaza el Service con el nodo que Google
     usa para los resultados del paquete local. */
  const providerId = local ? `${ORIGIN}/#localbusiness` : `${ORIGIN}/#organization`

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
      ...(local ? [localBusinessNode(local, lang)] : []),
      {
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: page.serviceName,
        description: page.meta.description,
        serviceType: page.keyword,
        provider: { '@id': providerId },
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
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${ORIGIN}/` },
          ...(local
            ? [{ '@type': 'ListItem', position: 2, name: `${local.province}`, item: `${ORIGIN}/diseno-web-sevilla/` }]
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
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        inLanguage: lang,
        mainEntity: page.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.meta.title,
        description: page.meta.description,
        inLanguage: lang,
        isPartOf: { '@id': `${ORIGIN}/#website` },
        about: { '@id': providerId },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
      },
    ],
  }
}
