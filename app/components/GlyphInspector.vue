<script setup lang="ts">
import { GLYPH_COLS, GLYPH_ROWS, glyphCells } from '@/utils/bitmap'

const glyph = usePxGlyph()

const cells = computed(() => glyphCells(glyph.value))
const code = computed(
  () => `U+${glyph.value.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
)
const sizes = [2, 3, 4, 6]
</script>

<template>
  <figure class="inspector px-frame" aria-hidden="true">
    <svg
      :key="glyph"
      class="inspector__glyph"
      :viewBox="`-0.05 -0.05 ${GLYPH_COLS + 0.1} ${GLYPH_ROWS + 0.1}`"
      shape-rendering="crispEdges"
      focusable="false"
    >
      <rect
        v-for="cell in cells"
        :key="`${cell.x}-${cell.y}`"
        class="inspector__cell"
        :x="cell.x"
        :y="cell.y"
        width="1"
        height="1"
        :style="{ '--f': cell.frame }"
      />
      <g class="inspector__grid">
        <line
          v-for="x in GLYPH_COLS + 1"
          :key="`v${x}`"
          :x1="x - 1"
          :x2="x - 1"
          y1="0"
          :y2="GLYPH_ROWS"
        />
        <line
          v-for="y in GLYPH_ROWS + 1"
          :key="`h${y}`"
          x1="0"
          :x2="GLYPH_COLS"
          :y1="y - 1"
          :y2="y - 1"
        />
      </g>
    </svg>

    <figcaption class="inspector__caption px-label">
      <span>{{ glyph }} · {{ GLYPH_COLS }}×{{ GLYPH_ROWS }}</span>
      <span>{{ code }}</span>
    </figcaption>

    <div class="inspector__waterfall">
      <span v-for="size in sizes" :key="size" class="inspector__size">
        <svg
          :viewBox="`0 0 ${GLYPH_COLS} ${GLYPH_ROWS}`"
          :width="GLYPH_COLS * size"
          :height="GLYPH_ROWS * size"
          shape-rendering="crispEdges"
          focusable="false"
        >
          <rect
            v-for="cell in cells"
            :key="`${cell.x}-${cell.y}`"
            :x="cell.x"
            :y="cell.y"
            width="1"
            height="1"
          />
        </svg>
        <span class="px-label">{{ size }}px</span>
      </span>
    </div>
  </figure>
</template>

<style scoped>
.inspector {
  display: grid;
  gap: calc(var(--cell) * 3);
  padding: calc(var(--cell) * 4);
  margin: 0;
}

.inspector__glyph {
  width: 100%;
  max-width: 17rem;
  aspect-ratio: 5 / 7;
  margin-inline: auto;
  overflow: visible;
}

.inspector__cell {
  fill: #cb9cf2;
  animation: cell-on calc(1ms + var(--f) * var(--step)) steps(1, end) both;
}

.inspector__grid line {
  stroke: #374a67;
  stroke-width: 0.06;
}

.inspector__caption {
  display: flex;
  justify-content: space-between;
  color: #9e7b9b;
}

.inspector__waterfall {
  display: flex;
  align-items: flex-end;
  gap: calc(var(--cell) * 3);
  padding-top: calc(var(--cell) * 3);
  border-top: 4px solid #374a67;
}

.inspector__size {
  display: grid;
  justify-items: start;
  gap: var(--cell);
  color: #9e7b9b;
}

.inspector__size svg {
  fill: #cb9cf2;
}

@keyframes cell-on {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
