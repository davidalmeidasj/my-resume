<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="cue" role="presentation" aria-hidden="true">
    <span>{{ t('hero.scrollDown') }}</span>
    <span class="cue__line" />
  </div>
</template>

<style scoped>
.cue {
  position: absolute;
  left: 50%;
  bottom: calc(var(--edge) + 1rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  transform: translateX(-50%);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--season-soft);
  white-space: nowrap;
}

.cue__line {
  width: 1.5px;
  height: 2.5rem;
  background: currentColor;
  transform-origin: top;
  animation: cue 2400ms var(--ease-out) 1200ms both;
}

@keyframes cue {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

@media (max-height: 640px) {
  .cue {
    display: none;
  }
}
</style>
