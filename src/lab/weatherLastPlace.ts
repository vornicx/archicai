import {isSavablePlace, type SavedPlace} from './weatherSavedPlaces'
/** Explicitly chosen named city; never store live GPS or typed coordinates. */
export const LAST_CITY_KEY='archic-weather-last-named-city-v1'
export function parseLastPlace(raw:string|null):SavedPlace|null{
  if(!raw||raw.length>1000)return null
  try{
    const p:unknown=JSON.parse(raw)
    if(!p||typeof p!=='object'||Array.isArray(p))return null
    const item=p as SavedPlace
    if(!isSavablePlace(item))return null
    return {id:item.id,lat:item.lat,lon:item.lon,timeZone:item.timeZone,name:{es:item.name.es,en:item.name.en}}
  }catch{return null}
}
export function readLastPlace<T extends SavedPlace>(fallback:T):SavedPlace{
  try{return parseLastPlace(window.localStorage.getItem(LAST_CITY_KEY))||fallback}catch{return fallback}
}
export function rememberNamedPlace(place:SavedPlace):void{
  if(!isSavablePlace(place))return
  try{window.localStorage.setItem(LAST_CITY_KEY,JSON.stringify({
    id:place.id,name:place.name,lat:place.lat,lon:place.lon,timeZone:place.timeZone,
  }))}catch{/* Private mode, storage disabled */}
}
