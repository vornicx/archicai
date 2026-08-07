/**
 * Diagrama del proceso: seis dovelas que cierran un arco.
 *
 * Es un acompañamiento visual, no el contenido: la lista ordenada con los seis
 * pasos sigue estando en el HTML, que es lo que leen el rastreador y el lector
 * de pantalla. Por eso el SVG va `aria-hidden`.
 */
import { STROKE } from './primitives'

const W = 880
const H = 260
/* Centro y radio del arco sobre el que se apoyan las dovelas. */
const CX = W / 2
const CY = 236
const R = 190

/** Punto sobre el arco, medido en grados desde la izquierda (180°) a la derecha (0°). */
function pointAt(deg: number, radius: number) {
  const rad = (deg * Math.PI) / 180
  return { x: CX - Math.cos(rad) * radius, y: CY - Math.sin(rad) * radius }
}

export default function ProcessArc({ steps = 6, className }: { steps?: number; className?: string }) {
  /* Se reparten dejando margen en los arranques para que la primera y la
     última dovela no queden pegadas al suelo. */
  const angles = Array.from({ length: steps }, (_, i) => 14 + (i * (180 - 28)) / (steps - 1))

  return (
    <svg
      className={`ar-process-arc ${className ?? ''}`}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Suelo */}
      <line x1="40" y1={CY} x2={W - 40} y2={CY} stroke="currentColor" strokeWidth={STROKE} opacity="0.28" />

      {/* Trasdós e intradós del arco */}
      <path
        d={`M ${CX - R - 26} ${CY} A ${R + 26} ${R + 26} 0 0 1 ${CX + R + 26} ${CY}`}
        stroke="currentColor"
        strokeWidth={STROKE}
        opacity="0.22"
      />
      <path
        d={`M ${CX - R + 26} ${CY} A ${R - 26} ${R - 26} 0 0 1 ${CX + R - 26} ${CY}`}
        stroke="currentColor"
        strokeWidth={STROKE}
        opacity="0.22"
      />

      {/* Dovelas: cada paso es una pieza que apoya en la anterior */}
      {angles.map((deg, i) => {
        const inner = pointAt(deg, R - 26)
        const outer = pointAt(deg, R + 26)
        const node = pointAt(deg, R)
        const last = i === steps - 1
        return (
          <g key={deg}>
            <line
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="currentColor"
              strokeWidth={STROKE}
              opacity="0.28"
            />
            <circle cx={node.x} cy={node.y} r="15" fill="var(--paper)" />
            <circle
              cx={node.x}
              cy={node.y}
              r="15"
              stroke="currentColor"
              strokeWidth={last ? STROKE * 1.8 : STROKE}
              opacity={last ? 1 : 0.55}
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              fontFamily="'IBM Plex Mono', ui-monospace, monospace"
              fontSize="11"
              fill="currentColor"
              opacity={last ? 1 : 0.7}
            >
              {String(i + 1).padStart(2, '0')}
            </text>
          </g>
        )
      })}

      {/* Clave: la pieza central que sostiene el conjunto una vez colocado */}
      <path
        d={`M ${CX - 15} ${CY - R - 30} L ${CX + 15} ${CY - R - 30} L ${CX + 11} ${CY - R - 4} L ${CX - 11} ${CY - R - 4} Z`}
        fill="var(--gold)"
        opacity="0.9"
      />
    </svg>
  )
}
