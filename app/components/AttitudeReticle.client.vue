<script setup lang="ts">
const roll = ref(0)
const pitch = ref(0)
let frame = 0
let px = 0
let py = 0

const apply = () => {
  frame = 0
  roll.value = px * -7
  pitch.value = py * 18
}

const onMove = (event: PointerEvent) => {
  px = event.clientX / window.innerWidth - 0.5
  py = event.clientY / window.innerHeight - 0.5
  if (!frame) frame = requestAnimationFrame(apply)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!window.matchMedia('(pointer: fine)').matches) return
  window.addEventListener('pointermove', onMove, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  cancelAnimationFrame(frame)
})

const RUNGS = [-20, -10, 10, 20]
</script>

<template>
  <svg class="reticle" viewBox="-200 -200 400 400" aria-hidden="true">
    <g class="reticle__bank">
      <path class="reticle__arc" d="M-109 -156 A190 190 0 0 1 109 -156" />
      <path
        v-for="a in [-30, -20, -10, 0, 10, 20, 30]"
        :key="a"
        class="reticle__tick"
        :d="`M0 -190 V${a === 0 ? -174 : -181}`"
        :transform="`rotate(${a})`"
      />
      <path class="reticle__pointer" d="M0 -168 l-7 12 h14 z" :transform="`rotate(${roll})`" />
    </g>

    <g class="reticle__ladder" :style="{ transform: `rotate(${roll}deg) translateY(${pitch}px)` }">
      <path class="reticle__horizon" d="M-190 0 H-40 M40 0 H190" />
      <g v-for="r in RUNGS" :key="r" :transform="`translate(0 ${r * -5})`">
        <path
          class="reticle__rung"
          :class="{ 'reticle__rung--neg': r < 0 }"
          :d="`M-110 ${r < 0 ? -8 : 8} V0 H-44 M44 0 H110 V${r < 0 ? -8 : 8}`"
        />
        <text class="reticle__num" x="-122" y="5" text-anchor="end">{{ Math.abs(r) }}</text>
        <text class="reticle__num" x="122" y="5">{{ Math.abs(r) }}</text>
      </g>
    </g>

    <g class="reticle__fpm">
      <circle r="11" />
      <path d="M-11 0 H-30 M11 0 H30 M0 -11 V-22" />
    </g>
    <path class="reticle__bore" d="M-6 40 L0 46 L6 40" />
  </svg>
</template>

<style scoped>
.reticle {
  width: 100%;
  height: auto;
  overflow: visible;
  fill: none;
  stroke-linecap: square;
}

.reticle__arc,
.reticle__tick {
  stroke: #6e7e86;
  stroke-width: 1.25;
}

.reticle__pointer {
  fill: #00799b;
  stroke: none;
  transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

.reticle__ladder {
  transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
  transform-box: view-box;
  transform-origin: center;
}

.reticle__horizon {
  stroke: #00799b;
  stroke-width: 2;
}

.reticle__rung {
  stroke: #6e7e86;
  stroke-width: 1.25;
}

.reticle__rung--neg {
  stroke-dasharray: 8 6;
}

.reticle__num {
  fill: #3f4c52;
  stroke: none;
  font-family: 'B612 Mono', ui-monospace, monospace;
  font-size: 13px;
}

.reticle__fpm {
  stroke: #1b2427;
  stroke-width: 2;
}

.reticle__bore {
  stroke: #ff6816;
  stroke-width: 2;
}
</style>
