import { VADIM_CONTACT } from '../config/contact'
import { ARCHIC_SYMBOL_URL, SITE_ORIGIN, siteOgImage } from './siteSeo'

/**
 * Datos verificables de Archic para marcado geográfico.
 *
 * Regla principal: Archic tiene una única base declarada en Écija (Sevilla) y
 * presta servicio a empresas de toda España. Una landing de ciudad describe un
 * mercado atendido, no una oficina, sucursal o ubicación física adicional.
 *
 * No emitimos calle, horarios, radio de servicio, rango de precios ni una ficha
 * de Google Business Profile hasta que esos datos existan y puedan verificarse.
 */
export const LOCAL_BUSINESS = {
  name: 'Archic',
  legalName: null as string | null,
  email: VADIM_CONTACT.email,
  telephone: VADIM_CONTACT.phone,
  streetAddress: null as string | null,
  postalCode: '41400',
  city: 'Écija',
  province: 'Sevilla',
  region: 'Andalucía',
  country: 'ES',
  countryName: 'España',
  googleBusinessProfile: null as string | null,
} as const

export type LocalScope = {
  /** Ciudad o mercado principal al que responde la landing. */
  city: string
  province: string
  /** Municipios y zonas que la página puede cubrir como mercado atendido. */
  alsoServes: string[]
  /** Se conserva por compatibilidad con datos antiguos, pero no implica sede. */
  geo?: { latitude: number; longitude: number }
}

function verifiedPostalAddress() {
  if (!LOCAL_BUSINESS.streetAddress) return null

  return {
    '@type': 'PostalAddress',
    streetAddress: LOCAL_BUSINESS.streetAddress,
    addressLocality: LOCAL_BUSINESS.city,
    addressRegion: LOCAL_BUSINESS.province,
    postalCode: LOCAL_BUSINESS.postalCode,
    addressCountry: LOCAL_BUSINESS.country,
  }
}

/**
 * Nodo de servicio profesional conservado para compatibilidad con generadores
 * anteriores. Solo publica datos verificables y nunca sitúa Archic físicamente
 * en la ciudad objetivo de una landing.
 */
export function localBusinessNode(scope: LocalScope, lang: 'es' | 'en' = 'es') {
  const isBaseMarket = scope.city === LOCAL_BUSINESS.city && scope.province === LOCAL_BUSINESS.province
  const description =
    lang === 'es'
      ? isBaseMarket
        ? `Archic es un estudio español de sistemas digitales con base en ${LOCAL_BUSINESS.city} (${LOCAL_BUSINESS.province}). Diseña presencia digital premium, sistemas de gestión y software a medida para empresas de toda España.`
        : `Archic es un estudio español de sistemas digitales con base en ${LOCAL_BUSINESS.city} (${LOCAL_BUSINESS.province}) que atiende proyectos de ${scope.city} y del resto de España. Esta cobertura no implica una oficina física en ${scope.city}.`
      : isBaseMarket
        ? `Archic is a Spanish digital systems studio based in ${LOCAL_BUSINESS.city}, ${LOCAL_BUSINESS.province}. It builds premium digital presence, management systems and custom software for businesses across Spain.`
        : `Archic is a Spanish digital systems studio based in ${LOCAL_BUSINESS.city}, ${LOCAL_BUSINESS.province}, serving projects in ${scope.city} and across Spain. This service coverage does not imply a physical office in ${scope.city}.`

  const address = verifiedPostalAddress()

  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE_ORIGIN}/#professionalservice`,
    name: LOCAL_BUSINESS.name,
    ...(LOCAL_BUSINESS.legalName ? { legalName: LOCAL_BUSINESS.legalName } : {}),
    url: `${SITE_ORIGIN}/`,
    image: siteOgImage(lang),
    logo: ARCHIC_SYMBOL_URL,
    email: LOCAL_BUSINESS.email,
    telephone: LOCAL_BUSINESS.telephone,
    ...(LOCAL_BUSINESS.googleBusinessProfile ? { sameAs: [LOCAL_BUSINESS.googleBusinessProfile] } : {}),
    ...(address ? { address } : {}),
    description,
    inLanguage: lang,
    areaServed: [
      { '@type': 'Country', name: lang === 'es' ? 'España' : 'Spain' },
      { '@type': 'City', name: scope.city },
      ...scope.alsoServes.map((name) => ({ '@type': 'City', name })),
      { '@type': 'AdministrativeArea', name: scope.province },
    ],
    knowsLanguage: ['es', 'en'],
    parentOrganization: { '@id': `${SITE_ORIGIN}/#organization` },
  }
}
