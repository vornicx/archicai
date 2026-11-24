import { useLang } from '../i18n/LanguageContext'

const COPY = {
  es: {
    label: 'Archic Studio · Precios',
    title: 'Webs sencillas. Problemas resueltos.',
    lead: 'Un precio claro. Tú decides dónde publicarla.',
    web: 'Tu página web',
    once: 'Pago único',
    includes: ['Diseño y desarrollo centrados en tu negocio', 'Entrega de los archivos en ZIP', 'Guía para publicar con IONOS u otro proveedor compatible'],
    order: 'Solicitar mi web',
    publish: 'Publicación opcional',
    publishBody: 'La publicamos por ti de forma remota en Cloudflare, en una cuenta creada exclusivamente para tu negocio y bajo tu control.',
    total: '398 € en total con la web',
    publishOrder: 'Solicitar web + publicación',
    other: 'Otros servicios',
    otherBody: 'Software a medida, automatización, integraciones, mantenimiento y otros proyectos.',
    quote: 'Bajo presupuesto',
    consult: 'Consultar proyecto',
    note: 'El dominio y los posibles costes de alojamiento o servicios externos se contratan aparte. Las funciones avanzadas se presupuestan por separado.',
  },
  en: {
    label: 'Archic Studio · Pricing',
    title: 'Simple websites. Real problems solved.',
    lead: 'One clear price. You decide where to publish.',
    web: 'Your website',
    once: 'One-time payment',
    includes: ['Design and development focused on your business', 'Website files delivered as a ZIP', 'Publishing guide for IONOS or another compatible provider'],
    order: 'Request a website',
    publish: 'Optional publishing',
    publishBody: 'We deploy it remotely on Cloudflare, in an account created exclusively for your business and under your control.',
    total: '€398 total including the website',
    publishOrder: 'Request website + publishing',
    other: 'Other services',
    otherBody: 'Custom software, automation, integrations, maintenance and other projects.',
    quote: 'On request',
    consult: 'Discuss a project',
    note: 'Domain and any hosting or external service costs are separate. Advanced features are quoted separately.',
  },
} as const

export default function StudioPricing({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang()
  const c = COPY[lang]
  const en = lang === 'en'
  const contact = en ? '/en/contact/' : '/contact/'
  return (
    <section className="al-pricing al-section" id="pricing" aria-label={c.label} data-archic-view="studio-pricing">
      <div className="al-shell">
        <header className="al-section-head">
          <div><p className="al-label">{c.label}</p><h2 className="al-h2">{c.title}</h2></div>
          <p className="al-body">{c.lead}</p>
        </header>
        <div className="al-pricing-grid">
          <article className="al-price-card">
            <h3>{c.web}</h3>
            <p className="al-price-value">{en ? '€349' : '349 €'}</p>
            <p className="al-price-meta">{c.once}</p>
            <ul>{c.includes.map(item => <li key={item}>{item}</li>)}</ul>
            <a className="al-btn al-btn-primary" href={contact + '?intent=website'} data-archic-intent="pricing:website">{c.order}</a>
          </article>
          <article className="al-price-card">
            <h3>{c.publish}</h3>
            <p className="al-price-value">{en ? '+€49' : '+49 €'}</p>
            <p className="al-price-meta">{c.once}</p>
            <p>{c.publishBody}</p>
            <p className="al-price-total">{c.total}</p>
            <a className="al-btn al-btn-quiet" href={contact + '?intent=website-publish'} data-archic-intent="pricing:publish">{c.publishOrder}</a>
          </article>
          {!compact && <article className="al-price-card">
            <h3>{c.other}</h3><p className="al-price-quote">{c.quote}</p><p>{c.otherBody}</p>
            <a className="al-btn al-btn-quiet" href={contact + '?intent=custom'} data-archic-intent="pricing:custom">{c.consult}</a>
          </article>}
        </div>
        {compact && <p className="al-price-other">{c.otherBody} <a className="al-link" href={contact + '?intent=custom'}>{c.quote} →</a></p>}
        <p className="al-price-note">{c.note}</p>
      </div>
    </section>
  )
}
