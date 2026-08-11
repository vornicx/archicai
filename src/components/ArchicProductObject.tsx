import { useLang } from '../i18n/LanguageContext'

type ProductPage = 'presence' | 'control' | 'business' | 'studio'

export default function ArchicProductObject({ page }: { page: ProductPage }) {
  const { lang } = useLang()
  const es = lang === 'es'

  if (page === 'presence') {
    return (
      <div className="a26-object a26-object-presence" aria-hidden="true" data-reveal>
        <div className="a26-object-top"><span>ARCHIC / PRESENCE</span><span>01</span></div>
        <div className="a26-presence-frame">
          <div className="a26-presence-nav"><span>ATELIER / 2026</span><i /></div>
          <strong>{es ? 'Haz que' : 'Make the'}<br /><em>{es ? 'la primera impresión' : 'first impression'}</em><br />{es ? 'cuente.' : 'count.'}</strong>
          <div className="a26-presence-foot">
            <span>{es ? 'DIRECCIÓN' : 'DIRECTION'}</span>
            <span>{es ? 'EXPERIENCIA' : 'EXPERIENCE'}</span>
            <span>{es ? 'CONVERSIÓN' : 'CONVERSION'}</span>
          </div>
        </div>
      </div>
    )
  }

  if (page === 'control') {
    return (
      <div className="a26-object a26-object-control" aria-hidden="true" data-reveal>
        <div className="a26-object-top"><span>ARCHIC / CONTROL</span><span>02</span></div>
        <div className="a26-control-head"><span>{es ? 'HOY / OPERACIONES' : 'TODAY / OPERATIONS'}</span><strong>18:42</strong></div>
        <div className="a26-control-list">
          <div><span>20:00</span><strong>Martínez · 4</strong><i>{es ? 'CONFIRMADA' : 'CONFIRMED'}</i></div>
          <div><span>20:30</span><strong>Alonso · 2</strong><i>{es ? 'LLEGANDO' : 'ARRIVING'}</i></div>
          <div><span>21:00</span><strong>{es ? 'Privado' : 'Private'} · 8</strong><i>{es ? 'MESA 12' : 'TABLE 12'}</i></div>
        </div>
        <div className="a26-control-axis">
          <span>{es ? 'CLIENTES' : 'CLIENTS'}</span><i />
          <span>{es ? 'RECURSOS' : 'RESOURCES'}</span><i />
          <span>{es ? 'SERVICIO' : 'SERVICE'}</span>
        </div>
      </div>
    )
  }

  if (page === 'business') {
    return (
      <div className="a26-object a26-object-business" aria-hidden="true" data-reveal>
        <div className="a26-object-top"><span>ARCHIC / BUSINESS</span><span>03</span></div>
        <div className="a26-business-map">
          <div className="a26-node a26-node-a"><span>{es ? 'ENTRADA' : 'INPUT'}</span><strong>CRM</strong></div>
          <div className="a26-node a26-node-b"><span>{es ? 'LÓGICA' : 'LOGIC'}</span><strong>ARCHIC</strong></div>
          <div className="a26-node a26-node-c"><span>{es ? 'SALIDA' : 'OUTPUT'}</span><strong>ERP</strong></div>
          <div className="a26-node a26-node-d"><span>{es ? 'DATOS' : 'DATA'}</span><strong>BI</strong></div>
          <i className="a26-line a26-line-a" />
          <i className="a26-line a26-line-b" />
          <i className="a26-line a26-line-c" />
        </div>
        <div className="a26-business-foot">
          <span>{es ? 'AUTOMATIZACIÓN' : 'AUTOMATION'}</span>
          <span>{es ? 'INTEGRACIÓN' : 'INTEGRATION'}</span>
          <span>{es ? 'DATOS' : 'DATA'}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="a26-object a26-object-studio" aria-hidden="true" data-reveal>
      <div className="a26-object-top"><span>ARCHIC / STUDIO</span><span>04</span></div>
      <div className="a26-studio-stack">
        <div><span>01</span><strong>{es ? 'Entender' : 'Understand'}</strong></div>
        <div><span>02</span><strong>{es ? 'Dirigir' : 'Direct'}</strong></div>
        <div><span>03</span><strong>{es ? 'Construir' : 'Build'}</strong></div>
        <div><span>04</span><strong>{es ? 'Refinar' : 'Refine'}</strong></div>
      </div>
      <div className="a26-studio-mark"><span>{es ? 'IA SUPERVISADA' : 'SUPERVISED AI'}</span><i /><span>{es ? 'CRITERIO HUMANO' : 'HUMAN JUDGEMENT'}</span></div>
    </div>
  )
}
