<script setup lang="ts">
const active = useHudActive()
const menuOpen = useHudMenu()

const ARM = 14
const PAD = 8

const box = reactive({ x1: 0, y1: 0, x2: 0, y2: 0 })
const visible = ref(false)
const moving = ref(false)
const slow = ref(false)
const flash = ref(0)

let hovered: Element | null = null
let focused: Element | null = null
let current: Element | null = null
let frame = 0
let settle = 0
let reduced = false

const heading = () => document.querySelector(`#${active.value} [data-lock-heading]`)

const target = () => focused ?? hovered ?? heading()

const place = () => {
  frame = 0
  const el = target()
  if (el !== current) {
    current = el
    moving.value = true
    flash.value++
    clearTimeout(settle)
    settle = window.setTimeout(
      () => {
        moving.value = false
        slow.value = false
      },
      slow.value ? 950 : 480,
    )
  }
  if (!el) {
    visible.value = false
    return
  }
  const r = el.getBoundingClientRect()
  const header = el.closest('header')
    ? 0
    : (document.querySelector('header')?.getBoundingClientRect().bottom ?? 0)
  const inView = r.top - PAD > header && r.top < window.innerHeight
  visible.value = inView && !menuOpen.value
  box.x1 = Math.round(r.left - PAD)
  box.y1 = Math.round(r.top - PAD)
  box.x2 = Math.round(r.right + PAD)
  box.y2 = Math.round(r.bottom + PAD)
}

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(place)
}

const lockable = (node: EventTarget | null) =>
  node instanceof Element ? node.closest('[data-lock]') : null

const onOver = (event: PointerEvent) => {
  if (event.pointerType !== 'mouse') return
  hovered = lockable(event.target)
  schedule()
}

const onOut = (event: PointerEvent) => {
  if (event.pointerType !== 'mouse') return
  const next = lockable(event.relatedTarget)
  if (next === hovered) return
  hovered = next
  schedule()
}

const onFocusIn = (event: FocusEvent) => {
  const el = lockable(event.target)
  const node = event.target as Element
  focused = el && node.matches(':focus-visible') ? el : null
  schedule()
}

const onFocusOut = () => {
  focused = null
  schedule()
}

watch([active, menuOpen], schedule)

const corner = (cx: number, cy: number) => ({
  transform: `translate3d(${cx}px, ${cy}px, 0)`,
})

const corners = computed(() => [
  { key: 'tl', style: corner(box.x1, box.y1) },
  { key: 'tr', style: corner(box.x2 - ARM, box.y1) },
  { key: 'bl', style: corner(box.x1, box.y2 - ARM) },
  { key: 'br', style: corner(box.x2 - ARM, box.y2 - ARM) },
])

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  box.x1 = 0
  box.y1 = 0
  box.x2 = window.innerWidth
  box.y2 = window.innerHeight
  visible.value = true
  slow.value = !reduced
  requestAnimationFrame(() => requestAnimationFrame(place))
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
  document.addEventListener('pointerover', onOver)
  document.addEventListener('pointerout', onOut)
  document.addEventListener('focusin', onFocusIn)
  document.addEventListener('focusout', onFocusOut)
  document.fonts?.ready.then(schedule)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  document.removeEventListener('pointerover', onOver)
  document.removeEventListener('pointerout', onOut)
  document.removeEventListener('focusin', onFocusIn)
  document.removeEventListener('focusout', onFocusOut)
  cancelAnimationFrame(frame)
  clearTimeout(settle)
})
</script>

<template>
  <div
    class="lock"
    :class="{ 'lock--on': visible, 'lock--moving': moving, 'lock--slow': slow }"
    aria-hidden="true"
  >
    <span
      v-for="c in corners"
      :key="c.key"
      class="lock__corner"
      :class="`lock__corner--${c.key}`"
      :style="c.style"
    />
    <span :key="flash" class="lock__pip" :style="corners[0]!.style" />
  </div>
</template>

<style scoped>
.lock {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0;
  transition: opacity 240ms cubic-bezier(0.16, 1, 0.3, 1);
}

.lock--on {
  opacity: 1;
}

.lock__corner,
.lock__pip {
  position: absolute;
  left: 0;
  top: 0;
  width: 14px;
  height: 14px;
  will-change: transform;
}

.lock__corner {
  border: 0 solid #00799b;
}

.lock--moving .lock__corner,
.lock--moving .lock__pip {
  transition: transform 460ms cubic-bezier(0.16, 1, 0.3, 1);
}

.lock--slow .lock__corner,
.lock--slow .lock__pip {
  transition-duration: 900ms;
}

.lock__corner--tl {
  border-top-width: 2px;
  border-left-width: 2px;
}

.lock__corner--tr {
  border-top-width: 2px;
  border-right-width: 2px;
}

.lock__corner--bl {
  border-bottom-width: 2px;
  border-left-width: 2px;
}

.lock__corner--br {
  border-bottom-width: 2px;
  border-right-width: 2px;
}

.lock__pip {
  width: 6px;
  height: 6px;
  margin: 4px 0 0 4px;
  background: #fcd800;
  outline: 1px solid #1b2427;
  animation: pip 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes pip {
  0%,
  38% {
    opacity: 0;
  }
  44%,
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lock--moving .lock__corner,
  .lock--moving .lock__pip {
    transition: none;
  }
}
</style>
