import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import { useLang } from '../i18n/LanguageContext'
import '../styles/archic-light.css'
import '../styles/midas.css'

const GH = 'https://github.com/vornicx/Midas'
const INSTALL = 'uv tool install "midas-memory[mcp,local]"\nmidas init'
const COPY = {
  es: {
    seo: 'Midas — memoria local para agentes de IA | Archic Lab',
    desc: 'Memoria persistente de código abierto para agentes de IA. Local, trazable y sin llamadas a LLM durante la ingestión. Compatible con MCP.',
    back: 'Archic Lab', status: 'Código abierto · MIT', title: 'Una memoria que no empieza de cero.',
    lead: 'Midas conserva las decisiones, preferencias y contexto de tus agentes de IA entre sesiones. En tu equipo, bajo tu control.',
    install: 'Instalar Midas', docs: 'Ver documentación', copy: 'Copiar', copied: 'Copiado', copyError: 'Selecciona el comando para copiarlo.',
    terminal: 'Ejemplo ilustrativo · dos sesiones', session: 'Sesión 01 · Claude Code', next: 'Sesión 02 · Codex',
    remember: 'Decisión: usamos PostgreSQL.', recall: '¿Qué base de datos elegimos?', result: 'PostgreSQL · origen: sesión 01',
    featuresTitle: 'Memoria, no otra caja negra.',
    features: [
      ['01','Local por diseño','SQLite en tu equipo. Sin llamadas a un LLM para almacenar recuerdos.'],
      ['02','Trazabilidad','Recupera el texto original y su procedencia, no un resumen inventado.'],
      ['03','Memoria vigente','Revisa decisiones anteriores y permite olvidar recuerdos selectivamente.'],
      ['04','Control de acciones','El guard comprueba confirmaciones y vigencia antes de autorizar acciones basadas en memoria.'],
    ],
    proof: 'Medir antes de prometer.', proofDesc: 'Resultados publicados por el proyecto, reproducibles desde el repositorio. No son una evaluación independiente.',
    metrics: [['0,92','LongMemEval-s · recall@k'],['0,73','LoCoMo · recall@k'],['0,84','LongMemEval-s · tasa de respuesta evaluada con GPT-4o']],
    limitations: 'Midas prioriza recuperación trazable frente a resumir conversaciones completas. Consulta también los experimentos que no funcionaron.',
    bench: 'Metodología y resultados', installTitle: 'Un almacén. Tus agentes.', installDesc: 'Instala el paquete Python y ejecuta midas init para configurar los clientes MCP detectados. Python 3.11+; requiere uv.',
    compatible: 'Clientes compatibles según el repositorio', other: 'Alternativa TypeScript (experimental)', inspector: 'Inspecciona tu memoria', inspectorBody: 'Con midas inspect puedes revisar el almacén local y la procedencia de tus recuerdos.', final: 'Construido para la comunidad.', finalBody: 'Código abierto, licencia MIT y documentación pública. Desarrollado como parte de Archic Lab.',
  },
  en: {
    seo: 'Midas — local memory for AI agents | Archic Lab',
    desc: 'Open-source persistent memory for AI agents. Local, source-traceable and no LLM calls at ingest. Compatible with MCP.',
    back: 'Archic Lab', status: 'Open source · MIT', title: 'Memory that never starts from zero.',
    lead: 'Midas keeps your AI agents’ decisions, preferences and context across sessions. On your machine, under your control.',
    install: 'Install Midas', docs: 'Read the docs', copy: 'Copy', copied: 'Copied', copyError: 'Select the command to copy it.',
    terminal: 'Illustrative example · two sessions', session: 'Session 01 · Claude Code', next: 'Session 02 · Codex',
    remember: 'Decision: we use PostgreSQL.', recall: 'Which database did we choose?', result: 'PostgreSQL · source: session 01',
    featuresTitle: 'Memory, not another black box.',
    features: [
      ['01','Local by design','SQLite on your machine. No LLM calls to store memories.'],
      ['02','Source-traceable','Retrieve the original text and its provenance, not an invented summary.'],
      ['03','Current memory','Revise previous decisions and selectively forget memories.'],
      ['04','Action governance','The guard checks confirmation and currency before authorising memory-based actions.'],
    ],
    proof: 'Measure before promising.', proofDesc: 'Project-reported results, reproducible from the repository. Not an independent evaluation.',
    metrics: [['0.92','LongMemEval-s · recall@k'],['0.73','LoCoMo · recall@k'],['0.84','LongMemEval-s · judged answer rate with GPT-4o']],
    limitations: 'Midas prioritises traceable retrieval over whole-conversation summarisation. See the experiments that did not work, too.',
    bench: 'Methodology and results', installTitle: 'One store. Your agents.', installDesc: 'Install the Python package and run midas init to configure detected MCP clients. Python 3.11+; requires uv.',
    compatible: 'Supported clients according to the repository', other: 'TypeScript alternative (experimental)', inspector: 'Inspect your memory', inspectorBody: 'Run midas inspect to review the local store and the sources of your memories.', final: 'Built for the community.', finalBody: 'Open source, MIT-licensed and publicly documented. Built as part of Archic Lab.',
  },
} as const

export default function LabMidas() {
  const { lang } = useLang()
  const c = COPY[lang]
  const [copyStatus, setCopyStatus] = useState<'idle'|'success'|'error'>('idle')
  const es = 'https://archic.es/lab/midas/'
  const en = 'https://archic.es/en/lab/midas/'
  const canonical = lang === 'en' ? en : es
  async function copyInstall() {
    try { await navigator.clipboard.writeText(INSTALL); setCopyStatus('success') }
    catch { setCopyStatus('error') }
  }
  return <div className="al-site md-root">
    <Helmet htmlAttributes={{ lang }}>
      <title>{c.seo}</title><meta name="description" content={c.desc} />
      <meta name="theme-color" content="#1a1a2e" /><link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="es" href={es} /><link rel="alternate" hrefLang="en" href={en} /><link rel="alternate" hrefLang="x-default" href={es} />
      <meta property="og:title" content={c.seo} /><meta property="og:description" content={c.desc} /><meta property="og:url" content={canonical} />
      <script type="application/ld+json">{JSON.stringify({'@context':'https://schema.org','@type':'SoftwareApplication',name:'Midas',applicationCategory:'DeveloperApplication',description:c.desc,url:canonical,softwareHelp:GH,license:GH+'/blob/main/LICENSE',publisher:{'@type':'Organization',name:'Archic Lab',url:'https://archic.es/lab/'},inLanguage:lang})}</script>
    </Helmet>
    <StudioHeader />
    <main id="main-content" className="al-main" tabIndex={-1}>
      <section className="md-hero">
        <div className="al-shell md-hero-grid">
          <div className="md-hero-copy">
            <a className="md-back" href={lang === 'en' ? '/en/lab/' : '/lab/'}>← {c.back}</a>
            <p className="md-wordmark">Midas<span>.</span></p><p className="md-kicker">{c.status}</p>
            <h1>{c.title}</h1><p className="md-lead">{c.lead}</p>
            <div className="md-actions"><a className="md-button md-primary" href="#install">{c.install} ↓</a><a className="md-button" href={GH}>GitHub ↗</a></div>
          </div>
          <figure className="md-terminal">
            <figcaption><span className="md-dot" />{c.terminal}</figcaption>
            <div className="md-terminal-block"><small>{c.session}</small><p><span>›</span> {c.remember}</p><code>capture → SQLite</code></div>
            <div className="md-terminal-block"><small>{c.next}</small><p><span>›</span> {c.recall}</p><code>recall → source turn</code><p className="md-result">{c.result}</p></div>
            <div className="md-terminal-foot"><span>local</span><span>~/.midas/memory.sqlite3</span></div>
          </figure>
        </div>
      </section>
      <section className="al-shell md-section"><h2>{c.featuresTitle}</h2><div className="md-feature-grid">{c.features.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
      <section className="md-proof"><div className="al-shell md-section"><h2>{c.proof}</h2><p className="md-body">{c.proofDesc}</p><div className="md-metrics">{c.metrics.map(([n,label])=><article key={label}><strong>{n}</strong><p>{label}</p></article>)}</div><p className="md-body">{c.limitations}</p><a className="md-textlink" href={GH+'/blob/main/BENCHMARKS.md'}>{c.bench} ↗</a></div></section>
      <section id="install" className="al-shell md-section md-install"><div><h2>{c.installTitle}</h2><p className="md-body">{c.installDesc}</p><p className="md-client-label">{c.compatible}</p><div className="md-clients">{['Claude Code','Codex','Cursor','Gemini CLI','Windsurf','VS Code'].map(x=><span key={x}>{x}</span>)}</div></div><div className="md-install-code"><div><span>Terminal</span><button type="button" onClick={copyInstall}>{copyStatus==='success'?c.copied:c.copy}</button></div><pre><code>{INSTALL}</code></pre><p role="status">{copyStatus==='error'?c.copyError:copyStatus==='success'?c.copied:''}</p><small>{c.other}</small><pre><code>npx -y midas-memory-mcp</code></pre><a href={GH+'#connect-it-to-your-coding-agent'}>{c.docs} ↗</a></div></section>
      <section className="al-shell md-inspector"><div><h2>{c.inspector}</h2><p className="md-body">{c.inspectorBody}</p></div><code>midas inspect</code></section>
      <section className="md-end"><div className="al-shell md-section"><h2>{c.final}</h2><p className="md-body">{c.finalBody}</p><div className="md-actions"><a className="md-button md-primary" href={GH}>GitHub ↗</a><a className="md-button" href="https://pypi.org/project/midas-memory/">PyPI ↗</a><a className="md-button" href="https://www.npmjs.com/package/midas-memory-mcp">npm ↗</a></div></div></section>
    </main><StudioFooter />
  </div>
}
