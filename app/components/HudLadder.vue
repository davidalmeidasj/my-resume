<script setup lang="ts">
const props = defineProps<{ progress: number }>()

const readout = computed(() => String(Math.round(props.progress * 100)).padStart(3, '0'))
</script>

<template>
  <div class="ladder" aria-hidden="true" :style="{ '--p': progress }">
    <div class="ladder__scale" />
    <div class="ladder__marker">
      <span class="ladder__readout">{{ readout }}</span>
      <span class="ladder__caret" />
    </div>
  </div>
</template>

<style scoped>
.ladder {
  position: fixed;
  left: calc(var(--m) * 1.25);
  top: calc(var(--m) * 6);
  bottom: calc(var(--m) * 3);
  width: calc(var(--m) * 1.5);
  z-index: 30;
  pointer-events: none;
  display: none;
}

@media (min-width: 1024px) {
  .ladder {
    display: block;
  }
}

.ladder__scale {
  position: absolute;
  inset: 0;
  border-right: 1px solid #6e7e86;
  background:
    repeating-linear-gradient(to bottom, #6e7e86 0 1px, transparent 1px calc(var(--m) * 4)) right /
      100% 100% no-repeat,
    repeating-linear-gradient(to bottom, #6e7e86 0 1px, transparent 1px var(--m)) right / 40% 100%
      no-repeat;
}

.ladder__marker {
  position: absolute;
  right: -1px;
  top: 0;
  transform: translateY(calc(var(--p) * (100cqh - 100%)));
  display: flex;
  align-items: center;
  gap: 6px;
  transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ladder {
  container-type: size;
}

.ladder__caret {
  width: 10px;
  height: 10px;
  border: 2px solid #00799b;
  transform: translateX(6px) rotate(45deg);
  flex: none;
  background: #e8e8e8;
}

.ladder__readout {
  font-family: 'B612 Mono', ui-monospace, monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  color: #006480;
  background: #e8e8e8;
  padding: 2px 3px;
  font-variant-numeric: tabular-nums;
}
</style>
