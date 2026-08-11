type ProductPage = 'presence' | 'control' | 'business' | 'studio'

export default function ArchicProductObject({ page }: { page: ProductPage }) {
  if (page === 'presence') {
    return (
      <div className="a26-object a26-object-presence" aria-hidden="true" data-reveal>
        <div className="a26-object-top"><span>ARCHIC / PRESENCE</span><span>01</span></div>
        <div className="a26-presence-frame">
          <div className="a26-presence-nav"><span>ATELIER / 2026</span><i /></div>
          <strong>Make the<br /><em>first impression</em><br />count.</strong>
          <div className="a26-presence-foot"><span>DIRECTION</span><span>EXPERIENCE</span><span>CONVERSION</span></div>
        </div>
      </div>
    )
  }

  if (page === 'control') {
    return (
      <div className="a26-object a26-object-control" aria-hidden="true" data-reveal>
        <div className="a26-object-top"><span>ARCHIC / CONTROL</span><span>02</span></div>
        <div className="a26-control-head"><span>TODAY / OPERATIONS</span><strong>18:42</strong></div>
        <div className="a26-control-list">
          <div><span>20:00</span><strong>Martínez · 4</strong><i>CONFIRMED</i></div>
          <div><span>20:30</span><strong>Alonso · 2</strong><i>ARRIVING</i></div>
          <div><span>21:00</span><strong>Private · 8</strong><i>TABLE 12</i></div>
        </div>
        <div className="a26-control-axis"><span>CLIENTS</span><i /><span>RESOURCES</span><i /><span>SERVICE</span></div>
      </div>
    )
  }

  if (page === 'business') {
    return (
      <div className="a26-object a26-object-business" aria-hidden="true" data-reveal>
        <div className="a26-object-top"><span>ARCHIC / BUSINESS</span><span>03</span></div>
        <div className="a26-business-map">
          <div className="a26-node a26-node-a"><span>INPUT</span><strong>CRM</strong></div>
          <div className="a26-node a26-node-b"><span>LOGIC</span><strong>ARCHIC</strong></div>
          <div className="a26-node a26-node-c"><span>OUTPUT</span><strong>ERP</strong></div>
          <div className="a26-node a26-node-d"><span>DATA</span><strong>BI</strong></div>
          <i className="a26-line a26-line-a" />
          <i className="a26-line a26-line-b" />
          <i className="a26-line a26-line-c" />
        </div>
        <div className="a26-business-foot"><span>AUTOMATION</span><span>INTEGRATION</span><span>DATA</span></div>
      </div>
    )
  }

  return (
    <div className="a26-object a26-object-studio" aria-hidden="true" data-reveal>
      <div className="a26-object-top"><span>ARCHIC / STUDIO</span><span>04</span></div>
      <div className="a26-studio-stack">
        <div><span>01</span><strong>Understand</strong></div>
        <div><span>02</span><strong>Direct</strong></div>
        <div><span>03</span><strong>Build</strong></div>
        <div><span>04</span><strong>Refine</strong></div>
      </div>
      <div className="a26-studio-mark"><span>SUPERVISED AI</span><i /><span>HUMAN JUDGEMENT</span></div>
    </div>
  )
}
