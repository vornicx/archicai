/** Only Weather activates the service worker. It does not cache MET/AEMET API data. */
export function registerWeatherPwa():void{
 if(!('serviceWorker' in navigator)||!window.isSecureContext)return
 navigator.serviceWorker.register('/weather-sw.js',{scope:'/'}).catch(()=>{})
}
