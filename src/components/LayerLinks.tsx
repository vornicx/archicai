import { LAYER_LINKS } from '../data/resources'

export function LayerLinks({ layerId }: { layerId: string }) {
  const links = LAYER_LINKS[layerId]
  if (!links) return null

  const items = [
    links.doc && { label: 'Read docs', href: links.doc },
    links.repo && { label: 'View repo', href: links.repo },
    links.npm && { label: 'npm package', href: links.npm },
  ].filter(Boolean) as { label: string; href: string }[]

  if (items.length === 0) return null

  return (
    <div className="layer-links">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="layer-link"
        >
          {item.label} →
        </a>
      ))}
    </div>
  )
}
