import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { isSavablePlace,parseSavedPlaces,toggleSavedPlace } from '../src/lab/weatherSavedPlaces.ts'
const ecija={id:'ecija',name:{es:'Écija',en:'Écija'},lat:37.541,lon:-5.083,timeZone:'Europe/Madrid'}
const city={id:'geonames:12345',name:{es:'Córdoba',en:'Cordoba'},lat:37.884,lon:-4.779,timeZone:'Europe/Madrid'}
test('favorites are explicit and never include device/coordinates',()=>{
 assert.equal(isSavablePlace(ecija),true)
 assert.equal(isSavablePlace({...ecija,id:'device'}),false)
 assert.equal(isSavablePlace({...ecija,id:'coordinates'}),false)
 assert.equal(isSavablePlace({...city,timeZone:'Invalid/Zone'}),false)
 const list=toggleSavedPlace([],ecija)
 assert.deepEqual(list,[ecija])
 assert.deepEqual(toggleSavedPlace(list,ecija),[])
 assert.deepEqual(toggleSavedPlace(list,{...ecija,id:'device'}),list)
})
test('parse strict safe storage with dedupe and cap',()=>{
 const rows=[ecija,ecija,city,{...ecija,id:'device'},{...ecija,lat:200}]
 assert.deepEqual(parseSavedPlaces(JSON.stringify(rows)),[ecija,city])
 assert.deepEqual(parseSavedPlaces('{broken'),[])
 assert.deepEqual(parseSavedPlaces('{}'),[])
 assert.deepEqual(parseSavedPlaces(JSON.stringify(Array.from({length:12},(_,i)=>({...city,id:'geonames:'+(i+1)})))).length,6)
})
test('Weather manifests point to actual Weather screens and install assets',()=>{
 for(const [lang,name,path] of [['es','manifest.webmanifest','/lab/weather/'],['en','manifest-en.webmanifest','/en/lab/weather/']]){
   const manifest=JSON.parse(readFileSync('public/weather/'+name,'utf8'))
   assert.equal(manifest.lang,lang)
   assert.equal(manifest.start_url,path)
   assert.equal(manifest.display,'standalone')
   assert.equal(manifest.id,'/lab/weather/')
   assert.ok(manifest.icons.some(i=>i.sizes==='192x192'))
   assert.ok(manifest.icons.some(i=>i.sizes==='512x512'&&i.purpose==='maskable'))
   assert.ok(manifest.shortcuts.every(x=>x.url.startsWith(path)))
 }
})
test('worker never caches API forecast requests or app-wide navigations',()=>{
 const sw=readFileSync('public/weather-sw.js','utf8')
 assert.match(sw,/WEATHER_PATH/)
 assert.match(sw,/req\.mode==='navigate'&&WEATHER_PATH\.test/)
 assert.match(sw,/url\.origin!==self\.location\.origin/)
 assert.doesNotMatch(sw,/functions\/v1\/lab-weather/)
})
