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
    const results = []
    for (const width of [320, 375, 390, 430, 768, 1280]) {
      await call('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: width < 768 })
      await load()
      const result = await evaluate(`(() => {
        const rect = e => { const r=e.getBoundingClientRect(); return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height} };
        return {width:innerWidth,documentWidth:document.documentElement.scrollWidth,heroHeight:Math.round(document.querySelector('main section').getBoundingClientRect().height),introVisible:!!document.querySelector('[aria-label="Introduction"]'),navigation:[...document.querySelectorAll('nav a')].filter(e=>e.offsetWidth).map(e=>({text:e.innerText||e.getAttribute('aria-label'),...rect(e)})),primaryAction:rect(document.querySelector('a[href="#selected-work"]')),contactAction:rect([...document.querySelectorAll('button')].find(b=>b.textContent.includes('Work with me')))}
      })()`)
      check(result.documentWidth <= width, `${width}px: horizontal page overflow`)
      check(!result.introVisible, `${width}px: intro did not finish`)
      for (const item of result.navigation) {
        check(item.left >= 0 && item.right <= width, `${width}px: navigation clipped: ${item.text}`)
        check(item.height >= 44, `${width}px: navigation target below 44px: ${item.text}`)
      }
      if (width < 768) {
        check(result.primaryAction.bottom <= 844, `${width}px: primary action below first screen`)
        check(result.contactAction.bottom <= 844, `${width}px: contact action below first screen`)
      }
      if (width === 390 || width === 1280) await screenshot(`mobile-first-hero-${width}.png`)
      await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Work with me')).click()`)
      await pause(350)
      result.contact = await evaluate(`(() => {
        const dialog=document.querySelector('[role="dialog"]'); const r=dialog.getBoundingClientRect();
        const close=dialog.querySelector('[data-slot="dialog-close"]').getBoundingClientRect();
        return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,scrollable:dialog.scrollHeight>dialog.clientHeight,closeHeight:close.height,inputs:[...dialog.querySelectorAll('input,textarea')].filter(e=>e.offsetWidth).map(e=>({name:e.name,fontSize:parseFloat(getComputedStyle(e).fontSize),height:e.getBoundingClientRect().height}))}
      })()`)
      check(result.contact.left >= 15 && result.contact.right <= width - 15, `${width}px: contact side margins missing`)
      check(result.contact.top >= 15 && result.contact.bottom <= 829, `${width}px: contact outside viewport`)
      check(result.contact.closeHeight >= 43.5, `${width}px: contact close target below 44px`)
      if (width < 640) for (const field of result.contact.inputs) check(field.fontSize >= 16, `${width}px: small input font: ${field.name}`)
      if (width === 390) await screenshot('mobile-first-contact-390.png')
      await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
      await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
      await pause(300)
      check(!await evaluate(`!!document.querySelector('[role="dialog"][data-state="open"]')`), `${width}px: Escape did not close contact`)
      if (width === 390) {
        await evaluate(`document.querySelector('#selected-work').scrollIntoView()`)
        await pause(800)
        await screenshot('mobile-first-work-390.png')
      }
      result.sections = await evaluate(`(() => {
        const textOverflow = [...document.querySelectorAll('main h1,main h2,main h3,main p,main blockquote,main figcaption')].filter(e => e.clientWidth && e.scrollWidth > e.clientWidth + 2).map(e => e.textContent.slice(0,80));
        return {pageHeight:document.documentElement.scrollHeight,textOverflow,workCards:document.querySelectorAll('#selected-work a[target="_blank"]').length,contributions:[...document.querySelectorAll('#selected-work p')].filter(e=>e.textContent.includes('My contribution:')).length,speakingHighlights:document.querySelectorAll('#speaking a[target="_blank"]').length};
      })()`)
      check(result.sections.textOverflow.length === 0, `${width}px: text overflow: ${result.sections.textOverflow.join('; ')}`)
      check(result.sections.workCards === 3 && result.sections.contributions === 3, `${width}px: featured project stories missing`)
      check(result.sections.speakingHighlights === 3, `${width}px: speaking highlights missing`)
      const excerpt = await evaluate(`(() => {const b=document.querySelector('#recommendations button[aria-expanded]');const quote=document.getElementById(b.getAttribute('aria-controls'));b.scrollIntoView({block:'center'});return {text:quote.textContent,height:b.offsetHeight}})()`)
      check(excerpt.height >= 44, `${width}px: recommendation control too small`)
      await evaluate(`document.querySelector('#recommendations button[aria-expanded]').click()`)
      await pause(100)
      const expanded = await evaluate(`(() => {const b=document.querySelector('#recommendations button[aria-expanded]');return {expanded:b.getAttribute('aria-expanded'),text:document.getElementById(b.getAttribute('aria-controls')).textContent,documentWidth:document.documentElement.scrollWidth}})()`)
      check(expanded.expanded === 'true' && expanded.text.length > excerpt.text.length, `${width}px: recommendation did not expand`)
      check(expanded.documentWidth <= width, `${width}px: expanded recommendation overflows`)
      await evaluate(`document.querySelector('#recommendations button[aria-expanded]').click()`)
      await pause(100)
      check(await evaluate(`(() => {const b=document.querySelector('#recommendations button[aria-expanded]');return b.getAttribute('aria-expanded') === 'false'})()`), `${width}px: recommendation did not collapse`)
      const gallery = await evaluate(`(() => {const gallery=document.querySelector('#speaking [style*="translateX"]');const before=gallery.style.transform;document.querySelector('#speaking button[aria-label="Next image"]').click();return before})()`)
      await pause(350)
      check(gallery !== await evaluate(`document.querySelector('#speaking [style*="translateX"]').style.transform`), `${width}px: gallery Next button did not advance`)
      await evaluate(`document.querySelector('#speaking button[aria-label="Previous image"]').click()`)
      if (width === 320 || width === 390 || width === 1280) {
        for (const section of ['experience','recommendations','speaking']) {
          await evaluate(`document.querySelector('#${section}').scrollIntoView({block:'start'})`)
          await pause(650)
          await screenshot(`polished-${section}-${width}.png`)
        }
      }
      results.push(result)
      fs.writeFileSync(path.join(directory, 'mobile-first-results.json'), JSON.stringify({results,failures}, null, 2))
      console.log(JSON.stringify({width,heroHeight:result.heroHeight,primaryActionBottom:Math.round(result.primaryAction.bottom),contactMargins:Math.round(result.contact.left)}))
    }
    await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
    await evaluate(`sessionStorage.removeItem('introSeen')`)
    await call('Page.navigate', { url: process.env.REVIEW_URL || 'http://localhost:3101/' })
    await evaluate(`new Promise(resolve => { const start=performance.now(); const timer=setInterval(() => { if(sessionStorage.getItem('introSeen')==='1' || performance.now()-start>5000) { clearInterval(timer); resolve(); } }, 10) })`)
    const skipAvailable = await evaluate(`(() => { const button=[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Skip intro')); button?.focus(); return !!button })()`)
    check(skipAvailable, 'Short intro: Skip button missing')
    if (skipAvailable) {
      await screenshot('mobile-first-intro-390.png')
      await call('Input.dispatchKeyEvent', { type:'keyDown', key:'Enter', code:'Enter', windowsVirtualKeyCode:13, text:'\r', unmodifiedText:'\r' })
      await call('Input.dispatchKeyEvent', { type:'keyUp', key:'Enter', code:'Enter', windowsVirtualKeyCode:13 })
      await pause(100)
      check(!await evaluate(`!!document.querySelector('[aria-label="Introduction"]')`), 'Short intro: keyboard Skip did not dismiss it')
      await pause(1100)
      check(!await evaluate(`!!document.querySelector('[aria-label="Introduction"]')`), 'Short intro: reappeared after Skip')
    }
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    await evaluate(`sessionStorage.removeItem('introSeen')`)
    await load()
    check(!await evaluate(`!!document.querySelector('[aria-label="Introduction"]')`), 'Reduced motion: intro visible')
    const initialTransform = await evaluate(`document.querySelector('[class*="motion-reduce:transition-none"]').style.transform`)
    await pause(4300)
    check(initialTransform === await evaluate(`document.querySelector('[class*="motion-reduce:transition-none"]').style.transform`), 'Reduced motion: carousel advanced automatically')
    fs.writeFileSync(path.join(directory, 'mobile-first-results.json'), JSON.stringify({results,failures}, null, 2))
    console.log(JSON.stringify({failures, reducedMotionChecked:true}))
    if (failures.length) process.exitCode = 1
  } finally {
    if (call) await call('Browser.close').catch(() => {})
    ws?.close()
    browser.kill()
  }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
