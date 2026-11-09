import { Helmet } from 'react-helmet-async'
import '@fontsource/instrument-serif/latin-400.css'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import { useLang } from '../i18n/LanguageContext'
import '../styles/archic-lab.css'

const COPY = {
  es: {
    title: 'Ideas que se convierten en herramientas.',
    intro: 'Archic Lab es nuestro espacio de productos propios: experimentos creados para resolver problemas cotidianos con diseño, datos y tecnología.',
    project: '001 / PRIMER PRODUCTO',
    subtitle: 'El tiempo, sin rodeos.',
    description: 'Lluvia en litros por metro cuadrado, predicciones con fuente y una interfaz que pone los datos por delante del ruido.',
    open: 'Explorar Weather',
    status: 'Versión experimental',
    notes: ['Previsión meteorológica con procedencia', 'Acumulados de lluvia visibles', 'Información técnica bajo demanda'],
    limitation: 'Por ahora, Weather muestra pronósticos de modelos. Avisos oficiales, estaciones y radar se añadirán más adelante.',
    back: 'Volver a Archic',
  },
  en: {
    title: 'Ideas turned into useful tools.',
    intro: 'Archic Lab is where we develop original products: focused experiments designed to solve everyday problems through design, data and technology.',
    project: '001 / FIRST PRODUCT',
    subtitle: 'Weather without the noise.',
    description: 'Rainfall in millimetres, forecasts with clear attribution and an interface that keeps the data in focus.',
    open: 'Explore Weather',
    status: 'Experimental release',
    notes: ['Transparent forecast provenance', 'Visible rainfall totals', 'Technical information on demand'],
    limitation: 'Weather currently displays model forecasts. Official alerts, stations and radar will follow in later releases.',
    back: 'Back to Archic',
  },
} as const

export default function LabIndex() {
  const { lang } = useLang()
  const c = COPY[lang]
  const href = lang === 'en' ? '/en/lab/weather/' : '/lab/weather/'
  return (
    <div className="as-site lab-root">
      <Helmet htmlAttributes={{ lang }}>
        <title>{lang === 'es' ? 'Archic Lab — productos y experimentos' : 'Archic Lab — products and experiments'}</title>
        <meta name="description" content={c.intro} />
        <link rel="canonical" href={lang === 'en' ? 'https://archic.es/en/lab/' : 'https://archic.es/lab/'} />
        <link rel="alternate" hrefLang="es" href="https://archic.es/lab/" />
        <link rel="alternate" hrefLang="en" href="https://archic.es/en/lab/" />
        <link rel="alternate" hrefLang="x-default" href="https://archic.es/lab/" />
      </Helmet>
      <StudioHeader />
      <main id="main-content" className="lab-main" tabIndex={-1}>
        <div className="lab-container">
          <p className="lab-kicker">ARCHIC / LAB</p>
          <h1 className="lab-title">{c.title}</h1>
          <p className="lab-intro">{c.intro}</p>
          <section className="lab-product" aria-labelledby="lab-product-title">
            <div className="lab-product-heading">
              <span>{c.project}</span>
              <span className="lab-status">{c.status}</span>
            </div>
            <div className="lab-product-body">
              <div>
                <h2 id="lab-product-title">Weather.</h2>
                <strong className="lab-subtitle">{c.subtitle}</strong>
                <p>{c.description}</p>
                <a className="lab-action" href={href}>{c.open} <span aria-hidden="true">↗</span></a>
              </div>
              <div className="lab-product-preview" aria-hidden="true">
                <div className="lab-preview-disc" />
                <span>ARCHIC LAB / 001</span>
                <strong>mm.</strong>
              </div>
            </div>
            <div className="lab-principles">{c.notes.map((note, index) => <span key={note}>0{index + 1} — {note}</span>)}</div>
          </section>
          <p className="lab-disclaimer">{c.limitation}</p>
          <a href={lang === 'en' ? '/en/' : '/'} className="lab-back">← {c.back}</a>
        </div>
      </main>
      <StudioFooter />
    </div>
  )
}
