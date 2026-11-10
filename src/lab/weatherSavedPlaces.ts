/** Explicit, local-only favorites. Never persist GPS or typed coordinates. */
export type SavedPlace = {
  id:string
  name:{es:string;en:string}
  lat:number;lon:number;timeZone:string
}
export const SAVED_PLACES_KEY='archic-weather-favorites-v1'
const PRESETS=new Set(['ecija','sevilla','madrid','london','new-york','tokyo'])
export const isSavablePlace=(p:SavedPlace):boolean=>{
  if(!p||(!PRESETS.has(p.id)&&!/^geonames:\d{1,12}$/.test(p.id)))return false
  if(!Number.isFinite(p.lat)||!Number.isFinite(p.lon)||Math.abs(p.lat)>90||Math.abs(p.lon)>180)return false
  if(!p.name||typeof p.name.es!=='string'||typeof p.name.en!=='string'||
    !p.name.es.trim()||!p.name.en.trim()||p.name.es.length>110||p.name.en.length>110)return false
  if(typeof p.timeZone!=='string'||!/^[A-Za-z_]+(?:\/[A-Za-z_+\-]+)+$/.test(p.timeZone))return false
  try{new Intl.DateTimeFormat('es-ES',{timeZone:p.timeZone}).format(0);return true}catch{return false}
}
export function parseSavedPlaces(raw:string|null):SavedPlace[]{
  try{
    const arr=JSON.parse(raw||'[]')
    if(!Array.isArray(arr))return []
    const seen=new Set<string>()
    return arr.filter((p:SavedPlace)=>{
      if(!isSavablePlace(p)||seen.has(p.id))return false
      seen.add(p.id)
      return true
    }).slice(0,6).map((p:SavedPlace)=>({id:p.id,name:{es:p.name.es,en:p.name.en},lat:p.lat,lon:p.lon,timeZone:p.timeZone}))
  }catch{return []}
}
export function toggleSavedPlace(current:SavedPlace[],place:SavedPlace):SavedPlace[]{
  const valid=parseSavedPlaces(JSON.stringify(current))
  if(!isSavablePlace(place))return valid
  return valid.some(p=>p.id===place.id)?valid.filter(p=>p.id!==place.id):[place,...valid].slice(0,6)
}
export function readSavedPlaces():SavedPlace[]{
  try{return parseSavedPlaces(window.localStorage.getItem(SAVED_PLACES_KEY))}catch{return []}
}
export function writeSavedPlaces(places:SavedPlace[]):void{
  try{window.localStorage.setItem(SAVED_PLACES_KEY,JSON.stringify(parseSavedPlaces(JSON.stringify(places))))}catch{/* Private mode */ }
}
