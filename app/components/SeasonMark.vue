<script setup lang="ts">
import type { Season } from '@/data/seasons'

defineProps<{ season: Season }>()

const { t } = useI18n()
</script>

<template>
  <p class="mark">
    <SeasonWheel :season="season" color="var(--season-mark)" />
    <span>{{ t(`seasons.${season}`) }}</span>
  </p>
</template>

<style scoped>
.mark {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: 0.02em;
  color: var(--season-ink);
}
</style>
