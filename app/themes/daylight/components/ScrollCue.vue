<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="descent" role="presentation" aria-hidden="true">
    <span class="descent__label">{{ t('hero.scrollDown') }}</span>
    <svg class="descent__chevrons" viewBox="0 0 16 30">
      <path d="M2 2l6 6 6-6" />
      <path d="M2 12l6 6 6-6" />
      <path d="M2 22l6 6 6-6" />
    </svg>
  </div>
</template>

<style scoped>
.descent {
  position: absolute;
  left: 50%;
  bottom: calc(var(--m) * 1.5);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.descent__label {
  font-family: B612, system-ui, sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #3f4c52;
  white-space: nowrap;
}

.descent__chevrons {
  width: 16px;
  height: 30px;
  fill: none;
  stroke: #00799b;
  stroke-width: 1.75;
}

.descent__chevrons path {
  animation: chevron 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  opacity: 0.25;
}

.descent__chevrons path:nth-child(2) {
  animation-delay: 0.2s;
}

.descent__chevrons path:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes chevron {
  30% {
    opacity: 1;
  }
  70%,
  100% {
    opacity: 0.25;
  }
}

@media (max-height: 640px) {
  .descent {
    display: none;
  }
}
</style>
