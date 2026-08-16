import { FormEvent, ReactNode, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'

export type ExplorationKind = 'hospitality' | 'mobility' | 'real-estate'
type DemoView = 'experience' | 'control' | 'business'
type Lang = 'es' | 'en'

const META: Record<ExplorationKind, {
  no: string
  es: { label: string; title: string; accent: string; intro: string; proof: string }
  en: { label: string; title: string; accent: string; intro: string; proof: string }
}> = {
  hospitality: {
    no: '01',
    es: { label: 'HOSTELERÍA / SISTEMA WHITE-LABEL', title: 'Control de sala', accent: 'basado en software que ya hemos construido.', intro: 'Una versión de demostración, sin identidad ni datos de ningún cliente, construida a partir de los flujos reales que Archic ha desarrollado para reservas, sala, clientes, carta y operación.', proof: 'Reservas → sala → clientes → carta → analítica' },
    en: { label: 'HOSPITALITY / WHITE-LABEL SYSTEM', title: 'Service control', accent: 'based on software we have already built.', intro: 'A demonstration version with no client identity or client data, built from real workflows Archic has developed for bookings, floor operations, customers, menus and service.', proof: 'Bookings → floor → customers → menu → analytics' },
  },
  mobility: {
    no: '02',
    es: { label: 'MOVILIDAD PREMIUM / SISTEMA WHITE-LABEL', title: 'Gestión de flota', accent: 'a partir de un panel real de operaciones.', intro: 'Flota, disponibilidad, precios, solicitudes, calendario y clientes reunidos en un entorno neutral que conserva la arquitectura del sistema desarrollado por Archic.', proof: 'Flota → disponibilidad → solicitudes → calendario → clientes' },
    en: { label: 'PREMIUM MOBILITY / WHITE-LABEL SYSTEM', title: 'Fleet management', accent: 'derived from a real operations dashboard.', intro: 'Fleet, availability, pricing, enquiries, calendar and clients brought together in a neutral environment that preserves the architecture of a system built by Archic.', proof: 'Fleet → availability → enquiries → calendar → clients' },
  },
  'real-estate': {
    no: '03',
    es: { label: 'INMOBILIARIO / SISTEMA WHITE-LABEL', title: 'Portfolio y CRM', accent: 'con la lógica de un sistema inmobiliario completo.', intro: 'Propiedades, enquiries, visitas, prioridades, próximos pasos y calidad de contenido en una versión anonimizada del tipo de plataforma que Archic ya ha desarrollado.', proof: 'Propiedades → enquiries → visitas → seguimiento → contenido' },
    en: { label: 'REAL ESTATE / WHITE-LABEL SYSTEM', title: 'Portfolio and CRM', accent: 'with the logic of a complete property system.', intro: 'Properties, enquiries, viewings, priorities, next actions and content quality in an anonymised version of the kind of platform Archic has already built.', proof: 'Properties → enquiries → viewings → follow-up → content' },
  },
}

const NAV: Record<ExplorationKind, { es: string[]; en: string[] }> = {
  hospitality: { es: ['Resumen', 'Reservas', 'Sala', 'Clientes', 'Carta', 'Analítica'], en: ['Overview', 'Bookings', 'Floor', 'Customers', 'Menu', 'Analytics'] },
  mobility: { es: ['Resumen', 'Flota', 'Solicitudes', 'Calendario', 'Clientes', 'Ajustes'], en: ['Overview', 'Fleet', 'Enquiries', 'Calendar', 'Clients', 'Settings'] },
  'real-estate': { es: ['Resumen', 'Enquiries', 'Visitas', 'Propiedades', 'Insights', 'Contenido'], en: ['Overview', 'Enquiries', 'Viewings', 'Properties', 'Insights', 'Content'] },
}

const SECTOR: Record<ExplorationKind, { es: string; en: string }> = {
  hospitality: { es: 'HOSTELERÍA', en: 'HOSPITALITY' },
  mobility: { es: 'MOVILIDAD', en: 'MOBILITY' },
  'real-estate': { es: 'INMOBILIARIO', en: 'REAL ESTATE' },
}

function t(lang: Lang, es: string, en: string) { return lang === 'es' ? es : en }
function path(lang: Lang, slug: string) { return lang === 'en' ? `/en/${slug}/` : `/${slug}/` }
function Arrow() { return <i className="as-arrow" aria-hidden="true" /> }

function LayerSwitch({ active, onChange, lang }: { active: DemoView; onChange: (v: DemoView) => void; lang: Lang }) {
  const items: [DemoView, string][] = [['experience', 'Presence'], ['control', 'Control'], ['business', 'Business']]
  return <div className="axv-layer-switch" role="tablist" aria-label={t(lang, 'Capas del sistema', 'System layers')}>
    {items.map(([value, label]) => <button key={value} type="button" role="tab" aria-selected={active === value} className={active === value ? 'is-active' : ''} onClick={() => onChange(value)}><span>{label}</span><small>{value === 'experience' ? t(lang, 'Cliente', 'Customer') : value === 'control' ? t(lang, 'Operación', 'Operations') : t(lang, 'Lógica', 'Logic')}</small></button>)}
  </div>
}

function ProductShell({ kind, view, setView, lang, children }: { kind: ExplorationKind; view: DemoView; setView: (v: DemoView) => void; lang: Lang; children: ReactNode }) {
  const nav = NAV[kind][lang]
  const layer = view === 'experience' ? 'PRESENCE' : view === 'control' ? 'CONTROL' : 'BUSINESS'
  return <div className={`axv-product axv-product-${kind}`}>
    <div className="axv-product-topbar">
      <div className="axv-product-brand"><i><img src="/brand/archic-symbol-2026.svg" alt="" style={{ width: 20, height: 20, display: 'block' }} /></i><strong>ARCHIC</strong></div>
      <div className="axv-product-context"><span>{layer}</span><i /> <b>{SECTOR[kind][lang]}</b></div>
      <div className="axv-product-live"><i /> {t(lang, 'DEMO · DATOS FICTICIOS', 'DEMO · FICTIONAL DATA')}</div>
    </div>
    <div className="axv-product-body">
      <aside className="axv-product-sidebar">
        <div className="axv-side-mark"><img src="/brand/archic-symbol-2026.svg" alt="" style={{ width: 26, height: 26, display: 'block' }} /></div>
        <nav>{nav.map((item, index) => <span className={index === 0 ? 'is-active' : ''} key={item}><i>{String(index + 1).padStart(2, '0')}</i><b>{item}</b></span>)}</nav>
        <div className="axv-side-user"><i>WL</i><span><b>{t(lang, 'Entorno white-label', 'White-label environment')}</b><small>{t(lang, 'Sin datos de clientes', 'No client data')}</small></span></div>
      </aside>
      <main className="axv-product-main">
        <LayerSwitch active={view} onChange={setView} lang={lang} />
        <div className="axv-product-view">{children}</div>
      </main>
    </div>
  </div>
}

function PanelTitle({ eyebrow, title, metric }: { eyebrow: string; title: string; metric?: string }) {
  return <div className="axv-panel-title"><div><small>{eyebrow}</small><strong>{title}</strong></div>{metric && <b>{metric}</b>}</div>
}

function HospitalityDemo({ view, setView, lang }: { view: DemoView; setView: (v: DemoView) => void; lang: Lang }) {
  const [guests, setGuests] = useState(2)
  const [date, setDate] = useState('18 AGO')
  const [time, setTime] = useState('20:30')
  const [created, setCreated] = useState(false)
  const [status, setStatus] = useState(0)
  const statuses = lang === 'es' ? ['CONFIRMADA', 'SENTADOS', 'COMPLETADA'] : ['CONFIRMED', 'SEATED', 'COMPLETED']
  const submit = (event: FormEvent) => { event.preventDefault(); setCreated(true); setStatus(0) }

  if (view === 'control') {
    const rows = [
      ['19:30', t(lang, 'Reserva 014', 'Booking 014'), '4 pax · T12', 'ok'],
      ['20:00', t(lang, 'Reserva 021', 'Booking 021'), '2 pax · I04', 'live'],
      ...(created ? [[time, t(lang, 'Reserva demo', 'Demo booking'), `${guests} pax · ${date}`, 'new']] : []),
      ['20:30', t(lang, 'Reserva 026', 'Booking 026'), '2 pax · T07', 'ok'],
      ['21:15', t(lang, 'Grupo privado', 'Private group'), '8 pax · S02', 'ready'],
    ]
    return <div className="axv-control-canvas">
      <div className="axv-canvas-head"><div><small>ARCHIC CONTROL / {t(lang, 'OPERACIÓN', 'OPERATIONS')}</small><h3>{t(lang, 'Servicio de hoy', 'Today’s service')}</h3></div><div><button>{t(lang, 'Lista de espera', 'Waitlist')}</button><button className="is-primary" onClick={() => setView('experience')}>+ {t(lang, 'Nueva reserva', 'New booking')}</button></div></div>
      <div className="axv-hospitality-grid">
        <section className="axv-ui-panel"><PanelTitle eyebrow={t(lang, 'RESERVAS', 'BOOKINGS')} title={t(lang, 'Próximas mesas', 'Upcoming tables')} metric={created ? '09' : '08'} /><div className="axv-mini-tabs"><b>{t(lang, 'Todas', 'All')}</b><span>{t(lang, 'Confirmadas', 'Confirmed')}</span><span>{t(lang, 'En sala', 'Seated')}</span></div><div className="axv-reservation-list">{rows.map(([slot, name, detail, state]) => <div key={`${slot}-${name}`} className={state === 'new' ? 'is-new' : ''}><time>{slot}</time><span><strong>{name}</strong><small>{detail}</small></span><i data-state={state} />{state === 'new' && <button type="button" onClick={() => setStatus((s) => Math.min(s + 1, statuses.length - 1))}>{statuses[status]}</button>}</div>)}</div></section>
        <section className="axv-ui-panel"><PanelTitle eyebrow={t(lang, 'SALA EN TIEMPO REAL', 'LIVE FLOOR')} title={t(lang, 'Ocupación y mesas', 'Occupancy and tables')} metric={created ? '86%' : '82%'} /><div className="axv-mini-tabs"><b>{t(lang, 'Interior', 'Inside')}</b><span>{t(lang, 'Terraza', 'Terrace')}</span><span>VIP</span></div><div className="axv-floor-map"><i className="bar">BAR</i><span className="t1">01</span><span className="t2 reserved">02</span><span className="t3 live">03</span><span className="t4">04</span><span className="t5 reserved">05</span><span className="t6">06</span></div><div className="axv-legend"><span><i />{t(lang, 'Libre', 'Free')}</span><span><i className="reserved" />{t(lang, 'Reservada', 'Reserved')}</span><span><i className="live" />{t(lang, 'En sala', 'Seated')}</span></div></section>
      </div>
      <div className="axv-automation"><span>{t(lang, 'MÓDULOS DEL SISTEMA', 'SYSTEM MODULES')}</span><p>{t(lang, 'Reservas · lista de espera · plano de sala · clientes · carta · calendario · analítica · configuración.', 'Bookings · waitlist · floor plan · customers · menu · calendar · analytics · settings.')}</p></div>
    </div>
  }

  if (view === 'business') return <div className="axv-business-canvas"><div className="axv-canvas-head"><div><small>ARCHIC BUSINESS</small><h3>{t(lang, 'Una reserva, una sola fuente de verdad', 'One booking, one source of truth')}</h3></div><b>{created ? 'LIVE' : 'READY'}</b></div><div className="axv-flow">{[[t(lang, 'Reserva', 'Booking'), created ? `${guests} · ${date} · ${time}` : 'WAITING'], [t(lang, 'Cliente', 'Customer'), created ? t(lang, 'Perfil actualizado', 'Profile updated') : '—'], [t(lang, 'Sala', 'Floor'), created ? t(lang, 'Pendiente de mesa', 'Awaiting table') : '—'], [t(lang, 'Seguimiento', 'Follow-up'), created ? t(lang, 'Contexto guardado', 'Context saved') : '—']].map(([title, value], i) => <div key={title}><span>0{i + 1}</span><strong>{title}</strong><small>{value}</small></div>)}</div><div className="axv-automation"><span>AUTOMATION</span><p>{t(lang, 'El flujo refleja la arquitectura de un sistema desarrollado por Archic: reserva, ficha de cliente, operación de sala y estados conectados sin duplicar datos.', 'The flow reflects the architecture of a system built by Archic: booking, customer record, floor operations and connected statuses without duplicating data.')}</p></div></div>

  return <form className="axv-presence-canvas" onSubmit={submit}><div className="axv-canvas-head"><div><small>ARCHIC PRESENCE</small><h3>{t(lang, 'Reserva de demostración', 'Demonstration booking')}</h3></div><b>WHITE-LABEL</b></div><div className="axv-presence-hero"><small>{t(lang, 'EXPERIENCIA CLIENTE', 'CUSTOMER EXPERIENCE')}</small><h4>{t(lang, 'La reserva alimenta la operación.', 'The booking feeds operations.')}</h4><p>{t(lang, 'Crea una reserva ficticia y vuelve a Control para verla entrar en el flujo operativo.', 'Create a fictional booking and return to Control to see it enter the operational flow.')}</p></div><div className="axv-form-grid"><fieldset><legend>{t(lang, 'Personas', 'Guests')}</legend><div className="axv-stepper"><button type="button" onClick={() => setGuests(v => Math.max(1, v - 1))}>−</button><strong>{guests}</strong><button type="button" onClick={() => setGuests(v => Math.min(12, v + 1))}>+</button></div></fieldset><fieldset><legend>{t(lang, 'Fecha', 'Date')}</legend><div className="axv-choices">{['18 AGO', '19 AGO', '20 AGO'].map(v => <button type="button" className={date === v ? 'is-selected' : ''} onClick={() => setDate(v)} key={v}>{v}</button>)}</div></fieldset><fieldset><legend>{t(lang, 'Hora', 'Time')}</legend><div className="axv-choices">{['19:30', '20:30', '21:15'].map(v => <button type="button" className={time === v ? 'is-selected' : ''} onClick={() => setTime(v)} key={v}>{v}</button>)}</div></fieldset></div>{created ? <div className="axv-confirm"><span>DEMO HSP-0821</span><strong>{t(lang, 'Reserva creada.', 'Booking created.')}</strong><p>{guests} · {date} · {time}</p><button type="button" onClick={() => setView('control')}>{t(lang, 'Ver en Control', 'View in Control')}<Arrow /></button></div> : <button className="axv-primary" type="submit">{t(lang, 'Crear reserva demo', 'Create demo booking')}<Arrow /></button>}</form>
}

type Vehicle = { name: string; spec: string; state: 'AVAILABLE' | 'ON HIRE' | 'RESERVED' | 'SERVICE'; rate: string; utilisation: string }
function MobilityDemo({ view, setView, lang }: { view: DemoView; setView: (v: DemoView) => void; lang: Lang }) {
  const vehicles: Vehicle[] = [
    { name: 'Apex GT', spec: '530 CV · AUTO', state: 'AVAILABLE', rate: '€690', utilisation: '78%' },
    { name: 'Veloce SUV', spec: '650 CV · AWD', state: 'ON HIRE', rate: '€890', utilisation: '91%' },
    { name: 'Grand Touring', spec: '476 CV · AUTO', state: 'RESERVED', rate: '€540', utilisation: '72%' },
    { name: 'Executive Van', spec: '237 CV · AUTO', state: 'SERVICE', rate: '€320', utilisation: '64%' },
  ]
  const [vehicle, setVehicle] = useState(0)
  const [dates, setDates] = useState('18—21 AGO')
  const [created, setCreated] = useState(false)
  const [status, setStatus] = useState(0)
  const statuses = lang === 'es' ? ['NUEVA', 'CONTACTADO', 'CONFIRMADA'] : ['NEW', 'CONTACTED', 'CONFIRMED']

  if (view === 'control') return <div className="axv-control-canvas"><div className="axv-canvas-head"><div><small>ARCHIC CONTROL / {t(lang, 'FLOTA', 'FLEET')}</small><h3>{t(lang, 'Estado operativo', 'Operational status')}</h3></div><div><button>{t(lang, 'Filtros', 'Filters')}</button><button className="is-primary" onClick={() => setView('experience')}>+ {t(lang, 'Nueva solicitud', 'New enquiry')}</button></div></div><div className="axv-mobility-grid"><section className="axv-ui-panel"><div className="axv-search"><span>⌕ {t(lang, 'Buscar vehículo, categoría o estado…', 'Search vehicle, category or status…')}</span><small>16 {t(lang, 'UNIDADES', 'UNITS')}</small></div><div className="axv-fleet-head"><span>{t(lang, 'Vehículo', 'Vehicle')}</span><span>{t(lang, 'Estado', 'Status')}</span><span>{t(lang, 'Tarifa', 'Rate')}</span></div><div className="axv-fleet-list">{vehicles.map((item, i) => <div key={item.name}><i>{String(i + 1).padStart(2, '0')}</i><span><strong>{item.name}</strong><small>{item.spec}</small></span><b data-state={item.state}>{item.state}</b><time>{item.rate}/d · {item.utilisation}</time></div>)}</div>{created && <div className="axv-inline-request"><span>{t(lang, 'SOLICITUD NUEVA', 'NEW ENQUIRY')}</span><strong>{vehicles[vehicle].name}</strong><small>{dates} · DEMO</small><button onClick={() => setStatus(s => Math.min(s + 1, statuses.length - 1))}>{statuses[status]}</button></div>}</section><section className="axv-ui-panel"><PanelTitle eyebrow={t(lang, 'CALENDARIO', 'CALENDAR')} title={t(lang, 'Semana operativa', 'Operating week')} metric="›" /><div className="axv-calendar"><small>L</small><small>M</small><small>X</small><small>J</small><small>V</small><small>S</small><small>D</small>{[17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(d => <i className={d === 18 ? 'is-today' : ''} key={d}>{d}</i>)}</div><div className="axv-booking-detail"><small>{t(lang, 'PRÓXIMO MOVIMIENTO', 'NEXT MOVEMENT')}</small><strong>{vehicles[1].name}</strong><span>18 AGO · 17:30</span><span>{t(lang, 'Devolución · punto de entrega', 'Return · delivery point')}</span><b>ON HIRE</b></div></section></div><div className="axv-automation"><span>{t(lang, 'MÓDULOS DEL SISTEMA', 'SYSTEM MODULES')}</span><p>{t(lang, 'Resumen · flota · solicitudes · calendario · clientes · tarifas · disponibilidad · configuración.', 'Overview · fleet · enquiries · calendar · clients · rates · availability · settings.')}</p></div></div>

  if (view === 'business') return <div className="axv-business-canvas"><div className="axv-canvas-head"><div><small>ARCHIC BUSINESS</small><h3>{t(lang, 'Disponibilidad, precio y seguimiento conectados', 'Availability, pricing and follow-up connected')}</h3></div><b>{created ? 'MATCHED' : 'READY'}</b></div><div className="axv-flow">{[[t(lang, 'Solicitud', 'Enquiry'), created ? vehicles[vehicle].name : 'WAITING'], [t(lang, 'Cruce de fechas', 'Date match'), created ? dates : '—'], [t(lang, 'Disponibilidad', 'Availability'), created ? vehicles[vehicle].state : '—'], [t(lang, 'Pipeline', 'Pipeline'), created ? statuses[status] : '—']].map(([title, value], i) => <div key={title}><span>0{i + 1}</span><strong>{title}</strong><small>{value}</small></div>)}</div><div className="axv-automation"><span>OPERATIONS LOGIC</span><p>{t(lang, 'El patrón viene de un panel desarrollado por Archic para gestionar flota, disponibilidad, tarifas, solicitudes, calendario y relaciones con clientes desde un único entorno.', 'The pattern comes from a dashboard built by Archic to manage fleet, availability, rates, enquiries, calendar and client relationships from one environment.')}</p></div></div>

  return <div className="axv-presence-canvas"><div className="axv-canvas-head"><div><small>ARCHIC PRESENCE</small><h3>{t(lang, 'Solicitud de disponibilidad', 'Availability enquiry')}</h3></div><b>WHITE-LABEL</b></div><div className="axv-vehicle-cards">{vehicles.slice(0,3).map((item, i) => <button type="button" className={vehicle === i ? 'is-selected' : ''} onClick={() => setVehicle(i)} key={item.name}><span>0{i + 1}</span><strong>{item.name}</strong><small>{item.spec}</small><i /></button>)}</div><div className="axv-selected"><small>{t(lang, 'SELECCIONADO', 'SELECTED')}</small><h4>{vehicles[vehicle].name}</h4><p>{vehicles[vehicle].rate}/day · {vehicles[vehicle].spec}</p></div><fieldset className="axv-date-field"><legend>{t(lang, 'Fechas', 'Dates')}</legend><div className="axv-choices">{['18—21 AGO', '22—25 AGO', '26—29 AGO'].map(v => <button type="button" className={dates === v ? 'is-selected' : ''} onClick={() => setDates(v)} key={v}>{v}</button>)}</div></fieldset>{created ? <div className="axv-confirm"><span>DEMO MOB-0412</span><strong>{t(lang, 'Solicitud creada.', 'Enquiry created.')}</strong><p>{vehicles[vehicle].name} · {dates}</p><button type="button" onClick={() => setView('control')}>{t(lang, 'Ver en Control', 'View in Control')}<Arrow /></button></div> : <button className="axv-primary" type="button" onClick={() => { setCreated(true); setStatus(0) }}>{t(lang, 'Crear solicitud demo', 'Create demo enquiry')}<Arrow /></button>}</div>
}

type Property = { name: string; zone: string; beds: number; baths: number; price: string; area: string; score: number }
function RealEstateDemo({ view, setView, lang }: { view: DemoView; setView: (v: DemoView) => void; lang: Lang }) {
  const properties: Property[] = [
    { name: 'Residence 01', zone: 'Marbella', beds: 4, baths: 4, price: '€1.4M', area: '320 M²', score: 96 },
    { name: 'Residence 02', zone: 'Nueva Andalucía', beds: 3, baths: 3, price: '€995K', area: '210 M²', score: 88 },
    { name: 'Residence 03', zone: 'Puerto Banús', beds: 5, baths: 5, price: '€2.85M', area: '450 M²', score: 92 },
  ]
  const [zone, setZone] = useState('Todos')
  const [beds, setBeds] = useState(0)
  const [selected, setSelected] = useState(0)
  const [lead, setLead] = useState(false)
  const [leadStatus, setLeadStatus] = useState(0)
  const leadStatuses = lang === 'es' ? ['NUEVO', 'CONTACTADO', 'CUALIFICADO', 'VISITA'] : ['NEW', 'CONTACTED', 'QUALIFIED', 'VIEWING']
  const filtered = useMemo(() => properties.map((property, index) => ({ property, index })).filter(({ property }) => (zone === 'Todos' || property.zone === zone) && (beds === 0 || property.beds >= beds)), [zone, beds])

  if (view === 'control') return <div className="axv-control-canvas"><div className="axv-canvas-head"><div><small>ARCHIC CONTROL / CRM</small><h3>{t(lang, 'Portfolio y pipeline', 'Portfolio and pipeline')}</h3></div><div><button>{t(lang, 'Insights', 'Insights')}</button><button className="is-primary" onClick={() => setView('experience')}>+ {t(lang, 'Nueva enquiry', 'New enquiry')}</button></div></div><div className="axv-real-grid"><section className="axv-ui-panel"><PanelTitle eyebrow={t(lang, 'PROPIEDADES', 'PROPERTIES')} title={t(lang, 'Portfolio publicado', 'Published portfolio')} metric="12" /><div className="axv-property-admin">{properties.map((property, i) => <div key={property.name}><i data-house={i}><span /></i><span><strong>{property.name}</strong><small>{property.zone} · {property.beds} {t(lang, 'hab', 'bed')}</small></span><b>{property.price}</b><em>{property.score}%</em></div>)}</div></section><section className="axv-ui-panel"><PanelTitle eyebrow={t(lang, 'ENQUIRIES', 'ENQUIRIES')} title={t(lang, 'Prioridad y siguiente acción', 'Priority and next action')} metric={lead ? '07' : '06'} /><div className="axv-leads"><div><span>A</span><strong>{t(lang, 'Lead demo 01', 'Demo lead 01')}</strong><small>Residence 02 · HIGH</small><b>QUALIFIED</b></div><div><span>B</span><strong>{t(lang, 'Lead demo 02', 'Demo lead 02')}</strong><small>{t(lang, 'Búsqueda privada · MED', 'Private search · MED')}</small><b>CONTACTED</b></div>{lead && <div className="is-new"><span>D</span><strong>{t(lang, 'Nueva enquiry demo', 'New demo enquiry')}</strong><small>{properties[selected].name} · HIGH</small><button type="button" onClick={() => setLeadStatus(s => Math.min(s + 1, leadStatuses.length - 1))}>{leadStatuses[leadStatus]}</button></div>}</div></section></div><div className="axv-automation"><span>{t(lang, 'MÓDULOS DEL SISTEMA', 'SYSTEM MODULES')}</span><p>{t(lang, 'Resumen · enquiries · visitas · propiedades · prioridades · próximos pasos · insights · calidad de contenido.', 'Overview · enquiries · viewings · properties · priorities · next actions · insights · content quality.')}</p></div></div>

  if (view === 'business') return <div className="axv-business-canvas"><div className="axv-canvas-head"><div><small>ARCHIC BUSINESS / CRM</small><h3>{t(lang, 'Contexto comercial accionable', 'Actionable sales context')}</h3></div><b>{lead ? 'LEAD READY' : 'READY'}</b></div><div className="axv-profile"><span>PROFILE / 01</span><h4>{lead ? t(lang, 'Interés cualificable', 'Qualifiable interest') : t(lang, 'Esperando interacción', 'Waiting for interaction')}</h4><div><small>{t(lang, 'Propiedad', 'Property')}</small><strong>{lead ? properties[selected].name : '—'}</strong></div><div><small>{t(lang, 'Prioridad', 'Priority')}</small><strong>{lead ? 'HIGH' : '—'}</strong></div><div><small>{t(lang, 'Siguiente acción', 'Next action')}</small><strong>{lead ? t(lang, 'PROGRAMAR VISITA', 'SCHEDULE VIEWING') : '—'}</strong></div></div><div className="axv-automation"><span>CRM / CONTENT</span><p>{t(lang, 'El sistema combina pipeline comercial con gestión de propiedades y una capa de calidad de contenido para que cada activo publicado tenga información completa y accionable.', 'The system combines a sales pipeline with property management and a content-quality layer so each published asset has complete, actionable information.')}</p></div></div>

  return <div className="axv-presence-canvas"><div className="axv-canvas-head"><div><small>ARCHIC PRESENCE</small><h3>{t(lang, 'Encontrar propiedad', 'Find a property')}</h3></div><b>WHITE-LABEL</b></div><div className="axv-property-filters"><div><span>{t(lang, 'Zona', 'Area')}</span>{['Todos', 'Marbella', 'Nueva Andalucía', 'Puerto Banús'].map(v => <button type="button" className={zone === v ? 'is-selected' : ''} onClick={() => setZone(v)} key={v}>{v === 'Todos' && lang === 'en' ? 'All' : v}</button>)}</div><div><span>{t(lang, 'Dormitorios', 'Bedrooms')}</span>{[0,3,4,5].map(v => <button type="button" className={beds === v ? 'is-selected' : ''} onClick={() => setBeds(v)} key={v}>{v === 0 ? t(lang, 'Todos', 'All') : `${v}+`}</button>)}</div></div><div className="axv-property-cards">{filtered.map(({ property, index }) => <button type="button" className={selected === index ? 'is-selected' : ''} onClick={() => setSelected(index)} key={property.name}><i data-house={index}><span /></i><span><small>0{index + 1}</small><strong>{property.name}</strong><em>{property.zone}</em></span><b>{property.price}<small>{property.beds} {t(lang, 'HAB', 'BED')} · {property.area}</small></b></button>)}</div>{lead ? <div className="axv-confirm"><span>DEMO RE-0314</span><strong>{t(lang, 'Visita solicitada.', 'Viewing requested.')}</strong><p>{properties[selected].name} · {properties[selected].zone}</p><button type="button" onClick={() => setView('control')}>{t(lang, 'Ver en Control', 'View in Control')}<Arrow /></button></div> : <button className="axv-primary" type="button" onClick={() => { setLead(true); setLeadStatus(0) }}>{t(lang, 'Crear enquiry demo', 'Create demo enquiry')}<Arrow /></button>}</div>
}

export default function ExplorationPage({ kind }: { kind: ExplorationKind }) {
  const { lang } = useLang()
  const meta = META[kind]
  const c = meta[lang]
  const [view, setView] = useState<DemoView>('control')
  const title = `${c.title} ${c.accent} — Archic Control`
  const canonicalPath = lang === 'en' ? `/en/explorations/${kind}/` : `/explorations/${kind}/`

  return <div className={`as-site axp-page axp-${kind} axv-page`}>
    <Helmet htmlAttributes={{ lang }}><title>{title}</title><meta name="description" content={c.intro} /><meta name="robots" content="index, follow" /><link rel="canonical" href={`https://archic.es${canonicalPath}`} /><link rel="alternate" hrefLang="es" href={`https://archic.es/explorations/${kind}/`} /><link rel="alternate" hrefLang="en" href={`https://archic.es/en/explorations/${kind}/`} /></Helmet>
    <StudioExperience /><StudioHeader />
    <section className="axp-hero"><div className="axp-hero-grid" aria-hidden="true" /><div className="axp-hero-copy" data-reveal="hero"><p className="axp-kicker">ARCHIC CONTROL / WHITE-LABEL {meta.no}</p><h1><span>{c.title}</span><em>{c.accent}</em></h1><p>{c.intro}</p></div><div className="axp-hero-proof" data-reveal><span>{c.label}</span><strong>{c.proof}</strong><small>{t(lang, 'Basado en software desarrollado por Archic · identidad y datos ficticios', 'Based on software built by Archic · fictional identity and data')}</small></div></section>
    <section className="axp-demo-section axv-demo-section"><div className="axp-demo-intro" data-reveal><p className="axp-kicker axp-kicker-dark">{t(lang, 'ENTORNO INTERACTIVO', 'INTERACTIVE ENVIRONMENT')}</p><h2>{t(lang, 'No es un mockup. Es la lógica de un sistema real, anonimizada.', 'Not a mockup. The logic of a real build, anonymised.')}</h2><p>{t(lang, 'Partimos de software que ya hemos desarrollado, eliminamos cualquier identidad o dato del proyecto original y mantenemos los flujos que hacen útil al producto. Empiezas en Control; cambia de capa para probar el recorrido completo.', 'We start from software we have already built, remove any identity or data from the original project and preserve the flows that make the product useful. You start in Control; switch layers to test the complete journey.')}</p></div><ProductShell kind={kind} view={view} setView={setView} lang={lang}>{kind === 'hospitality' && <HospitalityDemo view={view} setView={setView} lang={lang} />}{kind === 'mobility' && <MobilityDemo view={view} setView={setView} lang={lang} />}{kind === 'real-estate' && <RealEstateDemo view={view} setView={setView} lang={lang} />}</ProductShell></section>
    <section className="axp-proof-section"><div className="axp-proof-head" data-reveal><p className="axp-kicker">ARCHIC SYSTEM</p><h2>{t(lang, 'Lo que preservamos al hacer white-label.', 'What we preserve when we white-label.')}</h2></div><div className="axp-proof-grid"><article data-reveal><span>01 / PRESENCE</span><h3>{t(lang, 'La experiencia que inicia el dato.', 'The experience that starts the data.')}</h3><p>{t(lang, 'La interacción pública sigue conectada al sistema, no se convierte en una maqueta aislada.', 'The public interaction remains connected to the system rather than becoming an isolated mockup.')}</p></article><article data-reveal><span>02 / CONTROL</span><h3>{t(lang, 'Los workflows que usa el equipo.', 'The workflows the team uses.')}</h3><p>{t(lang, 'Estados, recursos, prioridades, calendarios y gestión mantienen la arquitectura del producto desarrollado.', 'Statuses, resources, priorities, calendars and management preserve the architecture of the product we built.')}</p></article><article data-reveal><span>03 / PRIVACY</span><h3>{t(lang, 'Nada identificable del proyecto original.', 'Nothing identifiable from the original project.')}</h3><p>{t(lang, 'Marca, clientes, contactos, ubicaciones sensibles y datos operativos se sustituyen por contenido ficticio.', 'Brand, customers, contacts, sensitive locations and operational data are replaced with fictional content.')}</p></article></div></section>
    <section className="axp-next"><div data-reveal><p className="axp-kicker">{t(lang, 'DE DEMO A SISTEMA PROPIO', 'FROM DEMO TO YOUR OWN SYSTEM')}</p><h2>{t(lang, 'La base demuestra capacidad. Tu negocio define la versión final.', 'The base proves capability. Your business defines the final version.')}</h2><p>{t(lang, 'No vendemos este entorno como plantilla. Para cada empresa redefinimos flujos, permisos, integraciones, datos y dirección visual alrededor de su operación real.', 'We do not sell this environment as a template. For each company we redefine flows, permissions, integrations, data and visual direction around its real operation.')}</p></div><a href={path(lang, 'contact')} data-reveal>{t(lang, 'Hablar de un proyecto', 'Talk about a project')}<Arrow /></a></section>
    <StudioFooter />
  </div>
}