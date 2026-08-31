import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { buildHomeGraph, homeCanonical } from '../seo/homeSchema'
import { HOME_SEO, siteOgImage } from '../seo/siteSeo'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'
import './ArchicHomeAAA.css'

type Lang = 'es' | 'en'

type WorkItem = {
  name: string
  kind: string
  image: string
  href: string
  code: string
  publicLayer: string
  privateLayer: string
}

const COPY = {
  es: {
    hero: {
      overline: 'ARCHIC / PRESENCE · CONTROL · BUSINESS',
      title: ['Diseñamos lo que el cliente ve.', 'Construimos el sistema detrás.'],
      lead: 'Webs, web apps y software web a medida para negocios que necesitan vender mejor, operar con menos fricción y crecer sin encajar a la fuerza en herramientas genéricas.',
      primary: 'Solicitar diagnóstico',
      secondary: 'Ver concept builds',
      note: 'La IA acelera la ejecución. La dirección humana decide qué merece salir.',
    },
    field: {
      title: 'Cada capa, bajo dirección.',
      body: 'Presence atrae y convierte. Control organiza la operación. Business conecta lógica, datos y automatización.',
      labels: ['PRESENCE', 'CONTROL', 'BUSINESS'],
      proof: ['DISEÑO', 'OPERACIÓN', 'SOFTWARE'],
    },
    work: {
      index: '01 / TRABAJO',
      title: 'El trabajo se enseña grande.',
      body: 'Concept builds navegables que muestran cómo una oportunidad se convierte en experiencia pública y sistema operativo privado. Sin logos inventados, sin resultados fabricados.',
      concept: 'CONCEPT BUILD',
      publicLabel: 'PRESENCE',
      privateLabel: 'CONTROL / BUSINESS',
      open: 'Explorar proyecto',
    },
    system: {
      index: '02 / SISTEMA ARCHIC',
      title: 'Tres capas. Un solo negocio.',
      body: 'No tratamos web, operación y software como encargos aislados. Diseñamos la capa que hace falta ahora sin bloquear la siguiente.',
      layers: [
        ['01', 'Presence', 'Percepción + conversión', 'Dirección digital, contenido, catálogo, captación, reservas y experiencia pública.'],
        ['02', 'Control', 'Operación privada', 'Clientes, reservas, recursos, disponibilidad, estados, propietarios y flujos internos.'],
        ['03', 'Business', 'Lógica propia', 'Software web, automatización, integraciones y datos cuando lo estándar deja de encajar.'],
      ],
    },
    responsive: {
      index: '03 / COMPOSICIÓN',
      title: 'Responsive no significa encoger.',
      body: 'La misma intención se recompone para cada ancho. Jerarquía, crop, navegación y densidad cambian; la identidad no desaparece en móvil.',
      views: ['DESKTOP', 'TABLET', 'MOBILE'],
    },
    method: {
      index: '04 / MÉTODO + QUALITY STANDARD',
      title: 'El proyecto avanza por decisiones verificables.',
      body: 'Primero entendemos. Después dirigimos. Construimos sobre producto real y lo forzamos hasta encontrar dónde falla.',
      steps: [
        ['01', 'Diagnóstico', 'Negocio, cliente, operación, competencia, restricciones y señal de valor.'],
        ['02', 'Dirección', 'Arquitectura, recorridos, contenido, datos y mundo visual antes de multiplicar pantallas.'],
        ['03', 'Construcción', 'Diseño y desarrollo avanzan juntos sobre una experiencia real y navegable.'],
        ['04', 'Stress / QA', 'Mobile, recorrido crítico, visual, rendimiento, accesibilidad, búsqueda y estados.'],
        ['05', 'Evolución', 'Lo que ocurra en uso real decide el siguiente movimiento.'],
      ],
      gates: ['Mobile específico', 'Recorrido crítico', 'QA visual', 'Rendimiento', 'Accesibilidad', 'Search + AI', 'Integridad'],
      foot: 'Si no supera el estándar, no cuenta como terminado.',
    },
    investment: {
      index: '05 / INVERSIÓN',
      title: 'Puntos de entrada claros. El alcance viene después.',
      body: 'No convertimos negocios distintos en paquetes idénticos. Estos mínimos indican desde dónde empieza cada tipo de sistema.',
      from: 'desde',
      items: [
        ['Presence', '1.200 €', 'Presencia digital premium'],
        ['Control', '2.500 €', 'Sistema privado de operación'],
        ['Business', '4.000 €', 'Software web a medida'],
        ['Evolution', '150 €/mes', 'Mejora continua'],
      ],
      note: 'Mínimos orientativos · IVA no incluido · presupuesto final tras diagnóstico',
    },
    audit: {
      index: '06 / DIAGNÓSTICO',
      title: ['Antes de diseñar,', 'encontramos qué debe cambiar.'],
      body: 'Revisamos qué ve el cliente, dónde se pierde intención y qué parte de la operación obliga al equipo a trabajar peor. Después decidimos qué merece construirse primero.',
      primary: 'Solicitar diagnóstico',
      phone: 'Llamar',
      note: 'Sin coste para proyectos con encaje. Si no somos la solución correcta, te lo diremos.',
    },
  },
  en: {
    hero: {
      overline: 'ARCHIC / PRESENCE · CONTROL · BUSINESS',
      title: ['We design what customers see.', 'We build the system behind it.'],
      lead: 'Websites, web apps and custom web software for businesses that need to sell better, operate with less friction and grow beyond generic tools that no longer fit.',
      primary: 'Request a diagnosis',
      secondary: 'View concept builds',
      note: 'AI accelerates execution. Human direction decides what deserves to ship.',
    },
    field: {
      title: 'Every layer, under direction.',
      body: 'Presence attracts and converts. Control organizes operations. Business connects logic, data and automation.',
      labels: ['PRESENCE', 'CONTROL', 'BUSINESS'],
      proof: ['DESIGN', 'OPERATIONS', 'SOFTWARE'],
    },
    work: {
      index: '01 / WORK',
      title: 'Show the work at full scale.',
      body: 'Navigable concept builds showing how an opportunity becomes a public experience and a private operating system. No invented logos, no fabricated outcomes.',
      concept: 'CONCEPT BUILD',
      publicLabel: 'PRESENCE',
      privateLabel: 'CONTROL / BUSINESS',
      open: 'Explore project',
    },
    system: {
      index: '02 / ARCHIC SYSTEM',
      title: 'Three layers. One business.',
      body: 'We do not treat website, operations and software as isolated jobs. We design the layer needed now without blocking the next one.',
      layers: [
        ['01', 'Presence', 'Perception + conversion', 'Digital direction, content, catalogue, acquisition, bookings and public experience.'],
        ['02', 'Control', 'Private operations', 'Customers, bookings, resources, availability, states, owners and internal flows.'],
        ['03', 'Business', 'Own logic', 'Web software, automation, integrations and data when standard tools stop fitting.'],
      ],
    },
    responsive: {
      index: '03 / COMPOSITION',
      title: 'Responsive does not mean shrink.',
      body: 'The same intent is recomposed for each width. Hierarchy, crop, navigation and density change; the identity does not disappear on mobile.',
      views: ['DESKTOP', 'TABLET', 'MOBILE'],
    },
    method: {
      index: '04 / METHOD + QUALITY STANDARD',
      title: 'The project advances through verifiable decisions.',
      body: 'First we understand. Then we direct. We build on the real product and stress it until we find where it fails.',
      steps: [
        ['01', 'Diagnosis', 'Business, customer, operation, competition, constraints and a signal of value.'],
        ['02', 'Direction', 'Architecture, journeys, content, data and visual world before multiplying screens.'],
        ['03', 'Build', 'Design and development move together on a real navigable experience.'],
        ['04', 'Stress / QA', 'Mobile, critical journey, visual quality, performance, accessibility, search and states.'],
        ['05', 'Evolution', 'What happens in real use decides the next move.'],
      ],
      gates: ['Mobile-specific', 'Critical journey', 'Visual QA', 'Performance', 'Accessibility', 'Search + AI', 'Integrity'],
      foot: 'If it does not pass the standard, it is not finished.',
    },
    investment: {
      index: '05 / INVESTMENT',
      title: 'Clear entry points. Scope comes after understanding.',
      body: 'We do not force different businesses into identical packages. These minimums show where each system type starts.',
      from: 'from',
      items: [
        ['Presence', '€1,200', 'Premium digital presence'],
        ['Control', '€2,500', 'Private operations system'],
        ['Business', '€4,000', 'Custom web software'],
        ['Evolution', '€150/mo', 'Continuous improvement'],
      ],
      note: 'Indicative minimums · VAT not included · final quote after diagnosis',
    },
    audit: {
      index: '06 / DIAGNOSIS',
      title: ['Before design,', 'we find what must change.'],
      body: 'We review what customers see, where intent is lost and which part of the operation forces the team to work worse. Then we decide what deserves to be built first.',
      primary: 'Request a diagnosis',
      phone: 'Call',
      note: 'No cost for projects with fit. If we are not the right solution, we will say so.',
    },
  },
} as const

const WORK: Record<Lang, WorkItem[]> = {
  es: [
    {
      name: 'Marbella For Sale',
      kind: 'Real estate de alta gama',
      image: '/software/real-estate-preview.svg',
      href: '/explorations/real-estate/',
      code: '01 / REAL ESTATE',
      publicLayer: 'Portfolio editorial, búsqueda, comparación y captación de enquiry.',
      privateLayer: 'Owner Studio, propiedades, leads y seguimiento en un mismo sistema.',
    },
    {
      name: 'La Bocana',
      kind: 'Hospitality / Puerto Banús',
      image: '/software/hospitality-preview.svg',
      href: '/explorations/hospitality/',
      code: '02 / HOSPITALITY',
      publicLayer: 'Presencia, carta, reserva y experiencia de marca conectadas.',
      privateLayer: 'Reservas, sala, clientes, disponibilidad y operación diaria.',
    },
    {
      name: 'Five Star Rentals',
      kind: 'Luxury mobility',
      image: '/software/mobility-preview.svg',
      href: '/explorations/mobility/',
      code: '03 / MOBILITY',
      publicLayer: 'Flota, fichas, galerías y solicitud con lenguaje de producto premium.',
      privateLayer: 'Owner access, disponibilidad, ofertas y gestión de solicitudes.',
    },
  ],
  en: [
    {
      name: 'Marbella For Sale',
      kind: 'High-end real estate',
      image: '/software/real-estate-preview.svg',
      href: '/en/explorations/real-estate/',
      code: '01 / REAL ESTATE',
      publicLayer: 'Editorial portfolio, search, comparison and enquiry capture.',
      privateLayer: 'Owner Studio, properties, leads and follow-up in one system.',
    },
    {
      name: 'La Bocana',
      kind: 'Hospitality / Puerto Banús',
      image: '/software/hospitality-preview.svg',
      href: '/en/explorations/hospitality/',
      code: '02 / HOSPITALITY',
      publicLayer: 'Presence, menu, booking and brand experience connected.',
      privateLayer: 'Bookings, floor, customers, availability and daily operations.',
    },
    {
      name: 'Five Star Rentals',
      kind: 'Luxury mobility',
      image: '/software/mobility-preview.svg',
      href: '/en/explorations/mobility/',
      code: '03 / MOBILITY',
      publicLayer: 'Fleet, detail pages, galleries and enquiries with premium product language.',
      privateLayer: 'Owner access, availability, offers and enquiry management.',
    },
  ],
}

function Arrow() {
  return <i className="as-arrow" aria-hidden="true" />
}

function WorkFeature({ item, lang, index }: { item: WorkItem; lang: Lang; index: number }) {
  const c = COPY[lang].work
  return (
    <article className="aaa-work-item" data-side={index % 2 === 0 ? 'left' : 'right'}>
      <a className="aaa-work-media" href={item.href} data-archic-intent={`work:${item.name}`}>
        <img src={item.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
        <span>{item.code}</span>
      </a>
      <div className="aaa-work-copy">
        <div className="aaa-work-meta"><span>{item.kind}</span><span>{c.concept}</span></div>
        <h3>{item.name}</h3>
        <dl>
          <div><dt>{c.publicLabel}</dt><dd>{item.publicLayer}</dd></div>
          <div><dt>{c.privateLabel}</dt><dd>{item.privateLayer}</dd></div>
        </dl>
        <a className="aaa-inline-link" href={item.href} data-archic-intent={`work-open:${item.name}`}>{c.open}<Arrow /></a>
      </div>
    </article>
  )
}

function SupervisedSystemField({ lang }: { lang: Lang }) {
  const c = COPY[lang].field
  return (
    <div className="aaa-system-field" aria-hidden="true">
      <div className="aaa-field-grid" />
      <div className="aaa-field-measure aaa-field-measure-a"><span>1440</span></div>
      <div className="aaa-field-measure aaa-field-measure-b"><span>390</span></div>

      <figure className="aaa-field-plane aaa-field-plane-presence">
        <img src="/software/real-estate-preview.svg" alt="" />
        <figcaption><b>01</b><span>{c.labels[0]}</span><small>{c.proof[0]}</small></figcaption>
      </figure>

      <figure className="aaa-field-plane aaa-field-plane-control">
        <img src="/software/hospitality-preview.svg" alt="" />
        <figcaption><b>02</b><span>{c.labels[1]}</span><small>{c.proof[1]}</small></figcaption>
      </figure>

      <figure className="aaa-field-plane aaa-field-plane-business">
        <img src="/software/mobility-preview.svg" alt="" />
        <figcaption><b>03</b><span>{c.labels[2]}</span><small>{c.proof[2]}</small></figcaption>
      </figure>

      <svg className="aaa-field-trace" viewBox="0 0 760 560" fill="none">
        <path d="M70 438 L178 438 L226 382 L348 382 L414 302 L534 302 L596 224 L694 224" />
        <circle cx="178" cy="438" r="5" />
        <circle cx="348" cy="382" r="5" />
        <circle cx="534" cy="302" r="5" />
        <circle cx="694" cy="224" r="6" className="is-gold" />
      </svg>

      <div className="aaa-field-caption"><strong>{c.title}</strong><p>{c.body}</p></div>
      <div className="aaa-field-stamp"><span>ARCHIC</span><b>QUALITY / DIRECTED</b></div>
    </div>
  )
}

function SystemDiagram({ lang }: { lang: Lang }) {
  const c = COPY[lang].system
  return (
    <div className="aaa-system-diagram">
      <div className="aaa-system-core">
        <span>ARCHIC</span>
        <strong>{lang === 'es' ? 'Un negocio / varias capas' : 'One business / multiple layers'}</strong>
      </div>
      {c.layers.map(([no, name, meta, body], index) => (
        <a className="aaa-system-layer" href={lang === 'en' ? `/en/${name.toLowerCase()}/` : `/${name.toLowerCase()}/`} key={name} data-layer={index + 1}>
          <span>{no}</span>
          <div><small>{meta}</small><h3>{name}</h3><p>{body}</p></div>
          <Arrow />
        </a>
      ))}
    </div>
  )
}

function ResponsiveProof({ lang }: { lang: Lang }) {
  const c = COPY[lang].responsive
  const assets = ['/software/real-estate-preview.svg', '/software/hospitality-preview.svg', '/software/mobility-preview.svg']
  return (
    <div className="aaa-responsive-proof" aria-hidden="true">
      {c.views.map((label, index) => (
        <figure key={label} data-view={index}>
          <div><img src={assets[index]} alt="" loading="lazy" /></div>
          <figcaption><span>0{index + 1}</span><b>{label}</b></figcaption>
        </figure>
      ))}
      <svg viewBox="0 0 1100 250" fill="none">
        <path d="M44 190 H290 C340 190 354 94 426 94 H642 C716 94 714 166 790 166 H1042" />
      </svg>
    </div>
  )
}

function BuildTrace({ lang }: { lang: Lang }) {
  const c = COPY[lang].method
  return (
    <div className="aaa-build-trace">
      <div className="aaa-build-path" aria-hidden="true">
        <svg viewBox="0 0 1200 430" fill="none">
          <path className="trace-base" d="M64 332 H208 L274 246 H452 L516 160 H704 L770 244 H952 L1018 160 H1144" />
          <path className="trace-active" d="M64 332 H208 L274 246 H452 L516 160 H704" />
          {[['64','332'],['274','246'],['516','160'],['770','244'],['1018','160']].map(([x,y], index) => <circle key={x} cx={x} cy={y} r={index === 3 ? 8 : 6} />)}
        </svg>
        <div className="aaa-trace-gates">
          {c.gates.map((gate, index) => <span key={gate} style={{ '--i': index } as React.CSSProperties}><b>✓</b>{gate}</span>)}
        </div>
      </div>
      <div className="aaa-method-steps">
        {c.steps.map(([no, phase, body]) => (
          <article key={no}><span>{no}</span><div><h3>{phase}</h3><p>{body}</p></div></article>
        ))}
      </div>
      <p className="aaa-method-foot">{c.foot}</p>
    </div>
  )
}

function SectionHead({ index, title, body, dark = false }: { index: string; title: string; body: string; dark?: boolean }) {
  return (
    <header className={`aaa-section-head${dark ? ' is-dark' : ''}`}>
      <p>{index}</p>
      <div><h2>{title}</h2><p>{body}</p></div>
    </header>
  )
}

export default function ArchicHomeAAA() {
  const { lang } = useLang()
  const currentLang = lang as Lang
  const c = COPY[currentLang]
  const seo = HOME_SEO[currentLang]
  const canonicalUrl = homeCanonical(currentLang)
  const structuredData = buildHomeGraph(currentLang)
  const ogImage = siteOgImage(currentLang)
  const auditHref = currentLang === 'en' ? '/en/contact/?intent=audit' : '/contact/?intent=audit'

  return (
    <div className="as-site aaa-site" data-quality-standard="aaa-design-world-class-art-direction">
      <Helmet htmlAttributes={{ lang: currentLang }}>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={seo.ogAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={seo.ogAlt} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <StudioExperience />
      <StudioHeader />

      <main id="main-content" className="aaa-main" tabIndex={-1}>
        <section className="aaa-hero" id="home" data-archic-view="hero">
          <div className="aaa-shell aaa-hero-shell">
            <div className="aaa-hero-copy">
              <p className="aaa-overline">{c.hero.overline}</p>
              <h1><span>{c.hero.title[0]}</span><span>{c.hero.title[1]}</span></h1>
              <p className="aaa-hero-lead">{c.hero.lead}</p>
              <div className="aaa-hero-actions">
                <a className="aaa-button aaa-button-gold" href={auditHref} data-archic-intent="hero:audit">{c.hero.primary}</a>
                <a className="aaa-inline-link is-light" href="#selected-work" data-archic-intent="hero:work">{c.hero.secondary}<Arrow /></a>
              </div>
              <small>{c.hero.note}</small>
            </div>
            <SupervisedSystemField lang={currentLang} />
          </div>
        </section>

        <section className="aaa-work aaa-section" id="selected-work" data-archic-view="selected-work">
          <div className="aaa-shell">
            <SectionHead index={c.work.index} title={c.work.title} body={c.work.body} />
            <div className="aaa-work-list">
              {WORK[currentLang].map((item, index) => <WorkFeature key={item.name} item={item} lang={currentLang} index={index} />)}
            </div>
          </div>
        </section>

        <section className="aaa-system aaa-section" id="system" data-archic-view="system">
          <div className="aaa-shell">
            <SectionHead index={c.system.index} title={c.system.title} body={c.system.body} dark />
            <SystemDiagram lang={currentLang} />
          </div>
        </section>

        <section className="aaa-responsive aaa-section" data-archic-view="responsive-proof">
          <div className="aaa-shell">
            <SectionHead index={c.responsive.index} title={c.responsive.title} body={c.responsive.body} />
            <ResponsiveProof lang={currentLang} />
          </div>
        </section>

        <section className="aaa-method aaa-section" id="method" data-archic-view="method-quality">
          <div className="aaa-shell">
            <SectionHead index={c.method.index} title={c.method.title} body={c.method.body} dark />
            <BuildTrace lang={currentLang} />
          </div>
        </section>

        <section className="aaa-investment aaa-section" id="investment" data-archic-view="investment">
          <div className="aaa-shell">
            <SectionHead index={c.investment.index} title={c.investment.title} body={c.investment.body} />
            <div className="aaa-price-table">
              {c.investment.items.map(([name, price, subtitle], index) => (
                <a href={auditHref} key={name} data-archic-intent={`investment:${name}`}>
                  <span>0{index + 1}</span>
                  <div><h3>{name}</h3><p>{subtitle}</p></div>
                  <small>{c.investment.from}</small>
                  <strong>{price}</strong>
                  <Arrow />
                </a>
              ))}
            </div>
            <p className="aaa-price-note">{c.investment.note}</p>
          </div>
        </section>

        <section className="aaa-audit" id="audit" data-archic-view="audit">
          <div className="aaa-shell aaa-audit-grid">
            <p className="aaa-audit-index">{c.audit.index}</p>
            <div className="aaa-audit-title"><h2>{c.audit.title[0]}<span>{c.audit.title[1]}</span></h2></div>
            <div className="aaa-audit-copy">
              <p>{c.audit.body}</p>
              <div>
                <a className="aaa-button aaa-button-ink" href={auditHref} data-archic-intent="audit:request">{c.audit.primary}</a>
                <a className="aaa-inline-link" href={`tel:${CONTACT_PHONE}`} data-archic-intent="audit:call">{c.audit.phone} · {CONTACT_PHONE_DISPLAY}<Arrow /></a>
              </div>
              <small>{c.audit.note}</small>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  )
}
