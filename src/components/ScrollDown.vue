<template>
  <div
    class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted animate-bounce"
    role="presentation"
    aria-hidden="true"
  >
    <svg
      class="w-6 h-6 text-accent2 mb-1"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
    <span class="text-xs tracking-wide uppercase">{{ $t('hero.scrollDown') }}</span>
  </div>
</template>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(6px) translateX(-50%);
  }
}
</style>
