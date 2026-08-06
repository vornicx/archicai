export type Lang = 'es' | 'en'

export type Service = {
  id: string
  eyebrow: string
  title: string
  intro: string
  items: string[]
}

export type Project = {
  title: string
  desc: string
  tag: string
}

export type Content = {
  meta: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    ogImage: string
    ogImageAlt: string
  }
  a11y: { mainNav: string; openMenu: string; closeMenu: string; skip: string }
  notFound: { eyebrow: string; title: string; body: string; home: string; contact: string }
  nav: { home: string; web: string; software: string; maintenance: string; projects: string; about: string; contact: string; cta: string }
  hero: {
    title: string
    /** El titular partido en líneas para la entrada enmascarada del hero.
        Unidas reproducen `title`, que es lo que ven buscadores y metadatos. */
    titleLines: { text: string; accent?: boolean }[]
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    note: string
    imageAlt: string
    /** Ficha de datos al pie del hero. */
    spec: { label: string; value: string }[]
  }
  /** Prueba de capacidad basada en datos verificables de esta misma web. */
  proof: {
    eyebrow: string
    title: string
    titleAccent: string
    lead: string
    items: { value: string; label: string; desc: string }[]
  }
  servicesIntro: { eyebrow: string; title: string; lead: string }
  services: Service[]
  value: {
    eyebrow: string
    title: string
    lead: string
    principles: { title: string; desc: string }[]
  }
  process: { eyebrow: string; title: string; lead: string; steps: string[] }
  clients: { eyebrow: string; title: string; lead: string; items: string[] }
  projects: {
    eyebrow: string
    title: string
    lead: string
    conceptLabel: string
    items: Project[]
  }
  about: { eyebrow: string; title: string; body: string[] }
  labs: { eyebrow: string; title: string; lead: string; items: { name: string; desc: string; status: string; href?: string }[] }
  contact: {
    eyebrow: string
    title: string
    lead: string
    fields: { name: string; company: string; contact: string; type: string; budget: string; message: string }
    placeholders: { name: string; company: string; contact: string; budget: string; message: string }
    optional: string
    types: string[]
    submit: string
    sending: string
    sent: string
    errorRequired: string
    errorContact: string
    directLabel: string
  }
  footer: { rights: string; tagline: string; langLabel: string; legalLabel: string }
  legal: {
    /** Labels for the legal documents, used in navigation and page headers. */
    legalNotice: string
    privacy: string
    cookies: string
    lastUpdated: string
    backHome: string
    onThisPage: string
    /** Shown in place of a mandatory identification field that is still empty. */
    pending: string
    pendingHint: string
    identity: {
      legalName: string
      taxId: string
      address: string
      email: string
      phone: string
      registry: string
      site: string
    }
    processors: { purpose: string; location: string; transfer: string }
  }
  /** First-layer data protection information shown next to the contact form. */
  privacyNotice: {
    heading: string
    rows: { term: string; desc: string }[]
    consent: string
    consentLinkLabel: string
    consentError: string
  }
}

export const CONTENT: Record<Lang, Content> = {
  es: {
    meta: {
      title: 'Páginas web y software a medida para empresas | Archic',
      description:
        'Diseñamos páginas web profesionales, ofrecemos mantenimiento y desarrollamos software a medida para pymes y empresas en España.',
      ogTitle: 'Páginas web y software a medida para empresas | Archic',
      ogDescription:
        'Diseño y desarrollo web, mantenimiento continuo, software a medida y automatización de procesos para empresas.',
      ogImage: 'og-image.jpg',
      ogImageAlt: 'Archic — páginas web y software a medida para empresas',
    },
    a11y: {
      mainNav: 'Navegación principal',
      openMenu: 'Abrir menú de navegación',
      closeMenu: 'Cerrar menú de navegación',
      skip: 'Saltar al contenido',
    },
    notFound: {
      eyebrow: 'Error 404',
      title: 'Esta página no existe',
      body: 'El enlace es incorrecto o el contenido se ha movido. Vuelve al inicio o escríbenos y lo resolvemos.',
      home: 'Volver al inicio',
      contact: 'Contactar',
    },
    nav: {
      home: 'Inicio',
      web: 'Páginas web',
      software: 'Software a medida',
      maintenance: 'Mantenimiento',
      projects: 'Proyectos',
      about: 'Sobre Archic',
      contact: 'Contacto',
      cta: 'Cuéntanos tu proyecto',
    },
    hero: {
      title: 'Páginas web y software a medida para empresas.',
      titleLines: [
        { text: 'Páginas web y software' },
        { text: 'a medida', accent: true },
        { text: 'para empresas.' },
      ],
      subtitle:
        'Diseñamos, desarrollamos y mantenemos soluciones digitales pensadas para las necesidades reales de cada negocio.',
      ctaPrimary: 'Cuéntanos tu proyecto',
      ctaSecondary: 'Ver servicios',
      note: 'Desde España, trabajando con empresas que necesitan tecnología útil, clara y bien construida.',
      imageAlt: 'Entrada de arquitectura mediterránea con un gran arco de piedra y una puerta azul',
      spec: [
        { label: 'Base', value: 'Écija, Sevilla' },
        { label: 'Ámbito', value: 'España' },
        { label: 'Servicios', value: 'Web · Software · Mantenimiento' },
        { label: 'Idiomas', value: 'Español · English' },
      ],
    },
    proof: {
      eyebrow: 'Esta misma web',
      title: 'La mejor muestra de lo que hacemos es',
      titleAccent: 'la página que estás leyendo.',
      lead: 'Todavía no publicamos casos de clientes, así que enseñamos el trabajo que sí puedes auditar ahora mismo. Abre las herramientas de desarrollo y compruébalo tú.',
      items: [
        {
          value: '0',
          label: 'Cookies',
          desc: 'Ni propias ni de terceros. No hay banner de consentimiento porque no hay nada que consentir.',
        },
        {
          value: '0',
          label: 'Peticiones a terceros',
          desc: 'Sin analítica, sin píxeles, sin fuentes externas. Tu dirección IP no sale de este dominio.',
        },
        {
          value: '100%',
          label: 'Contenido autoalojado',
          desc: 'Tipografías, imágenes y estilos servidos desde nuestro propio dominio.',
        },
        {
          value: 'AA',
          label: 'Contraste WCAG',
          desc: 'Navegable con teclado, compatible con lectores de pantalla y respeta el movimiento reducido.',
        },
      ],
    },
    servicesIntro: {
      eyebrow: 'Servicios',
      title: 'Tres formas de trabajar con nosotros.',
      lead: 'Cada proyecto empieza por entender cómo funciona la empresa. Después decidimos qué hay que construir.',
    },
    services: [
      {
        id: 'web',
        eyebrow: '01',
        title: 'Páginas web',
        intro:
          'Creamos páginas web rápidas, profesionales y adaptadas a la identidad de cada negocio. Desde webs corporativas y catálogos hasta plataformas con funcionalidades específicas.',
        items: [
          'Diseño personalizado',
          'Desarrollo responsive',
          'Optimización para móviles',
          'SEO técnico básico',
          'Formularios y contacto',
          'Integración con redes, mapas, WhatsApp o sistemas externos',
          'Configuración de dominio, alojamiento y analítica',
          'Web bilingüe o multilingüe cuando sea necesario',
        ],
      },
      {
        id: 'mantenimiento',
        eyebrow: '02',
        title: 'Mantenimiento web',
        intro:
          'Nos ocupamos de que tu web continúe funcionando, actualizada y segura después de publicarla. No entregamos un proyecto y desaparecemos.',
        items: [
          'Actualizaciones de contenido',
          'Corrección de errores',
          'Copias de seguridad',
          'Seguridad y monitorización',
          'Mejoras de rendimiento',
          'Soporte técnico',
          'Pequeñas modificaciones mensuales',
          'Gestión de alojamiento y dominio si lo necesitas',
        ],
      },
      {
        id: 'software',
        eyebrow: '03',
        title: 'Software a medida',
        intro:
          'Desarrollamos herramientas adaptadas a la forma de trabajar de cada empresa, evitando que el negocio tenga que adaptarse a un software genérico.',
        items: [
          'Gestión de inventario y pedidos',
          'Paneles internos',
          'Sistemas de producción',
          'Herramientas de recursos humanos',
          'Gestión de clientes y proveedores',
          'Automatización de tareas',
          'Generación de documentos e informes',
          'Integraciones con ERP, TPV, Excel, APIs y bases de datos',
          'Aplicaciones web privadas para empleados',
          'Digitalización de procesos en papel o manuales',
        ],
      },
    ],
    value: {
      eyebrow: 'Cómo trabajamos',
      title: 'Tecnología construida alrededor de tu negocio.',
      lead: 'Primero entendemos cómo funciona la empresa: quién hace qué, dónde se pierde tiempo y qué información se mueve entre sistemas. Después desarrollamos la solución. Nunca al revés.',
      principles: [
        { title: 'Hecho a medida', desc: 'Desarrollamos lo que la empresa necesita realmente, sin funciones de relleno.' },
        { title: 'Comunicación directa', desc: 'Hablas con las personas que diseñan y desarrollan tu proyecto, no con un intermediario.' },
        { title: 'Acompañamiento continuo', desc: 'Podemos mantener y mejorar la solución a lo largo del tiempo, según evolucione el negocio.' },
        { title: 'Propiedad y transparencia', desc: 'Explicamos qué se construye, cuánto cuesta y qué mantenimiento necesita. El resultado es tuyo.' },
      ],
    },
    process: {
      eyebrow: 'Proceso',
      title: 'De la conversación al sistema en marcha.',
      lead: 'Un proceso corto, sin burocracia y con avances visibles.',
      steps: [
        'Conocemos el negocio.',
        'Definimos el problema y el alcance.',
        'Diseñamos una propuesta clara.',
        'Desarrollamos y enseñamos avances.',
        'Publicamos, formamos y acompañamos.',
        'Mantenemos y mejoramos la solución.',
      ],
    },
    clients: {
      eyebrow: 'Con quién trabajamos',
      title: 'Negocios reales, con necesidades concretas.',
      lead: 'Trabajamos igual de bien con un negocio local que con una empresa que necesita una herramienta interna específica.',
      items: [
        'Comercios y negocios locales',
        'Restaurantes y hostelería',
        'Empresas agrícolas e industriales',
        'Profesionales y autónomos',
        'Empresas de servicios',
        'Negocios que todavía trabajan con Excel, papel o procesos manuales',
        'Empresas que necesitan una herramienta interna específica',
      ],
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Ejemplos de lo que podemos construir.',
      lead: 'Todavía no publicamos casos de clientes. Estos son ejemplos conceptuales del tipo de solución que desarrollamos.',
      conceptLabel: 'Ejemplo conceptual',
      items: [
        { title: 'Web corporativa con catálogo', desc: 'Presentación de la empresa, catálogo de productos y solicitudes de presupuesto desde la propia web.', tag: 'Web' },
        { title: 'Inventario y predicción de pedidos', desc: 'Control de stock en tiempo real y previsión de reposición a partir del histórico de consumo.', tag: 'Software' },
        { title: 'Panel interno de producción y calidad', desc: 'Seguimiento de líneas, incidencias y controles de calidad, accesible desde el móvil en planta.', tag: 'Software' },
        { title: 'Herramienta de generación de promociones', desc: 'Creación y publicación de promociones periódicas sin depender de diseño manual cada vez.', tag: 'Automatización' },
        { title: 'Automatización de informes', desc: 'Informes recurrentes generados a partir de bases de datos, Excel o APIs, enviados automáticamente.', tag: 'Automatización' },
      ],
    },
    about: {
      eyebrow: 'Sobre Archic',
      title: 'Una empresa tecnológica española e independiente.',
      body: [
        'Archic nace para acercar el desarrollo de software de calidad a empresas que necesitan soluciones reales, pero no quieren depender de herramientas genéricas o proveedores que desaparecen después de entregar el proyecto.',
        'Diseñamos páginas web, desarrollamos software a medida y acompañamos a nuestros clientes durante la evolución de sus sistemas.',
      ],
    },
    labs: {
      eyebrow: 'Archic Labs',
      title: 'Productos propios.',
      lead: 'Además de nuestro trabajo para empresas, desarrollamos productos propios y proyectos abiertos relacionados con software, inteligencia artificial y herramientas para desarrolladores.',
      items: [
        { name: 'Midas', desc: 'Memoria de largo horizonte para asistentes de IA, con recuperación basada en fuentes y trazabilidad.', status: 'En desarrollo', href: 'https://midas.archic.es' },
        { name: 'Apollo', desc: 'Entorno local de línea de comandos y escritorio para trabajar con varios proveedores de IA.', status: 'En desarrollo' },
        { name: 'Origin', desc: 'Interfaz personal sobre los componentes anteriores. En fase de diseño.', status: 'Fase de diseño' },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Cuéntanos tu proyecto.',
      lead: 'Cuéntanos qué necesitas. Aunque todavía no tengas una idea técnica clara, podemos ayudarte a definirla.',
      fields: {
        name: 'Nombre',
        company: 'Empresa',
        contact: 'Correo o teléfono',
        type: 'Tipo de proyecto',
        budget: 'Presupuesto aproximado',
        message: 'Cuéntanos qué necesitas',
      },
      placeholders: {
        name: 'Tu nombre',
        company: 'Nombre de la empresa',
        contact: 'correo@empresa.es o 600 000 000',
        budget: 'Por ejemplo: 2.000 – 5.000 €',
        message: 'Describe la situación actual y qué te gustaría conseguir.',
      },
      optional: 'opcional',
      types: [
        'Nueva página web',
        'Rediseño de una web',
        'Mantenimiento web',
        'Software a medida',
        'Automatización',
        'Otro',
      ],
      submit: 'Enviar consulta',
      sending: 'Preparando el mensaje…',
      sent: 'Se ha abierto tu cliente de correo con el mensaje. Si no ocurre nada, escríbenos directamente a vornic@archic.es.',
      errorRequired: 'Completa los campos obligatorios.',
      errorContact: 'Indica un correo o teléfono de contacto.',
      directLabel: 'O escríbenos directamente:',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      tagline: 'Páginas web, software a medida y mantenimiento para empresas. Desde España.',
      langLabel: 'Idioma',
      legalLabel: 'Información legal',
    },
    legal: {
      legalNotice: 'Aviso legal',
      privacy: 'Política de privacidad',
      cookies: 'Política de cookies',
      lastUpdated: 'Última actualización',
      backHome: 'Volver al inicio',
      onThisPage: 'Contenido de esta página',
      pending: 'Pendiente de completar',
      pendingHint:
        'Este dato es obligatorio y todavía no se ha publicado. Complétalo en src/legal/company.ts antes de poner el sitio en producción.',
      identity: {
        legalName: 'Titular',
        taxId: 'NIF / CIF',
        address: 'Domicilio',
        email: 'Correo electrónico',
        phone: 'Teléfono',
        registry: 'Datos registrales',
        site: 'Sitio web',
      },
      processors: {
        purpose: 'Finalidad',
        location: 'Ubicación',
        transfer: 'Garantías de la transferencia',
      },
    },
    privacyNotice: {
      heading: 'Información básica sobre protección de datos',
      rows: [
        { term: 'Responsable', desc: 'Archic. Los datos identificativos completos figuran en el aviso legal.' },
        { term: 'Finalidad', desc: 'Atender tu consulta y, en su caso, preparar una propuesta de servicios.' },
        { term: 'Legitimación', desc: 'Tu consentimiento y la aplicación de medidas precontractuales a petición tuya.' },
        { term: 'Destinatarios', desc: 'No se ceden datos a terceros, salvo obligación legal.' },
        { term: 'Derechos', desc: 'Acceso, rectificación, supresión, limitación, oposición y portabilidad, así como reclamar ante la AEPD.' },
      ],
      consent: 'He leído y acepto la {link}.',
      consentLinkLabel: 'política de privacidad',
      consentError: 'Debes aceptar la política de privacidad para enviar la consulta.',
    },
  },

  en: {
    meta: {
      title: 'Websites and custom software for businesses | Archic',
      description:
        'We design professional websites, provide ongoing maintenance and build custom software for companies in Spain.',
      ogTitle: 'Websites and custom software for businesses | Archic',
      ogDescription:
        'Web design and development, ongoing maintenance, custom software and process automation for businesses.',
      ogImage: 'og-image.jpg',
      ogImageAlt: 'Archic — websites and custom software for businesses',
    },
    a11y: {
      mainNav: 'Main navigation',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      skip: 'Skip to content',
    },
    notFound: {
      eyebrow: 'Error 404',
      title: 'This page does not exist',
      body: 'The link is wrong or the content has moved. Go back home or send us a message and we will sort it out.',
      home: 'Back to home',
      contact: 'Contact us',
    },
    nav: {
      home: 'Home',
      web: 'Websites',
      software: 'Custom software',
      maintenance: 'Maintenance',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      cta: 'Tell us about your project',
    },
    hero: {
      title: 'Websites and custom software for businesses.',
      titleLines: [
        { text: 'Websites and' },
        { text: 'custom software', accent: true },
        { text: 'for businesses.' },
      ],
      subtitle:
        'We design, build and maintain digital solutions shaped around what each business actually needs.',
      ctaPrimary: 'Tell us about your project',
      ctaSecondary: 'See services',
      note: 'Based in Spain, working with companies that need technology that is useful, clear and well built.',
      imageAlt: 'Mediterranean stone entrance with a large arch and a deep blue doorway',
      spec: [
        { label: 'Based in', value: 'Écija, Seville' },
        { label: 'Serving', value: 'Spain' },
        { label: 'Services', value: 'Web · Software · Maintenance' },
        { label: 'Languages', value: 'Español · English' },
      ],
    },
    proof: {
      eyebrow: 'This very website',
      title: 'The best sample of our work is',
      titleAccent: 'the page you are reading.',
      lead: 'We do not publish client cases yet, so we show the work you can audit right now. Open your developer tools and check it yourself.',
      items: [
        {
          value: '0',
          label: 'Cookies',
          desc: 'None of our own, none from third parties. No consent banner, because there is nothing to consent to.',
        },
        {
          value: '0',
          label: 'Third-party requests',
          desc: 'No analytics, no pixels, no external fonts. Your IP address never leaves this domain.',
        },
        {
          value: '100%',
          label: 'Self-hosted assets',
          desc: 'Fonts, images and stylesheets all served from our own domain.',
        },
        {
          value: 'AA',
          label: 'WCAG contrast',
          desc: 'Keyboard navigable, screen-reader friendly, and it honours reduced-motion preferences.',
        },
      ],
    },
    servicesIntro: {
      eyebrow: 'Services',
      title: 'Three ways to work with us.',
      lead: 'Every project starts by understanding how the company works. Then we decide what to build.',
    },
    services: [
      {
        id: 'web',
        eyebrow: '01',
        title: 'Websites',
        intro:
          'We build fast, professional websites shaped around each business identity — from corporate sites and catalogues to platforms with specific functionality.',
        items: [
          'Custom design',
          'Responsive development',
          'Mobile optimisation',
          'Technical SEO fundamentals',
          'Forms and contact flows',
          'Integration with social, maps, WhatsApp or external systems',
          'Domain, hosting and analytics setup',
          'Bilingual or multilingual sites when needed',
        ],
      },
      {
        id: 'mantenimiento',
        eyebrow: '02',
        title: 'Website maintenance',
        intro:
          'We keep your site running, updated and secure after launch. We do not hand over a project and disappear.',
        items: [
          'Content updates',
          'Bug fixes',
          'Backups',
          'Security and monitoring',
          'Performance improvements',
          'Technical support',
          'Small monthly changes',
          'Hosting and domain management if you need it',
        ],
      },
      {
        id: 'software',
        eyebrow: '03',
        title: 'Custom software',
        intro:
          'We build tools that fit how each company works, so the business does not have to bend around generic software.',
        items: [
          'Inventory and order management',
          'Internal dashboards',
          'Production systems',
          'HR tools',
          'Customer and supplier management',
          'Task automation',
          'Document and report generation',
          'Integrations with ERP, POS, Excel, APIs and databases',
          'Private web apps for employees',
          'Digitising paper-based or manual processes',
        ],
      },
    ],
    value: {
      eyebrow: 'How we work',
      title: 'Technology built around your business.',
      lead: 'First we understand how the company works: who does what, where time is lost and how information moves between systems. Then we build. Never the other way around.',
      principles: [
        { title: 'Built to measure', desc: 'We build what the company actually needs, without filler features.' },
        { title: 'Direct communication', desc: 'You talk to the people designing and building your project, not to a middle layer.' },
        { title: 'Long-term support', desc: 'We can maintain and improve the solution over time, as the business evolves.' },
        { title: 'Ownership and transparency', desc: 'We explain what gets built, what it costs and what maintenance it needs. The result is yours.' },
      ],
    },
    process: {
      eyebrow: 'Process',
      title: 'From conversation to a working system.',
      lead: 'A short process, no bureaucracy, with visible progress along the way.',
      steps: [
        'We get to know the business.',
        'We define the problem and the scope.',
        'We design a clear proposal.',
        'We build and show progress.',
        'We launch, train and support.',
        'We maintain and improve the solution.',
      ],
    },
    clients: {
      eyebrow: 'Who we work with',
      title: 'Real businesses with concrete needs.',
      lead: 'We work equally well with a local business and with a company that needs one specific internal tool.',
      items: [
        'Local shops and businesses',
        'Restaurants and hospitality',
        'Agricultural and industrial companies',
        'Professionals and freelancers',
        'Service companies',
        'Businesses still working with Excel, paper or manual processes',
        'Companies that need a specific internal tool',
      ],
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Examples of what we can build.',
      lead: 'We do not publish client cases yet. These are conceptual examples of the kind of solution we build.',
      conceptLabel: 'Conceptual example',
      items: [
        { title: 'Corporate site with catalogue', desc: 'Company presentation, product catalogue and quote requests directly from the site.', tag: 'Web' },
        { title: 'Inventory and order forecasting', desc: 'Real-time stock control and restocking forecasts based on consumption history.', tag: 'Software' },
        { title: 'Internal production and quality panel', desc: 'Line tracking, incidents and quality checks, usable from a phone on the shop floor.', tag: 'Software' },
        { title: 'Promotion generation tool', desc: 'Creating and publishing recurring promotions without manual design work every time.', tag: 'Automation' },
        { title: 'Business report automation', desc: 'Recurring reports generated from databases, Excel or APIs and sent automatically.', tag: 'Automation' },
      ],
    },
    about: {
      eyebrow: 'About Archic',
      title: 'An independent Spanish technology company.',
      body: [
        'Archic exists to bring quality software development to companies that need real solutions, but do not want to depend on generic tools or on suppliers who disappear once the project is delivered.',
        'We design websites, build custom software and stay with our clients as their systems evolve.',
      ],
    },
    labs: {
      eyebrow: 'Archic Labs',
      title: 'Our own products.',
      lead: 'Alongside our client work, we build our own products and open projects around software, artificial intelligence and developer tooling.',
      items: [
        { name: 'Midas', desc: 'Long-horizon memory for AI assistants, with source-grounded recall and provenance.', status: 'In development', href: 'https://midas.archic.es' },
        { name: 'Apollo', desc: 'Local-first CLI and desktop environment for working across multiple AI providers.', status: 'In development' },
        { name: 'Origin', desc: 'A personal interface on top of the components above. Design phase.', status: 'Design phase' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell us about your project.',
      lead: 'Tell us what you need. Even if you do not have a clear technical idea yet, we can help you define it.',
      fields: {
        name: 'Name',
        company: 'Company',
        contact: 'Email or phone',
        type: 'Project type',
        budget: 'Approximate budget',
        message: 'Tell us what you need',
      },
      placeholders: {
        name: 'Your name',
        company: 'Company name',
        contact: 'name@company.com or +34 600 000 000',
        budget: 'For example: €2,000 – €5,000',
        message: 'Describe the current situation and what you would like to achieve.',
      },
      optional: 'optional',
      types: [
        'New website',
        'Website redesign',
        'Website maintenance',
        'Custom software',
        'Automation',
        'Other',
      ],
      submit: 'Send enquiry',
      sending: 'Preparing your message…',
      sent: 'Your email client should now be open with the message. If nothing happens, write to vornic@archic.es.',
      errorRequired: 'Please complete the required fields.',
      errorContact: 'Please add an email or phone number.',
      directLabel: 'Or write to us directly:',
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: 'Websites, custom software and maintenance for businesses. From Spain.',
      langLabel: 'Language',
      legalLabel: 'Legal information',
    },
    legal: {
      legalNotice: 'Legal notice',
      privacy: 'Privacy policy',
      cookies: 'Cookie policy',
      lastUpdated: 'Last updated',
      backHome: 'Back to home',
      onThisPage: 'On this page',
      pending: 'To be completed',
      pendingHint:
        'This detail is legally required and has not been published yet. Fill it in at src/legal/company.ts before the site goes live.',
      identity: {
        legalName: 'Owner',
        taxId: 'Tax ID (NIF / CIF)',
        address: 'Registered address',
        email: 'Email',
        phone: 'Phone',
        registry: 'Registry details',
        site: 'Website',
      },
      processors: {
        purpose: 'Purpose',
        location: 'Location',
        transfer: 'Transfer safeguards',
      },
    },
    privacyNotice: {
      heading: 'Basic data protection information',
      rows: [
        { term: 'Controller', desc: 'Archic. Full identification details are set out in the legal notice.' },
        { term: 'Purpose', desc: 'To answer your enquiry and, where appropriate, prepare a service proposal.' },
        { term: 'Legal basis', desc: 'Your consent and pre-contractual steps taken at your request.' },
        { term: 'Recipients', desc: 'No data is disclosed to third parties, except where legally required.' },
        { term: 'Rights', desc: 'Access, rectification, erasure, restriction, objection and portability, and to lodge a complaint with the AEPD.' },
      ],
      consent: 'I have read and accept the {link}.',
      consentLinkLabel: 'privacy policy',
      consentError: 'You must accept the privacy policy to send your enquiry.',
    },
  },
}

export const CONTACT_MAIL = 'vornic@archic.es'
