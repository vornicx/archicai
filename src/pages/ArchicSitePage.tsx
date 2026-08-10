import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioContact from '../components/StudioContact'
import StudioExperience from '../components/StudioExperience'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'

export type ArchicPageKey = 'presence' | 'control' | 'business' | 'studio' | 'contact'

type PageCopy = {
  eyebrow: string
  title: string
  accent: string
  intro: string
  statement: string
  statementAccent: string
  statementBody: string
  features: [string, string, string][]
  principleTitle: string
  principleBody: string
  ctaTitle: string
  ctaBody: string
}

const COPY: Record<'es' | 'en', Record<Exclude<ArchicPageKey, 'contact'>, PageCopy>> = {
  es: {
    presence: {
      eyebrow: 'ARCHIC PRESENCE',
      title: 'La parte de tu negocio',
      accent: 'que todo el mundo ve.',
      intro: 'Dirección digital, web, contenido y conversión construidos como una única experiencia. No diseñamos una plantilla bonita: construimos percepción.',
      statement: 'Una buena web informa.',
      statementAccent: 'Una gran presencia cambia cómo se percibe el negocio.',
      statementBody: 'Cada decisión —ritmo, fotografía, copy, jerarquía, interacción y rendimiento— debe reforzar la misma sensación. Cuando todo encaja, el resultado parece inevitable.',
      features: [
        ['01', 'Dirección digital', 'Definimos el lenguaje visual y la experiencia antes de pensar en componentes.'],
        ['02', 'Web premium', 'Diseño y desarrollo a medida, responsive, rápido y pensado para convertir sin parecer agresivo.'],
        ['03', 'Contenido & estructura', 'Arquitectura, narrativa, fotografía y copy trabajando con una intención comercial clara.'],
        ['04', 'Rendimiento & SEO', 'Base técnica sólida, accesible y preparada para crecer sin sacrificar la experiencia.'],
      ],
      principleTitle: 'Menos páginas. Más intención.',
      principleBody: 'Cada pantalla debe tener una razón para existir. Quitamos ruido, elevamos lo importante y dejamos espacio para que la marca respire.',
      ctaTitle: '¿Tu presencia digital está por debajo del nivel real de tu negocio?',
      ctaBody: 'Cuéntanos qué quieres que cambie cuando alguien descubra tu marca por primera vez.',
    },
    control: {
      eyebrow: 'ARCHIC CONTROL',
      title: 'La parte del negocio',
      accent: 'que el cliente no debería notar.',
      intro: 'Reservas, clientes, recursos, operaciones y seguimiento en un entorno privado construido alrededor de cómo funciona realmente tu negocio.',
      statement: 'La experiencia parece simple',
      statementAccent: 'cuando el sistema hace bien el trabajo difícil.',
      statementBody: 'Control no es otro dashboard lleno de tarjetas. Es una capa operativa diseñada para reducir fricción, evitar información dispersa y convertir el día a día en algo más claro.',
      features: [
        ['01', 'Clientes', 'Perfiles, historial, notas, preferencias y contexto accesible cuando hace falta.'],
        ['02', 'Reservas & solicitudes', 'Entrada, confirmación, estados, disponibilidad y seguimiento desde un único lugar.'],
        ['03', 'Recursos & operaciones', 'Personas, mesas, vehículos, inmuebles, servicios o cualquier recurso que mueva el negocio.'],
        ['04', 'Visibilidad', 'Información relevante y reporting sin convertir la herramienta en un panel de métricas vacío.'],
      ],
      principleTitle: 'Construido alrededor de la operación.',
      principleBody: 'No adaptamos el negocio a una plantilla de software. Observamos el flujo real y construimos la interfaz alrededor de él.',
      ctaTitle: '¿Tu equipo trabaja con demasiadas herramientas, mensajes y hojas sueltas?',
      ctaBody: 'Podemos convertir ese caos invisible en un sistema privado que tenga sentido para tu operación.',
    },
    business: {
      eyebrow: 'ARCHIC BUSINESS',
      title: 'Cuando comprar software',
      accent: 'ya no es suficiente.',
      intro: 'Software a medida, automatización, integraciones y datos para negocios que necesitan una ventaja operativa propia, no otra suscripción genérica.',
      statement: 'La tecnología tiene valor',
      statementAccent: 'cuando cambia lo que el negocio puede hacer.',
      statementBody: 'Partimos de un cuello de botella, una oportunidad o un proceso que merece mejorar. Si una herramienta existente resuelve bien el problema, la usamos. Si no, construimos.',
      features: [
        ['01', 'Software a medida', 'Herramientas internas, portales, flujos y productos digitales diseñados para una necesidad concreta.'],
        ['02', 'Integraciones', 'Conectamos sistemas existentes para que los datos dejen de vivir en islas.'],
        ['03', 'Automatización', 'Quitamos pasos repetitivos y tareas manuales donde la tecnología puede hacerlo mejor.'],
        ['04', 'Datos & decisión', 'Convertimos actividad en información útil para operar, priorizar y crecer.'],
      ],
      principleTitle: 'Construir solo cuando merece existir.',
      principleBody: 'El software a medida no es el objetivo. El objetivo es resolver mejor el negocio. Esa diferencia evita proyectos caros que no crean valor.',
      ctaTitle: '¿Hay algo que tu negocio debería poder hacer y hoy no puede?',
      ctaBody: 'Explícanos el problema antes que la solución. Ahí empieza el trabajo útil.',
    },
    studio: {
      eyebrow: 'ARCHIC / STUDIO',
      title: 'Diseño, tecnología',
      accent: 'y criterio de negocio.',
      intro: 'Archic construye la capa digital de negocios con un estándar alto: lo que ve el cliente y lo que hace funcionar la operación por detrás.',
      statement: 'No queremos ser una fábrica',
      statementAccent: 'de webs ni una consultora de software genérica.',
      statementBody: 'Trabajamos mejor cuando el proyecto importa: cuando la percepción, la experiencia, la operación o la tecnología pueden cambiar de verdad el valor que transmite un negocio.',
      features: [
        ['01', 'Entender primero', 'Antes de diseñar, buscamos qué necesita cambiar y por qué importa para el negocio.'],
        ['02', 'Una dirección clara', 'Reducimos opciones pronto. La calidad mejora cuando las decisiones tienen criterio.'],
        ['03', 'Diseño + desarrollo', 'La experiencia y la implementación se piensan juntas para que el resultado final no pierda intención.'],
        ['04', 'Evolución', 'Construimos bases que puedan crecer cuando el negocio demuestre que necesita más.'],
      ],
      principleTitle: 'Supervised AI. Human judgement.',
      principleBody: 'Usamos inteligencia artificial donde multiplica velocidad y capacidad, pero la dirección, las decisiones y el estándar final siguen siendo responsabilidad humana.',
      ctaTitle: 'Si el proyecto merece atención de verdad, queremos escucharlo.',
      ctaBody: 'No necesitas llegar con un briefing perfecto. Necesitamos entender el negocio, el problema y el nivel al que quieres llevarlo.',
    },
  },
  en: {
    presence: {
      eyebrow: 'ARCHIC PRESENCE',
      title: 'The part of your business',
      accent: 'everyone gets to see.',
      intro: 'Digital direction, web, content and conversion built as one experience. We do not design a beautiful template; we build perception.',
      statement: 'A good website informs.',
      statementAccent: 'A great presence changes how the business is perceived.',
      statementBody: 'Every decision — rhythm, imagery, copy, hierarchy, interaction and performance — should reinforce the same feeling. When everything fits, the result feels inevitable.',
      features: [
        ['01', 'Digital direction', 'We define the visual language and experience before thinking in components.'],
        ['02', 'Premium web', 'Bespoke design and development, responsive, fast and built to convert without feeling aggressive.'],
        ['03', 'Content & structure', 'Architecture, narrative, imagery and copy working toward a clear commercial intention.'],
        ['04', 'Performance & SEO', 'A solid, accessible technical base ready to grow without sacrificing the experience.'],
      ],
      principleTitle: 'Fewer pages. More intent.',
      principleBody: 'Every screen needs a reason to exist. We remove noise, elevate what matters and leave room for the brand to breathe.',
      ctaTitle: 'Is your digital presence below the real standard of your business?',
      ctaBody: 'Tell us what you want to change when someone discovers your brand for the first time.',
    },
    control: {
      eyebrow: 'ARCHIC CONTROL',
      title: 'The part of the business',
      accent: 'the customer should never notice.',
      intro: 'Bookings, customers, resources, operations and follow-up in a private environment built around how your business actually works.',
      statement: 'The experience feels simple',
      statementAccent: 'when the system handles the difficult work well.',
      statementBody: 'Control is not another dashboard full of cards. It is an operating layer designed to reduce friction, remove scattered information and make daily work clearer.',
      features: [
        ['01', 'Customers', 'Profiles, history, notes, preferences and context available when needed.'],
        ['02', 'Bookings & enquiries', 'Intake, confirmation, states, availability and follow-up in one place.'],
        ['03', 'Resources & operations', 'People, tables, vehicles, properties, services or whatever resource drives the business.'],
        ['04', 'Visibility', 'Relevant information and reporting without turning the product into an empty metrics dashboard.'],
      ],
      principleTitle: 'Built around the operation.',
      principleBody: 'We do not force the business into a software template. We observe the real flow and build the interface around it.',
      ctaTitle: 'Does your team work across too many tools, messages and loose spreadsheets?',
      ctaBody: 'We can turn that invisible chaos into a private system that makes sense for your operation.',
    },
    business: {
      eyebrow: 'ARCHIC BUSINESS',
      title: 'When buying software',
      accent: 'is no longer enough.',
      intro: 'Custom software, automation, integrations and data for businesses that need their own operating advantage, not another generic subscription.',
      statement: 'Technology creates value',
      statementAccent: 'when it changes what the business can do.',
      statementBody: 'We start from a bottleneck, an opportunity or a process worth improving. If an existing tool solves it well, we use it. If not, we build.',
      features: [
        ['01', 'Custom software', 'Internal tools, portals, workflows and digital products designed for a specific need.'],
        ['02', 'Integrations', 'We connect existing systems so data stops living on islands.'],
        ['03', 'Automation', 'We remove repetitive steps and manual tasks where technology can do better.'],
        ['04', 'Data & decisions', 'We turn activity into information that helps operate, prioritise and grow.'],
      ],
      principleTitle: 'Build only when it deserves to exist.',
      principleBody: 'Custom software is not the goal. Solving the business better is. That difference prevents expensive projects that create no value.',
      ctaTitle: 'Is there something your business should be able to do but cannot today?',
      ctaBody: 'Explain the problem before the solution. That is where useful work starts.',
    },
    studio: {
      eyebrow: 'ARCHIC / STUDIO',
      title: 'Design, technology',
      accent: 'and business judgement.',
      intro: 'Archic builds the digital layer of high-standard businesses: what the customer sees and what makes the operation work behind it.',
      statement: 'We do not want to be',
      statementAccent: 'a website factory or a generic software consultancy.',
      statementBody: 'We work best when the project matters: when perception, experience, operations or technology can materially change the value a business communicates.',
      features: [
        ['01', 'Understand first', 'Before designing, we identify what needs to change and why it matters to the business.'],
        ['02', 'A clear direction', 'We reduce options early. Quality improves when decisions have judgement behind them.'],
        ['03', 'Design + development', 'Experience and implementation are thought through together so the final result keeps its intent.'],
        ['04', 'Evolution', 'We build foundations that can grow once the business proves it needs more.'],
      ],
      principleTitle: 'Supervised AI. Human judgement.',
      principleBody: 'We use artificial intelligence where it multiplies speed and capability, while direction, decisions and the final standard remain a human responsibility.',
      ctaTitle: 'If the project deserves real attention, we want to hear it.',
      ctaBody: 'You do not need a perfect brief. We need to understand the business, the problem and the level you want to reach.',
    },
  },
}

const PAGE_INDEX: Record<Exclude<ArchicPageKey, 'contact'>, string> = {
  presence: '01',
  control: '02',
  business: '03',
  studio: '04',
}

function path(lang: 'es' | 'en', slug: string) {
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

export default function ArchicSitePage({ page }: { page: ArchicPageKey }) {
  const { lang } = useLang()

  if (page === 'contact') {
    const title = lang === 'es' ? 'Cuéntanos el proyecto.' : 'Tell us about the project.'
    const body = lang === 'es'
      ? 'Qué negocio es, qué quieres mejorar y qué resultado esperas. No hace falta un briefing perfecto.'
      : 'What the business is, what you want to improve and what outcome you expect. A perfect brief is not required.'
    const callLabel = lang === 'es' ? 'Si prefieres hablar, llámanos directamente' : 'If you would rather talk, call us directly'

    return (
      <div className="as-site as-contact-page">
        <Helmet>
          <title>{lang === 'es' ? 'Contacto — Archic' : 'Contact — Archic'}</title>
        </Helmet>
        <StudioExperience />
        <StudioHeader />
        <section className="as-contact-hero">
          <div data-reveal>
            <p className="as-kicker">PRIVATE PROJECT ENQUIRY</p>
            <h1>{title}</h1>
            <p>{body}</p>
            <a className="as-contact-direct-call" href={`tel:${CONTACT_PHONE}`}>
              <span>{callLabel}</span>
              <strong>{CONTACT_PHONE_DISPLAY}</strong>
              <i>↗</i>
            </a>
            <div className="as-contact-notes">
              <span>01 · {lang === 'es' ? 'El negocio' : 'The business'}</span>
              <span>02 · {lang === 'es' ? 'El problema' : 'The problem'}</span>
              <span>03 · {lang === 'es' ? 'El resultado' : 'The outcome'}</span>
            </div>
          </div>
          <div className="as-contact-form" data-reveal>
            <div className="as-form-head"><span>ARCHIC / PROJECT</span><span>PRIVATE ENQUIRY</span></div>
            <StudioContact />
          </div>
        </section>
        <StudioFooter />
      </div>
    )
  }

  const c = COPY[lang][page]
  const pageIndex = PAGE_INDEX[page]
  return (
    <div className={`as-site as-detail as-${page}`}>
      <Helmet>
        <title>{`${c.eyebrow.replace('ARCHIC ', '')} — Archic`}</title>
        <meta name="description" content={c.intro} />
      </Helmet>
      <StudioExperience />
      <StudioHeader />

      <section className="as-detail-hero">
        <div className="as-detail-hero-copy" data-reveal="hero">
          <p className="as-kicker">{c.eyebrow}</p>
          <h1>{c.title}<br /><em>{c.accent}</em></h1>
          <p className="as-lead">{c.intro}</p>
        </div>
        <div className="as-scroll-mark" aria-hidden="true"><span>{pageIndex}</span><i /><strong>{page.toUpperCase()}</strong></div>
      </section>

      <section className="as-statement">
        <div className="as-statement-index" data-reveal>ARCHIC / {page.toUpperCase()}</div>
        <div data-reveal>
          <h2>{c.statement}<br /><em>{c.statementAccent}</em></h2>
          <p>{c.statementBody}</p>
        </div>
      </section>

      <section className="as-feature-section">
        <div className="as-feature-head" data-reveal>
          <p className="as-kicker">{lang === 'es' ? 'QUÉ CONSTRUIMOS' : 'WHAT WE BUILD'}</p>
          <h2>{lang === 'es' ? 'Una capa digital completa.' : 'A complete digital layer.'}</h2>
        </div>
        <div className="as-feature-list">
          {c.features.map(([no, name, desc]) => (
            <article key={no} data-reveal>
              <span>{no}</span>
              <h3>{name}</h3>
              <p>{desc}</p>
              <i>↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="as-principle">
        <div className="as-principle-inner" data-reveal>
          <p className="as-kicker">ARCHIC PRINCIPLE</p>
          <h2>{c.principleTitle}</h2>
          <p>{c.principleBody}</p>
        </div>
      </section>

      <section className="as-next">
        <div data-reveal>
          <p className="as-kicker">{lang === 'es' ? 'SIGUIENTE PASO' : 'NEXT STEP'}</p>
          <h2>{c.ctaTitle}</h2>
          <p>{c.ctaBody}</p>
        </div>
        <div className="as-next-actions" data-reveal>
          <a className="as-next-project" href={path(lang, 'contact')}>{lang === 'es' ? 'Hablar de tu proyecto' : 'Talk about your project'}<span>↗</span></a>
          <a className="as-next-call" href={`tel:${CONTACT_PHONE}`}>
            <small>{lang === 'es' ? 'Llamar directamente' : 'Call directly'}</small>
            <strong>{CONTACT_PHONE_DISPLAY}</strong>
          </a>
        </div>
      </section>

      <StudioFooter />
    </div>
  )
}
