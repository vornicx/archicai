import {test} from 'node:test'
import assert from 'node:assert/strict'
import {nextRainOutlook as next} from '../src/lab/nextRain.ts'
import {upcomingHourly} from '../src/lab/weatherMath.ts'
const H=3_600_000
const T=Date.parse('2026-11-11T06:00:00Z')
const p=(i,mm,periodHours=1)=>({time:new Date(T+i*H).toISOString(),periodHours,precipitationMm:mm})
const now=T+18*60_000
test('first forecast episode has hourly onset, end and accumulated amount',()=>{
 const r=next(upcomingHourly([p(0,0),p(1,0),p(2,.2),p(3,.4),p(4,0)],now),now)
 assert.equal(r.kind,'episode')
 assert.equal(r.start,p(2,0).time)
 assert.equal(r.end,p(4,0).time)
 assert.equal(r.inCurrentHour,false)
 assert.equal(r.rainMm,.6)
})
test('wet first partial hour is forecast, not observed current rain',()=>{
 const r=next([p(0,.1),p(1,.3),p(2,0)],now)
 assert.equal(r.kind,'episode');assert.equal(r.inCurrentHour,true);assert.equal(r.end,p(2,0).time)
})
test('unknown, negative or NaN amounts before episode suppress onset claim',()=>{
 for(const amount of [null,-1,NaN])assert.deepEqual(next([p(0,amount),p(1,1)],now),{kind:'unknown'})
})
test('missing ending hour never supplies an invented time',()=>{
 const r=next([p(0,0),p(1,1),p(2,1)],now)
 assert.equal(r.kind,'episode');assert.equal(r.end,null)
})
test('all dry is restricted to known hours and never a full-day guarantee',()=>{
 assert.deepEqual(next([p(0,0),p(1,0),p(2,0)],now),{kind:'dry',knownHours:3})
 assert.deepEqual(next([],now),{kind:'unknown'})
 assert.deepEqual(next([p(-3,0)],now),{kind:'unknown'})
})
test('gap and 6-hour blocks cannot become artificial hourly rain episodes',()=>{
 assert.deepEqual(next([p(0,0),p(2,1)],now),{kind:'dry',knownHours:1})
 assert.deepEqual(next([p(0,0),p(1,1,6)],now),{kind:'dry',knownHours:1})
 assert.equal(next([p(0,1),p(1,1,6)],now).end,null)
})
test('DST fallback uses absolute instants even for repeated local 01:00',()=>{
 const start=Date.parse('2026-11-01T05:00:00Z')
 const hours=[0,1,2].map(i=>({time:new Date(start+i*H).toISOString(),periodHours:1,precipitationMm:i===1?.2:0}))
 const r=next(hours,start-1000)
 assert.equal(r.kind,'episode');assert.equal(Date.parse(r.end)-Date.parse(r.start),H)
})
test('fully elapsed intervals never leak through upcomingHourly',()=>{
 const r=next(upcomingHourly([p(-1,1),p(0,0),p(1,1),p(2,0)],now),now)
 assert.equal(r.kind,'episode');assert.equal(r.start,p(1,0).time)
})
