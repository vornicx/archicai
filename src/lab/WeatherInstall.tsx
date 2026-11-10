import { useEffect, useState } from 'react'
type InstallEvent=Event & {prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>}
export function WeatherInstall({lang}:{lang:'es'|'en'}){
  const [prompt,setPrompt]=useState<InstallEvent|null>(null)
  const [installed,setInstalled]=useState(false)
  const [ios,setIos]=useState(false)
  useEffect(()=>{
    const standalone=window.matchMedia('(display-mode: standalone)').matches||
      (navigator as Navigator&{standalone?:boolean}).standalone===true
    setInstalled(standalone)
    setIos(/iPhone|iPad|iPod/.test(navigator.userAgent))
    const before=(event:Event)=>{event.preventDefault();setPrompt(event as InstallEvent)}
    const done=()=>{setInstalled(true);setPrompt(null)}
    window.addEventListener('beforeinstallprompt',before)
    window.addEventListener('appinstalled',done)
    return ()=>{window.removeEventListener('beforeinstallprompt',before);window.removeEventListener('appinstalled',done)}
  },[])
  if(installed)return null
  if(prompt)return <button type="button" className="lw-install-action" onClick={async()=>{
    const chosen=prompt;setPrompt(null)
    try{await chosen.prompt();await chosen.userChoice}catch{/* user canceled or unsupported */}
  }}>{lang==='es'?'Instalar app':'Install app'}</button>
  if(!ios)return null
  return <details className="lw-install-hint">
    <summary>{lang==='es'?'Instalar app':'Install app'}</summary>
    <p>{lang==='es'?'Safari → Compartir → Añadir a inicio → Abrir como app web':'Safari → Share → Add to Home Screen → Open as Web App'}</p>
  </details>
}
