import { CORE_LAYERS } from '../data/ecosystem'
import { LAYER_LINKS } from '../data/resources'
import { StatusBadge } from './StatusBadge'

const CARD_COPY: Record<string, { tagline: string }> = {
  midas: { tagline: 'Python SDK. Pluggable embedders. Zero deps for core.' },
  eval: { tagline: 'recall@k, answer correctness, efficiency per token.' },
  archic: { tagline: 'The full ecosystem vision — parked for now.' },
}

function StackOverview() {
  return (
    <div className="product-grid">
      {CORE_LAYERS.map((layer) => (
        <article key={layer.id} className="product-card">
          <div className="product-card-top">
            <span className="product-name">{layer.name.charAt(0) + layer.name.slice(1).toLowerCase()}</span>
            <StatusBadge status={layer.status} />
          </div>
          <p className="product-role">{layer.role}</p>
          <p className="product-tagline">{CARD_COPY[layer.id]?.tagline ?? layer.desc}</p>
          {layer.package && (
            <p className="product-package">{layer.package}</p>
          )}
          {LAYER_LINKS[layer.id]?.repo && (
            <a
              href={LAYER_LINKS[layer.id].repo}
              target="_blank"
              rel="noopener noreferrer"
              className="product-link"
            >
              View repository →
            </a>
          )}
        </article>
      ))}
    </div>
  )
}

export default StackOverview
