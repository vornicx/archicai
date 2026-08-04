import type { Lang } from '../i18n/content'

/**
 * Content of the site's legal documents.
 *
 * The texts are written against Spanish and EU law as it applies to a Spanish
 * provider running a business-to-business marketing site:
 *
 *  - Ley 34/2002 (LSSI-CE), art. 10  → legal notice / identification
 *  - Ley 34/2002 (LSSI-CE), art. 22.2 → cookies and terminal storage
 *  - Reglamento (UE) 2016/679 (RGPD), arts. 13-14 → privacy information
 *  - Ley Orgánica 3/2018 (LOPDGDD) → national data protection rules
 *
 * They describe the site as it is actually built: no analytics, no advertising,
 * no third-party embeds and no cookies. If any of that changes, the texts have
 * to change with it — a privacy policy that does not match the code is worse
 * than none at all.
 */

/** Paragraph text may contain `[label](href)` links; everything else is plain. */
export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'terms'; items: { term: string; desc: string }[] }
  /** Renders the identification data from COMPANY, flagging missing fields. */
  | { kind: 'identity' }
  /** Renders the disclosed processors/recipients from PROCESSORS. */
  | { kind: 'processors' }

export type Section = {
  id: string
  heading: string
  blocks: Block[]
}

export type LegalDoc = {
  /** Path segment, without slashes. */
  slug: string
  title: string
  /** Short summary shown under the title and used as the meta description. */
  intro: string
  sections: Section[]
}

export type LegalDocKey = 'legal' | 'privacy' | 'cookies'

/** Canonical paths per language, used for routing, links, hreflang and sitemap. */
export const LEGAL_PATHS: Record<LegalDocKey, Record<Lang, string>> = {
  legal: { es: '/aviso-legal/', en: '/en/legal-notice/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
  cookies: { es: '/cookies/', en: '/en/cookies/' },
}

const AEPD_LINK = '[www.aepd.es](https://www.aepd.es)'

const ES: Record<LegalDocKey, LegalDoc> = {
  legal: {
    slug: 'aviso-legal',
    title: 'Aviso legal',
    intro:
      'Información sobre el titular de este sitio web y condiciones de uso, conforme al artículo 10 de la Ley 34/2002 de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE).',
    sections: [
      {
        id: 'titular',
        heading: '1. Datos identificativos del titular',
        blocks: [
          {
            kind: 'p',
            text: 'En cumplimiento del deber de información recogido en el artículo 10 de la LSSI-CE, se facilitan a continuación los datos del titular de este sitio web:',
          },
          { kind: 'identity' },
        ],
      },
      {
        id: 'objeto',
        heading: '2. Objeto',
        blocks: [
          {
            kind: 'p',
            text: 'Este sitio web tiene una finalidad informativa y comercial: presentar los servicios de diseño y desarrollo web, mantenimiento y software a medida que ofrece Archic, y facilitar el contacto con posibles clientes.',
          },
          {
            kind: 'p',
            text: 'A través de este sitio no se comercializan productos ni servicios en línea, no se realizan pagos y no existe un área privada de usuarios registrados. La contratación de servicios se formaliza, en su caso, mediante propuesta y acuerdo independientes fuera de esta web.',
          },
        ],
      },
      {
        id: 'uso',
        heading: '3. Condiciones de uso',
        blocks: [
          {
            kind: 'p',
            text: 'El acceso a este sitio web es libre y gratuito, y atribuye la condición de usuario. La navegación implica la aceptación de este aviso legal en la versión publicada en el momento del acceso.',
          },
          { kind: 'p', text: 'El usuario se compromete a:' },
          {
            kind: 'list',
            items: [
              'Utilizar el sitio conforme a la ley, a este aviso legal, a la buena fe y al orden público.',
              'No emplear los contenidos con fines ilícitos o lesivos para terceros.',
              'No introducir ni difundir código malicioso ni realizar acciones que puedan dañar, sobrecargar o impedir el funcionamiento normal del sitio.',
              'Facilitar información veraz en el formulario de contacto y no suplantar la identidad de terceros.',
            ],
          },
        ],
      },
      {
        id: 'propiedad',
        heading: '4. Propiedad intelectual e industrial',
        blocks: [
          {
            kind: 'p',
            text: 'Los contenidos de este sitio —textos, diseño, estructura de navegación, marcas, logotipos, imágenes y código fuente— son titularidad del prestador o se utilizan con la debida autorización, y están protegidos por la normativa de propiedad intelectual e industrial.',
          },
          {
            kind: 'p',
            text: 'Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa y por escrito del titular. Se permite la visualización y la copia privada para uso personal, así como la cita con indicación de la fuente.',
          },
          {
            kind: 'p',
            text: 'Los proyectos descritos en la sección de proyectos se presentan expresamente como ejemplos conceptuales del tipo de solución que desarrollamos y no como casos de clientes reales.',
          },
        ],
      },
      {
        id: 'enlaces',
        heading: '5. Enlaces a sitios de terceros',
        blocks: [
          {
            kind: 'p',
            text: 'Este sitio puede incluir enlaces a páginas de terceros. Su inclusión tiene carácter informativo y no supone recomendación, aprobación ni supervisión de sus contenidos. El titular no asume responsabilidad alguna por la información, servicios o políticas de privacidad de esos sitios, que se rigen por sus propias condiciones.',
          },
        ],
      },
      {
        id: 'responsabilidad',
        heading: '6. Responsabilidad y disponibilidad',
        blocks: [
          {
            kind: 'p',
            text: 'El titular procura mantener la información actualizada y libre de errores, pero no garantiza la exactitud, integridad o vigencia permanente de todos los contenidos, que pueden modificarse sin previo aviso.',
          },
          {
            kind: 'p',
            text: 'Tampoco se garantiza la disponibilidad continua del sitio, que puede verse interrumpida por tareas de mantenimiento, incidencias técnicas o causas ajenas al prestador. En la medida permitida por la ley, se excluye la responsabilidad por los daños derivados de dichas interrupciones o del uso indebido del sitio por parte del usuario.',
          },
        ],
      },
      {
        id: 'datos',
        heading: '7. Protección de datos y cookies',
        blocks: [
          {
            kind: 'p',
            text: 'El tratamiento de los datos personales facilitados a través de este sitio se describe en la [política de privacidad](/privacidad/). La información sobre cookies y almacenamiento en el dispositivo del usuario se encuentra en la [política de cookies](/cookies/).',
          },
        ],
      },
      {
        id: 'ley',
        heading: '8. Legislación aplicable y jurisdicción',
        blocks: [
          {
            kind: 'p',
            text: 'Este aviso legal se rige por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso de este sitio web, las partes se someten a los juzgados y tribunales del domicilio del titular, salvo que la normativa aplicable establezca imperativamente un fuero distinto, como ocurre en las relaciones con consumidores.',
          },
        ],
      },
      {
        id: 'modificaciones',
        heading: '9. Modificaciones',
        blocks: [
          {
            kind: 'p',
            text: 'El titular se reserva el derecho a modificar este aviso legal para adaptarlo a cambios normativos, técnicos o en la actividad. La versión vigente es siempre la publicada en esta página, con indicación de su fecha de actualización.',
          },
        ],
      },
    ],
  },

  privacy: {
    slug: 'privacidad',
    title: 'Política de privacidad',
    intro:
      'Cómo tratamos los datos personales que nos facilitas, con qué base jurídica y qué derechos puedes ejercer, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).',
    sections: [
      {
        id: 'responsable',
        heading: '1. Responsable del tratamiento',
        blocks: [
          {
            kind: 'p',
            text: 'El responsable del tratamiento de los datos personales recogidos a través de este sitio web es:',
          },
          { kind: 'identity' },
          {
            kind: 'p',
            text: 'No se ha designado delegado de protección de datos, al no concurrir ninguno de los supuestos del artículo 37 del RGPD ni del artículo 34 de la LOPDGDD. Puedes dirigir cualquier consulta en materia de protección de datos a la dirección de correo indicada.',
          },
        ],
      },
      {
        id: 'datos',
        heading: '2. Qué datos tratamos y con qué finalidad',
        blocks: [
          {
            kind: 'p',
            text: 'Solo tratamos los datos que nos facilitas voluntariamente cuando te pones en contacto con nosotros. No recogemos datos de navegación con fines analíticos, publicitarios ni de elaboración de perfiles.',
          },
          {
            kind: 'terms',
            items: [
              {
                term: 'Formulario de contacto y correo electrónico',
                desc: 'Nombre, empresa (opcional), correo electrónico o teléfono, tipo de proyecto, presupuesto aproximado (opcional) y el contenido del mensaje. Finalidad: atender tu consulta, preparar una propuesta si procede y mantener la comunicación comercial relacionada con ella.',
              },
              {
                term: 'Relación contractual, en su caso',
                desc: 'Si la consulta desemboca en la contratación de servicios, trataremos además los datos identificativos y de facturación necesarios para formalizar y ejecutar el contrato y cumplir nuestras obligaciones fiscales y contables.',
              },
              {
                term: 'Registros técnicos del servidor',
                desc: 'Nuestro proveedor de alojamiento genera registros de acceso que pueden incluir la dirección IP, la fecha y hora de la petición y el tipo de navegador. Se generan por el funcionamiento y la seguridad de la infraestructura, no se utilizan para identificar visitantes ni se cruzan con ningún otro dato.',
              },
            ],
          },
          {
            kind: 'p',
            text: 'El formulario de contacto de esta web no envía los datos a ningún servidor propio ni a servicios de terceros: prepara un mensaje en tu propio programa de correo, que solo se envía si tú decides enviarlo. A partir de la recepción del correo, los datos se tratan conforme a esta política.',
          },
        ],
      },
      {
        id: 'base',
        heading: '3. Base jurídica del tratamiento',
        blocks: [
          {
            kind: 'terms',
            items: [
              {
                term: 'Consentimiento — art. 6.1.a RGPD',
                desc: 'Para atender las consultas que nos remites a través del formulario o por correo electrónico. Puedes retirarlo en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.',
              },
              {
                term: 'Ejecución de un contrato o medidas precontractuales — art. 6.1.b RGPD',
                desc: 'Para la elaboración de propuestas a petición tuya y, en su caso, para la prestación de los servicios contratados.',
              },
              {
                term: 'Cumplimiento de una obligación legal — art. 6.1.c RGPD',
                desc: 'Para atender las obligaciones fiscales, contables y mercantiles derivadas de la relación comercial.',
              },
              {
                term: 'Interés legítimo — art. 6.1.f RGPD',
                desc: 'Para mantener la seguridad e integridad del sitio web y de nuestros sistemas de correo, y para conservar prueba de las comunicaciones mantenidas.',
              },
            ],
          },
          {
            kind: 'p',
            text: 'Facilitar los datos marcados como obligatorios es necesario para poder atender la consulta; sin ellos no podremos responderte. El resto de campos son opcionales y solo sirven para preparar mejor la respuesta.',
          },
        ],
      },
      {
        id: 'conservacion',
        heading: '4. Plazo de conservación',
        blocks: [
          {
            kind: 'list',
            items: [
              'Consultas que no derivan en una relación comercial: se conservan durante el tiempo necesario para atenderlas y, como máximo, un año desde el último contacto, salvo que solicites antes su supresión.',
              'Datos de clientes: durante la vigencia de la relación contractual y, después, bloqueados durante los plazos de prescripción legal aplicables —seis años conforme al Código de Comercio y cuatro años en materia tributaria— antes de su supresión definitiva.',
              'Registros técnicos del servidor: durante el periodo de retención definido por el proveedor de alojamiento, limitado a fines de seguridad y diagnóstico.',
            ],
          },
        ],
      },
      {
        id: 'destinatarios',
        heading: '5. Destinatarios y encargados del tratamiento',
        blocks: [
          {
            kind: 'p',
            text: 'No cedemos datos personales a terceros, ni vendemos ni compartimos información con fines publicitarios. Únicamente acceden a los datos los proveedores necesarios para prestar el servicio, que actúan como encargados del tratamiento conforme al artículo 28 del RGPD:',
          },
          { kind: 'processors' },
          {
            kind: 'p',
            text: 'Además, los datos podrán comunicarse a las administraciones públicas, juzgados y tribunales cuando exista una obligación legal de hacerlo.',
          },
        ],
      },
      {
        id: 'transferencias',
        heading: '6. Transferencias internacionales',
        blocks: [
          {
            kind: 'p',
            text: 'El alojamiento del sitio web implica una transferencia internacional de datos a Estados Unidos. Dicha transferencia se ampara en la Decisión de Adecuación de la Comisión Europea relativa al EU-U.S. Data Privacy Framework y, con carácter complementario, en Cláusulas Contractuales Tipo aprobadas por la Comisión Europea, que ofrecen garantías adecuadas conforme al capítulo V del RGPD.',
          },
        ],
      },
      {
        id: 'derechos',
        heading: '7. Tus derechos',
        blocks: [
          {
            kind: 'p',
            text: 'Puedes ejercer en cualquier momento los siguientes derechos escribiendo a [nuestro correo de contacto](mailto:{email}), indicando el derecho que deseas ejercer y adjuntando copia de un documento que acredite tu identidad:',
          },
          {
            kind: 'list',
            items: [
              'Acceso: conocer qué datos tuyos tratamos y obtener una copia.',
              'Rectificación: corregir datos inexactos o incompletos.',
              'Supresión: solicitar que se eliminen cuando ya no sean necesarios.',
              'Limitación: pedir que se suspenda el tratamiento en determinados supuestos.',
              'Oposición: oponerte al tratamiento basado en interés legítimo.',
              'Portabilidad: recibir tus datos en formato estructurado y de uso común, o solicitar su transmisión a otro responsable.',
              'Retirada del consentimiento: en cualquier momento y sin efectos retroactivos.',
            ],
          },
          {
            kind: 'p',
            text: 'Responderemos a tu solicitud en el plazo de un mes, ampliable en dos meses adicionales cuando la complejidad o el número de solicitudes lo justifique. El ejercicio de estos derechos es gratuito.',
          },
          {
            kind: 'p',
            text: `Si consideras que el tratamiento no se ajusta a la normativa, o que no hemos atendido correctamente tu solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (C/ Jorge Juan, 6, 28001 Madrid — ${AEPD_LINK}), como autoridad de control competente.`,
          },
        ],
      },
      {
        id: 'seguridad',
        heading: '8. Seguridad de los datos',
        blocks: [
          {
            kind: 'p',
            text: 'Aplicamos las medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo, conforme al artículo 32 del RGPD: cifrado del sitio mediante HTTPS, control de acceso a las cuentas de correo, autenticación reforzada en los servicios utilizados y minimización de los datos recogidos.',
          },
          {
            kind: 'p',
            text: 'Ningún sistema es completamente infalible. En caso de violación de la seguridad de los datos que suponga un riesgo para tus derechos y libertades, lo notificaremos a la Agencia Española de Protección de Datos y, cuando proceda, a las personas afectadas, en los plazos previstos en los artículos 33 y 34 del RGPD.',
          },
        ],
      },
      {
        id: 'menores',
        heading: '9. Menores de edad',
        blocks: [
          {
            kind: 'p',
            text: 'Este sitio se dirige a empresas y profesionales. No recogemos de forma consciente datos de menores de catorce años. Si detectamos que hemos recibido datos de un menor sin el consentimiento de sus titulares de la patria potestad o tutela, procederemos a su supresión.',
          },
        ],
      },
      {
        id: 'cambios',
        heading: '10. Cambios en esta política',
        blocks: [
          {
            kind: 'p',
            text: 'Esta política puede actualizarse para reflejar cambios legales o en la forma en que tratamos los datos. La versión vigente es la publicada en esta página, con indicación de la fecha de última actualización. Los cambios sustanciales se comunicarán de forma destacada.',
          },
        ],
      },
    ],
  },

  cookies: {
    slug: 'cookies',
    title: 'Política de cookies',
    intro:
      'Información sobre el uso de cookies y otras formas de almacenamiento en tu dispositivo, conforme al artículo 22.2 de la Ley 34/2002 (LSSI-CE) y a las directrices de la Agencia Española de Protección de Datos.',
    sections: [
      {
        id: 'que-son',
        heading: '1. Qué son las cookies',
        blocks: [
          {
            kind: 'p',
            text: 'Las cookies son pequeños archivos que un sitio web almacena en el navegador de quien lo visita. Permiten recordar información sobre la visita y, según su finalidad, pueden usarse para que el sitio funcione correctamente, para medir la audiencia o para mostrar publicidad personalizada. Consideraciones equivalentes se aplican a otras técnicas de almacenamiento como localStorage, sessionStorage o los píxeles de seguimiento.',
          },
        ],
      },
      {
        id: 'uso',
        heading: '2. Cookies utilizadas en este sitio',
        blocks: [
          {
            kind: 'p',
            text: 'Este sitio web no utiliza cookies. No instalamos cookies propias ni de terceros, ni analíticas, ni publicitarias, ni de personalización.',
          },
          {
            kind: 'p',
            text: 'Tampoco empleamos localStorage, sessionStorage, huellas digitales del dispositivo (fingerprinting), píxeles de seguimiento ni ninguna otra técnica destinada a identificar o seguir a los visitantes.',
          },
          {
            kind: 'p',
            text: 'Por este motivo no se muestra un banner de consentimiento de cookies: conforme al artículo 22.2 de la LSSI-CE y a la Guía sobre el uso de las cookies de la Agencia Española de Protección de Datos, solo debe recabarse consentimiento cuando se almacena o se accede a información en el equipo del usuario, algo que aquí no ocurre.',
          },
        ],
      },
      {
        id: 'terceros',
        heading: '3. Contenidos y peticiones a terceros',
        blocks: [
          {
            kind: 'p',
            text: 'El sitio se sirve íntegramente desde su propio dominio. Las tipografías, imágenes, estilos y scripts están alojados por nosotros, de forma que tu navegador no realiza peticiones a servidores de terceros al visitarlo y no se comunica tu dirección IP a proveedores externos como redes de tipografías, mapas o vídeos incrustados.',
          },
          {
            kind: 'p',
            text: 'La única excepción se produce si haces clic voluntariamente en un enlace externo, momento en el que pasas a navegar por un sitio ajeno sujeto a sus propias políticas.',
          },
        ],
      },
      {
        id: 'tecnico',
        heading: '4. Registros del servidor',
        blocks: [
          {
            kind: 'p',
            text: 'Con independencia de las cookies, nuestro proveedor de alojamiento genera registros técnicos de acceso necesarios para entregar las páginas y proteger la infraestructura. No constituyen cookies ni requieren consentimiento, y su tratamiento se detalla en la [política de privacidad](/privacidad/).',
          },
        ],
      },
      {
        id: 'gestion',
        heading: '5. Cómo gestionar las cookies en tu navegador',
        blocks: [
          {
            kind: 'p',
            text: 'Aunque este sitio no instale cookies, puedes revisar y eliminar en cualquier momento las que hayan dejado otros sitios, y configurar tu navegador para bloquearlas. Las instrucciones están disponibles en la ayuda de cada navegador:',
          },
          {
            kind: 'list',
            items: [
              '[Google Chrome](https://support.google.com/chrome/answer/95647)',
              '[Mozilla Firefox](https://support.mozilla.org/es/kb/Borrar%20cookies)',
              '[Safari](https://support.apple.com/es-es/guide/safari/sfri11471/mac)',
              '[Microsoft Edge](https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)',
            ],
          },
        ],
      },
      {
        id: 'cambios',
        heading: '6. Cambios en esta política',
        blocks: [
          {
            kind: 'p',
            text: 'Si en el futuro incorporamos cookies o herramientas de medición, actualizaremos esta política antes de activarlas y habilitaremos un mecanismo de consentimiento previo, granular y revocable, que permitirá rechazarlas con la misma facilidad con la que se aceptan.',
          },
        ],
      },
    ],
  },
}

const EN: Record<LegalDocKey, LegalDoc> = {
  legal: {
    slug: 'legal-notice',
    title: 'Legal notice',
    intro:
      'Information about the owner of this website and the terms governing its use, as required by article 10 of Spanish Law 34/2002 on information society services and electronic commerce (LSSI-CE).',
    sections: [
      {
        id: 'owner',
        heading: '1. Owner identification',
        blocks: [
          {
            kind: 'p',
            text: 'In compliance with the duty of information set out in article 10 LSSI-CE, the details of the owner of this website are as follows:',
          },
          { kind: 'identity' },
        ],
      },
      {
        id: 'purpose',
        heading: '2. Purpose',
        blocks: [
          {
            kind: 'p',
            text: 'This website is informational and commercial in nature: it presents the web design and development, maintenance and custom software services offered by Archic, and makes it possible to get in touch with us.',
          },
          {
            kind: 'p',
            text: 'No products or services are sold online through this site, no payments are processed and there is no private area for registered users. Services are contracted, where applicable, through a separate proposal and agreement made outside this website.',
          },
        ],
      },
      {
        id: 'use',
        heading: '3. Terms of use',
        blocks: [
          {
            kind: 'p',
            text: 'Access to this website is free of charge and grants the condition of user. Browsing the site implies acceptance of this legal notice in the version published at the time of access.',
          },
          { kind: 'p', text: 'Users undertake to:' },
          {
            kind: 'list',
            items: [
              'Use the site in accordance with the law, this legal notice, good faith and public order.',
              'Not use its contents for unlawful purposes or in ways harmful to third parties.',
              'Not introduce or spread malicious code, nor take any action liable to damage, overload or disrupt the normal operation of the site.',
              'Provide truthful information in the contact form and not impersonate third parties.',
            ],
          },
        ],
      },
      {
        id: 'ip',
        heading: '4. Intellectual and industrial property',
        blocks: [
          {
            kind: 'p',
            text: 'The contents of this site — texts, design, navigation structure, trade marks, logos, images and source code — belong to the provider or are used under due authorisation, and are protected by intellectual and industrial property law.',
          },
          {
            kind: 'p',
            text: 'Their reproduction, distribution, public communication or transformation without the express written authorisation of the owner is prohibited. Viewing and private copying for personal use are permitted, as is quotation with attribution of the source.',
          },
          {
            kind: 'p',
            text: 'The projects described in the projects section are presented expressly as conceptual examples of the kind of solution we build, and not as real client cases.',
          },
        ],
      },
      {
        id: 'links',
        heading: '5. Links to third-party sites',
        blocks: [
          {
            kind: 'p',
            text: 'This site may include links to third-party pages. They are provided for information purposes and do not imply any recommendation, endorsement or supervision of their contents. The owner accepts no responsibility for the information, services or privacy policies of those sites, which are governed by their own terms.',
          },
        ],
      },
      {
        id: 'liability',
        heading: '6. Liability and availability',
        blocks: [
          {
            kind: 'p',
            text: 'The owner endeavours to keep the information up to date and free of errors, but does not guarantee the accuracy, completeness or permanent validity of all contents, which may be modified without prior notice.',
          },
          {
            kind: 'p',
            text: 'Continuous availability of the site is likewise not guaranteed: it may be interrupted by maintenance, technical incidents or causes beyond the provider’s control. To the extent permitted by law, liability for damages arising from such interruptions or from improper use of the site by the user is excluded.',
          },
        ],
      },
      {
        id: 'data',
        heading: '7. Data protection and cookies',
        blocks: [
          {
            kind: 'p',
            text: 'The processing of personal data provided through this site is described in the [privacy policy](/en/privacy/). Information on cookies and storage on the user’s device is set out in the [cookie policy](/en/cookies/).',
          },
        ],
      },
      {
        id: 'law',
        heading: '8. Applicable law and jurisdiction',
        blocks: [
          {
            kind: 'p',
            text: 'This legal notice is governed by Spanish law. For the resolution of any dispute arising from access to or use of this website, the parties submit to the courts of the owner’s domicile, unless applicable law mandatorily establishes a different jurisdiction, as is the case in relations with consumers.',
          },
        ],
      },
      {
        id: 'changes',
        heading: '9. Changes',
        blocks: [
          {
            kind: 'p',
            text: 'The owner reserves the right to amend this legal notice to reflect regulatory, technical or business changes. The version in force is always the one published on this page, together with the date it was last updated.',
          },
        ],
      },
    ],
  },

  privacy: {
    slug: 'privacy',
    title: 'Privacy policy',
    intro:
      'How we process the personal data you provide, on what legal basis, and the rights you can exercise, under Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD).',
    sections: [
      {
        id: 'controller',
        heading: '1. Data controller',
        blocks: [
          {
            kind: 'p',
            text: 'The controller of the personal data collected through this website is:',
          },
          { kind: 'identity' },
          {
            kind: 'p',
            text: 'No data protection officer has been appointed, as none of the circumstances set out in article 37 GDPR or article 34 LOPDGDD apply. Any data protection query can be sent to the email address above.',
          },
        ],
      },
      {
        id: 'data',
        heading: '2. What data we process and why',
        blocks: [
          {
            kind: 'p',
            text: 'We only process the data you voluntarily provide when you contact us. We do not collect browsing data for analytics, advertising or profiling purposes.',
          },
          {
            kind: 'terms',
            items: [
              {
                term: 'Contact form and email',
                desc: 'Name, company (optional), email address or phone number, project type, approximate budget (optional) and the content of your message. Purpose: to answer your enquiry, prepare a proposal where appropriate and maintain the related commercial correspondence.',
              },
              {
                term: 'Contractual relationship, where applicable',
                desc: 'If the enquiry leads to an engagement, we will additionally process the identification and billing data needed to enter into and perform the contract and to meet our tax and accounting obligations.',
              },
              {
                term: 'Server technical logs',
                desc: 'Our hosting provider generates access logs that may include the IP address, the date and time of the request and the browser type. They exist for the operation and security of the infrastructure, are not used to identify visitors and are not combined with any other data.',
              },
            ],
          },
          {
            kind: 'p',
            text: 'The contact form on this site does not send your data to any server of ours or to third-party services: it prepares a message in your own email client, which is sent only if you choose to send it. From the moment we receive the email, the data is processed in accordance with this policy.',
          },
        ],
      },
      {
        id: 'basis',
        heading: '3. Legal basis for processing',
        blocks: [
          {
            kind: 'terms',
            items: [
              {
                term: 'Consent — art. 6(1)(a) GDPR',
                desc: 'To answer the enquiries you send us through the form or by email. You may withdraw it at any time, without affecting the lawfulness of processing carried out beforehand.',
              },
              {
                term: 'Performance of a contract or pre-contractual steps — art. 6(1)(b) GDPR',
                desc: 'To prepare proposals at your request and, where applicable, to provide the services engaged.',
              },
              {
                term: 'Compliance with a legal obligation — art. 6(1)(c) GDPR',
                desc: 'To meet the tax, accounting and commercial obligations arising from the business relationship.',
              },
              {
                term: 'Legitimate interest — art. 6(1)(f) GDPR',
                desc: 'To maintain the security and integrity of the website and our email systems, and to keep a record of the communications exchanged.',
              },
            ],
          },
          {
            kind: 'p',
            text: 'Providing the data marked as required is necessary for us to handle your enquiry; without it we cannot reply. The remaining fields are optional and only help us prepare a better answer.',
          },
        ],
      },
      {
        id: 'retention',
        heading: '4. Retention periods',
        blocks: [
          {
            kind: 'list',
            items: [
              'Enquiries that do not lead to a business relationship: kept for as long as needed to deal with them and, at most, one year from the last contact, unless you ask for erasure sooner.',
              'Client data: for the duration of the contractual relationship and, thereafter, blocked for the applicable statutory limitation periods — six years under the Spanish Commercial Code and four years for tax purposes — before definitive erasure.',
              'Server technical logs: for the retention period set by the hosting provider, limited to security and diagnostic purposes.',
            ],
          },
        ],
      },
      {
        id: 'recipients',
        heading: '5. Recipients and processors',
        blocks: [
          {
            kind: 'p',
            text: 'We do not disclose personal data to third parties, and we neither sell nor share information for advertising purposes. Only the providers necessary to run the service have access to the data, acting as processors under article 28 GDPR:',
          },
          { kind: 'processors' },
          {
            kind: 'p',
            text: 'Data may also be disclosed to public authorities and courts where there is a legal obligation to do so.',
          },
        ],
      },
      {
        id: 'transfers',
        heading: '6. International transfers',
        blocks: [
          {
            kind: 'p',
            text: 'Hosting the website involves an international transfer of data to the United States. That transfer relies on the European Commission’s adequacy decision for the EU-U.S. Data Privacy Framework and, additionally, on Standard Contractual Clauses approved by the European Commission, which provide appropriate safeguards under chapter V GDPR.',
          },
        ],
      },
      {
        id: 'rights',
        heading: '7. Your rights',
        blocks: [
          {
            kind: 'p',
            text: 'You may exercise the following rights at any time by writing to [our contact address](mailto:{email}), stating which right you wish to exercise and enclosing a copy of a document proving your identity:',
          },
          {
            kind: 'list',
            items: [
              'Access: find out what data of yours we process and obtain a copy.',
              'Rectification: correct inaccurate or incomplete data.',
              'Erasure: ask for data to be deleted when it is no longer necessary.',
              'Restriction: ask for processing to be suspended in certain circumstances.',
              'Objection: object to processing based on legitimate interest.',
              'Portability: receive your data in a structured, commonly used format, or ask for it to be transmitted to another controller.',
              'Withdrawal of consent: at any time and without retroactive effect.',
            ],
          },
          {
            kind: 'p',
            text: 'We will respond within one month, extendable by two further months where the complexity or number of requests justifies it. Exercising these rights is free of charge.',
          },
          {
            kind: 'p',
            text: `If you believe the processing does not comply with the applicable rules, or that we have not handled your request properly, you may lodge a complaint with the Spanish Data Protection Agency (C/ Jorge Juan, 6, 28001 Madrid — ${AEPD_LINK}), the competent supervisory authority.`,
          },
        ],
      },
      {
        id: 'security',
        heading: '8. Data security',
        blocks: [
          {
            kind: 'p',
            text: 'We apply appropriate technical and organisational measures to ensure a level of security appropriate to the risk, in accordance with article 32 GDPR: HTTPS encryption of the site, access control over email accounts, strong authentication on the services we use, and minimisation of the data collected.',
          },
          {
            kind: 'p',
            text: 'No system is entirely infallible. In the event of a personal data breach posing a risk to your rights and freedoms, we will notify the Spanish Data Protection Agency and, where appropriate, the individuals affected, within the deadlines set out in articles 33 and 34 GDPR.',
          },
        ],
      },
      {
        id: 'minors',
        heading: '9. Minors',
        blocks: [
          {
            kind: 'p',
            text: 'This site is aimed at companies and professionals. We do not knowingly collect data from children under fourteen. If we become aware that we have received data from a minor without the consent of those holding parental authority or guardianship, we will delete it.',
          },
        ],
      },
      {
        id: 'changes',
        heading: '10. Changes to this policy',
        blocks: [
          {
            kind: 'p',
            text: 'This policy may be updated to reflect legal changes or changes in the way we process data. The version in force is the one published on this page, together with the date it was last updated. Substantial changes will be communicated prominently.',
          },
        ],
      },
    ],
  },

  cookies: {
    slug: 'cookies',
    title: 'Cookie policy',
    intro:
      'Information about the use of cookies and other forms of storage on your device, under article 22.2 of Spanish Law 34/2002 (LSSI-CE) and the guidelines of the Spanish Data Protection Agency.',
    sections: [
      {
        id: 'what',
        heading: '1. What cookies are',
        blocks: [
          {
            kind: 'p',
            text: 'Cookies are small files that a website stores in a visitor’s browser. They make it possible to remember information about the visit and, depending on their purpose, can be used to make the site work correctly, to measure audience or to display personalised advertising. Equivalent considerations apply to other storage techniques such as localStorage, sessionStorage or tracking pixels.',
          },
        ],
      },
      {
        id: 'use',
        heading: '2. Cookies used on this site',
        blocks: [
          {
            kind: 'p',
            text: 'This website does not use cookies. We install no first-party or third-party cookies, and none for analytics, advertising or personalisation.',
          },
          {
            kind: 'p',
            text: 'We likewise do not use localStorage, sessionStorage, device fingerprinting, tracking pixels or any other technique intended to identify or track visitors.',
          },
          {
            kind: 'p',
            text: 'This is why no cookie consent banner is shown: under article 22.2 LSSI-CE and the Spanish Data Protection Agency’s guidance on the use of cookies, consent is only required where information is stored on or accessed from the user’s device, which does not happen here.',
          },
        ],
      },
      {
        id: 'third-parties',
        heading: '3. Third-party content and requests',
        blocks: [
          {
            kind: 'p',
            text: 'The site is served entirely from its own domain. Fonts, images, stylesheets and scripts are hosted by us, so your browser makes no requests to third-party servers when visiting it and your IP address is not disclosed to external providers such as font networks, maps or embedded video.',
          },
          {
            kind: 'p',
            text: 'The only exception occurs if you deliberately click an external link, at which point you are browsing a separate site subject to its own policies.',
          },
        ],
      },
      {
        id: 'logs',
        heading: '4. Server logs',
        blocks: [
          {
            kind: 'p',
            text: 'Independently of cookies, our hosting provider generates technical access logs needed to deliver the pages and protect the infrastructure. They are not cookies and do not require consent; their processing is described in the [privacy policy](/en/privacy/).',
          },
        ],
      },
      {
        id: 'manage',
        heading: '5. Managing cookies in your browser',
        blocks: [
          {
            kind: 'p',
            text: 'Even though this site sets no cookies, you can review and delete those left by other sites at any time, and configure your browser to block them. Instructions are available in each browser’s help pages:',
          },
          {
            kind: 'list',
            items: [
              '[Google Chrome](https://support.google.com/chrome/answer/95647)',
              '[Mozilla Firefox](https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox)',
              '[Safari](https://support.apple.com/en-gb/guide/safari/sfri11471/mac)',
              '[Microsoft Edge](https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)',
            ],
          },
        ],
      },
      {
        id: 'changes',
        heading: '6. Changes to this policy',
        blocks: [
          {
            kind: 'p',
            text: 'If we introduce cookies or measurement tools in the future, we will update this policy before activating them and put in place a prior, granular and revocable consent mechanism that makes refusing them as easy as accepting them.',
          },
        ],
      },
    ],
  },
}

export const LEGAL_DOCS: Record<Lang, Record<LegalDocKey, LegalDoc>> = { es: ES, en: EN }
