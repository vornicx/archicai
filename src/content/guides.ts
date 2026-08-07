/**
 * Guías: el contenido informativo del sitio.
 *
 * Las landings responden a intención comercial («diseño web sevilla»), y esas
 * páginas compiten con agencias que llevan años acumulando enlaces. Las guías
 * atacan la otra mitad de la búsqueda —la informativa, la que alguien hace
 * *antes* de pedir presupuesto— donde una página bien escrita todavía puede
 * ganar sin autoridad de dominio previa.
 *
 * Además son el material que mejor citan los asistentes de IA: texto largo,
 * estructurado, con una respuesta directa al principio de cada sección.
 *
 * Regla al escribir aquí: no publicar cifras que Archic no pueda sostener. Es
 * preferible explicar bien qué determina un precio que inventarse un rango.
 */

export type GuideBlock =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'steps'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'callout'; title: string; text: string }

export type GuideSection = { id: string; heading: string; blocks: GuideBlock[] }

export type Guide = {
  slug: string
  /** Ruta servida, con barra final. */
  path: string
  /** H1 de la página. */
  title: string
  /** `<title>` — puede diferir del H1 para caber en el resultado de Google. */
  metaTitle: string
  description: string
  /**
   * Respuesta completa en un párrafo, colocada justo bajo el H1. Es lo que
   * Google puede tomar como fragmento destacado y lo que un asistente puede
   * citar sin leer el resto. Debe sostenerse fuera de contexto.
   */
  answer: string
  published: string
  updated: string
  readingMinutes: number
  keyword: string
  secondary: string[]
  sections: GuideSection[]
  faq: { q: string; a: string }[]
  /** Enlaces internos al final: guías hermanas y landings comerciales. */
  related: { href: string; label: string }[]
}

export const GUIDES_INDEX_PATH = '/guias/'

export const GUIDES: Guide[] = [
  /* ───────────────────────────────────────────────────────────────────────
     1 · Comparativa. Es la duda que aparece antes de cualquier presupuesto.
     ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'web-a-medida-o-wordpress',
    path: '/guias/web-a-medida-o-wordpress/',
    title: 'Web a medida, WordPress o un constructor: cómo elegir sin arrepentirse',
    metaTitle: 'Web a medida vs WordPress vs Wix: cuál elegir | Guía 2026',
    description:
      'Comparativa honesta entre web a medida, WordPress y constructores como Wix o Squarespace: coste real, rendimiento, mantenimiento y qué pasa cuando quieres cambiar de proveedor.',
    answer:
      'Un constructor como Wix o Squarespace es la opción sensata si necesitas una web de presentación de pocas páginas, la vas a mantener tú y aceptas pagar una cuota indefinida a cambio de no tocar nada técnico. WordPress compensa cuando el contenido crece mucho —un blog activo, cientos de fichas— y hay alguien que se ocupe de actualizar plugins. Una web a medida sale a cuenta cuando el rendimiento importa, cuando hay que integrar sistemas que ya usas, o cuando no quieres que tu negocio dependa de la política de precios de una plataforma. La pregunta útil no es cuál es mejor, sino cuánto cuesta salir de cada una dentro de tres años.',
    published: '2026-08-07',
    updated: '2026-08-07',
    readingMinutes: 8,
    keyword: 'web a medida o wordpress',
    secondary: ['wordpress o wix', 'diferencia web a medida y plantilla', 'mejor plataforma para web de empresa'],
    sections: [
      {
        id: 'tres-caminos',
        heading: 'Los tres caminos, sin marketing',
        blocks: [
          {
            kind: 'p',
            text: 'Casi todas las webs de empresa en España se construyen de una de estas tres formas. Ninguna es mala en abstracto: cada una resuelve bien un problema distinto y resuelve fatal los otros dos.',
          },
          {
            kind: 'table',
            head: ['', 'Constructor (Wix, Squarespace…)', 'WordPress', 'A medida'],
            rows: [
              ['Puesta en marcha', 'Días', 'Semanas', 'Semanas'],
              ['Coste inicial', 'Bajo', 'Medio', 'Alto'],
              ['Coste recurrente', 'Cuota mensual indefinida', 'Alojamiento + plugins + mantenimiento', 'Alojamiento + mantenimiento opcional'],
              ['Rendimiento', 'Limitado por la plataforma', 'Depende de plugins y plantilla', 'Controlado por completo'],
              ['Cambiar de proveedor', 'Prácticamente rehacer', 'Posible, con trabajo', 'Se entrega el código'],
              ['Integrar con tus sistemas', 'Muy limitado', 'Posible con desarrollo', 'Sin límite práctico'],
            ],
          },
          {
            kind: 'p',
            text: 'La fila que casi nadie mira al decidir es la penúltima. Una web se elige pensando en el lanzamiento y se sufre durante los años siguientes.',
          },
        ],
      },
      {
        id: 'constructor',
        heading: 'Cuándo un constructor es la decisión correcta',
        blocks: [
          {
            kind: 'p',
            text: 'Si tu web va a ser una tarjeta de presentación de cinco páginas, la vas a actualizar tú mismo un par de veces al año y no necesitas que hable con ningún otro sistema, un constructor te va a dar el 90 % del resultado por una fracción del esfuerzo. Decir lo contrario para vender un proyecto más caro sería deshonesto.',
          },
          {
            kind: 'p',
            text: 'Lo que conviene entender antes de firmar es el modelo: pagas una cuota mientras quieras que la web exista. No compras nada. Si un día subes de plan porque necesitas una función, ya no bajas. Y el contenido vive en un formato propietario, así que migrar significa copiar y pegar a mano.',
          },
          {
            kind: 'list',
            items: [
              'Te encaja si: pocas páginas, contenido estable, sin integraciones, sin ambición de posicionamiento agresivo.',
              'Te va a doler si: necesitas velocidad de carga real, tienes un catálogo grande, o quieres conectar la web con tu ERP, tu TPV o tus hojas de cálculo.',
            ],
          },
        ],
      },
      {
        id: 'wordpress',
        heading: 'Cuándo WordPress sigue teniendo sentido',
        blocks: [
          {
            kind: 'p',
            text: 'WordPress mueve una parte enorme de la web y no es casualidad: para publicar contenido de forma continua —un blog con varias entradas al mes, una revista, un catálogo que cambia— su editor y su ecosistema son difíciles de superar. Si tu estrategia pasa por escribir mucho, es una elección razonable.',
          },
          {
            kind: 'p',
            text: 'El precio a pagar es el mantenimiento. Una instalación típica acumula entre diez y treinta plugins, cada uno con su propio ciclo de actualizaciones y su propia superficie de ataque. Una web de WordPress sin actualizar no es una web anticuada: es una web que acabará comprometida. La mayoría de los proyectos que nos llegan «rotos» son instalaciones que nadie ha tocado en dos años.',
          },
          {
            kind: 'callout',
            title: 'El coste que no aparece en el presupuesto',
            text: 'Al comparar una web de WordPress con una a medida, suma al presupuesto inicial el mantenimiento de tres años y las licencias anuales de los plugins de pago. Es la única comparación que refleja lo que vas a gastar de verdad.',
          },
        ],
      },
      {
        id: 'a-medida',
        heading: 'Cuándo compensa hacerla a medida',
        blocks: [
          {
            kind: 'p',
            text: 'Una web a medida no es «lo mismo pero más caro». Es una web que solo contiene el código que tu proyecto necesita. Eso se nota en tres sitios concretos: la velocidad de carga, la factura de mantenimiento y la libertad para cambiar de proveedor.',
          },
          {
            kind: 'list',
            items: [
              'Rendimiento: sin plugins ni plantillas genéricas, las páginas cargan con una fracción del código. Google mide esto con las Core Web Vitals y lo usa como factor de posicionamiento.',
              'Integración: si necesitas que la web lea stock de tu ERP, genere presupuestos o alimente un panel interno, el desarrollo a medida es el camino corto.',
              'Propiedad: el código se entrega. No hay una cuota que te bloquee ni una plataforma que decida por ti.',
              'Longevidad: sin dependencias de terceros que caducan, una web bien construida aguanta años sin reescribirse.',
            ],
          },
          {
            kind: 'p',
            text: 'La contrapartida honesta: cuesta más al principio y necesitas a alguien que la mantenga si quieres cambios frecuentes. Si tu web va a ser una página estática que nadie va a tocar, este camino es sobredimensionado.',
          },
        ],
      },
      {
        id: 'decidir',
        heading: 'Cuatro preguntas que resuelven la decisión',
        blocks: [
          {
            kind: 'steps',
            items: [
              '¿Cuántas veces al mes va a cambiar el contenido? Si la respuesta es «muchas y las hago yo», necesitas un gestor de contenidos, sea WordPress o uno a medida.',
              '¿La web tiene que hablar con algún sistema que ya usas? Si sí, descarta los constructores.',
              '¿Cuánto te costaría estar tres días sin web? Si la respuesta es «mucho», el mantenimiento deja de ser opcional en cualquiera de las tres opciones.',
              '¿Qué pasa si dentro de dos años quieres cambiar de proveedor? Pide por escrito quién es el dueño del código, del dominio y de los contenidos. Antes de firmar.',
            ],
          },
          {
            kind: 'p',
            text: 'Si al responderlas te sale un constructor, úsalo sin complejo. Nosotros lo decimos cuando toca: montar un proyecto a medida para una web que no lo necesita es tirar el dinero del cliente.',
          },
        ],
      },
    ],
    faq: [
      {
        q: '¿Una web a medida posiciona mejor en Google que WordPress?',
        a: 'No por ser a medida, sino por lo que permite. Google no puntúa la tecnología: puntúa la velocidad de carga, la estructura del contenido y la experiencia en móvil. Una web a medida bien hecha parte con ventaja en velocidad porque no carga código que no usa, pero un WordPress cuidado puede superar a una web a medida mal construida. La tecnología abre el techo; el trabajo de contenidos decide dónde acabas.',
      },
      {
        q: '¿Puedo migrar mi web de Wix a una web a medida?',
        a: 'Sí, pero el contenido hay que rescatarlo a mano o con un rastreo, porque estas plataformas no ofrecen una exportación completa y reutilizable. Lo que sí se conserva sin problema es el dominio y, si se hacen bien las redirecciones 301, también el posicionamiento acumulado. Planificar esas redirecciones antes de apagar la web antigua es lo que evita perder tráfico en la mudanza.',
      },
      {
        q: '¿Qué pasa con mi web a medida si el que la programó desaparece?',
        a: 'Depende de una sola cosa: si tienes el código y la documentación. Con el repositorio en tu poder, cualquier desarrollador competente puede continuar el trabajo. Sin él, da igual la tecnología que sea. Por eso conviene exigir el acceso al repositorio desde el primer día, no al final del proyecto.',
      },
    ],
    related: [
      { href: '/guias/precio-pagina-web-empresa/', label: 'Qué determina el precio de una página web' },
      { href: '/diseno-web-para-empresas/', label: 'Diseño web para empresas' },
      { href: '/desarrollo-web-a-medida/', label: 'Desarrollo web a medida' },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     2 · Precio. Sin cifras inventadas: se explica qué mueve el presupuesto.
     ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'precio-pagina-web-empresa',
    path: '/guias/precio-pagina-web-empresa/',
    title: 'Qué determina el precio de una página web para empresa',
    metaTitle: 'Precio de una página web para empresa: qué lo determina | Archic',
    description:
      'Por qué dos presupuestos de página web pueden diferir en un orden de magnitud, qué partidas debe incluir uno serio y las señales de alarma al comparar ofertas.',
    answer:
      'El precio de una página web lo determinan cinco variables: cuánto contenido hay que producir, cuántas plantillas distintas necesita el diseño, qué funciones van más allá de mostrar información, con qué sistemas tiene que integrarse y quién se ocupa de ella después de publicarla. Dos presupuestos para «una web corporativa» pueden diferir en un orden de magnitud sin que ninguno de los dos sea abusivo: casi siempre están describiendo trabajos distintos. Antes de comparar cifras, hay que conseguir que ambos describan el mismo alcance.',
    published: '2026-08-07',
    updated: '2026-08-07',
    readingMinutes: 7,
    keyword: 'precio página web empresa',
    secondary: ['cuánto cuesta una web profesional', 'presupuesto página web', 'qué incluye un presupuesto web'],
    sections: [
      {
        id: 'variables',
        heading: 'Las cinco variables que mueven el presupuesto',
        blocks: [
          {
            kind: 'p',
            text: 'Cuando alguien pide «una web corporativa» está describiendo un resultado, no un trabajo. Estas son las cinco preguntas cuyas respuestas explican casi toda la diferencia entre un presupuesto y otro.',
          },
          {
            kind: 'list',
            items: [
              'Contenido: ¿existen ya los textos y las fotos, o hay que escribirlos y producirlas? Redactar el contenido de una web es, en muchos proyectos, la partida más grande y la que más se olvida.',
              'Plantillas: no cuentan las páginas, cuentan los diseños distintos. Cuarenta fichas de producto con el mismo diseño son una plantilla; una portada, un blog y una ficha son tres.',
              'Funcionalidad: mostrar información es barato. Cobrar, reservar, calcular, permitir acceso privado o generar documentos, no.',
              'Integraciones: conectar con un ERP, un TPV, un CRM o una hoja de cálculo compartida convierte un proyecto de web en un proyecto de software.',
              'Continuidad: ¿quién actualiza, quién hace copias, quién responde si algo cae un viernes por la tarde? Si no está presupuestado, no está previsto.',
            ],
          },
        ],
      },
      {
        id: 'que-incluye',
        heading: 'Qué debe aparecer, partida a partida',
        blocks: [
          {
            kind: 'p',
            text: 'Un presupuesto que sea una sola línea con un importe no es un presupuesto: es una cifra. Estas son las partidas que deberían estar desglosadas, aunque alguna vaya a cero.',
          },
          {
            kind: 'table',
            head: ['Partida', 'Qué cubre', 'Pregunta a hacer'],
            rows: [
              ['Estrategia y arquitectura', 'Qué secciones hay, qué mensaje lleva cada una, a quién se dirige', '¿Se hace antes de diseñar o se improvisa sobre la marcha?'],
              ['Contenidos', 'Redacción, revisión, fotografía', '¿Los aporto yo o entran en el precio?'],
              ['Diseño', 'Interfaz de cada plantilla, en móvil y escritorio', '¿Cuántas plantillas distintas incluye?'],
              ['Desarrollo', 'Programación, formularios, accesibilidad, rendimiento', '¿Se mide con Core Web Vitals antes de publicar?'],
              ['SEO técnico', 'Metadatos, datos estructurados, sitemap, indexación', '¿Se entrega la web dada de alta en Search Console?'],
              ['Legal', 'Aviso legal, privacidad, cookies, formularios conformes al RGPD', '¿Se redactan o se copian de otra web?'],
              ['Puesta en producción', 'Dominio, alojamiento, certificado, redirecciones', '¿A nombre de quién queda el dominio?'],
              ['Formación y entrega', 'Cómo actualizarla, dónde está el código', '¿Recibo el repositorio y la documentación?'],
              ['Mantenimiento', 'Actualizaciones, copias, monitorización, soporte', '¿Es opcional? ¿Tiene permanencia?'],
            ],
          },
        ],
      },
      {
        id: 'señales',
        heading: 'Señales de alarma al comparar ofertas',
        blocks: [
          {
            kind: 'list',
            items: [
              'El dominio se registra a nombre del proveedor. Es la forma más habitual de quedar atrapado; el dominio debe estar siempre a tu nombre.',
              '«Web gratis» a cambio de una cuota mensual con permanencia. Al final del contrato no eres dueño de nada y la web se apaga.',
              'No aparece la palabra «contenidos» por ningún lado. Va a aparecer, en forma de retraso, cuando toque escribirlos.',
              'Precio cerrado sin haber preguntado nada sobre tu negocio. Nadie puede presupuestar bien lo que no ha entendido.',
              '«SEO garantizado» o «primera posición en Google». Nadie controla el algoritmo de Google. Lo que sí se puede garantizar es el trabajo: la base técnica, el contenido y el alta en Search Console.',
              'Ninguna mención al mantenimiento. Una web es una cosa viva; entregarla y desaparecer es la fuente número uno de webs rotas.',
            ],
          },
        ],
      },
      {
        id: 'ahorrar',
        heading: 'Dónde se puede ahorrar de verdad (y dónde no)',
        blocks: [
          {
            kind: 'p',
            text: 'Se puede recortar alcance sin recortar calidad, y es la única forma sana de ajustar un presupuesto: publicar menos secciones, aplazar la versión en inglés, empezar sin zona privada. Todo eso se puede añadir después sin rehacer nada, si la base está bien construida.',
          },
          {
            kind: 'p',
            text: 'Lo que sale caro es ahorrar en la base: en la estructura del contenido, en el rendimiento y en el trabajo técnico de indexación. Son las tres cosas que no se pueden «añadir luego» sin volver a empezar, y son precisamente las que no se ven en una captura de pantalla.',
          },
          {
            kind: 'callout',
            title: 'Cómo pedir un presupuesto comparable',
            text: 'Escribe media página describiendo qué vendes, a quién, qué quieres que haga alguien que llegue desde Google y qué sistemas usas internamente. Envía exactamente ese mismo texto a todos los proveedores. Es la única forma de que los números que te devuelvan signifiquen lo mismo.',
          },
        ],
      },
    ],
    faq: [
      {
        q: '¿Por qué un presupuesto de web puede costar diez veces más que otro?',
        a: 'Porque casi nunca describen el mismo trabajo. El barato suele ser una plantilla adaptada con contenidos aportados por el cliente; el caro suele incluir estrategia de contenidos, redacción, diseño propio, desarrollo a medida y puesta en producción. Ninguno de los dos engaña necesariamente: describen servicios distintos con el mismo nombre. La comparación solo tiene sentido si primero igualas el alcance.',
      },
      {
        q: '¿Es mejor pagar una cuota mensual o un proyecto cerrado?',
        a: 'Un proyecto cerrado, con mantenimiento aparte y sin permanencia, es el modelo que deja al cliente con más control: pagas una vez por construirlo y decides cada año si quieres seguir manteniéndolo con el mismo proveedor. Las cuotas «todo incluido» con permanencia suelen salir más caras a tres años y dejan al cliente sin propiedad sobre el resultado.',
      },
      {
        q: '¿Cuánto cuesta mantener una web al año?',
        a: 'Depende de la tecnología y de la frecuencia de cambios: una web estática a medida necesita muy poco más que el alojamiento y revisiones periódicas, mientras que una instalación con muchos plugins exige actualizaciones constantes. Al pedir presupuesto, conviene preguntar qué incluye exactamente el mantenimiento —copias, actualizaciones, monitorización, horas de cambios— y qué se factura aparte.',
      },
    ],
    related: [
      { href: '/guias/web-a-medida-o-wordpress/', label: 'Web a medida, WordPress o constructor' },
      { href: '/diseno-web-para-empresas/', label: 'Diseño web para empresas' },
      { href: '/mantenimiento-web/', label: 'Mantenimiento web' },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     3 · Software interno. Es donde Archic se diferencia de una agencia web.
     ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'digitalizar-procesos-excel',
    path: '/guias/digitalizar-procesos-excel/',
    title: 'Cómo pasar de Excel a una herramienta interna sin parar la empresa',
    metaTitle: 'De Excel a software a medida: cómo digitalizar un proceso | Archic',
    description:
      'Cuándo una hoja de cálculo deja de ser suficiente, cómo elegir el primer proceso a digitalizar y cómo hacer la transición sin detener la operativa diaria.',
    answer:
      'Una hoja de cálculo deja de ser suficiente cuando varias personas la editan a la vez, cuando existen copias con nombres como «definitivo_v3», cuando un error de una celda tarda días en detectarse, o cuando alguien dedica horas cada semana a copiar datos de un sitio a otro. El camino sensato no es sustituir todos los Excel de golpe: es elegir el proceso que más tiempo consume, construir una herramienta que haga exactamente eso, ponerla en marcha en paralelo a la hoja durante unas semanas y solo entonces retirar la hoja.',
    published: '2026-08-07',
    updated: '2026-08-07',
    readingMinutes: 9,
    keyword: 'digitalizar procesos excel',
    secondary: ['software a medida para empresas', 'sustituir excel por aplicación', 'herramienta interna empresa'],
    sections: [
      {
        id: 'cuando',
        heading: 'Las señales de que la hoja se ha quedado corta',
        blocks: [
          {
            kind: 'p',
            text: 'Excel es una herramienta excelente y buena parte de las empresas funcionan perfectamente con ella. El problema no aparece por usarla, sino por seguir usándola cuando el proceso ha crecido por encima de lo que una hoja puede sostener. Estas son las señales, por orden de gravedad:',
          },
          {
            kind: 'list',
            items: [
              'Hay varias versiones del mismo fichero y nadie sabe con seguridad cuál es la buena.',
              'Alguien tiene que consolidar a mano lo que otros han rellenado por separado.',
              'Un error tipográfico en una celda puede propagarse durante días sin que nadie lo note.',
              'El proceso depende de una persona concreta: si falta, se para.',
              'Se dedican horas cada semana a copiar datos entre la hoja y otro sistema.',
              'No hay forma de saber quién cambió un dato, ni cuándo, ni por qué.',
            ],
          },
          {
            kind: 'p',
            text: 'Con dos de estas señales, merece la pena estudiarlo. Con cuatro, el coste de no hacer nada ya es mayor que el de la herramienta.',
          },
        ],
      },
      {
        id: 'elegir',
        heading: 'Elegir el primer proceso: el que se paga solo',
        blocks: [
          {
            kind: 'p',
            text: 'El error clásico es empezar por el proceso más complejo o por el que más ruido hace en las reuniones. El acierto es empezar por el que cumple estas tres condiciones a la vez: consume mucho tiempo, está bien definido y afecta a pocas personas.',
          },
          {
            kind: 'steps',
            items: [
              'Haz una lista de las tareas repetitivas y anota cuántas horas se van en cada una al mes. No hace falta precisión: un orden de magnitud basta.',
              'Marca cuáles siguen siempre los mismos pasos. Un proceso con reglas claras se automatiza; uno que depende del criterio de alguien, no.',
              'Descarta de momento los que tocan a media empresa. El primero tiene que salir bien, y cuanta menos gente haya que formar, mejor.',
              'Elige el que quede más arriba. Ese es el proyecto que va a justificar el siguiente.',
            ],
          },
          {
            kind: 'callout',
            title: 'La cuenta que importa',
            text: 'Si una tarea consume seis horas al mes de una persona, son más de setenta horas al año. Con eso se calcula si la herramienta se paga sola, y en cuánto tiempo. Si no se paga en un plazo razonable, ese no era el proceso por el que empezar.',
          },
        ],
      },
      {
        id: 'transicion',
        heading: 'La transición: en paralelo, nunca de golpe',
        blocks: [
          {
            kind: 'p',
            text: 'Sustituir una hoja de cálculo de un día para otro es la forma más rápida de que la empresa vuelva a la hoja en cuanto algo falle. La transición que funciona tiene cuatro fases y no se salta ninguna.',
          },
          {
            kind: 'steps',
            items: [
              'Observar. Alguien se sienta con quien hace el trabajo hoy y anota los pasos reales, incluidos los atajos y las excepciones que no están escritos en ningún sitio. Aquí es donde aparece la mitad de los requisitos.',
              'Construir lo mínimo. La primera versión hace exactamente lo que hace la hoja, sin funciones extra. Menos superficie es menos que puede salir mal.',
              'Convivir. Durante unas semanas, la herramienta y la hoja funcionan a la vez y se comparan los resultados. Esta fase es la que da la confianza para dar el paso.',
              'Retirar. Solo cuando los números cuadran se archiva la hoja, se forma al equipo y se documenta cómo funciona lo nuevo.',
            ],
          },
          {
            kind: 'p',
            text: 'Después empieza lo interesante: como los datos ya están estructurados, aparecen cosas que con la hoja eran impensables —avisos automáticos, informes que se envían solos, previsiones a partir del histórico—. Pero eso viene después, no en la primera versión.',
          },
        ],
      },
      {
        id: 'errores',
        heading: 'Cuatro errores que hacen fracasar el proyecto',
        blocks: [
          {
            kind: 'list',
            items: [
              'Digitalizar el proceso tal y como está, sin preguntarse si alguno de los pasos existe solo porque la hoja obligaba a hacerlo así.',
              'Encargar la herramienta sin contar con quien hace el trabajo a diario. Es quien conoce las excepciones, y las excepciones son el 80 % de la complejidad.',
              'Pedirlo todo en la primera versión. Un proyecto que tarda un año en verse es un proyecto que se abandona a los ocho meses.',
              'No prever quién va a mantenerlo. Una herramienta interna sin mantenimiento envejece igual que una web: en dos años nadie se atreve a tocarla.',
            ],
          },
        ],
      },
      {
        id: 'ejemplos',
        heading: 'Qué se automatiza en la práctica',
        blocks: [
          {
            kind: 'p',
            text: 'Los procesos que mejor responden suelen ser poco vistosos y muy repetitivos. Algunos ejemplos del tipo de herramienta que se construye a partir de una hoja de cálculo:',
          },
          {
            kind: 'list',
            items: [
              'Control de stock con avisos de reposición calculados a partir del consumo histórico, en lugar de revisar la hoja los lunes.',
              'Partes de producción o de calidad que se rellenan desde el móvil en planta y quedan registrados con hora y responsable.',
              'Informes recurrentes que se generan solos a partir de la base de datos y llegan por correo el día que toca.',
              'Generación de documentos —presupuestos, albaranes, etiquetas— a partir de plantillas, sin volver a teclear los mismos datos.',
              'Paneles internos que reúnen en una pantalla lo que hoy vive en cuatro ficheros distintos.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: '¿Cuánto se tarda en sustituir una hoja de cálculo por una herramienta?',
        a: 'Un proceso bien acotado —un control de stock, un parte de producción, un generador de informes— suele estar funcionando en unas semanas, porque la primera versión solo tiene que hacer lo que ya hace la hoja. Lo que alarga los plazos es el alcance abierto: cuando el proyecto crece durante el desarrollo, deja de tener fecha. Por eso se cierra el alcance antes de empezar y lo demás se planifica como una segunda fase.',
      },
      {
        q: '¿Se pueden aprovechar los datos que ya tengo en Excel?',
        a: 'Sí, y es lo normal: el histórico es lo más valioso que hay en la hoja. Se importa en la primera puesta en marcha, con una revisión previa porque casi siempre aparecen duplicados, formatos mezclados y filas que en su momento se rellenaron a mano. Esa limpieza forma parte del proyecto y conviene que esté presupuestada.',
      },
      {
        q: '¿Y si prefiero un programa comercial en lugar de algo a medida?',
        a: 'Si existe uno que cubra el proceso sin obligarte a cambiar cómo trabajas, es la opción más barata y la recomendamos sin problema. El software a medida compensa cuando el programa estándar exige adaptar el negocio a la herramienta, cuando se paga por decenas de funciones que nadie usa, o cuando hace falta que dialogue con sistemas que ya tienes. Merece la pena mirar primero lo que hay en el mercado.',
      },
    ],
    related: [
      { href: '/desarrollo-web-a-medida/', label: 'Desarrollo web a medida' },
      { href: '/desarrollo-web-sevilla/', label: 'Desarrollo web en Sevilla' },
      { href: '/guias/web-a-medida-o-wordpress/', label: 'Web a medida, WordPress o constructor' },
    ],
  },
]

export const GUIDE_BY_PATH: Record<string, Guide> = Object.fromEntries(
  GUIDES.map((guide) => [guide.path, guide]),
)
