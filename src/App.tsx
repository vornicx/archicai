import { Routes, Route } from 'react-router-dom'
import ArchicHome from './pages/ArchicHome'
import NotFound from './pages/NotFound'
import { LanguageProvider, useLang } from './i18n/LanguageContext'

function SkipLink() {
  const { t } = useLang()
  return (
    <a href="#main-content" className="skip-link">
      {t.a11y.skip}
    </a>
  )
}

function App() {
  return (
    <LanguageProvider>
      <div className="site-shell">
        <SkipLink />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<ArchicHome />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </LanguageProvider>
  )
}

export default App
