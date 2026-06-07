import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Benchmarks from '../components/Benchmarks'
import ArchTable from '../components/ArchTable'
import Whitepaper from '../components/Whitepaper'
import SdkSection from '../components/SdkSection'
import ExtendedDocs from '../components/ExtendedDocs'

function MidasPage() {
  return (
    <>
      <Helmet>
        <title>Midas by Archic — Local-first agent memory</title>
        <meta
          name="description"
          content="Midas is a framework-agnostic Python SDK and evaluation harness for durable AI agent context. Local-first, eval-first memory for long-horizon agents."
        />
        <link rel="canonical" href="https://archic.es/midas" />
        <meta property="og:title" content="Midas by Archic — Local-first agent memory" />
        <meta property="og:description" content="Framework-agnostic Python SDK and evaluation harness for durable AI agent context." />
        <meta property="og:url" content="https://archic.es/midas" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Midas',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Python',
          description:
            'Local-first, eval-first memory framework for long-horizon AI agents. Python SDK, MCP server, source-traceable recall, no LLM at ingest.',
          url: 'https://archic.es/midas',
          publisher: { '@type': 'Organization', name: 'Archic', url: 'https://archic.es/' },
        })}</script>
      </Helmet>
      <Hero />
      <Benchmarks />
      <ArchTable />
      <Whitepaper />
      <SdkSection />
      <ExtendedDocs />
    </>
  )
}

export default MidasPage
