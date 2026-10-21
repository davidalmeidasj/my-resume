<script setup lang="ts">
import type { Season } from '@/data/seasons'

defineProps<{ season: Season }>()

const PATHS: Record<Season, string> = {
  spring: 'M0 96 V58 C220 18 420 74 720 40 S1180 6 1440 46 V96 Z',
  summer: 'M0 96 V78 Q720 -46 1440 78 V96 Z',
  autumn: 'M0 96 V18 C360 26 640 94 1010 62 S1350 36 1440 70 V96 Z',
  winter: 'M0 96 V58 H560 C640 58 676 22 720 22 C764 22 800 58 880 58 H1440 V96 Z',
}
</script>

<template>
  <svg
    class="edge"
    viewBox="0 0 1440 96"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="PATHS[season]" />
  </svg>
</template>

<style scoped>
.edge {
  position: absolute;
  left: 0;
  top: calc(var(--edge) * -1 + 1px);
  width: 100%;
  height: var(--edge);
  fill: var(--season-ground);
  pointer-events: none;
}
</style>
