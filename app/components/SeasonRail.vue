<script setup lang="ts">
import { SEASONS, SEASON_COLOR, SEASON_ENTRY } from '@/data/seasons'

const { t } = useI18n()
const season = useSeason()
const progress = useSeasonProgress()
</script>

<template>
  <nav class="rail" :aria-label="t('seasons.label')">
    <span class="rail__track" aria-hidden="true">
      <span
        class="rail__fill"
        :style="{ transform: `scaleY(${progress})`, backgroundColor: SEASON_COLOR[season] }"
      />
    </span>
    <a
      v-for="item in SEASONS"
      :key="item"
      :href="`#${SEASON_ENTRY[item]}`"
      class="rail__node"
      :class="{ 'rail__node--on': season === item }"
      :aria-current="season === item ? 'location' : undefined"
    >
      <span class="rail__dot" :style="{ '--dot': SEASON_COLOR[item] }" aria-hidden="true" />
      <span class="rail__label">{{ t(`seasons.${item}`) }}</span>
    </a>
  </nav>
</template>

<style scoped>
.rail {
  position: fixed;
  left: 1.5rem;
  top: 50%;
  z-index: 40;
  display: none;
  flex-direction: column;
  gap: 1.75rem;
  padding: 1rem 0.5rem;
  transform: translateY(-50%);
  background: var(--color-paper);
  border: 1.5px solid var(--color-brand-burgundy);
  border-radius: 999px;
}

.rail__track {
  position: absolute;
  left: 50%;
  top: 1.5rem;
  bottom: 1.5rem;
  width: 2px;
  margin-left: -1px;
  background: rgb(44 26 29 / 0.16);
  overflow: hidden;
}

.rail__fill {
  position: absolute;
  inset: 0;
  transform-origin: top;
  transition: background-color 400ms var(--ease-out);
}

.rail__node {
  position: relative;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
}

.rail__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-paper);
  border: 2px solid var(--color-brand-burgundy);
  transition:
    transform 300ms var(--ease-out),
    background-color 300ms var(--ease-out);
}

.rail__node--on .rail__dot,
.rail__node:hover .rail__dot {
  background: var(--dot);
  transform: scale(1.35);
}

.rail__label {
  position: absolute;
  left: calc(100% + 0.875rem);
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  background: var(--color-brand-burgundy);
  color: var(--color-paper);
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-4px);
  pointer-events: none;
  transition:
    opacity 240ms var(--ease-out),
    transform 240ms var(--ease-out);
}

.rail__node:hover .rail__label,
.rail__node:focus-visible .rail__label {
  opacity: 1;
  transform: none;
}

@media (min-width: 1024px) {
  .rail {
    display: flex;
  }
}
</style>
