<script setup lang="ts">
import { SPRITES, SPRITE_INKS, type SpriteName } from '@/data/sprites'

const props = defineProps<{ name: SpriteName }>()

const runs = (rows: string[]) =>
  rows.flatMap((row, y) => {
    const out: { x: number; y: number; w: number; fill: string }[] = []
    let x = 0
    while (x < row.length) {
      const ink = row[x]!
      let end = x
      while (end < row.length && row[end] === ink) end++
      if (ink !== '.') out.push({ x, y, w: end - x, fill: SPRITE_INKS[ink]! })
      x = end
    }
    return out
  })

const frames = computed(() => SPRITES[props.name].map(runs))
</script>

<template>
  <svg
    class="sprite"
    viewBox="0 0 16 16"
    shape-rendering="crispEdges"
    aria-hidden="true"
    focusable="false"
  >
    <g
      v-for="(frame, index) in frames"
      :key="index"
      :class="`sprite__frame sprite__frame--${index}`"
    >
      <rect
        v-for="run in frame"
        :key="`${run.x}-${run.y}`"
        :x="run.x"
        :y="run.y"
        :width="run.w"
        height="1.02"
        :fill="run.fill"
      />
    </g>
  </svg>
</template>

<style scoped>
.sprite {
  display: block;
  width: calc(var(--cell) * 8);
  height: calc(var(--cell) * 8);
}

.sprite__frame--1 {
  visibility: hidden;
}
</style>
