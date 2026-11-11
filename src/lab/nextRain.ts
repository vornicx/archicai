import type {HourPoint} from './weatherMath'
const HOUR=3_600_000
export type RainOutlook=
 | {kind:'unknown'}
 | {kind:'dry';knownHours:number}
 | {kind:'episode';start:string;end:string|null;inCurrentHour:boolean;rainMm:number;peakMm:number}

/** Strict contiguous hourly model intervals, no observations or minute-level estimates. */
export function nextRainOutlook(hourly:HourPoint[],now:number):RainOutlook{
 if(!Number.isFinite(now)||!hourly.length)return {kind:'unknown'}
 const valid:HourPoint[]=[]
 for(const p of hourly.slice(0,24)){
  const ms=Date.parse(p.time)
  if(!Number.isFinite(ms)||p.periodHours!==1||ms+HOUR<=now)break
  if(valid.length&&ms!==Date.parse(valid[valid.length-1].time)+HOUR)break
  valid.push(p)
 }
 if(!valid.length)return {kind:'unknown'}
 let first=-1
 for(let i=0;i<valid.length;i++){
  const mm=valid[i].precipitationMm
  if(mm===null||!Number.isFinite(mm)||mm<0)return {kind:'unknown'}
  if(mm>0){first=i;break}
 }
 if(first<0)return {kind:'dry',knownHours:valid.length}
 let rainMm=0,peakMm=0
 let end:string|null=null
 for(let i=first;i<valid.length;i++){
  const mm=valid[i].precipitationMm
  if(mm===null||!Number.isFinite(mm)||mm<0)break
  if(mm===0){end=valid[i].time;break}
  rainMm+=mm;peakMm=Math.max(peakMm,mm)
 }
 const start=valid[first].time
 return {kind:'episode',start,end,inCurrentHour:Date.parse(start)<now,rainMm:Math.round(rainMm*10)/10,peakMm}
}
