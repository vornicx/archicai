/**
 * Datos NAP (Name, Address, Phone) de Archic y helpers de JSON-LD local.
 *
 * Google trata la coherencia NAP entre web, Google Business Profile y
 * directorios como una señal de confianza para el paquete local. Este archivo
 * es la única fuente de verdad: cualquier cambio de dirección o teléfono debe
 * hacerse aquí y replicarse literalmente en la ficha de GBP.
 *
 * No se inventa nada: los campos que aún no están confirmados (calle exacta,
 * teléfono, URL de la ficha de GBP) quedan como `null` y simplemente no se
 * emiten en el marcado. Publicar un dato falso en LocalBusiness es peor que
 * omitirlo: Google lo contrasta con la ficha y penaliza la discrepancia.
 */

export const LOCAL_BUSINESS = {
  name: 'Archic',
  legalName: null as string | null,
  email: 'vornic@archic.es',
  /** Añadir cuando exista número de contacto público; debe coincidir con GBP. */
  telephone: null as string | null,
  /** Calle y número: rellenar solo si la ficha de GBP muestra dirección exacta. */
  streetAddress: null as string | null,
  postalCode: '41400',
  city: 'Écija',
  province: 'Sevilla',
  region: 'Andalucía',
  country: 'ES',
  /** Centro de Écija. Suficiente para el radio de servicio; no es una puerta. */
  geo: { latitude: 37.5417, longitude: -5.0823 },
  serviceRadiusKm: 120,
  priceRange: '€€',
  /** URL de la ficha de Google Business Profile, una vez verificada. */
  googleBusinessProfile: null as string | null,
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
  ],
} as const

export type LocalScope = {
  /** Ciudad principal a la que apunta la landing. */
  city: string
  province: string
  /** Municipios y comarcas mencionados como área de servicio. */
  alsoServes: string[]
  geo?: { latitude: number; longitude: number }
}

const ORIGIN = 'https://archic.es'

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    ...(LOCAL_BUSINESS.streetAddress ? { streetAddress: LOCAL_BUSINESS.streetAddress } : {}),
    addressLocality: LOCAL_BUSINESS.city,
    addressRegion: LOCAL_BUSINESS.province,
    postalCode: LOCAL_BUSINESS.postalCode,
    addressCountry: LOCAL_BUSINESS.country,
  }
}

/**
 * Nodo ProfessionalService (subtipo de LocalBusiness) con el ámbito de la
 * página. Se emite por idioma para que los rich results locales muestren el
 * texto en la lengua de la página.
 */
export function localBusinessNode(scope: LocalScope, lang: 'es' | 'en' = 'es') {
  const description =
    lang === 'es'
      ? `Estudio de diseño y desarrollo web en ${LOCAL_BUSINESS.city} (${LOCAL_BUSINESS.province}). Páginas web, software a medida y mantenimiento para empresas y autónomos de ${scope.city} y provincia.`
      : `Web design and development studio based in ${LOCAL_BUSINESS.city}, ${LOCAL_BUSINESS.province} (Spain). Websites, custom software and maintenance for companies and freelancers in ${scope.city} and the surrounding province.`

  return {
    '@type': 'ProfessionalService',
    '@id': `${ORIGIN}/#localbusiness`,
    name: LOCAL_BUSINESS.name,
    ...(LOCAL_BUSINESS.legalName ? { legalName: LOCAL_BUSINESS.legalName } : {}),
    url: `${ORIGIN}/`,
    image: `${ORIGIN}/og-image.jpg`,
    logo: `${ORIGIN}/archic-mark.png`,
    email: LOCAL_BUSINESS.email,
    ...(LOCAL_BUSINESS.telephone ? { telephone: LOCAL_BUSINESS.telephone } : {}),
    ...(LOCAL_BUSINESS.googleBusinessProfile
      ? { sameAs: [LOCAL_BUSINESS.googleBusinessProfile] }
      : {}),
    description,
    inLanguage: lang,
    priceRange: LOCAL_BUSINESS.priceRange,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: LOCAL_BUSINESS.geo.latitude,
      longitude: LOCAL_BUSINESS.geo.longitude,
    },
    areaServed: [
      { '@type': 'City', name: scope.city },
      ...scope.alsoServes.map((name) => ({ '@type': 'City', name })),
      { '@type': 'AdministrativeArea', name: `Provincia de ${scope.province}` },
      { '@type': 'AdministrativeArea', name: LOCAL_BUSINESS.region },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: (scope.geo ?? LOCAL_BUSINESS.geo).latitude,
        longitude: (scope.geo ?? LOCAL_BUSINESS.geo).longitude,
      },
      geoRadius: LOCAL_BUSINESS.serviceRadiusKm * 1000,
    },
    knowsLanguage: ['es', 'en'],
    openingHoursSpecification: LOCAL_BUSINESS.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    parentOrganization: { '@id': `${ORIGIN}/#organization` },
  }
}
