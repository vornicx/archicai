import { CONTENT, CONTACT_MAIL, type Lang } from '../i18n/content'
import { localBusinessNode } from './localBusiness'

const ORIGIN = 'https://archic.es'

export const HOME_LOCAL_SCOPE = {
  city: 'Écija',
  province: 'Sevilla',
  alsoServes: ['Sevilla', 'Marbella', 'Puerto Banús', 'Costa del Sol'],
}

export function homeCanonical(lang: Lang) {
  return lang === 'es' ? `${ORIGIN}/` : `${ORIGIN}/en/`
}

export function buildHomeGraph(lang: Lang) {
  const t = CONTENT[lang]
  const canonical = homeCanonical(lang)
  const country = lang === 'es' ? 'España' : 'Spain'

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${ORIGIN}/#organization`,
        name: 'Archic',
        url: `${ORIGIN}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${ORIGIN}/archic-mark-512.png`,
          contentUrl: `${ORIGIN}/archic-mark-512.png`,
          width: 512,
          height: 512,
        },
        image: `${ORIGIN}/og-image.png`,
        email: CONTACT_MAIL,
        description: t.meta.description,
        areaServed: { '@type': 'Country', name: country },
        knowsLanguage: ['es', 'en'],
        contactPoint: {
          '@type': 'ContactPoint',
          email: CONTACT_MAIL,
          contactType: 'sales',
          availableLanguage: ['Spanish', 'English'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: lang === 'es' ? 'Servicios digitales para empresas' : 'Digital services for businesses',
          itemListElement: t.services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.intro,
              provider: { '@id': `${ORIGIN}/#organization` },
              areaServed: { '@type': 'Country', name: country },
            },
          })),
        },
      },
      localBusinessNode(HOME_LOCAL_SCOPE, lang),
      {
        '@type': 'WebSite',
        '@id': `${ORIGIN}/#website`,
        url: `${ORIGIN}/`,
        name: 'Archic',
        inLanguage: ['es', 'en'],
        publisher: { '@id': `${ORIGIN}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: lang === 'es' ? 'Archic — La parte digital de negocios excepcionales' : 'Archic — The digital side of exceptional businesses',
        description: lang === 'es'
          ? 'Estrategia, diseño, webs premium y software a medida para construir la parte digital de negocios ambiciosos.'
          : 'Strategy, design, premium websites and custom software for ambitious businesses.',
        inLanguage: lang,
        isPartOf: { '@id': `${ORIGIN}/#website` },
        about: { '@id': `${ORIGIN}/#organization` },
      },
    ],
  }
}
