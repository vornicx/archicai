import {test} from 'node:test'
import assert from 'node:assert/strict'
import {parseLastPlace} from '../src/lab/weatherLastPlace.ts'
import {readFileSync} from 'node:fs'
const ecija={id:'ecija',name:{es:'Écija',en:'Écija'},lat:37.541,lon:-5.083,timeZone:'Europe/Madrid'}
test('only explicit named cities are eligible to resume',()=>{
 assert.deepEqual(parseLastPlace(JSON.stringify(ecija)),ecija)
 assert.equal(parseLastPlace(JSON.stringify({...ecija,id:'device'})),null)
 assert.equal(parseLastPlace(JSON.stringify({...ecija,id:'coordinates'})),null)
 assert.equal(parseLastPlace(JSON.stringify({...ecija,timeZone:'Invalid/Zone'})),null)
 assert.equal(parseLastPlace(JSON.stringify({...ecija,lat:100})),null)
 assert.equal(parseLastPlace('{invalid'),null)
 assert.equal(parseLastPlace('['),null)
 assert.equal(parseLastPlace('x'.repeat(1001)),null)
})
test('named GeoNames locations can resume without storing permission data',()=>{
 const city={...ecija,id:'geonames:12345',name:{es:'Córdoba',en:'Cordoba'}}
 assert.deepEqual(parseLastPlace(JSON.stringify(city)),city)
 assert.equal(parseLastPlace(JSON.stringify({...city,id:'geonames:abc'})),null)
})
test('weather has one city entry and one optional hourly chart',()=>{
 const ui=readFileSync('src/pages/LabWeather.tsx','utf8')
 assert.match(ui, /className="lw-city-trigger"/)
 assert.match(ui, /className="lw-rain-expand"/)
 assert.doesNotMatch(ui, /id="lw-place"/)
 assert.match(ui, /<CitySearch lang=/)
})
