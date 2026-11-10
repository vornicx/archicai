import {useMemo} from 'react'
import type {Point} from './weatherClient'
import {buildWeatherTrend48h} from './weatherTrend'
export function WeatherTrend({hourly,now,lang,locale,timeZone}:{hourly:Point[];now:number;lang:'es'|'en';locale:string;timeZone:string}){
 const trend=useMemo(()=>buildWeatherTrend48h(hourly,now),[hourly,now])
 if(!trend)return null
 const fmt=(n:number)=>new Intl.NumberFormat(locale,{maximumFractionDigits:1}).format(Math.round(n*10)/10)
 const periods=[trend.first,trend.second]
 const max=Math.max(trend.first.rainMm,trend.second.rainMm)
 const labels=lang==='es'?['Próximas 24 h','24 h siguientes']:['Next 24 h','Following 24 h']
 const time=(s:string)=>new Intl.DateTimeFormat(locale,{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone}).format(new Date(s))
 return <section className="lw-section wt-section" aria-labelledby="wt-title">
   <div className="lw-section-head"><h2 id="wt-title">{lang==='es'?'Lluvia · 48 h':'Rain · 48 h'}</h2></div>
   <div className="wt-periods">{periods.map((p,i)=><div className="wt-period" key={p.start}>
     <div className="wt-top"><span>{labels[i]}</span><strong>{fmt(p.rainMm)} <small>mm</small></strong></div>
     <div className="wt-track" role="img" aria-label={`${labels[i]}: ${fmt(p.rainMm)} mm`}>
       <span style={{width:max>0?`${p.rainMm/max*100}%`:'0%'}}/>
     </div>
     <div className="wt-meta"><span>{time(p.start)} – {time(p.end)}</span>
       {p.maxWindKmh!==null&&<span>{lang==='es'?'Viento máx.':'Max wind'} {fmt(p.maxWindKmh)} km/h</span>}</div>
   </div>)}</div>
   <details className="lw-disclosure"><summary>{lang==='es'?'Cómo se calcula':'How it is calculated'}</summary>
     <p>{lang==='es'
       ?'Dos periodos consecutivos de 24 horas completas del modelo. No incluye la hora ya empezada. Si faltan datos horarios, no se muestra la comparación. El viento máximo se calcula con los valores horarios disponibles.'
       :'Two complete consecutive 24-hour model periods, excluding the current partial hour. This comparison is hidden when hourly rain data is incomplete. Maximum wind uses hourly model values.'}</p>
   </details>
 </section>
}
