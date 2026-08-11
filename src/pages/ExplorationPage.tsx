import { FormEvent, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'

export type ExplorationKind = 'hospitality' | 'mobility' | 'real-estate'
type DemoView = 'experience' | 'control' | 'business'

const META: Record<ExplorationKind, {
  no: string
  es: { label: string; title: string; accent: string; intro: string; proof: string }
  en: { label: string; title: string; accent: string; intro: string; proof: string }
}> = {
  hospitality: {
    no: '01',
    es: {
      label: 'HOSTELERÍA / PROTOTIPO FUNCIONAL',
      title: 'De la reserva',
      accent: 'a la operación de sala.',
      intro: 'Una experiencia conectada para que reservar sea sencillo para el cliente y útil para el negocio desde el primer dato.',
      proof: 'Reserva → cliente → servicio → seguimiento',
    },
    en: {
      label: 'HOSPITALITY / FUNCTIONAL PROTOTYPE',
      title: 'From booking',
      accent: 'to service operations.',
      intro: 'A connected experience where booking feels simple to the guest and becomes useful operational data from the first interaction.',
      proof: 'Booking → customer → service → follow-up',
    },
  },
  mobility: {
    no: '02',
    es: {
      label: 'MOVILIDAD PREMIUM / PROTOTIPO FUNCIONAL',
      title: 'Del deseo',
      accent: 'a una flota bajo control.',
      intro: 'Descubrimiento, disponibilidad y solicitud dentro de una experiencia premium que continúa en la gestión privada de la flota.',
      proof: 'Vehículo → fechas → solicitud → disponibilidad',
    },
    en: {
      label: 'PREMIUM MOBILITY / FUNCTIONAL PROTOTYPE',
      title: 'From desire',
      accent: 'to a controlled fleet.',
      intro: 'Discovery, availability and enquiry inside a premium experience that continues into private fleet operations.',
      proof: 'Vehicle → dates → enquiry → availability',
    },
  },
  'real-estate': {
    no: '03',
    es: {
      label: 'INMOBILIARIO / PROTOTIPO FUNCIONAL',
      title: 'Del catálogo',
      accent: 'a un lead accionable.',
      intro: 'Búsqueda editorial para el comprador y una capa operativa que convierte cada solicitud en contexto útil para el equipo comercial.',
      proof: 'Búsqueda → propiedad → visita → lead',
    },
    en: {
      label: 'REAL ESTATE / FUNCTIONAL PROTOTYPE',
      title: 'From catalogue',
      accent: 'to an actionable lead.',
      intro: 'Editorial property discovery for the buyer and an operating layer that turns each enquiry into useful sales context.',
      proof: 'Search → property → viewing → lead',
    },
  },
}

function path(lang: 'es' | 'en', slug: string) {
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

function Arrow() {
  return <i className="as-arrow" aria-hidden="true" />
}

function DemoTabs({ active, onChange, lang }: { active: DemoView; onChange: (view: DemoView) => void; lang: 'es' | 'en' }) {
  const labels: [DemoView, string, string][] = [
    ['experience', lang === 'es' ? 'Experiencia' : 'Experience', 'Presence'],
    ['control', 'Control', 'Control'],
    ['business', 'Business', 'Business'],
  ]

  return (
    <div className="axp-tabs" role="tablist" aria-label={lang === 'es' ? 'Capas del prototipo' : 'Prototype layers'}>
      {labels.map(([value, label, product]) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={active === value}
          className={active === value ? 'is-active' : ''}
          onClick={() => onChange(value)}
        >
          <span>{product}</span>
          <strong>{label}</strong>
        </button>
      ))}
    </div>
  )
}

function HospitalityDemo({ view, setView, lang }: { view: DemoView; setView: (view: DemoView) => void; lang: 'es' | 'en' }) {
  const [guests, setGuests] = useState(2)
  const [date, setDate] = useState('14 AGO')
  const [time, setTime] = useState('20:30')
  const [created, setCreated] = useState(false)
  const [status, setStatus] = useState(0)
  const statuses = lang === 'es' ? ['CONFIRMADA', 'SENTADOS', 'COMPLETADA'] : ['CONFIRMED', 'SEATED', 'COMPLETED']

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setCreated(true)
    setStatus(0)
  }

  if (view === 'control') {
    return (
      <div className="axp-panel axp-control-panel">
        <div className="axp-panel-head"><span>ARCHIC CONTROL</span><strong>{lang === 'es' ? 'Servicio de hoy' : "Today's service"}</strong><i>{created ? '04' : '03'} ACTIVE</i></div>
        <div className="axp-ops-summary"><div><small>{lang === 'es' ? 'OCUPACIÓN' : 'OCCUPANCY'}</small><strong>{created ? '82%' : '76%'}</strong></div><div><small>{lang === 'es' ? 'PRÓXIMA MESA' : 'NEXT TABLE'}</small><strong>{time}</strong></div><div><small>NO-SHOW</small><strong>0</strong></div></div>
        <div className="axp-rows">
          <div className="axp-row"><span>19:30</span><strong>Martín · 4</strong><small>MESA 04</small><b>CONFIRMADA</b></div>
          <div className="axp-row"><span>20:00</span><strong>Lucía · 2</strong><small>MESA 08</small><b>SENTADOS</b></div>
          {created && (
            <div className="axp-row axp-row-new"><span>{time}</span><strong>{lang === 'es' ? `Nueva reserva · ${guests}` : `New booking · ${guests}`}</strong><small>{date}</small><button type="button" onClick={() => setStatus((current) => Math.min(current + 1, statuses.length - 1))}>{statuses[status]}</button></div>
          )}
          <div className="axp-row"><span>21:15</span><strong>Private dining · 8</strong><small>SALA 02</small><b>READY</b></div>
        </div>
        {!created && <p className="axp-empty-note">{lang === 'es' ? 'Crea una reserva en Experiencia y aparecerá aquí automáticamente.' : 'Create a booking in Experience and it will appear here automatically.'}</p>}
      </div>
    )
  }

  if (view === 'business') {
    return (
      <div className="axp-panel axp-business-panel">
        <div className="axp-panel-head"><span>ARCHIC BUSINESS</span><strong>{lang === 'es' ? 'Lógica conectada' : 'Connected logic'}</strong><i>{created ? 'LIVE' : 'READY'}</i></div>
        <div className="axp-flow">
          {[
            [lang === 'es' ? 'Reserva' : 'Booking', created ? `${guests} · ${date} · ${time}` : 'WAITING'],
            [lang === 'es' ? 'Cliente' : 'Customer', created ? (lang === 'es' ? 'Perfil creado' : 'Profile created') : '—'],
            [lang === 'es' ? 'Servicio' : 'Service', created ? (lang === 'es' ? 'Añadido a sala' : 'Added to service') : '—'],
            [lang === 'es' ? 'Seguimiento' : 'Follow-up', created ? (lang === 'es' ? 'Preparado' : 'Ready') : '—'],
          ].map(([title, value], index) => <div key={title}><span>0{index + 1}</span><strong>{title}</strong><small>{value}</small></div>)}
        </div>
        <div className="axp-business-note"><span>AUTOMATION</span><p>{lang === 'es' ? 'Una sola acción del cliente alimenta reservas, perfil de cliente y contexto operativo. Sin volver a introducir datos.' : 'One customer action feeds bookings, customer profile and operational context without re-entering data.'}</p></div>
      </div>
    )
  }

  return (
    <form className="axp-panel axp-experience-panel axp-hospitality" onSubmit={submit}>
      <div className="axp-panel-head"><span>ARCHIC PRESENCE</span><strong>{lang === 'es' ? 'Reservar mesa' : 'Book a table'}</strong><i>LIVE DEMO</i></div>
      <div className="axp-experience-title"><small>{lang === 'es' ? 'CENA / TERRAZA' : 'DINNER / TERRACE'}</small><h3>{lang === 'es' ? 'Una reserva sin fricción.' : 'A frictionless booking.'}</h3></div>
      <div className="axp-fields">
        <fieldset><legend>{lang === 'es' ? 'Personas' : 'Guests'}</legend><div className="axp-stepper"><button type="button" onClick={() => setGuests((value) => Math.max(1, value - 1))}>−</button><strong>{guests}</strong><button type="button" onClick={() => setGuests((value) => Math.min(12, value + 1))}>+</button></div></fieldset>
        <fieldset><legend>{lang === 'es' ? 'Fecha' : 'Date'}</legend><div className="axp-choice-row">{['14 AGO', '15 AGO', '16 AGO'].map((value) => <button key={value} type="button" className={date === value ? 'is-selected' : ''} onClick={() => setDate(value)}>{value}</button>)}</div></fieldset>
        <fieldset><legend>{lang === 'es' ? 'Hora' : 'Time'}</legend><div className="axp-choice-row">{['19:30', '20:30', '21:15'].map((value) => <button key={value} type="button" className={time === value ? 'is-selected' : ''} onClick={() => setTime(value)}>{value}</button>)}</div></fieldset>
      </div>
      {created ? (
        <div className="axp-confirm"><span>RESERVA HSP-0821</span><strong>{lang === 'es' ? 'Confirmada.' : 'Confirmed.'}</strong><p>{guests} · {date} · {time}</p><button type="button" onClick={() => setView('control')}>{lang === 'es' ? 'Ver en Control' : 'View in Control'}<Arrow /></button></div>
      ) : <button className="axp-primary-action" type="submit">{lang === 'es' ? 'Confirmar reserva' : 'Confirm booking'}<Arrow /></button>}
    </form>
  )
}

function MobilityDemo({ view, setView, lang }: { view: DemoView; setView: (view: DemoView) => void; lang: 'es' | 'en' }) {
  const vehicles = [
    { name: 'GT Series', spec: '530 CV · AUTO', state: 'AVAILABLE' },
    { name: 'Grand Tourer', spec: '476 CV · AUTO', state: 'RESERVED' },
    { name: 'Range Performance', spec: '460 CV · AWD', state: 'AVAILABLE' },
  ]
  const [vehicle, setVehicle] = useState(0)
  const [dates, setDates] = useState('14—17 AGO')
  const [created, setCreated] = useState(false)
  const [status, setStatus] = useState(0)
  const statuses = lang === 'es' ? ['NUEVA', 'REVISANDO', 'CONFIRMADA'] : ['NEW', 'REVIEWING', 'CONFIRMED']

  if (view === 'control') {
    return (
      <div className="axp-panel axp-control-panel">
        <div className="axp-panel-head"><span>ARCHIC CONTROL</span><strong>{lang === 'es' ? 'Flota y solicitudes' : 'Fleet & enquiries'}</strong><i>07 VEHICLES</i></div>
        <div className="axp-fleet">
          {vehicles.map((item, index) => <div key={item.name}><span>0{index + 1}</span><strong>{item.name}</strong><small>{item.spec}</small><b data-state={item.state}>{item.state}</b></div>)}
        </div>
        {created ? <div className="axp-request"><span>{lang === 'es' ? 'SOLICITUD NUEVA' : 'NEW ENQUIRY'}</span><strong>{vehicles[vehicle].name}</strong><small>{dates} · MARBELLA</small><button type="button" onClick={() => setStatus((current) => Math.min(current + 1, statuses.length - 1))}>{statuses[status]}</button></div> : <p className="axp-empty-note">{lang === 'es' ? 'Envía una solicitud desde Experiencia para verla entrar en la cola.' : 'Send an enquiry from Experience to see it enter the queue.'}</p>}
      </div>
    )
  }

  if (view === 'business') {
    return (
      <div className="axp-panel axp-business-panel">
        <div className="axp-panel-head"><span>ARCHIC BUSINESS</span><strong>{lang === 'es' ? 'Disponibilidad como lógica' : 'Availability as logic'}</strong><i>{created ? 'MATCHED' : 'READY'}</i></div>
        <div className="axp-logic-grid"><div><span>01</span><strong>{lang === 'es' ? 'Solicitud' : 'Enquiry'}</strong><small>{created ? vehicles[vehicle].name : 'WAITING'}</small></div><div><span>02</span><strong>{lang === 'es' ? 'Cruce de fechas' : 'Date match'}</strong><small>{created ? dates : '—'}</small></div><div><span>03</span><strong>{lang === 'es' ? 'Vehículo' : 'Vehicle'}</strong><small>{created ? 'AVAILABLE' : '—'}</small></div><div><span>04</span><strong>{lang === 'es' ? 'Seguimiento' : 'Follow-up'}</strong><small>{created ? 'QUEUE READY' : '—'}</small></div></div>
        <div className="axp-business-note"><span>INTEGRATION</span><p>{lang === 'es' ? 'La solicitud puede cruzarse con calendario, contratos, pagos, mantenimiento o cualquier fuente operativa existente.' : 'The enquiry can connect to calendars, contracts, payments, maintenance or any existing operational source.'}</p></div>
      </div>
    )
  }

  return (
    <div className="axp-panel axp-experience-panel axp-mobility-demo">
      <div className="axp-panel-head"><span>ARCHIC PRESENCE</span><strong>{lang === 'es' ? 'Elegir vehículo' : 'Choose vehicle'}</strong><i>MARBELLA</i></div>
      <div className="axp-vehicle-selector">{vehicles.map((item, index) => <button key={item.name} type="button" className={vehicle === index ? 'is-selected' : ''} onClick={() => setVehicle(index)}><span>0{index + 1}</span><strong>{item.name}</strong><small>{item.spec}</small></button>)}</div>
      <div className="axp-selected-vehicle"><div><small>{lang === 'es' ? 'SELECCIONADO' : 'SELECTED'}</small><h3>{vehicles[vehicle].name}</h3><p>{vehicles[vehicle].spec}</p></div><div className="axp-speed-lines"><i /><i /><i /></div></div>
      <fieldset className="axp-date-field"><legend>{lang === 'es' ? 'Fechas' : 'Dates'}</legend><div className="axp-choice-row">{['14—17 AGO', '18—21 AGO', '22—25 AGO'].map((value) => <button key={value} type="button" className={dates === value ? 'is-selected' : ''} onClick={() => setDates(value)}>{value}</button>)}</div></fieldset>
      {created ? <div className="axp-confirm"><span>ENQUIRY MOB-0412</span><strong>{lang === 'es' ? 'Solicitud recibida.' : 'Enquiry received.'}</strong><p>{vehicles[vehicle].name} · {dates}</p><button type="button" onClick={() => setView('control')}>{lang === 'es' ? 'Ver en Control' : 'View in Control'}<Arrow /></button></div> : <button className="axp-primary-action" type="button" onClick={() => { setCreated(true); setStatus(0) }}>{lang === 'es' ? 'Solicitar disponibilidad' : 'Request availability'}<Arrow /></button>}
    </div>
  )
}

type Property = { name: string; zone: string; beds: number; price: string; area: string }

function RealEstateDemo({ view, setView, lang }: { view: DemoView; setView: (view: DemoView) => void; lang: 'es' | 'en' }) {
  const properties: Property[] = [
    { name: 'Villa Norte', zone: 'Marbella', beds: 4, price: '€1.4M', area: '320 M²' },
    { name: 'Casa Loma', zone: 'Benahavís', beds: 5, price: '€2.1M', area: '410 M²' },
    { name: 'Ático Marina', zone: 'Puerto Banús', beds: 3, price: '€1.8M', area: '210 M²' },
  ]
  const [zone, setZone] = useState('Todos')
  const [beds, setBeds] = useState(0)
  const [selected, setSelected] = useState(0)
  const [lead, setLead] = useState(false)
  const filtered = useMemo(() => properties.map((property, index) => ({ property, index })).filter(({ property }) => (zone === 'Todos' || property.zone === zone) && (beds === 0 || property.beds >= beds)), [zone, beds])

  if (view === 'control') {
    return (
      <div className="axp-panel axp-control-panel">
        <div className="axp-panel-head"><span>ARCHIC CONTROL</span><strong>{lang === 'es' ? 'Propiedades y leads' : 'Properties & leads'}</strong><i>03 ACTIVE</i></div>
        <div className="axp-property-table">{properties.map((property, index) => <div key={property.name}><span>0{index + 1}</span><strong>{property.name}</strong><small>{property.zone} · {property.beds} {lang === 'es' ? 'hab.' : 'beds'}</small><b>{property.price}</b></div>)}</div>
        {lead ? <div className="axp-request"><span>{lang === 'es' ? 'LEAD NUEVO' : 'NEW LEAD'}</span><strong>{properties[selected].name}</strong><small>{lang === 'es' ? 'Solicitud de visita · alta intención' : 'Viewing request · high intent'}</small><button type="button">{lang === 'es' ? 'CONTACTAR' : 'CONTACT'}</button></div> : <p className="axp-empty-note">{lang === 'es' ? 'Solicita una visita desde Experiencia y el lead aparecerá con el contexto del inmueble.' : 'Request a viewing in Experience and the lead will appear with property context.'}</p>}
      </div>
    )
  }

  if (view === 'business') {
    return (
      <div className="axp-panel axp-business-panel">
        <div className="axp-panel-head"><span>ARCHIC BUSINESS</span><strong>{lang === 'es' ? 'Contexto comercial' : 'Sales context'}</strong><i>{lead ? 'LEAD READY' : 'READY'}</i></div>
        <div className="axp-lead-profile"><span>PROFILE / 01</span><h3>{lead ? (lang === 'es' ? 'Interés en Villa' : 'Villa interest') : (lang === 'es' ? 'Esperando interacción' : 'Waiting for interaction')}</h3><div><small>{lang === 'es' ? 'Propiedad' : 'Property'}</small><strong>{lead ? properties[selected].name : '—'}</strong></div><div><small>{lang === 'es' ? 'Zona' : 'Area'}</small><strong>{lead ? properties[selected].zone : '—'}</strong></div><div><small>{lang === 'es' ? 'Señal' : 'Signal'}</small><strong>{lead ? (lang === 'es' ? 'VISITA SOLICITADA' : 'VIEWING REQUESTED') : '—'}</strong></div></div>
        <div className="axp-business-note"><span>CRM / AUTOMATION</span><p>{lang === 'es' ? 'El equipo no recibe un formulario aislado: recibe quién preguntó, por qué propiedad y qué acción quiere realizar.' : 'The team does not receive an isolated form: it receives who enquired, which property matters and what action they want to take.'}</p></div>
      </div>
    )
  }

  return (
    <div className="axp-panel axp-experience-panel axp-property-demo">
      <div className="axp-panel-head"><span>ARCHIC PRESENCE</span><strong>{lang === 'es' ? 'Encontrar propiedad' : 'Find a property'}</strong><i>COSTA DEL SOL</i></div>
      <div className="axp-filters"><div><span>{lang === 'es' ? 'Zona' : 'Area'}</span>{['Todos', 'Marbella', 'Benahavís', 'Puerto Banús'].map((value) => <button key={value} type="button" className={zone === value ? 'is-selected' : ''} onClick={() => setZone(value)}>{value === 'Todos' && lang === 'en' ? 'All' : value}</button>)}</div><div><span>{lang === 'es' ? 'Dormitorios' : 'Bedrooms'}</span>{[0, 3, 4, 5].map((value) => <button key={value} type="button" className={beds === value ? 'is-selected' : ''} onClick={() => setBeds(value)}>{value === 0 ? (lang === 'es' ? 'Todos' : 'All') : `${value}+`}</button>)}</div></div>
      <div className="axp-property-results">
        {filtered.length ? filtered.map(({ property, index }) => <button key={property.name} type="button" className={selected === index ? 'is-selected' : ''} onClick={() => setSelected(index)}><span>0{index + 1}</span><strong>{property.name}</strong><small>{property.zone}</small><div><b>{property.price}</b><i>{property.beds} {lang === 'es' ? 'HAB' : 'BED'} · {property.area}</i></div></button>) : <p>{lang === 'es' ? 'No hay propiedades con esos filtros.' : 'No properties match those filters.'}</p>}
      </div>
      {lead ? <div className="axp-confirm"><span>LEAD RE-0314</span><strong>{lang === 'es' ? 'Visita solicitada.' : 'Viewing requested.'}</strong><p>{properties[selected].name} · {properties[selected].zone}</p><button type="button" onClick={() => setView('control')}>{lang === 'es' ? 'Ver en Control' : 'View in Control'}<Arrow /></button></div> : <button className="axp-primary-action" type="button" onClick={() => setLead(true)}>{lang === 'es' ? 'Solicitar visita' : 'Request a viewing'}<Arrow /></button>}
    </div>
  )
}

export default function ExplorationPage({ kind }: { kind: ExplorationKind }) {
  const { lang } = useLang()
  const meta = META[kind]
  const c = meta[lang]
  const [view, setView] = useState<DemoView>('experience')

  const title = lang === 'es' ? `${c.title} ${c.accent} — Exploración Archic` : `${c.title} ${c.accent} — Archic exploration`
  const canonicalPath = lang === 'en' ? `/en/explorations/${kind}/` : `/explorations/${kind}/`

  return (
    <div className={`as-site axp-page axp-${kind}`}>
      <Helmet htmlAttributes={{ lang }}>
        <title>{title}</title>
        <meta name="description" content={c.intro} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://archic.es${canonicalPath}`} />
        <link rel="alternate" hrefLang="es" href={`https://archic.es/explorations/${kind}/`} />
        <link rel="alternate" hrefLang="en" href={`https://archic.es/en/explorations/${kind}/`} />
      </Helmet>

      <StudioExperience />
      <StudioHeader />

      <section className="axp-hero">
        <div className="axp-hero-grid" aria-hidden="true" />
        <div className="axp-hero-copy" data-reveal="hero">
          <p className="axp-kicker">ARCHIC / EXPLORATION {meta.no}</p>
          <h1><span>{c.title}</span><em>{c.accent}</em></h1>
          <p>{c.intro}</p>
        </div>
        <div className="axp-hero-proof" data-reveal><span>{c.label}</span><strong>{c.proof}</strong><small>{lang === 'es' ? 'Prototipo interno · datos de demostración' : 'Internal prototype · demonstration data'}</small></div>
      </section>

      <section className="axp-demo-section">
        <div className="axp-demo-intro" data-reveal>
          <p className="axp-kicker axp-kicker-dark">{lang === 'es' ? 'PRUÉBALO' : 'TRY IT'}</p>
          <h2>{lang === 'es' ? 'Una sola acción. Tres capas conectadas.' : 'One action. Three connected layers.'}</h2>
          <p>{lang === 'es' ? 'Interactúa con la cara cliente y después cambia a Control o Business. El estado se conserva para enseñar cómo una experiencia pública puede alimentar la operación.' : 'Interact with the customer-facing experience, then switch to Control or Business. State is preserved to show how the public experience can feed operations.'}</p>
        </div>

        <div className="axp-demo-shell" data-reveal>
          <DemoTabs active={view} onChange={setView} lang={lang} />
          {kind === 'hospitality' && <HospitalityDemo view={view} setView={setView} lang={lang} />}
          {kind === 'mobility' && <MobilityDemo view={view} setView={setView} lang={lang} />}
          {kind === 'real-estate' && <RealEstateDemo view={view} setView={setView} lang={lang} />}
        </div>
      </section>

      <section className="axp-proof-section">
        <div className="axp-proof-head" data-reveal><p className="axp-kicker">ARCHIC SYSTEM</p><h2>{lang === 'es' ? 'Lo que estamos demostrando.' : 'What this demonstrates.'}</h2></div>
        <div className="axp-proof-grid">
          <article data-reveal><span>01 / PRESENCE</span><h3>{lang === 'es' ? 'Lo que vive el cliente.' : 'What the customer experiences.'}</h3><p>{lang === 'es' ? 'Una interfaz hecha para el contexto del sector, no un formulario genérico pegado a una web.' : 'An interface designed for the sector context, not a generic form attached to a website.'}</p></article>
          <article data-reveal><span>02 / CONTROL</span><h3>{lang === 'es' ? 'Lo que necesita el equipo.' : 'What the team needs.'}</h3><p>{lang === 'es' ? 'La misma interacción entra en una capa privada donde se puede gestionar, cambiar de estado y seguir.' : 'The same interaction enters a private layer where it can be managed, progressed and followed up.'}</p></article>
          <article data-reveal><span>03 / BUSINESS</span><h3>{lang === 'es' ? 'Lo que conecta el sistema.' : 'What connects the system.'}</h3><p>{lang === 'es' ? 'Datos, reglas, perfiles, automatización e integraciones trabajando detrás sin cargar la experiencia del cliente.' : 'Data, rules, profiles, automation and integrations working behind the scenes without burdening the customer experience.'}</p></article>
        </div>
      </section>

      <section className="axp-next">
        <div data-reveal><p className="axp-kicker">{lang === 'es' ? 'DEL PROTOTIPO AL NEGOCIO' : 'FROM PROTOTYPE TO BUSINESS'}</p><h2>{lang === 'es' ? 'La demo es genérica. La solución no debería serlo.' : 'The demo is generic. The solution should not be.'}</h2><p>{lang === 'es' ? 'En un proyecto real, flujos, reglas, integraciones, contenido y dirección visual se construyen alrededor de cómo funciona ese negocio concreto.' : 'In a real project, flows, rules, integrations, content and visual direction are built around how that specific business works.'}</p></div>
        <a href={path(lang, 'contact')} data-reveal>{lang === 'es' ? 'Hablar de un proyecto' : 'Talk about a project'}<Arrow /></a>
      </section>

      <StudioFooter />
    </div>
  )
}
