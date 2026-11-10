// Build-time PWA precache manifest from Vite's actual production import graph.
// Only Weather + the app entry graph (not the rest of the marketing website).
import { readFileSync, writeFileSync, statSync } from 'node:fs'
import { resolve, posix } from 'node:path'
const root=resolve(process.cwd(),'dist')
const manifest=JSON.parse(readFileSync(resolve(root,'.vite/manifest.json'),'utf8'))
const allKeys=Object.keys(manifest)
// Multiple HTML inputs share one Vite JavaScript entry, emitted as _main-[hash].js
// instead of a per-page manifest entry.
const mainChunk=allKeys.find(k=>/^_main-.*\.js$/.test(k))
const weatherChunk=allKeys.find(k=>k==='src/pages/LabWeather.tsx'||k.endsWith('/LabWeather.tsx'))
if(!mainChunk||!weatherChunk)throw new Error('Weather PWA entry missing: '+JSON.stringify({mainChunk,weatherChunk,keys:allKeys}))
const keys=[mainChunk,weatherChunk]
const collected=new Set()
const visited=new Set()
function include(key){
 if(visited.has(key))return
 visited.add(key)
 const item=manifest[key]
 if(!item)throw new Error('Missing Vite imported asset '+key)
 if(item.file)collected.add('/'+item.file)
 for(const css of item.css||[])collected.add('/'+css)
 for(const imp of item.imports||[])include(imp)
}
for(const key of keys)include(key)
// Vite may extract shared CSS as separate anonymous manifest chunks.
for(const key of allKeys.filter(k=>/^_(?:main|archic-lab)-.*\.css$/.test(k)))if(manifest[key].file)collected.add('/'+manifest[key].file)
// Collect fonts referenced by essential compiled CSS, not remote/third-party URLs.
for(const css of [...collected].filter(p=>p.endsWith('.css'))){
 const data=readFileSync(resolve(root,css.slice(1)),'utf8')
 for(const match of data.matchAll(/url\((?:['"])?([^)'"]+)(?:['"])?\)/g)){
  const relative=match[1].trim()
  if(relative.startsWith('data:')||relative.startsWith('http'))continue
  const p=relative.startsWith('/')?relative:posix.normalize(posix.join(posix.dirname(css),relative))
  if(!p.startsWith('/assets/')||! /\.(woff2?|ttf|otf)(\?|$)/i.test(p))continue
  collected.add(p.split('?')[0])
 }
}
let bytes=0
for(const url of collected){
 const path=resolve(root,url.slice(1))
 const stat=statSync(path)
 bytes+=stat.size
}
if(bytes>7_500_000)throw new Error('Weather offline core too large: '+bytes)
const workerPath=resolve(root,'weather-sw.js')
const source=readFileSync(workerPath,'utf8')
if(!source.includes('const PRECACHE_ASSETS=[]'))throw new Error('Worker injection anchor missing')
const result=source.replace('const PRECACHE_ASSETS=[]','const PRECACHE_ASSETS='+JSON.stringify([...collected].sort()))
writeFileSync(workerPath,result)
console.log('Weather PWA: precached '+collected.size+' essential assets ('+Math.round(bytes/1024)+' KiB)')
