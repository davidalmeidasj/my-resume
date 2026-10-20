<script setup lang="ts">
const ICONS = {
  'arrow-down': ['0001000', '0001000', '0001000', '1111111', '0111110', '0011100', '0001000'],
  'arrow-up': ['0001000', '0011100', '0111110', '1111111', '0001000', '0001000', '0001000'],
  'arrow-out': ['011110', '000110', '001010', '010010', '100000', '000000'],
  download: [
    '0001000',
    '0001000',
    '1111111',
    '0111110',
    '0011100',
    '0001000',
    '0000000',
    '1111111',
  ],
  plus: ['00000', '00100', '01110', '00100', '00000'],
  minus: ['00000', '00000', '01110', '00000', '00000'],
  globe: ['01110', '10101', '11111', '10101', '01110'],
  chevron: ['00000', '10001', '01010', '00100', '00000'],
} as const

const props = defineProps<{ name: keyof typeof ICONS }>()

const rows = computed(() => ICONS[props.name])
const cols = computed(() => rows.value[0]!.length)
const cells = computed(() =>
  rows.value.flatMap((row, y) => [...row].flatMap((bit, x) => (bit === '1' ? [{ x, y }] : []))),
)
</script>

<template>
  <svg
    class="pixel-icon"
    :viewBox="`0 0 ${cols} ${rows.length}`"
    :width="cols * 3"
    :height="rows.length * 3"
    shape-rendering="crispEdges"
    aria-hidden="true"
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
</template>

<style scoped>
.pixel-icon {
  flex: none;
  fill: currentColor;
}
</style>
