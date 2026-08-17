import { useLang } from '../i18n/LanguageContext'

type Lang = 'es' | 'en'

const COPY = {
  es: {
    kicker: 'MERCADOS / VERTICALES',
    title: 'Profundidad donde el estándar digital pesa más.',
    lead: 'Seguimos trabajando con empresas de distintos sectores, pero estamos concentrando producto, criterio y experiencia en negocios premium donde presencia y operación tienen impacto directo en la venta.',
    place: {
      eyebrow: 'MARBELLA / PUERTO BANÚS',
      title: 'La Costa del Sol como escaparate de nuestro siguiente nivel.',
      body: 'Movilidad de lujo, hospitality, inmobiliario, charter y servicios de alto valor: negocios donde una web genérica se queda corta y la experiencia digital forma parte del producto.',
      cta: 'Diseño web en Marbella',
      tags: ['Luxury mobility', 'Hospitality', 'Real estate', 'Yachting / charter'],
    },
    sectors: [
      {
        no: '01',
        id: 'mobility',
        title: 'Movilidad premium',
        meta: 'Flota · Disponibilidad · Solicitudes · CRM',
        body: 'Presencia de marca y sistemas internos para rent a car, renting, concesionarios y servicios de automoción de alto valor.',
        href: '/diseno-web-alquiler-coches/',
        cta: 'Ver solución',
      },
      {
        no: '02',
        id: 'hospitality',
        title: 'Hospitality',
        meta: 'Reservas · Sala · Carta · Clientes',
        body: 'Restaurantes, beach clubs y experiencias donde la reserva, el servicio y la percepción deben sentirse como una sola marca.',
        href: '/diseno-web-restaurantes/',
        cta: 'Ver solución',
      },
      {
        no: '03',
        id: 'real-estate',
        title: 'Real estate',
        meta: 'Portfolio · Leads · CRM · SEO',
        body: 'Inmobiliario premium con catálogo, captación, gestión comercial y una dirección visual capaz de sostener activos de alto valor.',
        href: '/diseno-web-inmobiliarias/',
        cta: 'Ver solución',
      },
    ],
    geoKicker: 'BASE / ALCANCE',
    geo: [
      ['Sevilla', 'Autoridad local y proyectos empresariales', '/diseno-web-sevilla/'],
      ['Écija', 'Base operativa y relación cercana', '/diseno-web-ecija/'],
      ['España', 'Proyectos remotos de mayor alcance', '/contact/'],
    ],
  },
  en: {
    kicker: 'MARKETS / VERTICALS',
    title: 'Depth where digital standards carry more weight.',
    lead: 'We still work across different industries, but we are concentrating product knowledge, judgement and experience in premium businesses where presence and operations have a direct impact on revenue.',
    place: {
      eyebrow: 'MARBELLA / PUERTO BANÚS',
      title: 'The Costa del Sol as a showcase for our next level.',
      body: 'Luxury mobility, hospitality, real estate, charter and high-value services: businesses where a generic website falls short and the digital experience becomes part of the product.',
      cta: 'Web design in Marbella',
      tags: ['Luxury mobility', 'Hospitality', 'Real estate', 'Yachting / charter'],
    },
    sectors: [
      {
        no: '01',
        id: 'mobility',
        title: 'Luxury mobility',
        meta: 'Fleet · Availability · Enquiries · CRM',
        body: 'Brand presence and internal systems for premium rentals, leasing, dealerships and high-value automotive services.',
        href: '/en/explorations/mobility/',
        cta: 'Explore solution',
      },
      {
        no: '02',
        id: 'hospitality',
        title: 'Hospitality',
        meta: 'Bookings · Floor · Menu · Customers',
        body: 'Restaurants, beach clubs and experiences where booking, service and perception should feel like one brand.',
        href: '/en/explorations/hospitality/',
        cta: 'Explore solution',
      },
      {
        no: '03',
        id: 'real-estate',
        title: 'Real estate',
        meta: 'Portfolio · Leads · CRM · SEO',
        body: 'Premium property platforms combining listings, acquisition, sales operations and visual direction worthy of high-value assets.',
        href: '/en/explorations/real-estate/',
        cta: 'Explore solution',
      },
    ],
    geoKicker: 'BASE / REACH',
    geo: [
      ['Seville', 'Local authority and business projects', '/diseno-web-sevilla/'],
      ['Écija', 'Operating base and close collaboration', '/diseno-web-ecija/'],
      ['Spain', 'Remote projects with broader scope', '/en/contact/'],
    ],
  },
} as const

function localizedHref(lang: Lang, href: string) {
  if (lang === 'es' || href.startsWith('/en/')) return href
  if (href === '/contact/') return '/en/contact/'
  return href
}

export default function MarketFocus() {
  const { lang } = useLang()
  const c = COPY[lang]

  return (
    <section className="amf" aria-labelledby="archic-market-focus-title">
      <div className="amf-head" data-reveal>
        <p className="ah-kicker">{c.kicker}</p>
        <h2 id="archic-market-focus-title">{c.title}</h2>
        <p>{c.lead}</p>
      </div>

      <div className="amf-stage">
        <a className="amf-place" href="/diseno-web-marbella/" data-reveal>
          <div className="amf-place-top">
            <span>{c.place.eyebrow}</span>
            <span>36.51° N / 4.88° W</span>
          </div>
          <div className="amf-place-copy">
            <h3>{c.place.title}</h3>
            <p>{c.place.body}</p>
            <div className="amf-tags" aria-label={lang === 'es' ? 'Sectores objetivo' : 'Target sectors'}>
              {c.place.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <span className="amf-open">{c.place.cta}<i className="as-arrow" aria-hidden="true" /></span>
          </div>
        </a>

        <div className="amf-sectors">
          {c.sectors.map((sector) => (
            <a
              className="amf-sector"
              data-sector={sector.id}
              href={localizedHref(lang as Lang, sector.href)}
              key={sector.id}
              data-reveal
            >
              <div className="amf-sector-head"><span>{sector.no}</span><small>{sector.meta}</small></div>
              <div className="amf-sector-copy">
                <h3>{sector.title}</h3>
                <p>{sector.body}</p>
                <span className="amf-open">{sector.cta}<i className="as-arrow" aria-hidden="true" /></span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="amf-geo" data-reveal>
        <span className="amf-geo-kicker">{c.geoKicker}</span>
        {c.geo.map(([name, description, href]) => (
          <a href={localizedHref(lang as Lang, href)} key={name}>
            <strong>{name}</strong>
            <span>{description}</span>
            <i className="as-arrow" aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  )
}
