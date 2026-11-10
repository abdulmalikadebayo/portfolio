const { spawn } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

async function main() {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-mobile-'))
  const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
  ], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] })
  let ws
  let call
  try {
    const endpoint = await new Promise((resolve, reject) => {
      let output = ''
      const timeout = setTimeout(() => reject(Error('Browser startup timed out')), 20000)
      browser.stderr.on('data', (data) => {
        output += data
        const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/)
        if (match) { clearTimeout(timeout); resolve(match[1]) }
      })
      browser.on('error', reject)
    })
    const port = new URL(endpoint).port
    const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json()
    ws = new WebSocket(target.webSocketDebuggerUrl)
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject })
    let id = 0
    const pending = new Map()
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (!message.id) return
      const request = pending.get(message.id)
      if (!request) return
      pending.delete(message.id)
      clearTimeout(request.timeout)
      message.error ? request.reject(message.error) : request.resolve(message.result)
    }
    call = (method, params = {}) => new Promise((resolve, reject) => {
      const next = ++id
      const timeout = setTimeout(() => { pending.delete(next); reject(Error(`Timed out: ${method}`)) }, 60000)
      pending.set(next, { resolve, reject, timeout })
      ws.send(JSON.stringify({ id: next, method, params }))
    })
    const evaluate = async (expression) => {
      const response = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
      if (response.exceptionDetails) throw Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text)
      return response.result.value
    }
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    const directory = __dirname
    const failures = []
    const check = (condition, message) => { if (!condition) failures.push(message) }
    const screenshot = async (name) => {
      const shot = await call('Page.captureScreenshot', { format: 'png' })
      fs.writeFileSync(path.join(directory, name), Buffer.from(shot.data, 'base64'))
    }
    const load = async () => {
      await call('Page.navigate', { url: process.env.REVIEW_URL || 'http://localhost:3101/' })
      await evaluate(`new Promise(resolve => { if(document.readyState === 'complete') resolve(); else window.addEventListener('load', resolve, {once:true}) })`)
      await evaluate('document.fonts.ready.then(() => true)')
      await pause(1600)
    }
    await call('Page.enable')
    const base = process.env.REVIEW_URL || 'http://localhost:3103'
    const results = []
    const overflow = () => evaluate(`(() => ({width:innerWidth,documentWidth:document.documentElement.scrollWidth,text:[...document.querySelectorAll('main p,main h1,main h2,main h3,main li')].filter(e=>e.clientWidth && e.scrollWidth>e.clientWidth+2).map(e=>e.textContent.slice(0,90))}))()`)
    for (const route of ['/portfolio','/about','/resume']) {
      process.env.REVIEW_URL = base + route
      for (const width of [320,375,390,430,768,1280]) {
        await call('Emulation.setDeviceMetricsOverride', {width,height:844,deviceScaleFactor:1,mobile:width<768})
        await load()
        const result = {route,width,...await overflow()}
        check(result.documentWidth <= width, `${route} ${width}px: page overflows`)
        check(!result.text.length, `${route} ${width}px: text overflows: ${result.text.join('; ')}`)
        const navigation = await evaluate(`[...document.querySelectorAll('nav a')].filter(e=>e.offsetWidth).map(e=>{const r=e.getBoundingClientRect();return {name:e.innerText||e.getAttribute('aria-label'),left:r.left,right:r.right,height:r.height}})`)
        for (const item of navigation) check(item.left>=0 && item.right<=width && item.height>=44, `${route} ${width}px: navigation fit/target: ${item.name}`)
        check(!await evaluate(`!!document.querySelector('[aria-label="Introduction"]')`), `${route} ${width}px: intro did not finish`)
        check(await evaluate(`document.querySelectorAll('h1').length`) === 1, `${route}: heading structure`)
        if (width===320 || width===390 || width===1280) await screenshot(`${route.slice(1)}-hero-${width}.png`)
        if (route==='/portfolio') {
          for (const [category,count] of [['AI & Backend',5],['Full-stack',4],['All',9]]) {
            await evaluate(`[...document.querySelectorAll('[aria-label="Filter projects"] button')].find(b=>b.textContent.trim()===${JSON.stringify(category)}).click()`)
            await pause(150)
            const state=await evaluate(`({count:document.querySelectorAll('#project-results article').length,active:document.querySelector('[aria-label="Filter projects"] button[aria-pressed="true"]').textContent.trim(),status:document.querySelector('[role="status"]').textContent,heights:[...document.querySelectorAll('[aria-label="Filter projects"] button')].map(b=>b.offsetHeight)})`)
            check(state.count===count && state.active===category && state.status.startsWith(String(count)), `${route} ${width}px: filter ${category}`)
            check(state.heights.every(h=>h>=44), `${route} ${width}px: filter tap size`)
          }
          const before=await evaluate(`document.querySelector('#project-results article p[id]').textContent`)
          await evaluate(`document.querySelector('#project-results button[aria-expanded]').click()`)
          await pause(100)
          const after=await evaluate(`({text:document.querySelector('#project-results article p[id]').textContent,expanded:document.querySelector('#project-results button[aria-expanded]').getAttribute('aria-expanded')})`)
          check(after.expanded==='true' && after.text.length>before.length, `${route} ${width}px: project expansion`)
          await evaluate(`document.querySelector('#project-results button[aria-expanded]').click()`)
          await pause(100)
          check(await evaluate(`document.querySelector('#project-results article p[id]').textContent`)===before, `${route} ${width}px: project collapse`)
        }
        if (route==='/about') {
          const before=await evaluate(`document.querySelector('[style*="translateX"]').style.transform`)
          await evaluate(`document.querySelector('button[aria-label="Next image"]').click()`)
          await pause(350)
          check(before!==await evaluate(`document.querySelector('[style*="translateX"]').style.transform`), `${route} ${width}px: gallery Next`)
          await evaluate(`document.querySelector('button[aria-label="Previous image"]').click()`)
          const tiles=await evaluate(`[...document.querySelectorAll('[title]')].filter(e=>e.querySelector('img')).map(e=>({name:e.title,width:e.clientWidth,scroll:e.scrollWidth}))`)
          check(tiles.length>=20 && tiles.every(t=>t.scroll<=t.width+2), `${route} ${width}px: toolkit layout`)
        }
        if (route==='/resume') {
          result.cv=await evaluate(`fetch(document.querySelector('a[download]').href,{method:'HEAD'}).then(r=>({status:r.status,type:r.headers.get('content-type')}))`)
          check(result.cv.status===200 && result.cv.type?.includes('pdf'), `${route}: CV download unavailable`)
          if(width<1024) {
            const cards=await evaluate(`[...document.querySelectorAll('#experience .space-y-5 > div')].map(e=>({opacity:getComputedStyle(e).opacity,width:e.getBoundingClientRect().width}))`)
            check(cards.length>0 && cards.every(c=>c.opacity==='1' && c.width<=width), `${route} ${width}px: mobile roles hidden or overflowing`)
          }
        }
        if (width===320 || width===390 || width===1280) {
          for (const index of [1,2]) {
            await evaluate(`document.querySelectorAll('main section')[${index}].scrollIntoView();window.scrollBy(0,-80)`)
            await pause(700)
            await screenshot(`${route.slice(1)}-section-${index}-${width}.png`)
          }
        }
        await evaluate(`[...document.querySelectorAll('main button')].find(b=>b.textContent.trim()==='Get in touch').click()`)
        await pause(300)
        const dialog=await evaluate(`(()=>{const d=document.querySelector('[role="dialog"]');const r=d?.getBoundingClientRect();return {left:r?.left,right:r?.right,inputs:[...document.querySelectorAll('[role="dialog"] input')].filter(e=>e.offsetWidth).map(e=>parseFloat(getComputedStyle(e).fontSize))}})()`)
        check(dialog.left>=15 && dialog.right<=width-15, `${route} ${width}px: contact margins`)
        if(width<640) check(dialog.inputs.every(size=>size>=16), `${route} ${width}px: contact text too small`)
        await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27})
        await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27})
        await pause(300)
        check(!await evaluate(`!!document.querySelector('[role="dialog"][data-state="open"]')`), `${route} ${width}px: contact Escape`)
        results.push(result)
        fs.writeFileSync(path.join(directory,'results.json'),JSON.stringify({results,failures},null,2))
        console.log(JSON.stringify({route,width,failures:failures.length}))
      }
    }
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
    for(const route of ['/portfolio','/about','/resume']) {
      process.env.REVIEW_URL=base+route
      await evaluate(`sessionStorage.removeItem('introSeen')`)
      await load()
      check(!await evaluate(`!!document.querySelector('[aria-label="Introduction"]')`), `${route}: reduced-motion intro`)
    }
    fs.writeFileSync(path.join(directory,'results.json'),JSON.stringify({results,failures},null,2))
    console.log(JSON.stringify({failures,viewports:results.length,reducedMotionChecked:true}))
    if(failures.length) process.exitCode=1
  } finally {
    if(call) await call('Browser.close').catch(()=>{})
    ws?.close()
    browser.kill()
  }
}
main().catch(error=>{console.error(error);process.exitCode=1})
