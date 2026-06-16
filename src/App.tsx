import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MidasBackground from './components/MidasBackground'
import EcosystemBar from './components/EcosystemBar'
import ArchicHome from './pages/ArchicHome'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <MidasBackground />
      <EcosystemBar />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<ArchicHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
