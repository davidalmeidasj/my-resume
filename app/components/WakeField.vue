<script setup lang="ts">
type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  ttl: number
  size: number
  halo: boolean
  rgb: string
  sprite: HTMLCanvasElement
}

const canvas = useTemplateRef<HTMLCanvasElement>('wake')

const makeSprite = (rgb: string) => {
  const sprite = document.createElement('canvas')
  sprite.width = sprite.height = 32
  const ctx = sprite.getContext('2d')!
  const glow = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  glow.addColorStop(0, `rgba(${rgb}, 1)`)
  glow.addColorStop(0.12, `rgba(${rgb}, 0.85)`)
  glow.addColorStop(0.35, `rgba(${rgb}, 0.16)`)
  glow.addColorStop(1, `rgba(${rgb}, 0)`)
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, 32, 32)
  return sprite
}

onMounted(() => {
  const el = canvas.value
  const ctx = el?.getContext('2d')
  if (!el || !ctx) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const sprites = {
    crest: makeSprite('76, 195, 223'),
    teal: makeSprite('0, 121, 155'),
    spark: makeSprite('255, 104, 22'),
    signal: makeSprite('252, 216, 0'),
  }

  const particles: Particle[] = []
  let width = 0
  let height = 0
  let budget = 900
  let frame = 0
  let tick = 0
  let lastScroll = window.scrollY
  const pointer = { x: 0, y: 0, active: false }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    width = window.innerWidth
    height = window.innerHeight
    el.width = Math.round(width * dpr)
    el.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    budget = width < 768 ? 520 : 1500
  }

  const tones = {
    crest: '76, 195, 223',
    teal: '0, 121, 155',
    spark: '255, 104, 22',
    signal: '252, 216, 0',
  } as const

  const pickTone = (warm: boolean) => {
    const roll = Math.random()
    if (warm && roll < 0.03) return 'spark'
    if (warm && roll < 0.05) return 'signal'
    return roll < 0.6 ? 'crest' : 'teal'
  }

  const spawn = (
    x: number,
    y: number,
    vx: number,
    vy: number,
    ttl: number,
    size: number,
    warm = false,
  ) => {
    if (particles.length >= budget) particles.shift()
    const tone = pickTone(warm)
    particles.push({
      x,
      y,
      vx,
      vy,
      life: 0,
      ttl,
      size,
      halo: Math.random() < 0.08,
      rgb: tones[tone],
      sprite: sprites[tone],
    })
  }

  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5

  const current = (t: number, phase: number) => {
    const baseX = width < 640 ? width * 0.86 : width < 1024 ? width * 0.9 : width * 0.74
    const amp = width < 640 ? width * 0.09 : width < 1024 ? width * 0.06 : width * 0.13
    const top = 72
    const y = top + t * (height - top) * 1.08
    const x = baseX + Math.sin(t * Math.PI * 2.2 + phase) * amp
    return { x, y }
  }

  const seedCurrent = (count: number, phase: number) => {
    for (let i = 0; i < count; i++) {
      const t = Math.random()
      const p = current(t, phase)
      const spread = gauss() * (width < 768 ? 34 : 64)
      spawn(
        p.x + spread,
        p.y + spread * 0.4,
        0,
        0,
        120 + Math.random() * 240,
        1.5 + Math.random() * 3.5,
      )
    }
  }

  const draw = () => {
    ctx.clearRect(0, 0, width, height)
    ctx.globalCompositeOperation = 'lighter'
    for (const p of particles) {
      const k = p.life / p.ttl
      const fade = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85
      const alpha = Math.max(fade, 0) * Math.min(Math.max((p.y - 56) / 40, 0), 1)
      if (alpha <= 0) continue
      const s = p.size * (1 + k * 0.6)
      const speed = Math.hypot(p.vx, p.vy)
      if (speed > 0.25) {
        ctx.globalAlpha = alpha * 0.35
        ctx.strokeStyle = `rgb(${p.rgb})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(p.x - p.vx * 7, p.y - p.vy * 7)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
      if (p.halo) {
        ctx.globalAlpha = alpha * 0.12
        const h = s * 7
        ctx.drawImage(p.sprite, p.x - h, p.y - h, h * 2, h * 2)
      }
      ctx.globalAlpha = alpha * 0.9
      ctx.drawImage(p.sprite, p.x - s, p.y - s, s * 2, s * 2)
    }
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }

  const step = () => {
    tick += 1
    const phase = tick * 0.0025
    const scrollDelta = window.scrollY - lastScroll
    lastScroll = window.scrollY

    const calm = Math.min(window.scrollY / height, 1)
    if (Math.random() > calm * 0.6) seedCurrent(width < 768 ? 3 : 7, phase)
    if (Math.abs(scrollDelta) > 1)
      seedCurrent(Math.min(Math.abs(scrollDelta) / 6, 10) * (1 - calm * 0.6), phase)

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]!
      p.life += 1
      if (p.life >= p.ttl) {
        particles.splice(i, 1)
        continue
      }
      p.vy += -scrollDelta * 0.0025
      p.vx *= 0.94
      p.vy *= 0.94
      p.x += p.vx + Math.sin((p.y + tick) * 0.01) * 0.15
      p.y += p.vy - 0.12
      if (pointer.active) {
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const d2 = dx * dx + dy * dy
        if (d2 < 9000 && d2 > 1) {
          const push = 18 / d2
          p.vx += dx * push
          p.vy += dy * push
        }
      }
    }

    draw()
    frame = requestAnimationFrame(step)
  }

  const onMove = (x: number, y: number) => {
    const vx = x - pointer.x
    const vy = y - pointer.y
    const speed = Math.hypot(vx, vy)
    pointer.x = x
    pointer.y = y
    pointer.active = true
    const count = Math.min(Math.ceil(speed / 3), 14)
    for (let i = 0; i < count; i++) {
      const f = i / count
      spawn(
        x - vx * f + (Math.random() - 0.5) * 8,
        y - vy * f + (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 1.2 + vx * 0.04,
        (Math.random() - 0.5) * 1.2 + vy * 0.04,
        70 + Math.random() * 90,
        1.5 + Math.random() * 3.5,
        true,
      )
    }
  }

  const onPointerMove = (e: PointerEvent) => onMove(e.clientX, e.clientY)
  const onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    if (touch) onMove(touch.clientX, touch.clientY)
  }
  const onLeave = () => {
    pointer.active = false
  }

  const start = () => {
    cancelAnimationFrame(frame)
    particles.length = 0
    resize()
    if (reduced.matches) {
      for (let i = 0; i < 70; i++) seedCurrent(10, 0)
      particles.forEach((p) => (p.life = p.ttl * 0.3))
      draw()
      return
    }
    for (let i = 0; i < 60; i++) seedCurrent(6, 0)
    particles.forEach((p) => (p.life = Math.random() * p.ttl * 0.8))
    frame = requestAnimationFrame(step)
  }

  const onVisibility = () => {
    if (document.hidden) cancelAnimationFrame(frame)
    else if (!reduced.matches) frame = requestAnimationFrame(step)
  }

  const onResize = () => {
    resize()
    if (reduced.matches) start()
  }

  start()
  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)
  document.addEventListener('visibilitychange', onVisibility)
  reduced.addEventListener('change', start)

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('pointerleave', onLeave)
    document.removeEventListener('visibilitychange', onVisibility)
    reduced.removeEventListener('change', start)
  })
})
</script>

<template>
  <canvas
    ref="wake"
    class="pointer-events-none fixed inset-0 z-0 h-full w-full"
    aria-hidden="true"
  />
</template>
