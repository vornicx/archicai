import {test} from 'node:test'
import assert from 'node:assert/strict'
import {forecastRefreshDue as due,FORECAST_REFRESH_INTERVAL_MS as INTERVAL} from '../src/lab/weatherRefresh.ts'
import {isCurrentForecastHour} from '../src/lab/weatherMath.ts'
test('refresh after 15 minutes, on return to foreground or while open',()=>{
 const t=Date.parse('2026-11-11T10:00:00Z')
 assert.equal(due(t,t+INTERVAL-1,true,true),false)
 assert.equal(due(t,t+INTERVAL,true,true),true)
 assert.equal(due(t,t+INTERVAL,false,true),false)
 assert.equal(due(t,t+INTERVAL,true,false),false)
 assert.equal(due(t,t-1000,true,true),true)
 assert.equal(due(t,NaN,true,true),false)
})
test('Now is reserved for an actual forecast interval covering current time',()=>{
 const start='2026-11-11T10:00:00Z',t=Date.parse(start)
 assert.equal(isCurrentForecastHour(start,t),true)
 assert.equal(isCurrentForecastHour(start,t+3_599_999),true)
 assert.equal(isCurrentForecastHour(start,t+3_600_000),false)
 assert.equal(isCurrentForecastHour(start,t-1),false)
 assert.equal(isCurrentForecastHour('invalid',t),false)
})
