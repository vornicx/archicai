/** A Weather app left open must refresh on return, not display old hours as current. */
export const FORECAST_REFRESH_INTERVAL_MS=15*60*1000
export function forecastRefreshDue(lastAttemptAt:number,now:number,visible:boolean,online:boolean):boolean{
  if(!visible||!online||!Number.isFinite(now)||!Number.isFinite(lastAttemptAt))return false
  // A changed device clock also requires a new forecast.
  return now<lastAttemptAt || now-lastAttemptAt>=FORECAST_REFRESH_INTERVAL_MS
}
