<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="scroll-cue" role="presentation" aria-hidden="true">
    <span class="px-label">{{ t('hero.scrollDown') }}</span>
    <PixelIcon name="chevron" class="scroll-cue__icon" />
  </div>
</template>

<style scoped>
.scroll-cue {
  position: absolute;
  left: 50%;
  bottom: calc(var(--cell) * 4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--cell);
  color: #9e7b9b;
  transform: translateX(-50%);
  white-space: nowrap;
}

.scroll-cue__icon {
  color: #cb9cf2;
  animation: nudge calc(var(--step) * 12) steps(3, end) 1.4s 2 both;
}

@keyframes nudge {
  50% {
    transform: translateY(6px);
  }
}

@media (max-height: 640px) {
  .scroll-cue {
    display: none;
  }
}
</style>
