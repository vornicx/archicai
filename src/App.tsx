import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MidasBackground from './components/MidasBackground'
import ArchicHome from './pages/ArchicHome'
import MidasPage from './pages/MidasPage'
import MidasVsMem0 from './pages/MidasVsMem0'
import ComparisonsIndex from './pages/ComparisonsIndex'
import ComparisonPage from './pages/ComparisonPage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="site-shell">
      <MidasBackground />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ArchicHome />} />
          <Route path="/midas" element={<MidasPage />} />
          <Route path="/docs/comparisons" element={<ComparisonsIndex />} />
          <Route path="/docs/comparisons/midas-vs-mem0" element={<MidasVsMem0 />} />
          <Route path="/docs/comparisons/:slug" element={<ComparisonPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
