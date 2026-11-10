import {test} from 'node:test'
import assert from 'node:assert/strict'
import {capPolygonContains,parseCapForPoint,readAemetAlerts,AEMET_RSS_URL} from '../supabase/functions/_shared/aemetAlerts.ts'
const capUrl='https://www.aemet.es/documentos_d/eltiempo/prediccion/avisos/cap/Z_CAP_C_LEMM_20261110211431_AFAZ614102PRP11023.xml'
const now=Date.parse('2026-11-10T12:00:00Z')
const xml=(extra='')=>`<alert><identifier>id1</identifier><status>Actual</status><scope>Public</scope><msgType>${extra||'Alert'}</msgType><info><language>es-ES</language><event>Aviso de lluvias de nivel naranja</event><onset>2026-11-11T08:00:00+01:00</onset><expires>2026-11-11T16:00:00+01:00</expires><parameter><valueName>AEMET-Meteoalerta nivel</valueName><value>naranja</value></parameter><area><areaDesc>Campiña sevillana</areaDesc><polygon>37,-6 38,-6 38,-4 37,-4 37,-6</polygon></area></info></alert>`
test('AEMET CAP polygon checks lat,lon in proper order, includes border',()=>{
 assert.equal(capPolygonContains('37,-6 38,-6 38,-4 37,-4 37,-6',37.541,-5.083),true)
 assert.equal(capPolygonContains('37,-6 38,-6 38,-4 37,-4 37,-6',40,-5.083),false)
 assert.equal(capPolygonContains('37,-6 38,-6 38,-4 37,-4 37,-6',37,-6),true)
 assert.equal(capPolygonContains('junk',37,-5),false)
})
test('CAP only emits published, future or active warnings inside point polygon',()=>{
 const a=parseCapForPoint(xml(),capUrl,37.541,-5.083,now)
 assert.equal(a?.level,'naranja')
 assert.equal(a?.area,'Campiña sevillana')
 assert.equal(parseCapForPoint(xml(),capUrl,40,-5,now),null)
 assert.equal(parseCapForPoint(xml('Cancel'),capUrl,37.541,-5.083,now),null)
 assert.equal(parseCapForPoint(xml(),capUrl,37.541,-5.083,Date.parse('2026-11-12T00:00:00Z')),null)
 assert.equal(parseCapForPoint(xml(),'https://evil.example/a.xml',37.541,-5.083,now),null)
})
test('RSS fetch only follows allowlisted AEMET CAP entries matching zone', async()=>{
 let calls=[]
 const rss='<rss><channel><item><link>'+capUrl+'</link></item><item><link>https://evil.example/a.xml</link></item></channel></rss>'
 const f=async u=>{calls.push(u);return new Response(u===AEMET_RSS_URL?rss:xml(),{status:200})}
 const r=await readAemetAlerts({fetch:f,now:()=>now},'614102',37.541,-5.083)
 assert.equal(r.source,'AEMET');assert.equal(r.alerts.length,1);assert.equal(r.partial,false)
 assert.deepEqual(calls,[AEMET_RSS_URL,capUrl])
})
test('incomplete upstream is never treated as a confirmed all-clear',async()=>{
 const f=async u=>u===AEMET_RSS_URL?new Response('<rss><item><link>'+capUrl+'</link></item></rss>'):new Response('blocked',{status:502})
 const r=await readAemetAlerts({fetch:f,now:()=>now},'614102',37.541,-5.083)
 assert.equal(r.alerts.length,0);assert.equal(r.partial,true)
})
