// Deterministic app icons built without external dependencies.
// Generates 192/512 PNG + a maskable variant from an Archic-blue sky/cloud glyph.
import {mkdirSync,writeFileSync} from 'node:fs'
import {deflateSync} from 'node:zlib'
import {resolve} from 'node:path'

const out=resolve(process.cwd(),'public/weather/icons')
mkdirSync(out,{recursive:true})
const table=Array.from({length:256},(_,n)=>{let c=n;for(let j=0;j<8;j++)c=c&1?0xEDB88320^(c>>>1):c>>>1;return c>>>0})
function crc32(data){let c=0xFFFFFFFF;for(const b of data)c=table[(c^b)&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0}
function chunk(type,bytes){
 const t=Buffer.from(type),len=Buffer.alloc(4);len.writeUInt32BE(bytes.length)
 const crc=Buffer.alloc(4);crc.writeUInt32BE(crc32(Buffer.concat([t,bytes])))
 return Buffer.concat([len,t,bytes,crc])
}
const circle=(x,y,cx,cy,r)=>Math.hypot(x-cx,y-cy)-r
function roundedBox(x,y,cx,cy,hx,hy,r){
 const dx=Math.abs(x-cx)-hx+r,dy=Math.abs(y-cy)-hy+r
 return Math.hypot(Math.max(0,dx),Math.max(0,dy))+Math.min(Math.max(dx,dy),0)-r
}
function render(size,maskable=false){
 const raw=Buffer.alloc((size*4+1)*size)
 const safe=maskable?0.77:1
 for(let y=0;y<size;y++){
  const start=y*(size*4+1);raw[start]=0
  for(let x=0;x<size;x++){
   const xx=((x+.5)/size-.5)/safe+.5,yy=((y+.5)/size-.5)/safe+.5
   const sun=circle(xx,yy,.70,.335,.077)
   const cloud=Math.min(
    circle(xx,yy,.36,.54,.132),
    circle(xx,yy,.515,.475,.183),
    circle(xx,yy,.665,.55,.13),
    roundedBox(xx,yy,.52,.595,.289,.094,.066),
   )
   const sdf=Math.min(sun,cloud)
   const edge=Math.min(1,Math.max(0,.5-sdf*size*safe))
   const shade=y/size
   const blue=[Math.round(10-4*shade),Math.round(99-22*shade),Math.round(214-29*shade)]
   const p=start+1+x*4
   for(let c=0;c<3;c++)raw[p+c]=Math.round(blue[c]*(1-edge)+255*edge)
   raw[p+3]=255
  }
 }
 const head=Buffer.alloc(13)
 head.writeUInt32BE(size,0);head.writeUInt32BE(size,4);head[8]=8;head[9]=6
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',head),chunk('IDAT',deflateSync(raw,{level:9})),chunk('IEND',Buffer.alloc(0))])
}
for(const [name,size,maskable] of [['weather-192.png',192,false],['weather-512.png',512,false],['weather-maskable-512.png',512,true]]){
 writeFileSync(resolve(out,name),render(size,maskable))
}
console.log('Generated Weather PWA icons')
