/**
 * Mockups vectoriales de los proyectos de ejemplo.
 *
 * La sección de proyectos era una lista de texto: para un estudio que vende
 * diseño, eso es la peor carta de presentación posible. Estos dibujos enseñan
 * la *forma* de cada solución sin fingir que son capturas de un cliente real
 * (la etiqueta «ejemplo conceptual» sigue estando en el HTML, no solo aquí).
 *
 * Cada pieza usa un chasis distinto —navegador, aplicación de escritorio,
 * móvil en planta, lienzo, documento— para que la retícula no se lea como
 * cinco veces lo mismo.
 */
import { archPath, STROKE } from './primitives'

const W = 720
const H = 480

type ArtProps = { className?: string }

/** Lienzo común: relación 3:2, sin fondo propio para heredar el de la tarjeta. */
function Canvas({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      className={`ar-art ${className ?? ''}`}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      {children}
    </svg>
  )
}

/** Chasis de navegador: marco, barra de título y pastilla de URL. */
function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="12" fill="var(--card)" stroke="var(--line)" strokeWidth={STROKE} />
      <path d={`M0 12 A12 12 0 0 1 12 0 H${W - 12} A12 12 0 0 1 ${W} 12 V44 H0 Z`} fill="var(--paper-2)" />
      <line x1="0" y1="44" x2={W} y2="44" stroke="var(--line)" strokeWidth={STROKE} />
      <circle cx="26" cy="22" r="4.5" fill="var(--ink)" opacity="0.18" />
      <circle cx="44" cy="22" r="4.5" fill="var(--ink)" opacity="0.13" />
      <circle cx="62" cy="22" r="4.5" fill="var(--ink)" opacity="0.09" />
      <rect x="88" y="13" width="240" height="18" rx="9" fill="var(--paper)" stroke="var(--line-soft)" strokeWidth={STROKE} />
      <rect x="100" y="20" width="86" height="4" rx="2" fill="var(--ink)" opacity="0.28" />
      {children}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   01 · Web corporativa con catálogo
   ───────────────────────────────────────────────────────────────────────── */

export function ArtCatalog({ className }: ArtProps) {
  const cards = [0, 1, 2].map((i) => 40 + i * 216)
  return (
    <Canvas className={className}>
      <BrowserChrome>
        {/* Portada: banda oscura con el arco de marca recortado en oro */}
        <rect x="0" y="44" width={W} height="196" fill="var(--blue-deep)" />
        <path d={archPath(520, 74, 152, 166)} fill="none" stroke="var(--gold)" strokeWidth={STROKE * 1.6} opacity="0.75" />
        <path d={archPath(556, 110, 80, 130)} fill="var(--gold)" opacity="0.14" />
        <rect x="48" y="96" width="300" height="14" rx="7" fill="#fdfaf4" opacity="0.92" />
        <rect x="48" y="122" width="228" height="14" rx="7" fill="#fdfaf4" opacity="0.92" />
        <rect x="48" y="158" width="332" height="5" rx="2.5" fill="#fdfaf4" opacity="0.42" />
        <rect x="48" y="172" width="270" height="5" rx="2.5" fill="#fdfaf4" opacity="0.42" />
        <rect x="48" y="196" width="132" height="30" rx="15" fill="var(--gold)" opacity="0.9" />

        {/* Catálogo: tres fichas de producto con la imagen rematada en arco */}
        {cards.map((x, i) => (
          <g key={x}>
            <rect x={x} y="276" width="184" height="168" rx="8" fill="var(--paper)" stroke="var(--line-soft)" strokeWidth={STROKE} />
            <path d={archPath(x + 52, 292, 80, 74)} fill="var(--blue)" opacity={0.1 + i * 0.04} />
            <rect x={x + 24} y="386" width="112" height="6" rx="3" fill="var(--ink)" opacity="0.55" />
            <rect x={x + 24} y="402" width="136" height="4" rx="2" fill="var(--ink)" opacity="0.22" />
            <rect x={x + 24} y="416" width="72" height="4" rx="2" fill="var(--ink)" opacity="0.22" />
          </g>
        ))}
      </BrowserChrome>
    </Canvas>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   02 · Inventario y predicción de pedidos
   ───────────────────────────────────────────────────────────────────────── */

export function ArtInventory({ className }: ArtProps) {
  /* Consumo histórico (barras) y previsión (línea de puntos que lo continúa). */
  const history = [58, 74, 66, 92, 80, 104, 96, 118]
  const forecast = [126, 138, 132]
  const baseY = 404
  const barW = 26
  const gap = 16
  const chartX = 214

  return (
    <Canvas className={className}>
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="12" fill="var(--card)" stroke="var(--line)" strokeWidth={STROKE} />

      {/* Barra lateral */}
      <path d={`M0 12 A12 12 0 0 1 12 0 H176 V${H} H12 A12 12 0 0 1 0 ${H - 12} Z`} fill="var(--paper-2)" />
      <line x1="176" y1="0" x2="176" y2={H} stroke="var(--line)" strokeWidth={STROKE} />
      <rect x="28" y="28" width="26" height="26" rx="6" fill="var(--blue)" />
      <rect x="64" y="37" width="58" height="8" rx="4" fill="var(--ink)" opacity="0.4" />
      {[92, 126, 160, 194, 228].map((y, i) => (
        <g key={y}>
          {i === 1 && <rect x="16" y={y - 11} width="146" height="30" rx="6" fill="var(--blue)" opacity="0.1" />}
          <rect x="28" y={y - 5} width="10" height="10" rx="2.5" fill="var(--ink)" opacity={i === 1 ? 0.5 : 0.22} />
          <rect x="48" y={y - 3} width={i === 1 ? 88 : 74} height="6" rx="3" fill="var(--ink)" opacity={i === 1 ? 0.5 : 0.22} />
        </g>
      ))}

      {/* Cabecera */}
      <rect x="214" y="34" width="180" height="10" rx="5" fill="var(--ink)" opacity="0.6" />
      <rect x="214" y="56" width="252" height="5" rx="2.5" fill="var(--ink)" opacity="0.24" />

      {/* Tres indicadores */}
      {[
        { x: 214, label: 0.55, accent: 'var(--blue)' },
        { x: 384, label: 0.45, accent: 'var(--blue)' },
        { x: 554, label: 0.45, accent: 'var(--gold)' },
      ].map((kpi, i) => (
        <g key={kpi.x}>
          <rect x={kpi.x} y="92" width="152" height="76" rx="8" fill="var(--paper)" stroke="var(--line-soft)" strokeWidth={STROKE} />
          <rect x={kpi.x + 18} y="112" width="52" height="4" rx="2" fill="var(--ink)" opacity="0.28" />
          <rect x={kpi.x + 18} y="128" width={72 - i * 12} height="14" rx="4" fill={kpi.accent} opacity="0.8" />
          <rect x={kpi.x + 18} y="150" width="94" height="4" rx="2" fill="var(--ink)" opacity="0.18" />
        </g>
      ))}

      {/* Serie histórica + previsión */}
      <line x1={chartX} y1={baseY} x2={W - 40} y2={baseY} stroke="var(--line)" strokeWidth={STROKE} />
      {history.map((h, i) => (
        <rect
          key={i}
          x={chartX + i * (barW + gap)}
          y={baseY - h}
          width={barW}
          height={h}
          rx="3"
          fill="var(--blue)"
          opacity={0.32 + i * 0.055}
        />
      ))}
      {forecast.map((h, i) => (
        <rect
          key={`f${i}`}
          x={chartX + (history.length + i) * (barW + gap)}
          y={baseY - h}
          width={barW}
          height={h}
          rx="3"
          fill="none"
          stroke="var(--gold)"
          strokeWidth={STROKE * 1.2}
          strokeDasharray="4 4"
        />
      ))}
      <path
        d={history
          .map((h, i) => `${i === 0 ? 'M' : 'L'} ${chartX + i * (barW + gap) + barW / 2} ${baseY - h - 16}`)
          .join(' ')}
        stroke="var(--gold)"
        strokeWidth={STROKE * 1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d={`M ${chartX + (history.length - 1) * (barW + gap) + barW / 2} ${baseY - history[history.length - 1] - 16} ${forecast
          .map((h, i) => `L ${chartX + (history.length + i) * (barW + gap) + barW / 2} ${baseY - h - 16}`)
          .join(' ')}`}
        stroke="var(--gold)"
        strokeWidth={STROKE * 1.6}
        strokeDasharray="5 5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <rect x={chartX} y="212" width="120" height="6" rx="3" fill="var(--ink)" opacity="0.3" />
    </Canvas>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   03 · Panel de producción y calidad, consultado en planta
   ───────────────────────────────────────────────────────────────────────── */

export function ArtProduction({ className }: ArtProps) {
  const lines = [
    { label: 'L1', pct: 0.86, tone: 'var(--blue)' },
    { label: 'L2', pct: 0.62, tone: 'var(--blue)' },
    { label: 'L3', pct: 0.34, tone: 'var(--gold)' },
    { label: 'L4', pct: 0.78, tone: 'var(--blue)' },
  ]
  return (
    <Canvas className={className}>
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="12" fill="var(--card)" stroke="var(--line)" strokeWidth={STROKE} />
      <path d={`M0 12 A12 12 0 0 1 12 0 H${W - 12} A12 12 0 0 1 ${W} 12 V72 H0 Z`} fill="var(--blue-deep)" />
      <rect x="36" y="28" width="150" height="10" rx="5" fill="#fdfaf4" opacity="0.9" />
      <rect x="36" y="48" width="96" height="5" rx="2.5" fill="#fdfaf4" opacity="0.4" />
      <circle cx={W - 54} cy="36" r="6" fill="var(--gold)" />

      {/* Líneas de producción con su avance */}
      {lines.map((line, i) => {
        const y = 116 + i * 66
        return (
          <g key={line.label}>
            <rect x="36" y={y - 22} width="404" height="52" rx="8" fill="var(--paper)" stroke="var(--line-soft)" strokeWidth={STROKE} />
            <circle cx="62" cy={y + 4} r="9" fill={line.tone} opacity="0.16" />
            <circle cx="62" cy={y + 4} r="3.5" fill={line.tone} />
            <rect x="84" y={y - 6} width="54" height="6" rx="3" fill="var(--ink)" opacity="0.5" />
            <rect x="84" y={y + 8} width="96" height="4" rx="2" fill="var(--ink)" opacity="0.2" />
            <rect x="212" y={y} width="200" height="8" rx="4" fill="var(--ink)" opacity="0.08" />
            <rect x="212" y={y} width={200 * line.pct} height="8" rx="4" fill={line.tone} opacity="0.72" />
          </g>
        )
      })}

      {/* El mismo panel en el móvil del encargado, superpuesto a la derecha */}
      <g>
        <rect x="486" y="96" width="188" height="330" rx="26" fill="var(--paper-2)" stroke="var(--line)" strokeWidth={STROKE * 1.4} />
        <rect x="498" y="108" width="164" height="306" rx="18" fill="var(--card)" />
        <rect x="556" y="116" width="48" height="6" rx="3" fill="var(--ink)" opacity="0.18" />
        <rect x="498" y="134" width="164" height="46" fill="var(--blue-deep)" />
        <rect x="514" y="152" width="76" height="8" rx="4" fill="#fdfaf4" opacity="0.85" />
        {[204, 250, 296, 342].map((y, i) => (
          <g key={y}>
            <rect x="514" y={y} width="132" height="34" rx="6" fill="var(--paper)" stroke="var(--line-soft)" strokeWidth={STROKE} />
            <circle cx="530" cy={y + 17} r="4" fill={i === 2 ? 'var(--gold)' : 'var(--blue)'} />
            <rect x="544" y={y + 10} width="52" height="5" rx="2.5" fill="var(--ink)" opacity="0.4" />
            <rect x="544" y={y + 22} width="76" height="3.5" rx="1.75" fill="var(--ink)" opacity="0.18" />
          </g>
        ))}
        <rect x="514" y="392" width="132" height="12" rx="6" fill="var(--blue)" opacity="0.85" />
      </g>
    </Canvas>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   04 · Generador de promociones
   ───────────────────────────────────────────────────────────────────────── */

export function ArtPromo({ className }: ArtProps) {
  const tiles = [
    { x: 300, y: 96 },
    { x: 496, y: 96 },
    { x: 300, y: 268 },
    { x: 496, y: 268 },
  ]
  return (
    <Canvas className={className}>
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="12" fill="var(--card)" stroke="var(--line)" strokeWidth={STROKE} />

      {/* Panel de parámetros: se rellena una vez, no cada campaña */}
      <path d={`M0 12 A12 12 0 0 1 12 0 H252 V${H} H12 A12 12 0 0 1 0 ${H - 12} Z`} fill="var(--paper-2)" />
      <line x1="252" y1="0" x2="252" y2={H} stroke="var(--line)" strokeWidth={STROKE} />
      <rect x="32" y="36" width="118" height="9" rx="4.5" fill="var(--ink)" opacity="0.55" />
      {[84, 148, 212, 276].map((y) => (
        <g key={y}>
          <rect x="32" y={y - 18} width="62" height="4" rx="2" fill="var(--ink)" opacity="0.28" />
          <rect x="32" y={y - 4} width="188" height="30" rx="6" fill="var(--card)" stroke="var(--line)" strokeWidth={STROKE} />
          <rect x="44" y={y + 8} width="94" height="4" rx="2" fill="var(--ink)" opacity="0.22" />
        </g>
      ))}
      <rect x="32" y="330" width="132" height="34" rx="17" fill="var(--blue)" />
      <rect x="56" y="344" width="84" height="6" rx="3" fill="#fdfaf4" opacity="0.85" />

      {/* Salida: piezas generadas, la última todavía componiéndose */}
      {tiles.map((tile, i) => {
        const pending = i === 3
        return (
          <g key={`${tile.x}-${tile.y}`}>
            <rect
              x={tile.x}
              y={tile.y}
              width="168"
              height="140"
              rx="8"
              fill={pending ? 'none' : 'var(--paper)'}
              stroke={pending ? 'var(--gold)' : 'var(--line-soft)'}
              strokeWidth={pending ? STROKE * 1.3 : STROKE}
              strokeDasharray={pending ? '6 5' : undefined}
            />
            {!pending && (
              <>
                <path d={archPath(tile.x + 54, tile.y + 16, 60, 56)} fill="var(--blue)" opacity={0.12 + i * 0.05} />
                <rect x={tile.x + 22} y={tile.y + 88} width="86" height="6" rx="3" fill="var(--ink)" opacity="0.45" />
                <rect x={tile.x + 22} y={tile.y + 104} width="58" height="4" rx="2" fill="var(--ink)" opacity="0.2" />
                <rect x={tile.x + 112} y={tile.y + 96} width="38" height="22" rx="11" fill="var(--gold)" opacity="0.9" />
              </>
            )}
            {pending && (
              <>
                <rect x={tile.x + 54} y={tile.y + 58} width="60" height="6" rx="3" fill="var(--gold)" opacity="0.5" />
                <rect x={tile.x + 68} y={tile.y + 74} width="32" height="6" rx="3" fill="var(--gold)" opacity="0.28" />
              </>
            )}
          </g>
        )
      })}
    </Canvas>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   05 · Informes automáticos
   ───────────────────────────────────────────────────────────────────────── */

export function ArtReports({ className }: ArtProps) {
  const bars = [46, 68, 54, 82, 72, 96]
  return (
    <Canvas className={className}>
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="12" fill="var(--paper-2)" stroke="var(--line)" strokeWidth={STROKE} />

      {/* Fuentes de datos: base de datos, hoja de cálculo y API */}
      {[
        { y: 96, kind: 'db' },
        { y: 214, kind: 'sheet' },
        { y: 332, kind: 'api' },
      ].map((src) => (
        <g key={src.y}>
          <rect x="40" y={src.y} width="132" height="72" rx="8" fill="var(--card)" stroke="var(--line)" strokeWidth={STROKE} />
          {src.kind === 'db' && (
            <>
              <ellipse cx="76" cy={src.y + 26} rx="16" ry="6" stroke="var(--blue)" strokeWidth={STROKE} />
              <path d={`M60 ${src.y + 26} V${src.y + 46} A16 6 0 0 0 92 ${src.y + 46} V${src.y + 26}`} stroke="var(--blue)" strokeWidth={STROKE} />
            </>
          )}
          {src.kind === 'sheet' && (
            <>
              <rect x="60" y={src.y + 20} width="32" height="32" rx="3" stroke="var(--blue)" strokeWidth={STROKE} />
              <path d={`M60 ${src.y + 30} H92 M60 ${src.y + 41} H92 M71 ${src.y + 20} V${src.y + 52}`} stroke="var(--blue)" strokeWidth={STROKE} opacity="0.6" />
            </>
          )}
          {src.kind === 'api' && (
            <>
              <path d={`M64 ${src.y + 24} L54 ${src.y + 36} L64 ${src.y + 48}`} stroke="var(--blue)" strokeWidth={STROKE * 1.3} strokeLinecap="round" strokeLinejoin="round" />
              <path d={`M88 ${src.y + 24} L98 ${src.y + 36} L88 ${src.y + 48}`} stroke="var(--blue)" strokeWidth={STROKE * 1.3} strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
          <rect x="108" y={src.y + 28} width="46" height="5" rx="2.5" fill="var(--ink)" opacity="0.35" />
          <rect x="108" y={src.y + 42} width="32" height="4" rx="2" fill="var(--ink)" opacity="0.18" />
          <path d={`M172 ${src.y + 36} H240`} stroke="var(--gold)" strokeWidth={STROKE * 1.2} strokeDasharray="5 5" />
        </g>
      ))}

      {/* El informe que sale cada semana, ya compuesto */}
      <rect x="252" y="48" width="300" height="392" rx="10" fill="var(--card)" stroke="var(--line)" strokeWidth={STROKE} />
      <rect x="284" y="84" width="164" height="11" rx="5.5" fill="var(--ink)" opacity="0.6" />
      <rect x="284" y="108" width="112" height="5" rx="2.5" fill="var(--ink)" opacity="0.25" />
      {bars.map((h, i) => (
        <rect key={i} x={284 + i * 40} y={244 - h} width="26" height={h} rx="3" fill="var(--blue)" opacity={0.3 + i * 0.09} />
      ))}
      <line x1="284" y1="244" x2="520" y2="244" stroke="var(--line)" strokeWidth={STROKE} />
      {[276, 306, 336, 366, 396].map((y) => (
        <g key={y}>
          <rect x="284" y={y} width="98" height="5" rx="2.5" fill="var(--ink)" opacity="0.28" />
          <rect x="398" y={y} width="58" height="5" rx="2.5" fill="var(--ink)" opacity="0.18" />
          <rect x="472" y={y} width="48" height="5" rx="2.5" fill="var(--ink)" opacity="0.18" />
        </g>
      ))}

      {/* Envío programado */}
      <path d="M552 244 H612" stroke="var(--gold)" strokeWidth={STROKE * 1.2} strokeDasharray="5 5" />
      <rect x="612" y="196" width="72" height="96" rx="8" fill="var(--blue-deep)" />
      <path d="M628 232 L648 246 L668 232" stroke="#fdfaf4" strokeWidth={STROKE * 1.4} strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <rect x="628" y="222" width="40" height="30" rx="4" stroke="#fdfaf4" strokeWidth={STROKE * 1.4} opacity="0.9" />
      <circle cx="648" cy="316" r="18" stroke="var(--gold)" strokeWidth={STROKE * 1.3} />
      <path d="M648 306 V316 L655 321" stroke="var(--gold)" strokeWidth={STROKE * 1.3} strokeLinecap="round" strokeLinejoin="round" />
    </Canvas>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   06 · Mantenimiento: lo que se vigila después de publicar
   ───────────────────────────────────────────────────────────────────────── */

export function ArtMaintenance({ className }: ArtProps) {
  /* Barras de disponibilidad diaria; la penúltima marca una incidencia
     detectada y resuelta, que es exactamente lo que se vende aquí. */
  const days = Array.from({ length: 30 }, (_, i) => (i === 22 ? 'warn' : 'ok'))
  const perf = [88, 91, 90, 94, 93, 96, 97]

  return (
    <Canvas className={className}>
      <BrowserChrome>
        <rect x="40" y="76" width="180" height="10" rx="5" fill="var(--ink)" opacity="0.55" />
        <rect x="40" y="98" width="248" height="5" rx="2.5" fill="var(--ink)" opacity="0.22" />

        {/* Disponibilidad de los últimos 30 días */}
        <rect x="40" y="128" width="400" height="92" rx="8" fill="var(--paper)" stroke="var(--line-soft)" strokeWidth={STROKE} />
        <rect x="60" y="146" width="86" height="5" rx="2.5" fill="var(--ink)" opacity="0.3" />
        {days.map((state, i) => (
          <rect
            key={i}
            x={60 + i * 11.6}
            y="168"
            width="7"
            height="34"
            rx="2"
            fill={state === 'ok' ? 'var(--blue)' : 'var(--gold)'}
            opacity={state === 'ok' ? 0.55 : 1}
          />
        ))}

        {/* Rendimiento medido antes y después de cada intervención */}
        <rect x="40" y="240" width="400" height="188" rx="8" fill="var(--paper)" stroke="var(--line-soft)" strokeWidth={STROKE} />
        <rect x="60" y="260" width="104" height="5" rx="2.5" fill="var(--ink)" opacity="0.3" />
        <line x1="60" y1="400" x2="420" y2="400" stroke="var(--line)" strokeWidth={STROKE} />
        <path
          d={perf.map((v, i) => `${i === 0 ? 'M' : 'L'} ${60 + i * 60} ${400 - v}`).join(' ')}
          stroke="var(--blue)"
          strokeWidth={STROKE * 1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {perf.map((v, i) => (
          <circle key={i} cx={60 + i * 60} cy={400 - v} r="3.5" fill="var(--blue)" />
        ))}

        {/* Registro de intervenciones */}
        <rect x="466" y="128" width="214" height="300" rx="8" fill="var(--paper)" stroke="var(--line-soft)" strokeWidth={STROKE} />
        <rect x="486" y="148" width="92" height="5" rx="2.5" fill="var(--ink)" opacity="0.3" />
        {[178, 226, 274, 322, 370].map((y, i) => (
          <g key={y}>
            <circle cx="496" cy={y + 8} r="8" fill={i === 2 ? 'var(--gold)' : 'var(--blue)'} opacity="0.14" />
            <path
              d={`M492 ${y + 8} L495 ${y + 11} L501 ${y + 4}`}
              stroke={i === 2 ? 'var(--gold)' : 'var(--blue)'}
              strokeWidth={STROKE * 1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="514" y={y + 2} width={i % 2 ? 118 : 96} height="5" rx="2.5" fill="var(--ink)" opacity="0.34" />
            <rect x="514" y={y + 15} width="64" height="4" rx="2" fill="var(--ink)" opacity="0.16" />
          </g>
        ))}
      </BrowserChrome>
    </Canvas>
  )
}

/**
 * Registro por orden de aparición en `content.ts`. Un índice, y no una clave
 * por título, para que traducir el título al inglés no rompa el dibujo.
 */
export const PROJECT_ART: ((props: ArtProps) => React.ReactElement)[] = [
  ArtCatalog,
  ArtInventory,
  ArtProduction,
  ArtPromo,
  ArtReports,
]

/**
 * Ilustración de cabecera de cada landing, elegida por la intención de la URL.
 * Vive aquí y no en `servicePages.ts` porque es una decisión de presentación:
 * el fichero de SEO debe seguir siendo solo datos de contenido y keywords.
 */
export const LANDING_ART: Record<string, (props: ArtProps) => React.ReactElement> = {
  '/diseno-web-para-empresas/': ArtCatalog,
  '/diseno-web-para-autonomos/': ArtCatalog,
  '/mantenimiento-web/': ArtMaintenance,
  '/desarrollo-web-a-medida/': ArtInventory,
  '/diseno-web-sevilla/': ArtCatalog,
  '/diseno-web-ecija/': ArtCatalog,
  '/mantenimiento-web-sevilla/': ArtMaintenance,
  '/desarrollo-web-sevilla/': ArtInventory,
}
