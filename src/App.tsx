import Header from './components/Header'
import Hero from './components/Hero'
import Cycle from './components/Cycle'
import Ecosystem from './components/Ecosystem'
import Principles from './components/Principles'
import Composition from './components/Composition'
import Resources from './components/Resources'
import Builders from './components/Builders'
import ClosingCTA from './components/ClosingCTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen text-ink lab-canvas">
      <Header />
      <main>
        <Hero />
        <Cycle />
        <Ecosystem />
        <Principles />
          <Composition />
          <Resources />
          <Builders />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
