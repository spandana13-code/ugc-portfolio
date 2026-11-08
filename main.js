/* ============================================================
   EDIT YOUR DETAILS HERE
   ============================================================ */
// Your stats. Update these once a month from Instagram Insights.
// count = the number, suffix = what comes after it (K, %, K+ ...)
const STATS_UPDATED = 'Nov 2026'
const STATS = [
  { count: 170, suffix: 'K+', label: 'views in the last 30 days' },
  { count: 60, suffix: 'K+', label: 'accounts reached, 30 days' },
  { count: 76, suffix: '%', label: 'of views from non-followers' },
  { count: 50, suffix: 'K+', label: 'views on my top reel' },
]

const EMAIL = 'beanveshi@gmail.com' // ← your email for brands
const WHATSAPP = '918951248412' // ← country code + number, no + or spaces

// Your reels. For each one:
//  - video: put the .mp4 in the /media folder and write 'media/name.mp4' (plays on hover)
//  - poster: optional cover image, e.g. 'media/name.jpg'
//  - link: the Instagram link for that reel (opens on click)
//  - soon: true shows a "coming soon" badge
const REELS = [
  { title: 'Class Day Fits', views: '9.5K', cat: 'fashion', video: '', poster: '', link: 'https://www.instagram.com/be_anveshi/reels/', a: '#b5525e', b: '#4a1820' },
  { title: 'House of Fab collab', views: '', cat: 'collab', video: '', poster: '', link: '', soon: true, a: '#c47a5a', b: '#5a2a1c' },
  { title: 'Day 1: Swara finger positions', views: '51K', cat: 'music', video: '', poster: '', link: 'https://www.instagram.com/be_anveshi/reels/', a: '#c9a07a', b: '#5e3a24' },
  { title: 'Day 2: First note', views: '27.7K', cat: 'music', video: '', poster: '', link: 'https://www.instagram.com/be_anveshi/reels/', a: '#a9b7c4', b: '#40505e' },
  { title: 'The hobby >>>', views: '24.9K', cat: 'lifestyle', video: '', poster: '', link: 'https://www.instagram.com/be_anveshi/reels/', a: '#8a8a8a', b: '#2a2a2a' },
  { title: 'Pov: missing someone', views: '46K', cat: 'lifestyle', video: '', poster: '', link: 'https://www.instagram.com/be_anveshi/reels/', a: '#9a8a86', b: '#34282a' },
  { title: 'Happy Knots collab', views: '', cat: 'collab', video: '', poster: '', link: '', soon: true, a: '#b39a7a', b: '#4e3a26' },
  { title: 'Day 9: 4th lesson', views: '10.4K', cat: 'music', video: '', poster: '', link: 'https://www.instagram.com/be_anveshi/reels/', a: '#d4a35a', b: '#5a3a1a' },
]
const CATS = [['all', 'all'], ['fashion', 'style & desi wear'], ['music', 'music'], ['lifestyle', 'lifestyle'], ['collab', 'brand collabs']]
/* ============================================================ */

const $ = (s, el = document) => el.querySelector(s)
const $$ = (s, el = document) => [...el.querySelectorAll(s)]
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
const touch = matchMedia('(hover: none)').matches

// email everywhere
$$('.js-email').forEach((a) => { a.href = 'mailto:' + EMAIL; if (a.textContent.includes('@')) a.textContent = a.textContent.replace(/[\w.+-]+@[\w.-]+/, EMAIL) })

// WhatsApp links with a ready message
const waMsg = "Hi Spandana! I'm from ___ and I'd love to collab with you ✿"
$$('.js-wa').forEach((a) => (a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMsg)}`))

// nav background on scroll
const nav = $('#nav')
const onScroll = () => nav.classList.toggle('solid', scrollY > 40)
addEventListener('scroll', onScroll, { passive: true }); onScroll()

// stats
const statsGrid = $('#statsGrid')
STATS.forEach((s, i) => {
  const d = document.createElement('div')
  d.className = 'stat rv' + (i ? ' d' + i : '')
  d.innerHTML = `<div class="n" data-count="${s.count}" data-suffix="${s.suffix}"${String(s.count).includes('.') ? ' data-dec="1"' : ''}>0</div><div class="l">${s.label}</div>`
  statsGrid.appendChild(d)
})
$('#statsDate').textContent = 'updated ' + STATS_UPDATED + ' ✿'

// reels
const reelsEl = $('#reels')
REELS.forEach((r) => {
  const card = document.createElement(r.link ? 'a' : 'div')
  card.className = 'phone rv'
  card.dataset.cat = r.cat
  if (r.link) { card.href = r.link; card.target = '_blank'; card.rel = 'noopener' }
  card.innerHTML = `<div class="reel-ph" style="--a:${r.a};--b:${r.b}">
    ${r.poster ? `<img src="${r.poster}" alt="" loading="lazy">` : ''}
    ${r.video ? `<video src="${r.video}" muted loop playsinline preload="none"${r.poster ? ` poster="${r.poster}"` : ''}></video>` : ''}
    ${r.views ? `<span class="views">▶ ${r.views}</span>` : ''}${r.soon ? '<span class="soon">coming soon</span>' : ''}
    <span class="play"></span><div class="cap"><b>${r.title}</b>${CATS.find((c) => c[0] === r.cat)[1]}</div></div>`
  reelsEl.appendChild(card)
  const v = $('video', card)
  if (v) {
    card.addEventListener('mouseenter', () => { v.play().then(() => card.classList.add('playing')).catch(() => {}) })
    card.addEventListener('mouseleave', () => { v.pause(); card.classList.remove('playing') })
  }
})
const catsEl = $('#cats')
CATS.forEach(([id, name], i) => {
  const b = document.createElement('button')
  b.type = 'button'; b.textContent = name; if (!i) b.className = 'on'
  b.onclick = () => {
    $$('button', catsEl).forEach((x) => x.classList.toggle('on', x === b))
    $$('.phone', reelsEl).forEach((p) => p.classList.toggle('out', id !== 'all' && p.dataset.cat !== id))
  }
  catsEl.appendChild(b)
})

// reveal on scroll
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return
  e.target.classList.add('in')
  if (e.target.matches('.stat')) countUp($('.n', e.target))
  io.unobserve(e.target)
}), { threshold: 0.18, rootMargin: '0px 0px -40px 0px' })
$$('.rv, .bloom, .pols, .steps, .chat').forEach((el) => io.observe(el))

// stats count up
function countUp(el) {
  const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || ''
  if (!to) { el.textContent = el.dataset.placeholder || '0' + suf; return }
  if (reduce) { el.textContent = to.toFixed(dec) + suf; return }
  const t0 = performance.now(), dur = 1600
  const step = (now) => {
    const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3)
    el.textContent = (to * e).toFixed(dec) + suf
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// hero intro
const name = $('.name'), arch = $('#arch'), air = $('#airdrop')
$$('span', name).forEach((s, i) => (s.style.transitionDelay = 0.15 + i * 0.07 + 's'))
requestAnimationFrame(() => setTimeout(() => {
  name.classList.add('in'); arch.classList.add('in')
  $$('.hero .rv, .hero .bloom').forEach((el) => el.classList.add('in'))
}, 80))
$$('span', name).forEach((s) => s.addEventListener('transitionend', () => (s.style.transitionDelay = '0s'), { once: true }))
setTimeout(() => air.classList.add('pop'), reduce ? 0 : 1900)
$('#adNo').onclick = () => { air.classList.remove('pop'); air.classList.add('bye'); setTimeout(() => { air.classList.remove('bye'); air.classList.add('pop') }, 6000) }

// falling petals in hero
if (!reduce) {
  const box = $('#petals')
  for (let i = 0; i < 14; i++) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    p.setAttribute('class', 'petal'); p.setAttribute('viewBox', '0 0 20 30')
    p.innerHTML = '<use href="#PETAL"/>'
    const s = 0.6 + Math.random() * 0.8
    p.style.cssText = `left:${Math.random() * 100}%;width:${16 * s}px;height:${24 * s}px;animation-duration:${9 + Math.random() * 9}s;animation-delay:${-Math.random() * 18}s;--dx:${(Math.random() - 0.5) * 300}px;--rot:${(Math.random() - 0.5) * 720}deg;opacity:${0.5 + Math.random() * 0.4}`
    box.appendChild(p)
  }
}

// 3D tilt on the arch photo and reel phones
function tilt(el, max = 8, on = el) {
  if (touch || reduce) return
  on.addEventListener('mousemove', (e) => {
    const r = on.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `rotateY(${x * max}deg) rotateX(${-y * max}deg)`
  })
  on.addEventListener('mouseleave', () => (el.style.transform = ''))
}
tilt(arch, 12, $('.arch-wrap'))
$$('.phone').forEach((p) => tilt(p, 10))

// like button
$('#like').onclick = (e) => { const b = e.currentTarget; b.classList.toggle('on'); b.textContent = b.classList.contains('on') ? '♥' : '♡' }

// collab inquiry form
const form = $('#inq'), msg = $('#formMsg'), sendBtn = $('#send')
function collect() {
  const d = new FormData(form)
  return {
    name: (d.get('name') || '').trim(), brand: (d.get('brand') || '').trim(), email: (d.get('email') || '').trim(),
    handle: (d.get('handle') || '').trim(), product: d.get('product'), timeline: d.get('timeline'),
    needs: d.getAll('needs').join(', ') || 'Not sure yet', budget: (d.get('budget') || '').trim() || '-', message: (d.get('message') || '').trim() || '-',
  }
}
function validate(needEmail = true) {
  let ok = true
  ;['name', 'brand'].concat(needEmail ? ['email'] : []).forEach((n) => {
    const el = form.elements[n], bad = !el.value.trim() || (n === 'email' && !/^\S+@\S+\.\S+$/.test(el.value.trim()))
    el.classList.toggle('bad', bad); if (bad) ok = false
  })
  msg.textContent = ok ? '' : 'Please fill in the highlighted fields ✿'
  return ok
}
const summary = (v) => `Brand: ${v.brand}\nName: ${v.name}\nEmail: ${v.email}\nInstagram/website: ${v.handle || '-'}\nProduct: ${v.product}\nNeeds: ${v.needs}\nTimeline: ${v.timeline}\nBudget: ${v.budget}\nMessage: ${v.message}`
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (form.elements._honey.value) return
  if (!validate()) return
  const v = collect()
  sendBtn.disabled = true; sendBtn.textContent = 'Sending…'
  try {
    const res = await fetch('https://formsubmit.co/ajax/' + EMAIL, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: `New collab inquiry: ${v.brand}`, _template: 'table', _replyto: v.email, ...v }),
    })
    if (!res.ok) throw new Error()
    form.hidden = true; $('#thanks').hidden = false
  } catch {
    sendBtn.disabled = false; sendBtn.textContent = 'Send inquiry ✿'
    msg.innerHTML = `Couldn't send right now. <a href="mailto:${EMAIL}?subject=${encodeURIComponent('Collab inquiry: ' + v.brand)}&body=${encodeURIComponent(summary(v))}" style="text-decoration:underline">Send it by email instead</a> or use WhatsApp.`
  }
})
$('#sendWa').addEventListener('click', () => {
  if (!validate(false)) return
  const v = collect()
  open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi Spandana! Collab inquiry ✿\n\n' + summary(v))}`, '_blank', 'noopener')
})
form.addEventListener('input', (e) => { if (e.target.classList.contains('bad') && e.target.value.trim()) e.target.classList.remove('bad') })
