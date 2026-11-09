import { Helmet } from 'react-helmet-async'
import '@fontsource-variable/geist/wght.css'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import { useLang } from '../i18n/LanguageContext'
import { SkyCredit, SKY_WIDE } from '../lab/skyAsset'
import { WeatherSpecimen } from '../lab/WeatherSpecimen'
import '../styles/archic-light.css'
import '../styles/archic-lab.css'

const COPY = {
  es: {
    label: 'Lab · productos propios',
    title: 'Lo que construimos para nosotros.',
    intro: 'Lab es la parte del estudio que diseña, publica y mantiene productos propios. Weather es el primero.',
    index: '01',
    status: 'Experimental · publicado',
    name: 'Weather',
    description: 'Predicción por horas con la lluvia en litros por metro cuadrado, la condición del cielo y la fuente siempre visible.',
    facts: [
      ['Fuente', 'Modelo de MET Norway, CC BY 4.0'],
      ['Lluvia', 'Acumulados de 6 y 24 h, solo con horas completas'],
      ['Límite', 'Predicción de modelo: sin avisos oficiales, radar ni estaciones'],
    ],
    open: 'Explorar Weather',
    studioTitle: 'El mismo método, para tu negocio.',
    studioBody: 'Weather se ha hecho como hacemos el software de clientes: datos reales, límites claros y diseño que se entiende.',
    studioLink: 'Software a medida',
    contact: 'Hablar de un proyecto',
  },
  en: {
    label: 'Lab · our own products',
    title: 'What we build for ourselves.',
    intro: 'Lab is where the studio designs, ships and maintains its own products. Weather is the first.',
    index: '01',
    status: 'Experimental · live',
    name: 'Weather',
    description: 'Hourly forecasts with rainfall in millimetres, the sky condition and the source always in view.',
    facts: [
      ['Source', 'MET Norway model, CC BY 4.0'],
      ['Rainfall', '6 and 24 h totals, from complete hours only'],
      ['Limits', 'A model forecast: no official warnings, radar or stations'],
    ],
    open: 'Explore Weather',
    studioTitle: 'The same method, for your business.',
    studioBody: 'Weather is built the way we build client software: real data, clear limits and design that reads at a glance.',
    studioLink: 'Custom software',
    contact: 'Discuss a project',
  },
} as const

export default function LabIndex() {
  const { lang } = useLang()
  const c = COPY[lang]
  const en = lang === 'en'
  const href = en ? '/en/lab/weather/' : '/lab/weather/'
  return (
    <div className="al-site lab-root">
      <Helmet htmlAttributes={{ lang }}>
        <title>{en ? 'Lab — products and experiments | Archic Lab' : 'Lab — productos y experimentos | Archic Lab'}</title>
        <meta name="description" content={c.intro + ' ' + c.description} />
        <meta name="theme-color" content="#F8F9FB" />
        <link rel="canonical" href={en ? 'https://archic.es/en/lab/' : 'https://archic.es/lab/'} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/lab/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/lab/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/lab/" />
      </Helmet>
      <StudioHeader />
      <main id="main-content" className="al-main" tabIndex={-1}>
        <header className="al-shell lab-head">
          <p className="al-label">{c.label}</p>
          <h1 className="lab-h1">{c.title}</h1>
          <p className="al-lead">{c.intro}</p>
        </header>

        <section className="al-shell lab-product" aria-labelledby="lab-product-title">
          <div className="lab-product-copy">
            <p className="lab-index"><span>{c.index}</span>{c.status}</p>
            <h2 id="lab-product-title" className="al-h2">{c.name}</h2>
            <p className="al-body">{c.description}</p>
            <dl className="lab-facts">
              {c.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            <div className="al-actions">
              <a className="al-btn al-btn-primary" href={href} data-archic-intent="lab:weather">{c.open}</a>
            </div>
          </div>
          <figure className="lab-stage">
            <img src={SKY_WIDE.src} srcSet={SKY_WIDE.srcSet} sizes="(max-width: 960px) 100vw, 60vw" width={1600} height={1000} alt="" decoding="async" />
            <a className="lab-stage-link" href={href} aria-label={c.open}><WeatherSpecimen lang={lang} /></a>
            <figcaption><SkyCredit lang={lang} /></figcaption>
          </figure>
        </section>

        <section className="al-shell lab-studio" aria-labelledby="lab-studio-title">
          <h2 id="lab-studio-title" className="al-h3">{c.studioTitle}</h2>
          <p className="al-body">{c.studioBody}</p>
          <div className="lab-studio-links">
            <a className="al-link" href={en ? '/en/control/' : '/control/'}>{c.studioLink} <span aria-hidden="true">→</span></a>
            <a className="al-link" href={en ? '/en/contact/' : '/contact/'}>{c.contact} <span aria-hidden="true">→</span></a>
          </div>
        </section>
      </main>
      <StudioFooter />
    </div>
  )
}
