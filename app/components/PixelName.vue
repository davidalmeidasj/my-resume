<script setup lang="ts">
import { GLYPH_ROWS, layoutLine } from '@/utils/bitmap'

const props = defineProps<{ text: string }>()

const glyph = usePxGlyph()

const lines = computed(() => props.text.split(/\s+/).map((word) => layoutLine(word)))
</script>

<template>
  <span class="pixel-name" aria-hidden="true">
    <svg
      v-for="(line, row) in lines"
      :key="row"
      class="pixel-name__line"
      :viewBox="`0 0 ${line.cols} ${GLYPH_ROWS}`"
      :style="{ '--cols': line.cols }"
      shape-rendering="crispEdges"
      focusable="false"
    >
      <g
        v-for="item in line.glyphs"
        :key="`${row}-${item.x}`"
        class="pixel-name__glyph"
        @pointerenter="glyph = item.char"
      >
        <rect :x="item.x" y="0" width="5" :height="GLYPH_ROWS" fill="transparent" />
        <rect
          v-for="cell in item.cells"
          :key="`${cell.x}-${cell.y}`"
          class="pixel-name__cell"
          :x="cell.x"
          :y="cell.y"
          width="1.04"
          height="1.04"
          :style="{ '--f': cell.frame + row * 4 }"
        />
      </g>
    </svg>
  </span>
</template>

<style scoped>
.pixel-name {
  display: flex;
  flex-direction: column;
  gap: calc(var(--glyph) * 2);
}

.pixel-name__line {
  display: block;
  width: calc(var(--cols) * var(--glyph));
  height: calc(7 * var(--glyph));
  overflow: visible;
}

.pixel-name__cell {
  fill: #cb9cf2;
  animation: cell-on calc(240ms + var(--f) * var(--step) * 1.5) steps(1, end) both;
}

.pixel-name__glyph:hover .pixel-name__cell {
  fill: #ece0fb;
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
