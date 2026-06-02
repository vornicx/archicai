import Header from './components/Header'
import Hero from './components/Hero'
import Benchmarks from './components/Benchmarks'
import ArchTable from './components/ArchTable'
import Whitepaper from './components/Whitepaper'
import SdkSection from './components/SdkSection'
import ExtendedDocs from './components/ExtendedDocs'
import Footer from './components/Footer'
import MidasBackground from './components/MidasBackground'

function App() {
  return (
    <div className="site-shell">
      <MidasBackground />
      <Header />
      <main>
        <Hero />
        <Benchmarks />
        <ArchTable />
        <Whitepaper />
        <SdkSection />
        <ExtendedDocs />
      </main>
      <Footer />
    </div>
  )
}

export default App
