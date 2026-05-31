function ExtendedDocs() {
  return (
    <section id="extended-docs" className="section-border" style={{ borderBottom: '1px solid #161616', padding: '6rem 0' }}>
      <div className="container-page">
        <div className="section-label">System Reference // Core SDK Documentation</div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-16" style={{ marginTop: '2rem', alignItems: 'start' }}>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-5 font-mono text-[12px] uppercase tracking-wider" style={{ alignSelf: 'start' }}>
            <div className="font-semibold pb-2" style={{ color: '#FFFFFF', borderBottom: '1px solid #161616' }}>
              1. Architecture Overview
            </div>
            <a href="#state-consolidation" style={{ color: '#8A8A8A', textDecoration: 'none' }}>
              — State Consolidation
            </a>
            <a href="#graph-topology" style={{ color: '#8A8A8A', textDecoration: 'none' }}>
              — Graph Topology
            </a>

            <div className="font-semibold pt-6 pb-2" style={{ color: '#FFFFFF', borderBottom: '1px solid #161616' }}>
              2. Method Reference
            </div>
            <a href="#doc-commit" style={{ color: '#8A8A8A', textDecoration: 'none' }}>
              — Midas.commit()
            </a>
            <a href="#doc-recall" style={{ color: '#8A8A8A', textDecoration: 'none' }}>
              — Midas.recall()
            </a>

            <div className="font-semibold pt-6 pb-2" style={{ color: '#FFFFFF', borderBottom: '1px solid #161616' }}>
              3. System Control
            </div>
            <a href="#eval-harness" style={{ color: '#8A8A8A', textDecoration: 'none' }}>
              — Evaluation Harness
            </a>
          </aside>

          {/* Deep-Dive Content */}
          <div className="flex flex-col" style={{ gap: '5rem' }}>

            {/* Architecture Node */}
            <div id="state-consolidation">
              <h3 className="heading-serif" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                Asynchronous State Consolidation
              </h3>
              <p className="text-[14.5px] leading-relaxed mb-6" style={{ color: '#8A8A8A' }}>
                Traditional agent architectures accumulate tokens indefinitely, degrading
                underlying model attention mechanisms. Midas bypasses linear token growth by
                running an asynchronous compression and pruning worker pool directly parallel
                to your agent's event loop.
              </p>
              <p className="text-[14.5px] leading-relaxed" style={{ color: '#8A8A8A' }}>
                When state mutations are captured via <code className="font-mono" style={{ color: '#A78BFA' }}>commit()</code>,
                the execution frame is parsed, converted into invariant temporal nodes, and
                dynamically woven into the parent session graph.
              </p>
            </div>

            {/* Graph Topology */}
            <div id="graph-topology" style={{ borderTop: '1px solid #161616', paddingTop: '3rem' }}>
              <h3 className="heading-serif" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                Graph Topology
              </h3>
              <p className="text-[14.5px] leading-relaxed mb-6" style={{ color: '#8A8A8A' }}>
                The internal memory graph is a directed acyclic structure where each node
                represents an immutable execution frame. Edges encode temporal ordering and
                causal dependencies between agent actions, enabling deterministic traversal
                during recall operations.
              </p>
              <p className="text-[14.5px] leading-relaxed" style={{ color: '#8A8A8A' }}>
                Graph depth is bounded by the configured horizon parameter. Nodes exceeding
                the relevance threshold are consolidated into parent abstractions during
                background compression cycles, preserving semantic density while reducing
                traversal cost.
              </p>
            </div>

            {/* API Method: Commit */}
            <div id="doc-commit" style={{ borderTop: '1px solid #161616', paddingTop: '3rem' }}>
              <div className="font-mono text-[12px] mb-2" style={{ color: '#8A8A8A' }}>METHOD // INSTANCE</div>
              <h3 className="font-mono text-[1.4rem] font-medium mb-4" style={{ color: '#FFFFFF' }}>
                Midas.commit(statePayload)
              </h3>

              <p className="text-[14.5px] mb-8" style={{ color: '#8A8A8A' }}>
                Asynchronously pushes an immutable frame of the agent's environment,
                memory buffers, and action logs into the persistent state graph.
              </p>

              {/* Parameter Table */}
              <h4 className="font-mono text-[12px] uppercase tracking-wider mb-4" style={{ color: '#8A8A8A' }}>
                Arguments
              </h4>
              <table className="w-full text-[13.5px] mb-8" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #161616' }}>
                    <th className="font-mono text-[11px] pb-3 text-left" style={{ color: '#8A8A8A', width: '150px' }}>Property</th>
                    <th className="font-mono text-[11px] pb-3 text-left" style={{ color: '#8A8A8A', width: '100px' }}>Type</th>
                    <th className="font-mono text-[11px] pb-3 text-left" style={{ color: '#8A8A8A' }}>Description</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#8A8A8A' }}>
                  <tr style={{ borderBottom: '1px solid #161616' }}>
                    <td className="font-mono py-4" style={{ color: '#FFFFFF' }}>id</td>
                    <td className="font-mono">string</td>
                    <td>Unique descriptor for the atomic task session. Required.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #161616' }}>
                    <td className="font-mono py-4" style={{ color: '#FFFFFF' }}>logs</td>
                    <td className="font-mono">string[]</td>
                    <td>Raw execution traces generated during the last operational loop cycle.</td>
                  </tr>
                  <tr>
                    <td className="font-mono py-4" style={{ color: '#FFFFFF' }}>metadata</td>
                    <td className="font-mono">object</td>
                    <td>Optional dictionary for routing priorities, runtime flags, and fallback parameters.</td>
                  </tr>
                </tbody>
              </table>

              <div className="code-container">
                <div><span className="code-keyword">await</span> memory.commit({'{'}</div>
                <div>&nbsp;&nbsp;id: <span className="code-string">"session_usr_902"</span>,</div>
                <div>&nbsp;&nbsp;logs: [<span className="code-string">"tool_call: web_search"</span>, <span className="code-string">"eval_result: status_200"</span>],</div>
                <div>&nbsp;&nbsp;metadata: {'{'} workflow: <span className="code-string">"autonomous_research"</span> {'}'}</div>
                <div>{'}'});</div>
              </div>
            </div>

            {/* API Method: Recall */}
            <div id="doc-recall" style={{ borderTop: '1px solid #161616', paddingTop: '3rem' }}>
              <div className="font-mono text-[12px] mb-2" style={{ color: '#8A8A8A' }}>METHOD // INSTANCE</div>
              <h3 className="font-mono text-[1.4rem] font-medium mb-4" style={{ color: '#FFFFFF' }}>
                Midas.recall(query, options)
              </h3>

              <p className="text-[14.5px] mb-8" style={{ color: '#8A8A8A' }}>
                Queries the consolidated graph structure to rebuild a hyper-dense,
                contextually optimal string ready to be appended to the LLM prompt window.
              </p>

              {/* Parameter Table */}
              <h4 className="font-mono text-[12px] uppercase tracking-wider mb-4" style={{ color: '#8A8A8A' }}>
                Arguments
              </h4>
              <table className="w-full text-[13.5px] mb-8" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #161616' }}>
                    <th className="font-mono text-[11px] pb-3 text-left" style={{ color: '#8A8A8A', width: '150px' }}>Property</th>
                    <th className="font-mono text-[11px] pb-3 text-left" style={{ color: '#8A8A8A', width: '100px' }}>Type</th>
                    <th className="font-mono text-[11px] pb-3 text-left" style={{ color: '#8A8A8A' }}>Description</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#8A8A8A' }}>
                  <tr style={{ borderBottom: '1px solid #161616' }}>
                    <td className="font-mono py-4" style={{ color: '#FFFFFF' }}>query</td>
                    <td className="font-mono">string</td>
                    <td>Natural language query for semantic graph traversal. Required.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #161616' }}>
                    <td className="font-mono py-4" style={{ color: '#FFFFFF' }}>minConfidence</td>
                    <td className="font-mono">number</td>
                    <td>Minimum relevance threshold for node inclusion (0.0–1.0). Default: 0.7.</td>
                  </tr>
                  <tr>
                    <td className="font-mono py-4" style={{ color: '#FFFFFF' }}>depth</td>
                    <td className="font-mono">number</td>
                    <td>Maximum parent node traversal depth. Default: 2.</td>
                  </tr>
                </tbody>
              </table>

              <div className="code-container">
                <div><span className="code-keyword">const</span> context = <span className="code-keyword">await</span> memory.recall(<span className="code-string">"Retrieve Q3 operational trajectory updates"</span>, {'{'}</div>
                <div>&nbsp;&nbsp;minConfidence: <span className="code-keyword">0.78</span>,</div>
                <div>&nbsp;&nbsp;depth: <span className="code-keyword">3</span> <span className="code-comment">// Traverses up to 3 parent node relationships</span></div>
                <div>{'}'});</div>
              </div>
            </div>

            {/* Eval Harness */}
            <div id="eval-harness" style={{ borderTop: '1px solid #161616', paddingTop: '3rem' }}>
              <div className="font-mono text-[12px] mb-2" style={{ color: '#8A8A8A' }}>SYSTEM // CONTROL</div>
              <h3 className="font-mono text-[1.4rem] font-medium mb-4" style={{ color: '#FFFFFF' }}>
                Evaluation Harness
              </h3>

              <p className="text-[14.5px] mb-6" style={{ color: '#8A8A8A' }}>
                The evaluation harness ships with the SDK and runs deterministically on every
                code change. It measures Recall@K, answer recoverability, and token efficiency
                across standardized long-context conversation datasets.
              </p>

              <div className="code-container">
                <div><span className="code-comment"># Run the full evaluation suite</span></div>
                <div>uv run python -m eval.runner</div>
                <div style={{ marginTop: '0.5rem' }}><span className="code-comment"># Run against a specific dataset with local embeddings</span></div>
                <div>uv run python -m eval.runner --dataset locomo --local</div>
                <div style={{ marginTop: '0.5rem' }}><span className="code-comment"># Run with OpenAI embeddings</span></div>
                <div>uv run python -m eval.runner --dataset locomo --openai</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default ExtendedDocs
