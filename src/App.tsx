import { Routes, Route } from 'react-router-dom'
import ArchicHome from './pages/ArchicHome'
import NotFound from './pages/NotFound'
import { LanguageProvider } from './i18n/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <div className="site-shell">
        <a href="#main-content" className="skip-link">Skip to content</a>
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
