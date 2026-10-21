<script setup lang="ts">
import { PX_SECTIONS, type PxSection } from '@/composables/usePx'

const active = usePxActive()

let frame = 0

const measure = () => {
  frame = 0
  const line = window.innerHeight * 0.4
  let current: PxSection = 'home'
  for (const id of PX_SECTIONS) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= line) current = id
  }
  const doc = document.documentElement
  if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) current = 'contact'
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
  <span hidden />
</template>
