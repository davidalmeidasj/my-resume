<script setup lang="ts">
import { AUTHOR } from '@/config/site'
import { glyphCells } from '@/utils/bitmap'

const mark = glyphCells('D')
</script>

<template>
  <a href="#home" class="brand">
    <svg
      class="brand__mark"
      viewBox="0 0 5 7"
      width="15"
      height="21"
      shape-rendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        v-for="cell in mark"
        :key="`${cell.x}-${cell.y}`"
        :x="cell.x"
        :y="cell.y"
        width="1"
        height="1"
      />
    </svg>
    <span class="brand__name">{{ AUTHOR.name }}</span>
  </a>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 44px;
  color: #cb9cf2;
}

.brand__mark {
  fill: currentColor;
  transition: transform calc(var(--step) * 3) steps(3, end);
}

.brand:hover .brand__mark {
  transform: translateY(-3px);
}

.brand__name {
  font-family: 'Pixelify Sans', system-ui, sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1;
}
</style>
