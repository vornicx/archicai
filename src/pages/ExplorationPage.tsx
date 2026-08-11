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
    es: { label: 'HOSTELERÍA / PROTOTIPO FUNCIONAL', title: 'De la reserva', accent: 'a la operación de sala.', intro: 'Una experiencia conectada para que reservar sea sencillo para el cliente y útil para el negocio desde el primer dato.', proof: 'Reserva → cliente → servicio → seguimiento' },
    en: { label: 'HOSPITALITY / FUNCTIONAL PROTOTYPE', title: 'From booking', accent: 'to service operations.', intro: 'A connected experience where booking feels simple to the guest and becomes useful operational data from the first interaction.', proof: 'Booking → customer → service → follow-up' },
  },
  mobility: {
    no: '02',
    es: { label: 'MOVILIDAD PREMIUM / PROTOTIPO FUNCIONAL', title: 'Del deseo', accent: 'a una flota bajo control.', intro: 'Descubrimiento, disponibilidad y solicitud dentro de una experiencia premium que continúa en la gestión privada de la flota.', proof: 'Vehículo → fechas → solicitud → disponibilidad' },
    en: { label: 'PREMIUM MOBILITY / FUNCTIONAL PROTOTYPE', title: 'From desire', accent: 'to a controlled fleet.', intro: 'Discovery, availability and enquiry inside a premium experience that continues into private fleet operations.', proof: 'Vehicle → dates → enquiry → availability' },
  },
  'real-estate': {
    no: '03',
    es: { label: 'INMOBILIARIO / PROTOTIPO FUNCIONAL', title: 'Del catálogo', accent: 'a un lead accionable.', intro: 'Búsqueda editorial para el comprador y una capa operativa que convierte cada solicitud en contexto útil para el equipo comercial.', proof: 'Búsqueda → propiedad → visita → lead' },
    en: { label: 'REAL ESTATE / FUNCTIONAL PROTOTYPE', title: 'From catalogue', accent: 'to an actionable lead.', intro: 'Editorial property discovery for the buyer and an operating layer that turns each enquiry into useful sales context.', proof: 'Search → property → viewing → lead' },
  },
}

const NAV: Record<ExplorationKind, { es: string[]; en: string[] }> = {
  hospitality: { es: ['Reservas', 'Plano de sala', 'Clientes', 'Informes', 'Ajustes'], en: ['Bookings', 'Floor plan', 'Customers', 'Reports', 'Settings'] },
  mobility: { es: ['Vehículos', 'Reservas', 'Calendario', 'Clientes', 'Informes'], en: ['Vehicles', 'Bookings', 'Calendar', 'Customers', 'Reports'] },
  'real-estate': { es: ['Propiedades', 'Leads', 'Visitas', 'Contactos', 'Informes'], en: ['Properties', 'Leads', 'Viewings', 'Contacts', 'Reports'] },
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
  return <div className="axv-layer-switch" role="tablist" aria-label={t(lang, 'Capas del prototipo', 'Prototype layers')}>
    {items.map(([value, label]) => <button key={value} type="button" role="tab" aria-selected={active === value} className={active === value ? 'is-active' : ''} onClick={() => onChange(value)}><span>{label}</span><small>{value === 'experience' ? t(lang, 'Cliente', 'Customer') : value === 'control' ? t(lang, 'Operación', 'Operations') : t(lang, 'Lógica', 'Logic')}</small></button>)}
  </div>
}

function ProductShell({ kind, view, setView, lang, children }: { kind: ExplorationKind; view: DemoView; setView: (v: DemoView) => void; lang: Lang; children: ReactNode }) {
  const nav = NAV[kind][lang]
  const layer = view === 'experience' ? 'PRESENCE' : view === 'control' ? 'CONTROL' : 'BUSINESS'
  return <div className={`axv-product axv-product-${kind}`}>
    <div className="axv-product-topbar">
      <div className="axv-product-brand"><i>A</i><strong>ARCHIC</strong></div>
      <div className="axv-product-context"><span>{layer}</span><i /> <b>{SECTOR[kind][lang]}</b></div>
      <div className="axv-product-live"><i /> LIVE</div>
    </div>
    <div className="axv-product-body">
      <aside className="axv-product-sidebar">
        <div className="axv-side-mark">A</div>
        <nav>{nav.map((item, index) => <span className={index === 0 ? 'is-active' : ''} key={item}><i>{String(index + 1).padStart(2, '0')}</i><b>{item}</b></span>)}</nav>
        <div className="axv-side-user"><i>AV</i><span><b>{t(lang, 'Equipo Archic', 'Archic team')}</b><small>{t(lang, 'Vista demo', 'Demo view')}</small></span></div>
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
  const [date, setDate] = useState('14 AGO')
  const [time, setTime] = useState('20:30')
  const [created, setCreated] = useState(false)
  const [status, setStatus] = useState(0)
  const statuses = lang === 'es' ? ['CONFIRMADA', 'SENTADOS', 'COMPLETADA'] : ['CONFIRMED', 'SEATED', 'COMPLETED']
  const submit = (event: FormEvent) => { event.preventDefault(); setCreated(true); setStatus(0) }

  if (view === 'control') {
    const rows = [
      ['19:30', 'Laura Gómez', '4 pax · Terraza 12', 'ok'],
      ['20:00', 'Carlos Ruiz', '2 pax · Interior 04', 'live'],
      ...(created ? [[time, t(lang, 'Nueva reserva', 'New booking'), `${guests} pax · ${date}`, 'new']] : []),
      ['20:30', 'Marta López', '2 pax · Terraza 07', 'ok'],
      ['21:15', 'Private dining', '8 pax · Sala 02', 'ready'],
    ]
    return <div className="axv-control-canvas">
      <div className="axv-canvas-head"><div><small>{t(lang, 'SERVICIO', 'SERVICE')}</small><h3>{t(lang, 'Hoy, 14 agosto', 'Today, 14 August')}</h3></div><div><button>{t(lang, 'Filtros', 'Filters')}</button><button className="is-primary" onClick={() => setView('experience')}>+ {t(lang, 'Nueva reserva', 'New booking')}</button></div></div>
      <div className="axv-hospitality-grid">
        <section className="axv-ui-panel"><PanelTitle eyebrow={t(lang, 'RESERVAS', 'BOOKINGS')} title={t(lang, 'Próximas mesas', 'Upcoming tables')} metric={created ? '09' : '08'} /><div className="axv-mini-tabs"><b>{t(lang, 'Todas', 'All')}</b><span>{t(lang, 'Confirmadas', 'Confirmed')}</span><span>{t(lang, 'En sala', 'Seated')}</span></div><div className="axv-reservation-list">{rows.map(([slot, name, detail, state]) => <div key={`${slot}-${name}`} className={state === 'new' ? 'is-new' : ''}><time>{slot}</time><span><strong>{name}</strong><small>{detail}</small></span><i data-state={state} />{state === 'new' && <button type="button" onClick={() => setStatus((s) => Math.min(s + 1, statuses.length - 1))}>{statuses[status]}</button>}</div>)}</div></section>
        <section className="axv-ui-panel"><PanelTitle eyebrow={t(lang, 'SALA', 'FLOOR')} title={t(lang, 'Plano en tiempo real', 'Live floor plan')} metric={created ? '86%' : '82%'} /><div className="axv-mini-tabs"><b>{t(lang, 'Interior', 'Inside')}</b><span>{t(lang, 'Terraza', 'Terrace')}</span><span>VIP</span></div><div className="axv-floor-map"><i className="bar">BAR</i><span className="t1">01</span><span className="t2 reserved">02</span><span className="t3 live">03</span><span className="t4">04</span><span className="t5 reserved">05</span><span className="t6">06</span></div><div className="axv-legend"><span><i />{t(lang, 'Libre', 'Free')}</span><span><i className="reserved" />{t(lang, 'Reservada', 'Reserved')}</span><span><i className="live" />{t(lang, 'En sala', 'Seated')}</span></div></section>
      </div>
    </div>
  }

  if (view === 'business') return <div className="axv-business-canvas"><div className="axv-canvas-head"><div><small>ARCHIC BUSINESS</small><h3>{t(lang, 'Lógica conectada', 'Connected logic')}</h3></div><b>{created ? 'LIVE' : 'READY'}</b></div><div className="axv-flow">{[[t(lang, 'Reserva', 'Booking'), created ? `${guests} · ${date} · ${time}` : 'WAITING'], [t(lang, 'Cliente', 'Customer'), created ? t(lang, 'Perfil creado', 'Profile created') : '—'], [t(lang, 'Servicio', 'Service'), created ? t(lang, 'Añadido a sala', 'Added to service') : '—'], [t(lang, 'Seguimiento', 'Follow-up'), created ? t(lang, 'Preparado', 'Ready') : '—']].map(([title, value], i) => <div key={title}><span>0{i + 1}</span><strong>{title}</strong><small>{value}</small></div>)}</div><div className="axv-automation"><span>AUTOMATION</span><p>{t(lang, 'Una sola acción del cliente alimenta reservas, perfil de cliente y contexto operativo sin volver a introducir datos.', 'One customer action feeds bookings, customer profile and operational context without re-entering data.')}</p></div></div>

  return <form className="axv-presence-canvas" onSubmit={submit}><div className="axv-canvas-head"><div><small>ARCHIC PRESENCE</small><h3>{t(lang, 'Reservar mesa', 'Book a table')}</h3></div><b>LIVE DEMO</b></div><div className="axv-presence-hero"><small>{t(lang, 'CENA / TERRAZA', 'DINNER / TERRACE')}</small><h4>{t(lang, 'Una reserva sin fricción.', 'A frictionless booking.')}</h4><p>{t(lang, 'La misma reserva que crea el cliente entra después en Control con contexto de servicio.', 'The same booking created by the guest enters Control with service context.')}</p></div><div className="axv-form-grid"><fieldset><legend>{t(lang, 'Personas', 'Guests')}</legend><div className="axv-stepper"><button type="button" onClick={() => setGuests(v => Math.max(1, v - 1))}>−</button><strong>{guests}</strong><button type="button" onClick={() => setGuests(v => Math.min(12, v + 1))}>+</button></div></fieldset><fieldset><legend>{t(lang, 'Fecha', 'Date')}</legend><div className="axv-choices">{['14 AGO', '15 AGO', '16 AGO'].map(v => <button type="button" className={date === v ? 'is-selected' : ''} onClick={() => setDate(v)} key={v}>{v}</button>)}</div></fieldset><fieldset><legend>{t(lang, 'Hora', 'Time')}</legend><div className="axv-choices">{['19:30', '20:30', '21:15'].map(v => <button type="button" className={time === v ? 'is-selected' : ''} onClick={() => setTime(v)} key={v}>{v}</button>)}</div></fieldset></div>{created ? <div className="axv-confirm"><span>RESERVA HSP-0821</span><strong>{t(lang, 'Confirmada.', 'Confirmed.')}</strong><p>{guests} · {date} · {time}</p><button type="button" onClick={() => setView('control')}>{t(lang, 'Ver en Control', 'View in Control')}<Arrow /></button></div> : <button className="axv-primary" type="submit">{t(lang, 'Confirmar reserva', 'Confirm booking')}<Arrow /></button>}</form>
}

function MobilityDemo({ view, setView, lang }: { view: DemoView; setView: (v: DemoView) => void; lang: Lang }) {
  const vehicles = [{ name: 'GT Series', spec: '530 CV · AUTO', state: 'AVAILABLE' }, { name: 'Grand Tourer', spec: '476 CV · AUTO', state: 'RESERVED' }, { name: 'Range Performance', spec: '460 CV · AWD', state: 'AVAILABLE' }, { name: 'Executive Van', spec: '237 CV · AUTO', state: 'MAINTENANCE' }]
  const [vehicle, setVehicle] = useState(0)
  const [dates, setDates] = useState('14—17 AGO')
  const [created, setCreated] = useState(false)
  const [status, setStatus] = useState(0)
  const statuses = lang === 'es' ? ['NUEVA', 'REVISANDO', 'CONFIRMADA'] : ['NEW', 'REVIEWING', 'CONFIRMED']

  if (view === 'control') return <div className="axv-control-canvas"><div className="axv-canvas-head"><div><small>{t(lang, 'FLOTA', 'FLEET')}</small><h3>{t(lang, 'Vehículos', 'Vehicles')}</h3></div><div><button>{t(lang, 'Disponibilidad', 'Availability')}</button><button className="is-primary" onClick={() => setView('experience')}>+ {t(lang, 'Nueva reserva', 'New booking')}</button></div></div><div className="axv-mobility-grid"><section className="axv-ui-panel"><div className="axv-search"><span>⌕ {t(lang, 'Buscar vehículo…', 'Search vehicle…')}</span><small>07 {t(lang, 'UNIDADES', 'UNITS')}</small></div><div className="axv-fleet-head"><span>{t(lang, 'Vehículo', 'Vehicle')}</span><span>{t(lang, 'Estado', 'Status')}</span><span>{t(lang, 'Próxima reserva', 'Next booking')}</span></div><div className="axv-fleet-list">{vehicles.map((item, i) => <div key={item.name}><i>{String(i + 1).padStart(2, '0')}</i><span><strong>{item.name}</strong><small>{item.spec}</small></span><b data-state={item.state}>{item.state}</b><time>{i === 0 ? t(lang, 'Hoy · 18:00', 'Today · 18:00') : i === 1 ? t(lang, 'Mañana · 10:30', 'Tomorrow · 10:30') : '—'}</time></div>)}</div>{created && <div className="axv-inline-request"><span>{t(lang, 'SOLICITUD NUEVA', 'NEW ENQUIRY')}</span><strong>{vehicles[vehicle].name}</strong><small>{dates} · MARBELLA</small><button onClick={() => setStatus(s => Math.min(s + 1, statuses.length - 1))}>{statuses[status]}</button></div>}</section><section className="axv-ui-panel"><PanelTitle eyebrow={t(lang, 'CALENDARIO', 'CALENDAR')} title={t(lang, 'Agosto 2026', 'August 2026')} metric="›" /><div className="axv-calendar"><small>L</small><small>M</small><small>X</small><small>J</small><small>V</small><small>S</small><small>D</small>{[10,11,12,13,14,15,16,17,18,19,20,21,22,23].map(d => <i className={d === 14 ? 'is-today' : ''} key={d}>{d}</i>)}</div><div className="axv-booking-detail"><small>{t(lang, 'DETALLE', 'DETAIL')}</small><strong>{vehicles[vehicle].name}</strong><span>14 AGO · 18:00</span><span>Marbella → Málaga</span><b>{created ? statuses[status] : t(lang, 'CONFIRMADA', 'CONFIRMED')}</b></div></section></div></div>

  if (view === 'business') return <div className="axv-business-canvas"><div className="axv-canvas-head"><div><small>ARCHIC BUSINESS</small><h3>{t(lang, 'Disponibilidad como lógica', 'Availability as logic')}</h3></div><b>{created ? 'MATCHED' : 'READY'}</b></div><div className="axv-flow">{[[t(lang, 'Solicitud', 'Enquiry'), created ? vehicles[vehicle].name : 'WAITING'], [t(lang, 'Cruce de fechas', 'Date match'), created ? dates : '—'], [t(lang, 'Vehículo', 'Vehicle'), created ? 'AVAILABLE' : '—'], [t(lang, 'Seguimiento', 'Follow-up'), created ? 'QUEUE READY' : '—']].map(([title, value], i) => <div key={title}><span>0{i + 1}</span><strong>{title}</strong><small>{value}</small></div>)}</div><div className="axv-automation"><span>INTEGRATION</span><p>{t(lang, 'La solicitud puede cruzarse con calendario, contratos, pagos y mantenimiento.', 'The enquiry can connect to calendars, contracts, payments and maintenance.')}</p></div></div>

  return <div className="axv-presence-canvas"><div className="axv-canvas-head"><div><small>ARCHIC PRESENCE</small><h3>{t(lang, 'Elegir vehículo', 'Choose vehicle')}</h3></div><b>MARBELLA</b></div><div className="axv-vehicle-cards">{vehicles.slice(0,3).map((item, i) => <button type="button" className={vehicle === i ? 'is-selected' : ''} onClick={() => setVehicle(i)} key={item.name}><span>0{i + 1}</span><strong>{item.name}</strong><small>{item.spec}</small><i /></button>)}</div><div className="axv-selected"><small>{t(lang, 'SELECCIONADO', 'SELECTED')}</small><h4>{vehicles[vehicle].name}</h4><p>{vehicles[vehicle].spec}</p></div><fieldset className="axv-date-field"><legend>{t(lang, 'Fechas', 'Dates')}</legend><div className="axv-choices">{['14—17 AGO', '18—21 AGO', '22—25 AGO'].map(v => <button type="button" className={dates === v ? 'is-selected' : ''} onClick={() => setDates(v)} key={v}>{v}</button>)}</div></fieldset>{created ? <div className="axv-confirm"><span>ENQUIRY MOB-0412</span><strong>{t(lang, 'Solicitud recibida.', 'Enquiry received.')}</strong><p>{vehicles[vehicle].name} · {dates}</p><button type="button" onClick={() => setView('control')}>{t(lang, 'Ver en Control', 'View in Control')}<Arrow /></button></div> : <button className="axv-primary" type="button" onClick={() => { setCreated(true); setStatus(0) }}>{t(lang, 'Solicitar disponibilidad', 'Request availability')}<Arrow /></button>}</div>
}

type Property = { name: string; zone: string; beds: number; baths: number; price: string; area: string }
function RealEstateDemo({ view, setView, lang }: { view: DemoView; setView: (v: DemoView) => void; lang: Lang }) {
  const properties: Property[] = [{ name: 'Villa Norte', zone: 'Marbella', beds: 4, baths: 4, price: '€1.4M', area: '320 M²' }, { name: 'Ático Horizonte', zone: 'Nueva Andalucía', beds: 3, baths: 3, price: '€995K', area: '210 M²' }, { name: 'Casa del Mar', zone: 'Puerto Banús', beds: 5, baths: 5, price: '€2.85M', area: '450 M²' }]
  const [zone, setZone] = useState('Todos')
  const [beds, setBeds] = useState(0)
  const [selected, setSelected] = useState(0)
  const [lead, setLead] = useState(false)
  const filtered = useMemo(() => properties.map((property, index) => ({ property, index })).filter(({ property }) => (zone === 'Todos' || property.zone === zone) && (beds === 0 || property.beds >= beds)), [zone, beds])

  if (view === 'control') return <div className="axv-control-canvas"><div className="axv-canvas-head"><div><small>{t(lang, 'CATÁLOGO', 'PORTFOLIO')}</small><h3>{t(lang, 'Propiedades', 'Properties')}</h3></div><div><button>{t(lang, 'Más filtros', 'More filters')}</button><button className="is-primary" onClick={() => setView('experience')}>+ {t(lang, 'Nueva propiedad', 'New property')}</button></div></div><div className="axv-realestate-grid"><section className="axv-ui-panel"><div className="axv-filter-bar"><span>{t(lang, 'Estado', 'Status')}⌄</span><span>{t(lang, 'Tipo', 'Type')}⌄</span><span>{t(lang, 'Zona', 'Area')}⌄</span><b>⌕ {t(lang, 'Buscar…', 'Search…')}</b></div><div className="axv-property-list">{properties.map((p, i) => <button type="button" onClick={() => setSelected(i)} className={selected === i ? 'is-selected' : ''} key={p.name}><i data-house={i}><span /></i><span><strong>{p.name}</strong><small>{p.zone}</small><em>{p.beds} · {p.baths} · {p.area}</em></span><b>{p.price}</b></button>)}</div></section><section className="axv-ui-panel axv-lead-panel"><PanelTitle eyebrow="CRM" title={lead ? t(lang, 'Lead creado', 'Lead created') : t(lang, 'Nuevo lead', 'New lead')} metric={lead ? '+1' : 'READY'} /><label><small>{t(lang, 'Nombre', 'Name')}</small><span>{lead ? 'Isabella García' : '—'}</span></label><label><small>Email</small><span>{lead ? 'isabella@mail.com' : '—'}</span></label><label><small>{t(lang, 'Interés', 'Interest')}</small><span>{lead ? properties[selected].name : '—'}</span></label><label><small>{t(lang, 'Origen', 'Source')}</small><span>{lead ? 'Web' : '—'}</span></label>{!lead && <button type="button" onClick={() => setView('experience')}>{t(lang, 'Crear desde Presence', 'Create from Presence')}</button>}</section></div></div>

  if (view === 'business') return <div className="axv-business-canvas"><div className="axv-canvas-head"><div><small>ARCHIC BUSINESS</small><h3>{t(lang, 'Contexto comercial', 'Sales context')}</h3></div><b>{lead ? 'LEAD READY' : 'READY'}</b></div><div className="axv-profile"><span>PROFILE / 01</span><h4>{lead ? t(lang, 'Interés en propiedad', 'Property interest') : t(lang, 'Esperando interacción', 'Waiting for interaction')}</h4><div><small>{t(lang, 'Propiedad', 'Property')}</small><strong>{lead ? properties[selected].name : '—'}</strong></div><div><small>{t(lang, 'Zona', 'Area')}</small><strong>{lead ? properties[selected].zone : '—'}</strong></div><div><small>{t(lang, 'Señal', 'Signal')}</small><strong>{lead ? t(lang, 'VISITA SOLICITADA', 'VIEWING REQUESTED') : '—'}</strong></div></div><div className="axv-automation"><span>CRM / AUTOMATION</span><p>{t(lang, 'El equipo recibe quién preguntó, por qué propiedad y qué acción quiere realizar.', 'The team receives who enquired, which property matters and what action they want to take.')}</p></div></div>

  return <div className="axv-presence-canvas"><div className="axv-canvas-head"><div><small>ARCHIC PRESENCE</small><h3>{t(lang, 'Encontrar propiedad', 'Find a property')}</h3></div><b>COSTA DEL SOL</b></div><div className="axv-property-filters"><div><span>{t(lang, 'Zona', 'Area')}</span>{['Todos', 'Marbella', 'Nueva Andalucía', 'Puerto Banús'].map(v => <button type="button" className={zone === v ? 'is-selected' : ''} onClick={() => setZone(v)} key={v}>{v === 'Todos' && lang === 'en' ? 'All' : v}</button>)}</div><div><span>{t(lang, 'Dormitorios', 'Bedrooms')}</span>{[0,3,4,5].map(v => <button type="button" className={beds === v ? 'is-selected' : ''} onClick={() => setBeds(v)} key={v}>{v === 0 ? t(lang, 'Todos', 'All') : `${v}+`}</button>)}</div></div><div className="axv-property-cards">{filtered.map(({ property, index }) => <button type="button" className={selected === index ? 'is-selected' : ''} onClick={() => setSelected(index)} key={property.name}><i data-house={index}><span /></i><span><small>0{index + 1}</small><strong>{property.name}</strong><em>{property.zone}</em></span><b>{property.price}<small>{property.beds} {t(lang, 'HAB', 'BED')} · {property.area}</small></b></button>)}</div>{lead ? <div className="axv-confirm"><span>LEAD RE-0314</span><strong>{t(lang, 'Visita solicitada.', 'Viewing requested.')}</strong><p>{properties[selected].name} · {properties[selected].zone}</p><button type="button" onClick={() => setView('control')}>{t(lang, 'Ver en Control', 'View in Control')}<Arrow /></button></div> : <button className="axv-primary" type="button" onClick={() => setLead(true)}>{t(lang, 'Solicitar visita', 'Request a viewing')}<Arrow /></button>}</div>
}

export default function ExplorationPage({ kind }: { kind: ExplorationKind }) {
  const { lang } = useLang()
  const meta = META[kind]
  const c = meta[lang]
  const [view, setView] = useState<DemoView>('control')
  const title = `${c.title} ${c.accent} — ${lang === 'es' ? 'Exploración Archic' : 'Archic exploration'}`
  const canonicalPath = lang === 'en' ? `/en/explorations/${kind}/` : `/explorations/${kind}/`

  return <div className={`as-site axp-page axp-${kind} axv-page`}>
    <Helmet htmlAttributes={{ lang }}><title>{title}</title><meta name="description" content={c.intro} /><meta name="robots" content="index, follow" /><link rel="canonical" href={`https://archic.es${canonicalPath}`} /><link rel="alternate" hrefLang="es" href={`https://archic.es/explorations/${kind}/`} /><link rel="alternate" hrefLang="en" href={`https://archic.es/en/explorations/${kind}/`} /></Helmet>
    <StudioExperience /><StudioHeader />
    <section className="axp-hero"><div className="axp-hero-grid" aria-hidden="true" /><div className="axp-hero-copy" data-reveal="hero"><p className="axp-kicker">ARCHIC / EXPLORATION {meta.no}</p><h1><span>{c.title}</span><em>{c.accent}</em></h1><p>{c.intro}</p></div><div className="axp-hero-proof" data-reveal><span>{c.label}</span><strong>{c.proof}</strong><small>{t(lang, 'Prototipo interno · datos de demostración', 'Internal prototype · demonstration data')}</small></div></section>
    <section className="axp-demo-section axv-demo-section"><div className="axp-demo-intro" data-reveal><p className="axp-kicker axp-kicker-dark">{t(lang, 'PRUÉBALO', 'TRY IT')}</p><h2>{t(lang, 'El software detrás del negocio.', 'The software behind the business.')}</h2><p>{t(lang, 'Empiezas en Control para ver el producto operativo. Cambia a Presence para crear una interacción y vuelve a Control para comprobar cómo entra en el sistema.', 'You start in Control to see the operating product. Switch to Presence to create an interaction, then return to Control to see it enter the system.')}</p></div><ProductShell kind={kind} view={view} setView={setView} lang={lang}>{kind === 'hospitality' && <HospitalityDemo view={view} setView={setView} lang={lang} />}{kind === 'mobility' && <MobilityDemo view={view} setView={setView} lang={lang} />}{kind === 'real-estate' && <RealEstateDemo view={view} setView={setView} lang={lang} />}</ProductShell></section>
    <section className="axp-proof-section"><div className="axp-proof-head" data-reveal><p className="axp-kicker">ARCHIC SYSTEM</p><h2>{t(lang, 'Lo que estamos demostrando.', 'What this demonstrates.')}</h2></div><div className="axp-proof-grid"><article data-reveal><span>01 / PRESENCE</span><h3>{t(lang, 'Lo que vive el cliente.', 'What the customer experiences.')}</h3><p>{t(lang, 'Una interfaz hecha para el contexto del sector, no un formulario genérico pegado a una web.', 'An interface designed for the sector context, not a generic form attached to a website.')}</p></article><article data-reveal><span>02 / CONTROL</span><h3>{t(lang, 'Lo que necesita el equipo.', 'What the team needs.')}</h3><p>{t(lang, 'La misma interacción entra en una capa privada donde se puede gestionar, cambiar de estado y seguir.', 'The same interaction enters a private layer where it can be managed, progressed and followed up.')}</p></article><article data-reveal><span>03 / BUSINESS</span><h3>{t(lang, 'Lo que conecta el sistema.', 'What connects the system.')}</h3><p>{t(lang, 'Datos, reglas, perfiles, automatización e integraciones trabajando detrás.', 'Data, rules, profiles, automation and integrations working behind the scenes.')}</p></article></div></section>
    <section className="axp-next"><div data-reveal><p className="axp-kicker">{t(lang, 'DEL PROTOTIPO AL NEGOCIO', 'FROM PROTOTYPE TO BUSINESS')}</p><h2>{t(lang, 'La demo es genérica. La solución no debería serlo.', 'The demo is generic. The solution should not be.')}</h2><p>{t(lang, 'En un proyecto real, flujos, reglas, integraciones, contenido y dirección visual se construyen alrededor de cómo funciona ese negocio concreto.', 'In a real project, flows, rules, integrations, content and visual direction are built around how that specific business works.')}</p></div><a href={path(lang, 'contact')} data-reveal>{t(lang, 'Hablar de un proyecto', 'Talk about a project')}<Arrow /></a></section>
    <StudioFooter />
  </div>
}
