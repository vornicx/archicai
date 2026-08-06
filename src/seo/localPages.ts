/**
 * Landings locales (SEO local).
 *
 * Archic opera desde Écija (Sevilla). Las búsquedas locales tienen mucha menos
 * competencia que las nacionales — "diseño web sevilla" KD 34, "mantenimiento
 * web sevilla" KD 9, "diseño web écija" KD 0 (Semrush, base es) — y su
 * intención es más comercial. Cada landing responde a una única consulta
 * ciudad + servicio y emite ProfessionalService + Service + FAQPage propios.
 *
 * Reutilizan la estructura de ServicePage para compartir plantilla y generador
 * de HTML estático, y añaden `local` con el ámbito geográfico del marcado.
 */
import type { ServicePage } from './servicePages'
import type { LocalScope } from './localBusiness'

export type LocalLandingPage = ServicePage & { local: LocalScope }

const SEVILLA_AREA = [
  'Écija',
  'Carmona',
  'Osuna',
  'Marchena',
  'Utrera',
  'Dos Hermanas',
  'Alcalá de Guadaíra',
]

export const LOCAL_PAGES: LocalLandingPage[] = [
  {
    path: '/diseno-web-sevilla/',
    keyword: 'diseño web sevilla',
    secondary: ['diseño páginas web sevilla', 'agencia diseño web sevilla', 'páginas web sevilla'],
    breadcrumb: 'Diseño web en Sevilla',
    serviceName: 'Diseño web en Sevilla',
    local: { city: 'Sevilla', province: 'Sevilla', alsoServes: SEVILLA_AREA },
    meta: {
      title: 'Diseño web en Sevilla | Páginas web para empresas | Archic',
      description:
        'Estudio de diseño y desarrollo web en la provincia de Sevilla. Webs rápidas, medibles y hechas a medida para empresas y autónomos. Presupuesto cerrado, trato directo.',
    },
    hero: {
      eyebrow: 'Diseño web · Sevilla',
      h1: 'Diseño web en Sevilla para negocios que quieren clientes, no una web más',
      lead: 'Archic es un estudio de diseño y desarrollo web con base en Écija, en la provincia de Sevilla. Trabajamos con empresas y autónomos de toda la provincia: web hecha a medida, sin plantillas, con la estructura y la velocidad que hacen falta para captar contactos desde Google.',
      note: 'Trato directo con quien programa tu web. Presupuesto cerrado antes de empezar.',
    },
    intro: {
      title: 'Un estudio de la provincia, no una agencia deslocalizada',
      body: [
        'La mayoría de negocios de Sevilla que nos llaman vienen del mismo sitio: una web hecha hace años con una plantilla, lenta en móvil, imposible de actualizar sin depender de alguien que ya no responde. El problema casi nunca es el diseño, es la base técnica y la falta de una estructura pensada para lo que busca tu cliente.',
        'Estamos en Écija, a 85 km de Sevilla capital. Eso significa reuniones presenciales cuando el proyecto lo pide y una sola persona responsable del proyecto de principio a fin: la misma que analiza, escribe la estructura, diseña y programa. Sin cadena de cuentas intermedias.',
        'Trabajamos con negocios de Sevilla capital, del Aljarafe, de la comarca de Écija y de la Campiña: talleres, clínicas, despachos, industria auxiliar, hostelería y comercio con venta online.',
      ],
    },
    blocks: {
      eyebrow: 'Alcance',
      title: 'Qué incluye un proyecto web en Sevilla',
      lead: 'Todo lo necesario para que la web esté publicada, sea rápida y aparezca en las búsquedas de tu zona.',
      items: [
        {
          title: 'Estructura orientada a búsqueda local',
          desc: 'Una URL por servicio y por zona cuando tiene sentido, con los términos que realmente busca tu cliente en Sevilla y provincia.',
        },
        {
          title: 'Diseño propio',
          desc: 'Interfaz hecha para tu negocio y tu identidad visual. Nada de plantillas recicladas con las fotos cambiadas.',
        },
        {
          title: 'Rendimiento medido',
          desc: 'Core Web Vitals verificados antes de publicar. La mayoría de tus visitas llegan desde el móvil y con datos móviles.',
        },
        {
          title: 'SEO local técnico',
          desc: 'Datos estructurados LocalBusiness, coherencia NAP con tu ficha de Google, sitemap y metadatos por página.',
        },
        {
          title: 'Ficha de Google Business Profile',
          desc: 'Revisión o alta de tu ficha: categorías, servicios, zona de actuación y fotos, conectada con la web.',
        },
        {
          title: 'Cumplimiento legal',
          desc: 'Aviso legal, privacidad y cookies conformes con la LSSI-CE y el RGPD, no un texto copiado.',
        },
      ],
    },
    includes: {
      title: 'Para quién funciona bien',
      items: [
        'Empresas de Sevilla y provincia con una web antigua que ya no representa al negocio',
        'Negocios locales que dependen de que les encuentren buscando "servicio + ciudad"',
        'Autónomos y despachos que necesitan una web seria sin cuotas indefinidas',
        'Industria y talleres de la Campiña y la Vega que venden a otras empresas',
      ],
    },
    process: {
      title: 'Cómo trabajamos en un proyecto de Sevilla',
      steps: [
        'Primera conversación, por videollamada o presencial si estás en la provincia.',
        'Análisis: qué buscan tus clientes en tu zona y qué hace la competencia local.',
        'Propuesta cerrada por escrito: alcance, calendario y precio final.',
        'Arquitectura, contenidos y diseño, revisados contigo sobre entregas reales.',
        'Publicación con rendimiento, accesibilidad y SEO técnico verificados.',
        'Ficha de Google y seguimiento de posiciones los primeros meses.',
      ],
    },
    faq: {
      title: 'Preguntas frecuentes sobre diseño web en Sevilla',
      items: [
        {
          q: '¿Trabajáis solo con empresas de Sevilla capital?',
          a: 'No. Estamos en Écija y trabajamos con toda la provincia: Sevilla capital, Carmona, Osuna, Marchena, Utrera, Dos Hermanas, Alcalá de Guadaíra y la comarca de Écija. También aceptamos proyectos del resto de España, en remoto.',
        },
        {
          q: '¿Cuánto cuesta una página web en Sevilla?',
          a: 'Depende del número de páginas, de si hay que redactar los contenidos y de las integraciones. Trabajamos con presupuesto cerrado: recibes el precio final por escrito antes de empezar, sin partidas abiertas ni ampliaciones sorpresa.',
        },
        {
          q: '¿Podemos vernos en persona?',
          a: 'Sí, si el proyecto lo justifica. Écija está a 85 km de Sevilla capital y a menos de una hora de la mayoría de municipios de la Campiña. El resto del trabajo se coordina por videollamada y correo.',
        },
        {
          q: '¿En cuánto tiempo aparece la web en Google?',
          a: 'La indexación suele tardar entre días y pocas semanas. Posicionar para búsquedas locales del tipo "servicio + Sevilla" lleva normalmente de dos a seis meses, según la competencia del sector y del estado de tu ficha de Google Business Profile.',
        },
        {
          q: '¿Me quedo atado a vosotros después?',
          a: 'No. El código y los accesos son tuyos. El mantenimiento es opcional y sin permanencia: puedes contratarlo, dejarlo o llevarte el proyecto a otro proveedor cuando quieras.',
        },
      ],
    },
    cta: {
      title: 'Cuéntanos qué necesita tu negocio en Sevilla',
      lead: 'Escríbenos con lo que tienes ahora y lo que quieres conseguir. Respondemos con un diagnóstico honesto y, si encaja, una propuesta cerrada.',
    },
    related: ['/diseno-web-ecija/', '/mantenimiento-web-sevilla/', '/desarrollo-web-sevilla/'],
  },
  {
    path: '/diseno-web-ecija/',
    keyword: 'diseño web écija',
    secondary: ['páginas web écija', 'diseñador web écija', 'diseño web campiña sevillana'],
    breadcrumb: 'Diseño web en Écija',
    serviceName: 'Diseño web en Écija',
    local: {
      city: 'Écija',
      province: 'Sevilla',
      alsoServes: ['Osuna', 'Marchena', 'La Luisiana', 'Fuentes de Andalucía', 'Palma del Río', 'Puente Genil', 'Carmona'],
      geo: { latitude: 37.5417, longitude: -5.0823 },
    },
    meta: {
      title: 'Diseño web en Écija (Sevilla) | Páginas web y software | Archic',
      description:
        'Diseño y desarrollo web en Écija. Estudio local para empresas, comercios y autónomos de la Campiña sevillana: webs rápidas, mantenimiento y software a medida.',
    },
    hero: {
      eyebrow: 'Diseño web · Écija',
      h1: 'Diseño web en Écija: un estudio local para negocios de la Campiña',
      lead: 'Archic tiene su base en Écija. Diseñamos y programamos páginas web para empresas, comercios y autónomos de la ciudad y de la comarca, con la misma exigencia técnica que aplicamos a proyectos nacionales.',
      note: 'Reuniones presenciales en Écija. Presupuesto cerrado, sin permanencia.',
    },
    intro: {
      title: 'Por qué una web local bien hecha rinde tanto en Écija',
      body: [
        'En un mercado local la competencia digital es baja: muchos negocios de Écija no tienen web, y los que la tienen suelen arrastrar una plantilla lenta sin ficha de Google conectada. Eso convierte a la búsqueda local en la vía más barata para captar clientes: quien aparece en el mapa y en los tres primeros resultados se lleva la llamada.',
        'Nuestro trabajo combina las dos piezas que hacen falta: una web rápida con la estructura y los términos que busca tu cliente, y una ficha de Google Business Profile correctamente configurada y coherente con la web.',
        'Al estar aquí, las conversaciones son directas: podemos vernos, ver el negocio y hacer fotos reales en lugar de tirar de banco de imágenes.',
      ],
    },
    blocks: {
      eyebrow: 'Alcance',
      title: 'Qué hacemos para negocios de Écija',
      lead: 'Desde una web de presencia bien resuelta hasta software que sustituye hojas de cálculo.',
      items: [
        {
          title: 'Web de negocio local',
          desc: 'Páginas de servicio, zona de actuación, teléfono y ruta visibles desde el móvil en el primer vistazo.',
        },
        {
          title: 'Ficha de Google conectada',
          desc: 'Categorías, servicios, horario, fotos y datos NAP coherentes con la web para reforzar el paquete local.',
        },
        {
          title: 'Contenido para búsquedas de la comarca',
          desc: 'Textos que responden a lo que la gente escribe en la zona, no a lo que suena bien en una agencia.',
        },
        {
          title: 'Mantenimiento cercano',
          desc: 'Actualizaciones, copias de seguridad y cambios de contenido con un interlocutor que responde.',
        },
        {
          title: 'Software a medida',
          desc: 'Presupuestos, partes de trabajo o control de stock: pequeñas aplicaciones internas que ahorran horas.',
        },
        {
          title: 'Legal y RGPD',
          desc: 'Textos legales reales, adaptados a tu actividad y a los datos que recoges de verdad.',
        },
      ],
    },
    includes: {
      title: 'Para quién funciona bien',
      items: [
        'Comercios y hostelería de Écija que dependen de aparecer en el mapa de Google',
        'Talleres, industria agroalimentaria y empresas auxiliares de la Campiña',
        'Clínicas, despachos y profesionales con cita previa',
        'Autónomos que necesitan una web seria y barata de mantener',
      ],
    },
    process: {
      title: 'Cómo empezamos',
      steps: [
        'Café o videollamada: qué vendes, a quién y qué te está fallando ahora.',
        'Revisión de tu presencia actual: web, ficha de Google y competencia local.',
        'Propuesta cerrada por escrito, con alcance y plazos.',
        'Diseño y desarrollo, con revisiones sobre la web real.',
        'Publicación y configuración de la ficha de Google Business Profile.',
        'Seguimiento de posiciones y ajustes durante los primeros meses.',
      ],
    },
    faq: {
      title: 'Preguntas frecuentes sobre diseño web en Écija',
      items: [
        {
          q: '¿Atendéis a negocios fuera de Écija?',
          a: 'Sí. Trabajamos habitualmente en Osuna, Marchena, La Luisiana, Fuentes de Andalucía, Carmona, Palma del Río y Puente Genil, además de Sevilla capital y el resto de España en remoto.',
        },
        {
          q: '¿Necesito una web si ya tengo la ficha de Google?',
          a: 'La ficha sola te limita. Google usa la web para confirmar de qué va tu negocio, qué servicios ofreces y en qué zona trabajas, y es donde el cliente decide antes de llamar. Ficha y web se refuerzan; por separado rinden mucho menos.',
        },
        {
          q: '¿Cuánto tarda un proyecto?',
          a: 'Una web de negocio local bien resuelta suele estar publicada entre tres y seis semanas, según lo rápido que se cierren los contenidos. El plazo va por escrito en la propuesta.',
        },
        {
          q: '¿Hacéis también tiendas online?',
          a: 'Sí, cuando el catálogo y la logística lo justifican. Si el volumen es pequeño, muchas veces sale mejor una web de catálogo con pedido por WhatsApp o formulario, y te lo diremos antes de venderte una tienda que no necesitas.',
        },
      ],
    },
    cta: {
      title: 'Hablemos de tu negocio en Écija',
      lead: 'Escríbenos y te decimos con franqueza qué haría falta, cuánto costaría y qué resultado es realista en tu sector.',
    },
    related: ['/diseno-web-sevilla/', '/diseno-web-para-autonomos/', '/mantenimiento-web-sevilla/'],
  },
  {
    path: '/mantenimiento-web-sevilla/',
    keyword: 'mantenimiento web sevilla',
    secondary: ['mantenimiento páginas web sevilla', 'soporte web sevilla', 'mantenimiento wordpress sevilla'],
    breadcrumb: 'Mantenimiento web en Sevilla',
    serviceName: 'Mantenimiento web en Sevilla',
    local: { city: 'Sevilla', province: 'Sevilla', alsoServes: SEVILLA_AREA },
    meta: {
      title: 'Mantenimiento web en Sevilla | Soporte mensual sin permanencia | Archic',
      description:
        'Mantenimiento web para empresas de Sevilla y provincia: actualizaciones, copias de seguridad, seguridad, rendimiento y cambios de contenido. Sin permanencia.',
    },
    hero: {
      eyebrow: 'Mantenimiento web · Sevilla',
      h1: 'Mantenimiento web en Sevilla con un responsable que responde',
      lead: 'Actualizaciones, copias de seguridad verificadas, seguridad, rendimiento y cambios de contenido para empresas de Sevilla y provincia. Un interlocutor técnico, informe mensual y ninguna permanencia.',
      note: 'Cuota mensual cerrada. Puedes cancelar cuando quieras.',
    },
    intro: {
      title: 'Qué falla cuando una web "no se toca"',
      body: [
        'Una web sin mantenimiento no se rompe el primer mes: se degrada. Plugins desactualizados que abren agujeros de seguridad, certificados que caducan, formularios que dejan de enviar correo sin avisar y velocidad que cae según se acumulan imágenes sin optimizar. El problema se descubre cuando ya se han perdido contactos.',
        'El mantenimiento que hacemos no es un "por si acaso": es una revisión con checklist, copias que se prueban restaurándolas y un informe mensual con lo que se ha hecho y lo que conviene hacer.',
      ],
    },
    blocks: {
      eyebrow: 'Alcance',
      title: 'Qué incluye el mantenimiento',
      lead: 'Lo que evita incidencias y lo que las resuelve rápido cuando ocurren.',
      items: [
        { title: 'Actualizaciones controladas', desc: 'Núcleo, dependencias y plugins actualizados en entorno de prueba antes de tocar producción.' },
        { title: 'Copias de seguridad verificadas', desc: 'Copias periódicas fuera del servidor y prueba real de restauración, no solo el aviso de "backup correcto".' },
        { title: 'Seguridad y monitorización', desc: 'Certificado, cabeceras, control de accesos y aviso si la web deja de responder.' },
        { title: 'Rendimiento', desc: 'Revisión de Core Web Vitals y optimización de imágenes y recursos cuando la velocidad baja.' },
        { title: 'Cambios de contenido', desc: 'Bolsa mensual de horas para textos, imágenes, precios o nuevas secciones.' },
        { title: 'Informe mensual', desc: 'Qué se ha hecho, qué incidencias hubo y qué recomendamos para el mes siguiente.' },
      ],
    },
    includes: {
      title: 'Para quién funciona bien',
      items: [
        'Empresas de Sevilla sin perfil técnico interno',
        'Negocios cuya web genera contactos y no puede estar caída',
        'Webs heredadas de un proveedor que ya no da soporte',
        'Proyectos con normativa que exige copias y trazabilidad',
      ],
    },
    process: {
      title: 'Cómo empieza',
      steps: [
        'Auditoría inicial del estado de la web, el hosting y las copias.',
        'Informe con riesgos detectados y prioridad de cada uno.',
        'Puesta al día: actualizaciones, seguridad y rendimiento base.',
        'Plan mensual con alcance y horas de cambios acordadas.',
        'Revisión periódica e informe cada mes.',
      ],
    },
    faq: {
      title: 'Preguntas frecuentes sobre mantenimiento web en Sevilla',
      items: [
        {
          q: '¿Mantenéis webs que no habéis hecho vosotros?',
          a: 'Sí. Empezamos con una auditoría para saber en qué estado está el proyecto. Si algo no es mantenible con garantías, te lo decimos antes de cobrar una cuota mensual.',
        },
        {
          q: '¿Hay permanencia?',
          a: 'No. El mantenimiento es mensual y se puede cancelar en cualquier momento. Los accesos y las copias son tuyos siempre.',
        },
        {
          q: '¿Qué pasa si la web se cae un fin de semana?',
          a: 'La monitorización avisa automáticamente. Atendemos las incidencias críticas fuera de horario; el tiempo de respuesta comprometido queda escrito en la propuesta.',
        },
        {
          q: '¿El mantenimiento incluye SEO?',
          a: 'Incluye el SEO técnico que depende del mantenimiento: velocidad, indexabilidad, enlaces rotos y datos estructurados. El trabajo de contenidos y posicionamiento se presupuesta aparte.',
        },
      ],
    },
    cta: {
      title: 'Pide la auditoría inicial de tu web',
      lead: 'Revisamos el estado real de tu web, hosting y copias, y te decimos qué necesita antes de proponerte ninguna cuota.',
    },
    related: ['/mantenimiento-web/', '/diseno-web-sevilla/', '/desarrollo-web-sevilla/'],
  },
  {
    path: '/desarrollo-web-sevilla/',
    keyword: 'desarrollo web sevilla',
    secondary: ['programador web sevilla', 'aplicaciones web sevilla', 'software a medida sevilla'],
    breadcrumb: 'Desarrollo web en Sevilla',
    serviceName: 'Desarrollo web en Sevilla',
    local: { city: 'Sevilla', province: 'Sevilla', alsoServes: SEVILLA_AREA },
    meta: {
      title: 'Desarrollo web en Sevilla | Aplicaciones y software a medida | Archic',
      description:
        'Desarrollo web y aplicaciones a medida para empresas de Sevilla y provincia: paneles internos, integraciones y automatización de procesos. Código propio y documentado.',
    },
    hero: {
      eyebrow: 'Desarrollo web · Sevilla',
      h1: 'Desarrollo web a medida para empresas de Sevilla',
      lead: 'Aplicaciones web, paneles internos e integraciones para empresas de Sevilla y provincia. Escribimos código propio, documentado y sin dependencias que te aten a nosotros.',
      note: 'Alcance y precio cerrados por fase. Código y datos siempre tuyos.',
    },
    intro: {
      title: 'Cuándo un desarrollo a medida sale rentable',
      body: [
        'No siempre hace falta. Si un software estándar cubre el proceso, lo recomendamos y nos ahorramos el proyecto. El desarrollo a medida compensa cuando el proceso es el que diferencia a tu empresa, cuando el equipo pierde horas cuadrando hojas de cálculo o cuando dos sistemas que no se hablan obligan a duplicar datos a mano.',
        'Trabajamos por fases cerradas: primero la pieza que quita más dolor, en producción y en uso real, y después se amplía. Así el presupuesto se controla y el riesgo de construir algo que nadie usa desaparece.',
      ],
    },
    blocks: {
      eyebrow: 'Alcance',
      title: 'Qué desarrollamos',
      lead: 'Software de negocio, no demos.',
      items: [
        { title: 'Paneles y aplicaciones internas', desc: 'Gestión de pedidos, partes de trabajo, presupuestos, stock o clientes, con permisos por rol.' },
        { title: 'Integraciones', desc: 'Conexión con ERP, facturación, pasarelas de pago o herramientas que ya usáis, vía API.' },
        { title: 'Automatización de procesos', desc: 'Tareas repetitivas convertidas en procesos automáticos con trazabilidad de lo que ocurre.' },
        { title: 'Portales de cliente', desc: 'Acceso privado para que tus clientes consulten su información sin llamar por teléfono.' },
        { title: 'Migraciones', desc: 'Salida ordenada de sistemas antiguos conservando el histórico de datos.' },
        { title: 'Documentación y entrega', desc: 'Repositorio, documentación técnica y despliegue explicados. Sin cajas negras.' },
      ],
    },
    includes: {
      title: 'Para quién funciona bien',
      items: [
        'Empresas de Sevilla con procesos internos sostenidos por Excel',
        'Negocios con dos o más sistemas que no se comunican',
        'Equipos que necesitan que sus clientes se autogestionen',
        'Proyectos que arrastran un desarrollo antiguo difícil de mantener',
      ],
    },
    process: {
      title: 'Cómo trabajamos',
      steps: [
        'Análisis del proceso real, hablando con quien lo ejecuta cada día.',
        'Propuesta por fases: alcance, precio y plazo de cada una.',
        'Primera fase en producción y en uso, no en una demo.',
        'Iteración con feedback de los usuarios reales.',
        'Entrega documentada, con código y datos en tu poder.',
      ],
    },
    faq: {
      title: 'Preguntas frecuentes sobre desarrollo web en Sevilla',
      items: [
        {
          q: '¿Cuánto cuesta un desarrollo a medida?',
          a: 'Se presupuesta por fases. La primera fase suele ser deliberadamente pequeña para que puedas validar el resultado con poco riesgo antes de comprometer más presupuesto.',
        },
        {
          q: '¿De quién es el código?',
          a: 'Tuyo. Se entrega en tu repositorio, documentado y desplegable por otro equipo. No usamos plataformas cerradas que impidan llevártelo.',
        },
        {
          q: '¿Podéis integrar con el software que ya usamos?',
          a: 'Siempre que el sistema ofrezca API o exportación de datos. Lo verificamos en la fase de análisis, antes de comprometer plazos.',
        },
        {
          q: '¿Trabajáis presencialmente en Sevilla?',
          a: 'Las sesiones de análisis pueden ser presenciales en la provincia; el desarrollo se hace en remoto con entregas y revisiones periódicas.',
        },
      ],
    },
    cta: {
      title: 'Cuéntanos el proceso que quieres resolver',
      lead: 'Describe cómo lo hacéis hoy. Te decimos si hace falta desarrollo a medida o si hay una solución más barata.',
    },
    related: ['/desarrollo-web-a-medida/', '/diseno-web-sevilla/', '/mantenimiento-web-sevilla/'],
  },
]

export const LOCAL_PAGE_BY_PATH: Record<string, LocalLandingPage> = Object.fromEntries(
  LOCAL_PAGES.map((page) => [page.path, page]),
)
