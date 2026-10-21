<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <a
    href="#about"
    class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-wake-haze transition-colors hover:text-wake-mist sm:flex"
  >
    <span class="font-wake-display text-[11px] uppercase tracking-[0.3em]">{{
      t('hero.scrollDown')
    }}</span>
    <span class="relative block h-12 w-px overflow-hidden bg-wake-line">
      <span class="drop absolute left-0 top-0 block h-3 w-px bg-wake-crest" />
    </span>
  </a>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .drop {
    animation: drift 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  }
}

@keyframes drift {
  from {
    transform: translateY(-12px);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  to {
    transform: translateY(48px);
    opacity: 0;
  }
}
</style>
