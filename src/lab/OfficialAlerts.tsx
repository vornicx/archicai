import { useEffect, useState } from 'react'
import { fetchOfficialAlerts, type AemetAlertResult } from './weatherClient'

const ZONES:Record<string,{code:'614102'|'722802'; name:{es:string;en:string};url:string}> = {
  ecija:{code:'614102',name:{es:'Campiña sevillana',en:'Seville countryside'},url:'https://www.aemet.es/es/eltiempo/prediccion/avisos?l=614102&w=hoy'},
  sevilla:{code:'614102',name:{es:'Campiña sevillana',en:'Seville countryside'},url:'https://www.aemet.es/es/eltiempo/prediccion/avisos?l=614102&w=hoy'},
  madrid:{code:'722802',name:{es:'Metropolitana y Henares',en:'Metropolitan and Henares'},url:'https://www.aemet.es/es/eltiempo/prediccion/avisos?l=722802&w=hoy'},
}
const ORDER={rojo:0,naranja:1,amarillo:2}
export function OfficialAlerts({placeId,lat,lon,lang,locale,timeZone}:{
 placeId:string;lat:number;lon:number;lang:'es'|'en';locale:string;timeZone:string
}){
 const zone=ZONES[placeId]
 const [data,setData]=useState<AemetAlertResult|null>(null)
 useEffect(()=>{
   setData(null)
   if(!zone)return
   const controller=new AbortController()
   fetchOfficialAlerts(lat,lon,zone.code,controller.signal).then(setData).catch(()=>setData(null))
   return ()=>controller.abort()
 },[placeId,lat,lon,zone?.code])
 if(!zone)return null
 const alerts=(data?.alerts||[]).slice().sort((a,b)=>ORDER[a.level]-ORDER[b.level]).slice(0,3)
 // A blank feed is not an all-clear; the always-available AEMET source link lives in the footer.
 // Only show the prominent warning surface for a matching published notice.
 if(!alerts.length)return null
 const date=(v:string)=>new Intl.DateTimeFormat(locale,{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone}).format(new Date(v))
 return <section className="lw-official" aria-label={lang==='es'?'Avisos oficiales de AEMET':'Official AEMET warnings'}>
   <div className="lw-official-head">
     <span>{lang==='es'?'Avisos AEMET':'AEMET warnings'} <small>· {zone.name[lang]}</small></span>
     <a href={zone.url} target="_blank" rel="noopener noreferrer">{lang==='es'?'Consultar':'View at source'} <span aria-hidden="true">↗</span></a>
   </div>
   {alerts.length>0&&<ul>{alerts.map(a=><li key={a.id}>
     <span className="lw-alert-level" data-level={a.level}>{a.level}</span>
     <span className="lw-alert-content"><strong>{a.event}</strong><small>{date(a.onset)} – {date(a.expires)}</small></span>
     <a href={a.url} target="_blank" rel="noopener noreferrer" aria-label={lang==='es'?'Ver aviso original AEMET':'View original AEMET warning'}>↗</a>
   </li>)}</ul>}
   {alerts.length>0&&<small className="lw-alert-foot">{lang==='es'?'Avisos publicados que abarcan este punto; comprueba el estado actual en AEMET.':'Published notices covering this point; verify latest status at AEMET.'}</small>}
 </section>
}
