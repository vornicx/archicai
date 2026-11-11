// Core iPhone-sized interactions against the production build, with deterministic
// forecast fixtures. Fail the audit on a broken action, not on cosmetic changes.
import assert from 'node:assert/strict'
import {chromium} from 'playwright'
import {fixture} from './audit-fixture.mjs'

const base=process.env.AUDIT_BASE_URL||'http://127.0.0.1:4173'
const browser=await chromium.launch({headless:true})
let context
try{
  context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,reducedMotion:'reduce'})
  const page=await context.newPage()
  let requests=0
  await page.route('**/functions/v1/lab-weather?*',async route=>{
    const url=new URL(route.request().url())
    if(url.searchParams.get('alerts')==='1'){
      return route.fulfill({status:502,contentType:'application/json',body:JSON.stringify({error:'temporarily unavailable'})})
    }
    requests++
    return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(fixture())})
  })
  const noScrollOverflow=()=>page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2)
  await page.goto(base+'/lab/weather/',{waitUntil:'domcontentloaded'})
  await page.locator('.lw-temp').waitFor({state:'visible'})
  assert.ok(await noScrollOverflow(),'Today should fit mobile width')
  assert.equal(await page.locator('.lw-city-trigger').count(),1)

  // One city picker, no duplicate settings route.
  await page.locator('.lw-city-trigger').click()
  await page.locator('.lw-city-panel').waitFor({state:'visible'})
  await page.locator('.lw-city-presets button').filter({hasText:'Sevilla'}).click()
  assert.equal((await page.locator('.lw-city-trigger').innerText()).includes('Sevilla'),true)
  assert.equal(await page.locator('.lw-location-drawer').evaluate(el=>el.open),false)
  await page.locator('.lw-temp').waitFor({state:'visible'})

  // Search, selection, persistence without GPS permission or account.
  await page.locator('.lw-city-trigger').click()
  await page.getByRole('combobox',{name:'Buscar ciudad'}).fill('Berlin')
  const option=page.locator('.lw-search-pop [role=option]').filter({hasText:/Berlin/i}).first()
  await option.waitFor({state:'visible',timeout:15000})
  await option.click()
  assert.match(await page.locator('.lw-city-trigger').innerText(),/Berl[ií]n/i)
  await page.reload({waitUntil:'domcontentloaded'})
  await page.locator('.lw-temp').waitFor({state:'visible'})
  assert.match(await page.locator('.lw-city-trigger').innerText(),/Berl[ií]n/i)

  // Tabs show the correct functional screen, not a long single page.
  const tabs=page.locator('.lw-app-tabs')
  await tabs.getByRole('button',{name:'Días'}).click()
  await page.locator('.lw-days .lw-day').first().waitFor({state:'visible'})
  assert.equal(await page.locator('.lw-hero').count(),0)
  await tabs.getByRole('button',{name:'Horas'}).click()
  await page.locator('.lw-strip').waitFor({state:'visible'})
  await page.locator('.lw-hour-metric').getByRole('button',{name:'Viento'}).click()
  await page.locator('.lw-hour-wind').first().waitFor({state:'visible'})
  await page.getByRole('button',{name:'Detalle',exact:true}).click()
  await page.locator('.lw-table').waitFor({state:'visible'})
  await tabs.getByRole('button',{name:'Planificar'}).click()
  await page.locator('.ww-section').waitFor({state:'visible'})
  await tabs.getByRole('button',{name:'Hoy'}).click()
  await page.locator('.lw-rain-expand summary').click()
  await page.locator('.lw-rain-expand .lw-chart').waitFor({state:'visible'})

  // Refresh actually issues a new forecast request for the selected city.
  await page.locator('.lw-city-trigger').click()
  const count=requests
  await page.getByRole('button',{name:'Actualizar'}).click()
  await page.waitForFunction(()=>!!document.querySelector('.lw-temp'))
  for(let i=0;i<20&&requests<=count;i++)await page.waitForTimeout(100)
  assert.ok(requests>count,'manual refresh did not call forecast')
  assert.ok(await noScrollOverflow(),'Weather should fit mobile width with city panel opened')

  // Responsive: no clipped primary controls on narrow iPhones.
  await page.locator('.lw-city-trigger').click()
  await page.setViewportSize({width:320,height:700})
  assert.ok(await noScrollOverflow(),'Weather should fit 320px width')
  assert.equal(await tabs.getByRole('button').count(),4)
  console.log('PASS Weather smoke: cities, search, saved city, tabs, hourly wind, detail, plan, rain, refresh, 390/320px')
}finally{
  if(context)await context.close()
  await browser.close()
}
