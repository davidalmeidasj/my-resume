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
  left: 1.25rem;
  top: 50%;
  z-index: 40;
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 0.375rem;
  transform: translateY(-50%);
  background: var(--color-paper);
  border: 1.5px solid var(--color-tree-trunk);
  border-radius: 999px;
}

.rail__track {
  position: absolute;
  left: 50%;
  top: 1.25rem;
  bottom: 1.25rem;
  width: 2px;
  margin-left: -1px;
  background: rgb(44 26 29 / 0.12);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  border-radius: 999px;
  background: var(--color-paper);
}

.rail__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-paper);
  border: 2px solid var(--color-tree-trunk);
  transition:
    transform 300ms var(--ease-out),
    background-color 300ms var(--ease-out),
    box-shadow 300ms var(--ease-out);
}

.rail__node:hover .rail__dot {
  box-shadow:
    0 0 0 3px var(--color-paper),
    0 0 0 4.5px var(--dot);
}

.rail__node--on .rail__dot {
  background: var(--dot);
  transform: scale(1.3);
}

.rail__label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
  transition: color 300ms var(--ease-out);
}

.rail__node--on .rail__label,
.rail__node:hover .rail__label {
  color: var(--color-tree-trunk);
}

@media (min-width: 1024px) and (min-height: 640px) {
  .rail {
    display: flex;
  }
}
</style>
