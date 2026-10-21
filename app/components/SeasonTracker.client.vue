<script setup lang="ts">
import { SECTION_ORDER, type SeasonSection } from '@/data/seasons'

const section = useSeasonSection()
const progress = useSeasonProgress()

let frame = 0

const measure = () => {
  frame = 0
  const doc = document.documentElement
  const range = doc.scrollHeight - window.innerHeight
  progress.value = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0

  const line = window.innerHeight * 0.4
  let current: SeasonSection = 'home'
  for (const id of SECTION_ORDER) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= line) current = id
  }
  if (progress.value > 0.995) current = 'contact'
  section.value = current
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
  <SeasonRail />
</template>
