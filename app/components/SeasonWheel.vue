<script setup lang="ts">
import { SEASONS, SEASON_COLOR, type Season } from '@/data/seasons'

const props = defineProps<{ season: Season; color?: string }>()

const QUADRANTS: Record<Season, string> = {
  spring: 'M12 12 L12 2 A10 10 0 0 1 22 12 Z',
  summer: 'M12 12 L22 12 A10 10 0 0 1 12 22 Z',
  autumn: 'M12 12 L12 22 A10 10 0 0 1 2 12 Z',
  winter: 'M12 12 L2 12 A10 10 0 0 1 12 2 Z',
}
</script>

<template>
  <svg class="wheel" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5" />
    <path
      v-for="item in SEASONS"
      :key="item"
      :d="QUADRANTS[item]"
      :fill="item === season ? (props.color ?? SEASON_COLOR[item]) : 'transparent'"
      :stroke="item === season ? 'currentColor' : 'none'"
      stroke-width="1.5"
      class="wheel__quadrant"
    />
  </svg>
</template>

<style scoped>
.wheel {
  width: 1.5rem;
  height: 1.5rem;
  flex: none;
}

.wheel__quadrant {
  transition: fill 400ms var(--ease-out);
}
</style>
