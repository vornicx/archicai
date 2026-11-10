import {test} from 'node:test'
import assert from 'node:assert/strict'
import {buildWeatherTrend48h as build} from '../src/lab/weatherTrend.ts'
const t=Date.parse('2026-11-09T00:00:00Z')
const h=(i,mm=1,wind=12)=>({time:new Date(t+i*3600000).toISOString(),periodHours:1,precipitationMm:mm,windKmh:wind})
test('compares two exact 24-hour future intervals, not partial hours',()=>{
 const rows=Array.from({length:50},(_,i)=>h(i,i<25?1:2))
 const r=build(rows,t+2*60000)
 assert.equal(r.first.start,h(1).time)
 assert.equal(r.first.rainMm,24)
 assert.equal(r.second.rainMm,48)
 assert.equal(r.differenceMm,24)
 assert.equal(Date.parse(r.second.end)-Date.parse(r.first.start),48*3600000)
})
test('starts on hour boundary when now is exact, never includes elapsed intervals',()=>{
 const rows=Array.from({length:48},(_,i)=>h(i,0))
 const r=build(rows,t)
 assert.ok(r);assert.equal(r.first.rainMm,0);assert.equal(r.second.rainMm,0)
 assert.equal(build(rows,t+1),null)
})
test('rejects missing, negative, 6-hour aggregate, gap and out-of-order',()=>{
 const normal=Array.from({length:48},(_,i)=>h(i,0))
 for(const replacement of [{...h(4),precipitationMm:null},{...h(4),precipitationMm:-1},{...h(4),periodHours:6},{...h(5),time:h(7).time}]){
   const list=normal.slice();list[4]=replacement
   assert.equal(build(list,t),null)
 }
 assert.equal(build([],t),null)
 assert.equal(build(normal,Number.NaN),null)
})
test('missing wind does not hide complete rainfall comparison or fake calm',()=>{
 const rows=Array.from({length:48},(_,i)=>h(i,0.5))
 rows[30].windKmh=null
 const r=build(rows,t)
 assert.equal(r.first.rainMm,12);assert.equal(r.second.rainMm,12)
 assert.equal(r.first.maxWindKmh,12);assert.equal(r.second.maxWindKmh,null)
})
test('DST transition is 48 physical hours, with absolute unique timestamps',()=>{
 const start=Date.parse('2026-10-24T23:00:00Z')
 const rows=Array.from({length:48},(_,i)=>({...h(i,0),time:new Date(start+i*3600000).toISOString()}))
 const r=build(rows,start)
 assert.equal(Date.parse(r.second.end)-Date.parse(r.first.start),48*3600000)
})
