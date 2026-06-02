function SdkSection() {
  return (
    <section id="docs" className="section-border section-padding">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="section-label">Python SDK</div>
            <h2 className="heading-serif text-[2.7rem] md:text-[3.6rem]">Memory as an agent primitive.</h2>
            <p className="text-muted mt-5 max-w-[520px] leading-relaxed">
              The near-term product is intentionally simple: store useful memories,
              retrieve relevant context and evaluate whether the returned context
              improves long-horizon answers.
            </p>
          </div>

          <div className="code-container">
            <div><span className="code-comment"># framework-agnostic Midas shape</span></div>
            <div><span className="code-keyword">from</span> midas.memory <span className="code-keyword">import</span> Memory</div>
            <div className="mt-4">memory = Memory()</div>
            <div className="mt-4">memory.remember(</div>
            <div>&nbsp;&nbsp;<span className="code-string">"The user wants Archic focused on Midas."</span>,</div>
            <div>&nbsp;&nbsp;kind=<span className="code-string">"project_fact"</span>,</div>
            <div>&nbsp;&nbsp;importance=5,</div>
            <div>)</div>
            <div className="mt-4">context = memory.build_context(</div>
            <div>&nbsp;&nbsp;<span className="code-string">"What should the agent remember before editing the site?"</span>,</div>
            <div>&nbsp;&nbsp;token_budget=1024,</div>
            <div>)</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SdkSection
