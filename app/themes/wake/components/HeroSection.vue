<script setup lang="ts">
const { t, locale } = useI18n()

const resumeHref = computed(() => `/david-almeida-resume-${locale.value}.pdf`)
</script>

<template>
  <section id="home" class="relative flex min-h-[100svh] items-center px-4 pb-24 pt-28 sm:px-6">
    <div class="mx-auto w-full max-w-6xl">
      <div class="max-w-3xl" data-wake-shield>
        <h1
          class="hero-title text-[clamp(2.75rem,7.5vw,6rem)] font-extralight leading-[0.98] tracking-[-0.035em]"
        >
          {{ t('hero.title') }}
        </h1>

        <p class="mt-8 max-w-[38rem] text-lg leading-relaxed text-wake-haze md:text-xl">
          {{ t('hero.subtitle') }}
        </p>

        <div class="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a href="#contact" class="action action-primary group">
            {{ t('hero.cta') }}
            <Icon
              name="lucide:arrow-right"
              class="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
            />
          </a>
          <a :href="resumeHref" download class="action action-secondary group">
            {{ t('hero.downloadResume') }}
            <Icon
              name="lucide:download"
              class="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </div>

    <WakeScrollCue />
  </section>
</template>

<style scoped>
.action {
  @apply inline-flex min-h-[3.5rem] items-center justify-center gap-3 rounded-full px-8 font-wake-display text-sm font-normal transition-colors duration-300;
}

.action-primary {
  @apply bg-wake-spark text-wake-abyss hover:bg-wake-signal;
}

.action-secondary {
  @apply border border-wake-signal/70 text-wake-signal hover:border-wake-signal hover:bg-wake-signal/10;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-title {
    animation: ignite 1.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
}

@keyframes ignite {
  from {
    opacity: 0.35;
    filter: blur(10px);
    letter-spacing: 0.02em;
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}
</style>
