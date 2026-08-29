import { Helmet } from 'react-helmet-async'
import '@fontsource/instrument-serif/latin-400.css'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'
import { SERVICE_PAGE_BY_PATH, type ServicePage as ServicePageData } from '../seo/servicePages'
import { LOCAL_PAGE_BY_PATH } from '../seo/localPages'
import { INTENT_PAGE_BY_PATH } from '../seo/intentPages'
import { buildLandingGraph, isLocalLanding } from '../seo/landingSchema'

const ORIGIN = 'https://archic.es'

const LANDING_BY_PATH: Record<string, ServicePageData> = {
  ...SERVICE_PAGE_BY_PATH,
  ...LOCAL_PAGE_BY_PATH,
  ...INTENT_PAGE_BY_PATH,
}

type Positioning = {
  layer: 'ARCHIC PRESENCE' | 'ARCHIC CONTROL' | 'ARCHIC BUSINESS'
  title: string
  accent: string
  lead: string
  statement: string
  statementAccent: string
  statementBody: string
}

const POSITIONING: Record<string, Positioning> = {
  '/diseno-web-para-empresas/': {
    layer: 'ARCHIC PRESENCE',
    title: 'Una presencia digital al nivel',
    accent: 'del negocio que ya eres.',
    lead: 'Dirección digital, web, contenido y conversión tratados como una sola experiencia. Para empresas que necesitan transmitir mejor su valor y convertir esa percepción en negocio.',
    statement: 'No hacemos una web para llenar una casilla.',
    statementAccent: 'Construimos la parte del negocio que todo el mundo ve.',
    statementBody: 'La arquitectura, el mensaje, la fotografía, la interacción y el rendimiento tienen que empujar en la misma dirección: que el cliente entienda el nivel de la empresa y tenga claro cuál es el siguiente paso.',
  },
  '/diseno-web-para-autonomos/': {
    layer: 'ARCHIC PRESENCE',
    title: 'Que tu presencia digital',
    accent: 'esté a la altura de tu trabajo.',
    lead: 'Para profesionales independientes cuya reputación, ticket o especialización merecen algo mejor que una plantilla. Menos páginas, más claridad y una dirección visual con criterio.',
    statement: 'Ser pequeño no obliga a parecer pequeño.',
    statementAccent: 'La percepción también es una ventaja competitiva.',
    statementBody: 'Construimos una presencia concentrada: explica qué haces, por qué debería importarle al cliente y cómo empezar una conversación contigo sin ruido innecesario.',
  },
  '/mantenimiento-web/': {
    layer: 'ARCHIC PRESENCE',
    title: 'Mantener el estándar',
    accent: 'también forma parte del producto.',
    lead: 'Rendimiento, contenido, seguridad, calidad visual y evolución continua para que una web no se degrade seis meses después de publicarla.',
    statement: 'Una presencia premium no es un lanzamiento.',
    statementAccent: 'Es un estándar que se conserva.',
    statementBody: 'El mantenimiento útil no consiste solo en actualizar paquetes. Consiste en proteger rendimiento, coherencia, estabilidad y capacidad de evolucionar cuando cambia el negocio.',
  },
  '/desarrollo-web-a-medida/': {
    layer: 'ARCHIC PRESENCE',
    title: 'Cuando la web deja de ser folleto',
    accent: 'y empieza a ser producto.',
    lead: 'Experiencias web a medida para negocios que necesitan lógica propia, integraciones, áreas privadas, catálogos vivos o una interacción que una plantilla no puede resolver bien.',
    statement: 'La tecnología debe desaparecer detrás de la experiencia.',
    statementAccent: 'Lo complejo por dentro puede sentirse simple por fuera.',
    statementBody: 'Diseñamos el sistema y la interfaz juntos. Si el proyecto necesita software detrás, lo conectamos con Control o Business sin romper la experiencia del cliente.',
  },
  '/diseno-web-sevilla/': {
    layer: 'ARCHIC PRESENCE',
    title: 'Diseño web en Sevilla para negocios',
    accent: 'que han superado su web actual.',
    lead: 'Dirección digital y desarrollo a medida desde Écija para empresas de Sevilla que necesitan representar mejor su nivel, captar oportunidades y construir una base preparada para crecer.',
    statement: 'La proximidad solo importa si mejora el trabajo.',
    statementAccent: 'Criterio, velocidad de decisión y una relación directa.',
    statementBody: 'Trabajamos cerca cuando aporta valor y en remoto cuando es más eficiente. Lo importante es entender el negocio y mantener una dirección clara desde la primera conversación hasta producción.',
  },
  '/diseno-web-ecija/': {
    layer: 'ARCHIC PRESENCE',
    title: 'Diseño web en Écija con',
    accent: 'un estándar que no parece local.',
    lead: 'Presencia digital a medida para empresas de Écija que quieren competir por percepción, confianza y calidad, no por tener simplemente una web publicada.',
    statement: 'Estar cerca no significa pensar pequeño.',
    statementAccent: 'El estándar puede ser internacional y la relación, local.',
    statementBody: 'Construimos una experiencia digital que refleje el nivel real del negocio y que después pueda crecer hacia operaciones privadas, automatización o software propio.',
  },
  '/mantenimiento-web-sevilla/': {
    layer: 'ARCHIC PRESENCE',
    title: 'Mantenimiento web en Sevilla',
    accent: 'sin dejar que baje el nivel.',
    lead: 'Soporte técnico y evolución de presencia digital para empresas de Sevilla: rendimiento, seguridad, cambios, coherencia visual y capacidad de respuesta cuando algo importa.',
    statement: 'Mantener no es congelar.',
    statementAccent: 'Es conservar calidad mientras el negocio evoluciona.',
    statementBody: 'La web debe seguir respondiendo a la realidad del negocio, no a la foto del día en que se publicó. Priorizamos estabilidad, velocidad y mejoras con intención.',
  },
  '/desarrollo-web-sevilla/': {
    layer: 'ARCHIC PRESENCE',
    title: 'Desarrollo web en Sevilla',
    accent: 'cuando lo estándar se queda corto.',
    lead: 'Aplicaciones y experiencias web a medida para empresas de Sevilla que necesitan funcionalidades propias, integraciones o una base digital más seria que un CMS genérico.',
    statement: 'No todo problema merece software a medida.',
    statementAccent: 'Pero algunos negocios sí lo necesitan.',
    statementBody: 'Elegimos la solución más simple que resuelva bien el problema. Cuando hace falta construir, diseñamos la arquitectura para que la experiencia y la operación puedan crecer juntas.',
  },
  '/diseno-web-marbella/': {
    layer: 'ARCHIC PRESENCE',
    title: 'En Marbella, la percepción',
    accent: 'forma parte del producto.',
    lead: 'Diseño y desarrollo web para hostelería, automoción, inmobiliario, servicios premium y negocios donde el cliente decide también por cómo se siente la marca antes de llamar.',
    statement: 'El lujo no significa añadir dorado y animaciones.',
    statementAccent: 'Significa control, criterio y detalle.',
    statementBody: 'Jerarquía, fotografía, ritmo, texto, reserva y rendimiento deben sentirse como una sola experiencia. El objetivo es elevar la percepción sin convertir la web en una caricatura del lujo.',
  },
  '/diseno-web-restaurantes/': {
    layer: 'ARCHIC PRESENCE',
    title: 'La experiencia del restaurante',
    accent: 'empieza antes de la mesa.',
    lead: 'Web, carta, reserva y experiencia móvil para restaurantes que necesitan transmitir mejor lo que son y convertir intención en una reserva sin fricción.',
    statement: 'Una web bonita no resuelve una operación rota.',
    statementAccent: 'Presence y Control pueden trabajar como una sola experiencia.',
    statementBody: 'La presencia atrae y convence. Si el negocio lo necesita, Archic Control conecta reservas, clientes, mesas, estados y operación interna sin obligar al cliente a entender la complejidad detrás.',
  },
  '/diseno-web-inmobiliarias/': {
    layer: 'ARCHIC PRESENCE',
    title: 'Una inmobiliaria no necesita',
    accent: 'otro catálogo genérico.',
    lead: 'Marca, catálogo, captación y experiencia de búsqueda para inmobiliarias que quieren que cada propiedad y cada interacción refuercen la percepción del negocio.',
    statement: 'El catálogo es la superficie.',
    statementAccent: 'La ventaja aparece cuando presencia y operación se conectan.',
    statementBody: 'Podemos unir la experiencia pública con Archic Control para gestionar inmuebles, estados, oportunidades y contenido desde una capa privada construida alrededor del equipo.',
  },
  '/diseno-web-alquiler-coches/': {
    layer: 'ARCHIC PRESENCE',
    title: 'Una flota premium necesita',
    accent: 'una experiencia de reserva premium.',
    lead: 'Web, flota, disponibilidad y conversión para empresas de alquiler de coches donde la percepción, la claridad y la velocidad de reserva afectan directamente al valor del servicio.',
    statement: 'El coche crea deseo.',
    statementAccent: 'El sistema tiene que convertirlo en una reserva.',
    statementBody: 'Presence cuida marca, catálogo y experiencia. Control puede gestionar disponibilidad, reservas, clientes y vehículos detrás, con una lógica adaptada a cómo opera realmente la empresa.',
  },
  '/software-reservas-a-medida/': {
    layer: 'ARCHIC CONTROL',
    title: 'Reservas, clientes y recursos',
    accent: 'en un solo sistema privado.',
    lead: 'Software de reservas a medida para negocios donde la disponibilidad depende de mesas, vehículos, personas, salas, propiedades u otros recursos que un calendario genérico no entiende bien.',
    statement: 'Reservar es solo la parte visible.',
    statementAccent: 'La operación real empieza detrás.',
    statementBody: 'Archic Control conecta solicitud, disponibilidad, cliente, recurso, estado y seguimiento. La interfaz se diseña alrededor del flujo real del negocio, no al revés.',
  },
  '/crm-a-medida/': {
    layer: 'ARCHIC CONTROL',
    title: 'Un CRM construido alrededor',
    accent: 'de cómo vendes de verdad.',
    lead: 'Clientes, historial, oportunidades, tareas y contexto en una herramienta privada sin módulos sobrantes ni procesos impuestos por un software genérico.',
    statement: 'El problema no suele ser guardar contactos.',
    statementAccent: 'Es perder contexto entre herramientas.',
    statementBody: 'Archic Control reúne la información que el equipo necesita para continuar una relación, priorizar y actuar. Si hace falta, se conecta con web, reservas, correo u otros sistemas.',
  },
  '/precio-software-a-medida/': {
    layer: 'ARCHIC BUSINESS',
    title: 'El precio del software a medida',
    accent: 'depende del problema que resuelve.',
    lead: 'Una guía comercial para entender qué mueve el coste: alcance, usuarios, permisos, integraciones, datos, automatización, criticidad y cuánto debe evolucionar después.',
    statement: 'El software barato que no cambia nada',
    statementAccent: 'sigue siendo caro.',
    statementBody: 'Archic Business parte del impacto esperado. Diseñamos una primera versión útil, evitamos construir lo que no aporta valor y dejamos una arquitectura preparada para crecer cuando el negocio lo justifique.',
  },
}

const DEFAULT_POSITIONING: Positioning = {
  layer: 'ARCHIC PRESENCE',
  title: 'Una capa digital construida',
  accent: 'alrededor del negocio.',
  lead: 'Diseño, tecnología y criterio trabajando juntos para mejorar percepción, experiencia u operación sin añadir complejidad porque sí.',
  statement: 'La solución no empieza por la herramienta.',
  statementAccent: 'Empieza por lo que necesita cambiar.',
  statementBody: 'Entendemos el negocio, elegimos la capa adecuada y construimos solo lo que aporta valor real.',
}

export default function ServicePage({ page }: { page: ServicePageData }) {
  const canonical = `${ORIGIN}${page.path}`
  const local = isLocalLanding(page) ? page.local : null
  const structuredData = buildLandingGraph(page, 'es')
  const p = POSITIONING[page.path] ?? DEFAULT_POSITIONING

  return (
    <div className="as-site as-seo-page" data-quality-standard="archic-design-system-1.0.0">
      <Helmet htmlAttributes={{ lang: 'es' }}>
        <title>{page.meta.title}</title>
        <meta name="description" content={page.meta.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={page.meta.title} />
        <meta property="og:description" content={page.meta.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Archic" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:image" content={`${ORIGIN}/og-image.png?v=20260812`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.meta.title} />
        <meta name="twitter:description" content={page.meta.description} />
        <meta name="twitter:image" content={`${ORIGIN}/og-image.png?v=20260812`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <StudioExperience />
      <StudioHeader />

      <main id="main-content" tabIndex={-1}>
      <section className="as-seo-hero">
        <div className="as-seo-hero-main" data-reveal="hero">
          <div className="as-seo-breadcrumb"><a href="/">Archic</a><span>/</span><span>{page.breadcrumb}</span></div>
          <div className="as-seo-layer">{p.layer}</div>
          <h1>{p.title}<br /><em>{p.accent}</em></h1>
          <p className="as-seo-hero-lead">{p.lead}</p>
          <div className="as-seo-actions">
            <a className="as-btn as-btn-metal" href="/contact/">Hablar de un proyecto<i className="as-arrow" aria-hidden="true" /></a>
            <a className="as-seo-call" href={`tel:${CONTACT_PHONE}`}><span>Llamar directamente</span><strong>{CONTACT_PHONE_DISPLAY}</strong></a>
          </div>
        </div>
        <aside className="as-seo-hero-side" data-reveal>
          <span>{page.hero.eyebrow}</span>
          <p>{page.hero.note}</p>
        </aside>
      </section>

      <section className="as-seo-section as-seo-light">
        <div className="as-seo-section-head" data-reveal>
          <div className="as-seo-index">01 / DIRECCIÓN</div>
          <div>
            <p className="as-seo-statement">{p.statement}<br /><em>{p.statementAccent}</em></p>
            <div className="as-seo-section-copy"><p>{p.statementBody}</p></div>
          </div>
        </div>
        <div className="as-seo-section-head" data-reveal>
          <div className="as-seo-index">CONTEXTO</div>
          <div>
            <h2>{page.intro.title}</h2>
            <div className="as-seo-section-copy" style={{ marginTop: 30 }}>{page.intro.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
        </div>
        {local && (
          <div className="as-seo-location" data-reveal>
            <p>Base en Écija (Sevilla). Trabajamos con {local.city} y su provincia de forma presencial cuando aporta valor, y con el resto de España en remoto.</p>
            <div className="as-seo-location-chips">{[local.city, ...local.alsoServes].map((place) => <span key={place}>{place}</span>)}</div>
          </div>
        )}
      </section>

      <section className="as-seo-section as-seo-dark">
        <div className="as-seo-section-head" data-reveal>
          <div className="as-seo-index">02 / ALCANCE</div>
          <div><h2>{page.blocks.title}</h2><div className="as-seo-section-copy" style={{ marginTop: 26 }}><p>{page.blocks.lead}</p></div></div>
        </div>
        <div className="as-seo-feature-list">
          {page.blocks.items.map((item, index) => (
            <article className="as-seo-feature" key={item.title} data-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="as-seo-section as-seo-light">
        <div className="as-seo-section-head" data-reveal>
          <div className="as-seo-index">03 / ENCAJE</div>
          <div><h2>{page.includes.title}</h2></div>
        </div>
        <ul className="as-seo-list">{page.includes.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="as-seo-section as-seo-dark">
        <div className="as-seo-section-head" data-reveal>
          <div className="as-seo-index">04 / PROCESO</div>
          <div><h2>{page.process.title}</h2><div className="as-seo-section-copy" style={{ marginTop: 26 }}><p>Entender primero. Reducir opciones pronto. Diseñar y construir con una dirección común. Publicar solo cuando el sistema esté preparado para sostener el estándar.</p></div></div>
        </div>
        <div className="as-seo-steps">{page.process.steps.map((step) => <div className="as-seo-step" key={step}><p>{step}</p></div>)}</div>
      </section>

      <section className="as-seo-section as-seo-light">
        <div className="as-seo-section-head" data-reveal>
          <div className="as-seo-index">05 / PREGUNTAS</div>
          <div><h2>{page.faq.title}</h2></div>
        </div>
        <div className="as-seo-faq">{page.faq.items.map((item) => <details key={item.q}><summary><h3>{item.q}</h3></summary><p>{item.a}</p></details>)}</div>
      </section>

      {page.related.length > 0 && (
        <section className="as-seo-section as-seo-dark">
          <div className="as-seo-index">RELACIONADO / SISTEMA ARCHIC</div>
          <div className="as-seo-related">
            {page.related.map((href) => {
              const related = LANDING_BY_PATH[href]
              return related ? <a className="as-seo-chip" href={href} key={href}>{related.breadcrumb}</a> : null
            })}
            <a className="as-seo-chip" href="/presence/">Archic Presence</a>
            <a className="as-seo-chip" href="/control/">Archic Control</a>
            <a className="as-seo-chip" href="/business/">Archic Business</a>
          </div>
        </section>
      )}

      <section className="as-seo-close">
        <div data-reveal>
          <div className="as-seo-layer">EMPEZAR UN PROYECTO</div>
          <h2>{page.cta.title}<br /><em>Empecemos por el negocio.</em></h2>
          <p>{page.cta.lead} No hace falta que llegues con la solución definida: necesitamos entender el problema, el contexto y el resultado que esperas.</p>
        </div>
        <a className="as-btn as-btn-metal" href="/contact/">Abrir una conversación<i className="as-arrow" aria-hidden="true" /></a>
      </section>
      </main>

      <StudioFooter />
    </div>
  )
}
