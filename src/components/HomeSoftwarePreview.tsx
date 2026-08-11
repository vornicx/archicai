type PreviewProps = { type: number; lang: 'es' | 'en' }

const es = (lang: 'es' | 'en', spanish: string, english: string) => lang === 'es' ? spanish : english

function Shell({ children, section, nav, lang }: { children: React.ReactNode; section: string; nav: string[]; lang: 'es' | 'en' }) {
  return (
    <div className="ah-software-window">
      <div className="ah-software-chrome">
        <div className="ah-software-mark"><i>A</i><span>ARCHIC</span></div>
        <div className="ah-software-context"><span>CONTROL</span><i /> <b>{section}</b></div>
        <span className="ah-software-live">LIVE</span>
      </div>
      <div className="ah-software-body">
        <aside className="ah-software-sidebar">
          <div className="ah-software-side-brand">A</div>
          <nav>
            {nav.map((item, index) => <span className={index === 0 ? 'is-active' : ''} key={item}><i>{String(index + 1).padStart(2, '0')}</i><b>{item}</b></span>)}
          </nav>
          <div className="ah-software-user"><i>AV</i><span><b>{es(lang, 'Equipo Archic', 'Archic team')}</b><small>{es(lang, 'Vista demo', 'Demo view')}</small></span></div>
        </aside>
        <main className="ah-software-main">{children}</main>
      </div>
    </div>
  )
}

function HospitalityPreview({ lang }: { lang: 'es' | 'en' }) {
  const rows = [
    ['19:30', 'Laura Gómez', '4', 'Terraza 12', 'ok'],
    ['20:00', 'Carlos Ruiz', '2', 'Interior 04', 'live'],
    ['20:30', 'Marta López', '2', 'Terraza 07', 'ok'],
    ['21:15', 'Private dining', '8', 'Sala 02', 'ready'],
  ]
  return (
    <div className="ah-study ah-study-software" aria-hidden="true">
      <Shell section={es(lang, 'HOSTELERÍA', 'HOSPITALITY')} nav={[es(lang, 'Reservas', 'Bookings'), es(lang, 'Sala', 'Floor'), es(lang, 'Clientes', 'Customers'), es(lang, 'Informes', 'Reports')]} lang={lang}>
        <div className="ah-app-toolbar">
          <div><small>{es(lang, 'SERVICIO', 'SERVICE')}</small><strong>{es(lang, 'Hoy, 14 agosto', 'Today, 14 August')}</strong></div>
          <div className="ah-toolbar-actions"><button>{es(lang, 'Filtros', 'Filters')}</button><button className="is-primary">+ {es(lang, 'Nueva reserva', 'New booking')}</button></div>
        </div>
        <div className="ah-hospitality-layout">
          <section className="ah-app-panel ah-reservations-panel">
            <div className="ah-panel-title"><div><small>{es(lang, 'RESERVAS', 'BOOKINGS')}</small><strong>{es(lang, 'Próximas mesas', 'Upcoming tables')}</strong></div><span>08</span></div>
            <div className="ah-mini-tabs"><b>{es(lang, 'Todas', 'All')}</b><span>{es(lang, 'Confirmadas', 'Confirmed')}</span><span>{es(lang, 'En sala', 'Seated')}</span></div>
            <div className="ah-booking-list">
              {rows.map(([time, name, guests, table, state]) => <div key={`${time}${name}`}><time>{time}</time><span><strong>{name}</strong><small>{guests} {es(lang, 'pax', 'guests')} · {table}</small></span><i data-state={state} /></div>)}
            </div>
          </section>
          <section className="ah-app-panel ah-floor-panel">
            <div className="ah-panel-title"><div><small>{es(lang, 'SALA', 'FLOOR')}</small><strong>{es(lang, 'Plano en tiempo real', 'Live floor plan')}</strong></div><span>82%</span></div>
            <div className="ah-floor-tabs"><b>{es(lang, 'Interior', 'Inside')}</b><span>{es(lang, 'Terraza', 'Terrace')}</span><span>VIP</span></div>
            <div className="ah-floor-map">
              <span className="table t1">01</span><span className="table t2 reserved">02</span><span className="table t3 live">03</span><span className="table t4">04</span><span className="table t5 reserved">05</span><span className="table t6">06</span><i className="bar">BAR</i>
            </div>
            <div className="ah-floor-legend"><span><i />{es(lang, 'Libre', 'Free')}</span><span><i className="reserved" />{es(lang, 'Reservada', 'Reserved')}</span><span><i className="live" />{es(lang, 'En sala', 'Seated')}</span></div>
          </section>
        </div>
      </Shell>
    </div>
  )
}

function MobilityPreview({ lang }: { lang: 'es' | 'en' }) {
  const vehicles = [
    ['GT Series', '530 CV · AUTO', es(lang, 'Disponible', 'Available'), 'ok'],
    ['Grand Tourer', '476 CV · AUTO', es(lang, 'Reservado', 'Reserved'), 'warn'],
    ['Range Performance', '460 CV · AWD', es(lang, 'Disponible', 'Available'), 'ok'],
    ['Executive Van', '237 CV · AUTO', es(lang, 'Mantenimiento', 'Maintenance'), 'bad'],
  ]
  return (
    <div className="ah-study ah-study-software" aria-hidden="true">
      <Shell section={es(lang, 'MOVILIDAD', 'MOBILITY')} nav={[es(lang, 'Vehículos', 'Vehicles'), es(lang, 'Reservas', 'Bookings'), es(lang, 'Calendario', 'Calendar'), es(lang, 'Clientes', 'Customers')]} lang={lang}>
        <div className="ah-app-toolbar">
          <div><small>{es(lang, 'FLOTA', 'FLEET')}</small><strong>{es(lang, 'Vehículos', 'Vehicles')}</strong></div>
          <div className="ah-toolbar-actions"><button>{es(lang, 'Disponibilidad', 'Availability')}</button><button className="is-primary">+ {es(lang, 'Nueva reserva', 'New booking')}</button></div>
        </div>
        <div className="ah-mobility-layout">
          <section className="ah-app-panel ah-fleet-panel">
            <div className="ah-search-row"><span>⌕ {es(lang, 'Buscar vehículo…', 'Search vehicle…')}</span><small>07 {es(lang, 'UNIDADES', 'UNITS')}</small></div>
            <div className="ah-fleet-head"><span>{es(lang, 'Vehículo', 'Vehicle')}</span><span>{es(lang, 'Estado', 'Status')}</span><span>{es(lang, 'Próxima reserva', 'Next booking')}</span></div>
            <div className="ah-fleet-list">
              {vehicles.map(([name, spec, state, tone], index) => <div key={name}><i className="ah-car-glyph">{index + 1}</i><span><strong>{name}</strong><small>{spec}</small></span><b data-tone={tone}>{state}</b><time>{index === 0 ? es(lang, 'Hoy · 18:00', 'Today · 18:00') : index === 1 ? es(lang, 'Mañana · 10:30', 'Tomorrow · 10:30') : '—'}</time></div>)}
            </div>
          </section>
          <section className="ah-app-panel ah-calendar-panel">
            <div className="ah-panel-title"><div><small>{es(lang, 'CALENDARIO', 'CALENDAR')}</small><strong>{es(lang, 'Agosto 2026', 'August 2026')}</strong></div><span>›</span></div>
            <div className="ah-calendar-grid"><small>L</small><small>M</small><small>X</small><small>J</small><small>V</small><small>S</small><small>D</small>{[10,11,12,13,14,15,16,17,18,19,20,21,22,23].map(day => <i className={day === 14 ? 'is-today' : ''} key={day}>{day}</i>)}</div>
            <div className="ah-booking-detail"><small>{es(lang, 'DETALLE', 'DETAIL')}</small><strong>GT Series</strong><span>14 AGO · 18:00</span><span>Marbella → Málaga</span><b>{es(lang, 'CONFIRMADA', 'CONFIRMED')}</b></div>
          </section>
        </div>
      </Shell>
    </div>
  )
}

function RealEstatePreview({ lang }: { lang: 'es' | 'en' }) {
  const properties = [
    ['Villa Norte', 'Marbella', '4 · 4 · 320 m²', '€1.4M'],
    ['Ático Horizonte', 'Nueva Andalucía', '3 · 3 · 210 m²', '€995K'],
    ['Casa del Mar', 'Puerto Banús', '5 · 5 · 450 m²', '€2.85M'],
  ]
  return (
    <div className="ah-study ah-study-software" aria-hidden="true">
      <Shell section={es(lang, 'INMOBILIARIO', 'REAL ESTATE')} nav={[es(lang, 'Propiedades', 'Properties'), 'Leads', es(lang, 'Visitas', 'Viewings'), es(lang, 'Contactos', 'Contacts')]} lang={lang}>
        <div className="ah-app-toolbar">
          <div><small>{es(lang, 'CATÁLOGO', 'PORTFOLIO')}</small><strong>{es(lang, 'Propiedades', 'Properties')}</strong></div>
          <div className="ah-toolbar-actions"><button>{es(lang, 'Más filtros', 'More filters')}</button><button className="is-primary">+ {es(lang, 'Nueva propiedad', 'New property')}</button></div>
        </div>
        <div className="ah-property-layout">
          <section className="ah-app-panel ah-properties-panel">
            <div className="ah-filter-row"><span>{es(lang, 'Estado', 'Status')}⌄</span><span>{es(lang, 'Tipo', 'Type')}⌄</span><span>{es(lang, 'Zona', 'Area')}⌄</span><b>⌕ {es(lang, 'Buscar…', 'Search…')}</b></div>
            <div className="ah-property-list-real">
              {properties.map(([name, area, spec, price], index) => <div key={name}><i data-house={index}><span /></i><span><strong>{name}</strong><small>{area}</small><em>{spec}</em></span><b>{price}</b></div>)}
            </div>
          </section>
          <section className="ah-app-panel ah-lead-panel">
            <div className="ah-panel-title"><div><small>{es(lang, 'CRM', 'CRM')}</small><strong>{es(lang, 'Nuevo lead', 'New lead')}</strong></div><span>+1</span></div>
            <label><small>{es(lang, 'Nombre', 'Name')}</small><span>Isabella García</span></label>
            <label><small>Email</small><span>isabella@mail.com</span></label>
            <label><small>{es(lang, 'Interés', 'Interest')}</small><span>Villa Norte</span></label>
            <label><small>{es(lang, 'Origen', 'Source')}</small><span>Web</span></label>
            <button>{es(lang, 'Guardar lead', 'Save lead')}</button>
          </section>
        </div>
      </Shell>
    </div>
  )
}

export default function HomeSoftwarePreview({ type, lang }: PreviewProps) {
  if (type === 0) return <HospitalityPreview lang={lang} />
  if (type === 1) return <MobilityPreview lang={lang} />
  return <RealEstatePreview lang={lang} />
}
