import { Helmet } from 'react-helmet-async'
import '@fontsource-variable/geist/wght.css'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import { useLang } from '../i18n/LanguageContext'
import { SkyCredit, SKY_WIDE } from '../lab/skyAsset'
import '../styles/archic-light.css'
import '../styles/archic-lab.css'

const COPY = {
  es: {
    label: 'Archic Lab',
    title: 'El tiempo, con contexto.',
    intro: 'Lab es donde Archic Lab desarrolla productos propios. El primero es Weather.',
    status: 'Versión experimental',
    name: 'Weather',
    description: 'Predicción meteorológica por horas con la lluvia en litros por metro cuadrado y la fuente siempre visible.',
    facts: [
      ['Fuente', 'Modelo de MET Norway (CC BY 4.0)'],
      ['Lluvia', 'Acumulado de 6 y 24 horas en l/m²'],
      ['Límite', 'Es una predicción de modelo: sin avisos oficiales, radar ni estaciones'],
    ],
    open: 'Explorar Weather',
    back: 'Volver al inicio',
  },
  en: {
    label: 'Archic Lab',
    title: 'Weather, in context.',
    intro: 'Lab is where Archic Lab builds its own products. The first one is Weather.',
    status: 'Experimental release',
    name: 'Weather',
    description: 'Hourly weather forecasts with rainfall in millimetres and the source always in view.',
    facts: [
      ['Source', 'MET Norway model forecast (CC BY 4.0)'],
      ['Rainfall', '6 and 24 hour totals in mm (l/m²)'],
      ['Limits', 'A model forecast: no official warnings, radar or station data'],
    ],
    open: 'Explore Weather',
    back: 'Back to home',
  },
} as const

export default function LabIndex() {
  const { lang } = useLang()
  const c = COPY[lang]
  const href = lang === 'en' ? '/en/lab/weather/' : '/lab/weather/'
  return (
    <div className="al-site lab-root">
      <Helmet htmlAttributes={{ lang }}>
        <title>{lang === 'es' ? 'Lab — productos y experimentos | Archic Lab' : 'Lab — products and experiments | Archic Lab'}</title>
        <meta name="description" content={c.intro + ' ' + c.description} />
        <meta name="theme-color" content="#F8F9FB" />
        <link rel="canonical" href={lang === 'en' ? 'https://archic.es/en/lab/' : 'https://archic.es/lab/'} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/lab/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/lab/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/lab/" />
      </Helmet>
      <StudioHeader />
      <main id="main-content" className="al-main" tabIndex={-1}>
        <section className="al-shell lab-hero">
          <p className="al-label">{c.label}</p>
          <h1 className="al-h1">{c.title}</h1>
          <p className="al-lead">{c.intro}</p>
        </section>
        <section className="al-shell lab-product" aria-labelledby="lab-product-title">
          <a className="lab-product-media" href={href} tabIndex={-1} aria-hidden="true">
            <img src={SKY_WIDE.src} srcSet={SKY_WIDE.srcSet} sizes="(max-width: 960px) 100vw, 55vw" width={1600} height={1000} alt="" decoding="async" />
          </a>
          <div className="lab-product-copy">
            <p className="lab-status">{c.status}</p>
            <h2 id="lab-product-title" className="al-h2">{c.name}</h2>
            <p className="al-body">{c.description}</p>
            <dl className="lab-facts">
              {c.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            <div className="al-actions">
              <a className="al-btn al-btn-primary" href={href}>{c.open}</a>
              <a className="al-link" href={lang === 'en' ? '/en/' : '/'}>{c.back}</a>
            </div>
          </div>
        </section>
        <div className="al-shell"><SkyCredit lang={lang} /></div>
      </main>
      <StudioFooter />
    </div>
  )
}
