import { STATUS_LABELS, type LayerStatus } from '../data/ecosystem'

export function StatusBadge({ status }: { status: LayerStatus }) {
  const className =
    status === 'building'
      ? 'badge badge-active'
      : status === 'in-progress'
        ? 'badge badge-early'
        : 'badge badge-soon'

  return <span className={className}>{STATUS_LABELS[status]}</span>
}
