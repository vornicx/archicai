/**
 * Landing pages de servicio orientadas a búsqueda.
 *
 * Una sola home no puede posicionar para varias intenciones distintas: Google
 * necesita una URL por intención. Cada entrada aquí genera una ruta React y
 * tiene su HTML estático equivalente en la raíz del repositorio (GitHub Pages
 * no tiene fallback SPA), de modo que los rastreadores reciben title,
 * description, canonical, Open Graph y JSON-LD ya en el HTML servido.
 *
 * Las keywords y volúmenes provienen de Semrush (base de datos: es).
 */

export type FaqItem = { q: string; a: string }

export type ServiceBlock = { title: string; desc: string }

export type ServicePage = {
  /** Ruta con barra final, tal y como se sirve. */
  path: string
  /** Keyword principal a la que responde la página. */
  keyword: string
  /** Keywords secundarias cubiertas en el cuerpo del texto. */
  secondary: string[]
  breadcrumb: string
  meta: { title: string; description: string }
  hero: { eyebrow: string; h1: string; lead: string; note: string }
  intro: { title: string; body: string[] }
  blocks: { eyebrow: string; title: string; lead: string; items: ServiceBlock[] }
  includes: { title: string; items: string[] }
  process: { title: string; steps: string[] }
  faq: { title: string; items: FaqItem[] }
  cta: { title: string; lead: string }
  /** Enlaces internos hacia servicios relacionados. */
  related: string[]
  /** Nombre del servicio para el JSON-LD de tipo Service. */
  serviceName: string
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    path: '/diseno-web-para-empresas/',
    keyword: 'diseño web para empresas',
    secondary: ['diseño web profesional', 'empresa de diseño web', 'páginas web para empresas'],
    breadcrumb: 'Diseño web para empresas',
    serviceName: 'Diseño web para empresas',
    meta: {
      title: 'Diseño web para empresas en España | Archic',
      description:
        'Diseño web profesional para empresas: webs rápidas, medibles y preparadas para captar clientes. Proyecto cerrado, sin plantillas genéricas ni cuotas ocultas.',
    },
    hero: {
      eyebrow: 'Diseño web para empresas',
      h1: 'Diseño web para empresas que necesitan resultados, no una web bonita',
      lead: 'Diseñamos y desarrollamos páginas web profesionales para empresas y pymes en España: estructura pensada para convertir, carga rápida y una base técnica que se puede mantener y ampliar durante años.',
      note: 'Presupuesto cerrado antes de empezar. Sin permanencia.',
    },
    intro: {
      title: 'Qué diferencia a una web de empresa de una plantilla',
      body: [
        'La mayoría de webs de empresa fallan por lo mismo: una plantilla cargada de plugins, textos genéricos y ninguna decisión sobre a quién se dirige la página. El resultado es una web lenta, difícil de actualizar y que no genera contactos.',
        'Nuestro punto de partida es el negocio: qué vendes, a quién, qué objeción frena la decisión y qué debe pasar cuando alguien llega desde Google. A partir de ahí definimos estructura, contenidos y diseño. El código se escribe a medida, sin capas innecesarias.',
      ],
    },
    blocks: {
      eyebrow: 'Alcance',
      title: 'Qué incluye un proyecto de diseño web',
      lead: 'Un proyecto completo, desde la estrategia de contenidos hasta la puesta en producción.',
      items: [
        {
          title: 'Arquitectura y contenidos',
          desc: 'Definición de secciones, jerarquía de mensajes y textos orientados a la intención de búsqueda de tus clientes.',
        },
        {
          title: 'Diseño a medida',
          desc: 'Interfaz alineada con tu identidad visual, no una plantilla reutilizada. Diseño adaptado a móvil, tablet y escritorio.',
        },
        {
          title: 'Desarrollo y rendimiento',
          desc: 'Código propio, imágenes optimizadas y tiempos de carga medidos con Core Web Vitals antes de publicar.',
        },
        {
          title: 'SEO técnico de base',
          desc: 'Metadatos, datos estructurados, sitemap, canonical y URLs limpias configurados desde el primer día.',
        },
        {
          title: 'Cumplimiento legal',
          desc: 'Aviso legal, política de privacidad y cookies conformes con la LSSI-CE y el RGPD.',
        },
        {
          title: 'Formación y entrega',
          desc: 'Te entregamos el proyecto documentado y explicado. La web es tuya, sin dependencia obligatoria.',
        },
      ],
    },
    includes: {
      title: 'Para quién funciona bien',
      items: [
        'Empresas que quieren sustituir una web antigua que ya no representa al negocio',
        'Pymes que reciben visitas pero no consiguen contactos cualificados',
        'Negocios B2B con un ciclo de venta que empieza en una búsqueda en Google',
        'Empresas con varias líneas de servicio que necesitan una estructura clara',
      ],
    },
    process: {
      title: 'Cómo trabajamos',
      steps: [
        'Sesión inicial: objetivos, público, competencia y qué debe conseguir la web.',
        'Propuesta cerrada: alcance, calendario y precio, por escrito.',
        'Arquitectura y contenidos: estructura de páginas y textos revisados contigo.',
        'Diseño y desarrollo: iteraciones sobre entregas reales, no sobre maquetas estáticas.',
        'Publicación: rendimiento, accesibilidad y SEO técnico verificados antes de salir.',
        'Seguimiento: soporte posterior y opción de mantenimiento continuo.',
      ],
    },
    faq: {
      title: 'Preguntas frecuentes sobre diseño web para empresas',
      items: [
        {
          q: '¿Cuánto cuesta el diseño web para una empresa?',
          a: 'Depende del número de páginas, de si hay que redactar los contenidos y de las integraciones necesarias. Trabajamos siempre con presupuesto cerrado: recibes el precio final antes de empezar, sin partidas abiertas.',
        },
        {
          q: '¿Cuánto tarda el proyecto?',
          a: 'Una web corporativa de entre cinco y diez páginas suele estar publicada en tres a seis semanas, contando las revisiones de contenido por tu parte, que es lo que más suele alargar los plazos.',
        },
        {
          q: '¿La web es mía o dependo de vosotros?',
          a: 'Es tuya. Te entregamos el código, los accesos y la documentación. Puedes contratar mantenimiento con nosotros o llevarla por tu cuenta.',
        },
        {
          q: '¿Usáis WordPress o desarrollo a medida?',
          a: 'Elegimos la tecnología según el proyecto. Si necesitas publicar contenido a diario, un gestor tiene sentido; si la web es estable, un desarrollo a medida es más rápido, más seguro y más barato de mantener.',
        },
        {
          q: '¿Incluye posicionamiento en Google?',
          a: 'Incluye la base técnica del SEO: estructura, metadatos, datos estructurados, rendimiento e indexación. El posicionamiento por palabras clave competidas requiere un trabajo continuo de contenidos que se presupuesta aparte.',
        },
      ],
    },
    cta: {
      title: 'Cuéntanos qué necesita tu empresa',
      lead: 'Escríbenos con una descripción del proyecto y te respondemos con un enfoque y un rango de presupuesto.',
    },
    related: ['/mantenimiento-web/', '/desarrollo-web-a-medida/', '/diseno-web-para-autonomos/'],
  },

  {
    path: '/diseno-web-para-autonomos/',
    keyword: 'diseño web para autónomos',
    secondary: ['página web para autónomos', 'web para freelance', 'página web profesional autónomo'],
    breadcrumb: 'Diseño web para autónomos',
    serviceName: 'Diseño web para autónomos',
    meta: {
      title: 'Diseño web para autónomos: página profesional | Archic',
      description:
        'Páginas web para autónomos y profesionales independientes: rápidas, claras y pensadas para que te encuentren y te contacten. Precio cerrado y sin permanencia.',
    },
    hero: {
      eyebrow: 'Diseño web para autónomos',
      h1: 'Diseño web para autónomos que quieren que les encuentren y les llamen',
      lead: 'Una página web profesional, sin plantillas recicladas ni cuotas eternas. Explica bien lo que haces, carga rápido en el móvil y facilita que un cliente potencial dé el paso de contactar.',
      note: 'Proyecto cerrado. La web es tuya desde el primer día.',
    },
    intro: {
      title: 'El problema de la mayoría de webs de autónomos',
      body: [
        'Un autónomo no necesita veinte páginas. Necesita una web que responda en treinta segundos a tres preguntas: qué haces, para quién y cómo te contacto. Casi ninguna lo consigue, porque se copian estructuras pensadas para empresas grandes.',
        'Trabajamos al revés: partimos de tu servicio y de cómo te busca la gente, y construimos solo lo necesario. Menos páginas, mejor escritas y más rápidas.',
      ],
    },
    blocks: {
      eyebrow: 'Alcance',
      title: 'Qué incluye una web para autónomos',
      lead: 'Todo lo necesario para tener presencia profesional, sin partidas que no vas a usar.',
      items: [
        {
          title: 'Página de servicios clara',
          desc: 'Tu propuesta explicada en el lenguaje que usan tus clientes, no en jerga del sector.',
        },
        {
          title: 'Contacto sin fricción',
          desc: 'Formulario, correo y teléfono accesibles desde cualquier punto de la web y desde el móvil.',
        },
        {
          title: 'Optimización móvil real',
          desc: 'La mayoría de tus visitas llegan desde el móvil. Se diseña primero ahí y se comprueba en dispositivos reales.',
        },
        {
          title: 'Base para búsquedas locales',
          desc: 'Estructura, datos estructurados y textos preparados para consultas del tipo "servicio + ciudad".',
        },
        {
          title: 'Textos legales incluidos',
          desc: 'Aviso legal, privacidad y cookies conformes a la normativa española, ya redactados.',
        },
        {
          title: 'Sin permanencia',
          desc: 'Pagas el proyecto, no una cuota indefinida. El mantenimiento es opcional y se contrata aparte.',
        },
      ],
    },
    includes: {
      title: 'Para quién funciona bien',
      items: [
        'Profesionales que dependen del boca a boca y quieren una referencia sólida en internet',
        'Autónomos que solo tienen redes sociales y necesitan un sitio propio',
        'Consultores, técnicos y servicios locales que reciben búsquedas por ciudad',
        'Quien tiene una web hecha con un editor gratuito que carga lento y no convierte',
      ],
    },
    process: {
      title: 'Cómo trabajamos',
      steps: [
        'Conversación inicial sobre tu servicio, tus clientes y tu competencia directa.',
        'Propuesta cerrada con alcance, plazo y precio final.',
        'Redacción de la estructura y los textos, revisados contigo.',
        'Diseño y desarrollo con entregas visibles durante el proceso.',
        'Publicación con dominio, correo profesional y verificación en Google Search Console.',
      ],
    },
    faq: {
      title: 'Preguntas frecuentes sobre webs para autónomos',
      items: [
        {
          q: '¿Merece la pena una web si ya tengo Instagram o Google Business?',
          a: 'Sí. Las redes sociales dependen de una plataforma que puede cambiar sus reglas y no aparecen igual en las búsquedas. Una web propia es el único activo digital que controlas tú.',
        },
        {
          q: '¿Cuánto cuesta una página web para un autónomo?',
          a: 'Depende del número de páginas y de si hay que redactar los contenidos desde cero. Damos siempre precio cerrado antes de empezar, para que no haya sorpresas.',
        },
        {
          q: '¿Tengo que pagar una cuota mensual?',
          a: 'No es obligatoria. Solo pagas dominio y alojamiento, que suelen ser importes bajos. El mantenimiento es un servicio opcional.',
        },
        {
          q: '¿Puedo actualizar la web yo mismo?',
          a: 'Sí, si lo pides desde el principio configuramos un gestor sencillo para que edites textos e imágenes sin tocar código.',
        },
        {
          q: '¿Cuánto tarda?',
          a: 'Una web de tres a cinco páginas suele estar lista en dos o tres semanas si los contenidos se revisan con agilidad.',
        },
      ],
    },
    cta: {
      title: 'Cuéntanos a qué te dedicas',
      lead: 'Con una descripción breve de tu actividad podemos proponerte estructura y presupuesto.',
    },
    related: ['/diseno-web-para-empresas/', '/mantenimiento-web/'],
  },

  {
    path: '/mantenimiento-web/',
    keyword: 'mantenimiento web',
    secondary: ['mantenimiento de páginas web', 'mantenimiento web para empresas', 'soporte web'],
    breadcrumb: 'Mantenimiento web',
    serviceName: 'Mantenimiento web',
    meta: {
      title: 'Mantenimiento web para empresas y autónomos | Archic',
      description:
        'Mantenimiento web continuo: actualizaciones, copias de seguridad, seguridad, rendimiento y cambios de contenido. Sin permanencia y con informe de lo realizado.',
    },
    hero: {
      eyebrow: 'Mantenimiento web',
      h1: 'Mantenimiento web para que tu página no se caiga ni se quede atrás',
      lead: 'Actualizaciones, copias de seguridad, seguridad, vigilancia del rendimiento y cambios de contenido. Una web sin mantenimiento se degrada: pierde velocidad, acumula vulnerabilidades y deja de posicionar.',
      note: 'Sin permanencia. Informe periódico de lo realizado.',
    },
    intro: {
      title: 'Qué pasa cuando una web no se mantiene',
      body: [
        'Los fallos rara vez llegan de golpe. Un plugin desactualizado abre una vulnerabilidad, una imagen sin optimizar dobla el tiempo de carga, un certificado caduca y el navegador marca el sitio como no seguro. Cuando alguien lo detecta, normalmente ya ha costado visitas y contactos.',
        'El mantenimiento consiste en evitar eso de forma sistemática: revisión periódica, actualizaciones controladas, copias verificadas y capacidad de restaurar el sitio rápido si algo falla.',
      ],
    },
    blocks: {
      eyebrow: 'Alcance',
      title: 'Qué incluye el mantenimiento',
      lead: 'Trabajo preventivo, no solo reacción cuando algo se rompe.',
      items: [
        {
          title: 'Actualizaciones controladas',
          desc: 'Núcleo, dependencias y plugins actualizados tras comprobar que no rompen nada en un entorno de pruebas.',
        },
        {
          title: 'Copias de seguridad verificadas',
          desc: 'Copias periódicas y, lo más importante, comprobación de que se pueden restaurar de verdad.',
        },
        {
          title: 'Seguridad',
          desc: 'Vigilancia de vulnerabilidades conocidas, certificados SSL, permisos y accesos.',
        },
        {
          title: 'Rendimiento',
          desc: 'Seguimiento de Core Web Vitals y corrección de lo que degrada la velocidad con el tiempo.',
        },
        {
          title: 'Cambios de contenido',
          desc: 'Bolsa de horas mensual para textos, imágenes, precios, nuevas secciones o cambios puntuales.',
        },
        {
          title: 'Informe y disponibilidad',
          desc: 'Monitorización de caídas e informe periódico con lo hecho y lo recomendado.',
        },
      ],
    },
    includes: {
      title: 'Para quién funciona bien',
      items: [
        'Empresas sin perfil técnico interno que necesitan un responsable claro de la web',
        'Webs con formularios, reservas o pagos donde una caída se traduce en pérdida directa',
        'Proyectos heredados de otro proveedor que llevan meses sin actualizar',
        'Negocios que cambian precios, catálogo o contenidos con frecuencia',
      ],
    },
    process: {
      title: 'Cómo empezamos',
      steps: [
        'Auditoría inicial: estado, versiones, vulnerabilidades, rendimiento y copias existentes.',
        'Plan de corrección de lo urgente antes de entrar en la rutina de mantenimiento.',
        'Calendario mensual de revisiones y actualizaciones.',
        'Canal directo para incidencias y peticiones de cambio.',
        'Informe periódico con lo realizado y las recomendaciones siguientes.',
      ],
    },
    faq: {
      title: 'Preguntas frecuentes sobre mantenimiento web',
      items: [
        {
          q: '¿Mantenéis webs que no habéis desarrollado vosotros?',
          a: 'Sí. Empezamos con una auditoría para conocer el estado real del sitio y detectar lo que hay que corregir antes de entrar en la rutina de mantenimiento.',
        },
        {
          q: '¿Qué incluye exactamente la cuota mensual?',
          a: 'Actualizaciones, copias verificadas, seguridad, seguimiento de rendimiento, monitorización de caídas y una bolsa de horas para cambios de contenido. El tamaño de esa bolsa se ajusta a tu volumen real de cambios.',
        },
        {
          q: '¿Hay permanencia?',
          a: 'No. El servicio es mensual y se puede cancelar. Si te vas, te entregamos accesos, copias y documentación.',
        },
        {
          q: '¿Qué pasa si la web se cae fuera de horario?',
          a: 'La monitorización avisa automáticamente. El tiempo de respuesta comprometido se define en el acuerdo según la criticidad del sitio.',
        },
        {
          q: '¿El mantenimiento mejora el posicionamiento?',
          a: 'Indirectamente. Velocidad, disponibilidad y ausencia de errores técnicos son factores que Google valora, pero el posicionamiento por palabras clave competidas requiere además trabajo de contenidos.',
        },
      ],
    },
    cta: {
      title: 'Solicita una auditoría de tu web',
      lead: 'Envíanos la dirección de tu web y te decimos en qué estado está y qué requiere atención.',
    },
    related: ['/diseno-web-para-empresas/', '/desarrollo-web-a-medida/'],
  },

  {
    path: '/desarrollo-web-a-medida/',
    keyword: 'desarrollo web a medida',
    secondary: ['software a medida', 'aplicaciones web a medida', 'automatización de procesos'],
    breadcrumb: 'Desarrollo web a medida',
    serviceName: 'Desarrollo web y software a medida',
    meta: {
      title: 'Desarrollo web y software a medida para empresas | Archic',
      description:
        'Desarrollo web a medida, aplicaciones internas, integraciones y automatización de procesos. Software adaptado a cómo trabaja tu empresa, no al revés.',
    },
    hero: {
      eyebrow: 'Desarrollo a medida',
      h1: 'Desarrollo web y software a medida para procesos que ninguna herramienta estándar resuelve',
      lead: 'Aplicaciones internas, portales de cliente, integraciones entre sistemas y automatización de tareas repetitivas. Se construye alrededor de tu proceso real, no de las limitaciones de un producto genérico.',
      note: 'Alcance por fases y entregas funcionales desde las primeras semanas.',
    },
    intro: {
      title: 'Cuándo tiene sentido desarrollar a medida',
      body: [
        'Una herramienta de mercado casi siempre es la opción correcta. El desarrollo a medida se justifica cuando el proceso es el que diferencia al negocio, cuando la empresa paga licencias por funciones que no usa, o cuando el equipo dedica horas cada semana a copiar datos entre sistemas.',
        'Antes de escribir código, delimitamos el proceso y calculamos qué ahorra realmente automatizarlo. Si el retorno no está claro, lo decimos y proponemos una alternativa más barata.',
      ],
    },
    blocks: {
      eyebrow: 'Alcance',
      title: 'Qué construimos',
      lead: 'Software que se usa a diario, no demostraciones.',
      items: [
        {
          title: 'Aplicaciones internas',
          desc: 'Paneles de gestión, seguimiento de operaciones y herramientas para el equipo, con control de accesos por rol.',
        },
        {
          title: 'Portales de cliente',
          desc: 'Áreas privadas donde tus clientes consultan estado, documentación o histórico sin llamar por teléfono.',
        },
        {
          title: 'Integraciones',
          desc: 'Conexión entre facturación, CRM, hojas de cálculo y herramientas ya en uso, para eliminar la doble introducción de datos.',
        },
        {
          title: 'Automatización de procesos',
          desc: 'Tareas repetitivas convertidas en flujos automáticos: informes, avisos, sincronizaciones y validaciones.',
        },
        {
          title: 'Migraciones',
          desc: 'Traslado de datos y funcionalidad desde sistemas antiguos, con verificación de integridad.',
        },
        {
          title: 'Mantenimiento evolutivo',
          desc: 'El software no se entrega y se abandona: se ajusta según el uso real y las necesidades que aparecen.',
        },
      ],
    },
    includes: {
      title: 'Señales de que lo necesitas',
      items: [
        'El equipo mantiene hojas de cálculo compartidas como si fueran una base de datos',
        'Los mismos datos se introducen a mano en dos o tres sistemas distintos',
        'Pagas licencias caras por una función concreta que usa una sola persona',
        'Un proceso clave depende de que alguien recuerde hacerlo a tiempo',
      ],
    },
    process: {
      title: 'Cómo trabajamos',
      steps: [
        'Análisis del proceso actual con las personas que lo ejecutan cada día.',
        'Definición de alcance mínimo viable y estimación por fases.',
        'Primera entrega funcional en semanas, no en meses.',
        'Iteración con uso real: se ajusta lo que estorba antes de seguir ampliando.',
        'Documentación, formación y traspaso.',
      ],
    },
    faq: {
      title: 'Preguntas frecuentes sobre desarrollo a medida',
      items: [
        {
          q: '¿Cuánto cuesta un software a medida?',
          a: 'Depende del alcance. Trabajamos por fases: la primera se presupuesta cerrada y entrega algo utilizable, de modo que puedes decidir si continuar con datos reales en la mano.',
        },
        {
          q: '¿No es más barato usar una herramienta existente?',
          a: 'Normalmente sí, y lo recomendamos cuando encaja. El desarrollo a medida solo compensa si el proceso es diferencial o si el coste de licencias y horas manuales supera al del desarrollo.',
        },
        {
          q: '¿De quién es el código?',
          a: 'Tuyo. Se entrega en tu repositorio, con documentación, para que cualquier equipo técnico pueda continuar el trabajo.',
        },
        {
          q: '¿Se puede integrar con lo que ya usamos?',
          a: 'Sí, siempre que el sistema existente ofrezca API o exportación de datos. Lo verificamos en la fase de análisis, antes de comprometer plazos.',
        },
        {
          q: '¿Qué pasa con los datos personales?',
          a: 'El tratamiento se diseña conforme al RGPD: minimización, control de accesos, registro de actividad y acuerdo de encargado de tratamiento cuando corresponde.',
        },
      ],
    },
    cta: {
      title: 'Describe el proceso que quieres resolver',
      lead: 'Con una explicación del flujo actual podemos decirte si compensa automatizarlo y con qué alcance.',
    },
    related: ['/diseno-web-para-empresas/', '/mantenimiento-web/'],
  },
]

export const SERVICE_PAGE_BY_PATH: Record<string, ServicePage> = Object.fromEntries(
  SERVICE_PAGES.map((page) => [page.path, page]),
)

export function findServicePage(path: string): ServicePage | undefined {
  const normalised = path.endsWith('/') ? path : `${path}/`
  return SERVICE_PAGE_BY_PATH[normalised]
}
