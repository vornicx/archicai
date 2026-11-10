import type { HourPoint } from './weatherMath'

const HOUR=3_600_000
export type WeatherTrendPeriod={start:string;end:string;rainMm:number;maxWindKmh:number|null}
export type WeatherTrend48h={first:WeatherTrendPeriod;second:WeatherTrendPeriod;differenceMm:number}
/** Complete future 24+24 UTC-hour model intervals. No gaps, elapsed hours, missing rain or 6h blocks. */
export function buildWeatherTrend48h(points:(HourPoint & {windKmh:number|null})[],now:number):WeatherTrend48h|null{
 if(!Number.isFinite(now))return null
 const first=points.findIndex(p=>Number.isFinite(Date.parse(p.time))&&Date.parse(p.time)>=now)
 if(first<0||points.length-first<48)return null
 const rows=points.slice(first,first+48)
 const start=Date.parse(rows[0].time)
 if(!Number.isFinite(start)||rows.some((p,i)=>p.periodHours!==1||Date.parse(p.time)!==start+i*HOUR
   ||p.precipitationMm===null||!Number.isFinite(p.precipitationMm)||p.precipitationMm<0))return null
 const period=(part:typeof rows):WeatherTrendPeriod=>({
   start:part[0].time,
   end:new Date(Date.parse(part[part.length-1].time)+HOUR).toISOString(),
   rainMm:part.reduce((acc,p)=>acc+(p.precipitationMm as number),0),
   maxWindKmh:part.every(p=>p.windKmh!==null&&Number.isFinite(p.windKmh)&&p.windKmh>=0)
     ?Math.max(...part.map(p=>p.windKmh as number)):null,
 })
 const a=period(rows.slice(0,24)),b=period(rows.slice(24))
 return {first:a,second:b,differenceMm:b.rainMm-a.rainMm}
}
