/* Weather PWA only. No weather forecasts, API responses, coordinates or user data cached. */
const VERSION='weather-shell-v1'
const SHELL=VERSION+'-navigation'
const ASSETS=VERSION+'-assets'
const OFFLINE='/weather/offline.html'
const WEATHER_PATH=/^\/(?:en\/)?lab\/weather\/?$/
const STATIC_PATH=/^\/(?:assets\/|weather\/icons\/|brand\/archic-)/

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(SHELL)
    await cache.addAll([OFFLINE,'/weather/icons/weather-192.png'])
    // Cache entry points on best effort. Offline fallback remains available.
    await Promise.all(['/lab/weather/','/en/lab/weather/'].map(path=>cache.add(path).catch(()=>{})))
    await self.skipWaiting()
  })())
})
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys()
    await Promise.all(keys.filter(k=>k.startsWith('weather-shell-')&&k!==SHELL&&k!==ASSETS).map(k=>caches.delete(k)))
    await self.clients.claim()
  })())
})
self.addEventListener('fetch',event=>{
  const req=event.request
  if(req.method!=='GET')return
  const url=new URL(req.url)
  if(url.origin!==self.location.origin)return
  // Never intercept API, personal data, or the rest of archic.es.
  if(req.mode==='navigate'&&WEATHER_PATH.test(url.pathname)){
    event.respondWith((async()=>{
      const cache=await caches.open(SHELL)
      try{
        const response=await fetch(req)
        if(response.ok)await cache.put(req,response.clone())
        return response
      }catch{
        return (await cache.match(req,{ignoreSearch:true}))||(await cache.match(OFFLINE))||
          new Response('Offline',{status:503,headers:{'Content-Type':'text/plain'}})
      }
    })())
    return
  }
  if(!STATIC_PATH.test(url.pathname))return
  // Hashed Vite assets are immutable. Other static Weather assets are network-first.
  const hashed=url.pathname.startsWith('/assets/')&&/[-.][0-9a-zA-Z_-]{8,}\.(?:js|css|woff2?|svg|png|webp)$/.test(url.pathname)
  event.respondWith((async()=>{
    const cache=await caches.open(ASSETS)
    const hit=await cache.match(req)
    if(hit&&hashed)return hit
    try{
      const response=await fetch(req)
      if(response.ok)await cache.put(req,response.clone())
      return response
    }catch{
      return hit||Response.error()
    }
  })())
})
