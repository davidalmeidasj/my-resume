<script setup lang="ts">
import { HUD_SECTIONS, type HudSection } from '@/composables/useHud'

const progress = useHudProgress()
const active = useHudActive()

let frame = 0

const measure = () => {
  frame = 0
  const doc = document.documentElement
  const range = doc.scrollHeight - window.innerHeight
  progress.value = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0

  const line = window.innerHeight * 0.4
  let current: HudSection = 'home'
  for (const id of HUD_SECTIONS) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= line) current = id
  }
  if (progress.value > 0.995) current = 'contact'
  active.value = current
}

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(measure)
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <HudLadder :progress="progress" />
  <TargetLock />
</template>
