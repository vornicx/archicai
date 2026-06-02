import { useState } from 'react'
import { Reveal } from '../useReveal'
import {
  LAYERS,
  ZONE_LABELS,
  ZONE_ORDER,
  type ArchicLayer,
} from '../data/ecosystem'
import { StatusBadge } from './StatusBadge'
import { LayerLinks } from './LayerLinks'

function Ecosystem() {
  const [selected, setSelected] = useState<string>('midas')

  const selectedLayer =
    LAYERS.find((l) => l.id === selected) ?? LAYERS[0]

  return (
    <section id="ecosystem" className="relative py-20 md:py-28 px-6">
      <div className="mx-auto max-w-page">
        <Reveal>
          <p className="section-eyebrow mb-4">The wedge</p>
          <h2 className="section-title mb-4">Midas is what we&apos;re building now.</h2>
          <p className="section-lead mb-14">
            Agentic memory for long-horizon agents, proven through honest benchmarks. The wider
            Archic platform vision is parked while Midas ships as the first focused wedge.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="ecosystem-layout">
            <div className="ecosystem-map">
              {ZONE_ORDER.map((zone) => {
                const items = LAYERS.filter((l) => l.zone === zone)
                if (items.length === 0) return null

                return (
                  <div key={zone}>
                    <span className="ecosystem-zone-label">{ZONE_LABELS[zone]}</span>
                    <div className="space-y-2">
                      {items.map((layer) => (
                        <LayerChip
                          key={layer.id}
                          layer={layer}
                          selected={selected === layer.id}
                          onSelect={() => setSelected(layer.id)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <LayerDetail layer={selectedLayer} />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="contrast-strip mt-16">
            <div className="contrast-card">
              <span className="contrast-label">Old approach</span>
              <p className="contrast-title">Keyword overlap retrieval. No benchmarks. Claims without measurement.</p>
            </div>
            <div className="contrast-card contrast-card-good">
              <span className="contrast-label">Midas</span>
              <p className="contrast-title">Semantic retrieval. Eval-first design. 0.76 recall@k vs 0.06 baseline.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function LayerChip({
  layer,
  selected,
  onSelect,
}: {
  layer: ArchicLayer
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className={`layer-chip ${layer.status === 'planned' ? 'chip-dim' : ''} ${selected ? 'layer-chip-selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-ink">{layer.name.charAt(0) + layer.name.slice(1).toLowerCase()}</span>
        <StatusBadge status={layer.status} />
      </div>
      {layer.verb && <span className="layer-chip-verb">{layer.verb}</span>}
    </button>
  )
}

function LayerDetail({ layer }: { layer: ArchicLayer }) {
  const name = layer.name.charAt(0) + layer.name.slice(1).toLowerCase()

  return (
    <div className="layer-detail">
      <div className="layer-detail-header">
        <div>
          <p className="layer-detail-name">{name}</p>
          <p className="layer-detail-role">{layer.role}</p>
        </div>
        <StatusBadge status={layer.status} />
      </div>

      {layer.verb && (
        <p className="layer-detail-verb">
          {name} <span className="text-ink-faint">{layer.verb}</span>
        </p>
      )}

      {layer.package && <p className="layer-detail-package">{layer.package}</p>}

      <p className="text-[15px] text-ink-muted leading-relaxed mt-5">{layer.desc}</p>
      <p className="text-sm text-ink-faint leading-relaxed mt-4 pt-4 border-t border-line">{layer.detail}</p>

      <div className="flex gap-2 mt-5 flex-wrap">
        {layer.tags.map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>

      <LayerLinks layerId={layer.id} />
    </div>
  )
}

export default Ecosystem
